from aiogram import types
from aiogram.filters import command
from aiogram.fsm.context import FSMContext
from aiogram.filters.state import State, StatesGroup
from aiogram.utils.keyboard import ReplyKeyboardBuilder
from sqlalchemy.orm import Session
from sqlalchemy.engine import ScalarResult
from sqlalchemy import select

from sqlalchemy.engine import ScalarResult
from db import Keywords, User
from services import get_my_chats
from templates_button import main_menu


class DeleteKeywordsState(StatesGroup):
    waiting_for_text = State()
    

async def delete_keyword(message: types.Message, session:Session , state: FSMContext) -> None:
    await state.clear()
    db_chats = session.query(Keywords).join(User).filter(User.telegram_user_id==message.from_user.id)

    if db_chats.count() < 1:
        return message.answer('Список с ключевыми словами пуст', reply_markup=main_menu())

    keywords = []

    for i in db_chats.all():
        keywords.append({
            'id': i.id,
            'keyword': i.word
        })

    builder = ReplyKeyboardBuilder()

    builder.row(types.KeyboardButton(
            text='❌ Отмена ❌',
            ))

    for i in range(len(keywords)):
        builder.add(types.KeyboardButton(
            text=keywords[i]['keyword'],
            ))
    builder.adjust(1,2)

    await state.set_state(DeleteKeywordsState.waiting_for_text)
    await state.update_data(keywords=keywords)

    return message.answer(
                'Выберите из списка слово, которое хотите удалить',
                reply_markup=builder.as_markup(resize_keyboard=True)
            )

async def delete_keyword_text(message: types.Message, session:Session , state: FSMContext):
    # Отмена
    if message.text.lower().strip() == '❌ отмена ❌':
        await state.clear()
        return message.answer('Отмена', reply_markup=main_menu())


    data: dict = await state.get_data()
    keywords = data.get('keywords')
    await state.clear()
    
    flag = False
    keyword = ''
    # Проверка
    for i in keywords:
        if i['keyword'] == message.text: 
            flag = True
            keyword = i['keyword']

    if not flag:
        return await message.answer('Такого слова нет в списки', reply_markup=main_menu())
    
    keyword = session.query(Keywords).join(User).filter(User.telegram_user_id==message.from_user.id,
                                Keywords.word==keyword).one()
    
    if keyword:
        session.delete(keyword)
        session.commit()
        await message.answer('✅ Слово удалено', reply_markup=main_menu()) 
    else: 
        await message.answer('❌ Этого слова нет в списке', reply_markup=main_menu()) 