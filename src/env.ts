import { createEnv } from "@t3-oss/env-nextjs"; // or core package
import { z } from "zod";

export const env = createEnv({
    server:{
       BACKEND_URL:z.url() ,
         FRONTEND_URL:z.url(),
            NEXT_URL:z.url(),
            NEXT_AUTH_URL:z.url(),
    },

   // client: {},

    runtimeEnv:{
        BACKEND_URL:process.env.BACKEND_URL,
        FRONTEND_URL:process.env.FRONTEND_URL,
        NEXT_URL:process.env.NEXT_URL,
        NEXT_AUTH_URL:process.env.NEXT_AUTH_URL,
    }
})