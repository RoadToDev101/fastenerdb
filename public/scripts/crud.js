// This file contains the CRUD operations for the fastener database

// Function create a new product
const createProduct = (productData) => {
  return fetch(`/products`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(productData),
  });
};

// Create a new product
const form = document.getElementById("crudForm");
const createProductBtn = document.getElementById("addNewProductBtn");
createProductBtn.onclick = (event) => {
  event.preventDefault();
  console.log("create product");
  const modelNumber = document.querySelector("#modelNumberInput").value;
  const productType = document.querySelector("#productTypeInput").value;
  const material = document.querySelector("#materialInput").value;

  const productData = {
    modelNumber,
    productType,
    material,
  };

  createProduct(productData)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
    });
  console.log(productData);
};

// Open Add Product Modal
// Get the modal element
var addProductModal = document.getElementById("addProductModal");

// Get the button that opens the modal
var addProductBtn = document.getElementById("addProductBtn");

// Get the <span> element that closes the modal
var closeModalSpan = addProductModal.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal
addProductBtn.onclick = function () {
  addProductModal.style.display = "block";
};

// When the user clicks on <span> (x), close the modal
closeModalSpan.onclick = function () {
  addProductModal.style.display = "none";
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == addProductModal) {
    addProductModal.style.display = "none";
  }
};

//Search product by model number
const searchInput = document.querySelector("#searchInput");
const dataTable = document.querySelector("#dataTable");

searchInput.addEventListener("keyup", function () {
  const searchTerm = this.value.toLowerCase();
  const rows = dataTable.getElementsByTagName("tr");
  Array.from(rows).forEach(function (row) {
    const productName = row.getElementsByTagName("td")[0].textContent;
    if (productName.toLowerCase().indexOf(searchTerm) != -1) {
      row.style.display = "";
    } else {
      row.style.display = "none";
    }
  });
});
