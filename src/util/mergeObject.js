export default function mergeObject(/* objects */) {
    const objects = arguments;
    const copy = {};
  
    for (const objectKey in objects) {
      const object = objects[objectKey];
      for (const key in object) {
        if (object.hasOwnProperty(key)) {
          copy[key] = object[key];
        }
      }
    }
  
    return copy;
  }