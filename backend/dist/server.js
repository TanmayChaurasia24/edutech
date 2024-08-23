"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const db_js_1 = __importDefault(require("./db.js"));
const userRoutes_js_1 = __importDefault(require("./routes/userRoutes.js")); // Ensure the path is correct
const courseRoutes_js_1 = __importDefault(require("./routes/courseRoutes.js"));
const articleRoutes_js_1 = __importDefault(require("./routes/articleRoutes.js"));
const body_parser_1 = __importDefault(require("body-parser"));
const messageRoutes_js_1 = __importDefault(require("./routes/messageRoutes.js"));
const socket_js_1 = require("./socket/socket.js");
const PORT = 8000;
// Connect to the database
(0, db_js_1.default)();
// Middleware
socket_js_1.app.use((0, cors_1.default)());
socket_js_1.app.use(express_1.default.json());
socket_js_1.app.use(body_parser_1.default.json());
// Routes
socket_js_1.app.use('/api/user', userRoutes_js_1.default);
socket_js_1.app.use('/api/course', courseRoutes_js_1.default);
socket_js_1.app.use('/api/article', articleRoutes_js_1.default);
socket_js_1.app.use('/api/message', messageRoutes_js_1.default);
// Error handling middleware
socket_js_1.app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});
// Start server
socket_js_1.server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
