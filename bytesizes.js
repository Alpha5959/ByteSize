const fs = require('fs').promises;
const path = require('path');

class ByteSize {
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
      const stats = await fs.stat(filePath);
      return stats.size;
    } catch (err) {
      throw this.handleError(`Error getting file size for: ${filePath}`, err);
    }
  }

  static async getFolderSize(folderPath) {
    const start = this.startTimer();
    try {
      const files = await fs.readdir(folderPath);
      const sizes = await Promise.all(files.map(file => this.getItemSize(path.join(folderPath, file))));
      const duration = this.getElapsedTime(start);
      console.log(`getFolderSize took ${duration.toFixed(2)} ms`);
      return sizes.reduce((total, size) => total + size, 0);
    } catch (err) {
      throw this.handleError(`Error reading directory: ${folderPath}`, err);
    }
  }

  static async getItemSize(itemPath) {
    const stats = await fs.stat(itemPath);
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

module.exports = ByteSize;