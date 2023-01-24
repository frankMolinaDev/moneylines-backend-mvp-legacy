import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { Bet } from './entities/bet.entity';

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: '127.0.0.1',
  port: 3306,
  username: 'root',
  password: '',
  database: 'sports',
  synchronize: true,
  logging: false,
  entities: [Bet],
  migrations: [],
  subscribers: [],
});
