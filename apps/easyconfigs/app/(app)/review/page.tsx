import { ReviewBase } from "@/app/(app)/review/review-base"
import { ReviewProvider } from "@/app/(app)/review/review-context"

export const dynamic = "force-static"
export const revalidate = false

export default function ReviewPage() {
  return (
  <section className="w-full px-4 py-6">
      <ReviewProvider>
        <ReviewBase />
      </ReviewProvider>
    </section>
  )
}

