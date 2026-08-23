import { NextRequest, NextResponse } from 'next/server';
import { Verifier } from '../../../lib/core/verifier';
import { errorToMessage } from '../../../lib/core/types';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const verifier = new Verifier();
    const result = await verifier.verify(body);
    
    if (result.ok) {
      return NextResponse.json({ success: true, data: result.value });
    } else {
      return NextResponse.json({ success: false, error: errorToMessage(result.error), kind: result.error.kind }, { status: 400 });
    }
  } catch (error) {
    console.error('Verify Route Error:', error);
    return NextResponse.json({ success: false, error: error instanceof Error ? error.message : String(error) }, { status: 500 });
  }
}
