export const fetchSuperadminPending = (state) => {
  state.loading = true;
  state.error = null;
};

export const fetchSuperadminFulfilled = (state, action) => {
  state.loading = false;
  state.data = action.payload;
};

export const fetchSuperadminRejected = (state, action) => {
  state.loading = false;
  state.error = action.payload;
};
