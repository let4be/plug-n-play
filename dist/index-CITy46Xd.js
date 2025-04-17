var _c = Object.defineProperty;
var Wc = (r, t, e) => t in r ? _c(r, t, { enumerable: !0, configurable: !0, writable: !0, value: e }) : r[t] = e;
var Ae = (r, t, e) => Wc(r, typeof t != "symbol" ? t + "" : t, e);
import { HttpAgent as Ye, Actor as kn, Cbor as qc, Expiry as Hc, SubmitRequestType as Zc, compare as Yc, requestIdOf as Gc, Certificate as No, LookupStatus as Gi, lookupResultToBuffer as Jc, IC_ROOT_KEY as Kc, AnonymousIdentity as Vc } from "@dfinity/agent";
import { AuthClient as Xc } from "@dfinity/auth-client";
import { Principal as ke } from "@dfinity/principal";
import { asciiStringToByteArray as $c, arrayOfNumberToUint8Array as tu, bigEndianCrc32 as eu, uint8ArrayToHexString as nu } from "@dfinity/utils";
import { DelegationChain as La, Delegation as Ra, Ed25519KeyIdentity as Da, DelegationIdentity as Oa } from "@dfinity/identity";
import { lebDecode as ru, PipeArrayBuffer as iu } from "@dfinity/candid";
function Rr(r) {
  return r && r.__esModule && Object.prototype.hasOwnProperty.call(r, "default") ? r.default : r;
}
function Ua(r) {
  if (r.__esModule) return r;
  var t = r.default;
  if (typeof t == "function") {
    var e = function n() {
      return this instanceof n ? Reflect.construct(t, arguments, this.constructor) : t.apply(this, arguments);
    };
    e.prototype = t.prototype;
  } else e = {};
  return Object.defineProperty(e, "__esModule", { value: !0 }), Object.keys(r).forEach(function(n) {
    var i = Object.getOwnPropertyDescriptor(r, n);
    Object.defineProperty(e, n, i.get ? i : {
      enumerable: !0,
      get: function() {
        return r[n];
      }
    });
  }), e;
}
var Ji = {}, fr = {}, To;
function su() {
  if (To) return fr;
  To = 1, fr.byteLength = h, fr.toByteArray = E, fr.fromByteArray = P;
  for (var r = [], t = [], e = typeof Uint8Array < "u" ? Uint8Array : Array, n = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", i = 0, s = n.length; i < s; ++i)
    r[i] = n[i], t[n.charCodeAt(i)] = i;
  t[45] = 62, t[95] = 63;
  function l(O) {
    var j = O.length;
    if (j % 4 > 0)
      throw new Error("Invalid string. Length must be a multiple of 4");
    var D = O.indexOf("=");
    D === -1 && (D = j);
    var N = D === j ? 0 : 4 - D % 4;
    return [D, N];
  }
  function h(O) {
    var j = l(O), D = j[0], N = j[1];
    return (D + N) * 3 / 4 - N;
  }
  function A(O, j, D) {
    return (j + D) * 3 / 4 - D;
  }
  function E(O) {
    var j, D = l(O), N = D[0], Z = D[1], Q = new e(A(O, N, Z)), W = 0, V = Z > 0 ? N - 4 : N, K;
    for (K = 0; K < V; K += 4)
      j = t[O.charCodeAt(K)] << 18 | t[O.charCodeAt(K + 1)] << 12 | t[O.charCodeAt(K + 2)] << 6 | t[O.charCodeAt(K + 3)], Q[W++] = j >> 16 & 255, Q[W++] = j >> 8 & 255, Q[W++] = j & 255;
    return Z === 2 && (j = t[O.charCodeAt(K)] << 2 | t[O.charCodeAt(K + 1)] >> 4, Q[W++] = j & 255), Z === 1 && (j = t[O.charCodeAt(K)] << 10 | t[O.charCodeAt(K + 1)] << 4 | t[O.charCodeAt(K + 2)] >> 2, Q[W++] = j >> 8 & 255, Q[W++] = j & 255), Q;
  }
  function v(O) {
    return r[O >> 18 & 63] + r[O >> 12 & 63] + r[O >> 6 & 63] + r[O & 63];
  }
  function T(O, j, D) {
    for (var N, Z = [], Q = j; Q < D; Q += 3)
      N = (O[Q] << 16 & 16711680) + (O[Q + 1] << 8 & 65280) + (O[Q + 2] & 255), Z.push(v(N));
    return Z.join("");
  }
  function P(O) {
    for (var j, D = O.length, N = D % 3, Z = [], Q = 16383, W = 0, V = D - N; W < V; W += Q)
      Z.push(T(O, W, W + Q > V ? V : W + Q));
    return N === 1 ? (j = O[D - 1], Z.push(
      r[j >> 2] + r[j << 4 & 63] + "=="
    )) : N === 2 && (j = (O[D - 2] << 8) + O[D - 1], Z.push(
      r[j >> 10] + r[j >> 4 & 63] + r[j << 2 & 63] + "="
    )), Z.join("");
  }
  return fr;
}
var Pr = {};
/*! ieee754. BSD-3-Clause License. Feross Aboukhadijeh <https://feross.org/opensource> */
var Lo;
function ou() {
  return Lo || (Lo = 1, Pr.read = function(r, t, e, n, i) {
    var s, l, h = i * 8 - n - 1, A = (1 << h) - 1, E = A >> 1, v = -7, T = e ? i - 1 : 0, P = e ? -1 : 1, O = r[t + T];
    for (T += P, s = O & (1 << -v) - 1, O >>= -v, v += h; v > 0; s = s * 256 + r[t + T], T += P, v -= 8)
      ;
    for (l = s & (1 << -v) - 1, s >>= -v, v += n; v > 0; l = l * 256 + r[t + T], T += P, v -= 8)
      ;
    if (s === 0)
      s = 1 - E;
    else {
      if (s === A)
        return l ? NaN : (O ? -1 : 1) * (1 / 0);
      l = l + Math.pow(2, n), s = s - E;
    }
    return (O ? -1 : 1) * l * Math.pow(2, s - n);
  }, Pr.write = function(r, t, e, n, i, s) {
    var l, h, A, E = s * 8 - i - 1, v = (1 << E) - 1, T = v >> 1, P = i === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0, O = n ? 0 : s - 1, j = n ? 1 : -1, D = t < 0 || t === 0 && 1 / t < 0 ? 1 : 0;
    for (t = Math.abs(t), isNaN(t) || t === 1 / 0 ? (h = isNaN(t) ? 1 : 0, l = v) : (l = Math.floor(Math.log(t) / Math.LN2), t * (A = Math.pow(2, -l)) < 1 && (l--, A *= 2), l + T >= 1 ? t += P / A : t += P * Math.pow(2, 1 - T), t * A >= 2 && (l++, A /= 2), l + T >= v ? (h = 0, l = v) : l + T >= 1 ? (h = (t * A - 1) * Math.pow(2, i), l = l + T) : (h = t * Math.pow(2, T - 1) * Math.pow(2, i), l = 0)); i >= 8; r[e + O] = h & 255, O += j, h /= 256, i -= 8)
      ;
    for (l = l << i | h, E += i; E > 0; r[e + O] = l & 255, O += j, l /= 256, E -= 8)
      ;
    r[e + O - j] |= D * 128;
  }), Pr;
}
/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <https://feross.org>
 * @license  MIT
 */
var Ro;
function yi() {
  return Ro || (Ro = 1, function(r) {
    const t = su(), e = ou(), n = typeof Symbol == "function" && typeof Symbol.for == "function" ? Symbol.for("nodejs.util.inspect.custom") : null;
    r.Buffer = h, r.SlowBuffer = Q, r.INSPECT_MAX_BYTES = 50;
    const i = 2147483647;
    r.kMaxLength = i, h.TYPED_ARRAY_SUPPORT = s(), !h.TYPED_ARRAY_SUPPORT && typeof console < "u" && typeof console.error == "function" && console.error(
      "This browser lacks typed array (Uint8Array) support which is required by `buffer` v5.x. Use `buffer` v4.x if you require old browser support."
    );
    function s() {
      try {
        const a = new Uint8Array(1), o = { foo: function() {
          return 42;
        } };
        return Object.setPrototypeOf(o, Uint8Array.prototype), Object.setPrototypeOf(a, o), a.foo() === 42;
      } catch {
        return !1;
      }
    }
    Object.defineProperty(h.prototype, "parent", {
      enumerable: !0,
      get: function() {
        if (h.isBuffer(this))
          return this.buffer;
      }
    }), Object.defineProperty(h.prototype, "offset", {
      enumerable: !0,
      get: function() {
        if (h.isBuffer(this))
          return this.byteOffset;
      }
    });
    function l(a) {
      if (a > i)
        throw new RangeError('The value "' + a + '" is invalid for option "size"');
      const o = new Uint8Array(a);
      return Object.setPrototypeOf(o, h.prototype), o;
    }
    function h(a, o, c) {
      if (typeof a == "number") {
        if (typeof o == "string")
          throw new TypeError(
            'The "string" argument must be of type string. Received type number'
          );
        return T(a);
      }
      return A(a, o, c);
    }
    h.poolSize = 8192;
    function A(a, o, c) {
      if (typeof a == "string")
        return P(a, o);
      if (ArrayBuffer.isView(a))
        return j(a);
      if (a == null)
        throw new TypeError(
          "The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof a
        );
      if (jt(a, ArrayBuffer) || a && jt(a.buffer, ArrayBuffer) || typeof SharedArrayBuffer < "u" && (jt(a, SharedArrayBuffer) || a && jt(a.buffer, SharedArrayBuffer)))
        return D(a, o, c);
      if (typeof a == "number")
        throw new TypeError(
          'The "value" argument must not be of type number. Received type number'
        );
      const y = a.valueOf && a.valueOf();
      if (y != null && y !== a)
        return h.from(y, o, c);
      const k = N(a);
      if (k) return k;
      if (typeof Symbol < "u" && Symbol.toPrimitive != null && typeof a[Symbol.toPrimitive] == "function")
        return h.from(a[Symbol.toPrimitive]("string"), o, c);
      throw new TypeError(
        "The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof a
      );
    }
    h.from = function(a, o, c) {
      return A(a, o, c);
    }, Object.setPrototypeOf(h.prototype, Uint8Array.prototype), Object.setPrototypeOf(h, Uint8Array);
    function E(a) {
      if (typeof a != "number")
        throw new TypeError('"size" argument must be of type number');
      if (a < 0)
        throw new RangeError('The value "' + a + '" is invalid for option "size"');
    }
    function v(a, o, c) {
      return E(a), a <= 0 ? l(a) : o !== void 0 ? typeof c == "string" ? l(a).fill(o, c) : l(a).fill(o) : l(a);
    }
    h.alloc = function(a, o, c) {
      return v(a, o, c);
    };
    function T(a) {
      return E(a), l(a < 0 ? 0 : Z(a) | 0);
    }
    h.allocUnsafe = function(a) {
      return T(a);
    }, h.allocUnsafeSlow = function(a) {
      return T(a);
    };
    function P(a, o) {
      if ((typeof o != "string" || o === "") && (o = "utf8"), !h.isEncoding(o))
        throw new TypeError("Unknown encoding: " + o);
      const c = W(a, o) | 0;
      let y = l(c);
      const k = y.write(a, o);
      return k !== c && (y = y.slice(0, k)), y;
    }
    function O(a) {
      const o = a.length < 0 ? 0 : Z(a.length) | 0, c = l(o);
      for (let y = 0; y < o; y += 1)
        c[y] = a[y] & 255;
      return c;
    }
    function j(a) {
      if (jt(a, Uint8Array)) {
        const o = new Uint8Array(a);
        return D(o.buffer, o.byteOffset, o.byteLength);
      }
      return O(a);
    }
    function D(a, o, c) {
      if (o < 0 || a.byteLength < o)
        throw new RangeError('"offset" is outside of buffer bounds');
      if (a.byteLength < o + (c || 0))
        throw new RangeError('"length" is outside of buffer bounds');
      let y;
      return o === void 0 && c === void 0 ? y = new Uint8Array(a) : c === void 0 ? y = new Uint8Array(a, o) : y = new Uint8Array(a, o, c), Object.setPrototypeOf(y, h.prototype), y;
    }
    function N(a) {
      if (h.isBuffer(a)) {
        const o = Z(a.length) | 0, c = l(o);
        return c.length === 0 || a.copy(c, 0, 0, o), c;
      }
      if (a.length !== void 0)
        return typeof a.length != "number" || Rt(a.length) ? l(0) : O(a);
      if (a.type === "Buffer" && Array.isArray(a.data))
        return O(a.data);
    }
    function Z(a) {
      if (a >= i)
        throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x" + i.toString(16) + " bytes");
      return a | 0;
    }
    function Q(a) {
      return +a != a && (a = 0), h.alloc(+a);
    }
    h.isBuffer = function(o) {
      return o != null && o._isBuffer === !0 && o !== h.prototype;
    }, h.compare = function(o, c) {
      if (jt(o, Uint8Array) && (o = h.from(o, o.offset, o.byteLength)), jt(c, Uint8Array) && (c = h.from(c, c.offset, c.byteLength)), !h.isBuffer(o) || !h.isBuffer(c))
        throw new TypeError(
          'The "buf1", "buf2" arguments must be one of type Buffer or Uint8Array'
        );
      if (o === c) return 0;
      let y = o.length, k = c.length;
      for (let z = 0, q = Math.min(y, k); z < q; ++z)
        if (o[z] !== c[z]) {
          y = o[z], k = c[z];
          break;
        }
      return y < k ? -1 : k < y ? 1 : 0;
    }, h.isEncoding = function(o) {
      switch (String(o).toLowerCase()) {
        case "hex":
        case "utf8":
        case "utf-8":
        case "ascii":
        case "latin1":
        case "binary":
        case "base64":
        case "ucs2":
        case "ucs-2":
        case "utf16le":
        case "utf-16le":
          return !0;
        default:
          return !1;
      }
    }, h.concat = function(o, c) {
      if (!Array.isArray(o))
        throw new TypeError('"list" argument must be an Array of Buffers');
      if (o.length === 0)
        return h.alloc(0);
      let y;
      if (c === void 0)
        for (c = 0, y = 0; y < o.length; ++y)
          c += o[y].length;
      const k = h.allocUnsafe(c);
      let z = 0;
      for (y = 0; y < o.length; ++y) {
        let q = o[y];
        if (jt(q, Uint8Array))
          z + q.length > k.length ? (h.isBuffer(q) || (q = h.from(q)), q.copy(k, z)) : Uint8Array.prototype.set.call(
            k,
            q,
            z
          );
        else if (h.isBuffer(q))
          q.copy(k, z);
        else
          throw new TypeError('"list" argument must be an Array of Buffers');
        z += q.length;
      }
      return k;
    };
    function W(a, o) {
      if (h.isBuffer(a))
        return a.length;
      if (ArrayBuffer.isView(a) || jt(a, ArrayBuffer))
        return a.byteLength;
      if (typeof a != "string")
        throw new TypeError(
          'The "string" argument must be one of type string, Buffer, or ArrayBuffer. Received type ' + typeof a
        );
      const c = a.length, y = arguments.length > 2 && arguments[2] === !0;
      if (!y && c === 0) return 0;
      let k = !1;
      for (; ; )
        switch (o) {
          case "ascii":
          case "latin1":
          case "binary":
            return c;
          case "utf8":
          case "utf-8":
            return Bt(a).length;
          case "ucs2":
          case "ucs-2":
          case "utf16le":
          case "utf-16le":
            return c * 2;
          case "hex":
            return c >>> 1;
          case "base64":
            return Lt(a).length;
          default:
            if (k)
              return y ? -1 : Bt(a).length;
            o = ("" + o).toLowerCase(), k = !0;
        }
    }
    h.byteLength = W;
    function V(a, o, c) {
      let y = !1;
      if ((o === void 0 || o < 0) && (o = 0), o > this.length || ((c === void 0 || c > this.length) && (c = this.length), c <= 0) || (c >>>= 0, o >>>= 0, c <= o))
        return "";
      for (a || (a = "utf8"); ; )
        switch (a) {
          case "hex":
            return B(this, o, c);
          case "utf8":
          case "utf-8":
            return u(this, o, c);
          case "ascii":
            return m(this, o, c);
          case "latin1":
          case "binary":
            return w(this, o, c);
          case "base64":
            return b(this, o, c);
          case "ucs2":
          case "ucs-2":
          case "utf16le":
          case "utf-16le":
            return F(this, o, c);
          default:
            if (y) throw new TypeError("Unknown encoding: " + a);
            a = (a + "").toLowerCase(), y = !0;
        }
    }
    h.prototype._isBuffer = !0;
    function K(a, o, c) {
      const y = a[o];
      a[o] = a[c], a[c] = y;
    }
    h.prototype.swap16 = function() {
      const o = this.length;
      if (o % 2 !== 0)
        throw new RangeError("Buffer size must be a multiple of 16-bits");
      for (let c = 0; c < o; c += 2)
        K(this, c, c + 1);
      return this;
    }, h.prototype.swap32 = function() {
      const o = this.length;
      if (o % 4 !== 0)
        throw new RangeError("Buffer size must be a multiple of 32-bits");
      for (let c = 0; c < o; c += 4)
        K(this, c, c + 3), K(this, c + 1, c + 2);
      return this;
    }, h.prototype.swap64 = function() {
      const o = this.length;
      if (o % 8 !== 0)
        throw new RangeError("Buffer size must be a multiple of 64-bits");
      for (let c = 0; c < o; c += 8)
        K(this, c, c + 7), K(this, c + 1, c + 6), K(this, c + 2, c + 5), K(this, c + 3, c + 4);
      return this;
    }, h.prototype.toString = function() {
      const o = this.length;
      return o === 0 ? "" : arguments.length === 0 ? u(this, 0, o) : V.apply(this, arguments);
    }, h.prototype.toLocaleString = h.prototype.toString, h.prototype.equals = function(o) {
      if (!h.isBuffer(o)) throw new TypeError("Argument must be a Buffer");
      return this === o ? !0 : h.compare(this, o) === 0;
    }, h.prototype.inspect = function() {
      let o = "";
      const c = r.INSPECT_MAX_BYTES;
      return o = this.toString("hex", 0, c).replace(/(.{2})/g, "$1 ").trim(), this.length > c && (o += " ... "), "<Buffer " + o + ">";
    }, n && (h.prototype[n] = h.prototype.inspect), h.prototype.compare = function(o, c, y, k, z) {
      if (jt(o, Uint8Array) && (o = h.from(o, o.offset, o.byteLength)), !h.isBuffer(o))
        throw new TypeError(
          'The "target" argument must be one of type Buffer or Uint8Array. Received type ' + typeof o
        );
      if (c === void 0 && (c = 0), y === void 0 && (y = o ? o.length : 0), k === void 0 && (k = 0), z === void 0 && (z = this.length), c < 0 || y > o.length || k < 0 || z > this.length)
        throw new RangeError("out of range index");
      if (k >= z && c >= y)
        return 0;
      if (k >= z)
        return -1;
      if (c >= y)
        return 1;
      if (c >>>= 0, y >>>= 0, k >>>= 0, z >>>= 0, this === o) return 0;
      let q = z - k, ut = y - c;
      const lt = Math.min(q, ut), at = this.slice(k, z), yt = o.slice(c, y);
      for (let ct = 0; ct < lt; ++ct)
        if (at[ct] !== yt[ct]) {
          q = at[ct], ut = yt[ct];
          break;
        }
      return q < ut ? -1 : ut < q ? 1 : 0;
    };
    function X(a, o, c, y, k) {
      if (a.length === 0) return -1;
      if (typeof c == "string" ? (y = c, c = 0) : c > 2147483647 ? c = 2147483647 : c < -2147483648 && (c = -2147483648), c = +c, Rt(c) && (c = k ? 0 : a.length - 1), c < 0 && (c = a.length + c), c >= a.length) {
        if (k) return -1;
        c = a.length - 1;
      } else if (c < 0)
        if (k) c = 0;
        else return -1;
      if (typeof o == "string" && (o = h.from(o, y)), h.isBuffer(o))
        return o.length === 0 ? -1 : nt(a, o, c, y, k);
      if (typeof o == "number")
        return o = o & 255, typeof Uint8Array.prototype.indexOf == "function" ? k ? Uint8Array.prototype.indexOf.call(a, o, c) : Uint8Array.prototype.lastIndexOf.call(a, o, c) : nt(a, [o], c, y, k);
      throw new TypeError("val must be string, number or Buffer");
    }
    function nt(a, o, c, y, k) {
      let z = 1, q = a.length, ut = o.length;
      if (y !== void 0 && (y = String(y).toLowerCase(), y === "ucs2" || y === "ucs-2" || y === "utf16le" || y === "utf-16le")) {
        if (a.length < 2 || o.length < 2)
          return -1;
        z = 2, q /= 2, ut /= 2, c /= 2;
      }
      function lt(yt, ct) {
        return z === 1 ? yt[ct] : yt.readUInt16BE(ct * z);
      }
      let at;
      if (k) {
        let yt = -1;
        for (at = c; at < q; at++)
          if (lt(a, at) === lt(o, yt === -1 ? 0 : at - yt)) {
            if (yt === -1 && (yt = at), at - yt + 1 === ut) return yt * z;
          } else
            yt !== -1 && (at -= at - yt), yt = -1;
      } else
        for (c + ut > q && (c = q - ut), at = c; at >= 0; at--) {
          let yt = !0;
          for (let ct = 0; ct < ut; ct++)
            if (lt(a, at + ct) !== lt(o, ct)) {
              yt = !1;
              break;
            }
          if (yt) return at;
        }
      return -1;
    }
    h.prototype.includes = function(o, c, y) {
      return this.indexOf(o, c, y) !== -1;
    }, h.prototype.indexOf = function(o, c, y) {
      return X(this, o, c, y, !0);
    }, h.prototype.lastIndexOf = function(o, c, y) {
      return X(this, o, c, y, !1);
    };
    function C(a, o, c, y) {
      c = Number(c) || 0;
      const k = a.length - c;
      y ? (y = Number(y), y > k && (y = k)) : y = k;
      const z = o.length;
      y > z / 2 && (y = z / 2);
      let q;
      for (q = 0; q < y; ++q) {
        const ut = parseInt(o.substr(q * 2, 2), 16);
        if (Rt(ut)) return q;
        a[c + q] = ut;
      }
      return q;
    }
    function M(a, o, c, y) {
      return Ct(Bt(o, a.length - c), a, c, y);
    }
    function x(a, o, c, y) {
      return Ct(Dt(o), a, c, y);
    }
    function U(a, o, c, y) {
      return Ct(Lt(o), a, c, y);
    }
    function R(a, o, c, y) {
      return Ct(gn(o, a.length - c), a, c, y);
    }
    h.prototype.write = function(o, c, y, k) {
      if (c === void 0)
        k = "utf8", y = this.length, c = 0;
      else if (y === void 0 && typeof c == "string")
        k = c, y = this.length, c = 0;
      else if (isFinite(c))
        c = c >>> 0, isFinite(y) ? (y = y >>> 0, k === void 0 && (k = "utf8")) : (k = y, y = void 0);
      else
        throw new Error(
          "Buffer.write(string, encoding, offset[, length]) is no longer supported"
        );
      const z = this.length - c;
      if ((y === void 0 || y > z) && (y = z), o.length > 0 && (y < 0 || c < 0) || c > this.length)
        throw new RangeError("Attempt to write outside buffer bounds");
      k || (k = "utf8");
      let q = !1;
      for (; ; )
        switch (k) {
          case "hex":
            return C(this, o, c, y);
          case "utf8":
          case "utf-8":
            return M(this, o, c, y);
          case "ascii":
          case "latin1":
          case "binary":
            return x(this, o, c, y);
          case "base64":
            return U(this, o, c, y);
          case "ucs2":
          case "ucs-2":
          case "utf16le":
          case "utf-16le":
            return R(this, o, c, y);
          default:
            if (q) throw new TypeError("Unknown encoding: " + k);
            k = ("" + k).toLowerCase(), q = !0;
        }
    }, h.prototype.toJSON = function() {
      return {
        type: "Buffer",
        data: Array.prototype.slice.call(this._arr || this, 0)
      };
    };
    function b(a, o, c) {
      return o === 0 && c === a.length ? t.fromByteArray(a) : t.fromByteArray(a.slice(o, c));
    }
    function u(a, o, c) {
      c = Math.min(a.length, c);
      const y = [];
      let k = o;
      for (; k < c; ) {
        const z = a[k];
        let q = null, ut = z > 239 ? 4 : z > 223 ? 3 : z > 191 ? 2 : 1;
        if (k + ut <= c) {
          let lt, at, yt, ct;
          switch (ut) {
            case 1:
              z < 128 && (q = z);
              break;
            case 2:
              lt = a[k + 1], (lt & 192) === 128 && (ct = (z & 31) << 6 | lt & 63, ct > 127 && (q = ct));
              break;
            case 3:
              lt = a[k + 1], at = a[k + 2], (lt & 192) === 128 && (at & 192) === 128 && (ct = (z & 15) << 12 | (lt & 63) << 6 | at & 63, ct > 2047 && (ct < 55296 || ct > 57343) && (q = ct));
              break;
            case 4:
              lt = a[k + 1], at = a[k + 2], yt = a[k + 3], (lt & 192) === 128 && (at & 192) === 128 && (yt & 192) === 128 && (ct = (z & 15) << 18 | (lt & 63) << 12 | (at & 63) << 6 | yt & 63, ct > 65535 && ct < 1114112 && (q = ct));
          }
        }
        q === null ? (q = 65533, ut = 1) : q > 65535 && (q -= 65536, y.push(q >>> 10 & 1023 | 55296), q = 56320 | q & 1023), y.push(q), k += ut;
      }
      return p(y);
    }
    const d = 4096;
    function p(a) {
      const o = a.length;
      if (o <= d)
        return String.fromCharCode.apply(String, a);
      let c = "", y = 0;
      for (; y < o; )
        c += String.fromCharCode.apply(
          String,
          a.slice(y, y += d)
        );
      return c;
    }
    function m(a, o, c) {
      let y = "";
      c = Math.min(a.length, c);
      for (let k = o; k < c; ++k)
        y += String.fromCharCode(a[k] & 127);
      return y;
    }
    function w(a, o, c) {
      let y = "";
      c = Math.min(a.length, c);
      for (let k = o; k < c; ++k)
        y += String.fromCharCode(a[k]);
      return y;
    }
    function B(a, o, c) {
      const y = a.length;
      (!o || o < 0) && (o = 0), (!c || c < 0 || c > y) && (c = y);
      let k = "";
      for (let z = o; z < c; ++z)
        k += zt[a[z]];
      return k;
    }
    function F(a, o, c) {
      const y = a.slice(o, c);
      let k = "";
      for (let z = 0; z < y.length - 1; z += 2)
        k += String.fromCharCode(y[z] + y[z + 1] * 256);
      return k;
    }
    h.prototype.slice = function(o, c) {
      const y = this.length;
      o = ~~o, c = c === void 0 ? y : ~~c, o < 0 ? (o += y, o < 0 && (o = 0)) : o > y && (o = y), c < 0 ? (c += y, c < 0 && (c = 0)) : c > y && (c = y), c < o && (c = o);
      const k = this.subarray(o, c);
      return Object.setPrototypeOf(k, h.prototype), k;
    };
    function I(a, o, c) {
      if (a % 1 !== 0 || a < 0) throw new RangeError("offset is not uint");
      if (a + o > c) throw new RangeError("Trying to access beyond buffer length");
    }
    h.prototype.readUintLE = h.prototype.readUIntLE = function(o, c, y) {
      o = o >>> 0, c = c >>> 0, y || I(o, c, this.length);
      let k = this[o], z = 1, q = 0;
      for (; ++q < c && (z *= 256); )
        k += this[o + q] * z;
      return k;
    }, h.prototype.readUintBE = h.prototype.readUIntBE = function(o, c, y) {
      o = o >>> 0, c = c >>> 0, y || I(o, c, this.length);
      let k = this[o + --c], z = 1;
      for (; c > 0 && (z *= 256); )
        k += this[o + --c] * z;
      return k;
    }, h.prototype.readUint8 = h.prototype.readUInt8 = function(o, c) {
      return o = o >>> 0, c || I(o, 1, this.length), this[o];
    }, h.prototype.readUint16LE = h.prototype.readUInt16LE = function(o, c) {
      return o = o >>> 0, c || I(o, 2, this.length), this[o] | this[o + 1] << 8;
    }, h.prototype.readUint16BE = h.prototype.readUInt16BE = function(o, c) {
      return o = o >>> 0, c || I(o, 2, this.length), this[o] << 8 | this[o + 1];
    }, h.prototype.readUint32LE = h.prototype.readUInt32LE = function(o, c) {
      return o = o >>> 0, c || I(o, 4, this.length), (this[o] | this[o + 1] << 8 | this[o + 2] << 16) + this[o + 3] * 16777216;
    }, h.prototype.readUint32BE = h.prototype.readUInt32BE = function(o, c) {
      return o = o >>> 0, c || I(o, 4, this.length), this[o] * 16777216 + (this[o + 1] << 16 | this[o + 2] << 8 | this[o + 3]);
    }, h.prototype.readBigUInt64LE = Jt(function(o) {
      o = o >>> 0, Et(o, "offset");
      const c = this[o], y = this[o + 7];
      (c === void 0 || y === void 0) && ht(o, this.length - 8);
      const k = c + this[++o] * 2 ** 8 + this[++o] * 2 ** 16 + this[++o] * 2 ** 24, z = this[++o] + this[++o] * 2 ** 8 + this[++o] * 2 ** 16 + y * 2 ** 24;
      return BigInt(k) + (BigInt(z) << BigInt(32));
    }), h.prototype.readBigUInt64BE = Jt(function(o) {
      o = o >>> 0, Et(o, "offset");
      const c = this[o], y = this[o + 7];
      (c === void 0 || y === void 0) && ht(o, this.length - 8);
      const k = c * 2 ** 24 + this[++o] * 2 ** 16 + this[++o] * 2 ** 8 + this[++o], z = this[++o] * 2 ** 24 + this[++o] * 2 ** 16 + this[++o] * 2 ** 8 + y;
      return (BigInt(k) << BigInt(32)) + BigInt(z);
    }), h.prototype.readIntLE = function(o, c, y) {
      o = o >>> 0, c = c >>> 0, y || I(o, c, this.length);
      let k = this[o], z = 1, q = 0;
      for (; ++q < c && (z *= 256); )
        k += this[o + q] * z;
      return z *= 128, k >= z && (k -= Math.pow(2, 8 * c)), k;
    }, h.prototype.readIntBE = function(o, c, y) {
      o = o >>> 0, c = c >>> 0, y || I(o, c, this.length);
      let k = c, z = 1, q = this[o + --k];
      for (; k > 0 && (z *= 256); )
        q += this[o + --k] * z;
      return z *= 128, q >= z && (q -= Math.pow(2, 8 * c)), q;
    }, h.prototype.readInt8 = function(o, c) {
      return o = o >>> 0, c || I(o, 1, this.length), this[o] & 128 ? (255 - this[o] + 1) * -1 : this[o];
    }, h.prototype.readInt16LE = function(o, c) {
      o = o >>> 0, c || I(o, 2, this.length);
      const y = this[o] | this[o + 1] << 8;
      return y & 32768 ? y | 4294901760 : y;
    }, h.prototype.readInt16BE = function(o, c) {
      o = o >>> 0, c || I(o, 2, this.length);
      const y = this[o + 1] | this[o] << 8;
      return y & 32768 ? y | 4294901760 : y;
    }, h.prototype.readInt32LE = function(o, c) {
      return o = o >>> 0, c || I(o, 4, this.length), this[o] | this[o + 1] << 8 | this[o + 2] << 16 | this[o + 3] << 24;
    }, h.prototype.readInt32BE = function(o, c) {
      return o = o >>> 0, c || I(o, 4, this.length), this[o] << 24 | this[o + 1] << 16 | this[o + 2] << 8 | this[o + 3];
    }, h.prototype.readBigInt64LE = Jt(function(o) {
      o = o >>> 0, Et(o, "offset");
      const c = this[o], y = this[o + 7];
      (c === void 0 || y === void 0) && ht(o, this.length - 8);
      const k = this[o + 4] + this[o + 5] * 2 ** 8 + this[o + 6] * 2 ** 16 + (y << 24);
      return (BigInt(k) << BigInt(32)) + BigInt(c + this[++o] * 2 ** 8 + this[++o] * 2 ** 16 + this[++o] * 2 ** 24);
    }), h.prototype.readBigInt64BE = Jt(function(o) {
      o = o >>> 0, Et(o, "offset");
      const c = this[o], y = this[o + 7];
      (c === void 0 || y === void 0) && ht(o, this.length - 8);
      const k = (c << 24) + // Overflow
      this[++o] * 2 ** 16 + this[++o] * 2 ** 8 + this[++o];
      return (BigInt(k) << BigInt(32)) + BigInt(this[++o] * 2 ** 24 + this[++o] * 2 ** 16 + this[++o] * 2 ** 8 + y);
    }), h.prototype.readFloatLE = function(o, c) {
      return o = o >>> 0, c || I(o, 4, this.length), e.read(this, o, !0, 23, 4);
    }, h.prototype.readFloatBE = function(o, c) {
      return o = o >>> 0, c || I(o, 4, this.length), e.read(this, o, !1, 23, 4);
    }, h.prototype.readDoubleLE = function(o, c) {
      return o = o >>> 0, c || I(o, 8, this.length), e.read(this, o, !0, 52, 8);
    }, h.prototype.readDoubleBE = function(o, c) {
      return o = o >>> 0, c || I(o, 8, this.length), e.read(this, o, !1, 52, 8);
    };
    function f(a, o, c, y, k, z) {
      if (!h.isBuffer(a)) throw new TypeError('"buffer" argument must be a Buffer instance');
      if (o > k || o < z) throw new RangeError('"value" argument is out of bounds');
      if (c + y > a.length) throw new RangeError("Index out of range");
    }
    h.prototype.writeUintLE = h.prototype.writeUIntLE = function(o, c, y, k) {
      if (o = +o, c = c >>> 0, y = y >>> 0, !k) {
        const ut = Math.pow(2, 8 * y) - 1;
        f(this, o, c, y, ut, 0);
      }
      let z = 1, q = 0;
      for (this[c] = o & 255; ++q < y && (z *= 256); )
        this[c + q] = o / z & 255;
      return c + y;
    }, h.prototype.writeUintBE = h.prototype.writeUIntBE = function(o, c, y, k) {
      if (o = +o, c = c >>> 0, y = y >>> 0, !k) {
        const ut = Math.pow(2, 8 * y) - 1;
        f(this, o, c, y, ut, 0);
      }
      let z = y - 1, q = 1;
      for (this[c + z] = o & 255; --z >= 0 && (q *= 256); )
        this[c + z] = o / q & 255;
      return c + y;
    }, h.prototype.writeUint8 = h.prototype.writeUInt8 = function(o, c, y) {
      return o = +o, c = c >>> 0, y || f(this, o, c, 1, 255, 0), this[c] = o & 255, c + 1;
    }, h.prototype.writeUint16LE = h.prototype.writeUInt16LE = function(o, c, y) {
      return o = +o, c = c >>> 0, y || f(this, o, c, 2, 65535, 0), this[c] = o & 255, this[c + 1] = o >>> 8, c + 2;
    }, h.prototype.writeUint16BE = h.prototype.writeUInt16BE = function(o, c, y) {
      return o = +o, c = c >>> 0, y || f(this, o, c, 2, 65535, 0), this[c] = o >>> 8, this[c + 1] = o & 255, c + 2;
    }, h.prototype.writeUint32LE = h.prototype.writeUInt32LE = function(o, c, y) {
      return o = +o, c = c >>> 0, y || f(this, o, c, 4, 4294967295, 0), this[c + 3] = o >>> 24, this[c + 2] = o >>> 16, this[c + 1] = o >>> 8, this[c] = o & 255, c + 4;
    }, h.prototype.writeUint32BE = h.prototype.writeUInt32BE = function(o, c, y) {
      return o = +o, c = c >>> 0, y || f(this, o, c, 4, 4294967295, 0), this[c] = o >>> 24, this[c + 1] = o >>> 16, this[c + 2] = o >>> 8, this[c + 3] = o & 255, c + 4;
    };
    function g(a, o, c, y, k) {
      bt(o, y, k, a, c, 7);
      let z = Number(o & BigInt(4294967295));
      a[c++] = z, z = z >> 8, a[c++] = z, z = z >> 8, a[c++] = z, z = z >> 8, a[c++] = z;
      let q = Number(o >> BigInt(32) & BigInt(4294967295));
      return a[c++] = q, q = q >> 8, a[c++] = q, q = q >> 8, a[c++] = q, q = q >> 8, a[c++] = q, c;
    }
    function S(a, o, c, y, k) {
      bt(o, y, k, a, c, 7);
      let z = Number(o & BigInt(4294967295));
      a[c + 7] = z, z = z >> 8, a[c + 6] = z, z = z >> 8, a[c + 5] = z, z = z >> 8, a[c + 4] = z;
      let q = Number(o >> BigInt(32) & BigInt(4294967295));
      return a[c + 3] = q, q = q >> 8, a[c + 2] = q, q = q >> 8, a[c + 1] = q, q = q >> 8, a[c] = q, c + 8;
    }
    h.prototype.writeBigUInt64LE = Jt(function(o, c = 0) {
      return g(this, o, c, BigInt(0), BigInt("0xffffffffffffffff"));
    }), h.prototype.writeBigUInt64BE = Jt(function(o, c = 0) {
      return S(this, o, c, BigInt(0), BigInt("0xffffffffffffffff"));
    }), h.prototype.writeIntLE = function(o, c, y, k) {
      if (o = +o, c = c >>> 0, !k) {
        const lt = Math.pow(2, 8 * y - 1);
        f(this, o, c, y, lt - 1, -lt);
      }
      let z = 0, q = 1, ut = 0;
      for (this[c] = o & 255; ++z < y && (q *= 256); )
        o < 0 && ut === 0 && this[c + z - 1] !== 0 && (ut = 1), this[c + z] = (o / q >> 0) - ut & 255;
      return c + y;
    }, h.prototype.writeIntBE = function(o, c, y, k) {
      if (o = +o, c = c >>> 0, !k) {
        const lt = Math.pow(2, 8 * y - 1);
        f(this, o, c, y, lt - 1, -lt);
      }
      let z = y - 1, q = 1, ut = 0;
      for (this[c + z] = o & 255; --z >= 0 && (q *= 256); )
        o < 0 && ut === 0 && this[c + z + 1] !== 0 && (ut = 1), this[c + z] = (o / q >> 0) - ut & 255;
      return c + y;
    }, h.prototype.writeInt8 = function(o, c, y) {
      return o = +o, c = c >>> 0, y || f(this, o, c, 1, 127, -128), o < 0 && (o = 255 + o + 1), this[c] = o & 255, c + 1;
    }, h.prototype.writeInt16LE = function(o, c, y) {
      return o = +o, c = c >>> 0, y || f(this, o, c, 2, 32767, -32768), this[c] = o & 255, this[c + 1] = o >>> 8, c + 2;
    }, h.prototype.writeInt16BE = function(o, c, y) {
      return o = +o, c = c >>> 0, y || f(this, o, c, 2, 32767, -32768), this[c] = o >>> 8, this[c + 1] = o & 255, c + 2;
    }, h.prototype.writeInt32LE = function(o, c, y) {
      return o = +o, c = c >>> 0, y || f(this, o, c, 4, 2147483647, -2147483648), this[c] = o & 255, this[c + 1] = o >>> 8, this[c + 2] = o >>> 16, this[c + 3] = o >>> 24, c + 4;
    }, h.prototype.writeInt32BE = function(o, c, y) {
      return o = +o, c = c >>> 0, y || f(this, o, c, 4, 2147483647, -2147483648), o < 0 && (o = 4294967295 + o + 1), this[c] = o >>> 24, this[c + 1] = o >>> 16, this[c + 2] = o >>> 8, this[c + 3] = o & 255, c + 4;
    }, h.prototype.writeBigInt64LE = Jt(function(o, c = 0) {
      return g(this, o, c, -BigInt("0x8000000000000000"), BigInt("0x7fffffffffffffff"));
    }), h.prototype.writeBigInt64BE = Jt(function(o, c = 0) {
      return S(this, o, c, -BigInt("0x8000000000000000"), BigInt("0x7fffffffffffffff"));
    });
    function L(a, o, c, y, k, z) {
      if (c + y > a.length) throw new RangeError("Index out of range");
      if (c < 0) throw new RangeError("Index out of range");
    }
    function H(a, o, c, y, k) {
      return o = +o, c = c >>> 0, k || L(a, o, c, 4), e.write(a, o, c, y, 23, 4), c + 4;
    }
    h.prototype.writeFloatLE = function(o, c, y) {
      return H(this, o, c, !0, y);
    }, h.prototype.writeFloatBE = function(o, c, y) {
      return H(this, o, c, !1, y);
    };
    function J(a, o, c, y, k) {
      return o = +o, c = c >>> 0, k || L(a, o, c, 8), e.write(a, o, c, y, 52, 8), c + 8;
    }
    h.prototype.writeDoubleLE = function(o, c, y) {
      return J(this, o, c, !0, y);
    }, h.prototype.writeDoubleBE = function(o, c, y) {
      return J(this, o, c, !1, y);
    }, h.prototype.copy = function(o, c, y, k) {
      if (!h.isBuffer(o)) throw new TypeError("argument should be a Buffer");
      if (y || (y = 0), !k && k !== 0 && (k = this.length), c >= o.length && (c = o.length), c || (c = 0), k > 0 && k < y && (k = y), k === y || o.length === 0 || this.length === 0) return 0;
      if (c < 0)
        throw new RangeError("targetStart out of bounds");
      if (y < 0 || y >= this.length) throw new RangeError("Index out of range");
      if (k < 0) throw new RangeError("sourceEnd out of bounds");
      k > this.length && (k = this.length), o.length - c < k - y && (k = o.length - c + y);
      const z = k - y;
      return this === o && typeof Uint8Array.prototype.copyWithin == "function" ? this.copyWithin(c, y, k) : Uint8Array.prototype.set.call(
        o,
        this.subarray(y, k),
        c
      ), z;
    }, h.prototype.fill = function(o, c, y, k) {
      if (typeof o == "string") {
        if (typeof c == "string" ? (k = c, c = 0, y = this.length) : typeof y == "string" && (k = y, y = this.length), k !== void 0 && typeof k != "string")
          throw new TypeError("encoding must be a string");
        if (typeof k == "string" && !h.isEncoding(k))
          throw new TypeError("Unknown encoding: " + k);
        if (o.length === 1) {
          const q = o.charCodeAt(0);
          (k === "utf8" && q < 128 || k === "latin1") && (o = q);
        }
      } else typeof o == "number" ? o = o & 255 : typeof o == "boolean" && (o = Number(o));
      if (c < 0 || this.length < c || this.length < y)
        throw new RangeError("Out of range index");
      if (y <= c)
        return this;
      c = c >>> 0, y = y === void 0 ? this.length : y >>> 0, o || (o = 0);
      let z;
      if (typeof o == "number")
        for (z = c; z < y; ++z)
          this[z] = o;
      else {
        const q = h.isBuffer(o) ? o : h.from(o, k), ut = q.length;
        if (ut === 0)
          throw new TypeError('The value "' + o + '" is invalid for argument "value"');
        for (z = 0; z < y - c; ++z)
          this[z + c] = q[z % ut];
      }
      return this;
    };
    const tt = {};
    function st(a, o, c) {
      tt[a] = class extends c {
        constructor() {
          super(), Object.defineProperty(this, "message", {
            value: o.apply(this, arguments),
            writable: !0,
            configurable: !0
          }), this.name = `${this.name} [${a}]`, this.stack, delete this.name;
        }
        get code() {
          return a;
        }
        set code(k) {
          Object.defineProperty(this, "code", {
            configurable: !0,
            enumerable: !0,
            value: k,
            writable: !0
          });
        }
        toString() {
          return `${this.name} [${a}]: ${this.message}`;
        }
      };
    }
    st(
      "ERR_BUFFER_OUT_OF_BOUNDS",
      function(a) {
        return a ? `${a} is outside of buffer bounds` : "Attempt to access memory outside buffer bounds";
      },
      RangeError
    ), st(
      "ERR_INVALID_ARG_TYPE",
      function(a, o) {
        return `The "${a}" argument must be of type number. Received type ${typeof o}`;
      },
      TypeError
    ), st(
      "ERR_OUT_OF_RANGE",
      function(a, o, c) {
        let y = `The value of "${a}" is out of range.`, k = c;
        return Number.isInteger(c) && Math.abs(c) > 2 ** 32 ? k = xt(String(c)) : typeof c == "bigint" && (k = String(c), (c > BigInt(2) ** BigInt(32) || c < -(BigInt(2) ** BigInt(32))) && (k = xt(k)), k += "n"), y += ` It must be ${o}. Received ${k}`, y;
      },
      RangeError
    );
    function xt(a) {
      let o = "", c = a.length;
      const y = a[0] === "-" ? 1 : 0;
      for (; c >= y + 4; c -= 3)
        o = `_${a.slice(c - 3, c)}${o}`;
      return `${a.slice(0, c)}${o}`;
    }
    function At(a, o, c) {
      Et(o, "offset"), (a[o] === void 0 || a[o + c] === void 0) && ht(o, a.length - (c + 1));
    }
    function bt(a, o, c, y, k, z) {
      if (a > c || a < o) {
        const q = typeof o == "bigint" ? "n" : "";
        let ut;
        throw o === 0 || o === BigInt(0) ? ut = `>= 0${q} and < 2${q} ** ${(z + 1) * 8}${q}` : ut = `>= -(2${q} ** ${(z + 1) * 8 - 1}${q}) and < 2 ** ${(z + 1) * 8 - 1}${q}`, new tt.ERR_OUT_OF_RANGE("value", ut, a);
      }
      At(y, k, z);
    }
    function Et(a, o) {
      if (typeof a != "number")
        throw new tt.ERR_INVALID_ARG_TYPE(o, "number", a);
    }
    function ht(a, o, c) {
      throw Math.floor(a) !== a ? (Et(a, c), new tt.ERR_OUT_OF_RANGE("offset", "an integer", a)) : o < 0 ? new tt.ERR_BUFFER_OUT_OF_BOUNDS() : new tt.ERR_OUT_OF_RANGE(
        "offset",
        `>= 0 and <= ${o}`,
        a
      );
    }
    const wt = /[^+/0-9A-Za-z-_]/g;
    function rn(a) {
      if (a = a.split("=")[0], a = a.trim().replace(wt, ""), a.length < 2) return "";
      for (; a.length % 4 !== 0; )
        a = a + "=";
      return a;
    }
    function Bt(a, o) {
      o = o || 1 / 0;
      let c;
      const y = a.length;
      let k = null;
      const z = [];
      for (let q = 0; q < y; ++q) {
        if (c = a.charCodeAt(q), c > 55295 && c < 57344) {
          if (!k) {
            if (c > 56319) {
              (o -= 3) > -1 && z.push(239, 191, 189);
              continue;
            } else if (q + 1 === y) {
              (o -= 3) > -1 && z.push(239, 191, 189);
              continue;
            }
            k = c;
            continue;
          }
          if (c < 56320) {
            (o -= 3) > -1 && z.push(239, 191, 189), k = c;
            continue;
          }
          c = (k - 55296 << 10 | c - 56320) + 65536;
        } else k && (o -= 3) > -1 && z.push(239, 191, 189);
        if (k = null, c < 128) {
          if ((o -= 1) < 0) break;
          z.push(c);
        } else if (c < 2048) {
          if ((o -= 2) < 0) break;
          z.push(
            c >> 6 | 192,
            c & 63 | 128
          );
        } else if (c < 65536) {
          if ((o -= 3) < 0) break;
          z.push(
            c >> 12 | 224,
            c >> 6 & 63 | 128,
            c & 63 | 128
          );
        } else if (c < 1114112) {
          if ((o -= 4) < 0) break;
          z.push(
            c >> 18 | 240,
            c >> 12 & 63 | 128,
            c >> 6 & 63 | 128,
            c & 63 | 128
          );
        } else
          throw new Error("Invalid code point");
      }
      return z;
    }
    function Dt(a) {
      const o = [];
      for (let c = 0; c < a.length; ++c)
        o.push(a.charCodeAt(c) & 255);
      return o;
    }
    function gn(a, o) {
      let c, y, k;
      const z = [];
      for (let q = 0; q < a.length && !((o -= 2) < 0); ++q)
        c = a.charCodeAt(q), y = c >> 8, k = c % 256, z.push(k), z.push(y);
      return z;
    }
    function Lt(a) {
      return t.toByteArray(rn(a));
    }
    function Ct(a, o, c, y) {
      let k;
      for (k = 0; k < y && !(k + c >= o.length || k >= a.length); ++k)
        o[k + c] = a[k];
      return k;
    }
    function jt(a, o) {
      return a instanceof o || a != null && a.constructor != null && a.constructor.name != null && a.constructor.name === o.name;
    }
    function Rt(a) {
      return a !== a;
    }
    const zt = function() {
      const a = "0123456789abcdef", o = new Array(256);
      for (let c = 0; c < 16; ++c) {
        const y = c * 16;
        for (let k = 0; k < 16; ++k)
          o[y + k] = a[c] + a[k];
      }
      return o;
    }();
    function Jt(a) {
      return typeof BigInt > "u" ? Pt : a;
    }
    function Pt() {
      throw new Error("BigInt not supported");
    }
  }(Ji)), Ji;
}
var ft = yi(), pt;
((r) => {
  ((t) => {
    t.INIT = "INIT", t.READY = "READY", t.CONNECTING = "CONNECTING", t.CONNECTED = "CONNECTED", t.DISCONNECTING = "DISCONNECTING", t.DISCONNECTED = "DISCONNECTED", t.ERROR = "ERROR";
  })(r.Status || (r.Status = {})), ((t) => {
    t.ICP = "icp", t.SOL = "sol", t.ETH = "eth";
  })(r.Chain || (r.Chain = {}));
})(pt || (pt = {}));
const au = "data:image/webp;base64,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";
var cu = Object.create, ja = Object.defineProperty, uu = Object.getOwnPropertyDescriptor, lu = Object.getOwnPropertyNames, hu = Object.getPrototypeOf, fu = Object.prototype.hasOwnProperty, Ks = (r, t) => () => (t || r((t = { exports: {} }).exports, t), t.exports), du = (r, t, e, n) => {
  if (t && typeof t == "object" || typeof t == "function") for (let i of lu(t)) !fu.call(r, i) && i !== e && ja(r, i, { get: () => t[i], enumerable: !(n = uu(t, i)) || n.enumerable });
  return r;
}, gu = (r, t, e) => (e = r != null ? cu(hu(r)) : {}, du(!r || !r.__esModule ? ja(e, "default", { value: r, enumerable: !0 }) : e, r));
function Au(r) {
  return r instanceof Uint8Array || r != null && typeof r == "object" && r.constructor.name === "Uint8Array";
}
function za(r, ...t) {
  if (!Au(r)) throw new Error("Uint8Array expected");
  if (t.length > 0 && !t.includes(r.length)) throw new Error(`Uint8Array expected of length ${t}, not of length=${r.length}`);
}
function Do(r, t = !0) {
  if (r.destroyed) throw new Error("Hash instance has been destroyed");
  if (t && r.finished) throw new Error("Hash#digest() has already been called");
}
function pu(r, t) {
  za(r);
  let e = t.outputLen;
  if (r.length < e) throw new Error(`digestInto() expects output buffer of length at least ${e}`);
}
var Ki = (r) => new DataView(r.buffer, r.byteOffset, r.byteLength), Je = (r, t) => r << 32 - t | r >>> t;
new Uint8Array(new Uint32Array([287454020]).buffer)[0];
function wu(r) {
  if (typeof r != "string") throw new Error(`utf8ToBytes expected string, got ${typeof r}`);
  return new Uint8Array(new TextEncoder().encode(r));
}
function Pa(r) {
  return typeof r == "string" && (r = wu(r)), za(r), r;
}
var yu = class {
  clone() {
    return this._cloneInto();
  }
};
function mu(r) {
  let t = (n) => r().update(Pa(n)).digest(), e = r();
  return t.outputLen = e.outputLen, t.blockLen = e.blockLen, t.create = () => r(), t;
}
function bu(r, t, e, n) {
  if (typeof r.setBigUint64 == "function") return r.setBigUint64(t, e, n);
  let i = BigInt(32), s = BigInt(4294967295), l = Number(e >> i & s), h = Number(e & s), A = n ? 4 : 0, E = n ? 0 : 4;
  r.setUint32(t + A, l, n), r.setUint32(t + E, h, n);
}
var Eu = (r, t, e) => r & t ^ ~r & e, vu = (r, t, e) => r & t ^ r & e ^ t & e, Iu = class extends yu {
  constructor(r, t, e, n) {
    super(), this.blockLen = r, this.outputLen = t, this.padOffset = e, this.isLE = n, this.finished = !1, this.length = 0, this.pos = 0, this.destroyed = !1, this.buffer = new Uint8Array(r), this.view = Ki(this.buffer);
  }
  update(r) {
    Do(this);
    let { view: t, buffer: e, blockLen: n } = this;
    r = Pa(r);
    let i = r.length;
    for (let s = 0; s < i; ) {
      let l = Math.min(n - this.pos, i - s);
      if (l === n) {
        let h = Ki(r);
        for (; n <= i - s; s += n) this.process(h, s);
        continue;
      }
      e.set(r.subarray(s, s + l), this.pos), this.pos += l, s += l, this.pos === n && (this.process(t, 0), this.pos = 0);
    }
    return this.length += r.length, this.roundClean(), this;
  }
  digestInto(r) {
    Do(this), pu(r, this), this.finished = !0;
    let { buffer: t, view: e, blockLen: n, isLE: i } = this, { pos: s } = this;
    t[s++] = 128, this.buffer.subarray(s).fill(0), this.padOffset > n - s && (this.process(e, 0), s = 0);
    for (let v = s; v < n; v++) t[v] = 0;
    bu(e, n - 8, BigInt(this.length * 8), i), this.process(e, 0);
    let l = Ki(r), h = this.outputLen;
    if (h % 4) throw new Error("_sha2: outputLen should be aligned to 32bit");
    let A = h / 4, E = this.get();
    if (A > E.length) throw new Error("_sha2: outputLen bigger than state");
    for (let v = 0; v < A; v++) l.setUint32(4 * v, E[v], i);
  }
  digest() {
    let { buffer: r, outputLen: t } = this;
    this.digestInto(r);
    let e = r.slice(0, t);
    return this.destroy(), e;
  }
  _cloneInto(r) {
    r || (r = new this.constructor()), r.set(...this.get());
    let { blockLen: t, buffer: e, length: n, finished: i, destroyed: s, pos: l } = this;
    return r.length = n, r.pos = l, r.finished = i, r.destroyed = s, n % t && r.buffer.set(e), r;
  }
}, Mu = new Uint32Array([1116352408, 1899447441, 3049323471, 3921009573, 961987163, 1508970993, 2453635748, 2870763221, 3624381080, 310598401, 607225278, 1426881987, 1925078388, 2162078206, 2614888103, 3248222580, 3835390401, 4022224774, 264347078, 604807628, 770255983, 1249150122, 1555081692, 1996064986, 2554220882, 2821834349, 2952996808, 3210313671, 3336571891, 3584528711, 113926993, 338241895, 666307205, 773529912, 1294757372, 1396182291, 1695183700, 1986661051, 2177026350, 2456956037, 2730485921, 2820302411, 3259730800, 3345764771, 3516065817, 3600352804, 4094571909, 275423344, 430227734, 506948616, 659060556, 883997877, 958139571, 1322822218, 1537002063, 1747873779, 1955562222, 2024104815, 2227730452, 2361852424, 2428436474, 2756734187, 3204031479, 3329325298]), An = new Uint32Array([1779033703, 3144134277, 1013904242, 2773480762, 1359893119, 2600822924, 528734635, 1541459225]), pn = new Uint32Array(64), Su = class extends Iu {
  constructor() {
    super(64, 32, 8, !1), this.A = An[0] | 0, this.B = An[1] | 0, this.C = An[2] | 0, this.D = An[3] | 0, this.E = An[4] | 0, this.F = An[5] | 0, this.G = An[6] | 0, this.H = An[7] | 0;
  }
  get() {
    let { A: r, B: t, C: e, D: n, E: i, F: s, G: l, H: h } = this;
    return [r, t, e, n, i, s, l, h];
  }
  set(r, t, e, n, i, s, l, h) {
    this.A = r | 0, this.B = t | 0, this.C = e | 0, this.D = n | 0, this.E = i | 0, this.F = s | 0, this.G = l | 0, this.H = h | 0;
  }
  process(r, t) {
    for (let v = 0; v < 16; v++, t += 4) pn[v] = r.getUint32(t, !1);
    for (let v = 16; v < 64; v++) {
      let T = pn[v - 15], P = pn[v - 2], O = Je(T, 7) ^ Je(T, 18) ^ T >>> 3, j = Je(P, 17) ^ Je(P, 19) ^ P >>> 10;
      pn[v] = j + pn[v - 7] + O + pn[v - 16] | 0;
    }
    let { A: e, B: n, C: i, D: s, E: l, F: h, G: A, H: E } = this;
    for (let v = 0; v < 64; v++) {
      let T = Je(l, 6) ^ Je(l, 11) ^ Je(l, 25), P = E + T + Eu(l, h, A) + Mu[v] + pn[v] | 0, O = (Je(e, 2) ^ Je(e, 13) ^ Je(e, 22)) + vu(e, n, i) | 0;
      E = A, A = h, h = l, l = s + P | 0, s = i, i = n, n = e, e = P + O | 0;
    }
    e = e + this.A | 0, n = n + this.B | 0, i = i + this.C | 0, s = s + this.D | 0, l = l + this.E | 0, h = h + this.F | 0, A = A + this.G | 0, E = E + this.H | 0, this.set(e, n, i, s, l, h, A, E);
  }
  roundClean() {
    pn.fill(0);
  }
  destroy() {
    this.set(0, 0, 0, 0, 0, 0, 0, 0), this.buffer.fill(0);
  }
}, xu = class extends Su {
  constructor() {
    super(), this.A = -1056596264, this.B = 914150663, this.C = 812702999, this.D = -150054599, this.E = -4191439, this.F = 1750603025, this.G = 1694076839, this.H = -1090891868, this.outputLen = 28;
  }
}, Bu = mu(() => new xu()), Dr = class xs {
  constructor(t) {
    this.bytes = t;
  }
  static fromHex(t) {
    return new xs(Uint8Array.from(ft.Buffer.from(t, "hex")));
  }
  static fromPrincipal({ principal: t, subAccount: e = Cu.fromID(0) }) {
    let n = $c(`
account-id`), i = Bu.create();
    i.update(tu([...n, ...t.toUint8Array(), ...e.toUint8Array()]));
    let s = i.digest(), l = eu(s), h = new Uint8Array([...l, ...s]);
    return new xs(h);
  }
  toHex() {
    return nu(this.bytes);
  }
  toUint8Array() {
    return this.bytes;
  }
  toNumbers() {
    return Array.from(this.bytes);
  }
  toAccountIdentifierHash() {
    return { hash: this.toUint8Array() };
  }
}, Cu = class Gr {
  constructor(t) {
    this.bytes = t;
  }
  static fromBytes(t) {
    return t.length != 32 ? Error("Subaccount length must be 32-bytes") : new Gr(t);
  }
  static fromPrincipal(t) {
    let e = new Uint8Array(32).fill(0), n = t.toUint8Array();
    e[0] = n.length;
    for (let i = 0; i < n.length; i++) e[1 + i] = n[i];
    return new Gr(e);
  }
  static fromID(t) {
    if (t < 0) throw new Error("Number cannot be negative");
    if (t > Number.MAX_SAFE_INTEGER) throw new Error("Number is too large to fit in 32 bytes.");
    let e = new DataView(new ArrayBuffer(32));
    if (typeof e.setBigUint64 == "function") e.setBigUint64(24, BigInt(t));
    else {
      let i = BigInt(1) << BigInt(32);
      e.setUint32(24, Number(BigInt(t) >> BigInt(32))), e.setUint32(28, Number(BigInt(t) % i));
    }
    let n = new Uint8Array(e.buffer);
    return new Gr(n);
  }
  toUint8Array() {
    return this.bytes;
  }
};
/*! Bundled license information:

@noble/hashes/esm/utils.js:
  (*! noble-hashes - MIT License (c) 2022 Paul Miller (paulmillr.com) *)
*/
ke.fromText("ryjl3-tyaaa-aaaaa-aaaba-cai");
ke.fromText("qhbym-qaaaa-aaaaa-aaafq-cai");
BigInt(1095062083);
BigInt(1347768404);
BigInt(1e4);
BigInt(1e8);
var ku = Ks((r) => {
  r.byteLength = A, r.toByteArray = v, r.fromByteArray = O;
  var t = [], e = [], n = typeof Uint8Array < "u" ? Uint8Array : Array, i = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
  for (s = 0, l = i.length; s < l; ++s) t[s] = i[s], e[i.charCodeAt(s)] = s;
  var s, l;
  e[45] = 62, e[95] = 63;
  function h(j) {
    var D = j.length;
    if (D % 4 > 0) throw new Error("Invalid string. Length must be a multiple of 4");
    var N = j.indexOf("=");
    N === -1 && (N = D);
    var Z = N === D ? 0 : 4 - N % 4;
    return [N, Z];
  }
  function A(j) {
    var D = h(j), N = D[0], Z = D[1];
    return (N + Z) * 3 / 4 - Z;
  }
  function E(j, D, N) {
    return (D + N) * 3 / 4 - N;
  }
  function v(j) {
    var D, N = h(j), Z = N[0], Q = N[1], W = new n(E(j, Z, Q)), V = 0, K = Q > 0 ? Z - 4 : Z, X;
    for (X = 0; X < K; X += 4) D = e[j.charCodeAt(X)] << 18 | e[j.charCodeAt(X + 1)] << 12 | e[j.charCodeAt(X + 2)] << 6 | e[j.charCodeAt(X + 3)], W[V++] = D >> 16 & 255, W[V++] = D >> 8 & 255, W[V++] = D & 255;
    return Q === 2 && (D = e[j.charCodeAt(X)] << 2 | e[j.charCodeAt(X + 1)] >> 4, W[V++] = D & 255), Q === 1 && (D = e[j.charCodeAt(X)] << 10 | e[j.charCodeAt(X + 1)] << 4 | e[j.charCodeAt(X + 2)] >> 2, W[V++] = D >> 8 & 255, W[V++] = D & 255), W;
  }
  function T(j) {
    return t[j >> 18 & 63] + t[j >> 12 & 63] + t[j >> 6 & 63] + t[j & 63];
  }
  function P(j, D, N) {
    for (var Z, Q = [], W = D; W < N; W += 3) Z = (j[W] << 16 & 16711680) + (j[W + 1] << 8 & 65280) + (j[W + 2] & 255), Q.push(T(Z));
    return Q.join("");
  }
  function O(j) {
    for (var D, N = j.length, Z = N % 3, Q = [], W = 16383, V = 0, K = N - Z; V < K; V += W) Q.push(P(j, V, V + W > K ? K : V + W));
    return Z === 1 ? (D = j[N - 1], Q.push(t[D >> 2] + t[D << 4 & 63] + "==")) : Z === 2 && (D = (j[N - 2] << 8) + j[N - 1], Q.push(t[D >> 10] + t[D >> 4 & 63] + t[D << 2 & 63] + "=")), Q.join("");
  }
}), Nu = Ks((r) => {
  r.read = function(t, e, n, i, s) {
    var l, h, A = s * 8 - i - 1, E = (1 << A) - 1, v = E >> 1, T = -7, P = n ? s - 1 : 0, O = n ? -1 : 1, j = t[e + P];
    for (P += O, l = j & (1 << -T) - 1, j >>= -T, T += A; T > 0; l = l * 256 + t[e + P], P += O, T -= 8) ;
    for (h = l & (1 << -T) - 1, l >>= -T, T += i; T > 0; h = h * 256 + t[e + P], P += O, T -= 8) ;
    if (l === 0) l = 1 - v;
    else {
      if (l === E) return h ? NaN : (j ? -1 : 1) * (1 / 0);
      h = h + Math.pow(2, i), l = l - v;
    }
    return (j ? -1 : 1) * h * Math.pow(2, l - i);
  }, r.write = function(t, e, n, i, s, l) {
    var h, A, E, v = l * 8 - s - 1, T = (1 << v) - 1, P = T >> 1, O = s === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0, j = i ? 0 : l - 1, D = i ? 1 : -1, N = e < 0 || e === 0 && 1 / e < 0 ? 1 : 0;
    for (e = Math.abs(e), isNaN(e) || e === 1 / 0 ? (A = isNaN(e) ? 1 : 0, h = T) : (h = Math.floor(Math.log(e) / Math.LN2), e * (E = Math.pow(2, -h)) < 1 && (h--, E *= 2), h + P >= 1 ? e += O / E : e += O * Math.pow(2, 1 - P), e * E >= 2 && (h++, E /= 2), h + P >= T ? (A = 0, h = T) : h + P >= 1 ? (A = (e * E - 1) * Math.pow(2, s), h = h + P) : (A = e * Math.pow(2, P - 1) * Math.pow(2, s), h = 0)); s >= 8; t[n + j] = A & 255, j += D, A /= 256, s -= 8) ;
    for (h = h << s | A, v += s; v > 0; t[n + j] = h & 255, j += D, h /= 256, v -= 8) ;
    t[n + j - D] |= N * 128;
  };
}), Tu = Ks((r) => {
  var t = ku(), e = Nu(), n = typeof Symbol == "function" && typeof Symbol.for == "function" ? Symbol.for("nodejs.util.inspect.custom") : null;
  r.Buffer = h, r.SlowBuffer = Q, r.INSPECT_MAX_BYTES = 50;
  var i = 2147483647;
  r.kMaxLength = i, h.TYPED_ARRAY_SUPPORT = s(), !h.TYPED_ARRAY_SUPPORT && typeof console < "u" && typeof console.error == "function" && console.error("This browser lacks typed array (Uint8Array) support which is required by `buffer` v5.x. Use `buffer` v4.x if you require old browser support.");
  function s() {
    try {
      let a = new Uint8Array(1), o = { foo: function() {
        return 42;
      } };
      return Object.setPrototypeOf(o, Uint8Array.prototype), Object.setPrototypeOf(a, o), a.foo() === 42;
    } catch {
      return !1;
    }
  }
  Object.defineProperty(h.prototype, "parent", { enumerable: !0, get: function() {
    if (h.isBuffer(this)) return this.buffer;
  } }), Object.defineProperty(h.prototype, "offset", { enumerable: !0, get: function() {
    if (h.isBuffer(this)) return this.byteOffset;
  } });
  function l(a) {
    if (a > i) throw new RangeError('The value "' + a + '" is invalid for option "size"');
    let o = new Uint8Array(a);
    return Object.setPrototypeOf(o, h.prototype), o;
  }
  function h(a, o, c) {
    if (typeof a == "number") {
      if (typeof o == "string") throw new TypeError('The "string" argument must be of type string. Received type number');
      return T(a);
    }
    return A(a, o, c);
  }
  h.poolSize = 8192;
  function A(a, o, c) {
    if (typeof a == "string") return P(a, o);
    if (ArrayBuffer.isView(a)) return j(a);
    if (a == null) throw new TypeError("The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof a);
    if (jt(a, ArrayBuffer) || a && jt(a.buffer, ArrayBuffer) || typeof SharedArrayBuffer < "u" && (jt(a, SharedArrayBuffer) || a && jt(a.buffer, SharedArrayBuffer))) return D(a, o, c);
    if (typeof a == "number") throw new TypeError('The "value" argument must not be of type number. Received type number');
    let y = a.valueOf && a.valueOf();
    if (y != null && y !== a) return h.from(y, o, c);
    let k = N(a);
    if (k) return k;
    if (typeof Symbol < "u" && Symbol.toPrimitive != null && typeof a[Symbol.toPrimitive] == "function") return h.from(a[Symbol.toPrimitive]("string"), o, c);
    throw new TypeError("The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof a);
  }
  h.from = function(a, o, c) {
    return A(a, o, c);
  }, Object.setPrototypeOf(h.prototype, Uint8Array.prototype), Object.setPrototypeOf(h, Uint8Array);
  function E(a) {
    if (typeof a != "number") throw new TypeError('"size" argument must be of type number');
    if (a < 0) throw new RangeError('The value "' + a + '" is invalid for option "size"');
  }
  function v(a, o, c) {
    return E(a), a <= 0 ? l(a) : o !== void 0 ? typeof c == "string" ? l(a).fill(o, c) : l(a).fill(o) : l(a);
  }
  h.alloc = function(a, o, c) {
    return v(a, o, c);
  };
  function T(a) {
    return E(a), l(a < 0 ? 0 : Z(a) | 0);
  }
  h.allocUnsafe = function(a) {
    return T(a);
  }, h.allocUnsafeSlow = function(a) {
    return T(a);
  };
  function P(a, o) {
    if ((typeof o != "string" || o === "") && (o = "utf8"), !h.isEncoding(o)) throw new TypeError("Unknown encoding: " + o);
    let c = W(a, o) | 0, y = l(c), k = y.write(a, o);
    return k !== c && (y = y.slice(0, k)), y;
  }
  function O(a) {
    let o = a.length < 0 ? 0 : Z(a.length) | 0, c = l(o);
    for (let y = 0; y < o; y += 1) c[y] = a[y] & 255;
    return c;
  }
  function j(a) {
    if (jt(a, Uint8Array)) {
      let o = new Uint8Array(a);
      return D(o.buffer, o.byteOffset, o.byteLength);
    }
    return O(a);
  }
  function D(a, o, c) {
    if (o < 0 || a.byteLength < o) throw new RangeError('"offset" is outside of buffer bounds');
    if (a.byteLength < o + (c || 0)) throw new RangeError('"length" is outside of buffer bounds');
    let y;
    return o === void 0 && c === void 0 ? y = new Uint8Array(a) : c === void 0 ? y = new Uint8Array(a, o) : y = new Uint8Array(a, o, c), Object.setPrototypeOf(y, h.prototype), y;
  }
  function N(a) {
    if (h.isBuffer(a)) {
      let o = Z(a.length) | 0, c = l(o);
      return c.length === 0 || a.copy(c, 0, 0, o), c;
    }
    if (a.length !== void 0) return typeof a.length != "number" || Rt(a.length) ? l(0) : O(a);
    if (a.type === "Buffer" && Array.isArray(a.data)) return O(a.data);
  }
  function Z(a) {
    if (a >= i) throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x" + i.toString(16) + " bytes");
    return a | 0;
  }
  function Q(a) {
    return +a != a && (a = 0), h.alloc(+a);
  }
  h.isBuffer = function(a) {
    return a != null && a._isBuffer === !0 && a !== h.prototype;
  }, h.compare = function(a, o) {
    if (jt(a, Uint8Array) && (a = h.from(a, a.offset, a.byteLength)), jt(o, Uint8Array) && (o = h.from(o, o.offset, o.byteLength)), !h.isBuffer(a) || !h.isBuffer(o)) throw new TypeError('The "buf1", "buf2" arguments must be one of type Buffer or Uint8Array');
    if (a === o) return 0;
    let c = a.length, y = o.length;
    for (let k = 0, z = Math.min(c, y); k < z; ++k) if (a[k] !== o[k]) {
      c = a[k], y = o[k];
      break;
    }
    return c < y ? -1 : y < c ? 1 : 0;
  }, h.isEncoding = function(a) {
    switch (String(a).toLowerCase()) {
      case "hex":
      case "utf8":
      case "utf-8":
      case "ascii":
      case "latin1":
      case "binary":
      case "base64":
      case "ucs2":
      case "ucs-2":
      case "utf16le":
      case "utf-16le":
        return !0;
      default:
        return !1;
    }
  }, h.concat = function(a, o) {
    if (!Array.isArray(a)) throw new TypeError('"list" argument must be an Array of Buffers');
    if (a.length === 0) return h.alloc(0);
    let c;
    if (o === void 0) for (o = 0, c = 0; c < a.length; ++c) o += a[c].length;
    let y = h.allocUnsafe(o), k = 0;
    for (c = 0; c < a.length; ++c) {
      let z = a[c];
      if (jt(z, Uint8Array)) k + z.length > y.length ? (h.isBuffer(z) || (z = h.from(z)), z.copy(y, k)) : Uint8Array.prototype.set.call(y, z, k);
      else if (h.isBuffer(z)) z.copy(y, k);
      else throw new TypeError('"list" argument must be an Array of Buffers');
      k += z.length;
    }
    return y;
  };
  function W(a, o) {
    if (h.isBuffer(a)) return a.length;
    if (ArrayBuffer.isView(a) || jt(a, ArrayBuffer)) return a.byteLength;
    if (typeof a != "string") throw new TypeError('The "string" argument must be one of type string, Buffer, or ArrayBuffer. Received type ' + typeof a);
    let c = a.length, y = arguments.length > 2 && arguments[2] === !0;
    if (!y && c === 0) return 0;
    let k = !1;
    for (; ; ) switch (o) {
      case "ascii":
      case "latin1":
      case "binary":
        return c;
      case "utf8":
      case "utf-8":
        return Bt(a).length;
      case "ucs2":
      case "ucs-2":
      case "utf16le":
      case "utf-16le":
        return c * 2;
      case "hex":
        return c >>> 1;
      case "base64":
        return Lt(a).length;
      default:
        if (k) return y ? -1 : Bt(a).length;
        o = ("" + o).toLowerCase(), k = !0;
    }
  }
  h.byteLength = W;
  function V(a, o, c) {
    let y = !1;
    if ((o === void 0 || o < 0) && (o = 0), o > this.length || ((c === void 0 || c > this.length) && (c = this.length), c <= 0) || (c >>>= 0, o >>>= 0, c <= o)) return "";
    for (a || (a = "utf8"); ; ) switch (a) {
      case "hex":
        return B(this, o, c);
      case "utf8":
      case "utf-8":
        return u(this, o, c);
      case "ascii":
        return m(this, o, c);
      case "latin1":
      case "binary":
        return w(this, o, c);
      case "base64":
        return b(this, o, c);
      case "ucs2":
      case "ucs-2":
      case "utf16le":
      case "utf-16le":
        return F(this, o, c);
      default:
        if (y) throw new TypeError("Unknown encoding: " + a);
        a = (a + "").toLowerCase(), y = !0;
    }
  }
  h.prototype._isBuffer = !0;
  function K(a, o, c) {
    let y = a[o];
    a[o] = a[c], a[c] = y;
  }
  h.prototype.swap16 = function() {
    let a = this.length;
    if (a % 2 !== 0) throw new RangeError("Buffer size must be a multiple of 16-bits");
    for (let o = 0; o < a; o += 2) K(this, o, o + 1);
    return this;
  }, h.prototype.swap32 = function() {
    let a = this.length;
    if (a % 4 !== 0) throw new RangeError("Buffer size must be a multiple of 32-bits");
    for (let o = 0; o < a; o += 4) K(this, o, o + 3), K(this, o + 1, o + 2);
    return this;
  }, h.prototype.swap64 = function() {
    let a = this.length;
    if (a % 8 !== 0) throw new RangeError("Buffer size must be a multiple of 64-bits");
    for (let o = 0; o < a; o += 8) K(this, o, o + 7), K(this, o + 1, o + 6), K(this, o + 2, o + 5), K(this, o + 3, o + 4);
    return this;
  }, h.prototype.toString = function() {
    let a = this.length;
    return a === 0 ? "" : arguments.length === 0 ? u(this, 0, a) : V.apply(this, arguments);
  }, h.prototype.toLocaleString = h.prototype.toString, h.prototype.equals = function(a) {
    if (!h.isBuffer(a)) throw new TypeError("Argument must be a Buffer");
    return this === a ? !0 : h.compare(this, a) === 0;
  }, h.prototype.inspect = function() {
    let a = "", o = r.INSPECT_MAX_BYTES;
    return a = this.toString("hex", 0, o).replace(/(.{2})/g, "$1 ").trim(), this.length > o && (a += " ... "), "<Buffer " + a + ">";
  }, n && (h.prototype[n] = h.prototype.inspect), h.prototype.compare = function(a, o, c, y, k) {
    if (jt(a, Uint8Array) && (a = h.from(a, a.offset, a.byteLength)), !h.isBuffer(a)) throw new TypeError('The "target" argument must be one of type Buffer or Uint8Array. Received type ' + typeof a);
    if (o === void 0 && (o = 0), c === void 0 && (c = a ? a.length : 0), y === void 0 && (y = 0), k === void 0 && (k = this.length), o < 0 || c > a.length || y < 0 || k > this.length) throw new RangeError("out of range index");
    if (y >= k && o >= c) return 0;
    if (y >= k) return -1;
    if (o >= c) return 1;
    if (o >>>= 0, c >>>= 0, y >>>= 0, k >>>= 0, this === a) return 0;
    let z = k - y, q = c - o, ut = Math.min(z, q), lt = this.slice(y, k), at = a.slice(o, c);
    for (let yt = 0; yt < ut; ++yt) if (lt[yt] !== at[yt]) {
      z = lt[yt], q = at[yt];
      break;
    }
    return z < q ? -1 : q < z ? 1 : 0;
  };
  function X(a, o, c, y, k) {
    if (a.length === 0) return -1;
    if (typeof c == "string" ? (y = c, c = 0) : c > 2147483647 ? c = 2147483647 : c < -2147483648 && (c = -2147483648), c = +c, Rt(c) && (c = k ? 0 : a.length - 1), c < 0 && (c = a.length + c), c >= a.length) {
      if (k) return -1;
      c = a.length - 1;
    } else if (c < 0) if (k) c = 0;
    else return -1;
    if (typeof o == "string" && (o = h.from(o, y)), h.isBuffer(o)) return o.length === 0 ? -1 : nt(a, o, c, y, k);
    if (typeof o == "number") return o = o & 255, typeof Uint8Array.prototype.indexOf == "function" ? k ? Uint8Array.prototype.indexOf.call(a, o, c) : Uint8Array.prototype.lastIndexOf.call(a, o, c) : nt(a, [o], c, y, k);
    throw new TypeError("val must be string, number or Buffer");
  }
  function nt(a, o, c, y, k) {
    let z = 1, q = a.length, ut = o.length;
    if (y !== void 0 && (y = String(y).toLowerCase(), y === "ucs2" || y === "ucs-2" || y === "utf16le" || y === "utf-16le")) {
      if (a.length < 2 || o.length < 2) return -1;
      z = 2, q /= 2, ut /= 2, c /= 2;
    }
    function lt(yt, ct) {
      return z === 1 ? yt[ct] : yt.readUInt16BE(ct * z);
    }
    let at;
    if (k) {
      let yt = -1;
      for (at = c; at < q; at++) if (lt(a, at) === lt(o, yt === -1 ? 0 : at - yt)) {
        if (yt === -1 && (yt = at), at - yt + 1 === ut) return yt * z;
      } else yt !== -1 && (at -= at - yt), yt = -1;
    } else for (c + ut > q && (c = q - ut), at = c; at >= 0; at--) {
      let yt = !0;
      for (let ct = 0; ct < ut; ct++) if (lt(a, at + ct) !== lt(o, ct)) {
        yt = !1;
        break;
      }
      if (yt) return at;
    }
    return -1;
  }
  h.prototype.includes = function(a, o, c) {
    return this.indexOf(a, o, c) !== -1;
  }, h.prototype.indexOf = function(a, o, c) {
    return X(this, a, o, c, !0);
  }, h.prototype.lastIndexOf = function(a, o, c) {
    return X(this, a, o, c, !1);
  };
  function C(a, o, c, y) {
    c = Number(c) || 0;
    let k = a.length - c;
    y ? (y = Number(y), y > k && (y = k)) : y = k;
    let z = o.length;
    y > z / 2 && (y = z / 2);
    let q;
    for (q = 0; q < y; ++q) {
      let ut = parseInt(o.substr(q * 2, 2), 16);
      if (Rt(ut)) return q;
      a[c + q] = ut;
    }
    return q;
  }
  function M(a, o, c, y) {
    return Ct(Bt(o, a.length - c), a, c, y);
  }
  function x(a, o, c, y) {
    return Ct(Dt(o), a, c, y);
  }
  function U(a, o, c, y) {
    return Ct(Lt(o), a, c, y);
  }
  function R(a, o, c, y) {
    return Ct(gn(o, a.length - c), a, c, y);
  }
  h.prototype.write = function(a, o, c, y) {
    if (o === void 0) y = "utf8", c = this.length, o = 0;
    else if (c === void 0 && typeof o == "string") y = o, c = this.length, o = 0;
    else if (isFinite(o)) o = o >>> 0, isFinite(c) ? (c = c >>> 0, y === void 0 && (y = "utf8")) : (y = c, c = void 0);
    else throw new Error("Buffer.write(string, encoding, offset[, length]) is no longer supported");
    let k = this.length - o;
    if ((c === void 0 || c > k) && (c = k), a.length > 0 && (c < 0 || o < 0) || o > this.length) throw new RangeError("Attempt to write outside buffer bounds");
    y || (y = "utf8");
    let z = !1;
    for (; ; ) switch (y) {
      case "hex":
        return C(this, a, o, c);
      case "utf8":
      case "utf-8":
        return M(this, a, o, c);
      case "ascii":
      case "latin1":
      case "binary":
        return x(this, a, o, c);
      case "base64":
        return U(this, a, o, c);
      case "ucs2":
      case "ucs-2":
      case "utf16le":
      case "utf-16le":
        return R(this, a, o, c);
      default:
        if (z) throw new TypeError("Unknown encoding: " + y);
        y = ("" + y).toLowerCase(), z = !0;
    }
  }, h.prototype.toJSON = function() {
    return { type: "Buffer", data: Array.prototype.slice.call(this._arr || this, 0) };
  };
  function b(a, o, c) {
    return o === 0 && c === a.length ? t.fromByteArray(a) : t.fromByteArray(a.slice(o, c));
  }
  function u(a, o, c) {
    c = Math.min(a.length, c);
    let y = [], k = o;
    for (; k < c; ) {
      let z = a[k], q = null, ut = z > 239 ? 4 : z > 223 ? 3 : z > 191 ? 2 : 1;
      if (k + ut <= c) {
        let lt, at, yt, ct;
        switch (ut) {
          case 1:
            z < 128 && (q = z);
            break;
          case 2:
            lt = a[k + 1], (lt & 192) === 128 && (ct = (z & 31) << 6 | lt & 63, ct > 127 && (q = ct));
            break;
          case 3:
            lt = a[k + 1], at = a[k + 2], (lt & 192) === 128 && (at & 192) === 128 && (ct = (z & 15) << 12 | (lt & 63) << 6 | at & 63, ct > 2047 && (ct < 55296 || ct > 57343) && (q = ct));
            break;
          case 4:
            lt = a[k + 1], at = a[k + 2], yt = a[k + 3], (lt & 192) === 128 && (at & 192) === 128 && (yt & 192) === 128 && (ct = (z & 15) << 18 | (lt & 63) << 12 | (at & 63) << 6 | yt & 63, ct > 65535 && ct < 1114112 && (q = ct));
        }
      }
      q === null ? (q = 65533, ut = 1) : q > 65535 && (q -= 65536, y.push(q >>> 10 & 1023 | 55296), q = 56320 | q & 1023), y.push(q), k += ut;
    }
    return p(y);
  }
  var d = 4096;
  function p(a) {
    let o = a.length;
    if (o <= d) return String.fromCharCode.apply(String, a);
    let c = "", y = 0;
    for (; y < o; ) c += String.fromCharCode.apply(String, a.slice(y, y += d));
    return c;
  }
  function m(a, o, c) {
    let y = "";
    c = Math.min(a.length, c);
    for (let k = o; k < c; ++k) y += String.fromCharCode(a[k] & 127);
    return y;
  }
  function w(a, o, c) {
    let y = "";
    c = Math.min(a.length, c);
    for (let k = o; k < c; ++k) y += String.fromCharCode(a[k]);
    return y;
  }
  function B(a, o, c) {
    let y = a.length;
    (!o || o < 0) && (o = 0), (!c || c < 0 || c > y) && (c = y);
    let k = "";
    for (let z = o; z < c; ++z) k += zt[a[z]];
    return k;
  }
  function F(a, o, c) {
    let y = a.slice(o, c), k = "";
    for (let z = 0; z < y.length - 1; z += 2) k += String.fromCharCode(y[z] + y[z + 1] * 256);
    return k;
  }
  h.prototype.slice = function(a, o) {
    let c = this.length;
    a = ~~a, o = o === void 0 ? c : ~~o, a < 0 ? (a += c, a < 0 && (a = 0)) : a > c && (a = c), o < 0 ? (o += c, o < 0 && (o = 0)) : o > c && (o = c), o < a && (o = a);
    let y = this.subarray(a, o);
    return Object.setPrototypeOf(y, h.prototype), y;
  };
  function I(a, o, c) {
    if (a % 1 !== 0 || a < 0) throw new RangeError("offset is not uint");
    if (a + o > c) throw new RangeError("Trying to access beyond buffer length");
  }
  h.prototype.readUintLE = h.prototype.readUIntLE = function(a, o, c) {
    a = a >>> 0, o = o >>> 0, c || I(a, o, this.length);
    let y = this[a], k = 1, z = 0;
    for (; ++z < o && (k *= 256); ) y += this[a + z] * k;
    return y;
  }, h.prototype.readUintBE = h.prototype.readUIntBE = function(a, o, c) {
    a = a >>> 0, o = o >>> 0, c || I(a, o, this.length);
    let y = this[a + --o], k = 1;
    for (; o > 0 && (k *= 256); ) y += this[a + --o] * k;
    return y;
  }, h.prototype.readUint8 = h.prototype.readUInt8 = function(a, o) {
    return a = a >>> 0, o || I(a, 1, this.length), this[a];
  }, h.prototype.readUint16LE = h.prototype.readUInt16LE = function(a, o) {
    return a = a >>> 0, o || I(a, 2, this.length), this[a] | this[a + 1] << 8;
  }, h.prototype.readUint16BE = h.prototype.readUInt16BE = function(a, o) {
    return a = a >>> 0, o || I(a, 2, this.length), this[a] << 8 | this[a + 1];
  }, h.prototype.readUint32LE = h.prototype.readUInt32LE = function(a, o) {
    return a = a >>> 0, o || I(a, 4, this.length), (this[a] | this[a + 1] << 8 | this[a + 2] << 16) + this[a + 3] * 16777216;
  }, h.prototype.readUint32BE = h.prototype.readUInt32BE = function(a, o) {
    return a = a >>> 0, o || I(a, 4, this.length), this[a] * 16777216 + (this[a + 1] << 16 | this[a + 2] << 8 | this[a + 3]);
  }, h.prototype.readBigUInt64LE = Jt(function(a) {
    a = a >>> 0, Et(a, "offset");
    let o = this[a], c = this[a + 7];
    (o === void 0 || c === void 0) && ht(a, this.length - 8);
    let y = o + this[++a] * 2 ** 8 + this[++a] * 2 ** 16 + this[++a] * 2 ** 24, k = this[++a] + this[++a] * 2 ** 8 + this[++a] * 2 ** 16 + c * 2 ** 24;
    return BigInt(y) + (BigInt(k) << BigInt(32));
  }), h.prototype.readBigUInt64BE = Jt(function(a) {
    a = a >>> 0, Et(a, "offset");
    let o = this[a], c = this[a + 7];
    (o === void 0 || c === void 0) && ht(a, this.length - 8);
    let y = o * 2 ** 24 + this[++a] * 2 ** 16 + this[++a] * 2 ** 8 + this[++a], k = this[++a] * 2 ** 24 + this[++a] * 2 ** 16 + this[++a] * 2 ** 8 + c;
    return (BigInt(y) << BigInt(32)) + BigInt(k);
  }), h.prototype.readIntLE = function(a, o, c) {
    a = a >>> 0, o = o >>> 0, c || I(a, o, this.length);
    let y = this[a], k = 1, z = 0;
    for (; ++z < o && (k *= 256); ) y += this[a + z] * k;
    return k *= 128, y >= k && (y -= Math.pow(2, 8 * o)), y;
  }, h.prototype.readIntBE = function(a, o, c) {
    a = a >>> 0, o = o >>> 0, c || I(a, o, this.length);
    let y = o, k = 1, z = this[a + --y];
    for (; y > 0 && (k *= 256); ) z += this[a + --y] * k;
    return k *= 128, z >= k && (z -= Math.pow(2, 8 * o)), z;
  }, h.prototype.readInt8 = function(a, o) {
    return a = a >>> 0, o || I(a, 1, this.length), this[a] & 128 ? (255 - this[a] + 1) * -1 : this[a];
  }, h.prototype.readInt16LE = function(a, o) {
    a = a >>> 0, o || I(a, 2, this.length);
    let c = this[a] | this[a + 1] << 8;
    return c & 32768 ? c | 4294901760 : c;
  }, h.prototype.readInt16BE = function(a, o) {
    a = a >>> 0, o || I(a, 2, this.length);
    let c = this[a + 1] | this[a] << 8;
    return c & 32768 ? c | 4294901760 : c;
  }, h.prototype.readInt32LE = function(a, o) {
    return a = a >>> 0, o || I(a, 4, this.length), this[a] | this[a + 1] << 8 | this[a + 2] << 16 | this[a + 3] << 24;
  }, h.prototype.readInt32BE = function(a, o) {
    return a = a >>> 0, o || I(a, 4, this.length), this[a] << 24 | this[a + 1] << 16 | this[a + 2] << 8 | this[a + 3];
  }, h.prototype.readBigInt64LE = Jt(function(a) {
    a = a >>> 0, Et(a, "offset");
    let o = this[a], c = this[a + 7];
    (o === void 0 || c === void 0) && ht(a, this.length - 8);
    let y = this[a + 4] + this[a + 5] * 2 ** 8 + this[a + 6] * 2 ** 16 + (c << 24);
    return (BigInt(y) << BigInt(32)) + BigInt(o + this[++a] * 2 ** 8 + this[++a] * 2 ** 16 + this[++a] * 2 ** 24);
  }), h.prototype.readBigInt64BE = Jt(function(a) {
    a = a >>> 0, Et(a, "offset");
    let o = this[a], c = this[a + 7];
    (o === void 0 || c === void 0) && ht(a, this.length - 8);
    let y = (o << 24) + this[++a] * 2 ** 16 + this[++a] * 2 ** 8 + this[++a];
    return (BigInt(y) << BigInt(32)) + BigInt(this[++a] * 2 ** 24 + this[++a] * 2 ** 16 + this[++a] * 2 ** 8 + c);
  }), h.prototype.readFloatLE = function(a, o) {
    return a = a >>> 0, o || I(a, 4, this.length), e.read(this, a, !0, 23, 4);
  }, h.prototype.readFloatBE = function(a, o) {
    return a = a >>> 0, o || I(a, 4, this.length), e.read(this, a, !1, 23, 4);
  }, h.prototype.readDoubleLE = function(a, o) {
    return a = a >>> 0, o || I(a, 8, this.length), e.read(this, a, !0, 52, 8);
  }, h.prototype.readDoubleBE = function(a, o) {
    return a = a >>> 0, o || I(a, 8, this.length), e.read(this, a, !1, 52, 8);
  };
  function f(a, o, c, y, k, z) {
    if (!h.isBuffer(a)) throw new TypeError('"buffer" argument must be a Buffer instance');
    if (o > k || o < z) throw new RangeError('"value" argument is out of bounds');
    if (c + y > a.length) throw new RangeError("Index out of range");
  }
  h.prototype.writeUintLE = h.prototype.writeUIntLE = function(a, o, c, y) {
    if (a = +a, o = o >>> 0, c = c >>> 0, !y) {
      let q = Math.pow(2, 8 * c) - 1;
      f(this, a, o, c, q, 0);
    }
    let k = 1, z = 0;
    for (this[o] = a & 255; ++z < c && (k *= 256); ) this[o + z] = a / k & 255;
    return o + c;
  }, h.prototype.writeUintBE = h.prototype.writeUIntBE = function(a, o, c, y) {
    if (a = +a, o = o >>> 0, c = c >>> 0, !y) {
      let q = Math.pow(2, 8 * c) - 1;
      f(this, a, o, c, q, 0);
    }
    let k = c - 1, z = 1;
    for (this[o + k] = a & 255; --k >= 0 && (z *= 256); ) this[o + k] = a / z & 255;
    return o + c;
  }, h.prototype.writeUint8 = h.prototype.writeUInt8 = function(a, o, c) {
    return a = +a, o = o >>> 0, c || f(this, a, o, 1, 255, 0), this[o] = a & 255, o + 1;
  }, h.prototype.writeUint16LE = h.prototype.writeUInt16LE = function(a, o, c) {
    return a = +a, o = o >>> 0, c || f(this, a, o, 2, 65535, 0), this[o] = a & 255, this[o + 1] = a >>> 8, o + 2;
  }, h.prototype.writeUint16BE = h.prototype.writeUInt16BE = function(a, o, c) {
    return a = +a, o = o >>> 0, c || f(this, a, o, 2, 65535, 0), this[o] = a >>> 8, this[o + 1] = a & 255, o + 2;
  }, h.prototype.writeUint32LE = h.prototype.writeUInt32LE = function(a, o, c) {
    return a = +a, o = o >>> 0, c || f(this, a, o, 4, 4294967295, 0), this[o + 3] = a >>> 24, this[o + 2] = a >>> 16, this[o + 1] = a >>> 8, this[o] = a & 255, o + 4;
  }, h.prototype.writeUint32BE = h.prototype.writeUInt32BE = function(a, o, c) {
    return a = +a, o = o >>> 0, c || f(this, a, o, 4, 4294967295, 0), this[o] = a >>> 24, this[o + 1] = a >>> 16, this[o + 2] = a >>> 8, this[o + 3] = a & 255, o + 4;
  };
  function g(a, o, c, y, k) {
    bt(o, y, k, a, c, 7);
    let z = Number(o & BigInt(4294967295));
    a[c++] = z, z = z >> 8, a[c++] = z, z = z >> 8, a[c++] = z, z = z >> 8, a[c++] = z;
    let q = Number(o >> BigInt(32) & BigInt(4294967295));
    return a[c++] = q, q = q >> 8, a[c++] = q, q = q >> 8, a[c++] = q, q = q >> 8, a[c++] = q, c;
  }
  function S(a, o, c, y, k) {
    bt(o, y, k, a, c, 7);
    let z = Number(o & BigInt(4294967295));
    a[c + 7] = z, z = z >> 8, a[c + 6] = z, z = z >> 8, a[c + 5] = z, z = z >> 8, a[c + 4] = z;
    let q = Number(o >> BigInt(32) & BigInt(4294967295));
    return a[c + 3] = q, q = q >> 8, a[c + 2] = q, q = q >> 8, a[c + 1] = q, q = q >> 8, a[c] = q, c + 8;
  }
  h.prototype.writeBigUInt64LE = Jt(function(a, o = 0) {
    return g(this, a, o, BigInt(0), BigInt("0xffffffffffffffff"));
  }), h.prototype.writeBigUInt64BE = Jt(function(a, o = 0) {
    return S(this, a, o, BigInt(0), BigInt("0xffffffffffffffff"));
  }), h.prototype.writeIntLE = function(a, o, c, y) {
    if (a = +a, o = o >>> 0, !y) {
      let ut = Math.pow(2, 8 * c - 1);
      f(this, a, o, c, ut - 1, -ut);
    }
    let k = 0, z = 1, q = 0;
    for (this[o] = a & 255; ++k < c && (z *= 256); ) a < 0 && q === 0 && this[o + k - 1] !== 0 && (q = 1), this[o + k] = (a / z >> 0) - q & 255;
    return o + c;
  }, h.prototype.writeIntBE = function(a, o, c, y) {
    if (a = +a, o = o >>> 0, !y) {
      let ut = Math.pow(2, 8 * c - 1);
      f(this, a, o, c, ut - 1, -ut);
    }
    let k = c - 1, z = 1, q = 0;
    for (this[o + k] = a & 255; --k >= 0 && (z *= 256); ) a < 0 && q === 0 && this[o + k + 1] !== 0 && (q = 1), this[o + k] = (a / z >> 0) - q & 255;
    return o + c;
  }, h.prototype.writeInt8 = function(a, o, c) {
    return a = +a, o = o >>> 0, c || f(this, a, o, 1, 127, -128), a < 0 && (a = 255 + a + 1), this[o] = a & 255, o + 1;
  }, h.prototype.writeInt16LE = function(a, o, c) {
    return a = +a, o = o >>> 0, c || f(this, a, o, 2, 32767, -32768), this[o] = a & 255, this[o + 1] = a >>> 8, o + 2;
  }, h.prototype.writeInt16BE = function(a, o, c) {
    return a = +a, o = o >>> 0, c || f(this, a, o, 2, 32767, -32768), this[o] = a >>> 8, this[o + 1] = a & 255, o + 2;
  }, h.prototype.writeInt32LE = function(a, o, c) {
    return a = +a, o = o >>> 0, c || f(this, a, o, 4, 2147483647, -2147483648), this[o] = a & 255, this[o + 1] = a >>> 8, this[o + 2] = a >>> 16, this[o + 3] = a >>> 24, o + 4;
  }, h.prototype.writeInt32BE = function(a, o, c) {
    return a = +a, o = o >>> 0, c || f(this, a, o, 4, 2147483647, -2147483648), a < 0 && (a = 4294967295 + a + 1), this[o] = a >>> 24, this[o + 1] = a >>> 16, this[o + 2] = a >>> 8, this[o + 3] = a & 255, o + 4;
  }, h.prototype.writeBigInt64LE = Jt(function(a, o = 0) {
    return g(this, a, o, -BigInt("0x8000000000000000"), BigInt("0x7fffffffffffffff"));
  }), h.prototype.writeBigInt64BE = Jt(function(a, o = 0) {
    return S(this, a, o, -BigInt("0x8000000000000000"), BigInt("0x7fffffffffffffff"));
  });
  function L(a, o, c, y, k, z) {
    if (c + y > a.length) throw new RangeError("Index out of range");
    if (c < 0) throw new RangeError("Index out of range");
  }
  function H(a, o, c, y, k) {
    return o = +o, c = c >>> 0, k || L(a, o, c, 4), e.write(a, o, c, y, 23, 4), c + 4;
  }
  h.prototype.writeFloatLE = function(a, o, c) {
    return H(this, a, o, !0, c);
  }, h.prototype.writeFloatBE = function(a, o, c) {
    return H(this, a, o, !1, c);
  };
  function J(a, o, c, y, k) {
    return o = +o, c = c >>> 0, k || L(a, o, c, 8), e.write(a, o, c, y, 52, 8), c + 8;
  }
  h.prototype.writeDoubleLE = function(a, o, c) {
    return J(this, a, o, !0, c);
  }, h.prototype.writeDoubleBE = function(a, o, c) {
    return J(this, a, o, !1, c);
  }, h.prototype.copy = function(a, o, c, y) {
    if (!h.isBuffer(a)) throw new TypeError("argument should be a Buffer");
    if (c || (c = 0), !y && y !== 0 && (y = this.length), o >= a.length && (o = a.length), o || (o = 0), y > 0 && y < c && (y = c), y === c || a.length === 0 || this.length === 0) return 0;
    if (o < 0) throw new RangeError("targetStart out of bounds");
    if (c < 0 || c >= this.length) throw new RangeError("Index out of range");
    if (y < 0) throw new RangeError("sourceEnd out of bounds");
    y > this.length && (y = this.length), a.length - o < y - c && (y = a.length - o + c);
    let k = y - c;
    return this === a && typeof Uint8Array.prototype.copyWithin == "function" ? this.copyWithin(o, c, y) : Uint8Array.prototype.set.call(a, this.subarray(c, y), o), k;
  }, h.prototype.fill = function(a, o, c, y) {
    if (typeof a == "string") {
      if (typeof o == "string" ? (y = o, o = 0, c = this.length) : typeof c == "string" && (y = c, c = this.length), y !== void 0 && typeof y != "string") throw new TypeError("encoding must be a string");
      if (typeof y == "string" && !h.isEncoding(y)) throw new TypeError("Unknown encoding: " + y);
      if (a.length === 1) {
        let z = a.charCodeAt(0);
        (y === "utf8" && z < 128 || y === "latin1") && (a = z);
      }
    } else typeof a == "number" ? a = a & 255 : typeof a == "boolean" && (a = Number(a));
    if (o < 0 || this.length < o || this.length < c) throw new RangeError("Out of range index");
    if (c <= o) return this;
    o = o >>> 0, c = c === void 0 ? this.length : c >>> 0, a || (a = 0);
    let k;
    if (typeof a == "number") for (k = o; k < c; ++k) this[k] = a;
    else {
      let z = h.isBuffer(a) ? a : h.from(a, y), q = z.length;
      if (q === 0) throw new TypeError('The value "' + a + '" is invalid for argument "value"');
      for (k = 0; k < c - o; ++k) this[k + o] = z[k % q];
    }
    return this;
  };
  var tt = {};
  function st(a, o, c) {
    tt[a] = class extends c {
      constructor() {
        super(), Object.defineProperty(this, "message", { value: o.apply(this, arguments), writable: !0, configurable: !0 }), this.name = `${this.name} [${a}]`, this.stack, delete this.name;
      }
      get code() {
        return a;
      }
      set code(y) {
        Object.defineProperty(this, "code", { configurable: !0, enumerable: !0, value: y, writable: !0 });
      }
      toString() {
        return `${this.name} [${a}]: ${this.message}`;
      }
    };
  }
  st("ERR_BUFFER_OUT_OF_BOUNDS", function(a) {
    return a ? `${a} is outside of buffer bounds` : "Attempt to access memory outside buffer bounds";
  }, RangeError), st("ERR_INVALID_ARG_TYPE", function(a, o) {
    return `The "${a}" argument must be of type number. Received type ${typeof o}`;
  }, TypeError), st("ERR_OUT_OF_RANGE", function(a, o, c) {
    let y = `The value of "${a}" is out of range.`, k = c;
    return Number.isInteger(c) && Math.abs(c) > 2 ** 32 ? k = xt(String(c)) : typeof c == "bigint" && (k = String(c), (c > BigInt(2) ** BigInt(32) || c < -(BigInt(2) ** BigInt(32))) && (k = xt(k)), k += "n"), y += ` It must be ${o}. Received ${k}`, y;
  }, RangeError);
  function xt(a) {
    let o = "", c = a.length, y = a[0] === "-" ? 1 : 0;
    for (; c >= y + 4; c -= 3) o = `_${a.slice(c - 3, c)}${o}`;
    return `${a.slice(0, c)}${o}`;
  }
  function At(a, o, c) {
    Et(o, "offset"), (a[o] === void 0 || a[o + c] === void 0) && ht(o, a.length - (c + 1));
  }
  function bt(a, o, c, y, k, z) {
    if (a > c || a < o) {
      let q = typeof o == "bigint" ? "n" : "", ut;
      throw o === 0 || o === BigInt(0) ? ut = `>= 0${q} and < 2${q} ** ${(z + 1) * 8}${q}` : ut = `>= -(2${q} ** ${(z + 1) * 8 - 1}${q}) and < 2 ** ${(z + 1) * 8 - 1}${q}`, new tt.ERR_OUT_OF_RANGE("value", ut, a);
    }
    At(y, k, z);
  }
  function Et(a, o) {
    if (typeof a != "number") throw new tt.ERR_INVALID_ARG_TYPE(o, "number", a);
  }
  function ht(a, o, c) {
    throw Math.floor(a) !== a ? (Et(a, c), new tt.ERR_OUT_OF_RANGE("offset", "an integer", a)) : o < 0 ? new tt.ERR_BUFFER_OUT_OF_BOUNDS() : new tt.ERR_OUT_OF_RANGE("offset", `>= 0 and <= ${o}`, a);
  }
  var wt = /[^+/0-9A-Za-z-_]/g;
  function rn(a) {
    if (a = a.split("=")[0], a = a.trim().replace(wt, ""), a.length < 2) return "";
    for (; a.length % 4 !== 0; ) a = a + "=";
    return a;
  }
  function Bt(a, o) {
    o = o || 1 / 0;
    let c, y = a.length, k = null, z = [];
    for (let q = 0; q < y; ++q) {
      if (c = a.charCodeAt(q), c > 55295 && c < 57344) {
        if (!k) {
          if (c > 56319) {
            (o -= 3) > -1 && z.push(239, 191, 189);
            continue;
          } else if (q + 1 === y) {
            (o -= 3) > -1 && z.push(239, 191, 189);
            continue;
          }
          k = c;
          continue;
        }
        if (c < 56320) {
          (o -= 3) > -1 && z.push(239, 191, 189), k = c;
          continue;
        }
        c = (k - 55296 << 10 | c - 56320) + 65536;
      } else k && (o -= 3) > -1 && z.push(239, 191, 189);
      if (k = null, c < 128) {
        if ((o -= 1) < 0) break;
        z.push(c);
      } else if (c < 2048) {
        if ((o -= 2) < 0) break;
        z.push(c >> 6 | 192, c & 63 | 128);
      } else if (c < 65536) {
        if ((o -= 3) < 0) break;
        z.push(c >> 12 | 224, c >> 6 & 63 | 128, c & 63 | 128);
      } else if (c < 1114112) {
        if ((o -= 4) < 0) break;
        z.push(c >> 18 | 240, c >> 12 & 63 | 128, c >> 6 & 63 | 128, c & 63 | 128);
      } else throw new Error("Invalid code point");
    }
    return z;
  }
  function Dt(a) {
    let o = [];
    for (let c = 0; c < a.length; ++c) o.push(a.charCodeAt(c) & 255);
    return o;
  }
  function gn(a, o) {
    let c, y, k, z = [];
    for (let q = 0; q < a.length && !((o -= 2) < 0); ++q) c = a.charCodeAt(q), y = c >> 8, k = c % 256, z.push(k), z.push(y);
    return z;
  }
  function Lt(a) {
    return t.toByteArray(rn(a));
  }
  function Ct(a, o, c, y) {
    let k;
    for (k = 0; k < y && !(k + c >= o.length || k >= a.length); ++k) o[k + c] = a[k];
    return k;
  }
  function jt(a, o) {
    return a instanceof o || a != null && a.constructor != null && a.constructor.name != null && a.constructor.name === o.name;
  }
  function Rt(a) {
    return a !== a;
  }
  var zt = function() {
    let a = "0123456789abcdef", o = new Array(256);
    for (let c = 0; c < 16; ++c) {
      let y = c * 16;
      for (let k = 0; k < 16; ++k) o[y + k] = a[c] + a[k];
    }
    return o;
  }();
  function Jt(a) {
    return typeof BigInt > "u" ? Pt : a;
  }
  function Pt() {
    throw new Error("BigInt not supported");
  }
});
gu(Tu());
/*! Bundled license information:

ieee754/index.js:
  (*! ieee754. BSD-3-Clause License. Feross Aboukhadijeh <https://feross.org/opensource> *)

buffer/index.js:
  (*!
   * The buffer module from node.js, for the browser.
   *
   * @author   Feross Aboukhadijeh <https://feross.org>
   * @license  MIT
   *)
*/
const bo = class bo {
  constructor(t) {
    this.state = pt.Status.INIT, this.actorCache = /* @__PURE__ */ new Map(), this.config = t;
  }
  // Common state management
  setState(t) {
    this.state = t;
  }
  getState() {
    return this.state;
  }
  // Standard implementation for getAccountId, can be overridden by subclasses if needed
  async getAccountId() {
    const t = await this.getPrincipal();
    if (!t)
      throw new Error("Principal not available to derive account ID");
    return console.log("[BaseIcAdapter] Getting account ID for principal:", t), Dr.fromPrincipal({
      principal: ke.fromText(t),
      subAccount: void 0
      // Default subaccount
    }).toHex();
  }
  // Subclasses must implement how to get the principal
  async getAddresses() {
    return {
      icp: {
        owner: await this.getPrincipal(),
        subaccount: await this.getAccountId()
      }
    };
  }
  // Base implementation of createActor with caching
  createActor(t, e, n) {
    const i = `${this.walletName}-${t}-${n?.requiresSigning || !1}`, s = this.actorCache.get(i);
    if (s)
      return s;
    const l = this.createActorInternal(t, e, n);
    return this.actorCache.set(i, l), l;
  }
  // Base disconnect logic
  async disconnect() {
    if (!(this.state === pt.Status.DISCONNECTING || this.state === pt.Status.CONNECTING || this.state === pt.Status.DISCONNECTED)) {
      this.setState(pt.Status.DISCONNECTING);
      try {
        await this.disconnectInternal(), this.config?.localStorageKey && localStorage.removeItem(this.config.localStorageKey), this.actorCache.clear();
      } catch (t) {
        console.error(`[${this.walletName}] Error during disconnect:`, t);
      } finally {
        this.cleanupInternal(), this.setState(pt.Status.DISCONNECTED);
      }
    }
  }
  // Abstract methods for subclass-specific disconnect logic and resource cleanup
  // Default implementations do nothing, subclasses can override if needed.
  async disconnectInternal() {
  }
  cleanupInternal() {
  }
};
bo.supportedChains = [pt.Chain.ICP];
let rr = bo;
const tr = class tr extends rr {
  // Constructor calls super and does II specific initialization
  constructor(t) {
    super(t), this.walletName = tr.walletName, this.logo = tr.logo, this.authClient = null, this.agent = null, Xc.create({
      idleOptions: {
        idleTimeout: Number(this.config.adapters?.ii?.config?.timeout || this.config.timeout || 1e3 * 60 * 60 * 24),
        disableDefaultIdleCallback: !0
      }
    }).then((e) => {
      this.authClient = e, this.authClient.idleManager?.registerCallback?.(() => this.refreshLogin());
    }).catch((e) => {
      console.error("[II] Failed to create AuthClient:", e), this.setState(pt.Status.ERROR);
    });
  }
  // Use the resolved config for agent initialization
  async initAgent(t) {
    if (this.agent = Ye.createSync({
      identity: t,
      host: this.config.hostUrl,
      verifyQuerySignatures: this.config.verifyQuerySignatures
    }), this.config.fetchRootKeys)
      try {
        await this.agent.fetchRootKey();
      } catch (e) {
        console.warn("[II] Unable to fetch root key. Check replica status.", e);
      }
  }
  // Implement abstract methods
  async isAvailable() {
    return !0;
  }
  async connect() {
    try {
      if (this.setState(pt.Status.CONNECTING), !this.authClient && (await new Promise((n) => setTimeout(n, 500)), !this.authClient))
        throw new Error("AuthClient failed to initialize.");
      if (!await this.authClient.isAuthenticated())
        return new Promise((n, i) => {
          console.log("[II] Login with AuthClient", this.config), this.authClient.login({
            derivationOrigin: this.config.derivationOrigin,
            identityProvider: this.config.adapters?.ii?.config?.identityProvider || this.config.identityProvider,
            maxTimeToLive: this.config.delegationTimeout || BigInt(1 * 24 * 60 * 60 * 1e3 * 1e3 * 1e3),
            // 1 day
            onSuccess: () => {
              this._continueLogin(this.config.hostUrl).then((s) => {
                console.log("[II] Account", s), this.setState(pt.Status.READY), n(s);
              }).catch(i);
            },
            onError: (s) => {
              console.error("[II] Login error:", s), this.disconnect().catch(() => {
              }), this.setState(pt.Status.ERROR), i(new Error("II Authentication failed: " + s));
            }
          });
        });
      const e = await this._continueLogin(this.config.hostUrl);
      return console.log("[II] Account", e), this.setState(pt.Status.READY), e;
    } catch (t) {
      throw console.error("[II] Connect error:", t), this.setState(pt.Status.ERROR), await this.disconnect().catch(() => {
      }), t;
    }
  }
  async _continueLogin(t) {
    if (!this.authClient) throw new Error("AuthClient not available in _continueLogin");
    try {
      const e = this.authClient.getIdentity(), n = e.getPrincipal();
      if (console.log("[II] Raw Principal:", n), console.log("[II] Principal Text:", n.toText()), n.isAnonymous())
        throw new Error("Login resulted in anonymous principal");
      await this.initAgent(e);
      const i = await this.getAccountId();
      return console.log("[II] Derived Account ID:", i), {
        owner: n.toText(),
        // Use the derived account ID
        subaccount: i
      };
    } catch (e) {
      throw console.error("[II] Error during _continueLogin:", e), this.setState(pt.Status.ERROR), await this.disconnect().catch(() => {
      }), e;
    }
  }
  async isConnected() {
    return this.authClient ? await this.authClient.isAuthenticated() : !1;
  }
  // Implementation for BaseIcAdapter actor caching
  createActorInternal(t, e) {
    if (!this.agent)
      throw new Error("Agent not initialized. Connect first.");
    return kn.createActor(e, {
      agent: this.agent,
      canisterId: t
    });
  }
  async getPrincipal() {
    if (!this.authClient) throw new Error("Not connected");
    const t = this.authClient.getIdentity();
    if (!t) throw new Error("Identity not available");
    return t.getPrincipal()?.toText() || "";
  }
  async refreshLogin() {
    console.debug("[II] Refreshing login due to idle timeout.");
    try {
      await this.connect();
    } catch (t) {
      console.error("[II] Failed to refresh login:", t), await this.disconnect().catch(() => {
      });
    }
  }
  // Disconnect logic specific to II
  async disconnectInternal() {
    this.authClient && await this.authClient.logout();
  }
  // Cleanup logic specific to II
  cleanupInternal() {
    this.authClient = null, this.agent = null;
  }
};
tr.logo = au, tr.walletName = "Internet Identity";
let Er = tr;
const Lu = "data:image/webp;base64,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", er = class er extends rr {
  // Update every 2 seconds
  // state and config are inherited
  // Constructor calls super and does Plug specific initialization
  constructor(t) {
    super(t), this.walletName = er.walletName, this.logo = er.logo, this.readyState = "NotDetected", this._connectionState = !1, this._connectionStateTimestamp = 0, this._connectionStateUpdateInterval = 2e3, this.initPlug(), this.updateConnectionState();
  }
  // Initialize Plug and set readyState accordingly
  initPlug() {
    typeof window < "u" && window.ic?.plug ? window.ic.plug.isConnected().then((t) => {
      this.readyState = t ? "Connected" : "Installed", t ? this.setState(pt.Status.CONNECTED) : this.setState(pt.Status.READY);
    }) : (this.readyState = "NotDetected", this.setState(pt.Status.INIT));
  }
  // Implement abstract methods
  async isAvailable() {
    return this.readyState !== "NotDetected";
  }
  async connect() {
    if (this.setState(pt.Status.CONNECTING), await this.isConnected())
      this.readyState = "Connected";
    else {
      if (!window.ic?.plug)
        throw this.setState(pt.Status.ERROR), new Error("Plug Wallet extension not detected.");
      try {
        if (!await window.ic.plug.requestConnect({
          whitelist: this.config.delegationTargets?.map((i) => typeof i == "string" ? i : i.toText()) || [],
          host: this.config.hostUrl,
          timeout: this.config.adapters?.plug?.config?.timeout || this.config.timeout || 6048e5,
          onConnectionUpdate: () => this.handleConnectionUpdate()
        }))
          throw this.setState(pt.Status.READY), new Error("User declined the connection request");
        this.readyState = "Connected";
      } catch (n) {
        throw this.setState(pt.Status.READY), console.error("Failed to connect to Plug wallet:", n), n;
      }
    }
    this._connectionState = !0, this._connectionStateTimestamp = Date.now(), this.setState(pt.Status.CONNECTED);
    const e = await this.getPrincipal();
    return {
      owner: e,
      subaccount: Dr.fromPrincipal({
        principal: ke.fromText(e),
        subAccount: void 0
      }).toHex()
    };
  }
  // disconnect method is inherited, uses disconnectInternal and cleanupInternal
  async getPrincipal() {
    if (this.readyState === "Connected" && window.ic?.plug?.principalId)
      return ke.fromText(window.ic.plug.principalId).toText();
    throw this.readyState === "Installed" ? new Error("Plug wallet is installed but not connected.") : new Error("Plug wallet is not available or principal ID is unavailable");
  }
  // getAccountId is inherited
  // Implementation of the required abstract method from BaseIcAdapter
  createActorInternal(t, e, n) {
    if (!window.ic?.plug?.createActor)
      throw new Error("Plug wallet is not available or not connected to create actor.");
    if (!t || !e)
      throw new Error("Canister ID and IDL factory are required");
    try {
      const i = window.ic.plug.createActor({
        canisterId: t,
        interfaceFactory: e
      });
      return new Proxy({}, {
        get: (l, h) => {
          if (h !== "then")
            return (...A) => i.then((E) => {
              const v = E[h];
              return typeof v == "function" ? v.apply(E, A) : v;
            });
        }
      });
    } catch (i) {
      throw console.error("Failed to create actor through Plug:", i), i;
    }
  }
  // Plug specific connection state update
  async updateConnectionState() {
    window.ic?.plug?.isConnected ? (this._connectionState = await window.ic.plug.isConnected(), this._connectionStateTimestamp = Date.now(), this.readyState = this._connectionState ? "Connected" : "Installed", this._connectionState && this.state !== pt.Status.CONNECTED ? this.setState(pt.Status.CONNECTED) : !this._connectionState && this.state === pt.Status.CONNECTED && this.setState(pt.Status.READY)) : (this._connectionState = !1, this.readyState = "NotDetected", this.setState(pt.Status.INIT));
  }
  // Use polling check for synchronous isConnected
  async isConnected() {
    return Date.now() - this._connectionStateTimestamp > this._connectionStateUpdateInterval && this.updateConnectionState().catch((t) => console.error("[Plug] Failed background connection state update:", t)), this._connectionState;
  }
  // Handle Plug's connection updates
  handleConnectionUpdate() {
    this.updateConnectionState().then(() => {
      window.dispatchEvent(new CustomEvent("pnp:connectionUpdate", { detail: { adapterId: "plug", state: this.state } }));
    }).catch((t) => console.error("[Plug] Error handling connection update:", t));
  }
  // Plug specific disconnect logic
  async disconnectInternal() {
    window.ic?.plug?.disconnect ? await window.ic.plug.disconnect() : console.warn("Plug wallet is not available for disconnect");
  }
  // Plug specific cleanup (resetting internal state)
  cleanupInternal() {
    this.readyState = this._connectionState ? "Installed" : "NotDetected", this._connectionState = !1, this._connectionStateTimestamp = 0;
  }
};
er.logo = Lu, er.walletName = "Plug";
let vr = er;
const Ru = "data:image/webp;base64,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", ni = 4e3, Vi = 1e5, wn = (r) => {
  if (typeof globalThis.Buffer < "u")
    return globalThis.Buffer.from(r, "base64").buffer;
  if (typeof globalThis.atob < "u")
    return Uint8Array.from(globalThis.atob(r), (t) => t.charCodeAt(0)).buffer;
  throw Error("Could not decode base64 string");
}, Ir = (r) => {
  if (typeof globalThis.Buffer < "u")
    return globalThis.Buffer.from(r).toString("base64");
  if (typeof globalThis.btoa < "u")
    return btoa(Array.from({ length: Math.ceil(r.byteLength / Vi) }).map((t, e) => String.fromCharCode(...new Uint8Array(r.slice(e * Vi, (e + 1) * Vi)))).join(""));
  throw Error("Could not encode base64 string");
};
var Zn = function(r, t, e, n, i) {
  if (typeof t == "function" ? r !== t || !0 : !t.has(r)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
  return t.set(r, e), e;
}, Yt = function(r, t, e, n) {
  if (typeof t == "function" ? r !== t || !0 : !t.has(r)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
  return e === "m" ? n : e === "a" ? n.call(r) : n ? n.value : t.get(r);
}, xe, an, Gn, Jr;
class fn extends Error {
  constructor(t) {
    super(t.message), Object.setPrototypeOf(this, fn.prototype), this.code = t.code, this.data = t.data;
  }
}
const Oo = (r) => new fn({
  code: ni,
  message: r instanceof Error ? r.message : "Network error"
}), Ln = (r) => {
  if ("error" in r)
    throw new fn(r.error);
  if ("result" in r)
    return r.result;
  throw new fn({
    code: ni,
    message: "Invalid response"
  });
};
class Fa {
  constructor(t) {
    xe.set(this, void 0), an.set(this, void 0), Gn.set(this, void 0), Jr.set(this, void 0), Zn(this, xe, Object.assign({ autoCloseTransportChannel: !0, closeTransportChannelAfter: 200, crypto: globalThis.crypto }, t));
  }
  get transport() {
    return Yt(this, xe, "f").transport;
  }
  async openChannel() {
    if (clearTimeout(Yt(this, Jr, "f")), Yt(this, Gn, "f") && await Yt(this, Gn, "f"), Yt(this, an, "f") && !Yt(this, an, "f").closed)
      return Yt(this, an, "f");
    const t = Yt(this, xe, "f").transport.establishChannel();
    return Zn(this, Gn, t.then(() => {
    }).catch(() => {
    })), Zn(this, an, void 0), Zn(this, an, await t.catch((e) => {
      throw Oo(e);
    })), Zn(this, Gn, void 0), Yt(this, an, "f");
  }
  async closeChannel() {
    var t;
    await ((t = Yt(this, an, "f")) === null || t === void 0 ? void 0 : t.close());
  }
  async transformRequest(t) {
    return Yt(this, xe, "f").derivationOrigin ? Object.assign(Object.assign({}, t), { params: Object.assign(Object.assign({}, t.params), { icrc95DerivationOrigin: Yt(this, xe, "f").derivationOrigin }) }) : t;
  }
  async sendRequest(t) {
    const e = await this.openChannel();
    return new Promise(async (n, i) => {
      const s = e.addEventListener("response", async (h) => {
        h.id === t.id && (s(), l(), n(h), Yt(this, xe, "f").autoCloseTransportChannel && Zn(this, Jr, setTimeout(() => {
          e.closed || e.close();
        }, Yt(this, xe, "f").closeTransportChannelAfter)));
      }), l = e.addEventListener("close", () => {
        s(), l(), i(new fn({
          code: ni,
          message: "Channel was closed before a response was received"
        }));
      });
      try {
        await e.send(await this.transformRequest(t));
      } catch (h) {
        s(), l(), i(Oo(h));
      }
    });
  }
  async supportedStandards() {
    const t = await this.sendRequest({
      id: Yt(this, xe, "f").crypto.randomUUID(),
      jsonrpc: "2.0",
      method: "icrc25_supported_standards"
    });
    return Ln(t).supportedStandards;
  }
  async requestPermissions(t) {
    const e = await this.sendRequest({
      id: Yt(this, xe, "f").crypto.randomUUID(),
      jsonrpc: "2.0",
      method: "icrc25_request_permissions",
      params: { scopes: t }
    });
    return Ln(e).scopes;
  }
  async permissions() {
    const t = await this.sendRequest({
      id: Yt(this, xe, "f").crypto.randomUUID(),
      jsonrpc: "2.0",
      method: "icrc25_permissions"
    });
    return Ln(t).scopes;
  }
  async accounts() {
    const t = await this.sendRequest({
      id: Yt(this, xe, "f").crypto.randomUUID(),
      jsonrpc: "2.0",
      method: "icrc27_accounts"
    });
    return Ln(t).accounts.map(({ owner: n, subaccount: i }) => ({
      owner: ke.fromText(n),
      subaccount: i === void 0 ? void 0 : wn(i)
    }));
  }
  async delegation(t) {
    var e;
    const n = await this.sendRequest({
      id: Yt(this, xe, "f").crypto.randomUUID(),
      jsonrpc: "2.0",
      method: "icrc34_delegation",
      params: {
        publicKey: Ir(t.publicKey),
        targets: (e = t.targets) === null || e === void 0 ? void 0 : e.map((s) => s.toText()),
        maxTimeToLive: t.maxTimeToLive === void 0 ? void 0 : String(t.maxTimeToLive)
      }
    }), i = Ln(n);
    return La.fromDelegations(i.signerDelegation.map((s) => {
      var l;
      return {
        delegation: new Ra(wn(s.delegation.pubkey), BigInt(s.delegation.expiration), (l = s.delegation.targets) === null || l === void 0 ? void 0 : l.map((h) => ke.fromText(h))),
        signature: wn(s.signature)
      };
    }), wn(i.publicKey));
  }
  async callCanister(t) {
    const e = await this.sendRequest({
      id: Yt(this, xe, "f").crypto.randomUUID(),
      jsonrpc: "2.0",
      method: "icrc49_call_canister",
      params: {
        canisterId: t.canisterId.toText(),
        sender: t.sender.toText(),
        method: t.method,
        arg: Ir(t.arg)
      }
    }), n = Ln(e), i = wn(n.contentMap), s = wn(n.certificate);
    return { contentMap: i, certificate: s };
  }
  async batchCallCanister(t) {
    const e = await this.sendRequest({
      id: Yt(this, xe, "f").crypto.randomUUID(),
      jsonrpc: "2.0",
      method: "icrc112_batch_call_canister",
      params: {
        sender: t.sender.toText(),
        requests: t.requests.map((i) => i.map((s) => ({
          canisterId: s.canisterId.toText(),
          method: s.method,
          arg: Ir(s.arg)
        }))),
        validation: t.validation ? {
          canisterId: t.validation.canisterId.toText(),
          method: t.validation.method
        } : void 0
      }
    }), n = Ln(e);
    if (t.requests.length !== n.responses.length || t.requests.some((i, s) => i.length !== n.responses[s].length))
      throw new fn({
        code: ni,
        message: "Invalid batch call canister response, responses structure does not match request structure"
      });
    return n.responses.map((i) => i.map((s) => {
      if ("result" in s) {
        const l = wn(s.result.contentMap), h = wn(s.result.certificate);
        return { result: { contentMap: l, certificate: h } };
      }
      return s;
    }));
  }
}
xe = /* @__PURE__ */ new WeakMap(), an = /* @__PURE__ */ new WeakMap(), Gn = /* @__PURE__ */ new WeakMap(), Jr = /* @__PURE__ */ new WeakMap();
const Du = (r) => typeof r == "object" && !!r && "jsonrpc" in r && r.jsonrpc === "2.0", Qa = (r) => Du(r) && "id" in r && (typeof r.id == "string" || typeof r.id == "number");
var Uo = function(r, t, e, n, i) {
  if (typeof t == "function" ? r !== t || !0 : !t.has(r)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
  return t.set(r, e), e;
}, ye = function(r, t, e, n) {
  if (typeof t == "function" ? r !== t || !0 : !t.has(r)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
  return e === "m" ? n : e === "a" ? n.call(r) : n ? n.value : t.get(r);
}, Ar, Le, Jn;
class Ou {
  constructor(t) {
    Ar.set(this, /* @__PURE__ */ new Set()), Le.set(this, void 0), Jn.set(this, !1), Uo(this, Le, Object.assign({ window: globalThis.window, manageFocus: !0 }, t));
  }
  get closed() {
    return ye(this, Jn, "f");
  }
  addEventListener(...[t, e]) {
    switch (t) {
      case "close":
        return ye(this, Ar, "f").add(e), () => {
          ye(this, Ar, "f").delete(e);
        };
      case "response":
        const n = async (i) => {
          i.source !== ye(this, Le, "f").signerWindow || i.origin !== ye(this, Le, "f").signerOrigin || !Qa(i.data) || e(i.data);
        };
        return ye(this, Le, "f").window.addEventListener("message", n), () => {
          ye(this, Le, "f").window.removeEventListener("message", n);
        };
    }
  }
  async send(t) {
    if (ye(this, Jn, "f"))
      throw new zn("Communication channel is closed");
    ye(this, Le, "f").signerWindow.postMessage(t, ye(this, Le, "f").signerOrigin), ye(this, Le, "f").manageFocus && ye(this, Le, "f").signerWindow.focus();
  }
  async close() {
    ye(this, Jn, "f") || (Uo(this, Jn, !0), ye(this, Le, "f").signerWindow.close(), ye(this, Le, "f").manageFocus && ye(this, Le, "f").window.focus(), ye(this, Ar, "f").forEach((t) => t()));
  }
}
Ar = /* @__PURE__ */ new WeakMap(), Le = /* @__PURE__ */ new WeakMap(), Jn = /* @__PURE__ */ new WeakMap();
const Uu = (r) => {
  try {
    const t = new URL(r);
    return t.protocol === "https:" || t.hostname === "127.0.0.1" || t.hostname.split(".").slice(-1)[0] === "localhost";
  } catch {
    return !1;
  }
};
var ju = function(r, t, e, n, i) {
  if (typeof t == "function" ? r !== t || !0 : !t.has(r)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
  return t.set(r, e), e;
}, de = function(r, t, e, n) {
  if (e === "a" && !n) throw new TypeError("Private accessor was defined without a getter");
  if (typeof t == "function" ? r !== t || !n : !t.has(r)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
  return e === "m" ? n : e === "a" ? n.call(r) : n ? n.value : t.get(r);
}, Mn, be, _a, jo, Xi, $i;
class zu {
  constructor(t) {
    Mn.add(this), be.set(this, void 0), ju(this, be, Object.assign({ establishTimeout: 1e4, disconnectTimeout: 2e3, statusPollingRate: 300, window: globalThis.window, crypto: globalThis.crypto }, t)), de(this, Mn, "m", _a).call(this);
  }
}
be = /* @__PURE__ */ new WeakMap(), Mn = /* @__PURE__ */ new WeakSet(), _a = function() {
  const t = [], e = () => {
    const l = de(this, be, "f").crypto.randomUUID();
    return t.push(l), l;
  }, n = de(this, Mn, "m", Xi).call(this, (l) => {
    t.includes(l.data.id) && (n(), clearInterval(s), clearTimeout(i), de(this, be, "f").onEstablish(l.origin), de(this, Mn, "m", jo).call(this, l.origin));
  }), i = setTimeout(() => {
    n(), clearInterval(s), de(this, be, "f").onEstablishTimeout();
  }, de(this, be, "f").establishTimeout), s = setInterval(() => de(this, Mn, "m", $i).call(this, e()), de(this, be, "f").statusPollingRate);
}, jo = function(t) {
  let e, n, i = [];
  const s = (E) => {
    const v = i.findIndex((T) => T.id === E);
    return v > -1 && i.splice(v, 1), v > -1;
  }, l = () => {
    const E = de(this, be, "f").crypto.randomUUID(), v = (/* @__PURE__ */ new Date()).getTime();
    return i = i.filter((T) => v - de(this, be, "f").disconnectTimeout > T.time), i.push({ id: E, time: v }), E;
  }, h = () => {
    clearTimeout(n), n = setTimeout(() => {
      A(), clearInterval(e), de(this, be, "f").onDisconnect();
    }, de(this, be, "f").disconnectTimeout);
  }, A = de(this, Mn, "m", Xi).call(this, (E) => {
    E.origin === t && s(E.data.id) && h();
  });
  h(), e = setInterval(() => de(this, Mn, "m", $i).call(this, l()), de(this, be, "f").statusPollingRate);
}, Xi = function(t) {
  const e = (n) => {
    n.source === de(this, be, "f").signerWindow && Qa(n.data) && "result" in n.data && n.data.result === "ready" && t(n);
  };
  return de(this, be, "f").window.addEventListener("message", e), () => de(this, be, "f").window.removeEventListener("message", e);
}, $i = function(t) {
  de(this, be, "f").signerWindow.postMessage({ jsonrpc: "2.0", id: t, method: "icrc29_status" }, "*");
};
var Pu = function(r, t, e, n, i) {
  if (typeof t == "function" ? r !== t || !0 : !t.has(r)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
  return t.set(r, e), e;
}, Rn = function(r, t, e, n) {
  if (typeof t == "function" ? r !== t || !0 : !t.has(r)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
  return e === "m" ? n : e === "a" ? n.call(r) : n ? n.value : t.get(r);
}, $e;
const Fu = "https://github.com/slide-computer/signer-js/blob/main/packages/signer-web/README.md#channels-must-be-established-in-a-click-handler";
class zn extends Error {
  constructor(t) {
    super(t), Object.setPrototypeOf(this, zn.prototype);
  }
}
let Bs = !1;
globalThis.window && (globalThis.window.addEventListener("click", () => Bs = !0, !0), globalThis.window.addEventListener("click", () => Bs = !1));
class Wa {
  constructor(t) {
    if ($e.set(this, void 0), !Uu(t.url))
      throw new zn("Invalid signer RPC url");
    Pu(this, $e, Object.assign({ windowOpenerFeatures: "", window: globalThis.window, establishTimeout: 12e4, disconnectTimeout: 2e3, statusPollingRate: 300, crypto: globalThis.crypto, manageFocus: !0, closeOnEstablishTimeout: !0, detectNonClickEstablishment: !0 }, t));
  }
  async establishChannel() {
    if (Rn(this, $e, "f").detectNonClickEstablishment && !Bs)
      throw new zn(`Signer window should not be opened outside of click handler, see: ${Fu}`);
    const t = Rn(this, $e, "f").window.open(Rn(this, $e, "f").url, "signerWindow", Rn(this, $e, "f").windowOpenerFeatures);
    if (!t)
      throw new zn("Signer window could not be opened");
    return new Promise((e, n) => {
      let i;
      new zu(Object.assign(Object.assign({}, Rn(this, $e, "f")), { signerWindow: t, onEstablish: (s) => {
        i = new Ou(Object.assign(Object.assign({}, Rn(this, $e, "f")), { signerOrigin: s, signerWindow: t })), e(i);
      }, onEstablishTimeout: () => {
        Rn(this, $e, "f").closeOnEstablishTimeout && t.close(), n(new zn("Communication channel could not be established within a reasonable time"));
      }, onDisconnect: () => i.close() }));
    });
  }
}
$e = /* @__PURE__ */ new WeakMap();
var Qu = /^-?(?:\d+(?:\.\d*)?|\.\d+)(?:e[+-]?\d+)?$/i, ts = Math.ceil, _e = Math.floor, Re = "[BigNumber Error] ", zo = Re + "Number primitive has more than 15 significant digits: ", qe = 1e14, vt = 14, Po = 9007199254740991, es = [1, 10, 100, 1e3, 1e4, 1e5, 1e6, 1e7, 1e8, 1e9, 1e10, 1e11, 1e12, 1e13], yn = 1e7, Ue = 1e9;
function qa(r) {
  var t, e, n, i = Q.prototype = { constructor: Q, toString: null, valueOf: null }, s = new Q(1), l = 20, h = 4, A = -7, E = 21, v = -1e7, T = 1e7, P = !1, O = 1, j = 0, D = {
    prefix: "",
    groupSize: 3,
    secondaryGroupSize: 0,
    groupSeparator: ",",
    decimalSeparator: ".",
    fractionGroupSize: 0,
    fractionGroupSeparator: " ",
    // non-breaking space
    suffix: ""
  }, N = "0123456789abcdefghijklmnopqrstuvwxyz", Z = !0;
  function Q(C, M) {
    var x, U, R, b, u, d, p, m, w = this;
    if (!(w instanceof Q)) return new Q(C, M);
    if (M == null) {
      if (C && C._isBigNumber === !0) {
        w.s = C.s, !C.c || C.e > T ? w.c = w.e = null : C.e < v ? w.c = [w.e = 0] : (w.e = C.e, w.c = C.c.slice());
        return;
      }
      if ((d = typeof C == "number") && C * 0 == 0) {
        if (w.s = 1 / C < 0 ? (C = -C, -1) : 1, C === ~~C) {
          for (b = 0, u = C; u >= 10; u /= 10, b++) ;
          b > T ? w.c = w.e = null : (w.e = b, w.c = [C]);
          return;
        }
        m = String(C);
      } else {
        if (!Qu.test(m = String(C))) return n(w, m, d);
        w.s = m.charCodeAt(0) == 45 ? (m = m.slice(1), -1) : 1;
      }
      (b = m.indexOf(".")) > -1 && (m = m.replace(".", "")), (u = m.search(/e/i)) > 0 ? (b < 0 && (b = u), b += +m.slice(u + 1), m = m.substring(0, u)) : b < 0 && (b = m.length);
    } else {
      if (_t(M, 2, N.length, "Base"), M == 10 && Z)
        return w = new Q(C), X(w, l + w.e + 1, h);
      if (m = String(C), d = typeof C == "number") {
        if (C * 0 != 0) return n(w, m, d, M);
        if (w.s = 1 / C < 0 ? (m = m.slice(1), -1) : 1, Q.DEBUG && m.replace(/^0\.0*|\./, "").length > 15)
          throw Error(zo + C);
      } else
        w.s = m.charCodeAt(0) === 45 ? (m = m.slice(1), -1) : 1;
      for (x = N.slice(0, M), b = u = 0, p = m.length; u < p; u++)
        if (x.indexOf(U = m.charAt(u)) < 0) {
          if (U == ".") {
            if (u > b) {
              b = p;
              continue;
            }
          } else if (!R && (m == m.toUpperCase() && (m = m.toLowerCase()) || m == m.toLowerCase() && (m = m.toUpperCase()))) {
            R = !0, u = -1, b = 0;
            continue;
          }
          return n(w, String(C), d, M);
        }
      d = !1, m = e(m, M, 10, w.s), (b = m.indexOf(".")) > -1 ? m = m.replace(".", "") : b = m.length;
    }
    for (u = 0; m.charCodeAt(u) === 48; u++) ;
    for (p = m.length; m.charCodeAt(--p) === 48; ) ;
    if (m = m.slice(u, ++p)) {
      if (p -= u, d && Q.DEBUG && p > 15 && (C > Po || C !== _e(C)))
        throw Error(zo + w.s * C);
      if ((b = b - u - 1) > T)
        w.c = w.e = null;
      else if (b < v)
        w.c = [w.e = 0];
      else {
        if (w.e = b, w.c = [], u = (b + 1) % vt, b < 0 && (u += vt), u < p) {
          for (u && w.c.push(+m.slice(0, u)), p -= vt; u < p; )
            w.c.push(+m.slice(u, u += vt));
          u = vt - (m = m.slice(u)).length;
        } else
          u -= p;
        for (; u--; m += "0") ;
        w.c.push(+m);
      }
    } else
      w.c = [w.e = 0];
  }
  Q.clone = qa, Q.ROUND_UP = 0, Q.ROUND_DOWN = 1, Q.ROUND_CEIL = 2, Q.ROUND_FLOOR = 3, Q.ROUND_HALF_UP = 4, Q.ROUND_HALF_DOWN = 5, Q.ROUND_HALF_EVEN = 6, Q.ROUND_HALF_CEIL = 7, Q.ROUND_HALF_FLOOR = 8, Q.EUCLID = 9, Q.config = Q.set = function(C) {
    var M, x;
    if (C != null)
      if (typeof C == "object") {
        if (C.hasOwnProperty(M = "DECIMAL_PLACES") && (x = C[M], _t(x, 0, Ue, M), l = x), C.hasOwnProperty(M = "ROUNDING_MODE") && (x = C[M], _t(x, 0, 8, M), h = x), C.hasOwnProperty(M = "EXPONENTIAL_AT") && (x = C[M], x && x.pop ? (_t(x[0], -1e9, 0, M), _t(x[1], 0, Ue, M), A = x[0], E = x[1]) : (_t(x, -1e9, Ue, M), A = -(E = x < 0 ? -x : x))), C.hasOwnProperty(M = "RANGE"))
          if (x = C[M], x && x.pop)
            _t(x[0], -1e9, -1, M), _t(x[1], 1, Ue, M), v = x[0], T = x[1];
          else if (_t(x, -1e9, Ue, M), x)
            v = -(T = x < 0 ? -x : x);
          else
            throw Error(Re + M + " cannot be zero: " + x);
        if (C.hasOwnProperty(M = "CRYPTO"))
          if (x = C[M], x === !!x)
            if (x)
              if (typeof crypto < "u" && crypto && (crypto.getRandomValues || crypto.randomBytes))
                P = x;
              else
                throw P = !x, Error(Re + "crypto unavailable");
            else
              P = x;
          else
            throw Error(Re + M + " not true or false: " + x);
        if (C.hasOwnProperty(M = "MODULO_MODE") && (x = C[M], _t(x, 0, 9, M), O = x), C.hasOwnProperty(M = "POW_PRECISION") && (x = C[M], _t(x, 0, Ue, M), j = x), C.hasOwnProperty(M = "FORMAT"))
          if (x = C[M], typeof x == "object") D = x;
          else throw Error(Re + M + " not an object: " + x);
        if (C.hasOwnProperty(M = "ALPHABET"))
          if (x = C[M], typeof x == "string" && !/^.?$|[+\-.\s]|(.).*\1/.test(x))
            Z = x.slice(0, 10) == "0123456789", N = x;
          else
            throw Error(Re + M + " invalid: " + x);
      } else
        throw Error(Re + "Object expected: " + C);
    return {
      DECIMAL_PLACES: l,
      ROUNDING_MODE: h,
      EXPONENTIAL_AT: [A, E],
      RANGE: [v, T],
      CRYPTO: P,
      MODULO_MODE: O,
      POW_PRECISION: j,
      FORMAT: D,
      ALPHABET: N
    };
  }, Q.isBigNumber = function(C) {
    if (!C || C._isBigNumber !== !0) return !1;
    if (!Q.DEBUG) return !0;
    var M, x, U = C.c, R = C.e, b = C.s;
    t: if ({}.toString.call(U) == "[object Array]") {
      if ((b === 1 || b === -1) && R >= -1e9 && R <= Ue && R === _e(R)) {
        if (U[0] === 0) {
          if (R === 0 && U.length === 1) return !0;
          break t;
        }
        if (M = (R + 1) % vt, M < 1 && (M += vt), String(U[0]).length == M) {
          for (M = 0; M < U.length; M++)
            if (x = U[M], x < 0 || x >= qe || x !== _e(x)) break t;
          if (x !== 0) return !0;
        }
      }
    } else if (U === null && R === null && (b === null || b === 1 || b === -1))
      return !0;
    throw Error(Re + "Invalid BigNumber: " + C);
  }, Q.maximum = Q.max = function() {
    return V(arguments, -1);
  }, Q.minimum = Q.min = function() {
    return V(arguments, 1);
  }, Q.random = function() {
    var C = 9007199254740992, M = Math.random() * C & 2097151 ? function() {
      return _e(Math.random() * C);
    } : function() {
      return (Math.random() * 1073741824 | 0) * 8388608 + (Math.random() * 8388608 | 0);
    };
    return function(x) {
      var U, R, b, u, d, p = 0, m = [], w = new Q(s);
      if (x == null ? x = l : _t(x, 0, Ue), u = ts(x / vt), P)
        if (crypto.getRandomValues) {
          for (U = crypto.getRandomValues(new Uint32Array(u *= 2)); p < u; )
            d = U[p] * 131072 + (U[p + 1] >>> 11), d >= 9e15 ? (R = crypto.getRandomValues(new Uint32Array(2)), U[p] = R[0], U[p + 1] = R[1]) : (m.push(d % 1e14), p += 2);
          p = u / 2;
        } else if (crypto.randomBytes) {
          for (U = crypto.randomBytes(u *= 7); p < u; )
            d = (U[p] & 31) * 281474976710656 + U[p + 1] * 1099511627776 + U[p + 2] * 4294967296 + U[p + 3] * 16777216 + (U[p + 4] << 16) + (U[p + 5] << 8) + U[p + 6], d >= 9e15 ? crypto.randomBytes(7).copy(U, p) : (m.push(d % 1e14), p += 7);
          p = u / 7;
        } else
          throw P = !1, Error(Re + "crypto unavailable");
      if (!P)
        for (; p < u; )
          d = M(), d < 9e15 && (m[p++] = d % 1e14);
      for (u = m[--p], x %= vt, u && x && (d = es[vt - x], m[p] = _e(u / d) * d); m[p] === 0; m.pop(), p--) ;
      if (p < 0)
        m = [b = 0];
      else {
        for (b = -1; m[0] === 0; m.splice(0, 1), b -= vt) ;
        for (p = 1, d = m[0]; d >= 10; d /= 10, p++) ;
        p < vt && (b -= vt - p);
      }
      return w.e = b, w.c = m, w;
    };
  }(), Q.sum = function() {
    for (var C = 1, M = arguments, x = new Q(M[0]); C < M.length; ) x = x.plus(M[C++]);
    return x;
  }, e = /* @__PURE__ */ function() {
    var C = "0123456789";
    function M(x, U, R, b) {
      for (var u, d = [0], p, m = 0, w = x.length; m < w; ) {
        for (p = d.length; p--; d[p] *= U) ;
        for (d[0] += b.indexOf(x.charAt(m++)), u = 0; u < d.length; u++)
          d[u] > R - 1 && (d[u + 1] == null && (d[u + 1] = 0), d[u + 1] += d[u] / R | 0, d[u] %= R);
      }
      return d.reverse();
    }
    return function(x, U, R, b, u) {
      var d, p, m, w, B, F, I, f, g = x.indexOf("."), S = l, L = h;
      for (g >= 0 && (w = j, j = 0, x = x.replace(".", ""), f = new Q(U), F = f.pow(x.length - g), j = w, f.c = M(
        sn(Qe(F.c), F.e, "0"),
        10,
        R,
        C
      ), f.e = f.c.length), I = M(x, U, R, u ? (d = N, C) : (d = C, N)), m = w = I.length; I[--w] == 0; I.pop()) ;
      if (!I[0]) return d.charAt(0);
      if (g < 0 ? --m : (F.c = I, F.e = m, F.s = b, F = t(F, f, S, L, R), I = F.c, B = F.r, m = F.e), p = m + S + 1, g = I[p], w = R / 2, B = B || p < 0 || I[p + 1] != null, B = L < 4 ? (g != null || B) && (L == 0 || L == (F.s < 0 ? 3 : 2)) : g > w || g == w && (L == 4 || B || L == 6 && I[p - 1] & 1 || L == (F.s < 0 ? 8 : 7)), p < 1 || !I[0])
        x = B ? sn(d.charAt(1), -S, d.charAt(0)) : d.charAt(0);
      else {
        if (I.length = p, B)
          for (--R; ++I[--p] > R; )
            I[p] = 0, p || (++m, I = [1].concat(I));
        for (w = I.length; !I[--w]; ) ;
        for (g = 0, x = ""; g <= w; x += d.charAt(I[g++])) ;
        x = sn(x, m, d.charAt(0));
      }
      return x;
    };
  }(), t = /* @__PURE__ */ function() {
    function C(U, R, b) {
      var u, d, p, m, w = 0, B = U.length, F = R % yn, I = R / yn | 0;
      for (U = U.slice(); B--; )
        p = U[B] % yn, m = U[B] / yn | 0, u = I * p + m * F, d = F * p + u % yn * yn + w, w = (d / b | 0) + (u / yn | 0) + I * m, U[B] = d % b;
      return w && (U = [w].concat(U)), U;
    }
    function M(U, R, b, u) {
      var d, p;
      if (b != u)
        p = b > u ? 1 : -1;
      else
        for (d = p = 0; d < b; d++)
          if (U[d] != R[d]) {
            p = U[d] > R[d] ? 1 : -1;
            break;
          }
      return p;
    }
    function x(U, R, b, u) {
      for (var d = 0; b--; )
        U[b] -= d, d = U[b] < R[b] ? 1 : 0, U[b] = d * u + U[b] - R[b];
      for (; !U[0] && U.length > 1; U.splice(0, 1)) ;
    }
    return function(U, R, b, u, d) {
      var p, m, w, B, F, I, f, g, S, L, H, J, tt, st, xt, At, bt, Et = U.s == R.s ? 1 : -1, ht = U.c, wt = R.c;
      if (!ht || !ht[0] || !wt || !wt[0])
        return new Q(
          // Return NaN if either NaN, or both Infinity or 0.
          !U.s || !R.s || (ht ? wt && ht[0] == wt[0] : !wt) ? NaN : (
            // Return ±0 if x is ±0 or y is ±Infinity, or return ±Infinity as y is ±0.
            ht && ht[0] == 0 || !wt ? Et * 0 : Et / 0
          )
        );
      for (g = new Q(Et), S = g.c = [], m = U.e - R.e, Et = b + m + 1, d || (d = qe, m = We(U.e / vt) - We(R.e / vt), Et = Et / vt | 0), w = 0; wt[w] == (ht[w] || 0); w++) ;
      if (wt[w] > (ht[w] || 0) && m--, Et < 0)
        S.push(1), B = !0;
      else {
        for (st = ht.length, At = wt.length, w = 0, Et += 2, F = _e(d / (wt[0] + 1)), F > 1 && (wt = C(wt, F, d), ht = C(ht, F, d), At = wt.length, st = ht.length), tt = At, L = ht.slice(0, At), H = L.length; H < At; L[H++] = 0) ;
        bt = wt.slice(), bt = [0].concat(bt), xt = wt[0], wt[1] >= d / 2 && xt++;
        do {
          if (F = 0, p = M(wt, L, At, H), p < 0) {
            if (J = L[0], At != H && (J = J * d + (L[1] || 0)), F = _e(J / xt), F > 1)
              for (F >= d && (F = d - 1), I = C(wt, F, d), f = I.length, H = L.length; M(I, L, f, H) == 1; )
                F--, x(I, At < f ? bt : wt, f, d), f = I.length, p = 1;
            else
              F == 0 && (p = F = 1), I = wt.slice(), f = I.length;
            if (f < H && (I = [0].concat(I)), x(L, I, H, d), H = L.length, p == -1)
              for (; M(wt, L, At, H) < 1; )
                F++, x(L, At < H ? bt : wt, H, d), H = L.length;
          } else p === 0 && (F++, L = [0]);
          S[w++] = F, L[0] ? L[H++] = ht[tt] || 0 : (L = [ht[tt]], H = 1);
        } while ((tt++ < st || L[0] != null) && Et--);
        B = L[0] != null, S[0] || S.splice(0, 1);
      }
      if (d == qe) {
        for (w = 1, Et = S[0]; Et >= 10; Et /= 10, w++) ;
        X(g, b + (g.e = w + m * vt - 1) + 1, u, B);
      } else
        g.e = m, g.r = +B;
      return g;
    };
  }();
  function W(C, M, x, U) {
    var R, b, u, d, p;
    if (x == null ? x = h : _t(x, 0, 8), !C.c) return C.toString();
    if (R = C.c[0], u = C.e, M == null)
      p = Qe(C.c), p = U == 1 || U == 2 && (u <= A || u >= E) ? Qr(p, u) : sn(p, u, "0");
    else if (C = X(new Q(C), M, x), b = C.e, p = Qe(C.c), d = p.length, U == 1 || U == 2 && (M <= b || b <= A)) {
      for (; d < M; p += "0", d++) ;
      p = Qr(p, b);
    } else if (M -= u, p = sn(p, b, "0"), b + 1 > d) {
      if (--M > 0) for (p += "."; M--; p += "0") ;
    } else if (M += b - d, M > 0)
      for (b + 1 == d && (p += "."); M--; p += "0") ;
    return C.s < 0 && R ? "-" + p : p;
  }
  function V(C, M) {
    for (var x, U, R = 1, b = new Q(C[0]); R < C.length; R++)
      U = new Q(C[R]), (!U.s || (x = Dn(b, U)) === M || x === 0 && b.s === M) && (b = U);
    return b;
  }
  function K(C, M, x) {
    for (var U = 1, R = M.length; !M[--R]; M.pop()) ;
    for (R = M[0]; R >= 10; R /= 10, U++) ;
    return (x = U + x * vt - 1) > T ? C.c = C.e = null : x < v ? C.c = [C.e = 0] : (C.e = x, C.c = M), C;
  }
  n = /* @__PURE__ */ function() {
    var C = /^(-?)0([xbo])(?=\w[\w.]*$)/i, M = /^([^.]+)\.$/, x = /^\.([^.]+)$/, U = /^-?(Infinity|NaN)$/, R = /^\s*\+(?=[\w.])|^\s+|\s+$/g;
    return function(b, u, d, p) {
      var m, w = d ? u : u.replace(R, "");
      if (U.test(w))
        b.s = isNaN(w) ? null : w < 0 ? -1 : 1;
      else {
        if (!d && (w = w.replace(C, function(B, F, I) {
          return m = (I = I.toLowerCase()) == "x" ? 16 : I == "b" ? 2 : 8, !p || p == m ? F : B;
        }), p && (m = p, w = w.replace(M, "$1").replace(x, "0.$1")), u != w))
          return new Q(w, m);
        if (Q.DEBUG)
          throw Error(Re + "Not a" + (p ? " base " + p : "") + " number: " + u);
        b.s = null;
      }
      b.c = b.e = null;
    };
  }();
  function X(C, M, x, U) {
    var R, b, u, d, p, m, w, B = C.c, F = es;
    if (B) {
      t: {
        for (R = 1, d = B[0]; d >= 10; d /= 10, R++) ;
        if (b = M - R, b < 0)
          b += vt, u = M, p = B[m = 0], w = _e(p / F[R - u - 1] % 10);
        else if (m = ts((b + 1) / vt), m >= B.length)
          if (U) {
            for (; B.length <= m; B.push(0)) ;
            p = w = 0, R = 1, b %= vt, u = b - vt + 1;
          } else
            break t;
        else {
          for (p = d = B[m], R = 1; d >= 10; d /= 10, R++) ;
          b %= vt, u = b - vt + R, w = u < 0 ? 0 : _e(p / F[R - u - 1] % 10);
        }
        if (U = U || M < 0 || // Are there any non-zero digits after the rounding digit?
        // The expression  n % pows10[d - j - 1]  returns all digits of n to the right
        // of the digit at j, e.g. if n is 908714 and j is 2, the expression gives 714.
        B[m + 1] != null || (u < 0 ? p : p % F[R - u - 1]), U = x < 4 ? (w || U) && (x == 0 || x == (C.s < 0 ? 3 : 2)) : w > 5 || w == 5 && (x == 4 || U || x == 6 && // Check whether the digit to the left of the rounding digit is odd.
        (b > 0 ? u > 0 ? p / F[R - u] : 0 : B[m - 1]) % 10 & 1 || x == (C.s < 0 ? 8 : 7)), M < 1 || !B[0])
          return B.length = 0, U ? (M -= C.e + 1, B[0] = F[(vt - M % vt) % vt], C.e = -M || 0) : B[0] = C.e = 0, C;
        if (b == 0 ? (B.length = m, d = 1, m--) : (B.length = m + 1, d = F[vt - b], B[m] = u > 0 ? _e(p / F[R - u] % F[u]) * d : 0), U)
          for (; ; )
            if (m == 0) {
              for (b = 1, u = B[0]; u >= 10; u /= 10, b++) ;
              for (u = B[0] += d, d = 1; u >= 10; u /= 10, d++) ;
              b != d && (C.e++, B[0] == qe && (B[0] = 1));
              break;
            } else {
              if (B[m] += d, B[m] != qe) break;
              B[m--] = 0, d = 1;
            }
        for (b = B.length; B[--b] === 0; B.pop()) ;
      }
      C.e > T ? C.c = C.e = null : C.e < v && (C.c = [C.e = 0]);
    }
    return C;
  }
  function nt(C) {
    var M, x = C.e;
    return x === null ? C.toString() : (M = Qe(C.c), M = x <= A || x >= E ? Qr(M, x) : sn(M, x, "0"), C.s < 0 ? "-" + M : M);
  }
  return i.absoluteValue = i.abs = function() {
    var C = new Q(this);
    return C.s < 0 && (C.s = 1), C;
  }, i.comparedTo = function(C, M) {
    return Dn(this, new Q(C, M));
  }, i.decimalPlaces = i.dp = function(C, M) {
    var x, U, R, b = this;
    if (C != null)
      return _t(C, 0, Ue), M == null ? M = h : _t(M, 0, 8), X(new Q(b), C + b.e + 1, M);
    if (!(x = b.c)) return null;
    if (U = ((R = x.length - 1) - We(this.e / vt)) * vt, R = x[R]) for (; R % 10 == 0; R /= 10, U--) ;
    return U < 0 && (U = 0), U;
  }, i.dividedBy = i.div = function(C, M) {
    return t(this, new Q(C, M), l, h);
  }, i.dividedToIntegerBy = i.idiv = function(C, M) {
    return t(this, new Q(C, M), 0, 1);
  }, i.exponentiatedBy = i.pow = function(C, M) {
    var x, U, R, b, u, d, p, m, w, B = this;
    if (C = new Q(C), C.c && !C.isInteger())
      throw Error(Re + "Exponent not an integer: " + nt(C));
    if (M != null && (M = new Q(M)), d = C.e > 14, !B.c || !B.c[0] || B.c[0] == 1 && !B.e && B.c.length == 1 || !C.c || !C.c[0])
      return w = new Q(Math.pow(+nt(B), d ? C.s * (2 - Fr(C)) : +nt(C))), M ? w.mod(M) : w;
    if (p = C.s < 0, M) {
      if (M.c ? !M.c[0] : !M.s) return new Q(NaN);
      U = !p && B.isInteger() && M.isInteger(), U && (B = B.mod(M));
    } else {
      if (C.e > 9 && (B.e > 0 || B.e < -1 || (B.e == 0 ? B.c[0] > 1 || d && B.c[1] >= 24e7 : B.c[0] < 8e13 || d && B.c[0] <= 9999975e7)))
        return b = B.s < 0 && Fr(C) ? -0 : 0, B.e > -1 && (b = 1 / b), new Q(p ? 1 / b : b);
      j && (b = ts(j / vt + 2));
    }
    for (d ? (x = new Q(0.5), p && (C.s = 1), m = Fr(C)) : (R = Math.abs(+nt(C)), m = R % 2), w = new Q(s); ; ) {
      if (m) {
        if (w = w.times(B), !w.c) break;
        b ? w.c.length > b && (w.c.length = b) : U && (w = w.mod(M));
      }
      if (R) {
        if (R = _e(R / 2), R === 0) break;
        m = R % 2;
      } else if (C = C.times(x), X(C, C.e + 1, 1), C.e > 14)
        m = Fr(C);
      else {
        if (R = +nt(C), R === 0) break;
        m = R % 2;
      }
      B = B.times(B), b ? B.c && B.c.length > b && (B.c.length = b) : U && (B = B.mod(M));
    }
    return U ? w : (p && (w = s.div(w)), M ? w.mod(M) : b ? X(w, j, h, u) : w);
  }, i.integerValue = function(C) {
    var M = new Q(this);
    return C == null ? C = h : _t(C, 0, 8), X(M, M.e + 1, C);
  }, i.isEqualTo = i.eq = function(C, M) {
    return Dn(this, new Q(C, M)) === 0;
  }, i.isFinite = function() {
    return !!this.c;
  }, i.isGreaterThan = i.gt = function(C, M) {
    return Dn(this, new Q(C, M)) > 0;
  }, i.isGreaterThanOrEqualTo = i.gte = function(C, M) {
    return (M = Dn(this, new Q(C, M))) === 1 || M === 0;
  }, i.isInteger = function() {
    return !!this.c && We(this.e / vt) > this.c.length - 2;
  }, i.isLessThan = i.lt = function(C, M) {
    return Dn(this, new Q(C, M)) < 0;
  }, i.isLessThanOrEqualTo = i.lte = function(C, M) {
    return (M = Dn(this, new Q(C, M))) === -1 || M === 0;
  }, i.isNaN = function() {
    return !this.s;
  }, i.isNegative = function() {
    return this.s < 0;
  }, i.isPositive = function() {
    return this.s > 0;
  }, i.isZero = function() {
    return !!this.c && this.c[0] == 0;
  }, i.minus = function(C, M) {
    var x, U, R, b, u = this, d = u.s;
    if (C = new Q(C, M), M = C.s, !d || !M) return new Q(NaN);
    if (d != M)
      return C.s = -M, u.plus(C);
    var p = u.e / vt, m = C.e / vt, w = u.c, B = C.c;
    if (!p || !m) {
      if (!w || !B) return w ? (C.s = -M, C) : new Q(B ? u : NaN);
      if (!w[0] || !B[0])
        return B[0] ? (C.s = -M, C) : new Q(w[0] ? u : (
          // IEEE 754 (2008) 6.3: n - n = -0 when rounding to -Infinity
          h == 3 ? -0 : 0
        ));
    }
    if (p = We(p), m = We(m), w = w.slice(), d = p - m) {
      for ((b = d < 0) ? (d = -d, R = w) : (m = p, R = B), R.reverse(), M = d; M--; R.push(0)) ;
      R.reverse();
    } else
      for (U = (b = (d = w.length) < (M = B.length)) ? d : M, d = M = 0; M < U; M++)
        if (w[M] != B[M]) {
          b = w[M] < B[M];
          break;
        }
    if (b && (R = w, w = B, B = R, C.s = -C.s), M = (U = B.length) - (x = w.length), M > 0) for (; M--; w[x++] = 0) ;
    for (M = qe - 1; U > d; ) {
      if (w[--U] < B[U]) {
        for (x = U; x && !w[--x]; w[x] = M) ;
        --w[x], w[U] += qe;
      }
      w[U] -= B[U];
    }
    for (; w[0] == 0; w.splice(0, 1), --m) ;
    return w[0] ? K(C, w, m) : (C.s = h == 3 ? -1 : 1, C.c = [C.e = 0], C);
  }, i.modulo = i.mod = function(C, M) {
    var x, U, R = this;
    return C = new Q(C, M), !R.c || !C.s || C.c && !C.c[0] ? new Q(NaN) : !C.c || R.c && !R.c[0] ? new Q(R) : (O == 9 ? (U = C.s, C.s = 1, x = t(R, C, 0, 3), C.s = U, x.s *= U) : x = t(R, C, 0, O), C = R.minus(x.times(C)), !C.c[0] && O == 1 && (C.s = R.s), C);
  }, i.multipliedBy = i.times = function(C, M) {
    var x, U, R, b, u, d, p, m, w, B, F, I, f, g, S, L = this, H = L.c, J = (C = new Q(C, M)).c;
    if (!H || !J || !H[0] || !J[0])
      return !L.s || !C.s || H && !H[0] && !J || J && !J[0] && !H ? C.c = C.e = C.s = null : (C.s *= L.s, !H || !J ? C.c = C.e = null : (C.c = [0], C.e = 0)), C;
    for (U = We(L.e / vt) + We(C.e / vt), C.s *= L.s, p = H.length, B = J.length, p < B && (f = H, H = J, J = f, R = p, p = B, B = R), R = p + B, f = []; R--; f.push(0)) ;
    for (g = qe, S = yn, R = B; --R >= 0; ) {
      for (x = 0, F = J[R] % S, I = J[R] / S | 0, u = p, b = R + u; b > R; )
        m = H[--u] % S, w = H[u] / S | 0, d = I * m + w * F, m = F * m + d % S * S + f[b] + x, x = (m / g | 0) + (d / S | 0) + I * w, f[b--] = m % g;
      f[b] = x;
    }
    return x ? ++U : f.splice(0, 1), K(C, f, U);
  }, i.negated = function() {
    var C = new Q(this);
    return C.s = -C.s || null, C;
  }, i.plus = function(C, M) {
    var x, U = this, R = U.s;
    if (C = new Q(C, M), M = C.s, !R || !M) return new Q(NaN);
    if (R != M)
      return C.s = -M, U.minus(C);
    var b = U.e / vt, u = C.e / vt, d = U.c, p = C.c;
    if (!b || !u) {
      if (!d || !p) return new Q(R / 0);
      if (!d[0] || !p[0]) return p[0] ? C : new Q(d[0] ? U : R * 0);
    }
    if (b = We(b), u = We(u), d = d.slice(), R = b - u) {
      for (R > 0 ? (u = b, x = p) : (R = -R, x = d), x.reverse(); R--; x.push(0)) ;
      x.reverse();
    }
    for (R = d.length, M = p.length, R - M < 0 && (x = p, p = d, d = x, M = R), R = 0; M; )
      R = (d[--M] = d[M] + p[M] + R) / qe | 0, d[M] = qe === d[M] ? 0 : d[M] % qe;
    return R && (d = [R].concat(d), ++u), K(C, d, u);
  }, i.precision = i.sd = function(C, M) {
    var x, U, R, b = this;
    if (C != null && C !== !!C)
      return _t(C, 1, Ue), M == null ? M = h : _t(M, 0, 8), X(new Q(b), C, M);
    if (!(x = b.c)) return null;
    if (R = x.length - 1, U = R * vt + 1, R = x[R]) {
      for (; R % 10 == 0; R /= 10, U--) ;
      for (R = x[0]; R >= 10; R /= 10, U++) ;
    }
    return C && b.e + 1 > U && (U = b.e + 1), U;
  }, i.shiftedBy = function(C) {
    return _t(C, -9007199254740991, Po), this.times("1e" + C);
  }, i.squareRoot = i.sqrt = function() {
    var C, M, x, U, R, b = this, u = b.c, d = b.s, p = b.e, m = l + 4, w = new Q("0.5");
    if (d !== 1 || !u || !u[0])
      return new Q(!d || d < 0 && (!u || u[0]) ? NaN : u ? b : 1 / 0);
    if (d = Math.sqrt(+nt(b)), d == 0 || d == 1 / 0 ? (M = Qe(u), (M.length + p) % 2 == 0 && (M += "0"), d = Math.sqrt(+M), p = We((p + 1) / 2) - (p < 0 || p % 2), d == 1 / 0 ? M = "5e" + p : (M = d.toExponential(), M = M.slice(0, M.indexOf("e") + 1) + p), x = new Q(M)) : x = new Q(d + ""), x.c[0]) {
      for (p = x.e, d = p + m, d < 3 && (d = 0); ; )
        if (R = x, x = w.times(R.plus(t(b, R, m, 1))), Qe(R.c).slice(0, d) === (M = Qe(x.c)).slice(0, d))
          if (x.e < p && --d, M = M.slice(d - 3, d + 1), M == "9999" || !U && M == "4999") {
            if (!U && (X(R, R.e + l + 2, 0), R.times(R).eq(b))) {
              x = R;
              break;
            }
            m += 4, d += 4, U = 1;
          } else {
            (!+M || !+M.slice(1) && M.charAt(0) == "5") && (X(x, x.e + l + 2, 1), C = !x.times(x).eq(b));
            break;
          }
    }
    return X(x, x.e + l + 1, h, C);
  }, i.toExponential = function(C, M) {
    return C != null && (_t(C, 0, Ue), C++), W(this, C, M, 1);
  }, i.toFixed = function(C, M) {
    return C != null && (_t(C, 0, Ue), C = C + this.e + 1), W(this, C, M);
  }, i.toFormat = function(C, M, x) {
    var U, R = this;
    if (x == null)
      C != null && M && typeof M == "object" ? (x = M, M = null) : C && typeof C == "object" ? (x = C, C = M = null) : x = D;
    else if (typeof x != "object")
      throw Error(Re + "Argument not an object: " + x);
    if (U = R.toFixed(C, M), R.c) {
      var b, u = U.split("."), d = +x.groupSize, p = +x.secondaryGroupSize, m = x.groupSeparator || "", w = u[0], B = u[1], F = R.s < 0, I = F ? w.slice(1) : w, f = I.length;
      if (p && (b = d, d = p, p = b, f -= b), d > 0 && f > 0) {
        for (b = f % d || d, w = I.substr(0, b); b < f; b += d) w += m + I.substr(b, d);
        p > 0 && (w += m + I.slice(b)), F && (w = "-" + w);
      }
      U = B ? w + (x.decimalSeparator || "") + ((p = +x.fractionGroupSize) ? B.replace(
        new RegExp("\\d{" + p + "}\\B", "g"),
        "$&" + (x.fractionGroupSeparator || "")
      ) : B) : w;
    }
    return (x.prefix || "") + U + (x.suffix || "");
  }, i.toFraction = function(C) {
    var M, x, U, R, b, u, d, p, m, w, B, F, I = this, f = I.c;
    if (C != null && (d = new Q(C), !d.isInteger() && (d.c || d.s !== 1) || d.lt(s)))
      throw Error(Re + "Argument " + (d.isInteger() ? "out of range: " : "not an integer: ") + nt(d));
    if (!f) return new Q(I);
    for (M = new Q(s), m = x = new Q(s), U = p = new Q(s), F = Qe(f), b = M.e = F.length - I.e - 1, M.c[0] = es[(u = b % vt) < 0 ? vt + u : u], C = !C || d.comparedTo(M) > 0 ? b > 0 ? M : m : d, u = T, T = 1 / 0, d = new Q(F), p.c[0] = 0; w = t(d, M, 0, 1), R = x.plus(w.times(U)), R.comparedTo(C) != 1; )
      x = U, U = R, m = p.plus(w.times(R = m)), p = R, M = d.minus(w.times(R = M)), d = R;
    return R = t(C.minus(x), U, 0, 1), p = p.plus(R.times(m)), x = x.plus(R.times(U)), p.s = m.s = I.s, b = b * 2, B = t(m, U, b, h).minus(I).abs().comparedTo(
      t(p, x, b, h).minus(I).abs()
    ) < 1 ? [m, U] : [p, x], T = u, B;
  }, i.toNumber = function() {
    return +nt(this);
  }, i.toPrecision = function(C, M) {
    return C != null && _t(C, 1, Ue), W(this, C, M, 2);
  }, i.toString = function(C) {
    var M, x = this, U = x.s, R = x.e;
    return R === null ? U ? (M = "Infinity", U < 0 && (M = "-" + M)) : M = "NaN" : (C == null ? M = R <= A || R >= E ? Qr(Qe(x.c), R) : sn(Qe(x.c), R, "0") : C === 10 && Z ? (x = X(new Q(x), l + R + 1, h), M = sn(Qe(x.c), x.e, "0")) : (_t(C, 2, N.length, "Base"), M = e(sn(Qe(x.c), R, "0"), 10, C, U, !0)), U < 0 && x.c[0] && (M = "-" + M)), M;
  }, i.valueOf = i.toJSON = function() {
    return nt(this);
  }, i._isBigNumber = !0, i[Symbol.toStringTag] = "BigNumber", i[Symbol.for("nodejs.util.inspect.custom")] = i.valueOf, r != null && Q.set(r), Q;
}
function We(r) {
  var t = r | 0;
  return r > 0 || r === t ? t : t - 1;
}
function Qe(r) {
  for (var t, e, n = 1, i = r.length, s = r[0] + ""; n < i; ) {
    for (t = r[n++] + "", e = vt - t.length; e--; t = "0" + t) ;
    s += t;
  }
  for (i = s.length; s.charCodeAt(--i) === 48; ) ;
  return s.slice(0, i + 1 || 1);
}
function Dn(r, t) {
  var e, n, i = r.c, s = t.c, l = r.s, h = t.s, A = r.e, E = t.e;
  if (!l || !h) return null;
  if (e = i && !i[0], n = s && !s[0], e || n) return e ? n ? 0 : -h : l;
  if (l != h) return l;
  if (e = l < 0, n = A == E, !i || !s) return n ? 0 : !i ^ e ? 1 : -1;
  if (!n) return A > E ^ e ? 1 : -1;
  for (h = (A = i.length) < (E = s.length) ? A : E, l = 0; l < h; l++) if (i[l] != s[l]) return i[l] > s[l] ^ e ? 1 : -1;
  return A == E ? 0 : A > E ^ e ? 1 : -1;
}
function _t(r, t, e, n) {
  if (r < t || r > e || r !== _e(r))
    throw Error(Re + (n || "Argument") + (typeof r == "number" ? r < t || r > e ? " out of range: " : " not an integer: " : " not a primitive number: ") + String(r));
}
function Fr(r) {
  var t = r.c.length - 1;
  return We(r.e / vt) == t && r.c[t] % 2 != 0;
}
function Qr(r, t) {
  return (r.length > 1 ? r.charAt(0) + "." + r.slice(1) : r) + (t < 0 ? "e" : "e+") + t;
}
function sn(r, t, e) {
  var n, i;
  if (t < 0) {
    for (i = e + "."; ++t; i += e) ;
    r = i + r;
  } else if (n = r.length, ++t > n) {
    for (i = e, t -= n; --t; i += e) ;
    r += i;
  } else t < n && (r = r.slice(0, t) + "." + r.slice(t));
  return r;
}
qa();
const _u = (r) => {
  const t = qc.decode(r), e = new Hc(0);
  return e._value = BigInt(t.ingress_expiry.toString(10)), Object.assign(Object.assign({}, t), { canister_id: ke.from(t.canister_id), ingress_expiry: e });
};
var Wu = function(r, t, e, n) {
  if (e === "a" && !n) throw new TypeError("Private accessor was defined without a getter");
  if (typeof t == "function" ? r !== t || !n : !t.has(r)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
  return e === "m" ? n : e === "a" ? n.call(r) : n ? n.value : t.get(r);
}, qu = function(r, t, e, n, i) {
  if (n === "m") throw new TypeError("Private method is not writable");
  if (n === "a" && !i) throw new TypeError("Private accessor was defined without a setter");
  if (typeof t == "function" ? r !== t || !i : !t.has(r)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
  return n === "a" ? i.call(r, e) : i ? i.value = e : t.set(r, e), e;
}, Kr;
class Hu {
  constructor() {
    Kr.set(this, Promise.resolve());
  }
  async schedule(t) {
    return new Promise((e, n) => {
      qu(this, Kr, Wu(this, Kr, "f").finally(async () => {
        try {
          e(await t());
        } catch (i) {
          n(i);
        }
      }), "f");
    });
  }
}
Kr = /* @__PURE__ */ new WeakMap();
var Tt = function(r, t, e, n) {
  if (e === "a" && !n) throw new TypeError("Private accessor was defined without a getter");
  if (typeof t == "function" ? r !== t || !n : !t.has(r)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
  return e === "m" ? n : e === "a" ? n.call(r) : n ? n.value : t.get(r);
}, Ke = function(r, t, e, n, i) {
  if (n === "m") throw new TypeError("Private method is not writable");
  if (n === "a" && !i) throw new TypeError("Private accessor was defined without a setter");
  if (typeof t == "function" ? r !== t || !i : !t.has(r)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
  return n === "a" ? i.call(r, e) : i ? i.value = e : t.set(r, e), e;
}, pr, He, wr, De, Kn, Mr, Vr, Un, yr, mr, Cs, Ha;
const Zu = new Uint8Array(Kc.match(/[\da-f]{2}/gi).map((r) => parseInt(r, 16))).buffer, Fo = 5, Vn = "Received invalid response from signer";
class je extends Error {
  constructor(t) {
    super(t), Object.setPrototypeOf(this, je.prototype);
  }
}
class ri {
  constructor(t) {
    pr.add(this), De.set(this, void 0), Kn.set(this, /* @__PURE__ */ new Map()), Mr.set(this, new Hu()), Vr.set(this, void 0), Un.set(this, [[]]), yr.set(this, !0), mr.set(this, void 0);
    const e = !Tt(He, He, "f", wr);
    if (Ke(He, He, !1, "f", wr), e)
      throw new je("SignerAgent is not constructable");
    Ke(this, De, t, "f");
  }
  get rootKey() {
    var t;
    return (t = Tt(this, De, "f").agent.rootKey) !== null && t !== void 0 ? t : Zu;
  }
  get signer() {
    return Tt(this, De, "f").signer;
  }
  static async create(t) {
    var e, n, i;
    return Ke(He, He, !0, "f", wr), new He(Object.assign(Object.assign({}, t), { agent: (e = t.agent) !== null && e !== void 0 ? e : await Ye.create(), scheduleDelay: (n = t.scheduleDelay) !== null && n !== void 0 ? n : 20, validation: (i = t.validation) !== null && i !== void 0 ? i : null }));
  }
  static createSync(t) {
    var e, n, i;
    return Ke(He, He, !0, "f", wr), new He(Object.assign(Object.assign({}, t), { agent: (e = t.agent) !== null && e !== void 0 ? e : Ye.createSync(), scheduleDelay: (n = t.scheduleDelay) !== null && n !== void 0 ? n : 20, validation: (i = t.validation) !== null && i !== void 0 ? i : null }));
  }
  async execute() {
    const t = [...Tt(this, Un, "f")], e = Tt(this, mr, "f");
    this.clear();
    const n = t.flat().length;
    if (n === 0) {
      Ke(this, mr, void 0, "f");
      return;
    }
    if (!(n > 1)) {
      await Tt(this, pr, "m", Cs).call(this, t);
      return;
    }
    (await Tt(this, Mr, "f").schedule(() => this.signer.supportedStandards())).some((h) => h.name === "ICRC-112") ? await Tt(this, pr, "m", Ha).call(this, t, e) : await Tt(this, pr, "m", Cs).call(this, t);
  }
  async call(t, e) {
    t = ke.from(t), await Tt(this, De, "f").signer.openChannel();
    const n = await new Promise((j, D) => {
      clearTimeout(Tt(this, Vr, "f")), Tt(this, Un, "f").slice(-1)[0].push({
        options: {
          canisterId: t,
          method: e.methodName,
          arg: e.arg
        },
        resolve: j,
        reject: D
      }), Tt(this, yr, "f") && Ke(this, Vr, setTimeout(() => this.execute(), Tt(this, De, "f").scheduleDelay), "f");
    }), i = _u(n.contentMap);
    if (!(Zc.Call === i.request_type && t.compareTo(i.canister_id) === "eq" && e.methodName === i.method_name && Yc(e.arg, i.arg) === 0 && Tt(this, De, "f").account.compareTo(ke.from(i.sender)) === "eq"))
      throw new je(Vn);
    const l = Gc(i), h = await No.create({
      certificate: n.certificate,
      rootKey: this.rootKey,
      canisterId: t,
      maxAgeInMinutes: Fo
    }).catch(() => {
      throw new je(Vn);
    });
    if (!(h.lookup(["request_status", l, "status"]).status === Gi.Found))
      throw new je(Vn);
    const E = Ir(l);
    if (Tt(this, Kn, "f").has(E))
      throw new je(Vn);
    Tt(this, Kn, "f").set(E, n.certificate);
    const v = Date.now(), T = Jc(h.lookup(["time"]));
    if (!T)
      throw new je(Vn);
    const O = Number(ru(new iu(T))) / 1e6 - v + Fo * 60 * 1e3;
    return setTimeout(() => Tt(this, Kn, "f").delete(E), O), {
      requestId: l,
      response: {
        ok: !0,
        status: 202,
        statusText: "Call has been sent over ICRC-25 JSON-RPC",
        body: null,
        headers: []
      }
    };
  }
  async fetchRootKey() {
    return Tt(this, De, "f").agent.fetchRootKey();
  }
  async getPrincipal() {
    return Tt(this, De, "f").account;
  }
  async query(t, e) {
    t = ke.from(t);
    const n = await this.call(t, e), i = await this.readState(t, {
      paths: [
        [new TextEncoder().encode("request_status"), n.requestId]
      ]
    }), s = await No.create({
      certificate: i.certificate,
      rootKey: this.rootKey,
      canisterId: t
    }), l = s.lookup([
      "request_status",
      n.requestId,
      "status"
    ]), h = s.lookup([
      "request_status",
      n.requestId,
      "reply"
    ]);
    if (l.status !== Gi.Found || new TextDecoder().decode(l.value) !== "replied" || h.status !== Gi.Found)
      throw new je("Certificate is missing reply");
    return {
      requestId: n.requestId,
      status: "replied",
      reply: {
        arg: h.value
      },
      httpDetails: {
        ok: !0,
        status: 202,
        statusText: "Certificate with reply has been received over ICRC-25 JSON-RPC",
        headers: []
      }
    };
  }
  async createReadStateRequest(t) {
    return {
      body: {
        content: {}
      }
    };
  }
  async readState(t, e, n, i) {
    if (e.paths.length !== 1 || e.paths[0].length !== 2 || new TextDecoder().decode(e.paths[0][0]) !== "request_status")
      throw new je("Given paths are not supported");
    const s = e.paths[0][1], l = Ir(s), h = Tt(this, Kn, "f").get(l);
    if (!h)
      throw new je("Certificate could not be found");
    return { certificate: h };
  }
  async status() {
    return Tt(this, De, "f").agent.status();
  }
  replaceAccount(t) {
    Tt(this, De, "f").account = t;
  }
  replaceValidation(t) {
    Ke(this, mr, t, "f");
  }
  /**
   * Enable manual triggering of canister calls execution
   */
  batch() {
    Ke(this, yr, !1, "f"), Tt(this, Un, "f").slice(-1)[0].length > 0 && Tt(this, Un, "f").push([]);
  }
  /**
   * Clear scheduled canister calls and switch back to automatic canister calls execution
   */
  clear() {
    Ke(this, Un, [[]], "f"), Ke(this, yr, !0, "f");
  }
}
He = ri, De = /* @__PURE__ */ new WeakMap(), Kn = /* @__PURE__ */ new WeakMap(), Mr = /* @__PURE__ */ new WeakMap(), Vr = /* @__PURE__ */ new WeakMap(), Un = /* @__PURE__ */ new WeakMap(), yr = /* @__PURE__ */ new WeakMap(), mr = /* @__PURE__ */ new WeakMap(), pr = /* @__PURE__ */ new WeakSet(), Cs = async function(t) {
  await Promise.all(t.flat().map(({ options: e, resolve: n, reject: i }) => Tt(this, Mr, "f").schedule(async () => {
    try {
      const s = await this.signer.callCanister(Object.assign({ sender: Tt(this, De, "f").account }, e));
      n(s);
    } catch (s) {
      i(s);
    }
  })));
}, Ha = async function(t, e) {
  await Tt(this, Mr, "f").schedule(async () => {
    try {
      const n = await this.signer.batchCallCanister({
        sender: Tt(this, De, "f").account,
        requests: t.map((i) => i.map(({ options: s }) => s)),
        validation: e ?? void 0
      });
      t.forEach((i, s) => i.forEach(({ resolve: l, reject: h }, A) => {
        const E = n[s][A];
        if ("result" in E) {
          l(E.result);
          return;
        }
        if ("error" in E) {
          h(new je(`${E.error.code}: ${E.error.message}
${JSON.stringify(E.error.data)}`));
          return;
        }
        h(new je(Vn));
      }));
    } catch (n) {
      t.flat().forEach(({ reject: i }) => i(n));
    }
  });
};
wr = { value: !1 };
const Sn = class Sn extends rr {
  constructor(t) {
    super(t), this.identity = null, this.sessionKey = null, this.walletName = Sn.walletName, this.logo = Sn.logo, this.unwrapResponse = (i) => {
      if ("error" in i)
        throw new fn(i.error);
      if ("result" in i)
        return i.result;
      throw new fn({
        code: 500,
        message: "Invalid response"
      });
    };
    const e = this.config.adapters?.nfid;
    this.url = e?.rpcUrl ?? "https://nfid.one/rpc", this.transport = new Wa({
      url: this.url,
      ...Sn.TRANSPORT_CONFIG
    }), this.signer = new Fa({
      transport: this.transport
    });
    const n = Ye.createSync({ host: this.url });
    this.signerAgent = ri.createSync({
      signer: this.signer,
      account: ke.anonymous(),
      // Start anonymous
      agent: n
    }), this.agent = Ye.createSync({ host: this.url }), this.setState(pt.Status.READY);
  }
  async isAvailable() {
    return !0;
  }
  async isConnected() {
    return this.identity !== null && this.state === pt.Status.CONNECTED;
  }
  async getPrincipal() {
    if (!this.identity)
      throw new Error("NFID Adapter: Not connected. Call connect() first.");
    return this.identity.getPrincipal().toText();
  }
  async connect() {
    if (this.setState(pt.Status.CONNECTING), !this.signer || !this.transport || !this.agent)
      throw console.error("[NFID] Adapter not initialized correctly before connect."), this.setState(pt.Status.ERROR), new Error("NFID Adapter not initialized correctly.");
    try {
      await this.signer.openChannel(), this.sessionKey = Da.generate();
      const t = this.config.delegationTimeout !== void 0 ? BigInt(Date.now() * 1e6) + BigInt(this.config.delegationTimeout) : BigInt(Date.now() * 1e6) + BigInt(48 * 60 * 60 * 1e9), e = await this.signer.delegation({
        publicKey: this.sessionKey.getPublicKey().toDer(),
        targets: this.config.delegationTargets.map(
          (s) => ke.fromText(s)
        ),
        maxTimeToLive: t
      }), n = Oa.fromDelegation(
        this.sessionKey,
        e
      );
      this.signerAgent = ri.createSync({
        signer: this.signer,
        account: n.getPrincipal(),
        agent: Ye.createSync({ host: this.url })
        // Use RPC URL for the signer agent
      }), this.identity = n, this.config.fetchRootKeys && await this.agent.fetchRootKey();
      const i = n.getPrincipal();
      if (i.isAnonymous())
        throw console.warn("[NFID] Connect failed: got anonymous principal."), this.setState(pt.Status.READY), this.identity = null, this.signerAgent = null, this.sessionKey = null, new Error(
          "Failed to authenticate with NFID - got anonymous principal"
        );
      return this.setState(pt.Status.CONNECTED), {
        owner: i.toText(),
        subaccount: Dr.fromPrincipal({
          principal: i,
          subAccount: void 0
          // This will use the default subaccount
        }).toHex(),
        hasDelegation: !0
      };
    } catch (t) {
      if (console.error("[NFID] Error during connection:", t), this.identity = null, this.signerAgent = null, this.sessionKey = null, this.signer)
        try {
          this.signer.closeChannel();
        } catch (e) {
          console.debug("Error closing channel on connect failure:", e);
        }
      throw this.setState(pt.Status.READY), t;
    }
  }
  undelegatedActor(t, e) {
    const n = Ye.createSync({
      identity: this.identity,
      host: this.config.hostUrl,
      verifyQuerySignatures: this.config.verifyQuerySignatures
    });
    return kn.createActor(e, {
      agent: n,
      canisterId: t
    });
  }
  // Implementation for BaseIcAdapter actor caching
  createActorInternal(t, e, n) {
    const i = n?.requiresSigning !== !1;
    if (!this.identity)
      throw new Error("Not connected. Identity not available.");
    if (!this.signerAgent && i)
      throw new Error("Signer agent not available. Please connect first.");
    if (!this.config.hostUrl)
      throw new Error("Host URL configuration is missing.");
    try {
      const s = this.identity.getDelegation().delegations.some(
        (l) => l.delegation.targets?.some((h) => h.toText() === t)
      );
      return s && !i || !s && !i ? this.undelegatedActor(t, e) : i ? kn.createActor(e, {
        agent: this.signerAgent,
        canisterId: t
      }) : kn.createActor(e, {
        agent: this.signerAgent,
        canisterId: t
      });
    } catch (s) {
      throw console.error("Error creating actor:", s), new Error(
        `Failed to create actor: ${s instanceof Error ? s.message : String(s)}`
      );
    }
  }
  // disconnect is handled by BaseIcAdapter, implement internal methods instead
  async disconnectInternal() {
    this.identity = null, this.signerAgent = null, this.sessionKey = null;
    try {
      this.signer && this.signer.closeChannel();
    } catch (t) {
      console.error("[NFID] Error during disconnect internal cleanup:", t);
    }
  }
  cleanupInternal() {
    this.transport = null, this.signer = null;
  }
};
Sn.TRANSPORT_CONFIG = {
  windowOpenerFeatures: "width=525,height=705",
  establishTimeout: 45e3,
  disconnectTimeout: 45e3,
  statusPollingRate: 500,
  detectNonClickEstablishment: !1
  // Allow connection outside of click handler for auto-connect
}, Sn.logo = Ru, Sn.walletName = "NFID";
let Sr = Sn;
const Yu = "data:image/webp;base64,UklGRgIcAABXRUJQVlA4WAoAAAAwAAAA/wAA/wAASUNDUMgBAAAAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADZBTFBI1ggAAA3wxmz/+7T9/12MZoANuKZ2McjZhlBmFqqIoMQqBidoZCedljqQqPZuya1076IgZUnuyB4MUYaJXAJqBmSwKbhAUjMcm41Ndpz3YNgvv17PR29GxARAcENDQ+SyYKkkSCz2mz9njjecd+/eumm3j40OD9mslv5+kFW+dOmSRQuVPpi195w58/3E4iCJNFgmDwl9YL5+rbury0oLRXRUZGQQOKpULly0ZKl0rL29tWWABBEr4+Nk4L4kPDIySmFrbLjSwXQhTyasEcODpXFx8RH2+roLFjaLTUxcDB70X70mQdFz7lwTa61ISQ4Efy5ITIwar6m+yk4RarUEfBuYlLxy1GjsYCFRmkYJfg5Qq5eZDZUOxonVJoHPlakaUW15E8OkZyjB+2u1MebSCjYRZWXOhSCGZaTfKSl2MEfwRg2E0zcr089QOMQUj215CgKbukly9uQgMwRsU0OAUzZLjccn2GDnegj0uu3+ZUcYQPOsN4R7ww7nIYPARb8gg7A/m2r7pUXARLpVEHzZczGX9Q6hStsKJozXiU5UClLYS2FgxS2avoN9wpOpBUOGvqQoLxGYx3NCwJbaTMveG0LydDaYU54jLzojGN6vqcCi2WrTHqcwhOeCUVW5XgWdQpCeBnbNVVVW8F9OOFhWk9a5l+cefdsfbBueM/n9CJ89oQPzzntHom/jr+T1YGHd8rIavtqYADbWJtcV8pNOBVZOyDLp+ej1ELCzSmfJ558PxWBp+ev2L3nGe5cv2Fr0wf3dTj55JA/M7Zvn9ek9/njkY7B4ns/n9/jCOw9s/onPp06e2AVWz/PazQ8f+jIb8u5/yQevi8Huvh/Y8z1PFwKWF71u0XvaRhXYXq4zFXpWcgJYX5VVV+NJT6wH+yckl7V5zqM6UFC7XD/iMW+DhjrJ956S408EvDO51zPSw0HFeTmdFZ4QngY6hqdVdnLPOxeU1KgKnJx7DbTM9drDtadVxECu6Qy3Hs8GNVXqohucygE9s+V7uZQZQhDkWEq4E6YFReWZ5X2ceQk01SoOciUtjCh4qa+SG6KtoGqo5oSDEzrQdYtIz4XoVYSB7nILB14AZeNjfnGfRkYaPGczuO1Z0FaWeshdO72Jg2edR9wTsB7k3VE24ZZtoO8G/+PueExNIGw3DrphCyi8TnrSdcFPkQibzw65bCNonCIpdJVIQyRsMjhclAUqp/oVuyiTTMgscU36XDpl3alwSQbo7Jte6opYJaGQYW5ygRaUDospn50oiVTQ1jpmlQZarxVVzkpDLGgMs4lQUivV3DELNaitXGYkHtSzWCEh2OjVGaWA3gErq2eUTDAk18wkNpBiSeNNM0gExQOjzhEPiTMIWUy0Hss0T4LmCxQXpkkgGhLqpllDtTX1U0WIqbba3jHFSlDdP+LKFPFkQ3zDFHF0i2v8P4WMcLYBANGgu1TRAiCKcIhqBRBJucj2fwPkQZQLH7NiKSgvkXYRD0u7sIR2S7qxiHaLrmEh7RZeh5J2SnOoD/EehIL4oSHUC5FTTy6jniyYesFS6kkl1JMEUS9ITD0x/fyo5zefevPnUG8O/byp5w3yO72J57w7h3h36XdrPvFu3fQj3k27mHh2+o0FEW9sVEK80WEp8YaHgok3ZJMRz2aVE89qCSGepT+UeP39D5SkMwNm8l1fSLrrwLVFpLsGdC8hXTfQtZR0XUCXVEK40WHAOhZOuE4AaI8kXPu/A61RhGv9vxaFlGzDA/83YIsjWyOmbCRfQzzZGqa6EuFPtMmOqTrsq4l2CdPWryFa/XR1CUSrm+6CYgHJ/hmYztKTSLJzmOE5+kUFEmy8dSZN40kEq8WMa5IJVjOz6pUB5Jq4MrOro2pyGTFLI/2WKYll/ns2HeZUYlVh1gYNsQyzqxStJdWfjtk5arWkKocLy2PCCNXX7IomcwahSuHS0nRfMt2vcE3FnSwyFcPFJZlkKnFVsV8qkapuusph2ESk03B5oSSFRNWjrhs6u5lEp+DGk9J1BPpj2B2Dxu0EOga3HvffQJ7fJ90zUbaDPEfh5iPOZ4lzCG4/lCojja3KfQbbc6T5DRz8JSaeMA3NXGi5rCOMHpzUi7aQ5aSDG44TmlCi9BvA0cq+l4hyEJw9qNCSpHyAO33lmXKCWEvA4RJLDkH2gtN75dnkKLJy60aRWkUMkxEcP2PKJUYBOL/HK5cUBQ+55yxQaQhhMMEDOyvTwsnQWQmPrOjMmUeE23vhoXsn3yHCd/DY7yU6EuhHPWdEv1xLgPK/4MFtZckJzFdXA4+uqctSMZ6pGB5eaNLJmc6qh8frLa+LGM6RDx7Mt3/ow2z3vwIvfnlvF7N9Cp7c7ZXHaJ8+5Avnpz6fMNlnD8Cb9z73yWOwTx+AR+996pXny1j3P30IXnXuvv+BiKkcX4F3v7S/Lmcoaz54ON+iUzGTSQ9e1puyEhiprhg8XViXrGWi8hrwdk3Zch0D6f8Cj7fpJe/MY5zb342C10e+n8wJZ5rOveD9vZ1pGoYxVEIAKypVucxSYIIgdhZ45aqYxFTwEALp3GNSZzNIkRECeqZIniNnDOteKwT1xl5LppYpyksguCXlipdCmaH/4AAEuO9gn2YLI5w0QKArT4h08QzQoHdAsB36yzHPyQTO9lszBL3lF1vqs4J2qAqCbzjk3LFBsH4/CiY8Uua/fZ0g/XFsEow4cdwo3ZwiONWnhsGQgyfPSjalCkrV6VEw5lChwS8zy1cg7heX3ASDOopL7qRnhAlAX2kFmLWi1ByjXctzf5Y3g2mbymtFmlQlb5mrDA4wr6PSYF6mVgfw0ITR+DcYucNoHF2ZnBTIK+O1NVfA1Fera8ajEhMX8MQ/5861gsGbzp3rUSSsWe3vYZOX6usGwOyWC3X19oj4uDiphww3NjZ0gPk7rjQ02hRRkZHhEk6Ndra3tw6AjAMtre3tY9KlSxYtVCrdZjZfv9bdNQyCWru6uq9dNz8IDZHLgqWSILHYb/6cOd5w3r1766bdPjY6PGSzWvohuFZQOCA2EQAA0EoAnQEqAAEAAT5tMpNHJCMhoSzyqYCADYlkbvx8eyL+d5IZoF4A/QB+gH6AeIB9ACa3gD+e/lp+//ltU/5x/a/2C/t37W9NhuL3p/Jr4x+IcfX1E9p/2P94/uf7JfN/+wfxr2Afwn+6/7P+o/AB+mn+v/vH+G/aT4jPUH5gP6d/gv/P/gvew/t3/A/s3uN/sP+Z/T74AP6l/mf/V6yPsG+gB/QP8J/4fXE/cv4Kv20/dH3PP89///+P7gH//9QD9/+x36Z/2P8e+//+35DiBL9vMYLId4z5Kt3bABui8cveN0APzZ6sH994x/rH2BvLA9gvo0nUExCHYEUceSTa+nFYudkCYp6yxyDf13nj9qmt7DAwBpMaRrC1IlQzq7zx+l49h1d3deFgw1qTXNjz6GvY3CLwovEjaHW6ENga9gW0fh7+0dV86Xc8GkG6N/1gRW7QArUF5WorCsiORsBlfdTi+XYQ+xjmqKFdrd2BlFJ6UFr0/Sqd72n3rqzYzE9X1nCqWry1bsn+b9hko5WFGZDuMXEuPtqcMcPlTJuyc93muyYEirxlRS5kBuPcwMxy9dmU+1BbJhp08PGw/iytDAvrfIJfvQDgReQWP0OtUa1uVMF6Sfb9ufCjcKBtR1LXv9pT75uGxpcG3zPd+Pbv0OgKIE1af7xZI/ic142uGbfVMSU3T/ZAOoW8rrOXrHnWGBphT8dE4kCGxgSA19BaOyzomvLLpX66QLLtGAeegtskYVqIj2VoDrxHq821AbJaBY7T578CVNRbsMOVg/71UNGiDUtFqAOJjFHD9eOhKAD+P6qAw8PC4j58hgWGNhIFKkB7Fc+Td3Ia8d35zmjFn4ajhI8aiCF8nM96Ti3qz1Xg3LVowPyJYsmvjQ0iOFdwKOWLh3shkJTl4Liqk56hFUnPLpJpDSVoHP/x9s9qWiRQIptj5Xro0pJV+Lzp7Ko3iZrLuHvC2vVoORQk6uR2JgugeTPrq3ouewQQLjmOipukAZMhUIwq3vkfPkMCwxsI8AW8i2MIJeXjguh6ckC9gP0UuCrgYqsF/YmwjS/oMk5a7Z0ry3hNPGYjZnIEjRSNp2E18dUAAAAO/SB1/DrQl4O7JgnVEqzf2qBYlhIXiu9iRNLgZswLEfMFQrzha5IT7m2m03ebtyVae4Xqh+Zm/SkDxplVSAel+rnOZKI13/Vg9aWpXTubEUwe/iroTZStPxE9sAATbfjYCfOIdRnUE5n11eWQ9knu4okbIZ4UoLEw9QPTRsKQQu8y3u+1nFakhq54LvRpEBuVyP4O7ROlAQA2k8fEDQF+hvNTQYfFBdw/cmkW9r/zV+Tz1x4Xxfm9HqG3JYmRwVIe7l1y6hg/DQEfJF1O1t+Xdtjqo7EbM5AkeI94Fhz9fxrt25i7dQa4Wnxttn5y1ETT+Tj5P8YP1r+ELVWjLxbdHz1IlWNfBLqA8zoewZLroirXRFtufI+qDTEw7bkBJUXBxQSWEHOu8Dpj6DXJ31Jes9841cKxZ+svAlEjGq0cN2Q45SvVWxXmnzY/+XmWViEN+zaXG9SoZzNYGX3JpXf50JRzzMSKtaQI8QsMft27D/aKQuyA+gWUi58U25ns1KyYnEegTLodyZ8mUz6gkJV0+7qAk5GcejdZVIEIDPfQpbaYOSE5N4cPWDcVOLXnJA8LIdkn+AIOIwNJixShDxbXB0s4YUZIuuIZfMhXa99CymHgsG8FBHV4+4BmzNFiUek/5UhltHISj8LGhIs4OCryqGIGmxqGDg9ObSJEjWI18F9MNBWws2qGtLImibyhbiWQ0l8cMImLe2tqquTqxTIwqxOJwemnff6VvjQ5L0eO7lCnTLGYCiC4G7AfW+xK99+oDU9/ragrWLxLFrBxFUVsUvf+5qxBf2zwv2hTutCen+Jvlix3EI6O6HpqtSFwClVlicza3f9UfDWLvlvOJ69AvnxGIjj9eP+CyKyfQ8Q2K3UxjVSXu6pC1/c/YUo7FREhdFJp8Sjhy8IbQeCAJuwFGqZd1CMadHRk1TeRHSrJTth+mA9saqRef7f0Gbe3EnCOiUXfuVQ34gRDLKHtv/lVuCvZk3ehe4zF86mq9b5cBDDuvFhtd4hmGub+98/kmykpSw2GV8S1ApLnJvLASo+ZEdHpPXejDzBuqN0T8R9/lseTipwFgdAXyhJ3bccCoivLmFCbPyn32v5AjLKIoehA2pNg0Fve/3bduEiE1sSlozbz6zc6+cmdH4v+F5T2rYXOGoYEUHiYsT/VucSS3WrE/Nc0US6Qa6Atn4M0LPAJgW/bBY7d55XVKHL1eBvpMVHoKEMT6Qg/X2nTApE9UXV5V2a6+xmBT89lDWQrjox4bhhFr6eT5fMN5k/4+28oBNEpyaajDYTmoSezbpjuf5FmM72QqH54nPybYAgJPr7o8Nik/co0v6NWF7HmZ9EnZB67uVPUg5tvju9nw1EhEmdnaFEB9DJ7XkSLFfJ4RifkXhfWKKZAC5nPKnPPJLTuYISCVPShXG/6I0mVP4Q0Z+tXXUV0caUlSNaib3uAH+gjutMAMKf17uyDSGyyYnyj2Mlr5aklr/fXGtmm99NqpCGBNGB7d73IVacg5qBFogHGX+Ri3FH32Ena+iHbJ++xJ0owRtKdeyQpi2YoiHs9JJmRbGxKMK7L4hK0D0s4wU27wGV5ub6IhX+qb0a/1k51pFb1BJwemJeequZjdOmAx5SYANWwYmEZ3d2anG8F1k7Wn5jzDrqvC/ueFWrhue8t2J2SENLHV+IT3hSK7aJTZiDCpFTZwZ6pHVnr9UKg5y9ZiAtQfNRy9a/LPH63/0GaYvROnErfcTKT/klg2lv+UXz3erlzYwVbxSErtURg4EsGVELmtxDig4nJY1+LvG6oq6Xg2c0usyS8sys0BSiHo8HyARsbcsG64oP/DFGLqWPQXQocmWVatBaW/zywISPAcObpzQ64cmTVY5MXuDMNs44T1d5+bUAABPaGSHtwKcN79v26/tMzUfU1bJhRChGW+pBqBCPzGaKq6DpdLLOehfbeceH92qf5IxP9japUFIjpJ1Em7vQfXnSca43hv8bvSvYDUoCzdwvgtR6zmLXnsNWjB3iynrxsJYSSmN/LhBKNtkXVMdJMzp20Hs+ZAVpcooduMTodnsBQ/iIOf+DHobynOmKa+KEbtV6RmN6DUJOvkz/7B9AaQWcNnZubQoGl3C2DMjvMZfXkv8kh67SUHww4WKgoRWDfZ2jwDV2BXNa3hUmdUtXbIii9VosQUAEfmWcLTVUtuSPjgRwIdFFC1u38S6y3MaYg7+y3+jRcZ1AKjveSK99Rmxk6wZxxPev1MnNSOnS7iN6uA8osd+jDJiZCGPB0vk9BU72dIvkZyBBTnrVspA9HhrKKcnzq+HJx+DT42JNOIIrd/dTqDoNb54fwwSwG1RcFWcwJUk96+Ziv24NAwIjB/lU2mtRCseBj+kWamtAGgtFVmnWnBU07TnA3g2eiXNQ+yHuJcLzpcA2jPrqZzSut9u2jBGN+Ph3v2O+LbDRHcaglzFcG5QJP8fGdXBGGi6viw1IdjIfhNUHXH+B4QRCd5nBatb9CWCPMgCe/uIK28JivUn2kIVLkzjAwMsYcmjvYjQwGFgu6XaR2z5xjTGCSQZAtdPthMkDkdcj745U4FuhZUymyhkhZhVE44po0IDO9/KAbCn1yZIoO2tgIpRbarIuij9WiHdizPQ9DptZ17kHPny37fxOvsW5C11lAD69xL4IwSiUrYSldTk/iQOQfAW3/P6F/8p0nlWUkLYdqbhaLPQj6S3dWG2cbO7FNY6ipkJIt1Emx/SQfRmE2gdOzhHyn/RVSMdJ7jTKhPfzgpCOIIZPpL8jXq5iGGJ6DlLRPZJHqH9+ZA9PMlTGU1jHHQR7zH6hPYG80T9NdNz5PnLftY7tWdaVBtRYX9Uw3jTlc1d2oXYdTT6fJJ9MjWSszpxpt+eD7Hm8QNo6HD5CtB3q8rvROtQ1Lnq2H3h6tbXiWyijc0QytOWpk13nX1GJ/LmTvcFhlp58ZrxVo9d0Aa9bsbc2q6b+nSvo34PvzUW2Q6q+n5V3l6WMzoOGk8lyiXcPjQKHt+HgNXhOJJx0cgeWQatbhCvwvoYWGqHh/LJ84hJiQF4Mr6/B/12ObHcxIwQTUaiKuwzuGbHcC0E7CaAnk6tokOvdP70iWz+b4lXs9RqBfwAJTjWBQZm6HTp2f7BLkuQg/Zb++A/kOee2asWAyV3ZQ2X9QJGgxzY4xmQzUe/D+lvocKXpHbtvZH2AQgC7mO9gID/lT+kdd54o/2CjnvOYqQHTjR0v82WloWab92BI0p7ELK6ujb5XBfVKuML87lHmrOO+moXae93Bkd3+g4QXKvvX+lC55IvpwsdCEuyo6y/T6uTVCCNM8K/+hWGOPPAcn4EGoi4xCqG5ZKGFOmUMMmF+memZlh6z/FE0wzhuge/Hw3Kaa/HLCfjgjNV0L86oc1zKY65XGp5Mebolkz9RFHtFIHvU+GdfXKPc3w+jkM0Kfmw1Puwe6AJQUArmAP91vRm4wgAL6xaVBaLeq399g+M2tM2zxjBWuAoVTKqARhbf5kd10S/F+RtBPx6Wcbpb9cN9+lK+lx7LHWOn1Dkq+7FN6hvjgdA3OIeWBFOIcvIvfePQWFCKanV+NxWRWaqvH2/TVsWyxXR1+AjK2nMecvcv5Zk6Nd2MlSaxL8024TujQhqA4ph1haRvYSeHdzYez78D+p6BX1iUUIlPICteuB6A3iUGaiiyz6quSUzu/FdM3hpvJL1pJPiXt8/pukhzES/OK1wpVE7u5iGTSMFIH3AHY1SoEX0xxMI7J5NqQase2nQzlq44suP6ba65LMfMvMr+15m1NIRHqxL3JFQBN2o5T4cM2MiRdYoXR5uTBWMIAlf3MRUKfgKk/8WY86ODdPIdy6tm1GbWay2vR9gD1ySENb/VQhQ9LEtWk27br+8q4ANRuOiDa9ox4Kzdq+FPGTdNk+3ZnaESfKMyflpc5Bb/XjLvoGB6HA8SupxL+COsnv15SxiUY/gH0lqDpFD8KzL9NC3l1yDlvCKp9iNC2GSnQZhjv5LPXSD8VhvsXjzI/sVyHU8AATYqhvyh8zUxHsLDU2w35opXjRkgmUCd4ku13kLSYzFZmrrUjmvXZ2hBrs4I1V6zVPWZ1JmBVEYK0uChnNH0R/M7iTjUPGAhQ2emy1lgoZaL/X674NyEGomlo0eLFEyKsa7C5gEyIxY7Tm7F12eWq5qSUOUvXIdt53nnRyhOWS4JCxu18UABIrcfWhVFvF9kYD8+i05Fa3t4ALQt7fRF+O7+D+z7GK3Pzu+djztuphp1MKH7O1j6IaaFbNIL7mrIYIrck8uJV6BtmNBQKdjcAqGFNIDuf9W3MkG6Q/oaxWJiPxKE6MqRwWXV6QLNqBeQlrGV6wr+FdezbZHskp+Ip2si5BAU+IczmehEJWGEbaClVUMwB1ZmIMLzAxElFeqJWq5eMOVDMeaaNwAHONoVktn/TFjChfPdVUrgAQpUPV3UxzvQMJZZkRpKl3QU9D9/zbe5ZsOV5JtwhwWltfJK/m8fJfF14c2IAcl/KX0FAAD/kYD8+i09rLiYm9BAH2CbgOAJer2YP7PsbQ4BjVzY7YQXMc+/zFOAzJSWh4VAxey9e6MXMj72EKMrwEneh8vpgAGJ4aTEtuN24MNJzAcIVhkLmhc223Fzvv52DrlF7EvUnBdXzZN2H8BTm/WcNW/By48In61LtDUse4yjnrIi4NRp2dIrvtr4bW/F/UrBZoZBRl7UjsnvFHg485CFnZpTw2f1166twivNO+Es1koGTk1pevRs0mF8dnJ/k5P3SF/L77UQq839RswAAAAA=", xn = class xn extends rr {
  constructor(t) {
    super(t), this.signer = null, this.agent = null, this.signerAgent = null, this.transport = null, this.walletName = xn.walletName, this.logo = xn.logo;
    const e = this.config.adapters?.oisy?.config?.signerUrl || "https://oisy.com/sign";
    this.agent = Ye.createSync({ host: this.config.hostUrl }), this.transport = new Wa({
      url: e,
      ...xn.TRANSPORT_CONFIG
    }), this.signer = new Fa({
      transport: this.transport
    }), this.signerAgent = ri.createSync({
      signer: this.signer,
      account: ke.anonymous(),
      agent: this.agent
    });
  }
  async isAvailable() {
    return !0;
  }
  async isConnected() {
    return this.agent !== null && this.signer !== null && this.signerAgent !== null;
  }
  async getPrincipal() {
    if (!this.signerAgent)
      throw new Error("Oisy signer agent not initialized or connected");
    return (await this.signerAgent.getPrincipal()).toText();
  }
  async getAccountId() {
    return Dr.fromPrincipal({
      principal: ke.fromText(await this.getPrincipal()),
      subAccount: void 0
      // This will use the default subaccount
    }).toHex();
  }
  async connect() {
    this.setState(pt.Status.CONNECTING);
    try {
      if (!this.signerAgent || !this.signerAgent.signer)
        throw new Error("Oisy signer agent not initialized. Was the constructor called with config?");
      const t = await this.signerAgent.signer.accounts();
      if (!t || t.length === 0)
        throw this.disconnect(), new Error("No accounts returned from Oisy");
      const e = t[0].owner;
      if (e.isAnonymous())
        throw this.setState(pt.Status.READY), new Error("Failed to authenticate with Oisy - got anonymous principal");
      if (this.signerAgent.replaceAccount(e), this.config.fetchRootKeys) {
        if (!this.signerAgent) throw new Error("Signer agent not ready for fetchRootKeys");
        await this.signerAgent.fetchRootKey();
      }
      return this.setState(pt.Status.CONNECTED), {
        owner: e.toText(),
        subaccount: await this.getAccountId(),
        hasDelegation: !1
      };
    } catch (t) {
      throw console.error("[Oisy] Connection error:", t), await this.disconnect(), t;
    }
  }
  // Use BaseIcAdapter's actor caching by implementing createActorInternal
  createActorInternal(t, e) {
    if (!this.signerAgent)
      throw new Error("No signer agent available. Please connect first.");
    try {
      const n = this.signerAgent;
      return kn.createActor(e, {
        agent: n,
        canisterId: t
      });
    } catch (n) {
      throw console.error("[Oisy] Actor creation error:", n), n;
    }
  }
  async disconnectInternal() {
    if (this.signer)
      try {
        console.debug("[Oisy] Closing signer channel"), this.signer.closeChannel();
      } catch (t) {
        console.debug("[Oisy] Error closing signer channel:", t);
      }
  }
  cleanupInternal() {
    this.signer = null, this.agent = null, this.signerAgent = null, this.transport = null;
  }
};
xn.TRANSPORT_CONFIG = {
  windowOpenerFeatures: "width=525,height=705",
  establishTimeout: 45e3,
  disconnectTimeout: 45e3,
  statusPollingRate: 500,
  detectNonClickEstablishment: !1
}, xn.logo = Yu, xn.walletName = "OISY Wallet";
let xr = xn;
const _r = {
  timeout: 1e3 * 60 * 60 * 24,
  // 1 day
  enabled: !0
}, Gu = {
  oisy: {
    id: "oisy",
    walletName: xr.walletName,
    logo: xr.logo,
    adapter: xr,
    config: {
      ..._r,
      signerUrl: "https://oisy.com/sign"
      // Default Oisy sign URL
    }
  },
  nfid: {
    id: "nfid",
    walletName: Sr.walletName,
    logo: Sr.logo,
    adapter: Sr,
    config: {
      ..._r,
      rpcUrl: "https://nfid.one/rpc"
      // Default NFID RPC endpoint
    }
  },
  ii: {
    id: "ii",
    walletName: Er.walletName,
    logo: Er.logo,
    adapter: Er,
    config: {
      ..._r,
      identityProvider: "https://identity.ic0.app"
    }
  },
  plug: {
    id: "plug",
    walletName: vr.walletName,
    logo: vr.logo,
    adapter: vr,
    config: {
      ..._r,
      identityProvider: "https://identity.ic0.app"
    }
  }
};
var ns = { exports: {} }, Qo;
function Ju() {
  return Qo || (Qo = 1, function(r) {
    var t = Object.prototype.hasOwnProperty, e = "~";
    function n() {
    }
    Object.create && (n.prototype = /* @__PURE__ */ Object.create(null), new n().__proto__ || (e = !1));
    function i(A, E, v) {
      this.fn = A, this.context = E, this.once = v || !1;
    }
    function s(A, E, v, T, P) {
      if (typeof v != "function")
        throw new TypeError("The listener must be a function");
      var O = new i(v, T || A, P), j = e ? e + E : E;
      return A._events[j] ? A._events[j].fn ? A._events[j] = [A._events[j], O] : A._events[j].push(O) : (A._events[j] = O, A._eventsCount++), A;
    }
    function l(A, E) {
      --A._eventsCount === 0 ? A._events = new n() : delete A._events[E];
    }
    function h() {
      this._events = new n(), this._eventsCount = 0;
    }
    h.prototype.eventNames = function() {
      var E = [], v, T;
      if (this._eventsCount === 0) return E;
      for (T in v = this._events)
        t.call(v, T) && E.push(e ? T.slice(1) : T);
      return Object.getOwnPropertySymbols ? E.concat(Object.getOwnPropertySymbols(v)) : E;
    }, h.prototype.listeners = function(E) {
      var v = e ? e + E : E, T = this._events[v];
      if (!T) return [];
      if (T.fn) return [T.fn];
      for (var P = 0, O = T.length, j = new Array(O); P < O; P++)
        j[P] = T[P].fn;
      return j;
    }, h.prototype.listenerCount = function(E) {
      var v = e ? e + E : E, T = this._events[v];
      return T ? T.fn ? 1 : T.length : 0;
    }, h.prototype.emit = function(E, v, T, P, O, j) {
      var D = e ? e + E : E;
      if (!this._events[D]) return !1;
      var N = this._events[D], Z = arguments.length, Q, W;
      if (N.fn) {
        switch (N.once && this.removeListener(E, N.fn, void 0, !0), Z) {
          case 1:
            return N.fn.call(N.context), !0;
          case 2:
            return N.fn.call(N.context, v), !0;
          case 3:
            return N.fn.call(N.context, v, T), !0;
          case 4:
            return N.fn.call(N.context, v, T, P), !0;
          case 5:
            return N.fn.call(N.context, v, T, P, O), !0;
          case 6:
            return N.fn.call(N.context, v, T, P, O, j), !0;
        }
        for (W = 1, Q = new Array(Z - 1); W < Z; W++)
          Q[W - 1] = arguments[W];
        N.fn.apply(N.context, Q);
      } else {
        var V = N.length, K;
        for (W = 0; W < V; W++)
          switch (N[W].once && this.removeListener(E, N[W].fn, void 0, !0), Z) {
            case 1:
              N[W].fn.call(N[W].context);
              break;
            case 2:
              N[W].fn.call(N[W].context, v);
              break;
            case 3:
              N[W].fn.call(N[W].context, v, T);
              break;
            case 4:
              N[W].fn.call(N[W].context, v, T, P);
              break;
            default:
              if (!Q) for (K = 1, Q = new Array(Z - 1); K < Z; K++)
                Q[K - 1] = arguments[K];
              N[W].fn.apply(N[W].context, Q);
          }
      }
      return !0;
    }, h.prototype.on = function(E, v, T) {
      return s(this, E, v, T, !1);
    }, h.prototype.once = function(E, v, T) {
      return s(this, E, v, T, !0);
    }, h.prototype.removeListener = function(E, v, T, P) {
      var O = e ? e + E : E;
      if (!this._events[O]) return this;
      if (!v)
        return l(this, O), this;
      var j = this._events[O];
      if (j.fn)
        j.fn === v && (!P || j.once) && (!T || j.context === T) && l(this, O);
      else {
        for (var D = 0, N = [], Z = j.length; D < Z; D++)
          (j[D].fn !== v || P && !j[D].once || T && j[D].context !== T) && N.push(j[D]);
        N.length ? this._events[O] = N.length === 1 ? N[0] : N : l(this, O);
      }
      return this;
    }, h.prototype.removeAllListeners = function(E) {
      var v;
      return E ? (v = e ? e + E : E, this._events[v] && l(this, v)) : (this._events = new n(), this._eventsCount = 0), this;
    }, h.prototype.off = h.prototype.removeListener, h.prototype.addListener = h.prototype.on, h.prefixed = e, h.EventEmitter = h, r.exports = h;
  }(ns)), ns.exports;
}
var Ku = Ju();
const Vu = /* @__PURE__ */ Rr(Ku);
class Oe extends Error {
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  constructor(t, e) {
    super(t), this.error = e;
  }
}
class Vs extends Oe {
  constructor() {
    super(...arguments), this.name = "WalletNotReadyError";
  }
}
class Xu extends Oe {
  constructor() {
    super(...arguments), this.name = "WalletLoadError";
  }
}
class $u extends Oe {
  constructor() {
    super(...arguments), this.name = "WalletConfigError";
  }
}
class ii extends Oe {
  constructor() {
    super(...arguments), this.name = "WalletConnectionError";
  }
}
class Xs extends Oe {
  constructor() {
    super(...arguments), this.name = "WalletDisconnectedError";
  }
}
class $s extends Oe {
  constructor() {
    super(...arguments), this.name = "WalletDisconnectionError";
  }
}
class Za extends Oe {
  constructor() {
    super(...arguments), this.name = "WalletAccountError";
  }
}
class kr extends Oe {
  constructor() {
    super(...arguments), this.name = "WalletPublicKeyError";
  }
}
class Ce extends Oe {
  constructor() {
    super(...arguments), this.name = "WalletNotConnectedError";
  }
}
class Pn extends Oe {
  constructor() {
    super(...arguments), this.name = "WalletSendTransactionError";
  }
}
class tn extends Oe {
  constructor() {
    super(...arguments), this.name = "WalletSignTransactionError";
  }
}
class to extends Oe {
  constructor() {
    super(...arguments), this.name = "WalletSignMessageError";
  }
}
var Ut;
(function(r) {
  r.Installed = "Installed", r.NotDetected = "NotDetected", r.Loadable = "Loadable", r.Unsupported = "Unsupported";
})(Ut || (Ut = {}));
class tl extends Vu {
  get connected() {
    return !!this.publicKey;
  }
  async autoConnect() {
    await this.connect();
  }
  async prepareTransaction(t, e, n = {}) {
    const i = this.publicKey;
    if (!i)
      throw new Ce();
    return t.feePayer = t.feePayer || i, t.recentBlockhash = t.recentBlockhash || (await e.getLatestBlockhash({
      commitment: n.preflightCommitment,
      minContextSlot: n.minContextSlot
    })).blockhash, t;
  }
}
function eo(r) {
  if (typeof window > "u" || typeof document > "u")
    return;
  const t = [];
  function e() {
    if (r())
      for (const s of t)
        s();
  }
  const n = (
    // TODO: #334 Replace with idle callback strategy.
    setInterval(e, 1e3)
  );
  t.push(() => clearInterval(n)), // Implies that `DOMContentLoaded` has not yet fired.
  document.readyState === "loading" && (document.addEventListener("DOMContentLoaded", e, { once: !0 }), t.push(() => document.removeEventListener("DOMContentLoaded", e))), // If the `complete` state has been reached, we're too late.
  document.readyState !== "complete" && (window.addEventListener("load", e, { once: !0 }), t.push(() => window.removeEventListener("load", e))), e();
}
function ks() {
  if (!navigator)
    return !1;
  const r = navigator.userAgent.toLowerCase(), t = r.includes("iphone") || r.includes("ipad"), e = r.includes("safari");
  return t && e;
}
function si(r) {
  return "version" in r;
}
class el extends tl {
  async sendTransaction(t, e, n = {}) {
    let i = !0;
    try {
      if (si(t)) {
        if (!this.supportedTransactionVersions)
          throw new Pn("Sending versioned transactions isn't supported by this wallet");
        if (!this.supportedTransactionVersions.has(t.version))
          throw new Pn(`Sending transaction version ${t.version} isn't supported by this wallet`);
        try {
          t = await this.signTransaction(t);
          const s = t.serialize();
          return await e.sendRawTransaction(s, n);
        } catch (s) {
          throw s instanceof tn ? (i = !1, s) : new Pn(s?.message, s);
        }
      } else
        try {
          const { signers: s, ...l } = n;
          t = await this.prepareTransaction(t, e, l), s?.length && t.partialSign(...s), t = await this.signTransaction(t);
          const h = t.serialize();
          return await e.sendRawTransaction(h, l);
        } catch (s) {
          throw s instanceof tn ? (i = !1, s) : new Pn(s?.message, s);
        }
    } catch (s) {
      throw i && this.emit("error", s), s;
    }
  }
  async signAllTransactions(t) {
    for (const n of t)
      if (si(n)) {
        if (!this.supportedTransactionVersions)
          throw new tn("Signing versioned transactions isn't supported by this wallet");
        if (!this.supportedTransactionVersions.has(n.version))
          throw new tn(`Signing transaction version ${n.version} isn't supported by this wallet`);
      }
    const e = [];
    for (const n of t)
      e.push(await this.signTransaction(n));
    return e;
  }
}
class no extends el {
}
const nl = "solana:signAndSendTransaction", rl = "solana:signMessage", il = "solana:signTransaction", sl = "standard:connect", ol = "standard:disconnect", al = "standard:events";
var Qn;
(function(r) {
  r.Mainnet = "mainnet-beta", r.Testnet = "testnet", r.Devnet = "devnet";
})(Qn || (Qn = {}));
function _o(r) {
  if (!Number.isSafeInteger(r) || r < 0)
    throw new Error("positive integer expected, got " + r);
}
function cl(r) {
  return r instanceof Uint8Array || ArrayBuffer.isView(r) && r.constructor.name === "Uint8Array";
}
function mi(r, ...t) {
  if (!cl(r))
    throw new Error("Uint8Array expected");
  if (t.length > 0 && !t.includes(r.length))
    throw new Error("Uint8Array expected of length " + t + ", got length=" + r.length);
}
function ul(r) {
  if (typeof r != "function" || typeof r.create != "function")
    throw new Error("Hash should be wrapped by utils.wrapConstructor");
  _o(r.outputLen), _o(r.blockLen);
}
function oi(r, t = !0) {
  if (r.destroyed)
    throw new Error("Hash instance has been destroyed");
  if (t && r.finished)
    throw new Error("Hash#digest() has already been called");
}
function ll(r, t) {
  mi(r);
  const e = t.outputLen;
  if (r.length < e)
    throw new Error("digestInto() expects output buffer of length at least " + e);
}
const Yn = typeof globalThis == "object" && "crypto" in globalThis ? globalThis.crypto : void 0;
/*! noble-hashes - MIT License (c) 2022 Paul Miller (paulmillr.com) */
function rs(r) {
  return new DataView(r.buffer, r.byteOffset, r.byteLength);
}
function Ve(r, t) {
  return r << 32 - t | r >>> t;
}
// @ts-ignore
typeof Uint8Array.from([]).toHex == "function" && Uint8Array.fromHex;
function hl(r) {
  if (typeof r != "string")
    throw new Error("utf8ToBytes expected string, got " + typeof r);
  return new Uint8Array(new TextEncoder().encode(r));
}
function ro(r) {
  return typeof r == "string" && (r = hl(r)), mi(r), r;
}
function fl(...r) {
  let t = 0;
  for (let n = 0; n < r.length; n++) {
    const i = r[n];
    mi(i), t += i.length;
  }
  const e = new Uint8Array(t);
  for (let n = 0, i = 0; n < r.length; n++) {
    const s = r[n];
    e.set(s, i), i += s.length;
  }
  return e;
}
class Ya {
  // Safe version that clones internal state
  clone() {
    return this._cloneInto();
  }
}
function Ga(r) {
  const t = (n) => r().update(ro(n)).digest(), e = r();
  return t.outputLen = e.outputLen, t.blockLen = e.blockLen, t.create = () => r(), t;
}
function Ja(r = 32) {
  if (Yn && typeof Yn.getRandomValues == "function")
    return Yn.getRandomValues(new Uint8Array(r));
  if (Yn && typeof Yn.randomBytes == "function")
    return Uint8Array.from(Yn.randomBytes(r));
  throw new Error("crypto.getRandomValues must be defined");
}
function dl(r, t, e, n) {
  if (typeof r.setBigUint64 == "function")
    return r.setBigUint64(t, e, n);
  const i = BigInt(32), s = BigInt(4294967295), l = Number(e >> i & s), h = Number(e & s), A = n ? 4 : 0, E = n ? 0 : 4;
  r.setUint32(t + A, l, n), r.setUint32(t + E, h, n);
}
function gl(r, t, e) {
  return r & t ^ ~r & e;
}
function Al(r, t, e) {
  return r & t ^ r & e ^ t & e;
}
class Ka extends Ya {
  constructor(t, e, n, i) {
    super(), this.finished = !1, this.length = 0, this.pos = 0, this.destroyed = !1, this.blockLen = t, this.outputLen = e, this.padOffset = n, this.isLE = i, this.buffer = new Uint8Array(t), this.view = rs(this.buffer);
  }
  update(t) {
    oi(this);
    const { view: e, buffer: n, blockLen: i } = this;
    t = ro(t);
    const s = t.length;
    for (let l = 0; l < s; ) {
      const h = Math.min(i - this.pos, s - l);
      if (h === i) {
        const A = rs(t);
        for (; i <= s - l; l += i)
          this.process(A, l);
        continue;
      }
      n.set(t.subarray(l, l + h), this.pos), this.pos += h, l += h, this.pos === i && (this.process(e, 0), this.pos = 0);
    }
    return this.length += t.length, this.roundClean(), this;
  }
  digestInto(t) {
    oi(this), ll(t, this), this.finished = !0;
    const { buffer: e, view: n, blockLen: i, isLE: s } = this;
    let { pos: l } = this;
    e[l++] = 128, this.buffer.subarray(l).fill(0), this.padOffset > i - l && (this.process(n, 0), l = 0);
    for (let T = l; T < i; T++)
      e[T] = 0;
    dl(n, i - 8, BigInt(this.length * 8), s), this.process(n, 0);
    const h = rs(t), A = this.outputLen;
    if (A % 4)
      throw new Error("_sha2: outputLen should be aligned to 32bit");
    const E = A / 4, v = this.get();
    if (E > v.length)
      throw new Error("_sha2: outputLen bigger than state");
    for (let T = 0; T < E; T++)
      h.setUint32(4 * T, v[T], s);
  }
  digest() {
    const { buffer: t, outputLen: e } = this;
    this.digestInto(t);
    const n = t.slice(0, e);
    return this.destroy(), n;
  }
  _cloneInto(t) {
    t || (t = new this.constructor()), t.set(...this.get());
    const { blockLen: e, buffer: n, length: i, finished: s, destroyed: l, pos: h } = this;
    return t.length = i, t.pos = h, t.finished = s, t.destroyed = l, i % e && t.buffer.set(n), t;
  }
}
const pl = /* @__PURE__ */ new Uint32Array([
  1116352408,
  1899447441,
  3049323471,
  3921009573,
  961987163,
  1508970993,
  2453635748,
  2870763221,
  3624381080,
  310598401,
  607225278,
  1426881987,
  1925078388,
  2162078206,
  2614888103,
  3248222580,
  3835390401,
  4022224774,
  264347078,
  604807628,
  770255983,
  1249150122,
  1555081692,
  1996064986,
  2554220882,
  2821834349,
  2952996808,
  3210313671,
  3336571891,
  3584528711,
  113926993,
  338241895,
  666307205,
  773529912,
  1294757372,
  1396182291,
  1695183700,
  1986661051,
  2177026350,
  2456956037,
  2730485921,
  2820302411,
  3259730800,
  3345764771,
  3516065817,
  3600352804,
  4094571909,
  275423344,
  430227734,
  506948616,
  659060556,
  883997877,
  958139571,
  1322822218,
  1537002063,
  1747873779,
  1955562222,
  2024104815,
  2227730452,
  2361852424,
  2428436474,
  2756734187,
  3204031479,
  3329325298
]), mn = /* @__PURE__ */ new Uint32Array([
  1779033703,
  3144134277,
  1013904242,
  2773480762,
  1359893119,
  2600822924,
  528734635,
  1541459225
]), bn = /* @__PURE__ */ new Uint32Array(64);
class wl extends Ka {
  constructor(t = 32) {
    super(64, t, 8, !1), this.A = mn[0] | 0, this.B = mn[1] | 0, this.C = mn[2] | 0, this.D = mn[3] | 0, this.E = mn[4] | 0, this.F = mn[5] | 0, this.G = mn[6] | 0, this.H = mn[7] | 0;
  }
  get() {
    const { A: t, B: e, C: n, D: i, E: s, F: l, G: h, H: A } = this;
    return [t, e, n, i, s, l, h, A];
  }
  // prettier-ignore
  set(t, e, n, i, s, l, h, A) {
    this.A = t | 0, this.B = e | 0, this.C = n | 0, this.D = i | 0, this.E = s | 0, this.F = l | 0, this.G = h | 0, this.H = A | 0;
  }
  process(t, e) {
    for (let T = 0; T < 16; T++, e += 4)
      bn[T] = t.getUint32(e, !1);
    for (let T = 16; T < 64; T++) {
      const P = bn[T - 15], O = bn[T - 2], j = Ve(P, 7) ^ Ve(P, 18) ^ P >>> 3, D = Ve(O, 17) ^ Ve(O, 19) ^ O >>> 10;
      bn[T] = D + bn[T - 7] + j + bn[T - 16] | 0;
    }
    let { A: n, B: i, C: s, D: l, E: h, F: A, G: E, H: v } = this;
    for (let T = 0; T < 64; T++) {
      const P = Ve(h, 6) ^ Ve(h, 11) ^ Ve(h, 25), O = v + P + gl(h, A, E) + pl[T] + bn[T] | 0, D = (Ve(n, 2) ^ Ve(n, 13) ^ Ve(n, 22)) + Al(n, i, s) | 0;
      v = E, E = A, A = h, h = l + O | 0, l = s, s = i, i = n, n = O + D | 0;
    }
    n = n + this.A | 0, i = i + this.B | 0, s = s + this.C | 0, l = l + this.D | 0, h = h + this.E | 0, A = A + this.F | 0, E = E + this.G | 0, v = v + this.H | 0, this.set(n, i, s, l, h, A, E, v);
  }
  roundClean() {
    bn.fill(0);
  }
  destroy() {
    this.set(0, 0, 0, 0, 0, 0, 0, 0), this.buffer.fill(0);
  }
}
const Ns = /* @__PURE__ */ Ga(() => new wl()), Wr = /* @__PURE__ */ BigInt(2 ** 32 - 1), Ts = /* @__PURE__ */ BigInt(32);
function Va(r, t = !1) {
  return t ? { h: Number(r & Wr), l: Number(r >> Ts & Wr) } : { h: Number(r >> Ts & Wr) | 0, l: Number(r & Wr) | 0 };
}
function yl(r, t = !1) {
  let e = new Uint32Array(r.length), n = new Uint32Array(r.length);
  for (let i = 0; i < r.length; i++) {
    const { h: s, l } = Va(r[i], t);
    [e[i], n[i]] = [s, l];
  }
  return [e, n];
}
const ml = (r, t) => BigInt(r >>> 0) << Ts | BigInt(t >>> 0), bl = (r, t, e) => r >>> e, El = (r, t, e) => r << 32 - e | t >>> e, vl = (r, t, e) => r >>> e | t << 32 - e, Il = (r, t, e) => r << 32 - e | t >>> e, Ml = (r, t, e) => r << 64 - e | t >>> e - 32, Sl = (r, t, e) => r >>> e - 32 | t << 64 - e, xl = (r, t) => t, Bl = (r, t) => r, Cl = (r, t, e) => r << e | t >>> 32 - e, kl = (r, t, e) => t << e | r >>> 32 - e, Nl = (r, t, e) => t << e - 32 | r >>> 64 - e, Tl = (r, t, e) => r << e - 32 | t >>> 64 - e;
function Ll(r, t, e, n) {
  const i = (t >>> 0) + (n >>> 0);
  return { h: r + e + (i / 2 ** 32 | 0) | 0, l: i | 0 };
}
const Rl = (r, t, e) => (r >>> 0) + (t >>> 0) + (e >>> 0), Dl = (r, t, e, n) => t + e + n + (r / 2 ** 32 | 0) | 0, Ol = (r, t, e, n) => (r >>> 0) + (t >>> 0) + (e >>> 0) + (n >>> 0), Ul = (r, t, e, n, i) => t + e + n + i + (r / 2 ** 32 | 0) | 0, jl = (r, t, e, n, i) => (r >>> 0) + (t >>> 0) + (e >>> 0) + (n >>> 0) + (i >>> 0), zl = (r, t, e, n, i, s) => t + e + n + i + s + (r / 2 ** 32 | 0) | 0, It = {
  fromBig: Va,
  split: yl,
  toBig: ml,
  shrSH: bl,
  shrSL: El,
  rotrSH: vl,
  rotrSL: Il,
  rotrBH: Ml,
  rotrBL: Sl,
  rotr32H: xl,
  rotr32L: Bl,
  rotlSH: Cl,
  rotlSL: kl,
  rotlBH: Nl,
  rotlBL: Tl,
  add: Ll,
  add3L: Rl,
  add3H: Dl,
  add4L: Ol,
  add4H: Ul,
  add5H: zl,
  add5L: jl
}, [Pl, Fl] = It.split([
  "0x428a2f98d728ae22",
  "0x7137449123ef65cd",
  "0xb5c0fbcfec4d3b2f",
  "0xe9b5dba58189dbbc",
  "0x3956c25bf348b538",
  "0x59f111f1b605d019",
  "0x923f82a4af194f9b",
  "0xab1c5ed5da6d8118",
  "0xd807aa98a3030242",
  "0x12835b0145706fbe",
  "0x243185be4ee4b28c",
  "0x550c7dc3d5ffb4e2",
  "0x72be5d74f27b896f",
  "0x80deb1fe3b1696b1",
  "0x9bdc06a725c71235",
  "0xc19bf174cf692694",
  "0xe49b69c19ef14ad2",
  "0xefbe4786384f25e3",
  "0x0fc19dc68b8cd5b5",
  "0x240ca1cc77ac9c65",
  "0x2de92c6f592b0275",
  "0x4a7484aa6ea6e483",
  "0x5cb0a9dcbd41fbd4",
  "0x76f988da831153b5",
  "0x983e5152ee66dfab",
  "0xa831c66d2db43210",
  "0xb00327c898fb213f",
  "0xbf597fc7beef0ee4",
  "0xc6e00bf33da88fc2",
  "0xd5a79147930aa725",
  "0x06ca6351e003826f",
  "0x142929670a0e6e70",
  "0x27b70a8546d22ffc",
  "0x2e1b21385c26c926",
  "0x4d2c6dfc5ac42aed",
  "0x53380d139d95b3df",
  "0x650a73548baf63de",
  "0x766a0abb3c77b2a8",
  "0x81c2c92e47edaee6",
  "0x92722c851482353b",
  "0xa2bfe8a14cf10364",
  "0xa81a664bbc423001",
  "0xc24b8b70d0f89791",
  "0xc76c51a30654be30",
  "0xd192e819d6ef5218",
  "0xd69906245565a910",
  "0xf40e35855771202a",
  "0x106aa07032bbd1b8",
  "0x19a4c116b8d2d0c8",
  "0x1e376c085141ab53",
  "0x2748774cdf8eeb99",
  "0x34b0bcb5e19b48a8",
  "0x391c0cb3c5c95a63",
  "0x4ed8aa4ae3418acb",
  "0x5b9cca4f7763e373",
  "0x682e6ff3d6b2b8a3",
  "0x748f82ee5defb2fc",
  "0x78a5636f43172f60",
  "0x84c87814a1f0ab72",
  "0x8cc702081a6439ec",
  "0x90befffa23631e28",
  "0xa4506cebde82bde9",
  "0xbef9a3f7b2c67915",
  "0xc67178f2e372532b",
  "0xca273eceea26619c",
  "0xd186b8c721c0c207",
  "0xeada7dd6cde0eb1e",
  "0xf57d4f7fee6ed178",
  "0x06f067aa72176fba",
  "0x0a637dc5a2c898a6",
  "0x113f9804bef90dae",
  "0x1b710b35131c471b",
  "0x28db77f523047d84",
  "0x32caab7b40c72493",
  "0x3c9ebe0a15c9bebc",
  "0x431d67c49c100d4c",
  "0x4cc5d4becb3e42b6",
  "0x597f299cfc657e2a",
  "0x5fcb6fab3ad6faec",
  "0x6c44198c4a475817"
].map((r) => BigInt(r))), En = /* @__PURE__ */ new Uint32Array(80), vn = /* @__PURE__ */ new Uint32Array(80);
class Ql extends Ka {
  constructor(t = 64) {
    super(128, t, 16, !1), this.Ah = 1779033703, this.Al = -205731576, this.Bh = -1150833019, this.Bl = -2067093701, this.Ch = 1013904242, this.Cl = -23791573, this.Dh = -1521486534, this.Dl = 1595750129, this.Eh = 1359893119, this.El = -1377402159, this.Fh = -1694144372, this.Fl = 725511199, this.Gh = 528734635, this.Gl = -79577749, this.Hh = 1541459225, this.Hl = 327033209;
  }
  // prettier-ignore
  get() {
    const { Ah: t, Al: e, Bh: n, Bl: i, Ch: s, Cl: l, Dh: h, Dl: A, Eh: E, El: v, Fh: T, Fl: P, Gh: O, Gl: j, Hh: D, Hl: N } = this;
    return [t, e, n, i, s, l, h, A, E, v, T, P, O, j, D, N];
  }
  // prettier-ignore
  set(t, e, n, i, s, l, h, A, E, v, T, P, O, j, D, N) {
    this.Ah = t | 0, this.Al = e | 0, this.Bh = n | 0, this.Bl = i | 0, this.Ch = s | 0, this.Cl = l | 0, this.Dh = h | 0, this.Dl = A | 0, this.Eh = E | 0, this.El = v | 0, this.Fh = T | 0, this.Fl = P | 0, this.Gh = O | 0, this.Gl = j | 0, this.Hh = D | 0, this.Hl = N | 0;
  }
  process(t, e) {
    for (let W = 0; W < 16; W++, e += 4)
      En[W] = t.getUint32(e), vn[W] = t.getUint32(e += 4);
    for (let W = 16; W < 80; W++) {
      const V = En[W - 15] | 0, K = vn[W - 15] | 0, X = It.rotrSH(V, K, 1) ^ It.rotrSH(V, K, 8) ^ It.shrSH(V, K, 7), nt = It.rotrSL(V, K, 1) ^ It.rotrSL(V, K, 8) ^ It.shrSL(V, K, 7), C = En[W - 2] | 0, M = vn[W - 2] | 0, x = It.rotrSH(C, M, 19) ^ It.rotrBH(C, M, 61) ^ It.shrSH(C, M, 6), U = It.rotrSL(C, M, 19) ^ It.rotrBL(C, M, 61) ^ It.shrSL(C, M, 6), R = It.add4L(nt, U, vn[W - 7], vn[W - 16]), b = It.add4H(R, X, x, En[W - 7], En[W - 16]);
      En[W] = b | 0, vn[W] = R | 0;
    }
    let { Ah: n, Al: i, Bh: s, Bl: l, Ch: h, Cl: A, Dh: E, Dl: v, Eh: T, El: P, Fh: O, Fl: j, Gh: D, Gl: N, Hh: Z, Hl: Q } = this;
    for (let W = 0; W < 80; W++) {
      const V = It.rotrSH(T, P, 14) ^ It.rotrSH(T, P, 18) ^ It.rotrBH(T, P, 41), K = It.rotrSL(T, P, 14) ^ It.rotrSL(T, P, 18) ^ It.rotrBL(T, P, 41), X = T & O ^ ~T & D, nt = P & j ^ ~P & N, C = It.add5L(Q, K, nt, Fl[W], vn[W]), M = It.add5H(C, Z, V, X, Pl[W], En[W]), x = C | 0, U = It.rotrSH(n, i, 28) ^ It.rotrBH(n, i, 34) ^ It.rotrBH(n, i, 39), R = It.rotrSL(n, i, 28) ^ It.rotrBL(n, i, 34) ^ It.rotrBL(n, i, 39), b = n & s ^ n & h ^ s & h, u = i & l ^ i & A ^ l & A;
      Z = D | 0, Q = N | 0, D = O | 0, N = j | 0, O = T | 0, j = P | 0, { h: T, l: P } = It.add(E | 0, v | 0, M | 0, x | 0), E = h | 0, v = A | 0, h = s | 0, A = l | 0, s = n | 0, l = i | 0;
      const d = It.add3L(x, R, u);
      n = It.add3H(d, M, U, b), i = d | 0;
    }
    ({ h: n, l: i } = It.add(this.Ah | 0, this.Al | 0, n | 0, i | 0)), { h: s, l } = It.add(this.Bh | 0, this.Bl | 0, s | 0, l | 0), { h, l: A } = It.add(this.Ch | 0, this.Cl | 0, h | 0, A | 0), { h: E, l: v } = It.add(this.Dh | 0, this.Dl | 0, E | 0, v | 0), { h: T, l: P } = It.add(this.Eh | 0, this.El | 0, T | 0, P | 0), { h: O, l: j } = It.add(this.Fh | 0, this.Fl | 0, O | 0, j | 0), { h: D, l: N } = It.add(this.Gh | 0, this.Gl | 0, D | 0, N | 0), { h: Z, l: Q } = It.add(this.Hh | 0, this.Hl | 0, Z | 0, Q | 0), this.set(n, i, s, l, h, A, E, v, T, P, O, j, D, N, Z, Q);
  }
  roundClean() {
    En.fill(0), vn.fill(0);
  }
  destroy() {
    this.buffer.fill(0), this.set(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
  }
}
const _l = /* @__PURE__ */ Ga(() => new Ql());
/*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */
const io = /* @__PURE__ */ BigInt(0), Ls = /* @__PURE__ */ BigInt(1);
function ir(r) {
  return r instanceof Uint8Array || ArrayBuffer.isView(r) && r.constructor.name === "Uint8Array";
}
function so(r) {
  if (!ir(r))
    throw new Error("Uint8Array expected");
}
function Nn(r, t) {
  if (typeof t != "boolean")
    throw new Error(r + " boolean expected, got " + t);
}
function qr(r) {
  const t = r.toString(16);
  return t.length & 1 ? "0" + t : t;
}
function Xa(r) {
  if (typeof r != "string")
    throw new Error("hex string expected, got " + typeof r);
  return r === "" ? io : BigInt("0x" + r);
}
const $a = (
  // @ts-ignore
  typeof Uint8Array.from([]).toHex == "function" && typeof Uint8Array.fromHex == "function"
), Wl = /* @__PURE__ */ Array.from({ length: 256 }, (r, t) => t.toString(16).padStart(2, "0"));
function sr(r) {
  if (so(r), $a)
    return r.toHex();
  let t = "";
  for (let e = 0; e < r.length; e++)
    t += Wl[r[e]];
  return t;
}
const on = { _0: 48, _9: 57, A: 65, F: 70, a: 97, f: 102 };
function Wo(r) {
  if (r >= on._0 && r <= on._9)
    return r - on._0;
  if (r >= on.A && r <= on.F)
    return r - (on.A - 10);
  if (r >= on.a && r <= on.f)
    return r - (on.a - 10);
}
function ai(r) {
  if (typeof r != "string")
    throw new Error("hex string expected, got " + typeof r);
  if ($a)
    return Uint8Array.fromHex(r);
  const t = r.length, e = t / 2;
  if (t % 2)
    throw new Error("hex string expected, got unpadded hex of length " + t);
  const n = new Uint8Array(e);
  for (let i = 0, s = 0; i < e; i++, s += 2) {
    const l = Wo(r.charCodeAt(s)), h = Wo(r.charCodeAt(s + 1));
    if (l === void 0 || h === void 0) {
      const A = r[s] + r[s + 1];
      throw new Error('hex string expected, got non-hex character "' + A + '" at index ' + s);
    }
    n[i] = l * 16 + h;
  }
  return n;
}
function _n(r) {
  return Xa(sr(r));
}
function Br(r) {
  return so(r), Xa(sr(Uint8Array.from(r).reverse()));
}
function Nr(r, t) {
  return ai(r.toString(16).padStart(t * 2, "0"));
}
function ci(r, t) {
  return Nr(r, t).reverse();
}
function ge(r, t, e) {
  let n;
  if (typeof t == "string")
    try {
      n = ai(t);
    } catch (s) {
      throw new Error(r + " must be hex string or Uint8Array, cause: " + s);
    }
  else if (ir(t))
    n = Uint8Array.from(t);
  else
    throw new Error(r + " must be hex string or Uint8Array");
  const i = n.length;
  if (typeof e == "number" && i !== e)
    throw new Error(r + " of length " + e + " expected, got " + i);
  return n;
}
function or(...r) {
  let t = 0;
  for (let n = 0; n < r.length; n++) {
    const i = r[n];
    so(i), t += i.length;
  }
  const e = new Uint8Array(t);
  for (let n = 0, i = 0; n < r.length; n++) {
    const s = r[n];
    e.set(s, i), i += s.length;
  }
  return e;
}
const is = (r) => typeof r == "bigint" && io <= r;
function oo(r, t, e) {
  return is(r) && is(t) && is(e) && t <= r && r < e;
}
function Ze(r, t, e, n) {
  if (!oo(t, e, n))
    throw new Error("expected valid " + r + ": " + e + " <= n < " + n + ", got " + t);
}
function ql(r) {
  let t;
  for (t = 0; r > io; r >>= Ls, t += 1)
    ;
  return t;
}
const bi = (r) => (Ls << BigInt(r)) - Ls, ss = (r) => new Uint8Array(r), qo = (r) => Uint8Array.from(r);
function Hl(r, t, e) {
  if (typeof r != "number" || r < 2)
    throw new Error("hashLen must be a number");
  if (typeof t != "number" || t < 2)
    throw new Error("qByteLen must be a number");
  if (typeof e != "function")
    throw new Error("hmacFn must be a function");
  let n = ss(r), i = ss(r), s = 0;
  const l = () => {
    n.fill(1), i.fill(0), s = 0;
  }, h = (...T) => e(i, n, ...T), A = (T = ss(0)) => {
    i = h(qo([0]), T), n = h(), T.length !== 0 && (i = h(qo([1]), T), n = h());
  }, E = () => {
    if (s++ >= 1e3)
      throw new Error("drbg: tried 1000 values");
    let T = 0;
    const P = [];
    for (; T < t; ) {
      n = h();
      const O = n.slice();
      P.push(O), T += n.length;
    }
    return or(...P);
  };
  return (T, P) => {
    l(), A(T);
    let O;
    for (; !(O = P(E())); )
      A();
    return l(), O;
  };
}
const Zl = {
  bigint: (r) => typeof r == "bigint",
  function: (r) => typeof r == "function",
  boolean: (r) => typeof r == "boolean",
  string: (r) => typeof r == "string",
  stringOrUint8Array: (r) => typeof r == "string" || ir(r),
  isSafeInteger: (r) => Number.isSafeInteger(r),
  array: (r) => Array.isArray(r),
  field: (r, t) => t.Fp.isValid(r),
  hash: (r) => typeof r == "function" && Number.isSafeInteger(r.outputLen)
};
function Or(r, t, e = {}) {
  const n = (i, s, l) => {
    const h = Zl[s];
    if (typeof h != "function")
      throw new Error("invalid validator function");
    const A = r[i];
    if (!(l && A === void 0) && !h(A, r))
      throw new Error("param " + String(i) + " is invalid. Expected " + s + ", got " + A);
  };
  for (const [i, s] of Object.entries(t))
    n(i, s, !1);
  for (const [i, s] of Object.entries(e))
    n(i, s, !0);
  return r;
}
function ui(r) {
  const t = /* @__PURE__ */ new WeakMap();
  return (e, ...n) => {
    const i = t.get(e);
    if (i !== void 0)
      return i;
    const s = r(e, ...n);
    return t.set(e, s), s;
  };
}
/*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */
const we = BigInt(0), qt = BigInt(1), jn = /* @__PURE__ */ BigInt(2), Yl = /* @__PURE__ */ BigInt(3), Rs = /* @__PURE__ */ BigInt(4), Ho = /* @__PURE__ */ BigInt(5), Zo = /* @__PURE__ */ BigInt(8);
function Qt(r, t) {
  const e = r % t;
  return e >= we ? e : t + e;
}
function Gl(r, t, e) {
  if (t < we)
    throw new Error("invalid exponent, negatives unsupported");
  if (e <= we)
    throw new Error("invalid modulus");
  if (e === qt)
    return we;
  let n = qt;
  for (; t > we; )
    t & qt && (n = n * r % e), r = r * r % e, t >>= qt;
  return n;
}
function Zt(r, t, e) {
  let n = r;
  for (; t-- > we; )
    n *= n, n %= e;
  return n;
}
function Ds(r, t) {
  if (r === we)
    throw new Error("invert: expected non-zero number");
  if (t <= we)
    throw new Error("invert: expected positive modulus, got " + t);
  let e = Qt(r, t), n = t, i = we, s = qt;
  for (; e !== we; ) {
    const h = n / e, A = n % e, E = i - s * h;
    n = e, e = A, i = s, s = E;
  }
  if (n !== qt)
    throw new Error("invert: does not exist");
  return Qt(i, t);
}
function Jl(r) {
  const t = (r - qt) / jn;
  let e, n, i;
  for (e = r - qt, n = 0; e % jn === we; e /= jn, n++)
    ;
  for (i = jn; i < r && Gl(i, t, r) !== r - qt; i++)
    if (i > 1e3)
      throw new Error("Cannot find square root: likely non-prime P");
  if (n === 1) {
    const l = (r + qt) / Rs;
    return function(A, E) {
      const v = A.pow(E, l);
      if (!A.eql(A.sqr(v), E))
        throw new Error("Cannot find square root");
      return v;
    };
  }
  const s = (e + qt) / jn;
  return function(h, A) {
    if (h.pow(A, t) === h.neg(h.ONE))
      throw new Error("Cannot find square root");
    let E = n, v = h.pow(h.mul(h.ONE, i), e), T = h.pow(A, s), P = h.pow(A, e);
    for (; !h.eql(P, h.ONE); ) {
      if (h.eql(P, h.ZERO))
        return h.ZERO;
      let O = 1;
      for (let D = h.sqr(P); O < E && !h.eql(D, h.ONE); O++)
        D = h.sqr(D);
      const j = h.pow(v, qt << BigInt(E - O - 1));
      v = h.sqr(j), T = h.mul(T, j), P = h.mul(P, v), E = O;
    }
    return T;
  };
}
function Kl(r) {
  if (r % Rs === Yl) {
    const t = (r + qt) / Rs;
    return function(n, i) {
      const s = n.pow(i, t);
      if (!n.eql(n.sqr(s), i))
        throw new Error("Cannot find square root");
      return s;
    };
  }
  if (r % Zo === Ho) {
    const t = (r - Ho) / Zo;
    return function(n, i) {
      const s = n.mul(i, jn), l = n.pow(s, t), h = n.mul(i, l), A = n.mul(n.mul(h, jn), l), E = n.mul(h, n.sub(A, n.ONE));
      if (!n.eql(n.sqr(E), i))
        throw new Error("Cannot find square root");
      return E;
    };
  }
  return Jl(r);
}
const Vl = (r, t) => (Qt(r, t) & qt) === qt, Xl = [
  "create",
  "isValid",
  "is0",
  "neg",
  "inv",
  "sqrt",
  "sqr",
  "eql",
  "add",
  "sub",
  "mul",
  "pow",
  "div",
  "addN",
  "subN",
  "mulN",
  "sqrN"
];
function $l(r) {
  const t = {
    ORDER: "bigint",
    MASK: "bigint",
    BYTES: "isSafeInteger",
    BITS: "isSafeInteger"
  }, e = Xl.reduce((n, i) => (n[i] = "function", n), t);
  return Or(r, e);
}
function th(r, t, e) {
  if (e < we)
    throw new Error("invalid exponent, negatives unsupported");
  if (e === we)
    return r.ONE;
  if (e === qt)
    return t;
  let n = r.ONE, i = t;
  for (; e > we; )
    e & qt && (n = r.mul(n, i)), i = r.sqr(i), e >>= qt;
  return n;
}
function eh(r, t) {
  const e = new Array(t.length), n = t.reduce((s, l, h) => r.is0(l) ? s : (e[h] = s, r.mul(s, l)), r.ONE), i = r.inv(n);
  return t.reduceRight((s, l, h) => r.is0(l) ? s : (e[h] = r.mul(s, e[h]), r.mul(s, l)), i), e;
}
function tc(r, t) {
  const e = t !== void 0 ? t : r.toString(2).length, n = Math.ceil(e / 8);
  return { nBitLength: e, nByteLength: n };
}
function Ei(r, t, e = !1, n = {}) {
  if (r <= we)
    throw new Error("invalid field: expected ORDER > 0, got " + r);
  const { nBitLength: i, nByteLength: s } = tc(r, t);
  if (s > 2048)
    throw new Error("invalid field: expected ORDER of <= 2048 bytes");
  let l;
  const h = Object.freeze({
    ORDER: r,
    isLE: e,
    BITS: i,
    BYTES: s,
    MASK: bi(i),
    ZERO: we,
    ONE: qt,
    create: (A) => Qt(A, r),
    isValid: (A) => {
      if (typeof A != "bigint")
        throw new Error("invalid field element: expected bigint, got " + typeof A);
      return we <= A && A < r;
    },
    is0: (A) => A === we,
    isOdd: (A) => (A & qt) === qt,
    neg: (A) => Qt(-A, r),
    eql: (A, E) => A === E,
    sqr: (A) => Qt(A * A, r),
    add: (A, E) => Qt(A + E, r),
    sub: (A, E) => Qt(A - E, r),
    mul: (A, E) => Qt(A * E, r),
    pow: (A, E) => th(h, A, E),
    div: (A, E) => Qt(A * Ds(E, r), r),
    // Same as above, but doesn't normalize
    sqrN: (A) => A * A,
    addN: (A, E) => A + E,
    subN: (A, E) => A - E,
    mulN: (A, E) => A * E,
    inv: (A) => Ds(A, r),
    sqrt: n.sqrt || ((A) => (l || (l = Kl(r)), l(h, A))),
    invertBatch: (A) => eh(h, A),
    // TODO: do we really need constant cmov?
    // We don't have const-time bigints anyway, so probably will be not very useful
    cmov: (A, E, v) => v ? E : A,
    toBytes: (A) => e ? ci(A, s) : Nr(A, s),
    fromBytes: (A) => {
      if (A.length !== s)
        throw new Error("Field.fromBytes: expected " + s + " bytes, got " + A.length);
      return e ? Br(A) : _n(A);
    }
  });
  return Object.freeze(h);
}
function ec(r) {
  if (typeof r != "bigint")
    throw new Error("field order must be bigint");
  const t = r.toString(2).length;
  return Math.ceil(t / 8);
}
function nc(r) {
  const t = ec(r);
  return t + Math.ceil(t / 2);
}
function nh(r, t, e = !1) {
  const n = r.length, i = ec(t), s = nc(t);
  if (n < 16 || n < s || n > 1024)
    throw new Error("expected " + s + "-1024 bytes of input, got " + n);
  const l = e ? Br(r) : _n(r), h = Qt(l, t - qt) + qt;
  return e ? ci(h, i) : Nr(h, i);
}
/*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */
const Yo = BigInt(0), Os = BigInt(1);
function os(r, t) {
  const e = t.negate();
  return r ? e : t;
}
function rc(r, t) {
  if (!Number.isSafeInteger(r) || r <= 0 || r > t)
    throw new Error("invalid window size, expected [1.." + t + "], got W=" + r);
}
function as(r, t) {
  rc(r, t);
  const e = Math.ceil(t / r) + 1, n = 2 ** (r - 1), i = 2 ** r, s = bi(r), l = BigInt(r);
  return { windows: e, windowSize: n, mask: s, maxNumber: i, shiftBy: l };
}
function Go(r, t, e) {
  const { windowSize: n, mask: i, maxNumber: s, shiftBy: l } = e;
  let h = Number(r & i), A = r >> l;
  h > n && (h -= s, A += Os);
  const E = t * n, v = E + Math.abs(h) - 1, T = h === 0, P = h < 0, O = t % 2 !== 0;
  return { nextN: A, offset: v, isZero: T, isNeg: P, isNegF: O, offsetF: E };
}
function rh(r, t) {
  if (!Array.isArray(r))
    throw new Error("array expected");
  r.forEach((e, n) => {
    if (!(e instanceof t))
      throw new Error("invalid point at index " + n);
  });
}
function ih(r, t) {
  if (!Array.isArray(r))
    throw new Error("array of scalars expected");
  r.forEach((e, n) => {
    if (!t.isValid(e))
      throw new Error("invalid scalar at index " + n);
  });
}
const cs = /* @__PURE__ */ new WeakMap(), ic = /* @__PURE__ */ new WeakMap();
function us(r) {
  return ic.get(r) || 1;
}
function sc(r, t) {
  return {
    constTimeNegate: os,
    hasPrecomputes(e) {
      return us(e) !== 1;
    },
    // non-const time multiplication ladder
    unsafeLadder(e, n, i = r.ZERO) {
      let s = e;
      for (; n > Yo; )
        n & Os && (i = i.add(s)), s = s.double(), n >>= Os;
      return i;
    },
    /**
     * Creates a wNAF precomputation window. Used for caching.
     * Default window size is set by `utils.precompute()` and is equal to 8.
     * Number of precomputed points depends on the curve size:
     * 2^(𝑊−1) * (Math.ceil(𝑛 / 𝑊) + 1), where:
     * - 𝑊 is the window size
     * - 𝑛 is the bitlength of the curve order.
     * For a 256-bit curve and window size 8, the number of precomputed points is 128 * 33 = 4224.
     * @param elm Point instance
     * @param W window size
     * @returns precomputed point tables flattened to a single array
     */
    precomputeWindow(e, n) {
      const { windows: i, windowSize: s } = as(n, t), l = [];
      let h = e, A = h;
      for (let E = 0; E < i; E++) {
        A = h, l.push(A);
        for (let v = 1; v < s; v++)
          A = A.add(h), l.push(A);
        h = A.double();
      }
      return l;
    },
    /**
     * Implements ec multiplication using precomputed tables and w-ary non-adjacent form.
     * @param W window size
     * @param precomputes precomputed tables
     * @param n scalar (we don't check here, but should be less than curve order)
     * @returns real and fake (for const-time) points
     */
    wNAF(e, n, i) {
      let s = r.ZERO, l = r.BASE;
      const h = as(e, t);
      for (let A = 0; A < h.windows; A++) {
        const { nextN: E, offset: v, isZero: T, isNeg: P, isNegF: O, offsetF: j } = Go(i, A, h);
        i = E, T ? l = l.add(os(O, n[j])) : s = s.add(os(P, n[v]));
      }
      return { p: s, f: l };
    },
    /**
     * Implements ec unsafe (non const-time) multiplication using precomputed tables and w-ary non-adjacent form.
     * @param W window size
     * @param precomputes precomputed tables
     * @param n scalar (we don't check here, but should be less than curve order)
     * @param acc accumulator point to add result of multiplication
     * @returns point
     */
    wNAFUnsafe(e, n, i, s = r.ZERO) {
      const l = as(e, t);
      for (let h = 0; h < l.windows && i !== Yo; h++) {
        const { nextN: A, offset: E, isZero: v, isNeg: T } = Go(i, h, l);
        if (i = A, !v) {
          const P = n[E];
          s = s.add(T ? P.negate() : P);
        }
      }
      return s;
    },
    getPrecomputes(e, n, i) {
      let s = cs.get(n);
      return s || (s = this.precomputeWindow(n, e), e !== 1 && cs.set(n, i(s))), s;
    },
    wNAFCached(e, n, i) {
      const s = us(e);
      return this.wNAF(s, this.getPrecomputes(s, e, i), n);
    },
    wNAFCachedUnsafe(e, n, i, s) {
      const l = us(e);
      return l === 1 ? this.unsafeLadder(e, n, s) : this.wNAFUnsafe(l, this.getPrecomputes(l, e, i), n, s);
    },
    // We calculate precomputes for elliptic curve point multiplication
    // using windowed method. This specifies window size and
    // stores precomputed values. Usually only base point would be precomputed.
    setWindowSize(e, n) {
      rc(n, t), ic.set(e, n), cs.delete(e);
    }
  };
}
function oc(r, t, e, n) {
  if (rh(e, r), ih(n, t), e.length !== n.length)
    throw new Error("arrays of points and scalars must have equal length");
  const i = r.ZERO, s = ql(BigInt(e.length)), l = s > 12 ? s - 3 : s > 4 ? s - 2 : s ? 2 : 1, h = bi(l), A = new Array(Number(h) + 1).fill(i), E = Math.floor((t.BITS - 1) / l) * l;
  let v = i;
  for (let T = E; T >= 0; T -= l) {
    A.fill(i);
    for (let O = 0; O < n.length; O++) {
      const j = n[O], D = Number(j >> BigInt(T) & h);
      A[D] = A[D].add(e[O]);
    }
    let P = i;
    for (let O = A.length - 1, j = i; O > 0; O--)
      j = j.add(A[O]), P = P.add(j);
    if (v = v.add(P), T !== 0)
      for (let O = 0; O < l; O++)
        v = v.double();
  }
  return v;
}
function ao(r) {
  return $l(r.Fp), Or(r, {
    n: "bigint",
    h: "bigint",
    Gx: "field",
    Gy: "field"
  }, {
    nBitLength: "isSafeInteger",
    nByteLength: "isSafeInteger"
  }), Object.freeze({
    ...tc(r.n, r.nBitLength),
    ...r,
    p: r.Fp.ORDER
  });
}
/*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */
const Xe = BigInt(0), Ne = BigInt(1), Jo = BigInt(2), sh = BigInt(8), oh = { zip215: !0 };
function ah(r) {
  const t = ao(r);
  return Or(r, {
    hash: "function",
    a: "bigint",
    d: "bigint",
    randomBytes: "function"
  }, {
    adjustScalarBytes: "function",
    domain: "function",
    uvRatio: "function",
    mapToCurve: "function"
  }), Object.freeze({ ...t });
}
function ch(r) {
  const t = ah(r), { Fp: e, n, prehash: i, hash: s, randomBytes: l, nByteLength: h, h: A } = t, E = Jo << BigInt(h * 8) - Ne, v = e.create, T = Ei(t.n, t.nBitLength), P = t.uvRatio || ((m, w) => {
    try {
      return { isValid: !0, value: e.sqrt(m * e.inv(w)) };
    } catch {
      return { isValid: !1, value: Xe };
    }
  }), O = t.adjustScalarBytes || ((m) => m), j = t.domain || ((m, w, B) => {
    if (Nn("phflag", B), w.length || B)
      throw new Error("Contexts/pre-hash are not supported");
    return m;
  });
  function D(m, w, B = !1) {
    const F = B ? Ne : Xe;
    Ze("coordinate " + m, w, F, E);
  }
  function N(m) {
    if (!(m instanceof W))
      throw new Error("ExtendedPoint expected");
  }
  const Z = ui((m, w) => {
    const { ex: B, ey: F, ez: I } = m, f = m.is0();
    w == null && (w = f ? sh : e.inv(I));
    const g = v(B * w), S = v(F * w), L = v(I * w);
    if (f)
      return { x: Xe, y: Ne };
    if (L !== Ne)
      throw new Error("invZ was invalid");
    return { x: g, y: S };
  }), Q = ui((m) => {
    const { a: w, d: B } = t;
    if (m.is0())
      throw new Error("bad point: ZERO");
    const { ex: F, ey: I, ez: f, et: g } = m, S = v(F * F), L = v(I * I), H = v(f * f), J = v(H * H), tt = v(S * w), st = v(H * v(tt + L)), xt = v(J + v(B * v(S * L)));
    if (st !== xt)
      throw new Error("bad point: equation left != right (1)");
    const At = v(F * I), bt = v(f * g);
    if (At !== bt)
      throw new Error("bad point: equation left != right (2)");
    return !0;
  });
  class W {
    constructor(w, B, F, I) {
      D("x", w), D("y", B), D("z", F, !0), D("t", I), this.ex = w, this.ey = B, this.ez = F, this.et = I, Object.freeze(this);
    }
    get x() {
      return this.toAffine().x;
    }
    get y() {
      return this.toAffine().y;
    }
    static fromAffine(w) {
      if (w instanceof W)
        throw new Error("extended point not allowed");
      const { x: B, y: F } = w || {};
      return D("x", B), D("y", F), new W(B, F, Ne, v(B * F));
    }
    static normalizeZ(w) {
      const B = e.invertBatch(w.map((F) => F.ez));
      return w.map((F, I) => F.toAffine(B[I])).map(W.fromAffine);
    }
    // Multiscalar Multiplication
    static msm(w, B) {
      return oc(W, T, w, B);
    }
    // "Private method", don't use it directly
    _setWindowSize(w) {
      X.setWindowSize(this, w);
    }
    // Not required for fromHex(), which always creates valid points.
    // Could be useful for fromAffine().
    assertValidity() {
      Q(this);
    }
    // Compare one point to another.
    equals(w) {
      N(w);
      const { ex: B, ey: F, ez: I } = this, { ex: f, ey: g, ez: S } = w, L = v(B * S), H = v(f * I), J = v(F * S), tt = v(g * I);
      return L === H && J === tt;
    }
    is0() {
      return this.equals(W.ZERO);
    }
    negate() {
      return new W(v(-this.ex), this.ey, this.ez, v(-this.et));
    }
    // Fast algo for doubling Extended Point.
    // https://hyperelliptic.org/EFD/g1p/auto-twisted-extended.html#doubling-dbl-2008-hwcd
    // Cost: 4M + 4S + 1*a + 6add + 1*2.
    double() {
      const { a: w } = t, { ex: B, ey: F, ez: I } = this, f = v(B * B), g = v(F * F), S = v(Jo * v(I * I)), L = v(w * f), H = B + F, J = v(v(H * H) - f - g), tt = L + g, st = tt - S, xt = L - g, At = v(J * st), bt = v(tt * xt), Et = v(J * xt), ht = v(st * tt);
      return new W(At, bt, ht, Et);
    }
    // Fast algo for adding 2 Extended Points.
    // https://hyperelliptic.org/EFD/g1p/auto-twisted-extended.html#addition-add-2008-hwcd
    // Cost: 9M + 1*a + 1*d + 7add.
    add(w) {
      N(w);
      const { a: B, d: F } = t, { ex: I, ey: f, ez: g, et: S } = this, { ex: L, ey: H, ez: J, et: tt } = w, st = v(I * L), xt = v(f * H), At = v(S * F * tt), bt = v(g * J), Et = v((I + f) * (L + H) - st - xt), ht = bt - At, wt = bt + At, rn = v(xt - B * st), Bt = v(Et * ht), Dt = v(wt * rn), gn = v(Et * rn), Lt = v(ht * wt);
      return new W(Bt, Dt, Lt, gn);
    }
    subtract(w) {
      return this.add(w.negate());
    }
    wNAF(w) {
      return X.wNAFCached(this, w, W.normalizeZ);
    }
    // Constant-time multiplication.
    multiply(w) {
      const B = w;
      Ze("scalar", B, Ne, n);
      const { p: F, f: I } = this.wNAF(B);
      return W.normalizeZ([F, I])[0];
    }
    // Non-constant-time multiplication. Uses double-and-add algorithm.
    // It's faster, but should only be used when you don't care about
    // an exposed private key e.g. sig verification.
    // Does NOT allow scalars higher than CURVE.n.
    // Accepts optional accumulator to merge with multiply (important for sparse scalars)
    multiplyUnsafe(w, B = W.ZERO) {
      const F = w;
      return Ze("scalar", F, Xe, n), F === Xe ? K : this.is0() || F === Ne ? this : X.wNAFCachedUnsafe(this, F, W.normalizeZ, B);
    }
    // Checks if point is of small order.
    // If you add something to small order point, you will have "dirty"
    // point with torsion component.
    // Multiplies point by cofactor and checks if the result is 0.
    isSmallOrder() {
      return this.multiplyUnsafe(A).is0();
    }
    // Multiplies point by curve order and checks if the result is 0.
    // Returns `false` is the point is dirty.
    isTorsionFree() {
      return X.unsafeLadder(this, n).is0();
    }
    // Converts Extended point to default (x, y) coordinates.
    // Can accept precomputed Z^-1 - for example, from invertBatch.
    toAffine(w) {
      return Z(this, w);
    }
    clearCofactor() {
      const { h: w } = t;
      return w === Ne ? this : this.multiplyUnsafe(w);
    }
    // Converts hash string or Uint8Array to Point.
    // Uses algo from RFC8032 5.1.3.
    static fromHex(w, B = !1) {
      const { d: F, a: I } = t, f = e.BYTES;
      w = ge("pointHex", w, f), Nn("zip215", B);
      const g = w.slice(), S = w[f - 1];
      g[f - 1] = S & -129;
      const L = Br(g), H = B ? E : e.ORDER;
      Ze("pointHex.y", L, Xe, H);
      const J = v(L * L), tt = v(J - Ne), st = v(F * J - I);
      let { isValid: xt, value: At } = P(tt, st);
      if (!xt)
        throw new Error("Point.fromHex: invalid y coordinate");
      const bt = (At & Ne) === Ne, Et = (S & 128) !== 0;
      if (!B && At === Xe && Et)
        throw new Error("Point.fromHex: x=0 and x_0=1");
      return Et !== bt && (At = v(-At)), W.fromAffine({ x: At, y: L });
    }
    static fromPrivateKey(w) {
      const { scalar: B } = M(w);
      return V.multiply(B);
    }
    toRawBytes() {
      const { x: w, y: B } = this.toAffine(), F = ci(B, e.BYTES);
      return F[F.length - 1] |= w & Ne ? 128 : 0, F;
    }
    toHex() {
      return sr(this.toRawBytes());
    }
  }
  W.BASE = new W(t.Gx, t.Gy, Ne, v(t.Gx * t.Gy)), W.ZERO = new W(Xe, Ne, Ne, Xe);
  const { BASE: V, ZERO: K } = W, X = sc(W, h * 8);
  function nt(m) {
    return Qt(m, n);
  }
  function C(m) {
    return nt(Br(m));
  }
  function M(m) {
    const w = e.BYTES;
    m = ge("private key", m, w);
    const B = ge("hashed private key", s(m), 2 * w), F = O(B.slice(0, w)), I = B.slice(w, 2 * w), f = C(F);
    return { head: F, prefix: I, scalar: f };
  }
  function x(m) {
    const { head: w, prefix: B, scalar: F } = M(m), I = V.multiply(F), f = I.toRawBytes();
    return { head: w, prefix: B, scalar: F, point: I, pointBytes: f };
  }
  function U(m) {
    return x(m).pointBytes;
  }
  function R(m = new Uint8Array(), ...w) {
    const B = or(...w);
    return C(s(j(B, ge("context", m), !!i)));
  }
  function b(m, w, B = {}) {
    m = ge("message", m), i && (m = i(m));
    const { prefix: F, scalar: I, pointBytes: f } = x(w), g = R(B.context, F, m), S = V.multiply(g).toRawBytes(), L = R(B.context, S, f, m), H = nt(g + L * I);
    Ze("signature.s", H, Xe, n);
    const J = or(S, ci(H, e.BYTES));
    return ge("result", J, e.BYTES * 2);
  }
  const u = oh;
  function d(m, w, B, F = u) {
    const { context: I, zip215: f } = F, g = e.BYTES;
    m = ge("signature", m, 2 * g), w = ge("message", w), B = ge("publicKey", B, g), f !== void 0 && Nn("zip215", f), i && (w = i(w));
    const S = Br(m.slice(g, 2 * g));
    let L, H, J;
    try {
      L = W.fromHex(B, f), H = W.fromHex(m.slice(0, g), f), J = V.multiplyUnsafe(S);
    } catch {
      return !1;
    }
    if (!f && L.isSmallOrder())
      return !1;
    const tt = R(I, H.toRawBytes(), L.toRawBytes(), w);
    return H.add(L.multiplyUnsafe(tt)).subtract(J).clearCofactor().equals(W.ZERO);
  }
  return V._setWindowSize(8), {
    CURVE: t,
    getPublicKey: U,
    sign: b,
    verify: d,
    ExtendedPoint: W,
    utils: {
      getExtendedPublicKey: x,
      /** ed25519 priv keys are uniform 32b. No need to check for modulo bias, like in secp256k1. */
      randomPrivateKey: () => l(e.BYTES),
      /**
       * We're doing scalar multiplication (used in getPublicKey etc) with precomputed BASE_POINT
       * values. This slows down first getPublicKey() by milliseconds (see Speed section),
       * but allows to speed-up subsequent getPublicKey() calls up to 20x.
       * @param windowSize 2, 4, 8, 16
       */
      precompute(m = 8, w = W.BASE) {
        return w._setWindowSize(m), w.multiply(BigInt(3)), w;
      }
    }
  };
}
/*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */
const co = BigInt("57896044618658097711785492504343953926634992332820282019728792003956564819949"), Ko = /* @__PURE__ */ BigInt("19681161376707505956807079304988542015446066515923890162744021073123829784752");
BigInt(0);
const uh = BigInt(1), Vo = BigInt(2);
BigInt(3);
const lh = BigInt(5), hh = BigInt(8);
function fh(r) {
  const t = BigInt(10), e = BigInt(20), n = BigInt(40), i = BigInt(80), s = co, h = r * r % s * r % s, A = Zt(h, Vo, s) * h % s, E = Zt(A, uh, s) * r % s, v = Zt(E, lh, s) * E % s, T = Zt(v, t, s) * v % s, P = Zt(T, e, s) * T % s, O = Zt(P, n, s) * P % s, j = Zt(O, i, s) * O % s, D = Zt(j, i, s) * O % s, N = Zt(D, t, s) * v % s;
  return { pow_p_5_8: Zt(N, Vo, s) * r % s, b2: h };
}
function dh(r) {
  return r[0] &= 248, r[31] &= 127, r[31] |= 64, r;
}
function gh(r, t) {
  const e = co, n = Qt(t * t * t, e), i = Qt(n * n * t, e), s = fh(r * i).pow_p_5_8;
  let l = Qt(r * n * s, e);
  const h = Qt(t * l * l, e), A = l, E = Qt(l * Ko, e), v = h === r, T = h === Qt(-r, e), P = h === Qt(-r * Ko, e);
  return v && (l = A), (T || P) && (l = E), Vl(l, e) && (l = Qt(-l, e)), { isValid: v || T, value: l };
}
const Xo = Ei(co, void 0, !0), Ah = {
  // Removing Fp.create() will still work, and is 10% faster on sign
  a: Xo.create(BigInt(-1)),
  // d is -121665/121666 a.k.a. Fp.neg(121665 * Fp.inv(121666))
  d: BigInt("37095705934669439343138083508754565189542113879843219016388785533085940283555"),
  // Finite field 2n**255n - 19n
  Fp: Xo,
  // Subgroup order 2n**252n + 27742317777372353535851937790883648493n;
  n: BigInt("7237005577332262213973186563042994240857116359379907606001950938285454250989"),
  h: hh,
  Gx: BigInt("15112221349535400772501151409588531511454012693041857206046113283949847762202"),
  Gy: BigInt("46316835694926478169428394003475163141307993866256225615783033603165251855960"),
  hash: _l,
  randomBytes: Ja,
  adjustScalarBytes: dh,
  // dom2
  // Ratio of u to v. Allows us to combine inversion and square root. Uses algo from RFC8032 5.1.3.
  // Constant-time, u/√v
  uvRatio: gh
}, uo = ch(Ah);
var Xr = { exports: {} }, ph = Xr.exports, $o;
function ac() {
  return $o || ($o = 1, function(r) {
    (function(t, e) {
      function n(b, u) {
        if (!b) throw new Error(u || "Assertion failed");
      }
      function i(b, u) {
        b.super_ = u;
        var d = function() {
        };
        d.prototype = u.prototype, b.prototype = new d(), b.prototype.constructor = b;
      }
      function s(b, u, d) {
        if (s.isBN(b))
          return b;
        this.negative = 0, this.words = null, this.length = 0, this.red = null, b !== null && ((u === "le" || u === "be") && (d = u, u = 10), this._init(b || 0, u || 10, d || "be"));
      }
      typeof t == "object" ? t.exports = s : e.BN = s, s.BN = s, s.wordSize = 26;
      var l;
      try {
        typeof window < "u" && typeof window.Buffer < "u" ? l = window.Buffer : l = yi().Buffer;
      } catch {
      }
      s.isBN = function(u) {
        return u instanceof s ? !0 : u !== null && typeof u == "object" && u.constructor.wordSize === s.wordSize && Array.isArray(u.words);
      }, s.max = function(u, d) {
        return u.cmp(d) > 0 ? u : d;
      }, s.min = function(u, d) {
        return u.cmp(d) < 0 ? u : d;
      }, s.prototype._init = function(u, d, p) {
        if (typeof u == "number")
          return this._initNumber(u, d, p);
        if (typeof u == "object")
          return this._initArray(u, d, p);
        d === "hex" && (d = 16), n(d === (d | 0) && d >= 2 && d <= 36), u = u.toString().replace(/\s+/g, "");
        var m = 0;
        u[0] === "-" && (m++, this.negative = 1), m < u.length && (d === 16 ? this._parseHex(u, m, p) : (this._parseBase(u, d, m), p === "le" && this._initArray(this.toArray(), d, p)));
      }, s.prototype._initNumber = function(u, d, p) {
        u < 0 && (this.negative = 1, u = -u), u < 67108864 ? (this.words = [u & 67108863], this.length = 1) : u < 4503599627370496 ? (this.words = [
          u & 67108863,
          u / 67108864 & 67108863
        ], this.length = 2) : (n(u < 9007199254740992), this.words = [
          u & 67108863,
          u / 67108864 & 67108863,
          1
        ], this.length = 3), p === "le" && this._initArray(this.toArray(), d, p);
      }, s.prototype._initArray = function(u, d, p) {
        if (n(typeof u.length == "number"), u.length <= 0)
          return this.words = [0], this.length = 1, this;
        this.length = Math.ceil(u.length / 3), this.words = new Array(this.length);
        for (var m = 0; m < this.length; m++)
          this.words[m] = 0;
        var w, B, F = 0;
        if (p === "be")
          for (m = u.length - 1, w = 0; m >= 0; m -= 3)
            B = u[m] | u[m - 1] << 8 | u[m - 2] << 16, this.words[w] |= B << F & 67108863, this.words[w + 1] = B >>> 26 - F & 67108863, F += 24, F >= 26 && (F -= 26, w++);
        else if (p === "le")
          for (m = 0, w = 0; m < u.length; m += 3)
            B = u[m] | u[m + 1] << 8 | u[m + 2] << 16, this.words[w] |= B << F & 67108863, this.words[w + 1] = B >>> 26 - F & 67108863, F += 24, F >= 26 && (F -= 26, w++);
        return this._strip();
      };
      function h(b, u) {
        var d = b.charCodeAt(u);
        if (d >= 48 && d <= 57)
          return d - 48;
        if (d >= 65 && d <= 70)
          return d - 55;
        if (d >= 97 && d <= 102)
          return d - 87;
        n(!1, "Invalid character in " + b);
      }
      function A(b, u, d) {
        var p = h(b, d);
        return d - 1 >= u && (p |= h(b, d - 1) << 4), p;
      }
      s.prototype._parseHex = function(u, d, p) {
        this.length = Math.ceil((u.length - d) / 6), this.words = new Array(this.length);
        for (var m = 0; m < this.length; m++)
          this.words[m] = 0;
        var w = 0, B = 0, F;
        if (p === "be")
          for (m = u.length - 1; m >= d; m -= 2)
            F = A(u, d, m) << w, this.words[B] |= F & 67108863, w >= 18 ? (w -= 18, B += 1, this.words[B] |= F >>> 26) : w += 8;
        else {
          var I = u.length - d;
          for (m = I % 2 === 0 ? d + 1 : d; m < u.length; m += 2)
            F = A(u, d, m) << w, this.words[B] |= F & 67108863, w >= 18 ? (w -= 18, B += 1, this.words[B] |= F >>> 26) : w += 8;
        }
        this._strip();
      };
      function E(b, u, d, p) {
        for (var m = 0, w = 0, B = Math.min(b.length, d), F = u; F < B; F++) {
          var I = b.charCodeAt(F) - 48;
          m *= p, I >= 49 ? w = I - 49 + 10 : I >= 17 ? w = I - 17 + 10 : w = I, n(I >= 0 && w < p, "Invalid character"), m += w;
        }
        return m;
      }
      s.prototype._parseBase = function(u, d, p) {
        this.words = [0], this.length = 1;
        for (var m = 0, w = 1; w <= 67108863; w *= d)
          m++;
        m--, w = w / d | 0;
        for (var B = u.length - p, F = B % m, I = Math.min(B, B - F) + p, f = 0, g = p; g < I; g += m)
          f = E(u, g, g + m, d), this.imuln(w), this.words[0] + f < 67108864 ? this.words[0] += f : this._iaddn(f);
        if (F !== 0) {
          var S = 1;
          for (f = E(u, g, u.length, d), g = 0; g < F; g++)
            S *= d;
          this.imuln(S), this.words[0] + f < 67108864 ? this.words[0] += f : this._iaddn(f);
        }
        this._strip();
      }, s.prototype.copy = function(u) {
        u.words = new Array(this.length);
        for (var d = 0; d < this.length; d++)
          u.words[d] = this.words[d];
        u.length = this.length, u.negative = this.negative, u.red = this.red;
      };
      function v(b, u) {
        b.words = u.words, b.length = u.length, b.negative = u.negative, b.red = u.red;
      }
      if (s.prototype._move = function(u) {
        v(u, this);
      }, s.prototype.clone = function() {
        var u = new s(null);
        return this.copy(u), u;
      }, s.prototype._expand = function(u) {
        for (; this.length < u; )
          this.words[this.length++] = 0;
        return this;
      }, s.prototype._strip = function() {
        for (; this.length > 1 && this.words[this.length - 1] === 0; )
          this.length--;
        return this._normSign();
      }, s.prototype._normSign = function() {
        return this.length === 1 && this.words[0] === 0 && (this.negative = 0), this;
      }, typeof Symbol < "u" && typeof Symbol.for == "function")
        try {
          s.prototype[Symbol.for("nodejs.util.inspect.custom")] = T;
        } catch {
          s.prototype.inspect = T;
        }
      else
        s.prototype.inspect = T;
      function T() {
        return (this.red ? "<BN-R: " : "<BN: ") + this.toString(16) + ">";
      }
      var P = [
        "",
        "0",
        "00",
        "000",
        "0000",
        "00000",
        "000000",
        "0000000",
        "00000000",
        "000000000",
        "0000000000",
        "00000000000",
        "000000000000",
        "0000000000000",
        "00000000000000",
        "000000000000000",
        "0000000000000000",
        "00000000000000000",
        "000000000000000000",
        "0000000000000000000",
        "00000000000000000000",
        "000000000000000000000",
        "0000000000000000000000",
        "00000000000000000000000",
        "000000000000000000000000",
        "0000000000000000000000000"
      ], O = [
        0,
        0,
        25,
        16,
        12,
        11,
        10,
        9,
        8,
        8,
        7,
        7,
        7,
        7,
        6,
        6,
        6,
        6,
        6,
        6,
        6,
        5,
        5,
        5,
        5,
        5,
        5,
        5,
        5,
        5,
        5,
        5,
        5,
        5,
        5,
        5,
        5
      ], j = [
        0,
        0,
        33554432,
        43046721,
        16777216,
        48828125,
        60466176,
        40353607,
        16777216,
        43046721,
        1e7,
        19487171,
        35831808,
        62748517,
        7529536,
        11390625,
        16777216,
        24137569,
        34012224,
        47045881,
        64e6,
        4084101,
        5153632,
        6436343,
        7962624,
        9765625,
        11881376,
        14348907,
        17210368,
        20511149,
        243e5,
        28629151,
        33554432,
        39135393,
        45435424,
        52521875,
        60466176
      ];
      s.prototype.toString = function(u, d) {
        u = u || 10, d = d | 0 || 1;
        var p;
        if (u === 16 || u === "hex") {
          p = "";
          for (var m = 0, w = 0, B = 0; B < this.length; B++) {
            var F = this.words[B], I = ((F << m | w) & 16777215).toString(16);
            w = F >>> 24 - m & 16777215, m += 2, m >= 26 && (m -= 26, B--), w !== 0 || B !== this.length - 1 ? p = P[6 - I.length] + I + p : p = I + p;
          }
          for (w !== 0 && (p = w.toString(16) + p); p.length % d !== 0; )
            p = "0" + p;
          return this.negative !== 0 && (p = "-" + p), p;
        }
        if (u === (u | 0) && u >= 2 && u <= 36) {
          var f = O[u], g = j[u];
          p = "";
          var S = this.clone();
          for (S.negative = 0; !S.isZero(); ) {
            var L = S.modrn(g).toString(u);
            S = S.idivn(g), S.isZero() ? p = L + p : p = P[f - L.length] + L + p;
          }
          for (this.isZero() && (p = "0" + p); p.length % d !== 0; )
            p = "0" + p;
          return this.negative !== 0 && (p = "-" + p), p;
        }
        n(!1, "Base should be between 2 and 36");
      }, s.prototype.toNumber = function() {
        var u = this.words[0];
        return this.length === 2 ? u += this.words[1] * 67108864 : this.length === 3 && this.words[2] === 1 ? u += 4503599627370496 + this.words[1] * 67108864 : this.length > 2 && n(!1, "Number can only safely store up to 53 bits"), this.negative !== 0 ? -u : u;
      }, s.prototype.toJSON = function() {
        return this.toString(16, 2);
      }, l && (s.prototype.toBuffer = function(u, d) {
        return this.toArrayLike(l, u, d);
      }), s.prototype.toArray = function(u, d) {
        return this.toArrayLike(Array, u, d);
      };
      var D = function(u, d) {
        return u.allocUnsafe ? u.allocUnsafe(d) : new u(d);
      };
      s.prototype.toArrayLike = function(u, d, p) {
        this._strip();
        var m = this.byteLength(), w = p || Math.max(1, m);
        n(m <= w, "byte array longer than desired length"), n(w > 0, "Requested array length <= 0");
        var B = D(u, w), F = d === "le" ? "LE" : "BE";
        return this["_toArrayLike" + F](B, m), B;
      }, s.prototype._toArrayLikeLE = function(u, d) {
        for (var p = 0, m = 0, w = 0, B = 0; w < this.length; w++) {
          var F = this.words[w] << B | m;
          u[p++] = F & 255, p < u.length && (u[p++] = F >> 8 & 255), p < u.length && (u[p++] = F >> 16 & 255), B === 6 ? (p < u.length && (u[p++] = F >> 24 & 255), m = 0, B = 0) : (m = F >>> 24, B += 2);
        }
        if (p < u.length)
          for (u[p++] = m; p < u.length; )
            u[p++] = 0;
      }, s.prototype._toArrayLikeBE = function(u, d) {
        for (var p = u.length - 1, m = 0, w = 0, B = 0; w < this.length; w++) {
          var F = this.words[w] << B | m;
          u[p--] = F & 255, p >= 0 && (u[p--] = F >> 8 & 255), p >= 0 && (u[p--] = F >> 16 & 255), B === 6 ? (p >= 0 && (u[p--] = F >> 24 & 255), m = 0, B = 0) : (m = F >>> 24, B += 2);
        }
        if (p >= 0)
          for (u[p--] = m; p >= 0; )
            u[p--] = 0;
      }, Math.clz32 ? s.prototype._countBits = function(u) {
        return 32 - Math.clz32(u);
      } : s.prototype._countBits = function(u) {
        var d = u, p = 0;
        return d >= 4096 && (p += 13, d >>>= 13), d >= 64 && (p += 7, d >>>= 7), d >= 8 && (p += 4, d >>>= 4), d >= 2 && (p += 2, d >>>= 2), p + d;
      }, s.prototype._zeroBits = function(u) {
        if (u === 0) return 26;
        var d = u, p = 0;
        return d & 8191 || (p += 13, d >>>= 13), d & 127 || (p += 7, d >>>= 7), d & 15 || (p += 4, d >>>= 4), d & 3 || (p += 2, d >>>= 2), d & 1 || p++, p;
      }, s.prototype.bitLength = function() {
        var u = this.words[this.length - 1], d = this._countBits(u);
        return (this.length - 1) * 26 + d;
      };
      function N(b) {
        for (var u = new Array(b.bitLength()), d = 0; d < u.length; d++) {
          var p = d / 26 | 0, m = d % 26;
          u[d] = b.words[p] >>> m & 1;
        }
        return u;
      }
      s.prototype.zeroBits = function() {
        if (this.isZero()) return 0;
        for (var u = 0, d = 0; d < this.length; d++) {
          var p = this._zeroBits(this.words[d]);
          if (u += p, p !== 26) break;
        }
        return u;
      }, s.prototype.byteLength = function() {
        return Math.ceil(this.bitLength() / 8);
      }, s.prototype.toTwos = function(u) {
        return this.negative !== 0 ? this.abs().inotn(u).iaddn(1) : this.clone();
      }, s.prototype.fromTwos = function(u) {
        return this.testn(u - 1) ? this.notn(u).iaddn(1).ineg() : this.clone();
      }, s.prototype.isNeg = function() {
        return this.negative !== 0;
      }, s.prototype.neg = function() {
        return this.clone().ineg();
      }, s.prototype.ineg = function() {
        return this.isZero() || (this.negative ^= 1), this;
      }, s.prototype.iuor = function(u) {
        for (; this.length < u.length; )
          this.words[this.length++] = 0;
        for (var d = 0; d < u.length; d++)
          this.words[d] = this.words[d] | u.words[d];
        return this._strip();
      }, s.prototype.ior = function(u) {
        return n((this.negative | u.negative) === 0), this.iuor(u);
      }, s.prototype.or = function(u) {
        return this.length > u.length ? this.clone().ior(u) : u.clone().ior(this);
      }, s.prototype.uor = function(u) {
        return this.length > u.length ? this.clone().iuor(u) : u.clone().iuor(this);
      }, s.prototype.iuand = function(u) {
        var d;
        this.length > u.length ? d = u : d = this;
        for (var p = 0; p < d.length; p++)
          this.words[p] = this.words[p] & u.words[p];
        return this.length = d.length, this._strip();
      }, s.prototype.iand = function(u) {
        return n((this.negative | u.negative) === 0), this.iuand(u);
      }, s.prototype.and = function(u) {
        return this.length > u.length ? this.clone().iand(u) : u.clone().iand(this);
      }, s.prototype.uand = function(u) {
        return this.length > u.length ? this.clone().iuand(u) : u.clone().iuand(this);
      }, s.prototype.iuxor = function(u) {
        var d, p;
        this.length > u.length ? (d = this, p = u) : (d = u, p = this);
        for (var m = 0; m < p.length; m++)
          this.words[m] = d.words[m] ^ p.words[m];
        if (this !== d)
          for (; m < d.length; m++)
            this.words[m] = d.words[m];
        return this.length = d.length, this._strip();
      }, s.prototype.ixor = function(u) {
        return n((this.negative | u.negative) === 0), this.iuxor(u);
      }, s.prototype.xor = function(u) {
        return this.length > u.length ? this.clone().ixor(u) : u.clone().ixor(this);
      }, s.prototype.uxor = function(u) {
        return this.length > u.length ? this.clone().iuxor(u) : u.clone().iuxor(this);
      }, s.prototype.inotn = function(u) {
        n(typeof u == "number" && u >= 0);
        var d = Math.ceil(u / 26) | 0, p = u % 26;
        this._expand(d), p > 0 && d--;
        for (var m = 0; m < d; m++)
          this.words[m] = ~this.words[m] & 67108863;
        return p > 0 && (this.words[m] = ~this.words[m] & 67108863 >> 26 - p), this._strip();
      }, s.prototype.notn = function(u) {
        return this.clone().inotn(u);
      }, s.prototype.setn = function(u, d) {
        n(typeof u == "number" && u >= 0);
        var p = u / 26 | 0, m = u % 26;
        return this._expand(p + 1), d ? this.words[p] = this.words[p] | 1 << m : this.words[p] = this.words[p] & ~(1 << m), this._strip();
      }, s.prototype.iadd = function(u) {
        var d;
        if (this.negative !== 0 && u.negative === 0)
          return this.negative = 0, d = this.isub(u), this.negative ^= 1, this._normSign();
        if (this.negative === 0 && u.negative !== 0)
          return u.negative = 0, d = this.isub(u), u.negative = 1, d._normSign();
        var p, m;
        this.length > u.length ? (p = this, m = u) : (p = u, m = this);
        for (var w = 0, B = 0; B < m.length; B++)
          d = (p.words[B] | 0) + (m.words[B] | 0) + w, this.words[B] = d & 67108863, w = d >>> 26;
        for (; w !== 0 && B < p.length; B++)
          d = (p.words[B] | 0) + w, this.words[B] = d & 67108863, w = d >>> 26;
        if (this.length = p.length, w !== 0)
          this.words[this.length] = w, this.length++;
        else if (p !== this)
          for (; B < p.length; B++)
            this.words[B] = p.words[B];
        return this;
      }, s.prototype.add = function(u) {
        var d;
        return u.negative !== 0 && this.negative === 0 ? (u.negative = 0, d = this.sub(u), u.negative ^= 1, d) : u.negative === 0 && this.negative !== 0 ? (this.negative = 0, d = u.sub(this), this.negative = 1, d) : this.length > u.length ? this.clone().iadd(u) : u.clone().iadd(this);
      }, s.prototype.isub = function(u) {
        if (u.negative !== 0) {
          u.negative = 0;
          var d = this.iadd(u);
          return u.negative = 1, d._normSign();
        } else if (this.negative !== 0)
          return this.negative = 0, this.iadd(u), this.negative = 1, this._normSign();
        var p = this.cmp(u);
        if (p === 0)
          return this.negative = 0, this.length = 1, this.words[0] = 0, this;
        var m, w;
        p > 0 ? (m = this, w = u) : (m = u, w = this);
        for (var B = 0, F = 0; F < w.length; F++)
          d = (m.words[F] | 0) - (w.words[F] | 0) + B, B = d >> 26, this.words[F] = d & 67108863;
        for (; B !== 0 && F < m.length; F++)
          d = (m.words[F] | 0) + B, B = d >> 26, this.words[F] = d & 67108863;
        if (B === 0 && F < m.length && m !== this)
          for (; F < m.length; F++)
            this.words[F] = m.words[F];
        return this.length = Math.max(this.length, F), m !== this && (this.negative = 1), this._strip();
      }, s.prototype.sub = function(u) {
        return this.clone().isub(u);
      };
      function Z(b, u, d) {
        d.negative = u.negative ^ b.negative;
        var p = b.length + u.length | 0;
        d.length = p, p = p - 1 | 0;
        var m = b.words[0] | 0, w = u.words[0] | 0, B = m * w, F = B & 67108863, I = B / 67108864 | 0;
        d.words[0] = F;
        for (var f = 1; f < p; f++) {
          for (var g = I >>> 26, S = I & 67108863, L = Math.min(f, u.length - 1), H = Math.max(0, f - b.length + 1); H <= L; H++) {
            var J = f - H | 0;
            m = b.words[J] | 0, w = u.words[H] | 0, B = m * w + S, g += B / 67108864 | 0, S = B & 67108863;
          }
          d.words[f] = S | 0, I = g | 0;
        }
        return I !== 0 ? d.words[f] = I | 0 : d.length--, d._strip();
      }
      var Q = function(u, d, p) {
        var m = u.words, w = d.words, B = p.words, F = 0, I, f, g, S = m[0] | 0, L = S & 8191, H = S >>> 13, J = m[1] | 0, tt = J & 8191, st = J >>> 13, xt = m[2] | 0, At = xt & 8191, bt = xt >>> 13, Et = m[3] | 0, ht = Et & 8191, wt = Et >>> 13, rn = m[4] | 0, Bt = rn & 8191, Dt = rn >>> 13, gn = m[5] | 0, Lt = gn & 8191, Ct = gn >>> 13, jt = m[6] | 0, Rt = jt & 8191, zt = jt >>> 13, Jt = m[7] | 0, Pt = Jt & 8191, a = Jt >>> 13, o = m[8] | 0, c = o & 8191, y = o >>> 13, k = m[9] | 0, z = k & 8191, q = k >>> 13, ut = w[0] | 0, lt = ut & 8191, at = ut >>> 13, yt = w[1] | 0, ct = yt & 8191, Kt = yt >>> 13, vo = w[2] | 0, Vt = vo & 8191, Xt = vo >>> 13, Io = w[3] | 0, $t = Io & 8191, te = Io >>> 13, Mo = w[4] | 0, ee = Mo & 8191, ne = Mo >>> 13, So = w[5] | 0, re = So & 8191, ie = So >>> 13, xo = w[6] | 0, se = xo & 8191, oe = xo >>> 13, Bo = w[7] | 0, ae = Bo & 8191, ce = Bo >>> 13, Co = w[8] | 0, ue = Co & 8191, le = Co >>> 13, ko = w[9] | 0, he = ko & 8191, fe = ko >>> 13;
        p.negative = u.negative ^ d.negative, p.length = 19, I = Math.imul(L, lt), f = Math.imul(L, at), f = f + Math.imul(H, lt) | 0, g = Math.imul(H, at);
        var ki = (F + I | 0) + ((f & 8191) << 13) | 0;
        F = (g + (f >>> 13) | 0) + (ki >>> 26) | 0, ki &= 67108863, I = Math.imul(tt, lt), f = Math.imul(tt, at), f = f + Math.imul(st, lt) | 0, g = Math.imul(st, at), I = I + Math.imul(L, ct) | 0, f = f + Math.imul(L, Kt) | 0, f = f + Math.imul(H, ct) | 0, g = g + Math.imul(H, Kt) | 0;
        var Ni = (F + I | 0) + ((f & 8191) << 13) | 0;
        F = (g + (f >>> 13) | 0) + (Ni >>> 26) | 0, Ni &= 67108863, I = Math.imul(At, lt), f = Math.imul(At, at), f = f + Math.imul(bt, lt) | 0, g = Math.imul(bt, at), I = I + Math.imul(tt, ct) | 0, f = f + Math.imul(tt, Kt) | 0, f = f + Math.imul(st, ct) | 0, g = g + Math.imul(st, Kt) | 0, I = I + Math.imul(L, Vt) | 0, f = f + Math.imul(L, Xt) | 0, f = f + Math.imul(H, Vt) | 0, g = g + Math.imul(H, Xt) | 0;
        var Ti = (F + I | 0) + ((f & 8191) << 13) | 0;
        F = (g + (f >>> 13) | 0) + (Ti >>> 26) | 0, Ti &= 67108863, I = Math.imul(ht, lt), f = Math.imul(ht, at), f = f + Math.imul(wt, lt) | 0, g = Math.imul(wt, at), I = I + Math.imul(At, ct) | 0, f = f + Math.imul(At, Kt) | 0, f = f + Math.imul(bt, ct) | 0, g = g + Math.imul(bt, Kt) | 0, I = I + Math.imul(tt, Vt) | 0, f = f + Math.imul(tt, Xt) | 0, f = f + Math.imul(st, Vt) | 0, g = g + Math.imul(st, Xt) | 0, I = I + Math.imul(L, $t) | 0, f = f + Math.imul(L, te) | 0, f = f + Math.imul(H, $t) | 0, g = g + Math.imul(H, te) | 0;
        var Li = (F + I | 0) + ((f & 8191) << 13) | 0;
        F = (g + (f >>> 13) | 0) + (Li >>> 26) | 0, Li &= 67108863, I = Math.imul(Bt, lt), f = Math.imul(Bt, at), f = f + Math.imul(Dt, lt) | 0, g = Math.imul(Dt, at), I = I + Math.imul(ht, ct) | 0, f = f + Math.imul(ht, Kt) | 0, f = f + Math.imul(wt, ct) | 0, g = g + Math.imul(wt, Kt) | 0, I = I + Math.imul(At, Vt) | 0, f = f + Math.imul(At, Xt) | 0, f = f + Math.imul(bt, Vt) | 0, g = g + Math.imul(bt, Xt) | 0, I = I + Math.imul(tt, $t) | 0, f = f + Math.imul(tt, te) | 0, f = f + Math.imul(st, $t) | 0, g = g + Math.imul(st, te) | 0, I = I + Math.imul(L, ee) | 0, f = f + Math.imul(L, ne) | 0, f = f + Math.imul(H, ee) | 0, g = g + Math.imul(H, ne) | 0;
        var Ri = (F + I | 0) + ((f & 8191) << 13) | 0;
        F = (g + (f >>> 13) | 0) + (Ri >>> 26) | 0, Ri &= 67108863, I = Math.imul(Lt, lt), f = Math.imul(Lt, at), f = f + Math.imul(Ct, lt) | 0, g = Math.imul(Ct, at), I = I + Math.imul(Bt, ct) | 0, f = f + Math.imul(Bt, Kt) | 0, f = f + Math.imul(Dt, ct) | 0, g = g + Math.imul(Dt, Kt) | 0, I = I + Math.imul(ht, Vt) | 0, f = f + Math.imul(ht, Xt) | 0, f = f + Math.imul(wt, Vt) | 0, g = g + Math.imul(wt, Xt) | 0, I = I + Math.imul(At, $t) | 0, f = f + Math.imul(At, te) | 0, f = f + Math.imul(bt, $t) | 0, g = g + Math.imul(bt, te) | 0, I = I + Math.imul(tt, ee) | 0, f = f + Math.imul(tt, ne) | 0, f = f + Math.imul(st, ee) | 0, g = g + Math.imul(st, ne) | 0, I = I + Math.imul(L, re) | 0, f = f + Math.imul(L, ie) | 0, f = f + Math.imul(H, re) | 0, g = g + Math.imul(H, ie) | 0;
        var Di = (F + I | 0) + ((f & 8191) << 13) | 0;
        F = (g + (f >>> 13) | 0) + (Di >>> 26) | 0, Di &= 67108863, I = Math.imul(Rt, lt), f = Math.imul(Rt, at), f = f + Math.imul(zt, lt) | 0, g = Math.imul(zt, at), I = I + Math.imul(Lt, ct) | 0, f = f + Math.imul(Lt, Kt) | 0, f = f + Math.imul(Ct, ct) | 0, g = g + Math.imul(Ct, Kt) | 0, I = I + Math.imul(Bt, Vt) | 0, f = f + Math.imul(Bt, Xt) | 0, f = f + Math.imul(Dt, Vt) | 0, g = g + Math.imul(Dt, Xt) | 0, I = I + Math.imul(ht, $t) | 0, f = f + Math.imul(ht, te) | 0, f = f + Math.imul(wt, $t) | 0, g = g + Math.imul(wt, te) | 0, I = I + Math.imul(At, ee) | 0, f = f + Math.imul(At, ne) | 0, f = f + Math.imul(bt, ee) | 0, g = g + Math.imul(bt, ne) | 0, I = I + Math.imul(tt, re) | 0, f = f + Math.imul(tt, ie) | 0, f = f + Math.imul(st, re) | 0, g = g + Math.imul(st, ie) | 0, I = I + Math.imul(L, se) | 0, f = f + Math.imul(L, oe) | 0, f = f + Math.imul(H, se) | 0, g = g + Math.imul(H, oe) | 0;
        var Oi = (F + I | 0) + ((f & 8191) << 13) | 0;
        F = (g + (f >>> 13) | 0) + (Oi >>> 26) | 0, Oi &= 67108863, I = Math.imul(Pt, lt), f = Math.imul(Pt, at), f = f + Math.imul(a, lt) | 0, g = Math.imul(a, at), I = I + Math.imul(Rt, ct) | 0, f = f + Math.imul(Rt, Kt) | 0, f = f + Math.imul(zt, ct) | 0, g = g + Math.imul(zt, Kt) | 0, I = I + Math.imul(Lt, Vt) | 0, f = f + Math.imul(Lt, Xt) | 0, f = f + Math.imul(Ct, Vt) | 0, g = g + Math.imul(Ct, Xt) | 0, I = I + Math.imul(Bt, $t) | 0, f = f + Math.imul(Bt, te) | 0, f = f + Math.imul(Dt, $t) | 0, g = g + Math.imul(Dt, te) | 0, I = I + Math.imul(ht, ee) | 0, f = f + Math.imul(ht, ne) | 0, f = f + Math.imul(wt, ee) | 0, g = g + Math.imul(wt, ne) | 0, I = I + Math.imul(At, re) | 0, f = f + Math.imul(At, ie) | 0, f = f + Math.imul(bt, re) | 0, g = g + Math.imul(bt, ie) | 0, I = I + Math.imul(tt, se) | 0, f = f + Math.imul(tt, oe) | 0, f = f + Math.imul(st, se) | 0, g = g + Math.imul(st, oe) | 0, I = I + Math.imul(L, ae) | 0, f = f + Math.imul(L, ce) | 0, f = f + Math.imul(H, ae) | 0, g = g + Math.imul(H, ce) | 0;
        var Ui = (F + I | 0) + ((f & 8191) << 13) | 0;
        F = (g + (f >>> 13) | 0) + (Ui >>> 26) | 0, Ui &= 67108863, I = Math.imul(c, lt), f = Math.imul(c, at), f = f + Math.imul(y, lt) | 0, g = Math.imul(y, at), I = I + Math.imul(Pt, ct) | 0, f = f + Math.imul(Pt, Kt) | 0, f = f + Math.imul(a, ct) | 0, g = g + Math.imul(a, Kt) | 0, I = I + Math.imul(Rt, Vt) | 0, f = f + Math.imul(Rt, Xt) | 0, f = f + Math.imul(zt, Vt) | 0, g = g + Math.imul(zt, Xt) | 0, I = I + Math.imul(Lt, $t) | 0, f = f + Math.imul(Lt, te) | 0, f = f + Math.imul(Ct, $t) | 0, g = g + Math.imul(Ct, te) | 0, I = I + Math.imul(Bt, ee) | 0, f = f + Math.imul(Bt, ne) | 0, f = f + Math.imul(Dt, ee) | 0, g = g + Math.imul(Dt, ne) | 0, I = I + Math.imul(ht, re) | 0, f = f + Math.imul(ht, ie) | 0, f = f + Math.imul(wt, re) | 0, g = g + Math.imul(wt, ie) | 0, I = I + Math.imul(At, se) | 0, f = f + Math.imul(At, oe) | 0, f = f + Math.imul(bt, se) | 0, g = g + Math.imul(bt, oe) | 0, I = I + Math.imul(tt, ae) | 0, f = f + Math.imul(tt, ce) | 0, f = f + Math.imul(st, ae) | 0, g = g + Math.imul(st, ce) | 0, I = I + Math.imul(L, ue) | 0, f = f + Math.imul(L, le) | 0, f = f + Math.imul(H, ue) | 0, g = g + Math.imul(H, le) | 0;
        var ji = (F + I | 0) + ((f & 8191) << 13) | 0;
        F = (g + (f >>> 13) | 0) + (ji >>> 26) | 0, ji &= 67108863, I = Math.imul(z, lt), f = Math.imul(z, at), f = f + Math.imul(q, lt) | 0, g = Math.imul(q, at), I = I + Math.imul(c, ct) | 0, f = f + Math.imul(c, Kt) | 0, f = f + Math.imul(y, ct) | 0, g = g + Math.imul(y, Kt) | 0, I = I + Math.imul(Pt, Vt) | 0, f = f + Math.imul(Pt, Xt) | 0, f = f + Math.imul(a, Vt) | 0, g = g + Math.imul(a, Xt) | 0, I = I + Math.imul(Rt, $t) | 0, f = f + Math.imul(Rt, te) | 0, f = f + Math.imul(zt, $t) | 0, g = g + Math.imul(zt, te) | 0, I = I + Math.imul(Lt, ee) | 0, f = f + Math.imul(Lt, ne) | 0, f = f + Math.imul(Ct, ee) | 0, g = g + Math.imul(Ct, ne) | 0, I = I + Math.imul(Bt, re) | 0, f = f + Math.imul(Bt, ie) | 0, f = f + Math.imul(Dt, re) | 0, g = g + Math.imul(Dt, ie) | 0, I = I + Math.imul(ht, se) | 0, f = f + Math.imul(ht, oe) | 0, f = f + Math.imul(wt, se) | 0, g = g + Math.imul(wt, oe) | 0, I = I + Math.imul(At, ae) | 0, f = f + Math.imul(At, ce) | 0, f = f + Math.imul(bt, ae) | 0, g = g + Math.imul(bt, ce) | 0, I = I + Math.imul(tt, ue) | 0, f = f + Math.imul(tt, le) | 0, f = f + Math.imul(st, ue) | 0, g = g + Math.imul(st, le) | 0, I = I + Math.imul(L, he) | 0, f = f + Math.imul(L, fe) | 0, f = f + Math.imul(H, he) | 0, g = g + Math.imul(H, fe) | 0;
        var zi = (F + I | 0) + ((f & 8191) << 13) | 0;
        F = (g + (f >>> 13) | 0) + (zi >>> 26) | 0, zi &= 67108863, I = Math.imul(z, ct), f = Math.imul(z, Kt), f = f + Math.imul(q, ct) | 0, g = Math.imul(q, Kt), I = I + Math.imul(c, Vt) | 0, f = f + Math.imul(c, Xt) | 0, f = f + Math.imul(y, Vt) | 0, g = g + Math.imul(y, Xt) | 0, I = I + Math.imul(Pt, $t) | 0, f = f + Math.imul(Pt, te) | 0, f = f + Math.imul(a, $t) | 0, g = g + Math.imul(a, te) | 0, I = I + Math.imul(Rt, ee) | 0, f = f + Math.imul(Rt, ne) | 0, f = f + Math.imul(zt, ee) | 0, g = g + Math.imul(zt, ne) | 0, I = I + Math.imul(Lt, re) | 0, f = f + Math.imul(Lt, ie) | 0, f = f + Math.imul(Ct, re) | 0, g = g + Math.imul(Ct, ie) | 0, I = I + Math.imul(Bt, se) | 0, f = f + Math.imul(Bt, oe) | 0, f = f + Math.imul(Dt, se) | 0, g = g + Math.imul(Dt, oe) | 0, I = I + Math.imul(ht, ae) | 0, f = f + Math.imul(ht, ce) | 0, f = f + Math.imul(wt, ae) | 0, g = g + Math.imul(wt, ce) | 0, I = I + Math.imul(At, ue) | 0, f = f + Math.imul(At, le) | 0, f = f + Math.imul(bt, ue) | 0, g = g + Math.imul(bt, le) | 0, I = I + Math.imul(tt, he) | 0, f = f + Math.imul(tt, fe) | 0, f = f + Math.imul(st, he) | 0, g = g + Math.imul(st, fe) | 0;
        var Pi = (F + I | 0) + ((f & 8191) << 13) | 0;
        F = (g + (f >>> 13) | 0) + (Pi >>> 26) | 0, Pi &= 67108863, I = Math.imul(z, Vt), f = Math.imul(z, Xt), f = f + Math.imul(q, Vt) | 0, g = Math.imul(q, Xt), I = I + Math.imul(c, $t) | 0, f = f + Math.imul(c, te) | 0, f = f + Math.imul(y, $t) | 0, g = g + Math.imul(y, te) | 0, I = I + Math.imul(Pt, ee) | 0, f = f + Math.imul(Pt, ne) | 0, f = f + Math.imul(a, ee) | 0, g = g + Math.imul(a, ne) | 0, I = I + Math.imul(Rt, re) | 0, f = f + Math.imul(Rt, ie) | 0, f = f + Math.imul(zt, re) | 0, g = g + Math.imul(zt, ie) | 0, I = I + Math.imul(Lt, se) | 0, f = f + Math.imul(Lt, oe) | 0, f = f + Math.imul(Ct, se) | 0, g = g + Math.imul(Ct, oe) | 0, I = I + Math.imul(Bt, ae) | 0, f = f + Math.imul(Bt, ce) | 0, f = f + Math.imul(Dt, ae) | 0, g = g + Math.imul(Dt, ce) | 0, I = I + Math.imul(ht, ue) | 0, f = f + Math.imul(ht, le) | 0, f = f + Math.imul(wt, ue) | 0, g = g + Math.imul(wt, le) | 0, I = I + Math.imul(At, he) | 0, f = f + Math.imul(At, fe) | 0, f = f + Math.imul(bt, he) | 0, g = g + Math.imul(bt, fe) | 0;
        var Fi = (F + I | 0) + ((f & 8191) << 13) | 0;
        F = (g + (f >>> 13) | 0) + (Fi >>> 26) | 0, Fi &= 67108863, I = Math.imul(z, $t), f = Math.imul(z, te), f = f + Math.imul(q, $t) | 0, g = Math.imul(q, te), I = I + Math.imul(c, ee) | 0, f = f + Math.imul(c, ne) | 0, f = f + Math.imul(y, ee) | 0, g = g + Math.imul(y, ne) | 0, I = I + Math.imul(Pt, re) | 0, f = f + Math.imul(Pt, ie) | 0, f = f + Math.imul(a, re) | 0, g = g + Math.imul(a, ie) | 0, I = I + Math.imul(Rt, se) | 0, f = f + Math.imul(Rt, oe) | 0, f = f + Math.imul(zt, se) | 0, g = g + Math.imul(zt, oe) | 0, I = I + Math.imul(Lt, ae) | 0, f = f + Math.imul(Lt, ce) | 0, f = f + Math.imul(Ct, ae) | 0, g = g + Math.imul(Ct, ce) | 0, I = I + Math.imul(Bt, ue) | 0, f = f + Math.imul(Bt, le) | 0, f = f + Math.imul(Dt, ue) | 0, g = g + Math.imul(Dt, le) | 0, I = I + Math.imul(ht, he) | 0, f = f + Math.imul(ht, fe) | 0, f = f + Math.imul(wt, he) | 0, g = g + Math.imul(wt, fe) | 0;
        var Qi = (F + I | 0) + ((f & 8191) << 13) | 0;
        F = (g + (f >>> 13) | 0) + (Qi >>> 26) | 0, Qi &= 67108863, I = Math.imul(z, ee), f = Math.imul(z, ne), f = f + Math.imul(q, ee) | 0, g = Math.imul(q, ne), I = I + Math.imul(c, re) | 0, f = f + Math.imul(c, ie) | 0, f = f + Math.imul(y, re) | 0, g = g + Math.imul(y, ie) | 0, I = I + Math.imul(Pt, se) | 0, f = f + Math.imul(Pt, oe) | 0, f = f + Math.imul(a, se) | 0, g = g + Math.imul(a, oe) | 0, I = I + Math.imul(Rt, ae) | 0, f = f + Math.imul(Rt, ce) | 0, f = f + Math.imul(zt, ae) | 0, g = g + Math.imul(zt, ce) | 0, I = I + Math.imul(Lt, ue) | 0, f = f + Math.imul(Lt, le) | 0, f = f + Math.imul(Ct, ue) | 0, g = g + Math.imul(Ct, le) | 0, I = I + Math.imul(Bt, he) | 0, f = f + Math.imul(Bt, fe) | 0, f = f + Math.imul(Dt, he) | 0, g = g + Math.imul(Dt, fe) | 0;
        var _i = (F + I | 0) + ((f & 8191) << 13) | 0;
        F = (g + (f >>> 13) | 0) + (_i >>> 26) | 0, _i &= 67108863, I = Math.imul(z, re), f = Math.imul(z, ie), f = f + Math.imul(q, re) | 0, g = Math.imul(q, ie), I = I + Math.imul(c, se) | 0, f = f + Math.imul(c, oe) | 0, f = f + Math.imul(y, se) | 0, g = g + Math.imul(y, oe) | 0, I = I + Math.imul(Pt, ae) | 0, f = f + Math.imul(Pt, ce) | 0, f = f + Math.imul(a, ae) | 0, g = g + Math.imul(a, ce) | 0, I = I + Math.imul(Rt, ue) | 0, f = f + Math.imul(Rt, le) | 0, f = f + Math.imul(zt, ue) | 0, g = g + Math.imul(zt, le) | 0, I = I + Math.imul(Lt, he) | 0, f = f + Math.imul(Lt, fe) | 0, f = f + Math.imul(Ct, he) | 0, g = g + Math.imul(Ct, fe) | 0;
        var Wi = (F + I | 0) + ((f & 8191) << 13) | 0;
        F = (g + (f >>> 13) | 0) + (Wi >>> 26) | 0, Wi &= 67108863, I = Math.imul(z, se), f = Math.imul(z, oe), f = f + Math.imul(q, se) | 0, g = Math.imul(q, oe), I = I + Math.imul(c, ae) | 0, f = f + Math.imul(c, ce) | 0, f = f + Math.imul(y, ae) | 0, g = g + Math.imul(y, ce) | 0, I = I + Math.imul(Pt, ue) | 0, f = f + Math.imul(Pt, le) | 0, f = f + Math.imul(a, ue) | 0, g = g + Math.imul(a, le) | 0, I = I + Math.imul(Rt, he) | 0, f = f + Math.imul(Rt, fe) | 0, f = f + Math.imul(zt, he) | 0, g = g + Math.imul(zt, fe) | 0;
        var qi = (F + I | 0) + ((f & 8191) << 13) | 0;
        F = (g + (f >>> 13) | 0) + (qi >>> 26) | 0, qi &= 67108863, I = Math.imul(z, ae), f = Math.imul(z, ce), f = f + Math.imul(q, ae) | 0, g = Math.imul(q, ce), I = I + Math.imul(c, ue) | 0, f = f + Math.imul(c, le) | 0, f = f + Math.imul(y, ue) | 0, g = g + Math.imul(y, le) | 0, I = I + Math.imul(Pt, he) | 0, f = f + Math.imul(Pt, fe) | 0, f = f + Math.imul(a, he) | 0, g = g + Math.imul(a, fe) | 0;
        var Hi = (F + I | 0) + ((f & 8191) << 13) | 0;
        F = (g + (f >>> 13) | 0) + (Hi >>> 26) | 0, Hi &= 67108863, I = Math.imul(z, ue), f = Math.imul(z, le), f = f + Math.imul(q, ue) | 0, g = Math.imul(q, le), I = I + Math.imul(c, he) | 0, f = f + Math.imul(c, fe) | 0, f = f + Math.imul(y, he) | 0, g = g + Math.imul(y, fe) | 0;
        var Zi = (F + I | 0) + ((f & 8191) << 13) | 0;
        F = (g + (f >>> 13) | 0) + (Zi >>> 26) | 0, Zi &= 67108863, I = Math.imul(z, he), f = Math.imul(z, fe), f = f + Math.imul(q, he) | 0, g = Math.imul(q, fe);
        var Yi = (F + I | 0) + ((f & 8191) << 13) | 0;
        return F = (g + (f >>> 13) | 0) + (Yi >>> 26) | 0, Yi &= 67108863, B[0] = ki, B[1] = Ni, B[2] = Ti, B[3] = Li, B[4] = Ri, B[5] = Di, B[6] = Oi, B[7] = Ui, B[8] = ji, B[9] = zi, B[10] = Pi, B[11] = Fi, B[12] = Qi, B[13] = _i, B[14] = Wi, B[15] = qi, B[16] = Hi, B[17] = Zi, B[18] = Yi, F !== 0 && (B[19] = F, p.length++), p;
      };
      Math.imul || (Q = Z);
      function W(b, u, d) {
        d.negative = u.negative ^ b.negative, d.length = b.length + u.length;
        for (var p = 0, m = 0, w = 0; w < d.length - 1; w++) {
          var B = m;
          m = 0;
          for (var F = p & 67108863, I = Math.min(w, u.length - 1), f = Math.max(0, w - b.length + 1); f <= I; f++) {
            var g = w - f, S = b.words[g] | 0, L = u.words[f] | 0, H = S * L, J = H & 67108863;
            B = B + (H / 67108864 | 0) | 0, J = J + F | 0, F = J & 67108863, B = B + (J >>> 26) | 0, m += B >>> 26, B &= 67108863;
          }
          d.words[w] = F, p = B, B = m;
        }
        return p !== 0 ? d.words[w] = p : d.length--, d._strip();
      }
      function V(b, u, d) {
        return W(b, u, d);
      }
      s.prototype.mulTo = function(u, d) {
        var p, m = this.length + u.length;
        return this.length === 10 && u.length === 10 ? p = Q(this, u, d) : m < 63 ? p = Z(this, u, d) : m < 1024 ? p = W(this, u, d) : p = V(this, u, d), p;
      }, s.prototype.mul = function(u) {
        var d = new s(null);
        return d.words = new Array(this.length + u.length), this.mulTo(u, d);
      }, s.prototype.mulf = function(u) {
        var d = new s(null);
        return d.words = new Array(this.length + u.length), V(this, u, d);
      }, s.prototype.imul = function(u) {
        return this.clone().mulTo(u, this);
      }, s.prototype.imuln = function(u) {
        var d = u < 0;
        d && (u = -u), n(typeof u == "number"), n(u < 67108864);
        for (var p = 0, m = 0; m < this.length; m++) {
          var w = (this.words[m] | 0) * u, B = (w & 67108863) + (p & 67108863);
          p >>= 26, p += w / 67108864 | 0, p += B >>> 26, this.words[m] = B & 67108863;
        }
        return p !== 0 && (this.words[m] = p, this.length++), d ? this.ineg() : this;
      }, s.prototype.muln = function(u) {
        return this.clone().imuln(u);
      }, s.prototype.sqr = function() {
        return this.mul(this);
      }, s.prototype.isqr = function() {
        return this.imul(this.clone());
      }, s.prototype.pow = function(u) {
        var d = N(u);
        if (d.length === 0) return new s(1);
        for (var p = this, m = 0; m < d.length && d[m] === 0; m++, p = p.sqr())
          ;
        if (++m < d.length)
          for (var w = p.sqr(); m < d.length; m++, w = w.sqr())
            d[m] !== 0 && (p = p.mul(w));
        return p;
      }, s.prototype.iushln = function(u) {
        n(typeof u == "number" && u >= 0);
        var d = u % 26, p = (u - d) / 26, m = 67108863 >>> 26 - d << 26 - d, w;
        if (d !== 0) {
          var B = 0;
          for (w = 0; w < this.length; w++) {
            var F = this.words[w] & m, I = (this.words[w] | 0) - F << d;
            this.words[w] = I | B, B = F >>> 26 - d;
          }
          B && (this.words[w] = B, this.length++);
        }
        if (p !== 0) {
          for (w = this.length - 1; w >= 0; w--)
            this.words[w + p] = this.words[w];
          for (w = 0; w < p; w++)
            this.words[w] = 0;
          this.length += p;
        }
        return this._strip();
      }, s.prototype.ishln = function(u) {
        return n(this.negative === 0), this.iushln(u);
      }, s.prototype.iushrn = function(u, d, p) {
        n(typeof u == "number" && u >= 0);
        var m;
        d ? m = (d - d % 26) / 26 : m = 0;
        var w = u % 26, B = Math.min((u - w) / 26, this.length), F = 67108863 ^ 67108863 >>> w << w, I = p;
        if (m -= B, m = Math.max(0, m), I) {
          for (var f = 0; f < B; f++)
            I.words[f] = this.words[f];
          I.length = B;
        }
        if (B !== 0) if (this.length > B)
          for (this.length -= B, f = 0; f < this.length; f++)
            this.words[f] = this.words[f + B];
        else
          this.words[0] = 0, this.length = 1;
        var g = 0;
        for (f = this.length - 1; f >= 0 && (g !== 0 || f >= m); f--) {
          var S = this.words[f] | 0;
          this.words[f] = g << 26 - w | S >>> w, g = S & F;
        }
        return I && g !== 0 && (I.words[I.length++] = g), this.length === 0 && (this.words[0] = 0, this.length = 1), this._strip();
      }, s.prototype.ishrn = function(u, d, p) {
        return n(this.negative === 0), this.iushrn(u, d, p);
      }, s.prototype.shln = function(u) {
        return this.clone().ishln(u);
      }, s.prototype.ushln = function(u) {
        return this.clone().iushln(u);
      }, s.prototype.shrn = function(u) {
        return this.clone().ishrn(u);
      }, s.prototype.ushrn = function(u) {
        return this.clone().iushrn(u);
      }, s.prototype.testn = function(u) {
        n(typeof u == "number" && u >= 0);
        var d = u % 26, p = (u - d) / 26, m = 1 << d;
        if (this.length <= p) return !1;
        var w = this.words[p];
        return !!(w & m);
      }, s.prototype.imaskn = function(u) {
        n(typeof u == "number" && u >= 0);
        var d = u % 26, p = (u - d) / 26;
        if (n(this.negative === 0, "imaskn works only with positive numbers"), this.length <= p)
          return this;
        if (d !== 0 && p++, this.length = Math.min(p, this.length), d !== 0) {
          var m = 67108863 ^ 67108863 >>> d << d;
          this.words[this.length - 1] &= m;
        }
        return this._strip();
      }, s.prototype.maskn = function(u) {
        return this.clone().imaskn(u);
      }, s.prototype.iaddn = function(u) {
        return n(typeof u == "number"), n(u < 67108864), u < 0 ? this.isubn(-u) : this.negative !== 0 ? this.length === 1 && (this.words[0] | 0) <= u ? (this.words[0] = u - (this.words[0] | 0), this.negative = 0, this) : (this.negative = 0, this.isubn(u), this.negative = 1, this) : this._iaddn(u);
      }, s.prototype._iaddn = function(u) {
        this.words[0] += u;
        for (var d = 0; d < this.length && this.words[d] >= 67108864; d++)
          this.words[d] -= 67108864, d === this.length - 1 ? this.words[d + 1] = 1 : this.words[d + 1]++;
        return this.length = Math.max(this.length, d + 1), this;
      }, s.prototype.isubn = function(u) {
        if (n(typeof u == "number"), n(u < 67108864), u < 0) return this.iaddn(-u);
        if (this.negative !== 0)
          return this.negative = 0, this.iaddn(u), this.negative = 1, this;
        if (this.words[0] -= u, this.length === 1 && this.words[0] < 0)
          this.words[0] = -this.words[0], this.negative = 1;
        else
          for (var d = 0; d < this.length && this.words[d] < 0; d++)
            this.words[d] += 67108864, this.words[d + 1] -= 1;
        return this._strip();
      }, s.prototype.addn = function(u) {
        return this.clone().iaddn(u);
      }, s.prototype.subn = function(u) {
        return this.clone().isubn(u);
      }, s.prototype.iabs = function() {
        return this.negative = 0, this;
      }, s.prototype.abs = function() {
        return this.clone().iabs();
      }, s.prototype._ishlnsubmul = function(u, d, p) {
        var m = u.length + p, w;
        this._expand(m);
        var B, F = 0;
        for (w = 0; w < u.length; w++) {
          B = (this.words[w + p] | 0) + F;
          var I = (u.words[w] | 0) * d;
          B -= I & 67108863, F = (B >> 26) - (I / 67108864 | 0), this.words[w + p] = B & 67108863;
        }
        for (; w < this.length - p; w++)
          B = (this.words[w + p] | 0) + F, F = B >> 26, this.words[w + p] = B & 67108863;
        if (F === 0) return this._strip();
        for (n(F === -1), F = 0, w = 0; w < this.length; w++)
          B = -(this.words[w] | 0) + F, F = B >> 26, this.words[w] = B & 67108863;
        return this.negative = 1, this._strip();
      }, s.prototype._wordDiv = function(u, d) {
        var p = this.length - u.length, m = this.clone(), w = u, B = w.words[w.length - 1] | 0, F = this._countBits(B);
        p = 26 - F, p !== 0 && (w = w.ushln(p), m.iushln(p), B = w.words[w.length - 1] | 0);
        var I = m.length - w.length, f;
        if (d !== "mod") {
          f = new s(null), f.length = I + 1, f.words = new Array(f.length);
          for (var g = 0; g < f.length; g++)
            f.words[g] = 0;
        }
        var S = m.clone()._ishlnsubmul(w, 1, I);
        S.negative === 0 && (m = S, f && (f.words[I] = 1));
        for (var L = I - 1; L >= 0; L--) {
          var H = (m.words[w.length + L] | 0) * 67108864 + (m.words[w.length + L - 1] | 0);
          for (H = Math.min(H / B | 0, 67108863), m._ishlnsubmul(w, H, L); m.negative !== 0; )
            H--, m.negative = 0, m._ishlnsubmul(w, 1, L), m.isZero() || (m.negative ^= 1);
          f && (f.words[L] = H);
        }
        return f && f._strip(), m._strip(), d !== "div" && p !== 0 && m.iushrn(p), {
          div: f || null,
          mod: m
        };
      }, s.prototype.divmod = function(u, d, p) {
        if (n(!u.isZero()), this.isZero())
          return {
            div: new s(0),
            mod: new s(0)
          };
        var m, w, B;
        return this.negative !== 0 && u.negative === 0 ? (B = this.neg().divmod(u, d), d !== "mod" && (m = B.div.neg()), d !== "div" && (w = B.mod.neg(), p && w.negative !== 0 && w.iadd(u)), {
          div: m,
          mod: w
        }) : this.negative === 0 && u.negative !== 0 ? (B = this.divmod(u.neg(), d), d !== "mod" && (m = B.div.neg()), {
          div: m,
          mod: B.mod
        }) : this.negative & u.negative ? (B = this.neg().divmod(u.neg(), d), d !== "div" && (w = B.mod.neg(), p && w.negative !== 0 && w.isub(u)), {
          div: B.div,
          mod: w
        }) : u.length > this.length || this.cmp(u) < 0 ? {
          div: new s(0),
          mod: this
        } : u.length === 1 ? d === "div" ? {
          div: this.divn(u.words[0]),
          mod: null
        } : d === "mod" ? {
          div: null,
          mod: new s(this.modrn(u.words[0]))
        } : {
          div: this.divn(u.words[0]),
          mod: new s(this.modrn(u.words[0]))
        } : this._wordDiv(u, d);
      }, s.prototype.div = function(u) {
        return this.divmod(u, "div", !1).div;
      }, s.prototype.mod = function(u) {
        return this.divmod(u, "mod", !1).mod;
      }, s.prototype.umod = function(u) {
        return this.divmod(u, "mod", !0).mod;
      }, s.prototype.divRound = function(u) {
        var d = this.divmod(u);
        if (d.mod.isZero()) return d.div;
        var p = d.div.negative !== 0 ? d.mod.isub(u) : d.mod, m = u.ushrn(1), w = u.andln(1), B = p.cmp(m);
        return B < 0 || w === 1 && B === 0 ? d.div : d.div.negative !== 0 ? d.div.isubn(1) : d.div.iaddn(1);
      }, s.prototype.modrn = function(u) {
        var d = u < 0;
        d && (u = -u), n(u <= 67108863);
        for (var p = (1 << 26) % u, m = 0, w = this.length - 1; w >= 0; w--)
          m = (p * m + (this.words[w] | 0)) % u;
        return d ? -m : m;
      }, s.prototype.modn = function(u) {
        return this.modrn(u);
      }, s.prototype.idivn = function(u) {
        var d = u < 0;
        d && (u = -u), n(u <= 67108863);
        for (var p = 0, m = this.length - 1; m >= 0; m--) {
          var w = (this.words[m] | 0) + p * 67108864;
          this.words[m] = w / u | 0, p = w % u;
        }
        return this._strip(), d ? this.ineg() : this;
      }, s.prototype.divn = function(u) {
        return this.clone().idivn(u);
      }, s.prototype.egcd = function(u) {
        n(u.negative === 0), n(!u.isZero());
        var d = this, p = u.clone();
        d.negative !== 0 ? d = d.umod(u) : d = d.clone();
        for (var m = new s(1), w = new s(0), B = new s(0), F = new s(1), I = 0; d.isEven() && p.isEven(); )
          d.iushrn(1), p.iushrn(1), ++I;
        for (var f = p.clone(), g = d.clone(); !d.isZero(); ) {
          for (var S = 0, L = 1; !(d.words[0] & L) && S < 26; ++S, L <<= 1) ;
          if (S > 0)
            for (d.iushrn(S); S-- > 0; )
              (m.isOdd() || w.isOdd()) && (m.iadd(f), w.isub(g)), m.iushrn(1), w.iushrn(1);
          for (var H = 0, J = 1; !(p.words[0] & J) && H < 26; ++H, J <<= 1) ;
          if (H > 0)
            for (p.iushrn(H); H-- > 0; )
              (B.isOdd() || F.isOdd()) && (B.iadd(f), F.isub(g)), B.iushrn(1), F.iushrn(1);
          d.cmp(p) >= 0 ? (d.isub(p), m.isub(B), w.isub(F)) : (p.isub(d), B.isub(m), F.isub(w));
        }
        return {
          a: B,
          b: F,
          gcd: p.iushln(I)
        };
      }, s.prototype._invmp = function(u) {
        n(u.negative === 0), n(!u.isZero());
        var d = this, p = u.clone();
        d.negative !== 0 ? d = d.umod(u) : d = d.clone();
        for (var m = new s(1), w = new s(0), B = p.clone(); d.cmpn(1) > 0 && p.cmpn(1) > 0; ) {
          for (var F = 0, I = 1; !(d.words[0] & I) && F < 26; ++F, I <<= 1) ;
          if (F > 0)
            for (d.iushrn(F); F-- > 0; )
              m.isOdd() && m.iadd(B), m.iushrn(1);
          for (var f = 0, g = 1; !(p.words[0] & g) && f < 26; ++f, g <<= 1) ;
          if (f > 0)
            for (p.iushrn(f); f-- > 0; )
              w.isOdd() && w.iadd(B), w.iushrn(1);
          d.cmp(p) >= 0 ? (d.isub(p), m.isub(w)) : (p.isub(d), w.isub(m));
        }
        var S;
        return d.cmpn(1) === 0 ? S = m : S = w, S.cmpn(0) < 0 && S.iadd(u), S;
      }, s.prototype.gcd = function(u) {
        if (this.isZero()) return u.abs();
        if (u.isZero()) return this.abs();
        var d = this.clone(), p = u.clone();
        d.negative = 0, p.negative = 0;
        for (var m = 0; d.isEven() && p.isEven(); m++)
          d.iushrn(1), p.iushrn(1);
        do {
          for (; d.isEven(); )
            d.iushrn(1);
          for (; p.isEven(); )
            p.iushrn(1);
          var w = d.cmp(p);
          if (w < 0) {
            var B = d;
            d = p, p = B;
          } else if (w === 0 || p.cmpn(1) === 0)
            break;
          d.isub(p);
        } while (!0);
        return p.iushln(m);
      }, s.prototype.invm = function(u) {
        return this.egcd(u).a.umod(u);
      }, s.prototype.isEven = function() {
        return (this.words[0] & 1) === 0;
      }, s.prototype.isOdd = function() {
        return (this.words[0] & 1) === 1;
      }, s.prototype.andln = function(u) {
        return this.words[0] & u;
      }, s.prototype.bincn = function(u) {
        n(typeof u == "number");
        var d = u % 26, p = (u - d) / 26, m = 1 << d;
        if (this.length <= p)
          return this._expand(p + 1), this.words[p] |= m, this;
        for (var w = m, B = p; w !== 0 && B < this.length; B++) {
          var F = this.words[B] | 0;
          F += w, w = F >>> 26, F &= 67108863, this.words[B] = F;
        }
        return w !== 0 && (this.words[B] = w, this.length++), this;
      }, s.prototype.isZero = function() {
        return this.length === 1 && this.words[0] === 0;
      }, s.prototype.cmpn = function(u) {
        var d = u < 0;
        if (this.negative !== 0 && !d) return -1;
        if (this.negative === 0 && d) return 1;
        this._strip();
        var p;
        if (this.length > 1)
          p = 1;
        else {
          d && (u = -u), n(u <= 67108863, "Number is too big");
          var m = this.words[0] | 0;
          p = m === u ? 0 : m < u ? -1 : 1;
        }
        return this.negative !== 0 ? -p | 0 : p;
      }, s.prototype.cmp = function(u) {
        if (this.negative !== 0 && u.negative === 0) return -1;
        if (this.negative === 0 && u.negative !== 0) return 1;
        var d = this.ucmp(u);
        return this.negative !== 0 ? -d | 0 : d;
      }, s.prototype.ucmp = function(u) {
        if (this.length > u.length) return 1;
        if (this.length < u.length) return -1;
        for (var d = 0, p = this.length - 1; p >= 0; p--) {
          var m = this.words[p] | 0, w = u.words[p] | 0;
          if (m !== w) {
            m < w ? d = -1 : m > w && (d = 1);
            break;
          }
        }
        return d;
      }, s.prototype.gtn = function(u) {
        return this.cmpn(u) === 1;
      }, s.prototype.gt = function(u) {
        return this.cmp(u) === 1;
      }, s.prototype.gten = function(u) {
        return this.cmpn(u) >= 0;
      }, s.prototype.gte = function(u) {
        return this.cmp(u) >= 0;
      }, s.prototype.ltn = function(u) {
        return this.cmpn(u) === -1;
      }, s.prototype.lt = function(u) {
        return this.cmp(u) === -1;
      }, s.prototype.lten = function(u) {
        return this.cmpn(u) <= 0;
      }, s.prototype.lte = function(u) {
        return this.cmp(u) <= 0;
      }, s.prototype.eqn = function(u) {
        return this.cmpn(u) === 0;
      }, s.prototype.eq = function(u) {
        return this.cmp(u) === 0;
      }, s.red = function(u) {
        return new U(u);
      }, s.prototype.toRed = function(u) {
        return n(!this.red, "Already a number in reduction context"), n(this.negative === 0, "red works only with positives"), u.convertTo(this)._forceRed(u);
      }, s.prototype.fromRed = function() {
        return n(this.red, "fromRed works only with numbers in reduction context"), this.red.convertFrom(this);
      }, s.prototype._forceRed = function(u) {
        return this.red = u, this;
      }, s.prototype.forceRed = function(u) {
        return n(!this.red, "Already a number in reduction context"), this._forceRed(u);
      }, s.prototype.redAdd = function(u) {
        return n(this.red, "redAdd works only with red numbers"), this.red.add(this, u);
      }, s.prototype.redIAdd = function(u) {
        return n(this.red, "redIAdd works only with red numbers"), this.red.iadd(this, u);
      }, s.prototype.redSub = function(u) {
        return n(this.red, "redSub works only with red numbers"), this.red.sub(this, u);
      }, s.prototype.redISub = function(u) {
        return n(this.red, "redISub works only with red numbers"), this.red.isub(this, u);
      }, s.prototype.redShl = function(u) {
        return n(this.red, "redShl works only with red numbers"), this.red.shl(this, u);
      }, s.prototype.redMul = function(u) {
        return n(this.red, "redMul works only with red numbers"), this.red._verify2(this, u), this.red.mul(this, u);
      }, s.prototype.redIMul = function(u) {
        return n(this.red, "redMul works only with red numbers"), this.red._verify2(this, u), this.red.imul(this, u);
      }, s.prototype.redSqr = function() {
        return n(this.red, "redSqr works only with red numbers"), this.red._verify1(this), this.red.sqr(this);
      }, s.prototype.redISqr = function() {
        return n(this.red, "redISqr works only with red numbers"), this.red._verify1(this), this.red.isqr(this);
      }, s.prototype.redSqrt = function() {
        return n(this.red, "redSqrt works only with red numbers"), this.red._verify1(this), this.red.sqrt(this);
      }, s.prototype.redInvm = function() {
        return n(this.red, "redInvm works only with red numbers"), this.red._verify1(this), this.red.invm(this);
      }, s.prototype.redNeg = function() {
        return n(this.red, "redNeg works only with red numbers"), this.red._verify1(this), this.red.neg(this);
      }, s.prototype.redPow = function(u) {
        return n(this.red && !u.red, "redPow(normalNum)"), this.red._verify1(this), this.red.pow(this, u);
      };
      var K = {
        k256: null,
        p224: null,
        p192: null,
        p25519: null
      };
      function X(b, u) {
        this.name = b, this.p = new s(u, 16), this.n = this.p.bitLength(), this.k = new s(1).iushln(this.n).isub(this.p), this.tmp = this._tmp();
      }
      X.prototype._tmp = function() {
        var u = new s(null);
        return u.words = new Array(Math.ceil(this.n / 13)), u;
      }, X.prototype.ireduce = function(u) {
        var d = u, p;
        do
          this.split(d, this.tmp), d = this.imulK(d), d = d.iadd(this.tmp), p = d.bitLength();
        while (p > this.n);
        var m = p < this.n ? -1 : d.ucmp(this.p);
        return m === 0 ? (d.words[0] = 0, d.length = 1) : m > 0 ? d.isub(this.p) : d.strip !== void 0 ? d.strip() : d._strip(), d;
      }, X.prototype.split = function(u, d) {
        u.iushrn(this.n, 0, d);
      }, X.prototype.imulK = function(u) {
        return u.imul(this.k);
      };
      function nt() {
        X.call(
          this,
          "k256",
          "ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffe fffffc2f"
        );
      }
      i(nt, X), nt.prototype.split = function(u, d) {
        for (var p = 4194303, m = Math.min(u.length, 9), w = 0; w < m; w++)
          d.words[w] = u.words[w];
        if (d.length = m, u.length <= 9) {
          u.words[0] = 0, u.length = 1;
          return;
        }
        var B = u.words[9];
        for (d.words[d.length++] = B & p, w = 10; w < u.length; w++) {
          var F = u.words[w] | 0;
          u.words[w - 10] = (F & p) << 4 | B >>> 22, B = F;
        }
        B >>>= 22, u.words[w - 10] = B, B === 0 && u.length > 10 ? u.length -= 10 : u.length -= 9;
      }, nt.prototype.imulK = function(u) {
        u.words[u.length] = 0, u.words[u.length + 1] = 0, u.length += 2;
        for (var d = 0, p = 0; p < u.length; p++) {
          var m = u.words[p] | 0;
          d += m * 977, u.words[p] = d & 67108863, d = m * 64 + (d / 67108864 | 0);
        }
        return u.words[u.length - 1] === 0 && (u.length--, u.words[u.length - 1] === 0 && u.length--), u;
      };
      function C() {
        X.call(
          this,
          "p224",
          "ffffffff ffffffff ffffffff ffffffff 00000000 00000000 00000001"
        );
      }
      i(C, X);
      function M() {
        X.call(
          this,
          "p192",
          "ffffffff ffffffff ffffffff fffffffe ffffffff ffffffff"
        );
      }
      i(M, X);
      function x() {
        X.call(
          this,
          "25519",
          "7fffffffffffffff ffffffffffffffff ffffffffffffffff ffffffffffffffed"
        );
      }
      i(x, X), x.prototype.imulK = function(u) {
        for (var d = 0, p = 0; p < u.length; p++) {
          var m = (u.words[p] | 0) * 19 + d, w = m & 67108863;
          m >>>= 26, u.words[p] = w, d = m;
        }
        return d !== 0 && (u.words[u.length++] = d), u;
      }, s._prime = function(u) {
        if (K[u]) return K[u];
        var d;
        if (u === "k256")
          d = new nt();
        else if (u === "p224")
          d = new C();
        else if (u === "p192")
          d = new M();
        else if (u === "p25519")
          d = new x();
        else
          throw new Error("Unknown prime " + u);
        return K[u] = d, d;
      };
      function U(b) {
        if (typeof b == "string") {
          var u = s._prime(b);
          this.m = u.p, this.prime = u;
        } else
          n(b.gtn(1), "modulus must be greater than 1"), this.m = b, this.prime = null;
      }
      U.prototype._verify1 = function(u) {
        n(u.negative === 0, "red works only with positives"), n(u.red, "red works only with red numbers");
      }, U.prototype._verify2 = function(u, d) {
        n((u.negative | d.negative) === 0, "red works only with positives"), n(
          u.red && u.red === d.red,
          "red works only with red numbers"
        );
      }, U.prototype.imod = function(u) {
        return this.prime ? this.prime.ireduce(u)._forceRed(this) : (v(u, u.umod(this.m)._forceRed(this)), u);
      }, U.prototype.neg = function(u) {
        return u.isZero() ? u.clone() : this.m.sub(u)._forceRed(this);
      }, U.prototype.add = function(u, d) {
        this._verify2(u, d);
        var p = u.add(d);
        return p.cmp(this.m) >= 0 && p.isub(this.m), p._forceRed(this);
      }, U.prototype.iadd = function(u, d) {
        this._verify2(u, d);
        var p = u.iadd(d);
        return p.cmp(this.m) >= 0 && p.isub(this.m), p;
      }, U.prototype.sub = function(u, d) {
        this._verify2(u, d);
        var p = u.sub(d);
        return p.cmpn(0) < 0 && p.iadd(this.m), p._forceRed(this);
      }, U.prototype.isub = function(u, d) {
        this._verify2(u, d);
        var p = u.isub(d);
        return p.cmpn(0) < 0 && p.iadd(this.m), p;
      }, U.prototype.shl = function(u, d) {
        return this._verify1(u), this.imod(u.ushln(d));
      }, U.prototype.imul = function(u, d) {
        return this._verify2(u, d), this.imod(u.imul(d));
      }, U.prototype.mul = function(u, d) {
        return this._verify2(u, d), this.imod(u.mul(d));
      }, U.prototype.isqr = function(u) {
        return this.imul(u, u.clone());
      }, U.prototype.sqr = function(u) {
        return this.mul(u, u);
      }, U.prototype.sqrt = function(u) {
        if (u.isZero()) return u.clone();
        var d = this.m.andln(3);
        if (n(d % 2 === 1), d === 3) {
          var p = this.m.add(new s(1)).iushrn(2);
          return this.pow(u, p);
        }
        for (var m = this.m.subn(1), w = 0; !m.isZero() && m.andln(1) === 0; )
          w++, m.iushrn(1);
        n(!m.isZero());
        var B = new s(1).toRed(this), F = B.redNeg(), I = this.m.subn(1).iushrn(1), f = this.m.bitLength();
        for (f = new s(2 * f * f).toRed(this); this.pow(f, I).cmp(F) !== 0; )
          f.redIAdd(F);
        for (var g = this.pow(f, m), S = this.pow(u, m.addn(1).iushrn(1)), L = this.pow(u, m), H = w; L.cmp(B) !== 0; ) {
          for (var J = L, tt = 0; J.cmp(B) !== 0; tt++)
            J = J.redSqr();
          n(tt < H);
          var st = this.pow(g, new s(1).iushln(H - tt - 1));
          S = S.redMul(st), g = st.redSqr(), L = L.redMul(g), H = tt;
        }
        return S;
      }, U.prototype.invm = function(u) {
        var d = u._invmp(this.m);
        return d.negative !== 0 ? (d.negative = 0, this.imod(d).redNeg()) : this.imod(d);
      }, U.prototype.pow = function(u, d) {
        if (d.isZero()) return new s(1).toRed(this);
        if (d.cmpn(1) === 0) return u.clone();
        var p = 4, m = new Array(1 << p);
        m[0] = new s(1).toRed(this), m[1] = u;
        for (var w = 2; w < m.length; w++)
          m[w] = this.mul(m[w - 1], u);
        var B = m[0], F = 0, I = 0, f = d.bitLength() % 26;
        for (f === 0 && (f = 26), w = d.length - 1; w >= 0; w--) {
          for (var g = d.words[w], S = f - 1; S >= 0; S--) {
            var L = g >> S & 1;
            if (B !== m[0] && (B = this.sqr(B)), L === 0 && F === 0) {
              I = 0;
              continue;
            }
            F <<= 1, F |= L, I++, !(I !== p && (w !== 0 || S !== 0)) && (B = this.mul(B, m[F]), I = 0, F = 0);
          }
          f = 26;
        }
        return B;
      }, U.prototype.convertTo = function(u) {
        var d = u.umod(this.m);
        return d === u ? d.clone() : d;
      }, U.prototype.convertFrom = function(u) {
        var d = u.clone();
        return d.red = null, d;
      }, s.mont = function(u) {
        return new R(u);
      };
      function R(b) {
        U.call(this, b), this.shift = this.m.bitLength(), this.shift % 26 !== 0 && (this.shift += 26 - this.shift % 26), this.r = new s(1).iushln(this.shift), this.r2 = this.imod(this.r.sqr()), this.rinv = this.r._invmp(this.m), this.minv = this.rinv.mul(this.r).isubn(1).div(this.m), this.minv = this.minv.umod(this.r), this.minv = this.r.sub(this.minv);
      }
      i(R, U), R.prototype.convertTo = function(u) {
        return this.imod(u.ushln(this.shift));
      }, R.prototype.convertFrom = function(u) {
        var d = this.imod(u.mul(this.rinv));
        return d.red = null, d;
      }, R.prototype.imul = function(u, d) {
        if (u.isZero() || d.isZero())
          return u.words[0] = 0, u.length = 1, u;
        var p = u.imul(d), m = p.maskn(this.shift).mul(this.minv).imaskn(this.shift).mul(this.m), w = p.isub(m).iushrn(this.shift), B = w;
        return w.cmp(this.m) >= 0 ? B = w.isub(this.m) : w.cmpn(0) < 0 && (B = w.iadd(this.m)), B._forceRed(this);
      }, R.prototype.mul = function(u, d) {
        if (u.isZero() || d.isZero()) return new s(0)._forceRed(this);
        var p = u.mul(d), m = p.maskn(this.shift).mul(this.minv).imaskn(this.shift).mul(this.m), w = p.isub(m).iushrn(this.shift), B = w;
        return w.cmp(this.m) >= 0 ? B = w.isub(this.m) : w.cmpn(0) < 0 && (B = w.iadd(this.m)), B._forceRed(this);
      }, R.prototype.invm = function(u) {
        var d = this.imod(u._invmp(this.m).mul(this.r2));
        return d._forceRed(this);
      };
    })(r, ph);
  }(Xr)), Xr.exports;
}
var wh = ac();
const ta = /* @__PURE__ */ Rr(wh);
var Hr = { exports: {} };
/*! safe-buffer. MIT License. Feross Aboukhadijeh <https://feross.org/opensource> */
var ea;
function yh() {
  return ea || (ea = 1, function(r, t) {
    var e = yi(), n = e.Buffer;
    function i(l, h) {
      for (var A in l)
        h[A] = l[A];
    }
    n.from && n.alloc && n.allocUnsafe && n.allocUnsafeSlow ? r.exports = e : (i(e, t), t.Buffer = s);
    function s(l, h, A) {
      return n(l, h, A);
    }
    s.prototype = Object.create(n.prototype), i(n, s), s.from = function(l, h, A) {
      if (typeof l == "number")
        throw new TypeError("Argument must not be a number");
      return n(l, h, A);
    }, s.alloc = function(l, h, A) {
      if (typeof l != "number")
        throw new TypeError("Argument must be a number");
      var E = n(l);
      return h !== void 0 ? typeof A == "string" ? E.fill(h, A) : E.fill(h) : E.fill(0), E;
    }, s.allocUnsafe = function(l) {
      if (typeof l != "number")
        throw new TypeError("Argument must be a number");
      return n(l);
    }, s.allocUnsafeSlow = function(l) {
      if (typeof l != "number")
        throw new TypeError("Argument must be a number");
      return e.SlowBuffer(l);
    };
  }(Hr, Hr.exports)), Hr.exports;
}
var ls, na;
function mh() {
  if (na) return ls;
  na = 1;
  var r = yh().Buffer;
  function t(e) {
    if (e.length >= 255)
      throw new TypeError("Alphabet too long");
    for (var n = new Uint8Array(256), i = 0; i < n.length; i++)
      n[i] = 255;
    for (var s = 0; s < e.length; s++) {
      var l = e.charAt(s), h = l.charCodeAt(0);
      if (n[h] !== 255)
        throw new TypeError(l + " is ambiguous");
      n[h] = s;
    }
    var A = e.length, E = e.charAt(0), v = Math.log(A) / Math.log(256), T = Math.log(256) / Math.log(A);
    function P(D) {
      if ((Array.isArray(D) || D instanceof Uint8Array) && (D = r.from(D)), !r.isBuffer(D))
        throw new TypeError("Expected Buffer");
      if (D.length === 0)
        return "";
      for (var N = 0, Z = 0, Q = 0, W = D.length; Q !== W && D[Q] === 0; )
        Q++, N++;
      for (var V = (W - Q) * T + 1 >>> 0, K = new Uint8Array(V); Q !== W; ) {
        for (var X = D[Q], nt = 0, C = V - 1; (X !== 0 || nt < Z) && C !== -1; C--, nt++)
          X += 256 * K[C] >>> 0, K[C] = X % A >>> 0, X = X / A >>> 0;
        if (X !== 0)
          throw new Error("Non-zero carry");
        Z = nt, Q++;
      }
      for (var M = V - Z; M !== V && K[M] === 0; )
        M++;
      for (var x = E.repeat(N); M < V; ++M)
        x += e.charAt(K[M]);
      return x;
    }
    function O(D) {
      if (typeof D != "string")
        throw new TypeError("Expected String");
      if (D.length === 0)
        return r.alloc(0);
      for (var N = 0, Z = 0, Q = 0; D[N] === E; )
        Z++, N++;
      for (var W = (D.length - N) * v + 1 >>> 0, V = new Uint8Array(W); N < D.length; ) {
        var K = D.charCodeAt(N);
        if (K > 255)
          return;
        var X = n[K];
        if (X === 255)
          return;
        for (var nt = 0, C = W - 1; (X !== 0 || nt < Q) && C !== -1; C--, nt++)
          X += A * V[C] >>> 0, V[C] = X % 256 >>> 0, X = X / 256 >>> 0;
        if (X !== 0)
          throw new Error("Non-zero carry");
        Q = nt, N++;
      }
      for (var M = W - Q; M !== W && V[M] === 0; )
        M++;
      var x = r.allocUnsafe(Z + (W - M));
      x.fill(0, 0, Z);
      for (var U = Z; M !== W; )
        x[U++] = V[M++];
      return x;
    }
    function j(D) {
      var N = O(D);
      if (N)
        return N;
      throw new Error("Non-base" + A + " character");
    }
    return {
      encode: P,
      decodeUnsafe: O,
      decode: j
    };
  }
  return ls = t, ls;
}
var hs, ra;
function cc() {
  if (ra) return hs;
  ra = 1;
  var r = mh(), t = "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz";
  return hs = r(t), hs;
}
var bh = cc();
const Ee = /* @__PURE__ */ Rr(bh);
var kt = {};
function un(r, t, e) {
  return t <= r && r <= e;
}
function vi(r) {
  if (r === void 0) return {};
  if (r === Object(r)) return r;
  throw TypeError("Could not convert argument to dictionary");
}
function Eh(r) {
  for (var t = String(r), e = t.length, n = 0, i = []; n < e; ) {
    var s = t.charCodeAt(n);
    if (s < 55296 || s > 57343)
      i.push(s);
    else if (56320 <= s && s <= 57343)
      i.push(65533);
    else if (55296 <= s && s <= 56319)
      if (n === e - 1)
        i.push(65533);
      else {
        var l = r.charCodeAt(n + 1);
        if (56320 <= l && l <= 57343) {
          var h = s & 1023, A = l & 1023;
          i.push(65536 + (h << 10) + A), n += 1;
        } else
          i.push(65533);
      }
    n += 1;
  }
  return i;
}
function vh(r) {
  for (var t = "", e = 0; e < r.length; ++e) {
    var n = r[e];
    n <= 65535 ? t += String.fromCharCode(n) : (n -= 65536, t += String.fromCharCode(
      (n >> 10) + 55296,
      (n & 1023) + 56320
    ));
  }
  return t;
}
var li = -1;
function lo(r) {
  this.tokens = [].slice.call(r);
}
lo.prototype = {
  /**
   * @return {boolean} True if end-of-stream has been hit.
   */
  endOfStream: function() {
    return !this.tokens.length;
  },
  /**
   * When a token is read from a stream, the first token in the
   * stream must be returned and subsequently removed, and
   * end-of-stream must be returned otherwise.
   *
   * @return {number} Get the next token from the stream, or
   * end_of_stream.
   */
  read: function() {
    return this.tokens.length ? this.tokens.shift() : li;
  },
  /**
   * When one or more tokens are prepended to a stream, those tokens
   * must be inserted, in given order, before the first token in the
   * stream.
   *
   * @param {(number|!Array.<number>)} token The token(s) to prepend to the stream.
   */
  prepend: function(r) {
    if (Array.isArray(r))
      for (var t = (
        /**@type {!Array.<number>}*/
        r
      ); t.length; )
        this.tokens.unshift(t.pop());
    else
      this.tokens.unshift(r);
  },
  /**
   * When one or more tokens are pushed to a stream, those tokens
   * must be inserted, in given order, after the last token in the
   * stream.
   *
   * @param {(number|!Array.<number>)} token The tokens(s) to prepend to the stream.
   */
  push: function(r) {
    if (Array.isArray(r))
      for (var t = (
        /**@type {!Array.<number>}*/
        r
      ); t.length; )
        this.tokens.push(t.shift());
    else
      this.tokens.push(r);
  }
};
var ar = -1;
function fs(r, t) {
  if (r)
    throw TypeError("Decoder error");
  return t || 65533;
}
var hi = "utf-8";
function fi(r, t) {
  if (!(this instanceof fi))
    return new fi(r, t);
  if (r = r !== void 0 ? String(r).toLowerCase() : hi, r !== hi)
    throw new Error("Encoding not supported. Only utf-8 is supported");
  t = vi(t), this._streaming = !1, this._BOMseen = !1, this._decoder = null, this._fatal = !!t.fatal, this._ignoreBOM = !!t.ignoreBOM, Object.defineProperty(this, "encoding", { value: "utf-8" }), Object.defineProperty(this, "fatal", { value: this._fatal }), Object.defineProperty(this, "ignoreBOM", { value: this._ignoreBOM });
}
fi.prototype = {
  /**
   * @param {ArrayBufferView=} input The buffer of bytes to decode.
   * @param {Object=} options
   * @return {string} The decoded string.
   */
  decode: function(t, e) {
    var n;
    typeof t == "object" && t instanceof ArrayBuffer ? n = new Uint8Array(t) : typeof t == "object" && "buffer" in t && t.buffer instanceof ArrayBuffer ? n = new Uint8Array(
      t.buffer,
      t.byteOffset,
      t.byteLength
    ) : n = new Uint8Array(0), e = vi(e), this._streaming || (this._decoder = new Ih({ fatal: this._fatal }), this._BOMseen = !1), this._streaming = !!e.stream;
    for (var i = new lo(n), s = [], l; !i.endOfStream() && (l = this._decoder.handler(i, i.read()), l !== ar); )
      l !== null && (Array.isArray(l) ? s.push.apply(
        s,
        /**@type {!Array.<number>}*/
        l
      ) : s.push(l));
    if (!this._streaming) {
      do {
        if (l = this._decoder.handler(i, i.read()), l === ar)
          break;
        l !== null && (Array.isArray(l) ? s.push.apply(
          s,
          /**@type {!Array.<number>}*/
          l
        ) : s.push(l));
      } while (!i.endOfStream());
      this._decoder = null;
    }
    return s.length && ["utf-8"].indexOf(this.encoding) !== -1 && !this._ignoreBOM && !this._BOMseen && (s[0] === 65279 ? (this._BOMseen = !0, s.shift()) : this._BOMseen = !0), vh(s);
  }
};
function di(r, t) {
  if (!(this instanceof di))
    return new di(r, t);
  if (r = r !== void 0 ? String(r).toLowerCase() : hi, r !== hi)
    throw new Error("Encoding not supported. Only utf-8 is supported");
  t = vi(t), this._streaming = !1, this._encoder = null, this._options = { fatal: !!t.fatal }, Object.defineProperty(this, "encoding", { value: "utf-8" });
}
di.prototype = {
  /**
   * @param {string=} opt_string The string to encode.
   * @param {Object=} options
   * @return {Uint8Array} Encoded bytes, as a Uint8Array.
   */
  encode: function(t, e) {
    t = t ? String(t) : "", e = vi(e), this._streaming || (this._encoder = new Mh(this._options)), this._streaming = !!e.stream;
    for (var n = [], i = new lo(Eh(t)), s; !i.endOfStream() && (s = this._encoder.handler(i, i.read()), s !== ar); )
      Array.isArray(s) ? n.push.apply(
        n,
        /**@type {!Array.<number>}*/
        s
      ) : n.push(s);
    if (!this._streaming) {
      for (; s = this._encoder.handler(i, i.read()), s !== ar; )
        Array.isArray(s) ? n.push.apply(
          n,
          /**@type {!Array.<number>}*/
          s
        ) : n.push(s);
      this._encoder = null;
    }
    return new Uint8Array(n);
  }
};
function Ih(r) {
  var t = r.fatal, e = 0, n = 0, i = 0, s = 128, l = 191;
  this.handler = function(h, A) {
    if (A === li && i !== 0)
      return i = 0, fs(t);
    if (A === li)
      return ar;
    if (i === 0) {
      if (un(A, 0, 127))
        return A;
      if (un(A, 194, 223))
        i = 1, e = A - 192;
      else if (un(A, 224, 239))
        A === 224 && (s = 160), A === 237 && (l = 159), i = 2, e = A - 224;
      else if (un(A, 240, 244))
        A === 240 && (s = 144), A === 244 && (l = 143), i = 3, e = A - 240;
      else
        return fs(t);
      return e = e << 6 * i, null;
    }
    if (!un(A, s, l))
      return e = i = n = 0, s = 128, l = 191, h.prepend(A), fs(t);
    if (s = 128, l = 191, n += 1, e += A - 128 << 6 * (i - n), n !== i)
      return null;
    var E = e;
    return e = i = n = 0, E;
  };
}
function Mh(r) {
  r.fatal, this.handler = function(t, e) {
    if (e === li)
      return ar;
    if (un(e, 0, 127))
      return e;
    var n, i;
    un(e, 128, 2047) ? (n = 1, i = 192) : un(e, 2048, 65535) ? (n = 2, i = 224) : un(e, 65536, 1114111) && (n = 3, i = 240);
    for (var s = [(e >> 6 * n) + i]; n > 0; ) {
      var l = e >> 6 * (n - 1);
      s.push(128 | l & 63), n -= 1;
    }
    return s;
  };
}
const Sh = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  TextDecoder: fi,
  TextEncoder: di
}, Symbol.toStringTag, { value: "Module" })), xh = /* @__PURE__ */ Ua(Sh);
var ia;
function Bh() {
  if (ia) return kt;
  ia = 1;
  var r = kt && kt.__createBinding || (Object.create ? function(M, x, U, R) {
    R === void 0 && (R = U), Object.defineProperty(M, R, { enumerable: !0, get: function() {
      return x[U];
    } });
  } : function(M, x, U, R) {
    R === void 0 && (R = U), M[R] = x[U];
  }), t = kt && kt.__setModuleDefault || (Object.create ? function(M, x) {
    Object.defineProperty(M, "default", { enumerable: !0, value: x });
  } : function(M, x) {
    M.default = x;
  }), e = kt && kt.__decorate || function(M, x, U, R) {
    var b = arguments.length, u = b < 3 ? x : R === null ? R = Object.getOwnPropertyDescriptor(x, U) : R, d;
    if (typeof Reflect == "object" && typeof Reflect.decorate == "function") u = Reflect.decorate(M, x, U, R);
    else for (var p = M.length - 1; p >= 0; p--) (d = M[p]) && (u = (b < 3 ? d(u) : b > 3 ? d(x, U, u) : d(x, U)) || u);
    return b > 3 && u && Object.defineProperty(x, U, u), u;
  }, n = kt && kt.__importStar || function(M) {
    if (M && M.__esModule) return M;
    var x = {};
    if (M != null) for (var U in M) U !== "default" && Object.hasOwnProperty.call(M, U) && r(x, M, U);
    return t(x, M), x;
  }, i = kt && kt.__importDefault || function(M) {
    return M && M.__esModule ? M : { default: M };
  };
  Object.defineProperty(kt, "__esModule", { value: !0 }), kt.deserializeUnchecked = kt.deserialize = kt.serialize = kt.BinaryReader = kt.BinaryWriter = kt.BorshError = kt.baseDecode = kt.baseEncode = void 0;
  const s = i(ac()), l = i(cc()), h = n(xh), A = typeof TextDecoder != "function" ? h.TextDecoder : TextDecoder, E = new A("utf-8", { fatal: !0 });
  function v(M) {
    return typeof M == "string" && (M = ft.Buffer.from(M, "utf8")), l.default.encode(ft.Buffer.from(M));
  }
  kt.baseEncode = v;
  function T(M) {
    return ft.Buffer.from(l.default.decode(M));
  }
  kt.baseDecode = T;
  const P = 1024;
  class O extends Error {
    constructor(x) {
      super(x), this.fieldPath = [], this.originalMessage = x;
    }
    addToFieldPath(x) {
      this.fieldPath.splice(0, 0, x), this.message = this.originalMessage + ": " + this.fieldPath.join(".");
    }
  }
  kt.BorshError = O;
  class j {
    constructor() {
      this.buf = ft.Buffer.alloc(P), this.length = 0;
    }
    maybeResize() {
      this.buf.length < 16 + this.length && (this.buf = ft.Buffer.concat([this.buf, ft.Buffer.alloc(P)]));
    }
    writeU8(x) {
      this.maybeResize(), this.buf.writeUInt8(x, this.length), this.length += 1;
    }
    writeU16(x) {
      this.maybeResize(), this.buf.writeUInt16LE(x, this.length), this.length += 2;
    }
    writeU32(x) {
      this.maybeResize(), this.buf.writeUInt32LE(x, this.length), this.length += 4;
    }
    writeU64(x) {
      this.maybeResize(), this.writeBuffer(ft.Buffer.from(new s.default(x).toArray("le", 8)));
    }
    writeU128(x) {
      this.maybeResize(), this.writeBuffer(ft.Buffer.from(new s.default(x).toArray("le", 16)));
    }
    writeU256(x) {
      this.maybeResize(), this.writeBuffer(ft.Buffer.from(new s.default(x).toArray("le", 32)));
    }
    writeU512(x) {
      this.maybeResize(), this.writeBuffer(ft.Buffer.from(new s.default(x).toArray("le", 64)));
    }
    writeBuffer(x) {
      this.buf = ft.Buffer.concat([
        ft.Buffer.from(this.buf.subarray(0, this.length)),
        x,
        ft.Buffer.alloc(P)
      ]), this.length += x.length;
    }
    writeString(x) {
      this.maybeResize();
      const U = ft.Buffer.from(x, "utf8");
      this.writeU32(U.length), this.writeBuffer(U);
    }
    writeFixedArray(x) {
      this.writeBuffer(ft.Buffer.from(x));
    }
    writeArray(x, U) {
      this.maybeResize(), this.writeU32(x.length);
      for (const R of x)
        this.maybeResize(), U(R);
    }
    toArray() {
      return this.buf.subarray(0, this.length);
    }
  }
  kt.BinaryWriter = j;
  function D(M, x, U) {
    const R = U.value;
    U.value = function(...b) {
      try {
        return R.apply(this, b);
      } catch (u) {
        if (u instanceof RangeError) {
          const d = u.code;
          if (["ERR_BUFFER_OUT_OF_BOUNDS", "ERR_OUT_OF_RANGE"].indexOf(d) >= 0)
            throw new O("Reached the end of buffer when deserializing");
        }
        throw u;
      }
    };
  }
  class N {
    constructor(x) {
      this.buf = x, this.offset = 0;
    }
    readU8() {
      const x = this.buf.readUInt8(this.offset);
      return this.offset += 1, x;
    }
    readU16() {
      const x = this.buf.readUInt16LE(this.offset);
      return this.offset += 2, x;
    }
    readU32() {
      const x = this.buf.readUInt32LE(this.offset);
      return this.offset += 4, x;
    }
    readU64() {
      const x = this.readBuffer(8);
      return new s.default(x, "le");
    }
    readU128() {
      const x = this.readBuffer(16);
      return new s.default(x, "le");
    }
    readU256() {
      const x = this.readBuffer(32);
      return new s.default(x, "le");
    }
    readU512() {
      const x = this.readBuffer(64);
      return new s.default(x, "le");
    }
    readBuffer(x) {
      if (this.offset + x > this.buf.length)
        throw new O(`Expected buffer length ${x} isn't within bounds`);
      const U = this.buf.slice(this.offset, this.offset + x);
      return this.offset += x, U;
    }
    readString() {
      const x = this.readU32(), U = this.readBuffer(x);
      try {
        return E.decode(U);
      } catch (R) {
        throw new O(`Error decoding UTF-8 string: ${R}`);
      }
    }
    readFixedArray(x) {
      return new Uint8Array(this.readBuffer(x));
    }
    readArray(x) {
      const U = this.readU32(), R = Array();
      for (let b = 0; b < U; ++b)
        R.push(x());
      return R;
    }
  }
  e([
    D
  ], N.prototype, "readU8", null), e([
    D
  ], N.prototype, "readU16", null), e([
    D
  ], N.prototype, "readU32", null), e([
    D
  ], N.prototype, "readU64", null), e([
    D
  ], N.prototype, "readU128", null), e([
    D
  ], N.prototype, "readU256", null), e([
    D
  ], N.prototype, "readU512", null), e([
    D
  ], N.prototype, "readString", null), e([
    D
  ], N.prototype, "readFixedArray", null), e([
    D
  ], N.prototype, "readArray", null), kt.BinaryReader = N;
  function Z(M) {
    return M.charAt(0).toUpperCase() + M.slice(1);
  }
  function Q(M, x, U, R, b) {
    try {
      if (typeof R == "string")
        b[`write${Z(R)}`](U);
      else if (R instanceof Array)
        if (typeof R[0] == "number") {
          if (U.length !== R[0])
            throw new O(`Expecting byte array of length ${R[0]}, but got ${U.length} bytes`);
          b.writeFixedArray(U);
        } else if (R.length === 2 && typeof R[1] == "number") {
          if (U.length !== R[1])
            throw new O(`Expecting byte array of length ${R[1]}, but got ${U.length} bytes`);
          for (let u = 0; u < R[1]; u++)
            Q(M, null, U[u], R[0], b);
        } else
          b.writeArray(U, (u) => {
            Q(M, x, u, R[0], b);
          });
      else if (R.kind !== void 0)
        switch (R.kind) {
          case "option": {
            U == null ? b.writeU8(0) : (b.writeU8(1), Q(M, x, U, R.type, b));
            break;
          }
          case "map": {
            b.writeU32(U.size), U.forEach((u, d) => {
              Q(M, x, d, R.key, b), Q(M, x, u, R.value, b);
            });
            break;
          }
          default:
            throw new O(`FieldType ${R} unrecognized`);
        }
      else
        W(M, U, b);
    } catch (u) {
      throw u instanceof O && u.addToFieldPath(x), u;
    }
  }
  function W(M, x, U) {
    if (typeof x.borshSerialize == "function") {
      x.borshSerialize(U);
      return;
    }
    const R = M.get(x.constructor);
    if (!R)
      throw new O(`Class ${x.constructor.name} is missing in schema`);
    if (R.kind === "struct")
      R.fields.map(([b, u]) => {
        Q(M, b, x[b], u, U);
      });
    else if (R.kind === "enum") {
      const b = x[R.field];
      for (let u = 0; u < R.values.length; ++u) {
        const [d, p] = R.values[u];
        if (d === b) {
          U.writeU8(u), Q(M, d, x[d], p, U);
          break;
        }
      }
    } else
      throw new O(`Unexpected schema kind: ${R.kind} for ${x.constructor.name}`);
  }
  function V(M, x, U = j) {
    const R = new U();
    return W(M, x, R), R.toArray();
  }
  kt.serialize = V;
  function K(M, x, U, R) {
    try {
      if (typeof U == "string")
        return R[`read${Z(U)}`]();
      if (U instanceof Array) {
        if (typeof U[0] == "number")
          return R.readFixedArray(U[0]);
        if (typeof U[1] == "number") {
          const b = [];
          for (let u = 0; u < U[1]; u++)
            b.push(K(M, null, U[0], R));
          return b;
        } else
          return R.readArray(() => K(M, x, U[0], R));
      }
      if (U.kind === "option")
        return R.readU8() ? K(M, x, U.type, R) : void 0;
      if (U.kind === "map") {
        let b = /* @__PURE__ */ new Map();
        const u = R.readU32();
        for (let d = 0; d < u; d++) {
          const p = K(M, x, U.key, R), m = K(M, x, U.value, R);
          b.set(p, m);
        }
        return b;
      }
      return X(M, U, R);
    } catch (b) {
      throw b instanceof O && b.addToFieldPath(x), b;
    }
  }
  function X(M, x, U) {
    if (typeof x.borshDeserialize == "function")
      return x.borshDeserialize(U);
    const R = M.get(x);
    if (!R)
      throw new O(`Class ${x.name} is missing in schema`);
    if (R.kind === "struct") {
      const b = {};
      for (const [u, d] of M.get(x).fields)
        b[u] = K(M, u, d, U);
      return new x(b);
    }
    if (R.kind === "enum") {
      const b = U.readU8();
      if (b >= R.values.length)
        throw new O(`Enum index: ${b} is out of range`);
      const [u, d] = R.values[b], p = K(M, u, d, U);
      return new x({ [u]: p });
    }
    throw new O(`Unexpected schema kind: ${R.kind} for ${x.constructor.name}`);
  }
  function nt(M, x, U, R = N) {
    const b = new R(U), u = X(M, x, b);
    if (b.offset < U.length)
      throw new O(`Unexpected ${U.length - b.offset} bytes after deserialized data`);
    return u;
  }
  kt.deserialize = nt;
  function C(M, x, U, R = N) {
    const b = new R(U);
    return X(M, x, b);
  }
  return kt.deserializeUnchecked = C, kt;
}
var ds = Bh(), G = {}, sa;
function Ch() {
  if (sa) return G;
  sa = 1, Object.defineProperty(G, "__esModule", { value: !0 }), G.s16 = G.s8 = G.nu64be = G.u48be = G.u40be = G.u32be = G.u24be = G.u16be = G.nu64 = G.u48 = G.u40 = G.u32 = G.u24 = G.u16 = G.u8 = G.offset = G.greedy = G.Constant = G.UTF8 = G.CString = G.Blob = G.Boolean = G.BitField = G.BitStructure = G.VariantLayout = G.Union = G.UnionLayoutDiscriminator = G.UnionDiscriminator = G.Structure = G.Sequence = G.DoubleBE = G.Double = G.FloatBE = G.Float = G.NearInt64BE = G.NearInt64 = G.NearUInt64BE = G.NearUInt64 = G.IntBE = G.Int = G.UIntBE = G.UInt = G.OffsetLayout = G.GreedyCount = G.ExternalLayout = G.bindConstructorLayout = G.nameWithProperty = G.Layout = G.uint8ArrayToBuffer = G.checkUint8Array = void 0, G.constant = G.utf8 = G.cstr = G.blob = G.unionLayoutDiscriminator = G.union = G.seq = G.bits = G.struct = G.f64be = G.f64 = G.f32be = G.f32 = G.ns64be = G.s48be = G.s40be = G.s32be = G.s24be = G.s16be = G.ns64 = G.s48 = G.s40 = G.s32 = G.s24 = void 0;
  const r = yi();
  function t(f) {
    if (!(f instanceof Uint8Array))
      throw new TypeError("b must be a Uint8Array");
  }
  G.checkUint8Array = t;
  function e(f) {
    return t(f), r.Buffer.from(f.buffer, f.byteOffset, f.length);
  }
  G.uint8ArrayToBuffer = e;
  let n = class {
    constructor(g, S) {
      if (!Number.isInteger(g))
        throw new TypeError("span must be an integer");
      this.span = g, this.property = S;
    }
    /** Function to create an Object into which decoded properties will
     * be written.
     *
     * Used only for layouts that {@link Layout#decode|decode} to Object
     * instances, which means:
     * * {@link Structure}
     * * {@link Union}
     * * {@link VariantLayout}
     * * {@link BitStructure}
     *
     * If left undefined the JavaScript representation of these layouts
     * will be Object instances.
     *
     * See {@link bindConstructorLayout}.
     */
    makeDestinationObject() {
      return {};
    }
    /**
     * Calculate the span of a specific instance of a layout.
     *
     * @param {Uint8Array} b - the buffer that contains an encoded instance.
     *
     * @param {Number} [offset] - the offset at which the encoded instance
     * starts.  If absent a zero offset is inferred.
     *
     * @return {Number} - the number of bytes covered by the layout
     * instance.  If this method is not overridden in a subclass the
     * definition-time constant {@link Layout#span|span} will be
     * returned.
     *
     * @throws {RangeError} - if the length of the value cannot be
     * determined.
     */
    getSpan(g, S) {
      if (0 > this.span)
        throw new RangeError("indeterminate span");
      return this.span;
    }
    /**
     * Replicate the layout using a new property.
     *
     * This function must be used to get a structurally-equivalent layout
     * with a different name since all {@link Layout} instances are
     * immutable.
     *
     * **NOTE** This is a shallow copy.  All fields except {@link
     * Layout#property|property} are strictly equal to the origin layout.
     *
     * @param {String} property - the value for {@link
     * Layout#property|property} in the replica.
     *
     * @returns {Layout} - the copy with {@link Layout#property|property}
     * set to `property`.
     */
    replicate(g) {
      const S = Object.create(this.constructor.prototype);
      return Object.assign(S, this), S.property = g, S;
    }
    /**
     * Create an object from layout properties and an array of values.
     *
     * **NOTE** This function returns `undefined` if invoked on a layout
     * that does not return its value as an Object.  Objects are
     * returned for things that are a {@link Structure}, which includes
     * {@link VariantLayout|variant layouts} if they are structures, and
     * excludes {@link Union}s.  If you want this feature for a union
     * you must use {@link Union.getVariant|getVariant} to select the
     * desired layout.
     *
     * @param {Array} values - an array of values that correspond to the
     * default order for properties.  As with {@link Layout#decode|decode}
     * layout elements that have no property name are skipped when
     * iterating over the array values.  Only the top-level properties are
     * assigned; arguments are not assigned to properties of contained
     * layouts.  Any unused values are ignored.
     *
     * @return {(Object|undefined)}
     */
    fromArray(g) {
    }
  };
  G.Layout = n;
  function i(f, g) {
    return g.property ? f + "[" + g.property + "]" : f;
  }
  G.nameWithProperty = i;
  function s(f, g) {
    if (typeof f != "function")
      throw new TypeError("Class must be constructor");
    if (Object.prototype.hasOwnProperty.call(f, "layout_"))
      throw new Error("Class is already bound to a layout");
    if (!(g && g instanceof n))
      throw new TypeError("layout must be a Layout");
    if (Object.prototype.hasOwnProperty.call(g, "boundConstructor_"))
      throw new Error("layout is already bound to a constructor");
    f.layout_ = g, g.boundConstructor_ = f, g.makeDestinationObject = () => new f(), Object.defineProperty(f.prototype, "encode", {
      value(S, L) {
        return g.encode(this, S, L);
      },
      writable: !0
    }), Object.defineProperty(f, "decode", {
      value(S, L) {
        return g.decode(S, L);
      },
      writable: !0
    });
  }
  G.bindConstructorLayout = s;
  class l extends n {
    /**
     * Return `true` iff the external layout decodes to an unsigned
     * integer layout.
     *
     * In that case it can be used as the source of {@link
     * Sequence#count|Sequence counts}, {@link Blob#length|Blob lengths},
     * or as {@link UnionLayoutDiscriminator#layout|external union
     * discriminators}.
     *
     * @abstract
     */
    isCount() {
      throw new Error("ExternalLayout is abstract");
    }
  }
  G.ExternalLayout = l;
  class h extends l {
    constructor(g = 1, S) {
      if (!Number.isInteger(g) || 0 >= g)
        throw new TypeError("elementSpan must be a (positive) integer");
      super(-1, S), this.elementSpan = g;
    }
    /** @override */
    isCount() {
      return !0;
    }
    /** @override */
    decode(g, S = 0) {
      t(g);
      const L = g.length - S;
      return Math.floor(L / this.elementSpan);
    }
    /** @override */
    encode(g, S, L) {
      return 0;
    }
  }
  G.GreedyCount = h;
  class A extends l {
    constructor(g, S = 0, L) {
      if (!(g instanceof n))
        throw new TypeError("layout must be a Layout");
      if (!Number.isInteger(S))
        throw new TypeError("offset must be integer or undefined");
      super(g.span, L || g.property), this.layout = g, this.offset = S;
    }
    /** @override */
    isCount() {
      return this.layout instanceof E || this.layout instanceof v;
    }
    /** @override */
    decode(g, S = 0) {
      return this.layout.decode(g, S + this.offset);
    }
    /** @override */
    encode(g, S, L = 0) {
      return this.layout.encode(g, S, L + this.offset);
    }
  }
  G.OffsetLayout = A;
  class E extends n {
    constructor(g, S) {
      if (super(g, S), 6 < this.span)
        throw new RangeError("span must not exceed 6 bytes");
    }
    /** @override */
    decode(g, S = 0) {
      return e(g).readUIntLE(S, this.span);
    }
    /** @override */
    encode(g, S, L = 0) {
      return e(S).writeUIntLE(g, L, this.span), this.span;
    }
  }
  G.UInt = E;
  class v extends n {
    constructor(g, S) {
      if (super(g, S), 6 < this.span)
        throw new RangeError("span must not exceed 6 bytes");
    }
    /** @override */
    decode(g, S = 0) {
      return e(g).readUIntBE(S, this.span);
    }
    /** @override */
    encode(g, S, L = 0) {
      return e(S).writeUIntBE(g, L, this.span), this.span;
    }
  }
  G.UIntBE = v;
  class T extends n {
    constructor(g, S) {
      if (super(g, S), 6 < this.span)
        throw new RangeError("span must not exceed 6 bytes");
    }
    /** @override */
    decode(g, S = 0) {
      return e(g).readIntLE(S, this.span);
    }
    /** @override */
    encode(g, S, L = 0) {
      return e(S).writeIntLE(g, L, this.span), this.span;
    }
  }
  G.Int = T;
  class P extends n {
    constructor(g, S) {
      if (super(g, S), 6 < this.span)
        throw new RangeError("span must not exceed 6 bytes");
    }
    /** @override */
    decode(g, S = 0) {
      return e(g).readIntBE(S, this.span);
    }
    /** @override */
    encode(g, S, L = 0) {
      return e(S).writeIntBE(g, L, this.span), this.span;
    }
  }
  G.IntBE = P;
  const O = Math.pow(2, 32);
  function j(f) {
    const g = Math.floor(f / O), S = f - g * O;
    return { hi32: g, lo32: S };
  }
  function D(f, g) {
    return f * O + g;
  }
  class N extends n {
    constructor(g) {
      super(8, g);
    }
    /** @override */
    decode(g, S = 0) {
      const L = e(g), H = L.readUInt32LE(S), J = L.readUInt32LE(S + 4);
      return D(J, H);
    }
    /** @override */
    encode(g, S, L = 0) {
      const H = j(g), J = e(S);
      return J.writeUInt32LE(H.lo32, L), J.writeUInt32LE(H.hi32, L + 4), 8;
    }
  }
  G.NearUInt64 = N;
  class Z extends n {
    constructor(g) {
      super(8, g);
    }
    /** @override */
    decode(g, S = 0) {
      const L = e(g), H = L.readUInt32BE(S), J = L.readUInt32BE(S + 4);
      return D(H, J);
    }
    /** @override */
    encode(g, S, L = 0) {
      const H = j(g), J = e(S);
      return J.writeUInt32BE(H.hi32, L), J.writeUInt32BE(H.lo32, L + 4), 8;
    }
  }
  G.NearUInt64BE = Z;
  class Q extends n {
    constructor(g) {
      super(8, g);
    }
    /** @override */
    decode(g, S = 0) {
      const L = e(g), H = L.readUInt32LE(S), J = L.readInt32LE(S + 4);
      return D(J, H);
    }
    /** @override */
    encode(g, S, L = 0) {
      const H = j(g), J = e(S);
      return J.writeUInt32LE(H.lo32, L), J.writeInt32LE(H.hi32, L + 4), 8;
    }
  }
  G.NearInt64 = Q;
  class W extends n {
    constructor(g) {
      super(8, g);
    }
    /** @override */
    decode(g, S = 0) {
      const L = e(g), H = L.readInt32BE(S), J = L.readUInt32BE(S + 4);
      return D(H, J);
    }
    /** @override */
    encode(g, S, L = 0) {
      const H = j(g), J = e(S);
      return J.writeInt32BE(H.hi32, L), J.writeUInt32BE(H.lo32, L + 4), 8;
    }
  }
  G.NearInt64BE = W;
  class V extends n {
    constructor(g) {
      super(4, g);
    }
    /** @override */
    decode(g, S = 0) {
      return e(g).readFloatLE(S);
    }
    /** @override */
    encode(g, S, L = 0) {
      return e(S).writeFloatLE(g, L), 4;
    }
  }
  G.Float = V;
  class K extends n {
    constructor(g) {
      super(4, g);
    }
    /** @override */
    decode(g, S = 0) {
      return e(g).readFloatBE(S);
    }
    /** @override */
    encode(g, S, L = 0) {
      return e(S).writeFloatBE(g, L), 4;
    }
  }
  G.FloatBE = K;
  class X extends n {
    constructor(g) {
      super(8, g);
    }
    /** @override */
    decode(g, S = 0) {
      return e(g).readDoubleLE(S);
    }
    /** @override */
    encode(g, S, L = 0) {
      return e(S).writeDoubleLE(g, L), 8;
    }
  }
  G.Double = X;
  class nt extends n {
    constructor(g) {
      super(8, g);
    }
    /** @override */
    decode(g, S = 0) {
      return e(g).readDoubleBE(S);
    }
    /** @override */
    encode(g, S, L = 0) {
      return e(S).writeDoubleBE(g, L), 8;
    }
  }
  G.DoubleBE = nt;
  class C extends n {
    constructor(g, S, L) {
      if (!(g instanceof n))
        throw new TypeError("elementLayout must be a Layout");
      if (!(S instanceof l && S.isCount() || Number.isInteger(S) && 0 <= S))
        throw new TypeError("count must be non-negative integer or an unsigned integer ExternalLayout");
      let H = -1;
      !(S instanceof l) && 0 < g.span && (H = S * g.span), super(H, L), this.elementLayout = g, this.count = S;
    }
    /** @override */
    getSpan(g, S = 0) {
      if (0 <= this.span)
        return this.span;
      let L = 0, H = this.count;
      if (H instanceof l && (H = H.decode(g, S)), 0 < this.elementLayout.span)
        L = H * this.elementLayout.span;
      else {
        let J = 0;
        for (; J < H; )
          L += this.elementLayout.getSpan(g, S + L), ++J;
      }
      return L;
    }
    /** @override */
    decode(g, S = 0) {
      const L = [];
      let H = 0, J = this.count;
      for (J instanceof l && (J = J.decode(g, S)); H < J; )
        L.push(this.elementLayout.decode(g, S)), S += this.elementLayout.getSpan(g, S), H += 1;
      return L;
    }
    /** Implement {@link Layout#encode|encode} for {@link Sequence}.
     *
     * **NOTE** If `src` is shorter than {@link Sequence#count|count} then
     * the unused space in the buffer is left unchanged.  If `src` is
     * longer than {@link Sequence#count|count} the unneeded elements are
     * ignored.
     *
     * **NOTE** If {@link Layout#count|count} is an instance of {@link
     * ExternalLayout} then the length of `src` will be encoded as the
     * count after `src` is encoded. */
    encode(g, S, L = 0) {
      const H = this.elementLayout, J = g.reduce((tt, st) => tt + H.encode(st, S, L + tt), 0);
      return this.count instanceof l && this.count.encode(g.length, S, L), J;
    }
  }
  G.Sequence = C;
  class M extends n {
    constructor(g, S, L) {
      if (!(Array.isArray(g) && g.reduce((J, tt) => J && tt instanceof n, !0)))
        throw new TypeError("fields must be array of Layout instances");
      typeof S == "boolean" && L === void 0 && (L = S, S = void 0);
      for (const J of g)
        if (0 > J.span && J.property === void 0)
          throw new Error("fields cannot contain unnamed variable-length layout");
      let H = -1;
      try {
        H = g.reduce((J, tt) => J + tt.getSpan(), 0);
      } catch {
      }
      super(H, S), this.fields = g, this.decodePrefixes = !!L;
    }
    /** @override */
    getSpan(g, S = 0) {
      if (0 <= this.span)
        return this.span;
      let L = 0;
      try {
        L = this.fields.reduce((H, J) => {
          const tt = J.getSpan(g, S);
          return S += tt, H + tt;
        }, 0);
      } catch {
        throw new RangeError("indeterminate span");
      }
      return L;
    }
    /** @override */
    decode(g, S = 0) {
      t(g);
      const L = this.makeDestinationObject();
      for (const H of this.fields)
        if (H.property !== void 0 && (L[H.property] = H.decode(g, S)), S += H.getSpan(g, S), this.decodePrefixes && g.length === S)
          break;
      return L;
    }
    /** Implement {@link Layout#encode|encode} for {@link Structure}.
     *
     * If `src` is missing a property for a member with a defined {@link
     * Layout#property|property} the corresponding region of the buffer is
     * left unmodified. */
    encode(g, S, L = 0) {
      const H = L;
      let J = 0, tt = 0;
      for (const st of this.fields) {
        let xt = st.span;
        if (tt = 0 < xt ? xt : 0, st.property !== void 0) {
          const At = g[st.property];
          At !== void 0 && (tt = st.encode(At, S, L), 0 > xt && (xt = st.getSpan(S, L)));
        }
        J = L, L += xt;
      }
      return J + tt - H;
    }
    /** @override */
    fromArray(g) {
      const S = this.makeDestinationObject();
      for (const L of this.fields)
        L.property !== void 0 && 0 < g.length && (S[L.property] = g.shift());
      return S;
    }
    /**
     * Get access to the layout of a given property.
     *
     * @param {String} property - the structure member of interest.
     *
     * @return {Layout} - the layout associated with `property`, or
     * undefined if there is no such property.
     */
    layoutFor(g) {
      if (typeof g != "string")
        throw new TypeError("property must be string");
      for (const S of this.fields)
        if (S.property === g)
          return S;
    }
    /**
     * Get the offset of a structure member.
     *
     * @param {String} property - the structure member of interest.
     *
     * @return {Number} - the offset in bytes to the start of `property`
     * within the structure, or undefined if `property` is not a field
     * within the structure.  If the property is a member but follows a
     * variable-length structure member a negative number will be
     * returned.
     */
    offsetOf(g) {
      if (typeof g != "string")
        throw new TypeError("property must be string");
      let S = 0;
      for (const L of this.fields) {
        if (L.property === g)
          return S;
        0 > L.span ? S = -1 : 0 <= S && (S += L.span);
      }
    }
  }
  G.Structure = M;
  class x {
    constructor(g) {
      this.property = g;
    }
    /** Analog to {@link Layout#decode|Layout decode} for union discriminators.
     *
     * The implementation of this method need not reference the buffer if
     * variant information is available through other means. */
    decode(g, S) {
      throw new Error("UnionDiscriminator is abstract");
    }
    /** Analog to {@link Layout#decode|Layout encode} for union discriminators.
     *
     * The implementation of this method need not store the value if
     * variant information is maintained through other means. */
    encode(g, S, L) {
      throw new Error("UnionDiscriminator is abstract");
    }
  }
  G.UnionDiscriminator = x;
  class U extends x {
    constructor(g, S) {
      if (!(g instanceof l && g.isCount()))
        throw new TypeError("layout must be an unsigned integer ExternalLayout");
      super(S || g.property || "variant"), this.layout = g;
    }
    /** Delegate decoding to {@link UnionLayoutDiscriminator#layout|layout}. */
    decode(g, S) {
      return this.layout.decode(g, S);
    }
    /** Delegate encoding to {@link UnionLayoutDiscriminator#layout|layout}. */
    encode(g, S, L) {
      return this.layout.encode(g, S, L);
    }
  }
  G.UnionLayoutDiscriminator = U;
  class R extends n {
    constructor(g, S, L) {
      let H;
      if (g instanceof E || g instanceof v)
        H = new U(new A(g));
      else if (g instanceof l && g.isCount())
        H = new U(g);
      else if (g instanceof x)
        H = g;
      else
        throw new TypeError("discr must be a UnionDiscriminator or an unsigned integer layout");
      if (S === void 0 && (S = null), !(S === null || S instanceof n))
        throw new TypeError("defaultLayout must be null or a Layout");
      if (S !== null) {
        if (0 > S.span)
          throw new Error("defaultLayout must have constant span");
        S.property === void 0 && (S = S.replicate("content"));
      }
      let J = -1;
      S && (J = S.span, 0 <= J && (g instanceof E || g instanceof v) && (J += H.layout.span)), super(J, L), this.discriminator = H, this.usesPrefixDiscriminator = g instanceof E || g instanceof v, this.defaultLayout = S, this.registry = {};
      let tt = this.defaultGetSourceVariant.bind(this);
      this.getSourceVariant = function(st) {
        return tt(st);
      }, this.configGetSourceVariant = function(st) {
        tt = st.bind(this);
      };
    }
    /** @override */
    getSpan(g, S = 0) {
      if (0 <= this.span)
        return this.span;
      const L = this.getVariant(g, S);
      if (!L)
        throw new Error("unable to determine span for unrecognized variant");
      return L.getSpan(g, S);
    }
    /**
     * Method to infer a registered Union variant compatible with `src`.
     *
     * The first satisfied rule in the following sequence defines the
     * return value:
     * * If `src` has properties matching the Union discriminator and
     *   the default layout, `undefined` is returned regardless of the
     *   value of the discriminator property (this ensures the default
     *   layout will be used);
     * * If `src` has a property matching the Union discriminator, the
     *   value of the discriminator identifies a registered variant, and
     *   either (a) the variant has no layout, or (b) `src` has the
     *   variant's property, then the variant is returned (because the
     *   source satisfies the constraints of the variant it identifies);
     * * If `src` does not have a property matching the Union
     *   discriminator, but does have a property matching a registered
     *   variant, then the variant is returned (because the source
     *   matches a variant without an explicit conflict);
     * * An error is thrown (because we either can't identify a variant,
     *   or we were explicitly told the variant but can't satisfy it).
     *
     * @param {Object} src - an object presumed to be compatible with
     * the content of the Union.
     *
     * @return {(undefined|VariantLayout)} - as described above.
     *
     * @throws {Error} - if `src` cannot be associated with a default or
     * registered variant.
     */
    defaultGetSourceVariant(g) {
      if (Object.prototype.hasOwnProperty.call(g, this.discriminator.property)) {
        if (this.defaultLayout && this.defaultLayout.property && Object.prototype.hasOwnProperty.call(g, this.defaultLayout.property))
          return;
        const S = this.registry[g[this.discriminator.property]];
        if (S && (!S.layout || S.property && Object.prototype.hasOwnProperty.call(g, S.property)))
          return S;
      } else
        for (const S in this.registry) {
          const L = this.registry[S];
          if (L.property && Object.prototype.hasOwnProperty.call(g, L.property))
            return L;
        }
      throw new Error("unable to infer src variant");
    }
    /** Implement {@link Layout#decode|decode} for {@link Union}.
     *
     * If the variant is {@link Union#addVariant|registered} the return
     * value is an instance of that variant, with no explicit
     * discriminator.  Otherwise the {@link Union#defaultLayout|default
     * layout} is used to decode the content. */
    decode(g, S = 0) {
      let L;
      const H = this.discriminator, J = H.decode(g, S), tt = this.registry[J];
      if (tt === void 0) {
        const st = this.defaultLayout;
        let xt = 0;
        this.usesPrefixDiscriminator && (xt = H.layout.span), L = this.makeDestinationObject(), L[H.property] = J, L[st.property] = st.decode(g, S + xt);
      } else
        L = tt.decode(g, S);
      return L;
    }
    /** Implement {@link Layout#encode|encode} for {@link Union}.
     *
     * This API assumes the `src` object is consistent with the union's
     * {@link Union#defaultLayout|default layout}.  To encode variants
     * use the appropriate variant-specific {@link VariantLayout#encode}
     * method. */
    encode(g, S, L = 0) {
      const H = this.getSourceVariant(g);
      if (H === void 0) {
        const J = this.discriminator, tt = this.defaultLayout;
        let st = 0;
        return this.usesPrefixDiscriminator && (st = J.layout.span), J.encode(g[J.property], S, L), st + tt.encode(g[tt.property], S, L + st);
      }
      return H.encode(g, S, L);
    }
    /** Register a new variant structure within a union.  The newly
     * created variant is returned.
     *
     * @param {Number} variant - initializer for {@link
     * VariantLayout#variant|variant}.
     *
     * @param {Layout} layout - initializer for {@link
     * VariantLayout#layout|layout}.
     *
     * @param {String} property - initializer for {@link
     * Layout#property|property}.
     *
     * @return {VariantLayout} */
    addVariant(g, S, L) {
      const H = new b(this, g, S, L);
      return this.registry[g] = H, H;
    }
    /**
     * Get the layout associated with a registered variant.
     *
     * If `vb` does not produce a registered variant the function returns
     * `undefined`.
     *
     * @param {(Number|Uint8Array)} vb - either the variant number, or a
     * buffer from which the discriminator is to be read.
     *
     * @param {Number} offset - offset into `vb` for the start of the
     * union.  Used only when `vb` is an instance of {Uint8Array}.
     *
     * @return {({VariantLayout}|undefined)}
     */
    getVariant(g, S = 0) {
      let L;
      return g instanceof Uint8Array ? L = this.discriminator.decode(g, S) : L = g, this.registry[L];
    }
  }
  G.Union = R;
  class b extends n {
    constructor(g, S, L, H) {
      if (!(g instanceof R))
        throw new TypeError("union must be a Union");
      if (!Number.isInteger(S) || 0 > S)
        throw new TypeError("variant must be a (non-negative) integer");
      if (typeof L == "string" && H === void 0 && (H = L, L = null), L) {
        if (!(L instanceof n))
          throw new TypeError("layout must be a Layout");
        if (g.defaultLayout !== null && 0 <= L.span && L.span > g.defaultLayout.span)
          throw new Error("variant span exceeds span of containing union");
        if (typeof H != "string")
          throw new TypeError("variant must have a String property");
      }
      let J = g.span;
      0 > g.span && (J = L ? L.span : 0, 0 <= J && g.usesPrefixDiscriminator && (J += g.discriminator.layout.span)), super(J, H), this.union = g, this.variant = S, this.layout = L || null;
    }
    /** @override */
    getSpan(g, S = 0) {
      if (0 <= this.span)
        return this.span;
      let L = 0;
      this.union.usesPrefixDiscriminator && (L = this.union.discriminator.layout.span);
      let H = 0;
      return this.layout && (H = this.layout.getSpan(g, S + L)), L + H;
    }
    /** @override */
    decode(g, S = 0) {
      const L = this.makeDestinationObject();
      if (this !== this.union.getVariant(g, S))
        throw new Error("variant mismatch");
      let H = 0;
      return this.union.usesPrefixDiscriminator && (H = this.union.discriminator.layout.span), this.layout ? L[this.property] = this.layout.decode(g, S + H) : this.property ? L[this.property] = !0 : this.union.usesPrefixDiscriminator && (L[this.union.discriminator.property] = this.variant), L;
    }
    /** @override */
    encode(g, S, L = 0) {
      let H = 0;
      if (this.union.usesPrefixDiscriminator && (H = this.union.discriminator.layout.span), this.layout && !Object.prototype.hasOwnProperty.call(g, this.property))
        throw new TypeError("variant lacks property " + this.property);
      this.union.discriminator.encode(this.variant, S, L);
      let J = H;
      if (this.layout && (this.layout.encode(g[this.property], S, L + H), J += this.layout.getSpan(S, L + H), 0 <= this.union.span && J > this.union.span))
        throw new Error("encoded variant overruns containing union");
      return J;
    }
    /** Delegate {@link Layout#fromArray|fromArray} to {@link
     * VariantLayout#layout|layout}. */
    fromArray(g) {
      if (this.layout)
        return this.layout.fromArray(g);
    }
  }
  G.VariantLayout = b;
  function u(f) {
    return 0 > f && (f += 4294967296), f;
  }
  class d extends n {
    constructor(g, S, L) {
      if (!(g instanceof E || g instanceof v))
        throw new TypeError("word must be a UInt or UIntBE layout");
      if (typeof S == "string" && L === void 0 && (L = S, S = !1), 4 < g.span)
        throw new RangeError("word cannot exceed 32 bits");
      super(g.span, L), this.word = g, this.msb = !!S, this.fields = [];
      let H = 0;
      this._packedSetValue = function(J) {
        return H = u(J), this;
      }, this._packedGetValue = function() {
        return H;
      };
    }
    /** @override */
    decode(g, S = 0) {
      const L = this.makeDestinationObject(), H = this.word.decode(g, S);
      this._packedSetValue(H);
      for (const J of this.fields)
        J.property !== void 0 && (L[J.property] = J.decode(g));
      return L;
    }
    /** Implement {@link Layout#encode|encode} for {@link BitStructure}.
     *
     * If `src` is missing a property for a member with a defined {@link
     * Layout#property|property} the corresponding region of the packed
     * value is left unmodified.  Unused bits are also left unmodified. */
    encode(g, S, L = 0) {
      const H = this.word.decode(S, L);
      this._packedSetValue(H);
      for (const J of this.fields)
        if (J.property !== void 0) {
          const tt = g[J.property];
          tt !== void 0 && J.encode(tt);
        }
      return this.word.encode(this._packedGetValue(), S, L);
    }
    /** Register a new bitfield with a containing bit structure.  The
     * resulting bitfield is returned.
     *
     * @param {Number} bits - initializer for {@link BitField#bits|bits}.
     *
     * @param {string} property - initializer for {@link
     * Layout#property|property}.
     *
     * @return {BitField} */
    addField(g, S) {
      const L = new p(this, g, S);
      return this.fields.push(L), L;
    }
    /** As with {@link BitStructure#addField|addField} for single-bit
     * fields with `boolean` value representation.
     *
     * @param {string} property - initializer for {@link
     * Layout#property|property}.
     *
     * @return {Boolean} */
    // `Boolean` conflicts with the native primitive type
    // eslint-disable-next-line @typescript-eslint/ban-types
    addBoolean(g) {
      const S = new m(this, g);
      return this.fields.push(S), S;
    }
    /**
     * Get access to the bit field for a given property.
     *
     * @param {String} property - the bit field of interest.
     *
     * @return {BitField} - the field associated with `property`, or
     * undefined if there is no such property.
     */
    fieldFor(g) {
      if (typeof g != "string")
        throw new TypeError("property must be string");
      for (const S of this.fields)
        if (S.property === g)
          return S;
    }
  }
  G.BitStructure = d;
  class p {
    constructor(g, S, L) {
      if (!(g instanceof d))
        throw new TypeError("container must be a BitStructure");
      if (!Number.isInteger(S) || 0 >= S)
        throw new TypeError("bits must be positive integer");
      const H = 8 * g.span, J = g.fields.reduce((tt, st) => tt + st.bits, 0);
      if (S + J > H)
        throw new Error("bits too long for span remainder (" + (H - J) + " of " + H + " remain)");
      this.container = g, this.bits = S, this.valueMask = (1 << S) - 1, S === 32 && (this.valueMask = 4294967295), this.start = J, this.container.msb && (this.start = H - J - S), this.wordMask = u(this.valueMask << this.start), this.property = L;
    }
    /** Store a value into the corresponding subsequence of the containing
     * bit field. */
    decode(g, S) {
      const L = this.container._packedGetValue();
      return u(L & this.wordMask) >>> this.start;
    }
    /** Store a value into the corresponding subsequence of the containing
     * bit field.
     *
     * **NOTE** This is not a specialization of {@link
     * Layout#encode|Layout.encode} and there is no return value. */
    encode(g) {
      if (typeof g != "number" || !Number.isInteger(g) || g !== u(g & this.valueMask))
        throw new TypeError(i("BitField.encode", this) + " value must be integer not exceeding " + this.valueMask);
      const S = this.container._packedGetValue(), L = u(g << this.start);
      this.container._packedSetValue(u(S & ~this.wordMask) | L);
    }
  }
  G.BitField = p;
  class m extends p {
    constructor(g, S) {
      super(g, 1, S);
    }
    /** Override {@link BitField#decode|decode} for {@link Boolean|Boolean}.
     *
     * @returns {boolean} */
    decode(g, S) {
      return !!super.decode(g, S);
    }
    /** @override */
    encode(g) {
      typeof g == "boolean" && (g = +g), super.encode(g);
    }
  }
  G.Boolean = m;
  class w extends n {
    constructor(g, S) {
      if (!(g instanceof l && g.isCount() || Number.isInteger(g) && 0 <= g))
        throw new TypeError("length must be positive integer or an unsigned integer ExternalLayout");
      let L = -1;
      g instanceof l || (L = g), super(L, S), this.length = g;
    }
    /** @override */
    getSpan(g, S) {
      let L = this.span;
      return 0 > L && (L = this.length.decode(g, S)), L;
    }
    /** @override */
    decode(g, S = 0) {
      let L = this.span;
      return 0 > L && (L = this.length.decode(g, S)), e(g).slice(S, S + L);
    }
    /** Implement {@link Layout#encode|encode} for {@link Blob}.
     *
     * **NOTE** If {@link Layout#count|count} is an instance of {@link
     * ExternalLayout} then the length of `src` will be encoded as the
     * count after `src` is encoded. */
    encode(g, S, L) {
      let H = this.length;
      if (this.length instanceof l && (H = g.length), !(g instanceof Uint8Array && H === g.length))
        throw new TypeError(i("Blob.encode", this) + " requires (length " + H + ") Uint8Array as src");
      if (L + H > S.length)
        throw new RangeError("encoding overruns Uint8Array");
      const J = e(g);
      return e(S).write(J.toString("hex"), L, H, "hex"), this.length instanceof l && this.length.encode(H, S, L), H;
    }
  }
  G.Blob = w;
  class B extends n {
    constructor(g) {
      super(-1, g);
    }
    /** @override */
    getSpan(g, S = 0) {
      t(g);
      let L = S;
      for (; L < g.length && g[L] !== 0; )
        L += 1;
      return 1 + L - S;
    }
    /** @override */
    decode(g, S = 0) {
      const L = this.getSpan(g, S);
      return e(g).slice(S, S + L - 1).toString("utf-8");
    }
    /** @override */
    encode(g, S, L = 0) {
      typeof g != "string" && (g = String(g));
      const H = r.Buffer.from(g, "utf8"), J = H.length;
      if (L + J > S.length)
        throw new RangeError("encoding overruns Buffer");
      const tt = e(S);
      return H.copy(tt, L), tt[L + J] = 0, J + 1;
    }
  }
  G.CString = B;
  class F extends n {
    constructor(g, S) {
      if (typeof g == "string" && S === void 0 && (S = g, g = void 0), g === void 0)
        g = -1;
      else if (!Number.isInteger(g))
        throw new TypeError("maxSpan must be an integer");
      super(-1, S), this.maxSpan = g;
    }
    /** @override */
    getSpan(g, S = 0) {
      return t(g), g.length - S;
    }
    /** @override */
    decode(g, S = 0) {
      const L = this.getSpan(g, S);
      if (0 <= this.maxSpan && this.maxSpan < L)
        throw new RangeError("text length exceeds maxSpan");
      return e(g).slice(S, S + L).toString("utf-8");
    }
    /** @override */
    encode(g, S, L = 0) {
      typeof g != "string" && (g = String(g));
      const H = r.Buffer.from(g, "utf8"), J = H.length;
      if (0 <= this.maxSpan && this.maxSpan < J)
        throw new RangeError("text length exceeds maxSpan");
      if (L + J > S.length)
        throw new RangeError("encoding overruns Buffer");
      return H.copy(e(S), L), J;
    }
  }
  G.UTF8 = F;
  class I extends n {
    constructor(g, S) {
      super(0, S), this.value = g;
    }
    /** @override */
    decode(g, S) {
      return this.value;
    }
    /** @override */
    encode(g, S, L) {
      return 0;
    }
  }
  return G.Constant = I, G.greedy = (f, g) => new h(f, g), G.offset = (f, g, S) => new A(f, g, S), G.u8 = (f) => new E(1, f), G.u16 = (f) => new E(2, f), G.u24 = (f) => new E(3, f), G.u32 = (f) => new E(4, f), G.u40 = (f) => new E(5, f), G.u48 = (f) => new E(6, f), G.nu64 = (f) => new N(f), G.u16be = (f) => new v(2, f), G.u24be = (f) => new v(3, f), G.u32be = (f) => new v(4, f), G.u40be = (f) => new v(5, f), G.u48be = (f) => new v(6, f), G.nu64be = (f) => new Z(f), G.s8 = (f) => new T(1, f), G.s16 = (f) => new T(2, f), G.s24 = (f) => new T(3, f), G.s32 = (f) => new T(4, f), G.s40 = (f) => new T(5, f), G.s48 = (f) => new T(6, f), G.ns64 = (f) => new Q(f), G.s16be = (f) => new P(2, f), G.s24be = (f) => new P(3, f), G.s32be = (f) => new P(4, f), G.s40be = (f) => new P(5, f), G.s48be = (f) => new P(6, f), G.ns64be = (f) => new W(f), G.f32 = (f) => new V(f), G.f32be = (f) => new K(f), G.f64 = (f) => new X(f), G.f64be = (f) => new nt(f), G.struct = (f, g, S) => new M(f, g, S), G.bits = (f, g, S) => new d(f, g, S), G.seq = (f, g, S) => new C(f, g, S), G.union = (f, g, S) => new R(f, g, S), G.unionLayoutDiscriminator = (f, g) => new U(f, g), G.blob = (f, g) => new w(f, g), G.cstr = (f) => new B(f), G.utf8 = (f, g) => new F(f, g), G.constant = (f, g) => new I(f, g), G;
}
var _ = Ch(), On = {}, oa;
function kh() {
  if (oa) return On;
  oa = 1, Object.defineProperty(On, "__esModule", { value: !0 });
  function r(i) {
    {
      const s = ft.Buffer.from(i);
      s.reverse();
      const l = s.toString("hex");
      return l.length === 0 ? BigInt(0) : BigInt(`0x${l}`);
    }
  }
  On.toBigIntLE = r;
  function t(i) {
    {
      const s = i.toString("hex");
      return s.length === 0 ? BigInt(0) : BigInt(`0x${s}`);
    }
  }
  On.toBigIntBE = t;
  function e(i, s) {
    {
      const l = i.toString(16), h = ft.Buffer.from(l.padStart(s * 2, "0").slice(0, s * 2), "hex");
      return h.reverse(), h;
    }
  }
  On.toBufferLE = e;
  function n(i, s) {
    {
      const l = i.toString(16);
      return ft.Buffer.from(l.padStart(s * 2, "0").slice(0, s * 2), "hex");
    }
  }
  return On.toBufferBE = n, On;
}
var aa = kh();
class Nh extends TypeError {
  constructor(t, e) {
    let n;
    const { message: i, explanation: s, ...l } = t, { path: h } = t, A = h.length === 0 ? i : `At path: ${h.join(".")} -- ${i}`;
    super(s ?? A), s != null && (this.cause = A), Object.assign(this, l), this.name = this.constructor.name, this.failures = () => n ?? (n = [t, ...e()]);
  }
}
function Th(r) {
  return Ur(r) && typeof r[Symbol.iterator] == "function";
}
function Ur(r) {
  return typeof r == "object" && r != null;
}
function gi(r) {
  return Ur(r) && !Array.isArray(r);
}
function Ge(r) {
  return typeof r == "symbol" ? r.toString() : typeof r == "string" ? JSON.stringify(r) : `${r}`;
}
function Lh(r) {
  const { done: t, value: e } = r.next();
  return t ? void 0 : e;
}
function Rh(r, t, e, n) {
  if (r === !0)
    return;
  r === !1 ? r = {} : typeof r == "string" && (r = { message: r });
  const { path: i, branch: s } = t, { type: l } = e, { refinement: h, message: A = `Expected a value of type \`${l}\`${h ? ` with refinement \`${h}\`` : ""}, but received: \`${Ge(n)}\`` } = r;
  return {
    value: n,
    type: l,
    refinement: h,
    key: i[i.length - 1],
    path: i,
    branch: s,
    ...r,
    message: A
  };
}
function* ca(r, t, e, n) {
  Th(r) || (r = [r]);
  for (const i of r) {
    const s = Rh(i, t, e, n);
    s && (yield s);
  }
}
function* ho(r, t, e = {}) {
  const { path: n = [], branch: i = [r], coerce: s = !1, mask: l = !1 } = e, h = { path: n, branch: i, mask: l };
  s && (r = t.coercer(r, h));
  let A = "valid";
  for (const E of t.validator(r, h))
    E.explanation = e.message, A = "not_valid", yield [E, void 0];
  for (let [E, v, T] of t.entries(r, h)) {
    const P = ho(v, T, {
      path: E === void 0 ? n : [...n, E],
      branch: E === void 0 ? i : [...i, v],
      coerce: s,
      mask: l,
      message: e.message
    });
    for (const O of P)
      O[0] ? (A = O[0].refinement != null ? "not_refined" : "not_valid", yield [O[0], void 0]) : s && (v = O[1], E === void 0 ? r = v : r instanceof Map ? r.set(E, v) : r instanceof Set ? r.add(v) : Ur(r) && (v !== void 0 || E in r) && (r[E] = v));
  }
  if (A !== "not_valid")
    for (const E of t.refiner(r, h))
      E.explanation = e.message, A = "not_refined", yield [E, void 0];
  A === "valid" && (yield [void 0, r]);
}
let nn = class {
  constructor(t) {
    const { type: e, schema: n, validator: i, refiner: s, coercer: l = (A) => A, entries: h = function* () {
    } } = t;
    this.type = e, this.schema = n, this.entries = h, this.coercer = l, i ? this.validator = (A, E) => {
      const v = i(A, E);
      return ca(v, E, this, A);
    } : this.validator = () => [], s ? this.refiner = (A, E) => {
      const v = s(A, E);
      return ca(v, E, this, A);
    } : this.refiner = () => [];
  }
  /**
   * Assert that a value passes the struct's validation, throwing if it doesn't.
   */
  assert(t, e) {
    return Dh(t, this, e);
  }
  /**
   * Create a value with the struct's coercion logic, then validate it.
   */
  create(t, e) {
    return rt(t, this, e);
  }
  /**
   * Check if a value passes the struct's validation.
   */
  is(t) {
    return uc(t, this);
  }
  /**
   * Mask a value, coercing and validating it, but returning only the subset of
   * properties defined by the struct's schema. Masking applies recursively to
   * props of `object` structs only.
   */
  mask(t, e) {
    return Oh(t, this, e);
  }
  /**
   * Validate a value with the struct's validation logic, returning a tuple
   * representing the result.
   *
   * You may optionally pass `true` for the `coerce` argument to coerce
   * the value before attempting to validate it. If you do, the result will
   * contain the coerced result when successful. Also, `mask` will turn on
   * masking of the unknown `object` props recursively if passed.
   */
  validate(t, e = {}) {
    return jr(t, this, e);
  }
};
function Dh(r, t, e) {
  const n = jr(r, t, { message: e });
  if (n[0])
    throw n[0];
}
function rt(r, t, e) {
  const n = jr(r, t, { coerce: !0, message: e });
  if (n[0])
    throw n[0];
  return n[1];
}
function Oh(r, t, e) {
  const n = jr(r, t, { coerce: !0, mask: !0, message: e });
  if (n[0])
    throw n[0];
  return n[1];
}
function uc(r, t) {
  return !jr(r, t)[0];
}
function jr(r, t, e = {}) {
  const n = ho(r, t, e), i = Lh(n);
  return i[0] ? [new Nh(i[0], function* () {
    for (const l of n)
      l[0] && (yield l[0]);
  }), void 0] : [void 0, i[1]];
}
function Wn(r, t) {
  return new nn({ type: r, schema: null, validator: t });
}
function Uh() {
  return Wn("any", () => !0);
}
function it(r) {
  return new nn({
    type: "array",
    schema: r,
    *entries(t) {
      if (r && Array.isArray(t))
        for (const [e, n] of t.entries())
          yield [e, n, r];
    },
    coercer(t) {
      return Array.isArray(t) ? t.slice() : t;
    },
    validator(t) {
      return Array.isArray(t) || `Expected an array value, but received: ${Ge(t)}`;
    }
  });
}
function en() {
  return Wn("boolean", (r) => typeof r == "boolean");
}
function fo(r) {
  return Wn("instance", (t) => t instanceof r || `Expected a \`${r.name}\` instance, but received: ${Ge(t)}`);
}
function Wt(r) {
  const t = Ge(r), e = typeof r;
  return new nn({
    type: "literal",
    schema: e === "string" || e === "number" || e === "boolean" ? r : null,
    validator(n) {
      return n === r || `Expected the literal \`${t}\`, but received: ${Ge(n)}`;
    }
  });
}
function jh() {
  return Wn("never", () => !1);
}
function ot(r) {
  return new nn({
    ...r,
    validator: (t, e) => t === null || r.validator(t, e),
    refiner: (t, e) => t === null || r.refiner(t, e)
  });
}
function Y() {
  return Wn("number", (r) => typeof r == "number" && !isNaN(r) || `Expected a number, but received: ${Ge(r)}`);
}
function mt(r) {
  return new nn({
    ...r,
    validator: (t, e) => t === void 0 || r.validator(t, e),
    refiner: (t, e) => t === void 0 || r.refiner(t, e)
  });
}
function lc(r, t) {
  return new nn({
    type: "record",
    schema: null,
    *entries(e) {
      if (Ur(e))
        for (const n in e) {
          const i = e[n];
          yield [n, n, r], yield [n, i, t];
        }
    },
    validator(e) {
      return gi(e) || `Expected an object, but received: ${Ge(e)}`;
    },
    coercer(e) {
      return gi(e) ? { ...e } : e;
    }
  });
}
function et() {
  return Wn("string", (r) => typeof r == "string" || `Expected a string, but received: ${Ge(r)}`);
}
function go(r) {
  const t = jh();
  return new nn({
    type: "tuple",
    schema: null,
    *entries(e) {
      if (Array.isArray(e)) {
        const n = Math.max(r.length, e.length);
        for (let i = 0; i < n; i++)
          yield [i, e[i], r[i] || t];
      }
    },
    validator(e) {
      return Array.isArray(e) || `Expected an array, but received: ${Ge(e)}`;
    },
    coercer(e) {
      return Array.isArray(e) ? e.slice() : e;
    }
  });
}
function $(r) {
  const t = Object.keys(r);
  return new nn({
    type: "type",
    schema: r,
    *entries(e) {
      if (Ur(e))
        for (const n of t)
          yield [n, e[n], r[n]];
    },
    validator(e) {
      return gi(e) || `Expected an object, but received: ${Ge(e)}`;
    },
    coercer(e) {
      return gi(e) ? { ...e } : e;
    }
  });
}
function Te(r) {
  const t = r.map((e) => e.type).join(" | ");
  return new nn({
    type: "union",
    schema: null,
    coercer(e, n) {
      for (const i of r) {
        const [s, l] = i.validate(e, {
          coerce: !0,
          mask: n.mask
        });
        if (!s)
          return l;
      }
      return e;
    },
    validator(e, n) {
      const i = [];
      for (const s of r) {
        const [...l] = ho(e, s, n), [h] = l;
        if (h[0])
          for (const [A] of l)
            A && i.push(A);
        else
          return [];
      }
      return [
        `Expected the value to satisfy a union of \`${t}\`, but received: ${Ge(e)}`,
        ...i
      ];
    }
  });
}
function lr() {
  return Wn("unknown", () => !0);
}
function zr(r, t, e) {
  return new nn({
    ...r,
    coercer: (n, i) => uc(n, t) ? r.coercer(e(n, i), i) : r.coercer(n, i)
  });
}
var Zr, zh = new Uint8Array(16);
function hc() {
  if (!Zr && (Zr = typeof crypto < "u" && crypto.getRandomValues && crypto.getRandomValues.bind(crypto) || typeof msCrypto < "u" && typeof msCrypto.getRandomValues == "function" && msCrypto.getRandomValues.bind(msCrypto), !Zr))
    throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");
  return Zr(zh);
}
const Ph = /^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i;
function Ii(r) {
  return typeof r == "string" && Ph.test(r);
}
var me = [];
for (var gs = 0; gs < 256; ++gs)
  me.push((gs + 256).toString(16).substr(1));
function Mi(r) {
  var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0, e = (me[r[t + 0]] + me[r[t + 1]] + me[r[t + 2]] + me[r[t + 3]] + "-" + me[r[t + 4]] + me[r[t + 5]] + "-" + me[r[t + 6]] + me[r[t + 7]] + "-" + me[r[t + 8]] + me[r[t + 9]] + "-" + me[r[t + 10]] + me[r[t + 11]] + me[r[t + 12]] + me[r[t + 13]] + me[r[t + 14]] + me[r[t + 15]]).toLowerCase();
  if (!Ii(e))
    throw TypeError("Stringified UUID is invalid");
  return e;
}
var ua, As, ps = 0, ws = 0;
function Fh(r, t, e) {
  var n = t && e || 0, i = t || new Array(16);
  r = r || {};
  var s = r.node || ua, l = r.clockseq !== void 0 ? r.clockseq : As;
  if (s == null || l == null) {
    var h = r.random || (r.rng || hc)();
    s == null && (s = ua = [h[0] | 1, h[1], h[2], h[3], h[4], h[5]]), l == null && (l = As = (h[6] << 8 | h[7]) & 16383);
  }
  var A = r.msecs !== void 0 ? r.msecs : Date.now(), E = r.nsecs !== void 0 ? r.nsecs : ws + 1, v = A - ps + (E - ws) / 1e4;
  if (v < 0 && r.clockseq === void 0 && (l = l + 1 & 16383), (v < 0 || A > ps) && r.nsecs === void 0 && (E = 0), E >= 1e4)
    throw new Error("uuid.v1(): Can't create more than 10M uuids/sec");
  ps = A, ws = E, As = l, A += 122192928e5;
  var T = ((A & 268435455) * 1e4 + E) % 4294967296;
  i[n++] = T >>> 24 & 255, i[n++] = T >>> 16 & 255, i[n++] = T >>> 8 & 255, i[n++] = T & 255;
  var P = A / 4294967296 * 1e4 & 268435455;
  i[n++] = P >>> 8 & 255, i[n++] = P & 255, i[n++] = P >>> 24 & 15 | 16, i[n++] = P >>> 16 & 255, i[n++] = l >>> 8 | 128, i[n++] = l & 255;
  for (var O = 0; O < 6; ++O)
    i[n + O] = s[O];
  return t || Mi(i);
}
function fc(r) {
  if (!Ii(r))
    throw TypeError("Invalid UUID");
  var t, e = new Uint8Array(16);
  return e[0] = (t = parseInt(r.slice(0, 8), 16)) >>> 24, e[1] = t >>> 16 & 255, e[2] = t >>> 8 & 255, e[3] = t & 255, e[4] = (t = parseInt(r.slice(9, 13), 16)) >>> 8, e[5] = t & 255, e[6] = (t = parseInt(r.slice(14, 18), 16)) >>> 8, e[7] = t & 255, e[8] = (t = parseInt(r.slice(19, 23), 16)) >>> 8, e[9] = t & 255, e[10] = (t = parseInt(r.slice(24, 36), 16)) / 1099511627776 & 255, e[11] = t / 4294967296 & 255, e[12] = t >>> 24 & 255, e[13] = t >>> 16 & 255, e[14] = t >>> 8 & 255, e[15] = t & 255, e;
}
function Qh(r) {
  r = unescape(encodeURIComponent(r));
  for (var t = [], e = 0; e < r.length; ++e)
    t.push(r.charCodeAt(e));
  return t;
}
var _h = "6ba7b810-9dad-11d1-80b4-00c04fd430c8", Wh = "6ba7b811-9dad-11d1-80b4-00c04fd430c8";
function dc(r, t, e) {
  function n(i, s, l, h) {
    if (typeof i == "string" && (i = Qh(i)), typeof s == "string" && (s = fc(s)), s.length !== 16)
      throw TypeError("Namespace must be array-like (16 iterable integer values, 0-255)");
    var A = new Uint8Array(16 + i.length);
    if (A.set(s), A.set(i, s.length), A = e(A), A[6] = A[6] & 15 | t, A[8] = A[8] & 63 | 128, l) {
      h = h || 0;
      for (var E = 0; E < 16; ++E)
        l[h + E] = A[E];
      return l;
    }
    return Mi(A);
  }
  try {
    n.name = r;
  } catch {
  }
  return n.DNS = _h, n.URL = Wh, n;
}
function qh(r) {
  if (typeof r == "string") {
    var t = unescape(encodeURIComponent(r));
    r = new Uint8Array(t.length);
    for (var e = 0; e < t.length; ++e)
      r[e] = t.charCodeAt(e);
  }
  return Hh(Zh(Yh(r), r.length * 8));
}
function Hh(r) {
  for (var t = [], e = r.length * 32, n = "0123456789abcdef", i = 0; i < e; i += 8) {
    var s = r[i >> 5] >>> i % 32 & 255, l = parseInt(n.charAt(s >>> 4 & 15) + n.charAt(s & 15), 16);
    t.push(l);
  }
  return t;
}
function gc(r) {
  return (r + 64 >>> 9 << 4) + 14 + 1;
}
function Zh(r, t) {
  r[t >> 5] |= 128 << t % 32, r[gc(t) - 1] = t;
  for (var e = 1732584193, n = -271733879, i = -1732584194, s = 271733878, l = 0; l < r.length; l += 16) {
    var h = e, A = n, E = i, v = s;
    e = ve(e, n, i, s, r[l], 7, -680876936), s = ve(s, e, n, i, r[l + 1], 12, -389564586), i = ve(i, s, e, n, r[l + 2], 17, 606105819), n = ve(n, i, s, e, r[l + 3], 22, -1044525330), e = ve(e, n, i, s, r[l + 4], 7, -176418897), s = ve(s, e, n, i, r[l + 5], 12, 1200080426), i = ve(i, s, e, n, r[l + 6], 17, -1473231341), n = ve(n, i, s, e, r[l + 7], 22, -45705983), e = ve(e, n, i, s, r[l + 8], 7, 1770035416), s = ve(s, e, n, i, r[l + 9], 12, -1958414417), i = ve(i, s, e, n, r[l + 10], 17, -42063), n = ve(n, i, s, e, r[l + 11], 22, -1990404162), e = ve(e, n, i, s, r[l + 12], 7, 1804603682), s = ve(s, e, n, i, r[l + 13], 12, -40341101), i = ve(i, s, e, n, r[l + 14], 17, -1502002290), n = ve(n, i, s, e, r[l + 15], 22, 1236535329), e = Ie(e, n, i, s, r[l + 1], 5, -165796510), s = Ie(s, e, n, i, r[l + 6], 9, -1069501632), i = Ie(i, s, e, n, r[l + 11], 14, 643717713), n = Ie(n, i, s, e, r[l], 20, -373897302), e = Ie(e, n, i, s, r[l + 5], 5, -701558691), s = Ie(s, e, n, i, r[l + 10], 9, 38016083), i = Ie(i, s, e, n, r[l + 15], 14, -660478335), n = Ie(n, i, s, e, r[l + 4], 20, -405537848), e = Ie(e, n, i, s, r[l + 9], 5, 568446438), s = Ie(s, e, n, i, r[l + 14], 9, -1019803690), i = Ie(i, s, e, n, r[l + 3], 14, -187363961), n = Ie(n, i, s, e, r[l + 8], 20, 1163531501), e = Ie(e, n, i, s, r[l + 13], 5, -1444681467), s = Ie(s, e, n, i, r[l + 2], 9, -51403784), i = Ie(i, s, e, n, r[l + 7], 14, 1735328473), n = Ie(n, i, s, e, r[l + 12], 20, -1926607734), e = Me(e, n, i, s, r[l + 5], 4, -378558), s = Me(s, e, n, i, r[l + 8], 11, -2022574463), i = Me(i, s, e, n, r[l + 11], 16, 1839030562), n = Me(n, i, s, e, r[l + 14], 23, -35309556), e = Me(e, n, i, s, r[l + 1], 4, -1530992060), s = Me(s, e, n, i, r[l + 4], 11, 1272893353), i = Me(i, s, e, n, r[l + 7], 16, -155497632), n = Me(n, i, s, e, r[l + 10], 23, -1094730640), e = Me(e, n, i, s, r[l + 13], 4, 681279174), s = Me(s, e, n, i, r[l], 11, -358537222), i = Me(i, s, e, n, r[l + 3], 16, -722521979), n = Me(n, i, s, e, r[l + 6], 23, 76029189), e = Me(e, n, i, s, r[l + 9], 4, -640364487), s = Me(s, e, n, i, r[l + 12], 11, -421815835), i = Me(i, s, e, n, r[l + 15], 16, 530742520), n = Me(n, i, s, e, r[l + 2], 23, -995338651), e = Se(e, n, i, s, r[l], 6, -198630844), s = Se(s, e, n, i, r[l + 7], 10, 1126891415), i = Se(i, s, e, n, r[l + 14], 15, -1416354905), n = Se(n, i, s, e, r[l + 5], 21, -57434055), e = Se(e, n, i, s, r[l + 12], 6, 1700485571), s = Se(s, e, n, i, r[l + 3], 10, -1894986606), i = Se(i, s, e, n, r[l + 10], 15, -1051523), n = Se(n, i, s, e, r[l + 1], 21, -2054922799), e = Se(e, n, i, s, r[l + 8], 6, 1873313359), s = Se(s, e, n, i, r[l + 15], 10, -30611744), i = Se(i, s, e, n, r[l + 6], 15, -1560198380), n = Se(n, i, s, e, r[l + 13], 21, 1309151649), e = Se(e, n, i, s, r[l + 4], 6, -145523070), s = Se(s, e, n, i, r[l + 11], 10, -1120210379), i = Se(i, s, e, n, r[l + 2], 15, 718787259), n = Se(n, i, s, e, r[l + 9], 21, -343485551), e = Cn(e, h), n = Cn(n, A), i = Cn(i, E), s = Cn(s, v);
  }
  return [e, n, i, s];
}
function Yh(r) {
  if (r.length === 0)
    return [];
  for (var t = r.length * 8, e = new Uint32Array(gc(t)), n = 0; n < t; n += 8)
    e[n >> 5] |= (r[n / 8] & 255) << n % 32;
  return e;
}
function Cn(r, t) {
  var e = (r & 65535) + (t & 65535), n = (r >> 16) + (t >> 16) + (e >> 16);
  return n << 16 | e & 65535;
}
function Gh(r, t) {
  return r << t | r >>> 32 - t;
}
function Si(r, t, e, n, i, s) {
  return Cn(Gh(Cn(Cn(t, r), Cn(n, s)), i), e);
}
function ve(r, t, e, n, i, s, l) {
  return Si(t & e | ~t & n, r, t, i, s, l);
}
function Ie(r, t, e, n, i, s, l) {
  return Si(t & n | e & ~n, r, t, i, s, l);
}
function Me(r, t, e, n, i, s, l) {
  return Si(t ^ e ^ n, r, t, i, s, l);
}
function Se(r, t, e, n, i, s, l) {
  return Si(e ^ (t | ~n), r, t, i, s, l);
}
var Jh = dc("v3", 48, qh);
function Kh(r, t, e) {
  r = r || {};
  var n = r.random || (r.rng || hc)();
  if (n[6] = n[6] & 15 | 64, n[8] = n[8] & 63 | 128, t) {
    e = e || 0;
    for (var i = 0; i < 16; ++i)
      t[e + i] = n[i];
    return t;
  }
  return Mi(n);
}
function Vh(r, t, e, n) {
  switch (r) {
    case 0:
      return t & e ^ ~t & n;
    case 1:
      return t ^ e ^ n;
    case 2:
      return t & e ^ t & n ^ e & n;
    case 3:
      return t ^ e ^ n;
  }
}
function ys(r, t) {
  return r << t | r >>> 32 - t;
}
function Xh(r) {
  var t = [1518500249, 1859775393, 2400959708, 3395469782], e = [1732584193, 4023233417, 2562383102, 271733878, 3285377520];
  if (typeof r == "string") {
    var n = unescape(encodeURIComponent(r));
    r = [];
    for (var i = 0; i < n.length; ++i)
      r.push(n.charCodeAt(i));
  } else Array.isArray(r) || (r = Array.prototype.slice.call(r));
  r.push(128);
  for (var s = r.length / 4 + 2, l = Math.ceil(s / 16), h = new Array(l), A = 0; A < l; ++A) {
    for (var E = new Uint32Array(16), v = 0; v < 16; ++v)
      E[v] = r[A * 64 + v * 4] << 24 | r[A * 64 + v * 4 + 1] << 16 | r[A * 64 + v * 4 + 2] << 8 | r[A * 64 + v * 4 + 3];
    h[A] = E;
  }
  h[l - 1][14] = (r.length - 1) * 8 / Math.pow(2, 32), h[l - 1][14] = Math.floor(h[l - 1][14]), h[l - 1][15] = (r.length - 1) * 8 & 4294967295;
  for (var T = 0; T < l; ++T) {
    for (var P = new Uint32Array(80), O = 0; O < 16; ++O)
      P[O] = h[T][O];
    for (var j = 16; j < 80; ++j)
      P[j] = ys(P[j - 3] ^ P[j - 8] ^ P[j - 14] ^ P[j - 16], 1);
    for (var D = e[0], N = e[1], Z = e[2], Q = e[3], W = e[4], V = 0; V < 80; ++V) {
      var K = Math.floor(V / 20), X = ys(D, 5) + Vh(K, N, Z, Q) + W + t[K] + P[V] >>> 0;
      W = Q, Q = Z, Z = ys(N, 30) >>> 0, N = D, D = X;
    }
    e[0] = e[0] + D >>> 0, e[1] = e[1] + N >>> 0, e[2] = e[2] + Z >>> 0, e[3] = e[3] + Q >>> 0, e[4] = e[4] + W >>> 0;
  }
  return [e[0] >> 24 & 255, e[0] >> 16 & 255, e[0] >> 8 & 255, e[0] & 255, e[1] >> 24 & 255, e[1] >> 16 & 255, e[1] >> 8 & 255, e[1] & 255, e[2] >> 24 & 255, e[2] >> 16 & 255, e[2] >> 8 & 255, e[2] & 255, e[3] >> 24 & 255, e[3] >> 16 & 255, e[3] >> 8 & 255, e[3] & 255, e[4] >> 24 & 255, e[4] >> 16 & 255, e[4] >> 8 & 255, e[4] & 255];
}
var $h = dc("v5", 80, Xh);
const tf = "00000000-0000-0000-0000-000000000000";
function ef(r) {
  if (!Ii(r))
    throw TypeError("Invalid UUID");
  return parseInt(r.substr(14, 1), 16);
}
const nf = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  NIL: tf,
  parse: fc,
  stringify: Mi,
  v1: Fh,
  v3: Jh,
  v4: Kh,
  v5: $h,
  validate: Ii,
  version: ef
}, Symbol.toStringTag, { value: "Module" })), Ac = /* @__PURE__ */ Ua(nf);
var ms, la;
function rf() {
  if (la) return ms;
  la = 1;
  const r = Ac.v4;
  return ms = function(e, n, i, s) {
    if (typeof e != "string")
      throw new TypeError(e + " must be a string");
    s = s || {};
    const l = typeof s.version == "number" ? s.version : 2;
    if (l !== 1 && l !== 2)
      throw new TypeError(l + " must be 1 or 2");
    const h = {
      method: e
    };
    if (l === 2 && (h.jsonrpc = "2.0"), n) {
      if (typeof n != "object" && !Array.isArray(n))
        throw new TypeError(n + " must be an object, array or omitted");
      h.params = n;
    }
    if (typeof i > "u") {
      const A = typeof s.generator == "function" ? s.generator : function() {
        return r();
      };
      h.id = A(h, s);
    } else l === 2 && i === null ? s.notificationIdNull && (h.id = null) : h.id = i;
    return h;
  }, ms;
}
var bs, ha;
function sf() {
  if (ha) return bs;
  ha = 1;
  const r = Ac.v4, t = rf(), e = function(n, i) {
    if (!(this instanceof e))
      return new e(n, i);
    i || (i = {}), this.options = {
      reviver: typeof i.reviver < "u" ? i.reviver : null,
      replacer: typeof i.replacer < "u" ? i.replacer : null,
      generator: typeof i.generator < "u" ? i.generator : function() {
        return r();
      },
      version: typeof i.version < "u" ? i.version : 2,
      notificationIdNull: typeof i.notificationIdNull == "boolean" ? i.notificationIdNull : !1
    }, this.callServer = n;
  };
  return bs = e, e.prototype.request = function(n, i, s, l) {
    const h = this;
    let A = null;
    const E = Array.isArray(n) && typeof i == "function";
    if (this.options.version === 1 && E)
      throw new TypeError("JSON-RPC 1.0 does not support batching");
    if (E || !E && n && typeof n == "object" && typeof i == "function")
      l = i, A = n;
    else {
      typeof s == "function" && (l = s, s = void 0);
      const P = typeof l == "function";
      try {
        A = t(n, i, s, {
          generator: this.options.generator,
          version: this.options.version,
          notificationIdNull: this.options.notificationIdNull
        });
      } catch (O) {
        if (P)
          return l(O);
        throw O;
      }
      if (!P)
        return A;
    }
    let T;
    try {
      T = JSON.stringify(A, this.options.replacer);
    } catch (P) {
      return l(P);
    }
    return this.callServer(T, function(P, O) {
      h._parseResponse(P, O, l);
    }), A;
  }, e.prototype._parseResponse = function(n, i, s) {
    if (n) {
      s(n);
      return;
    }
    if (!i)
      return s();
    let l;
    try {
      l = JSON.parse(i, this.options.reviver);
    } catch (h) {
      return s(h);
    }
    if (s.length === 3)
      if (Array.isArray(l)) {
        const h = function(E) {
          return typeof E.error < "u";
        }, A = function(E) {
          return !h(E);
        };
        return s(null, l.filter(h), l.filter(A));
      } else
        return s(null, l.error, l.result);
    s(null, l);
  }, bs;
}
var of = sf();
const af = /* @__PURE__ */ Rr(of);
var Es = { exports: {} }, fa;
function cf() {
  return fa || (fa = 1, function(r) {
    var t = Object.prototype.hasOwnProperty, e = "~";
    function n() {
    }
    Object.create && (n.prototype = /* @__PURE__ */ Object.create(null), new n().__proto__ || (e = !1));
    function i(A, E, v) {
      this.fn = A, this.context = E, this.once = v || !1;
    }
    function s(A, E, v, T, P) {
      if (typeof v != "function")
        throw new TypeError("The listener must be a function");
      var O = new i(v, T || A, P), j = e ? e + E : E;
      return A._events[j] ? A._events[j].fn ? A._events[j] = [A._events[j], O] : A._events[j].push(O) : (A._events[j] = O, A._eventsCount++), A;
    }
    function l(A, E) {
      --A._eventsCount === 0 ? A._events = new n() : delete A._events[E];
    }
    function h() {
      this._events = new n(), this._eventsCount = 0;
    }
    h.prototype.eventNames = function() {
      var E = [], v, T;
      if (this._eventsCount === 0) return E;
      for (T in v = this._events)
        t.call(v, T) && E.push(e ? T.slice(1) : T);
      return Object.getOwnPropertySymbols ? E.concat(Object.getOwnPropertySymbols(v)) : E;
    }, h.prototype.listeners = function(E) {
      var v = e ? e + E : E, T = this._events[v];
      if (!T) return [];
      if (T.fn) return [T.fn];
      for (var P = 0, O = T.length, j = new Array(O); P < O; P++)
        j[P] = T[P].fn;
      return j;
    }, h.prototype.listenerCount = function(E) {
      var v = e ? e + E : E, T = this._events[v];
      return T ? T.fn ? 1 : T.length : 0;
    }, h.prototype.emit = function(E, v, T, P, O, j) {
      var D = e ? e + E : E;
      if (!this._events[D]) return !1;
      var N = this._events[D], Z = arguments.length, Q, W;
      if (N.fn) {
        switch (N.once && this.removeListener(E, N.fn, void 0, !0), Z) {
          case 1:
            return N.fn.call(N.context), !0;
          case 2:
            return N.fn.call(N.context, v), !0;
          case 3:
            return N.fn.call(N.context, v, T), !0;
          case 4:
            return N.fn.call(N.context, v, T, P), !0;
          case 5:
            return N.fn.call(N.context, v, T, P, O), !0;
          case 6:
            return N.fn.call(N.context, v, T, P, O, j), !0;
        }
        for (W = 1, Q = new Array(Z - 1); W < Z; W++)
          Q[W - 1] = arguments[W];
        N.fn.apply(N.context, Q);
      } else {
        var V = N.length, K;
        for (W = 0; W < V; W++)
          switch (N[W].once && this.removeListener(E, N[W].fn, void 0, !0), Z) {
            case 1:
              N[W].fn.call(N[W].context);
              break;
            case 2:
              N[W].fn.call(N[W].context, v);
              break;
            case 3:
              N[W].fn.call(N[W].context, v, T);
              break;
            case 4:
              N[W].fn.call(N[W].context, v, T, P);
              break;
            default:
              if (!Q) for (K = 1, Q = new Array(Z - 1); K < Z; K++)
                Q[K - 1] = arguments[K];
              N[W].fn.apply(N[W].context, Q);
          }
      }
      return !0;
    }, h.prototype.on = function(E, v, T) {
      return s(this, E, v, T, !1);
    }, h.prototype.once = function(E, v, T) {
      return s(this, E, v, T, !0);
    }, h.prototype.removeListener = function(E, v, T, P) {
      var O = e ? e + E : E;
      if (!this._events[O]) return this;
      if (!v)
        return l(this, O), this;
      var j = this._events[O];
      if (j.fn)
        j.fn === v && (!P || j.once) && (!T || j.context === T) && l(this, O);
      else {
        for (var D = 0, N = [], Z = j.length; D < Z; D++)
          (j[D].fn !== v || P && !j[D].once || T && j[D].context !== T) && N.push(j[D]);
        N.length ? this._events[O] = N.length === 1 ? N[0] : N : l(this, O);
      }
      return this;
    }, h.prototype.removeAllListeners = function(E) {
      var v;
      return E ? (v = e ? e + E : E, this._events[v] && l(this, v)) : (this._events = new n(), this._eventsCount = 0), this;
    }, h.prototype.off = h.prototype.removeListener, h.prototype.addListener = h.prototype.on, h.prefixed = e, h.EventEmitter = h, r.exports = h;
  }(Es)), Es.exports;
}
var uf = cf();
const pc = /* @__PURE__ */ Rr(uf);
var lf = class extends pc {
  /** Instantiate a WebSocket class
  * @constructor
  * @param {String} address - url to a websocket server
  * @param {(Object)} options - websocket options
  * @param {(String|Array)} protocols - a list of protocols
  * @return {WebSocketBrowserImpl} - returns a WebSocket instance
  */
  constructor(t, e, n) {
    super();
    Ae(this, "socket");
    this.socket = new window.WebSocket(t, n), this.socket.onopen = () => this.emit("open"), this.socket.onmessage = (i) => this.emit("message", i.data), this.socket.onerror = (i) => this.emit("error", i), this.socket.onclose = (i) => {
      this.emit("close", i.code, i.reason);
    };
  }
  /**
  * Sends data through a websocket connection
  * @method
  * @param {(String|Object)} data - data to be sent via websocket
  * @param {Object} optionsOrCallback - ws options
  * @param {Function} callback - a callback called once the data is sent
  * @return {Undefined}
  */
  send(t, e, n) {
    const i = n || e;
    try {
      this.socket.send(t), i();
    } catch (s) {
      i(s);
    }
  }
  /**
  * Closes an underlying socket
  * @method
  * @param {Number} code - status code explaining why the connection is being closed
  * @param {String} reason - a description why the connection is closing
  * @return {Undefined}
  * @throws {Error}
  */
  close(t, e) {
    this.socket.close(t, e);
  }
  addEventListener(t, e, n) {
    this.socket.addEventListener(t, e, n);
  }
};
function hf(r, t) {
  return new lf(r, t);
}
var ff = class {
  encode(r) {
    return JSON.stringify(r);
  }
  decode(r) {
    return JSON.parse(r);
  }
}, df = class extends pc {
  /**
  * Instantiate a Client class.
  * @constructor
  * @param {webSocketFactory} webSocketFactory - factory method for WebSocket
  * @param {String} address - url to a websocket server
  * @param {Object} options - ws options object with reconnect parameters
  * @param {Function} generate_request_id - custom generation request Id
  * @param {DataPack} dataPack - data pack contains encoder and decoder
  * @return {CommonClient}
  */
  constructor(t, e = "ws://localhost:8080", {
    autoconnect: n = !0,
    reconnect: i = !0,
    reconnect_interval: s = 1e3,
    max_reconnects: l = 5,
    ...h
  } = {}, A, E) {
    super();
    Ae(this, "address");
    Ae(this, "rpc_id");
    Ae(this, "queue");
    Ae(this, "options");
    Ae(this, "autoconnect");
    Ae(this, "ready");
    Ae(this, "reconnect");
    Ae(this, "reconnect_timer_id");
    Ae(this, "reconnect_interval");
    Ae(this, "max_reconnects");
    Ae(this, "rest_options");
    Ae(this, "current_reconnects");
    Ae(this, "generate_request_id");
    Ae(this, "socket");
    Ae(this, "webSocketFactory");
    Ae(this, "dataPack");
    this.webSocketFactory = t, this.queue = {}, this.rpc_id = 0, this.address = e, this.autoconnect = n, this.ready = !1, this.reconnect = i, this.reconnect_timer_id = void 0, this.reconnect_interval = s, this.max_reconnects = l, this.rest_options = h, this.current_reconnects = 0, this.generate_request_id = A || (() => typeof this.rpc_id == "number" ? ++this.rpc_id : Number(this.rpc_id) + 1), E ? this.dataPack = E : this.dataPack = new ff(), this.autoconnect && this._connect(this.address, {
      autoconnect: this.autoconnect,
      reconnect: this.reconnect,
      reconnect_interval: this.reconnect_interval,
      max_reconnects: this.max_reconnects,
      ...this.rest_options
    });
  }
  /**
  * Connects to a defined server if not connected already.
  * @method
  * @return {Undefined}
  */
  connect() {
    this.socket || this._connect(this.address, {
      autoconnect: this.autoconnect,
      reconnect: this.reconnect,
      reconnect_interval: this.reconnect_interval,
      max_reconnects: this.max_reconnects,
      ...this.rest_options
    });
  }
  /**
  * Calls a registered RPC method on server.
  * @method
  * @param {String} method - RPC method name
  * @param {Object|Array} params - optional method parameters
  * @param {Number} timeout - RPC reply timeout value
  * @param {Object} ws_opts - options passed to ws
  * @return {Promise}
  */
  call(t, e, n, i) {
    return !i && typeof n == "object" && (i = n, n = null), new Promise((s, l) => {
      if (!this.ready) return l(new Error("socket not ready"));
      const h = this.generate_request_id(t, e), A = {
        jsonrpc: "2.0",
        method: t,
        params: e || void 0,
        id: h
      };
      this.socket.send(this.dataPack.encode(A), i, (E) => {
        if (E) return l(E);
        this.queue[h] = { promise: [s, l] }, n && (this.queue[h].timeout = setTimeout(() => {
          delete this.queue[h], l(new Error("reply timeout"));
        }, n));
      });
    });
  }
  /**
  * Logins with the other side of the connection.
  * @method
  * @param {Object} params - Login credentials object
  * @return {Promise}
  */
  async login(t) {
    const e = await this.call("rpc.login", t);
    if (!e) throw new Error("authentication failed");
    return e;
  }
  /**
  * Fetches a list of client's methods registered on server.
  * @method
  * @return {Array}
  */
  async listMethods() {
    return await this.call("__listMethods");
  }
  /**
  * Sends a JSON-RPC 2.0 notification to server.
  * @method
  * @param {String} method - RPC method name
  * @param {Object} params - optional method parameters
  * @return {Promise}
  */
  notify(t, e) {
    return new Promise((n, i) => {
      if (!this.ready) return i(new Error("socket not ready"));
      const s = {
        jsonrpc: "2.0",
        method: t,
        params: e
      };
      this.socket.send(this.dataPack.encode(s), (l) => {
        if (l) return i(l);
        n();
      });
    });
  }
  /**
  * Subscribes for a defined event.
  * @method
  * @param {String|Array} event - event name
  * @return {Undefined}
  * @throws {Error}
  */
  async subscribe(t) {
    typeof t == "string" && (t = [t]);
    const e = await this.call("rpc.on", t);
    if (typeof t == "string" && e[t] !== "ok")
      throw new Error(
        "Failed subscribing to an event '" + t + "' with: " + e[t]
      );
    return e;
  }
  /**
  * Unsubscribes from a defined event.
  * @method
  * @param {String|Array} event - event name
  * @return {Undefined}
  * @throws {Error}
  */
  async unsubscribe(t) {
    typeof t == "string" && (t = [t]);
    const e = await this.call("rpc.off", t);
    if (typeof t == "string" && e[t] !== "ok")
      throw new Error("Failed unsubscribing from an event with: " + e);
    return e;
  }
  /**
  * Closes a WebSocket connection gracefully.
  * @method
  * @param {Number} code - socket close code
  * @param {String} data - optional data to be sent before closing
  * @return {Undefined}
  */
  close(t, e) {
    this.socket.close(t || 1e3, e);
  }
  /**
  * Enable / disable automatic reconnection.
  * @method
  * @param {Boolean} reconnect - enable / disable reconnection
  * @return {Undefined}
  */
  setAutoReconnect(t) {
    this.reconnect = t;
  }
  /**
  * Set the interval between reconnection attempts.
  * @method
  * @param {Number} interval - reconnection interval in milliseconds
  * @return {Undefined}
  */
  setReconnectInterval(t) {
    this.reconnect_interval = t;
  }
  /**
  * Set the maximum number of reconnection attempts.
  * @method
  * @param {Number} max_reconnects - maximum reconnection attempts
  * @return {Undefined}
  */
  setMaxReconnects(t) {
    this.max_reconnects = t;
  }
  /**
  * Connection/Message handler.
  * @method
  * @private
  * @param {String} address - WebSocket API address
  * @param {Object} options - ws options object
  * @return {Undefined}
  */
  _connect(t, e) {
    clearTimeout(this.reconnect_timer_id), this.socket = this.webSocketFactory(t, e), this.socket.addEventListener("open", () => {
      this.ready = !0, this.emit("open"), this.current_reconnects = 0;
    }), this.socket.addEventListener("message", ({ data: n }) => {
      n instanceof ArrayBuffer && (n = ft.Buffer.from(n).toString());
      try {
        n = this.dataPack.decode(n);
      } catch {
        return;
      }
      if (n.notification && this.listeners(n.notification).length) {
        if (!Object.keys(n.params).length)
          return this.emit(n.notification);
        const i = [n.notification];
        if (n.params.constructor === Object) i.push(n.params);
        else
          for (let s = 0; s < n.params.length; s++)
            i.push(n.params[s]);
        return Promise.resolve().then(() => {
          this.emit.apply(this, i);
        });
      }
      if (!this.queue[n.id])
        return n.method ? Promise.resolve().then(() => {
          this.emit(n.method, n?.params);
        }) : void 0;
      "error" in n == "result" in n && this.queue[n.id].promise[1](
        new Error(
          'Server response malformed. Response must include either "result" or "error", but not both.'
        )
      ), this.queue[n.id].timeout && clearTimeout(this.queue[n.id].timeout), n.error ? this.queue[n.id].promise[1](n.error) : this.queue[n.id].promise[0](n.result), delete this.queue[n.id];
    }), this.socket.addEventListener("error", (n) => this.emit("error", n)), this.socket.addEventListener("close", ({ code: n, reason: i }) => {
      this.ready && setTimeout(() => this.emit("close", n, i), 0), this.ready = !1, this.socket = void 0, n !== 1e3 && (this.current_reconnects++, this.reconnect && (this.max_reconnects > this.current_reconnects || this.max_reconnects === 0) && (this.reconnect_timer_id = setTimeout(
        () => this._connect(t, e),
        this.reconnect_interval
      )));
    });
  }
};
class wc extends Ya {
  constructor(t, e) {
    super(), this.finished = !1, this.destroyed = !1, ul(t);
    const n = ro(e);
    if (this.iHash = t.create(), typeof this.iHash.update != "function")
      throw new Error("Expected instance of class which extends utils.Hash");
    this.blockLen = this.iHash.blockLen, this.outputLen = this.iHash.outputLen;
    const i = this.blockLen, s = new Uint8Array(i);
    s.set(n.length > i ? t.create().update(n).digest() : n);
    for (let l = 0; l < s.length; l++)
      s[l] ^= 54;
    this.iHash.update(s), this.oHash = t.create();
    for (let l = 0; l < s.length; l++)
      s[l] ^= 106;
    this.oHash.update(s), s.fill(0);
  }
  update(t) {
    return oi(this), this.iHash.update(t), this;
  }
  digestInto(t) {
    oi(this), mi(t, this.outputLen), this.finished = !0, this.iHash.digestInto(t), this.oHash.update(t), this.oHash.digestInto(t), this.destroy();
  }
  digest() {
    const t = new Uint8Array(this.oHash.outputLen);
    return this.digestInto(t), t;
  }
  _cloneInto(t) {
    t || (t = Object.create(Object.getPrototypeOf(this), {}));
    const { oHash: e, iHash: n, finished: i, destroyed: s, blockLen: l, outputLen: h } = this;
    return t = t, t.finished = i, t.destroyed = s, t.blockLen = l, t.outputLen = h, t.oHash = e._cloneInto(t.oHash), t.iHash = n._cloneInto(t.iHash), t;
  }
  destroy() {
    this.destroyed = !0, this.oHash.destroy(), this.iHash.destroy();
  }
}
const yc = (r, t, e) => new wc(r, t).update(e).digest();
yc.create = (r, t) => new wc(r, t);
/*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */
function da(r) {
  r.lowS !== void 0 && Nn("lowS", r.lowS), r.prehash !== void 0 && Nn("prehash", r.prehash);
}
function gf(r) {
  const t = ao(r);
  Or(t, {
    a: "field",
    b: "field"
  }, {
    allowedPrivateKeyLengths: "array",
    wrapPrivateKey: "boolean",
    isTorsionFree: "function",
    clearCofactor: "function",
    allowInfinityPoint: "boolean",
    fromBytes: "function",
    toBytes: "function"
  });
  const { endo: e, Fp: n, a: i } = t;
  if (e) {
    if (!n.eql(i, n.ZERO))
      throw new Error("invalid endomorphism, can only be defined for Koblitz curves that have a=0");
    if (typeof e != "object" || typeof e.beta != "bigint" || typeof e.splitScalar != "function")
      throw new Error("invalid endomorphism, expected beta: bigint and splitScalar: function");
  }
  return Object.freeze({ ...t });
}
class Af extends Error {
  constructor(t = "") {
    super(t);
  }
}
const cn = {
  // asn.1 DER encoding utils
  Err: Af,
  // Basic building block is TLV (Tag-Length-Value)
  _tlv: {
    encode: (r, t) => {
      const { Err: e } = cn;
      if (r < 0 || r > 256)
        throw new e("tlv.encode: wrong tag");
      if (t.length & 1)
        throw new e("tlv.encode: unpadded data");
      const n = t.length / 2, i = qr(n);
      if (i.length / 2 & 128)
        throw new e("tlv.encode: long form length too big");
      const s = n > 127 ? qr(i.length / 2 | 128) : "";
      return qr(r) + s + i + t;
    },
    // v - value, l - left bytes (unparsed)
    decode(r, t) {
      const { Err: e } = cn;
      let n = 0;
      if (r < 0 || r > 256)
        throw new e("tlv.encode: wrong tag");
      if (t.length < 2 || t[n++] !== r)
        throw new e("tlv.decode: wrong tlv");
      const i = t[n++], s = !!(i & 128);
      let l = 0;
      if (!s)
        l = i;
      else {
        const A = i & 127;
        if (!A)
          throw new e("tlv.decode(long): indefinite length not supported");
        if (A > 4)
          throw new e("tlv.decode(long): byte length is too big");
        const E = t.subarray(n, n + A);
        if (E.length !== A)
          throw new e("tlv.decode: length bytes not complete");
        if (E[0] === 0)
          throw new e("tlv.decode(long): zero leftmost byte");
        for (const v of E)
          l = l << 8 | v;
        if (n += A, l < 128)
          throw new e("tlv.decode(long): not minimal encoding");
      }
      const h = t.subarray(n, n + l);
      if (h.length !== l)
        throw new e("tlv.decode: wrong value length");
      return { v: h, l: t.subarray(n + l) };
    }
  },
  // https://crypto.stackexchange.com/a/57734 Leftmost bit of first byte is 'negative' flag,
  // since we always use positive integers here. It must always be empty:
  // - add zero byte if exists
  // - if next byte doesn't have a flag, leading zero is not allowed (minimal encoding)
  _int: {
    encode(r) {
      const { Err: t } = cn;
      if (r < ln)
        throw new t("integer: negative integers are not allowed");
      let e = qr(r);
      if (Number.parseInt(e[0], 16) & 8 && (e = "00" + e), e.length & 1)
        throw new t("unexpected DER parsing assertion: unpadded hex");
      return e;
    },
    decode(r) {
      const { Err: t } = cn;
      if (r[0] & 128)
        throw new t("invalid signature integer: negative");
      if (r[0] === 0 && !(r[1] & 128))
        throw new t("invalid signature integer: unnecessary leading zero");
      return _n(r);
    }
  },
  toSig(r) {
    const { Err: t, _int: e, _tlv: n } = cn, i = ge("signature", r), { v: s, l } = n.decode(48, i);
    if (l.length)
      throw new t("invalid signature: left bytes after parsing");
    const { v: h, l: A } = n.decode(2, s), { v: E, l: v } = n.decode(2, A);
    if (v.length)
      throw new t("invalid signature: left bytes after parsing");
    return { r: e.decode(h), s: e.decode(E) };
  },
  hexFromSig(r) {
    const { _tlv: t, _int: e } = cn, n = t.encode(2, e.encode(r.r)), i = t.encode(2, e.encode(r.s)), s = n + i;
    return t.encode(48, s);
  }
}, ln = BigInt(0), pe = BigInt(1);
BigInt(2);
const ga = BigInt(3);
BigInt(4);
function pf(r) {
  const t = gf(r), { Fp: e } = t, n = Ei(t.n, t.nBitLength), i = t.toBytes || ((D, N, Z) => {
    const Q = N.toAffine();
    return or(Uint8Array.from([4]), e.toBytes(Q.x), e.toBytes(Q.y));
  }), s = t.fromBytes || ((D) => {
    const N = D.subarray(1), Z = e.fromBytes(N.subarray(0, e.BYTES)), Q = e.fromBytes(N.subarray(e.BYTES, 2 * e.BYTES));
    return { x: Z, y: Q };
  });
  function l(D) {
    const { a: N, b: Z } = t, Q = e.sqr(D), W = e.mul(Q, D);
    return e.add(e.add(W, e.mul(D, N)), Z);
  }
  if (!e.eql(e.sqr(t.Gy), l(t.Gx)))
    throw new Error("bad generator point: equation left != right");
  function h(D) {
    return oo(D, pe, t.n);
  }
  function A(D) {
    const { allowedPrivateKeyLengths: N, nByteLength: Z, wrapPrivateKey: Q, n: W } = t;
    if (N && typeof D != "bigint") {
      if (ir(D) && (D = sr(D)), typeof D != "string" || !N.includes(D.length))
        throw new Error("invalid private key");
      D = D.padStart(Z * 2, "0");
    }
    let V;
    try {
      V = typeof D == "bigint" ? D : _n(ge("private key", D, Z));
    } catch {
      throw new Error("invalid private key, expected hex or " + Z + " bytes, got " + typeof D);
    }
    return Q && (V = Qt(V, W)), Ze("private key", V, pe, W), V;
  }
  function E(D) {
    if (!(D instanceof P))
      throw new Error("ProjectivePoint expected");
  }
  const v = ui((D, N) => {
    const { px: Z, py: Q, pz: W } = D;
    if (e.eql(W, e.ONE))
      return { x: Z, y: Q };
    const V = D.is0();
    N == null && (N = V ? e.ONE : e.inv(W));
    const K = e.mul(Z, N), X = e.mul(Q, N), nt = e.mul(W, N);
    if (V)
      return { x: e.ZERO, y: e.ZERO };
    if (!e.eql(nt, e.ONE))
      throw new Error("invZ was invalid");
    return { x: K, y: X };
  }), T = ui((D) => {
    if (D.is0()) {
      if (t.allowInfinityPoint && !e.is0(D.py))
        return;
      throw new Error("bad point: ZERO");
    }
    const { x: N, y: Z } = D.toAffine();
    if (!e.isValid(N) || !e.isValid(Z))
      throw new Error("bad point: x or y not FE");
    const Q = e.sqr(Z), W = l(N);
    if (!e.eql(Q, W))
      throw new Error("bad point: equation left != right");
    if (!D.isTorsionFree())
      throw new Error("bad point: not in prime-order subgroup");
    return !0;
  });
  class P {
    constructor(N, Z, Q) {
      if (N == null || !e.isValid(N))
        throw new Error("x required");
      if (Z == null || !e.isValid(Z))
        throw new Error("y required");
      if (Q == null || !e.isValid(Q))
        throw new Error("z required");
      this.px = N, this.py = Z, this.pz = Q, Object.freeze(this);
    }
    // Does not validate if the point is on-curve.
    // Use fromHex instead, or call assertValidity() later.
    static fromAffine(N) {
      const { x: Z, y: Q } = N || {};
      if (!N || !e.isValid(Z) || !e.isValid(Q))
        throw new Error("invalid affine point");
      if (N instanceof P)
        throw new Error("projective point not allowed");
      const W = (V) => e.eql(V, e.ZERO);
      return W(Z) && W(Q) ? P.ZERO : new P(Z, Q, e.ONE);
    }
    get x() {
      return this.toAffine().x;
    }
    get y() {
      return this.toAffine().y;
    }
    /**
     * Takes a bunch of Projective Points but executes only one
     * inversion on all of them. Inversion is very slow operation,
     * so this improves performance massively.
     * Optimization: converts a list of projective points to a list of identical points with Z=1.
     */
    static normalizeZ(N) {
      const Z = e.invertBatch(N.map((Q) => Q.pz));
      return N.map((Q, W) => Q.toAffine(Z[W])).map(P.fromAffine);
    }
    /**
     * Converts hash string or Uint8Array to Point.
     * @param hex short/long ECDSA hex
     */
    static fromHex(N) {
      const Z = P.fromAffine(s(ge("pointHex", N)));
      return Z.assertValidity(), Z;
    }
    // Multiplies generator point by privateKey.
    static fromPrivateKey(N) {
      return P.BASE.multiply(A(N));
    }
    // Multiscalar Multiplication
    static msm(N, Z) {
      return oc(P, n, N, Z);
    }
    // "Private method", don't use it directly
    _setWindowSize(N) {
      j.setWindowSize(this, N);
    }
    // A point on curve is valid if it conforms to equation.
    assertValidity() {
      T(this);
    }
    hasEvenY() {
      const { y: N } = this.toAffine();
      if (e.isOdd)
        return !e.isOdd(N);
      throw new Error("Field doesn't support isOdd");
    }
    /**
     * Compare one point to another.
     */
    equals(N) {
      E(N);
      const { px: Z, py: Q, pz: W } = this, { px: V, py: K, pz: X } = N, nt = e.eql(e.mul(Z, X), e.mul(V, W)), C = e.eql(e.mul(Q, X), e.mul(K, W));
      return nt && C;
    }
    /**
     * Flips point to one corresponding to (x, -y) in Affine coordinates.
     */
    negate() {
      return new P(this.px, e.neg(this.py), this.pz);
    }
    // Renes-Costello-Batina exception-free doubling formula.
    // There is 30% faster Jacobian formula, but it is not complete.
    // https://eprint.iacr.org/2015/1060, algorithm 3
    // Cost: 8M + 3S + 3*a + 2*b3 + 15add.
    double() {
      const { a: N, b: Z } = t, Q = e.mul(Z, ga), { px: W, py: V, pz: K } = this;
      let X = e.ZERO, nt = e.ZERO, C = e.ZERO, M = e.mul(W, W), x = e.mul(V, V), U = e.mul(K, K), R = e.mul(W, V);
      return R = e.add(R, R), C = e.mul(W, K), C = e.add(C, C), X = e.mul(N, C), nt = e.mul(Q, U), nt = e.add(X, nt), X = e.sub(x, nt), nt = e.add(x, nt), nt = e.mul(X, nt), X = e.mul(R, X), C = e.mul(Q, C), U = e.mul(N, U), R = e.sub(M, U), R = e.mul(N, R), R = e.add(R, C), C = e.add(M, M), M = e.add(C, M), M = e.add(M, U), M = e.mul(M, R), nt = e.add(nt, M), U = e.mul(V, K), U = e.add(U, U), M = e.mul(U, R), X = e.sub(X, M), C = e.mul(U, x), C = e.add(C, C), C = e.add(C, C), new P(X, nt, C);
    }
    // Renes-Costello-Batina exception-free addition formula.
    // There is 30% faster Jacobian formula, but it is not complete.
    // https://eprint.iacr.org/2015/1060, algorithm 1
    // Cost: 12M + 0S + 3*a + 3*b3 + 23add.
    add(N) {
      E(N);
      const { px: Z, py: Q, pz: W } = this, { px: V, py: K, pz: X } = N;
      let nt = e.ZERO, C = e.ZERO, M = e.ZERO;
      const x = t.a, U = e.mul(t.b, ga);
      let R = e.mul(Z, V), b = e.mul(Q, K), u = e.mul(W, X), d = e.add(Z, Q), p = e.add(V, K);
      d = e.mul(d, p), p = e.add(R, b), d = e.sub(d, p), p = e.add(Z, W);
      let m = e.add(V, X);
      return p = e.mul(p, m), m = e.add(R, u), p = e.sub(p, m), m = e.add(Q, W), nt = e.add(K, X), m = e.mul(m, nt), nt = e.add(b, u), m = e.sub(m, nt), M = e.mul(x, p), nt = e.mul(U, u), M = e.add(nt, M), nt = e.sub(b, M), M = e.add(b, M), C = e.mul(nt, M), b = e.add(R, R), b = e.add(b, R), u = e.mul(x, u), p = e.mul(U, p), b = e.add(b, u), u = e.sub(R, u), u = e.mul(x, u), p = e.add(p, u), R = e.mul(b, p), C = e.add(C, R), R = e.mul(m, p), nt = e.mul(d, nt), nt = e.sub(nt, R), R = e.mul(d, b), M = e.mul(m, M), M = e.add(M, R), new P(nt, C, M);
    }
    subtract(N) {
      return this.add(N.negate());
    }
    is0() {
      return this.equals(P.ZERO);
    }
    wNAF(N) {
      return j.wNAFCached(this, N, P.normalizeZ);
    }
    /**
     * Non-constant-time multiplication. Uses double-and-add algorithm.
     * It's faster, but should only be used when you don't care about
     * an exposed private key e.g. sig verification, which works over *public* keys.
     */
    multiplyUnsafe(N) {
      const { endo: Z, n: Q } = t;
      Ze("scalar", N, ln, Q);
      const W = P.ZERO;
      if (N === ln)
        return W;
      if (this.is0() || N === pe)
        return this;
      if (!Z || j.hasPrecomputes(this))
        return j.wNAFCachedUnsafe(this, N, P.normalizeZ);
      let { k1neg: V, k1: K, k2neg: X, k2: nt } = Z.splitScalar(N), C = W, M = W, x = this;
      for (; K > ln || nt > ln; )
        K & pe && (C = C.add(x)), nt & pe && (M = M.add(x)), x = x.double(), K >>= pe, nt >>= pe;
      return V && (C = C.negate()), X && (M = M.negate()), M = new P(e.mul(M.px, Z.beta), M.py, M.pz), C.add(M);
    }
    /**
     * Constant time multiplication.
     * Uses wNAF method. Windowed method may be 10% faster,
     * but takes 2x longer to generate and consumes 2x memory.
     * Uses precomputes when available.
     * Uses endomorphism for Koblitz curves.
     * @param scalar by which the point would be multiplied
     * @returns New point
     */
    multiply(N) {
      const { endo: Z, n: Q } = t;
      Ze("scalar", N, pe, Q);
      let W, V;
      if (Z) {
        const { k1neg: K, k1: X, k2neg: nt, k2: C } = Z.splitScalar(N);
        let { p: M, f: x } = this.wNAF(X), { p: U, f: R } = this.wNAF(C);
        M = j.constTimeNegate(K, M), U = j.constTimeNegate(nt, U), U = new P(e.mul(U.px, Z.beta), U.py, U.pz), W = M.add(U), V = x.add(R);
      } else {
        const { p: K, f: X } = this.wNAF(N);
        W = K, V = X;
      }
      return P.normalizeZ([W, V])[0];
    }
    /**
     * Efficiently calculate `aP + bQ`. Unsafe, can expose private key, if used incorrectly.
     * Not using Strauss-Shamir trick: precomputation tables are faster.
     * The trick could be useful if both P and Q are not G (not in our case).
     * @returns non-zero affine point
     */
    multiplyAndAddUnsafe(N, Z, Q) {
      const W = P.BASE, V = (X, nt) => nt === ln || nt === pe || !X.equals(W) ? X.multiplyUnsafe(nt) : X.multiply(nt), K = V(this, Z).add(V(N, Q));
      return K.is0() ? void 0 : K;
    }
    // Converts Projective point to affine (x, y) coordinates.
    // Can accept precomputed Z^-1 - for example, from invertBatch.
    // (x, y, z) ∋ (x=x/z, y=y/z)
    toAffine(N) {
      return v(this, N);
    }
    isTorsionFree() {
      const { h: N, isTorsionFree: Z } = t;
      if (N === pe)
        return !0;
      if (Z)
        return Z(P, this);
      throw new Error("isTorsionFree() has not been declared for the elliptic curve");
    }
    clearCofactor() {
      const { h: N, clearCofactor: Z } = t;
      return N === pe ? this : Z ? Z(P, this) : this.multiplyUnsafe(t.h);
    }
    toRawBytes(N = !0) {
      return Nn("isCompressed", N), this.assertValidity(), i(P, this, N);
    }
    toHex(N = !0) {
      return Nn("isCompressed", N), sr(this.toRawBytes(N));
    }
  }
  P.BASE = new P(t.Gx, t.Gy, e.ONE), P.ZERO = new P(e.ZERO, e.ONE, e.ZERO);
  const O = t.nBitLength, j = sc(P, t.endo ? Math.ceil(O / 2) : O);
  return {
    CURVE: t,
    ProjectivePoint: P,
    normPrivateKeyToScalar: A,
    weierstrassEquation: l,
    isWithinCurveOrder: h
  };
}
function wf(r) {
  const t = ao(r);
  return Or(t, {
    hash: "hash",
    hmac: "function",
    randomBytes: "function"
  }, {
    bits2int: "function",
    bits2int_modN: "function",
    lowS: "boolean"
  }), Object.freeze({ lowS: !0, ...t });
}
function yf(r) {
  const t = wf(r), { Fp: e, n } = t, i = e.BYTES + 1, s = 2 * e.BYTES + 1;
  function l(u) {
    return Qt(u, n);
  }
  function h(u) {
    return Ds(u, n);
  }
  const { ProjectivePoint: A, normPrivateKeyToScalar: E, weierstrassEquation: v, isWithinCurveOrder: T } = pf({
    ...t,
    toBytes(u, d, p) {
      const m = d.toAffine(), w = e.toBytes(m.x), B = or;
      return Nn("isCompressed", p), p ? B(Uint8Array.from([d.hasEvenY() ? 2 : 3]), w) : B(Uint8Array.from([4]), w, e.toBytes(m.y));
    },
    fromBytes(u) {
      const d = u.length, p = u[0], m = u.subarray(1);
      if (d === i && (p === 2 || p === 3)) {
        const w = _n(m);
        if (!oo(w, pe, e.ORDER))
          throw new Error("Point is not on curve");
        const B = v(w);
        let F;
        try {
          F = e.sqrt(B);
        } catch (g) {
          const S = g instanceof Error ? ": " + g.message : "";
          throw new Error("Point is not on curve" + S);
        }
        const I = (F & pe) === pe;
        return (p & 1) === 1 !== I && (F = e.neg(F)), { x: w, y: F };
      } else if (d === s && p === 4) {
        const w = e.fromBytes(m.subarray(0, e.BYTES)), B = e.fromBytes(m.subarray(e.BYTES, 2 * e.BYTES));
        return { x: w, y: B };
      } else {
        const w = i, B = s;
        throw new Error("invalid Point, expected length of " + w + ", or uncompressed " + B + ", got " + d);
      }
    }
  }), P = (u) => sr(Nr(u, t.nByteLength));
  function O(u) {
    const d = n >> pe;
    return u > d;
  }
  function j(u) {
    return O(u) ? l(-u) : u;
  }
  const D = (u, d, p) => _n(u.slice(d, p));
  class N {
    constructor(d, p, m) {
      Ze("r", d, pe, n), Ze("s", p, pe, n), this.r = d, this.s = p, m != null && (this.recovery = m), Object.freeze(this);
    }
    // pair (bytes of r, bytes of s)
    static fromCompact(d) {
      const p = t.nByteLength;
      return d = ge("compactSignature", d, p * 2), new N(D(d, 0, p), D(d, p, 2 * p));
    }
    // DER encoded ECDSA signature
    // https://bitcoin.stackexchange.com/questions/57644/what-are-the-parts-of-a-bitcoin-transaction-input-script
    static fromDER(d) {
      const { r: p, s: m } = cn.toSig(ge("DER", d));
      return new N(p, m);
    }
    /**
     * @todo remove
     * @deprecated
     */
    assertValidity() {
    }
    addRecoveryBit(d) {
      return new N(this.r, this.s, d);
    }
    recoverPublicKey(d) {
      const { r: p, s: m, recovery: w } = this, B = X(ge("msgHash", d));
      if (w == null || ![0, 1, 2, 3].includes(w))
        throw new Error("recovery id invalid");
      const F = w === 2 || w === 3 ? p + t.n : p;
      if (F >= e.ORDER)
        throw new Error("recovery id 2 or 3 invalid");
      const I = w & 1 ? "03" : "02", f = A.fromHex(I + P(F)), g = h(F), S = l(-B * g), L = l(m * g), H = A.BASE.multiplyAndAddUnsafe(f, S, L);
      if (!H)
        throw new Error("point at infinify");
      return H.assertValidity(), H;
    }
    // Signatures should be low-s, to prevent malleability.
    hasHighS() {
      return O(this.s);
    }
    normalizeS() {
      return this.hasHighS() ? new N(this.r, l(-this.s), this.recovery) : this;
    }
    // DER-encoded
    toDERRawBytes() {
      return ai(this.toDERHex());
    }
    toDERHex() {
      return cn.hexFromSig({ r: this.r, s: this.s });
    }
    // padded bytes of r, then padded bytes of s
    toCompactRawBytes() {
      return ai(this.toCompactHex());
    }
    toCompactHex() {
      return P(this.r) + P(this.s);
    }
  }
  const Z = {
    isValidPrivateKey(u) {
      try {
        return E(u), !0;
      } catch {
        return !1;
      }
    },
    normPrivateKeyToScalar: E,
    /**
     * Produces cryptographically secure private key from random of size
     * (groupLen + ceil(groupLen / 2)) with modulo bias being negligible.
     */
    randomPrivateKey: () => {
      const u = nc(t.n);
      return nh(t.randomBytes(u), t.n);
    },
    /**
     * Creates precompute table for an arbitrary EC point. Makes point "cached".
     * Allows to massively speed-up `point.multiply(scalar)`.
     * @returns cached point
     * @example
     * const fast = utils.precompute(8, ProjectivePoint.fromHex(someonesPubKey));
     * fast.multiply(privKey); // much faster ECDH now
     */
    precompute(u = 8, d = A.BASE) {
      return d._setWindowSize(u), d.multiply(BigInt(3)), d;
    }
  };
  function Q(u, d = !0) {
    return A.fromPrivateKey(u).toRawBytes(d);
  }
  function W(u) {
    const d = ir(u), p = typeof u == "string", m = (d || p) && u.length;
    return d ? m === i || m === s : p ? m === 2 * i || m === 2 * s : u instanceof A;
  }
  function V(u, d, p = !0) {
    if (W(u))
      throw new Error("first arg must be private key");
    if (!W(d))
      throw new Error("second arg must be public key");
    return A.fromHex(d).multiply(E(u)).toRawBytes(p);
  }
  const K = t.bits2int || function(u) {
    if (u.length > 8192)
      throw new Error("input is too large");
    const d = _n(u), p = u.length * 8 - t.nBitLength;
    return p > 0 ? d >> BigInt(p) : d;
  }, X = t.bits2int_modN || function(u) {
    return l(K(u));
  }, nt = bi(t.nBitLength);
  function C(u) {
    return Ze("num < 2^" + t.nBitLength, u, ln, nt), Nr(u, t.nByteLength);
  }
  function M(u, d, p = x) {
    if (["recovered", "canonical"].some((tt) => tt in p))
      throw new Error("sign() legacy options not supported");
    const { hash: m, randomBytes: w } = t;
    let { lowS: B, prehash: F, extraEntropy: I } = p;
    B == null && (B = !0), u = ge("msgHash", u), da(p), F && (u = ge("prehashed msgHash", m(u)));
    const f = X(u), g = E(d), S = [C(g), C(f)];
    if (I != null && I !== !1) {
      const tt = I === !0 ? w(e.BYTES) : I;
      S.push(ge("extraEntropy", tt));
    }
    const L = or(...S), H = f;
    function J(tt) {
      const st = K(tt);
      if (!T(st))
        return;
      const xt = h(st), At = A.BASE.multiply(st).toAffine(), bt = l(At.x);
      if (bt === ln)
        return;
      const Et = l(xt * l(H + bt * g));
      if (Et === ln)
        return;
      let ht = (At.x === bt ? 0 : 2) | Number(At.y & pe), wt = Et;
      return B && O(Et) && (wt = j(Et), ht ^= 1), new N(bt, wt, ht);
    }
    return { seed: L, k2sig: J };
  }
  const x = { lowS: t.lowS, prehash: !1 }, U = { lowS: t.lowS, prehash: !1 };
  function R(u, d, p = x) {
    const { seed: m, k2sig: w } = M(u, d, p), B = t;
    return Hl(B.hash.outputLen, B.nByteLength, B.hmac)(m, w);
  }
  A.BASE._setWindowSize(8);
  function b(u, d, p, m = U) {
    const w = u;
    d = ge("msgHash", d), p = ge("publicKey", p);
    const { lowS: B, prehash: F, format: I } = m;
    if (da(m), "strict" in m)
      throw new Error("options.strict was renamed to lowS");
    if (I !== void 0 && I !== "compact" && I !== "der")
      throw new Error("format must be compact or der");
    const f = typeof w == "string" || ir(w), g = !f && !I && typeof w == "object" && w !== null && typeof w.r == "bigint" && typeof w.s == "bigint";
    if (!f && !g)
      throw new Error("invalid signature, expected Uint8Array, hex string or Signature instance");
    let S, L;
    try {
      if (g && (S = new N(w.r, w.s)), f) {
        try {
          I !== "compact" && (S = N.fromDER(w));
        } catch (ht) {
          if (!(ht instanceof cn.Err))
            throw ht;
        }
        !S && I !== "der" && (S = N.fromCompact(w));
      }
      L = A.fromHex(p);
    } catch {
      return !1;
    }
    if (!S || B && S.hasHighS())
      return !1;
    F && (d = t.hash(d));
    const { r: H, s: J } = S, tt = X(d), st = h(J), xt = l(tt * st), At = l(H * st), bt = A.BASE.multiplyAndAddUnsafe(L, xt, At)?.toAffine();
    return bt ? l(bt.x) === H : !1;
  }
  return {
    CURVE: t,
    getPublicKey: Q,
    getSharedSecret: V,
    sign: R,
    verify: b,
    ProjectivePoint: A,
    Signature: N,
    utils: Z
  };
}
/*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */
function mf(r) {
  return {
    hash: r,
    hmac: (t, ...e) => yc(r, t, fl(...e)),
    randomBytes: Ja
  };
}
function bf(r, t) {
  const e = (n) => yf({ ...r, ...mf(n) });
  return { ...e(t), create: e };
}
/*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */
const mc = BigInt("0xfffffffffffffffffffffffffffffffffffffffffffffffffffffffefffffc2f"), Aa = BigInt("0xfffffffffffffffffffffffffffffffebaaedce6af48a03bbfd25e8cd0364141"), Ef = BigInt(1), Us = BigInt(2), pa = (r, t) => (r + t / Us) / t;
function vf(r) {
  const t = mc, e = BigInt(3), n = BigInt(6), i = BigInt(11), s = BigInt(22), l = BigInt(23), h = BigInt(44), A = BigInt(88), E = r * r * r % t, v = E * E * r % t, T = Zt(v, e, t) * v % t, P = Zt(T, e, t) * v % t, O = Zt(P, Us, t) * E % t, j = Zt(O, i, t) * O % t, D = Zt(j, s, t) * j % t, N = Zt(D, h, t) * D % t, Z = Zt(N, A, t) * N % t, Q = Zt(Z, h, t) * D % t, W = Zt(Q, e, t) * v % t, V = Zt(W, l, t) * j % t, K = Zt(V, n, t) * E % t, X = Zt(K, Us, t);
  if (!js.eql(js.sqr(X), r))
    throw new Error("Cannot find square root");
  return X;
}
const js = Ei(mc, void 0, void 0, { sqrt: vf }), If = bf({
  a: BigInt(0),
  b: BigInt(7),
  Fp: js,
  n: Aa,
  Gx: BigInt("55066263022277343669578718895168534326250603453777594175500187360389116729240"),
  Gy: BigInt("32670510020758816978083085130507043184471273380659243275938904335757337482424"),
  h: BigInt(1),
  // Cofactor
  lowS: !0,
  // Allow only low-S signatures by default in sign() and verify()
  endo: {
    // Endomorphism, see above
    beta: BigInt("0x7ae96a2b657c07106e64479eac3434e99cf0497512f58995c1396c28719501ee"),
    splitScalar: (r) => {
      const t = Aa, e = BigInt("0x3086d221a7d46bcde86c90e49284eb15"), n = -Ef * BigInt("0xe4437ed6010e88286f547fa90abfe4c3"), i = BigInt("0x114ca50f7a8e2f3f657c1108d9d44cfd8"), s = e, l = BigInt("0x100000000000000000000000000000000"), h = pa(s * r, t), A = pa(-n * r, t);
      let E = Qt(r - h * e - A * i, t), v = Qt(-h * n - A * s, t);
      const T = E > l, P = v > l;
      if (T && (E = t - E), P && (v = t - v), E > l || v > l)
        throw new Error("splitScalar: Endomorphism failed, k=" + r);
      return { k1neg: T, k1: E, k2neg: P, k2: v };
    }
  }
}, Ns);
BigInt(0);
function wa(r) {
  try {
    return uo.ExtendedPoint.fromHex(r), !0;
  } catch {
    return !1;
  }
}
const bc = (r, t) => uo.sign(r, t.slice(0, 32)), Mf = uo.verify, cr = (r) => ft.Buffer.isBuffer(r) ? r : r instanceof Uint8Array ? ft.Buffer.from(r.buffer, r.byteOffset, r.byteLength) : ft.Buffer.from(r);
class Sf {
  constructor(t) {
    Object.assign(this, t);
  }
  encode() {
    return ft.Buffer.from(ds.serialize($r, this));
  }
  static decode(t) {
    return ds.deserialize($r, this, t);
  }
  static decodeUnchecked(t) {
    return ds.deserializeUnchecked($r, this, t);
  }
}
const $r = /* @__PURE__ */ new Map();
var Ec;
const xf = 32, Tn = 32;
function Bf(r) {
  return r._bn !== void 0;
}
let ya = 1;
class gt extends Sf {
  /**
   * Create a new PublicKey object
   * @param value ed25519 public key as buffer or base-58 encoded string
   */
  constructor(t) {
    if (super({}), this._bn = void 0, Bf(t))
      this._bn = t._bn;
    else {
      if (typeof t == "string") {
        const e = Ee.decode(t);
        if (e.length != Tn)
          throw new Error("Invalid public key input");
        this._bn = new ta(e);
      } else
        this._bn = new ta(t);
      if (this._bn.byteLength() > Tn)
        throw new Error("Invalid public key input");
    }
  }
  /**
   * Returns a unique PublicKey for tests and benchmarks using a counter
   */
  static unique() {
    const t = new gt(ya);
    return ya += 1, new gt(t.toBuffer());
  }
  /**
   * Default public key value. The base58-encoded string representation is all ones (as seen below)
   * The underlying BN number is 32 bytes that are all zeros
   */
  /**
   * Checks if two publicKeys are equal
   */
  equals(t) {
    return this._bn.eq(t._bn);
  }
  /**
   * Return the base-58 representation of the public key
   */
  toBase58() {
    return Ee.encode(this.toBytes());
  }
  toJSON() {
    return this.toBase58();
  }
  /**
   * Return the byte array representation of the public key in big endian
   */
  toBytes() {
    const t = this.toBuffer();
    return new Uint8Array(t.buffer, t.byteOffset, t.byteLength);
  }
  /**
   * Return the Buffer representation of the public key in big endian
   */
  toBuffer() {
    const t = this._bn.toArrayLike(ft.Buffer);
    if (t.length === Tn)
      return t;
    const e = ft.Buffer.alloc(32);
    return t.copy(e, 32 - t.length), e;
  }
  get [Symbol.toStringTag]() {
    return `PublicKey(${this.toString()})`;
  }
  /**
   * Return the base-58 representation of the public key
   */
  toString() {
    return this.toBase58();
  }
  /**
   * Derive a public key from another key, a seed, and a program ID.
   * The program ID will also serve as the owner of the public key, giving
   * it permission to write data to the account.
   */
  /* eslint-disable require-await */
  static async createWithSeed(t, e, n) {
    const i = ft.Buffer.concat([t.toBuffer(), ft.Buffer.from(e), n.toBuffer()]), s = Ns(i);
    return new gt(s);
  }
  /**
   * Derive a program address from seeds and a program ID.
   */
  /* eslint-disable require-await */
  static createProgramAddressSync(t, e) {
    let n = ft.Buffer.alloc(0);
    t.forEach(function(s) {
      if (s.length > xf)
        throw new TypeError("Max seed length exceeded");
      n = ft.Buffer.concat([n, cr(s)]);
    }), n = ft.Buffer.concat([n, e.toBuffer(), ft.Buffer.from("ProgramDerivedAddress")]);
    const i = Ns(n);
    if (wa(i))
      throw new Error("Invalid seeds, address must fall off the curve");
    return new gt(i);
  }
  /**
   * Async version of createProgramAddressSync
   * For backwards compatibility
   *
   * @deprecated Use {@link createProgramAddressSync} instead
   */
  /* eslint-disable require-await */
  static async createProgramAddress(t, e) {
    return this.createProgramAddressSync(t, e);
  }
  /**
   * Find a valid program address
   *
   * Valid program addresses must fall off the ed25519 curve.  This function
   * iterates a nonce until it finds one that when combined with the seeds
   * results in a valid program address.
   */
  static findProgramAddressSync(t, e) {
    let n = 255, i;
    for (; n != 0; ) {
      try {
        const s = t.concat(ft.Buffer.from([n]));
        i = this.createProgramAddressSync(s, e);
      } catch (s) {
        if (s instanceof TypeError)
          throw s;
        n--;
        continue;
      }
      return [i, n];
    }
    throw new Error("Unable to find a viable program address nonce");
  }
  /**
   * Async version of findProgramAddressSync
   * For backwards compatibility
   *
   * @deprecated Use {@link findProgramAddressSync} instead
   */
  static async findProgramAddress(t, e) {
    return this.findProgramAddressSync(t, e);
  }
  /**
   * Check that a pubkey is on the ed25519 curve.
   */
  static isOnCurve(t) {
    const e = new gt(t);
    return wa(e.toBytes());
  }
}
Ec = gt;
gt.default = new Ec("11111111111111111111111111111111");
$r.set(gt, {
  kind: "struct",
  fields: [["_bn", "u256"]]
});
new gt("BPFLoader1111111111111111111111111111111111");
const nr = 1232, Ao = 127, Ai = 64;
class vc extends Error {
  constructor(t) {
    super(`Signature ${t} has expired: block height exceeded.`), this.signature = void 0, this.signature = t;
  }
}
Object.defineProperty(vc.prototype, "name", {
  value: "TransactionExpiredBlockheightExceededError"
});
class Ic extends Error {
  constructor(t, e) {
    super(`Transaction was not confirmed in ${e.toFixed(2)} seconds. It is unknown if it succeeded or failed. Check signature ${t} using the Solana Explorer or CLI tools.`), this.signature = void 0, this.signature = t;
  }
}
Object.defineProperty(Ic.prototype, "name", {
  value: "TransactionExpiredTimeoutError"
});
class br extends Error {
  constructor(t) {
    super(`Signature ${t} has expired: the nonce is no longer valid.`), this.signature = void 0, this.signature = t;
  }
}
Object.defineProperty(br.prototype, "name", {
  value: "TransactionExpiredNonceInvalidError"
});
class pi {
  constructor(t, e) {
    this.staticAccountKeys = void 0, this.accountKeysFromLookups = void 0, this.staticAccountKeys = t, this.accountKeysFromLookups = e;
  }
  keySegments() {
    const t = [this.staticAccountKeys];
    return this.accountKeysFromLookups && (t.push(this.accountKeysFromLookups.writable), t.push(this.accountKeysFromLookups.readonly)), t;
  }
  get(t) {
    for (const e of this.keySegments()) {
      if (t < e.length)
        return e[t];
      t -= e.length;
    }
  }
  get length() {
    return this.keySegments().flat().length;
  }
  compileInstructions(t) {
    if (this.length > 256)
      throw new Error("Account index overflow encountered during compilation");
    const n = /* @__PURE__ */ new Map();
    this.keySegments().flat().forEach((s, l) => {
      n.set(s.toBase58(), l);
    });
    const i = (s) => {
      const l = n.get(s.toBase58());
      if (l === void 0) throw new Error("Encountered an unknown instruction account key during compilation");
      return l;
    };
    return t.map((s) => ({
      programIdIndex: i(s.programId),
      accountKeyIndexes: s.keys.map((l) => i(l.pubkey)),
      data: s.data
    }));
  }
}
const St = (r = "publicKey") => _.blob(32, r), Cf = (r = "signature") => _.blob(64, r), $n = (r = "string") => {
  const t = _.struct([_.u32("length"), _.u32("lengthPadding"), _.blob(_.offset(_.u32(), -8), "chars")], r), e = t.decode.bind(t), n = t.encode.bind(t), i = t;
  return i.decode = (s, l) => e(s, l).chars.toString(), i.encode = (s, l, h) => {
    const A = {
      chars: ft.Buffer.from(s, "utf8")
    };
    return n(A, l, h);
  }, i.alloc = (s) => _.u32().span + _.u32().span + ft.Buffer.from(s, "utf8").length, i;
}, kf = (r = "authorized") => _.struct([St("staker"), St("withdrawer")], r), Nf = (r = "lockup") => _.struct([_.ns64("unixTimestamp"), _.ns64("epoch"), St("custodian")], r), Tf = (r = "voteInit") => _.struct([St("nodePubkey"), St("authorizedVoter"), St("authorizedWithdrawer"), _.u8("commission")], r), Lf = (r = "voteAuthorizeWithSeedArgs") => _.struct([_.u32("voteAuthorizationType"), St("currentAuthorityDerivedKeyOwnerPubkey"), $n("currentAuthorityDerivedKeySeed"), St("newAuthorized")], r);
function ze(r) {
  let t = 0, e = 0;
  for (; ; ) {
    let n = r.shift();
    if (t |= (n & 127) << e * 7, e += 1, !(n & 128))
      break;
  }
  return t;
}
function Pe(r, t) {
  let e = t;
  for (; ; ) {
    let n = e & 127;
    if (e >>= 7, e == 0) {
      r.push(n);
      break;
    } else
      n |= 128, r.push(n);
  }
}
function Ft(r, t) {
  if (!r)
    throw new Error(t || "Assertion failed");
}
class xi {
  constructor(t, e) {
    this.payer = void 0, this.keyMetaMap = void 0, this.payer = t, this.keyMetaMap = e;
  }
  static compile(t, e) {
    const n = /* @__PURE__ */ new Map(), i = (l) => {
      const h = l.toBase58();
      let A = n.get(h);
      return A === void 0 && (A = {
        isSigner: !1,
        isWritable: !1,
        isInvoked: !1
      }, n.set(h, A)), A;
    }, s = i(e);
    s.isSigner = !0, s.isWritable = !0;
    for (const l of t) {
      i(l.programId).isInvoked = !0;
      for (const h of l.keys) {
        const A = i(h.pubkey);
        A.isSigner || (A.isSigner = h.isSigner), A.isWritable || (A.isWritable = h.isWritable);
      }
    }
    return new xi(e, n);
  }
  getMessageComponents() {
    const t = [...this.keyMetaMap.entries()];
    Ft(t.length <= 256, "Max static account keys length exceeded");
    const e = t.filter(([, A]) => A.isSigner && A.isWritable), n = t.filter(([, A]) => A.isSigner && !A.isWritable), i = t.filter(([, A]) => !A.isSigner && A.isWritable), s = t.filter(([, A]) => !A.isSigner && !A.isWritable), l = {
      numRequiredSignatures: e.length + n.length,
      numReadonlySignedAccounts: n.length,
      numReadonlyUnsignedAccounts: s.length
    };
    {
      Ft(e.length > 0, "Expected at least one writable signer key");
      const [A] = e[0];
      Ft(A === this.payer.toBase58(), "Expected first writable signer key to be the fee payer");
    }
    const h = [...e.map(([A]) => new gt(A)), ...n.map(([A]) => new gt(A)), ...i.map(([A]) => new gt(A)), ...s.map(([A]) => new gt(A))];
    return [l, h];
  }
  extractTableLookup(t) {
    const [e, n] = this.drainKeysFoundInLookupTable(t.state.addresses, (l) => !l.isSigner && !l.isInvoked && l.isWritable), [i, s] = this.drainKeysFoundInLookupTable(t.state.addresses, (l) => !l.isSigner && !l.isInvoked && !l.isWritable);
    if (!(e.length === 0 && i.length === 0))
      return [{
        accountKey: t.key,
        writableIndexes: e,
        readonlyIndexes: i
      }, {
        writable: n,
        readonly: s
      }];
  }
  /** @internal */
  drainKeysFoundInLookupTable(t, e) {
    const n = new Array(), i = new Array();
    for (const [s, l] of this.keyMetaMap.entries())
      if (e(l)) {
        const h = new gt(s), A = t.findIndex((E) => E.equals(h));
        A >= 0 && (Ft(A < 256, "Max lookup table index exceeded"), n.push(A), i.push(h), this.keyMetaMap.delete(s));
      }
    return [n, i];
  }
}
const Mc = "Reached end of buffer unexpectedly";
function hn(r) {
  if (r.length === 0)
    throw new Error(Mc);
  return r.shift();
}
function Fe(r, ...t) {
  const [e] = t;
  if (t.length === 2 ? e + (t[1] ?? 0) > r.length : e >= r.length)
    throw new Error(Mc);
  return r.splice(...t);
}
class dn {
  constructor(t) {
    this.header = void 0, this.accountKeys = void 0, this.recentBlockhash = void 0, this.instructions = void 0, this.indexToProgramIds = /* @__PURE__ */ new Map(), this.header = t.header, this.accountKeys = t.accountKeys.map((e) => new gt(e)), this.recentBlockhash = t.recentBlockhash, this.instructions = t.instructions, this.instructions.forEach((e) => this.indexToProgramIds.set(e.programIdIndex, this.accountKeys[e.programIdIndex]));
  }
  get version() {
    return "legacy";
  }
  get staticAccountKeys() {
    return this.accountKeys;
  }
  get compiledInstructions() {
    return this.instructions.map((t) => ({
      programIdIndex: t.programIdIndex,
      accountKeyIndexes: t.accounts,
      data: Ee.decode(t.data)
    }));
  }
  get addressTableLookups() {
    return [];
  }
  getAccountKeys() {
    return new pi(this.staticAccountKeys);
  }
  static compile(t) {
    const e = xi.compile(t.instructions, t.payerKey), [n, i] = e.getMessageComponents(), l = new pi(i).compileInstructions(t.instructions).map((h) => ({
      programIdIndex: h.programIdIndex,
      accounts: h.accountKeyIndexes,
      data: Ee.encode(h.data)
    }));
    return new dn({
      header: n,
      accountKeys: i,
      recentBlockhash: t.recentBlockhash,
      instructions: l
    });
  }
  isAccountSigner(t) {
    return t < this.header.numRequiredSignatures;
  }
  isAccountWritable(t) {
    const e = this.header.numRequiredSignatures;
    if (t >= this.header.numRequiredSignatures) {
      const n = t - e, s = this.accountKeys.length - e - this.header.numReadonlyUnsignedAccounts;
      return n < s;
    } else {
      const n = e - this.header.numReadonlySignedAccounts;
      return t < n;
    }
  }
  isProgramId(t) {
    return this.indexToProgramIds.has(t);
  }
  programIds() {
    return [...this.indexToProgramIds.values()];
  }
  nonProgramIds() {
    return this.accountKeys.filter((t, e) => !this.isProgramId(e));
  }
  serialize() {
    const t = this.accountKeys.length;
    let e = [];
    Pe(e, t);
    const n = this.instructions.map((T) => {
      const {
        accounts: P,
        programIdIndex: O
      } = T, j = Array.from(Ee.decode(T.data));
      let D = [];
      Pe(D, P.length);
      let N = [];
      return Pe(N, j.length), {
        programIdIndex: O,
        keyIndicesCount: ft.Buffer.from(D),
        keyIndices: P,
        dataLength: ft.Buffer.from(N),
        data: j
      };
    });
    let i = [];
    Pe(i, n.length);
    let s = ft.Buffer.alloc(nr);
    ft.Buffer.from(i).copy(s);
    let l = i.length;
    n.forEach((T) => {
      const O = _.struct([_.u8("programIdIndex"), _.blob(T.keyIndicesCount.length, "keyIndicesCount"), _.seq(_.u8("keyIndex"), T.keyIndices.length, "keyIndices"), _.blob(T.dataLength.length, "dataLength"), _.seq(_.u8("userdatum"), T.data.length, "data")]).encode(T, s, l);
      l += O;
    }), s = s.slice(0, l);
    const h = _.struct([_.blob(1, "numRequiredSignatures"), _.blob(1, "numReadonlySignedAccounts"), _.blob(1, "numReadonlyUnsignedAccounts"), _.blob(e.length, "keyCount"), _.seq(St("key"), t, "keys"), St("recentBlockhash")]), A = {
      numRequiredSignatures: ft.Buffer.from([this.header.numRequiredSignatures]),
      numReadonlySignedAccounts: ft.Buffer.from([this.header.numReadonlySignedAccounts]),
      numReadonlyUnsignedAccounts: ft.Buffer.from([this.header.numReadonlyUnsignedAccounts]),
      keyCount: ft.Buffer.from(e),
      keys: this.accountKeys.map((T) => cr(T.toBytes())),
      recentBlockhash: Ee.decode(this.recentBlockhash)
    };
    let E = ft.Buffer.alloc(2048);
    const v = h.encode(A, E);
    return s.copy(E, v), E.slice(0, v + s.length);
  }
  /**
   * Decode a compiled message into a Message object.
   */
  static from(t) {
    let e = [...t];
    const n = hn(e);
    if (n !== (n & Ao))
      throw new Error("Versioned messages must be deserialized with VersionedMessage.deserialize()");
    const i = hn(e), s = hn(e), l = ze(e);
    let h = [];
    for (let P = 0; P < l; P++) {
      const O = Fe(e, 0, Tn);
      h.push(new gt(ft.Buffer.from(O)));
    }
    const A = Fe(e, 0, Tn), E = ze(e);
    let v = [];
    for (let P = 0; P < E; P++) {
      const O = hn(e), j = ze(e), D = Fe(e, 0, j), N = ze(e), Z = Fe(e, 0, N), Q = Ee.encode(ft.Buffer.from(Z));
      v.push({
        programIdIndex: O,
        accounts: D,
        data: Q
      });
    }
    const T = {
      header: {
        numRequiredSignatures: n,
        numReadonlySignedAccounts: i,
        numReadonlyUnsignedAccounts: s
      },
      recentBlockhash: Ee.encode(ft.Buffer.from(A)),
      accountKeys: h,
      instructions: v
    };
    return new dn(T);
  }
}
class Tr {
  constructor(t) {
    this.header = void 0, this.staticAccountKeys = void 0, this.recentBlockhash = void 0, this.compiledInstructions = void 0, this.addressTableLookups = void 0, this.header = t.header, this.staticAccountKeys = t.staticAccountKeys, this.recentBlockhash = t.recentBlockhash, this.compiledInstructions = t.compiledInstructions, this.addressTableLookups = t.addressTableLookups;
  }
  get version() {
    return 0;
  }
  get numAccountKeysFromLookups() {
    let t = 0;
    for (const e of this.addressTableLookups)
      t += e.readonlyIndexes.length + e.writableIndexes.length;
    return t;
  }
  getAccountKeys(t) {
    let e;
    if (t && "accountKeysFromLookups" in t && t.accountKeysFromLookups) {
      if (this.numAccountKeysFromLookups != t.accountKeysFromLookups.writable.length + t.accountKeysFromLookups.readonly.length)
        throw new Error("Failed to get account keys because of a mismatch in the number of account keys from lookups");
      e = t.accountKeysFromLookups;
    } else if (t && "addressLookupTableAccounts" in t && t.addressLookupTableAccounts)
      e = this.resolveAddressTableLookups(t.addressLookupTableAccounts);
    else if (this.addressTableLookups.length > 0)
      throw new Error("Failed to get account keys because address table lookups were not resolved");
    return new pi(this.staticAccountKeys, e);
  }
  isAccountSigner(t) {
    return t < this.header.numRequiredSignatures;
  }
  isAccountWritable(t) {
    const e = this.header.numRequiredSignatures, n = this.staticAccountKeys.length;
    if (t >= n) {
      const i = t - n, s = this.addressTableLookups.reduce((l, h) => l + h.writableIndexes.length, 0);
      return i < s;
    } else if (t >= this.header.numRequiredSignatures) {
      const i = t - e, l = n - e - this.header.numReadonlyUnsignedAccounts;
      return i < l;
    } else {
      const i = e - this.header.numReadonlySignedAccounts;
      return t < i;
    }
  }
  resolveAddressTableLookups(t) {
    const e = {
      writable: [],
      readonly: []
    };
    for (const n of this.addressTableLookups) {
      const i = t.find((s) => s.key.equals(n.accountKey));
      if (!i)
        throw new Error(`Failed to find address lookup table account for table key ${n.accountKey.toBase58()}`);
      for (const s of n.writableIndexes)
        if (s < i.state.addresses.length)
          e.writable.push(i.state.addresses[s]);
        else
          throw new Error(`Failed to find address for index ${s} in address lookup table ${n.accountKey.toBase58()}`);
      for (const s of n.readonlyIndexes)
        if (s < i.state.addresses.length)
          e.readonly.push(i.state.addresses[s]);
        else
          throw new Error(`Failed to find address for index ${s} in address lookup table ${n.accountKey.toBase58()}`);
    }
    return e;
  }
  static compile(t) {
    const e = xi.compile(t.instructions, t.payerKey), n = new Array(), i = {
      writable: new Array(),
      readonly: new Array()
    }, s = t.addressLookupTableAccounts || [];
    for (const v of s) {
      const T = e.extractTableLookup(v);
      if (T !== void 0) {
        const [P, {
          writable: O,
          readonly: j
        }] = T;
        n.push(P), i.writable.push(...O), i.readonly.push(...j);
      }
    }
    const [l, h] = e.getMessageComponents(), E = new pi(h, i).compileInstructions(t.instructions);
    return new Tr({
      header: l,
      staticAccountKeys: h,
      recentBlockhash: t.recentBlockhash,
      compiledInstructions: E,
      addressTableLookups: n
    });
  }
  serialize() {
    const t = Array();
    Pe(t, this.staticAccountKeys.length);
    const e = this.serializeInstructions(), n = Array();
    Pe(n, this.compiledInstructions.length);
    const i = this.serializeAddressTableLookups(), s = Array();
    Pe(s, this.addressTableLookups.length);
    const l = _.struct([_.u8("prefix"), _.struct([_.u8("numRequiredSignatures"), _.u8("numReadonlySignedAccounts"), _.u8("numReadonlyUnsignedAccounts")], "header"), _.blob(t.length, "staticAccountKeysLength"), _.seq(St(), this.staticAccountKeys.length, "staticAccountKeys"), St("recentBlockhash"), _.blob(n.length, "instructionsLength"), _.blob(e.length, "serializedInstructions"), _.blob(s.length, "addressTableLookupsLength"), _.blob(i.length, "serializedAddressTableLookups")]), h = new Uint8Array(nr), E = l.encode({
      prefix: 128,
      header: this.header,
      staticAccountKeysLength: new Uint8Array(t),
      staticAccountKeys: this.staticAccountKeys.map((v) => v.toBytes()),
      recentBlockhash: Ee.decode(this.recentBlockhash),
      instructionsLength: new Uint8Array(n),
      serializedInstructions: e,
      addressTableLookupsLength: new Uint8Array(s),
      serializedAddressTableLookups: i
    }, h);
    return h.slice(0, E);
  }
  serializeInstructions() {
    let t = 0;
    const e = new Uint8Array(nr);
    for (const n of this.compiledInstructions) {
      const i = Array();
      Pe(i, n.accountKeyIndexes.length);
      const s = Array();
      Pe(s, n.data.length);
      const l = _.struct([_.u8("programIdIndex"), _.blob(i.length, "encodedAccountKeyIndexesLength"), _.seq(_.u8(), n.accountKeyIndexes.length, "accountKeyIndexes"), _.blob(s.length, "encodedDataLength"), _.blob(n.data.length, "data")]);
      t += l.encode({
        programIdIndex: n.programIdIndex,
        encodedAccountKeyIndexesLength: new Uint8Array(i),
        accountKeyIndexes: n.accountKeyIndexes,
        encodedDataLength: new Uint8Array(s),
        data: n.data
      }, e, t);
    }
    return e.slice(0, t);
  }
  serializeAddressTableLookups() {
    let t = 0;
    const e = new Uint8Array(nr);
    for (const n of this.addressTableLookups) {
      const i = Array();
      Pe(i, n.writableIndexes.length);
      const s = Array();
      Pe(s, n.readonlyIndexes.length);
      const l = _.struct([St("accountKey"), _.blob(i.length, "encodedWritableIndexesLength"), _.seq(_.u8(), n.writableIndexes.length, "writableIndexes"), _.blob(s.length, "encodedReadonlyIndexesLength"), _.seq(_.u8(), n.readonlyIndexes.length, "readonlyIndexes")]);
      t += l.encode({
        accountKey: n.accountKey.toBytes(),
        encodedWritableIndexesLength: new Uint8Array(i),
        writableIndexes: n.writableIndexes,
        encodedReadonlyIndexesLength: new Uint8Array(s),
        readonlyIndexes: n.readonlyIndexes
      }, e, t);
    }
    return e.slice(0, t);
  }
  static deserialize(t) {
    let e = [...t];
    const n = hn(e), i = n & Ao;
    Ft(n !== i, "Expected versioned message but received legacy message");
    const s = i;
    Ft(s === 0, `Expected versioned message with version 0 but found version ${s}`);
    const l = {
      numRequiredSignatures: hn(e),
      numReadonlySignedAccounts: hn(e),
      numReadonlyUnsignedAccounts: hn(e)
    }, h = [], A = ze(e);
    for (let j = 0; j < A; j++)
      h.push(new gt(Fe(e, 0, Tn)));
    const E = Ee.encode(Fe(e, 0, Tn)), v = ze(e), T = [];
    for (let j = 0; j < v; j++) {
      const D = hn(e), N = ze(e), Z = Fe(e, 0, N), Q = ze(e), W = new Uint8Array(Fe(e, 0, Q));
      T.push({
        programIdIndex: D,
        accountKeyIndexes: Z,
        data: W
      });
    }
    const P = ze(e), O = [];
    for (let j = 0; j < P; j++) {
      const D = new gt(Fe(e, 0, Tn)), N = ze(e), Z = Fe(e, 0, N), Q = ze(e), W = Fe(e, 0, Q);
      O.push({
        accountKey: D,
        writableIndexes: Z,
        readonlyIndexes: W
      });
    }
    return new Tr({
      header: l,
      staticAccountKeys: h,
      recentBlockhash: E,
      compiledInstructions: T,
      addressTableLookups: O
    });
  }
}
const Sc = {
  deserializeMessageVersion(r) {
    const t = r[0], e = t & Ao;
    return e === t ? "legacy" : e;
  },
  deserialize: (r) => {
    const t = Sc.deserializeMessageVersion(r);
    if (t === "legacy")
      return dn.from(r);
    if (t === 0)
      return Tr.deserialize(r);
    throw new Error(`Transaction message version ${t} deserialization is not supported`);
  }
};
let In = /* @__PURE__ */ function(r) {
  return r[r.BLOCKHEIGHT_EXCEEDED = 0] = "BLOCKHEIGHT_EXCEEDED", r[r.PROCESSED = 1] = "PROCESSED", r[r.TIMED_OUT = 2] = "TIMED_OUT", r[r.NONCE_INVALID = 3] = "NONCE_INVALID", r;
}({});
const Rf = ft.Buffer.alloc(Ai).fill(0);
class ma {
  constructor(t) {
    this.keys = void 0, this.programId = void 0, this.data = ft.Buffer.alloc(0), this.programId = t.programId, this.keys = t.keys, t.data && (this.data = t.data);
  }
  /**
   * @internal
   */
  toJSON() {
    return {
      keys: this.keys.map(({
        pubkey: t,
        isSigner: e,
        isWritable: n
      }) => ({
        pubkey: t.toJSON(),
        isSigner: e,
        isWritable: n
      })),
      programId: this.programId.toJSON(),
      data: [...this.data]
    };
  }
}
class Bn {
  /**
   * The first (payer) Transaction signature
   *
   * @returns {Buffer | null} Buffer of payer's signature
   */
  get signature() {
    return this.signatures.length > 0 ? this.signatures[0].signature : null;
  }
  /**
   * The transaction fee payer
   */
  // Construct a transaction with a blockhash and lastValidBlockHeight
  // Construct a transaction using a durable nonce
  /**
   * @deprecated `TransactionCtorFields` has been deprecated and will be removed in a future version.
   * Please supply a `TransactionBlockhashCtor` instead.
   */
  /**
   * Construct an empty Transaction
   */
  constructor(t) {
    if (this.signatures = [], this.feePayer = void 0, this.instructions = [], this.recentBlockhash = void 0, this.lastValidBlockHeight = void 0, this.nonceInfo = void 0, this.minNonceContextSlot = void 0, this._message = void 0, this._json = void 0, !!t)
      if (t.feePayer && (this.feePayer = t.feePayer), t.signatures && (this.signatures = t.signatures), Object.prototype.hasOwnProperty.call(t, "nonceInfo")) {
        const {
          minContextSlot: e,
          nonceInfo: n
        } = t;
        this.minNonceContextSlot = e, this.nonceInfo = n;
      } else if (Object.prototype.hasOwnProperty.call(t, "lastValidBlockHeight")) {
        const {
          blockhash: e,
          lastValidBlockHeight: n
        } = t;
        this.recentBlockhash = e, this.lastValidBlockHeight = n;
      } else {
        const {
          recentBlockhash: e,
          nonceInfo: n
        } = t;
        n && (this.nonceInfo = n), this.recentBlockhash = e;
      }
  }
  /**
   * @internal
   */
  toJSON() {
    return {
      recentBlockhash: this.recentBlockhash || null,
      feePayer: this.feePayer ? this.feePayer.toJSON() : null,
      nonceInfo: this.nonceInfo ? {
        nonce: this.nonceInfo.nonce,
        nonceInstruction: this.nonceInfo.nonceInstruction.toJSON()
      } : null,
      instructions: this.instructions.map((t) => t.toJSON()),
      signers: this.signatures.map(({
        publicKey: t
      }) => t.toJSON())
    };
  }
  /**
   * Add one or more instructions to this Transaction
   *
   * @param {Array< Transaction | TransactionInstruction | TransactionInstructionCtorFields >} items - Instructions to add to the Transaction
   */
  add(...t) {
    if (t.length === 0)
      throw new Error("No instructions");
    return t.forEach((e) => {
      "instructions" in e ? this.instructions = this.instructions.concat(e.instructions) : "data" in e && "programId" in e && "keys" in e ? this.instructions.push(e) : this.instructions.push(new ma(e));
    }), this;
  }
  /**
   * Compile transaction data
   */
  compileMessage() {
    if (this._message && JSON.stringify(this.toJSON()) === JSON.stringify(this._json))
      return this._message;
    let t, e;
    if (this.nonceInfo ? (t = this.nonceInfo.nonce, this.instructions[0] != this.nonceInfo.nonceInstruction ? e = [this.nonceInfo.nonceInstruction, ...this.instructions] : e = this.instructions) : (t = this.recentBlockhash, e = this.instructions), !t)
      throw new Error("Transaction recentBlockhash required");
    e.length < 1 && console.warn("No instructions provided");
    let n;
    if (this.feePayer)
      n = this.feePayer;
    else if (this.signatures.length > 0 && this.signatures[0].publicKey)
      n = this.signatures[0].publicKey;
    else
      throw new Error("Transaction fee payer required");
    for (let D = 0; D < e.length; D++)
      if (e[D].programId === void 0)
        throw new Error(`Transaction instruction index ${D} has undefined program id`);
    const i = [], s = [];
    e.forEach((D) => {
      D.keys.forEach((Z) => {
        s.push({
          ...Z
        });
      });
      const N = D.programId.toString();
      i.includes(N) || i.push(N);
    }), i.forEach((D) => {
      s.push({
        pubkey: new gt(D),
        isSigner: !1,
        isWritable: !1
      });
    });
    const l = [];
    s.forEach((D) => {
      const N = D.pubkey.toString(), Z = l.findIndex((Q) => Q.pubkey.toString() === N);
      Z > -1 ? (l[Z].isWritable = l[Z].isWritable || D.isWritable, l[Z].isSigner = l[Z].isSigner || D.isSigner) : l.push(D);
    }), l.sort(function(D, N) {
      if (D.isSigner !== N.isSigner)
        return D.isSigner ? -1 : 1;
      if (D.isWritable !== N.isWritable)
        return D.isWritable ? -1 : 1;
      const Z = {
        localeMatcher: "best fit",
        usage: "sort",
        sensitivity: "variant",
        ignorePunctuation: !1,
        numeric: !1,
        caseFirst: "lower"
      };
      return D.pubkey.toBase58().localeCompare(N.pubkey.toBase58(), "en", Z);
    });
    const h = l.findIndex((D) => D.pubkey.equals(n));
    if (h > -1) {
      const [D] = l.splice(h, 1);
      D.isSigner = !0, D.isWritable = !0, l.unshift(D);
    } else
      l.unshift({
        pubkey: n,
        isSigner: !0,
        isWritable: !0
      });
    for (const D of this.signatures) {
      const N = l.findIndex((Z) => Z.pubkey.equals(D.publicKey));
      if (N > -1)
        l[N].isSigner || (l[N].isSigner = !0, console.warn("Transaction references a signature that is unnecessary, only the fee payer and instruction signer accounts should sign a transaction. This behavior is deprecated and will throw an error in the next major version release."));
      else
        throw new Error(`unknown signer: ${D.publicKey.toString()}`);
    }
    let A = 0, E = 0, v = 0;
    const T = [], P = [];
    l.forEach(({
      pubkey: D,
      isSigner: N,
      isWritable: Z
    }) => {
      N ? (T.push(D.toString()), A += 1, Z || (E += 1)) : (P.push(D.toString()), Z || (v += 1));
    });
    const O = T.concat(P), j = e.map((D) => {
      const {
        data: N,
        programId: Z
      } = D;
      return {
        programIdIndex: O.indexOf(Z.toString()),
        accounts: D.keys.map((Q) => O.indexOf(Q.pubkey.toString())),
        data: Ee.encode(N)
      };
    });
    return j.forEach((D) => {
      Ft(D.programIdIndex >= 0), D.accounts.forEach((N) => Ft(N >= 0));
    }), new dn({
      header: {
        numRequiredSignatures: A,
        numReadonlySignedAccounts: E,
        numReadonlyUnsignedAccounts: v
      },
      accountKeys: O,
      recentBlockhash: t,
      instructions: j
    });
  }
  /**
   * @internal
   */
  _compile() {
    const t = this.compileMessage(), e = t.accountKeys.slice(0, t.header.numRequiredSignatures);
    return this.signatures.length === e.length && this.signatures.every((i, s) => e[s].equals(i.publicKey)) || (this.signatures = e.map((n) => ({
      signature: null,
      publicKey: n
    }))), t;
  }
  /**
   * Get a buffer of the Transaction data that need to be covered by signatures
   */
  serializeMessage() {
    return this._compile().serialize();
  }
  /**
   * Get the estimated fee associated with a transaction
   *
   * @param {Connection} connection Connection to RPC Endpoint.
   *
   * @returns {Promise<number | null>} The estimated fee for the transaction
   */
  async getEstimatedFee(t) {
    return (await t.getFeeForMessage(this.compileMessage())).value;
  }
  /**
   * Specify the public keys which will be used to sign the Transaction.
   * The first signer will be used as the transaction fee payer account.
   *
   * Signatures can be added with either `partialSign` or `addSignature`
   *
   * @deprecated Deprecated since v0.84.0. Only the fee payer needs to be
   * specified and it can be set in the Transaction constructor or with the
   * `feePayer` property.
   */
  setSigners(...t) {
    if (t.length === 0)
      throw new Error("No signers");
    const e = /* @__PURE__ */ new Set();
    this.signatures = t.filter((n) => {
      const i = n.toString();
      return e.has(i) ? !1 : (e.add(i), !0);
    }).map((n) => ({
      signature: null,
      publicKey: n
    }));
  }
  /**
   * Sign the Transaction with the specified signers. Multiple signatures may
   * be applied to a Transaction. The first signature is considered "primary"
   * and is used identify and confirm transactions.
   *
   * If the Transaction `feePayer` is not set, the first signer will be used
   * as the transaction fee payer account.
   *
   * Transaction fields should not be modified after the first call to `sign`,
   * as doing so may invalidate the signature and cause the Transaction to be
   * rejected.
   *
   * The Transaction must be assigned a valid `recentBlockhash` before invoking this method
   *
   * @param {Array<Signer>} signers Array of signers that will sign the transaction
   */
  sign(...t) {
    if (t.length === 0)
      throw new Error("No signers");
    const e = /* @__PURE__ */ new Set(), n = [];
    for (const s of t) {
      const l = s.publicKey.toString();
      e.has(l) || (e.add(l), n.push(s));
    }
    this.signatures = n.map((s) => ({
      signature: null,
      publicKey: s.publicKey
    }));
    const i = this._compile();
    this._partialSign(i, ...n);
  }
  /**
   * Partially sign a transaction with the specified accounts. All accounts must
   * correspond to either the fee payer or a signer account in the transaction
   * instructions.
   *
   * All the caveats from the `sign` method apply to `partialSign`
   *
   * @param {Array<Signer>} signers Array of signers that will sign the transaction
   */
  partialSign(...t) {
    if (t.length === 0)
      throw new Error("No signers");
    const e = /* @__PURE__ */ new Set(), n = [];
    for (const s of t) {
      const l = s.publicKey.toString();
      e.has(l) || (e.add(l), n.push(s));
    }
    const i = this._compile();
    this._partialSign(i, ...n);
  }
  /**
   * @internal
   */
  _partialSign(t, ...e) {
    const n = t.serialize();
    e.forEach((i) => {
      const s = bc(n, i.secretKey);
      this._addSignature(i.publicKey, cr(s));
    });
  }
  /**
   * Add an externally created signature to a transaction. The public key
   * must correspond to either the fee payer or a signer account in the transaction
   * instructions.
   *
   * @param {PublicKey} pubkey Public key that will be added to the transaction.
   * @param {Buffer} signature An externally created signature to add to the transaction.
   */
  addSignature(t, e) {
    this._compile(), this._addSignature(t, e);
  }
  /**
   * @internal
   */
  _addSignature(t, e) {
    Ft(e.length === 64);
    const n = this.signatures.findIndex((i) => t.equals(i.publicKey));
    if (n < 0)
      throw new Error(`unknown signer: ${t.toString()}`);
    this.signatures[n].signature = ft.Buffer.from(e);
  }
  /**
   * Verify signatures of a Transaction
   * Optional parameter specifies if we're expecting a fully signed Transaction or a partially signed one.
   * If no boolean is provided, we expect a fully signed Transaction by default.
   *
   * @param {boolean} [requireAllSignatures=true] Require a fully signed Transaction
   */
  verifySignatures(t = !0) {
    return !this._getMessageSignednessErrors(this.serializeMessage(), t);
  }
  /**
   * @internal
   */
  _getMessageSignednessErrors(t, e) {
    const n = {};
    for (const {
      signature: i,
      publicKey: s
    } of this.signatures)
      i === null ? e && (n.missing || (n.missing = [])).push(s) : Mf(i, t, s.toBytes()) || (n.invalid || (n.invalid = [])).push(s);
    return n.invalid || n.missing ? n : void 0;
  }
  /**
   * Serialize the Transaction in the wire format.
   *
   * @param {Buffer} [config] Config of transaction.
   *
   * @returns {Buffer} Signature of transaction in wire format.
   */
  serialize(t) {
    const {
      requireAllSignatures: e,
      verifySignatures: n
    } = Object.assign({
      requireAllSignatures: !0,
      verifySignatures: !0
    }, t), i = this.serializeMessage();
    if (n) {
      const s = this._getMessageSignednessErrors(i, e);
      if (s) {
        let l = "Signature verification failed.";
        throw s.invalid && (l += `
Invalid signature for public key${s.invalid.length === 1 ? "" : "(s)"} [\`${s.invalid.map((h) => h.toBase58()).join("`, `")}\`].`), s.missing && (l += `
Missing signature for public key${s.missing.length === 1 ? "" : "(s)"} [\`${s.missing.map((h) => h.toBase58()).join("`, `")}\`].`), new Error(l);
      }
    }
    return this._serialize(i);
  }
  /**
   * @internal
   */
  _serialize(t) {
    const {
      signatures: e
    } = this, n = [];
    Pe(n, e.length);
    const i = n.length + e.length * 64 + t.length, s = ft.Buffer.alloc(i);
    return Ft(e.length < 256), ft.Buffer.from(n).copy(s, 0), e.forEach(({
      signature: l
    }, h) => {
      l !== null && (Ft(l.length === 64, "signature has invalid length"), ft.Buffer.from(l).copy(s, n.length + h * 64));
    }), t.copy(s, n.length + e.length * 64), Ft(s.length <= nr, `Transaction too large: ${s.length} > ${nr}`), s;
  }
  /**
   * Deprecated method
   * @internal
   */
  get keys() {
    return Ft(this.instructions.length === 1), this.instructions[0].keys.map((t) => t.pubkey);
  }
  /**
   * Deprecated method
   * @internal
   */
  get programId() {
    return Ft(this.instructions.length === 1), this.instructions[0].programId;
  }
  /**
   * Deprecated method
   * @internal
   */
  get data() {
    return Ft(this.instructions.length === 1), this.instructions[0].data;
  }
  /**
   * Parse a wire transaction into a Transaction object.
   *
   * @param {Buffer | Uint8Array | Array<number>} buffer Signature of wire Transaction
   *
   * @returns {Transaction} Transaction associated with the signature
   */
  static from(t) {
    let e = [...t];
    const n = ze(e);
    let i = [];
    for (let s = 0; s < n; s++) {
      const l = Fe(e, 0, Ai);
      i.push(Ee.encode(ft.Buffer.from(l)));
    }
    return Bn.populate(dn.from(e), i);
  }
  /**
   * Populate Transaction object from message and signatures
   *
   * @param {Message} message Message of transaction
   * @param {Array<string>} signatures List of signatures to assign to the transaction
   *
   * @returns {Transaction} The populated Transaction
   */
  static populate(t, e = []) {
    const n = new Bn();
    return n.recentBlockhash = t.recentBlockhash, t.header.numRequiredSignatures > 0 && (n.feePayer = t.accountKeys[0]), e.forEach((i, s) => {
      const l = {
        signature: i == Ee.encode(Rf) ? null : Ee.decode(i),
        publicKey: t.accountKeys[s]
      };
      n.signatures.push(l);
    }), t.instructions.forEach((i) => {
      const s = i.accounts.map((l) => {
        const h = t.accountKeys[l];
        return {
          pubkey: h,
          isSigner: n.signatures.some((A) => A.publicKey.toString() === h.toString()) || t.isAccountSigner(l),
          isWritable: t.isAccountWritable(l)
        };
      });
      n.instructions.push(new ma({
        keys: s,
        programId: t.accountKeys[i.programIdIndex],
        data: Ee.decode(i.data)
      }));
    }), n._message = t, n._json = n.toJSON(), n;
  }
}
class xc {
  get version() {
    return this.message.version;
  }
  constructor(t, e) {
    if (this.signatures = void 0, this.message = void 0, e !== void 0)
      Ft(e.length === t.header.numRequiredSignatures, "Expected signatures length to be equal to the number of required signatures"), this.signatures = e;
    else {
      const n = [];
      for (let i = 0; i < t.header.numRequiredSignatures; i++)
        n.push(new Uint8Array(Ai));
      this.signatures = n;
    }
    this.message = t;
  }
  serialize() {
    const t = this.message.serialize(), e = Array();
    Pe(e, this.signatures.length);
    const n = _.struct([_.blob(e.length, "encodedSignaturesLength"), _.seq(Cf(), this.signatures.length, "signatures"), _.blob(t.length, "serializedMessage")]), i = new Uint8Array(2048), s = n.encode({
      encodedSignaturesLength: new Uint8Array(e),
      signatures: this.signatures,
      serializedMessage: t
    }, i);
    return i.slice(0, s);
  }
  static deserialize(t) {
    let e = [...t];
    const n = [], i = ze(e);
    for (let l = 0; l < i; l++)
      n.push(new Uint8Array(Fe(e, 0, Ai)));
    const s = Sc.deserialize(new Uint8Array(e));
    return new xc(s, n);
  }
  sign(t) {
    const e = this.message.serialize(), n = this.message.staticAccountKeys.slice(0, this.message.header.numRequiredSignatures);
    for (const i of t) {
      const s = n.findIndex((l) => l.equals(i.publicKey));
      Ft(s >= 0, `Cannot sign with non signer key ${i.publicKey.toBase58()}`), this.signatures[s] = bc(e, i.secretKey);
    }
  }
  addSignature(t, e) {
    Ft(e.byteLength === 64, "Signature must be 64 bytes long");
    const i = this.message.staticAccountKeys.slice(0, this.message.header.numRequiredSignatures).findIndex((s) => s.equals(t));
    Ft(i >= 0, `Can not add signature; \`${t.toBase58()}\` is not required to sign this transaction`), this.signatures[i] = e;
  }
}
const Df = 160, Of = 64, Uf = Df / Of, jf = 1e3 / Uf;
new gt("SysvarC1ock11111111111111111111111111111111");
new gt("SysvarEpochSchedu1e111111111111111111111111");
new gt("Sysvar1nstructions1111111111111111111111111");
new gt("SysvarRecentB1ockHashes11111111111111111111");
new gt("SysvarRent111111111111111111111111111111111");
new gt("SysvarRewards111111111111111111111111111111");
new gt("SysvarS1otHashes111111111111111111111111111");
new gt("SysvarS1otHistory11111111111111111111111111");
new gt("SysvarStakeHistory1111111111111111111111111");
class ba extends Error {
  constructor({
    action: t,
    signature: e,
    transactionMessage: n,
    logs: i
  }) {
    const s = i ? `Logs: 
${JSON.stringify(i.slice(-10), null, 2)}. ` : "", l = "\nCatch the `SendTransactionError` and call `getLogs()` on it for full details.";
    let h;
    switch (t) {
      case "send":
        h = `Transaction ${e} resulted in an error. 
${n}. ` + s + l;
        break;
      case "simulate":
        h = `Simulation failed. 
Message: ${n}. 
` + s + l;
        break;
      default:
        h = `Unknown action '${/* @__PURE__ */ ((A) => A)(t)}'`;
    }
    super(h), this.signature = void 0, this.transactionMessage = void 0, this.transactionLogs = void 0, this.signature = e, this.transactionMessage = n, this.transactionLogs = i || void 0;
  }
  get transactionError() {
    return {
      message: this.transactionMessage,
      logs: Array.isArray(this.transactionLogs) ? this.transactionLogs : void 0
    };
  }
  /* @deprecated Use `await getLogs()` instead */
  get logs() {
    const t = this.transactionLogs;
    if (!(t != null && typeof t == "object" && "then" in t))
      return t;
  }
  async getLogs(t) {
    return Array.isArray(this.transactionLogs) || (this.transactionLogs = new Promise((e, n) => {
      t.getTransaction(this.signature).then((i) => {
        if (i && i.meta && i.meta.logMessages) {
          const s = i.meta.logMessages;
          this.transactionLogs = s, e(s);
        } else
          n(new Error("Log messages not found"));
      }).catch(n);
    })), await this.transactionLogs;
  }
}
class dt extends Error {
  constructor({
    code: t,
    message: e,
    data: n
  }, i) {
    super(i != null ? `${i}: ${e}` : e), this.code = void 0, this.data = void 0, this.code = t, this.data = n, this.name = "SolanaJSONRPCError";
  }
}
function Xn(r) {
  return new Promise((t) => setTimeout(t, r));
}
const zf = _.nu64("lamportsPerSignature"), Bc = _.struct([_.u32("version"), _.u32("state"), St("authorizedPubkey"), St("nonce"), _.struct([zf], "feeCalculator")]);
Bc.span;
class po {
  /**
   * @internal
   */
  constructor(t) {
    this.authorizedPubkey = void 0, this.nonce = void 0, this.feeCalculator = void 0, this.authorizedPubkey = t.authorizedPubkey, this.nonce = t.nonce, this.feeCalculator = t.feeCalculator;
  }
  /**
   * Deserialize NonceAccount from the account data.
   *
   * @param buffer account data
   * @return NonceAccount
   */
  static fromAccountData(t) {
    const e = Bc.decode(cr(t), 0);
    return new po({
      authorizedPubkey: new gt(e.authorizedPubkey),
      nonce: new gt(e.nonce).toString(),
      feeCalculator: e.feeCalculator
    });
  }
}
const Pf = (r) => {
  const t = r.decode.bind(r), e = r.encode.bind(r);
  return {
    decode: t,
    encode: e
  };
}, Ff = (r) => (t) => {
  const e = _.blob(r, t), {
    encode: n,
    decode: i
  } = Pf(e), s = e;
  return s.decode = (l, h) => {
    const A = i(l, h);
    return aa.toBigIntLE(ft.Buffer.from(A));
  }, s.encode = (l, h, A) => {
    const E = aa.toBufferLE(l, r);
    return n(E, h, A);
  }, s;
}, ur = Ff(8);
Object.freeze({
  Create: {
    index: 0,
    layout: _.struct([_.u32("instruction"), _.ns64("lamports"), _.ns64("space"), St("programId")])
  },
  Assign: {
    index: 1,
    layout: _.struct([_.u32("instruction"), St("programId")])
  },
  Transfer: {
    index: 2,
    layout: _.struct([_.u32("instruction"), ur("lamports")])
  },
  CreateWithSeed: {
    index: 3,
    layout: _.struct([_.u32("instruction"), St("base"), $n("seed"), _.ns64("lamports"), _.ns64("space"), St("programId")])
  },
  AdvanceNonceAccount: {
    index: 4,
    layout: _.struct([_.u32("instruction")])
  },
  WithdrawNonceAccount: {
    index: 5,
    layout: _.struct([_.u32("instruction"), _.ns64("lamports")])
  },
  InitializeNonceAccount: {
    index: 6,
    layout: _.struct([_.u32("instruction"), St("authorized")])
  },
  AuthorizeNonceAccount: {
    index: 7,
    layout: _.struct([_.u32("instruction"), St("authorized")])
  },
  Allocate: {
    index: 8,
    layout: _.struct([_.u32("instruction"), _.ns64("space")])
  },
  AllocateWithSeed: {
    index: 9,
    layout: _.struct([_.u32("instruction"), St("base"), $n("seed"), _.ns64("space"), St("programId")])
  },
  AssignWithSeed: {
    index: 10,
    layout: _.struct([_.u32("instruction"), St("base"), $n("seed"), St("programId")])
  },
  TransferWithSeed: {
    index: 11,
    layout: _.struct([_.u32("instruction"), ur("lamports"), $n("seed"), St("programId")])
  },
  UpgradeNonceAccount: {
    index: 12,
    layout: _.struct([_.u32("instruction")])
  }
});
new gt("11111111111111111111111111111111");
new gt("BPFLoader2111111111111111111111111111111111");
function Qf(r) {
  return r && r.__esModule && Object.prototype.hasOwnProperty.call(r, "default") ? r.default : r;
}
var vs, Ea;
function _f() {
  if (Ea) return vs;
  Ea = 1;
  var r = Object.prototype.toString, t = Object.keys || function(n) {
    var i = [];
    for (var s in n)
      i.push(s);
    return i;
  };
  function e(n, i) {
    var s, l, h, A, E, v, T;
    if (n === !0)
      return "true";
    if (n === !1)
      return "false";
    switch (typeof n) {
      case "object":
        if (n === null)
          return null;
        if (n.toJSON && typeof n.toJSON == "function")
          return e(n.toJSON(), i);
        if (T = r.call(n), T === "[object Array]") {
          for (h = "[", l = n.length - 1, s = 0; s < l; s++)
            h += e(n[s], !0) + ",";
          return l > -1 && (h += e(n[s], !0)), h + "]";
        } else if (T === "[object Object]") {
          for (A = t(n).sort(), l = A.length, h = "", s = 0; s < l; )
            E = A[s], v = e(n[E], !1), v !== void 0 && (h && (h += ","), h += JSON.stringify(E) + ":" + v), s++;
          return "{" + h + "}";
        } else
          return JSON.stringify(n);
      case "function":
      case "undefined":
        return i ? null : void 0;
      case "string":
        return JSON.stringify(n);
      default:
        return isFinite(n) ? n : null;
    }
  }
  return vs = function(n) {
    var i = e(n, !1);
    if (i !== void 0)
      return "" + i;
  }, vs;
}
var Wf = /* @__PURE__ */ _f(), va = /* @__PURE__ */ Qf(Wf);
const dr = 32;
function Is(r) {
  let t = 0;
  for (; r > 1; )
    r /= 2, t++;
  return t;
}
function qf(r) {
  return r === 0 ? 1 : (r--, r |= r >> 1, r |= r >> 2, r |= r >> 4, r |= r >> 8, r |= r >> 16, r |= r >> 32, r + 1);
}
class Hf {
  constructor(t, e, n, i, s) {
    this.slotsPerEpoch = void 0, this.leaderScheduleSlotOffset = void 0, this.warmup = void 0, this.firstNormalEpoch = void 0, this.firstNormalSlot = void 0, this.slotsPerEpoch = t, this.leaderScheduleSlotOffset = e, this.warmup = n, this.firstNormalEpoch = i, this.firstNormalSlot = s;
  }
  getEpoch(t) {
    return this.getEpochAndSlotIndex(t)[0];
  }
  getEpochAndSlotIndex(t) {
    if (t < this.firstNormalSlot) {
      const e = Is(qf(t + dr + 1)) - Is(dr) - 1, n = this.getSlotsInEpoch(e), i = t - (n - dr);
      return [e, i];
    } else {
      const e = t - this.firstNormalSlot, n = Math.floor(e / this.slotsPerEpoch), i = this.firstNormalEpoch + n, s = e % this.slotsPerEpoch;
      return [i, s];
    }
  }
  getFirstSlotInEpoch(t) {
    return t <= this.firstNormalEpoch ? (Math.pow(2, t) - 1) * dr : (t - this.firstNormalEpoch) * this.slotsPerEpoch + this.firstNormalSlot;
  }
  getLastSlotInEpoch(t) {
    return this.getFirstSlotInEpoch(t) + this.getSlotsInEpoch(t) - 1;
  }
  getSlotsInEpoch(t) {
    return t < this.firstNormalEpoch ? Math.pow(2, t + Is(dr)) : this.slotsPerEpoch;
  }
}
var Zf = globalThis.fetch;
class Yf extends df {
  constructor(t, e, n) {
    const i = (s) => {
      const l = hf(s, {
        autoconnect: !0,
        max_reconnects: 5,
        reconnect: !0,
        reconnect_interval: 1e3,
        ...e
      });
      return "socket" in l ? this.underlyingSocket = l.socket : this.underlyingSocket = l, l;
    };
    super(i, t, e, n), this.underlyingSocket = void 0;
  }
  call(...t) {
    const e = this.underlyingSocket?.readyState;
    return e === 1 ? super.call(...t) : Promise.reject(new Error("Tried to call a JSON-RPC method `" + t[0] + "` but the socket was not `CONNECTING` or `OPEN` (`readyState` was " + e + ")"));
  }
  notify(...t) {
    const e = this.underlyingSocket?.readyState;
    return e === 1 ? super.notify(...t) : Promise.reject(new Error("Tried to send a JSON-RPC notification `" + t[0] + "` but the socket was not `CONNECTING` or `OPEN` (`readyState` was " + e + ")"));
  }
}
function Gf(r, t) {
  let e;
  try {
    e = r.layout.decode(t);
  } catch (n) {
    throw new Error("invalid instruction; " + n);
  }
  if (e.typeIndex !== r.index)
    throw new Error(`invalid account data; account type mismatch ${e.typeIndex} != ${r.index}`);
  return e;
}
const Ia = 56;
class Ma {
  constructor(t) {
    this.key = void 0, this.state = void 0, this.key = t.key, this.state = t.state;
  }
  isActive() {
    const t = BigInt("0xffffffffffffffff");
    return this.state.deactivationSlot === t;
  }
  static deserialize(t) {
    const e = Gf(Jf, t), n = t.length - Ia;
    Ft(n >= 0, "lookup table is invalid"), Ft(n % 32 === 0, "lookup table is invalid");
    const i = n / 32, {
      addresses: s
    } = _.struct([_.seq(St(), i, "addresses")]).decode(t.slice(Ia));
    return {
      deactivationSlot: e.deactivationSlot,
      lastExtendedSlot: e.lastExtendedSlot,
      lastExtendedSlotStartIndex: e.lastExtendedStartIndex,
      authority: e.authority.length !== 0 ? new gt(e.authority[0]) : void 0,
      addresses: s.map((l) => new gt(l))
    };
  }
}
const Jf = {
  index: 1,
  layout: _.struct([
    _.u32("typeIndex"),
    ur("deactivationSlot"),
    _.nu64("lastExtendedSlot"),
    _.u8("lastExtendedStartIndex"),
    _.u8(),
    // option
    _.seq(St(), _.offset(_.u8(), -1), "authority")
  ])
}, Kf = /^[^:]+:\/\/([^:[]+|\[[^\]]+\])(:\d+)?(.*)/i;
function Vf(r) {
  const t = r.match(Kf);
  if (t == null)
    throw TypeError(`Failed to validate endpoint URL \`${r}\``);
  const [
    e,
    // eslint-disable-line @typescript-eslint/no-unused-vars
    n,
    i,
    s
  ] = t, l = r.startsWith("https:") ? "wss:" : "ws:", h = i == null ? null : parseInt(i.slice(1), 10), A = (
    // Only shift the port by +1 as a convention for ws(s) only if given endpoint
    // is explicitly specifying the endpoint port (HTTP-based RPC), assuming
    // we're directly trying to connect to agave-validator's ws listening port.
    // When the endpoint omits the port, we're connecting to the protocol
    // default ports: http(80) or https(443) and it's assumed we're behind a reverse
    // proxy which manages WebSocket upgrade and backend port redirection.
    h == null ? "" : `:${h + 1}`
  );
  return `${l}//${n}${A}${s}`;
}
const Ht = zr(fo(gt), et(), (r) => new gt(r)), Cc = go([et(), Wt("base64")]), wo = zr(fo(ft.Buffer), Cc, (r) => ft.Buffer.from(r[0], "base64")), Xf = 30 * 1e3;
function $f(r) {
  if (/^https?:/.test(r) === !1)
    throw new TypeError("Endpoint URL must start with `http:` or `https:`.");
  return r;
}
function Ot(r) {
  let t, e;
  if (typeof r == "string")
    t = r;
  else if (r) {
    const {
      commitment: n,
      ...i
    } = r;
    t = n, e = i;
  }
  return {
    commitment: t,
    config: e
  };
}
function Sa(r) {
  return r.map((t) => "memcmp" in t ? {
    ...t,
    memcmp: {
      ...t.memcmp,
      encoding: t.memcmp.encoding ?? "base58"
    }
  } : t);
}
function kc(r) {
  return Te([$({
    jsonrpc: Wt("2.0"),
    id: et(),
    result: r
  }), $({
    jsonrpc: Wt("2.0"),
    id: et(),
    error: $({
      code: lr(),
      message: et(),
      data: mt(Uh())
    })
  })]);
}
const td = kc(lr());
function Mt(r) {
  return zr(kc(r), td, (t) => "error" in t ? t : {
    ...t,
    result: rt(t.result, r)
  });
}
function Gt(r) {
  return Mt($({
    context: $({
      slot: Y()
    }),
    value: r
  }));
}
function Bi(r) {
  return $({
    context: $({
      slot: Y()
    }),
    value: r
  });
}
function Ms(r, t) {
  return r === 0 ? new Tr({
    header: t.header,
    staticAccountKeys: t.accountKeys.map((e) => new gt(e)),
    recentBlockhash: t.recentBlockhash,
    compiledInstructions: t.instructions.map((e) => ({
      programIdIndex: e.programIdIndex,
      accountKeyIndexes: e.accounts,
      data: Ee.decode(e.data)
    })),
    addressTableLookups: t.addressTableLookups
  }) : new dn(t);
}
const ed = $({
  foundation: Y(),
  foundationTerm: Y(),
  initial: Y(),
  taper: Y(),
  terminal: Y()
}), nd = Mt(it(ot($({
  epoch: Y(),
  effectiveSlot: Y(),
  amount: Y(),
  postBalance: Y(),
  commission: mt(ot(Y()))
})))), rd = it($({
  slot: Y(),
  prioritizationFee: Y()
})), id = $({
  total: Y(),
  validator: Y(),
  foundation: Y(),
  epoch: Y()
}), sd = $({
  epoch: Y(),
  slotIndex: Y(),
  slotsInEpoch: Y(),
  absoluteSlot: Y(),
  blockHeight: mt(Y()),
  transactionCount: mt(Y())
}), od = $({
  slotsPerEpoch: Y(),
  leaderScheduleSlotOffset: Y(),
  warmup: en(),
  firstNormalEpoch: Y(),
  firstNormalSlot: Y()
}), ad = lc(et(), it(Y())), qn = ot(Te([$({}), et()])), cd = $({
  err: qn
}), ud = Wt("receivedSignature"), ld = $({
  "solana-core": et(),
  "feature-set": mt(Y())
}), hd = $({
  program: et(),
  programId: Ht,
  parsed: lr()
}), fd = $({
  programId: Ht,
  accounts: it(Ht),
  data: et()
}), xa = Gt($({
  err: ot(Te([$({}), et()])),
  logs: ot(it(et())),
  accounts: mt(ot(it(ot($({
    executable: en(),
    owner: et(),
    lamports: Y(),
    data: it(et()),
    rentEpoch: mt(Y())
  }))))),
  unitsConsumed: mt(Y()),
  returnData: mt(ot($({
    programId: et(),
    data: go([et(), Wt("base64")])
  }))),
  innerInstructions: mt(ot(it($({
    index: Y(),
    instructions: it(Te([hd, fd]))
  }))))
})), dd = Gt($({
  byIdentity: lc(et(), it(Y())),
  range: $({
    firstSlot: Y(),
    lastSlot: Y()
  })
}));
function gd(r, t, e, n, i, s) {
  const l = e || Zf;
  let h;
  s != null && console.warn("You have supplied an `httpAgent` when creating a `Connection` in a browser environment.It has been ignored; `httpAgent` is only used in Node environments.");
  let A;
  return n && (A = async (v, T) => {
    const P = await new Promise((O, j) => {
      try {
        n(v, T, (D, N) => O([D, N]));
      } catch (D) {
        j(D);
      }
    });
    return await l(...P);
  }), new af(async (v, T) => {
    const P = {
      method: "POST",
      body: v,
      agent: h,
      headers: Object.assign({
        "Content-Type": "application/json"
      }, t || {}, g0)
    };
    try {
      let O = 5, j, D = 500;
      for (; A ? j = await A(r, P) : j = await l(r, P), !(j.status !== 429 || i === !0 || (O -= 1, O === 0)); )
        console.error(`Server responded with ${j.status} ${j.statusText}.  Retrying after ${D}ms delay...`), await Xn(D), D *= 2;
      const N = await j.text();
      j.ok ? T(null, N) : T(new Error(`${j.status} ${j.statusText}: ${N}`));
    } catch (O) {
      O instanceof Error && T(O);
    }
  }, {});
}
function Ad(r) {
  return (t, e) => new Promise((n, i) => {
    r.request(t, e, (s, l) => {
      if (s) {
        i(s);
        return;
      }
      n(l);
    });
  });
}
function pd(r) {
  return (t) => new Promise((e, n) => {
    t.length === 0 && e([]);
    const i = t.map((s) => r.request(s.methodName, s.args));
    r.request(i, (s, l) => {
      if (s) {
        n(s);
        return;
      }
      e(l);
    });
  });
}
const wd = Mt(ed), yd = Mt(id), md = Mt(rd), bd = Mt(sd), Ed = Mt(od), vd = Mt(ad), Id = Mt(Y()), Md = Gt($({
  total: Y(),
  circulating: Y(),
  nonCirculating: Y(),
  nonCirculatingAccounts: it(Ht)
})), zs = $({
  amount: et(),
  uiAmount: ot(Y()),
  decimals: Y(),
  uiAmountString: mt(et())
}), Sd = Gt(it($({
  address: Ht,
  amount: et(),
  uiAmount: ot(Y()),
  decimals: Y(),
  uiAmountString: mt(et())
}))), xd = Gt(it($({
  pubkey: Ht,
  account: $({
    executable: en(),
    owner: Ht,
    lamports: Y(),
    data: wo,
    rentEpoch: Y()
  })
}))), Ps = $({
  program: et(),
  parsed: lr(),
  space: Y()
}), Bd = Gt(it($({
  pubkey: Ht,
  account: $({
    executable: en(),
    owner: Ht,
    lamports: Y(),
    data: Ps,
    rentEpoch: Y()
  })
}))), Cd = Gt(it($({
  lamports: Y(),
  address: Ht
}))), Lr = $({
  executable: en(),
  owner: Ht,
  lamports: Y(),
  data: wo,
  rentEpoch: Y()
}), kd = $({
  pubkey: Ht,
  account: Lr
}), Nd = zr(Te([fo(ft.Buffer), Ps]), Te([Cc, Ps]), (r) => Array.isArray(r) ? rt(r, wo) : r), Fs = $({
  executable: en(),
  owner: Ht,
  lamports: Y(),
  data: Nd,
  rentEpoch: Y()
}), Td = $({
  pubkey: Ht,
  account: Fs
}), Ld = $({
  state: Te([Wt("active"), Wt("inactive"), Wt("activating"), Wt("deactivating")]),
  active: Y(),
  inactive: Y()
}), Rd = Mt(it($({
  signature: et(),
  slot: Y(),
  err: qn,
  memo: ot(et()),
  blockTime: mt(ot(Y()))
}))), Dd = Mt(it($({
  signature: et(),
  slot: Y(),
  err: qn,
  memo: ot(et()),
  blockTime: mt(ot(Y()))
}))), Od = $({
  subscription: Y(),
  result: Bi(Lr)
}), Ud = $({
  pubkey: Ht,
  account: Lr
}), jd = $({
  subscription: Y(),
  result: Bi(Ud)
}), zd = $({
  parent: Y(),
  slot: Y(),
  root: Y()
}), Pd = $({
  subscription: Y(),
  result: zd
}), Fd = Te([$({
  type: Te([Wt("firstShredReceived"), Wt("completed"), Wt("optimisticConfirmation"), Wt("root")]),
  slot: Y(),
  timestamp: Y()
}), $({
  type: Wt("createdBank"),
  parent: Y(),
  slot: Y(),
  timestamp: Y()
}), $({
  type: Wt("frozen"),
  slot: Y(),
  timestamp: Y(),
  stats: $({
    numTransactionEntries: Y(),
    numSuccessfulTransactions: Y(),
    numFailedTransactions: Y(),
    maxTransactionsPerEntry: Y()
  })
}), $({
  type: Wt("dead"),
  slot: Y(),
  timestamp: Y(),
  err: et()
})]), Qd = $({
  subscription: Y(),
  result: Fd
}), _d = $({
  subscription: Y(),
  result: Bi(Te([cd, ud]))
}), Wd = $({
  subscription: Y(),
  result: Y()
}), qd = $({
  pubkey: et(),
  gossip: ot(et()),
  tpu: ot(et()),
  rpc: ot(et()),
  version: ot(et())
}), Ba = $({
  votePubkey: et(),
  nodePubkey: et(),
  activatedStake: Y(),
  epochVoteAccount: en(),
  epochCredits: it(go([Y(), Y(), Y()])),
  commission: Y(),
  lastVote: Y(),
  rootSlot: ot(Y())
}), Hd = Mt($({
  current: it(Ba),
  delinquent: it(Ba)
})), Zd = Te([Wt("processed"), Wt("confirmed"), Wt("finalized")]), Yd = $({
  slot: Y(),
  confirmations: ot(Y()),
  err: qn,
  confirmationStatus: mt(Zd)
}), Gd = Gt(it(ot(Yd))), Jd = Mt(Y()), Nc = $({
  accountKey: Ht,
  writableIndexes: it(Y()),
  readonlyIndexes: it(Y())
}), yo = $({
  signatures: it(et()),
  message: $({
    accountKeys: it(et()),
    header: $({
      numRequiredSignatures: Y(),
      numReadonlySignedAccounts: Y(),
      numReadonlyUnsignedAccounts: Y()
    }),
    instructions: it($({
      accounts: it(Y()),
      data: et(),
      programIdIndex: Y()
    })),
    recentBlockhash: et(),
    addressTableLookups: mt(it(Nc))
  })
}), Tc = $({
  pubkey: Ht,
  signer: en(),
  writable: en(),
  source: mt(Te([Wt("transaction"), Wt("lookupTable")]))
}), Lc = $({
  accountKeys: it(Tc),
  signatures: it(et())
}), Rc = $({
  parsed: lr(),
  program: et(),
  programId: Ht
}), Dc = $({
  accounts: it(Ht),
  data: et(),
  programId: Ht
}), Kd = Te([Dc, Rc]), Vd = Te([$({
  parsed: lr(),
  program: et(),
  programId: et()
}), $({
  accounts: it(et()),
  data: et(),
  programId: et()
})]), Oc = zr(Kd, Vd, (r) => "accounts" in r ? rt(r, Dc) : rt(r, Rc)), Uc = $({
  signatures: it(et()),
  message: $({
    accountKeys: it(Tc),
    instructions: it(Oc),
    recentBlockhash: et(),
    addressTableLookups: mt(ot(it(Nc)))
  })
}), wi = $({
  accountIndex: Y(),
  mint: et(),
  owner: mt(et()),
  programId: mt(et()),
  uiTokenAmount: zs
}), jc = $({
  writable: it(Ht),
  readonly: it(Ht)
}), Ci = $({
  err: qn,
  fee: Y(),
  innerInstructions: mt(ot(it($({
    index: Y(),
    instructions: it($({
      accounts: it(Y()),
      data: et(),
      programIdIndex: Y()
    }))
  })))),
  preBalances: it(Y()),
  postBalances: it(Y()),
  logMessages: mt(ot(it(et()))),
  preTokenBalances: mt(ot(it(wi))),
  postTokenBalances: mt(ot(it(wi))),
  loadedAddresses: mt(jc),
  computeUnitsConsumed: mt(Y())
}), mo = $({
  err: qn,
  fee: Y(),
  innerInstructions: mt(ot(it($({
    index: Y(),
    instructions: it(Oc)
  })))),
  preBalances: it(Y()),
  postBalances: it(Y()),
  logMessages: mt(ot(it(et()))),
  preTokenBalances: mt(ot(it(wi))),
  postTokenBalances: mt(ot(it(wi))),
  loadedAddresses: mt(jc),
  computeUnitsConsumed: mt(Y())
}), hr = Te([Wt(0), Wt("legacy")]), Hn = $({
  pubkey: et(),
  lamports: Y(),
  postBalance: ot(Y()),
  rewardType: ot(et()),
  commission: mt(ot(Y()))
}), Xd = Mt(ot($({
  blockhash: et(),
  previousBlockhash: et(),
  parentSlot: Y(),
  transactions: it($({
    transaction: yo,
    meta: ot(Ci),
    version: mt(hr)
  })),
  rewards: mt(it(Hn)),
  blockTime: ot(Y()),
  blockHeight: ot(Y())
}))), $d = Mt(ot($({
  blockhash: et(),
  previousBlockhash: et(),
  parentSlot: Y(),
  rewards: mt(it(Hn)),
  blockTime: ot(Y()),
  blockHeight: ot(Y())
}))), t0 = Mt(ot($({
  blockhash: et(),
  previousBlockhash: et(),
  parentSlot: Y(),
  transactions: it($({
    transaction: Lc,
    meta: ot(Ci),
    version: mt(hr)
  })),
  rewards: mt(it(Hn)),
  blockTime: ot(Y()),
  blockHeight: ot(Y())
}))), e0 = Mt(ot($({
  blockhash: et(),
  previousBlockhash: et(),
  parentSlot: Y(),
  transactions: it($({
    transaction: Uc,
    meta: ot(mo),
    version: mt(hr)
  })),
  rewards: mt(it(Hn)),
  blockTime: ot(Y()),
  blockHeight: ot(Y())
}))), n0 = Mt(ot($({
  blockhash: et(),
  previousBlockhash: et(),
  parentSlot: Y(),
  transactions: it($({
    transaction: Lc,
    meta: ot(mo),
    version: mt(hr)
  })),
  rewards: mt(it(Hn)),
  blockTime: ot(Y()),
  blockHeight: ot(Y())
}))), r0 = Mt(ot($({
  blockhash: et(),
  previousBlockhash: et(),
  parentSlot: Y(),
  rewards: mt(it(Hn)),
  blockTime: ot(Y()),
  blockHeight: ot(Y())
}))), i0 = Mt(ot($({
  blockhash: et(),
  previousBlockhash: et(),
  parentSlot: Y(),
  transactions: it($({
    transaction: yo,
    meta: ot(Ci)
  })),
  rewards: mt(it(Hn)),
  blockTime: ot(Y())
}))), Ca = Mt(ot($({
  blockhash: et(),
  previousBlockhash: et(),
  parentSlot: Y(),
  signatures: it(et()),
  blockTime: ot(Y())
}))), Ss = Mt(ot($({
  slot: Y(),
  meta: ot(Ci),
  blockTime: mt(ot(Y())),
  transaction: yo,
  version: mt(hr)
}))), Yr = Mt(ot($({
  slot: Y(),
  transaction: Uc,
  meta: ot(mo),
  blockTime: mt(ot(Y())),
  version: mt(hr)
}))), s0 = Gt($({
  blockhash: et(),
  lastValidBlockHeight: Y()
})), o0 = Gt(en()), a0 = $({
  slot: Y(),
  numTransactions: Y(),
  numSlots: Y(),
  samplePeriodSecs: Y()
}), c0 = Mt(it(a0)), u0 = Gt(ot($({
  feeCalculator: $({
    lamportsPerSignature: Y()
  })
}))), l0 = Mt(et()), h0 = Mt(et()), f0 = $({
  err: qn,
  logs: it(et()),
  signature: et()
}), d0 = $({
  result: Bi(f0),
  subscription: Y()
}), g0 = {
  "solana-client": "js/1.0.0-maintenance"
};
class A0 {
  /**
   * Establish a JSON RPC connection
   *
   * @param endpoint URL to the fullnode JSON RPC endpoint
   * @param commitmentOrConfig optional default commitment level or optional ConnectionConfig configuration object
   */
  constructor(t, e) {
    this._commitment = void 0, this._confirmTransactionInitialTimeout = void 0, this._rpcEndpoint = void 0, this._rpcWsEndpoint = void 0, this._rpcClient = void 0, this._rpcRequest = void 0, this._rpcBatchRequest = void 0, this._rpcWebSocket = void 0, this._rpcWebSocketConnected = !1, this._rpcWebSocketHeartbeat = null, this._rpcWebSocketIdleTimeout = null, this._rpcWebSocketGeneration = 0, this._disableBlockhashCaching = !1, this._pollingBlockhash = !1, this._blockhashInfo = {
      latestBlockhash: null,
      lastFetch: 0,
      transactionSignatures: [],
      simulatedSignatures: []
    }, this._nextClientSubscriptionId = 0, this._subscriptionDisposeFunctionsByClientSubscriptionId = {}, this._subscriptionHashByClientSubscriptionId = {}, this._subscriptionStateChangeCallbacksByHash = {}, this._subscriptionCallbacksByServerSubscriptionId = {}, this._subscriptionsByHash = {}, this._subscriptionsAutoDisposedByRpc = /* @__PURE__ */ new Set(), this.getBlockHeight = /* @__PURE__ */ (() => {
      const E = {};
      return async (v) => {
        const {
          commitment: T,
          config: P
        } = Ot(v), O = this._buildArgs([], T, void 0, P), j = va(O);
        return E[j] = E[j] ?? (async () => {
          try {
            const D = await this._rpcRequest("getBlockHeight", O), N = rt(D, Mt(Y()));
            if ("error" in N)
              throw new dt(N.error, "failed to get block height information");
            return N.result;
          } finally {
            delete E[j];
          }
        })(), await E[j];
      };
    })();
    let n, i, s, l, h, A;
    e && typeof e == "string" ? this._commitment = e : e && (this._commitment = e.commitment, this._confirmTransactionInitialTimeout = e.confirmTransactionInitialTimeout, n = e.wsEndpoint, i = e.httpHeaders, s = e.fetch, l = e.fetchMiddleware, h = e.disableRetryOnRateLimit, A = e.httpAgent), this._rpcEndpoint = $f(t), this._rpcWsEndpoint = n || Vf(t), this._rpcClient = gd(t, i, s, l, h, A), this._rpcRequest = Ad(this._rpcClient), this._rpcBatchRequest = pd(this._rpcClient), this._rpcWebSocket = new Yf(this._rpcWsEndpoint, {
      autoconnect: !1,
      max_reconnects: 1 / 0
    }), this._rpcWebSocket.on("open", this._wsOnOpen.bind(this)), this._rpcWebSocket.on("error", this._wsOnError.bind(this)), this._rpcWebSocket.on("close", this._wsOnClose.bind(this)), this._rpcWebSocket.on("accountNotification", this._wsOnAccountNotification.bind(this)), this._rpcWebSocket.on("programNotification", this._wsOnProgramAccountNotification.bind(this)), this._rpcWebSocket.on("slotNotification", this._wsOnSlotNotification.bind(this)), this._rpcWebSocket.on("slotsUpdatesNotification", this._wsOnSlotUpdatesNotification.bind(this)), this._rpcWebSocket.on("signatureNotification", this._wsOnSignatureNotification.bind(this)), this._rpcWebSocket.on("rootNotification", this._wsOnRootNotification.bind(this)), this._rpcWebSocket.on("logsNotification", this._wsOnLogsNotification.bind(this));
  }
  /**
   * The default commitment used for requests
   */
  get commitment() {
    return this._commitment;
  }
  /**
   * The RPC endpoint
   */
  get rpcEndpoint() {
    return this._rpcEndpoint;
  }
  /**
   * Fetch the balance for the specified public key, return with context
   */
  async getBalanceAndContext(t, e) {
    const {
      commitment: n,
      config: i
    } = Ot(e), s = this._buildArgs([t.toBase58()], n, void 0, i), l = await this._rpcRequest("getBalance", s), h = rt(l, Gt(Y()));
    if ("error" in h)
      throw new dt(h.error, `failed to get balance for ${t.toBase58()}`);
    return h.result;
  }
  /**
   * Fetch the balance for the specified public key
   */
  async getBalance(t, e) {
    return await this.getBalanceAndContext(t, e).then((n) => n.value).catch((n) => {
      throw new Error("failed to get balance of account " + t.toBase58() + ": " + n);
    });
  }
  /**
   * Fetch the estimated production time of a block
   */
  async getBlockTime(t) {
    const e = await this._rpcRequest("getBlockTime", [t]), n = rt(e, Mt(ot(Y())));
    if ("error" in n)
      throw new dt(n.error, `failed to get block time for slot ${t}`);
    return n.result;
  }
  /**
   * Fetch the lowest slot that the node has information about in its ledger.
   * This value may increase over time if the node is configured to purge older ledger data
   */
  async getMinimumLedgerSlot() {
    const t = await this._rpcRequest("minimumLedgerSlot", []), e = rt(t, Mt(Y()));
    if ("error" in e)
      throw new dt(e.error, "failed to get minimum ledger slot");
    return e.result;
  }
  /**
   * Fetch the slot of the lowest confirmed block that has not been purged from the ledger
   */
  async getFirstAvailableBlock() {
    const t = await this._rpcRequest("getFirstAvailableBlock", []), e = rt(t, Id);
    if ("error" in e)
      throw new dt(e.error, "failed to get first available block");
    return e.result;
  }
  /**
   * Fetch information about the current supply
   */
  async getSupply(t) {
    let e = {};
    typeof t == "string" ? e = {
      commitment: t
    } : t ? e = {
      ...t,
      commitment: t && t.commitment || this.commitment
    } : e = {
      commitment: this.commitment
    };
    const n = await this._rpcRequest("getSupply", [e]), i = rt(n, Md);
    if ("error" in i)
      throw new dt(i.error, "failed to get supply");
    return i.result;
  }
  /**
   * Fetch the current supply of a token mint
   */
  async getTokenSupply(t, e) {
    const n = this._buildArgs([t.toBase58()], e), i = await this._rpcRequest("getTokenSupply", n), s = rt(i, Gt(zs));
    if ("error" in s)
      throw new dt(s.error, "failed to get token supply");
    return s.result;
  }
  /**
   * Fetch the current balance of a token account
   */
  async getTokenAccountBalance(t, e) {
    const n = this._buildArgs([t.toBase58()], e), i = await this._rpcRequest("getTokenAccountBalance", n), s = rt(i, Gt(zs));
    if ("error" in s)
      throw new dt(s.error, "failed to get token account balance");
    return s.result;
  }
  /**
   * Fetch all the token accounts owned by the specified account
   *
   * @return {Promise<RpcResponseAndContext<GetProgramAccountsResponse>}
   */
  async getTokenAccountsByOwner(t, e, n) {
    const {
      commitment: i,
      config: s
    } = Ot(n);
    let l = [t.toBase58()];
    "mint" in e ? l.push({
      mint: e.mint.toBase58()
    }) : l.push({
      programId: e.programId.toBase58()
    });
    const h = this._buildArgs(l, i, "base64", s), A = await this._rpcRequest("getTokenAccountsByOwner", h), E = rt(A, xd);
    if ("error" in E)
      throw new dt(E.error, `failed to get token accounts owned by account ${t.toBase58()}`);
    return E.result;
  }
  /**
   * Fetch parsed token accounts owned by the specified account
   *
   * @return {Promise<RpcResponseAndContext<Array<{pubkey: PublicKey, account: AccountInfo<ParsedAccountData>}>>>}
   */
  async getParsedTokenAccountsByOwner(t, e, n) {
    let i = [t.toBase58()];
    "mint" in e ? i.push({
      mint: e.mint.toBase58()
    }) : i.push({
      programId: e.programId.toBase58()
    });
    const s = this._buildArgs(i, n, "jsonParsed"), l = await this._rpcRequest("getTokenAccountsByOwner", s), h = rt(l, Bd);
    if ("error" in h)
      throw new dt(h.error, `failed to get token accounts owned by account ${t.toBase58()}`);
    return h.result;
  }
  /**
   * Fetch the 20 largest accounts with their current balances
   */
  async getLargestAccounts(t) {
    const e = {
      ...t,
      commitment: t && t.commitment || this.commitment
    }, n = e.filter || e.commitment ? [e] : [], i = await this._rpcRequest("getLargestAccounts", n), s = rt(i, Cd);
    if ("error" in s)
      throw new dt(s.error, "failed to get largest accounts");
    return s.result;
  }
  /**
   * Fetch the 20 largest token accounts with their current balances
   * for a given mint.
   */
  async getTokenLargestAccounts(t, e) {
    const n = this._buildArgs([t.toBase58()], e), i = await this._rpcRequest("getTokenLargestAccounts", n), s = rt(i, Sd);
    if ("error" in s)
      throw new dt(s.error, "failed to get token largest accounts");
    return s.result;
  }
  /**
   * Fetch all the account info for the specified public key, return with context
   */
  async getAccountInfoAndContext(t, e) {
    const {
      commitment: n,
      config: i
    } = Ot(e), s = this._buildArgs([t.toBase58()], n, "base64", i), l = await this._rpcRequest("getAccountInfo", s), h = rt(l, Gt(ot(Lr)));
    if ("error" in h)
      throw new dt(h.error, `failed to get info about account ${t.toBase58()}`);
    return h.result;
  }
  /**
   * Fetch parsed account info for the specified public key
   */
  async getParsedAccountInfo(t, e) {
    const {
      commitment: n,
      config: i
    } = Ot(e), s = this._buildArgs([t.toBase58()], n, "jsonParsed", i), l = await this._rpcRequest("getAccountInfo", s), h = rt(l, Gt(ot(Fs)));
    if ("error" in h)
      throw new dt(h.error, `failed to get info about account ${t.toBase58()}`);
    return h.result;
  }
  /**
   * Fetch all the account info for the specified public key
   */
  async getAccountInfo(t, e) {
    try {
      return (await this.getAccountInfoAndContext(t, e)).value;
    } catch (n) {
      throw new Error("failed to get info about account " + t.toBase58() + ": " + n);
    }
  }
  /**
   * Fetch all the account info for multiple accounts specified by an array of public keys, return with context
   */
  async getMultipleParsedAccounts(t, e) {
    const {
      commitment: n,
      config: i
    } = Ot(e), s = t.map((E) => E.toBase58()), l = this._buildArgs([s], n, "jsonParsed", i), h = await this._rpcRequest("getMultipleAccounts", l), A = rt(h, Gt(it(ot(Fs))));
    if ("error" in A)
      throw new dt(A.error, `failed to get info for accounts ${s}`);
    return A.result;
  }
  /**
   * Fetch all the account info for multiple accounts specified by an array of public keys, return with context
   */
  async getMultipleAccountsInfoAndContext(t, e) {
    const {
      commitment: n,
      config: i
    } = Ot(e), s = t.map((E) => E.toBase58()), l = this._buildArgs([s], n, "base64", i), h = await this._rpcRequest("getMultipleAccounts", l), A = rt(h, Gt(it(ot(Lr))));
    if ("error" in A)
      throw new dt(A.error, `failed to get info for accounts ${s}`);
    return A.result;
  }
  /**
   * Fetch all the account info for multiple accounts specified by an array of public keys
   */
  async getMultipleAccountsInfo(t, e) {
    return (await this.getMultipleAccountsInfoAndContext(t, e)).value;
  }
  /**
   * Returns epoch activation information for a stake account that has been delegated
   *
   * @deprecated Deprecated since RPC v1.18; will be removed in a future version.
   */
  async getStakeActivation(t, e, n) {
    const {
      commitment: i,
      config: s
    } = Ot(e), l = this._buildArgs([t.toBase58()], i, void 0, {
      ...s,
      epoch: n ?? s?.epoch
    }), h = await this._rpcRequest("getStakeActivation", l), A = rt(h, Mt(Ld));
    if ("error" in A)
      throw new dt(A.error, `failed to get Stake Activation ${t.toBase58()}`);
    return A.result;
  }
  /**
   * Fetch all the accounts owned by the specified program id
   *
   * @return {Promise<Array<{pubkey: PublicKey, account: AccountInfo<Buffer>}>>}
   */
  // eslint-disable-next-line no-dupe-class-members
  // eslint-disable-next-line no-dupe-class-members
  async getProgramAccounts(t, e) {
    const {
      commitment: n,
      config: i
    } = Ot(e), {
      encoding: s,
      ...l
    } = i || {}, h = this._buildArgs([t.toBase58()], n, s || "base64", {
      ...l,
      ...l.filters ? {
        filters: Sa(l.filters)
      } : null
    }), A = await this._rpcRequest("getProgramAccounts", h), E = it(kd), v = l.withContext === !0 ? rt(A, Gt(E)) : rt(A, Mt(E));
    if ("error" in v)
      throw new dt(v.error, `failed to get accounts owned by program ${t.toBase58()}`);
    return v.result;
  }
  /**
   * Fetch and parse all the accounts owned by the specified program id
   *
   * @return {Promise<Array<{pubkey: PublicKey, account: AccountInfo<Buffer | ParsedAccountData>}>>}
   */
  async getParsedProgramAccounts(t, e) {
    const {
      commitment: n,
      config: i
    } = Ot(e), s = this._buildArgs([t.toBase58()], n, "jsonParsed", i), l = await this._rpcRequest("getProgramAccounts", s), h = rt(l, Mt(it(Td)));
    if ("error" in h)
      throw new dt(h.error, `failed to get accounts owned by program ${t.toBase58()}`);
    return h.result;
  }
  /** @deprecated Instead, call `confirmTransaction` and pass in {@link TransactionConfirmationStrategy} */
  // eslint-disable-next-line no-dupe-class-members
  // eslint-disable-next-line no-dupe-class-members
  async confirmTransaction(t, e) {
    let n;
    if (typeof t == "string")
      n = t;
    else {
      const s = t;
      if (s.abortSignal?.aborted)
        return Promise.reject(s.abortSignal.reason);
      n = s.signature;
    }
    let i;
    try {
      i = Ee.decode(n);
    } catch {
      throw new Error("signature must be base58 encoded: " + n);
    }
    return Ft(i.length === 64, "signature has invalid length"), typeof t == "string" ? await this.confirmTransactionUsingLegacyTimeoutStrategy({
      commitment: e || this.commitment,
      signature: n
    }) : "lastValidBlockHeight" in t ? await this.confirmTransactionUsingBlockHeightExceedanceStrategy({
      commitment: e || this.commitment,
      strategy: t
    }) : await this.confirmTransactionUsingDurableNonceStrategy({
      commitment: e || this.commitment,
      strategy: t
    });
  }
  getCancellationPromise(t) {
    return new Promise((e, n) => {
      t != null && (t.aborted ? n(t.reason) : t.addEventListener("abort", () => {
        n(t.reason);
      }));
    });
  }
  getTransactionConfirmationPromise({
    commitment: t,
    signature: e
  }) {
    let n, i, s = !1;
    const l = new Promise((A, E) => {
      try {
        n = this.onSignature(e, (T, P) => {
          n = void 0;
          const O = {
            context: P,
            value: T
          };
          A({
            __type: In.PROCESSED,
            response: O
          });
        }, t);
        const v = new Promise((T) => {
          n == null ? T() : i = this._onSubscriptionStateChange(n, (P) => {
            P === "subscribed" && T();
          });
        });
        (async () => {
          if (await v, s) return;
          const T = await this.getSignatureStatus(e);
          if (s || T == null)
            return;
          const {
            context: P,
            value: O
          } = T;
          if (O != null)
            if (O?.err)
              E(O.err);
            else {
              switch (t) {
                case "confirmed":
                case "single":
                case "singleGossip": {
                  if (O.confirmationStatus === "processed")
                    return;
                  break;
                }
                case "finalized":
                case "max":
                case "root": {
                  if (O.confirmationStatus === "processed" || O.confirmationStatus === "confirmed")
                    return;
                  break;
                }
                // exhaust enums to ensure full coverage
                case "processed":
                case "recent":
              }
              s = !0, A({
                __type: In.PROCESSED,
                response: {
                  context: P,
                  value: O
                }
              });
            }
        })();
      } catch (v) {
        E(v);
      }
    });
    return {
      abortConfirmation: () => {
        i && (i(), i = void 0), n != null && (this.removeSignatureListener(n), n = void 0);
      },
      confirmationPromise: l
    };
  }
  async confirmTransactionUsingBlockHeightExceedanceStrategy({
    commitment: t,
    strategy: {
      abortSignal: e,
      lastValidBlockHeight: n,
      signature: i
    }
  }) {
    let s = !1;
    const l = new Promise((T) => {
      const P = async () => {
        try {
          return await this.getBlockHeight(t);
        } catch {
          return -1;
        }
      };
      (async () => {
        let O = await P();
        if (!s) {
          for (; O <= n; )
            if (await Xn(1e3), s || (O = await P(), s)) return;
          T({
            __type: In.BLOCKHEIGHT_EXCEEDED
          });
        }
      })();
    }), {
      abortConfirmation: h,
      confirmationPromise: A
    } = this.getTransactionConfirmationPromise({
      commitment: t,
      signature: i
    }), E = this.getCancellationPromise(e);
    let v;
    try {
      const T = await Promise.race([E, A, l]);
      if (T.__type === In.PROCESSED)
        v = T.response;
      else
        throw new vc(i);
    } finally {
      s = !0, h();
    }
    return v;
  }
  async confirmTransactionUsingDurableNonceStrategy({
    commitment: t,
    strategy: {
      abortSignal: e,
      minContextSlot: n,
      nonceAccountPubkey: i,
      nonceValue: s,
      signature: l
    }
  }) {
    let h = !1;
    const A = new Promise((O) => {
      let j = s, D = null;
      const N = async () => {
        try {
          const {
            context: Z,
            value: Q
          } = await this.getNonceAndContext(i, {
            commitment: t,
            minContextSlot: n
          });
          return D = Z.slot, Q?.nonce;
        } catch {
          return j;
        }
      };
      (async () => {
        if (j = await N(), !h)
          for (; ; ) {
            if (s !== j) {
              O({
                __type: In.NONCE_INVALID,
                slotInWhichNonceDidAdvance: D
              });
              return;
            }
            if (await Xn(2e3), h || (j = await N(), h)) return;
          }
      })();
    }), {
      abortConfirmation: E,
      confirmationPromise: v
    } = this.getTransactionConfirmationPromise({
      commitment: t,
      signature: l
    }), T = this.getCancellationPromise(e);
    let P;
    try {
      const O = await Promise.race([T, v, A]);
      if (O.__type === In.PROCESSED)
        P = O.response;
      else {
        let j;
        for (; ; ) {
          const D = await this.getSignatureStatus(l);
          if (D == null)
            break;
          if (D.context.slot < (O.slotInWhichNonceDidAdvance ?? n)) {
            await Xn(400);
            continue;
          }
          j = D;
          break;
        }
        if (j?.value) {
          const D = t || "finalized", {
            confirmationStatus: N
          } = j.value;
          switch (D) {
            case "processed":
            case "recent":
              if (N !== "processed" && N !== "confirmed" && N !== "finalized")
                throw new br(l);
              break;
            case "confirmed":
            case "single":
            case "singleGossip":
              if (N !== "confirmed" && N !== "finalized")
                throw new br(l);
              break;
            case "finalized":
            case "max":
            case "root":
              if (N !== "finalized")
                throw new br(l);
              break;
            default:
          }
          P = {
            context: j.context,
            value: {
              err: j.value.err
            }
          };
        } else
          throw new br(l);
      }
    } finally {
      h = !0, E();
    }
    return P;
  }
  async confirmTransactionUsingLegacyTimeoutStrategy({
    commitment: t,
    signature: e
  }) {
    let n;
    const i = new Promise((A) => {
      let E = this._confirmTransactionInitialTimeout || 6e4;
      switch (t) {
        case "processed":
        case "recent":
        case "single":
        case "confirmed":
        case "singleGossip": {
          E = this._confirmTransactionInitialTimeout || 3e4;
          break;
        }
      }
      n = setTimeout(() => A({
        __type: In.TIMED_OUT,
        timeoutMs: E
      }), E);
    }), {
      abortConfirmation: s,
      confirmationPromise: l
    } = this.getTransactionConfirmationPromise({
      commitment: t,
      signature: e
    });
    let h;
    try {
      const A = await Promise.race([l, i]);
      if (A.__type === In.PROCESSED)
        h = A.response;
      else
        throw new Ic(e, A.timeoutMs / 1e3);
    } finally {
      clearTimeout(n), s();
    }
    return h;
  }
  /**
   * Return the list of nodes that are currently participating in the cluster
   */
  async getClusterNodes() {
    const t = await this._rpcRequest("getClusterNodes", []), e = rt(t, Mt(it(qd)));
    if ("error" in e)
      throw new dt(e.error, "failed to get cluster nodes");
    return e.result;
  }
  /**
   * Return the list of nodes that are currently participating in the cluster
   */
  async getVoteAccounts(t) {
    const e = this._buildArgs([], t), n = await this._rpcRequest("getVoteAccounts", e), i = rt(n, Hd);
    if ("error" in i)
      throw new dt(i.error, "failed to get vote accounts");
    return i.result;
  }
  /**
   * Fetch the current slot that the node is processing
   */
  async getSlot(t) {
    const {
      commitment: e,
      config: n
    } = Ot(t), i = this._buildArgs([], e, void 0, n), s = await this._rpcRequest("getSlot", i), l = rt(s, Mt(Y()));
    if ("error" in l)
      throw new dt(l.error, "failed to get slot");
    return l.result;
  }
  /**
   * Fetch the current slot leader of the cluster
   */
  async getSlotLeader(t) {
    const {
      commitment: e,
      config: n
    } = Ot(t), i = this._buildArgs([], e, void 0, n), s = await this._rpcRequest("getSlotLeader", i), l = rt(s, Mt(et()));
    if ("error" in l)
      throw new dt(l.error, "failed to get slot leader");
    return l.result;
  }
  /**
   * Fetch `limit` number of slot leaders starting from `startSlot`
   *
   * @param startSlot fetch slot leaders starting from this slot
   * @param limit number of slot leaders to return
   */
  async getSlotLeaders(t, e) {
    const n = [t, e], i = await this._rpcRequest("getSlotLeaders", n), s = rt(i, Mt(it(Ht)));
    if ("error" in s)
      throw new dt(s.error, "failed to get slot leaders");
    return s.result;
  }
  /**
   * Fetch the current status of a signature
   */
  async getSignatureStatus(t, e) {
    const {
      context: n,
      value: i
    } = await this.getSignatureStatuses([t], e);
    Ft(i.length === 1);
    const s = i[0];
    return {
      context: n,
      value: s
    };
  }
  /**
   * Fetch the current statuses of a batch of signatures
   */
  async getSignatureStatuses(t, e) {
    const n = [t];
    e && n.push(e);
    const i = await this._rpcRequest("getSignatureStatuses", n), s = rt(i, Gd);
    if ("error" in s)
      throw new dt(s.error, "failed to get signature status");
    return s.result;
  }
  /**
   * Fetch the current transaction count of the cluster
   */
  async getTransactionCount(t) {
    const {
      commitment: e,
      config: n
    } = Ot(t), i = this._buildArgs([], e, void 0, n), s = await this._rpcRequest("getTransactionCount", i), l = rt(s, Mt(Y()));
    if ("error" in l)
      throw new dt(l.error, "failed to get transaction count");
    return l.result;
  }
  /**
   * Fetch the current total currency supply of the cluster in lamports
   *
   * @deprecated Deprecated since RPC v1.2.8. Please use {@link getSupply} instead.
   */
  async getTotalSupply(t) {
    return (await this.getSupply({
      commitment: t,
      excludeNonCirculatingAccountsList: !0
    })).value.total;
  }
  /**
   * Fetch the cluster InflationGovernor parameters
   */
  async getInflationGovernor(t) {
    const e = this._buildArgs([], t), n = await this._rpcRequest("getInflationGovernor", e), i = rt(n, wd);
    if ("error" in i)
      throw new dt(i.error, "failed to get inflation");
    return i.result;
  }
  /**
   * Fetch the inflation reward for a list of addresses for an epoch
   */
  async getInflationReward(t, e, n) {
    const {
      commitment: i,
      config: s
    } = Ot(n), l = this._buildArgs([t.map((E) => E.toBase58())], i, void 0, {
      ...s,
      epoch: e ?? s?.epoch
    }), h = await this._rpcRequest("getInflationReward", l), A = rt(h, nd);
    if ("error" in A)
      throw new dt(A.error, "failed to get inflation reward");
    return A.result;
  }
  /**
   * Fetch the specific inflation values for the current epoch
   */
  async getInflationRate() {
    const t = await this._rpcRequest("getInflationRate", []), e = rt(t, yd);
    if ("error" in e)
      throw new dt(e.error, "failed to get inflation rate");
    return e.result;
  }
  /**
   * Fetch the Epoch Info parameters
   */
  async getEpochInfo(t) {
    const {
      commitment: e,
      config: n
    } = Ot(t), i = this._buildArgs([], e, void 0, n), s = await this._rpcRequest("getEpochInfo", i), l = rt(s, bd);
    if ("error" in l)
      throw new dt(l.error, "failed to get epoch info");
    return l.result;
  }
  /**
   * Fetch the Epoch Schedule parameters
   */
  async getEpochSchedule() {
    const t = await this._rpcRequest("getEpochSchedule", []), e = rt(t, Ed);
    if ("error" in e)
      throw new dt(e.error, "failed to get epoch schedule");
    const n = e.result;
    return new Hf(n.slotsPerEpoch, n.leaderScheduleSlotOffset, n.warmup, n.firstNormalEpoch, n.firstNormalSlot);
  }
  /**
   * Fetch the leader schedule for the current epoch
   * @return {Promise<RpcResponseAndContext<LeaderSchedule>>}
   */
  async getLeaderSchedule() {
    const t = await this._rpcRequest("getLeaderSchedule", []), e = rt(t, vd);
    if ("error" in e)
      throw new dt(e.error, "failed to get leader schedule");
    return e.result;
  }
  /**
   * Fetch the minimum balance needed to exempt an account of `dataLength`
   * size from rent
   */
  async getMinimumBalanceForRentExemption(t, e) {
    const n = this._buildArgs([t], e), i = await this._rpcRequest("getMinimumBalanceForRentExemption", n), s = rt(i, Jd);
    return "error" in s ? (console.warn("Unable to fetch minimum balance for rent exemption"), 0) : s.result;
  }
  /**
   * Fetch a recent blockhash from the cluster, return with context
   * @return {Promise<RpcResponseAndContext<{blockhash: Blockhash, feeCalculator: FeeCalculator}>>}
   *
   * @deprecated Deprecated since RPC v1.9.0. Please use {@link getLatestBlockhash} instead.
   */
  async getRecentBlockhashAndContext(t) {
    const {
      context: e,
      value: {
        blockhash: n
      }
    } = await this.getLatestBlockhashAndContext(t);
    return {
      context: e,
      value: {
        blockhash: n,
        feeCalculator: {
          get lamportsPerSignature() {
            throw new Error("The capability to fetch `lamportsPerSignature` using the `getRecentBlockhash` API is no longer offered by the network. Use the `getFeeForMessage` API to obtain the fee for a given message.");
          },
          toJSON() {
            return {};
          }
        }
      }
    };
  }
  /**
   * Fetch recent performance samples
   * @return {Promise<Array<PerfSample>>}
   */
  async getRecentPerformanceSamples(t) {
    const e = await this._rpcRequest("getRecentPerformanceSamples", t ? [t] : []), n = rt(e, c0);
    if ("error" in n)
      throw new dt(n.error, "failed to get recent performance samples");
    return n.result;
  }
  /**
   * Fetch the fee calculator for a recent blockhash from the cluster, return with context
   *
   * @deprecated Deprecated since RPC v1.9.0. Please use {@link getFeeForMessage} instead.
   */
  async getFeeCalculatorForBlockhash(t, e) {
    const n = this._buildArgs([t], e), i = await this._rpcRequest("getFeeCalculatorForBlockhash", n), s = rt(i, u0);
    if ("error" in s)
      throw new dt(s.error, "failed to get fee calculator");
    const {
      context: l,
      value: h
    } = s.result;
    return {
      context: l,
      value: h !== null ? h.feeCalculator : null
    };
  }
  /**
   * Fetch the fee for a message from the cluster, return with context
   */
  async getFeeForMessage(t, e) {
    const n = cr(t.serialize()).toString("base64"), i = this._buildArgs([n], e), s = await this._rpcRequest("getFeeForMessage", i), l = rt(s, Gt(ot(Y())));
    if ("error" in l)
      throw new dt(l.error, "failed to get fee for message");
    if (l.result === null)
      throw new Error("invalid blockhash");
    return l.result;
  }
  /**
   * Fetch a list of prioritization fees from recent blocks.
   */
  async getRecentPrioritizationFees(t) {
    const e = t?.lockedWritableAccounts?.map((l) => l.toBase58()), n = e?.length ? [e] : [], i = await this._rpcRequest("getRecentPrioritizationFees", n), s = rt(i, md);
    if ("error" in s)
      throw new dt(s.error, "failed to get recent prioritization fees");
    return s.result;
  }
  /**
   * Fetch a recent blockhash from the cluster
   * @return {Promise<{blockhash: Blockhash, feeCalculator: FeeCalculator}>}
   *
   * @deprecated Deprecated since RPC v1.8.0. Please use {@link getLatestBlockhash} instead.
   */
  async getRecentBlockhash(t) {
    try {
      return (await this.getRecentBlockhashAndContext(t)).value;
    } catch (e) {
      throw new Error("failed to get recent blockhash: " + e);
    }
  }
  /**
   * Fetch the latest blockhash from the cluster
   * @return {Promise<BlockhashWithExpiryBlockHeight>}
   */
  async getLatestBlockhash(t) {
    try {
      return (await this.getLatestBlockhashAndContext(t)).value;
    } catch (e) {
      throw new Error("failed to get recent blockhash: " + e);
    }
  }
  /**
   * Fetch the latest blockhash from the cluster
   * @return {Promise<BlockhashWithExpiryBlockHeight>}
   */
  async getLatestBlockhashAndContext(t) {
    const {
      commitment: e,
      config: n
    } = Ot(t), i = this._buildArgs([], e, void 0, n), s = await this._rpcRequest("getLatestBlockhash", i), l = rt(s, s0);
    if ("error" in l)
      throw new dt(l.error, "failed to get latest blockhash");
    return l.result;
  }
  /**
   * Returns whether a blockhash is still valid or not
   */
  async isBlockhashValid(t, e) {
    const {
      commitment: n,
      config: i
    } = Ot(e), s = this._buildArgs([t], n, void 0, i), l = await this._rpcRequest("isBlockhashValid", s), h = rt(l, o0);
    if ("error" in h)
      throw new dt(h.error, "failed to determine if the blockhash `" + t + "`is valid");
    return h.result;
  }
  /**
   * Fetch the node version
   */
  async getVersion() {
    const t = await this._rpcRequest("getVersion", []), e = rt(t, Mt(ld));
    if ("error" in e)
      throw new dt(e.error, "failed to get version");
    return e.result;
  }
  /**
   * Fetch the genesis hash
   */
  async getGenesisHash() {
    const t = await this._rpcRequest("getGenesisHash", []), e = rt(t, Mt(et()));
    if ("error" in e)
      throw new dt(e.error, "failed to get genesis hash");
    return e.result;
  }
  /**
   * Fetch a processed block from the cluster.
   *
   * @deprecated Instead, call `getBlock` using a `GetVersionedBlockConfig` by
   * setting the `maxSupportedTransactionVersion` property.
   */
  /**
   * @deprecated Instead, call `getBlock` using a `GetVersionedBlockConfig` by
   * setting the `maxSupportedTransactionVersion` property.
   */
  // eslint-disable-next-line no-dupe-class-members
  /**
   * @deprecated Instead, call `getBlock` using a `GetVersionedBlockConfig` by
   * setting the `maxSupportedTransactionVersion` property.
   */
  // eslint-disable-next-line no-dupe-class-members
  /**
   * Fetch a processed block from the cluster.
   */
  // eslint-disable-next-line no-dupe-class-members
  // eslint-disable-next-line no-dupe-class-members
  // eslint-disable-next-line no-dupe-class-members
  /**
   * Fetch a processed block from the cluster.
   */
  // eslint-disable-next-line no-dupe-class-members
  async getBlock(t, e) {
    const {
      commitment: n,
      config: i
    } = Ot(e), s = this._buildArgsAtLeastConfirmed([t], n, void 0, i), l = await this._rpcRequest("getBlock", s);
    try {
      switch (i?.transactionDetails) {
        case "accounts": {
          const h = rt(l, t0);
          if ("error" in h)
            throw h.error;
          return h.result;
        }
        case "none": {
          const h = rt(l, $d);
          if ("error" in h)
            throw h.error;
          return h.result;
        }
        default: {
          const h = rt(l, Xd);
          if ("error" in h)
            throw h.error;
          const {
            result: A
          } = h;
          return A ? {
            ...A,
            transactions: A.transactions.map(({
              transaction: E,
              meta: v,
              version: T
            }) => ({
              meta: v,
              transaction: {
                ...E,
                message: Ms(T, E.message)
              },
              version: T
            }))
          } : null;
        }
      }
    } catch (h) {
      throw new dt(h, "failed to get confirmed block");
    }
  }
  /**
   * Fetch parsed transaction details for a confirmed or finalized block
   */
  // eslint-disable-next-line no-dupe-class-members
  // eslint-disable-next-line no-dupe-class-members
  // eslint-disable-next-line no-dupe-class-members
  async getParsedBlock(t, e) {
    const {
      commitment: n,
      config: i
    } = Ot(e), s = this._buildArgsAtLeastConfirmed([t], n, "jsonParsed", i), l = await this._rpcRequest("getBlock", s);
    try {
      switch (i?.transactionDetails) {
        case "accounts": {
          const h = rt(l, n0);
          if ("error" in h)
            throw h.error;
          return h.result;
        }
        case "none": {
          const h = rt(l, r0);
          if ("error" in h)
            throw h.error;
          return h.result;
        }
        default: {
          const h = rt(l, e0);
          if ("error" in h)
            throw h.error;
          return h.result;
        }
      }
    } catch (h) {
      throw new dt(h, "failed to get block");
    }
  }
  /*
   * Returns recent block production information from the current or previous epoch
   */
  async getBlockProduction(t) {
    let e, n;
    if (typeof t == "string")
      n = t;
    else if (t) {
      const {
        commitment: h,
        ...A
      } = t;
      n = h, e = A;
    }
    const i = this._buildArgs([], n, "base64", e), s = await this._rpcRequest("getBlockProduction", i), l = rt(s, dd);
    if ("error" in l)
      throw new dt(l.error, "failed to get block production information");
    return l.result;
  }
  /**
   * Fetch a confirmed or finalized transaction from the cluster.
   *
   * @deprecated Instead, call `getTransaction` using a
   * `GetVersionedTransactionConfig` by setting the
   * `maxSupportedTransactionVersion` property.
   */
  /**
   * Fetch a confirmed or finalized transaction from the cluster.
   */
  // eslint-disable-next-line no-dupe-class-members
  /**
   * Fetch a confirmed or finalized transaction from the cluster.
   */
  // eslint-disable-next-line no-dupe-class-members
  async getTransaction(t, e) {
    const {
      commitment: n,
      config: i
    } = Ot(e), s = this._buildArgsAtLeastConfirmed([t], n, void 0, i), l = await this._rpcRequest("getTransaction", s), h = rt(l, Ss);
    if ("error" in h)
      throw new dt(h.error, "failed to get transaction");
    const A = h.result;
    return A && {
      ...A,
      transaction: {
        ...A.transaction,
        message: Ms(A.version, A.transaction.message)
      }
    };
  }
  /**
   * Fetch parsed transaction details for a confirmed or finalized transaction
   */
  async getParsedTransaction(t, e) {
    const {
      commitment: n,
      config: i
    } = Ot(e), s = this._buildArgsAtLeastConfirmed([t], n, "jsonParsed", i), l = await this._rpcRequest("getTransaction", s), h = rt(l, Yr);
    if ("error" in h)
      throw new dt(h.error, "failed to get transaction");
    return h.result;
  }
  /**
   * Fetch parsed transaction details for a batch of confirmed transactions
   */
  async getParsedTransactions(t, e) {
    const {
      commitment: n,
      config: i
    } = Ot(e), s = t.map((A) => ({
      methodName: "getTransaction",
      args: this._buildArgsAtLeastConfirmed([A], n, "jsonParsed", i)
    }));
    return (await this._rpcBatchRequest(s)).map((A) => {
      const E = rt(A, Yr);
      if ("error" in E)
        throw new dt(E.error, "failed to get transactions");
      return E.result;
    });
  }
  /**
   * Fetch transaction details for a batch of confirmed transactions.
   * Similar to {@link getParsedTransactions} but returns a {@link TransactionResponse}.
   *
   * @deprecated Instead, call `getTransactions` using a
   * `GetVersionedTransactionConfig` by setting the
   * `maxSupportedTransactionVersion` property.
   */
  /**
   * Fetch transaction details for a batch of confirmed transactions.
   * Similar to {@link getParsedTransactions} but returns a {@link
   * VersionedTransactionResponse}.
   */
  // eslint-disable-next-line no-dupe-class-members
  /**
   * Fetch transaction details for a batch of confirmed transactions.
   * Similar to {@link getParsedTransactions} but returns a {@link
   * VersionedTransactionResponse}.
   */
  // eslint-disable-next-line no-dupe-class-members
  async getTransactions(t, e) {
    const {
      commitment: n,
      config: i
    } = Ot(e), s = t.map((A) => ({
      methodName: "getTransaction",
      args: this._buildArgsAtLeastConfirmed([A], n, void 0, i)
    }));
    return (await this._rpcBatchRequest(s)).map((A) => {
      const E = rt(A, Ss);
      if ("error" in E)
        throw new dt(E.error, "failed to get transactions");
      const v = E.result;
      return v && {
        ...v,
        transaction: {
          ...v.transaction,
          message: Ms(v.version, v.transaction.message)
        }
      };
    });
  }
  /**
   * Fetch a list of Transactions and transaction statuses from the cluster
   * for a confirmed block.
   *
   * @deprecated Deprecated since RPC v1.7.0. Please use {@link getBlock} instead.
   */
  async getConfirmedBlock(t, e) {
    const n = this._buildArgsAtLeastConfirmed([t], e), i = await this._rpcRequest("getBlock", n), s = rt(i, i0);
    if ("error" in s)
      throw new dt(s.error, "failed to get confirmed block");
    const l = s.result;
    if (!l)
      throw new Error("Confirmed block " + t + " not found");
    const h = {
      ...l,
      transactions: l.transactions.map(({
        transaction: A,
        meta: E
      }) => {
        const v = new dn(A.message);
        return {
          meta: E,
          transaction: {
            ...A,
            message: v
          }
        };
      })
    };
    return {
      ...h,
      transactions: h.transactions.map(({
        transaction: A,
        meta: E
      }) => ({
        meta: E,
        transaction: Bn.populate(A.message, A.signatures)
      }))
    };
  }
  /**
   * Fetch confirmed blocks between two slots
   */
  async getBlocks(t, e, n) {
    const i = this._buildArgsAtLeastConfirmed(e !== void 0 ? [t, e] : [t], n), s = await this._rpcRequest("getBlocks", i), l = rt(s, Mt(it(Y())));
    if ("error" in l)
      throw new dt(l.error, "failed to get blocks");
    return l.result;
  }
  /**
   * Fetch a list of Signatures from the cluster for a block, excluding rewards
   */
  async getBlockSignatures(t, e) {
    const n = this._buildArgsAtLeastConfirmed([t], e, void 0, {
      transactionDetails: "signatures",
      rewards: !1
    }), i = await this._rpcRequest("getBlock", n), s = rt(i, Ca);
    if ("error" in s)
      throw new dt(s.error, "failed to get block");
    const l = s.result;
    if (!l)
      throw new Error("Block " + t + " not found");
    return l;
  }
  /**
   * Fetch a list of Signatures from the cluster for a confirmed block, excluding rewards
   *
   * @deprecated Deprecated since RPC v1.7.0. Please use {@link getBlockSignatures} instead.
   */
  async getConfirmedBlockSignatures(t, e) {
    const n = this._buildArgsAtLeastConfirmed([t], e, void 0, {
      transactionDetails: "signatures",
      rewards: !1
    }), i = await this._rpcRequest("getBlock", n), s = rt(i, Ca);
    if ("error" in s)
      throw new dt(s.error, "failed to get confirmed block");
    const l = s.result;
    if (!l)
      throw new Error("Confirmed block " + t + " not found");
    return l;
  }
  /**
   * Fetch a transaction details for a confirmed transaction
   *
   * @deprecated Deprecated since RPC v1.7.0. Please use {@link getTransaction} instead.
   */
  async getConfirmedTransaction(t, e) {
    const n = this._buildArgsAtLeastConfirmed([t], e), i = await this._rpcRequest("getTransaction", n), s = rt(i, Ss);
    if ("error" in s)
      throw new dt(s.error, "failed to get transaction");
    const l = s.result;
    if (!l) return l;
    const h = new dn(l.transaction.message), A = l.transaction.signatures;
    return {
      ...l,
      transaction: Bn.populate(h, A)
    };
  }
  /**
   * Fetch parsed transaction details for a confirmed transaction
   *
   * @deprecated Deprecated since RPC v1.7.0. Please use {@link getParsedTransaction} instead.
   */
  async getParsedConfirmedTransaction(t, e) {
    const n = this._buildArgsAtLeastConfirmed([t], e, "jsonParsed"), i = await this._rpcRequest("getTransaction", n), s = rt(i, Yr);
    if ("error" in s)
      throw new dt(s.error, "failed to get confirmed transaction");
    return s.result;
  }
  /**
   * Fetch parsed transaction details for a batch of confirmed transactions
   *
   * @deprecated Deprecated since RPC v1.7.0. Please use {@link getParsedTransactions} instead.
   */
  async getParsedConfirmedTransactions(t, e) {
    const n = t.map((l) => ({
      methodName: "getTransaction",
      args: this._buildArgsAtLeastConfirmed([l], e, "jsonParsed")
    }));
    return (await this._rpcBatchRequest(n)).map((l) => {
      const h = rt(l, Yr);
      if ("error" in h)
        throw new dt(h.error, "failed to get confirmed transactions");
      return h.result;
    });
  }
  /**
   * Fetch a list of all the confirmed signatures for transactions involving an address
   * within a specified slot range. Max range allowed is 10,000 slots.
   *
   * @deprecated Deprecated since RPC v1.3. Please use {@link getConfirmedSignaturesForAddress2} instead.
   *
   * @param address queried address
   * @param startSlot start slot, inclusive
   * @param endSlot end slot, inclusive
   */
  async getConfirmedSignaturesForAddress(t, e, n) {
    let i = {}, s = await this.getFirstAvailableBlock();
    for (; !("until" in i) && (e--, !(e <= 0 || e < s)); )
      try {
        const A = await this.getConfirmedBlockSignatures(e, "finalized");
        A.signatures.length > 0 && (i.until = A.signatures[A.signatures.length - 1].toString());
      } catch (A) {
        if (A instanceof Error && A.message.includes("skipped"))
          continue;
        throw A;
      }
    let l = await this.getSlot("finalized");
    for (; !("before" in i) && (n++, !(n > l)); )
      try {
        const A = await this.getConfirmedBlockSignatures(n);
        A.signatures.length > 0 && (i.before = A.signatures[A.signatures.length - 1].toString());
      } catch (A) {
        if (A instanceof Error && A.message.includes("skipped"))
          continue;
        throw A;
      }
    return (await this.getConfirmedSignaturesForAddress2(t, i)).map((A) => A.signature);
  }
  /**
   * Returns confirmed signatures for transactions involving an
   * address backwards in time from the provided signature or most recent confirmed block
   *
   * @deprecated Deprecated since RPC v1.7.0. Please use {@link getSignaturesForAddress} instead.
   */
  async getConfirmedSignaturesForAddress2(t, e, n) {
    const i = this._buildArgsAtLeastConfirmed([t.toBase58()], n, void 0, e), s = await this._rpcRequest("getConfirmedSignaturesForAddress2", i), l = rt(s, Rd);
    if ("error" in l)
      throw new dt(l.error, "failed to get confirmed signatures for address");
    return l.result;
  }
  /**
   * Returns confirmed signatures for transactions involving an
   * address backwards in time from the provided signature or most recent confirmed block
   *
   *
   * @param address queried address
   * @param options
   */
  async getSignaturesForAddress(t, e, n) {
    const i = this._buildArgsAtLeastConfirmed([t.toBase58()], n, void 0, e), s = await this._rpcRequest("getSignaturesForAddress", i), l = rt(s, Dd);
    if ("error" in l)
      throw new dt(l.error, "failed to get signatures for address");
    return l.result;
  }
  async getAddressLookupTable(t, e) {
    const {
      context: n,
      value: i
    } = await this.getAccountInfoAndContext(t, e);
    let s = null;
    return i !== null && (s = new Ma({
      key: t,
      state: Ma.deserialize(i.data)
    })), {
      context: n,
      value: s
    };
  }
  /**
   * Fetch the contents of a Nonce account from the cluster, return with context
   */
  async getNonceAndContext(t, e) {
    const {
      context: n,
      value: i
    } = await this.getAccountInfoAndContext(t, e);
    let s = null;
    return i !== null && (s = po.fromAccountData(i.data)), {
      context: n,
      value: s
    };
  }
  /**
   * Fetch the contents of a Nonce account from the cluster
   */
  async getNonce(t, e) {
    return await this.getNonceAndContext(t, e).then((n) => n.value).catch((n) => {
      throw new Error("failed to get nonce for account " + t.toBase58() + ": " + n);
    });
  }
  /**
   * Request an allocation of lamports to the specified address
   *
   * ```typescript
   * import { Connection, PublicKey, LAMPORTS_PER_SOL } from "@solana/web3.js";
   *
   * (async () => {
   *   const connection = new Connection("https://api.testnet.solana.com", "confirmed");
   *   const myAddress = new PublicKey("2nr1bHFT86W9tGnyvmYW4vcHKsQB3sVQfnddasz4kExM");
   *   const signature = await connection.requestAirdrop(myAddress, LAMPORTS_PER_SOL);
   *   await connection.confirmTransaction(signature);
   * })();
   * ```
   */
  async requestAirdrop(t, e) {
    const n = await this._rpcRequest("requestAirdrop", [t.toBase58(), e]), i = rt(n, l0);
    if ("error" in i)
      throw new dt(i.error, `airdrop to ${t.toBase58()} failed`);
    return i.result;
  }
  /**
   * @internal
   */
  async _blockhashWithExpiryBlockHeight(t) {
    if (!t) {
      for (; this._pollingBlockhash; )
        await Xn(100);
      const n = Date.now() - this._blockhashInfo.lastFetch >= Xf;
      if (this._blockhashInfo.latestBlockhash !== null && !n)
        return this._blockhashInfo.latestBlockhash;
    }
    return await this._pollNewBlockhash();
  }
  /**
   * @internal
   */
  async _pollNewBlockhash() {
    this._pollingBlockhash = !0;
    try {
      const t = Date.now(), e = this._blockhashInfo.latestBlockhash, n = e ? e.blockhash : null;
      for (let i = 0; i < 50; i++) {
        const s = await this.getLatestBlockhash("finalized");
        if (n !== s.blockhash)
          return this._blockhashInfo = {
            latestBlockhash: s,
            lastFetch: Date.now(),
            transactionSignatures: [],
            simulatedSignatures: []
          }, s;
        await Xn(jf / 2);
      }
      throw new Error(`Unable to obtain a new blockhash after ${Date.now() - t}ms`);
    } finally {
      this._pollingBlockhash = !1;
    }
  }
  /**
   * get the stake minimum delegation
   */
  async getStakeMinimumDelegation(t) {
    const {
      commitment: e,
      config: n
    } = Ot(t), i = this._buildArgs([], e, "base64", n), s = await this._rpcRequest("getStakeMinimumDelegation", i), l = rt(s, Gt(Y()));
    if ("error" in l)
      throw new dt(l.error, "failed to get stake minimum delegation");
    return l.result;
  }
  /**
   * Simulate a transaction
   *
   * @deprecated Instead, call {@link simulateTransaction} with {@link
   * VersionedTransaction} and {@link SimulateTransactionConfig} parameters
   */
  /**
   * Simulate a transaction
   */
  // eslint-disable-next-line no-dupe-class-members
  /**
   * Simulate a transaction
   */
  // eslint-disable-next-line no-dupe-class-members
  async simulateTransaction(t, e, n) {
    if ("message" in t) {
      const D = t.serialize(), N = ft.Buffer.from(D).toString("base64");
      if (Array.isArray(e) || n !== void 0)
        throw new Error("Invalid arguments");
      const Z = e || {};
      Z.encoding = "base64", "commitment" in Z || (Z.commitment = this.commitment), e && typeof e == "object" && "innerInstructions" in e && (Z.innerInstructions = e.innerInstructions);
      const Q = [N, Z], W = await this._rpcRequest("simulateTransaction", Q), V = rt(W, xa);
      if ("error" in V)
        throw new Error("failed to simulate transaction: " + V.error.message);
      return V.result;
    }
    let i;
    if (t instanceof Bn) {
      let j = t;
      i = new Bn(), i.feePayer = j.feePayer, i.instructions = t.instructions, i.nonceInfo = j.nonceInfo, i.signatures = j.signatures;
    } else
      i = Bn.populate(t), i._message = i._json = void 0;
    if (e !== void 0 && !Array.isArray(e))
      throw new Error("Invalid arguments");
    const s = e;
    if (i.nonceInfo && s)
      i.sign(...s);
    else {
      let j = this._disableBlockhashCaching;
      for (; ; ) {
        const D = await this._blockhashWithExpiryBlockHeight(j);
        if (i.lastValidBlockHeight = D.lastValidBlockHeight, i.recentBlockhash = D.blockhash, !s) break;
        if (i.sign(...s), !i.signature)
          throw new Error("!signature");
        const N = i.signature.toString("base64");
        if (!this._blockhashInfo.simulatedSignatures.includes(N) && !this._blockhashInfo.transactionSignatures.includes(N)) {
          this._blockhashInfo.simulatedSignatures.push(N);
          break;
        } else
          j = !0;
      }
    }
    const l = i._compile(), h = l.serialize(), E = i._serialize(h).toString("base64"), v = {
      encoding: "base64",
      commitment: this.commitment
    };
    if (n) {
      const j = (Array.isArray(n) ? n : l.nonProgramIds()).map((D) => D.toBase58());
      v.accounts = {
        encoding: "base64",
        addresses: j
      };
    }
    s && (v.sigVerify = !0), e && typeof e == "object" && "innerInstructions" in e && (v.innerInstructions = e.innerInstructions);
    const T = [E, v], P = await this._rpcRequest("simulateTransaction", T), O = rt(P, xa);
    if ("error" in O) {
      let j;
      if ("data" in O.error && (j = O.error.data.logs, j && Array.isArray(j))) {
        const D = `
    `, N = D + j.join(D);
        console.error(O.error.message, N);
      }
      throw new ba({
        action: "simulate",
        signature: "",
        transactionMessage: O.error.message,
        logs: j
      });
    }
    return O.result;
  }
  /**
   * Sign and send a transaction
   *
   * @deprecated Instead, call {@link sendTransaction} with a {@link
   * VersionedTransaction}
   */
  /**
   * Send a signed transaction
   */
  // eslint-disable-next-line no-dupe-class-members
  /**
   * Sign and send a transaction
   */
  // eslint-disable-next-line no-dupe-class-members
  async sendTransaction(t, e, n) {
    if ("version" in t) {
      if (e && Array.isArray(e))
        throw new Error("Invalid arguments");
      const l = t.serialize();
      return await this.sendRawTransaction(l, e);
    }
    if (e === void 0 || !Array.isArray(e))
      throw new Error("Invalid arguments");
    const i = e;
    if (t.nonceInfo)
      t.sign(...i);
    else {
      let l = this._disableBlockhashCaching;
      for (; ; ) {
        const h = await this._blockhashWithExpiryBlockHeight(l);
        if (t.lastValidBlockHeight = h.lastValidBlockHeight, t.recentBlockhash = h.blockhash, t.sign(...i), !t.signature)
          throw new Error("!signature");
        const A = t.signature.toString("base64");
        if (this._blockhashInfo.transactionSignatures.includes(A))
          l = !0;
        else {
          this._blockhashInfo.transactionSignatures.push(A);
          break;
        }
      }
    }
    const s = t.serialize();
    return await this.sendRawTransaction(s, n);
  }
  /**
   * Send a transaction that has already been signed and serialized into the
   * wire format
   */
  async sendRawTransaction(t, e) {
    const n = cr(t).toString("base64");
    return await this.sendEncodedTransaction(n, e);
  }
  /**
   * Send a transaction that has already been signed, serialized into the
   * wire format, and encoded as a base64 string
   */
  async sendEncodedTransaction(t, e) {
    const n = {
      encoding: "base64"
    }, i = e && e.skipPreflight, s = i === !0 ? "processed" : e && e.preflightCommitment || this.commitment;
    e && e.maxRetries != null && (n.maxRetries = e.maxRetries), e && e.minContextSlot != null && (n.minContextSlot = e.minContextSlot), i && (n.skipPreflight = i), s && (n.preflightCommitment = s);
    const l = [t, n], h = await this._rpcRequest("sendTransaction", l), A = rt(h, h0);
    if ("error" in A) {
      let E;
      throw "data" in A.error && (E = A.error.data.logs), new ba({
        action: i ? "send" : "simulate",
        signature: "",
        transactionMessage: A.error.message,
        logs: E
      });
    }
    return A.result;
  }
  /**
   * @internal
   */
  _wsOnOpen() {
    this._rpcWebSocketConnected = !0, this._rpcWebSocketHeartbeat = setInterval(() => {
      (async () => {
        try {
          await this._rpcWebSocket.notify("ping");
        } catch {
        }
      })();
    }, 5e3), this._updateSubscriptions();
  }
  /**
   * @internal
   */
  _wsOnError(t) {
    this._rpcWebSocketConnected = !1, console.error("ws error:", t.message);
  }
  /**
   * @internal
   */
  _wsOnClose(t) {
    if (this._rpcWebSocketConnected = !1, this._rpcWebSocketGeneration = (this._rpcWebSocketGeneration + 1) % Number.MAX_SAFE_INTEGER, this._rpcWebSocketIdleTimeout && (clearTimeout(this._rpcWebSocketIdleTimeout), this._rpcWebSocketIdleTimeout = null), this._rpcWebSocketHeartbeat && (clearInterval(this._rpcWebSocketHeartbeat), this._rpcWebSocketHeartbeat = null), t === 1e3) {
      this._updateSubscriptions();
      return;
    }
    this._subscriptionCallbacksByServerSubscriptionId = {}, Object.entries(this._subscriptionsByHash).forEach(([e, n]) => {
      this._setSubscription(e, {
        ...n,
        state: "pending"
      });
    });
  }
  /**
   * @internal
   */
  _setSubscription(t, e) {
    const n = this._subscriptionsByHash[t]?.state;
    if (this._subscriptionsByHash[t] = e, n !== e.state) {
      const i = this._subscriptionStateChangeCallbacksByHash[t];
      i && i.forEach((s) => {
        try {
          s(e.state);
        } catch {
        }
      });
    }
  }
  /**
   * @internal
   */
  _onSubscriptionStateChange(t, e) {
    var s;
    const n = this._subscriptionHashByClientSubscriptionId[t];
    if (n == null)
      return () => {
      };
    const i = (s = this._subscriptionStateChangeCallbacksByHash)[n] || (s[n] = /* @__PURE__ */ new Set());
    return i.add(e), () => {
      i.delete(e), i.size === 0 && delete this._subscriptionStateChangeCallbacksByHash[n];
    };
  }
  /**
   * @internal
   */
  async _updateSubscriptions() {
    if (Object.keys(this._subscriptionsByHash).length === 0) {
      this._rpcWebSocketConnected && (this._rpcWebSocketConnected = !1, this._rpcWebSocketIdleTimeout = setTimeout(() => {
        this._rpcWebSocketIdleTimeout = null;
        try {
          this._rpcWebSocket.close();
        } catch (n) {
          n instanceof Error && console.log(`Error when closing socket connection: ${n.message}`);
        }
      }, 500));
      return;
    }
    if (this._rpcWebSocketIdleTimeout !== null && (clearTimeout(this._rpcWebSocketIdleTimeout), this._rpcWebSocketIdleTimeout = null, this._rpcWebSocketConnected = !0), !this._rpcWebSocketConnected) {
      this._rpcWebSocket.connect();
      return;
    }
    const t = this._rpcWebSocketGeneration, e = () => t === this._rpcWebSocketGeneration;
    await Promise.all(
      // Don't be tempted to change this to `Object.entries`. We call
      // `_updateSubscriptions` recursively when processing the state,
      // so it's important that we look up the *current* version of
      // each subscription, every time we process a hash.
      Object.keys(this._subscriptionsByHash).map(async (n) => {
        const i = this._subscriptionsByHash[n];
        if (i !== void 0)
          switch (i.state) {
            case "pending":
            case "unsubscribed":
              if (i.callbacks.size === 0) {
                delete this._subscriptionsByHash[n], i.state === "unsubscribed" && delete this._subscriptionCallbacksByServerSubscriptionId[i.serverSubscriptionId], await this._updateSubscriptions();
                return;
              }
              await (async () => {
                const {
                  args: s,
                  method: l
                } = i;
                try {
                  this._setSubscription(n, {
                    ...i,
                    state: "subscribing"
                  });
                  const h = await this._rpcWebSocket.call(l, s);
                  this._setSubscription(n, {
                    ...i,
                    serverSubscriptionId: h,
                    state: "subscribed"
                  }), this._subscriptionCallbacksByServerSubscriptionId[h] = i.callbacks, await this._updateSubscriptions();
                } catch (h) {
                  if (console.error(`Received ${h instanceof Error ? "" : "JSON-RPC "}error calling \`${l}\``, {
                    args: s,
                    error: h
                  }), !e())
                    return;
                  this._setSubscription(n, {
                    ...i,
                    state: "pending"
                  }), await this._updateSubscriptions();
                }
              })();
              break;
            case "subscribed":
              i.callbacks.size === 0 && await (async () => {
                const {
                  serverSubscriptionId: s,
                  unsubscribeMethod: l
                } = i;
                if (this._subscriptionsAutoDisposedByRpc.has(s))
                  this._subscriptionsAutoDisposedByRpc.delete(s);
                else {
                  this._setSubscription(n, {
                    ...i,
                    state: "unsubscribing"
                  }), this._setSubscription(n, {
                    ...i,
                    state: "unsubscribing"
                  });
                  try {
                    await this._rpcWebSocket.call(l, [s]);
                  } catch (h) {
                    if (h instanceof Error && console.error(`${l} error:`, h.message), !e())
                      return;
                    this._setSubscription(n, {
                      ...i,
                      state: "subscribed"
                    }), await this._updateSubscriptions();
                    return;
                  }
                }
                this._setSubscription(n, {
                  ...i,
                  state: "unsubscribed"
                }), await this._updateSubscriptions();
              })();
              break;
          }
      })
    );
  }
  /**
   * @internal
   */
  _handleServerNotification(t, e) {
    const n = this._subscriptionCallbacksByServerSubscriptionId[t];
    n !== void 0 && n.forEach((i) => {
      try {
        i(
          ...e
        );
      } catch (s) {
        console.error(s);
      }
    });
  }
  /**
   * @internal
   */
  _wsOnAccountNotification(t) {
    const {
      result: e,
      subscription: n
    } = rt(t, Od);
    this._handleServerNotification(n, [e.value, e.context]);
  }
  /**
   * @internal
   */
  _makeSubscription(t, e) {
    const n = this._nextClientSubscriptionId++, i = va([t.method, e]), s = this._subscriptionsByHash[i];
    return s === void 0 ? this._subscriptionsByHash[i] = {
      ...t,
      args: e,
      callbacks: /* @__PURE__ */ new Set([t.callback]),
      state: "pending"
    } : s.callbacks.add(t.callback), this._subscriptionHashByClientSubscriptionId[n] = i, this._subscriptionDisposeFunctionsByClientSubscriptionId[n] = async () => {
      delete this._subscriptionDisposeFunctionsByClientSubscriptionId[n], delete this._subscriptionHashByClientSubscriptionId[n];
      const l = this._subscriptionsByHash[i];
      Ft(l !== void 0, `Could not find a \`Subscription\` when tearing down client subscription #${n}`), l.callbacks.delete(t.callback), await this._updateSubscriptions();
    }, this._updateSubscriptions(), n;
  }
  /**
   * Register a callback to be invoked whenever the specified account changes
   *
   * @param publicKey Public key of the account to monitor
   * @param callback Function to invoke whenever the account is changed
   * @param config
   * @return subscription id
   */
  /** @deprecated Instead, pass in an {@link AccountSubscriptionConfig} */
  // eslint-disable-next-line no-dupe-class-members
  // eslint-disable-next-line no-dupe-class-members
  onAccountChange(t, e, n) {
    const {
      commitment: i,
      config: s
    } = Ot(n), l = this._buildArgs(
      [t.toBase58()],
      i || this._commitment || "finalized",
      // Apply connection/server default.
      "base64",
      s
    );
    return this._makeSubscription({
      callback: e,
      method: "accountSubscribe",
      unsubscribeMethod: "accountUnsubscribe"
    }, l);
  }
  /**
   * Deregister an account notification callback
   *
   * @param clientSubscriptionId client subscription id to deregister
   */
  async removeAccountChangeListener(t) {
    await this._unsubscribeClientSubscription(t, "account change");
  }
  /**
   * @internal
   */
  _wsOnProgramAccountNotification(t) {
    const {
      result: e,
      subscription: n
    } = rt(t, jd);
    this._handleServerNotification(n, [{
      accountId: e.value.pubkey,
      accountInfo: e.value.account
    }, e.context]);
  }
  /**
   * Register a callback to be invoked whenever accounts owned by the
   * specified program change
   *
   * @param programId Public key of the program to monitor
   * @param callback Function to invoke whenever the account is changed
   * @param config
   * @return subscription id
   */
  /** @deprecated Instead, pass in a {@link ProgramAccountSubscriptionConfig} */
  // eslint-disable-next-line no-dupe-class-members
  // eslint-disable-next-line no-dupe-class-members
  onProgramAccountChange(t, e, n, i) {
    const {
      commitment: s,
      config: l
    } = Ot(n), h = this._buildArgs(
      [t.toBase58()],
      s || this._commitment || "finalized",
      // Apply connection/server default.
      "base64",
      l || (i ? {
        filters: Sa(i)
      } : void 0)
      /* extra */
    );
    return this._makeSubscription({
      callback: e,
      method: "programSubscribe",
      unsubscribeMethod: "programUnsubscribe"
    }, h);
  }
  /**
   * Deregister an account notification callback
   *
   * @param clientSubscriptionId client subscription id to deregister
   */
  async removeProgramAccountChangeListener(t) {
    await this._unsubscribeClientSubscription(t, "program account change");
  }
  /**
   * Registers a callback to be invoked whenever logs are emitted.
   */
  onLogs(t, e, n) {
    const i = this._buildArgs(
      [typeof t == "object" ? {
        mentions: [t.toString()]
      } : t],
      n || this._commitment || "finalized"
      // Apply connection/server default.
    );
    return this._makeSubscription({
      callback: e,
      method: "logsSubscribe",
      unsubscribeMethod: "logsUnsubscribe"
    }, i);
  }
  /**
   * Deregister a logs callback.
   *
   * @param clientSubscriptionId client subscription id to deregister.
   */
  async removeOnLogsListener(t) {
    await this._unsubscribeClientSubscription(t, "logs");
  }
  /**
   * @internal
   */
  _wsOnLogsNotification(t) {
    const {
      result: e,
      subscription: n
    } = rt(t, d0);
    this._handleServerNotification(n, [e.value, e.context]);
  }
  /**
   * @internal
   */
  _wsOnSlotNotification(t) {
    const {
      result: e,
      subscription: n
    } = rt(t, Pd);
    this._handleServerNotification(n, [e]);
  }
  /**
   * Register a callback to be invoked upon slot changes
   *
   * @param callback Function to invoke whenever the slot changes
   * @return subscription id
   */
  onSlotChange(t) {
    return this._makeSubscription(
      {
        callback: t,
        method: "slotSubscribe",
        unsubscribeMethod: "slotUnsubscribe"
      },
      []
      /* args */
    );
  }
  /**
   * Deregister a slot notification callback
   *
   * @param clientSubscriptionId client subscription id to deregister
   */
  async removeSlotChangeListener(t) {
    await this._unsubscribeClientSubscription(t, "slot change");
  }
  /**
   * @internal
   */
  _wsOnSlotUpdatesNotification(t) {
    const {
      result: e,
      subscription: n
    } = rt(t, Qd);
    this._handleServerNotification(n, [e]);
  }
  /**
   * Register a callback to be invoked upon slot updates. {@link SlotUpdate}'s
   * may be useful to track live progress of a cluster.
   *
   * @param callback Function to invoke whenever the slot updates
   * @return subscription id
   */
  onSlotUpdate(t) {
    return this._makeSubscription(
      {
        callback: t,
        method: "slotsUpdatesSubscribe",
        unsubscribeMethod: "slotsUpdatesUnsubscribe"
      },
      []
      /* args */
    );
  }
  /**
   * Deregister a slot update notification callback
   *
   * @param clientSubscriptionId client subscription id to deregister
   */
  async removeSlotUpdateListener(t) {
    await this._unsubscribeClientSubscription(t, "slot update");
  }
  /**
   * @internal
   */
  async _unsubscribeClientSubscription(t, e) {
    const n = this._subscriptionDisposeFunctionsByClientSubscriptionId[t];
    n ? await n() : console.warn(`Ignored unsubscribe request because an active subscription with id \`${t}\` for '${e}' events could not be found.`);
  }
  _buildArgs(t, e, n, i) {
    const s = e || this._commitment;
    if (s || n || i) {
      let l = {};
      n && (l.encoding = n), s && (l.commitment = s), i && (l = Object.assign(l, i)), t.push(l);
    }
    return t;
  }
  /**
   * @internal
   */
  _buildArgsAtLeastConfirmed(t, e, n, i) {
    const s = e || this._commitment;
    if (s && !["confirmed", "finalized"].includes(s))
      throw new Error("Using Connection with default commitment: `" + this._commitment + "`, but method requires at least `confirmed`");
    return this._buildArgs(t, e, n, i);
  }
  /**
   * @internal
   */
  _wsOnSignatureNotification(t) {
    const {
      result: e,
      subscription: n
    } = rt(t, _d);
    e.value !== "receivedSignature" && this._subscriptionsAutoDisposedByRpc.add(n), this._handleServerNotification(n, e.value === "receivedSignature" ? [{
      type: "received"
    }, e.context] : [{
      type: "status",
      result: e.value
    }, e.context]);
  }
  /**
   * Register a callback to be invoked upon signature updates
   *
   * @param signature Transaction signature string in base 58
   * @param callback Function to invoke on signature notifications
   * @param commitment Specify the commitment level signature must reach before notification
   * @return subscription id
   */
  onSignature(t, e, n) {
    const i = this._buildArgs(
      [t],
      n || this._commitment || "finalized"
      // Apply connection/server default.
    ), s = this._makeSubscription({
      callback: (l, h) => {
        if (l.type === "status") {
          e(l.result, h);
          try {
            this.removeSignatureListener(s);
          } catch {
          }
        }
      },
      method: "signatureSubscribe",
      unsubscribeMethod: "signatureUnsubscribe"
    }, i);
    return s;
  }
  /**
   * Register a callback to be invoked when a transaction is
   * received and/or processed.
   *
   * @param signature Transaction signature string in base 58
   * @param callback Function to invoke on signature notifications
   * @param options Enable received notifications and set the commitment
   *   level that signature must reach before notification
   * @return subscription id
   */
  onSignatureWithOptions(t, e, n) {
    const {
      commitment: i,
      ...s
    } = {
      ...n,
      commitment: n && n.commitment || this._commitment || "finalized"
      // Apply connection/server default.
    }, l = this._buildArgs([t], i, void 0, s), h = this._makeSubscription({
      callback: (A, E) => {
        e(A, E);
        try {
          this.removeSignatureListener(h);
        } catch {
        }
      },
      method: "signatureSubscribe",
      unsubscribeMethod: "signatureUnsubscribe"
    }, l);
    return h;
  }
  /**
   * Deregister a signature notification callback
   *
   * @param clientSubscriptionId client subscription id to deregister
   */
  async removeSignatureListener(t) {
    await this._unsubscribeClientSubscription(t, "signature result");
  }
  /**
   * @internal
   */
  _wsOnRootNotification(t) {
    const {
      result: e,
      subscription: n
    } = rt(t, Wd);
    this._handleServerNotification(n, [e]);
  }
  /**
   * Register a callback to be invoked upon root changes
   *
   * @param callback Function to invoke whenever the root changes
   * @return subscription id
   */
  onRootChange(t) {
    return this._makeSubscription(
      {
        callback: t,
        method: "rootSubscribe",
        unsubscribeMethod: "rootUnsubscribe"
      },
      []
      /* args */
    );
  }
  /**
   * Deregister a root notification callback
   *
   * @param clientSubscriptionId client subscription id to deregister
   */
  async removeRootChangeListener(t) {
    await this._unsubscribeClientSubscription(t, "root change");
  }
}
Object.freeze({
  CreateLookupTable: {
    index: 0,
    layout: _.struct([_.u32("instruction"), ur("recentSlot"), _.u8("bumpSeed")])
  },
  FreezeLookupTable: {
    index: 1,
    layout: _.struct([_.u32("instruction")])
  },
  ExtendLookupTable: {
    index: 2,
    layout: _.struct([_.u32("instruction"), ur(), _.seq(St(), _.offset(_.u32(), -8), "addresses")])
  },
  DeactivateLookupTable: {
    index: 3,
    layout: _.struct([_.u32("instruction")])
  },
  CloseLookupTable: {
    index: 4,
    layout: _.struct([_.u32("instruction")])
  }
});
new gt("AddressLookupTab1e1111111111111111111111111");
Object.freeze({
  RequestUnits: {
    index: 0,
    layout: _.struct([_.u8("instruction"), _.u32("units"), _.u32("additionalFee")])
  },
  RequestHeapFrame: {
    index: 1,
    layout: _.struct([_.u8("instruction"), _.u32("bytes")])
  },
  SetComputeUnitLimit: {
    index: 2,
    layout: _.struct([_.u8("instruction"), _.u32("units")])
  },
  SetComputeUnitPrice: {
    index: 3,
    layout: _.struct([_.u8("instruction"), ur("microLamports")])
  }
});
new gt("ComputeBudget111111111111111111111111111111");
_.struct([_.u8("numSignatures"), _.u8("padding"), _.u16("signatureOffset"), _.u16("signatureInstructionIndex"), _.u16("publicKeyOffset"), _.u16("publicKeyInstructionIndex"), _.u16("messageDataOffset"), _.u16("messageDataSize"), _.u16("messageInstructionIndex")]);
new gt("Ed25519SigVerify111111111111111111111111111");
If.utils.isValidPrivateKey;
_.struct([_.u8("numSignatures"), _.u16("signatureOffset"), _.u8("signatureInstructionIndex"), _.u16("ethAddressOffset"), _.u8("ethAddressInstructionIndex"), _.u16("messageDataOffset"), _.u16("messageDataSize"), _.u8("messageInstructionIndex"), _.blob(20, "ethAddress"), _.blob(64, "signature"), _.u8("recoveryId")]);
new gt("KeccakSecp256k11111111111111111111111111111");
var zc;
new gt("StakeConfig11111111111111111111111111111111");
class Pc {
  /**
   * Create a new Lockup object
   */
  constructor(t, e, n) {
    this.unixTimestamp = void 0, this.epoch = void 0, this.custodian = void 0, this.unixTimestamp = t, this.epoch = e, this.custodian = n;
  }
  /**
   * Default, inactive Lockup value
   */
}
zc = Pc;
Pc.default = new zc(0, 0, gt.default);
Object.freeze({
  Initialize: {
    index: 0,
    layout: _.struct([_.u32("instruction"), kf(), Nf()])
  },
  Authorize: {
    index: 1,
    layout: _.struct([_.u32("instruction"), St("newAuthorized"), _.u32("stakeAuthorizationType")])
  },
  Delegate: {
    index: 2,
    layout: _.struct([_.u32("instruction")])
  },
  Split: {
    index: 3,
    layout: _.struct([_.u32("instruction"), _.ns64("lamports")])
  },
  Withdraw: {
    index: 4,
    layout: _.struct([_.u32("instruction"), _.ns64("lamports")])
  },
  Deactivate: {
    index: 5,
    layout: _.struct([_.u32("instruction")])
  },
  Merge: {
    index: 7,
    layout: _.struct([_.u32("instruction")])
  },
  AuthorizeWithSeed: {
    index: 8,
    layout: _.struct([_.u32("instruction"), St("newAuthorized"), _.u32("stakeAuthorizationType"), $n("authoritySeed"), St("authorityOwner")])
  }
});
new gt("Stake11111111111111111111111111111111111111");
Object.freeze({
  InitializeAccount: {
    index: 0,
    layout: _.struct([_.u32("instruction"), Tf()])
  },
  Authorize: {
    index: 1,
    layout: _.struct([_.u32("instruction"), St("newAuthorized"), _.u32("voteAuthorizationType")])
  },
  Withdraw: {
    index: 3,
    layout: _.struct([_.u32("instruction"), _.ns64("lamports")])
  },
  UpdateValidatorIdentity: {
    index: 4,
    layout: _.struct([_.u32("instruction")])
  },
  AuthorizeWithSeed: {
    index: 10,
    layout: _.struct([_.u32("instruction"), Lf()])
  }
});
new gt("Vote111111111111111111111111111111111111111");
new gt("Va1idator1nfo111111111111111111111111111111");
$({
  name: et(),
  website: mt(et()),
  details: mt(et()),
  iconUrl: mt(et()),
  keybaseUsername: mt(et())
});
new gt("Vote111111111111111111111111111111111111111");
_.struct([
  St("nodePubkey"),
  St("authorizedWithdrawer"),
  _.u8("commission"),
  _.nu64(),
  // votes.length
  _.seq(_.struct([_.nu64("slot"), _.u32("confirmationCount")]), _.offset(_.u32(), -8), "votes"),
  _.u8("rootSlotValid"),
  _.nu64("rootSlot"),
  _.nu64(),
  // authorizedVoters.length
  _.seq(_.struct([_.nu64("epoch"), St("authorizedVoter")]), _.offset(_.u32(), -8), "authorizedVoters"),
  _.struct([_.seq(_.struct([St("authorizedPubkey"), _.nu64("epochOfLastAuthorizedSwitch"), _.nu64("targetEpoch")]), 32, "buf"), _.nu64("idx"), _.u8("isEmpty")], "priorVoters"),
  _.nu64(),
  // epochCredits.length
  _.seq(_.struct([_.nu64("epoch"), _.nu64("credits"), _.nu64("prevCredits")]), _.offset(_.u32(), -8), "epochCredits"),
  _.struct([_.nu64("slot"), _.nu64("timestamp")], "lastTimestamp")
]);
const ka = 1e9, p0 = "Phantom";
class w0 extends no {
  constructor(t = {}) {
    super(), this.name = p0, this.url = "https://phantom.app", this.icon = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDgiIGhlaWdodD0iMTA4IiB2aWV3Qm94PSIwIDAgMTA4IDEwOCIgZmlsbD0ibm9uZSI+CjxyZWN0IHdpZHRoPSIxMDgiIGhlaWdodD0iMTA4IiByeD0iMjYiIGZpbGw9IiNBQjlGRjIiLz4KPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik00Ni41MjY3IDY5LjkyMjlDNDIuMDA1NCA3Ni44NTA5IDM0LjQyOTIgODUuNjE4MiAyNC4zNDggODUuNjE4MkMxOS41ODI0IDg1LjYxODIgMTUgODMuNjU2MyAxNSA3NS4xMzQyQzE1IDUzLjQzMDUgNDQuNjMyNiAxOS44MzI3IDcyLjEyNjggMTkuODMyN0M4Ny43NjggMTkuODMyNyA5NCAzMC42ODQ2IDk0IDQzLjAwNzlDOTQgNTguODI1OCA4My43MzU1IDc2LjkxMjIgNzMuNTMyMSA3Ni45MTIyQzcwLjI5MzkgNzYuOTEyMiA2OC43MDUzIDc1LjEzNDIgNjguNzA1MyA3Mi4zMTRDNjguNzA1MyA3MS41NzgzIDY4LjgyNzUgNzAuNzgxMiA2OS4wNzE5IDY5LjkyMjlDNjUuNTg5MyA3NS44Njk5IDU4Ljg2ODUgODEuMzg3OCA1Mi41NzU0IDgxLjM4NzhDNDcuOTkzIDgxLjM4NzggNDUuNjcxMyA3OC41MDYzIDQ1LjY3MTMgNzQuNDU5OEM0NS42NzEzIDcyLjk4ODQgNDUuOTc2OCA3MS40NTU2IDQ2LjUyNjcgNjkuOTIyOVpNODMuNjc2MSA0Mi41Nzk0QzgzLjY3NjEgNDYuMTcwNCA4MS41NTc1IDQ3Ljk2NTggNzkuMTg3NSA0Ny45NjU4Qzc2Ljc4MTYgNDcuOTY1OCA3NC42OTg5IDQ2LjE3MDQgNzQuNjk4OSA0Mi41Nzk0Qzc0LjY5ODkgMzguOTg4NSA3Ni43ODE2IDM3LjE5MzEgNzkuMTg3NSAzNy4xOTMxQzgxLjU1NzUgMzcuMTkzMSA4My42NzYxIDM4Ljk4ODUgODMuNjc2MSA0Mi41Nzk0Wk03MC4yMTAzIDQyLjU3OTVDNzAuMjEwMyA0Ni4xNzA0IDY4LjA5MTYgNDcuOTY1OCA2NS43MjE2IDQ3Ljk2NThDNjMuMzE1NyA0Ny45NjU4IDYxLjIzMyA0Ni4xNzA0IDYxLjIzMyA0Mi41Nzk1QzYxLjIzMyAzOC45ODg1IDYzLjMxNTcgMzcuMTkzMSA2NS43MjE2IDM3LjE5MzFDNjguMDkxNiAzNy4xOTMxIDcwLjIxMDMgMzguOTg4NSA3MC4yMTAzIDQyLjU3OTVaIiBmaWxsPSIjRkZGREY4Ii8+Cjwvc3ZnPg==", this.supportedTransactionVersions = /* @__PURE__ */ new Set(["legacy", 0]), this._readyState = typeof window > "u" || typeof document > "u" ? Ut.Unsupported : Ut.NotDetected, this._disconnected = () => {
      const e = this._wallet;
      e && (e.off("disconnect", this._disconnected), e.off("accountChanged", this._accountChanged), this._wallet = null, this._publicKey = null, this.emit("error", new Xs()), this.emit("disconnect"));
    }, this._accountChanged = (e) => {
      const n = this._publicKey;
      if (n) {
        try {
          e = new gt(e.toBytes());
        } catch (i) {
          this.emit("error", new kr(i?.message, i));
          return;
        }
        n.equals(e) || (this._publicKey = e, this.emit("connect", e));
      }
    }, this._connecting = !1, this._wallet = null, this._publicKey = null, this._readyState !== Ut.Unsupported && (ks() ? (this._readyState = Ut.Loadable, this.emit("readyStateChange", this._readyState)) : eo(() => window.phantom?.solana?.isPhantom || window.solana?.isPhantom ? (this._readyState = Ut.Installed, this.emit("readyStateChange", this._readyState), !0) : !1));
  }
  get publicKey() {
    return this._publicKey;
  }
  get connecting() {
    return this._connecting;
  }
  get readyState() {
    return this._readyState;
  }
  async autoConnect() {
    this.readyState === Ut.Installed && await this.connect();
  }
  async connect() {
    try {
      if (this.connected || this.connecting)
        return;
      if (this.readyState === Ut.Loadable) {
        const n = encodeURIComponent(window.location.href), i = encodeURIComponent(window.location.origin);
        window.location.href = `https://phantom.app/ul/browse/${n}?ref=${i}`;
        return;
      }
      if (this.readyState !== Ut.Installed)
        throw new Vs();
      this._connecting = !0;
      const t = window.phantom?.solana || window.solana;
      if (!t.isConnected)
        try {
          await t.connect();
        } catch (n) {
          throw new ii(n?.message, n);
        }
      if (!t.publicKey)
        throw new Za();
      let e;
      try {
        e = new gt(t.publicKey.toBytes());
      } catch (n) {
        throw new kr(n?.message, n);
      }
      t.on("disconnect", this._disconnected), t.on("accountChanged", this._accountChanged), this._wallet = t, this._publicKey = e, this.emit("connect", e);
    } catch (t) {
      throw this.emit("error", t), t;
    } finally {
      this._connecting = !1;
    }
  }
  async disconnect() {
    const t = this._wallet;
    if (t) {
      t.off("disconnect", this._disconnected), t.off("accountChanged", this._accountChanged), this._wallet = null, this._publicKey = null;
      try {
        await t.disconnect();
      } catch (e) {
        this.emit("error", new $s(e?.message, e));
      }
    }
    this.emit("disconnect");
  }
  async sendTransaction(t, e, n = {}) {
    try {
      const i = this._wallet;
      if (!i)
        throw new Ce();
      try {
        const { signers: s, ...l } = n;
        si(t) ? s?.length && t.sign(s) : (t = await this.prepareTransaction(t, e, l), s?.length && t.partialSign(...s)), l.preflightCommitment = l.preflightCommitment || e.commitment;
        const { signature: h } = await i.signAndSendTransaction(t, l);
        return h;
      } catch (s) {
        throw s instanceof Oe ? s : new Pn(s?.message, s);
      }
    } catch (i) {
      throw this.emit("error", i), i;
    }
  }
  async signTransaction(t) {
    try {
      const e = this._wallet;
      if (!e)
        throw new Ce();
      try {
        return await e.signTransaction(t) || t;
      } catch (n) {
        throw new tn(n?.message, n);
      }
    } catch (e) {
      throw this.emit("error", e), e;
    }
  }
  async signAllTransactions(t) {
    try {
      const e = this._wallet;
      if (!e)
        throw new Ce();
      try {
        return await e.signAllTransactions(t) || t;
      } catch (n) {
        throw new tn(n?.message, n);
      }
    } catch (e) {
      throw this.emit("error", e), e;
    }
  }
  async signMessage(t) {
    try {
      const e = this._wallet;
      if (!e)
        throw new Ce();
      try {
        const { signature: n } = await e.signMessage(t);
        return n;
      } catch (n) {
        throw new to(n?.message, n);
      }
    } catch (e) {
      throw this.emit("error", e), e;
    }
  }
}
var y0 = function(r, t, e, n) {
  if (e === "a" && !n) throw new TypeError("Private accessor was defined without a getter");
  if (typeof t == "function" ? r !== t || !n : !t.has(r)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
  return e === "m" ? n : e === "a" ? n.call(r) : n ? n.value : t.get(r);
}, m0 = function(r, t, e, n, i) {
  if (n === "m") throw new TypeError("Private method is not writable");
  if (n === "a" && !i) throw new TypeError("Private accessor was defined without a setter");
  if (typeof t == "function" ? r !== t || !i : !t.has(r)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
  return n === "a" ? i.call(r, e) : i ? i.value = e : t.set(r, e), e;
}, ti;
function b0(r) {
  const t = ({ register: e }) => e(r);
  try {
    window.dispatchEvent(new E0(t));
  } catch (e) {
    console.error(`wallet-standard:register-wallet event could not be dispatched
`, e);
  }
  try {
    window.addEventListener("wallet-standard:app-ready", ({ detail: e }) => t(e));
  } catch (e) {
    console.error(`wallet-standard:app-ready event listener could not be added
`, e);
  }
}
class E0 extends Event {
  get detail() {
    return y0(this, ti, "f");
  }
  get type() {
    return "wallet-standard:register-wallet";
  }
  constructor(t) {
    super("wallet-standard:register-wallet", {
      bubbles: !1,
      cancelable: !1,
      composed: !1
    }), ti.set(this, void 0), m0(this, ti, t, "f");
  }
  /** @deprecated */
  preventDefault() {
    throw new Error("preventDefault cannot be called");
  }
  /** @deprecated */
  stopImmediatePropagation() {
    throw new Error("stopImmediatePropagation cannot be called");
  }
  /** @deprecated */
  stopPropagation() {
    throw new Error("stopPropagation cannot be called");
  }
}
ti = /* @__PURE__ */ new WeakMap();
const v0 = "solana:mainnet", I0 = "solana:devnet", M0 = "solana:testnet", S0 = "data:image/svg+xml;base64,PHN2ZyBmaWxsPSJub25lIiBoZWlnaHQ9IjMxIiB2aWV3Qm94PSIwIDAgMzEgMzEiIHdpZHRoPSIzMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+PGxpbmVhckdyYWRpZW50IGlkPSJhIiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgeDE9IjIwLjI1IiB4Mj0iMjYuNTcxIiB5MT0iMjcuMTczIiB5Mj0iMTkuODU4Ij48c3RvcCBvZmZzZXQ9Ii4wOCIgc3RvcC1jb2xvcj0iIzk5NDVmZiIvPjxzdG9wIG9mZnNldD0iLjMiIHN0b3AtY29sb3I9IiM4NzUyZjMiLz48c3RvcCBvZmZzZXQ9Ii41IiBzdG9wLWNvbG9yPSIjNTQ5N2Q1Ii8+PHN0b3Agb2Zmc2V0PSIuNiIgc3RvcC1jb2xvcj0iIzQzYjRjYSIvPjxzdG9wIG9mZnNldD0iLjcyIiBzdG9wLWNvbG9yPSIjMjhlMGI5Ii8+PHN0b3Agb2Zmc2V0PSIuOTciIHN0b3AtY29sb3I9IiMxOWZiOWIiLz48L2xpbmVhckdyYWRpZW50PjxnIHN0cm9rZS1saW5lam9pbj0icm91bmQiIHN0cm9rZS13aWR0aD0iLjA5NCI+PHBhdGggZD0ibTI2LjEwOSAzLjY0My05LjM2OSA2Ljk1OSAxLjczMy00LjEwNSA3LjYzNy0yLjg1M3oiIGZpbGw9IiNlMjc2MWIiIHN0cm9rZT0iI2UyNzYxYiIvPjxnIGZpbGw9IiNlNDc2MWIiIHN0cm9rZT0iI2U0NzYxYiI+PHBhdGggZD0ibTQuNDgxIDMuNjQzIDkuMjk0IDcuMDI0LTEuNjQ4LTQuMTcxem0xOC4yNTggMTYuMTMtMi40OTUgMy44MjMgNS4zMzkgMS40NjkgMS41MzUtNS4yMDctNC4zNzgtLjA4NXptLTE5LjI0Ny4wODUgMS41MjUgNS4yMDcgNS4zMzktMS40NjktMi40OTUtMy44MjN6Ii8+PHBhdGggZD0ibTEwLjA1NSAxMy4zMTMtMS40ODggMi4yNTEgNS4zMDEuMjM1LS4xODgtNS42OTd6bTEwLjQ4IDAtMy42NzItMy4yNzctLjEyMiA1Ljc2MyA1LjI5Mi0uMjM1LTEuNDk3LTIuMjUxem0tMTAuMTc4IDEwLjI4MyAzLjE4My0xLjU1NC0yLjc0OS0yLjE0Ny0uNDMzIDMuNzAxem02LjY5NS0xLjU1NCAzLjE5MiAxLjU1NC0uNDQzLTMuNzAxeiIvPjwvZz48cGF0aCBkPSJtMjAuMjQ0IDIzLjU5Ni0zLjE5Mi0xLjU1NC4yNTQgMi4wODEtLjAyOC44NzZ6bS05Ljg4NyAwIDIuOTY2IDEuNDAzLS4wMTktLjg3Ni4yMzUtMi4wODEtMy4xODMgMS41NTR6IiBmaWxsPSIjZDdjMWIzIiBzdHJva2U9IiNkN2MxYjMiLz48cGF0aCBkPSJtMTMuMzY5IDE4LjUyMS0yLjY1NS0uNzgxIDEuODc0LS44NTd6bTMuODUxIDAgLjc4MS0xLjYzOCAxLjg4My44NTctMi42NjUuNzgxeiIgZmlsbD0iIzIzMzQ0NyIgc3Ryb2tlPSIjMjMzNDQ3Ii8+PHBhdGggZD0ibTEwLjM1NyAyMy41OTYuNDUyLTMuODIzLTIuOTQ3LjA4NXptOS40MzUtMy44MjMuNDUyIDMuODIzIDIuNDk1LTMuNzM4em0yLjI0MS00LjIwOS01LjI5Mi4yMzUuNDkgMi43MjEuNzgyLTEuNjM4IDEuODgzLjg1N3ptLTExLjMxOCAyLjE3NSAxLjg4My0uODU3Ljc3MiAxLjYzOC40OTktMi43MjEtNS4zMDEtLjIzNXoiIGZpbGw9IiNjZDYxMTYiIHN0cm9rZT0iI2NkNjExNiIvPjxwYXRoIGQ9Im04LjU2NyAxNS41NjQgMi4yMjIgNC4zMzEtLjA3NS0yLjE1NnptMTEuMzI4IDIuMTc1LS4wOTQgMi4xNTYgMi4yMzItNC4zMzEtMi4xMzcgMi4xNzV6bS02LjAyNi0xLjk0LS40OTkgMi43MjEuNjIxIDMuMjExLjE0MS00LjIyOC0uMjY0LTEuNzA0em0yLjg3MiAwLS4yNTQgMS42OTUuMTEzIDQuMjM3LjYzMS0zLjIxMXoiIGZpbGw9IiNlNDc1MWYiIHN0cm9rZT0iI2U0NzUxZiIvPjxwYXRoIGQ9Im0xNy4yMyAxOC41Mi0uNjMxIDMuMjExLjQ1Mi4zMTEgMi43NS0yLjE0Ny4wOTQtMi4xNTZ6bS02LjUxNi0uNzgxLjA3NSAyLjE1NiAyLjc1IDIuMTQ3LjQ1Mi0uMzExLS42MjItMy4yMTF6IiBmaWxsPSIjZjY4NTFiIiBzdHJva2U9IiNmNjg1MWIiLz48cGF0aCBkPSJtMTcuMjc3IDI0Ljk5OS4wMjgtLjg3Ni0uMjM1LS4yMDdoLTMuNTVsLS4yMTcuMjA3LjAxOS44NzYtMi45NjYtMS40MDMgMS4wMzYuODQ4IDIuMSAxLjQ1OWgzLjYwNmwyLjEwOS0xLjQ1OSAxLjAzNi0uODQ4eiIgZmlsbD0iI2MwYWQ5ZSIgc3Ryb2tlPSIjYzBhZDllIi8+PHBhdGggZD0ibTE3LjA1MSAyMi4wNDItLjQ1Mi0uMzExaC0yLjYwOGwtLjQ1Mi4zMTEtLjIzNSAyLjA4MS4yMTctLjIwN2gzLjU1bC4yMzUuMjA3LS4yNTQtMi4wODF6IiBmaWxsPSIjMTYxNjE2IiBzdHJva2U9IiMxNjE2MTYiLz48cGF0aCBkPSJtMjYuNTA1IDExLjA1My44LTMuODQyLTEuMTk2LTMuNTY5LTkuMDU4IDYuNzIzIDMuNDg0IDIuOTQ3IDQuOTI1IDEuNDQxIDEuMDkyLTEuMjcxLS40NzEtLjMzOS43NTMtLjY4Ny0uNTg0LS40NTIuNzUzLS41NzQtLjQ5OS0uMzc3em0tMjMuMjExLTMuODQxLjggMy44NDItLjUwOC4zNzcuNzUzLjU3NC0uNTc0LjQ1Mi43NTMuNjg3LS40NzEuMzM5IDEuMDgzIDEuMjcxIDQuOTI1LTEuNDQxIDMuNDg0LTIuOTQ3LTkuMDU5LTYuNzIzeiIgZmlsbD0iIzc2M2QxNiIgc3Ryb2tlPSIjNzYzZDE2Ii8+PHBhdGggZD0ibTI1LjQ2IDE0Ljc1NC00LjkyNS0xLjQ0MSAxLjQ5NyAyLjI1MS0yLjIzMiA0LjMzMSAyLjkzOC0uMDM4aDQuMzc4bC0xLjY1Ny01LjEwNHptLTE1LjQwNS0xLjQ0MS00LjkyNSAxLjQ0MS0xLjYzOCA1LjEwNGg0LjM2OWwyLjkyOC4wMzgtMi4yMjItNC4zMzEgMS40ODgtMi4yNTF6bTYuNjg1IDIuNDg2LjMxMS01LjQzMyAxLjQzMS0zLjg3aC02LjM1NmwxLjQxMyAzLjg3LjMyOSA1LjQzMy4xMTMgMS43MTQuMDA5IDQuMjE5aDIuNjFsLjAxOS00LjIxOS4xMjItMS43MTR6IiBmaWxsPSIjZjY4NTFiIiBzdHJva2U9IiNmNjg1MWIiLz48L2c+PGNpcmNsZSBjeD0iMjMuNSIgY3k9IjIzLjUiIGZpbGw9IiMwMDAiIHI9IjYuNSIvPjxwYXRoIGQ9Im0yNy40NzMgMjUuNTQ1LTEuMzEgMS4zNjhjLS4wMjkuMDMtLjA2My4wNTMtLjEwMS4wN2EuMzEuMzEgMCAwIDEgLS4xMjEuMDI0aC02LjIwOWMtLjAzIDAtLjA1OS0uMDA4LS4wODMtLjAyNGEuMTUuMTUgMCAwIDEgLS4wNTYtLjA2NWMtLjAxMi0uMDI2LS4wMTUtLjA1Ni0uMDEtLjA4NHMuMDE4LS4wNTUuMDM5LS4wNzZsMS4zMTEtMS4zNjhjLjAyOC0uMDMuMDYzLS4wNTMuMTAxLS4wNjlhLjMxLjMxIDAgMCAxIC4xMjEtLjAyNWg2LjIwOGMuMDMgMCAuMDU5LjAwOC4wODMuMDI0YS4xNS4xNSAwIDAgMSAuMDU2LjA2NWMuMDEyLjAyNi4wMTUuMDU2LjAxLjA4NHMtLjAxOC4wNTUtLjAzOS4wNzZ6bS0xLjMxLTIuNzU2Yy0uMDI5LS4wMy0uMDYzLS4wNTMtLjEwMS0uMDdhLjMxLjMxIDAgMCAwIC0uMTIxLS4wMjRoLTYuMjA5Yy0uMDMgMC0uMDU5LjAwOC0uMDgzLjAyNHMtLjA0NC4wMzgtLjA1Ni4wNjUtLjAxNS4wNTYtLjAxLjA4NC4wMTguMDU1LjAzOS4wNzZsMS4zMTEgMS4zNjhjLjAyOC4wMy4wNjMuMDUzLjEwMS4wNjlhLjMxLjMxIDAgMCAwIC4xMjEuMDI1aDYuMjA4Yy4wMyAwIC4wNTktLjAwOC4wODMtLjAyNGEuMTUuMTUgMCAwIDAgLjA1Ni0uMDY1Yy4wMTItLjAyNi4wMTUtLjA1Ni4wMS0uMDg0cy0uMDE4LS4wNTUtLjAzOS0uMDc2em0tNi40MzEtLjk4M2g2LjIwOWEuMzEuMzEgMCAwIDAgLjEyMS0uMDI0Yy4wMzgtLjAxNi4wNzMtLjA0LjEwMS0uMDdsMS4zMS0xLjM2OGMuMDItLjAyMS4wMzQtLjA0Ny4wMzktLjA3NnMuMDAxLS4wNTgtLjAxLS4wODRhLjE1LjE1IDAgMCAwIC0uMDU2LS4wNjVjLS4wMjUtLjAxNi0uMDU0LS4wMjQtLjA4My0uMDI0aC02LjIwOGEuMzEuMzEgMCAwIDAgLS4xMjEuMDI1Yy0uMDM4LjAxNi0uMDcyLjA0LS4xMDEuMDY5bC0xLjMxIDEuMzY4Yy0uMDIuMDIxLS4wMzQuMDQ3LS4wMzkuMDc2cy0uMDAxLjA1OC4wMS4wODQuMDMxLjA0OS4wNTYuMDY1LjA1NC4wMjQuMDgzLjAyNHoiIGZpbGw9InVybCgjYSkiLz48L3N2Zz4=";
var Nt = function(r, t, e, n) {
  if (e === "a" && !n) throw new TypeError("Private accessor was defined without a getter");
  if (typeof t == "function" ? r !== t || !n : !t.has(r)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
  return e === "m" ? n : e === "a" ? n.call(r) : n ? n.value : t.get(r);
}, x0 = function(r, t, e, n, i) {
  if (n === "m") throw new TypeError("Private method is not writable");
  if (n === "a" && !i) throw new TypeError("Private accessor was defined without a setter");
  if (typeof t == "function" ? r !== t || !i : !t.has(r)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
  return n === "a" ? i.call(r, e) : i ? i.value = e : t.set(r, e), e;
}, ei, Fn, Qs, _s, Ws, Be, qs, Fc, Qc, Hs, Zs, Ys, Gs, Js;
class B0 {
  constructor() {
    ei.add(this), Fn.set(this, {}), Qs.set(this, "1.0.0"), _s.set(this, "MetaMask"), Ws.set(this, S0), Be.set(this, null), qs.set(this, (t, e) => (Nt(this, Fn, "f")[t]?.push(e) || (Nt(this, Fn, "f")[t] = [e]), () => Nt(this, ei, "m", Qc).call(this, t, e))), Hs.set(this, async () => {
      if (!Nt(this, Be, "f")) {
        let t;
        try {
          t = (await import("./index-DCAdTmco.js")).default;
        } catch {
          throw new Error("Unable to load Solflare MetaMask SDK");
        }
        x0(this, Be, new t(), "f"), Nt(this, Be, "f").on("standard_change", (e) => Nt(this, ei, "m", Fc).call(this, "change", e));
      }
      return this.accounts.length || await Nt(this, Be, "f").connect(), { accounts: this.accounts };
    }), Zs.set(this, async () => {
      Nt(this, Be, "f") && await Nt(this, Be, "f").disconnect();
    }), Ys.set(this, async (...t) => {
      if (!Nt(this, Be, "f"))
        throw new Ce();
      return await Nt(this, Be, "f").standardSignAndSendTransaction(...t);
    }), Gs.set(this, async (...t) => {
      if (!Nt(this, Be, "f"))
        throw new Ce();
      return await Nt(this, Be, "f").standardSignTransaction(...t);
    }), Js.set(this, async (...t) => {
      if (!Nt(this, Be, "f"))
        throw new Ce();
      return await Nt(this, Be, "f").standardSignMessage(...t);
    });
  }
  get version() {
    return Nt(this, Qs, "f");
  }
  get name() {
    return Nt(this, _s, "f");
  }
  get icon() {
    return Nt(this, Ws, "f");
  }
  get chains() {
    return [v0, I0, M0];
  }
  get features() {
    return {
      [sl]: {
        version: "1.0.0",
        connect: Nt(this, Hs, "f")
      },
      [ol]: {
        version: "1.0.0",
        disconnect: Nt(this, Zs, "f")
      },
      [al]: {
        version: "1.0.0",
        on: Nt(this, qs, "f")
      },
      [nl]: {
        version: "1.0.0",
        supportedTransactionVersions: ["legacy", 0],
        signAndSendTransaction: Nt(this, Ys, "f")
      },
      [il]: {
        version: "1.0.0",
        supportedTransactionVersions: ["legacy", 0],
        signTransaction: Nt(this, Gs, "f")
      },
      [rl]: {
        version: "1.0.0",
        signMessage: Nt(this, Js, "f")
      }
    };
  }
  get accounts() {
    return Nt(this, Be, "f") ? Nt(this, Be, "f").standardAccounts : [];
  }
}
Fn = /* @__PURE__ */ new WeakMap(), Qs = /* @__PURE__ */ new WeakMap(), _s = /* @__PURE__ */ new WeakMap(), Ws = /* @__PURE__ */ new WeakMap(), Be = /* @__PURE__ */ new WeakMap(), qs = /* @__PURE__ */ new WeakMap(), Hs = /* @__PURE__ */ new WeakMap(), Zs = /* @__PURE__ */ new WeakMap(), Ys = /* @__PURE__ */ new WeakMap(), Gs = /* @__PURE__ */ new WeakMap(), Js = /* @__PURE__ */ new WeakMap(), ei = /* @__PURE__ */ new WeakSet(), Fc = function(t, ...e) {
  Nt(this, Fn, "f")[t]?.forEach((n) => n.apply(null, e));
}, Qc = function(t, e) {
  Nt(this, Fn, "f")[t] = Nt(this, Fn, "f")[t]?.filter((n) => e !== n);
};
let Na = !1;
function C0() {
  Na || (b0(new B0()), Na = !0);
}
async function k0() {
  const r = "solflare-detect-metamask";
  function t() {
    window.postMessage({
      target: "metamask-contentscript",
      data: {
        name: "metamask-provider",
        data: {
          id: r,
          jsonrpc: "2.0",
          method: "wallet_getSnaps"
        }
      }
    }, window.location.origin);
  }
  function e(n) {
    const i = n.data;
    i?.target === "metamask-inpage" && i.data?.name === "metamask-provider" && (i.data.data?.id === r ? (window.removeEventListener("message", e), i.data.data.error || C0()) : t());
  }
  window.addEventListener("message", e), window.setTimeout(() => window.removeEventListener("message", e), 5e3), t();
}
const N0 = "Solflare";
class T0 extends no {
  constructor(t = {}) {
    super(), this.name = N0, this.url = "https://solflare.com", this.icon = "data:image/svg+xml;base64,PHN2ZyBmaWxsPSJub25lIiBoZWlnaHQ9IjUwIiB2aWV3Qm94PSIwIDAgNTAgNTAiIHdpZHRoPSI1MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+PGxpbmVhckdyYWRpZW50IGlkPSJhIj48c3RvcCBvZmZzZXQ9IjAiIHN0b3AtY29sb3I9IiNmZmMxMGIiLz48c3RvcCBvZmZzZXQ9IjEiIHN0b3AtY29sb3I9IiNmYjNmMmUiLz48L2xpbmVhckdyYWRpZW50PjxsaW5lYXJHcmFkaWVudCBpZD0iYiIgZ3JhZGllbnRVbml0cz0idXNlclNwYWNlT25Vc2UiIHgxPSI2LjQ3ODM1IiB4Mj0iMzQuOTEwNyIgeGxpbms6aHJlZj0iI2EiIHkxPSI3LjkyIiB5Mj0iMzMuNjU5MyIvPjxyYWRpYWxHcmFkaWVudCBpZD0iYyIgY3g9IjAiIGN5PSIwIiBncmFkaWVudFRyYW5zZm9ybT0ibWF0cml4KDQuOTkyMTg4MzIgMTIuMDYzODc5NjMgLTEyLjE4MTEzNjU1IDUuMDQwNzEwNzQgMjIuNTIwMiAyMC42MTgzKSIgZ3JhZGllbnRVbml0cz0idXNlclNwYWNlT25Vc2UiIHI9IjEiIHhsaW5rOmhyZWY9IiNhIi8+PHBhdGggZD0ibTI1LjE3MDggNDcuOTEwNGMuNTI1IDAgLjk1MDcuNDIxLjk1MDcuOTQwM3MtLjQyNTcuOTQwMi0uOTUwNy45NDAyLS45NTA3LS40MjA5LS45NTA3LS45NDAyLjQyNTctLjk0MDMuOTUwNy0uOTQwM3ptLTEuMDMyOC00NC45MTU2NWMuNDY0Ni4wMzgzNi44Mzk4LjM5MDQuOTAyNy44NDY4MWwxLjEzMDcgOC4yMTU3NGMuMzc5OCAyLjcxNDMgMy42NTM1IDMuODkwNCA1LjY3NDMgMi4wNDU5bDExLjMyOTEtMTAuMzExNThjLjI3MzMtLjI0ODczLjY5ODktLjIzMTQ5Ljk1MDcuMDM4NTEuMjMwOS4yNDc3Mi4yMzc5LjYyNjk3LjAxNjEuODgyNzdsLTkuODc5MSAxMS4zOTU4Yy0xLjgxODcgMi4wOTQyLS40NzY4IDUuMzY0MyAyLjI5NTYgNS41OTc4bDguNzE2OC44NDAzYy40MzQxLjA0MTguNzUxNy40MjM0LjcwOTMuODUyNC0uMDM0OS4zNTM3LS4zMDc0LjYzOTUtLjY2MjguNjk0OWwtOS4xNTk0IDEuNDMwMmMtMi42NTkzLjM2MjUtMy44NjM2IDMuNTExNy0yLjEzMzkgNS41NTc2bDMuMjIgMy43OTYxYy4yNTk0LjMwNTguMjE4OC43NjE1LS4wOTA4IDEuMDE3OC0uMjYyMi4yMTcyLS42NDE5LjIyNTYtLjkxMzguMDIwM2wtMy45Njk0LTIuOTk3OGMtMi4xNDIxLTEuNjEwOS01LjIyOTctLjI0MTctNS40NTYxIDIuNDI0M2wtLjg3NDcgMTAuMzk3NmMtLjAzNjIuNDI5NS0uNDE3OC43NDg3LS44NTI1LjcxMy0uMzY5LS4wMzAzLS42NjcxLS4zMDk3LS43MTcxLS42NzIxbC0xLjM4NzEtMTAuMDQzN2MtLjM3MTctMi43MTQ0LTMuNjQ1NC0zLjg5MDQtNS42NzQzLTIuMDQ1OWwtMTIuMDUxOTUgMTAuOTc0Yy0uMjQ5NDcuMjI3MS0uNjM4MDkuMjExNC0uODY4LS4wMzUtLjIxMDk0LS4yMjYyLS4yMTczNS0uNTcyNC0uMDE0OTMtLjgwNmwxMC41MTgxOC0xMi4xMzg1YzEuODE4Ny0yLjA5NDIuNDg0OS01LjM2NDQtMi4yODc2LTUuNTk3OGwtOC43MTg3Mi0uODQwNWMtLjQzNDEzLS4wNDE4LS43NTE3Mi0uNDIzNS0uNzA5MzYtLjg1MjQuMDM0OTMtLjM1MzcuMzA3MzktLjYzOTQuNjYyNy0uNjk1bDkuMTUzMzgtMS40Mjk5YzIuNjU5NC0uMzYyNSAzLjg3MTgtMy41MTE3IDIuMTQyMS01LjU1NzZsLTIuMTkyLTIuNTg0MWMtLjMyMTctLjM3OTItLjI3MTMtLjk0NDMuMTEyNi0xLjI2MjEuMzI1My0uMjY5NC43OTYzLS4yNzk3IDEuMTMzNC0uMDI0OWwyLjY5MTggMi4wMzQ3YzIuMTQyMSAxLjYxMDkgNS4yMjk3LjI0MTcgNS40NTYxLTIuNDI0M2wuNzI0MS04LjU1OTk4Yy4wNDU3LS41NDA4LjUyNjUtLjk0MjU3IDEuMDczOS0uODk3Mzd6bS0yMy4xODczMyAyMC40Mzk2NWMuNTI1MDQgMCAuOTUwNjcuNDIxLjk1MDY3Ljk0MDNzLS40MjU2My45NDAzLS45NTA2Ny45NDAzYy0uNTI1MDQxIDAtLjk1MDY3LS40MjEtLjk1MDY3LS45NDAzcy40MjU2MjktLjk0MDMuOTUwNjctLjk0MDN6bTQ3LjY3OTczLS45NTQ3Yy41MjUgMCAuOTUwNy40MjEuOTUwNy45NDAzcy0uNDI1Ny45NDAyLS45NTA3Ljk0MDItLjk1MDctLjQyMDktLjk1MDctLjk0MDIuNDI1Ny0uOTQwMy45NTA3LS45NDAzem0tMjQuNjI5Ni0yMi40Nzk3Yy41MjUgMCAuOTUwNi40MjA5NzMuOTUwNi45NDAyNyAwIC41MTkzLS40MjU2Ljk0MDI3LS45NTA2Ljk0MDI3LS41MjUxIDAtLjk1MDctLjQyMDk3LS45NTA3LS45NDAyNyAwLS41MTkyOTcuNDI1Ni0uOTQwMjcuOTUwNy0uOTQwMjd6IiBmaWxsPSJ1cmwoI2IpIi8+PHBhdGggZD0ibTI0LjU3MSAzMi43NzkyYzQuOTU5NiAwIDguOTgwMi0zLjk3NjUgOC45ODAyLTguODgxOSAwLTQuOTA1My00LjAyMDYtOC44ODE5LTguOTgwMi04Ljg4MTlzLTguOTgwMiAzLjk3NjYtOC45ODAyIDguODgxOWMwIDQuOTA1NCA0LjAyMDYgOC44ODE5IDguOTgwMiA4Ljg4MTl6IiBmaWxsPSJ1cmwoI2MpIi8+PC9zdmc+", this.supportedTransactionVersions = /* @__PURE__ */ new Set(["legacy", 0]), this._readyState = typeof window > "u" || typeof document > "u" ? Ut.Unsupported : Ut.Loadable, this._disconnected = () => {
      const e = this._wallet;
      e && (e.off("disconnect", this._disconnected), this._wallet = null, this._publicKey = null, this.emit("error", new Xs()), this.emit("disconnect"));
    }, this._accountChanged = (e) => {
      if (!e)
        return;
      const n = this._publicKey;
      if (n) {
        try {
          e = new gt(e.toBytes());
        } catch (i) {
          this.emit("error", new kr(i?.message, i));
          return;
        }
        n.equals(e) || (this._publicKey = e, this.emit("connect", e));
      }
    }, this._connecting = !1, this._publicKey = null, this._wallet = null, this._config = t, this._readyState !== Ut.Unsupported && (eo(() => window.solflare?.isSolflare || window.SolflareApp ? (this._readyState = Ut.Installed, this.emit("readyStateChange", this._readyState), !0) : !1), k0());
  }
  get publicKey() {
    return this._publicKey;
  }
  get connecting() {
    return this._connecting;
  }
  get connected() {
    return !!this._wallet?.connected;
  }
  get readyState() {
    return this._readyState;
  }
  async autoConnect() {
    this.readyState === Ut.Loadable && ks() || await this.connect();
  }
  async connect() {
    try {
      if (this.connected || this.connecting)
        return;
      if (this._readyState !== Ut.Loadable && this._readyState !== Ut.Installed)
        throw new Vs();
      if (this.readyState === Ut.Loadable && ks()) {
        const i = encodeURIComponent(window.location.href), s = encodeURIComponent(window.location.origin);
        window.location.href = `https://solflare.com/ul/v1/browse/${i}?ref=${s}`;
        return;
      }
      let t;
      try {
        t = (await import("./index-_JMs_PW9.js")).default;
      } catch (i) {
        throw new Xu(i?.message, i);
      }
      let e;
      try {
        e = new t({ network: this._config.network });
      } catch (i) {
        throw new $u(i?.message, i);
      }
      if (this._connecting = !0, !e.connected)
        try {
          await e.connect();
        } catch (i) {
          throw new ii(i?.message, i);
        }
      if (!e.publicKey)
        throw new ii();
      let n;
      try {
        n = new gt(e.publicKey.toBytes());
      } catch (i) {
        throw new kr(i?.message, i);
      }
      e.on("disconnect", this._disconnected), e.on("accountChanged", this._accountChanged), this._wallet = e, this._publicKey = n, this.emit("connect", n);
    } catch (t) {
      throw this.emit("error", t), t;
    } finally {
      this._connecting = !1;
    }
  }
  async disconnect() {
    const t = this._wallet;
    if (t) {
      t.off("disconnect", this._disconnected), t.off("accountChanged", this._accountChanged), this._wallet = null, this._publicKey = null;
      try {
        await t.disconnect();
      } catch (e) {
        this.emit("error", new $s(e?.message, e));
      }
    }
    this.emit("disconnect");
  }
  async sendTransaction(t, e, n = {}) {
    try {
      const i = this._wallet;
      if (!i)
        throw new Ce();
      try {
        const { signers: s, ...l } = n;
        return si(t) ? s?.length && t.sign(s) : (t = await this.prepareTransaction(t, e, l), s?.length && t.partialSign(...s)), l.preflightCommitment = l.preflightCommitment || e.commitment, await i.signAndSendTransaction(t, l);
      } catch (s) {
        throw s instanceof Oe ? s : new Pn(s?.message, s);
      }
    } catch (i) {
      throw this.emit("error", i), i;
    }
  }
  async signTransaction(t) {
    try {
      const e = this._wallet;
      if (!e)
        throw new Ce();
      try {
        return await e.signTransaction(t) || t;
      } catch (n) {
        throw new tn(n?.message, n);
      }
    } catch (e) {
      throw this.emit("error", e), e;
    }
  }
  async signAllTransactions(t) {
    try {
      const e = this._wallet;
      if (!e)
        throw new Ce();
      try {
        return await e.signAllTransactions(t) || t;
      } catch (n) {
        throw new tn(n?.message, n);
      }
    } catch (e) {
      throw this.emit("error", e), e;
    }
  }
  async signMessage(t) {
    try {
      const e = this._wallet;
      if (!e)
        throw new Ce();
      try {
        return await e.signMessage(t, "utf8");
      } catch (n) {
        throw new to(n?.message, n);
      }
    } catch (e) {
      throw this.emit("error", e), e;
    }
  }
}
const L0 = "Backpack";
class R0 extends no {
  constructor(t = {}) {
    super(), this.name = L0, this.url = "https://backpack.app", this.icon = "data:image/png;base64,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", this.supportedTransactionVersions = null, this._readyState = typeof window > "u" || typeof document > "u" ? Ut.Unsupported : Ut.NotDetected, this._disconnected = () => {
      const e = this._wallet;
      e && (e.off("disconnect", this._disconnected), this._wallet = null, this._publicKey = null, this.emit("error", new Xs()), this.emit("disconnect"));
    }, this._connecting = !1, this._wallet = null, this._publicKey = null, this._readyState !== Ut.Unsupported && eo(() => window.backpack?.isBackpack ? (this._readyState = Ut.Installed, this.emit("readyStateChange", this._readyState), !0) : !1);
  }
  get publicKey() {
    return this._publicKey;
  }
  get connecting() {
    return this._connecting;
  }
  get connected() {
    return !!this._wallet?.isConnected;
  }
  get readyState() {
    return this._readyState;
  }
  async connect() {
    try {
      if (this.connected || this.connecting)
        return;
      if (this._readyState !== Ut.Installed)
        throw new Vs();
      this._connecting = !0;
      const t = window.backpack;
      try {
        await t.connect();
      } catch (n) {
        throw new ii(n?.message, n);
      }
      if (!t.publicKey)
        throw new Za();
      let e;
      try {
        e = new gt(t.publicKey.toBytes());
      } catch (n) {
        throw new kr(n?.message, n);
      }
      t.on("disconnect", this._disconnected), this._wallet = t, this._publicKey = e, this.emit("connect", e);
    } catch (t) {
      throw this.emit("error", t), t;
    } finally {
      this._connecting = !1;
    }
  }
  async disconnect() {
    const t = this._wallet;
    if (t) {
      t.off("disconnect", this._disconnected), this._wallet = null, this._publicKey = null;
      try {
        await t.disconnect();
      } catch (e) {
        this.emit("error", new $s(e?.message, e));
      }
    }
    this.emit("disconnect");
  }
  async sendTransaction(t, e, n = {}) {
    try {
      const i = this._wallet;
      if (!i)
        throw new Ce();
      const { signers: s, ...l } = n;
      try {
        return await i.send(t, s, l, e, this.publicKey);
      } catch (h) {
        throw new Pn(h?.message, h);
      }
    } catch (i) {
      throw this.emit("error", i), i;
    }
  }
  async signTransaction(t) {
    try {
      const e = this._wallet;
      if (!e)
        throw new Ce();
      try {
        return await e.signTransaction(t, this.publicKey);
      } catch (n) {
        throw new tn(n?.message, n);
      }
    } catch (e) {
      throw this.emit("error", e), e;
    }
  }
  async signAllTransactions(t) {
    try {
      const e = this._wallet;
      if (!e)
        throw new Ce();
      try {
        return await e.signAllTransactions(t, this.publicKey);
      } catch (n) {
        throw new tn(n?.message, n);
      }
    } catch (e) {
      throw this.emit("error", e), e;
    }
  }
  async signMessage(t) {
    try {
      const e = this._wallet;
      if (!e)
        throw new Ce();
      try {
        return await e.signMessage(t, this.publicKey);
      } catch (n) {
        throw new to(n?.message, n);
      }
    } catch (e) {
      throw this.emit("error", e), e;
    }
  }
}
function D0(r) {
  if (r.length >= 255)
    throw new TypeError("Alphabet too long");
  const t = new Uint8Array(256);
  for (let E = 0; E < t.length; E++)
    t[E] = 255;
  for (let E = 0; E < r.length; E++) {
    const v = r.charAt(E), T = v.charCodeAt(0);
    if (t[T] !== 255)
      throw new TypeError(v + " is ambiguous");
    t[T] = E;
  }
  const e = r.length, n = r.charAt(0), i = Math.log(e) / Math.log(256), s = Math.log(256) / Math.log(e);
  function l(E) {
    if (E instanceof Uint8Array || (ArrayBuffer.isView(E) ? E = new Uint8Array(E.buffer, E.byteOffset, E.byteLength) : Array.isArray(E) && (E = Uint8Array.from(E))), !(E instanceof Uint8Array))
      throw new TypeError("Expected Uint8Array");
    if (E.length === 0)
      return "";
    let v = 0, T = 0, P = 0;
    const O = E.length;
    for (; P !== O && E[P] === 0; )
      P++, v++;
    const j = (O - P) * s + 1 >>> 0, D = new Uint8Array(j);
    for (; P !== O; ) {
      let Q = E[P], W = 0;
      for (let V = j - 1; (Q !== 0 || W < T) && V !== -1; V--, W++)
        Q += 256 * D[V] >>> 0, D[V] = Q % e >>> 0, Q = Q / e >>> 0;
      if (Q !== 0)
        throw new Error("Non-zero carry");
      T = W, P++;
    }
    let N = j - T;
    for (; N !== j && D[N] === 0; )
      N++;
    let Z = n.repeat(v);
    for (; N < j; ++N)
      Z += r.charAt(D[N]);
    return Z;
  }
  function h(E) {
    if (typeof E != "string")
      throw new TypeError("Expected String");
    if (E.length === 0)
      return new Uint8Array();
    let v = 0, T = 0, P = 0;
    for (; E[v] === n; )
      T++, v++;
    const O = (E.length - v) * i + 1 >>> 0, j = new Uint8Array(O);
    for (; v < E.length; ) {
      const Q = E.charCodeAt(v);
      if (Q > 255)
        return;
      let W = t[Q];
      if (W === 255)
        return;
      let V = 0;
      for (let K = O - 1; (W !== 0 || V < P) && K !== -1; K--, V++)
        W += e * j[K] >>> 0, j[K] = W % 256 >>> 0, W = W / 256 >>> 0;
      if (W !== 0)
        throw new Error("Non-zero carry");
      P = V, v++;
    }
    let D = O - P;
    for (; D !== O && j[D] === 0; )
      D++;
    const N = new Uint8Array(T + (O - D));
    let Z = T;
    for (; D !== O; )
      N[Z++] = j[D++];
    return N;
  }
  function A(E) {
    const v = h(E);
    if (v)
      return v;
    throw new Error("Non-base" + e + " character");
  }
  return {
    encode: l,
    decodeUnsafe: h,
    decode: A
  };
}
var O0 = "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz";
const gr = D0(O0);
function U0(r) {
  const t = new Date(Number(r.issued_at / BigInt(1e6))), e = new Date(Number(r.expiration_time / BigInt(1e6)));
  let n = `${r.domain} wants you to sign in with your Solana account:
`;
  return n += `${r.address}

`, n += (r.statement || "") + `

`, n += `URI: ${r.uri}
`, n += `Version: ${r.version}
`, n += `Chain ID: ${r.chain_id || "solana"}
`, n += `Nonce: ${r.nonce}
`, n += `Issued At: ${t.toISOString()}
`, n += `Expiration Time: ${e.toISOString()}`, r.request_id && (n += `
Request ID: ${r.request_id}`), r.resources && (n += `
Resources:`, r.resources.forEach((i) => {
    n += `
- ${i}`;
  })), n;
}
const j0 = ({ IDL: r }) => {
  const t = r.Variant({
    IncludeUriInSeed: r.Null,
    DisablePrincipalToSolMapping: r.Null,
    DisableSolToPrincipalMapping: r.Null
  });
  r.Record({
    uri: r.Text,
    runtime_features: r.Opt(r.Vec(t)),
    domain: r.Text,
    statement: r.Opt(r.Text),
    scheme: r.Opt(r.Text),
    salt: r.Text,
    session_expires_in: r.Opt(r.Nat64),
    targets: r.Opt(r.Vec(r.Text)),
    chain_id: r.Opt(r.Text),
    sign_in_expires_in: r.Opt(r.Nat64)
  });
  const e = r.Vec(r.Nat8), n = r.Text, i = r.Variant({ Ok: n, Err: r.Text }), s = r.Variant({
    Ok: e,
    Err: r.Text
  }), l = r.Vec(r.Nat8), h = l, A = r.Nat64, E = r.Record({
    pubkey: l,
    targets: r.Opt(r.Vec(r.Principal)),
    expiration: A
  }), v = r.Record({
    signature: r.Vec(r.Nat8),
    delegation: E
  }), T = r.Variant({
    Ok: v,
    Err: r.Text
  }), P = r.Text, O = l, j = r.Record({
    user_canister_pubkey: O,
    expiration: A
  }), D = r.Variant({ Ok: j, Err: r.Text }), N = r.Record({
    uri: r.Text,
    issued_at: r.Nat64,
    domain: r.Text,
    statement: r.Text,
    version: r.Nat32,
    chain_id: r.Text,
    address: n,
    nonce: r.Text,
    expiration_time: r.Nat64
  }), Z = r.Variant({
    Ok: N,
    Err: r.Text
  });
  return r.Service({
    get_address: r.Func([e], [i], ["query"]),
    get_caller_address: r.Func([], [i], ["query"]),
    get_principal: r.Func([n], [s], ["query"]),
    siws_get_delegation: r.Func(
      [n, h, A],
      [T],
      ["query"]
    ),
    siws_login: r.Func(
      [P, n, h],
      [D],
      []
    ),
    siws_prepare_login: r.Func([n], [Z], [])
  });
}, z0 = new gt("TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA");
new gt("TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb");
new gt("ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL");
new gt("So11111111111111111111111111111111111111112");
new gt("9pan9bMn5HatX4EJdBwg9VgCa7Uz5HL8N1m5D3NdXejP");
const Eo = class Eo {
  constructor(t, e) {
    this.state = pt.Status.INIT, this.identity = null, this.principal = null, this.solanaAddress = null, this.tokenListCache = null, this.tokenPricesTimestamp = 0, this.handleSolanaConnect = (s) => {
      console.log(
        `[${this.walletName}] Solana wallet connected:`,
        s.toBase58()
      ), this.solanaAddress = s.toBase58();
    }, this.handleSolanaDisconnect = () => {
      console.log(`[${this.walletName}] Solana wallet disconnected.`), this.state !== pt.Status.DISCONNECTING && this.state !== pt.Status.DISCONNECTED && this.disconnect();
    }, this.handleSolanaError = (s) => {
      console.error(`[${this.walletName}] Solana wallet error:`, s), this.state = pt.Status.ERROR, this.disconnect();
    }, this.id = t.id, this.walletName = t.walletName, this.logo = t.logo, this.config = {
      ...e,
      ...t.config
    };
    const n = this.config.solanaNetwork || Qn.Mainnet, i = n === Qn.Mainnet ? "https://wiser-omniscient-thunder.solana-mainnet.quiknode.pro/c3a27d9cb72eb335a30e3407d576ef64e61b4e8d" : "https://api.devnet.solana.com";
    if (this.solanaConnection = new A0(i), this.id === "phantomSiws")
      this.solanaAdapter = new w0();
    else if (this.id === "solflareSiws")
      this.solanaAdapter = new T0({ network: n });
    else if (this.id === "backpackSiws")
      this.solanaAdapter = new R0();
    else
      throw new Error(
        `Unsupported SIWS adapter ID: ${this.id}. Expected 'phantomSiws', 'solflareSiws', or 'backpackSiws'.`
      );
    this.setupWalletListeners(), this.state = pt.Status.READY;
  }
  setupWalletListeners() {
    this.solanaAdapter.on("connect", this.handleSolanaConnect), this.solanaAdapter.on("disconnect", this.handleSolanaDisconnect), this.solanaAdapter.on("error", this.handleSolanaError);
  }
  removeWalletListeners() {
    this.solanaAdapter.off("connect", this.handleSolanaConnect), this.solanaAdapter.off("disconnect", this.handleSolanaDisconnect), this.solanaAdapter.off("error", this.handleSolanaError);
  }
  // --- Adapter.Interface Implementation ---
  async isAvailable() {
    return this.solanaAdapter.readyState === Ut.Installed || this.solanaAdapter.readyState === Ut.Loadable;
  }
  async isConnected() {
    return this.solanaAdapter.connected && this.identity !== null && !this.identity.getPrincipal().isAnonymous();
  }
  async connect() {
    if (this.state === pt.Status.CONNECTING || this.state === pt.Status.CONNECTED)
      return { owner: this.principal?.toText(), subaccount: null };
    if (this.state !== pt.Status.READY && this.state !== pt.Status.DISCONNECTED)
      throw new Error(`Cannot connect while in state: ${this.state}`);
    this.state = pt.Status.CONNECTING;
    try {
      if (this.solanaAdapter.connected || (console.log(`[${this.walletName}] Connecting Solana wallet...`), await this.solanaAdapter.connect()), !this.solanaAdapter.publicKey)
        throw new Error(
          "Solana wallet connected but public key not available."
        );
      this.solanaAddress = this.solanaAdapter.publicKey.toBase58(), console.log(
        `[${this.walletName}] Using Solana address:`,
        this.solanaAddress
      ), console.log(`[${this.walletName}] Starting SIWS flow...`);
      const t = await this.performSiwsLogin(this.solanaAddress);
      if (this.identity = t.identity, this.principal = t.principal, !this.principal || this.principal.isAnonymous())
        throw new Error(
          "SIWS flow completed but resulted in an anonymous principal."
        );
      return this.state = pt.Status.CONNECTED, console.log(
        `[${this.walletName}] SIWS Connect successful. Principal: ${this.principal.toText()}`
      ), { owner: this.principal?.toText(), subaccount: null };
    } catch (t) {
      throw console.error(`[${this.walletName}] Connect failed:`, t), this.state = pt.Status.ERROR, await this.disconnect(), t;
    }
  }
  async disconnect() {
    if (!(this.state === pt.Status.DISCONNECTING || this.state === pt.Status.DISCONNECTED)) {
      this.state, this.state = pt.Status.DISCONNECTING, console.log(`[${this.walletName}] Disconnecting...`);
      try {
        this.solanaAdapter.connected && (this.removeWalletListeners(), await this.solanaAdapter.disconnect(), this.setupWalletListeners());
      } catch (t) {
        console.warn(
          `[${this.walletName}] Error during Solana disconnect:`,
          t
        );
      } finally {
        this.identity = null, this.principal = null, this.solanaAddress = null, this.state = pt.Status.DISCONNECTED, console.log(`[${this.walletName}] Disconnected.`);
      }
    }
  }
  async getPrincipal() {
    if (!this.principal)
      throw new Error("Not connected or SIWS flow not completed.");
    return this.principal.toText();
  }
  // Standard implementation for getAccountId, can be overridden by subclasses if needed
  async getAccountId() {
    const t = await this.getPrincipal();
    if (!t)
      throw new Error("Principal not available to derive account ID");
    return Dr.fromPrincipal({
      principal: ke.fromText(t),
      subAccount: void 0
      // Default subaccount
    }).toHex();
  }
  async getSolanaAddress() {
    if (!this.solanaAddress)
      throw new Error("Not connected or Solana address not available.");
    return this.solanaAddress;
  }
  async getAddresses() {
    return {
      sol: this.solanaAddress,
      icp: {
        owner: this.principal?.toText(),
        subaccount: this.getAccountId()
      }
    };
  }
  createActor(t, e, n) {
    if ((n?.requiresSigning ?? !0) && !this.identity)
      throw new Error(
        "Cannot create signed actor: Not connected or SIWS flow not completed."
      );
    const s = Ye.createSync({
      host: this.config.hostUrl,
      identity: this.identity,
      verifyQuerySignatures: this.config.verifyQuerySignatures
    });
    return kn.createActor(e, { agent: s, canisterId: t });
  }
  // --- Balance Fetching Methods ---
  /**
   * Fetches token prices from Jupiter API
   * @returns A map of token addresses to their USD prices
   */
  async getTokenPrices() {
    try {
      const t = Date.now();
      if (this.tokenListCache && this.tokenPricesTimestamp > 0 && t - this.tokenPricesTimestamp < 2 * 60 * 1e3) {
        const l = {};
        for (const [h, A] of Object.entries(this.tokenListCache))
          A.price && (l[h] = A.price);
        return l;
      }
      const e = await this.getTokenList(), n = Object.keys(e), i = [];
      for (let l = 0; l < n.length; l += 50)
        i.push(n.slice(l, l + 50));
      const s = {};
      for (const l of i)
        try {
          const h = ["SOL", ...l].join(","), A = await fetch(`https://price.jup.ag/v4/price?ids=${h}`);
          if (!A.ok) {
            console.warn(`Failed to fetch Jupiter prices for chunk, status: ${A.status}`);
            continue;
          }
          const E = await A.json();
          if (E.data) {
            for (const [v, T] of Object.entries(E.data))
              if (T && typeof T == "object" && "price" in T && T.price !== null) {
                const P = Number(T.price);
                !isNaN(P) && P > 0 && (s[v] = P, this.tokenListCache && this.tokenListCache[v] && (this.tokenListCache[v].price = P));
              }
          }
        } catch (h) {
          console.warn("Error fetching prices for token chunk:", h);
        }
      return this.tokenPricesTimestamp = t, console.log(`[${this.walletName}] Loaded prices for ${Object.keys(s).length} tokens`), s;
    } catch (t) {
      return console.warn(`[${this.walletName}] Failed to fetch token prices:`, t), {};
    }
  }
  /**
   * Fetches token metadata from the Solana token list
   * @returns A record mapping token addresses to their metadata
   */
  async getTokenList() {
    if (this.tokenListCache)
      return this.tokenListCache;
    try {
      const t = await fetch("https://token.jup.ag/all");
      if (!t.ok)
        throw new Error(`Failed to fetch Jupiter token list: ${t.status}`);
      const e = await t.json(), n = {};
      for (const i of e)
        i.address && i.symbol && (n[i.address] = {
          symbol: i.symbol,
          name: i.name || i.symbol,
          logoURI: i.logoURI,
          decimals: i.decimals || 0,
          address: i.address
        });
      return this.tokenListCache = n, console.log(`[${this.walletName}] Loaded metadata for ${Object.keys(n).length} tokens`), n;
    } catch (t) {
      return console.warn(`[${this.walletName}] Failed to fetch token list:`, t), {};
    }
  }
  /**
   * Fetches the native SOL balance for the connected wallet with USD value.
   * @returns The balance in SOL (not lamports) and USD value.
   * @throws If the wallet is not connected or the public key is unavailable.
   */
  async getSolBalance() {
    if (!this.solanaAdapter.connected || !this.solanaAdapter.publicKey)
      throw new Error(
        "Solana wallet not connected or public key unavailable to fetch SOL balance."
      );
    const e = await this.solanaConnection.getBalance(
      this.solanaAdapter.publicKey
    ) / ka;
    try {
      const n = await fetch("https://price.jup.ag/v4/price?ids=SOL");
      if (!n.ok)
        throw new Error(`Failed to fetch SOL price, status: ${n.status}`);
      const i = await n.json();
      if (console.log("SOL price data:", JSON.stringify(i, null, 2)), i?.data?.SOL?.price) {
        const s = Number(i.data.SOL.price);
        if (!isNaN(s) && s > 0)
          return {
            amount: e,
            usdValue: e * s
          };
      }
    } catch (n) {
      console.warn(`[${this.walletName}] Failed to fetch SOL price:`, n);
    }
    return { amount: e };
  }
  /**
   * Fetches the balances of all SPL tokens owned by the connected wallet.
   * @returns An array of SplTokenBalance objects.
   * @throws If the wallet is not connected or the public key is unavailable.
   */
  async getSplTokenBalances() {
    if (!this.solanaAdapter.connected || !this.solanaAdapter.publicKey)
      throw new Error(
        "Solana wallet not connected or public key unavailable to fetch SPL token balances."
      );
    try {
      const t = await this.solanaConnection.getBalance(
        this.solanaAdapter.publicKey
      ), e = t / ka;
      let n;
      try {
        const v = await fetch("https://price.jup.ag/v4/price?ids=SOL");
        if (v.ok) {
          const T = await v.json();
          if (console.log("SOL price data:", JSON.stringify(T, null, 2)), T?.data?.SOL?.price) {
            const P = Number(T.data.SOL.price);
            !isNaN(P) && P > 0 && (n = e * P, console.log(`SOL price: $${P}, USD value: $${n}`));
          }
        }
      } catch (v) {
        console.error("Error fetching SOL price:", v);
      }
      const i = await this.solanaConnection.getTokenAccountsByOwner(
        this.solanaAdapter.publicKey,
        {
          programId: z0
        }
      ), s = [], l = [];
      for (const v of i.value)
        try {
          const T = await this.solanaConnection.getParsedAccountInfo(v.pubkey);
          if (!T.value) continue;
          const P = "parsed" in T.value.data ? T.value.data.parsed : null;
          if (!P || P.type !== "account") continue;
          const O = P.info;
          if (!O || !O.mint) continue;
          s.push(O.mint), l.push(v);
        } catch (T) {
          console.error(`Failed to pre-process token account ${v.pubkey.toBase58()}:`, T);
        }
      const h = await this.getTokenList(), A = {};
      if (s.length > 0)
        for (let v = 0; v < s.length; v += 50) {
          const T = s.slice(v, v + 50);
          try {
            const P = await fetch(`https://price.jup.ag/v4/price?ids=${T.join(",")}`);
            if (!P.ok) {
              console.warn(`Failed to fetch prices for token chunk, status: ${P.status}`);
              continue;
            }
            const O = await P.json();
            if (O.data) {
              for (const [j, D] of Object.entries(O.data))
                if (D && typeof D == "object" && "price" in D && D.price !== null) {
                  const N = Number(D.price);
                  !isNaN(N) && N > 0 && (A[j] = N);
                }
            }
          } catch (P) {
            console.warn("Error fetching prices for token chunk:", P);
          }
        }
      A.EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v || (A.EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v = 1), n === void 0 && e > 0 && (n = e * 150, console.log(`Using estimated SOL price: $150, USD value: $${n}`)), console.log(`Fetched ${Object.keys(A).length} token prices`);
      const E = [];
      E.push({
        mint: "SOL",
        // Use SOL as the mint address identifier
        amount: t.toString(),
        decimals: 9,
        // SOL has 9 decimals
        uiAmount: e,
        symbol: "SOL",
        name: "Solana",
        logo: "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/So11111111111111111111111111111111111111112/logo.png",
        // Official SOL logo
        usdValue: n
      });
      for (const { pubkey: v } of l)
        try {
          const T = await this.solanaConnection.getParsedAccountInfo(v);
          if (!T.value) continue;
          const P = "parsed" in T.value.data ? T.value.data.parsed : null;
          if (!P || P.type !== "account") continue;
          const O = P.info;
          if (!O || !O.mint || !O.tokenAmount) continue;
          const j = O.mint, D = O.tokenAmount.amount, N = O.tokenAmount.decimals || 0, Z = O.tokenAmount.uiAmount || Number(D) / Math.pow(10, N), Q = h[j];
          let W;
          const V = A[j];
          V && !isNaN(V) && V > 0 && (W = Z * V), j === "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v" && W === void 0 && (W = Z), E.push({
            mint: j,
            amount: D.toString(),
            decimals: N,
            uiAmount: Z,
            symbol: Q?.symbol,
            name: Q?.name,
            logo: Q?.logoURI,
            usdValue: W
          });
        } catch (T) {
          console.error(
            `[${this.walletName}] Failed to process token account ${v.toBase58()}:`,
            T
          );
        }
      return E;
    } catch (t) {
      return console.error(`[${this.walletName}] Error fetching SPL token balances:`, t), [];
    }
  }
  // --- SIWS Specific Methods ---
  createSiwsProviderActor(t) {
    if (console.log("Creating SIWS provider actor with canister ID:", this.config), !this.config.siwsProviderCanisterId)
      throw new Error("SIWS provider canister ID not configured.");
    const e = Ye.createSync({
      host: this.config.hostUrl,
      identity: t ?? new Vc(),
      // Use provided identity or anonymous
      verifyQuerySignatures: this.config.verifyQuerySignatures
    });
    return kn.createActor(j0, {
      agent: e,
      canisterId: this.config.siwsProviderCanisterId
    });
  }
  async _prepareLogin(t, e) {
    const n = await t.siws_prepare_login(e);
    if ("Err" in n)
      throw new Error(
        `SIWS Prepare Login failed: ${JSON.stringify(n.Err)}`
      );
    return n.Ok;
  }
  async _signSiwsMessage(t) {
    const e = U0(t), n = new TextEncoder().encode(e);
    if (!("signMessage" in this.solanaAdapter))
      throw new Error(
        `Connected Solana adapter '${this.walletName}' does not support signMessage.`
      );
    const s = await this.solanaAdapter.signMessage(n);
    try {
      if (typeof s == "object" && "signature" in s && s.signature instanceof Uint8Array)
        return gr.encode(s.signature);
      if (s instanceof Uint8Array)
        return gr.encode(s);
      if (s instanceof ArrayBuffer)
        return gr.encode(new Uint8Array(s));
      if (Array.isArray(s) || typeof s == "object" && "length" in s)
        return gr.encode(new Uint8Array(s));
      console.warn(
        `[${this.walletName}] Unexpected signature bytes type:`,
        typeof s,
        s
      );
      const l = Object.values(s).map(
        (h) => Number(h)
      );
      return gr.encode(Uint8Array.from(l));
    } catch (l) {
      throw console.error(`[${this.walletName}] Error encoding signature:`, l), new Error(
        `Failed to encode signature from ${this.walletName}: ${l.message}`
      );
    }
  }
  _generateSessionIdentity() {
    const t = Da.generate(), e = t.getPublicKey().toDer();
    return { sessionIdentity: t, sessionPublicKeyDer: e };
  }
  async _loginWithSiws(t, e, n, i) {
    const s = await t.siws_login(
      e,
      n,
      new Uint8Array(i)
    );
    if ("Err" in s)
      throw new Error(`SIWS Login failed: ${JSON.stringify(s.Err)}`);
    return s.Ok;
  }
  async _getSiwsDelegation(t, e, n, i) {
    const s = await t.siws_get_delegation(
      e,
      new Uint8Array(n),
      i
    );
    if ("Err" in s)
      throw new Error(
        `SIWS Get Delegation failed: ${JSON.stringify(s.Err)}`
      );
    return s.Ok;
  }
  _createDelegationIdentity(t, e, n) {
    const s = [
      {
        delegation: new Ra(
          t.delegation.pubkey.slice().buffer,
          t.delegation.expiration,
          t.delegation.targets.length > 0 ? t.delegation.targets[0] : void 0
        ),
        signature: t.signature.slice().buffer
      }
    ], l = La.fromDelegations(
      s,
      n
    ), h = Oa.fromDelegation(
      e,
      l
    );
    try {
      const E = h.getDelegation().delegations.map((v) => v.delegation.targets);
      console.log(
        `[${this.walletName}] DelegationIdentity created with targets:`,
        E
      );
    } catch (A) {
      console.warn(`[${this.walletName}] Could not log delegation targets:`, A);
    }
    return h;
  }
  async performSiwsLogin(t) {
    const e = this.createSiwsProviderActor(), n = await this._prepareLogin(e, t), i = await this._signSiwsMessage(n), { sessionIdentity: s, sessionPublicKeyDer: l } = this._generateSessionIdentity(), h = await this._loginWithSiws(
      e,
      i,
      t,
      l
    ), A = await this._getSiwsDelegation(
      e,
      t,
      l,
      h.expiration
    ), E = this._createDelegationIdentity(
      A,
      s,
      h.user_canister_pubkey.slice().buffer
      // Ensure ArrayBuffer
    ), v = E.getPrincipal();
    return { identity: E, principal: v };
  }
};
Eo.supportedChains = [pt.Chain.ICP, pt.Chain.SOL];
let Cr = Eo;
const P0 = "data:image/svg+xml,%3csvg%20width='1200'%20height='1200'%20viewBox='0%200%201200%201200'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cg%20clip-path='url(%23clip0_2800_140397)'%3e%3crect%20width='1200'%20height='1200'%20fill='%239886E5'/%3e%3cpath%20fill-rule='evenodd'%20clip-rule='evenodd'%20d='M516.641%20777.604C466.226%20854.856%20381.747%20952.618%20269.335%20952.618C216.194%20952.618%20165.098%20930.741%20165.098%20835.714C165.098%20593.704%20495.521%20219.066%20802.1%20219.066C976.509%20219.066%201046%20340.071%201046%20477.484C1046%20653.865%20931.544%20855.54%20817.77%20855.54C781.661%20855.54%20763.948%20835.714%20763.948%20804.267C763.948%20796.063%20765.311%20787.175%20768.036%20777.604C729.202%20843.918%20654.261%20905.446%20584.089%20905.446C532.992%20905.446%20507.103%20873.315%20507.103%20828.194C507.103%20811.787%20510.51%20794.696%20516.641%20777.604ZM930.877%20472.714C930.877%20512.755%20907.253%20532.776%20880.826%20532.776C853.998%20532.776%20830.775%20512.755%20830.775%20472.714C830.775%20432.673%20853.998%20412.653%20880.826%20412.653C907.253%20412.653%20930.877%20432.673%20930.877%20472.714ZM780.73%20472.714C780.73%20512.755%20757.105%20532.776%20730.678%20532.776C703.851%20532.776%20680.627%20512.755%20680.627%20472.714C680.627%20432.673%20703.851%20412.653%20730.678%20412.653C757.105%20412.653%20780.73%20432.673%20780.73%20472.714Z'%20fill='%23FFFDF8'/%3e%3c/g%3e%3cdefs%3e%3cclipPath%20id='clip0_2800_140397'%3e%3crect%20width='1200'%20height='1200'%20fill='white'/%3e%3c/clipPath%3e%3c/defs%3e%3c/svg%3e", F0 = "data:image/svg+xml,%3csvg%20width='290'%20height='290'%20viewBox='0%200%20290%20290'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cg%20clip-path='url(%23clip0_146_299)'%3e%3cpath%20d='M63.2951%201H226.705C261.11%201%20289%2028.8905%20289%2063.2951V226.705C289%20261.11%20261.11%20289%20226.705%20289H63.2951C28.8905%20289%201%20261.11%201%20226.705V63.2951C1%2028.8905%2028.8905%201%2063.2951%201Z'%20fill='%23FFEF46'%20stroke='%23EEDA0F'%20stroke-width='2'/%3e%3cpath%20d='M140.548%20153.231L154.832%20139.432L181.462%20148.147C198.893%20153.958%20207.609%20164.61%20207.609%20179.62C207.609%20190.999%20203.251%20198.504%20194.536%20208.188L191.873%20211.093L192.841%20204.314C196.714%20179.62%20189.452%20168.968%20165.484%20161.22L140.548%20153.231ZM104.717%2068.739L177.347%2092.9488L161.61%20107.959L123.843%2095.3698C110.77%2091.012%20106.412%2083.9911%20104.717%2069.2232V68.739ZM100.359%20191.725L116.822%20175.988L147.811%20186.157C164.031%20191.483%20169.599%20198.504%20167.905%20216.177L100.359%20191.725ZM79.539%20121.516C79.539%20116.917%2081.9599%20112.559%2086.0756%20108.927C90.4334%20115.222%2097.9384%20120.79%20109.801%20124.664L135.464%20133.137L121.18%20146.937L96.0016%20138.705C84.3809%20134.832%2079.539%20129.021%2079.539%20121.516ZM155.558%20248.618C208.819%20213.272%20237.387%20189.304%20237.387%20159.768C237.387%20140.158%20225.766%20129.263%20200.104%20120.79L180.736%20114.253L233.756%2063.4128L223.103%2052.0342L207.367%2065.8337L133.043%2041.3818C110.043%2048.8869%2080.9916%2070.9178%2080.9916%2092.9487C80.9916%2095.3697%2081.2337%2097.7907%2081.96%20100.454C62.8342%20111.348%2055.0871%20121.516%2055.0871%20134.105C55.0871%20145.968%2061.3816%20157.831%2081.4758%20164.368L97.4542%20169.694L42.2559%20222.713L52.9082%20234.092L70.0972%20218.356L155.558%20248.618Z'%20fill='%2302050A'/%3e%3c/g%3e%3cdefs%3e%3cclipPath%20id='clip0_146_299'%3e%3crect%20width='290'%20height='290'%20fill='white'/%3e%3c/clipPath%3e%3c/defs%3e%3c/svg%3e", Q0 = "data:image/png;base64,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", _0 = {
  phantomSiws: {
    id: "phantomSiws",
    walletName: "Phantom",
    logo: P0,
    adapter: Cr,
    // Use the unified SIWS adapter
    config: {
      enabled: !1,
      // Disabled by default, user must enable and configure
      solanaNetwork: Qn.Mainnet
      // Default to mainnet
    }
  },
  solflareSiws: {
    id: "solflareSiws",
    walletName: "Solflare",
    logo: F0,
    adapter: Cr,
    // Use the unified SIWS adapter
    config: {
      enabled: !1,
      // Disabled by default, user must enable and configure
      solanaNetwork: Qn.Mainnet
      // Default to mainnet
    }
  },
  backpackSiws: {
    id: "backpackSiws",
    walletName: "Backpack",
    logo: Q0,
    adapter: Cr,
    config: {
      enabled: !1,
      solanaNetwork: Qn.Mainnet
    }
  }
}, Ta = {
  // Global defaults
  hostUrl: "https://icp0.io",
  delegationTimeout: BigInt(24 * 60 * 60 * 1e3 * 1e3 * 1e3),
  // 1 day
  delegationTargets: [],
  derivationOrigin: typeof window < "u" ? window.location.origin : "",
  // Default to browser origin
  dfxNetwork: "ic",
  fetchRootKeys: !1,
  verifyQuerySignatures: !0,
  localStorageKey: "pnpConnectedWallet",
  siwsProviderCanisterId: void 0,
  // Default to undefined
  adapters: {
    ...Gu,
    ..._0
    // Merge SolAdapters into the defaults
  }
};
function W0(r = {}) {
  const t = { ...Ta.adapters };
  if (r.adapters)
    for (const n in r.adapters) {
      const i = r.adapters[n];
      if (!i) continue;
      const s = t[n];
      if (!s) {
        console.warn(`[PNP Config] Adapter ID '${n}' provided by user not found in defaults. Skipping merge for this adapter.`);
        continue;
      }
      t[n] = {
        // Start with default Adapter.Info properties (id, logo, name, adapter constructor)
        ...s,
        // Override top-level Adapter.Info properties from user (like enabled)
        // Use nullish coalescing to ensure user's value is taken if provided
        id: i.id ?? s.id,
        logo: i.logo ?? s.logo,
        walletName: i.walletName ?? s.walletName,
        adapter: i.adapter ?? s.adapter,
        enabled: i.enabled ?? s.enabled,
        // Deep merge the 'config' object explicitly
        config: {
          ...s.config,
          // Start with default config
          ...i.config
          // Override with user's partial config
        }
      };
    }
  const e = {
    ...Ta,
    ...r,
    adapters: t
    // Use the adapters map with refined merging
  };
  return t.ii && !r.adapters?.ii?.config?.identityProvider && (t.ii.config.identityProvider = e.dfxNetwork === "local" ? "http://rdmx6-jaaaa-aaaaa-aaadq-cai.localhost:4943" : "https://identity.ic0.app"), t.ii && !t.ii.config.derivationOrigin && (t.ii.config.derivationOrigin = e.derivationOrigin), e;
}
class q0 {
  constructor(t = {}) {
    this.account = null, this.activeWallet = null, this.provider = null, this.actorCache = /* @__PURE__ */ new Map(), this.isConnecting = !1, this.config = W0(t), this.adapters = this.config.adapters || {};
  }
  getAdapterConfig(t) {
    return this.config.adapters?.[t];
  }
  mergeAdapterConfig(t) {
    const e = this.getAdapterConfig(t);
    return {
      ...this.config,
      ...e
    };
  }
  async connect(t) {
    if (this.isConnecting) return null;
    this.isConnecting = !0;
    let e = null;
    try {
      const n = t || localStorage.getItem(this.config.localStorageKey);
      if (!n) return null;
      localStorage.setItem(this.config.localStorageKey, n);
      const i = this.adapters[n];
      if (!i)
        throw new Error(
          `Wallet ${n} not found in provided adapters`
        );
      const s = this.mergeAdapterConfig(n);
      e = new i.adapter(i, this.config);
      const l = await e.connect();
      return this.account = l, this.activeWallet = i, this.provider = e, l;
    } catch (n) {
      if (console.warn(
        `[PNP] Connection failed for ${t || "stored wallet"}:`,
        n
      ), e)
        try {
          await e.disconnect();
        } catch (i) {
          console.warn("[PNP] Disconnect error:", i);
        }
      return this.account = null, this.provider = null, this.activeWallet = null, localStorage.removeItem(this.config.localStorageKey), null;
    } finally {
      this.isConnecting = !1;
    }
  }
  getAdapter(t) {
    const e = this.adapters[t];
    if (!e)
      throw new Error(`Wallet ${t} not found in provided adapters`);
    return this.mergeAdapterConfig(t), new e.adapter(e, this.config);
  }
  async disconnect() {
    this.isConnecting = !1;
    try {
      this.provider && await this.provider.disconnect(), this.account = null, this.provider = null, this.activeWallet = null, this.actorCache.clear(), localStorage.removeItem(this.config.localStorageKey);
    } catch (t) {
      console.warn("[PNP] Disconnect error:", t), this.account = null, this.provider = null, this.activeWallet = null, this.actorCache.clear(), localStorage.removeItem(this.config.localStorageKey);
    } finally {
      this.isConnecting = !1;
    }
  }
  getActor(t, e, n) {
    const { anon: i = !1, requiresSigning: s = !0 } = n || {};
    if (i)
      return this.createAnonymousActor(t, e);
    if (!this.provider)
      throw new Error(
        "Cannot create signed actor. No wallet provider connected."
      );
    return this.provider.createActor(t, e, { requiresSigning: s });
  }
  createAnonymousActor(t, e) {
    const n = `anon-${t}`, i = this.actorCache.get(n);
    if (i) return i;
    const s = kn.createActor(e, {
      agent: Ye.createSync({
        host: this.config.hostUrl,
        verifyQuerySignatures: this.config.verifyQuerySignatures
      }),
      canisterId: t
    });
    return this.actorCache.set(n, s), s;
  }
  isWalletConnected() {
    return this.activeWallet !== null && this.provider !== null && this.account !== null;
  }
  getEnabledWallets() {
    return Object.values(this.adapters).filter((t) => this.config.adapters[t.id]?.enabled !== !1);
  }
}
const eg = (r = {}) => new q0(r);
export {
  pc as E,
  gt as P,
  nl as S,
  Bn as T,
  xc as V,
  il as a,
  rl as b,
  W0 as c,
  q0 as d,
  eg as e,
  Rr as g
};
