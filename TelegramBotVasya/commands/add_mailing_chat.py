from aiogram import types
from aiogram.filters import command
from aiogram.fsm.context import FSMContext
from aiogram.filters.state import State, StatesGroup
from aiogram.utils.keyboard import ReplyKeyboardBuilder
from sqlalchemy.orm import Session
from sqlalchemy.engine import ScalarResult

from sqlalchemy.engine import ScalarResult
from db.user import User, MailingChat
from services import get_my_chats, user_get_id_pyrogram
from templates_button import main_menu


class AddMailingState(StatesGroup):
    waiting_for_id = State()
    

async def add_mailing_chat(message: types.Message, session:Session , state: FSMContext) -> None:
    await state.clear()
    if await user_get_id_pyrogram() == message.from_user.id:

        chats = await get_my_chats()

        builder = ReplyKeyboardBuilder()

        builder.row(types.KeyboardButton(
                text='❌ Отмена ❌',
                ))

        for i in range(len(chats)):
            builder.add(types.KeyboardButton(
                text=chats[i]['title'],
                ))
        builder.adjust(1,2)

        await state.set_state(AddMailingState.waiting_for_id)
        await state.update_data(user_chats=chats)

        return message.answer(
                    'Для того чтобы добавить чат для рассылки\n'
                    'выберите чат из списка',
                    reply_markup=builder.as_markup(resize_keyboard=True)
                )
    else:
        await message.answer('❌ У вас нет прав для того чтобы рассылать сообщения', reply_markup=main_menu())


async def add_mailing_chat_by_id(message: types.Message, session:Session , state: FSMContext):

    # Отмена
    if message.text.lower().strip() == '❌ отмена ❌':
        await state.clear()
        return message.answer('Отмена', reply_markup=main_menu())

    data: dict = await state.get_data()
    chats = data.get('user_chats')
    await state.clear()
    

    flag = False
    chat = {}
    # Проверка есть ли название чата в списке чатов
    for i in chats:
        if i['title'] == message.text:
            
            flag = True
            chat['id'] = int(i['id'])
            chat['name'] = i['title']

    if not flag:
        return await message.answer('❌ Этого чата нет в списке', reply_markup=main_menu()) 
    result = session.query(MailingChat.id).join(User).filter(User.telegram_user_id==message.from_user.id,
                                MailingChat.chat_id==chat['id']).count() > 0
        
    if not result:
        user: User = session.query(User).filter(User.telegram_user_id == message.from_user.id).first()
        new_mailing_chat = MailingChat(
            user_id=user.id,
            chat_id=chat['id'],
            chat_name=chat['name']
        )
        session.add(new_mailing_chat)
        session.commit()
        await message.answer('✅ Чат успешно добавлен для рассылки', reply_markup=main_menu()) 
    else: 
        await message.answer('⚠️ Вы уже добавляли этот чат', reply_markup=main_menu()) 