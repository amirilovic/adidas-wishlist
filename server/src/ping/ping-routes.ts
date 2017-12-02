import * as config from 'config';
import errorHandler from '../utils/error-handler';
import { Request, ReplyNoContinue, RouteConfiguration } from 'hapi';

const API_PATH = '/api/1.0';

export const pingRoutes: RouteConfiguration[] = [
    {
        method: 'GET',
        path: API_PATH + '/ping',
        handler: (request: Request, reply: ReplyNoContinue) => {
            return reply('pong');
        },
        config: {
            auth: false,
            description: 'Ping the API',
            notes: 'Returns Pong',
            tags: ['api', 'ping'],
        },
    },
];
