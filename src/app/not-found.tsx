import Link from "next/link";


export default function NotFound() {
  return (
    <div className="">
        <h2>Not found</h2>
        <h5>Could not find the requested page.</h5>
        <Link href="/">Go to Home Page</Link>
      
    </div>
  );
}
