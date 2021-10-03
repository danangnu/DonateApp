import { Photo } from './photo';

export interface Missing {
    id: number;
    lastName: string;
    firstName: string;
    photoUrl: string;
    age: number;
    created: Date;
    gender: string;
    relations: string;
    photos: Photo[];
}

