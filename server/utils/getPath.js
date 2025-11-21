import fs from "fs";
import path from "path";

/**
 * Recursively get all file paths in a directory
 * @param {string} dirPath - The directory to scan
 * @param {Array} arrayOfFiles - Array to store file paths
 * @param {Array} ignoreFolders - Folder names to ignore
 * @returns {Array} - Array of file paths
 */
export const getPath = (dirPath, arrayOfFiles = [], ignoreFolders = ['.git', '.vscode', 'node_modules']) => {
    const files = fs.readdirSync(dirPath);

    for (const file of files) {
        if (ignoreFolders.includes(file)) continue; // skip ignored folders

        const fullPath = path.resolve(dirPath, file); // full absolute path

        if (fs.statSync(fullPath).isDirectory()) {
            getPath(fullPath, arrayOfFiles, ignoreFolders); // recursive call
        } else {
            arrayOfFiles.push(fullPath);
        }
    }

    return arrayOfFiles;
};
