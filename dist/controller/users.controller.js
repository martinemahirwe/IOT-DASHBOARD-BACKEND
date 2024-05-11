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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logout = exports.login = exports.createUser = exports.getUsers = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
const user_model_1 = require("../models/user.model");
dotenv_1.default.config();
function getUsers(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const users = yield user_model_1.IotModel.find({}, { password: 0 });
            return res.status(200).json(users);
        }
        catch (error) {
            console.log(error);
            return res.status(400).json({ message: "can not get users" });
        }
    });
}
exports.getUsers = getUsers;
function createUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { email, password } = req.body;
            const existingUser = yield user_model_1.IotModel.findOne(email);
            if (existingUser) {
                return res.status(400).json({ message: "Email address already in use" });
            }
            const hashedPassword = yield bcrypt_1.default.hash(password, 10);
            const newUser = new user_model_1.IotModel({
                email,
                password: hashedPassword,
            }).save();
            return res.status(201).json(newUser);
        }
        catch (err) {
            res.status(500).json({ message: err.message });
        }
    });
}
exports.createUser = createUser;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const user = yield user_model_1.IotModel.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid email or password" });
        }
        const passwordMatch = yield bcrypt_1.default.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(400).json({ message: "Invalid email or password" });
        }
        const token = jsonwebtoken_1.default.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET);
        req.headers.authorization = token;
        res.status(200).json({
            user: { _id: user._id, email: user.email },
            token,
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.login = login;
const logout = (req, res) => {
    req.headers.authorization = "";
    res.send("Logged out successfully");
};
exports.logout = logout;
//# sourceMappingURL=users.controller.js.map