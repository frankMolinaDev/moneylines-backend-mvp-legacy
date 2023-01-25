import { Controller, Get, Path, Post, Route } from 'tsoa';
import proReportService from '../services/pro_report.service';

@Route('pro_report')
export class ProReportController extends Controller {
  @Post()
  public async getProReports() {
    const requests = await proReportService.getReports(null);
    return requests;
  }
}
