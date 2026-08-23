import { NextRequest, NextResponse } from "next/server";
import { getParser } from "../../../lib/parsers/registry";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const bank = searchParams.get("bank");
    const reference = searchParams.get("reference");
    const account = searchParams.get("account");
    const phone = searchParams.get("phone");

    if (!bank || !reference) {
      return NextResponse.json(
        { success: false, error: "bank and reference query parameters are required" },
        { status: 400 }
      );
    }

    const parser = getParser(bank);
    if (!parser) {
      return NextResponse.json(
        { success: false, error: `Unsupported bank: ${bank}` },
        { status: 400 }
      );
    }

    if (parser.requiresPhone && !phone) {
      return NextResponse.json(
        { success: false, error: `phone query parameter is required for ${bank}` },
        { status: 400 }
      );
    }

    const url = parser.buildUrl(reference, account || undefined, phone || undefined);

    return NextResponse.json({
      success: true,
      data: {
        url,
        providerName: parser.bankName,
        isPdf: parser.responseType === "pdf"
      }
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : "Internal server error" },
      { status: 500 }
    );
  }
}
