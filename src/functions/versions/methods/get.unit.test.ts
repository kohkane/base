import * as get from './get';

describe('versions.get', () => {
  test('getVersion should return current version', () => {
    return get.getVersion({
      project: 'test-project',
      username: 'test@user.com',
    }).then((response) => {
      expect(response.status).toBe('ok');
      expect(response.data).toEqual({
        version: {
          bucket: 'stashes.kohkane.com',
          fileCount: {
            db: 0,
            media: 0,
            plugins: 0,
            theme: 0,
            total: 0,
          },
          number: 3,
          path: `test@user.com/test-project/3`,
          stashes: {
            db: true,
            media: true,
            plugins: true,
            theme: true,
          },
        },
      });
    }).catch(() => { expect(true).toBe(false); });
  });
  test('getVersion should return an error without a project param', () => {
    return get.getVersion({
      username: 'test@user.com',
    }).then(() => { expect(true).toBe(false); }).catch((response) => {
      expect(response.status).toBe('error');
      expect(response.message).toBe('project is missing from query parameters.');
      expect(response.statusCode).toBe(400);
    });
  });
  test('getVersion should return an error without a username param', () => {
    return get.getVersion({
      project: 'test-project',
    }).then(() => { expect(true).toBe(false); }).catch((response) => {
      expect(response.status).toBe('error');
      expect(response.message).toBe('username is missing from query parameters.');
      expect(response.statusCode).toBe(400);
    });
  });
  test('getVersion should return an error without query params', () => {
    return get.getVersion({
    }).then(() => { expect(true).toBe(false); }).catch((response) => {
      expect(response.status).toBe('error');
      expect(response.message).toBe('username and project are missing from query parameters.');
      expect(response.statusCode).toBe(400);
    });
  });
});
