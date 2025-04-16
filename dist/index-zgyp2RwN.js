var zc = Object.defineProperty;
var Pc = (r, t, e) => t in r ? zc(r, t, { enumerable: !0, configurable: !0, writable: !0, value: e }) : r[t] = e;
var pe = (r, t, e) => Pc(r, typeof t != "symbol" ? t + "" : t, e);
import { HttpAgent as Ye, Actor as Tn, Cbor as Fc, Expiry as _c, SubmitRequestType as Wc, compare as qc, requestIdOf as Qc, Certificate as vo, LookupStatus as Qi, lookupResultToBuffer as Hc, IC_ROOT_KEY as Zc, AnonymousIdentity as Yc } from "@dfinity/agent";
import { AuthClient as Gc } from "@dfinity/auth-client";
import { asciiStringToByteArray as Kc, arrayOfNumberToUint8Array as Jc, bigEndianCrc32 as Vc, uint8ArrayToHexString as Xc, hexStringToUint8Array as Ma } from "@dfinity/utils";
import { Principal as qe } from "@dfinity/principal";
import { DelegationChain as Sa, Delegation as Ia, Ed25519KeyIdentity as xa, DelegationIdentity as Ba } from "@dfinity/identity";
import { lebDecode as $c, PipeArrayBuffer as tu } from "@dfinity/candid";
var gt;
((r) => {
  ((t) => {
    t.INIT = "INIT", t.READY = "READY", t.CONNECTING = "CONNECTING", t.CONNECTED = "CONNECTED", t.DISCONNECTING = "DISCONNECTING", t.DISCONNECTED = "DISCONNECTED", t.ERROR = "ERROR";
  })(r.Status || (r.Status = {}));
})(gt || (gt = {}));
const eu = "data:image/webp;base64,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";
var nu = Object.create, Na = Object.defineProperty, ru = Object.getOwnPropertyDescriptor, iu = Object.getOwnPropertyNames, su = Object.getPrototypeOf, ou = Object.prototype.hasOwnProperty, Ys = (r, t) => () => (t || r((t = { exports: {} }).exports, t), t.exports), au = (r, t, e, n) => {
  if (t && typeof t == "object" || typeof t == "function") for (let i of iu(t)) !ou.call(r, i) && i !== e && Na(r, i, { get: () => t[i], enumerable: !(n = ru(t, i)) || n.enumerable });
  return r;
}, cu = (r, t, e) => (e = r != null ? nu(su(r)) : {}, au(!r || !r.__esModule ? Na(e, "default", { value: r, enumerable: !0 }) : e, r));
function uu(r) {
  return r instanceof Uint8Array || r != null && typeof r == "object" && r.constructor.name === "Uint8Array";
}
function Ta(r, ...t) {
  if (!uu(r)) throw new Error("Uint8Array expected");
  if (t.length > 0 && !t.includes(r.length)) throw new Error(`Uint8Array expected of length ${t}, not of length=${r.length}`);
}
function Eo(r, t = !0) {
  if (r.destroyed) throw new Error("Hash instance has been destroyed");
  if (t && r.finished) throw new Error("Hash#digest() has already been called");
}
function lu(r, t) {
  Ta(r);
  let e = t.outputLen;
  if (r.length < e) throw new Error(`digestInto() expects output buffer of length at least ${e}`);
}
var Hi = (r) => new DataView(r.buffer, r.byteOffset, r.byteLength), Ke = (r, t) => r << 32 - t | r >>> t;
new Uint8Array(new Uint32Array([287454020]).buffer)[0];
function hu(r) {
  if (typeof r != "string") throw new Error(`utf8ToBytes expected string, got ${typeof r}`);
  return new Uint8Array(new TextEncoder().encode(r));
}
function ka(r) {
  return typeof r == "string" && (r = hu(r)), Ta(r), r;
}
var fu = class {
  clone() {
    return this._cloneInto();
  }
};
function du(r) {
  let t = (n) => r().update(ka(n)).digest(), e = r();
  return t.outputLen = e.outputLen, t.blockLen = e.blockLen, t.create = () => r(), t;
}
function gu(r, t, e, n) {
  if (typeof r.setBigUint64 == "function") return r.setBigUint64(t, e, n);
  let i = BigInt(32), s = BigInt(4294967295), l = Number(e >> i & s), h = Number(e & s), p = n ? 4 : 0, v = n ? 0 : 4;
  r.setUint32(t + p, l, n), r.setUint32(t + v, h, n);
}
var pu = (r, t, e) => r & t ^ ~r & e, wu = (r, t, e) => r & t ^ r & e ^ t & e, yu = class extends fu {
  constructor(r, t, e, n) {
    super(), this.blockLen = r, this.outputLen = t, this.padOffset = e, this.isLE = n, this.finished = !1, this.length = 0, this.pos = 0, this.destroyed = !1, this.buffer = new Uint8Array(r), this.view = Hi(this.buffer);
  }
  update(r) {
    Eo(this);
    let { view: t, buffer: e, blockLen: n } = this;
    r = ka(r);
    let i = r.length;
    for (let s = 0; s < i; ) {
      let l = Math.min(n - this.pos, i - s);
      if (l === n) {
        let h = Hi(r);
        for (; n <= i - s; s += n) this.process(h, s);
        continue;
      }
      e.set(r.subarray(s, s + l), this.pos), this.pos += l, s += l, this.pos === n && (this.process(t, 0), this.pos = 0);
    }
    return this.length += r.length, this.roundClean(), this;
  }
  digestInto(r) {
    Eo(this), lu(r, this), this.finished = !0;
    let { buffer: t, view: e, blockLen: n, isLE: i } = this, { pos: s } = this;
    t[s++] = 128, this.buffer.subarray(s).fill(0), this.padOffset > n - s && (this.process(e, 0), s = 0);
    for (let S = s; S < n; S++) t[S] = 0;
    gu(e, n - 8, BigInt(this.length * 8), i), this.process(e, 0);
    let l = Hi(r), h = this.outputLen;
    if (h % 4) throw new Error("_sha2: outputLen should be aligned to 32bit");
    let p = h / 4, v = this.get();
    if (p > v.length) throw new Error("_sha2: outputLen bigger than state");
    for (let S = 0; S < p; S++) l.setUint32(4 * S, v[S], i);
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
}, Au = new Uint32Array([1116352408, 1899447441, 3049323471, 3921009573, 961987163, 1508970993, 2453635748, 2870763221, 3624381080, 310598401, 607225278, 1426881987, 1925078388, 2162078206, 2614888103, 3248222580, 3835390401, 4022224774, 264347078, 604807628, 770255983, 1249150122, 1555081692, 1996064986, 2554220882, 2821834349, 2952996808, 3210313671, 3336571891, 3584528711, 113926993, 338241895, 666307205, 773529912, 1294757372, 1396182291, 1695183700, 1986661051, 2177026350, 2456956037, 2730485921, 2820302411, 3259730800, 3345764771, 3516065817, 3600352804, 4094571909, 275423344, 430227734, 506948616, 659060556, 883997877, 958139571, 1322822218, 1537002063, 1747873779, 1955562222, 2024104815, 2227730452, 2361852424, 2428436474, 2756734187, 3204031479, 3329325298]), gn = new Uint32Array([1779033703, 3144134277, 1013904242, 2773480762, 1359893119, 2600822924, 528734635, 1541459225]), pn = new Uint32Array(64), mu = class extends yu {
  constructor() {
    super(64, 32, 8, !1), this.A = gn[0] | 0, this.B = gn[1] | 0, this.C = gn[2] | 0, this.D = gn[3] | 0, this.E = gn[4] | 0, this.F = gn[5] | 0, this.G = gn[6] | 0, this.H = gn[7] | 0;
  }
  get() {
    let { A: r, B: t, C: e, D: n, E: i, F: s, G: l, H: h } = this;
    return [r, t, e, n, i, s, l, h];
  }
  set(r, t, e, n, i, s, l, h) {
    this.A = r | 0, this.B = t | 0, this.C = e | 0, this.D = n | 0, this.E = i | 0, this.F = s | 0, this.G = l | 0, this.H = h | 0;
  }
  process(r, t) {
    for (let S = 0; S < 16; S++, t += 4) pn[S] = r.getUint32(t, !1);
    for (let S = 16; S < 64; S++) {
      let C = pn[S - 15], F = pn[S - 2], U = Ke(C, 7) ^ Ke(C, 18) ^ C >>> 3, z = Ke(F, 17) ^ Ke(F, 19) ^ F >>> 10;
      pn[S] = z + pn[S - 7] + U + pn[S - 16] | 0;
    }
    let { A: e, B: n, C: i, D: s, E: l, F: h, G: p, H: v } = this;
    for (let S = 0; S < 64; S++) {
      let C = Ke(l, 6) ^ Ke(l, 11) ^ Ke(l, 25), F = v + C + pu(l, h, p) + Au[S] + pn[S] | 0, U = (Ke(e, 2) ^ Ke(e, 13) ^ Ke(e, 22)) + wu(e, n, i) | 0;
      v = p, p = h, h = l, l = s + F | 0, s = i, i = n, n = e, e = F + U | 0;
    }
    e = e + this.A | 0, n = n + this.B | 0, i = i + this.C | 0, s = s + this.D | 0, l = l + this.E | 0, h = h + this.F | 0, p = p + this.G | 0, v = v + this.H | 0, this.set(e, n, i, s, l, h, p, v);
  }
  roundClean() {
    pn.fill(0);
  }
  destroy() {
    this.set(0, 0, 0, 0, 0, 0, 0, 0), this.buffer.fill(0);
  }
}, bu = class extends mu {
  constructor() {
    super(), this.A = -1056596264, this.B = 914150663, this.C = 812702999, this.D = -150054599, this.E = -4191439, this.F = 1750603025, this.G = 1694076839, this.H = -1090891868, this.outputLen = 28;
  }
}, vu = du(() => new bu()), di = class Es {
  constructor(t) {
    this.bytes = t;
  }
  static fromHex(t) {
    return new Es(Uint8Array.from(Buffer.from(t, "hex")));
  }
  static fromPrincipal({ principal: t, subAccount: e = Eu.fromID(0) }) {
    let n = Kc(`
account-id`), i = vu.create();
    i.update(Jc([...n, ...t.toUint8Array(), ...e.toUint8Array()]));
    let s = i.digest(), l = Vc(s), h = new Uint8Array([...l, ...s]);
    return new Es(h);
  }
  toHex() {
    return Xc(this.bytes);
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
}, Eu = class qr {
  constructor(t) {
    this.bytes = t;
  }
  static fromBytes(t) {
    return t.length != 32 ? Error("Subaccount length must be 32-bytes") : new qr(t);
  }
  static fromPrincipal(t) {
    let e = new Uint8Array(32).fill(0), n = t.toUint8Array();
    e[0] = n.length;
    for (let i = 0; i < n.length; i++) e[1 + i] = n[i];
    return new qr(e);
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
    return new qr(n);
  }
  toUint8Array() {
    return this.bytes;
  }
};
/*! Bundled license information:

@noble/hashes/esm/utils.js:
  (*! noble-hashes - MIT License (c) 2022 Paul Miller (paulmillr.com) *)
*/
qe.fromText("ryjl3-tyaaa-aaaaa-aaaba-cai");
qe.fromText("qhbym-qaaaa-aaaaa-aaafq-cai");
BigInt(1095062083);
BigInt(1347768404);
BigInt(1e4);
BigInt(1e8);
var Mu = Ys((r) => {
  r.byteLength = p, r.toByteArray = S, r.fromByteArray = U;
  var t = [], e = [], n = typeof Uint8Array < "u" ? Uint8Array : Array, i = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
  for (s = 0, l = i.length; s < l; ++s) t[s] = i[s], e[i.charCodeAt(s)] = s;
  var s, l;
  e[45] = 62, e[95] = 63;
  function h(z) {
    var D = z.length;
    if (D % 4 > 0) throw new Error("Invalid string. Length must be a multiple of 4");
    var k = z.indexOf("=");
    k === -1 && (k = D);
    var Z = k === D ? 0 : 4 - k % 4;
    return [k, Z];
  }
  function p(z) {
    var D = h(z), k = D[0], Z = D[1];
    return (k + Z) * 3 / 4 - Z;
  }
  function v(z, D, k) {
    return (D + k) * 3 / 4 - k;
  }
  function S(z) {
    var D, k = h(z), Z = k[0], _ = k[1], q = new n(v(z, Z, _)), V = 0, J = _ > 0 ? Z - 4 : Z, X;
    for (X = 0; X < J; X += 4) D = e[z.charCodeAt(X)] << 18 | e[z.charCodeAt(X + 1)] << 12 | e[z.charCodeAt(X + 2)] << 6 | e[z.charCodeAt(X + 3)], q[V++] = D >> 16 & 255, q[V++] = D >> 8 & 255, q[V++] = D & 255;
    return _ === 2 && (D = e[z.charCodeAt(X)] << 2 | e[z.charCodeAt(X + 1)] >> 4, q[V++] = D & 255), _ === 1 && (D = e[z.charCodeAt(X)] << 10 | e[z.charCodeAt(X + 1)] << 4 | e[z.charCodeAt(X + 2)] >> 2, q[V++] = D >> 8 & 255, q[V++] = D & 255), q;
  }
  function C(z) {
    return t[z >> 18 & 63] + t[z >> 12 & 63] + t[z >> 6 & 63] + t[z & 63];
  }
  function F(z, D, k) {
    for (var Z, _ = [], q = D; q < k; q += 3) Z = (z[q] << 16 & 16711680) + (z[q + 1] << 8 & 65280) + (z[q + 2] & 255), _.push(C(Z));
    return _.join("");
  }
  function U(z) {
    for (var D, k = z.length, Z = k % 3, _ = [], q = 16383, V = 0, J = k - Z; V < J; V += q) _.push(F(z, V, V + q > J ? J : V + q));
    return Z === 1 ? (D = z[k - 1], _.push(t[D >> 2] + t[D << 4 & 63] + "==")) : Z === 2 && (D = (z[k - 2] << 8) + z[k - 1], _.push(t[D >> 10] + t[D >> 4 & 63] + t[D << 2 & 63] + "=")), _.join("");
  }
}), Su = Ys((r) => {
  r.read = function(t, e, n, i, s) {
    var l, h, p = s * 8 - i - 1, v = (1 << p) - 1, S = v >> 1, C = -7, F = n ? s - 1 : 0, U = n ? -1 : 1, z = t[e + F];
    for (F += U, l = z & (1 << -C) - 1, z >>= -C, C += p; C > 0; l = l * 256 + t[e + F], F += U, C -= 8) ;
    for (h = l & (1 << -C) - 1, l >>= -C, C += i; C > 0; h = h * 256 + t[e + F], F += U, C -= 8) ;
    if (l === 0) l = 1 - S;
    else {
      if (l === v) return h ? NaN : (z ? -1 : 1) * (1 / 0);
      h = h + Math.pow(2, i), l = l - S;
    }
    return (z ? -1 : 1) * h * Math.pow(2, l - i);
  }, r.write = function(t, e, n, i, s, l) {
    var h, p, v, S = l * 8 - s - 1, C = (1 << S) - 1, F = C >> 1, U = s === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0, z = i ? 0 : l - 1, D = i ? 1 : -1, k = e < 0 || e === 0 && 1 / e < 0 ? 1 : 0;
    for (e = Math.abs(e), isNaN(e) || e === 1 / 0 ? (p = isNaN(e) ? 1 : 0, h = C) : (h = Math.floor(Math.log(e) / Math.LN2), e * (v = Math.pow(2, -h)) < 1 && (h--, v *= 2), h + F >= 1 ? e += U / v : e += U * Math.pow(2, 1 - F), e * v >= 2 && (h++, v /= 2), h + F >= C ? (p = 0, h = C) : h + F >= 1 ? (p = (e * v - 1) * Math.pow(2, s), h = h + F) : (p = e * Math.pow(2, F - 1) * Math.pow(2, s), h = 0)); s >= 8; t[n + z] = p & 255, z += D, p /= 256, s -= 8) ;
    for (h = h << s | p, S += s; S > 0; t[n + z] = h & 255, z += D, h /= 256, S -= 8) ;
    t[n + z - D] |= k * 128;
  };
}), Iu = Ys((r) => {
  var t = Mu(), e = Su(), n = typeof Symbol == "function" && typeof Symbol.for == "function" ? Symbol.for("nodejs.util.inspect.custom") : null;
  r.Buffer = h, r.SlowBuffer = _, r.INSPECT_MAX_BYTES = 50;
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
      return C(a);
    }
    return p(a, o, c);
  }
  h.poolSize = 8192;
  function p(a, o, c) {
    if (typeof a == "string") return F(a, o);
    if (ArrayBuffer.isView(a)) return z(a);
    if (a == null) throw new TypeError("The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof a);
    if (Ut(a, ArrayBuffer) || a && Ut(a.buffer, ArrayBuffer) || typeof SharedArrayBuffer < "u" && (Ut(a, SharedArrayBuffer) || a && Ut(a.buffer, SharedArrayBuffer))) return D(a, o, c);
    if (typeof a == "number") throw new TypeError('The "value" argument must not be of type number. Received type number');
    let A = a.valueOf && a.valueOf();
    if (A != null && A !== a) return h.from(A, o, c);
    let T = k(a);
    if (T) return T;
    if (typeof Symbol < "u" && Symbol.toPrimitive != null && typeof a[Symbol.toPrimitive] == "function") return h.from(a[Symbol.toPrimitive]("string"), o, c);
    throw new TypeError("The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof a);
  }
  h.from = function(a, o, c) {
    return p(a, o, c);
  }, Object.setPrototypeOf(h.prototype, Uint8Array.prototype), Object.setPrototypeOf(h, Uint8Array);
  function v(a) {
    if (typeof a != "number") throw new TypeError('"size" argument must be of type number');
    if (a < 0) throw new RangeError('The value "' + a + '" is invalid for option "size"');
  }
  function S(a, o, c) {
    return v(a), a <= 0 ? l(a) : o !== void 0 ? typeof c == "string" ? l(a).fill(o, c) : l(a).fill(o) : l(a);
  }
  h.alloc = function(a, o, c) {
    return S(a, o, c);
  };
  function C(a) {
    return v(a), l(a < 0 ? 0 : Z(a) | 0);
  }
  h.allocUnsafe = function(a) {
    return C(a);
  }, h.allocUnsafeSlow = function(a) {
    return C(a);
  };
  function F(a, o) {
    if ((typeof o != "string" || o === "") && (o = "utf8"), !h.isEncoding(o)) throw new TypeError("Unknown encoding: " + o);
    let c = q(a, o) | 0, A = l(c), T = A.write(a, o);
    return T !== c && (A = A.slice(0, T)), A;
  }
  function U(a) {
    let o = a.length < 0 ? 0 : Z(a.length) | 0, c = l(o);
    for (let A = 0; A < o; A += 1) c[A] = a[A] & 255;
    return c;
  }
  function z(a) {
    if (Ut(a, Uint8Array)) {
      let o = new Uint8Array(a);
      return D(o.buffer, o.byteOffset, o.byteLength);
    }
    return U(a);
  }
  function D(a, o, c) {
    if (o < 0 || a.byteLength < o) throw new RangeError('"offset" is outside of buffer bounds');
    if (a.byteLength < o + (c || 0)) throw new RangeError('"length" is outside of buffer bounds');
    let A;
    return o === void 0 && c === void 0 ? A = new Uint8Array(a) : c === void 0 ? A = new Uint8Array(a, o) : A = new Uint8Array(a, o, c), Object.setPrototypeOf(A, h.prototype), A;
  }
  function k(a) {
    if (h.isBuffer(a)) {
      let o = Z(a.length) | 0, c = l(o);
      return c.length === 0 || a.copy(c, 0, 0, o), c;
    }
    if (a.length !== void 0) return typeof a.length != "number" || Rt(a.length) ? l(0) : U(a);
    if (a.type === "Buffer" && Array.isArray(a.data)) return U(a.data);
  }
  function Z(a) {
    if (a >= i) throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x" + i.toString(16) + " bytes");
    return a | 0;
  }
  function _(a) {
    return +a != a && (a = 0), h.alloc(+a);
  }
  h.isBuffer = function(a) {
    return a != null && a._isBuffer === !0 && a !== h.prototype;
  }, h.compare = function(a, o) {
    if (Ut(a, Uint8Array) && (a = h.from(a, a.offset, a.byteLength)), Ut(o, Uint8Array) && (o = h.from(o, o.offset, o.byteLength)), !h.isBuffer(a) || !h.isBuffer(o)) throw new TypeError('The "buf1", "buf2" arguments must be one of type Buffer or Uint8Array');
    if (a === o) return 0;
    let c = a.length, A = o.length;
    for (let T = 0, j = Math.min(c, A); T < j; ++T) if (a[T] !== o[T]) {
      c = a[T], A = o[T];
      break;
    }
    return c < A ? -1 : A < c ? 1 : 0;
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
    let A = h.allocUnsafe(o), T = 0;
    for (c = 0; c < a.length; ++c) {
      let j = a[c];
      if (Ut(j, Uint8Array)) T + j.length > A.length ? (h.isBuffer(j) || (j = h.from(j)), j.copy(A, T)) : Uint8Array.prototype.set.call(A, j, T);
      else if (h.isBuffer(j)) j.copy(A, T);
      else throw new TypeError('"list" argument must be an Array of Buffers');
      T += j.length;
    }
    return A;
  };
  function q(a, o) {
    if (h.isBuffer(a)) return a.length;
    if (ArrayBuffer.isView(a) || Ut(a, ArrayBuffer)) return a.byteLength;
    if (typeof a != "string") throw new TypeError('The "string" argument must be one of type string, Buffer, or ArrayBuffer. Received type ' + typeof a);
    let c = a.length, A = arguments.length > 2 && arguments[2] === !0;
    if (!A && c === 0) return 0;
    let T = !1;
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
        if (T) return A ? -1 : Bt(a).length;
        o = ("" + o).toLowerCase(), T = !0;
    }
  }
  h.byteLength = q;
  function V(a, o, c) {
    let A = !1;
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
        return y(this, o, c);
      case "base64":
        return b(this, o, c);
      case "ucs2":
      case "ucs-2":
      case "utf16le":
      case "utf-16le":
        return P(this, o, c);
      default:
        if (A) throw new TypeError("Unknown encoding: " + a);
        a = (a + "").toLowerCase(), A = !0;
    }
  }
  h.prototype._isBuffer = !0;
  function J(a, o, c) {
    let A = a[o];
    a[o] = a[c], a[c] = A;
  }
  h.prototype.swap16 = function() {
    let a = this.length;
    if (a % 2 !== 0) throw new RangeError("Buffer size must be a multiple of 16-bits");
    for (let o = 0; o < a; o += 2) J(this, o, o + 1);
    return this;
  }, h.prototype.swap32 = function() {
    let a = this.length;
    if (a % 4 !== 0) throw new RangeError("Buffer size must be a multiple of 32-bits");
    for (let o = 0; o < a; o += 4) J(this, o, o + 3), J(this, o + 1, o + 2);
    return this;
  }, h.prototype.swap64 = function() {
    let a = this.length;
    if (a % 8 !== 0) throw new RangeError("Buffer size must be a multiple of 64-bits");
    for (let o = 0; o < a; o += 8) J(this, o, o + 7), J(this, o + 1, o + 6), J(this, o + 2, o + 5), J(this, o + 3, o + 4);
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
  }, n && (h.prototype[n] = h.prototype.inspect), h.prototype.compare = function(a, o, c, A, T) {
    if (Ut(a, Uint8Array) && (a = h.from(a, a.offset, a.byteLength)), !h.isBuffer(a)) throw new TypeError('The "target" argument must be one of type Buffer or Uint8Array. Received type ' + typeof a);
    if (o === void 0 && (o = 0), c === void 0 && (c = a ? a.length : 0), A === void 0 && (A = 0), T === void 0 && (T = this.length), o < 0 || c > a.length || A < 0 || T > this.length) throw new RangeError("out of range index");
    if (A >= T && o >= c) return 0;
    if (A >= T) return -1;
    if (o >= c) return 1;
    if (o >>>= 0, c >>>= 0, A >>>= 0, T >>>= 0, this === a) return 0;
    let j = T - A, Q = c - o, ut = Math.min(j, Q), lt = this.slice(A, T), at = a.slice(o, c);
    for (let wt = 0; wt < ut; ++wt) if (lt[wt] !== at[wt]) {
      j = lt[wt], Q = at[wt];
      break;
    }
    return j < Q ? -1 : Q < j ? 1 : 0;
  };
  function X(a, o, c, A, T) {
    if (a.length === 0) return -1;
    if (typeof c == "string" ? (A = c, c = 0) : c > 2147483647 ? c = 2147483647 : c < -2147483648 && (c = -2147483648), c = +c, Rt(c) && (c = T ? 0 : a.length - 1), c < 0 && (c = a.length + c), c >= a.length) {
      if (T) return -1;
      c = a.length - 1;
    } else if (c < 0) if (T) c = 0;
    else return -1;
    if (typeof o == "string" && (o = h.from(o, A)), h.isBuffer(o)) return o.length === 0 ? -1 : et(a, o, c, A, T);
    if (typeof o == "number") return o = o & 255, typeof Uint8Array.prototype.indexOf == "function" ? T ? Uint8Array.prototype.indexOf.call(a, o, c) : Uint8Array.prototype.lastIndexOf.call(a, o, c) : et(a, [o], c, A, T);
    throw new TypeError("val must be string, number or Buffer");
  }
  function et(a, o, c, A, T) {
    let j = 1, Q = a.length, ut = o.length;
    if (A !== void 0 && (A = String(A).toLowerCase(), A === "ucs2" || A === "ucs-2" || A === "utf16le" || A === "utf-16le")) {
      if (a.length < 2 || o.length < 2) return -1;
      j = 2, Q /= 2, ut /= 2, c /= 2;
    }
    function lt(wt, ct) {
      return j === 1 ? wt[ct] : wt.readUInt16BE(ct * j);
    }
    let at;
    if (T) {
      let wt = -1;
      for (at = c; at < Q; at++) if (lt(a, at) === lt(o, wt === -1 ? 0 : at - wt)) {
        if (wt === -1 && (wt = at), at - wt + 1 === ut) return wt * j;
      } else wt !== -1 && (at -= at - wt), wt = -1;
    } else for (c + ut > Q && (c = Q - ut), at = c; at >= 0; at--) {
      let wt = !0;
      for (let ct = 0; ct < ut; ct++) if (lt(a, at + ct) !== lt(o, ct)) {
        wt = !1;
        break;
      }
      if (wt) return at;
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
  function N(a, o, c, A) {
    c = Number(c) || 0;
    let T = a.length - c;
    A ? (A = Number(A), A > T && (A = T)) : A = T;
    let j = o.length;
    A > j / 2 && (A = j / 2);
    let Q;
    for (Q = 0; Q < A; ++Q) {
      let ut = parseInt(o.substr(Q * 2, 2), 16);
      if (Rt(ut)) return Q;
      a[c + Q] = ut;
    }
    return Q;
  }
  function M(a, o, c, A) {
    return Nt(Bt(o, a.length - c), a, c, A);
  }
  function x(a, o, c, A) {
    return Nt(Dt(o), a, c, A);
  }
  function O(a, o, c, A) {
    return Nt(Lt(o), a, c, A);
  }
  function R(a, o, c, A) {
    return Nt(dn(o, a.length - c), a, c, A);
  }
  h.prototype.write = function(a, o, c, A) {
    if (o === void 0) A = "utf8", c = this.length, o = 0;
    else if (c === void 0 && typeof o == "string") A = o, c = this.length, o = 0;
    else if (isFinite(o)) o = o >>> 0, isFinite(c) ? (c = c >>> 0, A === void 0 && (A = "utf8")) : (A = c, c = void 0);
    else throw new Error("Buffer.write(string, encoding, offset[, length]) is no longer supported");
    let T = this.length - o;
    if ((c === void 0 || c > T) && (c = T), a.length > 0 && (c < 0 || o < 0) || o > this.length) throw new RangeError("Attempt to write outside buffer bounds");
    A || (A = "utf8");
    let j = !1;
    for (; ; ) switch (A) {
      case "hex":
        return N(this, a, o, c);
      case "utf8":
      case "utf-8":
        return M(this, a, o, c);
      case "ascii":
      case "latin1":
      case "binary":
        return x(this, a, o, c);
      case "base64":
        return O(this, a, o, c);
      case "ucs2":
      case "ucs-2":
      case "utf16le":
      case "utf-16le":
        return R(this, a, o, c);
      default:
        if (j) throw new TypeError("Unknown encoding: " + A);
        A = ("" + A).toLowerCase(), j = !0;
    }
  }, h.prototype.toJSON = function() {
    return { type: "Buffer", data: Array.prototype.slice.call(this._arr || this, 0) };
  };
  function b(a, o, c) {
    return o === 0 && c === a.length ? t.fromByteArray(a) : t.fromByteArray(a.slice(o, c));
  }
  function u(a, o, c) {
    c = Math.min(a.length, c);
    let A = [], T = o;
    for (; T < c; ) {
      let j = a[T], Q = null, ut = j > 239 ? 4 : j > 223 ? 3 : j > 191 ? 2 : 1;
      if (T + ut <= c) {
        let lt, at, wt, ct;
        switch (ut) {
          case 1:
            j < 128 && (Q = j);
            break;
          case 2:
            lt = a[T + 1], (lt & 192) === 128 && (ct = (j & 31) << 6 | lt & 63, ct > 127 && (Q = ct));
            break;
          case 3:
            lt = a[T + 1], at = a[T + 2], (lt & 192) === 128 && (at & 192) === 128 && (ct = (j & 15) << 12 | (lt & 63) << 6 | at & 63, ct > 2047 && (ct < 55296 || ct > 57343) && (Q = ct));
            break;
          case 4:
            lt = a[T + 1], at = a[T + 2], wt = a[T + 3], (lt & 192) === 128 && (at & 192) === 128 && (wt & 192) === 128 && (ct = (j & 15) << 18 | (lt & 63) << 12 | (at & 63) << 6 | wt & 63, ct > 65535 && ct < 1114112 && (Q = ct));
        }
      }
      Q === null ? (Q = 65533, ut = 1) : Q > 65535 && (Q -= 65536, A.push(Q >>> 10 & 1023 | 55296), Q = 56320 | Q & 1023), A.push(Q), T += ut;
    }
    return w(A);
  }
  var d = 4096;
  function w(a) {
    let o = a.length;
    if (o <= d) return String.fromCharCode.apply(String, a);
    let c = "", A = 0;
    for (; A < o; ) c += String.fromCharCode.apply(String, a.slice(A, A += d));
    return c;
  }
  function m(a, o, c) {
    let A = "";
    c = Math.min(a.length, c);
    for (let T = o; T < c; ++T) A += String.fromCharCode(a[T] & 127);
    return A;
  }
  function y(a, o, c) {
    let A = "";
    c = Math.min(a.length, c);
    for (let T = o; T < c; ++T) A += String.fromCharCode(a[T]);
    return A;
  }
  function B(a, o, c) {
    let A = a.length;
    (!o || o < 0) && (o = 0), (!c || c < 0 || c > A) && (c = A);
    let T = "";
    for (let j = o; j < c; ++j) T += jt[a[j]];
    return T;
  }
  function P(a, o, c) {
    let A = a.slice(o, c), T = "";
    for (let j = 0; j < A.length - 1; j += 2) T += String.fromCharCode(A[j] + A[j + 1] * 256);
    return T;
  }
  h.prototype.slice = function(a, o) {
    let c = this.length;
    a = ~~a, o = o === void 0 ? c : ~~o, a < 0 ? (a += c, a < 0 && (a = 0)) : a > c && (a = c), o < 0 ? (o += c, o < 0 && (o = 0)) : o > c && (o = c), o < a && (o = a);
    let A = this.subarray(a, o);
    return Object.setPrototypeOf(A, h.prototype), A;
  };
  function E(a, o, c) {
    if (a % 1 !== 0 || a < 0) throw new RangeError("offset is not uint");
    if (a + o > c) throw new RangeError("Trying to access beyond buffer length");
  }
  h.prototype.readUintLE = h.prototype.readUIntLE = function(a, o, c) {
    a = a >>> 0, o = o >>> 0, c || E(a, o, this.length);
    let A = this[a], T = 1, j = 0;
    for (; ++j < o && (T *= 256); ) A += this[a + j] * T;
    return A;
  }, h.prototype.readUintBE = h.prototype.readUIntBE = function(a, o, c) {
    a = a >>> 0, o = o >>> 0, c || E(a, o, this.length);
    let A = this[a + --o], T = 1;
    for (; o > 0 && (T *= 256); ) A += this[a + --o] * T;
    return A;
  }, h.prototype.readUint8 = h.prototype.readUInt8 = function(a, o) {
    return a = a >>> 0, o || E(a, 1, this.length), this[a];
  }, h.prototype.readUint16LE = h.prototype.readUInt16LE = function(a, o) {
    return a = a >>> 0, o || E(a, 2, this.length), this[a] | this[a + 1] << 8;
  }, h.prototype.readUint16BE = h.prototype.readUInt16BE = function(a, o) {
    return a = a >>> 0, o || E(a, 2, this.length), this[a] << 8 | this[a + 1];
  }, h.prototype.readUint32LE = h.prototype.readUInt32LE = function(a, o) {
    return a = a >>> 0, o || E(a, 4, this.length), (this[a] | this[a + 1] << 8 | this[a + 2] << 16) + this[a + 3] * 16777216;
  }, h.prototype.readUint32BE = h.prototype.readUInt32BE = function(a, o) {
    return a = a >>> 0, o || E(a, 4, this.length), this[a] * 16777216 + (this[a + 1] << 16 | this[a + 2] << 8 | this[a + 3]);
  }, h.prototype.readBigUInt64LE = Gt(function(a) {
    a = a >>> 0, bt(a, "offset");
    let o = this[a], c = this[a + 7];
    (o === void 0 || c === void 0) && ht(a, this.length - 8);
    let A = o + this[++a] * 2 ** 8 + this[++a] * 2 ** 16 + this[++a] * 2 ** 24, T = this[++a] + this[++a] * 2 ** 8 + this[++a] * 2 ** 16 + c * 2 ** 24;
    return BigInt(A) + (BigInt(T) << BigInt(32));
  }), h.prototype.readBigUInt64BE = Gt(function(a) {
    a = a >>> 0, bt(a, "offset");
    let o = this[a], c = this[a + 7];
    (o === void 0 || c === void 0) && ht(a, this.length - 8);
    let A = o * 2 ** 24 + this[++a] * 2 ** 16 + this[++a] * 2 ** 8 + this[++a], T = this[++a] * 2 ** 24 + this[++a] * 2 ** 16 + this[++a] * 2 ** 8 + c;
    return (BigInt(A) << BigInt(32)) + BigInt(T);
  }), h.prototype.readIntLE = function(a, o, c) {
    a = a >>> 0, o = o >>> 0, c || E(a, o, this.length);
    let A = this[a], T = 1, j = 0;
    for (; ++j < o && (T *= 256); ) A += this[a + j] * T;
    return T *= 128, A >= T && (A -= Math.pow(2, 8 * o)), A;
  }, h.prototype.readIntBE = function(a, o, c) {
    a = a >>> 0, o = o >>> 0, c || E(a, o, this.length);
    let A = o, T = 1, j = this[a + --A];
    for (; A > 0 && (T *= 256); ) j += this[a + --A] * T;
    return T *= 128, j >= T && (j -= Math.pow(2, 8 * o)), j;
  }, h.prototype.readInt8 = function(a, o) {
    return a = a >>> 0, o || E(a, 1, this.length), this[a] & 128 ? (255 - this[a] + 1) * -1 : this[a];
  }, h.prototype.readInt16LE = function(a, o) {
    a = a >>> 0, o || E(a, 2, this.length);
    let c = this[a] | this[a + 1] << 8;
    return c & 32768 ? c | 4294901760 : c;
  }, h.prototype.readInt16BE = function(a, o) {
    a = a >>> 0, o || E(a, 2, this.length);
    let c = this[a + 1] | this[a] << 8;
    return c & 32768 ? c | 4294901760 : c;
  }, h.prototype.readInt32LE = function(a, o) {
    return a = a >>> 0, o || E(a, 4, this.length), this[a] | this[a + 1] << 8 | this[a + 2] << 16 | this[a + 3] << 24;
  }, h.prototype.readInt32BE = function(a, o) {
    return a = a >>> 0, o || E(a, 4, this.length), this[a] << 24 | this[a + 1] << 16 | this[a + 2] << 8 | this[a + 3];
  }, h.prototype.readBigInt64LE = Gt(function(a) {
    a = a >>> 0, bt(a, "offset");
    let o = this[a], c = this[a + 7];
    (o === void 0 || c === void 0) && ht(a, this.length - 8);
    let A = this[a + 4] + this[a + 5] * 2 ** 8 + this[a + 6] * 2 ** 16 + (c << 24);
    return (BigInt(A) << BigInt(32)) + BigInt(o + this[++a] * 2 ** 8 + this[++a] * 2 ** 16 + this[++a] * 2 ** 24);
  }), h.prototype.readBigInt64BE = Gt(function(a) {
    a = a >>> 0, bt(a, "offset");
    let o = this[a], c = this[a + 7];
    (o === void 0 || c === void 0) && ht(a, this.length - 8);
    let A = (o << 24) + this[++a] * 2 ** 16 + this[++a] * 2 ** 8 + this[++a];
    return (BigInt(A) << BigInt(32)) + BigInt(this[++a] * 2 ** 24 + this[++a] * 2 ** 16 + this[++a] * 2 ** 8 + c);
  }), h.prototype.readFloatLE = function(a, o) {
    return a = a >>> 0, o || E(a, 4, this.length), e.read(this, a, !0, 23, 4);
  }, h.prototype.readFloatBE = function(a, o) {
    return a = a >>> 0, o || E(a, 4, this.length), e.read(this, a, !1, 23, 4);
  }, h.prototype.readDoubleLE = function(a, o) {
    return a = a >>> 0, o || E(a, 8, this.length), e.read(this, a, !0, 52, 8);
  }, h.prototype.readDoubleBE = function(a, o) {
    return a = a >>> 0, o || E(a, 8, this.length), e.read(this, a, !1, 52, 8);
  };
  function f(a, o, c, A, T, j) {
    if (!h.isBuffer(a)) throw new TypeError('"buffer" argument must be a Buffer instance');
    if (o > T || o < j) throw new RangeError('"value" argument is out of bounds');
    if (c + A > a.length) throw new RangeError("Index out of range");
  }
  h.prototype.writeUintLE = h.prototype.writeUIntLE = function(a, o, c, A) {
    if (a = +a, o = o >>> 0, c = c >>> 0, !A) {
      let Q = Math.pow(2, 8 * c) - 1;
      f(this, a, o, c, Q, 0);
    }
    let T = 1, j = 0;
    for (this[o] = a & 255; ++j < c && (T *= 256); ) this[o + j] = a / T & 255;
    return o + c;
  }, h.prototype.writeUintBE = h.prototype.writeUIntBE = function(a, o, c, A) {
    if (a = +a, o = o >>> 0, c = c >>> 0, !A) {
      let Q = Math.pow(2, 8 * c) - 1;
      f(this, a, o, c, Q, 0);
    }
    let T = c - 1, j = 1;
    for (this[o + T] = a & 255; --T >= 0 && (j *= 256); ) this[o + T] = a / j & 255;
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
  function g(a, o, c, A, T) {
    mt(o, A, T, a, c, 7);
    let j = Number(o & BigInt(4294967295));
    a[c++] = j, j = j >> 8, a[c++] = j, j = j >> 8, a[c++] = j, j = j >> 8, a[c++] = j;
    let Q = Number(o >> BigInt(32) & BigInt(4294967295));
    return a[c++] = Q, Q = Q >> 8, a[c++] = Q, Q = Q >> 8, a[c++] = Q, Q = Q >> 8, a[c++] = Q, c;
  }
  function I(a, o, c, A, T) {
    mt(o, A, T, a, c, 7);
    let j = Number(o & BigInt(4294967295));
    a[c + 7] = j, j = j >> 8, a[c + 6] = j, j = j >> 8, a[c + 5] = j, j = j >> 8, a[c + 4] = j;
    let Q = Number(o >> BigInt(32) & BigInt(4294967295));
    return a[c + 3] = Q, Q = Q >> 8, a[c + 2] = Q, Q = Q >> 8, a[c + 1] = Q, Q = Q >> 8, a[c] = Q, c + 8;
  }
  h.prototype.writeBigUInt64LE = Gt(function(a, o = 0) {
    return g(this, a, o, BigInt(0), BigInt("0xffffffffffffffff"));
  }), h.prototype.writeBigUInt64BE = Gt(function(a, o = 0) {
    return I(this, a, o, BigInt(0), BigInt("0xffffffffffffffff"));
  }), h.prototype.writeIntLE = function(a, o, c, A) {
    if (a = +a, o = o >>> 0, !A) {
      let ut = Math.pow(2, 8 * c - 1);
      f(this, a, o, c, ut - 1, -ut);
    }
    let T = 0, j = 1, Q = 0;
    for (this[o] = a & 255; ++T < c && (j *= 256); ) a < 0 && Q === 0 && this[o + T - 1] !== 0 && (Q = 1), this[o + T] = (a / j >> 0) - Q & 255;
    return o + c;
  }, h.prototype.writeIntBE = function(a, o, c, A) {
    if (a = +a, o = o >>> 0, !A) {
      let ut = Math.pow(2, 8 * c - 1);
      f(this, a, o, c, ut - 1, -ut);
    }
    let T = c - 1, j = 1, Q = 0;
    for (this[o + T] = a & 255; --T >= 0 && (j *= 256); ) a < 0 && Q === 0 && this[o + T + 1] !== 0 && (Q = 1), this[o + T] = (a / j >> 0) - Q & 255;
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
  }, h.prototype.writeBigInt64LE = Gt(function(a, o = 0) {
    return g(this, a, o, -BigInt("0x8000000000000000"), BigInt("0x7fffffffffffffff"));
  }), h.prototype.writeBigInt64BE = Gt(function(a, o = 0) {
    return I(this, a, o, -BigInt("0x8000000000000000"), BigInt("0x7fffffffffffffff"));
  });
  function L(a, o, c, A, T, j) {
    if (c + A > a.length) throw new RangeError("Index out of range");
    if (c < 0) throw new RangeError("Index out of range");
  }
  function H(a, o, c, A, T) {
    return o = +o, c = c >>> 0, T || L(a, o, c, 4), e.write(a, o, c, A, 23, 4), c + 4;
  }
  h.prototype.writeFloatLE = function(a, o, c) {
    return H(this, a, o, !0, c);
  }, h.prototype.writeFloatBE = function(a, o, c) {
    return H(this, a, o, !1, c);
  };
  function K(a, o, c, A, T) {
    return o = +o, c = c >>> 0, T || L(a, o, c, 8), e.write(a, o, c, A, 52, 8), c + 8;
  }
  h.prototype.writeDoubleLE = function(a, o, c) {
    return K(this, a, o, !0, c);
  }, h.prototype.writeDoubleBE = function(a, o, c) {
    return K(this, a, o, !1, c);
  }, h.prototype.copy = function(a, o, c, A) {
    if (!h.isBuffer(a)) throw new TypeError("argument should be a Buffer");
    if (c || (c = 0), !A && A !== 0 && (A = this.length), o >= a.length && (o = a.length), o || (o = 0), A > 0 && A < c && (A = c), A === c || a.length === 0 || this.length === 0) return 0;
    if (o < 0) throw new RangeError("targetStart out of bounds");
    if (c < 0 || c >= this.length) throw new RangeError("Index out of range");
    if (A < 0) throw new RangeError("sourceEnd out of bounds");
    A > this.length && (A = this.length), a.length - o < A - c && (A = a.length - o + c);
    let T = A - c;
    return this === a && typeof Uint8Array.prototype.copyWithin == "function" ? this.copyWithin(o, c, A) : Uint8Array.prototype.set.call(a, this.subarray(c, A), o), T;
  }, h.prototype.fill = function(a, o, c, A) {
    if (typeof a == "string") {
      if (typeof o == "string" ? (A = o, o = 0, c = this.length) : typeof c == "string" && (A = c, c = this.length), A !== void 0 && typeof A != "string") throw new TypeError("encoding must be a string");
      if (typeof A == "string" && !h.isEncoding(A)) throw new TypeError("Unknown encoding: " + A);
      if (a.length === 1) {
        let j = a.charCodeAt(0);
        (A === "utf8" && j < 128 || A === "latin1") && (a = j);
      }
    } else typeof a == "number" ? a = a & 255 : typeof a == "boolean" && (a = Number(a));
    if (o < 0 || this.length < o || this.length < c) throw new RangeError("Out of range index");
    if (c <= o) return this;
    o = o >>> 0, c = c === void 0 ? this.length : c >>> 0, a || (a = 0);
    let T;
    if (typeof a == "number") for (T = o; T < c; ++T) this[T] = a;
    else {
      let j = h.isBuffer(a) ? a : h.from(a, A), Q = j.length;
      if (Q === 0) throw new TypeError('The value "' + a + '" is invalid for argument "value"');
      for (T = 0; T < c - o; ++T) this[T + o] = j[T % Q];
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
      set code(A) {
        Object.defineProperty(this, "code", { configurable: !0, enumerable: !0, value: A, writable: !0 });
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
    let A = `The value of "${a}" is out of range.`, T = c;
    return Number.isInteger(c) && Math.abs(c) > 2 ** 32 ? T = xt(String(c)) : typeof c == "bigint" && (T = String(c), (c > BigInt(2) ** BigInt(32) || c < -(BigInt(2) ** BigInt(32))) && (T = xt(T)), T += "n"), A += ` It must be ${o}. Received ${T}`, A;
  }, RangeError);
  function xt(a) {
    let o = "", c = a.length, A = a[0] === "-" ? 1 : 0;
    for (; c >= A + 4; c -= 3) o = `_${a.slice(c - 3, c)}${o}`;
    return `${a.slice(0, c)}${o}`;
  }
  function dt(a, o, c) {
    bt(o, "offset"), (a[o] === void 0 || a[o + c] === void 0) && ht(o, a.length - (c + 1));
  }
  function mt(a, o, c, A, T, j) {
    if (a > c || a < o) {
      let Q = typeof o == "bigint" ? "n" : "", ut;
      throw o === 0 || o === BigInt(0) ? ut = `>= 0${Q} and < 2${Q} ** ${(j + 1) * 8}${Q}` : ut = `>= -(2${Q} ** ${(j + 1) * 8 - 1}${Q}) and < 2 ** ${(j + 1) * 8 - 1}${Q}`, new tt.ERR_OUT_OF_RANGE("value", ut, a);
    }
    dt(A, T, j);
  }
  function bt(a, o) {
    if (typeof a != "number") throw new tt.ERR_INVALID_ARG_TYPE(o, "number", a);
  }
  function ht(a, o, c) {
    throw Math.floor(a) !== a ? (bt(a, c), new tt.ERR_OUT_OF_RANGE("offset", "an integer", a)) : o < 0 ? new tt.ERR_BUFFER_OUT_OF_BOUNDS() : new tt.ERR_OUT_OF_RANGE("offset", `>= 0 and <= ${o}`, a);
  }
  var pt = /[^+/0-9A-Za-z-_]/g;
  function nn(a) {
    if (a = a.split("=")[0], a = a.trim().replace(pt, ""), a.length < 2) return "";
    for (; a.length % 4 !== 0; ) a = a + "=";
    return a;
  }
  function Bt(a, o) {
    o = o || 1 / 0;
    let c, A = a.length, T = null, j = [];
    for (let Q = 0; Q < A; ++Q) {
      if (c = a.charCodeAt(Q), c > 55295 && c < 57344) {
        if (!T) {
          if (c > 56319) {
            (o -= 3) > -1 && j.push(239, 191, 189);
            continue;
          } else if (Q + 1 === A) {
            (o -= 3) > -1 && j.push(239, 191, 189);
            continue;
          }
          T = c;
          continue;
        }
        if (c < 56320) {
          (o -= 3) > -1 && j.push(239, 191, 189), T = c;
          continue;
        }
        c = (T - 55296 << 10 | c - 56320) + 65536;
      } else T && (o -= 3) > -1 && j.push(239, 191, 189);
      if (T = null, c < 128) {
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
  function Dt(a) {
    let o = [];
    for (let c = 0; c < a.length; ++c) o.push(a.charCodeAt(c) & 255);
    return o;
  }
  function dn(a, o) {
    let c, A, T, j = [];
    for (let Q = 0; Q < a.length && !((o -= 2) < 0); ++Q) c = a.charCodeAt(Q), A = c >> 8, T = c % 256, j.push(T), j.push(A);
    return j;
  }
  function Lt(a) {
    return t.toByteArray(nn(a));
  }
  function Nt(a, o, c, A) {
    let T;
    for (T = 0; T < A && !(T + c >= o.length || T >= a.length); ++T) o[T + c] = a[T];
    return T;
  }
  function Ut(a, o) {
    return a instanceof o || a != null && a.constructor != null && a.constructor.name != null && a.constructor.name === o.name;
  }
  function Rt(a) {
    return a !== a;
  }
  var jt = function() {
    let a = "0123456789abcdef", o = new Array(256);
    for (let c = 0; c < 16; ++c) {
      let A = c * 16;
      for (let T = 0; T < 16; ++T) o[A + T] = a[c] + a[T];
    }
    return o;
  }();
  function Gt(a) {
    return typeof BigInt > "u" ? zt : a;
  }
  function zt() {
    throw new Error("BigInt not supported");
  }
});
cu(Iu());
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
class gi {
  constructor(t) {
    this.state = gt.Status.INIT, this.actorCache = /* @__PURE__ */ new Map(), this.config = t;
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
    return di.fromPrincipal({
      principal: t,
      subAccount: void 0
      // Default subaccount
    }).toHex();
  }
  // Subclasses must implement how to get the principal
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
    if (!(this.state === gt.Status.DISCONNECTING || this.state === gt.Status.CONNECTING || this.state === gt.Status.DISCONNECTED)) {
      this.setState(gt.Status.DISCONNECTING);
      try {
        await this.disconnectInternal(), this.config?.localStorageKey && localStorage.removeItem(this.config.localStorageKey), this.actorCache.clear();
      } catch (t) {
        console.error(`[${this.walletName}] Error during disconnect:`, t);
      } finally {
        this.cleanupInternal(), this.setState(gt.Status.DISCONNECTED);
      }
    }
  }
  // Abstract methods for subclass-specific disconnect logic and resource cleanup
  // Default implementations do nothing, subclasses can override if needed.
  async disconnectInternal() {
  }
  cleanupInternal() {
  }
}
const $n = class $n extends gi {
  // Constructor calls super and does II specific initialization
  constructor(t) {
    super(t), this.walletName = $n.walletName, this.logo = $n.logo, this.authClient = null, this.agent = null, Gc.create({
      idleOptions: {
        idleTimeout: Number(this.config.adapters?.ii?.config?.timeout || this.config.timeout || 1e3 * 60 * 60 * 24),
        disableDefaultIdleCallback: !0
      }
    }).then((e) => {
      this.authClient = e, this.authClient.idleManager?.registerCallback?.(() => this.refreshLogin());
    }).catch((e) => {
      console.error("[II] Failed to create AuthClient:", e), this.setState(gt.Status.ERROR);
    });
  }
  // Use the resolved config for agent initialization
  async initAgent(t) {
    if (this.agent = new Ye({
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
      if (this.setState(gt.Status.CONNECTING), !this.authClient && (await new Promise((n) => setTimeout(n, 500)), !this.authClient))
        throw new Error("AuthClient failed to initialize.");
      if (!await this.authClient.isAuthenticated())
        return new Promise((n, i) => {
          this.authClient.login({
            derivationOrigin: this.config.derivationOrigin,
            identityProvider: this.config.adapters?.ii?.config?.identityProvider || this.config.identityProvider,
            maxTimeToLive: this.config.delegationTimeout,
            onSuccess: () => {
              this._continueLogin(this.config.hostUrl).then((s) => {
                this.setState(gt.Status.READY), n(s);
              }).catch(i);
            },
            onError: (s) => {
              console.error("[II] Login error:", s), this.disconnect().catch(() => {
              }), this.setState(gt.Status.ERROR), i(new Error("II Authentication failed: " + s));
            }
          });
        });
      const e = await this._continueLogin(this.config.hostUrl);
      return this.setState(gt.Status.READY), e;
    } catch (t) {
      throw console.error("[II] Connect error:", t), this.setState(gt.Status.ERROR), await this.disconnect().catch(() => {
      }), t;
    }
  }
  async _continueLogin(t) {
    if (!this.authClient) throw new Error("AuthClient not available in _continueLogin");
    try {
      const e = this.authClient.getIdentity(), n = e.getPrincipal();
      if (n.isAnonymous())
        throw new Error("Login resulted in anonymous principal");
      return await this.initAgent(e), {
        owner: n,
        // Derive subaccount using the method from BaseIcAdapter via getAccountId (implicitly)
        // Or calculate directly if preferred, but using getAccountId promotes reuse
        subaccount: Ma(await this.getAccountId() || "")
      };
    } catch (e) {
      throw console.error("[II] Error during _continueLogin:", e), this.setState(gt.Status.ERROR), await this.disconnect().catch(() => {
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
    return Tn.createActor(e, {
      agent: this.agent,
      canisterId: t
    });
  }
  async getPrincipal() {
    if (!this.authClient) throw new Error("Not connected");
    const t = this.authClient.getIdentity();
    if (!t) throw new Error("Identity not available");
    return t.getPrincipal();
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
$n.logo = eu, $n.walletName = "Internet Identity";
let mr = $n;
const xu = "data:image/webp;base64,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", tr = class tr extends gi {
  // Update every 2 seconds
  // state and config are inherited
  // Constructor calls super and does Plug specific initialization
  constructor(t) {
    super(t), this.walletName = tr.walletName, this.logo = tr.logo, this.readyState = "NotDetected", this._connectionState = !1, this._connectionStateTimestamp = 0, this._connectionStateUpdateInterval = 2e3, this.initPlug(), this.updateConnectionState();
  }
  // Initialize Plug and set readyState accordingly
  initPlug() {
    typeof window < "u" && window.ic?.plug ? window.ic.plug.isConnected().then((t) => {
      this.readyState = t ? "Connected" : "Installed", t ? this.setState(gt.Status.CONNECTED) : this.setState(gt.Status.READY);
    }) : (this.readyState = "NotDetected", this.setState(gt.Status.INIT));
  }
  // Implement abstract methods
  async isAvailable() {
    return this.readyState !== "NotDetected";
  }
  async connect() {
    if (this.setState(gt.Status.CONNECTING), await this.isConnected())
      this.readyState = "Connected";
    else {
      if (!window.ic?.plug)
        throw this.setState(gt.Status.ERROR), new Error("Plug Wallet extension not detected.");
      try {
        if (!await window.ic.plug.requestConnect({
          whitelist: this.config.delegationTargets?.map((i) => typeof i == "string" ? i : i.toText()) || [],
          host: this.config.hostUrl,
          timeout: this.config.adapters?.plug?.config?.timeout || this.config.timeout || 6048e5,
          onConnectionUpdate: () => this.handleConnectionUpdate()
        }))
          throw this.setState(gt.Status.READY), new Error("User declined the connection request");
        this.readyState = "Connected";
      } catch (n) {
        throw this.setState(gt.Status.READY), console.error("Failed to connect to Plug wallet:", n), n;
      }
    }
    this._connectionState = !0, this._connectionStateTimestamp = Date.now(), this.setState(gt.Status.CONNECTED);
    const e = await this.getPrincipal();
    return {
      owner: e,
      subaccount: di.fromPrincipal({
        principal: e,
        subAccount: void 0
      }).toUint8Array()
    };
  }
  // disconnect method is inherited, uses disconnectInternal and cleanupInternal
  async getPrincipal() {
    if (this.readyState === "Connected" && window.ic?.plug?.principalId)
      return qe.fromText(window.ic.plug.principalId);
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
            return (...p) => i.then((v) => {
              const S = v[h];
              return typeof S == "function" ? S.apply(v, p) : S;
            });
        }
      });
    } catch (i) {
      throw console.error("Failed to create actor through Plug:", i), i;
    }
  }
  // Plug specific connection state update
  async updateConnectionState() {
    window.ic?.plug?.isConnected ? (this._connectionState = await window.ic.plug.isConnected(), this._connectionStateTimestamp = Date.now(), this.readyState = this._connectionState ? "Connected" : "Installed", this._connectionState && this.state !== gt.Status.CONNECTED ? this.setState(gt.Status.CONNECTED) : !this._connectionState && this.state === gt.Status.CONNECTED && this.setState(gt.Status.READY)) : (this._connectionState = !1, this.readyState = "NotDetected", this.setState(gt.Status.INIT));
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
tr.logo = xu, tr.walletName = "Plug";
let br = tr;
const Bu = "data:image/webp;base64,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", Vr = 4e3, Zi = 1e5, wn = (r) => {
  if (typeof globalThis.Buffer < "u")
    return globalThis.Buffer.from(r, "base64").buffer;
  if (typeof globalThis.atob < "u")
    return Uint8Array.from(globalThis.atob(r), (t) => t.charCodeAt(0)).buffer;
  throw Error("Could not decode base64 string");
}, vr = (r) => {
  if (typeof globalThis.Buffer < "u")
    return globalThis.Buffer.from(r).toString("base64");
  if (typeof globalThis.btoa < "u")
    return btoa(Array.from({ length: Math.ceil(r.byteLength / Zi) }).map((t, e) => String.fromCharCode(...new Uint8Array(r.slice(e * Zi, (e + 1) * Zi)))).join(""));
  throw Error("Could not encode base64 string");
};
var Qn = function(r, t, e, n, i) {
  if (typeof t == "function" ? r !== t || !0 : !t.has(r)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
  return t.set(r, e), e;
}, Zt = function(r, t, e, n) {
  if (typeof t == "function" ? r !== t || !0 : !t.has(r)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
  return e === "m" ? n : e === "a" ? n.call(r) : n ? n.value : t.get(r);
}, xe, on, Zn, Qr;
class hn extends Error {
  constructor(t) {
    super(t.message), Object.setPrototypeOf(this, hn.prototype), this.code = t.code, this.data = t.data;
  }
}
const Mo = (r) => new hn({
  code: Vr,
  message: r instanceof Error ? r.message : "Network error"
}), Ln = (r) => {
  if ("error" in r)
    throw new hn(r.error);
  if ("result" in r)
    return r.result;
  throw new hn({
    code: Vr,
    message: "Invalid response"
  });
};
class Ca {
  constructor(t) {
    xe.set(this, void 0), on.set(this, void 0), Zn.set(this, void 0), Qr.set(this, void 0), Qn(this, xe, Object.assign({ autoCloseTransportChannel: !0, closeTransportChannelAfter: 200, crypto: globalThis.crypto }, t));
  }
  get transport() {
    return Zt(this, xe, "f").transport;
  }
  async openChannel() {
    if (clearTimeout(Zt(this, Qr, "f")), Zt(this, Zn, "f") && await Zt(this, Zn, "f"), Zt(this, on, "f") && !Zt(this, on, "f").closed)
      return Zt(this, on, "f");
    const t = Zt(this, xe, "f").transport.establishChannel();
    return Qn(this, Zn, t.then(() => {
    }).catch(() => {
    })), Qn(this, on, void 0), Qn(this, on, await t.catch((e) => {
      throw Mo(e);
    })), Qn(this, Zn, void 0), Zt(this, on, "f");
  }
  async closeChannel() {
    var t;
    await ((t = Zt(this, on, "f")) === null || t === void 0 ? void 0 : t.close());
  }
  async transformRequest(t) {
    return Zt(this, xe, "f").derivationOrigin ? Object.assign(Object.assign({}, t), { params: Object.assign(Object.assign({}, t.params), { icrc95DerivationOrigin: Zt(this, xe, "f").derivationOrigin }) }) : t;
  }
  async sendRequest(t) {
    const e = await this.openChannel();
    return new Promise(async (n, i) => {
      const s = e.addEventListener("response", async (h) => {
        h.id === t.id && (s(), l(), n(h), Zt(this, xe, "f").autoCloseTransportChannel && Qn(this, Qr, setTimeout(() => {
          e.closed || e.close();
        }, Zt(this, xe, "f").closeTransportChannelAfter)));
      }), l = e.addEventListener("close", () => {
        s(), l(), i(new hn({
          code: Vr,
          message: "Channel was closed before a response was received"
        }));
      });
      try {
        await e.send(await this.transformRequest(t));
      } catch (h) {
        s(), l(), i(Mo(h));
      }
    });
  }
  async supportedStandards() {
    const t = await this.sendRequest({
      id: Zt(this, xe, "f").crypto.randomUUID(),
      jsonrpc: "2.0",
      method: "icrc25_supported_standards"
    });
    return Ln(t).supportedStandards;
  }
  async requestPermissions(t) {
    const e = await this.sendRequest({
      id: Zt(this, xe, "f").crypto.randomUUID(),
      jsonrpc: "2.0",
      method: "icrc25_request_permissions",
      params: { scopes: t }
    });
    return Ln(e).scopes;
  }
  async permissions() {
    const t = await this.sendRequest({
      id: Zt(this, xe, "f").crypto.randomUUID(),
      jsonrpc: "2.0",
      method: "icrc25_permissions"
    });
    return Ln(t).scopes;
  }
  async accounts() {
    const t = await this.sendRequest({
      id: Zt(this, xe, "f").crypto.randomUUID(),
      jsonrpc: "2.0",
      method: "icrc27_accounts"
    });
    return Ln(t).accounts.map(({ owner: n, subaccount: i }) => ({
      owner: qe.fromText(n),
      subaccount: i === void 0 ? void 0 : wn(i)
    }));
  }
  async delegation(t) {
    var e;
    const n = await this.sendRequest({
      id: Zt(this, xe, "f").crypto.randomUUID(),
      jsonrpc: "2.0",
      method: "icrc34_delegation",
      params: {
        publicKey: vr(t.publicKey),
        targets: (e = t.targets) === null || e === void 0 ? void 0 : e.map((s) => s.toText()),
        maxTimeToLive: t.maxTimeToLive === void 0 ? void 0 : String(t.maxTimeToLive)
      }
    }), i = Ln(n);
    return Sa.fromDelegations(i.signerDelegation.map((s) => {
      var l;
      return {
        delegation: new Ia(wn(s.delegation.pubkey), BigInt(s.delegation.expiration), (l = s.delegation.targets) === null || l === void 0 ? void 0 : l.map((h) => qe.fromText(h))),
        signature: wn(s.signature)
      };
    }), wn(i.publicKey));
  }
  async callCanister(t) {
    const e = await this.sendRequest({
      id: Zt(this, xe, "f").crypto.randomUUID(),
      jsonrpc: "2.0",
      method: "icrc49_call_canister",
      params: {
        canisterId: t.canisterId.toText(),
        sender: t.sender.toText(),
        method: t.method,
        arg: vr(t.arg)
      }
    }), n = Ln(e), i = wn(n.contentMap), s = wn(n.certificate);
    return { contentMap: i, certificate: s };
  }
  async batchCallCanister(t) {
    const e = await this.sendRequest({
      id: Zt(this, xe, "f").crypto.randomUUID(),
      jsonrpc: "2.0",
      method: "icrc112_batch_call_canister",
      params: {
        sender: t.sender.toText(),
        requests: t.requests.map((i) => i.map((s) => ({
          canisterId: s.canisterId.toText(),
          method: s.method,
          arg: vr(s.arg)
        }))),
        validation: t.validation ? {
          canisterId: t.validation.canisterId.toText(),
          method: t.validation.method
        } : void 0
      }
    }), n = Ln(e);
    if (t.requests.length !== n.responses.length || t.requests.some((i, s) => i.length !== n.responses[s].length))
      throw new hn({
        code: Vr,
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
xe = /* @__PURE__ */ new WeakMap(), on = /* @__PURE__ */ new WeakMap(), Zn = /* @__PURE__ */ new WeakMap(), Qr = /* @__PURE__ */ new WeakMap();
const Nu = (r) => typeof r == "object" && !!r && "jsonrpc" in r && r.jsonrpc === "2.0", La = (r) => Nu(r) && "id" in r && (typeof r.id == "string" || typeof r.id == "number");
var So = function(r, t, e, n, i) {
  if (typeof t == "function" ? r !== t || !0 : !t.has(r)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
  return t.set(r, e), e;
}, Ae = function(r, t, e, n) {
  if (typeof t == "function" ? r !== t || !0 : !t.has(r)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
  return e === "m" ? n : e === "a" ? n.call(r) : n ? n.value : t.get(r);
}, dr, ke, Yn;
class Tu {
  constructor(t) {
    dr.set(this, /* @__PURE__ */ new Set()), ke.set(this, void 0), Yn.set(this, !1), So(this, ke, Object.assign({ window: globalThis.window, manageFocus: !0 }, t));
  }
  get closed() {
    return Ae(this, Yn, "f");
  }
  addEventListener(...[t, e]) {
    switch (t) {
      case "close":
        return Ae(this, dr, "f").add(e), () => {
          Ae(this, dr, "f").delete(e);
        };
      case "response":
        const n = async (i) => {
          i.source !== Ae(this, ke, "f").signerWindow || i.origin !== Ae(this, ke, "f").signerOrigin || !La(i.data) || e(i.data);
        };
        return Ae(this, ke, "f").window.addEventListener("message", n), () => {
          Ae(this, ke, "f").window.removeEventListener("message", n);
        };
    }
  }
  async send(t) {
    if (Ae(this, Yn, "f"))
      throw new zn("Communication channel is closed");
    Ae(this, ke, "f").signerWindow.postMessage(t, Ae(this, ke, "f").signerOrigin), Ae(this, ke, "f").manageFocus && Ae(this, ke, "f").signerWindow.focus();
  }
  async close() {
    Ae(this, Yn, "f") || (So(this, Yn, !0), Ae(this, ke, "f").signerWindow.close(), Ae(this, ke, "f").manageFocus && Ae(this, ke, "f").window.focus(), Ae(this, dr, "f").forEach((t) => t()));
  }
}
dr = /* @__PURE__ */ new WeakMap(), ke = /* @__PURE__ */ new WeakMap(), Yn = /* @__PURE__ */ new WeakMap();
const ku = (r) => {
  try {
    const t = new URL(r);
    return t.protocol === "https:" || t.hostname === "127.0.0.1" || t.hostname.split(".").slice(-1)[0] === "localhost";
  } catch {
    return !1;
  }
};
var Cu = function(r, t, e, n, i) {
  if (typeof t == "function" ? r !== t || !0 : !t.has(r)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
  return t.set(r, e), e;
}, fe = function(r, t, e, n) {
  if (e === "a" && !n) throw new TypeError("Private accessor was defined without a getter");
  if (typeof t == "function" ? r !== t || !n : !t.has(r)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
  return e === "m" ? n : e === "a" ? n.call(r) : n ? n.value : t.get(r);
}, Mn, be, Ra, Io, Yi, Gi;
class Lu {
  constructor(t) {
    Mn.add(this), be.set(this, void 0), Cu(this, be, Object.assign({ establishTimeout: 1e4, disconnectTimeout: 2e3, statusPollingRate: 300, window: globalThis.window, crypto: globalThis.crypto }, t)), fe(this, Mn, "m", Ra).call(this);
  }
}
be = /* @__PURE__ */ new WeakMap(), Mn = /* @__PURE__ */ new WeakSet(), Ra = function() {
  const t = [], e = () => {
    const l = fe(this, be, "f").crypto.randomUUID();
    return t.push(l), l;
  }, n = fe(this, Mn, "m", Yi).call(this, (l) => {
    t.includes(l.data.id) && (n(), clearInterval(s), clearTimeout(i), fe(this, be, "f").onEstablish(l.origin), fe(this, Mn, "m", Io).call(this, l.origin));
  }), i = setTimeout(() => {
    n(), clearInterval(s), fe(this, be, "f").onEstablishTimeout();
  }, fe(this, be, "f").establishTimeout), s = setInterval(() => fe(this, Mn, "m", Gi).call(this, e()), fe(this, be, "f").statusPollingRate);
}, Io = function(t) {
  let e, n, i = [];
  const s = (v) => {
    const S = i.findIndex((C) => C.id === v);
    return S > -1 && i.splice(S, 1), S > -1;
  }, l = () => {
    const v = fe(this, be, "f").crypto.randomUUID(), S = (/* @__PURE__ */ new Date()).getTime();
    return i = i.filter((C) => S - fe(this, be, "f").disconnectTimeout > C.time), i.push({ id: v, time: S }), v;
  }, h = () => {
    clearTimeout(n), n = setTimeout(() => {
      p(), clearInterval(e), fe(this, be, "f").onDisconnect();
    }, fe(this, be, "f").disconnectTimeout);
  }, p = fe(this, Mn, "m", Yi).call(this, (v) => {
    v.origin === t && s(v.data.id) && h();
  });
  h(), e = setInterval(() => fe(this, Mn, "m", Gi).call(this, l()), fe(this, be, "f").statusPollingRate);
}, Yi = function(t) {
  const e = (n) => {
    n.source === fe(this, be, "f").signerWindow && La(n.data) && "result" in n.data && n.data.result === "ready" && t(n);
  };
  return fe(this, be, "f").window.addEventListener("message", e), () => fe(this, be, "f").window.removeEventListener("message", e);
}, Gi = function(t) {
  fe(this, be, "f").signerWindow.postMessage({ jsonrpc: "2.0", id: t, method: "icrc29_status" }, "*");
};
var Ru = function(r, t, e, n, i) {
  if (typeof t == "function" ? r !== t || !0 : !t.has(r)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
  return t.set(r, e), e;
}, Rn = function(r, t, e, n) {
  if (typeof t == "function" ? r !== t || !0 : !t.has(r)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
  return e === "m" ? n : e === "a" ? n.call(r) : n ? n.value : t.get(r);
}, $e;
const Du = "https://github.com/slide-computer/signer-js/blob/main/packages/signer-web/README.md#channels-must-be-established-in-a-click-handler";
class zn extends Error {
  constructor(t) {
    super(t), Object.setPrototypeOf(this, zn.prototype);
  }
}
let Ms = !1;
globalThis.window && (globalThis.window.addEventListener("click", () => Ms = !0, !0), globalThis.window.addEventListener("click", () => Ms = !1));
class Da {
  constructor(t) {
    if ($e.set(this, void 0), !ku(t.url))
      throw new zn("Invalid signer RPC url");
    Ru(this, $e, Object.assign({ windowOpenerFeatures: "", window: globalThis.window, establishTimeout: 12e4, disconnectTimeout: 2e3, statusPollingRate: 300, crypto: globalThis.crypto, manageFocus: !0, closeOnEstablishTimeout: !0, detectNonClickEstablishment: !0 }, t));
  }
  async establishChannel() {
    if (Rn(this, $e, "f").detectNonClickEstablishment && !Ms)
      throw new zn(`Signer window should not be opened outside of click handler, see: ${Du}`);
    const t = Rn(this, $e, "f").window.open(Rn(this, $e, "f").url, "signerWindow", Rn(this, $e, "f").windowOpenerFeatures);
    if (!t)
      throw new zn("Signer window could not be opened");
    return new Promise((e, n) => {
      let i;
      new Lu(Object.assign(Object.assign({}, Rn(this, $e, "f")), { signerWindow: t, onEstablish: (s) => {
        i = new Tu(Object.assign(Object.assign({}, Rn(this, $e, "f")), { signerOrigin: s, signerWindow: t })), e(i);
      }, onEstablishTimeout: () => {
        Rn(this, $e, "f").closeOnEstablishTimeout && t.close(), n(new zn("Communication channel could not be established within a reasonable time"));
      }, onDisconnect: () => i.close() }));
    });
  }
}
$e = /* @__PURE__ */ new WeakMap();
var Ou = /^-?(?:\d+(?:\.\d*)?|\.\d+)(?:e[+-]?\d+)?$/i, Ki = Math.ceil, Fe = Math.floor, Ce = "[BigNumber Error] ", xo = Ce + "Number primitive has more than 15 significant digits: ", Qe = 1e14, vt = 14, Bo = 9007199254740991, Ji = [1, 10, 100, 1e3, 1e4, 1e5, 1e6, 1e7, 1e8, 1e9, 1e10, 1e11, 1e12, 1e13], yn = 1e7, De = 1e9;
function Oa(r) {
  var t, e, n, i = _.prototype = { constructor: _, toString: null, valueOf: null }, s = new _(1), l = 20, h = 4, p = -7, v = 21, S = -1e7, C = 1e7, F = !1, U = 1, z = 0, D = {
    prefix: "",
    groupSize: 3,
    secondaryGroupSize: 0,
    groupSeparator: ",",
    decimalSeparator: ".",
    fractionGroupSize: 0,
    fractionGroupSeparator: " ",
    // non-breaking space
    suffix: ""
  }, k = "0123456789abcdefghijklmnopqrstuvwxyz", Z = !0;
  function _(N, M) {
    var x, O, R, b, u, d, w, m, y = this;
    if (!(y instanceof _)) return new _(N, M);
    if (M == null) {
      if (N && N._isBigNumber === !0) {
        y.s = N.s, !N.c || N.e > C ? y.c = y.e = null : N.e < S ? y.c = [y.e = 0] : (y.e = N.e, y.c = N.c.slice());
        return;
      }
      if ((d = typeof N == "number") && N * 0 == 0) {
        if (y.s = 1 / N < 0 ? (N = -N, -1) : 1, N === ~~N) {
          for (b = 0, u = N; u >= 10; u /= 10, b++) ;
          b > C ? y.c = y.e = null : (y.e = b, y.c = [N]);
          return;
        }
        m = String(N);
      } else {
        if (!Ou.test(m = String(N))) return n(y, m, d);
        y.s = m.charCodeAt(0) == 45 ? (m = m.slice(1), -1) : 1;
      }
      (b = m.indexOf(".")) > -1 && (m = m.replace(".", "")), (u = m.search(/e/i)) > 0 ? (b < 0 && (b = u), b += +m.slice(u + 1), m = m.substring(0, u)) : b < 0 && (b = m.length);
    } else {
      if (_t(M, 2, k.length, "Base"), M == 10 && Z)
        return y = new _(N), X(y, l + y.e + 1, h);
      if (m = String(N), d = typeof N == "number") {
        if (N * 0 != 0) return n(y, m, d, M);
        if (y.s = 1 / N < 0 ? (m = m.slice(1), -1) : 1, _.DEBUG && m.replace(/^0\.0*|\./, "").length > 15)
          throw Error(xo + N);
      } else
        y.s = m.charCodeAt(0) === 45 ? (m = m.slice(1), -1) : 1;
      for (x = k.slice(0, M), b = u = 0, w = m.length; u < w; u++)
        if (x.indexOf(O = m.charAt(u)) < 0) {
          if (O == ".") {
            if (u > b) {
              b = w;
              continue;
            }
          } else if (!R && (m == m.toUpperCase() && (m = m.toLowerCase()) || m == m.toLowerCase() && (m = m.toUpperCase()))) {
            R = !0, u = -1, b = 0;
            continue;
          }
          return n(y, String(N), d, M);
        }
      d = !1, m = e(m, M, 10, y.s), (b = m.indexOf(".")) > -1 ? m = m.replace(".", "") : b = m.length;
    }
    for (u = 0; m.charCodeAt(u) === 48; u++) ;
    for (w = m.length; m.charCodeAt(--w) === 48; ) ;
    if (m = m.slice(u, ++w)) {
      if (w -= u, d && _.DEBUG && w > 15 && (N > Bo || N !== Fe(N)))
        throw Error(xo + y.s * N);
      if ((b = b - u - 1) > C)
        y.c = y.e = null;
      else if (b < S)
        y.c = [y.e = 0];
      else {
        if (y.e = b, y.c = [], u = (b + 1) % vt, b < 0 && (u += vt), u < w) {
          for (u && y.c.push(+m.slice(0, u)), w -= vt; u < w; )
            y.c.push(+m.slice(u, u += vt));
          u = vt - (m = m.slice(u)).length;
        } else
          u -= w;
        for (; u--; m += "0") ;
        y.c.push(+m);
      }
    } else
      y.c = [y.e = 0];
  }
  _.clone = Oa, _.ROUND_UP = 0, _.ROUND_DOWN = 1, _.ROUND_CEIL = 2, _.ROUND_FLOOR = 3, _.ROUND_HALF_UP = 4, _.ROUND_HALF_DOWN = 5, _.ROUND_HALF_EVEN = 6, _.ROUND_HALF_CEIL = 7, _.ROUND_HALF_FLOOR = 8, _.EUCLID = 9, _.config = _.set = function(N) {
    var M, x;
    if (N != null)
      if (typeof N == "object") {
        if (N.hasOwnProperty(M = "DECIMAL_PLACES") && (x = N[M], _t(x, 0, De, M), l = x), N.hasOwnProperty(M = "ROUNDING_MODE") && (x = N[M], _t(x, 0, 8, M), h = x), N.hasOwnProperty(M = "EXPONENTIAL_AT") && (x = N[M], x && x.pop ? (_t(x[0], -1e9, 0, M), _t(x[1], 0, De, M), p = x[0], v = x[1]) : (_t(x, -1e9, De, M), p = -(v = x < 0 ? -x : x))), N.hasOwnProperty(M = "RANGE"))
          if (x = N[M], x && x.pop)
            _t(x[0], -1e9, -1, M), _t(x[1], 1, De, M), S = x[0], C = x[1];
          else if (_t(x, -1e9, De, M), x)
            S = -(C = x < 0 ? -x : x);
          else
            throw Error(Ce + M + " cannot be zero: " + x);
        if (N.hasOwnProperty(M = "CRYPTO"))
          if (x = N[M], x === !!x)
            if (x)
              if (typeof crypto < "u" && crypto && (crypto.getRandomValues || crypto.randomBytes))
                F = x;
              else
                throw F = !x, Error(Ce + "crypto unavailable");
            else
              F = x;
          else
            throw Error(Ce + M + " not true or false: " + x);
        if (N.hasOwnProperty(M = "MODULO_MODE") && (x = N[M], _t(x, 0, 9, M), U = x), N.hasOwnProperty(M = "POW_PRECISION") && (x = N[M], _t(x, 0, De, M), z = x), N.hasOwnProperty(M = "FORMAT"))
          if (x = N[M], typeof x == "object") D = x;
          else throw Error(Ce + M + " not an object: " + x);
        if (N.hasOwnProperty(M = "ALPHABET"))
          if (x = N[M], typeof x == "string" && !/^.?$|[+\-.\s]|(.).*\1/.test(x))
            Z = x.slice(0, 10) == "0123456789", k = x;
          else
            throw Error(Ce + M + " invalid: " + x);
      } else
        throw Error(Ce + "Object expected: " + N);
    return {
      DECIMAL_PLACES: l,
      ROUNDING_MODE: h,
      EXPONENTIAL_AT: [p, v],
      RANGE: [S, C],
      CRYPTO: F,
      MODULO_MODE: U,
      POW_PRECISION: z,
      FORMAT: D,
      ALPHABET: k
    };
  }, _.isBigNumber = function(N) {
    if (!N || N._isBigNumber !== !0) return !1;
    if (!_.DEBUG) return !0;
    var M, x, O = N.c, R = N.e, b = N.s;
    t: if ({}.toString.call(O) == "[object Array]") {
      if ((b === 1 || b === -1) && R >= -1e9 && R <= De && R === Fe(R)) {
        if (O[0] === 0) {
          if (R === 0 && O.length === 1) return !0;
          break t;
        }
        if (M = (R + 1) % vt, M < 1 && (M += vt), String(O[0]).length == M) {
          for (M = 0; M < O.length; M++)
            if (x = O[M], x < 0 || x >= Qe || x !== Fe(x)) break t;
          if (x !== 0) return !0;
        }
      }
    } else if (O === null && R === null && (b === null || b === 1 || b === -1))
      return !0;
    throw Error(Ce + "Invalid BigNumber: " + N);
  }, _.maximum = _.max = function() {
    return V(arguments, -1);
  }, _.minimum = _.min = function() {
    return V(arguments, 1);
  }, _.random = function() {
    var N = 9007199254740992, M = Math.random() * N & 2097151 ? function() {
      return Fe(Math.random() * N);
    } : function() {
      return (Math.random() * 1073741824 | 0) * 8388608 + (Math.random() * 8388608 | 0);
    };
    return function(x) {
      var O, R, b, u, d, w = 0, m = [], y = new _(s);
      if (x == null ? x = l : _t(x, 0, De), u = Ki(x / vt), F)
        if (crypto.getRandomValues) {
          for (O = crypto.getRandomValues(new Uint32Array(u *= 2)); w < u; )
            d = O[w] * 131072 + (O[w + 1] >>> 11), d >= 9e15 ? (R = crypto.getRandomValues(new Uint32Array(2)), O[w] = R[0], O[w + 1] = R[1]) : (m.push(d % 1e14), w += 2);
          w = u / 2;
        } else if (crypto.randomBytes) {
          for (O = crypto.randomBytes(u *= 7); w < u; )
            d = (O[w] & 31) * 281474976710656 + O[w + 1] * 1099511627776 + O[w + 2] * 4294967296 + O[w + 3] * 16777216 + (O[w + 4] << 16) + (O[w + 5] << 8) + O[w + 6], d >= 9e15 ? crypto.randomBytes(7).copy(O, w) : (m.push(d % 1e14), w += 7);
          w = u / 7;
        } else
          throw F = !1, Error(Ce + "crypto unavailable");
      if (!F)
        for (; w < u; )
          d = M(), d < 9e15 && (m[w++] = d % 1e14);
      for (u = m[--w], x %= vt, u && x && (d = Ji[vt - x], m[w] = Fe(u / d) * d); m[w] === 0; m.pop(), w--) ;
      if (w < 0)
        m = [b = 0];
      else {
        for (b = -1; m[0] === 0; m.splice(0, 1), b -= vt) ;
        for (w = 1, d = m[0]; d >= 10; d /= 10, w++) ;
        w < vt && (b -= vt - w);
      }
      return y.e = b, y.c = m, y;
    };
  }(), _.sum = function() {
    for (var N = 1, M = arguments, x = new _(M[0]); N < M.length; ) x = x.plus(M[N++]);
    return x;
  }, e = /* @__PURE__ */ function() {
    var N = "0123456789";
    function M(x, O, R, b) {
      for (var u, d = [0], w, m = 0, y = x.length; m < y; ) {
        for (w = d.length; w--; d[w] *= O) ;
        for (d[0] += b.indexOf(x.charAt(m++)), u = 0; u < d.length; u++)
          d[u] > R - 1 && (d[u + 1] == null && (d[u + 1] = 0), d[u + 1] += d[u] / R | 0, d[u] %= R);
      }
      return d.reverse();
    }
    return function(x, O, R, b, u) {
      var d, w, m, y, B, P, E, f, g = x.indexOf("."), I = l, L = h;
      for (g >= 0 && (y = z, z = 0, x = x.replace(".", ""), f = new _(O), P = f.pow(x.length - g), z = y, f.c = M(
        rn(Pe(P.c), P.e, "0"),
        10,
        R,
        N
      ), f.e = f.c.length), E = M(x, O, R, u ? (d = k, N) : (d = N, k)), m = y = E.length; E[--y] == 0; E.pop()) ;
      if (!E[0]) return d.charAt(0);
      if (g < 0 ? --m : (P.c = E, P.e = m, P.s = b, P = t(P, f, I, L, R), E = P.c, B = P.r, m = P.e), w = m + I + 1, g = E[w], y = R / 2, B = B || w < 0 || E[w + 1] != null, B = L < 4 ? (g != null || B) && (L == 0 || L == (P.s < 0 ? 3 : 2)) : g > y || g == y && (L == 4 || B || L == 6 && E[w - 1] & 1 || L == (P.s < 0 ? 8 : 7)), w < 1 || !E[0])
        x = B ? rn(d.charAt(1), -I, d.charAt(0)) : d.charAt(0);
      else {
        if (E.length = w, B)
          for (--R; ++E[--w] > R; )
            E[w] = 0, w || (++m, E = [1].concat(E));
        for (y = E.length; !E[--y]; ) ;
        for (g = 0, x = ""; g <= y; x += d.charAt(E[g++])) ;
        x = rn(x, m, d.charAt(0));
      }
      return x;
    };
  }(), t = /* @__PURE__ */ function() {
    function N(O, R, b) {
      var u, d, w, m, y = 0, B = O.length, P = R % yn, E = R / yn | 0;
      for (O = O.slice(); B--; )
        w = O[B] % yn, m = O[B] / yn | 0, u = E * w + m * P, d = P * w + u % yn * yn + y, y = (d / b | 0) + (u / yn | 0) + E * m, O[B] = d % b;
      return y && (O = [y].concat(O)), O;
    }
    function M(O, R, b, u) {
      var d, w;
      if (b != u)
        w = b > u ? 1 : -1;
      else
        for (d = w = 0; d < b; d++)
          if (O[d] != R[d]) {
            w = O[d] > R[d] ? 1 : -1;
            break;
          }
      return w;
    }
    function x(O, R, b, u) {
      for (var d = 0; b--; )
        O[b] -= d, d = O[b] < R[b] ? 1 : 0, O[b] = d * u + O[b] - R[b];
      for (; !O[0] && O.length > 1; O.splice(0, 1)) ;
    }
    return function(O, R, b, u, d) {
      var w, m, y, B, P, E, f, g, I, L, H, K, tt, st, xt, dt, mt, bt = O.s == R.s ? 1 : -1, ht = O.c, pt = R.c;
      if (!ht || !ht[0] || !pt || !pt[0])
        return new _(
          // Return NaN if either NaN, or both Infinity or 0.
          !O.s || !R.s || (ht ? pt && ht[0] == pt[0] : !pt) ? NaN : (
            // Return ±0 if x is ±0 or y is ±Infinity, or return ±Infinity as y is ±0.
            ht && ht[0] == 0 || !pt ? bt * 0 : bt / 0
          )
        );
      for (g = new _(bt), I = g.c = [], m = O.e - R.e, bt = b + m + 1, d || (d = Qe, m = _e(O.e / vt) - _e(R.e / vt), bt = bt / vt | 0), y = 0; pt[y] == (ht[y] || 0); y++) ;
      if (pt[y] > (ht[y] || 0) && m--, bt < 0)
        I.push(1), B = !0;
      else {
        for (st = ht.length, dt = pt.length, y = 0, bt += 2, P = Fe(d / (pt[0] + 1)), P > 1 && (pt = N(pt, P, d), ht = N(ht, P, d), dt = pt.length, st = ht.length), tt = dt, L = ht.slice(0, dt), H = L.length; H < dt; L[H++] = 0) ;
        mt = pt.slice(), mt = [0].concat(mt), xt = pt[0], pt[1] >= d / 2 && xt++;
        do {
          if (P = 0, w = M(pt, L, dt, H), w < 0) {
            if (K = L[0], dt != H && (K = K * d + (L[1] || 0)), P = Fe(K / xt), P > 1)
              for (P >= d && (P = d - 1), E = N(pt, P, d), f = E.length, H = L.length; M(E, L, f, H) == 1; )
                P--, x(E, dt < f ? mt : pt, f, d), f = E.length, w = 1;
            else
              P == 0 && (w = P = 1), E = pt.slice(), f = E.length;
            if (f < H && (E = [0].concat(E)), x(L, E, H, d), H = L.length, w == -1)
              for (; M(pt, L, dt, H) < 1; )
                P++, x(L, dt < H ? mt : pt, H, d), H = L.length;
          } else w === 0 && (P++, L = [0]);
          I[y++] = P, L[0] ? L[H++] = ht[tt] || 0 : (L = [ht[tt]], H = 1);
        } while ((tt++ < st || L[0] != null) && bt--);
        B = L[0] != null, I[0] || I.splice(0, 1);
      }
      if (d == Qe) {
        for (y = 1, bt = I[0]; bt >= 10; bt /= 10, y++) ;
        X(g, b + (g.e = y + m * vt - 1) + 1, u, B);
      } else
        g.e = m, g.r = +B;
      return g;
    };
  }();
  function q(N, M, x, O) {
    var R, b, u, d, w;
    if (x == null ? x = h : _t(x, 0, 8), !N.c) return N.toString();
    if (R = N.c[0], u = N.e, M == null)
      w = Pe(N.c), w = O == 1 || O == 2 && (u <= p || u >= v) ? Or(w, u) : rn(w, u, "0");
    else if (N = X(new _(N), M, x), b = N.e, w = Pe(N.c), d = w.length, O == 1 || O == 2 && (M <= b || b <= p)) {
      for (; d < M; w += "0", d++) ;
      w = Or(w, b);
    } else if (M -= u, w = rn(w, b, "0"), b + 1 > d) {
      if (--M > 0) for (w += "."; M--; w += "0") ;
    } else if (M += b - d, M > 0)
      for (b + 1 == d && (w += "."); M--; w += "0") ;
    return N.s < 0 && R ? "-" + w : w;
  }
  function V(N, M) {
    for (var x, O, R = 1, b = new _(N[0]); R < N.length; R++)
      O = new _(N[R]), (!O.s || (x = Dn(b, O)) === M || x === 0 && b.s === M) && (b = O);
    return b;
  }
  function J(N, M, x) {
    for (var O = 1, R = M.length; !M[--R]; M.pop()) ;
    for (R = M[0]; R >= 10; R /= 10, O++) ;
    return (x = O + x * vt - 1) > C ? N.c = N.e = null : x < S ? N.c = [N.e = 0] : (N.e = x, N.c = M), N;
  }
  n = /* @__PURE__ */ function() {
    var N = /^(-?)0([xbo])(?=\w[\w.]*$)/i, M = /^([^.]+)\.$/, x = /^\.([^.]+)$/, O = /^-?(Infinity|NaN)$/, R = /^\s*\+(?=[\w.])|^\s+|\s+$/g;
    return function(b, u, d, w) {
      var m, y = d ? u : u.replace(R, "");
      if (O.test(y))
        b.s = isNaN(y) ? null : y < 0 ? -1 : 1;
      else {
        if (!d && (y = y.replace(N, function(B, P, E) {
          return m = (E = E.toLowerCase()) == "x" ? 16 : E == "b" ? 2 : 8, !w || w == m ? P : B;
        }), w && (m = w, y = y.replace(M, "$1").replace(x, "0.$1")), u != y))
          return new _(y, m);
        if (_.DEBUG)
          throw Error(Ce + "Not a" + (w ? " base " + w : "") + " number: " + u);
        b.s = null;
      }
      b.c = b.e = null;
    };
  }();
  function X(N, M, x, O) {
    var R, b, u, d, w, m, y, B = N.c, P = Ji;
    if (B) {
      t: {
        for (R = 1, d = B[0]; d >= 10; d /= 10, R++) ;
        if (b = M - R, b < 0)
          b += vt, u = M, w = B[m = 0], y = Fe(w / P[R - u - 1] % 10);
        else if (m = Ki((b + 1) / vt), m >= B.length)
          if (O) {
            for (; B.length <= m; B.push(0)) ;
            w = y = 0, R = 1, b %= vt, u = b - vt + 1;
          } else
            break t;
        else {
          for (w = d = B[m], R = 1; d >= 10; d /= 10, R++) ;
          b %= vt, u = b - vt + R, y = u < 0 ? 0 : Fe(w / P[R - u - 1] % 10);
        }
        if (O = O || M < 0 || // Are there any non-zero digits after the rounding digit?
        // The expression  n % pows10[d - j - 1]  returns all digits of n to the right
        // of the digit at j, e.g. if n is 908714 and j is 2, the expression gives 714.
        B[m + 1] != null || (u < 0 ? w : w % P[R - u - 1]), O = x < 4 ? (y || O) && (x == 0 || x == (N.s < 0 ? 3 : 2)) : y > 5 || y == 5 && (x == 4 || O || x == 6 && // Check whether the digit to the left of the rounding digit is odd.
        (b > 0 ? u > 0 ? w / P[R - u] : 0 : B[m - 1]) % 10 & 1 || x == (N.s < 0 ? 8 : 7)), M < 1 || !B[0])
          return B.length = 0, O ? (M -= N.e + 1, B[0] = P[(vt - M % vt) % vt], N.e = -M || 0) : B[0] = N.e = 0, N;
        if (b == 0 ? (B.length = m, d = 1, m--) : (B.length = m + 1, d = P[vt - b], B[m] = u > 0 ? Fe(w / P[R - u] % P[u]) * d : 0), O)
          for (; ; )
            if (m == 0) {
              for (b = 1, u = B[0]; u >= 10; u /= 10, b++) ;
              for (u = B[0] += d, d = 1; u >= 10; u /= 10, d++) ;
              b != d && (N.e++, B[0] == Qe && (B[0] = 1));
              break;
            } else {
              if (B[m] += d, B[m] != Qe) break;
              B[m--] = 0, d = 1;
            }
        for (b = B.length; B[--b] === 0; B.pop()) ;
      }
      N.e > C ? N.c = N.e = null : N.e < S && (N.c = [N.e = 0]);
    }
    return N;
  }
  function et(N) {
    var M, x = N.e;
    return x === null ? N.toString() : (M = Pe(N.c), M = x <= p || x >= v ? Or(M, x) : rn(M, x, "0"), N.s < 0 ? "-" + M : M);
  }
  return i.absoluteValue = i.abs = function() {
    var N = new _(this);
    return N.s < 0 && (N.s = 1), N;
  }, i.comparedTo = function(N, M) {
    return Dn(this, new _(N, M));
  }, i.decimalPlaces = i.dp = function(N, M) {
    var x, O, R, b = this;
    if (N != null)
      return _t(N, 0, De), M == null ? M = h : _t(M, 0, 8), X(new _(b), N + b.e + 1, M);
    if (!(x = b.c)) return null;
    if (O = ((R = x.length - 1) - _e(this.e / vt)) * vt, R = x[R]) for (; R % 10 == 0; R /= 10, O--) ;
    return O < 0 && (O = 0), O;
  }, i.dividedBy = i.div = function(N, M) {
    return t(this, new _(N, M), l, h);
  }, i.dividedToIntegerBy = i.idiv = function(N, M) {
    return t(this, new _(N, M), 0, 1);
  }, i.exponentiatedBy = i.pow = function(N, M) {
    var x, O, R, b, u, d, w, m, y, B = this;
    if (N = new _(N), N.c && !N.isInteger())
      throw Error(Ce + "Exponent not an integer: " + et(N));
    if (M != null && (M = new _(M)), d = N.e > 14, !B.c || !B.c[0] || B.c[0] == 1 && !B.e && B.c.length == 1 || !N.c || !N.c[0])
      return y = new _(Math.pow(+et(B), d ? N.s * (2 - Dr(N)) : +et(N))), M ? y.mod(M) : y;
    if (w = N.s < 0, M) {
      if (M.c ? !M.c[0] : !M.s) return new _(NaN);
      O = !w && B.isInteger() && M.isInteger(), O && (B = B.mod(M));
    } else {
      if (N.e > 9 && (B.e > 0 || B.e < -1 || (B.e == 0 ? B.c[0] > 1 || d && B.c[1] >= 24e7 : B.c[0] < 8e13 || d && B.c[0] <= 9999975e7)))
        return b = B.s < 0 && Dr(N) ? -0 : 0, B.e > -1 && (b = 1 / b), new _(w ? 1 / b : b);
      z && (b = Ki(z / vt + 2));
    }
    for (d ? (x = new _(0.5), w && (N.s = 1), m = Dr(N)) : (R = Math.abs(+et(N)), m = R % 2), y = new _(s); ; ) {
      if (m) {
        if (y = y.times(B), !y.c) break;
        b ? y.c.length > b && (y.c.length = b) : O && (y = y.mod(M));
      }
      if (R) {
        if (R = Fe(R / 2), R === 0) break;
        m = R % 2;
      } else if (N = N.times(x), X(N, N.e + 1, 1), N.e > 14)
        m = Dr(N);
      else {
        if (R = +et(N), R === 0) break;
        m = R % 2;
      }
      B = B.times(B), b ? B.c && B.c.length > b && (B.c.length = b) : O && (B = B.mod(M));
    }
    return O ? y : (w && (y = s.div(y)), M ? y.mod(M) : b ? X(y, z, h, u) : y);
  }, i.integerValue = function(N) {
    var M = new _(this);
    return N == null ? N = h : _t(N, 0, 8), X(M, M.e + 1, N);
  }, i.isEqualTo = i.eq = function(N, M) {
    return Dn(this, new _(N, M)) === 0;
  }, i.isFinite = function() {
    return !!this.c;
  }, i.isGreaterThan = i.gt = function(N, M) {
    return Dn(this, new _(N, M)) > 0;
  }, i.isGreaterThanOrEqualTo = i.gte = function(N, M) {
    return (M = Dn(this, new _(N, M))) === 1 || M === 0;
  }, i.isInteger = function() {
    return !!this.c && _e(this.e / vt) > this.c.length - 2;
  }, i.isLessThan = i.lt = function(N, M) {
    return Dn(this, new _(N, M)) < 0;
  }, i.isLessThanOrEqualTo = i.lte = function(N, M) {
    return (M = Dn(this, new _(N, M))) === -1 || M === 0;
  }, i.isNaN = function() {
    return !this.s;
  }, i.isNegative = function() {
    return this.s < 0;
  }, i.isPositive = function() {
    return this.s > 0;
  }, i.isZero = function() {
    return !!this.c && this.c[0] == 0;
  }, i.minus = function(N, M) {
    var x, O, R, b, u = this, d = u.s;
    if (N = new _(N, M), M = N.s, !d || !M) return new _(NaN);
    if (d != M)
      return N.s = -M, u.plus(N);
    var w = u.e / vt, m = N.e / vt, y = u.c, B = N.c;
    if (!w || !m) {
      if (!y || !B) return y ? (N.s = -M, N) : new _(B ? u : NaN);
      if (!y[0] || !B[0])
        return B[0] ? (N.s = -M, N) : new _(y[0] ? u : (
          // IEEE 754 (2008) 6.3: n - n = -0 when rounding to -Infinity
          h == 3 ? -0 : 0
        ));
    }
    if (w = _e(w), m = _e(m), y = y.slice(), d = w - m) {
      for ((b = d < 0) ? (d = -d, R = y) : (m = w, R = B), R.reverse(), M = d; M--; R.push(0)) ;
      R.reverse();
    } else
      for (O = (b = (d = y.length) < (M = B.length)) ? d : M, d = M = 0; M < O; M++)
        if (y[M] != B[M]) {
          b = y[M] < B[M];
          break;
        }
    if (b && (R = y, y = B, B = R, N.s = -N.s), M = (O = B.length) - (x = y.length), M > 0) for (; M--; y[x++] = 0) ;
    for (M = Qe - 1; O > d; ) {
      if (y[--O] < B[O]) {
        for (x = O; x && !y[--x]; y[x] = M) ;
        --y[x], y[O] += Qe;
      }
      y[O] -= B[O];
    }
    for (; y[0] == 0; y.splice(0, 1), --m) ;
    return y[0] ? J(N, y, m) : (N.s = h == 3 ? -1 : 1, N.c = [N.e = 0], N);
  }, i.modulo = i.mod = function(N, M) {
    var x, O, R = this;
    return N = new _(N, M), !R.c || !N.s || N.c && !N.c[0] ? new _(NaN) : !N.c || R.c && !R.c[0] ? new _(R) : (U == 9 ? (O = N.s, N.s = 1, x = t(R, N, 0, 3), N.s = O, x.s *= O) : x = t(R, N, 0, U), N = R.minus(x.times(N)), !N.c[0] && U == 1 && (N.s = R.s), N);
  }, i.multipliedBy = i.times = function(N, M) {
    var x, O, R, b, u, d, w, m, y, B, P, E, f, g, I, L = this, H = L.c, K = (N = new _(N, M)).c;
    if (!H || !K || !H[0] || !K[0])
      return !L.s || !N.s || H && !H[0] && !K || K && !K[0] && !H ? N.c = N.e = N.s = null : (N.s *= L.s, !H || !K ? N.c = N.e = null : (N.c = [0], N.e = 0)), N;
    for (O = _e(L.e / vt) + _e(N.e / vt), N.s *= L.s, w = H.length, B = K.length, w < B && (f = H, H = K, K = f, R = w, w = B, B = R), R = w + B, f = []; R--; f.push(0)) ;
    for (g = Qe, I = yn, R = B; --R >= 0; ) {
      for (x = 0, P = K[R] % I, E = K[R] / I | 0, u = w, b = R + u; b > R; )
        m = H[--u] % I, y = H[u] / I | 0, d = E * m + y * P, m = P * m + d % I * I + f[b] + x, x = (m / g | 0) + (d / I | 0) + E * y, f[b--] = m % g;
      f[b] = x;
    }
    return x ? ++O : f.splice(0, 1), J(N, f, O);
  }, i.negated = function() {
    var N = new _(this);
    return N.s = -N.s || null, N;
  }, i.plus = function(N, M) {
    var x, O = this, R = O.s;
    if (N = new _(N, M), M = N.s, !R || !M) return new _(NaN);
    if (R != M)
      return N.s = -M, O.minus(N);
    var b = O.e / vt, u = N.e / vt, d = O.c, w = N.c;
    if (!b || !u) {
      if (!d || !w) return new _(R / 0);
      if (!d[0] || !w[0]) return w[0] ? N : new _(d[0] ? O : R * 0);
    }
    if (b = _e(b), u = _e(u), d = d.slice(), R = b - u) {
      for (R > 0 ? (u = b, x = w) : (R = -R, x = d), x.reverse(); R--; x.push(0)) ;
      x.reverse();
    }
    for (R = d.length, M = w.length, R - M < 0 && (x = w, w = d, d = x, M = R), R = 0; M; )
      R = (d[--M] = d[M] + w[M] + R) / Qe | 0, d[M] = Qe === d[M] ? 0 : d[M] % Qe;
    return R && (d = [R].concat(d), ++u), J(N, d, u);
  }, i.precision = i.sd = function(N, M) {
    var x, O, R, b = this;
    if (N != null && N !== !!N)
      return _t(N, 1, De), M == null ? M = h : _t(M, 0, 8), X(new _(b), N, M);
    if (!(x = b.c)) return null;
    if (R = x.length - 1, O = R * vt + 1, R = x[R]) {
      for (; R % 10 == 0; R /= 10, O--) ;
      for (R = x[0]; R >= 10; R /= 10, O++) ;
    }
    return N && b.e + 1 > O && (O = b.e + 1), O;
  }, i.shiftedBy = function(N) {
    return _t(N, -9007199254740991, Bo), this.times("1e" + N);
  }, i.squareRoot = i.sqrt = function() {
    var N, M, x, O, R, b = this, u = b.c, d = b.s, w = b.e, m = l + 4, y = new _("0.5");
    if (d !== 1 || !u || !u[0])
      return new _(!d || d < 0 && (!u || u[0]) ? NaN : u ? b : 1 / 0);
    if (d = Math.sqrt(+et(b)), d == 0 || d == 1 / 0 ? (M = Pe(u), (M.length + w) % 2 == 0 && (M += "0"), d = Math.sqrt(+M), w = _e((w + 1) / 2) - (w < 0 || w % 2), d == 1 / 0 ? M = "5e" + w : (M = d.toExponential(), M = M.slice(0, M.indexOf("e") + 1) + w), x = new _(M)) : x = new _(d + ""), x.c[0]) {
      for (w = x.e, d = w + m, d < 3 && (d = 0); ; )
        if (R = x, x = y.times(R.plus(t(b, R, m, 1))), Pe(R.c).slice(0, d) === (M = Pe(x.c)).slice(0, d))
          if (x.e < w && --d, M = M.slice(d - 3, d + 1), M == "9999" || !O && M == "4999") {
            if (!O && (X(R, R.e + l + 2, 0), R.times(R).eq(b))) {
              x = R;
              break;
            }
            m += 4, d += 4, O = 1;
          } else {
            (!+M || !+M.slice(1) && M.charAt(0) == "5") && (X(x, x.e + l + 2, 1), N = !x.times(x).eq(b));
            break;
          }
    }
    return X(x, x.e + l + 1, h, N);
  }, i.toExponential = function(N, M) {
    return N != null && (_t(N, 0, De), N++), q(this, N, M, 1);
  }, i.toFixed = function(N, M) {
    return N != null && (_t(N, 0, De), N = N + this.e + 1), q(this, N, M);
  }, i.toFormat = function(N, M, x) {
    var O, R = this;
    if (x == null)
      N != null && M && typeof M == "object" ? (x = M, M = null) : N && typeof N == "object" ? (x = N, N = M = null) : x = D;
    else if (typeof x != "object")
      throw Error(Ce + "Argument not an object: " + x);
    if (O = R.toFixed(N, M), R.c) {
      var b, u = O.split("."), d = +x.groupSize, w = +x.secondaryGroupSize, m = x.groupSeparator || "", y = u[0], B = u[1], P = R.s < 0, E = P ? y.slice(1) : y, f = E.length;
      if (w && (b = d, d = w, w = b, f -= b), d > 0 && f > 0) {
        for (b = f % d || d, y = E.substr(0, b); b < f; b += d) y += m + E.substr(b, d);
        w > 0 && (y += m + E.slice(b)), P && (y = "-" + y);
      }
      O = B ? y + (x.decimalSeparator || "") + ((w = +x.fractionGroupSize) ? B.replace(
        new RegExp("\\d{" + w + "}\\B", "g"),
        "$&" + (x.fractionGroupSeparator || "")
      ) : B) : y;
    }
    return (x.prefix || "") + O + (x.suffix || "");
  }, i.toFraction = function(N) {
    var M, x, O, R, b, u, d, w, m, y, B, P, E = this, f = E.c;
    if (N != null && (d = new _(N), !d.isInteger() && (d.c || d.s !== 1) || d.lt(s)))
      throw Error(Ce + "Argument " + (d.isInteger() ? "out of range: " : "not an integer: ") + et(d));
    if (!f) return new _(E);
    for (M = new _(s), m = x = new _(s), O = w = new _(s), P = Pe(f), b = M.e = P.length - E.e - 1, M.c[0] = Ji[(u = b % vt) < 0 ? vt + u : u], N = !N || d.comparedTo(M) > 0 ? b > 0 ? M : m : d, u = C, C = 1 / 0, d = new _(P), w.c[0] = 0; y = t(d, M, 0, 1), R = x.plus(y.times(O)), R.comparedTo(N) != 1; )
      x = O, O = R, m = w.plus(y.times(R = m)), w = R, M = d.minus(y.times(R = M)), d = R;
    return R = t(N.minus(x), O, 0, 1), w = w.plus(R.times(m)), x = x.plus(R.times(O)), w.s = m.s = E.s, b = b * 2, B = t(m, O, b, h).minus(E).abs().comparedTo(
      t(w, x, b, h).minus(E).abs()
    ) < 1 ? [m, O] : [w, x], C = u, B;
  }, i.toNumber = function() {
    return +et(this);
  }, i.toPrecision = function(N, M) {
    return N != null && _t(N, 1, De), q(this, N, M, 2);
  }, i.toString = function(N) {
    var M, x = this, O = x.s, R = x.e;
    return R === null ? O ? (M = "Infinity", O < 0 && (M = "-" + M)) : M = "NaN" : (N == null ? M = R <= p || R >= v ? Or(Pe(x.c), R) : rn(Pe(x.c), R, "0") : N === 10 && Z ? (x = X(new _(x), l + R + 1, h), M = rn(Pe(x.c), x.e, "0")) : (_t(N, 2, k.length, "Base"), M = e(rn(Pe(x.c), R, "0"), 10, N, O, !0)), O < 0 && x.c[0] && (M = "-" + M)), M;
  }, i.valueOf = i.toJSON = function() {
    return et(this);
  }, i._isBigNumber = !0, i[Symbol.toStringTag] = "BigNumber", i[Symbol.for("nodejs.util.inspect.custom")] = i.valueOf, r != null && _.set(r), _;
}
function _e(r) {
  var t = r | 0;
  return r > 0 || r === t ? t : t - 1;
}
function Pe(r) {
  for (var t, e, n = 1, i = r.length, s = r[0] + ""; n < i; ) {
    for (t = r[n++] + "", e = vt - t.length; e--; t = "0" + t) ;
    s += t;
  }
  for (i = s.length; s.charCodeAt(--i) === 48; ) ;
  return s.slice(0, i + 1 || 1);
}
function Dn(r, t) {
  var e, n, i = r.c, s = t.c, l = r.s, h = t.s, p = r.e, v = t.e;
  if (!l || !h) return null;
  if (e = i && !i[0], n = s && !s[0], e || n) return e ? n ? 0 : -h : l;
  if (l != h) return l;
  if (e = l < 0, n = p == v, !i || !s) return n ? 0 : !i ^ e ? 1 : -1;
  if (!n) return p > v ^ e ? 1 : -1;
  for (h = (p = i.length) < (v = s.length) ? p : v, l = 0; l < h; l++) if (i[l] != s[l]) return i[l] > s[l] ^ e ? 1 : -1;
  return p == v ? 0 : p > v ^ e ? 1 : -1;
}
function _t(r, t, e, n) {
  if (r < t || r > e || r !== Fe(r))
    throw Error(Ce + (n || "Argument") + (typeof r == "number" ? r < t || r > e ? " out of range: " : " not an integer: " : " not a primitive number: ") + String(r));
}
function Dr(r) {
  var t = r.c.length - 1;
  return _e(r.e / vt) == t && r.c[t] % 2 != 0;
}
function Or(r, t) {
  return (r.length > 1 ? r.charAt(0) + "." + r.slice(1) : r) + (t < 0 ? "e" : "e+") + t;
}
function rn(r, t, e) {
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
Oa();
const Uu = (r) => {
  const t = Fc.decode(r), e = new _c(0);
  return e._value = BigInt(t.ingress_expiry.toString(10)), Object.assign(Object.assign({}, t), { canister_id: qe.from(t.canister_id), ingress_expiry: e });
};
var ju = function(r, t, e, n) {
  if (e === "a" && !n) throw new TypeError("Private accessor was defined without a getter");
  if (typeof t == "function" ? r !== t || !n : !t.has(r)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
  return e === "m" ? n : e === "a" ? n.call(r) : n ? n.value : t.get(r);
}, zu = function(r, t, e, n, i) {
  if (n === "m") throw new TypeError("Private method is not writable");
  if (n === "a" && !i) throw new TypeError("Private accessor was defined without a setter");
  if (typeof t == "function" ? r !== t || !i : !t.has(r)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
  return n === "a" ? i.call(r, e) : i ? i.value = e : t.set(r, e), e;
}, Hr;
class Pu {
  constructor() {
    Hr.set(this, Promise.resolve());
  }
  async schedule(t) {
    return new Promise((e, n) => {
      zu(this, Hr, ju(this, Hr, "f").finally(async () => {
        try {
          e(await t());
        } catch (i) {
          n(i);
        }
      }), "f");
    });
  }
}
Hr = /* @__PURE__ */ new WeakMap();
var Ct = function(r, t, e, n) {
  if (e === "a" && !n) throw new TypeError("Private accessor was defined without a getter");
  if (typeof t == "function" ? r !== t || !n : !t.has(r)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
  return e === "m" ? n : e === "a" ? n.call(r) : n ? n.value : t.get(r);
}, Je = function(r, t, e, n, i) {
  if (n === "m") throw new TypeError("Private method is not writable");
  if (n === "a" && !i) throw new TypeError("Private accessor was defined without a setter");
  if (typeof t == "function" ? r !== t || !i : !t.has(r)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
  return n === "a" ? i.call(r, e) : i ? i.value = e : t.set(r, e), e;
}, gr, He, pr, Le, Gn, Er, Zr, Un, wr, yr, Ss, Ua;
const Fu = new Uint8Array(Zc.match(/[\da-f]{2}/gi).map((r) => parseInt(r, 16))).buffer, No = 5, Kn = "Received invalid response from signer";
class Oe extends Error {
  constructor(t) {
    super(t), Object.setPrototypeOf(this, Oe.prototype);
  }
}
class Xr {
  constructor(t) {
    gr.add(this), Le.set(this, void 0), Gn.set(this, /* @__PURE__ */ new Map()), Er.set(this, new Pu()), Zr.set(this, void 0), Un.set(this, [[]]), wr.set(this, !0), yr.set(this, void 0);
    const e = !Ct(He, He, "f", pr);
    if (Je(He, He, !1, "f", pr), e)
      throw new Oe("SignerAgent is not constructable");
    Je(this, Le, t, "f");
  }
  get rootKey() {
    var t;
    return (t = Ct(this, Le, "f").agent.rootKey) !== null && t !== void 0 ? t : Fu;
  }
  get signer() {
    return Ct(this, Le, "f").signer;
  }
  static async create(t) {
    var e, n, i;
    return Je(He, He, !0, "f", pr), new He(Object.assign(Object.assign({}, t), { agent: (e = t.agent) !== null && e !== void 0 ? e : await Ye.create(), scheduleDelay: (n = t.scheduleDelay) !== null && n !== void 0 ? n : 20, validation: (i = t.validation) !== null && i !== void 0 ? i : null }));
  }
  static createSync(t) {
    var e, n, i;
    return Je(He, He, !0, "f", pr), new He(Object.assign(Object.assign({}, t), { agent: (e = t.agent) !== null && e !== void 0 ? e : Ye.createSync(), scheduleDelay: (n = t.scheduleDelay) !== null && n !== void 0 ? n : 20, validation: (i = t.validation) !== null && i !== void 0 ? i : null }));
  }
  async execute() {
    const t = [...Ct(this, Un, "f")], e = Ct(this, yr, "f");
    this.clear();
    const n = t.flat().length;
    if (n === 0) {
      Je(this, yr, void 0, "f");
      return;
    }
    if (!(n > 1)) {
      await Ct(this, gr, "m", Ss).call(this, t);
      return;
    }
    (await Ct(this, Er, "f").schedule(() => this.signer.supportedStandards())).some((h) => h.name === "ICRC-112") ? await Ct(this, gr, "m", Ua).call(this, t, e) : await Ct(this, gr, "m", Ss).call(this, t);
  }
  async call(t, e) {
    t = qe.from(t), await Ct(this, Le, "f").signer.openChannel();
    const n = await new Promise((z, D) => {
      clearTimeout(Ct(this, Zr, "f")), Ct(this, Un, "f").slice(-1)[0].push({
        options: {
          canisterId: t,
          method: e.methodName,
          arg: e.arg
        },
        resolve: z,
        reject: D
      }), Ct(this, wr, "f") && Je(this, Zr, setTimeout(() => this.execute(), Ct(this, Le, "f").scheduleDelay), "f");
    }), i = Uu(n.contentMap);
    if (!(Wc.Call === i.request_type && t.compareTo(i.canister_id) === "eq" && e.methodName === i.method_name && qc(e.arg, i.arg) === 0 && Ct(this, Le, "f").account.compareTo(qe.from(i.sender)) === "eq"))
      throw new Oe(Kn);
    const l = Qc(i), h = await vo.create({
      certificate: n.certificate,
      rootKey: this.rootKey,
      canisterId: t,
      maxAgeInMinutes: No
    }).catch(() => {
      throw new Oe(Kn);
    });
    if (!(h.lookup(["request_status", l, "status"]).status === Qi.Found))
      throw new Oe(Kn);
    const v = vr(l);
    if (Ct(this, Gn, "f").has(v))
      throw new Oe(Kn);
    Ct(this, Gn, "f").set(v, n.certificate);
    const S = Date.now(), C = Hc(h.lookup(["time"]));
    if (!C)
      throw new Oe(Kn);
    const U = Number($c(new tu(C))) / 1e6 - S + No * 60 * 1e3;
    return setTimeout(() => Ct(this, Gn, "f").delete(v), U), {
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
    return Ct(this, Le, "f").agent.fetchRootKey();
  }
  async getPrincipal() {
    return Ct(this, Le, "f").account;
  }
  async query(t, e) {
    t = qe.from(t);
    const n = await this.call(t, e), i = await this.readState(t, {
      paths: [
        [new TextEncoder().encode("request_status"), n.requestId]
      ]
    }), s = await vo.create({
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
    if (l.status !== Qi.Found || new TextDecoder().decode(l.value) !== "replied" || h.status !== Qi.Found)
      throw new Oe("Certificate is missing reply");
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
      throw new Oe("Given paths are not supported");
    const s = e.paths[0][1], l = vr(s), h = Ct(this, Gn, "f").get(l);
    if (!h)
      throw new Oe("Certificate could not be found");
    return { certificate: h };
  }
  async status() {
    return Ct(this, Le, "f").agent.status();
  }
  replaceAccount(t) {
    Ct(this, Le, "f").account = t;
  }
  replaceValidation(t) {
    Je(this, yr, t, "f");
  }
  /**
   * Enable manual triggering of canister calls execution
   */
  batch() {
    Je(this, wr, !1, "f"), Ct(this, Un, "f").slice(-1)[0].length > 0 && Ct(this, Un, "f").push([]);
  }
  /**
   * Clear scheduled canister calls and switch back to automatic canister calls execution
   */
  clear() {
    Je(this, Un, [[]], "f"), Je(this, wr, !0, "f");
  }
}
He = Xr, Le = /* @__PURE__ */ new WeakMap(), Gn = /* @__PURE__ */ new WeakMap(), Er = /* @__PURE__ */ new WeakMap(), Zr = /* @__PURE__ */ new WeakMap(), Un = /* @__PURE__ */ new WeakMap(), wr = /* @__PURE__ */ new WeakMap(), yr = /* @__PURE__ */ new WeakMap(), gr = /* @__PURE__ */ new WeakSet(), Ss = async function(t) {
  await Promise.all(t.flat().map(({ options: e, resolve: n, reject: i }) => Ct(this, Er, "f").schedule(async () => {
    try {
      const s = await this.signer.callCanister(Object.assign({ sender: Ct(this, Le, "f").account }, e));
      n(s);
    } catch (s) {
      i(s);
    }
  })));
}, Ua = async function(t, e) {
  await Ct(this, Er, "f").schedule(async () => {
    try {
      const n = await this.signer.batchCallCanister({
        sender: Ct(this, Le, "f").account,
        requests: t.map((i) => i.map(({ options: s }) => s)),
        validation: e ?? void 0
      });
      t.forEach((i, s) => i.forEach(({ resolve: l, reject: h }, p) => {
        const v = n[s][p];
        if ("result" in v) {
          l(v.result);
          return;
        }
        if ("error" in v) {
          h(new Oe(`${v.error.code}: ${v.error.message}
${JSON.stringify(v.error.data)}`));
          return;
        }
        h(new Oe(Kn));
      }));
    } catch (n) {
      t.flat().forEach(({ reject: i }) => i(n));
    }
  });
};
pr = { value: !1 };
const Sn = class Sn extends gi {
  constructor(t) {
    super(t), this.identity = null, this.sessionKey = null, this.walletName = Sn.walletName, this.logo = Sn.logo, this.unwrapResponse = (i) => {
      if ("error" in i)
        throw new hn(i.error);
      if ("result" in i)
        return i.result;
      throw new hn({
        code: 500,
        message: "Invalid response"
      });
    };
    const e = this.config.adapters?.nfid;
    this.url = e?.rpcUrl ?? "https://nfid.one/rpc", this.transport = new Da({
      url: this.url,
      ...Sn.TRANSPORT_CONFIG
    }), this.signer = new Ca({
      transport: this.transport
    });
    const n = Ye.createSync({ host: this.url });
    this.signerAgent = Xr.createSync({
      signer: this.signer,
      account: qe.anonymous(),
      // Start anonymous
      agent: n
    }), this.agent = Ye.createSync({ host: this.url }), this.setState(gt.Status.READY);
  }
  async isAvailable() {
    return !0;
  }
  async isConnected() {
    return this.identity !== null && this.state === gt.Status.CONNECTED;
  }
  async getPrincipal() {
    if (!this.identity)
      throw new Error("NFID Adapter: Not connected. Call connect() first.");
    return this.identity.getPrincipal();
  }
  async connect() {
    if (this.setState(gt.Status.CONNECTING), !this.signer || !this.transport || !this.agent)
      throw console.error("[NFID] Adapter not initialized correctly before connect."), this.setState(gt.Status.ERROR), new Error("NFID Adapter not initialized correctly.");
    try {
      await this.signer.openChannel(), this.sessionKey = xa.generate();
      const t = this.config.delegationTimeout !== void 0 ? BigInt(Date.now() * 1e6) + BigInt(this.config.delegationTimeout) : BigInt(Date.now() * 1e6) + BigInt(48 * 60 * 60 * 1e9), e = await this.signer.delegation({
        publicKey: this.sessionKey.getPublicKey().toDer(),
        targets: this.config.delegationTargets.map(
          (s) => qe.fromText(s)
        ),
        maxTimeToLive: t
      }), n = Ba.fromDelegation(
        this.sessionKey,
        e
      );
      this.signerAgent = Xr.createSync({
        signer: this.signer,
        account: n.getPrincipal(),
        agent: Ye.createSync({ host: this.url })
        // Use RPC URL for the signer agent
      }), this.identity = n, this.config.fetchRootKeys && await this.agent.fetchRootKey();
      const i = n.getPrincipal();
      if (i.isAnonymous())
        throw console.warn("[NFID] Connect failed: got anonymous principal."), this.setState(gt.Status.READY), this.identity = null, this.signerAgent = null, this.sessionKey = null, new Error(
          "Failed to authenticate with NFID - got anonymous principal"
        );
      return this.setState(gt.Status.CONNECTED), {
        owner: i,
        subaccount: di.fromPrincipal({
          principal: i,
          subAccount: void 0
          // This will use the default subaccount
        }).toUint8Array(),
        hasDelegation: !0
      };
    } catch (t) {
      if (console.error("[NFID] Error during connection:", t), this.identity = null, this.signerAgent = null, this.sessionKey = null, this.signer)
        try {
          this.signer.closeChannel();
        } catch (e) {
          console.debug("Error closing channel on connect failure:", e);
        }
      throw this.setState(gt.Status.READY), t;
    }
  }
  undelegatedActor(t, e) {
    const n = Ye.createSync({
      identity: this.identity,
      host: this.config.hostUrl,
      verifyQuerySignatures: this.config.verifyQuerySignatures
    });
    return Tn.createActor(e, {
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
      return s && !i || !s && !i ? this.undelegatedActor(t, e) : i ? Tn.createActor(e, {
        agent: this.signerAgent,
        canisterId: t
      }) : Tn.createActor(e, {
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
}, Sn.logo = Bu, Sn.walletName = "NFID";
let Mr = Sn;
const _u = "data:image/webp;base64,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", In = class In extends gi {
  constructor(t) {
    super(t), this.signer = null, this.agent = null, this.signerAgent = null, this.transport = null, this.walletName = In.walletName, this.logo = In.logo;
    const e = this.config.adapters?.oisy?.config?.signerUrl || "https://oisy.com/sign";
    this.agent = Ye.createSync({ host: this.config.hostUrl }), this.transport = new Da({
      url: e,
      ...In.TRANSPORT_CONFIG
    }), this.signer = new Ca({
      transport: this.transport
    }), this.signerAgent = Xr.createSync({
      signer: this.signer,
      account: qe.anonymous(),
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
    return this.signerAgent.getPrincipal();
  }
  async getAccountId() {
    return di.fromPrincipal({
      principal: await this.getPrincipal(),
      subAccount: void 0
      // This will use the default subaccount
    }).toHex();
  }
  async connect() {
    this.setState(gt.Status.CONNECTING);
    try {
      if (!this.signerAgent || !this.signerAgent.signer)
        throw new Error("Oisy signer agent not initialized. Was the constructor called with config?");
      const t = await this.signerAgent.signer.accounts();
      if (!t || t.length === 0)
        throw this.disconnect(), new Error("No accounts returned from Oisy");
      const e = t[0].owner;
      if (e.isAnonymous())
        throw this.setState(gt.Status.READY), new Error("Failed to authenticate with Oisy - got anonymous principal");
      if (this.signerAgent.replaceAccount(e), this.config.fetchRootKeys) {
        if (!this.signerAgent) throw new Error("Signer agent not ready for fetchRootKeys");
        await this.signerAgent.fetchRootKey();
      }
      return this.setState(gt.Status.CONNECTED), {
        owner: e,
        subaccount: Ma(await this.getAccountId() || ""),
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
      return Tn.createActor(e, {
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
In.TRANSPORT_CONFIG = {
  windowOpenerFeatures: "width=525,height=705",
  establishTimeout: 45e3,
  disconnectTimeout: 45e3,
  statusPollingRate: 500,
  detectNonClickEstablishment: !1
}, In.logo = _u, In.walletName = "OISY Wallet";
let Sr = In;
const Ur = {
  timeout: 1e3 * 60 * 60 * 24,
  // 1 day
  enabled: !0
}, Wu = {
  oisy: {
    id: "oisy",
    walletName: Sr.walletName,
    logo: Sr.logo,
    adapter: Sr,
    config: {
      ...Ur,
      signerUrl: "https://oisy.com/sign"
      // Default Oisy sign URL
    }
  },
  nfid: {
    id: "nfid",
    walletName: Mr.walletName,
    logo: Mr.logo,
    adapter: Mr,
    config: {
      ...Ur,
      rpcUrl: "https://nfid.one/rpc"
      // Default NFID RPC endpoint
    }
  },
  ii: {
    id: "ii",
    walletName: mr.walletName,
    logo: mr.logo,
    adapter: mr,
    config: {
      ...Ur,
      identityProvider: "https://identity.ic0.app"
    }
  },
  plug: {
    id: "plug",
    walletName: br.walletName,
    logo: br.logo,
    adapter: br,
    config: {
      ...Ur,
      identityProvider: "https://identity.ic0.app"
    }
  }
};
function Tr(r) {
  return r && r.__esModule && Object.prototype.hasOwnProperty.call(r, "default") ? r.default : r;
}
function Gs(r) {
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
var Vi = { exports: {} }, To;
function qu() {
  return To || (To = 1, function(r) {
    var t = Object.prototype.hasOwnProperty, e = "~";
    function n() {
    }
    Object.create && (n.prototype = /* @__PURE__ */ Object.create(null), new n().__proto__ || (e = !1));
    function i(p, v, S) {
      this.fn = p, this.context = v, this.once = S || !1;
    }
    function s(p, v, S, C, F) {
      if (typeof S != "function")
        throw new TypeError("The listener must be a function");
      var U = new i(S, C || p, F), z = e ? e + v : v;
      return p._events[z] ? p._events[z].fn ? p._events[z] = [p._events[z], U] : p._events[z].push(U) : (p._events[z] = U, p._eventsCount++), p;
    }
    function l(p, v) {
      --p._eventsCount === 0 ? p._events = new n() : delete p._events[v];
    }
    function h() {
      this._events = new n(), this._eventsCount = 0;
    }
    h.prototype.eventNames = function() {
      var v = [], S, C;
      if (this._eventsCount === 0) return v;
      for (C in S = this._events)
        t.call(S, C) && v.push(e ? C.slice(1) : C);
      return Object.getOwnPropertySymbols ? v.concat(Object.getOwnPropertySymbols(S)) : v;
    }, h.prototype.listeners = function(v) {
      var S = e ? e + v : v, C = this._events[S];
      if (!C) return [];
      if (C.fn) return [C.fn];
      for (var F = 0, U = C.length, z = new Array(U); F < U; F++)
        z[F] = C[F].fn;
      return z;
    }, h.prototype.listenerCount = function(v) {
      var S = e ? e + v : v, C = this._events[S];
      return C ? C.fn ? 1 : C.length : 0;
    }, h.prototype.emit = function(v, S, C, F, U, z) {
      var D = e ? e + v : v;
      if (!this._events[D]) return !1;
      var k = this._events[D], Z = arguments.length, _, q;
      if (k.fn) {
        switch (k.once && this.removeListener(v, k.fn, void 0, !0), Z) {
          case 1:
            return k.fn.call(k.context), !0;
          case 2:
            return k.fn.call(k.context, S), !0;
          case 3:
            return k.fn.call(k.context, S, C), !0;
          case 4:
            return k.fn.call(k.context, S, C, F), !0;
          case 5:
            return k.fn.call(k.context, S, C, F, U), !0;
          case 6:
            return k.fn.call(k.context, S, C, F, U, z), !0;
        }
        for (q = 1, _ = new Array(Z - 1); q < Z; q++)
          _[q - 1] = arguments[q];
        k.fn.apply(k.context, _);
      } else {
        var V = k.length, J;
        for (q = 0; q < V; q++)
          switch (k[q].once && this.removeListener(v, k[q].fn, void 0, !0), Z) {
            case 1:
              k[q].fn.call(k[q].context);
              break;
            case 2:
              k[q].fn.call(k[q].context, S);
              break;
            case 3:
              k[q].fn.call(k[q].context, S, C);
              break;
            case 4:
              k[q].fn.call(k[q].context, S, C, F);
              break;
            default:
              if (!_) for (J = 1, _ = new Array(Z - 1); J < Z; J++)
                _[J - 1] = arguments[J];
              k[q].fn.apply(k[q].context, _);
          }
      }
      return !0;
    }, h.prototype.on = function(v, S, C) {
      return s(this, v, S, C, !1);
    }, h.prototype.once = function(v, S, C) {
      return s(this, v, S, C, !0);
    }, h.prototype.removeListener = function(v, S, C, F) {
      var U = e ? e + v : v;
      if (!this._events[U]) return this;
      if (!S)
        return l(this, U), this;
      var z = this._events[U];
      if (z.fn)
        z.fn === S && (!F || z.once) && (!C || z.context === C) && l(this, U);
      else {
        for (var D = 0, k = [], Z = z.length; D < Z; D++)
          (z[D].fn !== S || F && !z[D].once || C && z[D].context !== C) && k.push(z[D]);
        k.length ? this._events[U] = k.length === 1 ? k[0] : k : l(this, U);
      }
      return this;
    }, h.prototype.removeAllListeners = function(v) {
      var S;
      return v ? (S = e ? e + v : v, this._events[S] && l(this, S)) : (this._events = new n(), this._eventsCount = 0), this;
    }, h.prototype.off = h.prototype.removeListener, h.prototype.addListener = h.prototype.on, h.prefixed = e, h.EventEmitter = h, r.exports = h;
  }(Vi)), Vi.exports;
}
var Qu = qu();
const Hu = /* @__PURE__ */ Tr(Qu);
class Re extends Error {
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  constructor(t, e) {
    super(t), this.error = e;
  }
}
class ja extends Re {
  constructor() {
    super(...arguments), this.name = "WalletNotReadyError";
  }
}
class Zu extends Re {
  constructor() {
    super(...arguments), this.name = "WalletLoadError";
  }
}
class Yu extends Re {
  constructor() {
    super(...arguments), this.name = "WalletConfigError";
  }
}
class Is extends Re {
  constructor() {
    super(...arguments), this.name = "WalletConnectionError";
  }
}
class za extends Re {
  constructor() {
    super(...arguments), this.name = "WalletDisconnectedError";
  }
}
class Pa extends Re {
  constructor() {
    super(...arguments), this.name = "WalletDisconnectionError";
  }
}
class Gu extends Re {
  constructor() {
    super(...arguments), this.name = "WalletAccountError";
  }
}
class $r extends Re {
  constructor() {
    super(...arguments), this.name = "WalletPublicKeyError";
  }
}
class We extends Re {
  constructor() {
    super(...arguments), this.name = "WalletNotConnectedError";
  }
}
class Vn extends Re {
  constructor() {
    super(...arguments), this.name = "WalletSendTransactionError";
  }
}
class Bn extends Re {
  constructor() {
    super(...arguments), this.name = "WalletSignTransactionError";
  }
}
class Fa extends Re {
  constructor() {
    super(...arguments), this.name = "WalletSignMessageError";
  }
}
var ge;
(function(r) {
  r.Installed = "Installed", r.NotDetected = "NotDetected", r.Loadable = "Loadable", r.Unsupported = "Unsupported";
})(ge || (ge = {}));
class Ku extends Hu {
  get connected() {
    return !!this.publicKey;
  }
  async autoConnect() {
    await this.connect();
  }
  async prepareTransaction(t, e, n = {}) {
    const i = this.publicKey;
    if (!i)
      throw new We();
    return t.feePayer = t.feePayer || i, t.recentBlockhash = t.recentBlockhash || (await e.getLatestBlockhash({
      commitment: n.preflightCommitment,
      minContextSlot: n.minContextSlot
    })).blockhash, t;
  }
}
function _a(r) {
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
function xs() {
  if (!navigator)
    return !1;
  const r = navigator.userAgent.toLowerCase(), t = r.includes("iphone") || r.includes("ipad"), e = r.includes("safari");
  return t && e;
}
function ti(r) {
  return "version" in r;
}
class Ju extends Ku {
  async sendTransaction(t, e, n = {}) {
    let i = !0;
    try {
      if (ti(t)) {
        if (!this.supportedTransactionVersions)
          throw new Vn("Sending versioned transactions isn't supported by this wallet");
        if (!this.supportedTransactionVersions.has(t.version))
          throw new Vn(`Sending transaction version ${t.version} isn't supported by this wallet`);
        try {
          t = await this.signTransaction(t);
          const s = t.serialize();
          return await e.sendRawTransaction(s, n);
        } catch (s) {
          throw s instanceof Bn ? (i = !1, s) : new Vn(s?.message, s);
        }
      } else
        try {
          const { signers: s, ...l } = n;
          t = await this.prepareTransaction(t, e, l), s?.length && t.partialSign(...s), t = await this.signTransaction(t);
          const h = t.serialize();
          return await e.sendRawTransaction(h, l);
        } catch (s) {
          throw s instanceof Bn ? (i = !1, s) : new Vn(s?.message, s);
        }
    } catch (s) {
      throw i && this.emit("error", s), s;
    }
  }
  async signAllTransactions(t) {
    for (const n of t)
      if (ti(n)) {
        if (!this.supportedTransactionVersions)
          throw new Bn("Signing versioned transactions isn't supported by this wallet");
        if (!this.supportedTransactionVersions.has(n.version))
          throw new Bn(`Signing transaction version ${n.version} isn't supported by this wallet`);
      }
    const e = [];
    for (const n of t)
      e.push(await this.signTransaction(n));
    return e;
  }
}
class Wa extends Ju {
}
const Vu = "solana:signAndSendTransaction", Xu = "solana:signMessage", $u = "solana:signTransaction", tl = "standard:connect", el = "standard:disconnect", nl = "standard:events";
var nr;
(function(r) {
  r.Mainnet = "mainnet-beta", r.Testnet = "testnet", r.Devnet = "devnet";
})(nr || (nr = {}));
var Xi = {}, hr = {}, ko;
function rl() {
  if (ko) return hr;
  ko = 1, hr.byteLength = h, hr.toByteArray = v, hr.fromByteArray = F;
  for (var r = [], t = [], e = typeof Uint8Array < "u" ? Uint8Array : Array, n = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", i = 0, s = n.length; i < s; ++i)
    r[i] = n[i], t[n.charCodeAt(i)] = i;
  t[45] = 62, t[95] = 63;
  function l(U) {
    var z = U.length;
    if (z % 4 > 0)
      throw new Error("Invalid string. Length must be a multiple of 4");
    var D = U.indexOf("=");
    D === -1 && (D = z);
    var k = D === z ? 0 : 4 - D % 4;
    return [D, k];
  }
  function h(U) {
    var z = l(U), D = z[0], k = z[1];
    return (D + k) * 3 / 4 - k;
  }
  function p(U, z, D) {
    return (z + D) * 3 / 4 - D;
  }
  function v(U) {
    var z, D = l(U), k = D[0], Z = D[1], _ = new e(p(U, k, Z)), q = 0, V = Z > 0 ? k - 4 : k, J;
    for (J = 0; J < V; J += 4)
      z = t[U.charCodeAt(J)] << 18 | t[U.charCodeAt(J + 1)] << 12 | t[U.charCodeAt(J + 2)] << 6 | t[U.charCodeAt(J + 3)], _[q++] = z >> 16 & 255, _[q++] = z >> 8 & 255, _[q++] = z & 255;
    return Z === 2 && (z = t[U.charCodeAt(J)] << 2 | t[U.charCodeAt(J + 1)] >> 4, _[q++] = z & 255), Z === 1 && (z = t[U.charCodeAt(J)] << 10 | t[U.charCodeAt(J + 1)] << 4 | t[U.charCodeAt(J + 2)] >> 2, _[q++] = z >> 8 & 255, _[q++] = z & 255), _;
  }
  function S(U) {
    return r[U >> 18 & 63] + r[U >> 12 & 63] + r[U >> 6 & 63] + r[U & 63];
  }
  function C(U, z, D) {
    for (var k, Z = [], _ = z; _ < D; _ += 3)
      k = (U[_] << 16 & 16711680) + (U[_ + 1] << 8 & 65280) + (U[_ + 2] & 255), Z.push(S(k));
    return Z.join("");
  }
  function F(U) {
    for (var z, D = U.length, k = D % 3, Z = [], _ = 16383, q = 0, V = D - k; q < V; q += _)
      Z.push(C(U, q, q + _ > V ? V : q + _));
    return k === 1 ? (z = U[D - 1], Z.push(
      r[z >> 2] + r[z << 4 & 63] + "=="
    )) : k === 2 && (z = (U[D - 2] << 8) + U[D - 1], Z.push(
      r[z >> 10] + r[z >> 4 & 63] + r[z << 2 & 63] + "="
    )), Z.join("");
  }
  return hr;
}
var jr = {};
/*! ieee754. BSD-3-Clause License. Feross Aboukhadijeh <https://feross.org/opensource> */
var Co;
function il() {
  return Co || (Co = 1, jr.read = function(r, t, e, n, i) {
    var s, l, h = i * 8 - n - 1, p = (1 << h) - 1, v = p >> 1, S = -7, C = e ? i - 1 : 0, F = e ? -1 : 1, U = r[t + C];
    for (C += F, s = U & (1 << -S) - 1, U >>= -S, S += h; S > 0; s = s * 256 + r[t + C], C += F, S -= 8)
      ;
    for (l = s & (1 << -S) - 1, s >>= -S, S += n; S > 0; l = l * 256 + r[t + C], C += F, S -= 8)
      ;
    if (s === 0)
      s = 1 - v;
    else {
      if (s === p)
        return l ? NaN : (U ? -1 : 1) * (1 / 0);
      l = l + Math.pow(2, n), s = s - v;
    }
    return (U ? -1 : 1) * l * Math.pow(2, s - n);
  }, jr.write = function(r, t, e, n, i, s) {
    var l, h, p, v = s * 8 - i - 1, S = (1 << v) - 1, C = S >> 1, F = i === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0, U = n ? 0 : s - 1, z = n ? 1 : -1, D = t < 0 || t === 0 && 1 / t < 0 ? 1 : 0;
    for (t = Math.abs(t), isNaN(t) || t === 1 / 0 ? (h = isNaN(t) ? 1 : 0, l = S) : (l = Math.floor(Math.log(t) / Math.LN2), t * (p = Math.pow(2, -l)) < 1 && (l--, p *= 2), l + C >= 1 ? t += F / p : t += F * Math.pow(2, 1 - C), t * p >= 2 && (l++, p /= 2), l + C >= S ? (h = 0, l = S) : l + C >= 1 ? (h = (t * p - 1) * Math.pow(2, i), l = l + C) : (h = t * Math.pow(2, C - 1) * Math.pow(2, i), l = 0)); i >= 8; r[e + U] = h & 255, U += z, h /= 256, i -= 8)
      ;
    for (l = l << i | h, v += i; v > 0; r[e + U] = l & 255, U += z, l /= 256, v -= 8)
      ;
    r[e + U - z] |= D * 128;
  }), jr;
}
/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <https://feross.org>
 * @license  MIT
 */
var Lo;
function Ks() {
  return Lo || (Lo = 1, function(r) {
    const t = rl(), e = il(), n = typeof Symbol == "function" && typeof Symbol.for == "function" ? Symbol.for("nodejs.util.inspect.custom") : null;
    r.Buffer = h, r.SlowBuffer = _, r.INSPECT_MAX_BYTES = 50;
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
        return C(a);
      }
      return p(a, o, c);
    }
    h.poolSize = 8192;
    function p(a, o, c) {
      if (typeof a == "string")
        return F(a, o);
      if (ArrayBuffer.isView(a))
        return z(a);
      if (a == null)
        throw new TypeError(
          "The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof a
        );
      if (Ut(a, ArrayBuffer) || a && Ut(a.buffer, ArrayBuffer) || typeof SharedArrayBuffer < "u" && (Ut(a, SharedArrayBuffer) || a && Ut(a.buffer, SharedArrayBuffer)))
        return D(a, o, c);
      if (typeof a == "number")
        throw new TypeError(
          'The "value" argument must not be of type number. Received type number'
        );
      const A = a.valueOf && a.valueOf();
      if (A != null && A !== a)
        return h.from(A, o, c);
      const T = k(a);
      if (T) return T;
      if (typeof Symbol < "u" && Symbol.toPrimitive != null && typeof a[Symbol.toPrimitive] == "function")
        return h.from(a[Symbol.toPrimitive]("string"), o, c);
      throw new TypeError(
        "The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof a
      );
    }
    h.from = function(a, o, c) {
      return p(a, o, c);
    }, Object.setPrototypeOf(h.prototype, Uint8Array.prototype), Object.setPrototypeOf(h, Uint8Array);
    function v(a) {
      if (typeof a != "number")
        throw new TypeError('"size" argument must be of type number');
      if (a < 0)
        throw new RangeError('The value "' + a + '" is invalid for option "size"');
    }
    function S(a, o, c) {
      return v(a), a <= 0 ? l(a) : o !== void 0 ? typeof c == "string" ? l(a).fill(o, c) : l(a).fill(o) : l(a);
    }
    h.alloc = function(a, o, c) {
      return S(a, o, c);
    };
    function C(a) {
      return v(a), l(a < 0 ? 0 : Z(a) | 0);
    }
    h.allocUnsafe = function(a) {
      return C(a);
    }, h.allocUnsafeSlow = function(a) {
      return C(a);
    };
    function F(a, o) {
      if ((typeof o != "string" || o === "") && (o = "utf8"), !h.isEncoding(o))
        throw new TypeError("Unknown encoding: " + o);
      const c = q(a, o) | 0;
      let A = l(c);
      const T = A.write(a, o);
      return T !== c && (A = A.slice(0, T)), A;
    }
    function U(a) {
      const o = a.length < 0 ? 0 : Z(a.length) | 0, c = l(o);
      for (let A = 0; A < o; A += 1)
        c[A] = a[A] & 255;
      return c;
    }
    function z(a) {
      if (Ut(a, Uint8Array)) {
        const o = new Uint8Array(a);
        return D(o.buffer, o.byteOffset, o.byteLength);
      }
      return U(a);
    }
    function D(a, o, c) {
      if (o < 0 || a.byteLength < o)
        throw new RangeError('"offset" is outside of buffer bounds');
      if (a.byteLength < o + (c || 0))
        throw new RangeError('"length" is outside of buffer bounds');
      let A;
      return o === void 0 && c === void 0 ? A = new Uint8Array(a) : c === void 0 ? A = new Uint8Array(a, o) : A = new Uint8Array(a, o, c), Object.setPrototypeOf(A, h.prototype), A;
    }
    function k(a) {
      if (h.isBuffer(a)) {
        const o = Z(a.length) | 0, c = l(o);
        return c.length === 0 || a.copy(c, 0, 0, o), c;
      }
      if (a.length !== void 0)
        return typeof a.length != "number" || Rt(a.length) ? l(0) : U(a);
      if (a.type === "Buffer" && Array.isArray(a.data))
        return U(a.data);
    }
    function Z(a) {
      if (a >= i)
        throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x" + i.toString(16) + " bytes");
      return a | 0;
    }
    function _(a) {
      return +a != a && (a = 0), h.alloc(+a);
    }
    h.isBuffer = function(o) {
      return o != null && o._isBuffer === !0 && o !== h.prototype;
    }, h.compare = function(o, c) {
      if (Ut(o, Uint8Array) && (o = h.from(o, o.offset, o.byteLength)), Ut(c, Uint8Array) && (c = h.from(c, c.offset, c.byteLength)), !h.isBuffer(o) || !h.isBuffer(c))
        throw new TypeError(
          'The "buf1", "buf2" arguments must be one of type Buffer or Uint8Array'
        );
      if (o === c) return 0;
      let A = o.length, T = c.length;
      for (let j = 0, Q = Math.min(A, T); j < Q; ++j)
        if (o[j] !== c[j]) {
          A = o[j], T = c[j];
          break;
        }
      return A < T ? -1 : T < A ? 1 : 0;
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
      let A;
      if (c === void 0)
        for (c = 0, A = 0; A < o.length; ++A)
          c += o[A].length;
      const T = h.allocUnsafe(c);
      let j = 0;
      for (A = 0; A < o.length; ++A) {
        let Q = o[A];
        if (Ut(Q, Uint8Array))
          j + Q.length > T.length ? (h.isBuffer(Q) || (Q = h.from(Q)), Q.copy(T, j)) : Uint8Array.prototype.set.call(
            T,
            Q,
            j
          );
        else if (h.isBuffer(Q))
          Q.copy(T, j);
        else
          throw new TypeError('"list" argument must be an Array of Buffers');
        j += Q.length;
      }
      return T;
    };
    function q(a, o) {
      if (h.isBuffer(a))
        return a.length;
      if (ArrayBuffer.isView(a) || Ut(a, ArrayBuffer))
        return a.byteLength;
      if (typeof a != "string")
        throw new TypeError(
          'The "string" argument must be one of type string, Buffer, or ArrayBuffer. Received type ' + typeof a
        );
      const c = a.length, A = arguments.length > 2 && arguments[2] === !0;
      if (!A && c === 0) return 0;
      let T = !1;
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
            if (T)
              return A ? -1 : Bt(a).length;
            o = ("" + o).toLowerCase(), T = !0;
        }
    }
    h.byteLength = q;
    function V(a, o, c) {
      let A = !1;
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
            return y(this, o, c);
          case "base64":
            return b(this, o, c);
          case "ucs2":
          case "ucs-2":
          case "utf16le":
          case "utf-16le":
            return P(this, o, c);
          default:
            if (A) throw new TypeError("Unknown encoding: " + a);
            a = (a + "").toLowerCase(), A = !0;
        }
    }
    h.prototype._isBuffer = !0;
    function J(a, o, c) {
      const A = a[o];
      a[o] = a[c], a[c] = A;
    }
    h.prototype.swap16 = function() {
      const o = this.length;
      if (o % 2 !== 0)
        throw new RangeError("Buffer size must be a multiple of 16-bits");
      for (let c = 0; c < o; c += 2)
        J(this, c, c + 1);
      return this;
    }, h.prototype.swap32 = function() {
      const o = this.length;
      if (o % 4 !== 0)
        throw new RangeError("Buffer size must be a multiple of 32-bits");
      for (let c = 0; c < o; c += 4)
        J(this, c, c + 3), J(this, c + 1, c + 2);
      return this;
    }, h.prototype.swap64 = function() {
      const o = this.length;
      if (o % 8 !== 0)
        throw new RangeError("Buffer size must be a multiple of 64-bits");
      for (let c = 0; c < o; c += 8)
        J(this, c, c + 7), J(this, c + 1, c + 6), J(this, c + 2, c + 5), J(this, c + 3, c + 4);
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
    }, n && (h.prototype[n] = h.prototype.inspect), h.prototype.compare = function(o, c, A, T, j) {
      if (Ut(o, Uint8Array) && (o = h.from(o, o.offset, o.byteLength)), !h.isBuffer(o))
        throw new TypeError(
          'The "target" argument must be one of type Buffer or Uint8Array. Received type ' + typeof o
        );
      if (c === void 0 && (c = 0), A === void 0 && (A = o ? o.length : 0), T === void 0 && (T = 0), j === void 0 && (j = this.length), c < 0 || A > o.length || T < 0 || j > this.length)
        throw new RangeError("out of range index");
      if (T >= j && c >= A)
        return 0;
      if (T >= j)
        return -1;
      if (c >= A)
        return 1;
      if (c >>>= 0, A >>>= 0, T >>>= 0, j >>>= 0, this === o) return 0;
      let Q = j - T, ut = A - c;
      const lt = Math.min(Q, ut), at = this.slice(T, j), wt = o.slice(c, A);
      for (let ct = 0; ct < lt; ++ct)
        if (at[ct] !== wt[ct]) {
          Q = at[ct], ut = wt[ct];
          break;
        }
      return Q < ut ? -1 : ut < Q ? 1 : 0;
    };
    function X(a, o, c, A, T) {
      if (a.length === 0) return -1;
      if (typeof c == "string" ? (A = c, c = 0) : c > 2147483647 ? c = 2147483647 : c < -2147483648 && (c = -2147483648), c = +c, Rt(c) && (c = T ? 0 : a.length - 1), c < 0 && (c = a.length + c), c >= a.length) {
        if (T) return -1;
        c = a.length - 1;
      } else if (c < 0)
        if (T) c = 0;
        else return -1;
      if (typeof o == "string" && (o = h.from(o, A)), h.isBuffer(o))
        return o.length === 0 ? -1 : et(a, o, c, A, T);
      if (typeof o == "number")
        return o = o & 255, typeof Uint8Array.prototype.indexOf == "function" ? T ? Uint8Array.prototype.indexOf.call(a, o, c) : Uint8Array.prototype.lastIndexOf.call(a, o, c) : et(a, [o], c, A, T);
      throw new TypeError("val must be string, number or Buffer");
    }
    function et(a, o, c, A, T) {
      let j = 1, Q = a.length, ut = o.length;
      if (A !== void 0 && (A = String(A).toLowerCase(), A === "ucs2" || A === "ucs-2" || A === "utf16le" || A === "utf-16le")) {
        if (a.length < 2 || o.length < 2)
          return -1;
        j = 2, Q /= 2, ut /= 2, c /= 2;
      }
      function lt(wt, ct) {
        return j === 1 ? wt[ct] : wt.readUInt16BE(ct * j);
      }
      let at;
      if (T) {
        let wt = -1;
        for (at = c; at < Q; at++)
          if (lt(a, at) === lt(o, wt === -1 ? 0 : at - wt)) {
            if (wt === -1 && (wt = at), at - wt + 1 === ut) return wt * j;
          } else
            wt !== -1 && (at -= at - wt), wt = -1;
      } else
        for (c + ut > Q && (c = Q - ut), at = c; at >= 0; at--) {
          let wt = !0;
          for (let ct = 0; ct < ut; ct++)
            if (lt(a, at + ct) !== lt(o, ct)) {
              wt = !1;
              break;
            }
          if (wt) return at;
        }
      return -1;
    }
    h.prototype.includes = function(o, c, A) {
      return this.indexOf(o, c, A) !== -1;
    }, h.prototype.indexOf = function(o, c, A) {
      return X(this, o, c, A, !0);
    }, h.prototype.lastIndexOf = function(o, c, A) {
      return X(this, o, c, A, !1);
    };
    function N(a, o, c, A) {
      c = Number(c) || 0;
      const T = a.length - c;
      A ? (A = Number(A), A > T && (A = T)) : A = T;
      const j = o.length;
      A > j / 2 && (A = j / 2);
      let Q;
      for (Q = 0; Q < A; ++Q) {
        const ut = parseInt(o.substr(Q * 2, 2), 16);
        if (Rt(ut)) return Q;
        a[c + Q] = ut;
      }
      return Q;
    }
    function M(a, o, c, A) {
      return Nt(Bt(o, a.length - c), a, c, A);
    }
    function x(a, o, c, A) {
      return Nt(Dt(o), a, c, A);
    }
    function O(a, o, c, A) {
      return Nt(Lt(o), a, c, A);
    }
    function R(a, o, c, A) {
      return Nt(dn(o, a.length - c), a, c, A);
    }
    h.prototype.write = function(o, c, A, T) {
      if (c === void 0)
        T = "utf8", A = this.length, c = 0;
      else if (A === void 0 && typeof c == "string")
        T = c, A = this.length, c = 0;
      else if (isFinite(c))
        c = c >>> 0, isFinite(A) ? (A = A >>> 0, T === void 0 && (T = "utf8")) : (T = A, A = void 0);
      else
        throw new Error(
          "Buffer.write(string, encoding, offset[, length]) is no longer supported"
        );
      const j = this.length - c;
      if ((A === void 0 || A > j) && (A = j), o.length > 0 && (A < 0 || c < 0) || c > this.length)
        throw new RangeError("Attempt to write outside buffer bounds");
      T || (T = "utf8");
      let Q = !1;
      for (; ; )
        switch (T) {
          case "hex":
            return N(this, o, c, A);
          case "utf8":
          case "utf-8":
            return M(this, o, c, A);
          case "ascii":
          case "latin1":
          case "binary":
            return x(this, o, c, A);
          case "base64":
            return O(this, o, c, A);
          case "ucs2":
          case "ucs-2":
          case "utf16le":
          case "utf-16le":
            return R(this, o, c, A);
          default:
            if (Q) throw new TypeError("Unknown encoding: " + T);
            T = ("" + T).toLowerCase(), Q = !0;
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
      const A = [];
      let T = o;
      for (; T < c; ) {
        const j = a[T];
        let Q = null, ut = j > 239 ? 4 : j > 223 ? 3 : j > 191 ? 2 : 1;
        if (T + ut <= c) {
          let lt, at, wt, ct;
          switch (ut) {
            case 1:
              j < 128 && (Q = j);
              break;
            case 2:
              lt = a[T + 1], (lt & 192) === 128 && (ct = (j & 31) << 6 | lt & 63, ct > 127 && (Q = ct));
              break;
            case 3:
              lt = a[T + 1], at = a[T + 2], (lt & 192) === 128 && (at & 192) === 128 && (ct = (j & 15) << 12 | (lt & 63) << 6 | at & 63, ct > 2047 && (ct < 55296 || ct > 57343) && (Q = ct));
              break;
            case 4:
              lt = a[T + 1], at = a[T + 2], wt = a[T + 3], (lt & 192) === 128 && (at & 192) === 128 && (wt & 192) === 128 && (ct = (j & 15) << 18 | (lt & 63) << 12 | (at & 63) << 6 | wt & 63, ct > 65535 && ct < 1114112 && (Q = ct));
          }
        }
        Q === null ? (Q = 65533, ut = 1) : Q > 65535 && (Q -= 65536, A.push(Q >>> 10 & 1023 | 55296), Q = 56320 | Q & 1023), A.push(Q), T += ut;
      }
      return w(A);
    }
    const d = 4096;
    function w(a) {
      const o = a.length;
      if (o <= d)
        return String.fromCharCode.apply(String, a);
      let c = "", A = 0;
      for (; A < o; )
        c += String.fromCharCode.apply(
          String,
          a.slice(A, A += d)
        );
      return c;
    }
    function m(a, o, c) {
      let A = "";
      c = Math.min(a.length, c);
      for (let T = o; T < c; ++T)
        A += String.fromCharCode(a[T] & 127);
      return A;
    }
    function y(a, o, c) {
      let A = "";
      c = Math.min(a.length, c);
      for (let T = o; T < c; ++T)
        A += String.fromCharCode(a[T]);
      return A;
    }
    function B(a, o, c) {
      const A = a.length;
      (!o || o < 0) && (o = 0), (!c || c < 0 || c > A) && (c = A);
      let T = "";
      for (let j = o; j < c; ++j)
        T += jt[a[j]];
      return T;
    }
    function P(a, o, c) {
      const A = a.slice(o, c);
      let T = "";
      for (let j = 0; j < A.length - 1; j += 2)
        T += String.fromCharCode(A[j] + A[j + 1] * 256);
      return T;
    }
    h.prototype.slice = function(o, c) {
      const A = this.length;
      o = ~~o, c = c === void 0 ? A : ~~c, o < 0 ? (o += A, o < 0 && (o = 0)) : o > A && (o = A), c < 0 ? (c += A, c < 0 && (c = 0)) : c > A && (c = A), c < o && (c = o);
      const T = this.subarray(o, c);
      return Object.setPrototypeOf(T, h.prototype), T;
    };
    function E(a, o, c) {
      if (a % 1 !== 0 || a < 0) throw new RangeError("offset is not uint");
      if (a + o > c) throw new RangeError("Trying to access beyond buffer length");
    }
    h.prototype.readUintLE = h.prototype.readUIntLE = function(o, c, A) {
      o = o >>> 0, c = c >>> 0, A || E(o, c, this.length);
      let T = this[o], j = 1, Q = 0;
      for (; ++Q < c && (j *= 256); )
        T += this[o + Q] * j;
      return T;
    }, h.prototype.readUintBE = h.prototype.readUIntBE = function(o, c, A) {
      o = o >>> 0, c = c >>> 0, A || E(o, c, this.length);
      let T = this[o + --c], j = 1;
      for (; c > 0 && (j *= 256); )
        T += this[o + --c] * j;
      return T;
    }, h.prototype.readUint8 = h.prototype.readUInt8 = function(o, c) {
      return o = o >>> 0, c || E(o, 1, this.length), this[o];
    }, h.prototype.readUint16LE = h.prototype.readUInt16LE = function(o, c) {
      return o = o >>> 0, c || E(o, 2, this.length), this[o] | this[o + 1] << 8;
    }, h.prototype.readUint16BE = h.prototype.readUInt16BE = function(o, c) {
      return o = o >>> 0, c || E(o, 2, this.length), this[o] << 8 | this[o + 1];
    }, h.prototype.readUint32LE = h.prototype.readUInt32LE = function(o, c) {
      return o = o >>> 0, c || E(o, 4, this.length), (this[o] | this[o + 1] << 8 | this[o + 2] << 16) + this[o + 3] * 16777216;
    }, h.prototype.readUint32BE = h.prototype.readUInt32BE = function(o, c) {
      return o = o >>> 0, c || E(o, 4, this.length), this[o] * 16777216 + (this[o + 1] << 16 | this[o + 2] << 8 | this[o + 3]);
    }, h.prototype.readBigUInt64LE = Gt(function(o) {
      o = o >>> 0, bt(o, "offset");
      const c = this[o], A = this[o + 7];
      (c === void 0 || A === void 0) && ht(o, this.length - 8);
      const T = c + this[++o] * 2 ** 8 + this[++o] * 2 ** 16 + this[++o] * 2 ** 24, j = this[++o] + this[++o] * 2 ** 8 + this[++o] * 2 ** 16 + A * 2 ** 24;
      return BigInt(T) + (BigInt(j) << BigInt(32));
    }), h.prototype.readBigUInt64BE = Gt(function(o) {
      o = o >>> 0, bt(o, "offset");
      const c = this[o], A = this[o + 7];
      (c === void 0 || A === void 0) && ht(o, this.length - 8);
      const T = c * 2 ** 24 + this[++o] * 2 ** 16 + this[++o] * 2 ** 8 + this[++o], j = this[++o] * 2 ** 24 + this[++o] * 2 ** 16 + this[++o] * 2 ** 8 + A;
      return (BigInt(T) << BigInt(32)) + BigInt(j);
    }), h.prototype.readIntLE = function(o, c, A) {
      o = o >>> 0, c = c >>> 0, A || E(o, c, this.length);
      let T = this[o], j = 1, Q = 0;
      for (; ++Q < c && (j *= 256); )
        T += this[o + Q] * j;
      return j *= 128, T >= j && (T -= Math.pow(2, 8 * c)), T;
    }, h.prototype.readIntBE = function(o, c, A) {
      o = o >>> 0, c = c >>> 0, A || E(o, c, this.length);
      let T = c, j = 1, Q = this[o + --T];
      for (; T > 0 && (j *= 256); )
        Q += this[o + --T] * j;
      return j *= 128, Q >= j && (Q -= Math.pow(2, 8 * c)), Q;
    }, h.prototype.readInt8 = function(o, c) {
      return o = o >>> 0, c || E(o, 1, this.length), this[o] & 128 ? (255 - this[o] + 1) * -1 : this[o];
    }, h.prototype.readInt16LE = function(o, c) {
      o = o >>> 0, c || E(o, 2, this.length);
      const A = this[o] | this[o + 1] << 8;
      return A & 32768 ? A | 4294901760 : A;
    }, h.prototype.readInt16BE = function(o, c) {
      o = o >>> 0, c || E(o, 2, this.length);
      const A = this[o + 1] | this[o] << 8;
      return A & 32768 ? A | 4294901760 : A;
    }, h.prototype.readInt32LE = function(o, c) {
      return o = o >>> 0, c || E(o, 4, this.length), this[o] | this[o + 1] << 8 | this[o + 2] << 16 | this[o + 3] << 24;
    }, h.prototype.readInt32BE = function(o, c) {
      return o = o >>> 0, c || E(o, 4, this.length), this[o] << 24 | this[o + 1] << 16 | this[o + 2] << 8 | this[o + 3];
    }, h.prototype.readBigInt64LE = Gt(function(o) {
      o = o >>> 0, bt(o, "offset");
      const c = this[o], A = this[o + 7];
      (c === void 0 || A === void 0) && ht(o, this.length - 8);
      const T = this[o + 4] + this[o + 5] * 2 ** 8 + this[o + 6] * 2 ** 16 + (A << 24);
      return (BigInt(T) << BigInt(32)) + BigInt(c + this[++o] * 2 ** 8 + this[++o] * 2 ** 16 + this[++o] * 2 ** 24);
    }), h.prototype.readBigInt64BE = Gt(function(o) {
      o = o >>> 0, bt(o, "offset");
      const c = this[o], A = this[o + 7];
      (c === void 0 || A === void 0) && ht(o, this.length - 8);
      const T = (c << 24) + // Overflow
      this[++o] * 2 ** 16 + this[++o] * 2 ** 8 + this[++o];
      return (BigInt(T) << BigInt(32)) + BigInt(this[++o] * 2 ** 24 + this[++o] * 2 ** 16 + this[++o] * 2 ** 8 + A);
    }), h.prototype.readFloatLE = function(o, c) {
      return o = o >>> 0, c || E(o, 4, this.length), e.read(this, o, !0, 23, 4);
    }, h.prototype.readFloatBE = function(o, c) {
      return o = o >>> 0, c || E(o, 4, this.length), e.read(this, o, !1, 23, 4);
    }, h.prototype.readDoubleLE = function(o, c) {
      return o = o >>> 0, c || E(o, 8, this.length), e.read(this, o, !0, 52, 8);
    }, h.prototype.readDoubleBE = function(o, c) {
      return o = o >>> 0, c || E(o, 8, this.length), e.read(this, o, !1, 52, 8);
    };
    function f(a, o, c, A, T, j) {
      if (!h.isBuffer(a)) throw new TypeError('"buffer" argument must be a Buffer instance');
      if (o > T || o < j) throw new RangeError('"value" argument is out of bounds');
      if (c + A > a.length) throw new RangeError("Index out of range");
    }
    h.prototype.writeUintLE = h.prototype.writeUIntLE = function(o, c, A, T) {
      if (o = +o, c = c >>> 0, A = A >>> 0, !T) {
        const ut = Math.pow(2, 8 * A) - 1;
        f(this, o, c, A, ut, 0);
      }
      let j = 1, Q = 0;
      for (this[c] = o & 255; ++Q < A && (j *= 256); )
        this[c + Q] = o / j & 255;
      return c + A;
    }, h.prototype.writeUintBE = h.prototype.writeUIntBE = function(o, c, A, T) {
      if (o = +o, c = c >>> 0, A = A >>> 0, !T) {
        const ut = Math.pow(2, 8 * A) - 1;
        f(this, o, c, A, ut, 0);
      }
      let j = A - 1, Q = 1;
      for (this[c + j] = o & 255; --j >= 0 && (Q *= 256); )
        this[c + j] = o / Q & 255;
      return c + A;
    }, h.prototype.writeUint8 = h.prototype.writeUInt8 = function(o, c, A) {
      return o = +o, c = c >>> 0, A || f(this, o, c, 1, 255, 0), this[c] = o & 255, c + 1;
    }, h.prototype.writeUint16LE = h.prototype.writeUInt16LE = function(o, c, A) {
      return o = +o, c = c >>> 0, A || f(this, o, c, 2, 65535, 0), this[c] = o & 255, this[c + 1] = o >>> 8, c + 2;
    }, h.prototype.writeUint16BE = h.prototype.writeUInt16BE = function(o, c, A) {
      return o = +o, c = c >>> 0, A || f(this, o, c, 2, 65535, 0), this[c] = o >>> 8, this[c + 1] = o & 255, c + 2;
    }, h.prototype.writeUint32LE = h.prototype.writeUInt32LE = function(o, c, A) {
      return o = +o, c = c >>> 0, A || f(this, o, c, 4, 4294967295, 0), this[c + 3] = o >>> 24, this[c + 2] = o >>> 16, this[c + 1] = o >>> 8, this[c] = o & 255, c + 4;
    }, h.prototype.writeUint32BE = h.prototype.writeUInt32BE = function(o, c, A) {
      return o = +o, c = c >>> 0, A || f(this, o, c, 4, 4294967295, 0), this[c] = o >>> 24, this[c + 1] = o >>> 16, this[c + 2] = o >>> 8, this[c + 3] = o & 255, c + 4;
    };
    function g(a, o, c, A, T) {
      mt(o, A, T, a, c, 7);
      let j = Number(o & BigInt(4294967295));
      a[c++] = j, j = j >> 8, a[c++] = j, j = j >> 8, a[c++] = j, j = j >> 8, a[c++] = j;
      let Q = Number(o >> BigInt(32) & BigInt(4294967295));
      return a[c++] = Q, Q = Q >> 8, a[c++] = Q, Q = Q >> 8, a[c++] = Q, Q = Q >> 8, a[c++] = Q, c;
    }
    function I(a, o, c, A, T) {
      mt(o, A, T, a, c, 7);
      let j = Number(o & BigInt(4294967295));
      a[c + 7] = j, j = j >> 8, a[c + 6] = j, j = j >> 8, a[c + 5] = j, j = j >> 8, a[c + 4] = j;
      let Q = Number(o >> BigInt(32) & BigInt(4294967295));
      return a[c + 3] = Q, Q = Q >> 8, a[c + 2] = Q, Q = Q >> 8, a[c + 1] = Q, Q = Q >> 8, a[c] = Q, c + 8;
    }
    h.prototype.writeBigUInt64LE = Gt(function(o, c = 0) {
      return g(this, o, c, BigInt(0), BigInt("0xffffffffffffffff"));
    }), h.prototype.writeBigUInt64BE = Gt(function(o, c = 0) {
      return I(this, o, c, BigInt(0), BigInt("0xffffffffffffffff"));
    }), h.prototype.writeIntLE = function(o, c, A, T) {
      if (o = +o, c = c >>> 0, !T) {
        const lt = Math.pow(2, 8 * A - 1);
        f(this, o, c, A, lt - 1, -lt);
      }
      let j = 0, Q = 1, ut = 0;
      for (this[c] = o & 255; ++j < A && (Q *= 256); )
        o < 0 && ut === 0 && this[c + j - 1] !== 0 && (ut = 1), this[c + j] = (o / Q >> 0) - ut & 255;
      return c + A;
    }, h.prototype.writeIntBE = function(o, c, A, T) {
      if (o = +o, c = c >>> 0, !T) {
        const lt = Math.pow(2, 8 * A - 1);
        f(this, o, c, A, lt - 1, -lt);
      }
      let j = A - 1, Q = 1, ut = 0;
      for (this[c + j] = o & 255; --j >= 0 && (Q *= 256); )
        o < 0 && ut === 0 && this[c + j + 1] !== 0 && (ut = 1), this[c + j] = (o / Q >> 0) - ut & 255;
      return c + A;
    }, h.prototype.writeInt8 = function(o, c, A) {
      return o = +o, c = c >>> 0, A || f(this, o, c, 1, 127, -128), o < 0 && (o = 255 + o + 1), this[c] = o & 255, c + 1;
    }, h.prototype.writeInt16LE = function(o, c, A) {
      return o = +o, c = c >>> 0, A || f(this, o, c, 2, 32767, -32768), this[c] = o & 255, this[c + 1] = o >>> 8, c + 2;
    }, h.prototype.writeInt16BE = function(o, c, A) {
      return o = +o, c = c >>> 0, A || f(this, o, c, 2, 32767, -32768), this[c] = o >>> 8, this[c + 1] = o & 255, c + 2;
    }, h.prototype.writeInt32LE = function(o, c, A) {
      return o = +o, c = c >>> 0, A || f(this, o, c, 4, 2147483647, -2147483648), this[c] = o & 255, this[c + 1] = o >>> 8, this[c + 2] = o >>> 16, this[c + 3] = o >>> 24, c + 4;
    }, h.prototype.writeInt32BE = function(o, c, A) {
      return o = +o, c = c >>> 0, A || f(this, o, c, 4, 2147483647, -2147483648), o < 0 && (o = 4294967295 + o + 1), this[c] = o >>> 24, this[c + 1] = o >>> 16, this[c + 2] = o >>> 8, this[c + 3] = o & 255, c + 4;
    }, h.prototype.writeBigInt64LE = Gt(function(o, c = 0) {
      return g(this, o, c, -BigInt("0x8000000000000000"), BigInt("0x7fffffffffffffff"));
    }), h.prototype.writeBigInt64BE = Gt(function(o, c = 0) {
      return I(this, o, c, -BigInt("0x8000000000000000"), BigInt("0x7fffffffffffffff"));
    });
    function L(a, o, c, A, T, j) {
      if (c + A > a.length) throw new RangeError("Index out of range");
      if (c < 0) throw new RangeError("Index out of range");
    }
    function H(a, o, c, A, T) {
      return o = +o, c = c >>> 0, T || L(a, o, c, 4), e.write(a, o, c, A, 23, 4), c + 4;
    }
    h.prototype.writeFloatLE = function(o, c, A) {
      return H(this, o, c, !0, A);
    }, h.prototype.writeFloatBE = function(o, c, A) {
      return H(this, o, c, !1, A);
    };
    function K(a, o, c, A, T) {
      return o = +o, c = c >>> 0, T || L(a, o, c, 8), e.write(a, o, c, A, 52, 8), c + 8;
    }
    h.prototype.writeDoubleLE = function(o, c, A) {
      return K(this, o, c, !0, A);
    }, h.prototype.writeDoubleBE = function(o, c, A) {
      return K(this, o, c, !1, A);
    }, h.prototype.copy = function(o, c, A, T) {
      if (!h.isBuffer(o)) throw new TypeError("argument should be a Buffer");
      if (A || (A = 0), !T && T !== 0 && (T = this.length), c >= o.length && (c = o.length), c || (c = 0), T > 0 && T < A && (T = A), T === A || o.length === 0 || this.length === 0) return 0;
      if (c < 0)
        throw new RangeError("targetStart out of bounds");
      if (A < 0 || A >= this.length) throw new RangeError("Index out of range");
      if (T < 0) throw new RangeError("sourceEnd out of bounds");
      T > this.length && (T = this.length), o.length - c < T - A && (T = o.length - c + A);
      const j = T - A;
      return this === o && typeof Uint8Array.prototype.copyWithin == "function" ? this.copyWithin(c, A, T) : Uint8Array.prototype.set.call(
        o,
        this.subarray(A, T),
        c
      ), j;
    }, h.prototype.fill = function(o, c, A, T) {
      if (typeof o == "string") {
        if (typeof c == "string" ? (T = c, c = 0, A = this.length) : typeof A == "string" && (T = A, A = this.length), T !== void 0 && typeof T != "string")
          throw new TypeError("encoding must be a string");
        if (typeof T == "string" && !h.isEncoding(T))
          throw new TypeError("Unknown encoding: " + T);
        if (o.length === 1) {
          const Q = o.charCodeAt(0);
          (T === "utf8" && Q < 128 || T === "latin1") && (o = Q);
        }
      } else typeof o == "number" ? o = o & 255 : typeof o == "boolean" && (o = Number(o));
      if (c < 0 || this.length < c || this.length < A)
        throw new RangeError("Out of range index");
      if (A <= c)
        return this;
      c = c >>> 0, A = A === void 0 ? this.length : A >>> 0, o || (o = 0);
      let j;
      if (typeof o == "number")
        for (j = c; j < A; ++j)
          this[j] = o;
      else {
        const Q = h.isBuffer(o) ? o : h.from(o, T), ut = Q.length;
        if (ut === 0)
          throw new TypeError('The value "' + o + '" is invalid for argument "value"');
        for (j = 0; j < A - c; ++j)
          this[j + c] = Q[j % ut];
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
        set code(T) {
          Object.defineProperty(this, "code", {
            configurable: !0,
            enumerable: !0,
            value: T,
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
        let A = `The value of "${a}" is out of range.`, T = c;
        return Number.isInteger(c) && Math.abs(c) > 2 ** 32 ? T = xt(String(c)) : typeof c == "bigint" && (T = String(c), (c > BigInt(2) ** BigInt(32) || c < -(BigInt(2) ** BigInt(32))) && (T = xt(T)), T += "n"), A += ` It must be ${o}. Received ${T}`, A;
      },
      RangeError
    );
    function xt(a) {
      let o = "", c = a.length;
      const A = a[0] === "-" ? 1 : 0;
      for (; c >= A + 4; c -= 3)
        o = `_${a.slice(c - 3, c)}${o}`;
      return `${a.slice(0, c)}${o}`;
    }
    function dt(a, o, c) {
      bt(o, "offset"), (a[o] === void 0 || a[o + c] === void 0) && ht(o, a.length - (c + 1));
    }
    function mt(a, o, c, A, T, j) {
      if (a > c || a < o) {
        const Q = typeof o == "bigint" ? "n" : "";
        let ut;
        throw o === 0 || o === BigInt(0) ? ut = `>= 0${Q} and < 2${Q} ** ${(j + 1) * 8}${Q}` : ut = `>= -(2${Q} ** ${(j + 1) * 8 - 1}${Q}) and < 2 ** ${(j + 1) * 8 - 1}${Q}`, new tt.ERR_OUT_OF_RANGE("value", ut, a);
      }
      dt(A, T, j);
    }
    function bt(a, o) {
      if (typeof a != "number")
        throw new tt.ERR_INVALID_ARG_TYPE(o, "number", a);
    }
    function ht(a, o, c) {
      throw Math.floor(a) !== a ? (bt(a, c), new tt.ERR_OUT_OF_RANGE("offset", "an integer", a)) : o < 0 ? new tt.ERR_BUFFER_OUT_OF_BOUNDS() : new tt.ERR_OUT_OF_RANGE(
        "offset",
        `>= 0 and <= ${o}`,
        a
      );
    }
    const pt = /[^+/0-9A-Za-z-_]/g;
    function nn(a) {
      if (a = a.split("=")[0], a = a.trim().replace(pt, ""), a.length < 2) return "";
      for (; a.length % 4 !== 0; )
        a = a + "=";
      return a;
    }
    function Bt(a, o) {
      o = o || 1 / 0;
      let c;
      const A = a.length;
      let T = null;
      const j = [];
      for (let Q = 0; Q < A; ++Q) {
        if (c = a.charCodeAt(Q), c > 55295 && c < 57344) {
          if (!T) {
            if (c > 56319) {
              (o -= 3) > -1 && j.push(239, 191, 189);
              continue;
            } else if (Q + 1 === A) {
              (o -= 3) > -1 && j.push(239, 191, 189);
              continue;
            }
            T = c;
            continue;
          }
          if (c < 56320) {
            (o -= 3) > -1 && j.push(239, 191, 189), T = c;
            continue;
          }
          c = (T - 55296 << 10 | c - 56320) + 65536;
        } else T && (o -= 3) > -1 && j.push(239, 191, 189);
        if (T = null, c < 128) {
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
    function Dt(a) {
      const o = [];
      for (let c = 0; c < a.length; ++c)
        o.push(a.charCodeAt(c) & 255);
      return o;
    }
    function dn(a, o) {
      let c, A, T;
      const j = [];
      for (let Q = 0; Q < a.length && !((o -= 2) < 0); ++Q)
        c = a.charCodeAt(Q), A = c >> 8, T = c % 256, j.push(T), j.push(A);
      return j;
    }
    function Lt(a) {
      return t.toByteArray(nn(a));
    }
    function Nt(a, o, c, A) {
      let T;
      for (T = 0; T < A && !(T + c >= o.length || T >= a.length); ++T)
        o[T + c] = a[T];
      return T;
    }
    function Ut(a, o) {
      return a instanceof o || a != null && a.constructor != null && a.constructor.name != null && a.constructor.name === o.name;
    }
    function Rt(a) {
      return a !== a;
    }
    const jt = function() {
      const a = "0123456789abcdef", o = new Array(256);
      for (let c = 0; c < 16; ++c) {
        const A = c * 16;
        for (let T = 0; T < 16; ++T)
          o[A + T] = a[c] + a[T];
      }
      return o;
    }();
    function Gt(a) {
      return typeof BigInt > "u" ? zt : a;
    }
    function zt() {
      throw new Error("BigInt not supported");
    }
  }(Xi)), Xi;
}
var St = Ks();
function Ro(r) {
  if (!Number.isSafeInteger(r) || r < 0)
    throw new Error("positive integer expected, got " + r);
}
function sl(r) {
  return r instanceof Uint8Array || ArrayBuffer.isView(r) && r.constructor.name === "Uint8Array";
}
function pi(r, ...t) {
  if (!sl(r))
    throw new Error("Uint8Array expected");
  if (t.length > 0 && !t.includes(r.length))
    throw new Error("Uint8Array expected of length " + t + ", got length=" + r.length);
}
function ol(r) {
  if (typeof r != "function" || typeof r.create != "function")
    throw new Error("Hash should be wrapped by utils.wrapConstructor");
  Ro(r.outputLen), Ro(r.blockLen);
}
function ei(r, t = !0) {
  if (r.destroyed)
    throw new Error("Hash instance has been destroyed");
  if (t && r.finished)
    throw new Error("Hash#digest() has already been called");
}
function al(r, t) {
  pi(r);
  const e = t.outputLen;
  if (r.length < e)
    throw new Error("digestInto() expects output buffer of length at least " + e);
}
const Hn = typeof globalThis == "object" && "crypto" in globalThis ? globalThis.crypto : void 0;
/*! noble-hashes - MIT License (c) 2022 Paul Miller (paulmillr.com) */
function $i(r) {
  return new DataView(r.buffer, r.byteOffset, r.byteLength);
}
function Ve(r, t) {
  return r << 32 - t | r >>> t;
}
// @ts-ignore
typeof Uint8Array.from([]).toHex == "function" && Uint8Array.fromHex;
function cl(r) {
  if (typeof r != "string")
    throw new Error("utf8ToBytes expected string, got " + typeof r);
  return new Uint8Array(new TextEncoder().encode(r));
}
function Js(r) {
  return typeof r == "string" && (r = cl(r)), pi(r), r;
}
function ul(...r) {
  let t = 0;
  for (let n = 0; n < r.length; n++) {
    const i = r[n];
    pi(i), t += i.length;
  }
  const e = new Uint8Array(t);
  for (let n = 0, i = 0; n < r.length; n++) {
    const s = r[n];
    e.set(s, i), i += s.length;
  }
  return e;
}
class qa {
  // Safe version that clones internal state
  clone() {
    return this._cloneInto();
  }
}
function Qa(r) {
  const t = (n) => r().update(Js(n)).digest(), e = r();
  return t.outputLen = e.outputLen, t.blockLen = e.blockLen, t.create = () => r(), t;
}
function Ha(r = 32) {
  if (Hn && typeof Hn.getRandomValues == "function")
    return Hn.getRandomValues(new Uint8Array(r));
  if (Hn && typeof Hn.randomBytes == "function")
    return Uint8Array.from(Hn.randomBytes(r));
  throw new Error("crypto.getRandomValues must be defined");
}
function ll(r, t, e, n) {
  if (typeof r.setBigUint64 == "function")
    return r.setBigUint64(t, e, n);
  const i = BigInt(32), s = BigInt(4294967295), l = Number(e >> i & s), h = Number(e & s), p = n ? 4 : 0, v = n ? 0 : 4;
  r.setUint32(t + p, l, n), r.setUint32(t + v, h, n);
}
function hl(r, t, e) {
  return r & t ^ ~r & e;
}
function fl(r, t, e) {
  return r & t ^ r & e ^ t & e;
}
class Za extends qa {
  constructor(t, e, n, i) {
    super(), this.finished = !1, this.length = 0, this.pos = 0, this.destroyed = !1, this.blockLen = t, this.outputLen = e, this.padOffset = n, this.isLE = i, this.buffer = new Uint8Array(t), this.view = $i(this.buffer);
  }
  update(t) {
    ei(this);
    const { view: e, buffer: n, blockLen: i } = this;
    t = Js(t);
    const s = t.length;
    for (let l = 0; l < s; ) {
      const h = Math.min(i - this.pos, s - l);
      if (h === i) {
        const p = $i(t);
        for (; i <= s - l; l += i)
          this.process(p, l);
        continue;
      }
      n.set(t.subarray(l, l + h), this.pos), this.pos += h, l += h, this.pos === i && (this.process(e, 0), this.pos = 0);
    }
    return this.length += t.length, this.roundClean(), this;
  }
  digestInto(t) {
    ei(this), al(t, this), this.finished = !0;
    const { buffer: e, view: n, blockLen: i, isLE: s } = this;
    let { pos: l } = this;
    e[l++] = 128, this.buffer.subarray(l).fill(0), this.padOffset > i - l && (this.process(n, 0), l = 0);
    for (let C = l; C < i; C++)
      e[C] = 0;
    ll(n, i - 8, BigInt(this.length * 8), s), this.process(n, 0);
    const h = $i(t), p = this.outputLen;
    if (p % 4)
      throw new Error("_sha2: outputLen should be aligned to 32bit");
    const v = p / 4, S = this.get();
    if (v > S.length)
      throw new Error("_sha2: outputLen bigger than state");
    for (let C = 0; C < v; C++)
      h.setUint32(4 * C, S[C], s);
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
const dl = /* @__PURE__ */ new Uint32Array([
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
]), An = /* @__PURE__ */ new Uint32Array([
  1779033703,
  3144134277,
  1013904242,
  2773480762,
  1359893119,
  2600822924,
  528734635,
  1541459225
]), mn = /* @__PURE__ */ new Uint32Array(64);
class gl extends Za {
  constructor(t = 32) {
    super(64, t, 8, !1), this.A = An[0] | 0, this.B = An[1] | 0, this.C = An[2] | 0, this.D = An[3] | 0, this.E = An[4] | 0, this.F = An[5] | 0, this.G = An[6] | 0, this.H = An[7] | 0;
  }
  get() {
    const { A: t, B: e, C: n, D: i, E: s, F: l, G: h, H: p } = this;
    return [t, e, n, i, s, l, h, p];
  }
  // prettier-ignore
  set(t, e, n, i, s, l, h, p) {
    this.A = t | 0, this.B = e | 0, this.C = n | 0, this.D = i | 0, this.E = s | 0, this.F = l | 0, this.G = h | 0, this.H = p | 0;
  }
  process(t, e) {
    for (let C = 0; C < 16; C++, e += 4)
      mn[C] = t.getUint32(e, !1);
    for (let C = 16; C < 64; C++) {
      const F = mn[C - 15], U = mn[C - 2], z = Ve(F, 7) ^ Ve(F, 18) ^ F >>> 3, D = Ve(U, 17) ^ Ve(U, 19) ^ U >>> 10;
      mn[C] = D + mn[C - 7] + z + mn[C - 16] | 0;
    }
    let { A: n, B: i, C: s, D: l, E: h, F: p, G: v, H: S } = this;
    for (let C = 0; C < 64; C++) {
      const F = Ve(h, 6) ^ Ve(h, 11) ^ Ve(h, 25), U = S + F + hl(h, p, v) + dl[C] + mn[C] | 0, D = (Ve(n, 2) ^ Ve(n, 13) ^ Ve(n, 22)) + fl(n, i, s) | 0;
      S = v, v = p, p = h, h = l + U | 0, l = s, s = i, i = n, n = U + D | 0;
    }
    n = n + this.A | 0, i = i + this.B | 0, s = s + this.C | 0, l = l + this.D | 0, h = h + this.E | 0, p = p + this.F | 0, v = v + this.G | 0, S = S + this.H | 0, this.set(n, i, s, l, h, p, v, S);
  }
  roundClean() {
    mn.fill(0);
  }
  destroy() {
    this.set(0, 0, 0, 0, 0, 0, 0, 0), this.buffer.fill(0);
  }
}
const Bs = /* @__PURE__ */ Qa(() => new gl()), zr = /* @__PURE__ */ BigInt(2 ** 32 - 1), Ns = /* @__PURE__ */ BigInt(32);
function Ya(r, t = !1) {
  return t ? { h: Number(r & zr), l: Number(r >> Ns & zr) } : { h: Number(r >> Ns & zr) | 0, l: Number(r & zr) | 0 };
}
function pl(r, t = !1) {
  let e = new Uint32Array(r.length), n = new Uint32Array(r.length);
  for (let i = 0; i < r.length; i++) {
    const { h: s, l } = Ya(r[i], t);
    [e[i], n[i]] = [s, l];
  }
  return [e, n];
}
const wl = (r, t) => BigInt(r >>> 0) << Ns | BigInt(t >>> 0), yl = (r, t, e) => r >>> e, Al = (r, t, e) => r << 32 - e | t >>> e, ml = (r, t, e) => r >>> e | t << 32 - e, bl = (r, t, e) => r << 32 - e | t >>> e, vl = (r, t, e) => r << 64 - e | t >>> e - 32, El = (r, t, e) => r >>> e - 32 | t << 64 - e, Ml = (r, t) => t, Sl = (r, t) => r, Il = (r, t, e) => r << e | t >>> 32 - e, xl = (r, t, e) => t << e | r >>> 32 - e, Bl = (r, t, e) => t << e - 32 | r >>> 64 - e, Nl = (r, t, e) => r << e - 32 | t >>> 64 - e;
function Tl(r, t, e, n) {
  const i = (t >>> 0) + (n >>> 0);
  return { h: r + e + (i / 2 ** 32 | 0) | 0, l: i | 0 };
}
const kl = (r, t, e) => (r >>> 0) + (t >>> 0) + (e >>> 0), Cl = (r, t, e, n) => t + e + n + (r / 2 ** 32 | 0) | 0, Ll = (r, t, e, n) => (r >>> 0) + (t >>> 0) + (e >>> 0) + (n >>> 0), Rl = (r, t, e, n, i) => t + e + n + i + (r / 2 ** 32 | 0) | 0, Dl = (r, t, e, n, i) => (r >>> 0) + (t >>> 0) + (e >>> 0) + (n >>> 0) + (i >>> 0), Ol = (r, t, e, n, i, s) => t + e + n + i + s + (r / 2 ** 32 | 0) | 0, Et = {
  fromBig: Ya,
  split: pl,
  toBig: wl,
  shrSH: yl,
  shrSL: Al,
  rotrSH: ml,
  rotrSL: bl,
  rotrBH: vl,
  rotrBL: El,
  rotr32H: Ml,
  rotr32L: Sl,
  rotlSH: Il,
  rotlSL: xl,
  rotlBH: Bl,
  rotlBL: Nl,
  add: Tl,
  add3L: kl,
  add3H: Cl,
  add4L: Ll,
  add4H: Rl,
  add5H: Ol,
  add5L: Dl
}, [Ul, jl] = Et.split([
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
].map((r) => BigInt(r))), bn = /* @__PURE__ */ new Uint32Array(80), vn = /* @__PURE__ */ new Uint32Array(80);
class zl extends Za {
  constructor(t = 64) {
    super(128, t, 16, !1), this.Ah = 1779033703, this.Al = -205731576, this.Bh = -1150833019, this.Bl = -2067093701, this.Ch = 1013904242, this.Cl = -23791573, this.Dh = -1521486534, this.Dl = 1595750129, this.Eh = 1359893119, this.El = -1377402159, this.Fh = -1694144372, this.Fl = 725511199, this.Gh = 528734635, this.Gl = -79577749, this.Hh = 1541459225, this.Hl = 327033209;
  }
  // prettier-ignore
  get() {
    const { Ah: t, Al: e, Bh: n, Bl: i, Ch: s, Cl: l, Dh: h, Dl: p, Eh: v, El: S, Fh: C, Fl: F, Gh: U, Gl: z, Hh: D, Hl: k } = this;
    return [t, e, n, i, s, l, h, p, v, S, C, F, U, z, D, k];
  }
  // prettier-ignore
  set(t, e, n, i, s, l, h, p, v, S, C, F, U, z, D, k) {
    this.Ah = t | 0, this.Al = e | 0, this.Bh = n | 0, this.Bl = i | 0, this.Ch = s | 0, this.Cl = l | 0, this.Dh = h | 0, this.Dl = p | 0, this.Eh = v | 0, this.El = S | 0, this.Fh = C | 0, this.Fl = F | 0, this.Gh = U | 0, this.Gl = z | 0, this.Hh = D | 0, this.Hl = k | 0;
  }
  process(t, e) {
    for (let q = 0; q < 16; q++, e += 4)
      bn[q] = t.getUint32(e), vn[q] = t.getUint32(e += 4);
    for (let q = 16; q < 80; q++) {
      const V = bn[q - 15] | 0, J = vn[q - 15] | 0, X = Et.rotrSH(V, J, 1) ^ Et.rotrSH(V, J, 8) ^ Et.shrSH(V, J, 7), et = Et.rotrSL(V, J, 1) ^ Et.rotrSL(V, J, 8) ^ Et.shrSL(V, J, 7), N = bn[q - 2] | 0, M = vn[q - 2] | 0, x = Et.rotrSH(N, M, 19) ^ Et.rotrBH(N, M, 61) ^ Et.shrSH(N, M, 6), O = Et.rotrSL(N, M, 19) ^ Et.rotrBL(N, M, 61) ^ Et.shrSL(N, M, 6), R = Et.add4L(et, O, vn[q - 7], vn[q - 16]), b = Et.add4H(R, X, x, bn[q - 7], bn[q - 16]);
      bn[q] = b | 0, vn[q] = R | 0;
    }
    let { Ah: n, Al: i, Bh: s, Bl: l, Ch: h, Cl: p, Dh: v, Dl: S, Eh: C, El: F, Fh: U, Fl: z, Gh: D, Gl: k, Hh: Z, Hl: _ } = this;
    for (let q = 0; q < 80; q++) {
      const V = Et.rotrSH(C, F, 14) ^ Et.rotrSH(C, F, 18) ^ Et.rotrBH(C, F, 41), J = Et.rotrSL(C, F, 14) ^ Et.rotrSL(C, F, 18) ^ Et.rotrBL(C, F, 41), X = C & U ^ ~C & D, et = F & z ^ ~F & k, N = Et.add5L(_, J, et, jl[q], vn[q]), M = Et.add5H(N, Z, V, X, Ul[q], bn[q]), x = N | 0, O = Et.rotrSH(n, i, 28) ^ Et.rotrBH(n, i, 34) ^ Et.rotrBH(n, i, 39), R = Et.rotrSL(n, i, 28) ^ Et.rotrBL(n, i, 34) ^ Et.rotrBL(n, i, 39), b = n & s ^ n & h ^ s & h, u = i & l ^ i & p ^ l & p;
      Z = D | 0, _ = k | 0, D = U | 0, k = z | 0, U = C | 0, z = F | 0, { h: C, l: F } = Et.add(v | 0, S | 0, M | 0, x | 0), v = h | 0, S = p | 0, h = s | 0, p = l | 0, s = n | 0, l = i | 0;
      const d = Et.add3L(x, R, u);
      n = Et.add3H(d, M, O, b), i = d | 0;
    }
    ({ h: n, l: i } = Et.add(this.Ah | 0, this.Al | 0, n | 0, i | 0)), { h: s, l } = Et.add(this.Bh | 0, this.Bl | 0, s | 0, l | 0), { h, l: p } = Et.add(this.Ch | 0, this.Cl | 0, h | 0, p | 0), { h: v, l: S } = Et.add(this.Dh | 0, this.Dl | 0, v | 0, S | 0), { h: C, l: F } = Et.add(this.Eh | 0, this.El | 0, C | 0, F | 0), { h: U, l: z } = Et.add(this.Fh | 0, this.Fl | 0, U | 0, z | 0), { h: D, l: k } = Et.add(this.Gh | 0, this.Gl | 0, D | 0, k | 0), { h: Z, l: _ } = Et.add(this.Hh | 0, this.Hl | 0, Z | 0, _ | 0), this.set(n, i, s, l, h, p, v, S, C, F, U, z, D, k, Z, _);
  }
  roundClean() {
    bn.fill(0), vn.fill(0);
  }
  destroy() {
    this.buffer.fill(0), this.set(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
  }
}
const Pl = /* @__PURE__ */ Qa(() => new zl());
/*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */
const Vs = /* @__PURE__ */ BigInt(0), Ts = /* @__PURE__ */ BigInt(1);
function rr(r) {
  return r instanceof Uint8Array || ArrayBuffer.isView(r) && r.constructor.name === "Uint8Array";
}
function Xs(r) {
  if (!rr(r))
    throw new Error("Uint8Array expected");
}
function kn(r, t) {
  if (typeof t != "boolean")
    throw new Error(r + " boolean expected, got " + t);
}
function Pr(r) {
  const t = r.toString(16);
  return t.length & 1 ? "0" + t : t;
}
function Ga(r) {
  if (typeof r != "string")
    throw new Error("hex string expected, got " + typeof r);
  return r === "" ? Vs : BigInt("0x" + r);
}
const Ka = (
  // @ts-ignore
  typeof Uint8Array.from([]).toHex == "function" && typeof Uint8Array.fromHex == "function"
), Fl = /* @__PURE__ */ Array.from({ length: 256 }, (r, t) => t.toString(16).padStart(2, "0"));
function ir(r) {
  if (Xs(r), Ka)
    return r.toHex();
  let t = "";
  for (let e = 0; e < r.length; e++)
    t += Fl[r[e]];
  return t;
}
const sn = { _0: 48, _9: 57, A: 65, F: 70, a: 97, f: 102 };
function Do(r) {
  if (r >= sn._0 && r <= sn._9)
    return r - sn._0;
  if (r >= sn.A && r <= sn.F)
    return r - (sn.A - 10);
  if (r >= sn.a && r <= sn.f)
    return r - (sn.a - 10);
}
function ni(r) {
  if (typeof r != "string")
    throw new Error("hex string expected, got " + typeof r);
  if (Ka)
    return Uint8Array.fromHex(r);
  const t = r.length, e = t / 2;
  if (t % 2)
    throw new Error("hex string expected, got unpadded hex of length " + t);
  const n = new Uint8Array(e);
  for (let i = 0, s = 0; i < e; i++, s += 2) {
    const l = Do(r.charCodeAt(s)), h = Do(r.charCodeAt(s + 1));
    if (l === void 0 || h === void 0) {
      const p = r[s] + r[s + 1];
      throw new Error('hex string expected, got non-hex character "' + p + '" at index ' + s);
    }
    n[i] = l * 16 + h;
  }
  return n;
}
function Fn(r) {
  return Ga(ir(r));
}
function Ir(r) {
  return Xs(r), Ga(ir(Uint8Array.from(r).reverse()));
}
function xr(r, t) {
  return ni(r.toString(16).padStart(t * 2, "0"));
}
function ri(r, t) {
  return xr(r, t).reverse();
}
function de(r, t, e) {
  let n;
  if (typeof t == "string")
    try {
      n = ni(t);
    } catch (s) {
      throw new Error(r + " must be hex string or Uint8Array, cause: " + s);
    }
  else if (rr(t))
    n = Uint8Array.from(t);
  else
    throw new Error(r + " must be hex string or Uint8Array");
  const i = n.length;
  if (typeof e == "number" && i !== e)
    throw new Error(r + " of length " + e + " expected, got " + i);
  return n;
}
function sr(...r) {
  let t = 0;
  for (let n = 0; n < r.length; n++) {
    const i = r[n];
    Xs(i), t += i.length;
  }
  const e = new Uint8Array(t);
  for (let n = 0, i = 0; n < r.length; n++) {
    const s = r[n];
    e.set(s, i), i += s.length;
  }
  return e;
}
const ts = (r) => typeof r == "bigint" && Vs <= r;
function $s(r, t, e) {
  return ts(r) && ts(t) && ts(e) && t <= r && r < e;
}
function Ze(r, t, e, n) {
  if (!$s(t, e, n))
    throw new Error("expected valid " + r + ": " + e + " <= n < " + n + ", got " + t);
}
function _l(r) {
  let t;
  for (t = 0; r > Vs; r >>= Ts, t += 1)
    ;
  return t;
}
const wi = (r) => (Ts << BigInt(r)) - Ts, es = (r) => new Uint8Array(r), Oo = (r) => Uint8Array.from(r);
function Wl(r, t, e) {
  if (typeof r != "number" || r < 2)
    throw new Error("hashLen must be a number");
  if (typeof t != "number" || t < 2)
    throw new Error("qByteLen must be a number");
  if (typeof e != "function")
    throw new Error("hmacFn must be a function");
  let n = es(r), i = es(r), s = 0;
  const l = () => {
    n.fill(1), i.fill(0), s = 0;
  }, h = (...C) => e(i, n, ...C), p = (C = es(0)) => {
    i = h(Oo([0]), C), n = h(), C.length !== 0 && (i = h(Oo([1]), C), n = h());
  }, v = () => {
    if (s++ >= 1e3)
      throw new Error("drbg: tried 1000 values");
    let C = 0;
    const F = [];
    for (; C < t; ) {
      n = h();
      const U = n.slice();
      F.push(U), C += n.length;
    }
    return sr(...F);
  };
  return (C, F) => {
    l(), p(C);
    let U;
    for (; !(U = F(v())); )
      p();
    return l(), U;
  };
}
const ql = {
  bigint: (r) => typeof r == "bigint",
  function: (r) => typeof r == "function",
  boolean: (r) => typeof r == "boolean",
  string: (r) => typeof r == "string",
  stringOrUint8Array: (r) => typeof r == "string" || rr(r),
  isSafeInteger: (r) => Number.isSafeInteger(r),
  array: (r) => Array.isArray(r),
  field: (r, t) => t.Fp.isValid(r),
  hash: (r) => typeof r == "function" && Number.isSafeInteger(r.outputLen)
};
function kr(r, t, e = {}) {
  const n = (i, s, l) => {
    const h = ql[s];
    if (typeof h != "function")
      throw new Error("invalid validator function");
    const p = r[i];
    if (!(l && p === void 0) && !h(p, r))
      throw new Error("param " + String(i) + " is invalid. Expected " + s + ", got " + p);
  };
  for (const [i, s] of Object.entries(t))
    n(i, s, !1);
  for (const [i, s] of Object.entries(e))
    n(i, s, !0);
  return r;
}
function ii(r) {
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
const ye = BigInt(0), qt = BigInt(1), jn = /* @__PURE__ */ BigInt(2), Ql = /* @__PURE__ */ BigInt(3), ks = /* @__PURE__ */ BigInt(4), Uo = /* @__PURE__ */ BigInt(5), jo = /* @__PURE__ */ BigInt(8);
function Ft(r, t) {
  const e = r % t;
  return e >= ye ? e : t + e;
}
function Hl(r, t, e) {
  if (t < ye)
    throw new Error("invalid exponent, negatives unsupported");
  if (e <= ye)
    throw new Error("invalid modulus");
  if (e === qt)
    return ye;
  let n = qt;
  for (; t > ye; )
    t & qt && (n = n * r % e), r = r * r % e, t >>= qt;
  return n;
}
function Ht(r, t, e) {
  let n = r;
  for (; t-- > ye; )
    n *= n, n %= e;
  return n;
}
function Cs(r, t) {
  if (r === ye)
    throw new Error("invert: expected non-zero number");
  if (t <= ye)
    throw new Error("invert: expected positive modulus, got " + t);
  let e = Ft(r, t), n = t, i = ye, s = qt;
  for (; e !== ye; ) {
    const h = n / e, p = n % e, v = i - s * h;
    n = e, e = p, i = s, s = v;
  }
  if (n !== qt)
    throw new Error("invert: does not exist");
  return Ft(i, t);
}
function Zl(r) {
  const t = (r - qt) / jn;
  let e, n, i;
  for (e = r - qt, n = 0; e % jn === ye; e /= jn, n++)
    ;
  for (i = jn; i < r && Hl(i, t, r) !== r - qt; i++)
    if (i > 1e3)
      throw new Error("Cannot find square root: likely non-prime P");
  if (n === 1) {
    const l = (r + qt) / ks;
    return function(p, v) {
      const S = p.pow(v, l);
      if (!p.eql(p.sqr(S), v))
        throw new Error("Cannot find square root");
      return S;
    };
  }
  const s = (e + qt) / jn;
  return function(h, p) {
    if (h.pow(p, t) === h.neg(h.ONE))
      throw new Error("Cannot find square root");
    let v = n, S = h.pow(h.mul(h.ONE, i), e), C = h.pow(p, s), F = h.pow(p, e);
    for (; !h.eql(F, h.ONE); ) {
      if (h.eql(F, h.ZERO))
        return h.ZERO;
      let U = 1;
      for (let D = h.sqr(F); U < v && !h.eql(D, h.ONE); U++)
        D = h.sqr(D);
      const z = h.pow(S, qt << BigInt(v - U - 1));
      S = h.sqr(z), C = h.mul(C, z), F = h.mul(F, S), v = U;
    }
    return C;
  };
}
function Yl(r) {
  if (r % ks === Ql) {
    const t = (r + qt) / ks;
    return function(n, i) {
      const s = n.pow(i, t);
      if (!n.eql(n.sqr(s), i))
        throw new Error("Cannot find square root");
      return s;
    };
  }
  if (r % jo === Uo) {
    const t = (r - Uo) / jo;
    return function(n, i) {
      const s = n.mul(i, jn), l = n.pow(s, t), h = n.mul(i, l), p = n.mul(n.mul(h, jn), l), v = n.mul(h, n.sub(p, n.ONE));
      if (!n.eql(n.sqr(v), i))
        throw new Error("Cannot find square root");
      return v;
    };
  }
  return Zl(r);
}
const Gl = (r, t) => (Ft(r, t) & qt) === qt, Kl = [
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
function Jl(r) {
  const t = {
    ORDER: "bigint",
    MASK: "bigint",
    BYTES: "isSafeInteger",
    BITS: "isSafeInteger"
  }, e = Kl.reduce((n, i) => (n[i] = "function", n), t);
  return kr(r, e);
}
function Vl(r, t, e) {
  if (e < ye)
    throw new Error("invalid exponent, negatives unsupported");
  if (e === ye)
    return r.ONE;
  if (e === qt)
    return t;
  let n = r.ONE, i = t;
  for (; e > ye; )
    e & qt && (n = r.mul(n, i)), i = r.sqr(i), e >>= qt;
  return n;
}
function Xl(r, t) {
  const e = new Array(t.length), n = t.reduce((s, l, h) => r.is0(l) ? s : (e[h] = s, r.mul(s, l)), r.ONE), i = r.inv(n);
  return t.reduceRight((s, l, h) => r.is0(l) ? s : (e[h] = r.mul(s, e[h]), r.mul(s, l)), i), e;
}
function Ja(r, t) {
  const e = t !== void 0 ? t : r.toString(2).length, n = Math.ceil(e / 8);
  return { nBitLength: e, nByteLength: n };
}
function yi(r, t, e = !1, n = {}) {
  if (r <= ye)
    throw new Error("invalid field: expected ORDER > 0, got " + r);
  const { nBitLength: i, nByteLength: s } = Ja(r, t);
  if (s > 2048)
    throw new Error("invalid field: expected ORDER of <= 2048 bytes");
  let l;
  const h = Object.freeze({
    ORDER: r,
    isLE: e,
    BITS: i,
    BYTES: s,
    MASK: wi(i),
    ZERO: ye,
    ONE: qt,
    create: (p) => Ft(p, r),
    isValid: (p) => {
      if (typeof p != "bigint")
        throw new Error("invalid field element: expected bigint, got " + typeof p);
      return ye <= p && p < r;
    },
    is0: (p) => p === ye,
    isOdd: (p) => (p & qt) === qt,
    neg: (p) => Ft(-p, r),
    eql: (p, v) => p === v,
    sqr: (p) => Ft(p * p, r),
    add: (p, v) => Ft(p + v, r),
    sub: (p, v) => Ft(p - v, r),
    mul: (p, v) => Ft(p * v, r),
    pow: (p, v) => Vl(h, p, v),
    div: (p, v) => Ft(p * Cs(v, r), r),
    // Same as above, but doesn't normalize
    sqrN: (p) => p * p,
    addN: (p, v) => p + v,
    subN: (p, v) => p - v,
    mulN: (p, v) => p * v,
    inv: (p) => Cs(p, r),
    sqrt: n.sqrt || ((p) => (l || (l = Yl(r)), l(h, p))),
    invertBatch: (p) => Xl(h, p),
    // TODO: do we really need constant cmov?
    // We don't have const-time bigints anyway, so probably will be not very useful
    cmov: (p, v, S) => S ? v : p,
    toBytes: (p) => e ? ri(p, s) : xr(p, s),
    fromBytes: (p) => {
      if (p.length !== s)
        throw new Error("Field.fromBytes: expected " + s + " bytes, got " + p.length);
      return e ? Ir(p) : Fn(p);
    }
  });
  return Object.freeze(h);
}
function Va(r) {
  if (typeof r != "bigint")
    throw new Error("field order must be bigint");
  const t = r.toString(2).length;
  return Math.ceil(t / 8);
}
function Xa(r) {
  const t = Va(r);
  return t + Math.ceil(t / 2);
}
function $l(r, t, e = !1) {
  const n = r.length, i = Va(t), s = Xa(t);
  if (n < 16 || n < s || n > 1024)
    throw new Error("expected " + s + "-1024 bytes of input, got " + n);
  const l = e ? Ir(r) : Fn(r), h = Ft(l, t - qt) + qt;
  return e ? ri(h, i) : xr(h, i);
}
/*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */
const zo = BigInt(0), Ls = BigInt(1);
function ns(r, t) {
  const e = t.negate();
  return r ? e : t;
}
function $a(r, t) {
  if (!Number.isSafeInteger(r) || r <= 0 || r > t)
    throw new Error("invalid window size, expected [1.." + t + "], got W=" + r);
}
function rs(r, t) {
  $a(r, t);
  const e = Math.ceil(t / r) + 1, n = 2 ** (r - 1), i = 2 ** r, s = wi(r), l = BigInt(r);
  return { windows: e, windowSize: n, mask: s, maxNumber: i, shiftBy: l };
}
function Po(r, t, e) {
  const { windowSize: n, mask: i, maxNumber: s, shiftBy: l } = e;
  let h = Number(r & i), p = r >> l;
  h > n && (h -= s, p += Ls);
  const v = t * n, S = v + Math.abs(h) - 1, C = h === 0, F = h < 0, U = t % 2 !== 0;
  return { nextN: p, offset: S, isZero: C, isNeg: F, isNegF: U, offsetF: v };
}
function th(r, t) {
  if (!Array.isArray(r))
    throw new Error("array expected");
  r.forEach((e, n) => {
    if (!(e instanceof t))
      throw new Error("invalid point at index " + n);
  });
}
function eh(r, t) {
  if (!Array.isArray(r))
    throw new Error("array of scalars expected");
  r.forEach((e, n) => {
    if (!t.isValid(e))
      throw new Error("invalid scalar at index " + n);
  });
}
const is = /* @__PURE__ */ new WeakMap(), tc = /* @__PURE__ */ new WeakMap();
function ss(r) {
  return tc.get(r) || 1;
}
function ec(r, t) {
  return {
    constTimeNegate: ns,
    hasPrecomputes(e) {
      return ss(e) !== 1;
    },
    // non-const time multiplication ladder
    unsafeLadder(e, n, i = r.ZERO) {
      let s = e;
      for (; n > zo; )
        n & Ls && (i = i.add(s)), s = s.double(), n >>= Ls;
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
      const { windows: i, windowSize: s } = rs(n, t), l = [];
      let h = e, p = h;
      for (let v = 0; v < i; v++) {
        p = h, l.push(p);
        for (let S = 1; S < s; S++)
          p = p.add(h), l.push(p);
        h = p.double();
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
      const h = rs(e, t);
      for (let p = 0; p < h.windows; p++) {
        const { nextN: v, offset: S, isZero: C, isNeg: F, isNegF: U, offsetF: z } = Po(i, p, h);
        i = v, C ? l = l.add(ns(U, n[z])) : s = s.add(ns(F, n[S]));
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
      const l = rs(e, t);
      for (let h = 0; h < l.windows && i !== zo; h++) {
        const { nextN: p, offset: v, isZero: S, isNeg: C } = Po(i, h, l);
        if (i = p, !S) {
          const F = n[v];
          s = s.add(C ? F.negate() : F);
        }
      }
      return s;
    },
    getPrecomputes(e, n, i) {
      let s = is.get(n);
      return s || (s = this.precomputeWindow(n, e), e !== 1 && is.set(n, i(s))), s;
    },
    wNAFCached(e, n, i) {
      const s = ss(e);
      return this.wNAF(s, this.getPrecomputes(s, e, i), n);
    },
    wNAFCachedUnsafe(e, n, i, s) {
      const l = ss(e);
      return l === 1 ? this.unsafeLadder(e, n, s) : this.wNAFUnsafe(l, this.getPrecomputes(l, e, i), n, s);
    },
    // We calculate precomputes for elliptic curve point multiplication
    // using windowed method. This specifies window size and
    // stores precomputed values. Usually only base point would be precomputed.
    setWindowSize(e, n) {
      $a(n, t), tc.set(e, n), is.delete(e);
    }
  };
}
function nc(r, t, e, n) {
  if (th(e, r), eh(n, t), e.length !== n.length)
    throw new Error("arrays of points and scalars must have equal length");
  const i = r.ZERO, s = _l(BigInt(e.length)), l = s > 12 ? s - 3 : s > 4 ? s - 2 : s ? 2 : 1, h = wi(l), p = new Array(Number(h) + 1).fill(i), v = Math.floor((t.BITS - 1) / l) * l;
  let S = i;
  for (let C = v; C >= 0; C -= l) {
    p.fill(i);
    for (let U = 0; U < n.length; U++) {
      const z = n[U], D = Number(z >> BigInt(C) & h);
      p[D] = p[D].add(e[U]);
    }
    let F = i;
    for (let U = p.length - 1, z = i; U > 0; U--)
      z = z.add(p[U]), F = F.add(z);
    if (S = S.add(F), C !== 0)
      for (let U = 0; U < l; U++)
        S = S.double();
  }
  return S;
}
function to(r) {
  return Jl(r.Fp), kr(r, {
    n: "bigint",
    h: "bigint",
    Gx: "field",
    Gy: "field"
  }, {
    nBitLength: "isSafeInteger",
    nByteLength: "isSafeInteger"
  }), Object.freeze({
    ...Ja(r.n, r.nBitLength),
    ...r,
    p: r.Fp.ORDER
  });
}
/*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */
const Xe = BigInt(0), Ne = BigInt(1), Fo = BigInt(2), nh = BigInt(8), rh = { zip215: !0 };
function ih(r) {
  const t = to(r);
  return kr(r, {
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
function sh(r) {
  const t = ih(r), { Fp: e, n, prehash: i, hash: s, randomBytes: l, nByteLength: h, h: p } = t, v = Fo << BigInt(h * 8) - Ne, S = e.create, C = yi(t.n, t.nBitLength), F = t.uvRatio || ((m, y) => {
    try {
      return { isValid: !0, value: e.sqrt(m * e.inv(y)) };
    } catch {
      return { isValid: !1, value: Xe };
    }
  }), U = t.adjustScalarBytes || ((m) => m), z = t.domain || ((m, y, B) => {
    if (kn("phflag", B), y.length || B)
      throw new Error("Contexts/pre-hash are not supported");
    return m;
  });
  function D(m, y, B = !1) {
    const P = B ? Ne : Xe;
    Ze("coordinate " + m, y, P, v);
  }
  function k(m) {
    if (!(m instanceof q))
      throw new Error("ExtendedPoint expected");
  }
  const Z = ii((m, y) => {
    const { ex: B, ey: P, ez: E } = m, f = m.is0();
    y == null && (y = f ? nh : e.inv(E));
    const g = S(B * y), I = S(P * y), L = S(E * y);
    if (f)
      return { x: Xe, y: Ne };
    if (L !== Ne)
      throw new Error("invZ was invalid");
    return { x: g, y: I };
  }), _ = ii((m) => {
    const { a: y, d: B } = t;
    if (m.is0())
      throw new Error("bad point: ZERO");
    const { ex: P, ey: E, ez: f, et: g } = m, I = S(P * P), L = S(E * E), H = S(f * f), K = S(H * H), tt = S(I * y), st = S(H * S(tt + L)), xt = S(K + S(B * S(I * L)));
    if (st !== xt)
      throw new Error("bad point: equation left != right (1)");
    const dt = S(P * E), mt = S(f * g);
    if (dt !== mt)
      throw new Error("bad point: equation left != right (2)");
    return !0;
  });
  class q {
    constructor(y, B, P, E) {
      D("x", y), D("y", B), D("z", P, !0), D("t", E), this.ex = y, this.ey = B, this.ez = P, this.et = E, Object.freeze(this);
    }
    get x() {
      return this.toAffine().x;
    }
    get y() {
      return this.toAffine().y;
    }
    static fromAffine(y) {
      if (y instanceof q)
        throw new Error("extended point not allowed");
      const { x: B, y: P } = y || {};
      return D("x", B), D("y", P), new q(B, P, Ne, S(B * P));
    }
    static normalizeZ(y) {
      const B = e.invertBatch(y.map((P) => P.ez));
      return y.map((P, E) => P.toAffine(B[E])).map(q.fromAffine);
    }
    // Multiscalar Multiplication
    static msm(y, B) {
      return nc(q, C, y, B);
    }
    // "Private method", don't use it directly
    _setWindowSize(y) {
      X.setWindowSize(this, y);
    }
    // Not required for fromHex(), which always creates valid points.
    // Could be useful for fromAffine().
    assertValidity() {
      _(this);
    }
    // Compare one point to another.
    equals(y) {
      k(y);
      const { ex: B, ey: P, ez: E } = this, { ex: f, ey: g, ez: I } = y, L = S(B * I), H = S(f * E), K = S(P * I), tt = S(g * E);
      return L === H && K === tt;
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
      const { a: y } = t, { ex: B, ey: P, ez: E } = this, f = S(B * B), g = S(P * P), I = S(Fo * S(E * E)), L = S(y * f), H = B + P, K = S(S(H * H) - f - g), tt = L + g, st = tt - I, xt = L - g, dt = S(K * st), mt = S(tt * xt), bt = S(K * xt), ht = S(st * tt);
      return new q(dt, mt, ht, bt);
    }
    // Fast algo for adding 2 Extended Points.
    // https://hyperelliptic.org/EFD/g1p/auto-twisted-extended.html#addition-add-2008-hwcd
    // Cost: 9M + 1*a + 1*d + 7add.
    add(y) {
      k(y);
      const { a: B, d: P } = t, { ex: E, ey: f, ez: g, et: I } = this, { ex: L, ey: H, ez: K, et: tt } = y, st = S(E * L), xt = S(f * H), dt = S(I * P * tt), mt = S(g * K), bt = S((E + f) * (L + H) - st - xt), ht = mt - dt, pt = mt + dt, nn = S(xt - B * st), Bt = S(bt * ht), Dt = S(pt * nn), dn = S(bt * nn), Lt = S(ht * pt);
      return new q(Bt, Dt, Lt, dn);
    }
    subtract(y) {
      return this.add(y.negate());
    }
    wNAF(y) {
      return X.wNAFCached(this, y, q.normalizeZ);
    }
    // Constant-time multiplication.
    multiply(y) {
      const B = y;
      Ze("scalar", B, Ne, n);
      const { p: P, f: E } = this.wNAF(B);
      return q.normalizeZ([P, E])[0];
    }
    // Non-constant-time multiplication. Uses double-and-add algorithm.
    // It's faster, but should only be used when you don't care about
    // an exposed private key e.g. sig verification.
    // Does NOT allow scalars higher than CURVE.n.
    // Accepts optional accumulator to merge with multiply (important for sparse scalars)
    multiplyUnsafe(y, B = q.ZERO) {
      const P = y;
      return Ze("scalar", P, Xe, n), P === Xe ? J : this.is0() || P === Ne ? this : X.wNAFCachedUnsafe(this, P, q.normalizeZ, B);
    }
    // Checks if point is of small order.
    // If you add something to small order point, you will have "dirty"
    // point with torsion component.
    // Multiplies point by cofactor and checks if the result is 0.
    isSmallOrder() {
      return this.multiplyUnsafe(p).is0();
    }
    // Multiplies point by curve order and checks if the result is 0.
    // Returns `false` is the point is dirty.
    isTorsionFree() {
      return X.unsafeLadder(this, n).is0();
    }
    // Converts Extended point to default (x, y) coordinates.
    // Can accept precomputed Z^-1 - for example, from invertBatch.
    toAffine(y) {
      return Z(this, y);
    }
    clearCofactor() {
      const { h: y } = t;
      return y === Ne ? this : this.multiplyUnsafe(y);
    }
    // Converts hash string or Uint8Array to Point.
    // Uses algo from RFC8032 5.1.3.
    static fromHex(y, B = !1) {
      const { d: P, a: E } = t, f = e.BYTES;
      y = de("pointHex", y, f), kn("zip215", B);
      const g = y.slice(), I = y[f - 1];
      g[f - 1] = I & -129;
      const L = Ir(g), H = B ? v : e.ORDER;
      Ze("pointHex.y", L, Xe, H);
      const K = S(L * L), tt = S(K - Ne), st = S(P * K - E);
      let { isValid: xt, value: dt } = F(tt, st);
      if (!xt)
        throw new Error("Point.fromHex: invalid y coordinate");
      const mt = (dt & Ne) === Ne, bt = (I & 128) !== 0;
      if (!B && dt === Xe && bt)
        throw new Error("Point.fromHex: x=0 and x_0=1");
      return bt !== mt && (dt = S(-dt)), q.fromAffine({ x: dt, y: L });
    }
    static fromPrivateKey(y) {
      const { scalar: B } = M(y);
      return V.multiply(B);
    }
    toRawBytes() {
      const { x: y, y: B } = this.toAffine(), P = ri(B, e.BYTES);
      return P[P.length - 1] |= y & Ne ? 128 : 0, P;
    }
    toHex() {
      return ir(this.toRawBytes());
    }
  }
  q.BASE = new q(t.Gx, t.Gy, Ne, S(t.Gx * t.Gy)), q.ZERO = new q(Xe, Ne, Ne, Xe);
  const { BASE: V, ZERO: J } = q, X = ec(q, h * 8);
  function et(m) {
    return Ft(m, n);
  }
  function N(m) {
    return et(Ir(m));
  }
  function M(m) {
    const y = e.BYTES;
    m = de("private key", m, y);
    const B = de("hashed private key", s(m), 2 * y), P = U(B.slice(0, y)), E = B.slice(y, 2 * y), f = N(P);
    return { head: P, prefix: E, scalar: f };
  }
  function x(m) {
    const { head: y, prefix: B, scalar: P } = M(m), E = V.multiply(P), f = E.toRawBytes();
    return { head: y, prefix: B, scalar: P, point: E, pointBytes: f };
  }
  function O(m) {
    return x(m).pointBytes;
  }
  function R(m = new Uint8Array(), ...y) {
    const B = sr(...y);
    return N(s(z(B, de("context", m), !!i)));
  }
  function b(m, y, B = {}) {
    m = de("message", m), i && (m = i(m));
    const { prefix: P, scalar: E, pointBytes: f } = x(y), g = R(B.context, P, m), I = V.multiply(g).toRawBytes(), L = R(B.context, I, f, m), H = et(g + L * E);
    Ze("signature.s", H, Xe, n);
    const K = sr(I, ri(H, e.BYTES));
    return de("result", K, e.BYTES * 2);
  }
  const u = rh;
  function d(m, y, B, P = u) {
    const { context: E, zip215: f } = P, g = e.BYTES;
    m = de("signature", m, 2 * g), y = de("message", y), B = de("publicKey", B, g), f !== void 0 && kn("zip215", f), i && (y = i(y));
    const I = Ir(m.slice(g, 2 * g));
    let L, H, K;
    try {
      L = q.fromHex(B, f), H = q.fromHex(m.slice(0, g), f), K = V.multiplyUnsafe(I);
    } catch {
      return !1;
    }
    if (!f && L.isSmallOrder())
      return !1;
    const tt = R(E, H.toRawBytes(), L.toRawBytes(), y);
    return H.add(L.multiplyUnsafe(tt)).subtract(K).clearCofactor().equals(q.ZERO);
  }
  return V._setWindowSize(8), {
    CURVE: t,
    getPublicKey: O,
    sign: b,
    verify: d,
    ExtendedPoint: q,
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
      precompute(m = 8, y = q.BASE) {
        return y._setWindowSize(m), y.multiply(BigInt(3)), y;
      }
    }
  };
}
/*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */
const eo = BigInt("57896044618658097711785492504343953926634992332820282019728792003956564819949"), _o = /* @__PURE__ */ BigInt("19681161376707505956807079304988542015446066515923890162744021073123829784752");
BigInt(0);
const oh = BigInt(1), Wo = BigInt(2);
BigInt(3);
const ah = BigInt(5), ch = BigInt(8);
function uh(r) {
  const t = BigInt(10), e = BigInt(20), n = BigInt(40), i = BigInt(80), s = eo, h = r * r % s * r % s, p = Ht(h, Wo, s) * h % s, v = Ht(p, oh, s) * r % s, S = Ht(v, ah, s) * v % s, C = Ht(S, t, s) * S % s, F = Ht(C, e, s) * C % s, U = Ht(F, n, s) * F % s, z = Ht(U, i, s) * U % s, D = Ht(z, i, s) * U % s, k = Ht(D, t, s) * S % s;
  return { pow_p_5_8: Ht(k, Wo, s) * r % s, b2: h };
}
function lh(r) {
  return r[0] &= 248, r[31] &= 127, r[31] |= 64, r;
}
function hh(r, t) {
  const e = eo, n = Ft(t * t * t, e), i = Ft(n * n * t, e), s = uh(r * i).pow_p_5_8;
  let l = Ft(r * n * s, e);
  const h = Ft(t * l * l, e), p = l, v = Ft(l * _o, e), S = h === r, C = h === Ft(-r, e), F = h === Ft(-r * _o, e);
  return S && (l = p), (C || F) && (l = v), Gl(l, e) && (l = Ft(-l, e)), { isValid: S || C, value: l };
}
const qo = yi(eo, void 0, !0), fh = {
  // Removing Fp.create() will still work, and is 10% faster on sign
  a: qo.create(BigInt(-1)),
  // d is -121665/121666 a.k.a. Fp.neg(121665 * Fp.inv(121666))
  d: BigInt("37095705934669439343138083508754565189542113879843219016388785533085940283555"),
  // Finite field 2n**255n - 19n
  Fp: qo,
  // Subgroup order 2n**252n + 27742317777372353535851937790883648493n;
  n: BigInt("7237005577332262213973186563042994240857116359379907606001950938285454250989"),
  h: ch,
  Gx: BigInt("15112221349535400772501151409588531511454012693041857206046113283949847762202"),
  Gy: BigInt("46316835694926478169428394003475163141307993866256225615783033603165251855960"),
  hash: Pl,
  randomBytes: Ha,
  adjustScalarBytes: lh,
  // dom2
  // Ratio of u to v. Allows us to combine inversion and square root. Uses algo from RFC8032 5.1.3.
  // Constant-time, u/√v
  uvRatio: hh
}, no = sh(fh);
var Yr = { exports: {} };
const dh = {}, gh = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: dh
}, Symbol.toStringTag, { value: "Module" })), ph = /* @__PURE__ */ Gs(gh);
var wh = Yr.exports, Qo;
function rc() {
  return Qo || (Qo = 1, function(r) {
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
        typeof window < "u" && typeof window.Buffer < "u" ? l = window.Buffer : l = ph.Buffer;
      } catch {
      }
      s.isBN = function(u) {
        return u instanceof s ? !0 : u !== null && typeof u == "object" && u.constructor.wordSize === s.wordSize && Array.isArray(u.words);
      }, s.max = function(u, d) {
        return u.cmp(d) > 0 ? u : d;
      }, s.min = function(u, d) {
        return u.cmp(d) < 0 ? u : d;
      }, s.prototype._init = function(u, d, w) {
        if (typeof u == "number")
          return this._initNumber(u, d, w);
        if (typeof u == "object")
          return this._initArray(u, d, w);
        d === "hex" && (d = 16), n(d === (d | 0) && d >= 2 && d <= 36), u = u.toString().replace(/\s+/g, "");
        var m = 0;
        u[0] === "-" && (m++, this.negative = 1), m < u.length && (d === 16 ? this._parseHex(u, m, w) : (this._parseBase(u, d, m), w === "le" && this._initArray(this.toArray(), d, w)));
      }, s.prototype._initNumber = function(u, d, w) {
        u < 0 && (this.negative = 1, u = -u), u < 67108864 ? (this.words = [u & 67108863], this.length = 1) : u < 4503599627370496 ? (this.words = [
          u & 67108863,
          u / 67108864 & 67108863
        ], this.length = 2) : (n(u < 9007199254740992), this.words = [
          u & 67108863,
          u / 67108864 & 67108863,
          1
        ], this.length = 3), w === "le" && this._initArray(this.toArray(), d, w);
      }, s.prototype._initArray = function(u, d, w) {
        if (n(typeof u.length == "number"), u.length <= 0)
          return this.words = [0], this.length = 1, this;
        this.length = Math.ceil(u.length / 3), this.words = new Array(this.length);
        for (var m = 0; m < this.length; m++)
          this.words[m] = 0;
        var y, B, P = 0;
        if (w === "be")
          for (m = u.length - 1, y = 0; m >= 0; m -= 3)
            B = u[m] | u[m - 1] << 8 | u[m - 2] << 16, this.words[y] |= B << P & 67108863, this.words[y + 1] = B >>> 26 - P & 67108863, P += 24, P >= 26 && (P -= 26, y++);
        else if (w === "le")
          for (m = 0, y = 0; m < u.length; m += 3)
            B = u[m] | u[m + 1] << 8 | u[m + 2] << 16, this.words[y] |= B << P & 67108863, this.words[y + 1] = B >>> 26 - P & 67108863, P += 24, P >= 26 && (P -= 26, y++);
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
      function p(b, u, d) {
        var w = h(b, d);
        return d - 1 >= u && (w |= h(b, d - 1) << 4), w;
      }
      s.prototype._parseHex = function(u, d, w) {
        this.length = Math.ceil((u.length - d) / 6), this.words = new Array(this.length);
        for (var m = 0; m < this.length; m++)
          this.words[m] = 0;
        var y = 0, B = 0, P;
        if (w === "be")
          for (m = u.length - 1; m >= d; m -= 2)
            P = p(u, d, m) << y, this.words[B] |= P & 67108863, y >= 18 ? (y -= 18, B += 1, this.words[B] |= P >>> 26) : y += 8;
        else {
          var E = u.length - d;
          for (m = E % 2 === 0 ? d + 1 : d; m < u.length; m += 2)
            P = p(u, d, m) << y, this.words[B] |= P & 67108863, y >= 18 ? (y -= 18, B += 1, this.words[B] |= P >>> 26) : y += 8;
        }
        this._strip();
      };
      function v(b, u, d, w) {
        for (var m = 0, y = 0, B = Math.min(b.length, d), P = u; P < B; P++) {
          var E = b.charCodeAt(P) - 48;
          m *= w, E >= 49 ? y = E - 49 + 10 : E >= 17 ? y = E - 17 + 10 : y = E, n(E >= 0 && y < w, "Invalid character"), m += y;
        }
        return m;
      }
      s.prototype._parseBase = function(u, d, w) {
        this.words = [0], this.length = 1;
        for (var m = 0, y = 1; y <= 67108863; y *= d)
          m++;
        m--, y = y / d | 0;
        for (var B = u.length - w, P = B % m, E = Math.min(B, B - P) + w, f = 0, g = w; g < E; g += m)
          f = v(u, g, g + m, d), this.imuln(y), this.words[0] + f < 67108864 ? this.words[0] += f : this._iaddn(f);
        if (P !== 0) {
          var I = 1;
          for (f = v(u, g, u.length, d), g = 0; g < P; g++)
            I *= d;
          this.imuln(I), this.words[0] + f < 67108864 ? this.words[0] += f : this._iaddn(f);
        }
        this._strip();
      }, s.prototype.copy = function(u) {
        u.words = new Array(this.length);
        for (var d = 0; d < this.length; d++)
          u.words[d] = this.words[d];
        u.length = this.length, u.negative = this.negative, u.red = this.red;
      };
      function S(b, u) {
        b.words = u.words, b.length = u.length, b.negative = u.negative, b.red = u.red;
      }
      if (s.prototype._move = function(u) {
        S(u, this);
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
          s.prototype[Symbol.for("nodejs.util.inspect.custom")] = C;
        } catch {
          s.prototype.inspect = C;
        }
      else
        s.prototype.inspect = C;
      function C() {
        return (this.red ? "<BN-R: " : "<BN: ") + this.toString(16) + ">";
      }
      var F = [
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
      ], z = [
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
        var w;
        if (u === 16 || u === "hex") {
          w = "";
          for (var m = 0, y = 0, B = 0; B < this.length; B++) {
            var P = this.words[B], E = ((P << m | y) & 16777215).toString(16);
            y = P >>> 24 - m & 16777215, m += 2, m >= 26 && (m -= 26, B--), y !== 0 || B !== this.length - 1 ? w = F[6 - E.length] + E + w : w = E + w;
          }
          for (y !== 0 && (w = y.toString(16) + w); w.length % d !== 0; )
            w = "0" + w;
          return this.negative !== 0 && (w = "-" + w), w;
        }
        if (u === (u | 0) && u >= 2 && u <= 36) {
          var f = U[u], g = z[u];
          w = "";
          var I = this.clone();
          for (I.negative = 0; !I.isZero(); ) {
            var L = I.modrn(g).toString(u);
            I = I.idivn(g), I.isZero() ? w = L + w : w = F[f - L.length] + L + w;
          }
          for (this.isZero() && (w = "0" + w); w.length % d !== 0; )
            w = "0" + w;
          return this.negative !== 0 && (w = "-" + w), w;
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
      s.prototype.toArrayLike = function(u, d, w) {
        this._strip();
        var m = this.byteLength(), y = w || Math.max(1, m);
        n(m <= y, "byte array longer than desired length"), n(y > 0, "Requested array length <= 0");
        var B = D(u, y), P = d === "le" ? "LE" : "BE";
        return this["_toArrayLike" + P](B, m), B;
      }, s.prototype._toArrayLikeLE = function(u, d) {
        for (var w = 0, m = 0, y = 0, B = 0; y < this.length; y++) {
          var P = this.words[y] << B | m;
          u[w++] = P & 255, w < u.length && (u[w++] = P >> 8 & 255), w < u.length && (u[w++] = P >> 16 & 255), B === 6 ? (w < u.length && (u[w++] = P >> 24 & 255), m = 0, B = 0) : (m = P >>> 24, B += 2);
        }
        if (w < u.length)
          for (u[w++] = m; w < u.length; )
            u[w++] = 0;
      }, s.prototype._toArrayLikeBE = function(u, d) {
        for (var w = u.length - 1, m = 0, y = 0, B = 0; y < this.length; y++) {
          var P = this.words[y] << B | m;
          u[w--] = P & 255, w >= 0 && (u[w--] = P >> 8 & 255), w >= 0 && (u[w--] = P >> 16 & 255), B === 6 ? (w >= 0 && (u[w--] = P >> 24 & 255), m = 0, B = 0) : (m = P >>> 24, B += 2);
        }
        if (w >= 0)
          for (u[w--] = m; w >= 0; )
            u[w--] = 0;
      }, Math.clz32 ? s.prototype._countBits = function(u) {
        return 32 - Math.clz32(u);
      } : s.prototype._countBits = function(u) {
        var d = u, w = 0;
        return d >= 4096 && (w += 13, d >>>= 13), d >= 64 && (w += 7, d >>>= 7), d >= 8 && (w += 4, d >>>= 4), d >= 2 && (w += 2, d >>>= 2), w + d;
      }, s.prototype._zeroBits = function(u) {
        if (u === 0) return 26;
        var d = u, w = 0;
        return d & 8191 || (w += 13, d >>>= 13), d & 127 || (w += 7, d >>>= 7), d & 15 || (w += 4, d >>>= 4), d & 3 || (w += 2, d >>>= 2), d & 1 || w++, w;
      }, s.prototype.bitLength = function() {
        var u = this.words[this.length - 1], d = this._countBits(u);
        return (this.length - 1) * 26 + d;
      };
      function k(b) {
        for (var u = new Array(b.bitLength()), d = 0; d < u.length; d++) {
          var w = d / 26 | 0, m = d % 26;
          u[d] = b.words[w] >>> m & 1;
        }
        return u;
      }
      s.prototype.zeroBits = function() {
        if (this.isZero()) return 0;
        for (var u = 0, d = 0; d < this.length; d++) {
          var w = this._zeroBits(this.words[d]);
          if (u += w, w !== 26) break;
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
        for (var w = 0; w < d.length; w++)
          this.words[w] = this.words[w] & u.words[w];
        return this.length = d.length, this._strip();
      }, s.prototype.iand = function(u) {
        return n((this.negative | u.negative) === 0), this.iuand(u);
      }, s.prototype.and = function(u) {
        return this.length > u.length ? this.clone().iand(u) : u.clone().iand(this);
      }, s.prototype.uand = function(u) {
        return this.length > u.length ? this.clone().iuand(u) : u.clone().iuand(this);
      }, s.prototype.iuxor = function(u) {
        var d, w;
        this.length > u.length ? (d = this, w = u) : (d = u, w = this);
        for (var m = 0; m < w.length; m++)
          this.words[m] = d.words[m] ^ w.words[m];
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
        var d = Math.ceil(u / 26) | 0, w = u % 26;
        this._expand(d), w > 0 && d--;
        for (var m = 0; m < d; m++)
          this.words[m] = ~this.words[m] & 67108863;
        return w > 0 && (this.words[m] = ~this.words[m] & 67108863 >> 26 - w), this._strip();
      }, s.prototype.notn = function(u) {
        return this.clone().inotn(u);
      }, s.prototype.setn = function(u, d) {
        n(typeof u == "number" && u >= 0);
        var w = u / 26 | 0, m = u % 26;
        return this._expand(w + 1), d ? this.words[w] = this.words[w] | 1 << m : this.words[w] = this.words[w] & ~(1 << m), this._strip();
      }, s.prototype.iadd = function(u) {
        var d;
        if (this.negative !== 0 && u.negative === 0)
          return this.negative = 0, d = this.isub(u), this.negative ^= 1, this._normSign();
        if (this.negative === 0 && u.negative !== 0)
          return u.negative = 0, d = this.isub(u), u.negative = 1, d._normSign();
        var w, m;
        this.length > u.length ? (w = this, m = u) : (w = u, m = this);
        for (var y = 0, B = 0; B < m.length; B++)
          d = (w.words[B] | 0) + (m.words[B] | 0) + y, this.words[B] = d & 67108863, y = d >>> 26;
        for (; y !== 0 && B < w.length; B++)
          d = (w.words[B] | 0) + y, this.words[B] = d & 67108863, y = d >>> 26;
        if (this.length = w.length, y !== 0)
          this.words[this.length] = y, this.length++;
        else if (w !== this)
          for (; B < w.length; B++)
            this.words[B] = w.words[B];
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
        var w = this.cmp(u);
        if (w === 0)
          return this.negative = 0, this.length = 1, this.words[0] = 0, this;
        var m, y;
        w > 0 ? (m = this, y = u) : (m = u, y = this);
        for (var B = 0, P = 0; P < y.length; P++)
          d = (m.words[P] | 0) - (y.words[P] | 0) + B, B = d >> 26, this.words[P] = d & 67108863;
        for (; B !== 0 && P < m.length; P++)
          d = (m.words[P] | 0) + B, B = d >> 26, this.words[P] = d & 67108863;
        if (B === 0 && P < m.length && m !== this)
          for (; P < m.length; P++)
            this.words[P] = m.words[P];
        return this.length = Math.max(this.length, P), m !== this && (this.negative = 1), this._strip();
      }, s.prototype.sub = function(u) {
        return this.clone().isub(u);
      };
      function Z(b, u, d) {
        d.negative = u.negative ^ b.negative;
        var w = b.length + u.length | 0;
        d.length = w, w = w - 1 | 0;
        var m = b.words[0] | 0, y = u.words[0] | 0, B = m * y, P = B & 67108863, E = B / 67108864 | 0;
        d.words[0] = P;
        for (var f = 1; f < w; f++) {
          for (var g = E >>> 26, I = E & 67108863, L = Math.min(f, u.length - 1), H = Math.max(0, f - b.length + 1); H <= L; H++) {
            var K = f - H | 0;
            m = b.words[K] | 0, y = u.words[H] | 0, B = m * y + I, g += B / 67108864 | 0, I = B & 67108863;
          }
          d.words[f] = I | 0, E = g | 0;
        }
        return E !== 0 ? d.words[f] = E | 0 : d.length--, d._strip();
      }
      var _ = function(u, d, w) {
        var m = u.words, y = d.words, B = w.words, P = 0, E, f, g, I = m[0] | 0, L = I & 8191, H = I >>> 13, K = m[1] | 0, tt = K & 8191, st = K >>> 13, xt = m[2] | 0, dt = xt & 8191, mt = xt >>> 13, bt = m[3] | 0, ht = bt & 8191, pt = bt >>> 13, nn = m[4] | 0, Bt = nn & 8191, Dt = nn >>> 13, dn = m[5] | 0, Lt = dn & 8191, Nt = dn >>> 13, Ut = m[6] | 0, Rt = Ut & 8191, jt = Ut >>> 13, Gt = m[7] | 0, zt = Gt & 8191, a = Gt >>> 13, o = m[8] | 0, c = o & 8191, A = o >>> 13, T = m[9] | 0, j = T & 8191, Q = T >>> 13, ut = y[0] | 0, lt = ut & 8191, at = ut >>> 13, wt = y[1] | 0, ct = wt & 8191, Kt = wt >>> 13, fo = y[2] | 0, Jt = fo & 8191, Vt = fo >>> 13, go = y[3] | 0, Xt = go & 8191, $t = go >>> 13, po = y[4] | 0, te = po & 8191, ee = po >>> 13, wo = y[5] | 0, ne = wo & 8191, re = wo >>> 13, yo = y[6] | 0, ie = yo & 8191, se = yo >>> 13, Ao = y[7] | 0, oe = Ao & 8191, ae = Ao >>> 13, mo = y[8] | 0, ce = mo & 8191, ue = mo >>> 13, bo = y[9] | 0, le = bo & 8191, he = bo >>> 13;
        w.negative = u.negative ^ d.negative, w.length = 19, E = Math.imul(L, lt), f = Math.imul(L, at), f = f + Math.imul(H, lt) | 0, g = Math.imul(H, at);
        var Ii = (P + E | 0) + ((f & 8191) << 13) | 0;
        P = (g + (f >>> 13) | 0) + (Ii >>> 26) | 0, Ii &= 67108863, E = Math.imul(tt, lt), f = Math.imul(tt, at), f = f + Math.imul(st, lt) | 0, g = Math.imul(st, at), E = E + Math.imul(L, ct) | 0, f = f + Math.imul(L, Kt) | 0, f = f + Math.imul(H, ct) | 0, g = g + Math.imul(H, Kt) | 0;
        var xi = (P + E | 0) + ((f & 8191) << 13) | 0;
        P = (g + (f >>> 13) | 0) + (xi >>> 26) | 0, xi &= 67108863, E = Math.imul(dt, lt), f = Math.imul(dt, at), f = f + Math.imul(mt, lt) | 0, g = Math.imul(mt, at), E = E + Math.imul(tt, ct) | 0, f = f + Math.imul(tt, Kt) | 0, f = f + Math.imul(st, ct) | 0, g = g + Math.imul(st, Kt) | 0, E = E + Math.imul(L, Jt) | 0, f = f + Math.imul(L, Vt) | 0, f = f + Math.imul(H, Jt) | 0, g = g + Math.imul(H, Vt) | 0;
        var Bi = (P + E | 0) + ((f & 8191) << 13) | 0;
        P = (g + (f >>> 13) | 0) + (Bi >>> 26) | 0, Bi &= 67108863, E = Math.imul(ht, lt), f = Math.imul(ht, at), f = f + Math.imul(pt, lt) | 0, g = Math.imul(pt, at), E = E + Math.imul(dt, ct) | 0, f = f + Math.imul(dt, Kt) | 0, f = f + Math.imul(mt, ct) | 0, g = g + Math.imul(mt, Kt) | 0, E = E + Math.imul(tt, Jt) | 0, f = f + Math.imul(tt, Vt) | 0, f = f + Math.imul(st, Jt) | 0, g = g + Math.imul(st, Vt) | 0, E = E + Math.imul(L, Xt) | 0, f = f + Math.imul(L, $t) | 0, f = f + Math.imul(H, Xt) | 0, g = g + Math.imul(H, $t) | 0;
        var Ni = (P + E | 0) + ((f & 8191) << 13) | 0;
        P = (g + (f >>> 13) | 0) + (Ni >>> 26) | 0, Ni &= 67108863, E = Math.imul(Bt, lt), f = Math.imul(Bt, at), f = f + Math.imul(Dt, lt) | 0, g = Math.imul(Dt, at), E = E + Math.imul(ht, ct) | 0, f = f + Math.imul(ht, Kt) | 0, f = f + Math.imul(pt, ct) | 0, g = g + Math.imul(pt, Kt) | 0, E = E + Math.imul(dt, Jt) | 0, f = f + Math.imul(dt, Vt) | 0, f = f + Math.imul(mt, Jt) | 0, g = g + Math.imul(mt, Vt) | 0, E = E + Math.imul(tt, Xt) | 0, f = f + Math.imul(tt, $t) | 0, f = f + Math.imul(st, Xt) | 0, g = g + Math.imul(st, $t) | 0, E = E + Math.imul(L, te) | 0, f = f + Math.imul(L, ee) | 0, f = f + Math.imul(H, te) | 0, g = g + Math.imul(H, ee) | 0;
        var Ti = (P + E | 0) + ((f & 8191) << 13) | 0;
        P = (g + (f >>> 13) | 0) + (Ti >>> 26) | 0, Ti &= 67108863, E = Math.imul(Lt, lt), f = Math.imul(Lt, at), f = f + Math.imul(Nt, lt) | 0, g = Math.imul(Nt, at), E = E + Math.imul(Bt, ct) | 0, f = f + Math.imul(Bt, Kt) | 0, f = f + Math.imul(Dt, ct) | 0, g = g + Math.imul(Dt, Kt) | 0, E = E + Math.imul(ht, Jt) | 0, f = f + Math.imul(ht, Vt) | 0, f = f + Math.imul(pt, Jt) | 0, g = g + Math.imul(pt, Vt) | 0, E = E + Math.imul(dt, Xt) | 0, f = f + Math.imul(dt, $t) | 0, f = f + Math.imul(mt, Xt) | 0, g = g + Math.imul(mt, $t) | 0, E = E + Math.imul(tt, te) | 0, f = f + Math.imul(tt, ee) | 0, f = f + Math.imul(st, te) | 0, g = g + Math.imul(st, ee) | 0, E = E + Math.imul(L, ne) | 0, f = f + Math.imul(L, re) | 0, f = f + Math.imul(H, ne) | 0, g = g + Math.imul(H, re) | 0;
        var ki = (P + E | 0) + ((f & 8191) << 13) | 0;
        P = (g + (f >>> 13) | 0) + (ki >>> 26) | 0, ki &= 67108863, E = Math.imul(Rt, lt), f = Math.imul(Rt, at), f = f + Math.imul(jt, lt) | 0, g = Math.imul(jt, at), E = E + Math.imul(Lt, ct) | 0, f = f + Math.imul(Lt, Kt) | 0, f = f + Math.imul(Nt, ct) | 0, g = g + Math.imul(Nt, Kt) | 0, E = E + Math.imul(Bt, Jt) | 0, f = f + Math.imul(Bt, Vt) | 0, f = f + Math.imul(Dt, Jt) | 0, g = g + Math.imul(Dt, Vt) | 0, E = E + Math.imul(ht, Xt) | 0, f = f + Math.imul(ht, $t) | 0, f = f + Math.imul(pt, Xt) | 0, g = g + Math.imul(pt, $t) | 0, E = E + Math.imul(dt, te) | 0, f = f + Math.imul(dt, ee) | 0, f = f + Math.imul(mt, te) | 0, g = g + Math.imul(mt, ee) | 0, E = E + Math.imul(tt, ne) | 0, f = f + Math.imul(tt, re) | 0, f = f + Math.imul(st, ne) | 0, g = g + Math.imul(st, re) | 0, E = E + Math.imul(L, ie) | 0, f = f + Math.imul(L, se) | 0, f = f + Math.imul(H, ie) | 0, g = g + Math.imul(H, se) | 0;
        var Ci = (P + E | 0) + ((f & 8191) << 13) | 0;
        P = (g + (f >>> 13) | 0) + (Ci >>> 26) | 0, Ci &= 67108863, E = Math.imul(zt, lt), f = Math.imul(zt, at), f = f + Math.imul(a, lt) | 0, g = Math.imul(a, at), E = E + Math.imul(Rt, ct) | 0, f = f + Math.imul(Rt, Kt) | 0, f = f + Math.imul(jt, ct) | 0, g = g + Math.imul(jt, Kt) | 0, E = E + Math.imul(Lt, Jt) | 0, f = f + Math.imul(Lt, Vt) | 0, f = f + Math.imul(Nt, Jt) | 0, g = g + Math.imul(Nt, Vt) | 0, E = E + Math.imul(Bt, Xt) | 0, f = f + Math.imul(Bt, $t) | 0, f = f + Math.imul(Dt, Xt) | 0, g = g + Math.imul(Dt, $t) | 0, E = E + Math.imul(ht, te) | 0, f = f + Math.imul(ht, ee) | 0, f = f + Math.imul(pt, te) | 0, g = g + Math.imul(pt, ee) | 0, E = E + Math.imul(dt, ne) | 0, f = f + Math.imul(dt, re) | 0, f = f + Math.imul(mt, ne) | 0, g = g + Math.imul(mt, re) | 0, E = E + Math.imul(tt, ie) | 0, f = f + Math.imul(tt, se) | 0, f = f + Math.imul(st, ie) | 0, g = g + Math.imul(st, se) | 0, E = E + Math.imul(L, oe) | 0, f = f + Math.imul(L, ae) | 0, f = f + Math.imul(H, oe) | 0, g = g + Math.imul(H, ae) | 0;
        var Li = (P + E | 0) + ((f & 8191) << 13) | 0;
        P = (g + (f >>> 13) | 0) + (Li >>> 26) | 0, Li &= 67108863, E = Math.imul(c, lt), f = Math.imul(c, at), f = f + Math.imul(A, lt) | 0, g = Math.imul(A, at), E = E + Math.imul(zt, ct) | 0, f = f + Math.imul(zt, Kt) | 0, f = f + Math.imul(a, ct) | 0, g = g + Math.imul(a, Kt) | 0, E = E + Math.imul(Rt, Jt) | 0, f = f + Math.imul(Rt, Vt) | 0, f = f + Math.imul(jt, Jt) | 0, g = g + Math.imul(jt, Vt) | 0, E = E + Math.imul(Lt, Xt) | 0, f = f + Math.imul(Lt, $t) | 0, f = f + Math.imul(Nt, Xt) | 0, g = g + Math.imul(Nt, $t) | 0, E = E + Math.imul(Bt, te) | 0, f = f + Math.imul(Bt, ee) | 0, f = f + Math.imul(Dt, te) | 0, g = g + Math.imul(Dt, ee) | 0, E = E + Math.imul(ht, ne) | 0, f = f + Math.imul(ht, re) | 0, f = f + Math.imul(pt, ne) | 0, g = g + Math.imul(pt, re) | 0, E = E + Math.imul(dt, ie) | 0, f = f + Math.imul(dt, se) | 0, f = f + Math.imul(mt, ie) | 0, g = g + Math.imul(mt, se) | 0, E = E + Math.imul(tt, oe) | 0, f = f + Math.imul(tt, ae) | 0, f = f + Math.imul(st, oe) | 0, g = g + Math.imul(st, ae) | 0, E = E + Math.imul(L, ce) | 0, f = f + Math.imul(L, ue) | 0, f = f + Math.imul(H, ce) | 0, g = g + Math.imul(H, ue) | 0;
        var Ri = (P + E | 0) + ((f & 8191) << 13) | 0;
        P = (g + (f >>> 13) | 0) + (Ri >>> 26) | 0, Ri &= 67108863, E = Math.imul(j, lt), f = Math.imul(j, at), f = f + Math.imul(Q, lt) | 0, g = Math.imul(Q, at), E = E + Math.imul(c, ct) | 0, f = f + Math.imul(c, Kt) | 0, f = f + Math.imul(A, ct) | 0, g = g + Math.imul(A, Kt) | 0, E = E + Math.imul(zt, Jt) | 0, f = f + Math.imul(zt, Vt) | 0, f = f + Math.imul(a, Jt) | 0, g = g + Math.imul(a, Vt) | 0, E = E + Math.imul(Rt, Xt) | 0, f = f + Math.imul(Rt, $t) | 0, f = f + Math.imul(jt, Xt) | 0, g = g + Math.imul(jt, $t) | 0, E = E + Math.imul(Lt, te) | 0, f = f + Math.imul(Lt, ee) | 0, f = f + Math.imul(Nt, te) | 0, g = g + Math.imul(Nt, ee) | 0, E = E + Math.imul(Bt, ne) | 0, f = f + Math.imul(Bt, re) | 0, f = f + Math.imul(Dt, ne) | 0, g = g + Math.imul(Dt, re) | 0, E = E + Math.imul(ht, ie) | 0, f = f + Math.imul(ht, se) | 0, f = f + Math.imul(pt, ie) | 0, g = g + Math.imul(pt, se) | 0, E = E + Math.imul(dt, oe) | 0, f = f + Math.imul(dt, ae) | 0, f = f + Math.imul(mt, oe) | 0, g = g + Math.imul(mt, ae) | 0, E = E + Math.imul(tt, ce) | 0, f = f + Math.imul(tt, ue) | 0, f = f + Math.imul(st, ce) | 0, g = g + Math.imul(st, ue) | 0, E = E + Math.imul(L, le) | 0, f = f + Math.imul(L, he) | 0, f = f + Math.imul(H, le) | 0, g = g + Math.imul(H, he) | 0;
        var Di = (P + E | 0) + ((f & 8191) << 13) | 0;
        P = (g + (f >>> 13) | 0) + (Di >>> 26) | 0, Di &= 67108863, E = Math.imul(j, ct), f = Math.imul(j, Kt), f = f + Math.imul(Q, ct) | 0, g = Math.imul(Q, Kt), E = E + Math.imul(c, Jt) | 0, f = f + Math.imul(c, Vt) | 0, f = f + Math.imul(A, Jt) | 0, g = g + Math.imul(A, Vt) | 0, E = E + Math.imul(zt, Xt) | 0, f = f + Math.imul(zt, $t) | 0, f = f + Math.imul(a, Xt) | 0, g = g + Math.imul(a, $t) | 0, E = E + Math.imul(Rt, te) | 0, f = f + Math.imul(Rt, ee) | 0, f = f + Math.imul(jt, te) | 0, g = g + Math.imul(jt, ee) | 0, E = E + Math.imul(Lt, ne) | 0, f = f + Math.imul(Lt, re) | 0, f = f + Math.imul(Nt, ne) | 0, g = g + Math.imul(Nt, re) | 0, E = E + Math.imul(Bt, ie) | 0, f = f + Math.imul(Bt, se) | 0, f = f + Math.imul(Dt, ie) | 0, g = g + Math.imul(Dt, se) | 0, E = E + Math.imul(ht, oe) | 0, f = f + Math.imul(ht, ae) | 0, f = f + Math.imul(pt, oe) | 0, g = g + Math.imul(pt, ae) | 0, E = E + Math.imul(dt, ce) | 0, f = f + Math.imul(dt, ue) | 0, f = f + Math.imul(mt, ce) | 0, g = g + Math.imul(mt, ue) | 0, E = E + Math.imul(tt, le) | 0, f = f + Math.imul(tt, he) | 0, f = f + Math.imul(st, le) | 0, g = g + Math.imul(st, he) | 0;
        var Oi = (P + E | 0) + ((f & 8191) << 13) | 0;
        P = (g + (f >>> 13) | 0) + (Oi >>> 26) | 0, Oi &= 67108863, E = Math.imul(j, Jt), f = Math.imul(j, Vt), f = f + Math.imul(Q, Jt) | 0, g = Math.imul(Q, Vt), E = E + Math.imul(c, Xt) | 0, f = f + Math.imul(c, $t) | 0, f = f + Math.imul(A, Xt) | 0, g = g + Math.imul(A, $t) | 0, E = E + Math.imul(zt, te) | 0, f = f + Math.imul(zt, ee) | 0, f = f + Math.imul(a, te) | 0, g = g + Math.imul(a, ee) | 0, E = E + Math.imul(Rt, ne) | 0, f = f + Math.imul(Rt, re) | 0, f = f + Math.imul(jt, ne) | 0, g = g + Math.imul(jt, re) | 0, E = E + Math.imul(Lt, ie) | 0, f = f + Math.imul(Lt, se) | 0, f = f + Math.imul(Nt, ie) | 0, g = g + Math.imul(Nt, se) | 0, E = E + Math.imul(Bt, oe) | 0, f = f + Math.imul(Bt, ae) | 0, f = f + Math.imul(Dt, oe) | 0, g = g + Math.imul(Dt, ae) | 0, E = E + Math.imul(ht, ce) | 0, f = f + Math.imul(ht, ue) | 0, f = f + Math.imul(pt, ce) | 0, g = g + Math.imul(pt, ue) | 0, E = E + Math.imul(dt, le) | 0, f = f + Math.imul(dt, he) | 0, f = f + Math.imul(mt, le) | 0, g = g + Math.imul(mt, he) | 0;
        var Ui = (P + E | 0) + ((f & 8191) << 13) | 0;
        P = (g + (f >>> 13) | 0) + (Ui >>> 26) | 0, Ui &= 67108863, E = Math.imul(j, Xt), f = Math.imul(j, $t), f = f + Math.imul(Q, Xt) | 0, g = Math.imul(Q, $t), E = E + Math.imul(c, te) | 0, f = f + Math.imul(c, ee) | 0, f = f + Math.imul(A, te) | 0, g = g + Math.imul(A, ee) | 0, E = E + Math.imul(zt, ne) | 0, f = f + Math.imul(zt, re) | 0, f = f + Math.imul(a, ne) | 0, g = g + Math.imul(a, re) | 0, E = E + Math.imul(Rt, ie) | 0, f = f + Math.imul(Rt, se) | 0, f = f + Math.imul(jt, ie) | 0, g = g + Math.imul(jt, se) | 0, E = E + Math.imul(Lt, oe) | 0, f = f + Math.imul(Lt, ae) | 0, f = f + Math.imul(Nt, oe) | 0, g = g + Math.imul(Nt, ae) | 0, E = E + Math.imul(Bt, ce) | 0, f = f + Math.imul(Bt, ue) | 0, f = f + Math.imul(Dt, ce) | 0, g = g + Math.imul(Dt, ue) | 0, E = E + Math.imul(ht, le) | 0, f = f + Math.imul(ht, he) | 0, f = f + Math.imul(pt, le) | 0, g = g + Math.imul(pt, he) | 0;
        var ji = (P + E | 0) + ((f & 8191) << 13) | 0;
        P = (g + (f >>> 13) | 0) + (ji >>> 26) | 0, ji &= 67108863, E = Math.imul(j, te), f = Math.imul(j, ee), f = f + Math.imul(Q, te) | 0, g = Math.imul(Q, ee), E = E + Math.imul(c, ne) | 0, f = f + Math.imul(c, re) | 0, f = f + Math.imul(A, ne) | 0, g = g + Math.imul(A, re) | 0, E = E + Math.imul(zt, ie) | 0, f = f + Math.imul(zt, se) | 0, f = f + Math.imul(a, ie) | 0, g = g + Math.imul(a, se) | 0, E = E + Math.imul(Rt, oe) | 0, f = f + Math.imul(Rt, ae) | 0, f = f + Math.imul(jt, oe) | 0, g = g + Math.imul(jt, ae) | 0, E = E + Math.imul(Lt, ce) | 0, f = f + Math.imul(Lt, ue) | 0, f = f + Math.imul(Nt, ce) | 0, g = g + Math.imul(Nt, ue) | 0, E = E + Math.imul(Bt, le) | 0, f = f + Math.imul(Bt, he) | 0, f = f + Math.imul(Dt, le) | 0, g = g + Math.imul(Dt, he) | 0;
        var zi = (P + E | 0) + ((f & 8191) << 13) | 0;
        P = (g + (f >>> 13) | 0) + (zi >>> 26) | 0, zi &= 67108863, E = Math.imul(j, ne), f = Math.imul(j, re), f = f + Math.imul(Q, ne) | 0, g = Math.imul(Q, re), E = E + Math.imul(c, ie) | 0, f = f + Math.imul(c, se) | 0, f = f + Math.imul(A, ie) | 0, g = g + Math.imul(A, se) | 0, E = E + Math.imul(zt, oe) | 0, f = f + Math.imul(zt, ae) | 0, f = f + Math.imul(a, oe) | 0, g = g + Math.imul(a, ae) | 0, E = E + Math.imul(Rt, ce) | 0, f = f + Math.imul(Rt, ue) | 0, f = f + Math.imul(jt, ce) | 0, g = g + Math.imul(jt, ue) | 0, E = E + Math.imul(Lt, le) | 0, f = f + Math.imul(Lt, he) | 0, f = f + Math.imul(Nt, le) | 0, g = g + Math.imul(Nt, he) | 0;
        var Pi = (P + E | 0) + ((f & 8191) << 13) | 0;
        P = (g + (f >>> 13) | 0) + (Pi >>> 26) | 0, Pi &= 67108863, E = Math.imul(j, ie), f = Math.imul(j, se), f = f + Math.imul(Q, ie) | 0, g = Math.imul(Q, se), E = E + Math.imul(c, oe) | 0, f = f + Math.imul(c, ae) | 0, f = f + Math.imul(A, oe) | 0, g = g + Math.imul(A, ae) | 0, E = E + Math.imul(zt, ce) | 0, f = f + Math.imul(zt, ue) | 0, f = f + Math.imul(a, ce) | 0, g = g + Math.imul(a, ue) | 0, E = E + Math.imul(Rt, le) | 0, f = f + Math.imul(Rt, he) | 0, f = f + Math.imul(jt, le) | 0, g = g + Math.imul(jt, he) | 0;
        var Fi = (P + E | 0) + ((f & 8191) << 13) | 0;
        P = (g + (f >>> 13) | 0) + (Fi >>> 26) | 0, Fi &= 67108863, E = Math.imul(j, oe), f = Math.imul(j, ae), f = f + Math.imul(Q, oe) | 0, g = Math.imul(Q, ae), E = E + Math.imul(c, ce) | 0, f = f + Math.imul(c, ue) | 0, f = f + Math.imul(A, ce) | 0, g = g + Math.imul(A, ue) | 0, E = E + Math.imul(zt, le) | 0, f = f + Math.imul(zt, he) | 0, f = f + Math.imul(a, le) | 0, g = g + Math.imul(a, he) | 0;
        var _i = (P + E | 0) + ((f & 8191) << 13) | 0;
        P = (g + (f >>> 13) | 0) + (_i >>> 26) | 0, _i &= 67108863, E = Math.imul(j, ce), f = Math.imul(j, ue), f = f + Math.imul(Q, ce) | 0, g = Math.imul(Q, ue), E = E + Math.imul(c, le) | 0, f = f + Math.imul(c, he) | 0, f = f + Math.imul(A, le) | 0, g = g + Math.imul(A, he) | 0;
        var Wi = (P + E | 0) + ((f & 8191) << 13) | 0;
        P = (g + (f >>> 13) | 0) + (Wi >>> 26) | 0, Wi &= 67108863, E = Math.imul(j, le), f = Math.imul(j, he), f = f + Math.imul(Q, le) | 0, g = Math.imul(Q, he);
        var qi = (P + E | 0) + ((f & 8191) << 13) | 0;
        return P = (g + (f >>> 13) | 0) + (qi >>> 26) | 0, qi &= 67108863, B[0] = Ii, B[1] = xi, B[2] = Bi, B[3] = Ni, B[4] = Ti, B[5] = ki, B[6] = Ci, B[7] = Li, B[8] = Ri, B[9] = Di, B[10] = Oi, B[11] = Ui, B[12] = ji, B[13] = zi, B[14] = Pi, B[15] = Fi, B[16] = _i, B[17] = Wi, B[18] = qi, P !== 0 && (B[19] = P, w.length++), w;
      };
      Math.imul || (_ = Z);
      function q(b, u, d) {
        d.negative = u.negative ^ b.negative, d.length = b.length + u.length;
        for (var w = 0, m = 0, y = 0; y < d.length - 1; y++) {
          var B = m;
          m = 0;
          for (var P = w & 67108863, E = Math.min(y, u.length - 1), f = Math.max(0, y - b.length + 1); f <= E; f++) {
            var g = y - f, I = b.words[g] | 0, L = u.words[f] | 0, H = I * L, K = H & 67108863;
            B = B + (H / 67108864 | 0) | 0, K = K + P | 0, P = K & 67108863, B = B + (K >>> 26) | 0, m += B >>> 26, B &= 67108863;
          }
          d.words[y] = P, w = B, B = m;
        }
        return w !== 0 ? d.words[y] = w : d.length--, d._strip();
      }
      function V(b, u, d) {
        return q(b, u, d);
      }
      s.prototype.mulTo = function(u, d) {
        var w, m = this.length + u.length;
        return this.length === 10 && u.length === 10 ? w = _(this, u, d) : m < 63 ? w = Z(this, u, d) : m < 1024 ? w = q(this, u, d) : w = V(this, u, d), w;
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
        for (var w = 0, m = 0; m < this.length; m++) {
          var y = (this.words[m] | 0) * u, B = (y & 67108863) + (w & 67108863);
          w >>= 26, w += y / 67108864 | 0, w += B >>> 26, this.words[m] = B & 67108863;
        }
        return w !== 0 && (this.words[m] = w, this.length++), d ? this.ineg() : this;
      }, s.prototype.muln = function(u) {
        return this.clone().imuln(u);
      }, s.prototype.sqr = function() {
        return this.mul(this);
      }, s.prototype.isqr = function() {
        return this.imul(this.clone());
      }, s.prototype.pow = function(u) {
        var d = k(u);
        if (d.length === 0) return new s(1);
        for (var w = this, m = 0; m < d.length && d[m] === 0; m++, w = w.sqr())
          ;
        if (++m < d.length)
          for (var y = w.sqr(); m < d.length; m++, y = y.sqr())
            d[m] !== 0 && (w = w.mul(y));
        return w;
      }, s.prototype.iushln = function(u) {
        n(typeof u == "number" && u >= 0);
        var d = u % 26, w = (u - d) / 26, m = 67108863 >>> 26 - d << 26 - d, y;
        if (d !== 0) {
          var B = 0;
          for (y = 0; y < this.length; y++) {
            var P = this.words[y] & m, E = (this.words[y] | 0) - P << d;
            this.words[y] = E | B, B = P >>> 26 - d;
          }
          B && (this.words[y] = B, this.length++);
        }
        if (w !== 0) {
          for (y = this.length - 1; y >= 0; y--)
            this.words[y + w] = this.words[y];
          for (y = 0; y < w; y++)
            this.words[y] = 0;
          this.length += w;
        }
        return this._strip();
      }, s.prototype.ishln = function(u) {
        return n(this.negative === 0), this.iushln(u);
      }, s.prototype.iushrn = function(u, d, w) {
        n(typeof u == "number" && u >= 0);
        var m;
        d ? m = (d - d % 26) / 26 : m = 0;
        var y = u % 26, B = Math.min((u - y) / 26, this.length), P = 67108863 ^ 67108863 >>> y << y, E = w;
        if (m -= B, m = Math.max(0, m), E) {
          for (var f = 0; f < B; f++)
            E.words[f] = this.words[f];
          E.length = B;
        }
        if (B !== 0) if (this.length > B)
          for (this.length -= B, f = 0; f < this.length; f++)
            this.words[f] = this.words[f + B];
        else
          this.words[0] = 0, this.length = 1;
        var g = 0;
        for (f = this.length - 1; f >= 0 && (g !== 0 || f >= m); f--) {
          var I = this.words[f] | 0;
          this.words[f] = g << 26 - y | I >>> y, g = I & P;
        }
        return E && g !== 0 && (E.words[E.length++] = g), this.length === 0 && (this.words[0] = 0, this.length = 1), this._strip();
      }, s.prototype.ishrn = function(u, d, w) {
        return n(this.negative === 0), this.iushrn(u, d, w);
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
        var d = u % 26, w = (u - d) / 26, m = 1 << d;
        if (this.length <= w) return !1;
        var y = this.words[w];
        return !!(y & m);
      }, s.prototype.imaskn = function(u) {
        n(typeof u == "number" && u >= 0);
        var d = u % 26, w = (u - d) / 26;
        if (n(this.negative === 0, "imaskn works only with positive numbers"), this.length <= w)
          return this;
        if (d !== 0 && w++, this.length = Math.min(w, this.length), d !== 0) {
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
      }, s.prototype._ishlnsubmul = function(u, d, w) {
        var m = u.length + w, y;
        this._expand(m);
        var B, P = 0;
        for (y = 0; y < u.length; y++) {
          B = (this.words[y + w] | 0) + P;
          var E = (u.words[y] | 0) * d;
          B -= E & 67108863, P = (B >> 26) - (E / 67108864 | 0), this.words[y + w] = B & 67108863;
        }
        for (; y < this.length - w; y++)
          B = (this.words[y + w] | 0) + P, P = B >> 26, this.words[y + w] = B & 67108863;
        if (P === 0) return this._strip();
        for (n(P === -1), P = 0, y = 0; y < this.length; y++)
          B = -(this.words[y] | 0) + P, P = B >> 26, this.words[y] = B & 67108863;
        return this.negative = 1, this._strip();
      }, s.prototype._wordDiv = function(u, d) {
        var w = this.length - u.length, m = this.clone(), y = u, B = y.words[y.length - 1] | 0, P = this._countBits(B);
        w = 26 - P, w !== 0 && (y = y.ushln(w), m.iushln(w), B = y.words[y.length - 1] | 0);
        var E = m.length - y.length, f;
        if (d !== "mod") {
          f = new s(null), f.length = E + 1, f.words = new Array(f.length);
          for (var g = 0; g < f.length; g++)
            f.words[g] = 0;
        }
        var I = m.clone()._ishlnsubmul(y, 1, E);
        I.negative === 0 && (m = I, f && (f.words[E] = 1));
        for (var L = E - 1; L >= 0; L--) {
          var H = (m.words[y.length + L] | 0) * 67108864 + (m.words[y.length + L - 1] | 0);
          for (H = Math.min(H / B | 0, 67108863), m._ishlnsubmul(y, H, L); m.negative !== 0; )
            H--, m.negative = 0, m._ishlnsubmul(y, 1, L), m.isZero() || (m.negative ^= 1);
          f && (f.words[L] = H);
        }
        return f && f._strip(), m._strip(), d !== "div" && w !== 0 && m.iushrn(w), {
          div: f || null,
          mod: m
        };
      }, s.prototype.divmod = function(u, d, w) {
        if (n(!u.isZero()), this.isZero())
          return {
            div: new s(0),
            mod: new s(0)
          };
        var m, y, B;
        return this.negative !== 0 && u.negative === 0 ? (B = this.neg().divmod(u, d), d !== "mod" && (m = B.div.neg()), d !== "div" && (y = B.mod.neg(), w && y.negative !== 0 && y.iadd(u)), {
          div: m,
          mod: y
        }) : this.negative === 0 && u.negative !== 0 ? (B = this.divmod(u.neg(), d), d !== "mod" && (m = B.div.neg()), {
          div: m,
          mod: B.mod
        }) : this.negative & u.negative ? (B = this.neg().divmod(u.neg(), d), d !== "div" && (y = B.mod.neg(), w && y.negative !== 0 && y.isub(u)), {
          div: B.div,
          mod: y
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
        var w = d.div.negative !== 0 ? d.mod.isub(u) : d.mod, m = u.ushrn(1), y = u.andln(1), B = w.cmp(m);
        return B < 0 || y === 1 && B === 0 ? d.div : d.div.negative !== 0 ? d.div.isubn(1) : d.div.iaddn(1);
      }, s.prototype.modrn = function(u) {
        var d = u < 0;
        d && (u = -u), n(u <= 67108863);
        for (var w = (1 << 26) % u, m = 0, y = this.length - 1; y >= 0; y--)
          m = (w * m + (this.words[y] | 0)) % u;
        return d ? -m : m;
      }, s.prototype.modn = function(u) {
        return this.modrn(u);
      }, s.prototype.idivn = function(u) {
        var d = u < 0;
        d && (u = -u), n(u <= 67108863);
        for (var w = 0, m = this.length - 1; m >= 0; m--) {
          var y = (this.words[m] | 0) + w * 67108864;
          this.words[m] = y / u | 0, w = y % u;
        }
        return this._strip(), d ? this.ineg() : this;
      }, s.prototype.divn = function(u) {
        return this.clone().idivn(u);
      }, s.prototype.egcd = function(u) {
        n(u.negative === 0), n(!u.isZero());
        var d = this, w = u.clone();
        d.negative !== 0 ? d = d.umod(u) : d = d.clone();
        for (var m = new s(1), y = new s(0), B = new s(0), P = new s(1), E = 0; d.isEven() && w.isEven(); )
          d.iushrn(1), w.iushrn(1), ++E;
        for (var f = w.clone(), g = d.clone(); !d.isZero(); ) {
          for (var I = 0, L = 1; !(d.words[0] & L) && I < 26; ++I, L <<= 1) ;
          if (I > 0)
            for (d.iushrn(I); I-- > 0; )
              (m.isOdd() || y.isOdd()) && (m.iadd(f), y.isub(g)), m.iushrn(1), y.iushrn(1);
          for (var H = 0, K = 1; !(w.words[0] & K) && H < 26; ++H, K <<= 1) ;
          if (H > 0)
            for (w.iushrn(H); H-- > 0; )
              (B.isOdd() || P.isOdd()) && (B.iadd(f), P.isub(g)), B.iushrn(1), P.iushrn(1);
          d.cmp(w) >= 0 ? (d.isub(w), m.isub(B), y.isub(P)) : (w.isub(d), B.isub(m), P.isub(y));
        }
        return {
          a: B,
          b: P,
          gcd: w.iushln(E)
        };
      }, s.prototype._invmp = function(u) {
        n(u.negative === 0), n(!u.isZero());
        var d = this, w = u.clone();
        d.negative !== 0 ? d = d.umod(u) : d = d.clone();
        for (var m = new s(1), y = new s(0), B = w.clone(); d.cmpn(1) > 0 && w.cmpn(1) > 0; ) {
          for (var P = 0, E = 1; !(d.words[0] & E) && P < 26; ++P, E <<= 1) ;
          if (P > 0)
            for (d.iushrn(P); P-- > 0; )
              m.isOdd() && m.iadd(B), m.iushrn(1);
          for (var f = 0, g = 1; !(w.words[0] & g) && f < 26; ++f, g <<= 1) ;
          if (f > 0)
            for (w.iushrn(f); f-- > 0; )
              y.isOdd() && y.iadd(B), y.iushrn(1);
          d.cmp(w) >= 0 ? (d.isub(w), m.isub(y)) : (w.isub(d), y.isub(m));
        }
        var I;
        return d.cmpn(1) === 0 ? I = m : I = y, I.cmpn(0) < 0 && I.iadd(u), I;
      }, s.prototype.gcd = function(u) {
        if (this.isZero()) return u.abs();
        if (u.isZero()) return this.abs();
        var d = this.clone(), w = u.clone();
        d.negative = 0, w.negative = 0;
        for (var m = 0; d.isEven() && w.isEven(); m++)
          d.iushrn(1), w.iushrn(1);
        do {
          for (; d.isEven(); )
            d.iushrn(1);
          for (; w.isEven(); )
            w.iushrn(1);
          var y = d.cmp(w);
          if (y < 0) {
            var B = d;
            d = w, w = B;
          } else if (y === 0 || w.cmpn(1) === 0)
            break;
          d.isub(w);
        } while (!0);
        return w.iushln(m);
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
        var d = u % 26, w = (u - d) / 26, m = 1 << d;
        if (this.length <= w)
          return this._expand(w + 1), this.words[w] |= m, this;
        for (var y = m, B = w; y !== 0 && B < this.length; B++) {
          var P = this.words[B] | 0;
          P += y, y = P >>> 26, P &= 67108863, this.words[B] = P;
        }
        return y !== 0 && (this.words[B] = y, this.length++), this;
      }, s.prototype.isZero = function() {
        return this.length === 1 && this.words[0] === 0;
      }, s.prototype.cmpn = function(u) {
        var d = u < 0;
        if (this.negative !== 0 && !d) return -1;
        if (this.negative === 0 && d) return 1;
        this._strip();
        var w;
        if (this.length > 1)
          w = 1;
        else {
          d && (u = -u), n(u <= 67108863, "Number is too big");
          var m = this.words[0] | 0;
          w = m === u ? 0 : m < u ? -1 : 1;
        }
        return this.negative !== 0 ? -w | 0 : w;
      }, s.prototype.cmp = function(u) {
        if (this.negative !== 0 && u.negative === 0) return -1;
        if (this.negative === 0 && u.negative !== 0) return 1;
        var d = this.ucmp(u);
        return this.negative !== 0 ? -d | 0 : d;
      }, s.prototype.ucmp = function(u) {
        if (this.length > u.length) return 1;
        if (this.length < u.length) return -1;
        for (var d = 0, w = this.length - 1; w >= 0; w--) {
          var m = this.words[w] | 0, y = u.words[w] | 0;
          if (m !== y) {
            m < y ? d = -1 : m > y && (d = 1);
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
        return new O(u);
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
      var J = {
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
        var d = u, w;
        do
          this.split(d, this.tmp), d = this.imulK(d), d = d.iadd(this.tmp), w = d.bitLength();
        while (w > this.n);
        var m = w < this.n ? -1 : d.ucmp(this.p);
        return m === 0 ? (d.words[0] = 0, d.length = 1) : m > 0 ? d.isub(this.p) : d.strip !== void 0 ? d.strip() : d._strip(), d;
      }, X.prototype.split = function(u, d) {
        u.iushrn(this.n, 0, d);
      }, X.prototype.imulK = function(u) {
        return u.imul(this.k);
      };
      function et() {
        X.call(
          this,
          "k256",
          "ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffe fffffc2f"
        );
      }
      i(et, X), et.prototype.split = function(u, d) {
        for (var w = 4194303, m = Math.min(u.length, 9), y = 0; y < m; y++)
          d.words[y] = u.words[y];
        if (d.length = m, u.length <= 9) {
          u.words[0] = 0, u.length = 1;
          return;
        }
        var B = u.words[9];
        for (d.words[d.length++] = B & w, y = 10; y < u.length; y++) {
          var P = u.words[y] | 0;
          u.words[y - 10] = (P & w) << 4 | B >>> 22, B = P;
        }
        B >>>= 22, u.words[y - 10] = B, B === 0 && u.length > 10 ? u.length -= 10 : u.length -= 9;
      }, et.prototype.imulK = function(u) {
        u.words[u.length] = 0, u.words[u.length + 1] = 0, u.length += 2;
        for (var d = 0, w = 0; w < u.length; w++) {
          var m = u.words[w] | 0;
          d += m * 977, u.words[w] = d & 67108863, d = m * 64 + (d / 67108864 | 0);
        }
        return u.words[u.length - 1] === 0 && (u.length--, u.words[u.length - 1] === 0 && u.length--), u;
      };
      function N() {
        X.call(
          this,
          "p224",
          "ffffffff ffffffff ffffffff ffffffff 00000000 00000000 00000001"
        );
      }
      i(N, X);
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
        for (var d = 0, w = 0; w < u.length; w++) {
          var m = (u.words[w] | 0) * 19 + d, y = m & 67108863;
          m >>>= 26, u.words[w] = y, d = m;
        }
        return d !== 0 && (u.words[u.length++] = d), u;
      }, s._prime = function(u) {
        if (J[u]) return J[u];
        var d;
        if (u === "k256")
          d = new et();
        else if (u === "p224")
          d = new N();
        else if (u === "p192")
          d = new M();
        else if (u === "p25519")
          d = new x();
        else
          throw new Error("Unknown prime " + u);
        return J[u] = d, d;
      };
      function O(b) {
        if (typeof b == "string") {
          var u = s._prime(b);
          this.m = u.p, this.prime = u;
        } else
          n(b.gtn(1), "modulus must be greater than 1"), this.m = b, this.prime = null;
      }
      O.prototype._verify1 = function(u) {
        n(u.negative === 0, "red works only with positives"), n(u.red, "red works only with red numbers");
      }, O.prototype._verify2 = function(u, d) {
        n((u.negative | d.negative) === 0, "red works only with positives"), n(
          u.red && u.red === d.red,
          "red works only with red numbers"
        );
      }, O.prototype.imod = function(u) {
        return this.prime ? this.prime.ireduce(u)._forceRed(this) : (S(u, u.umod(this.m)._forceRed(this)), u);
      }, O.prototype.neg = function(u) {
        return u.isZero() ? u.clone() : this.m.sub(u)._forceRed(this);
      }, O.prototype.add = function(u, d) {
        this._verify2(u, d);
        var w = u.add(d);
        return w.cmp(this.m) >= 0 && w.isub(this.m), w._forceRed(this);
      }, O.prototype.iadd = function(u, d) {
        this._verify2(u, d);
        var w = u.iadd(d);
        return w.cmp(this.m) >= 0 && w.isub(this.m), w;
      }, O.prototype.sub = function(u, d) {
        this._verify2(u, d);
        var w = u.sub(d);
        return w.cmpn(0) < 0 && w.iadd(this.m), w._forceRed(this);
      }, O.prototype.isub = function(u, d) {
        this._verify2(u, d);
        var w = u.isub(d);
        return w.cmpn(0) < 0 && w.iadd(this.m), w;
      }, O.prototype.shl = function(u, d) {
        return this._verify1(u), this.imod(u.ushln(d));
      }, O.prototype.imul = function(u, d) {
        return this._verify2(u, d), this.imod(u.imul(d));
      }, O.prototype.mul = function(u, d) {
        return this._verify2(u, d), this.imod(u.mul(d));
      }, O.prototype.isqr = function(u) {
        return this.imul(u, u.clone());
      }, O.prototype.sqr = function(u) {
        return this.mul(u, u);
      }, O.prototype.sqrt = function(u) {
        if (u.isZero()) return u.clone();
        var d = this.m.andln(3);
        if (n(d % 2 === 1), d === 3) {
          var w = this.m.add(new s(1)).iushrn(2);
          return this.pow(u, w);
        }
        for (var m = this.m.subn(1), y = 0; !m.isZero() && m.andln(1) === 0; )
          y++, m.iushrn(1);
        n(!m.isZero());
        var B = new s(1).toRed(this), P = B.redNeg(), E = this.m.subn(1).iushrn(1), f = this.m.bitLength();
        for (f = new s(2 * f * f).toRed(this); this.pow(f, E).cmp(P) !== 0; )
          f.redIAdd(P);
        for (var g = this.pow(f, m), I = this.pow(u, m.addn(1).iushrn(1)), L = this.pow(u, m), H = y; L.cmp(B) !== 0; ) {
          for (var K = L, tt = 0; K.cmp(B) !== 0; tt++)
            K = K.redSqr();
          n(tt < H);
          var st = this.pow(g, new s(1).iushln(H - tt - 1));
          I = I.redMul(st), g = st.redSqr(), L = L.redMul(g), H = tt;
        }
        return I;
      }, O.prototype.invm = function(u) {
        var d = u._invmp(this.m);
        return d.negative !== 0 ? (d.negative = 0, this.imod(d).redNeg()) : this.imod(d);
      }, O.prototype.pow = function(u, d) {
        if (d.isZero()) return new s(1).toRed(this);
        if (d.cmpn(1) === 0) return u.clone();
        var w = 4, m = new Array(1 << w);
        m[0] = new s(1).toRed(this), m[1] = u;
        for (var y = 2; y < m.length; y++)
          m[y] = this.mul(m[y - 1], u);
        var B = m[0], P = 0, E = 0, f = d.bitLength() % 26;
        for (f === 0 && (f = 26), y = d.length - 1; y >= 0; y--) {
          for (var g = d.words[y], I = f - 1; I >= 0; I--) {
            var L = g >> I & 1;
            if (B !== m[0] && (B = this.sqr(B)), L === 0 && P === 0) {
              E = 0;
              continue;
            }
            P <<= 1, P |= L, E++, !(E !== w && (y !== 0 || I !== 0)) && (B = this.mul(B, m[P]), E = 0, P = 0);
          }
          f = 26;
        }
        return B;
      }, O.prototype.convertTo = function(u) {
        var d = u.umod(this.m);
        return d === u ? d.clone() : d;
      }, O.prototype.convertFrom = function(u) {
        var d = u.clone();
        return d.red = null, d;
      }, s.mont = function(u) {
        return new R(u);
      };
      function R(b) {
        O.call(this, b), this.shift = this.m.bitLength(), this.shift % 26 !== 0 && (this.shift += 26 - this.shift % 26), this.r = new s(1).iushln(this.shift), this.r2 = this.imod(this.r.sqr()), this.rinv = this.r._invmp(this.m), this.minv = this.rinv.mul(this.r).isubn(1).div(this.m), this.minv = this.minv.umod(this.r), this.minv = this.r.sub(this.minv);
      }
      i(R, O), R.prototype.convertTo = function(u) {
        return this.imod(u.ushln(this.shift));
      }, R.prototype.convertFrom = function(u) {
        var d = this.imod(u.mul(this.rinv));
        return d.red = null, d;
      }, R.prototype.imul = function(u, d) {
        if (u.isZero() || d.isZero())
          return u.words[0] = 0, u.length = 1, u;
        var w = u.imul(d), m = w.maskn(this.shift).mul(this.minv).imaskn(this.shift).mul(this.m), y = w.isub(m).iushrn(this.shift), B = y;
        return y.cmp(this.m) >= 0 ? B = y.isub(this.m) : y.cmpn(0) < 0 && (B = y.iadd(this.m)), B._forceRed(this);
      }, R.prototype.mul = function(u, d) {
        if (u.isZero() || d.isZero()) return new s(0)._forceRed(this);
        var w = u.mul(d), m = w.maskn(this.shift).mul(this.minv).imaskn(this.shift).mul(this.m), y = w.isub(m).iushrn(this.shift), B = y;
        return y.cmp(this.m) >= 0 ? B = y.isub(this.m) : y.cmpn(0) < 0 && (B = y.iadd(this.m)), B._forceRed(this);
      }, R.prototype.invm = function(u) {
        var d = this.imod(u._invmp(this.m).mul(this.r2));
        return d._forceRed(this);
      };
    })(r, wh);
  }(Yr)), Yr.exports;
}
var yh = rc();
const Ho = /* @__PURE__ */ Tr(yh);
var Fr = { exports: {} };
/*! safe-buffer. MIT License. Feross Aboukhadijeh <https://feross.org/opensource> */
var Zo;
function Ah() {
  return Zo || (Zo = 1, function(r, t) {
    var e = Ks(), n = e.Buffer;
    function i(l, h) {
      for (var p in l)
        h[p] = l[p];
    }
    n.from && n.alloc && n.allocUnsafe && n.allocUnsafeSlow ? r.exports = e : (i(e, t), t.Buffer = s);
    function s(l, h, p) {
      return n(l, h, p);
    }
    s.prototype = Object.create(n.prototype), i(n, s), s.from = function(l, h, p) {
      if (typeof l == "number")
        throw new TypeError("Argument must not be a number");
      return n(l, h, p);
    }, s.alloc = function(l, h, p) {
      if (typeof l != "number")
        throw new TypeError("Argument must be a number");
      var v = n(l);
      return h !== void 0 ? typeof p == "string" ? v.fill(h, p) : v.fill(h) : v.fill(0), v;
    }, s.allocUnsafe = function(l) {
      if (typeof l != "number")
        throw new TypeError("Argument must be a number");
      return n(l);
    }, s.allocUnsafeSlow = function(l) {
      if (typeof l != "number")
        throw new TypeError("Argument must be a number");
      return e.SlowBuffer(l);
    };
  }(Fr, Fr.exports)), Fr.exports;
}
var os, Yo;
function mh() {
  if (Yo) return os;
  Yo = 1;
  var r = Ah().Buffer;
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
    var p = e.length, v = e.charAt(0), S = Math.log(p) / Math.log(256), C = Math.log(256) / Math.log(p);
    function F(D) {
      if ((Array.isArray(D) || D instanceof Uint8Array) && (D = r.from(D)), !r.isBuffer(D))
        throw new TypeError("Expected Buffer");
      if (D.length === 0)
        return "";
      for (var k = 0, Z = 0, _ = 0, q = D.length; _ !== q && D[_] === 0; )
        _++, k++;
      for (var V = (q - _) * C + 1 >>> 0, J = new Uint8Array(V); _ !== q; ) {
        for (var X = D[_], et = 0, N = V - 1; (X !== 0 || et < Z) && N !== -1; N--, et++)
          X += 256 * J[N] >>> 0, J[N] = X % p >>> 0, X = X / p >>> 0;
        if (X !== 0)
          throw new Error("Non-zero carry");
        Z = et, _++;
      }
      for (var M = V - Z; M !== V && J[M] === 0; )
        M++;
      for (var x = v.repeat(k); M < V; ++M)
        x += e.charAt(J[M]);
      return x;
    }
    function U(D) {
      if (typeof D != "string")
        throw new TypeError("Expected String");
      if (D.length === 0)
        return r.alloc(0);
      for (var k = 0, Z = 0, _ = 0; D[k] === v; )
        Z++, k++;
      for (var q = (D.length - k) * S + 1 >>> 0, V = new Uint8Array(q); k < D.length; ) {
        var J = D.charCodeAt(k);
        if (J > 255)
          return;
        var X = n[J];
        if (X === 255)
          return;
        for (var et = 0, N = q - 1; (X !== 0 || et < _) && N !== -1; N--, et++)
          X += p * V[N] >>> 0, V[N] = X % 256 >>> 0, X = X / 256 >>> 0;
        if (X !== 0)
          throw new Error("Non-zero carry");
        _ = et, k++;
      }
      for (var M = q - _; M !== q && V[M] === 0; )
        M++;
      var x = r.allocUnsafe(Z + (q - M));
      x.fill(0, 0, Z);
      for (var O = Z; M !== q; )
        x[O++] = V[M++];
      return x;
    }
    function z(D) {
      var k = U(D);
      if (k)
        return k;
      throw new Error("Non-base" + p + " character");
    }
    return {
      encode: F,
      decodeUnsafe: U,
      decode: z
    };
  }
  return os = t, os;
}
var as, Go;
function ic() {
  if (Go) return as;
  Go = 1;
  var r = mh(), t = "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz";
  return as = r(t), as;
}
var bh = ic();
const ve = /* @__PURE__ */ Tr(bh);
var Tt = {};
function cn(r, t, e) {
  return t <= r && r <= e;
}
function Ai(r) {
  if (r === void 0) return {};
  if (r === Object(r)) return r;
  throw TypeError("Could not convert argument to dictionary");
}
function vh(r) {
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
          var h = s & 1023, p = l & 1023;
          i.push(65536 + (h << 10) + p), n += 1;
        } else
          i.push(65533);
      }
    n += 1;
  }
  return i;
}
function Eh(r) {
  for (var t = "", e = 0; e < r.length; ++e) {
    var n = r[e];
    n <= 65535 ? t += String.fromCharCode(n) : (n -= 65536, t += String.fromCharCode(
      (n >> 10) + 55296,
      (n & 1023) + 56320
    ));
  }
  return t;
}
var si = -1;
function ro(r) {
  this.tokens = [].slice.call(r);
}
ro.prototype = {
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
    return this.tokens.length ? this.tokens.shift() : si;
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
var or = -1;
function cs(r, t) {
  if (r)
    throw TypeError("Decoder error");
  return t || 65533;
}
var oi = "utf-8";
function ai(r, t) {
  if (!(this instanceof ai))
    return new ai(r, t);
  if (r = r !== void 0 ? String(r).toLowerCase() : oi, r !== oi)
    throw new Error("Encoding not supported. Only utf-8 is supported");
  t = Ai(t), this._streaming = !1, this._BOMseen = !1, this._decoder = null, this._fatal = !!t.fatal, this._ignoreBOM = !!t.ignoreBOM, Object.defineProperty(this, "encoding", { value: "utf-8" }), Object.defineProperty(this, "fatal", { value: this._fatal }), Object.defineProperty(this, "ignoreBOM", { value: this._ignoreBOM });
}
ai.prototype = {
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
    ) : n = new Uint8Array(0), e = Ai(e), this._streaming || (this._decoder = new Mh({ fatal: this._fatal }), this._BOMseen = !1), this._streaming = !!e.stream;
    for (var i = new ro(n), s = [], l; !i.endOfStream() && (l = this._decoder.handler(i, i.read()), l !== or); )
      l !== null && (Array.isArray(l) ? s.push.apply(
        s,
        /**@type {!Array.<number>}*/
        l
      ) : s.push(l));
    if (!this._streaming) {
      do {
        if (l = this._decoder.handler(i, i.read()), l === or)
          break;
        l !== null && (Array.isArray(l) ? s.push.apply(
          s,
          /**@type {!Array.<number>}*/
          l
        ) : s.push(l));
      } while (!i.endOfStream());
      this._decoder = null;
    }
    return s.length && ["utf-8"].indexOf(this.encoding) !== -1 && !this._ignoreBOM && !this._BOMseen && (s[0] === 65279 ? (this._BOMseen = !0, s.shift()) : this._BOMseen = !0), Eh(s);
  }
};
function ci(r, t) {
  if (!(this instanceof ci))
    return new ci(r, t);
  if (r = r !== void 0 ? String(r).toLowerCase() : oi, r !== oi)
    throw new Error("Encoding not supported. Only utf-8 is supported");
  t = Ai(t), this._streaming = !1, this._encoder = null, this._options = { fatal: !!t.fatal }, Object.defineProperty(this, "encoding", { value: "utf-8" });
}
ci.prototype = {
  /**
   * @param {string=} opt_string The string to encode.
   * @param {Object=} options
   * @return {Uint8Array} Encoded bytes, as a Uint8Array.
   */
  encode: function(t, e) {
    t = t ? String(t) : "", e = Ai(e), this._streaming || (this._encoder = new Sh(this._options)), this._streaming = !!e.stream;
    for (var n = [], i = new ro(vh(t)), s; !i.endOfStream() && (s = this._encoder.handler(i, i.read()), s !== or); )
      Array.isArray(s) ? n.push.apply(
        n,
        /**@type {!Array.<number>}*/
        s
      ) : n.push(s);
    if (!this._streaming) {
      for (; s = this._encoder.handler(i, i.read()), s !== or; )
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
function Mh(r) {
  var t = r.fatal, e = 0, n = 0, i = 0, s = 128, l = 191;
  this.handler = function(h, p) {
    if (p === si && i !== 0)
      return i = 0, cs(t);
    if (p === si)
      return or;
    if (i === 0) {
      if (cn(p, 0, 127))
        return p;
      if (cn(p, 194, 223))
        i = 1, e = p - 192;
      else if (cn(p, 224, 239))
        p === 224 && (s = 160), p === 237 && (l = 159), i = 2, e = p - 224;
      else if (cn(p, 240, 244))
        p === 240 && (s = 144), p === 244 && (l = 143), i = 3, e = p - 240;
      else
        return cs(t);
      return e = e << 6 * i, null;
    }
    if (!cn(p, s, l))
      return e = i = n = 0, s = 128, l = 191, h.prepend(p), cs(t);
    if (s = 128, l = 191, n += 1, e += p - 128 << 6 * (i - n), n !== i)
      return null;
    var v = e;
    return e = i = n = 0, v;
  };
}
function Sh(r) {
  r.fatal, this.handler = function(t, e) {
    if (e === si)
      return or;
    if (cn(e, 0, 127))
      return e;
    var n, i;
    cn(e, 128, 2047) ? (n = 1, i = 192) : cn(e, 2048, 65535) ? (n = 2, i = 224) : cn(e, 65536, 1114111) && (n = 3, i = 240);
    for (var s = [(e >> 6 * n) + i]; n > 0; ) {
      var l = e >> 6 * (n - 1);
      s.push(128 | l & 63), n -= 1;
    }
    return s;
  };
}
const Ih = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  TextDecoder: ai,
  TextEncoder: ci
}, Symbol.toStringTag, { value: "Module" })), xh = /* @__PURE__ */ Gs(Ih);
var Ko;
function Bh() {
  if (Ko) return Tt;
  Ko = 1;
  var r = Tt && Tt.__createBinding || (Object.create ? function(M, x, O, R) {
    R === void 0 && (R = O), Object.defineProperty(M, R, { enumerable: !0, get: function() {
      return x[O];
    } });
  } : function(M, x, O, R) {
    R === void 0 && (R = O), M[R] = x[O];
  }), t = Tt && Tt.__setModuleDefault || (Object.create ? function(M, x) {
    Object.defineProperty(M, "default", { enumerable: !0, value: x });
  } : function(M, x) {
    M.default = x;
  }), e = Tt && Tt.__decorate || function(M, x, O, R) {
    var b = arguments.length, u = b < 3 ? x : R === null ? R = Object.getOwnPropertyDescriptor(x, O) : R, d;
    if (typeof Reflect == "object" && typeof Reflect.decorate == "function") u = Reflect.decorate(M, x, O, R);
    else for (var w = M.length - 1; w >= 0; w--) (d = M[w]) && (u = (b < 3 ? d(u) : b > 3 ? d(x, O, u) : d(x, O)) || u);
    return b > 3 && u && Object.defineProperty(x, O, u), u;
  }, n = Tt && Tt.__importStar || function(M) {
    if (M && M.__esModule) return M;
    var x = {};
    if (M != null) for (var O in M) O !== "default" && Object.hasOwnProperty.call(M, O) && r(x, M, O);
    return t(x, M), x;
  }, i = Tt && Tt.__importDefault || function(M) {
    return M && M.__esModule ? M : { default: M };
  };
  Object.defineProperty(Tt, "__esModule", { value: !0 }), Tt.deserializeUnchecked = Tt.deserialize = Tt.serialize = Tt.BinaryReader = Tt.BinaryWriter = Tt.BorshError = Tt.baseDecode = Tt.baseEncode = void 0;
  const s = i(rc()), l = i(ic()), h = n(xh), p = typeof TextDecoder != "function" ? h.TextDecoder : TextDecoder, v = new p("utf-8", { fatal: !0 });
  function S(M) {
    return typeof M == "string" && (M = Buffer.from(M, "utf8")), l.default.encode(Buffer.from(M));
  }
  Tt.baseEncode = S;
  function C(M) {
    return Buffer.from(l.default.decode(M));
  }
  Tt.baseDecode = C;
  const F = 1024;
  class U extends Error {
    constructor(x) {
      super(x), this.fieldPath = [], this.originalMessage = x;
    }
    addToFieldPath(x) {
      this.fieldPath.splice(0, 0, x), this.message = this.originalMessage + ": " + this.fieldPath.join(".");
    }
  }
  Tt.BorshError = U;
  class z {
    constructor() {
      this.buf = Buffer.alloc(F), this.length = 0;
    }
    maybeResize() {
      this.buf.length < 16 + this.length && (this.buf = Buffer.concat([this.buf, Buffer.alloc(F)]));
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
      this.maybeResize(), this.writeBuffer(Buffer.from(new s.default(x).toArray("le", 8)));
    }
    writeU128(x) {
      this.maybeResize(), this.writeBuffer(Buffer.from(new s.default(x).toArray("le", 16)));
    }
    writeU256(x) {
      this.maybeResize(), this.writeBuffer(Buffer.from(new s.default(x).toArray("le", 32)));
    }
    writeU512(x) {
      this.maybeResize(), this.writeBuffer(Buffer.from(new s.default(x).toArray("le", 64)));
    }
    writeBuffer(x) {
      this.buf = Buffer.concat([
        Buffer.from(this.buf.subarray(0, this.length)),
        x,
        Buffer.alloc(F)
      ]), this.length += x.length;
    }
    writeString(x) {
      this.maybeResize();
      const O = Buffer.from(x, "utf8");
      this.writeU32(O.length), this.writeBuffer(O);
    }
    writeFixedArray(x) {
      this.writeBuffer(Buffer.from(x));
    }
    writeArray(x, O) {
      this.maybeResize(), this.writeU32(x.length);
      for (const R of x)
        this.maybeResize(), O(R);
    }
    toArray() {
      return this.buf.subarray(0, this.length);
    }
  }
  Tt.BinaryWriter = z;
  function D(M, x, O) {
    const R = O.value;
    O.value = function(...b) {
      try {
        return R.apply(this, b);
      } catch (u) {
        if (u instanceof RangeError) {
          const d = u.code;
          if (["ERR_BUFFER_OUT_OF_BOUNDS", "ERR_OUT_OF_RANGE"].indexOf(d) >= 0)
            throw new U("Reached the end of buffer when deserializing");
        }
        throw u;
      }
    };
  }
  class k {
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
      const O = this.buf.slice(this.offset, this.offset + x);
      return this.offset += x, O;
    }
    readString() {
      const x = this.readU32(), O = this.readBuffer(x);
      try {
        return v.decode(O);
      } catch (R) {
        throw new U(`Error decoding UTF-8 string: ${R}`);
      }
    }
    readFixedArray(x) {
      return new Uint8Array(this.readBuffer(x));
    }
    readArray(x) {
      const O = this.readU32(), R = Array();
      for (let b = 0; b < O; ++b)
        R.push(x());
      return R;
    }
  }
  e([
    D
  ], k.prototype, "readU8", null), e([
    D
  ], k.prototype, "readU16", null), e([
    D
  ], k.prototype, "readU32", null), e([
    D
  ], k.prototype, "readU64", null), e([
    D
  ], k.prototype, "readU128", null), e([
    D
  ], k.prototype, "readU256", null), e([
    D
  ], k.prototype, "readU512", null), e([
    D
  ], k.prototype, "readString", null), e([
    D
  ], k.prototype, "readFixedArray", null), e([
    D
  ], k.prototype, "readArray", null), Tt.BinaryReader = k;
  function Z(M) {
    return M.charAt(0).toUpperCase() + M.slice(1);
  }
  function _(M, x, O, R, b) {
    try {
      if (typeof R == "string")
        b[`write${Z(R)}`](O);
      else if (R instanceof Array)
        if (typeof R[0] == "number") {
          if (O.length !== R[0])
            throw new U(`Expecting byte array of length ${R[0]}, but got ${O.length} bytes`);
          b.writeFixedArray(O);
        } else if (R.length === 2 && typeof R[1] == "number") {
          if (O.length !== R[1])
            throw new U(`Expecting byte array of length ${R[1]}, but got ${O.length} bytes`);
          for (let u = 0; u < R[1]; u++)
            _(M, null, O[u], R[0], b);
        } else
          b.writeArray(O, (u) => {
            _(M, x, u, R[0], b);
          });
      else if (R.kind !== void 0)
        switch (R.kind) {
          case "option": {
            O == null ? b.writeU8(0) : (b.writeU8(1), _(M, x, O, R.type, b));
            break;
          }
          case "map": {
            b.writeU32(O.size), O.forEach((u, d) => {
              _(M, x, d, R.key, b), _(M, x, u, R.value, b);
            });
            break;
          }
          default:
            throw new U(`FieldType ${R} unrecognized`);
        }
      else
        q(M, O, b);
    } catch (u) {
      throw u instanceof U && u.addToFieldPath(x), u;
    }
  }
  function q(M, x, O) {
    if (typeof x.borshSerialize == "function") {
      x.borshSerialize(O);
      return;
    }
    const R = M.get(x.constructor);
    if (!R)
      throw new U(`Class ${x.constructor.name} is missing in schema`);
    if (R.kind === "struct")
      R.fields.map(([b, u]) => {
        _(M, b, x[b], u, O);
      });
    else if (R.kind === "enum") {
      const b = x[R.field];
      for (let u = 0; u < R.values.length; ++u) {
        const [d, w] = R.values[u];
        if (d === b) {
          O.writeU8(u), _(M, d, x[d], w, O);
          break;
        }
      }
    } else
      throw new U(`Unexpected schema kind: ${R.kind} for ${x.constructor.name}`);
  }
  function V(M, x, O = z) {
    const R = new O();
    return q(M, x, R), R.toArray();
  }
  Tt.serialize = V;
  function J(M, x, O, R) {
    try {
      if (typeof O == "string")
        return R[`read${Z(O)}`]();
      if (O instanceof Array) {
        if (typeof O[0] == "number")
          return R.readFixedArray(O[0]);
        if (typeof O[1] == "number") {
          const b = [];
          for (let u = 0; u < O[1]; u++)
            b.push(J(M, null, O[0], R));
          return b;
        } else
          return R.readArray(() => J(M, x, O[0], R));
      }
      if (O.kind === "option")
        return R.readU8() ? J(M, x, O.type, R) : void 0;
      if (O.kind === "map") {
        let b = /* @__PURE__ */ new Map();
        const u = R.readU32();
        for (let d = 0; d < u; d++) {
          const w = J(M, x, O.key, R), m = J(M, x, O.value, R);
          b.set(w, m);
        }
        return b;
      }
      return X(M, O, R);
    } catch (b) {
      throw b instanceof U && b.addToFieldPath(x), b;
    }
  }
  function X(M, x, O) {
    if (typeof x.borshDeserialize == "function")
      return x.borshDeserialize(O);
    const R = M.get(x);
    if (!R)
      throw new U(`Class ${x.name} is missing in schema`);
    if (R.kind === "struct") {
      const b = {};
      for (const [u, d] of M.get(x).fields)
        b[u] = J(M, u, d, O);
      return new x(b);
    }
    if (R.kind === "enum") {
      const b = O.readU8();
      if (b >= R.values.length)
        throw new U(`Enum index: ${b} is out of range`);
      const [u, d] = R.values[b], w = J(M, u, d, O);
      return new x({ [u]: w });
    }
    throw new U(`Unexpected schema kind: ${R.kind} for ${x.constructor.name}`);
  }
  function et(M, x, O, R = k) {
    const b = new R(O), u = X(M, x, b);
    if (b.offset < O.length)
      throw new U(`Unexpected ${O.length - b.offset} bytes after deserialized data`);
    return u;
  }
  Tt.deserialize = et;
  function N(M, x, O, R = k) {
    const b = new R(O);
    return X(M, x, b);
  }
  return Tt.deserializeUnchecked = N, Tt;
}
var us = Bh(), G = {}, Jo;
function Nh() {
  if (Jo) return G;
  Jo = 1, Object.defineProperty(G, "__esModule", { value: !0 }), G.s16 = G.s8 = G.nu64be = G.u48be = G.u40be = G.u32be = G.u24be = G.u16be = G.nu64 = G.u48 = G.u40 = G.u32 = G.u24 = G.u16 = G.u8 = G.offset = G.greedy = G.Constant = G.UTF8 = G.CString = G.Blob = G.Boolean = G.BitField = G.BitStructure = G.VariantLayout = G.Union = G.UnionLayoutDiscriminator = G.UnionDiscriminator = G.Structure = G.Sequence = G.DoubleBE = G.Double = G.FloatBE = G.Float = G.NearInt64BE = G.NearInt64 = G.NearUInt64BE = G.NearUInt64 = G.IntBE = G.Int = G.UIntBE = G.UInt = G.OffsetLayout = G.GreedyCount = G.ExternalLayout = G.bindConstructorLayout = G.nameWithProperty = G.Layout = G.uint8ArrayToBuffer = G.checkUint8Array = void 0, G.constant = G.utf8 = G.cstr = G.blob = G.unionLayoutDiscriminator = G.union = G.seq = G.bits = G.struct = G.f64be = G.f64 = G.f32be = G.f32 = G.ns64be = G.s48be = G.s40be = G.s32be = G.s24be = G.s16be = G.ns64 = G.s48 = G.s40 = G.s32 = G.s24 = void 0;
  const r = Ks();
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
    constructor(g, I) {
      if (!Number.isInteger(g))
        throw new TypeError("span must be an integer");
      this.span = g, this.property = I;
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
    getSpan(g, I) {
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
      const I = Object.create(this.constructor.prototype);
      return Object.assign(I, this), I.property = g, I;
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
      value(I, L) {
        return g.encode(this, I, L);
      },
      writable: !0
    }), Object.defineProperty(f, "decode", {
      value(I, L) {
        return g.decode(I, L);
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
    constructor(g = 1, I) {
      if (!Number.isInteger(g) || 0 >= g)
        throw new TypeError("elementSpan must be a (positive) integer");
      super(-1, I), this.elementSpan = g;
    }
    /** @override */
    isCount() {
      return !0;
    }
    /** @override */
    decode(g, I = 0) {
      t(g);
      const L = g.length - I;
      return Math.floor(L / this.elementSpan);
    }
    /** @override */
    encode(g, I, L) {
      return 0;
    }
  }
  G.GreedyCount = h;
  class p extends l {
    constructor(g, I = 0, L) {
      if (!(g instanceof n))
        throw new TypeError("layout must be a Layout");
      if (!Number.isInteger(I))
        throw new TypeError("offset must be integer or undefined");
      super(g.span, L || g.property), this.layout = g, this.offset = I;
    }
    /** @override */
    isCount() {
      return this.layout instanceof v || this.layout instanceof S;
    }
    /** @override */
    decode(g, I = 0) {
      return this.layout.decode(g, I + this.offset);
    }
    /** @override */
    encode(g, I, L = 0) {
      return this.layout.encode(g, I, L + this.offset);
    }
  }
  G.OffsetLayout = p;
  class v extends n {
    constructor(g, I) {
      if (super(g, I), 6 < this.span)
        throw new RangeError("span must not exceed 6 bytes");
    }
    /** @override */
    decode(g, I = 0) {
      return e(g).readUIntLE(I, this.span);
    }
    /** @override */
    encode(g, I, L = 0) {
      return e(I).writeUIntLE(g, L, this.span), this.span;
    }
  }
  G.UInt = v;
  class S extends n {
    constructor(g, I) {
      if (super(g, I), 6 < this.span)
        throw new RangeError("span must not exceed 6 bytes");
    }
    /** @override */
    decode(g, I = 0) {
      return e(g).readUIntBE(I, this.span);
    }
    /** @override */
    encode(g, I, L = 0) {
      return e(I).writeUIntBE(g, L, this.span), this.span;
    }
  }
  G.UIntBE = S;
  class C extends n {
    constructor(g, I) {
      if (super(g, I), 6 < this.span)
        throw new RangeError("span must not exceed 6 bytes");
    }
    /** @override */
    decode(g, I = 0) {
      return e(g).readIntLE(I, this.span);
    }
    /** @override */
    encode(g, I, L = 0) {
      return e(I).writeIntLE(g, L, this.span), this.span;
    }
  }
  G.Int = C;
  class F extends n {
    constructor(g, I) {
      if (super(g, I), 6 < this.span)
        throw new RangeError("span must not exceed 6 bytes");
    }
    /** @override */
    decode(g, I = 0) {
      return e(g).readIntBE(I, this.span);
    }
    /** @override */
    encode(g, I, L = 0) {
      return e(I).writeIntBE(g, L, this.span), this.span;
    }
  }
  G.IntBE = F;
  const U = Math.pow(2, 32);
  function z(f) {
    const g = Math.floor(f / U), I = f - g * U;
    return { hi32: g, lo32: I };
  }
  function D(f, g) {
    return f * U + g;
  }
  class k extends n {
    constructor(g) {
      super(8, g);
    }
    /** @override */
    decode(g, I = 0) {
      const L = e(g), H = L.readUInt32LE(I), K = L.readUInt32LE(I + 4);
      return D(K, H);
    }
    /** @override */
    encode(g, I, L = 0) {
      const H = z(g), K = e(I);
      return K.writeUInt32LE(H.lo32, L), K.writeUInt32LE(H.hi32, L + 4), 8;
    }
  }
  G.NearUInt64 = k;
  class Z extends n {
    constructor(g) {
      super(8, g);
    }
    /** @override */
    decode(g, I = 0) {
      const L = e(g), H = L.readUInt32BE(I), K = L.readUInt32BE(I + 4);
      return D(H, K);
    }
    /** @override */
    encode(g, I, L = 0) {
      const H = z(g), K = e(I);
      return K.writeUInt32BE(H.hi32, L), K.writeUInt32BE(H.lo32, L + 4), 8;
    }
  }
  G.NearUInt64BE = Z;
  class _ extends n {
    constructor(g) {
      super(8, g);
    }
    /** @override */
    decode(g, I = 0) {
      const L = e(g), H = L.readUInt32LE(I), K = L.readInt32LE(I + 4);
      return D(K, H);
    }
    /** @override */
    encode(g, I, L = 0) {
      const H = z(g), K = e(I);
      return K.writeUInt32LE(H.lo32, L), K.writeInt32LE(H.hi32, L + 4), 8;
    }
  }
  G.NearInt64 = _;
  class q extends n {
    constructor(g) {
      super(8, g);
    }
    /** @override */
    decode(g, I = 0) {
      const L = e(g), H = L.readInt32BE(I), K = L.readUInt32BE(I + 4);
      return D(H, K);
    }
    /** @override */
    encode(g, I, L = 0) {
      const H = z(g), K = e(I);
      return K.writeInt32BE(H.hi32, L), K.writeUInt32BE(H.lo32, L + 4), 8;
    }
  }
  G.NearInt64BE = q;
  class V extends n {
    constructor(g) {
      super(4, g);
    }
    /** @override */
    decode(g, I = 0) {
      return e(g).readFloatLE(I);
    }
    /** @override */
    encode(g, I, L = 0) {
      return e(I).writeFloatLE(g, L), 4;
    }
  }
  G.Float = V;
  class J extends n {
    constructor(g) {
      super(4, g);
    }
    /** @override */
    decode(g, I = 0) {
      return e(g).readFloatBE(I);
    }
    /** @override */
    encode(g, I, L = 0) {
      return e(I).writeFloatBE(g, L), 4;
    }
  }
  G.FloatBE = J;
  class X extends n {
    constructor(g) {
      super(8, g);
    }
    /** @override */
    decode(g, I = 0) {
      return e(g).readDoubleLE(I);
    }
    /** @override */
    encode(g, I, L = 0) {
      return e(I).writeDoubleLE(g, L), 8;
    }
  }
  G.Double = X;
  class et extends n {
    constructor(g) {
      super(8, g);
    }
    /** @override */
    decode(g, I = 0) {
      return e(g).readDoubleBE(I);
    }
    /** @override */
    encode(g, I, L = 0) {
      return e(I).writeDoubleBE(g, L), 8;
    }
  }
  G.DoubleBE = et;
  class N extends n {
    constructor(g, I, L) {
      if (!(g instanceof n))
        throw new TypeError("elementLayout must be a Layout");
      if (!(I instanceof l && I.isCount() || Number.isInteger(I) && 0 <= I))
        throw new TypeError("count must be non-negative integer or an unsigned integer ExternalLayout");
      let H = -1;
      !(I instanceof l) && 0 < g.span && (H = I * g.span), super(H, L), this.elementLayout = g, this.count = I;
    }
    /** @override */
    getSpan(g, I = 0) {
      if (0 <= this.span)
        return this.span;
      let L = 0, H = this.count;
      if (H instanceof l && (H = H.decode(g, I)), 0 < this.elementLayout.span)
        L = H * this.elementLayout.span;
      else {
        let K = 0;
        for (; K < H; )
          L += this.elementLayout.getSpan(g, I + L), ++K;
      }
      return L;
    }
    /** @override */
    decode(g, I = 0) {
      const L = [];
      let H = 0, K = this.count;
      for (K instanceof l && (K = K.decode(g, I)); H < K; )
        L.push(this.elementLayout.decode(g, I)), I += this.elementLayout.getSpan(g, I), H += 1;
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
    encode(g, I, L = 0) {
      const H = this.elementLayout, K = g.reduce((tt, st) => tt + H.encode(st, I, L + tt), 0);
      return this.count instanceof l && this.count.encode(g.length, I, L), K;
    }
  }
  G.Sequence = N;
  class M extends n {
    constructor(g, I, L) {
      if (!(Array.isArray(g) && g.reduce((K, tt) => K && tt instanceof n, !0)))
        throw new TypeError("fields must be array of Layout instances");
      typeof I == "boolean" && L === void 0 && (L = I, I = void 0);
      for (const K of g)
        if (0 > K.span && K.property === void 0)
          throw new Error("fields cannot contain unnamed variable-length layout");
      let H = -1;
      try {
        H = g.reduce((K, tt) => K + tt.getSpan(), 0);
      } catch {
      }
      super(H, I), this.fields = g, this.decodePrefixes = !!L;
    }
    /** @override */
    getSpan(g, I = 0) {
      if (0 <= this.span)
        return this.span;
      let L = 0;
      try {
        L = this.fields.reduce((H, K) => {
          const tt = K.getSpan(g, I);
          return I += tt, H + tt;
        }, 0);
      } catch {
        throw new RangeError("indeterminate span");
      }
      return L;
    }
    /** @override */
    decode(g, I = 0) {
      t(g);
      const L = this.makeDestinationObject();
      for (const H of this.fields)
        if (H.property !== void 0 && (L[H.property] = H.decode(g, I)), I += H.getSpan(g, I), this.decodePrefixes && g.length === I)
          break;
      return L;
    }
    /** Implement {@link Layout#encode|encode} for {@link Structure}.
     *
     * If `src` is missing a property for a member with a defined {@link
     * Layout#property|property} the corresponding region of the buffer is
     * left unmodified. */
    encode(g, I, L = 0) {
      const H = L;
      let K = 0, tt = 0;
      for (const st of this.fields) {
        let xt = st.span;
        if (tt = 0 < xt ? xt : 0, st.property !== void 0) {
          const dt = g[st.property];
          dt !== void 0 && (tt = st.encode(dt, I, L), 0 > xt && (xt = st.getSpan(I, L)));
        }
        K = L, L += xt;
      }
      return K + tt - H;
    }
    /** @override */
    fromArray(g) {
      const I = this.makeDestinationObject();
      for (const L of this.fields)
        L.property !== void 0 && 0 < g.length && (I[L.property] = g.shift());
      return I;
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
      for (const I of this.fields)
        if (I.property === g)
          return I;
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
      let I = 0;
      for (const L of this.fields) {
        if (L.property === g)
          return I;
        0 > L.span ? I = -1 : 0 <= I && (I += L.span);
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
    decode(g, I) {
      throw new Error("UnionDiscriminator is abstract");
    }
    /** Analog to {@link Layout#decode|Layout encode} for union discriminators.
     *
     * The implementation of this method need not store the value if
     * variant information is maintained through other means. */
    encode(g, I, L) {
      throw new Error("UnionDiscriminator is abstract");
    }
  }
  G.UnionDiscriminator = x;
  class O extends x {
    constructor(g, I) {
      if (!(g instanceof l && g.isCount()))
        throw new TypeError("layout must be an unsigned integer ExternalLayout");
      super(I || g.property || "variant"), this.layout = g;
    }
    /** Delegate decoding to {@link UnionLayoutDiscriminator#layout|layout}. */
    decode(g, I) {
      return this.layout.decode(g, I);
    }
    /** Delegate encoding to {@link UnionLayoutDiscriminator#layout|layout}. */
    encode(g, I, L) {
      return this.layout.encode(g, I, L);
    }
  }
  G.UnionLayoutDiscriminator = O;
  class R extends n {
    constructor(g, I, L) {
      let H;
      if (g instanceof v || g instanceof S)
        H = new O(new p(g));
      else if (g instanceof l && g.isCount())
        H = new O(g);
      else if (g instanceof x)
        H = g;
      else
        throw new TypeError("discr must be a UnionDiscriminator or an unsigned integer layout");
      if (I === void 0 && (I = null), !(I === null || I instanceof n))
        throw new TypeError("defaultLayout must be null or a Layout");
      if (I !== null) {
        if (0 > I.span)
          throw new Error("defaultLayout must have constant span");
        I.property === void 0 && (I = I.replicate("content"));
      }
      let K = -1;
      I && (K = I.span, 0 <= K && (g instanceof v || g instanceof S) && (K += H.layout.span)), super(K, L), this.discriminator = H, this.usesPrefixDiscriminator = g instanceof v || g instanceof S, this.defaultLayout = I, this.registry = {};
      let tt = this.defaultGetSourceVariant.bind(this);
      this.getSourceVariant = function(st) {
        return tt(st);
      }, this.configGetSourceVariant = function(st) {
        tt = st.bind(this);
      };
    }
    /** @override */
    getSpan(g, I = 0) {
      if (0 <= this.span)
        return this.span;
      const L = this.getVariant(g, I);
      if (!L)
        throw new Error("unable to determine span for unrecognized variant");
      return L.getSpan(g, I);
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
        const I = this.registry[g[this.discriminator.property]];
        if (I && (!I.layout || I.property && Object.prototype.hasOwnProperty.call(g, I.property)))
          return I;
      } else
        for (const I in this.registry) {
          const L = this.registry[I];
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
    decode(g, I = 0) {
      let L;
      const H = this.discriminator, K = H.decode(g, I), tt = this.registry[K];
      if (tt === void 0) {
        const st = this.defaultLayout;
        let xt = 0;
        this.usesPrefixDiscriminator && (xt = H.layout.span), L = this.makeDestinationObject(), L[H.property] = K, L[st.property] = st.decode(g, I + xt);
      } else
        L = tt.decode(g, I);
      return L;
    }
    /** Implement {@link Layout#encode|encode} for {@link Union}.
     *
     * This API assumes the `src` object is consistent with the union's
     * {@link Union#defaultLayout|default layout}.  To encode variants
     * use the appropriate variant-specific {@link VariantLayout#encode}
     * method. */
    encode(g, I, L = 0) {
      const H = this.getSourceVariant(g);
      if (H === void 0) {
        const K = this.discriminator, tt = this.defaultLayout;
        let st = 0;
        return this.usesPrefixDiscriminator && (st = K.layout.span), K.encode(g[K.property], I, L), st + tt.encode(g[tt.property], I, L + st);
      }
      return H.encode(g, I, L);
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
    addVariant(g, I, L) {
      const H = new b(this, g, I, L);
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
    getVariant(g, I = 0) {
      let L;
      return g instanceof Uint8Array ? L = this.discriminator.decode(g, I) : L = g, this.registry[L];
    }
  }
  G.Union = R;
  class b extends n {
    constructor(g, I, L, H) {
      if (!(g instanceof R))
        throw new TypeError("union must be a Union");
      if (!Number.isInteger(I) || 0 > I)
        throw new TypeError("variant must be a (non-negative) integer");
      if (typeof L == "string" && H === void 0 && (H = L, L = null), L) {
        if (!(L instanceof n))
          throw new TypeError("layout must be a Layout");
        if (g.defaultLayout !== null && 0 <= L.span && L.span > g.defaultLayout.span)
          throw new Error("variant span exceeds span of containing union");
        if (typeof H != "string")
          throw new TypeError("variant must have a String property");
      }
      let K = g.span;
      0 > g.span && (K = L ? L.span : 0, 0 <= K && g.usesPrefixDiscriminator && (K += g.discriminator.layout.span)), super(K, H), this.union = g, this.variant = I, this.layout = L || null;
    }
    /** @override */
    getSpan(g, I = 0) {
      if (0 <= this.span)
        return this.span;
      let L = 0;
      this.union.usesPrefixDiscriminator && (L = this.union.discriminator.layout.span);
      let H = 0;
      return this.layout && (H = this.layout.getSpan(g, I + L)), L + H;
    }
    /** @override */
    decode(g, I = 0) {
      const L = this.makeDestinationObject();
      if (this !== this.union.getVariant(g, I))
        throw new Error("variant mismatch");
      let H = 0;
      return this.union.usesPrefixDiscriminator && (H = this.union.discriminator.layout.span), this.layout ? L[this.property] = this.layout.decode(g, I + H) : this.property ? L[this.property] = !0 : this.union.usesPrefixDiscriminator && (L[this.union.discriminator.property] = this.variant), L;
    }
    /** @override */
    encode(g, I, L = 0) {
      let H = 0;
      if (this.union.usesPrefixDiscriminator && (H = this.union.discriminator.layout.span), this.layout && !Object.prototype.hasOwnProperty.call(g, this.property))
        throw new TypeError("variant lacks property " + this.property);
      this.union.discriminator.encode(this.variant, I, L);
      let K = H;
      if (this.layout && (this.layout.encode(g[this.property], I, L + H), K += this.layout.getSpan(I, L + H), 0 <= this.union.span && K > this.union.span))
        throw new Error("encoded variant overruns containing union");
      return K;
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
    constructor(g, I, L) {
      if (!(g instanceof v || g instanceof S))
        throw new TypeError("word must be a UInt or UIntBE layout");
      if (typeof I == "string" && L === void 0 && (L = I, I = !1), 4 < g.span)
        throw new RangeError("word cannot exceed 32 bits");
      super(g.span, L), this.word = g, this.msb = !!I, this.fields = [];
      let H = 0;
      this._packedSetValue = function(K) {
        return H = u(K), this;
      }, this._packedGetValue = function() {
        return H;
      };
    }
    /** @override */
    decode(g, I = 0) {
      const L = this.makeDestinationObject(), H = this.word.decode(g, I);
      this._packedSetValue(H);
      for (const K of this.fields)
        K.property !== void 0 && (L[K.property] = K.decode(g));
      return L;
    }
    /** Implement {@link Layout#encode|encode} for {@link BitStructure}.
     *
     * If `src` is missing a property for a member with a defined {@link
     * Layout#property|property} the corresponding region of the packed
     * value is left unmodified.  Unused bits are also left unmodified. */
    encode(g, I, L = 0) {
      const H = this.word.decode(I, L);
      this._packedSetValue(H);
      for (const K of this.fields)
        if (K.property !== void 0) {
          const tt = g[K.property];
          tt !== void 0 && K.encode(tt);
        }
      return this.word.encode(this._packedGetValue(), I, L);
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
    addField(g, I) {
      const L = new w(this, g, I);
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
      const I = new m(this, g);
      return this.fields.push(I), I;
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
      for (const I of this.fields)
        if (I.property === g)
          return I;
    }
  }
  G.BitStructure = d;
  class w {
    constructor(g, I, L) {
      if (!(g instanceof d))
        throw new TypeError("container must be a BitStructure");
      if (!Number.isInteger(I) || 0 >= I)
        throw new TypeError("bits must be positive integer");
      const H = 8 * g.span, K = g.fields.reduce((tt, st) => tt + st.bits, 0);
      if (I + K > H)
        throw new Error("bits too long for span remainder (" + (H - K) + " of " + H + " remain)");
      this.container = g, this.bits = I, this.valueMask = (1 << I) - 1, I === 32 && (this.valueMask = 4294967295), this.start = K, this.container.msb && (this.start = H - K - I), this.wordMask = u(this.valueMask << this.start), this.property = L;
    }
    /** Store a value into the corresponding subsequence of the containing
     * bit field. */
    decode(g, I) {
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
      const I = this.container._packedGetValue(), L = u(g << this.start);
      this.container._packedSetValue(u(I & ~this.wordMask) | L);
    }
  }
  G.BitField = w;
  class m extends w {
    constructor(g, I) {
      super(g, 1, I);
    }
    /** Override {@link BitField#decode|decode} for {@link Boolean|Boolean}.
     *
     * @returns {boolean} */
    decode(g, I) {
      return !!super.decode(g, I);
    }
    /** @override */
    encode(g) {
      typeof g == "boolean" && (g = +g), super.encode(g);
    }
  }
  G.Boolean = m;
  class y extends n {
    constructor(g, I) {
      if (!(g instanceof l && g.isCount() || Number.isInteger(g) && 0 <= g))
        throw new TypeError("length must be positive integer or an unsigned integer ExternalLayout");
      let L = -1;
      g instanceof l || (L = g), super(L, I), this.length = g;
    }
    /** @override */
    getSpan(g, I) {
      let L = this.span;
      return 0 > L && (L = this.length.decode(g, I)), L;
    }
    /** @override */
    decode(g, I = 0) {
      let L = this.span;
      return 0 > L && (L = this.length.decode(g, I)), e(g).slice(I, I + L);
    }
    /** Implement {@link Layout#encode|encode} for {@link Blob}.
     *
     * **NOTE** If {@link Layout#count|count} is an instance of {@link
     * ExternalLayout} then the length of `src` will be encoded as the
     * count after `src` is encoded. */
    encode(g, I, L) {
      let H = this.length;
      if (this.length instanceof l && (H = g.length), !(g instanceof Uint8Array && H === g.length))
        throw new TypeError(i("Blob.encode", this) + " requires (length " + H + ") Uint8Array as src");
      if (L + H > I.length)
        throw new RangeError("encoding overruns Uint8Array");
      const K = e(g);
      return e(I).write(K.toString("hex"), L, H, "hex"), this.length instanceof l && this.length.encode(H, I, L), H;
    }
  }
  G.Blob = y;
  class B extends n {
    constructor(g) {
      super(-1, g);
    }
    /** @override */
    getSpan(g, I = 0) {
      t(g);
      let L = I;
      for (; L < g.length && g[L] !== 0; )
        L += 1;
      return 1 + L - I;
    }
    /** @override */
    decode(g, I = 0) {
      const L = this.getSpan(g, I);
      return e(g).slice(I, I + L - 1).toString("utf-8");
    }
    /** @override */
    encode(g, I, L = 0) {
      typeof g != "string" && (g = String(g));
      const H = r.Buffer.from(g, "utf8"), K = H.length;
      if (L + K > I.length)
        throw new RangeError("encoding overruns Buffer");
      const tt = e(I);
      return H.copy(tt, L), tt[L + K] = 0, K + 1;
    }
  }
  G.CString = B;
  class P extends n {
    constructor(g, I) {
      if (typeof g == "string" && I === void 0 && (I = g, g = void 0), g === void 0)
        g = -1;
      else if (!Number.isInteger(g))
        throw new TypeError("maxSpan must be an integer");
      super(-1, I), this.maxSpan = g;
    }
    /** @override */
    getSpan(g, I = 0) {
      return t(g), g.length - I;
    }
    /** @override */
    decode(g, I = 0) {
      const L = this.getSpan(g, I);
      if (0 <= this.maxSpan && this.maxSpan < L)
        throw new RangeError("text length exceeds maxSpan");
      return e(g).slice(I, I + L).toString("utf-8");
    }
    /** @override */
    encode(g, I, L = 0) {
      typeof g != "string" && (g = String(g));
      const H = r.Buffer.from(g, "utf8"), K = H.length;
      if (0 <= this.maxSpan && this.maxSpan < K)
        throw new RangeError("text length exceeds maxSpan");
      if (L + K > I.length)
        throw new RangeError("encoding overruns Buffer");
      return H.copy(e(I), L), K;
    }
  }
  G.UTF8 = P;
  class E extends n {
    constructor(g, I) {
      super(0, I), this.value = g;
    }
    /** @override */
    decode(g, I) {
      return this.value;
    }
    /** @override */
    encode(g, I, L) {
      return 0;
    }
  }
  return G.Constant = E, G.greedy = (f, g) => new h(f, g), G.offset = (f, g, I) => new p(f, g, I), G.u8 = (f) => new v(1, f), G.u16 = (f) => new v(2, f), G.u24 = (f) => new v(3, f), G.u32 = (f) => new v(4, f), G.u40 = (f) => new v(5, f), G.u48 = (f) => new v(6, f), G.nu64 = (f) => new k(f), G.u16be = (f) => new S(2, f), G.u24be = (f) => new S(3, f), G.u32be = (f) => new S(4, f), G.u40be = (f) => new S(5, f), G.u48be = (f) => new S(6, f), G.nu64be = (f) => new Z(f), G.s8 = (f) => new C(1, f), G.s16 = (f) => new C(2, f), G.s24 = (f) => new C(3, f), G.s32 = (f) => new C(4, f), G.s40 = (f) => new C(5, f), G.s48 = (f) => new C(6, f), G.ns64 = (f) => new _(f), G.s16be = (f) => new F(2, f), G.s24be = (f) => new F(3, f), G.s32be = (f) => new F(4, f), G.s40be = (f) => new F(5, f), G.s48be = (f) => new F(6, f), G.ns64be = (f) => new q(f), G.f32 = (f) => new V(f), G.f32be = (f) => new J(f), G.f64 = (f) => new X(f), G.f64be = (f) => new et(f), G.struct = (f, g, I) => new M(f, g, I), G.bits = (f, g, I) => new d(f, g, I), G.seq = (f, g, I) => new N(f, g, I), G.union = (f, g, I) => new R(f, g, I), G.unionLayoutDiscriminator = (f, g) => new O(f, g), G.blob = (f, g) => new y(f, g), G.cstr = (f) => new B(f), G.utf8 = (f, g) => new P(f, g), G.constant = (f, g) => new E(f, g), G;
}
var W = Nh(), On = {}, Vo;
function Th() {
  if (Vo) return On;
  Vo = 1, Object.defineProperty(On, "__esModule", { value: !0 });
  function r(i) {
    {
      const s = Buffer.from(i);
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
      const l = i.toString(16), h = Buffer.from(l.padStart(s * 2, "0").slice(0, s * 2), "hex");
      return h.reverse(), h;
    }
  }
  On.toBufferLE = e;
  function n(i, s) {
    {
      const l = i.toString(16);
      return Buffer.from(l.padStart(s * 2, "0").slice(0, s * 2), "hex");
    }
  }
  return On.toBufferBE = n, On;
}
var Xo = Th();
class kh extends TypeError {
  constructor(t, e) {
    let n;
    const { message: i, explanation: s, ...l } = t, { path: h } = t, p = h.length === 0 ? i : `At path: ${h.join(".")} -- ${i}`;
    super(s ?? p), s != null && (this.cause = p), Object.assign(this, l), this.name = this.constructor.name, this.failures = () => n ?? (n = [t, ...e()]);
  }
}
function Ch(r) {
  return Cr(r) && typeof r[Symbol.iterator] == "function";
}
function Cr(r) {
  return typeof r == "object" && r != null;
}
function ui(r) {
  return Cr(r) && !Array.isArray(r);
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
  const { path: i, branch: s } = t, { type: l } = e, { refinement: h, message: p = `Expected a value of type \`${l}\`${h ? ` with refinement \`${h}\`` : ""}, but received: \`${Ge(n)}\`` } = r;
  return {
    value: n,
    type: l,
    refinement: h,
    key: i[i.length - 1],
    path: i,
    branch: s,
    ...r,
    message: p
  };
}
function* $o(r, t, e, n) {
  Ch(r) || (r = [r]);
  for (const i of r) {
    const s = Rh(i, t, e, n);
    s && (yield s);
  }
}
function* io(r, t, e = {}) {
  const { path: n = [], branch: i = [r], coerce: s = !1, mask: l = !1 } = e, h = { path: n, branch: i, mask: l };
  s && (r = t.coercer(r, h));
  let p = "valid";
  for (const v of t.validator(r, h))
    v.explanation = e.message, p = "not_valid", yield [v, void 0];
  for (let [v, S, C] of t.entries(r, h)) {
    const F = io(S, C, {
      path: v === void 0 ? n : [...n, v],
      branch: v === void 0 ? i : [...i, S],
      coerce: s,
      mask: l,
      message: e.message
    });
    for (const U of F)
      U[0] ? (p = U[0].refinement != null ? "not_refined" : "not_valid", yield [U[0], void 0]) : s && (S = U[1], v === void 0 ? r = S : r instanceof Map ? r.set(v, S) : r instanceof Set ? r.add(S) : Cr(r) && (S !== void 0 || v in r) && (r[v] = S));
  }
  if (p !== "not_valid")
    for (const v of t.refiner(r, h))
      v.explanation = e.message, p = "not_refined", yield [v, void 0];
  p === "valid" && (yield [void 0, r]);
}
let en = class {
  constructor(t) {
    const { type: e, schema: n, validator: i, refiner: s, coercer: l = (p) => p, entries: h = function* () {
    } } = t;
    this.type = e, this.schema = n, this.entries = h, this.coercer = l, i ? this.validator = (p, v) => {
      const S = i(p, v);
      return $o(S, v, this, p);
    } : this.validator = () => [], s ? this.refiner = (p, v) => {
      const S = s(p, v);
      return $o(S, v, this, p);
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
    return sc(t, this);
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
    return Lr(t, this, e);
  }
};
function Dh(r, t, e) {
  const n = Lr(r, t, { message: e });
  if (n[0])
    throw n[0];
}
function rt(r, t, e) {
  const n = Lr(r, t, { coerce: !0, message: e });
  if (n[0])
    throw n[0];
  return n[1];
}
function Oh(r, t, e) {
  const n = Lr(r, t, { coerce: !0, mask: !0, message: e });
  if (n[0])
    throw n[0];
  return n[1];
}
function sc(r, t) {
  return !Lr(r, t)[0];
}
function Lr(r, t, e = {}) {
  const n = io(r, t, e), i = Lh(n);
  return i[0] ? [new kh(i[0], function* () {
    for (const l of n)
      l[0] && (yield l[0]);
  }), void 0] : [void 0, i[1]];
}
function _n(r, t) {
  return new en({ type: r, schema: null, validator: t });
}
function Uh() {
  return _n("any", () => !0);
}
function it(r) {
  return new en({
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
function tn() {
  return _n("boolean", (r) => typeof r == "boolean");
}
function so(r) {
  return _n("instance", (t) => t instanceof r || `Expected a \`${r.name}\` instance, but received: ${Ge(t)}`);
}
function Wt(r) {
  const t = Ge(r), e = typeof r;
  return new en({
    type: "literal",
    schema: e === "string" || e === "number" || e === "boolean" ? r : null,
    validator(n) {
      return n === r || `Expected the literal \`${t}\`, but received: ${Ge(n)}`;
    }
  });
}
function jh() {
  return _n("never", () => !1);
}
function ot(r) {
  return new en({
    ...r,
    validator: (t, e) => t === null || r.validator(t, e),
    refiner: (t, e) => t === null || r.refiner(t, e)
  });
}
function Y() {
  return _n("number", (r) => typeof r == "number" && !isNaN(r) || `Expected a number, but received: ${Ge(r)}`);
}
function yt(r) {
  return new en({
    ...r,
    validator: (t, e) => t === void 0 || r.validator(t, e),
    refiner: (t, e) => t === void 0 || r.refiner(t, e)
  });
}
function oc(r, t) {
  return new en({
    type: "record",
    schema: null,
    *entries(e) {
      if (Cr(e))
        for (const n in e) {
          const i = e[n];
          yield [n, n, r], yield [n, i, t];
        }
    },
    validator(e) {
      return ui(e) || `Expected an object, but received: ${Ge(e)}`;
    },
    coercer(e) {
      return ui(e) ? { ...e } : e;
    }
  });
}
function nt() {
  return _n("string", (r) => typeof r == "string" || `Expected a string, but received: ${Ge(r)}`);
}
function oo(r) {
  const t = jh();
  return new en({
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
  return new en({
    type: "type",
    schema: r,
    *entries(e) {
      if (Cr(e))
        for (const n of t)
          yield [n, e[n], r[n]];
    },
    validator(e) {
      return ui(e) || `Expected an object, but received: ${Ge(e)}`;
    },
    coercer(e) {
      return ui(e) ? { ...e } : e;
    }
  });
}
function Te(r) {
  const t = r.map((e) => e.type).join(" | ");
  return new en({
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
        const [...l] = io(e, s, n), [h] = l;
        if (h[0])
          for (const [p] of l)
            p && i.push(p);
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
function ur() {
  return _n("unknown", () => !0);
}
function Rr(r, t, e) {
  return new en({
    ...r,
    coercer: (n, i) => sc(n, t) ? r.coercer(e(n, i), i) : r.coercer(n, i)
  });
}
var _r, zh = new Uint8Array(16);
function ac() {
  if (!_r && (_r = typeof crypto < "u" && crypto.getRandomValues && crypto.getRandomValues.bind(crypto) || typeof msCrypto < "u" && typeof msCrypto.getRandomValues == "function" && msCrypto.getRandomValues.bind(msCrypto), !_r))
    throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");
  return _r(zh);
}
const Ph = /^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i;
function mi(r) {
  return typeof r == "string" && Ph.test(r);
}
var me = [];
for (var ls = 0; ls < 256; ++ls)
  me.push((ls + 256).toString(16).substr(1));
function bi(r) {
  var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0, e = (me[r[t + 0]] + me[r[t + 1]] + me[r[t + 2]] + me[r[t + 3]] + "-" + me[r[t + 4]] + me[r[t + 5]] + "-" + me[r[t + 6]] + me[r[t + 7]] + "-" + me[r[t + 8]] + me[r[t + 9]] + "-" + me[r[t + 10]] + me[r[t + 11]] + me[r[t + 12]] + me[r[t + 13]] + me[r[t + 14]] + me[r[t + 15]]).toLowerCase();
  if (!mi(e))
    throw TypeError("Stringified UUID is invalid");
  return e;
}
var ta, hs, fs = 0, ds = 0;
function Fh(r, t, e) {
  var n = t && e || 0, i = t || new Array(16);
  r = r || {};
  var s = r.node || ta, l = r.clockseq !== void 0 ? r.clockseq : hs;
  if (s == null || l == null) {
    var h = r.random || (r.rng || ac)();
    s == null && (s = ta = [h[0] | 1, h[1], h[2], h[3], h[4], h[5]]), l == null && (l = hs = (h[6] << 8 | h[7]) & 16383);
  }
  var p = r.msecs !== void 0 ? r.msecs : Date.now(), v = r.nsecs !== void 0 ? r.nsecs : ds + 1, S = p - fs + (v - ds) / 1e4;
  if (S < 0 && r.clockseq === void 0 && (l = l + 1 & 16383), (S < 0 || p > fs) && r.nsecs === void 0 && (v = 0), v >= 1e4)
    throw new Error("uuid.v1(): Can't create more than 10M uuids/sec");
  fs = p, ds = v, hs = l, p += 122192928e5;
  var C = ((p & 268435455) * 1e4 + v) % 4294967296;
  i[n++] = C >>> 24 & 255, i[n++] = C >>> 16 & 255, i[n++] = C >>> 8 & 255, i[n++] = C & 255;
  var F = p / 4294967296 * 1e4 & 268435455;
  i[n++] = F >>> 8 & 255, i[n++] = F & 255, i[n++] = F >>> 24 & 15 | 16, i[n++] = F >>> 16 & 255, i[n++] = l >>> 8 | 128, i[n++] = l & 255;
  for (var U = 0; U < 6; ++U)
    i[n + U] = s[U];
  return t || bi(i);
}
function cc(r) {
  if (!mi(r))
    throw TypeError("Invalid UUID");
  var t, e = new Uint8Array(16);
  return e[0] = (t = parseInt(r.slice(0, 8), 16)) >>> 24, e[1] = t >>> 16 & 255, e[2] = t >>> 8 & 255, e[3] = t & 255, e[4] = (t = parseInt(r.slice(9, 13), 16)) >>> 8, e[5] = t & 255, e[6] = (t = parseInt(r.slice(14, 18), 16)) >>> 8, e[7] = t & 255, e[8] = (t = parseInt(r.slice(19, 23), 16)) >>> 8, e[9] = t & 255, e[10] = (t = parseInt(r.slice(24, 36), 16)) / 1099511627776 & 255, e[11] = t / 4294967296 & 255, e[12] = t >>> 24 & 255, e[13] = t >>> 16 & 255, e[14] = t >>> 8 & 255, e[15] = t & 255, e;
}
function _h(r) {
  r = unescape(encodeURIComponent(r));
  for (var t = [], e = 0; e < r.length; ++e)
    t.push(r.charCodeAt(e));
  return t;
}
var Wh = "6ba7b810-9dad-11d1-80b4-00c04fd430c8", qh = "6ba7b811-9dad-11d1-80b4-00c04fd430c8";
function uc(r, t, e) {
  function n(i, s, l, h) {
    if (typeof i == "string" && (i = _h(i)), typeof s == "string" && (s = cc(s)), s.length !== 16)
      throw TypeError("Namespace must be array-like (16 iterable integer values, 0-255)");
    var p = new Uint8Array(16 + i.length);
    if (p.set(s), p.set(i, s.length), p = e(p), p[6] = p[6] & 15 | t, p[8] = p[8] & 63 | 128, l) {
      h = h || 0;
      for (var v = 0; v < 16; ++v)
        l[h + v] = p[v];
      return l;
    }
    return bi(p);
  }
  try {
    n.name = r;
  } catch {
  }
  return n.DNS = Wh, n.URL = qh, n;
}
function Qh(r) {
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
function lc(r) {
  return (r + 64 >>> 9 << 4) + 14 + 1;
}
function Zh(r, t) {
  r[t >> 5] |= 128 << t % 32, r[lc(t) - 1] = t;
  for (var e = 1732584193, n = -271733879, i = -1732584194, s = 271733878, l = 0; l < r.length; l += 16) {
    var h = e, p = n, v = i, S = s;
    e = Ee(e, n, i, s, r[l], 7, -680876936), s = Ee(s, e, n, i, r[l + 1], 12, -389564586), i = Ee(i, s, e, n, r[l + 2], 17, 606105819), n = Ee(n, i, s, e, r[l + 3], 22, -1044525330), e = Ee(e, n, i, s, r[l + 4], 7, -176418897), s = Ee(s, e, n, i, r[l + 5], 12, 1200080426), i = Ee(i, s, e, n, r[l + 6], 17, -1473231341), n = Ee(n, i, s, e, r[l + 7], 22, -45705983), e = Ee(e, n, i, s, r[l + 8], 7, 1770035416), s = Ee(s, e, n, i, r[l + 9], 12, -1958414417), i = Ee(i, s, e, n, r[l + 10], 17, -42063), n = Ee(n, i, s, e, r[l + 11], 22, -1990404162), e = Ee(e, n, i, s, r[l + 12], 7, 1804603682), s = Ee(s, e, n, i, r[l + 13], 12, -40341101), i = Ee(i, s, e, n, r[l + 14], 17, -1502002290), n = Ee(n, i, s, e, r[l + 15], 22, 1236535329), e = Me(e, n, i, s, r[l + 1], 5, -165796510), s = Me(s, e, n, i, r[l + 6], 9, -1069501632), i = Me(i, s, e, n, r[l + 11], 14, 643717713), n = Me(n, i, s, e, r[l], 20, -373897302), e = Me(e, n, i, s, r[l + 5], 5, -701558691), s = Me(s, e, n, i, r[l + 10], 9, 38016083), i = Me(i, s, e, n, r[l + 15], 14, -660478335), n = Me(n, i, s, e, r[l + 4], 20, -405537848), e = Me(e, n, i, s, r[l + 9], 5, 568446438), s = Me(s, e, n, i, r[l + 14], 9, -1019803690), i = Me(i, s, e, n, r[l + 3], 14, -187363961), n = Me(n, i, s, e, r[l + 8], 20, 1163531501), e = Me(e, n, i, s, r[l + 13], 5, -1444681467), s = Me(s, e, n, i, r[l + 2], 9, -51403784), i = Me(i, s, e, n, r[l + 7], 14, 1735328473), n = Me(n, i, s, e, r[l + 12], 20, -1926607734), e = Se(e, n, i, s, r[l + 5], 4, -378558), s = Se(s, e, n, i, r[l + 8], 11, -2022574463), i = Se(i, s, e, n, r[l + 11], 16, 1839030562), n = Se(n, i, s, e, r[l + 14], 23, -35309556), e = Se(e, n, i, s, r[l + 1], 4, -1530992060), s = Se(s, e, n, i, r[l + 4], 11, 1272893353), i = Se(i, s, e, n, r[l + 7], 16, -155497632), n = Se(n, i, s, e, r[l + 10], 23, -1094730640), e = Se(e, n, i, s, r[l + 13], 4, 681279174), s = Se(s, e, n, i, r[l], 11, -358537222), i = Se(i, s, e, n, r[l + 3], 16, -722521979), n = Se(n, i, s, e, r[l + 6], 23, 76029189), e = Se(e, n, i, s, r[l + 9], 4, -640364487), s = Se(s, e, n, i, r[l + 12], 11, -421815835), i = Se(i, s, e, n, r[l + 15], 16, 530742520), n = Se(n, i, s, e, r[l + 2], 23, -995338651), e = Ie(e, n, i, s, r[l], 6, -198630844), s = Ie(s, e, n, i, r[l + 7], 10, 1126891415), i = Ie(i, s, e, n, r[l + 14], 15, -1416354905), n = Ie(n, i, s, e, r[l + 5], 21, -57434055), e = Ie(e, n, i, s, r[l + 12], 6, 1700485571), s = Ie(s, e, n, i, r[l + 3], 10, -1894986606), i = Ie(i, s, e, n, r[l + 10], 15, -1051523), n = Ie(n, i, s, e, r[l + 1], 21, -2054922799), e = Ie(e, n, i, s, r[l + 8], 6, 1873313359), s = Ie(s, e, n, i, r[l + 15], 10, -30611744), i = Ie(i, s, e, n, r[l + 6], 15, -1560198380), n = Ie(n, i, s, e, r[l + 13], 21, 1309151649), e = Ie(e, n, i, s, r[l + 4], 6, -145523070), s = Ie(s, e, n, i, r[l + 11], 10, -1120210379), i = Ie(i, s, e, n, r[l + 2], 15, 718787259), n = Ie(n, i, s, e, r[l + 9], 21, -343485551), e = Nn(e, h), n = Nn(n, p), i = Nn(i, v), s = Nn(s, S);
  }
  return [e, n, i, s];
}
function Yh(r) {
  if (r.length === 0)
    return [];
  for (var t = r.length * 8, e = new Uint32Array(lc(t)), n = 0; n < t; n += 8)
    e[n >> 5] |= (r[n / 8] & 255) << n % 32;
  return e;
}
function Nn(r, t) {
  var e = (r & 65535) + (t & 65535), n = (r >> 16) + (t >> 16) + (e >> 16);
  return n << 16 | e & 65535;
}
function Gh(r, t) {
  return r << t | r >>> 32 - t;
}
function vi(r, t, e, n, i, s) {
  return Nn(Gh(Nn(Nn(t, r), Nn(n, s)), i), e);
}
function Ee(r, t, e, n, i, s, l) {
  return vi(t & e | ~t & n, r, t, i, s, l);
}
function Me(r, t, e, n, i, s, l) {
  return vi(t & n | e & ~n, r, t, i, s, l);
}
function Se(r, t, e, n, i, s, l) {
  return vi(t ^ e ^ n, r, t, i, s, l);
}
function Ie(r, t, e, n, i, s, l) {
  return vi(e ^ (t | ~n), r, t, i, s, l);
}
var Kh = uc("v3", 48, Qh);
function Jh(r, t, e) {
  r = r || {};
  var n = r.random || (r.rng || ac)();
  if (n[6] = n[6] & 15 | 64, n[8] = n[8] & 63 | 128, t) {
    e = e || 0;
    for (var i = 0; i < 16; ++i)
      t[e + i] = n[i];
    return t;
  }
  return bi(n);
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
function gs(r, t) {
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
  for (var s = r.length / 4 + 2, l = Math.ceil(s / 16), h = new Array(l), p = 0; p < l; ++p) {
    for (var v = new Uint32Array(16), S = 0; S < 16; ++S)
      v[S] = r[p * 64 + S * 4] << 24 | r[p * 64 + S * 4 + 1] << 16 | r[p * 64 + S * 4 + 2] << 8 | r[p * 64 + S * 4 + 3];
    h[p] = v;
  }
  h[l - 1][14] = (r.length - 1) * 8 / Math.pow(2, 32), h[l - 1][14] = Math.floor(h[l - 1][14]), h[l - 1][15] = (r.length - 1) * 8 & 4294967295;
  for (var C = 0; C < l; ++C) {
    for (var F = new Uint32Array(80), U = 0; U < 16; ++U)
      F[U] = h[C][U];
    for (var z = 16; z < 80; ++z)
      F[z] = gs(F[z - 3] ^ F[z - 8] ^ F[z - 14] ^ F[z - 16], 1);
    for (var D = e[0], k = e[1], Z = e[2], _ = e[3], q = e[4], V = 0; V < 80; ++V) {
      var J = Math.floor(V / 20), X = gs(D, 5) + Vh(J, k, Z, _) + q + t[J] + F[V] >>> 0;
      q = _, _ = Z, Z = gs(k, 30) >>> 0, k = D, D = X;
    }
    e[0] = e[0] + D >>> 0, e[1] = e[1] + k >>> 0, e[2] = e[2] + Z >>> 0, e[3] = e[3] + _ >>> 0, e[4] = e[4] + q >>> 0;
  }
  return [e[0] >> 24 & 255, e[0] >> 16 & 255, e[0] >> 8 & 255, e[0] & 255, e[1] >> 24 & 255, e[1] >> 16 & 255, e[1] >> 8 & 255, e[1] & 255, e[2] >> 24 & 255, e[2] >> 16 & 255, e[2] >> 8 & 255, e[2] & 255, e[3] >> 24 & 255, e[3] >> 16 & 255, e[3] >> 8 & 255, e[3] & 255, e[4] >> 24 & 255, e[4] >> 16 & 255, e[4] >> 8 & 255, e[4] & 255];
}
var $h = uc("v5", 80, Xh);
const tf = "00000000-0000-0000-0000-000000000000";
function ef(r) {
  if (!mi(r))
    throw TypeError("Invalid UUID");
  return parseInt(r.substr(14, 1), 16);
}
const nf = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  NIL: tf,
  parse: cc,
  stringify: bi,
  v1: Fh,
  v3: Kh,
  v4: Jh,
  v5: $h,
  validate: mi,
  version: ef
}, Symbol.toStringTag, { value: "Module" })), hc = /* @__PURE__ */ Gs(nf);
var ps, ea;
function rf() {
  if (ea) return ps;
  ea = 1;
  const r = hc.v4;
  return ps = function(e, n, i, s) {
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
      const p = typeof s.generator == "function" ? s.generator : function() {
        return r();
      };
      h.id = p(h, s);
    } else l === 2 && i === null ? s.notificationIdNull && (h.id = null) : h.id = i;
    return h;
  }, ps;
}
var ws, na;
function sf() {
  if (na) return ws;
  na = 1;
  const r = hc.v4, t = rf(), e = function(n, i) {
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
  return ws = e, e.prototype.request = function(n, i, s, l) {
    const h = this;
    let p = null;
    const v = Array.isArray(n) && typeof i == "function";
    if (this.options.version === 1 && v)
      throw new TypeError("JSON-RPC 1.0 does not support batching");
    if (v || !v && n && typeof n == "object" && typeof i == "function")
      l = i, p = n;
    else {
      typeof s == "function" && (l = s, s = void 0);
      const F = typeof l == "function";
      try {
        p = t(n, i, s, {
          generator: this.options.generator,
          version: this.options.version,
          notificationIdNull: this.options.notificationIdNull
        });
      } catch (U) {
        if (F)
          return l(U);
        throw U;
      }
      if (!F)
        return p;
    }
    let C;
    try {
      C = JSON.stringify(p, this.options.replacer);
    } catch (F) {
      return l(F);
    }
    return this.callServer(C, function(F, U) {
      h._parseResponse(F, U, l);
    }), p;
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
        const h = function(v) {
          return typeof v.error < "u";
        }, p = function(v) {
          return !h(v);
        };
        return s(null, l.filter(h), l.filter(p));
      } else
        return s(null, l.error, l.result);
    s(null, l);
  }, ws;
}
var of = sf();
const af = /* @__PURE__ */ Tr(of);
var ys = { exports: {} }, ra;
function cf() {
  return ra || (ra = 1, function(r) {
    var t = Object.prototype.hasOwnProperty, e = "~";
    function n() {
    }
    Object.create && (n.prototype = /* @__PURE__ */ Object.create(null), new n().__proto__ || (e = !1));
    function i(p, v, S) {
      this.fn = p, this.context = v, this.once = S || !1;
    }
    function s(p, v, S, C, F) {
      if (typeof S != "function")
        throw new TypeError("The listener must be a function");
      var U = new i(S, C || p, F), z = e ? e + v : v;
      return p._events[z] ? p._events[z].fn ? p._events[z] = [p._events[z], U] : p._events[z].push(U) : (p._events[z] = U, p._eventsCount++), p;
    }
    function l(p, v) {
      --p._eventsCount === 0 ? p._events = new n() : delete p._events[v];
    }
    function h() {
      this._events = new n(), this._eventsCount = 0;
    }
    h.prototype.eventNames = function() {
      var v = [], S, C;
      if (this._eventsCount === 0) return v;
      for (C in S = this._events)
        t.call(S, C) && v.push(e ? C.slice(1) : C);
      return Object.getOwnPropertySymbols ? v.concat(Object.getOwnPropertySymbols(S)) : v;
    }, h.prototype.listeners = function(v) {
      var S = e ? e + v : v, C = this._events[S];
      if (!C) return [];
      if (C.fn) return [C.fn];
      for (var F = 0, U = C.length, z = new Array(U); F < U; F++)
        z[F] = C[F].fn;
      return z;
    }, h.prototype.listenerCount = function(v) {
      var S = e ? e + v : v, C = this._events[S];
      return C ? C.fn ? 1 : C.length : 0;
    }, h.prototype.emit = function(v, S, C, F, U, z) {
      var D = e ? e + v : v;
      if (!this._events[D]) return !1;
      var k = this._events[D], Z = arguments.length, _, q;
      if (k.fn) {
        switch (k.once && this.removeListener(v, k.fn, void 0, !0), Z) {
          case 1:
            return k.fn.call(k.context), !0;
          case 2:
            return k.fn.call(k.context, S), !0;
          case 3:
            return k.fn.call(k.context, S, C), !0;
          case 4:
            return k.fn.call(k.context, S, C, F), !0;
          case 5:
            return k.fn.call(k.context, S, C, F, U), !0;
          case 6:
            return k.fn.call(k.context, S, C, F, U, z), !0;
        }
        for (q = 1, _ = new Array(Z - 1); q < Z; q++)
          _[q - 1] = arguments[q];
        k.fn.apply(k.context, _);
      } else {
        var V = k.length, J;
        for (q = 0; q < V; q++)
          switch (k[q].once && this.removeListener(v, k[q].fn, void 0, !0), Z) {
            case 1:
              k[q].fn.call(k[q].context);
              break;
            case 2:
              k[q].fn.call(k[q].context, S);
              break;
            case 3:
              k[q].fn.call(k[q].context, S, C);
              break;
            case 4:
              k[q].fn.call(k[q].context, S, C, F);
              break;
            default:
              if (!_) for (J = 1, _ = new Array(Z - 1); J < Z; J++)
                _[J - 1] = arguments[J];
              k[q].fn.apply(k[q].context, _);
          }
      }
      return !0;
    }, h.prototype.on = function(v, S, C) {
      return s(this, v, S, C, !1);
    }, h.prototype.once = function(v, S, C) {
      return s(this, v, S, C, !0);
    }, h.prototype.removeListener = function(v, S, C, F) {
      var U = e ? e + v : v;
      if (!this._events[U]) return this;
      if (!S)
        return l(this, U), this;
      var z = this._events[U];
      if (z.fn)
        z.fn === S && (!F || z.once) && (!C || z.context === C) && l(this, U);
      else {
        for (var D = 0, k = [], Z = z.length; D < Z; D++)
          (z[D].fn !== S || F && !z[D].once || C && z[D].context !== C) && k.push(z[D]);
        k.length ? this._events[U] = k.length === 1 ? k[0] : k : l(this, U);
      }
      return this;
    }, h.prototype.removeAllListeners = function(v) {
      var S;
      return v ? (S = e ? e + v : v, this._events[S] && l(this, S)) : (this._events = new n(), this._eventsCount = 0), this;
    }, h.prototype.off = h.prototype.removeListener, h.prototype.addListener = h.prototype.on, h.prefixed = e, h.EventEmitter = h, r.exports = h;
  }(ys)), ys.exports;
}
var uf = cf();
const fc = /* @__PURE__ */ Tr(uf);
var lf = class extends fc {
  /** Instantiate a WebSocket class
  * @constructor
  * @param {String} address - url to a websocket server
  * @param {(Object)} options - websocket options
  * @param {(String|Array)} protocols - a list of protocols
  * @return {WebSocketBrowserImpl} - returns a WebSocket instance
  */
  constructor(t, e, n) {
    super();
    pe(this, "socket");
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
}, df = class extends fc {
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
  } = {}, p, v) {
    super();
    pe(this, "address");
    pe(this, "rpc_id");
    pe(this, "queue");
    pe(this, "options");
    pe(this, "autoconnect");
    pe(this, "ready");
    pe(this, "reconnect");
    pe(this, "reconnect_timer_id");
    pe(this, "reconnect_interval");
    pe(this, "max_reconnects");
    pe(this, "rest_options");
    pe(this, "current_reconnects");
    pe(this, "generate_request_id");
    pe(this, "socket");
    pe(this, "webSocketFactory");
    pe(this, "dataPack");
    this.webSocketFactory = t, this.queue = {}, this.rpc_id = 0, this.address = e, this.autoconnect = n, this.ready = !1, this.reconnect = i, this.reconnect_timer_id = void 0, this.reconnect_interval = s, this.max_reconnects = l, this.rest_options = h, this.current_reconnects = 0, this.generate_request_id = p || (() => typeof this.rpc_id == "number" ? ++this.rpc_id : Number(this.rpc_id) + 1), v ? this.dataPack = v : this.dataPack = new ff(), this.autoconnect && this._connect(this.address, {
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
      const h = this.generate_request_id(t, e), p = {
        jsonrpc: "2.0",
        method: t,
        params: e || void 0,
        id: h
      };
      this.socket.send(this.dataPack.encode(p), i, (v) => {
        if (v) return l(v);
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
      n instanceof ArrayBuffer && (n = St.Buffer.from(n).toString());
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
class dc extends qa {
  constructor(t, e) {
    super(), this.finished = !1, this.destroyed = !1, ol(t);
    const n = Js(e);
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
    return ei(this), this.iHash.update(t), this;
  }
  digestInto(t) {
    ei(this), pi(t, this.outputLen), this.finished = !0, this.iHash.digestInto(t), this.oHash.update(t), this.oHash.digestInto(t), this.destroy();
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
const gc = (r, t, e) => new dc(r, t).update(e).digest();
gc.create = (r, t) => new dc(r, t);
/*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */
function ia(r) {
  r.lowS !== void 0 && kn("lowS", r.lowS), r.prehash !== void 0 && kn("prehash", r.prehash);
}
function gf(r) {
  const t = to(r);
  kr(t, {
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
class pf extends Error {
  constructor(t = "") {
    super(t);
  }
}
const an = {
  // asn.1 DER encoding utils
  Err: pf,
  // Basic building block is TLV (Tag-Length-Value)
  _tlv: {
    encode: (r, t) => {
      const { Err: e } = an;
      if (r < 0 || r > 256)
        throw new e("tlv.encode: wrong tag");
      if (t.length & 1)
        throw new e("tlv.encode: unpadded data");
      const n = t.length / 2, i = Pr(n);
      if (i.length / 2 & 128)
        throw new e("tlv.encode: long form length too big");
      const s = n > 127 ? Pr(i.length / 2 | 128) : "";
      return Pr(r) + s + i + t;
    },
    // v - value, l - left bytes (unparsed)
    decode(r, t) {
      const { Err: e } = an;
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
        const p = i & 127;
        if (!p)
          throw new e("tlv.decode(long): indefinite length not supported");
        if (p > 4)
          throw new e("tlv.decode(long): byte length is too big");
        const v = t.subarray(n, n + p);
        if (v.length !== p)
          throw new e("tlv.decode: length bytes not complete");
        if (v[0] === 0)
          throw new e("tlv.decode(long): zero leftmost byte");
        for (const S of v)
          l = l << 8 | S;
        if (n += p, l < 128)
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
      const { Err: t } = an;
      if (r < un)
        throw new t("integer: negative integers are not allowed");
      let e = Pr(r);
      if (Number.parseInt(e[0], 16) & 8 && (e = "00" + e), e.length & 1)
        throw new t("unexpected DER parsing assertion: unpadded hex");
      return e;
    },
    decode(r) {
      const { Err: t } = an;
      if (r[0] & 128)
        throw new t("invalid signature integer: negative");
      if (r[0] === 0 && !(r[1] & 128))
        throw new t("invalid signature integer: unnecessary leading zero");
      return Fn(r);
    }
  },
  toSig(r) {
    const { Err: t, _int: e, _tlv: n } = an, i = de("signature", r), { v: s, l } = n.decode(48, i);
    if (l.length)
      throw new t("invalid signature: left bytes after parsing");
    const { v: h, l: p } = n.decode(2, s), { v, l: S } = n.decode(2, p);
    if (S.length)
      throw new t("invalid signature: left bytes after parsing");
    return { r: e.decode(h), s: e.decode(v) };
  },
  hexFromSig(r) {
    const { _tlv: t, _int: e } = an, n = t.encode(2, e.encode(r.r)), i = t.encode(2, e.encode(r.s)), s = n + i;
    return t.encode(48, s);
  }
}, un = BigInt(0), we = BigInt(1);
BigInt(2);
const sa = BigInt(3);
BigInt(4);
function wf(r) {
  const t = gf(r), { Fp: e } = t, n = yi(t.n, t.nBitLength), i = t.toBytes || ((D, k, Z) => {
    const _ = k.toAffine();
    return sr(Uint8Array.from([4]), e.toBytes(_.x), e.toBytes(_.y));
  }), s = t.fromBytes || ((D) => {
    const k = D.subarray(1), Z = e.fromBytes(k.subarray(0, e.BYTES)), _ = e.fromBytes(k.subarray(e.BYTES, 2 * e.BYTES));
    return { x: Z, y: _ };
  });
  function l(D) {
    const { a: k, b: Z } = t, _ = e.sqr(D), q = e.mul(_, D);
    return e.add(e.add(q, e.mul(D, k)), Z);
  }
  if (!e.eql(e.sqr(t.Gy), l(t.Gx)))
    throw new Error("bad generator point: equation left != right");
  function h(D) {
    return $s(D, we, t.n);
  }
  function p(D) {
    const { allowedPrivateKeyLengths: k, nByteLength: Z, wrapPrivateKey: _, n: q } = t;
    if (k && typeof D != "bigint") {
      if (rr(D) && (D = ir(D)), typeof D != "string" || !k.includes(D.length))
        throw new Error("invalid private key");
      D = D.padStart(Z * 2, "0");
    }
    let V;
    try {
      V = typeof D == "bigint" ? D : Fn(de("private key", D, Z));
    } catch {
      throw new Error("invalid private key, expected hex or " + Z + " bytes, got " + typeof D);
    }
    return _ && (V = Ft(V, q)), Ze("private key", V, we, q), V;
  }
  function v(D) {
    if (!(D instanceof F))
      throw new Error("ProjectivePoint expected");
  }
  const S = ii((D, k) => {
    const { px: Z, py: _, pz: q } = D;
    if (e.eql(q, e.ONE))
      return { x: Z, y: _ };
    const V = D.is0();
    k == null && (k = V ? e.ONE : e.inv(q));
    const J = e.mul(Z, k), X = e.mul(_, k), et = e.mul(q, k);
    if (V)
      return { x: e.ZERO, y: e.ZERO };
    if (!e.eql(et, e.ONE))
      throw new Error("invZ was invalid");
    return { x: J, y: X };
  }), C = ii((D) => {
    if (D.is0()) {
      if (t.allowInfinityPoint && !e.is0(D.py))
        return;
      throw new Error("bad point: ZERO");
    }
    const { x: k, y: Z } = D.toAffine();
    if (!e.isValid(k) || !e.isValid(Z))
      throw new Error("bad point: x or y not FE");
    const _ = e.sqr(Z), q = l(k);
    if (!e.eql(_, q))
      throw new Error("bad point: equation left != right");
    if (!D.isTorsionFree())
      throw new Error("bad point: not in prime-order subgroup");
    return !0;
  });
  class F {
    constructor(k, Z, _) {
      if (k == null || !e.isValid(k))
        throw new Error("x required");
      if (Z == null || !e.isValid(Z))
        throw new Error("y required");
      if (_ == null || !e.isValid(_))
        throw new Error("z required");
      this.px = k, this.py = Z, this.pz = _, Object.freeze(this);
    }
    // Does not validate if the point is on-curve.
    // Use fromHex instead, or call assertValidity() later.
    static fromAffine(k) {
      const { x: Z, y: _ } = k || {};
      if (!k || !e.isValid(Z) || !e.isValid(_))
        throw new Error("invalid affine point");
      if (k instanceof F)
        throw new Error("projective point not allowed");
      const q = (V) => e.eql(V, e.ZERO);
      return q(Z) && q(_) ? F.ZERO : new F(Z, _, e.ONE);
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
    static normalizeZ(k) {
      const Z = e.invertBatch(k.map((_) => _.pz));
      return k.map((_, q) => _.toAffine(Z[q])).map(F.fromAffine);
    }
    /**
     * Converts hash string or Uint8Array to Point.
     * @param hex short/long ECDSA hex
     */
    static fromHex(k) {
      const Z = F.fromAffine(s(de("pointHex", k)));
      return Z.assertValidity(), Z;
    }
    // Multiplies generator point by privateKey.
    static fromPrivateKey(k) {
      return F.BASE.multiply(p(k));
    }
    // Multiscalar Multiplication
    static msm(k, Z) {
      return nc(F, n, k, Z);
    }
    // "Private method", don't use it directly
    _setWindowSize(k) {
      z.setWindowSize(this, k);
    }
    // A point on curve is valid if it conforms to equation.
    assertValidity() {
      C(this);
    }
    hasEvenY() {
      const { y: k } = this.toAffine();
      if (e.isOdd)
        return !e.isOdd(k);
      throw new Error("Field doesn't support isOdd");
    }
    /**
     * Compare one point to another.
     */
    equals(k) {
      v(k);
      const { px: Z, py: _, pz: q } = this, { px: V, py: J, pz: X } = k, et = e.eql(e.mul(Z, X), e.mul(V, q)), N = e.eql(e.mul(_, X), e.mul(J, q));
      return et && N;
    }
    /**
     * Flips point to one corresponding to (x, -y) in Affine coordinates.
     */
    negate() {
      return new F(this.px, e.neg(this.py), this.pz);
    }
    // Renes-Costello-Batina exception-free doubling formula.
    // There is 30% faster Jacobian formula, but it is not complete.
    // https://eprint.iacr.org/2015/1060, algorithm 3
    // Cost: 8M + 3S + 3*a + 2*b3 + 15add.
    double() {
      const { a: k, b: Z } = t, _ = e.mul(Z, sa), { px: q, py: V, pz: J } = this;
      let X = e.ZERO, et = e.ZERO, N = e.ZERO, M = e.mul(q, q), x = e.mul(V, V), O = e.mul(J, J), R = e.mul(q, V);
      return R = e.add(R, R), N = e.mul(q, J), N = e.add(N, N), X = e.mul(k, N), et = e.mul(_, O), et = e.add(X, et), X = e.sub(x, et), et = e.add(x, et), et = e.mul(X, et), X = e.mul(R, X), N = e.mul(_, N), O = e.mul(k, O), R = e.sub(M, O), R = e.mul(k, R), R = e.add(R, N), N = e.add(M, M), M = e.add(N, M), M = e.add(M, O), M = e.mul(M, R), et = e.add(et, M), O = e.mul(V, J), O = e.add(O, O), M = e.mul(O, R), X = e.sub(X, M), N = e.mul(O, x), N = e.add(N, N), N = e.add(N, N), new F(X, et, N);
    }
    // Renes-Costello-Batina exception-free addition formula.
    // There is 30% faster Jacobian formula, but it is not complete.
    // https://eprint.iacr.org/2015/1060, algorithm 1
    // Cost: 12M + 0S + 3*a + 3*b3 + 23add.
    add(k) {
      v(k);
      const { px: Z, py: _, pz: q } = this, { px: V, py: J, pz: X } = k;
      let et = e.ZERO, N = e.ZERO, M = e.ZERO;
      const x = t.a, O = e.mul(t.b, sa);
      let R = e.mul(Z, V), b = e.mul(_, J), u = e.mul(q, X), d = e.add(Z, _), w = e.add(V, J);
      d = e.mul(d, w), w = e.add(R, b), d = e.sub(d, w), w = e.add(Z, q);
      let m = e.add(V, X);
      return w = e.mul(w, m), m = e.add(R, u), w = e.sub(w, m), m = e.add(_, q), et = e.add(J, X), m = e.mul(m, et), et = e.add(b, u), m = e.sub(m, et), M = e.mul(x, w), et = e.mul(O, u), M = e.add(et, M), et = e.sub(b, M), M = e.add(b, M), N = e.mul(et, M), b = e.add(R, R), b = e.add(b, R), u = e.mul(x, u), w = e.mul(O, w), b = e.add(b, u), u = e.sub(R, u), u = e.mul(x, u), w = e.add(w, u), R = e.mul(b, w), N = e.add(N, R), R = e.mul(m, w), et = e.mul(d, et), et = e.sub(et, R), R = e.mul(d, b), M = e.mul(m, M), M = e.add(M, R), new F(et, N, M);
    }
    subtract(k) {
      return this.add(k.negate());
    }
    is0() {
      return this.equals(F.ZERO);
    }
    wNAF(k) {
      return z.wNAFCached(this, k, F.normalizeZ);
    }
    /**
     * Non-constant-time multiplication. Uses double-and-add algorithm.
     * It's faster, but should only be used when you don't care about
     * an exposed private key e.g. sig verification, which works over *public* keys.
     */
    multiplyUnsafe(k) {
      const { endo: Z, n: _ } = t;
      Ze("scalar", k, un, _);
      const q = F.ZERO;
      if (k === un)
        return q;
      if (this.is0() || k === we)
        return this;
      if (!Z || z.hasPrecomputes(this))
        return z.wNAFCachedUnsafe(this, k, F.normalizeZ);
      let { k1neg: V, k1: J, k2neg: X, k2: et } = Z.splitScalar(k), N = q, M = q, x = this;
      for (; J > un || et > un; )
        J & we && (N = N.add(x)), et & we && (M = M.add(x)), x = x.double(), J >>= we, et >>= we;
      return V && (N = N.negate()), X && (M = M.negate()), M = new F(e.mul(M.px, Z.beta), M.py, M.pz), N.add(M);
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
    multiply(k) {
      const { endo: Z, n: _ } = t;
      Ze("scalar", k, we, _);
      let q, V;
      if (Z) {
        const { k1neg: J, k1: X, k2neg: et, k2: N } = Z.splitScalar(k);
        let { p: M, f: x } = this.wNAF(X), { p: O, f: R } = this.wNAF(N);
        M = z.constTimeNegate(J, M), O = z.constTimeNegate(et, O), O = new F(e.mul(O.px, Z.beta), O.py, O.pz), q = M.add(O), V = x.add(R);
      } else {
        const { p: J, f: X } = this.wNAF(k);
        q = J, V = X;
      }
      return F.normalizeZ([q, V])[0];
    }
    /**
     * Efficiently calculate `aP + bQ`. Unsafe, can expose private key, if used incorrectly.
     * Not using Strauss-Shamir trick: precomputation tables are faster.
     * The trick could be useful if both P and Q are not G (not in our case).
     * @returns non-zero affine point
     */
    multiplyAndAddUnsafe(k, Z, _) {
      const q = F.BASE, V = (X, et) => et === un || et === we || !X.equals(q) ? X.multiplyUnsafe(et) : X.multiply(et), J = V(this, Z).add(V(k, _));
      return J.is0() ? void 0 : J;
    }
    // Converts Projective point to affine (x, y) coordinates.
    // Can accept precomputed Z^-1 - for example, from invertBatch.
    // (x, y, z) ∋ (x=x/z, y=y/z)
    toAffine(k) {
      return S(this, k);
    }
    isTorsionFree() {
      const { h: k, isTorsionFree: Z } = t;
      if (k === we)
        return !0;
      if (Z)
        return Z(F, this);
      throw new Error("isTorsionFree() has not been declared for the elliptic curve");
    }
    clearCofactor() {
      const { h: k, clearCofactor: Z } = t;
      return k === we ? this : Z ? Z(F, this) : this.multiplyUnsafe(t.h);
    }
    toRawBytes(k = !0) {
      return kn("isCompressed", k), this.assertValidity(), i(F, this, k);
    }
    toHex(k = !0) {
      return kn("isCompressed", k), ir(this.toRawBytes(k));
    }
  }
  F.BASE = new F(t.Gx, t.Gy, e.ONE), F.ZERO = new F(e.ZERO, e.ONE, e.ZERO);
  const U = t.nBitLength, z = ec(F, t.endo ? Math.ceil(U / 2) : U);
  return {
    CURVE: t,
    ProjectivePoint: F,
    normPrivateKeyToScalar: p,
    weierstrassEquation: l,
    isWithinCurveOrder: h
  };
}
function yf(r) {
  const t = to(r);
  return kr(t, {
    hash: "hash",
    hmac: "function",
    randomBytes: "function"
  }, {
    bits2int: "function",
    bits2int_modN: "function",
    lowS: "boolean"
  }), Object.freeze({ lowS: !0, ...t });
}
function Af(r) {
  const t = yf(r), { Fp: e, n } = t, i = e.BYTES + 1, s = 2 * e.BYTES + 1;
  function l(u) {
    return Ft(u, n);
  }
  function h(u) {
    return Cs(u, n);
  }
  const { ProjectivePoint: p, normPrivateKeyToScalar: v, weierstrassEquation: S, isWithinCurveOrder: C } = wf({
    ...t,
    toBytes(u, d, w) {
      const m = d.toAffine(), y = e.toBytes(m.x), B = sr;
      return kn("isCompressed", w), w ? B(Uint8Array.from([d.hasEvenY() ? 2 : 3]), y) : B(Uint8Array.from([4]), y, e.toBytes(m.y));
    },
    fromBytes(u) {
      const d = u.length, w = u[0], m = u.subarray(1);
      if (d === i && (w === 2 || w === 3)) {
        const y = Fn(m);
        if (!$s(y, we, e.ORDER))
          throw new Error("Point is not on curve");
        const B = S(y);
        let P;
        try {
          P = e.sqrt(B);
        } catch (g) {
          const I = g instanceof Error ? ": " + g.message : "";
          throw new Error("Point is not on curve" + I);
        }
        const E = (P & we) === we;
        return (w & 1) === 1 !== E && (P = e.neg(P)), { x: y, y: P };
      } else if (d === s && w === 4) {
        const y = e.fromBytes(m.subarray(0, e.BYTES)), B = e.fromBytes(m.subarray(e.BYTES, 2 * e.BYTES));
        return { x: y, y: B };
      } else {
        const y = i, B = s;
        throw new Error("invalid Point, expected length of " + y + ", or uncompressed " + B + ", got " + d);
      }
    }
  }), F = (u) => ir(xr(u, t.nByteLength));
  function U(u) {
    const d = n >> we;
    return u > d;
  }
  function z(u) {
    return U(u) ? l(-u) : u;
  }
  const D = (u, d, w) => Fn(u.slice(d, w));
  class k {
    constructor(d, w, m) {
      Ze("r", d, we, n), Ze("s", w, we, n), this.r = d, this.s = w, m != null && (this.recovery = m), Object.freeze(this);
    }
    // pair (bytes of r, bytes of s)
    static fromCompact(d) {
      const w = t.nByteLength;
      return d = de("compactSignature", d, w * 2), new k(D(d, 0, w), D(d, w, 2 * w));
    }
    // DER encoded ECDSA signature
    // https://bitcoin.stackexchange.com/questions/57644/what-are-the-parts-of-a-bitcoin-transaction-input-script
    static fromDER(d) {
      const { r: w, s: m } = an.toSig(de("DER", d));
      return new k(w, m);
    }
    /**
     * @todo remove
     * @deprecated
     */
    assertValidity() {
    }
    addRecoveryBit(d) {
      return new k(this.r, this.s, d);
    }
    recoverPublicKey(d) {
      const { r: w, s: m, recovery: y } = this, B = X(de("msgHash", d));
      if (y == null || ![0, 1, 2, 3].includes(y))
        throw new Error("recovery id invalid");
      const P = y === 2 || y === 3 ? w + t.n : w;
      if (P >= e.ORDER)
        throw new Error("recovery id 2 or 3 invalid");
      const E = y & 1 ? "03" : "02", f = p.fromHex(E + F(P)), g = h(P), I = l(-B * g), L = l(m * g), H = p.BASE.multiplyAndAddUnsafe(f, I, L);
      if (!H)
        throw new Error("point at infinify");
      return H.assertValidity(), H;
    }
    // Signatures should be low-s, to prevent malleability.
    hasHighS() {
      return U(this.s);
    }
    normalizeS() {
      return this.hasHighS() ? new k(this.r, l(-this.s), this.recovery) : this;
    }
    // DER-encoded
    toDERRawBytes() {
      return ni(this.toDERHex());
    }
    toDERHex() {
      return an.hexFromSig({ r: this.r, s: this.s });
    }
    // padded bytes of r, then padded bytes of s
    toCompactRawBytes() {
      return ni(this.toCompactHex());
    }
    toCompactHex() {
      return F(this.r) + F(this.s);
    }
  }
  const Z = {
    isValidPrivateKey(u) {
      try {
        return v(u), !0;
      } catch {
        return !1;
      }
    },
    normPrivateKeyToScalar: v,
    /**
     * Produces cryptographically secure private key from random of size
     * (groupLen + ceil(groupLen / 2)) with modulo bias being negligible.
     */
    randomPrivateKey: () => {
      const u = Xa(t.n);
      return $l(t.randomBytes(u), t.n);
    },
    /**
     * Creates precompute table for an arbitrary EC point. Makes point "cached".
     * Allows to massively speed-up `point.multiply(scalar)`.
     * @returns cached point
     * @example
     * const fast = utils.precompute(8, ProjectivePoint.fromHex(someonesPubKey));
     * fast.multiply(privKey); // much faster ECDH now
     */
    precompute(u = 8, d = p.BASE) {
      return d._setWindowSize(u), d.multiply(BigInt(3)), d;
    }
  };
  function _(u, d = !0) {
    return p.fromPrivateKey(u).toRawBytes(d);
  }
  function q(u) {
    const d = rr(u), w = typeof u == "string", m = (d || w) && u.length;
    return d ? m === i || m === s : w ? m === 2 * i || m === 2 * s : u instanceof p;
  }
  function V(u, d, w = !0) {
    if (q(u))
      throw new Error("first arg must be private key");
    if (!q(d))
      throw new Error("second arg must be public key");
    return p.fromHex(d).multiply(v(u)).toRawBytes(w);
  }
  const J = t.bits2int || function(u) {
    if (u.length > 8192)
      throw new Error("input is too large");
    const d = Fn(u), w = u.length * 8 - t.nBitLength;
    return w > 0 ? d >> BigInt(w) : d;
  }, X = t.bits2int_modN || function(u) {
    return l(J(u));
  }, et = wi(t.nBitLength);
  function N(u) {
    return Ze("num < 2^" + t.nBitLength, u, un, et), xr(u, t.nByteLength);
  }
  function M(u, d, w = x) {
    if (["recovered", "canonical"].some((tt) => tt in w))
      throw new Error("sign() legacy options not supported");
    const { hash: m, randomBytes: y } = t;
    let { lowS: B, prehash: P, extraEntropy: E } = w;
    B == null && (B = !0), u = de("msgHash", u), ia(w), P && (u = de("prehashed msgHash", m(u)));
    const f = X(u), g = v(d), I = [N(g), N(f)];
    if (E != null && E !== !1) {
      const tt = E === !0 ? y(e.BYTES) : E;
      I.push(de("extraEntropy", tt));
    }
    const L = sr(...I), H = f;
    function K(tt) {
      const st = J(tt);
      if (!C(st))
        return;
      const xt = h(st), dt = p.BASE.multiply(st).toAffine(), mt = l(dt.x);
      if (mt === un)
        return;
      const bt = l(xt * l(H + mt * g));
      if (bt === un)
        return;
      let ht = (dt.x === mt ? 0 : 2) | Number(dt.y & we), pt = bt;
      return B && U(bt) && (pt = z(bt), ht ^= 1), new k(mt, pt, ht);
    }
    return { seed: L, k2sig: K };
  }
  const x = { lowS: t.lowS, prehash: !1 }, O = { lowS: t.lowS, prehash: !1 };
  function R(u, d, w = x) {
    const { seed: m, k2sig: y } = M(u, d, w), B = t;
    return Wl(B.hash.outputLen, B.nByteLength, B.hmac)(m, y);
  }
  p.BASE._setWindowSize(8);
  function b(u, d, w, m = O) {
    const y = u;
    d = de("msgHash", d), w = de("publicKey", w);
    const { lowS: B, prehash: P, format: E } = m;
    if (ia(m), "strict" in m)
      throw new Error("options.strict was renamed to lowS");
    if (E !== void 0 && E !== "compact" && E !== "der")
      throw new Error("format must be compact or der");
    const f = typeof y == "string" || rr(y), g = !f && !E && typeof y == "object" && y !== null && typeof y.r == "bigint" && typeof y.s == "bigint";
    if (!f && !g)
      throw new Error("invalid signature, expected Uint8Array, hex string or Signature instance");
    let I, L;
    try {
      if (g && (I = new k(y.r, y.s)), f) {
        try {
          E !== "compact" && (I = k.fromDER(y));
        } catch (ht) {
          if (!(ht instanceof an.Err))
            throw ht;
        }
        !I && E !== "der" && (I = k.fromCompact(y));
      }
      L = p.fromHex(w);
    } catch {
      return !1;
    }
    if (!I || B && I.hasHighS())
      return !1;
    P && (d = t.hash(d));
    const { r: H, s: K } = I, tt = X(d), st = h(K), xt = l(tt * st), dt = l(H * st), mt = p.BASE.multiplyAndAddUnsafe(L, xt, dt)?.toAffine();
    return mt ? l(mt.x) === H : !1;
  }
  return {
    CURVE: t,
    getPublicKey: _,
    getSharedSecret: V,
    sign: R,
    verify: b,
    ProjectivePoint: p,
    Signature: k,
    utils: Z
  };
}
/*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */
function mf(r) {
  return {
    hash: r,
    hmac: (t, ...e) => gc(r, t, ul(...e)),
    randomBytes: Ha
  };
}
function bf(r, t) {
  const e = (n) => Af({ ...r, ...mf(n) });
  return { ...e(t), create: e };
}
/*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */
const pc = BigInt("0xfffffffffffffffffffffffffffffffffffffffffffffffffffffffefffffc2f"), oa = BigInt("0xfffffffffffffffffffffffffffffffebaaedce6af48a03bbfd25e8cd0364141"), vf = BigInt(1), Rs = BigInt(2), aa = (r, t) => (r + t / Rs) / t;
function Ef(r) {
  const t = pc, e = BigInt(3), n = BigInt(6), i = BigInt(11), s = BigInt(22), l = BigInt(23), h = BigInt(44), p = BigInt(88), v = r * r * r % t, S = v * v * r % t, C = Ht(S, e, t) * S % t, F = Ht(C, e, t) * S % t, U = Ht(F, Rs, t) * v % t, z = Ht(U, i, t) * U % t, D = Ht(z, s, t) * z % t, k = Ht(D, h, t) * D % t, Z = Ht(k, p, t) * k % t, _ = Ht(Z, h, t) * D % t, q = Ht(_, e, t) * S % t, V = Ht(q, l, t) * z % t, J = Ht(V, n, t) * v % t, X = Ht(J, Rs, t);
  if (!Ds.eql(Ds.sqr(X), r))
    throw new Error("Cannot find square root");
  return X;
}
const Ds = yi(pc, void 0, void 0, { sqrt: Ef }), Mf = bf({
  a: BigInt(0),
  b: BigInt(7),
  Fp: Ds,
  n: oa,
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
      const t = oa, e = BigInt("0x3086d221a7d46bcde86c90e49284eb15"), n = -vf * BigInt("0xe4437ed6010e88286f547fa90abfe4c3"), i = BigInt("0x114ca50f7a8e2f3f657c1108d9d44cfd8"), s = e, l = BigInt("0x100000000000000000000000000000000"), h = aa(s * r, t), p = aa(-n * r, t);
      let v = Ft(r - h * e - p * i, t), S = Ft(-h * n - p * s, t);
      const C = v > l, F = S > l;
      if (C && (v = t - v), F && (S = t - S), v > l || S > l)
        throw new Error("splitScalar: Endomorphism failed, k=" + r);
      return { k1neg: C, k1: v, k2neg: F, k2: S };
    }
  }
}, Bs);
BigInt(0);
function ca(r) {
  try {
    return no.ExtendedPoint.fromHex(r), !0;
  } catch {
    return !1;
  }
}
const wc = (r, t) => no.sign(r, t.slice(0, 32)), Sf = no.verify, ar = (r) => St.Buffer.isBuffer(r) ? r : r instanceof Uint8Array ? St.Buffer.from(r.buffer, r.byteOffset, r.byteLength) : St.Buffer.from(r);
class If {
  constructor(t) {
    Object.assign(this, t);
  }
  encode() {
    return St.Buffer.from(us.serialize(Gr, this));
  }
  static decode(t) {
    return us.deserialize(Gr, this, t);
  }
  static decodeUnchecked(t) {
    return us.deserializeUnchecked(Gr, this, t);
  }
}
const Gr = /* @__PURE__ */ new Map();
var yc;
const xf = 32, Cn = 32;
function Bf(r) {
  return r._bn !== void 0;
}
let ua = 1;
class At extends If {
  /**
   * Create a new PublicKey object
   * @param value ed25519 public key as buffer or base-58 encoded string
   */
  constructor(t) {
    if (super({}), this._bn = void 0, Bf(t))
      this._bn = t._bn;
    else {
      if (typeof t == "string") {
        const e = ve.decode(t);
        if (e.length != Cn)
          throw new Error("Invalid public key input");
        this._bn = new Ho(e);
      } else
        this._bn = new Ho(t);
      if (this._bn.byteLength() > Cn)
        throw new Error("Invalid public key input");
    }
  }
  /**
   * Returns a unique PublicKey for tests and benchmarks using a counter
   */
  static unique() {
    const t = new At(ua);
    return ua += 1, new At(t.toBuffer());
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
    return ve.encode(this.toBytes());
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
    const t = this._bn.toArrayLike(St.Buffer);
    if (t.length === Cn)
      return t;
    const e = St.Buffer.alloc(32);
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
    const i = St.Buffer.concat([t.toBuffer(), St.Buffer.from(e), n.toBuffer()]), s = Bs(i);
    return new At(s);
  }
  /**
   * Derive a program address from seeds and a program ID.
   */
  /* eslint-disable require-await */
  static createProgramAddressSync(t, e) {
    let n = St.Buffer.alloc(0);
    t.forEach(function(s) {
      if (s.length > xf)
        throw new TypeError("Max seed length exceeded");
      n = St.Buffer.concat([n, ar(s)]);
    }), n = St.Buffer.concat([n, e.toBuffer(), St.Buffer.from("ProgramDerivedAddress")]);
    const i = Bs(n);
    if (ca(i))
      throw new Error("Invalid seeds, address must fall off the curve");
    return new At(i);
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
        const s = t.concat(St.Buffer.from([n]));
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
    const e = new At(t);
    return ca(e.toBytes());
  }
}
yc = At;
At.default = new yc("11111111111111111111111111111111");
Gr.set(At, {
  kind: "struct",
  fields: [["_bn", "u256"]]
});
new At("BPFLoader1111111111111111111111111111111111");
const er = 1232, ao = 127, li = 64;
class Ac extends Error {
  constructor(t) {
    super(`Signature ${t} has expired: block height exceeded.`), this.signature = void 0, this.signature = t;
  }
}
Object.defineProperty(Ac.prototype, "name", {
  value: "TransactionExpiredBlockheightExceededError"
});
class mc extends Error {
  constructor(t, e) {
    super(`Transaction was not confirmed in ${e.toFixed(2)} seconds. It is unknown if it succeeded or failed. Check signature ${t} using the Solana Explorer or CLI tools.`), this.signature = void 0, this.signature = t;
  }
}
Object.defineProperty(mc.prototype, "name", {
  value: "TransactionExpiredTimeoutError"
});
class Ar extends Error {
  constructor(t) {
    super(`Signature ${t} has expired: the nonce is no longer valid.`), this.signature = void 0, this.signature = t;
  }
}
Object.defineProperty(Ar.prototype, "name", {
  value: "TransactionExpiredNonceInvalidError"
});
class hi {
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
const It = (r = "publicKey") => W.blob(32, r), Nf = (r = "signature") => W.blob(64, r), Xn = (r = "string") => {
  const t = W.struct([W.u32("length"), W.u32("lengthPadding"), W.blob(W.offset(W.u32(), -8), "chars")], r), e = t.decode.bind(t), n = t.encode.bind(t), i = t;
  return i.decode = (s, l) => e(s, l).chars.toString(), i.encode = (s, l, h) => {
    const p = {
      chars: St.Buffer.from(s, "utf8")
    };
    return n(p, l, h);
  }, i.alloc = (s) => W.u32().span + W.u32().span + St.Buffer.from(s, "utf8").length, i;
}, Tf = (r = "authorized") => W.struct([It("staker"), It("withdrawer")], r), kf = (r = "lockup") => W.struct([W.ns64("unixTimestamp"), W.ns64("epoch"), It("custodian")], r), Cf = (r = "voteInit") => W.struct([It("nodePubkey"), It("authorizedVoter"), It("authorizedWithdrawer"), W.u8("commission")], r), Lf = (r = "voteAuthorizeWithSeedArgs") => W.struct([W.u32("voteAuthorizationType"), It("currentAuthorityDerivedKeyOwnerPubkey"), Xn("currentAuthorityDerivedKeySeed"), It("newAuthorized")], r);
function Ue(r) {
  let t = 0, e = 0;
  for (; ; ) {
    let n = r.shift();
    if (t |= (n & 127) << e * 7, e += 1, !(n & 128))
      break;
  }
  return t;
}
function je(r, t) {
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
function Pt(r, t) {
  if (!r)
    throw new Error(t || "Assertion failed");
}
class Ei {
  constructor(t, e) {
    this.payer = void 0, this.keyMetaMap = void 0, this.payer = t, this.keyMetaMap = e;
  }
  static compile(t, e) {
    const n = /* @__PURE__ */ new Map(), i = (l) => {
      const h = l.toBase58();
      let p = n.get(h);
      return p === void 0 && (p = {
        isSigner: !1,
        isWritable: !1,
        isInvoked: !1
      }, n.set(h, p)), p;
    }, s = i(e);
    s.isSigner = !0, s.isWritable = !0;
    for (const l of t) {
      i(l.programId).isInvoked = !0;
      for (const h of l.keys) {
        const p = i(h.pubkey);
        p.isSigner || (p.isSigner = h.isSigner), p.isWritable || (p.isWritable = h.isWritable);
      }
    }
    return new Ei(e, n);
  }
  getMessageComponents() {
    const t = [...this.keyMetaMap.entries()];
    Pt(t.length <= 256, "Max static account keys length exceeded");
    const e = t.filter(([, p]) => p.isSigner && p.isWritable), n = t.filter(([, p]) => p.isSigner && !p.isWritable), i = t.filter(([, p]) => !p.isSigner && p.isWritable), s = t.filter(([, p]) => !p.isSigner && !p.isWritable), l = {
      numRequiredSignatures: e.length + n.length,
      numReadonlySignedAccounts: n.length,
      numReadonlyUnsignedAccounts: s.length
    };
    {
      Pt(e.length > 0, "Expected at least one writable signer key");
      const [p] = e[0];
      Pt(p === this.payer.toBase58(), "Expected first writable signer key to be the fee payer");
    }
    const h = [...e.map(([p]) => new At(p)), ...n.map(([p]) => new At(p)), ...i.map(([p]) => new At(p)), ...s.map(([p]) => new At(p))];
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
        const h = new At(s), p = t.findIndex((v) => v.equals(h));
        p >= 0 && (Pt(p < 256, "Max lookup table index exceeded"), n.push(p), i.push(h), this.keyMetaMap.delete(s));
      }
    return [n, i];
  }
}
const bc = "Reached end of buffer unexpectedly";
function ln(r) {
  if (r.length === 0)
    throw new Error(bc);
  return r.shift();
}
function ze(r, ...t) {
  const [e] = t;
  if (t.length === 2 ? e + (t[1] ?? 0) > r.length : e >= r.length)
    throw new Error(bc);
  return r.splice(...t);
}
class fn {
  constructor(t) {
    this.header = void 0, this.accountKeys = void 0, this.recentBlockhash = void 0, this.instructions = void 0, this.indexToProgramIds = /* @__PURE__ */ new Map(), this.header = t.header, this.accountKeys = t.accountKeys.map((e) => new At(e)), this.recentBlockhash = t.recentBlockhash, this.instructions = t.instructions, this.instructions.forEach((e) => this.indexToProgramIds.set(e.programIdIndex, this.accountKeys[e.programIdIndex]));
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
      data: ve.decode(t.data)
    }));
  }
  get addressTableLookups() {
    return [];
  }
  getAccountKeys() {
    return new hi(this.staticAccountKeys);
  }
  static compile(t) {
    const e = Ei.compile(t.instructions, t.payerKey), [n, i] = e.getMessageComponents(), l = new hi(i).compileInstructions(t.instructions).map((h) => ({
      programIdIndex: h.programIdIndex,
      accounts: h.accountKeyIndexes,
      data: ve.encode(h.data)
    }));
    return new fn({
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
    je(e, t);
    const n = this.instructions.map((C) => {
      const {
        accounts: F,
        programIdIndex: U
      } = C, z = Array.from(ve.decode(C.data));
      let D = [];
      je(D, F.length);
      let k = [];
      return je(k, z.length), {
        programIdIndex: U,
        keyIndicesCount: St.Buffer.from(D),
        keyIndices: F,
        dataLength: St.Buffer.from(k),
        data: z
      };
    });
    let i = [];
    je(i, n.length);
    let s = St.Buffer.alloc(er);
    St.Buffer.from(i).copy(s);
    let l = i.length;
    n.forEach((C) => {
      const U = W.struct([W.u8("programIdIndex"), W.blob(C.keyIndicesCount.length, "keyIndicesCount"), W.seq(W.u8("keyIndex"), C.keyIndices.length, "keyIndices"), W.blob(C.dataLength.length, "dataLength"), W.seq(W.u8("userdatum"), C.data.length, "data")]).encode(C, s, l);
      l += U;
    }), s = s.slice(0, l);
    const h = W.struct([W.blob(1, "numRequiredSignatures"), W.blob(1, "numReadonlySignedAccounts"), W.blob(1, "numReadonlyUnsignedAccounts"), W.blob(e.length, "keyCount"), W.seq(It("key"), t, "keys"), It("recentBlockhash")]), p = {
      numRequiredSignatures: St.Buffer.from([this.header.numRequiredSignatures]),
      numReadonlySignedAccounts: St.Buffer.from([this.header.numReadonlySignedAccounts]),
      numReadonlyUnsignedAccounts: St.Buffer.from([this.header.numReadonlyUnsignedAccounts]),
      keyCount: St.Buffer.from(e),
      keys: this.accountKeys.map((C) => ar(C.toBytes())),
      recentBlockhash: ve.decode(this.recentBlockhash)
    };
    let v = St.Buffer.alloc(2048);
    const S = h.encode(p, v);
    return s.copy(v, S), v.slice(0, S + s.length);
  }
  /**
   * Decode a compiled message into a Message object.
   */
  static from(t) {
    let e = [...t];
    const n = ln(e);
    if (n !== (n & ao))
      throw new Error("Versioned messages must be deserialized with VersionedMessage.deserialize()");
    const i = ln(e), s = ln(e), l = Ue(e);
    let h = [];
    for (let F = 0; F < l; F++) {
      const U = ze(e, 0, Cn);
      h.push(new At(St.Buffer.from(U)));
    }
    const p = ze(e, 0, Cn), v = Ue(e);
    let S = [];
    for (let F = 0; F < v; F++) {
      const U = ln(e), z = Ue(e), D = ze(e, 0, z), k = Ue(e), Z = ze(e, 0, k), _ = ve.encode(St.Buffer.from(Z));
      S.push({
        programIdIndex: U,
        accounts: D,
        data: _
      });
    }
    const C = {
      header: {
        numRequiredSignatures: n,
        numReadonlySignedAccounts: i,
        numReadonlyUnsignedAccounts: s
      },
      recentBlockhash: ve.encode(St.Buffer.from(p)),
      accountKeys: h,
      instructions: S
    };
    return new fn(C);
  }
}
class Br {
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
    return new hi(this.staticAccountKeys, e);
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
    const e = Ei.compile(t.instructions, t.payerKey), n = new Array(), i = {
      writable: new Array(),
      readonly: new Array()
    }, s = t.addressLookupTableAccounts || [];
    for (const S of s) {
      const C = e.extractTableLookup(S);
      if (C !== void 0) {
        const [F, {
          writable: U,
          readonly: z
        }] = C;
        n.push(F), i.writable.push(...U), i.readonly.push(...z);
      }
    }
    const [l, h] = e.getMessageComponents(), v = new hi(h, i).compileInstructions(t.instructions);
    return new Br({
      header: l,
      staticAccountKeys: h,
      recentBlockhash: t.recentBlockhash,
      compiledInstructions: v,
      addressTableLookups: n
    });
  }
  serialize() {
    const t = Array();
    je(t, this.staticAccountKeys.length);
    const e = this.serializeInstructions(), n = Array();
    je(n, this.compiledInstructions.length);
    const i = this.serializeAddressTableLookups(), s = Array();
    je(s, this.addressTableLookups.length);
    const l = W.struct([W.u8("prefix"), W.struct([W.u8("numRequiredSignatures"), W.u8("numReadonlySignedAccounts"), W.u8("numReadonlyUnsignedAccounts")], "header"), W.blob(t.length, "staticAccountKeysLength"), W.seq(It(), this.staticAccountKeys.length, "staticAccountKeys"), It("recentBlockhash"), W.blob(n.length, "instructionsLength"), W.blob(e.length, "serializedInstructions"), W.blob(s.length, "addressTableLookupsLength"), W.blob(i.length, "serializedAddressTableLookups")]), h = new Uint8Array(er), v = l.encode({
      prefix: 128,
      header: this.header,
      staticAccountKeysLength: new Uint8Array(t),
      staticAccountKeys: this.staticAccountKeys.map((S) => S.toBytes()),
      recentBlockhash: ve.decode(this.recentBlockhash),
      instructionsLength: new Uint8Array(n),
      serializedInstructions: e,
      addressTableLookupsLength: new Uint8Array(s),
      serializedAddressTableLookups: i
    }, h);
    return h.slice(0, v);
  }
  serializeInstructions() {
    let t = 0;
    const e = new Uint8Array(er);
    for (const n of this.compiledInstructions) {
      const i = Array();
      je(i, n.accountKeyIndexes.length);
      const s = Array();
      je(s, n.data.length);
      const l = W.struct([W.u8("programIdIndex"), W.blob(i.length, "encodedAccountKeyIndexesLength"), W.seq(W.u8(), n.accountKeyIndexes.length, "accountKeyIndexes"), W.blob(s.length, "encodedDataLength"), W.blob(n.data.length, "data")]);
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
    const e = new Uint8Array(er);
    for (const n of this.addressTableLookups) {
      const i = Array();
      je(i, n.writableIndexes.length);
      const s = Array();
      je(s, n.readonlyIndexes.length);
      const l = W.struct([It("accountKey"), W.blob(i.length, "encodedWritableIndexesLength"), W.seq(W.u8(), n.writableIndexes.length, "writableIndexes"), W.blob(s.length, "encodedReadonlyIndexesLength"), W.seq(W.u8(), n.readonlyIndexes.length, "readonlyIndexes")]);
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
    const n = ln(e), i = n & ao;
    Pt(n !== i, "Expected versioned message but received legacy message");
    const s = i;
    Pt(s === 0, `Expected versioned message with version 0 but found version ${s}`);
    const l = {
      numRequiredSignatures: ln(e),
      numReadonlySignedAccounts: ln(e),
      numReadonlyUnsignedAccounts: ln(e)
    }, h = [], p = Ue(e);
    for (let z = 0; z < p; z++)
      h.push(new At(ze(e, 0, Cn)));
    const v = ve.encode(ze(e, 0, Cn)), S = Ue(e), C = [];
    for (let z = 0; z < S; z++) {
      const D = ln(e), k = Ue(e), Z = ze(e, 0, k), _ = Ue(e), q = new Uint8Array(ze(e, 0, _));
      C.push({
        programIdIndex: D,
        accountKeyIndexes: Z,
        data: q
      });
    }
    const F = Ue(e), U = [];
    for (let z = 0; z < F; z++) {
      const D = new At(ze(e, 0, Cn)), k = Ue(e), Z = ze(e, 0, k), _ = Ue(e), q = ze(e, 0, _);
      U.push({
        accountKey: D,
        writableIndexes: Z,
        readonlyIndexes: q
      });
    }
    return new Br({
      header: l,
      staticAccountKeys: h,
      recentBlockhash: v,
      compiledInstructions: C,
      addressTableLookups: U
    });
  }
}
const vc = {
  deserializeMessageVersion(r) {
    const t = r[0], e = t & ao;
    return e === t ? "legacy" : e;
  },
  deserialize: (r) => {
    const t = vc.deserializeMessageVersion(r);
    if (t === "legacy")
      return fn.from(r);
    if (t === 0)
      return Br.deserialize(r);
    throw new Error(`Transaction message version ${t} deserialization is not supported`);
  }
};
let En = /* @__PURE__ */ function(r) {
  return r[r.BLOCKHEIGHT_EXCEEDED = 0] = "BLOCKHEIGHT_EXCEEDED", r[r.PROCESSED = 1] = "PROCESSED", r[r.TIMED_OUT = 2] = "TIMED_OUT", r[r.NONCE_INVALID = 3] = "NONCE_INVALID", r;
}({});
const Rf = St.Buffer.alloc(li).fill(0);
class la {
  constructor(t) {
    this.keys = void 0, this.programId = void 0, this.data = St.Buffer.alloc(0), this.programId = t.programId, this.keys = t.keys, t.data && (this.data = t.data);
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
class xn {
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
      "instructions" in e ? this.instructions = this.instructions.concat(e.instructions) : "data" in e && "programId" in e && "keys" in e ? this.instructions.push(e) : this.instructions.push(new la(e));
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
      const k = D.programId.toString();
      i.includes(k) || i.push(k);
    }), i.forEach((D) => {
      s.push({
        pubkey: new At(D),
        isSigner: !1,
        isWritable: !1
      });
    });
    const l = [];
    s.forEach((D) => {
      const k = D.pubkey.toString(), Z = l.findIndex((_) => _.pubkey.toString() === k);
      Z > -1 ? (l[Z].isWritable = l[Z].isWritable || D.isWritable, l[Z].isSigner = l[Z].isSigner || D.isSigner) : l.push(D);
    }), l.sort(function(D, k) {
      if (D.isSigner !== k.isSigner)
        return D.isSigner ? -1 : 1;
      if (D.isWritable !== k.isWritable)
        return D.isWritable ? -1 : 1;
      const Z = {
        localeMatcher: "best fit",
        usage: "sort",
        sensitivity: "variant",
        ignorePunctuation: !1,
        numeric: !1,
        caseFirst: "lower"
      };
      return D.pubkey.toBase58().localeCompare(k.pubkey.toBase58(), "en", Z);
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
      const k = l.findIndex((Z) => Z.pubkey.equals(D.publicKey));
      if (k > -1)
        l[k].isSigner || (l[k].isSigner = !0, console.warn("Transaction references a signature that is unnecessary, only the fee payer and instruction signer accounts should sign a transaction. This behavior is deprecated and will throw an error in the next major version release."));
      else
        throw new Error(`unknown signer: ${D.publicKey.toString()}`);
    }
    let p = 0, v = 0, S = 0;
    const C = [], F = [];
    l.forEach(({
      pubkey: D,
      isSigner: k,
      isWritable: Z
    }) => {
      k ? (C.push(D.toString()), p += 1, Z || (v += 1)) : (F.push(D.toString()), Z || (S += 1));
    });
    const U = C.concat(F), z = e.map((D) => {
      const {
        data: k,
        programId: Z
      } = D;
      return {
        programIdIndex: U.indexOf(Z.toString()),
        accounts: D.keys.map((_) => U.indexOf(_.pubkey.toString())),
        data: ve.encode(k)
      };
    });
    return z.forEach((D) => {
      Pt(D.programIdIndex >= 0), D.accounts.forEach((k) => Pt(k >= 0));
    }), new fn({
      header: {
        numRequiredSignatures: p,
        numReadonlySignedAccounts: v,
        numReadonlyUnsignedAccounts: S
      },
      accountKeys: U,
      recentBlockhash: t,
      instructions: z
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
      const s = wc(n, i.secretKey);
      this._addSignature(i.publicKey, ar(s));
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
    Pt(e.length === 64);
    const n = this.signatures.findIndex((i) => t.equals(i.publicKey));
    if (n < 0)
      throw new Error(`unknown signer: ${t.toString()}`);
    this.signatures[n].signature = St.Buffer.from(e);
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
      i === null ? e && (n.missing || (n.missing = [])).push(s) : Sf(i, t, s.toBytes()) || (n.invalid || (n.invalid = [])).push(s);
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
    je(n, e.length);
    const i = n.length + e.length * 64 + t.length, s = St.Buffer.alloc(i);
    return Pt(e.length < 256), St.Buffer.from(n).copy(s, 0), e.forEach(({
      signature: l
    }, h) => {
      l !== null && (Pt(l.length === 64, "signature has invalid length"), St.Buffer.from(l).copy(s, n.length + h * 64));
    }), t.copy(s, n.length + e.length * 64), Pt(s.length <= er, `Transaction too large: ${s.length} > ${er}`), s;
  }
  /**
   * Deprecated method
   * @internal
   */
  get keys() {
    return Pt(this.instructions.length === 1), this.instructions[0].keys.map((t) => t.pubkey);
  }
  /**
   * Deprecated method
   * @internal
   */
  get programId() {
    return Pt(this.instructions.length === 1), this.instructions[0].programId;
  }
  /**
   * Deprecated method
   * @internal
   */
  get data() {
    return Pt(this.instructions.length === 1), this.instructions[0].data;
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
    const n = Ue(e);
    let i = [];
    for (let s = 0; s < n; s++) {
      const l = ze(e, 0, li);
      i.push(ve.encode(St.Buffer.from(l)));
    }
    return xn.populate(fn.from(e), i);
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
    const n = new xn();
    return n.recentBlockhash = t.recentBlockhash, t.header.numRequiredSignatures > 0 && (n.feePayer = t.accountKeys[0]), e.forEach((i, s) => {
      const l = {
        signature: i == ve.encode(Rf) ? null : ve.decode(i),
        publicKey: t.accountKeys[s]
      };
      n.signatures.push(l);
    }), t.instructions.forEach((i) => {
      const s = i.accounts.map((l) => {
        const h = t.accountKeys[l];
        return {
          pubkey: h,
          isSigner: n.signatures.some((p) => p.publicKey.toString() === h.toString()) || t.isAccountSigner(l),
          isWritable: t.isAccountWritable(l)
        };
      });
      n.instructions.push(new la({
        keys: s,
        programId: t.accountKeys[i.programIdIndex],
        data: ve.decode(i.data)
      }));
    }), n._message = t, n._json = n.toJSON(), n;
  }
}
class Ec {
  get version() {
    return this.message.version;
  }
  constructor(t, e) {
    if (this.signatures = void 0, this.message = void 0, e !== void 0)
      Pt(e.length === t.header.numRequiredSignatures, "Expected signatures length to be equal to the number of required signatures"), this.signatures = e;
    else {
      const n = [];
      for (let i = 0; i < t.header.numRequiredSignatures; i++)
        n.push(new Uint8Array(li));
      this.signatures = n;
    }
    this.message = t;
  }
  serialize() {
    const t = this.message.serialize(), e = Array();
    je(e, this.signatures.length);
    const n = W.struct([W.blob(e.length, "encodedSignaturesLength"), W.seq(Nf(), this.signatures.length, "signatures"), W.blob(t.length, "serializedMessage")]), i = new Uint8Array(2048), s = n.encode({
      encodedSignaturesLength: new Uint8Array(e),
      signatures: this.signatures,
      serializedMessage: t
    }, i);
    return i.slice(0, s);
  }
  static deserialize(t) {
    let e = [...t];
    const n = [], i = Ue(e);
    for (let l = 0; l < i; l++)
      n.push(new Uint8Array(ze(e, 0, li)));
    const s = vc.deserialize(new Uint8Array(e));
    return new Ec(s, n);
  }
  sign(t) {
    const e = this.message.serialize(), n = this.message.staticAccountKeys.slice(0, this.message.header.numRequiredSignatures);
    for (const i of t) {
      const s = n.findIndex((l) => l.equals(i.publicKey));
      Pt(s >= 0, `Cannot sign with non signer key ${i.publicKey.toBase58()}`), this.signatures[s] = wc(e, i.secretKey);
    }
  }
  addSignature(t, e) {
    Pt(e.byteLength === 64, "Signature must be 64 bytes long");
    const i = this.message.staticAccountKeys.slice(0, this.message.header.numRequiredSignatures).findIndex((s) => s.equals(t));
    Pt(i >= 0, `Can not add signature; \`${t.toBase58()}\` is not required to sign this transaction`), this.signatures[i] = e;
  }
}
const Df = 160, Of = 64, Uf = Df / Of, jf = 1e3 / Uf;
new At("SysvarC1ock11111111111111111111111111111111");
new At("SysvarEpochSchedu1e111111111111111111111111");
new At("Sysvar1nstructions1111111111111111111111111");
new At("SysvarRecentB1ockHashes11111111111111111111");
new At("SysvarRent111111111111111111111111111111111");
new At("SysvarRewards111111111111111111111111111111");
new At("SysvarS1otHashes111111111111111111111111111");
new At("SysvarS1otHistory11111111111111111111111111");
new At("SysvarStakeHistory1111111111111111111111111");
class ha extends Error {
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
        h = `Unknown action '${/* @__PURE__ */ ((p) => p)(t)}'`;
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
function Jn(r) {
  return new Promise((t) => setTimeout(t, r));
}
const zf = W.nu64("lamportsPerSignature"), Mc = W.struct([W.u32("version"), W.u32("state"), It("authorizedPubkey"), It("nonce"), W.struct([zf], "feeCalculator")]);
Mc.span;
class co {
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
    const e = Mc.decode(ar(t), 0);
    return new co({
      authorizedPubkey: new At(e.authorizedPubkey),
      nonce: new At(e.nonce).toString(),
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
  const e = W.blob(r, t), {
    encode: n,
    decode: i
  } = Pf(e), s = e;
  return s.decode = (l, h) => {
    const p = i(l, h);
    return Xo.toBigIntLE(St.Buffer.from(p));
  }, s.encode = (l, h, p) => {
    const v = Xo.toBufferLE(l, r);
    return n(v, h, p);
  }, s;
}, cr = Ff(8);
Object.freeze({
  Create: {
    index: 0,
    layout: W.struct([W.u32("instruction"), W.ns64("lamports"), W.ns64("space"), It("programId")])
  },
  Assign: {
    index: 1,
    layout: W.struct([W.u32("instruction"), It("programId")])
  },
  Transfer: {
    index: 2,
    layout: W.struct([W.u32("instruction"), cr("lamports")])
  },
  CreateWithSeed: {
    index: 3,
    layout: W.struct([W.u32("instruction"), It("base"), Xn("seed"), W.ns64("lamports"), W.ns64("space"), It("programId")])
  },
  AdvanceNonceAccount: {
    index: 4,
    layout: W.struct([W.u32("instruction")])
  },
  WithdrawNonceAccount: {
    index: 5,
    layout: W.struct([W.u32("instruction"), W.ns64("lamports")])
  },
  InitializeNonceAccount: {
    index: 6,
    layout: W.struct([W.u32("instruction"), It("authorized")])
  },
  AuthorizeNonceAccount: {
    index: 7,
    layout: W.struct([W.u32("instruction"), It("authorized")])
  },
  Allocate: {
    index: 8,
    layout: W.struct([W.u32("instruction"), W.ns64("space")])
  },
  AllocateWithSeed: {
    index: 9,
    layout: W.struct([W.u32("instruction"), It("base"), Xn("seed"), W.ns64("space"), It("programId")])
  },
  AssignWithSeed: {
    index: 10,
    layout: W.struct([W.u32("instruction"), It("base"), Xn("seed"), It("programId")])
  },
  TransferWithSeed: {
    index: 11,
    layout: W.struct([W.u32("instruction"), cr("lamports"), Xn("seed"), It("programId")])
  },
  UpgradeNonceAccount: {
    index: 12,
    layout: W.struct([W.u32("instruction")])
  }
});
new At("11111111111111111111111111111111");
new At("BPFLoader2111111111111111111111111111111111");
function _f(r) {
  return r && r.__esModule && Object.prototype.hasOwnProperty.call(r, "default") ? r.default : r;
}
var As, fa;
function Wf() {
  if (fa) return As;
  fa = 1;
  var r = Object.prototype.toString, t = Object.keys || function(n) {
    var i = [];
    for (var s in n)
      i.push(s);
    return i;
  };
  function e(n, i) {
    var s, l, h, p, v, S, C;
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
        if (C = r.call(n), C === "[object Array]") {
          for (h = "[", l = n.length - 1, s = 0; s < l; s++)
            h += e(n[s], !0) + ",";
          return l > -1 && (h += e(n[s], !0)), h + "]";
        } else if (C === "[object Object]") {
          for (p = t(n).sort(), l = p.length, h = "", s = 0; s < l; )
            v = p[s], S = e(n[v], !1), S !== void 0 && (h && (h += ","), h += JSON.stringify(v) + ":" + S), s++;
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
  return As = function(n) {
    var i = e(n, !1);
    if (i !== void 0)
      return "" + i;
  }, As;
}
var qf = /* @__PURE__ */ Wf(), da = /* @__PURE__ */ _f(qf);
const fr = 32;
function ms(r) {
  let t = 0;
  for (; r > 1; )
    r /= 2, t++;
  return t;
}
function Qf(r) {
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
      const e = ms(Qf(t + fr + 1)) - ms(fr) - 1, n = this.getSlotsInEpoch(e), i = t - (n - fr);
      return [e, i];
    } else {
      const e = t - this.firstNormalSlot, n = Math.floor(e / this.slotsPerEpoch), i = this.firstNormalEpoch + n, s = e % this.slotsPerEpoch;
      return [i, s];
    }
  }
  getFirstSlotInEpoch(t) {
    return t <= this.firstNormalEpoch ? (Math.pow(2, t) - 1) * fr : (t - this.firstNormalEpoch) * this.slotsPerEpoch + this.firstNormalSlot;
  }
  getLastSlotInEpoch(t) {
    return this.getFirstSlotInEpoch(t) + this.getSlotsInEpoch(t) - 1;
  }
  getSlotsInEpoch(t) {
    return t < this.firstNormalEpoch ? Math.pow(2, t + ms(fr)) : this.slotsPerEpoch;
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
const ga = 56;
class pa {
  constructor(t) {
    this.key = void 0, this.state = void 0, this.key = t.key, this.state = t.state;
  }
  isActive() {
    const t = BigInt("0xffffffffffffffff");
    return this.state.deactivationSlot === t;
  }
  static deserialize(t) {
    const e = Gf(Kf, t), n = t.length - ga;
    Pt(n >= 0, "lookup table is invalid"), Pt(n % 32 === 0, "lookup table is invalid");
    const i = n / 32, {
      addresses: s
    } = W.struct([W.seq(It(), i, "addresses")]).decode(t.slice(ga));
    return {
      deactivationSlot: e.deactivationSlot,
      lastExtendedSlot: e.lastExtendedSlot,
      lastExtendedSlotStartIndex: e.lastExtendedStartIndex,
      authority: e.authority.length !== 0 ? new At(e.authority[0]) : void 0,
      addresses: s.map((l) => new At(l))
    };
  }
}
const Kf = {
  index: 1,
  layout: W.struct([
    W.u32("typeIndex"),
    cr("deactivationSlot"),
    W.nu64("lastExtendedSlot"),
    W.u8("lastExtendedStartIndex"),
    W.u8(),
    // option
    W.seq(It(), W.offset(W.u8(), -1), "authority")
  ])
}, Jf = /^[^:]+:\/\/([^:[]+|\[[^\]]+\])(:\d+)?(.*)/i;
function Vf(r) {
  const t = r.match(Jf);
  if (t == null)
    throw TypeError(`Failed to validate endpoint URL \`${r}\``);
  const [
    e,
    // eslint-disable-line @typescript-eslint/no-unused-vars
    n,
    i,
    s
  ] = t, l = r.startsWith("https:") ? "wss:" : "ws:", h = i == null ? null : parseInt(i.slice(1), 10), p = (
    // Only shift the port by +1 as a convention for ws(s) only if given endpoint
    // is explicitly specifying the endpoint port (HTTP-based RPC), assuming
    // we're directly trying to connect to agave-validator's ws listening port.
    // When the endpoint omits the port, we're connecting to the protocol
    // default ports: http(80) or https(443) and it's assumed we're behind a reverse
    // proxy which manages WebSocket upgrade and backend port redirection.
    h == null ? "" : `:${h + 1}`
  );
  return `${l}//${n}${p}${s}`;
}
const Qt = Rr(so(At), nt(), (r) => new At(r)), Sc = oo([nt(), Wt("base64")]), uo = Rr(so(St.Buffer), Sc, (r) => St.Buffer.from(r[0], "base64")), Xf = 30 * 1e3;
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
function wa(r) {
  return r.map((t) => "memcmp" in t ? {
    ...t,
    memcmp: {
      ...t.memcmp,
      encoding: t.memcmp.encoding ?? "base58"
    }
  } : t);
}
function Ic(r) {
  return Te([$({
    jsonrpc: Wt("2.0"),
    id: nt(),
    result: r
  }), $({
    jsonrpc: Wt("2.0"),
    id: nt(),
    error: $({
      code: ur(),
      message: nt(),
      data: yt(Uh())
    })
  })]);
}
const t0 = Ic(ur());
function Mt(r) {
  return Rr(Ic(r), t0, (t) => "error" in t ? t : {
    ...t,
    result: rt(t.result, r)
  });
}
function Yt(r) {
  return Mt($({
    context: $({
      slot: Y()
    }),
    value: r
  }));
}
function Mi(r) {
  return $({
    context: $({
      slot: Y()
    }),
    value: r
  });
}
function bs(r, t) {
  return r === 0 ? new Br({
    header: t.header,
    staticAccountKeys: t.accountKeys.map((e) => new At(e)),
    recentBlockhash: t.recentBlockhash,
    compiledInstructions: t.instructions.map((e) => ({
      programIdIndex: e.programIdIndex,
      accountKeyIndexes: e.accounts,
      data: ve.decode(e.data)
    })),
    addressTableLookups: t.addressTableLookups
  }) : new fn(t);
}
const e0 = $({
  foundation: Y(),
  foundationTerm: Y(),
  initial: Y(),
  taper: Y(),
  terminal: Y()
}), n0 = Mt(it(ot($({
  epoch: Y(),
  effectiveSlot: Y(),
  amount: Y(),
  postBalance: Y(),
  commission: yt(ot(Y()))
})))), r0 = it($({
  slot: Y(),
  prioritizationFee: Y()
})), i0 = $({
  total: Y(),
  validator: Y(),
  foundation: Y(),
  epoch: Y()
}), s0 = $({
  epoch: Y(),
  slotIndex: Y(),
  slotsInEpoch: Y(),
  absoluteSlot: Y(),
  blockHeight: yt(Y()),
  transactionCount: yt(Y())
}), o0 = $({
  slotsPerEpoch: Y(),
  leaderScheduleSlotOffset: Y(),
  warmup: tn(),
  firstNormalEpoch: Y(),
  firstNormalSlot: Y()
}), a0 = oc(nt(), it(Y())), Wn = ot(Te([$({}), nt()])), c0 = $({
  err: Wn
}), u0 = Wt("receivedSignature"), l0 = $({
  "solana-core": nt(),
  "feature-set": yt(Y())
}), h0 = $({
  program: nt(),
  programId: Qt,
  parsed: ur()
}), f0 = $({
  programId: Qt,
  accounts: it(Qt),
  data: nt()
}), ya = Yt($({
  err: ot(Te([$({}), nt()])),
  logs: ot(it(nt())),
  accounts: yt(ot(it(ot($({
    executable: tn(),
    owner: nt(),
    lamports: Y(),
    data: it(nt()),
    rentEpoch: yt(Y())
  }))))),
  unitsConsumed: yt(Y()),
  returnData: yt(ot($({
    programId: nt(),
    data: oo([nt(), Wt("base64")])
  }))),
  innerInstructions: yt(ot(it($({
    index: Y(),
    instructions: it(Te([h0, f0]))
  }))))
})), d0 = Yt($({
  byIdentity: oc(nt(), it(Y())),
  range: $({
    firstSlot: Y(),
    lastSlot: Y()
  })
}));
function g0(r, t, e, n, i, s) {
  const l = e || Zf;
  let h;
  s != null && console.warn("You have supplied an `httpAgent` when creating a `Connection` in a browser environment.It has been ignored; `httpAgent` is only used in Node environments.");
  let p;
  return n && (p = async (S, C) => {
    const F = await new Promise((U, z) => {
      try {
        n(S, C, (D, k) => U([D, k]));
      } catch (D) {
        z(D);
      }
    });
    return await l(...F);
  }), new af(async (S, C) => {
    const F = {
      method: "POST",
      body: S,
      agent: h,
      headers: Object.assign({
        "Content-Type": "application/json"
      }, t || {}, gd)
    };
    try {
      let U = 5, z, D = 500;
      for (; p ? z = await p(r, F) : z = await l(r, F), !(z.status !== 429 || i === !0 || (U -= 1, U === 0)); )
        console.error(`Server responded with ${z.status} ${z.statusText}.  Retrying after ${D}ms delay...`), await Jn(D), D *= 2;
      const k = await z.text();
      z.ok ? C(null, k) : C(new Error(`${z.status} ${z.statusText}: ${k}`));
    } catch (U) {
      U instanceof Error && C(U);
    }
  }, {});
}
function p0(r) {
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
function w0(r) {
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
const y0 = Mt(e0), A0 = Mt(i0), m0 = Mt(r0), b0 = Mt(s0), v0 = Mt(o0), E0 = Mt(a0), M0 = Mt(Y()), S0 = Yt($({
  total: Y(),
  circulating: Y(),
  nonCirculating: Y(),
  nonCirculatingAccounts: it(Qt)
})), Os = $({
  amount: nt(),
  uiAmount: ot(Y()),
  decimals: Y(),
  uiAmountString: yt(nt())
}), I0 = Yt(it($({
  address: Qt,
  amount: nt(),
  uiAmount: ot(Y()),
  decimals: Y(),
  uiAmountString: yt(nt())
}))), x0 = Yt(it($({
  pubkey: Qt,
  account: $({
    executable: tn(),
    owner: Qt,
    lamports: Y(),
    data: uo,
    rentEpoch: Y()
  })
}))), Us = $({
  program: nt(),
  parsed: ur(),
  space: Y()
}), B0 = Yt(it($({
  pubkey: Qt,
  account: $({
    executable: tn(),
    owner: Qt,
    lamports: Y(),
    data: Us,
    rentEpoch: Y()
  })
}))), N0 = Yt(it($({
  lamports: Y(),
  address: Qt
}))), Nr = $({
  executable: tn(),
  owner: Qt,
  lamports: Y(),
  data: uo,
  rentEpoch: Y()
}), T0 = $({
  pubkey: Qt,
  account: Nr
}), k0 = Rr(Te([so(St.Buffer), Us]), Te([Sc, Us]), (r) => Array.isArray(r) ? rt(r, uo) : r), js = $({
  executable: tn(),
  owner: Qt,
  lamports: Y(),
  data: k0,
  rentEpoch: Y()
}), C0 = $({
  pubkey: Qt,
  account: js
}), L0 = $({
  state: Te([Wt("active"), Wt("inactive"), Wt("activating"), Wt("deactivating")]),
  active: Y(),
  inactive: Y()
}), R0 = Mt(it($({
  signature: nt(),
  slot: Y(),
  err: Wn,
  memo: ot(nt()),
  blockTime: yt(ot(Y()))
}))), D0 = Mt(it($({
  signature: nt(),
  slot: Y(),
  err: Wn,
  memo: ot(nt()),
  blockTime: yt(ot(Y()))
}))), O0 = $({
  subscription: Y(),
  result: Mi(Nr)
}), U0 = $({
  pubkey: Qt,
  account: Nr
}), j0 = $({
  subscription: Y(),
  result: Mi(U0)
}), z0 = $({
  parent: Y(),
  slot: Y(),
  root: Y()
}), P0 = $({
  subscription: Y(),
  result: z0
}), F0 = Te([$({
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
  err: nt()
})]), _0 = $({
  subscription: Y(),
  result: F0
}), W0 = $({
  subscription: Y(),
  result: Mi(Te([c0, u0]))
}), q0 = $({
  subscription: Y(),
  result: Y()
}), Q0 = $({
  pubkey: nt(),
  gossip: ot(nt()),
  tpu: ot(nt()),
  rpc: ot(nt()),
  version: ot(nt())
}), Aa = $({
  votePubkey: nt(),
  nodePubkey: nt(),
  activatedStake: Y(),
  epochVoteAccount: tn(),
  epochCredits: it(oo([Y(), Y(), Y()])),
  commission: Y(),
  lastVote: Y(),
  rootSlot: ot(Y())
}), H0 = Mt($({
  current: it(Aa),
  delinquent: it(Aa)
})), Z0 = Te([Wt("processed"), Wt("confirmed"), Wt("finalized")]), Y0 = $({
  slot: Y(),
  confirmations: ot(Y()),
  err: Wn,
  confirmationStatus: yt(Z0)
}), G0 = Yt(it(ot(Y0))), K0 = Mt(Y()), xc = $({
  accountKey: Qt,
  writableIndexes: it(Y()),
  readonlyIndexes: it(Y())
}), lo = $({
  signatures: it(nt()),
  message: $({
    accountKeys: it(nt()),
    header: $({
      numRequiredSignatures: Y(),
      numReadonlySignedAccounts: Y(),
      numReadonlyUnsignedAccounts: Y()
    }),
    instructions: it($({
      accounts: it(Y()),
      data: nt(),
      programIdIndex: Y()
    })),
    recentBlockhash: nt(),
    addressTableLookups: yt(it(xc))
  })
}), Bc = $({
  pubkey: Qt,
  signer: tn(),
  writable: tn(),
  source: yt(Te([Wt("transaction"), Wt("lookupTable")]))
}), Nc = $({
  accountKeys: it(Bc),
  signatures: it(nt())
}), Tc = $({
  parsed: ur(),
  program: nt(),
  programId: Qt
}), kc = $({
  accounts: it(Qt),
  data: nt(),
  programId: Qt
}), J0 = Te([kc, Tc]), V0 = Te([$({
  parsed: ur(),
  program: nt(),
  programId: nt()
}), $({
  accounts: it(nt()),
  data: nt(),
  programId: nt()
})]), Cc = Rr(J0, V0, (r) => "accounts" in r ? rt(r, kc) : rt(r, Tc)), Lc = $({
  signatures: it(nt()),
  message: $({
    accountKeys: it(Bc),
    instructions: it(Cc),
    recentBlockhash: nt(),
    addressTableLookups: yt(ot(it(xc)))
  })
}), fi = $({
  accountIndex: Y(),
  mint: nt(),
  owner: yt(nt()),
  programId: yt(nt()),
  uiTokenAmount: Os
}), Rc = $({
  writable: it(Qt),
  readonly: it(Qt)
}), Si = $({
  err: Wn,
  fee: Y(),
  innerInstructions: yt(ot(it($({
    index: Y(),
    instructions: it($({
      accounts: it(Y()),
      data: nt(),
      programIdIndex: Y()
    }))
  })))),
  preBalances: it(Y()),
  postBalances: it(Y()),
  logMessages: yt(ot(it(nt()))),
  preTokenBalances: yt(ot(it(fi))),
  postTokenBalances: yt(ot(it(fi))),
  loadedAddresses: yt(Rc),
  computeUnitsConsumed: yt(Y())
}), ho = $({
  err: Wn,
  fee: Y(),
  innerInstructions: yt(ot(it($({
    index: Y(),
    instructions: it(Cc)
  })))),
  preBalances: it(Y()),
  postBalances: it(Y()),
  logMessages: yt(ot(it(nt()))),
  preTokenBalances: yt(ot(it(fi))),
  postTokenBalances: yt(ot(it(fi))),
  loadedAddresses: yt(Rc),
  computeUnitsConsumed: yt(Y())
}), lr = Te([Wt(0), Wt("legacy")]), qn = $({
  pubkey: nt(),
  lamports: Y(),
  postBalance: ot(Y()),
  rewardType: ot(nt()),
  commission: yt(ot(Y()))
}), X0 = Mt(ot($({
  blockhash: nt(),
  previousBlockhash: nt(),
  parentSlot: Y(),
  transactions: it($({
    transaction: lo,
    meta: ot(Si),
    version: yt(lr)
  })),
  rewards: yt(it(qn)),
  blockTime: ot(Y()),
  blockHeight: ot(Y())
}))), $0 = Mt(ot($({
  blockhash: nt(),
  previousBlockhash: nt(),
  parentSlot: Y(),
  rewards: yt(it(qn)),
  blockTime: ot(Y()),
  blockHeight: ot(Y())
}))), td = Mt(ot($({
  blockhash: nt(),
  previousBlockhash: nt(),
  parentSlot: Y(),
  transactions: it($({
    transaction: Nc,
    meta: ot(Si),
    version: yt(lr)
  })),
  rewards: yt(it(qn)),
  blockTime: ot(Y()),
  blockHeight: ot(Y())
}))), ed = Mt(ot($({
  blockhash: nt(),
  previousBlockhash: nt(),
  parentSlot: Y(),
  transactions: it($({
    transaction: Lc,
    meta: ot(ho),
    version: yt(lr)
  })),
  rewards: yt(it(qn)),
  blockTime: ot(Y()),
  blockHeight: ot(Y())
}))), nd = Mt(ot($({
  blockhash: nt(),
  previousBlockhash: nt(),
  parentSlot: Y(),
  transactions: it($({
    transaction: Nc,
    meta: ot(ho),
    version: yt(lr)
  })),
  rewards: yt(it(qn)),
  blockTime: ot(Y()),
  blockHeight: ot(Y())
}))), rd = Mt(ot($({
  blockhash: nt(),
  previousBlockhash: nt(),
  parentSlot: Y(),
  rewards: yt(it(qn)),
  blockTime: ot(Y()),
  blockHeight: ot(Y())
}))), id = Mt(ot($({
  blockhash: nt(),
  previousBlockhash: nt(),
  parentSlot: Y(),
  transactions: it($({
    transaction: lo,
    meta: ot(Si)
  })),
  rewards: yt(it(qn)),
  blockTime: ot(Y())
}))), ma = Mt(ot($({
  blockhash: nt(),
  previousBlockhash: nt(),
  parentSlot: Y(),
  signatures: it(nt()),
  blockTime: ot(Y())
}))), vs = Mt(ot($({
  slot: Y(),
  meta: ot(Si),
  blockTime: yt(ot(Y())),
  transaction: lo,
  version: yt(lr)
}))), Wr = Mt(ot($({
  slot: Y(),
  transaction: Lc,
  meta: ot(ho),
  blockTime: yt(ot(Y())),
  version: yt(lr)
}))), sd = Yt($({
  blockhash: nt(),
  lastValidBlockHeight: Y()
})), od = Yt(tn()), ad = $({
  slot: Y(),
  numTransactions: Y(),
  numSlots: Y(),
  samplePeriodSecs: Y()
}), cd = Mt(it(ad)), ud = Yt(ot($({
  feeCalculator: $({
    lamportsPerSignature: Y()
  })
}))), ld = Mt(nt()), hd = Mt(nt()), fd = $({
  err: Wn,
  logs: it(nt()),
  signature: nt()
}), dd = $({
  result: Mi(fd),
  subscription: Y()
}), gd = {
  "solana-client": "js/1.0.0-maintenance"
};
class pd {
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
      const v = {};
      return async (S) => {
        const {
          commitment: C,
          config: F
        } = Ot(S), U = this._buildArgs([], C, void 0, F), z = da(U);
        return v[z] = v[z] ?? (async () => {
          try {
            const D = await this._rpcRequest("getBlockHeight", U), k = rt(D, Mt(Y()));
            if ("error" in k)
              throw new ft(k.error, "failed to get block height information");
            return k.result;
          } finally {
            delete v[z];
          }
        })(), await v[z];
      };
    })();
    let n, i, s, l, h, p;
    e && typeof e == "string" ? this._commitment = e : e && (this._commitment = e.commitment, this._confirmTransactionInitialTimeout = e.confirmTransactionInitialTimeout, n = e.wsEndpoint, i = e.httpHeaders, s = e.fetch, l = e.fetchMiddleware, h = e.disableRetryOnRateLimit, p = e.httpAgent), this._rpcEndpoint = $f(t), this._rpcWsEndpoint = n || Vf(t), this._rpcClient = g0(t, i, s, l, h, p), this._rpcRequest = p0(this._rpcClient), this._rpcBatchRequest = w0(this._rpcClient), this._rpcWebSocket = new Yf(this._rpcWsEndpoint, {
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
    } = Ot(e), s = this._buildArgs([t.toBase58()], n, void 0, i), l = await this._rpcRequest("getBalance", s), h = rt(l, Yt(Y()));
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
    const e = await this._rpcRequest("getBlockTime", [t]), n = rt(e, Mt(ot(Y())));
    if ("error" in n)
      throw new ft(n.error, `failed to get block time for slot ${t}`);
    return n.result;
  }
  /**
   * Fetch the lowest slot that the node has information about in its ledger.
   * This value may increase over time if the node is configured to purge older ledger data
   */
  async getMinimumLedgerSlot() {
    const t = await this._rpcRequest("minimumLedgerSlot", []), e = rt(t, Mt(Y()));
    if ("error" in e)
      throw new ft(e.error, "failed to get minimum ledger slot");
    return e.result;
  }
  /**
   * Fetch the slot of the lowest confirmed block that has not been purged from the ledger
   */
  async getFirstAvailableBlock() {
    const t = await this._rpcRequest("getFirstAvailableBlock", []), e = rt(t, M0);
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
    const n = await this._rpcRequest("getSupply", [e]), i = rt(n, S0);
    if ("error" in i)
      throw new ft(i.error, "failed to get supply");
    return i.result;
  }
  /**
   * Fetch the current supply of a token mint
   */
  async getTokenSupply(t, e) {
    const n = this._buildArgs([t.toBase58()], e), i = await this._rpcRequest("getTokenSupply", n), s = rt(i, Yt(Os));
    if ("error" in s)
      throw new ft(s.error, "failed to get token supply");
    return s.result;
  }
  /**
   * Fetch the current balance of a token account
   */
  async getTokenAccountBalance(t, e) {
    const n = this._buildArgs([t.toBase58()], e), i = await this._rpcRequest("getTokenAccountBalance", n), s = rt(i, Yt(Os));
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
    } = Ot(n);
    let l = [t.toBase58()];
    "mint" in e ? l.push({
      mint: e.mint.toBase58()
    }) : l.push({
      programId: e.programId.toBase58()
    });
    const h = this._buildArgs(l, i, "base64", s), p = await this._rpcRequest("getTokenAccountsByOwner", h), v = rt(p, x0);
    if ("error" in v)
      throw new ft(v.error, `failed to get token accounts owned by account ${t.toBase58()}`);
    return v.result;
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
    const s = this._buildArgs(i, n, "jsonParsed"), l = await this._rpcRequest("getTokenAccountsByOwner", s), h = rt(l, B0);
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
    }, n = e.filter || e.commitment ? [e] : [], i = await this._rpcRequest("getLargestAccounts", n), s = rt(i, N0);
    if ("error" in s)
      throw new ft(s.error, "failed to get largest accounts");
    return s.result;
  }
  /**
   * Fetch the 20 largest token accounts with their current balances
   * for a given mint.
   */
  async getTokenLargestAccounts(t, e) {
    const n = this._buildArgs([t.toBase58()], e), i = await this._rpcRequest("getTokenLargestAccounts", n), s = rt(i, I0);
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
    } = Ot(e), s = this._buildArgs([t.toBase58()], n, "base64", i), l = await this._rpcRequest("getAccountInfo", s), h = rt(l, Yt(ot(Nr)));
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
    } = Ot(e), s = this._buildArgs([t.toBase58()], n, "jsonParsed", i), l = await this._rpcRequest("getAccountInfo", s), h = rt(l, Yt(ot(js)));
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
    } = Ot(e), s = t.map((v) => v.toBase58()), l = this._buildArgs([s], n, "jsonParsed", i), h = await this._rpcRequest("getMultipleAccounts", l), p = rt(h, Yt(it(ot(js))));
    if ("error" in p)
      throw new ft(p.error, `failed to get info for accounts ${s}`);
    return p.result;
  }
  /**
   * Fetch all the account info for multiple accounts specified by an array of public keys, return with context
   */
  async getMultipleAccountsInfoAndContext(t, e) {
    const {
      commitment: n,
      config: i
    } = Ot(e), s = t.map((v) => v.toBase58()), l = this._buildArgs([s], n, "base64", i), h = await this._rpcRequest("getMultipleAccounts", l), p = rt(h, Yt(it(ot(Nr))));
    if ("error" in p)
      throw new ft(p.error, `failed to get info for accounts ${s}`);
    return p.result;
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
    }), h = await this._rpcRequest("getStakeActivation", l), p = rt(h, Mt(L0));
    if ("error" in p)
      throw new ft(p.error, `failed to get Stake Activation ${t.toBase58()}`);
    return p.result;
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
        filters: wa(l.filters)
      } : null
    }), p = await this._rpcRequest("getProgramAccounts", h), v = it(T0), S = l.withContext === !0 ? rt(p, Yt(v)) : rt(p, Mt(v));
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
    } = Ot(e), s = this._buildArgs([t.toBase58()], n, "jsonParsed", i), l = await this._rpcRequest("getProgramAccounts", s), h = rt(l, Mt(it(C0)));
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
      i = ve.decode(n);
    } catch {
      throw new Error("signature must be base58 encoded: " + n);
    }
    return Pt(i.length === 64, "signature has invalid length"), typeof t == "string" ? await this.confirmTransactionUsingLegacyTimeoutStrategy({
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
    const l = new Promise((p, v) => {
      try {
        n = this.onSignature(e, (C, F) => {
          n = void 0;
          const U = {
            context: F,
            value: C
          };
          p({
            __type: En.PROCESSED,
            response: U
          });
        }, t);
        const S = new Promise((C) => {
          n == null ? C() : i = this._onSubscriptionStateChange(n, (F) => {
            F === "subscribed" && C();
          });
        });
        (async () => {
          if (await S, s) return;
          const C = await this.getSignatureStatus(e);
          if (s || C == null)
            return;
          const {
            context: F,
            value: U
          } = C;
          if (U != null)
            if (U?.err)
              v(U.err);
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
              s = !0, p({
                __type: En.PROCESSED,
                response: {
                  context: F,
                  value: U
                }
              });
            }
        })();
      } catch (S) {
        v(S);
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
    const l = new Promise((C) => {
      const F = async () => {
        try {
          return await this.getBlockHeight(t);
        } catch {
          return -1;
        }
      };
      (async () => {
        let U = await F();
        if (!s) {
          for (; U <= n; )
            if (await Jn(1e3), s || (U = await F(), s)) return;
          C({
            __type: En.BLOCKHEIGHT_EXCEEDED
          });
        }
      })();
    }), {
      abortConfirmation: h,
      confirmationPromise: p
    } = this.getTransactionConfirmationPromise({
      commitment: t,
      signature: i
    }), v = this.getCancellationPromise(e);
    let S;
    try {
      const C = await Promise.race([v, p, l]);
      if (C.__type === En.PROCESSED)
        S = C.response;
      else
        throw new Ac(i);
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
      signature: l
    }
  }) {
    let h = !1;
    const p = new Promise((U) => {
      let z = s, D = null;
      const k = async () => {
        try {
          const {
            context: Z,
            value: _
          } = await this.getNonceAndContext(i, {
            commitment: t,
            minContextSlot: n
          });
          return D = Z.slot, _?.nonce;
        } catch {
          return z;
        }
      };
      (async () => {
        if (z = await k(), !h)
          for (; ; ) {
            if (s !== z) {
              U({
                __type: En.NONCE_INVALID,
                slotInWhichNonceDidAdvance: D
              });
              return;
            }
            if (await Jn(2e3), h || (z = await k(), h)) return;
          }
      })();
    }), {
      abortConfirmation: v,
      confirmationPromise: S
    } = this.getTransactionConfirmationPromise({
      commitment: t,
      signature: l
    }), C = this.getCancellationPromise(e);
    let F;
    try {
      const U = await Promise.race([C, S, p]);
      if (U.__type === En.PROCESSED)
        F = U.response;
      else {
        let z;
        for (; ; ) {
          const D = await this.getSignatureStatus(l);
          if (D == null)
            break;
          if (D.context.slot < (U.slotInWhichNonceDidAdvance ?? n)) {
            await Jn(400);
            continue;
          }
          z = D;
          break;
        }
        if (z?.value) {
          const D = t || "finalized", {
            confirmationStatus: k
          } = z.value;
          switch (D) {
            case "processed":
            case "recent":
              if (k !== "processed" && k !== "confirmed" && k !== "finalized")
                throw new Ar(l);
              break;
            case "confirmed":
            case "single":
            case "singleGossip":
              if (k !== "confirmed" && k !== "finalized")
                throw new Ar(l);
              break;
            case "finalized":
            case "max":
            case "root":
              if (k !== "finalized")
                throw new Ar(l);
              break;
            default:
          }
          F = {
            context: z.context,
            value: {
              err: z.value.err
            }
          };
        } else
          throw new Ar(l);
      }
    } finally {
      h = !0, v();
    }
    return F;
  }
  async confirmTransactionUsingLegacyTimeoutStrategy({
    commitment: t,
    signature: e
  }) {
    let n;
    const i = new Promise((p) => {
      let v = this._confirmTransactionInitialTimeout || 6e4;
      switch (t) {
        case "processed":
        case "recent":
        case "single":
        case "confirmed":
        case "singleGossip": {
          v = this._confirmTransactionInitialTimeout || 3e4;
          break;
        }
      }
      n = setTimeout(() => p({
        __type: En.TIMED_OUT,
        timeoutMs: v
      }), v);
    }), {
      abortConfirmation: s,
      confirmationPromise: l
    } = this.getTransactionConfirmationPromise({
      commitment: t,
      signature: e
    });
    let h;
    try {
      const p = await Promise.race([l, i]);
      if (p.__type === En.PROCESSED)
        h = p.response;
      else
        throw new mc(e, p.timeoutMs / 1e3);
    } finally {
      clearTimeout(n), s();
    }
    return h;
  }
  /**
   * Return the list of nodes that are currently participating in the cluster
   */
  async getClusterNodes() {
    const t = await this._rpcRequest("getClusterNodes", []), e = rt(t, Mt(it(Q0)));
    if ("error" in e)
      throw new ft(e.error, "failed to get cluster nodes");
    return e.result;
  }
  /**
   * Return the list of nodes that are currently participating in the cluster
   */
  async getVoteAccounts(t) {
    const e = this._buildArgs([], t), n = await this._rpcRequest("getVoteAccounts", e), i = rt(n, H0);
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
    } = Ot(t), i = this._buildArgs([], e, void 0, n), s = await this._rpcRequest("getSlot", i), l = rt(s, Mt(Y()));
    if ("error" in l)
      throw new ft(l.error, "failed to get slot");
    return l.result;
  }
  /**
   * Fetch the current slot leader of the cluster
   */
  async getSlotLeader(t) {
    const {
      commitment: e,
      config: n
    } = Ot(t), i = this._buildArgs([], e, void 0, n), s = await this._rpcRequest("getSlotLeader", i), l = rt(s, Mt(nt()));
    if ("error" in l)
      throw new ft(l.error, "failed to get slot leader");
    return l.result;
  }
  /**
   * Fetch `limit` number of slot leaders starting from `startSlot`
   *
   * @param startSlot fetch slot leaders starting from this slot
   * @param limit number of slot leaders to return
   */
  async getSlotLeaders(t, e) {
    const n = [t, e], i = await this._rpcRequest("getSlotLeaders", n), s = rt(i, Mt(it(Qt)));
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
    Pt(i.length === 1);
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
    const i = await this._rpcRequest("getSignatureStatuses", n), s = rt(i, G0);
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
    } = Ot(t), i = this._buildArgs([], e, void 0, n), s = await this._rpcRequest("getTransactionCount", i), l = rt(s, Mt(Y()));
    if ("error" in l)
      throw new ft(l.error, "failed to get transaction count");
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
    const e = this._buildArgs([], t), n = await this._rpcRequest("getInflationGovernor", e), i = rt(n, y0);
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
    } = Ot(n), l = this._buildArgs([t.map((v) => v.toBase58())], i, void 0, {
      ...s,
      epoch: e ?? s?.epoch
    }), h = await this._rpcRequest("getInflationReward", l), p = rt(h, n0);
    if ("error" in p)
      throw new ft(p.error, "failed to get inflation reward");
    return p.result;
  }
  /**
   * Fetch the specific inflation values for the current epoch
   */
  async getInflationRate() {
    const t = await this._rpcRequest("getInflationRate", []), e = rt(t, A0);
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
    } = Ot(t), i = this._buildArgs([], e, void 0, n), s = await this._rpcRequest("getEpochInfo", i), l = rt(s, b0);
    if ("error" in l)
      throw new ft(l.error, "failed to get epoch info");
    return l.result;
  }
  /**
   * Fetch the Epoch Schedule parameters
   */
  async getEpochSchedule() {
    const t = await this._rpcRequest("getEpochSchedule", []), e = rt(t, v0);
    if ("error" in e)
      throw new ft(e.error, "failed to get epoch schedule");
    const n = e.result;
    return new Hf(n.slotsPerEpoch, n.leaderScheduleSlotOffset, n.warmup, n.firstNormalEpoch, n.firstNormalSlot);
  }
  /**
   * Fetch the leader schedule for the current epoch
   * @return {Promise<RpcResponseAndContext<LeaderSchedule>>}
   */
  async getLeaderSchedule() {
    const t = await this._rpcRequest("getLeaderSchedule", []), e = rt(t, E0);
    if ("error" in e)
      throw new ft(e.error, "failed to get leader schedule");
    return e.result;
  }
  /**
   * Fetch the minimum balance needed to exempt an account of `dataLength`
   * size from rent
   */
  async getMinimumBalanceForRentExemption(t, e) {
    const n = this._buildArgs([t], e), i = await this._rpcRequest("getMinimumBalanceForRentExemption", n), s = rt(i, K0);
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
    const e = await this._rpcRequest("getRecentPerformanceSamples", t ? [t] : []), n = rt(e, cd);
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
    const n = this._buildArgs([t], e), i = await this._rpcRequest("getFeeCalculatorForBlockhash", n), s = rt(i, ud);
    if ("error" in s)
      throw new ft(s.error, "failed to get fee calculator");
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
    const n = ar(t.serialize()).toString("base64"), i = this._buildArgs([n], e), s = await this._rpcRequest("getFeeForMessage", i), l = rt(s, Yt(ot(Y())));
    if ("error" in l)
      throw new ft(l.error, "failed to get fee for message");
    if (l.result === null)
      throw new Error("invalid blockhash");
    return l.result;
  }
  /**
   * Fetch a list of prioritization fees from recent blocks.
   */
  async getRecentPrioritizationFees(t) {
    const e = t?.lockedWritableAccounts?.map((l) => l.toBase58()), n = e?.length ? [e] : [], i = await this._rpcRequest("getRecentPrioritizationFees", n), s = rt(i, m0);
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
    } = Ot(t), i = this._buildArgs([], e, void 0, n), s = await this._rpcRequest("getLatestBlockhash", i), l = rt(s, sd);
    if ("error" in l)
      throw new ft(l.error, "failed to get latest blockhash");
    return l.result;
  }
  /**
   * Returns whether a blockhash is still valid or not
   */
  async isBlockhashValid(t, e) {
    const {
      commitment: n,
      config: i
    } = Ot(e), s = this._buildArgs([t], n, void 0, i), l = await this._rpcRequest("isBlockhashValid", s), h = rt(l, od);
    if ("error" in h)
      throw new ft(h.error, "failed to determine if the blockhash `" + t + "`is valid");
    return h.result;
  }
  /**
   * Fetch the node version
   */
  async getVersion() {
    const t = await this._rpcRequest("getVersion", []), e = rt(t, Mt(l0));
    if ("error" in e)
      throw new ft(e.error, "failed to get version");
    return e.result;
  }
  /**
   * Fetch the genesis hash
   */
  async getGenesisHash() {
    const t = await this._rpcRequest("getGenesisHash", []), e = rt(t, Mt(nt()));
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
    } = Ot(e), s = this._buildArgsAtLeastConfirmed([t], n, void 0, i), l = await this._rpcRequest("getBlock", s);
    try {
      switch (i?.transactionDetails) {
        case "accounts": {
          const h = rt(l, td);
          if ("error" in h)
            throw h.error;
          return h.result;
        }
        case "none": {
          const h = rt(l, $0);
          if ("error" in h)
            throw h.error;
          return h.result;
        }
        default: {
          const h = rt(l, X0);
          if ("error" in h)
            throw h.error;
          const {
            result: p
          } = h;
          return p ? {
            ...p,
            transactions: p.transactions.map(({
              transaction: v,
              meta: S,
              version: C
            }) => ({
              meta: S,
              transaction: {
                ...v,
                message: bs(C, v.message)
              },
              version: C
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
    } = Ot(e), s = this._buildArgsAtLeastConfirmed([t], n, "jsonParsed", i), l = await this._rpcRequest("getBlock", s);
    try {
      switch (i?.transactionDetails) {
        case "accounts": {
          const h = rt(l, nd);
          if ("error" in h)
            throw h.error;
          return h.result;
        }
        case "none": {
          const h = rt(l, rd);
          if ("error" in h)
            throw h.error;
          return h.result;
        }
        default: {
          const h = rt(l, ed);
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
        ...p
      } = t;
      n = h, e = p;
    }
    const i = this._buildArgs([], n, "base64", e), s = await this._rpcRequest("getBlockProduction", i), l = rt(s, d0);
    if ("error" in l)
      throw new ft(l.error, "failed to get block production information");
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
    } = Ot(e), s = this._buildArgsAtLeastConfirmed([t], n, void 0, i), l = await this._rpcRequest("getTransaction", s), h = rt(l, vs);
    if ("error" in h)
      throw new ft(h.error, "failed to get transaction");
    const p = h.result;
    return p && {
      ...p,
      transaction: {
        ...p.transaction,
        message: bs(p.version, p.transaction.message)
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
    } = Ot(e), s = this._buildArgsAtLeastConfirmed([t], n, "jsonParsed", i), l = await this._rpcRequest("getTransaction", s), h = rt(l, Wr);
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
    } = Ot(e), s = t.map((p) => ({
      methodName: "getTransaction",
      args: this._buildArgsAtLeastConfirmed([p], n, "jsonParsed", i)
    }));
    return (await this._rpcBatchRequest(s)).map((p) => {
      const v = rt(p, Wr);
      if ("error" in v)
        throw new ft(v.error, "failed to get transactions");
      return v.result;
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
    } = Ot(e), s = t.map((p) => ({
      methodName: "getTransaction",
      args: this._buildArgsAtLeastConfirmed([p], n, void 0, i)
    }));
    return (await this._rpcBatchRequest(s)).map((p) => {
      const v = rt(p, vs);
      if ("error" in v)
        throw new ft(v.error, "failed to get transactions");
      const S = v.result;
      return S && {
        ...S,
        transaction: {
          ...S.transaction,
          message: bs(S.version, S.transaction.message)
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
    const n = this._buildArgsAtLeastConfirmed([t], e), i = await this._rpcRequest("getBlock", n), s = rt(i, id);
    if ("error" in s)
      throw new ft(s.error, "failed to get confirmed block");
    const l = s.result;
    if (!l)
      throw new Error("Confirmed block " + t + " not found");
    const h = {
      ...l,
      transactions: l.transactions.map(({
        transaction: p,
        meta: v
      }) => {
        const S = new fn(p.message);
        return {
          meta: v,
          transaction: {
            ...p,
            message: S
          }
        };
      })
    };
    return {
      ...h,
      transactions: h.transactions.map(({
        transaction: p,
        meta: v
      }) => ({
        meta: v,
        transaction: xn.populate(p.message, p.signatures)
      }))
    };
  }
  /**
   * Fetch confirmed blocks between two slots
   */
  async getBlocks(t, e, n) {
    const i = this._buildArgsAtLeastConfirmed(e !== void 0 ? [t, e] : [t], n), s = await this._rpcRequest("getBlocks", i), l = rt(s, Mt(it(Y())));
    if ("error" in l)
      throw new ft(l.error, "failed to get blocks");
    return l.result;
  }
  /**
   * Fetch a list of Signatures from the cluster for a block, excluding rewards
   */
  async getBlockSignatures(t, e) {
    const n = this._buildArgsAtLeastConfirmed([t], e, void 0, {
      transactionDetails: "signatures",
      rewards: !1
    }), i = await this._rpcRequest("getBlock", n), s = rt(i, ma);
    if ("error" in s)
      throw new ft(s.error, "failed to get block");
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
    }), i = await this._rpcRequest("getBlock", n), s = rt(i, ma);
    if ("error" in s)
      throw new ft(s.error, "failed to get confirmed block");
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
    const n = this._buildArgsAtLeastConfirmed([t], e), i = await this._rpcRequest("getTransaction", n), s = rt(i, vs);
    if ("error" in s)
      throw new ft(s.error, "failed to get transaction");
    const l = s.result;
    if (!l) return l;
    const h = new fn(l.transaction.message), p = l.transaction.signatures;
    return {
      ...l,
      transaction: xn.populate(h, p)
    };
  }
  /**
   * Fetch parsed transaction details for a confirmed transaction
   *
   * @deprecated Deprecated since RPC v1.7.0. Please use {@link getParsedTransaction} instead.
   */
  async getParsedConfirmedTransaction(t, e) {
    const n = this._buildArgsAtLeastConfirmed([t], e, "jsonParsed"), i = await this._rpcRequest("getTransaction", n), s = rt(i, Wr);
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
    const n = t.map((l) => ({
      methodName: "getTransaction",
      args: this._buildArgsAtLeastConfirmed([l], e, "jsonParsed")
    }));
    return (await this._rpcBatchRequest(n)).map((l) => {
      const h = rt(l, Wr);
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
        const p = await this.getConfirmedBlockSignatures(e, "finalized");
        p.signatures.length > 0 && (i.until = p.signatures[p.signatures.length - 1].toString());
      } catch (p) {
        if (p instanceof Error && p.message.includes("skipped"))
          continue;
        throw p;
      }
    let l = await this.getSlot("finalized");
    for (; !("before" in i) && (n++, !(n > l)); )
      try {
        const p = await this.getConfirmedBlockSignatures(n);
        p.signatures.length > 0 && (i.before = p.signatures[p.signatures.length - 1].toString());
      } catch (p) {
        if (p instanceof Error && p.message.includes("skipped"))
          continue;
        throw p;
      }
    return (await this.getConfirmedSignaturesForAddress2(t, i)).map((p) => p.signature);
  }
  /**
   * Returns confirmed signatures for transactions involving an
   * address backwards in time from the provided signature or most recent confirmed block
   *
   * @deprecated Deprecated since RPC v1.7.0. Please use {@link getSignaturesForAddress} instead.
   */
  async getConfirmedSignaturesForAddress2(t, e, n) {
    const i = this._buildArgsAtLeastConfirmed([t.toBase58()], n, void 0, e), s = await this._rpcRequest("getConfirmedSignaturesForAddress2", i), l = rt(s, R0);
    if ("error" in l)
      throw new ft(l.error, "failed to get confirmed signatures for address");
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
    const i = this._buildArgsAtLeastConfirmed([t.toBase58()], n, void 0, e), s = await this._rpcRequest("getSignaturesForAddress", i), l = rt(s, D0);
    if ("error" in l)
      throw new ft(l.error, "failed to get signatures for address");
    return l.result;
  }
  async getAddressLookupTable(t, e) {
    const {
      context: n,
      value: i
    } = await this.getAccountInfoAndContext(t, e);
    let s = null;
    return i !== null && (s = new pa({
      key: t,
      state: pa.deserialize(i.data)
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
    return i !== null && (s = co.fromAccountData(i.data)), {
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
    const n = await this._rpcRequest("requestAirdrop", [t.toBase58(), e]), i = rt(n, ld);
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
        await Jn(100);
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
        await Jn(jf / 2);
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
    } = Ot(t), i = this._buildArgs([], e, "base64", n), s = await this._rpcRequest("getStakeMinimumDelegation", i), l = rt(s, Yt(Y()));
    if ("error" in l)
      throw new ft(l.error, "failed to get stake minimum delegation");
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
      const D = t.serialize(), k = St.Buffer.from(D).toString("base64");
      if (Array.isArray(e) || n !== void 0)
        throw new Error("Invalid arguments");
      const Z = e || {};
      Z.encoding = "base64", "commitment" in Z || (Z.commitment = this.commitment), e && typeof e == "object" && "innerInstructions" in e && (Z.innerInstructions = e.innerInstructions);
      const _ = [k, Z], q = await this._rpcRequest("simulateTransaction", _), V = rt(q, ya);
      if ("error" in V)
        throw new Error("failed to simulate transaction: " + V.error.message);
      return V.result;
    }
    let i;
    if (t instanceof xn) {
      let z = t;
      i = new xn(), i.feePayer = z.feePayer, i.instructions = t.instructions, i.nonceInfo = z.nonceInfo, i.signatures = z.signatures;
    } else
      i = xn.populate(t), i._message = i._json = void 0;
    if (e !== void 0 && !Array.isArray(e))
      throw new Error("Invalid arguments");
    const s = e;
    if (i.nonceInfo && s)
      i.sign(...s);
    else {
      let z = this._disableBlockhashCaching;
      for (; ; ) {
        const D = await this._blockhashWithExpiryBlockHeight(z);
        if (i.lastValidBlockHeight = D.lastValidBlockHeight, i.recentBlockhash = D.blockhash, !s) break;
        if (i.sign(...s), !i.signature)
          throw new Error("!signature");
        const k = i.signature.toString("base64");
        if (!this._blockhashInfo.simulatedSignatures.includes(k) && !this._blockhashInfo.transactionSignatures.includes(k)) {
          this._blockhashInfo.simulatedSignatures.push(k);
          break;
        } else
          z = !0;
      }
    }
    const l = i._compile(), h = l.serialize(), v = i._serialize(h).toString("base64"), S = {
      encoding: "base64",
      commitment: this.commitment
    };
    if (n) {
      const z = (Array.isArray(n) ? n : l.nonProgramIds()).map((D) => D.toBase58());
      S.accounts = {
        encoding: "base64",
        addresses: z
      };
    }
    s && (S.sigVerify = !0), e && typeof e == "object" && "innerInstructions" in e && (S.innerInstructions = e.innerInstructions);
    const C = [v, S], F = await this._rpcRequest("simulateTransaction", C), U = rt(F, ya);
    if ("error" in U) {
      let z;
      if ("data" in U.error && (z = U.error.data.logs, z && Array.isArray(z))) {
        const D = `
    `, k = D + z.join(D);
        console.error(U.error.message, k);
      }
      throw new ha({
        action: "simulate",
        signature: "",
        transactionMessage: U.error.message,
        logs: z
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
        const p = t.signature.toString("base64");
        if (this._blockhashInfo.transactionSignatures.includes(p))
          l = !0;
        else {
          this._blockhashInfo.transactionSignatures.push(p);
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
    const n = ar(t).toString("base64");
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
    const l = [t, n], h = await this._rpcRequest("sendTransaction", l), p = rt(h, hd);
    if ("error" in p) {
      let v;
      throw "data" in p.error && (v = p.error.data.logs), new ha({
        action: i ? "send" : "simulate",
        signature: "",
        transactionMessage: p.error.message,
        logs: v
      });
    }
    return p.result;
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
    } = rt(t, O0);
    this._handleServerNotification(n, [e.value, e.context]);
  }
  /**
   * @internal
   */
  _makeSubscription(t, e) {
    const n = this._nextClientSubscriptionId++, i = da([t.method, e]), s = this._subscriptionsByHash[i];
    return s === void 0 ? this._subscriptionsByHash[i] = {
      ...t,
      args: e,
      callbacks: /* @__PURE__ */ new Set([t.callback]),
      state: "pending"
    } : s.callbacks.add(t.callback), this._subscriptionHashByClientSubscriptionId[n] = i, this._subscriptionDisposeFunctionsByClientSubscriptionId[n] = async () => {
      delete this._subscriptionDisposeFunctionsByClientSubscriptionId[n], delete this._subscriptionHashByClientSubscriptionId[n];
      const l = this._subscriptionsByHash[i];
      Pt(l !== void 0, `Could not find a \`Subscription\` when tearing down client subscription #${n}`), l.callbacks.delete(t.callback), await this._updateSubscriptions();
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
    } = rt(t, j0);
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
        filters: wa(i)
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
    } = rt(t, dd);
    this._handleServerNotification(n, [e.value, e.context]);
  }
  /**
   * @internal
   */
  _wsOnSlotNotification(t) {
    const {
      result: e,
      subscription: n
    } = rt(t, P0);
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
    } = rt(t, _0);
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
    } = rt(t, W0);
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
      callback: (p, v) => {
        e(p, v);
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
    } = rt(t, q0);
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
    layout: W.struct([W.u32("instruction"), cr("recentSlot"), W.u8("bumpSeed")])
  },
  FreezeLookupTable: {
    index: 1,
    layout: W.struct([W.u32("instruction")])
  },
  ExtendLookupTable: {
    index: 2,
    layout: W.struct([W.u32("instruction"), cr(), W.seq(It(), W.offset(W.u32(), -8), "addresses")])
  },
  DeactivateLookupTable: {
    index: 3,
    layout: W.struct([W.u32("instruction")])
  },
  CloseLookupTable: {
    index: 4,
    layout: W.struct([W.u32("instruction")])
  }
});
new At("AddressLookupTab1e1111111111111111111111111");
Object.freeze({
  RequestUnits: {
    index: 0,
    layout: W.struct([W.u8("instruction"), W.u32("units"), W.u32("additionalFee")])
  },
  RequestHeapFrame: {
    index: 1,
    layout: W.struct([W.u8("instruction"), W.u32("bytes")])
  },
  SetComputeUnitLimit: {
    index: 2,
    layout: W.struct([W.u8("instruction"), W.u32("units")])
  },
  SetComputeUnitPrice: {
    index: 3,
    layout: W.struct([W.u8("instruction"), cr("microLamports")])
  }
});
new At("ComputeBudget111111111111111111111111111111");
W.struct([W.u8("numSignatures"), W.u8("padding"), W.u16("signatureOffset"), W.u16("signatureInstructionIndex"), W.u16("publicKeyOffset"), W.u16("publicKeyInstructionIndex"), W.u16("messageDataOffset"), W.u16("messageDataSize"), W.u16("messageInstructionIndex")]);
new At("Ed25519SigVerify111111111111111111111111111");
Mf.utils.isValidPrivateKey;
W.struct([W.u8("numSignatures"), W.u16("signatureOffset"), W.u8("signatureInstructionIndex"), W.u16("ethAddressOffset"), W.u8("ethAddressInstructionIndex"), W.u16("messageDataOffset"), W.u16("messageDataSize"), W.u8("messageInstructionIndex"), W.blob(20, "ethAddress"), W.blob(64, "signature"), W.u8("recoveryId")]);
new At("KeccakSecp256k11111111111111111111111111111");
var Dc;
new At("StakeConfig11111111111111111111111111111111");
class Oc {
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
Dc = Oc;
Oc.default = new Dc(0, 0, At.default);
Object.freeze({
  Initialize: {
    index: 0,
    layout: W.struct([W.u32("instruction"), Tf(), kf()])
  },
  Authorize: {
    index: 1,
    layout: W.struct([W.u32("instruction"), It("newAuthorized"), W.u32("stakeAuthorizationType")])
  },
  Delegate: {
    index: 2,
    layout: W.struct([W.u32("instruction")])
  },
  Split: {
    index: 3,
    layout: W.struct([W.u32("instruction"), W.ns64("lamports")])
  },
  Withdraw: {
    index: 4,
    layout: W.struct([W.u32("instruction"), W.ns64("lamports")])
  },
  Deactivate: {
    index: 5,
    layout: W.struct([W.u32("instruction")])
  },
  Merge: {
    index: 7,
    layout: W.struct([W.u32("instruction")])
  },
  AuthorizeWithSeed: {
    index: 8,
    layout: W.struct([W.u32("instruction"), It("newAuthorized"), W.u32("stakeAuthorizationType"), Xn("authoritySeed"), It("authorityOwner")])
  }
});
new At("Stake11111111111111111111111111111111111111");
Object.freeze({
  InitializeAccount: {
    index: 0,
    layout: W.struct([W.u32("instruction"), Cf()])
  },
  Authorize: {
    index: 1,
    layout: W.struct([W.u32("instruction"), It("newAuthorized"), W.u32("voteAuthorizationType")])
  },
  Withdraw: {
    index: 3,
    layout: W.struct([W.u32("instruction"), W.ns64("lamports")])
  },
  UpdateValidatorIdentity: {
    index: 4,
    layout: W.struct([W.u32("instruction")])
  },
  AuthorizeWithSeed: {
    index: 10,
    layout: W.struct([W.u32("instruction"), Lf()])
  }
});
new At("Vote111111111111111111111111111111111111111");
new At("Va1idator1nfo111111111111111111111111111111");
$({
  name: nt(),
  website: yt(nt()),
  details: yt(nt()),
  iconUrl: yt(nt()),
  keybaseUsername: yt(nt())
});
new At("Vote111111111111111111111111111111111111111");
W.struct([
  It("nodePubkey"),
  It("authorizedWithdrawer"),
  W.u8("commission"),
  W.nu64(),
  // votes.length
  W.seq(W.struct([W.nu64("slot"), W.u32("confirmationCount")]), W.offset(W.u32(), -8), "votes"),
  W.u8("rootSlotValid"),
  W.nu64("rootSlot"),
  W.nu64(),
  // authorizedVoters.length
  W.seq(W.struct([W.nu64("epoch"), It("authorizedVoter")]), W.offset(W.u32(), -8), "authorizedVoters"),
  W.struct([W.seq(W.struct([It("authorizedPubkey"), W.nu64("epochOfLastAuthorizedSwitch"), W.nu64("targetEpoch")]), 32, "buf"), W.nu64("idx"), W.u8("isEmpty")], "priorVoters"),
  W.nu64(),
  // epochCredits.length
  W.seq(W.struct([W.nu64("epoch"), W.nu64("credits"), W.nu64("prevCredits")]), W.offset(W.u32(), -8), "epochCredits"),
  W.struct([W.nu64("slot"), W.nu64("timestamp")], "lastTimestamp")
]);
const wd = "Phantom";
class yd extends Wa {
  constructor(t = {}) {
    super(), this.name = wd, this.url = "https://phantom.app", this.icon = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDgiIGhlaWdodD0iMTA4IiB2aWV3Qm94PSIwIDAgMTA4IDEwOCIgZmlsbD0ibm9uZSI+CjxyZWN0IHdpZHRoPSIxMDgiIGhlaWdodD0iMTA4IiByeD0iMjYiIGZpbGw9IiNBQjlGRjIiLz4KPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik00Ni41MjY3IDY5LjkyMjlDNDIuMDA1NCA3Ni44NTA5IDM0LjQyOTIgODUuNjE4MiAyNC4zNDggODUuNjE4MkMxOS41ODI0IDg1LjYxODIgMTUgODMuNjU2MyAxNSA3NS4xMzQyQzE1IDUzLjQzMDUgNDQuNjMyNiAxOS44MzI3IDcyLjEyNjggMTkuODMyN0M4Ny43NjggMTkuODMyNyA5NCAzMC42ODQ2IDk0IDQzLjAwNzlDOTQgNTguODI1OCA4My43MzU1IDc2LjkxMjIgNzMuNTMyMSA3Ni45MTIyQzcwLjI5MzkgNzYuOTEyMiA2OC43MDUzIDc1LjEzNDIgNjguNzA1MyA3Mi4zMTRDNjguNzA1MyA3MS41NzgzIDY4LjgyNzUgNzAuNzgxMiA2OS4wNzE5IDY5LjkyMjlDNjUuNTg5MyA3NS44Njk5IDU4Ljg2ODUgODEuMzg3OCA1Mi41NzU0IDgxLjM4NzhDNDcuOTkzIDgxLjM4NzggNDUuNjcxMyA3OC41MDYzIDQ1LjY3MTMgNzQuNDU5OEM0NS42NzEzIDcyLjk4ODQgNDUuOTc2OCA3MS40NTU2IDQ2LjUyNjcgNjkuOTIyOVpNODMuNjc2MSA0Mi41Nzk0QzgzLjY3NjEgNDYuMTcwNCA4MS41NTc1IDQ3Ljk2NTggNzkuMTg3NSA0Ny45NjU4Qzc2Ljc4MTYgNDcuOTY1OCA3NC42OTg5IDQ2LjE3MDQgNzQuNjk4OSA0Mi41Nzk0Qzc0LjY5ODkgMzguOTg4NSA3Ni43ODE2IDM3LjE5MzEgNzkuMTg3NSAzNy4xOTMxQzgxLjU1NzUgMzcuMTkzMSA4My42NzYxIDM4Ljk4ODUgODMuNjc2MSA0Mi41Nzk0Wk03MC4yMTAzIDQyLjU3OTVDNzAuMjEwMyA0Ni4xNzA0IDY4LjA5MTYgNDcuOTY1OCA2NS43MjE2IDQ3Ljk2NThDNjMuMzE1NyA0Ny45NjU4IDYxLjIzMyA0Ni4xNzA0IDYxLjIzMyA0Mi41Nzk1QzYxLjIzMyAzOC45ODg1IDYzLjMxNTcgMzcuMTkzMSA2NS43MjE2IDM3LjE5MzFDNjguMDkxNiAzNy4xOTMxIDcwLjIxMDMgMzguOTg4NSA3MC4yMTAzIDQyLjU3OTVaIiBmaWxsPSIjRkZGREY4Ii8+Cjwvc3ZnPg==", this.supportedTransactionVersions = /* @__PURE__ */ new Set(["legacy", 0]), this._readyState = typeof window > "u" || typeof document > "u" ? ge.Unsupported : ge.NotDetected, this._disconnected = () => {
      const e = this._wallet;
      e && (e.off("disconnect", this._disconnected), e.off("accountChanged", this._accountChanged), this._wallet = null, this._publicKey = null, this.emit("error", new za()), this.emit("disconnect"));
    }, this._accountChanged = (e) => {
      const n = this._publicKey;
      if (n) {
        try {
          e = new At(e.toBytes());
        } catch (i) {
          this.emit("error", new $r(i?.message, i));
          return;
        }
        n.equals(e) || (this._publicKey = e, this.emit("connect", e));
      }
    }, this._connecting = !1, this._wallet = null, this._publicKey = null, this._readyState !== ge.Unsupported && (xs() ? (this._readyState = ge.Loadable, this.emit("readyStateChange", this._readyState)) : _a(() => window.phantom?.solana?.isPhantom || window.solana?.isPhantom ? (this._readyState = ge.Installed, this.emit("readyStateChange", this._readyState), !0) : !1));
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
    this.readyState === ge.Installed && await this.connect();
  }
  async connect() {
    try {
      if (this.connected || this.connecting)
        return;
      if (this.readyState === ge.Loadable) {
        const n = encodeURIComponent(window.location.href), i = encodeURIComponent(window.location.origin);
        window.location.href = `https://phantom.app/ul/browse/${n}?ref=${i}`;
        return;
      }
      if (this.readyState !== ge.Installed)
        throw new ja();
      this._connecting = !0;
      const t = window.phantom?.solana || window.solana;
      if (!t.isConnected)
        try {
          await t.connect();
        } catch (n) {
          throw new Is(n?.message, n);
        }
      if (!t.publicKey)
        throw new Gu();
      let e;
      try {
        e = new At(t.publicKey.toBytes());
      } catch (n) {
        throw new $r(n?.message, n);
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
        this.emit("error", new Pa(e?.message, e));
      }
    }
    this.emit("disconnect");
  }
  async sendTransaction(t, e, n = {}) {
    try {
      const i = this._wallet;
      if (!i)
        throw new We();
      try {
        const { signers: s, ...l } = n;
        ti(t) ? s?.length && t.sign(s) : (t = await this.prepareTransaction(t, e, l), s?.length && t.partialSign(...s)), l.preflightCommitment = l.preflightCommitment || e.commitment;
        const { signature: h } = await i.signAndSendTransaction(t, l);
        return h;
      } catch (s) {
        throw s instanceof Re ? s : new Vn(s?.message, s);
      }
    } catch (i) {
      throw this.emit("error", i), i;
    }
  }
  async signTransaction(t) {
    try {
      const e = this._wallet;
      if (!e)
        throw new We();
      try {
        return await e.signTransaction(t) || t;
      } catch (n) {
        throw new Bn(n?.message, n);
      }
    } catch (e) {
      throw this.emit("error", e), e;
    }
  }
  async signAllTransactions(t) {
    try {
      const e = this._wallet;
      if (!e)
        throw new We();
      try {
        return await e.signAllTransactions(t) || t;
      } catch (n) {
        throw new Bn(n?.message, n);
      }
    } catch (e) {
      throw this.emit("error", e), e;
    }
  }
  async signMessage(t) {
    try {
      const e = this._wallet;
      if (!e)
        throw new We();
      try {
        const { signature: n } = await e.signMessage(t);
        return n;
      } catch (n) {
        throw new Fa(n?.message, n);
      }
    } catch (e) {
      throw this.emit("error", e), e;
    }
  }
}
var Ad = function(r, t, e, n) {
  if (e === "a" && !n) throw new TypeError("Private accessor was defined without a getter");
  if (typeof t == "function" ? r !== t || !n : !t.has(r)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
  return e === "m" ? n : e === "a" ? n.call(r) : n ? n.value : t.get(r);
}, md = function(r, t, e, n, i) {
  if (n === "m") throw new TypeError("Private method is not writable");
  if (n === "a" && !i) throw new TypeError("Private accessor was defined without a setter");
  if (typeof t == "function" ? r !== t || !i : !t.has(r)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
  return n === "a" ? i.call(r, e) : i ? i.value = e : t.set(r, e), e;
}, Kr;
function bd(r) {
  const t = ({ register: e }) => e(r);
  try {
    window.dispatchEvent(new vd(t));
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
class vd extends Event {
  get detail() {
    return Ad(this, Kr, "f");
  }
  get type() {
    return "wallet-standard:register-wallet";
  }
  constructor(t) {
    super("wallet-standard:register-wallet", {
      bubbles: !1,
      cancelable: !1,
      composed: !1
    }), Kr.set(this, void 0), md(this, Kr, t, "f");
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
Kr = /* @__PURE__ */ new WeakMap();
const Ed = "solana:mainnet", Md = "solana:devnet", Sd = "solana:testnet", Id = "data:image/svg+xml;base64,PHN2ZyBmaWxsPSJub25lIiBoZWlnaHQ9IjMxIiB2aWV3Qm94PSIwIDAgMzEgMzEiIHdpZHRoPSIzMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+PGxpbmVhckdyYWRpZW50IGlkPSJhIiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgeDE9IjIwLjI1IiB4Mj0iMjYuNTcxIiB5MT0iMjcuMTczIiB5Mj0iMTkuODU4Ij48c3RvcCBvZmZzZXQ9Ii4wOCIgc3RvcC1jb2xvcj0iIzk5NDVmZiIvPjxzdG9wIG9mZnNldD0iLjMiIHN0b3AtY29sb3I9IiM4NzUyZjMiLz48c3RvcCBvZmZzZXQ9Ii41IiBzdG9wLWNvbG9yPSIjNTQ5N2Q1Ii8+PHN0b3Agb2Zmc2V0PSIuNiIgc3RvcC1jb2xvcj0iIzQzYjRjYSIvPjxzdG9wIG9mZnNldD0iLjcyIiBzdG9wLWNvbG9yPSIjMjhlMGI5Ii8+PHN0b3Agb2Zmc2V0PSIuOTciIHN0b3AtY29sb3I9IiMxOWZiOWIiLz48L2xpbmVhckdyYWRpZW50PjxnIHN0cm9rZS1saW5lam9pbj0icm91bmQiIHN0cm9rZS13aWR0aD0iLjA5NCI+PHBhdGggZD0ibTI2LjEwOSAzLjY0My05LjM2OSA2Ljk1OSAxLjczMy00LjEwNSA3LjYzNy0yLjg1M3oiIGZpbGw9IiNlMjc2MWIiIHN0cm9rZT0iI2UyNzYxYiIvPjxnIGZpbGw9IiNlNDc2MWIiIHN0cm9rZT0iI2U0NzYxYiI+PHBhdGggZD0ibTQuNDgxIDMuNjQzIDkuMjk0IDcuMDI0LTEuNjQ4LTQuMTcxem0xOC4yNTggMTYuMTMtMi40OTUgMy44MjMgNS4zMzkgMS40NjkgMS41MzUtNS4yMDctNC4zNzgtLjA4NXptLTE5LjI0Ny4wODUgMS41MjUgNS4yMDcgNS4zMzktMS40NjktMi40OTUtMy44MjN6Ii8+PHBhdGggZD0ibTEwLjA1NSAxMy4zMTMtMS40ODggMi4yNTEgNS4zMDEuMjM1LS4xODgtNS42OTd6bTEwLjQ4IDAtMy42NzItMy4yNzctLjEyMiA1Ljc2MyA1LjI5Mi0uMjM1LTEuNDk3LTIuMjUxem0tMTAuMTc4IDEwLjI4MyAzLjE4My0xLjU1NC0yLjc0OS0yLjE0Ny0uNDMzIDMuNzAxem02LjY5NS0xLjU1NCAzLjE5MiAxLjU1NC0uNDQzLTMuNzAxeiIvPjwvZz48cGF0aCBkPSJtMjAuMjQ0IDIzLjU5Ni0zLjE5Mi0xLjU1NC4yNTQgMi4wODEtLjAyOC44NzZ6bS05Ljg4NyAwIDIuOTY2IDEuNDAzLS4wMTktLjg3Ni4yMzUtMi4wODEtMy4xODMgMS41NTR6IiBmaWxsPSIjZDdjMWIzIiBzdHJva2U9IiNkN2MxYjMiLz48cGF0aCBkPSJtMTMuMzY5IDE4LjUyMS0yLjY1NS0uNzgxIDEuODc0LS44NTd6bTMuODUxIDAgLjc4MS0xLjYzOCAxLjg4My44NTctMi42NjUuNzgxeiIgZmlsbD0iIzIzMzQ0NyIgc3Ryb2tlPSIjMjMzNDQ3Ii8+PHBhdGggZD0ibTEwLjM1NyAyMy41OTYuNDUyLTMuODIzLTIuOTQ3LjA4NXptOS40MzUtMy44MjMuNDUyIDMuODIzIDIuNDk1LTMuNzM4em0yLjI0MS00LjIwOS01LjI5Mi4yMzUuNDkgMi43MjEuNzgyLTEuNjM4IDEuODgzLjg1N3ptLTExLjMxOCAyLjE3NSAxLjg4My0uODU3Ljc3MiAxLjYzOC40OTktMi43MjEtNS4zMDEtLjIzNXoiIGZpbGw9IiNjZDYxMTYiIHN0cm9rZT0iI2NkNjExNiIvPjxwYXRoIGQ9Im04LjU2NyAxNS41NjQgMi4yMjIgNC4zMzEtLjA3NS0yLjE1NnptMTEuMzI4IDIuMTc1LS4wOTQgMi4xNTYgMi4yMzItNC4zMzEtMi4xMzcgMi4xNzV6bS02LjAyNi0xLjk0LS40OTkgMi43MjEuNjIxIDMuMjExLjE0MS00LjIyOC0uMjY0LTEuNzA0em0yLjg3MiAwLS4yNTQgMS42OTUuMTEzIDQuMjM3LjYzMS0zLjIxMXoiIGZpbGw9IiNlNDc1MWYiIHN0cm9rZT0iI2U0NzUxZiIvPjxwYXRoIGQ9Im0xNy4yMyAxOC41Mi0uNjMxIDMuMjExLjQ1Mi4zMTEgMi43NS0yLjE0Ny4wOTQtMi4xNTZ6bS02LjUxNi0uNzgxLjA3NSAyLjE1NiAyLjc1IDIuMTQ3LjQ1Mi0uMzExLS42MjItMy4yMTF6IiBmaWxsPSIjZjY4NTFiIiBzdHJva2U9IiNmNjg1MWIiLz48cGF0aCBkPSJtMTcuMjc3IDI0Ljk5OS4wMjgtLjg3Ni0uMjM1LS4yMDdoLTMuNTVsLS4yMTcuMjA3LjAxOS44NzYtMi45NjYtMS40MDMgMS4wMzYuODQ4IDIuMSAxLjQ1OWgzLjYwNmwyLjEwOS0xLjQ1OSAxLjAzNi0uODQ4eiIgZmlsbD0iI2MwYWQ5ZSIgc3Ryb2tlPSIjYzBhZDllIi8+PHBhdGggZD0ibTE3LjA1MSAyMi4wNDItLjQ1Mi0uMzExaC0yLjYwOGwtLjQ1Mi4zMTEtLjIzNSAyLjA4MS4yMTctLjIwN2gzLjU1bC4yMzUuMjA3LS4yNTQtMi4wODF6IiBmaWxsPSIjMTYxNjE2IiBzdHJva2U9IiMxNjE2MTYiLz48cGF0aCBkPSJtMjYuNTA1IDExLjA1My44LTMuODQyLTEuMTk2LTMuNTY5LTkuMDU4IDYuNzIzIDMuNDg0IDIuOTQ3IDQuOTI1IDEuNDQxIDEuMDkyLTEuMjcxLS40NzEtLjMzOS43NTMtLjY4Ny0uNTg0LS40NTIuNzUzLS41NzQtLjQ5OS0uMzc3em0tMjMuMjExLTMuODQxLjggMy44NDItLjUwOC4zNzcuNzUzLjU3NC0uNTc0LjQ1Mi43NTMuNjg3LS40NzEuMzM5IDEuMDgzIDEuMjcxIDQuOTI1LTEuNDQxIDMuNDg0LTIuOTQ3LTkuMDU5LTYuNzIzeiIgZmlsbD0iIzc2M2QxNiIgc3Ryb2tlPSIjNzYzZDE2Ii8+PHBhdGggZD0ibTI1LjQ2IDE0Ljc1NC00LjkyNS0xLjQ0MSAxLjQ5NyAyLjI1MS0yLjIzMiA0LjMzMSAyLjkzOC0uMDM4aDQuMzc4bC0xLjY1Ny01LjEwNHptLTE1LjQwNS0xLjQ0MS00LjkyNSAxLjQ0MS0xLjYzOCA1LjEwNGg0LjM2OWwyLjkyOC4wMzgtMi4yMjItNC4zMzEgMS40ODgtMi4yNTF6bTYuNjg1IDIuNDg2LjMxMS01LjQzMyAxLjQzMS0zLjg3aC02LjM1NmwxLjQxMyAzLjg3LjMyOSA1LjQzMy4xMTMgMS43MTQuMDA5IDQuMjE5aDIuNjFsLjAxOS00LjIxOS4xMjItMS43MTR6IiBmaWxsPSIjZjY4NTFiIiBzdHJva2U9IiNmNjg1MWIiLz48L2c+PGNpcmNsZSBjeD0iMjMuNSIgY3k9IjIzLjUiIGZpbGw9IiMwMDAiIHI9IjYuNSIvPjxwYXRoIGQ9Im0yNy40NzMgMjUuNTQ1LTEuMzEgMS4zNjhjLS4wMjkuMDMtLjA2My4wNTMtLjEwMS4wN2EuMzEuMzEgMCAwIDEgLS4xMjEuMDI0aC02LjIwOWMtLjAzIDAtLjA1OS0uMDA4LS4wODMtLjAyNGEuMTUuMTUgMCAwIDEgLS4wNTYtLjA2NWMtLjAxMi0uMDI2LS4wMTUtLjA1Ni0uMDEtLjA4NHMuMDE4LS4wNTUuMDM5LS4wNzZsMS4zMTEtMS4zNjhjLjAyOC0uMDMuMDYzLS4wNTMuMTAxLS4wNjlhLjMxLjMxIDAgMCAxIC4xMjEtLjAyNWg2LjIwOGMuMDMgMCAuMDU5LjAwOC4wODMuMDI0YS4xNS4xNSAwIDAgMSAuMDU2LjA2NWMuMDEyLjAyNi4wMTUuMDU2LjAxLjA4NHMtLjAxOC4wNTUtLjAzOS4wNzZ6bS0xLjMxLTIuNzU2Yy0uMDI5LS4wMy0uMDYzLS4wNTMtLjEwMS0uMDdhLjMxLjMxIDAgMCAwIC0uMTIxLS4wMjRoLTYuMjA5Yy0uMDMgMC0uMDU5LjAwOC0uMDgzLjAyNHMtLjA0NC4wMzgtLjA1Ni4wNjUtLjAxNS4wNTYtLjAxLjA4NC4wMTguMDU1LjAzOS4wNzZsMS4zMTEgMS4zNjhjLjAyOC4wMy4wNjMuMDUzLjEwMS4wNjlhLjMxLjMxIDAgMCAwIC4xMjEuMDI1aDYuMjA4Yy4wMyAwIC4wNTktLjAwOC4wODMtLjAyNGEuMTUuMTUgMCAwIDAgLjA1Ni0uMDY1Yy4wMTItLjAyNi4wMTUtLjA1Ni4wMS0uMDg0cy0uMDE4LS4wNTUtLjAzOS0uMDc2em0tNi40MzEtLjk4M2g2LjIwOWEuMzEuMzEgMCAwIDAgLjEyMS0uMDI0Yy4wMzgtLjAxNi4wNzMtLjA0LjEwMS0uMDdsMS4zMS0xLjM2OGMuMDItLjAyMS4wMzQtLjA0Ny4wMzktLjA3NnMuMDAxLS4wNTgtLjAxLS4wODRhLjE1LjE1IDAgMCAwIC0uMDU2LS4wNjVjLS4wMjUtLjAxNi0uMDU0LS4wMjQtLjA4My0uMDI0aC02LjIwOGEuMzEuMzEgMCAwIDAgLS4xMjEuMDI1Yy0uMDM4LjAxNi0uMDcyLjA0LS4xMDEuMDY5bC0xLjMxIDEuMzY4Yy0uMDIuMDIxLS4wMzQuMDQ3LS4wMzkuMDc2cy0uMDAxLjA1OC4wMS4wODQuMDMxLjA0OS4wNTYuMDY1LjA1NC4wMjQuMDgzLjAyNHoiIGZpbGw9InVybCgjYSkiLz48L3N2Zz4=";
var kt = function(r, t, e, n) {
  if (e === "a" && !n) throw new TypeError("Private accessor was defined without a getter");
  if (typeof t == "function" ? r !== t || !n : !t.has(r)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
  return e === "m" ? n : e === "a" ? n.call(r) : n ? n.value : t.get(r);
}, xd = function(r, t, e, n, i) {
  if (n === "m") throw new TypeError("Private method is not writable");
  if (n === "a" && !i) throw new TypeError("Private accessor was defined without a setter");
  if (typeof t == "function" ? r !== t || !i : !t.has(r)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
  return n === "a" ? i.call(r, e) : i ? i.value = e : t.set(r, e), e;
}, Jr, Pn, zs, Ps, Fs, Be, _s, Uc, jc, Ws, qs, Qs, Hs, Zs;
class Bd {
  constructor() {
    Jr.add(this), Pn.set(this, {}), zs.set(this, "1.0.0"), Ps.set(this, "MetaMask"), Fs.set(this, Id), Be.set(this, null), _s.set(this, (t, e) => (kt(this, Pn, "f")[t]?.push(e) || (kt(this, Pn, "f")[t] = [e]), () => kt(this, Jr, "m", jc).call(this, t, e))), Ws.set(this, async () => {
      if (!kt(this, Be, "f")) {
        let t;
        try {
          t = (await import("./index-DTtlBqEn.js")).default;
        } catch {
          throw new Error("Unable to load Solflare MetaMask SDK");
        }
        xd(this, Be, new t(), "f"), kt(this, Be, "f").on("standard_change", (e) => kt(this, Jr, "m", Uc).call(this, "change", e));
      }
      return this.accounts.length || await kt(this, Be, "f").connect(), { accounts: this.accounts };
    }), qs.set(this, async () => {
      kt(this, Be, "f") && await kt(this, Be, "f").disconnect();
    }), Qs.set(this, async (...t) => {
      if (!kt(this, Be, "f"))
        throw new We();
      return await kt(this, Be, "f").standardSignAndSendTransaction(...t);
    }), Hs.set(this, async (...t) => {
      if (!kt(this, Be, "f"))
        throw new We();
      return await kt(this, Be, "f").standardSignTransaction(...t);
    }), Zs.set(this, async (...t) => {
      if (!kt(this, Be, "f"))
        throw new We();
      return await kt(this, Be, "f").standardSignMessage(...t);
    });
  }
  get version() {
    return kt(this, zs, "f");
  }
  get name() {
    return kt(this, Ps, "f");
  }
  get icon() {
    return kt(this, Fs, "f");
  }
  get chains() {
    return [Ed, Md, Sd];
  }
  get features() {
    return {
      [tl]: {
        version: "1.0.0",
        connect: kt(this, Ws, "f")
      },
      [el]: {
        version: "1.0.0",
        disconnect: kt(this, qs, "f")
      },
      [nl]: {
        version: "1.0.0",
        on: kt(this, _s, "f")
      },
      [Vu]: {
        version: "1.0.0",
        supportedTransactionVersions: ["legacy", 0],
        signAndSendTransaction: kt(this, Qs, "f")
      },
      [$u]: {
        version: "1.0.0",
        supportedTransactionVersions: ["legacy", 0],
        signTransaction: kt(this, Hs, "f")
      },
      [Xu]: {
        version: "1.0.0",
        signMessage: kt(this, Zs, "f")
      }
    };
  }
  get accounts() {
    return kt(this, Be, "f") ? kt(this, Be, "f").standardAccounts : [];
  }
}
Pn = /* @__PURE__ */ new WeakMap(), zs = /* @__PURE__ */ new WeakMap(), Ps = /* @__PURE__ */ new WeakMap(), Fs = /* @__PURE__ */ new WeakMap(), Be = /* @__PURE__ */ new WeakMap(), _s = /* @__PURE__ */ new WeakMap(), Ws = /* @__PURE__ */ new WeakMap(), qs = /* @__PURE__ */ new WeakMap(), Qs = /* @__PURE__ */ new WeakMap(), Hs = /* @__PURE__ */ new WeakMap(), Zs = /* @__PURE__ */ new WeakMap(), Jr = /* @__PURE__ */ new WeakSet(), Uc = function(t, ...e) {
  kt(this, Pn, "f")[t]?.forEach((n) => n.apply(null, e));
}, jc = function(t, e) {
  kt(this, Pn, "f")[t] = kt(this, Pn, "f")[t]?.filter((n) => e !== n);
};
let ba = !1;
function Nd() {
  ba || (bd(new Bd()), ba = !0);
}
async function Td() {
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
    i?.target === "metamask-inpage" && i.data?.name === "metamask-provider" && (i.data.data?.id === r ? (window.removeEventListener("message", e), i.data.data.error || Nd()) : t());
  }
  window.addEventListener("message", e), window.setTimeout(() => window.removeEventListener("message", e), 5e3), t();
}
const kd = "Solflare";
class Cd extends Wa {
  constructor(t = {}) {
    super(), this.name = kd, this.url = "https://solflare.com", this.icon = "data:image/svg+xml;base64,PHN2ZyBmaWxsPSJub25lIiBoZWlnaHQ9IjUwIiB2aWV3Qm94PSIwIDAgNTAgNTAiIHdpZHRoPSI1MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+PGxpbmVhckdyYWRpZW50IGlkPSJhIj48c3RvcCBvZmZzZXQ9IjAiIHN0b3AtY29sb3I9IiNmZmMxMGIiLz48c3RvcCBvZmZzZXQ9IjEiIHN0b3AtY29sb3I9IiNmYjNmMmUiLz48L2xpbmVhckdyYWRpZW50PjxsaW5lYXJHcmFkaWVudCBpZD0iYiIgZ3JhZGllbnRVbml0cz0idXNlclNwYWNlT25Vc2UiIHgxPSI2LjQ3ODM1IiB4Mj0iMzQuOTEwNyIgeGxpbms6aHJlZj0iI2EiIHkxPSI3LjkyIiB5Mj0iMzMuNjU5MyIvPjxyYWRpYWxHcmFkaWVudCBpZD0iYyIgY3g9IjAiIGN5PSIwIiBncmFkaWVudFRyYW5zZm9ybT0ibWF0cml4KDQuOTkyMTg4MzIgMTIuMDYzODc5NjMgLTEyLjE4MTEzNjU1IDUuMDQwNzEwNzQgMjIuNTIwMiAyMC42MTgzKSIgZ3JhZGllbnRVbml0cz0idXNlclNwYWNlT25Vc2UiIHI9IjEiIHhsaW5rOmhyZWY9IiNhIi8+PHBhdGggZD0ibTI1LjE3MDggNDcuOTEwNGMuNTI1IDAgLjk1MDcuNDIxLjk1MDcuOTQwM3MtLjQyNTcuOTQwMi0uOTUwNy45NDAyLS45NTA3LS40MjA5LS45NTA3LS45NDAyLjQyNTctLjk0MDMuOTUwNy0uOTQwM3ptLTEuMDMyOC00NC45MTU2NWMuNDY0Ni4wMzgzNi44Mzk4LjM5MDQuOTAyNy44NDY4MWwxLjEzMDcgOC4yMTU3NGMuMzc5OCAyLjcxNDMgMy42NTM1IDMuODkwNCA1LjY3NDMgMi4wNDU5bDExLjMyOTEtMTAuMzExNThjLjI3MzMtLjI0ODczLjY5ODktLjIzMTQ5Ljk1MDcuMDM4NTEuMjMwOS4yNDc3Mi4yMzc5LjYyNjk3LjAxNjEuODgyNzdsLTkuODc5MSAxMS4zOTU4Yy0xLjgxODcgMi4wOTQyLS40NzY4IDUuMzY0MyAyLjI5NTYgNS41OTc4bDguNzE2OC44NDAzYy40MzQxLjA0MTguNzUxNy40MjM0LjcwOTMuODUyNC0uMDM0OS4zNTM3LS4zMDc0LjYzOTUtLjY2MjguNjk0OWwtOS4xNTk0IDEuNDMwMmMtMi42NTkzLjM2MjUtMy44NjM2IDMuNTExNy0yLjEzMzkgNS41NTc2bDMuMjIgMy43OTYxYy4yNTk0LjMwNTguMjE4OC43NjE1LS4wOTA4IDEuMDE3OC0uMjYyMi4yMTcyLS42NDE5LjIyNTYtLjkxMzguMDIwM2wtMy45Njk0LTIuOTk3OGMtMi4xNDIxLTEuNjEwOS01LjIyOTctLjI0MTctNS40NTYxIDIuNDI0M2wtLjg3NDcgMTAuMzk3NmMtLjAzNjIuNDI5NS0uNDE3OC43NDg3LS44NTI1LjcxMy0uMzY5LS4wMzAzLS42NjcxLS4zMDk3LS43MTcxLS42NzIxbC0xLjM4NzEtMTAuMDQzN2MtLjM3MTctMi43MTQ0LTMuNjQ1NC0zLjg5MDQtNS42NzQzLTIuMDQ1OWwtMTIuMDUxOTUgMTAuOTc0Yy0uMjQ5NDcuMjI3MS0uNjM4MDkuMjExNC0uODY4LS4wMzUtLjIxMDk0LS4yMjYyLS4yMTczNS0uNTcyNC0uMDE0OTMtLjgwNmwxMC41MTgxOC0xMi4xMzg1YzEuODE4Ny0yLjA5NDIuNDg0OS01LjM2NDQtMi4yODc2LTUuNTk3OGwtOC43MTg3Mi0uODQwNWMtLjQzNDEzLS4wNDE4LS43NTE3Mi0uNDIzNS0uNzA5MzYtLjg1MjQuMDM0OTMtLjM1MzcuMzA3MzktLjYzOTQuNjYyNy0uNjk1bDkuMTUzMzgtMS40Mjk5YzIuNjU5NC0uMzYyNSAzLjg3MTgtMy41MTE3IDIuMTQyMS01LjU1NzZsLTIuMTkyLTIuNTg0MWMtLjMyMTctLjM3OTItLjI3MTMtLjk0NDMuMTEyNi0xLjI2MjEuMzI1My0uMjY5NC43OTYzLS4yNzk3IDEuMTMzNC0uMDI0OWwyLjY5MTggMi4wMzQ3YzIuMTQyMSAxLjYxMDkgNS4yMjk3LjI0MTcgNS40NTYxLTIuNDI0M2wuNzI0MS04LjU1OTk4Yy4wNDU3LS41NDA4LjUyNjUtLjk0MjU3IDEuMDczOS0uODk3Mzd6bS0yMy4xODczMyAyMC40Mzk2NWMuNTI1MDQgMCAuOTUwNjcuNDIxLjk1MDY3Ljk0MDNzLS40MjU2My45NDAzLS45NTA2Ny45NDAzYy0uNTI1MDQxIDAtLjk1MDY3LS40MjEtLjk1MDY3LS45NDAzcy40MjU2MjktLjk0MDMuOTUwNjctLjk0MDN6bTQ3LjY3OTczLS45NTQ3Yy41MjUgMCAuOTUwNy40MjEuOTUwNy45NDAzcy0uNDI1Ny45NDAyLS45NTA3Ljk0MDItLjk1MDctLjQyMDktLjk1MDctLjk0MDIuNDI1Ny0uOTQwMy45NTA3LS45NDAzem0tMjQuNjI5Ni0yMi40Nzk3Yy41MjUgMCAuOTUwNi40MjA5NzMuOTUwNi45NDAyNyAwIC41MTkzLS40MjU2Ljk0MDI3LS45NTA2Ljk0MDI3LS41MjUxIDAtLjk1MDctLjQyMDk3LS45NTA3LS45NDAyNyAwLS41MTkyOTcuNDI1Ni0uOTQwMjcuOTUwNy0uOTQwMjd6IiBmaWxsPSJ1cmwoI2IpIi8+PHBhdGggZD0ibTI0LjU3MSAzMi43NzkyYzQuOTU5NiAwIDguOTgwMi0zLjk3NjUgOC45ODAyLTguODgxOSAwLTQuOTA1My00LjAyMDYtOC44ODE5LTguOTgwMi04Ljg4MTlzLTguOTgwMiAzLjk3NjYtOC45ODAyIDguODgxOWMwIDQuOTA1NCA0LjAyMDYgOC44ODE5IDguOTgwMiA4Ljg4MTl6IiBmaWxsPSJ1cmwoI2MpIi8+PC9zdmc+", this.supportedTransactionVersions = /* @__PURE__ */ new Set(["legacy", 0]), this._readyState = typeof window > "u" || typeof document > "u" ? ge.Unsupported : ge.Loadable, this._disconnected = () => {
      const e = this._wallet;
      e && (e.off("disconnect", this._disconnected), this._wallet = null, this._publicKey = null, this.emit("error", new za()), this.emit("disconnect"));
    }, this._accountChanged = (e) => {
      if (!e)
        return;
      const n = this._publicKey;
      if (n) {
        try {
          e = new At(e.toBytes());
        } catch (i) {
          this.emit("error", new $r(i?.message, i));
          return;
        }
        n.equals(e) || (this._publicKey = e, this.emit("connect", e));
      }
    }, this._connecting = !1, this._publicKey = null, this._wallet = null, this._config = t, this._readyState !== ge.Unsupported && (_a(() => window.solflare?.isSolflare || window.SolflareApp ? (this._readyState = ge.Installed, this.emit("readyStateChange", this._readyState), !0) : !1), Td());
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
    this.readyState === ge.Loadable && xs() || await this.connect();
  }
  async connect() {
    try {
      if (this.connected || this.connecting)
        return;
      if (this._readyState !== ge.Loadable && this._readyState !== ge.Installed)
        throw new ja();
      if (this.readyState === ge.Loadable && xs()) {
        const i = encodeURIComponent(window.location.href), s = encodeURIComponent(window.location.origin);
        window.location.href = `https://solflare.com/ul/v1/browse/${i}?ref=${s}`;
        return;
      }
      let t;
      try {
        t = (await import("./index-vJX9CZzh.js")).default;
      } catch (i) {
        throw new Zu(i?.message, i);
      }
      let e;
      try {
        e = new t({ network: this._config.network });
      } catch (i) {
        throw new Yu(i?.message, i);
      }
      if (this._connecting = !0, !e.connected)
        try {
          await e.connect();
        } catch (i) {
          throw new Is(i?.message, i);
        }
      if (!e.publicKey)
        throw new Is();
      let n;
      try {
        n = new At(e.publicKey.toBytes());
      } catch (i) {
        throw new $r(i?.message, i);
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
        this.emit("error", new Pa(e?.message, e));
      }
    }
    this.emit("disconnect");
  }
  async sendTransaction(t, e, n = {}) {
    try {
      const i = this._wallet;
      if (!i)
        throw new We();
      try {
        const { signers: s, ...l } = n;
        return ti(t) ? s?.length && t.sign(s) : (t = await this.prepareTransaction(t, e, l), s?.length && t.partialSign(...s)), l.preflightCommitment = l.preflightCommitment || e.commitment, await i.signAndSendTransaction(t, l);
      } catch (s) {
        throw s instanceof Re ? s : new Vn(s?.message, s);
      }
    } catch (i) {
      throw this.emit("error", i), i;
    }
  }
  async signTransaction(t) {
    try {
      const e = this._wallet;
      if (!e)
        throw new We();
      try {
        return await e.signTransaction(t) || t;
      } catch (n) {
        throw new Bn(n?.message, n);
      }
    } catch (e) {
      throw this.emit("error", e), e;
    }
  }
  async signAllTransactions(t) {
    try {
      const e = this._wallet;
      if (!e)
        throw new We();
      try {
        return await e.signAllTransactions(t) || t;
      } catch (n) {
        throw new Bn(n?.message, n);
      }
    } catch (e) {
      throw this.emit("error", e), e;
    }
  }
  async signMessage(t) {
    try {
      const e = this._wallet;
      if (!e)
        throw new We();
      try {
        return await e.signMessage(t, "utf8");
      } catch (n) {
        throw new Fa(n?.message, n);
      }
    } catch (e) {
      throw this.emit("error", e), e;
    }
  }
}
function Ld(r) {
  if (r.length >= 255)
    throw new TypeError("Alphabet too long");
  const t = new Uint8Array(256);
  for (let v = 0; v < t.length; v++)
    t[v] = 255;
  for (let v = 0; v < r.length; v++) {
    const S = r.charAt(v), C = S.charCodeAt(0);
    if (t[C] !== 255)
      throw new TypeError(S + " is ambiguous");
    t[C] = v;
  }
  const e = r.length, n = r.charAt(0), i = Math.log(e) / Math.log(256), s = Math.log(256) / Math.log(e);
  function l(v) {
    if (v instanceof Uint8Array || (ArrayBuffer.isView(v) ? v = new Uint8Array(v.buffer, v.byteOffset, v.byteLength) : Array.isArray(v) && (v = Uint8Array.from(v))), !(v instanceof Uint8Array))
      throw new TypeError("Expected Uint8Array");
    if (v.length === 0)
      return "";
    let S = 0, C = 0, F = 0;
    const U = v.length;
    for (; F !== U && v[F] === 0; )
      F++, S++;
    const z = (U - F) * s + 1 >>> 0, D = new Uint8Array(z);
    for (; F !== U; ) {
      let _ = v[F], q = 0;
      for (let V = z - 1; (_ !== 0 || q < C) && V !== -1; V--, q++)
        _ += 256 * D[V] >>> 0, D[V] = _ % e >>> 0, _ = _ / e >>> 0;
      if (_ !== 0)
        throw new Error("Non-zero carry");
      C = q, F++;
    }
    let k = z - C;
    for (; k !== z && D[k] === 0; )
      k++;
    let Z = n.repeat(S);
    for (; k < z; ++k)
      Z += r.charAt(D[k]);
    return Z;
  }
  function h(v) {
    if (typeof v != "string")
      throw new TypeError("Expected String");
    if (v.length === 0)
      return new Uint8Array();
    let S = 0, C = 0, F = 0;
    for (; v[S] === n; )
      C++, S++;
    const U = (v.length - S) * i + 1 >>> 0, z = new Uint8Array(U);
    for (; S < v.length; ) {
      const _ = v.charCodeAt(S);
      if (_ > 255)
        return;
      let q = t[_];
      if (q === 255)
        return;
      let V = 0;
      for (let J = U - 1; (q !== 0 || V < F) && J !== -1; J--, V++)
        q += e * z[J] >>> 0, z[J] = q % 256 >>> 0, q = q / 256 >>> 0;
      if (q !== 0)
        throw new Error("Non-zero carry");
      F = V, S++;
    }
    let D = U - F;
    for (; D !== U && z[D] === 0; )
      D++;
    const k = new Uint8Array(C + (U - D));
    let Z = C;
    for (; D !== U; )
      k[Z++] = z[D++];
    return k;
  }
  function p(v) {
    const S = h(v);
    if (S)
      return S;
    throw new Error("Non-base" + e + " character");
  }
  return {
    encode: l,
    decodeUnsafe: h,
    decode: p
  };
}
var Rd = "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz";
const Dd = Ld(Rd);
function Od(r) {
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
const Ud = ({ IDL: r }) => {
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
  }), l = r.Vec(r.Nat8), h = l, p = r.Nat64, v = r.Record({
    pubkey: l,
    targets: r.Opt(r.Vec(r.Principal)),
    expiration: p
  }), S = r.Record({
    signature: r.Vec(r.Nat8),
    delegation: v
  }), C = r.Variant({
    Ok: S,
    Err: r.Text
  }), F = r.Text, U = l, z = r.Record({
    user_canister_pubkey: U,
    expiration: p
  }), D = r.Variant({ Ok: z, Err: r.Text }), k = r.Record({
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
    Ok: k,
    Err: r.Text
  });
  return r.Service({
    get_address: r.Func([e], [i], ["query"]),
    get_caller_address: r.Func([], [i], ["query"]),
    get_principal: r.Func([n], [s], ["query"]),
    siws_get_delegation: r.Func(
      [n, h, p],
      [C],
      ["query"]
    ),
    siws_login: r.Func(
      [F, n, h],
      [D],
      []
    ),
    siws_prepare_login: r.Func([n], [Z], [])
  });
};
class va {
  constructor(t, e) {
    this.state = gt.Status.INIT, this.identity = null, this.principal = null, this.solanaAddress = null, this.handleSolanaConnect = (s) => {
      console.log(`[${this.walletName}] Solana wallet connected:`, s.toBase58()), this.solanaAddress = s.toBase58();
    }, this.handleSolanaDisconnect = () => {
      console.log(`[${this.walletName}] Solana wallet disconnected.`), this.state !== gt.Status.DISCONNECTING && this.state !== gt.Status.DISCONNECTED && this.disconnect();
    }, this.handleSolanaError = (s) => {
      console.error(`[${this.walletName}] Solana wallet error:`, s), this.state = gt.Status.ERROR, this.disconnect();
    }, this.id = t.id, this.walletName = t.walletName, this.logo = t.logo, this.config = {
      ...e,
      ...t.config
    };
    const n = this.config.solanaNetwork || nr.Mainnet, i = n === nr.Mainnet ? "https://api.mainnet-beta.solana.com" : "https://api.devnet.solana.com";
    if (this.solanaConnection = new pd(i), this.id === "phantomSiws")
      this.solanaAdapter = new yd();
    else if (this.id === "solflareSiws")
      this.solanaAdapter = new Cd({ network: n });
    else
      throw new Error(`Unsupported SIWS adapter ID: ${this.id}. Expected 'phantomSiws' or 'solflareSiws'.`);
    this.setupWalletListeners(), this.state = gt.Status.READY;
  }
  setupWalletListeners() {
    this.solanaAdapter.on("connect", this.handleSolanaConnect), this.solanaAdapter.on("disconnect", this.handleSolanaDisconnect), this.solanaAdapter.on("error", this.handleSolanaError);
  }
  removeWalletListeners() {
    this.solanaAdapter.off("connect", this.handleSolanaConnect), this.solanaAdapter.off("disconnect", this.handleSolanaDisconnect), this.solanaAdapter.off("error", this.handleSolanaError);
  }
  // --- Adapter.Interface Implementation ---
  async isAvailable() {
    return this.solanaAdapter.readyState === ge.Installed || this.solanaAdapter.readyState === ge.Loadable;
  }
  async isConnected() {
    return this.solanaAdapter.connected && this.identity !== null && !this.identity.getPrincipal().isAnonymous();
  }
  async connect() {
    if (this.state === gt.Status.CONNECTING || this.state === gt.Status.CONNECTED)
      return { owner: this.principal, subaccount: null };
    if (this.state !== gt.Status.READY && this.state !== gt.Status.DISCONNECTED)
      throw new Error(`Cannot connect while in state: ${this.state}`);
    this.state = gt.Status.CONNECTING;
    try {
      if (this.solanaAdapter.connected || (console.log(`[${this.walletName}] Connecting Solana wallet...`), await this.solanaAdapter.connect()), !this.solanaAdapter.publicKey)
        throw new Error("Solana wallet connected but public key not available.");
      this.solanaAddress = this.solanaAdapter.publicKey.toBase58(), console.log(`[${this.walletName}] Using Solana address:`, this.solanaAddress), console.log(`[${this.walletName}] Starting SIWS flow...`);
      const t = await this.performSiwsLogin(this.solanaAddress);
      if (this.identity = t.identity, this.principal = t.principal, !this.principal || this.principal.isAnonymous())
        throw new Error("SIWS flow completed but resulted in an anonymous principal.");
      return this.state = gt.Status.CONNECTED, console.log(`[${this.walletName}] SIWS Connect successful. Principal: ${this.principal.toText()}`), { owner: this.principal, subaccount: null };
    } catch (t) {
      throw console.error(`[${this.walletName}] Connect failed:`, t), this.state = gt.Status.ERROR, await this.disconnect(), t;
    }
  }
  async disconnect() {
    if (!(this.state === gt.Status.DISCONNECTING || this.state === gt.Status.DISCONNECTED)) {
      this.state, this.state = gt.Status.DISCONNECTING, console.log(`[${this.walletName}] Disconnecting...`);
      try {
        this.solanaAdapter.connected && (this.removeWalletListeners(), await this.solanaAdapter.disconnect(), this.setupWalletListeners());
      } catch (t) {
        console.warn(`[${this.walletName}] Error during Solana disconnect:`, t);
      } finally {
        this.identity = null, this.principal = null, this.solanaAddress = null, this.state = gt.Status.DISCONNECTED, console.log(`[${this.walletName}] Disconnected.`);
      }
    }
  }
  async getPrincipal() {
    if (!this.principal)
      throw new Error("Not connected or SIWS flow not completed.");
    return this.principal;
  }
  async getAccountId() {
    if (!this.solanaAddress)
      throw new Error("Not connected or Solana address not available.");
    return this.solanaAddress;
  }
  createActor(t, e, n) {
    if ((n?.requiresSigning ?? !0) && !this.identity)
      throw new Error("Cannot create signed actor: Not connected or SIWS flow not completed.");
    const s = Ye.createSync({
      host: this.config.hostUrl,
      identity: this.identity,
      verifyQuerySignatures: this.config.verifyQuerySignatures
    });
    return Tn.createActor(e, { agent: s, canisterId: t });
  }
  // --- SIWS Specific Methods ---
  createSiwsProviderActor(t) {
    if (console.log("Creating SIWS provider actor with canister ID:", this.config), !this.config.siwsProviderCanisterId)
      throw new Error("SIWS provider canister ID not configured.");
    const e = Ye.createSync({
      host: this.config.hostUrl,
      identity: t ?? new Yc(),
      // Use provided identity or anonymous
      verifyQuerySignatures: this.config.verifyQuerySignatures
    });
    return Tn.createActor(Ud, {
      agent: e,
      canisterId: this.config.siwsProviderCanisterId
    });
  }
  async performSiwsLogin(t) {
    const e = this.createSiwsProviderActor(), n = await e.siws_prepare_login(t);
    if ("Err" in n) throw new Error(`SIWS Prepare Login failed: ${JSON.stringify(n.Err)}`);
    const i = n.Ok, s = Od(i), l = new TextEncoder().encode(s);
    if (!("signMessage" in this.solanaAdapter))
      throw new Error(`Connected Solana adapter '${this.walletName}' does not support signMessage.`);
    const p = await this.solanaAdapter.signMessage(l), v = Dd.encode(p), S = xa.generate(), C = S.getPublicKey().toDer(), F = await e.siws_login(v, t, new Uint8Array(C));
    if ("Err" in F) throw new Error(`SIWS Login failed: ${JSON.stringify(F.Err)}`);
    const U = F.Ok, z = await e.siws_get_delegation(t, new Uint8Array(C), U.expiration);
    if ("Err" in z) throw new Error(`SIWS Get Delegation failed: ${JSON.stringify(z.Err)}`);
    const D = z.Ok, Z = [{
      delegation: new Ia(
        D.delegation.pubkey.slice().buffer,
        // Ensure ArrayBuffer
        D.delegation.expiration,
        // Access the inner array if targets exist, otherwise pass undefined or empty array
        D.delegation.targets.length > 0 ? D.delegation.targets[0] : void 0
      ),
      // Cast the ArrayBuffer using 'as any' to bypass strict signature type check
      signature: D.signature.slice().buffer
    }], _ = Sa.fromDelegations(
      Z,
      U.user_canister_pubkey.slice().buffer
      // Ensure ArrayBuffer
    ), q = Ba.fromDelegation(S, _), V = q.getPrincipal();
    try {
      const X = q.getDelegation().delegations.map((et) => et.delegation.targets);
      console.log(`[${this.walletName}] DelegationIdentity created with targets:`, X.map((et) => et.toString()));
    } catch (J) {
      console.warn(`[${this.walletName}] Could not log delegation targets:`, J);
    }
    return { identity: q, principal: V };
  }
}
const jd = "data:image/svg+xml,%3csvg%20width='1200'%20height='1200'%20viewBox='0%200%201200%201200'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cg%20clip-path='url(%23clip0_2800_140397)'%3e%3crect%20width='1200'%20height='1200'%20fill='%239886E5'/%3e%3cpath%20fill-rule='evenodd'%20clip-rule='evenodd'%20d='M516.641%20777.604C466.226%20854.856%20381.747%20952.618%20269.335%20952.618C216.194%20952.618%20165.098%20930.741%20165.098%20835.714C165.098%20593.704%20495.521%20219.066%20802.1%20219.066C976.509%20219.066%201046%20340.071%201046%20477.484C1046%20653.865%20931.544%20855.54%20817.77%20855.54C781.661%20855.54%20763.948%20835.714%20763.948%20804.267C763.948%20796.063%20765.311%20787.175%20768.036%20777.604C729.202%20843.918%20654.261%20905.446%20584.089%20905.446C532.992%20905.446%20507.103%20873.315%20507.103%20828.194C507.103%20811.787%20510.51%20794.696%20516.641%20777.604ZM930.877%20472.714C930.877%20512.755%20907.253%20532.776%20880.826%20532.776C853.998%20532.776%20830.775%20512.755%20830.775%20472.714C830.775%20432.673%20853.998%20412.653%20880.826%20412.653C907.253%20412.653%20930.877%20432.673%20930.877%20472.714ZM780.73%20472.714C780.73%20512.755%20757.105%20532.776%20730.678%20532.776C703.851%20532.776%20680.627%20512.755%20680.627%20472.714C680.627%20432.673%20703.851%20412.653%20730.678%20412.653C757.105%20412.653%20780.73%20432.673%20780.73%20472.714Z'%20fill='%23FFFDF8'/%3e%3c/g%3e%3cdefs%3e%3cclipPath%20id='clip0_2800_140397'%3e%3crect%20width='1200'%20height='1200'%20fill='white'/%3e%3c/clipPath%3e%3c/defs%3e%3c/svg%3e", zd = "data:image/svg+xml,%3csvg%20width='290'%20height='290'%20viewBox='0%200%20290%20290'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cg%20clip-path='url(%23clip0_146_299)'%3e%3cpath%20d='M63.2951%201H226.705C261.11%201%20289%2028.8905%20289%2063.2951V226.705C289%20261.11%20261.11%20289%20226.705%20289H63.2951C28.8905%20289%201%20261.11%201%20226.705V63.2951C1%2028.8905%2028.8905%201%2063.2951%201Z'%20fill='%23FFEF46'%20stroke='%23EEDA0F'%20stroke-width='2'/%3e%3cpath%20d='M140.548%20153.231L154.832%20139.432L181.462%20148.147C198.893%20153.958%20207.609%20164.61%20207.609%20179.62C207.609%20190.999%20203.251%20198.504%20194.536%20208.188L191.873%20211.093L192.841%20204.314C196.714%20179.62%20189.452%20168.968%20165.484%20161.22L140.548%20153.231ZM104.717%2068.739L177.347%2092.9488L161.61%20107.959L123.843%2095.3698C110.77%2091.012%20106.412%2083.9911%20104.717%2069.2232V68.739ZM100.359%20191.725L116.822%20175.988L147.811%20186.157C164.031%20191.483%20169.599%20198.504%20167.905%20216.177L100.359%20191.725ZM79.539%20121.516C79.539%20116.917%2081.9599%20112.559%2086.0756%20108.927C90.4334%20115.222%2097.9384%20120.79%20109.801%20124.664L135.464%20133.137L121.18%20146.937L96.0016%20138.705C84.3809%20134.832%2079.539%20129.021%2079.539%20121.516ZM155.558%20248.618C208.819%20213.272%20237.387%20189.304%20237.387%20159.768C237.387%20140.158%20225.766%20129.263%20200.104%20120.79L180.736%20114.253L233.756%2063.4128L223.103%2052.0342L207.367%2065.8337L133.043%2041.3818C110.043%2048.8869%2080.9916%2070.9178%2080.9916%2092.9487C80.9916%2095.3697%2081.2337%2097.7907%2081.96%20100.454C62.8342%20111.348%2055.0871%20121.516%2055.0871%20134.105C55.0871%20145.968%2061.3816%20157.831%2081.4758%20164.368L97.4542%20169.694L42.2559%20222.713L52.9082%20234.092L70.0972%20218.356L155.558%20248.618Z'%20fill='%2302050A'/%3e%3c/g%3e%3cdefs%3e%3cclipPath%20id='clip0_146_299'%3e%3crect%20width='290'%20height='290'%20fill='white'/%3e%3c/clipPath%3e%3c/defs%3e%3c/svg%3e", Pd = {
  phantomSiws: {
    id: "phantomSiws",
    walletName: "Phantom",
    logo: jd,
    adapter: va,
    // Use the unified SIWS adapter
    config: {
      enabled: !1,
      // Disabled by default, user must enable and configure
      solanaNetwork: nr.Mainnet
      // Default to mainnet
    }
  },
  solflareSiws: {
    id: "solflareSiws",
    walletName: "Solflare",
    logo: zd,
    adapter: va,
    // Use the unified SIWS adapter
    config: {
      enabled: !1,
      // Disabled by default, user must enable and configure
      solanaNetwork: nr.Mainnet
      // Default to mainnet
    }
  }
}, Ea = {
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
    ...Wu,
    ...Pd
    // Merge SolAdapters into the defaults
  }
};
function Fd(r = {}) {
  const t = { ...Ea.adapters };
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
    ...Ea,
    ...r,
    adapters: t
    // Use the adapters map with refined merging
  };
  return t.ii && !r.adapters?.ii?.config?.identityProvider && (t.ii.config.identityProvider = e.dfxNetwork === "local" ? "http://rdmx6-jaaaa-aaaaa-aaadq-cai.localhost:4943" : "https://identity.ic0.app"), e;
}
class _d {
  constructor(t = {}) {
    this.account = null, this.activeWallet = null, this.provider = null, this.actorCache = /* @__PURE__ */ new Map(), this.isConnecting = !1, this.config = Fd(t), this.adapters = this.config.adapters || {};
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
    const s = Tn.createActor(e, {
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
const Xd = (r = {}) => new _d(r);
export {
  fc as E,
  At as P,
  Vu as S,
  xn as T,
  Ec as V,
  $u as a,
  Xu as b,
  Fd as c,
  _d as d,
  Xd as e,
  Tr as g
};
