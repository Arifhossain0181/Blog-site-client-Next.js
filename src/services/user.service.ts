import { env } from "@/env";

import { cookies } from "next/headers";


const AUTH_API_URL = env.NEXT_AUTH_URL


export const userService = {
  getSession: async function () {
    try {
      const cookiesStore = await cookies();
      console.log("Cookies:", cookiesStore.toString());

      const res = await fetch(`${AUTH_API_URL}/get-session`, {
        headers: {
          Cookie: cookiesStore.toString(),
        },
        cache: "no-store",
      });

      console.log("Response status:", res.status);

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const session = await res.json();
      console.log("Session response:", session);

      if (!session || !session.session) {
        console.log("No session data found in response");
        throw new Error("No active session");
      }
      return { data: session, error: null };
    } catch (err) {
      console.log("Error fetching session:", err);
      return { data: null, error: err };
    }
  },
};
