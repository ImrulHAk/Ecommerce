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
    (item) => `http://localhost:8899/${item.filename}`
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
    const products = await productModel.find({}).populate('category');
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
  let images = req.files.map(
    (item) => `http://localhost:8899/${item.filename}`
  );

  try {
    if (
      title ||
      description ||
      sellingprice ||
      discountprice ||
      stock ||
      color ||
      category
    ) {
      let existingpath = path.join(__dirname, "../uploads");

      // Fetch old product to get old image paths
      let oldProduct = await productModel.findById(id);
      if (!oldProduct) {
        return res
          .status(404)
          .json({ success: false, msg: "Product not found." });
      }

      // Delete old images from filesystem
      oldProduct.image.forEach((imgpath) => {
        let splitpath = imgpath.split("/");
        let imagepath = splitpath[splitpath.length - 1];
        fs.unlink(`${existingpath}/${imagepath}`, (err) => {
          if (err) console.log("Failed to delete image:", err.message);
        });
      });

      // Update product with new data
      let updateproduct = await productModel.findOneAndUpdate(
        { _id: id },
        {
          image: images,
          title,
          description,
          sellingprice,
          discountprice,
          stock,
          color,
          category,
        },
        {
          new: true,
        }
      );

      // updateproduct.image.forEach((imgpath) => {
      //   let splitpath = imgpath.split("/");
      //   let imagepath = splitpath[splitpath.length - 1];
      //   fs.unlink(`${existingpath}/${imagepath}`, (err) => {
      //     console.log(err);
      //   });
      // });

      res.status(200).json({
        success: true,
        msg: "product updated",
        data: updateproduct,
      });
    } else {
      res.status(400).json({ success: false, msg: "All fields are required." });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ err: error.message ? error.message : error, success: false });
  }
}

module.exports = {
  createproductController,
  getAllproductController,
  deleteProductController,
  singleProductController,
  updateProductController,
};
