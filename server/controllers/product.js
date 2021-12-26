const Product = require('../models/product');
const User = require('../models/user');

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

// list method before pagination  used in homepage

// exports.list = async (req, res) => {
//     try {
//         const { sort, order, limit } = req.body
//         const products = await Product.find({})
//             .populate('subs')
//             .sort([[sort, order]])
//             .limit(limit)
//             .exec();

//         res.json(products);
//     }
//     catch (err) {
//         console.log(err);
//     }
// }

// list method with pagination  used in homepage

exports.list = async (req, res) => {
    try {
        const { sort, order, page } = req.body
        const currentPage = page || 1;
        const perPage = 4;

        const products = await Product.find({})
            .skip((currentPage - 1) * perPage)
            .populate('subs')
            .sort([[sort, order]])
            .limit(perPage)
            .exec();

        res.json(products);
    }
    catch (err) {
        console.log(err);
    }
}

exports.productsCount = async (req, res) => {
    let total = await Product.find({}).estimatedDocumentCount().exec();
    res.json(total);
}

exports.productStar = async (req, res) => {

    let product = await Product.findById(req.params.productid).exec();
    let user = await User.findOne({ email: req.user.email }).exec();
    console.log("user id", user._id)
    const { star } = req.body

    // check if currently logged on user has already rated the product
    let existingRatingObject = product.ratings.find((r) => (r.postedBy.equals(user._id)))
    console.log(existingRatingObject);
    //  if user haven't left a rating the push it
    if (existingRatingObject === undefined) {
        let ratingAdded = await Product.findByIdAndUpdate(product._id, {
            $push: { ratings: { star: star, postedBy: user._id } }
        }, { new: true }).exec();
        res.json(ratingAdded);
    } else {//  if user already left rating then update it 

        const ratingUpdated = await Product.updateOne(

            { ratings: { $elemMatch: existingRatingObject } }, { $set: { "ratings.$.star": star } }, { new: true }

        ).exec();
        res.json(ratingUpdated);
    }

}

exports.listRelated = async (req, res) => {

    const product = await Product.findById(req.params.productId).exec();
    // console.log("PRODUCT", product.category);

    const related = await Product.find({ _id: { $ne: product._id }, category: product.category })
        .limit(3)
        .populate("category")
        .populate("subs")
        .exec();
    res.json(related)
}