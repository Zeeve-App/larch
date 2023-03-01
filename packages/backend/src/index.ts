import express from 'express'
import {Application} from 'express';
import server from './server.js';

const app:Application = express();

app.use(server);

export default app