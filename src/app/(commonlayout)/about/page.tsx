export const dynamic = 'force-dynamic';

export default async function AboutPage(){
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    return (
        <div>
            About Page
        </div>
    );
}