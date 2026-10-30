import type { ReactNode } from 'react';

interface GenericCatalogProps<T> {
    title: string;
    items: T[];
    getKey: (item: T) => string;
    renderItem: (item: T) => ReactNode;
    onSelect: (item: T) => void;
    }

function GenericCatalog<T>({
    title,
    items,
    getKey,
    renderItem,
    onSelect,
}: GenericCatalogProps<T>) {
    return (
    <section className="catalog">
        <h2>{title}</h2>

        {items.length === 0 ? (
        <p className="catalog__empty">
        No se encontraron elementos.
        </p>
        ) : (
        <ul className="catalog__list">
            {items.map((item) => (
                <li key={getKey(item)} className="catalog__item">
                <div className="catalog__item-content">
                {renderItem(item)}
                </div>

            <button
                type="button"
                className="btn btn-primary catalog__add-button"
                onClick={() => onSelect(item)}
            >
                <span aria-hidden="true">＋</span>
                Agregar al maletín
            </button>
            </li>
            ))}
        </ul>
        )}
    </section>
    );
}

export default GenericCatalog;
