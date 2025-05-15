export interface Project {
    id: string;
    name: string;
}

export interface Version {
    id: string;
    name: string;
    createdAt: Date;
}

export interface Log {
    id: string;
    message: string;
    createdAt: Date;
} 