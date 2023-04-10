from pyrogram import Client
from pyrogram.raw.functions.contacts import ResolveUsername
from typing import Union

from env import api_hash, api_id

async def user_get_id_pyrogram() -> Union[int, None]:
    app = Client("my_account2", api_id=api_id, api_hash=api_hash, no_updates=True)
    async with app:
        me = await app.get_users("me")
        return me.id