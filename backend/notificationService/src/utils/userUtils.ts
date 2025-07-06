import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { fetchWrapper } from "../helpers/fetchWrapper";
import { Notification } from "../model/notification.model";
import admin from "firebase-admin";

export function generateJwtToken(payload: object): string | null {
  dotenv.config();
  const JWT_SECRET = process.env.JWT_SECRET!; // Use env var in production

  if (JWT_SECRET) {
    return jwt.sign(payload, JWT_SECRET, { expiresIn: "5m" });
  } else {
    return null;
  }
}

///// Function for fetching the userdetails from the auth-service ----------/
export async function getUserDetails(data: Notification) {
  try {
    let response = await fetchWrapper.get({
      service: "auth_service",
      path: "user",
      userId: data.creatorId,
      query: {
        userIds: [data.reciverId],
      },
    });
    if (response.success && response.data.length > 0) {
      return response.data;
    } else return null;
  } catch (error: any) {
    console.log(error.message);

    return null;
  }
}

////// Function for sending Notification ----------------------------/
