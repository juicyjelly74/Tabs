import { Tab, mapActionsToProps } from './Tab';
import { connect } from 'react-redux';
import { ApplicationState } from '../store';


class FirstTab extends Tab {
    
};

export default connect(
    (state: ApplicationState) => state.firstTab,
    mapActionsToProps
)(FirstTab);