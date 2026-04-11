export const partnerMiddleware = (req, res, next) => {
  try {
    if (req.role != "partner") {
      return res.status(403).json({
        success: false,
        message: "Access denied. only partner can access this resource",
      });
    }
    next();
  } catch (error) {
    next(error);
  }
};
