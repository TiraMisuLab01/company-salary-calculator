import { describe, expect, it } from "vitest";
import { decryptJson, encryptJson } from "./crypto-service";

describe("crypto-service", () => {
  it("encrypts and decrypts profile payloads", async () => {
    const password = "salary-demo-pass";
    const payload = { name: "张三", city: "武汉", grossMonthly: 15508 };

    const encrypted = await encryptJson(payload, password);
    const decrypted = await decryptJson<typeof payload>(encrypted, password);

    expect(encrypted.ciphertext).not.toContain("张三");
    expect(decrypted).toEqual(payload);
  });

  it("rejects decryption with the wrong password", async () => {
    const encrypted = await encryptJson({ month: "2026-05" }, "right-pass");

    await expect(decryptJson(encrypted, "wrong-pass")).rejects.toThrow();
  });
});
