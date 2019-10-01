var data = [
  {
    barcode: 62345400989,
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
    quantity: 2,
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

console.log("Hello World.");
function addItem() {
  tableManuvre();
}

var tbody = document.getElementById("tbody");
var oddRows = document.querySelectorAll(".table-striped tbody tr:nth-of-type(2n+1)");
var evenRows = document.querySelectorAll(".table-striped tbody tr:nth-of-type(2n)");
function tableColoring() {
  oddRows.forEach((element) => {
    element.style.backgroundColor = "#E7DFDD";
    element.style.color = "#E7DFDD";
  });
  evenRows.forEach((element) => element.style.color = "white");
}

tableColoring();
function keyListener(event){
  var keycode;
  if (window.event)
      keycode = window.event.keyCode;
  else if (e)
      keycode = e.which;
  
  if(keycode === 13) {
    console.log("Key pressed.")
    tableManuvre();
  }
}

function tableManuvre() {
  var barcode = document.getElementById("bcode").value;
  var item = document.getElementById("item");
  var lookup = document.getElementById("icode");
  if(tableRow < 10) {
    for(var i = 0; i < data.length; i++) {
      if(data[i].barcode == barcode) {
        if((tableRow % 2) === 0) {
          evenRows[evenRowIndex].style.color = "black";
          var cells = evenRows[evenRowIndex].getElementsByTagName("td");
          cells[0].innerHTML = data[i].barcode;
          cells[1].innerHTML = data[i].item;
          cells[2].innerHTML = data[i].price;
          cells[3].innerHTML = data[i].quantity;
          cells[4].innerHTML = data[i].tax;
          cells[5].innerHTML = data[i].discount;
          cells[6].innerHTML = data[i].total;
          evenRowIndex = evenRowIndex + 1;
          item.value = data[i].item;
          lookup.value = data[i].lookup;
        } else {
          oddRows[oddRowIndex].style.color="black";
          var cells = oddRows[oddRowIndex].getElementsByTagName("td");
          cells[0].innerHTML = data[i].barcode;
          cells[1].innerHTML = data[i].item;
          cells[2].innerHTML = data[i].price;
          cells[3].innerHTML = data[i].quantity;
          cells[4].innerHTML = data[i].tax;
          cells[5].innerHTML = data[i].discount;
          cells[6].innerHTML = data[i].total;
          oddRowIndex = oddRowIndex + 1;
          item.value = data[i].item;
          lookup.value = data[i].lookup;
        }
        tableRow = tableRow + 1;
      }
    }
  } else {
    tableRow = 1;
    evenRowIndex = 0;
    oddRowIndex = 0;
    tableColoring();
  }
}

function onBarcodeChange() {
  /*var barcode = document.getElementById("bcode").value;
  for(var i = 0; i < data.length; i++) {
    console.log(data[i].barcode);
  }*/
}