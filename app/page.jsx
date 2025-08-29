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
                
              })}</div>
           </div>
        </section>

       </div>
    </div>
  )
}
