import { find } from '../users';
import * as dynamodb from '../../db/db';

describe('/users', () => {
  beforeAll(() => {
    const db = dynamodb.doc;
    console.log(dynamodb.tables.users);
    db.put({
      TableName: dynamodb.tables.users,
      Item: { email: 'test@kohkane.com' },
    });
  });

  test('/get - to find the correct user', () => {
    expect.assertions(1);
    return find({ email: 'test@kohkane.com'}).then(users => {
      console.log(users);
      // expect(users.email).toBe('test@kohkane.com');
    }).catch(e => {
      console.log(e)
    })
  });
});