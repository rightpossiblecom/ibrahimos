"""Render CAC PDF first page to public/product/cac-certificate.jpg"""
from pathlib import Path
import fitz

root = Path(__file__).resolve().parents[1]
# Prefer exact owner filename; fall back to any CAC*.pdf in public/
candidates = list(root.joinpath("public").glob("CAC*.pdf"))
if not candidates:
    raise SystemExit("No CAC PDF found under public/")

src = candidates[0]
doc = fitz.open(src)
page = doc[0]
pix = page.get_pixmap(matrix=fitz.Matrix(2.5, 2.5), alpha=False)
out = root / "public" / "product" / "cac-certificate.jpg"
out.parent.mkdir(parents=True, exist_ok=True)
pix.save(str(out))

# Optional downloadable copy with stable name
stable_pdf = root / "public" / "cac-certificate.pdf"
stable_pdf.write_bytes(src.read_bytes())

print(f"source={src.name}")
print(f"image={out} {pix.width}x{pix.height}")
print(f"pdf_copy={stable_pdf}")
print("---TEXT---")
print(page.get_text()[:3000])
