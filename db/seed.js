#!/usr/bin/env node
var jsonfile = require('jsonfile');
var faker = require('faker');
var userSeeder = require('./seeds/user');
var projectSeeder = require('./seeds/project');

var userSeeds = userSeeder.generate(5);
var projSeeds = projectSeeder.generate(8, userSeeds);

jsonfile.writeFile('db/seeds/users.json', userSeeds, { spaces: 2 }, function (error) {
  console.log('Generated ' + userSeeds.length + ' users');
});

jsonfile.writeFile('db/seeds/projects.json', projSeeds, { spaces: 2 }, function (error) {
  console.log('Generated ' + projSeeds.length + ' projects');
});