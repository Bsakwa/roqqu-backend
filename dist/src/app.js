"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const morgan_1 = __importDefault(require("morgan"));
const user_routes_1 = __importDefault(require("./routes/user.routes"));
const address_routes_1 = __importDefault(require("./routes/address.routes"));
const post_routes_1 = __importDefault(require("./routes/post.routes"));
const app = (0, express_1.default)();
// Middleware
app.use((0, cors_1.default)());
app.use((0, helmet_1.default)());
app.use((0, morgan_1.default)('dev'));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// Routes
app.use('/users', user_routes_1.default);
app.use('/addresses', address_routes_1.default);
app.use('/posts', post_routes_1.default);
// Default route
app.get('/', (req, res) => {
    res.json({ message: 'User Management API' });
});
// 404 handler
app.use((req, res) => {
    res.status(404).json({ message: 'Route not found' });
});
exports.default = app;
