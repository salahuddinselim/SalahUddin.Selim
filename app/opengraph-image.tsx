import { ImageResponse } from "next/og"

export const alt = "Salah Uddin Selim | CSE Student & Software Engineer"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export default function og() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 1200,
          height: 630,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #030712 0%, #0B1120 50%, #0F172A 100%)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: -200,
            left: -200,
            width: 700,
            height: 700,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(30,58,138,0.3), transparent)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -250,
            right: -150,
            width: 600,
            height: 600,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(217,119,6,0.15), transparent)",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: 100,
            right: 100,
            width: 4,
            height: 4,
            borderRadius: "50%",
            background: "#00D9FF",
            boxShadow: "0 0 60px 20px rgba(0,217,255,0.2)",
          }}
        />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            zIndex: 1,
          }}
        >
          <span
            style={{
              fontSize: 64,
              fontWeight: 800,
              letterSpacing: "-0.02em",
              color: "#FFFFFF",
              fontFamily: "Inter, sans-serif",
              lineHeight: 1.1,
            }}
          >
            Salah Uddin Selim
          </span>
          <span
            style={{
              fontSize: 24,
              color: "rgba(255,255,255,0.65)",
              fontFamily: "Inter, sans-serif",
              fontWeight: 400,
              marginTop: 8,
              letterSpacing: "0.05em",
            }}
          >
            CSE Student &amp; Software Engineer
          </span>
          <div
            style={{
              display: "flex",
              gap: 12,
              marginTop: 24,
            }}
          >
            <span
              style={{
                display: "flex",
                padding: "8px 20px",
                borderRadius: 9999,
                background: "rgba(0,217,255,0.12)",
                border: "1px solid rgba(0,217,255,0.3)",
                color: "#00D9FF",
                fontSize: 16,
                fontWeight: 600,
                fontFamily: "Inter, sans-serif",
              }}
            >
              UIU · GPA 3.68/4.0
            </span>
            <span
              style={{
                display: "flex",
                padding: "8px 20px",
                borderRadius: 9999,
                background: "rgba(34,197,94,0.12)",
                border: "1px solid rgba(34,197,94,0.3)",
                color: "#22C55E",
                fontSize: 16,
                fontWeight: 600,
                fontFamily: "Inter, sans-serif",
              }}
            >
              6th Runner-Up
            </span>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    },
  )
}
