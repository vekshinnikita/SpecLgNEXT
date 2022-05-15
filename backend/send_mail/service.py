from email import message
from django.core.mail import send_mail
from backend.settings import RECIPIENT_EMAIL

template = {
    'type': 'Вид перевозки:',
    'name': 'Имя заказчика:',
    'phone': 'Телефон:',
    'from': 'Откуда:',
    'to': "Куда:",
    'weight': 'Вес:',
    'volume': 'Объём:',
    'comment': 'Комментарий:'
}

def send(dict):
    list = []

    for i in dict:
        list.append(template[i] + ' ' + dict[i])

    message = '\n'.join(list)

    send_mail(
        'ЗАКАЗ',
        message,
        'SUPPORT',
        recipient_list=[RECIPIENT_EMAIL],
        fail_silently=False,
    )