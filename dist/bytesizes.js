"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const promises_1 = __importDefault(require("fs/promises"));
const path_1 = __importDefault(require("path"));
class ByteSizes {
    static units = {
        bytes: 1,
        KB: 1024,
        MB: 1024 ** 2,
        GB: 1024 ** 3,
        TB: 1024 ** 4,
        PB: 1024 ** 5,
        EB: 1024 ** 6,
    };
    static async getFileSize(filePath) {
        try {
            const stats = await promises_1.default.stat(filePath);
            return stats.size;
        }
        catch (err) {
            throw this.handleError(`Error getting file size for: ${filePath}`, err);
        }
    }
    static async getFolderSize(folderPath) {
        try {
            const files = await promises_1.default.readdir(folderPath);
            const sizes = await Promise.all(files.map(file => this.getItemSize(path_1.default.join(folderPath, file))));
            return sizes.reduce((total, size) => total + size, 0);
        }
        catch (err) {
            throw this.handleError(`Error reading directory: ${folderPath}`, err);
        }
    }
    static async getItemSize(itemPath) {
        const stats = await promises_1.default.stat(itemPath);
        return stats.isDirectory() ? this.getFolderSize(itemPath) : stats.size;
    }
    static convertSize(bytes, unit, fixed = 2) {
        if (!(unit in this.units)) {
            throw new Error(`Invalid unit. Supported units are: ${Object.keys(this.units).join(', ')}`);
        }
        return (bytes / this.units[unit]).toFixed(fixed) + ` ${unit}`;
    }
    static handleError(message, error) {
        console.error('\n\x1b[41m\x1b[1m\x1b[30m✖ ERROR \x1b[0m \x1b[90m%s\x1b[0m', message);
        console.error('\x1b[90m  └─ Stack Trace:\x1b[0m \n\x1b[90m%s\x1b[0m', error.stack);
        console.error('\x1b[90m  └─ Error details:\x1b[0m %s\n', error.message);
        throw error;
    }
}
exports.default = ByteSizes;
