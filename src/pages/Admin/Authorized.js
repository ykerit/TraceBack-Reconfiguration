import { connect } from 'dva';
import Redirect from 'umi/redirect';

function AuthComponent({ children, location, isAuthorized }) {
  if (isAuthorized) {
    return {children}
  } else {
    return <Redirect to="/User/Login" />
  }
}
export default connect(({ user }) => ({
  isAuthorized: user.currentUser.isAuthorized,
}))(AuthComponent);
