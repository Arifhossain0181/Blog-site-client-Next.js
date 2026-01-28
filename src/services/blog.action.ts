
"use server";

import { blogsservice } from "./blog.service"


export const getBLogs = async () => {
    return await blogsservice.getblogPosts({});
}