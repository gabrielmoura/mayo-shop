import {Product as ProductBase} from "@prisma/client";

export interface Product extends Partial<ProductBase> {
    album: string[]
    size: string[]
    price: number;
}