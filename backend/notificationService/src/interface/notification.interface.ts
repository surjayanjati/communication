interface WebNotificationPayload {
  token: string | undefined;
  title: string;
  body: string;
  icon?: string;
  data?: Record<string, string>;
}
interface User {
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
export type { WebNotificationPayload, User };
