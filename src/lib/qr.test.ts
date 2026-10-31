import { describe, expect, it } from "vitest";
import QRCode from "qrcode";
import jsQR from "jsqr";
import { PNG } from "pngjs";
import { placeUrl } from "./qr";

describe("QR deep links", () => {
  it("builds stable language-neutral URLs", () => {
    expect(placeUrl("aquae-calidae", "https://discover.example/" )).toBe("https://discover.example/places/aquae-calidae");
  });
  it("round-trips a generated QR image", async () => {
    const expected = placeUrl("aquae-calidae", "https://discover.example");
    const buffer = await QRCode.toBuffer(expected, { width: 420, margin: 4, errorCorrectionLevel: "H" });
    const png = PNG.sync.read(buffer);
    const result = jsQR(new Uint8ClampedArray(png.data), png.width, png.height);
    expect(result?.data).toBe(expected);
  });
});
