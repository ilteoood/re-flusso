import { readdirSync } from 'fs';
import { defineConfig } from 'tsup';

const tsFiles = readdirSync('./src')
    .filter(file => file.endsWith('.ts'))
    .map(file => `./src/${file}`)

export default defineConfig({
    entry: tsFiles,
    format: ['cjs', 'esm'],
    clean: true,
    dts: true
})