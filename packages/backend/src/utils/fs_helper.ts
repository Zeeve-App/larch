/* eslint-disable import/prefer-default-export */
import * as fs from 'node:fs/promises';

/**
 * Create the directory with parent directory if not present (recursively)
 * @param {string} dirPath directory path
 */
export const createDir = async (dirPath: string): Promise<void> => {
  await fs.mkdir(dirPath, { recursive: true });
};
