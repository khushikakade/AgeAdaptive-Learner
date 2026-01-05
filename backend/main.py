from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from huggingface_service import HuggingFaceService
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

app = FastAPI(title="AgeAdaptive Learner API")

# CORS configuration for frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize Hugging Face service
huggingface_service = HuggingFaceService()


# Request/Response models
class ExplainRequest(BaseModel):
    question: str
    age: int
    mode: str  # "normal", "ai", or "hybrid"


class ExplainResponse(BaseModel):
    answer: str
    final_answer: str  # Alias for frontend compatibility
    explanation: str  # Alias for frontend compatibility
    age_group: str
    mode: str


@app.get("/")
async def root():
    return {"message": "AgeAdaptive Learner API is running"}


@app.get("/health")
async def health_check():
    return {"status": "healthy", "service": "AgeAdaptive Learner"}


@app.post("/explain", response_model=ExplainResponse)
async def explain_question(request: ExplainRequest):
    """
    Generate age-appropriate explanation for a question using Hugging Face API
    """
    try:
        # Validate inputs
        if not request.question or len(request.question.strip()) == 0:
            raise HTTPException(status_code=400, detail="Question cannot be empty")
        
        if request.age < 5 or request.age > 100:
            raise HTTPException(status_code=400, detail="Age must be between 5 and 100")
        
        if request.mode not in ["normal", "ai", "hybrid"]:
            raise HTTPException(status_code=400, detail="Mode must be 'normal', 'ai', or 'hybrid'")
        
        # Get explanation from Hugging Face
        result = await huggingface_service.get_explanation(
            question=request.question,
            age=request.age,
            mode=request.mode
        )
        
        # Determine age group for display
        if request.age <= 10:
            age_group = "Kids (5-10)"
        elif request.age <= 17:
            age_group = "Teens (11-17)"
        elif request.age <= 30:
            age_group = "Adults (18-30)"
        else:
            age_group = "Seniors (30+)"
        
        # Return response with multiple aliases for frontend compatibility
        return ExplainResponse(
            answer=result,
            final_answer=result,
            explanation=result,
            age_group=age_group,
            mode=request.mode
        )
    
    except HTTPException:
        raise
    except Exception as e:
        print(f"Error in explain_question: {str(e)}")
        raise HTTPException(
            status_code=500,
            detail=f"Failed to generate explanation: {str(e)}"
        )


if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True)
