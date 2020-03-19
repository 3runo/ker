import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { RootState } from '../../state/store';
import { authAction, AuthState } from '../../state/auth/';
import { postLogin } from '../../state/auth/api';
import { serializeFormValues } from '../../helpers/dom';
import Login from './';

type StateProps = AuthState;
type OwnProps = { history: any };
type DispatchProps = {
  onFormSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
};

const mapStateToProps = (state: RootState) => ({ ...state.auth });

const mapDispatchToProps = (
  dispatch: Dispatch,
  ownProps: OwnProps
): DispatchProps => ({
  onFormSubmit: function onFormSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const payload = serializeFormValues(e);

    dispatch(
      authAction(
        postLogin(payload)
          .then((response) => {
            window.localStorage.setItem('ker_token', response.token);
            window.sessionStorage.setItem('ker_user', response.userName);
            window.sessionStorage.setItem('ker_authenticated', '1');
            ownProps.history.replace('/');
            return response; // side effect + keeping promise chain
          })
          .catch((err) => {
            return Promise.reject(err); // keeping promise chain
          })
      )
    );
  },
});

export type LoginProps = StateProps & DispatchProps;
export default connect<StateProps, DispatchProps, OwnProps>(
  // @ts-ignore
  mapStateToProps,
  mapDispatchToProps
)(Login as React.SFC<LoginProps>);
