# mysqlNode-app



Manager View App Using : MYSQL and INQUIRER

Created a MySQL Database called Bamazon.

Then created a Table inside of that database called Products.

The products table  have each of the following columns:

ID (unique id for each product)

ProductName (Name of product)

DepartmentName

Price (cost to customer)

StockQuantity (how much of the product is available in stores)

Populated this database with around 10 different products. (i.e. Insert "mock" data rows into this database and table).



Created a new Node application called BamazonManager.js. Running this application will:

List a set of menu options:

View Products for Sale
View Low Inventory
Add to Inventory
Add New Product
If a manager selects View Products for Sale, the app  lists every available item: the item IDs, names, prices, and quantities.

If a manager selects View Low Inventory, then it  lists all items with a inventory count lower than five.

If a manager selects Add to Inventory,  app displays a prompt that will let the manager "add more" of any item currently in the store.

If a manager selects Add New Product, it allows the manager to add a completely new product to the store.


Technologies Used:
MYSQL
INQUIRER
JAVASCRIPT

Challenges Faced:

To add a completely new product to our table. We need to give prompts again and again till we capture user input for all the fields of the table.Hence rectified by giving prompts .






