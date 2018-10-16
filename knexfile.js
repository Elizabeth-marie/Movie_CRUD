module.exports = {
  development: {
    client: 'pg',
    connection: 'postgres://localhost/zoology'
  },
  test: {},
  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL
  }
}
