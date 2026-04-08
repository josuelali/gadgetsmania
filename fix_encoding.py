import os

replacements = {
    "Ã¡": "á",
    "Ã©": "é",
    "Ã­": "í",
    "Ã³": "ó",
    "Ãº": "ú",
    "Ã±": "ñ",
    "Ã": "Á",
    "Ã‰": "É",
    "Ã": "Í",
    "Ã“": "Ó",
    "Ãš": "Ú",
    "Ã‘": "Ñ"
}

def fix_text(text):
    for wrong, correct in replacements.items():
        text = text.replace(wrong, correct)
    return text

for root, dirs, files in os.walk("."):
    for file in files:
        if file.endswith(".html"):
            path = os.path.join(root, file)
            with open(path, "r", encoding="utf-8", errors="ignore") as f:
                content = f.read()

            fixed = fix_text(content)

            with open(path, "w", encoding="utf-8") as f:
                f.write(fixed)

print("✅ Encoding arreglado en todos los HTML")