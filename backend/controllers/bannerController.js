const bannerModel = require("../models/bannerModel");

async function addbannerController(req, res) {
  const { filename } = req.file;

  const banner = new bannerModel({
    image: `http://localhost:8899/${filename}`,
  });

  await banner.save();

  return res.status(201).json({ msg: "banner image created", data: banner });
}

async function fetchallbannerController(req, res) {
  const banner = await bannerModel.find();

  return res.status(200).json({ msg: "banner fetch sucessful", data: banner });
}

module.exports = { addbannerController, fetchallbannerController };
