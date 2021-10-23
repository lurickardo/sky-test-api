import express from 'express';
import Connection from './config/orm';
import routes from './routes';
import * as dotenv from 'dotenv';

const app = express()

app.use(express.json())
app.use(routes)

dotenv.config()

console.clear()
console.log('\x1b[33m-Starting servers --------------------')
app.listen(process.env.SERVER_PORT, () => {
  console.log('\x1b[32m-Server express started... \x1b[0m')
}).on('error', (error) => {
  console.log(`\x1b[31m-Error connecting to Express server: ${error} \x1b[0m`)
})

Connection.mongodbConnection().then(() => {
  console.log('\x1b[32m-Server MongoDB started... \x1b[0m');
}).catch((error) => {
  console.log(`\x1b[31m-Error when establishing database connection MongoDB: ${error} \x1b[0m`);
})