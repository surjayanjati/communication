import amqp from "amqplib";
import NotificatonModel from "../model/notification.model";

import { Notification } from "../model/notification.model";
import { getUserDetails } from "./userUtils";
import { sendWebNotification } from "./notificationUtils";
import { User } from "../interface/notification.interface";
///// Function for listening to the message -broker ----------------------------/
export const startNotificationConsumer = async () => {
  console.log("called this");

  const conn = await amqp.connect(process.env.RABBITMQ_URI!);
  const channel = await conn.createChannel();

  await channel.assertQueue("notification_queue", { durable: true });

  channel.consume("notification_queue", async (msg) => {
    console.log("called here");

    if (msg !== null) {
      console.log("went till here");

      const response: { type: string; data: Notification } = JSON.parse(
        msg.content.toString()
      );

      // handle based on type
      if (response.type === "MEETING_CREATED") {
        try {
          //// need to store the notification here ------------------/
          await NotificatonModel.create(response.data);
          //// getting user data from auth-service ------------------/
          let userDetails: User | null = await getUserDetails(response.data);
          /// call different function based on whthere to send the notification to mobile
          /// orpc
          let { title, body, payload } = response.data;
          if (userDetails) {
            if (payload.data.notificationDevice === "pc") {
              sendWebNotification({
                token: userDetails.pcNotificationToken,
                title,
                body,
                data: payload,
              });
            } else {
            }
          } else {
            /// The call to auth-service has been failed ----/
          }
        } catch (error) {}
      }

      channel.ack(msg);
    }
  });
};
