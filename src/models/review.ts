import { Effect, Reducer } from 'umi';

export interface ReviewType {
  id: string;
  appointmentId: string;
  customerId: string;
  staffId: string;
  serviceId: string;
  rating: number; // 1-5
  comment: string;
  staffReply?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ReviewModelState {
  reviews: ReviewType[];
  loading: boolean;
  currentReview: ReviewType | null;
  staffReviews: {
    [staffId: string]: {
      averageRating: number;
      totalReviews: number;
      reviews: ReviewType[];
    };
  };
}

export interface ReviewModelType {
  namespace: 'review';
  state: ReviewModelState;
  effects: {
    fetchReviews: Effect;
    createReview: Effect;
    updateReview: Effect;
    deleteReview: Effect;
    addStaffReply: Effect;
    fetchStaffReviews: Effect;
  };
  reducers: {
    setReviews: Reducer<ReviewModelState>;
    setCurrentReview: Reducer<ReviewModelState>;
    setStaffReviews: Reducer<ReviewModelState>;
    setLoading: Reducer<ReviewModelState>;
  };
}

const ReviewModel: ReviewModelType = {
  namespace: 'review',

  state: {
    reviews: [],
    loading: false,
    currentReview: null,
    staffReviews: {},
  },

  effects: {
    *fetchReviews({ payload }, { call, put }) {
      yield put({ type: 'setLoading', payload: true });
      try {
        // TODO: Implement API call
        // const response = yield call(getReviews, payload);
        // yield put({ type: 'setReviews', payload: response.data });
      } finally {
        yield put({ type: 'setLoading', payload: false });
      }
    },

    *createReview({ payload }, { call, put }) {
      yield put({ type: 'setLoading', payload: true });
      try {
        // TODO: Implement API call
        // const response = yield call(createReview, payload);
        // yield put({ type: 'fetchReviews' });
      } finally {
        yield put({ type: 'setLoading', payload: false });
      }
    },

    *updateReview({ payload }, { call, put }) {
      yield put({ type: 'setLoading', payload: true });
      try {
        // TODO: Implement API call
        // const response = yield call(updateReview, payload);
        // yield put({ type: 'fetchReviews' });
      } finally {
        yield put({ type: 'setLoading', payload: false });
      }
    },

    *deleteReview({ payload }, { call, put }) {
      yield put({ type: 'setLoading', payload: true });
      try {
        // TODO: Implement API call
        // const response = yield call(deleteReview, payload);
        // yield put({ type: 'fetchReviews' });
      } finally {
        yield put({ type: 'setLoading', payload: false });
      }
    },

    *addStaffReply({ payload }, { call, put }) {
      yield put({ type: 'setLoading', payload: true });
      try {
        // TODO: Implement API call
        // const response = yield call(addStaffReply, payload);
        // yield put({ type: 'fetchReviews' });
      } finally {
        yield put({ type: 'setLoading', payload: false });
      }
    },

    *fetchStaffReviews({ payload }, { call, put }) {
      yield put({ type: 'setLoading', payload: true });
      try {
        // TODO: Implement API call
        // const response = yield call(getStaffReviews, payload);
        // yield put({ type: 'setStaffReviews', payload: {
        //   [payload.staffId]: {
        //     averageRating: response.averageRating,
        //     totalReviews: response.totalReviews,
        //     reviews: response.reviews,
        //   },
        // }});
      } finally {
        yield put({ type: 'setLoading', payload: false });
      }
    },
  },

  reducers: {
    setReviews(state, { payload }) {
      return { ...state, reviews: payload };
    },
    setCurrentReview(state, { payload }) {
      return { ...state, currentReview: payload };
    },
    setStaffReviews(state, { payload }) {
      return {
        ...state,
        staffReviews: {
          ...state.staffReviews,
          ...payload,
        },
      };
    },
    setLoading(state, { payload }) {
      return { ...state, loading: payload };
    },
  },
};

export default ReviewModel; 