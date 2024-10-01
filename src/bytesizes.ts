import fs from 'fs/promises';
import path from 'path';

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

  static async getFileSize(filePath: string): Promise<number> {
    try {
      const stats = await fs.stat(filePath);
      return stats.size;
    } catch (err: any) {
      throw this.handleError(`Error getting file size for: ${filePath}`, err);
    }
  }

  static async getFolderSize(folderPath: string): Promise<number> {
    try {
      const files = await fs.readdir(folderPath);
      const sizes = await Promise.all(files.map(file => this.getItemSize(path.join(folderPath, file))));
      return sizes.reduce((total, size) => total + size, 0);
    } catch (err: any) {
      throw this.handleError(`Error reading directory: ${folderPath}`, err);
    }
  }

  static async getItemSize(itemPath: string): Promise<number> {
    const stats = await fs.stat(itemPath);
    return stats.isDirectory() ? this.getFolderSize(itemPath) : stats.size;
  }

  static convertSize(bytes: number, unit: keyof typeof this.units, fixed: number = 2): string {
    if (!(unit in this.units)) {
      throw new Error(`Invalid unit. Supported units are: ${Object.keys(this.units).join(', ')}`);
    }
    return (bytes / this.units[unit]).toFixed(fixed) + ` ${unit}`;
  }

  static handleError(message: string, error: any): Error { 
    console.error('\n\x1b[41m\x1b[1m\x1b[30m✖ ERROR \x1b[0m \x1b[90m%s\x1b[0m', message);
    console.error('\x1b[90m  └─ Stack Trace:\x1b[0m \n\x1b[90m%s\x1b[0m', error.stack);
    console.error('\x1b[90m  └─ Error details:\x1b[0m %s\n', error.message);
    throw error;
  }
}

export default ByteSizes;