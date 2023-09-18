import express from "express";
import multer from "multer";
import { minioClient, uploadProcess } from "../upload/index.js";

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post("/", upload.single("file"), uploadProcess, (req, res) => {
  try {
    if (req.filePath) {
      res.send(
        `${process.env.BASE_URL}/${process.env.BASE_BUCKET}/${req.filePath}`
      );
    }
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
});
router.delete("/", express.text(), async (req, res) => {
  try {
    minioClient.removeObject(process.env.BASE_BUCKET, req.body, (err) => {
      if (err) {
        res.status(500).send("Internal Server Error");
      } else {
        res.send("File Remove Successfully");
      }
    });
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
});

export default router;
