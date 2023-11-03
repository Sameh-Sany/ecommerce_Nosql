const Category = require("../models/category.model.js");
const success = require("../utils/success");
const InternalError = require("../utils/InternalError");

exports.getAllCategories = async (req, res, next) => {
  try {
    const categories = await Category.find();
    res.status(200).json(success(categories));
  } catch (error) {
    return next(new InternalError(error));
  }
};

exports.getCategoryById = async (req, res, next) => {
  const { id } = req.params;

  try {
    const category = await Category.findById(id);
    res.status(200).json(success(category));
  } catch (error) {
    return next(new InternalError(error));
  }
};

exports.createCategory = async (req, res, next) => {
  const { name, image } = req.body;
  try {
    const category = await Category.create({
      name,
      image,
    });
    res.status(201).json(success(category));
  } catch (error) {
    return next(new InternalError(error));
  }
};

exports.updateCategory = async (req, res, next) => {
  const { id } = req.params;
  const { name, image } = req.body;

  try {
    const category = await Category.findByIdAndUpdate(
      id,
      {
        name,
        image,
      },
      { new: true }
    );
    res.status(200).json(success(category));
  } catch (error) {
    return next(new InternalError(error));
  }
};

exports.deleteCategory = async (req, res, next) => {
  const { id } = req.params;
  try {
    const category = await Category.findByIdAndDelete(id);
    res.status(200).json(success(category));
  } catch (error) {
    return next(new InternalError(error));
  }
};
