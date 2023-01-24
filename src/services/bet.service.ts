import { AppDataSource } from '../data-source';
import { Bet } from '../entities/bet.entity';

const repository = AppDataSource.getRepository(Bet);

const getBets = async (filter: any) => {
  try {
    const requests = await repository.find();
    return requests;
  } catch (error) {
    return null;
  }
};

export default { getBets };
