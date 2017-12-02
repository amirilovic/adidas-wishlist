import { IWishlistItem } from '../entities/wishlist-item';
import { ItemNotFoundError, ValidationError, UnexpectedError } from '../errors/index';


const col = [];

export class WishlistItemsRepository {
    private col: IWishlistItem[];

    constructor() {
        this.col = [];
    }

    public async create(item: IWishlistItem): Promise<IWishlistItem> {
        if (!item) {
            throw new UnexpectedError('Argument item is required.');
        }

        if (!item.url) {
            throw new ValidationError('Argument item.url is required');
        }

        if (this.col.findIndex((i) => i.url === item.url) !== -1) {
            throw new ValidationError('Can\'t add item, url has to be unique.');
        }

        const newItem = { ...item };

        newItem.id = item.url;

        this.col.push(newItem);

        return { ...newItem };
    }

    public async findById(id: string): Promise<IWishlistItem> {
        if (!id) {
            throw new UnexpectedError('Argument id is required.');
        }

        const item = this.col.find((i) => i.id === id);

        if (!item) {
            throw new ItemNotFoundError(`Item ${id} not found.`);
        }

        return { ...item };
    }

    public async delete(id: string): Promise<IWishlistItem> {
        if (!id) {
            throw new UnexpectedError('Argument item.id is required');
        }

        const index = this.col.findIndex((i) => i.id === id);

        if (index === -1) {
            throw new ItemNotFoundError(`Item ${id} not found.`);
        }

        const result = this.col.splice(index, 1);

        return { ...result[0] };
    }

    public async findAll(): Promise<IWishlistItem[]> {
        const result = this.col.map((i) => {
            return { ...i };
        });

        return result;
    }
}
