# antd-graphql-strapi-recipe

This app is showing some cooking recipes.
It is made with React (Antd) on the frontend. Graphql is used for querying. Strapi is used for headless CMS as the backend. I had no time for CSS so I used some quick stylings.

# Build backend

#### cd backend

#### yarn install

#### yarn develop

I've committed backend for production. To host Strapi locally you need to change config/server.js to:

```
module.exports = ({ env }) => ({
  host: env('HOST', '0.0.0.0'),
  port: env.int('PORT', 1337),
});
```

Or you can build a fresh version of Strapi with:

```
npx-create-strapi-app my-app
```

And then hit localhost:1337 from frontend.

# Build frontend

#### cd frontend

#### yarn install

#### yarn start

# Strapi login admin

Link to live version login:
https://safe-scrubland-46591.herokuapp.com/admin/auth/login

> email: cedomir.sobic@gmail.com  
> password: Cedocedo1

I had no time to connect S3 so images are deleted every time Heroku goes to hibernate. That is why I've put Fa-Icons instead of real images. I've left the image query on the Details page. You can go on the live version with provided login and you can add posts. Please don't delete current ones.

# Deploy

Backend is deployed on Heroku. For deployment on Heroku I have followed this link:

https://docs.strapi.io/developer-docs/latest/setup-deployment-guides/deployment/hosting-guides/heroku.html. At the time Strapi is on v4, maybe when you are building it you will need to do different things. I've used the Heroku plugin for Postgresql as a database.

My backend .env file:

> JWT_SECRET=699a2211-744b-4535-a39a-dc6723d86843  
> API_TOKEN_SALT=240427ce6d19e7fce11fa375cf6ef4b4  
> DATABASE_URL=postgres://ebitxebvixeeqd:dc59b16dedb3a1eef84d4999sb4baf@ec2-50-37-231-192.compute-2.amazonaws.com: 5432/d516fp1u21ph7b  
> MY_HEROKU_URL=https://safe-scrubland-46591.herokuapp.com/
