import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json(
    {
      status: "healthy",
      service: "mothilal-portfolio-api",
      version: "2.0.0",
      timestamp: new Date().toISOString(),
      uptime: "99.99%",
    },
    {
      status: 200,
      headers: {
        "Cache-Control": "no-cache",
        "Access-Control-Allow-Origin": "*",
      },
    },
  );
}
