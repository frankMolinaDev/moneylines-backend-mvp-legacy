import puppeteer from "puppeteer";
import { sleep } from "../../utils/timeout";
import proReportService from '../../services/pro_report.service'

export default class NHL {
    public url = 'https://www.actionnetwork.com/nhl/sharp-report';
    
    public start = async () => {
        console.log('--- NHL START ---')
        const browser = await puppeteer.launch({headless: true})
        const page = await browser.newPage();
        let i = 0;
        while(i < 5) {
            try {
                await page.setDefaultNavigationTimeout(120000);
                await page.goto(this.url, {waitUntil: 'networkidle2'});
                await page.waitForNetworkIdle();
                break;
            } catch (error) {
                i++;
            }
        }        

        for await (const i of [1, 2, 3, 4, 5, 6, 7]) {
            console.log(' ==== ', i)
            await page.select('div.odds-tools-sub-nav__primary-filters-container > div > div:nth-child(2)> select', 'total');
            await sleep(3000)

            let betDateXpath = '//span[@class="day-nav__display"]'
            const [betDateElement] = await page.$x(betDateXpath)
            const betDate = await betDateElement.evaluate((el: HTMLElement) => el.textContent?.trim());

            const matchDataXpath = `//div[contains(@class, "sharp-report__game-info")]//parent::td//parent::tr`;
            const matchElements = await page.$x(matchDataXpath)

            for await (const matchElement of matchElements) {
                const matchURL = await matchElement.evaluate((el: HTMLElement) => el.children[0].children[0].children[1].getAttribute('href') )
                const matchDetailURL = 'https://www.actionnetwork.com' + matchURL;
                const detailPage = await browser.newPage();
                await detailPage.setDefaultNavigationTimeout(60000);
                await detailPage.goto(matchDetailURL, {waitUntil: 'networkidle2'});
                const matchDateXpath = '//div[contains(@class, "game-odds__date-container")]/span';
                const [matchDateElement] = await detailPage.$x(matchDateXpath);
                const matchDate = matchDateElement ? await matchDateElement.evaluate((el: HTMLElement) => el.textContent?.trim()) : '';

                await detailPage.close();
                
                const matchId = matchURL.match(/[a-zA-Z0-9]*$/)[0]

                const homeTeam = await matchElement.evaluate((el: HTMLElement) => el.children[0].children[0].children[1].children[0].children[0].children[1].children[0].textContent?.trim());
                const awayTeam = await matchElement.evaluate((el: HTMLElement) => el.children[0].children[0].children[1].children[1].children[0].children[1].children[0].textContent?.trim());

                const homeOpenPoint = await matchElement.evaluate((el: HTMLElement) => {
                    return el.children[1].children[0].children[0]? el.children[1].children[0].children[0].textContent?.trim(): '';
                });
                const awayOpenPoint = await matchElement.evaluate((el: HTMLElement) => {
                    return el.children[1].children[0].children[1] ? el.children[1].children[0].children[1].textContent?.trim(): '';
                });
                if (homeOpenPoint === '' || awayOpenPoint === '') break;

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

                const homeBetsPoint = await matchElement.evaluate((el: HTMLElement) => {
                    const str = el.children[8].children[0].children[0].textContent?.trim()
                    if (str === 'N/A') {
                        return '';
                    } else {
                        return str
                    }
                })

                const awayBetsPoint = await matchElement.evaluate((el: HTMLElement) => {
                    const str = el.children[8].children[0].children[1].textContent?.trim()
                    if (str === 'N/A') {
                        return '';
                    } else {
                        return str
                    }
                })

                const betData = [
                    {
                        team: homeTeam,
                        open: homeOpenPoint,
                        best_odd: homeBestOddsPoint,
                        bets: homeBetsPoint
                    },
                    {
                        team: awayTeam,
                        open: awayOpenPoint,
                        best_odd: awayBestOddsPoint,
                        bets: awayBetsPoint
                    },
                ]

                await sleep(3000);

                await proReportService.updateProReport({
                    sportName: 'NHL',
                    matchId,
                    matchDate,
                    betDate,
                    bet: JSON.stringify(betData)
                })
            }
            const nextElement = await page.$('button[aria-label="Next Date"]');
            if (nextElement) {
                await page.click('button[aria-label="Next Date"]');
                await page.waitForNetworkIdle();
            } else {
                break;
            }
            await sleep(3000);
        }

        console.log('--- NHL END ---')

        await browser.close();
    }
}