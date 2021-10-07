import { Missing } from "./missing";

export interface Member {
    id: number;
    username: string;
    lastName: string;
    firstName: string;
    age: number;
    created: Date;
    lastActive: Date;
    gender: string;
    city: string;
    state: string;
    missings: Missing[];
}

