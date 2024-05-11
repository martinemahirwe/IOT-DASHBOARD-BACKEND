
import mongoose from "mongoose";

export interface Iot extends Document {
    _id: any;
    email: string;
    password: string;
    role: string;
    id: mongoose.Types.ObjectId;
    token: string;
  }
  

const IotSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
      },
      token: {
        type: String,
      },
      password: {
        type: String,
        required: true,
      },
      role: {
        type: String,
        default: "user",
      },
});

export const IotModel = mongoose.model("IotModel",IotSchema);