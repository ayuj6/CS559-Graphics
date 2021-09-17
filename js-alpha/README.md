[![Open in Visual Studio Code](https://classroom.github.com/assets/open-in-vscode-f059dc9a6f8d3a56e377f745f24479a46679e63a5d9fe6f495e02850cd0d8118.svg)](https://classroom.github.com/online_ide?assignment_repo_id=5654467&assignment_repo_type=AssignmentRepo)
# Homework: JavaScript α (2 Points)

This homework will introduce you to the syntax and semantics of the JavaScript language. We will be covering multiple topics, including element identification, manipulation, and styling, as well as logging, alerting, branching, looping, and even fetching from an API. By the end of this homework, you will have implemented the functionality supporting Badger Shop, and you will be able to improve the UI in JavaScript β.

Do **_not_** modify any files except for `script.js`. All questions are capable of being solved with [jQuery](https://api.jquery.com) or standard JavaScript syntax within `script.js`. Modifying any file outside of `script.js` will reduce your score by 1 point.

**Objective:** Complete each function inside of the `script.js` file with its desired functionality as described below. Do NOT modify `index.html`, `styles.css`, or add any additional files.


## Problems

### showMessageForm (0.1 Points)

Complete this function by making the message form and "Send Message" button beneath the welcome message visible.

### sendMessage (0.1 Points)

Complete this function by printing the user-inputted text from the message field (revealed by the function above) to the console.

### addPizzazz (0.2 Points)

Complete this function by adding some [pizzazz](https://www.merriam-webster.com/dictionary/pizzazz) to description text of the flash sale item; change at least **_three_** style attributes (e.g. color, font, font-weight, etc.) of the description text.

### saveBalance (0.3 Points)

Complete this function by replacing the existing gift card balance with the user-inputted balance. Accept only rational numbers (that is, positive or negative numbers, with or without decimal points). Do not accept balances with a dollar sign, or any other illegal character. If the user enters an improper balance, print "Cannot update balance, syntax error!" to the console. Otherwise, update the balance accordingly.

An empty or whitespace-only string is **_not_** considered valid.

### printBalance (0.1 Points)

Complete this function by printing the saved balance to the console in the format "You have {BALANCE_AMOUNT} in your gift card!"

### alertBalance (0.3 Points)

Complete this function by performing the following conditional logic...

- If the saved balance is less than 0, perform a popup alert saying:

`We have a special offer for you! Reload your balance now and earn back 10% bonus rewards.`

- If the saved balance is between 0 and 100 (inclusive), perform a popup alert saying:

`Your current balance is {BALANCE_AMOUNT}. Customers with balance greater than 100 becomes a VIP member and gets a special discount!`

- If the saved balance is over 100, perform a popup alert saying:

`You are our VIP member! You get a 10% discount on every purchase.`

### loadFamilyPlanPaymentsData (0.3 Points)

At Badger Shop, we provide Family Plan, a subscription program for your family that gives family members access to premium services! Complete this function by displaying the data from the array of objects provided within the function to the table. You **_must_** use a form of looping construct over the array of data!

Additionally, if a family member has a amount due of more than 20 dollars, highlight that row in red.

Code has already been added to ensure that the data is only displayed once, see `hasLoadedFamilyPlanPaymentsData`.

### addOrderRows (0.4 Points)

**Important:** You must be signed into the Computer Sciences VPN in order to connect to the API below. See [this Wisc Help Article](https://kb.wisc.edu/page.php?id=90370) on how to setup GlobalProtect and connect to the VPN. The portal address for Computer Sciences is [compsci.vpn.wisc.edu](http://compsci.vpn.wisc.edu).

Complete this function by fetching **_four_** orders from an API described below and appending them to the orders table. You may either make four calls to `http://cs571.cs.wisc.edu:53706/api/badgershop/order`, which does not require a parameter, or a single call to `http://cs571.cs.wisc.edu:53706/api/badgershop/orders?amount=<amn>`, which requires a parameter specifying the number of orders to return. These APIs are described in more detail in `order.md` and `orders.md` respectively.

Ordering of the rows is not a concern.

### clearOrderRows (0.2 Points)

Complete this function by clearing all of the order rows. Make sure that you are still able to add additional rows after the table has been cleared!
