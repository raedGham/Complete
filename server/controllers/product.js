const Product = require('../models/product');
const slugify = require('slugify');

exports.create = async (req, res) => {
    try {
        const { title } = req.body;
        req.body.slug = slugify(title);
        const newProduct = await new Product(req.body).save();
        //console.log(newProduct);
        res.json(newProduct);
    } catch (err) {
        console.log("SERVER CREATE PRODUCT ERROR:", err.message);
        // res.status(400).send("Create Product failed");
        res.status(400).json({ err: err.message });
    }
};

exports.listAll = async (req, res) => {
    console.log(req.params.count);
    const products = await Product.find({})
        .limit(parseInt(req.params.count))
        .populate('category')
        .populate('subs')
        .sort([["createdAt", "desc"]])
        .exec();
    res.json(products);
}

exports.remove = async (req, res) => {
    try {
        const deleted = await Product.findOneAndDelete({ slug: req.params.slug }).exec();
        res.json(deleted);
    } catch (err) {
        res.status(400).send("Product delete failed");
    }
};

exports.read = async (req, res) => {
    try {
        let product = await Product.findOne({ slug: req.params.slug })
            .populate("category")
            .populate("subs")
            .exec()
        res.json(product);
    } catch (err) {
        res.status(400).send("Product not Found");
    }
};

exports.update = async (req, res) => {
    try {
        if (req.body.title) {
            req.body.slug = slugify(req.body.title);
        }
        let updated = await Product.findOneAndUpdate({ slug: req.params.slug }, req.body, { new: true }).exec();
        res.json(updated);
    } catch (err) {
        res.status(400).send("Product update failed");
    }
};

exports.list = async (req, res) => {
    try {
        const  {sort , order, limit} = req.body
        const  products = await Product.find({})
        .populate('subs')
        .sort([[sort, order]])
        .limit(limit)
        .exec();

        res.json(products);
    }
    catch (err) {
      console.log(err);
    }
}