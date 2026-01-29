import { Button } from "@/components/ui/button";
import { blogsservice } from "@/services/blog.service";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface Blog {
  id: string;
  title: string;
  content: string;
}

export default async function Home() {

const {data, error} = await blogsservice.getblogPosts({},
{
  cache:"no-store"

});
console.log("Blog data:", data)
console.log("Blog error:", error)

if (error) {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold text-red-500">Error loading posts</h1>
      <p>{String(error)}</p>
    </div>
  );
}

if (!data?.data || data.data.length === 0) {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">No Blog Posts Found</h1>
      <p className="text-muted-foreground">There are no blog posts to display yet.</p>
    </div>
  );
}
  
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Blog Posts</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {
          data?.data?.map((blog: Blog)=>(
            <Card key={blog.id}>
              <CardHeader>
                <CardTitle>{blog.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="line-clamp-3 mb-4">{blog.content}</CardDescription>
                <Link href={`/blogs/${blog.id}`}>
                  <Button variant="outline" size="sm">Read More</Button>
                </Link>
              </CardContent>
            </Card>
          ))
        }
      </div>
    </div>
  );
}
