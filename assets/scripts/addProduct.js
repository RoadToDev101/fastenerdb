// Add a product
$("#addProductForm").submit(function (event) {
  const addProduct = (productData) => {
    return fetch(`/api/products/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(productData),
    });
  };

  event.preventDefault();
  const modelName = document.querySelector("#modelNameInput").value;
  const productType = document.querySelector("#productTypeInput").value;
  const materialId = document.querySelector("#materialInput").value;

  const productData = {
    modelName,
    productType,
    materialId,
  };

  addProduct(productData)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      location.reload();
    });
});

// Add product form
function showCheckboxes() {
  var checkboxes = document.getElementById("checkboxes");
  if (checkboxes.style.display === "block") {
    checkboxes.style.display = "none";
  } else {
    checkboxes.style.display = "block";
  }
}

var checkboxes = document.querySelectorAll('input[name="threadType"]');
checkboxes.forEach(function (checkbox) {
  checkbox.addEventListener("change", function () {
    var inputFields = this.parentNode.querySelectorAll('input[type="number"]');
    if (this.checked) {
      inputFields.forEach(function (field) {
        field.style.display = "block";
      });
    } else {
      inputFields.forEach(function (field) {
        field.style.display = "none";
      });
    }
  });
});

// Get all section headers
const sectionHeaders = document.querySelectorAll(".section-header");

// Add click event listener to each section header
sectionHeaders.forEach((header) => {
  header.addEventListener("click", () => {
    // Get section content
    const content = header.nextElementSibling;

    // Hide all other sections
    sectionHeaders.forEach((otherHeader) => {
      if (otherHeader !== header) {
        const otherContent = otherHeader.nextElementSibling;
        otherContent.style.display = "none";
      }
    });

    // Toggle visibility of current section content
    if (content.style.display === "block") {
      content.style.display = "none";
    } else {
      content.style.display = "block";
    }
  });
});
