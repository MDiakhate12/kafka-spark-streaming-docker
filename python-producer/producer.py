from kafka import KafkaProducer
import time

producer = KafkaProducer(bootstrap_servers="172.18.0.9:9093")

while True:

    message = b"Hello From Python " + bytes(str(time.time()), "utf-8")

    producer.send("test-topic", key=b"python-message", value=message)
    print(message)
    time.sleep(2)