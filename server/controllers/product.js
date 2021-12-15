const Product =  require('../models/product');
const slugify = require('slugify');

exports.create = async (req, res) => {
    try {
        const {  title } = req.body;
        req.body.slug =  slugify(title) ;
        const newProduct = await new Product(req.body).save();
        //console.log(newProduct);
        res.json(newProduct);
    } catch (err) {
        console.log("SERVER CREATE PRODUCT ERROR:", err.message);
       // res.status(400).send("Create Product failed");
        res.status(400).json({err: err.message});
    }
};

exports.read = async(req, res) => {    
    const products = await Product.find({});
    res.json(products);
    } 
    
