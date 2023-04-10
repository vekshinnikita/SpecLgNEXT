from pyrogram import Client, filters
from typing import List
from env import api_hash, api_id

async def user_make_mailing(chat_ids: List[int], message: str) -> bool:
    app = Client("my_account2", api_id=api_id, api_hash=api_hash, no_updates=True)
    async with app:
        try:
            for chat_id in chat_ids:
                await app.send_message(chat_id=chat_id, text=message)
            return True
        except:
            return False
        
    