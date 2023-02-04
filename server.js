const express = require("express");
const MongoClient = require("mongodb").MongoClient;
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const fs = require("fs");

const app = express();
// Serve static files from the "public" directory
app.use(express.static("public"));

// Route to serve the default "index.html" file
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});
// Read configuration file
const config = JSON.parse(fs.readFileSync("./config/config.json"));
const url = `mongodb+srv://${config.dbUsername}:${config.dbPassword}@sst.eyg8ymj.mongodb.net/users`;

// Use body-parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Connect to MongoDB Atlas
MongoClient.connect(url, { useNewUrlParser: true }, (err, client) => {
  if (err) {
    console.log(err);
    return res.status(500).send({ message: "Error connecting to database." });
  } else {
    // const dbUsers = client.db("users");
    // const users = dbUsers.collection("users");
    const dbProduct = client.db("product");
    const screwCollection = dbProduct.collection("screw");
    // const nailCollection = dbProduct.collection("nail");
    // const anchorCollection = dbProduct.collection("anchor");
    // Route to handle user sign-in
    // app.post("/signin", async (req, res) => {
    //   const user = await users.findOne({ username: req.body.username });

    //   if (user) {
    //     // Compare password with hashed password stored in the database
    //     const isPasswordCorrect = await bcrypt.compare(
    //       req.body.password,
    //       user.password
    //     );

    //     if (isPasswordCorrect) {
    //       // Login successful, redirect to editDashboard.html
    //       res.redirect("/editDashboard.html");
    //     } else {
    //       // Login failed, send error message
    //       res.status(401).send("Incorrect username or password");
    //     }
    //   } else {
    //     // Login failed, send error message
    //     res.status(401).send("Incorrect username or password");
    //   }
    // });
    app.post("/product/productType", async (req, res) => {
      console.log(req.body);
      res.json(req.body);
      const productType = req.params.productType;
      switch (productType) {
        case "screw":
          screwCollection.insertOne(
            {
              productID: req.body.id,
              company: req.body.company,
              material: req.body.material,
            },
            (err, result) => {
              if (err) {
                console.log(err);
                res.status(500).send({ message: "Internal Server Error" });
              } else {
                res.send({ message: "Screw created successfully" });
              }
            }
          );
          break;
        //   case "nail":
        //     nailCollection.insertOne(
        //       {
        //         productID: req.body.id,
        //         company: req.body.company,
        //         material: req.body.material,
        //       },
        //       (err, result) => {
        //         if (err) {
        //           console.log(err);
        //           res.status(500).send({ message: "Internal Server Error" });
        //         } else {
        //           res.send({ message: "Nail created successfully" });
        //         }
        //       }
        //     );
        //     break;
        //   case "anchor":
        //     anchorCollection.insertOne(
        //       {
        //         productID: req.body.id,
        //         company: req.body.company,
        //         material: req.body.material,
        //       },
        //       (err, result) => {
        //         if (err) {
        //           console.log(err);
        //           res.status(500).send({ message: "Internal Server Error" });
        //         } else {
        //           res.send({ message: "Anchor created successfully" });
        //         }
        //       }
        //     );
        //     break;
        default:
          res.status(400).send({ message: "Invalid product type" });
      }
    });

    // app.get("/product/:productType", async (req, res) => {
    //     const dbProduct = client.db("product");
    // const screwCollection = dbProduct.collection("screw");
    // const nailCollection = dbProduct.collection("nail");
    // const anchorCollection = dbProduct.collection("anchor");
    //     const productType = req.params.productType;
    //     switch (productType) {
    //         case "screw":
    //             screwCollection.find({}).toArray((err, result) => {
    //                 if (err) {
    //                     console.log(err);
    //                     res.status(500).send({ message: "Internal Server Error" });
    //                 } else {
    //                     res.send(result);
    //                 }
    //             });
    //             break;
    //         case "nail":
    //             nailCollection.find({}).toArray((err, result) => {
    //                 if (err) {
    //                     console.log(err);
    //                     res.status(500).send({ message: "Internal Server Error" });
    //                 } else {
    //                     res.send(result);
    //                 }
    //             });
    //             break;
    //         case "anchor":
    //             anchorCollection.find({}).toArray((err, result) => {
    //                 if (err) {
    //                     console.log(err);
    //                     res.status(500).send({ message: "Internal Server Error" });
    //                 } else {
    //                     res.send(result);
    //                 }
    //             });
    //             break;
    //         default:
    //             res.status(400).send({ message: "Invalid product type" });
    //     }
    // });
    // app.get("/product/:productType/:productID", async (req, res) => {
    //     const dbProduct = client.db("product");
    // const screwCollection = dbProduct.collection("screw");
    // const nailCollection = dbProduct.collection("nail");
    // const anchorCollection = dbProduct.collection("anchor");
    //     const productType = req.params.productType;
    //     const productID = req.params.productID;
    //     switch (productType) {
    //         case "screw":
  }
});
const port = 3000;
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
