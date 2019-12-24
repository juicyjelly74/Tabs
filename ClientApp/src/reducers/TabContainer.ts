import { Action, Reducer } from 'redux';

export interface TabContainerState {
    text: string | undefined;
}

const unloadedState: TabContainerState = { text: undefined };

export const reducer: Reducer<TabContainerState> = (state: TabContainerState | undefined, incomingAction: Action): TabContainerState => {
    if (state === undefined) {
        return unloadedState;
    }

    return state;
};