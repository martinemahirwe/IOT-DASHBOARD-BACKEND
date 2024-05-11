import mongoose from "mongoose";

export interface Temp extends Document {
    roomTemp: string,
    desiredTemp: string,
    fanStatus: string
}

const TempSchema = new mongoose.Schema({
roomTemp:{
    type: String,
},
desiredTemp:{
    type: String,
},
fanStatus:{
    type: String,
    default: "off",
}
});

export const TempModel = mongoose.model("TempSchema",TempSchema);