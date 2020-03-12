import { connect } from 'react-redux';
import { RootState } from '../../state/store';
import { AuthState } from '../../state/auth/';
import Header from './';

type StateProps = AuthState;

const mapStateToProps = (state: RootState) => ({ ...state.auth });

export type HeaderProps = StateProps;
export default connect<StateProps, any, any>(
  // @ts-ignore
  mapStateToProps
)(Header as React.SFC<HeaderProps>);
