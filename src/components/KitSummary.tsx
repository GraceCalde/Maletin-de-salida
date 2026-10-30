import type { Material, RecursoDigital } from '../types';

export type KitItem =
    | { kind: 'material'; item: Material }
    | { kind: 'recurso'; item: RecursoDigital };

interface KitSummaryProps {
    items: KitItem[];
    status: 'pending' | 'reviewed';
    message: string;
    onRemove: (key: string) => void;
    onMarkReviewed: () => void;
    onReset: () => void;
}

function getItemKey(kitItem: KitItem): string {
    return kitItem.kind === 'material'
    ? kitItem.item.id
    : kitItem.item.code;
}

function getItemName(kitItem: KitItem): string {
    return kitItem.kind === 'material'
    ? kitItem.item.name
    : kitItem.item.title;
}

function KitSummary({
    items,
    status,
    message,
    onRemove,
    onMarkReviewed,
    onReset,
}: KitSummaryProps) {
    return (
    <section className="kit-summary">
        <div className="kit-summary__header">
            <div>
            <h2>Mi maletín</h2>
            <p>Todo lo que necesitas, organizado en un solo lugar.</p>
            </div>

        <span className={`status-badge status-badge--${status}`}>
            {status === 'pending'
            ? 'Pendiente de revisión'
            : 'Revisado'}
        </span>
        </div>

        <p className="kit-summary__total">
        Elementos en el maletín: <strong>{items.length}</strong>
        </p>

    {items.length === 0 ? (
        <p className="kit-summary__empty">
        Tu maletín está vacío. Agrega materiales o recursos digitales.
        </p>
    ) : (
        <ul className="kit-summary__list">
        {items.map((kitItem) => {
            const key = getItemKey(kitItem);

            return (
                <li key={key} className="kit-summary__item">
                <div>
                    <strong>{getItemName(kitItem)}</strong>
                    <span>
                    {kitItem.kind === 'material'
                    ? `Material · Cantidad disponible: ${kitItem.item.quantity}`
                    : `Recurso digital · Formato: ${kitItem.item.format.toUpperCase()}`}
                    </span>
                </div>

                <button
                    type="button"
                    className="button-secondary"
                    onClick={() => onRemove(key)}
                    aria-label={`Quitar ${getItemName(kitItem)} del maletín`}
                >
                Quitar
                </button>
            </li>
            );
        })}
        </ul>
    )}

        {message && (
        <p className="kit-summary__message" role="alert">
          {message}
        </p>
      )}

      <div className="kit-summary__actions">
        <button type="button" onClick={onMarkReviewed}>
          Marcar como revisado
        </button>

        <button
            type="button"
            className="button-secondary"
            onClick={onReset}
        >
          Reiniciar maletín
        </button>
      </div>
    </section>
  );
}

export default KitSummary;
