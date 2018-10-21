import 'helpers';
import * as db from '../../db/client';
import { Response } from '../../db/models/response';
import { create } from '../../projects';

describe('/project', () => {
  // Setup Projects DB table
  beforeAll(async (done) => {
    db.raw.createTable({
      AttributeDefinitions: [
        {
          AttributeName: 'id',
          AttributeType: 'S',
        },
        {
          AttributeName: 'owner',
          AttributeType: 'S',
        },
        {
          AttributeName: 'createdDate',
          AttributeType: 'N',
        },
      ],
      GlobalSecondaryIndexes: [
        {
          IndexName: 'OwnerIndex',
          KeySchema: [
            {
              AttributeName: 'owner',
              KeyType: 'HASH',
            },
            {
              AttributeName: 'createdDate',
              KeyType: 'RANGE',
            },
          ],
          Projection: {
            NonKeyAttributes: ['id', 'name'],
            ProjectionType: 'INCLUDE',
          },
          ProvisionedThroughput: {
            ReadCapacityUnits: 1,
            WriteCapacityUnits: 1,
          },
        },
      ],
      KeySchema: [
        {
          AttributeName: 'id',
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
        expect(response.data.id).toContain(newProjectName.sanatize());
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
        expect(response.message).toBe('Project already exists');
        done();
      });
    });
    test('Name and Owner is required', (done) => {
      create(JSON.stringify({
      })).catch((error) => {
        const response = new Response(error);
        expect(response.status).toBe('fail');
        expect(response.message).toContain('Invalid Request - Missing name and owner');
        done();
      });
    });
    test('Name is required', (done) => {
      create(JSON.stringify({
        owner: newProjectOwner,
      })).catch((error) => {
        const response = new Response(error);
        expect(response.status).toBe('fail');
        expect(response.message).toContain('Invalid Request - Missing name');
        done();
      });
    });
    test('Owner is required', (done) => {
      create(JSON.stringify({
        name: newProjectName,
      })).catch((error) => {
        const response = new Response(error);
        expect(response.status).toBe('fail');
        expect(response.message).toContain('Missing owner');
        done();
      });
    });
  });
  describe('/ - GET', () => {
    test('Find all of a user\'s projects', (done) => {
      done();
    });
    test('Find project by id', (done) => {
      done();
    });
    test('No projects found for user', (done) => {
      done();
    });
    test('No project found by id', (done) => {
      done();
    });
  });
});
