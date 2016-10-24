var mysql = require('mysql');
var inquirer = require('inquirer');

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root", //Your username
    password: "", //Your password
    database: "Bamazon"
})

connection.connect(function(err) {
    if (err) throw err;
    doSearch();
})

var doSearch = function() {
    inquirer.prompt({
        name: "action",
        type: "list",
        message: "What would you like to do?",
        choices: ["View Products for Sale", "View low Inventory", "Add to Inventory", "Add new Product"]
    }).then(function(answer) {
        switch(answer.action) {
            case 'View Products for Sale':
                viewProduct();
            break;
            
            case 'View low Inventory':
                viewLowInventory();
            break;
            
            case 'Add to Inventory':
                addInventory();
            break;
            
            case 'Add new Product':
                addNewProduct();
            break;
        }
    })
};

var viewProduct = function() {
    inquirer.prompt({
        name: "ProductName",
        type: "input",
        message: "Which Product would you like to search for?"
    }).then(function(answer) {
        var query = 'SELECT ProductName FROM Products WHERE ?'
        connection.query(query, {ProductName: answer.ProductName}, function(err, res) {
            for (var i = 0; i < res.length; i++) {
                console.log("ID: " + res[i].ID+ " || ProductName: " + res[i].ProductName + " || DepartmentName: " + res[i].DepartmentName + " || Price: " + res[i].Price + " || StockQuantity: " + res[i].StockQuantity);
            }
            doSearch();
        })
    })
};

 var viewLowInventory = function() {
     var query = 'SELECT ProductName FROM Products GROUP BY ProductName HAVING count(*) > 5';
     connection.query(query, function(err, res) {
         for (var i = 0; i < res.length; i++) {
            console.log(res[i].ProductName);
         }
        doSearch();
     })
 };

var addInventory = function() {
    inquirer.prompt([{
        name: "ProductName",
        type: "input",
        message: "Update Quantity To Inventory: " 
        }]).then(function(answer) {
        connection.query('UPDATE Products SET ? WHERE  ?', {ID: answer.ID,ProductName: answer.ProductName,DepartmentName: answer.DepartmentName,Price: answer.Price,StockQuantity: answer.StockQuantity}, function(err, res) {
            for (var i = 0; i < res.length; i++) {
            console.log("ID: " + res[i].ID + " || ProductName: " + res[i].ProductName + " || DepartmentName: " + res[i].DepartmentName + " || Price: " + res[i].Price + " || StockQuantity: " + res[i].StockQuantity);
        }
            doSearch();
        })
    })
};

var addNewProduct = function() {
    inquirer.prompt({
        name: "ProductName",
        type: "input",
        message: "Add the Product: "
    }).then(function(answer) {
        console.log(answer.ProductName)
        connection.query('INSERT INTO Products SET ?', {ID: answer.ID,ProductName: answer.ProductName,DepartmentName: answer.DepartmentName,Price: answer.Price,StockQuantity: answer.StockQuantity}, function(err, res) {
            console.log("ID: " + res[0].ID + " || ProductName: " + res[0].ProductName + " || DepartmentName: " + res[0].DepartmentName + " || Price: " + res[0].Price + " || StockQuantity: " + res[0].StockQuantity);
            doSearch();
        })
    })
};

