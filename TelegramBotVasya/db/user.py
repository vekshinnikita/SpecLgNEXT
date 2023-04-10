from .base import BaseModel
from sqlalchemy import Column, Integer, VARCHAR, ForeignKey, String,BigInteger


class User(BaseModel):
    __tablename__ = 'users'

    id = Column(Integer, primary_key=True)
    telegram_user_id = Column(BigInteger, unique=True, nullable=False)
    username = Column(VARCHAR(32), nullable=True)


    def __str__(self):
        return f'User {self.telegram_user_id}: {self.username}'

class MailingChat(BaseModel):
    __tablename__ = 'mailing_chat'

    id = Column(Integer, primary_key=True)
    chat_name = Column(VARCHAR(100), nullable=True)
    user_id = Column(BigInteger, ForeignKey('users.id'), nullable=False)
    chat_id = Column(BigInteger, nullable=False)
    
class AnalysisChat(BaseModel):
    __tablename__ = 'analysis_chat'

    id = Column(Integer, primary_key=True)
    chat_name = Column(VARCHAR(100), nullable=True)
    user_id = Column(BigInteger, ForeignKey('users.id'), nullable=False)
    chat_id = Column(BigInteger, nullable=False)

class Keywords(BaseModel):
    __tablename__ = 'keywords'
    id = Column(Integer, primary_key=True)
    word = Column(VARCHAR(150), nullable=True)
    user_id = Column(BigInteger, ForeignKey('users.id'), nullable=False)
