import { Button } from "@/components/ui/button";
import HeroSection from "@/components/hero";
import { features } from "@/data/features";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle,CardAction } from "@/components/ui/card"; 

export default function Home() {
  return(
   <div>
       <div className="grid-background">
        <HeroSection />

        <section className="w-full py-12 md:py-24 lg:py-32 bg-background">
           <div className="container mx-auto px-4 md:px-6">
              <h2 className="text-3xl font-bold tracking-tighter text-center md-12">PowerFull Features for Your Career Growth</h2>
              <div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto"
              >{features.map((features,index)=>{
                return(
              <Card key={index}>
                   
                   <CardContent>
                       <div>
                         {features.icon}
                         <h3>{features.title}</h3>
                         <p>{features.description}</p>
                       </div>
                   </CardContent>
                  
             </Card> 
                )
              })}</div>
           </div>
        </section>

       </div>
    </div>
  )
}
