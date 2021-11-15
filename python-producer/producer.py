from kafka import KafkaProducer
import time

producer = KafkaProducer(bootstrap_servers="kafka:9092")

while True:

    message = b"Hello From Python " + bytes(str(time.time()), "utf-8")

    producer.send("test-topic", key=b"python-message", value=message)
    print(message)
    time.sleep(2)