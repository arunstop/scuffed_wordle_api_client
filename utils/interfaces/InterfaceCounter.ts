// State
export interface CounterState {
    count: number;
}

// Action
export type CounterAction = | { type: 'INCREASE', payload: number } | { type: 'DECREASE', payload: number };


// Props
export type CounterContextProps ={
    state: CounterState;
    increase: (count:number)=>void;
    decrease: (count:number)=>void;

}