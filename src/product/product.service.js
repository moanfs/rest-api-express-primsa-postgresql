/// service layer untuk handle buiness layer
// kenapaa dipisa? supaya tannggung jawab ter-isolate, dan functionya " reusable"

const prisma = require("../db");
const { findProducts, findProductById, deleteProduct, editProduct, insertProduct } = require("./product.repository");

const getAllProducts = async () =>{
    const products = await findProducts();
    return products;
}

const getProductById  = async (id) =>{
    const product = await findProductById(id)
    if (!product) {
        throw Error("Product Not Found")
    }
    return product;
}

const createProduct = async (newProductData) =>{
    const product = await insertProduct(newProductData)
    return product;
}

const deleteProductById = async (id) =>{        
    await getProductById(id)
    await deleteProduct(id)
}

const editProductById = async (id, productData) =>{
    await getProductById(id);
    const product = await editProduct(id, productData)
    return product
}

// const putProductById = async (id,productData) =>{
//     const product = await pacthProductById(id, productData)
//     return product;  
// }

module.exports = {
    getAllProducts,
    getProductById,
    createProduct,
    deleteProductById,
    editProductById,
}