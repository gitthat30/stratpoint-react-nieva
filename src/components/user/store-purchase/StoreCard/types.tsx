export enum ScanningModeEnum {
    Store = 'store',
    Product = 'product',
    Item = 'item'
}

export type Store = {
    id: number,
    name: string,
    distance: string
}

export type Item = {
    id: number,
    name: string,
    price: number
}

