import { Effect, Reducer } from 'umi';

export interface ServiceType {
  id: string;
  name: string;
  description: string;
  price: number;
  duration: number; // Thời gian thực hiện (phút)
  category: string;
  image?: string;
  isActive: boolean;
}

export interface ServiceModelState {
  services: ServiceType[];
  loading: boolean;
  currentService: ServiceType | null;
}

export interface ServiceModelType {
  namespace: 'service';
  state: ServiceModelState;
  effects: {
    fetchServices: Effect;
    createService: Effect;
    updateService: Effect;
    deleteService: Effect;
  };
  reducers: {
    setServices: Reducer<ServiceModelState>;
    setCurrentService: Reducer<ServiceModelState>;
    setLoading: Reducer<ServiceModelState>;
  };
}

const ServiceModel: ServiceModelType = {
  namespace: 'service',

  state: {
    services: [],
    loading: false,
    currentService: null,
  },

  effects: {
    *fetchServices({ payload }, { call, put }) {
      yield put({ type: 'setLoading', payload: true });
      try {
        // TODO: Implement API call
        // const response = yield call(getServices, payload);
        // yield put({ type: 'setServices', payload: response.data });
      } finally {
        yield put({ type: 'setLoading', payload: false });
      }
    },

    *createService({ payload }, { call, put }) {
      yield put({ type: 'setLoading', payload: true });
      try {
        // TODO: Implement API call
        // const response = yield call(createService, payload);
        // yield put({ type: 'fetchServices' });
      } finally {
        yield put({ type: 'setLoading', payload: false });
      }
    },

    *updateService({ payload }, { call, put }) {
      yield put({ type: 'setLoading', payload: true });
      try {
        // TODO: Implement API call
        // const response = yield call(updateService, payload);
        // yield put({ type: 'fetchServices' });
      } finally {
        yield put({ type: 'setLoading', payload: false });
      }
    },

    *deleteService({ payload }, { call, put }) {
      yield put({ type: 'setLoading', payload: true });
      try {
        // TODO: Implement API call
        // const response = yield call(deleteService, payload);
        // yield put({ type: 'fetchServices' });
      } finally {
        yield put({ type: 'setLoading', payload: false });
      }
    },
  },

  reducers: {
    setServices(state, { payload }) {
      return { ...state, services: payload };
    },
    setCurrentService(state, { payload }) {
      return { ...state, currentService: payload };
    },
    setLoading(state, { payload }) {
      return { ...state, loading: payload };
    },
  },
};

export default ServiceModel; 