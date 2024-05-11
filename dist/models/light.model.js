"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.lightModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const lightSchema = new mongoose_1.default.Schema({
    status: {
        type: String,
        default: "off"
    }
});
exports.lightModel = mongoose_1.default.model("lightSchema", lightSchema);
//# sourceMappingURL=light.model.js.map