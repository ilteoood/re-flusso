import { defineConfig } from 'vitest/config'

export default defineConfig({
    test: {
        environment: process.env.TEST_ENV
    },
})