import App from './app';
import { AppDataSource } from './data-source';

const app = new App();

AppDataSource.initialize()
  .then(() => {app.start()})
  .catch((err) => {
    console.error('Error during Data Source initialization:', err);
  });
