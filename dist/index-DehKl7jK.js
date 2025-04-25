var Jc = Object.defineProperty;
var Kc = (r, t, e) => t in r ? Jc(r, t, { enumerable: !0, configurable: !0, writable: !0, value: e }) : r[t] = e;
var de = (r, t, e) => Kc(r, typeof t != "symbol" ? t + "" : t, e);
import { Actor as gn, HttpAgent as _e, Cbor as Vc, Expiry as Xc, SubmitRequestType as $c, compare as tu, requestIdOf as eu, Certificate as Uo, LookupStatus as Xi, lookupResultToBuffer as nu, IC_ROOT_KEY as ru, AnonymousIdentity as iu } from "@dfinity/agent";
import { AuthClient as su } from "@dfinity/auth-client";
import { Principal as pe } from "@dfinity/principal";
import { asciiStringToByteArray as ou, arrayOfNumberToUint8Array as au, bigEndianCrc32 as cu, uint8ArrayToHexString as uu } from "@dfinity/utils";
import { DelegationChain as ja, Delegation as za, Ed25519KeyIdentity as Pa, DelegationIdentity as Fa } from "@dfinity/identity";
import { lebDecode as lu, PipeArrayBuffer as hu } from "@dfinity/candid";
function Ei(r) {
  return r && r.__esModule && Object.prototype.hasOwnProperty.call(r, "default") ? r.default : r;
}
function Qa(r) {
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
var $i = {}, wr = {}, jo;
function fu() {
  if (jo) return wr;
  jo = 1, wr.byteLength = h, wr.toByteArray = E, wr.fromByteArray = P;
  for (var r = [], t = [], e = typeof Uint8Array < "u" ? Uint8Array : Array, n = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", i = 0, s = n.length; i < s; ++i)
    r[i] = n[i], t[n.charCodeAt(i)] = i;
  t[45] = 62, t[95] = 63;
  function u(U) {
    var F = U.length;
    if (F % 4 > 0)
      throw new Error("Invalid string. Length must be a multiple of 4");
    var O = U.indexOf("=");
    O === -1 && (O = F);
    var L = O === F ? 0 : 4 - O % 4;
    return [O, L];
  }
  function h(U) {
    var F = u(U), O = F[0], L = F[1];
    return (O + L) * 3 / 4 - L;
  }
  function A(U, F, O) {
    return (F + O) * 3 / 4 - O;
  }
  function E(U) {
    var F, O = u(U), L = O[0], Y = O[1], Q = new e(A(U, L, Y)), q = 0, K = Y > 0 ? L - 4 : L, V;
    for (V = 0; V < K; V += 4)
      F = t[U.charCodeAt(V)] << 18 | t[U.charCodeAt(V + 1)] << 12 | t[U.charCodeAt(V + 2)] << 6 | t[U.charCodeAt(V + 3)], Q[q++] = F >> 16 & 255, Q[q++] = F >> 8 & 255, Q[q++] = F & 255;
    return Y === 2 && (F = t[U.charCodeAt(V)] << 2 | t[U.charCodeAt(V + 1)] >> 4, Q[q++] = F & 255), Y === 1 && (F = t[U.charCodeAt(V)] << 10 | t[U.charCodeAt(V + 1)] << 4 | t[U.charCodeAt(V + 2)] >> 2, Q[q++] = F >> 8 & 255, Q[q++] = F & 255), Q;
  }
  function S(U) {
    return r[U >> 18 & 63] + r[U >> 12 & 63] + r[U >> 6 & 63] + r[U & 63];
  }
  function N(U, F, O) {
    for (var L, Y = [], Q = F; Q < O; Q += 3)
      L = (U[Q] << 16 & 16711680) + (U[Q + 1] << 8 & 65280) + (U[Q + 2] & 255), Y.push(S(L));
    return Y.join("");
  }
  function P(U) {
    for (var F, O = U.length, L = O % 3, Y = [], Q = 16383, q = 0, K = O - L; q < K; q += Q)
      Y.push(N(U, q, q + Q > K ? K : q + Q));
    return L === 1 ? (F = U[O - 1], Y.push(
      r[F >> 2] + r[F << 4 & 63] + "=="
    )) : L === 2 && (F = (U[O - 2] << 8) + U[O - 1], Y.push(
      r[F >> 10] + r[F >> 4 & 63] + r[F << 2 & 63] + "="
    )), Y.join("");
  }
  return wr;
}
var Hr = {};
/*! ieee754. BSD-3-Clause License. Feross Aboukhadijeh <https://feross.org/opensource> */
var zo;
function du() {
  return zo || (zo = 1, Hr.read = function(r, t, e, n, i) {
    var s, u, h = i * 8 - n - 1, A = (1 << h) - 1, E = A >> 1, S = -7, N = e ? i - 1 : 0, P = e ? -1 : 1, U = r[t + N];
    for (N += P, s = U & (1 << -S) - 1, U >>= -S, S += h; S > 0; s = s * 256 + r[t + N], N += P, S -= 8)
      ;
    for (u = s & (1 << -S) - 1, s >>= -S, S += n; S > 0; u = u * 256 + r[t + N], N += P, S -= 8)
      ;
    if (s === 0)
      s = 1 - E;
    else {
      if (s === A)
        return u ? NaN : (U ? -1 : 1) * (1 / 0);
      u = u + Math.pow(2, n), s = s - E;
    }
    return (U ? -1 : 1) * u * Math.pow(2, s - n);
  }, Hr.write = function(r, t, e, n, i, s) {
    var u, h, A, E = s * 8 - i - 1, S = (1 << E) - 1, N = S >> 1, P = i === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0, U = n ? 0 : s - 1, F = n ? 1 : -1, O = t < 0 || t === 0 && 1 / t < 0 ? 1 : 0;
    for (t = Math.abs(t), isNaN(t) || t === 1 / 0 ? (h = isNaN(t) ? 1 : 0, u = S) : (u = Math.floor(Math.log(t) / Math.LN2), t * (A = Math.pow(2, -u)) < 1 && (u--, A *= 2), u + N >= 1 ? t += P / A : t += P * Math.pow(2, 1 - N), t * A >= 2 && (u++, A /= 2), u + N >= S ? (h = 0, u = S) : u + N >= 1 ? (h = (t * A - 1) * Math.pow(2, i), u = u + N) : (h = t * Math.pow(2, N - 1) * Math.pow(2, i), u = 0)); i >= 8; r[e + U] = h & 255, U += F, h /= 256, i -= 8)
      ;
    for (u = u << i | h, E += i; E > 0; r[e + U] = u & 255, U += F, u /= 256, E -= 8)
      ;
    r[e + U - F] |= O * 128;
  }), Hr;
}
/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <https://feross.org>
 * @license  MIT
 */
var Po;
function Ii() {
  return Po || (Po = 1, function(r) {
    const t = fu(), e = du(), n = typeof Symbol == "function" && typeof Symbol.for == "function" ? Symbol.for("nodejs.util.inspect.custom") : null;
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
    function u(a) {
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
        return N(a);
      }
      return A(a, o, c);
    }
    h.poolSize = 8192;
    function A(a, o, c) {
      if (typeof a == "string")
        return P(a, o);
      if (ArrayBuffer.isView(a))
        return F(a);
      if (a == null)
        throw new TypeError(
          "The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof a
        );
      if (jt(a, ArrayBuffer) || a && jt(a.buffer, ArrayBuffer) || typeof SharedArrayBuffer < "u" && (jt(a, SharedArrayBuffer) || a && jt(a.buffer, SharedArrayBuffer)))
        return O(a, o, c);
      if (typeof a == "number")
        throw new TypeError(
          'The "value" argument must not be of type number. Received type number'
        );
      const y = a.valueOf && a.valueOf();
      if (y != null && y !== a)
        return h.from(y, o, c);
      const k = L(a);
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
    function S(a, o, c) {
      return E(a), a <= 0 ? u(a) : o !== void 0 ? typeof c == "string" ? u(a).fill(o, c) : u(a).fill(o) : u(a);
    }
    h.alloc = function(a, o, c) {
      return S(a, o, c);
    };
    function N(a) {
      return E(a), u(a < 0 ? 0 : Y(a) | 0);
    }
    h.allocUnsafe = function(a) {
      return N(a);
    }, h.allocUnsafeSlow = function(a) {
      return N(a);
    };
    function P(a, o) {
      if ((typeof o != "string" || o === "") && (o = "utf8"), !h.isEncoding(o))
        throw new TypeError("Unknown encoding: " + o);
      const c = q(a, o) | 0;
      let y = u(c);
      const k = y.write(a, o);
      return k !== c && (y = y.slice(0, k)), y;
    }
    function U(a) {
      const o = a.length < 0 ? 0 : Y(a.length) | 0, c = u(o);
      for (let y = 0; y < o; y += 1)
        c[y] = a[y] & 255;
      return c;
    }
    function F(a) {
      if (jt(a, Uint8Array)) {
        const o = new Uint8Array(a);
        return O(o.buffer, o.byteOffset, o.byteLength);
      }
      return U(a);
    }
    function O(a, o, c) {
      if (o < 0 || a.byteLength < o)
        throw new RangeError('"offset" is outside of buffer bounds');
      if (a.byteLength < o + (c || 0))
        throw new RangeError('"length" is outside of buffer bounds');
      let y;
      return o === void 0 && c === void 0 ? y = new Uint8Array(a) : c === void 0 ? y = new Uint8Array(a, o) : y = new Uint8Array(a, o, c), Object.setPrototypeOf(y, h.prototype), y;
    }
    function L(a) {
      if (h.isBuffer(a)) {
        const o = Y(a.length) | 0, c = u(o);
        return c.length === 0 || a.copy(c, 0, 0, o), c;
      }
      if (a.length !== void 0)
        return typeof a.length != "number" || Rt(a.length) ? u(0) : U(a);
      if (a.type === "Buffer" && Array.isArray(a.data))
        return U(a.data);
    }
    function Y(a) {
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
      for (let j = 0, H = Math.min(y, k); j < H; ++j)
        if (o[j] !== c[j]) {
          y = o[j], k = c[j];
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
      let j = 0;
      for (y = 0; y < o.length; ++y) {
        let H = o[y];
        if (jt(H, Uint8Array))
          j + H.length > k.length ? (h.isBuffer(H) || (H = h.from(H)), H.copy(k, j)) : Uint8Array.prototype.set.call(
            k,
            H,
            j
          );
        else if (h.isBuffer(H))
          H.copy(k, j);
        else
          throw new TypeError('"list" argument must be an Array of Buffers');
        j += H.length;
      }
      return k;
    };
    function q(a, o) {
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
    h.byteLength = q;
    function K(a, o, c) {
      let y = !1;
      if ((o === void 0 || o < 0) && (o = 0), o > this.length || ((c === void 0 || c > this.length) && (c = this.length), c <= 0) || (c >>>= 0, o >>>= 0, c <= o))
        return "";
      for (a || (a = "utf8"); ; )
        switch (a) {
          case "hex":
            return B(this, o, c);
          case "utf8":
          case "utf-8":
            return l(this, o, c);
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
            return z(this, o, c);
          default:
            if (y) throw new TypeError("Unknown encoding: " + a);
            a = (a + "").toLowerCase(), y = !0;
        }
    }
    h.prototype._isBuffer = !0;
    function V(a, o, c) {
      const y = a[o];
      a[o] = a[c], a[c] = y;
    }
    h.prototype.swap16 = function() {
      const o = this.length;
      if (o % 2 !== 0)
        throw new RangeError("Buffer size must be a multiple of 16-bits");
      for (let c = 0; c < o; c += 2)
        V(this, c, c + 1);
      return this;
    }, h.prototype.swap32 = function() {
      const o = this.length;
      if (o % 4 !== 0)
        throw new RangeError("Buffer size must be a multiple of 32-bits");
      for (let c = 0; c < o; c += 4)
        V(this, c, c + 3), V(this, c + 1, c + 2);
      return this;
    }, h.prototype.swap64 = function() {
      const o = this.length;
      if (o % 8 !== 0)
        throw new RangeError("Buffer size must be a multiple of 64-bits");
      for (let c = 0; c < o; c += 8)
        V(this, c, c + 7), V(this, c + 1, c + 6), V(this, c + 2, c + 5), V(this, c + 3, c + 4);
      return this;
    }, h.prototype.toString = function() {
      const o = this.length;
      return o === 0 ? "" : arguments.length === 0 ? l(this, 0, o) : K.apply(this, arguments);
    }, h.prototype.toLocaleString = h.prototype.toString, h.prototype.equals = function(o) {
      if (!h.isBuffer(o)) throw new TypeError("Argument must be a Buffer");
      return this === o ? !0 : h.compare(this, o) === 0;
    }, h.prototype.inspect = function() {
      let o = "";
      const c = r.INSPECT_MAX_BYTES;
      return o = this.toString("hex", 0, c).replace(/(.{2})/g, "$1 ").trim(), this.length > c && (o += " ... "), "<Buffer " + o + ">";
    }, n && (h.prototype[n] = h.prototype.inspect), h.prototype.compare = function(o, c, y, k, j) {
      if (jt(o, Uint8Array) && (o = h.from(o, o.offset, o.byteLength)), !h.isBuffer(o))
        throw new TypeError(
          'The "target" argument must be one of type Buffer or Uint8Array. Received type ' + typeof o
        );
      if (c === void 0 && (c = 0), y === void 0 && (y = o ? o.length : 0), k === void 0 && (k = 0), j === void 0 && (j = this.length), c < 0 || y > o.length || k < 0 || j > this.length)
        throw new RangeError("out of range index");
      if (k >= j && c >= y)
        return 0;
      if (k >= j)
        return -1;
      if (c >= y)
        return 1;
      if (c >>>= 0, y >>>= 0, k >>>= 0, j >>>= 0, this === o) return 0;
      let H = j - k, ut = y - c;
      const lt = Math.min(H, ut), at = this.slice(k, j), yt = o.slice(c, y);
      for (let ct = 0; ct < lt; ++ct)
        if (at[ct] !== yt[ct]) {
          H = at[ct], ut = yt[ct];
          break;
        }
      return H < ut ? -1 : ut < H ? 1 : 0;
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
      let j = 1, H = a.length, ut = o.length;
      if (y !== void 0 && (y = String(y).toLowerCase(), y === "ucs2" || y === "ucs-2" || y === "utf16le" || y === "utf-16le")) {
        if (a.length < 2 || o.length < 2)
          return -1;
        j = 2, H /= 2, ut /= 2, c /= 2;
      }
      function lt(yt, ct) {
        return j === 1 ? yt[ct] : yt.readUInt16BE(ct * j);
      }
      let at;
      if (k) {
        let yt = -1;
        for (at = c; at < H; at++)
          if (lt(a, at) === lt(o, yt === -1 ? 0 : at - yt)) {
            if (yt === -1 && (yt = at), at - yt + 1 === ut) return yt * j;
          } else
            yt !== -1 && (at -= at - yt), yt = -1;
      } else
        for (c + ut > H && (c = H - ut), at = c; at >= 0; at--) {
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
      const j = o.length;
      y > j / 2 && (y = j / 2);
      let H;
      for (H = 0; H < y; ++H) {
        const ut = parseInt(o.substr(H * 2, 2), 16);
        if (Rt(ut)) return H;
        a[c + H] = ut;
      }
      return H;
    }
    function v(a, o, c, y) {
      return Ct(Bt(o, a.length - c), a, c, y);
    }
    function x(a, o, c, y) {
      return Ct(Ot(o), a, c, y);
    }
    function D(a, o, c, y) {
      return Ct(Lt(o), a, c, y);
    }
    function R(a, o, c, y) {
      return Ct(wn(o, a.length - c), a, c, y);
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
      const j = this.length - c;
      if ((y === void 0 || y > j) && (y = j), o.length > 0 && (y < 0 || c < 0) || c > this.length)
        throw new RangeError("Attempt to write outside buffer bounds");
      k || (k = "utf8");
      let H = !1;
      for (; ; )
        switch (k) {
          case "hex":
            return C(this, o, c, y);
          case "utf8":
          case "utf-8":
            return v(this, o, c, y);
          case "ascii":
          case "latin1":
          case "binary":
            return x(this, o, c, y);
          case "base64":
            return D(this, o, c, y);
          case "ucs2":
          case "ucs-2":
          case "utf16le":
          case "utf-16le":
            return R(this, o, c, y);
          default:
            if (H) throw new TypeError("Unknown encoding: " + k);
            k = ("" + k).toLowerCase(), H = !0;
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
    function l(a, o, c) {
      c = Math.min(a.length, c);
      const y = [];
      let k = o;
      for (; k < c; ) {
        const j = a[k];
        let H = null, ut = j > 239 ? 4 : j > 223 ? 3 : j > 191 ? 2 : 1;
        if (k + ut <= c) {
          let lt, at, yt, ct;
          switch (ut) {
            case 1:
              j < 128 && (H = j);
              break;
            case 2:
              lt = a[k + 1], (lt & 192) === 128 && (ct = (j & 31) << 6 | lt & 63, ct > 127 && (H = ct));
              break;
            case 3:
              lt = a[k + 1], at = a[k + 2], (lt & 192) === 128 && (at & 192) === 128 && (ct = (j & 15) << 12 | (lt & 63) << 6 | at & 63, ct > 2047 && (ct < 55296 || ct > 57343) && (H = ct));
              break;
            case 4:
              lt = a[k + 1], at = a[k + 2], yt = a[k + 3], (lt & 192) === 128 && (at & 192) === 128 && (yt & 192) === 128 && (ct = (j & 15) << 18 | (lt & 63) << 12 | (at & 63) << 6 | yt & 63, ct > 65535 && ct < 1114112 && (H = ct));
          }
        }
        H === null ? (H = 65533, ut = 1) : H > 65535 && (H -= 65536, y.push(H >>> 10 & 1023 | 55296), H = 56320 | H & 1023), y.push(H), k += ut;
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
      for (let j = o; j < c; ++j)
        k += zt[a[j]];
      return k;
    }
    function z(a, o, c) {
      const y = a.slice(o, c);
      let k = "";
      for (let j = 0; j < y.length - 1; j += 2)
        k += String.fromCharCode(y[j] + y[j + 1] * 256);
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
      let k = this[o], j = 1, H = 0;
      for (; ++H < c && (j *= 256); )
        k += this[o + H] * j;
      return k;
    }, h.prototype.readUintBE = h.prototype.readUIntBE = function(o, c, y) {
      o = o >>> 0, c = c >>> 0, y || I(o, c, this.length);
      let k = this[o + --c], j = 1;
      for (; c > 0 && (j *= 256); )
        k += this[o + --c] * j;
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
      const k = c + this[++o] * 2 ** 8 + this[++o] * 2 ** 16 + this[++o] * 2 ** 24, j = this[++o] + this[++o] * 2 ** 8 + this[++o] * 2 ** 16 + y * 2 ** 24;
      return BigInt(k) + (BigInt(j) << BigInt(32));
    }), h.prototype.readBigUInt64BE = Jt(function(o) {
      o = o >>> 0, Et(o, "offset");
      const c = this[o], y = this[o + 7];
      (c === void 0 || y === void 0) && ht(o, this.length - 8);
      const k = c * 2 ** 24 + this[++o] * 2 ** 16 + this[++o] * 2 ** 8 + this[++o], j = this[++o] * 2 ** 24 + this[++o] * 2 ** 16 + this[++o] * 2 ** 8 + y;
      return (BigInt(k) << BigInt(32)) + BigInt(j);
    }), h.prototype.readIntLE = function(o, c, y) {
      o = o >>> 0, c = c >>> 0, y || I(o, c, this.length);
      let k = this[o], j = 1, H = 0;
      for (; ++H < c && (j *= 256); )
        k += this[o + H] * j;
      return j *= 128, k >= j && (k -= Math.pow(2, 8 * c)), k;
    }, h.prototype.readIntBE = function(o, c, y) {
      o = o >>> 0, c = c >>> 0, y || I(o, c, this.length);
      let k = c, j = 1, H = this[o + --k];
      for (; k > 0 && (j *= 256); )
        H += this[o + --k] * j;
      return j *= 128, H >= j && (H -= Math.pow(2, 8 * c)), H;
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
    function f(a, o, c, y, k, j) {
      if (!h.isBuffer(a)) throw new TypeError('"buffer" argument must be a Buffer instance');
      if (o > k || o < j) throw new RangeError('"value" argument is out of bounds');
      if (c + y > a.length) throw new RangeError("Index out of range");
    }
    h.prototype.writeUintLE = h.prototype.writeUIntLE = function(o, c, y, k) {
      if (o = +o, c = c >>> 0, y = y >>> 0, !k) {
        const ut = Math.pow(2, 8 * y) - 1;
        f(this, o, c, y, ut, 0);
      }
      let j = 1, H = 0;
      for (this[c] = o & 255; ++H < y && (j *= 256); )
        this[c + H] = o / j & 255;
      return c + y;
    }, h.prototype.writeUintBE = h.prototype.writeUIntBE = function(o, c, y, k) {
      if (o = +o, c = c >>> 0, y = y >>> 0, !k) {
        const ut = Math.pow(2, 8 * y) - 1;
        f(this, o, c, y, ut, 0);
      }
      let j = y - 1, H = 1;
      for (this[c + j] = o & 255; --j >= 0 && (H *= 256); )
        this[c + j] = o / H & 255;
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
      let j = Number(o & BigInt(4294967295));
      a[c++] = j, j = j >> 8, a[c++] = j, j = j >> 8, a[c++] = j, j = j >> 8, a[c++] = j;
      let H = Number(o >> BigInt(32) & BigInt(4294967295));
      return a[c++] = H, H = H >> 8, a[c++] = H, H = H >> 8, a[c++] = H, H = H >> 8, a[c++] = H, c;
    }
    function M(a, o, c, y, k) {
      bt(o, y, k, a, c, 7);
      let j = Number(o & BigInt(4294967295));
      a[c + 7] = j, j = j >> 8, a[c + 6] = j, j = j >> 8, a[c + 5] = j, j = j >> 8, a[c + 4] = j;
      let H = Number(o >> BigInt(32) & BigInt(4294967295));
      return a[c + 3] = H, H = H >> 8, a[c + 2] = H, H = H >> 8, a[c + 1] = H, H = H >> 8, a[c] = H, c + 8;
    }
    h.prototype.writeBigUInt64LE = Jt(function(o, c = 0) {
      return g(this, o, c, BigInt(0), BigInt("0xffffffffffffffff"));
    }), h.prototype.writeBigUInt64BE = Jt(function(o, c = 0) {
      return M(this, o, c, BigInt(0), BigInt("0xffffffffffffffff"));
    }), h.prototype.writeIntLE = function(o, c, y, k) {
      if (o = +o, c = c >>> 0, !k) {
        const lt = Math.pow(2, 8 * y - 1);
        f(this, o, c, y, lt - 1, -lt);
      }
      let j = 0, H = 1, ut = 0;
      for (this[c] = o & 255; ++j < y && (H *= 256); )
        o < 0 && ut === 0 && this[c + j - 1] !== 0 && (ut = 1), this[c + j] = (o / H >> 0) - ut & 255;
      return c + y;
    }, h.prototype.writeIntBE = function(o, c, y, k) {
      if (o = +o, c = c >>> 0, !k) {
        const lt = Math.pow(2, 8 * y - 1);
        f(this, o, c, y, lt - 1, -lt);
      }
      let j = y - 1, H = 1, ut = 0;
      for (this[c + j] = o & 255; --j >= 0 && (H *= 256); )
        o < 0 && ut === 0 && this[c + j + 1] !== 0 && (ut = 1), this[c + j] = (o / H >> 0) - ut & 255;
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
      return M(this, o, c, -BigInt("0x8000000000000000"), BigInt("0x7fffffffffffffff"));
    });
    function T(a, o, c, y, k, j) {
      if (c + y > a.length) throw new RangeError("Index out of range");
      if (c < 0) throw new RangeError("Index out of range");
    }
    function W(a, o, c, y, k) {
      return o = +o, c = c >>> 0, k || T(a, o, c, 4), e.write(a, o, c, y, 23, 4), c + 4;
    }
    h.prototype.writeFloatLE = function(o, c, y) {
      return W(this, o, c, !0, y);
    }, h.prototype.writeFloatBE = function(o, c, y) {
      return W(this, o, c, !1, y);
    };
    function J(a, o, c, y, k) {
      return o = +o, c = c >>> 0, k || T(a, o, c, 8), e.write(a, o, c, y, 52, 8), c + 8;
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
      const j = k - y;
      return this === o && typeof Uint8Array.prototype.copyWithin == "function" ? this.copyWithin(c, y, k) : Uint8Array.prototype.set.call(
        o,
        this.subarray(y, k),
        c
      ), j;
    }, h.prototype.fill = function(o, c, y, k) {
      if (typeof o == "string") {
        if (typeof c == "string" ? (k = c, c = 0, y = this.length) : typeof y == "string" && (k = y, y = this.length), k !== void 0 && typeof k != "string")
          throw new TypeError("encoding must be a string");
        if (typeof k == "string" && !h.isEncoding(k))
          throw new TypeError("Unknown encoding: " + k);
        if (o.length === 1) {
          const H = o.charCodeAt(0);
          (k === "utf8" && H < 128 || k === "latin1") && (o = H);
        }
      } else typeof o == "number" ? o = o & 255 : typeof o == "boolean" && (o = Number(o));
      if (c < 0 || this.length < c || this.length < y)
        throw new RangeError("Out of range index");
      if (y <= c)
        return this;
      c = c >>> 0, y = y === void 0 ? this.length : y >>> 0, o || (o = 0);
      let j;
      if (typeof o == "number")
        for (j = c; j < y; ++j)
          this[j] = o;
      else {
        const H = h.isBuffer(o) ? o : h.from(o, k), ut = H.length;
        if (ut === 0)
          throw new TypeError('The value "' + o + '" is invalid for argument "value"');
        for (j = 0; j < y - c; ++j)
          this[j + c] = H[j % ut];
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
    function gt(a, o, c) {
      Et(o, "offset"), (a[o] === void 0 || a[o + c] === void 0) && ht(o, a.length - (c + 1));
    }
    function bt(a, o, c, y, k, j) {
      if (a > c || a < o) {
        const H = typeof o == "bigint" ? "n" : "";
        let ut;
        throw o === 0 || o === BigInt(0) ? ut = `>= 0${H} and < 2${H} ** ${(j + 1) * 8}${H}` : ut = `>= -(2${H} ** ${(j + 1) * 8 - 1}${H}) and < 2 ** ${(j + 1) * 8 - 1}${H}`, new tt.ERR_OUT_OF_RANGE("value", ut, a);
      }
      gt(y, k, j);
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
    function on(a) {
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
      const j = [];
      for (let H = 0; H < y; ++H) {
        if (c = a.charCodeAt(H), c > 55295 && c < 57344) {
          if (!k) {
            if (c > 56319) {
              (o -= 3) > -1 && j.push(239, 191, 189);
              continue;
            } else if (H + 1 === y) {
              (o -= 3) > -1 && j.push(239, 191, 189);
              continue;
            }
            k = c;
            continue;
          }
          if (c < 56320) {
            (o -= 3) > -1 && j.push(239, 191, 189), k = c;
            continue;
          }
          c = (k - 55296 << 10 | c - 56320) + 65536;
        } else k && (o -= 3) > -1 && j.push(239, 191, 189);
        if (k = null, c < 128) {
          if ((o -= 1) < 0) break;
          j.push(c);
        } else if (c < 2048) {
          if ((o -= 2) < 0) break;
          j.push(
            c >> 6 | 192,
            c & 63 | 128
          );
        } else if (c < 65536) {
          if ((o -= 3) < 0) break;
          j.push(
            c >> 12 | 224,
            c >> 6 & 63 | 128,
            c & 63 | 128
          );
        } else if (c < 1114112) {
          if ((o -= 4) < 0) break;
          j.push(
            c >> 18 | 240,
            c >> 12 & 63 | 128,
            c >> 6 & 63 | 128,
            c & 63 | 128
          );
        } else
          throw new Error("Invalid code point");
      }
      return j;
    }
    function Ot(a) {
      const o = [];
      for (let c = 0; c < a.length; ++c)
        o.push(a.charCodeAt(c) & 255);
      return o;
    }
    function wn(a, o) {
      let c, y, k;
      const j = [];
      for (let H = 0; H < a.length && !((o -= 2) < 0); ++H)
        c = a.charCodeAt(H), y = c >> 8, k = c % 256, j.push(k), j.push(y);
      return j;
    }
    function Lt(a) {
      return t.toByteArray(on(a));
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
  }($i)), $i;
}
var pt = Ii(), At;
((r) => {
  ((t) => {
    t.INIT = "INIT", t.READY = "READY", t.CONNECTING = "CONNECTING", t.CONNECTED = "CONNECTED", t.DISCONNECTING = "DISCONNECTING", t.DISCONNECTED = "DISCONNECTED", t.ERROR = "ERROR";
  })(r.Status || (r.Status = {})), ((t) => {
    t.ICP = "icp", t.SOL = "sol", t.ETH = "eth";
  })(r.Chain || (r.Chain = {}));
})(At || (At = {}));
const gu = "data:image/webp;base64,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";
var Au = Object.create, _a = Object.defineProperty, pu = Object.getOwnPropertyDescriptor, wu = Object.getOwnPropertyNames, yu = Object.getPrototypeOf, mu = Object.prototype.hasOwnProperty, to = (r, t) => () => (t || r((t = { exports: {} }).exports, t), t.exports), bu = (r, t, e, n) => {
  if (t && typeof t == "object" || typeof t == "function") for (let i of wu(t)) !mu.call(r, i) && i !== e && _a(r, i, { get: () => t[i], enumerable: !(n = pu(t, i)) || n.enumerable });
  return r;
}, Eu = (r, t, e) => (e = r != null ? Au(yu(r)) : {}, bu(!r || !r.__esModule ? _a(e, "default", { value: r, enumerable: !0 }) : e, r));
function Iu(r) {
  return r instanceof Uint8Array || r != null && typeof r == "object" && r.constructor.name === "Uint8Array";
}
function Ha(r, ...t) {
  if (!Iu(r)) throw new Error("Uint8Array expected");
  if (t.length > 0 && !t.includes(r.length)) throw new Error(`Uint8Array expected of length ${t}, not of length=${r.length}`);
}
function Fo(r, t = !0) {
  if (r.destroyed) throw new Error("Hash instance has been destroyed");
  if (t && r.finished) throw new Error("Hash#digest() has already been called");
}
function vu(r, t) {
  Ha(r);
  let e = t.outputLen;
  if (r.length < e) throw new Error(`digestInto() expects output buffer of length at least ${e}`);
}
var ts = (r) => new DataView(r.buffer, r.byteOffset, r.byteLength), Ke = (r, t) => r << 32 - t | r >>> t;
new Uint8Array(new Uint32Array([287454020]).buffer)[0];
function Su(r) {
  if (typeof r != "string") throw new Error(`utf8ToBytes expected string, got ${typeof r}`);
  return new Uint8Array(new TextEncoder().encode(r));
}
function Wa(r) {
  return typeof r == "string" && (r = Su(r)), Ha(r), r;
}
var Mu = class {
  clone() {
    return this._cloneInto();
  }
};
function xu(r) {
  let t = (n) => r().update(Wa(n)).digest(), e = r();
  return t.outputLen = e.outputLen, t.blockLen = e.blockLen, t.create = () => r(), t;
}
function Bu(r, t, e, n) {
  if (typeof r.setBigUint64 == "function") return r.setBigUint64(t, e, n);
  let i = BigInt(32), s = BigInt(4294967295), u = Number(e >> i & s), h = Number(e & s), A = n ? 4 : 0, E = n ? 0 : 4;
  r.setUint32(t + A, u, n), r.setUint32(t + E, h, n);
}
var Cu = (r, t, e) => r & t ^ ~r & e, ku = (r, t, e) => r & t ^ r & e ^ t & e, Nu = class extends Mu {
  constructor(r, t, e, n) {
    super(), this.blockLen = r, this.outputLen = t, this.padOffset = e, this.isLE = n, this.finished = !1, this.length = 0, this.pos = 0, this.destroyed = !1, this.buffer = new Uint8Array(r), this.view = ts(this.buffer);
  }
  update(r) {
    Fo(this);
    let { view: t, buffer: e, blockLen: n } = this;
    r = Wa(r);
    let i = r.length;
    for (let s = 0; s < i; ) {
      let u = Math.min(n - this.pos, i - s);
      if (u === n) {
        let h = ts(r);
        for (; n <= i - s; s += n) this.process(h, s);
        continue;
      }
      e.set(r.subarray(s, s + u), this.pos), this.pos += u, s += u, this.pos === n && (this.process(t, 0), this.pos = 0);
    }
    return this.length += r.length, this.roundClean(), this;
  }
  digestInto(r) {
    Fo(this), vu(r, this), this.finished = !0;
    let { buffer: t, view: e, blockLen: n, isLE: i } = this, { pos: s } = this;
    t[s++] = 128, this.buffer.subarray(s).fill(0), this.padOffset > n - s && (this.process(e, 0), s = 0);
    for (let S = s; S < n; S++) t[S] = 0;
    Bu(e, n - 8, BigInt(this.length * 8), i), this.process(e, 0);
    let u = ts(r), h = this.outputLen;
    if (h % 4) throw new Error("_sha2: outputLen should be aligned to 32bit");
    let A = h / 4, E = this.get();
    if (A > E.length) throw new Error("_sha2: outputLen bigger than state");
    for (let S = 0; S < A; S++) u.setUint32(4 * S, E[S], i);
  }
  digest() {
    let { buffer: r, outputLen: t } = this;
    this.digestInto(r);
    let e = r.slice(0, t);
    return this.destroy(), e;
  }
  _cloneInto(r) {
    r || (r = new this.constructor()), r.set(...this.get());
    let { blockLen: t, buffer: e, length: n, finished: i, destroyed: s, pos: u } = this;
    return r.length = n, r.pos = u, r.finished = i, r.destroyed = s, n % t && r.buffer.set(e), r;
  }
}, Tu = new Uint32Array([1116352408, 1899447441, 3049323471, 3921009573, 961987163, 1508970993, 2453635748, 2870763221, 3624381080, 310598401, 607225278, 1426881987, 1925078388, 2162078206, 2614888103, 3248222580, 3835390401, 4022224774, 264347078, 604807628, 770255983, 1249150122, 1555081692, 1996064986, 2554220882, 2821834349, 2952996808, 3210313671, 3336571891, 3584528711, 113926993, 338241895, 666307205, 773529912, 1294757372, 1396182291, 1695183700, 1986661051, 2177026350, 2456956037, 2730485921, 2820302411, 3259730800, 3345764771, 3516065817, 3600352804, 4094571909, 275423344, 430227734, 506948616, 659060556, 883997877, 958139571, 1322822218, 1537002063, 1747873779, 1955562222, 2024104815, 2227730452, 2361852424, 2428436474, 2756734187, 3204031479, 3329325298]), yn = new Uint32Array([1779033703, 3144134277, 1013904242, 2773480762, 1359893119, 2600822924, 528734635, 1541459225]), mn = new Uint32Array(64), Lu = class extends Nu {
  constructor() {
    super(64, 32, 8, !1), this.A = yn[0] | 0, this.B = yn[1] | 0, this.C = yn[2] | 0, this.D = yn[3] | 0, this.E = yn[4] | 0, this.F = yn[5] | 0, this.G = yn[6] | 0, this.H = yn[7] | 0;
  }
  get() {
    let { A: r, B: t, C: e, D: n, E: i, F: s, G: u, H: h } = this;
    return [r, t, e, n, i, s, u, h];
  }
  set(r, t, e, n, i, s, u, h) {
    this.A = r | 0, this.B = t | 0, this.C = e | 0, this.D = n | 0, this.E = i | 0, this.F = s | 0, this.G = u | 0, this.H = h | 0;
  }
  process(r, t) {
    for (let S = 0; S < 16; S++, t += 4) mn[S] = r.getUint32(t, !1);
    for (let S = 16; S < 64; S++) {
      let N = mn[S - 15], P = mn[S - 2], U = Ke(N, 7) ^ Ke(N, 18) ^ N >>> 3, F = Ke(P, 17) ^ Ke(P, 19) ^ P >>> 10;
      mn[S] = F + mn[S - 7] + U + mn[S - 16] | 0;
    }
    let { A: e, B: n, C: i, D: s, E: u, F: h, G: A, H: E } = this;
    for (let S = 0; S < 64; S++) {
      let N = Ke(u, 6) ^ Ke(u, 11) ^ Ke(u, 25), P = E + N + Cu(u, h, A) + Tu[S] + mn[S] | 0, U = (Ke(e, 2) ^ Ke(e, 13) ^ Ke(e, 22)) + ku(e, n, i) | 0;
      E = A, A = h, h = u, u = s + P | 0, s = i, i = n, n = e, e = P + U | 0;
    }
    e = e + this.A | 0, n = n + this.B | 0, i = i + this.C | 0, s = s + this.D | 0, u = u + this.E | 0, h = h + this.F | 0, A = A + this.G | 0, E = E + this.H | 0, this.set(e, n, i, s, u, h, A, E);
  }
  roundClean() {
    mn.fill(0);
  }
  destroy() {
    this.set(0, 0, 0, 0, 0, 0, 0, 0), this.buffer.fill(0);
  }
}, Ru = class extends Lu {
  constructor() {
    super(), this.A = -1056596264, this.B = 914150663, this.C = 812702999, this.D = -150054599, this.E = -4191439, this.F = 1750603025, this.G = 1694076839, this.H = -1090891868, this.outputLen = 28;
  }
}, Ou = xu(() => new Ru()), zr = class Ns {
  constructor(t) {
    this.bytes = t;
  }
  static fromHex(t) {
    return new Ns(Uint8Array.from(pt.Buffer.from(t, "hex")));
  }
  static fromPrincipal({ principal: t, subAccount: e = Du.fromID(0) }) {
    let n = ou(`
account-id`), i = Ou.create();
    i.update(au([...n, ...t.toUint8Array(), ...e.toUint8Array()]));
    let s = i.digest(), u = cu(s), h = new Uint8Array([...u, ...s]);
    return new Ns(h);
  }
  toHex() {
    return uu(this.bytes);
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
}, Du = class Xr {
  constructor(t) {
    this.bytes = t;
  }
  static fromBytes(t) {
    return t.length != 32 ? Error("Subaccount length must be 32-bytes") : new Xr(t);
  }
  static fromPrincipal(t) {
    let e = new Uint8Array(32).fill(0), n = t.toUint8Array();
    e[0] = n.length;
    for (let i = 0; i < n.length; i++) e[1 + i] = n[i];
    return new Xr(e);
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
    return new Xr(n);
  }
  toUint8Array() {
    return this.bytes;
  }
};
/*! Bundled license information:

@noble/hashes/esm/utils.js:
  (*! noble-hashes - MIT License (c) 2022 Paul Miller (paulmillr.com) *)
*/
pe.fromText("ryjl3-tyaaa-aaaaa-aaaba-cai");
pe.fromText("qhbym-qaaaa-aaaaa-aaafq-cai");
BigInt(1095062083);
BigInt(1347768404);
BigInt(1e4);
BigInt(1e8);
var Uu = to((r) => {
  r.byteLength = A, r.toByteArray = S, r.fromByteArray = U;
  var t = [], e = [], n = typeof Uint8Array < "u" ? Uint8Array : Array, i = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
  for (s = 0, u = i.length; s < u; ++s) t[s] = i[s], e[i.charCodeAt(s)] = s;
  var s, u;
  e[45] = 62, e[95] = 63;
  function h(F) {
    var O = F.length;
    if (O % 4 > 0) throw new Error("Invalid string. Length must be a multiple of 4");
    var L = F.indexOf("=");
    L === -1 && (L = O);
    var Y = L === O ? 0 : 4 - L % 4;
    return [L, Y];
  }
  function A(F) {
    var O = h(F), L = O[0], Y = O[1];
    return (L + Y) * 3 / 4 - Y;
  }
  function E(F, O, L) {
    return (O + L) * 3 / 4 - L;
  }
  function S(F) {
    var O, L = h(F), Y = L[0], Q = L[1], q = new n(E(F, Y, Q)), K = 0, V = Q > 0 ? Y - 4 : Y, X;
    for (X = 0; X < V; X += 4) O = e[F.charCodeAt(X)] << 18 | e[F.charCodeAt(X + 1)] << 12 | e[F.charCodeAt(X + 2)] << 6 | e[F.charCodeAt(X + 3)], q[K++] = O >> 16 & 255, q[K++] = O >> 8 & 255, q[K++] = O & 255;
    return Q === 2 && (O = e[F.charCodeAt(X)] << 2 | e[F.charCodeAt(X + 1)] >> 4, q[K++] = O & 255), Q === 1 && (O = e[F.charCodeAt(X)] << 10 | e[F.charCodeAt(X + 1)] << 4 | e[F.charCodeAt(X + 2)] >> 2, q[K++] = O >> 8 & 255, q[K++] = O & 255), q;
  }
  function N(F) {
    return t[F >> 18 & 63] + t[F >> 12 & 63] + t[F >> 6 & 63] + t[F & 63];
  }
  function P(F, O, L) {
    for (var Y, Q = [], q = O; q < L; q += 3) Y = (F[q] << 16 & 16711680) + (F[q + 1] << 8 & 65280) + (F[q + 2] & 255), Q.push(N(Y));
    return Q.join("");
  }
  function U(F) {
    for (var O, L = F.length, Y = L % 3, Q = [], q = 16383, K = 0, V = L - Y; K < V; K += q) Q.push(P(F, K, K + q > V ? V : K + q));
    return Y === 1 ? (O = F[L - 1], Q.push(t[O >> 2] + t[O << 4 & 63] + "==")) : Y === 2 && (O = (F[L - 2] << 8) + F[L - 1], Q.push(t[O >> 10] + t[O >> 4 & 63] + t[O << 2 & 63] + "=")), Q.join("");
  }
}), ju = to((r) => {
  r.read = function(t, e, n, i, s) {
    var u, h, A = s * 8 - i - 1, E = (1 << A) - 1, S = E >> 1, N = -7, P = n ? s - 1 : 0, U = n ? -1 : 1, F = t[e + P];
    for (P += U, u = F & (1 << -N) - 1, F >>= -N, N += A; N > 0; u = u * 256 + t[e + P], P += U, N -= 8) ;
    for (h = u & (1 << -N) - 1, u >>= -N, N += i; N > 0; h = h * 256 + t[e + P], P += U, N -= 8) ;
    if (u === 0) u = 1 - S;
    else {
      if (u === E) return h ? NaN : (F ? -1 : 1) * (1 / 0);
      h = h + Math.pow(2, i), u = u - S;
    }
    return (F ? -1 : 1) * h * Math.pow(2, u - i);
  }, r.write = function(t, e, n, i, s, u) {
    var h, A, E, S = u * 8 - s - 1, N = (1 << S) - 1, P = N >> 1, U = s === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0, F = i ? 0 : u - 1, O = i ? 1 : -1, L = e < 0 || e === 0 && 1 / e < 0 ? 1 : 0;
    for (e = Math.abs(e), isNaN(e) || e === 1 / 0 ? (A = isNaN(e) ? 1 : 0, h = N) : (h = Math.floor(Math.log(e) / Math.LN2), e * (E = Math.pow(2, -h)) < 1 && (h--, E *= 2), h + P >= 1 ? e += U / E : e += U * Math.pow(2, 1 - P), e * E >= 2 && (h++, E /= 2), h + P >= N ? (A = 0, h = N) : h + P >= 1 ? (A = (e * E - 1) * Math.pow(2, s), h = h + P) : (A = e * Math.pow(2, P - 1) * Math.pow(2, s), h = 0)); s >= 8; t[n + F] = A & 255, F += O, A /= 256, s -= 8) ;
    for (h = h << s | A, S += s; S > 0; t[n + F] = h & 255, F += O, h /= 256, S -= 8) ;
    t[n + F - O] |= L * 128;
  };
}), zu = to((r) => {
  var t = Uu(), e = ju(), n = typeof Symbol == "function" && typeof Symbol.for == "function" ? Symbol.for("nodejs.util.inspect.custom") : null;
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
  function u(a) {
    if (a > i) throw new RangeError('The value "' + a + '" is invalid for option "size"');
    let o = new Uint8Array(a);
    return Object.setPrototypeOf(o, h.prototype), o;
  }
  function h(a, o, c) {
    if (typeof a == "number") {
      if (typeof o == "string") throw new TypeError('The "string" argument must be of type string. Received type number');
      return N(a);
    }
    return A(a, o, c);
  }
  h.poolSize = 8192;
  function A(a, o, c) {
    if (typeof a == "string") return P(a, o);
    if (ArrayBuffer.isView(a)) return F(a);
    if (a == null) throw new TypeError("The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof a);
    if (jt(a, ArrayBuffer) || a && jt(a.buffer, ArrayBuffer) || typeof SharedArrayBuffer < "u" && (jt(a, SharedArrayBuffer) || a && jt(a.buffer, SharedArrayBuffer))) return O(a, o, c);
    if (typeof a == "number") throw new TypeError('The "value" argument must not be of type number. Received type number');
    let y = a.valueOf && a.valueOf();
    if (y != null && y !== a) return h.from(y, o, c);
    let k = L(a);
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
  function S(a, o, c) {
    return E(a), a <= 0 ? u(a) : o !== void 0 ? typeof c == "string" ? u(a).fill(o, c) : u(a).fill(o) : u(a);
  }
  h.alloc = function(a, o, c) {
    return S(a, o, c);
  };
  function N(a) {
    return E(a), u(a < 0 ? 0 : Y(a) | 0);
  }
  h.allocUnsafe = function(a) {
    return N(a);
  }, h.allocUnsafeSlow = function(a) {
    return N(a);
  };
  function P(a, o) {
    if ((typeof o != "string" || o === "") && (o = "utf8"), !h.isEncoding(o)) throw new TypeError("Unknown encoding: " + o);
    let c = q(a, o) | 0, y = u(c), k = y.write(a, o);
    return k !== c && (y = y.slice(0, k)), y;
  }
  function U(a) {
    let o = a.length < 0 ? 0 : Y(a.length) | 0, c = u(o);
    for (let y = 0; y < o; y += 1) c[y] = a[y] & 255;
    return c;
  }
  function F(a) {
    if (jt(a, Uint8Array)) {
      let o = new Uint8Array(a);
      return O(o.buffer, o.byteOffset, o.byteLength);
    }
    return U(a);
  }
  function O(a, o, c) {
    if (o < 0 || a.byteLength < o) throw new RangeError('"offset" is outside of buffer bounds');
    if (a.byteLength < o + (c || 0)) throw new RangeError('"length" is outside of buffer bounds');
    let y;
    return o === void 0 && c === void 0 ? y = new Uint8Array(a) : c === void 0 ? y = new Uint8Array(a, o) : y = new Uint8Array(a, o, c), Object.setPrototypeOf(y, h.prototype), y;
  }
  function L(a) {
    if (h.isBuffer(a)) {
      let o = Y(a.length) | 0, c = u(o);
      return c.length === 0 || a.copy(c, 0, 0, o), c;
    }
    if (a.length !== void 0) return typeof a.length != "number" || Rt(a.length) ? u(0) : U(a);
    if (a.type === "Buffer" && Array.isArray(a.data)) return U(a.data);
  }
  function Y(a) {
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
    for (let k = 0, j = Math.min(c, y); k < j; ++k) if (a[k] !== o[k]) {
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
      let j = a[c];
      if (jt(j, Uint8Array)) k + j.length > y.length ? (h.isBuffer(j) || (j = h.from(j)), j.copy(y, k)) : Uint8Array.prototype.set.call(y, j, k);
      else if (h.isBuffer(j)) j.copy(y, k);
      else throw new TypeError('"list" argument must be an Array of Buffers');
      k += j.length;
    }
    return y;
  };
  function q(a, o) {
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
  h.byteLength = q;
  function K(a, o, c) {
    let y = !1;
    if ((o === void 0 || o < 0) && (o = 0), o > this.length || ((c === void 0 || c > this.length) && (c = this.length), c <= 0) || (c >>>= 0, o >>>= 0, c <= o)) return "";
    for (a || (a = "utf8"); ; ) switch (a) {
      case "hex":
        return B(this, o, c);
      case "utf8":
      case "utf-8":
        return l(this, o, c);
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
        return z(this, o, c);
      default:
        if (y) throw new TypeError("Unknown encoding: " + a);
        a = (a + "").toLowerCase(), y = !0;
    }
  }
  h.prototype._isBuffer = !0;
  function V(a, o, c) {
    let y = a[o];
    a[o] = a[c], a[c] = y;
  }
  h.prototype.swap16 = function() {
    let a = this.length;
    if (a % 2 !== 0) throw new RangeError("Buffer size must be a multiple of 16-bits");
    for (let o = 0; o < a; o += 2) V(this, o, o + 1);
    return this;
  }, h.prototype.swap32 = function() {
    let a = this.length;
    if (a % 4 !== 0) throw new RangeError("Buffer size must be a multiple of 32-bits");
    for (let o = 0; o < a; o += 4) V(this, o, o + 3), V(this, o + 1, o + 2);
    return this;
  }, h.prototype.swap64 = function() {
    let a = this.length;
    if (a % 8 !== 0) throw new RangeError("Buffer size must be a multiple of 64-bits");
    for (let o = 0; o < a; o += 8) V(this, o, o + 7), V(this, o + 1, o + 6), V(this, o + 2, o + 5), V(this, o + 3, o + 4);
    return this;
  }, h.prototype.toString = function() {
    let a = this.length;
    return a === 0 ? "" : arguments.length === 0 ? l(this, 0, a) : K.apply(this, arguments);
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
    let j = k - y, H = c - o, ut = Math.min(j, H), lt = this.slice(y, k), at = a.slice(o, c);
    for (let yt = 0; yt < ut; ++yt) if (lt[yt] !== at[yt]) {
      j = lt[yt], H = at[yt];
      break;
    }
    return j < H ? -1 : H < j ? 1 : 0;
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
    let j = 1, H = a.length, ut = o.length;
    if (y !== void 0 && (y = String(y).toLowerCase(), y === "ucs2" || y === "ucs-2" || y === "utf16le" || y === "utf-16le")) {
      if (a.length < 2 || o.length < 2) return -1;
      j = 2, H /= 2, ut /= 2, c /= 2;
    }
    function lt(yt, ct) {
      return j === 1 ? yt[ct] : yt.readUInt16BE(ct * j);
    }
    let at;
    if (k) {
      let yt = -1;
      for (at = c; at < H; at++) if (lt(a, at) === lt(o, yt === -1 ? 0 : at - yt)) {
        if (yt === -1 && (yt = at), at - yt + 1 === ut) return yt * j;
      } else yt !== -1 && (at -= at - yt), yt = -1;
    } else for (c + ut > H && (c = H - ut), at = c; at >= 0; at--) {
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
    let j = o.length;
    y > j / 2 && (y = j / 2);
    let H;
    for (H = 0; H < y; ++H) {
      let ut = parseInt(o.substr(H * 2, 2), 16);
      if (Rt(ut)) return H;
      a[c + H] = ut;
    }
    return H;
  }
  function v(a, o, c, y) {
    return Ct(Bt(o, a.length - c), a, c, y);
  }
  function x(a, o, c, y) {
    return Ct(Ot(o), a, c, y);
  }
  function D(a, o, c, y) {
    return Ct(Lt(o), a, c, y);
  }
  function R(a, o, c, y) {
    return Ct(wn(o, a.length - c), a, c, y);
  }
  h.prototype.write = function(a, o, c, y) {
    if (o === void 0) y = "utf8", c = this.length, o = 0;
    else if (c === void 0 && typeof o == "string") y = o, c = this.length, o = 0;
    else if (isFinite(o)) o = o >>> 0, isFinite(c) ? (c = c >>> 0, y === void 0 && (y = "utf8")) : (y = c, c = void 0);
    else throw new Error("Buffer.write(string, encoding, offset[, length]) is no longer supported");
    let k = this.length - o;
    if ((c === void 0 || c > k) && (c = k), a.length > 0 && (c < 0 || o < 0) || o > this.length) throw new RangeError("Attempt to write outside buffer bounds");
    y || (y = "utf8");
    let j = !1;
    for (; ; ) switch (y) {
      case "hex":
        return C(this, a, o, c);
      case "utf8":
      case "utf-8":
        return v(this, a, o, c);
      case "ascii":
      case "latin1":
      case "binary":
        return x(this, a, o, c);
      case "base64":
        return D(this, a, o, c);
      case "ucs2":
      case "ucs-2":
      case "utf16le":
      case "utf-16le":
        return R(this, a, o, c);
      default:
        if (j) throw new TypeError("Unknown encoding: " + y);
        y = ("" + y).toLowerCase(), j = !0;
    }
  }, h.prototype.toJSON = function() {
    return { type: "Buffer", data: Array.prototype.slice.call(this._arr || this, 0) };
  };
  function b(a, o, c) {
    return o === 0 && c === a.length ? t.fromByteArray(a) : t.fromByteArray(a.slice(o, c));
  }
  function l(a, o, c) {
    c = Math.min(a.length, c);
    let y = [], k = o;
    for (; k < c; ) {
      let j = a[k], H = null, ut = j > 239 ? 4 : j > 223 ? 3 : j > 191 ? 2 : 1;
      if (k + ut <= c) {
        let lt, at, yt, ct;
        switch (ut) {
          case 1:
            j < 128 && (H = j);
            break;
          case 2:
            lt = a[k + 1], (lt & 192) === 128 && (ct = (j & 31) << 6 | lt & 63, ct > 127 && (H = ct));
            break;
          case 3:
            lt = a[k + 1], at = a[k + 2], (lt & 192) === 128 && (at & 192) === 128 && (ct = (j & 15) << 12 | (lt & 63) << 6 | at & 63, ct > 2047 && (ct < 55296 || ct > 57343) && (H = ct));
            break;
          case 4:
            lt = a[k + 1], at = a[k + 2], yt = a[k + 3], (lt & 192) === 128 && (at & 192) === 128 && (yt & 192) === 128 && (ct = (j & 15) << 18 | (lt & 63) << 12 | (at & 63) << 6 | yt & 63, ct > 65535 && ct < 1114112 && (H = ct));
        }
      }
      H === null ? (H = 65533, ut = 1) : H > 65535 && (H -= 65536, y.push(H >>> 10 & 1023 | 55296), H = 56320 | H & 1023), y.push(H), k += ut;
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
    for (let j = o; j < c; ++j) k += zt[a[j]];
    return k;
  }
  function z(a, o, c) {
    let y = a.slice(o, c), k = "";
    for (let j = 0; j < y.length - 1; j += 2) k += String.fromCharCode(y[j] + y[j + 1] * 256);
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
    let y = this[a], k = 1, j = 0;
    for (; ++j < o && (k *= 256); ) y += this[a + j] * k;
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
    let y = this[a], k = 1, j = 0;
    for (; ++j < o && (k *= 256); ) y += this[a + j] * k;
    return k *= 128, y >= k && (y -= Math.pow(2, 8 * o)), y;
  }, h.prototype.readIntBE = function(a, o, c) {
    a = a >>> 0, o = o >>> 0, c || I(a, o, this.length);
    let y = o, k = 1, j = this[a + --y];
    for (; y > 0 && (k *= 256); ) j += this[a + --y] * k;
    return k *= 128, j >= k && (j -= Math.pow(2, 8 * o)), j;
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
  function f(a, o, c, y, k, j) {
    if (!h.isBuffer(a)) throw new TypeError('"buffer" argument must be a Buffer instance');
    if (o > k || o < j) throw new RangeError('"value" argument is out of bounds');
    if (c + y > a.length) throw new RangeError("Index out of range");
  }
  h.prototype.writeUintLE = h.prototype.writeUIntLE = function(a, o, c, y) {
    if (a = +a, o = o >>> 0, c = c >>> 0, !y) {
      let H = Math.pow(2, 8 * c) - 1;
      f(this, a, o, c, H, 0);
    }
    let k = 1, j = 0;
    for (this[o] = a & 255; ++j < c && (k *= 256); ) this[o + j] = a / k & 255;
    return o + c;
  }, h.prototype.writeUintBE = h.prototype.writeUIntBE = function(a, o, c, y) {
    if (a = +a, o = o >>> 0, c = c >>> 0, !y) {
      let H = Math.pow(2, 8 * c) - 1;
      f(this, a, o, c, H, 0);
    }
    let k = c - 1, j = 1;
    for (this[o + k] = a & 255; --k >= 0 && (j *= 256); ) this[o + k] = a / j & 255;
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
    let j = Number(o & BigInt(4294967295));
    a[c++] = j, j = j >> 8, a[c++] = j, j = j >> 8, a[c++] = j, j = j >> 8, a[c++] = j;
    let H = Number(o >> BigInt(32) & BigInt(4294967295));
    return a[c++] = H, H = H >> 8, a[c++] = H, H = H >> 8, a[c++] = H, H = H >> 8, a[c++] = H, c;
  }
  function M(a, o, c, y, k) {
    bt(o, y, k, a, c, 7);
    let j = Number(o & BigInt(4294967295));
    a[c + 7] = j, j = j >> 8, a[c + 6] = j, j = j >> 8, a[c + 5] = j, j = j >> 8, a[c + 4] = j;
    let H = Number(o >> BigInt(32) & BigInt(4294967295));
    return a[c + 3] = H, H = H >> 8, a[c + 2] = H, H = H >> 8, a[c + 1] = H, H = H >> 8, a[c] = H, c + 8;
  }
  h.prototype.writeBigUInt64LE = Jt(function(a, o = 0) {
    return g(this, a, o, BigInt(0), BigInt("0xffffffffffffffff"));
  }), h.prototype.writeBigUInt64BE = Jt(function(a, o = 0) {
    return M(this, a, o, BigInt(0), BigInt("0xffffffffffffffff"));
  }), h.prototype.writeIntLE = function(a, o, c, y) {
    if (a = +a, o = o >>> 0, !y) {
      let ut = Math.pow(2, 8 * c - 1);
      f(this, a, o, c, ut - 1, -ut);
    }
    let k = 0, j = 1, H = 0;
    for (this[o] = a & 255; ++k < c && (j *= 256); ) a < 0 && H === 0 && this[o + k - 1] !== 0 && (H = 1), this[o + k] = (a / j >> 0) - H & 255;
    return o + c;
  }, h.prototype.writeIntBE = function(a, o, c, y) {
    if (a = +a, o = o >>> 0, !y) {
      let ut = Math.pow(2, 8 * c - 1);
      f(this, a, o, c, ut - 1, -ut);
    }
    let k = c - 1, j = 1, H = 0;
    for (this[o + k] = a & 255; --k >= 0 && (j *= 256); ) a < 0 && H === 0 && this[o + k + 1] !== 0 && (H = 1), this[o + k] = (a / j >> 0) - H & 255;
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
    return M(this, a, o, -BigInt("0x8000000000000000"), BigInt("0x7fffffffffffffff"));
  });
  function T(a, o, c, y, k, j) {
    if (c + y > a.length) throw new RangeError("Index out of range");
    if (c < 0) throw new RangeError("Index out of range");
  }
  function W(a, o, c, y, k) {
    return o = +o, c = c >>> 0, k || T(a, o, c, 4), e.write(a, o, c, y, 23, 4), c + 4;
  }
  h.prototype.writeFloatLE = function(a, o, c) {
    return W(this, a, o, !0, c);
  }, h.prototype.writeFloatBE = function(a, o, c) {
    return W(this, a, o, !1, c);
  };
  function J(a, o, c, y, k) {
    return o = +o, c = c >>> 0, k || T(a, o, c, 8), e.write(a, o, c, y, 52, 8), c + 8;
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
        let j = a.charCodeAt(0);
        (y === "utf8" && j < 128 || y === "latin1") && (a = j);
      }
    } else typeof a == "number" ? a = a & 255 : typeof a == "boolean" && (a = Number(a));
    if (o < 0 || this.length < o || this.length < c) throw new RangeError("Out of range index");
    if (c <= o) return this;
    o = o >>> 0, c = c === void 0 ? this.length : c >>> 0, a || (a = 0);
    let k;
    if (typeof a == "number") for (k = o; k < c; ++k) this[k] = a;
    else {
      let j = h.isBuffer(a) ? a : h.from(a, y), H = j.length;
      if (H === 0) throw new TypeError('The value "' + a + '" is invalid for argument "value"');
      for (k = 0; k < c - o; ++k) this[k + o] = j[k % H];
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
  function gt(a, o, c) {
    Et(o, "offset"), (a[o] === void 0 || a[o + c] === void 0) && ht(o, a.length - (c + 1));
  }
  function bt(a, o, c, y, k, j) {
    if (a > c || a < o) {
      let H = typeof o == "bigint" ? "n" : "", ut;
      throw o === 0 || o === BigInt(0) ? ut = `>= 0${H} and < 2${H} ** ${(j + 1) * 8}${H}` : ut = `>= -(2${H} ** ${(j + 1) * 8 - 1}${H}) and < 2 ** ${(j + 1) * 8 - 1}${H}`, new tt.ERR_OUT_OF_RANGE("value", ut, a);
    }
    gt(y, k, j);
  }
  function Et(a, o) {
    if (typeof a != "number") throw new tt.ERR_INVALID_ARG_TYPE(o, "number", a);
  }
  function ht(a, o, c) {
    throw Math.floor(a) !== a ? (Et(a, c), new tt.ERR_OUT_OF_RANGE("offset", "an integer", a)) : o < 0 ? new tt.ERR_BUFFER_OUT_OF_BOUNDS() : new tt.ERR_OUT_OF_RANGE("offset", `>= 0 and <= ${o}`, a);
  }
  var wt = /[^+/0-9A-Za-z-_]/g;
  function on(a) {
    if (a = a.split("=")[0], a = a.trim().replace(wt, ""), a.length < 2) return "";
    for (; a.length % 4 !== 0; ) a = a + "=";
    return a;
  }
  function Bt(a, o) {
    o = o || 1 / 0;
    let c, y = a.length, k = null, j = [];
    for (let H = 0; H < y; ++H) {
      if (c = a.charCodeAt(H), c > 55295 && c < 57344) {
        if (!k) {
          if (c > 56319) {
            (o -= 3) > -1 && j.push(239, 191, 189);
            continue;
          } else if (H + 1 === y) {
            (o -= 3) > -1 && j.push(239, 191, 189);
            continue;
          }
          k = c;
          continue;
        }
        if (c < 56320) {
          (o -= 3) > -1 && j.push(239, 191, 189), k = c;
          continue;
        }
        c = (k - 55296 << 10 | c - 56320) + 65536;
      } else k && (o -= 3) > -1 && j.push(239, 191, 189);
      if (k = null, c < 128) {
        if ((o -= 1) < 0) break;
        j.push(c);
      } else if (c < 2048) {
        if ((o -= 2) < 0) break;
        j.push(c >> 6 | 192, c & 63 | 128);
      } else if (c < 65536) {
        if ((o -= 3) < 0) break;
        j.push(c >> 12 | 224, c >> 6 & 63 | 128, c & 63 | 128);
      } else if (c < 1114112) {
        if ((o -= 4) < 0) break;
        j.push(c >> 18 | 240, c >> 12 & 63 | 128, c >> 6 & 63 | 128, c & 63 | 128);
      } else throw new Error("Invalid code point");
    }
    return j;
  }
  function Ot(a) {
    let o = [];
    for (let c = 0; c < a.length; ++c) o.push(a.charCodeAt(c) & 255);
    return o;
  }
  function wn(a, o) {
    let c, y, k, j = [];
    for (let H = 0; H < a.length && !((o -= 2) < 0); ++H) c = a.charCodeAt(H), y = c >> 8, k = c % 256, j.push(k), j.push(y);
    return j;
  }
  function Lt(a) {
    return t.toByteArray(on(a));
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
Eu(zu());
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
const xo = class xo {
  constructor(t) {
    this.state = At.Status.INIT, this.actorCache = /* @__PURE__ */ new Map(), this.config = t;
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
    try {
      const e = pe.fromText(t);
      return zr.fromPrincipal({
        principal: e,
        subAccount: void 0
        // Default subaccount
      }).toHex();
    } catch (e) {
      throw console.error("[BaseIcAdapter] Error deriving account ID:", e), e;
    }
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
    const { anon: i = !1, requiresSigning: s = !1 } = n, u = `${this.walletName}-${t}-${s}-${i}`, h = this.actorCache.get(u);
    if (h)
      return h;
    let A;
    return i ? A = gn.createActor(e, {
      canisterId: t
    }) : A = this.createActorInternal(t, e, n), this.actorCache.set(u, A), A;
  }
  // Base disconnect logic
  async disconnect() {
    if (!(this.state === At.Status.DISCONNECTING || this.state === At.Status.CONNECTING || this.state === At.Status.DISCONNECTED)) {
      this.setState(At.Status.DISCONNECTING);
      try {
        await this.disconnectInternal();
      } catch (t) {
        console.error(`[${this.walletName}] Error during disconnect:`, t);
      } finally {
        this.cleanupInternal(), this.setState(At.Status.DISCONNECTED);
      }
    }
  }
  // Abstract methods for subclass-specific disconnect logic and resource cleanup
  // Default implementations do nothing, subclasses can override if needed.
  async disconnectInternal() {
    console.log(`[${this.walletName}] Disconnecting...`), this.actorCache.clear(), this.config?.localStorageKey && localStorage.removeItem(this.config.localStorageKey);
  }
  cleanupInternal() {
  }
};
xo.supportedChains = [At.Chain.ICP];
let cr = xo;
const rr = class rr extends cr {
  // Constructor calls super and does II specific initialization
  constructor(t) {
    super(t), this.walletName = rr.walletName, this.logo = rr.logo, this.authClient = null, this.agent = null, su.create({
      idleOptions: {
        idleTimeout: Number(this.config.adapters?.ii?.config?.timeout || this.config.timeout || 1e3 * 60 * 60 * 24),
        disableDefaultIdleCallback: !0
      }
    }).then((e) => {
      this.authClient = e, this.authClient.idleManager?.registerCallback?.(() => this.refreshLogin());
    }).catch((e) => {
      console.error("[II] Failed to create AuthClient:", e), this.setState(At.Status.ERROR);
    });
  }
  // Use the resolved config for agent initialization
  async initAgent(t) {
    if (this.agent = _e.createSync({
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
      if (this.setState(At.Status.CONNECTING), !this.authClient && (await new Promise((n) => setTimeout(n, 500)), !this.authClient))
        throw new Error("AuthClient failed to initialize.");
      if (!await this.authClient.isAuthenticated())
        return new Promise((n, i) => {
          this.authClient.login({
            derivationOrigin: this.config.derivationOrigin,
            identityProvider: this.config.identityProvider,
            maxTimeToLive: BigInt(1 * 24 * 60 * 60 * 1e3 * 1e3 * 1e3),
            // 1 day
            onSuccess: () => {
              this._continueLogin().then((s) => {
                this.setState(At.Status.READY), n(s);
              }).catch(i);
            },
            onError: (s) => {
              console.error("[II] Login error:", s), this.disconnect().catch(() => {
              }), this.setState(At.Status.ERROR), i(new Error("II Authentication failed: " + s));
            }
          });
        });
      const e = await this._continueLogin();
      return this.setState(At.Status.READY), e;
    } catch (t) {
      await this._handleConnectError(t, "Connect error");
    }
  }
  // Helper method for handling errors during connection/login flow
  async _handleConnectError(t, e) {
    throw console.error(`[II] ${e}:`, t), this.setState(At.Status.ERROR), await this.disconnect().catch((n) => {
      console.error("[II] Error during disconnect after handling error:", n);
    }), t;
  }
  async _continueLogin() {
    if (!this.authClient) throw new Error("AuthClient not available in _continueLogin");
    try {
      const t = this.authClient.getIdentity(), e = t.getPrincipal();
      if (e.isAnonymous())
        throw new Error("Login resulted in anonymous principal");
      await this.initAgent(t);
      const n = await this.getAccountId();
      return {
        owner: e.toText(),
        // Use the derived account ID
        subaccount: n
      };
    } catch (t) {
      await this._handleConnectError(t, "Error during _continueLogin");
    }
  }
  async isConnected() {
    return this.authClient ? await this.authClient.isAuthenticated() : !1;
  }
  // Implementation for BaseIcAdapter actor caching
  createActorInternal(t, e) {
    if (!this.agent)
      throw new Error("Agent not initialized. Connect first.");
    return gn.createActor(e, {
      agent: this.agent,
      canisterId: t
    });
  }
  async getPrincipal() {
    if (!this.authClient) throw new Error("Not connected");
    const t = this.authClient.getIdentity();
    if (!t) throw new Error("Identity not available");
    return t.getPrincipal().toText();
  }
  async refreshLogin() {
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
rr.logo = gu, rr.walletName = "Internet Identity";
let xr = rr;
const Pu = "data:image/webp;base64,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", ir = class ir extends cr {
  // Update every 2 seconds
  // state and config are inherited
  // Constructor calls super and does Plug specific initialization
  constructor(t) {
    super(t), this.walletName = ir.walletName, this.logo = ir.logo, this.readyState = "NotDetected", this._connectionState = !1, this._connectionStateTimestamp = 0, this._connectionStateUpdateInterval = 2e3, this.initPlug(), this.updateConnectionState();
  }
  // Initialize Plug and set readyState accordingly
  initPlug() {
    typeof window < "u" && window.ic?.plug ? window.ic.plug.isConnected().then((t) => {
      this.readyState = t ? "Connected" : "Installed", t ? this.setState(At.Status.CONNECTED) : this.setState(At.Status.READY);
    }) : (this.readyState = "NotDetected", this.setState(At.Status.INIT));
  }
  // Implement abstract methods
  async isAvailable() {
    return this.readyState !== "NotDetected";
  }
  async connect() {
    if (this.setState(At.Status.CONNECTING), await this.isConnected())
      this.readyState = "Connected";
    else {
      if (!window.ic?.plug)
        throw this.setState(At.Status.ERROR), new Error("Plug Wallet extension not detected.");
      try {
        if (!await window.ic.plug.requestConnect({
          whitelist: this.config.delegationTargets?.map((i) => typeof i == "string" ? i : i.toText()) || [],
          host: this.config.hostUrl,
          timeout: this.config.adapters?.plug?.config?.timeout || this.config.timeout || 6048e5,
          onConnectionUpdate: () => this.handleConnectionUpdate()
        }))
          throw this.setState(At.Status.READY), new Error("User declined the connection request");
        this.readyState = "Connected";
      } catch (n) {
        throw this.setState(At.Status.READY), console.error("Failed to connect to Plug wallet:", n), n;
      }
    }
    this._connectionState = !0, this._connectionStateTimestamp = Date.now(), this.setState(At.Status.CONNECTED);
    const e = await this.getPrincipal();
    return {
      owner: e,
      subaccount: zr.fromPrincipal({
        principal: pe.fromText(e),
        subAccount: void 0
      }).toHex()
    };
  }
  // disconnect method is inherited, uses disconnectInternal and cleanupInternal
  async getPrincipal() {
    if (this.readyState === "Connected" && window.ic?.plug?.principalId)
      return pe.fromText(window.ic.plug.principalId).toText();
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
        get: (u, h) => {
          if (h !== "then")
            return (...A) => i.then((E) => {
              const S = E[h];
              return typeof S == "function" ? S.apply(E, A) : S;
            });
        }
      });
    } catch (i) {
      throw console.error("Failed to create actor through Plug:", i), i;
    }
  }
  // Plug specific connection state update
  async updateConnectionState() {
    window.ic?.plug?.isConnected ? (this._connectionState = await window.ic.plug.isConnected(), this._connectionStateTimestamp = Date.now(), this.readyState = this._connectionState ? "Connected" : "Installed", this._connectionState && this.state !== At.Status.CONNECTED ? this.setState(At.Status.CONNECTED) : !this._connectionState && this.state === At.Status.CONNECTED && this.setState(At.Status.READY)) : (this._connectionState = !1, this.readyState = "NotDetected", this.setState(At.Status.INIT));
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
ir.logo = Pu, ir.walletName = "Plug";
let Br = ir;
const Fu = "data:image/webp;base64,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", oi = 4e3, es = 1e5, bn = (r) => {
  if (typeof globalThis.Buffer < "u")
    return globalThis.Buffer.from(r, "base64").buffer;
  if (typeof globalThis.atob < "u")
    return Uint8Array.from(globalThis.atob(r), (t) => t.charCodeAt(0)).buffer;
  throw Error("Could not decode base64 string");
}, Cr = (r) => {
  if (typeof globalThis.Buffer < "u")
    return globalThis.Buffer.from(r).toString("base64");
  if (typeof globalThis.btoa < "u")
    return btoa(Array.from({ length: Math.ceil(r.byteLength / es) }).map((t, e) => String.fromCharCode(...new Uint8Array(r.slice(e * es, (e + 1) * es)))).join(""));
  throw Error("Could not encode base64 string");
};
var Gn = function(r, t, e, n, i) {
  if (typeof t == "function" ? r !== t || !0 : !t.has(r)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
  return t.set(r, e), e;
}, Zt = function(r, t, e, n) {
  if (typeof t == "function" ? r !== t || !0 : !t.has(r)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
  return e === "m" ? n : e === "a" ? n.call(r) : n ? n.value : t.get(r);
}, Be, un, Vn, $r;
class An extends Error {
  constructor(t) {
    super(t.message), Object.setPrototypeOf(this, An.prototype), this.code = t.code, this.data = t.data;
  }
}
const Qo = (r) => new An({
  code: oi,
  message: r instanceof Error ? r.message : "Network error"
}), Dn = (r) => {
  if ("error" in r)
    throw new An(r.error);
  if ("result" in r)
    return r.result;
  throw new An({
    code: oi,
    message: "Invalid response"
  });
};
class qa {
  constructor(t) {
    Be.set(this, void 0), un.set(this, void 0), Vn.set(this, void 0), $r.set(this, void 0), Gn(this, Be, Object.assign({ autoCloseTransportChannel: !0, closeTransportChannelAfter: 200, crypto: globalThis.crypto }, t));
  }
  get transport() {
    return Zt(this, Be, "f").transport;
  }
  async openChannel() {
    if (clearTimeout(Zt(this, $r, "f")), Zt(this, Vn, "f") && await Zt(this, Vn, "f"), Zt(this, un, "f") && !Zt(this, un, "f").closed)
      return Zt(this, un, "f");
    const t = Zt(this, Be, "f").transport.establishChannel();
    return Gn(this, Vn, t.then(() => {
    }).catch(() => {
    })), Gn(this, un, void 0), Gn(this, un, await t.catch((e) => {
      throw Qo(e);
    })), Gn(this, Vn, void 0), Zt(this, un, "f");
  }
  async closeChannel() {
    var t;
    await ((t = Zt(this, un, "f")) === null || t === void 0 ? void 0 : t.close());
  }
  async transformRequest(t) {
    return Zt(this, Be, "f").derivationOrigin ? Object.assign(Object.assign({}, t), { params: Object.assign(Object.assign({}, t.params), { icrc95DerivationOrigin: Zt(this, Be, "f").derivationOrigin }) }) : t;
  }
  async sendRequest(t) {
    const e = await this.openChannel();
    return new Promise(async (n, i) => {
      const s = e.addEventListener("response", async (h) => {
        h.id === t.id && (s(), u(), n(h), Zt(this, Be, "f").autoCloseTransportChannel && Gn(this, $r, setTimeout(() => {
          e.closed || e.close();
        }, Zt(this, Be, "f").closeTransportChannelAfter)));
      }), u = e.addEventListener("close", () => {
        s(), u(), i(new An({
          code: oi,
          message: "Channel was closed before a response was received"
        }));
      });
      try {
        await e.send(await this.transformRequest(t));
      } catch (h) {
        s(), u(), i(Qo(h));
      }
    });
  }
  async supportedStandards() {
    const t = await this.sendRequest({
      id: Zt(this, Be, "f").crypto.randomUUID(),
      jsonrpc: "2.0",
      method: "icrc25_supported_standards"
    });
    return Dn(t).supportedStandards;
  }
  async requestPermissions(t) {
    const e = await this.sendRequest({
      id: Zt(this, Be, "f").crypto.randomUUID(),
      jsonrpc: "2.0",
      method: "icrc25_request_permissions",
      params: { scopes: t }
    });
    return Dn(e).scopes;
  }
  async permissions() {
    const t = await this.sendRequest({
      id: Zt(this, Be, "f").crypto.randomUUID(),
      jsonrpc: "2.0",
      method: "icrc25_permissions"
    });
    return Dn(t).scopes;
  }
  async accounts() {
    const t = await this.sendRequest({
      id: Zt(this, Be, "f").crypto.randomUUID(),
      jsonrpc: "2.0",
      method: "icrc27_accounts"
    });
    return Dn(t).accounts.map(({ owner: n, subaccount: i }) => ({
      owner: pe.fromText(n),
      subaccount: i === void 0 ? void 0 : bn(i)
    }));
  }
  async delegation(t) {
    var e;
    const n = await this.sendRequest({
      id: Zt(this, Be, "f").crypto.randomUUID(),
      jsonrpc: "2.0",
      method: "icrc34_delegation",
      params: {
        publicKey: Cr(t.publicKey),
        targets: (e = t.targets) === null || e === void 0 ? void 0 : e.map((s) => s.toText()),
        maxTimeToLive: t.maxTimeToLive === void 0 ? void 0 : String(t.maxTimeToLive)
      }
    }), i = Dn(n);
    return ja.fromDelegations(i.signerDelegation.map((s) => {
      var u;
      return {
        delegation: new za(bn(s.delegation.pubkey), BigInt(s.delegation.expiration), (u = s.delegation.targets) === null || u === void 0 ? void 0 : u.map((h) => pe.fromText(h))),
        signature: bn(s.signature)
      };
    }), bn(i.publicKey));
  }
  async callCanister(t) {
    const e = await this.sendRequest({
      id: Zt(this, Be, "f").crypto.randomUUID(),
      jsonrpc: "2.0",
      method: "icrc49_call_canister",
      params: {
        canisterId: t.canisterId.toText(),
        sender: t.sender.toText(),
        method: t.method,
        arg: Cr(t.arg)
      }
    }), n = Dn(e), i = bn(n.contentMap), s = bn(n.certificate);
    return { contentMap: i, certificate: s };
  }
  async batchCallCanister(t) {
    const e = await this.sendRequest({
      id: Zt(this, Be, "f").crypto.randomUUID(),
      jsonrpc: "2.0",
      method: "icrc112_batch_call_canister",
      params: {
        sender: t.sender.toText(),
        requests: t.requests.map((i) => i.map((s) => ({
          canisterId: s.canisterId.toText(),
          method: s.method,
          arg: Cr(s.arg)
        }))),
        validation: t.validation ? {
          canisterId: t.validation.canisterId.toText(),
          method: t.validation.method
        } : void 0
      }
    }), n = Dn(e);
    if (t.requests.length !== n.responses.length || t.requests.some((i, s) => i.length !== n.responses[s].length))
      throw new An({
        code: oi,
        message: "Invalid batch call canister response, responses structure does not match request structure"
      });
    return n.responses.map((i) => i.map((s) => {
      if ("result" in s) {
        const u = bn(s.result.contentMap), h = bn(s.result.certificate);
        return { result: { contentMap: u, certificate: h } };
      }
      return s;
    }));
  }
}
Be = /* @__PURE__ */ new WeakMap(), un = /* @__PURE__ */ new WeakMap(), Vn = /* @__PURE__ */ new WeakMap(), $r = /* @__PURE__ */ new WeakMap();
const Qu = (r) => typeof r == "object" && !!r && "jsonrpc" in r && r.jsonrpc === "2.0", Ya = (r) => Qu(r) && "id" in r && (typeof r.id == "string" || typeof r.id == "number");
var _o = function(r, t, e, n, i) {
  if (typeof t == "function" ? r !== t || !0 : !t.has(r)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
  return t.set(r, e), e;
}, me = function(r, t, e, n) {
  if (typeof t == "function" ? r !== t || !0 : !t.has(r)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
  return e === "m" ? n : e === "a" ? n.call(r) : n ? n.value : t.get(r);
}, br, Le, Xn;
class _u {
  constructor(t) {
    br.set(this, /* @__PURE__ */ new Set()), Le.set(this, void 0), Xn.set(this, !1), _o(this, Le, Object.assign({ window: globalThis.window, manageFocus: !0 }, t));
  }
  get closed() {
    return me(this, Xn, "f");
  }
  addEventListener(...[t, e]) {
    switch (t) {
      case "close":
        return me(this, br, "f").add(e), () => {
          me(this, br, "f").delete(e);
        };
      case "response":
        const n = async (i) => {
          i.source !== me(this, Le, "f").signerWindow || i.origin !== me(this, Le, "f").signerOrigin || !Ya(i.data) || e(i.data);
        };
        return me(this, Le, "f").window.addEventListener("message", n), () => {
          me(this, Le, "f").window.removeEventListener("message", n);
        };
    }
  }
  async send(t) {
    if (me(this, Xn, "f"))
      throw new Fn("Communication channel is closed");
    me(this, Le, "f").signerWindow.postMessage(t, me(this, Le, "f").signerOrigin), me(this, Le, "f").manageFocus && me(this, Le, "f").signerWindow.focus();
  }
  async close() {
    me(this, Xn, "f") || (_o(this, Xn, !0), me(this, Le, "f").signerWindow.close(), me(this, Le, "f").manageFocus && me(this, Le, "f").window.focus(), me(this, br, "f").forEach((t) => t()));
  }
}
br = /* @__PURE__ */ new WeakMap(), Le = /* @__PURE__ */ new WeakMap(), Xn = /* @__PURE__ */ new WeakMap();
const Hu = (r) => {
  try {
    const t = new URL(r);
    return t.protocol === "https:" || t.hostname === "127.0.0.1" || t.hostname.split(".").slice(-1)[0] === "localhost";
  } catch {
    return !1;
  }
};
var Wu = function(r, t, e, n, i) {
  if (typeof t == "function" ? r !== t || !0 : !t.has(r)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
  return t.set(r, e), e;
}, ge = function(r, t, e, n) {
  if (e === "a" && !n) throw new TypeError("Private accessor was defined without a getter");
  if (typeof t == "function" ? r !== t || !n : !t.has(r)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
  return e === "m" ? n : e === "a" ? n.call(r) : n ? n.value : t.get(r);
}, kn, Ee, Za, Ho, ns, rs;
class qu {
  constructor(t) {
    kn.add(this), Ee.set(this, void 0), Wu(this, Ee, Object.assign({ establishTimeout: 1e4, disconnectTimeout: 2e3, statusPollingRate: 300, window: globalThis.window, crypto: globalThis.crypto }, t)), ge(this, kn, "m", Za).call(this);
  }
}
Ee = /* @__PURE__ */ new WeakMap(), kn = /* @__PURE__ */ new WeakSet(), Za = function() {
  const t = [], e = () => {
    const u = ge(this, Ee, "f").crypto.randomUUID();
    return t.push(u), u;
  }, n = ge(this, kn, "m", ns).call(this, (u) => {
    t.includes(u.data.id) && (n(), clearInterval(s), clearTimeout(i), ge(this, Ee, "f").onEstablish(u.origin), ge(this, kn, "m", Ho).call(this, u.origin));
  }), i = setTimeout(() => {
    n(), clearInterval(s), ge(this, Ee, "f").onEstablishTimeout();
  }, ge(this, Ee, "f").establishTimeout), s = setInterval(() => ge(this, kn, "m", rs).call(this, e()), ge(this, Ee, "f").statusPollingRate);
}, Ho = function(t) {
  let e, n, i = [];
  const s = (E) => {
    const S = i.findIndex((N) => N.id === E);
    return S > -1 && i.splice(S, 1), S > -1;
  }, u = () => {
    const E = ge(this, Ee, "f").crypto.randomUUID(), S = (/* @__PURE__ */ new Date()).getTime();
    return i = i.filter((N) => S - ge(this, Ee, "f").disconnectTimeout > N.time), i.push({ id: E, time: S }), E;
  }, h = () => {
    clearTimeout(n), n = setTimeout(() => {
      A(), clearInterval(e), ge(this, Ee, "f").onDisconnect();
    }, ge(this, Ee, "f").disconnectTimeout);
  }, A = ge(this, kn, "m", ns).call(this, (E) => {
    E.origin === t && s(E.data.id) && h();
  });
  h(), e = setInterval(() => ge(this, kn, "m", rs).call(this, u()), ge(this, Ee, "f").statusPollingRate);
}, ns = function(t) {
  const e = (n) => {
    n.source === ge(this, Ee, "f").signerWindow && Ya(n.data) && "result" in n.data && n.data.result === "ready" && t(n);
  };
  return ge(this, Ee, "f").window.addEventListener("message", e), () => ge(this, Ee, "f").window.removeEventListener("message", e);
}, rs = function(t) {
  ge(this, Ee, "f").signerWindow.postMessage({ jsonrpc: "2.0", id: t, method: "icrc29_status" }, "*");
};
var Yu = function(r, t, e, n, i) {
  if (typeof t == "function" ? r !== t || !0 : !t.has(r)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
  return t.set(r, e), e;
}, Un = function(r, t, e, n) {
  if (typeof t == "function" ? r !== t || !0 : !t.has(r)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
  return e === "m" ? n : e === "a" ? n.call(r) : n ? n.value : t.get(r);
}, en;
const Zu = "https://github.com/slide-computer/signer-js/blob/main/packages/signer-web/README.md#channels-must-be-established-in-a-click-handler";
class Fn extends Error {
  constructor(t) {
    super(t), Object.setPrototypeOf(this, Fn.prototype);
  }
}
let Ts = !1;
globalThis.window && (globalThis.window.addEventListener("click", () => Ts = !0, !0), globalThis.window.addEventListener("click", () => Ts = !1));
class Ga {
  constructor(t) {
    if (en.set(this, void 0), !Hu(t.url))
      throw new Fn("Invalid signer RPC url");
    Yu(this, en, Object.assign({ windowOpenerFeatures: "", window: globalThis.window, establishTimeout: 12e4, disconnectTimeout: 2e3, statusPollingRate: 300, crypto: globalThis.crypto, manageFocus: !0, closeOnEstablishTimeout: !0, detectNonClickEstablishment: !0 }, t));
  }
  async establishChannel() {
    if (Un(this, en, "f").detectNonClickEstablishment && !Ts)
      throw new Fn(`Signer window should not be opened outside of click handler, see: ${Zu}`);
    const t = Un(this, en, "f").window.open(Un(this, en, "f").url, "signerWindow", Un(this, en, "f").windowOpenerFeatures);
    if (!t)
      throw new Fn("Signer window could not be opened");
    return new Promise((e, n) => {
      let i;
      new qu(Object.assign(Object.assign({}, Un(this, en, "f")), { signerWindow: t, onEstablish: (s) => {
        i = new _u(Object.assign(Object.assign({}, Un(this, en, "f")), { signerOrigin: s, signerWindow: t })), e(i);
      }, onEstablishTimeout: () => {
        Un(this, en, "f").closeOnEstablishTimeout && t.close(), n(new Fn("Communication channel could not be established within a reasonable time"));
      }, onDisconnect: () => i.close() }));
    });
  }
}
en = /* @__PURE__ */ new WeakMap();
var Gu = /^-?(?:\d+(?:\.\d*)?|\.\d+)(?:e[+-]?\d+)?$/i, is = Math.ceil, We = Math.floor, Re = "[BigNumber Error] ", Wo = Re + "Number primitive has more than 15 significant digits: ", Ye = 1e14, It = 14, qo = 9007199254740991, ss = [1, 10, 100, 1e3, 1e4, 1e5, 1e6, 1e7, 1e8, 1e9, 1e10, 1e11, 1e12, 1e13], En = 1e7, je = 1e9;
function Ja(r) {
  var t, e, n, i = Q.prototype = { constructor: Q, toString: null, valueOf: null }, s = new Q(1), u = 20, h = 4, A = -7, E = 21, S = -1e7, N = 1e7, P = !1, U = 1, F = 0, O = {
    prefix: "",
    groupSize: 3,
    secondaryGroupSize: 0,
    groupSeparator: ",",
    decimalSeparator: ".",
    fractionGroupSize: 0,
    fractionGroupSeparator: " ",
    // non-breaking space
    suffix: ""
  }, L = "0123456789abcdefghijklmnopqrstuvwxyz", Y = !0;
  function Q(C, v) {
    var x, D, R, b, l, d, p, m, w = this;
    if (!(w instanceof Q)) return new Q(C, v);
    if (v == null) {
      if (C && C._isBigNumber === !0) {
        w.s = C.s, !C.c || C.e > N ? w.c = w.e = null : C.e < S ? w.c = [w.e = 0] : (w.e = C.e, w.c = C.c.slice());
        return;
      }
      if ((d = typeof C == "number") && C * 0 == 0) {
        if (w.s = 1 / C < 0 ? (C = -C, -1) : 1, C === ~~C) {
          for (b = 0, l = C; l >= 10; l /= 10, b++) ;
          b > N ? w.c = w.e = null : (w.e = b, w.c = [C]);
          return;
        }
        m = String(C);
      } else {
        if (!Gu.test(m = String(C))) return n(w, m, d);
        w.s = m.charCodeAt(0) == 45 ? (m = m.slice(1), -1) : 1;
      }
      (b = m.indexOf(".")) > -1 && (m = m.replace(".", "")), (l = m.search(/e/i)) > 0 ? (b < 0 && (b = l), b += +m.slice(l + 1), m = m.substring(0, l)) : b < 0 && (b = m.length);
    } else {
      if (_t(v, 2, L.length, "Base"), v == 10 && Y)
        return w = new Q(C), X(w, u + w.e + 1, h);
      if (m = String(C), d = typeof C == "number") {
        if (C * 0 != 0) return n(w, m, d, v);
        if (w.s = 1 / C < 0 ? (m = m.slice(1), -1) : 1, Q.DEBUG && m.replace(/^0\.0*|\./, "").length > 15)
          throw Error(Wo + C);
      } else
        w.s = m.charCodeAt(0) === 45 ? (m = m.slice(1), -1) : 1;
      for (x = L.slice(0, v), b = l = 0, p = m.length; l < p; l++)
        if (x.indexOf(D = m.charAt(l)) < 0) {
          if (D == ".") {
            if (l > b) {
              b = p;
              continue;
            }
          } else if (!R && (m == m.toUpperCase() && (m = m.toLowerCase()) || m == m.toLowerCase() && (m = m.toUpperCase()))) {
            R = !0, l = -1, b = 0;
            continue;
          }
          return n(w, String(C), d, v);
        }
      d = !1, m = e(m, v, 10, w.s), (b = m.indexOf(".")) > -1 ? m = m.replace(".", "") : b = m.length;
    }
    for (l = 0; m.charCodeAt(l) === 48; l++) ;
    for (p = m.length; m.charCodeAt(--p) === 48; ) ;
    if (m = m.slice(l, ++p)) {
      if (p -= l, d && Q.DEBUG && p > 15 && (C > qo || C !== We(C)))
        throw Error(Wo + w.s * C);
      if ((b = b - l - 1) > N)
        w.c = w.e = null;
      else if (b < S)
        w.c = [w.e = 0];
      else {
        if (w.e = b, w.c = [], l = (b + 1) % It, b < 0 && (l += It), l < p) {
          for (l && w.c.push(+m.slice(0, l)), p -= It; l < p; )
            w.c.push(+m.slice(l, l += It));
          l = It - (m = m.slice(l)).length;
        } else
          l -= p;
        for (; l--; m += "0") ;
        w.c.push(+m);
      }
    } else
      w.c = [w.e = 0];
  }
  Q.clone = Ja, Q.ROUND_UP = 0, Q.ROUND_DOWN = 1, Q.ROUND_CEIL = 2, Q.ROUND_FLOOR = 3, Q.ROUND_HALF_UP = 4, Q.ROUND_HALF_DOWN = 5, Q.ROUND_HALF_EVEN = 6, Q.ROUND_HALF_CEIL = 7, Q.ROUND_HALF_FLOOR = 8, Q.EUCLID = 9, Q.config = Q.set = function(C) {
    var v, x;
    if (C != null)
      if (typeof C == "object") {
        if (C.hasOwnProperty(v = "DECIMAL_PLACES") && (x = C[v], _t(x, 0, je, v), u = x), C.hasOwnProperty(v = "ROUNDING_MODE") && (x = C[v], _t(x, 0, 8, v), h = x), C.hasOwnProperty(v = "EXPONENTIAL_AT") && (x = C[v], x && x.pop ? (_t(x[0], -1e9, 0, v), _t(x[1], 0, je, v), A = x[0], E = x[1]) : (_t(x, -1e9, je, v), A = -(E = x < 0 ? -x : x))), C.hasOwnProperty(v = "RANGE"))
          if (x = C[v], x && x.pop)
            _t(x[0], -1e9, -1, v), _t(x[1], 1, je, v), S = x[0], N = x[1];
          else if (_t(x, -1e9, je, v), x)
            S = -(N = x < 0 ? -x : x);
          else
            throw Error(Re + v + " cannot be zero: " + x);
        if (C.hasOwnProperty(v = "CRYPTO"))
          if (x = C[v], x === !!x)
            if (x)
              if (typeof crypto < "u" && crypto && (crypto.getRandomValues || crypto.randomBytes))
                P = x;
              else
                throw P = !x, Error(Re + "crypto unavailable");
            else
              P = x;
          else
            throw Error(Re + v + " not true or false: " + x);
        if (C.hasOwnProperty(v = "MODULO_MODE") && (x = C[v], _t(x, 0, 9, v), U = x), C.hasOwnProperty(v = "POW_PRECISION") && (x = C[v], _t(x, 0, je, v), F = x), C.hasOwnProperty(v = "FORMAT"))
          if (x = C[v], typeof x == "object") O = x;
          else throw Error(Re + v + " not an object: " + x);
        if (C.hasOwnProperty(v = "ALPHABET"))
          if (x = C[v], typeof x == "string" && !/^.?$|[+\-.\s]|(.).*\1/.test(x))
            Y = x.slice(0, 10) == "0123456789", L = x;
          else
            throw Error(Re + v + " invalid: " + x);
      } else
        throw Error(Re + "Object expected: " + C);
    return {
      DECIMAL_PLACES: u,
      ROUNDING_MODE: h,
      EXPONENTIAL_AT: [A, E],
      RANGE: [S, N],
      CRYPTO: P,
      MODULO_MODE: U,
      POW_PRECISION: F,
      FORMAT: O,
      ALPHABET: L
    };
  }, Q.isBigNumber = function(C) {
    if (!C || C._isBigNumber !== !0) return !1;
    if (!Q.DEBUG) return !0;
    var v, x, D = C.c, R = C.e, b = C.s;
    t: if ({}.toString.call(D) == "[object Array]") {
      if ((b === 1 || b === -1) && R >= -1e9 && R <= je && R === We(R)) {
        if (D[0] === 0) {
          if (R === 0 && D.length === 1) return !0;
          break t;
        }
        if (v = (R + 1) % It, v < 1 && (v += It), String(D[0]).length == v) {
          for (v = 0; v < D.length; v++)
            if (x = D[v], x < 0 || x >= Ye || x !== We(x)) break t;
          if (x !== 0) return !0;
        }
      }
    } else if (D === null && R === null && (b === null || b === 1 || b === -1))
      return !0;
    throw Error(Re + "Invalid BigNumber: " + C);
  }, Q.maximum = Q.max = function() {
    return K(arguments, -1);
  }, Q.minimum = Q.min = function() {
    return K(arguments, 1);
  }, Q.random = function() {
    var C = 9007199254740992, v = Math.random() * C & 2097151 ? function() {
      return We(Math.random() * C);
    } : function() {
      return (Math.random() * 1073741824 | 0) * 8388608 + (Math.random() * 8388608 | 0);
    };
    return function(x) {
      var D, R, b, l, d, p = 0, m = [], w = new Q(s);
      if (x == null ? x = u : _t(x, 0, je), l = is(x / It), P)
        if (crypto.getRandomValues) {
          for (D = crypto.getRandomValues(new Uint32Array(l *= 2)); p < l; )
            d = D[p] * 131072 + (D[p + 1] >>> 11), d >= 9e15 ? (R = crypto.getRandomValues(new Uint32Array(2)), D[p] = R[0], D[p + 1] = R[1]) : (m.push(d % 1e14), p += 2);
          p = l / 2;
        } else if (crypto.randomBytes) {
          for (D = crypto.randomBytes(l *= 7); p < l; )
            d = (D[p] & 31) * 281474976710656 + D[p + 1] * 1099511627776 + D[p + 2] * 4294967296 + D[p + 3] * 16777216 + (D[p + 4] << 16) + (D[p + 5] << 8) + D[p + 6], d >= 9e15 ? crypto.randomBytes(7).copy(D, p) : (m.push(d % 1e14), p += 7);
          p = l / 7;
        } else
          throw P = !1, Error(Re + "crypto unavailable");
      if (!P)
        for (; p < l; )
          d = v(), d < 9e15 && (m[p++] = d % 1e14);
      for (l = m[--p], x %= It, l && x && (d = ss[It - x], m[p] = We(l / d) * d); m[p] === 0; m.pop(), p--) ;
      if (p < 0)
        m = [b = 0];
      else {
        for (b = -1; m[0] === 0; m.splice(0, 1), b -= It) ;
        for (p = 1, d = m[0]; d >= 10; d /= 10, p++) ;
        p < It && (b -= It - p);
      }
      return w.e = b, w.c = m, w;
    };
  }(), Q.sum = function() {
    for (var C = 1, v = arguments, x = new Q(v[0]); C < v.length; ) x = x.plus(v[C++]);
    return x;
  }, e = /* @__PURE__ */ function() {
    var C = "0123456789";
    function v(x, D, R, b) {
      for (var l, d = [0], p, m = 0, w = x.length; m < w; ) {
        for (p = d.length; p--; d[p] *= D) ;
        for (d[0] += b.indexOf(x.charAt(m++)), l = 0; l < d.length; l++)
          d[l] > R - 1 && (d[l + 1] == null && (d[l + 1] = 0), d[l + 1] += d[l] / R | 0, d[l] %= R);
      }
      return d.reverse();
    }
    return function(x, D, R, b, l) {
      var d, p, m, w, B, z, I, f, g = x.indexOf("."), M = u, T = h;
      for (g >= 0 && (w = F, F = 0, x = x.replace(".", ""), f = new Q(D), z = f.pow(x.length - g), F = w, f.c = v(
        an(He(z.c), z.e, "0"),
        10,
        R,
        C
      ), f.e = f.c.length), I = v(x, D, R, l ? (d = L, C) : (d = C, L)), m = w = I.length; I[--w] == 0; I.pop()) ;
      if (!I[0]) return d.charAt(0);
      if (g < 0 ? --m : (z.c = I, z.e = m, z.s = b, z = t(z, f, M, T, R), I = z.c, B = z.r, m = z.e), p = m + M + 1, g = I[p], w = R / 2, B = B || p < 0 || I[p + 1] != null, B = T < 4 ? (g != null || B) && (T == 0 || T == (z.s < 0 ? 3 : 2)) : g > w || g == w && (T == 4 || B || T == 6 && I[p - 1] & 1 || T == (z.s < 0 ? 8 : 7)), p < 1 || !I[0])
        x = B ? an(d.charAt(1), -M, d.charAt(0)) : d.charAt(0);
      else {
        if (I.length = p, B)
          for (--R; ++I[--p] > R; )
            I[p] = 0, p || (++m, I = [1].concat(I));
        for (w = I.length; !I[--w]; ) ;
        for (g = 0, x = ""; g <= w; x += d.charAt(I[g++])) ;
        x = an(x, m, d.charAt(0));
      }
      return x;
    };
  }(), t = /* @__PURE__ */ function() {
    function C(D, R, b) {
      var l, d, p, m, w = 0, B = D.length, z = R % En, I = R / En | 0;
      for (D = D.slice(); B--; )
        p = D[B] % En, m = D[B] / En | 0, l = I * p + m * z, d = z * p + l % En * En + w, w = (d / b | 0) + (l / En | 0) + I * m, D[B] = d % b;
      return w && (D = [w].concat(D)), D;
    }
    function v(D, R, b, l) {
      var d, p;
      if (b != l)
        p = b > l ? 1 : -1;
      else
        for (d = p = 0; d < b; d++)
          if (D[d] != R[d]) {
            p = D[d] > R[d] ? 1 : -1;
            break;
          }
      return p;
    }
    function x(D, R, b, l) {
      for (var d = 0; b--; )
        D[b] -= d, d = D[b] < R[b] ? 1 : 0, D[b] = d * l + D[b] - R[b];
      for (; !D[0] && D.length > 1; D.splice(0, 1)) ;
    }
    return function(D, R, b, l, d) {
      var p, m, w, B, z, I, f, g, M, T, W, J, tt, st, xt, gt, bt, Et = D.s == R.s ? 1 : -1, ht = D.c, wt = R.c;
      if (!ht || !ht[0] || !wt || !wt[0])
        return new Q(
          // Return NaN if either NaN, or both Infinity or 0.
          !D.s || !R.s || (ht ? wt && ht[0] == wt[0] : !wt) ? NaN : (
            // Return ±0 if x is ±0 or y is ±Infinity, or return ±Infinity as y is ±0.
            ht && ht[0] == 0 || !wt ? Et * 0 : Et / 0
          )
        );
      for (g = new Q(Et), M = g.c = [], m = D.e - R.e, Et = b + m + 1, d || (d = Ye, m = qe(D.e / It) - qe(R.e / It), Et = Et / It | 0), w = 0; wt[w] == (ht[w] || 0); w++) ;
      if (wt[w] > (ht[w] || 0) && m--, Et < 0)
        M.push(1), B = !0;
      else {
        for (st = ht.length, gt = wt.length, w = 0, Et += 2, z = We(d / (wt[0] + 1)), z > 1 && (wt = C(wt, z, d), ht = C(ht, z, d), gt = wt.length, st = ht.length), tt = gt, T = ht.slice(0, gt), W = T.length; W < gt; T[W++] = 0) ;
        bt = wt.slice(), bt = [0].concat(bt), xt = wt[0], wt[1] >= d / 2 && xt++;
        do {
          if (z = 0, p = v(wt, T, gt, W), p < 0) {
            if (J = T[0], gt != W && (J = J * d + (T[1] || 0)), z = We(J / xt), z > 1)
              for (z >= d && (z = d - 1), I = C(wt, z, d), f = I.length, W = T.length; v(I, T, f, W) == 1; )
                z--, x(I, gt < f ? bt : wt, f, d), f = I.length, p = 1;
            else
              z == 0 && (p = z = 1), I = wt.slice(), f = I.length;
            if (f < W && (I = [0].concat(I)), x(T, I, W, d), W = T.length, p == -1)
              for (; v(wt, T, gt, W) < 1; )
                z++, x(T, gt < W ? bt : wt, W, d), W = T.length;
          } else p === 0 && (z++, T = [0]);
          M[w++] = z, T[0] ? T[W++] = ht[tt] || 0 : (T = [ht[tt]], W = 1);
        } while ((tt++ < st || T[0] != null) && Et--);
        B = T[0] != null, M[0] || M.splice(0, 1);
      }
      if (d == Ye) {
        for (w = 1, Et = M[0]; Et >= 10; Et /= 10, w++) ;
        X(g, b + (g.e = w + m * It - 1) + 1, l, B);
      } else
        g.e = m, g.r = +B;
      return g;
    };
  }();
  function q(C, v, x, D) {
    var R, b, l, d, p;
    if (x == null ? x = h : _t(x, 0, 8), !C.c) return C.toString();
    if (R = C.c[0], l = C.e, v == null)
      p = He(C.c), p = D == 1 || D == 2 && (l <= A || l >= E) ? qr(p, l) : an(p, l, "0");
    else if (C = X(new Q(C), v, x), b = C.e, p = He(C.c), d = p.length, D == 1 || D == 2 && (v <= b || b <= A)) {
      for (; d < v; p += "0", d++) ;
      p = qr(p, b);
    } else if (v -= l, p = an(p, b, "0"), b + 1 > d) {
      if (--v > 0) for (p += "."; v--; p += "0") ;
    } else if (v += b - d, v > 0)
      for (b + 1 == d && (p += "."); v--; p += "0") ;
    return C.s < 0 && R ? "-" + p : p;
  }
  function K(C, v) {
    for (var x, D, R = 1, b = new Q(C[0]); R < C.length; R++)
      D = new Q(C[R]), (!D.s || (x = jn(b, D)) === v || x === 0 && b.s === v) && (b = D);
    return b;
  }
  function V(C, v, x) {
    for (var D = 1, R = v.length; !v[--R]; v.pop()) ;
    for (R = v[0]; R >= 10; R /= 10, D++) ;
    return (x = D + x * It - 1) > N ? C.c = C.e = null : x < S ? C.c = [C.e = 0] : (C.e = x, C.c = v), C;
  }
  n = /* @__PURE__ */ function() {
    var C = /^(-?)0([xbo])(?=\w[\w.]*$)/i, v = /^([^.]+)\.$/, x = /^\.([^.]+)$/, D = /^-?(Infinity|NaN)$/, R = /^\s*\+(?=[\w.])|^\s+|\s+$/g;
    return function(b, l, d, p) {
      var m, w = d ? l : l.replace(R, "");
      if (D.test(w))
        b.s = isNaN(w) ? null : w < 0 ? -1 : 1;
      else {
        if (!d && (w = w.replace(C, function(B, z, I) {
          return m = (I = I.toLowerCase()) == "x" ? 16 : I == "b" ? 2 : 8, !p || p == m ? z : B;
        }), p && (m = p, w = w.replace(v, "$1").replace(x, "0.$1")), l != w))
          return new Q(w, m);
        if (Q.DEBUG)
          throw Error(Re + "Not a" + (p ? " base " + p : "") + " number: " + l);
        b.s = null;
      }
      b.c = b.e = null;
    };
  }();
  function X(C, v, x, D) {
    var R, b, l, d, p, m, w, B = C.c, z = ss;
    if (B) {
      t: {
        for (R = 1, d = B[0]; d >= 10; d /= 10, R++) ;
        if (b = v - R, b < 0)
          b += It, l = v, p = B[m = 0], w = We(p / z[R - l - 1] % 10);
        else if (m = is((b + 1) / It), m >= B.length)
          if (D) {
            for (; B.length <= m; B.push(0)) ;
            p = w = 0, R = 1, b %= It, l = b - It + 1;
          } else
            break t;
        else {
          for (p = d = B[m], R = 1; d >= 10; d /= 10, R++) ;
          b %= It, l = b - It + R, w = l < 0 ? 0 : We(p / z[R - l - 1] % 10);
        }
        if (D = D || v < 0 || // Are there any non-zero digits after the rounding digit?
        // The expression  n % pows10[d - j - 1]  returns all digits of n to the right
        // of the digit at j, e.g. if n is 908714 and j is 2, the expression gives 714.
        B[m + 1] != null || (l < 0 ? p : p % z[R - l - 1]), D = x < 4 ? (w || D) && (x == 0 || x == (C.s < 0 ? 3 : 2)) : w > 5 || w == 5 && (x == 4 || D || x == 6 && // Check whether the digit to the left of the rounding digit is odd.
        (b > 0 ? l > 0 ? p / z[R - l] : 0 : B[m - 1]) % 10 & 1 || x == (C.s < 0 ? 8 : 7)), v < 1 || !B[0])
          return B.length = 0, D ? (v -= C.e + 1, B[0] = z[(It - v % It) % It], C.e = -v || 0) : B[0] = C.e = 0, C;
        if (b == 0 ? (B.length = m, d = 1, m--) : (B.length = m + 1, d = z[It - b], B[m] = l > 0 ? We(p / z[R - l] % z[l]) * d : 0), D)
          for (; ; )
            if (m == 0) {
              for (b = 1, l = B[0]; l >= 10; l /= 10, b++) ;
              for (l = B[0] += d, d = 1; l >= 10; l /= 10, d++) ;
              b != d && (C.e++, B[0] == Ye && (B[0] = 1));
              break;
            } else {
              if (B[m] += d, B[m] != Ye) break;
              B[m--] = 0, d = 1;
            }
        for (b = B.length; B[--b] === 0; B.pop()) ;
      }
      C.e > N ? C.c = C.e = null : C.e < S && (C.c = [C.e = 0]);
    }
    return C;
  }
  function nt(C) {
    var v, x = C.e;
    return x === null ? C.toString() : (v = He(C.c), v = x <= A || x >= E ? qr(v, x) : an(v, x, "0"), C.s < 0 ? "-" + v : v);
  }
  return i.absoluteValue = i.abs = function() {
    var C = new Q(this);
    return C.s < 0 && (C.s = 1), C;
  }, i.comparedTo = function(C, v) {
    return jn(this, new Q(C, v));
  }, i.decimalPlaces = i.dp = function(C, v) {
    var x, D, R, b = this;
    if (C != null)
      return _t(C, 0, je), v == null ? v = h : _t(v, 0, 8), X(new Q(b), C + b.e + 1, v);
    if (!(x = b.c)) return null;
    if (D = ((R = x.length - 1) - qe(this.e / It)) * It, R = x[R]) for (; R % 10 == 0; R /= 10, D--) ;
    return D < 0 && (D = 0), D;
  }, i.dividedBy = i.div = function(C, v) {
    return t(this, new Q(C, v), u, h);
  }, i.dividedToIntegerBy = i.idiv = function(C, v) {
    return t(this, new Q(C, v), 0, 1);
  }, i.exponentiatedBy = i.pow = function(C, v) {
    var x, D, R, b, l, d, p, m, w, B = this;
    if (C = new Q(C), C.c && !C.isInteger())
      throw Error(Re + "Exponent not an integer: " + nt(C));
    if (v != null && (v = new Q(v)), d = C.e > 14, !B.c || !B.c[0] || B.c[0] == 1 && !B.e && B.c.length == 1 || !C.c || !C.c[0])
      return w = new Q(Math.pow(+nt(B), d ? C.s * (2 - Wr(C)) : +nt(C))), v ? w.mod(v) : w;
    if (p = C.s < 0, v) {
      if (v.c ? !v.c[0] : !v.s) return new Q(NaN);
      D = !p && B.isInteger() && v.isInteger(), D && (B = B.mod(v));
    } else {
      if (C.e > 9 && (B.e > 0 || B.e < -1 || (B.e == 0 ? B.c[0] > 1 || d && B.c[1] >= 24e7 : B.c[0] < 8e13 || d && B.c[0] <= 9999975e7)))
        return b = B.s < 0 && Wr(C) ? -0 : 0, B.e > -1 && (b = 1 / b), new Q(p ? 1 / b : b);
      F && (b = is(F / It + 2));
    }
    for (d ? (x = new Q(0.5), p && (C.s = 1), m = Wr(C)) : (R = Math.abs(+nt(C)), m = R % 2), w = new Q(s); ; ) {
      if (m) {
        if (w = w.times(B), !w.c) break;
        b ? w.c.length > b && (w.c.length = b) : D && (w = w.mod(v));
      }
      if (R) {
        if (R = We(R / 2), R === 0) break;
        m = R % 2;
      } else if (C = C.times(x), X(C, C.e + 1, 1), C.e > 14)
        m = Wr(C);
      else {
        if (R = +nt(C), R === 0) break;
        m = R % 2;
      }
      B = B.times(B), b ? B.c && B.c.length > b && (B.c.length = b) : D && (B = B.mod(v));
    }
    return D ? w : (p && (w = s.div(w)), v ? w.mod(v) : b ? X(w, F, h, l) : w);
  }, i.integerValue = function(C) {
    var v = new Q(this);
    return C == null ? C = h : _t(C, 0, 8), X(v, v.e + 1, C);
  }, i.isEqualTo = i.eq = function(C, v) {
    return jn(this, new Q(C, v)) === 0;
  }, i.isFinite = function() {
    return !!this.c;
  }, i.isGreaterThan = i.gt = function(C, v) {
    return jn(this, new Q(C, v)) > 0;
  }, i.isGreaterThanOrEqualTo = i.gte = function(C, v) {
    return (v = jn(this, new Q(C, v))) === 1 || v === 0;
  }, i.isInteger = function() {
    return !!this.c && qe(this.e / It) > this.c.length - 2;
  }, i.isLessThan = i.lt = function(C, v) {
    return jn(this, new Q(C, v)) < 0;
  }, i.isLessThanOrEqualTo = i.lte = function(C, v) {
    return (v = jn(this, new Q(C, v))) === -1 || v === 0;
  }, i.isNaN = function() {
    return !this.s;
  }, i.isNegative = function() {
    return this.s < 0;
  }, i.isPositive = function() {
    return this.s > 0;
  }, i.isZero = function() {
    return !!this.c && this.c[0] == 0;
  }, i.minus = function(C, v) {
    var x, D, R, b, l = this, d = l.s;
    if (C = new Q(C, v), v = C.s, !d || !v) return new Q(NaN);
    if (d != v)
      return C.s = -v, l.plus(C);
    var p = l.e / It, m = C.e / It, w = l.c, B = C.c;
    if (!p || !m) {
      if (!w || !B) return w ? (C.s = -v, C) : new Q(B ? l : NaN);
      if (!w[0] || !B[0])
        return B[0] ? (C.s = -v, C) : new Q(w[0] ? l : (
          // IEEE 754 (2008) 6.3: n - n = -0 when rounding to -Infinity
          h == 3 ? -0 : 0
        ));
    }
    if (p = qe(p), m = qe(m), w = w.slice(), d = p - m) {
      for ((b = d < 0) ? (d = -d, R = w) : (m = p, R = B), R.reverse(), v = d; v--; R.push(0)) ;
      R.reverse();
    } else
      for (D = (b = (d = w.length) < (v = B.length)) ? d : v, d = v = 0; v < D; v++)
        if (w[v] != B[v]) {
          b = w[v] < B[v];
          break;
        }
    if (b && (R = w, w = B, B = R, C.s = -C.s), v = (D = B.length) - (x = w.length), v > 0) for (; v--; w[x++] = 0) ;
    for (v = Ye - 1; D > d; ) {
      if (w[--D] < B[D]) {
        for (x = D; x && !w[--x]; w[x] = v) ;
        --w[x], w[D] += Ye;
      }
      w[D] -= B[D];
    }
    for (; w[0] == 0; w.splice(0, 1), --m) ;
    return w[0] ? V(C, w, m) : (C.s = h == 3 ? -1 : 1, C.c = [C.e = 0], C);
  }, i.modulo = i.mod = function(C, v) {
    var x, D, R = this;
    return C = new Q(C, v), !R.c || !C.s || C.c && !C.c[0] ? new Q(NaN) : !C.c || R.c && !R.c[0] ? new Q(R) : (U == 9 ? (D = C.s, C.s = 1, x = t(R, C, 0, 3), C.s = D, x.s *= D) : x = t(R, C, 0, U), C = R.minus(x.times(C)), !C.c[0] && U == 1 && (C.s = R.s), C);
  }, i.multipliedBy = i.times = function(C, v) {
    var x, D, R, b, l, d, p, m, w, B, z, I, f, g, M, T = this, W = T.c, J = (C = new Q(C, v)).c;
    if (!W || !J || !W[0] || !J[0])
      return !T.s || !C.s || W && !W[0] && !J || J && !J[0] && !W ? C.c = C.e = C.s = null : (C.s *= T.s, !W || !J ? C.c = C.e = null : (C.c = [0], C.e = 0)), C;
    for (D = qe(T.e / It) + qe(C.e / It), C.s *= T.s, p = W.length, B = J.length, p < B && (f = W, W = J, J = f, R = p, p = B, B = R), R = p + B, f = []; R--; f.push(0)) ;
    for (g = Ye, M = En, R = B; --R >= 0; ) {
      for (x = 0, z = J[R] % M, I = J[R] / M | 0, l = p, b = R + l; b > R; )
        m = W[--l] % M, w = W[l] / M | 0, d = I * m + w * z, m = z * m + d % M * M + f[b] + x, x = (m / g | 0) + (d / M | 0) + I * w, f[b--] = m % g;
      f[b] = x;
    }
    return x ? ++D : f.splice(0, 1), V(C, f, D);
  }, i.negated = function() {
    var C = new Q(this);
    return C.s = -C.s || null, C;
  }, i.plus = function(C, v) {
    var x, D = this, R = D.s;
    if (C = new Q(C, v), v = C.s, !R || !v) return new Q(NaN);
    if (R != v)
      return C.s = -v, D.minus(C);
    var b = D.e / It, l = C.e / It, d = D.c, p = C.c;
    if (!b || !l) {
      if (!d || !p) return new Q(R / 0);
      if (!d[0] || !p[0]) return p[0] ? C : new Q(d[0] ? D : R * 0);
    }
    if (b = qe(b), l = qe(l), d = d.slice(), R = b - l) {
      for (R > 0 ? (l = b, x = p) : (R = -R, x = d), x.reverse(); R--; x.push(0)) ;
      x.reverse();
    }
    for (R = d.length, v = p.length, R - v < 0 && (x = p, p = d, d = x, v = R), R = 0; v; )
      R = (d[--v] = d[v] + p[v] + R) / Ye | 0, d[v] = Ye === d[v] ? 0 : d[v] % Ye;
    return R && (d = [R].concat(d), ++l), V(C, d, l);
  }, i.precision = i.sd = function(C, v) {
    var x, D, R, b = this;
    if (C != null && C !== !!C)
      return _t(C, 1, je), v == null ? v = h : _t(v, 0, 8), X(new Q(b), C, v);
    if (!(x = b.c)) return null;
    if (R = x.length - 1, D = R * It + 1, R = x[R]) {
      for (; R % 10 == 0; R /= 10, D--) ;
      for (R = x[0]; R >= 10; R /= 10, D++) ;
    }
    return C && b.e + 1 > D && (D = b.e + 1), D;
  }, i.shiftedBy = function(C) {
    return _t(C, -9007199254740991, qo), this.times("1e" + C);
  }, i.squareRoot = i.sqrt = function() {
    var C, v, x, D, R, b = this, l = b.c, d = b.s, p = b.e, m = u + 4, w = new Q("0.5");
    if (d !== 1 || !l || !l[0])
      return new Q(!d || d < 0 && (!l || l[0]) ? NaN : l ? b : 1 / 0);
    if (d = Math.sqrt(+nt(b)), d == 0 || d == 1 / 0 ? (v = He(l), (v.length + p) % 2 == 0 && (v += "0"), d = Math.sqrt(+v), p = qe((p + 1) / 2) - (p < 0 || p % 2), d == 1 / 0 ? v = "5e" + p : (v = d.toExponential(), v = v.slice(0, v.indexOf("e") + 1) + p), x = new Q(v)) : x = new Q(d + ""), x.c[0]) {
      for (p = x.e, d = p + m, d < 3 && (d = 0); ; )
        if (R = x, x = w.times(R.plus(t(b, R, m, 1))), He(R.c).slice(0, d) === (v = He(x.c)).slice(0, d))
          if (x.e < p && --d, v = v.slice(d - 3, d + 1), v == "9999" || !D && v == "4999") {
            if (!D && (X(R, R.e + u + 2, 0), R.times(R).eq(b))) {
              x = R;
              break;
            }
            m += 4, d += 4, D = 1;
          } else {
            (!+v || !+v.slice(1) && v.charAt(0) == "5") && (X(x, x.e + u + 2, 1), C = !x.times(x).eq(b));
            break;
          }
    }
    return X(x, x.e + u + 1, h, C);
  }, i.toExponential = function(C, v) {
    return C != null && (_t(C, 0, je), C++), q(this, C, v, 1);
  }, i.toFixed = function(C, v) {
    return C != null && (_t(C, 0, je), C = C + this.e + 1), q(this, C, v);
  }, i.toFormat = function(C, v, x) {
    var D, R = this;
    if (x == null)
      C != null && v && typeof v == "object" ? (x = v, v = null) : C && typeof C == "object" ? (x = C, C = v = null) : x = O;
    else if (typeof x != "object")
      throw Error(Re + "Argument not an object: " + x);
    if (D = R.toFixed(C, v), R.c) {
      var b, l = D.split("."), d = +x.groupSize, p = +x.secondaryGroupSize, m = x.groupSeparator || "", w = l[0], B = l[1], z = R.s < 0, I = z ? w.slice(1) : w, f = I.length;
      if (p && (b = d, d = p, p = b, f -= b), d > 0 && f > 0) {
        for (b = f % d || d, w = I.substr(0, b); b < f; b += d) w += m + I.substr(b, d);
        p > 0 && (w += m + I.slice(b)), z && (w = "-" + w);
      }
      D = B ? w + (x.decimalSeparator || "") + ((p = +x.fractionGroupSize) ? B.replace(
        new RegExp("\\d{" + p + "}\\B", "g"),
        "$&" + (x.fractionGroupSeparator || "")
      ) : B) : w;
    }
    return (x.prefix || "") + D + (x.suffix || "");
  }, i.toFraction = function(C) {
    var v, x, D, R, b, l, d, p, m, w, B, z, I = this, f = I.c;
    if (C != null && (d = new Q(C), !d.isInteger() && (d.c || d.s !== 1) || d.lt(s)))
      throw Error(Re + "Argument " + (d.isInteger() ? "out of range: " : "not an integer: ") + nt(d));
    if (!f) return new Q(I);
    for (v = new Q(s), m = x = new Q(s), D = p = new Q(s), z = He(f), b = v.e = z.length - I.e - 1, v.c[0] = ss[(l = b % It) < 0 ? It + l : l], C = !C || d.comparedTo(v) > 0 ? b > 0 ? v : m : d, l = N, N = 1 / 0, d = new Q(z), p.c[0] = 0; w = t(d, v, 0, 1), R = x.plus(w.times(D)), R.comparedTo(C) != 1; )
      x = D, D = R, m = p.plus(w.times(R = m)), p = R, v = d.minus(w.times(R = v)), d = R;
    return R = t(C.minus(x), D, 0, 1), p = p.plus(R.times(m)), x = x.plus(R.times(D)), p.s = m.s = I.s, b = b * 2, B = t(m, D, b, h).minus(I).abs().comparedTo(
      t(p, x, b, h).minus(I).abs()
    ) < 1 ? [m, D] : [p, x], N = l, B;
  }, i.toNumber = function() {
    return +nt(this);
  }, i.toPrecision = function(C, v) {
    return C != null && _t(C, 1, je), q(this, C, v, 2);
  }, i.toString = function(C) {
    var v, x = this, D = x.s, R = x.e;
    return R === null ? D ? (v = "Infinity", D < 0 && (v = "-" + v)) : v = "NaN" : (C == null ? v = R <= A || R >= E ? qr(He(x.c), R) : an(He(x.c), R, "0") : C === 10 && Y ? (x = X(new Q(x), u + R + 1, h), v = an(He(x.c), x.e, "0")) : (_t(C, 2, L.length, "Base"), v = e(an(He(x.c), R, "0"), 10, C, D, !0)), D < 0 && x.c[0] && (v = "-" + v)), v;
  }, i.valueOf = i.toJSON = function() {
    return nt(this);
  }, i._isBigNumber = !0, i[Symbol.toStringTag] = "BigNumber", i[Symbol.for("nodejs.util.inspect.custom")] = i.valueOf, r != null && Q.set(r), Q;
}
function qe(r) {
  var t = r | 0;
  return r > 0 || r === t ? t : t - 1;
}
function He(r) {
  for (var t, e, n = 1, i = r.length, s = r[0] + ""; n < i; ) {
    for (t = r[n++] + "", e = It - t.length; e--; t = "0" + t) ;
    s += t;
  }
  for (i = s.length; s.charCodeAt(--i) === 48; ) ;
  return s.slice(0, i + 1 || 1);
}
function jn(r, t) {
  var e, n, i = r.c, s = t.c, u = r.s, h = t.s, A = r.e, E = t.e;
  if (!u || !h) return null;
  if (e = i && !i[0], n = s && !s[0], e || n) return e ? n ? 0 : -h : u;
  if (u != h) return u;
  if (e = u < 0, n = A == E, !i || !s) return n ? 0 : !i ^ e ? 1 : -1;
  if (!n) return A > E ^ e ? 1 : -1;
  for (h = (A = i.length) < (E = s.length) ? A : E, u = 0; u < h; u++) if (i[u] != s[u]) return i[u] > s[u] ^ e ? 1 : -1;
  return A == E ? 0 : A > E ^ e ? 1 : -1;
}
function _t(r, t, e, n) {
  if (r < t || r > e || r !== We(r))
    throw Error(Re + (n || "Argument") + (typeof r == "number" ? r < t || r > e ? " out of range: " : " not an integer: " : " not a primitive number: ") + String(r));
}
function Wr(r) {
  var t = r.c.length - 1;
  return qe(r.e / It) == t && r.c[t] % 2 != 0;
}
function qr(r, t) {
  return (r.length > 1 ? r.charAt(0) + "." + r.slice(1) : r) + (t < 0 ? "e" : "e+") + t;
}
function an(r, t, e) {
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
Ja();
const Ju = (r) => {
  const t = Vc.decode(r), e = new Xc(0);
  return e._value = BigInt(t.ingress_expiry.toString(10)), Object.assign(Object.assign({}, t), { canister_id: pe.from(t.canister_id), ingress_expiry: e });
};
var Ku = function(r, t, e, n) {
  if (e === "a" && !n) throw new TypeError("Private accessor was defined without a getter");
  if (typeof t == "function" ? r !== t || !n : !t.has(r)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
  return e === "m" ? n : e === "a" ? n.call(r) : n ? n.value : t.get(r);
}, Vu = function(r, t, e, n, i) {
  if (n === "m") throw new TypeError("Private method is not writable");
  if (n === "a" && !i) throw new TypeError("Private accessor was defined without a setter");
  if (typeof t == "function" ? r !== t || !i : !t.has(r)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
  return n === "a" ? i.call(r, e) : i ? i.value = e : t.set(r, e), e;
}, ti;
class Xu {
  constructor() {
    ti.set(this, Promise.resolve());
  }
  async schedule(t) {
    return new Promise((e, n) => {
      Vu(this, ti, Ku(this, ti, "f").finally(async () => {
        try {
          e(await t());
        } catch (i) {
          n(i);
        }
      }), "f");
    });
  }
}
ti = /* @__PURE__ */ new WeakMap();
var Tt = function(r, t, e, n) {
  if (e === "a" && !n) throw new TypeError("Private accessor was defined without a getter");
  if (typeof t == "function" ? r !== t || !n : !t.has(r)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
  return e === "m" ? n : e === "a" ? n.call(r) : n ? n.value : t.get(r);
}, Ve = function(r, t, e, n, i) {
  if (n === "m") throw new TypeError("Private method is not writable");
  if (n === "a" && !i) throw new TypeError("Private accessor was defined without a setter");
  if (typeof t == "function" ? r !== t || !i : !t.has(r)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
  return n === "a" ? i.call(r, e) : i ? i.value = e : t.set(r, e), e;
}, Er, Ze, Ir, De, $n, kr, ei, zn, vr, Sr, Ls, Ka;
const $u = new Uint8Array(ru.match(/[\da-f]{2}/gi).map((r) => parseInt(r, 16))).buffer, Yo = 5, tr = "Received invalid response from signer";
class ze extends Error {
  constructor(t) {
    super(t), Object.setPrototypeOf(this, ze.prototype);
  }
}
class sr {
  constructor(t) {
    Er.add(this), De.set(this, void 0), $n.set(this, /* @__PURE__ */ new Map()), kr.set(this, new Xu()), ei.set(this, void 0), zn.set(this, [[]]), vr.set(this, !0), Sr.set(this, void 0);
    const e = !Tt(Ze, Ze, "f", Ir);
    if (Ve(Ze, Ze, !1, "f", Ir), e)
      throw new ze("SignerAgent is not constructable");
    Ve(this, De, t, "f");
  }
  get rootKey() {
    var t;
    return (t = Tt(this, De, "f").agent.rootKey) !== null && t !== void 0 ? t : $u;
  }
  get signer() {
    return Tt(this, De, "f").signer;
  }
  static async create(t) {
    var e, n, i;
    return Ve(Ze, Ze, !0, "f", Ir), new Ze(Object.assign(Object.assign({}, t), { agent: (e = t.agent) !== null && e !== void 0 ? e : await _e.create(), scheduleDelay: (n = t.scheduleDelay) !== null && n !== void 0 ? n : 20, validation: (i = t.validation) !== null && i !== void 0 ? i : null }));
  }
  static createSync(t) {
    var e, n, i;
    return Ve(Ze, Ze, !0, "f", Ir), new Ze(Object.assign(Object.assign({}, t), { agent: (e = t.agent) !== null && e !== void 0 ? e : _e.createSync(), scheduleDelay: (n = t.scheduleDelay) !== null && n !== void 0 ? n : 20, validation: (i = t.validation) !== null && i !== void 0 ? i : null }));
  }
  async execute() {
    const t = [...Tt(this, zn, "f")], e = Tt(this, Sr, "f");
    this.clear();
    const n = t.flat().length;
    if (n === 0) {
      Ve(this, Sr, void 0, "f");
      return;
    }
    if (!(n > 1)) {
      await Tt(this, Er, "m", Ls).call(this, t);
      return;
    }
    (await Tt(this, kr, "f").schedule(() => this.signer.supportedStandards())).some((h) => h.name === "ICRC-112") ? await Tt(this, Er, "m", Ka).call(this, t, e) : await Tt(this, Er, "m", Ls).call(this, t);
  }
  async call(t, e) {
    t = pe.from(t), await Tt(this, De, "f").signer.openChannel();
    const n = await new Promise((F, O) => {
      clearTimeout(Tt(this, ei, "f")), Tt(this, zn, "f").slice(-1)[0].push({
        options: {
          canisterId: t,
          method: e.methodName,
          arg: e.arg
        },
        resolve: F,
        reject: O
      }), Tt(this, vr, "f") && Ve(this, ei, setTimeout(() => this.execute(), Tt(this, De, "f").scheduleDelay), "f");
    }), i = Ju(n.contentMap);
    if (!($c.Call === i.request_type && t.compareTo(i.canister_id) === "eq" && e.methodName === i.method_name && tu(e.arg, i.arg) === 0 && Tt(this, De, "f").account.compareTo(pe.from(i.sender)) === "eq"))
      throw new ze(tr);
    const u = eu(i), h = await Uo.create({
      certificate: n.certificate,
      rootKey: this.rootKey,
      canisterId: t,
      maxAgeInMinutes: Yo
    }).catch(() => {
      throw new ze(tr);
    });
    if (!(h.lookup(["request_status", u, "status"]).status === Xi.Found))
      throw new ze(tr);
    const E = Cr(u);
    if (Tt(this, $n, "f").has(E))
      throw new ze(tr);
    Tt(this, $n, "f").set(E, n.certificate);
    const S = Date.now(), N = nu(h.lookup(["time"]));
    if (!N)
      throw new ze(tr);
    const U = Number(lu(new hu(N))) / 1e6 - S + Yo * 60 * 1e3;
    return setTimeout(() => Tt(this, $n, "f").delete(E), U), {
      requestId: u,
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
    t = pe.from(t);
    const n = await this.call(t, e), i = await this.readState(t, {
      paths: [
        [new TextEncoder().encode("request_status"), n.requestId]
      ]
    }), s = await Uo.create({
      certificate: i.certificate,
      rootKey: this.rootKey,
      canisterId: t
    }), u = s.lookup([
      "request_status",
      n.requestId,
      "status"
    ]), h = s.lookup([
      "request_status",
      n.requestId,
      "reply"
    ]);
    if (u.status !== Xi.Found || new TextDecoder().decode(u.value) !== "replied" || h.status !== Xi.Found)
      throw new ze("Certificate is missing reply");
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
      throw new ze("Given paths are not supported");
    const s = e.paths[0][1], u = Cr(s), h = Tt(this, $n, "f").get(u);
    if (!h)
      throw new ze("Certificate could not be found");
    return { certificate: h };
  }
  async status() {
    return Tt(this, De, "f").agent.status();
  }
  replaceAccount(t) {
    Tt(this, De, "f").account = t;
  }
  replaceValidation(t) {
    Ve(this, Sr, t, "f");
  }
  /**
   * Enable manual triggering of canister calls execution
   */
  batch() {
    Ve(this, vr, !1, "f"), Tt(this, zn, "f").slice(-1)[0].length > 0 && Tt(this, zn, "f").push([]);
  }
  /**
   * Clear scheduled canister calls and switch back to automatic canister calls execution
   */
  clear() {
    Ve(this, zn, [[]], "f"), Ve(this, vr, !0, "f");
  }
}
Ze = sr, De = /* @__PURE__ */ new WeakMap(), $n = /* @__PURE__ */ new WeakMap(), kr = /* @__PURE__ */ new WeakMap(), ei = /* @__PURE__ */ new WeakMap(), zn = /* @__PURE__ */ new WeakMap(), vr = /* @__PURE__ */ new WeakMap(), Sr = /* @__PURE__ */ new WeakMap(), Er = /* @__PURE__ */ new WeakSet(), Ls = async function(t) {
  await Promise.all(t.flat().map(({ options: e, resolve: n, reject: i }) => Tt(this, kr, "f").schedule(async () => {
    try {
      const s = await this.signer.callCanister(Object.assign({ sender: Tt(this, De, "f").account }, e));
      n(s);
    } catch (s) {
      i(s);
    }
  })));
}, Ka = async function(t, e) {
  await Tt(this, kr, "f").schedule(async () => {
    try {
      const n = await this.signer.batchCallCanister({
        sender: Tt(this, De, "f").account,
        requests: t.map((i) => i.map(({ options: s }) => s)),
        validation: e ?? void 0
      });
      t.forEach((i, s) => i.forEach(({ resolve: u, reject: h }, A) => {
        const E = n[s][A];
        if ("result" in E) {
          u(E.result);
          return;
        }
        if ("error" in E) {
          h(new ze(`${E.error.code}: ${E.error.message}
${JSON.stringify(E.error.data)}`));
          return;
        }
        h(new ze(tr));
      }));
    } catch (n) {
      t.flat().forEach(({ reject: i }) => i(n));
    }
  });
};
Ir = { value: !1 };
const Nn = class Nn extends cr {
  constructor(t) {
    super(t), this.identity = null, this.sessionKey = null, this.walletName = Nn.walletName, this.logo = Nn.logo, this.unwrapResponse = (i) => {
      if ("error" in i)
        throw new An(i.error);
      if ("result" in i)
        return i.result;
      throw new An({
        code: 500,
        message: "Invalid response"
      });
    };
    const e = this.config.adapters?.nfid;
    this.url = e?.rpcUrl ?? "https://nfid.one/rpc", this.transport = new Ga({
      url: this.url,
      ...Nn.TRANSPORT_CONFIG
    }), this.signer = new qa({
      transport: this.transport
    });
    const n = _e.createSync({ host: this.url });
    this.signerAgent = sr.createSync({
      signer: this.signer,
      account: pe.anonymous(),
      // Start anonymous
      agent: n
    }), this.agent = _e.createSync({ host: this.url }), this.setState(At.Status.READY);
  }
  async isAvailable() {
    return !0;
  }
  async isConnected() {
    return this.identity !== null && this.state === At.Status.CONNECTED;
  }
  async getPrincipal() {
    if (!this.identity)
      throw new Error("NFID Adapter: Not connected. Call connect() first.");
    return this.identity.getPrincipal().toText();
  }
  async connect() {
    if (this.setState(At.Status.CONNECTING), !this.signer || !this.transport || !this.agent)
      throw this.setState(At.Status.ERROR), new Error("NFID Adapter not initialized correctly.");
    try {
      await this.signer.openChannel(), this.sessionKey = Pa.generate();
      const t = this.config.delegationTimeout !== void 0 ? BigInt(Date.now() * 1e6) + BigInt(this.config.delegationTimeout) : BigInt(Date.now() * 1e6) + BigInt(48 * 60 * 60 * 1e9), e = await this.signer.delegation({
        publicKey: this.sessionKey.getPublicKey().toDer(),
        targets: Array.isArray(this.config.delegationTargets) ? this.config.delegationTargets.filter((s) => typeof s == "string" && s.length > 0).map((s) => pe.fromText(s)) : [],
        maxTimeToLive: t
      }), n = Fa.fromDelegation(
        this.sessionKey,
        e
      );
      this.signerAgent = sr.createSync({
        signer: this.signer,
        account: n.getPrincipal(),
        agent: _e.createSync({ host: this.url })
        // Use RPC URL for the signer agent
      }), this.identity = n, this.config.fetchRootKeys && await this.agent.fetchRootKey();
      const i = n.getPrincipal();
      if (i.isAnonymous())
        throw this.setState(At.Status.READY), this.identity = null, this.signerAgent = null, this.sessionKey = null, new Error(
          "Failed to authenticate with NFID - got anonymous principal"
        );
      return this.setState(At.Status.CONNECTED), {
        owner: i.toText(),
        subaccount: zr.fromPrincipal({
          principal: i,
          subAccount: void 0
          // This will use the default subaccount
        }).toHex()
      };
    } catch (t) {
      if (this.identity = null, this.signerAgent = null, this.sessionKey = null, this.signer)
        try {
          this.signer.closeChannel();
        } catch (e) {
          console.debug("Error closing channel on connect failure:", e);
        }
      throw this.setState(At.Status.READY), t;
    }
  }
  undelegatedActor(t, e) {
    const n = _e.createSync({
      identity: this.identity,
      host: this.config.hostUrl,
      verifyQuerySignatures: this.config.verifyQuerySignatures
    });
    return gn.createActor(e, {
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
        (u) => u.delegation.targets?.some((h) => h.toText() === t)
      );
      return s && !i || !s && !i ? this.undelegatedActor(t, e) : i ? gn.createActor(e, {
        agent: this.signerAgent,
        canisterId: t
      }) : gn.createActor(e, {
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
Nn.TRANSPORT_CONFIG = {
  windowOpenerFeatures: "width=525,height=705",
  establishTimeout: 45e3,
  disconnectTimeout: 45e3,
  statusPollingRate: 500,
  detectNonClickEstablishment: !1
  // Allow connection outside of click handler for auto-connect
}, Nn.logo = Fu, Nn.walletName = "NFID";
let Nr = Nn;
const tl = "data:image/webp;base64,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", Oe = class Oe extends cr {
  constructor(t) {
    super(t), this.signer = null, this.agent = null, this.signerAgent = null, this.transport = null, this.walletName = Oe.walletName, this.logo = Oe.logo;
    const e = this.config.adapters?.oisy?.config?.signerUrl || "https://oisy.com/sign";
    this.agent = _e.createSync({ host: this.config.hostUrl }), this.transport = new Ga({
      url: e,
      ...Oe.TRANSPORT_CONFIG
    }), this.signer = new qa({
      transport: this.transport
    }), this.signerAgent = sr.createSync({
      signer: this.signer,
      account: pe.anonymous(),
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
      if (this.transport && this.signer)
        this.agent = _e.createSync({ host: this.config.hostUrl }), this.signerAgent = sr.createSync({
          signer: this.signer,
          account: pe.anonymous(),
          agent: this.agent
        });
      else
        throw new Error("Oisy signer agent not initialized or connected");
    return (await this.signerAgent.getPrincipal()).toText();
  }
  async getAccountId() {
    return zr.fromPrincipal({
      principal: pe.fromText(await this.getPrincipal()),
      subAccount: void 0
      // This will use the default subaccount
    }).toHex();
  }
  async connect() {
    this.setState(At.Status.CONNECTING);
    try {
      if (!this.signerAgent && this.transport && this.signer)
        this.agent = _e.createSync({ host: this.config.hostUrl }), this.signerAgent = sr.createSync({
          signer: this.signer,
          account: pe.anonymous(),
          agent: this.agent
        });
      else if (!this.signerAgent || !this.signerAgent.signer)
        throw new Error("Oisy signer agent not initialized. Was the constructor called with config?");
      let t;
      const e = localStorage.getItem(Oe.OISY_PRINCIPAL_KEY);
      if (e && e !== "null" && e !== "undefined") {
        console.debug("[Oisy] Attempting to use stored principal:", e);
        try {
          t = pe.fromText(e), this.signerAgent.replaceAccount(t), console.debug("[Oisy] Replaced account with stored principal.");
        } catch (n) {
          console.warn("[Oisy] Failed to parse stored principal, proceeding with normal flow:", n), localStorage.removeItem(Oe.OISY_PRINCIPAL_KEY);
          const i = await this.signerAgent.signer.accounts();
          if (!i || i.length === 0)
            throw this.disconnect(), new Error("No accounts returned from Oisy");
          t = i[0].owner, localStorage.setItem(Oe.OISY_PRINCIPAL_KEY, t.toText()), this.signerAgent.replaceAccount(t);
        }
      } else {
        const n = await this.signerAgent.signer.accounts();
        if (!n || n.length === 0)
          throw this.disconnect(), new Error("No accounts returned from Oisy");
        t = n[0].owner, localStorage.setItem(Oe.OISY_PRINCIPAL_KEY, t.toText()), this.signerAgent.replaceAccount(t);
      }
      if (t.isAnonymous())
        throw this.setState(At.Status.READY), new Error("Failed to authenticate with Oisy - got anonymous principal");
      if (this.config.fetchRootKeys) {
        if (!this.signerAgent) throw new Error("Signer agent not ready for fetchRootKeys");
        await this.signerAgent.fetchRootKey();
      }
      return this.setState(At.Status.CONNECTED), {
        owner: t.toText(),
        subaccount: await this.getAccountId()
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
      return gn.createActor(e, {
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
    localStorage.removeItem(Oe.OISY_PRINCIPAL_KEY), console.debug("[Oisy] Cleared stored principal from localStorage.");
  }
  cleanupInternal() {
    this.agent = null, this.signerAgent = null;
  }
};
Oe.TRANSPORT_CONFIG = {
  windowOpenerFeatures: "width=525,height=705",
  establishTimeout: 45e3,
  disconnectTimeout: 45e3,
  statusPollingRate: 500,
  detectNonClickEstablishment: !1
}, Oe.OISY_PRINCIPAL_KEY = "oisy_principal", Oe.logo = tl, Oe.walletName = "OISY Wallet";
let Tr = Oe;
const Yr = {
  timeout: 1e3 * 60 * 60 * 24,
  // 1 day
  enabled: !0
}, el = {
  oisy: {
    id: "oisy",
    walletName: Tr.walletName,
    logo: Tr.logo,
    website: "https://oisy.com",
    chain: "ICP",
    adapter: Tr,
    config: {
      ...Yr,
      signerUrl: "https://oisy.com/sign"
      // Default Oisy sign URL
    }
  },
  nfid: {
    id: "nfid",
    walletName: Nr.walletName,
    logo: Nr.logo,
    website: "https://nfid.one",
    chain: "ICP",
    adapter: Nr,
    config: {
      ...Yr,
      rpcUrl: "https://nfid.one/rpc"
      // Default NFID RPC endpoint
    }
  },
  ii: {
    id: "ii",
    walletName: xr.walletName,
    logo: xr.logo,
    website: "https://internetcomputer.org",
    chain: "ICP",
    adapter: xr,
    config: {
      ...Yr,
      identityProvider: "https://identity.ic0.app"
    }
  },
  plug: {
    id: "plug",
    walletName: Br.walletName,
    logo: Br.logo,
    website: "https://plugwallet.io",
    chain: "ICP",
    adapter: Br,
    config: {
      ...Yr,
      identityProvider: "https://identity.ic0.app"
    }
  }
};
var os = { exports: {} }, Zo;
function nl() {
  return Zo || (Zo = 1, function(r) {
    var t = Object.prototype.hasOwnProperty, e = "~";
    function n() {
    }
    Object.create && (n.prototype = /* @__PURE__ */ Object.create(null), new n().__proto__ || (e = !1));
    function i(A, E, S) {
      this.fn = A, this.context = E, this.once = S || !1;
    }
    function s(A, E, S, N, P) {
      if (typeof S != "function")
        throw new TypeError("The listener must be a function");
      var U = new i(S, N || A, P), F = e ? e + E : E;
      return A._events[F] ? A._events[F].fn ? A._events[F] = [A._events[F], U] : A._events[F].push(U) : (A._events[F] = U, A._eventsCount++), A;
    }
    function u(A, E) {
      --A._eventsCount === 0 ? A._events = new n() : delete A._events[E];
    }
    function h() {
      this._events = new n(), this._eventsCount = 0;
    }
    h.prototype.eventNames = function() {
      var E = [], S, N;
      if (this._eventsCount === 0) return E;
      for (N in S = this._events)
        t.call(S, N) && E.push(e ? N.slice(1) : N);
      return Object.getOwnPropertySymbols ? E.concat(Object.getOwnPropertySymbols(S)) : E;
    }, h.prototype.listeners = function(E) {
      var S = e ? e + E : E, N = this._events[S];
      if (!N) return [];
      if (N.fn) return [N.fn];
      for (var P = 0, U = N.length, F = new Array(U); P < U; P++)
        F[P] = N[P].fn;
      return F;
    }, h.prototype.listenerCount = function(E) {
      var S = e ? e + E : E, N = this._events[S];
      return N ? N.fn ? 1 : N.length : 0;
    }, h.prototype.emit = function(E, S, N, P, U, F) {
      var O = e ? e + E : E;
      if (!this._events[O]) return !1;
      var L = this._events[O], Y = arguments.length, Q, q;
      if (L.fn) {
        switch (L.once && this.removeListener(E, L.fn, void 0, !0), Y) {
          case 1:
            return L.fn.call(L.context), !0;
          case 2:
            return L.fn.call(L.context, S), !0;
          case 3:
            return L.fn.call(L.context, S, N), !0;
          case 4:
            return L.fn.call(L.context, S, N, P), !0;
          case 5:
            return L.fn.call(L.context, S, N, P, U), !0;
          case 6:
            return L.fn.call(L.context, S, N, P, U, F), !0;
        }
        for (q = 1, Q = new Array(Y - 1); q < Y; q++)
          Q[q - 1] = arguments[q];
        L.fn.apply(L.context, Q);
      } else {
        var K = L.length, V;
        for (q = 0; q < K; q++)
          switch (L[q].once && this.removeListener(E, L[q].fn, void 0, !0), Y) {
            case 1:
              L[q].fn.call(L[q].context);
              break;
            case 2:
              L[q].fn.call(L[q].context, S);
              break;
            case 3:
              L[q].fn.call(L[q].context, S, N);
              break;
            case 4:
              L[q].fn.call(L[q].context, S, N, P);
              break;
            default:
              if (!Q) for (V = 1, Q = new Array(Y - 1); V < Y; V++)
                Q[V - 1] = arguments[V];
              L[q].fn.apply(L[q].context, Q);
          }
      }
      return !0;
    }, h.prototype.on = function(E, S, N) {
      return s(this, E, S, N, !1);
    }, h.prototype.once = function(E, S, N) {
      return s(this, E, S, N, !0);
    }, h.prototype.removeListener = function(E, S, N, P) {
      var U = e ? e + E : E;
      if (!this._events[U]) return this;
      if (!S)
        return u(this, U), this;
      var F = this._events[U];
      if (F.fn)
        F.fn === S && (!P || F.once) && (!N || F.context === N) && u(this, U);
      else {
        for (var O = 0, L = [], Y = F.length; O < Y; O++)
          (F[O].fn !== S || P && !F[O].once || N && F[O].context !== N) && L.push(F[O]);
        L.length ? this._events[U] = L.length === 1 ? L[0] : L : u(this, U);
      }
      return this;
    }, h.prototype.removeAllListeners = function(E) {
      var S;
      return E ? (S = e ? e + E : E, this._events[S] && u(this, S)) : (this._events = new n(), this._eventsCount = 0), this;
    }, h.prototype.off = h.prototype.removeListener, h.prototype.addListener = h.prototype.on, h.prefixed = e, h.EventEmitter = h, r.exports = h;
  }(os)), os.exports;
}
var rl = nl();
const eo = /* @__PURE__ */ Ei(rl);
class Ue extends Error {
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  constructor(t, e) {
    super(t), this.error = e;
  }
}
class no extends Ue {
  constructor() {
    super(...arguments), this.name = "WalletNotReadyError";
  }
}
class il extends Ue {
  constructor() {
    super(...arguments), this.name = "WalletLoadError";
  }
}
class sl extends Ue {
  constructor() {
    super(...arguments), this.name = "WalletConfigError";
  }
}
class ai extends Ue {
  constructor() {
    super(...arguments), this.name = "WalletConnectionError";
  }
}
class ro extends Ue {
  constructor() {
    super(...arguments), this.name = "WalletDisconnectedError";
  }
}
class io extends Ue {
  constructor() {
    super(...arguments), this.name = "WalletDisconnectionError";
  }
}
class Va extends Ue {
  constructor() {
    super(...arguments), this.name = "WalletAccountError";
  }
}
class Or extends Ue {
  constructor() {
    super(...arguments), this.name = "WalletPublicKeyError";
  }
}
class ke extends Ue {
  constructor() {
    super(...arguments), this.name = "WalletNotConnectedError";
  }
}
class Qn extends Ue {
  constructor() {
    super(...arguments), this.name = "WalletSendTransactionError";
  }
}
class nn extends Ue {
  constructor() {
    super(...arguments), this.name = "WalletSignTransactionError";
  }
}
class so extends Ue {
  constructor() {
    super(...arguments), this.name = "WalletSignMessageError";
  }
}
var Ut;
(function(r) {
  r.Installed = "Installed", r.NotDetected = "NotDetected", r.Loadable = "Loadable", r.Unsupported = "Unsupported";
})(Ut || (Ut = {}));
class ol extends eo {
  get connected() {
    return !!this.publicKey;
  }
  async autoConnect() {
    await this.connect();
  }
  async prepareTransaction(t, e, n = {}) {
    const i = this.publicKey;
    if (!i)
      throw new ke();
    return t.feePayer = t.feePayer || i, t.recentBlockhash = t.recentBlockhash || (await e.getLatestBlockhash({
      commitment: n.preflightCommitment,
      minContextSlot: n.minContextSlot
    })).blockhash, t;
  }
}
function oo(r) {
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
function Rs() {
  if (!navigator)
    return !1;
  const r = navigator.userAgent.toLowerCase(), t = r.includes("iphone") || r.includes("ipad"), e = r.includes("safari");
  return t && e;
}
function ci(r) {
  return "version" in r;
}
class al extends ol {
  async sendTransaction(t, e, n = {}) {
    let i = !0;
    try {
      if (ci(t)) {
        if (!this.supportedTransactionVersions)
          throw new Qn("Sending versioned transactions isn't supported by this wallet");
        if (!this.supportedTransactionVersions.has(t.version))
          throw new Qn(`Sending transaction version ${t.version} isn't supported by this wallet`);
        try {
          t = await this.signTransaction(t);
          const s = t.serialize();
          return await e.sendRawTransaction(s, n);
        } catch (s) {
          throw s instanceof nn ? (i = !1, s) : new Qn(s?.message, s);
        }
      } else
        try {
          const { signers: s, ...u } = n;
          t = await this.prepareTransaction(t, e, u), s?.length && t.partialSign(...s), t = await this.signTransaction(t);
          const h = t.serialize();
          return await e.sendRawTransaction(h, u);
        } catch (s) {
          throw s instanceof nn ? (i = !1, s) : new Qn(s?.message, s);
        }
    } catch (s) {
      throw i && this.emit("error", s), s;
    }
  }
  async signAllTransactions(t) {
    for (const n of t)
      if (ci(n)) {
        if (!this.supportedTransactionVersions)
          throw new nn("Signing versioned transactions isn't supported by this wallet");
        if (!this.supportedTransactionVersions.has(n.version))
          throw new nn(`Signing transaction version ${n.version} isn't supported by this wallet`);
      }
    const e = [];
    for (const n of t)
      e.push(await this.signTransaction(n));
    return e;
  }
}
class ao extends al {
}
const cl = "solana:signAndSendTransaction", ul = "solana:signMessage", ll = "solana:signTransaction", hl = "standard:connect", fl = "standard:disconnect", dl = "standard:events";
var Hn;
(function(r) {
  r.Mainnet = "mainnet-beta", r.Testnet = "testnet", r.Devnet = "devnet";
})(Hn || (Hn = {}));
function Go(r) {
  if (!Number.isSafeInteger(r) || r < 0)
    throw new Error("positive integer expected, got " + r);
}
function gl(r) {
  return r instanceof Uint8Array || ArrayBuffer.isView(r) && r.constructor.name === "Uint8Array";
}
function vi(r, ...t) {
  if (!gl(r))
    throw new Error("Uint8Array expected");
  if (t.length > 0 && !t.includes(r.length))
    throw new Error("Uint8Array expected of length " + t + ", got length=" + r.length);
}
function Al(r) {
  if (typeof r != "function" || typeof r.create != "function")
    throw new Error("Hash should be wrapped by utils.wrapConstructor");
  Go(r.outputLen), Go(r.blockLen);
}
function ui(r, t = !0) {
  if (r.destroyed)
    throw new Error("Hash instance has been destroyed");
  if (t && r.finished)
    throw new Error("Hash#digest() has already been called");
}
function pl(r, t) {
  vi(r);
  const e = t.outputLen;
  if (r.length < e)
    throw new Error("digestInto() expects output buffer of length at least " + e);
}
const Jn = typeof globalThis == "object" && "crypto" in globalThis ? globalThis.crypto : void 0;
/*! noble-hashes - MIT License (c) 2022 Paul Miller (paulmillr.com) */
function as(r) {
  return new DataView(r.buffer, r.byteOffset, r.byteLength);
}
function Xe(r, t) {
  return r << 32 - t | r >>> t;
}
// @ts-ignore
typeof Uint8Array.from([]).toHex == "function" && Uint8Array.fromHex;
function wl(r) {
  if (typeof r != "string")
    throw new Error("utf8ToBytes expected string, got " + typeof r);
  return new Uint8Array(new TextEncoder().encode(r));
}
function co(r) {
  return typeof r == "string" && (r = wl(r)), vi(r), r;
}
function yl(...r) {
  let t = 0;
  for (let n = 0; n < r.length; n++) {
    const i = r[n];
    vi(i), t += i.length;
  }
  const e = new Uint8Array(t);
  for (let n = 0, i = 0; n < r.length; n++) {
    const s = r[n];
    e.set(s, i), i += s.length;
  }
  return e;
}
let Xa = class {
  // Safe version that clones internal state
  clone() {
    return this._cloneInto();
  }
};
function $a(r) {
  const t = (n) => r().update(co(n)).digest(), e = r();
  return t.outputLen = e.outputLen, t.blockLen = e.blockLen, t.create = () => r(), t;
}
function tc(r = 32) {
  if (Jn && typeof Jn.getRandomValues == "function")
    return Jn.getRandomValues(new Uint8Array(r));
  if (Jn && typeof Jn.randomBytes == "function")
    return Uint8Array.from(Jn.randomBytes(r));
  throw new Error("crypto.getRandomValues must be defined");
}
function ml(r, t, e, n) {
  if (typeof r.setBigUint64 == "function")
    return r.setBigUint64(t, e, n);
  const i = BigInt(32), s = BigInt(4294967295), u = Number(e >> i & s), h = Number(e & s), A = n ? 4 : 0, E = n ? 0 : 4;
  r.setUint32(t + A, u, n), r.setUint32(t + E, h, n);
}
function bl(r, t, e) {
  return r & t ^ ~r & e;
}
function El(r, t, e) {
  return r & t ^ r & e ^ t & e;
}
let ec = class extends Xa {
  constructor(t, e, n, i) {
    super(), this.finished = !1, this.length = 0, this.pos = 0, this.destroyed = !1, this.blockLen = t, this.outputLen = e, this.padOffset = n, this.isLE = i, this.buffer = new Uint8Array(t), this.view = as(this.buffer);
  }
  update(t) {
    ui(this);
    const { view: e, buffer: n, blockLen: i } = this;
    t = co(t);
    const s = t.length;
    for (let u = 0; u < s; ) {
      const h = Math.min(i - this.pos, s - u);
      if (h === i) {
        const A = as(t);
        for (; i <= s - u; u += i)
          this.process(A, u);
        continue;
      }
      n.set(t.subarray(u, u + h), this.pos), this.pos += h, u += h, this.pos === i && (this.process(e, 0), this.pos = 0);
    }
    return this.length += t.length, this.roundClean(), this;
  }
  digestInto(t) {
    ui(this), pl(t, this), this.finished = !0;
    const { buffer: e, view: n, blockLen: i, isLE: s } = this;
    let { pos: u } = this;
    e[u++] = 128, this.buffer.subarray(u).fill(0), this.padOffset > i - u && (this.process(n, 0), u = 0);
    for (let N = u; N < i; N++)
      e[N] = 0;
    ml(n, i - 8, BigInt(this.length * 8), s), this.process(n, 0);
    const h = as(t), A = this.outputLen;
    if (A % 4)
      throw new Error("_sha2: outputLen should be aligned to 32bit");
    const E = A / 4, S = this.get();
    if (E > S.length)
      throw new Error("_sha2: outputLen bigger than state");
    for (let N = 0; N < E; N++)
      h.setUint32(4 * N, S[N], s);
  }
  digest() {
    const { buffer: t, outputLen: e } = this;
    this.digestInto(t);
    const n = t.slice(0, e);
    return this.destroy(), n;
  }
  _cloneInto(t) {
    t || (t = new this.constructor()), t.set(...this.get());
    const { blockLen: e, buffer: n, length: i, finished: s, destroyed: u, pos: h } = this;
    return t.length = i, t.pos = h, t.finished = s, t.destroyed = u, i % e && t.buffer.set(n), t;
  }
};
const Il = /* @__PURE__ */ new Uint32Array([
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
]), In = /* @__PURE__ */ new Uint32Array([
  1779033703,
  3144134277,
  1013904242,
  2773480762,
  1359893119,
  2600822924,
  528734635,
  1541459225
]), vn = /* @__PURE__ */ new Uint32Array(64);
let vl = class extends ec {
  constructor(t = 32) {
    super(64, t, 8, !1), this.A = In[0] | 0, this.B = In[1] | 0, this.C = In[2] | 0, this.D = In[3] | 0, this.E = In[4] | 0, this.F = In[5] | 0, this.G = In[6] | 0, this.H = In[7] | 0;
  }
  get() {
    const { A: t, B: e, C: n, D: i, E: s, F: u, G: h, H: A } = this;
    return [t, e, n, i, s, u, h, A];
  }
  // prettier-ignore
  set(t, e, n, i, s, u, h, A) {
    this.A = t | 0, this.B = e | 0, this.C = n | 0, this.D = i | 0, this.E = s | 0, this.F = u | 0, this.G = h | 0, this.H = A | 0;
  }
  process(t, e) {
    for (let N = 0; N < 16; N++, e += 4)
      vn[N] = t.getUint32(e, !1);
    for (let N = 16; N < 64; N++) {
      const P = vn[N - 15], U = vn[N - 2], F = Xe(P, 7) ^ Xe(P, 18) ^ P >>> 3, O = Xe(U, 17) ^ Xe(U, 19) ^ U >>> 10;
      vn[N] = O + vn[N - 7] + F + vn[N - 16] | 0;
    }
    let { A: n, B: i, C: s, D: u, E: h, F: A, G: E, H: S } = this;
    for (let N = 0; N < 64; N++) {
      const P = Xe(h, 6) ^ Xe(h, 11) ^ Xe(h, 25), U = S + P + bl(h, A, E) + Il[N] + vn[N] | 0, O = (Xe(n, 2) ^ Xe(n, 13) ^ Xe(n, 22)) + El(n, i, s) | 0;
      S = E, E = A, A = h, h = u + U | 0, u = s, s = i, i = n, n = U + O | 0;
    }
    n = n + this.A | 0, i = i + this.B | 0, s = s + this.C | 0, u = u + this.D | 0, h = h + this.E | 0, A = A + this.F | 0, E = E + this.G | 0, S = S + this.H | 0, this.set(n, i, s, u, h, A, E, S);
  }
  roundClean() {
    vn.fill(0);
  }
  destroy() {
    this.set(0, 0, 0, 0, 0, 0, 0, 0), this.buffer.fill(0);
  }
};
const Sl = /* @__PURE__ */ $a(() => new vl()), Zr = /* @__PURE__ */ BigInt(2 ** 32 - 1), Os = /* @__PURE__ */ BigInt(32);
function nc(r, t = !1) {
  return t ? { h: Number(r & Zr), l: Number(r >> Os & Zr) } : { h: Number(r >> Os & Zr) | 0, l: Number(r & Zr) | 0 };
}
function Ml(r, t = !1) {
  let e = new Uint32Array(r.length), n = new Uint32Array(r.length);
  for (let i = 0; i < r.length; i++) {
    const { h: s, l: u } = nc(r[i], t);
    [e[i], n[i]] = [s, u];
  }
  return [e, n];
}
const xl = (r, t) => BigInt(r >>> 0) << Os | BigInt(t >>> 0), Bl = (r, t, e) => r >>> e, Cl = (r, t, e) => r << 32 - e | t >>> e, kl = (r, t, e) => r >>> e | t << 32 - e, Nl = (r, t, e) => r << 32 - e | t >>> e, Tl = (r, t, e) => r << 64 - e | t >>> e - 32, Ll = (r, t, e) => r >>> e - 32 | t << 64 - e, Rl = (r, t) => t, Ol = (r, t) => r, Dl = (r, t, e) => r << e | t >>> 32 - e, Ul = (r, t, e) => t << e | r >>> 32 - e, jl = (r, t, e) => t << e - 32 | r >>> 64 - e, zl = (r, t, e) => r << e - 32 | t >>> 64 - e;
function Pl(r, t, e, n) {
  const i = (t >>> 0) + (n >>> 0);
  return { h: r + e + (i / 2 ** 32 | 0) | 0, l: i | 0 };
}
const Fl = (r, t, e) => (r >>> 0) + (t >>> 0) + (e >>> 0), Ql = (r, t, e, n) => t + e + n + (r / 2 ** 32 | 0) | 0, _l = (r, t, e, n) => (r >>> 0) + (t >>> 0) + (e >>> 0) + (n >>> 0), Hl = (r, t, e, n, i) => t + e + n + i + (r / 2 ** 32 | 0) | 0, Wl = (r, t, e, n, i) => (r >>> 0) + (t >>> 0) + (e >>> 0) + (n >>> 0) + (i >>> 0), ql = (r, t, e, n, i, s) => t + e + n + i + s + (r / 2 ** 32 | 0) | 0, vt = {
  fromBig: nc,
  split: Ml,
  toBig: xl,
  shrSH: Bl,
  shrSL: Cl,
  rotrSH: kl,
  rotrSL: Nl,
  rotrBH: Tl,
  rotrBL: Ll,
  rotr32H: Rl,
  rotr32L: Ol,
  rotlSH: Dl,
  rotlSL: Ul,
  rotlBH: jl,
  rotlBL: zl,
  add: Pl,
  add3L: Fl,
  add3H: Ql,
  add4L: _l,
  add4H: Hl,
  add5H: ql,
  add5L: Wl
}, [Yl, Zl] = vt.split([
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
].map((r) => BigInt(r))), Sn = /* @__PURE__ */ new Uint32Array(80), Mn = /* @__PURE__ */ new Uint32Array(80);
class Gl extends ec {
  constructor(t = 64) {
    super(128, t, 16, !1), this.Ah = 1779033703, this.Al = -205731576, this.Bh = -1150833019, this.Bl = -2067093701, this.Ch = 1013904242, this.Cl = -23791573, this.Dh = -1521486534, this.Dl = 1595750129, this.Eh = 1359893119, this.El = -1377402159, this.Fh = -1694144372, this.Fl = 725511199, this.Gh = 528734635, this.Gl = -79577749, this.Hh = 1541459225, this.Hl = 327033209;
  }
  // prettier-ignore
  get() {
    const { Ah: t, Al: e, Bh: n, Bl: i, Ch: s, Cl: u, Dh: h, Dl: A, Eh: E, El: S, Fh: N, Fl: P, Gh: U, Gl: F, Hh: O, Hl: L } = this;
    return [t, e, n, i, s, u, h, A, E, S, N, P, U, F, O, L];
  }
  // prettier-ignore
  set(t, e, n, i, s, u, h, A, E, S, N, P, U, F, O, L) {
    this.Ah = t | 0, this.Al = e | 0, this.Bh = n | 0, this.Bl = i | 0, this.Ch = s | 0, this.Cl = u | 0, this.Dh = h | 0, this.Dl = A | 0, this.Eh = E | 0, this.El = S | 0, this.Fh = N | 0, this.Fl = P | 0, this.Gh = U | 0, this.Gl = F | 0, this.Hh = O | 0, this.Hl = L | 0;
  }
  process(t, e) {
    for (let q = 0; q < 16; q++, e += 4)
      Sn[q] = t.getUint32(e), Mn[q] = t.getUint32(e += 4);
    for (let q = 16; q < 80; q++) {
      const K = Sn[q - 15] | 0, V = Mn[q - 15] | 0, X = vt.rotrSH(K, V, 1) ^ vt.rotrSH(K, V, 8) ^ vt.shrSH(K, V, 7), nt = vt.rotrSL(K, V, 1) ^ vt.rotrSL(K, V, 8) ^ vt.shrSL(K, V, 7), C = Sn[q - 2] | 0, v = Mn[q - 2] | 0, x = vt.rotrSH(C, v, 19) ^ vt.rotrBH(C, v, 61) ^ vt.shrSH(C, v, 6), D = vt.rotrSL(C, v, 19) ^ vt.rotrBL(C, v, 61) ^ vt.shrSL(C, v, 6), R = vt.add4L(nt, D, Mn[q - 7], Mn[q - 16]), b = vt.add4H(R, X, x, Sn[q - 7], Sn[q - 16]);
      Sn[q] = b | 0, Mn[q] = R | 0;
    }
    let { Ah: n, Al: i, Bh: s, Bl: u, Ch: h, Cl: A, Dh: E, Dl: S, Eh: N, El: P, Fh: U, Fl: F, Gh: O, Gl: L, Hh: Y, Hl: Q } = this;
    for (let q = 0; q < 80; q++) {
      const K = vt.rotrSH(N, P, 14) ^ vt.rotrSH(N, P, 18) ^ vt.rotrBH(N, P, 41), V = vt.rotrSL(N, P, 14) ^ vt.rotrSL(N, P, 18) ^ vt.rotrBL(N, P, 41), X = N & U ^ ~N & O, nt = P & F ^ ~P & L, C = vt.add5L(Q, V, nt, Zl[q], Mn[q]), v = vt.add5H(C, Y, K, X, Yl[q], Sn[q]), x = C | 0, D = vt.rotrSH(n, i, 28) ^ vt.rotrBH(n, i, 34) ^ vt.rotrBH(n, i, 39), R = vt.rotrSL(n, i, 28) ^ vt.rotrBL(n, i, 34) ^ vt.rotrBL(n, i, 39), b = n & s ^ n & h ^ s & h, l = i & u ^ i & A ^ u & A;
      Y = O | 0, Q = L | 0, O = U | 0, L = F | 0, U = N | 0, F = P | 0, { h: N, l: P } = vt.add(E | 0, S | 0, v | 0, x | 0), E = h | 0, S = A | 0, h = s | 0, A = u | 0, s = n | 0, u = i | 0;
      const d = vt.add3L(x, R, l);
      n = vt.add3H(d, v, D, b), i = d | 0;
    }
    ({ h: n, l: i } = vt.add(this.Ah | 0, this.Al | 0, n | 0, i | 0)), { h: s, l: u } = vt.add(this.Bh | 0, this.Bl | 0, s | 0, u | 0), { h, l: A } = vt.add(this.Ch | 0, this.Cl | 0, h | 0, A | 0), { h: E, l: S } = vt.add(this.Dh | 0, this.Dl | 0, E | 0, S | 0), { h: N, l: P } = vt.add(this.Eh | 0, this.El | 0, N | 0, P | 0), { h: U, l: F } = vt.add(this.Fh | 0, this.Fl | 0, U | 0, F | 0), { h: O, l: L } = vt.add(this.Gh | 0, this.Gl | 0, O | 0, L | 0), { h: Y, l: Q } = vt.add(this.Hh | 0, this.Hl | 0, Y | 0, Q | 0), this.set(n, i, s, u, h, A, E, S, N, P, U, F, O, L, Y, Q);
  }
  roundClean() {
    Sn.fill(0), Mn.fill(0);
  }
  destroy() {
    this.buffer.fill(0), this.set(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
  }
}
const Jl = /* @__PURE__ */ $a(() => new Gl());
/*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */
const uo = /* @__PURE__ */ BigInt(0), Ds = /* @__PURE__ */ BigInt(1);
function ur(r) {
  return r instanceof Uint8Array || ArrayBuffer.isView(r) && r.constructor.name === "Uint8Array";
}
function lo(r) {
  if (!ur(r))
    throw new Error("Uint8Array expected");
}
function Rn(r, t) {
  if (typeof t != "boolean")
    throw new Error(r + " boolean expected, got " + t);
}
function Gr(r) {
  const t = r.toString(16);
  return t.length & 1 ? "0" + t : t;
}
function rc(r) {
  if (typeof r != "string")
    throw new Error("hex string expected, got " + typeof r);
  return r === "" ? uo : BigInt("0x" + r);
}
const ic = (
  // @ts-ignore
  typeof Uint8Array.from([]).toHex == "function" && typeof Uint8Array.fromHex == "function"
), Kl = /* @__PURE__ */ Array.from({ length: 256 }, (r, t) => t.toString(16).padStart(2, "0"));
function lr(r) {
  if (lo(r), ic)
    return r.toHex();
  let t = "";
  for (let e = 0; e < r.length; e++)
    t += Kl[r[e]];
  return t;
}
const cn = { _0: 48, _9: 57, A: 65, F: 70, a: 97, f: 102 };
function Jo(r) {
  if (r >= cn._0 && r <= cn._9)
    return r - cn._0;
  if (r >= cn.A && r <= cn.F)
    return r - (cn.A - 10);
  if (r >= cn.a && r <= cn.f)
    return r - (cn.a - 10);
}
function li(r) {
  if (typeof r != "string")
    throw new Error("hex string expected, got " + typeof r);
  if (ic)
    return Uint8Array.fromHex(r);
  const t = r.length, e = t / 2;
  if (t % 2)
    throw new Error("hex string expected, got unpadded hex of length " + t);
  const n = new Uint8Array(e);
  for (let i = 0, s = 0; i < e; i++, s += 2) {
    const u = Jo(r.charCodeAt(s)), h = Jo(r.charCodeAt(s + 1));
    if (u === void 0 || h === void 0) {
      const A = r[s] + r[s + 1];
      throw new Error('hex string expected, got non-hex character "' + A + '" at index ' + s);
    }
    n[i] = u * 16 + h;
  }
  return n;
}
function Wn(r) {
  return rc(lr(r));
}
function Lr(r) {
  return lo(r), rc(lr(Uint8Array.from(r).reverse()));
}
function Dr(r, t) {
  return li(r.toString(16).padStart(t * 2, "0"));
}
function hi(r, t) {
  return Dr(r, t).reverse();
}
function Ae(r, t, e) {
  let n;
  if (typeof t == "string")
    try {
      n = li(t);
    } catch (s) {
      throw new Error(r + " must be hex string or Uint8Array, cause: " + s);
    }
  else if (ur(t))
    n = Uint8Array.from(t);
  else
    throw new Error(r + " must be hex string or Uint8Array");
  const i = n.length;
  if (typeof e == "number" && i !== e)
    throw new Error(r + " of length " + e + " expected, got " + i);
  return n;
}
function hr(...r) {
  let t = 0;
  for (let n = 0; n < r.length; n++) {
    const i = r[n];
    lo(i), t += i.length;
  }
  const e = new Uint8Array(t);
  for (let n = 0, i = 0; n < r.length; n++) {
    const s = r[n];
    e.set(s, i), i += s.length;
  }
  return e;
}
const cs = (r) => typeof r == "bigint" && uo <= r;
function ho(r, t, e) {
  return cs(r) && cs(t) && cs(e) && t <= r && r < e;
}
function Ge(r, t, e, n) {
  if (!ho(t, e, n))
    throw new Error("expected valid " + r + ": " + e + " <= n < " + n + ", got " + t);
}
function Vl(r) {
  let t;
  for (t = 0; r > uo; r >>= Ds, t += 1)
    ;
  return t;
}
const Si = (r) => (Ds << BigInt(r)) - Ds, us = (r) => new Uint8Array(r), Ko = (r) => Uint8Array.from(r);
function Xl(r, t, e) {
  if (typeof r != "number" || r < 2)
    throw new Error("hashLen must be a number");
  if (typeof t != "number" || t < 2)
    throw new Error("qByteLen must be a number");
  if (typeof e != "function")
    throw new Error("hmacFn must be a function");
  let n = us(r), i = us(r), s = 0;
  const u = () => {
    n.fill(1), i.fill(0), s = 0;
  }, h = (...N) => e(i, n, ...N), A = (N = us(0)) => {
    i = h(Ko([0]), N), n = h(), N.length !== 0 && (i = h(Ko([1]), N), n = h());
  }, E = () => {
    if (s++ >= 1e3)
      throw new Error("drbg: tried 1000 values");
    let N = 0;
    const P = [];
    for (; N < t; ) {
      n = h();
      const U = n.slice();
      P.push(U), N += n.length;
    }
    return hr(...P);
  };
  return (N, P) => {
    u(), A(N);
    let U;
    for (; !(U = P(E())); )
      A();
    return u(), U;
  };
}
const $l = {
  bigint: (r) => typeof r == "bigint",
  function: (r) => typeof r == "function",
  boolean: (r) => typeof r == "boolean",
  string: (r) => typeof r == "string",
  stringOrUint8Array: (r) => typeof r == "string" || ur(r),
  isSafeInteger: (r) => Number.isSafeInteger(r),
  array: (r) => Array.isArray(r),
  field: (r, t) => t.Fp.isValid(r),
  hash: (r) => typeof r == "function" && Number.isSafeInteger(r.outputLen)
};
function Pr(r, t, e = {}) {
  const n = (i, s, u) => {
    const h = $l[s];
    if (typeof h != "function")
      throw new Error("invalid validator function");
    const A = r[i];
    if (!(u && A === void 0) && !h(A, r))
      throw new Error("param " + String(i) + " is invalid. Expected " + s + ", got " + A);
  };
  for (const [i, s] of Object.entries(t))
    n(i, s, !1);
  for (const [i, s] of Object.entries(e))
    n(i, s, !0);
  return r;
}
function fi(r) {
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
const ye = BigInt(0), Wt = BigInt(1), Pn = /* @__PURE__ */ BigInt(2), th = /* @__PURE__ */ BigInt(3), Us = /* @__PURE__ */ BigInt(4), Vo = /* @__PURE__ */ BigInt(5), Xo = /* @__PURE__ */ BigInt(8);
function Qt(r, t) {
  const e = r % t;
  return e >= ye ? e : t + e;
}
function eh(r, t, e) {
  if (t < ye)
    throw new Error("invalid exponent, negatives unsupported");
  if (e <= ye)
    throw new Error("invalid modulus");
  if (e === Wt)
    return ye;
  let n = Wt;
  for (; t > ye; )
    t & Wt && (n = n * r % e), r = r * r % e, t >>= Wt;
  return n;
}
function Yt(r, t, e) {
  let n = r;
  for (; t-- > ye; )
    n *= n, n %= e;
  return n;
}
function js(r, t) {
  if (r === ye)
    throw new Error("invert: expected non-zero number");
  if (t <= ye)
    throw new Error("invert: expected positive modulus, got " + t);
  let e = Qt(r, t), n = t, i = ye, s = Wt;
  for (; e !== ye; ) {
    const h = n / e, A = n % e, E = i - s * h;
    n = e, e = A, i = s, s = E;
  }
  if (n !== Wt)
    throw new Error("invert: does not exist");
  return Qt(i, t);
}
function nh(r) {
  const t = (r - Wt) / Pn;
  let e, n, i;
  for (e = r - Wt, n = 0; e % Pn === ye; e /= Pn, n++)
    ;
  for (i = Pn; i < r && eh(i, t, r) !== r - Wt; i++)
    if (i > 1e3)
      throw new Error("Cannot find square root: likely non-prime P");
  if (n === 1) {
    const u = (r + Wt) / Us;
    return function(A, E) {
      const S = A.pow(E, u);
      if (!A.eql(A.sqr(S), E))
        throw new Error("Cannot find square root");
      return S;
    };
  }
  const s = (e + Wt) / Pn;
  return function(h, A) {
    if (h.pow(A, t) === h.neg(h.ONE))
      throw new Error("Cannot find square root");
    let E = n, S = h.pow(h.mul(h.ONE, i), e), N = h.pow(A, s), P = h.pow(A, e);
    for (; !h.eql(P, h.ONE); ) {
      if (h.eql(P, h.ZERO))
        return h.ZERO;
      let U = 1;
      for (let O = h.sqr(P); U < E && !h.eql(O, h.ONE); U++)
        O = h.sqr(O);
      const F = h.pow(S, Wt << BigInt(E - U - 1));
      S = h.sqr(F), N = h.mul(N, F), P = h.mul(P, S), E = U;
    }
    return N;
  };
}
function rh(r) {
  if (r % Us === th) {
    const t = (r + Wt) / Us;
    return function(n, i) {
      const s = n.pow(i, t);
      if (!n.eql(n.sqr(s), i))
        throw new Error("Cannot find square root");
      return s;
    };
  }
  if (r % Xo === Vo) {
    const t = (r - Vo) / Xo;
    return function(n, i) {
      const s = n.mul(i, Pn), u = n.pow(s, t), h = n.mul(i, u), A = n.mul(n.mul(h, Pn), u), E = n.mul(h, n.sub(A, n.ONE));
      if (!n.eql(n.sqr(E), i))
        throw new Error("Cannot find square root");
      return E;
    };
  }
  return nh(r);
}
const ih = (r, t) => (Qt(r, t) & Wt) === Wt, sh = [
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
function oh(r) {
  const t = {
    ORDER: "bigint",
    MASK: "bigint",
    BYTES: "isSafeInteger",
    BITS: "isSafeInteger"
  }, e = sh.reduce((n, i) => (n[i] = "function", n), t);
  return Pr(r, e);
}
function ah(r, t, e) {
  if (e < ye)
    throw new Error("invalid exponent, negatives unsupported");
  if (e === ye)
    return r.ONE;
  if (e === Wt)
    return t;
  let n = r.ONE, i = t;
  for (; e > ye; )
    e & Wt && (n = r.mul(n, i)), i = r.sqr(i), e >>= Wt;
  return n;
}
function ch(r, t) {
  const e = new Array(t.length), n = t.reduce((s, u, h) => r.is0(u) ? s : (e[h] = s, r.mul(s, u)), r.ONE), i = r.inv(n);
  return t.reduceRight((s, u, h) => r.is0(u) ? s : (e[h] = r.mul(s, e[h]), r.mul(s, u)), i), e;
}
function sc(r, t) {
  const e = t !== void 0 ? t : r.toString(2).length, n = Math.ceil(e / 8);
  return { nBitLength: e, nByteLength: n };
}
function Mi(r, t, e = !1, n = {}) {
  if (r <= ye)
    throw new Error("invalid field: expected ORDER > 0, got " + r);
  const { nBitLength: i, nByteLength: s } = sc(r, t);
  if (s > 2048)
    throw new Error("invalid field: expected ORDER of <= 2048 bytes");
  let u;
  const h = Object.freeze({
    ORDER: r,
    isLE: e,
    BITS: i,
    BYTES: s,
    MASK: Si(i),
    ZERO: ye,
    ONE: Wt,
    create: (A) => Qt(A, r),
    isValid: (A) => {
      if (typeof A != "bigint")
        throw new Error("invalid field element: expected bigint, got " + typeof A);
      return ye <= A && A < r;
    },
    is0: (A) => A === ye,
    isOdd: (A) => (A & Wt) === Wt,
    neg: (A) => Qt(-A, r),
    eql: (A, E) => A === E,
    sqr: (A) => Qt(A * A, r),
    add: (A, E) => Qt(A + E, r),
    sub: (A, E) => Qt(A - E, r),
    mul: (A, E) => Qt(A * E, r),
    pow: (A, E) => ah(h, A, E),
    div: (A, E) => Qt(A * js(E, r), r),
    // Same as above, but doesn't normalize
    sqrN: (A) => A * A,
    addN: (A, E) => A + E,
    subN: (A, E) => A - E,
    mulN: (A, E) => A * E,
    inv: (A) => js(A, r),
    sqrt: n.sqrt || ((A) => (u || (u = rh(r)), u(h, A))),
    invertBatch: (A) => ch(h, A),
    // TODO: do we really need constant cmov?
    // We don't have const-time bigints anyway, so probably will be not very useful
    cmov: (A, E, S) => S ? E : A,
    toBytes: (A) => e ? hi(A, s) : Dr(A, s),
    fromBytes: (A) => {
      if (A.length !== s)
        throw new Error("Field.fromBytes: expected " + s + " bytes, got " + A.length);
      return e ? Lr(A) : Wn(A);
    }
  });
  return Object.freeze(h);
}
function oc(r) {
  if (typeof r != "bigint")
    throw new Error("field order must be bigint");
  const t = r.toString(2).length;
  return Math.ceil(t / 8);
}
function ac(r) {
  const t = oc(r);
  return t + Math.ceil(t / 2);
}
function uh(r, t, e = !1) {
  const n = r.length, i = oc(t), s = ac(t);
  if (n < 16 || n < s || n > 1024)
    throw new Error("expected " + s + "-1024 bytes of input, got " + n);
  const u = e ? Lr(r) : Wn(r), h = Qt(u, t - Wt) + Wt;
  return e ? hi(h, i) : Dr(h, i);
}
/*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */
const $o = BigInt(0), zs = BigInt(1);
function ls(r, t) {
  const e = t.negate();
  return r ? e : t;
}
function cc(r, t) {
  if (!Number.isSafeInteger(r) || r <= 0 || r > t)
    throw new Error("invalid window size, expected [1.." + t + "], got W=" + r);
}
function hs(r, t) {
  cc(r, t);
  const e = Math.ceil(t / r) + 1, n = 2 ** (r - 1), i = 2 ** r, s = Si(r), u = BigInt(r);
  return { windows: e, windowSize: n, mask: s, maxNumber: i, shiftBy: u };
}
function ta(r, t, e) {
  const { windowSize: n, mask: i, maxNumber: s, shiftBy: u } = e;
  let h = Number(r & i), A = r >> u;
  h > n && (h -= s, A += zs);
  const E = t * n, S = E + Math.abs(h) - 1, N = h === 0, P = h < 0, U = t % 2 !== 0;
  return { nextN: A, offset: S, isZero: N, isNeg: P, isNegF: U, offsetF: E };
}
function lh(r, t) {
  if (!Array.isArray(r))
    throw new Error("array expected");
  r.forEach((e, n) => {
    if (!(e instanceof t))
      throw new Error("invalid point at index " + n);
  });
}
function hh(r, t) {
  if (!Array.isArray(r))
    throw new Error("array of scalars expected");
  r.forEach((e, n) => {
    if (!t.isValid(e))
      throw new Error("invalid scalar at index " + n);
  });
}
const fs = /* @__PURE__ */ new WeakMap(), uc = /* @__PURE__ */ new WeakMap();
function ds(r) {
  return uc.get(r) || 1;
}
function lc(r, t) {
  return {
    constTimeNegate: ls,
    hasPrecomputes(e) {
      return ds(e) !== 1;
    },
    // non-const time multiplication ladder
    unsafeLadder(e, n, i = r.ZERO) {
      let s = e;
      for (; n > $o; )
        n & zs && (i = i.add(s)), s = s.double(), n >>= zs;
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
      const { windows: i, windowSize: s } = hs(n, t), u = [];
      let h = e, A = h;
      for (let E = 0; E < i; E++) {
        A = h, u.push(A);
        for (let S = 1; S < s; S++)
          A = A.add(h), u.push(A);
        h = A.double();
      }
      return u;
    },
    /**
     * Implements ec multiplication using precomputed tables and w-ary non-adjacent form.
     * @param W window size
     * @param precomputes precomputed tables
     * @param n scalar (we don't check here, but should be less than curve order)
     * @returns real and fake (for const-time) points
     */
    wNAF(e, n, i) {
      let s = r.ZERO, u = r.BASE;
      const h = hs(e, t);
      for (let A = 0; A < h.windows; A++) {
        const { nextN: E, offset: S, isZero: N, isNeg: P, isNegF: U, offsetF: F } = ta(i, A, h);
        i = E, N ? u = u.add(ls(U, n[F])) : s = s.add(ls(P, n[S]));
      }
      return { p: s, f: u };
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
      const u = hs(e, t);
      for (let h = 0; h < u.windows && i !== $o; h++) {
        const { nextN: A, offset: E, isZero: S, isNeg: N } = ta(i, h, u);
        if (i = A, !S) {
          const P = n[E];
          s = s.add(N ? P.negate() : P);
        }
      }
      return s;
    },
    getPrecomputes(e, n, i) {
      let s = fs.get(n);
      return s || (s = this.precomputeWindow(n, e), e !== 1 && fs.set(n, i(s))), s;
    },
    wNAFCached(e, n, i) {
      const s = ds(e);
      return this.wNAF(s, this.getPrecomputes(s, e, i), n);
    },
    wNAFCachedUnsafe(e, n, i, s) {
      const u = ds(e);
      return u === 1 ? this.unsafeLadder(e, n, s) : this.wNAFUnsafe(u, this.getPrecomputes(u, e, i), n, s);
    },
    // We calculate precomputes for elliptic curve point multiplication
    // using windowed method. This specifies window size and
    // stores precomputed values. Usually only base point would be precomputed.
    setWindowSize(e, n) {
      cc(n, t), uc.set(e, n), fs.delete(e);
    }
  };
}
function hc(r, t, e, n) {
  if (lh(e, r), hh(n, t), e.length !== n.length)
    throw new Error("arrays of points and scalars must have equal length");
  const i = r.ZERO, s = Vl(BigInt(e.length)), u = s > 12 ? s - 3 : s > 4 ? s - 2 : s ? 2 : 1, h = Si(u), A = new Array(Number(h) + 1).fill(i), E = Math.floor((t.BITS - 1) / u) * u;
  let S = i;
  for (let N = E; N >= 0; N -= u) {
    A.fill(i);
    for (let U = 0; U < n.length; U++) {
      const F = n[U], O = Number(F >> BigInt(N) & h);
      A[O] = A[O].add(e[U]);
    }
    let P = i;
    for (let U = A.length - 1, F = i; U > 0; U--)
      F = F.add(A[U]), P = P.add(F);
    if (S = S.add(P), N !== 0)
      for (let U = 0; U < u; U++)
        S = S.double();
  }
  return S;
}
function fo(r) {
  return oh(r.Fp), Pr(r, {
    n: "bigint",
    h: "bigint",
    Gx: "field",
    Gy: "field"
  }, {
    nBitLength: "isSafeInteger",
    nByteLength: "isSafeInteger"
  }), Object.freeze({
    ...sc(r.n, r.nBitLength),
    ...r,
    p: r.Fp.ORDER
  });
}
/*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */
const $e = BigInt(0), Ne = BigInt(1), ea = BigInt(2), fh = BigInt(8), dh = { zip215: !0 };
function gh(r) {
  const t = fo(r);
  return Pr(r, {
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
function Ah(r) {
  const t = gh(r), { Fp: e, n, prehash: i, hash: s, randomBytes: u, nByteLength: h, h: A } = t, E = ea << BigInt(h * 8) - Ne, S = e.create, N = Mi(t.n, t.nBitLength), P = t.uvRatio || ((m, w) => {
    try {
      return { isValid: !0, value: e.sqrt(m * e.inv(w)) };
    } catch {
      return { isValid: !1, value: $e };
    }
  }), U = t.adjustScalarBytes || ((m) => m), F = t.domain || ((m, w, B) => {
    if (Rn("phflag", B), w.length || B)
      throw new Error("Contexts/pre-hash are not supported");
    return m;
  });
  function O(m, w, B = !1) {
    const z = B ? Ne : $e;
    Ge("coordinate " + m, w, z, E);
  }
  function L(m) {
    if (!(m instanceof q))
      throw new Error("ExtendedPoint expected");
  }
  const Y = fi((m, w) => {
    const { ex: B, ey: z, ez: I } = m, f = m.is0();
    w == null && (w = f ? fh : e.inv(I));
    const g = S(B * w), M = S(z * w), T = S(I * w);
    if (f)
      return { x: $e, y: Ne };
    if (T !== Ne)
      throw new Error("invZ was invalid");
    return { x: g, y: M };
  }), Q = fi((m) => {
    const { a: w, d: B } = t;
    if (m.is0())
      throw new Error("bad point: ZERO");
    const { ex: z, ey: I, ez: f, et: g } = m, M = S(z * z), T = S(I * I), W = S(f * f), J = S(W * W), tt = S(M * w), st = S(W * S(tt + T)), xt = S(J + S(B * S(M * T)));
    if (st !== xt)
      throw new Error("bad point: equation left != right (1)");
    const gt = S(z * I), bt = S(f * g);
    if (gt !== bt)
      throw new Error("bad point: equation left != right (2)");
    return !0;
  });
  class q {
    constructor(w, B, z, I) {
      O("x", w), O("y", B), O("z", z, !0), O("t", I), this.ex = w, this.ey = B, this.ez = z, this.et = I, Object.freeze(this);
    }
    get x() {
      return this.toAffine().x;
    }
    get y() {
      return this.toAffine().y;
    }
    static fromAffine(w) {
      if (w instanceof q)
        throw new Error("extended point not allowed");
      const { x: B, y: z } = w || {};
      return O("x", B), O("y", z), new q(B, z, Ne, S(B * z));
    }
    static normalizeZ(w) {
      const B = e.invertBatch(w.map((z) => z.ez));
      return w.map((z, I) => z.toAffine(B[I])).map(q.fromAffine);
    }
    // Multiscalar Multiplication
    static msm(w, B) {
      return hc(q, N, w, B);
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
      L(w);
      const { ex: B, ey: z, ez: I } = this, { ex: f, ey: g, ez: M } = w, T = S(B * M), W = S(f * I), J = S(z * M), tt = S(g * I);
      return T === W && J === tt;
    }
    is0() {
      return this.equals(q.ZERO);
    }
    negate() {
      return new q(S(-this.ex), this.ey, this.ez, S(-this.et));
    }
    // Fast algo for doubling Extended Point.
    // https://hyperelliptic.org/EFD/g1p/auto-twisted-extended.html#doubling-dbl-2008-hwcd
    // Cost: 4M + 4S + 1*a + 6add + 1*2.
    double() {
      const { a: w } = t, { ex: B, ey: z, ez: I } = this, f = S(B * B), g = S(z * z), M = S(ea * S(I * I)), T = S(w * f), W = B + z, J = S(S(W * W) - f - g), tt = T + g, st = tt - M, xt = T - g, gt = S(J * st), bt = S(tt * xt), Et = S(J * xt), ht = S(st * tt);
      return new q(gt, bt, ht, Et);
    }
    // Fast algo for adding 2 Extended Points.
    // https://hyperelliptic.org/EFD/g1p/auto-twisted-extended.html#addition-add-2008-hwcd
    // Cost: 9M + 1*a + 1*d + 7add.
    add(w) {
      L(w);
      const { a: B, d: z } = t, { ex: I, ey: f, ez: g, et: M } = this, { ex: T, ey: W, ez: J, et: tt } = w, st = S(I * T), xt = S(f * W), gt = S(M * z * tt), bt = S(g * J), Et = S((I + f) * (T + W) - st - xt), ht = bt - gt, wt = bt + gt, on = S(xt - B * st), Bt = S(Et * ht), Ot = S(wt * on), wn = S(Et * on), Lt = S(ht * wt);
      return new q(Bt, Ot, Lt, wn);
    }
    subtract(w) {
      return this.add(w.negate());
    }
    wNAF(w) {
      return X.wNAFCached(this, w, q.normalizeZ);
    }
    // Constant-time multiplication.
    multiply(w) {
      const B = w;
      Ge("scalar", B, Ne, n);
      const { p: z, f: I } = this.wNAF(B);
      return q.normalizeZ([z, I])[0];
    }
    // Non-constant-time multiplication. Uses double-and-add algorithm.
    // It's faster, but should only be used when you don't care about
    // an exposed private key e.g. sig verification.
    // Does NOT allow scalars higher than CURVE.n.
    // Accepts optional accumulator to merge with multiply (important for sparse scalars)
    multiplyUnsafe(w, B = q.ZERO) {
      const z = w;
      return Ge("scalar", z, $e, n), z === $e ? V : this.is0() || z === Ne ? this : X.wNAFCachedUnsafe(this, z, q.normalizeZ, B);
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
      return Y(this, w);
    }
    clearCofactor() {
      const { h: w } = t;
      return w === Ne ? this : this.multiplyUnsafe(w);
    }
    // Converts hash string or Uint8Array to Point.
    // Uses algo from RFC8032 5.1.3.
    static fromHex(w, B = !1) {
      const { d: z, a: I } = t, f = e.BYTES;
      w = Ae("pointHex", w, f), Rn("zip215", B);
      const g = w.slice(), M = w[f - 1];
      g[f - 1] = M & -129;
      const T = Lr(g), W = B ? E : e.ORDER;
      Ge("pointHex.y", T, $e, W);
      const J = S(T * T), tt = S(J - Ne), st = S(z * J - I);
      let { isValid: xt, value: gt } = P(tt, st);
      if (!xt)
        throw new Error("Point.fromHex: invalid y coordinate");
      const bt = (gt & Ne) === Ne, Et = (M & 128) !== 0;
      if (!B && gt === $e && Et)
        throw new Error("Point.fromHex: x=0 and x_0=1");
      return Et !== bt && (gt = S(-gt)), q.fromAffine({ x: gt, y: T });
    }
    static fromPrivateKey(w) {
      const { scalar: B } = v(w);
      return K.multiply(B);
    }
    toRawBytes() {
      const { x: w, y: B } = this.toAffine(), z = hi(B, e.BYTES);
      return z[z.length - 1] |= w & Ne ? 128 : 0, z;
    }
    toHex() {
      return lr(this.toRawBytes());
    }
  }
  q.BASE = new q(t.Gx, t.Gy, Ne, S(t.Gx * t.Gy)), q.ZERO = new q($e, Ne, Ne, $e);
  const { BASE: K, ZERO: V } = q, X = lc(q, h * 8);
  function nt(m) {
    return Qt(m, n);
  }
  function C(m) {
    return nt(Lr(m));
  }
  function v(m) {
    const w = e.BYTES;
    m = Ae("private key", m, w);
    const B = Ae("hashed private key", s(m), 2 * w), z = U(B.slice(0, w)), I = B.slice(w, 2 * w), f = C(z);
    return { head: z, prefix: I, scalar: f };
  }
  function x(m) {
    const { head: w, prefix: B, scalar: z } = v(m), I = K.multiply(z), f = I.toRawBytes();
    return { head: w, prefix: B, scalar: z, point: I, pointBytes: f };
  }
  function D(m) {
    return x(m).pointBytes;
  }
  function R(m = new Uint8Array(), ...w) {
    const B = hr(...w);
    return C(s(F(B, Ae("context", m), !!i)));
  }
  function b(m, w, B = {}) {
    m = Ae("message", m), i && (m = i(m));
    const { prefix: z, scalar: I, pointBytes: f } = x(w), g = R(B.context, z, m), M = K.multiply(g).toRawBytes(), T = R(B.context, M, f, m), W = nt(g + T * I);
    Ge("signature.s", W, $e, n);
    const J = hr(M, hi(W, e.BYTES));
    return Ae("result", J, e.BYTES * 2);
  }
  const l = dh;
  function d(m, w, B, z = l) {
    const { context: I, zip215: f } = z, g = e.BYTES;
    m = Ae("signature", m, 2 * g), w = Ae("message", w), B = Ae("publicKey", B, g), f !== void 0 && Rn("zip215", f), i && (w = i(w));
    const M = Lr(m.slice(g, 2 * g));
    let T, W, J;
    try {
      T = q.fromHex(B, f), W = q.fromHex(m.slice(0, g), f), J = K.multiplyUnsafe(M);
    } catch {
      return !1;
    }
    if (!f && T.isSmallOrder())
      return !1;
    const tt = R(I, W.toRawBytes(), T.toRawBytes(), w);
    return W.add(T.multiplyUnsafe(tt)).subtract(J).clearCofactor().equals(q.ZERO);
  }
  return K._setWindowSize(8), {
    CURVE: t,
    getPublicKey: D,
    sign: b,
    verify: d,
    ExtendedPoint: q,
    utils: {
      getExtendedPublicKey: x,
      /** ed25519 priv keys are uniform 32b. No need to check for modulo bias, like in secp256k1. */
      randomPrivateKey: () => u(e.BYTES),
      /**
       * We're doing scalar multiplication (used in getPublicKey etc) with precomputed BASE_POINT
       * values. This slows down first getPublicKey() by milliseconds (see Speed section),
       * but allows to speed-up subsequent getPublicKey() calls up to 20x.
       * @param windowSize 2, 4, 8, 16
       */
      precompute(m = 8, w = q.BASE) {
        return w._setWindowSize(m), w.multiply(BigInt(3)), w;
      }
    }
  };
}
/*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */
const go = BigInt("57896044618658097711785492504343953926634992332820282019728792003956564819949"), na = /* @__PURE__ */ BigInt("19681161376707505956807079304988542015446066515923890162744021073123829784752");
BigInt(0);
const ph = BigInt(1), ra = BigInt(2);
BigInt(3);
const wh = BigInt(5), yh = BigInt(8);
function mh(r) {
  const t = BigInt(10), e = BigInt(20), n = BigInt(40), i = BigInt(80), s = go, h = r * r % s * r % s, A = Yt(h, ra, s) * h % s, E = Yt(A, ph, s) * r % s, S = Yt(E, wh, s) * E % s, N = Yt(S, t, s) * S % s, P = Yt(N, e, s) * N % s, U = Yt(P, n, s) * P % s, F = Yt(U, i, s) * U % s, O = Yt(F, i, s) * U % s, L = Yt(O, t, s) * S % s;
  return { pow_p_5_8: Yt(L, ra, s) * r % s, b2: h };
}
function bh(r) {
  return r[0] &= 248, r[31] &= 127, r[31] |= 64, r;
}
function Eh(r, t) {
  const e = go, n = Qt(t * t * t, e), i = Qt(n * n * t, e), s = mh(r * i).pow_p_5_8;
  let u = Qt(r * n * s, e);
  const h = Qt(t * u * u, e), A = u, E = Qt(u * na, e), S = h === r, N = h === Qt(-r, e), P = h === Qt(-r * na, e);
  return S && (u = A), (N || P) && (u = E), ih(u, e) && (u = Qt(-u, e)), { isValid: S || N, value: u };
}
const ia = Mi(go, void 0, !0), Ih = {
  // Removing Fp.create() will still work, and is 10% faster on sign
  a: ia.create(BigInt(-1)),
  // d is -121665/121666 a.k.a. Fp.neg(121665 * Fp.inv(121666))
  d: BigInt("37095705934669439343138083508754565189542113879843219016388785533085940283555"),
  // Finite field 2n**255n - 19n
  Fp: ia,
  // Subgroup order 2n**252n + 27742317777372353535851937790883648493n;
  n: BigInt("7237005577332262213973186563042994240857116359379907606001950938285454250989"),
  h: yh,
  Gx: BigInt("15112221349535400772501151409588531511454012693041857206046113283949847762202"),
  Gy: BigInt("46316835694926478169428394003475163141307993866256225615783033603165251855960"),
  hash: Jl,
  randomBytes: tc,
  adjustScalarBytes: bh,
  // dom2
  // Ratio of u to v. Allows us to combine inversion and square root. Uses algo from RFC8032 5.1.3.
  // Constant-time, u/√v
  uvRatio: Eh
}, Ao = Ah(Ih);
var ni = { exports: {} }, vh = ni.exports, sa;
function fc() {
  return sa || (sa = 1, function(r) {
    (function(t, e) {
      function n(b, l) {
        if (!b) throw new Error(l || "Assertion failed");
      }
      function i(b, l) {
        b.super_ = l;
        var d = function() {
        };
        d.prototype = l.prototype, b.prototype = new d(), b.prototype.constructor = b;
      }
      function s(b, l, d) {
        if (s.isBN(b))
          return b;
        this.negative = 0, this.words = null, this.length = 0, this.red = null, b !== null && ((l === "le" || l === "be") && (d = l, l = 10), this._init(b || 0, l || 10, d || "be"));
      }
      typeof t == "object" ? t.exports = s : e.BN = s, s.BN = s, s.wordSize = 26;
      var u;
      try {
        typeof window < "u" && typeof window.Buffer < "u" ? u = window.Buffer : u = Ii().Buffer;
      } catch {
      }
      s.isBN = function(l) {
        return l instanceof s ? !0 : l !== null && typeof l == "object" && l.constructor.wordSize === s.wordSize && Array.isArray(l.words);
      }, s.max = function(l, d) {
        return l.cmp(d) > 0 ? l : d;
      }, s.min = function(l, d) {
        return l.cmp(d) < 0 ? l : d;
      }, s.prototype._init = function(l, d, p) {
        if (typeof l == "number")
          return this._initNumber(l, d, p);
        if (typeof l == "object")
          return this._initArray(l, d, p);
        d === "hex" && (d = 16), n(d === (d | 0) && d >= 2 && d <= 36), l = l.toString().replace(/\s+/g, "");
        var m = 0;
        l[0] === "-" && (m++, this.negative = 1), m < l.length && (d === 16 ? this._parseHex(l, m, p) : (this._parseBase(l, d, m), p === "le" && this._initArray(this.toArray(), d, p)));
      }, s.prototype._initNumber = function(l, d, p) {
        l < 0 && (this.negative = 1, l = -l), l < 67108864 ? (this.words = [l & 67108863], this.length = 1) : l < 4503599627370496 ? (this.words = [
          l & 67108863,
          l / 67108864 & 67108863
        ], this.length = 2) : (n(l < 9007199254740992), this.words = [
          l & 67108863,
          l / 67108864 & 67108863,
          1
        ], this.length = 3), p === "le" && this._initArray(this.toArray(), d, p);
      }, s.prototype._initArray = function(l, d, p) {
        if (n(typeof l.length == "number"), l.length <= 0)
          return this.words = [0], this.length = 1, this;
        this.length = Math.ceil(l.length / 3), this.words = new Array(this.length);
        for (var m = 0; m < this.length; m++)
          this.words[m] = 0;
        var w, B, z = 0;
        if (p === "be")
          for (m = l.length - 1, w = 0; m >= 0; m -= 3)
            B = l[m] | l[m - 1] << 8 | l[m - 2] << 16, this.words[w] |= B << z & 67108863, this.words[w + 1] = B >>> 26 - z & 67108863, z += 24, z >= 26 && (z -= 26, w++);
        else if (p === "le")
          for (m = 0, w = 0; m < l.length; m += 3)
            B = l[m] | l[m + 1] << 8 | l[m + 2] << 16, this.words[w] |= B << z & 67108863, this.words[w + 1] = B >>> 26 - z & 67108863, z += 24, z >= 26 && (z -= 26, w++);
        return this._strip();
      };
      function h(b, l) {
        var d = b.charCodeAt(l);
        if (d >= 48 && d <= 57)
          return d - 48;
        if (d >= 65 && d <= 70)
          return d - 55;
        if (d >= 97 && d <= 102)
          return d - 87;
        n(!1, "Invalid character in " + b);
      }
      function A(b, l, d) {
        var p = h(b, d);
        return d - 1 >= l && (p |= h(b, d - 1) << 4), p;
      }
      s.prototype._parseHex = function(l, d, p) {
        this.length = Math.ceil((l.length - d) / 6), this.words = new Array(this.length);
        for (var m = 0; m < this.length; m++)
          this.words[m] = 0;
        var w = 0, B = 0, z;
        if (p === "be")
          for (m = l.length - 1; m >= d; m -= 2)
            z = A(l, d, m) << w, this.words[B] |= z & 67108863, w >= 18 ? (w -= 18, B += 1, this.words[B] |= z >>> 26) : w += 8;
        else {
          var I = l.length - d;
          for (m = I % 2 === 0 ? d + 1 : d; m < l.length; m += 2)
            z = A(l, d, m) << w, this.words[B] |= z & 67108863, w >= 18 ? (w -= 18, B += 1, this.words[B] |= z >>> 26) : w += 8;
        }
        this._strip();
      };
      function E(b, l, d, p) {
        for (var m = 0, w = 0, B = Math.min(b.length, d), z = l; z < B; z++) {
          var I = b.charCodeAt(z) - 48;
          m *= p, I >= 49 ? w = I - 49 + 10 : I >= 17 ? w = I - 17 + 10 : w = I, n(I >= 0 && w < p, "Invalid character"), m += w;
        }
        return m;
      }
      s.prototype._parseBase = function(l, d, p) {
        this.words = [0], this.length = 1;
        for (var m = 0, w = 1; w <= 67108863; w *= d)
          m++;
        m--, w = w / d | 0;
        for (var B = l.length - p, z = B % m, I = Math.min(B, B - z) + p, f = 0, g = p; g < I; g += m)
          f = E(l, g, g + m, d), this.imuln(w), this.words[0] + f < 67108864 ? this.words[0] += f : this._iaddn(f);
        if (z !== 0) {
          var M = 1;
          for (f = E(l, g, l.length, d), g = 0; g < z; g++)
            M *= d;
          this.imuln(M), this.words[0] + f < 67108864 ? this.words[0] += f : this._iaddn(f);
        }
        this._strip();
      }, s.prototype.copy = function(l) {
        l.words = new Array(this.length);
        for (var d = 0; d < this.length; d++)
          l.words[d] = this.words[d];
        l.length = this.length, l.negative = this.negative, l.red = this.red;
      };
      function S(b, l) {
        b.words = l.words, b.length = l.length, b.negative = l.negative, b.red = l.red;
      }
      if (s.prototype._move = function(l) {
        S(l, this);
      }, s.prototype.clone = function() {
        var l = new s(null);
        return this.copy(l), l;
      }, s.prototype._expand = function(l) {
        for (; this.length < l; )
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
          s.prototype[Symbol.for("nodejs.util.inspect.custom")] = N;
        } catch {
          s.prototype.inspect = N;
        }
      else
        s.prototype.inspect = N;
      function N() {
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
      ], U = [
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
      ], F = [
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
      s.prototype.toString = function(l, d) {
        l = l || 10, d = d | 0 || 1;
        var p;
        if (l === 16 || l === "hex") {
          p = "";
          for (var m = 0, w = 0, B = 0; B < this.length; B++) {
            var z = this.words[B], I = ((z << m | w) & 16777215).toString(16);
            w = z >>> 24 - m & 16777215, m += 2, m >= 26 && (m -= 26, B--), w !== 0 || B !== this.length - 1 ? p = P[6 - I.length] + I + p : p = I + p;
          }
          for (w !== 0 && (p = w.toString(16) + p); p.length % d !== 0; )
            p = "0" + p;
          return this.negative !== 0 && (p = "-" + p), p;
        }
        if (l === (l | 0) && l >= 2 && l <= 36) {
          var f = U[l], g = F[l];
          p = "";
          var M = this.clone();
          for (M.negative = 0; !M.isZero(); ) {
            var T = M.modrn(g).toString(l);
            M = M.idivn(g), M.isZero() ? p = T + p : p = P[f - T.length] + T + p;
          }
          for (this.isZero() && (p = "0" + p); p.length % d !== 0; )
            p = "0" + p;
          return this.negative !== 0 && (p = "-" + p), p;
        }
        n(!1, "Base should be between 2 and 36");
      }, s.prototype.toNumber = function() {
        var l = this.words[0];
        return this.length === 2 ? l += this.words[1] * 67108864 : this.length === 3 && this.words[2] === 1 ? l += 4503599627370496 + this.words[1] * 67108864 : this.length > 2 && n(!1, "Number can only safely store up to 53 bits"), this.negative !== 0 ? -l : l;
      }, s.prototype.toJSON = function() {
        return this.toString(16, 2);
      }, u && (s.prototype.toBuffer = function(l, d) {
        return this.toArrayLike(u, l, d);
      }), s.prototype.toArray = function(l, d) {
        return this.toArrayLike(Array, l, d);
      };
      var O = function(l, d) {
        return l.allocUnsafe ? l.allocUnsafe(d) : new l(d);
      };
      s.prototype.toArrayLike = function(l, d, p) {
        this._strip();
        var m = this.byteLength(), w = p || Math.max(1, m);
        n(m <= w, "byte array longer than desired length"), n(w > 0, "Requested array length <= 0");
        var B = O(l, w), z = d === "le" ? "LE" : "BE";
        return this["_toArrayLike" + z](B, m), B;
      }, s.prototype._toArrayLikeLE = function(l, d) {
        for (var p = 0, m = 0, w = 0, B = 0; w < this.length; w++) {
          var z = this.words[w] << B | m;
          l[p++] = z & 255, p < l.length && (l[p++] = z >> 8 & 255), p < l.length && (l[p++] = z >> 16 & 255), B === 6 ? (p < l.length && (l[p++] = z >> 24 & 255), m = 0, B = 0) : (m = z >>> 24, B += 2);
        }
        if (p < l.length)
          for (l[p++] = m; p < l.length; )
            l[p++] = 0;
      }, s.prototype._toArrayLikeBE = function(l, d) {
        for (var p = l.length - 1, m = 0, w = 0, B = 0; w < this.length; w++) {
          var z = this.words[w] << B | m;
          l[p--] = z & 255, p >= 0 && (l[p--] = z >> 8 & 255), p >= 0 && (l[p--] = z >> 16 & 255), B === 6 ? (p >= 0 && (l[p--] = z >> 24 & 255), m = 0, B = 0) : (m = z >>> 24, B += 2);
        }
        if (p >= 0)
          for (l[p--] = m; p >= 0; )
            l[p--] = 0;
      }, Math.clz32 ? s.prototype._countBits = function(l) {
        return 32 - Math.clz32(l);
      } : s.prototype._countBits = function(l) {
        var d = l, p = 0;
        return d >= 4096 && (p += 13, d >>>= 13), d >= 64 && (p += 7, d >>>= 7), d >= 8 && (p += 4, d >>>= 4), d >= 2 && (p += 2, d >>>= 2), p + d;
      }, s.prototype._zeroBits = function(l) {
        if (l === 0) return 26;
        var d = l, p = 0;
        return d & 8191 || (p += 13, d >>>= 13), d & 127 || (p += 7, d >>>= 7), d & 15 || (p += 4, d >>>= 4), d & 3 || (p += 2, d >>>= 2), d & 1 || p++, p;
      }, s.prototype.bitLength = function() {
        var l = this.words[this.length - 1], d = this._countBits(l);
        return (this.length - 1) * 26 + d;
      };
      function L(b) {
        for (var l = new Array(b.bitLength()), d = 0; d < l.length; d++) {
          var p = d / 26 | 0, m = d % 26;
          l[d] = b.words[p] >>> m & 1;
        }
        return l;
      }
      s.prototype.zeroBits = function() {
        if (this.isZero()) return 0;
        for (var l = 0, d = 0; d < this.length; d++) {
          var p = this._zeroBits(this.words[d]);
          if (l += p, p !== 26) break;
        }
        return l;
      }, s.prototype.byteLength = function() {
        return Math.ceil(this.bitLength() / 8);
      }, s.prototype.toTwos = function(l) {
        return this.negative !== 0 ? this.abs().inotn(l).iaddn(1) : this.clone();
      }, s.prototype.fromTwos = function(l) {
        return this.testn(l - 1) ? this.notn(l).iaddn(1).ineg() : this.clone();
      }, s.prototype.isNeg = function() {
        return this.negative !== 0;
      }, s.prototype.neg = function() {
        return this.clone().ineg();
      }, s.prototype.ineg = function() {
        return this.isZero() || (this.negative ^= 1), this;
      }, s.prototype.iuor = function(l) {
        for (; this.length < l.length; )
          this.words[this.length++] = 0;
        for (var d = 0; d < l.length; d++)
          this.words[d] = this.words[d] | l.words[d];
        return this._strip();
      }, s.prototype.ior = function(l) {
        return n((this.negative | l.negative) === 0), this.iuor(l);
      }, s.prototype.or = function(l) {
        return this.length > l.length ? this.clone().ior(l) : l.clone().ior(this);
      }, s.prototype.uor = function(l) {
        return this.length > l.length ? this.clone().iuor(l) : l.clone().iuor(this);
      }, s.prototype.iuand = function(l) {
        var d;
        this.length > l.length ? d = l : d = this;
        for (var p = 0; p < d.length; p++)
          this.words[p] = this.words[p] & l.words[p];
        return this.length = d.length, this._strip();
      }, s.prototype.iand = function(l) {
        return n((this.negative | l.negative) === 0), this.iuand(l);
      }, s.prototype.and = function(l) {
        return this.length > l.length ? this.clone().iand(l) : l.clone().iand(this);
      }, s.prototype.uand = function(l) {
        return this.length > l.length ? this.clone().iuand(l) : l.clone().iuand(this);
      }, s.prototype.iuxor = function(l) {
        var d, p;
        this.length > l.length ? (d = this, p = l) : (d = l, p = this);
        for (var m = 0; m < p.length; m++)
          this.words[m] = d.words[m] ^ p.words[m];
        if (this !== d)
          for (; m < d.length; m++)
            this.words[m] = d.words[m];
        return this.length = d.length, this._strip();
      }, s.prototype.ixor = function(l) {
        return n((this.negative | l.negative) === 0), this.iuxor(l);
      }, s.prototype.xor = function(l) {
        return this.length > l.length ? this.clone().ixor(l) : l.clone().ixor(this);
      }, s.prototype.uxor = function(l) {
        return this.length > l.length ? this.clone().iuxor(l) : l.clone().iuxor(this);
      }, s.prototype.inotn = function(l) {
        n(typeof l == "number" && l >= 0);
        var d = Math.ceil(l / 26) | 0, p = l % 26;
        this._expand(d), p > 0 && d--;
        for (var m = 0; m < d; m++)
          this.words[m] = ~this.words[m] & 67108863;
        return p > 0 && (this.words[m] = ~this.words[m] & 67108863 >> 26 - p), this._strip();
      }, s.prototype.notn = function(l) {
        return this.clone().inotn(l);
      }, s.prototype.setn = function(l, d) {
        n(typeof l == "number" && l >= 0);
        var p = l / 26 | 0, m = l % 26;
        return this._expand(p + 1), d ? this.words[p] = this.words[p] | 1 << m : this.words[p] = this.words[p] & ~(1 << m), this._strip();
      }, s.prototype.iadd = function(l) {
        var d;
        if (this.negative !== 0 && l.negative === 0)
          return this.negative = 0, d = this.isub(l), this.negative ^= 1, this._normSign();
        if (this.negative === 0 && l.negative !== 0)
          return l.negative = 0, d = this.isub(l), l.negative = 1, d._normSign();
        var p, m;
        this.length > l.length ? (p = this, m = l) : (p = l, m = this);
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
      }, s.prototype.add = function(l) {
        var d;
        return l.negative !== 0 && this.negative === 0 ? (l.negative = 0, d = this.sub(l), l.negative ^= 1, d) : l.negative === 0 && this.negative !== 0 ? (this.negative = 0, d = l.sub(this), this.negative = 1, d) : this.length > l.length ? this.clone().iadd(l) : l.clone().iadd(this);
      }, s.prototype.isub = function(l) {
        if (l.negative !== 0) {
          l.negative = 0;
          var d = this.iadd(l);
          return l.negative = 1, d._normSign();
        } else if (this.negative !== 0)
          return this.negative = 0, this.iadd(l), this.negative = 1, this._normSign();
        var p = this.cmp(l);
        if (p === 0)
          return this.negative = 0, this.length = 1, this.words[0] = 0, this;
        var m, w;
        p > 0 ? (m = this, w = l) : (m = l, w = this);
        for (var B = 0, z = 0; z < w.length; z++)
          d = (m.words[z] | 0) - (w.words[z] | 0) + B, B = d >> 26, this.words[z] = d & 67108863;
        for (; B !== 0 && z < m.length; z++)
          d = (m.words[z] | 0) + B, B = d >> 26, this.words[z] = d & 67108863;
        if (B === 0 && z < m.length && m !== this)
          for (; z < m.length; z++)
            this.words[z] = m.words[z];
        return this.length = Math.max(this.length, z), m !== this && (this.negative = 1), this._strip();
      }, s.prototype.sub = function(l) {
        return this.clone().isub(l);
      };
      function Y(b, l, d) {
        d.negative = l.negative ^ b.negative;
        var p = b.length + l.length | 0;
        d.length = p, p = p - 1 | 0;
        var m = b.words[0] | 0, w = l.words[0] | 0, B = m * w, z = B & 67108863, I = B / 67108864 | 0;
        d.words[0] = z;
        for (var f = 1; f < p; f++) {
          for (var g = I >>> 26, M = I & 67108863, T = Math.min(f, l.length - 1), W = Math.max(0, f - b.length + 1); W <= T; W++) {
            var J = f - W | 0;
            m = b.words[J] | 0, w = l.words[W] | 0, B = m * w + M, g += B / 67108864 | 0, M = B & 67108863;
          }
          d.words[f] = M | 0, I = g | 0;
        }
        return I !== 0 ? d.words[f] = I | 0 : d.length--, d._strip();
      }
      var Q = function(l, d, p) {
        var m = l.words, w = d.words, B = p.words, z = 0, I, f, g, M = m[0] | 0, T = M & 8191, W = M >>> 13, J = m[1] | 0, tt = J & 8191, st = J >>> 13, xt = m[2] | 0, gt = xt & 8191, bt = xt >>> 13, Et = m[3] | 0, ht = Et & 8191, wt = Et >>> 13, on = m[4] | 0, Bt = on & 8191, Ot = on >>> 13, wn = m[5] | 0, Lt = wn & 8191, Ct = wn >>> 13, jt = m[6] | 0, Rt = jt & 8191, zt = jt >>> 13, Jt = m[7] | 0, Pt = Jt & 8191, a = Jt >>> 13, o = m[8] | 0, c = o & 8191, y = o >>> 13, k = m[9] | 0, j = k & 8191, H = k >>> 13, ut = w[0] | 0, lt = ut & 8191, at = ut >>> 13, yt = w[1] | 0, ct = yt & 8191, Kt = yt >>> 13, Co = w[2] | 0, Vt = Co & 8191, Xt = Co >>> 13, ko = w[3] | 0, $t = ko & 8191, te = ko >>> 13, No = w[4] | 0, ee = No & 8191, ne = No >>> 13, To = w[5] | 0, re = To & 8191, ie = To >>> 13, Lo = w[6] | 0, se = Lo & 8191, oe = Lo >>> 13, Ro = w[7] | 0, ae = Ro & 8191, ce = Ro >>> 13, Oo = w[8] | 0, ue = Oo & 8191, le = Oo >>> 13, Do = w[9] | 0, he = Do & 8191, fe = Do >>> 13;
        p.negative = l.negative ^ d.negative, p.length = 19, I = Math.imul(T, lt), f = Math.imul(T, at), f = f + Math.imul(W, lt) | 0, g = Math.imul(W, at);
        var Ri = (z + I | 0) + ((f & 8191) << 13) | 0;
        z = (g + (f >>> 13) | 0) + (Ri >>> 26) | 0, Ri &= 67108863, I = Math.imul(tt, lt), f = Math.imul(tt, at), f = f + Math.imul(st, lt) | 0, g = Math.imul(st, at), I = I + Math.imul(T, ct) | 0, f = f + Math.imul(T, Kt) | 0, f = f + Math.imul(W, ct) | 0, g = g + Math.imul(W, Kt) | 0;
        var Oi = (z + I | 0) + ((f & 8191) << 13) | 0;
        z = (g + (f >>> 13) | 0) + (Oi >>> 26) | 0, Oi &= 67108863, I = Math.imul(gt, lt), f = Math.imul(gt, at), f = f + Math.imul(bt, lt) | 0, g = Math.imul(bt, at), I = I + Math.imul(tt, ct) | 0, f = f + Math.imul(tt, Kt) | 0, f = f + Math.imul(st, ct) | 0, g = g + Math.imul(st, Kt) | 0, I = I + Math.imul(T, Vt) | 0, f = f + Math.imul(T, Xt) | 0, f = f + Math.imul(W, Vt) | 0, g = g + Math.imul(W, Xt) | 0;
        var Di = (z + I | 0) + ((f & 8191) << 13) | 0;
        z = (g + (f >>> 13) | 0) + (Di >>> 26) | 0, Di &= 67108863, I = Math.imul(ht, lt), f = Math.imul(ht, at), f = f + Math.imul(wt, lt) | 0, g = Math.imul(wt, at), I = I + Math.imul(gt, ct) | 0, f = f + Math.imul(gt, Kt) | 0, f = f + Math.imul(bt, ct) | 0, g = g + Math.imul(bt, Kt) | 0, I = I + Math.imul(tt, Vt) | 0, f = f + Math.imul(tt, Xt) | 0, f = f + Math.imul(st, Vt) | 0, g = g + Math.imul(st, Xt) | 0, I = I + Math.imul(T, $t) | 0, f = f + Math.imul(T, te) | 0, f = f + Math.imul(W, $t) | 0, g = g + Math.imul(W, te) | 0;
        var Ui = (z + I | 0) + ((f & 8191) << 13) | 0;
        z = (g + (f >>> 13) | 0) + (Ui >>> 26) | 0, Ui &= 67108863, I = Math.imul(Bt, lt), f = Math.imul(Bt, at), f = f + Math.imul(Ot, lt) | 0, g = Math.imul(Ot, at), I = I + Math.imul(ht, ct) | 0, f = f + Math.imul(ht, Kt) | 0, f = f + Math.imul(wt, ct) | 0, g = g + Math.imul(wt, Kt) | 0, I = I + Math.imul(gt, Vt) | 0, f = f + Math.imul(gt, Xt) | 0, f = f + Math.imul(bt, Vt) | 0, g = g + Math.imul(bt, Xt) | 0, I = I + Math.imul(tt, $t) | 0, f = f + Math.imul(tt, te) | 0, f = f + Math.imul(st, $t) | 0, g = g + Math.imul(st, te) | 0, I = I + Math.imul(T, ee) | 0, f = f + Math.imul(T, ne) | 0, f = f + Math.imul(W, ee) | 0, g = g + Math.imul(W, ne) | 0;
        var ji = (z + I | 0) + ((f & 8191) << 13) | 0;
        z = (g + (f >>> 13) | 0) + (ji >>> 26) | 0, ji &= 67108863, I = Math.imul(Lt, lt), f = Math.imul(Lt, at), f = f + Math.imul(Ct, lt) | 0, g = Math.imul(Ct, at), I = I + Math.imul(Bt, ct) | 0, f = f + Math.imul(Bt, Kt) | 0, f = f + Math.imul(Ot, ct) | 0, g = g + Math.imul(Ot, Kt) | 0, I = I + Math.imul(ht, Vt) | 0, f = f + Math.imul(ht, Xt) | 0, f = f + Math.imul(wt, Vt) | 0, g = g + Math.imul(wt, Xt) | 0, I = I + Math.imul(gt, $t) | 0, f = f + Math.imul(gt, te) | 0, f = f + Math.imul(bt, $t) | 0, g = g + Math.imul(bt, te) | 0, I = I + Math.imul(tt, ee) | 0, f = f + Math.imul(tt, ne) | 0, f = f + Math.imul(st, ee) | 0, g = g + Math.imul(st, ne) | 0, I = I + Math.imul(T, re) | 0, f = f + Math.imul(T, ie) | 0, f = f + Math.imul(W, re) | 0, g = g + Math.imul(W, ie) | 0;
        var zi = (z + I | 0) + ((f & 8191) << 13) | 0;
        z = (g + (f >>> 13) | 0) + (zi >>> 26) | 0, zi &= 67108863, I = Math.imul(Rt, lt), f = Math.imul(Rt, at), f = f + Math.imul(zt, lt) | 0, g = Math.imul(zt, at), I = I + Math.imul(Lt, ct) | 0, f = f + Math.imul(Lt, Kt) | 0, f = f + Math.imul(Ct, ct) | 0, g = g + Math.imul(Ct, Kt) | 0, I = I + Math.imul(Bt, Vt) | 0, f = f + Math.imul(Bt, Xt) | 0, f = f + Math.imul(Ot, Vt) | 0, g = g + Math.imul(Ot, Xt) | 0, I = I + Math.imul(ht, $t) | 0, f = f + Math.imul(ht, te) | 0, f = f + Math.imul(wt, $t) | 0, g = g + Math.imul(wt, te) | 0, I = I + Math.imul(gt, ee) | 0, f = f + Math.imul(gt, ne) | 0, f = f + Math.imul(bt, ee) | 0, g = g + Math.imul(bt, ne) | 0, I = I + Math.imul(tt, re) | 0, f = f + Math.imul(tt, ie) | 0, f = f + Math.imul(st, re) | 0, g = g + Math.imul(st, ie) | 0, I = I + Math.imul(T, se) | 0, f = f + Math.imul(T, oe) | 0, f = f + Math.imul(W, se) | 0, g = g + Math.imul(W, oe) | 0;
        var Pi = (z + I | 0) + ((f & 8191) << 13) | 0;
        z = (g + (f >>> 13) | 0) + (Pi >>> 26) | 0, Pi &= 67108863, I = Math.imul(Pt, lt), f = Math.imul(Pt, at), f = f + Math.imul(a, lt) | 0, g = Math.imul(a, at), I = I + Math.imul(Rt, ct) | 0, f = f + Math.imul(Rt, Kt) | 0, f = f + Math.imul(zt, ct) | 0, g = g + Math.imul(zt, Kt) | 0, I = I + Math.imul(Lt, Vt) | 0, f = f + Math.imul(Lt, Xt) | 0, f = f + Math.imul(Ct, Vt) | 0, g = g + Math.imul(Ct, Xt) | 0, I = I + Math.imul(Bt, $t) | 0, f = f + Math.imul(Bt, te) | 0, f = f + Math.imul(Ot, $t) | 0, g = g + Math.imul(Ot, te) | 0, I = I + Math.imul(ht, ee) | 0, f = f + Math.imul(ht, ne) | 0, f = f + Math.imul(wt, ee) | 0, g = g + Math.imul(wt, ne) | 0, I = I + Math.imul(gt, re) | 0, f = f + Math.imul(gt, ie) | 0, f = f + Math.imul(bt, re) | 0, g = g + Math.imul(bt, ie) | 0, I = I + Math.imul(tt, se) | 0, f = f + Math.imul(tt, oe) | 0, f = f + Math.imul(st, se) | 0, g = g + Math.imul(st, oe) | 0, I = I + Math.imul(T, ae) | 0, f = f + Math.imul(T, ce) | 0, f = f + Math.imul(W, ae) | 0, g = g + Math.imul(W, ce) | 0;
        var Fi = (z + I | 0) + ((f & 8191) << 13) | 0;
        z = (g + (f >>> 13) | 0) + (Fi >>> 26) | 0, Fi &= 67108863, I = Math.imul(c, lt), f = Math.imul(c, at), f = f + Math.imul(y, lt) | 0, g = Math.imul(y, at), I = I + Math.imul(Pt, ct) | 0, f = f + Math.imul(Pt, Kt) | 0, f = f + Math.imul(a, ct) | 0, g = g + Math.imul(a, Kt) | 0, I = I + Math.imul(Rt, Vt) | 0, f = f + Math.imul(Rt, Xt) | 0, f = f + Math.imul(zt, Vt) | 0, g = g + Math.imul(zt, Xt) | 0, I = I + Math.imul(Lt, $t) | 0, f = f + Math.imul(Lt, te) | 0, f = f + Math.imul(Ct, $t) | 0, g = g + Math.imul(Ct, te) | 0, I = I + Math.imul(Bt, ee) | 0, f = f + Math.imul(Bt, ne) | 0, f = f + Math.imul(Ot, ee) | 0, g = g + Math.imul(Ot, ne) | 0, I = I + Math.imul(ht, re) | 0, f = f + Math.imul(ht, ie) | 0, f = f + Math.imul(wt, re) | 0, g = g + Math.imul(wt, ie) | 0, I = I + Math.imul(gt, se) | 0, f = f + Math.imul(gt, oe) | 0, f = f + Math.imul(bt, se) | 0, g = g + Math.imul(bt, oe) | 0, I = I + Math.imul(tt, ae) | 0, f = f + Math.imul(tt, ce) | 0, f = f + Math.imul(st, ae) | 0, g = g + Math.imul(st, ce) | 0, I = I + Math.imul(T, ue) | 0, f = f + Math.imul(T, le) | 0, f = f + Math.imul(W, ue) | 0, g = g + Math.imul(W, le) | 0;
        var Qi = (z + I | 0) + ((f & 8191) << 13) | 0;
        z = (g + (f >>> 13) | 0) + (Qi >>> 26) | 0, Qi &= 67108863, I = Math.imul(j, lt), f = Math.imul(j, at), f = f + Math.imul(H, lt) | 0, g = Math.imul(H, at), I = I + Math.imul(c, ct) | 0, f = f + Math.imul(c, Kt) | 0, f = f + Math.imul(y, ct) | 0, g = g + Math.imul(y, Kt) | 0, I = I + Math.imul(Pt, Vt) | 0, f = f + Math.imul(Pt, Xt) | 0, f = f + Math.imul(a, Vt) | 0, g = g + Math.imul(a, Xt) | 0, I = I + Math.imul(Rt, $t) | 0, f = f + Math.imul(Rt, te) | 0, f = f + Math.imul(zt, $t) | 0, g = g + Math.imul(zt, te) | 0, I = I + Math.imul(Lt, ee) | 0, f = f + Math.imul(Lt, ne) | 0, f = f + Math.imul(Ct, ee) | 0, g = g + Math.imul(Ct, ne) | 0, I = I + Math.imul(Bt, re) | 0, f = f + Math.imul(Bt, ie) | 0, f = f + Math.imul(Ot, re) | 0, g = g + Math.imul(Ot, ie) | 0, I = I + Math.imul(ht, se) | 0, f = f + Math.imul(ht, oe) | 0, f = f + Math.imul(wt, se) | 0, g = g + Math.imul(wt, oe) | 0, I = I + Math.imul(gt, ae) | 0, f = f + Math.imul(gt, ce) | 0, f = f + Math.imul(bt, ae) | 0, g = g + Math.imul(bt, ce) | 0, I = I + Math.imul(tt, ue) | 0, f = f + Math.imul(tt, le) | 0, f = f + Math.imul(st, ue) | 0, g = g + Math.imul(st, le) | 0, I = I + Math.imul(T, he) | 0, f = f + Math.imul(T, fe) | 0, f = f + Math.imul(W, he) | 0, g = g + Math.imul(W, fe) | 0;
        var _i = (z + I | 0) + ((f & 8191) << 13) | 0;
        z = (g + (f >>> 13) | 0) + (_i >>> 26) | 0, _i &= 67108863, I = Math.imul(j, ct), f = Math.imul(j, Kt), f = f + Math.imul(H, ct) | 0, g = Math.imul(H, Kt), I = I + Math.imul(c, Vt) | 0, f = f + Math.imul(c, Xt) | 0, f = f + Math.imul(y, Vt) | 0, g = g + Math.imul(y, Xt) | 0, I = I + Math.imul(Pt, $t) | 0, f = f + Math.imul(Pt, te) | 0, f = f + Math.imul(a, $t) | 0, g = g + Math.imul(a, te) | 0, I = I + Math.imul(Rt, ee) | 0, f = f + Math.imul(Rt, ne) | 0, f = f + Math.imul(zt, ee) | 0, g = g + Math.imul(zt, ne) | 0, I = I + Math.imul(Lt, re) | 0, f = f + Math.imul(Lt, ie) | 0, f = f + Math.imul(Ct, re) | 0, g = g + Math.imul(Ct, ie) | 0, I = I + Math.imul(Bt, se) | 0, f = f + Math.imul(Bt, oe) | 0, f = f + Math.imul(Ot, se) | 0, g = g + Math.imul(Ot, oe) | 0, I = I + Math.imul(ht, ae) | 0, f = f + Math.imul(ht, ce) | 0, f = f + Math.imul(wt, ae) | 0, g = g + Math.imul(wt, ce) | 0, I = I + Math.imul(gt, ue) | 0, f = f + Math.imul(gt, le) | 0, f = f + Math.imul(bt, ue) | 0, g = g + Math.imul(bt, le) | 0, I = I + Math.imul(tt, he) | 0, f = f + Math.imul(tt, fe) | 0, f = f + Math.imul(st, he) | 0, g = g + Math.imul(st, fe) | 0;
        var Hi = (z + I | 0) + ((f & 8191) << 13) | 0;
        z = (g + (f >>> 13) | 0) + (Hi >>> 26) | 0, Hi &= 67108863, I = Math.imul(j, Vt), f = Math.imul(j, Xt), f = f + Math.imul(H, Vt) | 0, g = Math.imul(H, Xt), I = I + Math.imul(c, $t) | 0, f = f + Math.imul(c, te) | 0, f = f + Math.imul(y, $t) | 0, g = g + Math.imul(y, te) | 0, I = I + Math.imul(Pt, ee) | 0, f = f + Math.imul(Pt, ne) | 0, f = f + Math.imul(a, ee) | 0, g = g + Math.imul(a, ne) | 0, I = I + Math.imul(Rt, re) | 0, f = f + Math.imul(Rt, ie) | 0, f = f + Math.imul(zt, re) | 0, g = g + Math.imul(zt, ie) | 0, I = I + Math.imul(Lt, se) | 0, f = f + Math.imul(Lt, oe) | 0, f = f + Math.imul(Ct, se) | 0, g = g + Math.imul(Ct, oe) | 0, I = I + Math.imul(Bt, ae) | 0, f = f + Math.imul(Bt, ce) | 0, f = f + Math.imul(Ot, ae) | 0, g = g + Math.imul(Ot, ce) | 0, I = I + Math.imul(ht, ue) | 0, f = f + Math.imul(ht, le) | 0, f = f + Math.imul(wt, ue) | 0, g = g + Math.imul(wt, le) | 0, I = I + Math.imul(gt, he) | 0, f = f + Math.imul(gt, fe) | 0, f = f + Math.imul(bt, he) | 0, g = g + Math.imul(bt, fe) | 0;
        var Wi = (z + I | 0) + ((f & 8191) << 13) | 0;
        z = (g + (f >>> 13) | 0) + (Wi >>> 26) | 0, Wi &= 67108863, I = Math.imul(j, $t), f = Math.imul(j, te), f = f + Math.imul(H, $t) | 0, g = Math.imul(H, te), I = I + Math.imul(c, ee) | 0, f = f + Math.imul(c, ne) | 0, f = f + Math.imul(y, ee) | 0, g = g + Math.imul(y, ne) | 0, I = I + Math.imul(Pt, re) | 0, f = f + Math.imul(Pt, ie) | 0, f = f + Math.imul(a, re) | 0, g = g + Math.imul(a, ie) | 0, I = I + Math.imul(Rt, se) | 0, f = f + Math.imul(Rt, oe) | 0, f = f + Math.imul(zt, se) | 0, g = g + Math.imul(zt, oe) | 0, I = I + Math.imul(Lt, ae) | 0, f = f + Math.imul(Lt, ce) | 0, f = f + Math.imul(Ct, ae) | 0, g = g + Math.imul(Ct, ce) | 0, I = I + Math.imul(Bt, ue) | 0, f = f + Math.imul(Bt, le) | 0, f = f + Math.imul(Ot, ue) | 0, g = g + Math.imul(Ot, le) | 0, I = I + Math.imul(ht, he) | 0, f = f + Math.imul(ht, fe) | 0, f = f + Math.imul(wt, he) | 0, g = g + Math.imul(wt, fe) | 0;
        var qi = (z + I | 0) + ((f & 8191) << 13) | 0;
        z = (g + (f >>> 13) | 0) + (qi >>> 26) | 0, qi &= 67108863, I = Math.imul(j, ee), f = Math.imul(j, ne), f = f + Math.imul(H, ee) | 0, g = Math.imul(H, ne), I = I + Math.imul(c, re) | 0, f = f + Math.imul(c, ie) | 0, f = f + Math.imul(y, re) | 0, g = g + Math.imul(y, ie) | 0, I = I + Math.imul(Pt, se) | 0, f = f + Math.imul(Pt, oe) | 0, f = f + Math.imul(a, se) | 0, g = g + Math.imul(a, oe) | 0, I = I + Math.imul(Rt, ae) | 0, f = f + Math.imul(Rt, ce) | 0, f = f + Math.imul(zt, ae) | 0, g = g + Math.imul(zt, ce) | 0, I = I + Math.imul(Lt, ue) | 0, f = f + Math.imul(Lt, le) | 0, f = f + Math.imul(Ct, ue) | 0, g = g + Math.imul(Ct, le) | 0, I = I + Math.imul(Bt, he) | 0, f = f + Math.imul(Bt, fe) | 0, f = f + Math.imul(Ot, he) | 0, g = g + Math.imul(Ot, fe) | 0;
        var Yi = (z + I | 0) + ((f & 8191) << 13) | 0;
        z = (g + (f >>> 13) | 0) + (Yi >>> 26) | 0, Yi &= 67108863, I = Math.imul(j, re), f = Math.imul(j, ie), f = f + Math.imul(H, re) | 0, g = Math.imul(H, ie), I = I + Math.imul(c, se) | 0, f = f + Math.imul(c, oe) | 0, f = f + Math.imul(y, se) | 0, g = g + Math.imul(y, oe) | 0, I = I + Math.imul(Pt, ae) | 0, f = f + Math.imul(Pt, ce) | 0, f = f + Math.imul(a, ae) | 0, g = g + Math.imul(a, ce) | 0, I = I + Math.imul(Rt, ue) | 0, f = f + Math.imul(Rt, le) | 0, f = f + Math.imul(zt, ue) | 0, g = g + Math.imul(zt, le) | 0, I = I + Math.imul(Lt, he) | 0, f = f + Math.imul(Lt, fe) | 0, f = f + Math.imul(Ct, he) | 0, g = g + Math.imul(Ct, fe) | 0;
        var Zi = (z + I | 0) + ((f & 8191) << 13) | 0;
        z = (g + (f >>> 13) | 0) + (Zi >>> 26) | 0, Zi &= 67108863, I = Math.imul(j, se), f = Math.imul(j, oe), f = f + Math.imul(H, se) | 0, g = Math.imul(H, oe), I = I + Math.imul(c, ae) | 0, f = f + Math.imul(c, ce) | 0, f = f + Math.imul(y, ae) | 0, g = g + Math.imul(y, ce) | 0, I = I + Math.imul(Pt, ue) | 0, f = f + Math.imul(Pt, le) | 0, f = f + Math.imul(a, ue) | 0, g = g + Math.imul(a, le) | 0, I = I + Math.imul(Rt, he) | 0, f = f + Math.imul(Rt, fe) | 0, f = f + Math.imul(zt, he) | 0, g = g + Math.imul(zt, fe) | 0;
        var Gi = (z + I | 0) + ((f & 8191) << 13) | 0;
        z = (g + (f >>> 13) | 0) + (Gi >>> 26) | 0, Gi &= 67108863, I = Math.imul(j, ae), f = Math.imul(j, ce), f = f + Math.imul(H, ae) | 0, g = Math.imul(H, ce), I = I + Math.imul(c, ue) | 0, f = f + Math.imul(c, le) | 0, f = f + Math.imul(y, ue) | 0, g = g + Math.imul(y, le) | 0, I = I + Math.imul(Pt, he) | 0, f = f + Math.imul(Pt, fe) | 0, f = f + Math.imul(a, he) | 0, g = g + Math.imul(a, fe) | 0;
        var Ji = (z + I | 0) + ((f & 8191) << 13) | 0;
        z = (g + (f >>> 13) | 0) + (Ji >>> 26) | 0, Ji &= 67108863, I = Math.imul(j, ue), f = Math.imul(j, le), f = f + Math.imul(H, ue) | 0, g = Math.imul(H, le), I = I + Math.imul(c, he) | 0, f = f + Math.imul(c, fe) | 0, f = f + Math.imul(y, he) | 0, g = g + Math.imul(y, fe) | 0;
        var Ki = (z + I | 0) + ((f & 8191) << 13) | 0;
        z = (g + (f >>> 13) | 0) + (Ki >>> 26) | 0, Ki &= 67108863, I = Math.imul(j, he), f = Math.imul(j, fe), f = f + Math.imul(H, he) | 0, g = Math.imul(H, fe);
        var Vi = (z + I | 0) + ((f & 8191) << 13) | 0;
        return z = (g + (f >>> 13) | 0) + (Vi >>> 26) | 0, Vi &= 67108863, B[0] = Ri, B[1] = Oi, B[2] = Di, B[3] = Ui, B[4] = ji, B[5] = zi, B[6] = Pi, B[7] = Fi, B[8] = Qi, B[9] = _i, B[10] = Hi, B[11] = Wi, B[12] = qi, B[13] = Yi, B[14] = Zi, B[15] = Gi, B[16] = Ji, B[17] = Ki, B[18] = Vi, z !== 0 && (B[19] = z, p.length++), p;
      };
      Math.imul || (Q = Y);
      function q(b, l, d) {
        d.negative = l.negative ^ b.negative, d.length = b.length + l.length;
        for (var p = 0, m = 0, w = 0; w < d.length - 1; w++) {
          var B = m;
          m = 0;
          for (var z = p & 67108863, I = Math.min(w, l.length - 1), f = Math.max(0, w - b.length + 1); f <= I; f++) {
            var g = w - f, M = b.words[g] | 0, T = l.words[f] | 0, W = M * T, J = W & 67108863;
            B = B + (W / 67108864 | 0) | 0, J = J + z | 0, z = J & 67108863, B = B + (J >>> 26) | 0, m += B >>> 26, B &= 67108863;
          }
          d.words[w] = z, p = B, B = m;
        }
        return p !== 0 ? d.words[w] = p : d.length--, d._strip();
      }
      function K(b, l, d) {
        return q(b, l, d);
      }
      s.prototype.mulTo = function(l, d) {
        var p, m = this.length + l.length;
        return this.length === 10 && l.length === 10 ? p = Q(this, l, d) : m < 63 ? p = Y(this, l, d) : m < 1024 ? p = q(this, l, d) : p = K(this, l, d), p;
      }, s.prototype.mul = function(l) {
        var d = new s(null);
        return d.words = new Array(this.length + l.length), this.mulTo(l, d);
      }, s.prototype.mulf = function(l) {
        var d = new s(null);
        return d.words = new Array(this.length + l.length), K(this, l, d);
      }, s.prototype.imul = function(l) {
        return this.clone().mulTo(l, this);
      }, s.prototype.imuln = function(l) {
        var d = l < 0;
        d && (l = -l), n(typeof l == "number"), n(l < 67108864);
        for (var p = 0, m = 0; m < this.length; m++) {
          var w = (this.words[m] | 0) * l, B = (w & 67108863) + (p & 67108863);
          p >>= 26, p += w / 67108864 | 0, p += B >>> 26, this.words[m] = B & 67108863;
        }
        return p !== 0 && (this.words[m] = p, this.length++), d ? this.ineg() : this;
      }, s.prototype.muln = function(l) {
        return this.clone().imuln(l);
      }, s.prototype.sqr = function() {
        return this.mul(this);
      }, s.prototype.isqr = function() {
        return this.imul(this.clone());
      }, s.prototype.pow = function(l) {
        var d = L(l);
        if (d.length === 0) return new s(1);
        for (var p = this, m = 0; m < d.length && d[m] === 0; m++, p = p.sqr())
          ;
        if (++m < d.length)
          for (var w = p.sqr(); m < d.length; m++, w = w.sqr())
            d[m] !== 0 && (p = p.mul(w));
        return p;
      }, s.prototype.iushln = function(l) {
        n(typeof l == "number" && l >= 0);
        var d = l % 26, p = (l - d) / 26, m = 67108863 >>> 26 - d << 26 - d, w;
        if (d !== 0) {
          var B = 0;
          for (w = 0; w < this.length; w++) {
            var z = this.words[w] & m, I = (this.words[w] | 0) - z << d;
            this.words[w] = I | B, B = z >>> 26 - d;
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
      }, s.prototype.ishln = function(l) {
        return n(this.negative === 0), this.iushln(l);
      }, s.prototype.iushrn = function(l, d, p) {
        n(typeof l == "number" && l >= 0);
        var m;
        d ? m = (d - d % 26) / 26 : m = 0;
        var w = l % 26, B = Math.min((l - w) / 26, this.length), z = 67108863 ^ 67108863 >>> w << w, I = p;
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
          var M = this.words[f] | 0;
          this.words[f] = g << 26 - w | M >>> w, g = M & z;
        }
        return I && g !== 0 && (I.words[I.length++] = g), this.length === 0 && (this.words[0] = 0, this.length = 1), this._strip();
      }, s.prototype.ishrn = function(l, d, p) {
        return n(this.negative === 0), this.iushrn(l, d, p);
      }, s.prototype.shln = function(l) {
        return this.clone().ishln(l);
      }, s.prototype.ushln = function(l) {
        return this.clone().iushln(l);
      }, s.prototype.shrn = function(l) {
        return this.clone().ishrn(l);
      }, s.prototype.ushrn = function(l) {
        return this.clone().iushrn(l);
      }, s.prototype.testn = function(l) {
        n(typeof l == "number" && l >= 0);
        var d = l % 26, p = (l - d) / 26, m = 1 << d;
        if (this.length <= p) return !1;
        var w = this.words[p];
        return !!(w & m);
      }, s.prototype.imaskn = function(l) {
        n(typeof l == "number" && l >= 0);
        var d = l % 26, p = (l - d) / 26;
        if (n(this.negative === 0, "imaskn works only with positive numbers"), this.length <= p)
          return this;
        if (d !== 0 && p++, this.length = Math.min(p, this.length), d !== 0) {
          var m = 67108863 ^ 67108863 >>> d << d;
          this.words[this.length - 1] &= m;
        }
        return this._strip();
      }, s.prototype.maskn = function(l) {
        return this.clone().imaskn(l);
      }, s.prototype.iaddn = function(l) {
        return n(typeof l == "number"), n(l < 67108864), l < 0 ? this.isubn(-l) : this.negative !== 0 ? this.length === 1 && (this.words[0] | 0) <= l ? (this.words[0] = l - (this.words[0] | 0), this.negative = 0, this) : (this.negative = 0, this.isubn(l), this.negative = 1, this) : this._iaddn(l);
      }, s.prototype._iaddn = function(l) {
        this.words[0] += l;
        for (var d = 0; d < this.length && this.words[d] >= 67108864; d++)
          this.words[d] -= 67108864, d === this.length - 1 ? this.words[d + 1] = 1 : this.words[d + 1]++;
        return this.length = Math.max(this.length, d + 1), this;
      }, s.prototype.isubn = function(l) {
        if (n(typeof l == "number"), n(l < 67108864), l < 0) return this.iaddn(-l);
        if (this.negative !== 0)
          return this.negative = 0, this.iaddn(l), this.negative = 1, this;
        if (this.words[0] -= l, this.length === 1 && this.words[0] < 0)
          this.words[0] = -this.words[0], this.negative = 1;
        else
          for (var d = 0; d < this.length && this.words[d] < 0; d++)
            this.words[d] += 67108864, this.words[d + 1] -= 1;
        return this._strip();
      }, s.prototype.addn = function(l) {
        return this.clone().iaddn(l);
      }, s.prototype.subn = function(l) {
        return this.clone().isubn(l);
      }, s.prototype.iabs = function() {
        return this.negative = 0, this;
      }, s.prototype.abs = function() {
        return this.clone().iabs();
      }, s.prototype._ishlnsubmul = function(l, d, p) {
        var m = l.length + p, w;
        this._expand(m);
        var B, z = 0;
        for (w = 0; w < l.length; w++) {
          B = (this.words[w + p] | 0) + z;
          var I = (l.words[w] | 0) * d;
          B -= I & 67108863, z = (B >> 26) - (I / 67108864 | 0), this.words[w + p] = B & 67108863;
        }
        for (; w < this.length - p; w++)
          B = (this.words[w + p] | 0) + z, z = B >> 26, this.words[w + p] = B & 67108863;
        if (z === 0) return this._strip();
        for (n(z === -1), z = 0, w = 0; w < this.length; w++)
          B = -(this.words[w] | 0) + z, z = B >> 26, this.words[w] = B & 67108863;
        return this.negative = 1, this._strip();
      }, s.prototype._wordDiv = function(l, d) {
        var p = this.length - l.length, m = this.clone(), w = l, B = w.words[w.length - 1] | 0, z = this._countBits(B);
        p = 26 - z, p !== 0 && (w = w.ushln(p), m.iushln(p), B = w.words[w.length - 1] | 0);
        var I = m.length - w.length, f;
        if (d !== "mod") {
          f = new s(null), f.length = I + 1, f.words = new Array(f.length);
          for (var g = 0; g < f.length; g++)
            f.words[g] = 0;
        }
        var M = m.clone()._ishlnsubmul(w, 1, I);
        M.negative === 0 && (m = M, f && (f.words[I] = 1));
        for (var T = I - 1; T >= 0; T--) {
          var W = (m.words[w.length + T] | 0) * 67108864 + (m.words[w.length + T - 1] | 0);
          for (W = Math.min(W / B | 0, 67108863), m._ishlnsubmul(w, W, T); m.negative !== 0; )
            W--, m.negative = 0, m._ishlnsubmul(w, 1, T), m.isZero() || (m.negative ^= 1);
          f && (f.words[T] = W);
        }
        return f && f._strip(), m._strip(), d !== "div" && p !== 0 && m.iushrn(p), {
          div: f || null,
          mod: m
        };
      }, s.prototype.divmod = function(l, d, p) {
        if (n(!l.isZero()), this.isZero())
          return {
            div: new s(0),
            mod: new s(0)
          };
        var m, w, B;
        return this.negative !== 0 && l.negative === 0 ? (B = this.neg().divmod(l, d), d !== "mod" && (m = B.div.neg()), d !== "div" && (w = B.mod.neg(), p && w.negative !== 0 && w.iadd(l)), {
          div: m,
          mod: w
        }) : this.negative === 0 && l.negative !== 0 ? (B = this.divmod(l.neg(), d), d !== "mod" && (m = B.div.neg()), {
          div: m,
          mod: B.mod
        }) : this.negative & l.negative ? (B = this.neg().divmod(l.neg(), d), d !== "div" && (w = B.mod.neg(), p && w.negative !== 0 && w.isub(l)), {
          div: B.div,
          mod: w
        }) : l.length > this.length || this.cmp(l) < 0 ? {
          div: new s(0),
          mod: this
        } : l.length === 1 ? d === "div" ? {
          div: this.divn(l.words[0]),
          mod: null
        } : d === "mod" ? {
          div: null,
          mod: new s(this.modrn(l.words[0]))
        } : {
          div: this.divn(l.words[0]),
          mod: new s(this.modrn(l.words[0]))
        } : this._wordDiv(l, d);
      }, s.prototype.div = function(l) {
        return this.divmod(l, "div", !1).div;
      }, s.prototype.mod = function(l) {
        return this.divmod(l, "mod", !1).mod;
      }, s.prototype.umod = function(l) {
        return this.divmod(l, "mod", !0).mod;
      }, s.prototype.divRound = function(l) {
        var d = this.divmod(l);
        if (d.mod.isZero()) return d.div;
        var p = d.div.negative !== 0 ? d.mod.isub(l) : d.mod, m = l.ushrn(1), w = l.andln(1), B = p.cmp(m);
        return B < 0 || w === 1 && B === 0 ? d.div : d.div.negative !== 0 ? d.div.isubn(1) : d.div.iaddn(1);
      }, s.prototype.modrn = function(l) {
        var d = l < 0;
        d && (l = -l), n(l <= 67108863);
        for (var p = (1 << 26) % l, m = 0, w = this.length - 1; w >= 0; w--)
          m = (p * m + (this.words[w] | 0)) % l;
        return d ? -m : m;
      }, s.prototype.modn = function(l) {
        return this.modrn(l);
      }, s.prototype.idivn = function(l) {
        var d = l < 0;
        d && (l = -l), n(l <= 67108863);
        for (var p = 0, m = this.length - 1; m >= 0; m--) {
          var w = (this.words[m] | 0) + p * 67108864;
          this.words[m] = w / l | 0, p = w % l;
        }
        return this._strip(), d ? this.ineg() : this;
      }, s.prototype.divn = function(l) {
        return this.clone().idivn(l);
      }, s.prototype.egcd = function(l) {
        n(l.negative === 0), n(!l.isZero());
        var d = this, p = l.clone();
        d.negative !== 0 ? d = d.umod(l) : d = d.clone();
        for (var m = new s(1), w = new s(0), B = new s(0), z = new s(1), I = 0; d.isEven() && p.isEven(); )
          d.iushrn(1), p.iushrn(1), ++I;
        for (var f = p.clone(), g = d.clone(); !d.isZero(); ) {
          for (var M = 0, T = 1; !(d.words[0] & T) && M < 26; ++M, T <<= 1) ;
          if (M > 0)
            for (d.iushrn(M); M-- > 0; )
              (m.isOdd() || w.isOdd()) && (m.iadd(f), w.isub(g)), m.iushrn(1), w.iushrn(1);
          for (var W = 0, J = 1; !(p.words[0] & J) && W < 26; ++W, J <<= 1) ;
          if (W > 0)
            for (p.iushrn(W); W-- > 0; )
              (B.isOdd() || z.isOdd()) && (B.iadd(f), z.isub(g)), B.iushrn(1), z.iushrn(1);
          d.cmp(p) >= 0 ? (d.isub(p), m.isub(B), w.isub(z)) : (p.isub(d), B.isub(m), z.isub(w));
        }
        return {
          a: B,
          b: z,
          gcd: p.iushln(I)
        };
      }, s.prototype._invmp = function(l) {
        n(l.negative === 0), n(!l.isZero());
        var d = this, p = l.clone();
        d.negative !== 0 ? d = d.umod(l) : d = d.clone();
        for (var m = new s(1), w = new s(0), B = p.clone(); d.cmpn(1) > 0 && p.cmpn(1) > 0; ) {
          for (var z = 0, I = 1; !(d.words[0] & I) && z < 26; ++z, I <<= 1) ;
          if (z > 0)
            for (d.iushrn(z); z-- > 0; )
              m.isOdd() && m.iadd(B), m.iushrn(1);
          for (var f = 0, g = 1; !(p.words[0] & g) && f < 26; ++f, g <<= 1) ;
          if (f > 0)
            for (p.iushrn(f); f-- > 0; )
              w.isOdd() && w.iadd(B), w.iushrn(1);
          d.cmp(p) >= 0 ? (d.isub(p), m.isub(w)) : (p.isub(d), w.isub(m));
        }
        var M;
        return d.cmpn(1) === 0 ? M = m : M = w, M.cmpn(0) < 0 && M.iadd(l), M;
      }, s.prototype.gcd = function(l) {
        if (this.isZero()) return l.abs();
        if (l.isZero()) return this.abs();
        var d = this.clone(), p = l.clone();
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
      }, s.prototype.invm = function(l) {
        return this.egcd(l).a.umod(l);
      }, s.prototype.isEven = function() {
        return (this.words[0] & 1) === 0;
      }, s.prototype.isOdd = function() {
        return (this.words[0] & 1) === 1;
      }, s.prototype.andln = function(l) {
        return this.words[0] & l;
      }, s.prototype.bincn = function(l) {
        n(typeof l == "number");
        var d = l % 26, p = (l - d) / 26, m = 1 << d;
        if (this.length <= p)
          return this._expand(p + 1), this.words[p] |= m, this;
        for (var w = m, B = p; w !== 0 && B < this.length; B++) {
          var z = this.words[B] | 0;
          z += w, w = z >>> 26, z &= 67108863, this.words[B] = z;
        }
        return w !== 0 && (this.words[B] = w, this.length++), this;
      }, s.prototype.isZero = function() {
        return this.length === 1 && this.words[0] === 0;
      }, s.prototype.cmpn = function(l) {
        var d = l < 0;
        if (this.negative !== 0 && !d) return -1;
        if (this.negative === 0 && d) return 1;
        this._strip();
        var p;
        if (this.length > 1)
          p = 1;
        else {
          d && (l = -l), n(l <= 67108863, "Number is too big");
          var m = this.words[0] | 0;
          p = m === l ? 0 : m < l ? -1 : 1;
        }
        return this.negative !== 0 ? -p | 0 : p;
      }, s.prototype.cmp = function(l) {
        if (this.negative !== 0 && l.negative === 0) return -1;
        if (this.negative === 0 && l.negative !== 0) return 1;
        var d = this.ucmp(l);
        return this.negative !== 0 ? -d | 0 : d;
      }, s.prototype.ucmp = function(l) {
        if (this.length > l.length) return 1;
        if (this.length < l.length) return -1;
        for (var d = 0, p = this.length - 1; p >= 0; p--) {
          var m = this.words[p] | 0, w = l.words[p] | 0;
          if (m !== w) {
            m < w ? d = -1 : m > w && (d = 1);
            break;
          }
        }
        return d;
      }, s.prototype.gtn = function(l) {
        return this.cmpn(l) === 1;
      }, s.prototype.gt = function(l) {
        return this.cmp(l) === 1;
      }, s.prototype.gten = function(l) {
        return this.cmpn(l) >= 0;
      }, s.prototype.gte = function(l) {
        return this.cmp(l) >= 0;
      }, s.prototype.ltn = function(l) {
        return this.cmpn(l) === -1;
      }, s.prototype.lt = function(l) {
        return this.cmp(l) === -1;
      }, s.prototype.lten = function(l) {
        return this.cmpn(l) <= 0;
      }, s.prototype.lte = function(l) {
        return this.cmp(l) <= 0;
      }, s.prototype.eqn = function(l) {
        return this.cmpn(l) === 0;
      }, s.prototype.eq = function(l) {
        return this.cmp(l) === 0;
      }, s.red = function(l) {
        return new D(l);
      }, s.prototype.toRed = function(l) {
        return n(!this.red, "Already a number in reduction context"), n(this.negative === 0, "red works only with positives"), l.convertTo(this)._forceRed(l);
      }, s.prototype.fromRed = function() {
        return n(this.red, "fromRed works only with numbers in reduction context"), this.red.convertFrom(this);
      }, s.prototype._forceRed = function(l) {
        return this.red = l, this;
      }, s.prototype.forceRed = function(l) {
        return n(!this.red, "Already a number in reduction context"), this._forceRed(l);
      }, s.prototype.redAdd = function(l) {
        return n(this.red, "redAdd works only with red numbers"), this.red.add(this, l);
      }, s.prototype.redIAdd = function(l) {
        return n(this.red, "redIAdd works only with red numbers"), this.red.iadd(this, l);
      }, s.prototype.redSub = function(l) {
        return n(this.red, "redSub works only with red numbers"), this.red.sub(this, l);
      }, s.prototype.redISub = function(l) {
        return n(this.red, "redISub works only with red numbers"), this.red.isub(this, l);
      }, s.prototype.redShl = function(l) {
        return n(this.red, "redShl works only with red numbers"), this.red.shl(this, l);
      }, s.prototype.redMul = function(l) {
        return n(this.red, "redMul works only with red numbers"), this.red._verify2(this, l), this.red.mul(this, l);
      }, s.prototype.redIMul = function(l) {
        return n(this.red, "redMul works only with red numbers"), this.red._verify2(this, l), this.red.imul(this, l);
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
      }, s.prototype.redPow = function(l) {
        return n(this.red && !l.red, "redPow(normalNum)"), this.red._verify1(this), this.red.pow(this, l);
      };
      var V = {
        k256: null,
        p224: null,
        p192: null,
        p25519: null
      };
      function X(b, l) {
        this.name = b, this.p = new s(l, 16), this.n = this.p.bitLength(), this.k = new s(1).iushln(this.n).isub(this.p), this.tmp = this._tmp();
      }
      X.prototype._tmp = function() {
        var l = new s(null);
        return l.words = new Array(Math.ceil(this.n / 13)), l;
      }, X.prototype.ireduce = function(l) {
        var d = l, p;
        do
          this.split(d, this.tmp), d = this.imulK(d), d = d.iadd(this.tmp), p = d.bitLength();
        while (p > this.n);
        var m = p < this.n ? -1 : d.ucmp(this.p);
        return m === 0 ? (d.words[0] = 0, d.length = 1) : m > 0 ? d.isub(this.p) : d.strip !== void 0 ? d.strip() : d._strip(), d;
      }, X.prototype.split = function(l, d) {
        l.iushrn(this.n, 0, d);
      }, X.prototype.imulK = function(l) {
        return l.imul(this.k);
      };
      function nt() {
        X.call(
          this,
          "k256",
          "ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffe fffffc2f"
        );
      }
      i(nt, X), nt.prototype.split = function(l, d) {
        for (var p = 4194303, m = Math.min(l.length, 9), w = 0; w < m; w++)
          d.words[w] = l.words[w];
        if (d.length = m, l.length <= 9) {
          l.words[0] = 0, l.length = 1;
          return;
        }
        var B = l.words[9];
        for (d.words[d.length++] = B & p, w = 10; w < l.length; w++) {
          var z = l.words[w] | 0;
          l.words[w - 10] = (z & p) << 4 | B >>> 22, B = z;
        }
        B >>>= 22, l.words[w - 10] = B, B === 0 && l.length > 10 ? l.length -= 10 : l.length -= 9;
      }, nt.prototype.imulK = function(l) {
        l.words[l.length] = 0, l.words[l.length + 1] = 0, l.length += 2;
        for (var d = 0, p = 0; p < l.length; p++) {
          var m = l.words[p] | 0;
          d += m * 977, l.words[p] = d & 67108863, d = m * 64 + (d / 67108864 | 0);
        }
        return l.words[l.length - 1] === 0 && (l.length--, l.words[l.length - 1] === 0 && l.length--), l;
      };
      function C() {
        X.call(
          this,
          "p224",
          "ffffffff ffffffff ffffffff ffffffff 00000000 00000000 00000001"
        );
      }
      i(C, X);
      function v() {
        X.call(
          this,
          "p192",
          "ffffffff ffffffff ffffffff fffffffe ffffffff ffffffff"
        );
      }
      i(v, X);
      function x() {
        X.call(
          this,
          "25519",
          "7fffffffffffffff ffffffffffffffff ffffffffffffffff ffffffffffffffed"
        );
      }
      i(x, X), x.prototype.imulK = function(l) {
        for (var d = 0, p = 0; p < l.length; p++) {
          var m = (l.words[p] | 0) * 19 + d, w = m & 67108863;
          m >>>= 26, l.words[p] = w, d = m;
        }
        return d !== 0 && (l.words[l.length++] = d), l;
      }, s._prime = function(l) {
        if (V[l]) return V[l];
        var d;
        if (l === "k256")
          d = new nt();
        else if (l === "p224")
          d = new C();
        else if (l === "p192")
          d = new v();
        else if (l === "p25519")
          d = new x();
        else
          throw new Error("Unknown prime " + l);
        return V[l] = d, d;
      };
      function D(b) {
        if (typeof b == "string") {
          var l = s._prime(b);
          this.m = l.p, this.prime = l;
        } else
          n(b.gtn(1), "modulus must be greater than 1"), this.m = b, this.prime = null;
      }
      D.prototype._verify1 = function(l) {
        n(l.negative === 0, "red works only with positives"), n(l.red, "red works only with red numbers");
      }, D.prototype._verify2 = function(l, d) {
        n((l.negative | d.negative) === 0, "red works only with positives"), n(
          l.red && l.red === d.red,
          "red works only with red numbers"
        );
      }, D.prototype.imod = function(l) {
        return this.prime ? this.prime.ireduce(l)._forceRed(this) : (S(l, l.umod(this.m)._forceRed(this)), l);
      }, D.prototype.neg = function(l) {
        return l.isZero() ? l.clone() : this.m.sub(l)._forceRed(this);
      }, D.prototype.add = function(l, d) {
        this._verify2(l, d);
        var p = l.add(d);
        return p.cmp(this.m) >= 0 && p.isub(this.m), p._forceRed(this);
      }, D.prototype.iadd = function(l, d) {
        this._verify2(l, d);
        var p = l.iadd(d);
        return p.cmp(this.m) >= 0 && p.isub(this.m), p;
      }, D.prototype.sub = function(l, d) {
        this._verify2(l, d);
        var p = l.sub(d);
        return p.cmpn(0) < 0 && p.iadd(this.m), p._forceRed(this);
      }, D.prototype.isub = function(l, d) {
        this._verify2(l, d);
        var p = l.isub(d);
        return p.cmpn(0) < 0 && p.iadd(this.m), p;
      }, D.prototype.shl = function(l, d) {
        return this._verify1(l), this.imod(l.ushln(d));
      }, D.prototype.imul = function(l, d) {
        return this._verify2(l, d), this.imod(l.imul(d));
      }, D.prototype.mul = function(l, d) {
        return this._verify2(l, d), this.imod(l.mul(d));
      }, D.prototype.isqr = function(l) {
        return this.imul(l, l.clone());
      }, D.prototype.sqr = function(l) {
        return this.mul(l, l);
      }, D.prototype.sqrt = function(l) {
        if (l.isZero()) return l.clone();
        var d = this.m.andln(3);
        if (n(d % 2 === 1), d === 3) {
          var p = this.m.add(new s(1)).iushrn(2);
          return this.pow(l, p);
        }
        for (var m = this.m.subn(1), w = 0; !m.isZero() && m.andln(1) === 0; )
          w++, m.iushrn(1);
        n(!m.isZero());
        var B = new s(1).toRed(this), z = B.redNeg(), I = this.m.subn(1).iushrn(1), f = this.m.bitLength();
        for (f = new s(2 * f * f).toRed(this); this.pow(f, I).cmp(z) !== 0; )
          f.redIAdd(z);
        for (var g = this.pow(f, m), M = this.pow(l, m.addn(1).iushrn(1)), T = this.pow(l, m), W = w; T.cmp(B) !== 0; ) {
          for (var J = T, tt = 0; J.cmp(B) !== 0; tt++)
            J = J.redSqr();
          n(tt < W);
          var st = this.pow(g, new s(1).iushln(W - tt - 1));
          M = M.redMul(st), g = st.redSqr(), T = T.redMul(g), W = tt;
        }
        return M;
      }, D.prototype.invm = function(l) {
        var d = l._invmp(this.m);
        return d.negative !== 0 ? (d.negative = 0, this.imod(d).redNeg()) : this.imod(d);
      }, D.prototype.pow = function(l, d) {
        if (d.isZero()) return new s(1).toRed(this);
        if (d.cmpn(1) === 0) return l.clone();
        var p = 4, m = new Array(1 << p);
        m[0] = new s(1).toRed(this), m[1] = l;
        for (var w = 2; w < m.length; w++)
          m[w] = this.mul(m[w - 1], l);
        var B = m[0], z = 0, I = 0, f = d.bitLength() % 26;
        for (f === 0 && (f = 26), w = d.length - 1; w >= 0; w--) {
          for (var g = d.words[w], M = f - 1; M >= 0; M--) {
            var T = g >> M & 1;
            if (B !== m[0] && (B = this.sqr(B)), T === 0 && z === 0) {
              I = 0;
              continue;
            }
            z <<= 1, z |= T, I++, !(I !== p && (w !== 0 || M !== 0)) && (B = this.mul(B, m[z]), I = 0, z = 0);
          }
          f = 26;
        }
        return B;
      }, D.prototype.convertTo = function(l) {
        var d = l.umod(this.m);
        return d === l ? d.clone() : d;
      }, D.prototype.convertFrom = function(l) {
        var d = l.clone();
        return d.red = null, d;
      }, s.mont = function(l) {
        return new R(l);
      };
      function R(b) {
        D.call(this, b), this.shift = this.m.bitLength(), this.shift % 26 !== 0 && (this.shift += 26 - this.shift % 26), this.r = new s(1).iushln(this.shift), this.r2 = this.imod(this.r.sqr()), this.rinv = this.r._invmp(this.m), this.minv = this.rinv.mul(this.r).isubn(1).div(this.m), this.minv = this.minv.umod(this.r), this.minv = this.r.sub(this.minv);
      }
      i(R, D), R.prototype.convertTo = function(l) {
        return this.imod(l.ushln(this.shift));
      }, R.prototype.convertFrom = function(l) {
        var d = this.imod(l.mul(this.rinv));
        return d.red = null, d;
      }, R.prototype.imul = function(l, d) {
        if (l.isZero() || d.isZero())
          return l.words[0] = 0, l.length = 1, l;
        var p = l.imul(d), m = p.maskn(this.shift).mul(this.minv).imaskn(this.shift).mul(this.m), w = p.isub(m).iushrn(this.shift), B = w;
        return w.cmp(this.m) >= 0 ? B = w.isub(this.m) : w.cmpn(0) < 0 && (B = w.iadd(this.m)), B._forceRed(this);
      }, R.prototype.mul = function(l, d) {
        if (l.isZero() || d.isZero()) return new s(0)._forceRed(this);
        var p = l.mul(d), m = p.maskn(this.shift).mul(this.minv).imaskn(this.shift).mul(this.m), w = p.isub(m).iushrn(this.shift), B = w;
        return w.cmp(this.m) >= 0 ? B = w.isub(this.m) : w.cmpn(0) < 0 && (B = w.iadd(this.m)), B._forceRed(this);
      }, R.prototype.invm = function(l) {
        var d = this.imod(l._invmp(this.m).mul(this.r2));
        return d._forceRed(this);
      };
    })(r, vh);
  }(ni)), ni.exports;
}
var Sh = fc();
const oa = /* @__PURE__ */ Ei(Sh);
var Jr = { exports: {} };
/*! safe-buffer. MIT License. Feross Aboukhadijeh <https://feross.org/opensource> */
var aa;
function Mh() {
  return aa || (aa = 1, function(r, t) {
    var e = Ii(), n = e.Buffer;
    function i(u, h) {
      for (var A in u)
        h[A] = u[A];
    }
    n.from && n.alloc && n.allocUnsafe && n.allocUnsafeSlow ? r.exports = e : (i(e, t), t.Buffer = s);
    function s(u, h, A) {
      return n(u, h, A);
    }
    s.prototype = Object.create(n.prototype), i(n, s), s.from = function(u, h, A) {
      if (typeof u == "number")
        throw new TypeError("Argument must not be a number");
      return n(u, h, A);
    }, s.alloc = function(u, h, A) {
      if (typeof u != "number")
        throw new TypeError("Argument must be a number");
      var E = n(u);
      return h !== void 0 ? typeof A == "string" ? E.fill(h, A) : E.fill(h) : E.fill(0), E;
    }, s.allocUnsafe = function(u) {
      if (typeof u != "number")
        throw new TypeError("Argument must be a number");
      return n(u);
    }, s.allocUnsafeSlow = function(u) {
      if (typeof u != "number")
        throw new TypeError("Argument must be a number");
      return e.SlowBuffer(u);
    };
  }(Jr, Jr.exports)), Jr.exports;
}
var gs, ca;
function xh() {
  if (ca) return gs;
  ca = 1;
  var r = Mh().Buffer;
  function t(e) {
    if (e.length >= 255)
      throw new TypeError("Alphabet too long");
    for (var n = new Uint8Array(256), i = 0; i < n.length; i++)
      n[i] = 255;
    for (var s = 0; s < e.length; s++) {
      var u = e.charAt(s), h = u.charCodeAt(0);
      if (n[h] !== 255)
        throw new TypeError(u + " is ambiguous");
      n[h] = s;
    }
    var A = e.length, E = e.charAt(0), S = Math.log(A) / Math.log(256), N = Math.log(256) / Math.log(A);
    function P(O) {
      if ((Array.isArray(O) || O instanceof Uint8Array) && (O = r.from(O)), !r.isBuffer(O))
        throw new TypeError("Expected Buffer");
      if (O.length === 0)
        return "";
      for (var L = 0, Y = 0, Q = 0, q = O.length; Q !== q && O[Q] === 0; )
        Q++, L++;
      for (var K = (q - Q) * N + 1 >>> 0, V = new Uint8Array(K); Q !== q; ) {
        for (var X = O[Q], nt = 0, C = K - 1; (X !== 0 || nt < Y) && C !== -1; C--, nt++)
          X += 256 * V[C] >>> 0, V[C] = X % A >>> 0, X = X / A >>> 0;
        if (X !== 0)
          throw new Error("Non-zero carry");
        Y = nt, Q++;
      }
      for (var v = K - Y; v !== K && V[v] === 0; )
        v++;
      for (var x = E.repeat(L); v < K; ++v)
        x += e.charAt(V[v]);
      return x;
    }
    function U(O) {
      if (typeof O != "string")
        throw new TypeError("Expected String");
      if (O.length === 0)
        return r.alloc(0);
      for (var L = 0, Y = 0, Q = 0; O[L] === E; )
        Y++, L++;
      for (var q = (O.length - L) * S + 1 >>> 0, K = new Uint8Array(q); L < O.length; ) {
        var V = O.charCodeAt(L);
        if (V > 255)
          return;
        var X = n[V];
        if (X === 255)
          return;
        for (var nt = 0, C = q - 1; (X !== 0 || nt < Q) && C !== -1; C--, nt++)
          X += A * K[C] >>> 0, K[C] = X % 256 >>> 0, X = X / 256 >>> 0;
        if (X !== 0)
          throw new Error("Non-zero carry");
        Q = nt, L++;
      }
      for (var v = q - Q; v !== q && K[v] === 0; )
        v++;
      var x = r.allocUnsafe(Y + (q - v));
      x.fill(0, 0, Y);
      for (var D = Y; v !== q; )
        x[D++] = K[v++];
      return x;
    }
    function F(O) {
      var L = U(O);
      if (L)
        return L;
      throw new Error("Non-base" + A + " character");
    }
    return {
      encode: P,
      decodeUnsafe: U,
      decode: F
    };
  }
  return gs = t, gs;
}
var As, ua;
function dc() {
  if (ua) return As;
  ua = 1;
  var r = xh(), t = "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz";
  return As = r(t), As;
}
var Bh = dc();
const Ie = /* @__PURE__ */ Ei(Bh);
/*! noble-hashes - MIT License (c) 2022 Paul Miller (paulmillr.com) */
function Ch(r) {
  return r instanceof Uint8Array || ArrayBuffer.isView(r) && r.constructor.name === "Uint8Array";
}
function po(r, ...t) {
  if (!Ch(r))
    throw new Error("Uint8Array expected");
  if (t.length > 0 && !t.includes(r.length))
    throw new Error("Uint8Array expected of length " + t + ", got length=" + r.length);
}
function la(r, t = !0) {
  if (r.destroyed)
    throw new Error("Hash instance has been destroyed");
  if (t && r.finished)
    throw new Error("Hash#digest() has already been called");
}
function kh(r, t) {
  po(r);
  const e = t.outputLen;
  if (r.length < e)
    throw new Error("digestInto() expects output buffer of length at least " + e);
}
function Ps(...r) {
  for (let t = 0; t < r.length; t++)
    r[t].fill(0);
}
function ps(r) {
  return new DataView(r.buffer, r.byteOffset, r.byteLength);
}
function tn(r, t) {
  return r << 32 - t | r >>> t;
}
function Nh(r) {
  if (typeof r != "string")
    throw new Error("string expected");
  return new Uint8Array(new TextEncoder().encode(r));
}
function gc(r) {
  return typeof r == "string" && (r = Nh(r)), po(r), r;
}
class Th {
}
function Lh(r) {
  const t = (n) => r().update(gc(n)).digest(), e = r();
  return t.outputLen = e.outputLen, t.blockLen = e.blockLen, t.create = () => r(), t;
}
function Rh(r, t, e, n) {
  if (typeof r.setBigUint64 == "function")
    return r.setBigUint64(t, e, n);
  const i = BigInt(32), s = BigInt(4294967295), u = Number(e >> i & s), h = Number(e & s), A = n ? 4 : 0, E = n ? 0 : 4;
  r.setUint32(t + A, u, n), r.setUint32(t + E, h, n);
}
function Oh(r, t, e) {
  return r & t ^ ~r & e;
}
function Dh(r, t, e) {
  return r & t ^ r & e ^ t & e;
}
class Uh extends Th {
  constructor(t, e, n, i) {
    super(), this.finished = !1, this.length = 0, this.pos = 0, this.destroyed = !1, this.blockLen = t, this.outputLen = e, this.padOffset = n, this.isLE = i, this.buffer = new Uint8Array(t), this.view = ps(this.buffer);
  }
  update(t) {
    la(this), t = gc(t), po(t);
    const { view: e, buffer: n, blockLen: i } = this, s = t.length;
    for (let u = 0; u < s; ) {
      const h = Math.min(i - this.pos, s - u);
      if (h === i) {
        const A = ps(t);
        for (; i <= s - u; u += i)
          this.process(A, u);
        continue;
      }
      n.set(t.subarray(u, u + h), this.pos), this.pos += h, u += h, this.pos === i && (this.process(e, 0), this.pos = 0);
    }
    return this.length += t.length, this.roundClean(), this;
  }
  digestInto(t) {
    la(this), kh(t, this), this.finished = !0;
    const { buffer: e, view: n, blockLen: i, isLE: s } = this;
    let { pos: u } = this;
    e[u++] = 128, Ps(this.buffer.subarray(u)), this.padOffset > i - u && (this.process(n, 0), u = 0);
    for (let N = u; N < i; N++)
      e[N] = 0;
    Rh(n, i - 8, BigInt(this.length * 8), s), this.process(n, 0);
    const h = ps(t), A = this.outputLen;
    if (A % 4)
      throw new Error("_sha2: outputLen should be aligned to 32bit");
    const E = A / 4, S = this.get();
    if (E > S.length)
      throw new Error("_sha2: outputLen bigger than state");
    for (let N = 0; N < E; N++)
      h.setUint32(4 * N, S[N], s);
  }
  digest() {
    const { buffer: t, outputLen: e } = this;
    this.digestInto(t);
    const n = t.slice(0, e);
    return this.destroy(), n;
  }
  _cloneInto(t) {
    t || (t = new this.constructor()), t.set(...this.get());
    const { blockLen: e, buffer: n, length: i, finished: s, destroyed: u, pos: h } = this;
    return t.destroyed = u, t.finished = s, t.length = i, t.pos = h, i % e && t.buffer.set(n), t;
  }
  clone() {
    return this._cloneInto();
  }
}
const xn = /* @__PURE__ */ Uint32Array.from([
  1779033703,
  3144134277,
  1013904242,
  2773480762,
  1359893119,
  2600822924,
  528734635,
  1541459225
]), jh = /* @__PURE__ */ Uint32Array.from([
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
]), Bn = /* @__PURE__ */ new Uint32Array(64);
class zh extends Uh {
  constructor(t = 32) {
    super(64, t, 8, !1), this.A = xn[0] | 0, this.B = xn[1] | 0, this.C = xn[2] | 0, this.D = xn[3] | 0, this.E = xn[4] | 0, this.F = xn[5] | 0, this.G = xn[6] | 0, this.H = xn[7] | 0;
  }
  get() {
    const { A: t, B: e, C: n, D: i, E: s, F: u, G: h, H: A } = this;
    return [t, e, n, i, s, u, h, A];
  }
  // prettier-ignore
  set(t, e, n, i, s, u, h, A) {
    this.A = t | 0, this.B = e | 0, this.C = n | 0, this.D = i | 0, this.E = s | 0, this.F = u | 0, this.G = h | 0, this.H = A | 0;
  }
  process(t, e) {
    for (let N = 0; N < 16; N++, e += 4)
      Bn[N] = t.getUint32(e, !1);
    for (let N = 16; N < 64; N++) {
      const P = Bn[N - 15], U = Bn[N - 2], F = tn(P, 7) ^ tn(P, 18) ^ P >>> 3, O = tn(U, 17) ^ tn(U, 19) ^ U >>> 10;
      Bn[N] = O + Bn[N - 7] + F + Bn[N - 16] | 0;
    }
    let { A: n, B: i, C: s, D: u, E: h, F: A, G: E, H: S } = this;
    for (let N = 0; N < 64; N++) {
      const P = tn(h, 6) ^ tn(h, 11) ^ tn(h, 25), U = S + P + Oh(h, A, E) + jh[N] + Bn[N] | 0, O = (tn(n, 2) ^ tn(n, 13) ^ tn(n, 22)) + Dh(n, i, s) | 0;
      S = E, E = A, A = h, h = u + U | 0, u = s, s = i, i = n, n = U + O | 0;
    }
    n = n + this.A | 0, i = i + this.B | 0, s = s + this.C | 0, u = u + this.D | 0, h = h + this.E | 0, A = A + this.F | 0, E = E + this.G | 0, S = S + this.H | 0, this.set(n, i, s, u, h, A, E, S);
  }
  roundClean() {
    Ps(Bn);
  }
  destroy() {
    this.set(0, 0, 0, 0, 0, 0, 0, 0), Ps(this.buffer);
  }
}
const Ph = /* @__PURE__ */ Lh(() => new zh()), ha = Ph;
var kt = {};
function hn(r, t, e) {
  return t <= r && r <= e;
}
function xi(r) {
  if (r === void 0) return {};
  if (r === Object(r)) return r;
  throw TypeError("Could not convert argument to dictionary");
}
function Fh(r) {
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
        var u = r.charCodeAt(n + 1);
        if (56320 <= u && u <= 57343) {
          var h = s & 1023, A = u & 1023;
          i.push(65536 + (h << 10) + A), n += 1;
        } else
          i.push(65533);
      }
    n += 1;
  }
  return i;
}
function Qh(r) {
  for (var t = "", e = 0; e < r.length; ++e) {
    var n = r[e];
    n <= 65535 ? t += String.fromCharCode(n) : (n -= 65536, t += String.fromCharCode(
      (n >> 10) + 55296,
      (n & 1023) + 56320
    ));
  }
  return t;
}
var di = -1;
function wo(r) {
  this.tokens = [].slice.call(r);
}
wo.prototype = {
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
    return this.tokens.length ? this.tokens.shift() : di;
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
var fr = -1;
function ws(r, t) {
  if (r)
    throw TypeError("Decoder error");
  return t || 65533;
}
var gi = "utf-8";
function Ai(r, t) {
  if (!(this instanceof Ai))
    return new Ai(r, t);
  if (r = r !== void 0 ? String(r).toLowerCase() : gi, r !== gi)
    throw new Error("Encoding not supported. Only utf-8 is supported");
  t = xi(t), this._streaming = !1, this._BOMseen = !1, this._decoder = null, this._fatal = !!t.fatal, this._ignoreBOM = !!t.ignoreBOM, Object.defineProperty(this, "encoding", { value: "utf-8" }), Object.defineProperty(this, "fatal", { value: this._fatal }), Object.defineProperty(this, "ignoreBOM", { value: this._ignoreBOM });
}
Ai.prototype = {
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
    ) : n = new Uint8Array(0), e = xi(e), this._streaming || (this._decoder = new _h({ fatal: this._fatal }), this._BOMseen = !1), this._streaming = !!e.stream;
    for (var i = new wo(n), s = [], u; !i.endOfStream() && (u = this._decoder.handler(i, i.read()), u !== fr); )
      u !== null && (Array.isArray(u) ? s.push.apply(
        s,
        /**@type {!Array.<number>}*/
        u
      ) : s.push(u));
    if (!this._streaming) {
      do {
        if (u = this._decoder.handler(i, i.read()), u === fr)
          break;
        u !== null && (Array.isArray(u) ? s.push.apply(
          s,
          /**@type {!Array.<number>}*/
          u
        ) : s.push(u));
      } while (!i.endOfStream());
      this._decoder = null;
    }
    return s.length && ["utf-8"].indexOf(this.encoding) !== -1 && !this._ignoreBOM && !this._BOMseen && (s[0] === 65279 ? (this._BOMseen = !0, s.shift()) : this._BOMseen = !0), Qh(s);
  }
};
function pi(r, t) {
  if (!(this instanceof pi))
    return new pi(r, t);
  if (r = r !== void 0 ? String(r).toLowerCase() : gi, r !== gi)
    throw new Error("Encoding not supported. Only utf-8 is supported");
  t = xi(t), this._streaming = !1, this._encoder = null, this._options = { fatal: !!t.fatal }, Object.defineProperty(this, "encoding", { value: "utf-8" });
}
pi.prototype = {
  /**
   * @param {string=} opt_string The string to encode.
   * @param {Object=} options
   * @return {Uint8Array} Encoded bytes, as a Uint8Array.
   */
  encode: function(t, e) {
    t = t ? String(t) : "", e = xi(e), this._streaming || (this._encoder = new Hh(this._options)), this._streaming = !!e.stream;
    for (var n = [], i = new wo(Fh(t)), s; !i.endOfStream() && (s = this._encoder.handler(i, i.read()), s !== fr); )
      Array.isArray(s) ? n.push.apply(
        n,
        /**@type {!Array.<number>}*/
        s
      ) : n.push(s);
    if (!this._streaming) {
      for (; s = this._encoder.handler(i, i.read()), s !== fr; )
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
function _h(r) {
  var t = r.fatal, e = 0, n = 0, i = 0, s = 128, u = 191;
  this.handler = function(h, A) {
    if (A === di && i !== 0)
      return i = 0, ws(t);
    if (A === di)
      return fr;
    if (i === 0) {
      if (hn(A, 0, 127))
        return A;
      if (hn(A, 194, 223))
        i = 1, e = A - 192;
      else if (hn(A, 224, 239))
        A === 224 && (s = 160), A === 237 && (u = 159), i = 2, e = A - 224;
      else if (hn(A, 240, 244))
        A === 240 && (s = 144), A === 244 && (u = 143), i = 3, e = A - 240;
      else
        return ws(t);
      return e = e << 6 * i, null;
    }
    if (!hn(A, s, u))
      return e = i = n = 0, s = 128, u = 191, h.prepend(A), ws(t);
    if (s = 128, u = 191, n += 1, e += A - 128 << 6 * (i - n), n !== i)
      return null;
    var E = e;
    return e = i = n = 0, E;
  };
}
function Hh(r) {
  r.fatal, this.handler = function(t, e) {
    if (e === di)
      return fr;
    if (hn(e, 0, 127))
      return e;
    var n, i;
    hn(e, 128, 2047) ? (n = 1, i = 192) : hn(e, 2048, 65535) ? (n = 2, i = 224) : hn(e, 65536, 1114111) && (n = 3, i = 240);
    for (var s = [(e >> 6 * n) + i]; n > 0; ) {
      var u = e >> 6 * (n - 1);
      s.push(128 | u & 63), n -= 1;
    }
    return s;
  };
}
const Wh = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  TextDecoder: Ai,
  TextEncoder: pi
}, Symbol.toStringTag, { value: "Module" })), qh = /* @__PURE__ */ Qa(Wh);
var fa;
function Yh() {
  if (fa) return kt;
  fa = 1;
  var r = kt && kt.__createBinding || (Object.create ? function(v, x, D, R) {
    R === void 0 && (R = D), Object.defineProperty(v, R, { enumerable: !0, get: function() {
      return x[D];
    } });
  } : function(v, x, D, R) {
    R === void 0 && (R = D), v[R] = x[D];
  }), t = kt && kt.__setModuleDefault || (Object.create ? function(v, x) {
    Object.defineProperty(v, "default", { enumerable: !0, value: x });
  } : function(v, x) {
    v.default = x;
  }), e = kt && kt.__decorate || function(v, x, D, R) {
    var b = arguments.length, l = b < 3 ? x : R === null ? R = Object.getOwnPropertyDescriptor(x, D) : R, d;
    if (typeof Reflect == "object" && typeof Reflect.decorate == "function") l = Reflect.decorate(v, x, D, R);
    else for (var p = v.length - 1; p >= 0; p--) (d = v[p]) && (l = (b < 3 ? d(l) : b > 3 ? d(x, D, l) : d(x, D)) || l);
    return b > 3 && l && Object.defineProperty(x, D, l), l;
  }, n = kt && kt.__importStar || function(v) {
    if (v && v.__esModule) return v;
    var x = {};
    if (v != null) for (var D in v) D !== "default" && Object.hasOwnProperty.call(v, D) && r(x, v, D);
    return t(x, v), x;
  }, i = kt && kt.__importDefault || function(v) {
    return v && v.__esModule ? v : { default: v };
  };
  Object.defineProperty(kt, "__esModule", { value: !0 }), kt.deserializeUnchecked = kt.deserialize = kt.serialize = kt.BinaryReader = kt.BinaryWriter = kt.BorshError = kt.baseDecode = kt.baseEncode = void 0;
  const s = i(fc()), u = i(dc()), h = n(qh), A = typeof TextDecoder != "function" ? h.TextDecoder : TextDecoder, E = new A("utf-8", { fatal: !0 });
  function S(v) {
    return typeof v == "string" && (v = pt.Buffer.from(v, "utf8")), u.default.encode(pt.Buffer.from(v));
  }
  kt.baseEncode = S;
  function N(v) {
    return pt.Buffer.from(u.default.decode(v));
  }
  kt.baseDecode = N;
  const P = 1024;
  class U extends Error {
    constructor(x) {
      super(x), this.fieldPath = [], this.originalMessage = x;
    }
    addToFieldPath(x) {
      this.fieldPath.splice(0, 0, x), this.message = this.originalMessage + ": " + this.fieldPath.join(".");
    }
  }
  kt.BorshError = U;
  class F {
    constructor() {
      this.buf = pt.Buffer.alloc(P), this.length = 0;
    }
    maybeResize() {
      this.buf.length < 16 + this.length && (this.buf = pt.Buffer.concat([this.buf, pt.Buffer.alloc(P)]));
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
      this.maybeResize(), this.writeBuffer(pt.Buffer.from(new s.default(x).toArray("le", 8)));
    }
    writeU128(x) {
      this.maybeResize(), this.writeBuffer(pt.Buffer.from(new s.default(x).toArray("le", 16)));
    }
    writeU256(x) {
      this.maybeResize(), this.writeBuffer(pt.Buffer.from(new s.default(x).toArray("le", 32)));
    }
    writeU512(x) {
      this.maybeResize(), this.writeBuffer(pt.Buffer.from(new s.default(x).toArray("le", 64)));
    }
    writeBuffer(x) {
      this.buf = pt.Buffer.concat([
        pt.Buffer.from(this.buf.subarray(0, this.length)),
        x,
        pt.Buffer.alloc(P)
      ]), this.length += x.length;
    }
    writeString(x) {
      this.maybeResize();
      const D = pt.Buffer.from(x, "utf8");
      this.writeU32(D.length), this.writeBuffer(D);
    }
    writeFixedArray(x) {
      this.writeBuffer(pt.Buffer.from(x));
    }
    writeArray(x, D) {
      this.maybeResize(), this.writeU32(x.length);
      for (const R of x)
        this.maybeResize(), D(R);
    }
    toArray() {
      return this.buf.subarray(0, this.length);
    }
  }
  kt.BinaryWriter = F;
  function O(v, x, D) {
    const R = D.value;
    D.value = function(...b) {
      try {
        return R.apply(this, b);
      } catch (l) {
        if (l instanceof RangeError) {
          const d = l.code;
          if (["ERR_BUFFER_OUT_OF_BOUNDS", "ERR_OUT_OF_RANGE"].indexOf(d) >= 0)
            throw new U("Reached the end of buffer when deserializing");
        }
        throw l;
      }
    };
  }
  class L {
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
        throw new U(`Expected buffer length ${x} isn't within bounds`);
      const D = this.buf.slice(this.offset, this.offset + x);
      return this.offset += x, D;
    }
    readString() {
      const x = this.readU32(), D = this.readBuffer(x);
      try {
        return E.decode(D);
      } catch (R) {
        throw new U(`Error decoding UTF-8 string: ${R}`);
      }
    }
    readFixedArray(x) {
      return new Uint8Array(this.readBuffer(x));
    }
    readArray(x) {
      const D = this.readU32(), R = Array();
      for (let b = 0; b < D; ++b)
        R.push(x());
      return R;
    }
  }
  e([
    O
  ], L.prototype, "readU8", null), e([
    O
  ], L.prototype, "readU16", null), e([
    O
  ], L.prototype, "readU32", null), e([
    O
  ], L.prototype, "readU64", null), e([
    O
  ], L.prototype, "readU128", null), e([
    O
  ], L.prototype, "readU256", null), e([
    O
  ], L.prototype, "readU512", null), e([
    O
  ], L.prototype, "readString", null), e([
    O
  ], L.prototype, "readFixedArray", null), e([
    O
  ], L.prototype, "readArray", null), kt.BinaryReader = L;
  function Y(v) {
    return v.charAt(0).toUpperCase() + v.slice(1);
  }
  function Q(v, x, D, R, b) {
    try {
      if (typeof R == "string")
        b[`write${Y(R)}`](D);
      else if (R instanceof Array)
        if (typeof R[0] == "number") {
          if (D.length !== R[0])
            throw new U(`Expecting byte array of length ${R[0]}, but got ${D.length} bytes`);
          b.writeFixedArray(D);
        } else if (R.length === 2 && typeof R[1] == "number") {
          if (D.length !== R[1])
            throw new U(`Expecting byte array of length ${R[1]}, but got ${D.length} bytes`);
          for (let l = 0; l < R[1]; l++)
            Q(v, null, D[l], R[0], b);
        } else
          b.writeArray(D, (l) => {
            Q(v, x, l, R[0], b);
          });
      else if (R.kind !== void 0)
        switch (R.kind) {
          case "option": {
            D == null ? b.writeU8(0) : (b.writeU8(1), Q(v, x, D, R.type, b));
            break;
          }
          case "map": {
            b.writeU32(D.size), D.forEach((l, d) => {
              Q(v, x, d, R.key, b), Q(v, x, l, R.value, b);
            });
            break;
          }
          default:
            throw new U(`FieldType ${R} unrecognized`);
        }
      else
        q(v, D, b);
    } catch (l) {
      throw l instanceof U && l.addToFieldPath(x), l;
    }
  }
  function q(v, x, D) {
    if (typeof x.borshSerialize == "function") {
      x.borshSerialize(D);
      return;
    }
    const R = v.get(x.constructor);
    if (!R)
      throw new U(`Class ${x.constructor.name} is missing in schema`);
    if (R.kind === "struct")
      R.fields.map(([b, l]) => {
        Q(v, b, x[b], l, D);
      });
    else if (R.kind === "enum") {
      const b = x[R.field];
      for (let l = 0; l < R.values.length; ++l) {
        const [d, p] = R.values[l];
        if (d === b) {
          D.writeU8(l), Q(v, d, x[d], p, D);
          break;
        }
      }
    } else
      throw new U(`Unexpected schema kind: ${R.kind} for ${x.constructor.name}`);
  }
  function K(v, x, D = F) {
    const R = new D();
    return q(v, x, R), R.toArray();
  }
  kt.serialize = K;
  function V(v, x, D, R) {
    try {
      if (typeof D == "string")
        return R[`read${Y(D)}`]();
      if (D instanceof Array) {
        if (typeof D[0] == "number")
          return R.readFixedArray(D[0]);
        if (typeof D[1] == "number") {
          const b = [];
          for (let l = 0; l < D[1]; l++)
            b.push(V(v, null, D[0], R));
          return b;
        } else
          return R.readArray(() => V(v, x, D[0], R));
      }
      if (D.kind === "option")
        return R.readU8() ? V(v, x, D.type, R) : void 0;
      if (D.kind === "map") {
        let b = /* @__PURE__ */ new Map();
        const l = R.readU32();
        for (let d = 0; d < l; d++) {
          const p = V(v, x, D.key, R), m = V(v, x, D.value, R);
          b.set(p, m);
        }
        return b;
      }
      return X(v, D, R);
    } catch (b) {
      throw b instanceof U && b.addToFieldPath(x), b;
    }
  }
  function X(v, x, D) {
    if (typeof x.borshDeserialize == "function")
      return x.borshDeserialize(D);
    const R = v.get(x);
    if (!R)
      throw new U(`Class ${x.name} is missing in schema`);
    if (R.kind === "struct") {
      const b = {};
      for (const [l, d] of v.get(x).fields)
        b[l] = V(v, l, d, D);
      return new x(b);
    }
    if (R.kind === "enum") {
      const b = D.readU8();
      if (b >= R.values.length)
        throw new U(`Enum index: ${b} is out of range`);
      const [l, d] = R.values[b], p = V(v, l, d, D);
      return new x({ [l]: p });
    }
    throw new U(`Unexpected schema kind: ${R.kind} for ${x.constructor.name}`);
  }
  function nt(v, x, D, R = L) {
    const b = new R(D), l = X(v, x, b);
    if (b.offset < D.length)
      throw new U(`Unexpected ${D.length - b.offset} bytes after deserialized data`);
    return l;
  }
  kt.deserialize = nt;
  function C(v, x, D, R = L) {
    const b = new R(D);
    return X(v, x, b);
  }
  return kt.deserializeUnchecked = C, kt;
}
var ys = Yh(), G = {}, da;
function Zh() {
  if (da) return G;
  da = 1, Object.defineProperty(G, "__esModule", { value: !0 }), G.s16 = G.s8 = G.nu64be = G.u48be = G.u40be = G.u32be = G.u24be = G.u16be = G.nu64 = G.u48 = G.u40 = G.u32 = G.u24 = G.u16 = G.u8 = G.offset = G.greedy = G.Constant = G.UTF8 = G.CString = G.Blob = G.Boolean = G.BitField = G.BitStructure = G.VariantLayout = G.Union = G.UnionLayoutDiscriminator = G.UnionDiscriminator = G.Structure = G.Sequence = G.DoubleBE = G.Double = G.FloatBE = G.Float = G.NearInt64BE = G.NearInt64 = G.NearUInt64BE = G.NearUInt64 = G.IntBE = G.Int = G.UIntBE = G.UInt = G.OffsetLayout = G.GreedyCount = G.ExternalLayout = G.bindConstructorLayout = G.nameWithProperty = G.Layout = G.uint8ArrayToBuffer = G.checkUint8Array = void 0, G.constant = G.utf8 = G.cstr = G.blob = G.unionLayoutDiscriminator = G.union = G.seq = G.bits = G.struct = G.f64be = G.f64 = G.f32be = G.f32 = G.ns64be = G.s48be = G.s40be = G.s32be = G.s24be = G.s16be = G.ns64 = G.s48 = G.s40 = G.s32 = G.s24 = void 0;
  const r = Ii();
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
    constructor(g, M) {
      if (!Number.isInteger(g))
        throw new TypeError("span must be an integer");
      this.span = g, this.property = M;
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
    getSpan(g, M) {
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
      const M = Object.create(this.constructor.prototype);
      return Object.assign(M, this), M.property = g, M;
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
      value(M, T) {
        return g.encode(this, M, T);
      },
      writable: !0
    }), Object.defineProperty(f, "decode", {
      value(M, T) {
        return g.decode(M, T);
      },
      writable: !0
    });
  }
  G.bindConstructorLayout = s;
  class u extends n {
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
  G.ExternalLayout = u;
  class h extends u {
    constructor(g = 1, M) {
      if (!Number.isInteger(g) || 0 >= g)
        throw new TypeError("elementSpan must be a (positive) integer");
      super(-1, M), this.elementSpan = g;
    }
    /** @override */
    isCount() {
      return !0;
    }
    /** @override */
    decode(g, M = 0) {
      t(g);
      const T = g.length - M;
      return Math.floor(T / this.elementSpan);
    }
    /** @override */
    encode(g, M, T) {
      return 0;
    }
  }
  G.GreedyCount = h;
  class A extends u {
    constructor(g, M = 0, T) {
      if (!(g instanceof n))
        throw new TypeError("layout must be a Layout");
      if (!Number.isInteger(M))
        throw new TypeError("offset must be integer or undefined");
      super(g.span, T || g.property), this.layout = g, this.offset = M;
    }
    /** @override */
    isCount() {
      return this.layout instanceof E || this.layout instanceof S;
    }
    /** @override */
    decode(g, M = 0) {
      return this.layout.decode(g, M + this.offset);
    }
    /** @override */
    encode(g, M, T = 0) {
      return this.layout.encode(g, M, T + this.offset);
    }
  }
  G.OffsetLayout = A;
  class E extends n {
    constructor(g, M) {
      if (super(g, M), 6 < this.span)
        throw new RangeError("span must not exceed 6 bytes");
    }
    /** @override */
    decode(g, M = 0) {
      return e(g).readUIntLE(M, this.span);
    }
    /** @override */
    encode(g, M, T = 0) {
      return e(M).writeUIntLE(g, T, this.span), this.span;
    }
  }
  G.UInt = E;
  class S extends n {
    constructor(g, M) {
      if (super(g, M), 6 < this.span)
        throw new RangeError("span must not exceed 6 bytes");
    }
    /** @override */
    decode(g, M = 0) {
      return e(g).readUIntBE(M, this.span);
    }
    /** @override */
    encode(g, M, T = 0) {
      return e(M).writeUIntBE(g, T, this.span), this.span;
    }
  }
  G.UIntBE = S;
  class N extends n {
    constructor(g, M) {
      if (super(g, M), 6 < this.span)
        throw new RangeError("span must not exceed 6 bytes");
    }
    /** @override */
    decode(g, M = 0) {
      return e(g).readIntLE(M, this.span);
    }
    /** @override */
    encode(g, M, T = 0) {
      return e(M).writeIntLE(g, T, this.span), this.span;
    }
  }
  G.Int = N;
  class P extends n {
    constructor(g, M) {
      if (super(g, M), 6 < this.span)
        throw new RangeError("span must not exceed 6 bytes");
    }
    /** @override */
    decode(g, M = 0) {
      return e(g).readIntBE(M, this.span);
    }
    /** @override */
    encode(g, M, T = 0) {
      return e(M).writeIntBE(g, T, this.span), this.span;
    }
  }
  G.IntBE = P;
  const U = Math.pow(2, 32);
  function F(f) {
    const g = Math.floor(f / U), M = f - g * U;
    return { hi32: g, lo32: M };
  }
  function O(f, g) {
    return f * U + g;
  }
  class L extends n {
    constructor(g) {
      super(8, g);
    }
    /** @override */
    decode(g, M = 0) {
      const T = e(g), W = T.readUInt32LE(M), J = T.readUInt32LE(M + 4);
      return O(J, W);
    }
    /** @override */
    encode(g, M, T = 0) {
      const W = F(g), J = e(M);
      return J.writeUInt32LE(W.lo32, T), J.writeUInt32LE(W.hi32, T + 4), 8;
    }
  }
  G.NearUInt64 = L;
  class Y extends n {
    constructor(g) {
      super(8, g);
    }
    /** @override */
    decode(g, M = 0) {
      const T = e(g), W = T.readUInt32BE(M), J = T.readUInt32BE(M + 4);
      return O(W, J);
    }
    /** @override */
    encode(g, M, T = 0) {
      const W = F(g), J = e(M);
      return J.writeUInt32BE(W.hi32, T), J.writeUInt32BE(W.lo32, T + 4), 8;
    }
  }
  G.NearUInt64BE = Y;
  class Q extends n {
    constructor(g) {
      super(8, g);
    }
    /** @override */
    decode(g, M = 0) {
      const T = e(g), W = T.readUInt32LE(M), J = T.readInt32LE(M + 4);
      return O(J, W);
    }
    /** @override */
    encode(g, M, T = 0) {
      const W = F(g), J = e(M);
      return J.writeUInt32LE(W.lo32, T), J.writeInt32LE(W.hi32, T + 4), 8;
    }
  }
  G.NearInt64 = Q;
  class q extends n {
    constructor(g) {
      super(8, g);
    }
    /** @override */
    decode(g, M = 0) {
      const T = e(g), W = T.readInt32BE(M), J = T.readUInt32BE(M + 4);
      return O(W, J);
    }
    /** @override */
    encode(g, M, T = 0) {
      const W = F(g), J = e(M);
      return J.writeInt32BE(W.hi32, T), J.writeUInt32BE(W.lo32, T + 4), 8;
    }
  }
  G.NearInt64BE = q;
  class K extends n {
    constructor(g) {
      super(4, g);
    }
    /** @override */
    decode(g, M = 0) {
      return e(g).readFloatLE(M);
    }
    /** @override */
    encode(g, M, T = 0) {
      return e(M).writeFloatLE(g, T), 4;
    }
  }
  G.Float = K;
  class V extends n {
    constructor(g) {
      super(4, g);
    }
    /** @override */
    decode(g, M = 0) {
      return e(g).readFloatBE(M);
    }
    /** @override */
    encode(g, M, T = 0) {
      return e(M).writeFloatBE(g, T), 4;
    }
  }
  G.FloatBE = V;
  class X extends n {
    constructor(g) {
      super(8, g);
    }
    /** @override */
    decode(g, M = 0) {
      return e(g).readDoubleLE(M);
    }
    /** @override */
    encode(g, M, T = 0) {
      return e(M).writeDoubleLE(g, T), 8;
    }
  }
  G.Double = X;
  class nt extends n {
    constructor(g) {
      super(8, g);
    }
    /** @override */
    decode(g, M = 0) {
      return e(g).readDoubleBE(M);
    }
    /** @override */
    encode(g, M, T = 0) {
      return e(M).writeDoubleBE(g, T), 8;
    }
  }
  G.DoubleBE = nt;
  class C extends n {
    constructor(g, M, T) {
      if (!(g instanceof n))
        throw new TypeError("elementLayout must be a Layout");
      if (!(M instanceof u && M.isCount() || Number.isInteger(M) && 0 <= M))
        throw new TypeError("count must be non-negative integer or an unsigned integer ExternalLayout");
      let W = -1;
      !(M instanceof u) && 0 < g.span && (W = M * g.span), super(W, T), this.elementLayout = g, this.count = M;
    }
    /** @override */
    getSpan(g, M = 0) {
      if (0 <= this.span)
        return this.span;
      let T = 0, W = this.count;
      if (W instanceof u && (W = W.decode(g, M)), 0 < this.elementLayout.span)
        T = W * this.elementLayout.span;
      else {
        let J = 0;
        for (; J < W; )
          T += this.elementLayout.getSpan(g, M + T), ++J;
      }
      return T;
    }
    /** @override */
    decode(g, M = 0) {
      const T = [];
      let W = 0, J = this.count;
      for (J instanceof u && (J = J.decode(g, M)); W < J; )
        T.push(this.elementLayout.decode(g, M)), M += this.elementLayout.getSpan(g, M), W += 1;
      return T;
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
    encode(g, M, T = 0) {
      const W = this.elementLayout, J = g.reduce((tt, st) => tt + W.encode(st, M, T + tt), 0);
      return this.count instanceof u && this.count.encode(g.length, M, T), J;
    }
  }
  G.Sequence = C;
  class v extends n {
    constructor(g, M, T) {
      if (!(Array.isArray(g) && g.reduce((J, tt) => J && tt instanceof n, !0)))
        throw new TypeError("fields must be array of Layout instances");
      typeof M == "boolean" && T === void 0 && (T = M, M = void 0);
      for (const J of g)
        if (0 > J.span && J.property === void 0)
          throw new Error("fields cannot contain unnamed variable-length layout");
      let W = -1;
      try {
        W = g.reduce((J, tt) => J + tt.getSpan(), 0);
      } catch {
      }
      super(W, M), this.fields = g, this.decodePrefixes = !!T;
    }
    /** @override */
    getSpan(g, M = 0) {
      if (0 <= this.span)
        return this.span;
      let T = 0;
      try {
        T = this.fields.reduce((W, J) => {
          const tt = J.getSpan(g, M);
          return M += tt, W + tt;
        }, 0);
      } catch {
        throw new RangeError("indeterminate span");
      }
      return T;
    }
    /** @override */
    decode(g, M = 0) {
      t(g);
      const T = this.makeDestinationObject();
      for (const W of this.fields)
        if (W.property !== void 0 && (T[W.property] = W.decode(g, M)), M += W.getSpan(g, M), this.decodePrefixes && g.length === M)
          break;
      return T;
    }
    /** Implement {@link Layout#encode|encode} for {@link Structure}.
     *
     * If `src` is missing a property for a member with a defined {@link
     * Layout#property|property} the corresponding region of the buffer is
     * left unmodified. */
    encode(g, M, T = 0) {
      const W = T;
      let J = 0, tt = 0;
      for (const st of this.fields) {
        let xt = st.span;
        if (tt = 0 < xt ? xt : 0, st.property !== void 0) {
          const gt = g[st.property];
          gt !== void 0 && (tt = st.encode(gt, M, T), 0 > xt && (xt = st.getSpan(M, T)));
        }
        J = T, T += xt;
      }
      return J + tt - W;
    }
    /** @override */
    fromArray(g) {
      const M = this.makeDestinationObject();
      for (const T of this.fields)
        T.property !== void 0 && 0 < g.length && (M[T.property] = g.shift());
      return M;
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
      for (const M of this.fields)
        if (M.property === g)
          return M;
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
      let M = 0;
      for (const T of this.fields) {
        if (T.property === g)
          return M;
        0 > T.span ? M = -1 : 0 <= M && (M += T.span);
      }
    }
  }
  G.Structure = v;
  class x {
    constructor(g) {
      this.property = g;
    }
    /** Analog to {@link Layout#decode|Layout decode} for union discriminators.
     *
     * The implementation of this method need not reference the buffer if
     * variant information is available through other means. */
    decode(g, M) {
      throw new Error("UnionDiscriminator is abstract");
    }
    /** Analog to {@link Layout#decode|Layout encode} for union discriminators.
     *
     * The implementation of this method need not store the value if
     * variant information is maintained through other means. */
    encode(g, M, T) {
      throw new Error("UnionDiscriminator is abstract");
    }
  }
  G.UnionDiscriminator = x;
  class D extends x {
    constructor(g, M) {
      if (!(g instanceof u && g.isCount()))
        throw new TypeError("layout must be an unsigned integer ExternalLayout");
      super(M || g.property || "variant"), this.layout = g;
    }
    /** Delegate decoding to {@link UnionLayoutDiscriminator#layout|layout}. */
    decode(g, M) {
      return this.layout.decode(g, M);
    }
    /** Delegate encoding to {@link UnionLayoutDiscriminator#layout|layout}. */
    encode(g, M, T) {
      return this.layout.encode(g, M, T);
    }
  }
  G.UnionLayoutDiscriminator = D;
  class R extends n {
    constructor(g, M, T) {
      let W;
      if (g instanceof E || g instanceof S)
        W = new D(new A(g));
      else if (g instanceof u && g.isCount())
        W = new D(g);
      else if (g instanceof x)
        W = g;
      else
        throw new TypeError("discr must be a UnionDiscriminator or an unsigned integer layout");
      if (M === void 0 && (M = null), !(M === null || M instanceof n))
        throw new TypeError("defaultLayout must be null or a Layout");
      if (M !== null) {
        if (0 > M.span)
          throw new Error("defaultLayout must have constant span");
        M.property === void 0 && (M = M.replicate("content"));
      }
      let J = -1;
      M && (J = M.span, 0 <= J && (g instanceof E || g instanceof S) && (J += W.layout.span)), super(J, T), this.discriminator = W, this.usesPrefixDiscriminator = g instanceof E || g instanceof S, this.defaultLayout = M, this.registry = {};
      let tt = this.defaultGetSourceVariant.bind(this);
      this.getSourceVariant = function(st) {
        return tt(st);
      }, this.configGetSourceVariant = function(st) {
        tt = st.bind(this);
      };
    }
    /** @override */
    getSpan(g, M = 0) {
      if (0 <= this.span)
        return this.span;
      const T = this.getVariant(g, M);
      if (!T)
        throw new Error("unable to determine span for unrecognized variant");
      return T.getSpan(g, M);
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
        const M = this.registry[g[this.discriminator.property]];
        if (M && (!M.layout || M.property && Object.prototype.hasOwnProperty.call(g, M.property)))
          return M;
      } else
        for (const M in this.registry) {
          const T = this.registry[M];
          if (T.property && Object.prototype.hasOwnProperty.call(g, T.property))
            return T;
        }
      throw new Error("unable to infer src variant");
    }
    /** Implement {@link Layout#decode|decode} for {@link Union}.
     *
     * If the variant is {@link Union#addVariant|registered} the return
     * value is an instance of that variant, with no explicit
     * discriminator.  Otherwise the {@link Union#defaultLayout|default
     * layout} is used to decode the content. */
    decode(g, M = 0) {
      let T;
      const W = this.discriminator, J = W.decode(g, M), tt = this.registry[J];
      if (tt === void 0) {
        const st = this.defaultLayout;
        let xt = 0;
        this.usesPrefixDiscriminator && (xt = W.layout.span), T = this.makeDestinationObject(), T[W.property] = J, T[st.property] = st.decode(g, M + xt);
      } else
        T = tt.decode(g, M);
      return T;
    }
    /** Implement {@link Layout#encode|encode} for {@link Union}.
     *
     * This API assumes the `src` object is consistent with the union's
     * {@link Union#defaultLayout|default layout}.  To encode variants
     * use the appropriate variant-specific {@link VariantLayout#encode}
     * method. */
    encode(g, M, T = 0) {
      const W = this.getSourceVariant(g);
      if (W === void 0) {
        const J = this.discriminator, tt = this.defaultLayout;
        let st = 0;
        return this.usesPrefixDiscriminator && (st = J.layout.span), J.encode(g[J.property], M, T), st + tt.encode(g[tt.property], M, T + st);
      }
      return W.encode(g, M, T);
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
    addVariant(g, M, T) {
      const W = new b(this, g, M, T);
      return this.registry[g] = W, W;
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
    getVariant(g, M = 0) {
      let T;
      return g instanceof Uint8Array ? T = this.discriminator.decode(g, M) : T = g, this.registry[T];
    }
  }
  G.Union = R;
  class b extends n {
    constructor(g, M, T, W) {
      if (!(g instanceof R))
        throw new TypeError("union must be a Union");
      if (!Number.isInteger(M) || 0 > M)
        throw new TypeError("variant must be a (non-negative) integer");
      if (typeof T == "string" && W === void 0 && (W = T, T = null), T) {
        if (!(T instanceof n))
          throw new TypeError("layout must be a Layout");
        if (g.defaultLayout !== null && 0 <= T.span && T.span > g.defaultLayout.span)
          throw new Error("variant span exceeds span of containing union");
        if (typeof W != "string")
          throw new TypeError("variant must have a String property");
      }
      let J = g.span;
      0 > g.span && (J = T ? T.span : 0, 0 <= J && g.usesPrefixDiscriminator && (J += g.discriminator.layout.span)), super(J, W), this.union = g, this.variant = M, this.layout = T || null;
    }
    /** @override */
    getSpan(g, M = 0) {
      if (0 <= this.span)
        return this.span;
      let T = 0;
      this.union.usesPrefixDiscriminator && (T = this.union.discriminator.layout.span);
      let W = 0;
      return this.layout && (W = this.layout.getSpan(g, M + T)), T + W;
    }
    /** @override */
    decode(g, M = 0) {
      const T = this.makeDestinationObject();
      if (this !== this.union.getVariant(g, M))
        throw new Error("variant mismatch");
      let W = 0;
      return this.union.usesPrefixDiscriminator && (W = this.union.discriminator.layout.span), this.layout ? T[this.property] = this.layout.decode(g, M + W) : this.property ? T[this.property] = !0 : this.union.usesPrefixDiscriminator && (T[this.union.discriminator.property] = this.variant), T;
    }
    /** @override */
    encode(g, M, T = 0) {
      let W = 0;
      if (this.union.usesPrefixDiscriminator && (W = this.union.discriminator.layout.span), this.layout && !Object.prototype.hasOwnProperty.call(g, this.property))
        throw new TypeError("variant lacks property " + this.property);
      this.union.discriminator.encode(this.variant, M, T);
      let J = W;
      if (this.layout && (this.layout.encode(g[this.property], M, T + W), J += this.layout.getSpan(M, T + W), 0 <= this.union.span && J > this.union.span))
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
  function l(f) {
    return 0 > f && (f += 4294967296), f;
  }
  class d extends n {
    constructor(g, M, T) {
      if (!(g instanceof E || g instanceof S))
        throw new TypeError("word must be a UInt or UIntBE layout");
      if (typeof M == "string" && T === void 0 && (T = M, M = !1), 4 < g.span)
        throw new RangeError("word cannot exceed 32 bits");
      super(g.span, T), this.word = g, this.msb = !!M, this.fields = [];
      let W = 0;
      this._packedSetValue = function(J) {
        return W = l(J), this;
      }, this._packedGetValue = function() {
        return W;
      };
    }
    /** @override */
    decode(g, M = 0) {
      const T = this.makeDestinationObject(), W = this.word.decode(g, M);
      this._packedSetValue(W);
      for (const J of this.fields)
        J.property !== void 0 && (T[J.property] = J.decode(g));
      return T;
    }
    /** Implement {@link Layout#encode|encode} for {@link BitStructure}.
     *
     * If `src` is missing a property for a member with a defined {@link
     * Layout#property|property} the corresponding region of the packed
     * value is left unmodified.  Unused bits are also left unmodified. */
    encode(g, M, T = 0) {
      const W = this.word.decode(M, T);
      this._packedSetValue(W);
      for (const J of this.fields)
        if (J.property !== void 0) {
          const tt = g[J.property];
          tt !== void 0 && J.encode(tt);
        }
      return this.word.encode(this._packedGetValue(), M, T);
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
    addField(g, M) {
      const T = new p(this, g, M);
      return this.fields.push(T), T;
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
      const M = new m(this, g);
      return this.fields.push(M), M;
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
      for (const M of this.fields)
        if (M.property === g)
          return M;
    }
  }
  G.BitStructure = d;
  class p {
    constructor(g, M, T) {
      if (!(g instanceof d))
        throw new TypeError("container must be a BitStructure");
      if (!Number.isInteger(M) || 0 >= M)
        throw new TypeError("bits must be positive integer");
      const W = 8 * g.span, J = g.fields.reduce((tt, st) => tt + st.bits, 0);
      if (M + J > W)
        throw new Error("bits too long for span remainder (" + (W - J) + " of " + W + " remain)");
      this.container = g, this.bits = M, this.valueMask = (1 << M) - 1, M === 32 && (this.valueMask = 4294967295), this.start = J, this.container.msb && (this.start = W - J - M), this.wordMask = l(this.valueMask << this.start), this.property = T;
    }
    /** Store a value into the corresponding subsequence of the containing
     * bit field. */
    decode(g, M) {
      const T = this.container._packedGetValue();
      return l(T & this.wordMask) >>> this.start;
    }
    /** Store a value into the corresponding subsequence of the containing
     * bit field.
     *
     * **NOTE** This is not a specialization of {@link
     * Layout#encode|Layout.encode} and there is no return value. */
    encode(g) {
      if (typeof g != "number" || !Number.isInteger(g) || g !== l(g & this.valueMask))
        throw new TypeError(i("BitField.encode", this) + " value must be integer not exceeding " + this.valueMask);
      const M = this.container._packedGetValue(), T = l(g << this.start);
      this.container._packedSetValue(l(M & ~this.wordMask) | T);
    }
  }
  G.BitField = p;
  class m extends p {
    constructor(g, M) {
      super(g, 1, M);
    }
    /** Override {@link BitField#decode|decode} for {@link Boolean|Boolean}.
     *
     * @returns {boolean} */
    decode(g, M) {
      return !!super.decode(g, M);
    }
    /** @override */
    encode(g) {
      typeof g == "boolean" && (g = +g), super.encode(g);
    }
  }
  G.Boolean = m;
  class w extends n {
    constructor(g, M) {
      if (!(g instanceof u && g.isCount() || Number.isInteger(g) && 0 <= g))
        throw new TypeError("length must be positive integer or an unsigned integer ExternalLayout");
      let T = -1;
      g instanceof u || (T = g), super(T, M), this.length = g;
    }
    /** @override */
    getSpan(g, M) {
      let T = this.span;
      return 0 > T && (T = this.length.decode(g, M)), T;
    }
    /** @override */
    decode(g, M = 0) {
      let T = this.span;
      return 0 > T && (T = this.length.decode(g, M)), e(g).slice(M, M + T);
    }
    /** Implement {@link Layout#encode|encode} for {@link Blob}.
     *
     * **NOTE** If {@link Layout#count|count} is an instance of {@link
     * ExternalLayout} then the length of `src` will be encoded as the
     * count after `src` is encoded. */
    encode(g, M, T) {
      let W = this.length;
      if (this.length instanceof u && (W = g.length), !(g instanceof Uint8Array && W === g.length))
        throw new TypeError(i("Blob.encode", this) + " requires (length " + W + ") Uint8Array as src");
      if (T + W > M.length)
        throw new RangeError("encoding overruns Uint8Array");
      const J = e(g);
      return e(M).write(J.toString("hex"), T, W, "hex"), this.length instanceof u && this.length.encode(W, M, T), W;
    }
  }
  G.Blob = w;
  class B extends n {
    constructor(g) {
      super(-1, g);
    }
    /** @override */
    getSpan(g, M = 0) {
      t(g);
      let T = M;
      for (; T < g.length && g[T] !== 0; )
        T += 1;
      return 1 + T - M;
    }
    /** @override */
    decode(g, M = 0) {
      const T = this.getSpan(g, M);
      return e(g).slice(M, M + T - 1).toString("utf-8");
    }
    /** @override */
    encode(g, M, T = 0) {
      typeof g != "string" && (g = String(g));
      const W = r.Buffer.from(g, "utf8"), J = W.length;
      if (T + J > M.length)
        throw new RangeError("encoding overruns Buffer");
      const tt = e(M);
      return W.copy(tt, T), tt[T + J] = 0, J + 1;
    }
  }
  G.CString = B;
  class z extends n {
    constructor(g, M) {
      if (typeof g == "string" && M === void 0 && (M = g, g = void 0), g === void 0)
        g = -1;
      else if (!Number.isInteger(g))
        throw new TypeError("maxSpan must be an integer");
      super(-1, M), this.maxSpan = g;
    }
    /** @override */
    getSpan(g, M = 0) {
      return t(g), g.length - M;
    }
    /** @override */
    decode(g, M = 0) {
      const T = this.getSpan(g, M);
      if (0 <= this.maxSpan && this.maxSpan < T)
        throw new RangeError("text length exceeds maxSpan");
      return e(g).slice(M, M + T).toString("utf-8");
    }
    /** @override */
    encode(g, M, T = 0) {
      typeof g != "string" && (g = String(g));
      const W = r.Buffer.from(g, "utf8"), J = W.length;
      if (0 <= this.maxSpan && this.maxSpan < J)
        throw new RangeError("text length exceeds maxSpan");
      if (T + J > M.length)
        throw new RangeError("encoding overruns Buffer");
      return W.copy(e(M), T), J;
    }
  }
  G.UTF8 = z;
  class I extends n {
    constructor(g, M) {
      super(0, M), this.value = g;
    }
    /** @override */
    decode(g, M) {
      return this.value;
    }
    /** @override */
    encode(g, M, T) {
      return 0;
    }
  }
  return G.Constant = I, G.greedy = (f, g) => new h(f, g), G.offset = (f, g, M) => new A(f, g, M), G.u8 = (f) => new E(1, f), G.u16 = (f) => new E(2, f), G.u24 = (f) => new E(3, f), G.u32 = (f) => new E(4, f), G.u40 = (f) => new E(5, f), G.u48 = (f) => new E(6, f), G.nu64 = (f) => new L(f), G.u16be = (f) => new S(2, f), G.u24be = (f) => new S(3, f), G.u32be = (f) => new S(4, f), G.u40be = (f) => new S(5, f), G.u48be = (f) => new S(6, f), G.nu64be = (f) => new Y(f), G.s8 = (f) => new N(1, f), G.s16 = (f) => new N(2, f), G.s24 = (f) => new N(3, f), G.s32 = (f) => new N(4, f), G.s40 = (f) => new N(5, f), G.s48 = (f) => new N(6, f), G.ns64 = (f) => new Q(f), G.s16be = (f) => new P(2, f), G.s24be = (f) => new P(3, f), G.s32be = (f) => new P(4, f), G.s40be = (f) => new P(5, f), G.s48be = (f) => new P(6, f), G.ns64be = (f) => new q(f), G.f32 = (f) => new K(f), G.f32be = (f) => new V(f), G.f64 = (f) => new X(f), G.f64be = (f) => new nt(f), G.struct = (f, g, M) => new v(f, g, M), G.bits = (f, g, M) => new d(f, g, M), G.seq = (f, g, M) => new C(f, g, M), G.union = (f, g, M) => new R(f, g, M), G.unionLayoutDiscriminator = (f, g) => new D(f, g), G.blob = (f, g) => new w(f, g), G.cstr = (f) => new B(f), G.utf8 = (f, g) => new z(f, g), G.constant = (f, g) => new I(f, g), G;
}
var _ = Zh(), Gh = 8078e3, Jh = 8078001, Kh = 8078004, Vh = 8078005, Xh = 8078006, $h = 8078011;
function Ac(r) {
  return Array.isArray(r) ? "%5B" + r.map(Ac).join(
    "%2C%20"
    /* ", " */
  ) + /* "]" */
  "%5D" : typeof r == "bigint" ? `${r}n` : encodeURIComponent(
    String(
      r != null && Object.getPrototypeOf(r) === null ? (
        // Plain objects with no prototype don't have a `toString` method.
        // Convert them before stringifying them.
        { ...r }
      ) : r
    )
  );
}
function tf([r, t]) {
  return `${r}=${Ac(t)}`;
}
function ef(r) {
  const t = Object.entries(r).map(tf).join("&");
  return btoa(t);
}
function nf(r, t = {}) {
  {
    let e = `Solana error #${r}; Decode this error by running \`npx @solana/errors decode -- ${r}`;
    return Object.keys(t).length && (e += ` '${ef(t)}'`), `${e}\``;
  }
}
var or = class extends Error {
  constructor(...[t, e]) {
    let n, i;
    if (e) {
      const { cause: u, ...h } = e;
      u && (i = { cause: u }), Object.keys(h).length > 0 && (n = h);
    }
    const s = nf(t, n);
    super(s, i);
    /**
     * Indicates the root cause of this {@link SolanaError}, if any.
     *
     * For example, a transaction error might have an instruction error as its root cause. In this
     * case, you will be able to access the instruction error on the transaction error as `cause`.
     */
    de(this, "cause", this.cause);
    /**
     * Contains context that can assist in understanding or recovering from a {@link SolanaError}.
     */
    de(this, "context");
    this.context = {
      __code: t,
      ...n
    }, this.name = "SolanaError";
  }
};
function rf(r, t) {
  return "fixedSize" in t ? t.fixedSize : t.getSizeFromValue(r);
}
function sf(r) {
  return Object.freeze({
    ...r,
    encode: (t) => {
      const e = new Uint8Array(rf(t, r));
      return r.write(t, e, 0), e;
    }
  });
}
function of(r) {
  return Object.freeze({
    ...r,
    decode: (t, e = 0) => r.read(t, e)[0]
  });
}
function Kn(r) {
  return "fixedSize" in r && typeof r.fixedSize == "number";
}
function af(r, t) {
  if (Kn(r) !== Kn(t))
    throw new or(Kh);
  if (Kn(r) && Kn(t) && r.fixedSize !== t.fixedSize)
    throw new or(Vh, {
      decoderFixedSize: t.fixedSize,
      encoderFixedSize: r.fixedSize
    });
  if (!Kn(r) && !Kn(t) && r.maxSize !== t.maxSize)
    throw new or(Xh, {
      decoderMaxSize: t.maxSize,
      encoderMaxSize: r.maxSize
    });
  return {
    ...t,
    ...r,
    decode: t.decode,
    encode: r.encode,
    read: t.read,
    write: r.write
  };
}
function cf(r, t, e = 0) {
  if (t.length - e <= 0)
    throw new or(Gh, {
      codecDescription: r
    });
}
function uf(r, t, e, n = 0) {
  const i = e.length - n;
  if (i < t)
    throw new or(Jh, {
      bytesLength: i,
      codecDescription: r,
      expected: t
    });
}
function lf(r, t, e, n) {
  if (n < t || n > e)
    throw new or($h, {
      codecDescription: r,
      max: e,
      min: t,
      value: n
    });
}
function pc(r) {
  return r?.endian !== 1;
}
function hf(r) {
  return sf({
    fixedSize: r.size,
    write(t, e, n) {
      r.range && lf(r.name, r.range[0], r.range[1], t);
      const i = new ArrayBuffer(r.size);
      return r.set(new DataView(i), t, pc(r.config)), e.set(new Uint8Array(i), n), n + r.size;
    }
  });
}
function ff(r) {
  return of({
    fixedSize: r.size,
    read(t, e = 0) {
      cf(r.name, t, e), uf(r.name, r.size, t, e);
      const n = new DataView(df(t, e, r.size));
      return [r.get(n, pc(r.config)), e + r.size];
    }
  });
}
function df(r, t, e) {
  const n = r.byteOffset + (t ?? 0), i = e ?? r.byteLength;
  return r.buffer.slice(n, n + i);
}
var gf = (r = {}) => hf({
  config: r,
  name: "u64",
  range: [0n, BigInt("0xffffffffffffffff")],
  set: (t, e, n) => t.setBigUint64(0, BigInt(e), n),
  size: 8
}), Af = (r = {}) => ff({
  config: r,
  get: (t, e) => t.getBigUint64(0, e),
  name: "u64",
  size: 8
}), pf = (r = {}) => af(gf(r), Af(r));
class wf extends TypeError {
  constructor(t, e) {
    let n;
    const { message: i, explanation: s, ...u } = t, { path: h } = t, A = h.length === 0 ? i : `At path: ${h.join(".")} -- ${i}`;
    super(s ?? A), s != null && (this.cause = A), Object.assign(this, u), this.name = this.constructor.name, this.failures = () => n ?? (n = [t, ...e()]);
  }
}
function yf(r) {
  return Fr(r) && typeof r[Symbol.iterator] == "function";
}
function Fr(r) {
  return typeof r == "object" && r != null;
}
function wi(r) {
  return Fr(r) && !Array.isArray(r);
}
function Je(r) {
  return typeof r == "symbol" ? r.toString() : typeof r == "string" ? JSON.stringify(r) : `${r}`;
}
function mf(r) {
  const { done: t, value: e } = r.next();
  return t ? void 0 : e;
}
function bf(r, t, e, n) {
  if (r === !0)
    return;
  r === !1 ? r = {} : typeof r == "string" && (r = { message: r });
  const { path: i, branch: s } = t, { type: u } = e, { refinement: h, message: A = `Expected a value of type \`${u}\`${h ? ` with refinement \`${h}\`` : ""}, but received: \`${Je(n)}\`` } = r;
  return {
    value: n,
    type: u,
    refinement: h,
    key: i[i.length - 1],
    path: i,
    branch: s,
    ...r,
    message: A
  };
}
function* ga(r, t, e, n) {
  yf(r) || (r = [r]);
  for (const i of r) {
    const s = bf(i, t, e, n);
    s && (yield s);
  }
}
function* yo(r, t, e = {}) {
  const { path: n = [], branch: i = [r], coerce: s = !1, mask: u = !1 } = e, h = { path: n, branch: i, mask: u };
  s && (r = t.coercer(r, h));
  let A = "valid";
  for (const E of t.validator(r, h))
    E.explanation = e.message, A = "not_valid", yield [E, void 0];
  for (let [E, S, N] of t.entries(r, h)) {
    const P = yo(S, N, {
      path: E === void 0 ? n : [...n, E],
      branch: E === void 0 ? i : [...i, S],
      coerce: s,
      mask: u,
      message: e.message
    });
    for (const U of P)
      U[0] ? (A = U[0].refinement != null ? "not_refined" : "not_valid", yield [U[0], void 0]) : s && (S = U[1], E === void 0 ? r = S : r instanceof Map ? r.set(E, S) : r instanceof Set ? r.add(S) : Fr(r) && (S !== void 0 || E in r) && (r[E] = S));
  }
  if (A !== "not_valid")
    for (const E of t.refiner(r, h))
      E.explanation = e.message, A = "not_refined", yield [E, void 0];
  A === "valid" && (yield [void 0, r]);
}
let sn = class {
  constructor(t) {
    const { type: e, schema: n, validator: i, refiner: s, coercer: u = (A) => A, entries: h = function* () {
    } } = t;
    this.type = e, this.schema = n, this.entries = h, this.coercer = u, i ? this.validator = (A, E) => {
      const S = i(A, E);
      return ga(S, E, this, A);
    } : this.validator = () => [], s ? this.refiner = (A, E) => {
      const S = s(A, E);
      return ga(S, E, this, A);
    } : this.refiner = () => [];
  }
  /**
   * Assert that a value passes the struct's validation, throwing if it doesn't.
   */
  assert(t, e) {
    return Ef(t, this, e);
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
    return wc(t, this);
  }
  /**
   * Mask a value, coercing and validating it, but returning only the subset of
   * properties defined by the struct's schema. Masking applies recursively to
   * props of `object` structs only.
   */
  mask(t, e) {
    return If(t, this, e);
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
    return Qr(t, this, e);
  }
};
function Ef(r, t, e) {
  const n = Qr(r, t, { message: e });
  if (n[0])
    throw n[0];
}
function rt(r, t, e) {
  const n = Qr(r, t, { coerce: !0, message: e });
  if (n[0])
    throw n[0];
  return n[1];
}
function If(r, t, e) {
  const n = Qr(r, t, { coerce: !0, mask: !0, message: e });
  if (n[0])
    throw n[0];
  return n[1];
}
function wc(r, t) {
  return !Qr(r, t)[0];
}
function Qr(r, t, e = {}) {
  const n = yo(r, t, e), i = mf(n);
  return i[0] ? [new wf(i[0], function* () {
    for (const u of n)
      u[0] && (yield u[0]);
  }), void 0] : [void 0, i[1]];
}
function qn(r, t) {
  return new sn({ type: r, schema: null, validator: t });
}
function vf() {
  return qn("any", () => !0);
}
function it(r) {
  return new sn({
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
      return Array.isArray(t) || `Expected an array value, but received: ${Je(t)}`;
    }
  });
}
function rn() {
  return qn("boolean", (r) => typeof r == "boolean");
}
function mo(r) {
  return qn("instance", (t) => t instanceof r || `Expected a \`${r.name}\` instance, but received: ${Je(t)}`);
}
function Ht(r) {
  const t = Je(r), e = typeof r;
  return new sn({
    type: "literal",
    schema: e === "string" || e === "number" || e === "boolean" ? r : null,
    validator(n) {
      return n === r || `Expected the literal \`${t}\`, but received: ${Je(n)}`;
    }
  });
}
function Sf() {
  return qn("never", () => !1);
}
function ot(r) {
  return new sn({
    ...r,
    validator: (t, e) => t === null || r.validator(t, e),
    refiner: (t, e) => t === null || r.refiner(t, e)
  });
}
function Z() {
  return qn("number", (r) => typeof r == "number" && !isNaN(r) || `Expected a number, but received: ${Je(r)}`);
}
function mt(r) {
  return new sn({
    ...r,
    validator: (t, e) => t === void 0 || r.validator(t, e),
    refiner: (t, e) => t === void 0 || r.refiner(t, e)
  });
}
function yc(r, t) {
  return new sn({
    type: "record",
    schema: null,
    *entries(e) {
      if (Fr(e))
        for (const n in e) {
          const i = e[n];
          yield [n, n, r], yield [n, i, t];
        }
    },
    validator(e) {
      return wi(e) || `Expected an object, but received: ${Je(e)}`;
    },
    coercer(e) {
      return wi(e) ? { ...e } : e;
    }
  });
}
function et() {
  return qn("string", (r) => typeof r == "string" || `Expected a string, but received: ${Je(r)}`);
}
function bo(r) {
  const t = Sf();
  return new sn({
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
      return Array.isArray(e) || `Expected an array, but received: ${Je(e)}`;
    },
    coercer(e) {
      return Array.isArray(e) ? e.slice() : e;
    }
  });
}
function $(r) {
  const t = Object.keys(r);
  return new sn({
    type: "type",
    schema: r,
    *entries(e) {
      if (Fr(e))
        for (const n of t)
          yield [n, e[n], r[n]];
    },
    validator(e) {
      return wi(e) || `Expected an object, but received: ${Je(e)}`;
    },
    coercer(e) {
      return wi(e) ? { ...e } : e;
    }
  });
}
function Te(r) {
  const t = r.map((e) => e.type).join(" | ");
  return new sn({
    type: "union",
    schema: null,
    coercer(e, n) {
      for (const i of r) {
        const [s, u] = i.validate(e, {
          coerce: !0,
          mask: n.mask
        });
        if (!s)
          return u;
      }
      return e;
    },
    validator(e, n) {
      const i = [];
      for (const s of r) {
        const [...u] = yo(e, s, n), [h] = u;
        if (h[0])
          for (const [A] of u)
            A && i.push(A);
        else
          return [];
      }
      return [
        `Expected the value to satisfy a union of \`${t}\`, but received: ${Je(e)}`,
        ...i
      ];
    }
  });
}
function Ar() {
  return qn("unknown", () => !0);
}
function _r(r, t, e) {
  return new sn({
    ...r,
    coercer: (n, i) => wc(n, t) ? r.coercer(e(n, i), i) : r.coercer(n, i)
  });
}
var Kr, Mf = new Uint8Array(16);
function mc() {
  if (!Kr && (Kr = typeof crypto < "u" && crypto.getRandomValues && crypto.getRandomValues.bind(crypto) || typeof msCrypto < "u" && typeof msCrypto.getRandomValues == "function" && msCrypto.getRandomValues.bind(msCrypto), !Kr))
    throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");
  return Kr(Mf);
}
const xf = /^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i;
function Bi(r) {
  return typeof r == "string" && xf.test(r);
}
var be = [];
for (var ms = 0; ms < 256; ++ms)
  be.push((ms + 256).toString(16).substr(1));
function Ci(r) {
  var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0, e = (be[r[t + 0]] + be[r[t + 1]] + be[r[t + 2]] + be[r[t + 3]] + "-" + be[r[t + 4]] + be[r[t + 5]] + "-" + be[r[t + 6]] + be[r[t + 7]] + "-" + be[r[t + 8]] + be[r[t + 9]] + "-" + be[r[t + 10]] + be[r[t + 11]] + be[r[t + 12]] + be[r[t + 13]] + be[r[t + 14]] + be[r[t + 15]]).toLowerCase();
  if (!Bi(e))
    throw TypeError("Stringified UUID is invalid");
  return e;
}
var Aa, bs, Es = 0, Is = 0;
function Bf(r, t, e) {
  var n = t && e || 0, i = t || new Array(16);
  r = r || {};
  var s = r.node || Aa, u = r.clockseq !== void 0 ? r.clockseq : bs;
  if (s == null || u == null) {
    var h = r.random || (r.rng || mc)();
    s == null && (s = Aa = [h[0] | 1, h[1], h[2], h[3], h[4], h[5]]), u == null && (u = bs = (h[6] << 8 | h[7]) & 16383);
  }
  var A = r.msecs !== void 0 ? r.msecs : Date.now(), E = r.nsecs !== void 0 ? r.nsecs : Is + 1, S = A - Es + (E - Is) / 1e4;
  if (S < 0 && r.clockseq === void 0 && (u = u + 1 & 16383), (S < 0 || A > Es) && r.nsecs === void 0 && (E = 0), E >= 1e4)
    throw new Error("uuid.v1(): Can't create more than 10M uuids/sec");
  Es = A, Is = E, bs = u, A += 122192928e5;
  var N = ((A & 268435455) * 1e4 + E) % 4294967296;
  i[n++] = N >>> 24 & 255, i[n++] = N >>> 16 & 255, i[n++] = N >>> 8 & 255, i[n++] = N & 255;
  var P = A / 4294967296 * 1e4 & 268435455;
  i[n++] = P >>> 8 & 255, i[n++] = P & 255, i[n++] = P >>> 24 & 15 | 16, i[n++] = P >>> 16 & 255, i[n++] = u >>> 8 | 128, i[n++] = u & 255;
  for (var U = 0; U < 6; ++U)
    i[n + U] = s[U];
  return t || Ci(i);
}
function bc(r) {
  if (!Bi(r))
    throw TypeError("Invalid UUID");
  var t, e = new Uint8Array(16);
  return e[0] = (t = parseInt(r.slice(0, 8), 16)) >>> 24, e[1] = t >>> 16 & 255, e[2] = t >>> 8 & 255, e[3] = t & 255, e[4] = (t = parseInt(r.slice(9, 13), 16)) >>> 8, e[5] = t & 255, e[6] = (t = parseInt(r.slice(14, 18), 16)) >>> 8, e[7] = t & 255, e[8] = (t = parseInt(r.slice(19, 23), 16)) >>> 8, e[9] = t & 255, e[10] = (t = parseInt(r.slice(24, 36), 16)) / 1099511627776 & 255, e[11] = t / 4294967296 & 255, e[12] = t >>> 24 & 255, e[13] = t >>> 16 & 255, e[14] = t >>> 8 & 255, e[15] = t & 255, e;
}
function Cf(r) {
  r = unescape(encodeURIComponent(r));
  for (var t = [], e = 0; e < r.length; ++e)
    t.push(r.charCodeAt(e));
  return t;
}
var kf = "6ba7b810-9dad-11d1-80b4-00c04fd430c8", Nf = "6ba7b811-9dad-11d1-80b4-00c04fd430c8";
function Ec(r, t, e) {
  function n(i, s, u, h) {
    if (typeof i == "string" && (i = Cf(i)), typeof s == "string" && (s = bc(s)), s.length !== 16)
      throw TypeError("Namespace must be array-like (16 iterable integer values, 0-255)");
    var A = new Uint8Array(16 + i.length);
    if (A.set(s), A.set(i, s.length), A = e(A), A[6] = A[6] & 15 | t, A[8] = A[8] & 63 | 128, u) {
      h = h || 0;
      for (var E = 0; E < 16; ++E)
        u[h + E] = A[E];
      return u;
    }
    return Ci(A);
  }
  try {
    n.name = r;
  } catch {
  }
  return n.DNS = kf, n.URL = Nf, n;
}
function Tf(r) {
  if (typeof r == "string") {
    var t = unescape(encodeURIComponent(r));
    r = new Uint8Array(t.length);
    for (var e = 0; e < t.length; ++e)
      r[e] = t.charCodeAt(e);
  }
  return Lf(Rf(Of(r), r.length * 8));
}
function Lf(r) {
  for (var t = [], e = r.length * 32, n = "0123456789abcdef", i = 0; i < e; i += 8) {
    var s = r[i >> 5] >>> i % 32 & 255, u = parseInt(n.charAt(s >>> 4 & 15) + n.charAt(s & 15), 16);
    t.push(u);
  }
  return t;
}
function Ic(r) {
  return (r + 64 >>> 9 << 4) + 14 + 1;
}
function Rf(r, t) {
  r[t >> 5] |= 128 << t % 32, r[Ic(t) - 1] = t;
  for (var e = 1732584193, n = -271733879, i = -1732584194, s = 271733878, u = 0; u < r.length; u += 16) {
    var h = e, A = n, E = i, S = s;
    e = ve(e, n, i, s, r[u], 7, -680876936), s = ve(s, e, n, i, r[u + 1], 12, -389564586), i = ve(i, s, e, n, r[u + 2], 17, 606105819), n = ve(n, i, s, e, r[u + 3], 22, -1044525330), e = ve(e, n, i, s, r[u + 4], 7, -176418897), s = ve(s, e, n, i, r[u + 5], 12, 1200080426), i = ve(i, s, e, n, r[u + 6], 17, -1473231341), n = ve(n, i, s, e, r[u + 7], 22, -45705983), e = ve(e, n, i, s, r[u + 8], 7, 1770035416), s = ve(s, e, n, i, r[u + 9], 12, -1958414417), i = ve(i, s, e, n, r[u + 10], 17, -42063), n = ve(n, i, s, e, r[u + 11], 22, -1990404162), e = ve(e, n, i, s, r[u + 12], 7, 1804603682), s = ve(s, e, n, i, r[u + 13], 12, -40341101), i = ve(i, s, e, n, r[u + 14], 17, -1502002290), n = ve(n, i, s, e, r[u + 15], 22, 1236535329), e = Se(e, n, i, s, r[u + 1], 5, -165796510), s = Se(s, e, n, i, r[u + 6], 9, -1069501632), i = Se(i, s, e, n, r[u + 11], 14, 643717713), n = Se(n, i, s, e, r[u], 20, -373897302), e = Se(e, n, i, s, r[u + 5], 5, -701558691), s = Se(s, e, n, i, r[u + 10], 9, 38016083), i = Se(i, s, e, n, r[u + 15], 14, -660478335), n = Se(n, i, s, e, r[u + 4], 20, -405537848), e = Se(e, n, i, s, r[u + 9], 5, 568446438), s = Se(s, e, n, i, r[u + 14], 9, -1019803690), i = Se(i, s, e, n, r[u + 3], 14, -187363961), n = Se(n, i, s, e, r[u + 8], 20, 1163531501), e = Se(e, n, i, s, r[u + 13], 5, -1444681467), s = Se(s, e, n, i, r[u + 2], 9, -51403784), i = Se(i, s, e, n, r[u + 7], 14, 1735328473), n = Se(n, i, s, e, r[u + 12], 20, -1926607734), e = Me(e, n, i, s, r[u + 5], 4, -378558), s = Me(s, e, n, i, r[u + 8], 11, -2022574463), i = Me(i, s, e, n, r[u + 11], 16, 1839030562), n = Me(n, i, s, e, r[u + 14], 23, -35309556), e = Me(e, n, i, s, r[u + 1], 4, -1530992060), s = Me(s, e, n, i, r[u + 4], 11, 1272893353), i = Me(i, s, e, n, r[u + 7], 16, -155497632), n = Me(n, i, s, e, r[u + 10], 23, -1094730640), e = Me(e, n, i, s, r[u + 13], 4, 681279174), s = Me(s, e, n, i, r[u], 11, -358537222), i = Me(i, s, e, n, r[u + 3], 16, -722521979), n = Me(n, i, s, e, r[u + 6], 23, 76029189), e = Me(e, n, i, s, r[u + 9], 4, -640364487), s = Me(s, e, n, i, r[u + 12], 11, -421815835), i = Me(i, s, e, n, r[u + 15], 16, 530742520), n = Me(n, i, s, e, r[u + 2], 23, -995338651), e = xe(e, n, i, s, r[u], 6, -198630844), s = xe(s, e, n, i, r[u + 7], 10, 1126891415), i = xe(i, s, e, n, r[u + 14], 15, -1416354905), n = xe(n, i, s, e, r[u + 5], 21, -57434055), e = xe(e, n, i, s, r[u + 12], 6, 1700485571), s = xe(s, e, n, i, r[u + 3], 10, -1894986606), i = xe(i, s, e, n, r[u + 10], 15, -1051523), n = xe(n, i, s, e, r[u + 1], 21, -2054922799), e = xe(e, n, i, s, r[u + 8], 6, 1873313359), s = xe(s, e, n, i, r[u + 15], 10, -30611744), i = xe(i, s, e, n, r[u + 6], 15, -1560198380), n = xe(n, i, s, e, r[u + 13], 21, 1309151649), e = xe(e, n, i, s, r[u + 4], 6, -145523070), s = xe(s, e, n, i, r[u + 11], 10, -1120210379), i = xe(i, s, e, n, r[u + 2], 15, 718787259), n = xe(n, i, s, e, r[u + 9], 21, -343485551), e = Ln(e, h), n = Ln(n, A), i = Ln(i, E), s = Ln(s, S);
  }
  return [e, n, i, s];
}
function Of(r) {
  if (r.length === 0)
    return [];
  for (var t = r.length * 8, e = new Uint32Array(Ic(t)), n = 0; n < t; n += 8)
    e[n >> 5] |= (r[n / 8] & 255) << n % 32;
  return e;
}
function Ln(r, t) {
  var e = (r & 65535) + (t & 65535), n = (r >> 16) + (t >> 16) + (e >> 16);
  return n << 16 | e & 65535;
}
function Df(r, t) {
  return r << t | r >>> 32 - t;
}
function ki(r, t, e, n, i, s) {
  return Ln(Df(Ln(Ln(t, r), Ln(n, s)), i), e);
}
function ve(r, t, e, n, i, s, u) {
  return ki(t & e | ~t & n, r, t, i, s, u);
}
function Se(r, t, e, n, i, s, u) {
  return ki(t & n | e & ~n, r, t, i, s, u);
}
function Me(r, t, e, n, i, s, u) {
  return ki(t ^ e ^ n, r, t, i, s, u);
}
function xe(r, t, e, n, i, s, u) {
  return ki(e ^ (t | ~n), r, t, i, s, u);
}
var Uf = Ec("v3", 48, Tf);
function jf(r, t, e) {
  r = r || {};
  var n = r.random || (r.rng || mc)();
  if (n[6] = n[6] & 15 | 64, n[8] = n[8] & 63 | 128, t) {
    e = e || 0;
    for (var i = 0; i < 16; ++i)
      t[e + i] = n[i];
    return t;
  }
  return Ci(n);
}
function zf(r, t, e, n) {
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
function vs(r, t) {
  return r << t | r >>> 32 - t;
}
function Pf(r) {
  var t = [1518500249, 1859775393, 2400959708, 3395469782], e = [1732584193, 4023233417, 2562383102, 271733878, 3285377520];
  if (typeof r == "string") {
    var n = unescape(encodeURIComponent(r));
    r = [];
    for (var i = 0; i < n.length; ++i)
      r.push(n.charCodeAt(i));
  } else Array.isArray(r) || (r = Array.prototype.slice.call(r));
  r.push(128);
  for (var s = r.length / 4 + 2, u = Math.ceil(s / 16), h = new Array(u), A = 0; A < u; ++A) {
    for (var E = new Uint32Array(16), S = 0; S < 16; ++S)
      E[S] = r[A * 64 + S * 4] << 24 | r[A * 64 + S * 4 + 1] << 16 | r[A * 64 + S * 4 + 2] << 8 | r[A * 64 + S * 4 + 3];
    h[A] = E;
  }
  h[u - 1][14] = (r.length - 1) * 8 / Math.pow(2, 32), h[u - 1][14] = Math.floor(h[u - 1][14]), h[u - 1][15] = (r.length - 1) * 8 & 4294967295;
  for (var N = 0; N < u; ++N) {
    for (var P = new Uint32Array(80), U = 0; U < 16; ++U)
      P[U] = h[N][U];
    for (var F = 16; F < 80; ++F)
      P[F] = vs(P[F - 3] ^ P[F - 8] ^ P[F - 14] ^ P[F - 16], 1);
    for (var O = e[0], L = e[1], Y = e[2], Q = e[3], q = e[4], K = 0; K < 80; ++K) {
      var V = Math.floor(K / 20), X = vs(O, 5) + zf(V, L, Y, Q) + q + t[V] + P[K] >>> 0;
      q = Q, Q = Y, Y = vs(L, 30) >>> 0, L = O, O = X;
    }
    e[0] = e[0] + O >>> 0, e[1] = e[1] + L >>> 0, e[2] = e[2] + Y >>> 0, e[3] = e[3] + Q >>> 0, e[4] = e[4] + q >>> 0;
  }
  return [e[0] >> 24 & 255, e[0] >> 16 & 255, e[0] >> 8 & 255, e[0] & 255, e[1] >> 24 & 255, e[1] >> 16 & 255, e[1] >> 8 & 255, e[1] & 255, e[2] >> 24 & 255, e[2] >> 16 & 255, e[2] >> 8 & 255, e[2] & 255, e[3] >> 24 & 255, e[3] >> 16 & 255, e[3] >> 8 & 255, e[3] & 255, e[4] >> 24 & 255, e[4] >> 16 & 255, e[4] >> 8 & 255, e[4] & 255];
}
var Ff = Ec("v5", 80, Pf);
const Qf = "00000000-0000-0000-0000-000000000000";
function _f(r) {
  if (!Bi(r))
    throw TypeError("Invalid UUID");
  return parseInt(r.substr(14, 1), 16);
}
const Hf = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  NIL: Qf,
  parse: bc,
  stringify: Ci,
  v1: Bf,
  v3: Uf,
  v4: jf,
  v5: Ff,
  validate: Bi,
  version: _f
}, Symbol.toStringTag, { value: "Module" })), vc = /* @__PURE__ */ Qa(Hf);
var Ss, pa;
function Wf() {
  if (pa) return Ss;
  pa = 1;
  const r = vc.v4;
  return Ss = function(e, n, i, s) {
    if (typeof e != "string")
      throw new TypeError(e + " must be a string");
    s = s || {};
    const u = typeof s.version == "number" ? s.version : 2;
    if (u !== 1 && u !== 2)
      throw new TypeError(u + " must be 1 or 2");
    const h = {
      method: e
    };
    if (u === 2 && (h.jsonrpc = "2.0"), n) {
      if (typeof n != "object" && !Array.isArray(n))
        throw new TypeError(n + " must be an object, array or omitted");
      h.params = n;
    }
    if (typeof i > "u") {
      const A = typeof s.generator == "function" ? s.generator : function() {
        return r();
      };
      h.id = A(h, s);
    } else u === 2 && i === null ? s.notificationIdNull && (h.id = null) : h.id = i;
    return h;
  }, Ss;
}
var Ms, wa;
function qf() {
  if (wa) return Ms;
  wa = 1;
  const r = vc.v4, t = Wf(), e = function(n, i) {
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
  return Ms = e, e.prototype.request = function(n, i, s, u) {
    const h = this;
    let A = null;
    const E = Array.isArray(n) && typeof i == "function";
    if (this.options.version === 1 && E)
      throw new TypeError("JSON-RPC 1.0 does not support batching");
    if (E || !E && n && typeof n == "object" && typeof i == "function")
      u = i, A = n;
    else {
      typeof s == "function" && (u = s, s = void 0);
      const P = typeof u == "function";
      try {
        A = t(n, i, s, {
          generator: this.options.generator,
          version: this.options.version,
          notificationIdNull: this.options.notificationIdNull
        });
      } catch (U) {
        if (P)
          return u(U);
        throw U;
      }
      if (!P)
        return A;
    }
    let N;
    try {
      N = JSON.stringify(A, this.options.replacer);
    } catch (P) {
      return u(P);
    }
    return this.callServer(N, function(P, U) {
      h._parseResponse(P, U, u);
    }), A;
  }, e.prototype._parseResponse = function(n, i, s) {
    if (n) {
      s(n);
      return;
    }
    if (!i)
      return s();
    let u;
    try {
      u = JSON.parse(i, this.options.reviver);
    } catch (h) {
      return s(h);
    }
    if (s.length === 3)
      if (Array.isArray(u)) {
        const h = function(E) {
          return typeof E.error < "u";
        }, A = function(E) {
          return !h(E);
        };
        return s(null, u.filter(h), u.filter(A));
      } else
        return s(null, u.error, u.result);
    s(null, u);
  }, Ms;
}
var Yf = qf();
const Zf = /* @__PURE__ */ Ei(Yf);
var Gf = class extends eo {
  /** Instantiate a WebSocket class
  * @constructor
  * @param {String} address - url to a websocket server
  * @param {(Object)} options - websocket options
  * @param {(String|Array)} protocols - a list of protocols
  * @return {WebSocketBrowserImpl} - returns a WebSocket instance
  */
  constructor(t, e, n) {
    super();
    de(this, "socket");
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
function Jf(r, t) {
  return new Gf(r, t);
}
var Kf = class {
  encode(r) {
    return JSON.stringify(r);
  }
  decode(r) {
    return JSON.parse(r);
  }
}, Vf = class extends eo {
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
    max_reconnects: u = 5,
    ...h
  } = {}, A, E) {
    super();
    de(this, "address");
    de(this, "rpc_id");
    de(this, "queue");
    de(this, "options");
    de(this, "autoconnect");
    de(this, "ready");
    de(this, "reconnect");
    de(this, "reconnect_timer_id");
    de(this, "reconnect_interval");
    de(this, "max_reconnects");
    de(this, "rest_options");
    de(this, "current_reconnects");
    de(this, "generate_request_id");
    de(this, "socket");
    de(this, "webSocketFactory");
    de(this, "dataPack");
    this.webSocketFactory = t, this.queue = {}, this.rpc_id = 0, this.address = e, this.autoconnect = n, this.ready = !1, this.reconnect = i, this.reconnect_timer_id = void 0, this.reconnect_interval = s, this.max_reconnects = u, this.rest_options = h, this.current_reconnects = 0, this.generate_request_id = A || (() => typeof this.rpc_id == "number" ? ++this.rpc_id : Number(this.rpc_id) + 1), E ? this.dataPack = E : this.dataPack = new Kf(), this.autoconnect && this._connect(this.address, {
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
    return !i && typeof n == "object" && (i = n, n = null), new Promise((s, u) => {
      if (!this.ready) return u(new Error("socket not ready"));
      const h = this.generate_request_id(t, e), A = {
        jsonrpc: "2.0",
        method: t,
        params: e || void 0,
        id: h
      };
      this.socket.send(this.dataPack.encode(A), i, (E) => {
        if (E) return u(E);
        this.queue[h] = { promise: [s, u] }, n && (this.queue[h].timeout = setTimeout(() => {
          delete this.queue[h], u(new Error("reply timeout"));
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
      this.socket.send(this.dataPack.encode(s), (u) => {
        if (u) return i(u);
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
      n instanceof ArrayBuffer && (n = pt.Buffer.from(n).toString());
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
class Sc extends Xa {
  constructor(t, e) {
    super(), this.finished = !1, this.destroyed = !1, Al(t);
    const n = co(e);
    if (this.iHash = t.create(), typeof this.iHash.update != "function")
      throw new Error("Expected instance of class which extends utils.Hash");
    this.blockLen = this.iHash.blockLen, this.outputLen = this.iHash.outputLen;
    const i = this.blockLen, s = new Uint8Array(i);
    s.set(n.length > i ? t.create().update(n).digest() : n);
    for (let u = 0; u < s.length; u++)
      s[u] ^= 54;
    this.iHash.update(s), this.oHash = t.create();
    for (let u = 0; u < s.length; u++)
      s[u] ^= 106;
    this.oHash.update(s), s.fill(0);
  }
  update(t) {
    return ui(this), this.iHash.update(t), this;
  }
  digestInto(t) {
    ui(this), vi(t, this.outputLen), this.finished = !0, this.iHash.digestInto(t), this.oHash.update(t), this.oHash.digestInto(t), this.destroy();
  }
  digest() {
    const t = new Uint8Array(this.oHash.outputLen);
    return this.digestInto(t), t;
  }
  _cloneInto(t) {
    t || (t = Object.create(Object.getPrototypeOf(this), {}));
    const { oHash: e, iHash: n, finished: i, destroyed: s, blockLen: u, outputLen: h } = this;
    return t = t, t.finished = i, t.destroyed = s, t.blockLen = u, t.outputLen = h, t.oHash = e._cloneInto(t.oHash), t.iHash = n._cloneInto(t.iHash), t;
  }
  destroy() {
    this.destroyed = !0, this.oHash.destroy(), this.iHash.destroy();
  }
}
const Mc = (r, t, e) => new Sc(r, t).update(e).digest();
Mc.create = (r, t) => new Sc(r, t);
/*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */
function ya(r) {
  r.lowS !== void 0 && Rn("lowS", r.lowS), r.prehash !== void 0 && Rn("prehash", r.prehash);
}
function Xf(r) {
  const t = fo(r);
  Pr(t, {
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
class $f extends Error {
  constructor(t = "") {
    super(t);
  }
}
const ln = {
  // asn.1 DER encoding utils
  Err: $f,
  // Basic building block is TLV (Tag-Length-Value)
  _tlv: {
    encode: (r, t) => {
      const { Err: e } = ln;
      if (r < 0 || r > 256)
        throw new e("tlv.encode: wrong tag");
      if (t.length & 1)
        throw new e("tlv.encode: unpadded data");
      const n = t.length / 2, i = Gr(n);
      if (i.length / 2 & 128)
        throw new e("tlv.encode: long form length too big");
      const s = n > 127 ? Gr(i.length / 2 | 128) : "";
      return Gr(r) + s + i + t;
    },
    // v - value, l - left bytes (unparsed)
    decode(r, t) {
      const { Err: e } = ln;
      let n = 0;
      if (r < 0 || r > 256)
        throw new e("tlv.encode: wrong tag");
      if (t.length < 2 || t[n++] !== r)
        throw new e("tlv.decode: wrong tlv");
      const i = t[n++], s = !!(i & 128);
      let u = 0;
      if (!s)
        u = i;
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
        for (const S of E)
          u = u << 8 | S;
        if (n += A, u < 128)
          throw new e("tlv.decode(long): not minimal encoding");
      }
      const h = t.subarray(n, n + u);
      if (h.length !== u)
        throw new e("tlv.decode: wrong value length");
      return { v: h, l: t.subarray(n + u) };
    }
  },
  // https://crypto.stackexchange.com/a/57734 Leftmost bit of first byte is 'negative' flag,
  // since we always use positive integers here. It must always be empty:
  // - add zero byte if exists
  // - if next byte doesn't have a flag, leading zero is not allowed (minimal encoding)
  _int: {
    encode(r) {
      const { Err: t } = ln;
      if (r < fn)
        throw new t("integer: negative integers are not allowed");
      let e = Gr(r);
      if (Number.parseInt(e[0], 16) & 8 && (e = "00" + e), e.length & 1)
        throw new t("unexpected DER parsing assertion: unpadded hex");
      return e;
    },
    decode(r) {
      const { Err: t } = ln;
      if (r[0] & 128)
        throw new t("invalid signature integer: negative");
      if (r[0] === 0 && !(r[1] & 128))
        throw new t("invalid signature integer: unnecessary leading zero");
      return Wn(r);
    }
  },
  toSig(r) {
    const { Err: t, _int: e, _tlv: n } = ln, i = Ae("signature", r), { v: s, l: u } = n.decode(48, i);
    if (u.length)
      throw new t("invalid signature: left bytes after parsing");
    const { v: h, l: A } = n.decode(2, s), { v: E, l: S } = n.decode(2, A);
    if (S.length)
      throw new t("invalid signature: left bytes after parsing");
    return { r: e.decode(h), s: e.decode(E) };
  },
  hexFromSig(r) {
    const { _tlv: t, _int: e } = ln, n = t.encode(2, e.encode(r.r)), i = t.encode(2, e.encode(r.s)), s = n + i;
    return t.encode(48, s);
  }
}, fn = BigInt(0), we = BigInt(1);
BigInt(2);
const ma = BigInt(3);
BigInt(4);
function t0(r) {
  const t = Xf(r), { Fp: e } = t, n = Mi(t.n, t.nBitLength), i = t.toBytes || ((O, L, Y) => {
    const Q = L.toAffine();
    return hr(Uint8Array.from([4]), e.toBytes(Q.x), e.toBytes(Q.y));
  }), s = t.fromBytes || ((O) => {
    const L = O.subarray(1), Y = e.fromBytes(L.subarray(0, e.BYTES)), Q = e.fromBytes(L.subarray(e.BYTES, 2 * e.BYTES));
    return { x: Y, y: Q };
  });
  function u(O) {
    const { a: L, b: Y } = t, Q = e.sqr(O), q = e.mul(Q, O);
    return e.add(e.add(q, e.mul(O, L)), Y);
  }
  if (!e.eql(e.sqr(t.Gy), u(t.Gx)))
    throw new Error("bad generator point: equation left != right");
  function h(O) {
    return ho(O, we, t.n);
  }
  function A(O) {
    const { allowedPrivateKeyLengths: L, nByteLength: Y, wrapPrivateKey: Q, n: q } = t;
    if (L && typeof O != "bigint") {
      if (ur(O) && (O = lr(O)), typeof O != "string" || !L.includes(O.length))
        throw new Error("invalid private key");
      O = O.padStart(Y * 2, "0");
    }
    let K;
    try {
      K = typeof O == "bigint" ? O : Wn(Ae("private key", O, Y));
    } catch {
      throw new Error("invalid private key, expected hex or " + Y + " bytes, got " + typeof O);
    }
    return Q && (K = Qt(K, q)), Ge("private key", K, we, q), K;
  }
  function E(O) {
    if (!(O instanceof P))
      throw new Error("ProjectivePoint expected");
  }
  const S = fi((O, L) => {
    const { px: Y, py: Q, pz: q } = O;
    if (e.eql(q, e.ONE))
      return { x: Y, y: Q };
    const K = O.is0();
    L == null && (L = K ? e.ONE : e.inv(q));
    const V = e.mul(Y, L), X = e.mul(Q, L), nt = e.mul(q, L);
    if (K)
      return { x: e.ZERO, y: e.ZERO };
    if (!e.eql(nt, e.ONE))
      throw new Error("invZ was invalid");
    return { x: V, y: X };
  }), N = fi((O) => {
    if (O.is0()) {
      if (t.allowInfinityPoint && !e.is0(O.py))
        return;
      throw new Error("bad point: ZERO");
    }
    const { x: L, y: Y } = O.toAffine();
    if (!e.isValid(L) || !e.isValid(Y))
      throw new Error("bad point: x or y not FE");
    const Q = e.sqr(Y), q = u(L);
    if (!e.eql(Q, q))
      throw new Error("bad point: equation left != right");
    if (!O.isTorsionFree())
      throw new Error("bad point: not in prime-order subgroup");
    return !0;
  });
  class P {
    constructor(L, Y, Q) {
      if (L == null || !e.isValid(L))
        throw new Error("x required");
      if (Y == null || !e.isValid(Y))
        throw new Error("y required");
      if (Q == null || !e.isValid(Q))
        throw new Error("z required");
      this.px = L, this.py = Y, this.pz = Q, Object.freeze(this);
    }
    // Does not validate if the point is on-curve.
    // Use fromHex instead, or call assertValidity() later.
    static fromAffine(L) {
      const { x: Y, y: Q } = L || {};
      if (!L || !e.isValid(Y) || !e.isValid(Q))
        throw new Error("invalid affine point");
      if (L instanceof P)
        throw new Error("projective point not allowed");
      const q = (K) => e.eql(K, e.ZERO);
      return q(Y) && q(Q) ? P.ZERO : new P(Y, Q, e.ONE);
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
    static normalizeZ(L) {
      const Y = e.invertBatch(L.map((Q) => Q.pz));
      return L.map((Q, q) => Q.toAffine(Y[q])).map(P.fromAffine);
    }
    /**
     * Converts hash string or Uint8Array to Point.
     * @param hex short/long ECDSA hex
     */
    static fromHex(L) {
      const Y = P.fromAffine(s(Ae("pointHex", L)));
      return Y.assertValidity(), Y;
    }
    // Multiplies generator point by privateKey.
    static fromPrivateKey(L) {
      return P.BASE.multiply(A(L));
    }
    // Multiscalar Multiplication
    static msm(L, Y) {
      return hc(P, n, L, Y);
    }
    // "Private method", don't use it directly
    _setWindowSize(L) {
      F.setWindowSize(this, L);
    }
    // A point on curve is valid if it conforms to equation.
    assertValidity() {
      N(this);
    }
    hasEvenY() {
      const { y: L } = this.toAffine();
      if (e.isOdd)
        return !e.isOdd(L);
      throw new Error("Field doesn't support isOdd");
    }
    /**
     * Compare one point to another.
     */
    equals(L) {
      E(L);
      const { px: Y, py: Q, pz: q } = this, { px: K, py: V, pz: X } = L, nt = e.eql(e.mul(Y, X), e.mul(K, q)), C = e.eql(e.mul(Q, X), e.mul(V, q));
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
      const { a: L, b: Y } = t, Q = e.mul(Y, ma), { px: q, py: K, pz: V } = this;
      let X = e.ZERO, nt = e.ZERO, C = e.ZERO, v = e.mul(q, q), x = e.mul(K, K), D = e.mul(V, V), R = e.mul(q, K);
      return R = e.add(R, R), C = e.mul(q, V), C = e.add(C, C), X = e.mul(L, C), nt = e.mul(Q, D), nt = e.add(X, nt), X = e.sub(x, nt), nt = e.add(x, nt), nt = e.mul(X, nt), X = e.mul(R, X), C = e.mul(Q, C), D = e.mul(L, D), R = e.sub(v, D), R = e.mul(L, R), R = e.add(R, C), C = e.add(v, v), v = e.add(C, v), v = e.add(v, D), v = e.mul(v, R), nt = e.add(nt, v), D = e.mul(K, V), D = e.add(D, D), v = e.mul(D, R), X = e.sub(X, v), C = e.mul(D, x), C = e.add(C, C), C = e.add(C, C), new P(X, nt, C);
    }
    // Renes-Costello-Batina exception-free addition formula.
    // There is 30% faster Jacobian formula, but it is not complete.
    // https://eprint.iacr.org/2015/1060, algorithm 1
    // Cost: 12M + 0S + 3*a + 3*b3 + 23add.
    add(L) {
      E(L);
      const { px: Y, py: Q, pz: q } = this, { px: K, py: V, pz: X } = L;
      let nt = e.ZERO, C = e.ZERO, v = e.ZERO;
      const x = t.a, D = e.mul(t.b, ma);
      let R = e.mul(Y, K), b = e.mul(Q, V), l = e.mul(q, X), d = e.add(Y, Q), p = e.add(K, V);
      d = e.mul(d, p), p = e.add(R, b), d = e.sub(d, p), p = e.add(Y, q);
      let m = e.add(K, X);
      return p = e.mul(p, m), m = e.add(R, l), p = e.sub(p, m), m = e.add(Q, q), nt = e.add(V, X), m = e.mul(m, nt), nt = e.add(b, l), m = e.sub(m, nt), v = e.mul(x, p), nt = e.mul(D, l), v = e.add(nt, v), nt = e.sub(b, v), v = e.add(b, v), C = e.mul(nt, v), b = e.add(R, R), b = e.add(b, R), l = e.mul(x, l), p = e.mul(D, p), b = e.add(b, l), l = e.sub(R, l), l = e.mul(x, l), p = e.add(p, l), R = e.mul(b, p), C = e.add(C, R), R = e.mul(m, p), nt = e.mul(d, nt), nt = e.sub(nt, R), R = e.mul(d, b), v = e.mul(m, v), v = e.add(v, R), new P(nt, C, v);
    }
    subtract(L) {
      return this.add(L.negate());
    }
    is0() {
      return this.equals(P.ZERO);
    }
    wNAF(L) {
      return F.wNAFCached(this, L, P.normalizeZ);
    }
    /**
     * Non-constant-time multiplication. Uses double-and-add algorithm.
     * It's faster, but should only be used when you don't care about
     * an exposed private key e.g. sig verification, which works over *public* keys.
     */
    multiplyUnsafe(L) {
      const { endo: Y, n: Q } = t;
      Ge("scalar", L, fn, Q);
      const q = P.ZERO;
      if (L === fn)
        return q;
      if (this.is0() || L === we)
        return this;
      if (!Y || F.hasPrecomputes(this))
        return F.wNAFCachedUnsafe(this, L, P.normalizeZ);
      let { k1neg: K, k1: V, k2neg: X, k2: nt } = Y.splitScalar(L), C = q, v = q, x = this;
      for (; V > fn || nt > fn; )
        V & we && (C = C.add(x)), nt & we && (v = v.add(x)), x = x.double(), V >>= we, nt >>= we;
      return K && (C = C.negate()), X && (v = v.negate()), v = new P(e.mul(v.px, Y.beta), v.py, v.pz), C.add(v);
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
    multiply(L) {
      const { endo: Y, n: Q } = t;
      Ge("scalar", L, we, Q);
      let q, K;
      if (Y) {
        const { k1neg: V, k1: X, k2neg: nt, k2: C } = Y.splitScalar(L);
        let { p: v, f: x } = this.wNAF(X), { p: D, f: R } = this.wNAF(C);
        v = F.constTimeNegate(V, v), D = F.constTimeNegate(nt, D), D = new P(e.mul(D.px, Y.beta), D.py, D.pz), q = v.add(D), K = x.add(R);
      } else {
        const { p: V, f: X } = this.wNAF(L);
        q = V, K = X;
      }
      return P.normalizeZ([q, K])[0];
    }
    /**
     * Efficiently calculate `aP + bQ`. Unsafe, can expose private key, if used incorrectly.
     * Not using Strauss-Shamir trick: precomputation tables are faster.
     * The trick could be useful if both P and Q are not G (not in our case).
     * @returns non-zero affine point
     */
    multiplyAndAddUnsafe(L, Y, Q) {
      const q = P.BASE, K = (X, nt) => nt === fn || nt === we || !X.equals(q) ? X.multiplyUnsafe(nt) : X.multiply(nt), V = K(this, Y).add(K(L, Q));
      return V.is0() ? void 0 : V;
    }
    // Converts Projective point to affine (x, y) coordinates.
    // Can accept precomputed Z^-1 - for example, from invertBatch.
    // (x, y, z) ∋ (x=x/z, y=y/z)
    toAffine(L) {
      return S(this, L);
    }
    isTorsionFree() {
      const { h: L, isTorsionFree: Y } = t;
      if (L === we)
        return !0;
      if (Y)
        return Y(P, this);
      throw new Error("isTorsionFree() has not been declared for the elliptic curve");
    }
    clearCofactor() {
      const { h: L, clearCofactor: Y } = t;
      return L === we ? this : Y ? Y(P, this) : this.multiplyUnsafe(t.h);
    }
    toRawBytes(L = !0) {
      return Rn("isCompressed", L), this.assertValidity(), i(P, this, L);
    }
    toHex(L = !0) {
      return Rn("isCompressed", L), lr(this.toRawBytes(L));
    }
  }
  P.BASE = new P(t.Gx, t.Gy, e.ONE), P.ZERO = new P(e.ZERO, e.ONE, e.ZERO);
  const U = t.nBitLength, F = lc(P, t.endo ? Math.ceil(U / 2) : U);
  return {
    CURVE: t,
    ProjectivePoint: P,
    normPrivateKeyToScalar: A,
    weierstrassEquation: u,
    isWithinCurveOrder: h
  };
}
function e0(r) {
  const t = fo(r);
  return Pr(t, {
    hash: "hash",
    hmac: "function",
    randomBytes: "function"
  }, {
    bits2int: "function",
    bits2int_modN: "function",
    lowS: "boolean"
  }), Object.freeze({ lowS: !0, ...t });
}
function n0(r) {
  const t = e0(r), { Fp: e, n } = t, i = e.BYTES + 1, s = 2 * e.BYTES + 1;
  function u(l) {
    return Qt(l, n);
  }
  function h(l) {
    return js(l, n);
  }
  const { ProjectivePoint: A, normPrivateKeyToScalar: E, weierstrassEquation: S, isWithinCurveOrder: N } = t0({
    ...t,
    toBytes(l, d, p) {
      const m = d.toAffine(), w = e.toBytes(m.x), B = hr;
      return Rn("isCompressed", p), p ? B(Uint8Array.from([d.hasEvenY() ? 2 : 3]), w) : B(Uint8Array.from([4]), w, e.toBytes(m.y));
    },
    fromBytes(l) {
      const d = l.length, p = l[0], m = l.subarray(1);
      if (d === i && (p === 2 || p === 3)) {
        const w = Wn(m);
        if (!ho(w, we, e.ORDER))
          throw new Error("Point is not on curve");
        const B = S(w);
        let z;
        try {
          z = e.sqrt(B);
        } catch (g) {
          const M = g instanceof Error ? ": " + g.message : "";
          throw new Error("Point is not on curve" + M);
        }
        const I = (z & we) === we;
        return (p & 1) === 1 !== I && (z = e.neg(z)), { x: w, y: z };
      } else if (d === s && p === 4) {
        const w = e.fromBytes(m.subarray(0, e.BYTES)), B = e.fromBytes(m.subarray(e.BYTES, 2 * e.BYTES));
        return { x: w, y: B };
      } else {
        const w = i, B = s;
        throw new Error("invalid Point, expected length of " + w + ", or uncompressed " + B + ", got " + d);
      }
    }
  }), P = (l) => lr(Dr(l, t.nByteLength));
  function U(l) {
    const d = n >> we;
    return l > d;
  }
  function F(l) {
    return U(l) ? u(-l) : l;
  }
  const O = (l, d, p) => Wn(l.slice(d, p));
  class L {
    constructor(d, p, m) {
      Ge("r", d, we, n), Ge("s", p, we, n), this.r = d, this.s = p, m != null && (this.recovery = m), Object.freeze(this);
    }
    // pair (bytes of r, bytes of s)
    static fromCompact(d) {
      const p = t.nByteLength;
      return d = Ae("compactSignature", d, p * 2), new L(O(d, 0, p), O(d, p, 2 * p));
    }
    // DER encoded ECDSA signature
    // https://bitcoin.stackexchange.com/questions/57644/what-are-the-parts-of-a-bitcoin-transaction-input-script
    static fromDER(d) {
      const { r: p, s: m } = ln.toSig(Ae("DER", d));
      return new L(p, m);
    }
    /**
     * @todo remove
     * @deprecated
     */
    assertValidity() {
    }
    addRecoveryBit(d) {
      return new L(this.r, this.s, d);
    }
    recoverPublicKey(d) {
      const { r: p, s: m, recovery: w } = this, B = X(Ae("msgHash", d));
      if (w == null || ![0, 1, 2, 3].includes(w))
        throw new Error("recovery id invalid");
      const z = w === 2 || w === 3 ? p + t.n : p;
      if (z >= e.ORDER)
        throw new Error("recovery id 2 or 3 invalid");
      const I = w & 1 ? "03" : "02", f = A.fromHex(I + P(z)), g = h(z), M = u(-B * g), T = u(m * g), W = A.BASE.multiplyAndAddUnsafe(f, M, T);
      if (!W)
        throw new Error("point at infinify");
      return W.assertValidity(), W;
    }
    // Signatures should be low-s, to prevent malleability.
    hasHighS() {
      return U(this.s);
    }
    normalizeS() {
      return this.hasHighS() ? new L(this.r, u(-this.s), this.recovery) : this;
    }
    // DER-encoded
    toDERRawBytes() {
      return li(this.toDERHex());
    }
    toDERHex() {
      return ln.hexFromSig({ r: this.r, s: this.s });
    }
    // padded bytes of r, then padded bytes of s
    toCompactRawBytes() {
      return li(this.toCompactHex());
    }
    toCompactHex() {
      return P(this.r) + P(this.s);
    }
  }
  const Y = {
    isValidPrivateKey(l) {
      try {
        return E(l), !0;
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
      const l = ac(t.n);
      return uh(t.randomBytes(l), t.n);
    },
    /**
     * Creates precompute table for an arbitrary EC point. Makes point "cached".
     * Allows to massively speed-up `point.multiply(scalar)`.
     * @returns cached point
     * @example
     * const fast = utils.precompute(8, ProjectivePoint.fromHex(someonesPubKey));
     * fast.multiply(privKey); // much faster ECDH now
     */
    precompute(l = 8, d = A.BASE) {
      return d._setWindowSize(l), d.multiply(BigInt(3)), d;
    }
  };
  function Q(l, d = !0) {
    return A.fromPrivateKey(l).toRawBytes(d);
  }
  function q(l) {
    const d = ur(l), p = typeof l == "string", m = (d || p) && l.length;
    return d ? m === i || m === s : p ? m === 2 * i || m === 2 * s : l instanceof A;
  }
  function K(l, d, p = !0) {
    if (q(l))
      throw new Error("first arg must be private key");
    if (!q(d))
      throw new Error("second arg must be public key");
    return A.fromHex(d).multiply(E(l)).toRawBytes(p);
  }
  const V = t.bits2int || function(l) {
    if (l.length > 8192)
      throw new Error("input is too large");
    const d = Wn(l), p = l.length * 8 - t.nBitLength;
    return p > 0 ? d >> BigInt(p) : d;
  }, X = t.bits2int_modN || function(l) {
    return u(V(l));
  }, nt = Si(t.nBitLength);
  function C(l) {
    return Ge("num < 2^" + t.nBitLength, l, fn, nt), Dr(l, t.nByteLength);
  }
  function v(l, d, p = x) {
    if (["recovered", "canonical"].some((tt) => tt in p))
      throw new Error("sign() legacy options not supported");
    const { hash: m, randomBytes: w } = t;
    let { lowS: B, prehash: z, extraEntropy: I } = p;
    B == null && (B = !0), l = Ae("msgHash", l), ya(p), z && (l = Ae("prehashed msgHash", m(l)));
    const f = X(l), g = E(d), M = [C(g), C(f)];
    if (I != null && I !== !1) {
      const tt = I === !0 ? w(e.BYTES) : I;
      M.push(Ae("extraEntropy", tt));
    }
    const T = hr(...M), W = f;
    function J(tt) {
      const st = V(tt);
      if (!N(st))
        return;
      const xt = h(st), gt = A.BASE.multiply(st).toAffine(), bt = u(gt.x);
      if (bt === fn)
        return;
      const Et = u(xt * u(W + bt * g));
      if (Et === fn)
        return;
      let ht = (gt.x === bt ? 0 : 2) | Number(gt.y & we), wt = Et;
      return B && U(Et) && (wt = F(Et), ht ^= 1), new L(bt, wt, ht);
    }
    return { seed: T, k2sig: J };
  }
  const x = { lowS: t.lowS, prehash: !1 }, D = { lowS: t.lowS, prehash: !1 };
  function R(l, d, p = x) {
    const { seed: m, k2sig: w } = v(l, d, p), B = t;
    return Xl(B.hash.outputLen, B.nByteLength, B.hmac)(m, w);
  }
  A.BASE._setWindowSize(8);
  function b(l, d, p, m = D) {
    const w = l;
    d = Ae("msgHash", d), p = Ae("publicKey", p);
    const { lowS: B, prehash: z, format: I } = m;
    if (ya(m), "strict" in m)
      throw new Error("options.strict was renamed to lowS");
    if (I !== void 0 && I !== "compact" && I !== "der")
      throw new Error("format must be compact or der");
    const f = typeof w == "string" || ur(w), g = !f && !I && typeof w == "object" && w !== null && typeof w.r == "bigint" && typeof w.s == "bigint";
    if (!f && !g)
      throw new Error("invalid signature, expected Uint8Array, hex string or Signature instance");
    let M, T;
    try {
      if (g && (M = new L(w.r, w.s)), f) {
        try {
          I !== "compact" && (M = L.fromDER(w));
        } catch (ht) {
          if (!(ht instanceof ln.Err))
            throw ht;
        }
        !M && I !== "der" && (M = L.fromCompact(w));
      }
      T = A.fromHex(p);
    } catch {
      return !1;
    }
    if (!M || B && M.hasHighS())
      return !1;
    z && (d = t.hash(d));
    const { r: W, s: J } = M, tt = X(d), st = h(J), xt = u(tt * st), gt = u(W * st), bt = A.BASE.multiplyAndAddUnsafe(T, xt, gt)?.toAffine();
    return bt ? u(bt.x) === W : !1;
  }
  return {
    CURVE: t,
    getPublicKey: Q,
    getSharedSecret: K,
    sign: R,
    verify: b,
    ProjectivePoint: A,
    Signature: L,
    utils: Y
  };
}
/*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */
function r0(r) {
  return {
    hash: r,
    hmac: (t, ...e) => Mc(r, t, yl(...e)),
    randomBytes: tc
  };
}
function i0(r, t) {
  const e = (n) => n0({ ...r, ...r0(n) });
  return { ...e(t), create: e };
}
/*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */
const xc = BigInt("0xfffffffffffffffffffffffffffffffffffffffffffffffffffffffefffffc2f"), ba = BigInt("0xfffffffffffffffffffffffffffffffebaaedce6af48a03bbfd25e8cd0364141"), s0 = BigInt(1), Fs = BigInt(2), Ea = (r, t) => (r + t / Fs) / t;
function o0(r) {
  const t = xc, e = BigInt(3), n = BigInt(6), i = BigInt(11), s = BigInt(22), u = BigInt(23), h = BigInt(44), A = BigInt(88), E = r * r * r % t, S = E * E * r % t, N = Yt(S, e, t) * S % t, P = Yt(N, e, t) * S % t, U = Yt(P, Fs, t) * E % t, F = Yt(U, i, t) * U % t, O = Yt(F, s, t) * F % t, L = Yt(O, h, t) * O % t, Y = Yt(L, A, t) * L % t, Q = Yt(Y, h, t) * O % t, q = Yt(Q, e, t) * S % t, K = Yt(q, u, t) * F % t, V = Yt(K, n, t) * E % t, X = Yt(V, Fs, t);
  if (!Qs.eql(Qs.sqr(X), r))
    throw new Error("Cannot find square root");
  return X;
}
const Qs = Mi(xc, void 0, void 0, { sqrt: o0 }), a0 = i0({
  a: BigInt(0),
  b: BigInt(7),
  Fp: Qs,
  n: ba,
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
      const t = ba, e = BigInt("0x3086d221a7d46bcde86c90e49284eb15"), n = -s0 * BigInt("0xe4437ed6010e88286f547fa90abfe4c3"), i = BigInt("0x114ca50f7a8e2f3f657c1108d9d44cfd8"), s = e, u = BigInt("0x100000000000000000000000000000000"), h = Ea(s * r, t), A = Ea(-n * r, t);
      let E = Qt(r - h * e - A * i, t), S = Qt(-h * n - A * s, t);
      const N = E > u, P = S > u;
      if (N && (E = t - E), P && (S = t - S), E > u || S > u)
        throw new Error("splitScalar: Endomorphism failed, k=" + r);
      return { k1neg: N, k1: E, k2neg: P, k2: S };
    }
  }
}, Sl);
BigInt(0);
function Ia(r) {
  try {
    return Ao.ExtendedPoint.fromHex(r), !0;
  } catch {
    return !1;
  }
}
const Bc = (r, t) => Ao.sign(r, t.slice(0, 32)), c0 = Ao.verify, dr = (r) => pt.Buffer.isBuffer(r) ? r : r instanceof Uint8Array ? pt.Buffer.from(r.buffer, r.byteOffset, r.byteLength) : pt.Buffer.from(r);
class u0 {
  constructor(t) {
    Object.assign(this, t);
  }
  encode() {
    return pt.Buffer.from(ys.serialize(ri, this));
  }
  static decode(t) {
    return ys.deserialize(ri, this, t);
  }
  static decodeUnchecked(t) {
    return ys.deserializeUnchecked(ri, this, t);
  }
}
const ri = /* @__PURE__ */ new Map();
var Cc;
const l0 = 32, On = 32;
function h0(r) {
  return r._bn !== void 0;
}
let va = 1;
class dt extends u0 {
  /**
   * Create a new PublicKey object
   * @param value ed25519 public key as buffer or base-58 encoded string
   */
  constructor(t) {
    if (super({}), this._bn = void 0, h0(t))
      this._bn = t._bn;
    else {
      if (typeof t == "string") {
        const e = Ie.decode(t);
        if (e.length != On)
          throw new Error("Invalid public key input");
        this._bn = new oa(e);
      } else
        this._bn = new oa(t);
      if (this._bn.byteLength() > On)
        throw new Error("Invalid public key input");
    }
  }
  /**
   * Returns a unique PublicKey for tests and benchmarks using a counter
   */
  static unique() {
    const t = new dt(va);
    return va += 1, new dt(t.toBuffer());
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
    return Ie.encode(this.toBytes());
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
    const t = this._bn.toArrayLike(pt.Buffer);
    if (t.length === On)
      return t;
    const e = pt.Buffer.alloc(32);
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
    const i = pt.Buffer.concat([t.toBuffer(), pt.Buffer.from(e), n.toBuffer()]), s = ha(i);
    return new dt(s);
  }
  /**
   * Derive a program address from seeds and a program ID.
   */
  /* eslint-disable require-await */
  static createProgramAddressSync(t, e) {
    let n = pt.Buffer.alloc(0);
    t.forEach(function(s) {
      if (s.length > l0)
        throw new TypeError("Max seed length exceeded");
      n = pt.Buffer.concat([n, dr(s)]);
    }), n = pt.Buffer.concat([n, e.toBuffer(), pt.Buffer.from("ProgramDerivedAddress")]);
    const i = ha(n);
    if (Ia(i))
      throw new Error("Invalid seeds, address must fall off the curve");
    return new dt(i);
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
        const s = t.concat(pt.Buffer.from([n]));
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
    const e = new dt(t);
    return Ia(e.toBytes());
  }
}
Cc = dt;
dt.default = new Cc("11111111111111111111111111111111");
ri.set(dt, {
  kind: "struct",
  fields: [["_bn", "u256"]]
});
new dt("BPFLoader1111111111111111111111111111111111");
const ar = 1232, Eo = 127, yi = 64;
class kc extends Error {
  constructor(t) {
    super(`Signature ${t} has expired: block height exceeded.`), this.signature = void 0, this.signature = t;
  }
}
Object.defineProperty(kc.prototype, "name", {
  value: "TransactionExpiredBlockheightExceededError"
});
class Nc extends Error {
  constructor(t, e) {
    super(`Transaction was not confirmed in ${e.toFixed(2)} seconds. It is unknown if it succeeded or failed. Check signature ${t} using the Solana Explorer or CLI tools.`), this.signature = void 0, this.signature = t;
  }
}
Object.defineProperty(Nc.prototype, "name", {
  value: "TransactionExpiredTimeoutError"
});
class Mr extends Error {
  constructor(t) {
    super(`Signature ${t} has expired: the nonce is no longer valid.`), this.signature = void 0, this.signature = t;
  }
}
Object.defineProperty(Mr.prototype, "name", {
  value: "TransactionExpiredNonceInvalidError"
});
class mi {
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
    this.keySegments().flat().forEach((s, u) => {
      n.set(s.toBase58(), u);
    });
    const i = (s) => {
      const u = n.get(s.toBase58());
      if (u === void 0) throw new Error("Encountered an unknown instruction account key during compilation");
      return u;
    };
    return t.map((s) => ({
      programIdIndex: i(s.programId),
      accountKeyIndexes: s.keys.map((u) => i(u.pubkey)),
      data: s.data
    }));
  }
}
const Mt = (r = "publicKey") => _.blob(32, r), f0 = (r = "signature") => _.blob(64, r), nr = (r = "string") => {
  const t = _.struct([_.u32("length"), _.u32("lengthPadding"), _.blob(_.offset(_.u32(), -8), "chars")], r), e = t.decode.bind(t), n = t.encode.bind(t), i = t;
  return i.decode = (s, u) => e(s, u).chars.toString(), i.encode = (s, u, h) => {
    const A = {
      chars: pt.Buffer.from(s, "utf8")
    };
    return n(A, u, h);
  }, i.alloc = (s) => _.u32().span + _.u32().span + pt.Buffer.from(s, "utf8").length, i;
}, d0 = (r = "authorized") => _.struct([Mt("staker"), Mt("withdrawer")], r), g0 = (r = "lockup") => _.struct([_.ns64("unixTimestamp"), _.ns64("epoch"), Mt("custodian")], r), A0 = (r = "voteInit") => _.struct([Mt("nodePubkey"), Mt("authorizedVoter"), Mt("authorizedWithdrawer"), _.u8("commission")], r), p0 = (r = "voteAuthorizeWithSeedArgs") => _.struct([_.u32("voteAuthorizationType"), Mt("currentAuthorityDerivedKeyOwnerPubkey"), nr("currentAuthorityDerivedKeySeed"), Mt("newAuthorized")], r);
function Pe(r) {
  let t = 0, e = 0;
  for (; ; ) {
    let n = r.shift();
    if (t |= (n & 127) << e * 7, e += 1, !(n & 128))
      break;
  }
  return t;
}
function Fe(r, t) {
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
class Ni {
  constructor(t, e) {
    this.payer = void 0, this.keyMetaMap = void 0, this.payer = t, this.keyMetaMap = e;
  }
  static compile(t, e) {
    const n = /* @__PURE__ */ new Map(), i = (u) => {
      const h = u.toBase58();
      let A = n.get(h);
      return A === void 0 && (A = {
        isSigner: !1,
        isWritable: !1,
        isInvoked: !1
      }, n.set(h, A)), A;
    }, s = i(e);
    s.isSigner = !0, s.isWritable = !0;
    for (const u of t) {
      i(u.programId).isInvoked = !0;
      for (const h of u.keys) {
        const A = i(h.pubkey);
        A.isSigner || (A.isSigner = h.isSigner), A.isWritable || (A.isWritable = h.isWritable);
      }
    }
    return new Ni(e, n);
  }
  getMessageComponents() {
    const t = [...this.keyMetaMap.entries()];
    Ft(t.length <= 256, "Max static account keys length exceeded");
    const e = t.filter(([, A]) => A.isSigner && A.isWritable), n = t.filter(([, A]) => A.isSigner && !A.isWritable), i = t.filter(([, A]) => !A.isSigner && A.isWritable), s = t.filter(([, A]) => !A.isSigner && !A.isWritable), u = {
      numRequiredSignatures: e.length + n.length,
      numReadonlySignedAccounts: n.length,
      numReadonlyUnsignedAccounts: s.length
    };
    {
      Ft(e.length > 0, "Expected at least one writable signer key");
      const [A] = e[0];
      Ft(A === this.payer.toBase58(), "Expected first writable signer key to be the fee payer");
    }
    const h = [...e.map(([A]) => new dt(A)), ...n.map(([A]) => new dt(A)), ...i.map(([A]) => new dt(A)), ...s.map(([A]) => new dt(A))];
    return [u, h];
  }
  extractTableLookup(t) {
    const [e, n] = this.drainKeysFoundInLookupTable(t.state.addresses, (u) => !u.isSigner && !u.isInvoked && u.isWritable), [i, s] = this.drainKeysFoundInLookupTable(t.state.addresses, (u) => !u.isSigner && !u.isInvoked && !u.isWritable);
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
    for (const [s, u] of this.keyMetaMap.entries())
      if (e(u)) {
        const h = new dt(s), A = t.findIndex((E) => E.equals(h));
        A >= 0 && (Ft(A < 256, "Max lookup table index exceeded"), n.push(A), i.push(h), this.keyMetaMap.delete(s));
      }
    return [n, i];
  }
}
const Tc = "Reached end of buffer unexpectedly";
function dn(r) {
  if (r.length === 0)
    throw new Error(Tc);
  return r.shift();
}
function Qe(r, ...t) {
  const [e] = t;
  if (t.length === 2 ? e + (t[1] ?? 0) > r.length : e >= r.length)
    throw new Error(Tc);
  return r.splice(...t);
}
class pn {
  constructor(t) {
    this.header = void 0, this.accountKeys = void 0, this.recentBlockhash = void 0, this.instructions = void 0, this.indexToProgramIds = /* @__PURE__ */ new Map(), this.header = t.header, this.accountKeys = t.accountKeys.map((e) => new dt(e)), this.recentBlockhash = t.recentBlockhash, this.instructions = t.instructions, this.instructions.forEach((e) => this.indexToProgramIds.set(e.programIdIndex, this.accountKeys[e.programIdIndex]));
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
      data: Ie.decode(t.data)
    }));
  }
  get addressTableLookups() {
    return [];
  }
  getAccountKeys() {
    return new mi(this.staticAccountKeys);
  }
  static compile(t) {
    const e = Ni.compile(t.instructions, t.payerKey), [n, i] = e.getMessageComponents(), u = new mi(i).compileInstructions(t.instructions).map((h) => ({
      programIdIndex: h.programIdIndex,
      accounts: h.accountKeyIndexes,
      data: Ie.encode(h.data)
    }));
    return new pn({
      header: n,
      accountKeys: i,
      recentBlockhash: t.recentBlockhash,
      instructions: u
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
    Fe(e, t);
    const n = this.instructions.map((N) => {
      const {
        accounts: P,
        programIdIndex: U
      } = N, F = Array.from(Ie.decode(N.data));
      let O = [];
      Fe(O, P.length);
      let L = [];
      return Fe(L, F.length), {
        programIdIndex: U,
        keyIndicesCount: pt.Buffer.from(O),
        keyIndices: P,
        dataLength: pt.Buffer.from(L),
        data: F
      };
    });
    let i = [];
    Fe(i, n.length);
    let s = pt.Buffer.alloc(ar);
    pt.Buffer.from(i).copy(s);
    let u = i.length;
    n.forEach((N) => {
      const U = _.struct([_.u8("programIdIndex"), _.blob(N.keyIndicesCount.length, "keyIndicesCount"), _.seq(_.u8("keyIndex"), N.keyIndices.length, "keyIndices"), _.blob(N.dataLength.length, "dataLength"), _.seq(_.u8("userdatum"), N.data.length, "data")]).encode(N, s, u);
      u += U;
    }), s = s.slice(0, u);
    const h = _.struct([_.blob(1, "numRequiredSignatures"), _.blob(1, "numReadonlySignedAccounts"), _.blob(1, "numReadonlyUnsignedAccounts"), _.blob(e.length, "keyCount"), _.seq(Mt("key"), t, "keys"), Mt("recentBlockhash")]), A = {
      numRequiredSignatures: pt.Buffer.from([this.header.numRequiredSignatures]),
      numReadonlySignedAccounts: pt.Buffer.from([this.header.numReadonlySignedAccounts]),
      numReadonlyUnsignedAccounts: pt.Buffer.from([this.header.numReadonlyUnsignedAccounts]),
      keyCount: pt.Buffer.from(e),
      keys: this.accountKeys.map((N) => dr(N.toBytes())),
      recentBlockhash: Ie.decode(this.recentBlockhash)
    };
    let E = pt.Buffer.alloc(2048);
    const S = h.encode(A, E);
    return s.copy(E, S), E.slice(0, S + s.length);
  }
  /**
   * Decode a compiled message into a Message object.
   */
  static from(t) {
    let e = [...t];
    const n = dn(e);
    if (n !== (n & Eo))
      throw new Error("Versioned messages must be deserialized with VersionedMessage.deserialize()");
    const i = dn(e), s = dn(e), u = Pe(e);
    let h = [];
    for (let P = 0; P < u; P++) {
      const U = Qe(e, 0, On);
      h.push(new dt(pt.Buffer.from(U)));
    }
    const A = Qe(e, 0, On), E = Pe(e);
    let S = [];
    for (let P = 0; P < E; P++) {
      const U = dn(e), F = Pe(e), O = Qe(e, 0, F), L = Pe(e), Y = Qe(e, 0, L), Q = Ie.encode(pt.Buffer.from(Y));
      S.push({
        programIdIndex: U,
        accounts: O,
        data: Q
      });
    }
    const N = {
      header: {
        numRequiredSignatures: n,
        numReadonlySignedAccounts: i,
        numReadonlyUnsignedAccounts: s
      },
      recentBlockhash: Ie.encode(pt.Buffer.from(A)),
      accountKeys: h,
      instructions: S
    };
    return new pn(N);
  }
}
class Ur {
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
    return new mi(this.staticAccountKeys, e);
  }
  isAccountSigner(t) {
    return t < this.header.numRequiredSignatures;
  }
  isAccountWritable(t) {
    const e = this.header.numRequiredSignatures, n = this.staticAccountKeys.length;
    if (t >= n) {
      const i = t - n, s = this.addressTableLookups.reduce((u, h) => u + h.writableIndexes.length, 0);
      return i < s;
    } else if (t >= this.header.numRequiredSignatures) {
      const i = t - e, u = n - e - this.header.numReadonlyUnsignedAccounts;
      return i < u;
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
    const e = Ni.compile(t.instructions, t.payerKey), n = new Array(), i = {
      writable: new Array(),
      readonly: new Array()
    }, s = t.addressLookupTableAccounts || [];
    for (const S of s) {
      const N = e.extractTableLookup(S);
      if (N !== void 0) {
        const [P, {
          writable: U,
          readonly: F
        }] = N;
        n.push(P), i.writable.push(...U), i.readonly.push(...F);
      }
    }
    const [u, h] = e.getMessageComponents(), E = new mi(h, i).compileInstructions(t.instructions);
    return new Ur({
      header: u,
      staticAccountKeys: h,
      recentBlockhash: t.recentBlockhash,
      compiledInstructions: E,
      addressTableLookups: n
    });
  }
  serialize() {
    const t = Array();
    Fe(t, this.staticAccountKeys.length);
    const e = this.serializeInstructions(), n = Array();
    Fe(n, this.compiledInstructions.length);
    const i = this.serializeAddressTableLookups(), s = Array();
    Fe(s, this.addressTableLookups.length);
    const u = _.struct([_.u8("prefix"), _.struct([_.u8("numRequiredSignatures"), _.u8("numReadonlySignedAccounts"), _.u8("numReadonlyUnsignedAccounts")], "header"), _.blob(t.length, "staticAccountKeysLength"), _.seq(Mt(), this.staticAccountKeys.length, "staticAccountKeys"), Mt("recentBlockhash"), _.blob(n.length, "instructionsLength"), _.blob(e.length, "serializedInstructions"), _.blob(s.length, "addressTableLookupsLength"), _.blob(i.length, "serializedAddressTableLookups")]), h = new Uint8Array(ar), E = u.encode({
      prefix: 128,
      header: this.header,
      staticAccountKeysLength: new Uint8Array(t),
      staticAccountKeys: this.staticAccountKeys.map((S) => S.toBytes()),
      recentBlockhash: Ie.decode(this.recentBlockhash),
      instructionsLength: new Uint8Array(n),
      serializedInstructions: e,
      addressTableLookupsLength: new Uint8Array(s),
      serializedAddressTableLookups: i
    }, h);
    return h.slice(0, E);
  }
  serializeInstructions() {
    let t = 0;
    const e = new Uint8Array(ar);
    for (const n of this.compiledInstructions) {
      const i = Array();
      Fe(i, n.accountKeyIndexes.length);
      const s = Array();
      Fe(s, n.data.length);
      const u = _.struct([_.u8("programIdIndex"), _.blob(i.length, "encodedAccountKeyIndexesLength"), _.seq(_.u8(), n.accountKeyIndexes.length, "accountKeyIndexes"), _.blob(s.length, "encodedDataLength"), _.blob(n.data.length, "data")]);
      t += u.encode({
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
    const e = new Uint8Array(ar);
    for (const n of this.addressTableLookups) {
      const i = Array();
      Fe(i, n.writableIndexes.length);
      const s = Array();
      Fe(s, n.readonlyIndexes.length);
      const u = _.struct([Mt("accountKey"), _.blob(i.length, "encodedWritableIndexesLength"), _.seq(_.u8(), n.writableIndexes.length, "writableIndexes"), _.blob(s.length, "encodedReadonlyIndexesLength"), _.seq(_.u8(), n.readonlyIndexes.length, "readonlyIndexes")]);
      t += u.encode({
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
    const n = dn(e), i = n & Eo;
    Ft(n !== i, "Expected versioned message but received legacy message");
    const s = i;
    Ft(s === 0, `Expected versioned message with version 0 but found version ${s}`);
    const u = {
      numRequiredSignatures: dn(e),
      numReadonlySignedAccounts: dn(e),
      numReadonlyUnsignedAccounts: dn(e)
    }, h = [], A = Pe(e);
    for (let F = 0; F < A; F++)
      h.push(new dt(Qe(e, 0, On)));
    const E = Ie.encode(Qe(e, 0, On)), S = Pe(e), N = [];
    for (let F = 0; F < S; F++) {
      const O = dn(e), L = Pe(e), Y = Qe(e, 0, L), Q = Pe(e), q = new Uint8Array(Qe(e, 0, Q));
      N.push({
        programIdIndex: O,
        accountKeyIndexes: Y,
        data: q
      });
    }
    const P = Pe(e), U = [];
    for (let F = 0; F < P; F++) {
      const O = new dt(Qe(e, 0, On)), L = Pe(e), Y = Qe(e, 0, L), Q = Pe(e), q = Qe(e, 0, Q);
      U.push({
        accountKey: O,
        writableIndexes: Y,
        readonlyIndexes: q
      });
    }
    return new Ur({
      header: u,
      staticAccountKeys: h,
      recentBlockhash: E,
      compiledInstructions: N,
      addressTableLookups: U
    });
  }
}
const Lc = {
  deserializeMessageVersion(r) {
    const t = r[0], e = t & Eo;
    return e === t ? "legacy" : e;
  },
  deserialize: (r) => {
    const t = Lc.deserializeMessageVersion(r);
    if (t === "legacy")
      return pn.from(r);
    if (t === 0)
      return Ur.deserialize(r);
    throw new Error(`Transaction message version ${t} deserialization is not supported`);
  }
};
let Cn = /* @__PURE__ */ function(r) {
  return r[r.BLOCKHEIGHT_EXCEEDED = 0] = "BLOCKHEIGHT_EXCEEDED", r[r.PROCESSED = 1] = "PROCESSED", r[r.TIMED_OUT = 2] = "TIMED_OUT", r[r.NONCE_INVALID = 3] = "NONCE_INVALID", r;
}({});
const w0 = pt.Buffer.alloc(yi).fill(0);
class Sa {
  constructor(t) {
    this.keys = void 0, this.programId = void 0, this.data = pt.Buffer.alloc(0), this.programId = t.programId, this.keys = t.keys, t.data && (this.data = t.data);
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
class Tn {
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
      "instructions" in e ? this.instructions = this.instructions.concat(e.instructions) : "data" in e && "programId" in e && "keys" in e ? this.instructions.push(e) : this.instructions.push(new Sa(e));
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
    for (let O = 0; O < e.length; O++)
      if (e[O].programId === void 0)
        throw new Error(`Transaction instruction index ${O} has undefined program id`);
    const i = [], s = [];
    e.forEach((O) => {
      O.keys.forEach((Y) => {
        s.push({
          ...Y
        });
      });
      const L = O.programId.toString();
      i.includes(L) || i.push(L);
    }), i.forEach((O) => {
      s.push({
        pubkey: new dt(O),
        isSigner: !1,
        isWritable: !1
      });
    });
    const u = [];
    s.forEach((O) => {
      const L = O.pubkey.toString(), Y = u.findIndex((Q) => Q.pubkey.toString() === L);
      Y > -1 ? (u[Y].isWritable = u[Y].isWritable || O.isWritable, u[Y].isSigner = u[Y].isSigner || O.isSigner) : u.push(O);
    }), u.sort(function(O, L) {
      if (O.isSigner !== L.isSigner)
        return O.isSigner ? -1 : 1;
      if (O.isWritable !== L.isWritable)
        return O.isWritable ? -1 : 1;
      const Y = {
        localeMatcher: "best fit",
        usage: "sort",
        sensitivity: "variant",
        ignorePunctuation: !1,
        numeric: !1,
        caseFirst: "lower"
      };
      return O.pubkey.toBase58().localeCompare(L.pubkey.toBase58(), "en", Y);
    });
    const h = u.findIndex((O) => O.pubkey.equals(n));
    if (h > -1) {
      const [O] = u.splice(h, 1);
      O.isSigner = !0, O.isWritable = !0, u.unshift(O);
    } else
      u.unshift({
        pubkey: n,
        isSigner: !0,
        isWritable: !0
      });
    for (const O of this.signatures) {
      const L = u.findIndex((Y) => Y.pubkey.equals(O.publicKey));
      if (L > -1)
        u[L].isSigner || (u[L].isSigner = !0, console.warn("Transaction references a signature that is unnecessary, only the fee payer and instruction signer accounts should sign a transaction. This behavior is deprecated and will throw an error in the next major version release."));
      else
        throw new Error(`unknown signer: ${O.publicKey.toString()}`);
    }
    let A = 0, E = 0, S = 0;
    const N = [], P = [];
    u.forEach(({
      pubkey: O,
      isSigner: L,
      isWritable: Y
    }) => {
      L ? (N.push(O.toString()), A += 1, Y || (E += 1)) : (P.push(O.toString()), Y || (S += 1));
    });
    const U = N.concat(P), F = e.map((O) => {
      const {
        data: L,
        programId: Y
      } = O;
      return {
        programIdIndex: U.indexOf(Y.toString()),
        accounts: O.keys.map((Q) => U.indexOf(Q.pubkey.toString())),
        data: Ie.encode(L)
      };
    });
    return F.forEach((O) => {
      Ft(O.programIdIndex >= 0), O.accounts.forEach((L) => Ft(L >= 0));
    }), new pn({
      header: {
        numRequiredSignatures: A,
        numReadonlySignedAccounts: E,
        numReadonlyUnsignedAccounts: S
      },
      accountKeys: U,
      recentBlockhash: t,
      instructions: F
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
      const u = s.publicKey.toString();
      e.has(u) || (e.add(u), n.push(s));
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
      const u = s.publicKey.toString();
      e.has(u) || (e.add(u), n.push(s));
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
      const s = Bc(n, i.secretKey);
      this._addSignature(i.publicKey, dr(s));
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
    this.signatures[n].signature = pt.Buffer.from(e);
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
      i === null ? e && (n.missing || (n.missing = [])).push(s) : c0(i, t, s.toBytes()) || (n.invalid || (n.invalid = [])).push(s);
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
        let u = "Signature verification failed.";
        throw s.invalid && (u += `
Invalid signature for public key${s.invalid.length === 1 ? "" : "(s)"} [\`${s.invalid.map((h) => h.toBase58()).join("`, `")}\`].`), s.missing && (u += `
Missing signature for public key${s.missing.length === 1 ? "" : "(s)"} [\`${s.missing.map((h) => h.toBase58()).join("`, `")}\`].`), new Error(u);
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
    Fe(n, e.length);
    const i = n.length + e.length * 64 + t.length, s = pt.Buffer.alloc(i);
    return Ft(e.length < 256), pt.Buffer.from(n).copy(s, 0), e.forEach(({
      signature: u
    }, h) => {
      u !== null && (Ft(u.length === 64, "signature has invalid length"), pt.Buffer.from(u).copy(s, n.length + h * 64));
    }), t.copy(s, n.length + e.length * 64), Ft(s.length <= ar, `Transaction too large: ${s.length} > ${ar}`), s;
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
    const n = Pe(e);
    let i = [];
    for (let s = 0; s < n; s++) {
      const u = Qe(e, 0, yi);
      i.push(Ie.encode(pt.Buffer.from(u)));
    }
    return Tn.populate(pn.from(e), i);
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
    const n = new Tn();
    return n.recentBlockhash = t.recentBlockhash, t.header.numRequiredSignatures > 0 && (n.feePayer = t.accountKeys[0]), e.forEach((i, s) => {
      const u = {
        signature: i == Ie.encode(w0) ? null : Ie.decode(i),
        publicKey: t.accountKeys[s]
      };
      n.signatures.push(u);
    }), t.instructions.forEach((i) => {
      const s = i.accounts.map((u) => {
        const h = t.accountKeys[u];
        return {
          pubkey: h,
          isSigner: n.signatures.some((A) => A.publicKey.toString() === h.toString()) || t.isAccountSigner(u),
          isWritable: t.isAccountWritable(u)
        };
      });
      n.instructions.push(new Sa({
        keys: s,
        programId: t.accountKeys[i.programIdIndex],
        data: Ie.decode(i.data)
      }));
    }), n._message = t, n._json = n.toJSON(), n;
  }
}
class Rc {
  get version() {
    return this.message.version;
  }
  constructor(t, e) {
    if (this.signatures = void 0, this.message = void 0, e !== void 0)
      Ft(e.length === t.header.numRequiredSignatures, "Expected signatures length to be equal to the number of required signatures"), this.signatures = e;
    else {
      const n = [];
      for (let i = 0; i < t.header.numRequiredSignatures; i++)
        n.push(new Uint8Array(yi));
      this.signatures = n;
    }
    this.message = t;
  }
  serialize() {
    const t = this.message.serialize(), e = Array();
    Fe(e, this.signatures.length);
    const n = _.struct([_.blob(e.length, "encodedSignaturesLength"), _.seq(f0(), this.signatures.length, "signatures"), _.blob(t.length, "serializedMessage")]), i = new Uint8Array(2048), s = n.encode({
      encodedSignaturesLength: new Uint8Array(e),
      signatures: this.signatures,
      serializedMessage: t
    }, i);
    return i.slice(0, s);
  }
  static deserialize(t) {
    let e = [...t];
    const n = [], i = Pe(e);
    for (let u = 0; u < i; u++)
      n.push(new Uint8Array(Qe(e, 0, yi)));
    const s = Lc.deserialize(new Uint8Array(e));
    return new Rc(s, n);
  }
  sign(t) {
    const e = this.message.serialize(), n = this.message.staticAccountKeys.slice(0, this.message.header.numRequiredSignatures);
    for (const i of t) {
      const s = n.findIndex((u) => u.equals(i.publicKey));
      Ft(s >= 0, `Cannot sign with non signer key ${i.publicKey.toBase58()}`), this.signatures[s] = Bc(e, i.secretKey);
    }
  }
  addSignature(t, e) {
    Ft(e.byteLength === 64, "Signature must be 64 bytes long");
    const i = this.message.staticAccountKeys.slice(0, this.message.header.numRequiredSignatures).findIndex((s) => s.equals(t));
    Ft(i >= 0, `Can not add signature; \`${t.toBase58()}\` is not required to sign this transaction`), this.signatures[i] = e;
  }
}
const y0 = 160, m0 = 64, b0 = y0 / m0, E0 = 1e3 / b0;
new dt("SysvarC1ock11111111111111111111111111111111");
new dt("SysvarEpochSchedu1e111111111111111111111111");
new dt("Sysvar1nstructions1111111111111111111111111");
new dt("SysvarRecentB1ockHashes11111111111111111111");
new dt("SysvarRent111111111111111111111111111111111");
new dt("SysvarRewards111111111111111111111111111111");
new dt("SysvarS1otHashes111111111111111111111111111");
new dt("SysvarS1otHistory11111111111111111111111111");
new dt("SysvarStakeHistory1111111111111111111111111");
class Ma extends Error {
  constructor({
    action: t,
    signature: e,
    transactionMessage: n,
    logs: i
  }) {
    const s = i ? `Logs: 
${JSON.stringify(i.slice(-10), null, 2)}. ` : "", u = "\nCatch the `SendTransactionError` and call `getLogs()` on it for full details.";
    let h;
    switch (t) {
      case "send":
        h = `Transaction ${e} resulted in an error. 
${n}. ` + s + u;
        break;
      case "simulate":
        h = `Simulation failed. 
Message: ${n}. 
` + s + u;
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
class ft extends Error {
  constructor({
    code: t,
    message: e,
    data: n
  }, i) {
    super(i != null ? `${i}: ${e}` : e), this.code = void 0, this.data = void 0, this.code = t, this.data = n, this.name = "SolanaJSONRPCError";
  }
}
function er(r) {
  return new Promise((t) => setTimeout(t, r));
}
const I0 = _.nu64("lamportsPerSignature"), Oc = _.struct([_.u32("version"), _.u32("state"), Mt("authorizedPubkey"), Mt("nonce"), _.struct([I0], "feeCalculator")]);
Oc.span;
class Io {
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
    const e = Oc.decode(dr(t), 0);
    return new Io({
      authorizedPubkey: new dt(e.authorizedPubkey),
      nonce: new dt(e.nonce).toString(),
      feeCalculator: e.feeCalculator
    });
  }
}
function gr(r) {
  const t = _.blob(8, r), e = t.decode.bind(t), n = t.encode.bind(t), i = t, s = pf();
  return i.decode = (u, h) => {
    const A = e(u, h);
    return s.decode(A);
  }, i.encode = (u, h, A) => {
    const E = s.encode(u);
    return n(E, h, A);
  }, i;
}
Object.freeze({
  Create: {
    index: 0,
    layout: _.struct([_.u32("instruction"), _.ns64("lamports"), _.ns64("space"), Mt("programId")])
  },
  Assign: {
    index: 1,
    layout: _.struct([_.u32("instruction"), Mt("programId")])
  },
  Transfer: {
    index: 2,
    layout: _.struct([_.u32("instruction"), gr("lamports")])
  },
  CreateWithSeed: {
    index: 3,
    layout: _.struct([_.u32("instruction"), Mt("base"), nr("seed"), _.ns64("lamports"), _.ns64("space"), Mt("programId")])
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
    layout: _.struct([_.u32("instruction"), Mt("authorized")])
  },
  AuthorizeNonceAccount: {
    index: 7,
    layout: _.struct([_.u32("instruction"), Mt("authorized")])
  },
  Allocate: {
    index: 8,
    layout: _.struct([_.u32("instruction"), _.ns64("space")])
  },
  AllocateWithSeed: {
    index: 9,
    layout: _.struct([_.u32("instruction"), Mt("base"), nr("seed"), _.ns64("space"), Mt("programId")])
  },
  AssignWithSeed: {
    index: 10,
    layout: _.struct([_.u32("instruction"), Mt("base"), nr("seed"), Mt("programId")])
  },
  TransferWithSeed: {
    index: 11,
    layout: _.struct([_.u32("instruction"), gr("lamports"), nr("seed"), Mt("programId")])
  },
  UpgradeNonceAccount: {
    index: 12,
    layout: _.struct([_.u32("instruction")])
  }
});
new dt("11111111111111111111111111111111");
new dt("BPFLoader2111111111111111111111111111111111");
function v0(r) {
  return r && r.__esModule && Object.prototype.hasOwnProperty.call(r, "default") ? r.default : r;
}
var xs, xa;
function S0() {
  if (xa) return xs;
  xa = 1;
  var r = Object.prototype.toString, t = Object.keys || function(n) {
    var i = [];
    for (var s in n)
      i.push(s);
    return i;
  };
  function e(n, i) {
    var s, u, h, A, E, S, N;
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
        if (N = r.call(n), N === "[object Array]") {
          for (h = "[", u = n.length - 1, s = 0; s < u; s++)
            h += e(n[s], !0) + ",";
          return u > -1 && (h += e(n[s], !0)), h + "]";
        } else if (N === "[object Object]") {
          for (A = t(n).sort(), u = A.length, h = "", s = 0; s < u; )
            E = A[s], S = e(n[E], !1), S !== void 0 && (h && (h += ","), h += JSON.stringify(E) + ":" + S), s++;
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
  return xs = function(n) {
    var i = e(n, !1);
    if (i !== void 0)
      return "" + i;
  }, xs;
}
var M0 = /* @__PURE__ */ S0(), Ba = /* @__PURE__ */ v0(M0);
const yr = 32;
function Bs(r) {
  let t = 0;
  for (; r > 1; )
    r /= 2, t++;
  return t;
}
function x0(r) {
  return r === 0 ? 1 : (r--, r |= r >> 1, r |= r >> 2, r |= r >> 4, r |= r >> 8, r |= r >> 16, r |= r >> 32, r + 1);
}
class B0 {
  constructor(t, e, n, i, s) {
    this.slotsPerEpoch = void 0, this.leaderScheduleSlotOffset = void 0, this.warmup = void 0, this.firstNormalEpoch = void 0, this.firstNormalSlot = void 0, this.slotsPerEpoch = t, this.leaderScheduleSlotOffset = e, this.warmup = n, this.firstNormalEpoch = i, this.firstNormalSlot = s;
  }
  getEpoch(t) {
    return this.getEpochAndSlotIndex(t)[0];
  }
  getEpochAndSlotIndex(t) {
    if (t < this.firstNormalSlot) {
      const e = Bs(x0(t + yr + 1)) - Bs(yr) - 1, n = this.getSlotsInEpoch(e), i = t - (n - yr);
      return [e, i];
    } else {
      const e = t - this.firstNormalSlot, n = Math.floor(e / this.slotsPerEpoch), i = this.firstNormalEpoch + n, s = e % this.slotsPerEpoch;
      return [i, s];
    }
  }
  getFirstSlotInEpoch(t) {
    return t <= this.firstNormalEpoch ? (Math.pow(2, t) - 1) * yr : (t - this.firstNormalEpoch) * this.slotsPerEpoch + this.firstNormalSlot;
  }
  getLastSlotInEpoch(t) {
    return this.getFirstSlotInEpoch(t) + this.getSlotsInEpoch(t) - 1;
  }
  getSlotsInEpoch(t) {
    return t < this.firstNormalEpoch ? Math.pow(2, t + Bs(yr)) : this.slotsPerEpoch;
  }
}
var C0 = globalThis.fetch;
class k0 extends Vf {
  constructor(t, e, n) {
    const i = (s) => {
      const u = Jf(s, {
        autoconnect: !0,
        max_reconnects: 5,
        reconnect: !0,
        reconnect_interval: 1e3,
        ...e
      });
      return "socket" in u ? this.underlyingSocket = u.socket : this.underlyingSocket = u, u;
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
function N0(r, t) {
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
const Ca = 56;
class ka {
  constructor(t) {
    this.key = void 0, this.state = void 0, this.key = t.key, this.state = t.state;
  }
  isActive() {
    const t = BigInt("0xffffffffffffffff");
    return this.state.deactivationSlot === t;
  }
  static deserialize(t) {
    const e = N0(T0, t), n = t.length - Ca;
    Ft(n >= 0, "lookup table is invalid"), Ft(n % 32 === 0, "lookup table is invalid");
    const i = n / 32, {
      addresses: s
    } = _.struct([_.seq(Mt(), i, "addresses")]).decode(t.slice(Ca));
    return {
      deactivationSlot: e.deactivationSlot,
      lastExtendedSlot: e.lastExtendedSlot,
      lastExtendedSlotStartIndex: e.lastExtendedStartIndex,
      authority: e.authority.length !== 0 ? new dt(e.authority[0]) : void 0,
      addresses: s.map((u) => new dt(u))
    };
  }
}
const T0 = {
  index: 1,
  layout: _.struct([
    _.u32("typeIndex"),
    gr("deactivationSlot"),
    _.nu64("lastExtendedSlot"),
    _.u8("lastExtendedStartIndex"),
    _.u8(),
    // option
    _.seq(Mt(), _.offset(_.u8(), -1), "authority")
  ])
}, L0 = /^[^:]+:\/\/([^:[]+|\[[^\]]+\])(:\d+)?(.*)/i;
function R0(r) {
  const t = r.match(L0);
  if (t == null)
    throw TypeError(`Failed to validate endpoint URL \`${r}\``);
  const [
    e,
    // eslint-disable-line @typescript-eslint/no-unused-vars
    n,
    i,
    s
  ] = t, u = r.startsWith("https:") ? "wss:" : "ws:", h = i == null ? null : parseInt(i.slice(1), 10), A = (
    // Only shift the port by +1 as a convention for ws(s) only if given endpoint
    // is explicitly specifying the endpoint port (HTTP-based RPC), assuming
    // we're directly trying to connect to agave-validator's ws listening port.
    // When the endpoint omits the port, we're connecting to the protocol
    // default ports: http(80) or https(443) and it's assumed we're behind a reverse
    // proxy which manages WebSocket upgrade and backend port redirection.
    h == null ? "" : `:${h + 1}`
  );
  return `${u}//${n}${A}${s}`;
}
const qt = _r(mo(dt), et(), (r) => new dt(r)), Dc = bo([et(), Ht("base64")]), vo = _r(mo(pt.Buffer), Dc, (r) => pt.Buffer.from(r[0], "base64")), O0 = 30 * 1e3;
function D0(r) {
  if (/^https?:/.test(r) === !1)
    throw new TypeError("Endpoint URL must start with `http:` or `https:`.");
  return r;
}
function Dt(r) {
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
function Na(r) {
  return r.map((t) => "memcmp" in t ? {
    ...t,
    memcmp: {
      ...t.memcmp,
      encoding: t.memcmp.encoding ?? "base58"
    }
  } : t);
}
function Uc(r) {
  return Te([$({
    jsonrpc: Ht("2.0"),
    id: et(),
    result: r
  }), $({
    jsonrpc: Ht("2.0"),
    id: et(),
    error: $({
      code: Ar(),
      message: et(),
      data: mt(vf())
    })
  })]);
}
const U0 = Uc(Ar());
function St(r) {
  return _r(Uc(r), U0, (t) => "error" in t ? t : {
    ...t,
    result: rt(t.result, r)
  });
}
function Gt(r) {
  return St($({
    context: $({
      slot: Z()
    }),
    value: r
  }));
}
function Ti(r) {
  return $({
    context: $({
      slot: Z()
    }),
    value: r
  });
}
function Cs(r, t) {
  return r === 0 ? new Ur({
    header: t.header,
    staticAccountKeys: t.accountKeys.map((e) => new dt(e)),
    recentBlockhash: t.recentBlockhash,
    compiledInstructions: t.instructions.map((e) => ({
      programIdIndex: e.programIdIndex,
      accountKeyIndexes: e.accounts,
      data: Ie.decode(e.data)
    })),
    addressTableLookups: t.addressTableLookups
  }) : new pn(t);
}
const j0 = $({
  foundation: Z(),
  foundationTerm: Z(),
  initial: Z(),
  taper: Z(),
  terminal: Z()
}), z0 = St(it(ot($({
  epoch: Z(),
  effectiveSlot: Z(),
  amount: Z(),
  postBalance: Z(),
  commission: mt(ot(Z()))
})))), P0 = it($({
  slot: Z(),
  prioritizationFee: Z()
})), F0 = $({
  total: Z(),
  validator: Z(),
  foundation: Z(),
  epoch: Z()
}), Q0 = $({
  epoch: Z(),
  slotIndex: Z(),
  slotsInEpoch: Z(),
  absoluteSlot: Z(),
  blockHeight: mt(Z()),
  transactionCount: mt(Z())
}), _0 = $({
  slotsPerEpoch: Z(),
  leaderScheduleSlotOffset: Z(),
  warmup: rn(),
  firstNormalEpoch: Z(),
  firstNormalSlot: Z()
}), H0 = yc(et(), it(Z())), Yn = ot(Te([$({}), et()])), W0 = $({
  err: Yn
}), q0 = Ht("receivedSignature"), Y0 = $({
  "solana-core": et(),
  "feature-set": mt(Z())
}), Z0 = $({
  program: et(),
  programId: qt,
  parsed: Ar()
}), G0 = $({
  programId: qt,
  accounts: it(qt),
  data: et()
}), Ta = Gt($({
  err: ot(Te([$({}), et()])),
  logs: ot(it(et())),
  accounts: mt(ot(it(ot($({
    executable: rn(),
    owner: et(),
    lamports: Z(),
    data: it(et()),
    rentEpoch: mt(Z())
  }))))),
  unitsConsumed: mt(Z()),
  returnData: mt(ot($({
    programId: et(),
    data: bo([et(), Ht("base64")])
  }))),
  innerInstructions: mt(ot(it($({
    index: Z(),
    instructions: it(Te([Z0, G0]))
  }))))
})), J0 = Gt($({
  byIdentity: yc(et(), it(Z())),
  range: $({
    firstSlot: Z(),
    lastSlot: Z()
  })
}));
function K0(r, t, e, n, i, s) {
  const u = e || C0;
  let h;
  s != null && console.warn("You have supplied an `httpAgent` when creating a `Connection` in a browser environment.It has been ignored; `httpAgent` is only used in Node environments.");
  let A;
  return n && (A = async (S, N) => {
    const P = await new Promise((U, F) => {
      try {
        n(S, N, (O, L) => U([O, L]));
      } catch (O) {
        F(O);
      }
    });
    return await u(...P);
  }), new Zf(async (S, N) => {
    const P = {
      method: "POST",
      body: S,
      agent: h,
      headers: Object.assign({
        "Content-Type": "application/json"
      }, t || {}, Kd)
    };
    try {
      let U = 5, F, O = 500;
      for (; A ? F = await A(r, P) : F = await u(r, P), !(F.status !== 429 || i === !0 || (U -= 1, U === 0)); )
        console.error(`Server responded with ${F.status} ${F.statusText}.  Retrying after ${O}ms delay...`), await er(O), O *= 2;
      const L = await F.text();
      F.ok ? N(null, L) : N(new Error(`${F.status} ${F.statusText}: ${L}`));
    } catch (U) {
      U instanceof Error && N(U);
    }
  }, {});
}
function V0(r) {
  return (t, e) => new Promise((n, i) => {
    r.request(t, e, (s, u) => {
      if (s) {
        i(s);
        return;
      }
      n(u);
    });
  });
}
function X0(r) {
  return (t) => new Promise((e, n) => {
    t.length === 0 && e([]);
    const i = t.map((s) => r.request(s.methodName, s.args));
    r.request(i, (s, u) => {
      if (s) {
        n(s);
        return;
      }
      e(u);
    });
  });
}
const $0 = St(j0), td = St(F0), ed = St(P0), nd = St(Q0), rd = St(_0), id = St(H0), sd = St(Z()), od = Gt($({
  total: Z(),
  circulating: Z(),
  nonCirculating: Z(),
  nonCirculatingAccounts: it(qt)
})), _s = $({
  amount: et(),
  uiAmount: ot(Z()),
  decimals: Z(),
  uiAmountString: mt(et())
}), ad = Gt(it($({
  address: qt,
  amount: et(),
  uiAmount: ot(Z()),
  decimals: Z(),
  uiAmountString: mt(et())
}))), cd = Gt(it($({
  pubkey: qt,
  account: $({
    executable: rn(),
    owner: qt,
    lamports: Z(),
    data: vo,
    rentEpoch: Z()
  })
}))), Hs = $({
  program: et(),
  parsed: Ar(),
  space: Z()
}), ud = Gt(it($({
  pubkey: qt,
  account: $({
    executable: rn(),
    owner: qt,
    lamports: Z(),
    data: Hs,
    rentEpoch: Z()
  })
}))), ld = Gt(it($({
  lamports: Z(),
  address: qt
}))), jr = $({
  executable: rn(),
  owner: qt,
  lamports: Z(),
  data: vo,
  rentEpoch: Z()
}), hd = $({
  pubkey: qt,
  account: jr
}), fd = _r(Te([mo(pt.Buffer), Hs]), Te([Dc, Hs]), (r) => Array.isArray(r) ? rt(r, vo) : r), Ws = $({
  executable: rn(),
  owner: qt,
  lamports: Z(),
  data: fd,
  rentEpoch: Z()
}), dd = $({
  pubkey: qt,
  account: Ws
}), gd = $({
  state: Te([Ht("active"), Ht("inactive"), Ht("activating"), Ht("deactivating")]),
  active: Z(),
  inactive: Z()
}), Ad = St(it($({
  signature: et(),
  slot: Z(),
  err: Yn,
  memo: ot(et()),
  blockTime: mt(ot(Z()))
}))), pd = St(it($({
  signature: et(),
  slot: Z(),
  err: Yn,
  memo: ot(et()),
  blockTime: mt(ot(Z()))
}))), wd = $({
  subscription: Z(),
  result: Ti(jr)
}), yd = $({
  pubkey: qt,
  account: jr
}), md = $({
  subscription: Z(),
  result: Ti(yd)
}), bd = $({
  parent: Z(),
  slot: Z(),
  root: Z()
}), Ed = $({
  subscription: Z(),
  result: bd
}), Id = Te([$({
  type: Te([Ht("firstShredReceived"), Ht("completed"), Ht("optimisticConfirmation"), Ht("root")]),
  slot: Z(),
  timestamp: Z()
}), $({
  type: Ht("createdBank"),
  parent: Z(),
  slot: Z(),
  timestamp: Z()
}), $({
  type: Ht("frozen"),
  slot: Z(),
  timestamp: Z(),
  stats: $({
    numTransactionEntries: Z(),
    numSuccessfulTransactions: Z(),
    numFailedTransactions: Z(),
    maxTransactionsPerEntry: Z()
  })
}), $({
  type: Ht("dead"),
  slot: Z(),
  timestamp: Z(),
  err: et()
})]), vd = $({
  subscription: Z(),
  result: Id
}), Sd = $({
  subscription: Z(),
  result: Ti(Te([W0, q0]))
}), Md = $({
  subscription: Z(),
  result: Z()
}), xd = $({
  pubkey: et(),
  gossip: ot(et()),
  tpu: ot(et()),
  rpc: ot(et()),
  version: ot(et())
}), La = $({
  votePubkey: et(),
  nodePubkey: et(),
  activatedStake: Z(),
  epochVoteAccount: rn(),
  epochCredits: it(bo([Z(), Z(), Z()])),
  commission: Z(),
  lastVote: Z(),
  rootSlot: ot(Z())
}), Bd = St($({
  current: it(La),
  delinquent: it(La)
})), Cd = Te([Ht("processed"), Ht("confirmed"), Ht("finalized")]), kd = $({
  slot: Z(),
  confirmations: ot(Z()),
  err: Yn,
  confirmationStatus: mt(Cd)
}), Nd = Gt(it(ot(kd))), Td = St(Z()), jc = $({
  accountKey: qt,
  writableIndexes: it(Z()),
  readonlyIndexes: it(Z())
}), So = $({
  signatures: it(et()),
  message: $({
    accountKeys: it(et()),
    header: $({
      numRequiredSignatures: Z(),
      numReadonlySignedAccounts: Z(),
      numReadonlyUnsignedAccounts: Z()
    }),
    instructions: it($({
      accounts: it(Z()),
      data: et(),
      programIdIndex: Z()
    })),
    recentBlockhash: et(),
    addressTableLookups: mt(it(jc))
  })
}), zc = $({
  pubkey: qt,
  signer: rn(),
  writable: rn(),
  source: mt(Te([Ht("transaction"), Ht("lookupTable")]))
}), Pc = $({
  accountKeys: it(zc),
  signatures: it(et())
}), Fc = $({
  parsed: Ar(),
  program: et(),
  programId: qt
}), Qc = $({
  accounts: it(qt),
  data: et(),
  programId: qt
}), Ld = Te([Qc, Fc]), Rd = Te([$({
  parsed: Ar(),
  program: et(),
  programId: et()
}), $({
  accounts: it(et()),
  data: et(),
  programId: et()
})]), _c = _r(Ld, Rd, (r) => "accounts" in r ? rt(r, Qc) : rt(r, Fc)), Hc = $({
  signatures: it(et()),
  message: $({
    accountKeys: it(zc),
    instructions: it(_c),
    recentBlockhash: et(),
    addressTableLookups: mt(ot(it(jc)))
  })
}), bi = $({
  accountIndex: Z(),
  mint: et(),
  owner: mt(et()),
  programId: mt(et()),
  uiTokenAmount: _s
}), Wc = $({
  writable: it(qt),
  readonly: it(qt)
}), Li = $({
  err: Yn,
  fee: Z(),
  innerInstructions: mt(ot(it($({
    index: Z(),
    instructions: it($({
      accounts: it(Z()),
      data: et(),
      programIdIndex: Z()
    }))
  })))),
  preBalances: it(Z()),
  postBalances: it(Z()),
  logMessages: mt(ot(it(et()))),
  preTokenBalances: mt(ot(it(bi))),
  postTokenBalances: mt(ot(it(bi))),
  loadedAddresses: mt(Wc),
  computeUnitsConsumed: mt(Z())
}), Mo = $({
  err: Yn,
  fee: Z(),
  innerInstructions: mt(ot(it($({
    index: Z(),
    instructions: it(_c)
  })))),
  preBalances: it(Z()),
  postBalances: it(Z()),
  logMessages: mt(ot(it(et()))),
  preTokenBalances: mt(ot(it(bi))),
  postTokenBalances: mt(ot(it(bi))),
  loadedAddresses: mt(Wc),
  computeUnitsConsumed: mt(Z())
}), pr = Te([Ht(0), Ht("legacy")]), Zn = $({
  pubkey: et(),
  lamports: Z(),
  postBalance: ot(Z()),
  rewardType: ot(et()),
  commission: mt(ot(Z()))
}), Od = St(ot($({
  blockhash: et(),
  previousBlockhash: et(),
  parentSlot: Z(),
  transactions: it($({
    transaction: So,
    meta: ot(Li),
    version: mt(pr)
  })),
  rewards: mt(it(Zn)),
  blockTime: ot(Z()),
  blockHeight: ot(Z())
}))), Dd = St(ot($({
  blockhash: et(),
  previousBlockhash: et(),
  parentSlot: Z(),
  rewards: mt(it(Zn)),
  blockTime: ot(Z()),
  blockHeight: ot(Z())
}))), Ud = St(ot($({
  blockhash: et(),
  previousBlockhash: et(),
  parentSlot: Z(),
  transactions: it($({
    transaction: Pc,
    meta: ot(Li),
    version: mt(pr)
  })),
  rewards: mt(it(Zn)),
  blockTime: ot(Z()),
  blockHeight: ot(Z())
}))), jd = St(ot($({
  blockhash: et(),
  previousBlockhash: et(),
  parentSlot: Z(),
  transactions: it($({
    transaction: Hc,
    meta: ot(Mo),
    version: mt(pr)
  })),
  rewards: mt(it(Zn)),
  blockTime: ot(Z()),
  blockHeight: ot(Z())
}))), zd = St(ot($({
  blockhash: et(),
  previousBlockhash: et(),
  parentSlot: Z(),
  transactions: it($({
    transaction: Pc,
    meta: ot(Mo),
    version: mt(pr)
  })),
  rewards: mt(it(Zn)),
  blockTime: ot(Z()),
  blockHeight: ot(Z())
}))), Pd = St(ot($({
  blockhash: et(),
  previousBlockhash: et(),
  parentSlot: Z(),
  rewards: mt(it(Zn)),
  blockTime: ot(Z()),
  blockHeight: ot(Z())
}))), Fd = St(ot($({
  blockhash: et(),
  previousBlockhash: et(),
  parentSlot: Z(),
  transactions: it($({
    transaction: So,
    meta: ot(Li)
  })),
  rewards: mt(it(Zn)),
  blockTime: ot(Z())
}))), Ra = St(ot($({
  blockhash: et(),
  previousBlockhash: et(),
  parentSlot: Z(),
  signatures: it(et()),
  blockTime: ot(Z())
}))), ks = St(ot($({
  slot: Z(),
  meta: ot(Li),
  blockTime: mt(ot(Z())),
  transaction: So,
  version: mt(pr)
}))), Vr = St(ot($({
  slot: Z(),
  transaction: Hc,
  meta: ot(Mo),
  blockTime: mt(ot(Z())),
  version: mt(pr)
}))), Qd = Gt($({
  blockhash: et(),
  lastValidBlockHeight: Z()
})), _d = Gt(rn()), Hd = $({
  slot: Z(),
  numTransactions: Z(),
  numSlots: Z(),
  samplePeriodSecs: Z()
}), Wd = St(it(Hd)), qd = Gt(ot($({
  feeCalculator: $({
    lamportsPerSignature: Z()
  })
}))), Yd = St(et()), Zd = St(et()), Gd = $({
  err: Yn,
  logs: it(et()),
  signature: et()
}), Jd = $({
  result: Ti(Gd),
  subscription: Z()
}), Kd = {
  "solana-client": "js/1.0.0-maintenance"
};
class Vd {
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
      return async (S) => {
        const {
          commitment: N,
          config: P
        } = Dt(S), U = this._buildArgs([], N, void 0, P), F = Ba(U);
        return E[F] = E[F] ?? (async () => {
          try {
            const O = await this._rpcRequest("getBlockHeight", U), L = rt(O, St(Z()));
            if ("error" in L)
              throw new ft(L.error, "failed to get block height information");
            return L.result;
          } finally {
            delete E[F];
          }
        })(), await E[F];
      };
    })();
    let n, i, s, u, h, A;
    e && typeof e == "string" ? this._commitment = e : e && (this._commitment = e.commitment, this._confirmTransactionInitialTimeout = e.confirmTransactionInitialTimeout, n = e.wsEndpoint, i = e.httpHeaders, s = e.fetch, u = e.fetchMiddleware, h = e.disableRetryOnRateLimit, A = e.httpAgent), this._rpcEndpoint = D0(t), this._rpcWsEndpoint = n || R0(t), this._rpcClient = K0(t, i, s, u, h, A), this._rpcRequest = V0(this._rpcClient), this._rpcBatchRequest = X0(this._rpcClient), this._rpcWebSocket = new k0(this._rpcWsEndpoint, {
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
    } = Dt(e), s = this._buildArgs([t.toBase58()], n, void 0, i), u = await this._rpcRequest("getBalance", s), h = rt(u, Gt(Z()));
    if ("error" in h)
      throw new ft(h.error, `failed to get balance for ${t.toBase58()}`);
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
    const e = await this._rpcRequest("getBlockTime", [t]), n = rt(e, St(ot(Z())));
    if ("error" in n)
      throw new ft(n.error, `failed to get block time for slot ${t}`);
    return n.result;
  }
  /**
   * Fetch the lowest slot that the node has information about in its ledger.
   * This value may increase over time if the node is configured to purge older ledger data
   */
  async getMinimumLedgerSlot() {
    const t = await this._rpcRequest("minimumLedgerSlot", []), e = rt(t, St(Z()));
    if ("error" in e)
      throw new ft(e.error, "failed to get minimum ledger slot");
    return e.result;
  }
  /**
   * Fetch the slot of the lowest confirmed block that has not been purged from the ledger
   */
  async getFirstAvailableBlock() {
    const t = await this._rpcRequest("getFirstAvailableBlock", []), e = rt(t, sd);
    if ("error" in e)
      throw new ft(e.error, "failed to get first available block");
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
    const n = await this._rpcRequest("getSupply", [e]), i = rt(n, od);
    if ("error" in i)
      throw new ft(i.error, "failed to get supply");
    return i.result;
  }
  /**
   * Fetch the current supply of a token mint
   */
  async getTokenSupply(t, e) {
    const n = this._buildArgs([t.toBase58()], e), i = await this._rpcRequest("getTokenSupply", n), s = rt(i, Gt(_s));
    if ("error" in s)
      throw new ft(s.error, "failed to get token supply");
    return s.result;
  }
  /**
   * Fetch the current balance of a token account
   */
  async getTokenAccountBalance(t, e) {
    const n = this._buildArgs([t.toBase58()], e), i = await this._rpcRequest("getTokenAccountBalance", n), s = rt(i, Gt(_s));
    if ("error" in s)
      throw new ft(s.error, "failed to get token account balance");
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
    } = Dt(n);
    let u = [t.toBase58()];
    "mint" in e ? u.push({
      mint: e.mint.toBase58()
    }) : u.push({
      programId: e.programId.toBase58()
    });
    const h = this._buildArgs(u, i, "base64", s), A = await this._rpcRequest("getTokenAccountsByOwner", h), E = rt(A, cd);
    if ("error" in E)
      throw new ft(E.error, `failed to get token accounts owned by account ${t.toBase58()}`);
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
    const s = this._buildArgs(i, n, "jsonParsed"), u = await this._rpcRequest("getTokenAccountsByOwner", s), h = rt(u, ud);
    if ("error" in h)
      throw new ft(h.error, `failed to get token accounts owned by account ${t.toBase58()}`);
    return h.result;
  }
  /**
   * Fetch the 20 largest accounts with their current balances
   */
  async getLargestAccounts(t) {
    const e = {
      ...t,
      commitment: t && t.commitment || this.commitment
    }, n = e.filter || e.commitment ? [e] : [], i = await this._rpcRequest("getLargestAccounts", n), s = rt(i, ld);
    if ("error" in s)
      throw new ft(s.error, "failed to get largest accounts");
    return s.result;
  }
  /**
   * Fetch the 20 largest token accounts with their current balances
   * for a given mint.
   */
  async getTokenLargestAccounts(t, e) {
    const n = this._buildArgs([t.toBase58()], e), i = await this._rpcRequest("getTokenLargestAccounts", n), s = rt(i, ad);
    if ("error" in s)
      throw new ft(s.error, "failed to get token largest accounts");
    return s.result;
  }
  /**
   * Fetch all the account info for the specified public key, return with context
   */
  async getAccountInfoAndContext(t, e) {
    const {
      commitment: n,
      config: i
    } = Dt(e), s = this._buildArgs([t.toBase58()], n, "base64", i), u = await this._rpcRequest("getAccountInfo", s), h = rt(u, Gt(ot(jr)));
    if ("error" in h)
      throw new ft(h.error, `failed to get info about account ${t.toBase58()}`);
    return h.result;
  }
  /**
   * Fetch parsed account info for the specified public key
   */
  async getParsedAccountInfo(t, e) {
    const {
      commitment: n,
      config: i
    } = Dt(e), s = this._buildArgs([t.toBase58()], n, "jsonParsed", i), u = await this._rpcRequest("getAccountInfo", s), h = rt(u, Gt(ot(Ws)));
    if ("error" in h)
      throw new ft(h.error, `failed to get info about account ${t.toBase58()}`);
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
    } = Dt(e), s = t.map((E) => E.toBase58()), u = this._buildArgs([s], n, "jsonParsed", i), h = await this._rpcRequest("getMultipleAccounts", u), A = rt(h, Gt(it(ot(Ws))));
    if ("error" in A)
      throw new ft(A.error, `failed to get info for accounts ${s}`);
    return A.result;
  }
  /**
   * Fetch all the account info for multiple accounts specified by an array of public keys, return with context
   */
  async getMultipleAccountsInfoAndContext(t, e) {
    const {
      commitment: n,
      config: i
    } = Dt(e), s = t.map((E) => E.toBase58()), u = this._buildArgs([s], n, "base64", i), h = await this._rpcRequest("getMultipleAccounts", u), A = rt(h, Gt(it(ot(jr))));
    if ("error" in A)
      throw new ft(A.error, `failed to get info for accounts ${s}`);
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
    } = Dt(e), u = this._buildArgs([t.toBase58()], i, void 0, {
      ...s,
      epoch: n ?? s?.epoch
    }), h = await this._rpcRequest("getStakeActivation", u), A = rt(h, St(gd));
    if ("error" in A)
      throw new ft(A.error, `failed to get Stake Activation ${t.toBase58()}`);
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
    } = Dt(e), {
      encoding: s,
      ...u
    } = i || {}, h = this._buildArgs([t.toBase58()], n, s || "base64", {
      ...u,
      ...u.filters ? {
        filters: Na(u.filters)
      } : null
    }), A = await this._rpcRequest("getProgramAccounts", h), E = it(hd), S = u.withContext === !0 ? rt(A, Gt(E)) : rt(A, St(E));
    if ("error" in S)
      throw new ft(S.error, `failed to get accounts owned by program ${t.toBase58()}`);
    return S.result;
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
    } = Dt(e), s = this._buildArgs([t.toBase58()], n, "jsonParsed", i), u = await this._rpcRequest("getProgramAccounts", s), h = rt(u, St(it(dd)));
    if ("error" in h)
      throw new ft(h.error, `failed to get accounts owned by program ${t.toBase58()}`);
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
      i = Ie.decode(n);
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
    const u = new Promise((A, E) => {
      try {
        n = this.onSignature(e, (N, P) => {
          n = void 0;
          const U = {
            context: P,
            value: N
          };
          A({
            __type: Cn.PROCESSED,
            response: U
          });
        }, t);
        const S = new Promise((N) => {
          n == null ? N() : i = this._onSubscriptionStateChange(n, (P) => {
            P === "subscribed" && N();
          });
        });
        (async () => {
          if (await S, s) return;
          const N = await this.getSignatureStatus(e);
          if (s || N == null)
            return;
          const {
            context: P,
            value: U
          } = N;
          if (U != null)
            if (U?.err)
              E(U.err);
            else {
              switch (t) {
                case "confirmed":
                case "single":
                case "singleGossip": {
                  if (U.confirmationStatus === "processed")
                    return;
                  break;
                }
                case "finalized":
                case "max":
                case "root": {
                  if (U.confirmationStatus === "processed" || U.confirmationStatus === "confirmed")
                    return;
                  break;
                }
                // exhaust enums to ensure full coverage
                case "processed":
                case "recent":
              }
              s = !0, A({
                __type: Cn.PROCESSED,
                response: {
                  context: P,
                  value: U
                }
              });
            }
        })();
      } catch (S) {
        E(S);
      }
    });
    return {
      abortConfirmation: () => {
        i && (i(), i = void 0), n != null && (this.removeSignatureListener(n), n = void 0);
      },
      confirmationPromise: u
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
    const u = new Promise((N) => {
      const P = async () => {
        try {
          return await this.getBlockHeight(t);
        } catch {
          return -1;
        }
      };
      (async () => {
        let U = await P();
        if (!s) {
          for (; U <= n; )
            if (await er(1e3), s || (U = await P(), s)) return;
          N({
            __type: Cn.BLOCKHEIGHT_EXCEEDED
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
    let S;
    try {
      const N = await Promise.race([E, A, u]);
      if (N.__type === Cn.PROCESSED)
        S = N.response;
      else
        throw new kc(i);
    } finally {
      s = !0, h();
    }
    return S;
  }
  async confirmTransactionUsingDurableNonceStrategy({
    commitment: t,
    strategy: {
      abortSignal: e,
      minContextSlot: n,
      nonceAccountPubkey: i,
      nonceValue: s,
      signature: u
    }
  }) {
    let h = !1;
    const A = new Promise((U) => {
      let F = s, O = null;
      const L = async () => {
        try {
          const {
            context: Y,
            value: Q
          } = await this.getNonceAndContext(i, {
            commitment: t,
            minContextSlot: n
          });
          return O = Y.slot, Q?.nonce;
        } catch {
          return F;
        }
      };
      (async () => {
        if (F = await L(), !h)
          for (; ; ) {
            if (s !== F) {
              U({
                __type: Cn.NONCE_INVALID,
                slotInWhichNonceDidAdvance: O
              });
              return;
            }
            if (await er(2e3), h || (F = await L(), h)) return;
          }
      })();
    }), {
      abortConfirmation: E,
      confirmationPromise: S
    } = this.getTransactionConfirmationPromise({
      commitment: t,
      signature: u
    }), N = this.getCancellationPromise(e);
    let P;
    try {
      const U = await Promise.race([N, S, A]);
      if (U.__type === Cn.PROCESSED)
        P = U.response;
      else {
        let F;
        for (; ; ) {
          const O = await this.getSignatureStatus(u);
          if (O == null)
            break;
          if (O.context.slot < (U.slotInWhichNonceDidAdvance ?? n)) {
            await er(400);
            continue;
          }
          F = O;
          break;
        }
        if (F?.value) {
          const O = t || "finalized", {
            confirmationStatus: L
          } = F.value;
          switch (O) {
            case "processed":
            case "recent":
              if (L !== "processed" && L !== "confirmed" && L !== "finalized")
                throw new Mr(u);
              break;
            case "confirmed":
            case "single":
            case "singleGossip":
              if (L !== "confirmed" && L !== "finalized")
                throw new Mr(u);
              break;
            case "finalized":
            case "max":
            case "root":
              if (L !== "finalized")
                throw new Mr(u);
              break;
            default:
          }
          P = {
            context: F.context,
            value: {
              err: F.value.err
            }
          };
        } else
          throw new Mr(u);
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
        __type: Cn.TIMED_OUT,
        timeoutMs: E
      }), E);
    }), {
      abortConfirmation: s,
      confirmationPromise: u
    } = this.getTransactionConfirmationPromise({
      commitment: t,
      signature: e
    });
    let h;
    try {
      const A = await Promise.race([u, i]);
      if (A.__type === Cn.PROCESSED)
        h = A.response;
      else
        throw new Nc(e, A.timeoutMs / 1e3);
    } finally {
      clearTimeout(n), s();
    }
    return h;
  }
  /**
   * Return the list of nodes that are currently participating in the cluster
   */
  async getClusterNodes() {
    const t = await this._rpcRequest("getClusterNodes", []), e = rt(t, St(it(xd)));
    if ("error" in e)
      throw new ft(e.error, "failed to get cluster nodes");
    return e.result;
  }
  /**
   * Return the list of nodes that are currently participating in the cluster
   */
  async getVoteAccounts(t) {
    const e = this._buildArgs([], t), n = await this._rpcRequest("getVoteAccounts", e), i = rt(n, Bd);
    if ("error" in i)
      throw new ft(i.error, "failed to get vote accounts");
    return i.result;
  }
  /**
   * Fetch the current slot that the node is processing
   */
  async getSlot(t) {
    const {
      commitment: e,
      config: n
    } = Dt(t), i = this._buildArgs([], e, void 0, n), s = await this._rpcRequest("getSlot", i), u = rt(s, St(Z()));
    if ("error" in u)
      throw new ft(u.error, "failed to get slot");
    return u.result;
  }
  /**
   * Fetch the current slot leader of the cluster
   */
  async getSlotLeader(t) {
    const {
      commitment: e,
      config: n
    } = Dt(t), i = this._buildArgs([], e, void 0, n), s = await this._rpcRequest("getSlotLeader", i), u = rt(s, St(et()));
    if ("error" in u)
      throw new ft(u.error, "failed to get slot leader");
    return u.result;
  }
  /**
   * Fetch `limit` number of slot leaders starting from `startSlot`
   *
   * @param startSlot fetch slot leaders starting from this slot
   * @param limit number of slot leaders to return
   */
  async getSlotLeaders(t, e) {
    const n = [t, e], i = await this._rpcRequest("getSlotLeaders", n), s = rt(i, St(it(qt)));
    if ("error" in s)
      throw new ft(s.error, "failed to get slot leaders");
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
    const i = await this._rpcRequest("getSignatureStatuses", n), s = rt(i, Nd);
    if ("error" in s)
      throw new ft(s.error, "failed to get signature status");
    return s.result;
  }
  /**
   * Fetch the current transaction count of the cluster
   */
  async getTransactionCount(t) {
    const {
      commitment: e,
      config: n
    } = Dt(t), i = this._buildArgs([], e, void 0, n), s = await this._rpcRequest("getTransactionCount", i), u = rt(s, St(Z()));
    if ("error" in u)
      throw new ft(u.error, "failed to get transaction count");
    return u.result;
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
    const e = this._buildArgs([], t), n = await this._rpcRequest("getInflationGovernor", e), i = rt(n, $0);
    if ("error" in i)
      throw new ft(i.error, "failed to get inflation");
    return i.result;
  }
  /**
   * Fetch the inflation reward for a list of addresses for an epoch
   */
  async getInflationReward(t, e, n) {
    const {
      commitment: i,
      config: s
    } = Dt(n), u = this._buildArgs([t.map((E) => E.toBase58())], i, void 0, {
      ...s,
      epoch: e ?? s?.epoch
    }), h = await this._rpcRequest("getInflationReward", u), A = rt(h, z0);
    if ("error" in A)
      throw new ft(A.error, "failed to get inflation reward");
    return A.result;
  }
  /**
   * Fetch the specific inflation values for the current epoch
   */
  async getInflationRate() {
    const t = await this._rpcRequest("getInflationRate", []), e = rt(t, td);
    if ("error" in e)
      throw new ft(e.error, "failed to get inflation rate");
    return e.result;
  }
  /**
   * Fetch the Epoch Info parameters
   */
  async getEpochInfo(t) {
    const {
      commitment: e,
      config: n
    } = Dt(t), i = this._buildArgs([], e, void 0, n), s = await this._rpcRequest("getEpochInfo", i), u = rt(s, nd);
    if ("error" in u)
      throw new ft(u.error, "failed to get epoch info");
    return u.result;
  }
  /**
   * Fetch the Epoch Schedule parameters
   */
  async getEpochSchedule() {
    const t = await this._rpcRequest("getEpochSchedule", []), e = rt(t, rd);
    if ("error" in e)
      throw new ft(e.error, "failed to get epoch schedule");
    const n = e.result;
    return new B0(n.slotsPerEpoch, n.leaderScheduleSlotOffset, n.warmup, n.firstNormalEpoch, n.firstNormalSlot);
  }
  /**
   * Fetch the leader schedule for the current epoch
   * @return {Promise<RpcResponseAndContext<LeaderSchedule>>}
   */
  async getLeaderSchedule() {
    const t = await this._rpcRequest("getLeaderSchedule", []), e = rt(t, id);
    if ("error" in e)
      throw new ft(e.error, "failed to get leader schedule");
    return e.result;
  }
  /**
   * Fetch the minimum balance needed to exempt an account of `dataLength`
   * size from rent
   */
  async getMinimumBalanceForRentExemption(t, e) {
    const n = this._buildArgs([t], e), i = await this._rpcRequest("getMinimumBalanceForRentExemption", n), s = rt(i, Td);
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
    const e = await this._rpcRequest("getRecentPerformanceSamples", t ? [t] : []), n = rt(e, Wd);
    if ("error" in n)
      throw new ft(n.error, "failed to get recent performance samples");
    return n.result;
  }
  /**
   * Fetch the fee calculator for a recent blockhash from the cluster, return with context
   *
   * @deprecated Deprecated since RPC v1.9.0. Please use {@link getFeeForMessage} instead.
   */
  async getFeeCalculatorForBlockhash(t, e) {
    const n = this._buildArgs([t], e), i = await this._rpcRequest("getFeeCalculatorForBlockhash", n), s = rt(i, qd);
    if ("error" in s)
      throw new ft(s.error, "failed to get fee calculator");
    const {
      context: u,
      value: h
    } = s.result;
    return {
      context: u,
      value: h !== null ? h.feeCalculator : null
    };
  }
  /**
   * Fetch the fee for a message from the cluster, return with context
   */
  async getFeeForMessage(t, e) {
    const n = dr(t.serialize()).toString("base64"), i = this._buildArgs([n], e), s = await this._rpcRequest("getFeeForMessage", i), u = rt(s, Gt(ot(Z())));
    if ("error" in u)
      throw new ft(u.error, "failed to get fee for message");
    if (u.result === null)
      throw new Error("invalid blockhash");
    return u.result;
  }
  /**
   * Fetch a list of prioritization fees from recent blocks.
   */
  async getRecentPrioritizationFees(t) {
    const e = t?.lockedWritableAccounts?.map((u) => u.toBase58()), n = e?.length ? [e] : [], i = await this._rpcRequest("getRecentPrioritizationFees", n), s = rt(i, ed);
    if ("error" in s)
      throw new ft(s.error, "failed to get recent prioritization fees");
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
    } = Dt(t), i = this._buildArgs([], e, void 0, n), s = await this._rpcRequest("getLatestBlockhash", i), u = rt(s, Qd);
    if ("error" in u)
      throw new ft(u.error, "failed to get latest blockhash");
    return u.result;
  }
  /**
   * Returns whether a blockhash is still valid or not
   */
  async isBlockhashValid(t, e) {
    const {
      commitment: n,
      config: i
    } = Dt(e), s = this._buildArgs([t], n, void 0, i), u = await this._rpcRequest("isBlockhashValid", s), h = rt(u, _d);
    if ("error" in h)
      throw new ft(h.error, "failed to determine if the blockhash `" + t + "`is valid");
    return h.result;
  }
  /**
   * Fetch the node version
   */
  async getVersion() {
    const t = await this._rpcRequest("getVersion", []), e = rt(t, St(Y0));
    if ("error" in e)
      throw new ft(e.error, "failed to get version");
    return e.result;
  }
  /**
   * Fetch the genesis hash
   */
  async getGenesisHash() {
    const t = await this._rpcRequest("getGenesisHash", []), e = rt(t, St(et()));
    if ("error" in e)
      throw new ft(e.error, "failed to get genesis hash");
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
    } = Dt(e), s = this._buildArgsAtLeastConfirmed([t], n, void 0, i), u = await this._rpcRequest("getBlock", s);
    try {
      switch (i?.transactionDetails) {
        case "accounts": {
          const h = rt(u, Ud);
          if ("error" in h)
            throw h.error;
          return h.result;
        }
        case "none": {
          const h = rt(u, Dd);
          if ("error" in h)
            throw h.error;
          return h.result;
        }
        default: {
          const h = rt(u, Od);
          if ("error" in h)
            throw h.error;
          const {
            result: A
          } = h;
          return A ? {
            ...A,
            transactions: A.transactions.map(({
              transaction: E,
              meta: S,
              version: N
            }) => ({
              meta: S,
              transaction: {
                ...E,
                message: Cs(N, E.message)
              },
              version: N
            }))
          } : null;
        }
      }
    } catch (h) {
      throw new ft(h, "failed to get confirmed block");
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
    } = Dt(e), s = this._buildArgsAtLeastConfirmed([t], n, "jsonParsed", i), u = await this._rpcRequest("getBlock", s);
    try {
      switch (i?.transactionDetails) {
        case "accounts": {
          const h = rt(u, zd);
          if ("error" in h)
            throw h.error;
          return h.result;
        }
        case "none": {
          const h = rt(u, Pd);
          if ("error" in h)
            throw h.error;
          return h.result;
        }
        default: {
          const h = rt(u, jd);
          if ("error" in h)
            throw h.error;
          return h.result;
        }
      }
    } catch (h) {
      throw new ft(h, "failed to get block");
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
    const i = this._buildArgs([], n, "base64", e), s = await this._rpcRequest("getBlockProduction", i), u = rt(s, J0);
    if ("error" in u)
      throw new ft(u.error, "failed to get block production information");
    return u.result;
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
    } = Dt(e), s = this._buildArgsAtLeastConfirmed([t], n, void 0, i), u = await this._rpcRequest("getTransaction", s), h = rt(u, ks);
    if ("error" in h)
      throw new ft(h.error, "failed to get transaction");
    const A = h.result;
    return A && {
      ...A,
      transaction: {
        ...A.transaction,
        message: Cs(A.version, A.transaction.message)
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
    } = Dt(e), s = this._buildArgsAtLeastConfirmed([t], n, "jsonParsed", i), u = await this._rpcRequest("getTransaction", s), h = rt(u, Vr);
    if ("error" in h)
      throw new ft(h.error, "failed to get transaction");
    return h.result;
  }
  /**
   * Fetch parsed transaction details for a batch of confirmed transactions
   */
  async getParsedTransactions(t, e) {
    const {
      commitment: n,
      config: i
    } = Dt(e), s = t.map((A) => ({
      methodName: "getTransaction",
      args: this._buildArgsAtLeastConfirmed([A], n, "jsonParsed", i)
    }));
    return (await this._rpcBatchRequest(s)).map((A) => {
      const E = rt(A, Vr);
      if ("error" in E)
        throw new ft(E.error, "failed to get transactions");
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
    } = Dt(e), s = t.map((A) => ({
      methodName: "getTransaction",
      args: this._buildArgsAtLeastConfirmed([A], n, void 0, i)
    }));
    return (await this._rpcBatchRequest(s)).map((A) => {
      const E = rt(A, ks);
      if ("error" in E)
        throw new ft(E.error, "failed to get transactions");
      const S = E.result;
      return S && {
        ...S,
        transaction: {
          ...S.transaction,
          message: Cs(S.version, S.transaction.message)
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
    const n = this._buildArgsAtLeastConfirmed([t], e), i = await this._rpcRequest("getBlock", n), s = rt(i, Fd);
    if ("error" in s)
      throw new ft(s.error, "failed to get confirmed block");
    const u = s.result;
    if (!u)
      throw new Error("Confirmed block " + t + " not found");
    const h = {
      ...u,
      transactions: u.transactions.map(({
        transaction: A,
        meta: E
      }) => {
        const S = new pn(A.message);
        return {
          meta: E,
          transaction: {
            ...A,
            message: S
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
        transaction: Tn.populate(A.message, A.signatures)
      }))
    };
  }
  /**
   * Fetch confirmed blocks between two slots
   */
  async getBlocks(t, e, n) {
    const i = this._buildArgsAtLeastConfirmed(e !== void 0 ? [t, e] : [t], n), s = await this._rpcRequest("getBlocks", i), u = rt(s, St(it(Z())));
    if ("error" in u)
      throw new ft(u.error, "failed to get blocks");
    return u.result;
  }
  /**
   * Fetch a list of Signatures from the cluster for a block, excluding rewards
   */
  async getBlockSignatures(t, e) {
    const n = this._buildArgsAtLeastConfirmed([t], e, void 0, {
      transactionDetails: "signatures",
      rewards: !1
    }), i = await this._rpcRequest("getBlock", n), s = rt(i, Ra);
    if ("error" in s)
      throw new ft(s.error, "failed to get block");
    const u = s.result;
    if (!u)
      throw new Error("Block " + t + " not found");
    return u;
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
    }), i = await this._rpcRequest("getBlock", n), s = rt(i, Ra);
    if ("error" in s)
      throw new ft(s.error, "failed to get confirmed block");
    const u = s.result;
    if (!u)
      throw new Error("Confirmed block " + t + " not found");
    return u;
  }
  /**
   * Fetch a transaction details for a confirmed transaction
   *
   * @deprecated Deprecated since RPC v1.7.0. Please use {@link getTransaction} instead.
   */
  async getConfirmedTransaction(t, e) {
    const n = this._buildArgsAtLeastConfirmed([t], e), i = await this._rpcRequest("getTransaction", n), s = rt(i, ks);
    if ("error" in s)
      throw new ft(s.error, "failed to get transaction");
    const u = s.result;
    if (!u) return u;
    const h = new pn(u.transaction.message), A = u.transaction.signatures;
    return {
      ...u,
      transaction: Tn.populate(h, A)
    };
  }
  /**
   * Fetch parsed transaction details for a confirmed transaction
   *
   * @deprecated Deprecated since RPC v1.7.0. Please use {@link getParsedTransaction} instead.
   */
  async getParsedConfirmedTransaction(t, e) {
    const n = this._buildArgsAtLeastConfirmed([t], e, "jsonParsed"), i = await this._rpcRequest("getTransaction", n), s = rt(i, Vr);
    if ("error" in s)
      throw new ft(s.error, "failed to get confirmed transaction");
    return s.result;
  }
  /**
   * Fetch parsed transaction details for a batch of confirmed transactions
   *
   * @deprecated Deprecated since RPC v1.7.0. Please use {@link getParsedTransactions} instead.
   */
  async getParsedConfirmedTransactions(t, e) {
    const n = t.map((u) => ({
      methodName: "getTransaction",
      args: this._buildArgsAtLeastConfirmed([u], e, "jsonParsed")
    }));
    return (await this._rpcBatchRequest(n)).map((u) => {
      const h = rt(u, Vr);
      if ("error" in h)
        throw new ft(h.error, "failed to get confirmed transactions");
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
    let u = await this.getSlot("finalized");
    for (; !("before" in i) && (n++, !(n > u)); )
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
    const i = this._buildArgsAtLeastConfirmed([t.toBase58()], n, void 0, e), s = await this._rpcRequest("getConfirmedSignaturesForAddress2", i), u = rt(s, Ad);
    if ("error" in u)
      throw new ft(u.error, "failed to get confirmed signatures for address");
    return u.result;
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
    const i = this._buildArgsAtLeastConfirmed([t.toBase58()], n, void 0, e), s = await this._rpcRequest("getSignaturesForAddress", i), u = rt(s, pd);
    if ("error" in u)
      throw new ft(u.error, "failed to get signatures for address");
    return u.result;
  }
  async getAddressLookupTable(t, e) {
    const {
      context: n,
      value: i
    } = await this.getAccountInfoAndContext(t, e);
    let s = null;
    return i !== null && (s = new ka({
      key: t,
      state: ka.deserialize(i.data)
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
    return i !== null && (s = Io.fromAccountData(i.data)), {
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
    const n = await this._rpcRequest("requestAirdrop", [t.toBase58(), e]), i = rt(n, Yd);
    if ("error" in i)
      throw new ft(i.error, `airdrop to ${t.toBase58()} failed`);
    return i.result;
  }
  /**
   * @internal
   */
  async _blockhashWithExpiryBlockHeight(t) {
    if (!t) {
      for (; this._pollingBlockhash; )
        await er(100);
      const n = Date.now() - this._blockhashInfo.lastFetch >= O0;
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
        await er(E0 / 2);
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
    } = Dt(t), i = this._buildArgs([], e, "base64", n), s = await this._rpcRequest("getStakeMinimumDelegation", i), u = rt(s, Gt(Z()));
    if ("error" in u)
      throw new ft(u.error, "failed to get stake minimum delegation");
    return u.result;
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
      const O = t.serialize(), L = pt.Buffer.from(O).toString("base64");
      if (Array.isArray(e) || n !== void 0)
        throw new Error("Invalid arguments");
      const Y = e || {};
      Y.encoding = "base64", "commitment" in Y || (Y.commitment = this.commitment), e && typeof e == "object" && "innerInstructions" in e && (Y.innerInstructions = e.innerInstructions);
      const Q = [L, Y], q = await this._rpcRequest("simulateTransaction", Q), K = rt(q, Ta);
      if ("error" in K)
        throw new Error("failed to simulate transaction: " + K.error.message);
      return K.result;
    }
    let i;
    if (t instanceof Tn) {
      let F = t;
      i = new Tn(), i.feePayer = F.feePayer, i.instructions = t.instructions, i.nonceInfo = F.nonceInfo, i.signatures = F.signatures;
    } else
      i = Tn.populate(t), i._message = i._json = void 0;
    if (e !== void 0 && !Array.isArray(e))
      throw new Error("Invalid arguments");
    const s = e;
    if (i.nonceInfo && s)
      i.sign(...s);
    else {
      let F = this._disableBlockhashCaching;
      for (; ; ) {
        const O = await this._blockhashWithExpiryBlockHeight(F);
        if (i.lastValidBlockHeight = O.lastValidBlockHeight, i.recentBlockhash = O.blockhash, !s) break;
        if (i.sign(...s), !i.signature)
          throw new Error("!signature");
        const L = i.signature.toString("base64");
        if (!this._blockhashInfo.simulatedSignatures.includes(L) && !this._blockhashInfo.transactionSignatures.includes(L)) {
          this._blockhashInfo.simulatedSignatures.push(L);
          break;
        } else
          F = !0;
      }
    }
    const u = i._compile(), h = u.serialize(), E = i._serialize(h).toString("base64"), S = {
      encoding: "base64",
      commitment: this.commitment
    };
    if (n) {
      const F = (Array.isArray(n) ? n : u.nonProgramIds()).map((O) => O.toBase58());
      S.accounts = {
        encoding: "base64",
        addresses: F
      };
    }
    s && (S.sigVerify = !0), e && typeof e == "object" && "innerInstructions" in e && (S.innerInstructions = e.innerInstructions);
    const N = [E, S], P = await this._rpcRequest("simulateTransaction", N), U = rt(P, Ta);
    if ("error" in U) {
      let F;
      if ("data" in U.error && (F = U.error.data.logs, F && Array.isArray(F))) {
        const O = `
    `, L = O + F.join(O);
        console.error(U.error.message, L);
      }
      throw new Ma({
        action: "simulate",
        signature: "",
        transactionMessage: U.error.message,
        logs: F
      });
    }
    return U.result;
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
      const u = t.serialize();
      return await this.sendRawTransaction(u, e);
    }
    if (e === void 0 || !Array.isArray(e))
      throw new Error("Invalid arguments");
    const i = e;
    if (t.nonceInfo)
      t.sign(...i);
    else {
      let u = this._disableBlockhashCaching;
      for (; ; ) {
        const h = await this._blockhashWithExpiryBlockHeight(u);
        if (t.lastValidBlockHeight = h.lastValidBlockHeight, t.recentBlockhash = h.blockhash, t.sign(...i), !t.signature)
          throw new Error("!signature");
        const A = t.signature.toString("base64");
        if (this._blockhashInfo.transactionSignatures.includes(A))
          u = !0;
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
    const n = dr(t).toString("base64");
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
    const u = [t, n], h = await this._rpcRequest("sendTransaction", u), A = rt(h, Zd);
    if ("error" in A) {
      let E;
      throw "data" in A.error && (E = A.error.data.logs), new Ma({
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
                  method: u
                } = i;
                try {
                  this._setSubscription(n, {
                    ...i,
                    state: "subscribing"
                  });
                  const h = await this._rpcWebSocket.call(u, s);
                  this._setSubscription(n, {
                    ...i,
                    serverSubscriptionId: h,
                    state: "subscribed"
                  }), this._subscriptionCallbacksByServerSubscriptionId[h] = i.callbacks, await this._updateSubscriptions();
                } catch (h) {
                  if (console.error(`Received ${h instanceof Error ? "" : "JSON-RPC "}error calling \`${u}\``, {
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
                  unsubscribeMethod: u
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
                    await this._rpcWebSocket.call(u, [s]);
                  } catch (h) {
                    if (h instanceof Error && console.error(`${u} error:`, h.message), !e())
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
    } = rt(t, wd);
    this._handleServerNotification(n, [e.value, e.context]);
  }
  /**
   * @internal
   */
  _makeSubscription(t, e) {
    const n = this._nextClientSubscriptionId++, i = Ba([t.method, e]), s = this._subscriptionsByHash[i];
    return s === void 0 ? this._subscriptionsByHash[i] = {
      ...t,
      args: e,
      callbacks: /* @__PURE__ */ new Set([t.callback]),
      state: "pending"
    } : s.callbacks.add(t.callback), this._subscriptionHashByClientSubscriptionId[n] = i, this._subscriptionDisposeFunctionsByClientSubscriptionId[n] = async () => {
      delete this._subscriptionDisposeFunctionsByClientSubscriptionId[n], delete this._subscriptionHashByClientSubscriptionId[n];
      const u = this._subscriptionsByHash[i];
      Ft(u !== void 0, `Could not find a \`Subscription\` when tearing down client subscription #${n}`), u.callbacks.delete(t.callback), await this._updateSubscriptions();
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
    } = Dt(n), u = this._buildArgs(
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
    }, u);
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
    } = rt(t, md);
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
      config: u
    } = Dt(n), h = this._buildArgs(
      [t.toBase58()],
      s || this._commitment || "finalized",
      // Apply connection/server default.
      "base64",
      u || (i ? {
        filters: Na(i)
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
    } = rt(t, Jd);
    this._handleServerNotification(n, [e.value, e.context]);
  }
  /**
   * @internal
   */
  _wsOnSlotNotification(t) {
    const {
      result: e,
      subscription: n
    } = rt(t, Ed);
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
    } = rt(t, vd);
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
      let u = {};
      n && (u.encoding = n), s && (u.commitment = s), i && (u = Object.assign(u, i)), t.push(u);
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
    } = rt(t, Sd);
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
      callback: (u, h) => {
        if (u.type === "status") {
          e(u.result, h);
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
    }, u = this._buildArgs([t], i, void 0, s), h = this._makeSubscription({
      callback: (A, E) => {
        e(A, E);
        try {
          this.removeSignatureListener(h);
        } catch {
        }
      },
      method: "signatureSubscribe",
      unsubscribeMethod: "signatureUnsubscribe"
    }, u);
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
    } = rt(t, Md);
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
    layout: _.struct([_.u32("instruction"), gr("recentSlot"), _.u8("bumpSeed")])
  },
  FreezeLookupTable: {
    index: 1,
    layout: _.struct([_.u32("instruction")])
  },
  ExtendLookupTable: {
    index: 2,
    layout: _.struct([_.u32("instruction"), gr(), _.seq(Mt(), _.offset(_.u32(), -8), "addresses")])
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
new dt("AddressLookupTab1e1111111111111111111111111");
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
    layout: _.struct([_.u8("instruction"), gr("microLamports")])
  }
});
new dt("ComputeBudget111111111111111111111111111111");
_.struct([_.u8("numSignatures"), _.u8("padding"), _.u16("signatureOffset"), _.u16("signatureInstructionIndex"), _.u16("publicKeyOffset"), _.u16("publicKeyInstructionIndex"), _.u16("messageDataOffset"), _.u16("messageDataSize"), _.u16("messageInstructionIndex")]);
new dt("Ed25519SigVerify111111111111111111111111111");
a0.utils.isValidPrivateKey;
_.struct([_.u8("numSignatures"), _.u16("signatureOffset"), _.u8("signatureInstructionIndex"), _.u16("ethAddressOffset"), _.u8("ethAddressInstructionIndex"), _.u16("messageDataOffset"), _.u16("messageDataSize"), _.u8("messageInstructionIndex"), _.blob(20, "ethAddress"), _.blob(64, "signature"), _.u8("recoveryId")]);
new dt("KeccakSecp256k11111111111111111111111111111");
var qc;
new dt("StakeConfig11111111111111111111111111111111");
class Yc {
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
qc = Yc;
Yc.default = new qc(0, 0, dt.default);
Object.freeze({
  Initialize: {
    index: 0,
    layout: _.struct([_.u32("instruction"), d0(), g0()])
  },
  Authorize: {
    index: 1,
    layout: _.struct([_.u32("instruction"), Mt("newAuthorized"), _.u32("stakeAuthorizationType")])
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
    layout: _.struct([_.u32("instruction"), Mt("newAuthorized"), _.u32("stakeAuthorizationType"), nr("authoritySeed"), Mt("authorityOwner")])
  }
});
new dt("Stake11111111111111111111111111111111111111");
Object.freeze({
  InitializeAccount: {
    index: 0,
    layout: _.struct([_.u32("instruction"), A0()])
  },
  Authorize: {
    index: 1,
    layout: _.struct([_.u32("instruction"), Mt("newAuthorized"), _.u32("voteAuthorizationType")])
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
    layout: _.struct([_.u32("instruction"), p0()])
  }
});
new dt("Vote111111111111111111111111111111111111111");
new dt("Va1idator1nfo111111111111111111111111111111");
$({
  name: et(),
  website: mt(et()),
  details: mt(et()),
  iconUrl: mt(et()),
  keybaseUsername: mt(et())
});
new dt("Vote111111111111111111111111111111111111111");
_.struct([
  Mt("nodePubkey"),
  Mt("authorizedWithdrawer"),
  _.u8("commission"),
  _.nu64(),
  // votes.length
  _.seq(_.struct([_.nu64("slot"), _.u32("confirmationCount")]), _.offset(_.u32(), -8), "votes"),
  _.u8("rootSlotValid"),
  _.nu64("rootSlot"),
  _.nu64(),
  // authorizedVoters.length
  _.seq(_.struct([_.nu64("epoch"), Mt("authorizedVoter")]), _.offset(_.u32(), -8), "authorizedVoters"),
  _.struct([_.seq(_.struct([Mt("authorizedPubkey"), _.nu64("epochOfLastAuthorizedSwitch"), _.nu64("targetEpoch")]), 32, "buf"), _.nu64("idx"), _.u8("isEmpty")], "priorVoters"),
  _.nu64(),
  // epochCredits.length
  _.seq(_.struct([_.nu64("epoch"), _.nu64("credits"), _.nu64("prevCredits")]), _.offset(_.u32(), -8), "epochCredits"),
  _.struct([_.nu64("slot"), _.nu64("timestamp")], "lastTimestamp")
]);
const Oa = 1e9, Xd = "Phantom";
class $d extends ao {
  constructor(t = {}) {
    super(), this.name = Xd, this.url = "https://phantom.app", this.icon = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDgiIGhlaWdodD0iMTA4IiB2aWV3Qm94PSIwIDAgMTA4IDEwOCIgZmlsbD0ibm9uZSI+CjxyZWN0IHdpZHRoPSIxMDgiIGhlaWdodD0iMTA4IiByeD0iMjYiIGZpbGw9IiNBQjlGRjIiLz4KPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik00Ni41MjY3IDY5LjkyMjlDNDIuMDA1NCA3Ni44NTA5IDM0LjQyOTIgODUuNjE4MiAyNC4zNDggODUuNjE4MkMxOS41ODI0IDg1LjYxODIgMTUgODMuNjU2MyAxNSA3NS4xMzQyQzE1IDUzLjQzMDUgNDQuNjMyNiAxOS44MzI3IDcyLjEyNjggMTkuODMyN0M4Ny43NjggMTkuODMyNyA5NCAzMC42ODQ2IDk0IDQzLjAwNzlDOTQgNTguODI1OCA4My43MzU1IDc2LjkxMjIgNzMuNTMyMSA3Ni45MTIyQzcwLjI5MzkgNzYuOTEyMiA2OC43MDUzIDc1LjEzNDIgNjguNzA1MyA3Mi4zMTRDNjguNzA1MyA3MS41NzgzIDY4LjgyNzUgNzAuNzgxMiA2OS4wNzE5IDY5LjkyMjlDNjUuNTg5MyA3NS44Njk5IDU4Ljg2ODUgODEuMzg3OCA1Mi41NzU0IDgxLjM4NzhDNDcuOTkzIDgxLjM4NzggNDUuNjcxMyA3OC41MDYzIDQ1LjY3MTMgNzQuNDU5OEM0NS42NzEzIDcyLjk4ODQgNDUuOTc2OCA3MS40NTU2IDQ2LjUyNjcgNjkuOTIyOVpNODMuNjc2MSA0Mi41Nzk0QzgzLjY3NjEgNDYuMTcwNCA4MS41NTc1IDQ3Ljk2NTggNzkuMTg3NSA0Ny45NjU4Qzc2Ljc4MTYgNDcuOTY1OCA3NC42OTg5IDQ2LjE3MDQgNzQuNjk4OSA0Mi41Nzk0Qzc0LjY5ODkgMzguOTg4NSA3Ni43ODE2IDM3LjE5MzEgNzkuMTg3NSAzNy4xOTMxQzgxLjU1NzUgMzcuMTkzMSA4My42NzYxIDM4Ljk4ODUgODMuNjc2MSA0Mi41Nzk0Wk03MC4yMTAzIDQyLjU3OTVDNzAuMjEwMyA0Ni4xNzA0IDY4LjA5MTYgNDcuOTY1OCA2NS43MjE2IDQ3Ljk2NThDNjMuMzE1NyA0Ny45NjU4IDYxLjIzMyA0Ni4xNzA0IDYxLjIzMyA0Mi41Nzk1QzYxLjIzMyAzOC45ODg1IDYzLjMxNTcgMzcuMTkzMSA2NS43MjE2IDM3LjE5MzFDNjguMDkxNiAzNy4xOTMxIDcwLjIxMDMgMzguOTg4NSA3MC4yMTAzIDQyLjU3OTVaIiBmaWxsPSIjRkZGREY4Ii8+Cjwvc3ZnPg==", this.supportedTransactionVersions = /* @__PURE__ */ new Set(["legacy", 0]), this._readyState = typeof window > "u" || typeof document > "u" ? Ut.Unsupported : Ut.NotDetected, this._disconnected = () => {
      const e = this._wallet;
      e && (e.off("disconnect", this._disconnected), e.off("accountChanged", this._accountChanged), this._wallet = null, this._publicKey = null, this.emit("error", new ro()), this.emit("disconnect"));
    }, this._accountChanged = (e) => {
      const n = this._publicKey;
      if (n) {
        try {
          e = new dt(e.toBytes());
        } catch (i) {
          this.emit("error", new Or(i?.message, i));
          return;
        }
        n.equals(e) || (this._publicKey = e, this.emit("connect", e));
      }
    }, this._connecting = !1, this._wallet = null, this._publicKey = null, this._readyState !== Ut.Unsupported && (Rs() ? (this._readyState = Ut.Loadable, this.emit("readyStateChange", this._readyState)) : oo(() => window.phantom?.solana?.isPhantom || window.solana?.isPhantom ? (this._readyState = Ut.Installed, this.emit("readyStateChange", this._readyState), !0) : !1));
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
        throw new no();
      this._connecting = !0;
      const t = window.phantom?.solana || window.solana;
      if (!t.isConnected)
        try {
          await t.connect();
        } catch (n) {
          throw new ai(n?.message, n);
        }
      if (!t.publicKey)
        throw new Va();
      let e;
      try {
        e = new dt(t.publicKey.toBytes());
      } catch (n) {
        throw new Or(n?.message, n);
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
        this.emit("error", new io(e?.message, e));
      }
    }
    this.emit("disconnect");
  }
  async sendTransaction(t, e, n = {}) {
    try {
      const i = this._wallet;
      if (!i)
        throw new ke();
      try {
        const { signers: s, ...u } = n;
        ci(t) ? s?.length && t.sign(s) : (t = await this.prepareTransaction(t, e, u), s?.length && t.partialSign(...s)), u.preflightCommitment = u.preflightCommitment || e.commitment;
        const { signature: h } = await i.signAndSendTransaction(t, u);
        return h;
      } catch (s) {
        throw s instanceof Ue ? s : new Qn(s?.message, s);
      }
    } catch (i) {
      throw this.emit("error", i), i;
    }
  }
  async signTransaction(t) {
    try {
      const e = this._wallet;
      if (!e)
        throw new ke();
      try {
        return await e.signTransaction(t) || t;
      } catch (n) {
        throw new nn(n?.message, n);
      }
    } catch (e) {
      throw this.emit("error", e), e;
    }
  }
  async signAllTransactions(t) {
    try {
      const e = this._wallet;
      if (!e)
        throw new ke();
      try {
        return await e.signAllTransactions(t) || t;
      } catch (n) {
        throw new nn(n?.message, n);
      }
    } catch (e) {
      throw this.emit("error", e), e;
    }
  }
  async signMessage(t) {
    try {
      const e = this._wallet;
      if (!e)
        throw new ke();
      try {
        const { signature: n } = await e.signMessage(t);
        return n;
      } catch (n) {
        throw new so(n?.message, n);
      }
    } catch (e) {
      throw this.emit("error", e), e;
    }
  }
}
var tg = function(r, t, e, n) {
  if (e === "a" && !n) throw new TypeError("Private accessor was defined without a getter");
  if (typeof t == "function" ? r !== t || !n : !t.has(r)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
  return e === "m" ? n : e === "a" ? n.call(r) : n ? n.value : t.get(r);
}, eg = function(r, t, e, n, i) {
  if (n === "m") throw new TypeError("Private method is not writable");
  if (n === "a" && !i) throw new TypeError("Private accessor was defined without a setter");
  if (typeof t == "function" ? r !== t || !i : !t.has(r)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
  return n === "a" ? i.call(r, e) : i ? i.value = e : t.set(r, e), e;
}, ii;
function ng(r) {
  const t = ({ register: e }) => e(r);
  try {
    window.dispatchEvent(new rg(t));
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
class rg extends Event {
  get detail() {
    return tg(this, ii, "f");
  }
  get type() {
    return "wallet-standard:register-wallet";
  }
  constructor(t) {
    super("wallet-standard:register-wallet", {
      bubbles: !1,
      cancelable: !1,
      composed: !1
    }), ii.set(this, void 0), eg(this, ii, t, "f");
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
ii = /* @__PURE__ */ new WeakMap();
const ig = "solana:mainnet", sg = "solana:devnet", og = "solana:testnet", ag = "data:image/svg+xml;base64,PHN2ZyBmaWxsPSJub25lIiBoZWlnaHQ9IjMxIiB2aWV3Qm94PSIwIDAgMzEgMzEiIHdpZHRoPSIzMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+PGxpbmVhckdyYWRpZW50IGlkPSJhIiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgeDE9IjIwLjI1IiB4Mj0iMjYuNTcxIiB5MT0iMjcuMTczIiB5Mj0iMTkuODU4Ij48c3RvcCBvZmZzZXQ9Ii4wOCIgc3RvcC1jb2xvcj0iIzk5NDVmZiIvPjxzdG9wIG9mZnNldD0iLjMiIHN0b3AtY29sb3I9IiM4NzUyZjMiLz48c3RvcCBvZmZzZXQ9Ii41IiBzdG9wLWNvbG9yPSIjNTQ5N2Q1Ii8+PHN0b3Agb2Zmc2V0PSIuNiIgc3RvcC1jb2xvcj0iIzQzYjRjYSIvPjxzdG9wIG9mZnNldD0iLjcyIiBzdG9wLWNvbG9yPSIjMjhlMGI5Ii8+PHN0b3Agb2Zmc2V0PSIuOTciIHN0b3AtY29sb3I9IiMxOWZiOWIiLz48L2xpbmVhckdyYWRpZW50PjxnIHN0cm9rZS1saW5lam9pbj0icm91bmQiIHN0cm9rZS13aWR0aD0iLjA5NCI+PHBhdGggZD0ibTI2LjEwOSAzLjY0My05LjM2OSA2Ljk1OSAxLjczMy00LjEwNSA3LjYzNy0yLjg1M3oiIGZpbGw9IiNlMjc2MWIiIHN0cm9rZT0iI2UyNzYxYiIvPjxnIGZpbGw9IiNlNDc2MWIiIHN0cm9rZT0iI2U0NzYxYiI+PHBhdGggZD0ibTQuNDgxIDMuNjQzIDkuMjk0IDcuMDI0LTEuNjQ4LTQuMTcxem0xOC4yNTggMTYuMTMtMi40OTUgMy44MjMgNS4zMzkgMS40NjkgMS41MzUtNS4yMDctNC4zNzgtLjA4NXptLTE5LjI0Ny4wODUgMS41MjUgNS4yMDcgNS4zMzktMS40NjktMi40OTUtMy44MjN6Ii8+PHBhdGggZD0ibTEwLjA1NSAxMy4zMTMtMS40ODggMi4yNTEgNS4zMDEuMjM1LS4xODgtNS42OTd6bTEwLjQ4IDAtMy42NzItMy4yNzctLjEyMiA1Ljc2MyA1LjI5Mi0uMjM1LTEuNDk3LTIuMjUxem0tMTAuMTc4IDEwLjI4MyAzLjE4My0xLjU1NC0yLjc0OS0yLjE0Ny0uNDMzIDMuNzAxem02LjY5NS0xLjU1NCAzLjE5MiAxLjU1NC0uNDQzLTMuNzAxeiIvPjwvZz48cGF0aCBkPSJtMjAuMjQ0IDIzLjU5Ni0zLjE5Mi0xLjU1NC4yNTQgMi4wODEtLjAyOC44NzZ6bS05Ljg4NyAwIDIuOTY2IDEuNDAzLS4wMTktLjg3Ni4yMzUtMi4wODEtMy4xODMgMS41NTR6IiBmaWxsPSIjZDdjMWIzIiBzdHJva2U9IiNkN2MxYjMiLz48cGF0aCBkPSJtMTMuMzY5IDE4LjUyMS0yLjY1NS0uNzgxIDEuODc0LS44NTd6bTMuODUxIDAgLjc4MS0xLjYzOCAxLjg4My44NTctMi42NjUuNzgxeiIgZmlsbD0iIzIzMzQ0NyIgc3Ryb2tlPSIjMjMzNDQ3Ii8+PHBhdGggZD0ibTEwLjM1NyAyMy41OTYuNDUyLTMuODIzLTIuOTQ3LjA4NXptOS40MzUtMy44MjMuNDUyIDMuODIzIDIuNDk1LTMuNzM4em0yLjI0MS00LjIwOS01LjI5Mi4yMzUuNDkgMi43MjEuNzgyLTEuNjM4IDEuODgzLjg1N3ptLTExLjMxOCAyLjE3NSAxLjg4My0uODU3Ljc3MiAxLjYzOC40OTktMi43MjEtNS4zMDEtLjIzNXoiIGZpbGw9IiNjZDYxMTYiIHN0cm9rZT0iI2NkNjExNiIvPjxwYXRoIGQ9Im04LjU2NyAxNS41NjQgMi4yMjIgNC4zMzEtLjA3NS0yLjE1NnptMTEuMzI4IDIuMTc1LS4wOTQgMi4xNTYgMi4yMzItNC4zMzEtMi4xMzcgMi4xNzV6bS02LjAyNi0xLjk0LS40OTkgMi43MjEuNjIxIDMuMjExLjE0MS00LjIyOC0uMjY0LTEuNzA0em0yLjg3MiAwLS4yNTQgMS42OTUuMTEzIDQuMjM3LjYzMS0zLjIxMXoiIGZpbGw9IiNlNDc1MWYiIHN0cm9rZT0iI2U0NzUxZiIvPjxwYXRoIGQ9Im0xNy4yMyAxOC41Mi0uNjMxIDMuMjExLjQ1Mi4zMTEgMi43NS0yLjE0Ny4wOTQtMi4xNTZ6bS02LjUxNi0uNzgxLjA3NSAyLjE1NiAyLjc1IDIuMTQ3LjQ1Mi0uMzExLS42MjItMy4yMTF6IiBmaWxsPSIjZjY4NTFiIiBzdHJva2U9IiNmNjg1MWIiLz48cGF0aCBkPSJtMTcuMjc3IDI0Ljk5OS4wMjgtLjg3Ni0uMjM1LS4yMDdoLTMuNTVsLS4yMTcuMjA3LjAxOS44NzYtMi45NjYtMS40MDMgMS4wMzYuODQ4IDIuMSAxLjQ1OWgzLjYwNmwyLjEwOS0xLjQ1OSAxLjAzNi0uODQ4eiIgZmlsbD0iI2MwYWQ5ZSIgc3Ryb2tlPSIjYzBhZDllIi8+PHBhdGggZD0ibTE3LjA1MSAyMi4wNDItLjQ1Mi0uMzExaC0yLjYwOGwtLjQ1Mi4zMTEtLjIzNSAyLjA4MS4yMTctLjIwN2gzLjU1bC4yMzUuMjA3LS4yNTQtMi4wODF6IiBmaWxsPSIjMTYxNjE2IiBzdHJva2U9IiMxNjE2MTYiLz48cGF0aCBkPSJtMjYuNTA1IDExLjA1My44LTMuODQyLTEuMTk2LTMuNTY5LTkuMDU4IDYuNzIzIDMuNDg0IDIuOTQ3IDQuOTI1IDEuNDQxIDEuMDkyLTEuMjcxLS40NzEtLjMzOS43NTMtLjY4Ny0uNTg0LS40NTIuNzUzLS41NzQtLjQ5OS0uMzc3em0tMjMuMjExLTMuODQxLjggMy44NDItLjUwOC4zNzcuNzUzLjU3NC0uNTc0LjQ1Mi43NTMuNjg3LS40NzEuMzM5IDEuMDgzIDEuMjcxIDQuOTI1LTEuNDQxIDMuNDg0LTIuOTQ3LTkuMDU5LTYuNzIzeiIgZmlsbD0iIzc2M2QxNiIgc3Ryb2tlPSIjNzYzZDE2Ii8+PHBhdGggZD0ibTI1LjQ2IDE0Ljc1NC00LjkyNS0xLjQ0MSAxLjQ5NyAyLjI1MS0yLjIzMiA0LjMzMSAyLjkzOC0uMDM4aDQuMzc4bC0xLjY1Ny01LjEwNHptLTE1LjQwNS0xLjQ0MS00LjkyNSAxLjQ0MS0xLjYzOCA1LjEwNGg0LjM2OWwyLjkyOC4wMzgtMi4yMjItNC4zMzEgMS40ODgtMi4yNTF6bTYuNjg1IDIuNDg2LjMxMS01LjQzMyAxLjQzMS0zLjg3aC02LjM1NmwxLjQxMyAzLjg3LjMyOSA1LjQzMy4xMTMgMS43MTQuMDA5IDQuMjE5aDIuNjFsLjAxOS00LjIxOS4xMjItMS43MTR6IiBmaWxsPSIjZjY4NTFiIiBzdHJva2U9IiNmNjg1MWIiLz48L2c+PGNpcmNsZSBjeD0iMjMuNSIgY3k9IjIzLjUiIGZpbGw9IiMwMDAiIHI9IjYuNSIvPjxwYXRoIGQ9Im0yNy40NzMgMjUuNTQ1LTEuMzEgMS4zNjhjLS4wMjkuMDMtLjA2My4wNTMtLjEwMS4wN2EuMzEuMzEgMCAwIDEgLS4xMjEuMDI0aC02LjIwOWMtLjAzIDAtLjA1OS0uMDA4LS4wODMtLjAyNGEuMTUuMTUgMCAwIDEgLS4wNTYtLjA2NWMtLjAxMi0uMDI2LS4wMTUtLjA1Ni0uMDEtLjA4NHMuMDE4LS4wNTUuMDM5LS4wNzZsMS4zMTEtMS4zNjhjLjAyOC0uMDMuMDYzLS4wNTMuMTAxLS4wNjlhLjMxLjMxIDAgMCAxIC4xMjEtLjAyNWg2LjIwOGMuMDMgMCAuMDU5LjAwOC4wODMuMDI0YS4xNS4xNSAwIDAgMSAuMDU2LjA2NWMuMDEyLjAyNi4wMTUuMDU2LjAxLjA4NHMtLjAxOC4wNTUtLjAzOS4wNzZ6bS0xLjMxLTIuNzU2Yy0uMDI5LS4wMy0uMDYzLS4wNTMtLjEwMS0uMDdhLjMxLjMxIDAgMCAwIC0uMTIxLS4wMjRoLTYuMjA5Yy0uMDMgMC0uMDU5LjAwOC0uMDgzLjAyNHMtLjA0NC4wMzgtLjA1Ni4wNjUtLjAxNS4wNTYtLjAxLjA4NC4wMTguMDU1LjAzOS4wNzZsMS4zMTEgMS4zNjhjLjAyOC4wMy4wNjMuMDUzLjEwMS4wNjlhLjMxLjMxIDAgMCAwIC4xMjEuMDI1aDYuMjA4Yy4wMyAwIC4wNTktLjAwOC4wODMtLjAyNGEuMTUuMTUgMCAwIDAgLjA1Ni0uMDY1Yy4wMTItLjAyNi4wMTUtLjA1Ni4wMS0uMDg0cy0uMDE4LS4wNTUtLjAzOS0uMDc2em0tNi40MzEtLjk4M2g2LjIwOWEuMzEuMzEgMCAwIDAgLjEyMS0uMDI0Yy4wMzgtLjAxNi4wNzMtLjA0LjEwMS0uMDdsMS4zMS0xLjM2OGMuMDItLjAyMS4wMzQtLjA0Ny4wMzktLjA3NnMuMDAxLS4wNTgtLjAxLS4wODRhLjE1LjE1IDAgMCAwIC0uMDU2LS4wNjVjLS4wMjUtLjAxNi0uMDU0LS4wMjQtLjA4My0uMDI0aC02LjIwOGEuMzEuMzEgMCAwIDAgLS4xMjEuMDI1Yy0uMDM4LjAxNi0uMDcyLjA0LS4xMDEuMDY5bC0xLjMxIDEuMzY4Yy0uMDIuMDIxLS4wMzQuMDQ3LS4wMzkuMDc2cy0uMDAxLjA1OC4wMS4wODQuMDMxLjA0OS4wNTYuMDY1LjA1NC4wMjQuMDgzLjAyNHoiIGZpbGw9InVybCgjYSkiLz48L3N2Zz4=";
var Nt = function(r, t, e, n) {
  if (e === "a" && !n) throw new TypeError("Private accessor was defined without a getter");
  if (typeof t == "function" ? r !== t || !n : !t.has(r)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
  return e === "m" ? n : e === "a" ? n.call(r) : n ? n.value : t.get(r);
}, cg = function(r, t, e, n, i) {
  if (n === "m") throw new TypeError("Private method is not writable");
  if (n === "a" && !i) throw new TypeError("Private accessor was defined without a setter");
  if (typeof t == "function" ? r !== t || !i : !t.has(r)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
  return n === "a" ? i.call(r, e) : i ? i.value = e : t.set(r, e), e;
}, si, _n, qs, Ys, Zs, Ce, Gs, Zc, Gc, Js, Ks, Vs, Xs, $s;
class ug {
  constructor() {
    si.add(this), _n.set(this, {}), qs.set(this, "1.0.0"), Ys.set(this, "MetaMask"), Zs.set(this, ag), Ce.set(this, null), Gs.set(this, (t, e) => (Nt(this, _n, "f")[t]?.push(e) || (Nt(this, _n, "f")[t] = [e]), () => Nt(this, si, "m", Gc).call(this, t, e))), Js.set(this, async () => {
      if (!Nt(this, Ce, "f")) {
        let t;
        try {
          t = (await import("./index-DkpRPwnr.js")).default;
        } catch {
          throw new Error("Unable to load Solflare MetaMask SDK");
        }
        cg(this, Ce, new t(), "f"), Nt(this, Ce, "f").on("standard_change", (e) => Nt(this, si, "m", Zc).call(this, "change", e));
      }
      return this.accounts.length || await Nt(this, Ce, "f").connect(), { accounts: this.accounts };
    }), Ks.set(this, async () => {
      Nt(this, Ce, "f") && await Nt(this, Ce, "f").disconnect();
    }), Vs.set(this, async (...t) => {
      if (!Nt(this, Ce, "f"))
        throw new ke();
      return await Nt(this, Ce, "f").standardSignAndSendTransaction(...t);
    }), Xs.set(this, async (...t) => {
      if (!Nt(this, Ce, "f"))
        throw new ke();
      return await Nt(this, Ce, "f").standardSignTransaction(...t);
    }), $s.set(this, async (...t) => {
      if (!Nt(this, Ce, "f"))
        throw new ke();
      return await Nt(this, Ce, "f").standardSignMessage(...t);
    });
  }
  get version() {
    return Nt(this, qs, "f");
  }
  get name() {
    return Nt(this, Ys, "f");
  }
  get icon() {
    return Nt(this, Zs, "f");
  }
  get chains() {
    return [ig, sg, og];
  }
  get features() {
    return {
      [hl]: {
        version: "1.0.0",
        connect: Nt(this, Js, "f")
      },
      [fl]: {
        version: "1.0.0",
        disconnect: Nt(this, Ks, "f")
      },
      [dl]: {
        version: "1.0.0",
        on: Nt(this, Gs, "f")
      },
      [cl]: {
        version: "1.0.0",
        supportedTransactionVersions: ["legacy", 0],
        signAndSendTransaction: Nt(this, Vs, "f")
      },
      [ll]: {
        version: "1.0.0",
        supportedTransactionVersions: ["legacy", 0],
        signTransaction: Nt(this, Xs, "f")
      },
      [ul]: {
        version: "1.0.0",
        signMessage: Nt(this, $s, "f")
      }
    };
  }
  get accounts() {
    return Nt(this, Ce, "f") ? Nt(this, Ce, "f").standardAccounts : [];
  }
}
_n = /* @__PURE__ */ new WeakMap(), qs = /* @__PURE__ */ new WeakMap(), Ys = /* @__PURE__ */ new WeakMap(), Zs = /* @__PURE__ */ new WeakMap(), Ce = /* @__PURE__ */ new WeakMap(), Gs = /* @__PURE__ */ new WeakMap(), Js = /* @__PURE__ */ new WeakMap(), Ks = /* @__PURE__ */ new WeakMap(), Vs = /* @__PURE__ */ new WeakMap(), Xs = /* @__PURE__ */ new WeakMap(), $s = /* @__PURE__ */ new WeakMap(), si = /* @__PURE__ */ new WeakSet(), Zc = function(t, ...e) {
  Nt(this, _n, "f")[t]?.forEach((n) => n.apply(null, e));
}, Gc = function(t, e) {
  Nt(this, _n, "f")[t] = Nt(this, _n, "f")[t]?.filter((n) => e !== n);
};
let Da = !1;
function lg() {
  Da || (ng(new ug()), Da = !0);
}
async function hg() {
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
    i?.target === "metamask-inpage" && i.data?.name === "metamask-provider" && (i.data.data?.id === r ? (window.removeEventListener("message", e), i.data.data.error || lg()) : t());
  }
  window.addEventListener("message", e), window.setTimeout(() => window.removeEventListener("message", e), 5e3), t();
}
const fg = "Solflare";
class dg extends ao {
  constructor(t = {}) {
    super(), this.name = fg, this.url = "https://solflare.com", this.icon = "data:image/svg+xml;base64,PHN2ZyBmaWxsPSJub25lIiBoZWlnaHQ9IjUwIiB2aWV3Qm94PSIwIDAgNTAgNTAiIHdpZHRoPSI1MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+PGxpbmVhckdyYWRpZW50IGlkPSJhIj48c3RvcCBvZmZzZXQ9IjAiIHN0b3AtY29sb3I9IiNmZmMxMGIiLz48c3RvcCBvZmZzZXQ9IjEiIHN0b3AtY29sb3I9IiNmYjNmMmUiLz48L2xpbmVhckdyYWRpZW50PjxsaW5lYXJHcmFkaWVudCBpZD0iYiIgZ3JhZGllbnRVbml0cz0idXNlclNwYWNlT25Vc2UiIHgxPSI2LjQ3ODM1IiB4Mj0iMzQuOTEwNyIgeGxpbms6aHJlZj0iI2EiIHkxPSI3LjkyIiB5Mj0iMzMuNjU5MyIvPjxyYWRpYWxHcmFkaWVudCBpZD0iYyIgY3g9IjAiIGN5PSIwIiBncmFkaWVudFRyYW5zZm9ybT0ibWF0cml4KDQuOTkyMTg4MzIgMTIuMDYzODc5NjMgLTEyLjE4MTEzNjU1IDUuMDQwNzEwNzQgMjIuNTIwMiAyMC42MTgzKSIgZ3JhZGllbnRVbml0cz0idXNlclNwYWNlT25Vc2UiIHI9IjEiIHhsaW5rOmhyZWY9IiNhIi8+PHBhdGggZD0ibTI1LjE3MDggNDcuOTEwNGMuNTI1IDAgLjk1MDcuNDIxLjk1MDcuOTQwM3MtLjQyNTcuOTQwMi0uOTUwNy45NDAyLS45NTA3LS40MjA5LS45NTA3LS45NDAyLjQyNTctLjk0MDMuOTUwNy0uOTQwM3ptLTEuMDMyOC00NC45MTU2NWMuNDY0Ni4wMzgzNi44Mzk4LjM5MDQuOTAyNy44NDY4MWwxLjEzMDcgOC4yMTU3NGMuMzc5OCAyLjcxNDMgMy42NTM1IDMuODkwNCA1LjY3NDMgMi4wNDU5bDExLjMyOTEtMTAuMzExNThjLjI3MzMtLjI0ODczLjY5ODktLjIzMTQ5Ljk1MDcuMDM4NTEuMjMwOS4yNDc3Mi4yMzc5LjYyNjk3LjAxNjEuODgyNzdsLTkuODc5MSAxMS4zOTU4Yy0xLjgxODcgMi4wOTQyLS40NzY4IDUuMzY0MyAyLjI5NTYgNS41OTc4bDguNzE2OC44NDAzYy40MzQxLjA0MTguNzUxNy40MjM0LjcwOTMuODUyNC0uMDM0OS4zNTM3LS4zMDc0LjYzOTUtLjY2MjguNjk0OWwtOS4xNTk0IDEuNDMwMmMtMi42NTkzLjM2MjUtMy44NjM2IDMuNTExNy0yLjEzMzkgNS41NTc2bDMuMjIgMy43OTYxYy4yNTk0LjMwNTguMjE4OC43NjE1LS4wOTA4IDEuMDE3OC0uMjYyMi4yMTcyLS42NDE5LjIyNTYtLjkxMzguMDIwM2wtMy45Njk0LTIuOTk3OGMtMi4xNDIxLTEuNjEwOS01LjIyOTctLjI0MTctNS40NTYxIDIuNDI0M2wtLjg3NDcgMTAuMzk3NmMtLjAzNjIuNDI5NS0uNDE3OC43NDg3LS44NTI1LjcxMy0uMzY5LS4wMzAzLS42NjcxLS4zMDk3LS43MTcxLS42NzIxbC0xLjM4NzEtMTAuMDQzN2MtLjM3MTctMi43MTQ0LTMuNjQ1NC0zLjg5MDQtNS42NzQzLTIuMDQ1OWwtMTIuMDUxOTUgMTAuOTc0Yy0uMjQ5NDcuMjI3MS0uNjM4MDkuMjExNC0uODY4LS4wMzUtLjIxMDk0LS4yMjYyLS4yMTczNS0uNTcyNC0uMDE0OTMtLjgwNmwxMC41MTgxOC0xMi4xMzg1YzEuODE4Ny0yLjA5NDIuNDg0OS01LjM2NDQtMi4yODc2LTUuNTk3OGwtOC43MTg3Mi0uODQwNWMtLjQzNDEzLS4wNDE4LS43NTE3Mi0uNDIzNS0uNzA5MzYtLjg1MjQuMDM0OTMtLjM1MzcuMzA3MzktLjYzOTQuNjYyNy0uNjk1bDkuMTUzMzgtMS40Mjk5YzIuNjU5NC0uMzYyNSAzLjg3MTgtMy41MTE3IDIuMTQyMS01LjU1NzZsLTIuMTkyLTIuNTg0MWMtLjMyMTctLjM3OTItLjI3MTMtLjk0NDMuMTEyNi0xLjI2MjEuMzI1My0uMjY5NC43OTYzLS4yNzk3IDEuMTMzNC0uMDI0OWwyLjY5MTggMi4wMzQ3YzIuMTQyMSAxLjYxMDkgNS4yMjk3LjI0MTcgNS40NTYxLTIuNDI0M2wuNzI0MS04LjU1OTk4Yy4wNDU3LS41NDA4LjUyNjUtLjk0MjU3IDEuMDczOS0uODk3Mzd6bS0yMy4xODczMyAyMC40Mzk2NWMuNTI1MDQgMCAuOTUwNjcuNDIxLjk1MDY3Ljk0MDNzLS40MjU2My45NDAzLS45NTA2Ny45NDAzYy0uNTI1MDQxIDAtLjk1MDY3LS40MjEtLjk1MDY3LS45NDAzcy40MjU2MjktLjk0MDMuOTUwNjctLjk0MDN6bTQ3LjY3OTczLS45NTQ3Yy41MjUgMCAuOTUwNy40MjEuOTUwNy45NDAzcy0uNDI1Ny45NDAyLS45NTA3Ljk0MDItLjk1MDctLjQyMDktLjk1MDctLjk0MDIuNDI1Ny0uOTQwMy45NTA3LS45NDAzem0tMjQuNjI5Ni0yMi40Nzk3Yy41MjUgMCAuOTUwNi40MjA5NzMuOTUwNi45NDAyNyAwIC41MTkzLS40MjU2Ljk0MDI3LS45NTA2Ljk0MDI3LS41MjUxIDAtLjk1MDctLjQyMDk3LS45NTA3LS45NDAyNyAwLS41MTkyOTcuNDI1Ni0uOTQwMjcuOTUwNy0uOTQwMjd6IiBmaWxsPSJ1cmwoI2IpIi8+PHBhdGggZD0ibTI0LjU3MSAzMi43NzkyYzQuOTU5NiAwIDguOTgwMi0zLjk3NjUgOC45ODAyLTguODgxOSAwLTQuOTA1My00LjAyMDYtOC44ODE5LTguOTgwMi04Ljg4MTlzLTguOTgwMiAzLjk3NjYtOC45ODAyIDguODgxOWMwIDQuOTA1NCA0LjAyMDYgOC44ODE5IDguOTgwMiA4Ljg4MTl6IiBmaWxsPSJ1cmwoI2MpIi8+PC9zdmc+", this.supportedTransactionVersions = /* @__PURE__ */ new Set(["legacy", 0]), this._readyState = typeof window > "u" || typeof document > "u" ? Ut.Unsupported : Ut.Loadable, this._disconnected = () => {
      const e = this._wallet;
      e && (e.off("disconnect", this._disconnected), this._wallet = null, this._publicKey = null, this.emit("error", new ro()), this.emit("disconnect"));
    }, this._accountChanged = (e) => {
      if (!e)
        return;
      const n = this._publicKey;
      if (n) {
        try {
          e = new dt(e.toBytes());
        } catch (i) {
          this.emit("error", new Or(i?.message, i));
          return;
        }
        n.equals(e) || (this._publicKey = e, this.emit("connect", e));
      }
    }, this._connecting = !1, this._publicKey = null, this._wallet = null, this._config = t, this._readyState !== Ut.Unsupported && (oo(() => window.solflare?.isSolflare || window.SolflareApp ? (this._readyState = Ut.Installed, this.emit("readyStateChange", this._readyState), !0) : !1), hg());
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
    this.readyState === Ut.Loadable && Rs() || await this.connect();
  }
  async connect() {
    try {
      if (this.connected || this.connecting)
        return;
      if (this._readyState !== Ut.Loadable && this._readyState !== Ut.Installed)
        throw new no();
      if (this.readyState === Ut.Loadable && Rs()) {
        const i = encodeURIComponent(window.location.href), s = encodeURIComponent(window.location.origin);
        window.location.href = `https://solflare.com/ul/v1/browse/${i}?ref=${s}`;
        return;
      }
      let t;
      try {
        t = (await import("./index-s9FC-NyL.js")).default;
      } catch (i) {
        throw new il(i?.message, i);
      }
      let e;
      try {
        e = new t({ network: this._config.network });
      } catch (i) {
        throw new sl(i?.message, i);
      }
      if (this._connecting = !0, !e.connected)
        try {
          await e.connect();
        } catch (i) {
          throw new ai(i?.message, i);
        }
      if (!e.publicKey)
        throw new ai();
      let n;
      try {
        n = new dt(e.publicKey.toBytes());
      } catch (i) {
        throw new Or(i?.message, i);
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
        this.emit("error", new io(e?.message, e));
      }
    }
    this.emit("disconnect");
  }
  async sendTransaction(t, e, n = {}) {
    try {
      const i = this._wallet;
      if (!i)
        throw new ke();
      try {
        const { signers: s, ...u } = n;
        return ci(t) ? s?.length && t.sign(s) : (t = await this.prepareTransaction(t, e, u), s?.length && t.partialSign(...s)), u.preflightCommitment = u.preflightCommitment || e.commitment, await i.signAndSendTransaction(t, u);
      } catch (s) {
        throw s instanceof Ue ? s : new Qn(s?.message, s);
      }
    } catch (i) {
      throw this.emit("error", i), i;
    }
  }
  async signTransaction(t) {
    try {
      const e = this._wallet;
      if (!e)
        throw new ke();
      try {
        return await e.signTransaction(t) || t;
      } catch (n) {
        throw new nn(n?.message, n);
      }
    } catch (e) {
      throw this.emit("error", e), e;
    }
  }
  async signAllTransactions(t) {
    try {
      const e = this._wallet;
      if (!e)
        throw new ke();
      try {
        return await e.signAllTransactions(t) || t;
      } catch (n) {
        throw new nn(n?.message, n);
      }
    } catch (e) {
      throw this.emit("error", e), e;
    }
  }
  async signMessage(t) {
    try {
      const e = this._wallet;
      if (!e)
        throw new ke();
      try {
        return await e.signMessage(t, "utf8");
      } catch (n) {
        throw new so(n?.message, n);
      }
    } catch (e) {
      throw this.emit("error", e), e;
    }
  }
}
const gg = "Backpack";
class Ag extends ao {
  constructor(t = {}) {
    super(), this.name = gg, this.url = "https://backpack.app", this.icon = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAYAAADDPmHLAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAbvSURBVHgB7Z1dUtxGEMf/LZH3fU0V4PUJQg4QVj5BnBOAT2BzAsMJAicwPoHJCRDrAxifgLVxVV73ObDqdEtsjKn4C8+0NDv9e7AxprRC85uvnp4RYYW5qKpxCVTcYKsgfiDfGjMwIsZIvh7d/lkmzAiYy5fzhultyZhdlagf1vU5VhjCiiGFXq01zYSJdqWgx/hB5AHN5I/6iuilyFBjxVgZAdqCZ34ORoVIqAzSOhxsvq6PsSIkL4A281LwL2IW/F1UhLKgRz/X9QyJUyBhuuae31gWviLjiPF1wxeX29vPkTjJtgAftrd3GHSMnmHw4eZ0uodESVKAoRT+kpQlSE6Ats/XZv/ONK5vZHC49+B1fYjESG4MUDKfYmCFr0ic4fmHqtpCYiQlgA66QsztIzFi5j+RGMl0AXebfgn0aOTuvGG8owIarZsXOj3ronlRuEYnn84CJLo4Lgi/QL/H/LHmy/RwI6GA0RoS4acFHi8kGieFXS/QhmijFfQXmH3uPy5lSkoLbIkYlfyzhuM4juM4juM4juMMj6TzATQ4JH9tlRqFk8BM2aV9RWHB9K5kzK/KLui0KqliSQmgBa4BIS54cpMD0OeawFye3jk19JdKkWq62OAFkEIfrTXNUxBV1okf38Ot3MGjlFqHwQrQZvQ22Cfw7xjg6t8XkZaBGzpKIXdwcAJojZeCP5SC30HipJBEOigBZLn3qdzSPlKr8V9hyEmkgxCgj8zefuD9jen0AAOidwE0i6ZhfjXgRI+gDK016DUjqE3ubPhNLoWvaDLJouHToaSP9SbA0DJ7LekyiviNPgP0TC9dQM6FfxeZ7eyuT6cv0RPmAmjTx11uXx/MiegEDd425cfcwWV+H4O3+uiO+pTAVIA2uMN8av6QiWr5TQ++JVlTc/tEiF3jOMScZGC43kME0VSA95PJhWXhM+Gt1Phn98nStZa1r9mB2SDQPqefjhayfnDfFG2J5882z84eynVM5u3thlONhRhj0gLc5PRfwAw62JjW+wjE5Xa1L0VkshO4kXt/EPDev4ZJCyBRvlcwggjHG4EfYHc9OoIBBWy3mEUX4H1V7Ur7ZvILaT8qy7FRduleF9jXc4RggOUWs/gtANs0nYquvMXaMaTXlQHlE1ggayLvf5OKY0DUMYDWfmpsBjZa+9enOmiLy+VkcmqxaNW2ZgX9GnsLXNQWoGj4KYzQ2g8LyG5WUDR4hshEE6CN+AFmg5lFiRMYcI0uKRQGyIAwegWKJkBjYO8tzq12C7efQ7CK2I00MomIxOsCiCcwQhaW3sEQ6W7sPi/yIDqKAHp8m2nIF7COoc9ghQw4NU8SkYgiQCmLKXCCUSziPc84XYBh83/DSiWR3qUo2tT4ONdGYDTub73cSzD/PNt0rojdQHAByoXxw0E7XfoFhsjnRduD+DnWIkkXXACJl1cwRoMmf3cbRaOjLRzDXnKZVj9GBIILUJBtbVzyj9HAU19AgR6I9VzDtwCgMXpAo2Yxp0v/Ybi49ennJtIFEPMY/TCKHTvv+aTSUQzBgwrQ92YHbQVi3UN3GAVZhrf/jzECE1SAq/7n4yOJ074KPSBcJoii598vxgwrqAByg70HZJZbr0JJ0G5XZz5Z1e1rYccA5TAicqEk0O5ECl/3LvYys7mLTLHHCEzS7wz6Esv3+nyYTF58rwha63XAl8PG1aCnhesWq6EdOcKM3WvmXRHh+Gvv/tNVTJlJPC4a3RVEK72+sCSZ4+J/FBVhTUS43J7gJqFjrnl33A3sxtCa3nAWhX6bbAT4hJugCsNZ2TGA8224AJnjAmSOC5A5LkDmuACZ4wJkjguQOS5A5rgAmeMCZI4LkDkuQOa4AJnjAmSOC5A5LkDmuACZ4wJkjguQOWEFYJvz85xwBBWgKM1P68oKKsI/36ACdC9nsDlWPTsIJ5t1Hfw01OBjgI1p/YwLegIibw0CwESz9gUYZ2d/wHEcx3Ecx3Ecx3Ecx3HuS5QjfdrXxTHv3JzEkd2xKwHR9xPNuKGjzdf1MSIQXAA9XUsuuw8nKPpK3PWzs+AvrgwqgP1LojOjoEf3fRv6Zy+JgBSLOGfaOx1NE/6o+rCrgeT9fWp4SljmuACZ4wJkjguQOS5A5rgAmeMCZI4LkDkuQOa4AJnjAmSOC5A5LkDmuACZ4wJkjguQOS5A5rgAmeMCZI4LkDkuQOa4AJnj5wRmTlABqHQBohKhggUVYAEEP8fO+UiMgziDCvCwrnU3aw0nOATMQu8LVIIPAq+JdAerdwWBaQ/fjEBwAaQVmMnN7sEJCB3EqP3tlRGJy6qqmPkFMcZw7sucmfZiHQ6hRBNgSXdaCHbA7KeFfBvz9pxlxtl1gcN2XBWRfwHK959XFRG6AgAAAABJRU5ErkJggg==", this.supportedTransactionVersions = null, this._readyState = typeof window > "u" || typeof document > "u" ? Ut.Unsupported : Ut.NotDetected, this._disconnected = () => {
      const e = this._wallet;
      e && (e.off("disconnect", this._disconnected), this._wallet = null, this._publicKey = null, this.emit("error", new ro()), this.emit("disconnect"));
    }, this._connecting = !1, this._wallet = null, this._publicKey = null, this._readyState !== Ut.Unsupported && oo(() => window.backpack?.isBackpack ? (this._readyState = Ut.Installed, this.emit("readyStateChange", this._readyState), !0) : !1);
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
        throw new no();
      this._connecting = !0;
      const t = window.backpack;
      try {
        await t.connect();
      } catch (n) {
        throw new ai(n?.message, n);
      }
      if (!t.publicKey)
        throw new Va();
      let e;
      try {
        e = new dt(t.publicKey.toBytes());
      } catch (n) {
        throw new Or(n?.message, n);
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
        this.emit("error", new io(e?.message, e));
      }
    }
    this.emit("disconnect");
  }
  async sendTransaction(t, e, n = {}) {
    try {
      const i = this._wallet;
      if (!i)
        throw new ke();
      const { signers: s, ...u } = n;
      try {
        return await i.send(t, s, u, e, this.publicKey);
      } catch (h) {
        throw new Qn(h?.message, h);
      }
    } catch (i) {
      throw this.emit("error", i), i;
    }
  }
  async signTransaction(t) {
    try {
      const e = this._wallet;
      if (!e)
        throw new ke();
      try {
        return await e.signTransaction(t, this.publicKey);
      } catch (n) {
        throw new nn(n?.message, n);
      }
    } catch (e) {
      throw this.emit("error", e), e;
    }
  }
  async signAllTransactions(t) {
    try {
      const e = this._wallet;
      if (!e)
        throw new ke();
      try {
        return await e.signAllTransactions(t, this.publicKey);
      } catch (n) {
        throw new nn(n?.message, n);
      }
    } catch (e) {
      throw this.emit("error", e), e;
    }
  }
  async signMessage(t) {
    try {
      const e = this._wallet;
      if (!e)
        throw new ke();
      try {
        return await e.signMessage(t, this.publicKey);
      } catch (n) {
        throw new so(n?.message, n);
      }
    } catch (e) {
      throw this.emit("error", e), e;
    }
  }
}
function pg(r) {
  if (r.length >= 255)
    throw new TypeError("Alphabet too long");
  const t = new Uint8Array(256);
  for (let E = 0; E < t.length; E++)
    t[E] = 255;
  for (let E = 0; E < r.length; E++) {
    const S = r.charAt(E), N = S.charCodeAt(0);
    if (t[N] !== 255)
      throw new TypeError(S + " is ambiguous");
    t[N] = E;
  }
  const e = r.length, n = r.charAt(0), i = Math.log(e) / Math.log(256), s = Math.log(256) / Math.log(e);
  function u(E) {
    if (E instanceof Uint8Array || (ArrayBuffer.isView(E) ? E = new Uint8Array(E.buffer, E.byteOffset, E.byteLength) : Array.isArray(E) && (E = Uint8Array.from(E))), !(E instanceof Uint8Array))
      throw new TypeError("Expected Uint8Array");
    if (E.length === 0)
      return "";
    let S = 0, N = 0, P = 0;
    const U = E.length;
    for (; P !== U && E[P] === 0; )
      P++, S++;
    const F = (U - P) * s + 1 >>> 0, O = new Uint8Array(F);
    for (; P !== U; ) {
      let Q = E[P], q = 0;
      for (let K = F - 1; (Q !== 0 || q < N) && K !== -1; K--, q++)
        Q += 256 * O[K] >>> 0, O[K] = Q % e >>> 0, Q = Q / e >>> 0;
      if (Q !== 0)
        throw new Error("Non-zero carry");
      N = q, P++;
    }
    let L = F - N;
    for (; L !== F && O[L] === 0; )
      L++;
    let Y = n.repeat(S);
    for (; L < F; ++L)
      Y += r.charAt(O[L]);
    return Y;
  }
  function h(E) {
    if (typeof E != "string")
      throw new TypeError("Expected String");
    if (E.length === 0)
      return new Uint8Array();
    let S = 0, N = 0, P = 0;
    for (; E[S] === n; )
      N++, S++;
    const U = (E.length - S) * i + 1 >>> 0, F = new Uint8Array(U);
    for (; S < E.length; ) {
      const Q = E.charCodeAt(S);
      if (Q > 255)
        return;
      let q = t[Q];
      if (q === 255)
        return;
      let K = 0;
      for (let V = U - 1; (q !== 0 || K < P) && V !== -1; V--, K++)
        q += e * F[V] >>> 0, F[V] = q % 256 >>> 0, q = q / 256 >>> 0;
      if (q !== 0)
        throw new Error("Non-zero carry");
      P = K, S++;
    }
    let O = U - P;
    for (; O !== U && F[O] === 0; )
      O++;
    const L = new Uint8Array(N + (U - O));
    let Y = N;
    for (; O !== U; )
      L[Y++] = F[O++];
    return L;
  }
  function A(E) {
    const S = h(E);
    if (S)
      return S;
    throw new Error("Non-base" + e + " character");
  }
  return {
    encode: u,
    decodeUnsafe: h,
    decode: A
  };
}
var wg = "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz";
const mr = pg(wg);
function yg(r) {
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
const mg = ({ IDL: r }) => {
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
  }), u = r.Vec(r.Nat8), h = u, A = r.Nat64, E = r.Record({
    pubkey: u,
    targets: r.Opt(r.Vec(r.Principal)),
    expiration: A
  }), S = r.Record({
    signature: r.Vec(r.Nat8),
    delegation: E
  }), N = r.Variant({
    Ok: S,
    Err: r.Text
  }), P = r.Text, U = u, F = r.Record({
    user_canister_pubkey: U,
    expiration: A
  }), O = r.Variant({ Ok: F, Err: r.Text }), L = r.Record({
    uri: r.Text,
    issued_at: r.Nat64,
    domain: r.Text,
    statement: r.Text,
    version: r.Nat32,
    chain_id: r.Text,
    address: n,
    nonce: r.Text,
    expiration_time: r.Nat64
  }), Y = r.Variant({
    Ok: L,
    Err: r.Text
  });
  return r.Service({
    get_address: r.Func([e], [i], ["query"]),
    get_caller_address: r.Func([], [i], ["query"]),
    get_principal: r.Func([n], [s], ["query"]),
    siws_get_delegation: r.Func(
      [n, h, A],
      [N],
      ["query"]
    ),
    siws_login: r.Func(
      [P, n, h],
      [O],
      []
    ),
    siws_prepare_login: r.Func([n], [Y], [])
  });
}, bg = new dt("TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA");
new dt("TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb");
new dt("ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL");
new dt("So11111111111111111111111111111111111111112");
new dt("9pan9bMn5HatX4EJdBwg9VgCa7Uz5HL8N1m5D3NdXejP");
const Bo = class Bo {
  constructor(t, e) {
    this.state = At.Status.INIT, this.identity = null, this.principal = null, this.solanaAddress = null, this.tokenListCache = null, this.tokenPricesTimestamp = 0, this.handleSolanaConnect = (s) => {
      console.log(
        `[${this.walletName}] Solana wallet connected:`,
        s.toBase58()
      ), this.solanaAddress = s.toBase58();
    }, this.handleSolanaDisconnect = () => {
      console.log(`[${this.walletName}] Solana wallet disconnected.`), this.state !== At.Status.DISCONNECTING && this.state !== At.Status.DISCONNECTED && this.disconnect();
    }, this.handleSolanaError = (s) => {
      console.error(`[${this.walletName}] Solana wallet error:`, s), this.state = At.Status.ERROR, this.disconnect();
    }, this.id = t.id, this.walletName = t.walletName, this.logo = t.logo, this.config = {
      ...e,
      ...t.config
    };
    const n = this.config.solanaNetwork || Hn.Mainnet, i = n === Hn.Mainnet ? "https://wiser-omniscient-thunder.solana-mainnet.quiknode.pro/c3a27d9cb72eb335a30e3407d576ef64e61b4e8d" : "https://api.devnet.solana.com";
    if (this.solanaConnection = new Vd(i), this.id === "phantomSiws")
      this.solanaAdapter = new $d();
    else if (this.id === "solflareSiws")
      this.solanaAdapter = new dg({ network: n });
    else if (this.id === "backpackSiws")
      this.solanaAdapter = new Ag();
    else
      throw new Error(
        `Unsupported SIWS adapter ID: ${this.id}. Expected 'phantomSiws', 'solflareSiws', or 'backpackSiws'.`
      );
    this.setupWalletListeners(), this.state = At.Status.READY;
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
    if (this.state === At.Status.CONNECTING || this.state === At.Status.CONNECTED)
      return { owner: this.principal?.toText(), subaccount: null };
    if (this.state !== At.Status.READY && this.state !== At.Status.DISCONNECTED)
      throw new Error(`Cannot connect while in state: ${this.state}`);
    this.state = At.Status.CONNECTING;
    try {
      if (this.solanaAdapter.connected || await this.solanaAdapter.connect(), !this.solanaAdapter.publicKey)
        throw new Error(
          "Solana wallet connected but public key not available."
        );
      this.solanaAddress = this.solanaAdapter.publicKey.toBase58();
      const t = await this.performSiwsLogin(this.solanaAddress);
      if (this.identity = t.identity, this.principal = t.principal, !this.principal || this.principal.isAnonymous())
        throw new Error(
          "SIWS flow completed but resulted in an anonymous principal."
        );
      return this.state = At.Status.CONNECTED, { owner: this.principal?.toText(), subaccount: null };
    } catch (t) {
      throw console.error(`[${this.walletName}] Connect failed:`, t), this.state = At.Status.ERROR, await this.disconnect(), t;
    }
  }
  async disconnect() {
    if (!(this.state === At.Status.DISCONNECTING || this.state === At.Status.DISCONNECTED)) {
      this.state = At.Status.DISCONNECTING;
      try {
        this.solanaAdapter.connected && (this.removeWalletListeners(), await this.solanaAdapter.disconnect(), this.setupWalletListeners());
      } catch (t) {
        console.warn(
          `[${this.walletName}] Error during Solana disconnect:`,
          t
        );
      } finally {
        this.identity = null, this.principal = null, this.solanaAddress = null, this.state = At.Status.DISCONNECTED, console.log(`[${this.walletName}] Disconnected.`);
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
    return zr.fromPrincipal({
      principal: pe.fromText(t),
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
        subaccount: await this.getAccountId()
      }
    };
  }
  createActor(t, e, n) {
    if ((n?.requiresSigning ?? !0) && !this.identity)
      throw new Error(
        "Cannot create signed actor: Not connected or SIWS flow not completed."
      );
    const s = _e.createSync({
      host: this.config.hostUrl,
      identity: this.identity,
      verifyQuerySignatures: this.config.verifyQuerySignatures
    });
    return gn.createActor(e, { agent: s, canisterId: t });
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
        const u = {};
        for (const [h, A] of Object.entries(this.tokenListCache))
          A.price && (u[h] = A.price);
        return u;
      }
      const e = await this.getTokenList(), n = Object.keys(e), i = [];
      for (let u = 0; u < n.length; u += 50)
        i.push(n.slice(u, u + 50));
      const s = {};
      for (const u of i)
        try {
          const h = ["SOL", ...u].join(","), A = await fetch(`https://price.jup.ag/v4/price?ids=${h}`);
          if (!A.ok) {
            console.warn(`Failed to fetch Jupiter prices for chunk, status: ${A.status}`);
            continue;
          }
          const E = await A.json();
          if (E.data) {
            for (const [S, N] of Object.entries(E.data))
              if (N && typeof N == "object" && "price" in N && N.price !== null) {
                const P = Number(N.price);
                !isNaN(P) && P > 0 && (s[S] = P, this.tokenListCache && this.tokenListCache[S] && (this.tokenListCache[S].price = P));
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
    ) / Oa;
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
      ), e = t / Oa;
      let n;
      try {
        const S = await fetch("https://price.jup.ag/v4/price?ids=SOL");
        if (S.ok) {
          const N = await S.json();
          if (console.log("SOL price data:", JSON.stringify(N, null, 2)), N?.data?.SOL?.price) {
            const P = Number(N.data.SOL.price);
            !isNaN(P) && P > 0 && (n = e * P, console.log(`SOL price: $${P}, USD value: $${n}`));
          }
        }
      } catch (S) {
        console.error("Error fetching SOL price:", S);
      }
      const i = await this.solanaConnection.getTokenAccountsByOwner(
        this.solanaAdapter.publicKey,
        {
          programId: bg
        }
      ), s = [], u = [];
      for (const S of i.value)
        try {
          const N = await this.solanaConnection.getParsedAccountInfo(S.pubkey);
          if (!N.value) continue;
          const P = "parsed" in N.value.data ? N.value.data.parsed : null;
          if (!P || P.type !== "account") continue;
          const U = P.info;
          if (!U || !U.mint) continue;
          s.push(U.mint), u.push(S);
        } catch (N) {
          console.error(`Failed to pre-process token account ${S.pubkey.toBase58()}:`, N);
        }
      const h = await this.getTokenList(), A = {};
      if (s.length > 0)
        for (let S = 0; S < s.length; S += 50) {
          const N = s.slice(S, S + 50);
          try {
            const P = await fetch(`https://price.jup.ag/v4/price?ids=${N.join(",")}`);
            if (!P.ok) {
              console.warn(`Failed to fetch prices for token chunk, status: ${P.status}`);
              continue;
            }
            const U = await P.json();
            if (U.data) {
              for (const [F, O] of Object.entries(U.data))
                if (O && typeof O == "object" && "price" in O && O.price !== null) {
                  const L = Number(O.price);
                  !isNaN(L) && L > 0 && (A[F] = L);
                }
            }
          } catch (P) {
            console.warn("Error fetching prices for token chunk:", P);
          }
        }
      A.EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v || (A.EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v = 1), n === void 0 && e > 0 && (n = e * 150, console.log(`Using estimated SOL price: $150, USD value: $${n}`));
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
      for (const { pubkey: S } of u)
        try {
          const N = await this.solanaConnection.getParsedAccountInfo(S);
          if (!N.value) continue;
          const P = "parsed" in N.value.data ? N.value.data.parsed : null;
          if (!P || P.type !== "account") continue;
          const U = P.info;
          if (!U || !U.mint || !U.tokenAmount) continue;
          const F = U.mint, O = U.tokenAmount.amount, L = U.tokenAmount.decimals || 0, Y = U.tokenAmount.uiAmount || Number(O) / Math.pow(10, L), Q = h[F];
          let q;
          const K = A[F];
          K && !isNaN(K) && K > 0 && (q = Y * K), F === "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v" && q === void 0 && (q = Y), E.push({
            mint: F,
            amount: O.toString(),
            decimals: L,
            uiAmount: Y,
            symbol: Q?.symbol,
            name: Q?.name,
            logo: Q?.logoURI,
            usdValue: q
          });
        } catch (N) {
          console.error(
            `[${this.walletName}] Failed to process token account ${S.toBase58()}:`,
            N
          );
        }
      return E;
    } catch (t) {
      return console.error(`[${this.walletName}] Error fetching SPL token balances:`, t), [];
    }
  }
  // --- SIWS Specific Methods ---
  createSiwsProviderActor(t) {
    if (!this.config.siwsProviderCanisterId)
      throw new Error("SIWS provider canister ID not configured.");
    const e = _e.createSync({
      host: this.config.hostUrl,
      identity: t ?? new iu(),
      // Use provided identity or anonymous
      verifyQuerySignatures: this.config.verifyQuerySignatures
    });
    return gn.createActor(mg, {
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
    const e = yg(t), n = new TextEncoder().encode(e);
    if (!("signMessage" in this.solanaAdapter))
      throw new Error(
        `Connected Solana adapter '${this.walletName}' does not support signMessage.`
      );
    const s = await this.solanaAdapter.signMessage(n);
    try {
      if (typeof s == "object" && "signature" in s && s.signature instanceof Uint8Array)
        return mr.encode(s.signature);
      if (s instanceof Uint8Array)
        return mr.encode(s);
      if (s instanceof ArrayBuffer)
        return mr.encode(new Uint8Array(s));
      if (Array.isArray(s) || typeof s == "object" && "length" in s)
        return mr.encode(new Uint8Array(s));
      console.warn(
        `[${this.walletName}] Unexpected signature bytes type:`,
        typeof s,
        s
      );
      const u = Object.values(s).map(
        (h) => Number(h)
      );
      return mr.encode(Uint8Array.from(u));
    } catch (u) {
      throw console.error(`[${this.walletName}] Error encoding signature:`, u), new Error(
        `Failed to encode signature from ${this.walletName}: ${u.message}`
      );
    }
  }
  _generateSessionIdentity() {
    const t = Pa.generate(), e = t.getPublicKey().toDer();
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
        delegation: new za(
          t.delegation.pubkey.slice().buffer,
          t.delegation.expiration,
          t.delegation.targets.length > 0 ? t.delegation.targets[0] : void 0
        ),
        signature: t.signature.slice().buffer
      }
    ], u = ja.fromDelegations(
      s,
      n
    );
    return Fa.fromDelegation(
      e,
      u
    );
  }
  async performSiwsLogin(t) {
    const e = this.createSiwsProviderActor(), n = await this._prepareLogin(e, t), i = await this._signSiwsMessage(n), { sessionIdentity: s, sessionPublicKeyDer: u } = this._generateSessionIdentity(), h = await this._loginWithSiws(
      e,
      i,
      t,
      u
    ), A = await this._getSiwsDelegation(
      e,
      t,
      u,
      h.expiration
    ), E = this._createDelegationIdentity(
      A,
      s,
      h.user_canister_pubkey.slice().buffer
      // Ensure ArrayBuffer
    ), S = E.getPrincipal();
    return { identity: E, principal: S };
  }
};
Bo.supportedChains = [At.Chain.ICP, At.Chain.SOL];
let Rr = Bo;
const Eg = "data:image/svg+xml,%3csvg%20width='1200'%20height='1200'%20viewBox='0%200%201200%201200'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cg%20clip-path='url(%23clip0_2800_140397)'%3e%3crect%20width='1200'%20height='1200'%20fill='%239886E5'/%3e%3cpath%20fill-rule='evenodd'%20clip-rule='evenodd'%20d='M516.641%20777.604C466.226%20854.856%20381.747%20952.618%20269.335%20952.618C216.194%20952.618%20165.098%20930.741%20165.098%20835.714C165.098%20593.704%20495.521%20219.066%20802.1%20219.066C976.509%20219.066%201046%20340.071%201046%20477.484C1046%20653.865%20931.544%20855.54%20817.77%20855.54C781.661%20855.54%20763.948%20835.714%20763.948%20804.267C763.948%20796.063%20765.311%20787.175%20768.036%20777.604C729.202%20843.918%20654.261%20905.446%20584.089%20905.446C532.992%20905.446%20507.103%20873.315%20507.103%20828.194C507.103%20811.787%20510.51%20794.696%20516.641%20777.604ZM930.877%20472.714C930.877%20512.755%20907.253%20532.776%20880.826%20532.776C853.998%20532.776%20830.775%20512.755%20830.775%20472.714C830.775%20432.673%20853.998%20412.653%20880.826%20412.653C907.253%20412.653%20930.877%20432.673%20930.877%20472.714ZM780.73%20472.714C780.73%20512.755%20757.105%20532.776%20730.678%20532.776C703.851%20532.776%20680.627%20512.755%20680.627%20472.714C680.627%20432.673%20703.851%20412.653%20730.678%20412.653C757.105%20412.653%20780.73%20432.673%20780.73%20472.714Z'%20fill='%23FFFDF8'/%3e%3c/g%3e%3cdefs%3e%3cclipPath%20id='clip0_2800_140397'%3e%3crect%20width='1200'%20height='1200'%20fill='white'/%3e%3c/clipPath%3e%3c/defs%3e%3c/svg%3e", Ig = "data:image/svg+xml,%3csvg%20width='290'%20height='290'%20viewBox='0%200%20290%20290'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cg%20clip-path='url(%23clip0_146_299)'%3e%3cpath%20d='M63.2951%201H226.705C261.11%201%20289%2028.8905%20289%2063.2951V226.705C289%20261.11%20261.11%20289%20226.705%20289H63.2951C28.8905%20289%201%20261.11%201%20226.705V63.2951C1%2028.8905%2028.8905%201%2063.2951%201Z'%20fill='%23FFEF46'%20stroke='%23EEDA0F'%20stroke-width='2'/%3e%3cpath%20d='M140.548%20153.231L154.832%20139.432L181.462%20148.147C198.893%20153.958%20207.609%20164.61%20207.609%20179.62C207.609%20190.999%20203.251%20198.504%20194.536%20208.188L191.873%20211.093L192.841%20204.314C196.714%20179.62%20189.452%20168.968%20165.484%20161.22L140.548%20153.231ZM104.717%2068.739L177.347%2092.9488L161.61%20107.959L123.843%2095.3698C110.77%2091.012%20106.412%2083.9911%20104.717%2069.2232V68.739ZM100.359%20191.725L116.822%20175.988L147.811%20186.157C164.031%20191.483%20169.599%20198.504%20167.905%20216.177L100.359%20191.725ZM79.539%20121.516C79.539%20116.917%2081.9599%20112.559%2086.0756%20108.927C90.4334%20115.222%2097.9384%20120.79%20109.801%20124.664L135.464%20133.137L121.18%20146.937L96.0016%20138.705C84.3809%20134.832%2079.539%20129.021%2079.539%20121.516ZM155.558%20248.618C208.819%20213.272%20237.387%20189.304%20237.387%20159.768C237.387%20140.158%20225.766%20129.263%20200.104%20120.79L180.736%20114.253L233.756%2063.4128L223.103%2052.0342L207.367%2065.8337L133.043%2041.3818C110.043%2048.8869%2080.9916%2070.9178%2080.9916%2092.9487C80.9916%2095.3697%2081.2337%2097.7907%2081.96%20100.454C62.8342%20111.348%2055.0871%20121.516%2055.0871%20134.105C55.0871%20145.968%2061.3816%20157.831%2081.4758%20164.368L97.4542%20169.694L42.2559%20222.713L52.9082%20234.092L70.0972%20218.356L155.558%20248.618Z'%20fill='%2302050A'/%3e%3c/g%3e%3cdefs%3e%3cclipPath%20id='clip0_146_299'%3e%3crect%20width='290'%20height='290'%20fill='white'/%3e%3c/clipPath%3e%3c/defs%3e%3c/svg%3e", vg = "data:image/png;base64,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", Sg = {
  phantomSiws: {
    enabled: !1,
    // Disabled by default, user must enable and configure
    id: "phantomSiws",
    walletName: "Phantom",
    logo: Eg,
    website: "https://phantom.app",
    chain: "SOL",
    adapter: Rr,
    // Use the unified SIWS adapter
    config: {
      solanaNetwork: Hn.Mainnet
      // Default to mainnet
    }
  },
  solflareSiws: {
    enabled: !1,
    // Disabled by default, user must enable and configure
    id: "solflareSiws",
    walletName: "Solflare",
    logo: Ig,
    website: "https://solflare.com",
    chain: "SOL",
    adapter: Rr,
    // Use the unified SIWS adapter
    config: {
      solanaNetwork: Hn.Mainnet
      // Default to mainnet
    }
  },
  backpackSiws: {
    enabled: !1,
    // Disabled by default, user must enable and configure
    id: "backpackSiws",
    walletName: "Backpack",
    logo: vg,
    website: "https://backpack.app",
    chain: "SOL",
    adapter: Rr,
    config: {
      solanaNetwork: Hn.Mainnet
    }
  }
}, Ua = {
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
    ...el,
    ...Sg
    // Merge SolAdapters into the defaults
  }
};
function Mg(r = {}) {
  const t = { ...Ua.adapters };
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
  return {
    ...Ua,
    ...r,
    adapters: t
    // Use the adapters map with refined merging
  };
}
class xg {
  constructor(t = {}) {
    this.account = null, this.activeWallet = null, this.provider = null, this.actorCache = /* @__PURE__ */ new Map(), this.isConnecting = !1, this.config = Mg(t), this.adapters = this.config.adapters || {};
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
  // Helper method to reset connection state
  _resetState() {
    this.account = null, this.provider = null, this.activeWallet = null, this.actorCache.clear(), localStorage.removeItem(this.config.localStorageKey);
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
      e = i.adapter.length > 1 ? new i.adapter(i, this.config) : new i.adapter(this.config);
      const u = await e.connect();
      return this.account = u, this.activeWallet = i, this.provider = e, u;
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
      return this._resetState(), null;
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
      this.provider && await this.provider.disconnect(), this._resetState();
    } catch (t) {
      console.warn("[PNP] Disconnect error:", t), this._resetState();
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
    const s = gn.createActor(e, {
      agent: _e.createSync({
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
const Fg = (r = {}) => new xg(r);
export {
  eo as E,
  dt as P,
  cl as S,
  Tn as T,
  Rc as V,
  ll as a,
  ul as b,
  Mg as c,
  xg as d,
  Fg as e,
  Ei as g
};
//# sourceMappingURL=index-DehKl7jK.js.map
