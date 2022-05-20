'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    
    await queryInterface.removeColumn("Boards", "desc");
    await queryInterface.addColumn("Boards", "desc", {
      type: Sequelize.TEXT,
      allowNull: true,
    })
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
