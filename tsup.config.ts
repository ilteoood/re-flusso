import { globSync } from 'glob';
import { defineConfig } from 'tsup';

const tsFiles = globSync('./src/**/*.ts')

export default defineConfig({
    entry: tsFiles,
    format: ['cjs', 'esm'],
    clean: true,
    dts: true
})