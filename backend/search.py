import requests
import nltk
from nltk.sentiment.vader import SentimentIntensityAnalyzer
from groq import Groq

# Global variable to cache the sentiment analyzer
_sentiment_analyzer = None

def vader(scraped_text):
    global _sentiment_analyzer
    
    try:
        nltk.data.find('vader_lexicon.zip')
    except LookupError:
        nltk.download('vader_lexicon')
    
    # Initialize analyzer only once and cache it
    if _sentiment_analyzer is None:
        print("Loading VADER sentiment analyzer (this will only happen once)...")
        _sentiment_analyzer = SentimentIntensityAnalyzer()
    
    def analyze_sentiment(text):
        """Analyzes the sentiment of a given text using VADER.

        Args:
            text: The text to analyze.

        Returns:
            A dictionary containing the sentiment scores (positive, negative, neutral, compound).
            Returns None if there is an error.
        """
        try:
            scores = _sentiment_analyzer.polarity_scores(text)
            return scores
        except Exception as e:
            print(f"Error during sentiment analysis: {e}")
            return None
    
    texts = scraped_text
    final = texts
    for i,text in enumerate(scraped_text):
        title, desc = text
        sentiment = analyze_sentiment(desc)
        if sentiment:
            print(f"Text: \"{title}\"")
            print(f"Scores: {sentiment}")
            print("-" * 20)
            final[i].append(sentiment['compound'])
        else:
            print(f"Could not analyze: {text}")
    
    return final
    

def groq(final,api_key, threshold= -0.3, model= "llama-3.3-70b-versatile",\
         temperature = 1, max_tokens = 1024):

    final_filtered = []
    ranking = []
    threshold = -0.3
    for list in final:
        if list[2] < threshold: 
            final_filtered.append([list[0], list[1]])
            ranking.append([list[0], list[2]])

    print("FINALISED FILTERED TEXT")
    print("Printing out rankings...")
    print("--------------------")
    for rank in ranking: 
        print(rank)
    #print(ranking)
    print("--------------------")
    instruct = "I will provide you with a list of Reddit threads, where each thread is represented as [Title, Description]. \
    Your task is to analyze these threads and determine which one is the most shocking and interesting. \
    Consider both the level of surprise and the overall intrigue of the content when making your decision.\
    Return your answer in the following format: \
    \n[Title of the most shocking/interesting thread]\
    \
    \n \
    Return this format and only this format, nothing else \
    "
    client = Groq(api_key=api_key)
    completion = client.chat.completions.create(
        model=model,
        messages=[
            {
                "role": "user",
                "content": instruct + f"\n\n{final_filtered}"
            }
        ],
        temperature=temperature,
        max_tokens=max_tokens,
        top_p=1,
        stream=True,
        stop=None,
    )
    combined_string = ''
    for chunk in completion:
        print(chunk.choices[0].delta.content or "", end="")
        combined_string = ''.join(chunk.choices[0].delta.content or "" for chunk in completion if chunk is not None)
    print(combined_string)
    map = {}
    for text in final_filtered:
        if text[0] == combined_string:
            map['title'] = text[0]
            map['desc'] = text[1]
            return map
    
    print("Error within Groq! Try again!")
    return

def clear_sentiment_cache():
    """Clear the cached sentiment analyzer to free up memory."""
    global _sentiment_analyzer
    if _sentiment_analyzer is not None:
        del _sentiment_analyzer
        _sentiment_analyzer = None
        print("Sentiment analyzer cache cleared.")

