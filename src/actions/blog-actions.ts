"use server"

import { cookies } from "next/headers";
import { env } from "@/env";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createBlog(formData: FormData) {
    
        const title = formData.get("title") as string;
        const contents = formData.get("contents") as string;
        const tags = formData.get("tags") as string;    
        
        // Validate required fields
        if (!title || !title.trim()) {
            throw new Error("Title is required");
        }
        if (!contents || !contents.trim()) {
            throw new Error("Content is required");
        }
        
        const blogdata = {
            title: title.trim(),
            content: contents.trim(),
            tags:tags?.split(",").map(tag => tag.trim()).filter(tag => tag.length > 0) || [],
        };
    console.log("Creating blog:", JSON.stringify(blogdata))
    
    const cookieStore = await cookies()
    
    try {
        const res = await fetch(`${env.NEXT_URL}/posts`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Cookie: cookieStore.toString()
            },
            body: JSON.stringify(blogdata),
        });

        console.log("Response status:", res.status)
        const responseData = await res.text()
        console.log("Response data:", responseData)

        if (res.ok) {
            console.log("Blog created successfully!")
            // Revalidate both the create-blog page and home page
            revalidatePath("/dashboard/create-blog", "page");
            revalidatePath("/", "page");
            // Stay on the same page and show success
            redirect("/dashboard/create-blog?success=true")
        } else {
            console.error("Failed to create blog. Status:", res.status, "Response:", responseData)
            throw new Error(`Failed to create blog post: ${responseData}`)
        }
    } catch (error) {
        console.error("Error creating blog:", error)
        throw error
    }

}