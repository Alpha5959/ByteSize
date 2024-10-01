# ByteSizes

[![NPM Version](https://img.shields.io/npm/v/bytesizes?style=for-the-badge)](https://www.npmjs.com/package/bytesizes)
[![Repository Size](https://img.shields.io/github/repo-size/Alpha5959/bytesizes?style=for-the-badge)](https://github.com/Alpha5959/bytesizes)
[![License](https://img.shields.io/npm/l/bytesizes?style=for-the-badge)](https://opensource.org/licenses/MIT)
[![Downloads](https://img.shields.io/npm/dt/bytesizes?style=for-the-badge)](https://www.npmjs.com/package/bytesizes)
[![Support](https://img.shields.io/badge/Support-Discord-7289d9?style=for-the-badge&logo=discord)](https://discord.com/invite/Rw5gRVqSaK)

**ByteSizes** is a lightweight and powerful Node.js package for checking the size of files or folders with the ability to easily convert between different units. It's designed to help developers manage and monitor filesystem sizes with a simple, intuitive interface and efficient error handling.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [API Reference](#api-reference)
- [Error Handling](#error-handling)
- [License](#license)
- [Contributing](#contributing)
- [Acknowledgments](#acknowledgments)

## Features

- **File Size Detection**: Quickly get the size of individual files.
- **Folder Size Calculation**: Compute the total size of folders, including all subdirectories.
- **Multiple Unit Conversions**: Convert between bytes, KB, MB, GB, TB, PB, and EB.
- **Robust Error Handling**: Get clear error messages and stack traces for easy debugging.

## Installation

Install **ByteSizes** using npm:

```bash
npm install bytesizes
```

## Usage

Here's a simple example demonstrating how to use ByteSizes:

```javascript
const ByteSizes = require('bytesizes');

(async () => {
  try {
    // Get file size and convert it to KB
    const fileSize = await ByteSizes.getFileSize('example.txt');
    console.log(`File Size: ${ByteSizes.convertSize(fileSize, 'KB')}`);
    
    // Get folder size and convert it to MB
    const folderSize = await ByteSizes.getFolderSize('myFolder');
    console.log(`Folder Size: ${ByteSizes.convertSize(folderSize, 'MB')}`);
  } catch (error) {
    console.error('Error:', error.message);
  }
})();
```

### TypeScript & ES Modules Usage

If you're using TypeScript or ES Modules (`.mjs`), you can import the module as follows:

```typescript
import ByteSizes from 'bytesizes';

// Same usage as above
```

## API Reference

### `getFileSize(filePath: string): Promise<number>`

- **Description**: Returns the size of a file in bytes.
- **Parameters**: 
  - `filePath`: The path to the file.
- **Returns**: A promise resolving to the file size in bytes.

### `getFolderSize(folderPath: string): Promise<number>`

- **Description**: Calculates the total size of a folder (including subfolders) in bytes.
- **Parameters**:
  - `folderPath`: The path to the folder.
- **Returns**: A promise resolving to the folder size in bytes.

### `convertSize(sizeInBytes: number, unit: string): string`

- **Description**: Converts the size from bytes to the specified unit.
- **Parameters**:
  - `sizeInBytes`: The size in bytes to convert.
  - `unit`: The unit to convert to (`bytes`, `KB`, `MB`, `GB`, `TB`, `PB`, `EB`).
- **Returns**: A formatted string showing the converted size.

## Error Handling

ByteSizes ensures clear and descriptive error messages for easier troubleshooting. When an error occurs, the stack trace is provided for better context.

Example:

```
✖ ERROR: Error reading file or directory: example.txt
  └─ Stack Trace:
Error: ENOENT: no such file or directory, open 'D:\Path\To\example.txt'
```

## License

This project is licensed under the [MIT License](LICENSE). See the LICENSE file for more details.

## Contributing

Contributions are welcome! If you'd like to contribute, please open an issue or submit a pull request on GitHub. All contributions must follow coding best practices and include relevant test cases.

## Acknowledgments

- [Node.js](https://nodejs.org/) - A JavaScript runtime for building scalable network applications.
- [fs.promises](https://nodejs.org/api/fs.html#fspromises) - The Promise-based Node.js filesystem module.
- Special thanks to everyone who has contributed to this package!
