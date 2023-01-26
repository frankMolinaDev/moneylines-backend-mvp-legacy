import { Controller, Get, Path, Post, Route, Query } from 'tsoa';
import proReportService from '../services/pro_report.service';

@Route('pro_report')
export class ProReportController extends Controller {
  @Get()
  public async getProReports(@Query() options: any) {
    const requests = await proReportService.getReports(null);
    return requests;
  }
}
