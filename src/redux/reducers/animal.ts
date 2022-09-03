const animalReducer = (
  state = "dog",
  action: {
    type: string;
    payload?: string;
  }
) => {
  switch (action.type) {
    case "CHANGE_ANIMAL":
      return action.payload;
    default:
      return state;
  }
};

export default animalReducer;
