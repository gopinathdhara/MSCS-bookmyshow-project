export const logger = (req, res, next) => {
  // console.log(req.url);
  // console.log(req.method);

  // Get current timestamp
  const timestamp = new Date().toISOString();

  // Get HTTP method (GET, POST, etc.)
  const method = req.method;

  // Log format
  console.log(`[${timestamp}] ${method} ${req.url}`);

  next();
};
