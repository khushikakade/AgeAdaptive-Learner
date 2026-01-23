from huggingface_hub import InferenceClient
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

class HuggingFaceService:
    def __init__(self):
        """Initialize Hugging Face API with API key from environment"""
        api_key = os.getenv("HUGGINGFACE_API_KEY")
        
        if not api_key:
            raise ValueError(
                "HUGGINGFACE_API_KEY not found in environment variables. "
                "Please create a .env file with your API key."
            )
        
        # Using Qwen 2.5 7B Instruct which has excellent support on the HF Inference API
        self.model = "Qwen/Qwen2.5-7B-Instruct"
        self.client = InferenceClient(model=self.model, token=api_key)
    
    def _get_age_context(self, age: int) -> dict:
        """Get age-specific context for prompt engineering"""
        if age <= 10:
            return {
                "group": "young child (5-10 years old)",
                "style": "very simple, playful, fun",
                "vocabulary": "basic words a child would understand",
                "complexity": "explain like they're in elementary school",
                "length": "2-3 short sentences",
                "tone": "enthusiastic and encouraging, use emojis sparingly",
                "examples": "use relatable examples like toys, games, cartoons, animals"
            }
        elif age <= 17:
            return {
                "group": "teenager (11-17 years old)",
                "style": "engaging, relatable, modern",
                "vocabulary": "casual but educational language",
                "complexity": "middle school to high school level",
                "length": "3-4 sentences with some detail",
                "tone": "cool and informative, avoid being condescending",
                "examples": "use examples from social media, games, sports, pop culture"
            }
        elif age <= 30:
            return {
                "group": "young adult (18-30 years old)",
                "style": "professional, informative, concise",
                "vocabulary": "standard adult vocabulary",
                "complexity": "college-level understanding",
                "length": "4-5 detailed sentences",
                "tone": "direct and informative",
                "examples": "use real-world applications, career, technology examples"
            }
        else:
            return {
                "group": "mature adult (30+ years old)",
                "style": "clear, well-structured, patient",
                "vocabulary": "sophisticated but accessible language",
                "complexity": "comprehensive with context",
                "length": "5-6 well-explained sentences",
                "tone": "respectful and thorough",
                "examples": "use practical life examples, historical context when relevant"
            }
    
    def _build_prompt(self, question: str, age: int, mode: str) -> str:
        """Build age-appropriate prompt for Hugging Face Model"""
        context = self._get_age_context(age)
        
        # Base prompt structure
        base_prompt = f"""You are an expert educator explaining concepts to a {context['group']}.

Question: "{question}"

Instructions:
- Use {context['vocabulary']}
- Explain at {context['complexity']} level
- Keep response to {context['length']}
- Style should be {context['style']}
- Tone should be {context['tone']}
- Use {context['examples']}
"""
        
        # Mode-specific adjustments
        if mode == "ai":
            base_prompt += f"\n- Include some technical details that a {context['group']} can understand"
            base_prompt += "\n- Mention any relevant AI, technology, or scientific aspects"
        elif mode == "hybrid":
            base_prompt += f"\n- Balance simple explanation with interesting facts"
            base_prompt += "\n- Include one fun fact or real-world application"
        else:  # normal
            base_prompt += "\n- Focus on clear, straightforward explanation"
            base_prompt += "\n- Keep it simple and easy to understand"
        
        base_prompt += "\n\nProvide ONLY the explanation, no meta-commentary about how you're explaining it."
        
        return base_prompt
    
    async def get_explanation(self, question: str, age: int, mode: str) -> str:
        """
        Get age-appropriate explanation from Hugging Face Inference API
        """
        try:
            # Build the prompt
            prompt_content = self._build_prompt(question, age, mode)
            
            # Use chat_completion for chat model
            messages = [
                {"role": "user", "content": prompt_content}
            ]
            
            response = self.client.chat_completion(
                messages=messages,
                max_tokens=500,
                temperature=0.7
            )
            
            # Parse response
            if response and response.choices and len(response.choices) > 0:
                return response.choices[0].message.content.strip()
            
            return "I couldn't generate an explanation (Empty response)."
        
        except Exception as e:
            print(f"Hugging Face API error: {repr(e)}")
            raise Exception(f"Failed to get explanation from Hugging Face: {repr(e)}")
