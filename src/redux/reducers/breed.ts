const breedReducer = (
  state = "",
  action: {
    type: string;
    payload?: string;
  }
) => {
  switch (action.type) {
    case "CHANGE_BREED":
      return action.payload;
    case "CHANGE_ANIMAL":
      return "";
    default:
      return state;
  }
};

export default breedReducer;
