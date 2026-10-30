
import type { ReactNode } from 'react';

interface CompositionPanelProps {
    header: ReactNode;
    children: ReactNode;
    footer?: ReactNode;
}

function CompositionPanel({
    header,
    children,
    footer,
}: CompositionPanelProps) {
    return (
        <section className="composition-panel">
        <header className="composition-panel__header">
        {header}
        </header>

    <div className="composition-panel__content">
        {children}
    </div>

    {footer !== undefined && (
        <footer className="composition-panel__footer">
            {footer}
        </footer>
    )}
    </section>
    );
}

export default CompositionPanel;
