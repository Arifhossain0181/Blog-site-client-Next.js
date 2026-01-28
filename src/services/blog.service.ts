import { env } from "@/env";
import { object } from "better-auth";

const BLOG_API_URL = env.NEXT_URL;
//no Dynamic and no{ cache:no-store} :ssg static Page
// {catch:no-store}:ssr ->dynamic page
// next :{revalidate:10}:isr ->static and dynamic page with revalidation
interface serviceOPtions{
    cache?:RequestCache,
    revalidate?:number
}
interface getblogPostsParams {
  isFeatured?: boolean;
  search?: string;
}
export const blogsservice = {
  getblogPosts: async function (params: getblogPostsParams , options?: serviceOPtions) {
    try {
      const url = new URL(`${BLOG_API_URL}/posts`);
      if (params) {
        Object.entries(params).forEach(([key, value]) => {
          if (value !== undefined && value !== null && value !== "") {
            url.searchParams.append(key, String(value));
          }
        });
      }
      console.log(url.toString());
      const config : RequestInit = {}
        if(options?.cache){
            config.cache = options.cache
        }
        if(options?.revalidate){
            
            config.next = { revalidate: options.revalidate }
        }
      const res = await fetch(url.toString(), config);
      const data = await res.json();
      return { data, error: null };
    } catch (err) {
      console.log("Error fetching blog posts:", err);
      return { data: null, error: err };
    }
  },
};
