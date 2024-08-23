"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const articleController_1 = require("../controllers/articleController");
const userAuthenticate_1 = require("../utils/userAuthenticate");
const router = (0, express_1.Router)();
router.post('/create/:courseId', userAuthenticate_1.authenticate, articleController_1.createArticle);
exports.default = router;
