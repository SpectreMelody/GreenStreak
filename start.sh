#!/bin/bash

echo "Please enter your GitHub username:"
read GITHUB_USERNAME

echo "Please enter your GitHub email:"
read GITHUB_EMAIL

echo "Please enter your GitHub token:"
read GITHUB_TOKEN

cp .env.example .env
cp LAYOUT.txt.example LAYOUT.txt

sed -i "s/^GITHUB_USERNAME=.*/GITHUB_USERNAME=$GITHUB_USERNAME/" .env
sed -i "s/^GITHUB_EMAIL=.*/GITHUB_EMAIL=$GITHUB_EMAIL/" .env
sed -i "s/^GITHUB_TOKEN=.*/GITHUB_TOKEN=$GITHUB_TOKEN/" .env

echo ".env file has been created and updated."

if command -v docker >/dev/null 2>&1; then
    cp docker-compose.yml.example docker-compose.yml

    echo "Starting Docker containers..."

    docker-compose up -d

    if [ $? -eq 0 ]; then
        echo "Docker containers are up and running."
    else
        echo "Failed to start Docker containers."
    fi
else
    echo "Docker is not installed."
fi
