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
exports.deletePost = exports.createPost = exports.getPostsByUserId = void 0;
const db_1 = __importDefault(require("../config/db"));
const getPostsByUserId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = parseInt(req.query.userId);
        if (!userId) {
            res.status(400).json({ error: 'User ID is required' });
            return;
        }
        // Check if user exists
        const user = yield (0, db_1.default)('users').where('id', userId).first();
        if (!user) {
            res.status(404).json({ error: 'User not found' });
            return;
        }
        const posts = yield (0, db_1.default)('posts').where('userId', userId).select('*');
        res.status(200).json(posts);
    }
    catch (error) {
        console.error('Error fetching posts:', error);
        res.status(500).json({ error: 'Failed to fetch posts' });
    }
});
exports.getPostsByUserId = getPostsByUserId;
const createPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId, title, body } = req.body;
        // Check if user exists
        const user = yield (0, db_1.default)('users').where('id', userId).first();
        if (!user) {
            res.status(404).json({ error: 'User not found' });
            return;
        }
        const newPost = {
            userId,
            title,
            body
        };
        const [postId] = yield (0, db_1.default)('posts').insert(newPost);
        const createdPost = yield (0, db_1.default)('posts').where('id', postId).first();
        //res.status(201).json(newPost);
        // return new post as in the database
        res.status(201).json(createdPost);
    }
    catch (error) {
        console.error('Error creating post:', error);
        res.status(500).json({ error: 'Failed to create post' });
    }
});
exports.createPost = createPost;
const deletePost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const postId = parseInt(req.params.id);
        // Check if post exists
        const post = yield (0, db_1.default)('posts').where('id', postId).first();
        if (!post) {
            res.status(404).json({ error: 'Post not found' });
            return;
        }
        yield (0, db_1.default)('posts').where('id', postId).delete();
        res.status(204).send();
    }
    catch (error) {
        console.error('Error deleting post:', error);
        res.status(500).json({ error: 'Failed to delete post' });
    }
});
exports.deletePost = deletePost;
