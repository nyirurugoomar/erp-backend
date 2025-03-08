export declare class Customer {
    customerName: string;
    customerEmail: string;
    customerAddress: string;
    customerPhone: number;
    customerImage: string;
}
export declare const CustomerSchema: import("mongoose").Schema<Customer, import("mongoose").Model<Customer, any, any, any, import("mongoose").Document<unknown, any, Customer> & Customer & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Customer, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<Customer>> & import("mongoose").FlatRecord<Customer> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
