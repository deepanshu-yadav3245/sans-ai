
import { Button } from './ui/button'
import Link from 'next/link'
import Image from 'next/image'
const HeroSection = () => {
  return (
    <section className='w-full pt-36 md:pt-48 pb-10'>
      <div>
        <div>
            <h1>Your AI Coach for
                <br />
                Professional Success
            </h1>
            <p>
                Advance your career with personalized AI-driven coaching, tailored 
                to your unique professional journey.
            </p>
        </div>

        <div>
            <Link href='/dashboard'>
               <Button size="lg" className="px-8">
                Get Started</Button>
            </Link>

            <Link href='https://www.youtube.com/watch?v=UbXpRv5ApKA&t=145s'>
               <Button size="lg" className="px-8" variant="outline">
                Get Started</Button>
            </Link>
        </div>

        <div>
            <div>
               <Image
                  src={"/banner.jpeg"}
                  width={1280}
                  height={720}
                  alt='Banner Sansai'
                  className='rounded-lg shadow-2xl border mx-auto'
                  priority
                />
            </div>
        </div>
      </div>
    </section>
  )
}

export default HeroSection
