const express = require("express");
const multer = require("multer");
const {
  addbannerController,
  fetchallbannerController,
  getsinglebannerController,
  updatebannerController,
  deletebannerController,
} = require("../../controllers/bannerController");

const router = express.Router();

//config multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    let filename = file.originalname.split(".");
    let extention = filename[filename.length - 1];

    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix + `.${extention}`);
  },
});

const upload = multer({ storage: storage });

router.post("/addbanner", upload.single("image"), addbannerController);
router.get("/fetchallbanner", fetchallbannerController);
router.get("/singlebanner/:id", getsinglebannerController);
router.patch(
  "/updatebanner/:id",
  upload.single("image"),
  updatebannerController
);
router.delete("/deletebanner/:id", deletebannerController);

module.exports = router;
