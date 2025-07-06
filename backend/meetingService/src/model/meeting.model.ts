import mongoose, { Schema, Document } from "mongoose";

export interface Participents {
  participentId: string;
  token: string;
  joinTime: Date;
  leaveTime?: Date;
}

export interface Meeting extends Document {
  creatorId: string;
  partcipents: Participents[];
  active: boolean;
  creatorToken: string;
  meetingName: string;
}

const meetingSchema: Schema<Meeting> = new Schema(
  {
    creatorId: {
      type: String,
      required: true,
    },
    partcipents: {
      type: [
        {
          participentId: { type: String, required: true },
          token: { type: String, required: true },
          joinTime: { type: Date, required: false },
          leaveTime: { type: Date, required: false },
        },
      ],
      default: [],
    },
    active: {
      type: Boolean,
      default: true,
    },
    creatorToken: {
      type: String,
      required: true,
    },
    meetingName: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);
const MeetingModel = mongoose.model<Meeting>("meeting", meetingSchema);
export default MeetingModel;
