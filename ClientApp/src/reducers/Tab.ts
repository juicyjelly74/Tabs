import { Action, Reducer } from 'redux';
import { AppThunkAction } from '../store';
import { GET_TEXT_API_URL, GET_TEXT_ACTION } from '../constants';

export interface TabProps {
    id: string;
    text: string | undefined;
    tabText: string | undefined;
    changeCallback: Function;
}

export interface TabState {
    tabText: string | undefined;
    isDisabled: boolean;
}

export interface RandomText {
    title: string;
    slug: string;
    text: string[];
    length: number;
}

export interface GetTextAction extends Action { type: typeof GET_TEXT_ACTION, text: string }

export type KnownAction = GetTextAction;

export const actionCreators = {
    getRandomText: (): AppThunkAction<KnownAction> => (dispatch, getState) => {
        fetch(GET_TEXT_API_URL)
            .then(response => response.json() as Promise<RandomText>)
            .then(data => {
                dispatch({ type: GET_TEXT_ACTION, text: data.text[0] } as GetTextAction);
            });
    }
};

const unloadedState: TabState = { tabText: undefined, isDisabled: false };

export const reducer: Reducer<TabState> = (state: TabState | undefined, incomingAction: Action): TabState => {
    if (state === undefined) {
        return unloadedState;
    }

    const action = incomingAction as KnownAction;
    switch (action.type) {
    case GET_TEXT_ACTION:
        if (action.text) {
            return { ...state, tabText: action.text };
        }
        break;
    }

    return state;
};