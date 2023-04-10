from pyrogram import Client, filters
from env import api_hash, api_id

async def get_my_chats():
    app = Client("my_account2", api_id=api_id, api_hash=api_hash, no_updates=True)
    async with app:
        me = await app.get_users("me")
        chats = []
        async for d in app.get_dialogs(limit=15):
            dict = {'id': d.chat.id}
            if d.chat.title:
                dict['title']=d.chat.title
            else: 
                if d.chat.first_name and d.chat.username:
                    dict['title']=f'{d.chat.first_name}({d.chat.username})'
                elif d.chat.first_name:
                    dict['title']=f'{d.chat.first_name}'
                elif d.chat.username:
                    dict['title']=f'{d.chat.username}'
                else:
                    dict['title']=None
            if (dict['title']) and (me.id != d.chat.id):
                chats.append(dict)

        return chats
    