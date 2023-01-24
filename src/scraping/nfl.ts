import puppeteer from "puppeteer";
import { sleep } from "../utils/timeout";

export default class NFL {
    public url = 'https://www.actionnetwork.com/nfl/odds';
    
    public start = async () => {
        const browser = await puppeteer.launch({headless: false});
        const page = await browser.newPage();
        await page.setDefaultNavigationTimeout(60000);
        await page.goto(this.url, {waitUntil: 'networkidle2'});

        console.log(' === fetching start')
        await page.waitForNetworkIdle();
        console.log(' === fetching end')

        const matches: any[] = [];
        const dates: string[] = [];

        // const matchDateXpath = `//div[contains(@class, "best-odds__game-status")]/div`
        // const matchDateElements = await page.$x(matchDateXpath)

        // for await (const matchDateElement of matchDateElements) {
        //     const matchDate = await matchDateElement.evaluate((el: HTMLElement) => {
        //         return el.textContent?.trim()
        //     })
        //     dates.push(matchDate)
        // }

        const matchDataXpath = `//div[contains(@class, "best-odds__game-info")]//parent::td//parent::tr`;
        const matchElements = await page.$x(matchDataXpath)

        for await (const matchElement of matchElements) {
            const matchURL = await matchElement.evaluate((el: HTMLElement) => el.children[0].children[0].children[0].getAttribute('href') )
            console.log(matchURL)
            const matchId = matchURL.match(/[a-zA-Z0-9]*$/)[0]
            console.log(matchId)

            const homeTeam = await matchElement.evaluate((el: HTMLElement) => el.children[0].children[0].children[0].children[0].children[0].children[1].children[0].textContent?.trim());
            const awayTeam = await matchElement.evaluate((el: HTMLElement) => el.children[0].children[0].children[0].children[1].children[0].children[1].children[0].textContent?.trim());
            console.log(homeTeam, ' ', awayTeam)

            const homeOpenPoint = await matchElement.evaluate((el: HTMLElement) => el.children[1].children[0].children[0].children[0].textContent?.trim());
            const awayOpenPoint = await matchElement.evaluate((el: HTMLElement) => el.children[1].children[0].children[1].children[0].textContent?.trim());
            console.log(homeOpenPoint, ' ', awayOpenPoint);

            const homeBestOddsPoint = await matchElement.evaluate((el: HTMLElement) => el.children[2].children[0].children[0].children[0].children[0].textContent?.trim());
            const awayBestOddsPoint = await matchElement.evaluate((el: HTMLElement) => el.children[2].children[0].children[1].children[0].children[0].textContent?.trim());
            console.log(homeBestOddsPoint, ' ', awayBestOddsPoint)

            const homePointsbetPoint = await matchElement.evaluate((el: HTMLElement) => {
                const fStr = el.children[3].children[0].children[0].children[0].children[0].textContent?.trim();
                if (fStr && fStr !== 'N/A') {
                    return fStr
                } else {
                    return el.children[3].children[0].children[0].children[0].children[1].textContent?.trim();
                }
                
            });
            const awayPointsbetPoint = await matchElement.evaluate((el: HTMLElement) => {
                const fStr = el.children[3].children[0].children[1].children[0].children[0].textContent?.trim();
                if (fStr && fStr !== 'N/A') {
                    return fStr
                } else {
                    return el.children[3].children[0].children[1].children[0].children[1].textContent?.trim()
                }
            });
            console.log(homePointsbetPoint, ' ', awayPointsbetPoint)

            const homeBetMGMPoint = await matchElement.evaluate((el: HTMLElement) => {
                const fStr = el.children[4].children[0].children[0].children[0].children[0].textContent?.trim();
                const sStr = el.children[4].children[0].children[0].children[0].children[1].textContent?.trim()
                return fStr ? fStr : sStr
            });
            const awayBetMGMPoint = await matchElement.evaluate((el: HTMLElement) => {
                const fStr = el.children[4].children[0].children[1].children[0].children[0].textContent?.trim();
                const sStr = el.children[4].children[0].children[1].children[0].children[1].textContent?.trim()
                return fStr ? fStr : sStr
            });
            console.log(homeBetMGMPoint, ' ', awayBetMGMPoint)

            const homeCaesarPoint = await matchElement.evaluate((el: HTMLElement) => {
                const fStr = el.children[5].children[0].children[0].children[0].children[0].textContent?.trim();
                const sStr = el.children[5].children[0].children[0].children[0].children[1].textContent?.trim()
                return fStr ? fStr : sStr
            });
            const awayCaesarPoint = await matchElement.evaluate((el: HTMLElement) => {
                const fStr = el.children[5].children[0].children[1].children[0].children[0].textContent?.trim();
                const sStr = el.children[5].children[0].children[1].children[0].children[1].textContent?.trim()
                return fStr ? fStr : sStr
            });
            console.log(homeCaesarPoint, ' ', awayCaesarPoint)

            const homeFanduelPoint = await matchElement.evaluate((el: HTMLElement) => {
                const fStr = el.children[6].children[0].children[0].children[0].children[0].textContent?.trim();
                const sStr = el.children[6].children[0].children[0].children[0].children[1].textContent?.trim()
                return fStr ? fStr : sStr
            });
            const awayFanduelPoint = await matchElement.evaluate((el: HTMLElement) => {
                const fStr = el.children[6].children[0].children[1].children[0].children[0].textContent?.trim();
                const sStr = el.children[6].children[0].children[1].children[0].children[1].textContent?.trim()
                return fStr ? fStr : sStr
            });
            console.log(homeFanduelPoint, ' ', awayFanduelPoint)

            const homeDraftKingsPoint = await matchElement.evaluate((el: HTMLElement) => {
                const fStr = el.children[7].children[0].children[0].children[0].children[0].textContent?.trim();
                const sStr = el.children[7].children[0].children[0].children[0].children[1].textContent?.trim()
                return fStr ? fStr : sStr
            });
            const awayDraftKingsPoint = await matchElement.evaluate((el: HTMLElement) => {
                const fStr = el.children[7].children[0].children[1].children[0].children[0].textContent?.trim();
                const sStr = el.children[7].children[0].children[1].children[0].children[1].textContent?.trim()
                return fStr ? fStr : sStr
            });
            console.log(homeDraftKingsPoint, ' ', awayDraftKingsPoint)

            const homeBetRiversPoint = await matchElement.evaluate((el: HTMLElement) => {
                const fStr = el.children[8].children[0].children[0].children[0].children[0].textContent?.trim();
                const sStr = el.children[8].children[0].children[0].children[0].children[1].textContent?.trim()
                return fStr ? fStr : sStr
            });
            const awayBetRiversPoint = await matchElement.evaluate((el: HTMLElement) => {
                const fStr = el.children[8].children[0].children[1].children[0].children[0].textContent?.trim();
                const sStr = el.children[8].children[0].children[1].children[0].children[1].textContent?.trim()
                return fStr ? fStr : sStr
            });
            console.log(homeBetRiversPoint, ' ', awayBetRiversPoint)

            const homeUnibetPoint = await matchElement.evaluate((el: HTMLElement) => {
                const fStr = el.children[10].children[0].children[0].children[0].children[0].textContent?.trim();
                const sStr = el.children[10].children[0].children[0].children[0].children[1].textContent?.trim()
                return fStr ? fStr : sStr
            });
            const awayUnibetPoint = await matchElement.evaluate((el: HTMLElement) => {
                const fStr = el.children[10].children[0].children[1].children[0].children[0].textContent?.trim();
                const sStr = el.children[10].children[0].children[1].children[0].children[1].textContent?.trim()
                return fStr ? fStr : sStr
            });
            console.log(homeUnibetPoint, ' ', awayUnibetPoint)

            const homeBet365Point = await matchElement.evaluate((el: HTMLElement) => {
                const fStr = el.children[11].children[0].children[0].children[0].children[0].textContent?.trim();
                const sStr = el.children[11].children[0].children[0].children[0].children[1].textContent?.trim()
                return fStr ? fStr : sStr
            });
            const awayBet365Point = await matchElement.evaluate((el: HTMLElement) => {
                const fStr = el.children[11].children[0].children[1].children[0].children[0].textContent?.trim();
                const sStr = el.children[11].children[0].children[1].children[0].children[1].textContent?.trim()
                return fStr ? fStr : sStr
            });
            console.log(homeBet365Point, ' ', awayBet365Point)
        }
    }
}