
import Link from "next/link";

export default function AnalyticsLayout({children}: {children: React.ReactNode}) {
    return(
        <div>
            <div className="flex gap-2 mb-4">
               <nav>
                <Link className="hover:underline" href="/development">Development</Link>
               </nav>
            </div>
           
            {children}
        </div>
    )
}