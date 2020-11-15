'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        /**
         * Add seed commands here.
         *
         * Example:
         * await queryInterface.bulkInsert('People', [{
         *   name: 'John Doe',
         *   isBetaMember: false
         * }], {});
         */

        const media_social = [
            {
                name: "WhatsApp",
                description: "Application WhatsApp",
                icon:"fa-whatsapp",
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                name: "Telegram",
                description: "Application Telegram",
                icon:"fa-telegram",
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                name: "Facebook",
                description: "Application Facebook Messenger",
                icon:"fa-facebook-messenger",
                createdAt: new Date(),
                updatedAt: new Date()
            }];

        return queryInterface.bulkInsert('media', media_social)
    },

    down: async (queryInterface, Sequelize) => {
        /**
         * Add commands to revert seed here.
         *
         * Example:
         * await queryInterface.bulkDelete('People', null, {});
         */
        return queryInterface.bulkDelete('media', null, {});
    }
};
