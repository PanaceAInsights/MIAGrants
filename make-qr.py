#!/usr/bin/env python3
"""
Generate the slide QR code for the Funding Compass site.

Usage:
    python3 make-qr.py https://YOURNAME.github.io/funding-compass/

Produces qr-code.png, sized and formatted for projection from the back of a
conference room: pure black on pure white, error correction level M, and a
generous quiet zone. Do not add a logo, a gradient or rounded modules; each
of those reduces the scan rate from a distance.
"""
import sys
import qrcode
from qrcode.constants import ERROR_CORRECT_M

def main():
    if len(sys.argv) < 2:
        print(__doc__)
        sys.exit(1)

    url = sys.argv[1].strip()
    out = sys.argv[2] if len(sys.argv) > 2 else "qr-code.png"

    qr = qrcode.QRCode(
        version=None,               # auto-size to the shortest version that fits
        error_correction=ERROR_CORRECT_M,
        box_size=24,                # large modules for a high-resolution slide
        border=4,                   # 4-module quiet zone, the spec minimum
    )
    qr.add_data(url)
    qr.make(fit=True)

    img = qr.make_image(fill_color="black", back_color="white")
    img.save(out)

    print(f"Wrote {out}")
    print(f"  URL       {url}")
    print(f"  Version   {qr.version} ({len(qr.get_matrix())} modules square)")
    print(f"  Size      {img.size[0]} x {img.size[1]} px")
    print()
    print("Slide guidance: place at least 25 percent of slide height, on its own")
    print("white panel even if the slide background is off-white, and print the")
    print("URL underneath at readable size as a fallback.")

if __name__ == "__main__":
    main()
