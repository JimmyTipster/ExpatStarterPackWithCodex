import { ImageResponse } from "next/og";

export const runtime = "edge";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const title = searchParams.get("title") || "Expat Starter Pack";
  const subtitle = searchParams.get("subtitle") || "Your personalized guide to starting a new life abroad";

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          width: "100%",
          height: "100%",
          padding: "64px",
          background:
            "linear-gradient(135deg, rgba(27,67,50,1) 0%, rgba(200,75,49,0.96) 100%)",
          color: "white",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ fontSize: 28, letterSpacing: 6, textTransform: "uppercase", opacity: 0.75 }}>
          Expat Starter Pack
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ fontSize: 72, lineHeight: 1.05, fontWeight: 700 }}>{title}</div>
          <div style={{ fontSize: 34, lineHeight: 1.3, maxWidth: "70%", opacity: 0.88 }}>{subtitle}</div>
        </div>
        <div style={{ fontSize: 24, opacity: 0.76 }}>expatstarterpack.com</div>
      </div>
    ),
    { width: 1200, height: 630 },
  );
}
