import puppeteer from "puppeteer";
import { sleep } from "../utils/timeout";
import betService from '../services/bet.service'

export default class NFL {
    public url = 'https://www.actionnetwork.com/nfl/odds';
    
    public start = async () => {
        console.log('--- NFL START ---')
        const browser = await puppeteer.launch({headless: false});
        const page = await browser.newPage();
        await page.setDefaultNavigationTimeout(60000);
        await page.goto(this.url, {waitUntil: 'networkidle2'});

        console.log(' === fetching start')
        await page.waitForNetworkIdle();

        await page.select('div.odds-tools-sub-nav__primary-filters-container > div > div:nth-child(2)> select', 'total');
        await sleep(3000)

        const matchDataXpath = `//div[contains(@class, "best-odds__game-info")]//parent::td//parent::tr`;
        const matchElements = await page.$x(matchDataXpath)

        for await (const matchElement of matchElements) {
            const matchURL = await matchElement.evaluate((el: HTMLElement) => el.children[0].children[0].children[0].getAttribute('href') )
            const matchDetailURL = 'https://www.actionnetwork.com' + matchURL;
            const detailPage = await browser.newPage();
            await detailPage.setDefaultNavigationTimeout(60000);
            await detailPage.goto(matchDetailURL, {waitUntil: 'networkidle2'});
            const matchDateXpath = '//div[contains(@class, "game-odds__date-container")]/span';
            const [matchDateElement] = await detailPage.$x(matchDateXpath);
            const matchDate = matchDateElement ? await matchDateElement.evaluate((el: HTMLElement) => el.textContent?.trim()) : '';
            console.log(matchDate)
            await detailPage.close();
            
            const matchId = matchURL.match(/[a-zA-Z0-9]*$/)[0]
            console.log(matchId)

            const homeTeam = await matchElement.evaluate((el: HTMLElement) => el.children[0].children[0].children[0].children[0].children[0].children[1].children[0].textContent?.trim());
            const awayTeam = await matchElement.evaluate((el: HTMLElement) => el.children[0].children[0].children[0].children[1].children[0].children[1].children[0].textContent?.trim());
            console.log(homeTeam, ' ', awayTeam)

            const homeOpenPoint = await matchElement.evaluate((el: HTMLElement) => {
                return el.children[1].children[0].children[0].children[0] ? el.children[1].children[0].children[0].children[0].textContent?.trim(): '';
            });
            const awayOpenPoint = await matchElement.evaluate((el: HTMLElement) => {
                return el.children[1].children[0].children[1] ? el.children[1].children[0].children[1].children[0].textContent?.trim(): '';
            });
            console.log('openpoint = ', homeOpenPoint, ' ', awayOpenPoint)

            const homeBestOddsPoint = await matchElement.evaluate((el: HTMLElement) => {
                const str = el.children[2].children[0].children[0].children[0].children[0].textContent?.trim();
                if (str === 'N/A') {
                    return ''
                } else {
                    return str;
                }
            });
            const awayBestOddsPoint = await matchElement.evaluate((el: HTMLElement) => {
                const str = el.children[2].children[0].children[1].children[0].children[0].textContent?.trim();
                if (str === 'N/A') {
                    return '';
                } else {
                    return str
                }
            });
            console.log('betodd = ', homeBestOddsPoint, ' ', awayBestOddsPoint)

            const homePointsbetPoint = await matchElement.evaluate((el: HTMLElement) => {
                const fStr = el.children[3].children[0].children[0].children[0].children[0].textContent?.trim();
                if (fStr && fStr !== 'N/A') {
                    return fStr
                } else if (fStr === 'N/A') {
                    return '';
                } else {
                    return el.children[3].children[0].children[0].children[0].children[1].textContent?.trim();
                }
                
            });
            const awayPointsbetPoint = await matchElement.evaluate((el: HTMLElement) => {
                const fStr = el.children[3].children[0].children[1].children[0].children[0].textContent?.trim();
                if (fStr && fStr !== 'N/A') {
                    return fStr
                } else if (fStr === 'N/A') {
                    return '';
                }else {
                    return el.children[3].children[0].children[1].children[0].children[1].textContent?.trim()
                }
            });
            console.log(homePointsbetPoint, ' ', awayPointsbetPoint)

            const homeBetMGMPoint = await matchElement.evaluate((el: HTMLElement) => {
                const fStr = el.children[4].children[0].children[0].children[0].children[0].textContent?.trim();
                if (fStr && fStr !== 'N/A') {
                    return fStr
                } else if (fStr === 'N/A') {
                    return '';
                }else {
                    return el.children[4].children[0].children[0].children[0].children[1].textContent?.trim();
                }
            });
            const awayBetMGMPoint = await matchElement.evaluate((el: HTMLElement) => {
                const fStr = el.children[4].children[0].children[1].children[0].children[0].textContent?.trim();                
                if (fStr && fStr !== 'N/A') {
                    return fStr
                } else if (fStr === 'N/A') {
                    return '';
                }else {
                    return el.children[4].children[0].children[1].children[0].children[1].textContent?.trim()
                }
            });
            console.log(homeBetMGMPoint, ' ', awayBetMGMPoint)

            const homeCaesarPoint = await matchElement.evaluate((el: HTMLElement) => {
                const fStr = el.children[5].children[0].children[0].children[0].children[0].textContent?.trim();
                if (fStr && fStr !== 'N/A') {
                    return fStr
                } else if (fStr === 'N/A') {
                    return '';
                }else {
                    return el.children[5].children[0].children[0].children[0].children[1].textContent?.trim()
                }
            });
            const awayCaesarPoint = await matchElement.evaluate((el: HTMLElement) => {
                const fStr = el.children[5].children[0].children[1].children[0].children[0].textContent?.trim();
                if (fStr && fStr !== 'N/A') {
                    return fStr
                } else if (fStr === 'N/A') {
                    return '';
                }else {
                    return el.children[5].children[0].children[1].children[0].children[1].textContent?.trim()
                }
            });
            console.log(homeCaesarPoint, ' ', awayCaesarPoint)

            const homeFanduelPoint = await matchElement.evaluate((el: HTMLElement) => {
                const fStr = el.children[6].children[0].children[0].children[0].children[0].textContent?.trim();
                if (fStr && fStr !== 'N/A') {
                    return fStr
                } else if (fStr === 'N/A') {
                    return '';
                }else {
                    return el.children[6].children[0].children[0].children[0].children[1].textContent?.trim()
                }
            });
            const awayFanduelPoint = await matchElement.evaluate((el: HTMLElement) => {
                const fStr = el.children[6].children[0].children[1].children[0].children[0].textContent?.trim();
                if (fStr && fStr !== 'N/A') {
                    return fStr
                } else if (fStr === 'N/A') {
                    return '';
                }else {
                    return el.children[6].children[0].children[1].children[0].children[1].textContent?.trim()
                }
            });
            console.log(homeFanduelPoint, ' ', awayFanduelPoint)

            const homeDraftKingsPoint = await matchElement.evaluate((el: HTMLElement) => {
                const fStr = el.children[7].children[0].children[0].children[0].children[0].textContent?.trim();
                if (fStr && fStr !== 'N/A') {
                    return fStr
                } else if (fStr === 'N/A') {
                    return '';
                }else {
                    return el.children[7].children[0].children[0].children[0].children[1].textContent?.trim()
                }
            });
            const awayDraftKingsPoint = await matchElement.evaluate((el: HTMLElement) => {
                const fStr = el.children[7].children[0].children[1].children[0].children[0].textContent?.trim();
                if (fStr && fStr !== 'N/A') {
                    return fStr
                } else if (fStr === 'N/A') {
                    return '';
                }else {
                    return el.children[7].children[0].children[1].children[0].children[1].textContent?.trim()
                }
            });
            console.log(homeDraftKingsPoint, ' ', awayDraftKingsPoint)

            const homeBetRiversPoint = await matchElement.evaluate((el: HTMLElement) => {
                const fStr = el.children[8].children[0].children[0].children[0].children[0].textContent?.trim();
                if (fStr && fStr !== 'N/A') {
                    return fStr
                } else if (fStr === 'N/A') {
                    return '';
                }else {
                    return el.children[8].children[0].children[0].children[0].children[1].textContent?.trim()
                }
            });
            const awayBetRiversPoint = await matchElement.evaluate((el: HTMLElement) => {
                const fStr = el.children[8].children[0].children[1].children[0].children[0].textContent?.trim();
                if (fStr && fStr !== 'N/A') {
                    return fStr
                } else if (fStr === 'N/A') {
                    return '';
                }else {
                    return el.children[8].children[0].children[1].children[0].children[1].textContent?.trim()
                }
            });
            console.log(homeBetRiversPoint, ' ', awayBetRiversPoint)

            const homeUnibetPoint = await matchElement.evaluate((el: HTMLElement) => {
                const fStr = el.children[10].children[0].children[0].children[0].children[0].textContent?.trim();
                if (fStr && fStr !== 'N/A') {
                    return fStr
                } else if (fStr === 'N/A') {
                    return '';
                }else {
                    return el.children[10].children[0].children[0].children[0].children[1].textContent?.trim()
                }
            });
            const awayUnibetPoint = await matchElement.evaluate((el: HTMLElement) => {
                const fStr = el.children[10].children[0].children[1].children[0].children[0].textContent?.trim();
                if (fStr && fStr !== 'N/A') {
                    return fStr
                } else if (fStr === 'N/A') {
                    return '';
                }else {
                    return el.children[10].children[0].children[1].children[0].children[1].textContent?.trim()
                }
            });
            console.log(homeUnibetPoint, ' ', awayUnibetPoint)

            const homeBet365Point = await matchElement.evaluate((el: HTMLElement) => {
                const fStr = el.children[11].children[0].children[0].children[0].children[0].textContent?.trim();
                if (fStr && fStr !== 'N/A') {
                    return fStr
                } else if (fStr === 'N/A') {
                    return '';
                }else {
                    return el.children[11].children[0].children[0].children[0].children[1].textContent?.trim()
                }
            });
            const awayBet365Point = await matchElement.evaluate((el: HTMLElement) => {
                const fStr = el.children[11].children[0].children[1].children[0].children[0].textContent?.trim();
                if (fStr && fStr !== 'N/A') {
                    return fStr
                } else if (fStr === 'N/A') {
                    return '';
                }else {
                    return el.children[11].children[0].children[1].children[0].children[1].textContent?.trim()
                }
            });
            console.log(homeBet365Point, ' ', awayBet365Point)

            const betData = [
                {
                    team: homeTeam,
                    open: homeOpenPoint,
                    best_odd: homeBestOddsPoint,
                    points_bet: homePointsbetPoint,
                    bet_mgm: homeBetMGMPoint,
                    caesar: homeCaesarPoint,
                    fanduel: homeFanduelPoint,
                    draft_kings: homeDraftKingsPoint,
                    bet_rivers: homeBetRiversPoint,
                    unibet: homeUnibetPoint,
                    bet365: homeBet365Point,
                },
                {
                    team: awayTeam,
                    open: awayOpenPoint,
                    best_odd: awayBestOddsPoint,
                    points_bet: awayPointsbetPoint,
                    bet_mgm: awayBetMGMPoint,
                    caesar: awayCaesarPoint,
                    fanduel: awayFanduelPoint,
                    draft_kings: awayDraftKingsPoint,
                    bet_rivers: awayBetRiversPoint,
                    unibet: awayUnibetPoint,
                    bet365: awayBet365Point,
                },
            ]

            await sleep(3000);

            await betService.updateBet({
                sportName: 'NFL',
                matchId,
                matchDate,
                betDate: '',
                betData: JSON.stringify(betData)
            })
        }

        console.log(' === fetching end')
        console.log('--- NFL END ---')
        
        await browser.close();
    }
}