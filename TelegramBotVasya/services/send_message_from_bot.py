from pyrogram import Client, filters
from env import api_hash, api_id, bot_token
from pyrogram.enums import ParseMode

async def send_message_from_bot(chat_id: int, title:str , date:str, msg:str):
    bot = Client("Bot", bot_token=bot_token, api_id=api_id, api_hash=api_hash, no_updates=True)
    async with bot:

        html_message = f'Чат: {title}\n\n'\
                        f'Время: {date}\n\n'\
                        f'Сообщение: \n\t\t\t\t\t{msg}'

        await bot.send_message(chat_id=chat_id, text=html_message, parse_mode=ParseMode.HTML)
    