#!/bin/bash

rm -rf venv
 
docker-compose down

docker volume prune -f

sudo rm -rf spark-streaming/scala/project spark-streaming/scala/target ./jars_dir