import {fileURLToPath, URL} from 'node:url'

import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

// https://vitejs.dev/config/
export default defineConfig({
    base: "/",
    plugins: [
        vue(),
        vueJsx()
    ],
    resolve: {

        extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.vue'],

        alias: {

            '@': fileURLToPath(new URL('./src', import.meta.url)),
            '~': fileURLToPath(new URL('./node_modules/', import.meta.url))
        }
    }
})
