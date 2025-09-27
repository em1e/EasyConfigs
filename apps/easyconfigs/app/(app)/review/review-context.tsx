"use client"

import * as React from "react"
// import { reviewData } from "@/app/(app)/review/review-data"
import { reviewData } from "./review-data"

export interface Review {
  id: string;
  type: string;
  title: string;
  rating: number;
  description: string;
  date: string;
  ign: string;
  role: string;
}

interface ReviewContextType {
  reviews: Review[];
  activeReview: Review | null;
  setActiveReview: (review: Review) => void;
}

const ReviewContext = React.createContext<ReviewContextType | undefined>(undefined);

export function ReviewProvider({ children }: { children: React.ReactNode }) {
  const [activeReview, setActiveReview] = React.useState<Review | null>(null);

  return (
    <ReviewContext.Provider value={{ reviews: reviewData, activeReview, setActiveReview }}>
      {children}
    </ReviewContext.Provider>
  );
}

export function useReviews(): ReviewContextType {
  const context = React.useContext(ReviewContext);
  if (!context) {
    throw new Error("useReviews must be used within a ReviewProvider");
  }
  return context;
}

// This hook should only be used in client components
export function useMinecraftUUID(ign?: string) {
  const [uuid, setUuid] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (!ign) return;

    const fetchUUID = async () => {
      try {
        const res = await fetch(`https://playerdb.co/api/player/minecraft/${ign}`);
        if (!res.ok) {
          console.warn("UUID fetch failed");
          return;
        }

        const data = await res.json();
        const id = data?.data?.player?.id;
        if (id) setUuid(id);
        else console.warn("UUID not found in PlayerDB response");
      } catch (err) {
        console.error("Failed to fetch UUID:", err);
      }
    };

    fetchUUID();
  }, [ign]);

  if (!uuid) {
    return "00000000-0000-0000-0000-000000000000";
  }

  return uuid;
}