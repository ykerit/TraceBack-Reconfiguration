import { queryLog } from "../../../../services/logger";

export default {

  namespace: 'logger',

  state: {
    opLog: [],
    op_total: null,
    userLog: [],
    userLog_total: null,
  },

  reducers: {
    querySuccess(state, action){
      return { ...state, ...action.payload}
    },
  },

  effects: {
    *queryLog({ payload }, {call, put}){
      const data = yield call(queryLog, payload);
      if (data && data.status === 200) {
        yield put({
          type:'querySuccess',
          payload: data
        })
      }
    },
  },

};