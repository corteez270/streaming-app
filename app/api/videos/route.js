import { NextResponse } from "next/server";

export async function GET() {
  // A list of multiple videos
  const videos = [
    {
      id: 1,
      title: "My First Uploaded Movie",
      url: "/videos/sample-5s.mp4"
    },
    {
      id: 2,
      title: "Second Movie",
      url: "/videos/sample-10s.mp4"
    },
    {
      id: 3,
      title: "Third Movie",
      url: "/videos/sample-15s.mp4"
    }
  ];

  return NextResponse.json(videos);
}
