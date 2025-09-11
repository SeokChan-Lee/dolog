import { NextRequest, NextResponse } from "next/server";
import { getDatabase } from "@/lib/notion";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const cursor = searchParams.get("cursor") || undefined;
  const limit = cursor ? 5 : 10;

  const res = await getDatabase({ cursor, pageSize: limit });

  return NextResponse.json({
    results: res.results,
    has_more: res.has_more,
    next_cursor: res.next_cursor,
  });
}
