from .celery import app
from .service import send


@app.task
def send_order_mail(dict):
    send(dict)