export const decodeBase64 = (base64String: string) => {
  const decoder = new TextDecoder('utf-8');
  const decodedOutput = decoder.decode(Uint8Array.from(atob(base64String), (c) => c.charCodeAt(0)));
  return decodedOutput;
};

export const encodeBase64 = (plainString: string) => {
  const encoder = new TextEncoder();
  const utf8Bytes = encoder.encode(plainString);
  const base64String = btoa(String.fromCharCode(...utf8Bytes));
  return base64String;
};
