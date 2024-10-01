# ByteSizes

![npm](https://img.shields.io/npm/v/bytesizes) ![npm](https://img.shields.io/npm/l/bytesizes)

**ByteSizes** is a lightweight Node.js package designed for efficiently checking the size of files and folders while providing convenient size conversions. With its simple interface and robust error handling, ByteSizes is perfect for developers needing to manage and monitor filesystem sizes.

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

- **File Size Detection**: Quickly check the size of individual files.
- **Folder Size Calculation**: Automatically compute the total size of folders, including nested subfolders.
- **Multiple Unit Support**: Convert sizes between bytes, kilobytes (KB), megabytes (MB), gigabytes (GB), terabytes (TB), petabytes (PB), and exabytes (EB).
- **Descriptive Error Handling**: Clear error messages and stack traces to aid debugging.

## Installation

You can install **ByteSizes** via npm. Run the following command in your terminal:

```bash
npm install bytesizes
```

## Usage

Here's a simple example of how to use the ByteSizes package:

```javascript
const ByteSizes = require('bytesizes');

(async () => {
  try {
    const fileSize = await ByteSizes.getFileSize('example.txt');
    console.log(`File Size: ${ByteSizes.convertSize(fileSize, 'KB')}`);
    
    const folderSize = await ByteSizes.getFolderSize('myFolder');
    console.log(`Folder Size: ${ByteSizes.convertSize(folderSize, 'MB')}`);
  } catch (error) {
    console.error(error);
  }
})();
```

### API Reference

- **`ByteSizes.getFileSize(filePath)`**: 
  - **Description**: Returns the size of the specified file in bytes.
  - **Parameters**: `filePath` (string) - The path to the file.
  - **Returns**: Promise resolving to the size in bytes.

- **`ByteSizes.getFolderSize(folderPath)`**: 
  - **Description**: Calculates the total size of the specified folder in bytes, including subfolders.
  - **Parameters**: `folderPath` (string) - The path to the folder.
  - **Returns**: Promise resolving to the total size in bytes.

- **`ByteSizes.convertSize(bytes, unit)`**: 
  - **Description**: Converts bytes into the specified unit.
  - **Parameters**: 
    - `bytes` (number) - The size in bytes.
    - `unit` (string) - The desired unit (supported: `bytes`, `KB`, `MB`, `GB`, `TB`, `PB`, `EB`).
  - **Returns**: String representing the converted size with the unit.

## Error Handling

ByteSizes employs robust error handling. If any issues arise during file or folder size retrieval, the package will throw an error with a clear message, including the stack trace for easier debugging.

Example error output:

```
✖ ERROR: Error reading directory: myFolder
  └─ Stack Trace:
Error: ENOENT: no such file or directory, scandir 'D:\Path\To\myFolder'
  └─ Error details: ENOENT: no such file or directory, scandir 'D:\Path\To\myFolder'
```

## License

This project is licensed under the [MIT License](LICENSE). See the LICENSE file for details.

## Contributing

Contributions are welcome! If you have ideas for new features, enhancements, or bug fixes, please submit a pull request or open an issue. Ensure to follow best practices and include tests where applicable.

## Acknowledgments

- [Node.js](https://nodejs.org/) - A JavaScript runtime for building scalable network applications.
- [fs.promises](https://nodejs.org/api/fs.html#fspromises) - Promises-based version of the Node.js file system module.
- All contributors who help improve this package!
