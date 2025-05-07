const categoryModel = require("../models/categoryModel");
const path = require("path");
const fs = require("fs");

async function categoryController(req, res) {
  let { title, description } = req.body;
  let { filename } = req.file;

  try {
    let category = new categoryModel({
      title,
      description,
      image: `http://localhost:8899/${filename}`,
    });

    await category.save();
    res.status(201).json({
      success: true,
      msg: "category created successful",
      data: category,
    });
  } catch (error) {
    res
      .status(500)
      .json({ err: error.message ? error.message : error, success: false });
  }
}

async function fetchAllcategory(req, res) {
  try {
    let category = await categoryModel.find({});
    return res.status(200).json({
      success: true,
      msg: "category fetch successful",
      data: category,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ err: error.message ? error.message : error, success: false });
  }
}

async function singleCategory(req, res) {
  let { id } = req.params;
  try {
    let singlecategory = await categoryModel.findOne({ _id: id });
    return res.status(200).json({
      success: true,
      msg: "single category fetch successful",
      data: singlecategory,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ err: error.message ? error.message : error, success: false });
  }
}

async function deleteCategory(req, res) {
  let { id } = req.params;
  let findcategory = await categoryModel.findOne({ _id: id });

  if (!findcategory) {
    return res.status(404).json({ success: false, msg: "category not found" });
  } else {
    let existingpath = path.join(__dirname, "../uploads");
    let existingcategory = await categoryModel.findOneAndDelete({ _id: id });
    let splitpath = existingcategory.image.split("/");
    let imagepath = splitpath[splitpath.length - 1];

    fs.unlink(`${existingpath}/${imagepath}`, (err) => {
      console.log(err);
    });

    res.status(200).json({
      success: true,
      msg: "category deleted successful",
      data: findcategory,
    });
  }
}

async function updateCategory(req, res) {
  const { id } = req.params;
  const { title } = req.body;
  const { description } = req.body;
  const { filename } = req.file || {};

  try {
    const existingpath = path.join(__dirname, "../uploads");

    // Fetch old product to get old image paths
    const oldCategory = await categoryModel.findById(id);
    if (!oldCategory) {
      return res
        .status(404)
        .json({ success: false, msg: "Category not found" });
    }

    // Remove old image if a new one is provided
    if (filename && oldCategory.image) {
      const oldImage = oldCategory.image.split("/").pop();
      const oldImagePath = path.join(existingpath, oldImage);
      fs.unlink(oldImagePath, (err) => {
        if (err) console.log("Image delete error:", err);
      });
    }

    const updateFields = {};
    if (title) updateFields.title = title;
    if (filename) updateFields.image = `http://localhost:8899/${filename}`;
    if (description) updateFields.description = description;

    const updatedCategory = await categoryModel.findOneAndUpdate(
      { _id: id },
      updateFields,
      { new: true }
    );

    res.status(200).json({
      success: true,
      msg: "Category updated",
      data: updatedCategory,
    });
  } catch (error) {
    res.status(500).json({ success: false, err: error.message || error });
  }
}
module.exports = {
  categoryController,
  fetchAllcategory,
  singleCategory,
  deleteCategory,
  updateCategory,
};
