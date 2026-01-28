import { blogsservice } from "@/services/blog.service";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { notFound } from "next/navigation";


//[{id:sdfdfdf} ,{id:sdfdfdf}]
export async function generateStaticParams() {
    const {data} = await blogsservice.getblogPosts({

    })
    return data?.data?.map((blog:Blog)=>({id:blog.id})).splice(0,10); //generate only 10 static pages
}


interface Blog {
  id: string;
  title: string;
  content: string;
  author?: string;
  createdAt?: string;
  category?: string;
  image?: string;
  tags?: string[];
}

export default async function BlogPage({params}:{params:Promise<{id:string}>}) {
    const {id} = await params;
    const {data: blog, error} = await blogsservice.getBlogBYid(id);
    
    if (error || !blog) {
      notFound();
    }

    return (
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Back Button */}
        <Link href="/">
          <Button variant="ghost" className="mb-6">
            ← Back to Blogs
          </Button>
        </Link>

        {/* Blog Card */}
        <Card className="shadow-lg">
          {/* Featured Image */}
          {blog.image && (
            <div className="w-full h-64 md:h-96 overflow-hidden rounded-t-lg">
              <img 
                src={blog.image} 
                alt={blog.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          <CardHeader className="space-y-4">
            {/* Category Badge */}
            {blog.category && (
              <div className="flex gap-2">
                <span className="px-3 py-1 bg-primary/10 text-primary text-sm font-medium rounded-full">
                  {blog.category}
                </span>
              </div>
            )}

            {/* Title */}
            <CardTitle className="text-3xl md:text-4xl font-bold leading-tight">
              {blog.title}
            </CardTitle>
            
            {/* Tags */}
            {blog.tags && blog.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {blog.tags.map((tag: string, index: number) => (
                  <span 
                    key={index}
                    className="px-3 py-1 bg-secondary text-secondary-foreground text-sm font-medium rounded-md hover:bg-secondary/80 transition-colors"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}

            {/* Metadata */}
            <CardDescription className="flex flex-wrap gap-4 text-base">
              {blog.author && (
                <span className="flex items-center gap-2">
                  
                  {blog.author}
                </span>
              )}
              {blog.createdAt && (
                <span className="flex items-center gap-2">
                  
                  {new Date(blog.createdAt).toLocaleDateString('en-US', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </span>
              )}
            </CardDescription>
          </CardHeader>

          <Separator className="mx-6" />

          <CardContent className="pt-6">
            {/* Blog Content */}
            <div className="prose prose-lg max-w-none dark:prose-invert">
              <p className="text-lg leading-relaxed whitespace-pre-wrap">
                {blog.content}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4 mt-8 pt-6 border-t">
              <Button variant="default" size="lg">
                Share Article
              </Button>
              <Button variant="outline" size="lg">
                Save for Later
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Related or Additional Section */}
        <div className="mt-8 p-6 bg-muted rounded-lg">
          <h3 className="text-xl font-semibold mb-3">About this Post</h3>
          <p className="text-muted-foreground">
            This blog post is part of our collection. Explore more articles on our <Link href="/" className="text-primary hover:underline">homepage</Link>.
          </p>
        </div>
      </div>
    );
}