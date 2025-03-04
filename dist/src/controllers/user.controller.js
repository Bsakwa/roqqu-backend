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
exports.createUser = exports.getUserById = exports.getUserCount = exports.getUsers = void 0;
const db_1 = __importDefault(require("../config/db"));
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const pageNumber = parseInt(req.query.pageNumber) || 0;
        const pageSize = parseInt(req.query.pageSize) || 10;
        const offset = pageNumber * pageSize;
        const users = yield (0, db_1.default)('users')
            .select('*')
            .limit(pageSize)
            .offset(offset);
        res.status(200).json(users);
    }
    catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ error: 'Failed to fetch users' });
    }
});
exports.getUsers = getUsers;
const getUserCount = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield (0, db_1.default)('users').count('id as count').first();
        const count = result ? result.count : 0;
        res.status(200).json({ count });
    }
    catch (error) {
        console.error('Error counting users:', error);
        res.status(500).json({ error: 'Failed to count users' });
    }
});
exports.getUserCount = getUserCount;
const getUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = parseInt(req.params.id);
        const user = yield (0, db_1.default)('users').where('id', userId).first();
        if (!user) {
            res.status(404).json({ error: 'User not found' });
            return;
        }
        // Get user's address if it exists
        const address = yield (0, db_1.default)('addresses').where('userId', userId).first();
        res.status(200).json(Object.assign(Object.assign({}, user), { address: address || null }));
    }
    catch (error) {
        console.error('Error fetching user:', error);
        res.status(500).json({ error: 'Failed to fetch user' });
    }
});
exports.getUserById = getUserById;
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, email, fullName } = req.body;
        // Check if username or email already exists
        const existingUser = yield (0, db_1.default)('users')
            .where('username', username)
            .orWhere('email', email)
            .first();
        if (existingUser) {
            res.status(409).json({ error: 'Username or email already exists' });
            return;
        }
        const newUser = {
            username,
            email,
            fullName
        };
        const [userId] = yield (0, db_1.default)('users').insert(newUser);
        const createdUser = yield (0, db_1.default)('users').where('id', userId).first();
        // return the new user and join the id in the body
        res.status(201).json(createdUser);
    }
    catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ error: 'Failed to create user' });
    }
});
exports.createUser = createUser;
