import * as React from 'react';
import { Route } from 'react-router';
import { connect } from 'react-redux';
import Tab from './Tab';
import * as TabContainerStore from '../reducers/TabContainer';

export class TabContainer extends React.PureComponent<{}, TabContainerStore.TabContainerState> {
    public render() {
        return (
            <React.Fragment>
                <Route path="/tab/1" render={() => <Tab id={'1'} />} />
                <Route path="/tab/2" render={() => <Tab id={'2'} />} />
            </React.Fragment>
        );
    }
};

export default connect()(TabContainer);