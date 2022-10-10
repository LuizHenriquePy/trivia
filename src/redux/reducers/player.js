const INITIAL_STATE = {
  name: '',
  assertions: 0,
  score: 0,
  gravatarEmail: '',
};

const player = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case 'ACTION':
    return { ...action.payload };
  default:
    return state;
  }
};

export const login = (payload) => ({
  type: 'ACTION',
  payload: { ...payload, score: 0 },
});

export default player;
