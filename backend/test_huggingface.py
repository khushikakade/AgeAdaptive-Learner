import asyncio
import os
from dotenv import load_dotenv
from huggingface_service import HuggingFaceService

# Load env vars
load_dotenv()

async def test_explanation():
    try:
        print("Initializing HuggingFaceService...")
        service = HuggingFaceService()
        
        question = "Why do leaves change color in the fall?"
        print(f"\nTesting with question: '{question}'")
        
        # Test for a kid
        print("\n--- Testing Age 8 (Kids) ---")
        answer_kid = await service.get_explanation(question, 8, "normal")
        print(f"Response: {answer_kid[:100]}...")  # Print first 100 chars
        
        # Test for an adult
        print("\n--- Testing Age 25 (Adults) ---")
        answer_adult = await service.get_explanation(question, 25, "ai")
        print(f"Response: {answer_adult[:100]}...")
        
        print("\nSUCCESS: Hugging Face integration is working!")
        
    except Exception as e:
        print(f"\nFAILURE: {str(e)}")

if __name__ == "__main__":
    asyncio.run(test_explanation())
