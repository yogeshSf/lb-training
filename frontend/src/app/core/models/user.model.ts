
export enum Role {
    Admin = 'Admin',
    User = 'User',
    Subscriber = 'Subscriber',
    SuperAdmin = 'SuperAdmin',
}

type id = undefined | number

export interface UserI {
    id?: id;
    firstName: string;
    lastName: string;
    middleName: string;
    email: string;
    phoneNumber: string;
    role: Role;
    address: string;
    createdOn: string;
    modifiedOn: string;
    isEditable?: boolean
}