import jwt from "jsonwebtoken";

export const signToken = (payload) => {
  try {
    const secret = process.env.JWT_SECRET;
    if (!secret) {
      throw new Error("JWT SECRET KEY is not defined");
    }
    return jwt.sign(payload, secret, { expiresIn: "1h" });
  } catch (error) {
    console.error("Error generating token:", error.message);
    throw error;
  }
};
