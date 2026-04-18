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

export const validateResetPassword = (req, res, next) => {
  try {
    const { otp, password } = req.body;

    const { email } = req.params;

    // Email validation
    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required",
      });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: "Invalid email format",
      });
    }

    // OTP validation
    if (!otp) {
      return res.status(400).json({
        success: false,
        message: "OTP is required",
      });
    }

    // Password validation
    if (!password) {
      return res.status(400).json({
        success: false,
        message: "Password is required",
      });
    }

    // Password strength
    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 6 characters",
      });
    }

    next();
  } catch (error) {
    console.log(error);
    next(error);
  }
};
