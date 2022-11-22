const router = require("express").Router();
const multer = require("multer");
const upload = multer({ dest: "files/" });
const File = require("../services/file");
const FileService = new File();
const { isValidObjectId } = require("mongoose");
const path = require("path");

router.post("/", upload.array("files", 10), async (req, res) => {
  const fileArray = [];
  const { files } = req;
  for (let i = 0; i < files.length; i++) {
    files[i].filename = files[i].originalname;
    try {
      const fileData = await FileService.create(files[i]);
      fileArray.push({ success: true, fileData });
    } catch (err) {
      fileArray.push({
        success: false,
        fileData: {
          filename: files[i].originalname,
          size: files[i].size,
          mimetype: files[i].mimetype,
        },
      });
    }
  }
  return res.send({ success: true, files: fileArray });
});

router.get("/:id", async (req, res) => {
  if (!isValidObjectId(req.params.id))
    return res
      .status(400)
      .send({ success: false, error: "Provided fileId is not valid" });
  const file = await FileService.getFile(req.params.id);
  if (!file)
    return res
      .status(404)
      .send({ success: false, error: "File with given fileId not found" });
  res.sendFile(path.resolve(file.path));
});

router.delete("/", (req, res) => {});

module.exports = router;
