import { Request, Response } from "express";
import UserModel, { User } from "../model/auth.model";
import { generateJwtToken, generateOtp } from "../utils/user.utils";
import { sendEmail } from "../helpers/send-email";
import { generateOtpEmailTemplate } from "../templates/otpSendTemplate";
import dotenv from "dotenv";
///// Controller funciton for the loginuser -------------------------------------/
export const loginUser = async (req: any, res: any) => {
  console.log("controller is called");
  //// Take req body here ---------------------------------------/
  try {
    let { email } = req.body;

    //// Checking whethere the email exists in the db or not---/
    const response = await UserModel.findOne({ email: email });
    if (response) {
      //// if response exists we will directly send the email---/
      let otp = generateOtp();
      /// updating the otp in the mongodb -----/
      const result = await UserModel.updateOne(
        { _id: response._id },
        { $set: { otp: otp } }
      );
      if (result.acknowledged && result.modifiedCount === 1) {
        let otpEmailTemplate = generateOtpEmailTemplate(otp); /// function for getting the email template
        sendEmail({
          email,
          subject: "Verify Your Identity - vibe",
          html: otpEmailTemplate,
        });
        res.status(200).json({
          success: true,
          message: "Otp has been send successfully ",
          data: otp,
        });
      } else {
        throw new Error("Unable to send the otp");
      }
    } else {
      console.log("this is where we are");

      //// if response doen't exists we will save email then send email--/
      let otp = generateOtp();
      const documentToSave = new UserModel({ email: email, otp: otp });
      await documentToSave.save();
      let otpEmailTemplate = generateOtpEmailTemplate(otp); /// function for getting the email template
      sendEmail({
        email,
        subject: "Verify Your Identity - vibe",
        html: otpEmailTemplate,
      });
      res.status(200).json({
        success: true,
        message: "Otp has been sent successfully ",
        data: otp,
      });
    }
  } catch (error: any) {
    console.log(error.message);

    res.status(500).json({
      success: false,
      message: "Unable to send the otp ",
      data: null,
    });
  }
};

///// Function for the otp verify ------------------------------------------------------/
export const otpVerify = async (req: any, res: any) => {
  try {
    //// catching the otp from body -------------/

    dotenv.config(); // ✅ Must come before any usage of process.env
    const { otp, email } = req.body;
    const response: User | null = await UserModel.findOne({ email: email });
    if (response) {
      let dbOtp = response.otp;
      if (otp === dbOtp) {
        //// otp is matching -------------/
        let otpUpdateResponse = await UserModel.updateOne(
          { email: email },
          { $set: { otp: null } }
        );
        if (
          otpUpdateResponse.acknowledged &&
          otpUpdateResponse.modifiedCount === 1
        ) {
          console.log("went till here");

          let jwtToken = generateJwtToken({ _id: response._id });
          console.log(jwtToken);

          if (jwtToken) {
            const userData = response.toObject(); // convert Mongoose document to plain object
            console.log(userData);

            res.status(500).json({
              success: true,
              message: "The otp has been verified",
              data: {
                ...userData,
                jwtToken,
              },
            });
          } else {
            throw new Error("some error has happened");
          }
        } else {
          throw new Error("some error has happened");
        }
      } else {
        ////// otp is not matching -------/
        throw new Error("Otp is not matching");
      }
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Unable to send the otp ",
      data: null,
    });
  }
};

//// Function for updating the user ----------------------------------------------/
export const updateUser = async (req: any, res: any) => {
  try {
    console.log(req.user);

    const userId = req.user?._id;

    const updateData = req.body;

    // Optional: remove sensitive/immutable fields
    const forbiddenFields = ["_id", "createdAt"];
    forbiddenFields.forEach((field) => delete updateData[field]);

    const updatedUser = await UserModel.findByIdAndUpdate(
      userId,
      { $set: updateData },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "User updated successfully",
      data: updatedUser,
    });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({
      success: false,
      message: "Unable to update user",
    });
  }
};

////// Funciton for getting the user --------------------------------------------/
export async function getUsersData(req: any, res: any) {
  try {
    console.log("getuserdata is called");

    const userIdArray = req.query.userIds;
    console.log(userIdArray);

    // If only one userId is passed, query param will be a string
    const ids = Array.isArray(userIdArray) ? userIdArray : [userIdArray];
    if (userIdArray.length > 0) {
      const userData = await UserModel.find({ _id: { $in: ids } });
      if (userData) {
        res.status(200).json({
          success: true,
          message: "Userdata has been fetched",
          data: userData,
        });
      } else {
        throw new Error("some error has happened");
      }
    } else {
      res.status(404).json({
        success: false,
        message: "Unable to authenticate the user",
        data: null,
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Unable to update user",
      data: null,
    });
  }
}
