module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('users', [
      {
        name: 'admin',
        email: 'admin@admin.com',
        age: 30,
        password: 'admin',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'John',
        email: 'jhon@email.com',
        age: 21,
        password: '1234',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'Jane',
        email: 'jane@email.com',
        age: 27,
        password: 'myName',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'Jeffords',
        email: 'jeffords@email.com',
        age: 39,
        password: 'stone',
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('users', null, {});
  },
};
