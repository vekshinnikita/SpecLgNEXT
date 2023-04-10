from aiogram.utils.keyboard import ReplyKeyboardBuilder


def settings(): 
    buttons = ReplyKeyboardBuilder()
    buttons.button(text='Добавить чат рассылки ✅✉')
    buttons.button(text='Удалить чат рассылки ❌✉')
    buttons.button(text='Добавить чат анализа ✅🔎')
    buttons.button(text='Удалить чат анализа ❌🔎')
    buttons.button(text='Добавить ключевую фразу ✅🔤')
    buttons.button(text='Удалить ключевую фразу ❌🔤')
    buttons.button(text='🔙 Назад')
    buttons.adjust(2)
    
    return buttons.as_markup(resize_keyboard=True)