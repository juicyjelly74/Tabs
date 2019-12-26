import * as TabContainer from '../reducers/TabContainer';

export interface ApplicationState {
    tabContainer: TabContainer.TabContainerState | undefined;
}

export const reducers = {
    tabContainer: TabContainer.reducer
};

// This type can be used as a hint on action creators so that its 'dispatch' and 'getState' params are
// correctly typed to match store.
export interface AppThunkAction<TAction> {
    (dispatch: (action: TAction) => void, getState: () => ApplicationState): void;
}