"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";

import { Textarea } from "@/components/ui/textarea";
import { createBlog } from "@/actions/blog-actions";

export default function CreateBlogFromServer() {

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Create Blog</CardTitle>
          <CardDescription>
            You can create a new blog post here.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form id="blog-form" action={createBlog}>
            {/* Form fields for blog creation */}
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1" htmlFor="title">
                Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="title"
                name="title"
                required
                minLength={3}
                className="w-full border border-gray-300 rounded-md p-2"
                placeholder="Enter blog title"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1" htmlFor="contents">
                Contents <span className="text-red-500">*</span>
              </label>
              <Textarea 
                id="contents" 
                name="contents" 
                required
                minLength={10}
                className="w-full border border-gray-300 rounded-md p-2" 
                placeholder="Enter blog contents"
              />
                
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1" htmlFor="tags">
                Tags
              </label>
              <input
                type="text"
                id="tags"
                name="tags"
                className="w-full border border-gray-300 rounded-md p-2"
                placeholder="Enter blog tags (comma separated)"
              />
            </div>
          </form>
          <CardFooter>
            <Button form="blog-form" type="submit" className="w-full">Create Blog Post</Button>
          </CardFooter>
        </CardContent>
      </Card>
    </div>
  );
}
