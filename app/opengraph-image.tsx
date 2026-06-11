import { ImageResponse } from "next/og";
import { person, site } from "@/lib/content";

export const alt = `${person.name} — ${person.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: "#0F0E0C",
          color: "#F2EFE8",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ display: "flex", fontSize: 36, fontWeight: 700 }}>
            M<span style={{ color: "#D6FF3F" }}>.</span>
          </div>
          <div
            style={{
              fontSize: 20,
              letterSpacing: 4,
              textTransform: "uppercase",
              color: "#A39D92",
            }}
          >
            {site.url.replace("https://", "")}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 110,
              fontWeight: 800,
              letterSpacing: -4,
              lineHeight: 1,
              textTransform: "uppercase",
              display: "flex",
            }}
          >
            {person.firstName}&nbsp;M<span style={{ color: "#D6FF3F" }}>.</span>
          </div>
          <div
            style={{
              marginTop: 28,
              fontSize: 30,
              letterSpacing: 6,
              textTransform: "uppercase",
              color: "#D6FF3F",
            }}
          >
            {`${person.role} @ ${person.company}`}
          </div>
          <div style={{ marginTop: 20, fontSize: 26, color: "#A39D92" }}>
            Python · FastAPI · GCP · Docker · Microservices
          </div>
        </div>
      </div>
    ),
    size,
  );
}
