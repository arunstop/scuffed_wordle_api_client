
import { useReducer, useContext, createContext, ReactNode } from 'react'
import { CounterAction, CounterContextProps, CounterState } from '../../interfaces/InterfaceCounter';
import { GeneralContextChildren } from '../../interfaces/InterfaceGeneral';



const INITIAL_STATE: CounterState = {
    count: 0
}


const CounterStateContext = createContext<CounterContextProps>({} as CounterContextProps);
// const CounterDispatchContext = createContext()

const reducer = (state: CounterState, action: CounterAction) => {
    const { count } = state;
    const { type, payload } = action

    switch (type) {
        case 'INCREASE':
            return { count: count + payload }
        case 'DECREASE':
            if (count <= 0) return state
            return { count: count - payload }
        default:
            return state
    }
}



export const CounterProvider = ({ children }: GeneralContextChildren) => {
    const [counterState, dispatch] = useReducer(reducer, INITIAL_STATE);
    // const increase = (count: number) => {
    //     dispatch({type:'INCREASE',payload:count})
    // }
    // const decrease = (count: number) => {
    //     dispatch({type:'INCREASE',payload:count})
    // }
    const value: CounterContextProps = {
        state: counterState,
        increase: (count: number) => {
            dispatch({ type: 'INCREASE', payload: count })
        },
        decrease: (count: number) => {
            dispatch({ type: 'DECREASE', payload: count })
        }
    }
    return (
        <CounterStateContext.Provider value={value}>
            {children}
        </CounterStateContext.Provider>
    )
}

export const useCount = () => useContext(CounterStateContext)
// export const useDispatchCount = () => useContext(CounterDispatchContext)
