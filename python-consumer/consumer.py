from kafka import KafkaConsumer

consumer = KafkaConsumer("test-topic", bootstrap_servers='172.18.0.9:9093', group_id='test-consumer-group')

for msg in consumer:
    print (msg)