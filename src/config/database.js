require('dotenv/config');

module.exports = {
  dialect: 'postgres',
  host: 'localhost',
  port: '5433',
  username: 'postgres',
  password: 'localhost',
  database: 'stone-inbound',
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true,
  },
};
