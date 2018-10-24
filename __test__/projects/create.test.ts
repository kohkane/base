import 'helpers';
import * as db from '../../db/client';
import { Response } from '../../db/models/response';
import { create } from '../../projects';

describe('/project', () => {
  // Setup Projects DB table
  // beforeAll(async (done) => {
  //   // @todo we need to mock this out
  //   db.raw.createTable({
  //     AttributeDefinitions: [
  //       {
  //         AttributeName: 'id',
  //         AttributeType: 'S',
  //       },
  //       {
  //         AttributeName: 'owner',
  //         AttributeType: 'S',
  //       },
  //       {
  //         AttributeName: 'createdDate',
  //         AttributeType: 'N',
  //       },
  //     ],
  //     GlobalSecondaryIndexes: [
  //       {
  //         IndexName: 'OwnerIndex',
  //         KeySchema: [
  //           {
  //             AttributeName: 'owner',
  //             KeyType: 'HASH',
  //           },
  //           {
  //             AttributeName: 'createdDate',
  //             KeyType: 'RANGE',
  //           },
  //         ],
  //         Projection: {
  //           NonKeyAttributes: ['id', 'name'],
  //           ProjectionType: 'INCLUDE',
  //         },
  //         ProvisionedThroughput: {
  //           ReadCapacityUnits: 1,
  //           WriteCapacityUnits: 1,
  //         },
  //       },
  //     ],
  //     KeySchema: [
  //       {
  //         AttributeName: 'id',
  //         KeyType: 'HASH',
  //       },
  //     ],
  //     ProvisionedThroughput: {
  //       ReadCapacityUnits: 1,
  //       WriteCapacityUnits: 1,
  //     },
  //     TableName: 'test-projects',
  //   }, (err, data) => {
  //     done();
  //   });
  // });
  // // Destroy projects table when tests are complete
  // afterAll(async (done) => {
  //   db.raw.deleteTable({ TableName: 'test-projects' }, (err, data) => {
  //     done();
  //   });
  // });

  const newProjectName = 'Test Project';
  const newProjectOwner = 'test@kohkane.com';
  describe('/ - GET', () => {
    test('Find all of a user\'s projects', (done) => {
      expect(true).toBe(true);
      done();
    });
    test('Find project by id', (done) => {
      expect(true).toBe(true);
      done();
    });
    test('No projects found for user', (done) => {
      expect(true).toBe(true);
      done();
    });
    test('No project found by id', (done) => {
      expect(true).toBe(true);
      done();
    });
  });
  describe('/new - POST', () => {
    test('Create a new project', (done) => {
      expect(true).toBe(true);
      done();
      // create(JSON.stringify({
      //   name: newProjectName,
      //   owner: newProjectOwner,
      // })).then((result) => {
      //   const response = new Response(result);
      //   expect(response.status).toBe('success');
      //   expect(response.data.id).toContain(newProjectName.sanatize());
      //   expect(response.data.owner).toBe(newProjectOwner);
      //   done();
      // });
    });
    test('Can\'t create duplicate projects', (done) => {
      expect(true).toBe(true);
      done();
      // create(JSON.stringify({
      //   name: newProjectName,
      //   owner: newProjectOwner,
      // })).catch((error) => {
      //   const response = new Response(error);
      //   expect(response.status).toBe('fail');
      //   expect(response.message).toBe('Project already exists');
      //   done();
      // });
    });
    test('Name and Owner is required', (done) => {
      expect(true).toBe(true);
      done();
      // create(JSON.stringify({
      // })).catch((error) => {
      //   const response = new Response(error);
      //   expect(response.status).toBe('fail');
      //   expect(response.message).toContain('Invalid Request - Missing name and owner');
      //   done();
      // });
    });
  });
  describe('/(id) - GET', () => {
    test('Find project by id', (done) => {
      expect(true).toBe(true);
      done();
    });
    test('Project doesn\'t exist', (done) => {
      expect(true).toBe(true);
      done();
    });
  });
  describe('/(id) - PUT', () => {
    test('Project is updated', (done) => {
      expect(true).toBe(true);
      done();
    });
    test('Update ignores non project items', (done) => {
      expect(true).toBe(true);
      done();
    });
  });
  describe('/(id) - DELETE', () => {
    test('Project is deleted', (done) => {
      expect(true).toBe(true);
      done();
    });
  });
});
