// jest.setup.js
const originalGetBBox = SVGElement.prototype.getBBox;
SVGElement.prototype.getBBox = function () {
  if (this.nodeName === 'text') {
    return {
      x: 0,
      y: 0,
      width: 100,
      height: 20,
    };
  }
  return originalGetBBox.call(this);
};
