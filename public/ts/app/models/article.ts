import {Comment} from "./comment";

export interface Article {
    _id: string,
    title: string,
    content: string,
    created: string,
    rating: number,
    comments: Comment[],
    _owner: any
}