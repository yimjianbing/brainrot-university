import os
import requests
from urllib.parse import urlparse, unquote, quote
from typing import Dict
from groq import Groq


WIKI_SUMMARY_BASE = "https://en.wikipedia.org/api/rest_v1/page/summary/"


def _parse_wikipedia_title(source: str) -> str:
    """Extract a Wikipedia page title from either a full URL or a raw title string.

    try:
        parsed = urlparse(source)
        if parsed.netloc and "/wiki/" in parsed.path:
            # URL form – take everything after /wiki/
            title_segment = parsed.path.split("/wiki/", 1)[1]
            return unquote(title_segment)
        # Not a URL – assume it's already a page title
        return source
    except Exception:
        return source


def _summarize_for_brainrot(text: str, *, api_key: str | None) -> str:
    """Condense long text into a very short, punchy summary using Groq if available.
    Falls back to a naive truncation if Groq is not configured.
    """
    text = (text or "").strip()
    if not text:
        return ""

    if not api_key:
        # Fallback: keep ~280 chars, prefer cutting at sentence boundary
        max_len = 280
        if len(text) <= max_len:
            return text
        cutoff = text.rfind(".", 0, max_len)
        if cutoff == -1:
            cutoff = max_len
        return text[:cutoff].strip() + "..."

    prompt = (
        "You will receive an encyclopedic paragraph from Wikipedia. "
        "Rewrite it into a punchy brainrot conversational style summary: "
        "max 500 words, casual, high-impact, no fluff, no citations, no markdown.\n\n"
        "Only return the summary, no other text, no Title and no summary\n\n"
        f"Input:\n{text}\n\nOutput:"
    )

    try:
        client = Groq(api_key=api_key)
        completion = client.chat.completions.create(
            model="llama-3.3-70b-versatile",
            messages=[{"role": "user", "content": prompt}],
            temperature=0.7,
            max_tokens=120,
            top_p=1,
            stream=False,
        )
        out = completion.choices[0].message.content or ""
        return out.strip()
    except Exception:
        # Silent fallback
        return _summarize_for_brainrot(text, api_key=None)


### main scripts used for scraping the text (now Wikipedia)
def scrape(source_url_or_title: str) -> Dict[str, str]:
    """Scrape a Wikipedia page and return a compact map with 'title' and 'desc'.

    - Accepts a full Wikipedia URL or a raw page title.
    - Fetches summary via REST API: /page/summary/{title}
    - Condenses text for short-form (brainrot) consumption using Groq when available.
    """
    page_title_raw = _parse_wikipedia_title(source_url_or_title)
    # The REST endpoint accepts percent-encoded title; underscores are fine as-is
    page_title_enc = quote(page_title_raw, safe="()_:")

    url = WIKI_SUMMARY_BASE + page_title_enc
    headers = {"User-Agent": "Brainrot-University/1.0"}
    r = requests.get(url, headers=headers, timeout=15)
    r.raise_for_status()
    data = r.json()

    title = data.get("title") or page_title_raw
    extract = data.get("extract") or ""

    api_key = os.getenv("GROQ_API_KEY")
    condensed = _summarize_for_brainrot(extract, api_key=api_key)

    result = {"title": title.strip(), "desc": condensed or extract.strip()}
    print("Scraped Wikipedia! Currently saving ...")
    return result

def scrape_llm(wiki_url):
    headers = {'User-agent': 'Mozilla/5.0'}
    r = requests.get(wiki_url + "/.json", headers=headers)
    data = r.json()  # Parse JSON data
    
    dist = data['data']['dist']
    self_text = data['data']['children']
    fin = []
    for i in range(dist):
        title = self_text[i]['data']['title']
        trimmed_title= title.strip()
        desc = self_text[i]['data']['selftext']
        trimmed_desc = desc.strip()
        fin.append([trimmed_title, trimmed_desc])
    
    return fin

def save_map_to_txt(map, file_path):
    with open(file_path, 'w', encoding='utf-8') as file:
        file.write(f"Title: {map['title']}\n")
        file.write(f"Description: {map['desc']}\n")
    print("SCRAPING DONE! SUCCESSFULLY SAVED")

def save_data_to_txt(data, file_path):
    """Save data to text file - handles both single dict and list of lists."""
    with open(file_path, 'w', encoding='utf-8') as file:
        if isinstance(data, dict):
            # Single post (from scrape function)
            file.write(f"Title: {data['title']}\n")
            file.write(f"Description: {data['desc']}\n")
        elif isinstance(data, list):
            # Multiple posts (from scrape_llm function)
            for i, (title, desc) in enumerate(data, 1):
                file.write(f"--- Post {i} ---\n")
                file.write(f"Title: {title}\n")
                file.write(f"Description: {desc}\n")
                file.write("\n" + "="*50 + "\n\n")
        else:
            raise ValueError("Data must be either a dict or list of [title, desc] pairs")
    print(f"DATA SAVED! Output written to {file_path}")

def save_llm_data_to_txt(llm_data, file_path):
    """Save the list of [title, description] pairs from scrape_llm to a text file."""
    with open(file_path, 'w', encoding='utf-8') as file:
        for i, (title, desc) in enumerate(llm_data, 1):
            file.write(f"--- Post {i} ---\n")
            file.write(f"Title: {title}\n")
            file.write(f"Description: {desc}\n")
            file.write("\n" + "="*50 + "\n\n")
    print(f"LLM SCRAPING DONE! {len(llm_data)} posts saved to {file_path}")
