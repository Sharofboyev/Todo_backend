const router = require("express").Router();
const multer = require("multer");
const upload = multer({ dest: "files/" });
const File = require("../services/file");
const FileService = new File();
const { isValidObjectId } = require("mongoose");
const path = require("path");
const fs = require("fs");

router.post("/", upload.array("files", 10), async (req, res) => {
  const fileArray = [];
  const { files } = req;
  if (!files)
    return res
      .status(400)
      .send({ success: false, error: "Uploaded files are not valid" });
  for (let i = 0; i < files.length; i++) {
    files[i].filename = files[i].originalname;
    files[i].userId = req.userId;
    try {
      const fileData = await FileService.create(files[i]);
      fileArray.push({ uploaded: true, fileData });
    } catch (err) {
      fileArray.push({
        uploaded: false,
        fileData: {
          filename: files[i].filename,
          size: files[i].size,
          mimetype: files[i].mimetype,
          error: err.message,
        },
      });
    }
  }
  return res.send({ success: true, files: fileArray });
});

router.get("/:id", async (req, res, next) => {
  if (!isValidObjectId(req.params.id))
    return res
      .status(400)
      .send({ success: false, error: "Provided fileId is not valid" });

  try {
    const file = await FileService.getOne(req.params.id, req.userId);
    if (!file)
      return res
        .status(404)
        .send({ success: false, error: "File with given fileId not found" });
    /*return res.download(path.resolve(file.path), file.filename, (err) => {
        return next(err);
      });*/ else return res.sendFile(path.resolve(file.path));
  } catch (err) {
    return next(err);
  }
});

router.get("/", async (req, res, next) => {
  try {
    const files = await FileService.get(
      req.userId,
      req.query.limit,
      req.query.offset
    );
    return res.send(files);
  } catch (err) {
    return next(err);
  }
});

router.delete("/:id", async (req, res, next) => {
  if (!isValidObjectId(req.params.id))
    return res
      .status(400)
      .send({ success: false, error: "Provided fileId is not valid" });
  try {
    const file = await FileService.remove(req.params.id, req.userId);
    if (!file)
      return res
        .status(404)
        .send({ success: false, error: "File with given fileId not found" });
    else {
      const filePath = path.resolve(file.path);
      if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
      return res.send({ success: true });
    }
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
