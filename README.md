##  Project url: https://noter-tools.ru/

# Noter back-end
Noter is a service for creating your own rating collection. Organize movies, games, and more into categories, rate them, and add personal reviews.

**Frontend project: https://github.com/Astisek/noter-front**  
**Bootstrap project: https://github.com/Astisek/noter-bootstrap**  

#### Development  
1. Clone project  
2. Start bootstrap dev docker-compose  
3. Fill `.env` file  

`IS_DEV` - true  
`PORT` - Local port  

`DB_HOST` - Postgres domain  
`DB_USER` - Postgres username  
`DB_PASSWORD` - Postgres user password  
`DB_NAME` - Postgres database name  
`DB_PORT` - Postgres database port  

`SALT_ROUNDS` - Salt rounds for password crypt  
`JWT_SALT` - Salt for jwt token  
`PREFIX` - Global api prefix  

4. pnpm install  
5. pnpm start:dev  