// postcss.config.mjs
import postcssGoogleFont from 'postcss-google-font';

/** @type {import('postcss-load-config').Config} */
const config = {
    plugins: [
        "@tailwindcss/postcss"
    ],
};

export default config;