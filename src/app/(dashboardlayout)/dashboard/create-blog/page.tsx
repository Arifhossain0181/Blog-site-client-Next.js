import { Separator } from "@/components/ui/separator";
import CreateBlogFromServer from "@/components/modules/authentication/user/createBlog/create-blog-from-server";
import { blogsservice } from "@/services/blog.service";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

// Force dynamic rendering to ensure fresh data
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function CreateBlogPage({
  searchParams,
}: {
  searchParams: { success?: string };
}) {
  // Force fresh data on every render by using timestamp
  const { data } = await blogsservice.getblogPosts({}, { cache: "no-store" });
  console.log("Blog data in create page:", data);
  console.log("Total posts fetched:", data?.data?.length);

  const totalPosts = data?.data?.length || 0;
  const showSuccess = searchParams.success === "true";

  return (
    <div className="p-4 space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Create New Blog Post</h1>
        <p className="text-muted-foreground">
          You have created {totalPosts} blog post{totalPosts !== 1 ? "s" : ""}{" "}
          so far
        </p>
        {showSuccess && (
          <div className="mt-4 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
            <p className="text-green-800 dark:text-green-200 font-semibold">
              ✓ Blog post created successfully!
            </p>
          </div>
        )}
      </div>

      <Separator />

      <div className="grid md:grid-cols-2 gap-6">
        {/* Create Blog Form */}
        <div>
          <CreateBlogFromServer />
        </div>

        {/* Existing Posts List */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Your Blog Posts ({totalPosts})</CardTitle>
              <CardDescription>Recently created posts</CardDescription>
            </CardHeader>
            <CardContent>
              {totalPosts === 0 ? (
                <p className="text-sm text-muted-foreground">
                  No blog posts yet. Create your first one!
                </p>
              ) : (
                <div className="space-y-3 max-h-[600px] overflow-y-auto">
                  {data.data.map((item :any) => (
                    <div
                      key={item.id}
                      className="p-3 border rounded-lg hover:bg-accent transition-colors"
                    >
                      <h3 className="font-semibold text-sm mb-1">
                        {item.title}
                      </h3>
                      <p className="text-xs text-muted-foreground line-clamp-2">
                        {item.content}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
