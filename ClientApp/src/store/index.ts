import * as TabContainer from '../reducers/TabContainer';
import * as Tab from '../reducers/Tab';

// The top-level state object
export interface ApplicationState {
    tabContainer: TabContainer.TabContainerState | undefined;
    firstTab: Tab.TabState | undefined;
    secondTab: Tab.TabState | undefined;
}

// Whenever an action is dispatched, Redux will update each top-level application state property using
// the reducer with the matching name. It's important that the names match exactly, and that the reducer
// acts on the corresponding ApplicationState property type.
export const reducers = {
    tabContainer: TabContainer.reducer,
    firstTab: Tab.reducer,
    secondTab: Tab.reducer
};

// This type can be used as a hint on action creators so that its 'dispatch' and 'getState' params are
// correctly typed to match your store.
export interface AppThunkAction<TAction> {
    (dispatch: (action: TAction) => void, getState: () => ApplicationState): void;
}