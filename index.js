// Dependencies imports
import express from 'express';
import cors from 'cors';

// Modules imports
import config from './config.js';
import bookRoute from "./routes/bookRoute.js";


const app = express();

app.use(cors());
app.use(express.json());

//routes
app.use('/api', bookRoute);

app.listen(config.port, () =>
  console.log(`Server is live @ ${config.hostUrl}`),
);