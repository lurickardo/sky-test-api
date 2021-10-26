import express from 'express';
import * as dotenv from 'dotenv';
import Connection from './config/orm';
import routes from './routes';

async function main() {
  try {
    const app = express();

    app.use(express.json());
    app.use(routes);

    dotenv.config();

    console.clear();

    console.log('\x1b[33m- Starting servers...');
    app.listen(process.env.PORT || 3000, () => {
      console.log('\x1b[32m- Server express started! \x1b[0m');
    }).on('error', (error) => {
      console.log(`\x1b[31m- Error connecting to Express server: ${error} \x1b[0m`);
    });

    await Connection.mongodbConnection();
    console.log('\x1b[32m- Server MongoDB started! \x1b[0m');
  } catch (error) {
    console.log(`\x1b[31m- Error starting server: ${error} \x1b[0m`);
  }
}

main();
