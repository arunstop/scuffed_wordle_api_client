import { ReactNode } from "react";

export interface MainChildren {
    children: ReactNode;
    // children: JSX.Element | JSX.Element[]
}

export type MainColorTypes=|'primary'|'secondary'|'accent'|'info'|'warning'|'success'|'error';
