import type { ServiceProvider } from "@/data/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function ServiceCard({ service }: { service: ServiceProvider }) {
  return (
    <Card className="h-full rounded-[1.5rem] border-border/70 bg-background/85">
      <CardHeader className="space-y-2">
        <CardTitle className="text-lg">{service.name}</CardTitle>
        <p className="text-sm text-muted-foreground">{service.category}</p>
      </CardHeader>
      <CardContent className="space-y-3 text-sm leading-6 text-muted-foreground">
        <p>{service.description}</p>
        {service.websiteUrl ? (
          <a
            href={service.websiteUrl}
            target="_blank"
            rel="noreferrer"
            className="font-medium text-primary underline-offset-4 hover:underline"
          >
            Visit website
          </a>
        ) : null}
      </CardContent>
    </Card>
  );
}
