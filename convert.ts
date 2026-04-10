import * as yaml from 'js-yaml';
import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

const root = process.cwd();

const convert = (fileName: string) => {
    try {
        const inputPath = join(root, 'src', `${fileName}.yaml`);
        const outputPath = join(root, 'src', `${fileName}.json`);
        const data = yaml.load(readFileSync(inputPath, 'utf8'));
        writeFileSync(outputPath, JSON.stringify(data, null, 2));
        console.log(`✅ ${fileName}.yaml -> ${fileName}.json`);
    } catch (e) {
        console.error(`❌ Error ${fileName}:`, e);
    }
};

convert('myths');
convert('items');