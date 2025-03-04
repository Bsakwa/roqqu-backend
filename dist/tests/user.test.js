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
describe('User API Endpoints', () => {
    it('should get paginated users', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app_1.default).get('/users?pageNumber=0&pageSize=2');
        expect(res.statusCode).toEqual(200);
        expect(Array.isArray(res.body)).toBeTruthy();
        expect(res.body.length).toBeLessThanOrEqual(2);
    }));
    it('should count users', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app_1.default).get('/users/count');
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('count');
        expect(typeof res.body.count).toBe('number');
    }));
    it('should get a user by ID', () => __awaiter(void 0, void 0, void 0, function* () {
        const users = yield (0, supertest_1.default)(app_1.default).get('/users');
        const userId = users.body[0].id;
        const res = yield (0, supertest_1.default)(app_1.default).get(`/users/${userId}`);
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('id', userId);
        expect(res.body).toHaveProperty('username');
        expect(res.body).toHaveProperty('email');
    }));
    it('should create a new user', () => __awaiter(void 0, void 0, void 0, function* () {
        const newUser = {
            username: 'testuser',
            email: 'test@example.com',
            fullName: 'Test User'
        };
        const res = yield (0, supertest_1.default)(app_1.default)
            .post('/users')
            .send(newUser);
        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('id');
        expect(res.body).toHaveProperty('username', newUser.username);
        expect(res.body).toHaveProperty('email', newUser.email);
    }));
});
