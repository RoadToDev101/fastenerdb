$("#addProductForm").submit(function (event) {
  const addProduct = (productData) => {
    return fetch("/api/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(productData),
    });
  };

  event.preventDefault();
  const modelNumber = document.querySelector("#modelNumberInput").value;
  const productType = document.querySelector("#productTypeInput").value;
  const material = document.querySelector("#materialInput").value;

  const productData = {
    modelNumber,
    productType,
    material,
  };

  addProduct(productData)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      location.reload();
    });
});
