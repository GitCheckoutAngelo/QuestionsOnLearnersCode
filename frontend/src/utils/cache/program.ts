class FileCache {
    private fileLookUp: Map<string, File>;

    public constructor() {
        this.fileLookUp = new Map<string, File>();
    }

    public fileExists(filename: string) {
        return this.fileLookUp.has(filename);
    }

    public saveFile(filename: string, file: File) {
        this.fileLookUp.set(filename, file);
    }

    public removeFile(filename: string) {
        this.fileLookUp.delete(filename);
    }
}

export const fileCache = new FileCache();