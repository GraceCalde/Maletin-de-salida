
export interface Material {
    id: string;
    name: string;
    quantity: number;
}

export interface RecursoDigital {
    code: string;
    title: string;
    format: 'pdf' | 'link';
}
