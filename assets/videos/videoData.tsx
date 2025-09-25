import { videoHappy } from "./alegre/happyData";
import { videoNeutral } from "./neutro/neutralData";
import { videoAngry } from "./raiva/angryData";
import { videoSurprise } from "./surpresa/surpriseData";
import { videoSad } from "./tristeza/sadData";

 export const videosByEmotion = {
    happy: videoHappy,
    sad: videoSad,
    angry: videoAngry,
    neutral: videoNeutral,
    surprise: videoSurprise,
 }