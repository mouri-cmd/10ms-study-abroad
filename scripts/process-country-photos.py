#!/usr/bin/env python3
"""
Crops, uniformly color-grades, and exports one country-carousel hero photo.

All 7 cards share one master aspect ratio (IMAGE_WIDTH x IMAGE_HEIGHT, see
CountryCarousel.tsx) and the same grading pass, so a set of photos pulled
from different photographers still reads as one cohesive shoot.

Usage:
  python3 process-country-photos.py <source_image> <slug> \
      --crop LEFT,TOP,RIGHT,BOTTOM   # normalized 0..1 box within the source

Writes to public/images/countries/:
  <slug>.webp     <slug>.jpg      (1150w, primary)
  <slug>-sm.webp  <slug>-sm.jpg   (600w, mobile srcset candidate)
"""
import argparse
import sys
from pathlib import Path

from PIL import Image, ImageEnhance, ImageOps

IMAGE_WIDTH = 1150
IMAGE_HEIGHT = 507
SM_WIDTH = 600
SM_HEIGHT = round(SM_WIDTH * IMAGE_HEIGHT / IMAGE_WIDTH)
OUT_DIR = Path(__file__).resolve().parent.parent / "public" / "images" / "countries"

# Uniform grade applied to every photo so mismatched source exposure/white
# balance converges on one look: mild warmth wash, slight lift in contrast
# and saturation. Tuned against the UK reference photo.
WARM_OVERLAY_RGB = (255, 188, 128)
WARM_OVERLAY_ALPHA = 0.06
BRIGHTNESS = 1.03
CONTRAST = 1.06
SATURATION = 1.08


def grade(img: Image.Image) -> Image.Image:
    img = img.convert("RGB")
    overlay = Image.new("RGB", img.size, WARM_OVERLAY_RGB)
    img = Image.blend(img, overlay, WARM_OVERLAY_ALPHA)
    img = ImageEnhance.Brightness(img).enhance(BRIGHTNESS)
    img = ImageEnhance.Contrast(img).enhance(CONTRAST)
    img = ImageEnhance.Color(img).enhance(SATURATION)
    return img


def crop_box(img: Image.Image, box_norm: tuple[float, float, float, float]) -> Image.Image:
    w, h = img.size
    l, t, r, b = box_norm
    return img.crop((round(l * w), round(t * h), round(r * w), round(b * h)))


def export(img: Image.Image, slug: str) -> None:
    OUT_DIR.mkdir(parents=True, exist_ok=True)
    master = ImageOps.fit(img, (IMAGE_WIDTH, IMAGE_HEIGHT), Image.LANCZOS)
    small = ImageOps.fit(img, (SM_WIDTH, SM_HEIGHT), Image.LANCZOS)

    for im, suffix in ((master, ""), (small, "-sm")):
        webp_path = OUT_DIR / f"{slug}{suffix}.webp"
        jpg_path = OUT_DIR / f"{slug}{suffix}.jpg"
        im.save(webp_path, "WEBP", quality=80, method=6)
        im.save(jpg_path, "JPEG", quality=80, optimize=True, progressive=True)
        for p in (webp_path, jpg_path):
            kb = p.stat().st_size / 1024
            print(f"  {p.relative_to(OUT_DIR.parent.parent.parent)}  {im.size[0]}x{im.size[1]}  {kb:.0f}KB")


def main() -> None:
    ap = argparse.ArgumentParser()
    ap.add_argument("source")
    ap.add_argument("slug")
    ap.add_argument("--crop", default="0,0,1,1", help="normalized left,top,right,bottom")
    args = ap.parse_args()

    l, t, r, b = (float(x) for x in args.crop.split(","))
    img = Image.open(args.source)
    img = ImageOps.exif_transpose(img)
    img = crop_box(img, (l, t, r, b))
    img = grade(img)

    print(f"{args.slug}:")
    export(img, args.slug)


if __name__ == "__main__":
    sys.exit(main())
