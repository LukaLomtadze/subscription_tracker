import arcjet, { shield, detectBot, tokenBucket } from "@arcjet/node";
import { ARCJET_KEY,  NODE_ENV} from "./env.js";

const isDev = NODE_ENV === "development";

const aj = arcjet({
    key: ARCJET_KEY,
    characteristics: ["ip.src"], 
   
    rules: [
        shield({ mode: "LIVE" }),
        ...(isDev ? [] : [detectBot({ mode: "LIVE", allow: ["CATEGORY:SEARCH_ENGINE"] })]),
        tokenBucket({ mode: "LIVE", refillRate: 5, interval: 20, capacity: 5 }),
    ]
});

export default aj;