'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('flow_modules', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      flow_id: {
        type: Sequelize.INTEGER(3)
      },
      user_id: {
        type: Sequelize.INTEGER(3)
      },
      project_id: {
        type: Sequelize.INTEGER(5)
      },
      module_id: {
        type: Sequelize.INTEGER(3)
      },
      key_value: {
        type: Sequelize.STRING(50)
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('flow_modules');
  }
};
