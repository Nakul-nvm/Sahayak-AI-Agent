# Sahayak - Your AI-Powered Teacher's Assistant

Sahayak is a comprehensive, end-to-end application designed to assist teachers in multi-grade classrooms. It leverages modern web technologies and open-source AI to streamline content creation, automate tasks, and provide valuable insights.

## Key Features

*   **User Authentication:** Secure login and registration for teachers using Supabase Auth.
*   **Textbook Content Upload:** Teachers can upload images or PDFs of textbook pages.
*   **OCR Processing:** Tesseract.js extracts text from uploaded images.
*   **AI-Powered Worksheet Generation:**
    *   Utilizes LangChain and Llama 2 (or compatible LLM) to generate grade-specific, language-localized worksheets from extracted textbook content.
    *   Supports various question types (multiple-choice, short answer, fill-in-the-blanks).
*   **AI-Powered Lesson Plan Creation:**
    *   Generates weekly lesson plans based on teacher inputs (subject, grade, topics) using LangChain and Llama 2.
*   **Spoken Q&A Interface:**
    *   Integrates Whisper for Speech-to-Text and Coqui TTS (or alternative) for Text-to-Speech.
    *   Allows teachers to ask questions and receive answers with analogies in simple language, suitable for different grade levels.
*   **Data Management:** Uses Supabase Postgres to store teacher profiles, uploads, generated worksheets, lesson plans, and analytics.
*   **Cloud Storage:** Supabase Storage for managing uploaded files.
*   **Teacher Dashboard:** A central hub for accessing all features, viewing generated content, and managing uploads.
*   **Analytics:** (Planned) Visualizations of content usage and other relevant metrics.
*   **Serverless Architecture:** Hosted on Vercel, utilizing serverless functions for backend logic.
*   **CI/CD:** Automated builds and deployments using GitHub Actions and Vercel.

## Tech Stack

*   **Frontend:** React, Next.js (App Router), Tailwind CSS
*   **Backend:** Node.js (via Next.js API Routes / Vercel Serverless Functions)
*   **Database & Auth:** Supabase (PostgreSQL, Auth, Storage)
*   **Hosting & Serverless:** Vercel
*   **AI Orchestration:** LangChain.js
*   **Language Models (LLM):** Llama 2 / Llama 3 (or compatible, via API like Groq, Replicate, or OpenAI-compatible endpoints)
*   **OCR:** Tesseract.js
*   **Speech-to-Text (STT):** OpenAI Whisper (via API)
*   **Text-to-Speech (TTS):** Coqui TTS (via API, or alternative like OpenAI TTS)
*   **CI/CD:** GitHub Actions

## Getting Started

Follow these instructions to set up and run the Sahayak project locally.

### Prerequisites

*   Node.js (v18 or v20+ recommended)
*   npm, yarn, or pnpm
*   Git
*   A Supabase account (for database, auth, and storage)
*   Access to an LLM API (e.g., Groq, Replicate, OpenAI) for Llama 2/3 or other models.
*   API key for OpenAI Whisper (for STT).
*   (Optional) API key for Coqui TTS or another TTS service.

### Environment Variables

1.  Clone the repository:
    ```bash
    git clone https://github.com/your-username/sahayak.git
    cd sahayak
    ```
    Replace `your-username/sahayak.git` with the actual repository URL.

2.  Create a `.env.local` file in the root of the project by copying the example (if one exists) or creating it manually. Add the following environment variables:

    ```env
    # Supabase
    NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
    NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_project_anon_key
    SUPABASE_SERVICE_ROLE_KEY=your_supabase_project_service_role_key # For backend functions

    # AI Services
    # For LLM (choose one provider or set up for OpenAI-compatible endpoint)
    OPENAI_API_KEY=your_llm_provider_api_key # e.g., Groq, TogetherAI, or actual OpenAI if using their models via compatible API
    LLM_MODEL_NAME="llama3-8b-8192" # Or your chosen model, e.g., "llama2-70b-chat", "mixtral-8x7b"
    # OPENAI_API_BASE_URL=https://api.groq.com/openai/v1 # Example for Groq or other OpenAI-compatible base URL

    # REPLICATE_API_TOKEN=your_replicate_api_token # If using Replicate for LLM

    # For Speech-to-Text (Whisper)
    OPENAI_API_KEY_WHISPER=your_openai_api_key_for_whisper # Can be same as above if using OpenAI for both

    # For Text-to-Speech (Coqui TTS or other)
    # COQUI_TTS_API_KEY=your_coqui_api_key # Or other TTS provider key
    # COQUI_TTS_API_URL=your_coqui_api_url

    # Vercel (for CI/CD, usually set in Vercel dashboard, but good to note for local Vercel CLI use)
    # VERCEL_ORG_ID=your_vercel_org_id
    # VERCEL_PROJECT_ID=your_vercel_project_id
    # VERCEL_TOKEN=your_vercel_cli_token
    ```

    *   Replace placeholder values with your actual keys and URLs.
    *   `SUPABASE_SERVICE_ROLE_KEY` is used for backend functions that need elevated privileges.
    *   Ensure the LLM provider details match the setup in `src/lib/langchain/agent.ts`.

### Database Setup

1.  Go to your Supabase project dashboard.
2.  Use the SQL Editor to run the schema definitions. The SQL for table creation, RLS policies, and triggers can be found in the project documentation or was provided during the initial setup phase. This will create tables like `teachers`, `textbook_uploads`, `generated_worksheets`, `lesson_plans`, and `analytics_events`.
3.  Ensure Row Level Security (RLS) policies are enabled and correctly configured for each table.
4.  In Supabase Storage, create the necessary buckets (e.g., `textbook_images`) and configure their access policies.

### Installation

Install project dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
```

### Running Locally

Start the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

The application should now be running at `http://localhost:3000`.

## Folder Structure Overview

```
sahayak/
├── .github/workflows/      # CI/CD workflows (e.g., main.yml for Vercel deployment)
├── public/                 # Static assets
├── src/
│   ├── app/                # Next.js App Router (pages and API routes)
│   │   ├── (auth)/         # Auth-related pages (login, signup)
│   │   ├── (dashboard)/    # Authenticated dashboard pages
│   │   ├── api/            # Serverless API routes (backend logic)
│   │   │   ├── generate/   # Endpoints for content generation
│   │   │   └── qna-spoken/ # Endpoint for spoken Q&A (to be implemented)
│   │   └── layout.tsx      # Root layout
│   │   └── page.tsx        # Landing page
│   ├── components/         # Shared React components (UI, auth, dashboard)
│   ├── contexts/           # React contexts (e.g., AuthContext)
│   ├── hooks/              # Custom React hooks
│   ├── lib/                # Utility functions, Supabase client, LangChain setup
│   │   ├── ai-services/    # Wrappers for AI services (Tesseract, Whisper, TTS)
│   │   └── langchain/      # LangChain prompts and agent configuration
│   ├── services/           # Backend service logic (OCR, worksheet generation)
│   ├── styles/             # Global styles, Tailwind CSS config
│   └── types/              # TypeScript definitions (including Supabase types)
├── .env.local              # Local environment variables (ignored by Git)
├── next.config.mjs         # Next.js configuration
├── package.json
└── tsconfig.json           # TypeScript configuration
```

## Available API Endpoints (Examples)

*   `POST /api/generate/worksheet`: Accepts details (file path from Supabase storage, grade, subject, language, teacher ID, etc.) to trigger OCR on the file and generate a worksheet using an LLM. Saves the result to the database.
*   `POST /api/generate/lesson-plan`: (To be implemented) Accepts parameters (subject, grade, topics, duration, etc.) to generate a weekly lesson plan.
*   `POST /api/qna-spoken`: (To be implemented) Handles audio input for Speech-to-Text, processes the transcribed text with an LLM for Q&A and analogy generation, and returns a spoken answer using Text-to-Speech.

---

This README provides a good starting point. You can expand it with more specific details as the project evolves.
