const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;


const productSchema = new mongoose.Schema({

    title: { type: String, trim: true, required: 'Title is required', minlength: [2, 'Too Short'], maxlength: [32, 'Too Long'], text: true },
    slug: { type: String, unique: true, lowercase: true, index: true },
    description: { type: String, required: 'Description is required', minlength: [2, 'Too Short'], maxlength: [2000, 'Too Long'], text: true },
    price: { type: Number, required: 'Price is required', trim: true },
    category: { type: ObjectId, ref: "Category" },
    subs: [{ type: ObjectId, ref: "Sub" }],
    quantity: { type: Number },
    sold: { type: Number, default: 0 },
    images: { type: Array },
    shipping: { type: String, enum: ["Yes", "No"] },
    color: { type: String, enum: ["Black", "Brown", "Silver", "White", "Blue"] },
    brand: { type: String, enum: ["Apple", "Samsung", "Microsoft", "Lenovo", "Asus", "HP"] },
    ratings: [{ star: Number, postedBy: { type: ObjectId, ref: "User" } }],



}, { timestamps: true });


module.exports = mongoose.model('Product', productSchema);