export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  publishedAt: string;
  readTime: string;
  tags: string[];
  body: string[];
}

export const blogPosts: BlogPost[] = [
  {
    slug: "moving-to-germany-first-30-days",
    title: "Moving to Germany: What to Handle in Your First 30 Days",
    excerpt:
      "A practical first-month checklist for new arrivals in Germany, from Anmeldung to health insurance and transport setup.",
    publishedAt: "2026-04-08",
    readTime: "6 min read",
    tags: ["Germany", "Checklist", "First Month"],
    body: [
      "The first month in Germany feels deceptively busy because so many later tasks depend on the early ones. Address registration, tax identifiers, health insurance, and banking all connect to one another, so the order matters.",
      "Start with your address registration as soon as you have a stable place to stay. In many cities you will need an appointment, and the registration confirmation often becomes the document other institutions ask for next.",
      "Health insurance should be handled early as well, especially if you are working or studying. Waiting too long can create friction with payroll, doctor registration, and residence paperwork.",
      "If you plan to rely on public transport, compare regional passes with the Deutschlandticket right away. It is one of the simplest wins for reducing your first-month costs.",
      "The bigger lesson is that German bureaucracy is manageable when you sequence it well. A personalized checklist helps because families, students, freelancers, pet owners, and non-EU arrivals do not all need the same first steps.",
    ],
  },
  {
    slug: "eu-vs-non-eu-expat-paperwork",
    title: "EU vs Non-EU Expat Paperwork: Why the Same Move Can Have Very Different Admin",
    excerpt:
      "Free movement changes the legal path, but it does not remove local bureaucracy. Here is why origin still reshapes an expat checklist.",
    publishedAt: "2026-04-08",
    readTime: "5 min read",
    tags: ["EU", "Residency", "Visas"],
    body: [
      "A common relocation mistake is assuming that everyone moving to the same country faces the same process. In reality, your passport can completely change the legal path while leaving many of the practical steps untouched.",
      "EU and EEA citizens often benefit from simpler residence rules, but they still need to think about registration, tax setup, health coverage, schooling, transport, and banking. The move is easier, not administration-free.",
      "Non-EU arrivals usually have stricter deadlines around residence permits, entry windows, employer sponsorship, and supporting documentation. Missing those deadlines can carry much bigger risk than missing a convenience task like getting a local SIM card.",
      "That is why a good relocation product should filter tasks by both destination and origin. The checklist is not just about where you are moving. It is also about who you are within that system.",
      "The most useful checklist is the one that removes irrelevant steps while making the genuinely urgent ones impossible to miss.",
    ],
  },
  {
    slug: "how-expat-checklists-should-work",
    title: "How Expat Checklists Should Work If They Are Actually Going to Help",
    excerpt:
      "A generic list of admin tasks is easy to publish and easy to ignore. A useful expat checklist adapts to the move you are actually making.",
    publishedAt: "2026-04-08",
    readTime: "4 min read",
    tags: ["Product", "Relocation", "Planning"],
    body: [
      "Most expat checklists fail because they confuse completeness with relevance. They dump every possible task onto one page and leave the reader to work out what applies.",
      "A stronger approach starts with the move profile. Destination matters, but so do family status, study plans, employment setup, driving, pets, and whether someone has free movement rights or needs a permit.",
      "The result should feel like a decision-aware checklist rather than a generic article. Families should immediately see childcare and school tasks. Job seekers should see employment-office and CV steps. Pet owners should not have to dig for import rules.",
      "There is also a trust question. Safety-critical information such as emergency numbers and basic country essentials should stay accessible even without a paywall, while premium can add the deeper edge cases and administrative detail.",
      "That is the model we are building toward with Expat Starter Pack: fewer irrelevant steps, clearer deadlines, and a path that feels specific to the person making the move.",
    ],
  },
];

export function getAllBlogPosts() {
  return blogPosts;
}

export function getBlogPostBySlug(slug: string) {
  return blogPosts.find((post) => post.slug === slug) ?? null;
}
