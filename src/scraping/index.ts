import NFL from "./nfl"
import NCAAF from "./ncaaf";
import NBA from "./nba";
import NCAAB from "./ncaab";
import NHL from "./nhl";
import SOCCER from "./soccer";
import WNBA from "./wnba";
import UFC from "./ufc";
import NASCAR from "./nascar";
import ATP from "./atp";
import WTA from "./wta";
import { sleep } from "../utils/timeout";

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

export async function startScraping() {
    while (true) {
        console.log('------------------------------------- scraping started -------------------------------------')
        await nfl.start();
        await ncaaf.start();
        await nba.start();
        await ncaab.start();
        await nhl.start();
        await soccer.start();
        await wnba.start();
        await ufc.start();
        await nascar.start();
        await atp.start();
        await wta.start();
        console.log('------------------------------------- scraping ended -------------------------------------')

        await sleep(600000) // delay for 10 minutes
    }
}