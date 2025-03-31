module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
      },
      // ... all user fields
      createdAt: { type: Sequelize.DATE, allowNull: false },
      updatedAt: { type: Sequelize.DATE, allowNull: false },
      deletedAt: { type: Sequelize.DATE }
    });

    await queryInterface.createTable('Profiles', {
      // ... profile fields
    });

    await queryInterface.createTable('Bookings', {
      // ... booking fields
    });
  },

  async down(queryInterface) {
    await queryInterface.dropAllTables();
  }
};
