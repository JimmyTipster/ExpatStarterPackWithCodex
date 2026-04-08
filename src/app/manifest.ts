import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Expat Starter Pack",
    short_name: "Expat Pack",
    description: "Personalized relocation checklists and country guidance for moving abroad.",
    start_url: "/",
    display: "standalone",
    background_color: "#fefcf9",
    theme_color: "#1b4332",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "64x64",
        type: "image/x-icon",
      },
    ],
  };
}
