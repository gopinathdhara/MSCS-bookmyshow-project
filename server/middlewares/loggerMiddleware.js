export const logger = (req, res, next) => {
  console.log(req.url);
  console.log(req.method);
  next();
};
