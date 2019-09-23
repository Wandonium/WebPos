var data = [
  {
    barcode: 123456,
    name: "Coca Cola Soda",
    category: "Soft Drinks",
    description: "500ml plastic bottle soda, Fanta Passion",
    price: 50.0,
    tax: 0.05
  },
  {
    barcode: 456123,
    name: "Hanaan Toilet Paper",
    category: "Toiletries",
    description: "Small roll toilet paper",
    price: 10.0,
    tax: 0.02
  },
  {
    barcode: 456789,
    name: "Persil Washing Powder",
    category: "Washing Soap",
    description: "500gm of washing powder",
    price: 80.0,
    tax: 0.05
  }
];

//console.log(data);
var tbody = document.getElementById("tbody");

tbody.innerHTML +=
  "<thead class='thead-dark'>" +
  "<tr>" +
  "<th id='#'>" +
  "#" +
  "</th>" +
  "<th id='barcode'>" +
  "Product Barcode" +
  "</th>" +
  "<th id='name'>" +
  "Product Name" +
  "</th>" +
  "<th id='category'>" +
  "Product Category" +
  "</th>" +
  "<th id='description'>" +
  "Description" +
  "</th>" +
  "<th id='price'>" +
  "Price" +
  "</th>" +
  "<th id='tax'>" +
  "Percentage Tax" +
  "</th>" +
  "</tr>" +
  "</thead>";
for (var i = 0; i < data.length; i++) {
  var tr = "<tr>";
  var item = data[i];
  // console.log(item);
  tr += "<td>" + (i + 1) + "</td>";
  tr += "<td>" + item.barcode + "</td>";
  tr += "<td>" + item.name + "</td>";
  tr += "<td>" + item.category + "</td>";
  tr += "<td>" + item.description + "</td>";
  tr += "<td>" + item.price + "</td>";
  tr += "<td>" + item.tax + "</td>";
  tr += "</tr>";
  tbody.innerHTML += tr;
}

document.getElementById("tableId").onclick = function(e) {
  var tr = e.target.parentNode;
  var index = tr.cells[0].textContent - 1;
  var currentObject = data[index];
  var headline = document.getElementById("product-headline");
  headline.innerHTML = currentObject.name;
};
