# No Man Cinema

This is an dummy movie booking application built using NodeJS, ReactJs, PostGres, Nginx, and Docker.

It consists of a movie listings page, a movie page and a form to book a showing.

To run the application: 

First time: 
``` 
docker-compose up --build
```
This should build and setup the necesary container and images

after that any time you wish to start it you should be able to just run: 

```
docker-compose up
```

The database should already be created and tables populated with seed data after setup however if they are not there is an init.sql stored at `'/database/init.sql` with all the necessary sql commands you will need to use to get it set up.

__NOTE__: This is by no means a production ready application (nor do I own a cinema for it to be used with). 

