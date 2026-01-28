import { Button } from "@/components/ui/button";
import { blogsservice } from "@/services/blog.service";
import Link from "next/link";

interface Blog {
  id: string;
  title: string;
  content: string;
}

export default async function Home() {

const {data} = await blogsservice.getblogPosts({},
{
  cache:"no-store"

});
console.log(data)
  
  return (
    <div className="">
      {
        data?.data?.map((blog: Blog)=>(
          <div key={blog.id} className="p-4 border-b">
            <h2 className="text-2xl font-bold mb-2">{blog.title}</h2>
            <p className="mb-4">{blog.content}</p>
            <Link href={`/blogs/${blog.id}`} className="text-blue-500">Read More</Link>
          </div>
        ))
      }
    </div>
  );
}
