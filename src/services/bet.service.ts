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

const updateBet = async (data: any) => {
  console.log(data)
  const value = await repository.findOneBy({matchId: data.matchId})
  if (value && value.betData !== data.betData) {
    value.betData = data.betData;
    await repository.save(value);
  } else if (!value) {
    await repository.save(data)
  }
}

export default { getBets, updateBet };
