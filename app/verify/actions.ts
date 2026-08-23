'use server';

import { Verifier } from '../../lib/core/verifier';
import type { VerifyRequest } from '../../lib/core/types';
import { errorToMessage } from '../../lib/core/types';

export async function verifyReceipt(request: VerifyRequest) {
  try {
    const verifier = new Verifier();
    const result = await verifier.verify(request);
    
    if (result.ok) {
      return {
        success: true,
        data: result.value
      };
    } else {
      return {
        success: false,
        error: errorToMessage(result.error),
        kind: result.error.kind
      };
    }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : String(error)
    };
  }
}
