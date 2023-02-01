import { Controller, Get, Path, Post, Route, Query } from 'tsoa';
import betService from '../services/bet.service';

@Route('api')
export class BetController extends Controller {
  @Get()
  public async getBets(@Query() options: any) {
    const requests = await betService.getBets(null);
    return requests;
  }
}
