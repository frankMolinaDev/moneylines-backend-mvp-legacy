import NFL from "./odd/nfl"
import NCAAF from "./odd/ncaaf";
import NBA from "./odd/nba";
import NCAAB from "./odd/ncaab";
import NHL from "./odd/nhl";
import SOCCER from "./odd/soccer";
import WNBA from "./odd/wnba";
import UFC from "./odd/ufc";
import NASCAR from "./odd/nascar";
import ATP from "./odd/atp";
import WTA from "./odd/wta";
import ProReportNFL from './pro_report/nfl';
import ProReportNBA from './pro_report/nba'
import ProReportNCAAB from './pro_report/ncaab'
import ProReportNHL from './pro_report/nhl'
import { sleep } from "../utils/timeout";

import Scraper from "./scraper";

const nfl= new NFL();
const ncaaf = new NCAAF();
const nba = new NBA();
const ncaab = new NCAAB();
const nhl = new NHL();
const soccer = new SOCCER();
const wnba = new WNBA();
const ufc = new UFC();
const nascar = new NASCAR();
const atp = new ATP();
const wta = new WTA();

const proReportNfl = new ProReportNFL();
const proReportNba = new ProReportNBA();
const proReportNcaab = new ProReportNCAAB();
const proReportNhl = new ProReportNHL();

const scraper = new Scraper();

export async function startScraping() {
    // while (true) {
    //     try {
    //         console.log('------------------------------------- scraping started -------------------------------------')
    //         await nfl.start();
    //         await ncaaf.start();
    //         await nba.start();
    //         await ncaab.start();
    //         await nhl.start();
            // await soccer.start();
    //         await wnba.start();
    //         await ufc.start();
    //         await nascar.start();
    //         await atp.start();
    //         await wta.start();
    
    //         await proReportNfl.start();
    //         await proReportNba.start();
    //         await proReportNcaab.start();
    //         await proReportNhl.start();
    //         console.log('------------------------------------- scraping ended -------------------------------------')
    //     } catch (error) {
    //         console.log('error = ', error)
    //     }

    //     await sleep(600000) // delay for 10 minutes
    // }
    await scraper.start();
}