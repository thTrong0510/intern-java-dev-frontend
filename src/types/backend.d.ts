export interface IBackendRes<T> {
    error?: string | string[];
    message: string;
    statusCode: number | string;
    data?: T;
}

export interface IModelPaginate<T> {
    meta: {
        page: number;
        pageSize: number;
        pages: number;
        total: number;
    },
    result: T[]
}

export interface IAccount {
    access_token: string;
    user: {
        id: string;
        email: string;
        name: string;
    }
}

export interface IGetAccount extends Omit<IAccount, "access_token"> { }

export interface IUser {
    id?: string | number;
    name: string;
    email: string;
    password?: string;
    createdAt?: string;
}

export interface IPost {
    id?: string | number;
    title: string;
    content: string;
    user?: {
        id: string | number;
        name: string;
    }
}


