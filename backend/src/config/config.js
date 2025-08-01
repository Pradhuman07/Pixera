import dotenv from 'dotenv';    // dotenv package is used to load environment variables from a .env file into process.env in Node.js applications (using config() function)

dotenv.config();    // write this line to load environment variables from .env file into process.env

const config = {
    PORT: process.env.PORT,
    MONGODB_URL: process.env.MONGODB_URL,
    JWT_SECRET: process.env.JWT_SECRET,
    IMAGEKIT_PUBLIC_KEY: process.env.IMAGEKIT_PUBLIC_KEY,
    IMAGEKIT_PRIVATE_KEY: process.env.IMAGEKIT_PRIVATE_KEY,
    IMAGEKIT_URL_ENDPOINT: process.env.IMAGEKIT_URL_ENDPOINT,
    GEMINI_API_KEY: process.env.GEMINI_API_KEY,
};

export default config;