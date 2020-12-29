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
    return queryInterface.bulkInsert('mentors', [
      {
        mentorEmail: 'lllljw@nate.com',
        company: "코드스테이츠",
        department: "개발",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        mentorEmail: '1234@nate.com',
        company: "샘숭",
        department: "마케팅",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        mentorEmail: 'youngkwon@nate.com',
        company: "에르쥐",
        department: "영업",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        mentorEmail: 'dktkwhdk1@nate.com',
        company: "네이보",
        department: "운영",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        mentorEmail: 'codefucker@nate.com',
        company: "돠음",
        department: "경영",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        mentorEmail: 'hongsikfreak@nate.com',
        company: "코코아톡",
        department: "운영",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ])
  },
  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('mentors', [
      {
        mentorEmail: 'lllljw@nate.com',
        company: "코드스테이츠",
        department: "개발",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        mentorEmail: '1234@nate.com',
        company: "샘숭",
        department: "마케팅",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        mentorEmail: 'youngkwon@nate.com',
        company: "에르쥐",
        department: "영업",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        mentorEmail: 'dktkwhdk1@nate.com',
        company: "네이보",
        department: "운영",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        mentorEmail: 'codefucker@nate.com',
        company: "돠음",
        department: "경영",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        mentorEmail: 'hongsikfreak@nate.com',
        company: "코코아톡",
        department: "운영",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ])
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
