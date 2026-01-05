# AgeAdaptive Learner - Backend API

Backend service for the AgeAdaptive Learner application, powered by Google's Gemini API.

## Features

- 🎯 **Age-Appropriate Explanations** - Adapts responses for 4 age groups (Kids, Teens, Adults, Seniors)
- 🤖 **Gemini AI Integration** - Uses Google's Gemini Pro model for intelligent responses
- 🔄 **Multiple Modes** - Normal, AI-enhanced, and Hybrid explanation modes
- ⚡ **FastAPI** - High-performance async API
- 🛡️ **CORS Enabled** - Ready for frontend integration

## Setup Instructions

### 1. Get Your Gemini API Key

1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Click "Create API Key"
3. Copy your API key

### 2. Install Dependencies

```bash
# Navigate to backend directory
cd backend

# Install Python packages
pip install -r requirements.txt
```

### 3. Configure Environment Variables

```bash
# Copy the example environment file
copy .env.example .env

# Open .env and add your API key
# Replace 'your_gemini_api_key_here' with your actual API key
```

Your `.env` file should look like:
```
GEMINI_API_KEY=AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
```

### 4. Run the Server

```bash
# Start the development server
python main.py

# Or use uvicorn directly
uvicorn main:app --reload --host 127.0.0.1 --port 8000
```

The API will be available at `http://127.0.0.1:8000`

## API Endpoints

### Health Check
```bash
GET http://127.0.0.1:8000/health
```

### Explain Question
```bash
POST http://127.0.0.1:8000/explain

Body:
{
  "question": "What is gravity?",
  "age": 10,
  "mode": "normal"
}
```

**Parameters:**
- `question` (string) - The question to be answered
- `age` (integer) - User's age (5-100)
- `mode` (string) - Explanation mode: "normal", "ai", or "hybrid"

**Response:**
```json
{
  "answer": "Gravity is like...",
  "final_answer": "Gravity is like...",
  "explanation": "Gravity is like...",
  "age_group": "Kids (5-10)",
  "mode": "normal"
}
```

## Age Groups & Adaptations

| Age Range | Group | Style | Complexity |
|-----------|-------|-------|------------|
| 5-10 | Kids | Playful, simple, emoji-friendly | Elementary school |
| 11-17 | Teens | Engaging, relatable, modern | Middle/High school |
| 18-30 | Adults | Professional, concise | College level |
| 30+ | Seniors | Clear, thorough | Comprehensive |

## Explanation Modes

- **Normal**: Straightforward, age-appropriate explanation
- **AI**: Includes technical details and AI/technology aspects
- **Hybrid**: Balanced explanation with fun facts and applications

## Testing

### Test with curl:
```bash
# Test health endpoint
curl http://127.0.0.1:8000/health

# Test explain endpoint
curl -X POST http://127.0.0.1:8000/explain \
  -H "Content-Type: application/json" \
  -d "{\"question\":\"What is the sun?\",\"age\":8,\"mode\":\"normal\"}"
```

### Test with the Frontend:
1. Start the backend server (port 8000)
2. Start the frontend server (port 3000)
3. Open browser and test different age groups

## Troubleshooting

### "GEMINI_API_KEY not found"
- Make sure you created a `.env` file in the backend directory
- Verify your API key is correctly copied (no extra spaces)
- Restart the server after creating `.env`

### CORS Errors
- Make sure frontend is running on `http://localhost:3000`
- Check that the backend is running on `http://127.0.0.1:8000`

### API Rate Limits
- Gemini API has rate limits on the free tier
- If you get rate limit errors, wait a few minutes and try again

## Development

The backend uses:
- **FastAPI** - Modern Python web framework
- **Pydantic** - Data validation
- **google-generativeai** - Official Gemini SDK
- **python-dotenv** - Environment management

## License

Part of the AgeAdaptive Learner project.
