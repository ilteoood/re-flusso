import { defineConfig } from 'vitest/config'

export default defineConfig({
    test: {
        pool: 'forks',
        benchmark: {
            include: ['benchmarks/**/*.test.ts'],
        }
    },
})