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
exports.deleteUser = exports.resetUsers = exports.registerUser = exports.registerUserSchema = exports.getUsers = exports.getUser = void 0;
const promises_1 = __importDefault(require("fs/promises"));
const path_1 = __importDefault(require("path"));
const nanoid_1 = require("nanoid");
const usersOriginal_json_1 = __importDefault(require("./usersOriginal.json"));
const usersFilePath = path_1.default.resolve(__dirname, './users.json');
const sleep = (time = 1000) => new Promise((resolve) => setTimeout(resolve, time));
const readUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    const usersBuffer = yield promises_1.default.readFile(usersFilePath);
    return JSON.parse(usersBuffer.toString());
});
const writeUsers = (data) => __awaiter(void 0, void 0, void 0, function* () {
    return promises_1.default.writeFile(usersFilePath, JSON.stringify(data), 'utf-8');
});
const getUser = (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = request.query;
    if (!email)
        throw new Error('Please provide an email');
    yield sleep();
    const users = yield readUsers();
    console.log('users', users);
    const user = users.find((user) => user.email === email);
    return {
        user,
    };
});
exports.getUser = getUser;
const getUsers = (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
    yield sleep();
    return {
        users: yield readUsers(),
    };
});
exports.getUsers = getUsers;
exports.registerUserSchema = {
    body: {
        type: 'object',
        properties: {
            name: {
                type: 'string',
            },
            email: {
                type: 'string',
            },
        },
        required: ['name', 'email'],
    },
};
const registerUser = (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email } = request.body;
    yield sleep();
    const newUser = {
        id: (0, nanoid_1.nanoid)(),
        name,
        email,
    };
    const users = yield readUsers();
    users.push(newUser);
    yield writeUsers(users);
    return {
        user: newUser,
    };
});
exports.registerUser = registerUser;
const resetUsers = (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
    yield sleep();
    yield writeUsers(usersOriginal_json_1.default);
    return true;
});
exports.resetUsers = resetUsers;
const deleteUser = (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = request.params;
    if (!id)
        throw new Error('User id is required');
    yield sleep();
    const users = yield readUsers();
    const updatedUsers = users.filter((_user) => _user.id !== id);
    yield writeUsers(updatedUsers);
    return true;
});
exports.deleteUser = deleteUser;
