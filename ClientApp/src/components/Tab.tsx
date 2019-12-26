import * as React from 'react';
import { connect } from 'react-redux';
import * as TabStore from '../reducers/Tab';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { MAX_TEXT_LENGTH, GET_TEXT_API_URL } from '../constants';
import { ApplicationState } from '../store';

type TabProps = TabStore.TabProps & typeof TabStore.actionCreators;

class Tab extends React.PureComponent<TabProps, TabStore.TabState> {
    constructor(props: Readonly<TabProps>) {
        super(props);

        const text = this.props.text ? this.props.text : '';
        this.state = { text: text, isDisabled: this.isButtonDisabled(text) };

        this.handleChange = this.handleChange.bind(this);
        this.updateText = this.updateText.bind(this);
        this.getRandomText = this.getRandomText.bind(this);
        this.isButtonDisabled = this.isButtonDisabled.bind(this);
    }

    updateText(text: string | undefined) {
        this.setState({ ...this.state, text: text, isDisabled: this.isButtonDisabled(text) });
    }

    isButtonDisabled(text: string | undefined) {
        return text !== undefined && text.length > MAX_TEXT_LENGTH;
    }

    handleChange(event: { target: { value: string; }; }) {
        let value = event.target.value;
        this.updateText(value);
    }

    getCurrentTextLength(text: string | undefined) {
        return text !== undefined ? text.length : 0;
    }

    getRandomText() {
        fetch(GET_TEXT_API_URL)
            .then(response => response.json() as Promise<TabStore.RandomText>)
            .then(data => {
                this.updateText(data.text[0]);
            });
    }

    public render() {
        return (
            <React.Fragment>
                <h3>Tab {this.props.id}</h3>
                
                <Form>
                    <FormGroup>
                        <Label for="text">Enter text</Label>
                        <Input type="text" name="text" id="text" placeholder="Enter text" value={this.state.text} onChange={this.handleChange}/>
                    </FormGroup>

                    <FormGroup>
                        <Label for="length">Length</Label>
                        <Input type="number" name="length" id="length" value={this.getCurrentTextLength(this.state.text)} disabled/>
                    </FormGroup>

                    <FormGroup>
                        <Button onClick={() => { this.getRandomText(); }}>Generate text</Button>{' '}
                        <Button disabled={this.state.isDisabled}
                            onClick={() => { this.props.changeSharedText(this.state.text); }} color="primary">Send</Button>
                    </FormGroup>
                </Form>
            </React.Fragment>
        );
    }
};

const mapActionsToProps = (dispatch: any) => ({
    changeSharedText: (text: string | undefined) => dispatch(TabStore.actionCreators.changeSharedText(text))
});

export default connect(
    (state: ApplicationState) => ({ text: state.tabContainer ? state.tabContainer.text : undefined }),
    mapActionsToProps
)(Tab);