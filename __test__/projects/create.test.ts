import 'helpers';
import * as db from '../../db/client';
import { Response } from '../../db/models/response';
import { create } from '../../projects/index';

describe('/projects', () => {
  // Setup Projects DB table
  beforeAll(async (done) => {
    db.raw.createTable({
      AttributeDefinitions: [
        {
          AttributeName: '_id',
          AttributeType: 'S',
        },
      ],
      KeySchema: [
        {
          AttributeName: '_id',
          KeyType: 'HASH',
        },
      ],
      ProvisionedThroughput: {
        ReadCapacityUnits: 1,
        WriteCapacityUnits: 1,
      },
      TableName: 'test-projects',
    }, (err, data) => {
      done();
    });
  });
  // Destroy projects table when tests are complete
  afterAll(async (done) => {
    db.raw.deleteTable({ TableName: 'test-projects' }, (err, data) => {
      done();
    });
  });

  const newProjectName = 'Test Project';
  const newProjectOwner = 'test@kohkane.com';

  describe('/new - POST', () => {
    test('Create a new project', (done) => {
      create(JSON.stringify({
        name: newProjectName,
        owner: newProjectOwner,
      })).then((result) => {
        const response = new Response(result);
        expect(response.status).toBe('success');
        expect(response.data._id).toBe(newProjectName.sanatize());
        expect(response.data.owner).toBe(newProjectOwner);
        done();
      });
    });
    test('Can\'t create duplicate projects', (done) => {
      create(JSON.stringify({
        name: newProjectName,
        owner: newProjectOwner,
      })).catch((error) => {
        const response = new Response(error);
        expect(response.status).toBe('fail');
        done();
      });
    });
    test('Name is required', (done) => {
      create(JSON.stringify({
        owner: newProjectOwner,
      })).catch((error) => {
        const response = new Response(error);
        expect(response.status).toBe('fail');
        done();
      });
    });
    test('Owner is required', (done) => {
      create(JSON.stringify({
        owner: newProjectOwner,
      })).catch((error) => {
        const response = new Response(error);
        expect(response.status).toBe('fail');
        done();
      });
    });
  });
});
