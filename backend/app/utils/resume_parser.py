import re
import json

def extract_sections(text):
    text = text.lower()

    def get_section(section_name, next_section_names, text_block):
        try:
            start = re.search(rf"{section_name}", text_block).end()
            end_matches = [re.search(rf"{ns}", text_block[start:]) for ns in next_section_names]
            end_positions = [m.start() for m in end_matches if m]
            end = min(end_positions) if end_positions else len(text_block)
            return text_block[start:start + end].strip()
        except:
            return ""

    skills_text = get_section(
        r"(skills|technical skills|technologies)",
        ["experience", "projects", "education", "work experience", "internship"],
        text
    )

    experience_text = get_section(
        r"(experience|work experience|internship)",
        ["projects", "skills", "education"],
        text
    )

    projects_text = get_section(
        r"(projects|personal projects|academic projects)",
        ["experience", "skills", "education"],
        text
    )
    extracted_data = {
        "skills": [s.strip() for s in re.split(r"[,\n•]", skills_text) if s.strip()],
        "experience": [line.strip() for line in experience_text.split("\n") if line.strip()],
        "projects": [line.strip() for line in projects_text.split("\n") if line.strip()],
    }
    parsed_json = json.dumps(extracted_data, indent=2, ensure_ascii=False)
    return parsed_json
