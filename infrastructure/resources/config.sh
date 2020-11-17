#!/bin/bash
sudo apt-get update
sudo apt-get install -y build-essential openssl libssl-dev pkg-config
sudo apt-get install -y nodejs
sudo apt-get install npm -y
sudo npm install -g n
sudo n stable
sudo apt-get install nginx -y
sudo apt-get install git -y
cd /var/www
sudo git clone https://github.com/479BetaCoder/ChoreApp.git
cd /etc/nginx/sites-available
sudo cp /var/www/ChoreApp/ChoreApp /etc/nginx/sites-available
sudo ln -s /etc/nginx/sites-available/ChoreApp /etc/nginx/sites-enabled/ChoreApp
sudo rm default
sudo rm /etc/nginx/sites-enabled/default
cd ~
sudo mkdir /data
sudo mkdir /data/db  
sudo apt-get install gnupg
wget -qO - https://www.mongodb.org/static/pgp/server-4.4.asc | sudo apt-key add -
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/4.4 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-4.4.list
sudo apt-get update
sudo apt-get install -y mongodb-org
echo "mongodb-org hold" | sudo dpkg --set-selections
echo "mongodb-org-server hold" | sudo dpkg --set-selections
echo "mongodb-org-shell hold" | sudo dpkg --set-selections
echo "mongodb-org-mongos hold" | sudo dpkg --set-selections
echo "mongodb-org-tools hold" | sudo dpkg --set-selections
sudo systemctl enable mongod && sudo systemctl start mongod
sudo npm install pm2 -g
cd /var/www
sudo chown -R ubuntu ChoreApp
cd ChoreApp/server
sudo npm install
cd ..
cd webapp  
sudo npm install
sudo npm run build
cd /var/www/ChoreApp/server
pm2 start server.js     
sudo service nginx stop && sudo service nginx start