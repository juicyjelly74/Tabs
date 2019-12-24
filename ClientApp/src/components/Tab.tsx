import * as React from 'react';
import * as TabStore from '../reducers/Tab';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { MAX_TEXT_LENGTH } from '../constants';


type TabProps = TabStore.TabProps & typeof TabStore.actionCreators;

export class Tab extends React.PureComponent<TabProps, TabStore.TabState> {
    public state = { tabText: undefined, isDisabled: false };

    constructor(props: Readonly<TabProps>) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.updateText = this.updateText.bind(this);
        this.isButtonDisabled = this.isButtonDisabled.bind(this);
    }

    updateText(text: string | undefined) {
        this.setState({ ...this.state, tabText: text, isDisabled: this.isButtonDisabled(text) });
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

    public componentDidUpdate(prevProps: Readonly<TabProps>) {
        if (this.props.tabText && prevProps.tabText !== this.props.tabText) {
            this.updateText(this.props.tabText);
        }
    }

    public componentDidMount() {
        const text = this.props.text ? this.props.text : this.state.tabText;
        this.updateText(text);
    }

    public render() {
        return (
            <React.Fragment>
                <h3>Tab {this.props.id}</h3>
                
                <Form>
                    <FormGroup>
                        <Label for="text">Enter text</Label>
                        <Input type="text" name="text" id="text" placeholder="Enter text" defaultValue={this.state.tabText} onChange={this.handleChange}/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="length">Length</Label>
                        <Input type="number" name="length" id="length" value={this.getCurrentTextLength(this.state.tabText)} disabled/>
                    </FormGroup>

                    <FormGroup>
                        <Button onClick={() => { this.props.getRandomText(); }}>Generate text</Button>{' '}
                        <Button disabled={this.state.isDisabled}
                            onClick={() => { this.props.changeCallback(this.state.tabText); }} color="primary">Send</Button>
                    </FormGroup>
                </Form>
            </React.Fragment>
        );
    }
};

export const mapActionsToProps = (dispatch: any) => ({
    getRandomText: () => dispatch(TabStore.actionCreators.getRandomText())
});