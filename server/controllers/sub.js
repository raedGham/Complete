const Sub = require('../models/sub');
const slugify = require('slugify');


exports.create = async (req, res) => {
    try {
        const { name } = req.body;
        const sub = await new Sub({ name, slug: slugify(name) }).save();
        res.json(sub);
    } catch (err) {
        //console.log(err);
        res.status(400).send("Create sub category failed");
    }
};


exports.list = async (req, res) => {
    try {
        const subList = await Sub.find({}).sort({ createdAt: -1 }).exec();
        res.json(subList);
    } catch (err) {
        res.status(400).send("Sub category List failed");
    }
};

exports.read = async (req, res) => {
    try {
        let sub = await Sub.findOne({ slug: req.params.slug }).exec();
        res.json(sub);
    } catch (err) {
        res.status(400).send("sub category not Found");
    }
};

exports.update = async (req, res) => {
    try {
        const { name } = req.body;
        console.log(req.body);
        let updated = await Sub.findOneAndUpdate({ slug: req.params.slug }, { name, slug: slugify(name) }, { new: true });
        res.json(updated);
    } catch (err) {
        res.status(400).send("Sub category update failed");
    }
};

exports.remove = async (req, res) => {
    try {
        const deleted = await Sub.findOneAndDelete({ slug: req.params.slug });
        res.send(deleted);
    } catch (err) {
        res.status(400).send("Sub category delete failed");
    }
};