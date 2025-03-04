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
exports.updateAddress = exports.createAddress = exports.getAddressByUserId = void 0;
const db_1 = __importDefault(require("../config/db"));
const getAddressByUserId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // define userID
        const userId = parseInt(req.params.userId);
        // Check if user exists
        const user = yield (0, db_1.default)('users').where('id', userId).first();
        if (!user) {
            res.status(404).json({ error: 'User not found' });
            return;
        }
        const address = yield (0, db_1.default)('addresses').where('userId', userId).first();
        if (!address) {
            res.status(404).json({ error: 'Address not found for this user' });
            return;
        }
        res.status(200).json(address);
    }
    catch (error) {
        console.error('Error fetching address:', error);
        res.status(500).json({ error: 'Failed to fetch address' });
    }
});
exports.getAddressByUserId = getAddressByUserId;
const createAddress = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId, street, city, state, country, zipCode } = req.body;
        // Check if user exists
        const user = yield (0, db_1.default)('users').where('id', userId).first();
        if (!user) {
            res.status(404).json({ error: 'User not found' });
            return;
        }
        // Check if user already has an address
        const existingAddress = yield (0, db_1.default)('addresses').where('userId', userId).first();
        if (existingAddress) {
            res.status(409).json({ error: 'User already has an address' });
            return;
        }
        const newAddress = {
            userId,
            street,
            city,
            state,
            country,
            zipCode
        };
        const [addressId] = yield (0, db_1.default)('addresses').insert(newAddress);
        const createdAddress = yield (0, db_1.default)('addresses').where('id', addressId).first();
        res.status(201).json(createdAddress);
    }
    catch (error) {
        console.error('Error creating address:', error);
        res.status(500).json({ error: 'Failed to create address' });
    }
});
exports.createAddress = createAddress;
const updateAddress = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = parseInt(req.params.userId);
        const { street, city, state, country, zipCode } = req.body;
        // Check if user exists
        const user = yield (0, db_1.default)('users').where('id', userId).first();
        if (!user) {
            res.status(404).json({ error: 'User not found' });
            return;
        }
        // Check if address exists for this user
        const existingAddress = yield (0, db_1.default)('addresses').where('userId', userId).first();
        if (!existingAddress) {
            res.status(404).json({ error: 'Address not found for this user' });
            return;
        }
        const updatedAddress = {
            street: street || existingAddress.street,
            city: city || existingAddress.city,
            state: state || existingAddress.state,
            country: country || existingAddress.country,
            zipCode: zipCode || existingAddress.zipCode,
            updatedAt: new Date().toISOString()
        };
        yield (0, db_1.default)('addresses')
            .where('userId', userId)
            .update(updatedAddress);
        const address = yield (0, db_1.default)('addresses').where('userId', userId).first();
        res.status(200).json(address);
    }
    catch (error) {
        console.error('Error updating address:', error);
        res.status(500).json({ error: 'Failed to update address' });
    }
});
exports.updateAddress = updateAddress;
