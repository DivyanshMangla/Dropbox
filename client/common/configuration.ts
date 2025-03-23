import * as dotenv from 'dotenv';
dotenv.config();
export const port = process.env.APP_PORT || '5000'
export const baseUrl = process.env.BASE_URL_PREFIX || 'http://localhost'