 'use strict';
 var inquirer = require('inquirer');
 var mysql = require('mysql');
 var table = require('console.table');
 var figlet = require('figlet');
 var colors = require('colors');

 //0. Create connection
 var connection = mysql.createConnection({
     host: 'localhost',
     user: 'root',
     password: '',
     database: 'Bamazon'
 });

 function managerUserInterface() {
     inquirer.prompt([{
         type: 'list',
         name: 'adminChoices',
         message: 'What whould you like to manage?',
         choices: ['View Products for Sale', 'View Low Inventory', 'Add to Inventory', 'Add New Product'],
         filter: function(val) {
             return val.toLowerCase();
         }
     }]).then(function(answers) {
         var choices = answers.adminChoices;
         console.log('Choices: ' + answers.adminChoices);
         switch (answers.adminChoices) {
             case 'view products for sale':
                 console.log('Choice 1');
                 selectProducts();
                 break;
             case 'view low inventory':
                 console.log('Choice 2');
                 lowInventory();
                 break;
             case 'add to inventory':
                 console.log('Choice 3');
                 promptAddProduct();
                 break;
             case 'add new product':
                 console.log('Choice 4');
                 promptAddNewProduct();
                 break;
         }
     });
 };

 function promptAddProduct() {
     var questions = [{
             type: 'input',
             name: 'productId',
             message: 'What\'s is the product ID'
         },
         {
             type: 'input',
             name: 'inventory',
             message: 'How many items would you like to add?'
         }
     ];
     inquirer.prompt(questions).then(function(answers) {
         console.log(JSON.stringify(answers, null, '  '));
         var id = answers.productId;
         var inventory = answers.inventory;
         // addInventory(id, inventory);
         checkinventory(id, inventory);
     });
 };

 function promptAddNewProduct() {
     console.log('test ariene');
     var questions = [{
             type: 'input',
             name: 'productId',
             message: 'Product ID'
         },
         {
             type: 'input',
             name: 'productName',
             message: 'Name of the product'
         },
         {
             type: 'input',
             name: 'departmentName',
             message: 'Name of the department'
         },
         {
             type: 'input',
             name: 'price',
             message: 'Price'
         },
         {
             type: 'input',
             name: 'stock',
             message: 'How many items in stock?'
         }
     ];
     inquirer.prompt(questions).then(function(answers) {
         console.log(JSON.stringify(answers, null, ' '));
         var id = answers.productId;
         var product = answers.productName;
         var department = answers.departmentName;
         var price = answers.price;
         var stock = answers.stock;
         addNewProduct(product, department, price, stock);
     });
 };

 managerUserInterface();

 function selectProducts() {
     connection.query('SELECT * FROM Products', function(error, results, fields) {
         if (error) throw error;
         results.forEach(function() {});
         console.table(results);
         managerUserInterface();

     });
 };

 function lowInventory() {
     connection.query('SELECT * FROM Products WHERE stock_quantity < 5', function(error, results, fields) {
         if (error) throw error;
         results.forEach(function() {});
         console.table(results);
         managerUserInterface();

     });
 };

 function checkinventory(id, inventory) {
     connection.query('SELECT * FROM Products WHERE item_id = ? ', [id], function(error, results, fields) {
         if (error) throw error;
         results.forEach(function(data) {

         });
         var stock = results[0].stock_quantity;
         console.log('Total of quantity:' + stock);
         var total = Number(stock) + Number(inventory);
         addInventory(id, total);
     });
 }

 function addInventory(id, total) {
     connection.query('UPDATE Products SET stock_quantity = ? WHERE item_id = ?', [total, id], function(error, results, fields) {
         if (error) throw error;
         selectProducts();
         managerUserInterface();
     });
 };

 function addNewProduct(product, department, price, stock) {
     connection.query('INSERT INTO Products SET product_name = ?, department_name = ?, price = ?, stock_quantity = ?', [product, department, price, stock], function(error, results, fields) {
         if (error) throw error;
         selectProducts();
         managerUserInterface();
     });
 };