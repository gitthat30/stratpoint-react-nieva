export enum NotifiactionTypeEnum {
    Alert = 'alert',
    Transaction = 'transaction',
    Card = 'card',
}

export type Notification = {
    id: number;
    type: NotifiactionTypeEnum;
    message: string;
    time: string;
}

