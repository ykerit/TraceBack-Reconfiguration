import React from 'react';
import Redirect from 'umi/redirect';
import { connect } from 'dva';
import { getlocalStorage } from '../utils/helper';

function AuthComponent({ children, isAuthorization}) {
  return (
    isAuthorization || getlocalStorage('id') ? children : <Redirect to="/user"/>
  );
}
export default connect(({ user }) => ({
  isAuthorization: user.currentUser.isAuthorization
}))(AuthComponent);
