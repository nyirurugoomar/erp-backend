export declare class Item {
    itemTitle: string;
    itemDescription: string;
    initialQty: number;
    CurentQty: number;
    itemPrice: number;
    itemImage: string;
    createdBy: {
        name: string;
        email: string;
    };
}
export declare const ItemSchema: import("mongoose").Schema<Item, import("mongoose").Model<Item, any, any, any, import("mongoose").Document<unknown, any, Item> & Item & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Item, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<Item>> & import("mongoose").FlatRecord<Item> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
