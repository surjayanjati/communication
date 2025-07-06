import jwt from "jsonwebtoken";

///// Funciton for the jwt token verify middelware ------------------------------/
export async function authVerify(req: any, res: any, next: any) {
  try {
    console.log("called till");

    const token = req.headers.authorization?.split(" ")[1]; // Bearer <token>

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Access denied. No token provided.",
        data: null,
      });
    }
    const JWT_SECRET = process.env.JWT_SECRET;
    if (JWT_SECRET) {
      const decoded = jwt.verify(token, JWT_SECRET); // or whatever your payload looks like
      req.user = decoded; // ✅ attach to req

      next();
    } else {
      throw new Error("Unable to verify the user");
    }
  } catch (error: any) {
    res.status(500).json({
      message: `error ${error.message}`,
      success: false,
      data: null,
    });
  }
}
