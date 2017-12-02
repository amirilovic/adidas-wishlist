import * as Joi from 'joi';
import { IWishlistItem } from '../entities/wishlist-item';
import { Db } from '../db/index';
import { ValidationError } from '../errors/index';

const validator = {
    id: Joi.string().required(),
};

const exec = async (params: IWishlistItem) => {
    const vr = Joi.validate(params, validator);

    if (vr.error) {
        throw ValidationError.fromJoi(vr.error);
    }

    const wishlistItem = await Db.whishlistItemsRepository.delete(params.id);

    return wishlistItem;
};

export const wishlistItemsDeleteAction = {
    validator, exec,
};
