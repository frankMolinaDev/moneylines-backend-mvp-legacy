import express, { Express, Response as ExResponse, Request as ExRequest } from 'express';
import swaggerUi from 'swagger-ui-express';
import bodyParser from 'body-parser';
import cors from 'cors';
import morgan from 'morgan';
import { errorHandler } from './middlewares/api-error-handler';
import { startScraping } from './scraping';
import { RegisterRoutes } from './routes';

const port = process.env.PORT || 5000;

class App {
  public app: Express;

  constructor() {
    this.app = express();
    this.index();
    this.scrape();
  }

  private index():void {
    this.app.use(bodyParser.json());
    this.app.use(
      cors({
        origin: ['http://localhost:3000'],
        optionsSuccessStatus: 200,
      }),
    );

    this.app.use(
      '/docs',
      swaggerUi.serve,
      async (_req: ExRequest, res: ExResponse) => {
        return res.send(
          swaggerUi.generateHTML(await import('./swagger.json')),
        );
      },
    );

    this.app.use(morgan('dev'));
    RegisterRoutes(this.app);
  }

  private scrape():void {
    startScraping();
  }

  public start():void {
    this.app.use(errorHandler);
    this.app.listen(port, () =>
      console.log(`Application listening at http://localhost:${port}`),
    );
  }
}

export default App;
