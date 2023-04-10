from aiogram import types
from aiogram.filters import command
from aiogram.fsm.context import FSMContext
from aiogram.filters.state import State, StatesGroup
from aiogram.utils.keyboard import ReplyKeyboardBuilder
from sqlalchemy.orm import Session
from sqlalchemy.engine import ScalarResult
from sqlalchemy import select

from sqlalchemy.engine import ScalarResult
from db.user import User, AnalysisChat
from services import get_my_chats
from templates_button import main_menu


class DeleteAnalysisState(StatesGroup):
    waiting_for_id = State()
    

async def delete_analysis_chat(message: types.Message, session: Session , state: FSMContext) -> None:
    await state.clear()
    db_chats = session.query(AnalysisChat).join(User).filter(User.telegram_user_id==message.from_user.id)

    if len(db_chats.all()) < 1:
        return message.answer('⚠️ У вас нет чатов для анализа', reply_markup=main_menu())

    chats = []

    for i in db_chats.all():
        chats.append({
            'id': i.chat_id,
            'title': i.chat_name
        })


    builder = ReplyKeyboardBuilder()
    builder.row(types.KeyboardButton(
            text='❌ Отмена ❌',
            ))

    for i in range(len(chats)):
        builder.add(types.KeyboardButton(
            text=chats[i]['title'],
            ))
    builder.adjust(1,2)

    await state.set_state(DeleteAnalysisState.waiting_for_id)
    await state.update_data(user_chats=chats)

    return message.answer(
                'Для того чтобы удалить чат из списка анализа\n'
                'выберите чат из списка',
                reply_markup=builder.as_markup(resize_keyboard=True)
            )

async def delete_analysis_chat_by_id(message: types.Message, session:Session, state: FSMContext):

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
    

    mailing_chat = session.query(AnalysisChat).join(User).filter(User.telegram_user_id==message.from_user.id,
                                AnalysisChat.chat_id==chat['id']).one()
    
        
    if mailing_chat:
        session.delete(mailing_chat)
        session.commit()
        await message.answer('✅ Чат успешно удален из списка анализа', reply_markup=main_menu()) 
    else: 
        await message.answer('❌ Этого чата в списке нет', reply_markup=main_menu()) 