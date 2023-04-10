all = ['start', 'register_user_commands']

from aiogram import Router, F
from aiogram.filters import Command

from .start import start
from .add_mailing_chat import add_mailing_chat, AddMailingState, add_mailing_chat_by_id
from .add_analysis_chat import add_analisis_chat, AddAnalysisState, add_analisys_chat_by_id
from .delete_mailing_chat import delete_mailing_chat, delete_mailing_chat_by_id, DeleteMailingState
from .delete_analysis_chat import delete_analysis_chat, delete_analysis_chat_by_id, DeleteAnalysisState
from .make_mailing import make_mailing, mailing, MakeMailingState
from .add_keyword import add_keyword, add_keyword_text, AddKeywordState
from .delete_keyword import delete_keyword, delete_keyword_text, DeleteKeywordsState
from .settings import settings, settings_back, SettingsState
from .command_not_finded import command_not_finded


def register_user_commands(router: Router) -> None:
    router.message.register(start , F.text.lower() == 'старт')
    router.message.register(start , Command(commands=['start']))
    router.message.register(settings ,F.text.lower().find('настройки') != -1)

    router.message.register(mailing, F.text.lower().find('сделать рассыку') != -1)
    router.message.register(make_mailing, MakeMailingState.waiting_for_text)

    router.message.register(add_mailing_chat , F.text.lower().find('добавить чат рассылки') != -1)
    router.message.register(add_mailing_chat_by_id, AddMailingState.waiting_for_id)

    router.message.register(add_analisis_chat, F.text.lower().find('добавить чат анализа') != -1)
    router.message.register(add_analisys_chat_by_id, AddAnalysisState.waiting_for_id)

    router.message.register(delete_mailing_chat, F.text.lower().find('удалить чат рассылки') != -1)
    router.message.register(delete_mailing_chat_by_id, DeleteMailingState.waiting_for_id)

    router.message.register(delete_analysis_chat, F.text.lower().find('удалить чат анализа') != -1)
    router.message.register(delete_analysis_chat_by_id, DeleteAnalysisState.waiting_for_id)

    router.message.register(add_keyword, F.text.lower().find('добавить ключевую фразу') != -1)
    router.message.register(add_keyword_text, AddKeywordState.waiting_for_text)

    router.message.register(delete_keyword, F.text.lower().find('удалить ключевую фразу') != -1)
    router.message.register(delete_keyword_text, DeleteKeywordsState.waiting_for_text)


    #settings back
    
    router.message.register(settings_back, SettingsState.waiting_for_back)

    # Что-то пошло не так назад в меню
    router.message.register(command_not_finded)

    

