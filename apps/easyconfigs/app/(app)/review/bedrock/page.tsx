"use client"

import * as React from "react"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/registry/new-york-v4/ui/card"
import { ReviewProvider, useReviews, useMinecraftUUID } from "@/app/(app)/review/review-context";

function ReviewBedrockContent() {
  const { reviews } = useReviews()

  return (
    <section className="w-full px-4 py-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {reviews.map((review) => {
        const uuid = useMinecraftUUID(review.ign);
        return (
          <Card key={review.id} className="flex flex-col justify-between">
          <CardHeader className="flex items-center gap-2">
            {uuid && (
            <div className="relative w-1/2 overflow-hidden">
              <img
              src={`https://crafatar.com/avatars/${uuid}`}
              alt={`${review.ign}'s Minecraft skin`}
              className="block w-16 h-16 object-cover"
              />
            </div>
            )}
            <div className="w-full">
            <CardDescription>
              {review.ign && (
              <div>
                <p className="text-s text-muted-foreground">{review.ign}</p>
                <p className="text-xs text-muted-foreground">{review.role}</p>
              </div>
              )}
            </CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col">
              {review.rating == 5 ? "★★★★★" : review.rating == 4 ? "★★★★☆" :
              review.rating == 3 ? "★★★☆☆" : review.rating == 2 ? "★★☆☆☆" : 
              review.rating == 1 ? "★☆☆☆☆" : "☆☆☆☆☆"}
              <p className="text-xs">{review.type} Generator Review</p>
              <h2 className="text-lg font-semibold">{review.title}</h2>
              <p className="text-sm text-muted-foreground">{review.description}</p>
              </div>
            </CardContent>
            </Card>
          )
          })}
        </div>
      </section>
    )
  }

  export default function ReviewBedrockPage() {
    return (
      <ReviewProvider>
        <ReviewBedrockContent />
      </ReviewProvider>
    )
  }