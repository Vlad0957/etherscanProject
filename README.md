1. Зайти в папку my-app. Установить зависимости.
2. Зайти в папку server. Установить зависимости. В паке server/config  в фаиле config.json вбить актуальные значения username, password, database.
3. Указать актуальный api_key в фаиле .env (my-app/.env)
4. ввести команду в терминале (если установлен sequelize cli) sequelize db:create. Затем sequelize db:migrate.
5. Запустить сервер командой "node index.js" или "nodemon index.js" (в папке server)
6. Запустить фронт командой npm start (в папке my-app в отдельном терминале)
7. Адресс с наибольшим изменением можно получить по url: '/api/getUserAdress'
8. Блоки и транзакции сохраняются начиная с блока "0xe00176"
