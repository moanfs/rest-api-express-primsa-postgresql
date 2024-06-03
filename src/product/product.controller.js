// layer untuk handle request dan response
// biasayna juga untuk validasi body

const express = require('express');
const prisma = require("../db");
const { getAllProducts, getProductById, createProduct, deleteProductById, editProductById } = require('./product.service');

const router = express.Router();

router.get("/products", async (req, res) =>{
    const products = await getAllProducts();
    res.send(products);
});

router.get("/products/:id", async (req, res) =>{
    try {
        const productId = req.params.id;
        const product = await getProductById(productId);
        res.send(product);
    } catch (error) {
        res.status(400).send(error.message)
    }
})

router.post("/products", async (req, res) =>{
    try {
        const newProductData = req.body;

        const product = await createProduct(newProductData);
        res.status(201).send({
        data : product,
        message : "create products success"
    });
    } catch (error) {
       res.status(400).send(error.message) 
    }
    
});

router.delete("/products/:id", async (req, res) =>{
    try {
        const productId = req.params.id;
    
        await deleteProductById(productId)
        res.send("product deleted")
    } catch (error) {
        res.status(400).send(error.message)
    }
});

router.put("/products/:id", async (req, res) =>{
    const productId = req.params.id;
    const productData = req.body;

    if(!(productData.image && productData.description && productData.price && productData.name)){
        return res.status(400).send("fields Mising");
    }
        const product = await editProductById(productId, productData)
        res.send({
            data : product,
            message : "edit products success"
        })
});

router.patch("/products/:id", async (req, res) =>{
    try {     
        const productId = req.params.id;
        const productData = req.body;
    
        const product = await editProductById(productId, productData)
            res.send({
                data : product,
                message : "edit products success"
            })
    } catch (error) {
        res.status(400).send(error.message)
    }
});

module.exports = router;

