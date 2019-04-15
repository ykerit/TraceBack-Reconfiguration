
export default {

  namespace: 'global',

  state: {
    isMobile: false,
    isCollapse: false,
    selectKey: '/admin/dashboard/visitorAnalysis'
  },

  reducers: {
    isMobile(state, {payload}) {
      return { ...state, isMobile: payload };
    },
    toggle(state, {payload}) {
      return { ...state, isCollapse: payload };
    },
    setSelectKey(state, {payload}) {
      return { ...state, selectKey: payload };
    },
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      yield put({ type: 'save' });
    },
  },
};
