"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const compression_1 = __importDefault(require("compression"));
const cors_1 = __importDefault(require("cors"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const index_1 = __importDefault(require("./router/index"));
dotenv_1.default.config();
const PORT = 4000;
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use((0, compression_1.default)());
app.use((0, cookie_parser_1.default)());
app.use(body_parser_1.default.json({ limit: '30mb' }));
app.use(body_parser_1.default.urlencoded({ limit: '30mb', extended: true }));
app.use("/api", (0, index_1.default)());
app.listen(PORT, () => {
    console.log(`app listen on port ${PORT}`);
});
const MONGO_URL = process.env.MONGO_URL;
mongoose_1.default.connect(MONGO_URL).then(() => {
    console.log("Connected to MongoDB");
});
mongoose_1.default.connection.on("error", (error) => console.log(error));
app.get('/', (req, res) => {
    res.send('FINAL-YEAR-APIS');
});
exports.default = app;
//# sourceMappingURL=index.js.map