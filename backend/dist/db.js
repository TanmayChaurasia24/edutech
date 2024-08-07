"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const mongoUri = process.env.MONGO_URI;
if (!mongoUri) {
    console.error('MONGO_URI is not defined');
    process.exit(1);
}
const mongoconnect = () => {
    mongoose_1.default
        .connect(mongoUri)
        .then(() => console.log('Database connected'))
        .catch((error) => console.error(`Error connecting to the database: ${error}`));
};
exports.default = mongoconnect;
