from typing import Callable, Any, Dict, Union, Awaitable
from sqlalchemy import select
from sqlalchemy.engine import ScalarResult
from sqlalchemy.orm import Session

from aiogram import BaseMiddleware
from aiogram.types import Message, CallbackQuery

from db.user import User


class AuthMiddleware(BaseMiddleware):
    async def __call__(
            self,
            handler: Callable[[Message, Dict[str, Any]], Awaitable[Any]],
            event: Union[Message, CallbackQuery],
            data: Dict[str, Any],
            ) -> Any:

        session: Session = data.get('session')
        result: ScalarResult = session.execute(select(User).where(User.telegram_user_id == event.from_user.id))
        user: User = result.one_or_none()

        if user is None:
            new_user = User(
                telegram_user_id = event.from_user.id,
                username = event.from_user.username,
            )

            session.add(new_user)
            session.commit()
            if isinstance(event, Message):
                await event.answer('Ты успешно зарегистрирован!')
            else:
                await event.message.answer('Ты успешно зарегистрирован!')
                
        return await handler(event, data)