const productModel = require("../models/productModel");
const categoryModel = require("../models/categoryModel");
const path = require("path");
const fs = require("fs");

async function createproductController(req, res) {
  let {
    title,
    description,
    sellingprice,
    discountprice,
    stock,
    color,
    category,
  } = req.body;
  let images = req.files.map(
    (item) => `${process.env.base_url}/${item.filename}`
  );
  try {
    let productcreate = new productModel({
      title,
      description,
      sellingprice,
      discountprice,
      stock,
      color,
      image: images,
      category,
    });

    await productcreate.save();
    let categoryupdate = await categoryModel.findOneAndUpdate(
      {
        _id: productcreate.category,
      },
      { $push: { product: productcreate._id } },
      { new: true }
    );
    await categoryupdate.save();
    return res
      .status(201)
      .json({ mag: "product create successful", data: productcreate });
  } catch (error) {
    return res
      .status(500)
      .json({ err: error.message ? error.message : error, success: false });
  }
}

async function getAllproductController(req, res) {
  try {
    const products = await productModel.find({}).populate("category");
    res.status(200).json({
      success: true,
      mgs: "product fetch successfull",
      products: products,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ err: error.message ? error.message : error, success: false });
  }
}

async function singleProductController(req, res) {
  let { id } = req.params;
  try {
    let singleproduct = await productModel
      .findOne({ _id: id })
      .populate("category");
    return res.status(200).json({
      success: true,
      msg: "single product fetch successful",
      data: singleproduct,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ err: error.message ? error.message : error, success: false });
  }
}

async function deleteProductController(req, res) {
  let { id } = req.params;

  try {
    let deleteproduct = await productModel.findOneAndDelete({ _id: id });
    let existingpath = path.join(__dirname, "../uploads");

    deleteproduct.image.forEach((imgpath) => {
      let splitpath = imgpath.split("/");
      let imagepath = splitpath[splitpath.length - 1];
      fs.unlink(`${existingpath}/${imagepath}`, (err) => {
        console.log(err);
      });
    });

    let findcategory = await categoryModel.findOneAndUpdate(
      { product: id },
      { $pull: { product: id } },
      { new: true }
    );
    await findcategory.save();

    return res.status(200).json({
      success: true,
      msg: "product deleted successfull",
      data: deleteproduct,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ err: error.message ? error.message : error, success: false });
  }
}

async function updateProductController(req, res) {
  let { id } = req.params;
  let {
    title,
    description,
    sellingprice,
    discountprice,
    stock,
    color,
    category,
  } = req.body;

  // Build the update object dynamically
  let updateFields = {};

  if (title) updateFields.title = title;
  if (description) updateFields.description = description;
  if (sellingprice) updateFields.sellingprice = sellingprice;
  if (discountprice) updateFields.discountprice = discountprice;
  if (stock) updateFields.stock = stock;
  if (color) updateFields.color = color;
  if (category) updateFields.category = category;

  try {
    // Get old product
    const oldProduct = await productModel.findById(id);
    if (!oldProduct) {
      return res
        .status(404)
        .json({ success: false, msg: "Product not found." });
    }

    const existingPath = path.join(__dirname, "../uploads");

    // Handle images if provided
    if (req.files && req.files.length > 0) {
      const newImages = req.files.map(
        (file) => `${process.env.base_url}/${file.filename}`
      );

      // Delete old images
      for (let imgPath of oldProduct.image) {
        let filename = imgPath.split("/").pop();
        fs.unlink(`${existingPath}/${filename}`, (err) => {
          if (err) console.log("Failed to delete image:", err.message);
        });
      }

      updateFields.image = newImages;
    }

    // If no fields provided at all
    if (Object.keys(updateFields).length === 0) {
      return res
        .status(400)
        .json({ success: false, msg: "No fields provided to update." });
    }

    // Update product
    const updatedProduct = await productModel.findOneAndUpdate(
      { _id: id },
      updateFields,
      { new: true }
    );

    res.status(200).json({
      success: true,
      msg: "Product updated successfully.",
      data: updatedProduct,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      err: error.message || error,
    });
  }
}

module.exports = {
  createproductController,
  getAllproductController,
  deleteProductController,
  singleProductController,
  updateProductController,
};
