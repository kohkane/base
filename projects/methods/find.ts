import { DocumentClient } from 'aws-sdk/clients/dynamodb';
import { buildQuery, doc, invalidParams, tables } from '../../db/client';
import { Project } from '../../db/models/project';
import { Response, ResponseStatus } from '../../db/models/response';
/**
 * Used for defining the ways a user can search by projects
 *
 * @author jordanskomer
 */
class SearchQuery {
  public id: string;
  public owner: string;

  constructor(query: {}) {
    Object.assign(this, query);
  }
}
/**
 * Builds the formatted dynamodb params for the query method based on the user's
 * passed in params
 *
 * @param inputQuery - The query from the request
 * @author jordanskomer
 */
const buildSearchQuery = (inputQuery: SearchQuery): DocumentClient.QueryInput => {
  let query: DocumentClient.QueryInput;
  query = buildQuery('projects', inputQuery);
  if (inputQuery.owner && !inputQuery.id) {
    query.IndexName = 'OwnerIndex';
  }
  return query;
};
/**
 * Checks that the correct params are in the query and attempts to search for projects
 * that match the passed in query
 *
 * @param query - the query from the request
 * @author jordanskomer
 */
export function find(query): Promise<{}> {
  return new Promise((resolve, reject) => {
    invalidParams(query, reject);
    doc.query(buildSearchQuery(new SearchQuery(query))).promise().then((result) => {
      if (result.Items.length > 0) {
        resolve(new Response({
          data: result.Items,
          status: ResponseStatus.success,
        }));
      } else {
        reject(new Response({
          data: query,
          message: `No project${query.owner ? 's' : ''} found`,
          status: ResponseStatus.fail,
          statusCode: 404,
        }));
      }
    }).catch((error) => {
      reject(new Response({
        code: error.code,
        message: error.message,
        status: ResponseStatus.fail,
        statusCode: error.statusCode,
      }));
    });
  });
}
