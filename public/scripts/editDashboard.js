const createProduct = (productType, productData) => {
  productType = productType.toLowerCase();
  console.log(productType);
  console.log(productData);
  return fetch(`/product/${productType}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(productData),
  });
};

// const updateProduct = (productType, productData) => {
//   return fetch(`/product/${productType}/${productData.id}`, {
//     method: "PUT",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(productData),
//   });
// };

// const deleteProduct = (productType, productId) => {
//   return fetch(`/product/${productType}/${productId}`, {
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
  const productType = document.querySelector("#productType").value;
  const productId = document.querySelector("#productIdInput").value;
  const company = document.querySelector("#companyInput").value;
  const material = document.querySelector("#materialInput").value;

  const productData = {
    id: productId,
    company,
    material,
  };

  createProduct(productType, productData)
    .then((response) => {
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      return response.json();
    })
    .then((data) => {
      console.log(data);
    })
    .catch((error) => {
      console.error(error);
    });
};

// document.querySelector("#updateProduct").addEventListener("submit", (event) => {
//   event.preventDefault();

//   const productType = document.querySelector("#productType").value;
//   const productId = document.querySelector("#productId").value;
//   const company = document.querySelector("#companyInput").value;
//   const material = document.querySelector("#materialInput").value;

//   const productData = {
//     id: productId,
//     company,
//     material,
//   };

//   updateProduct(productType, productData)
//     .then((response) => response.json())
//     .then((data) => {
//       console.log(data);
//     });
// });

// document.querySelector("#deleteProduct").addEventListener("submit", (event) => {
//   event.preventDefault();

//   const productType = document.querySelector("#productType").value;
//   const productId = document.querySelector("#productId").value;

//   deleteProduct(productType, productId)
//     .then((response) => response.json())
//     .then((data) => {
//       console.log(data);
//     });
// });
