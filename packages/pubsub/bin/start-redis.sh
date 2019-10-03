#!/bin/bash
if [ -z "$CI" ]; then
  BASE_DIR=`dirname "$0"`
  $BASE_DIR/stop-redis.sh

  REDIS_CONTAINER_NAME="pubsub_test_redis"
  docker pull redis:latest
  docker run --name $REDIS_CONTAINER_NAME -p 6379:6379 -d redis:latest
fi
