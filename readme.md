## AI Data Analyst Dashboard
An AI-powered web application that allows users to upload datasets and extract insights using Natural Language. Instead of writing complex SQL queries or manually creating Excel charts, users can simply "ask" their data questions and receive instant visualizations and summaries.

## Aim of the Project
The primary goal is to democratize data analysis. By combining Generative AI with data visualization, this dashboard enables non-technical users (marketing, sales, HR) to perform complex data exploration without needing to know Python, SQL, or advanced Excel.

---

## Project Logic & Workflow
This project bridges the gap between **Full-Stack Development, Data Visualization, and Artificial Intelligence**.

1.  **Data Ingestion:** The user uploads a CSV file through a React-based UI.
2.  **Processing:** The backend parses the data (using PapaParse or Pandas) and prepares it for querying.
3.  **The AI Layer:** When a user asks a question, the AI (OpenAI/Gemini) acts as a translator, converting the Natural Language query into a **Structured Query Object** (Logic or Pseudo-SQL).
4.  **Data Execution:** The backend applies this logic to the dataset to filter, group, or calculate metrics.
5.  **Output:** Results are rendered as:
    * **Interactive Charts:** Bar, Line, or Pie charts using Recharts/Chart.js.
    * **Text Insights:** AI-generated summaries explaining the key takeaways.

---

## Tech Stack
| Layer | Technologies |
| :--- | :--- |
| **Frontend** | React.js, Tailwind CSS |
| **Visuals** | Chart.js |
| **Backend** | Node.js + Express.js |
| **AI Engine** | Gemini API |
| **Data Handling** | PapaParse (JS) |
| **Deployment** | Vercel (Frontend), Render / Railway (Backend) |

---

## How to Run Locally
1.  **Clone the repository:** `git clone <repo-url>`
2.  **Setup Backend:** `cd backend && npm install`
3.  **Environment Variables:** Create a `.env` file and add your `OPENAI_API_KEY`.
4.  **Start Backend:** `npm start`
5.  **Setup Frontend:** `cd frontend && npm install`
6.  **Start Frontend:** `npm run dev`

---