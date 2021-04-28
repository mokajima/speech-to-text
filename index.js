"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var speech_1 = require("@google-cloud/speech");
var commander_1 = require("commander");
var fs = require("fs");
var DEFAULT_CONFIG = {
    enableAutomaticPunctuation: true
};
var client = new speech_1.v1p1beta1.SpeechClient();
commander_1.program
    .option('-l, --languageCode <languageCode>', undefined, 'en-US')
    .option('-s, --sampleRateHertz <sampleRateHertz>', undefined, '16000')
    .requiredOption('-e, --encoding <encoding>')
    .requiredOption('-u, --uri <uri>')
    .action(function () { return __awaiter(void 0, void 0, void 0, function () {
    var _a, encoding, languageCode, sampleRateHertz, uri, audio, config, operation, response, transcription, error_1;
    var _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _a = commander_1.program.opts(), encoding = _a.encoding, languageCode = _a.languageCode, sampleRateHertz = _a.sampleRateHertz, uri = _a.uri;
                audio = { uri: uri };
                config = __assign(__assign({}, DEFAULT_CONFIG), { encoding: encoding,
                    languageCode: languageCode,
                    sampleRateHertz: sampleRateHertz });
                _c.label = 1;
            case 1:
                _c.trys.push([1, 4, , 5]);
                return [4 /*yield*/, client.longRunningRecognize({ audio: audio, config: config })];
            case 2:
                operation = (_c.sent())[0];
                return [4 /*yield*/, operation.promise()];
            case 3:
                response = (_c.sent())[0];
                transcription = (_b = response.results) === null || _b === void 0 ? void 0 : _b.map(function (result) { var _a; return (_a = result.alternatives) === null || _a === void 0 ? void 0 : _a[0].transcript; }).join('\n');
                fs.writeFile('./transcription.txt', transcription !== null && transcription !== void 0 ? transcription : '', function (error) {
                    if (error) {
                        throw error;
                    }
                });
                return [3 /*break*/, 5];
            case 4:
                error_1 = _c.sent();
                console.error(error_1);
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); });
commander_1.program.parse(process.argv);
