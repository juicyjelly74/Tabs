import * as React from 'react';
import { Route } from 'react-router';
import { connect } from 'react-redux';
import * as TabContainerStore from '../reducers/TabContainer';
import Tab from './Tab';
import { ApplicationState } from '../store';

export class TabContainer extends React.PureComponent<TabContainerStore.TabContainerProps, TabContainerStore.TabContainerState> {
    public state = { text: undefined };

    public static defaultProps = { text: undefined };
    
    constructor(props: Readonly<TabContainerStore.TabContainerProps>) {
        super(props);

        this.changeText = this.changeText.bind(this);
    }

    public componentDidUpdate(prevProps: Readonly<TabContainerStore.TabContainerProps>) {
        if (this.props.text && prevProps.text !== this.props.text) {
            this.changeText(this.props.text);
        }
    }

    changeText(text: string) {
        this.setState({ ...this.state, text: text });
    }

    public render() {
        return (
            <React.Fragment>
                <Route path="/tab/1" render={() => <Tab id={'1'} text={this.state.text} />} />
                <Route path="/tab/2" render={() => <Tab id={'2'} text={this.state.text} />} />
            </React.Fragment>
        );
    }
};

export default connect(
    (state: ApplicationState) => ({ text: state.tabContainer ? state.tabContainer.text : undefined })
)(TabContainer);