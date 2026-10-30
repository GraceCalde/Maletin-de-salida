import {
    forwardRef,
    useImperativeHandle,
    useRef,
} from 'react';

export interface SearchBoxHandle {
    focus: () => void;
}

interface SearchBoxProps {
    value: string;
    onChange: (value: string) => void;
}

const SearchBox = forwardRef<SearchBoxHandle, SearchBoxProps>(
    function SearchBox({ value, onChange }, ref) {
        const inputRef = useRef<HTMLInputElement>(null);

    useImperativeHandle(ref, () => ({
        focus: () => {
        inputRef.current?.focus();
        },
    }));

    return (
        <div className="search-box">
            <label htmlFor="catalog-search">
            Buscar en tu maletín
            </label>

        <div className="search-box__input-wrapper">
            <span aria-hidden="true">⌕</span>

            <input
            ref={inputRef}
            id="catalog-search"
            type="search"
            value={value}
            onChange={(event) => onChange(event.target.value)}
            placeholder="Ej. Linterna, mapa de ruta..."
            />
            </div>
        </div>
    );
    },
);

SearchBox.displayName = 'SearchBox';

export default SearchBox;
