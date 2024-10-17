# Green Streak 🚀

![Green Streak Logo](https://i.imgur.com/X7Nkbtt.jpeg) <!-- You can replace this URL with an actual image URL -->

### Project Overview

GreenStreak is a project designed to help you maintain your GitHub activity streak every day. Stay consistent and keep your streak alive effortlessly!

---

### How It Works:

1. **Create Repository**: Create New Repository for Logs.
2. **Daily Updates**: The README file is automatically updated to Logs Repository with the current date every day.
3. **Streak Tracking**: Watch your GitHub contributions go green as your streak grows!
4. **Auto Commit**: The process is automated, so you don’t need to worry about manual commits.

---

### Why Keep a Streak?

Maintaining a streak is a fun and motivational way to stay productive. By committing regularly, you:
- 💡 Stay in the flow of coding
- 🏆 Track your daily progress
- 🌱 Build a habit of consistency

---

### Requirement
1. [**Docker**](https://docs.docker.com/get-started/get-docker/).
2. **Github Personal Access Token**.

---

### How to get Github Personal Access Token ?
1. You simply just click <a href="https://github.com/settings/tokens" target="_blank" rel="noopener noreferrer">here</a>.
2. Genereate new Token (choose the classic one).
3. Add Name to your Personal Access Token then check the checkbox called Repo with a description *Full control of private repositories*
4. Generate and Copy your Personal Access Token

---

### Installation
**Clone Using HTTPS**
```bash
git clone https://github.com/SpectreMelody/GreenStreak.git
```
**Clone Using SSH**
```bash
git clone git@github.com:SpectreMelody/GreenStreak.git
```

---

## Usage 

### Automaticaly
With just a few simple steps, you'll be up and running.

**Requirement** :
- 🐳 Docker  
- 🔐 GitHub Personal Access Token

**🚀 Step by Step: Automatic Setup** :

1. **Navigate to the Project Path**  
Open your terminal and navigate to the directory where the GreenStreak project is located.

2. **Run the `start.sh` File**
Kickstart the service by running the following command:
```bash
sh ./start.sh
```

3. **Fill in the Requirements**  
The script will prompt you to provide your GitHub Personal Access Token and any other required details.
Once completed, GreenStreak will handle everything for you!

---

### Manually
If you prefer more control, GreenStreak also supports manual setup.

**Requirement** :
- 🐳 Docker (Optional if you want to run Automaticaly)  
- 🔐 GitHub Personal Access Token
- 🟢 Node.js

**🚀 Step by Step: Manually Setup** :

1. **Navigate to the Project Path**  
Open your terminal and navigate to the directory where the GreenStreak project is located.

2. **Install packages**   
running the following command:
```bash
npm install
```

3. **Copy the example environment file**   
running the following command:
```bash
cp .env.example .env
```

4. **Fill in the .env file**   
Fill in *GITHUB_TOKEN* with **🔐 GitHub Personal Access Token** and *GITHUB_USERNAME* with **Your Github Username**.

5. **Copy the example LAYOUT file**   
running the following command:
```bash
cp LAYOUT.txt.example LAYOUT.txt
```

6. **Configure the `LAYOUT.txt` File (OPTIONAL)**  
Enhance the style of your README logs by customizing the `LAYOUT.txt` file! You have the flexibility to change the format to suit your preferences.

   **Important**: Be sure to retain the `${date}` placeholder in your layout. This dynamic element is essential for automatically inserting the current date into your logs, ensuring that your activity streak is always accurately reflected.

8. **Run GreenStreak Manually**   
running the following command:
*Production*
```bash
npm run build && npm run start:prod
```
*Development*
```bash
npm run start
```

---

### 🚀 Running GreenStreak in Docker

Running GreenStreak in Docker is **highly recommended**! By using Docker, you don’t have to manually run the project every day—let it take care of your GitHub activity streak automatically, effortlessly!

1. **Ensure You’ve Completed the Manual Setup**   
Before diving into the next steps, double-check that you have successfully set up GreenStreak manually. This will provide a solid foundation for running the project effectively.

2. **Copy the example docker-compose.yml file**   
running the following command:
```bash
cp docker-compose.yml.example docker-compose.yml
```

3. **Running Docker By Docker Compose**   
running the following command:
```bash
docker-compose up -d
```

---

## 🎉 Thank You for Using GreenStreak!

We appreciate your interest in GreenStreak! Our mission is to help you maintain your GitHub activity streak effortlessly. If you have any questions, suggestions, or feedback, feel free to reach out or contribute to the project.

### Stay Connected
- ⭐ **Star this repository** if you find it helpful!
- 🐛 **Report issues** or **suggest features** in the [issues section](https://github.com/SpectreMelody/GreenStreak/issues).

Happy coding, and keep that streak alive! 🚀