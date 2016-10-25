// To require/import the mysql module
var mysql = require('mysql');
// To require/import the inquirer module
var inquirer = require('inquirer');
// To create server connection using localhost and a port,we want to listen to.
// we are using database "bamazon" which we created in mysql.
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root", //Your username
    password: "", //Your password
    database: "Bamazon"
})
// function to catch an error
connection.connect(function(err) {
    if (err) throw err;
    doSearch();
})
// A function to do search and list choices for an action which we want to achieve.
var doSearch = function() {
    inquirer.prompt({
        name: "action",
        type: "list",
        message: "What would you like to do?",
        choices: ["View Products for Sale", "View low Inventory", "Add to Inventory", "Add new Product"]
    }).then(function(answer) {
        // A switch function to switch our display of the choices as per the user selection.
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
// A function which lists details of every available product.
// we use inquirer prompt to get user input
var viewProduct = function() {
    inquirer.prompt({
        name: "ProductName",
        type: "input",
        message: "Which Product would you like to search for?"
    }).then(function(answer) {
        // we make a query which selects from table "Products" and lists the details of every item in that table.
        var query = 'SELECT * FROM Products';
        connection.query(query,function(err, res) {
            // console.log(res);
            for (var i = 0; i < res.length; i++) { 
                console.log("ID: " + res[i].ID + " || Product Name: " + res[i].ProductName + " || Department Name: " + res[i].DepartmentName + " || Price: " + res[i].Price + " || Stock Quantity: " + res[i].StockQuantity);
            }
            doSearch();
        })
    })
};
    // A function which displays a prompt to lists all the items with an inventory count lower than 5.
  var viewLowInventory = function() {
    inquirer.prompt({
         name: "ProductName",
         type: "input",
         message: "Which Product Inventory would you like to check?"
     }).then(function(answer) {
        // we make a query from table "Products" to select productname and to check the stockQuantity of that item which is less than 5
      var query = 'SELECT ProductName FROM Products Where StockQuantity < 5';
      connection.query(query, function(err, res) {
          for (var i = 0; i < res.length; i++) {
             console.log(res[i].ProductName);
          }
         doSearch();
      })
    })
  };
// This function displays a prompt which lets the user add more of any item
 var addInventory = function() {
     inquirer.prompt([
        {
            name: "ProductName",
            type: "input",
            message: "What Product do you want to update : " 
         },
         {
            name: "ProductStock",
            type: "input",
            message: "Update the Quantity to :"
         }
         ]).then(function(answer) {
            // We make a query which updates the Stock Quantity an item in the Table "Products"
         connection.query('UPDATE Products SET ? WHERE ?',[{StockQuantity: answer.ProductStock},{ProductName:answer.ProductName}], function(err, res) {
            if (err) throw err;
            for (var i = 0; i < res.length; i++) {
            console.log("ID: " + res[i].ID + " || ProductName: " + res[i].ProductName + " || DepartmentName: " + res[i].DepartmentName + " || Price: " + res[i].Price + " || StockQuantity: " + res[i].StockQuantity);
         }
            doSearch();
         })
     })
 };
// This function Diplays a series of prompts which ask user input hence allowing the user to add a completely new product with product details
 var addNewProduct = function() {
     inquirer.prompt([
     {
         name: "ProductName",
         type: "input",
         message: "Add the Product: "
     },
     {
        name: "DepartmentName",
         type: "input",
         message: "Add the Department: "
     },
     {
        name: "Price",
         type: "input",
         message: "Add the Price of the Product: "
     },
     {
        name: "StockQuantity",
         type: "input",
         message: "Add the quantity of the Product: "
     }
     ]).then(function(answer) {
         console.log(answer)
         // we make query on the Table "Products" which inserts the Table fields and sets respective Values related to those feilds as per user input
         connection.query('INSERT INTO Products SET ?', {ProductName: answer.ProductName, DepartmentName: answer.DepartmentName, Price: answer.Price, StockQuantity: answer.StockQuantity}, function(err, res) {
             if (err) throw err;
              for (var i = 0; i < res.length; i++) {
             console.log("ID: " + res[0].ID + " || ProductName: " + res[0].ProductName + " || DepartmentName: " + res[0].DepartmentName + " || Price: " + res[0].Price + " || StockQuantity: " + res[0].StockQuantity);
             }
             doSearch();
         })
     })
 };

