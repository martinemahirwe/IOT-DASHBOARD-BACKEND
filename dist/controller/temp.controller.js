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
exports.deleteTemp = exports.updateTemp = exports.createTemp = exports.getTemp = void 0;
const temp_model_1 = require("../models/temp.model");
function getTemp(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const data = yield temp_model_1.TempModel.find();
            return res.status(200).json(data);
        }
        catch (error) {
            console.log(error);
            return res.status(500).json({ message: "Internal server error" });
        }
    });
}
exports.getTemp = getTemp;
function createTemp(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { roomTemp, desiredTemp, fanStatus } = req.body;
            const newTemp = new temp_model_1.TempModel({
                roomTemp,
                desiredTemp,
                fanStatus,
            });
            yield newTemp.save();
            return res.status(201).json(newTemp);
        }
        catch (error) {
            console.log(error);
            return res.status(500).json({ message: "Internal server error" });
        }
    });
}
exports.createTemp = createTemp;
function updateTemp(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            const { roomTemp, desiredTemp, fanStatus } = req.body;
            const temp = yield temp_model_1.TempModel.findById(id);
            if (!temp) {
                return res.status(404).json({ message: "Temperature data not found" });
            }
            temp.roomTemp = roomTemp || temp.roomTemp;
            temp.desiredTemp = desiredTemp || temp.desiredTemp;
            temp.fanStatus = fanStatus || temp.fanStatus;
            yield temp.save();
            return res.status(200).json(temp);
        }
        catch (error) {
            console.log(error);
            return res.status(500).json({ message: "Internal server error" });
        }
    });
}
exports.updateTemp = updateTemp;
function deleteTemp(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            const temp = yield temp_model_1.TempModel.findByIdAndDelete(id);
            if (!temp) {
                return res.status(404).json({ message: "Temperature data not found" });
            }
            return res.status(204).send();
        }
        catch (error) {
            console.log(error);
            return res.status(500).json({ message: "Internal server error" });
        }
    });
}
exports.deleteTemp = deleteTemp;
//# sourceMappingURL=temp.controller.js.map