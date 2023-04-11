from pyrogram import Client, filters, idle
from env import api_hash, api_id
from pyrogram.types import Message
from db.user import User, AnalysisChat, Keywords
from services import send_message_from_bot
from db import db_engine, get_session_maker
from services import is_keywords_in_text
from services import get_formated_text


# def run_user_bot():
app = Client('my_account', api_id=api_id, api_hash=api_hash)
session_maker = get_session_maker(db_engine)

@app.on_message()
async def hello(client, message: Message):
    print('hello')
    if not message.outgoing:
        me = await app.get_users('me')
        with session_maker() as session:
            db_chats_analysis = session.query(AnalysisChat).join(User).filter(User.telegram_user_id==me.id)
            chat_ids = []

            for chat in db_chats_analysis.all():
                chat_ids.append(chat.chat_id)

            result = session.query(Keywords).join(User).filter(User.telegram_user_id==me.id).all()

            keywords = []
            for word in result:
                keywords.append(word.word)

            if int(message.chat.id) in chat_ids:

                if is_keywords_in_text(message.text, keywords):
                    
                    (title, date, msg) = get_formated_text(message, keywords)
                    await send_message_from_bot(me.id, title, date, msg)

if __name__=='__main__':
    try:
        app.run()
    except Exception as inst:
        print(type(inst)) 
        
