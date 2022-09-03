const locationReducer = (
  state = "",
  action: {
    type: string;
    payload?: string;
  }
) => {
  switch (action.type) {
    case "CHANGE_LOCATION":
      return action.payload;
    default:
      return state;
  }
};

export default locationReducer;
