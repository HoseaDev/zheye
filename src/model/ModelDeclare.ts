export interface UserProps {
    isLogin: boolean,
    name?: string,
    description?: string,
    nickName?: string,
    email?: string,
    _id?: number,
    column?: string
}

export interface GlobalErrorMessagePros {
    status?: boolean,
    message?: string
}

export interface Avatar {
    url?: string,
    _id?: string
}

export interface BaseResult<T> {
    code: number,
    msg: string,
    data: T
}

export interface ColumnProps {
    _id: string,
    title: string,
    avatar?: Avatar,
    descriptionÏ: string
}

export interface PostProps {
    _id: string,
    title: string,
    description?: string,
    excerpt?: string,
    column: string,
    createAt: string,
    avatar?: Avatar,
    author?: string
}




