require('dotenv').config();

const { 
    PORT, HOST, API_TOKEN, JWT_EXPIRATION_MINUTES, JWT_MAX_DAYS_ALIVE,
    DB_USER, DB_HOST, DB_NAME, DB_PASSWORD, DB_PORT
} = process.env;


const Config = {
    'APP': {
        'PORT': PORT || 5000,
        'HOST': HOST || 'localhost',
        'API_TOKEN': API_TOKEN || '5BF2CDD9AF84BB7BB06B7361AC29C468BED3E9BFC8',
        'JWT_EXPIRATION_MINUTES': JWT_EXPIRATION_MINUTES || 60,
        'JWT_MAX_DAYS_ALIVE': JWT_MAX_DAYS_ALIVE || 7,
    },
    'DATABASE': {
        'USER': DB_USER || 'postgres',
        'HOST': DB_HOST || 'localhost',
        'NAME': DB_NAME || 'checkcar_app',
        'PASSWORD': DB_PASSWORD || 'postgres',
        'PORT': DB_PORT || 5432,
    },
};

module.exports = Config;