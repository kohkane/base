import { Response } from '../../../models/Response';

export const handler = (event, context, cb) => {
  cb(undefined, new Response({
    message: 'Route not implemented yet',
    responseTime: 1,
    status: 'ok',
  }));
};
