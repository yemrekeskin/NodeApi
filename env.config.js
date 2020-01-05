var dotenv = require('dotenv');
dotenv.config();

let path;
switch (process.env.NODE_ENV) {
    case 'dev':
        path = `${__dirname}/.env.dev`;
        break;
    case 'prod':
        path = `${__dirname}/.env.prod`;
        break;
    default:
        path = `${__dirname}/.env.dev`;
}

dotenv.config({ path });