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
describe('Address API Endpoints', () => {
    let userId;
    let existingAddress;
    beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
        // Get a user ID for testing
        const users = yield (0, db_1.default)('users').select('id').limit(1);
        userId = users[0].id;
        // Retrieve the existing address for the user
        existingAddress = yield (0, supertest_1.default)(app_1.default).get(`/addresses/${userId}`);
    }));
    it('should get an address by user ID', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app_1.default).get(`/addresses/${userId}`);
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('userId', userId);
        expect(res.body).toHaveProperty('street');
        expect(res.body).toHaveProperty('city');
    }));
    it('should update an existing address', () => __awaiter(void 0, void 0, void 0, function* () {
        // Verify we have an existing address first
        expect(existingAddress.statusCode).toEqual(200);
        const updateData = {
            street: '456 Updated St',
            city: 'Updated City'
        };
        const res = yield (0, supertest_1.default)(app_1.default)
            .patch(`/addresses/${userId}`)
            .send(updateData);
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('userId', userId);
        expect(res.body).toHaveProperty('street', updateData.street);
        expect(res.body).toHaveProperty('city', updateData.city);
        // Optional: Verify the update persisted by fetching the address again
        const verifyRes = yield (0, supertest_1.default)(app_1.default).get(`/addresses/${userId}`);
        expect(verifyRes.body.street).toEqual(updateData.street);
        expect(verifyRes.body.city).toEqual(updateData.city);
    }));
    it('should create a new address', () => __awaiter(void 0, void 0, void 0, function* () {
        // Create a new user first
        const newUser = {
            username: 'addresstest',
            email: 'addresstest@example.com',
            fullName: 'Address Test'
        };
        const userRes = yield (0, supertest_1.default)(app_1.default)
            .post('/users')
            .send(newUser);
        const newUserId = userRes.body.id;
        const newAddress = {
            userId: newUserId,
            street: '123 Test St',
            city: 'Test City',
            state: 'Test State',
            country: 'Test Country',
            zipCode: '12345'
        };
        const res = yield (0, supertest_1.default)(app_1.default)
            .post('/addresses')
            .send(newAddress);
        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('userId', newUserId);
        expect(res.body).toHaveProperty('street', newAddress.street);
        expect(res.body).toHaveProperty('city', newAddress.city);
    }));
});
