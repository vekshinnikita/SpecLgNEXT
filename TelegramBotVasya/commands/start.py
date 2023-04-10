from aiogram import types
from templates_button import main_menu
from aiogram.fsm.context import FSMContext

async def start(message: types.Message, state:FSMContext) -> None:
    await state.clear()
    await message.answer(
        'Привет!\n'
        'Этот бот предназначен для рассылки сообщений по чатам\n'
        'И анализу сообщений в чата по ключевым словам\n'
        'Чтобы бот знал какие чаты нужно анализировать и по каким чатам делать рассылку, перейди в настроийки\n'
        'И добавь чаты\n\n'
        '⚠️ Внимание\n'
        '   Перед тем как будешь добовлять чаты в базу данных\n'
        '   Закрепи необходимые чаты в том аккаунте из которого будет делаться рассылка', 
        reply_markup=main_menu())