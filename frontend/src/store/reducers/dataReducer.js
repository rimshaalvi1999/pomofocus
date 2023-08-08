
const initialState = {
  cu: {},
  isuser: false
};

export default function dataReducer(state = initialState, action) {
  switch (action.type) {
 
    case "LOGIN_USER":
      return {
        ...state,
        cu: action.payload
      }
    case "LOGOUT_USER":
      return {
        ...state,
        cu: {}
      }
      case "is_user":
        return{
          ...state,
          isuser:action.payload
        }
 
    default:
      return state;
  }
}
