import { NextResponse } from 'next/server';
import { getAllBanks } from '../../../lib/manifest/loader';

export async function GET() {
  try {
    const banks = getAllBanks();
    return NextResponse.json({ success: true, data: banks });
  } catch (error) {
    return NextResponse.json({ success: false, error: error instanceof Error ? error.message : String(error) }, { status: 500 });
  }
}
