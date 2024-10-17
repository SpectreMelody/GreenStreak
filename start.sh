#!/bin/bash

# Prompt for GitHub username
echo "Please enter your GitHub username:"
read GITHUB_USERNAME

# Prompt for GitHub token
echo "Please enter your GitHub token:"
read GITHUB_TOKEN  # This works in bash

# Copy the example env file to .env
cp .env.example .env

# Replace placeholders in .env
sed -i "s/^GITHUB_USERNAME=.*/GITHUB_USERNAME=$GITHUB_USERNAME/" .env
sed -i "s/^GITHUB_TOKEN=.*/GITHUB_TOKEN=$GITHUB_TOKEN/" .env

echo ".env file has been created and updated."

# Check if Docker is installed
if command -v docker >/dev/null 2>&1; then
    cp docker-compose.yml.example docker-compose.yml

    echo "Starting Docker containers..."
    
    # Start Docker containers
    docker-compose up -d

    if [ $? -eq 0 ]; then
        echo "Docker containers are up and running."
    else
        echo "Failed to start Docker containers."
    fi
else
    echo "Docker is not installed."
fi
