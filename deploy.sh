echo "Switching to branch master"
git checkout master

echo "Building app... (Can also use npm instead of yarn)"
yarn build

echo "Deploy next client..."
scp -r .next/* root@45.131.40.89:/var/www/konkurs-kidsarts.ru/html/.next

echo "Deploy nest server..."
scp -r dist/* root@45.131.40.89:/var/www/konkurs-kidsarts.ru/html/dist

echo "Deploy Prisma schema"
scp -r prisma/* root@45.131.40.89:/var/www/konkurs-kidsarts.ru/html/prisma

echo "Copy .env"
scp -r .env root@45.131.40.89:/var/www/konkurs-kidsarts.ru/html

echo "Done!"