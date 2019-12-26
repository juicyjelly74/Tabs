import { AppThunkAction } from '../store';
import { CHANGE_SHARED_TEXT_ACTION } from '../constants';
import { KnownAction, ChangeSharedTextAction } from '../actions';

export interface TabProps {
    id: string;
    text?: string | undefined;
}

export interface TabState {
    text: string | undefined;
    isDisabled: boolean;
}

export interface RandomText {
    title: string;
    slug: string;
    text: string[];
    length: number;
}

export const actionCreators = {
    changeSharedText: (text: string | undefined): AppThunkAction<KnownAction> => (dispatch, getState) => {
        dispatch({ type: CHANGE_SHARED_TEXT_ACTION, text: text } as ChangeSharedTextAction);
    }
};