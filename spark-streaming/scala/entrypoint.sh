#!/bin/bash

set -e

sbt package && \
ls -l target/scala-2.12/ && \
sbt 
