const createProduct = (productData) => {
  return fetch(`/products`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(productData),
  });
};

// const updateProduct = (id, productData) => {
//   return fetch(`/products/${id}`, {
//     method: "PUT",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(productData),
//   });
// };

// const deleteProduct = (id) => {
//   return fetch(`/products/${id}`, {
//     method: "DELETE",
//     headers: {
//       "Content-Type": "application/json",
//     },
//   });
// };

const form = document.getElementById("crudForm");
const createProductBtn = document.getElementById("createProductBtn");
createProductBtn.onclick = (event) => {
  event.preventDefault();
  console.log("create product");
  const modelNumber = document.querySelector("#modelNumber").value;
  const productType = document.querySelector("#productType").value;
  const material = document.querySelector("#material").value;

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
};
// const updateProductBtn = document.getElementById("updateProductBtn");
// updateProductBtn.onclick = (event) => {
//   event.preventDefault();

//   const id = document.querySelector("#productId").value;
//   const modelNumber = document.querySelector("#modelNumber").value;
//   const productType = document.querySelector("#productType").value;
//   const material = document.querySelector("#material").value;

//   const productData = {
//     modelNumber,
//     productType,
//     material,
//   };

//   updateProduct(id, productData)
//     .then((response) => response.json())
//     .then((data) => {
//       console.log(data);
//     });
// };
// const deleteProductBtn = document.getElementById("deleteProductBtn");
// deleteProductBtn.onclick = (event) => {
//   event.preventDefault();

//   const id = document.querySelector("#productId").value;

//   deleteProduct(id)
//     .then((response) => response.json())
//     .then((data) => {
//       console.log(data);
//     });
// };
