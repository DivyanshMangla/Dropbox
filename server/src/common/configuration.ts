import * as dotenv from 'dotenv';
dotenv.config()

export const mongoUrl = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/dropbox'
export const port = process.env.APP_PORT || '5000'