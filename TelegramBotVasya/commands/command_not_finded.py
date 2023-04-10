from aiogram import types
from templates_button import main_menu
from aiogram.fsm.context import FSMContext

async def command_not_finded(message: types.Message, state:FSMContext) -> None:
    await state.clear()
    await message.answer(
        'Я не расспознал вашу команду\n'
        'Поэтому я перекинул вас в главное меню',
        reply_markup=main_menu())