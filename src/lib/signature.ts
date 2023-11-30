export async function createSignature(data: string) {
  const encoder = new TextEncoder();
  const encodedData = encoder.encode(data);
  try {
    const signatureSecret = import.meta.env.VITE_SIGNATURE_SECRET;
    const key = await crypto.subtle.importKey(
      "raw",
      encoder.encode(signatureSecret),
      { name: "HMAC", hash: "SHA-256" },
      false,
      ["sign"],
    );
    const signatureBuffer = await crypto.subtle.sign("HMAC", key, encodedData);
    const signature = Array.from(new Uint8Array(signatureBuffer)).map(b => b.toString(16).padStart(2, '0')).join('');
    return signature;
  } catch (error) {
    console.error(error);
  }
}
