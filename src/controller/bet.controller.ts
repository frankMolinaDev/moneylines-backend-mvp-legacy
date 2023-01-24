import { Controller, Get, Path, Post, Route } from 'tsoa';
import betService from '../services/bet.service';

@Route('bet')
export class BetController extends Controller {
  @Post()
  public async getBets() {
    const requests = await betService.getBets(null);
    return requests;
  }
  // @Get('{id}')
  // public async getRequest(@Path() id: number) {
  //   const request = await betService.getRequestById(id);
  //   return request;
  // }
}
