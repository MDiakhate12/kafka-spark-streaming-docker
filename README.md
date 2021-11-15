# Streaming data from Kafka Topic to Spark using Spark Structured Streaming

## Workflow

This project is a simple kafka and spark streaming architecture.
A docker-compose file initialize a kafka cluster and a spark cluster with all their dependencies.
Producers send text messages to kafka a topic named "test-topic".
You can either consume messages with consumers scripts written in NodeJS and Python or stream data with spark streaming which simply print on the console all received data.

> Warning: The data streaming only works with spark in scala for now, python version is in progress

<img src="architecture.png" />

Everything is automatic in this project.

All you have to do is run a simple script that will trigger everything.

You can then dive deeper into code and play around with it to get your hands dirty 😊

## Requirements

> Note: A fully dockerized version will be available soon 😊, this will eliminate the need of version requirements 

Please make sure those versions are installed on your computer:
*   docker >= 19.X.X
*   docker-compose ~1.29.2
*   python3 ~3.8.10
*   python3-v
*   pip ~20.0.2 (pip3)
*   scala =2.12.15 (important !)
*   sbt =1.5.5 (important!)
*   node ~14.X.X
*   npm ~8.X.X

> Please make sure:
*   you can run commands with root privileges on your computer
*   your port 8080 is not in use
*   the subnet 172.18.0.0/24 is not in use in your computer

## Project folder structure
```bash
.
├── clean-env.sh............ # Cleans the environment
├── docker-compose.yml...... # Create kafka and spark clusters
├── nodejs-consumer......... # Consumes messages from kafka
│   ├── consumer.js
│   ├── node_modules
│   ├── package.json
│   └── package-lock.json
├── nodejs-producer......... # Produces messages to kafka
│   ├── node_modules
│   ├── package.json
│   ├── package-lock.json
│   └── producer.js
├── python-consumer......... # Consumes messages to kafka
│   └── consumer.py
├── python-producer......... # Produces messages to kafka
│   └── producer.py
├── README.md
├── run.sh.................. # Runs the entire environment
└── spark-streaming......... # Consume streaming data from kafka and sinks to console
    ├── python.............. # Streaming with python (Work In Progress)
    └── scala............... # Streaming with scala
```

## Running services

| service name             | address[:port]   |
|--------------------------|------------------|
| zookeeper                | 172.18.0.8:2181  |
| kafka (from host)        | 172.18.0.9:9093  |
| kafka (inside container) | 172.18.0.9:9092  |
| spark master             | 172.18.0.10:7077 |
| spark UI                 | 172.18.0.10:8080 |
| spark worker 1           | 172.18.0.11      |
| spark worker 2           | 172.18.0.12      |

The project creates a docker network name "kafka-spark" on the address range 172.18.0.0/24

## Getting Started

> Note: You can go through the docker-compose.yml or the run.sh files to better understand how things work. 

### 1. Clone the repo and cd into the folder
```
    git clone https://github.com/MDiakhate12/kafka-spark-streaming-docker.git
    cd kafka-spark-streaming-docker/
```

### 2. Make run.sh and clean.sh files executable
```
sudo chmod +x run.sh clean-env.sh
```

### 3. Execute the run.sh (make sure to have root privileges) 
```
source run.sh
```
> !Important: Don't close the terminal after you have executed run.sh <br>
> Note: You might be prompted to enter your root password if your user do not have enough privileges

### 4. Execute one or two producers
> Note: Please replace /PATH/TO/YOUR/FOLDER with the folder your have cloned the repo into. <br>
> Note: The NodeJS and Python consumers can be run the same way list below.

Open another terminal and do:

1. For NodeJS producer:
```bash
# Go to the node-producer folder
cd /PATH/TO/YOUR/FOLDER/kafka-spark-streaming-docker/node-producer

# Run the command:
node producer.js
```
2.  For Python producer:

```bash
# Go to the python-producer folder
cd /PATH/TO/YOUR/FOLDER/kafka-spark-streaming-docker/python-producer

# Activate the python virtual environment:
source ../venv/bin/activate # if you are in the right folder, this relative path should work

# Run this command:
python3 producer.py
```
### 5. Look at the result

#### On console
Go back to the terminal (where you have executed run.sh) and look at the output.
You will see that it prints continuously data received from producer(s) in a a tabular format with key and value.

Your output will look like this

![Screenshot from 2021-11-15 05-15-41](https://user-images.githubusercontent.com/46793415/141721499-a248453e-4a7f-4d5e-88ea-c353de7922b9.png)

#### On UI

The spark UI is available at http://172.18.0.10:8080

#### Logs

You can follow logs of a service by using : <br>

```
docker-compose logs -f [SERVICE_NAME]
```

Available services are:
1.  zookeeper
2.  kafka
3.  spark
4.  spark-worker-1
5.  spark-worker-2
