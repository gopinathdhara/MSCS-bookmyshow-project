export const registerValidate = (req, res, next) => {
  const { name, email, password } = req.body;

  //  register validation
  if (name === undefined || typeof name != "string" || name.trim() == "") {
    return res.status(400).json({
      success: false,
      message: "Name, email and password are required",
    });
  }
  if (email === undefined || typeof email != "string" || email.trim() == "") {
    return res.status(400).json({
      success: false,
      message: "Name, email and password are required",
    });
  }
  if (password === undefined || password.toString().trim() == "") {
    return res.status(400).json({
      success: false,
      message: "Name, email and password are required",
    });
  }

  next();
};

export const loginValidate = (req, res, next) => {
  const { email, password } = req.body;

  if (email === undefined || typeof email != "string" || email.trim() == "") {
    return res.status(400).json({
      success: false,
      message: "Email and password are required",
    });
  }
  if (password === undefined || password.toString().trim() == "") {
    return res.status(400).json({
      success: false,
      message: "Email and password are required",
    });
  }

  next();
};
