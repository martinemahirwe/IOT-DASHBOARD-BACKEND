"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IotModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const IotSchema = new mongoose_1.default.Schema({
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
exports.IotModel = mongoose_1.default.model("IotModel", IotSchema);
//# sourceMappingURL=user.model.js.map