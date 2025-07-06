import mongoose, { Schema, Document } from "mongoose";

export interface Notification extends Document {
  title: string;
  body: string;
  payload: any; // or use `Record<string, any>` if you want some structure
  creatorId: string;
  reciverId: string;
  notificationDevice: string;
}

const notificationSchema: Schema<Notification> = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
    payload: {
      type: Schema.Types.Mixed, // ✅ Accepts any valid JSON
      default: null,
    },
    creatorId: {
      type: String,
      required: true,
    },
    reciverId: {
      type: String,
      required: true,
    },
    notificationDevice: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const NotificatonModel = mongoose.model<Notification>(
  "notification",
  notificationSchema
);

export default NotificatonModel;
