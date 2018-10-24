var faker = require('faker');

function create(project, user) {
  return {
    id: project.toLowerCase().replace(/ /g, '_').replace(/-/g, '').replace(/\./g, ''),
    name: project,
    owner: user.id,
    createdDate: faker.date.past().getTime()
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