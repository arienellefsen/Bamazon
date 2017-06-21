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


//Create interface
function displayProducts() {
    figlet('BamaZon CLI Store', 'Standard', function(err, data) {
        if (err) {
            console.log('Something went wrong...');
            console.dir(err);
            return;
        }
        console.log(data.magenta);

    });
}
displayProducts();

//1. Display products items
// Working on store interface

function selectProducts() {
    connection.query('SELECT * FROM Products', function(error, results, fields) {
        if (error) throw error;
        results.forEach(function(inventory) {
            //console.log('Products: ', inventory);
        });
        console.table(results);
        storeUserInterface();
    });
};
selectProducts();

//2. Prompt User
function storeUserInterface() {
    inquirer.prompt([{
            type: 'input',
            name: 'id',
            message: 'What is the ID for the product that you would like to purchase?',
            validate: function(value) {
                if (value) {
                    return true;
                }
                return 'Please enter product ID';
            },
            filter: Number
        },
        {
            type: 'input',
            name: 'units',
            message: 'How many units?',
            validate: function(value) {
                if (value) {
                    return true;
                }
                return 'How many units?';
            },
            filter: Number
        }
    ]).then(function(answers) {
        var units = answers.units;
        var id = answers.id;
        checkInventory(id, units);
    });
};

//3. Functions to check units
function checkInventory(id, units) {
    connection.query('SELECT * FROM Products WHERE item_id =?', [id], function(error, results, fields) {
        if (error) throw error
        results.forEach(function(element) {
            var stock = results[0].stock_quantity;
            if (stock < units) {
                console.log('Insufficient quantity! We only have '.red + stock + ' left in stock. You will be redirect to the main menu.'.red);
                storeUserInterface();
            } else {
                var totalStock = stock - units;
                checkout(id, totalStock);
            }
        });
    });
}

//4. Function for checkout products
function checkout(id, totalStock) {
    connection.query('UPDATE Products SET stock_quantity = ? WHERE item_id = ?', [totalStock, id], function(error, results, fields) {
        if (error) throw error
        console.log('Your order has been placed! Thank you once again for your business!'.magenta);
        selectProducts();

    });
}
//storeUserInterface();