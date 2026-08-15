import { put } from "@vercel/blob";
import { NextRequest, NextResponse } from "next/server";

const MAX_BYTES = 5 * 1024 * 1024;
const ALLOWED = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
]);

const STAFF_ROLES = new Set([
  "PLATFORM_ADMIN",
  "RESTAURANT_OWNER",
  "BRANCH_MANAGER",
]);

export async function POST(req: NextRequest) {
  const token = process.env.BLOB_READ_WRITE_TOKEN;
  if (!token) {
    return NextResponse.json(
      {
        message:
          "BLOB_READ_WRITE_TOKEN is not set. Add it in Vercel → Admin → Environment Variables.",
      },
      { status: 503 },
    );
  }

  const auth = req.headers.get("authorization");
  if (!auth?.startsWith("Bearer ")) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const apiBase =
    process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3000/api";
  const profileRes = await fetch(`${apiBase}/profile`, {
    headers: { Authorization: auth },
    cache: "no-store",
  }).catch(() => null);

  if (!profileRes?.ok) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const profile = (await profileRes.json()) as { role?: string };
  if (!profile.role || !STAFF_ROLES.has(profile.role)) {
    return NextResponse.json({ message: "Forbidden" }, { status: 403 });
  }

  const form = await req.formData();
  const file = form.get("file");
  if (!(file instanceof File)) {
    return NextResponse.json({ message: "file is required" }, { status: 400 });
  }
  if (!ALLOWED.has(file.type)) {
    return NextResponse.json(
      { message: "Only JPEG, PNG, WebP, or GIF images are allowed" },
      { status: 400 },
    );
  }
  if (file.size > MAX_BYTES) {
    return NextResponse.json(
      { message: "Image must be 5MB or smaller" },
      { status: 400 },
    );
  }

  const safeName = file.name.replace(/[^\w.\-]+/g, "_").slice(0, 80);
  const pathname = `restaurant-platform/${Date.now()}-${safeName}`;

  const blob = await put(pathname, file, {
    access: "public",
    token,
    contentType: file.type,
  });

  return NextResponse.json({
    url: blob.url,
    path: blob.pathname,
    filename: file.name,
  });
}
