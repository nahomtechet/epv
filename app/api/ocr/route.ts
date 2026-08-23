import { NextRequest, NextResponse } from "next/server";
import { decodeQrFromImage, parseQrReference } from "../../../lib/server-ocr";
import { detectBankFromUrl } from "../../../lib/adapters/url-detector";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const image = formData.get("image") as File | null;
    
    if (!image) {
      return NextResponse.json({ success: false, error: "No image provided" }, { status: 400 });
    }

    const buffer = Buffer.from(await image.arrayBuffer());
    
    // Try decoding the QR code from the image
    const qrCode = await decodeQrFromImage(buffer);

    if (qrCode && qrCode.data) {
      // 1. Try URL detection first (many banks embed share URLs in the QR code)
      const detected = detectBankFromUrl(qrCode.data);
      if (detected) {
        return NextResponse.json({
          success: true,
          source: "qr",
          text: qrCode.data,
          reference: detected.reference,
          bank: detected.bank,
          confidence: "high"
        });
      }

      // 2. Try raw pattern matching (some banks encode raw references or blobs)
      const parsed = parseQrReference(qrCode.data);
      if (parsed) {
        return NextResponse.json({
          success: true,
          source: "qr",
          text: qrCode.data,
          reference: parsed.reference,
          bank: parsed.bank,
          confidence: "high"
        });
      }
      
      // We found a QR code but couldn't parse it into a reference
      return NextResponse.json({
        success: true,
        source: "qr_unknown",
        text: qrCode.data,
      });
    }

    // No QR code found
    return NextResponse.json({ success: false, error: "No QR code found" });
  } catch (error) {
    console.error("OCR Route Error:", error);
    return NextResponse.json({ success: false, error: String(error) }, { status: 500 });
  }
}
