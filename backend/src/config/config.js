import dotenv from 'dotenv';    // dotenv package is used to load environment variables from a .env file into process.env in Node.js applications (using config() function)

dotenv.config();    // write this line to load environment variables from .env file into process.env

const config = {
    PORT: process.env.PORT,
    MONGODB_URL: process.env.MONGODB_URL,
};

export default config;