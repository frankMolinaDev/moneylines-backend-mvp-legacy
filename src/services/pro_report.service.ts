import { AppDataSource } from '../data-source';
import { ProReport } from '../entities/pro_report.entity';

const repository = AppDataSource.getRepository(ProReport);

const getReports = async (filter: any) => {
  try {
    const requests = await repository.find();
    return requests;
  } catch (error) {
    return null;
  }
};

const updateProReport = async (data: any) => {
  console.log(data)
  const value = await repository.findOneBy({matchId: data.matchId})
  if (value && value.bet !== data.bet) {
    value.bet = data.betData;
    await repository.save(value);
  } else if (!value) {
    await repository.save(data)
  }
}

export default { getReports, updateProReport };
