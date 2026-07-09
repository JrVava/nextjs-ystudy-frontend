import CryptoJS from "crypto-js";

const keyStr = process.env.NEXT_PUBLIC_CRYPTO_SECRET_KEY;
if (!keyStr) {
  throw new Error("Critical Configuration Error: NEXT_PUBLIC_CRYPTO_SECRET_KEY is undefined in environment variables.");
}
const SECRET_KEY = CryptoJS.enc.Hex.parse(keyStr);
const IV = CryptoJS.lib.WordArray.create(new Uint8Array(16) as any); // 16 bytes of 0s

export const decrypt = (encryptedDataBase64: string): any => {
  try {
    const bytes = CryptoJS.AES.decrypt(encryptedDataBase64, SECRET_KEY, {
      iv: IV,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    });
    const decryptedString = bytes.toString(CryptoJS.enc.Utf8);
    if (!decryptedString) {
      throw new Error("Decrypted string is empty");
    }
    return JSON.parse(decryptedString);
  } catch (error) {
    console.error("[Crypto:decrypt] Decryption failed:", error);
    throw error;
  }
};

export const encrypt = (data: any): string => {
  try {
    const jsonString = typeof data === "string" ? data : JSON.stringify(data);
    const encrypted = CryptoJS.AES.encrypt(jsonString, SECRET_KEY, {
      iv: IV,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    });
    return encrypted.toString();
  } catch (error) {
    console.error("[Crypto:encrypt] Encryption failed:", error);
    throw error;
  }
};
