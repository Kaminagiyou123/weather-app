const reducer = (state, action) => {
  throw new Error(`No Matching "${action.type}" - action type`);
};

export default reducer;
