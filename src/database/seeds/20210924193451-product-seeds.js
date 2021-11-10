module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('products', [
      {
        name: 'arroz',
        description: 'Arroz mais gostoso',
        price: 9.99,
        weight: 5,
        active: true,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'Feijao',
        description: 'Feijao muito bom',
        price: 12,
        weight: 2,
        active: true,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'Cebola',
        description: 'Diretamente da fazenda',
        price: 2,
        weight: 0.3,
        active: false,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'Mostarda',
        description: 'A mais saborosa de todas',
        price: 7,
        weight: 1.4,
        active: true,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('products', null, {});
  },
};
