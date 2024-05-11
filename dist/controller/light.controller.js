"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateLightStatus = exports.getLightStatus = void 0;
const light_model_1 = require("../models/light.model");
function getLightStatus(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const light = yield light_model_1.lightModel.findOne();
            return res.status(200).json(light);
        }
        catch (error) {
            console.log(error);
            return res.status(500).json({ message: "Internal server error" });
        }
    });
}
exports.getLightStatus = getLightStatus;
function updateLightStatus(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { status } = req.body;
            const light = yield light_model_1.lightModel.findOne();
            if (!light) {
                return res.status(404).json({ message: "Light data not found" });
            }
            light.status = status || light.status;
            yield light.save();
            return res.status(200).json(light);
        }
        catch (error) {
            console.log(error);
            return res.status(500).json({ message: "Internal server error" });
        }
    });
}
exports.updateLightStatus = updateLightStatus;
//# sourceMappingURL=light.controller.js.map