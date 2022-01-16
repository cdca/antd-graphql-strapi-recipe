module.exports = ({ env }) => ({
  url: env("MY_HEROKU_URL"),
});

//Change to this for localhost
// module.exports = ({ env }) => ({
//   host: env('HOST', '0.0.0.0'),
//   port: env.int('PORT', 1337),
// });
