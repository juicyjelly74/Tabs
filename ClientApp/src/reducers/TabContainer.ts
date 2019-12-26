import { Action, Reducer } from 'redux';
import { CHANGE_SHARED_TEXT_ACTION } from '../constants';
import { KnownAction, ChangeSharedTextAction } from '../actions';

export interface TabContainerState {
    text: string | undefined;
}

const unloadedState: TabContainerState = { text: undefined };

export const reducer: Reducer<TabContainerState> = (state: TabContainerState | undefined, incomingAction: Action): TabContainerState => {
    if (state === undefined) {
        return unloadedState;
    }

    const action = incomingAction as KnownAction;
    switch (action.type) {
        case CHANGE_SHARED_TEXT_ACTION:
            const changeAction = action as ChangeSharedTextAction;
            if (changeAction && changeAction.text) {
                return { ...state, text: changeAction.text };
            }
            break;
    }

    return state;
};