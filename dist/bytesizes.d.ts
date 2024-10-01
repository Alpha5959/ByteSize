declare class ByteSizes {
    static units: {
        bytes: number;
        KB: number;
        MB: number;
        GB: number;
        TB: number;
        PB: number;
        EB: number;
    };
    static getFileSize(filePath: string): Promise<number>;
    static getFolderSize(folderPath: string): Promise<number>;
    static getItemSize(itemPath: string): Promise<number>;
    static convertSize(bytes: number, unit: keyof typeof this.units, fixed?: number): string;
    static handleError(message: string, error: any): Error;
}
export default ByteSizes;
