from deep_translator import MyMemoryTranslator


def translate_fr_to_en(text: str) -> str | None:
    """Translate French text to English using MyMemory (free, no API key)."""
    if not text or not text.strip():
        return None
    try:
        return MyMemoryTranslator(source="fr-FR", target="en-GB").translate(text)
    except Exception:
        return None


def auto_fill_en_fields(data: dict) -> dict:
    """Fill missing _en fields by translating FR content."""
    for exp in data.get("experiences", []):
        if not exp.get("role_en"):
            exp["role_en"] = translate_fr_to_en(exp.get("role", "")) or exp.get("role")
        if not exp.get("type_en"):
            exp["type_en"] = translate_fr_to_en(exp.get("type", "")) or exp.get("type")
        if not exp.get("description_en"):
            exp["description_en"] = translate_fr_to_en(exp.get("description", "")) or exp.get("description")

    for proj in data.get("projects", []):
        if not proj.get("title_en"):
            proj["title_en"] = translate_fr_to_en(proj.get("title", "")) or proj.get("title")
        if not proj.get("subtitle_en"):
            proj["subtitle_en"] = translate_fr_to_en(proj.get("subtitle", "")) or proj.get("subtitle")
        if not proj.get("description_en"):
            proj["description_en"] = translate_fr_to_en(proj.get("description", "")) or proj.get("description")

    for edu in data.get("education", []):
        if not edu.get("degree_en"):
            edu["degree_en"] = translate_fr_to_en(edu.get("degree", "")) or edu.get("degree")

    for metric in data.get("about_metrics", []):
        if not metric.get("label_en"):
            metric["label_en"] = translate_fr_to_en(metric.get("label", "")) or metric.get("label")

    return data
