# Todo_backend
Test project. Back-end part of Todo application for company WomanUp

#Initialization
After cloning repository, copy .default.env file to the .env file and change variables if needed. MongoDB database and node with version 14+ is required for working properly. On command line run
```sh
npm install
npm run start
```
On success, these messages should be printed:
```sh
Listening on port 2022...
Database connected successfully
```

If it's printed something different, check your database connection string and if it's cloud Mongo DB, check whitelist of IPs.
