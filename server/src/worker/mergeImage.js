const { workerData, parentPort } = require("worker_threads");
const axios = require("axios");
const fs = require("fs");
const FormData = require("form-data");
const { Notification, User } = require("../model");
const path = require("path");

// const fetchBlob = require("fetch-blob");

const mergeImage = async (data) => {
  try {
    const formData = new FormData();
    formData.append(
      "cloth",
      fs.createReadStream(`./src/public/upload/${data.cloth}`)
    );
    formData.append(
      "model",
      fs.createReadStream(`./src/public/input/${data.body}`)
    );

    const response = await axios.post(
      `${process.env.MERGE_IMAGE_API_URL}/api/transform`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        responseType: "arraybuffer",
      }
    );

    return response;
  } catch (error) {
    console.error("Lỗi trong quá trình gửi file:", error);
  }
};

(async () => {
  try {
    const result = await mergeImage(workerData);
    filename = Date.now() + "-" + Math.floor(Math.random() * 10 + 1);
    const currentPath = process.cwd();
    const filePath = path.join(
      currentPath,
      "src/public/output",
      `${filename}.png`
    );

    fs.writeFileSync(filePath, Buffer.from(result.data, "binary"));

    const notification = new Notification({
      image: `${filename}.png`,
      name: "Try on shirts",
      description: "Tried on the shirt successfully",
      status: false,
      accountId: workerData.userId,
      serviceId: workerData.serviceId,
      tag: "success",
    });
    await notification.save();
    parentPort.postMessage("Tried on");
  } catch (error) {
    const notification = new Notification({
      name: "Try on shirts",
      description: "Tried on the shirt failed",
      status: false,
      tag: "fail",
      accountId: workerData.userId,
      serviceId: workerData.serviceId,
    });
    await notification.save();
    parentPort.postMessage("Try on failed");
    console.error("Error:", error);
  }
})();
