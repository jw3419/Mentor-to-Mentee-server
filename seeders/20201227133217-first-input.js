'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('users', [
      {
        username: 'leejaewon',
<<<<<<< HEAD
        password: '1234',
        email: 'lllljw@nate.com',
        createdAt: new Date(),
        updatedAt: new Date(),
        isMentor: true
      },
      {
        username: '박정환',
        password: '1234',
        email: '1234@nate.com',
        createdAt: new Date(),
        updatedAt: new Date(),
        isMentor: true
      },{
        username: '조영권',
        password: '1234',
        email: 'youngkwon@nate.com',
        createdAt: new Date(),
        updatedAt: new Date(),
        isMentor: true
      },{
        username: '강희석',
        password: '1234',
        email: 'dktkwhdk1@nate.com',
        createdAt: new Date(),
        updatedAt: new Date(),
        isMentor: true
      },{
        username: '김인기',
        password: '1234',
        email: 'codefucker@nate.com',
        createdAt: new Date(),
        updatedAt: new Date(),
        isMentor: true
      },{
        username: '김홍식',
        password: '1234',
        email: 'hongsikfreak@nate.com',
        createdAt: new Date(),
        updatedAt: new Date(),
        isMentor: true
      },{
        username: '효도르',
        password: '1234',
        email: 'hyo@nate.com',
        createdAt: new Date(),
        updatedAt: new Date(),
        isMentor: false
=======
        password: 'dlwodnjs1@',
        email: 'lllljw@nate.com',
        createdAt: new Date(),
        updatedAt: new Date(),
>>>>>>> e887793e778aad8e3e26e76042b192c1c3c83d8d
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
<<<<<<< HEAD
    return queryInterface.bulkDelete('users', [
      {
        username: 'leejaewon',
        password: '1234',
        email: 'lllljw@nate.com',
        createdAt: new Date(),
        updatedAt: new Date(),
        isMentor: true
      },{
        username: '박정환',
        password: '1234',
        email: '1234@nate.com',
        createdAt: new Date(),
        updatedAt: new Date(),
        isMentor: true
      },{
        username: '조영권',
        password: '1234',
        email: 'youngkwon@nate.com',
        createdAt: new Date(),
        updatedAt: new Date(),
        isMentor: true
      },{
        username: '강희석',
        password: '1234',
        email: 'dktkwhdk1@nate.com',
        createdAt: new Date(),
        updatedAt: new Date(),
        isMentor: true
      },{
        username: '김인기',
        password: '1234',
        email: 'codefucker@nate.com',
        createdAt: new Date(),
        updatedAt: new Date(),
        isMentor: true
      },{
        username: '김홍식',
        password: '1234',
        email: 'hongsikfreak@nate.com',
        createdAt: new Date(),
        updatedAt: new Date(),
        isMentor: true
      },{
        username: '효도르',
        password: '1234',
        email: 'hyo@nate.com',
        createdAt: new Date(),
        updatedAt: new Date(),
        isMentor: false
      },
    ]);
=======
    return queryInterface.bulkDelete('users', null, {});
>>>>>>> e887793e778aad8e3e26e76042b192c1c3c83d8d
  }
};
