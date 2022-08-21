export interface UserProps {
    isLogin: boolean,
    name?: string,
    description?: string,
    nickName?: string,
    email?: string,
    _id?: string,
    column?: string
}

export interface GlobalErrorMessagePros {
    status?: boolean,
    message?: string
}

export interface ImageProps {
    url?: string,
    _id?: string,
    fitUrl:string
}

export interface BaseResult<T> {
    code: number,
    msg: string,
    data: T
}

export interface ColumnProps {
    _id: string,
    title: string,
    avatar?: ImageProps |string,
    descriptionÏ: string
}
export interface ListPost<T>{
    [id:string]:T
}
export interface PostProps {
    _id?: string,
    title: string,
    description?: string,
    excerpt?: string,
    column?: string,
    createAt?: string,
    image?: ImageProps | string,
    author?: string | UserProps,
    content?: string,
    isHTML?:boolean

}




