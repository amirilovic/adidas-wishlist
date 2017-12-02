import * as config from 'config';
import { Request, ReplyNoContinue, RouteConfiguration } from 'hapi';
import { wishlistItemsListAction } from './wishlist-items-list-action';
import { wishlistItemsCreateAction } from './wishlist-items-create-action';
import { wishlistItemsDeleteAction } from './wishlist-items-delete-action';

const API_PATH = '/api/1.0';

export const wishlistRoutes: RouteConfiguration[] = [
    {
        method: 'GET',
        path: API_PATH + '/wishlist-items',
        handler: async (request: Request, reply: ReplyNoContinue) => {
            const result = await wishlistItemsListAction.exec({});
            return reply(result);
        },
        config: {
            auth: false,
            description: 'Get all items from a wishlist',
            notes: 'Returns wishlist items',
            tags: ['api', 'wishlist-items'],
            validate: {
                query: wishlistItemsListAction.validator,
            },
        },
    }, {
        method: 'POST',
        path: API_PATH + '/wishlist-items',
        handler: async (request: Request, reply: ReplyNoContinue) => {
            const result = await wishlistItemsCreateAction.exec(request.payload);
            return reply(result);
        },
        config: {
            auth: false,
            description: 'Add item to wishlist',
            notes: 'Returns added item',
            tags: ['api', 'wishlist-items'],
            validate: {
                payload: wishlistItemsCreateAction.validator,
            },
        },
    }, {
        method: 'DELETE',
        path: API_PATH + '/wishlist-items/{id}',
        handler: async (request: Request, reply: ReplyNoContinue) => {
            const id = request.params.id;
            const result = await wishlistItemsDeleteAction.exec({ id });
            return reply(result);
        },
        config: {
            auth: false,
            description: 'Removes an item from a wishlist',
            notes: 'Returns deleted item',
            tags: ['api', 'wishlist-items'],
            validate: {
                params: wishlistItemsDeleteAction.validator,
            },
        },
    },
];
