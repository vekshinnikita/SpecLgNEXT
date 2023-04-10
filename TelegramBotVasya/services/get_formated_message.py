from pyrogram.types import Message
from typing import List

def get_formated_text(message: Message, keywords: List[str]):

    title = None
    date = message.date.strftime('%H:%M')


    if message.chat.title:
        title=message.chat.title
    else: 
        if message.chat.first_name and message.chat.username:
            title=f'{message.chat.first_name}({message.chat.username})'
        elif message.chat.first_name:
            title=f'{message.chat.first_name}'
        elif message.chat.username:
            title=f'{message.chat.username}'
        else:
            title=None

    
    msg = message.text


    
    func = lambda x: x.strip()

    for keyword in keywords:
        sep = list(map(func, keyword.split('+')))
        count = 0
        for word in sep:

            index = msg.lower().find(word)
            if index != -1:
                msg = f'{msg[:index]}<b>{msg[index:index+len(word)]}</b>{msg[index+len(word):]}'
                count += 1

        if count == len(sep):
            break
        else:
            msg = message.text


    return (title, date, msg )