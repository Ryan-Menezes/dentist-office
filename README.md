# dentist-office
Manager for a dentist office
## Settings
Have [Node.js](https://nodejs.org/pt-br/) installed on your machine and through your terminal enter the project directory and run the command "npm update":
```sh
cd "project directory"
npm update
```
After these initial settings, again in the terminal run the following commands to create the database and its tables (make sure your MySQL is activated):
```sh
npx sequelize db:create
npx sequelize db:migrate
npx sequelize db:seed:all
```
Finally, start the node.js server with the command "nodemon start" in a separate terminal:
```sh
cd "project directory"
nodemon start
```