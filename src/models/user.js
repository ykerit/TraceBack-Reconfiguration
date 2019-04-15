import router from 'umi/router';
import { message, notification, Icon } from 'antd'
import { getlocalStorage, dellocalStorage, setlocalStorage } from "../utils/helper";
import { updateCurrentUser, uploadImage, queryUserInfo, login, register, updateTag } from "../services/user";

message.config({
  top: 200,
});


export default {

  namespace: 'user',

  state: {
    currentUser: {}
  },

  reducers: {
    loginSuccess(state, action) {
      const {id, name, token} = action.payload.currentUser;
      setlocalStorage('id', id);
      setlocalStorage('token', token);
      setlocalStorage('name', name);
      return { ...state, ...action.payload};
    },
    loginErro(state, action) {
      return { ...state, currentUser: {}}
    },
    logoutSuccess(state){
      return { ...state, currentUser: {}}
    },
    queryUserSuccess(state, action){
      return { ...state, ...action.payload}
    }
  },

  effects: {
    *login({ payload }, {call, put}) {
      const data = yield call(login, payload);
      if (data && data.status === 200) {
        yield put({
          type:'loginSuccess',
          payload: data
        });
        yield router.push('/admin')
      } else{
        yield put({
          type: 'loginErro'
        });
        yield message.error('登录失败, 用户名或密码错误!')
      }
    },
    *logout({ payload },{ put }){
      dellocalStorage();
      console.log('logout');
      yield router.push('/user');
      yield put({
        type: 'logoutSuccess'
      });
    },
    *register({ payload }, {call, put}){
      const data = yield call(register, payload);
      if (data && data.status === 200) {
        yield put({
          type:'loginSuccess',
          payload: data
        });
        yield router.push('/admin')
      }else {
        yield put({
          type: 'loginErro'
        })
      }
    },
    *UploadAvatar({ payload }, {call, put}){
      const data = yield call(uploadImage, payload);
      if (data && data.status === 200){
        yield put({
          type: 'queryUserInfo',
          payload: getlocalStorage('id')
        });
        yield message.success('头像更新成功!');
      } else {
        yield message.error('头像更新失败!')
      }
    },
    *queryUserInfo({ payload }, {call, put }) {
      const data = yield call(queryUserInfo, payload);
      if (data && data.status === 200) {
        yield put({
          type: 'queryUserSuccess',
          payload: data
        })
      }else {
        yield put({
          type: 'loginErro'
        });
        const args = {
          message: '登出通知',
          description: '登录信息已经过期啦，请及时登录， 解锁更多姿势!',
          icon: <Icon type="smile" style={{ color: '#108ee9' }} />,
        };
        yield notification.open(args);
        yield router.push('/');
        dellocalStorage();
      }
    },
    *updateCurrentUser({ payload }, {call, put }) {
      const data = yield call(updateCurrentUser, payload);
      if (data && data.status === 200) {
        yield put({
          type: 'queryUserInfo',
          payload: data.id
        });
        yield router.push('/Admin/Account/Center');
        yield message.success('更新成功!');
      } else {
        yield message.error('更新信息失败!')
      }
    },
    *updateUserTag({ payload }, {call, put }) {
      const data = yield call(updateTag, payload);
      if (data && data.status === 200) {
        yield put({
          type: 'queryUserInfo',
          payload: data.id
        });
      }
    }
  },

};
