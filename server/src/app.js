const express = require("express");
const cors = require("cors");

const { Worker } = require("worker_threads");

require("dotenv").config();
require("./model");
global.__basedir = __dirname;
//
const authRouter = require("./router/auth");
const serviceRouter = require("./router/service");
const roleRouter = require("./router/role");
const eventRouter = require("./router/event");
const billRouter = require("./router/bill");
const permissionRouter = require("./router/permission");
const tagRouter = require("./router/tag");
const userRouter = require("./router/user");
const categoryRouter = require("./router/category");
const resourceRouter = require("./router/resource");
const notificationRouter = require("./router/notification");

const verifyToken = require("./middleware/verify-token");
const verifyTokenUrl = require("./middleware/verify-token-url");
const upload = require("./middleware/upload");

const fs = require('fs');
const https = require('https');

const privateKeyPath = process.env.PRIVATE_KEY;
const certificatePath = process.env.PUBLIC_KEY;

const privateKey = fs.readFileSync(privateKeyPath, 'utf8');
const certificate = fs.readFileSync(certificatePath, 'utf8');

const options = {
  key: privateKey,
  cert: certificate
};

const app = express();
const PORT = process.env.PORT || 4000;
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Methods",
    "GET,HEAD,OPTIONS,POST,PUT,DELETE"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  next();
});
app.use(express.json());
app.use("/media", express.static("src/public/upload"));
app.use("/output", express.static("src/public/output"));
//router
app.use("/service", serviceRouter);
app.use("/role", roleRouter);
app.use("/event", eventRouter);
app.use("/bill", billRouter);
app.use("/permission", permissionRouter);
app.use("/category", categoryRouter);
app.use("/tag", tagRouter);
app.use("/user", userRouter);
app.use("/resource", resourceRouter);
app.use("/notification", notificationRouter);
app.use("/", authRouter);

app.use(cors());

let clients = [];

app.post("/calculate", verifyToken, (req, res) => {
  const data = req.body;

  const worker = new Worker("./src/worker/calculator.js", { workerData: data });

  res.json({ message: "Caculating..." });

  worker.on("message", (result) => {
    clients.forEach((client) => {
      if (client.userId === req.userId) {
        client.res.write(`data: ${result}\n\n`);
      }
    });
  });

  worker.on("error", (error) => {
    console.error("Error in worker:", error);
    clients.forEach((client) => {
      if (client.userId === req.userId) {
        client.res.write(`data: Error\n\n`);
      }
    });

    clients = clients.filter((client) => client.userId !== req.userId);
  });
});

app.post(
  "/merge-image",
  verifyToken,
  upload.singleInput.single("file"),
  (req, res) => {
    const { cloth, serviceId } = req.body;
    const file = req.file;

    const data = {
      body: file.filename,
      cloth: cloth,
      serviceId: serviceId,
      userId: req.userId,
    };

    const worker = new Worker("./src/worker/mergeImage.js", {
      workerData: data,
    });

    res.json({ message: "Calculating..." });

    worker.on("message", (result) => {
      clients.forEach((client) => {
        if (client.userId === req.userId) {
          client.res.write(`data: ${result}\n\n`);
        }
      });
    });

    worker.on("error", (error) => {
      clients.forEach((client) => {
        if (client.userId === req.userId) {
          client.res.write(`data: Đã xảy ra lỗi trong quá trình tính toán\n\n`);
        }
      });

      // clients = clients.filter((client) => client.userId !== req.userId);
    });
  }
);

// SSE endpoint để kết nối clients
app.get("/notifications/:token", verifyTokenUrl, async (req, res) => {
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Connection", "keep-alive");
  res.setHeader("Cache-Control", "no-store");
  res.setHeader("X-Accel-Buffering'", "no");
  res.setHeader("Access-Control-Allow-Origin", "*");

  clients.push({ userId: req.userId, res });
  // console.error("Set up clients:", clients);

  req.on("close", () => {
    clients = clients.filter((client) => client.userId !== req.userId);
  });
});

const server = https.createServer(options, app);


server.listen(PORT, () => {
  console.log(`Server started on port: ${PORT}`);
});
