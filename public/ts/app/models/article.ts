import {Comment} from "./comment";

export interface Article {
    _id: string,
    title: string,
    content: string,
    created: Date,
    rating: number,
    _owner: any,
    _comments: Comment[]
}