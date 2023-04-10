FROM python:3.8.3

WORKDIR /usr/src/app
RUN mkdir /usr/src/app/TelegramBot
WORKDIR /usr/src/app/TelegramBot

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

RUN pip install --upgrade pip

COPY ./requirements.txt .
RUN pip install -r requirements.txt

COPY . .