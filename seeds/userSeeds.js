const { User } = require('../models');

const userData = [{
        username: 'Johnny',
        password: 'J0hnny12'

    },
    {
        username: 'Susan',
        password: 'Suzie3492'
    },
    {
        username: 'Alexie',
        password: 'B3@stb0y'
    }
];

const seedUsers = () => User.bulkCreate(userData);

module.exports = seedUsers;