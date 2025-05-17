import { config } from "dotenv";


config( { path: `.env.${process.env.NODE_ENV || 'development'}.local` });

export const {PORT, 
    NODE_ENV, 
    MONGODB_URI,
    JWT_SECRET,
    JWT_EXPIRES_IN,
    ARCJET_KEY,
    ARCJET_ENV,
    QSTASH_TOKEN,
    QSTASH_URL,
    EMAIL_PASSWORD,
    EMAIL_USER  } = process.env;

// Default to development if NODE_ENV is not set
