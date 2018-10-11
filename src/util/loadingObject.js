import mergeObject from './mergeObject';

export function loadingObject(object = {}) {
  return mergeObject(object, {
    loadingStatus: 'loading',
    error: undefined,
  });
}
export function loadedObject(object) {
  return mergeObject(object, {
    loadingStatus: 'ok',
    error: undefined,
  });
}
export function errorObject(object) {
  return mergeObject(object, {
    loadingStatus: 'error',
  });
}

export function isLoading(object) {
  return object.loadingStatus === 'loading';
}

export function isError(object) {
  return object.loadingStatus === 'error';
}

export function isLoaded(object) {
  return object.loadingStatus === 'ok';
}