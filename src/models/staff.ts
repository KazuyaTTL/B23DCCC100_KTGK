import { Effect, Reducer } from 'umi';

export interface WorkingHours {
  dayOfWeek: number; // 0-6 (Sunday-Saturday)
  startTime: string;
  endTime: string;
}

export interface StaffType {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar?: string;
  specialties: string[]; // Danh sách ID dịch vụ mà nhân viên có thể thực hiện
  maxCustomersPerDay: number;
  workingHours: WorkingHours[];
  rating: number;
  totalReviews: number;
  isActive: boolean;
}

export interface StaffModelState {
  staffList: StaffType[];
  loading: boolean;
  currentStaff: StaffType | null;
}

export interface StaffModelType {
  namespace: 'staff';
  state: StaffModelState;
  effects: {
    fetchStaffList: Effect;
    createStaff: Effect;
    updateStaff: Effect;
    deleteStaff: Effect;
    getStaffAvailability: Effect;
  };
  reducers: {
    setStaffList: Reducer<StaffModelState>;
    setCurrentStaff: Reducer<StaffModelState>;
    setLoading: Reducer<StaffModelState>;
  };
}

const StaffModel: StaffModelType = {
  namespace: 'staff',

  state: {
    staffList: [],
    loading: false,
    currentStaff: null,
  },

  effects: {
    *fetchStaffList({ payload }, { call, put }) {
      yield put({ type: 'setLoading', payload: true });
      try {
        // TODO: Implement API call
        // const response = yield call(getStaffList, payload);
        // yield put({ type: 'setStaffList', payload: response.data });
      } finally {
        yield put({ type: 'setLoading', payload: false });
      }
    },

    *createStaff({ payload }, { call, put }) {
      yield put({ type: 'setLoading', payload: true });
      try {
        // TODO: Implement API call
        // const response = yield call(createStaff, payload);
        // yield put({ type: 'fetchStaffList' });
      } finally {
        yield put({ type: 'setLoading', payload: false });
      }
    },

    *updateStaff({ payload }, { call, put }) {
      yield put({ type: 'setLoading', payload: true });
      try {
        // TODO: Implement API call
        // const response = yield call(updateStaff, payload);
        // yield put({ type: 'fetchStaffList' });
      } finally {
        yield put({ type: 'setLoading', payload: false });
      }
    },

    *deleteStaff({ payload }, { call, put }) {
      yield put({ type: 'setLoading', payload: true });
      try {
        // TODO: Implement API call
        // const response = yield call(deleteStaff, payload);
        // yield put({ type: 'fetchStaffList' });
      } finally {
        yield put({ type: 'setLoading', payload: false });
      }
    },

    *getStaffAvailability({ payload }, { call, put }) {
      yield put({ type: 'setLoading', payload: true });
      try {
        // TODO: Implement API call
        // const response = yield call(getStaffAvailability, payload);
        // return response.data;
      } finally {
        yield put({ type: 'setLoading', payload: false });
      }
    },
  },

  reducers: {
    setStaffList(state, { payload }) {
      return { ...state, staffList: payload };
    },
    setCurrentStaff(state, { payload }) {
      return { ...state, currentStaff: payload };
    },
    setLoading(state, { payload }) {
      return { ...state, loading: payload };
    },
  },
};

export default StaffModel; 