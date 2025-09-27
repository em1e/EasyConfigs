import React from "react";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  } from "@/registry/new-york-v4/ui/card"

const generators = [
  {
    name: "Config Generator",
    href: "/generators/config",
    summary: "Quickly create and edit Minecraft config files with a user-friendly interface.",
    video: "/videos/sunny_summer_resort.mp4",
  },
  {
    name: "Model Generator",
    href: "/generators/model",
    summary: "Design and generate Minecraft models without needing Blockbench.",
    video: "/videos/sunny_summer_resort.mp4",
  },
  {
    name: "GUI Generator",
    href: "/generators/gui",
    summary: "Build custom Minecraft GUIs visually and export them instantly.",
    video: "/videos/sunny_summer_resort.mp4",
  },
  {
    name: "Bedrock Generator",
    href: "/generators/bedrock",
    summary: "Generate Bedrock Edition packs and resources with ease.",
    video: "/videos/sunny_summer_resort.mp4",
  },
];

export default function GeneratorsHome() {
  return (
    <div className="flex min-h-screen bg">
      <main className="flex-1 flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold mb-4">Generators</h1>
        <p className="mb-8 text-muted-foreground">
          Welcome! Select a generator type below to get started.
        </p>
        <div className="grid gap-8 md:grid-cols-2 w-full max-w-4xl px-4">
          {generators.map((gen) => (
            <Card className="bg-white dark:bg-gray-900 shadow-lg rounded-lg p-6" key={gen.name}>
              <Link
                key={gen.name}
                href={gen.href}
              >
                <div className="aspect-video mb-4 overflow-hidden rounded-lg border bg-black">
                  <video
                    src={gen.video}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                </div>
                <h2 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                  {gen.name}
                </h2>
                <p className="text-muted-foreground">{gen.summary}</p>
              </Link>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
}