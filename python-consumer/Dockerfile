FROM python:3

ADD consumer.py /

RUN pip install kafka-python

CMD [ "python", "./consumer.py" ]