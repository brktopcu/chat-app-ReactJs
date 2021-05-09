const initialState = {
  user: {},
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_DATA":
      return {
        ...state,
        user: action.payload,
      };

    default:
      return initialState;
  }
};

export default userReducer;
