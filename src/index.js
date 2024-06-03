const express = require("express");
const dotenv = require("dotenv");

const app = express();

dotenv.config();

const PORT = process.env.PORT;

app.use(express.json())

app.get("/api", (req, res) => {
    res.send("Hello World");  
});

const productController =  require("./product/product.controller");

app.use("/api", productController )

app.listen(PORT, () =>{
    console.log("Express API running in port : " + PORT);
})