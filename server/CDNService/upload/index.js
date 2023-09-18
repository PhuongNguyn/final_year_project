import { Client } from "minio";

export const minioClient = new Client({
  endPoint: process.env.MINIO_HOST,
  port: 9000,
  accessKey: process.env.MINIO_KEY,
  secretKey: process.env.MINIO_SECRET,
  useSSL: false,
});

export const uploadProcess = async (req, res, next) => {
  try {
    const buffer = req.file?.buffer;

    const fileName = req.file?.originalname.split(".");
    const newFileName = fileName[0] + Date.now();

    minioClient.putObject(
      process.env.BASE_BUCKET,
      `${newFileName}.${fileName[fileName.length - 1]}`,
      buffer,
      req.file?.size,
      { "Content-Type": req.file?.mimetype },
      (err) => {
        if (err) {
          console.log(err);

          res.status(500).send("Internal Server Error");
        } else {
          req.filePath = `${newFileName}.${fileName[fileName.length - 1]}`;
          next();
        }
      }
    );
  } catch (error) {
    console.log(error);

    res.status(500).send("Internal Server Error");
  }
};
