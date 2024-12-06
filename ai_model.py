from transformers import AutoModelForCausalLM, AutoTokenizer
import torch

class LoveCoachAI:
    def __init__(self):
        # Utilisation du modèle GPT-2 français
        self.model_name = "microsoft/DialoGPT-medium"
        self.tokenizer = AutoTokenizer.from_pretrained(self.model_name)
        self.model = AutoModelForCausalLM.from_pretrained(self.model_name)
        
        # Configuration du contexte système
        self.system_context = """Je suis un coach relationnel expert et bienveillant. 
        Je donne des conseils pratiques et personnalisés pour aider les gens dans leur vie amoureuse.
        Je suis à l'écoute, empathique et professionnel."""
        
    def get_response(self, user_input):
        try:
            # Combine system context with user input
            full_input = f"{self.system_context}\nUser: {user_input}\nAssistant:"
            
            # Tokenize and generate response
            inputs = self.tokenizer.encode(full_input, return_tensors="pt")
            attention_mask = torch.ones(inputs.shape, dtype=torch.long)
            
            outputs = self.model.generate(
                inputs,
                attention_mask=attention_mask,
                max_length=200,
                num_return_sequences=1,
                no_repeat_ngram_size=2,
                do_sample=True,
                top_k=50,
                top_p=0.95,
                temperature=0.7,
                pad_token_id=self.tokenizer.eos_token_id
            )
            
            response = self.tokenizer.decode(outputs[0], skip_special_tokens=True)
            
            # Extract only the assistant's response
            response = response.split("Assistant:")[-1].strip()
            
            return response
            
        except Exception as e:
            print(f"Error generating response: {str(e)}")
            return "Je suis désolé, j'ai du mal à traiter votre demande. Pourriez-vous reformuler différemment ?"

# Singleton instance
love_coach = LoveCoachAI()
