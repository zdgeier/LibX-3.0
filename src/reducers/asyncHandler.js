import mergeObject from '../util/mergeObject';
import { errorObject, loadedObject, loadingObject } from '../util/loadingObject';

/** TODO: Credit pcs */
export default function asyncHandler(baseType, initialState, transformResponse) {
  return (state, action) => {
    if (state == null || action.type === baseType + ':RESET') {
      if (initialState == null) {
        return loadingObject();
      }
      return initialState;
    }
    if (action.type === baseType + ':BEGIN') {
      return mergeObject(state, loadingObject(state));
    } else if (action.type === baseType + ':OK') {
      let response = action.response;
      if (transformResponse != null) {
        response = transformResponse(response);
      }
      return mergeObject(state, loadedObject(response));
    } else if (action.type === baseType + ':ERROR') {
      return errorObject(mergeObject(state, {
        error: action.error,
      }));
    }

    return state;
  };
}