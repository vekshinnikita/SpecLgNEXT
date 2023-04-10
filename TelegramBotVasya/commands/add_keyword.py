from aiogram import types
from aiogram.fsm.context import FSMContext
from aiogram.filters.state import State, StatesGroup
from sqlalchemy.orm import Session
from aiogram.utils.keyboard import ReplyKeyboardBuilder
from aiogram.enums import ParseMode

from db.user import User, Keywords
from templates_button import main_menu


class AddKeywordState(StatesGroup):
    waiting_for_text = State()
    
async def add_keyword(message: types.Message, session: Session, state: FSMContext) -> None:
    await state.clear()
    await state.set_state(AddKeywordState.waiting_for_text)
    builder = ReplyKeyboardBuilder()
    builder.row(types.KeyboardButton(
            text='❌ Отмена ❌',
            ))
    return message.answer(
                'Введите ключевую фразу\n'
                'Во фразу можно использовать "+" между словам\n'
                'Это будет значить что фраза будет искаться по отдельным словам в тексте\n\n'
                'Например 1:\n'
                '   Ключевое слово: грузоперевозки по россии\n\n'
                '   Найденный текст: "<b>Грузоперевозки по России</b>, Казахстан ..."\n\n'
                'Например 2:\n'
                '   Ключевое слово: аренда экскаватора + спб\n\n'
                '   Найденный текст: "<b>Аренда экскаватора</b> в пределах <b>СПБ</b>"',
                parse_mode=ParseMode.HTML,
                reply_markup=builder.as_markup()
            )


async def add_keyword_text(message: types.Message, session: Session , state: FSMContext):
    await state.clear()

    # Отмена
    if message.text.lower().strip() == '❌ отмена ❌':
        await state.clear()
        return message.answer('Отмена', reply_markup=main_menu())

    # Проверка
    if len(message.text) > 0:
        keyword = message.text.lower()

        result = session.query(Keywords.id).join(User).filter(User.telegram_user_id==message.from_user.id,
                                    Keywords.word==keyword).count() > 0
          
        if not result:
            user: User = session.query(User).filter(User.telegram_user_id == message.from_user.id).first()

            new_keyword= Keywords(
                user_id=user.id,
                word=keyword
            )
            session.add(new_keyword)
            session.commit()
            await message.answer('✅ Слово успешно добавлено в список', reply_markup=main_menu()) 
        else: 
            await message.answer('❌ Это слово уже присутствует в списке', reply_markup=main_menu()) 