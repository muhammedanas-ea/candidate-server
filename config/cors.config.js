import ENV from "../utils/lib/env.config.js";

const corsOptions = {
  origin: ENV.ALLOWED_ORIGINS,
  credentials: true,
  exposedHeaders: ['Set-Cookie']
};


export { corsOptions };
