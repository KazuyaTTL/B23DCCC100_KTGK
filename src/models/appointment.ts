import { Effect, Reducer } from 'umi';

export interface AppointmentStatus {
  PENDING: 'pending';
  CONFIRMED: 'confirmed';
  COMPLETED: 'completed';
  CANCELLED: 'cancelled';
}

export interface AppointmentType {
  id: string;
  customerId: string;
  staffId: string;
  serviceId: string;
  date: string;
  startTime: string;
  endTime: string;
  status: keyof AppointmentStatus;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface AppointmentModelState {
  appointments: AppointmentType[];
  loading: boolean;
  currentAppointment: AppointmentType | null;
}

export interface AppointmentModelType {
  namespace: 'appointment';
  state: AppointmentModelState;
  effects: {
    fetchAppointments: Effect;
    createAppointment: Effect;
    updateAppointment: Effect;
    deleteAppointment: Effect;
    checkAvailability: Effect;
  };
  reducers: {
    setAppointments: Reducer<AppointmentModelState>;
    setCurrentAppointment: Reducer<AppointmentModelState>;
    setLoading: Reducer<AppointmentModelState>;
  };
}

const AppointmentModel: AppointmentModelType = {
  namespace: 'appointment',
  
  state: {
    appointments: [],
    loading: false,
    currentAppointment: null,
  },

  effects: {
    *fetchAppointments({ payload }, { call, put }) {
      yield put({ type: 'setLoading', payload: true });
      try {
        // TODO: Implement API call
        // const response = yield call(getAppointments, payload);
        // yield put({ type: 'setAppointments', payload: response.data });
      } finally {
        yield put({ type: 'setLoading', payload: false });
      }
    },

    *createAppointment({ payload }, { call, put }) {
      yield put({ type: 'setLoading', payload: true });
      try {
        // TODO: Implement API call
        // const response = yield call(createAppointment, payload);
        // yield put({ type: 'fetchAppointments' });
      } finally {
        yield put({ type: 'setLoading', payload: false });
      }
    },

    *updateAppointment({ payload }, { call, put }) {
      yield put({ type: 'setLoading', payload: true });
      try {
        // TODO: Implement API call
        // const response = yield call(updateAppointment, payload);
        // yield put({ type: 'fetchAppointments' });
      } finally {
        yield put({ type: 'setLoading', payload: false });
      }
    },

    *deleteAppointment({ payload }, { call, put }) {
      yield put({ type: 'setLoading', payload: true });
      try {
        // TODO: Implement API call
        // const response = yield call(deleteAppointment, payload);
        // yield put({ type: 'fetchAppointments' });
      } finally {
        yield put({ type: 'setLoading', payload: false });
      }
    },

    *checkAvailability({ payload }, { call, put }) {
      yield put({ type: 'setLoading', payload: true });
      try {
        // TODO: Implement availability check
        // const response = yield call(checkStaffAvailability, payload);
        // return response.data;
      } finally {
        yield put({ type: 'setLoading', payload: false });
      }
    },
  },

  reducers: {
    setAppointments(state, { payload }) {
      return { ...state, appointments: payload };
    },
    setCurrentAppointment(state, { payload }) {
      return { ...state, currentAppointment: payload };
    },
    setLoading(state, { payload }) {
      return { ...state, loading: payload };
    },
  },
};

export default AppointmentModel; 