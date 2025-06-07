import aj from "../config/arcjet.js";

const arcjetMiddleware = async(req,res,next) => {
    try{
        const descision = await aj.protect(req, {requested: 1});

        if (descision.isDenied()) {
            console.log("Arcjet Denial Reason:", descision.reason.code); // Log actual reason
            if (descision.reason.isRateLimit()) {
                return res.status(429).json({ error: "Rate limit exceeded" });
            }
            if (descision.reason.isBot()) {
                return res.status(403).json({ error: "Bot detected" });
            }
            return res.status(403).json({ error: "Access denied", reason: descision.reason.code });
        }
        

        next();
    }
    catch(err){
        console.log(`Arcjet Error: ${err}`)
        next();
    }
}

export default arcjetMiddleware;