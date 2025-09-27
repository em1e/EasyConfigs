import { ReviewProvider } from "@/app/(app)/review/review-context"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/registry/new-york-v4/ui/carousel"
import { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"

import { Announcement } from "@/components/announcement"
import ReviewPage from "@/app/(app)/review/page"
import { ExamplesNav } from "@/components/examples-nav"
import {
  PageActions,
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/page-header"
import { PageNav } from "@/components/page-nav"
import { ThemeSelector } from "@/components/theme-selector"
import { Button } from "@/registry/new-york-v4/ui/button"
import longBoi from '@/public/images/long_boi.jpg';
import orange_cat from '@/public/images/orange_cat.jpg';
import sneaking_cat from '@/public/images/sneaking_cat.jpg';
import mie from '@/public/images/a.png';
import { metadata as rootMetadata } from "@/app/(app)/(root)/page"




export default function ReviewLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-1 flex-col">
      <PageHeader>
        <Announcement />
        <PageHeaderHeading>{String(rootMetadata.title ?? "")}</PageHeaderHeading>
        <PageHeaderDescription>{rootMetadata.description}</PageHeaderDescription>
        <PageActions>
          <Button asChild size="sm">
            <Link href="/docs/generator">Generate Config</Link>
          </Button>
          <Button asChild size="sm" variant="ghost">
            <Link href="/docs">Need Help?</Link>
          </Button>
        </PageActions>
      </PageHeader>
      {/* <PageNav className="hidden md:flex">
        <ExamplesNav className="[&>a:first-child]:text-primary flex-1 overflow-hidden" />
        <ThemeSelector className="mr-4 hidden md:flex" />
      </PageNav> */} 
      <section className="w-full px-4">
        <Carousel className="w-full max-w-6xl mx-auto" opts={{ loop: true }}>
          <CarouselPrevious />
          <CarouselContent>

            <CarouselItem className="w-3/4">
              <div className="h-[25vw] w-full bg-red-400 flex items-center justify-center text-white text-lg rounded-lg gap-4 px-4">
                <div className="w-1/3 flex justify-center">
                  <Image
                    src={longBoi}
                    alt="Example 1"
                    width={400}
                    height={300}
                    className="rounded-lg"
                  />
                </div>
                <div className="w-1/2 flex flex-col justify-center text-center px-15">
                  <div className="mb-4">
                    <h2 className="text-2xl font-bold mb-4">
                      Instantly create Minecraft configuration files
                    </h2>
                    <p className="text-sm leading-relaxed">
                      A Config Generator helps you quickly generate ready-to-use configuration
                      files for Minecraft plugins, datapacks, or mods. Instead of writing
                      configs manually, you select your options via a user-friendly form and
                      download the result — saving time and avoiding errors.
                    </p>
                  </div>
                </div>
              </div>
            </CarouselItem>

            <CarouselItem className="w-3/4">
              <div className="h-[25vw] w-full bg-blue-400 flex items-center justify-center text-white text-lg rounded-lg gap-4 px-4">
                <div className="w-1/3 flex justify-center">
                  <Image
                    src={orange_cat}
                    alt="Example 2"
                    width={400}
                    height={300}
                    className="rounded-lg"
                  />
                </div>
                <div className="w-1/2 flex flex-col justify-center text-center px-15">
                  <div className="mb-4">
                    <h2 className="text-2xl font-bold mb-4">
                      Design custom GUI layouts using pixel grids
                    </h2>
                    <p className="text-sm leading-relaxed">
                      The Custom GUI Pixel Art Generator lets you design inventory-based interfaces (like menus or shops) visually using a pixel-art-style grid. Each cell represents a slot in the GUI, and colors or icons map to items or actions — perfect for developers building intuitive custom menus.
                    </p>
                  </div>
                </div>
              </div>
            </CarouselItem>

            <CarouselItem className="w-3/4">
              <div className="h-[25vw] w-full bg-green-400 flex items-center justify-center text-white text-lg rounded-lg gap-4 px-4">
                <div className="w-1/3 flex justify-center">
                  <Image
                    src={sneaking_cat}
                    alt="Example 3"
                    width={400}
                    height={300}
                    className="rounded-lg"
                  />
                </div>
                <div className="w-1/2 flex flex-col justify-center text-center px-15">
                  <div className="mb-4">
                    <h2 className="text-2xl font-bold mb-4">
                      Easily build resource packs for Minecraft Bedrock
                    </h2>
                    <p className="text-sm leading-relaxed">
                      The Bedrock Resource Pack Generator helps you create complete resource packs for Minecraft Bedrock Edition. You can add textures, sounds, animations, and manifest files without needing to edit folders manually — ideal for creators working with add-ons or marketplace content.
                    </p>
                  </div>
                </div>
              </div>
            </CarouselItem>
          </CarouselContent>
          <CarouselNext />
        </Carousel>
      </section>

      <br/><br/><hr />

      <section className="w-full max-w-4xl mx-auto px-4 mt-10">
        <div className="flex flex-col md:flex-row items-center gap-8 p-6 bg-violet-400 rounded-lg shadow-md">
          <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-primary">
            <Image
              src={mie}
              alt="Mie profile picture"
              className="object-cover w-full h-full"
            />
          </div>

          <div className="flex-1 text-center md:text-left">
            <h2 className="text-2xl font-bold mb-2">Hi, I'm Mie 👋</h2>
            <p className="text mb-4">
              The software developer who created and owns EasyConfigs. I'm always passionate about fixing issues,
              automating tasks, learning new things, and building things that help others. EasyConfigs was meant
              to be a sideproject to fix one of my small inconveniences in life — now it's used by many all
              over the world.
            </p>

            <div className="text-sm text-gray-600 mb-4">
              <p>Email: <a href="mailto:emi.projects@outlook.com" className="underline">emi.projects@outlook.com</a></p>
              <p>GitHub: <a href="https://github.com/em1e" target="_blank" className="underline">github.com/em1e</a></p>
            </div>
            <Button asChild size="sm">
              <Link href="/docs/about">Read more about the Project</Link>
            </Button>
          </div>
        </div>
      </section>

      <br/><br/><hr />

      <section className="w-full max-w-4xl mx-auto px-4 mt-10">
        <h2 className="text-3xl font-bold text-center">User Experience</h2>
        <PageNav className="hidden md:flex">
          <ExamplesNav className="[&>a:first-child]:text-primary flex-1 overflow-hidden" />
        </PageNav>
        <div className="w-full">
          <ReviewProvider>
            {/* You can add a shared header/nav here if you want */}
            <main className="w-full px-4 py-6 max-w-6xl mx-auto">
              {children}
            </main>
          </ReviewProvider>
        </div>
      </section>
    </div>
  )
}