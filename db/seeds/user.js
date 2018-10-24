var faker = require('faker');

function create(i) {
  return {
    id: `user${i}@kohkane.com`,
    fname: faker.name.firstName(),
    lname: faker.name.lastName(),
    phone: faker.phone.phoneNumberFormat().replace(/-/g, '').replace(/ /g, '').replace(/\(/g, '').replace(/\)/g, '').replace(/\./g, '')
  }
}

module.exports = {
  generate: function (amount) {
    var users = [];
    for (let i = 0; i < amount; i++) {
      users.push(create(i));
    }
    return users;
  }
}