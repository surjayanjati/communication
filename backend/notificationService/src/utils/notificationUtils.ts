import admin from "firebase-admin";
import { WebNotificationPayload } from "../interface/notification.interface";

// Initialize Firebase once (make sure not to repeat it)
if (!admin.apps.length) {
  //   admin.initializeApp({
  //     credential: admin.credential.cert(require("../config/firebase-admin.json")), // adjust path as needed
  //   });
}

export const sendWebNotification = async ({
  token,
  title,
  body,
  icon = "/logo.png",
  data = {},
}: WebNotificationPayload) => {
  try {
    if (token) {
      const message = {
        token,
        notification: {
          title,
          body,
        },
        webpush: {
          notification: {
            icon,
          },
        },
        data, // optional payload data
      };

      const response = await admin.messaging().send(message);
      console.log("✅ Notification sent:", response);
      return response;
    }
  } catch (err) {
    console.error("❌ Error sending notification:", err);
    throw err;
  }
};
