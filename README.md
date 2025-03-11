Here's a well-structured README.md file with markdown formatting:

markdown
Copy
Edit
# MyNodeServer - Deployment Guide

## Overview

This project sets up a **Node.js API server** on an **AWS EC2 instance**, using **Nginx** as a reverse proxy and **PM2** for process management.

---

## Prerequisites

Ensure the following are installed on your EC2 instance:

- **Ubuntu (EC2 Instance)**
- **Node.js (via NVM)**
- **PM2**
- **Nginx**
- **Git**

---

## Installation Steps

### 1. Install Nginx
```bash
sudo apt update
sudo apt install nginx -y
2. Install NVM (Node Version Manager)
bash
Copy
Edit
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh | bash
export NVM_DIR="$([ -z "${XDG_CONFIG_HOME-}" ] && printf %s "${HOME}/.nvm" || printf %s "${XDG_CONFIG_HOME}/nvm")"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
3. Install Node.js (Latest LTS Version)
bash
Copy
Edit
nvm install --lts
node -v
npm -v
4. Setup Project Folder
bash
Copy
Edit
cd /var/www/
sudo mkdir app_api
sudo chown ubuntu:www-data -R app_api
sudo chmod 775 -R app_api
cd app_api
5. Clone Project Repository
bash
Copy
Edit
git clone <your-repo-url> .
6. Create .env file
bash
Copy
Edit
nano .env
Add the following content:

ini
Copy
Edit
PORT=3000
APP_NAME=MyNodeServer
ENVIRONMENT=production
7. Install Project Dependencies
bash
Copy
Edit
npm install
npm install dotenv
Configure Nginx Reverse Proxy
1. Create a configuration file for the service:
bash
Copy
Edit
sudo nano /etc/nginx/sites-available/service.conf
Add the following content:

nginx
Copy
Edit
server {
    listen 80;
    listen [::]:80;
    server_name app-api-v3.test.ie;
    root /var/www/app_api;
    index index.html;
    
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        client_max_body_size 200m;
    }
}
2. Enable the Nginx configuration:
bash
Copy
Edit
sudo ln -s /etc/nginx/sites-available/service.conf /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
Start the Application with PM2
bash
Copy
Edit
cd /var/www/app_api
npm install -g pm2
pm2 start index.js
pm2 save
pm2 startup
To restart after modifying index.js:
bash
Copy
Edit
pm2 status  # Check process ID
pm2 restart <ID>
API Endpoints
Method	Endpoint	Description
GET	/	Home Page
GET	/api/info	API Information
Troubleshooting
Check logs:

bash
Copy
Edit
pm2 logs
Restart Nginx:

bash
Copy
Edit
sudo systemctl restart nginx
Check Nginx configuration:

bash
Copy
Edit
sudo nginx -t
Restart PM2 process:

bash
Copy
Edit
pm2 restart <ID>
Notes
Make sure your EC2 security group allows inbound traffic on port 80 (HTTP) and 3000 (for testing).
Use pm2 startup systemd to ensure PM2 restarts on system reboot.
