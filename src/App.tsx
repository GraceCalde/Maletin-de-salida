
import { useMemo, useReducer, useRef, useState } from 'react';
import './App.css';

import SearchBox, {
  type SearchBoxHandle,
} from './components/SearchBox';
import GenericCatalog from './components/GenericCatalog';
import KitSummary, {
  type KitItem,
} from './components/KitSummary';
import CompositionPanel from './components/CompositionPanel';

import {
  materialesIniciales,
  recursosDigitalesIniciales,
} from './data/initialData';

import {
  initialKitState,
  kitReducer,
} from './reducers/kitReducer';

import type { Material, RecursoDigital } from './types';

function App() {
  const [search, setSearch] = useState('');
  const [kit, dispatch] = useReducer(kitReducer, initialKitState);

  const searchBoxRef = useRef<SearchBoxHandle>(null);

  const filteredMaterials = useMemo(
    () =>
      materialesIniciales.filter((material) =>
        material.name.toLowerCase().includes(search.toLowerCase()),
      ),
    [search],
  );

  const filteredResources = useMemo(
    () =>
      recursosDigitalesIniciales.filter((resource) =>
        resource.title.toLowerCase().includes(search.toLowerCase()),
      ),
    [search],
  );

  function addMaterial(material: Material) {
    const item: KitItem = {
      kind: 'material',
      item: material,
    };

    dispatch({ type: 'add', item });
  }

  function addResource(resource: RecursoDigital) {
    const item: KitItem = {
      kind: 'recurso',
      item: resource,
    };

    dispatch({ type: 'add', item });
  }

  return (
    <main className="app">
      <header className="app-header">
        <div className="app-header__brand">
          <span className="app-header__icon" aria-hidden="true">
            ♡
          </span>

          <div>
            <p className="app-header__eyebrow">
              PREPARA · ORGANIZA · DISFRUTA
            </p>
            <h1>Maletín de salida</h1>
          </div>
        </div>

        <span className="app-header__tagline">
          Cada detalle cuenta ✨
        </span>
      </header>

      <section className="welcome">
        <p className="welcome__eyebrow">TU PRÓXIMA AVENTURA COMIENZA AQUÍ</p>
        <h2>Todo listo para salir con tranquilidad.</h2>
        <p>
          Organiza tus materiales y recursos digitales en un solo lugar.
          Prepara tu maletín a tu manera.
        </p>
      </section>

      <section className="search-section" aria-label="Buscar elementos">
        <SearchBox
          ref={searchBoxRef}
          value={search}
          onChange={setSearch}
        />

        <div className="search-section__actions">
          <button
            type="button"
            className="button-secondary"
            onClick={() => searchBoxRef.current?.focus()}
          >
            Enfocar buscador
          </button>

          <button
            type="button"
            className="button-secondary"
            onClick={() => setSearch('')}
          >
            Limpiar búsqueda
          </button>
        </div>
      </section>

      <div className="workspace">
        <div className="catalogs">
          <CompositionPanel
            header={
              <div>
                <span className="panel-kicker">01 · ESENCIALES</span>
                <h2>Materiales físicos</h2>
                <p>Los imprescindibles para tu salida.</p>
              </div>
            }
            footer={
              <span className="panel-note">
                {filteredMaterials.length} materiales disponibles
              </span>
            }
          >
            <GenericCatalog<Material>
              title="Explora los materiales"
              items={filteredMaterials}
              getKey={(material) => material.id}
              renderItem={(material) => (
                <div className="catalog-card__details">
                  <span className="catalog-card__icon" aria-hidden="true">
                    {material.id === 'm-01'
                      ? '🔦'
                      : material.id === 'm-02'
                        ? '📏'
                        : '🩹'}
                  </span>

                  <div>
                    <strong>{material.name}</strong>
                    <span>
                      Cantidad disponible: {material.quantity}
                    </span>
                  </div>
                </div>
              )}
              onSelect={addMaterial}
            />
          </CompositionPanel>

          <CompositionPanel
            header={
              <div>
                <span className="panel-kicker">02 · A TU ALCANCE</span>
                <h2>Recursos digitales</h2>
                <p>Información útil para llevar contigo.</p>
              </div>
            }
            footer={
              <span className="panel-note">
                {filteredResources.length} recursos disponibles
              </span>
            }
          >
            <GenericCatalog<RecursoDigital>
              title="Explora los recursos"
              items={filteredResources}
              getKey={(resource) => resource.code}
              renderItem={(resource) => (
                <div className="catalog-card__details">
                  <span className="catalog-card__icon" aria-hidden="true">
                    {resource.format === 'pdf' ? '📄' : '🗺️'}
                  </span>

                  <div>
                    <strong>{resource.title}</strong>
                    <span>
                      Formato: {resource.format.toUpperCase()}
                    </span>
                  </div>
                </div>
              )}
              onSelect={addResource}
            />
          </CompositionPanel>
        </div>

        <aside className="kit-column">
          <KitSummary
            items={kit.items}
            status={kit.status}
            message={kit.message}
            onRemove={(key) => dispatch({ type: 'remove', key })}
            onMarkReviewed={() => dispatch({ type: 'markReviewed' })}
            onReset={() => dispatch({ type: 'reset' })}
          />

          <div className="tip-card">
            <span aria-hidden="true">✿</span>
            <div>
              <h3>Un pequeño recordatorio</h3>
              <p>
                Revisa tu maletín antes de salir. Una buena preparación
                hace que cada aventura sea más sencilla.
              </p>
            </div>
          </div>
        </aside>
      </div>

      <footer className="app-footer">
        <span>Maletín de salida</span>
        <span>Hecho con cuidado para cada aventura ♡</span>
      </footer>
    </main>
  );
}

export default App;
