// src/lib/langchain/prompts.ts

export const generateWorksheetPromptTemplate = `
You are an AI assistant designed to help teachers create educational worksheets for various grade levels and subjects.
Based on the following textbook content, generate a worksheet.

Textbook Content:
"""
{textbook_content}
"""

Worksheet Requirements:
Grade Level: {grade_level}
Subject: {subject}
Language: {language}
Number of Questions: {num_questions}
Question Types: {question_types}
Specific Topics to Focus On (if any): {specific_topics}

Instructions for the AI:
1.  Understand the provided textbook content thoroughly.
2.  Generate {num_questions} questions that are appropriate for {grade_level} students in {subject}.
3.  Ensure the questions are in {language}.
4.  Vary the question types as specified in {question_types} (e.g., multiple-choice, fill-in-the-blanks, short answer, true/false).
5.  If {specific_topics} are provided, prioritize generating questions related to those topics from the textbook content.
6.  The output should be a structured JSON object representing the worksheet.
    The JSON should have a "title", a "subject", a "grade_level", and a "sections" array.
    Each section in the "sections" array should have a "type" (e.g., "multiple_choice", "short_answer") and a "questions" array.
    Each question in the "questions" array should have a "question_text" field.
    For "multiple_choice" questions, include an "options" array (list of strings) and an "answer" field (string, matching one of the options).
    For other types like "short_answer" or "fill_in_the_blank", include an "answer_key" field.

Example JSON Output Structure:
{{
  "title": "Worksheet on [Relevant Topic]",
  "subject": "{subject}",
  "grade_level": "{grade_level}",
  "language": "{language}",
  "sections": [
    {{
      "type": "multiple_choice",
      "title": "Multiple Choice Questions",
      "questions": [
        {{
          "question_text": "What is the capital of France?",
          "options": ["Berlin", "Madrid", "Paris", "Rome"],
          "answer": "Paris"
        }}
      ]
    }},
    {{
      "type": "short_answer",
      "title": "Short Answer Questions",
      "questions": [
        {{
          "question_text": "Explain the process of photosynthesis in one sentence.",
          "answer_key": "Photosynthesis is the process by which green plants use sunlight, water, and carbon dioxide to create their own food and release oxygen."
        }}
      ]
    }},
    {{
      "type": "fill_in_the_blank",
      "title": "Fill in the Blanks",
      "questions": [
        {{
          "question_text": "The Earth revolves around the ____.",
          "answer_key": "Sun"
        }}
      ]
    }}
  ]
}}

Now, generate the worksheet based on the provided content and requirements.
`;

export const generateLessonPlanPromptTemplate = `
You are an AI assistant helping a teacher create a weekly lesson plan.

Teacher's Requirements:
Subject: {subject}
Grade Level: {grade_level}
Week Start Date (or Period): {week_start_date}
Duration (in school days): {duration_days}
Key Topics to Cover: {key_topics}
Learning Objectives: {learning_objectives}
Available Materials/Resources: {materials}
Language: {language}

Instructions for the AI:
1.  Create a {duration_days}-day lesson plan for {subject} for {grade_level} students.
2.  The plan should be in {language}.
3.  Address the {key_topics} and aim to meet the {learning_objectives}.
4.  Suggest daily activities, teaching strategies, and potential assessment methods (formative or summative).
5.  Consider the {materials} available. If specific materials are crucial, mention them.
6.  The output should be a structured JSON object.
    The JSON should have a "title", "subject", "grade_level", "week_start_date", "duration_days", and a "daily_plans" array.
    Each element in "daily_plans" should represent one day and include:
    - "day_number" (e.g., 1, 2, ...)
    - "topic_of_the_day" (string)
    - "learning_outcomes_for_day" (array of strings)
    - "activities" (array of strings describing activities)
    - "resources_needed" (array of strings)
    - "assessment_method" (string, e.g., "Quick quiz", "Observation", "Worksheet completion")

Example JSON Output Structure for one day:
{{
  "day_number": 1,
  "topic_of_the_day": "Introduction to Algebra",
  "learning_outcomes_for_day": [
    "Students will be able to define a variable.",
    "Students will understand the concept of an algebraic expression."
  ],
  "activities": [
    "Icebreaker: Math puzzle related to patterns.",
    "Interactive lecture: What is algebra and why is it useful?",
    "Group work: Identify variables and constants in given scenarios.",
    "Whiteboard practice: Simple expressions."
  ],
  "resources_needed": ["Whiteboard", "Markers", "Handout with scenarios"],
  "assessment_method": "Observe participation in group work and whiteboard responses."
}}

Now, generate the lesson plan based on the teacher's requirements.
`;

export const generateAnalogyPromptTemplate = `
You are an AI assistant that excels at explaining complex topics in simple terms using analogies, suitable for a specific grade level.

Topic to Explain: {topic}
Grade Level of Audience: {grade_level}
Current Question from Student (optional): {student_question}
Language: {language}

Instructions for the AI:
1.  If a {student_question} is provided, ensure the analogy helps answer it.
2.  Explain the {topic} using one or more simple analogies that a student in {grade_level} can easily understand.
3.  The explanation and analogies should be in {language}.
4.  Keep the language clear, concise, and age-appropriate. Avoid jargon where possible, or explain it simply.
5.  The output should be a JSON object with two fields: "explanation" and "analogy".
    - "explanation": A brief, simple explanation of the topic.
    - "analogy": The analogy used to clarify the explanation.

Example JSON Output Structure:
{{
  "explanation": "A variable in math is like a placeholder or a box that can hold different numbers at different times.",
  "analogy": "Think of a variable like a lunchbox. Some days your mom packs a sandwich in it (variable = sandwich), and other days she packs pasta (variable = pasta). The lunchbox (the variable 'x' or 'y') stays the same, but what's inside it can change!"
}}

Now, generate the explanation and analogy for the given topic and grade level.
`;
