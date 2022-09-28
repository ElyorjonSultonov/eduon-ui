export const initialState = {
  lessons: [],
  modules: [],
};
export const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_NEW_VIDEO":
      return (state = {
        ...state,
        lessons: [...state.lessons, action.payload],
      });
    case "ADD_NEW_MODULE":
      return (state = {
        ...state,
        modules: [
          ...state.modules,
          (action.payload = {
            id: action.payload.id,
            name: action.payload.name,
            lessons: state.lessons,
            index:action.payload.index
          }),
        ],
      });
    case "UPDATE_MODULE":
        return (state ={
            ...state,modules:[
                ...state.modules, action.payload
            ]
        })
    case "CLEAR_LESSONS":
      return (state = { ...state, lessons: [] });
    default:
      return state;
  }
};
