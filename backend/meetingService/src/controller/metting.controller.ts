import MeetingModel, { Participents } from "../model/meeting.model";
import { sendQueueMessage } from "../utils/messageBrokerUtils";

////// Funtion for creating new meetings ---------------------------/
export async function createMeeting(req: any, res: any) {
  try {
    let creatorToken = "12345";
    let userId = req.user?._id;
    let { meetingName } = req.body;
    const response = await MeetingModel.create({
      meetingName: meetingName,
      creatorId: userId,
      creatorToken: creatorToken,
    });
    if (response) {
      res.status(200).json({
        message: "Meeting has been created",
        success: true,
        data: response,
      });
    } else {
      throw new Error("Unable to create the error");
    }
  } catch (error: any) {
    res.status(500).json({
      message: `error${error.message}`,
      success: false,
      data: null,
    });
  }
}

//// Function for adding new participents --------------------------------------------/
export async function addPartcipents(req: any, res: any) {
  try {
    let { participentId, meetingId, notificationDevice } = req.body;
    let userId = req.user?._id;
    let data: Participents = {
      participentId: participentId,
      token: "12345",
      joinTime: new Date(),
    };
    let response = await MeetingModel.findOneAndUpdate(
      { _id: meetingId },
      { $push: { partcipents: data } },
      { new: true }
    );
    if (response) {
      /// sending message to the queue ------------------/
      await sendQueueMessage("notification_queue", {
        type: "MEETING_CREATED",
        data: {
          payload: {
            meetingId: response._id,

            type: "Meeting",
          },
          title: response.meetingName,
          body: "The meeting is now live — join before it ends",
          reciverId: participentId,
          notificationDevice: notificationDevice,
          creatorId: userId,
        },
      });
      res.status(200).json({
        messsage: "Partcipents has been added",
        data: response,
        success: true,
      });
    } else {
      throw new Error("Unable to add the participents");
    }
  } catch (error: any) {
    res.status(500).json({
      message: `error${error.message}`,
      success: false,
      data: null,
    });
  }
}
