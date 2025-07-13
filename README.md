# CodeLens: AI-Powered Career Roadmap Generator

SkillMatch is an AI-powered platform that generates customized learning and project roadmaps for job seekers. It helps bridge the gap between a user's current skills and experience and their dream job by analyzing their resume, target role, and available timeline.

## ✨ Features

- Upload your resume and let the system analyze your skills, projects, and experience.
- Specify your target role or dream job.
- Set a timeline (in weeks) for achieving your goal.
- Receive a personalized roadmap including:
  - Recommended courses
  - Suggested projects
  - Skills to focus on
- Simple and responsive frontend using **Next.js** and **Tailwind CSS**.
- Backend powered by **Django** and **LangChain** AI with **DeepSeek** models.

## 🛠️ Tech Stack

- **Frontend:** Next.js, JavaScript, Tailwind CSS
- **Backend:** Django, Django REST Framework, PostgreSQL (NeonDB)
- **AI:** LangChain + DeepSeek AI models
- **Deployment:** Docker (optional), AWS/GCP-compatible

## 🚀 How It Works

1. **User Inputs:**
   - Upload resume (PDF format preferred).
   - Enter target role (e.g., Backend Developer, Data Scientist).
   - Set timeline in weeks.

2. **AI Processing:**
   - Resume parsing and skill extraction using custom models.
   - Gap analysis between current skills and target role.
   - Course and project recommendations generated using LangChain with DeepSeek.

3. **Roadmap Output:**
   - Structured week-wise roadmap.
   - Divided into learning modules, projects, and assessments.

## 📄 Setup Instructions

### Prerequisites

- Node.js (v18+)
- Python (v3.10+)
- PostgreSQL or SQLite
- DeepSeek API key (or local model setup)

### Backend Setup

```bash
cd backend
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
