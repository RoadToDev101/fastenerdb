// Update a product
$("#updateProductForm").submit(function (event) {
  const updateProduct = (productData) => {
    return fetch(`/api/products/${productData._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(productData),
    });
  };

  event.preventDefault();
  const _id = document.querySelector("#modelUUIDInput").value;
  const modelNumber = document.querySelector("#modelNumberInput").value;
  const productType = document.querySelector("#productTypeInput").value;
  const material = document.querySelector("#materialInput").value;

  const productData = {
    _id,
    modelNumber,
    productType,
    material,
  };

  updateProduct(productData)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      location.reload();
    });
});

// Delete a product
if (window.location.pathname == "/") {
  $onclick = $(".table tbody td a.delete");
  $onclick.click(function () {
    const id = $(this).attr("data-id");
    console.log(id);
    fetch(`/api/products/${id}`, {
      method: "DELETE",
    }).then((response) => {
      response.json().then((data) => {
        if (data.error) {
          alert("Error deleting product");
        }
        location.reload();
      });
    });
  });
}
