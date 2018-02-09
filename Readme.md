#CRUD with Angular 4, Node JS and MongoDB

Must be install:

1.  Node JS 8.7.0 (and global variable)
2.  MongoDB 3.4.10 (default port)

Instalación:

1.  git clone https://github.com/ljalarcon08/crud_MEAN4.git
2.  Access to folder crud_MEAN4.
3.  In command line:
    - npm install
    - npm start
4.  To browser access to http://localhost:3000

Database Config:

crud_MEAN4/model/db.json, por defecto:

{ "mongo":{ "host":"localhost", "db":"movies" } }

To modified Angular4:

1.  access to crud_MEAN4\src\angularClient.
2.  Execute npm install
3.  For develop: 
    -   Node project must be executed.
    -   ng serve, access to http://localhost:4200
4.  After finishing the modifications: 
    -   Execute ng build
    -   Copy generated dist folder to crud_MEAN4\src