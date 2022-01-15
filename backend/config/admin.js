module.exports = ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET', 'fb72508c1b3c76ad1ddc1b92502c10f2'),
  },
});
