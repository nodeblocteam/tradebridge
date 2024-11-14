import {
  __commonJS
} from "./chunk-256EKJAK.js";

// node_modules/blockies/build/index.js
var require_build = __commonJS({
  "node_modules/blockies/build/index.js"(exports, module) {
    module.exports = function() {
      function r(r2) {
        for (var t2 = 0; t2 < l.length; t2++) l[t2] = 0;
        for (var t2 = 0; t2 < r2.length; t2++) l[t2 % 4] = (l[t2 % 4] << 5) - l[t2 % 4] + r2.charCodeAt(t2);
      }
      function t() {
        var r2 = l[0] ^ l[0] << 11;
        return l[0] = l[1], l[1] = l[2], l[2] = l[3], l[3] = l[3] ^ l[3] >> 19 ^ r2 ^ r2 >> 8, (l[3] >>> 0) / (1 << 31 >>> 0);
      }
      function e() {
        var r2 = Math.floor(360 * t()), e2 = 60 * t() + 40 + "%", o2 = 25 * (t() + t() + t() + t()) + "%", n2 = "hsl(" + r2 + "," + e2 + "," + o2 + ")";
        return n2;
      }
      function o(r2) {
        for (var e2 = r2, o2 = r2, n2 = Math.ceil(e2 / 2), a2 = e2 - n2, l2 = [], f = 0; o2 > f; f++) {
          for (var h = [], c = 0; n2 > c; c++) h[c] = Math.floor(2.3 * t());
          var i = h.slice(0, a2);
          i.reverse(), h = h.concat(i);
          for (var v = 0; v < h.length; v++) l2.push(h[v]);
        }
        return l2;
      }
      function n(r2, t2, e2, o2, n2) {
        var a2 = document.createElement("canvas"), l2 = Math.sqrt(r2.length);
        a2.width = a2.height = l2 * e2;
        var f = a2.getContext("2d");
        f.fillStyle = o2, f.fillRect(0, 0, a2.width, a2.height), f.fillStyle = t2;
        for (var h = 0; h < r2.length; h++) {
          var c = Math.floor(h / l2), i = h % l2;
          f.fillStyle = 1 == r2[h] ? t2 : n2, r2[h] && f.fillRect(i * e2, c * e2, e2, e2);
        }
        return a2;
      }
      function a(t2) {
        t2 = t2 || {};
        var a2 = t2.size || 8, l2 = t2.scale || 4, f = t2.seed || Math.floor(Math.random() * Math.pow(10, 16)).toString(16);
        r(f);
        var h = t2.color || e(), c = t2.bgcolor || e(), i = t2.spotcolor || e(), v = o(a2), u = n(v, h, l2, c, i);
        return u;
      }
      var l = Array(4);
      return a;
    }();
  }
});
export default require_build();
//# sourceMappingURL=blockies.js.map
