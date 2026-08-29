import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { isAdminRequest } from "@/lib/admin-auth";
import { createAdminClient } from "@/lib/supabase/admin";

const BUCKET = "site-images";
const MAX_BYTES = 5 * 1024 * 1024;
const ALLOWED_FOLDERS = new Set(["tourism", "routes"]);

export async function POST(request: NextRequest) {
  if (!isAdminRequest(request)) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  let formData: FormData;
  try {
    formData = await request.formData();
  } catch {
    return NextResponse.json({ error: "Invalid upload." }, { status: 400 });
  }

  const file = formData.get("file");
  const folderRaw = String(formData.get("folder") ?? "misc");
  const folder = ALLOWED_FOLDERS.has(folderRaw) ? folderRaw : "misc";

  if (!(file instanceof File)) {
    return NextResponse.json({ error: "No file provided." }, { status: 400 });
  }
  if (!file.type.startsWith("image/")) {
    return NextResponse.json({ error: "File must be an image (JPG, PNG, WebP, GIF)." }, { status: 400 });
  }
  if (file.size > MAX_BYTES) {
    return NextResponse.json({ error: "Image must be under 5 MB." }, { status: 400 });
  }

  const ext = file.name.split(".").pop()?.toLowerCase() ?? "jpg";
  const safeExt = ["jpg", "jpeg", "png", "webp", "gif"].includes(ext) ? ext : "jpg";
  const path = `${folder}/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${safeExt}`;

  try {
    const supabase = createAdminClient();
    const buffer = Buffer.from(await file.arrayBuffer());

    const { error } = await supabase.storage.from(BUCKET).upload(path, buffer, {
      contentType: file.type,
      upsert: false,
    });

    if (error) {
      return NextResponse.json(
        {
          error:
            error.message.includes("Bucket not found")
              ? "Storage bucket missing. Run supabase/storage.sql in Supabase."
              : error.message,
        },
        { status: 500 }
      );
    }

    const { data } = supabase.storage.from(BUCKET).getPublicUrl(path);
    return NextResponse.json({ url: data.publicUrl });
  } catch {
    return NextResponse.json({ error: "Upload service unavailable." }, { status: 503 });
  }
}
