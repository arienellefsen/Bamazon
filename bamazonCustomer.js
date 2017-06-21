'use strict';
var inquirer = require('inquirer');
var mysql = require('mysql');

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'Bamazon'
});

//1. Display products itens

function selectProducts() {
    connection.query('SELECT * FROM Products', function(error, results, fields) {
        if (error) throw error;
        results.forEach(function(inventory) {
            console.log('Products: ', inventory);
        });
    });
};

//2 . Promp tUser
//selectProducts();

function storeUserInterface() {
    inquirer.prompt([{
            type: 'input',
            name: 'id',
            message: 'What is the ID for the product?',
            //Validate if number is not empty, validate if it is not float number
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
                return 'Please enter unit number';
            },
            filter: Number
        }
    ]).then(function(answers) {
        console.log(JSON.stringify(answers, null, '  '));
        var units = answers.units;
        var id = answers.id;
        checkInventory(id, units);
    });
};
//create functions to check units
function checkInventory(id, units) {
    console.log('Id: ' + id);
    console.log('Units: ' + units);

    connection.query('SELECT * FROM Products WHERE item_id =?', [id], function(error, results, fields) {
        if (error) throw error
        results.forEach(function(element) {
            var stock = results[0].stock_quantity;
            if (stock < units) {
                console.log('Insufficient quantity!');
            } else {
                console.log('Inventory: ', element);
                console.log('Inventory ok')
            }
        });
    });
}




//create funciton to check out


storeUserInterface();