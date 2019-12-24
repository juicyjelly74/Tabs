import { Tab, mapActionsToProps }  from './Tab';
import { connect } from 'react-redux';
import { ApplicationState } from '../store';

class SecondTab extends Tab {
    
};

export default connect(
    (state: ApplicationState) => state.secondTab,
    mapActionsToProps
)(SecondTab);