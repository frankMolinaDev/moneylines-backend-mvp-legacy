import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { Bet } from './entities/bet.entity';
import { ProReport } from './entities/pro_report.entity';

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: '127.0.0.1',
  port: 3306,
  username: 'root',
  password: '',
  database: 'sports',
  synchronize: true,
  logging: false,
  entities: [Bet, ProReport],
  migrations: [],
  subscribers: [],
});
