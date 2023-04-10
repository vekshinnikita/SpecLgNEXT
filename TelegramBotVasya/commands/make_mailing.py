from aiogram import types
from aiogram.fsm.context import FSMContext
from aiogram.filters.state import State, StatesGroup
from db.user import User, MailingChat
from sqlalchemy.orm import Session

from aiogram.utils.keyboard import ReplyKeyboardBuilder


from services import user_get_id_pyrogram, user_make_mailing

from templates_button import main_menu


class MakeMailingState(StatesGroup):
    waiting_for_text = State()

async def mailing(message: types.Message, session: Session, state: FSMContext):
    await state.clear()
    await state.set_state(MakeMailingState.waiting_for_text)
    builder = ReplyKeyboardBuilder()
    builder.row(types.KeyboardButton(
            text='❌ Отмена ❌',
            ))
    await message.answer('✍️ Введите сообщение для рассылки', reply_markup=builder.as_markup())

async def make_mailing(message: types.Message, session:Session , state: FSMContext):
    # Отмена
    if message.text.lower().strip() == '❌ отмена ❌':
        await state.clear()
        return message.answer('Отмена', reply_markup=main_menu())


    db_chats = session.query(MailingChat).join(User).filter(User.telegram_user_id==message.from_user.id)

    if db_chats.count() < 1:
        return message.answer('⚠️ У вас нет чатов для рассылки', reply_markup=main_menu())

    chat_ids = []
    for chat in db_chats.all():
        chat_ids.append(chat.chat_id)
    

    if await user_get_id_pyrogram() == message.from_user.id:

        verif = await user_make_mailing(chat_ids, message.text)
        if verif:
            await message.answer('✅ Рассылка успешно произведена', reply_markup=main_menu())
        else:
            await message.answer('❌ Что-то пошло не так...', reply_markup=main_menu())
    else:
        await message.answer('❌ У вас нет прав для того чтобы рассылать сообщения', reply_markup=main_menu())

    await state.clear()