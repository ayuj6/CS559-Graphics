
// Do NOT modify any files outside of this.

let hasLoadedFamilyPlanPaymentsData = false;

function showMessageForm() {
	var frm = document.getElementById("messageArea");
	frm.style.visibility = 'visible';
}

function sendMessage() {
	var txtarea = document.getElementById("messageField");
	console.log(txtarea.value);
}

function addPizzazz() {
	var txt = document.getElementsByName("flashSale");
	var length = txt.length;
	for (var i = 0; i < length; i++) {
		txt[i].style.color = 'blue';
		txt[i].style.fontSize = "20px";
		txt[i].style.fontWeight = "bold";
	}

}

function saveBalance() {
	var bal = document.getElementById("balanceInput").value;
	var toChange = document.getElementById("balance");
	if (isNaN(bal)) {
		console.log("Cannot update balance, syntax error!");
	}
	else {
		if (bal != null && bal.trim() !== '') {
			if (bal.includes(' ')) {
				console.log("Cannot update balance, syntax error!");
			}
			else {
				toChange.textContent = bal;
			}
		}
		else {
			console.log("Cannot update balance, syntax error!");
		}
	}
}

function printBalance() {
	var bal2 = document.getElementById("balance").innerHTML;
	console.log(`You have ${bal2} in your gift card!`)
}

function alertBalance() {
	var bal3 = document.getElementById("balance").innerHTML;

	if (bal3 < 0) {
		alert("We have a special offer for you! Reload your balance now and earn back 10% bonus rewards.");
	}
	else if (bal3 >= 0 && bal3 <= 100) {
		alert(`Your current balance is ${bal3}. Customers with balance greater than 100 becomes a VIP member and gets a special discount!`);
	}
	else {
		alert("You are our VIP member! You get a 10% discount on every purchase.");
	}
}

function loadFamilyPlanPaymentsData() {

	if (hasLoadedFamilyPlanPaymentsData) {
		return;
	} else {
		hasLoadedFamilyPlanPaymentsData = true;
	}

	let familyPlanPaymentsData = [
		{
			name: "Maria",
			amountDue: 0.00
		},
		{
			name: "Daniel",
			amountDue: 35.57
		},
		{
			name: "Jin",
			amountDue: 5.58
		},
		{
			name: "Ahmad",
			amountDue: 25.91
		}
	];

	var table = document.getElementById("familyPlanAmountDue");
	for (let item of familyPlanPaymentsData) {
		row = table.insertRow(-1);
		for (let key in item) {
			var cell = row.insertCell(-1);
			if (item.amountDue > 20) {
				cell.innerHTML = item[key];
				cell.style.color = "red";
			}
			else {
				cell.innerHTML = item[key];
			}
		}
	}
}

function addOrderRows() {
	var table = document.getElementById("myOrders");

	for (var i = 0; i < 4; i++) {
		fetch("http://cs571.cs.wisc.edu:53706/api/badgershop/order")
			.then(function (response) {
				return response.json();
			})
			.then(function (data) {
				row = table.insertRow(-1);
				for (let key in data) {
					var cell = row.insertCell(-1);
					cell.innerHTML = data[key];
				}
			})

	}
}

function clearOrderRows() {
	var tableHeaderRowCount = 1;
	var table = document.getElementById('myOrders');
	var rowCount = table.rows.length;
	for (var i = tableHeaderRowCount; i < rowCount; i++) {
		table.deleteRow(tableHeaderRowCount);
	}

}
