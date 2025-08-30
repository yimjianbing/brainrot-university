import requests



### main scripts used for scraping the text
def scrape(reddit_url):
    map = {}
    headers = {'User-agent': 'Mozilla/5.0'}
    r = requests.get(reddit_url + "/.json", headers=headers)
    data = r.json()  # Parse JSON data
    self_text = data[0]['data']['children'][0]['data']['selftext']
    title = data[0]['data']['children'][0]['data']['title']
    map['title'] = title
    map['desc'] = self_text
    print("Scraped! Currently saving ...")
    return map

def scrape_llm(reddit_url):
    headers = {'User-agent': 'Mozilla/5.0'}
    r = requests.get(reddit_url + "/.json", headers=headers)
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
