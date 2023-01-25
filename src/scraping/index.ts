import NFL from "./nfl"

const nfl= new NFL();
export async function startScraping() {
    await nfl.start();
}