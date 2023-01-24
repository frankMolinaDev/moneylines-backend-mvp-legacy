import NFL from "./nfl"

const nfl= new NFL();
export async function startScraping() {
    console.log('nfl start')
    await nfl.start();
    console.log('nfl stop')
}