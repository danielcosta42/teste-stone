module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('user_products', [
      {
        user_id: 1,
        product_id: 1,
        quantity: 5,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        user_id: 2,
        product_id: 2,
        quantity: 2,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        user_id: 2,
        product_id: 4,
        quantity: 5,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        user_id: 3,
        product_id: 1,
        quantity: 7,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('user_products', null, {});
  },
};
