var data = [
  {
    barcode: 7890,
    lookup: "#3445CB2",
    item: "Coffee Table 815-3R",
    price: 10500,
    quantity: 1,
    tax: 16,
    discount: 0,
    total: 10500.00
  },
  {
    barcode: 5678,
    lookup: "#F8G893",
    item: "10MM drill",
    price: 15541.70,
    quantity: 1,
    tax: 16,
    discount: 0,
    total: 15541.70
  },
  {
    barcode: 1245,
    lookup: "#898DSD",
    item: "250L of Water, Aqua Ltd",
    price: 250.50,
    quantity: 1,
    tax: 16,
    discount: 0,
    total: 500
  },
  {
    barcode: 1234,
    lookup: "#898ASDX",
    item: "Ironing Board, Philips",
    price: 8050,
    quantity: 1,
    tax: 16,
    discount: 0,
    total: 8050
  }
]

var oddRowIndex = 0;
var evenRowIndex = 0;
var tableRow = 1;
var grandTotal = 0;
var totalContent = document.getElementById("grand-total");
var totalSale = document.getElementById("total-sale");
var totalHeader = document.getElementById("grand-header");
var cash = 0;
var loyaltyPoints = 0;
var balance = 0;
var barcodeArray = [];

function init() {
  document.getElementById("bcode").value = "";
  document.getElementById("item").value = "";
  document.getElementById("icode").value = "";
  document.getElementById("qty").value = "";
  document.getElementById("total-sale").value = "Kshs 0.00";
  document.getElementById("credit-card").value = "";
  document.getElementById("loyalty-points").value = "";
  document.getElementById("cash-tendered").value = "";
  document.getElementById("balance").value = "Kshs 0.00";
}

init();

function addItem() {
  tableManuvre();
}

var tbody = document.getElementById("tbody");
var oddRows = document.querySelectorAll(".table-striped tbody tr:nth-of-type(2n+1)");
var evenRows = document.querySelectorAll(".table-striped tbody tr:nth-of-type(2n)");
function tableClear() {
  oddRows.forEach((element) => {
    element.style.backgroundColor = "#E7DFDD";
    element.style.color = "#E7DFDD";
  });
  evenRows.forEach((element) => element.style.color = "white");
}

tableClear();


function openDrawer() {
  if(cash === 0) {
    alert("Error! Cash Tendered is Kshs 0.00");
  } else {
    document.getElementById("t-sale").value = "Kshs " + grandTotal.toFixed(2);
    document.getElementById("l-points").value = loyaltyPoints + " points";
    document.getElementById("c-tendered").value = "Kshs " + cash;
    document.getElementById("l-balance").value = "Kshs " + balance.toFixed(2);
    $('#myModal').modal('show');
  }
}

function searchItem() {
  var barcode = document.getElementById("bcode").value;
  if(barcode) {
    var item = null;
    data.forEach((element) => {
      if(element.barcode == barcode) {
        item = element;
      }
    })
    document.getElementById("exampleModalLongTitle").innerHTML = item.item;
    document.getElementById("modalBarcode").value = item.barcode;
    document.getElementById("modalLookup").value = item.lookup;
    document.getElementById("description").value = item.item;
    document.getElementById("modalPrice").value = item.price;
    document.getElementById("modalTax").value = item.tax;
    $('#searchModal').modal('show');
  } else {
    alert("Error! Enter barcode to search for item.");
  }
}

function clearItems(){
  tableRow = 1;
  evenRowIndex = 0;
  oddRowIndex = 0;
  grandTotal = 0;
  cash = 0;
  loyaltyPoints = 0;
  balance = 0;
  init();
  tableClear();
  totalContent.innerHTML = "Kshs " + 0;
  totalSale.value = "Kshs " + 0;
  totalHeader.innerHTML = "Total";
}

function removeItem() {
  if((tableRow % 2) === 0) {
    oddRows[oddRowIndex-1].style.color="#E7DFDD";
    var barcode = barcodeArray.pop();
    var item = null;
    data.forEach((element) => {
      if(element.barcode == barcode) {
        item = element;
      }
    })
    grandTotal = grandTotal - item.total;
    oddRowIndex = oddRowIndex - 1;
  } else {
    evenRows[evenRowIndex-1].style.color = "white";
    var barcode = barcodeArray.pop();
    var item = null;
    data.forEach((element) => {
      if(element.barcode == barcode) {
        item = element;
      }
    })
    grandTotal = grandTotal - item.total;
    evenRowIndex = evenRowIndex - 1;
  }
  tableRow = tableRow - 1;
  totalContent.innerHTML = "Kshs " + grandTotal.toFixed(2);
  totalSale.value = "Kshs " + grandTotal.toFixed(2);
}

function calculateBalance(event){
  var keycode;
  if (window.event)
      keycode = window.event.keyCode;
  else if (e)
      keycode = e.which;
  
  if(keycode === 13) {
    cash = document.getElementById("cash-tendered").value;
    if(cash < grandTotal) {
      alert("Error! Cash tendered is less than total sale!");
    } else {
      balance = cash - grandTotal;
      document.getElementById("balance").value = "Kshs " + balance.toFixed(2);
      totalContent.innerHTML = "Kshs " + balance.toFixed(2);
      totalHeader.innerHTML = "Balance";
      var points = document.getElementById("loyalty-points").value;
      loyaltyPoints = points === "" ? 0 : points;
      console.log("loyalty points: " + loyaltyPoints);
    }
  }
}

function keyListener(event){
  var keycode;
  if (window.event)
      keycode = window.event.keyCode;
  else if (e)
      keycode = e.which;
  
  if(keycode === 13) {
    tableManuvre();
  }
}

function tableManuvre() {
  var barcode = document.getElementById("bcode").value;
  var item = document.getElementById("item");
  var lookup = document.getElementById("icode");
  var quantity = document.getElementById("qty").value;
  document.getElementById("qty").value = "";
  if(tableRow < 10) {
    for(var i = 0; i < data.length; i++) {
      if(data[i].barcode == barcode) {
        if(quantity != 0){
          data[i].quantity = quantity;
        } else {
          data[i].quantity = 1;
        }
        
        if((tableRow % 2) === 0) {
          evenRows[evenRowIndex].style.color = "black";
          var cells = evenRows[evenRowIndex].getElementsByTagName("td");
          cells[0].innerHTML = data[i].barcode;
          cells[1].innerHTML = data[i].item;
          cells[2].innerHTML = data[i].price;
          cells[3].innerHTML = data[i].quantity;
          cells[4].innerHTML = data[i].tax;
          cells[5].innerHTML = data[i].discount;
          data[i].total = (data[i].price * data[i].quantity) - data[i].discount;
          grandTotal = grandTotal + data[i].total;
          cells[6].innerHTML = data[i].total;
          evenRowIndex = evenRowIndex + 1;
          item.value = data[i].item;
          lookup.value = data[i].lookup;
          barcodeArray.push(data[i].barcode);
        } else {
          oddRows[oddRowIndex].style.color="black";
          var cells = oddRows[oddRowIndex].getElementsByTagName("td");
          cells[0].innerHTML = data[i].barcode;
          cells[1].innerHTML = data[i].item;
          cells[2].innerHTML = data[i].price;
          cells[3].innerHTML = data[i].quantity;
          cells[4].innerHTML = data[i].tax;
          cells[5].innerHTML = data[i].discount;
          data[i].total = (data[i].price * data[i].quantity) - data[i].discount;
          grandTotal = grandTotal + data[i].total;
          cells[6].innerHTML = data[i].total;
          oddRowIndex = oddRowIndex + 1;
          item.value = data[i].item;
          lookup.value = data[i].lookup;
          barcodeArray.push(data[i].barcode);
        }
        tableRow = tableRow + 1;
      }
    }
  } else {
    tableRow = 1;
    evenRowIndex = 0;
    oddRowIndex = 0;
    tableClear();
  }
  totalContent.innerHTML = "Kshs " + grandTotal.toFixed(2);
  totalSale.value = "Kshs " + grandTotal.toFixed(2);
}


function onBarcodeChange() {
  /*var barcode = document.getElementById("bcode").value;
  for(var i = 0; i < data.length; i++) {
    console.log(data[i].barcode);
  }*/
}