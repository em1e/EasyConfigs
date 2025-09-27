import * as React from "react"
import Link from "next/link"

import { siteConfig } from "@/lib/config"
import { Icons } from "@/components/icons"
import { Button } from "@/registry/new-york-v4/ui/button"
import { Skeleton } from "@/registry/new-york-v4/ui/skeleton"

// Cute github link component in top right corner of the page
export function GitHubLink() {
  return (
    <Button asChild size="sm" variant="ghost" className="h-8 shadow-none">
      <Link href={siteConfig.links.github} target="_blank" rel="noreferrer">
        <Icons.gitHub />
        <React.Suspense fallback={<Skeleton className="h-4 w-8" />}>
          <FollowersCount />
          {/* <StarsCount /> */}
        </React.Suspense>
      </Link>
    </Button>
  )
}

// counts the total number of stars across all repositories of a GitHub user
export async function StarsCount() {
  const username = "em1e"; // replace with any GitHub username
  const res = await fetch(`https://api.github.com/users/${username}/repos?per_page=100`, {
    next: { revalidate: 86400 }, // Cache for 1 day
  });

  const repos = await res.json();

  if (!Array.isArray(repos)) {
    return <span className="text-muted-foreground text-xs">Error</span>;
  }

  const totalStars = repos.reduce((sum, repo) => sum + (repo.stargazers_count || 0), 0);

  return (
    <span className="text-muted-foreground w-8 text-xs tabular-nums">
      {totalStars >= 1000
        ? `${(totalStars / 1000).toFixed(1)}k stars`
        : totalStars.toLocaleString() + " stars"}
    </span>
  );
}

// counts the number of followers of a GitHub user
export async function FollowersCount() {
  const username = "em1e"; // Replace with your GitHub username
  const res = await fetch(`https://api.github.com/users/${username}`, {
    next: { revalidate: 86400 }, // Cache for 1 day
  });

  const user = await res.json();

  if (!user || typeof user.followers !== "number") {
    return <span className="text-muted-foreground text-xs">Error</span>;
  }

  return (
    <span className="text-muted-foreground w-8 text-xs tabular-nums">
      {user.followers >= 1000
        ? `${(user.followers / 1000).toFixed(1)}k followers`
        : `${user.followers.toLocaleString()} 👤`}
    </span>
  );
}