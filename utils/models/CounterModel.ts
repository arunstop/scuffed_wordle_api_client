// State
export interface CounterState {
    count: number;
}

// Action
export interface CounterAction {
    increase: (count: number) => void;
    decrease: (count: number) => void;
}

// Action types
export type CounterActionTypes =
    | { type: 'INCREASE'; payload: number; }
    | { type: 'DECREASE'; payload: number; };

// Props
export type CounterContextProps = {
    state: CounterState;
    action: CounterAction;
};