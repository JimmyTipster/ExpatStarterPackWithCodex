import Link from "next/link";

import { getAllBlogPosts } from "@/data/blogPosts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function BlogPage() {
  const posts = getAllBlogPosts();

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
      <div className="space-y-3">
        <p className="text-sm font-medium uppercase tracking-[0.22em] text-primary">Blog</p>
        <h1 className="font-heading text-4xl text-foreground">Starter guides for moving abroad</h1>
        <p className="max-w-3xl text-base leading-8 text-muted-foreground">
          The blog now has launch content focused on first-month admin, relocation planning, and
          why personalized expat checklists work better than generic lists.
        </p>
      </div>

      <div className="grid gap-5 lg:grid-cols-3">
        {posts.map((post) => (
          <Link key={post.slug} href={`/blog/${post.slug}`} className="group">
            <Card className="h-full rounded-[1.75rem] border-border/80 bg-card/94 transition-transform duration-200 group-hover:-translate-y-1">
              <CardHeader className="space-y-3">
                <p className="text-sm text-primary">
                  {new Date(post.publishedAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
                <CardTitle className="text-2xl">{post.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-sm text-muted-foreground">
                <p>{post.excerpt}</p>
                <p className="font-medium text-foreground">{post.readTime}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
