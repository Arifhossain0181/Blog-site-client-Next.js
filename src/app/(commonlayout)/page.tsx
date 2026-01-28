import { Button } from "@/components/ui/button";
import { blogsservice } from "@/services/blog.service";
import { userService } from "@/services/user.service";


export default async function Home() {

const {data} = await blogsservice.getblogPosts({
  isFeatured:true,
 
}
,{
  cache:"no-store"

});
console.log(data)
  
  return (
    <div className="">
      {
        data?.data?.map((blog:any)=>(
          <div key={blog.id} className="p-4 border-b">
            <h2 className="text-2xl font-bold mb-2">{blog.title}</h2>
            <p className="mb-4">{blog.content}</p>
            <Button variant="primary">Read More</Button>
          </div>
        ))
      }
    </div>
  );
}
