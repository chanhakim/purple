import { IDataState, initialDataState } from "./data.state";

export interface IAppState {
    appData: IDataState;
}

export const initialAppState: IAppState = {
    appData: initialDataState
}

export function getInitialService(): IAppState {
    return initialAppState;
}