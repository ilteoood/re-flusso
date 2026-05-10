import { globSync } from 'glob';
import { defineConfig } from 'tsup';

const tsFiles = globSync('./src/**/*.ts', { posix: true });

export default defineConfig({
    entry: tsFiles,
    format: ['cjs', 'esm'],
    clean: true,
    dts: {
        tsconfig: {
            compilerOptions: {
                target: 'ES2020',
                module: 'ESNext',
                lib: ['ES2020', 'DOM', 'DOM.Iterable'],
                skipLibCheck: true,
                moduleResolution: 'bundler' as const,
                resolveJsonModule: true,
                isolatedModules: true,
                noEmit: true,
                strict: true,
                noUnusedLocals: true,
                noUnusedParameters: true,
                noFallthroughCasesInSwitch: true,
            },
            include: ['src'],
        },
    },
});
