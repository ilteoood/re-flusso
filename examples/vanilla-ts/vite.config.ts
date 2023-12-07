import { defineConfig } from 'vite';

export default defineConfig({
    server: {
        proxy: {
            '/users': {
                target: 'http://localhost:3000'
            },
        },
    },
});
