import * as fs from 'node:fs/promises';

/**
 * Create the directory with parent directory if not present (recursively)
 * @param {string} dirPath directory path
 */
export const createDir = async (dirPath: string): Promise<void> => {
  await fs.mkdir(dirPath, { recursive: true });
};

export const deleteDir = async (dirPath: string): Promise<void> => {
  await fs.rm(dirPath, { recursive: true, force: true });
};

export const checkPathExists = async (fsPath: string): Promise<boolean> => fs.access(
  fsPath,
  fs.constants.F_OK,
)
  .then(() => true)
  .catch(() => false);

export const writeToFileFromBase64 = async (
  fsPath: string,
  dataInBase64: string,
): Promise<void> => {
  await fs.writeFile(fsPath, dataInBase64, { encoding: 'base64' });
};
