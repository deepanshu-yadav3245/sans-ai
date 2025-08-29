import { Button } from "@/components/ui/button";
import HeroSection from "@/components/hero";
import { features } from "@/data/features";

export default function Home() {
  return(
   <div>
       <div className="grid-background">
        <HeroSection />

        <section>
           <div>
              <h2>PowerFull Features for Your Career Growth</h2>
              <div>{features.map((features,index)=>{
                return(
                  <Card>
                    <CardHeader>
                        <CardTitle>Card Title</CardTitle>
                        <CardDescription>Card Description</CardDescription>
              <CardAction>Card Action</CardAction>
            </CardHeader>
  <CardContent>
    <p>Card Content</p>
  </CardContent>
  <CardFooter>
    <p>Card Footer</p>
  </CardFooter>
</Card> 
                )
              })}</div>
           </div>
        </section>

       </div>
    </div>
  )
}
