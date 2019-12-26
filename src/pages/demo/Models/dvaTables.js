import { getTableDatas } from '@/services/dvaTable';

const UserModel = {
  namespace: 'dvaTables',
  state: {
    list: [],
  },
  effects: {
    *fetch(_, { call, put }) {
      const response = yield call(getTableDatas);
      yield put({
        type: 'save',
        payload: response,
      });
    },

    // *fetchCurrent(_, { call, put }) {
    //   const response = yield call(queryCurrent);
    //   yield put({
    //     type: 'saveCurrentUser',
    //     payload: response,
    //   });
    // },
  },
  reducers: {
    save(state, action) {
      return { ...state, list: action.payload };
    },

    // saveCurrentUser(state, action) {
    //   return { ...state, currentUser: action.payload || {} };
    // },

    // changeNotifyCount(
    //   state = {
    //     currentUser: {},
    //   },
    //   action,
    // ) {
    //   return {
    //     ...state,
    //     currentUser: {
    //       ...state.currentUser,
    //       notifyCount: action.payload.totalCount,
    //       unreadCount: action.payload.unreadCount,
    //     },
    //   };
    // },
  },
};
export default UserModel;
