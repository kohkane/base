var faker = require('faker');

function create(project, user) {
  var reversedTimestamp = parseInt(faker.date.past().getTime().toString().split('').reverse().join(''));
  return {
    id: `${reversedTimestamp}_${project.toLowerCase().replace(/ /g, '_').replace(/-/g, '').replace(/\./g, '')}`,
    name: project,
    owner: user.id,
  }
}

module.exports = {
  generate: function(amount, users) {
    var projects = [];
    for (let i = 0; i < amount; i++) {
      projects.push(create(`Kohkane - ${i}`, users[Math.floor((Math.random() * users.length-1) + 1)]));
    }
    return projects;
  }
}