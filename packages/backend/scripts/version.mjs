import fs from 'node:fs/promises';
import * as path from 'path';

const rootPath = path.dirname(new URL(import.meta.url).pathname);
console.log(rootPath)

const packageJson = JSON.parse(await fs.readFile(path.join(rootPath, '../../cli/package.json'), { encoding: 'utf-8' }));

const versionJson = `// Managed by version script - do not edit directly
export default { version: '${packageJson.version}' };
`;

await fs.writeFile(path.join(rootPath, '../src/version.ts'), versionJson);
