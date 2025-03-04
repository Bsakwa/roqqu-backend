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
const supertest_1 = __importDefault(require("supertest"));
const app_1 = __importDefault(require("../src/app"));
const db_1 = __importDefault(require("../src/config/db"));
beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
    // Set up test database
    yield db_1.default.migrate.latest();
    yield db_1.default.seed.run();
}));
afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
    // Close database connection
    yield db_1.default.destroy();
}));
describe('Post API Endpoints', () => {
    let userId;
    let postId;
    beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
        // Get a user ID for testing
        const users = yield (0, db_1.default)('users').select('id').limit(1);
        userId = users[0].id;
        // Get a post ID for testing
        const posts = yield (0, db_1.default)('posts').select('id').limit(1);
        postId = posts[0].id;
    }));
    it('should get posts by user ID', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app_1.default).get(`/posts?userId=${userId}`);
        expect(res.statusCode).toEqual(200);
        expect(Array.isArray(res.body)).toBeTruthy();
        // Explicitly type the post parameter
        res.body.forEach((post) => {
            expect(post).toHaveProperty('userId', userId);
            expect(post).toHaveProperty('title');
            expect(post).toHaveProperty('body');
        });
    }));
    it('should create a new post', () => __awaiter(void 0, void 0, void 0, function* () {
        const newPost = {
            userId,
            title: 'Test Post',
            body: 'This is a test post content.'
        };
        const res = yield (0, supertest_1.default)(app_1.default)
            .post('/posts')
            .send(newPost);
        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('id');
        expect(res.body).toHaveProperty('userId', userId);
        expect(res.body).toHaveProperty('title', newPost.title);
        expect(res.body).toHaveProperty('body', newPost.body);
    }));
    it('should delete a post', () => __awaiter(void 0, void 0, void 0, function* () {
        // Create a post to delete
        const newPost = {
            userId,
            title: 'Post to Delete',
            body: 'This post will be deleted.'
        };
        const createRes = yield (0, supertest_1.default)(app_1.default)
            .post('/posts')
            .send(newPost);
        const createdPostId = createRes.body.id;
        const res = yield (0, supertest_1.default)(app_1.default).delete(`/posts/${createdPostId}`);
        expect(res.statusCode).toEqual(204);
        // Verify post is deleted
        const checkRes = yield (0, db_1.default)('posts').where('id', createdPostId).first();
        expect(checkRes).toBeUndefined();
    }));
});
