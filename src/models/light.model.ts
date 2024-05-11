import mongoose from "mongoose";

export interface Light extends Document {
    status: string
}

const lightSchema = new mongoose.Schema({
status:{
    type: String,
    default: "off"
}
});

export const lightModel = mongoose.model("lightSchema",lightSchema);