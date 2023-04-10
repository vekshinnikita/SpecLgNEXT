from aiogram import types
from templates_button import settings as settings_button, main_menu
from aiogram.filters.state import State, StatesGroup
from aiogram.fsm.context import FSMContext

class SettingsState(StatesGroup):
    waiting_for_back = State()

async def settings(message: types.Message, state:FSMContext) -> None:
    await state.clear()
    await state.set_state(SettingsState.waiting_for_back)
    await message.answer('Настроики', reply_markup=settings_button())

async def settings_back(message: types.Message, state: FSMContext) -> None:
    if message.text.lower().find('назад') != -1:
        await state.clear()
        return message.answer('Назад', reply_markup=main_menu())
    else:
        await message.answer('Неверная команда ❌')