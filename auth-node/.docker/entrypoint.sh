#!/bin/sh
sleep 10

npx prisma migrate dev

# install dependecies when node_modules doesn't exist
if [ ! -d "node_modules" ]; then
     echo "director node_modules doesn't exist, Installing dependencies..."
     npm install
fi

# execute default command passed to the container
exec "$@"
