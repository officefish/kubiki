# nginx
# sudo nano /etc/nginx/sites-available/your_domain
# sudo systemctl restart nginx

# ssh server
ssh root@45.131.40.89

# install nodejs
sudo apt update
sudo apt install nodejs

# install mongodb
# MongoDB only supports the 64-bit versions of these platforms. 
# To determine which Ubuntu release your host isrunning, 
# run the following command on the host's terminal:
cat /etc/lsb-release

# 1. Import the public key used by the package management system
sudo apt-get install gnupg curl

curl -fsSL https://www.mongodb.org/static/pgp/server-7.0.asc | \
   sudo gpg -o /usr/share/keyrings/mongodb-server-7.0.gpg \
   --dearmor

# 2. Create a list file for MongoDB
echo "deb [ arch=amd64,arm64 signed-by=/usr/share/keyrings/mongodb-server-7.0.gpg ] https://repo.mongodb.org/apt/ubuntu jammy/mongodb-org/7.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-7.0.list

# 3. Reload local package database
sudo apt-get update

# 4. Install the MongoDB packages
sudo apt-get install -y mongodb-org

# Start mongodb
# You can start the mongod process by issuing the following command:
sudo systemctl start mongod

# If you receive an error similar to the following when starting mongod:
# Failed to start mongod.service: Unit mongod.service not found.
sudo systemctl daemon-reload
# Then run the start command above again.

# Verify that MongoDB has started successfully.
sudo systemctl status mongod

# You can optionally ensure that MongoDB will start following 
# a system reboot by issuing the following command:
sudo systemctl enable mongod

# Stop MongoDB.
# As needed, you can stop the mongod process by issuing the following command:
sudo systemctl stop mongod

# 
mongod --replSet rs0

# Restart MongoDB.
# You can restart the mongod process by issuing the following command:
sudo systemctl restart mongod

# create db user with mongosh
# db.createUser ({ user: "username",  pwd:"userpwd", roles: [ { role: "userAdmin", db: "dbname" } ] })

# 1. ngnix install
sudo apt update
sudo apt install nginx

# 2. установка брендмауера
sudo apt install ufw

# 2. настройка брендмауера
sudo ufw app list

# Шаг 4 — Управление процессом Nginx

# Чтобы остановить веб-сервер, введите:
sudo systemctl stop nginx

# Чтобы запустить остановленный веб-сервер, введите:
sudo systemctl start nginx

# Чтобы остановить и снова запустить службу, введите:
sudo systemctl restart nginx

# Если вы просто вносите изменения в конфигурацию, 
# во многих случаях Nginx может перезагружаться 
# без отключения соединений. Для этого введите:
sudo systemctl reload nginx

# По умолчанию Nginx настроен на автоматический запуск 
# при загрузке сервера. Если вы не хотите этого, 
# вы можете отключить такое поведение с помощью следующей команды:
sudo systemctl disable nginx

# Чтобы перезагрузить службу для запуска во время загрузки, введите:
sudo systemctl enable nginx

# Шаг 5 — Настройка блоков сервера (рекомендуется)
sudo mkdir -p /var/www/your_domain/html

# Затем назначьте владение директорией с помощью переменной среды $USER:
sudo chown -R $USER:$USER /var/www/your_domain/html

# Разрешения корневых директорий веб-сервера должны быть правильными, 
# если вы не изменяли значение unmask, которое устанавливает 
# разрешения файла по умолчанию. Чтобы убедиться, 
# что разрешения корректны, позволить владельцу читать, 
# писать и запускать файлы, а группам и другим пользователям 
# разрешить только читать и запускать файлы, 
# вы можете ввести следующую команду:
sudo chmod -R 755 /var/www/your_domain

# Затем создайте в качестве примера страницу index.html, используя nano или свой любимый редактор:
nano /var/www/your_domain/html/index.html

# логи nginx
cat /var/log/nginx/error.log


