# Bamazon
This app simulates a store front application using CLI.

## Customer Interface
To run the interface for customers type **node bamazonCustomer.js**
The application will first display all of the items available for sale. Include the ids, names, prices, and the total inventory.

**Screenshot**

![Image of customer screen]

(https://arienellefsen.github.io/Bamazon/images/Customerscreen1.png)

Then select the product ID that you would like to purchase.
After choose how many units would you like to buy.
If the store has sufficient products for your purchased will be displayed with the following screen confirming your order.

**Screenshot**

![Image of placed order]

(https://arienellefsen.github.io/Bamazon/images/Customerscreen2.png)


If there is no sufficient inventory you will be prompt with alert message saying that we don't have sufficient inventory for your order and then you will be redirect to the store menu.

**Screenshot**

![Image of insufficient inventory]

(https://arienellefsen.github.io/Bamazon/images/Customerscreen3.png)


## Manager View
To run the interface for manager type **node bamazonManager.js**
The application will first display a set of menu options:

* View Products for Sale
* View Low Inventory
* Add to Inventory
* Add New Product

**Screenshot**

![Image of manager screen]

(https://arienellefsen.github.io/Bamazon/images/Managerscreen1.png)

**Option - View Products for Sale**
The app list every available item: the item IDs, names, prices, and quantities.

![Image of a list of every available item]

(https://arienellefsen.github.io/Bamazon/images/Managerscreen2.png)

**Option - View Low Inventory**
The app list all items with a inventory count lower than five

![Image of low inventory]

(https://arienellefsen.github.io/Bamazon/images/Managerscreen3.png)

**Option - Add to Inventory**
The app display a prompt that will let the manager "add more" of any item currently in the store.

![Image add to inventory]

(https://arienellefsen.github.io/Bamazon/images/Managerscreen4.png)

**Option - Add New Product**
The app will allow the manager to add a completely new product to the store.

![Image add a new product]

(https://arienellefsen.github.io/Bamazon/images/Managerscreen5.png)
