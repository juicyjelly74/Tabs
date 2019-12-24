import * as React from 'react';
import { Route } from 'react-router';
import { connect } from 'react-redux';
import * as TabContainerStore from '../reducers/TabContainer';
import FirstTab from './FirstTab';
import SecondTab from './SecondTab';
import { ApplicationState } from '../store';

export class TabContainer extends React.PureComponent<{}, TabContainerStore.TabContainerState> {
    public state = { text: undefined };
    
    constructor(props: Readonly<{}>) {
        super(props);

        this.changeText = this.changeText.bind(this);
    }

    changeText(text: string) {
        this.setState({
            text: text
        });
    }

    public render() {
        return (
            <React.Fragment>
                <Route path="/tab/1" render={() => <FirstTab id={'1'} text={this.state.text} changeCallback={this.changeText} />} />
                <Route path="/tab/2" render={() => <SecondTab id={'2'} text={this.state.text} changeCallback={this.changeText} />} />
            </React.Fragment>
        );
    }
};

export default connect(
    (state: ApplicationState) => state.tabContainer
)(TabContainer);