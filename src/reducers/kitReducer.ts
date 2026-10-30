
import type { KitItem } from '../components/KitSummary';

export type KitStatus = 'pending' | 'reviewed';

export interface KitState {
    items: KitItem[];
    status: KitStatus;
    message: string;
}

export type KitAction =
    | { type: 'add'; item: KitItem }
    | { type: 'remove'; key: string }
    | { type: 'markReviewed' }
    | { type: 'reset' };

export const initialKitState: KitState = {
    items: [],
    status: 'pending',
    message: '',
};

function getItemKey(item: KitItem): string {
    return item.kind === 'material'
    ? item.item.id
    : item.item.code;
}

export function kitReducer(
    state: KitState,
    action: KitAction,
): KitState {
    switch (action.type) {
    case 'add': {
        const newKey = getItemKey(action.item);

        const alreadyExists = state.items.some(
        (item) => getItemKey(item) === newKey,
        );

        if (alreadyExists) {
        return {
          ...state,
          message: '',
        };
      }

      return {
        ...state,
        items: [...state.items, action.item],
        status: 'pending',
        message: '',
      };
    }

    case 'remove':
      return {
        ...state,
        items: state.items.filter(
          (item) => getItemKey(item) !== action.key,
        ),
        status: 'pending',
        message: '',
      };

    case 'markReviewed':
      if (state.items.length === 0) {
        return {
          ...state,
          status: 'pending',
          message: 'Agregue al menos un elemento antes de revisar.',
        };
      }

      return {
        ...state,
        status: 'reviewed',
        message: '',
      };

    case 'reset':
      return initialKitState;

    default:
      return state;
  }
}
