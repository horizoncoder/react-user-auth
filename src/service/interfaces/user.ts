export type UserId = number;

export enum Roles {
    Admin = 'admin',
    Moderator = 'moderator',
    User = 'user',
}

export interface IUser {
    id: UserId;
    name: string;
    surname: string;
    email: string;
    isBanned: boolean;
    role: Roles;
}
