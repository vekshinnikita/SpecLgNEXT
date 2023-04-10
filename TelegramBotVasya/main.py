from aiogram import Dispatcher, Bot, Router
from aiogram.types import BotCommand
from multiprocessing import Process,Queue,Pipe
from multiprocessing import set_start_method
from aiogram.fsm.storage.memory import MemoryStorage
import asyncio
import logging


from multiprocessing import Process,Queue,Pipe
from pyrogram.handlers import MessageHandler
from sqlalchemy.engine import URL

from commands import register_user_commands
from db import db_engine, get_session_maker, proccesed_schemas, BaseModel
from middleware import AuthMiddleware
from env import bot_token
# from user_bot import run_user_bot



async def main() -> None:
    logging.basicConfig(level=logging.DEBUG)

    storage = MemoryStorage()
    
    dp = Dispatcher(storage=storage)
    router = Router()
    bot = Bot(token=bot_token)
    

    session_maker = get_session_maker(db_engine)
    await proccesed_schemas(db_engine, BaseModel.metadata)

    #Middlewares
    dp.message.middleware(AuthMiddleware())
    dp.callback_query.middleware(AuthMiddleware())


    register_user_commands(router)
    dp.include_router(router)

    with session_maker() as session:
        await dp.start_polling(bot, session=session)


def run_main():
    asyncio.run(main())


if __name__=='__main__':
    try:
        # set_start_method('fork')
        
        # p1 = Process(target=run_main, args=())
        # p1.start()

        asyncio.run(main())

        # run_user_bot()

    except (KeyboardInterrupt, SystemExit):
        print('Bot Stopped')



