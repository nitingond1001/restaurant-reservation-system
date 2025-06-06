export interface User {
    id: string;
    name: string;
    email: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface Table {
    id: string;
    tableNumber: number;
    capacity: number;
    status: 'available' | 'reserved';
}

export interface Reservation {
    id: string;
    userId: string;
    tableId: string;
    date: Date;
    time: string;
    numberOfGuests: number;
    createdAt: Date;
    updatedAt: Date;
}