// berkomukasi dengan database
// boleh pake orm, boleh row query
// supaya apa? supaya kalau mau ganti orm tinggal edit di file ini aja 

const prisma = require("../db");

const findProducts = async () => {
    const product = await prisma.product.findMany();
    return product;
}

const findProductById = async (id) => {
    const product = await prisma.product.findUnique({
        where:{
            id,
        }
    })
    return product
}

const insertProduct = async (productData)=>{
    const product = await prisma.product.create({
        data:{
            name : productData.name,
            description : productData.description,
            image : productData.image,
            price : productData.price
        }
    })
    return product;
}

const deleteProduct = async (id) => {
    await prisma.product.delete({
        where : {
            id,
        }
    })
}

const editProduct = async (id, productData) =>{
    const product = await prisma.product.update({
        where :{
            id,
            },
            data : {
                description : productData.description,
                name : productData.name,
                image : productData.image,
                price: productData.price
            },
        });
       return product
}

module.exports = {
    findProducts,
    findProductById,
    insertProduct,
    deleteProduct,
    editProduct
}