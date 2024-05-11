"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TempModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const TempSchema = new mongoose_1.default.Schema({
    roomTemp: {
        type: String,
    },
    desiredTemp: {
        type: String,
    },
    fanStatus: {
        type: String,
        default: "off",
    }
});
exports.TempModel = mongoose_1.default.model("TempSchema", TempSchema);
//# sourceMappingURL=temp.model.js.map