const bannerModel = require("../models/bannerModel");
const path = require("path");
const fs = require("fs");

// CREATE BANNER
async function addbannerController(req, res) {
  const { filename } = req.file;

  try {
    const banner = new bannerModel({
      image: `http://localhost:8899/${filename}`,
    });

    await banner.save();

    res.status(201).json({
      success: true,
      msg: "Banner created successfully",
      data: banner,
    });
  } catch (error) {
    res.status(500).json({ success: false, err: error.message || error });
  }
}

// FETCH ALL BANNERS
async function fetchallbannerController(req, res) {
  try {
    const banners = await bannerModel.find({});
    res.status(200).json({
      success: true,
      msg: "All banners fetched successfully",
      data: banners,
    });
  } catch (error) {
    res.status(500).json({ success: false, err: error.message || error });
  }
}

// FETCH SINGLE BANNER
async function getsinglebannerController(req, res) {
  const { id } = req.params;
  try {
    const banner = await bannerModel.findById(id);
    if (!banner) {
      return res.status(404).json({
        success: false,
        msg: "Banner not found",
      });
    }
    res.status(200).json({
      success: true,
      msg: "Single banner fetched successfully",
      data: banner,
    });
  } catch (error) {
    res.status(500).json({ success: false, err: error.message || error });
  }
}

// DELETE BANNER
async function deletebannerController(req, res) {
  const { id } = req.params;

  try {
    const existingBanner = await bannerModel.findById(id);
    if (!existingBanner) {
      return res.status(404).json({
        success: false,
        msg: "Banner not found",
      });
    }

    const uploadPath = path.join(__dirname, "../uploads");
    const imageFile = existingBanner.image.split("/").pop();

    fs.unlink(`${uploadPath}/${imageFile}`, (err) => {
      if (err) console.log("Image delete error:", err);
    });

    await bannerModel.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      msg: "Banner deleted successfully",
      data: existingBanner,
    });
  } catch (error) {
    res.status(500).json({ success: false, err: error.message || error });
  }
}

// UPDATE BANNER
async function updatebannerController(req, res) {
  const { id } = req.params;
  const { filename } = req.file || {};

  try {
    const existingBanner = await bannerModel.findById(id);
    if (!existingBanner) {
      return res.status(404).json({
        success: false,
        msg: "Banner not found",
      });
    }

    const uploadPath = path.join(__dirname, "../uploads");

    // Delete old image if new one is uploaded
    if (filename && existingBanner.image) {
      const oldImage = existingBanner.image.split("/").pop();
      fs.unlink(`${uploadPath}/${oldImage}`, (err) => {
        if (err) console.log("Old image delete error:", err);
      });
    }

    const updatedData = {};
    if (filename) updatedData.image = `http://localhost:8899/${filename}`;

    const updatedBanner = await bannerModel.findByIdAndUpdate(id, updatedData, {
      new: true,
    });

    res.status(200).json({
      success: true,
      msg: "Banner updated successfully",
      data: updatedBanner,
    });
  } catch (error) {
    res.status(500).json({ success: false, err: error.message || error });
  }
}

module.exports = {
  addbannerController,
  fetchallbannerController,
  getsinglebannerController,
  updatebannerController,
  deletebannerController,
};
