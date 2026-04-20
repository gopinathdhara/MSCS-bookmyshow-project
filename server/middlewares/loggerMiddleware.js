export const logger = (req, res, next) => {
  const start = Date.now();

  const timestamp = new Date().toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata",
  });
  const method = req.method;
  const url = req.url;
  const ip = req.ip;

  res.on("finish", () => {
    const statusCode = res.statusCode;
    const responseTime = Date.now() - start;

    console.log(
      `[${timestamp}] ${ip} ${method} ${url} ${statusCode} ${responseTime}ms`,
    );
  });

  next();
};
