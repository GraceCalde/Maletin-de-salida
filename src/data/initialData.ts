
import type { Material, RecursoDigital } from '../types';

export const materialesIniciales: Material[] = [
    { id: 'm-01', name: 'Linterna', quantity: 2 },
    { id: 'm-02', name: 'Cinta métrica', quantity: 1 },
    { id: 'm-03', name: 'Botiquín', quantity: 1 },
];

export const recursosDigitalesIniciales: RecursoDigital[] = [
    { code: 'r-01', title: 'Guía de seguridad', format: 'pdf' },
    { code: 'r-02', title: 'Mapa de ruta', format: 'link' },
];
