import jwt from "jsonwebtoken";

const JWT_EXPIRES_IN = "23h"; // Token expiration time

////// Funciton for generating the random otp --------------------------------------------/
export function generateOtp() {
  return Math.floor(1000 + Math.random() * 9000); // ensures a 4-digit number
}

//// Function for generating the jwtToken ------------------------------------------------/
export function generateJwtToken(payload: object): string | null {
  const JWT_SECRET = process.env.JWT_SECRET; // Use env var in production

  if (JWT_SECRET) {
    return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
  } else {
    return null;
  }
}
