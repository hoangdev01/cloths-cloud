const { workerData, parentPort } = require("worker_threads");

function calculator(data) {
  return new Promise((resolve, reject) => {
    try {
      // Thực hiện tính toán ở đây
      const result = data * 2;
      setTimeout(() => {
        console.log("tinh toan");
        resolve(result); // Gọi resolve khi tính toán hoàn thành
      }, 2000);
    } catch (error) {
      reject(error);
    }
  });
}

(async () => {
  try {
    const result = await calculator(workerData);
    parentPort.postMessage(result);
  } catch (error) {
    console.error("Lỗi trong quá trình tính toán:", error);
  }
})();
