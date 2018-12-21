if (typeof Array.isArray === 'undefined') {
  Array.isArray = function (obj) {
    return Object.prototype.toString.call(obj) === '[object Array]';
  };
}

export default function isArray(obj) {
  return Array.isArray(obj);
}