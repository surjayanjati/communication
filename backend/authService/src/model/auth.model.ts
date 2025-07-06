import mongoose, { Schema, Document } from "mongoose";

export interface User extends Document {
  email: string;
  name?: string;
  mobileNumber?: string;
  notificationPermission?: boolean;
  expoPushToken?: string;
  otp?: Number;
  createdAt?: Date;
  updatedAt?: Date;
  mobileNotificationToken?: string;
  pcNotificationToken?: string;
}

const userSchema: Schema<User> = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    name: {
      type: String,
    },
    mobileNumber: {
      type: String,
    },
    notificationPermission: {
      type: Boolean,
      default: false,
    },
    expoPushToken: {
      type: String,
    },
    otp: {
      type: Number,
    },
    mobileNotificationToken: {
      type: String,
      required: false,
    },
    pcNotificationToken: {
      type: String,
      required: false,
    },
  },
  { timestamps: true } // Adds createdAt and updatedAt
);

const UserModel = mongoose.model<User>("User", userSchema);

export default UserModel;
