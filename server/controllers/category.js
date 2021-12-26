const Category = require('../models/category');
const Sub = require('../models/sub');
const Product = require('../models/product');
const slugify = require('slugify');


exports.create = async (req, res) => {
    try {
        const { name } = req.body;
        const category = await new Category({ name, slug: slugify(name) }).save();
        res.json(category);
    } catch (err) {
        //console.log(err);
        res.status(400).send("Create category failed");
    }
};


exports.list = async (req, res) => {
    try {
        const categoryList = await Category.find({}).sort({ createdAt: -1 }).exec();
        res.json(categoryList);
    } catch (err) {
        res.status(400).send("category List failed");
    }
};

exports.read = async (req, res) => {
    try {
        let category = await Category.findOne({ slug: req.params.slug }).exec();
        // res.json(category);
        let products = await Product.find({ category: category }).populate("category").exec();
        res.json({ category, products });

    } catch (err) {
        res.status(400).send("category not Found");
    }
};

exports.update = async (req, res) => {
    try {
        const { name } = req.body;
        console.log(req.body);
        let updated = await Category.findOneAndUpdate({ slug: req.params.slug }, { name, slug: slugify(name) }, { new: true });
        res.json(updated);
    } catch (err) {
        res.status(400).send("category update failed");
    }
};

exports.remove = async (req, res) => {
    try {
        const deleted = await Category.findOneAndDelete({ slug: req.params.slug });
        res.send(deleted);
    } catch (err) {
        res.status(400).send("category delete failed");
    }
};

exports.getSubs = (req, res) => {

    Sub.find({ parent: req.params._id }).exec((err, subs) => {
        if (err) console.log(err);
        res.json(subs);
    });
};