from typing import List

def is_keywords_in_text(text: str, keywords: List[str]):

    flag = False
    text = text.lower()

    func = lambda x: x.strip()
    count = 0

    for keyword in keywords:
        sep = list(map(func, keyword.split('+')))
        count = 0
        for word in sep:
            index = text.find(word)
            if index != -1:
                count += 1
        if count == len(sep):
            flag = True
            break

    return flag