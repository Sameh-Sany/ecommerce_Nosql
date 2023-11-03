const Product = require("../models/product.model");

const success = require("../utils/success");

const InternalError = require("../utils/InternalError");

exports.getAllProducts = async (req, res, next) => {
  try {
    const products = await Product.find().populate("category");
    res.status(200).json(success(products));
  } catch (error) {
    return next(new InternalError(error));
  }
};

exports.getProductById = async (req, res, next) => {
  const { id } = req.params;

  try {
    const product = await Product.findById(id).populate("category");
    res.status(200).json(success(product));
  } catch (error) {
    return next(new InternalError(error));
  }
};

exports.createProduct = async (req, res, next) => {
  const { name, description, price, category, image, stockQuantity } = req.body;
  try {
    const product = await Product.create({
      name,
      description,
      price,
      category,
      image,
      stockQuantity,
    });
    res.status(201).json(success(product));
  } catch (error) {
    return next(new InternalError(error));
  }
};

exports.updateProduct = async (req, res, next) => {
  const { id } = req.params;
  const { name, description, price, category, image, stockQuantity } = req.body;

  try {
    const product = await Product.findByIdAndUpdate(
      id,
      {
        name,
        description,
        price,
        category,
        image,
        stockQuantity,
      },
      { new: true }
    );
    res.status(200).json(success(product));
  } catch (error) {
    return next(new InternalError(error));
  }
};

exports.deleteProduct = async (req, res, next) => {
  const { id } = req.params;

  try {
    const product = await Product.findByIdAndDelete(id);
    res.status(204).json({
      message: "Product deleted successfully",
    });
  } catch (error) {
    return next(new InternalError(error));
  }
};
