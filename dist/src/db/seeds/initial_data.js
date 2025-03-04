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
Object.defineProperty(exports, "__esModule", { value: true });
exports.seed = seed;
function seed(knex) {
    return __awaiter(this, void 0, void 0, function* () {
        // Deletes ALL existing entries
        yield knex('posts').del();
        yield knex('addresses').del();
        yield knex('users').del();
        // Insert seed users and get their IDs
        const users = [
            { username: 'franklin42', email: 'robert.franklin@mailbox.org', fullName: 'Robert Franklin' },
            { username: 'amyparker', email: 'amy.parker@fastmail.io', fullName: 'Amy Parker' },
            { username: 'davidmark', email: 'david.marks@inboxmail.net', fullName: 'David Marks' }
        ];
        // Add users one by one and store their IDs
        const userIds = [];
        for (const user of users) {
            const [id] = yield knex('users').insert(user).returning('id');
            // Handle both raw value and object returns
            userIds.push(typeof id === 'object' ? id.id : id);
        }
        // Insert addresses for each user
        const addresses = [
            {
                userId: userIds[0],
                street: '574 Willow Avenue',
                city: 'Boston',
                state: 'MA',
                country: 'USA',
                zipCode: '02115'
            },
            {
                userId: userIds[1],
                street: '892 Cedar Lane',
                city: 'Portland',
                state: 'OR',
                country: 'USA',
                zipCode: '97201'
            },
            {
                userId: userIds[2],
                street: '347 Birch Street',
                city: 'Austin',
                state: 'TX',
                country: 'USA',
                zipCode: '78701'
            }
        ];
        for (const address of addresses) {
            yield knex('addresses').insert(address);
        }
        // Insert posts for each user
        const posts = [
            {
                userId: userIds[0],
                title: 'Weekend Hiking Trip',
                body: 'Just got back from an amazing hike in the mountains!'
            },
            {
                userId: userIds[0],
                title: 'New Restaurant Review',
                body: 'Found this great little place downtown with the best pasta.'
            },
            {
                userId: userIds[1],
                title: 'Tech Conference Recap',
                body: 'Learned some amazing things at the conference this weekend.'
            },
            {
                userId: userIds[2],
                title: 'Travel Plans',
                body: 'Planning my next vacation to the coast. Any recommendations?'
            }
        ];
        yield knex('posts').insert(posts);
    });
}
