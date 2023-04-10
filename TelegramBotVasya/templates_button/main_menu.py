from aiogram.utils.keyboard import ReplyKeyboardBuilder


def main_menu(): 
    buttons = ReplyKeyboardBuilder()
    buttons.button(text='Настройки ⚙')
    buttons.button(text='Сделать рассыку ✉')
    buttons.adjust(2)
    
    return buttons.as_markup(resize_keyboard=True)