import { NextResponse } from "next/server";

export async function GET() {
  const videos = [
    {
      id: 1,
      title: "Sample Movie 1",
      url: "/videos/sample-5s.mp4",
      poster: "https://picsum.photos/seed/1/400/225",
      category: "Drama"
    },
    {
      id: 2,
      title: "Sample Movie 2",
      url: "/videos/sample-10s.mp4",
      poster: "https://picsum.photos/seed/2/400/225",
      category: "Comedy"
    },
    {
      id: 3,
      title: "Sample Movie 3",
      url: "/videos/sample-15s.mp4",
      poster: "https://picsum.photos/seed/3/400/225",
      category: "Action"
    }
  ];
  return NextResponse.json(videos);
}
