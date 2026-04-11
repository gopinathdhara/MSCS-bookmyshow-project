export const adminMiddleware = (req, res, next) => {
  try {
    if (req.role != "admin") {
      return res.status(403).json({
        success: false,
        message: "Access denied. only Admin can access this resource",
      });
    }
    next();
  } catch (error) {
    next(error);
  }
};
