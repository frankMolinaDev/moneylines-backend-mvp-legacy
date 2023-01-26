import { Controller, Get, Path, Post, Route } from 'tsoa';
import betService from '../services/bet.service';

@Route('bet')
export class BetController extends Controller {
  @Get()
  public async getBets() {
    const requests = await betService.getBets(null);
    return requests;
  }
}
