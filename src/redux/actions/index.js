export const SAVE_PLAYER = 'SAVE_PLAYER';
export const SAVE_ASSERTIONS = 'SAVE_ASSERTIONS';
export const CALCULATE_SCORE = 'CALCULATE_SCORE';

export const savePlayer = (payload) => ({
  type: SAVE_PLAYER,
  payload,
});

export const saveAssertions = (payload) => ({
  type: SAVE_ASSERTIONS,
  payload,
});

export const calculateScore = (payload) => ({
  type: CALCULATE_SCORE,
  payload,
});

// export const resetScore = () => ({

// })
