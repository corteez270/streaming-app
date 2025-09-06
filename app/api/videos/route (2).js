import { NextResponse } from "next/server";

export async function GET() {
  // Serve videos from the /public/videos folder
  const videos = [
    {
      id: 1,
      title: "My First Uploaded Movie",
      url: "/videos/sample-5s.mp4" // make sure this matches the file name
    }
  ];

  return NextResponse.json(videos);
}
