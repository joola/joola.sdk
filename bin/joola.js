(function() {
  function v(a, b) {
    var c;
    a || (a = {});
    for(c in b) {
      a[c] = b[c]
    }
    return a
  }
  function x() {
    var a, b = arguments.length, c = {}, d = function(a, b) {
      var c, h;
      for(h in b) {
        b.hasOwnProperty(h) && (c = b[h], typeof a !== "object" && (a = {}), a[h] = c && typeof c === "object" && Object.prototype.toString.call(c) !== "[object Array]" && typeof c.nodeType !== "number" ? d(a[h] || {}, c) : b[h])
      }
      return a
    };
    for(a = 0;a < b;a++) {
      c = d(c, arguments[a])
    }
    return c
  }
  function u(a, b) {
    return parseInt(a, b || 10)
  }
  function fa(a) {
    return typeof a === "string"
  }
  function V(a) {
    return typeof a === "object"
  }
  function Da(a) {
    return Object.prototype.toString.call(a) === "[object Array]"
  }
  function Ea(a) {
    return typeof a === "number"
  }
  function ka(a) {
    return I.log(a) / I.LN10
  }
  function da(a) {
    return I.pow(10, a)
  }
  function ga(a, b) {
    for(var c = a.length;c--;) {
      if(a[c] === b) {
        a.splice(c, 1);
        break
      }
    }
  }
  function r(a) {
    return a !== y && a !== null
  }
  function A(a, b, c) {
    var d, e;
    if(fa(b)) {
      r(c) ? a.setAttribute(b, c) : a && a.getAttribute && (e = a.getAttribute(b))
    }else {
      if(r(b) && V(b)) {
        for(d in b) {
          a.setAttribute(d, b[d])
        }
      }
    }
    return e
  }
  function ha(a) {
    return Da(a) ? a : [a]
  }
  function o() {
    var a = arguments, b, c, d = a.length;
    for(b = 0;b < d;b++) {
      if(c = a[b], typeof c !== "undefined" && c !== null) {
        return c
      }
    }
  }
  function L(a, b) {
    if(Fa && b && b.opacity !== y) {
      b.filter = "alpha(opacity=" + b.opacity * 100 + ")"
    }
    v(a.style, b)
  }
  function U(a, b, c, d, e) {
    a = z.createElement(a);
    b && v(a, b);
    e && L(a, {padding:0, border:S, margin:0});
    c && L(a, c);
    d && d.appendChild(a);
    return a
  }
  function ea(a, b) {
    var c = function() {
    };
    c.prototype = new a;
    v(c.prototype, b);
    return c
  }
  function ua(a, b, c, d) {
    var e = N.lang, f = b === -1 ? ((a || 0).toString().split(".")[1] || "").length : isNaN(b = Q(b)) ? 2 : b, b = c === void 0 ? e.decimalPoint : c, d = d === void 0 ? e.thousandsSep : d, e = a < 0 ? "-" : "", c = String(u(a = Q(+a || 0).toFixed(f))), g = c.length > 3 ? c.length % 3 : 0;
    return e + (g ? c.substr(0, g) + d : "") + c.substr(g).replace(/(\d{3})(?=\d)/g, "$1" + d) + (f ? b + Q(a - c).toFixed(f).slice(2) : "")
  }
  function va(a, b) {
    return Array((b || 2) + 1 - String(a).length).join(0) + a
  }
  function zb(a, b, c) {
    var d = a[b];
    a[b] = function() {
      var a = Array.prototype.slice.call(arguments);
      a.unshift(d);
      return c.apply(this, a)
    }
  }
  function wa(a, b) {
    for(var c = "{", d = !1, e, f, g, h, i, j = [];(c = a.indexOf(c)) !== -1;) {
      e = a.slice(0, c);
      if(d) {
        f = e.split(":");
        g = f.shift().split(".");
        i = g.length;
        e = b;
        for(h = 0;h < i;h++) {
          e = e[g[h]]
        }
        if(f.length) {
          f = f.join(":"), g = /\.([0-9])/, h = N.lang, i = void 0, /f$/.test(f) ? (i = (i = f.match(g)) ? i[1] : -1, e = ua(e, i, h.decimalPoint, f.indexOf(",") > -1 ? h.thousandsSep : "")) : e = Ua(f, e)
        }
      }
      j.push(e);
      a = a.slice(c + 1);
      c = (d = !d) ? "}" : "{"
    }
    j.push(a);
    return j.join("")
  }
  function ib(a, b, c, d) {
    var e, c = o(c, 1);
    e = a / c;
    b || (b = [1, 2, 2.5, 5, 10], d && d.allowDecimals === !1 && (c === 1 ? b = [1, 2, 5, 10] : c <= 0.1 && (b = [1 / c])));
    for(d = 0;d < b.length;d++) {
      if(a = b[d], e <= (b[d] + (b[d + 1] || b[d])) / 2) {
        break
      }
    }
    a *= c;
    return a
  }
  function Ab(a, b) {
    var c = b || [[Bb, [1, 2, 5, 10, 20, 25, 50, 100, 200, 500]], [jb, [1, 2, 5, 10, 15, 30]], [Va, [1, 2, 5, 10, 15, 30]], [Oa, [1, 2, 3, 4, 6, 8, 12]], [oa, [1, 2]], [Wa, [1, 2]], [Pa, [1, 2, 3, 4, 6]], [xa, null]], d = c[c.length - 1], e = E[d[0]], f = d[1], g;
    for(g = 0;g < c.length;g++) {
      if(d = c[g], e = E[d[0]], f = d[1], c[g + 1] && a <= (e * f[f.length - 1] + E[c[g + 1][0]]) / 2) {
        break
      }
    }
    e === E[xa] && a < 5 * e && (f = [1, 2, 5]);
    e === E[xa] && a < 5 * e && (f = [1, 2, 5]);
    c = ib(a / e, f);
    return{unitRange:e, count:c, unitName:d[0]}
  }
  function Cb(a, b, c, d) {
    var e = [], f = {}, g = N.global.useUTC, h, i = new Date(b), j = a.unitRange, k = a.count;
    if(r(b)) {
      j >= E[jb] && (i.setMilliseconds(0), i.setSeconds(j >= E[Va] ? 0 : k * T(i.getSeconds() / k)));
      if(j >= E[Va]) {
        i[Db](j >= E[Oa] ? 0 : k * T(i[kb]() / k))
      }
      if(j >= E[Oa]) {
        i[Eb](j >= E[oa] ? 0 : k * T(i[lb]() / k))
      }
      if(j >= E[oa]) {
        i[mb](j >= E[Pa] ? 1 : k * T(i[Qa]() / k))
      }
      j >= E[Pa] && (i[Fb](j >= E[xa] ? 0 : k * T(i[Xa]() / k)), h = i[Ya]());
      j >= E[xa] && (h -= h % k, i[Gb](h));
      if(j === E[Wa]) {
        i[mb](i[Qa]() - i[nb]() + o(d, 1))
      }
      b = 1;
      h = i[Ya]();
      for(var d = i.getTime(), m = i[Xa](), l = i[Qa](), p = g ? 0 : (864E5 + i.getTimezoneOffset() * 6E4) % 864E5;d < c;) {
        e.push(d), j === E[xa] ? d = Za(h + b * k, 0) : j === E[Pa] ? d = Za(h, m + b * k) : !g && (j === E[oa] || j === E[Wa]) ? d = Za(h, m, l + b * k * (j === E[oa] ? 1 : 7)) : d += j * k, b++
      }
      e.push(d);
      n(ob(e, function(a) {
        return j <= E[Oa] && a % E[oa] === p
      }), function(a) {
        f[a] = oa
      })
    }
    e.info = v(a, {higherRanks:f, totalRange:j * k});
    return e
  }
  function Hb() {
    this.symbol = this.color = 0
  }
  function Ib(a, b) {
    var c = a.length, d, e;
    for(e = 0;e < c;e++) {
      a[e].ss_i = e
    }
    a.sort(function(a, c) {
      d = b(a, c);
      return d === 0 ? a.ss_i - c.ss_i : d
    });
    for(e = 0;e < c;e++) {
      delete a[e].ss_i
    }
  }
  function Ga(a) {
    for(var b = a.length, c = a[0];b--;) {
      a[b] < c && (c = a[b])
    }
    return c
  }
  function pa(a) {
    for(var b = a.length, c = a[0];b--;) {
      a[b] > c && (c = a[b])
    }
    return c
  }
  function Ha(a, b) {
    for(var c in a) {
      a[c] && a[c] !== b && a[c].destroy && a[c].destroy(), delete a[c]
    }
  }
  function Ra(a) {
    $a || ($a = U(ya));
    a && $a.appendChild(a);
    $a.innerHTML = ""
  }
  function qa(a, b) {
    var c = "Highcharts error #" + a + ": www.highcharts.com/errors/" + a;
    if(b) {
      throw c;
    }else {
      O.console && console.log(c)
    }
  }
  function ia(a) {
    return parseFloat(a.toPrecision(14))
  }
  function Ia(a, b) {
    za = o(a, b.animation)
  }
  function Jb() {
    var a = N.global.useUTC, b = a ? "getUTC" : "get", c = a ? "setUTC" : "set";
    Za = a ? Date.UTC : function(a, b, c, g, h, i) {
      return(new Date(a, b, o(c, 1), o(g, 0), o(h, 0), o(i, 0))).getTime()
    };
    kb = b + "Minutes";
    lb = b + "Hours";
    nb = b + "Day";
    Qa = b + "Date";
    Xa = b + "Month";
    Ya = b + "FullYear";
    Db = c + "Minutes";
    Eb = c + "Hours";
    mb = c + "Date";
    Fb = c + "Month";
    Gb = c + "FullYear"
  }
  function ra() {
  }
  function Ja(a, b, c, d) {
    this.axis = a;
    this.pos = b;
    this.type = c || "";
    this.isNew = !0;
    !c && !d && this.addLabel()
  }
  function pb(a, b) {
    this.axis = a;
    if(b) {
      this.options = b, this.id = b.id
    }
  }
  function Kb(a, b, c, d, e, f) {
    var g = a.chart.inverted;
    this.axis = a;
    this.isNegative = c;
    this.options = b;
    this.x = d;
    this.stack = e;
    this.percent = f === "percent";
    this.alignOptions = {align:b.align || (g ? c ? "left" : "right" : "center"), verticalAlign:b.verticalAlign || (g ? "middle" : c ? "bottom" : "top"), y:o(b.y, g ? 4 : c ? 14 : -6), x:o(b.x, g ? c ? -6 : 6 : 0)};
    this.textAlign = b.textAlign || (g ? c ? "right" : "left" : "center")
  }
  function ab() {
    this.init.apply(this, arguments)
  }
  function qb() {
    this.init.apply(this, arguments)
  }
  function rb(a, b) {
    this.init(a, b)
  }
  function sb(a, b) {
    this.init(a, b)
  }
  function tb() {
    this.init.apply(this, arguments)
  }
  var y, z = document, O = window, I = Math, t = I.round, T = I.floor, ja = I.ceil, q = I.max, K = I.min, Q = I.abs, Y = I.cos, ca = I.sin, Ka = I.PI, bb = Ka * 2 / 360, Aa = navigator.userAgent, Lb = O.opera, Fa = /msie/i.test(Aa) && !Lb, cb = z.documentMode === 8, db = /AppleWebKit/.test(Aa), eb = /Firefox/.test(Aa), Mb = /(Mobile|Android|Windows Phone)/.test(Aa), sa = "http://www.w3.org/2000/svg", Z = !!z.createElementNS && !!z.createElementNS(sa, "svg").createSVGRect, Sb = eb && parseInt(Aa.split("Firefox/")[1], 
  10) < 4, $ = !Z && !Fa && !!z.createElement("canvas").getContext, Sa, fb = z.documentElement.ontouchstart !== y, Nb = {}, ub = 0, $a, N, Ua, za, vb, E, ta = function() {
  }, Ba = [], ya = "div", S = "none", Ob = "rgba(192,192,192," + (Z ? 1E-4 : 0.002) + ")", Bb = "millisecond", jb = "second", Va = "minute", Oa = "hour", oa = "day", Wa = "week", Pa = "month", xa = "year", Pb = "stroke-width", Za, kb, lb, nb, Qa, Xa, Ya, Db, Eb, mb, Fb, Gb, aa = {};
  O.Highcharts = O.Highcharts ? qa(16, !0) : {};
  Ua = function(a, b, c) {
    if(!r(b) || isNaN(b)) {
      return"Invalid date"
    }
    var a = o(a, "%Y-%m-%d %H:%M:%S"), d = new Date(b), e, f = d[lb](), g = d[nb](), h = d[Qa](), i = d[Xa](), j = d[Ya](), k = N.lang, m = k.weekdays, d = v({a:m[g].substr(0, 3), A:m[g], d:va(h), e:h, b:k.shortMonths[i], B:k.months[i], m:va(i + 1), y:j.toString().substr(2, 2), Y:j, H:va(f), I:va(f % 12 || 12), l:f % 12 || 12, M:va(d[kb]()), p:f < 12 ? "AM" : "PM", P:f < 12 ? "am" : "pm", S:va(d.getSeconds()), L:va(t(b % 1E3), 3)}, Highcharts.dateFormats);
    for(e in d) {
      for(;a.indexOf("%" + e) !== -1;) {
        a = a.replace("%" + e, typeof d[e] === "function" ? d[e](b) : d[e])
      }
    }
    return c ? a.substr(0, 1).toUpperCase() + a.substr(1) : a
  };
  Hb.prototype = {wrapColor:function(a) {
    if(this.color >= a) {
      this.color = 0
    }
  }, wrapSymbol:function(a) {
    if(this.symbol >= a) {
      this.symbol = 0
    }
  }};
  E = function() {
    for(var a = 0, b = arguments, c = b.length, d = {};a < c;a++) {
      d[b[a++]] = b[a]
    }
    return d
  }(Bb, 1, jb, 1E3, Va, 6E4, Oa, 36E5, oa, 864E5, Wa, 6048E5, Pa, 26784E5, xa, 31556952E3);
  vb = {init:function(a, b, c) {
    var b = b || "", d = a.shift, e = b.indexOf("C") > -1, f = e ? 7 : 3, g, b = b.split(" "), c = [].concat(c), h, i, j = function(a) {
      for(g = a.length;g--;) {
        a[g] === "M" && a.splice(g + 1, 0, a[g + 1], a[g + 2], a[g + 1], a[g + 2])
      }
    };
    e && (j(b), j(c));
    a.isArea && (h = b.splice(b.length - 6, 6), i = c.splice(c.length - 6, 6));
    if(d <= c.length / f) {
      for(;d--;) {
        c = [].concat(c).splice(0, f).concat(c)
      }
    }
    a.shift = 0;
    if(b.length) {
      for(a = c.length;b.length < a;) {
        d = [].concat(b).splice(b.length - f, f), e && (d[f - 6] = d[f - 2], d[f - 5] = d[f - 1]), b = b.concat(d)
      }
    }
    h && (b = b.concat(h), c = c.concat(i));
    return[b, c]
  }, step:function(a, b, c, d) {
    var e = [], f = a.length;
    if(c === 1) {
      e = d
    }else {
      if(f === b.length && c < 1) {
        for(;f--;) {
          d = parseFloat(a[f]), e[f] = isNaN(d) ? a[f] : c * parseFloat(b[f] - d) + d
        }
      }else {
        e = b
      }
    }
    return e
  }};
  (function(a) {
    O.HighchartsAdapter = O.HighchartsAdapter || a && {init:function(b) {
      var c = a.fx, d = c.step, e, f = a.Tween, g = f && f.propHooks;
      e = a.cssHooks.opacity;
      a.extend(a.easing, {easeOutQuad:function(a, b, c, d, e) {
        return-d * (b /= e) * (b - 2) + c
      }});
      a.each(["cur", "_default", "width", "height", "opacity"], function(a, b) {
        var e = d, k, m;
        b === "cur" ? e = c.prototype : b === "_default" && f && (e = g[b], b = "set");
        (k = e[b]) && (e[b] = function(c) {
          c = a ? c : this;
          m = c.elem;
          return m.attr ? m.attr(c.prop, b === "cur" ? y : c.now) : k.apply(this, arguments)
        })
      });
      zb(e, "get", function(a, b, c) {
        return b.attr ? b.opacity || 0 : a.call(this, b, c)
      });
      e = function(a) {
        var c = a.elem, d;
        if(!a.started) {
          d = b.init(c, c.d, c.toD), a.start = d[0], a.end = d[1], a.started = !0
        }
        c.attr("d", b.step(a.start, a.end, a.pos, c.toD))
      };
      f ? g.d = {set:e} : d.d = e;
      this.each = Array.prototype.forEach ? function(a, b) {
        return Array.prototype.forEach.call(a, b)
      } : function(a, b) {
        for(var c = 0, d = a.length;c < d;c++) {
          if(b.call(a[c], a[c], c, a) === !1) {
            return c
          }
        }
      };
      a.fn.highcharts = function() {
        var a = "Chart", b = arguments, c, d;
        fa(b[0]) && (a = b[0], b = Array.prototype.slice.call(b, 1));
        c = b[0];
        if(c !== y) {
          c.chart = c.chart || {}, c.chart.renderTo = this[0], new Highcharts[a](c, b[1]), d = this
        }
        c === y && (d = Ba[A(this[0], "data-highcharts-chart")]);
        return d
      }
    }, getScript:a.getScript, inArray:a.inArray, adapterRun:function(b, c) {
      return a(b)[c]()
    }, grep:a.grep, map:function(a, c) {
      for(var d = [], e = 0, f = a.length;e < f;e++) {
        d[e] = c.call(a[e], a[e], e, a)
      }
      return d
    }, offset:function(b) {
      return a(b).offset()
    }, addEvent:function(b, c, d) {
      a(b).bind(c, d)
    }, removeEvent:function(b, c, d) {
      var e = z.removeEventListener ? "removeEventListener" : "detachEvent";
      z[e] && b && !b[e] && (b[e] = function() {
      });
      a(b).unbind(c, d)
    }, fireEvent:function(b, c, d, e) {
      var f = a.Event(c), g = "detached" + c, h;
      !Fa && d && (delete d.layerX, delete d.layerY);
      v(f, d);
      b[c] && (b[g] = b[c], b[c] = null);
      a.each(["preventDefault", "stopPropagation"], function(a, b) {
        var c = f[b];
        f[b] = function() {
          try {
            c.call(f)
          }catch(a) {
            b === "preventDefault" && (h = !0)
          }
        }
      });
      a(b).trigger(f);
      b[g] && (b[c] = b[g], b[g] = null);
      e && !f.isDefaultPrevented() && !h && e(f)
    }, washMouseEvent:function(a) {
      var c = a.originalEvent || a;
      if(c.pageX === y) {
        c.pageX = a.pageX, c.pageY = a.pageY
      }
      return c
    }, animate:function(b, c, d) {
      var e = a(b);
      if(!b.style) {
        b.style = {}
      }
      if(c.d) {
        b.toD = c.d, c.d = 1
      }
      e.stop();
      e.animate(c, d)
    }, stop:function(b) {
      a(b).stop()
    }}
  })(O.jQuery);
  var W = O.HighchartsAdapter, M = W || {};
  W && W.init.call(W, vb);
  var gb = M.adapterRun, Tb = M.getScript, la = M.inArray, n = M.each, ob = M.grep, Ub = M.offset, La = M.map, J = M.addEvent, ba = M.removeEvent, D = M.fireEvent, Qb = M.washMouseEvent, wb = M.animate, Ta = M.stop, M = {enabled:!0, align:"center", x:0, y:15, style:{color:"#666", cursor:"default", fontSize:"11px", lineHeight:"14px"}};
  N = {colors:"#2f7ed8,#0d233a,#8bbc21,#910000,#1aadce,#492970,#f28f43,#77a1e5,#c42525,#a6c96a".split(","), symbols:["circle", "diamond", "square", "triangle", "triangle-down"], lang:{loading:"Loading...", months:"January,February,March,April,May,June,July,August,September,October,November,December".split(","), shortMonths:"Jan,Feb,Mar,Apr,May,Jun,Jul,Aug,Sep,Oct,Nov,Dec".split(","), weekdays:"Sunday,Monday,Tuesday,Wednesday,Thursday,Friday,Saturday".split(","), decimalPoint:".", numericSymbols:"k,M,G,T,P,E".split(","), 
  resetZoom:"Reset zoom", resetZoomTitle:"Reset zoom level 1:1", thousandsSep:","}, global:{useUTC:!0, canvasToolsURL:"http://code.highcharts.com/3.0.2/modules/canvas-tools.js", VMLRadialGradientURL:"http://code.highcharts.com/3.0.2/gfx/vml-radial-gradient.png"}, chart:{borderColor:"#4572A7", borderRadius:5, defaultSeriesType:"line", ignoreHiddenSeries:!0, spacingTop:10, spacingRight:10, spacingBottom:15, spacingLeft:10, style:{fontFamily:'"Lucida Grande", "Lucida Sans Unicode", Verdana, Arial, Helvetica, sans-serif', 
  fontSize:"12px"}, backgroundColor:"#FFFFFF", plotBorderColor:"#C0C0C0", resetZoomButton:{theme:{zIndex:20}, position:{align:"right", x:-10, y:10}}}, title:{text:"Chart title", align:"center", y:15, style:{color:"#274b6d", fontSize:"16px"}}, subtitle:{text:"", align:"center", y:30, style:{color:"#4d759e"}}, plotOptions:{line:{allowPointSelect:!1, showCheckbox:!1, animation:{duration:1E3}, events:{}, lineWidth:2, marker:{enabled:!0, lineWidth:0, radius:4, lineColor:"#FFFFFF", states:{hover:{enabled:!0}, 
  select:{fillColor:"#FFFFFF", lineColor:"#000000", lineWidth:2}}}, point:{events:{}}, dataLabels:x(M, {enabled:!1, formatter:function() {
    return ua(this.y, -1)
  }, verticalAlign:"bottom", y:0}), cropThreshold:300, pointRange:0, showInLegend:!0, states:{hover:{marker:{}}, select:{marker:{}}}, stickyTracking:!0}}, labels:{style:{position:"absolute", color:"#3E576F"}}, legend:{enabled:!0, align:"center", layout:"horizontal", labelFormatter:function() {
    return this.name
  }, borderWidth:1, borderColor:"#909090", borderRadius:5, navigation:{activeColor:"#274b6d", inactiveColor:"#CCC"}, shadow:!1, itemStyle:{cursor:"pointer", color:"#274b6d", fontSize:"12px"}, itemHoverStyle:{color:"#000"}, itemHiddenStyle:{color:"#CCC"}, itemCheckboxStyle:{position:"absolute", width:"13px", height:"13px"}, symbolWidth:16, symbolPadding:5, verticalAlign:"bottom", x:0, y:0, title:{style:{fontWeight:"bold"}}}, loading:{labelStyle:{fontWeight:"bold", position:"relative", top:"1em"}, 
  style:{position:"absolute", backgroundColor:"white", opacity:0.5, textAlign:"center"}}, tooltip:{enabled:!0, animation:Z, backgroundColor:"rgba(255, 255, 255, .85)", borderWidth:1, borderRadius:3, dateTimeLabelFormats:{millisecond:"%A, %b %e, %H:%M:%S.%L", second:"%A, %b %e, %H:%M:%S", minute:"%A, %b %e, %H:%M", hour:"%A, %b %e, %H:%M", day:"%A, %b %e, %Y", week:"Week from %A, %b %e, %Y", month:"%B %Y", year:"%Y"}, headerFormat:'<span style="font-size: 10px">{point.key}</span><br/>', pointFormat:'<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b><br/>', 
  shadow:!0, snap:Mb ? 25 : 10, style:{color:"#333333", cursor:"default", fontSize:"12px", padding:"8px", whiteSpace:"nowrap"}}, credits:{enabled:!0, text:"Highcharts.com", href:"http://www.highcharts.com", position:{align:"right", x:-10, verticalAlign:"bottom", y:-5}, style:{cursor:"pointer", color:"#909090", fontSize:"9px"}}};
  var X = N.plotOptions, W = X.line;
  Jb();
  var ma = function(a) {
    var b = [], c, d;
    (function(a) {
      a && a.stops ? d = La(a.stops, function(a) {
        return ma(a[1])
      }) : (c = /rgba\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]?(?:\.[0-9]+)?)\s*\)/.exec(a)) ? b = [u(c[1]), u(c[2]), u(c[3]), parseFloat(c[4], 10)] : (c = /#([a-fA-F0-9]{2})([a-fA-F0-9]{2})([a-fA-F0-9]{2})/.exec(a)) ? b = [u(c[1], 16), u(c[2], 16), u(c[3], 16), 1] : (c = /rgb\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*\)/.exec(a)) && (b = [u(c[1]), u(c[2]), u(c[3]), 1])
    })(a);
    return{get:function(c) {
      var f;
      d ? (f = x(a), f.stops = [].concat(f.stops), n(d, function(a, b) {
        f.stops[b] = [f.stops[b][0], a.get(c)]
      })) : f = b && !isNaN(b[0]) ? c === "rgb" ? "rgb(" + b[0] + "," + b[1] + "," + b[2] + ")" : c === "a" ? b[3] : "rgba(" + b.join(",") + ")" : a;
      return f
    }, brighten:function(a) {
      if(d) {
        n(d, function(b) {
          b.brighten(a)
        })
      }else {
        if(Ea(a) && a !== 0) {
          var c;
          for(c = 0;c < 3;c++) {
            b[c] += u(a * 255), b[c] < 0 && (b[c] = 0), b[c] > 255 && (b[c] = 255)
          }
        }
      }
      return this
    }, rgba:b, setOpacity:function(a) {
      b[3] = a;
      return this
    }}
  };
  ra.prototype = {init:function(a, b) {
    this.element = b === "span" ? U(b) : z.createElementNS(sa, b);
    this.renderer = a;
    this.attrSetters = {}
  }, opacity:1, animate:function(a, b, c) {
    b = o(b, za, !0);
    Ta(this);
    if(b) {
      b = x(b);
      if(c) {
        b.complete = c
      }
      wb(this, a, b)
    }else {
      this.attr(a), c && c()
    }
  }, attr:function(a, b) {
    var c, d, e, f, g = this.element, h = g.nodeName.toLowerCase(), i = this.renderer, j, k = this.attrSetters, m = this.shadows, l, p, s = this;
    fa(a) && r(b) && (c = a, a = {}, a[c] = b);
    if(fa(a)) {
      c = a, h === "circle" ? c = {x:"cx", y:"cy"}[c] || c : c === "strokeWidth" && (c = "stroke-width"), s = A(g, c) || this[c] || 0, c !== "d" && c !== "visibility" && (s = parseFloat(s))
    }else {
      for(c in a) {
        if(j = !1, d = a[c], e = k[c] && k[c].call(this, d, c), e !== !1) {
          e !== y && (d = e);
          if(c === "d") {
            d && d.join && (d = d.join(" ")), /(NaN| {2}|^$)/.test(d) && (d = "M 0 0")
          }else {
            if(c === "x" && h === "text") {
              for(e = 0;e < g.childNodes.length;e++) {
                f = g.childNodes[e], A(f, "x") === A(g, "x") && A(f, "x", d)
              }
            }else {
              if(this.rotation && (c === "x" || c === "y")) {
                p = !0
              }else {
                if(c === "fill") {
                  d = i.color(d, g, c)
                }else {
                  if(h === "circle" && (c === "x" || c === "y")) {
                    c = {x:"cx", y:"cy"}[c] || c
                  }else {
                    if(h === "rect" && c === "r") {
                      A(g, {rx:d, ry:d}), j = !0
                    }else {
                      if(c === "translateX" || c === "translateY" || c === "rotation" || c === "verticalAlign" || c === "scaleX" || c === "scaleY") {
                        j = p = !0
                      }else {
                        if(c === "stroke") {
                          d = i.color(d, g, c)
                        }else {
                          if(c === "dashstyle") {
                            if(c = "stroke-dasharray", d = d && d.toLowerCase(), d === "solid") {
                              d = S
                            }else {
                              if(d) {
                                d = d.replace("shortdashdotdot", "3,1,1,1,1,1,").replace("shortdashdot", "3,1,1,1").replace("shortdot", "1,1,").replace("shortdash", "3,1,").replace("longdash", "8,3,").replace(/dot/g, "1,3,").replace("dash", "4,3,").replace(/,$/, "").split(",");
                                for(e = d.length;e--;) {
                                  d[e] = u(d[e]) * a["stroke-width"]
                                }
                                d = d.join(",")
                              }
                            }
                          }else {
                            if(c === "width") {
                              d = u(d)
                            }else {
                              if(c === "align") {
                                c = "text-anchor", d = {left:"start", center:"middle", right:"end"}[d]
                              }else {
                                if(c === "title") {
                                  e = g.getElementsByTagName("title")[0], e || (e = z.createElementNS(sa, "title"), g.appendChild(e)), e.textContent = d
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
          c === "strokeWidth" && (c = "stroke-width");
          if(c === "stroke-width" || c === "stroke") {
            this[c] = d;
            if(this.stroke && this["stroke-width"]) {
              A(g, "stroke", this.stroke), A(g, "stroke-width", this["stroke-width"]), this.hasStroke = !0
            }else {
              if(c === "stroke-width" && d === 0 && this.hasStroke) {
                g.removeAttribute("stroke"), this.hasStroke = !1
              }
            }
            j = !0
          }
          this.symbolName && /^(x|y|width|height|r|start|end|innerR|anchorX|anchorY)/.test(c) && (l || (this.symbolAttr(a), l = !0), j = !0);
          if(m && /^(width|height|visibility|x|y|d|transform)$/.test(c)) {
            for(e = m.length;e--;) {
              A(m[e], c, c === "height" ? q(d - (m[e].cutHeight || 0), 0) : d)
            }
          }
          if((c === "width" || c === "height") && h === "rect" && d < 0) {
            d = 0
          }
          this[c] = d;
          c === "text" ? (d !== this.textStr && delete this.bBox, this.textStr = d, this.added && i.buildText(this)) : j || A(g, c, d)
        }
      }
      p && this.updateTransform()
    }
    return s
  }, addClass:function(a) {
    A(this.element, "class", A(this.element, "class") + " " + a);
    return this
  }, symbolAttr:function(a) {
    var b = this;
    n("x,y,r,start,end,width,height,innerR,anchorX,anchorY".split(","), function(c) {
      b[c] = o(a[c], b[c])
    });
    b.attr({d:b.renderer.symbols[b.symbolName](b.x, b.y, b.width, b.height, b)})
  }, clip:function(a) {
    return this.attr("clip-path", a ? "url(" + this.renderer.url + "#" + a.id + ")" : S)
  }, crisp:function(a, b, c, d, e) {
    var f, g = {}, h = {}, i, a = a || this.strokeWidth || this.attr && this.attr("stroke-width") || 0;
    i = t(a) % 2 / 2;
    h.x = T(b || this.x || 0) + i;
    h.y = T(c || this.y || 0) + i;
    h.width = T((d || this.width || 0) - 2 * i);
    h.height = T((e || this.height || 0) - 2 * i);
    h.strokeWidth = a;
    for(f in h) {
      this[f] !== h[f] && (this[f] = g[f] = h[f])
    }
    return g
  }, css:function(a) {
    var b = this.element, c = a && a.width && b.nodeName.toLowerCase() === "text", d, e = "", f = function(a, b) {
      return"-" + b.toLowerCase()
    };
    if(a && a.color) {
      a.fill = a.color
    }
    this.styles = a = v(this.styles, a);
    $ && c && delete a.width;
    if(Fa && !Z) {
      c && delete a.width, L(this.element, a)
    }else {
      for(d in a) {
        e += d.replace(/([A-Z])/g, f) + ":" + a[d] + ";"
      }
      A(b, "style", e)
    }
    c && this.added && this.renderer.buildText(this);
    return this
  }, on:function(a, b) {
    if(fb && a === "click") {
      this.element.ontouchstart = function(a) {
        a.preventDefault();
        b()
      }
    }
    this.element["on" + a] = b;
    return this
  }, setRadialReference:function(a) {
    this.element.radialReference = a;
    return this
  }, translate:function(a, b) {
    return this.attr({translateX:a, translateY:b})
  }, invert:function() {
    this.inverted = !0;
    this.updateTransform();
    return this
  }, htmlCss:function(a) {
    var b = this.element;
    if(b = a && b.tagName === "SPAN" && a.width) {
      delete a.width, this.textWidth = b, this.updateTransform()
    }
    this.styles = v(this.styles, a);
    L(this.element, a);
    return this
  }, htmlGetBBox:function() {
    var a = this.element, b = this.bBox;
    if(!b) {
      if(a.nodeName === "text") {
        a.style.position = "absolute"
      }
      b = this.bBox = {x:a.offsetLeft, y:a.offsetTop, width:a.offsetWidth, height:a.offsetHeight}
    }
    return b
  }, htmlUpdateTransform:function() {
    if(this.added) {
      var a = this.renderer, b = this.element, c = this.translateX || 0, d = this.translateY || 0, e = this.x || 0, f = this.y || 0, g = this.textAlign || "left", h = {left:0, center:0.5, right:1}[g], i = g && g !== "left", j = this.shadows;
      L(b, {marginLeft:c, marginTop:d});
      j && n(j, function(a) {
        L(a, {marginLeft:c + 1, marginTop:d + 1})
      });
      this.inverted && n(b.childNodes, function(c) {
        a.invertChild(c, b)
      });
      if(b.tagName === "SPAN") {
        var k, m, j = this.rotation, l, p = 0, s = 1, p = 0, xb;
        l = u(this.textWidth);
        var B = this.xCorr || 0, w = this.yCorr || 0, G = [j, g, b.innerHTML, this.textWidth].join(",");
        k = {};
        if(G !== this.cTT) {
          if(r(j)) {
            a.isSVG ? (B = Fa ? "-ms-transform" : db ? "-webkit-transform" : eb ? "MozTransform" : Lb ? "-o-transform" : "", k[B] = k.transform = "rotate(" + j + "deg)") : (p = j * bb, s = Y(p), p = ca(p), k.filter = j ? ["progid:DXImageTransform.Microsoft.Matrix(M11=", s, ", M12=", -p, ", M21=", p, ", M22=", s, ", sizingMethod='auto expand')"].join("") : S), L(b, k)
          }
          k = o(this.elemWidth, b.offsetWidth);
          m = o(this.elemHeight, b.offsetHeight);
          if(k > l && /[ \-]/.test(b.textContent || b.innerText)) {
            L(b, {width:l + "px", display:"block", whiteSpace:"normal"}), k = l
          }
          l = a.fontMetrics(b.style.fontSize).b;
          B = s < 0 && -k;
          w = p < 0 && -m;
          xb = s * p < 0;
          B += p * l * (xb ? 1 - h : h);
          w -= s * l * (j ? xb ? h : 1 - h : 1);
          i && (B -= k * h * (s < 0 ? -1 : 1), j && (w -= m * h * (p < 0 ? -1 : 1)), L(b, {textAlign:g}));
          this.xCorr = B;
          this.yCorr = w
        }
        L(b, {left:e + B + "px", top:f + w + "px"});
        if(db) {
          m = b.offsetHeight
        }
        this.cTT = G
      }
    }else {
      this.alignOnAdd = !0
    }
  }, updateTransform:function() {
    var a = this.translateX || 0, b = this.translateY || 0, c = this.scaleX, d = this.scaleY, e = this.inverted, f = this.rotation;
    e && (a += this.attr("width"), b += this.attr("height"));
    a = ["translate(" + a + "," + b + ")"];
    e ? a.push("rotate(90) scale(-1,1)") : f && a.push("rotate(" + f + " " + (this.x || 0) + " " + (this.y || 0) + ")");
    (r(c) || r(d)) && a.push("scale(" + o(c, 1) + " " + o(d, 1) + ")");
    a.length && A(this.element, "transform", a.join(" "))
  }, toFront:function() {
    var a = this.element;
    a.parentNode.appendChild(a);
    return this
  }, align:function(a, b, c) {
    var d, e, f, g, h = {};
    e = this.renderer;
    f = e.alignedObjects;
    if(a) {
      if(this.alignOptions = a, this.alignByTranslate = b, !c || fa(c)) {
        this.alignTo = d = c || "renderer", ga(f, this), f.push(this), c = null
      }
    }else {
      a = this.alignOptions, b = this.alignByTranslate, d = this.alignTo
    }
    c = o(c, e[d], e);
    d = a.align;
    e = a.verticalAlign;
    f = (c.x || 0) + (a.x || 0);
    g = (c.y || 0) + (a.y || 0);
    if(d === "right" || d === "center") {
      f += (c.width - (a.width || 0)) / {right:1, center:2}[d]
    }
    h[b ? "translateX" : "x"] = t(f);
    if(e === "bottom" || e === "middle") {
      g += (c.height - (a.height || 0)) / ({bottom:1, middle:2}[e] || 1)
    }
    h[b ? "translateY" : "y"] = t(g);
    this[this.placed ? "animate" : "attr"](h);
    this.placed = !0;
    this.alignAttr = h;
    return this
  }, getBBox:function() {
    var a = this.bBox, b = this.renderer, c, d = this.rotation;
    c = this.element;
    var e = this.styles, f = d * bb;
    if(!a) {
      if(c.namespaceURI === sa || b.forExport) {
        try {
          a = c.getBBox ? v({}, c.getBBox()) : {width:c.offsetWidth, height:c.offsetHeight}
        }catch(g) {
        }
        if(!a || a.width < 0) {
          a = {width:0, height:0}
        }
      }else {
        a = this.htmlGetBBox()
      }
      if(b.isSVG) {
        b = a.width;
        c = a.height;
        if(Fa && e && e.fontSize === "11px" && c.toPrecision(3) === "22.7") {
          a.height = c = 14
        }
        if(d) {
          a.width = Q(c * ca(f)) + Q(b * Y(f)), a.height = Q(c * Y(f)) + Q(b * ca(f))
        }
      }
      this.bBox = a
    }
    return a
  }, show:function() {
    return this.attr({visibility:"visible"})
  }, hide:function() {
    return this.attr({visibility:"hidden"})
  }, fadeOut:function(a) {
    var b = this;
    b.animate({opacity:0}, {duration:a || 150, complete:function() {
      b.hide()
    }})
  }, add:function(a) {
    var b = this.renderer, c = a || b, d = c.element || b.box, e = d.childNodes, f = this.element, g = A(f, "zIndex"), h;
    if(a) {
      this.parentGroup = a
    }
    this.parentInverted = a && a.inverted;
    this.textStr !== void 0 && b.buildText(this);
    if(g) {
      c.handleZ = !0, g = u(g)
    }
    if(c.handleZ) {
      for(c = 0;c < e.length;c++) {
        if(a = e[c], b = A(a, "zIndex"), a !== f && (u(b) > g || !r(g) && r(b))) {
          d.insertBefore(f, a);
          h = !0;
          break
        }
      }
    }
    h || d.appendChild(f);
    this.added = !0;
    D(this, "add");
    return this
  }, safeRemoveChild:function(a) {
    var b = a.parentNode;
    b && b.removeChild(a)
  }, destroy:function() {
    var a = this, b = a.element || {}, c = a.shadows, d, e;
    b.onclick = b.onmouseout = b.onmouseover = b.onmousemove = b.point = null;
    Ta(a);
    if(a.clipPath) {
      a.clipPath = a.clipPath.destroy()
    }
    if(a.stops) {
      for(e = 0;e < a.stops.length;e++) {
        a.stops[e] = a.stops[e].destroy()
      }
      a.stops = null
    }
    a.safeRemoveChild(b);
    c && n(c, function(b) {
      a.safeRemoveChild(b)
    });
    a.alignTo && ga(a.renderer.alignedObjects, a);
    for(d in a) {
      delete a[d]
    }
    return null
  }, shadow:function(a, b, c) {
    var d = [], e, f, g = this.element, h, i, j, k;
    if(a) {
      i = o(a.width, 3);
      j = (a.opacity || 0.15) / i;
      k = this.parentInverted ? "(-1,-1)" : "(" + o(a.offsetX, 1) + ", " + o(a.offsetY, 1) + ")";
      for(e = 1;e <= i;e++) {
        f = g.cloneNode(0);
        h = i * 2 + 1 - 2 * e;
        A(f, {isShadow:"true", stroke:a.color || "black", "stroke-opacity":j * e, "stroke-width":h, transform:"translate" + k, fill:S});
        if(c) {
          A(f, "height", q(A(f, "height") - h, 0)), f.cutHeight = h
        }
        b ? b.element.appendChild(f) : g.parentNode.insertBefore(f, g);
        d.push(f)
      }
      this.shadows = d
    }
    return this
  }};
  var Ca = function() {
    this.init.apply(this, arguments)
  };
  Ca.prototype = {Element:ra, init:function(a, b, c, d) {
    var e = location, f;
    f = this.createElement("svg").attr({xmlns:sa, version:"1.1"});
    a.appendChild(f.element);
    this.isSVG = !0;
    this.box = f.element;
    this.boxWrapper = f;
    this.alignedObjects = [];
    this.url = (eb || db) && z.getElementsByTagName("base").length ? e.href.replace(/#.*?$/, "").replace(/([\('\)])/g, "\\$1").replace(/ /g, "%20") : "";
    this.createElement("desc").add().element.appendChild(z.createTextNode("Created with Highcharts 3.0.2"));
    this.defs = this.createElement("defs").add();
    this.forExport = d;
    this.gradients = {};
    this.setSize(b, c, !1);
    var g;
    if(eb && a.getBoundingClientRect) {
      this.subPixelFix = b = function() {
        L(a, {left:0, top:0});
        g = a.getBoundingClientRect();
        L(a, {left:ja(g.left) - g.left + "px", top:ja(g.top) - g.top + "px"})
      }, b(), J(O, "resize", b)
    }
  }, isHidden:function() {
    return!this.boxWrapper.getBBox().width
  }, destroy:function() {
    var a = this.defs;
    this.box = null;
    this.boxWrapper = this.boxWrapper.destroy();
    Ha(this.gradients || {});
    this.gradients = null;
    if(a) {
      this.defs = a.destroy()
    }
    this.subPixelFix && ba(O, "resize", this.subPixelFix);
    return this.alignedObjects = null
  }, createElement:function(a) {
    var b = new this.Element;
    b.init(this, a);
    return b
  }, draw:function() {
  }, buildText:function(a) {
    for(var b = a.element, c = this, d = c.forExport, e = o(a.textStr, "").toString().replace(/<(b|strong)>/g, '<span style="font-weight:bold">').replace(/<(i|em)>/g, '<span style="font-style:italic">').replace(/<a/g, "<span").replace(/<\/(b|strong|i|em|a)>/g, "</span>").split(/<br.*?>/g), f = b.childNodes, g = /style="([^"]+)"/, h = /href="([^"]+)"/, i = A(b, "x"), j = a.styles, k = j && j.width && u(j.width), m = j && j.lineHeight, l = f.length;l--;) {
      b.removeChild(f[l])
    }
    k && !a.added && this.box.appendChild(b);
    e[e.length - 1] === "" && e.pop();
    n(e, function(e, f) {
      var l, o = 0, e = e.replace(/<span/g, "|||<span").replace(/<\/span>/g, "</span>|||");
      l = e.split("|||");
      n(l, function(e) {
        if(e !== "" || l.length === 1) {
          var p = {}, n = z.createElementNS(sa, "tspan"), q;
          g.test(e) && (q = e.match(g)[1].replace(/(;| |^)color([ :])/, "$1fill$2"), A(n, "style", q));
          h.test(e) && !d && (A(n, "onclick", 'location.href="' + e.match(h)[1] + '"'), L(n, {cursor:"pointer"}));
          e = (e.replace(/<(.|\n)*?>/g, "") || " ").replace(/&lt;/g, "<").replace(/&gt;/g, ">");
          n.appendChild(z.createTextNode(e));
          o ? p.dx = 0 : p.x = i;
          A(n, p);
          !o && f && (!Z && d && L(n, {display:"block"}), A(n, "dy", m || c.fontMetrics(/px$/.test(n.style.fontSize) ? n.style.fontSize : j.fontSize).h, db && n.offsetHeight));
          b.appendChild(n);
          o++;
          if(k) {
            for(var e = e.replace(/([^\^])-/g, "$1- ").split(" "), r, t = [];e.length || t.length;) {
              delete a.bBox, r = a.getBBox().width, p = r > k, !p || e.length === 1 ? (e = t, t = [], e.length && (n = z.createElementNS(sa, "tspan"), A(n, {dy:m || 16, x:i}), q && A(n, "style", q), b.appendChild(n), r > k && (k = r))) : (n.removeChild(n.firstChild), t.unshift(e.pop())), e.length && n.appendChild(z.createTextNode(e.join(" ").replace(/- /g, "-")))
            }
          }
        }
      })
    })
  }, button:function(a, b, c, d, e, f, g) {
    var h = this.label(a, b, c, null, null, null, null, null, "button"), i = 0, j, k, m, l, p, a = {x1:0, y1:0, x2:0, y2:1}, e = x({"stroke-width":1, stroke:"#CCCCCC", fill:{linearGradient:a, stops:[[0, "#FEFEFE"], [1, "#F6F6F6"]]}, r:2, padding:5, style:{color:"black"}}, e);
    m = e.style;
    delete e.style;
    f = x(e, {stroke:"#68A", fill:{linearGradient:a, stops:[[0, "#FFF"], [1, "#ACF"]]}}, f);
    l = f.style;
    delete f.style;
    g = x(e, {stroke:"#68A", fill:{linearGradient:a, stops:[[0, "#9BD"], [1, "#CDF"]]}}, g);
    p = g.style;
    delete g.style;
    J(h.element, "mouseenter", function() {
      h.attr(f).css(l)
    });
    J(h.element, "mouseleave", function() {
      j = [e, f, g][i];
      k = [m, l, p][i];
      h.attr(j).css(k)
    });
    h.setState = function(a) {
      (i = a) ? a === 2 && h.attr(g).css(p) : h.attr(e).css(m)
    };
    return h.on("click", function() {
      d.call(h)
    }).attr(e).css(v({cursor:"default"}, m))
  }, crispLine:function(a, b) {
    a[1] === a[4] && (a[1] = a[4] = t(a[1]) - b % 2 / 2);
    a[2] === a[5] && (a[2] = a[5] = t(a[2]) + b % 2 / 2);
    return a
  }, path:function(a) {
    var b = {fill:S};
    Da(a) ? b.d = a : V(a) && v(b, a);
    return this.createElement("path").attr(b)
  }, circle:function(a, b, c) {
    a = V(a) ? a : {x:a, y:b, r:c};
    return this.createElement("circle").attr(a)
  }, arc:function(a, b, c, d, e, f) {
    if(V(a)) {
      b = a.y, c = a.r, d = a.innerR, e = a.start, f = a.end, a = a.x
    }
    return this.symbol("arc", a || 0, b || 0, c || 0, c || 0, {innerR:d || 0, start:e || 0, end:f || 0})
  }, rect:function(a, b, c, d, e, f) {
    e = V(a) ? a.r : e;
    e = this.createElement("rect").attr({rx:e, ry:e, fill:S});
    return e.attr(V(a) ? a : e.crisp(f, a, b, q(c, 0), q(d, 0)))
  }, setSize:function(a, b, c) {
    var d = this.alignedObjects, e = d.length;
    this.width = a;
    this.height = b;
    for(this.boxWrapper[o(c, !0) ? "animate" : "attr"]({width:a, height:b});e--;) {
      d[e].align()
    }
  }, g:function(a) {
    var b = this.createElement("g");
    return r(a) ? b.attr({"class":"highcharts-" + a}) : b
  }, image:function(a, b, c, d, e) {
    var f = {preserveAspectRatio:S};
    arguments.length > 1 && v(f, {x:b, y:c, width:d, height:e});
    f = this.createElement("image").attr(f);
    f.element.setAttributeNS ? f.element.setAttributeNS("http://www.w3.org/1999/xlink", "href", a) : f.element.setAttribute("hc-svg-href", a);
    return f
  }, symbol:function(a, b, c, d, e, f) {
    var g, h = this.symbols[a], h = h && h(t(b), t(c), d, e, f), i = /^url\((.*?)\)$/, j, k;
    if(h) {
      g = this.path(h), v(g, {symbolName:a, x:b, y:c, width:d, height:e}), f && v(g, f)
    }else {
      if(i.test(a)) {
        k = function(a, b) {
          a.element && (a.attr({width:b[0], height:b[1]}), a.alignByTranslate || a.translate(t((d - b[0]) / 2), t((e - b[1]) / 2)))
        }, j = a.match(i)[1], a = Nb[j], g = this.image(j).attr({x:b, y:c}), g.isImg = !0, a ? k(g, a) : (g.attr({width:0, height:0}), U("img", {onload:function() {
          k(g, Nb[j] = [this.width, this.height])
        }, src:j}))
      }
    }
    return g
  }, symbols:{circle:function(a, b, c, d) {
    var e = 0.166 * c;
    return["M", a + c / 2, b, "C", a + c + e, b, a + c + e, b + d, a + c / 2, b + d, "C", a - e, b + d, a - e, b, a + c / 2, b, "Z"]
  }, square:function(a, b, c, d) {
    return["M", a, b, "L", a + c, b, a + c, b + d, a, b + d, "Z"]
  }, triangle:function(a, b, c, d) {
    return["M", a + c / 2, b, "L", a + c, b + d, a, b + d, "Z"]
  }, "triangle-down":function(a, b, c, d) {
    return["M", a, b, "L", a + c, b, a + c / 2, b + d, "Z"]
  }, diamond:function(a, b, c, d) {
    return["M", a + c / 2, b, "L", a + c, b + d / 2, a + c / 2, b + d, a, b + d / 2, "Z"]
  }, arc:function(a, b, c, d, e) {
    var f = e.start, c = e.r || c || d, g = e.end - 0.001, d = e.innerR, h = e.open, i = Y(f), j = ca(f), k = Y(g), g = ca(g), e = e.end - f < Ka ? 0 : 1;
    return["M", a + c * i, b + c * j, "A", c, c, 0, e, 1, a + c * k, b + c * g, h ? "M" : "L", a + d * k, b + d * g, "A", d, d, 0, e, 0, a + d * i, b + d * j, h ? "" : "Z"]
  }}, clipRect:function(a, b, c, d) {
    var e = "highcharts-" + ub++, f = this.createElement("clipPath").attr({id:e}).add(this.defs), a = this.rect(a, b, c, d, 0).add(f);
    a.id = e;
    a.clipPath = f;
    return a
  }, color:function(a, b, c) {
    var d = this, e, f = /^rgba/, g, h, i, j, k, m, l, p = [];
    a && a.linearGradient ? g = "linearGradient" : a && a.radialGradient && (g = "radialGradient");
    if(g) {
      c = a[g];
      h = d.gradients;
      j = a.stops;
      b = b.radialReference;
      Da(c) && (a[g] = c = {x1:c[0], y1:c[1], x2:c[2], y2:c[3], gradientUnits:"userSpaceOnUse"});
      g === "radialGradient" && b && !r(c.gradientUnits) && (c = x(c, {cx:b[0] - b[2] / 2 + c.cx * b[2], cy:b[1] - b[2] / 2 + c.cy * b[2], r:c.r * b[2], gradientUnits:"userSpaceOnUse"}));
      for(l in c) {
        l !== "id" && p.push(l, c[l])
      }
      for(l in j) {
        p.push(j[l])
      }
      p = p.join(",");
      h[p] ? a = h[p].id : (c.id = a = "highcharts-" + ub++, h[p] = i = d.createElement(g).attr(c).add(d.defs), i.stops = [], n(j, function(a) {
        f.test(a[1]) ? (e = ma(a[1]), k = e.get("rgb"), m = e.get("a")) : (k = a[1], m = 1);
        a = d.createElement("stop").attr({offset:a[0], "stop-color":k, "stop-opacity":m}).add(i);
        i.stops.push(a)
      }));
      return"url(" + d.url + "#" + a + ")"
    }else {
      return f.test(a) ? (e = ma(a), A(b, c + "-opacity", e.get("a")), e.get("rgb")) : (b.removeAttribute(c + "-opacity"), a)
    }
  }, text:function(a, b, c, d) {
    var e = N.chart.style, f = $ || !Z && this.forExport;
    if(d && !this.forExport) {
      return this.html(a, b, c)
    }
    b = t(o(b, 0));
    c = t(o(c, 0));
    a = this.createElement("text").attr({x:b, y:c, text:a}).css({fontFamily:e.fontFamily, fontSize:e.fontSize});
    f && a.css({position:"absolute"});
    a.x = b;
    a.y = c;
    return a
  }, html:function(a, b, c) {
    var d = N.chart.style, e = this.createElement("span"), f = e.attrSetters, g = e.element, h = e.renderer;
    f.text = function(a) {
      a !== g.innerHTML && delete this.bBox;
      g.innerHTML = a;
      return!1
    };
    f.x = f.y = f.align = function(a, b) {
      b === "align" && (b = "textAlign");
      e[b] = a;
      e.htmlUpdateTransform();
      return!1
    };
    e.attr({text:a, x:t(b), y:t(c)}).css({position:"absolute", whiteSpace:"nowrap", fontFamily:d.fontFamily, fontSize:d.fontSize});
    e.css = e.htmlCss;
    if(h.isSVG) {
      e.add = function(a) {
        var b, c = h.box.parentNode, d = [];
        if(a) {
          if(b = a.div, !b) {
            for(;a;) {
              d.push(a), a = a.parentGroup
            }
            n(d.reverse(), function(a) {
              var d;
              b = a.div = a.div || U(ya, {className:A(a.element, "class")}, {position:"absolute", left:(a.translateX || 0) + "px", top:(a.translateY || 0) + "px"}, b || c);
              d = b.style;
              v(a.attrSetters, {translateX:function(a) {
                d.left = a + "px"
              }, translateY:function(a) {
                d.top = a + "px"
              }, visibility:function(a, b) {
                d[b] = a
              }})
            })
          }
        }else {
          b = c
        }
        b.appendChild(g);
        e.added = !0;
        e.alignOnAdd && e.htmlUpdateTransform();
        return e
      }
    }
    return e
  }, fontMetrics:function(a) {
    var a = u(a || 11), a = a < 24 ? a + 4 : t(a * 1.2), b = t(a * 0.8);
    return{h:a, b:b}
  }, label:function(a, b, c, d, e, f, g, h, i) {
    function j() {
      var a, b;
      a = o.element.style;
      w = (Ma === void 0 || yb === void 0 || s.styles.textAlign) && o.getBBox();
      s.width = (Ma || w.width || 0) + 2 * q + hb;
      s.height = (yb || w.height || 0) + 2 * q;
      A = q + p.fontMetrics(a && a.fontSize).b;
      if(z) {
        if(!B) {
          a = t(-G * q), b = h ? -A : 0, s.box = B = d ? p.symbol(d, a, b, s.width, s.height) : p.rect(a, b, s.width, s.height, 0, u[Pb]), B.add(s)
        }
        B.isImg || B.attr(x({width:s.width, height:s.height}, u));
        u = null
      }
    }
    function k() {
      var a = s.styles, a = a && a.textAlign, b = hb + q * (1 - G), c;
      c = h ? 0 : A;
      if(r(Ma) && (a === "center" || a === "right")) {
        b += {center:0.5, right:1}[a] * (Ma - w.width)
      }
      (b !== o.x || c !== o.y) && o.attr({x:b, y:c});
      o.x = b;
      o.y = c
    }
    function m(a, b) {
      B ? B.attr(a, b) : u[a] = b
    }
    function l() {
      o.add(s);
      s.attr({text:a, x:b, y:c});
      B && r(e) && s.attr({anchorX:e, anchorY:f})
    }
    var p = this, s = p.g(i), o = p.text("", 0, 0, g).attr({zIndex:1}), B, w, G = 0, q = 3, hb = 0, Ma, yb, P, H, C = 0, u = {}, A, g = s.attrSetters, z;
    J(s, "add", l);
    g.width = function(a) {
      Ma = a;
      return!1
    };
    g.height = function(a) {
      yb = a;
      return!1
    };
    g.padding = function(a) {
      r(a) && a !== q && (q = a, k());
      return!1
    };
    g.paddingLeft = function(a) {
      r(a) && a !== hb && (hb = a, k());
      return!1
    };
    g.align = function(a) {
      G = {left:0, center:0.5, right:1}[a];
      return!1
    };
    g.text = function(a, b) {
      o.attr(b, a);
      j();
      k();
      return!1
    };
    g[Pb] = function(a, b) {
      z = !0;
      C = a % 2 / 2;
      m(b, a);
      return!1
    };
    g.stroke = g.fill = g.r = function(a, b) {
      b === "fill" && (z = !0);
      m(b, a);
      return!1
    };
    g.anchorX = function(a, b) {
      e = a;
      m(b, a + C - P);
      return!1
    };
    g.anchorY = function(a, b) {
      f = a;
      m(b, a - H);
      return!1
    };
    g.x = function(a) {
      s.x = a;
      a -= G * ((Ma || w.width) + q);
      P = t(a);
      s.attr("translateX", P);
      return!1
    };
    g.y = function(a) {
      H = s.y = t(a);
      s.attr("translateY", H);
      return!1
    };
    var E = s.css;
    return v(s, {css:function(a) {
      if(a) {
        var b = {}, a = x(a);
        n("fontSize,fontWeight,fontFamily,color,lineHeight,width,textDecoration".split(","), function(c) {
          a[c] !== y && (b[c] = a[c], delete a[c])
        });
        o.css(b)
      }
      return E.call(s, a)
    }, getBBox:function() {
      return{width:w.width + 2 * q, height:w.height + 2 * q, x:w.x - q, y:w.y - q}
    }, shadow:function(a) {
      B && B.shadow(a);
      return s
    }, destroy:function() {
      ba(s, "add", l);
      ba(s.element, "mouseenter");
      ba(s.element, "mouseleave");
      o && (o = o.destroy());
      B && (B = B.destroy());
      ra.prototype.destroy.call(s);
      s = p = j = k = m = l = null
    }})
  }};
  Sa = Ca;
  var F;
  if(!Z && !$) {
    Highcharts.VMLElement = F = {init:function(a, b) {
      var c = ["<", b, ' filled="f" stroked="f"'], d = ["position: ", "absolute", ";"], e = b === ya;
      (b === "shape" || e) && d.push("left:0;top:0;width:1px;height:1px;");
      d.push("visibility: ", e ? "hidden" : "visible");
      c.push(' style="', d.join(""), '"/>');
      if(b) {
        c = e || b === "span" || b === "img" ? c.join("") : a.prepVML(c), this.element = U(c)
      }
      this.renderer = a;
      this.attrSetters = {}
    }, add:function(a) {
      var b = this.renderer, c = this.element, d = b.box, d = a ? a.element || a : d;
      a && a.inverted && b.invertChild(c, d);
      d.appendChild(c);
      this.added = !0;
      this.alignOnAdd && !this.deferUpdateTransform && this.updateTransform();
      D(this, "add");
      return this
    }, updateTransform:ra.prototype.htmlUpdateTransform, attr:function(a, b) {
      var c, d, e, f = this.element || {}, g = f.style, h = f.nodeName, i = this.renderer, j = this.symbolName, k, m = this.shadows, l, p = this.attrSetters, s = this;
      fa(a) && r(b) && (c = a, a = {}, a[c] = b);
      if(fa(a)) {
        c = a, s = c === "strokeWidth" || c === "stroke-width" ? this.strokeweight : this[c]
      }else {
        for(c in a) {
          if(d = a[c], l = !1, e = p[c] && p[c].call(this, d, c), e !== !1 && d !== null) {
            e !== y && (d = e);
            if(j && /^(x|y|r|start|end|width|height|innerR|anchorX|anchorY)/.test(c)) {
              k || (this.symbolAttr(a), k = !0), l = !0
            }else {
              if(c === "d") {
                d = d || [];
                this.d = d.join(" ");
                e = d.length;
                l = [];
                for(var o;e--;) {
                  if(Ea(d[e])) {
                    l[e] = t(d[e] * 10) - 5
                  }else {
                    if(d[e] === "Z") {
                      l[e] = "x"
                    }else {
                      if(l[e] = d[e], d.isArc && (d[e] === "wa" || d[e] === "at")) {
                        o = d[e] === "wa" ? 1 : -1, l[e + 5] === l[e + 7] && (l[e + 7] -= o), l[e + 6] === l[e + 8] && (l[e + 8] -= o)
                      }
                    }
                  }
                }
                d = l.join(" ") || "x";
                f.path = d;
                if(m) {
                  for(e = m.length;e--;) {
                    m[e].path = m[e].cutOff ? this.cutOffPath(d, m[e].cutOff) : d
                  }
                }
                l = !0
              }else {
                if(c === "visibility") {
                  if(m) {
                    for(e = m.length;e--;) {
                      m[e].style[c] = d
                    }
                  }
                  h === "DIV" && (d = d === "hidden" ? "-999em" : 0, cb || (g[c] = d ? "visible" : "hidden"), c = "top");
                  g[c] = d;
                  l = !0
                }else {
                  if(c === "zIndex") {
                    d && (g[c] = d), l = !0
                  }else {
                    if(la(c, ["x", "y", "width", "height"]) !== -1) {
                      this[c] = d, c === "x" || c === "y" ? c = {x:"left", y:"top"}[c] : d = q(0, d), this.updateClipping ? (this[c] = d, this.updateClipping()) : g[c] = d, l = !0
                    }else {
                      if(c === "class" && h === "DIV") {
                        f.className = d
                      }else {
                        if(c === "stroke") {
                          d = i.color(d, f, c), c = "strokecolor"
                        }else {
                          if(c === "stroke-width" || c === "strokeWidth") {
                            f.stroked = d ? !0 : !1, c = "strokeweight", this[c] = d, Ea(d) && (d += "px")
                          }else {
                            if(c === "dashstyle") {
                              (f.getElementsByTagName("stroke")[0] || U(i.prepVML(["<stroke/>"]), null, null, f))[c] = d || "solid", this.dashstyle = d, l = !0
                            }else {
                              if(c === "fill") {
                                if(h === "SPAN") {
                                  g.color = d
                                }else {
                                  if(h !== "IMG") {
                                    f.filled = d !== S ? !0 : !1, d = i.color(d, f, c, this), c = "fillcolor"
                                  }
                                }
                              }else {
                                if(c === "opacity") {
                                  l = !0
                                }else {
                                  if(h === "shape" && c === "rotation") {
                                    this[c] = d, f.style.left = -t(ca(d * bb) + 1) + "px", f.style.top = t(Y(d * bb)) + "px"
                                  }else {
                                    if(c === "translateX" || c === "translateY" || c === "rotation") {
                                      this[c] = d, this.updateTransform(), l = !0
                                    }else {
                                      if(c === "text") {
                                        this.bBox = null, f.innerHTML = d, l = !0
                                      }
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
            l || (cb ? f[c] = d : A(f, c, d))
          }
        }
      }
      return s
    }, clip:function(a) {
      var b = this, c;
      a ? (c = a.members, ga(c, b), c.push(b), b.destroyClip = function() {
        ga(c, b)
      }, a = a.getCSS(b)) : (b.destroyClip && b.destroyClip(), a = {clip:cb ? "inherit" : "rect(auto)"});
      return b.css(a)
    }, css:ra.prototype.htmlCss, safeRemoveChild:function(a) {
      a.parentNode && Ra(a)
    }, destroy:function() {
      this.destroyClip && this.destroyClip();
      return ra.prototype.destroy.apply(this)
    }, on:function(a, b) {
      this.element["on" + a] = function() {
        var a = O.event;
        a.target = a.srcElement;
        b(a)
      };
      return this
    }, cutOffPath:function(a, b) {
      var c, a = a.split(/[ ,]/);
      c = a.length;
      if(c === 9 || c === 11) {
        a[c - 4] = a[c - 2] = u(a[c - 2]) - 10 * b
      }
      return a.join(" ")
    }, shadow:function(a, b, c) {
      var d = [], e, f = this.element, g = this.renderer, h, i = f.style, j, k = f.path, m, l, p, s;
      k && typeof k.value !== "string" && (k = "x");
      l = k;
      if(a) {
        p = o(a.width, 3);
        s = (a.opacity || 0.15) / p;
        for(e = 1;e <= 3;e++) {
          m = p * 2 + 1 - 2 * e;
          c && (l = this.cutOffPath(k.value, m + 0.5));
          j = ['<shape isShadow="true" strokeweight="', m, '" filled="false" path="', l, '" coordsize="10 10" style="', f.style.cssText, '" />'];
          h = U(g.prepVML(j), null, {left:u(i.left) + o(a.offsetX, 1), top:u(i.top) + o(a.offsetY, 1)});
          if(c) {
            h.cutOff = m + 1
          }
          j = ['<stroke color="', a.color || "black", '" opacity="', s * e, '"/>'];
          U(g.prepVML(j), null, null, h);
          b ? b.element.appendChild(h) : f.parentNode.insertBefore(h, f);
          d.push(h)
        }
        this.shadows = d
      }
      return this
    }};
    F = ea(ra, F);
    var na = {Element:F, isIE8:Aa.indexOf("MSIE 8.0") > -1, init:function(a, b, c) {
      var d, e;
      this.alignedObjects = [];
      d = this.createElement(ya);
      e = d.element;
      e.style.position = "relative";
      a.appendChild(d.element);
      this.isVML = !0;
      this.box = e;
      this.boxWrapper = d;
      this.setSize(b, c, !1);
      if(!z.namespaces.hcv) {
        z.namespaces.add("hcv", "urn:schemas-microsoft-com:vml"), z.createStyleSheet().cssText = "hcv\\:fill, hcv\\:path, hcv\\:shape, hcv\\:stroke{ behavior:url(#default#VML); display: inline-block; } "
      }
    }, isHidden:function() {
      return!this.box.offsetWidth
    }, clipRect:function(a, b, c, d) {
      var e = this.createElement(), f = V(a);
      return v(e, {members:[], left:f ? a.x : a, top:f ? a.y : b, width:f ? a.width : c, height:f ? a.height : d, getCSS:function(a) {
        var b = a.element, c = b.nodeName, a = a.inverted, d = this.top - (c === "shape" ? b.offsetTop : 0), e = this.left, b = e + this.width, f = d + this.height, d = {clip:"rect(" + t(a ? e : d) + "px," + t(a ? f : b) + "px," + t(a ? b : f) + "px," + t(a ? d : e) + "px)"};
        !a && cb && c === "DIV" && v(d, {width:b + "px", height:f + "px"});
        return d
      }, updateClipping:function() {
        n(e.members, function(a) {
          a.css(e.getCSS(a))
        })
      }})
    }, color:function(a, b, c, d) {
      var e = this, f, g = /^rgba/, h, i, j = S;
      a && a.linearGradient ? i = "gradient" : a && a.radialGradient && (i = "pattern");
      if(i) {
        var k, m, l = a.linearGradient || a.radialGradient, p, s, o, B, w, q = "", a = a.stops, r, t = [], y = function() {
          h = ['<fill colors="' + t.join(",") + '" opacity="', o, '" o:opacity2="', s, '" type="', i, '" ', q, 'focus="100%" method="any" />'];
          U(e.prepVML(h), null, null, b)
        };
        p = a[0];
        r = a[a.length - 1];
        p[0] > 0 && a.unshift([0, p[1]]);
        r[0] < 1 && a.push([1, r[1]]);
        n(a, function(a, b) {
          g.test(a[1]) ? (f = ma(a[1]), k = f.get("rgb"), m = f.get("a")) : (k = a[1], m = 1);
          t.push(a[0] * 100 + "% " + k);
          b ? (o = m, B = k) : (s = m, w = k)
        });
        if(c === "fill") {
          if(i === "gradient") {
            c = l.x1 || l[0] || 0, a = l.y1 || l[1] || 0, p = l.x2 || l[2] || 0, l = l.y2 || l[3] || 0, q = 'angle="' + (90 - I.atan((l - a) / (p - c)) * 180 / Ka) + '"', y()
          }else {
            var j = l.r, v = j * 2, P = j * 2, H = l.cx, C = l.cy, x = b.radialReference, u, j = function() {
              x && (u = d.getBBox(), H += (x[0] - u.x) / u.width - 0.5, C += (x[1] - u.y) / u.height - 0.5, v *= x[2] / u.width, P *= x[2] / u.height);
              q = 'src="' + N.global.VMLRadialGradientURL + '" size="' + v + "," + P + '" origin="0.5,0.5" position="' + H + "," + C + '" color2="' + w + '" ';
              y()
            };
            d.added ? j() : J(d, "add", j);
            j = B
          }
        }else {
          j = k
        }
      }else {
        if(g.test(a) && b.tagName !== "IMG") {
          f = ma(a), h = ["<", c, ' opacity="', f.get("a"), '"/>'], U(this.prepVML(h), null, null, b), j = f.get("rgb")
        }else {
          j = b.getElementsByTagName(c);
          if(j.length) {
            j[0].opacity = 1, j[0].type = "solid"
          }
          j = a
        }
      }
      return j
    }, prepVML:function(a) {
      var b = this.isIE8, a = a.join("");
      b ? (a = a.replace("/>", ' xmlns="urn:schemas-microsoft-com:vml" />'), a = a.indexOf('style="') === -1 ? a.replace("/>", ' style="display:inline-block;behavior:url(#default#VML);" />') : a.replace('style="', 'style="display:inline-block;behavior:url(#default#VML);')) : a = a.replace("<", "<hcv:");
      return a
    }, text:Ca.prototype.html, path:function(a) {
      var b = {coordsize:"10 10"};
      Da(a) ? b.d = a : V(a) && v(b, a);
      return this.createElement("shape").attr(b)
    }, circle:function(a, b, c) {
      var d = this.symbol("circle");
      if(V(a)) {
        c = a.r, b = a.y, a = a.x
      }
      d.isCircle = !0;
      return d.attr({x:a, y:b, width:2 * c, height:2 * c})
    }, g:function(a) {
      var b;
      a && (b = {className:"highcharts-" + a, "class":"highcharts-" + a});
      return this.createElement(ya).attr(b)
    }, image:function(a, b, c, d, e) {
      var f = this.createElement("img").attr({src:a});
      arguments.length > 1 && f.attr({x:b, y:c, width:d, height:e});
      return f
    }, rect:function(a, b, c, d, e, f) {
      if(V(a)) {
        b = a.y, c = a.width, d = a.height, f = a.strokeWidth, a = a.x
      }
      var g = this.symbol("rect");
      g.r = e;
      return g.attr(g.crisp(f, a, b, q(c, 0), q(d, 0)))
    }, invertChild:function(a, b) {
      var c = b.style;
      L(a, {flip:"x", left:u(c.width) - 1, top:u(c.height) - 1, rotation:-90})
    }, symbols:{arc:function(a, b, c, d, e) {
      var f = e.start, g = e.end, h = e.r || c || d, c = e.innerR, d = Y(f), i = ca(f), j = Y(g), k = ca(g);
      if(g - f === 0) {
        return["x"]
      }
      f = ["wa", a - h, b - h, a + h, b + h, a + h * d, b + h * i, a + h * j, b + h * k];
      e.open && !c && f.push("e", "M", a, b);
      f.push("at", a - c, b - c, a + c, b + c, a + c * j, b + c * k, a + c * d, b + c * i, "x", "e");
      f.isArc = !0;
      return f
    }, circle:function(a, b, c, d, e) {
      e && e.isCircle && (a -= c / 2, b -= d / 2);
      return["wa", a, b, a + c, b + d, a + c, b + d / 2, a + c, b + d / 2, "e"]
    }, rect:function(a, b, c, d, e) {
      var f = a + c, g = b + d, h;
      !r(e) || !e.r ? f = Ca.prototype.symbols.square.apply(0, arguments) : (h = K(e.r, c, d), f = ["M", a + h, b, "L", f - h, b, "wa", f - 2 * h, b, f, b + 2 * h, f - h, b, f, b + h, "L", f, g - h, "wa", f - 2 * h, g - 2 * h, f, g, f, g - h, f - h, g, "L", a + h, g, "wa", a, g - 2 * h, a + 2 * h, g, a + h, g, a, g - h, "L", a, b + h, "wa", a, b, a + 2 * h, b + 2 * h, a, b + h, a + h, b, "x", "e"]);
      return f
    }}};
    Highcharts.VMLRenderer = F = function() {
      this.init.apply(this, arguments)
    };
    F.prototype = x(Ca.prototype, na);
    Sa = F
  }
  var Rb;
  if($) {
    Highcharts.CanVGRenderer = F = function() {
      sa = "http://www.w3.org/1999/xhtml"
    }, F.prototype.symbols = {}, Rb = function() {
      function a() {
        var a = b.length, d;
        for(d = 0;d < a;d++) {
          b[d]()
        }
        b = []
      }
      var b = [];
      return{push:function(c, d) {
        b.length === 0 && Tb(d, a);
        b.push(c)
      }}
    }(), Sa = F
  }
  Ja.prototype = {addLabel:function() {
    var a = this.axis, b = a.options, c = a.chart, d = a.horiz, e = a.categories, f = a.series[0] && a.series[0].names, g = this.pos, h = b.labels, i = a.tickPositions, d = d && e && !h.step && !h.staggerLines && !h.rotation && c.plotWidth / i.length || !d && (c.optionsMarginLeft || c.plotWidth / 2), j = g === i[0], k = g === i[i.length - 1], f = e ? o(e[g], f && f[g], g) : g, e = this.label, i = i.info, m;
    a.isDatetimeAxis && i && (m = b.dateTimeLabelFormats[i.higherRanks[g] || i.unitName]);
    this.isFirst = j;
    this.isLast = k;
    b = a.labelFormatter.call({axis:a, chart:c, isFirst:j, isLast:k, dateTimeLabelFormat:m, value:a.isLog ? ia(da(f)) : f});
    g = d && {width:q(1, t(d - 2 * (h.padding || 10))) + "px"};
    g = v(g, h.style);
    if(r(e)) {
      e && e.attr({text:b}).css(g)
    }else {
      d = {align:h.align};
      if(Ea(h.rotation)) {
        d.rotation = h.rotation
      }
      this.label = r(b) && h.enabled ? c.renderer.text(b, 0, 0, h.useHTML).attr(d).css(g).add(a.labelGroup) : null
    }
  }, getLabelSize:function() {
    var a = this.label, b = this.axis;
    return a ? (this.labelBBox = a.getBBox())[b.horiz ? "height" : "width"] : 0
  }, getLabelSides:function() {
    var a = this.axis.options.labels, b = this.labelBBox.width, a = b * {left:0, center:0.5, right:1}[a.align] - a.x;
    return[-a, b - a]
  }, handleOverflow:function(a, b) {
    var c = !0, d = this.axis, e = d.chart, f = this.isFirst, g = this.isLast, h = b.x, i = d.reversed, j = d.tickPositions;
    if(f || g) {
      var k = this.getLabelSides(), m = k[0], k = k[1], e = e.plotLeft, l = e + d.len, j = (d = d.ticks[j[a + (f ? 1 : -1)]]) && d.label.xy && d.label.xy.x + d.getLabelSides()[f ? 0 : 1];
      f && !i || g && i ? h + m < e && (h = e - m, d && h + k > j && (c = !1)) : h + k > l && (h = l - k, d && h + m < j && (c = !1));
      b.x = h
    }
    return c
  }, getPosition:function(a, b, c, d) {
    var e = this.axis, f = e.chart, g = d && f.oldChartHeight || f.chartHeight;
    return{x:a ? e.translate(b + c, null, null, d) + e.transB : e.left + e.offset + (e.opposite ? (d && f.oldChartWidth || f.chartWidth) - e.right - e.left : 0), y:a ? g - e.bottom + e.offset - (e.opposite ? e.height : 0) : g - e.translate(b + c, null, null, d) - e.transB}
  }, getLabelPosition:function(a, b, c, d, e, f, g, h) {
    var i = this.axis, j = i.transA, k = i.reversed, i = i.staggerLines, a = a + e.x - (f && d ? f * j * (k ? -1 : 1) : 0), b = b + e.y - (f && !d ? f * j * (k ? 1 : -1) : 0);
    r(e.y) || (b += u(c.styles.lineHeight) * 0.9 - c.getBBox().height / 2);
    i && (b += g / (h || 1) % i * 16);
    return{x:a, y:b}
  }, getMarkPath:function(a, b, c, d, e, f) {
    return f.crispLine(["M", a, b, "L", a + (e ? 0 : -c), b + (e ? c : 0)], d)
  }, render:function(a, b, c) {
    var d = this.axis, e = d.options, f = d.chart.renderer, g = d.horiz, h = this.type, i = this.label, j = this.pos, k = e.labels, m = this.gridLine, l = h ? h + "Grid" : "grid", p = h ? h + "Tick" : "tick", s = e[l + "LineWidth"], n = e[l + "LineColor"], B = e[l + "LineDashStyle"], w = e[p + "Length"], l = e[p + "Width"] || 0, q = e[p + "Color"], r = e[p + "Position"], p = this.mark, t = k.step, v = !0, u = d.tickmarkOffset, P = this.getPosition(g, j, u, b), H = P.x, P = P.y, C = g && H === d.pos || 
    !g && P === d.pos + d.len ? -1 : 1, x = d.staggerLines;
    this.isActive = !0;
    if(s) {
      j = d.getPlotLinePath(j + u, s * C, b, !0);
      if(m === y) {
        m = {stroke:n, "stroke-width":s};
        if(B) {
          m.dashstyle = B
        }
        if(!h) {
          m.zIndex = 1
        }
        if(b) {
          m.opacity = 0
        }
        this.gridLine = m = s ? f.path(j).attr(m).add(d.gridGroup) : null
      }
      if(!b && m && j) {
        m[this.isNew ? "attr" : "animate"]({d:j, opacity:c})
      }
    }
    if(l && w) {
      r === "inside" && (w = -w), d.opposite && (w = -w), b = this.getMarkPath(H, P, w, l * C, g, f), p ? p.animate({d:b, opacity:c}) : this.mark = f.path(b).attr({stroke:q, "stroke-width":l, opacity:c}).add(d.axisGroup)
    }
    if(i && !isNaN(H)) {
      i.xy = P = this.getLabelPosition(H, P, i, g, k, u, a, t), this.isFirst && !o(e.showFirstLabel, 1) || this.isLast && !o(e.showLastLabel, 1) ? v = !1 : !x && g && k.overflow === "justify" && !this.handleOverflow(a, P) && (v = !1), t && a % t && (v = !1), v && !isNaN(P.y) ? (P.opacity = c, i[this.isNew ? "attr" : "animate"](P), this.isNew = !1) : i.attr("y", -9999)
    }
  }, destroy:function() {
    Ha(this, this.axis)
  }};
  pb.prototype = {render:function() {
    var a = this, b = a.axis, c = b.horiz, d = (b.pointRange || 0) / 2, e = a.options, f = e.label, g = a.label, h = e.width, i = e.to, j = e.from, k = r(j) && r(i), m = e.value, l = e.dashStyle, p = a.svgElem, s = [], n, B = e.color, w = e.zIndex, G = e.events, t = b.chart.renderer;
    b.isLog && (j = ka(j), i = ka(i), m = ka(m));
    if(h) {
      if(s = b.getPlotLinePath(m, h), d = {stroke:B, "stroke-width":h}, l) {
        d.dashstyle = l
      }
    }else {
      if(k) {
        if(j = q(j, b.min - d), i = K(i, b.max + d), s = b.getPlotBandPath(j, i, e), d = {fill:B}, e.borderWidth) {
          d.stroke = e.borderColor, d["stroke-width"] = e.borderWidth
        }
      }else {
        return
      }
    }
    if(r(w)) {
      d.zIndex = w
    }
    if(p) {
      s ? p.animate({d:s}, null, p.onGetPath) : (p.hide(), p.onGetPath = function() {
        p.show()
      })
    }else {
      if(s && s.length && (a.svgElem = p = t.path(s).attr(d).add(), G)) {
        for(n in e = function(b) {
          p.on(b, function(c) {
            G[b].apply(a, [c])
          })
        }, G) {
          e(n)
        }
      }
    }
    if(f && r(f.text) && s && s.length && b.width > 0 && b.height > 0) {
      f = x({align:c && k && "center", x:c ? !k && 4 : 10, verticalAlign:!c && k && "middle", y:c ? k ? 16 : 10 : k ? 6 : -4, rotation:c && !k && 90}, f);
      if(!g) {
        a.label = g = t.text(f.text, 0, 0).attr({align:f.textAlign || f.align, rotation:f.rotation, zIndex:w}).css(f.style).add()
      }
      b = [s[1], s[4], o(s[6], s[1])];
      s = [s[2], s[5], o(s[7], s[2])];
      c = Ga(b);
      k = Ga(s);
      g.align(f, !1, {x:c, y:k, width:pa(b) - c, height:pa(s) - k});
      g.show()
    }else {
      g && g.hide()
    }
    return a
  }, destroy:function() {
    ga(this.axis.plotLinesAndBands, this);
    Ha(this, this.axis)
  }};
  Kb.prototype = {destroy:function() {
    Ha(this, this.axis)
  }, setTotal:function(a) {
    this.cum = this.total = a
  }, render:function(a) {
    var b = this.options, c = b.format, c = c ? wa(c, this) : b.formatter.call(this);
    this.label ? this.label.attr({text:c, visibility:"hidden"}) : this.label = this.axis.chart.renderer.text(c, 0, 0, b.useHTML).css(b.style).attr({align:this.textAlign, rotation:b.rotation, visibility:"hidden"}).add(a)
  }, setOffset:function(a, b) {
    var c = this.axis, d = c.chart, e = d.inverted, f = this.isNegative, g = c.translate(this.percent ? 100 : this.total, 0, 0, 0, 1), c = c.translate(0), c = Q(g - c), h = d.xAxis[0].translate(this.x) + a, i = d.plotHeight, f = {x:e ? f ? g : g - c : h, y:e ? i - h - b : f ? i - g - c : i - g, width:e ? c : b, height:e ? b : c};
    if(e = this.label) {
      e.align(this.alignOptions, null, f), f = e.alignAttr, e.attr({visibility:this.options.crop === !1 || d.isInsidePlot(f.x, f.y) ? Z ? "inherit" : "visible" : "hidden"})
    }
  }};
  ab.prototype = {defaultOptions:{dateTimeLabelFormats:{millisecond:"%H:%M:%S.%L", second:"%H:%M:%S", minute:"%H:%M", hour:"%H:%M", day:"%e. %b", week:"%e. %b", month:"%b '%y", year:"%Y"}, endOnTick:!1, gridLineColor:"#C0C0C0", labels:M, lineColor:"#C0D0E0", lineWidth:1, minPadding:0.01, maxPadding:0.01, minorGridLineColor:"#E0E0E0", minorGridLineWidth:1, minorTickColor:"#A0A0A0", minorTickLength:2, minorTickPosition:"outside", startOfWeek:1, startOnTick:!1, tickColor:"#C0D0E0", tickLength:5, tickmarkPlacement:"between", 
  tickPixelInterval:100, tickPosition:"outside", tickWidth:1, title:{align:"middle", style:{color:"#4d759e", fontWeight:"bold"}}, type:"linear"}, defaultYAxisOptions:{endOnTick:!0, gridLineWidth:1, tickPixelInterval:72, showLastLabel:!0, labels:{align:"right", x:-8, y:3}, lineWidth:0, maxPadding:0.05, minPadding:0.05, startOnTick:!0, tickWidth:0, title:{rotation:270, text:"Values"}, stackLabels:{enabled:!1, formatter:function() {
    return ua(this.total, -1)
  }, style:M.style}}, defaultLeftAxisOptions:{labels:{align:"right", x:-8, y:null}, title:{rotation:270}}, defaultRightAxisOptions:{labels:{align:"left", x:8, y:null}, title:{rotation:90}}, defaultBottomAxisOptions:{labels:{align:"center", x:0, y:14}, title:{rotation:0}}, defaultTopAxisOptions:{labels:{align:"center", x:0, y:-5}, title:{rotation:0}}, init:function(a, b) {
    var c = b.isX;
    this.horiz = a.inverted ? !c : c;
    this.xOrY = (this.isXAxis = c) ? "x" : "y";
    this.opposite = b.opposite;
    this.side = this.horiz ? this.opposite ? 0 : 2 : this.opposite ? 1 : 3;
    this.setOptions(b);
    var d = this.options, e = d.type;
    this.labelFormatter = d.labels.formatter || this.defaultLabelFormatter;
    this.staggerLines = this.horiz && d.labels.staggerLines;
    this.userOptions = b;
    this.minPixelPadding = 0;
    this.chart = a;
    this.reversed = d.reversed;
    this.zoomEnabled = d.zoomEnabled !== !1;
    this.categories = d.categories || e === "category";
    this.isLog = e === "logarithmic";
    this.isDatetimeAxis = e === "datetime";
    this.isLinked = r(d.linkedTo);
    this.tickmarkOffset = this.categories && d.tickmarkPlacement === "between" ? 0.5 : 0;
    this.ticks = {};
    this.minorTicks = {};
    this.plotLinesAndBands = [];
    this.alternateBands = {};
    this.len = 0;
    this.minRange = this.userMinRange = d.minRange || d.maxZoom;
    this.range = d.range;
    this.offset = d.offset || 0;
    this.stacks = {};
    this._stacksTouched = 0;
    this.min = this.max = null;
    var f, d = this.options.events;
    la(this, a.axes) === -1 && (a.axes.push(this), a[c ? "xAxis" : "yAxis"].push(this));
    this.series = this.series || [];
    if(a.inverted && c && this.reversed === y) {
      this.reversed = !0
    }
    this.removePlotLine = this.removePlotBand = this.removePlotBandOrLine;
    for(f in d) {
      J(this, f, d[f])
    }
    if(this.isLog) {
      this.val2lin = ka, this.lin2val = da
    }
  }, setOptions:function(a) {
    this.options = x(this.defaultOptions, this.isXAxis ? {} : this.defaultYAxisOptions, [this.defaultTopAxisOptions, this.defaultRightAxisOptions, this.defaultBottomAxisOptions, this.defaultLeftAxisOptions][this.side], x(N[this.isXAxis ? "xAxis" : "yAxis"], a))
  }, update:function(a, b) {
    var c = this.chart, a = c.options[this.xOrY + "Axis"][this.options.index] = x(this.userOptions, a);
    this.destroy();
    this._addedPlotLB = !1;
    this.init(c, a);
    c.isDirtyBox = !0;
    o(b, !0) && c.redraw()
  }, remove:function(a) {
    var b = this.chart, c = this.xOrY + "Axis";
    n(this.series, function(a) {
      a.remove(!1)
    });
    ga(b.axes, this);
    ga(b[c], this);
    b.options[c].splice(this.options.index, 1);
    n(b[c], function(a, b) {
      a.options.index = b
    });
    this.destroy();
    b.isDirtyBox = !0;
    o(a, !0) && b.redraw()
  }, defaultLabelFormatter:function() {
    var a = this.axis, b = this.value, c = a.categories, d = this.dateTimeLabelFormat, e = N.lang.numericSymbols, f = e && e.length, g, h = a.options.labels.format, a = a.isLog ? b : a.tickInterval;
    if(h) {
      g = wa(h, this)
    }else {
      if(c) {
        g = b
      }else {
        if(d) {
          g = Ua(d, b)
        }else {
          if(f && a >= 1E3) {
            for(;f-- && g === y;) {
              c = Math.pow(1E3, f + 1), a >= c && e[f] !== null && (g = ua(b / c, -1) + e[f])
            }
          }
        }
      }
    }
    g === y && (g = b >= 1E3 ? ua(b, 0) : ua(b, -1));
    return g
  }, getSeriesExtremes:function() {
    var a = this, b = a.chart, c = a.stacks, d = [], e = [], f = a._stacksTouched += 1, g, h;
    a.hasVisibleSeries = !1;
    a.dataMin = a.dataMax = null;
    n(a.series, function(g) {
      if(g.visible || !b.options.chart.ignoreHiddenSeries) {
        var j = g.options, k, m, l, p, s, n, B, w, G, t = j.threshold, v, u = [], x = 0;
        a.hasVisibleSeries = !0;
        if(a.isLog && t <= 0) {
          t = j.threshold = null
        }
        if(a.isXAxis) {
          if(j = g.xData, j.length) {
            a.dataMin = K(o(a.dataMin, j[0]), Ga(j)), a.dataMax = q(o(a.dataMax, j[0]), pa(j))
          }
        }else {
          var P, H, C, A = g.cropped, z = g.xAxis.getExtremes(), E = !!g.modifyValue;
          k = j.stacking;
          a.usePercentage = k === "percent";
          if(k) {
            s = j.stack, p = g.type + o(s, ""), n = "-" + p, g.stackKey = p, m = d[p] || [], d[p] = m, l = e[n] || [], e[n] = l
          }
          if(a.usePercentage) {
            a.dataMin = 0, a.dataMax = 99
          }
          j = g.processedXData;
          B = g.processedYData;
          v = B.length;
          for(h = 0;h < v;h++) {
            w = j[h];
            G = B[h];
            if(k) {
              H = (P = G < t) ? l : m, C = P ? n : p, r(H[w]) ? (H[w] = ia(H[w] + G), G = [G, H[w]]) : H[w] = G, c[C] || (c[C] = {}), c[C][w] || (c[C][w] = new Kb(a, a.options.stackLabels, P, w, s, k)), c[C][w].setTotal(H[w]), c[C][w].touched = f
            }
            if(G !== null && G !== y && (!a.isLog || G.length || G > 0)) {
              if(E && (G = g.modifyValue(G)), g.getExtremesFromAll || A || (j[h + 1] || w) >= z.min && (j[h - 1] || w) <= z.max) {
                if(w = G.length) {
                  for(;w--;) {
                    G[w] !== null && (u[x++] = G[w])
                  }
                }else {
                  u[x++] = G
                }
              }
            }
          }
          if(!a.usePercentage && u.length) {
            g.dataMin = k = Ga(u), g.dataMax = g = pa(u), a.dataMin = K(o(a.dataMin, k), k), a.dataMax = q(o(a.dataMax, g), g)
          }
          if(r(t)) {
            if(a.dataMin >= t) {
              a.dataMin = t, a.ignoreMinPadding = !0
            }else {
              if(a.dataMax < t) {
                a.dataMax = t, a.ignoreMaxPadding = !0
              }
            }
          }
        }
      }
    });
    for(g in c) {
      for(h in c[g]) {
        c[g][h].touched < f && (c[g][h].destroy(), delete c[g][h])
      }
    }
  }, translate:function(a, b, c, d, e, f) {
    var g = this.len, h = 1, i = 0, j = d ? this.oldTransA : this.transA, d = d ? this.oldMin : this.min, k = this.minPixelPadding, e = (this.options.ordinal || this.isLog && e) && this.lin2val;
    if(!j) {
      j = this.transA
    }
    c && (h *= -1, i = g);
    this.reversed && (h *= -1, i -= h * g);
    b ? (a = a * h + i, a -= k, a = a / j + d, e && (a = this.lin2val(a))) : (e && (a = this.val2lin(a)), a = h * (a - d) * j + i + h * k + (f ? j * this.pointRange / 2 : 0));
    return a
  }, toPixels:function(a, b) {
    return this.translate(a, !1, !this.horiz, null, !0) + (b ? 0 : this.pos)
  }, toValue:function(a, b) {
    return this.translate(a - (b ? 0 : this.pos), !0, !this.horiz, null, !0)
  }, getPlotLinePath:function(a, b, c, d) {
    var e = this.chart, f = this.left, g = this.top, h, i, j, a = this.translate(a, null, null, c), k = c && e.oldChartHeight || e.chartHeight, m = c && e.oldChartWidth || e.chartWidth, l;
    h = this.transB;
    c = i = t(a + h);
    h = j = t(k - a - h);
    if(isNaN(a)) {
      l = !0
    }else {
      if(this.horiz) {
        if(h = g, j = k - this.bottom, c < f || c > f + this.width) {
          l = !0
        }
      }else {
        if(c = f, i = m - this.right, h < g || h > g + this.height) {
          l = !0
        }
      }
    }
    return l && !d ? null : e.renderer.crispLine(["M", c, h, "L", i, j], b || 0)
  }, getPlotBandPath:function(a, b) {
    var c = this.getPlotLinePath(b), d = this.getPlotLinePath(a);
    d && c ? d.push(c[4], c[5], c[1], c[2]) : d = null;
    return d
  }, getLinearTickPositions:function(a, b, c) {
    for(var d, b = ia(T(b / a) * a), c = ia(ja(c / a) * a), e = [];b <= c;) {
      e.push(b);
      b = ia(b + a);
      if(b === d) {
        break
      }
      d = b
    }
    return e
  }, getLogTickPositions:function(a, b, c, d) {
    var e = this.options, f = this.len, g = [];
    if(!d) {
      this._minorAutoInterval = null
    }
    if(a >= 0.5) {
      a = t(a), g = this.getLinearTickPositions(a, b, c)
    }else {
      if(a >= 0.08) {
        for(var f = T(b), h, i, j, k, m, e = a > 0.3 ? [1, 2, 4] : a > 0.15 ? [1, 2, 4, 6, 8] : [1, 2, 3, 4, 5, 6, 7, 8, 9];f < c + 1 && !m;f++) {
          i = e.length;
          for(h = 0;h < i && !m;h++) {
            j = ka(da(f) * e[h]), j > b && (!d || k <= c) && g.push(k), k > c && (m = !0), k = j
          }
        }
      }else {
        if(b = da(b), c = da(c), a = e[d ? "minorTickInterval" : "tickInterval"], a = o(a === "auto" ? null : a, this._minorAutoInterval, (c - b) * (e.tickPixelInterval / (d ? 5 : 1)) / ((d ? f / this.tickPositions.length : f) || 1)), a = ib(a, null, I.pow(10, T(I.log(a) / I.LN10))), g = La(this.getLinearTickPositions(a, b, c), ka), !d) {
          this._minorAutoInterval = a / 5
        }
      }
    }
    if(!d) {
      this.tickInterval = a
    }
    return g
  }, getMinorTickPositions:function() {
    var a = this.options, b = this.tickPositions, c = this.minorTickInterval, d = [], e;
    if(this.isLog) {
      e = b.length;
      for(a = 1;a < e;a++) {
        d = d.concat(this.getLogTickPositions(c, b[a - 1], b[a], !0))
      }
    }else {
      if(this.isDatetimeAxis && a.minorTickInterval === "auto") {
        d = d.concat(Cb(Ab(c), this.min, this.max, a.startOfWeek)), d[0] < this.min && d.shift()
      }else {
        for(b = this.min + (b[0] - this.min) % c;b <= this.max;b += c) {
          d.push(b)
        }
      }
    }
    return d
  }, adjustForMinRange:function() {
    var a = this.options, b = this.min, c = this.max, d, e = this.dataMax - this.dataMin >= this.minRange, f, g, h, i, j;
    if(this.isXAxis && this.minRange === y && !this.isLog) {
      r(a.min) || r(a.max) ? this.minRange = null : (n(this.series, function(a) {
        i = a.xData;
        for(g = j = a.xIncrement ? 1 : i.length - 1;g > 0;g--) {
          if(h = i[g] - i[g - 1], f === y || h < f) {
            f = h
          }
        }
      }), this.minRange = K(f * 5, this.dataMax - this.dataMin))
    }
    if(c - b < this.minRange) {
      var k = this.minRange;
      d = (k - c + b) / 2;
      d = [b - d, o(a.min, b - d)];
      if(e) {
        d[2] = this.dataMin
      }
      b = pa(d);
      c = [b + k, o(a.max, b + k)];
      if(e) {
        c[2] = this.dataMax
      }
      c = Ga(c);
      c - b < k && (d[0] = c - k, d[1] = o(a.min, c - k), b = pa(d))
    }
    this.min = b;
    this.max = c
  }, setAxisTranslation:function(a) {
    var b = this.max - this.min, c = 0, d, e = 0, f = 0, g = this.linkedParent, h = this.transA;
    if(this.isXAxis) {
      g ? (e = g.minPointOffset, f = g.pointRangePadding) : n(this.series, function(a) {
        var g = a.pointRange, h = a.options.pointPlacement, m = a.closestPointRange;
        g > b && (g = 0);
        c = q(c, g);
        e = q(e, h ? 0 : g / 2);
        f = q(f, h === "on" ? 0 : g);
        !a.noSharedTooltip && r(m) && (d = r(d) ? K(d, m) : m)
      }), g = this.ordinalSlope && d ? this.ordinalSlope / d : 1, this.minPointOffset = e *= g, this.pointRangePadding = f *= g, this.pointRange = K(c, b), this.closestPointRange = d
    }
    if(a) {
      this.oldTransA = h
    }
    this.translationSlope = this.transA = h = this.len / (b + f || 1);
    this.transB = this.horiz ? this.left : this.bottom;
    this.minPixelPadding = h * e
  }, setTickPositions:function(a) {
    var b = this, c = b.chart, d = b.options, e = b.isLog, f = b.isDatetimeAxis, g = b.isXAxis, h = b.isLinked, i = b.options.tickPositioner, j = d.maxPadding, k = d.minPadding, m = d.tickInterval, l = d.minTickInterval, p = d.tickPixelInterval, s = b.categories;
    h ? (b.linkedParent = c[g ? "xAxis" : "yAxis"][d.linkedTo], c = b.linkedParent.getExtremes(), b.min = o(c.min, c.dataMin), b.max = o(c.max, c.dataMax), d.type !== b.linkedParent.options.type && qa(11, 1)) : (b.min = o(b.userMin, d.min, b.dataMin), b.max = o(b.userMax, d.max, b.dataMax));
    if(e) {
      !a && K(b.min, o(b.dataMin, b.min)) <= 0 && qa(10, 1), b.min = ia(ka(b.min)), b.max = ia(ka(b.max))
    }
    if(b.range && (b.userMin = b.min = q(b.min, b.max - b.range), b.userMax = b.max, a)) {
      b.range = null
    }
    b.beforePadding && b.beforePadding();
    b.adjustForMinRange();
    if(!s && !b.usePercentage && !h && r(b.min) && r(b.max) && (c = b.max - b.min)) {
      if(!r(d.min) && !r(b.userMin) && k && (b.dataMin < 0 || !b.ignoreMinPadding)) {
        b.min -= c * k
      }
      if(!r(d.max) && !r(b.userMax) && j && (b.dataMax > 0 || !b.ignoreMaxPadding)) {
        b.max += c * j
      }
    }
    b.tickInterval = b.min === b.max || b.min === void 0 || b.max === void 0 ? 1 : h && !m && p === b.linkedParent.options.tickPixelInterval ? b.linkedParent.tickInterval : o(m, s ? 1 : (b.max - b.min) * p / (b.len || 1));
    g && !a && n(b.series, function(a) {
      a.processData(b.min !== b.oldMin || b.max !== b.oldMax)
    });
    b.setAxisTranslation(!0);
    b.beforeSetTickPositions && b.beforeSetTickPositions();
    if(b.postProcessTickInterval) {
      b.tickInterval = b.postProcessTickInterval(b.tickInterval)
    }
    if(!m && b.tickInterval < l) {
      b.tickInterval = l
    }
    if(!f && !e && (a = I.pow(10, T(I.log(b.tickInterval) / I.LN10)), !m)) {
      b.tickInterval = ib(b.tickInterval, null, a, d)
    }
    b.minorTickInterval = d.minorTickInterval === "auto" && b.tickInterval ? b.tickInterval / 5 : d.minorTickInterval;
    b.tickPositions = i = d.tickPositions ? [].concat(d.tickPositions) : i && i.apply(b, [b.min, b.max]);
    if(!i) {
      i = f ? (b.getNonLinearTimeTicks || Cb)(Ab(b.tickInterval, d.units), b.min, b.max, d.startOfWeek, b.ordinalPositions, b.closestPointRange, !0) : e ? b.getLogTickPositions(b.tickInterval, b.min, b.max) : b.getLinearTickPositions(b.tickInterval, b.min, b.max), b.tickPositions = i
    }
    if(!h) {
      e = i[0], f = i[i.length - 1], h = b.minPointOffset || 0, d.startOnTick ? b.min = e : b.min - h > e && i.shift(), d.endOnTick ? b.max = f : b.max + h < f && i.pop(), i.length === 1 && (b.min -= 0.001, b.max += 0.001)
    }
  }, setMaxTicks:function() {
    var a = this.chart, b = a.maxTicks || {}, c = this.tickPositions, d = this._maxTicksKey = [this.xOrY, this.pos, this.len].join("-");
    if(!this.isLinked && !this.isDatetimeAxis && c && c.length > (b[d] || 0) && this.options.alignTicks !== !1) {
      b[d] = c.length
    }
    a.maxTicks = b
  }, adjustTickAmount:function() {
    var a = this._maxTicksKey, b = this.tickPositions, c = this.chart.maxTicks;
    if(c && c[a] && !this.isDatetimeAxis && !this.categories && !this.isLinked && this.options.alignTicks !== !1) {
      var d = this.tickAmount, e = b.length;
      this.tickAmount = a = c[a];
      if(e < a) {
        for(;b.length < a;) {
          b.push(ia(b[b.length - 1] + this.tickInterval))
        }
        this.transA *= (e - 1) / (a - 1);
        this.max = b[b.length - 1]
      }
      if(r(d) && a !== d) {
        this.isDirty = !0
      }
    }
  }, setScale:function() {
    var a = this.stacks, b, c, d, e;
    this.oldMin = this.min;
    this.oldMax = this.max;
    this.oldAxisLength = this.len;
    this.setAxisSize();
    e = this.len !== this.oldAxisLength;
    n(this.series, function(a) {
      if(a.isDirtyData || a.isDirty || a.xAxis.isDirty) {
        d = !0
      }
    });
    if(e || d || this.isLinked || this.forceRedraw || this.userMin !== this.oldUserMin || this.userMax !== this.oldUserMax) {
      if(this.forceRedraw = !1, this.getSeriesExtremes(), this.setTickPositions(), this.oldUserMin = this.userMin, this.oldUserMax = this.userMax, !this.isDirty) {
        this.isDirty = e || this.min !== this.oldMin || this.max !== this.oldMax
      }
    }
    if(!this.isXAxis) {
      for(b in a) {
        for(c in a[b]) {
          a[b][c].cum = a[b][c].total
        }
      }
    }
    this.setMaxTicks()
  }, setExtremes:function(a, b, c, d, e) {
    var f = this, g = f.chart, c = o(c, !0), e = v(e, {min:a, max:b});
    D(f, "setExtremes", e, function() {
      f.userMin = a;
      f.userMax = b;
      f.isDirtyExtremes = !0;
      c && g.redraw(d)
    })
  }, zoom:function(a, b) {
    this.allowZoomOutside || (a <= this.dataMin && (a = y), b >= this.dataMax && (b = y));
    this.displayBtn = a !== y || b !== y;
    this.setExtremes(a, b, !1, y, {trigger:"zoom"});
    return!0
  }, setAxisSize:function() {
    var a = this.chart, b = this.options, c = b.offsetLeft || 0, d = b.offsetRight || 0, e = this.horiz, f, g;
    this.left = g = o(b.left, a.plotLeft + c);
    this.top = f = o(b.top, a.plotTop);
    this.width = c = o(b.width, a.plotWidth - c + d);
    this.height = b = o(b.height, a.plotHeight);
    this.bottom = a.chartHeight - b - f;
    this.right = a.chartWidth - c - g;
    this.len = q(e ? c : b, 0);
    this.pos = e ? g : f
  }, getExtremes:function() {
    var a = this.isLog;
    return{min:a ? ia(da(this.min)) : this.min, max:a ? ia(da(this.max)) : this.max, dataMin:this.dataMin, dataMax:this.dataMax, userMin:this.userMin, userMax:this.userMax}
  }, getThreshold:function(a) {
    var b = this.isLog, c = b ? da(this.min) : this.min, b = b ? da(this.max) : this.max;
    c > a || a === null ? a = c : b < a && (a = b);
    return this.translate(a, 0, 1, 0, 1)
  }, addPlotBand:function(a) {
    this.addPlotBandOrLine(a, "plotBands")
  }, addPlotLine:function(a) {
    this.addPlotBandOrLine(a, "plotLines")
  }, addPlotBandOrLine:function(a, b) {
    var c = (new pb(this, a)).render(), d = this.userOptions;
    b && (d[b] = d[b] || [], d[b].push(a));
    this.plotLinesAndBands.push(c);
    return c
  }, getOffset:function() {
    var a = this, b = a.chart, c = b.renderer, d = a.options, e = a.tickPositions, f = a.ticks, g = a.horiz, h = a.side, i = b.inverted ? [1, 0, 3, 2][h] : h, j, k = 0, m, l = 0, p = d.title, s = d.labels, t = 0, B = b.axisOffset, w = b.clipOffset, G = [-1, 1, 1, -1][h], v;
    a.hasData = b = a.hasVisibleSeries || r(a.min) && r(a.max) && !!e;
    a.showAxis = j = b || o(d.showEmpty, !0);
    if(!a.axisGroup) {
      a.gridGroup = c.g("grid").attr({zIndex:d.gridZIndex || 1}).add(), a.axisGroup = c.g("axis").attr({zIndex:d.zIndex || 2}).add(), a.labelGroup = c.g("axis-labels").attr({zIndex:s.zIndex || 7}).add()
    }
    if(b || a.isLinked) {
      n(e, function(b) {
        f[b] ? f[b].addLabel() : f[b] = new Ja(a, b)
      }), n(e, function(a) {
        if(h === 0 || h === 2 || {1:"left", 3:"right"}[h] === s.align) {
          t = q(f[a].getLabelSize(), t)
        }
      }), a.staggerLines && (t += (a.staggerLines - 1) * 16)
    }else {
      for(v in f) {
        f[v].destroy(), delete f[v]
      }
    }
    if(p && p.text && p.enabled !== !1) {
      if(!a.axisTitle) {
        a.axisTitle = c.text(p.text, 0, 0, p.useHTML).attr({zIndex:7, rotation:p.rotation || 0, align:p.textAlign || {low:"left", middle:"center", high:"right"}[p.align]}).css(p.style).add(a.axisGroup), a.axisTitle.isNew = !0
      }
      if(j) {
        k = a.axisTitle.getBBox()[g ? "height" : "width"], l = o(p.margin, g ? 5 : 10), m = p.offset
      }
      a.axisTitle[j ? "show" : "hide"]()
    }
    a.offset = G * o(d.offset, B[h]);
    a.axisTitleMargin = o(m, t + l + (h !== 2 && t && G * d.labels[g ? "y" : "x"]));
    B[h] = q(B[h], a.axisTitleMargin + k + G * a.offset);
    w[i] = q(w[i], d.lineWidth)
  }, getLinePath:function(a) {
    var b = this.chart, c = this.opposite, d = this.offset, e = this.horiz, f = this.left + (c ? this.width : 0) + d;
    this.lineTop = d = b.chartHeight - this.bottom - (c ? this.height : 0) + d;
    c || (a *= -1);
    return b.renderer.crispLine(["M", e ? this.left : f, e ? d : this.top, "L", e ? b.chartWidth - this.right : f, e ? d : b.chartHeight - this.bottom], a)
  }, getTitlePosition:function() {
    var a = this.horiz, b = this.left, c = this.top, d = this.len, e = this.options.title, f = a ? b : c, g = this.opposite, h = this.offset, i = u(e.style.fontSize || 12), d = {low:f + (a ? 0 : d), middle:f + d / 2, high:f + (a ? d : 0)}[e.align], b = (a ? c + this.height : b) + (a ? 1 : -1) * (g ? -1 : 1) * this.axisTitleMargin + (this.side === 2 ? i : 0);
    return{x:a ? d : b + (g ? this.width : 0) + h + (e.x || 0), y:a ? b - (g ? this.height : 0) + h : d + (e.y || 0)}
  }, render:function() {
    var a = this, b = a.chart, c = b.renderer, d = a.options, e = a.isLog, f = a.isLinked, g = a.tickPositions, h = a.axisTitle, i = a.stacks, j = a.ticks, k = a.minorTicks, m = a.alternateBands, l = d.stackLabels, p = d.alternateGridColor, s = a.tickmarkOffset, o = d.lineWidth, B, w = b.hasRendered && r(a.oldMin) && !isNaN(a.oldMin);
    B = a.hasData;
    var q = a.showAxis, t, v;
    n([j, k, m], function(a) {
      for(var b in a) {
        a[b].isActive = !1
      }
    });
    if(B || f) {
      if(a.minorTickInterval && !a.categories && n(a.getMinorTickPositions(), function(b) {
        k[b] || (k[b] = new Ja(a, b, "minor"));
        w && k[b].isNew && k[b].render(null, !0);
        k[b].render(null, !1, 1)
      }), g.length && (n(g.slice(1).concat([g[0]]), function(b, c) {
        c = c === g.length - 1 ? 0 : c + 1;
        if(!f || b >= a.min && b <= a.max) {
          j[b] || (j[b] = new Ja(a, b)), w && j[b].isNew && j[b].render(c, !0), j[b].render(c, !1, 1)
        }
      }), s && a.min === 0 && (j[-1] || (j[-1] = new Ja(a, -1, null, !0)), j[-1].render(-1))), p && n(g, function(b, c) {
        if(c % 2 === 0 && b < a.max) {
          m[b] || (m[b] = new pb(a)), t = b + s, v = g[c + 1] !== y ? g[c + 1] + s : a.max, m[b].options = {from:e ? da(t) : t, to:e ? da(v) : v, color:p}, m[b].render(), m[b].isActive = !0
        }
      }), !a._addedPlotLB) {
        n((d.plotLines || []).concat(d.plotBands || []), function(b) {
          a.addPlotBandOrLine(b)
        }), a._addedPlotLB = !0
      }
    }
    n([j, k, m], function(a) {
      var c, d, e = [], f = za ? za.duration || 500 : 0, g = function() {
        for(d = e.length;d--;) {
          a[e[d]] && !a[e[d]].isActive && (a[e[d]].destroy(), delete a[e[d]])
        }
      };
      for(c in a) {
        if(!a[c].isActive) {
          a[c].render(c, !1, 0), a[c].isActive = !1, e.push(c)
        }
      }
      a === m || !b.hasRendered || !f ? g() : f && setTimeout(g, f)
    });
    if(o) {
      B = a.getLinePath(o), a.axisLine ? a.axisLine.animate({d:B}) : a.axisLine = c.path(B).attr({stroke:d.lineColor, "stroke-width":o, zIndex:7}).add(a.axisGroup), a.axisLine[q ? "show" : "hide"]()
    }
    if(h && q) {
      h[h.isNew ? "attr" : "animate"](a.getTitlePosition()), h.isNew = !1
    }
    if(l && l.enabled) {
      var u, x, d = a.stackTotalGroup;
      if(!d) {
        a.stackTotalGroup = d = c.g("stack-labels").attr({visibility:"visible", zIndex:6}).add()
      }
      d.translate(b.plotLeft, b.plotTop);
      for(u in i) {
        for(x in c = i[u], c) {
          c[x].render(d)
        }
      }
    }
    a.isDirty = !1
  }, removePlotBandOrLine:function(a) {
    for(var b = this.plotLinesAndBands, c = b.length;c--;) {
      b[c].id === a && b[c].destroy()
    }
  }, setTitle:function(a, b) {
    this.update({title:a}, b)
  }, redraw:function() {
    var a = this.chart.pointer;
    a.reset && a.reset(!0);
    this.render();
    n(this.plotLinesAndBands, function(a) {
      a.render()
    });
    n(this.series, function(a) {
      a.isDirty = !0
    })
  }, setCategories:function(a, b) {
    this.update({categories:a}, b)
  }, destroy:function() {
    var a = this, b = a.stacks, c;
    ba(a);
    for(c in b) {
      Ha(b[c]), b[c] = null
    }
    n([a.ticks, a.minorTicks, a.alternateBands, a.plotLinesAndBands], function(a) {
      Ha(a)
    });
    n("stackTotalGroup,axisLine,axisGroup,gridGroup,labelGroup,axisTitle".split(","), function(b) {
      a[b] && (a[b] = a[b].destroy())
    })
  }};
  qb.prototype = {init:function(a, b) {
    var c = b.borderWidth, d = b.style, e = u(d.padding);
    this.chart = a;
    this.options = b;
    this.crosshairs = [];
    this.now = {x:0, y:0};
    this.isHidden = !0;
    this.label = a.renderer.label("", 0, 0, b.shape, null, null, b.useHTML, null, "tooltip").attr({padding:e, fill:b.backgroundColor, "stroke-width":c, r:b.borderRadius, zIndex:8}).css(d).css({padding:0}).hide().add();
    $ || this.label.shadow(b.shadow);
    this.shared = b.shared
  }, destroy:function() {
    n(this.crosshairs, function(a) {
      a && a.destroy()
    });
    if(this.label) {
      this.label = this.label.destroy()
    }
    clearTimeout(this.hideTimer);
    clearTimeout(this.tooltipTimeout)
  }, move:function(a, b, c, d) {
    var e = this, f = e.now, g = e.options.animation !== !1 && !e.isHidden;
    v(f, {x:g ? (2 * f.x + a) / 3 : a, y:g ? (f.y + b) / 2 : b, anchorX:g ? (2 * f.anchorX + c) / 3 : c, anchorY:g ? (f.anchorY + d) / 2 : d});
    e.label.attr(f);
    if(g && (Q(a - f.x) > 1 || Q(b - f.y) > 1)) {
      clearTimeout(this.tooltipTimeout), this.tooltipTimeout = setTimeout(function() {
        e && e.move(a, b, c, d)
      }, 32)
    }
  }, hide:function() {
    var a = this, b;
    clearTimeout(this.hideTimer);
    if(!this.isHidden) {
      b = this.chart.hoverPoints, this.hideTimer = setTimeout(function() {
        a.label.fadeOut();
        a.isHidden = !0
      }, o(this.options.hideDelay, 500)), b && n(b, function(a) {
        a.setState()
      }), this.chart.hoverPoints = null
    }
  }, hideCrosshairs:function() {
    n(this.crosshairs, function(a) {
      a && a.hide()
    })
  }, getAnchor:function(a, b) {
    var c, d = this.chart, e = d.inverted, f = d.plotTop, g = 0, h = 0, i, a = ha(a);
    c = a[0].tooltipPos;
    this.followPointer && b && (b.chartX === y && (b = d.pointer.normalize(b)), c = [b.chartX - d.plotLeft, b.chartY - f]);
    c || (n(a, function(a) {
      i = a.series.yAxis;
      g += a.plotX;
      h += (a.plotLow ? (a.plotLow + a.plotHigh) / 2 : a.plotY) + (!e && i ? i.top - f : 0)
    }), g /= a.length, h /= a.length, c = [e ? d.plotWidth - h : g, this.shared && !e && a.length > 1 && b ? b.chartY - f : e ? d.plotHeight - g : h]);
    return La(c, t)
  }, getPosition:function(a, b, c) {
    var d = this.chart, e = d.plotLeft, f = d.plotTop, g = d.plotWidth, h = d.plotHeight, i = o(this.options.distance, 12), j = c.plotX, c = c.plotY, d = j + e + (d.inverted ? i : -a - i), k = c - b + f + 15, m;
    d < 7 && (d = e + q(j, 0) + i);
    d + a > e + g && (d -= d + a - (e + g), k = c - b + f - i, m = !0);
    k < f + 5 && (k = f + 5, m && c >= k && c <= k + b && (k = c + f + i));
    k + b > f + h && (k = q(f, f + h - b - i));
    return{x:d, y:k}
  }, defaultFormatter:function(a) {
    var b = this.points || ha(this), c = b[0].series, d;
    d = [c.tooltipHeaderFormatter(b[0])];
    n(b, function(a) {
      c = a.series;
      d.push(c.tooltipFormatter && c.tooltipFormatter(a) || a.point.tooltipFormatter(c.tooltipOptions.pointFormat))
    });
    d.push(a.options.footerFormat || "");
    return d.join("")
  }, refresh:function(a, b) {
    var c = this.chart, d = this.label, e = this.options, f, g, h, i = {}, j, k = [];
    j = e.formatter || this.defaultFormatter;
    var i = c.hoverPoints, m, l = e.crosshairs;
    h = this.shared;
    clearTimeout(this.hideTimer);
    this.followPointer = ha(a)[0].series.tooltipOptions.followPointer;
    g = this.getAnchor(a, b);
    f = g[0];
    g = g[1];
    h && (!a.series || !a.series.noSharedTooltip) ? (c.hoverPoints = a, i && n(i, function(a) {
      a.setState()
    }), n(a, function(a) {
      a.setState("hover");
      k.push(a.getLabelConfig())
    }), i = {x:a[0].category, y:a[0].y}, i.points = k, a = a[0]) : i = a.getLabelConfig();
    j = j.call(i, this);
    i = a.series;
    h = h || !i.isCartesian || i.tooltipOutsidePlot || c.isInsidePlot(f, g);
    j === !1 || !h ? this.hide() : (this.isHidden && (Ta(d), d.attr("opacity", 1).show()), d.attr({text:j}), m = e.borderColor || a.color || i.color || "#606060", d.attr({stroke:m}), this.updatePosition({plotX:f, plotY:g}), this.isHidden = !1);
    if(l) {
      l = ha(l);
      for(d = l.length;d--;) {
        if(e = a.series[d ? "yAxis" : "xAxis"], l[d] && e) {
          if(h = d ? o(a.stackY, a.y) : a.x, e.isLog && (h = ka(h)), e = e.getPlotLinePath(h, 1), this.crosshairs[d]) {
            this.crosshairs[d].attr({d:e, visibility:"visible"})
          }else {
            h = {"stroke-width":l[d].width || 1, stroke:l[d].color || "#C0C0C0", zIndex:l[d].zIndex || 2};
            if(l[d].dashStyle) {
              h.dashstyle = l[d].dashStyle
            }
            this.crosshairs[d] = c.renderer.path(e).attr(h).add()
          }
        }
      }
    }
    D(c, "tooltipRefresh", {text:j, x:f + c.plotLeft, y:g + c.plotTop, borderColor:m})
  }, updatePosition:function(a) {
    var b = this.chart, c = this.label, c = (this.options.positioner || this.getPosition).call(this, c.width, c.height, a);
    this.move(t(c.x), t(c.y), a.plotX + b.plotLeft, a.plotY + b.plotTop)
  }};
  rb.prototype = {init:function(a, b) {
    var c = $ ? "" : b.chart.zoomType, d = a.inverted, e;
    this.options = b;
    this.chart = a;
    this.zoomX = e = /x/.test(c);
    this.zoomY = c = /y/.test(c);
    this.zoomHor = e && !d || c && d;
    this.zoomVert = c && !d || e && d;
    this.pinchDown = [];
    this.lastValidTouch = {};
    if(b.tooltip.enabled) {
      a.tooltip = new qb(a, b.tooltip)
    }
    this.setDOMEvents()
  }, normalize:function(a) {
    var b, c, d, a = a || O.event;
    if(!a.target) {
      a.target = a.srcElement
    }
    a = Qb(a);
    d = a.touches ? a.touches.item(0) : a;
    this.chartPosition = b = Ub(this.chart.container);
    d.pageX === y ? (c = a.x, b = a.y) : (c = d.pageX - b.left, b = d.pageY - b.top);
    return v(a, {chartX:t(c), chartY:t(b)})
  }, getCoordinates:function(a) {
    var b = {xAxis:[], yAxis:[]};
    n(this.chart.axes, function(c) {
      b[c.isXAxis ? "xAxis" : "yAxis"].push({axis:c, value:c.toValue(a[c.horiz ? "chartX" : "chartY"])})
    });
    return b
  }, getIndex:function(a) {
    var b = this.chart;
    return b.inverted ? b.plotHeight + b.plotTop - a.chartY : a.chartX - b.plotLeft
  }, runPointActions:function(a) {
    var b = this.chart, c = b.series, d = b.tooltip, e, f = b.hoverPoint, g = b.hoverSeries, h, i, j = b.chartWidth, k = this.getIndex(a);
    if(d && this.options.tooltip.shared && (!g || !g.noSharedTooltip)) {
      e = [];
      h = c.length;
      for(i = 0;i < h;i++) {
        if(c[i].visible && c[i].options.enableMouseTracking !== !1 && !c[i].noSharedTooltip && c[i].tooltipPoints.length && (b = c[i].tooltipPoints[k], b.series)) {
          b._dist = Q(k - b.clientX), j = K(j, b._dist), e.push(b)
        }
      }
      for(h = e.length;h--;) {
        e[h]._dist > j && e.splice(h, 1)
      }
      if(e.length && e[0].clientX !== this.hoverX) {
        d.refresh(e, a), this.hoverX = e[0].clientX
      }
    }
    if(g && g.tracker) {
      if((b = g.tooltipPoints[k]) && b !== f) {
        b.onMouseOver(a)
      }
    }else {
      d && d.followPointer && !d.isHidden && (a = d.getAnchor([{}], a), d.updatePosition({plotX:a[0], plotY:a[1]}))
    }
  }, reset:function(a) {
    var b = this.chart, c = b.hoverSeries, d = b.hoverPoint, e = b.tooltip, b = e && e.shared ? b.hoverPoints : d;
    (a = a && e && b) && ha(b)[0].plotX === y && (a = !1);
    if(a) {
      e.refresh(b)
    }else {
      if(d) {
        d.onMouseOut()
      }
      if(c) {
        c.onMouseOut()
      }
      e && (e.hide(), e.hideCrosshairs());
      this.hoverX = null
    }
  }, scaleGroups:function(a, b) {
    var c = this.chart;
    n(c.series, function(d) {
      d.xAxis && d.xAxis.zoomEnabled && (d.group.attr(a), d.markerGroup && (d.markerGroup.attr(a), d.markerGroup.clip(b ? c.clipRect : null)), d.dataLabelsGroup && d.dataLabelsGroup.attr(a))
    });
    c.clipRect.attr(b || c.clipBox)
  }, pinchTranslateDirection:function(a, b, c, d, e, f, g) {
    var h = this.chart, i = a ? "x" : "y", j = a ? "X" : "Y", k = "chart" + j, m = a ? "width" : "height", l = h["plot" + (a ? "Left" : "Top")], p, s, o = 1, n = h.inverted, w = h.bounds[a ? "h" : "v"], q = b.length === 1, t = b[0][k], r = c[0][k], v = !q && b[1][k], u = !q && c[1][k], x, c = function() {
      !q && Q(t - v) > 20 && (o = Q(r - u) / Q(t - v));
      s = (l - r) / o + t;
      p = h["plot" + (a ? "Width" : "Height")] / o
    };
    c();
    b = s;
    b < w.min ? (b = w.min, x = !0) : b + p > w.max && (b = w.max - p, x = !0);
    x ? (r -= 0.8 * (r - g[i][0]), q || (u -= 0.8 * (u - g[i][1])), c()) : g[i] = [r, u];
    n || (f[i] = s - l, f[m] = p);
    f = n ? 1 / o : o;
    e[m] = p;
    e[i] = b;
    d[n ? a ? "scaleY" : "scaleX" : "scale" + j] = o;
    d["translate" + j] = f * l + (r - f * t)
  }, pinch:function(a) {
    var b = this, c = b.chart, d = b.pinchDown, e = c.tooltip && c.tooltip.options.followTouchMove, f = a.touches, g = f.length, h = b.lastValidTouch, i = b.zoomHor || b.pinchHor, j = b.zoomVert || b.pinchVert, k = i || j, m = b.selectionMarker, l = {}, p = {};
    a.type === "touchstart" && (e || k) && a.preventDefault();
    La(f, function(a) {
      return b.normalize(a)
    });
    if(a.type === "touchstart") {
      n(f, function(a, b) {
        d[b] = {chartX:a.chartX, chartY:a.chartY}
      }), h.x = [d[0].chartX, d[1] && d[1].chartX], h.y = [d[0].chartY, d[1] && d[1].chartY], n(c.axes, function(a) {
        if(a.zoomEnabled) {
          var b = c.bounds[a.horiz ? "h" : "v"], d = a.minPixelPadding, e = a.toPixels(a.dataMin), f = a.toPixels(a.dataMax), g = K(e, f), e = q(e, f);
          b.min = K(a.pos, g - d);
          b.max = q(a.pos + a.len, e + d)
        }
      })
    }else {
      if(d.length) {
        if(!m) {
          b.selectionMarker = m = v({destroy:ta}, c.plotBox)
        }
        i && b.pinchTranslateDirection(!0, d, f, l, m, p, h);
        j && b.pinchTranslateDirection(!1, d, f, l, m, p, h);
        b.hasPinched = k;
        b.scaleGroups(l, p);
        !k && e && g === 1 && this.runPointActions(b.normalize(a))
      }
    }
  }, dragStart:function(a) {
    var b = this.chart;
    b.mouseIsDown = a.type;
    b.cancelClick = !1;
    b.mouseDownX = this.mouseDownX = a.chartX;
    this.mouseDownY = a.chartY
  }, drag:function(a) {
    var b = this.chart, c = b.options.chart, d = a.chartX, a = a.chartY, e = this.zoomHor, f = this.zoomVert, g = b.plotLeft, h = b.plotTop, i = b.plotWidth, j = b.plotHeight, k, m = this.mouseDownX, l = this.mouseDownY;
    d < g ? d = g : d > g + i && (d = g + i);
    a < h ? a = h : a > h + j && (a = h + j);
    this.hasDragged = Math.sqrt(Math.pow(m - d, 2) + Math.pow(l - a, 2));
    if(this.hasDragged > 10) {
      k = b.isInsidePlot(m - g, l - h);
      if(b.hasCartesianSeries && (this.zoomX || this.zoomY) && k && !this.selectionMarker) {
        this.selectionMarker = b.renderer.rect(g, h, e ? 1 : i, f ? 1 : j, 0).attr({fill:c.selectionMarkerFill || "rgba(69,114,167,0.25)", zIndex:7}).add()
      }
      this.selectionMarker && e && (e = d - m, this.selectionMarker.attr({width:Q(e), x:(e > 0 ? 0 : e) + m}));
      this.selectionMarker && f && (e = a - l, this.selectionMarker.attr({height:Q(e), y:(e > 0 ? 0 : e) + l}));
      k && !this.selectionMarker && c.panning && b.pan(d)
    }
  }, drop:function(a) {
    var b = this.chart, c = this.hasPinched;
    if(this.selectionMarker) {
      var d = {xAxis:[], yAxis:[], originalEvent:a.originalEvent || a}, e = this.selectionMarker, f = e.x, g = e.y, h;
      if(this.hasDragged || c) {
        n(b.axes, function(a) {
          if(a.zoomEnabled) {
            var b = a.horiz, c = a.toValue(b ? f : g), b = a.toValue(b ? f + e.width : g + e.height);
            !isNaN(c) && !isNaN(b) && (d[a.xOrY + "Axis"].push({axis:a, min:K(c, b), max:q(c, b)}), h = !0)
          }
        }), h && D(b, "selection", d, function(a) {
          b.zoom(v(a, c ? {animation:!1} : null))
        })
      }
      this.selectionMarker = this.selectionMarker.destroy();
      c && this.scaleGroups({translateX:b.plotLeft, translateY:b.plotTop, scaleX:1, scaleY:1})
    }
    if(b) {
      L(b.container, {cursor:b._cursor}), b.cancelClick = this.hasDragged > 10, b.mouseIsDown = this.hasDragged = this.hasPinched = !1, this.pinchDown = []
    }
  }, onContainerMouseDown:function(a) {
    a = this.normalize(a);
    a.preventDefault && a.preventDefault();
    this.dragStart(a)
  }, onDocumentMouseUp:function(a) {
    this.drop(a)
  }, onDocumentMouseMove:function(a) {
    var b = this.chart, c = this.chartPosition, d = b.hoverSeries, a = Qb(a);
    c && d && d.isCartesian && !b.isInsidePlot(a.pageX - c.left - b.plotLeft, a.pageY - c.top - b.plotTop) && this.reset()
  }, onContainerMouseLeave:function() {
    this.reset();
    this.chartPosition = null
  }, onContainerMouseMove:function(a) {
    var b = this.chart, a = this.normalize(a);
    a.returnValue = !1;
    b.mouseIsDown === "mousedown" && this.drag(a);
    b.isInsidePlot(a.chartX - b.plotLeft, a.chartY - b.plotTop) && !b.openMenu && this.runPointActions(a)
  }, inClass:function(a, b) {
    for(var c;a;) {
      if(c = A(a, "class")) {
        if(c.indexOf(b) !== -1) {
          return!0
        }else {
          if(c.indexOf("highcharts-container") !== -1) {
            return!1
          }
        }
      }
      a = a.parentNode
    }
  }, onTrackerMouseOut:function(a) {
    var b = this.chart.hoverSeries;
    if(b && !b.options.stickyTracking && !this.inClass(a.toElement || a.relatedTarget, "highcharts-tooltip")) {
      b.onMouseOut()
    }
  }, onContainerClick:function(a) {
    var b = this.chart, c = b.hoverPoint, d = b.plotLeft, e = b.plotTop, f = b.inverted, g, h, i, a = this.normalize(a);
    a.cancelBubble = !0;
    if(!b.cancelClick) {
      c && this.inClass(a.target, "highcharts-tracker") ? (g = this.chartPosition, h = c.plotX, i = c.plotY, v(c, {pageX:g.left + d + (f ? b.plotWidth - i : h), pageY:g.top + e + (f ? b.plotHeight - h : i)}), D(c.series, "click", v(a, {point:c})), b.hoverPoint && c.firePointEvent("click", a)) : (v(a, this.getCoordinates(a)), b.isInsidePlot(a.chartX - d, a.chartY - e) && D(b, "click", a))
    }
  }, onContainerTouchStart:function(a) {
    var b = this.chart;
    a.touches.length === 1 ? (a = this.normalize(a), b.isInsidePlot(a.chartX - b.plotLeft, a.chartY - b.plotTop) && (this.runPointActions(a), this.pinch(a))) : a.touches.length === 2 && this.pinch(a)
  }, onContainerTouchMove:function(a) {
    (a.touches.length === 1 || a.touches.length === 2) && this.pinch(a)
  }, onDocumentTouchEnd:function(a) {
    this.drop(a)
  }, setDOMEvents:function() {
    var a = this, b = a.chart.container, c;
    this._events = c = [[b, "onmousedown", "onContainerMouseDown"], [b, "onmousemove", "onContainerMouseMove"], [b, "onclick", "onContainerClick"], [b, "mouseleave", "onContainerMouseLeave"], [z, "mousemove", "onDocumentMouseMove"], [z, "mouseup", "onDocumentMouseUp"]];
    fb && c.push([b, "ontouchstart", "onContainerTouchStart"], [b, "ontouchmove", "onContainerTouchMove"], [z, "touchend", "onDocumentTouchEnd"]);
    n(c, function(b) {
      a["_" + b[2]] = function(c) {
        a[b[2]](c)
      };
      b[1].indexOf("on") === 0 ? b[0][b[1]] = a["_" + b[2]] : J(b[0], b[1], a["_" + b[2]])
    })
  }, destroy:function() {
    var a = this;
    n(a._events, function(b) {
      b[1].indexOf("on") === 0 ? b[0][b[1]] = null : ba(b[0], b[1], a["_" + b[2]])
    });
    delete a._events;
    clearInterval(a.tooltipTimeout)
  }};
  sb.prototype = {init:function(a, b) {
    var c = this, d = b.itemStyle, e = o(b.padding, 8), f = b.itemMarginTop || 0;
    this.options = b;
    if(b.enabled) {
      c.baseline = u(d.fontSize) + 3 + f, c.itemStyle = d, c.itemHiddenStyle = x(d, b.itemHiddenStyle), c.itemMarginTop = f, c.padding = e, c.initialItemX = e, c.initialItemY = e - 5, c.maxItemWidth = 0, c.chart = a, c.itemHeight = 0, c.lastLineHeight = 0, c.render(), J(c.chart, "endResize", function() {
        c.positionCheckboxes()
      })
    }
  }, colorizeItem:function(a, b) {
    var c = this.options, d = a.legendItem, e = a.legendLine, f = a.legendSymbol, g = this.itemHiddenStyle.color, c = b ? c.itemStyle.color : g, h = b ? a.color : g, g = a.options && a.options.marker, i = {stroke:h, fill:h}, j;
    d && d.css({fill:c, color:c});
    e && e.attr({stroke:h});
    if(f) {
      if(g) {
        for(j in g = a.convertAttribs(g), g) {
          d = g[j], d !== y && (i[j] = d)
        }
      }
      f.attr(i)
    }
  }, positionItem:function(a) {
    var b = this.options, c = b.symbolPadding, b = !b.rtl, d = a._legendItemPos, e = d[0], d = d[1], f = a.checkbox;
    a.legendGroup && a.legendGroup.translate(b ? e : this.legendWidth - e - 2 * c - 4, d);
    if(f) {
      f.x = e, f.y = d
    }
  }, destroyItem:function(a) {
    var b = a.checkbox;
    n(["legendItem", "legendLine", "legendSymbol", "legendGroup"], function(b) {
      a[b] && a[b].destroy()
    });
    b && Ra(a.checkbox)
  }, destroy:function() {
    var a = this.group, b = this.box;
    if(b) {
      this.box = b.destroy()
    }
    if(a) {
      this.group = a.destroy()
    }
  }, positionCheckboxes:function(a) {
    var b = this.group.alignAttr, c, d = this.clipHeight || this.legendHeight;
    if(b) {
      c = b.translateY, n(this.allItems, function(e) {
        var f = e.checkbox, g;
        f && (g = c + f.y + (a || 0) + 3, L(f, {left:b.translateX + e.legendItemWidth + f.x - 20 + "px", top:g + "px", display:g > c - 6 && g < c + d - 6 ? "" : S}))
      })
    }
  }, renderTitle:function() {
    var a = this.padding, b = this.options.title, c = 0;
    if(b.text) {
      if(!this.title) {
        this.title = this.chart.renderer.label(b.text, a - 3, a - 4, null, null, null, null, null, "legend-title").attr({zIndex:1}).css(b.style).add(this.group)
      }
      c = this.title.getBBox().height;
      this.contentGroup.attr({translateY:c})
    }
    this.titleHeight = c
  }, renderItem:function(a) {
    var w;
    var b = this, c = b.chart, d = c.renderer, e = b.options, f = e.layout === "horizontal", g = e.symbolWidth, h = e.symbolPadding, i = b.itemStyle, j = b.itemHiddenStyle, k = b.padding, m = !e.rtl, l = e.width, p = e.itemMarginBottom || 0, s = b.itemMarginTop, o = b.initialItemX, n = a.legendItem, t = a.series || a, r = t.options, v = r.showCheckbox, u = e.useHTML;
    if(!n && (a.legendGroup = d.g("legend-item").attr({zIndex:1}).add(b.scrollGroup), t.drawLegendSymbol(b, a), a.legendItem = n = d.text(e.labelFormat ? wa(e.labelFormat, a) : e.labelFormatter.call(a), m ? g + h : -h, b.baseline, u).css(x(a.visible ? i : j)).attr({align:m ? "left" : "right", zIndex:2}).add(a.legendGroup), (u ? n : a.legendGroup).on("mouseover", function() {
      a.setState("hover");
      n.css(b.options.itemHoverStyle)
    }).on("mouseout", function() {
      n.css(a.visible ? i : j);
      a.setState()
    }).on("click", function(b) {
      var c = function() {
        a.setVisible()
      }, b = {browserEvent:b};
      a.firePointEvent ? a.firePointEvent("legendItemClick", b, c) : D(a, "legendItemClick", b, c)
    }), b.colorizeItem(a, a.visible), r && v)) {
      a.checkbox = U("input", {type:"checkbox", checked:a.selected, defaultChecked:a.selected}, e.itemCheckboxStyle, c.container), J(a.checkbox, "click", function(b) {
        D(a, "checkboxClick", {checked:b.target.checked}, function() {
          a.select()
        })
      })
    }
    d = n.getBBox();
    w = a.legendItemWidth = e.itemWidth || g + h + d.width + k + (v ? 20 : 0), e = w;
    b.itemHeight = g = d.height;
    if(f && b.itemX - o + e > (l || c.chartWidth - 2 * k - o)) {
      b.itemX = o, b.itemY += s + b.lastLineHeight + p, b.lastLineHeight = 0
    }
    b.maxItemWidth = q(b.maxItemWidth, e);
    b.lastItemY = s + b.itemY + p;
    b.lastLineHeight = q(g, b.lastLineHeight);
    a._legendItemPos = [b.itemX, b.itemY];
    f ? b.itemX += e : (b.itemY += s + g + p, b.lastLineHeight = g);
    b.offsetWidth = l || q(f ? b.itemX - o : e, b.offsetWidth)
  }, render:function() {
    var a = this, b = a.chart, c = b.renderer, d = a.group, e, f, g, h, i = a.box, j = a.options, k = a.padding, m = j.borderWidth, l = j.backgroundColor;
    a.itemX = a.initialItemX;
    a.itemY = a.initialItemY;
    a.offsetWidth = 0;
    a.lastItemY = 0;
    if(!d) {
      a.group = d = c.g("legend").attr({zIndex:7}).add(), a.contentGroup = c.g().attr({zIndex:1}).add(d), a.scrollGroup = c.g().add(a.contentGroup)
    }
    a.renderTitle();
    e = [];
    n(b.series, function(a) {
      var b = a.options;
      b.showInLegend && !r(b.linkedTo) && (e = e.concat(a.legendItems || (b.legendType === "point" ? a.data : a)))
    });
    Ib(e, function(a, b) {
      return(a.options && a.options.legendIndex || 0) - (b.options && b.options.legendIndex || 0)
    });
    j.reversed && e.reverse();
    a.allItems = e;
    a.display = f = !!e.length;
    n(e, function(b) {
      a.renderItem(b)
    });
    g = j.width || a.offsetWidth;
    h = a.lastItemY + a.lastLineHeight + a.titleHeight;
    h = a.handleOverflow(h);
    if(m || l) {
      g += k;
      h += k;
      if(i) {
        if(g > 0 && h > 0) {
          i[i.isNew ? "attr" : "animate"](i.crisp(null, null, null, g, h)), i.isNew = !1
        }
      }else {
        a.box = i = c.rect(0, 0, g, h, j.borderRadius, m || 0).attr({stroke:j.borderColor, "stroke-width":m || 0, fill:l || S}).add(d).shadow(j.shadow), i.isNew = !0
      }
      i[f ? "show" : "hide"]()
    }
    a.legendWidth = g;
    a.legendHeight = h;
    n(e, function(b) {
      a.positionItem(b)
    });
    f && d.align(v({width:g, height:h}, j), !0, "spacingBox");
    b.isResizing || this.positionCheckboxes()
  }, handleOverflow:function(a) {
    var b = this, c = this.chart, d = c.renderer, e = this.options, f = e.y, f = c.spacingBox.height + (e.verticalAlign === "top" ? -f : f) - this.padding, g = e.maxHeight, h = this.clipRect, i = e.navigation, j = o(i.animation, !0), k = i.arrowSize || 12, m = this.nav;
    e.layout === "horizontal" && (f /= 2);
    g && (f = K(f, g));
    if(a > f && !e.useHTML) {
      this.clipHeight = c = f - 20 - this.titleHeight;
      this.pageCount = ja(a / c);
      this.currentPage = o(this.currentPage, 1);
      this.fullHeight = a;
      if(!h) {
        h = b.clipRect = d.clipRect(0, 0, 9999, 0), b.contentGroup.clip(h)
      }
      h.attr({height:c});
      if(!m) {
        this.nav = m = d.g().attr({zIndex:1}).add(this.group), this.up = d.symbol("triangle", 0, 0, k, k).on("click", function() {
          b.scroll(-1, j)
        }).add(m), this.pager = d.text("", 15, 10).css(i.style).add(m), this.down = d.symbol("triangle-down", 0, 0, k, k).on("click", function() {
          b.scroll(1, j)
        }).add(m)
      }
      b.scroll(0);
      a = f
    }else {
      if(m) {
        h.attr({height:c.chartHeight}), m.hide(), this.scrollGroup.attr({translateY:1}), this.clipHeight = 0
      }
    }
    return a
  }, scroll:function(a, b) {
    var c = this.pageCount, d = this.currentPage + a, e = this.clipHeight, f = this.options.navigation, g = f.activeColor, h = f.inactiveColor, f = this.pager, i = this.padding;
    d > c && (d = c);
    if(d > 0) {
      b !== y && Ia(b, this.chart), this.nav.attr({translateX:i, translateY:e + 7 + this.titleHeight, visibility:"visible"}), this.up.attr({fill:d === 1 ? h : g}).css({cursor:d === 1 ? "default" : "pointer"}), f.attr({text:d + "/" + this.pageCount}), this.down.attr({x:18 + this.pager.getBBox().width, fill:d === c ? h : g}).css({cursor:d === c ? "default" : "pointer"}), e = -K(e * (d - 1), this.fullHeight - e + i) + 1, this.scrollGroup.animate({translateY:e}), f.attr({text:d + "/" + c}), this.currentPage = 
      d, this.positionCheckboxes(e)
    }
  }};
  tb.prototype = {init:function(a, b) {
    var c, d = a.series;
    a.series = null;
    c = x(N, a);
    c.series = a.series = d;
    var d = c.chart, e = d.margin, e = V(e) ? e : [e, e, e, e];
    this.optionsMarginTop = o(d.marginTop, e[0]);
    this.optionsMarginRight = o(d.marginRight, e[1]);
    this.optionsMarginBottom = o(d.marginBottom, e[2]);
    this.optionsMarginLeft = o(d.marginLeft, e[3]);
    this.runChartClick = (e = d.events) && !!e.click;
    this.bounds = {h:{}, v:{}};
    this.callback = b;
    this.isResizing = 0;
    this.options = c;
    this.axes = [];
    this.series = [];
    this.hasCartesianSeries = d.showAxes;
    var f = this, g;
    f.index = Ba.length;
    Ba.push(f);
    d.reflow !== !1 && J(f, "load", function() {
      f.initReflow()
    });
    if(e) {
      for(g in e) {
        J(f, g, e[g])
      }
    }
    f.xAxis = [];
    f.yAxis = [];
    f.animation = $ ? !1 : o(d.animation, !0);
    f.pointCount = 0;
    f.counters = new Hb;
    f.firstRender()
  }, initSeries:function(a) {
    var b = this.options.chart;
    (b = aa[a.type || b.type || b.defaultSeriesType]) || qa(17, !0);
    b = new b;
    b.init(this, a);
    return b
  }, addSeries:function(a, b, c) {
    var d, e = this;
    a && (b = o(b, !0), D(e, "addSeries", {options:a}, function() {
      d = e.initSeries(a);
      e.isDirtyLegend = !0;
      b && e.redraw(c)
    }));
    return d
  }, addAxis:function(a, b, c, d) {
    var b = b ? "xAxis" : "yAxis", e = this.options;
    new ab(this, x(a, {index:this[b].length}));
    e[b] = ha(e[b] || {});
    e[b].push(a);
    o(c, !0) && this.redraw(d)
  }, isInsidePlot:function(a, b, c) {
    var d = c ? b : a, a = c ? a : b;
    return d >= 0 && d <= this.plotWidth && a >= 0 && a <= this.plotHeight
  }, adjustTickAmounts:function() {
    this.options.chart.alignTicks !== !1 && n(this.axes, function(a) {
      a.adjustTickAmount()
    });
    this.maxTicks = null
  }, redraw:function(a) {
    var b = this.axes, c = this.series, d = this.pointer, e = this.legend, f = this.isDirtyLegend, g, h = this.isDirtyBox, i = c.length, j = i, k = this.renderer, m = k.isHidden(), l = [];
    Ia(a, this);
    for(m && this.cloneRenderTo();j--;) {
      if(a = c[j], a.isDirty && a.options.stacking) {
        g = !0;
        break
      }
    }
    if(g) {
      for(j = i;j--;) {
        if(a = c[j], a.options.stacking) {
          a.isDirty = !0
        }
      }
    }
    n(c, function(a) {
      a.isDirty && a.options.legendType === "point" && (f = !0)
    });
    if(f && e.options.enabled) {
      e.render(), this.isDirtyLegend = !1
    }
    if(this.hasCartesianSeries) {
      if(!this.isResizing) {
        this.maxTicks = null, n(b, function(a) {
          a.setScale()
        })
      }
      this.adjustTickAmounts();
      this.getMargins();
      n(b, function(a) {
        if(a.isDirtyExtremes) {
          a.isDirtyExtremes = !1, l.push(function() {
            D(a, "afterSetExtremes", a.getExtremes())
          })
        }
        if(a.isDirty || h || g) {
          a.redraw(), h = !0
        }
      })
    }
    h && this.drawChartBox();
    n(c, function(a) {
      a.isDirty && a.visible && (!a.isCartesian || a.xAxis) && a.redraw()
    });
    d && d.reset && d.reset(!0);
    k.draw();
    D(this, "redraw");
    m && this.cloneRenderTo(!0);
    n(l, function(a) {
      a.call()
    })
  }, showLoading:function(a) {
    var b = this.options, c = this.loadingDiv, d = b.loading;
    if(!c) {
      this.loadingDiv = c = U(ya, {className:"highcharts-loading"}, v(d.style, {zIndex:10, display:S}), this.container), this.loadingSpan = U("span", null, d.labelStyle, c)
    }
    this.loadingSpan.innerHTML = a || b.lang.loading;
    if(!this.loadingShown) {
      L(c, {opacity:0, display:"", left:this.plotLeft + "px", top:this.plotTop + "px", width:this.plotWidth + "px", height:this.plotHeight + "px"}), wb(c, {opacity:d.style.opacity}, {duration:d.showDuration || 0}), this.loadingShown = !0
    }
  }, hideLoading:function() {
    var a = this.options, b = this.loadingDiv;
    b && wb(b, {opacity:0}, {duration:a.loading.hideDuration || 100, complete:function() {
      L(b, {display:S})
    }});
    this.loadingShown = !1
  }, get:function(a) {
    var b = this.axes, c = this.series, d, e;
    for(d = 0;d < b.length;d++) {
      if(b[d].options.id === a) {
        return b[d]
      }
    }
    for(d = 0;d < c.length;d++) {
      if(c[d].options.id === a) {
        return c[d]
      }
    }
    for(d = 0;d < c.length;d++) {
      e = c[d].points || [];
      for(b = 0;b < e.length;b++) {
        if(e[b].id === a) {
          return e[b]
        }
      }
    }
    return null
  }, getAxes:function() {
    var a = this, b = this.options, c = b.xAxis = ha(b.xAxis || {}), b = b.yAxis = ha(b.yAxis || {});
    n(c, function(a, b) {
      a.index = b;
      a.isX = !0
    });
    n(b, function(a, b) {
      a.index = b
    });
    c = c.concat(b);
    n(c, function(b) {
      new ab(a, b)
    });
    a.adjustTickAmounts()
  }, getSelectedPoints:function() {
    var a = [];
    n(this.series, function(b) {
      a = a.concat(ob(b.points || [], function(a) {
        return a.selected
      }))
    });
    return a
  }, getSelectedSeries:function() {
    return ob(this.series, function(a) {
      return a.selected
    })
  }, showResetZoom:function() {
    var a = this, b = N.lang, c = a.options.chart.resetZoomButton, d = c.theme, e = d.states, f = c.relativeTo === "chart" ? null : "plotBox";
    this.resetZoomButton = a.renderer.button(b.resetZoom, null, null, function() {
      a.zoomOut()
    }, d, e && e.hover).attr({align:c.position.align, title:b.resetZoomTitle}).add().align(c.position, !1, f)
  }, zoomOut:function() {
    var a = this;
    D(a, "selection", {resetSelection:!0}, function() {
      a.zoom()
    })
  }, zoom:function(a) {
    var b, c = this.pointer, d = !1, e;
    !a || a.resetSelection ? n(this.axes, function(a) {
      b = a.zoom()
    }) : n(a.xAxis.concat(a.yAxis), function(a) {
      var e = a.axis, h = e.isXAxis;
      if(c[h ? "zoomX" : "zoomY"] || c[h ? "pinchX" : "pinchY"]) {
        b = e.zoom(a.min, a.max), e.displayBtn && (d = !0)
      }
    });
    e = this.resetZoomButton;
    if(d && !e) {
      this.showResetZoom()
    }else {
      if(!d && V(e)) {
        this.resetZoomButton = e.destroy()
      }
    }
    b && this.redraw(o(this.options.chart.animation, a && a.animation, this.pointCount < 100))
  }, pan:function(a) {
    var b = this.xAxis[0], c = this.mouseDownX, d = b.pointRange / 2, e = b.getExtremes(), f = b.translate(c - a, !0) + d, c = b.translate(c + this.plotWidth - a, !0) - d;
    (d = this.hoverPoints) && n(d, function(a) {
      a.setState()
    });
    b.series.length && f > K(e.dataMin, e.min) && c < q(e.dataMax, e.max) && b.setExtremes(f, c, !0, !1, {trigger:"pan"});
    this.mouseDownX = a;
    L(this.container, {cursor:"move"})
  }, setTitle:function(a, b) {
    var f;
    var c = this, d = c.options, e;
    e = d.title = x(d.title, a);
    f = d.subtitle = x(d.subtitle, b), d = f;
    n([["title", a, e], ["subtitle", b, d]], function(a) {
      var b = a[0], d = c[b], e = a[1], a = a[2];
      d && e && (c[b] = d = d.destroy());
      a && a.text && !d && (c[b] = c.renderer.text(a.text, 0, 0, a.useHTML).attr({align:a.align, "class":"highcharts-" + b, zIndex:a.zIndex || 4}).css(a.style).add().align(a, !1, "spacingBox"))
    })
  }, getChartSize:function() {
    var a = this.options.chart, b = this.renderToClone || this.renderTo;
    this.containerWidth = gb(b, "width");
    this.containerHeight = gb(b, "height");
    this.chartWidth = q(0, a.width || this.containerWidth || 600);
    this.chartHeight = q(0, o(a.height, this.containerHeight > 19 ? this.containerHeight : 400))
  }, cloneRenderTo:function(a) {
    var b = this.renderToClone, c = this.container;
    a ? b && (this.renderTo.appendChild(c), Ra(b), delete this.renderToClone) : (c && this.renderTo.removeChild(c), this.renderToClone = b = this.renderTo.cloneNode(0), L(b, {position:"absolute", top:"-9999px", display:"block"}), z.body.appendChild(b), c && b.appendChild(c))
  }, getContainer:function() {
    var a, b = this.options.chart, c, d, e;
    this.renderTo = a = b.renderTo;
    e = "highcharts-" + ub++;
    if(fa(a)) {
      this.renderTo = a = z.getElementById(a)
    }
    a || qa(13, !0);
    c = u(A(a, "data-highcharts-chart"));
    !isNaN(c) && Ba[c] && Ba[c].destroy();
    A(a, "data-highcharts-chart", this.index);
    a.innerHTML = "";
    a.offsetWidth || this.cloneRenderTo();
    this.getChartSize();
    c = this.chartWidth;
    d = this.chartHeight;
    this.container = a = U(ya, {className:"highcharts-container" + (b.className ? " " + b.className : ""), id:e}, v({position:"relative", overflow:"hidden", width:c + "px", height:d + "px", textAlign:"left", lineHeight:"normal", zIndex:0, "-webkit-tap-highlight-color":"rgba(0,0,0,0)"}, b.style), this.renderToClone || a);
    this._cursor = a.style.cursor;
    this.renderer = b.forExport ? new Ca(a, c, d, !0) : new Sa(a, c, d);
    $ && this.renderer.create(this, a, c, d)
  }, getMargins:function() {
    var a = this.options.chart, b = a.spacingTop, c = a.spacingRight, d = a.spacingBottom, a = a.spacingLeft, e, f = this.legend, g = this.optionsMarginTop, h = this.optionsMarginLeft, i = this.optionsMarginRight, j = this.optionsMarginBottom, k = this.options.title, m = this.options.subtitle, l = this.options.legend, p = o(l.margin, 10), s = l.x, t = l.y, B = l.align, w = l.verticalAlign;
    this.resetMargins();
    e = this.axisOffset;
    if((this.title || this.subtitle) && !r(this.optionsMarginTop)) {
      if(m = q(this.title && !k.floating && !k.verticalAlign && k.y || 0, this.subtitle && !m.floating && !m.verticalAlign && m.y || 0)) {
        this.plotTop = q(this.plotTop, m + o(k.margin, 15) + b)
      }
    }
    if(f.display && !l.floating) {
      if(B === "right") {
        if(!r(i)) {
          this.marginRight = q(this.marginRight, f.legendWidth - s + p + c)
        }
      }else {
        if(B === "left") {
          if(!r(h)) {
            this.plotLeft = q(this.plotLeft, f.legendWidth + s + p + a)
          }
        }else {
          if(w === "top") {
            if(!r(g)) {
              this.plotTop = q(this.plotTop, f.legendHeight + t + p + b)
            }
          }else {
            if(w === "bottom" && !r(j)) {
              this.marginBottom = q(this.marginBottom, f.legendHeight - t + p + d)
            }
          }
        }
      }
    }
    this.extraBottomMargin && (this.marginBottom += this.extraBottomMargin);
    this.extraTopMargin && (this.plotTop += this.extraTopMargin);
    this.hasCartesianSeries && n(this.axes, function(a) {
      a.getOffset()
    });
    r(h) || (this.plotLeft += e[3]);
    r(g) || (this.plotTop += e[0]);
    r(j) || (this.marginBottom += e[2]);
    r(i) || (this.marginRight += e[1]);
    this.setChartSize()
  }, initReflow:function() {
    function a(a) {
      var g = c.width || gb(d, "width"), h = c.height || gb(d, "height"), a = a ? a.target : O;
      if(!b.hasUserSize && g && h && (a === O || a === z)) {
        if(g !== b.containerWidth || h !== b.containerHeight) {
          clearTimeout(e), b.reflowTimeout = e = setTimeout(function() {
            if(b.container) {
              b.setSize(g, h, !1), b.hasUserSize = null
            }
          }, 100)
        }
        b.containerWidth = g;
        b.containerHeight = h
      }
    }
    var b = this, c = b.options.chart, d = b.renderTo, e;
    J(O, "resize", a);
    J(b, "destroy", function() {
      ba(O, "resize", a)
    })
  }, setSize:function(a, b, c) {
    var d = this, e, f, g;
    d.isResizing += 1;
    g = function() {
      d && D(d, "endResize", null, function() {
        d.isResizing -= 1
      })
    };
    Ia(c, d);
    d.oldChartHeight = d.chartHeight;
    d.oldChartWidth = d.chartWidth;
    if(r(a)) {
      d.chartWidth = e = q(0, t(a)), d.hasUserSize = !!e
    }
    if(r(b)) {
      d.chartHeight = f = q(0, t(b))
    }
    L(d.container, {width:e + "px", height:f + "px"});
    d.setChartSize(!0);
    d.renderer.setSize(e, f, c);
    d.maxTicks = null;
    n(d.axes, function(a) {
      a.isDirty = !0;
      a.setScale()
    });
    n(d.series, function(a) {
      a.isDirty = !0
    });
    d.isDirtyLegend = !0;
    d.isDirtyBox = !0;
    d.getMargins();
    d.redraw(c);
    d.oldChartHeight = null;
    D(d, "resize");
    za === !1 ? g() : setTimeout(g, za && za.duration || 500)
  }, setChartSize:function(a) {
    var b = this.inverted, c = this.renderer, d = this.chartWidth, e = this.chartHeight, f = this.options.chart, g = f.spacingTop, h = f.spacingRight, i = f.spacingBottom, j = f.spacingLeft, k = this.clipOffset, m, l, p, o;
    this.plotLeft = m = t(this.plotLeft);
    this.plotTop = l = t(this.plotTop);
    this.plotWidth = p = q(0, t(d - m - this.marginRight));
    this.plotHeight = o = q(0, t(e - l - this.marginBottom));
    this.plotSizeX = b ? o : p;
    this.plotSizeY = b ? p : o;
    this.plotBorderWidth = b = f.plotBorderWidth || 0;
    this.spacingBox = c.spacingBox = {x:j, y:g, width:d - j - h, height:e - g - i};
    this.plotBox = c.plotBox = {x:m, y:l, width:p, height:o};
    c = ja(q(b, k[3]) / 2);
    d = ja(q(b, k[0]) / 2);
    this.clipBox = {x:c, y:d, width:T(this.plotSizeX - q(b, k[1]) / 2 - c), height:T(this.plotSizeY - q(b, k[2]) / 2 - d)};
    a || n(this.axes, function(a) {
      a.setAxisSize();
      a.setAxisTranslation()
    })
  }, resetMargins:function() {
    var a = this.options.chart, b = a.spacingRight, c = a.spacingBottom, d = a.spacingLeft;
    this.plotTop = o(this.optionsMarginTop, a.spacingTop);
    this.marginRight = o(this.optionsMarginRight, b);
    this.marginBottom = o(this.optionsMarginBottom, c);
    this.plotLeft = o(this.optionsMarginLeft, d);
    this.axisOffset = [0, 0, 0, 0];
    this.clipOffset = [0, 0, 0, 0]
  }, drawChartBox:function() {
    var a = this.options.chart, b = this.renderer, c = this.chartWidth, d = this.chartHeight, e = this.chartBackground, f = this.plotBackground, g = this.plotBorder, h = this.plotBGImage, i = a.borderWidth || 0, j = a.backgroundColor, k = a.plotBackgroundColor, m = a.plotBackgroundImage, l = a.plotBorderWidth || 0, p, o = this.plotLeft, n = this.plotTop, t = this.plotWidth, q = this.plotHeight, r = this.plotBox, v = this.clipRect, u = this.clipBox;
    p = i + (a.shadow ? 8 : 0);
    if(i || j) {
      if(e) {
        e.animate(e.crisp(null, null, null, c - p, d - p))
      }else {
        e = {fill:j || S};
        if(i) {
          e.stroke = a.borderColor, e["stroke-width"] = i
        }
        this.chartBackground = b.rect(p / 2, p / 2, c - p, d - p, a.borderRadius, i).attr(e).add().shadow(a.shadow)
      }
    }
    if(k) {
      f ? f.animate(r) : this.plotBackground = b.rect(o, n, t, q, 0).attr({fill:k}).add().shadow(a.plotShadow)
    }
    if(m) {
      h ? h.animate(r) : this.plotBGImage = b.image(m, o, n, t, q).add()
    }
    v ? v.animate({width:u.width, height:u.height}) : this.clipRect = b.clipRect(u);
    if(l) {
      g ? g.animate(g.crisp(null, o, n, t, q)) : this.plotBorder = b.rect(o, n, t, q, 0, l).attr({stroke:a.plotBorderColor, "stroke-width":l, zIndex:1}).add()
    }
    this.isDirtyBox = !1
  }, propFromSeries:function() {
    var a = this, b = a.options.chart, c, d = a.options.series, e, f;
    n(["inverted", "angular", "polar"], function(g) {
      c = aa[b.type || b.defaultSeriesType];
      f = a[g] || b[g] || c && c.prototype[g];
      for(e = d && d.length;!f && e--;) {
        (c = aa[d[e].type]) && c.prototype[g] && (f = !0)
      }
      a[g] = f
    })
  }, render:function() {
    var a = this, b = a.axes, c = a.renderer, d = a.options, e = d.labels, f = d.credits, g;
    a.setTitle();
    a.legend = new sb(a, d.legend);
    n(b, function(a) {
      a.setScale()
    });
    a.getMargins();
    a.maxTicks = null;
    n(b, function(a) {
      a.setTickPositions(!0);
      a.setMaxTicks()
    });
    a.adjustTickAmounts();
    a.getMargins();
    a.drawChartBox();
    a.hasCartesianSeries && n(b, function(a) {
      a.render()
    });
    if(!a.seriesGroup) {
      a.seriesGroup = c.g("series-group").attr({zIndex:3}).add()
    }
    n(a.series, function(a) {
      a.translate();
      a.setTooltipPoints();
      a.render()
    });
    e.items && n(e.items, function(b) {
      var d = v(e.style, b.style), f = u(d.left) + a.plotLeft, g = u(d.top) + a.plotTop + 12;
      delete d.left;
      delete d.top;
      c.text(b.html, f, g).attr({zIndex:2}).css(d).add()
    });
    if(f.enabled && !a.credits) {
      g = f.href, a.credits = c.text(f.text, 0, 0).on("click", function() {
        if(g) {
          location.href = g
        }
      }).attr({align:f.position.align, zIndex:8}).css(f.style).add().align(f.position)
    }
    a.hasRendered = !0
  }, destroy:function() {
    var a = this, b = a.axes, c = a.series, d = a.container, e, f = d && d.parentNode;
    D(a, "destroy");
    Ba[a.index] = y;
    a.renderTo.removeAttribute("data-highcharts-chart");
    ba(a);
    for(e = b.length;e--;) {
      b[e] = b[e].destroy()
    }
    for(e = c.length;e--;) {
      c[e] = c[e].destroy()
    }
    n("title,subtitle,chartBackground,plotBackground,plotBGImage,plotBorder,seriesGroup,clipRect,credits,pointer,scroller,rangeSelector,legend,resetZoomButton,tooltip,renderer".split(","), function(b) {
      var c = a[b];
      c && c.destroy && (a[b] = c.destroy())
    });
    if(d) {
      d.innerHTML = "", ba(d), f && Ra(d)
    }
    for(e in a) {
      delete a[e]
    }
  }, isReadyToRender:function() {
    var a = this;
    return!Z && O == O.top && z.readyState !== "complete" || $ && !O.canvg ? ($ ? Rb.push(function() {
      a.firstRender()
    }, a.options.global.canvasToolsURL) : z.attachEvent("onreadystatechange", function() {
      z.detachEvent("onreadystatechange", a.firstRender);
      z.readyState === "complete" && a.firstRender()
    }), !1) : !0
  }, firstRender:function() {
    var a = this, b = a.options, c = a.callback;
    if(a.isReadyToRender()) {
      a.getContainer(), D(a, "init"), a.resetMargins(), a.setChartSize(), a.propFromSeries(), a.getAxes(), n(b.series || [], function(b) {
        a.initSeries(b)
      }), D(a, "beforeRender"), a.pointer = new rb(a, b), a.render(), a.renderer.draw(), c && c.apply(a, [a]), n(a.callbacks, function(b) {
        b.apply(a, [a])
      }), a.cloneRenderTo(!0), D(a, "load")
    }
  }};
  tb.prototype.callbacks = [];
  var Na = function() {
  };
  Na.prototype = {init:function(a, b, c) {
    this.series = a;
    this.applyOptions(b, c);
    this.pointAttr = {};
    if(a.options.colorByPoint && (b = a.options.colors || a.chart.options.colors, this.color = this.color || b[a.colorCounter++], a.colorCounter === b.length)) {
      a.colorCounter = 0
    }
    a.chart.pointCount++;
    return this
  }, applyOptions:function(a, b) {
    var c = this.series, d = c.pointValKey, a = Na.prototype.optionsToObject.call(this, a);
    v(this, a);
    this.options = this.options ? v(this.options, a) : a;
    if(d) {
      this.y = this[d]
    }
    if(this.x === y && c) {
      this.x = b === y ? c.autoIncrement() : b
    }
    return this
  }, optionsToObject:function(a) {
    var b, c = this.series, d = c.pointArrayMap || ["y"], e = d.length, f = 0, g = 0;
    if(typeof a === "number" || a === null) {
      b = {y:a}
    }else {
      if(Da(a)) {
        b = {};
        if(a.length > e) {
          c = typeof a[0];
          if(c === "string") {
            b.name = a[0]
          }else {
            if(c === "number") {
              b.x = a[0]
            }
          }
          f++
        }
        for(;g < e;) {
          b[d[g++]] = a[f++]
        }
      }else {
        if(typeof a === "object") {
          b = a;
          if(a.dataLabels) {
            c._hasPointLabels = !0
          }
          if(a.marker) {
            c._hasPointMarkers = !0
          }
        }
      }
    }
    return b
  }, destroy:function() {
    var a = this.series.chart, b = a.hoverPoints, c;
    a.pointCount--;
    if(b && (this.setState(), ga(b, this), !b.length)) {
      a.hoverPoints = null
    }
    if(this === a.hoverPoint) {
      this.onMouseOut()
    }
    if(this.graphic || this.dataLabel) {
      ba(this), this.destroyElements()
    }
    this.legendItem && a.legend.destroyItem(this);
    for(c in this) {
      this[c] = null
    }
  }, destroyElements:function() {
    for(var a = "graphic,dataLabel,dataLabelUpper,group,connector,shadowGroup".split(","), b, c = 6;c--;) {
      b = a[c], this[b] && (this[b] = this[b].destroy())
    }
  }, getLabelConfig:function() {
    return{x:this.category, y:this.y, key:this.name || this.category, series:this.series, point:this, percentage:this.percentage, total:this.total || this.stackTotal}
  }, select:function(a, b) {
    var c = this, d = c.series, e = d.chart, a = o(a, !c.selected);
    c.firePointEvent(a ? "select" : "unselect", {accumulate:b}, function() {
      c.selected = c.options.selected = a;
      d.options.data[la(c, d.data)] = c.options;
      c.setState(a && "select");
      b || n(e.getSelectedPoints(), function(a) {
        if(a.selected && a !== c) {
          a.selected = a.options.selected = !1, d.options.data[la(a, d.data)] = a.options, a.setState(""), a.firePointEvent("unselect")
        }
      })
    })
  }, onMouseOver:function(a) {
    var b = this.series, c = b.chart, d = c.tooltip, e = c.hoverPoint;
    if(e && e !== this) {
      e.onMouseOut()
    }
    this.firePointEvent("mouseOver");
    d && (!d.shared || b.noSharedTooltip) && d.refresh(this, a);
    this.setState("hover");
    c.hoverPoint = this
  }, onMouseOut:function() {
    var a = this.series.chart, b = a.hoverPoints;
    if(!b || la(this, b) === -1) {
      this.firePointEvent("mouseOut"), this.setState(), a.hoverPoint = null
    }
  }, tooltipFormatter:function(a) {
    var b = this.series, c = b.tooltipOptions, d = o(c.valueDecimals, ""), e = c.valuePrefix || "", f = c.valueSuffix || "";
    n(b.pointArrayMap || ["y"], function(b) {
      b = "{point." + b;
      if(e || f) {
        a = a.replace(b + "}", e + b + "}" + f)
      }
      a = a.replace(b + "}", b + ":,." + d + "f}")
    });
    return wa(a, {point:this, series:this.series})
  }, update:function(a, b, c) {
    var d = this, e = d.series, f = d.graphic, g, h = e.data, i = e.chart, b = o(b, !0);
    d.firePointEvent("update", {options:a}, function() {
      d.applyOptions(a);
      V(a) && (e.getAttribs(), f && f.attr(d.pointAttr[e.state]));
      g = la(d, h);
      e.xData[g] = d.x;
      e.yData[g] = e.toYData ? e.toYData(d) : d.y;
      e.zData[g] = d.z;
      e.options.data[g] = d.options;
      e.isDirty = !0;
      e.isDirtyData = !0;
      b && i.redraw(c)
    })
  }, remove:function(a, b) {
    var c = this, d = c.series, e = d.chart, f, g = d.data;
    Ia(b, e);
    a = o(a, !0);
    c.firePointEvent("remove", null, function() {
      f = la(c, g);
      g.splice(f, 1);
      d.options.data.splice(f, 1);
      d.xData.splice(f, 1);
      d.yData.splice(f, 1);
      d.zData.splice(f, 1);
      c.destroy();
      d.isDirty = !0;
      d.isDirtyData = !0;
      a && e.redraw()
    })
  }, firePointEvent:function(a, b, c) {
    var d = this, e = this.series.options;
    (e.point.events[a] || d.options && d.options.events && d.options.events[a]) && this.importEvents();
    a === "click" && e.allowPointSelect && (c = function(a) {
      d.select(null, a.ctrlKey || a.metaKey || a.shiftKey)
    });
    D(this, a, b, c)
  }, importEvents:function() {
    if(!this.hasImportedEvents) {
      var a = x(this.series.options.point, this.options).events, b;
      this.events = a;
      for(b in a) {
        J(this, b, a[b])
      }
      this.hasImportedEvents = !0
    }
  }, setState:function(a) {
    var b = this.plotX, c = this.plotY, d = this.series, e = d.options.states, f = X[d.type].marker && d.options.marker, g = f && !f.enabled, h = f && f.states[a], i = h && h.enabled === !1, j = d.stateMarkerGraphic, k = this.marker || {}, m = d.chart, l = this.pointAttr, a = a || "";
    if(!(a === this.state || this.selected && a !== "select" || e[a] && e[a].enabled === !1 || a && (i || g && !h.enabled))) {
      if(this.graphic) {
        e = f && this.graphic.symbolName && l[a].r, this.graphic.attr(x(l[a], e ? {x:b - e, y:c - e, width:2 * e, height:2 * e} : {}))
      }else {
        if(a && h) {
          e = h.radius, k = k.symbol || d.symbol, j && j.currentSymbol !== k && (j = j.destroy()), j ? j.attr({x:b - e, y:c - e}) : (d.stateMarkerGraphic = j = m.renderer.symbol(k, b - e, c - e, 2 * e, 2 * e).attr(l[a]).add(d.markerGroup), j.currentSymbol = k)
        }
        if(j) {
          j[a && m.isInsidePlot(b, c) ? "show" : "hide"]()
        }
      }
      this.state = a
    }
  }};
  var R = function() {
  };
  R.prototype = {isCartesian:!0, type:"line", pointClass:Na, sorted:!0, requireSorting:!0, pointAttrToOptions:{stroke:"lineColor", "stroke-width":"lineWidth", fill:"fillColor", r:"radius"}, colorCounter:0, init:function(a, b) {
    var c, d, e = a.series;
    this.chart = a;
    this.options = b = this.setOptions(b);
    this.bindAxes();
    v(this, {name:b.name, state:"", pointAttr:{}, visible:b.visible !== !1, selected:b.selected === !0});
    if($) {
      b.animation = !1
    }
    d = b.events;
    for(c in d) {
      J(this, c, d[c])
    }
    if(d && d.click || b.point && b.point.events && b.point.events.click || b.allowPointSelect) {
      a.runTrackerClick = !0
    }
    this.getColor();
    this.getSymbol();
    this.setData(b.data, !1);
    if(this.isCartesian) {
      a.hasCartesianSeries = !0
    }
    e.push(this);
    this._i = e.length - 1;
    Ib(e, function(a, b) {
      return o(a.options.index, a._i) - o(b.options.index, a._i)
    });
    n(e, function(a, b) {
      a.index = b;
      a.name = a.name || "Series " + (b + 1)
    });
    c = b.linkedTo;
    this.linkedSeries = [];
    if(fa(c) && (c = c === ":previous" ? e[this.index - 1] : a.get(c))) {
      c.linkedSeries.push(this), this.linkedParent = c
    }
  }, bindAxes:function() {
    var a = this, b = a.options, c = a.chart, d;
    a.isCartesian && n(["xAxis", "yAxis"], function(e) {
      n(c[e], function(c) {
        d = c.options;
        if(b[e] === d.index || b[e] !== y && b[e] === d.id || b[e] === y && d.index === 0) {
          c.series.push(a), a[e] = c, c.isDirty = !0
        }
      });
      a[e] || qa(18, !0)
    })
  }, autoIncrement:function() {
    var a = this.options, b = this.xIncrement, b = o(b, a.pointStart, 0);
    this.pointInterval = o(this.pointInterval, a.pointInterval, 1);
    this.xIncrement = b + this.pointInterval;
    return b
  }, getSegments:function() {
    var a = -1, b = [], c, d = this.points, e = d.length;
    if(e) {
      if(this.options.connectNulls) {
        for(c = e;c--;) {
          d[c].y === null && d.splice(c, 1)
        }
        d.length && (b = [d])
      }else {
        n(d, function(c, g) {
          c.y === null ? (g > a + 1 && b.push(d.slice(a + 1, g)), a = g) : g === e - 1 && b.push(d.slice(a + 1, g + 1))
        })
      }
    }
    this.segments = b
  }, setOptions:function(a) {
    var b = this.chart.options, c = b.plotOptions, d = c[this.type];
    this.userOptions = a;
    a = x(d, c.series, a);
    this.tooltipOptions = x(b.tooltip, a.tooltip);
    d.marker === null && delete a.marker;
    return a
  }, getColor:function() {
    var a = this.options, b = this.userOptions, c = this.chart.options.colors, d = this.chart.counters, e;
    e = a.color || X[this.type].color;
    if(!e && !a.colorByPoint) {
      r(b._colorIndex) ? a = b._colorIndex : (b._colorIndex = d.color, a = d.color++), e = c[a]
    }
    this.color = e;
    d.wrapColor(c.length)
  }, getSymbol:function() {
    var a = this.userOptions, b = this.options.marker, c = this.chart, d = c.options.symbols, c = c.counters;
    this.symbol = b.symbol;
    if(!this.symbol) {
      r(a._symbolIndex) ? a = a._symbolIndex : (a._symbolIndex = c.symbol, a = c.symbol++), this.symbol = d[a]
    }
    if(/^url/.test(this.symbol)) {
      b.radius = 0
    }
    c.wrapSymbol(d.length)
  }, drawLegendSymbol:function(a) {
    var b = this.options, c = b.marker, d = a.options.symbolWidth, e = this.chart.renderer, f = this.legendGroup, a = a.baseline, g;
    if(b.lineWidth) {
      g = {"stroke-width":b.lineWidth};
      if(b.dashStyle) {
        g.dashstyle = b.dashStyle
      }
      this.legendLine = e.path(["M", 0, a - 4, "L", d, a - 4]).attr(g).add(f)
    }
    if(c && c.enabled) {
      b = c.radius, this.legendSymbol = e.symbol(this.symbol, d / 2 - b, a - 4 - b, 2 * b, 2 * b).add(f)
    }
  }, addPoint:function(a, b, c, d) {
    var e = this.options, f = this.data, g = this.graph, h = this.area, i = this.chart, j = this.xData, k = this.yData, m = this.zData, l = this.names, p = g && g.shift || 0, n = e.data;
    Ia(d, i);
    if(g && c) {
      g.shift = p + 1
    }
    if(h) {
      if(c) {
        h.shift = p + 1
      }
      h.isArea = !0
    }
    b = o(b, !0);
    d = {series:this};
    this.pointClass.prototype.applyOptions.apply(d, [a]);
    j.push(d.x);
    k.push(this.toYData ? this.toYData(d) : d.y);
    m.push(d.z);
    if(l) {
      l[d.x] = d.name
    }
    n.push(a);
    e.legendType === "point" && this.generatePoints();
    c && (f[0] && f[0].remove ? f[0].remove(!1) : (f.shift(), j.shift(), k.shift(), m.shift(), n.shift()));
    this.getAttribs();
    this.isDirtyData = this.isDirty = !0;
    b && i.redraw()
  }, setData:function(a, b) {
    var c = this.points, d = this.options, e = this.chart, f = null, g = this.xAxis, h = g && g.categories && !g.categories.length ? [] : null, i;
    this.xIncrement = null;
    this.pointRange = g && g.categories ? 1 : d.pointRange;
    this.colorCounter = 0;
    var j = [], k = [], m = [], l = a ? a.length : [], p = (i = this.pointArrayMap) && i.length, n = !!this.toYData;
    if(l > (d.turboThreshold || 1E3)) {
      for(i = 0;f === null && i < l;) {
        f = a[i], i++
      }
      if(Ea(f)) {
        f = o(d.pointStart, 0);
        d = o(d.pointInterval, 1);
        for(i = 0;i < l;i++) {
          j[i] = f, k[i] = a[i], f += d
        }
        this.xIncrement = f
      }else {
        if(Da(f)) {
          if(p) {
            for(i = 0;i < l;i++) {
              d = a[i], j[i] = d[0], k[i] = d.slice(1, p + 1)
            }
          }else {
            for(i = 0;i < l;i++) {
              d = a[i], j[i] = d[0], k[i] = d[1]
            }
          }
        }
      }
    }else {
      for(i = 0;i < l;i++) {
        if(a[i] !== y && (d = {series:this}, this.pointClass.prototype.applyOptions.apply(d, [a[i]]), j[i] = d.x, k[i] = n ? this.toYData(d) : d.y, m[i] = d.z, h && d.name)) {
          h[i] = d.name
        }
      }
    }
    this.requireSorting && j.length > 1 && j[1] < j[0] && qa(15);
    fa(k[0]) && qa(14, !0);
    this.data = [];
    this.options.data = a;
    this.xData = j;
    this.yData = k;
    this.zData = m;
    this.names = h;
    for(i = c && c.length || 0;i--;) {
      c[i] && c[i].destroy && c[i].destroy()
    }
    if(g) {
      g.minRange = g.userMinRange
    }
    this.isDirty = this.isDirtyData = e.isDirtyBox = !0;
    o(b, !0) && e.redraw(!1)
  }, remove:function(a, b) {
    var c = this, d = c.chart, a = o(a, !0);
    if(!c.isRemoving) {
      c.isRemoving = !0, D(c, "remove", null, function() {
        c.destroy();
        d.isDirtyLegend = d.isDirtyBox = !0;
        a && d.redraw(b)
      })
    }
    c.isRemoving = !1
  }, processData:function(a) {
    var b = this.xData, c = this.yData, d = b.length, e = 0, f = d, g, h, i = this.xAxis, j = this.options, k = j.cropThreshold, m = this.isCartesian;
    if(m && !this.isDirty && !i.isDirty && !this.yAxis.isDirty && !a) {
      return!1
    }
    if(m && this.sorted && (!k || d > k || this.forceCrop)) {
      if(a = i.getExtremes(), i = a.min, k = a.max, b[d - 1] < i || b[0] > k) {
        b = [], c = []
      }else {
        if(b[0] < i || b[d - 1] > k) {
          for(a = 0;a < d;a++) {
            if(b[a] >= i) {
              e = q(0, a - 1);
              break
            }
          }
          for(;a < d;a++) {
            if(b[a] > k) {
              f = a + 1;
              break
            }
          }
          b = b.slice(e, f);
          c = c.slice(e, f);
          g = !0
        }
      }
    }
    for(a = b.length - 1;a > 0;a--) {
      if(d = b[a] - b[a - 1], d > 0 && (h === y || d < h)) {
        h = d
      }
    }
    this.cropped = g;
    this.cropStart = e;
    this.processedXData = b;
    this.processedYData = c;
    if(j.pointRange === null) {
      this.pointRange = h || 1
    }
    this.closestPointRange = h
  }, generatePoints:function() {
    var a = this.options.data, b = this.data, c, d = this.processedXData, e = this.processedYData, f = this.pointClass, g = d.length, h = this.cropStart || 0, i, j = this.hasGroupedData, k, m = [], l;
    if(!b && !j) {
      b = [], b.length = a.length, b = this.data = b
    }
    for(l = 0;l < g;l++) {
      i = h + l, j ? m[l] = (new f).init(this, [d[l]].concat(ha(e[l]))) : (b[i] ? k = b[i] : a[i] !== y && (b[i] = k = (new f).init(this, a[i], d[l])), m[l] = k)
    }
    if(b && (g !== (c = b.length) || j)) {
      for(l = 0;l < c;l++) {
        if(l === h && !j && (l += g), b[l]) {
          b[l].destroyElements(), b[l].plotX = y
        }
      }
    }
    this.data = b;
    this.points = m
  }, translate:function() {
    this.processedXData || this.processData();
    this.generatePoints();
    var a = this.options, b = a.stacking, c = this.xAxis, d = c.categories, e = this.yAxis, f = this.points, g = f.length, h = !!this.modifyValue, i, j, k = a.pointPlacement === "between", m = a.threshold;
    j = e.series.sort(function(a, b) {
      return a.index - b.index
    });
    for(a = j.length;a--;) {
      if(j[a].visible) {
        j[a] === this && (i = !0);
        break
      }
    }
    for(a = 0;a < g;a++) {
      j = f[a];
      var l = j.x, p = j.y, n = j.low, q = e.stacks[(p < m ? "-" : "") + this.stackKey];
      if(e.isLog && p <= 0) {
        j.y = p = null
      }
      j.plotX = c.translate(l, 0, 0, 0, 1, k);
      if(b && this.visible && q && q[l]) {
        n = q[l], q = n.total, n.cum = n = n.cum - p, p = n + p, i && (n = o(m, e.min)), e.isLog && n <= 0 && (n = null), b === "percent" && (n = q ? n * 100 / q : 0, p = q ? p * 100 / q : 0), j.percentage = q ? j.y * 100 / q : 0, j.total = j.stackTotal = q, j.stackY = p
      }
      j.yBottom = r(n) ? e.translate(n, 0, 1, 0, 1) : null;
      h && (p = this.modifyValue(p, j));
      j.plotY = typeof p === "number" && p !== Infinity ? t(e.translate(p, 0, 1, 0, 1) * 10) / 10 : y;
      j.clientX = k ? c.translate(l, 0, 0, 0, 1) : j.plotX;
      j.negative = j.y < (m || 0);
      j.category = d && d[j.x] !== y ? d[j.x] : j.x
    }
    this.getSegments()
  }, setTooltipPoints:function(a) {
    var b = [], c, d, e = (c = this.xAxis) ? c.tooltipLen || c.len : this.chart.plotSizeX, f, g, h = [];
    if(this.options.enableMouseTracking !== !1) {
      if(a) {
        this.tooltipPoints = null
      }
      n(this.segments || this.points, function(a) {
        b = b.concat(a)
      });
      c && c.reversed && (b = b.reverse());
      a = b.length;
      for(g = 0;g < a;g++) {
        f = b[g];
        c = b[g - 1] ? d + 1 : 0;
        for(d = b[g + 1] ? q(0, T((f.clientX + (b[g + 1] ? b[g + 1].clientX : e)) / 2)) : e;c >= 0 && c <= d;) {
          h[c++] = f
        }
      }
      this.tooltipPoints = h
    }
  }, tooltipHeaderFormatter:function(a) {
    var b = this.tooltipOptions, c = b.xDateFormat, d = b.dateTimeLabelFormats, e = this.xAxis, f = e && e.options.type === "datetime", b = b.headerFormat, e = e && e.closestPointRange, g;
    if(f && !c) {
      if(e) {
        for(g in E) {
          if(E[g] >= e) {
            c = d[g];
            break
          }
        }
      }else {
        c = d.day
      }
    }
    f && c && Ea(a.key) && (b = b.replace("{point.key}", "{point.key:" + c + "}"));
    return wa(b, {point:a, series:this})
  }, onMouseOver:function() {
    var a = this.chart, b = a.hoverSeries;
    if(b && b !== this) {
      b.onMouseOut()
    }
    this.options.events.mouseOver && D(this, "mouseOver");
    this.setState("hover");
    a.hoverSeries = this
  }, onMouseOut:function() {
    var a = this.options, b = this.chart, c = b.tooltip, d = b.hoverPoint;
    if(d) {
      d.onMouseOut()
    }
    this && a.events.mouseOut && D(this, "mouseOut");
    c && !a.stickyTracking && (!c.shared || this.noSharedTooltip) && c.hide();
    this.setState();
    b.hoverSeries = null
  }, animate:function(a) {
    var b = this, c = b.chart, d = c.renderer, e;
    e = b.options.animation;
    var f = c.clipBox, g = c.inverted, h;
    if(e && !V(e)) {
      e = X[b.type].animation
    }
    h = "_sharedClip" + e.duration + e.easing;
    if(a) {
      a = c[h], e = c[h + "m"], a || (c[h] = a = d.clipRect(v(f, {width:0})), c[h + "m"] = e = d.clipRect(-99, g ? -c.plotLeft : -c.plotTop, 99, g ? c.chartWidth : c.chartHeight)), b.group.clip(a), b.markerGroup.clip(e), b.sharedClipKey = h
    }else {
      if(a = c[h]) {
        a.animate({width:c.plotSizeX}, e), c[h + "m"].animate({width:c.plotSizeX + 99}, e)
      }
      b.animate = null;
      b.animationTimeout = setTimeout(function() {
        b.afterAnimate()
      }, e.duration)
    }
  }, afterAnimate:function() {
    var a = this.chart, b = this.sharedClipKey, c = this.group;
    c && this.options.clip !== !1 && (c.clip(a.clipRect), this.markerGroup.clip());
    setTimeout(function() {
      b && a[b] && (a[b] = a[b].destroy(), a[b + "m"] = a[b + "m"].destroy())
    }, 100)
  }, drawPoints:function() {
    var a, b = this.points, c = this.chart, d, e, f, g, h, i, j, k, m = this.options.marker, l, n = this.markerGroup;
    if(m.enabled || this._hasPointMarkers) {
      for(f = b.length;f--;) {
        if(g = b[f], d = g.plotX, e = g.plotY, k = g.graphic, i = g.marker || {}, a = m.enabled && i.enabled === y || i.enabled, l = c.isInsidePlot(t(d), e, c.inverted), a && e !== y && !isNaN(e) && g.y !== null) {
          if(a = g.pointAttr[g.selected ? "select" : ""], h = a.r, i = o(i.symbol, this.symbol), j = i.indexOf("url") === 0, k) {
            k.attr({visibility:l ? Z ? "inherit" : "visible" : "hidden"}).animate(v({x:d - h, y:e - h}, k.symbolName ? {width:2 * h, height:2 * h} : {}))
          }else {
            if(l && (h > 0 || j)) {
              g.graphic = c.renderer.symbol(i, d - h, e - h, 2 * h, 2 * h).attr(a).add(n)
            }
          }
        }else {
          if(k) {
            g.graphic = k.destroy()
          }
        }
      }
    }
  }, convertAttribs:function(a, b, c, d) {
    var e = this.pointAttrToOptions, f, g, h = {}, a = a || {}, b = b || {}, c = c || {}, d = d || {};
    for(f in e) {
      g = e[f], h[f] = o(a[g], b[f], c[f], d[f])
    }
    return h
  }, getAttribs:function() {
    var a = this, b = a.options, c = X[a.type].marker ? b.marker : b, d = c.states, e = d.hover, f, g = a.color, h = {stroke:g, fill:g}, i = a.points || [], j = [], k, m = a.pointAttrToOptions, l = b.negativeColor, p;
    b.marker ? (e.radius = e.radius || c.radius + 2, e.lineWidth = e.lineWidth || c.lineWidth + 1) : e.color = e.color || ma(e.color || g).brighten(e.brightness).get();
    j[""] = a.convertAttribs(c, h);
    n(["hover", "select"], function(b) {
      j[b] = a.convertAttribs(d[b], j[""])
    });
    a.pointAttr = j;
    for(g = i.length;g--;) {
      h = i[g];
      if((c = h.options && h.options.marker || h.options) && c.enabled === !1) {
        c.radius = 0
      }
      if(h.negative && l) {
        h.color = h.fillColor = l
      }
      f = b.colorByPoint || h.color;
      if(h.options) {
        for(p in m) {
          r(c[m[p]]) && (f = !0)
        }
      }
      if(f) {
        c = c || {};
        k = [];
        d = c.states || {};
        f = d.hover = d.hover || {};
        if(!b.marker) {
          f.color = ma(f.color || h.color).brighten(f.brightness || e.brightness).get()
        }
        k[""] = a.convertAttribs(v({color:h.color}, c), j[""]);
        k.hover = a.convertAttribs(d.hover, j.hover, k[""]);
        k.select = a.convertAttribs(d.select, j.select, k[""]);
        if(h.negative && b.marker && l) {
          k[""].fill = k.hover.fill = k.select.fill = a.convertAttribs({fillColor:l}).fill
        }
      }else {
        k = j
      }
      h.pointAttr = k
    }
  }, update:function(a, b) {
    var c = this.chart, d = this.type, a = x(this.userOptions, {animation:!1, index:this.index, pointStart:this.xData[0]}, a);
    this.remove(!1);
    v(this, aa[a.type || d].prototype);
    this.init(c, a);
    o(b, !0) && c.redraw(!1)
  }, destroy:function() {
    var a = this, b = a.chart, c = /AppleWebKit\/533/.test(Aa), d, e, f = a.data || [], g, h, i;
    D(a, "destroy");
    ba(a);
    n(["xAxis", "yAxis"], function(b) {
      if(i = a[b]) {
        ga(i.series, a), i.isDirty = i.forceRedraw = !0
      }
    });
    a.legendItem && a.chart.legend.destroyItem(a);
    for(e = f.length;e--;) {
      (g = f[e]) && g.destroy && g.destroy()
    }
    a.points = null;
    clearTimeout(a.animationTimeout);
    n("area,graph,dataLabelsGroup,group,markerGroup,tracker,graphNeg,areaNeg,posClip,negClip".split(","), function(b) {
      a[b] && (d = c && b === "group" ? "hide" : "destroy", a[b][d]())
    });
    if(b.hoverSeries === a) {
      b.hoverSeries = null
    }
    ga(b.series, a);
    for(h in a) {
      delete a[h]
    }
  }, drawDataLabels:function() {
    var a = this, b = a.options.dataLabels, c = a.points, d, e, f, g;
    if(b.enabled || a._hasPointLabels) {
      a.dlProcessOptions && a.dlProcessOptions(b), g = a.plotGroup("dataLabelsGroup", "data-labels", a.visible ? "visible" : "hidden", b.zIndex || 6), e = b, n(c, function(c) {
        var i, j = c.dataLabel, k, m, l = c.connector, n = !0;
        d = c.options && c.options.dataLabels;
        i = e.enabled || d && d.enabled;
        if(j && !i) {
          c.dataLabel = j.destroy()
        }else {
          if(i) {
            i = b.rotation;
            b = x(e, d);
            k = c.getLabelConfig();
            f = b.format ? wa(b.format, k) : b.formatter.call(k, b);
            b.style.color = o(b.color, b.style.color, a.color, "black");
            if(j) {
              if(r(f)) {
                j.attr({text:f}), n = !1
              }else {
                if(c.dataLabel = j = j.destroy(), l) {
                  c.connector = l.destroy()
                }
              }
            }else {
              if(r(f)) {
                j = {fill:b.backgroundColor, stroke:b.borderColor, "stroke-width":b.borderWidth, r:b.borderRadius || 0, rotation:i, padding:b.padding, zIndex:1};
                for(m in j) {
                  j[m] === y && delete j[m]
                }
                j = c.dataLabel = a.chart.renderer[i ? "text" : "label"](f, 0, -999, null, null, null, b.useHTML).attr(j).css(b.style).add(g).shadow(b.shadow)
              }
            }
            j && a.alignDataLabel(c, j, b, null, n)
          }
        }
      })
    }
  }, alignDataLabel:function(a, b, c, d, e) {
    var f = this.chart, g = f.inverted, h = o(a.plotX, -999), a = o(a.plotY, -999), i = b.getBBox(), d = v({x:g ? f.plotWidth - a : h, y:t(g ? f.plotHeight - h : a), width:0, height:0}, d);
    v(c, {width:i.width, height:i.height});
    c.rotation ? (d = {align:c.align, x:d.x + c.x + d.width / 2, y:d.y + c.y + d.height / 2}, b[e ? "attr" : "animate"](d)) : b.align(c, null, d);
    b.attr({visibility:c.crop === !1 || f.isInsidePlot(h, a, g) ? f.renderer.isSVG ? "inherit" : "visible" : "hidden"})
  }, getSegmentPath:function(a) {
    var b = this, c = [], d = b.options.step;
    n(a, function(e, f) {
      var g = e.plotX, h = e.plotY, i;
      b.getPointSpline ? c.push.apply(c, b.getPointSpline(a, e, f)) : (c.push(f ? "L" : "M"), d && f && (i = a[f - 1], d === "right" ? c.push(i.plotX, h) : d === "center" ? c.push((i.plotX + g) / 2, i.plotY, (i.plotX + g) / 2, h) : c.push(g, i.plotY)), c.push(e.plotX, e.plotY))
    });
    return c
  }, getGraphPath:function() {
    var a = this, b = [], c, d = [];
    n(a.segments, function(e) {
      c = a.getSegmentPath(e);
      e.length > 1 ? b = b.concat(c) : d.push(e[0])
    });
    a.singlePoints = d;
    return a.graphPath = b
  }, drawGraph:function() {
    var a = this, b = this.options, c = [["graph", b.lineColor || this.color]], d = b.lineWidth, e = b.dashStyle, f = this.getGraphPath(), g = b.negativeColor;
    g && c.push(["graphNeg", g]);
    n(c, function(c, g) {
      var j = c[0], k = a[j];
      if(k) {
        Ta(k), k.animate({d:f})
      }else {
        if(d && f.length) {
          k = {stroke:c[1], "stroke-width":d, zIndex:1};
          if(e) {
            k.dashstyle = e
          }
          a[j] = a.chart.renderer.path(f).attr(k).add(a.group).shadow(!g && b.shadow)
        }
      }
    })
  }, clipNeg:function() {
    var a = this.options, b = this.chart, c = b.renderer, d = a.negativeColor, e, f = this.graph, g = this.area, h = this.posClip, i = this.negClip;
    e = b.chartWidth;
    var j = b.chartHeight, k = q(e, j);
    if(d && (f || g)) {
      d = ja(this.yAxis.len - this.yAxis.translate(a.threshold || 0)), a = {x:0, y:0, width:k, height:d}, k = {x:0, y:d, width:k, height:k - d}, b.inverted && c.isVML && (a = {x:b.plotWidth - d - b.plotLeft, y:0, width:e, height:j}, k = {x:d + b.plotLeft - e, y:0, width:b.plotLeft + d, height:e}), this.yAxis.reversed ? (b = k, e = a) : (b = a, e = k), h ? (h.animate(b), i.animate(e)) : (this.posClip = h = c.clipRect(b), this.negClip = i = c.clipRect(e), f && (f.clip(h), this.graphNeg.clip(i)), g && 
      (g.clip(h), this.areaNeg.clip(i)))
    }
  }, invertGroups:function() {
    function a() {
      var a = {width:b.yAxis.len, height:b.xAxis.len};
      n(["group", "markerGroup"], function(c) {
        b[c] && b[c].attr(a).invert()
      })
    }
    var b = this, c = b.chart;
    if(b.xAxis) {
      J(c, "resize", a), J(b, "destroy", function() {
        ba(c, "resize", a)
      }), a(), b.invertGroups = a
    }
  }, plotGroup:function(a, b, c, d, e) {
    var f = this[a], g = !f, h = this.chart, i = this.xAxis, j = this.yAxis;
    g && (this[a] = f = h.renderer.g(b).attr({visibility:c, zIndex:d || 0.1}).add(e));
    f[g ? "attr" : "animate"]({translateX:i ? i.left : h.plotLeft, translateY:j ? j.top : h.plotTop, scaleX:1, scaleY:1});
    return f
  }, render:function() {
    var a = this.chart, b, c = this.options, d = c.animation && !!this.animate && a.renderer.isSVG, e = this.visible ? "visible" : "hidden", f = c.zIndex, g = this.hasRendered, h = a.seriesGroup;
    b = this.plotGroup("group", "series", e, f, h);
    this.markerGroup = this.plotGroup("markerGroup", "markers", e, f, h);
    d && this.animate(!0);
    this.getAttribs();
    b.inverted = this.isCartesian ? a.inverted : !1;
    this.drawGraph && (this.drawGraph(), this.clipNeg());
    this.drawDataLabels();
    this.drawPoints();
    this.options.enableMouseTracking !== !1 && this.drawTracker();
    a.inverted && this.invertGroups();
    c.clip !== !1 && !this.sharedClipKey && !g && b.clip(a.clipRect);
    d ? this.animate() : g || this.afterAnimate();
    this.isDirty = this.isDirtyData = !1;
    this.hasRendered = !0
  }, redraw:function() {
    var a = this.chart, b = this.isDirtyData, c = this.group, d = this.xAxis, e = this.yAxis;
    c && (a.inverted && c.attr({width:a.plotWidth, height:a.plotHeight}), c.animate({translateX:o(d && d.left, a.plotLeft), translateY:o(e && e.top, a.plotTop)}));
    this.translate();
    this.setTooltipPoints(!0);
    this.render();
    b && D(this, "updatedData")
  }, setState:function(a) {
    var b = this.options, c = this.graph, d = this.graphNeg, e = b.states, b = b.lineWidth, a = a || "";
    if(this.state !== a) {
      this.state = a, e[a] && e[a].enabled === !1 || (a && (b = e[a].lineWidth || b + 1), c && !c.dashstyle && (a = {"stroke-width":b}, c.attr(a), d && d.attr(a)))
    }
  }, setVisible:function(a, b) {
    var c = this, d = c.chart, e = c.legendItem, f, g = d.options.chart.ignoreHiddenSeries, h = c.visible;
    f = (c.visible = a = c.userOptions.visible = a === y ? !h : a) ? "show" : "hide";
    n(["group", "dataLabelsGroup", "markerGroup", "tracker"], function(a) {
      if(c[a]) {
        c[a][f]()
      }
    });
    if(d.hoverSeries === c) {
      c.onMouseOut()
    }
    e && d.legend.colorizeItem(c, a);
    c.isDirty = !0;
    c.options.stacking && n(d.series, function(a) {
      if(a.options.stacking && a.visible) {
        a.isDirty = !0
      }
    });
    n(c.linkedSeries, function(b) {
      b.setVisible(a, !1)
    });
    if(g) {
      d.isDirtyBox = !0
    }
    b !== !1 && d.redraw();
    D(c, f)
  }, show:function() {
    this.setVisible(!0)
  }, hide:function() {
    this.setVisible(!1)
  }, select:function(a) {
    this.selected = a = a === y ? !this.selected : a;
    if(this.checkbox) {
      this.checkbox.checked = a
    }
    D(this, a ? "select" : "unselect")
  }, drawTracker:function() {
    var a = this, b = a.options, c = b.trackByArea, d = [].concat(c ? a.areaPath : a.graphPath), e = d.length, f = a.chart, g = f.pointer, h = f.renderer, i = f.options.tooltip.snap, j = a.tracker, k = b.cursor, k = k && {cursor:k}, m = a.singlePoints, l, n = function() {
      if(f.hoverSeries !== a) {
        a.onMouseOver()
      }
    };
    if(e && !c) {
      for(l = e + 1;l--;) {
        d[l] === "M" && d.splice(l + 1, 0, d[l + 1] - i, d[l + 2], "L"), (l && d[l] === "M" || l === e) && d.splice(l, 0, "L", d[l - 2] + i, d[l - 1])
      }
    }
    for(l = 0;l < m.length;l++) {
      e = m[l], d.push("M", e.plotX - i, e.plotY, "L", e.plotX + i, e.plotY)
    }
    if(j) {
      j.attr({d:d})
    }else {
      if(a.tracker = j = h.path(d).attr({"class":"highcharts-tracker", "stroke-linejoin":"round", visibility:a.visible ? "visible" : "hidden", stroke:Ob, fill:c ? Ob : S, "stroke-width":b.lineWidth + (c ? 0 : 2 * i), zIndex:2}).addClass("highcharts-tracker").on("mouseover", n).on("mouseout", function(a) {
        g.onTrackerMouseOut(a)
      }).css(k).add(a.markerGroup), fb) {
        j.on("touchstart", n)
      }
    }
  }};
  M = ea(R);
  aa.line = M;
  X.area = x(W, {threshold:0});
  M = ea(R, {type:"area", getSegments:function() {
    var a = [], b = [], c = [], d = this.xAxis, e = this.yAxis, f = e.stacks[this.stackKey], g = {}, h, i, j = this.points, k, m;
    if(this.options.stacking && !this.cropped) {
      for(k = 0;k < j.length;k++) {
        g[j[k].x] = j[k]
      }
      for(m in f) {
        c.push(+m)
      }
      c.sort(function(a, b) {
        return a - b
      });
      n(c, function(a) {
        g[a] ? b.push(g[a]) : (h = d.translate(a), i = e.toPixels(f[a].cum, !0), b.push({y:null, plotX:h, clientX:h, plotY:i, yBottom:i, onMouseOver:ta}))
      });
      b.length && a.push(b)
    }else {
      R.prototype.getSegments.call(this), a = this.segments
    }
    this.segments = a
  }, getSegmentPath:function(a) {
    var b = R.prototype.getSegmentPath.call(this, a), c = [].concat(b), d, e = this.options;
    b.length === 3 && c.push("L", b[1], b[2]);
    if(e.stacking && !this.closedStacks) {
      for(d = a.length - 1;d >= 0;d--) {
        d < a.length - 1 && e.step && c.push(a[d + 1].plotX, a[d].yBottom), c.push(a[d].plotX, a[d].yBottom)
      }
    }else {
      this.closeSegment(c, a)
    }
    this.areaPath = this.areaPath.concat(c);
    return b
  }, closeSegment:function(a, b) {
    var c = this.yAxis.getThreshold(this.options.threshold);
    a.push("L", b[b.length - 1].plotX, c, "L", b[0].plotX, c)
  }, drawGraph:function() {
    this.areaPath = [];
    R.prototype.drawGraph.apply(this);
    var a = this, b = this.areaPath, c = this.options, d = [["area", this.color, c.fillColor]];
    c.negativeColor && d.push(["areaNeg", c.negativeColor, c.negativeFillColor]);
    n(d, function(d) {
      var f = d[0], g = a[f];
      g ? g.animate({d:b}) : a[f] = a.chart.renderer.path(b).attr({fill:o(d[2], ma(d[1]).setOpacity(c.fillOpacity || 0.75).get()), zIndex:0}).add(a.group)
    })
  }, drawLegendSymbol:function(a, b) {
    b.legendSymbol = this.chart.renderer.rect(0, a.baseline - 11, a.options.symbolWidth, 12, 2).attr({zIndex:3}).add(b.legendGroup)
  }});
  aa.area = M;
  X.spline = x(W);
  F = ea(R, {type:"spline", getPointSpline:function(a, b, c) {
    var d = b.plotX, e = b.plotY, f = a[c - 1], g = a[c + 1], h, i, j, k;
    if(f && g) {
      a = f.plotY;
      j = g.plotX;
      var g = g.plotY, m;
      h = (1.5 * d + f.plotX) / 2.5;
      i = (1.5 * e + a) / 2.5;
      j = (1.5 * d + j) / 2.5;
      k = (1.5 * e + g) / 2.5;
      m = (k - i) * (j - d) / (j - h) + e - k;
      i += m;
      k += m;
      i > a && i > e ? (i = q(a, e), k = 2 * e - i) : i < a && i < e && (i = K(a, e), k = 2 * e - i);
      k > g && k > e ? (k = q(g, e), i = 2 * e - k) : k < g && k < e && (k = K(g, e), i = 2 * e - k);
      b.rightContX = j;
      b.rightContY = k
    }
    c ? (b = ["C", f.rightContX || f.plotX, f.rightContY || f.plotY, h || d, i || e, d, e], f.rightContX = f.rightContY = null) : b = ["M", d, e];
    return b
  }});
  aa.spline = F;
  X.areaspline = x(X.area);
  na = M.prototype;
  F = ea(F, {type:"areaspline", closedStacks:!0, getSegmentPath:na.getSegmentPath, closeSegment:na.closeSegment, drawGraph:na.drawGraph});
  aa.areaspline = F;
  X.column = x(W, {borderColor:"#FFFFFF", borderWidth:1, borderRadius:0, groupPadding:0.2, marker:null, pointPadding:0.1, minPointLength:0, cropThreshold:50, pointRange:null, states:{hover:{brightness:0.1, shadow:!1}, select:{color:"#C0C0C0", borderColor:"#000000", shadow:!1}}, dataLabels:{align:null, verticalAlign:null, y:null}, stickyTracking:!1, threshold:0});
  F = ea(R, {type:"column", tooltipOutsidePlot:!0, requireSorting:!1, pointAttrToOptions:{stroke:"borderColor", "stroke-width":"borderWidth", fill:"color", r:"borderRadius"}, trackerGroups:["group", "dataLabelsGroup"], init:function() {
    R.prototype.init.apply(this, arguments);
    var a = this, b = a.chart;
    b.hasRendered && n(b.series, function(b) {
      if(b.type === a.type) {
        b.isDirty = !0
      }
    })
  }, getColumnMetrics:function() {
    var a = this, b = a.chart, c = a.options, d = this.xAxis, e = d.reversed, f, g = {}, h, i = 0;
    c.grouping === !1 ? i = 1 : n(b.series, function(b) {
      var c = b.options;
      if(b.type === a.type && b.visible && a.options.group === c.group) {
        c.stacking ? (f = b.stackKey, g[f] === y && (g[f] = i++), h = g[f]) : c.grouping !== !1 && (h = i++), b.columnIndex = h
      }
    });
    var b = K(Q(d.transA) * (d.ordinalSlope || c.pointRange || d.closestPointRange || 1), d.len), d = b * c.groupPadding, j = (b - 2 * d) / i, k = c.pointWidth, c = r(k) ? (j - k) / 2 : j * c.pointPadding, k = o(k, j - 2 * c);
    return a.columnMetrics = {width:k, offset:c + (d + ((e ? i - (a.columnIndex || 0) : a.columnIndex) || 0) * j - b / 2) * (e ? -1 : 1)}
  }, translate:function() {
    var a = this, b = a.chart, c = a.options, d = c.stacking, e = c.borderWidth, f = a.yAxis, g = a.translatedThreshold = f.getThreshold(c.threshold), h = o(c.minPointLength, 5), c = a.getColumnMetrics(), i = c.width, j = ja(q(i, 1 + 2 * e)), k = c.offset;
    R.prototype.translate.apply(a);
    n(a.points, function(c) {
      var l = K(q(-999, c.plotY), f.len + 999), n = o(c.yBottom, g), s = c.plotX + k, t = ja(K(l, n)), l = ja(q(l, n) - t), r = f.stacks[(c.y < 0 ? "-" : "") + a.stackKey];
      d && a.visible && r && r[c.x] && r[c.x].setOffset(k, j);
      Q(l) < h && h && (l = h, t = Q(t - g) > h ? n - h : g - (f.translate(c.y, 0, 1, 0, 1) <= g ? h : 0));
      c.barX = s;
      c.pointWidth = i;
      c.shapeType = "rect";
      c.shapeArgs = c = b.renderer.Element.prototype.crisp.call(0, e, s, t, j, l);
      e % 2 && (c.y -= 1, c.height += 1)
    })
  }, getSymbol:ta, drawLegendSymbol:M.prototype.drawLegendSymbol, drawGraph:ta, drawPoints:function() {
    var a = this, b = a.options, c = a.chart.renderer, d;
    n(a.points, function(e) {
      var f = e.plotY, g = e.graphic;
      if(f !== y && !isNaN(f) && e.y !== null) {
        d = e.shapeArgs, g ? (Ta(g), g.animate(x(d))) : e.graphic = c[e.shapeType](d).attr(e.pointAttr[e.selected ? "select" : ""]).add(a.group).shadow(b.shadow, null, b.stacking && !b.borderRadius)
      }else {
        if(g) {
          e.graphic = g.destroy()
        }
      }
    })
  }, drawTracker:function() {
    var a = this, b = a.chart.pointer, c = a.options.cursor, d = c && {cursor:c}, e = function(b) {
      var c = b.target, d;
      for(a.onMouseOver();c && !d;) {
        d = c.point, c = c.parentNode
      }
      if(d !== y) {
        d.onMouseOver(b)
      }
    };
    n(a.points, function(a) {
      if(a.graphic) {
        a.graphic.element.point = a
      }
      if(a.dataLabel) {
        a.dataLabel.element.point = a
      }
    });
    a._hasTracking ? a._hasTracking = !0 : n(a.trackerGroups, function(c) {
      if(a[c] && (a[c].addClass("highcharts-tracker").on("mouseover", e).on("mouseout", function(a) {
        b.onTrackerMouseOut(a)
      }).css(d), fb)) {
        a[c].on("touchstart", e)
      }
    })
  }, alignDataLabel:function(a, b, c, d, e) {
    var f = this.chart, g = f.inverted, h = a.dlBox || a.shapeArgs, i = a.below || a.plotY > o(this.translatedThreshold, f.plotSizeY), j = o(c.inside, !!this.options.stacking);
    if(h && (d = x(h), g && (d = {x:f.plotWidth - d.y - d.height, y:f.plotHeight - d.x - d.width, width:d.height, height:d.width}), !j)) {
      g ? (d.x += i ? 0 : d.width, d.width = 0) : (d.y += i ? d.height : 0, d.height = 0)
    }
    c.align = o(c.align, !g || j ? "center" : i ? "right" : "left");
    c.verticalAlign = o(c.verticalAlign, g || j ? "middle" : i ? "top" : "bottom");
    R.prototype.alignDataLabel.call(this, a, b, c, d, e)
  }, animate:function(a) {
    var b = this.yAxis, c = this.options, d = this.chart.inverted, e = {};
    if(Z) {
      a ? (e.scaleY = 0.001, a = K(b.pos + b.len, q(b.pos, b.toPixels(c.threshold))), d ? e.translateX = a - b.len : e.translateY = a, this.group.attr(e)) : (e.scaleY = 1, e[d ? "translateX" : "translateY"] = b.pos, this.group.animate(e, this.options.animation), this.animate = null)
    }
  }, remove:function() {
    var a = this, b = a.chart;
    b.hasRendered && n(b.series, function(b) {
      if(b.type === a.type) {
        b.isDirty = !0
      }
    });
    R.prototype.remove.apply(a, arguments)
  }});
  aa.column = F;
  X.bar = x(X.column);
  na = ea(F, {type:"bar", inverted:!0});
  aa.bar = na;
  X.scatter = x(W, {lineWidth:0, tooltip:{headerFormat:'<span style="font-size: 10px; color:{series.color}">{series.name}</span><br/>', pointFormat:"x: <b>{point.x}</b><br/>y: <b>{point.y}</b><br/>", followPointer:!0}, stickyTracking:!1});
  na = ea(R, {type:"scatter", sorted:!1, requireSorting:!1, noSharedTooltip:!0, trackerGroups:["markerGroup"], drawTracker:F.prototype.drawTracker, setTooltipPoints:ta});
  aa.scatter = na;
  X.pie = x(W, {borderColor:"#FFFFFF", borderWidth:1, center:[null, null], clip:!1, colorByPoint:!0, dataLabels:{distance:30, enabled:!0, formatter:function() {
    return this.point.name
  }}, ignoreHiddenPoint:!0, legendType:"point", marker:null, size:null, showInLegend:!1, slicedOffset:10, states:{hover:{brightness:0.1, shadow:!1}}, stickyTracking:!1, tooltip:{followPointer:!0}});
  W = {type:"pie", isCartesian:!1, pointClass:ea(Na, {init:function() {
    Na.prototype.init.apply(this, arguments);
    var a = this, b;
    if(a.y < 0) {
      a.y = null
    }
    v(a, {visible:a.visible !== !1, name:o(a.name, "Slice")});
    b = function() {
      a.slice()
    };
    J(a, "select", b);
    J(a, "unselect", b);
    return a
  }, setVisible:function(a) {
    var b = this, c = b.series, d = c.chart, e;
    b.visible = b.options.visible = a = a === y ? !b.visible : a;
    c.options.data[la(b, c.data)] = b.options;
    e = a ? "show" : "hide";
    n(["graphic", "dataLabel", "connector", "shadowGroup"], function(a) {
      if(b[a]) {
        b[a][e]()
      }
    });
    b.legendItem && d.legend.colorizeItem(b, a);
    if(!c.isDirty && c.options.ignoreHiddenPoint) {
      c.isDirty = !0, d.redraw()
    }
  }, slice:function(a, b, c) {
    var d = this.series;
    Ia(c, d.chart);
    o(b, !0);
    this.sliced = this.options.sliced = a = r(a) ? a : !this.sliced;
    d.options.data[la(this, d.data)] = this.options;
    a = a ? this.slicedTranslation : {translateX:0, translateY:0};
    this.graphic.animate(a);
    this.shadowGroup && this.shadowGroup.animate(a)
  }}), requireSorting:!1, noSharedTooltip:!0, trackerGroups:["group", "dataLabelsGroup"], pointAttrToOptions:{stroke:"borderColor", "stroke-width":"borderWidth", fill:"color"}, getColor:ta, animate:function(a) {
    var b = this, c = b.points, d = b.startAngleRad;
    if(!a) {
      n(c, function(a) {
        var c = a.graphic, a = a.shapeArgs;
        c && (c.attr({r:b.center[3] / 2, start:d, end:d}), c.animate({r:a.r, start:a.start, end:a.end}, b.options.animation))
      }), b.animate = null
    }
  }, setData:function(a, b) {
    R.prototype.setData.call(this, a, !1);
    this.processData();
    this.generatePoints();
    o(b, !0) && this.chart.redraw()
  }, getCenter:function() {
    var a = this.options, b = this.chart, c = 2 * (a.slicedOffset || 0), d, e = b.plotWidth - 2 * c, f = b.plotHeight - 2 * c, b = a.center, a = [o(b[0], "50%"), o(b[1], "50%"), a.size || "100%", a.innerSize || 0], g = K(e, f), h;
    return La(a, function(a, b) {
      h = /%$/.test(a);
      d = b < 2 || b === 2 && h;
      return(h ? [e, f, g, g][b] * u(a) / 100 : a) + (d ? c : 0)
    })
  }, translate:function(a) {
    this.generatePoints();
    var b = 0, c = 0, d = this.options, e = d.slicedOffset, f = e + d.borderWidth, g, h, i, j = this.startAngleRad = Ka / 180 * ((d.startAngle || 0) % 360 - 90), k = this.points, m = 2 * Ka, l = d.dataLabels.distance, n = d.ignoreHiddenPoint, o, q = k.length, r;
    if(!a) {
      this.center = a = this.getCenter()
    }
    this.getX = function(b, c) {
      i = I.asin((b - a[1]) / (a[2] / 2 + l));
      return a[0] + (c ? -1 : 1) * Y(i) * (a[2] / 2 + l)
    };
    for(o = 0;o < q;o++) {
      r = k[o], b += n && !r.visible ? 0 : r.y
    }
    for(o = 0;o < q;o++) {
      r = k[o];
      d = b ? r.y / b : 0;
      g = t((j + c * m) * 1E3) / 1E3;
      if(!n || r.visible) {
        c += d
      }
      h = t((j + c * m) * 1E3) / 1E3;
      r.shapeType = "arc";
      r.shapeArgs = {x:a[0], y:a[1], r:a[2] / 2, innerR:a[3] / 2, start:g, end:h};
      i = (h + g) / 2;
      i > 0.75 * m && (i -= 2 * Ka);
      r.slicedTranslation = {translateX:t(Y(i) * e), translateY:t(ca(i) * e)};
      g = Y(i) * a[2] / 2;
      h = ca(i) * a[2] / 2;
      r.tooltipPos = [a[0] + g * 0.7, a[1] + h * 0.7];
      r.half = i < m / 4 ? 0 : 1;
      r.angle = i;
      f = K(f, l / 2);
      r.labelPos = [a[0] + g + Y(i) * l, a[1] + h + ca(i) * l, a[0] + g + Y(i) * f, a[1] + h + ca(i) * f, a[0] + g, a[1] + h, l < 0 ? "center" : r.half ? "right" : "left", i];
      r.percentage = d * 100;
      r.total = b
    }
    this.setTooltipPoints()
  }, drawGraph:null, drawPoints:function() {
    var a = this, b = a.chart.renderer, c, d, e = a.options.shadow, f, g;
    if(e && !a.shadowGroup) {
      a.shadowGroup = b.g("shadow").add(a.group)
    }
    n(a.points, function(h) {
      d = h.graphic;
      g = h.shapeArgs;
      f = h.shadowGroup;
      if(e && !f) {
        f = h.shadowGroup = b.g("shadow").add(a.shadowGroup)
      }
      c = h.sliced ? h.slicedTranslation : {translateX:0, translateY:0};
      f && f.attr(c);
      d ? d.animate(v(g, c)) : h.graphic = d = b.arc(g).setRadialReference(a.center).attr(h.pointAttr[h.selected ? "select" : ""]).attr({"stroke-linejoin":"round"}).attr(c).add(a.group).shadow(e, f);
      h.visible === !1 && h.setVisible(!1)
    })
  }, drawDataLabels:function() {
    var a = this, b = a.data, c, d = a.chart, e = a.options.dataLabels, f = o(e.connectorPadding, 10), g = o(e.connectorWidth, 1), h = d.plotWidth, d = d.plotHeight, i, j, k = o(e.softConnector, !0), m = e.distance, l = a.center, p = l[2] / 2, s = l[1], r = m > 0, v, w, u, x, y = [[], []], A, z, E, H, C, D = [0, 0, 0, 0], K = function(a, b) {
      return b.y - a.y
    }, M = function(a, b) {
      a.sort(function(a, c) {
        return a.angle !== void 0 && (c.angle - a.angle) * b
      })
    };
    if(e.enabled || a._hasPointLabels) {
      R.prototype.drawDataLabels.apply(a);
      n(b, function(a) {
        a.dataLabel && y[a.half].push(a)
      });
      for(H = 0;!x && b[H];) {
        x = b[H] && b[H].dataLabel && (b[H].dataLabel.getBBox().height || 21), H++
      }
      for(H = 2;H--;) {
        var b = [], L = [], I = y[H], J = I.length, F;
        M(I, H - 0.5);
        if(m > 0) {
          for(C = s - p - m;C <= s + p + m;C += x) {
            b.push(C)
          }
          w = b.length;
          if(J > w) {
            c = [].concat(I);
            c.sort(K);
            for(C = J;C--;) {
              c[C].rank = C
            }
            for(C = J;C--;) {
              I[C].rank >= w && I.splice(C, 1)
            }
            J = I.length
          }
          for(C = 0;C < J;C++) {
            c = I[C];
            u = c.labelPos;
            c = 9999;
            var O, N;
            for(N = 0;N < w;N++) {
              O = Q(b[N] - u[1]), O < c && (c = O, F = N)
            }
            if(F < C && b[C] !== null) {
              F = C
            }else {
              for(w < J - C + F && b[C] !== null && (F = w - J + C);b[F] === null;) {
                F++
              }
            }
            L.push({i:F, y:b[F]});
            b[F] = null
          }
          L.sort(K)
        }
        for(C = 0;C < J;C++) {
          c = I[C];
          u = c.labelPos;
          v = c.dataLabel;
          E = c.visible === !1 ? "hidden" : "visible";
          c = u[1];
          if(m > 0) {
            if(w = L.pop(), F = w.i, z = w.y, c > z && b[F + 1] !== null || c < z && b[F - 1] !== null) {
              z = c
            }
          }else {
            z = c
          }
          A = e.justify ? l[0] + (H ? -1 : 1) * (p + m) : a.getX(F === 0 || F === b.length - 1 ? c : z, H);
          v._attr = {visibility:E, align:u[6]};
          v._pos = {x:A + e.x + ({left:f, right:-f}[u[6]] || 0), y:z + e.y - 10};
          v.connX = A;
          v.connY = z;
          if(this.options.size === null) {
            w = v.width, A - w < f ? D[3] = q(t(w - A + f), D[3]) : A + w > h - f && (D[1] = q(t(A + w - h + f), D[1])), z - x / 2 < 0 ? D[0] = q(t(-z + x / 2), D[0]) : z + x / 2 > d && (D[2] = q(t(z + x / 2 - d), D[2]))
          }
        }
      }
      if(pa(D) === 0 || this.verifyDataLabelOverflow(D)) {
        this.placeDataLabels(), r && g && n(this.points, function(b) {
          i = b.connector;
          u = b.labelPos;
          if((v = b.dataLabel) && v._pos) {
            E = v._attr.visibility, A = v.connX, z = v.connY, j = k ? ["M", A + (u[6] === "left" ? 5 : -5), z, "C", A, z, 2 * u[2] - u[4], 2 * u[3] - u[5], u[2], u[3], "L", u[4], u[5]] : ["M", A + (u[6] === "left" ? 5 : -5), z, "L", u[2], u[3], "L", u[4], u[5]], i ? (i.animate({d:j}), i.attr("visibility", E)) : b.connector = i = a.chart.renderer.path(j).attr({"stroke-width":g, stroke:e.connectorColor || b.color || "#606060", visibility:E}).add(a.group)
          }else {
            if(i) {
              b.connector = i.destroy()
            }
          }
        })
      }
    }
  }, verifyDataLabelOverflow:function(a) {
    var b = this.center, c = this.options, d = c.center, e = c = c.minSize || 80, f;
    d[0] !== null ? e = q(b[2] - q(a[1], a[3]), c) : (e = q(b[2] - a[1] - a[3], c), b[0] += (a[3] - a[1]) / 2);
    d[1] !== null ? e = q(K(e, b[2] - q(a[0], a[2])), c) : (e = q(K(e, b[2] - a[0] - a[2]), c), b[1] += (a[0] - a[2]) / 2);
    e < b[2] ? (b[2] = e, this.translate(b), n(this.points, function(a) {
      if(a.dataLabel) {
        a.dataLabel._pos = null
      }
    }), this.drawDataLabels()) : f = !0;
    return f
  }, placeDataLabels:function() {
    n(this.points, function(a) {
      var a = a.dataLabel, b;
      if(a) {
        (b = a._pos) ? (a.attr(a._attr), a[a.moved ? "animate" : "attr"](b), a.moved = !0) : a && a.attr({y:-999})
      }
    })
  }, alignDataLabel:ta, drawTracker:F.prototype.drawTracker, drawLegendSymbol:M.prototype.drawLegendSymbol, getSymbol:ta};
  W = ea(R, W);
  aa.pie = W;
  v(Highcharts, {Axis:ab, Chart:tb, Color:ma, Legend:sb, Pointer:rb, Point:Na, Tick:Ja, Tooltip:qb, Renderer:Sa, Series:R, SVGElement:ra, SVGRenderer:Ca, arrayMin:Ga, arrayMax:pa, charts:Ba, dateFormat:Ua, format:wa, pathAnim:vb, getOptions:function() {
    return N
  }, hasBidiBug:Sb, isTouchDevice:Mb, numberFormat:ua, seriesTypes:aa, setOptions:function(a) {
    N = x(N, a);
    Jb();
    return N
  }, addEvent:J, removeEvent:ba, createElement:U, discardElement:Ra, css:L, each:n, extend:v, map:La, merge:x, pick:o, splat:ha, extendClass:ea, pInt:u, wrap:zb, svg:Z, canvas:$, vml:!Z && !$, product:"Highcharts", version:"3.0.2"})
})();
(function($, e, b) {
  var c = "hashchange", h = document, f, g = $.event.special, i = h.documentMode, d = "on" + c in e && (i === b || i > 7);
  function a(j) {
    j = j || location.href;
    return"#" + j.replace(/^[^#]*#?(.*)$/, "$1")
  }
  $.fn[c] = function(j) {
    return j ? this.bind(c, j) : this.trigger(c)
  };
  $.fn[c].delay = 50;
  g[c] = $.extend(g[c], {setup:function() {
    if(d) {
      return false
    }
    $(f.start)
  }, teardown:function() {
    if(d) {
      return false
    }
    $(f.stop)
  }});
  f = function() {
    var j = {}, p, m = a(), k = function(q) {
      return q
    }, l = k, o = k;
    j.start = function() {
      p || n()
    };
    j.stop = function() {
      p && clearTimeout(p);
      p = b
    };
    function n() {
      var r = a(), q = o(m);
      if(r !== m) {
        l(m = r, q);
        $(e).trigger(c)
      }else {
        if(q !== m) {
          location.href = location.href.replace(/#.*/, "") + q
        }
      }
      p = setTimeout(n, $.fn[c].delay)
    }
    /MSIE/.test(navigator.userAgent) && !d && function() {
      var q, r;
      j.start = function() {
        if(!q) {
          r = $.fn[c].src;
          r = r && r + a();
          q = $('<iframe tabindex="-1" title="empty"/>').hide().one("load", function() {
            r || l(a());
            n()
          }).attr("src", r || "javascript:0").insertAfter("body")[0].contentWindow;
          h.onpropertychange = function() {
            try {
              if(event.propertyName === "title") {
                q.document.title = h.title
              }
            }catch(s) {
            }
          }
        }
      };
      j.stop = k;
      o = function() {
        return a(q.location.href)
      };
      l = function(v, s) {
        var u = q.document, t = $.fn[c].domain;
        if(v !== s) {
          u.title = h.title;
          u.open();
          t && u.write('<script>document.domain="' + t + '"\x3c/script>');
          u.close();
          q.location.hash = v
        }
      }
    }();
    return j
  }()
})(jQuery, this);
(function($, window, undefined) {
  "$:nomunge";
  var elems = $([]), jq_resize = $.resize = $.extend($.resize, {}), timeout_id, str_setTimeout = "setTimeout", str_resize = "resize", str_data = str_resize + "-special-event", str_delay = "delay", str_throttle = "throttleWindow";
  jq_resize[str_delay] = 250;
  jq_resize[str_throttle] = true;
  $.event.special[str_resize] = {setup:function() {
    if(!jq_resize[str_throttle] && this[str_setTimeout]) {
      return false
    }
    var elem = $(this);
    elems = elems.add(elem);
    $.data(this, str_data, {w:elem.width(), h:elem.height()});
    if(elems.length === 1) {
      loopy()
    }
  }, teardown:function() {
    if(!jq_resize[str_throttle] && this[str_setTimeout]) {
      return false
    }
    var elem = $(this);
    elems = elems.not(elem);
    elem.removeData(str_data);
    if(!elems.length) {
      clearTimeout(timeout_id)
    }
  }, add:function(handleObj) {
    if(!jq_resize[str_throttle] && this[str_setTimeout]) {
      return false
    }
    var old_handler;
    function new_handler(e, w, h) {
      var elem = $(this), data = $.data(this, str_data);
      if(!data) {
        data = $.data(this, str_data, {})
      }
      data.w = w !== undefined ? w : elem.width();
      data.h = h !== undefined ? h : elem.height();
      old_handler.apply(this, arguments)
    }
    if($.isFunction(handleObj)) {
      old_handler = handleObj;
      return new_handler
    }else {
      old_handler = handleObj.handler;
      handleObj.handler = new_handler
    }
  }};
  function loopy() {
    timeout_id = window[str_setTimeout](function() {
      elems.each(function() {
        var elem = $(this), width = elem.width(), height = elem.height(), data = $.data(this, str_data);
        if(width !== data.w || height !== data.h) {
          elem.trigger(str_resize, [data.w = width, data.h = height])
        }
      });
      loopy()
    }, jq_resize[str_delay])
  }
})(jQuery, this);
(function($) {
  var types = ["DOMMouseScroll", "mousewheel"];
  if($.event.fixHooks) {
    for(var i = types.length;i;) {
      $.event.fixHooks[types[--i]] = $.event.mouseHooks
    }
  }
  $.event.special.mousewheel = {setup:function() {
    if(this.addEventListener) {
      for(var i = types.length;i;) {
        this.addEventListener(types[--i], handler, false)
      }
    }else {
      this.onmousewheel = handler
    }
  }, teardown:function() {
    if(this.removeEventListener) {
      for(var i = types.length;i;) {
        this.removeEventListener(types[--i], handler, false)
      }
    }else {
      this.onmousewheel = null
    }
  }};
  $.fn.extend({mousewheel:function(fn) {
    return fn ? this.bind("mousewheel", fn) : this.trigger("mousewheel")
  }, unmousewheel:function(fn) {
    return this.unbind("mousewheel", fn)
  }});
  function handler(event) {
    var orgEvent = event || window.event, args = [].slice.call(arguments, 1), delta = 0, returnValue = true, deltaX = 0, deltaY = 0;
    event = $.event.fix(orgEvent);
    event.type = "mousewheel";
    if(orgEvent.wheelDelta) {
      delta = orgEvent.wheelDelta / 120
    }
    if(orgEvent.detail) {
      delta = -orgEvent.detail / 3
    }
    deltaY = delta;
    if(orgEvent.axis !== undefined && orgEvent.axis === orgEvent.HORIZONTAL_AXIS) {
      deltaY = 0;
      deltaX = -1 * delta
    }
    if(orgEvent.wheelDeltaY !== undefined) {
      deltaY = orgEvent.wheelDeltaY / 120
    }
    if(orgEvent.wheelDeltaX !== undefined) {
      deltaX = -1 * orgEvent.wheelDeltaX / 120
    }
    args.unshift(event, delta, deltaX, deltaY);
    return($.event.dispatch || $.event.handle).apply(this, args)
  }
})(jQuery);
(function() {
  var n = this, t = n._, r = {}, e = Array.prototype, u = Object.prototype, i = Function.prototype, a = e.push, o = e.slice, c = e.concat, l = u.toString, f = u.hasOwnProperty, s = e.forEach, p = e.map, h = e.reduce, v = e.reduceRight, d = e.filter, g = e.every, m = e.some, y = e.indexOf, b = e.lastIndexOf, x = Array.isArray, _ = Object.keys, j = i.bind, w = function(n) {
    return n instanceof w ? n : this instanceof w ? (this._wrapped = n, void 0) : new w(n)
  };
  "undefined" != typeof exports ? ("undefined" != typeof module && module.exports && (exports = module.exports = w), exports._ = w) : n._ = w, w.VERSION = "1.4.4";
  var A = w.each = w.forEach = function(n, t, e) {
    if(null != n) {
      if(s && n.forEach === s) {
        n.forEach(t, e)
      }else {
        if(n.length === +n.length) {
          for(var u = 0, i = n.length;i > u;u++) {
            if(t.call(e, n[u], u, n) === r) {
              return
            }
          }
        }else {
          for(var a in n) {
            if(w.has(n, a) && t.call(e, n[a], a, n) === r) {
              return
            }
          }
        }
      }
    }
  };
  w.map = w.collect = function(n, t, r) {
    var e = [];
    return null == n ? e : p && n.map === p ? n.map(t, r) : (A(n, function(n, u, i) {
      e[e.length] = t.call(r, n, u, i)
    }), e)
  };
  var O = "Reduce of empty array with no initial value";
  w.reduce = w.foldl = w.inject = function(n, t, r, e) {
    var u = arguments.length > 2;
    if(null == n && (n = []), h && n.reduce === h) {
      return e && (t = w.bind(t, e)), u ? n.reduce(t, r) : n.reduce(t)
    }
    if(A(n, function(n, i, a) {
      u ? r = t.call(e, r, n, i, a) : (r = n, u = !0)
    }), !u) {
      throw new TypeError(O);
    }
    return r
  }, w.reduceRight = w.foldr = function(n, t, r, e) {
    var u = arguments.length > 2;
    if(null == n && (n = []), v && n.reduceRight === v) {
      return e && (t = w.bind(t, e)), u ? n.reduceRight(t, r) : n.reduceRight(t)
    }
    var i = n.length;
    if(i !== +i) {
      var a = w.keys(n);
      i = a.length
    }
    if(A(n, function(o, c, l) {
      c = a ? a[--i] : --i, u ? r = t.call(e, r, n[c], c, l) : (r = n[c], u = !0)
    }), !u) {
      throw new TypeError(O);
    }
    return r
  }, w.find = w.detect = function(n, t, r) {
    var e;
    return E(n, function(n, u, i) {
      return t.call(r, n, u, i) ? (e = n, !0) : void 0
    }), e
  }, w.filter = w.select = function(n, t, r) {
    var e = [];
    return null == n ? e : d && n.filter === d ? n.filter(t, r) : (A(n, function(n, u, i) {
      t.call(r, n, u, i) && (e[e.length] = n)
    }), e)
  }, w.reject = function(n, t, r) {
    return w.filter(n, function(n, e, u) {
      return!t.call(r, n, e, u)
    }, r)
  }, w.every = w.all = function(n, t, e) {
    t || (t = w.identity);
    var u = !0;
    return null == n ? u : g && n.every === g ? n.every(t, e) : (A(n, function(n, i, a) {
      return(u = u && t.call(e, n, i, a)) ? void 0 : r
    }), !!u)
  };
  var E = w.some = w.any = function(n, t, e) {
    t || (t = w.identity);
    var u = !1;
    return null == n ? u : m && n.some === m ? n.some(t, e) : (A(n, function(n, i, a) {
      return u || (u = t.call(e, n, i, a)) ? r : void 0
    }), !!u)
  };
  w.contains = w.include = function(n, t) {
    return null == n ? !1 : y && n.indexOf === y ? n.indexOf(t) != -1 : E(n, function(n) {
      return n === t
    })
  }, w.invoke = function(n, t) {
    var r = o.call(arguments, 2), e = w.isFunction(t);
    return w.map(n, function(n) {
      return(e ? t : n[t]).apply(n, r)
    })
  }, w.pluck = function(n, t) {
    return w.map(n, function(n) {
      return n[t]
    })
  }, w.where = function(n, t, r) {
    return w.isEmpty(t) ? r ? null : [] : w[r ? "find" : "filter"](n, function(n) {
      for(var r in t) {
        if(t[r] !== n[r]) {
          return!1
        }
      }
      return!0
    })
  }, w.findWhere = function(n, t) {
    return w.where(n, t, !0)
  }, w.max = function(n, t, r) {
    if(!t && w.isArray(n) && n[0] === +n[0] && 65535 > n.length) {
      return Math.max.apply(Math, n)
    }
    if(!t && w.isEmpty(n)) {
      return-1 / 0
    }
    var e = {computed:-1 / 0, value:-1 / 0};
    return A(n, function(n, u, i) {
      var a = t ? t.call(r, n, u, i) : n;
      a >= e.computed && (e = {value:n, computed:a})
    }), e.value
  }, w.min = function(n, t, r) {
    if(!t && w.isArray(n) && n[0] === +n[0] && 65535 > n.length) {
      return Math.min.apply(Math, n)
    }
    if(!t && w.isEmpty(n)) {
      return 1 / 0
    }
    var e = {computed:1 / 0, value:1 / 0};
    return A(n, function(n, u, i) {
      var a = t ? t.call(r, n, u, i) : n;
      e.computed > a && (e = {value:n, computed:a})
    }), e.value
  }, w.shuffle = function(n) {
    var t, r = 0, e = [];
    return A(n, function(n) {
      t = w.random(r++), e[r - 1] = e[t], e[t] = n
    }), e
  };
  var k = function(n) {
    return w.isFunction(n) ? n : function(t) {
      return t[n]
    }
  };
  w.sortBy = function(n, t, r) {
    var e = k(t);
    return w.pluck(w.map(n, function(n, t, u) {
      return{value:n, index:t, criteria:e.call(r, n, t, u)}
    }).sort(function(n, t) {
      var r = n.criteria, e = t.criteria;
      if(r !== e) {
        if(r > e || r === void 0) {
          return 1
        }
        if(e > r || e === void 0) {
          return-1
        }
      }
      return n.index < t.index ? -1 : 1
    }), "value")
  };
  var F = function(n, t, r, e) {
    var u = {}, i = k(t || w.identity);
    return A(n, function(t, a) {
      var o = i.call(r, t, a, n);
      e(u, o, t)
    }), u
  };
  w.groupBy = function(n, t, r) {
    return F(n, t, r, function(n, t, r) {
      (w.has(n, t) ? n[t] : n[t] = []).push(r)
    })
  }, w.countBy = function(n, t, r) {
    return F(n, t, r, function(n, t) {
      w.has(n, t) || (n[t] = 0), n[t]++
    })
  }, w.sortedIndex = function(n, t, r, e) {
    r = null == r ? w.identity : k(r);
    for(var u = r.call(e, t), i = 0, a = n.length;a > i;) {
      var o = i + a >>> 1;
      u > r.call(e, n[o]) ? i = o + 1 : a = o
    }
    return i
  }, w.toArray = function(n) {
    return n ? w.isArray(n) ? o.call(n) : n.length === +n.length ? w.map(n, w.identity) : w.values(n) : []
  }, w.size = function(n) {
    return null == n ? 0 : n.length === +n.length ? n.length : w.keys(n).length
  }, w.first = w.head = w.take = function(n, t, r) {
    return null == n ? void 0 : null == t || r ? n[0] : o.call(n, 0, t)
  }, w.initial = function(n, t, r) {
    return o.call(n, 0, n.length - (null == t || r ? 1 : t))
  }, w.last = function(n, t, r) {
    return null == n ? void 0 : null == t || r ? n[n.length - 1] : o.call(n, Math.max(n.length - t, 0))
  }, w.rest = w.tail = w.drop = function(n, t, r) {
    return o.call(n, null == t || r ? 1 : t)
  }, w.compact = function(n) {
    return w.filter(n, w.identity)
  };
  var R = function(n, t, r) {
    return A(n, function(n) {
      w.isArray(n) ? t ? a.apply(r, n) : R(n, t, r) : r.push(n)
    }), r
  };
  w.flatten = function(n, t) {
    return R(n, t, [])
  }, w.without = function(n) {
    return w.difference(n, o.call(arguments, 1))
  }, w.uniq = w.unique = function(n, t, r, e) {
    w.isFunction(t) && (e = r, r = t, t = !1);
    var u = r ? w.map(n, r, e) : n, i = [], a = [];
    return A(u, function(r, e) {
      (t ? e && a[a.length - 1] === r : w.contains(a, r)) || (a.push(r), i.push(n[e]))
    }), i
  }, w.union = function() {
    return w.uniq(c.apply(e, arguments))
  }, w.intersection = function(n) {
    var t = o.call(arguments, 1);
    return w.filter(w.uniq(n), function(n) {
      return w.every(t, function(t) {
        return w.indexOf(t, n) >= 0
      })
    })
  }, w.difference = function(n) {
    var t = c.apply(e, o.call(arguments, 1));
    return w.filter(n, function(n) {
      return!w.contains(t, n)
    })
  }, w.zip = function() {
    for(var n = o.call(arguments), t = w.max(w.pluck(n, "length")), r = Array(t), e = 0;t > e;e++) {
      r[e] = w.pluck(n, "" + e)
    }
    return r
  }, w.object = function(n, t) {
    if(null == n) {
      return{}
    }
    for(var r = {}, e = 0, u = n.length;u > e;e++) {
      t ? r[n[e]] = t[e] : r[n[e][0]] = n[e][1]
    }
    return r
  }, w.indexOf = function(n, t, r) {
    if(null == n) {
      return-1
    }
    var e = 0, u = n.length;
    if(r) {
      if("number" != typeof r) {
        return e = w.sortedIndex(n, t), n[e] === t ? e : -1
      }
      e = 0 > r ? Math.max(0, u + r) : r
    }
    if(y && n.indexOf === y) {
      return n.indexOf(t, r)
    }
    for(;u > e;e++) {
      if(n[e] === t) {
        return e
      }
    }
    return-1
  }, w.lastIndexOf = function(n, t, r) {
    if(null == n) {
      return-1
    }
    var e = null != r;
    if(b && n.lastIndexOf === b) {
      return e ? n.lastIndexOf(t, r) : n.lastIndexOf(t)
    }
    for(var u = e ? r : n.length;u--;) {
      if(n[u] === t) {
        return u
      }
    }
    return-1
  }, w.range = function(n, t, r) {
    1 >= arguments.length && (t = n || 0, n = 0), r = arguments[2] || 1;
    for(var e = Math.max(Math.ceil((t - n) / r), 0), u = 0, i = Array(e);e > u;) {
      i[u++] = n, n += r
    }
    return i
  }, w.bind = function(n, t) {
    if(n.bind === j && j) {
      return j.apply(n, o.call(arguments, 1))
    }
    var r = o.call(arguments, 2);
    return function() {
      return n.apply(t, r.concat(o.call(arguments)))
    }
  }, w.partial = function(n) {
    var t = o.call(arguments, 1);
    return function() {
      return n.apply(this, t.concat(o.call(arguments)))
    }
  }, w.bindAll = function(n) {
    var t = o.call(arguments, 1);
    return 0 === t.length && (t = w.functions(n)), A(t, function(t) {
      n[t] = w.bind(n[t], n)
    }), n
  }, w.memoize = function(n, t) {
    var r = {};
    return t || (t = w.identity), function() {
      var e = t.apply(this, arguments);
      return w.has(r, e) ? r[e] : r[e] = n.apply(this, arguments)
    }
  }, w.delay = function(n, t) {
    var r = o.call(arguments, 2);
    return setTimeout(function() {
      return n.apply(null, r)
    }, t)
  }, w.defer = function(n) {
    return w.delay.apply(w, [n, 1].concat(o.call(arguments, 1)))
  }, w.throttle = function(n, t) {
    var r, e, u, i, a = 0, o = function() {
      a = new Date, u = null, i = n.apply(r, e)
    };
    return function() {
      var c = new Date, l = t - (c - a);
      return r = this, e = arguments, 0 >= l ? (clearTimeout(u), u = null, a = c, i = n.apply(r, e)) : u || (u = setTimeout(o, l)), i
    }
  }, w.debounce = function(n, t, r) {
    var e, u;
    return function() {
      var i = this, a = arguments, o = function() {
        e = null, r || (u = n.apply(i, a))
      }, c = r && !e;
      return clearTimeout(e), e = setTimeout(o, t), c && (u = n.apply(i, a)), u
    }
  }, w.once = function(n) {
    var t, r = !1;
    return function() {
      return r ? t : (r = !0, t = n.apply(this, arguments), n = null, t)
    }
  }, w.wrap = function(n, t) {
    return function() {
      var r = [n];
      return a.apply(r, arguments), t.apply(this, r)
    }
  }, w.compose = function() {
    var n = arguments;
    return function() {
      for(var t = arguments, r = n.length - 1;r >= 0;r--) {
        t = [n[r].apply(this, t)]
      }
      return t[0]
    }
  }, w.after = function(n, t) {
    return 0 >= n ? t() : function() {
      return 1 > --n ? t.apply(this, arguments) : void 0
    }
  }, w.keys = _ || function(n) {
    if(n !== Object(n)) {
      throw new TypeError("Invalid object");
    }
    var t = [];
    for(var r in n) {
      w.has(n, r) && (t[t.length] = r)
    }
    return t
  }, w.values = function(n) {
    var t = [];
    for(var r in n) {
      w.has(n, r) && t.push(n[r])
    }
    return t
  }, w.pairs = function(n) {
    var t = [];
    for(var r in n) {
      w.has(n, r) && t.push([r, n[r]])
    }
    return t
  }, w.invert = function(n) {
    var t = {};
    for(var r in n) {
      w.has(n, r) && (t[n[r]] = r)
    }
    return t
  }, w.functions = w.methods = function(n) {
    var t = [];
    for(var r in n) {
      w.isFunction(n[r]) && t.push(r)
    }
    return t.sort()
  }, w.extend = function(n) {
    return A(o.call(arguments, 1), function(t) {
      if(t) {
        for(var r in t) {
          n[r] = t[r]
        }
      }
    }), n
  }, w.pick = function(n) {
    var t = {}, r = c.apply(e, o.call(arguments, 1));
    return A(r, function(r) {
      r in n && (t[r] = n[r])
    }), t
  }, w.omit = function(n) {
    var t = {}, r = c.apply(e, o.call(arguments, 1));
    for(var u in n) {
      w.contains(r, u) || (t[u] = n[u])
    }
    return t
  }, w.defaults = function(n) {
    return A(o.call(arguments, 1), function(t) {
      if(t) {
        for(var r in t) {
          null == n[r] && (n[r] = t[r])
        }
      }
    }), n
  }, w.clone = function(n) {
    return w.isObject(n) ? w.isArray(n) ? n.slice() : w.extend({}, n) : n
  }, w.tap = function(n, t) {
    return t(n), n
  };
  var I = function(n, t, r, e) {
    if(n === t) {
      return 0 !== n || 1 / n == 1 / t
    }
    if(null == n || null == t) {
      return n === t
    }
    n instanceof w && (n = n._wrapped), t instanceof w && (t = t._wrapped);
    var u = l.call(n);
    if(u != l.call(t)) {
      return!1
    }
    switch(u) {
      case "[object String]":
        return n == t + "";
      case "[object Number]":
        return n != +n ? t != +t : 0 == n ? 1 / n == 1 / t : n == +t;
      case "[object Date]":
      ;
      case "[object Boolean]":
        return+n == +t;
      case "[object RegExp]":
        return n.source == t.source && n.global == t.global && n.multiline == t.multiline && n.ignoreCase == t.ignoreCase
    }
    if("object" != typeof n || "object" != typeof t) {
      return!1
    }
    for(var i = r.length;i--;) {
      if(r[i] == n) {
        return e[i] == t
      }
    }
    r.push(n), e.push(t);
    var a = 0, o = !0;
    if("[object Array]" == u) {
      if(a = n.length, o = a == t.length) {
        for(;a-- && (o = I(n[a], t[a], r, e));) {
        }
      }
    }else {
      var c = n.constructor, f = t.constructor;
      if(c !== f && !(w.isFunction(c) && c instanceof c && w.isFunction(f) && f instanceof f)) {
        return!1
      }
      for(var s in n) {
        if(w.has(n, s) && (a++, !(o = w.has(t, s) && I(n[s], t[s], r, e)))) {
          break
        }
      }
      if(o) {
        for(s in t) {
          if(w.has(t, s) && !a--) {
            break
          }
        }
        o = !a
      }
    }
    return r.pop(), e.pop(), o
  };
  w.isEqual = function(n, t) {
    return I(n, t, [], [])
  }, w.isEmpty = function(n) {
    if(null == n) {
      return!0
    }
    if(w.isArray(n) || w.isString(n)) {
      return 0 === n.length
    }
    for(var t in n) {
      if(w.has(n, t)) {
        return!1
      }
    }
    return!0
  }, w.isElement = function(n) {
    return!(!n || 1 !== n.nodeType)
  }, w.isArray = x || function(n) {
    return"[object Array]" == l.call(n)
  }, w.isObject = function(n) {
    return n === Object(n)
  }, A(["Arguments", "Function", "String", "Number", "Date", "RegExp"], function(n) {
    w["is" + n] = function(t) {
      return l.call(t) == "[object " + n + "]"
    }
  }), w.isArguments(arguments) || (w.isArguments = function(n) {
    return!(!n || !w.has(n, "callee"))
  }), "function" != typeof/./ && (w.isFunction = function(n) {
    return"function" == typeof n
  }), w.isFinite = function(n) {
    return isFinite(n) && !isNaN(parseFloat(n))
  }, w.isNaN = function(n) {
    return w.isNumber(n) && n != +n
  }, w.isBoolean = function(n) {
    return n === !0 || n === !1 || "[object Boolean]" == l.call(n)
  }, w.isNull = function(n) {
    return null === n
  }, w.isUndefined = function(n) {
    return n === void 0
  }, w.has = function(n, t) {
    return f.call(n, t)
  }, w.noConflict = function() {
    return n._ = t, this
  }, w.identity = function(n) {
    return n
  }, w.times = function(n, t, r) {
    for(var e = Array(n), u = 0;n > u;u++) {
      e[u] = t.call(r, u)
    }
    return e
  }, w.random = function(n, t) {
    return null == t && (t = n, n = 0), n + Math.floor(Math.random() * (t - n + 1))
  };
  var M = {escape:{"&":"&amp;", "<":"&lt;", ">":"&gt;", '"':"&quot;", "'":"&#x27;", "/":"&#x2F;"}};
  M.unescape = w.invert(M.escape);
  var S = {escape:RegExp("[" + w.keys(M.escape).join("") + "]", "g"), unescape:RegExp("(" + w.keys(M.unescape).join("|") + ")", "g")};
  w.each(["escape", "unescape"], function(n) {
    w[n] = function(t) {
      return null == t ? "" : ("" + t).replace(S[n], function(t) {
        return M[n][t]
      })
    }
  }), w.result = function(n, t) {
    if(null == n) {
      return null
    }
    var r = n[t];
    return w.isFunction(r) ? r.call(n) : r
  }, w.mixin = function(n) {
    A(w.functions(n), function(t) {
      var r = w[t] = n[t];
      w.prototype[t] = function() {
        var n = [this._wrapped];
        return a.apply(n, arguments), D.call(this, r.apply(w, n))
      }
    })
  };
  var N = 0;
  w.uniqueId = function(n) {
    var t = ++N + "";
    return n ? n + t : t
  }, w.templateSettings = {evaluate:/<%([\s\S]+?)%>/g, interpolate:/<%=([\s\S]+?)%>/g, escape:/<%-([\s\S]+?)%>/g};
  var T = /(.)^/, q = {"'":"'", "\\":"\\", "\r":"r", "\n":"n", "\t":"t", "\u2028":"u2028", "\u2029":"u2029"}, B = /\\|'|\r|\n|\t|\u2028|\u2029/g;
  w.template = function(n, t, r) {
    var e;
    r = w.defaults({}, r, w.templateSettings);
    var u = RegExp([(r.escape || T).source, (r.interpolate || T).source, (r.evaluate || T).source].join("|") + "|$", "g"), i = 0, a = "__p+='";
    n.replace(u, function(t, r, e, u, o) {
      return a += n.slice(i, o).replace(B, function(n) {
        return"\\" + q[n]
      }), r && (a += "'+\n((__t=(" + r + "))==null?'':_.escape(__t))+\n'"), e && (a += "'+\n((__t=(" + e + "))==null?'':__t)+\n'"), u && (a += "';\n" + u + "\n__p+='"), i = o + t.length, t
    }), a += "';\n", r.variable || (a = "with(obj||{}){\n" + a + "}\n"), a = "var __t,__p='',__j=Array.prototype.join," + "print=function(){__p+=__j.call(arguments,'');};\n" + a + "return __p;\n";
    try {
      e = Function(r.variable || "obj", "_", a)
    }catch(o) {
      throw o.source = a, o;
    }
    if(t) {
      return e(t, w)
    }
    var c = function(n) {
      return e.call(this, n, w)
    };
    return c.source = "function(" + (r.variable || "obj") + "){\n" + a + "}", c
  }, w.chain = function(n) {
    return w(n).chain()
  };
  var D = function(n) {
    return this._chain ? w(n).chain() : n
  };
  w.mixin(w), A(["pop", "push", "reverse", "shift", "sort", "splice", "unshift"], function(n) {
    var t = e[n];
    w.prototype[n] = function() {
      var r = this._wrapped;
      return t.apply(r, arguments), "shift" != n && "splice" != n || 0 !== r.length || delete r[0], D.call(this, r)
    }
  }), A(["concat", "join", "slice"], function(n) {
    var t = e[n];
    w.prototype[n] = function() {
      return D.call(this, t.apply(this._wrapped, arguments))
    }
  }), w.extend(w.prototype, {chain:function() {
    return this._chain = !0, this
  }, value:function() {
    return this._wrapped
  }})
}).call(this);
var XRegExp;
XRegExp = XRegExp || function(n) {
  function v(n, i, r) {
    var u;
    for(u in t.prototype) {
      t.prototype.hasOwnProperty(u) && (n[u] = t.prototype[u])
    }
    return n.xregexp = {captureNames:i, isNative:!!r}, n
  }
  function g(n) {
    return(n.global ? "g" : "") + (n.ignoreCase ? "i" : "") + (n.multiline ? "m" : "") + (n.extended ? "x" : "") + (n.sticky ? "y" : "")
  }
  function o(n, r, u) {
    if(!t.isRegExp(n)) {
      throw new TypeError("type RegExp expected");
    }
    var f = i.replace.call(g(n) + (r || ""), h, "");
    return u && (f = i.replace.call(f, new RegExp("[" + u + "]+", "g"), "")), n = n.xregexp && !n.xregexp.isNative ? v(t(n.source, f), n.xregexp.captureNames ? n.xregexp.captureNames.slice(0) : null) : v(new RegExp(n.source, f), null, !0)
  }
  function a(n, t) {
    var i = n.length;
    if(Array.prototype.lastIndexOf) {
      return n.lastIndexOf(t)
    }
    while(i--) {
      if(n[i] === t) {
        return i
      }
    }
    return-1
  }
  function s(n, t) {
    return Object.prototype.toString.call(n).toLowerCase() === "[object " + t + "]"
  }
  function d(n) {
    return n = n || {}, n === "all" || n.all ? n = {natives:!0, extensibility:!0} : s(n, "string") && (n = t.forEach(n, /[^\s,]+/, function(n) {
      this[n] = !0
    }, {})), n
  }
  function ut(n, t, i, u) {
    var o = p.length, s = null, e, f;
    y = !0;
    try {
      while(o--) {
        if(f = p[o], (f.scope === "all" || f.scope === i) && (!f.trigger || f.trigger.call(u)) && (f.pattern.lastIndex = t, e = r.exec.call(f.pattern, n), e && e.index === t)) {
          s = {output:f.handler.call(u, e, i), match:e};
          break
        }
      }
    }catch(h) {
      throw h;
    }finally {
      y = !1
    }
    return s
  }
  function b(n) {
    t.addToken = c[n ? "on" : "off"], f.extensibility = n
  }
  function tt(n) {
    RegExp.prototype.exec = (n ? r : i).exec, RegExp.prototype.test = (n ? r : i).test, String.prototype.match = (n ? r : i).match, String.prototype.replace = (n ? r : i).replace, String.prototype.split = (n ? r : i).split, f.natives = n
  }
  var t, c, u, f = {natives:!1, extensibility:!1}, i = {exec:RegExp.prototype.exec, test:RegExp.prototype.test, match:String.prototype.match, replace:String.prototype.replace, split:String.prototype.split}, r = {}, k = {}, p = [], e = "default", rt = "class", it = {"default":/^(?:\\(?:0(?:[0-3][0-7]{0,2}|[4-7][0-7]?)?|[1-9]\d*|x[\dA-Fa-f]{2}|u[\dA-Fa-f]{4}|c[A-Za-z]|[\s\S])|\(\?[:=!]|[?*+]\?|{\d+(?:,\d*)?}\??)/, "class":/^(?:\\(?:[0-3][0-7]{0,2}|[4-7][0-7]?|x[\dA-Fa-f]{2}|u[\dA-Fa-f]{4}|c[A-Za-z]|[\s\S]))/}, 
  et = /\$(?:{([\w$]+)}|(\d\d?|[\s\S]))/g, h = /([\s\S])(?=[\s\S]*\1)/g, nt = /^(?:[?*+]|{\d+(?:,\d*)?})\??/, ft = i.exec.call(/()??/, "")[1] === n, l = RegExp.prototype.sticky !== n, y = !1, w = "gim" + (l ? "y" : "");
  return t = function(r, u) {
    if(t.isRegExp(r)) {
      if(u !== n) {
        throw new TypeError("can't supply flags when constructing one RegExp from another");
      }
      return o(r)
    }
    if(y) {
      throw new Error("can't call the XRegExp constructor within token definition functions");
    }
    var l = [], a = e, b = {hasNamedCapture:!1, captureNames:[], hasFlag:function(n) {
      return u.indexOf(n) > -1
    }}, f = 0, c, s, p;
    if(r = r === n ? "" : String(r), u = u === n ? "" : String(u), i.match.call(u, h)) {
      throw new SyntaxError("invalid duplicate regular expression flag");
    }
    for(r = i.replace.call(r, /^\(\?([\w$]+)\)/, function(n, t) {
      if(i.test.call(/[gy]/, t)) {
        throw new SyntaxError("can't use flag g or y in mode modifier");
      }
      return u = i.replace.call(u + t, h, ""), ""
    }), t.forEach(u, /[\s\S]/, function(n) {
      if(w.indexOf(n[0]) < 0) {
        throw new SyntaxError("invalid regular expression flag " + n[0]);
      }
    });f < r.length;) {
      c = ut(r, f, a, b), c ? (l.push(c.output), f += c.match[0].length || 1) : (s = i.exec.call(it[a], r.slice(f)), s ? (l.push(s[0]), f += s[0].length) : (p = r.charAt(f), p === "[" ? a = rt : p === "]" && (a = e), l.push(p), ++f))
    }
    return v(new RegExp(l.join(""), i.replace.call(u, /[^gimy]+/g, "")), b.hasNamedCapture ? b.captureNames : null)
  }, c = {on:function(n, t, r) {
    r = r || {}, n && p.push({pattern:o(n, "g" + (l ? "y" : "")), handler:t, scope:r.scope || e, trigger:r.trigger || null}), r.customFlags && (w = i.replace.call(w + r.customFlags, h, ""))
  }, off:function() {
    throw new Error("extensibility must be installed before using addToken");
  }}, t.addToken = c.off, t.cache = function(n, i) {
    var r = n + "/" + (i || "");
    return k[r] || (k[r] = t(n, i))
  }, t.escape = function(n) {
    return i.replace.call(n, /[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&")
  }, t.exec = function(n, t, i, u) {
    var e = o(t, "g" + (u && l ? "y" : ""), u === !1 ? "y" : ""), f;
    return e.lastIndex = i = i || 0, f = r.exec.call(e, n), u && f && f.index !== i && (f = null), t.global && (t.lastIndex = f ? e.lastIndex : 0), f
  }, t.forEach = function(n, i, r, u) {
    for(var e = 0, o = -1, f;f = t.exec(n, i, e);) {
      r.call(u, f, ++o, n, i), e = f.index + (f[0].length || 1)
    }
    return u
  }, t.globalize = function(n) {
    return o(n, "g")
  }, t.install = function(n) {
    n = d(n), !f.natives && n.natives && tt(!0), !f.extensibility && n.extensibility && b(!0)
  }, t.isInstalled = function(n) {
    return!!f[n]
  }, t.isRegExp = function(n) {
    return s(n, "regexp")
  }, t.matchChain = function(n, i) {
    return function r(n, u) {
      for(var o = i[u].regex ? i[u] : {regex:i[u]}, f = [], s = function(n) {
        f.push(o.backref ? n[o.backref] || "" : n[0])
      }, e = 0;e < n.length;++e) {
        t.forEach(n[e], o.regex, s)
      }
      return u === i.length - 1 || !f.length ? f : r(f, u + 1)
    }([n], 0)
  }, t.replace = function(i, u, f, e) {
    var c = t.isRegExp(u), s = u, h;
    return c ? (e === n && u.global && (e = "all"), s = o(u, e === "all" ? "g" : "", e === "all" ? "" : "g")) : e === "all" && (s = new RegExp(t.escape(String(u)), "g")), h = r.replace.call(String(i), s, f), c && u.global && (u.lastIndex = 0), h
  }, t.split = function(n, t, i) {
    return r.split.call(n, t, i)
  }, t.test = function(n, i, r, u) {
    return!!t.exec(n, i, r, u)
  }, t.uninstall = function(n) {
    n = d(n), f.natives && n.natives && tt(!1), f.extensibility && n.extensibility && b(!1)
  }, t.union = function(n, i) {
    var l = /(\()(?!\?)|\\([1-9]\d*)|\\[\s\S]|\[(?:[^\\\]]|\\[\s\S])*]/g, o = 0, f, h, c = function(n, t, i) {
      var r = h[o - f];
      if(t) {
        if(++o, r) {
          return"(?<" + r + ">"
        }
      }else {
        if(i) {
          return"\\" + (+i + f)
        }
      }
      return n
    }, e = [], r, u;
    if(!(s(n, "array") && n.length)) {
      throw new TypeError("patterns must be a nonempty array");
    }
    for(u = 0;u < n.length;++u) {
      r = n[u], t.isRegExp(r) ? (f = o, h = r.xregexp && r.xregexp.captureNames || [], e.push(t(r.source).source.replace(l, c))) : e.push(t.escape(r))
    }
    return t(e.join("|"), i)
  }, t.version = "2.0.0", r.exec = function(t) {
    var r, f, e, o, u;
    if(this.global || (o = this.lastIndex), r = i.exec.apply(this, arguments), r) {
      if(!ft && r.length > 1 && a(r, "") > -1 && (e = new RegExp(this.source, i.replace.call(g(this), "g", "")), i.replace.call(String(t).slice(r.index), e, function() {
        for(var t = 1;t < arguments.length - 2;++t) {
          arguments[t] === n && (r[t] = n)
        }
      })), this.xregexp && this.xregexp.captureNames) {
        for(u = 1;u < r.length;++u) {
          f = this.xregexp.captureNames[u - 1], f && (r[f] = r[u])
        }
      }
      this.global && !r[0].length && this.lastIndex > r.index && (this.lastIndex = r.index)
    }
    return this.global || (this.lastIndex = o), r
  }, r.test = function(n) {
    return!!r.exec.call(this, n)
  }, r.match = function(n) {
    if(t.isRegExp(n)) {
      if(n.global) {
        var u = i.match.apply(this, arguments);
        return n.lastIndex = 0, u
      }
    }else {
      n = new RegExp(n)
    }
    return r.exec.call(n, this)
  }, r.replace = function(n, r) {
    var e = t.isRegExp(n), u, f, h, o;
    return e ? (n.xregexp && (u = n.xregexp.captureNames), n.global || (o = n.lastIndex)) : n += "", s(r, "function") ? f = i.replace.call(String(this), n, function() {
      var t = arguments, i;
      if(u) {
        for(t[0] = new String(t[0]), i = 0;i < u.length;++i) {
          u[i] && (t[0][u[i]] = t[i + 1])
        }
      }
      return e && n.global && (n.lastIndex = t[t.length - 2] + t[0].length), r.apply(null, t)
    }) : (h = String(this), f = i.replace.call(h, n, function() {
      var n = arguments;
      return i.replace.call(String(r), et, function(t, i, r) {
        var f;
        if(i) {
          if(f = +i, f <= n.length - 3) {
            return n[f] || ""
          }
          if(f = u ? a(u, i) : -1, f < 0) {
            throw new SyntaxError("backreference to undefined group " + t);
          }
          return n[f + 1] || ""
        }
        if(r === "$") {
          return"$"
        }
        if(r === "&" || +r == 0) {
          return n[0]
        }
        if(r === "`") {
          return n[n.length - 1].slice(0, n[n.length - 2])
        }
        if(r === "'") {
          return n[n.length - 1].slice(n[n.length - 2] + n[0].length)
        }
        if(r = +r, !isNaN(r)) {
          if(r > n.length - 3) {
            throw new SyntaxError("backreference to undefined group " + t);
          }
          return n[r] || ""
        }
        throw new SyntaxError("invalid token " + t);
      })
    })), e && (n.lastIndex = n.global ? 0 : o), f
  }, r.split = function(r, u) {
    if(!t.isRegExp(r)) {
      return i.split.apply(this, arguments)
    }
    var e = String(this), h = r.lastIndex, f = [], o = 0, s;
    return u = (u === n ? -1 : u) >>> 0, t.forEach(e, r, function(n) {
      n.index + n[0].length > o && (f.push(e.slice(o, n.index)), n.length > 1 && n.index < e.length && Array.prototype.push.apply(f, n.slice(1)), s = n[0].length, o = n.index + s)
    }), o === e.length ? (!i.test.call(r, "") || s) && f.push("") : f.push(e.slice(o)), r.lastIndex = h, f.length > u ? f.slice(0, u) : f
  }, u = c.on, u(/\\([ABCE-RTUVXYZaeg-mopqyz]|c(?![A-Za-z])|u(?![\dA-Fa-f]{4})|x(?![\dA-Fa-f]{2}))/, function(n, t) {
    if(n[1] === "B" && t === e) {
      return n[0]
    }
    throw new SyntaxError("invalid escape " + n[0]);
  }, {scope:"all"}), u(/\[(\^?)]/, function(n) {
    return n[1] ? "[\\s\\S]" : "\\b\\B"
  }), u(/(?:\(\?#[^)]*\))+/, function(n) {
    return i.test.call(nt, n.input.slice(n.index + n[0].length)) ? "" : "(?:)"
  }), u(/\\k<([\w$]+)>/, function(n) {
    var t = isNaN(n[1]) ? a(this.captureNames, n[1]) + 1 : +n[1], i = n.index + n[0].length;
    if(!t || t > this.captureNames.length) {
      throw new SyntaxError("backreference to undefined group " + n[0]);
    }
    return"\\" + t + (i === n.input.length || isNaN(n.input.charAt(i)) ? "" : "(?:)")
  }), u(/(?:\s+|#.*)+/, function(n) {
    return i.test.call(nt, n.input.slice(n.index + n[0].length)) ? "" : "(?:)"
  }, {trigger:function() {
    return this.hasFlag("x")
  }, customFlags:"x"}), u(/\./, function() {
    return"[\\s\\S]"
  }, {trigger:function() {
    return this.hasFlag("s")
  }, customFlags:"s"}), u(/\(\?P?<([\w$]+)>/, function(n) {
    if(!isNaN(n[1])) {
      throw new SyntaxError("can't use integer as capture name " + n[0]);
    }
    return this.captureNames.push(n[1]), this.hasNamedCapture = !0, "("
  }), u(/\\(\d+)/, function(n, t) {
    if(!(t === e && /^[1-9]/.test(n[1]) && +n[1] <= this.captureNames.length) && n[1] !== "0") {
      throw new SyntaxError("can't use octal escape or backreference to undefined group " + n[0]);
    }
    return n[0]
  }, {scope:"all"}), u(/\((?!\?)/, function() {
    return this.hasFlag("n") ? "(?:" : (this.captureNames.push(null), "(")
  }, {customFlags:"n"}), typeof exports != "undefined" && (exports.XRegExp = t), t
}();
!function($) {
  var Tooltip = function(element, options) {
    this.init("tooltip", element, options)
  };
  Tooltip.prototype = {constructor:Tooltip, init:function(type, element, options) {
    var eventIn, eventOut;
    this.type = type;
    this.$element = $(element);
    this.options = this.getOptions(options);
    this.enabled = true;
    if(this.options.trigger == "click") {
      this.$element.on("click." + this.type, this.options.selector, $.proxy(this.toggle, this))
    }else {
      if(this.options.trigger != "manual") {
        eventIn = this.options.trigger == "hover" ? "mouseenter" : "focus";
        eventOut = this.options.trigger == "hover" ? "mouseleave" : "blur";
        this.$element.on(eventIn + "." + this.type, this.options.selector, $.proxy(this.enter, this));
        this.$element.on(eventOut + "." + this.type, this.options.selector, $.proxy(this.leave, this))
      }
    }
    this.options.selector ? this._options = $.extend({}, this.options, {trigger:"manual", selector:""}) : this.fixTitle()
  }, getOptions:function(options) {
    options = $.extend({}, $.fn[this.type].defaults, options, this.$element.data());
    if(options.delay && typeof options.delay == "number") {
      options.delay = {show:options.delay, hide:options.delay}
    }
    return options
  }, enter:function(e) {
    var self = $(e.currentTarget)[this.type](this._options).data(this.type);
    if(!self.options.delay || !self.options.delay.show) {
      return self.show()
    }
    clearTimeout(this.timeout);
    self.hoverState = "in";
    this.timeout = setTimeout(function() {
      if(self.hoverState == "in") {
        self.show()
      }
    }, self.options.delay.show)
  }, leave:function(e) {
    var self = $(e.currentTarget)[this.type](this._options).data(this.type);
    if(this.timeout) {
      clearTimeout(this.timeout)
    }
    if(!self.options.delay || !self.options.delay.hide) {
      return self.hide()
    }
    self.hoverState = "out";
    this.timeout = setTimeout(function() {
      if(self.hoverState == "out") {
        self.hide()
      }
    }, self.options.delay.hide)
  }, show:function() {
    var $tip, inside, pos, actualWidth, actualHeight, placement, tp;
    if(this.hasContent() && this.enabled) {
      $tip = this.tip();
      this.setContent();
      if(this.options.animation) {
        $tip.addClass("fade")
      }
      placement = typeof this.options.placement == "function" ? this.options.placement.call(this, $tip[0], this.$element[0]) : this.options.placement;
      inside = /in/.test(placement);
      $tip.remove().css({top:0, left:0, display:"block"}).appendTo(inside ? this.$element : document.body);
      pos = this.getPosition(inside);
      actualWidth = $tip[0].offsetWidth;
      actualHeight = $tip[0].offsetHeight;
      switch(inside ? placement.split(" ")[1] : placement) {
        case "bottom":
          tp = {top:pos.top + pos.height, left:pos.left + pos.width / 2 - actualWidth / 2};
          break;
        case "top":
          tp = {top:pos.top - actualHeight, left:pos.left + pos.width / 2 - actualWidth / 2};
          break;
        case "left":
          tp = {top:pos.top + pos.height / 2 - actualHeight / 2, left:pos.left - actualWidth};
          break;
        case "right":
          tp = {top:pos.top + pos.height / 2 - actualHeight / 2, left:pos.left + pos.width};
          break
      }
      $tip.css(tp).addClass(placement).addClass("in")
    }
  }, setContent:function() {
    var $tip = this.tip(), title = this.getTitle();
    $tip.find(".tooltip-inner")[this.options.html ? "html" : "text"](title);
    $tip.removeClass("fade in top bottom left right")
  }, hide:function() {
    var that = this, $tip = this.tip();
    $tip.removeClass("in");
    function removeWithAnimation() {
      var timeout = setTimeout(function() {
        $tip.off($.support.transition.end).remove()
      }, 500);
      $tip.one($.support.transition.end, function() {
        clearTimeout(timeout);
        $tip.remove()
      })
    }
    $.support.transition && this.$tip.hasClass("fade") ? removeWithAnimation() : $tip.remove();
    return this
  }, fixTitle:function() {
    var $e = this.$element;
    if($e.attr("title") || typeof $e.attr("data-original-title") != "string") {
      $e.attr("data-original-title", $e.attr("title") || "").removeAttr("title")
    }
  }, hasContent:function() {
    return this.getTitle()
  }, getPosition:function(inside) {
    return $.extend({}, inside ? {top:0, left:0} : this.$element.offset(), {width:this.$element[0].offsetWidth, height:this.$element[0].offsetHeight})
  }, getTitle:function() {
    var title, $e = this.$element, o = this.options;
    title = $e.attr("data-original-title") || (typeof o.title == "function" ? o.title.call($e[0]) : o.title);
    return title
  }, tip:function() {
    return this.$tip = this.$tip || $(this.options.template)
  }, validate:function() {
    if(!this.$element[0].parentNode) {
      this.hide();
      this.$element = null;
      this.options = null
    }
  }, enable:function() {
    this.enabled = true
  }, disable:function() {
    this.enabled = false
  }, toggleEnabled:function() {
    this.enabled = !this.enabled
  }, toggle:function() {
    this[this.tip().hasClass("in") ? "hide" : "show"]()
  }, destroy:function() {
    this.hide().$element.off("." + this.type).removeData(this.type)
  }};
  $.fn.tooltip = function(option) {
    return this.each(function() {
      var $this = $(this), data = $this.data("tooltip"), options = typeof option == "object" && option;
      if(!data) {
        $this.data("tooltip", data = new Tooltip(this, options))
      }
      if(typeof option == "string") {
        data[option]()
      }
    })
  };
  $.fn.tooltip.Constructor = Tooltip;
  $.fn.tooltip.defaults = {animation:true, placement:"top", selector:false, template:'<div class="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>', trigger:"hover", title:"", delay:0, html:true}
}(window.jQuery);
!function($) {
  var Popover = function(element, options) {
    this.init("popover", element, options)
  };
  Popover.prototype = $.extend({}, $.fn.tooltip.Constructor.prototype, {constructor:Popover, setContent:function() {
    var $tip = this.tip(), title = this.getTitle(), content = this.getContent();
    $tip.find(".popover-title")[this.options.html ? "html" : "text"](title);
    $tip.find(".popover-content > *")[this.options.html ? "html" : "text"](content);
    $tip.removeClass("fade top bottom left right in")
  }, hasContent:function() {
    return this.getTitle() || this.getContent()
  }, getContent:function() {
    var content, $e = this.$element, o = this.options;
    content = $e.attr("data-content") || (typeof o.content == "function" ? o.content.call($e[0]) : o.content);
    return content
  }, tip:function() {
    if(!this.$tip) {
      this.$tip = $(this.options.template)
    }
    return this.$tip
  }, destroy:function() {
    this.hide().$element.off("." + this.type).removeData(this.type)
  }});
  $.fn.popover = function(option) {
    return this.each(function() {
      var $this = $(this), data = $this.data("popover"), options = typeof option == "object" && option;
      if(!data) {
        $this.data("popover", data = new Popover(this, options))
      }
      if(typeof option == "string") {
        data[option]()
      }
    })
  };
  $.fn.popover.Constructor = Popover;
  $.fn.popover.defaults = $.extend({}, $.fn.tooltip.defaults, {placement:"right", trigger:"click", content:"", template:'<div class="popover"><div class="arrow"></div><div class="popover-inner"><h3 class="popover-title"></h3><div class="popover-content"><p></p></div></div></div>'})
}(window.jQuery);
!function($) {
  var Clickover = function(element, options) {
    this.cinit("clickover", element, options)
  };
  Clickover.prototype = $.extend({}, $.fn.popover.Constructor.prototype, {constructor:Clickover, cinit:function(type, element, options) {
    this.attr = {};
    this.attr.me = (Math.random() * 10 + "").replace(/\D/g, "");
    this.attr.click_event_ns = "click." + this.attr.me + " touchstart." + this.attr.me;
    if(!options) {
      options = {}
    }
    options.trigger = "manual";
    this.init(type, element, options);
    this.$element.on("click", this.options.selector, $.proxy(this.clickery, this))
  }, clickery:function(e) {
    if(e) {
      e.preventDefault();
      e.stopPropagation()
    }
    this.options.width && this.tip().width(this.options.width);
    this.options.height && this.tip().height(this.options.height);
    this.options.tip_id && this.tip().attr("id", this.options.tip_id);
    this.options.class_name && this.tip().addClass(this.options.class_name);
    this[this.isShown() ? "hide" : "show"]();
    if(this.isShown()) {
      var that = this;
      this.options.global_close && $("body").on(this.attr.click_event_ns, function(e) {
        if(!that.tip().has(e.target).length) {
          that.clickery()
        }
      });
      this.options.esc_close && $(document).bind("keyup.clickery", function(e) {
        if(e.keyCode == 27) {
          that.clickery()
        }
        return
      });
      !this.options.allow_multiple && $("[data-clickover-open=1]").each(function() {
        $(this).data("clickover") && $(this).data("clickover").clickery()
      });
      this.$element.attr("data-clickover-open", 1);
      this.tip().on("click", '[data-dismiss="clickover"]', $.proxy(this.clickery, this));
      if(this.options.auto_close && this.options.auto_close > 0) {
        this.attr.tid = setTimeout($.proxy(this.clickery, this), this.options.auto_close)
      }
      typeof this.options.onShown == "function" && this.options.onShown.call(this);
      this.$element.trigger("shown")
    }else {
      this.$element.removeAttr("data-clickover-open");
      this.options.esc_close && $(document).unbind("keyup.clickery");
      $("body").off(this.attr.click_event_ns);
      if(typeof this.attr.tid == "number") {
        clearTimeout(this.attr.tid);
        delete this.attr.tid
      }
      typeof this.options.onHidden == "function" && this.options.onHidden.call(this);
      this.$element.trigger("hidden")
    }
  }, isShown:function() {
    return this.tip().hasClass("in")
  }, resetPosition:function() {
    var $tip, inside, pos, actualWidth, actualHeight, placement, tp;
    if(this.hasContent() && this.enabled) {
      $tip = this.tip();
      placement = typeof this.options.placement == "function" ? this.options.placement.call(this, $tip[0], this.$element[0]) : this.options.placement;
      inside = /in/.test(placement);
      pos = this.getPosition(inside);
      actualWidth = $tip[0].offsetWidth;
      actualHeight = $tip[0].offsetHeight;
      switch(inside ? placement.split(" ")[1] : placement) {
        case "bottom":
          tp = {top:pos.top + pos.height, left:pos.left + pos.width / 2 - actualWidth / 2};
          break;
        case "top":
          tp = {top:pos.top - actualHeight, left:pos.left + pos.width / 2 - actualWidth / 2};
          break;
        case "left":
          tp = {top:pos.top + pos.height / 2 - actualHeight / 2, left:pos.left - actualWidth};
          break;
        case "right":
          tp = {top:pos.top + pos.height / 2 - actualHeight / 2, left:pos.left + pos.width};
          break
      }
      $tip.css(tp)
    }
  }, debughide:function() {
    var dt = (new Date).toString();
    console.log(dt + ": clickover hide");
    this.hide()
  }});
  $.fn.clickover = function(option) {
    return this.each(function() {
      var $this = $(this), data = $this.data("clickover"), options = typeof option == "object" && option;
      if(!data) {
        $this.data("clickover", data = new Clickover(this, options))
      }
      if(typeof option == "string") {
        data[option]()
      }
    })
  };
  $.fn.clickover.Constructor = Clickover;
  $.fn.clickover.defaults = $.extend({}, $.fn.popover.defaults, {trigger:"manual", auto_close:0, global_close:1, esc_close:1, onShown:null, onHidden:null, width:null, height:null, tip_id:null, class_name:"clickover", allow_multiple:0})
}(window.jQuery);
var jarvis = jarvis || {};
var COMPILED = true;
jarvis.VERSION = "[[JARVIS-VERSION]]";
jarvis.TOKEN = "[[JARVIS-TOKEN]]";
jarvis.global = this;
jarvis.panelDraw = false;
jarvis.managestate = true;
jarvis.loadTimestamp = new Date;
jarvis.DEBUG = true;
jarvis.DEBUGLEVEL = 10;
jarvis.LOCALE = "en";
jarvis.JarvisPath = "";
jarvis.contentPath = "/assets/";
jarvis.svcPath = "";
jarvis.basePath = "/client/api/";
jarvis.global.CLOSURE_BASE_PATH = "";
jarvis.dateformat = "mmm dd, yyyy";
jarvis.dateboxcssloaded = false;
jarvis.global.CLOSURE_IMPORT_SCRIPT;
jarvis.bootstrap = eval("[[JARVIS-BOOTSTRAP]]");
jarvis.systemStartDate = null;
jarvis.systemEndDate = null;
jarvis.ENABLE_DEBUG_LOADER = true;
if(typeof console != "undefined") {
  console.log("Jarvis Client SDK Started, version " + jarvis.VERSION + ".");
  try {
  }catch(e) {
  }
}else {
  console = {};
  console.log = function() {
  }
}
jarvis.nullFunction = function() {
};
jarvis.identityFunction = function(var_args) {
  return arguments[0]
};
jarvis.abstractMethod = function() {
  throw Error("unimplemented abstract method");
};
jarvis.addSingletonGetter = function(ctor) {
  ctor.getInstance = function() {
    return ctor.instance_ || (ctor.instance_ = new ctor)
  }
};
if(!COMPILED) {
  jarvis.isProvided_ = function(name) {
    return!jarvis.implicitNamespaces_[name] && !!jarvis.getObjectByName(name)
  };
  jarvis.implicitNamespaces_ = {}
}
jarvis.addDependency = function(relPath, provides, requires) {
  if(!COMPILED) {
    var provide, require;
    var path = relPath.replace(/\\/g, "/");
    var deps = jarvis.dependencies_;
    for(var i = 0;provide = provides[i];i++) {
      deps.nameToPath[provide] = path;
      if(!(path in deps.pathToNames)) {
        deps.pathToNames[path] = {}
      }
      deps.pathToNames[path][provide] = true
    }
    for(var j = 0;require = requires[j];j++) {
      if(!(path in deps.requires)) {
        deps.requires[path] = {}
      }
      deps.requires[path][require] = true
    }
  }
};
jarvis.require = function(name) {
  if(!COMPILED) {
    if(jarvis.isProvided_(name)) {
      return
    }
    if(jarvis.ENABLE_DEBUG_LOADER) {
      var path = jarvis.getPathFromDeps_(name);
      if(path) {
        jarvis.included_[path] = true;
        jarvis.writeScripts_();
        return
      }
    }
    var errorMessage = "jarvis.require could not find: " + name;
    if(jarvis.global.console) {
      jarvis.global.console["error"](errorMessage)
    }
    throw Error(errorMessage);
  }
};
jarvis.provide = function(name) {
  if(!COMPILED) {
    if(jarvis.isProvided_(name)) {
      throw Error('Namespace "' + name + '" already declared.');
    }
    delete jarvis.implicitNamespaces_[name];
    var namespace = name;
    while(namespace = namespace.substring(0, namespace.lastIndexOf("."))) {
      if(jarvis.getObjectByName(namespace)) {
        break
      }
      jarvis.implicitNamespaces_[namespace] = true
    }
  }
  jarvis.exportPath_(name)
};
if(!COMPILED) {
  jarvis.included_ = {};
  jarvis.dependencies_ = {pathToNames:{}, nameToPath:{}, requires:{}, visited:{}, written:{}};
  jarvis.inHtmlDocument_ = function() {
    var doc = jarvis.global.document;
    return typeof doc != "undefined" && "write" in doc
  };
  jarvis.findBasePath_ = function() {
    if(jarvis.global.CLOSURE_BASE_PATH) {
      jarvis.basePath = jarvis.global.CLOSURE_BASE_PATH;
      return
    }else {
      if(!jarvis.inHtmlDocument_()) {
        return
      }
    }
    var doc = jarvis.global.document;
    var scripts = doc.getElementsByTagName("script");
    for(var i = scripts.length - 1;i >= 0;--i) {
      var src = scripts[i].src;
      var qmark = src.lastIndexOf("?");
      var l = qmark == -1 ? src.length : qmark;
      if(src.substr(l - 9, 9) == "Jarvis.js") {
        jarvis.basePath = src.substr(0, l - 9);
        return
      }
    }
  };
  jarvis.importScript_ = function(src) {
    var importScript = jarvis.global.CLOSURE_IMPORT_SCRIPT || jarvis.writeScriptTag_;
    if(!jarvis.dependencies_.written[src] && importScript(src)) {
      jarvis.dependencies_.written[src] = true
    }
  };
  jarvis.writeScriptTag_ = function(src) {
    if(jarvis.inHtmlDocument_()) {
      var doc = jarvis.global.document;
      doc.write('<script type="text/javascript" src="' + src + '"></' + "script>");
      return true
    }else {
      return false
    }
  };
  jarvis.writeScripts_ = function() {
    var scripts = [];
    var seenScript = {};
    var deps = jarvis.dependencies_;
    function visitNode(path) {
      if(path in deps.written) {
        return
      }
      if(path in deps.visited) {
        if(!(path in seenScript)) {
          seenScript[path] = true;
          scripts.push(path)
        }
        return
      }
      deps.visited[path] = true;
      if(path in deps.requires) {
        for(var requireName in deps.requires[path]) {
          if(!jarvis.isProvided_(requireName)) {
            if(requireName in deps.nameToPath) {
              visitNode(deps.nameToPath[requireName])
            }else {
              throw Error("Undefined nameToPath for " + requireName);
            }
          }
        }
      }
      if(!(path in seenScript)) {
        seenScript[path] = true;
        scripts.push(path)
      }
    }
    for(var path in jarvis.included_) {
      if(!deps.written[path]) {
        visitNode(path)
      }
    }
    for(var i = 0;i < scripts.length;i++) {
      if(scripts[i]) {
        jarvis.importScript_(jarvis.basePath + scripts[i])
      }else {
        throw Error("Undefined script input");
      }
    }
  };
  jarvis.getPathFromDeps_ = function(rule) {
    if(rule in jarvis.dependencies_.nameToPath) {
      return jarvis.dependencies_.nameToPath[rule]
    }else {
      return null
    }
  };
  jarvis.findBasePath_();
  if(!jarvis.global.CLOSURE_NO_DEPS) {
    jarvis.importScript_(jarvis.basePath + "jarvis.deps.js")
  }
}
jarvis.exportPath_ = function(name, opt_object, opt_objectToExportTo) {
  var parts = name.split(".");
  var cur = opt_objectToExportTo || jarvis.global;
  if(!(parts[0] in cur) && cur.execScript) {
    cur.execScript("var " + parts[0])
  }
  for(var part;parts.length && (part = parts.shift());) {
    if(!parts.length && jarvis.isDef(opt_object)) {
      cur[part] = opt_object
    }else {
      if(cur[part]) {
        cur = cur[part]
      }else {
        cur = cur[part] = {}
      }
    }
  }
};
jarvis.getObjectByName = function(name, opt_obj) {
  var parts = name.split(".");
  var cur = opt_obj || jarvis.global;
  for(var part;part = parts.shift();) {
    if(jarvis.isDefAndNotNull(cur[part])) {
      cur = cur[part]
    }else {
      return null
    }
  }
  return cur
};
jarvis.typeOf = function(value) {
  var s = typeof value;
  if(s == "object") {
    if(value) {
      if(value instanceof Array) {
        return"array"
      }else {
        if(value instanceof Object) {
          return s
        }
      }
      var className = Object.prototype.toString.call((value));
      if(className == "[object Window]") {
        return"object"
      }
      if(className == "[object Array]" || typeof value.length == "number" && typeof value.splice != "undefined" && typeof value.propertyIsEnumerable != "undefined" && !value.propertyIsEnumerable("splice")) {
        return"array"
      }
      if(className == "[object Function]" || typeof value.call != "undefined" && typeof value.propertyIsEnumerable != "undefined" && !value.propertyIsEnumerable("call")) {
        return"function"
      }
    }else {
      return"null"
    }
  }else {
    if(s == "function" && typeof value.call == "undefined") {
      return"object"
    }
  }
  return s
};
jarvis.propertyIsEnumerableCustom_ = function(object, propName) {
  if(propName in object) {
    for(var key in object) {
      if(key == propName && Object.prototype.hasOwnProperty.call(object, propName)) {
        return true
      }
    }
  }
  return false
};
jarvis.propertyIsEnumerable_ = function(object, propName) {
  if(object instanceof Object) {
    return Object.prototype.propertyIsEnumerable.call(object, propName)
  }else {
    return jarvis.propertyIsEnumerableCustom_(object, propName)
  }
};
jarvis.isDef = function(val) {
  return val !== undefined
};
jarvis.isNull = function(val) {
  return val === null
};
jarvis.isDefAndNotNull = function(val) {
  return val != null
};
jarvis.isArray = function(val) {
  return jarvis.typeOf(val) == "array"
};
jarvis.isArrayLike = function(val) {
  var type = jarvis.typeOf(val);
  return type == "array" || type == "object" && typeof val.length == "number"
};
jarvis.isDateLike = function(val) {
  return jarvis.isObject(val) && typeof val.getFullYear == "function"
};
jarvis.isString = function(val) {
  return typeof val == "string"
};
jarvis.isBoolean = function(val) {
  return typeof val == "boolean"
};
jarvis.isNumber = function(val) {
  return typeof val == "number"
};
jarvis.isFunction = function(val) {
  return jarvis.typeOf(val) == "function"
};
jarvis.isObject = function(val) {
  var type = jarvis.typeOf(val);
  return type == "object" || type == "array" || type == "function"
};
Date.dateDiff = function(datepart, fromdate, todate) {
  datepart = datepart.toLowerCase();
  var diff = todate - fromdate;
  var divideBy = {w:6048E5, d:864E5, h:36E5, n:6E4, s:1E3};
  return Math.floor(diff / divideBy[datepart])
};
jarvis.cachestore = [];
jarvis.cache = {};
jarvis.cache.push = function(key, value) {
  var found = false;
  $(jarvis.cachestore).each(function(i, o) {
    if(o.key == key) {
      found = true
    }
  });
  if(!found) {
    jarvis.cachestore.push({key:key, value:value})
  }
};
jarvis.cache.remove = function(key, value) {
  var index = -1;
  $(jarvis.cachestore).each(function(i, o) {
    if(o.key == key) {
      index = i
    }
  });
  jarvis.cachestore.splice(index, 1)
};
jarvis.cache.get = function(key) {
  var result;
  $(jarvis.cachestore).each(function(i, o) {
    if(o.key == key) {
      result = o
    }
  });
  return result
};
function percentageChange(y1, y2) {
  if(y1 == 0) {
    return 0
  }
  return(y2 - y1) / y1 * 100
}
function clone(obj) {
  return jQuery.extend(true, {}, obj)
}
jarvis.colors = ["#058DC7", "#ED7E17", "#50B432", "#AF49C5", "#EDEF00", "#8080FF", "#A0A424", "#E3071C", "#6AF9C4", "#B2DEFF", "#64E572", "#CCCCCC"];
jarvis.offcolors = ["#AADFF3", "#F2D5BD", "#C9E7BE", "#E1C9E8", "#F6F3B1", "#DADBFB", "#E7E6B4", "#F4B3BC", "#AADFF3", "#F2D5BD", "#C9E7BE", "#EEEEEE"];
jarvis.dashboards = [];
jarvis.realtimepanels = [];
jarvis.getDashboard = function() {
  return jarvis.dashboards[0]
};
jarvis.setDashboard = function(dashboard) {
  jarvis.dashboards = [];
  jarvis.dashboards.push(dashboard)
};
jarvis.getRealtimePanel = function() {
  return jarvis.realtimepanels[0]
};
jarvis.setRealtimePanel = function(panel) {
  jarvis.realtimepanels = [];
  jarvis.realtimepanels.push(panel)
};
jarvis.lastState;
jarvis.state = {view:"", dashboardID:-1, panelID:-1, reportID:-1, fromdate:null, todate:null};
jarvis.inSaveState = false;
jarvis.saveState = function(message) {
  if(!jarvis.managestate) {
    return
  }
  if(jarvis.inSaveState == true) {
    jarvis.debug.log("INFO", "jarvis", 5, "Skipping save state (" + message + ")");
    return
  }
  jarvis.inSaveState = true;
  jarvis.debug.log("INFO", "jarvis", 5, "Saving state (" + message + ")");
  var guid = guidGenerator().replace(/-/g, "");
  jarvis.state.guid = guid;
  jarvis.lastState = guid;
  jarvis.state.timestamp = new Date;
  if(typeof localStorage == "undefined") {
    alert("Your browser does not support HTML5 localStorage. Try upgrading.")
  }else {
    try {
      (new jarvis.objects.State).SaveState(this, {id:guid, state:JSON.stringify(jarvis.state)}, function() {
        jarvis.debug.log("INFO", "jarvis", 5, "State saved (" + guid + ")");
        location.hash = guid;
        setTimeout(function() {
          jarvis.inSaveState = false
        }, 500)
      })
    }catch(e) {
      if(e == QUOTA_EXCEEDED_ERR) {
        alert("Quota exceeded!")
      }
    }
  }
};
jarvis.loadState = function(guid) {
  if(guid == "") {
    return null
  }
  if(!jarvis.managestate) {
    return null
  }
  jarvis.debug.log("INFO", "jarvis", 5, "Loading state (" + guid + ")");
  jarvis.inSaveState = true;
  try {
    var result = (new jarvis.objects.State).LoadState(this, {id:guid});
    jarvis.lastState = guid;
    setTimeout(function() {
      jarvis.inSaveState = false
    }, 5E3);
    return JSON.parse(result.data)
  }catch(ex) {
    return null
  }
};
function updateState(hash, initialLoad) {
  hash = location.hash.replace("#", "");
  if(hash == "") {
    return
  }
  if(!jarvis.managestate) {
    return
  }
  jarvis.debug.log("INFO", "jarvis", 5, "Updating state (" + hash + ")");
  if(hash == jarvis.lastState) {
    jarvis.debug.log("INFO", "jarvis", 5, "State hash match.")
  }else {
    var state = jarvis.loadState(hash);
    if(state) {
      jarvis.state = state
    }
    jarvis.visualisation.bootstrap();
    return;
    if(hash == "dashboard") {
      jarvis.state.view = "dashboard";
      jarvis.state.dashboardID = -1
    }else {
      if(hash == "realtime") {
        jarvis.state.view = "realtime";
        jarvis.state.panelID = -1
      }else {
        if(hash == "report") {
          jarvis.state.view = "report";
          jarvis.state.panelID = -1;
          jarvis.state.reportID = -1
        }else {
          if(hash == "homepage") {
            jarvis.state.view = "homepage";
            jarvis.state.panelID = -1
          }
        }
      }
    }
    if(jarvis.state.view == "dashboard") {
      var o = new jarvis.visualisation.dashboard.Panel({panelID:jarvis.state.dashboardID});
      o.init(null, null, true, true, false)
    }
    if(jarvis.state.view == "realtime") {
      var o = new jarvis.visualisation.realtime.Panel({panelID:jarvis.state.panelID});
      o.init(null, null, true, true, false)
    }
    if(jarvis.state.view == "report") {
      var o = new jarvis.visualisation.report.Panel({panelID:jarvis.state.panelID, reportID:jarvis.state.reportID});
      o.init(null, null, true, true, false)
    }
    if(jarvis.state.view == "homepage") {
      jarvis.visualisation.showHomepage()
    }
  }
}
function guidGenerator() {
  var S4 = function() {
    return((1 + Math.random()) * 65536 | 0).toString(16).substring(1)
  };
  return S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4()
}
jarvis.ajaxCounter = 0;
function supportsLocalStorage() {
  try {
    return"localStorage" in window && window["localStorage"] !== null
  }catch(e) {
    return false
  }
}
function purgeCache() {
  localStorage.clear()
}
jarvis.load = function(lib, callback) {
  var bLoadAll = false;
  var bExecuteCallback = false;
  if(typeof lib == "undefined") {
    bLoadAll = true
  }
  if(typeof callback != "function") {
    bExecuteCallback = true
  }
  jarvis.require("jarvis.visualisation")
};
function callback() {
}
jarvis.hostname = "[[JARVIS-HOST]]";
jarvis.endpoints = {content:"[[JARVIS-ENDPOINT-CONTENT]]", query:"[[JARVIS-ENDPOINT-QUERY]]" == "" ? jarvis.hostname : "[[JARVIS-ENDPOINT-QUERY]]", api:"[[JARVIS-ENDPOINT-API]]" == "" ? jarvis.hostname : "[[JARVIS-ENDPOINT-API]]"};
var cssPath = "/assets/css/jarvis.css";
try {
  if(typeof jarvis.hostname == "undefined" || jarvis.hostname == "") {
    var getLocation = function(href) {
      var l = document.createElement("a");
      l.href = href;
      return l
    };
    var scriptSrc = $("script[src*=jarvis\\.js]").attr("src");
    var l = getLocation(scriptSrc);
    jarvis.hostname = window.location.protocol + "//" + window.location.hostname
  }
}catch(e) {
  console.log("Failed to get script source");
  console.log(e)
}
if(!$('link[href*="' + this.cssPath + '"]').length) {
  $("head").append('<style type="text/css">@import "' + this.cssPath + '";</style> ')
}
jarvis.loaded = [];
function group(data, index1, index2) {
  var o;
  var other = {};
  $.each(data, function(i, value) {
    o = data[i][index1][index2];
    if(!(o in other)) {
      other[o] = []
    }
    other[o].push(data[i])
  });
  return other
}
$(document).ready(function() {
  $.fn.removeCss = function() {
    var removedCss = $.makeArray(arguments);
    return this.each(function() {
      var e$ = $(this);
      var style = e$.attr("style");
      if(typeof style !== "string") {
        return
      }
      style = $.trim(style);
      var styles = style.split(/;+/);
      var sl = styles.length;
      for(var l = removedCss.length, i = 0;i < l;i++) {
        var r = removedCss[i];
        if(!r) {
          continue
        }
        for(var j = 0;j < sl;) {
          var sp = $.trim(styles[j]);
          if(!sp || sp.indexOf(r) === 0 && $.trim(sp.substring(r.length)).indexOf(":") === 0) {
            styles.splice(j, 1);
            sl--
          }else {
            j++
          }
        }
      }
      if(styles.length === 0) {
        e$.removeAttr("style")
      }else {
        e$.attr("style", styles.join(";"))
      }
    })
  }
});
function getParameterByName(name) {
  var match = RegExp("[?&]" + name + "=([^&]*)").exec(window.location.search);
  return match && decodeURIComponent(match[1].replace(/\+/g, " "))
}
function scrollTop(destino) {
  var delay = 200;
  $("body").animate({scrollTop:"0px"}, delay);
  return true
}
;jarvis.addDependency("jarvis.string.js", ["jarvis.string"], []);
jarvis.addDependency("jarvis.date.js", ["jarvis.date"], []);
jarvis.addDependency("jarvis.array.js", ["jarvis.array"], []);
jarvis.addDependency("jarvis.debug.js", ["jarvis.debug"], ["jarvis.string", "jarvis.date"]);
jarvis.addDependency("jarvis.DataAccess.js", ["jarvis.dataaccess"], ["jarvis.string", "jarvis.date", "jarvis.debug"]);
jarvis.addDependency("jarvis.objects.js", ["jarvis.objects"], []);
jarvis.addDependency("jarvis.objects.DataSources.js", ["jarvis.objects.DataSources"], ["jarvis.objects"]);
jarvis.addDependency("jarvis.objects.DataTables.js", ["jarvis.objects.DataTables"], ["jarvis.objects", "jarvis.objects.DataSources"]);
jarvis.addDependency("jarvis.objects.Dimensions.js", ["jarvis.objects.Dimensions"], ["jarvis.objects", "jarvis.objects.DataSources"]);
jarvis.addDependency("jarvis.visualisation.realtime.js", ["jarvis.visualisation.realtime"], ["highcharts", "timeago"]);
jarvis.addDependency("jarvis.visualisation.realtime.Panel.js", ["jarvis.visualisation.realtime.Panel"], ["jarvis.visualisation.realtime"]);
jarvis.addDependency("jarvis.visualisation.realtime.Status.js", ["jarvis.visualisation.realtime.Status"], ["jarvis.visualisation.realtime"]);
jarvis.addDependency("jarvis.visualisation.realtime.StartStop.js", ["jarvis.visualisation.realtime.StartStop"], ["jarvis.visualisation.realtime"]);
jarvis.addDependency("jarvis.visualisation.realtime.DateBox.js", ["jarvis.visualisation.realtime.DateBox"], ["jarvis.visualisation.realtime"]);
jarvis.addDependency("jarvis.visualisation.realtime.Timeline.js", ["jarvis.visualisation.realtime.Timeline"], ["jarvis.visualisation.realtime"]);
jarvis.addDependency("jarvis.visualisation.realtime.MetricBox.js", ["jarvis.visualisation.realtime.MetricBox"], ["jarvis.visualisation.realtime"]);
jarvis.addDependency("jarvis.visualisation.realtime.Table.js", ["jarvis.visualisation.realtime.Table"], ["jarvis.visualisation.realtime"]);
jarvis.addDependency("jarvis.visualisation.realtime.Geo.js", ["jarvis.visualisation.realtime.Geo"], ["jarvis.visualisation.realtime"]);
jarvis.addDependency("jarvis.visualisation.dashboard.js", ["jarvis.visualisation.dashboard"], ["highcharts", "timeago", "jarvis.visualisation.picker.DateBox"]);
jarvis.addDependency("jarvis.visualisation.dashboard.Panel.js", ["jarvis.visualisation.dashboard.Panel"], ["jarvis.visualisation.dashboard"]);
jarvis.addDependency("jarvis.visualisation.dashboard.Timeline.js", ["jarvis.visualisation.dashboard.Timeline"], ["jarvis.visualisation.dashboard"]);
jarvis.addDependency("jarvis.visualisation.dashboard.MetricBox.js", ["jarvis.visualisation.dashboard.MetricBox"], ["jarvis.visualisation.dashboard"]);
jarvis.addDependency("jarvis.visualisation.dashboard.Table.js", ["jarvis.visualisation.dashboard.Table"], ["jarvis.visualisation.dashboard"]);
jarvis.addDependency("jarvis.visualisation.dashboard.Pie.js", ["jarvis.visualisation.dashboard.Pie"], ["jarvis.visualisation.dashboard"]);
jarvis.addDependency("jarvis.visualisation.report.js", ["jarvis.visualisation.report"], ["jarvis.visualisation", "highcharts", "timeago"]);
jarvis.addDependency("jarvis.visualisation.report.Panel.js", ["jarvis.visualisation.report.Panel"], ["jarvis.visualisation.report"]);
jarvis.addDependency("jarvis.visualisation.report.Timeline.js", ["jarvis.visualisation.report.Timeline"], ["jarvis.visualisation.report"]);
jarvis.addDependency("jarvis.visualisation.report.MetricBox.js", ["jarvis.visualisation.report.MetricBox"], ["jarvis.visualisation.report"]);
jarvis.addDependency("jarvis.visualisation.report.Table.js", ["jarvis.visualisation.report.Table"], ["jarvis.visualisation.report"]);
jarvis.addDependency("jarvis.visualisation.report.Tabs.js", ["jarvis.visualisation.report.Tabs"], ["jarvis.visualisation.report"]);
jarvis.addDependency("jarvis.visualisation.report.MetricGroup.js", ["jarvis.visualisation.report.MetricGroup"], ["jarvis.visualisation.report"]);
jarvis.addDependency("jarvis.Visualisation.js", ["jarvis.visualisation"], []);
jarvis.addDependency("jarvis.visualisation.picker.js", ["jarvis.visualisation.picker"], ["jarvis.visualisation"]);
jarvis.addDependency("jarvis.visualisation.picker.DateBox.js", ["jarvis.visualisation.picker.DateBox"], ["jarvis.visualisation.picker"]);
jarvis.addDependency("jarvis.visualisation.picker.Metrics.js", ["jarvis.visualisation.picker.metrics"], ["jarvis.visualisation.picker"]);
jarvis.addDependency("jarvis.visualisation.picker.Dimensions.js", ["jarvis.visualisation.picker.dimensions"], ["jarvis.visualisation.picker"]);
jarvis.addDependency("jarvis.visualisation.notice.js", ["jarvis.visualisation.notice"], ["jarvis.visualisation"]);
jarvis.addDependency("jarvis.visualisation.notice.Session.js", ["jarvis.visualisation.notice.Session"], ["jarvis.visualisation.notice"]);
jarvis.addDependency("jarvis.visualisation.container.js", ["jarvis.visualisation.container"], ["jarvis.visualisation"]);
jarvis.addDependency("jarvis.visualisation.container.Metrics.js", ["jarvis.visualisation.container.metrics"], ["jarvis.visualisation.container"]);
jarvis.addDependency("jarvis.visualisation.container.Dimensions.js", ["jarvis.visualisation.container.dimensions"], ["jarvis.visualisation.container"]);
jarvis.addDependency("jarvis.Console.js", ["jarvis.Console"], ["jarvis.visualisation.realtime", "jconsole", "xregexp", "google.base"]);
jarvis.addDependency("jarvis-3rd.min.js", ["jarvis_3rd"], []);
jarvis.require("jarvis_3rd");
jarvis.require("jarvis.dataaccess");
jarvis.require("jarvis.objects");
jarvis.require("jarvis.objects.DataSources");
jarvis.require("jarvis.objects.DataTables");
jarvis.require("jarvis.objects.Dimensions");
jarvis.require("jarvis.objects.Cache");
jarvis.require("jarvis.objects.Auth");
jarvis.require("jarvis.visualisation.realtime");
jarvis.require("jarvis.visualisation.realtime.Panel");
jarvis.require("jarvis.visualisation.realtime.Status");
jarvis.require("jarvis.visualisation.realtime.StartStop");
jarvis.require("jarvis.visualisation.realtime.DateBox");
jarvis.require("jarvis.visualisation.realtime.Timeline");
jarvis.require("jarvis.visualisation.realtime.MetricBox");
jarvis.require("jarvis.visualisation.realtime.Table");
jarvis.require("jarvis.visualisation.realtime.Geo");
jarvis.require("jarvis.visualisation.dashboard");
jarvis.require("jarvis.visualisation.dashboard.Panel");
jarvis.require("jarvis.visualisation.dashboard.Timeline");
jarvis.require("jarvis.visualisation.dashboard.MetricBox");
jarvis.require("jarvis.visualisation.dashboard.Table");
jarvis.require("jarvis.visualisation.dashboard.Pie");
jarvis.require("jarvis.visualisation.notice.Session");
jarvis.require("jarvis.visualisation.notice.Loading");
jarvis.require("jarvis.visualisation.picker.DateBox");
jarvis.require("jarvis.visualisation.report");
jarvis.require("jarvis.visualisation.report.Timeline");
jarvis.require("jarvis.visualisation.report.MetricBox");
jarvis.require("jarvis.visualisation.report.Table");
jarvis.require("jarvis.visualisation.report.Tabs");
jarvis.require("jarvis.visualisation.report.MetricGroup");
jarvis.require("jarvis.visualisation.report.Panel");
jarvis.require("jarvis.visualisation");
jarvis.provide("jarvis.string");
jarvis.string.repeat = function(string, length) {
  return(new Array(length + 1)).join(string)
};
jarvis.string.padNumber = function(num, length, opt_precision, opt_padsymbol) {
  var s = jarvis.isDef(opt_precision) ? num.toFixed(opt_precision) : String(num);
  var index = s.indexOf(".");
  if(index == -1) {
    index = s.length
  }
  if(opt_padsymbol) {
    return jarvis.string.repeat(opt_padsymbol, Math.max(0, length - index)) + s
  }else {
    return jarvis.string.repeat("0", Math.max(0, length - index)) + s
  }
};
jarvis.string.formatNumber = function(number, decimalplaces, commas) {
  number = parseFloat(number);
  if(decimalplaces > -1) {
    number = jarvis.string.roundNumber(number, decimalplaces)
  }
  if(commas == true) {
    number += "";
    x = number.split(".");
    x1 = x[0];
    x2 = x.length > 1 ? "." + x[1] : "";
    var rgx = /(\d+)(\d{3})/;
    while(rgx.test(x1)) {
      x1 = x1.replace(rgx, "$1" + "," + "$2")
    }
    number = x1 + x2
  }
  return number
};
jarvis.string.roundNumber = function(number, decimal_points) {
  if(!decimal_points) {
    return Math.round(number)
  }
  if(number == 0) {
    var decimals = "";
    for(var i = 0;i < decimal_points;i++) {
      decimals += "0"
    }
    return"0." + decimals
  }
  var exponent = Math.pow(10, decimal_points);
  var num = Math.round(number * exponent).toString();
  num = num.slice(0, -1 * decimal_points) + "." + num.slice(-1 * decimal_points);
  if(num < 1 && num > 0) {
    num = "0" + num
  }else {
    if(num > -1 && num < 0) {
      num = "-0" + num.replace("-", "")
    }
  }
  return num
};
jarvis.string.shortenNumber = function(n) {
  if("number" !== typeof n) {
    n = Number(n)
  }
  var sgn = n < 0 ? "-" : "", suffixes = ["k", "M", "G", "T", "P", "E", "Z", "Y"], overflow = Math.pow(10, suffixes.length * 3 + 3), suffix, digits;
  n = Math.abs(Math.round(n));
  if(n < 1E3) {
    return sgn + n
  }
  if(n >= 1E100) {
    return sgn + "many"
  }
  if(n >= overflow) {
    return(sgn + n).replace(/(\.\d*)?e\+?/i, "e")
  }
  do {
    n = Math.floor(n);
    suffix = suffixes.shift();
    digits = n % 1E6;
    n = n / 1E3;
    if(n >= 1E3) {
      continue
    }
    return(sgn + n).replace(/(\.\d\d).*/, "$1") + suffix
  }while(suffixes.length);
  return sgn + "many"
};
jarvis.string.intToTime = function(TimeInSeconds) {
  var sHours = Math.round(TimeInSeconds / 60 / 60 - 0.5, 0).toString();
  var sMinutes = (Math.round(TimeInSeconds / 60 - 0.5, 0) % 60).toString();
  var sSeconds = parseInt(TimeInSeconds % 60).toString();
  if(sHours.length == 1) {
    sHours = "0" + sHours
  }
  if(sMinutes.length == 1) {
    sMinutes = "0" + sMinutes
  }
  if(sSeconds.length == 1) {
    sSeconds = "0" + sSeconds
  }
  return sHours + ":" + sMinutes + ":" + sSeconds
};
jarvis.provide("jarvis.date");
jarvis.require("jarvis.debug");
jarvis.date.getServerTimestamp = function() {
  return new Date
};
jarvis.date.formatDate = function(formatDate, formatString, adjustGMT) {
  if(adjustGMT) {
    formatDate = new Date(formatDate);
    formatDate.setHours(formatDate.getHours() + 3)
  }
  if(formatDate instanceof Date) {
    var months = new Array("Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec");
    var yyyy = formatDate.getFullYear();
    var yy = yyyy.toString().substring(2);
    var m = formatDate.getMonth() + 1;
    var mm = m < 10 ? "0" + m : m;
    var mmm = months[m - 1];
    var d = formatDate.getDate();
    var dd = d < 10 ? "0" + d : d;
    var h = formatDate.getHours();
    var hh = h < 10 ? "0" + h : h;
    var n = formatDate.getMinutes();
    var nn = n < 10 ? "0" + n : n;
    var s = formatDate.getSeconds();
    var ss = s < 10 ? "0" + s : s;
    if(formatString == null) {
      formatString = jarvis.dateformat
    }
    formatString = formatString.replace(/yyyy/i, yyyy);
    formatString = formatString.replace(/yy/i, yy);
    formatString = formatString.replace(/mmm/i, mmm);
    formatString = formatString.replace(/mm/i, mm);
    formatString = formatString.replace(/dd/i, dd);
    formatString = formatString.replace(/hh/i, hh);
    formatString = formatString.replace(/nn/i, nn);
    formatString = formatString.replace(/ss/i, ss);
    return formatString
  }else {
    return""
  }
};
jarvis.date.flatDate = function(sDate) {
  var x = new Date(sDate);
  x.setHours(x.getHours() - x.getTimezoneOffset() / 60);
  return x
};
jarvis.provide("jarvis.array");
jarvis.array.min = function(array) {
  return _.min(array)
};
jarvis.array.max = function(array) {
  return _.max(array)
};
jarvis.provide("jarvis.debug");
jarvis.require("jarvis.string");
jarvis.debug.log = function(type, module, level, message) {
  if(jarvis.DEBUG && jarvis.DEBUGLEVEL >= level) {
    var timepassed = new Date - jarvis.loadTimestamp;
    timepassed = jarvis.string.padNumber(timepassed / 1E3, 4, 3, " ");
    if(level <= jarvis.DEBUGLEVEL) {
      console.log("[" + timepassed + "s] " + "[" + module + "] " + message)
    }
  }
};
jarvis.debug.log("INFO", "Debug", 6, "JS source loaded");
jarvis.provide("jarvis.dataaccess");
jarvis.require("jarvis.debug");
jarvis.require("jarvis.date");
jarvis.require("jarvis.string");
jarvis.dataaccess;
jarvis.dataaccess.fetch = function(sender, endPoint, queryOptions, callback, timeout) {
  try {
    if(_gaq) {
      _gaq.push(["_trackPageview", "jarvis/fetch"]);
      _gaq.push(["_trackEvent", "jarvis", "fetch", ""])
    }
  }catch(e) {
  }
  if(jarvis.basePath && endPoint.indexOf("://") == -1) {
    endPoint = jarvis.svcPath + endPoint
  }
  endPoint = jarvis.endpoints.api + endPoint;
  if(typeof callback !== "function") {
    jarvis.debug.log("INFO", "jarvis.dataaccess", 5, "Executing Sync: " + endPoint)
  }else {
    jarvis.debug.log("INFO", "jarvis.dataaccess", 5, "Executing Async: " + endPoint)
  }
  var oResult = null;
  var options = {type:"GET", timeout:timeout ? timeout : null, dataType:"json", async:typeof callback === "function", url:endPoint, contentType:"application/json;", data:queryOptions, beforeSend:function(xhr, settings) {
    xhr.setRequestHeader("joola-token", jarvis.TOKEN);
    $(".simpleloading").css("display", "block");
    $(".simpleloading").show()
  }, error:function(xhr, textStatus, error) {
    console.log("Error during ajax call.", jarvis.inSaveState, textStatus, error);
    if(!jarvis.inSaveState) {
      if(xhr.status == 500 || xhr.readyState != 0) {
        jarvis.visualisation.showError(error);
        if(typeof callback === "function") {
          callback(sender, null, error)
        }else {
          if(!jarvis.inSaveState) {
            throw error;
          }
        }
      }
    }
  }, success:function(result, textstatus, xhrreq) {
    try {
      if(typeof callback !== "function") {
      }
      if(result == null) {
      }else {
        if(result.resultcode == 500) {
          throw{message:result.resulttext};
        }else {
          if(typeof callback === "function") {
            callback(sender, result, this)
          }else {
            oResult = result
          }
        }
      }
    }catch(e) {
      console.log("Exception during ajax call: " + e.message);
      jarvis.visualisation.showError(e.message);
      if(typeof callback === "function") {
        callback(sender, result, this)
      }else {
        throw e;
      }
    }
  }};
  try {
    var request = $.ajax(options)
  }catch(e) {
    throw e;
  }
  return oResult
};
jarvis.dataaccess.prepareAjax = function(sender, endPoint, queryOptions, callback) {
  try {
    if(_gaq) {
      _gaq.push(["_trackPageview", "jarvis/fetch"]);
      _gaq.push(["_trackEvent", "jarvis", "prepareAjax", ""])
    }
  }catch(e) {
  }
  endPoint = jarvis.endpoints.query + endPoint;
  var options = {type:"GET", dataType:"json", url:endPoint, contentType:"application/json;", xhrFields:{withCredentials:true}, data:queryOptions, beforeSend:function(xhr, settings) {
    xhr.setRequestHeader("joola-token", jarvis.TOKEN)
  }, error:function(xhr, textStatus, error) {
    console.log("Error during ajax call.", textStatus, error);
    if(xhr.status == 500 || xhr.readyState != 0) {
      jarvis.visualisation.showError(error)
    }
    jarvis.debug.log("ERROR", "jarvis.dataaccess", 5, "Executing Multi Async: " + endPoint + ", error: " + error)
  }, success:function(result) {
    result.id = queryOptions.id;
    callback(result)
  }};
  try {
    return $.ajax(options)
  }catch(e) {
    console.log(e);
    return null
  }
};
jarvis.dataaccess.multifetch = function(sender, endPoint, queryOptions, callback) {
  try {
  }catch(e) {
  }
  jarvis.debug.log("INFO", "jarvis.dataaccess", 5, "Executing Multiple ASync: " + endPoint);
  if(jarvis.basePath) {
    endPoint = jarvis.JarvisPath + endPoint
  }
  var results = [];
  var ajaxRequests = [];
  $(queryOptions).each(function(index, item) {
    results.push(null);
    ajaxRequests.push(jarvis.dataaccess.prepareAjax(sender, endPoint, item, function(data) {
      if(data.resultcode != "200") {
        throw data.resulttext;
      }else {
        results[index] = data
      }
    }))
  });
  var waitCounter = ajaxRequests.length;
  $(ajaxRequests).each(function(index, item) {
    item.done(function(args) {
      if(--waitCounter == 0) {
        callback(sender, results, null)
      }
    })
  })
};
jarvis.dataaccess.dimensions = [];
jarvis.dataaccess.metrics = [];
jarvis.dataaccess.realtimepanels = [];
jarvis.dataaccess.dashboards = [];
jarvis.dataaccess.reports = [];
jarvis.dataaccess.getWidget = function(id) {
  var data = jarvis.dataaccess.fetch(this, "/engine/RealtimePanels.svc/GetWidget", {ID:id}, null);
  data = $.parseJSON(data.data);
  return data
};
jarvis.dataaccess.getDashboardWidget = function(id) {
  var data = jarvis.dataaccess.fetch(this, "/engine/Dashboards.svc/GetWidget", {ID:id}, null);
  data = $.parseJSON(data.data);
  return data
};
(function($) {
  var ajaxQueue = $({});
  $.ajaxQueue = function(ajaxOpts) {
    var jqXHR, dfd = $.Deferred(), promise = dfd.promise();
    ajaxQueue.queue(doRequest);
    promise.abort = function(statusText) {
      if(jqXHR) {
        return jqXHR.abort(statusText)
      }
      var queue = ajaxQueue.queue(), index = $.inArray(doRequest, queue);
      if(index > -1) {
        queue.splice(index, 1)
      }
      dfd.rejectWith(ajaxOpts.context || ajaxOpts, [promise, statusText, ""]);
      return promise
    };
    function doRequest(next) {
      jqXHR = $.ajax(ajaxOpts).then(next, next).done(dfd.resolve).fail(dfd.reject)
    }
    return promise
  }
})(jQuery);
jarvis.debug.log("INFO", "jarvis.dataaccess", 6, "JS source loaded");
jarvis.provide("jarvis.Console");
jarvis.require("jconsole");
jarvis.require("xregexp");
jarvis.require("jarvis.visualisation.realtime");
jarvis.require("google.base");
var consoleheight = 450;
var optionGroups = [];
var traceLevel = 10;
var initialPrompt = 'query fetch ("2012-10-01T00:00:00", "2012-10-30T23:59:59.999", "Game", "Session Count, Player Count", "Day", "true", "", "", "", "0", "false")';
consoleheight = Math.round($(window).height() - $(window).height() * 0.26);
jarvis.Console = function(Container) {
  this._moduleName = "Console";
  this.Container = Container;
  var _html = "";
  _html = '<div class="bottomwrapper">' + '<div class="logwrapper">' + '<div class="logheader" style="display: none">' + '<div class="minimize" style="float:right;margin-right:5px;margin-top:3px;cursor:pointer;"><i class="icon-chevron-down"></i></div>' + "</div>" + '<div id="log" style="display:block;height:0;"></div>' + "</div>" + '<div class="jarvisPrompt">' + "</div>" + "</div>";
  $(this.Container).append(_html);
  var timer = goog.now();
  if(jarvis.visualisation.realtime.connected) {
    jarvis.debug.log("INFO", "Subscribing to comet channel (already connected) - " + "tracer", 6, "JS source loaded");
    var client_id = PokeIn.GetClientId();
    var queryOptions = {ClientID:client_id};
    jarvis.dataaccess.fetch(this, "/engine/Realtime.svc/trace", queryOptions, function() {
    })
  }else {
    jarvis.debug.log("INFO", "Subscribing to comet channel (bind) - " + "tracer", 6, "JS source loaded");
    $(jarvis.realtime).bind("cometstart", function(e) {
      var client_id = PokeIn.GetClientId();
      var queryOptions = {ClientID:client_id};
      jarvis.dataaccess.fetch(this, "/engine/Realtime.svc/trace", queryOptions, function() {
      })
    })
  }
  window.jarvisResponse_Trace = this.jarvisResponse_Trace;
  _console = window.console;
  window.console = {log:function(msg) {
    _console.log.apply(_console, [msg])
  }, error:function(msg) {
    logger.severe(msg)
  }, info:function(msg) {
    logger.info(msg)
  }, shout:function(msg) {
    logger.shout(msg)
  }, fine:function(msg) {
    logger.fine(msg)
  }, finer:function(msg) {
    logger.finer(msg)
  }, finest:function(msg) {
    logger.finest(msg)
  }};
  goog.debug.LogManager.getRoot().setLevel(goog.debug.Logger.Level.ALL);
  var logger = goog.debug.Logger.getLogger("Jarvis");
  var logconsole = new goog.debug.DivConsole(goog.dom.getElement("log"));
  logconsole.setCapturing(true);
  var jarvisPrompt = $(".jarvisPrompt");
  var controller2 = jarvisPrompt.console({promptLabel:"Jarvis> ", animateScroll:true, autofocus:true, promptHistory:true, commandValidate:function(line) {
    return line != ""
  }, commandHandle:function(line) {
    console.finest("> " + line);
    var shouldExecuteEndPoint = true;
    var endPoint = "";
    var command = $.trim(line).toLowerCase().split(" ");
    if(command.length == 1) {
      var $command = $.trim(command[0]);
      if($command == "help") {
        console.info(usage());
        return true
      }else {
        if($command == "clear") {
          logconsole.clear();
          return true
        }else {
          if($command == "stage") {
          }else {
            if($command.indexOf("trace") > -1) {
              var _tracelevel = $command.split("=")[1];
              traceLevel = parseInt(_tracelevel);
              console.info("Trace level set to " + traceLevel)
            }else {
              var found = false;
              $(optionGroups).each(function(index, optionGroup) {
                if(optionGroup.name.toLowerCase() == $command) {
                  found = true
                }
              });
              if(!found) {
                shouldExecuteEndPoint = false;
                console.error("Command not found. Please type 'help' for a complete list of commands.");
                return true
              }else {
                shouldExecuteEndPoint = false;
                console.error("Option not specified or incorrect. Please type 'help' for a complete list of commands.");
                return true
              }
            }
          }
        }
      }
    }else {
      var $command = $.trim(command[0]);
      var $action = $.trim(command[1]);
      var re = /("([^"]*)")/g;
      var $params = line.match(re);
      $($params).each(function(index, item) {
        item = item.replace(/"/g, "")
      });
      var found = false;
      $(optionGroups).each(function(index, optionGroup) {
        if(optionGroup.name.toLowerCase() == $command) {
          found = true;
          var optionfound = false;
          $(optionGroup.methods).each(function(index, method) {
            if(method.name.toLowerCase() == $action) {
              optionfound = true;
              endPoint = optionGroup.endPoint + "/" + $action + "?";
              try {
                $(method.params).each(function(index, param) {
                  if($params[index] == null || $params[index] == "undefined") {
                    if(param.type == "dateTime") {
                      param.value = "1900-01-01"
                    }else {
                      if(param.type == "TimeResolution") {
                        param.value = "Day"
                      }else {
                        if(param.type == "boolean") {
                          param.value = false
                        }else {
                          param.value = ""
                        }
                      }
                    }
                    endPoint += param.name + "=" + param.value + "&"
                  }else {
                    param.value = $params[index].replace(/"/g, "");
                    endPoint += param.name + "=" + param.value + "&"
                  }
                })
              }catch(ex) {
                shouldExecuteEndPoint = false;
                console.error("Option not specified or incorrect. Please type 'help' for a complete list of commands - " + ex);
                return true
              }
            }
          });
          if(!optionfound) {
            shouldExecuteEndPoint = false;
            console.error("Option not specified or incorrect. Please type 'help' for a complete list of commands.");
            return true
          }
        }
      });
      if(!found) {
        console.error("Command not found. Please type 'help' for a complete list of commands.");
        return false
      }
    }
    if(!shouldExecuteEndPoint) {
      return true
    }
    if(endPoint.substring(endPoint.length - 1) == "&") {
      endPoint = endPoint.substring(0, endPoint.length - 1)
    }
    $.get(jarvis.JarvisPath + endPoint, function(result) {
      var s = "";
      if(result.d == null) {
        return
      }
      if(typeof result.d.data == "object") {
        $(result.d.data).each(function(index, item) {
          if(typeof item == "object") {
            $(item).each(function(index, prop) {
              if(typeof prop == "object") {
                s += goog.debug.deepExpose(prop) + "\n"
              }else {
                s += prop + "\n"
              }
            })
          }else {
            s += item + "\n"
          }
        })
      }else {
        try {
          var obj = jQuery.parseJSON(result.d.data);
          s += "\n";
          if(typeof obj == "object") {
            var list = "";
            $.each(obj, function(index, item) {
              list += recurse(index, item, 0)
            });
            s += list
          }else {
            s += obj + "\n"
          }
        }catch(ex) {
          s += result.d.data
        }
      }
      if($.trim(s) != "") {
        console.info(s.replace(/\t/g, "    "));
        $(".consoleobject ul.container:last-of-type").each(function(index, item) {
          var $li = $(this).parent();
          $li.off("click");
          $li.on("click", function(e) {
            e.stopPropagation();
            $(this).toggleClass("on");
            $($(this).find(".container")[0]).toggleClass("on")
          })
        })
      }
    });
    return true
  }});
  console.finer("Jarvis Console Started.");
  console.finer("For a list of commands, type 'help'");
  controller2.promptText(initialPrompt);
  $(".jarvisPrompt").keyup(function(e) {
    if($("#log").height() == 0) {
      $("#log").animate({height:consoleheight}, 200);
      $("#log").addClass("expanded");
      $(".logheader").show();
      $(".logfooter").show();
      $(this).css({opacity:1})
    }
  });
  $(".jarvisPrompt").click(function(e) {
    if($("#log").height() == 0) {
      $("#log").animate({height:consoleheight}, 200);
      $("#log").addClass("expanded");
      $(".logheader").show();
      $(".logfooter").show();
      $(this).css({opacity:1})
    }
  });
  $(".logwrapper").click(function(e) {
    e.stopPropagation()
  });
  $(".minimize").click(function(e) {
    if($("#log").height() == consoleheight) {
      $("#log").animate({height:0}, 200);
      $("#log").removeClass("expanded");
      $(".logheader").hide();
      $(".logfooter").hide();
      $(".jarvisPrompt").css({opacity:0.8})
    }
  });
  $(document).click(function(e) {
    if($("#log").height() == consoleheight) {
      $("#log").animate({height:0}, 200);
      $("#log").removeClass("expanded");
      $(".logheader").hide();
      $(".logfooter").hide();
      $(".jarvisPrompt").css({opacity:0.8})
    }
  });
  buildOptionGroup("/engine/DataSources.svc");
  buildOptionGroup("/engine/DataTables.svc");
  buildOptionGroup("/engine/Dimensions.svc");
  buildOptionGroup("/engine/Metrics.svc");
  buildOptionGroup("/engine/DBMapper.svc");
  buildOptionGroup("/engine/Cache.svc");
  buildOptionGroup("/engine/Query.svc");
  buildOptionGroup("/engine/Realtime.svc");
  buildOptionGroup("/engine/RealtimePanels.svc");
  buildOptionGroup("/engine/Config.svc");
  buildOptionGroup("/engine/License.svc");
  buildOptionGroup("/engine/Reports.svc")
};
function pad(str, padsize) {
  for(i = str.length;i < padsize;i++) {
    str += " "
  }
  return str
}
var _lasttrace = null;
jarvis.Console.prototype.jarvisResponse_Trace = function(message) {
  $(message).each(function(index, result) {
    var source = result.module;
    var type = result.type;
    var message = result.message;
    var _traceLevel = result.traceLevel;
    if(_traceLevel <= traceLevel || type != "Info") {
      switch(type) {
        case "Info":
          console.info(message);
          break;
        case "Warning":
          console.shout(message);
          break;
        case "Error":
          console.error(message);
          break;
        case "Shout":
          console.shout(message);
          break;
        default:
          break
      }
    }
  })
};
function usage() {
  var s = "< Showing usage\n";
  s += "This console allows you to control and manage Jarvis' different components with a set of optiond and commands.\n\n";
  s += "Usage:\n  command [options] ([parameter], [...])\n\n";
  s += "General commands:\n";
  s += " " + pad(" help", 20) + " prints this help message, then exists.\n";
  s += " " + pad(" clear", 20) + " resets the console.\n";
  s += " " + pad(" state", 20) + " shows the engine's current state and stats.\n";
  s += " " + pad(" trace=LEVEL", 20) + " starts the server's trace with the specified trace level (1-10, 10 being most verbose, current: " + traceLevel + ")).\n";
  s += "\n";
  optionGroups = $(optionGroups).sort(function(a, b) {
    return a.name > b.name ? 1 : -1
  });
  $(optionGroups).each(function(index, optionGroup) {
    s += optionGroup.name + " command options: \n";
    $(optionGroup.methods).each(function(index, method) {
      var methodtext = " ";
      methodtext += " " + pad(method.name, 19) + " ";
      if(method.description.length > 0) {
        methodtext += method.description
      }
      methodtext += "\n";
      if(method.params.length > 0) {
        methodtext += pad("", 5);
        $(method.params).each(function(index, param) {
          methodtext += "-" + param.name + ":" + param.type + " "
        });
        methodtext += "\n"
      }
      s += methodtext
    });
    s += "\n"
  });
  s += "\n";
  return s
}
function buildOptionGroup(endPoint) {
  var optionGroup = {endPoint:endPoint, name:endPoint.split("/")[endPoint.split("/").length - 1].replace(".svc", ""), methods:[]};
  $.get(jarvis.JarvisPath + endPoint + "?xsd=xsd0", function(xml) {
    var inputs = xml;
    var xml = $.get(jarvis.JarvisPath + endPoint + "?wsdl", function(xml) {
      $(xml).find("operation").each(function(index, item) {
        var summary = $(item).find("summary").text();
        var $input = $(item).find("input");
        var action = $input.attr("wsaw:Action").split("/")[$input.attr("wsaw:Action").split("/").length - 1];
        var method = {name:action, description:summary, params:[]};
        $(inputs).find('xs\\:element[name="' + action + '"]').each(function(index, item) {
          $(item).find("element").each(function(index, item) {
            method.params.push({name:$(this).attr("name"), type:$(this).attr("type").replace("xs:", "").replace(/q\d:/, "").replace(/q\d\d:/, "")})
          })
        });
        optionGroup.methods.push(method)
      });
      optionGroups.push(optionGroup)
    })
  })
}
function recurse(key, val, level) {
  var list = "";
  var _html = "";
  if(level == 0) {
    list = '<ul class="consoleobject">'
  }
  if(typeof val == "function") {
    list += '<li class="node leaf ' + "level_" + level + '">';
    list += '<span class="key">' + key + '</span>: <span class="value ' + typeof val + '">' + val + "</span>"
  }else {
    if(val instanceof Object) {
      list += '<li class="node ' + "level_" + level + '">';
      list += '<span class="key">' + key + '</span>: <span class="value Object">Object</span><ul class="container">';
      $.each(val, function(index, item) {
        list += recurse(index, item, level + 1)
      });
      list += "</ul>"
    }else {
      list += '<li class="node leaf ' + "level_" + level + '">';
      if(typeof val == "string" && val.indexOf("\r\n") > -1) {
        val = val.replace(/\r\n/g, "<br/>");
        val = val.replace(/\t/g, "&nbsp;&nbsp;&nbsp;&nbsp;")
      }else {
        if(typeof val == "string" && val.indexOf("/Date(") > -1) {
          try {
            val = parseInt(val.replace("/Date(", "").replace(")/", ""));
            val = new Date(val)
          }catch(e) {
          }
        }
      }
      list += '<span class="key">' + key + '</span>: <span class="value ' + typeof val + '">' + (typeof val == "string" ? '"' + val + '"' : val) + "</span>"
    }
  }
  list += "</li>";
  if(level == 0) {
    list += "</ul>"
  }
  _html = list;
  return _html
}
jarvis.debug.log("INFO", "Jarvis.Console", 6, "JS source loaded");
jarvis.provide("jarvis.tests");
jarvis.require("jarvis.debug");
jarvis.require("jarvis.date");
jarvis.require("jarvis.string");
jarvis.tests;
jarvis.tests.init = function() {
};
jarvis.debug.log("INFO", "jarvis.tests", 6, "JS source loaded");
jarvis.tests.init();
jarvis.provide("jarvis.tests.Base");
jarvis.require("jarvis.debug");
jarvis.require("jarvis.date");
jarvis.require("jarvis.string");
jarvis.require("jarvis.tests");
jarvis.tests.Log = function(message, type) {
  var $logger = $(".testlogger");
  var $message = $('<div class="message"></div>');
  if(type == "header") {
    $message.addClass("header")
  }
  if(type == "error") {
    $message.addClass("error")
  }
  $message.html(message);
  $logger.append($message)
};
var timerset = false;
var intervaltoken = 0;
jarvis.tests.updateDisplay = function() {
  if(!jarvis.tests.base.end) {
    $(".base_txt_exec").html(jarvis.tests.base.executingcounter)
  }else {
    $(".base_caption_exec").html("Queries Executed");
    $(".base_txt_exec").html(jarvis.tests.base.totalcounter)
  }
  $(".base_txt_failed").html(jarvis.tests.base.failedcounter);
  $(".base_txt_success").html(jarvis.string.roundNumber(jarvis.tests.base.successcounter / jarvis.tests.base.totalcounter * 100, 0, false) + "%");
  if(!jarvis.tests.deep.end) {
    $(".deep_txt_exec").html(jarvis.tests.deep.executingcounter)
  }else {
    $(".deep_caption_exec").html("Queries Executed");
    $(".deep_txt_exec").html(jarvis.tests.deep.totalcounter)
  }
  $(".deep_txt_failed").html(jarvis.tests.deep.failedcounter);
  $(".deep_txt_success").html(jarvis.string.roundNumber(jarvis.tests.deep.successcounter / jarvis.tests.deep.totalcounter * 100, 0, false) + "%");
  if(!jarvis.tests.filters.end) {
    $(".filters_txt_exec").html(jarvis.tests.filters.executingcounter)
  }else {
    $(".filters_caption_exec").html("Queries Executed");
    $(".filters_txt_exec").html(jarvis.tests.filters.totalcounter)
  }
  $(".filters_txt_failed").html(jarvis.tests.filters.failedcounter);
  $(".filters_txt_success").html(jarvis.string.roundNumber(jarvis.tests.filters.successcounter / jarvis.tests.filters.totalcounter * 100, 0, false) + "%");
  if(!timerset) {
    timerset = true;
    intervaltoken = setInterval(function() {
      if(!jarvis.tests.base.end) {
        $(".base_txt_duration").html(jarvis.string.formatNumber((new Date - jarvis.tests.base.start) / 1E3, 0) + " sec.")
      }else {
        $(".base_txt_duration").html(jarvis.string.formatNumber((jarvis.tests.base.end - jarvis.tests.base.start) / 1E3, 0) + " sec.")
      }
      if(!jarvis.tests.deep.end) {
        $(".deep_txt_duration").html(jarvis.string.formatNumber((new Date - jarvis.tests.deep.start) / 1E3, 0) + " sec.")
      }else {
        $(".deep_txt_duration").html(jarvis.string.formatNumber((jarvis.tests.deep.end - jarvis.tests.deep.start) / 1E3, 0) + " sec.")
      }
      if(!jarvis.tests.filters.end) {
        $(".filters_txt_duration").html(jarvis.string.formatNumber((new Date - jarvis.tests.filters.start) / 1E3, 0) + " sec.")
      }else {
        $(".filters_txt_duration").html(jarvis.string.formatNumber((jarvis.tests.filters.end - jarvis.tests.filters.start) / 1E3, 0) + " sec.")
      }
      if(jarvis.tests.base.end && jarvis.tests.deep.end && jarvis.tests.filters.end) {
        window.clearInterval(intervaltoken)
      }
    }, 1E3)
  }
};
jarvis.tests.base = {};
jarvis.tests.deep = {};
jarvis.tests.filters = {};
jarvis.tests.base.start = null;
jarvis.tests.base.end = null;
jarvis.tests.deep.start = null;
jarvis.tests.deep.end = null;
jarvis.tests.filters.start = null;
jarvis.tests.filters.end = null;
jarvis.tests.base.totalcounter = 0;
jarvis.tests.base.executingcounter = 0;
jarvis.tests.base.failedcounter = 0;
jarvis.tests.base.successcounter = 0;
jarvis.tests.deep.totalcounter = 0;
jarvis.tests.deep.executingcounter = 0;
jarvis.tests.deep.failedcounter = 0;
jarvis.tests.deep.successcounter = 0;
jarvis.tests.filters.totalcounter = 0;
jarvis.tests.filters.executingcounter = 0;
jarvis.tests.filters.failedcounter = 0;
jarvis.tests.filters.successcounter = 0;
jarvis.tests.startdate = new Date(2013, 0, 1);
jarvis.tests.enddate = new Date(2013, 0, 1);
jarvis.tests.servers = [""];
jarvis.tests.fetch = function(group, title, options) {
  try {
    switch(group) {
      case "base":
        if(jarvis.tests.base.executingcounter == 0) {
          jarvis.tests.base.start = new Date
        }
        jarvis.tests.base.totalcounter++;
        jarvis.tests.base.executingcounter++;
        break;
      case "deep":
        if(jarvis.tests.deep.executingcounter == 0) {
          jarvis.tests.deep.start = new Date
        }
        jarvis.tests.deep.totalcounter++;
        jarvis.tests.deep.executingcounter++;
        break;
      case "filters":
        if(jarvis.tests.filters.executingcounter == 0) {
          jarvis.tests.filters.start = new Date
        }
        jarvis.tests.filters.totalcounter++;
        jarvis.tests.filters.executingcounter++;
        break;
      default:
        break
    }
    jarvis.dataaccess.fetch(this, jarvis.tests.servers[0] + "/engine/Query.svc/fetch", options, function(sender, result, error) {
      title = title.replace("#URL", error.url);
      title = group + "::" + title;
      if(result.resultcode == "200") {
        switch(group) {
          case "base":
            jarvis.tests.base.executingcounter--;
            jarvis.tests.base.successcounter++;
            if(jarvis.tests.base.executingcounter == 0) {
              jarvis.tests.base.end = new Date
            }
            break;
          case "deep":
            jarvis.tests.deep.executingcounter--;
            jarvis.tests.deep.successcounter++;
            if(jarvis.tests.deep.executingcounter == 0) {
              jarvis.tests.deep.end = new Date
            }
            break;
          case "filters":
            jarvis.tests.filters.executingcounter--;
            jarvis.tests.filters.successcounter++;
            if(jarvis.tests.filters.executingcounter == 0) {
              jarvis.tests.filters.end = new Date
            }
            break;
          default:
            break
        }
        jarvis.tests.updateDisplay()
      }else {
        jarvis.tests.Log(title + ":: FAIL</a>", "error");
        switch(group) {
          case "base":
            jarvis.tests.base.executingcounter--;
            jarvis.tests.base.failedcounter++;
            if(jarvis.tests.base.executingcounter == 0) {
              jarvis.tests.base.end = new Date
            }
            break;
          case "deep":
            jarvis.tests.deep.executingcounter--;
            jarvis.tests.deep.failedcounter++;
            if(jarvis.tests.deep.executingcounter == 0) {
              jarvis.tests.deep.end = new Date
            }
            break;
          case "filters":
            jarvis.tests.filters.executingcounter--;
            jarvis.tests.filters.failedcounter++;
            if(jarvis.tests.filters.executingcounter == 0) {
              jarvis.tests.filters.end = new Date
            }
            break;
          default:
            break
        }
        jarvis.tests.updateDisplay()
      }
    })
  }catch(e) {
    switch(group) {
      case "base":
        jarvis.tests.base.executingcounter--;
        jarvis.tests.base.failedcounter++;
        if(jarvis.tests.base.executingcounter == 0) {
          jarvis.tests.base.end = new Date
        }
        break;
      case "deep":
        jarvis.tests.deep.executingcounter--;
        jarvis.tests.deep.failedcounter++;
        if(jarvis.tests.deep.executingcounter == 0) {
          jarvis.tests.deep.end = new Date
        }
        break;
      case "filters":
        jarvis.tests.filters.executingcounter--;
        jarvis.tests.filters.failedcounter++;
        if(jarvis.tests.filters.executingcounter == 0) {
          jarvis.tests.filters.end = new Date
        }
        break;
      default:
        break
    }
    jarvis.tests.Log(title + ":: EXCEPTION</a>", "error");
    jarvis.tests.Log(e.message, "error")
  }
  if(jarvis.tests.executingcounter == 0) {
    jarvis.tests.end = new Date
  }
  jarvis.tests.updateDisplay()
};
jarvis.tests.Base.RunAll = function(sender, options, callback) {
  var result = false;
  jarvis.inSaveState = true;
  jarvis.objects.Dimensions.List();
  var startdate = jarvis.tests.startdate;
  var enddate = jarvis.tests.enddate;
  var reports = jarvis.objects.Reports.List();
  jarvis.tests.Log("Found " + reports.length + " reports...", "header");
  $(reports).each(function(rid, report) {
    $(report.Tabs).each(function(tid, tab) {
      $(tab.MetricGroups).each(function(mgid, mg) {
        var _metrics = [];
        $(mg.Metrics).each(function(mid, metric) {
          _metrics.push(metric);
          var _queryOptions = {id:"primary", FromDate:jarvis.date.formatDate(startdate, "yyyy-mm-dd hh:nn:ss.000"), ToDate:jarvis.date.formatDate(enddate, "yyyy-mm-dd hh:nn:ss.999"), Dimensions:"", Metrics:metric.Name, Resolution:"Day", omitDate:true, Filter:""};
          try {
            var title = '<a target="_blank" href="#URL">TEST RESULT: ' + "Report: " + report.Name + ", Tab: " + tab.Name + ", MG: " + mg.Name + ", Metric: " + metric.Name;
            jarvis.tests.fetch("base", title, _queryOptions)
          }catch(e) {
            throw e;
          }
        });
        var metricslist = "";
        $(_metrics).each(function(i, o) {
          metricslist += o.Name + ","
        });
        if(metricslist.length > 0) {
          metricslist = metricslist.substr(0, metricslist.length - 1)
        }
        var _queryOptions = {id:"primary", FromDate:jarvis.date.formatDate(startdate, "yyyy-mm-dd hh:nn:ss.000"), ToDate:jarvis.date.formatDate(enddate, "yyyy-mm-dd hh:nn:ss.999"), Dimensions:"", Metrics:metricslist, Resolution:"Day", omitDate:true, Filter:""};
        try {
          var title = '<a target="_blank" href="#URL">TEST RESULT: ' + "Report: " + report.Name + ", Tab: " + tab.Name + ", MG: " + mg.Name + ", Metrics: ALL";
          jarvis.tests.fetch("base", title, _queryOptions)
        }catch(e) {
          throw e;
        }
        var _dimensions = [];
        $(tab.Dimensions).each(function(did, dimension) {
          _dimensions.push(dimension);
          var _queryOptions = {id:"primary", FromDate:jarvis.date.formatDate(startdate, "yyyy-mm-dd hh:nn:ss.000"), ToDate:jarvis.date.formatDate(enddate, "yyyy-mm-dd hh:nn:ss.999"), Dimensions:dimension.Name, Metrics:metricslist, Resolution:"Day", omitDate:true, Filter:""};
          try {
            var title = '<a target="_blank" href="#URL">TEST RESULT: ' + "Report: " + report.Name + ", Tab: " + tab.Name + ", MG: " + mg.Name + ", Metrics: ALL, Dimension: " + dimension.Name;
            jarvis.tests.fetch("base", title, _queryOptions)
          }catch(e) {
            throw e;
          }
          $(jarvis.objects.Dimensions).each(function(sdid, sdimension) {
            if(sdimension.ColumnName != sdimension.DictionaryTable_Column && dimension.Name != sdimension.Name) {
              var _queryOptions = {id:"primary", FromDate:jarvis.date.formatDate(startdate, "yyyy-mm-dd hh:nn:ss.000"), ToDate:jarvis.date.formatDate(enddate, "yyyy-mm-dd hh:nn:ss.999"), Dimensions:dimension.Name + "," + sdimension.Name, Metrics:metricslist, Resolution:"Day", omitDate:true, Filter:""};
              try {
                var title = '<a target="_blank" href="#URL">TEST RESULT: ' + "Report: " + report.Name + ", Tab: " + tab.Name + ", MG: " + mg.Name + ", Metrics: ALL, Dimensions: " + dimension.Name + "," + sdimension.Name
              }catch(e) {
                throw e;
              }
            }
          });
          $(jarvis.objects.Dimensions).each(function(sdid, sdimension) {
            if(sdimension.ColumnName != sdimension.DictionaryTable_Column && dimension.Name != sdimension.Name) {
              var _queryOptions = {id:"primary", FromDate:jarvis.date.formatDate(startdate, "yyyy-mm-dd hh:nn:ss.000"), ToDate:jarvis.date.formatDate(enddate, "yyyy-mm-dd hh:nn:ss.999"), Dimensions:dimension.Name, Metrics:metricslist, Resolution:"Day", omitDate:true, Filter:sdimension.Name + "=" + "abc"};
              try {
                var title = '<a target="_blank" href="#URL">TEST RESULT: ' + "Report: " + report.Name + ", Tab: " + tab.Name + ", MG: " + mg.Name + ", Metrics: ALL, Dimension: " + dimension.Name + ",  Filter: " + sdimension.Name + '="abc"'
              }catch(e) {
                throw e;
              }
            }
          })
        });
        var dimlist = "";
        $(_dimensions).each(function(i, o) {
          dimlist += o.Name + ","
        });
        if(dimlist.length > 0) {
          dimlist = dimlist.substr(0, dimlist.length - 1)
        }
        var _queryOptions = {id:"primary", FromDate:jarvis.date.formatDate(startdate, "yyyy-mm-dd hh:nn:ss.000"), ToDate:jarvis.date.formatDate(enddate, "yyyy-mm-dd hh:nn:ss.999"), Dimensions:dimlist, Metrics:metricslist, Resolution:"Day", omitDate:true, Filter:""};
        try {
          var title = '<a target="_blank" href="#URL">TEST RESULT: ' + "Report: " + report.Name + ", Tab: " + tab.Name + ", MG: " + mg.Name + ", Metrics: ALL, Dimension: ALL";
          jarvis.tests.fetch("base", title, _queryOptions)
        }catch(e) {
          throw e;
        }
      })
    })
  });
  return result
};
jarvis.tests.Base.RunTopLevel = function(sender, options, callback) {
  var result = false;
  jarvis.inSaveState = true;
  (new jarvis.objects.Cache).PurgeResults();
  jarvis.objects.Dimensions.List();
  var startdate = options.startdate;
  var enddate = options.enddate;
  var reports = jarvis.objects.Reports.List();
  $(reports).each(function(rid, report) {
    $(report.Tabs).each(function(tid, tab) {
      $(tab.MetricGroups).each(function(mgid, mg) {
        var _metrics = [];
        $(mg.Metrics).each(function(mid, metric) {
          _metrics.push(metric);
          var _queryOptions = {id:"primary", FromDate:jarvis.date.formatDate(startdate, "yyyy-mm-dd hh:nn:ss.000"), ToDate:jarvis.date.formatDate(enddate, "yyyy-mm-dd hh:nn:ss.999"), Dimensions:"", Metrics:metric.Name, Resolution:"Day", omitDate:true, Filter:""};
          try {
            var title = '<a target="_blank" href="#URL">TEST RESULT: ' + "Report: " + report.Name + ", Tab: " + tab.Name + ", MG: " + mg.Name + ", Metric: " + metric.Name;
            jarvis.tests.fetch("base", title, _queryOptions)
          }catch(e) {
            throw e;
          }
        });
        var metricslist = "";
        $(_metrics).each(function(i, o) {
          metricslist += o.Name + ","
        });
        if(metricslist.length > 0) {
          metricslist = metricslist.substr(0, metricslist.length - 1)
        }
        var _dimensions = [];
        $(tab.Dimensions).each(function(did, dimension) {
          _dimensions.push(dimension);
          var _queryOptions = {id:"primary", FromDate:jarvis.date.formatDate(startdate, "yyyy-mm-dd hh:nn:ss.000"), ToDate:jarvis.date.formatDate(enddate, "yyyy-mm-dd hh:nn:ss.999"), Dimensions:dimension.Name, Metrics:metricslist, Resolution:"Day", omitDate:true, Filter:""};
          try {
            var title = '<a target="_blank" href="#URL">TEST RESULT: ' + "Report: " + report.Name + ", Tab: " + tab.Name + ", MG: " + mg.Name + ", Metrics: ALL, Dimension: " + dimension.Name;
            jarvis.tests.fetch("base", title, _queryOptions)
          }catch(e) {
            throw e;
          }
        })
      })
    })
  });
  return result
};
jarvis.loaded.push("jarvis.tests.Base");
jarvis.debug.log("INFO", "jarvis.tests.Base", 6, "JS source loaded");
jarvis.provide("jarvis.objects");
jarvis.require("jarvis.debug");
jarvis.require("jarvis.date");
jarvis.require("jarvis.string");
jarvis.objects;
jarvis.debug.log("INFO", "jarvis.objects", 6, "JS source loaded");
jarvis.provide("jarvis.objects.Auth");
jarvis.require("jarvis.debug");
jarvis.require("jarvis.date");
jarvis.require("jarvis.string");
jarvis.require("jarvis.objects");
jarvis.objects.Auth = function(options) {
  var start = (new Date).getMilliseconds();
  var _this = this;
  var executionTime = (new Date).getMilliseconds() - start
};
jarvis.objects.Auth.prototype.CheckSession = function(sender, options, callback) {
  var result;
  if(typeof callback == "function") {
    jarvis.dataaccess.fetch(this, "/engine/Auth.svc/CheckSession", null, function(sender, data, error) {
      result = $.parseJSON(data.data);
      callback(sender, result)
    })
  }else {
    result = jarvis.dataaccess.fetch(this, "/engine/Auth.svc/CheckSession", null, null)
  }
  return result
};
jarvis.objects.Auth.prototype.GetToken = function(sender, options, callback) {
  var result;
  if(typeof callback == "function") {
    jarvis.dataaccess.fetch(this, "/engine/Auth.svc/GetToken", null, function(sender, data, error) {
      result = $.parseJSON(data.data);
      callback(sender, result)
    })
  }else {
    result = jarvis.dataaccess.fetch(this, "/engine/Auth.svc/GetToken", null, null)
  }
  return result
};
jarvis.objects.Auth.prototype.GetUser = function(sender, options, callback) {
  var result;
  if(typeof callback == "function") {
    jarvis.dataaccess.fetch(this, "/auth.getUser", null, function(sender, data, error) {
      result = data.user;
      callback(sender, result)
    })
  }else {
    result = jarvis.dataaccess.fetch(this, "/auth.getUser", null, null);
    result = result.user
  }
  return result
};
jarvis.loaded.push("jarvis.objects.Auth");
jarvis.debug.log("INFO", "jarvis.objects.Auth", 6, "JS source loaded");
jarvis.provide("jarvis.objects.Auth.Roles");
jarvis.require("jarvis.debug");
jarvis.require("jarvis.date");
jarvis.require("jarvis.string");
jarvis.require("jarvis.objects");
jarvis.objects.Auth.Roles = function(options) {
  var start = (new Date).getMilliseconds();
  var _this = this;
  var executionTime = (new Date).getMilliseconds() - start
};
jarvis.objects.Auth.Roles.prototype.List = function(sender, options, callback) {
  var result;
  if(typeof callback == "function") {
    jarvis.dataaccess.fetch(this, "/engine/Auth.svc/ListRoles", null, function(sender, data, error) {
      result = $.parseJSON(data.data);
      callback(sender, result)
    })
  }else {
    result = jarvis.dataaccess.fetch(this, "/engine/Auth.svc/ListRoles", null, null);
    result = $.parseJSON(result.data)
  }
  return result
};
jarvis.objects.Auth.Roles.prototype.Update = function(sender, options, callback) {
  var result;
  if(typeof callback == "function") {
    jarvis.dataaccess.fetch(this, "/engine/Auth.svc/UpdateRole", {ROLE_ID:options.ROLE_ID, ROLE_Name:options.ROLE_Name, ROLE_Filter:options.ROLE_Filter}, function(sender, data, error) {
      result = $.parseJSON(data.data);
      callback(sender, result)
    })
  }else {
    result = jarvis.dataaccess.fetch(this, "/engine/Auth.svc/UpdateRole", {ROLE_ID:options.ROLE_ID, ROLE_Name:options.ROLE_Name, ROLE_Filter:options.ROLE_Filter}, null);
    result = $.parseJSON(result.data)
  }
  return result
};
jarvis.objects.Auth.Roles.prototype.Delete = function(sender, options, callback) {
  var result;
  if(typeof callback == "function") {
    jarvis.dataaccess.fetch(this, "/engine/Auth.svc/DeleteRole", {ROLE_ID:options.ROLE_ID}, function(sender, data, error) {
      result = $.parseJSON(data.data);
      callback(sender, result)
    })
  }else {
    result = jarvis.dataaccess.fetch(this, "/engine/Auth.svc/DeleteRole", {ROLE_ID:options.ROLE_ID}, null);
    result = $.parseJSON(result.data)
  }
  return result
};
jarvis.objects.Auth.Roles.prototype.AddPermission = function(sender, options, callback) {
  var result;
  if(typeof callback == "function") {
    jarvis.dataaccess.fetch(this, "/engine/Auth.svc/AddRolePermission", {ROLE_ID:options.ROLE_ID, PERMISSION_ID:options.PERMISSION_ID}, function(sender, data, error) {
      result = $.parseJSON(data.data);
      callback(sender, result)
    })
  }else {
    result = jarvis.dataaccess.fetch(this, "/engine/Auth.svc/AddRolePermission", {ROLE_ID:options.ROLE_ID, PERMISSION_ID:options.PERMISSION_ID}, null);
    result = $.parseJSON(result.data)
  }
  return result
};
jarvis.objects.Auth.Roles.prototype.DeletePermission = function(sender, options, callback) {
  var result;
  if(typeof callback == "function") {
    jarvis.dataaccess.fetch(this, "/engine/Auth.svc/DeleteRolePermission", {ROLE_ID:options.ROLE_ID, PERMISSION_ID:options.PERMISSION_ID}, function(sender, data, error) {
      result = $.parseJSON(data.data);
      callback(sender, result)
    })
  }else {
    result = jarvis.dataaccess.fetch(this, "/engine/Auth.svc/DeleteRolePermission", {ROLE_ID:options.ROLE_ID, PERMISSION_ID:options.PERMISSION_ID}, null);
    result = $.parseJSON(result.data)
  }
  return result
};
jarvis.loaded.push("jarvis.objects.Auth.Roles");
jarvis.debug.log("INFO", "jarvis.objects.Auth.Roles", 6, "JS source loaded");
jarvis.provide("jarvis.objects.Auth.Organizations");
jarvis.require("jarvis.debug");
jarvis.require("jarvis.date");
jarvis.require("jarvis.string");
jarvis.require("jarvis.objects");
jarvis.objects.Auth.Organizations = function(options) {
  var start = (new Date).getMilliseconds();
  var _this = this;
  var executionTime = (new Date).getMilliseconds() - start
};
jarvis.objects.Auth.Organizations.prototype.List = function(sender, options, callback) {
  var result;
  if(typeof callback == "function") {
    jarvis.dataaccess.fetch(this, "/engine/Auth.svc/ListOrganizations", null, function(sender, data, error) {
      result = $.parseJSON(data.data);
      callback(sender, result)
    })
  }else {
    result = jarvis.dataaccess.fetch(this, "/engine/Auth.svc/ListOrganizations", null, null);
    result = $.parseJSON(result.data)
  }
  return result
};
jarvis.objects.Auth.Organizations.prototype.Update = function(sender, options, callback) {
  var result;
  if(typeof callback == "function") {
    jarvis.dataaccess.fetch(this, "/engine/Auth.svc/UpdateOrganization", {ORG_ID:options.ORG_ID, ORG_Name:options.ORG_Name, ORG_Filter:options.ORG_Filter}, function(sender, data, error) {
      result = $.parseJSON(data.data);
      callback(sender, result)
    })
  }else {
    result = jarvis.dataaccess.fetch(this, "/engine/Auth.svc/UpdateOrganization", {ORG_ID:options.ORG_ID, ORG_Name:options.ORG_Name, ORG_Filter:options.ORG_Filter}, null);
    result = $.parseJSON(result.data)
  }
  return result
};
jarvis.objects.Auth.Organizations.prototype.Delete = function(sender, options, callback) {
  var result;
  if(typeof callback == "function") {
    jarvis.dataaccess.fetch(this, "/engine/Auth.svc/DeleteOrganization", {ORG_ID:options.ORG_ID}, function(sender, data, error) {
      result = $.parseJSON(data.data);
      callback(sender, result)
    })
  }else {
    result = jarvis.dataaccess.fetch(this, "/engine/Auth.svc/DeleteOrganization", {ORG_ID:options.ORG_ID}, null);
    result = $.parseJSON(result.data)
  }
  return result
};
jarvis.loaded.push("jarvis.objects.Auth.Organizations");
jarvis.debug.log("INFO", "jarvis.objects.Auth.Organizations", 6, "JS source loaded");
jarvis.provide("jarvis.objects.Auth.Users");
jarvis.require("jarvis.debug");
jarvis.require("jarvis.date");
jarvis.require("jarvis.string");
jarvis.require("jarvis.objects");
jarvis.objects.Auth.Users = function(options) {
  var start = (new Date).getMilliseconds();
  var _this = this;
  var executionTime = (new Date).getMilliseconds() - start
};
jarvis.objects.Auth.Users.prototype.List = function(sender, options, callback) {
  var result;
  if(typeof callback == "function") {
    jarvis.dataaccess.fetch(this, "/engine/Auth.svc/ListUsers", null, function(sender, data, error) {
      result = $.parseJSON(data.data);
      callback(sender, result)
    })
  }else {
    result = jarvis.dataaccess.fetch(this, "/engine/Auth.svc/ListUsers", null, null);
    result = $.parseJSON(result.data)
  }
  return result
};
jarvis.objects.Auth.Users.prototype.Update = function(sender, options, callback) {
  var result;
  if(typeof callback == "function") {
    jarvis.dataaccess.fetch(this, "/engine/Auth.svc/UpdateUser", {USR_ID:options.USR_ID, USR_Username:options.USR_Username, USR_Displayname:options.USR_Displayname, USR_Email:options.USR_Email, USR_Filter:options.USR_Filter, USR_ORG_ID:options.USR_ORG_ID}, function(sender, data, error) {
      result = $.parseJSON(data.data);
      callback(sender, result)
    })
  }else {
    result = jarvis.dataaccess.fetch(this, "/engine/Auth.svc/UpdateUser", {USR_ID:options.USR_ID, USR_Username:options.USR_Username, USR_Displayname:options.USR_Displayname, USR_Email:options.USR_Email, USR_Filter:options.USR_Filter, USR_ORG_ID:options.USR_ORG_ID}, null);
    result = $.parseJSON(result.data)
  }
  return result
};
jarvis.objects.Auth.Users.prototype.Delete = function(sender, options, callback) {
  var result;
  if(typeof callback == "function") {
    jarvis.dataaccess.fetch(this, "/engine/Auth.svc/DeleteUser", {USR_ID:options.USR_ID}, function(sender, data, error) {
      result = $.parseJSON(data.data);
      callback(sender, result)
    })
  }else {
    result = jarvis.dataaccess.fetch(this, "/engine/Auth.svc/DeleteUser", {USR_ID:options.USR_ID}, null);
    result = $.parseJSON(result.data)
  }
  return result
};
jarvis.objects.Auth.Users.prototype.AddRole = function(sender, options, callback) {
  var result;
  if(typeof callback == "function") {
    jarvis.dataaccess.fetch(this, "/engine/Auth.svc/AddUserRole", {USR_ID:options.USR_ID, ROLE_ID:options.ROLE_ID}, function(sender, data, error) {
      result = $.parseJSON(data.data);
      callback(sender, result)
    })
  }else {
    result = jarvis.dataaccess.fetch(this, "/engine/Auth.svc/AddUserRole", {USR_ID:options.USR_ID, ROLE_ID:options.ROLE_ID}, null);
    result = $.parseJSON(result.data)
  }
  return result
};
jarvis.objects.Auth.Users.prototype.DeleteRole = function(sender, options, callback) {
  var result;
  if(typeof callback == "function") {
    jarvis.dataaccess.fetch(this, "/engine/Auth.svc/DeleteUserRole", {USR_ID:options.USR_ID, ROLE_ID:options.ROLE_ID}, function(sender, data, error) {
      result = $.parseJSON(data.data);
      callback(sender, result)
    })
  }else {
    result = jarvis.dataaccess.fetch(this, "/engine/Auth.svc/DeleteUserRole", {USR_ID:options.USR_ID, ROLE_ID:options.ROLE_ID}, null);
    result = $.parseJSON(result.data)
  }
  return result
};
jarvis.loaded.push("jarvis.objects.Auth.Users");
jarvis.debug.log("INFO", "jarvis.objects.Auth.Users", 6, "JS source loaded");
jarvis.provide("jarvis.objects.Auth.Permissions");
jarvis.require("jarvis.debug");
jarvis.require("jarvis.date");
jarvis.require("jarvis.string");
jarvis.require("jarvis.objects");
jarvis.objects.Auth.Permissions = function(options) {
  var start = (new Date).getMilliseconds();
  var _this = this;
  var executionTime = (new Date).getMilliseconds() - start
};
jarvis.objects.Auth.Permissions.prototype.List = function(sender, options, callback) {
  var result;
  if(typeof callback == "function") {
    jarvis.dataaccess.fetch(this, "/engine/Auth.svc/ListPermissions", null, function(sender, data, error) {
      result = $.parseJSON(data.data);
      callback(sender, result)
    })
  }else {
    result = jarvis.dataaccess.fetch(this, "/engine/Auth.svc/ListPermissions", null, null);
    result = $.parseJSON(result.data)
  }
  return result
};
jarvis.loaded.push("jarvis.objects.Auth.Permissions");
jarvis.debug.log("INFO", "jarvis.objects.Auth.Permissions", 6, "JS source loaded");
jarvis.provide("jarvis.objects.APITokens");
jarvis.require("jarvis.debug");
jarvis.require("jarvis.date");
jarvis.require("jarvis.string");
jarvis.require("jarvis.objects");
jarvis.objects.APITokens = function(options) {
  var start = (new Date).getMilliseconds();
  var _this = this;
  var executionTime = (new Date).getMilliseconds() - start
};
jarvis.objects.APITokens.prototype.List = function(sender, options, callback) {
  var result;
  if(typeof callback == "function") {
    jarvis.dataaccess.fetch(this, "/engine/APITokens.svc/List", null, function(sender, data, error) {
      result = $.parseJSON(data.data);
      callback(sender, result)
    })
  }else {
    result = jarvis.dataaccess.fetch(this, "/engine/APITokens.svc/List", null, null);
    result = $.parseJSON(result.data)
  }
  return result
};
jarvis.objects.APITokens.prototype.GenerateUserToken = function(sender, options, callback) {
  var result;
  if(typeof callback == "function") {
    jarvis.dataaccess.fetch(this, "/engine/APITokens.svc/GenerateUserToken", {APIToken:options.APIToken, USER_ID:options.USER_ID}, function(sender, data, error) {
      result = $.parseJSON(data.data);
      callback(sender, result)
    })
  }else {
    result = jarvis.dataaccess.fetch(this, "/engine/APITokens.svc/GenerateUserToken", {APIToken:options.APIToken, USER_ID:options.USER_ID}, null);
    result = $.parseJSON(result.data)
  }
  return result
};
jarvis.objects.APITokens.prototype.Update = function(sender, options, callback) {
  var result;
  if(typeof callback == "function") {
    jarvis.dataaccess.fetch(this, "/engine/APITokens.svc/Update", {APT_ID:options.APT_ID, APT_Name:options.APT_Name, APT_GenerateUserTokens:options.APT_GenerateUserTokens, APT_IPRestrictionStart:options.APT_IPRestrictionStart, APT_IPRestrictionEnd:options.APT_IPRestrictionEnd}, function(sender, data, error) {
      result = $.parseJSON(data.data);
      callback(sender, result)
    })
  }else {
    result = jarvis.dataaccess.fetch(this, "/engine/APITokens.svc/Update", {APT_ID:options.APT_ID, APT_Name:options.APT_Name, APT_GenerateUserTokens:options.APT_GenerateUserTokens, APT_IPRestrictionStart:options.APT_IPRestrictionStart, APT_IPRestrictionEnd:options.APT_IPRestrictionEnd}, null);
    result = $.parseJSON(result.data)
  }
  return result
};
jarvis.objects.APITokens.prototype.Expire = function(sender, options, callback) {
  var result;
  if(typeof callback == "function") {
    jarvis.dataaccess.fetch(this, "/engine/APITokens.svc/Expire", {APT_ID:options.APT_ID}, function(sender, data, error) {
      result = $.parseJSON(data.data);
      callback(sender, result)
    })
  }else {
    result = jarvis.dataaccess.fetch(this, "/engine/APITokens.svc/Expire", {APT_ID:options.APT_ID}, null);
    result = $.parseJSON(result.data)
  }
  return result
};
jarvis.loaded.push("jarvis.objects.APITokens");
jarvis.debug.log("INFO", "jarvis.objects.APITokens", 6, "JS source loaded");
jarvis.provide("jarvis.objects.UserTokens");
jarvis.require("jarvis.debug");
jarvis.require("jarvis.date");
jarvis.require("jarvis.string");
jarvis.require("jarvis.objects");
jarvis.objects.UserTokens = function(options) {
  var start = (new Date).getMilliseconds();
  var _this = this;
  var executionTime = (new Date).getMilliseconds() - start
};
jarvis.objects.UserTokens.prototype.List = function(sender, options, callback) {
  var result;
  if(typeof callback == "function") {
    jarvis.dataaccess.fetch(this, "/engine/UserTokens.svc/List", null, function(sender, data, error) {
      result = $.parseJSON(data.data);
      callback(sender, result)
    })
  }else {
    result = jarvis.dataaccess.fetch(this, "/engine/UserTokens.svc/List", null, null);
    result = $.parseJSON(result.data)
  }
  return result
};
jarvis.objects.UserTokens.prototype.Validate = function(sender, options, callback) {
  var result;
  if(typeof callback == "function") {
    jarvis.dataaccess.fetch(this, "/engine/UserTokens.svc/Validate", {token:options.token}, function(sender, data, error) {
      result = $.parseJSON(data.data);
      callback(sender, result)
    })
  }else {
    result = jarvis.dataaccess.fetch(this, "/engine/UserTokens.svc/Validate", {token:options.token}, null);
    result = $.parseJSON(result.data)
  }
  return result
};
jarvis.objects.UserTokens.prototype.Update = function(sender, options, callback) {
  var result;
  if(typeof callback == "function") {
    jarvis.dataaccess.fetch(this, "/engine/UserTokens.svc/Update", {APT_ID:options.APT_ID, APT_Name:options.APT_Name, APT_GenerateUserTokens:options.APT_GenerateUserTokens, APT_IPRestrictionStart:options.APT_IPRestrictionStart, APT_IPRestrictionEnd:options.APT_IPRestrictionEnd}, function(sender, data, error) {
      result = $.parseJSON(data.data);
      callback(sender, result)
    })
  }else {
    result = jarvis.dataaccess.fetch(this, "/engine/UserTokens.svc/Update", {APT_ID:options.APT_ID, APT_Name:options.APT_Name, APT_GenerateUserTokens:options.APT_GenerateUserTokens, APT_IPRestrictionStart:options.APT_IPRestrictionStart, APT_IPRestrictionEnd:options.APT_IPRestrictionEnd}, null);
    result = $.parseJSON(result.data)
  }
  return result
};
jarvis.objects.UserTokens.prototype.Expire = function(sender, options, callback) {
  var result;
  if(typeof callback == "function") {
    jarvis.dataaccess.fetch(this, "/engine/UserTokens.svc/Expire", {USER_ID:options.USER_ID}, function(sender, data, error) {
      result = $.parseJSON(data.data);
      callback(sender, result)
    })
  }else {
    result = jarvis.dataaccess.fetch(this, "/engine/UserTokens.svc/Expire", {USER_ID:options.USER_ID}, null);
    result = $.parseJSON(result.data)
  }
  return result
};
jarvis.objects.UserTokens.prototype.Extend = function(sender, options, callback) {
  var result;
  if(typeof callback == "function") {
    jarvis.dataaccess.fetch(this, "/engine/UserTokens.svc/Extend", {USER_ID:options.USER_ID}, function(sender, data, error) {
      result = $.parseJSON(data.data);
      callback(sender, result)
    })
  }else {
    result = jarvis.dataaccess.fetch(this, "/engine/UserTokens.svc/Extend", {USER_ID:options.USER_ID}, null);
    result = $.parseJSON(result.data)
  }
  return result
};
jarvis.loaded.push("jarvis.objects.UserTokens");
jarvis.debug.log("INFO", "jarvis.objects.UserTokens", 6, "JS source loaded");
jarvis.provide("jarvis.objects.WebOrigins");
jarvis.require("jarvis.debug");
jarvis.require("jarvis.date");
jarvis.require("jarvis.string");
jarvis.require("jarvis.objects");
jarvis.objects.WebOrigins = function(options) {
  var start = (new Date).getMilliseconds();
  var _this = this;
  var executionTime = (new Date).getMilliseconds() - start
};
jarvis.objects.WebOrigins.prototype.List = function(sender, options, callback) {
  var result;
  if(typeof callback == "function") {
    jarvis.dataaccess.fetch(this, "/engine/WebOrigins.svc/List", null, function(sender, data, error) {
      result = $.parseJSON(data.data);
      callback(sender, result)
    })
  }else {
    result = jarvis.dataaccess.fetch(this, "/engine/WebOrigins.svc/List", null, null);
    result = $.parseJSON(result.data)
  }
  return result
};
jarvis.objects.WebOrigins.prototype.Update = function(sender, options, callback) {
  var result;
  if(typeof callback == "function") {
    jarvis.dataaccess.fetch(this, "/engine/WebOrigins.svc/Update", {WEO_ID:options.WEO_ID, HTTPURL:options.HTTPURL}, function(sender, data, error) {
      result = $.parseJSON(data.data);
      callback(sender, result)
    })
  }else {
    result = jarvis.dataaccess.fetch(this, "/engine/WebOrigins.svc/Update", {WEO_ID:options.WEO_ID, HTTPURL:options.HTTPURL}, null);
    result = $.parseJSON(result.data)
  }
  return result
};
jarvis.objects.WebOrigins.prototype.Delete = function(sender, options, callback) {
  var result;
  if(typeof callback == "function") {
    jarvis.dataaccess.fetch(this, "/engine/WebOrigins.svc/Delete", {WEO_ID:options.WEO_ID}, function(sender, data, error) {
      result = $.parseJSON(data.data);
      callback(sender, result)
    })
  }else {
    result = jarvis.dataaccess.fetch(this, "/engine/WebOrigins.svc/Delete", {WEO_ID:options.WEO_ID}, null);
    result = $.parseJSON(result.data)
  }
  return result
};
jarvis.loaded.push("jarvis.objects.WebOrigins");
jarvis.debug.log("INFO", "jarvis.objects.WebOrigins", 6, "JS source loaded");
jarvis.provide("jarvis.objects.Config");
jarvis.require("jarvis.debug");
jarvis.require("jarvis.date");
jarvis.require("jarvis.string");
jarvis.require("jarvis.objects");
jarvis.objects.Config = function(options) {
  var start = (new Date).getMilliseconds();
  var _this = this;
  var executionTime = (new Date).getMilliseconds() - start
};
jarvis.objects.Config.prototype.Get = function(sender, options, callback) {
  var result;
  if(typeof callback == "function") {
    jarvis.dataaccess.fetch(this, "/engine/Config.svc/GetEx", null, function(sender, data, error) {
      result = $.parseJSON(data.data);
      callback(sender, result)
    })
  }else {
    result = jarvis.dataaccess.fetch(this, "/engine/Config.svc/GetEx", null, null)
  }
  return result
};
jarvis.objects.Config.prototype.ExecuteFreeQuery = function(sender, options, callback) {
  var result;
  if(typeof callback == "function") {
    jarvis.dataaccess.fetch(this, "/engine/Config.svc/ExecuteFreeQuery", {code:options.code, param1:options.param1}, function(sender, data, error) {
      result = $.parseJSON(data.data);
      callback(sender, result)
    })
  }else {
    var _result = [];
    result = jarvis.dataaccess.fetch(this, "/engine/Config.svc/ExecuteFreeQuery", {code:options.code, param1:options.param1}, null);
    result = $.parseJSON(result);
    $(result).each(function(index, r) {
      var obj = new Object;
      $(r).each(function(i, col) {
        var key = col.Key;
        var value = col.Value;
        obj[key] = value
      });
      _result.push(obj)
    })
  }
  return _result
};
jarvis.loaded.push("jarvis.objects.Config");
jarvis.debug.log("INFO", "jarvis.objects.Config", 6, "JS source loaded");
jarvis.provide("jarvis.objects.Cache");
jarvis.require("jarvis.debug");
jarvis.require("jarvis.date");
jarvis.require("jarvis.string");
jarvis.require("jarvis.objects");
jarvis.objects.Cache = function(options) {
  var start = (new Date).getMilliseconds();
  var _this = this;
  var executionTime = (new Date).getMilliseconds() - start
};
jarvis.objects.Cache.prototype.PurgeInternal = function(sender, options, callback) {
  var result;
  jarvis.inSaveState = true;
  if(typeof callback == "function") {
    jarvis.dataaccess.fetch(this, "/engine/Cache.svc/PurgeInternal", null, function(sender, data, error) {
      result = $.parseJSON(data.data);
      setTimeout(function() {
        jarvis.inSaveState = false
      }, 5E3);
      callback(sender, result)
    })
  }else {
    result = jarvis.dataaccess.fetch(this, "/engine/Cache.svc/PurgeInternal", null, null);
    setTimeout(function() {
      jarvis.inSaveState = false
    }, 5E3)
  }
  return result
};
jarvis.objects.Cache.prototype.PurgeResults = function(sender, options, callback) {
  var result;
  jarvis.inSaveState = true;
  if(typeof callback == "function") {
    jarvis.dataaccess.fetch(this, "/engine/Cache.svc/PurgeResults", null, function(sender, data, error) {
      result = $.parseJSON(data.data);
      setTimeout(function() {
        jarvis.inSaveState = false
      }, 5E3);
      callback(sender, result)
    })
  }else {
    result = jarvis.dataaccess.fetch(this, "/engine/Cache.svc/PurgeResults", null, null);
    setTimeout(function() {
      jarvis.inSaveState = false
    }, 5E3)
  }
  return result
};
jarvis.objects.Cache.prototype.PurgeAll = function(sender, options, callback) {
  var result;
  jarvis.inSaveState = true;
  if(typeof callback == "function") {
    jarvis.dataaccess.fetch(this, "/engine/Cache.svc/PurgeAll", null, function(sender, data, error) {
      result = $.parseJSON(data.data);
      setTimeout(function() {
        jarvis.inSaveState = false
      }, 5E3);
      callback(sender, result)
    })
  }else {
    result = jarvis.dataaccess.fetch(this, "/engine/Cache.svc/PurgeAll", null, null);
    setTimeout(function() {
      jarvis.inSaveState = false
    }, 5E3)
  }
  return result
};
jarvis.objects.Cache.prototype.PurgeData = function(sender, options, callback) {
  var result;
  jarvis.inSaveState = true;
  if(typeof callback == "function") {
    jarvis.dataaccess.fetch(this, "/engine/Cache.svc/PurgeData", null, function(sender, data, error) {
      result = $.parseJSON(data.data);
      setTimeout(function() {
        jarvis.inSaveState = false
      }, 5E3);
      callback(sender, result)
    })
  }else {
    result = jarvis.dataaccess.fetch(this, "/engine/Cache.svc/PurgeData", null, null);
    setTimeout(function() {
      jarvis.inSaveState = false
    }, 5E3)
  }
  return result
};
jarvis.objects.Cache.prototype.TidyUp = function(sender, options, callback) {
  var result;
  if(typeof callback == "function") {
    jarvis.dataaccess.fetch(this, "/engine/Cache.svc/TidyUp", null, function(sender, data, error) {
      result = $.parseJSON(data.data);
      callback(sender, result)
    })
  }else {
    result = jarvis.dataaccess.fetch(this, "/engine/Cache.svc/TidyUp", null, null)
  }
  return result
};
jarvis.objects.Cache.prototype.Build = function(sender, options, callback) {
  var result;
  if(typeof callback == "function") {
    jarvis.dataaccess.fetch(this, "/engine/Cache.svc/Build", {Tablename:options.tablename, FromDate:options.fromdate, ToDate:options.todate, Resolution:options.resolution}, function(sender, data, error) {
      result = $.parseJSON(data.data);
      callback(sender, result)
    })
  }else {
    result = jarvis.dataaccess.fetch(this, "/engine/Cache.svc/Build", {Tablename:options.tablename, FromDate:options.fromdate, ToDate:options.todate, Resolution:options.resolution, falseExecute:false, Realtime:false}, null)
  }
  return result
};
jarvis.objects.Cache.prototype.RecycleApp = function(sender, options, callback) {
  var result;
  jarvis.inSaveState = true;
  if(typeof callback == "function") {
    jarvis.dataaccess.fetch(this, "/engine/Cache.svc/RecycleApp", null, function(sender, data, error) {
      result = $.parseJSON(data.data);
      setTimeout(function() {
        jarvis.inSaveState = false
      }, 5E3);
      callback(sender, result)
    })
  }else {
    result = jarvis.dataaccess.fetch(this, "/engine/Cache.svc/RecycleApp", null, null);
    setTimeout(function() {
      jarvis.inSaveState = false
    }, 5E3)
  }
  return result
};
jarvis.loaded.push("jarvis.objects.Cache");
jarvis.debug.log("INFO", "jarvis.objects.Cache", 6, "JS source loaded");
jarvis.provide("jarvis.objects.Query");
jarvis.require("jarvis.debug");
jarvis.require("jarvis.date");
jarvis.require("jarvis.string");
jarvis.require("jarvis.objects");
jarvis.objects.Query = function(options) {
  var start = (new Date).getMilliseconds();
  var _this = this;
  var executionTime = (new Date).getMilliseconds() - start
};
jarvis.objects.Query.prototype.SystemStartDate = function(sender, options, callback) {
  var result;
  if(jarvis.systemStartDate != null && typeof callback !== "function") {
    return jarvis.systemStartDate
  }
  jarvis.inSaveState = true;
  if(typeof callback == "function") {
    jarvis.dataaccess.fetch(this, "/status.systemStartDate", null, function(sender, data, error) {
      result = data.startDate;
      jarvis.systemStartDate = new Date(result);
      setTimeout(function() {
        jarvis.inSaveState = false
      }, 1E3);
      callback(sender, result)
    })
  }else {
    result = jarvis.dataaccess.fetch(this, "/status.systemStartDate", null, null);
    result = result.startDate;
    jarvis.systemStartDate = new Date(result);
    setTimeout(function() {
      jarvis.inSaveState = false
    }, 1E3)
  }
  return result
};
jarvis.objects.Query.prototype.SystemEndDate = function(sender, options, callback) {
  var result;
  if(jarvis.systemEndDate != null && typeof callback !== "function") {
    return jarvis.systemEndDate
  }
  jarvis.inSaveState = true;
  if(typeof callback == "function") {
    jarvis.dataaccess.fetch(this, "/status.systemEndDate", null, function(sender, data, error) {
      result = data.endDate;
      jarvis.systemEndDate = new Date(result);
      setTimeout(function() {
        jarvis.inSaveState = false
      }, 1E3);
      callback(sender, result)
    })
  }else {
    result = jarvis.dataaccess.fetch(this, "/status.systemEndDate", null, null);
    result = result.endDate;
    jarvis.systemEndDate = new Date(result);
    setTimeout(function() {
      jarvis.inSaveState = false
    }, 1E3)
  }
  return result
};
jarvis.loaded.push("jarvis.objects.Query");
jarvis.debug.log("INFO", "jarvis.objects.Query", 6, "JS source loaded");
jarvis.provide("jarvis.objects.State");
jarvis.require("jarvis.debug");
jarvis.require("jarvis.date");
jarvis.require("jarvis.string");
jarvis.require("jarvis.objects");
jarvis.objects.State = function(options) {
  var start = (new Date).getMilliseconds();
  var _this = this;
  var executionTime = (new Date).getMilliseconds() - start
};
jarvis.objects.State.prototype.getServerState = function(sender, options, callback) {
  var result;
  if(typeof callback == "function") {
    jarvis.dataaccess.fetch(this, "/engine/State.svc/getServerState", {}, function(sender, data, error) {
      try {
        callback(sender, result)
      }catch(e) {
        callback(sender, null)
      }
    })
  }else {
    result = jarvis.dataaccess.fetch(this, "/engine/State.svc/getServerState", {}, null)
  }
  return result
};
jarvis.objects.State.prototype.SaveState = function(sender, options, callback) {
  var result;
  if(typeof callback == "function") {
    jarvis.dataaccess.fetch(this, "/engine/State.svc/SaveState", {id:options.id, state:options.state}, function(sender, data, error) {
      try {
        result = $.parseJSON(data.data);
        callback(sender, result)
      }catch(e) {
        callback(sender, null)
      }
    })
  }else {
    result = jarvis.dataaccess.fetch(this, "/engine/State.svc/SaveState", {id:options.id, state:options.state}, null)
  }
  return result
};
jarvis.objects.State.prototype.LoadState = function(sender, options, callback) {
  var result;
  if(typeof callback == "function") {
    jarvis.dataaccess.fetch(this, "/engine/State.svc/LoadState", {id:options.id}, function(sender, data, error) {
      result = $.parseJSON(data.data);
      callback(sender, result)
    })
  }else {
    result = jarvis.dataaccess.fetch(this, "/engine/State.svc/LoadState", {id:options.id}, null)
  }
  return result
};
jarvis.objects.State.prototype.GetLog = function(sender, options, callback) {
  var result;
  if(typeof callback == "function") {
    jarvis.dataaccess.fetch(this, "/engine/State.svc/GetLog", null, function(sender, data, error) {
      result = $.parseJSON(data.data);
      callback(sender, result)
    }, 3)
  }else {
    result = jarvis.dataaccess.fetch(this, "/engine/State.svc/GetLog", null, null)
  }
  return result
};
jarvis.loaded.push("jarvis.objects.State");
jarvis.debug.log("INFO", "jarvis.objects.State", 6, "JS source loaded");
jarvis.provide("jarvis.objects.Realtime");
jarvis.require("jarvis.debug");
jarvis.require("jarvis.date");
jarvis.require("jarvis.string");
jarvis.require("jarvis.objects");
jarvis.objects.Realtime = function(options) {
  var start = (new Date).getMilliseconds();
  var _this = this;
  var executionTime = (new Date).getMilliseconds() - start
};
jarvis.objects.Realtime.prototype.Start = function(sender, options, callback) {
  var result;
  if(typeof callback == "function") {
    jarvis.dataaccess.fetch(this, "/engine/Realtime.svc/Start", null, function(sender, data, error) {
      result = $.parseJSON(data.data);
      callback(sender, result)
    })
  }else {
    result = jarvis.dataaccess.fetch(this, "/engine/Realtime.svc/Start", null, null)
  }
  return result
};
jarvis.objects.Realtime.prototype.PurgeAll = function(sender, options, callback) {
  var result;
  if(typeof callback == "function") {
    jarvis.dataaccess.fetch(this, "/engine/Realtime.svc/Stop", null, function(sender, data, error) {
      result = $.parseJSON(data.data);
      callback(sender, result)
    })
  }else {
    result = jarvis.dataaccess.fetch(this, "/engine/Realtime.svc/Stop", null, null)
  }
  return result
};
jarvis.objects.Realtime.prototype.State = function(sender, options, callback) {
  var result;
  if(typeof callback == "function") {
    jarvis.dataaccess.fetch(this, "/engine/Realtime.svc/State", null, function(sender, data, error) {
      result = $.parseJSON(data.data);
      callback(sender, result)
    })
  }else {
    result = jarvis.dataaccess.fetch(this, "/engine/Realtime.svc/State", null, null)
  }
  return result
};
jarvis.loaded.push("jarvis.objects.Realtime");
jarvis.debug.log("INFO", "jarvis.objects.Realtime", 6, "JS source loaded");
jarvis.provide("jarvis.objects.DataSources");
jarvis.require("jarvis.debug");
jarvis.require("jarvis.date");
jarvis.require("jarvis.string");
jarvis.require("jarvis.objects");
jarvis.objects.DataSources = function(options) {
  var start = (new Date).getMilliseconds();
  var _this = this;
  var executionTime = (new Date).getMilliseconds() - start
};
jarvis.objects.DataSources.prototype.List = function(sender, options, callback) {
  var result;
  if(typeof callback == "function") {
    jarvis.dataaccess.fetch(this, "/engine/DataSources.svc/List", null, function(sender, data, error) {
      result = $.parseJSON(data.data);
      callback(sender, result)
    })
  }else {
    result = jarvis.dataaccess.fetch(this, "/engine/DataSources.svc/List", null, null)
  }
  return result
};
jarvis.objects.DataSources.prototype.Get = function(sender, options, callback) {
  var result;
  if(typeof callback == "function") {
    jarvis.dataaccess.fetch(this, "/engine/DataSources.svc/Get", {id:options.id}, function(sender, data, error) {
      result = $.parseJSON(data.data);
      callback(sender, result)
    })
  }else {
    result = jarvis.dataaccess.fetch(this, "/engine/DataSources.svc/Get", {id:options.id}, null)
  }
  return result
};
jarvis.objects.DataSources.prototype.Set = function(sender, options, callback) {
  var result = null;
  if(typeof callback == "function") {
    callback(result)
  }
};
jarvis.objects.DataSources.prototype.State = function(sender, options, callback) {
  var result;
  if(typeof callback == "function") {
    jarvis.dataaccess.fetch(this, "/engine/DataSources.svc/State", {id:options.id}, function(sender, data, error) {
      result = $.parseJSON(data.data);
      callback(sender, result)
    })
  }else {
    result = jarvis.dataaccess.fetch(this, "/engine/DataSources.svc/State", {id:options.id}, null)
  }
  return result
};
jarvis.loaded.push("jarvis.objects.DataSources");
jarvis.debug.log("INFO", "jarvis.objects.DataSources", 6, "JS source loaded");
jarvis.provide("jarvis.objects.DataTables");
jarvis.require("jarvis.debug");
jarvis.require("jarvis.date");
jarvis.require("jarvis.string");
jarvis.require("jarvis.objects");
jarvis.objects.DataTables = [];
jarvis.objects.DataTables.List = function(sender, options, callback) {
  var result;
  if(jarvis.objects.DataTables.length > 0 && typeof callback !== "function") {
    return jarvis.objects.DataTables
  }
  if(typeof callback == "function") {
    jarvis.dataaccess.fetch(this, "/engine/DataTables.svc/List", null, function(sender, data, error) {
      result = $.parseJSON(data.data);
      $(result).each(function(index, item) {
        jarvis.objects.DataTables.push(item)
      });
      callback(sender, result)
    })
  }else {
    result = jarvis.dataaccess.fetch(this, "/engine/DataTables.svc/List", null, null);
    var data = $.parseJSON(result.data);
    $(data).each(function(index, item) {
      jarvis.objects.DataTables.push(item)
    })
  }
  return result
};
jarvis.objects.DataTables.Get = function(sender, options, callback) {
  var result;
  if(typeof callback == "function") {
    jarvis.dataaccess.fetch(this, "/engine/DataTables.svc/Get", {DataSourceID:options.DataSourceID, Schema:options.Schema, TableName:options.TableName}, function(sender, data, error) {
      result = $.parseJSON(data.data);
      callback(sender, result)
    })
  }else {
    result = jarvis.dataaccess.fetch(this, "/engine/DataTables.svc/Get", {DataSourceID:options.DataSourceID, Schema:options.Schema, TableName:options.TableName}, null)
  }
  return result
};
jarvis.objects.DataTables.GetByID = function(sender, options, callback) {
  var result;
  if(typeof callback == "function") {
    jarvis.dataaccess.fetch(this, "/engine/DataTables.svc/GetByID", {id:options.id}, function(sender, data, error) {
      result = $.parseJSON(data.data);
      callback(sender, result)
    })
  }else {
    result = jarvis.dataaccess.fetch(this, "/engine/DataTables.svc/GetByID", {id:options.id}, null)
  }
  return result
};
jarvis.objects.DataTables.GetSourceTable = function(sender, options, callback) {
  var result;
  if(typeof callback == "function") {
    jarvis.dataaccess.fetch(this, "/engine/DataTables.svc/GetSourceTable", {DataSourceID:options.DataSourceID, Schema:options.Schema, TableName:options.TableName}, function(sender, data, error) {
      result = $.parseJSON(data.data);
      callback(sender, result)
    })
  }else {
    result = jarvis.dataaccess.fetch(this, "/engine/DataTables.svc/GetSourceTable", {id:options.id}, null)
  }
  return result
};
jarvis.objects.DataTables.Set = function(sender, options, callback) {
  var result = null;
  if(typeof callback == "function") {
    callback(result)
  }
};
jarvis.loaded.push("jarvis.objects.DataTables");
jarvis.debug.log("INFO", "jarvis.objects.DataTables", 6, "JS source loaded");
jarvis.provide("jarvis.objects.Dimensions");
jarvis.require("jarvis.debug");
jarvis.require("jarvis.date");
jarvis.require("jarvis.string");
jarvis.require("jarvis.objects");
jarvis.objects.Dimensions = [];
jarvis.objects.Dimensions.List = function(sender, options, callback) {
  var result;
  if(jarvis.objects.Dimensions.length > 0 && typeof callback !== "function") {
    return jarvis.objects.Dimensions
  }
  if(typeof callback == "function") {
    jarvis.dataaccess.fetch(this, "/engine/Dimensions.svc/List", {}, function(sender, data, error) {
      result = $.parseJSON(data.data);
      jarvis.objects.Dimensions.splice(0, jarvis.objects.Dimensions.length);
      $(result).each(function(index, item) {
        jarvis.objects.Dimensions.push(item)
      });
      callback(sender, result)
    })
  }else {
    result = jarvis.dataaccess.fetch(this, "/engine/Dimensions.svc/List", null, null);
    var data = $.parseJSON(result.data);
    jarvis.objects.Dimensions.splice(0, jarvis.objects.Dimensions.length);
    $(data).each(function(index, item) {
      jarvis.objects.Dimensions.push(item)
    })
  }
  return result
};
jarvis.objects.Dimensions.Get = function(sender, options, callback) {
  var result;
  if(typeof callback == "function") {
    jarvis.dataaccess.fetch(this, "/engine/Dimensions.svc/Get", {id:options.id}, function(sender, data, error) {
      result = $.parseJSON(data.data);
      callback(sender, result)
    })
  }else {
    result = jarvis.dataaccess.fetch(this, "/engine/Dimensions.svc/Get", {id:options.id}, null)
  }
  return result
};
jarvis.objects.Dimensions.Set = function(sender, options, callback) {
  var result = null;
  if(typeof callback == "function") {
    callback(result)
  }
};
jarvis.objects.Dimensions.Categories_List = function(sender, options, callback) {
  var result;
  if(typeof callback == "function") {
    jarvis.dataaccess.fetch(this, "/engine/Dimensions.svc/Categories_List", {}, function(sender, data, error) {
      result = $.parseJSON(data.data);
      callback(sender, result)
    })
  }else {
    result = jarvis.dataaccess.fetch(this, "/engine/Dimensions.svc/Categories_List", null, null)
  }
  return result
};
jarvis.loaded.push("jarvis.objects.Dimensions");
jarvis.debug.log("INFO", "jarvis.objects.Dimensions", 6, "JS source loaded");
jarvis.provide("jarvis.objects.Metrics");
jarvis.require("jarvis.debug");
jarvis.require("jarvis.date");
jarvis.require("jarvis.string");
jarvis.require("jarvis.objects");
jarvis.objects.Metrics = [];
jarvis.objects.Metrics.List = function(sender, options, callback) {
  var result;
  if(jarvis.objects.Metrics.length > 0 && typeof callback !== "function") {
    return jarvis.objects.Metrics
  }
  if(typeof callback == "function") {
    jarvis.dataaccess.fetch(this, "/engine/Metrics.svc/List", {}, function(sender, data, error) {
      result = $.parseJSON(data.data);
      jarvis.objects.Metrics.splice(0, jarvis.objects.Metrics.length);
      $(result).each(function(index, item) {
        jarvis.objects.Metrics.push(item);
        jarvis.dataaccess.metrics.push(item)
      });
      callback(sender, result)
    })
  }else {
    result = jarvis.dataaccess.fetch(this, "/engine/Metrics.svc/List", null, null);
    var data = $.parseJSON(result.data);
    jarvis.objects.Metrics.splice(0, jarvis.objects.Metrics.length);
    $(data).each(function(index, item) {
      jarvis.objects.Metrics.push(item);
      jarvis.dataaccess.metrics.push(item)
    })
  }
  return result
};
jarvis.objects.Metrics.Get = function(sender, options, callback) {
  var result;
  if(typeof callback == "function") {
    jarvis.dataaccess.fetch(this, "/engine/Metrics.svc/Get", {id:options.id}, function(sender, data, error) {
      result = $.parseJSON(data.data);
      callback(sender, result)
    })
  }else {
    result = jarvis.dataaccess.fetch(this, "/engine/Metrics.svc/Get", {id:options.id}, null)
  }
  return result
};
jarvis.objects.Metrics.Set = function(sender, options, callback) {
  var result = null;
  if(typeof callback == "function") {
    callback(result)
  }
};
jarvis.objects.Metrics.AddGroup = function(sender, options, callback) {
  var result;
  if(typeof callback == "function") {
    jarvis.dataaccess.fetch(this, "/engine/Metrics.svc/AddGroup", {TabID:options.tabID, name:options.name}, function(sender, data, error) {
      result = $.parseJSON(data.data);
      callback(sender, result)
    })
  }else {
    result = jarvis.dataaccess.fetch(this, "/engine/Metrics.svc/AddGroup", {TabID:options.tabID, name:options.name}, null)
  }
  return result
};
jarvis.objects.Metrics.DeleteGroup = function(sender, options, callback) {
  var result;
  if(typeof callback == "function") {
    jarvis.dataaccess.fetch(this, "/engine/Metrics.svc/DeleteGroup", {id:options.id}, function(sender, data, error) {
      result = $.parseJSON(data.data);
      callback(sender, result)
    })
  }else {
    result = jarvis.dataaccess.fetch(this, "/engine/Metrics.svc/DeleteGroup", {id:options.id}, null)
  }
  return result
};
jarvis.objects.Metrics.UpdateGroup = function(sender, id, prop, val, callback) {
  var result;
  if(typeof callback == "function") {
    jarvis.dataaccess.fetch(this, "/engine/Metrics.svc/UpdateGroup", {id:id, property:prop, value:val}, function(sender, data, error) {
      result = $.parseJSON(data.data);
      callback(sender, result)
    })
  }else {
    result = jarvis.dataaccess.fetch(this, "/engine/Metrics.svc/UpdateGroup", {id:id, property:prop, value:val}, null)
  }
  return result
};
jarvis.objects.Metrics.UpdateGroupMetric = function(sender, id, ms_id, ordinal, callback) {
  var result;
  if(typeof callback == "function") {
    jarvis.dataaccess.fetch(this, "/engine/Metrics.svc/UpdateGroupMetric", {id:id, metricID:ms_id, ordinal:ordinal}, function(sender, data, error) {
      result = $.parseJSON(data.data);
      callback(sender, result)
    })
  }else {
    result = jarvis.dataaccess.fetch(this, "/engine/Metrics.svc/UpdateGroupMetric", {id:id, metricID:ms_id, ordinal:ordinal}, null)
  }
  return result
};
jarvis.objects.Metrics.DeleteGroupMetric = function(sender, id, ms_id, ordinal, callback) {
  var result;
  if(typeof callback == "function") {
    jarvis.dataaccess.fetch(this, "/engine/Metrics.svc/DeleteGroupMetric", {id:id, metricID:ms_id}, function(sender, data, error) {
      result = $.parseJSON(data.data);
      callback(sender, result)
    })
  }else {
    result = jarvis.dataaccess.fetch(this, "/engine/Metrics.svc/DeleteGroupMetric", {id:id, metricID:ms_id}, null)
  }
  return result
};
jarvis.objects.Metrics.Categories_List = function(sender, options, callback) {
  var result;
  if(typeof callback == "function") {
    jarvis.dataaccess.fetch(this, "/engine/Metrics.svc/Categories_List", {}, function(sender, data, error) {
      result = $.parseJSON(data.data);
      callback(sender, result)
    })
  }else {
    result = jarvis.dataaccess.fetch(this, "/engine/Metrics.svc/Categories_List", null, null)
  }
  return result
};
jarvis.loaded.push("jarvis.objects.Metrics");
jarvis.debug.log("INFO", "jarvis.objects.Metrics", 6, "JS source loaded");
jarvis.provide("jarvis.objects.Dashboards");
jarvis.require("jarvis.debug");
jarvis.require("jarvis.date");
jarvis.require("jarvis.string");
jarvis.require("jarvis.objects");
jarvis.objects.Dashboards = [];
jarvis.objects.Dashboards.List = function(sender, options, callback) {
  var result;
  if(jarvis.objects.Dashboards.length > 0 && typeof callback !== "function") {
    return jarvis.objects.Dashboards
  }
  if(typeof callback == "function") {
    jarvis.dataaccess.fetch(this, "/engine/Dashboards.svc/List", null, function(sender, data, error) {
      result = $.parseJSON(data.data);
      jarvis.objects.Dashboards.splice(0, jarvis.objects.Dashboards.length);
      $(result).each(function(index, item) {
        jarvis.objects.Dashboards.push(item)
      });
      callback(sender, result)
    })
  }else {
    result = jarvis.dataaccess.fetch(this, "/engine/Dashboards.svc/List", null, null);
    var data = $.parseJSON(result.data);
    jarvis.objects.Dashboards.splice(0, jarvis.objects.Dashboards.length);
    $(data).each(function(index, item) {
      jarvis.objects.Dashboards.push(item)
    })
  }
  return result
};
jarvis.objects.Dashboards.Get = function(sender, options, callback, force) {
  var result;
  if(jarvis.objects.Dashboards.length > 0 && typeof callback !== "function" && !force) {
    return _.find(jarvis.objects.Dashboards, function(item) {
      return item.ID == options.id
    })
  }
  if(typeof callback == "function") {
    jarvis.dataaccess.fetch(this, "/engine/Dashboards.svc/Get", {id:options.id}, function(sender, data, error) {
      result = $.parseJSON(data.data);
      callback(sender, result)
    })
  }else {
    result = jarvis.dataaccess.fetch(this, "/engine/Dashboards.svc/Get", {id:options.id}, null)
  }
  return result
};
jarvis.loaded.push("jarvis.objects.Dashboards");
jarvis.debug.log("INFO", "jarvis.objects.Dashboards", 6, "JS source loaded");
jarvis.provide("jarvis.objects.RealtimePanels");
jarvis.require("jarvis.debug");
jarvis.require("jarvis.date");
jarvis.require("jarvis.string");
jarvis.require("jarvis.objects");
jarvis.objects.RealtimePanels = [];
jarvis.objects.RealtimePanels.List = function(sender, options, callback) {
  var result;
  if(jarvis.objects.RealtimePanels.length > 0 && typeof callback !== "function") {
    return jarvis.objects.RealtimePanels
  }
  if(typeof callback == "function") {
    jarvis.dataaccess.fetch(this, "/engine/RealtimePanels.svc/List", null, function(sender, data, error) {
      result = $.parseJSON(data.data);
      $(result).each(function(index, item) {
        jarvis.objects.RealtimePanels.push(item);
        jarvis.dataaccess.realtimepanels.push(item)
      });
      callback(sender, result)
    })
  }else {
    result = jarvis.dataaccess.fetch(this, "/engine/RealtimePanels.svc/List", null, null);
    var data = $.parseJSON(result.data);
    $(data).each(function(index, item) {
      jarvis.objects.RealtimePanels.push(item);
      jarvis.dataaccess.realtimepanels.push(item)
    })
  }
  return result
};
jarvis.objects.RealtimePanels.Get = function(sender, options, callback) {
  var result;
  if(jarvis.objects.RealtimePanels.length > 0 && typeof callback !== "function") {
    return _.find(jarvis.objects.RealtimePanels, function(item) {
      return item.ID == options.id
    })
  }
  if(typeof callback == "function") {
    jarvis.dataaccess.fetch(this, "/engine/RealtimePanels.svc/Get", {id:options.id}, function(sender, data, error) {
      result = $.parseJSON(data.data);
      callback(sender, result)
    })
  }else {
    result = jarvis.dataaccess.fetch(this, "/engine/RealtimePanels.svc/Get", {id:options.id}, null)
  }
  return result
};
jarvis.loaded.push("jarvis.objects.RealtimePanels");
jarvis.debug.log("INFO", "jarvis.objects.RealtimePanels", 6, "JS source loaded");
jarvis.provide("jarvis.objects.Reports");
jarvis.require("jarvis.debug");
jarvis.require("jarvis.date");
jarvis.require("jarvis.string");
jarvis.require("jarvis.objects");
jarvis.objects.Reports = [];
jarvis.objects.Reports.List = function(sender, options, callback, force) {
  var result;
  if(jarvis.objects.Reports.length > 0 && typeof callback !== "function" && !force) {
    return jarvis.objects.Reports
  }
  if(typeof callback == "function") {
    jarvis.dataaccess.fetch(this, "/engine/Reports.svc/List", null, function(sender, data, error) {
      result = $.parseJSON(data.data);
      jarvis.objects.Reports.splice(0, jarvis.objects.Reports.length);
      $(result).each(function(index, item) {
        jarvis.objects.Reports.push(item)
      });
      callback(sender, result)
    })
  }else {
    result = jarvis.dataaccess.fetch(this, "/engine/Reports.svc/List", null, null);
    var data = $.parseJSON(result.data);
    jarvis.objects.Reports.splice(0, jarvis.objects.Reports.length);
    $(data).each(function(index, item) {
      jarvis.objects.Reports.push(item)
    });
    result = jarvis.objects.Reports
  }
  return result
};
jarvis.objects.Reports.Get = function(sender, options, callback, force) {
  var result;
  if(jarvis.objects.Reports.length > 0 && typeof callback !== "function" && !force) {
    return _.find(jarvis.objects.Reports, function(item) {
      return item.ID == options.id
    })
  }
  if(typeof callback == "function") {
    jarvis.dataaccess.fetch(this, "/engine/Reports.svc/Get", {id:options.id}, function(sender, data, error) {
      result = $.parseJSON(data.data);
      callback(sender, result)
    })
  }else {
    result = jarvis.dataaccess.fetch(this, "/engine/Reports.svc/Get", {id:options.id}, null);
    var data = $.parseJSON(result.data);
    for(i = 0;i < jarvis.objects.Reports.length;i++) {
      if(jarvis.objects.Reports[i].ID == data.ID) {
        jarvis.objects.Reports[i] = data
      }
    }
    result = data
  }
  return result
};
jarvis.objects.Reports.Set = function(sender, id, prop, val, callback) {
  var result;
  if(typeof callback == "function") {
    jarvis.dataaccess.fetch(this, "/engine/Reports.svc/Set", {id:id, property:prop, value:val}, function(sender, data, error) {
      result = $.parseJSON(data.data);
      callback(sender, result)
    })
  }else {
    result = jarvis.dataaccess.fetch(this, "/engine/Reports.svc/Set", {id:id, property:prop, value:val}, null)
  }
  return result
};
jarvis.objects.Reports.Delete = function(sender, options, callback) {
  var result;
  if(typeof callback == "function") {
    jarvis.dataaccess.fetch(this, "/engine/Reports.svc/Delete", {id:options.id}, function(sender, data, error) {
      result = $.parseJSON(data.data);
      callback(sender, result)
    })
  }else {
    result = jarvis.dataaccess.fetch(this, "/engine/Reports.svc/Delete", {id:options.id}, null)
  }
  return result
};
jarvis.objects.Reports.AddTab = function(sender, options, callback) {
  var result;
  if(typeof callback == "function") {
    jarvis.dataaccess.fetch(this, "/engine/Reports.svc/AddTab", {reportID:options.reportID, name:options.name, type:options.type}, function(sender, data, error) {
      result = $.parseJSON(data.data);
      callback(sender, result)
    })
  }else {
    result = jarvis.dataaccess.fetch(this, "/engine/Reports.svc/AddTab", {reportID:options.reportID, name:options.name, type:options.type}, null)
  }
  return result
};
jarvis.objects.Reports.UpdateTab = function(sender, id, prop, val, callback) {
  var result;
  if(typeof callback == "function") {
    jarvis.dataaccess.fetch(this, "/engine/Reports.svc/UpdateTab", {id:id, property:prop, value:val}, function(sender, data, error) {
      result = $.parseJSON(data.data);
      callback(sender, result)
    })
  }else {
    result = jarvis.dataaccess.fetch(this, "/engine/Reports.svc/UpdateTab", {id:id, property:prop, value:val}, null)
  }
  return result
};
jarvis.objects.Reports.DeleteTab = function(sender, options, callback) {
  var result;
  if(typeof callback == "function") {
    jarvis.dataaccess.fetch(this, "/engine/Reports.svc/DeleteTab", {id:options.id}, function(sender, data, error) {
      result = $.parseJSON(data.data);
      callback(sender, result)
    })
  }else {
    result = jarvis.dataaccess.fetch(this, "/engine/Reports.svc/DeleteTab", {id:options.id}, null)
  }
  return result
};
jarvis.objects.Reports.UpdateTabDimension = function(sender, id, dimensionid, ordinal, callback) {
  var result;
  if(typeof callback == "function") {
    jarvis.dataaccess.fetch(this, "/engine/Reports.svc/UpdateTabDimension", {tabid:id, dimensionid:dimensionid, ordinal:ordinal}, function(sender, data, error) {
      result = $.parseJSON(data.data);
      callback(sender, result)
    })
  }else {
    result = jarvis.dataaccess.fetch(this, "/engine/Reports.svc/UpdateTabDimension", {tabid:id, dimensionid:dimensionid, ordinal:ordinal}, null)
  }
  return result
};
jarvis.objects.Reports.DeleteTabDimension = function(sender, id, dimensionid, callback) {
  var result;
  if(typeof callback == "function") {
    jarvis.dataaccess.fetch(this, "/engine/Reports.svc/DeleteTabDimension", {tabid:id, dimensionid:dimensionid}, function(sender, data, error) {
      result = $.parseJSON(data.data);
      callback(sender, result)
    })
  }else {
    result = jarvis.dataaccess.fetch(this, "/engine/Reports.svc/DeleteTabDimension", {tabid:id, dimensionid:dimensionid}, null)
  }
  return result
};
jarvis.objects.Reports.GetDefault = function(sender, options, callback) {
  var result;
  if(typeof callback == "function") {
    jarvis.dataaccess.fetch(this, "/engine/Reports.svc/List", null, function(sender, data, error) {
      result = $.parseJSON(data.data);
      result = result[0];
      callback(sender, result)
    })
  }else {
    result = jarvis.dataaccess.fetch(this, "/engine/Reports.svc/List", null, null);
    result = $.parseJSON(result.data);
    result = result[0]
  }
  return result
};
jarvis.objects.Reports.GetCategories = function(sender, options, callback) {
  var result;
  if(typeof callback == "function") {
    jarvis.dataaccess.fetch(this, "/engine/Reports.svc/GetCategories", null, function(sender, data, error) {
      result = $.parseJSON(data.data);
      callback(sender, result)
    })
  }else {
    result = jarvis.dataaccess.fetch(this, "/engine/Reports.svc/GetCategories", null, null)
  }
  return result
};
jarvis.loaded.push("jarvis.objects.Reports");
jarvis.debug.log("INFO", "jarvis.objects.Reports", 6, "JS source loaded");
jarvis.provide("jarvis.objects.Update");
jarvis.require("jarvis.debug");
jarvis.require("jarvis.date");
jarvis.require("jarvis.string");
jarvis.require("jarvis.objects");
jarvis.objects.Update = function(options) {
  var _this = this
};
jarvis.objects.Update.prototype.CurrentVersion = function(sender, options, callback) {
  var result;
  jarvis.inSaveState = true;
  if(typeof callback == "function") {
    jarvis.dataaccess.fetch(this, "/engine/Update.svc/CurrentVersion", null, function(sender, data, error) {
      result = $.parseJSON(data.data);
      setTimeout(function() {
        jarvis.inSaveState = false
      }, 5E3);
      callback(sender, result)
    })
  }else {
    result = jarvis.dataaccess.fetch(this, "/engine/Update.svc/CurrentVersion", null, null);
    setTimeout(function() {
      jarvis.inSaveState = false
    }, 5E3)
  }
  return result
};
jarvis.objects.Update.prototype.CurrentChangeset = function(sender, options, callback) {
  var result;
  jarvis.inSaveState = true;
  if(typeof callback == "function") {
    jarvis.dataaccess.fetch(this, "/engine/Update.svc/CurrentChangeset", null, function(sender, data, error) {
      result = $.parseJSON(data.data);
      setTimeout(function() {
        jarvis.inSaveState = false
      }, 5E3);
      callback(sender, result)
    })
  }else {
    result = jarvis.dataaccess.fetch(this, "/engine/Update.svc/CurrentChangeset", null, null);
    setTimeout(function() {
      jarvis.inSaveState = false
    }, 5E3)
  }
  return result
};
jarvis.objects.Update.prototype.Changes = function(sender, options, callback) {
  var result;
  jarvis.inSaveState = true;
  if(typeof callback == "function") {
    jarvis.dataaccess.fetch(this, "/engine/Update.svc/Changes", null, function(sender, data, error) {
      result = $.parseJSON(data.data);
      setTimeout(function() {
        jarvis.inSaveState = false
      }, 5E3);
      callback(sender, result)
    })
  }else {
    result = jarvis.dataaccess.fetch(this, "/engine/Update.svc/Changes", null, null);
    setTimeout(function() {
      jarvis.inSaveState = false
    }, 5E3)
  }
  return result
};
jarvis.objects.Update.prototype.RunUpdate = function(sender, options, callback) {
  var result;
  jarvis.inSaveState = true;
  if(typeof callback == "function") {
    jarvis.dataaccess.fetch(this, "/engine/Update.svc/RunUpdate", null, function(sender, data, error) {
      result = $.parseJSON(data.data);
      setTimeout(function() {
        jarvis.inSaveState = false
      }, 5E3);
      callback(sender, result)
    })
  }else {
    result = jarvis.dataaccess.fetch(this, "/engine/Update.svc/RunUpdate", null, null);
    setTimeout(function() {
      jarvis.inSaveState = false
    }, 5E3)
  }
  return result
};
jarvis.objects.Update.prototype.CurrentRevision = function(sender, options, callback) {
  var result;
  jarvis.inSaveState = true;
  if(typeof callback == "function") {
    jarvis.dataaccess.fetch(this, "/engine/Update.svc/CurrentRevision", null, function(sender, data, error) {
      result = $.parseJSON(data.data);
      setTimeout(function() {
        jarvis.inSaveState = false
      }, 5E3);
      callback(sender, result)
    })
  }else {
    result = jarvis.dataaccess.fetch(this, "/engine/Update.svc/CurrentRevision", null, null);
    setTimeout(function() {
      jarvis.inSaveState = false
    }, 5E3)
  }
  return result
};
jarvis.loaded.push("jarvis.objects.Update");
jarvis.debug.log("INFO", "jarvis.objects.Update", 6, "JS source loaded");
jarvis.provide("jarvis.visualisation.notice");
jarvis.require("jarvis.debug");
jarvis.require("jarvis.date");
jarvis.require("jarvis.string");
jarvis.require("jarvis.visualisation");
jarvis.visualisation.notice;
jarvis.debug.log("INFO", "Jarvis.Visualisation.Notice", 6, "JS source loaded");
jarvis.provide("jarvis.visualisation.notice.Session");
jarvis.require("jarvis.date");
jarvis.require("jarvis.debug");
jarvis.require("jarvis.string");
jarvis.require("jarvis.visualisation.notice");
jarvis.visualisation.notice.Session = function(options) {
  var start = (new Date).getMilliseconds();
  var _this = this;
  this._this = this;
  var _options = {container:$("body"), htmlAdded:false, interval:60};
  _this.container = _options.container;
  _this.options = _options;
  _this.init(_this);
  var executionTime = (new Date).getMilliseconds() - start
};
jarvis.visualisation.notice.Session.prototype.init = function(sender) {
  var _this = sender;
  var start = (new Date).getMilliseconds();
  var $container = _this.container;
  var interval = _this.options.interval * 1E3;
  setInterval(function() {
    jarvis.dataaccess.fetch(this, "/engine/Auth.svc/CheckSession", {}, function(sender, data, error) {
      result = $.parseJSON(data.data);
      var $content = null;
      if(eval(result) == false) {
        if(!_this.htmlAdded) {
          _this.htmlAdded = true;
          $content = $(_this.baseHTML(_this));
          $container.append($content);
          $content.find(".modal").on("hidden", function() {
            location.href = "/login.html"
          })
        }else {
          $content = $container.find(".jarvis.notice.session")
        }
        $content.find(".modal").modal("show")
      }else {
        $content = $container.find(".jarvis.notice.session");
        $content.find(".modal").off("hidden");
        $content.find(".modal").modal("hide")
      }
    })
  }, interval);
  var executionTime = (new Date).getMilliseconds() - start;
  jarvis.debug.log("INFO", "Jarvis.Visualisation.Notice.Session", 5, "...init (" + executionTime + "ms)")
};
jarvis.visualisation.notice.Session.prototype.baseHTML = function(sender) {
  var _this = sender;
  var $html = $('<div class="jarvis notice session"></div>');
  var _html = '<div class="modal hide fade" style="width:auto;left:50%;">';
  _html += '<div class="modal-header">';
  _html += '<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>';
  _html += "<h3>Session Expired</h3>";
  _html += "</div>";
  _html += '<div class="modal-body">';
  _html += "<p>Your session has expired due to inactivity. Press the Login button to re-login and resume your session.</p>";
  _html += "</div>";
  _html += '<div class="modal-footer">';
  _html += '<a href="/login.html" class="btn btn-primary">Login</a>';
  _html += "</div>";
  _html += "</div>";
  $html.append(_html);
  return $html
};
jarvis.loaded.push("jarvis.visualisation.notice.Session");
jarvis.debug.log("INFO", "Jarvis.Visualisation.Notice.Session", 6, "JS source loaded");
jarvis.provide("jarvis.visualisation.notice.Loading");
jarvis.require("jarvis.date");
jarvis.require("jarvis.debug");
jarvis.require("jarvis.string");
jarvis.require("jarvis.visualisation.notice");
jarvis.visualisation.notice.Loading = function(options) {
  var start = (new Date).getMilliseconds();
  var _this = this;
  this._this = this;
  var _options = {container:$("body"), htmlAdded:false};
  _this.container = _options.container;
  _this.options = _options;
  _this.init(_this);
  var executionTime = (new Date).getMilliseconds() - start
};
jarvis.visualisation.notice.Loading.prototype.init = function(sender) {
  var _this = sender;
  var start = (new Date).getMilliseconds();
  var $container = _this.container;
  var executionTime = (new Date).getMilliseconds() - start;
  jarvis.debug.log("INFO", "Jarvis.Visualisation.notice.Loading", 5, "...init (" + executionTime + "ms)")
};
jarvis.visualisation.notice.Loading.prototype.baseHTML = function(sender) {
  var _this = sender;
  var $html = $('<div class="jarvis notice session"></div>');
  var _html = "";
  $html.append(_html);
  return $html
};
jarvis.loaded.push("jarvis.visualisation.notice.Loading");
jarvis.debug.log("INFO", "Jarvis.Visualisation.Notice.Loading", 6, "JS source loaded");
jarvis.provide("jarvis.visualisation.picker");
jarvis.require("jarvis.debug");
jarvis.require("jarvis.date");
jarvis.require("jarvis.string");
jarvis.require("jarvis.visualisation");
jarvis.visualisation.picker;
jarvis.debug.log("INFO", "Jarvis.Visualisation.Picker", 6, "JS source loaded");
jarvis.provide("jarvis.visualisation.picker.DateBox");
jarvis.require("jarvis.debug");
jarvis.require("jarvis.date");
jarvis.require("jarvis.string");
jarvis.visualisation.picker.DateBox.init = function(options, container) {
  var _this = this;
  var start = (new Date).getMilliseconds();
  this._this = this;
  this.currentMode = "base-from";
  this.original_base_fromdate = null;
  this.original_base_todate = null;
  this.original_compare_fromdate = null;
  this.original_compare_todate = null;
  var calls = [];
  var call = function(callback) {
    this.min_date = (new jarvis.objects.Query).SystemStartDate(this, {}, function() {
      callback()
    })
  };
  calls.push(call);
  var call = function(callback) {
    this.max_date = (new jarvis.objects.Query).SystemEndDate(this, {}, function() {
      callback()
    })
  };
  calls.push(call);
  fork(calls, function() {
    this.base_todate = new Date(this.max_date);
    this.base_fromdate = _this.addDays(this.base_todate, -30);
    var rangelength = Date.dateDiff("d", this.base_fromdate, this.base_todate);
    this.compare_todate = _this.addDays(this.base_fromdate, -1);
    this.compare_fromdate = _this.addDays(this.compare_todate, -1 * rangelength);
    this.original_base_fromdate = this.base_fromdate;
    this.original_base_todate = this.base_todate;
    this.original_compare_fromdate = this.compare_fromdate;
    this.original_compare_todate = this.compare_todate;
    this.applied_base_fromdate = this.base_fromdate;
    this.applied_base_todate = this.base_todate;
    this.applied_compare_fromdate = this.compare_fromdate;
    this.applied_compare_todate = this.compare_todate;
    this.comparePeriod = false;
    this.isCompareChecked = false;
    _this.getState(_this);
    this.offsetX = 0;
    this.offsetY = 0;
    this.callbacks = [];
    this.cssPath = jarvis.hostname + "/assets/css/datebox.css";
    if(!jarvis.dateboxcssloaded) {
      jarvis.dateboxcssloaded = true;
      $("head").append('<style type="text/css">@import "' + this.cssPath + '";</style> ')
    }
    var matchedContainers = null;
    if(container) {
      matchedContainers = $(container)
    }else {
      matchedContainers = $(".jarvis.picker.datebox")
    }
    if(matchedContainers.length == 0) {
      return
    }
    $(matchedContainers).each(function(index, item) {
      if(!$(this).parent().hasClass("prettyprint")) {
        jarvis.debug.log("INFO", "jarvis.visualisation.picker.DateBox", 6, "Applying to container ('" + this.id + "')");
        var offsetX = $(item).attr("data-offsetx");
        var offsetY = $(item).attr("data-offsety");
        if(offsetX) {
          _this.offsetX = offsetX
        }
        if(offsetY) {
          _this.offsetY = offsetY
        }
        $(item).empty();
        _this.draw(item);
        $(this).bind("data", function(evt, ret) {
          ret.data = $(this).data().data
        });
        $(this).bind("click", function(evt) {
          $(this).trigger("clicked", $(this).data().data)
        })
      }
    });
    var executionTime = (new Date).getMilliseconds() - start;
    jarvis.debug.log("INFO", "jarvis.visualisation.picker.DateBox", 5, "...init (" + executionTime + "ms)")
  })
};
jarvis.visualisation.picker.DateBox.addDays = function(o, days) {
  return new Date(o.getFullYear(), o.getMonth(), o.getDate() + days)
};
jarvis.visualisation.picker.DateBox.draw = function(Container) {
  var _this = this;
  var $container = $(Container);
  $container.empty();
  var $item = $('<div class="container"></div>');
  $item.append('<table class="datetable unselectable">' + "<tr>" + '<td class="dates"></td>' + '<td class="dropdownmarker"></td>' + "</tr>" + "</table>");
  $container.append($item);
  $(".dates").append('<span class="datelabel fromdate">' + jarvis.date.formatDate(_this.base_fromdate) + "</span>");
  $(".dates").append(" - ");
  $(".dates").append('<span class="datelabel todate">' + jarvis.date.formatDate(_this.base_todate) + "</span>");
  $(".dates").append('<div class="compare" style="display:none">Compare to: <span class="datelabel compare fromdate">' + jarvis.date.formatDate(_this.compare_fromdate) + '</span> - <span class="datelabel compare todate">' + jarvis.date.formatDate(_this.compare_todate) + "</span></div>");
  if(_this.comparePeriod) {
    $(".dates .compare").show()
  }else {
    $(".dates .compare").hide()
  }
  $item = $('<div class="picker" style="display:none"></div>');
  $item.append('<table class="wrapper"><tr valign=top>' + '<td class="calendars"></td>' + '<td class="control"><div class="optionscontainer"></div></td>' + "</tr></table>");
  $container.append($item);
  $(".optionscontainer").append('<div class="customdate">Date Range:' + '<select class="selector"><option value="custom">Custom</option><option value="today">Today</option><option value="yesterday">Yesterday</option><option value="lastweek">Last week</option><option value="lastmonth">Last Month</option></select>' + "</div>");
  $(".optionscontainer").append('<hr class="divider" style="margin-bottom: 5px;">');
  $(".optionscontainer").append('<div class="daterange baserange"">' + '<input class="dateoption active" type="text" value="Jan 1, 2012">' + " - " + '<input class="dateoption" type="text" value="Jan 1, 2012">' + "</div>");
  $(".optionscontainer").append('<div class="compareoption visible"">' + '<input type="checkbox" class="checker"/><span style="padding-left:5px;">Compare to past</span>' + "</div>");
  $(".optionscontainer").append('<div class="daterange comparerange"">' + '<input class="dateoption active" type="text" value="Jan 1, 2012">' + " - " + '<input class="dateoption" type="text" value="Jan 1, 2012">' + "</div>");
  $(".optionscontainer").append("" + '<hr class="divider">' + '<div class="_buttons"><button class="btn apply" value="Apply">Apply</button>' + '<span class="cancel">Cancel</span></div>');
  var $calendars = $container.find(".calendars");
  $item = $("<table><tr valign=top>" + '<td class="datetable-prev unselectable"></td>' + '<td class="datetable"><div class="datepicker"></div></td>' + '<td class="datetable"><div class="datepicker"></div></td>' + '<td class="datetable"><div class="datepicker"></div></td>' + '<td class="datetable-next unselectable"></td>' + "</tr></table>");
  $calendars.append($item);
  $(".datetable-prev").append('<div class="prev">' + '<div class="inline-block prev">' + "</div>" + "</div>");
  $(".datetable-prev .prev").off("click");
  $(".datetable-prev .prev").on("click", function(e) {
    e.stopPropagation();
    var currentLeftCellDate = $($(".datepicker")[0]).datepicker("getDate");
    if(currentLeftCellDate.setMonth(currentLeftCellDate.getMonth()) < _this.min_date) {
      return
    }
    var currentRightCellDate = $($(".datepicker")[2]).datepicker("getDate");
    currentRightCellDate = new Date(currentRightCellDate);
    currentRightCellDate.setMonth(currentRightCellDate.getMonth() - 1);
    var selectedDate = new Date(currentRightCellDate);
    $(".datepicker").each(function(index, item) {
      var localdate = new Date(selectedDate);
      localdate.setMonth(localdate.getMonth() - (2 - index));
      $(item).datepicker("setDate", localdate)
    })
  });
  $(".datetable-next").append('<div class="next">' + '<div class="inline-block next">' + "</div>" + "</div>");
  $(".datetable-next .next").off("click");
  $(".datetable-next .next").on("click", function(e) {
    e.stopPropagation();
    var currentRightCellDate = $($(".datepicker")[2]).datepicker("getDate");
    if(currentRightCellDate.setMonth(currentRightCellDate.getMonth() + 1) > _this.max_date) {
      return
    }
    currentRightCellDate = new Date(currentRightCellDate);
    var selectedDate = new Date(currentRightCellDate);
    $(".datepicker").each(function(index, item) {
      var localdate = new Date(selectedDate);
      localdate.setMonth(localdate.getMonth() - (2 - index));
      $(item).datepicker("setDate", localdate)
    })
  });
  var currentClickIndex = 0;
  $(".datepicker").datepicker({dayNamesMin:["S", "M", "T", "W", "T", "F", "S"], firstDay:0, minDate:_this.min_date, maxDate:_this.max_date, beforeShowDay:function(date) {
    return _this.drawCell(date)
  }, onSelect:function(dateText, inst) {
    $(".jarvis .optionscontainer .selector").val("custom");
    switch(_this.currentMode) {
      case "base-from":
        _this.currentMode = "base-to";
        _this.base_fromdate = new Date(dateText);
        _this.base_todate = new Date(dateText);
        $($(".daterange.baserange .dateoption")[0]).val(jarvis.date.formatDate(_this.base_fromdate));
        $($(".daterange.baserange .dateoption")[0]).removeClass("invalid");
        $($(".daterange.baserange .dateoption")[1]).val(jarvis.date.formatDate(_this.base_fromdate));
        $($(".daterange.baserange .dateoption")[1]).removeClass("invalid");
        break;
      case "base-to":
        _this.base_todate = new Date(dateText);
        $($(".daterange.baserange .dateoption")[1]).val(jarvis.date.formatDate(_this.base_todate));
        $($(".daterange.baserange .dateoption")[1]).removeClass("invalid");
        if(_this.isCompareChecked) {
          _this.currentMode = "compare-from"
        }else {
          _this.currentMode = "base-from"
        }
        break;
      case "compare-from":
        _this.compare_fromdate = new Date(dateText);
        _this.compare_todate = new Date(dateText);
        $($(".daterange.comparerange .dateoption")[0]).val(_this.formatDate(_this.compare_fromdate));
        $($(".daterange.comparerange .dateoption")[0]).removeClass("invalid");
        $($(".daterange.comparerange .dateoption")[1]).val(_this.formatDate(_this.compare_fromdate));
        $($(".daterange.comparerange .dateoption")[1]).removeClass("invalid");
        _this.currentMode = "compare-to";
        break;
      case "compare-to":
        _this.compare_todate = new Date(dateText);
        $($(".daterange.comparerange .dateoption")[1]).val(_this.formatDate(_this.compare_todate));
        $($(".daterange.comparerange .dateoption")[1]).removeClass("invalid");
        _this.currentMode = "base-from";
        break;
      default:
        break
    }
    _this.handleChange()
  }});
  $(".datepicker").datepicker({});
  $(".datepicker").find('a[href="#"]').each(function(index, item) {
    $(this).on("click", function(event) {
      event.stopPropagation()
    })
  });
  $(".datepicker").each(function(index, item) {
    var selectedDate = new Date(_this.base_todate.getFullYear(), _this.base_todate.getMonth(), 1);
    selectedDate.setMonth(selectedDate.getMonth() - (2 - index));
    $(item).datepicker("setDate", selectedDate)
  });
  $($(".daterange.baserange .dateoption")[0]).focus(function(e) {
    _this.currentMode = "base-from";
    _this.handleChange()
  });
  $($(".daterange.baserange .dateoption")[0]).keyup(function(e) {
    if(new Date($(this).val()) == "Invalid Date") {
      $(this).addClass("invalid")
    }else {
      $(this).removeClass("invalid");
      _this.base_fromdate = new Date($(this).val())
    }
  });
  $($(".daterange.baserange .dateoption")[1]).focus(function(e) {
    _this.currentMode = "base-to";
    _this.handleChange()
  });
  $($(".daterange.baserange .dateoption")[1]).keyup(function(e) {
    if(new Date($(this).val()) == "Invalid Date") {
      $(this).addClass("invalid")
    }else {
      $(this).removeClass("invalid");
      _this.base_todate = new Date($(this).val())
    }
  });
  $($(".daterange.comparerange .dateoption")[0]).focus(function(e) {
    _this.currentMode = "compare-from";
    _this.handleChange()
  });
  $($(".daterange.comparerange .dateoption")[0]).keyup(function(e) {
    if(new Date($(this).val()) == "Invalid Date") {
      $(this).addClass("invalid")
    }else {
      $(this).removeClass("invalid");
      _this.compare_fromdate = new Date($(this).val())
    }
  });
  $($(".daterange.comparerange .dateoption")[1]).focus(function(e) {
    _this.currentMode = "compare-to";
    _this.handleChange()
  });
  $($(".daterange.comparerange .dateoption")[1]).keyup(function(e) {
    if(new Date($(this).val()) == "Invalid Date") {
      $(this).addClass("invalid")
    }else {
      $(this).removeClass("invalid");
      _this.compare_todate = new Date($(this).val())
    }
  });
  $(".jarvis .optionscontainer .cancel").click(function(e) {
    _this.base_fromdate = _this.original_base_fromdate;
    _this.base_todate = _this.original_base_todate;
    _this.compare_fromdate = _this.original_compare_fromdate;
    _this.compare_todate = _this.original_compare_todate;
    if($(".compareoption .checker").is(":checked")) {
      $(".compareoption .checker").click();
      $(".compareoption .checker").prop("checked", false)
    }
    $($(".daterange.baserange .dateoption")[0]).val(_this.formatDate(_this.base_fromdate));
    $($(".daterange.baserange .dateoption")[1]).val(_this.formatDate(_this.base_todate));
    $($(".daterange.comparerange .dateoption")[0]).val(_this.formatDate(_this.compare_fromdate));
    $($(".daterange.comparerange .dateoption")[1]).val(_this.formatDate(_this.compare_todate));
    _this.handleChange();
    $(".jarvis.datebox .container").click()
  });
  $(".jarvis .optionscontainer .selector").change(function(e) {
    switch(this.value) {
      case "today":
        _this.base_todate = _this.fixDate(new Date, true);
        _this.base_fromdate = _this.addDays(_this.base_todate, -0);
        break;
      case "yesterday":
        _this.base_todate = _this.fixDate(new Date, true);
        _this.base_todate = _this.addDays(_this.base_todate, -1);
        _this.base_fromdate = _this.addDays(_this.base_todate, -0);
        break;
      case "lastweek":
        _this.base_fromdate = _this.fixDate(new Date, true);
        _this.base_fromdate = _this.addDays(_this.base_fromdate, -1 * (_this.base_fromdate.getDay() + 7));
        _this.base_todate = _this.addDays(_this.base_fromdate, 6);
        break;
      case "lastmonth":
        var curr = _this.fixDate(new Date, true);
        var last = _this.addDays(curr, -1 * curr.getDate());
        var first = _this.addDays(last, -1 * (last.getDate() - 1));
        _this.base_todate = _this.fixDate(new Date, true);
        _this.base_todate = _this.addDays(_this.base_todate, -1 * _this.base_todate.getDate());
        _this.base_fromdate = _this.addDays(_this.base_todate, -1 * (_this.base_todate.getDate() - 1));
        break;
      default:
        break
    }
    var rangelength = Date.dateDiff("d", _this.base_fromdate, _this.base_todate);
    _this.compare_todate = _this.addDays(_this.base_fromdate, -1);
    _this.compare_fromdate = _this.addDays(_this.compare_todate, -1 * rangelength);
    $($(".daterange.baserange .dateoption")[0]).val(_this.formatDate(_this.base_fromdate));
    $($(".daterange.baserange .dateoption")[1]).val(_this.formatDate(_this.base_todate));
    $($(".daterange.comparerange .dateoption")[0]).val(_this.formatDate(_this.compare_fromdate));
    $($(".daterange.comparerange .dateoption")[1]).val(_this.formatDate(_this.compare_todate));
    _this.handleChange()
  });
  $($(".daterange.baserange .dateoption")[0]).val(_this.formatDate(_this.base_fromdate));
  $($(".daterange.baserange .dateoption")[1]).val(_this.formatDate(_this.base_todate));
  $($(".daterange.comparerange .dateoption")[0]).val(_this.formatDate(_this.compare_fromdate));
  $($(".daterange.comparerange .dateoption")[1]).val(_this.formatDate(_this.compare_todate));
  $(".jarvis.datebox .container").off("click");
  $(".jarvis.datebox .container").on("click", function(e) {
    if($(this).hasClass("expanded")) {
      $(this).removeClass("expanded");
      $(".jarvis.picker.datebox .picker").hide()
    }else {
      $(jarvis).trigger("jarvis-picker-metrics-popup", [_this]);
      $(this).addClass("expanded");
      _this.base_fromdate = _this.applied_base_fromdate;
      _this.base_todate = _this.applied_base_todate;
      _this.compare_fromdate = _this.applied_compare_fromdate;
      _this.compare_todate = _this.applied_compare_todate;
      _this.original_base_fromdate = _this.applied_base_fromdate;
      _this.original_base_todate = _this.applied_base_todate;
      _this.original_compare_fromdate = _this.applied_compare_fromdate;
      _this.original_compare_todate = _this.applied_compare_todate;
      $(".jarvis.picker.datebox .picker").show();
      $(".jarvis.picker.datebox .picker").offset({top:$(".jarvis.picker.datebox .picker").offset().top, left:$(".jarvis.picker.datebox .container").offset().left - $(".jarvis.picker.datebox .picker").outerWidth() + $(".jarvis.picker.datebox .container").outerWidth()});
      $(".metricscontainer").hide();
      $(".metricscontainer").removeClass("on");
      $(".metricswrapper .jbtn").removeClass("active")
    }
  });
  $(".jarvis.datebox").click(function(e) {
    e.stopPropagation()
  });
  $("body").click(function(e) {
    $(".jarvis.datebox .container").removeClass("expanded");
    $(".jarvis.datebox .picker").hide()
  });
  $(".jarvis.datebox .optionscontainer .apply").click(function(e) {
    $(".jarvis.datebox .container").removeClass("expanded");
    $(".jarvis.picker.datebox .picker").hide();
    _this.comparePeriod = _this.isCompareChecked;
    _this.DateUpdate()
  });
  if(this.comparePeriod) {
    this.isCompareChecked = true
  }
  this.registerDateUpdate(this.updateLabels);
  this.handleChange()
};
jarvis.visualisation.picker.DateBox.drawCell = function(date) {
  if(date >= new Date) {
    return[false, "daycell disabled"]
  }
  if(this.currentMode == "base-to") {
    if(date < this.base_fromdate) {
      return[false, "daycell disabled"]
    }
  }
  if(this.currentMode == "compare-to") {
    if(date < this.compare_fromdate) {
      return[false, "daycell compare disabled"]
    }
  }
  if(this.isCompareChecked) {
    if(date == this.compare_fromdate) {
      return[true, "daycell compare inrange selected fromdate"]
    }
    if(date == this.compare_todate) {
      return[true, "daycell compare inrange selected todate"]
    }
    if(date >= this.base_fromdate && date <= this.base_todate && date >= this.compare_fromdate && date <= this.compare_todate) {
      return[true, "daycell basencompare inrange"]
    }
    if(date >= this.compare_fromdate && date <= this.compare_todate) {
      return[true, "daycell compare inrange"]
    }
  }
  if(date == this.base_fromdate) {
    return[true, "daycell inrange selected fromdate"]
  }
  if(date == this.base_todate) {
    return[true, "daycell inrange selected todate"]
  }
  if(date >= this.base_fromdate && date <= this.base_todate) {
    return[true, "daycell inrange"]
  }
  switch(this.currentMode) {
    case "base-from":
      break;
    case "base-to":
      break;
    case "compare-from":
      break;
    case "compare-to":
      break;
    default:
      break
  }
  return[true, "daycell"]
};
jarvis.visualisation.picker.DateBox.fixDate = function(timestamp, zero) {
  var offset = -1 * (timestamp.getTimezoneOffset() / 60);
  var date = timestamp;
  var year = date.getUTCFullYear();
  var month = date.getUTCMonth() + 1;
  var day = date.getUTCDate();
  var hours = date.getUTCHours();
  var minutes = date.getUTCMinutes();
  var seconds = date.getUTCSeconds();
  var bAddDay = false;
  hours = hours + offset;
  var fixedDate = null;
  if(!zero) {
    fixedDate = new Date(year + "-" + month + "-" + day + " " + hours + ":" + minutes + " GMT")
  }else {
    fixedDate = new Date(year + "-" + month + "-" + day + " " + "00" + ":" + "00" + " GMT")
  }
  if(fixedDate == "Invalid Date") {
    if(!zero) {
      fixedDate = new Date;
      fixedDate.setFullYear(year, month - 1, day);
      fixedDate.setHours(parseInt(hours));
      fixedDate.setMinutes(parseInt(minutes));
      fixedDate.setSeconds(parseInt(seconds))
    }else {
      fixedDate = new Date;
      fixedDate.setFullYear(year, month - 1, day);
      fixedDate.setHours(parseInt(hours));
      fixedDate.setMinutes(0);
      fixedDate.setSeconds(0)
    }
  }
  if(bAddDay) {
    fixedDate.setDate(fixedDate.getDate() + 1)
  }
  var fixedDate_utc = new Date(fixedDate.getUTCFullYear(), fixedDate.getUTCMonth(), fixedDate.getUTCDate(), fixedDate.getUTCHours(), fixedDate.getUTCMinutes(), fixedDate.getUTCSeconds());
  return fixedDate
};
jarvis.visualisation.picker.DateBox.formatDate = function(date) {
  return jarvis.date.formatDate(date);
  var dd = date.getDate();
  var mm = date.getMonth();
  var yy = date.getFullYear();
  var dDate = new Date(yy, mm, dd);
  return Highcharts.dateFormat("%b %e, %Y", jarvis.visualisation.picker.DateBox.fixDate(date))
};
jarvis.visualisation.picker.DateBox.handleChange = function(options) {
  var _this = this;
  $(".datepicker").not(this).each(function() {
    $(this).datepicker("refresh")
  });
  $($(".daterange.baserange .dateoption")[1]).removeClass("active");
  $($(".daterange.comparerange .dateoption")[0]).removeClass("active");
  $($(".daterange.comparerange .dateoption")[1]).removeClass("active");
  switch(this.currentMode) {
    case "base-from":
      $($(".daterange.baserange .dateoption")[0]).addClass("active");
      $($(".daterange.baserange .dateoption")[1]).removeClass("active");
      $($(".daterange.comparerange .dateoption")[0]).removeClass("active");
      $($(".daterange.comparerange .dateoption")[1]).removeClass("active");
      break;
    case "base-to":
      $($(".daterange.baserange .dateoption")[0]).removeClass("active");
      $($(".daterange.baserange .dateoption")[1]).addClass("active");
      $($(".daterange.comparerange .dateoption")[0]).removeClass("active");
      $($(".daterange.comparerange .dateoption")[1]).removeClass("active");
      break;
    case "compare-from":
      $($(".daterange.baserange .dateoption")[0]).removeClass("active");
      $($(".daterange.baserange .dateoption")[1]).removeClass("active");
      $($(".daterange.comparerange .dateoption")[0]).addClass("active");
      $($(".daterange.comparerange .dateoption")[1]).removeClass("active");
      break;
    case "compare-to":
      $($(".daterange.baserange .dateoption")[0]).removeClass("active");
      $($(".daterange.baserange .dateoption")[1]).removeClass("active");
      $($(".daterange.comparerange .dateoption")[0]).removeClass("active");
      $($(".daterange.comparerange .dateoption")[1]).addClass("active");
      break;
    default:
      break
  }
  if(this.isCompareChecked) {
    $(".jarvis .optionscontainer .checker").prop("checked", true);
    $(".jarvis .optionscontainer .daterange.comparerange").show()
  }else {
    $(".jarvis .optionscontainer .checker").prop("checked", false);
    $(".jarvis .optionscontainer .daterange.comparerange").hide()
  }
  $(".jarvis .optionscontainer .checker").off("click");
  $(".jarvis .optionscontainer .checker").on("click", function(e) {
    _this.isCompareChecked = !_this.isCompareChecked;
    if(_this.isCompareChecked) {
      _this.currentMode = "compare-from"
    }else {
      _this.currentMode = "base-from"
    }
    var rangelength = Date.dateDiff("d", _this.base_fromdate, _this.base_todate);
    _this.compare_todate = _this.addDays(_this.base_fromdate, -1);
    _this.compare_fromdate = _this.addDays(_this.compare_todate, -1 * rangelength);
    $($(".daterange.comparerange .dateoption")[0]).val(_this.formatDate(_this.compare_fromdate));
    $($(".daterange.comparerange .dateoption")[1]).val(_this.formatDate(_this.compare_todate));
    _this.handleChange()
  })
};
jarvis.visualisation.picker.DateBox.updateLabels = function(sender, options) {
  $(".dates .datelabel.fromdate").text(jarvis.date.formatDate(options.base_fromdate));
  $(".dates .datelabel.todate").text(jarvis.date.formatDate(options.base_todate));
  $(".dates .datelabel.compare.fromdate").text(jarvis.date.formatDate(options.compare_fromdate));
  $(".dates .datelabel.compare.todate").text(jarvis.date.formatDate(options.compare_todate));
  if(options.compare) {
    $(".jarvis.picker.datebox").addClass("compare");
    $(".jarvis.picker.datebox .picker").addClass("compare");
    $(".jarvis.picker.datebox .dates .compare").show()
  }else {
    $(".jarvis.picker.datebox").removeClass("compare");
    $(".jarvis.picker.datebox .picker").removeClass("compare");
    $(".jarvis.picker.datebox .dates .compare").hide()
  }
};
jarvis.visualisation.picker.DateBox.DateUpdate = function() {
  var _this = this;
  var options = new Object;
  _this.applied_base_fromdate = this.base_fromdate;
  _this.applied_base_todate = this.base_todate;
  _this.applied_compare_fromdate = this.compare_fromdate;
  _this.applied_compare_todate = this.compare_todate;
  options = {base_fromdate:this.applied_base_fromdate, base_todate:this.applied_base_todate, compare_fromdate:this.applied_compare_fromdate, compare_todate:this.applied_compare_todate, compare:this.comparePeriod};
  $(this.callbacks).each(function(index, item) {
    _this.callbacks[index].callback(_this, options)
  });
  _this.setState(_this);
  $(_this).trigger("datechange", options);
  $(jarvis).trigger("datechange", options)
};
jarvis.visualisation.picker.DateBox.setState = function(sender) {
  var _this = sender;
  jarvis.state.fromdate = _this.base_fromdate;
  jarvis.state.todate = _this.base_todate;
  jarvis.state.comparePeriod = _this.comparePeriod;
  jarvis.state.compare_fromdate = _this.compare_fromdate;
  jarvis.state.compare_todate = _this.compare_todate
};
jarvis.visualisation.picker.DateBox.getState = function(sender) {
  var _this = sender;
  if(jarvis.state.fromdate != null) {
    _this.base_fromdate = new Date(jarvis.state.fromdate);
    _this.base_todate = new Date(jarvis.state.todate);
    _this.comparePeriod = jarvis.state.comparePeriod;
    _this.compare_fromdate = new Date(jarvis.state.compare_fromdate);
    _this.compare_todate = new Date(jarvis.state.compare_todate)
  }
};
jarvis.visualisation.picker.DateBox.registerDateUpdate = function(callback, sender) {
  this.callbacks.push({callback:callback, sender:sender})
};
jarvis.visualisation.picker.DateBox.getDate = function() {
  var _this = this;
  var options = new Object;
  this.applied_base_todate.setHours(23);
  this.applied_base_todate.setMinutes(59);
  this.applied_base_todate.setSeconds(59);
  this.applied_base_todate.setMilliseconds(999);
  this.applied_compare_todate.setHours(23);
  this.applied_compare_todate.setMinutes(59);
  this.applied_compare_todate.setSeconds(59);
  this.applied_compare_todate.setMilliseconds(999);
  options = {base_fromdate:this.applied_base_fromdate, base_todate:this.applied_base_todate, compare_fromdate:this.applied_compare_fromdate, compare_todate:this.applied_compare_todate, compare:this.comparePeriod};
  return options
};
jarvis.visualisation.picker.DateBox.setDate = function(sender, fromdate, todate) {
  var _this = sender;
  _this.base_fromdate = fromdate;
  _this.base_todate = todate;
  var rangelength = Date.dateDiff("d", _this.base_fromdate, _this.base_todate);
  _this.compare_todate = _this.addDays(_this.base_fromdate, -1);
  _this.compare_fromdate = _this.addDays(_this.compare_todate, -1 * rangelength);
  var options = {base_fromdate:_this.base_fromdate, base_todate:_this.base_todate, compare_fromdate:_this.compare_fromdate, compare_todate:_this.compare_todate, compare:_this.comparePeriod};
  _this.handleChange();
  _this.updateLabels(_this, options)
};
jarvis.debug.log("INFO", "jarvis.visualisation.picker.DateBox", 6, "JS source loaded");
jarvis.provide("jarvis.visualisation.picker.metrics");
jarvis.require("jarvis.debug");
jarvis.require("jarvis.date");
jarvis.require("jarvis.string");
jarvis.require("jarvis.visualisation");
jarvis.visualisation.picker.Metrics = function(options) {
  var start = (new Date).getMilliseconds();
  var _this = this;
  this.type = "metricpicker";
  this.selectedMetric = null;
  this._this = this;
  var _options = {container:null, placeholdertext:"Choose a metric...", type:"button", selected:"", showgrip:false, allowremove:false, metrics:null, showlist:true, exclude:[]};
  if(typeof options == "undefined") {
    throw"Container not specified";
  }else {
    _options.container = $(options.container)
  }
  if(typeof options.placeholdertext != "undefined") {
    _options.placeholdertext = options.placeholdertext
  }else {
    if(typeof _options.container.attr("data-placeholdertext") != "undefined") {
      _options.placeholdertext = _options.container.attr("data-placeholdertext")
    }
  }
  if(typeof options.type != "undefined") {
    _options.type = options.type
  }else {
    if(typeof _options.container.attr("data-type") != "undefined") {
      _options.type = _options.container.attr("data-type")
    }
  }
  if(typeof options.selected != "undefined") {
    _options.selected = options.selected
  }else {
    if(typeof _options.container.attr("data-selected") != "undefined") {
      _options.selected = _options.container.attr("data-selected")
    }
  }
  if(typeof options.showgrip != "undefined") {
    _options.showgrip = options.showgrip
  }else {
    if(typeof _options.container.attr("data-showgrip") != "undefined") {
      _options.showgrip = _options.container.attr("data-showgrip")
    }
  }
  if(typeof options.allowremove != "undefined") {
    _options.allowremove = options.allowremove
  }else {
    if(typeof _options.container.attr("data-allowremove") != "undefined") {
      _options.allowremove = _options.container.attr("data-allowremove")
    }
  }
  if(typeof options.showlist != "undefined") {
    _options.showlist = options.showlist
  }else {
    if(typeof _options.container.attr("data-showlist") != "undefined") {
      _options.showlist = _options.container.attr("data-showlist")
    }
  }
  if(typeof options.exclude != "undefined") {
    _options.exclude = options.exclude
  }else {
    if(typeof _options.container.attr("data-exclude") != "undefined") {
      _options.exclude = _options.container.attr("data-exclude")
    }
  }
  if(typeof options.metrics != "undefined") {
    _options.metrics = options.metrics
  }
  _this.container = _options.container;
  _this.options = _options;
  if(!_options.metrics) {
    jarvis.objects.Metrics.List();
    _options.metrics = jarvis.objects.Metrics
  }
  _this.init(_this);
  var executionTime = (new Date).getMilliseconds() - start
};
jarvis.visualisation.picker.Metrics.prototype.init = function(sender) {
  var _this = sender;
  var start = (new Date).getMilliseconds();
  var $container = _this.container;
  $container.empty();
  $container.html(_this.baseHTML(_this));
  if(_this.options.selected != "") {
    _this.setSelected(_this, _this.options.selected)
  }
  var executionTime = (new Date).getMilliseconds() - start
};
jarvis.visualisation.picker.Metrics.prototype.collapseAll = function(sender) {
  var _this = sender;
  if(_this.options.showlist) {
    return
  }
  $(_this.container.find(".node.level_0")).removeClass("on");
  $(_this.container.find(".jcontainer ")).removeClass("on")
};
jarvis.visualisation.picker.Metrics.prototype.expandAll = function(sender) {
  var _this = sender;
  $(_this.container.find(".node.level_0")).addClass("on");
  $(_this.container.find(".jcontainer ")).addClass("on")
};
jarvis.visualisation.picker.Metrics.prototype.getSelected = function(sender) {
  var _this = sender;
  return _this.selectedMetric
};
jarvis.visualisation.picker.Metrics.prototype.setSelected = function(sender, metricname, multiple) {
  var _this = this;
  this.collapseAll(this);
  if(!multiple) {
    $(_this.container.find("li[data-metricname]")).removeClass("on")
  }
  $(_this.container.find('li[data-metricname="' + metricname + '"]')).toggleClass("on");
  _this.ensureVisible(_this, metricname);
  if(metricname != "") {
    $(_this.container.find(".jbtn")[0]).html((metricname.length > 21 ? metricname.substring(0, 21) + "..." : metricname) + '<span class="caret"></span>');
    if(!$(_this.container).hasClass("on")) {
      $(_this.container).addClass("on");
      if(_this.options.allowremove) {
        $(_this.container).append('<button class="close">&times;</button>')
      }
      $($(this.container).find(".close")).off("click");
      $($(this.container).find(".close")).on("click", function(e) {
        _this.setSelected(_this, "");
        $(this).remove()
      })
    }
  }else {
    $(_this.container).removeClass("on");
    var s = ' + add metric <span class="caret"></span>';
    if(_this.options.type == "button") {
      s = _this.options.placeholdertext + '<span class="caret"></span>'
    }
    $(_this.container.find(".jbtn")[0]).html(s)
  }
  $(this.container).closest(".pickerwrapper").attr("data-id", metricname);
  var $container = $(_this.container.find(".metricscontainer"));
  if($container.hasClass("on")) {
    $container.hide();
    $container.removeClass("on");
    $(_this.container.find(".jbtn")[0]).removeClass("active")
  }
  _this.options.selected = metricname;
  if(sender.type == _this.type) {
    $(_this).trigger("select", metricname)
  }
  var metrics = jarvis.objects.Metrics;
  $(metrics).each(function(i, m) {
    if(m.Name == metricname) {
      _this.selectedMetric = m
    }
  })
};
jarvis.visualisation.picker.Metrics.prototype.disableMetric = function(sender, metricname) {
  var container = sender.container[0];
  $(container).find(".key").each(function(i, m) {
    if($(m).text() == metricname.Name) {
      $(m).closest(".node").off("click");
      $(m).closest(".node").on("click", function(e) {
        e.stopPropagation()
      });
      var nodeParent = $(m).closest(".node");
      $(nodeParent).addClass("disabled")
    }else {
      $(m).closest(".node").removeClass("disabled")
    }
  })
};
jarvis.visualisation.picker.Metrics.prototype.ensureVisible = function(sender, metricname) {
  if(metricname != "") {
  }else {
    if(sender.options.selected != null) {
      metricname = sender.options.selected
    }
  }
  var _this = sender;
  $(_this.container.find('li[data-metricname="' + metricname + '"]').each(function(index, item) {
    var $li = $(item);
    if(!$li.parent().hasClass("on")) {
      $li.parent().addClass("on")
    }
    $li.closest(".node.level_0").addClass("on")
  }))
};
jarvis.visualisation.picker.Metrics.prototype.baseHTML = function(sender) {
  var _this = sender;
  var $html = $('<div class="metricswrapper"></div>');
  if(_this.options.type == "button") {
    $html.append('<a class="btn jbtn">' + _this.options.placeholdertext + '<span class="caret"></span></a>')
  }else {
    if(_this.options.showgrip) {
      $html.append('<div class="grip"></div>')
    }
    $html.append('<div class="customadd metric jbtn"> + add metric <span class="caret"></span></div>')
  }
  $html.append('<div class="metricscontainer"><div>');
  var $container = $($html.find(".metricscontainer"));
  var search = function(e, term) {
    if((term == "" || term.length < 2) && e.which != 13) {
      if(_this.options.showlist) {
        _this.expandAll(_this);
        $container.find(".category").hide();
        $container.find(".node.level_0").css({"background-image":"none", "padding-left":0})
      }else {
        _this.collapseAll(_this);
        $container.find(".category").show();
        $container.find(".node.level_0").removeClass("on");
        $container.find(".node.level_0").css("background-image", "url('" + jarvis.hostname + "/assets/img/collapse.png') no-repeat 0px 8px;");
        $container.find(".node.level_0").css("padding-left", "10px");
        $container.find(".node.level_0").removeCss("background");
        $container.find(".node.level_0").removeCss("background-image")
      }
      _this.ensureVisible(_this, _this.options.selected);
      $container.find(".node.leaf.level_1").find(".key").each(function(index, item) {
        var $this = $(this);
        $this.closest(".level_1").show()
      })
    }else {
      _this.expandAll(_this);
      $container.find(".category").hide();
      $container.find(".node.level_0").css({"background-image":"none", "padding-left":0});
      $container.find(".node.leaf.level_1").hide();
      $container.find(".node.leaf.level_1").find(".key").each(function(index, item) {
        var $this = $(this);
        if($this.text().toLowerCase().indexOf(term.toLowerCase()) > -1) {
          var shown = false;
          $container.find(".node.leaf.level_1").find(".key").each(function(index, node) {
            var $node = $(node);
            if($node != $this) {
              if($node.text() == $this.text() && $node.is(":visible")) {
                shown = true
              }
            }
          });
          if(shown) {
            $this.closest(".level_1").hide()
          }else {
            $this.closest(".level_1").show()
          }
        }else {
          $this.closest(".level_1").hide()
        }
      })
    }
  };
  var $search = $('<div class="search input-prepend"><input type="text" class="quicksearch span2"><span class="add-on"><i class="searchicon icon-search"></i></span></div>');
  $search.keyup(function(e) {
    var term = $search.find(".quicksearch").val();
    search(e, term)
  });
  $search.find(".icon-search").off("click");
  $search.find(".icon-search").on("click", function(e) {
    var term = $search.find(".quicksearch").val();
    search(e, term)
  });
  $container.append($search);
  var _metrics = _.groupBy(_this.options.metrics, function(obj) {
    return obj.Category
  });
  $container.append('<ul class="categorylist"></ul>');
  var $categorylist = $($container.find(".categorylist"));
  _.each(_metrics, function(item, index) {
    var $list = $('<li class="node  ' + "level_" + "0" + '"></li>');
    $list.append('<div class="category">' + item[0].Category + "</div>");
    $list.append('<ul class="jcontainer"></ul>');
    $.each(item, function(index, metric) {
      if(_this.options.exclude.indexOf(metric.Name) == -1) {
        var list = '<li class="node leaf ' + "level_" + "1" + '" data-metricname="' + metric.Name + '" data-metricid="' + metric.Id + '">';
        list += '<div class="box">';
        list += '<div class="keyvaluepair">';
        list += '<div class="key">' + metric.Name + "</div>";
        list += '<div class="help"> <i class="tipsy icon-question-sign icon-white" data-caption="' + metric.Name + '" data-text="' + metric.HelpText + '" data-title="' + (metric.HelpText == "" ? "Information not available." : metric.HelpText) + '"></i> </div>';
        list += "</div>";
        list += "</div>";
        list += "</li>";
        var $li = $(list);
        $($list.find(".jcontainer:last-of-type")).append($li)
      }
    });
    $categorylist.append($list)
  });
  $($container).find(".icon-question-sign").each(function(index, item) {
    try {
      $(item).popover({placement:"right", trigger:"hover", delay:0, title:"<strong>" + $(item).attr("data-caption") + "</strong>", content:$(item).attr("data-text")})
    }catch(e) {
    }
  });
  $($html.find(".jbtn")[0]).off("click");
  $($html.find(".jbtn")[0]).on("click", function(e) {
    if($($container).is(":visible")) {
      $($container).hide()
    }else {
      $(jarvis).trigger("jarvis-picker-metrics-popup", [_this]);
      $($container).show()
    }
    if(_this.options.showlist) {
      _this.expandAll(_this);
      $container.find(".category").hide();
      $container.find(".node.level_0").css({"background-image":"none", "padding-left":0})
    }
    $search.find(".quicksearch").val("");
    $search.keyup();
    $search.find(".quicksearch").focus();
    _this.ensureVisible(_this, _this.options.selected);
    $(this).toggleClass("active")
  });
  $("body").click(function() {
    if($($container).is(":visible")) {
      $container.hide();
      $($html.find(".jbtn")[0]).removeClass("active")
    }
  });
  $html.click(function(e) {
    e.stopPropagation()
  });
  $($container).find(".node.level_0").each(function(index, item) {
    var $li = $(this);
    $li.off("click");
    $li.on("click", function(e) {
      $(".metricscontainer").hide();
      $(".jbtn").removeClass("active")
    })
  });
  $($container).find(".node.level_1").each(function(index, item) {
    var $li = $(this);
    $li.off("click");
    $li.on("click", function(e) {
      $(".metricscontainer").hide();
      $(".jbtn").removeClass("active");
      _this.setSelected(_this, $(this).attr("data-metricname"))
    })
  });
  $container.bind("mousewheel", function(e, d) {
    if(d > 0 && $(this).scrollTop() == 0) {
      e.preventDefault()
    }else {
      if(d < 0 && $(this).scrollTop() == $(this).get(0).scrollHeight - $(this).innerHeight()) {
        e.preventDefault()
      }
    }
  });
  return $html
};
$(jarvis).bind("jarvis-picker-metrics-popup", function(e, sender) {
  $(".metricscontainer").hide();
  $(".metricscontainer").removeClass("on");
  $(".metricswrapper .jbtn").removeClass("active");
  $(".jarvis.picker.datebox .picker").hide();
  $(".jarvis.picker.datebox .container").removeClass("expanded");
  $(".resolutionpicker-wrapper").hide();
  $(".resolutionwrapper .jbtn").removeClass("active")
});
jarvis.loaded.push("jarvis.visualisation.picker.metrics");
jarvis.debug.log("INFO", "Jarvis.Visualisation.Picker.Metrics", 6, "JS source loaded");
jarvis.provide("jarvis.visualisation.picker.dimensions");
jarvis.provide("jarvis.visualisation.picker.dimensions");
jarvis.require("jarvis.debug");
jarvis.require("jarvis.date");
jarvis.require("jarvis.string");
jarvis.require("jarvis.visualisation");
jarvis.visualisation.picker.Dimensions = function(options) {
  var start = (new Date).getMilliseconds();
  var _this = this;
  this._this = this;
  var _options = {container:null, placeholdertext:"Choose a dimension...", prefix:"", multiple:false, type:"button", showgrip:false, selected:"", showselected:true, dimensions:null};
  if(typeof options == "undefined") {
    throw"Container not specified";
  }else {
    _options.container = $(options.container)
  }
  if(typeof options.placeholdertext != "undefined") {
    _options.placeholdertext = options.placeholdertext
  }else {
    if(typeof _options.container.attr("data-placeholdertext") != "undefined") {
      _options.placeholdertext = _options.container.attr("data-placeholdertext")
    }
  }
  if(typeof options.prefix != "undefined") {
    _options.prefix = options.prefix
  }else {
    if(typeof _options.container.attr("data-prefix") != "undefined") {
      _options.prefix = _options.container.attr("data-prefix")
    }
  }
  if(typeof options.type != "undefined") {
    _options.type = options.type
  }else {
    if(typeof _options.container.attr("data-type") != "undefined") {
      _options.type = _options.container.attr("data-type")
    }
  }
  if(typeof options.showgrip != "undefined") {
    _options.showgrip = options.showgrip
  }else {
    if(typeof _options.container.attr("data-showgrip") != "undefined") {
      _options.showgrip = _options.container.attr("data-showgrip")
    }
  }
  if(typeof options.selected != "undefined") {
    _options.selected = options.selected
  }else {
    if(typeof _options.container.attr("data-selected") != "undefined") {
      _options.selected = _options.container.attr("data-selected")
    }
  }
  if(typeof options.multiple != "undefined") {
    _options.multiple = options.multiple
  }else {
    if(typeof _options.container.attr("data-multiple") != "undefined") {
      _options.multiple = _options.container.attr("data-multiple")
    }
  }
  if(typeof options.showselected != "undefined") {
    _options.showselected = options.showselected
  }else {
    if(typeof _options.container.attr("data-showselected") != "undefined") {
      _options.showselected = _options.container.attr("data-showselected")
    }
  }
  if(typeof options.dimensions != "undefined") {
    _options.dimensions = options.dimensions
  }
  _this.container = _options.container;
  _this.options = _options;
  if(!_options.dimensions) {
    jarvis.objects.Dimensions.List();
    _options.dimensions = jarvis.objects.Dimensions
  }
  _this.init(_this);
  var executionTime = (new Date).getMilliseconds() - start
};
jarvis.visualisation.picker.Dimensions.prototype.init = function(sender) {
  var _this = sender;
  var start = (new Date).getMilliseconds();
  var $container = _this.container;
  $container.empty();
  $container.html(_this.baseHTML(_this));
  if(_this.options.selected != "") {
    _this.setSelected(_this, _this.options.selected, _this.options.multiple)
  }
  var executionTime = (new Date).getMilliseconds() - start
};
jarvis.visualisation.picker.Dimensions.prototype.collapseAll = function(sender) {
  var _this = sender;
  $(_this.container.find(".node.level_0")).removeClass("on");
  $(_this.container.find(".jcontainer ")).removeClass("on")
};
jarvis.visualisation.picker.Dimensions.prototype.expandAll = function(sender) {
  var _this = sender;
  $(_this.container.find(".node.level_0")).addClass("on");
  $(_this.container.find(".jcontainer ")).addClass("on")
};
jarvis.visualisation.picker.Dimensions.prototype.setSelected = function(sender, dimensionname, multiple) {
  var _this = sender;
  sender.collapseAll(sender);
  if(!multiple) {
    $(_this.container.find("li[data-dimensionname]")).removeClass("on")
  }
  $(_this.container.find('li[data-dimensionname="' + dimensionname + '"]')[0]).toggleClass("on");
  _this.ensureVisible(_this, dimensionname);
  if(dimensionname != "" && _this.options.showselected) {
    $(_this.container.find(".jbtn")[0]).html(dimensionname + '<span class="caret"></span>');
    if(!$(_this.container).hasClass("on")) {
      $(_this.container).addClass("on");
      if(_this.options.allowremove) {
        $(_this.container).append('<button class="close">&times;</button>')
      }
      $($(this.container).find(".close")).off("click");
      $($(this.container).find(".close")).on("click", function(e) {
        _this.setSelected(_this, "");
        $(this).remove()
      })
    }
  }else {
    $(_this.container).removeClass("on");
    var s = ' + add dimension <span class="caret"></span>';
    if(_this.options.type == "button") {
      s = _this.options.placeholdertext + '<span class="caret"></span>'
    }
    $(_this.container.find(".jbtn")[0]).html(s)
  }
  $(this.container).closest(".pickerwrapper").attr("data-id", dimensionname);
  var $container = $(_this.container.find(".dimensionscontainer"));
  if($container.hasClass("on")) {
    $container.hide();
    $container.removeClass("on");
    $(_this.container.find(".jbtn")[0]).removeClass("active")
  }
  _this.options.selected = dimensionname;
  $(_this).trigger("select", dimensionname)
};
jarvis.visualisation.picker.Dimensions.prototype.ensureVisible = function(sender, dimensionname) {
  if(dimensionname != "") {
  }else {
    if(sender.options.selected != null) {
      dimensionname = sender.options.selected
    }
  }
  var _this = sender;
  var $li = $(_this.container.find('li[data-dimensionname="' + dimensionname + '"]')[0]);
  if(!$li.parent().hasClass("on")) {
    $li.parent().addClass("on")
  }
  $li.closest(".node.level_0").addClass("on")
};
jarvis.visualisation.picker.Dimensions.prototype.baseHTML = function(sender) {
  var _this = sender;
  var $html = $('<div class="dimensionswrapper"></div>');
  if(_this.options.type == "button") {
    $html.append('<a class="btn jbtn">' + _this.options.placeholdertext + ' <b class="caret"></b></a>')
  }else {
    if(_this.options.type == "none") {
      $html.append('<bb class="jbtn">' + _this.options.placeholdertext + ' <b class="caret"></b></bb>')
    }else {
      if(_this.options.showgrip) {
        $html.append('<div class="grip"></div>')
      }
      $html.append('<div class="customadd dimension jbtn"> + add dimension </div>')
    }
  }
  $html.append('<div class="dimensionscontainer"><div>');
  var $container = $($html.find(".dimensionscontainer"));
  var search = function(e, term) {
    if((term == "" || term.length < 2) && e.which != 13) {
      _this.collapseAll(_this);
      _this.ensureVisible(_this, _this.options.selected);
      $container.find(".category").show();
      $container.find(".node.level_0").css("background-image", "url('" + jarvis.hostname + "/assets/img/collapse.png') no-repeat 0px 8px;");
      $container.find(".node.level_0").css("padding-left", "10px");
      $container.find(".node.level_0").removeCss("background");
      $container.find(".node.level_0").removeCss("background-image");
      $container.find(".node.leaf.level_1").find(".key").each(function(index, item) {
        var $this = $(this);
        $this.closest(".level_1").show()
      })
    }else {
      _this.expandAll(_this);
      $container.find(".category").hide();
      $container.find(".node.level_0").css({"background-image":"none", "padding-left":0});
      $container.find(".node.leaf.level_1").find(".key").each(function(index, item) {
        var $this = $(this);
        if($this.text().toLowerCase().indexOf(term.toLowerCase()) > -1) {
          $this.closest(".level_1").show()
        }else {
          $this.closest(".level_1").hide()
        }
      })
    }
  };
  var $search = $('<div class="search input-prepend"><input type="text" class="quicksearch span2"><span class="add-on"><i class="searchicon icon-search"></i></span></div>');
  $search.keyup(function(e) {
    var term = $search.find(".quicksearch").val();
    search(e, term)
  });
  $search.find(".icon-search").off("click");
  $search.find(".icon-search").on("click", function(e) {
    var term = $search.find(".quicksearch").val();
    search(e, term)
  });
  $container.append($search);
  var _dimensions = _.groupBy(jarvis.objects.Dimensions, function(obj) {
    if(!obj.Category) {
      return"(not set)"
    }
    return obj.Category.Name
  });
  _dimensions = _.sortBy(_dimensions, function(item) {
    return item[0].Category.Ordinal
  });
  $container.append('<ul class="categorylist"></ul>');
  var $categorylist = $($container.find(".categorylist"));
  _.each(_dimensions, function(item, index) {
    if(item[0].Category && item[0].Category.Name != "(not set)") {
      var $list = $('<li class="node  ' + "level_" + "0" + '"></li>');
      $list.append('<div class="category">' + (!item[0].Category ? "(not set)" : item[0].Category.Name) + "</div>");
      $list.append('<ul class="jcontainer"></ul>');
      var bDrawn = false;
      $.each(item, function(index, dimension) {
        if(dimension.ColumnName != dimension.DictionaryTable_Column || dimension.Id <= -1) {
          var list = '<li class="node leaf ' + "level_" + "1" + '" data-dimensionname="' + dimension.Name + '" data-dimensionid="' + dimension.Id + '">';
          list += '<div class="box">';
          list += '<div class="keyvaluepair">';
          list += '<div class="key">' + dimension.Name + "</div>";
          list += '<div class="help"> <i class="icon-question-sign icon-white" data-caption="' + dimension.Name + '" data-text="' + dimension.HelpText + '"></i> </div>';
          list += "</div>";
          list += "</div>";
          list += "</li>";
          var $li = $(list);
          $($list.find(".jcontainer:last-of-type")).append($li);
          bDrawn = true
        }
      });
      if(bDrawn) {
        $categorylist.append($list)
      }
    }
  });
  $($container).find(".icon-question-sign").each(function(index, item) {
    $(item).popover({placement:"right", trigger:"hover", delay:0, title:"<strong>" + $(item).attr("data-caption") + "</strong>", content:$(item).attr("data-text")})
  });
  $($html.find(".jbtn")[0]).off("click");
  $($html.find(".jbtn")[0]).on("click", function(e) {
    $container.toggle();
    $container.toggleClass("on");
    _this.collapseAll(_this);
    $search.find(".quicksearch").val("");
    $search.keyup();
    $search.focus();
    _this.ensureVisible(_this, _this.options.selected);
    $(this).toggleClass("active")
  });
  $("body").click(function() {
    if($container.hasClass("on")) {
      $container.toggle();
      $container.toggleClass("on");
      $($html.find(".jbtn")[0]).toggleClass("active")
    }
  });
  $html.click(function(e) {
    e.stopPropagation()
  });
  $($container).find(".node.level_0").each(function(index, item) {
    var $li = $(this);
    $li.off("click");
    $li.on("click", function(e) {
      e.stopPropagation();
      $(this).toggleClass("on");
      $($(this).find(".jcontainer")[0]).toggleClass("on")
    })
  });
  $($container).find(".node.level_1").each(function(index, item) {
    var $li = $(this);
    $li.off("click");
    $li.on("click", function(e) {
      e.stopPropagation();
      _this.setSelected(_this, $(this).attr("data-dimensionname"), _this.options.multiple)
    })
  });
  $container.bind("mousewheel", function(e, d) {
    if(d > 0 && $(this).scrollTop() == 0) {
      e.preventDefault()
    }else {
      if(d < 0 && $(this).scrollTop() == $(this).get(0).scrollHeight - $(this).innerHeight()) {
        e.preventDefault()
      }
    }
  });
  return $html
};
jarvis.loaded.push("jarvis.visualisation.picker.dimensions");
jarvis.debug.log("INFO", "Jarvis.Visualisation.Picker.Dimensions", 6, "JS source loaded");
jarvis.provide("jarvis.visualisation.container");
jarvis.require("jarvis.debug");
jarvis.require("jarvis.date");
jarvis.require("jarvis.string");
jarvis.require("jarvis.visualisation");
jarvis.visualisation.container;
jarvis.debug.log("INFO", "Jarvis.Visualisation.Container", 6, "JS source loaded");
jarvis.provide("jarvis.visualisation.container.metrics");
jarvis.require("jarvis.debug");
jarvis.require("jarvis.date");
jarvis.require("jarvis.string");
jarvis.require("jarvis.visualisation");
jarvis.require("jarvis.visualisation.picker.metrics");
jarvis.visualisation.container.Metrics = function(options) {
  var start = (new Date).getMilliseconds();
  var _this = this;
  this._this = this;
  _this.id = -1;
  var _options = {container:null, title:"New metric group", metrics:[], limit:-1};
  if(typeof options == "undefined") {
    throw"Container not specified";
  }else {
    _options.container = $(options.container);
    _options.title = options.title;
    if(options.metrics) {
      _options.metrics = options.metrics
    }
    if(options.id) {
      _this.id = options.id
    }
    if(options.limit) {
      _options.limit = options.limit
    }
    if(options.hidetitle) {
      _options.hidetitle = options.hidetitle
    }
  }
  _this.container = _options.container;
  _this.options = _options;
  _this.init(_this);
  var executionTime = (new Date).getMilliseconds() - start
};
jarvis.visualisation.container.Metrics.prototype.init = function(sender) {
  var _this = sender;
  var start = (new Date).getMilliseconds();
  var $container = _this.container;
  $container.empty();
  $container.html(_this.baseHTML(_this));
  if(_this.options.metrics.length > 0) {
    $(this.options.metrics).each(function(index, metric) {
    })
  }
  var executionTime = (new Date).getMilliseconds() - start
};
jarvis.visualisation.container.Metrics.prototype.baseHTML = function(sender) {
  var _this = sender;
  var $html = $("");
  var $wrapper = $('<div class="metricscontainer"></div>');
  var $container = $('<div class="well "></div>');
  $container.append('<button type="button" class="close">&times;</button>');
  $container.find(".close").off("click");
  $container.find(".close").on("click", function(e) {
    $wrapper.remove();
    $(_this).trigger("group-removed", _this.id)
  });
  $wrapper.append($container);
  if(!_this.options.hidetitle) {
    $container.append('<input class="input_mgroup_title" type="text" placeholder="New metric group" value="' + _this.options.title + '">');
    var $input_title = $($container.find(".input_mgroup_title"));
    $input_title.off("keyup");
    $input_title.on("keyup", function(e) {
      $(_this).trigger("rename", $(this).val())
    })
  }
  var $metrics = $('<div class="metricscollection"></div>');
  $container.append($metrics);
  $(_this.options.metrics).each(function(index, metric) {
    if(!metric.deleted) {
      var $metric = $('<div class="pickerwrapper"><div class="jarvis picker metrics" data-type="placeholder"></div><button type="button" class="close">&times;</button></div>');
      var $close = $metric.find(".close");
      $close.off("click");
      $close.on("click", function(e) {
        $metric.remove();
        $(_this).trigger("metric-removed", metric.Name)
      });
      var v = new jarvis.visualisation.picker.Metrics({container:$($metric.find(".picker")), showgrip:true, selected:metric.Name});
      $(v).bind("select", function(event, value) {
        if(value != "") {
          $close.attr("data-id", value);
          _this.addMetricBox(_this, "");
          $(_this).trigger("metric-removed", metric.Name);
          $(_this).trigger("metric-added", value)
        }else {
          v.options.container.remove();
          v = null
        }
      });
      $metrics.append($metric)
    }
  });
  var $metric = $('<div class="pickerwrapper"><div class="jarvis picker metrics" data-type="placeholder"></div><button type="button" class="close">&times;</button></div>');
  var $close = $metric.find(".close");
  $close.off("click");
  $close.on("click", function(e) {
    $metric.remove();
    $(_this).trigger("metric-removed", $(this).attr("data-id"))
  });
  var v = new jarvis.visualisation.picker.Metrics({container:$($metric.find(".picker")), showgrip:true});
  $(v).bind("select", function(event, value) {
    if(value != "") {
      $close.attr("data-id", value);
      _this.addMetricBox(_this, "");
      $(_this).trigger("metric-added", value)
    }else {
      v.options.container.remove();
      v = null
    }
  });
  $metrics.append($metric);
  $html = $wrapper;
  $html.find(".metricscollection").sortable({connectWith:".pickerwrapper", handle:".grip", distance:-250, update:function(e, p) {
    $(_this).trigger("metric-reorder")
  }, stop:function(event, ui) {
  }}).disableSelection();
  return $html
};
jarvis.visualisation.container.Metrics.prototype.addMetricBox = function(sender, selectedMetric) {
  var _this = sender;
  var $container = sender.container.find(".metricscollection");
  var currentboxes = $container.find(".pickerwrapper").length;
  if(currentboxes >= _this.options.limit && _this.options.limit > -1) {
    return
  }
  var customboxcount = $container.find(".jarvis.picker.metrics:not(.on)").length;
  if(customboxcount > 0) {
    return
  }
  var $metric = $('<div class="pickerwrapper"><div class="jarvis picker metrics" data-type="placeholder" ></div><button type="button" class="close">&times;</button></div>');
  var $close = $metric.find(".close");
  $close.off("click");
  $close.on("click", function(e) {
    $metric.remove();
    $(_this).trigger("metric-removed", $(this).attr("data-id"))
  });
  var v = new jarvis.visualisation.picker.Metrics({container:$metric.find(".picker"), showgrip:true});
  $(v).bind("select", function(event, value) {
    if(value != "") {
      $close.attr("data-id", value);
      _this.addMetricBox(_this, "");
      $(_this).trigger("metric-added", value)
    }else {
      v.options.container.remove();
      v = null
    }
  });
  $container.append($metric)
};
jarvis.loaded.push("jarvis.visualisation.container.metrics");
jarvis.debug.log("INFO", "Jarvis.Visualisation.Container.Metrics", 6, "JS source loaded");
jarvis.provide("jarvis.visualisation.container.dimensions");
jarvis.require("jarvis.debug");
jarvis.require("jarvis.date");
jarvis.require("jarvis.string");
jarvis.require("jarvis.visualisation");
jarvis.visualisation.container.Dimensions = function(options) {
  var start = (new Date).getMilliseconds();
  var _this = this;
  this._this = this;
  var _options = {container:null, placeholdertext:"Choose a dimension...", type:"button", selected:"", limit:4, dimensions:[]};
  if(typeof options == "undefined") {
    throw"Container not specified";
  }else {
    _options.container = $(options.container);
    if(options.dimensions) {
      _options.dimensions = options.dimensions
    }
    if(options.limit) {
      _options.limit = options.limit
    }
  }
  _this.container = _options.container;
  _this.options = _options;
  _this.init(_this);
  var executionTime = (new Date).getMilliseconds() - start
};
jarvis.visualisation.container.Dimensions.prototype.init = function(sender) {
  var _this = sender;
  var start = (new Date).getMilliseconds();
  var $container = _this.container;
  $container.empty();
  $container.html(_this.baseHTML(_this));
  var executionTime = (new Date).getMilliseconds() - start
};
jarvis.visualisation.container.Dimensions.prototype.baseHTML = function(sender) {
  var _this = sender;
  var $html = $("");
  var $wrapper = $('<div class="dimensioncontainer"></div>');
  var $container = $('<div class="well"></div>');
  $wrapper.append($container);
  var $dimensions = $('<div class="dimensionscollection"></div>');
  $container.append($dimensions);
  if(_this.options.dimensions.length > 0) {
    $(_this.options.dimensions).each(function(index, dimension) {
      if(!dimension.deleted) {
        var $dimension = $('<div class="pickerwrapper"><div class="jarvis picker dimensions" data-type="placeholder"></div><button type="button" class="close">&times;</button></div>');
        var $close = $dimension.find(".close");
        $close.off("click");
        $close.on("click", function(e) {
          $dimension.remove();
          $(_this).trigger("dimension-removed", dimension.Name)
        });
        var v = new jarvis.visualisation.picker.Dimensions({container:$($dimension.find(".picker")), showgrip:true, selected:dimension.Name});
        $(v).bind("select", function(event, value) {
          if(value != "") {
            $close.attr("data-id", value);
            _this.addDimensionBox(_this, "");
            $(_this).trigger("dimension-removed", dimension.Name);
            $(_this).trigger("dimension-added", value)
          }else {
            v.options.container.remove();
            v = null
          }
        });
        $dimensions.append($dimension)
      }
    })
  }
  var $dimension = $('<div class="pickerwrapper"><div class="jarvis picker dimensions" data-type="placeholder"></div><button type="button" class="close">&times;</button></div>');
  var $close = $dimension.find(".close");
  $close.off("click");
  $close.on("click", function(e) {
    $dimension.remove();
    $(_this).trigger("dimension-removed", $(this).attr("data-id"))
  });
  var v = new jarvis.visualisation.picker.Dimensions({container:$($dimension.find(".picker")), showgrip:true});
  $(v).bind("select", function(event, value) {
    if(value != "") {
      $close.attr("data-id", value);
      _this.addDimensionBox(_this, "");
      $(_this).trigger("dimension-added", value)
    }else {
      v.options.container.remove();
      v = null
    }
  });
  $dimensions.append($dimension);
  $html = $wrapper;
  $html.find(".dimensionscollection").sortable({connectWith:".pickerwrapper", handle:".grip", distance:-250, update:function(e, p) {
    $(_this).trigger("dimension-reorder")
  }, stop:function(event, ui) {
  }}).disableSelection();
  return $html
};
jarvis.visualisation.container.Dimensions.prototype.addDimensionBox = function(sender, selectedDimension) {
  var _this = sender;
  var $container = sender.container.find(".dimensionscollection");
  var currentboxes = $container.find(".pickerwrapper").length;
  if(currentboxes >= _this.options.limit && _this.options.limit > -1) {
    return
  }
  var customboxcount = $container.find(".jarvis.picker.dimensions:not(.on)").length;
  if(customboxcount > 0) {
    return
  }
  var $dimension = $('<div class="pickerwrapper"><div class="jarvis picker dimensions" data-type="placeholder" ></div><button type="button" class="close">&times;</button></div>');
  var $close = $dimension.find(".close");
  $close.off("click");
  $close.on("click", function(e) {
    $dimension.remove();
    $(_this).trigger("dimension-removed", $(this).attr("data-id"))
  });
  var v = new jarvis.visualisation.picker.Dimensions({container:$dimension.find(".picker"), showgrip:true});
  $(v).bind("select", function(event, value) {
    if(value != "") {
      $close.attr("data-id", value);
      _this.addDimensionBox(_this, "");
      $(_this).trigger("dimension-added", value)
    }else {
      v.options.container.remove();
      v = null
    }
  });
  $container.append($dimension)
};
jarvis.loaded.push("jarvis.visualisation.container.dimensions");
jarvis.debug.log("INFO", "Jarvis.Visualisation.Container.Dimensions", 6, "JS source loaded");
jarvis.provide("jarvis.visualisation.container.Filter");
jarvis.require("jarvis.debug");
jarvis.require("jarvis.date");
jarvis.require("jarvis.string");
jarvis.require("jarvis.visualisation");
jarvis.visualisation.container.Filter = function(options) {
  var start = (new Date).getMilliseconds();
  var _this = this;
  this._this = this;
  var _options = {container:null};
  if(typeof options == "undefined") {
    throw"Container not specified";
  }else {
    _options.container = $(options.container);
    if(options.dimensions) {
      _options.dimensions = options.dimensions
    }
    if(options.limit) {
      _options.limit = options.limit
    }
  }
  _this.container = _options.container;
  _this.options = _options;
  _this.init(_this);
  var executionTime = (new Date).getMilliseconds() - start
};
jarvis.visualisation.container.Filter.prototype.init = function(sender) {
  var _this = sender;
  var start = (new Date).getMilliseconds();
  var $container = _this.container;
  $container.empty();
  $container.html(_this.baseHTML(_this));
  var executionTime = (new Date).getMilliseconds() - start
};
jarvis.visualisation.container.Filter.prototype.baseHTML = function(sender) {
  var _this = sender;
  var $html = $("");
  var $wrapper = $('<div class="search_filter_wrapper"></div>');
  var $condition_wrapper = $('<div class="condition_wrapper"></div>');
  var $group_wrapper = $('<div class="condition_group_wrapper"></div>');
  var $group = $('<div class="condition_group"></div>');
  var $conditions = $('<div class="conditions"><div class="close">&times;</div></div>');
  var $includeexclude = $('<div class="condition condition_include "><div class="btn-group">' + '<a class="btn dropdown-toggle" data-toggle="dropdown" href="#">' + "Include" + '<span class="caret"></span>' + "</a>" + '<ul class="dropdown-menu">' + '<li class="active"><a>Include</a></li>' + '<li class=""><a>Exclude</a></li>' + "</ul>" + "</div></div>");
  var $picker = $('<div class="condition condition_picker"><div class="jarvis picker dimensions"></div></div>');
  var v = new jarvis.visualisation.picker.Dimensions({container:$picker.find(".picker"), showgrip:false, type:"placeholder"});
  $(v).bind("select", function(event, value) {
    if(value != "") {
      $close.attr("data-id", value);
      _this.addDimensionBox(_this, "");
      $(_this).trigger("dimension-added", value)
    }else {
      v.options.container.remove();
      v = null
    }
  });
  var $type = $('<div class="condition condition_type"><div class="btn-group">' + '<a class="btn dropdown-toggle" data-toggle="dropdown" href="#">' + "Containing" + '<span class="caret"></span>' + "</a>" + '<ul class="dropdown-menu">' + '<li class=""><a>Excatly matching</a></li>' + '<li class=""><a>Matching RegExp</a></li>' + '<li class=""><a>Begins with</a></li>' + '<li class=""><a>Ends with</a></li>' + '<li class="active"><a>Containing</a></li>' + "</ul>" + "</div></div>");
  var $term = $('<div class="condition condition_term"><div><input type="text" class="advancedsearch_text input-medium"></div></div>');
  $conditions.append($includeexclude);
  $conditions.append($picker);
  $conditions.append($type);
  $conditions.append($term);
  $group.append($conditions);
  $group_wrapper.append($group);
  $condition_wrapper.append($group_wrapper);
  var $sep = $('<div class="condition_sep_and">and</div>');
  var $newgroup = $('<div class="condition_group_wrapper"></div>');
  $conditions = $('<div class="conditions"></div>');
  var $addnewbutton = $('<div class="addnewconditionbutton" style=""><span><span class="pluscaption">+</span>&nbsp;Add another <span class="dimensioncaption">filter</span></span></div>');
  $conditions.append($addnewbutton);
  $newgroup.append($conditions);
  $condition_wrapper.append($sep);
  $condition_wrapper.append($newgroup);
  $wrapper.append($condition_wrapper);
  $html = $wrapper;
  return $html
};
jarvis.visualisation.container.Filter.prototype.addDimensionBox = function(sender, selectedDimension) {
  var _this = sender;
  var $container = sender.container.find(".dimensionscollection");
  var currentboxes = $container.find(".pickerwrapper").length;
  if(currentboxes >= _this.options.limit && _this.options.limit > -1) {
    return
  }
  var customboxcount = $container.find(".jarvis.picker.dimensions:not(.on)").length;
  if(customboxcount > 0) {
    return
  }
  var $dimension = $('<div class="pickerwrapper"><div class="jarvis picker dimensions" data-type="placeholder" ></div><button type="button" class="close">&times;</button></div>');
  var $close = $dimension.find(".close");
  $close.off("click");
  $close.on("click", function(e) {
    $dimension.remove();
    $(_this).trigger("dimension-removed", $(this).attr("data-id"))
  });
  var v = new jarvis.visualisation.picker.Dimensions({container:$dimension.find(".picker"), showgrip:true});
  $(v).bind("select", function(event, value) {
    if(value != "") {
      $close.attr("data-id", value);
      _this.addDimensionBox(_this, "");
      $(_this).trigger("dimension-added", value)
    }else {
      v.options.container.remove();
      v = null
    }
  });
  $container.append($dimension)
};
jarvis.loaded.push("jarvis.visualisation.container.Filter");
jarvis.debug.log("INFO", "jarvis.visualisation.container.Filter", 6, "JS source loaded");
jarvis.provide("jarvis.visualisation.realtime");
jarvis.require("jarvis.debug");
jarvis.require("jarvis.date");
jarvis.require("jarvis.string");
jarvis.visualisation.realtime;
jarvis.visualisation.realtime.connected = false;
jarvis.visualisation.realtime.paused = false;
jarvis.visualisation.realtime.pausedTime = null;
jarvis.visualisation.realtime.serverrunning = false;
jarvis.visualisation.realtime.statusboxes = [];
jarvis.visualisation.realtime.subscribers = [];
jarvis.visualisation.realtime.drillDownFilter = "";
jarvis.visualisation.realtime.panelFilter = "";
jarvis.visualisation.realtime.globalfilter = "";
jarvis.visualisation.realtime.filters = [];
jarvis.visualisation.realtime.serverTimestamp;
jarvis.visualisation.realtime.init = function() {
  var start = (new Date).getMilliseconds();
  window.jarvisResponse_ServerTimestamp = jarvis.visualisation.realtime.Process_serverTimeStamp;
  var executionTime = (new Date).getMilliseconds() - start;
  jarvis.debug.log("INFO", "Realtime", 5, "...realtime init (" + executionTime + "ms)")
};
jarvis.visualisation.realtime.Process_serverTimeStamp = function(data) {
  jarvis.visualisation.realtime.serverTimestamp = new Date(data)
};
jarvis.visualisation.realtime.processFilter = function() {
  jarvis.visualisation.realtime.globalfilter = "";
  var oldfilters = jarvis.visualisation.realtime.filters;
  jarvis.visualisation.realtime.filters = [];
  $(jarvis.visualisation.realtime.panelFilter.split("[AND]")).each(function(index, item) {
    var dimension = item.split("=")[0];
    var value = item.split("=")[1];
    if(dimension) {
      var filter = {caption:dimension, value:value};
      jarvis.visualisation.realtime.filters.push(filter)
    }
  });
  $(jarvis.visualisation.realtime.drillDownFilter.split("[AND]")).each(function(index, item) {
    var dimension = item.split("=")[0];
    var value = item.split("=")[1];
    if(dimension) {
      var filter = {caption:dimension, value:value};
      jarvis.visualisation.realtime.filters.push(filter)
    }
  });
  jarvis.visualisation.realtime.globalfilter = jarvis.visualisation.realtime.panelFilter + jarvis.visualisation.realtime.drillDownFilter;
  if(jarvis.visualisation.realtime.filters != oldfilters) {
    $(jarvis.visualisation.realtime).trigger("filterchange")
  }
  var $filterbox = $(".jarvis.realtime.panel").find(".filtersWrapper");
  if($filterbox) {
    $filterbox.empty();
    if(jarvis.visualisation.realtime.filters.length == 0) {
      $filterbox.hide()
    }else {
      $(jarvis.visualisation.realtime.filters).each(function(index, item) {
        var _html = "";
        _html += '<div class="filterWrapper">' + '<div class="filterContainer">' + '<span class="caption">' + item.caption + ":</span>" + '<span class="value">' + item.value + "</span>" + '<button type="button" class="close">\u00d7</button>' + "</div>" + "</div>";
        var $item = $(_html);
        var $close = $($item.find(".close"));
        $close.off("click");
        $close.on("click", function(e) {
          var key = item.caption + "=" + item.value + "[AND]";
          jarvis.visualisation.realtime.panelFilter = jarvis.visualisation.realtime.panelFilter.replace(key, "");
          jarvis.visualisation.realtime.drillDownFilter = jarvis.visualisation.realtime.drillDownFilter.replace(key, "");
          jarvis.visualisation.realtime.processFilter()
        });
        $filterbox.append($item)
      });
      $filterbox.show()
    }
  }
};
jarvis.visualisation.realtime.event_backintime = function(data) {
  $(jarvis.visualisation.realtime).trigger("backintime", data)
};
jarvis.visualisation.realtime.event_backtotime = function(data) {
  $(jarvis.visualisation.realtime).trigger("backtotime", data)
};
jarvis.visualisation.realtime.start = function() {
  if(jarvis.visualisation.realtime.connected) {
    return
  }
  PokeIn.Start(function(is_done) {
    if(is_done) {
      jarvis.debug.log("INFO", "Realtime", 5, "Comet Started");
      jarvis.visualisation.realtime.connected = is_done;
      $(jarvis.visualisation.realtime).trigger("cometstart")
    }
  })
};
jarvis.visualisation.realtime.restart = function() {
  if(jarvis.visualisation.realtime.connected) {
    $(jarvis.visualisation.realtime).trigger("cometstart");
    return
  }
  jarvis.debug.log("INFO", "Realtime", 5, "Restarting Comet");
  PokeIn.ReConnect();
  document.OnPokeInReady = function() {
    jarvis.visualisation.realtime.start()
  }
};
jarvis.visualisation.realtime.stop = function() {
  if(!jarvis.visualisation.realtime.connected) {
    $(jarvis.visualisation.realtime).trigger("cometstop");
    return
  }
  jarvis.debug.log("INFO", "Realtime", 5, "Comet Stopped");
  PokeIn.Close();
  jarvis.visualisation.realtime.connected = false;
  $(jarvis.visualisation.realtime).trigger("cometstop")
};
jarvis.debug.log("INFO", "Jarvis.Realtime.Visualisation", 6, "JS source loaded");
jarvis.provide("jarvis.visualisation.realtime.Status");
jarvis.require("jarvis.debug");
jarvis.require("jarvis.date");
jarvis.require("jarvis.string");
jarvis.require("jarvis.visualisation.realtime");
jarvis.visualisation.realtime.Status.init = function(options, container) {
  var _this = this;
  var start = (new Date).getMilliseconds();
  this._this = this;
  this.options = options;
  this.containers = this.containers || [];
  var matchedContainers = null;
  if(container) {
    matchedContainers = $(container)
  }else {
    matchedContainers = $(".jarvis.realtime.status")
  }
  if(matchedContainers.length == 0) {
    return
  }
  $(matchedContainers).each(function(index, item) {
    if(!$(this).parent().hasClass("prettyprint")) {
      jarvis.debug.log("INFO", "jarvis.visualisation.realtime.Status", 6, "Applying to container ('" + this.id + "')");
      $(this).html(_this.baseHTML());
      $(this).bind("isConnected", function(evt, ret) {
        ret.data = jarvis.visualisation.realtime.connected
      });
      $(this).find(".alert .close").bind("click", function(evt) {
        $(this).trigger("dismissed", $(this).data().data)
      });
      _this.containers.push(this);
      jarvis.visualisation.realtime.statusboxes.push(this)
    }
  });
  _this.setContent();
  $(jarvis.realtime).bind("cometstart", function(e) {
    _this.setContent()
  });
  $(jarvis.realtime).bind("cometstop", function(e) {
    _this.setContent()
  });
  jarvis.objects.Dimensions.List();
  jarvis.objects.Metrics.List();
  var executionTime = (new Date).getMilliseconds() - start;
  jarvis.debug.log("INFO", "jarvis.visualisation.realtime.Status", 5, "...init (" + executionTime + "ms)")
};
jarvis.visualisation.realtime.Status.setContent = function(content) {
  $(jarvis.visualisation.realtime.Status.containers).each(function(index, item) {
    var connected = null;
    var paused = null;
    var showwhenworking = null;
    if($(this).attr("data-connected")) {
      connected = eval($(this).attr("data-connected"))
    }else {
      connected = jarvis.visualisation.realtime.connected
    }
    if($(this).attr("data-paused")) {
      paused = eval($(this).attr("data-paused"))
    }else {
      paused = jarvis.visualisation.realtime.paused
    }
    if($(this).attr("data-showwhenworking")) {
      showwhenworking = eval($(this).attr("data-showwhenworking"))
    }else {
      showwhenworking = false
    }
    var message = "";
    var className = "";
    if(!jarvis.visualisation.realtime.serverrunning) {
      className = "alert-error";
      message = "<strong>Realtime error!</strong> The Realtime system appears to be offline.";
      $(this).show()
    }else {
      if(connected) {
        className = "alert-success";
        message = "<strong>Realtime working!</strong> All systems seem to be working correctly.";
        if(!showwhenworking) {
          $(this).hide()
        }
      }else {
        if(!connected && !paused) {
          className = "alert-error";
          message = "<strong>Realtime error!</strong> Realtime appears to be stopped.";
          $(this).show()
        }else {
          if(!connected && paused) {
            className = "alert-info";
            if(jarvis.visualisation.realtime.pausedTime != null) {
              message = "Realtime is currently paused at <strong>" + jarvis.date.formatDate(jarvis.visualisation.realtime.pausedTime, "hh:nn", true) + "</strong>"
            }else {
              message = "<strong>Realtime paused!</strong> Realtime view is currently paused"
            }
            $(this).show()
          }
        }
      }
    }
    $(this).find(".content").html(message);
    $(this).find(".alert").removeClass("alert-success");
    $(this).find(".alert").removeClass("alert-error");
    $(this).find(".alert").removeClass("alert-info");
    $(this).find(".alert").addClass(className);
    $(this).data({data:message})
  })
};
jarvis.visualisation.realtime.Status.jarvisResponse_ServerTimestamp = function(message) {
  var data = new Date(message);
  jarvis.visualisation.realtime.Status.setContent(data)
};
jarvis.visualisation.realtime.Status.baseHTML = function() {
  var $html = $('<div class="alert" ></div>');
  $html.append('<button class="close" data-dismiss="alert">\u00d7</button>');
  $html.append('<span class="content"></span>');
  return $html
};
jarvis.visualisation.realtime.Status.formatter = function(datetime, format) {
  if(!format) {
    format = "mmm dd, yyyy hh:nn:ss"
  }
  return jarvis.date.formatDate(datetime, format)
};
jarvis.debug.log("INFO", "jarvis.visualisation.realtime.Status", 6, "JS source loaded");
jarvis.provide("jarvis.visualisation.realtime.StartStop");
jarvis.require("jarvis.debug");
jarvis.require("jarvis.date");
jarvis.require("jarvis.string");
jarvis.require("jarvis.visualisation.realtime");
jarvis.visualisation.realtime.StartStop.init = function(options, container) {
  var _this = this;
  var start = (new Date).getMilliseconds();
  this._this = this;
  this.options = options;
  this.containers = this.containers || [];
  jarvis.objects.Dimensions.List();
  jarvis.objects.Metrics.List();
  var matchedContainers = null;
  if(container) {
    matchedContainers = $(container)
  }else {
    matchedContainers = $(".jarvis.realtime.startstop")
  }
  if(matchedContainers.length == 0) {
    return
  }
  $(matchedContainers).each(function(index, item) {
    if(!$(this).parent().hasClass("prettyprint")) {
      jarvis.debug.log("INFO", "jarvis.visualisation.realtime.StartStop", 6, "Applying to container ('" + this.id + "')");
      if($(this).hasClass("start")) {
        $(this).addClass("btn btn-large btn-primary");
        $(this).off("click");
        $(this).bind("click", function(e) {
          jarvis.visualisation.realtime.restart()
        });
        if(jarvis.visualisation.realtime.connected) {
          $(this).addClass("disabled")
        }
      }else {
        if($(this).hasClass("stop")) {
          $(this).addClass("btn btn-large");
          $(this).off("click");
          $(this).bind("click", function(e) {
            jarvis.visualisation.realtime.stop()
          });
          if(!jarvis.visualisation.realtime.connected) {
            $(this).addClass("disabled")
          }
        }
      }
      $(this).find(".alert .close").bind("click", function(evt) {
        $(this).trigger("dismissed", $(this).data().data)
      });
      _this.containers.push(this)
    }
  });
  $(jarvis.realtime).bind("cometstart", function(e) {
    $(_this.containers).each(function(index, item) {
      if($(this).hasClass("start")) {
        $(this).addClass("disabled")
      }else {
        if($(this).hasClass("stop")) {
          $(this).removeClass("disabled")
        }
      }
    })
  });
  $(jarvis.realtime).bind("cometstop", function(e) {
    $(_this.containers).each(function(index, item) {
      if($(this).hasClass("start")) {
        $(this).removeClass("disabled")
      }else {
        if($(this).hasClass("stop")) {
          $(this).addClass("disabled")
        }
      }
    })
  });
  var executionTime = (new Date).getMilliseconds() - start;
  jarvis.debug.log("INFO", "jarvis.visualisation.realtime.StartStop", 5, "...init (" + executionTime + "ms)")
};
jarvis.debug.log("INFO", "Jarvis.Realtime.Visualisation.Status", 6, "JS source loaded");
jarvis.provide("jarvis.visualisation.realtime.DateBox");
jarvis.require("jarvis.debug");
jarvis.require("jarvis.date");
jarvis.require("jarvis.string");
jarvis.require("jarvis.visualisation.realtime");
jarvis.visualisation.realtime.DateBox.init = function(options, container) {
  var _this = this;
  var start = (new Date).getMilliseconds();
  this._this = this;
  this.options = options;
  this.containers = this.containers || [];
  jarvis.visualisation.realtime.start();
  var matchedContainers = null;
  if(container) {
    matchedContainers = $(container)
  }else {
    matchedContainers = $(".jarvis.realtime.datebox")
  }
  if(matchedContainers.length == 0) {
    return
  }
  $(matchedContainers).each(function(index, item) {
    if(!$(this).parent().hasClass("prettyprint")) {
      jarvis.debug.log("INFO", "jarvis.visualisation.realtime.DateBox", 6, "Applying to container ('" + this.id + "')");
      $(this).html(_this.baseHTML());
      $(this).bind("data", function(evt, ret) {
        ret.data = $(this).data().data
      });
      $(this).bind("click", function(evt) {
        $(this).trigger("clicked", $(this).data().data)
      });
      var datebox = $(this).find(".datebox");
      if(datebox.length == 0) {
        throw"Could not find a valid .datebox in container " + container;
      }else {
        _this.containers.push(this)
      }
    }
  });
  _this.setContent(_this.formatter(jarvis.date.getServerTimestamp()));
  if(matchedContainers.length > 0) {
    window.jarvisResponse_ServerTimestamp = jarvis.visualisation.realtime.DateBox.jarvisResponse_ServerTimestamp
  }
  var executionTime = (new Date).getMilliseconds() - start;
  jarvis.debug.log("INFO", "jarvis.visualisation.realtime.DateBox", 5, "...init (" + executionTime + "ms)")
};
jarvis.visualisation.realtime.DateBox.setContent = function(content) {
  $(jarvis.visualisation.realtime.DateBox.containers).each(function(index, item) {
    var datebox = $(this).find(".datebox");
    var fixedcontent = jarvis.visualisation.realtime.DateBox.formatter(content, $(this).attr("data-format"));
    $(datebox[0]).text(fixedcontent);
    $(this).data({data:content})
  })
};
jarvis.visualisation.realtime.DateBox.jarvisResponse_ServerTimestamp = function(message) {
  var data = new Date(message);
  jarvis.visualisation.realtime.DateBox.setContent(data)
};
jarvis.visualisation.realtime.DateBox.baseHTML = function() {
  var $html = $('<div class="wrapper"></div>');
  $html.append('<div class="datebox"></div>');
  return $html
};
jarvis.visualisation.realtime.DateBox.formatter = function(datetime, format) {
  if(!format) {
    format = "mmm dd, yyyy hh:nn:ss"
  }
  return jarvis.date.formatDate(datetime, format)
};
jarvis.debug.log("INFO", "jarvis.visualisation.realtime.DateBox", 6, "JS source loaded");
jarvis.provide("jarvis.visualisation.realtime.Timeline");
jarvis.require("jarvis.debug");
jarvis.require("jarvis.date");
jarvis.require("jarvis.string");
jarvis.require("jarvis.visualisation.realtime");
jarvis.visualisation.realtime.Timeline = function(options) {
  var start = (new Date).getMilliseconds();
  this._this = this;
  this.options = options;
  this.key = "";
  this.initialized = false;
  this.gettingBackData = false;
  this.initialCallbacks = [];
  this.initialTimestamp = null;
  this.resizingMinutes = false;
  this.resizingSeconds = false;
  this.chartInitMinutes = false;
  this.chartInitSeconds = false;
  this.showseconds = true;
  this.seriescolor = "#1a87d5";
  jarvis.visualisation.realtime.start();
  jarvis.objects.Dimensions.List();
  jarvis.objects.Metrics.List();
  var executionTime = (new Date).getMilliseconds() - start
};
jarvis.visualisation.realtime.Timeline.prototype.init = function(options, container) {
  var _this = this;
  var start = (new Date).getMilliseconds();
  this._this = this;
  this.options = options;
  this.containers = this.containers || [];
  var matchedContainers = null;
  if(container) {
    matchedContainers = $(container)
  }else {
    matchedContainers = $(".jarvis.realtime.timeline")
  }
  if(matchedContainers.length == 0) {
    return
  }
  $(matchedContainers).each(function(index, item) {
    if(!$(this).parent().hasClass("prettyprint")) {
      jarvis.debug.log("INFO", "jarvis.visualisation.realtime.Timeline", 6, "Applying to container ('" + this.id + "')");
      var metric = $(this).attr("data-metrics");
      if(metric == null) {
        throw"You must specify a metric for the timeline";
      }
      var seriescolor = $(this).attr("data-seriescolor");
      if(seriescolor) {
        _this.seriescolor = seriescolor
      }
      var showseconds = $(this).attr("data-showseconds");
      if(showseconds) {
        _this.showseconds = eval(showseconds)
      }
      $(this).html(_this.baseHTML());
      _this.minutesChart.redraw();
      _this.secondsChart.redraw();
      _this.chartInitMinutes = true;
      _this.chartInitSeconds = true;
      $(this).bind("data", function(evt, ret) {
        ret.data = $(this).data().data
      });
      $(this).bind("click", function(evt) {
        $(this).trigger("clicked", $(this).data().data)
      });
      var key = "" + "_" + metric + "_" + jarvis.visualisation.realtime.globalfilter + "_" + "Timeline" + "_" + 1 + "_" + 1 + "___0";
      key = key.replace(/ /g, "").replace(/,/g, "").replace(/\./g, "");
      _this.key = key;
      if(jarvis.visualisation.realtime.connected) {
        jarvis.debug.log("INFO", "Subscribing to comet channel (already connected) - " + key, 6, "");
        var client_id = PokeIn.GetClientId();
        var queryOptions = {ClientID:client_id, Dimensions:"", Metrics:metric, Filter:jarvis.visualisation.realtime.globalfilter, Resolution:"Timeline", Interval:1, Period:1, omitDate:false, callback:"jarvisResponse_Realtime_Response"};
        jarvis.dataaccess.fetch(this, "/engine/Realtime.svc/subscribe", queryOptions, function() {
        })
      }else {
        jarvis.debug.log("INFO", "Subscribing to comet channel (bind) - " + key, 6, "");
        $(jarvis.realtime).bind("cometstart", function(e) {
          var client_id = PokeIn.GetClientId();
          var queryOptions = {ClientID:client_id, Dimensions:"", Metrics:metric, Filter:jarvis.visualisation.realtime.globalfilter, Resolution:"Timeline", Interval:1, Period:1, omitDate:false, callback:"jarvisResponse_Realtime_Response"};
          jarvis.dataaccess.fetch(this, "/engine/Realtime.svc/subscribe", queryOptions, function() {
          })
        })
      }
      jarvis.visualisation.realtime.subscribers.push({key:key, sender:_this});
      window.jarvisResponse_Realtime_Response = _this.jarvisResponse_Realtime_Timeline
    }
  });
  if(jarvis.visualisation.realtime.paused) {
    _this.jarvisResponse_Realtime_Timeline(null, _this, new Date(jarvis.visualisation.realtime.serverTimestamp))
  }
  $(this).bind("click", function(event, data) {
    if(data.selected) {
      jarvis.visualisation.realtime.event_backintime(data.timestamp);
      jarvis.visualisation.realtime.paused = true;
      jarvis.visualisation.realtime.pausedTime = data.timestamp;
      jarvis.visualisation.realtime.stop();
      $(jarvis.visualisation.realtime.statusboxes).each(function(index, item) {
        $(item).bind("dismissed", function(event, data) {
          _this.initialized = false;
          _this.gettingBackData = false;
          _this.initialCallbacks = [];
          _this.initialTimestamp = null;
          jarvis.visualisation.realtime.paused = false;
          jarvis.visualisation.realtime.pausedTime = null;
          jarvis.visualisation.realtime.restart()
        })
      });
      _this.processFetch(_this, data)
    }else {
      jarvis.visualisation.realtime.event_backtotime();
      _this.initialized = false;
      _this.gettingBackData = false;
      _this.initialCallbacks = [];
      _this.initialTimestamp = null;
      jarvis.visualisation.realtime.paused = false;
      jarvis.visualisation.realtime.pausedTime = null;
      jarvis.visualisation.realtime.restart()
    }
  });
  var executionTime = (new Date).getMilliseconds() - start;
  jarvis.debug.log("INFO", "jarvis.visualisation.realtime.Timeline", 5, "...init (" + executionTime + "ms)")
};
jarvis.visualisation.realtime.Timeline.prototype.processFetch = function(sender, data) {
  var toDate = new Date(data.timestamp);
  toDate.setSeconds(59);
  toDate.setMilliseconds(999);
  var fromDate = new Date(toDate);
  fromDate.setSeconds(fromDate.getSeconds() - 59);
  var queryOptions = {FromDate:jarvis.date.formatDate(fromDate, "yyyy-mm-dd hh:nn:ss.000"), ToDate:jarvis.date.formatDate(toDate, "yyyy-mm-dd hh:nn:ss.999"), Dimensions:"", Metrics:"Bet Count", Resolution:"Timeline", omitDate:false, Filter:jarvis.visualisation.realtime.globalfilter, onlyUseCached:false};
  jarvis.dataaccess.fetch(sender, "/engine/Query.svc/fetch", queryOptions, sender.initialDrawCallback_Seconds)
};
jarvis.visualisation.realtime.Timeline.prototype.jarvisResponse_Realtime_Timeline = function(message, sender, timestamp) {
  var _this = null;
  if(message) {
    $(jarvis.visualisation.realtime.subscribers).each(function(index, item) {
      if(item.key == message[0].key) {
        _this = item.sender
      }
    });
    var pointToRemove = new Object;
    var series = _this.secondsChart.series[0]
  }else {
    _this = sender
  }
  var initialDrawRealtime = function() {
    $(message).each(function(index, row) {
      var x = new Date(row.timestamp);
      var y = parseFloat(row.value);
      var point = {y:y, name:x};
      pointToRemove.x = point.x;
      pointToRemove.y = point.y;
      pointToRemove.date = new Date(point.name);
      series.addPoint(point, true, true, true)
    });
    if(pointToRemove.date) {
      series = _this.minutesChart.series[0];
      var d = pointToRemove.date;
      if(d.getSeconds() == 0) {
        var point = {y:pointToRemove.y, name:d};
        series.addPoint(point, true, true, true)
      }else {
        if(series.data[series.data.length - 1].name = "test") {
          d.setSeconds(0)
        }
        series.data[series.data.length - 1].name = d;
        series.data[series.data.length - 1].update(series.data[series.data.length - 1].y + pointToRemove.y, true, false)
      }
    }
  };
  if(!_this.initialized || jarvis.visualisation.realtime.paused) {
    _this.initialCallbacks.push(initialDrawRealtime);
    if(!_this.gettingBackData) {
      _this.gettingBackData = true;
      if(message) {
        _this.initialTimestamp = new Date(message[0].timestamp)
      }else {
        _this.initialTimestamp = timestamp
      }
      var toDate = new Date(_this.initialTimestamp);
      toDate.setSeconds(toDate.getSeconds() - 1);
      toDate.setMilliseconds(999);
      toDate.setMinutes(toDate.getMinutes() - 1);
      toDate.setSeconds(toDate.getSeconds() - 1);
      var fromDate = new Date(toDate);
      fromDate.setMinutes(fromDate.getMinutes() - 30);
      var queryOptions = {FromDate:jarvis.date.formatDate(fromDate, "yyyy-mm-dd hh:nn:00.000"), ToDate:jarvis.date.formatDate(toDate, "yyyy-mm-dd hh:nn:ss.999"), Dimensions:"", Metrics:"Bet Count", Resolution:"Minute", omitDate:false, Filter:jarvis.visualisation.realtime.globalfilter, onlyUseCached:true};
      jarvis.dataaccess.fetch(_this, "/engine/Query.svc/fetch", queryOptions, _this.initialDrawCallback_Minutes);
      var minutesData = function() {
        var data = [], i;
        for(i = -29;i <= 0;i++) {
          data.push({y:0, name:"test"})
        }
        return data
      }();
      _this.minutesChart.series[0].setData(minutesData, true);
      var secondsData = function() {
        var data = [], i;
        for(i = -59;i <= 0;i++) {
          data.push({y:0})
        }
        return data
      }();
      _this.secondsChart.series[0].setData(secondsData, true)
    }
  }else {
    initialDrawRealtime()
  }
};
jarvis.visualisation.realtime.Timeline.prototype.initialDrawCallback_Minutes = function(sender, data, error) {
  if(data.resultcode != 500) {
    data = $.parseJSON(data.data);
    var result = data.Result;
    $(result.Rows).each(function(index, row) {
      var series = sender.minutesChart.series[0];
      var x = new Date(row.Values[0]);
      var y = parseFloat(row.Values[1]);
      var point = {y:y, name:x};
      series.addPoint(point, true, true, true)
    });
    sender.minutesChart.redraw()
  }
  var toDate = new Date(sender.initialTimestamp);
  toDate.setSeconds(toDate.getSeconds() - 1);
  toDate.setMilliseconds(999);
  var fromDate = new Date(toDate);
  fromDate.setSeconds(fromDate.getSeconds() - 59);
  var queryOptions = {FromDate:jarvis.date.formatDate(fromDate, "yyyy-mm-dd hh:nn:ss.000"), ToDate:jarvis.date.formatDate(toDate, "yyyy-mm-dd hh:nn:ss.999"), Dimensions:"", Metrics:"Bet Count", Resolution:"Timeline", omitDate:false, Filter:jarvis.visualisation.realtime.globalfilter, onlyUseCached:true};
  jarvis.dataaccess.fetch(sender, "/engine/Query.svc/fetch", queryOptions, sender.initialDrawCallback_Seconds)
};
jarvis.visualisation.realtime.Timeline.prototype.initialDrawCallback_Seconds = function(sender, data, error) {
  data = $.parseJSON(data.data);
  var result = data.Result;
  $(result.Rows).each(function(index, row) {
    var pointToRemove = new Object;
    var series = sender.secondsChart.series[0];
    var x = new Date(row.Values[0]);
    var y = parseFloat(row.Values[1]);
    var point = {y:y, name:x};
    pointToRemove.x = point.x;
    pointToRemove.y = point.y;
    pointToRemove.date = new Date(point.name);
    series.addPoint(point, false, true, true);
    if(!jarvis.visualisation.realtime.paused && pointToRemove.date) {
      series = sender.minutesChart.series[0];
      var d = pointToRemove.date;
      if(d.getSeconds() == 59) {
        var _d = new Date(d);
        var point = {y:pointToRemove.y, name:d};
        _d.setSeconds(0);
        series.data[series.data.length - 1].name = _d;
        series.addPoint(point, true, true, true)
      }else {
        if(series.data[series.data.length - 1].name = "test") {
          d.setSeconds(0)
        }
        series.data[series.data.length - 1].name = d;
        series.data[series.data.length - 1].update(series.data[series.data.length - 1].y + pointToRemove.y, true, false)
      }
    }
  });
  sender.secondsChart.redraw();
  if(!jarvis.visualisation.realtime.paused) {
    sender.minutesChart.redraw()
  }
  sender.initialized = true;
  if(!jarvis.visualisation.realtime.paused) {
    $(sender.initialCallbacks).each(function(index, item) {
      item()
    });
    sender.initialCallbacks = []
  }
};
jarvis.visualisation.realtime.Timeline.prototype.baseHTML = function() {
  var _this = this;
  var $html = $('<div class="wrapper"></div>');
  $html.append('<div class="row-fluid"><div class="span12"><div class="row-fluid chartcontainer"></div></div></div>');
  if(_this.showseconds) {
    $html.find(".chartcontainer").append($('<div class="span7 minutesChart">&nbsp;</div>'));
    $html.find(".chartcontainer").append('<div class="span5 secondsChart">&nbsp;</div>')
  }else {
    $html.find(".chartcontainer").append($('<div class="span12 minutesChart">&nbsp;</div>'));
    $html.find(".chartcontainer").append('<div class="span0 secondsChart" style="display:none;">&nbsp;</div>')
  }
  var $minutesChart = $html.find(".minutesChart");
  var $secondsChart = $html.find(".secondsChart");
  _this.minutesChart = new Highcharts.Chart({chart:{backgroundColor:$($minutesChart).css("backgroundColor"), height:235, marginTop:40, marginLeft:0, marginRight:0, marginBottom:0, spacingLeft:0, spacingTop:15, spacingRight:0, spacingBottom:0, renderTo:$($minutesChart).get(0), animation:{duration:300, transition:"easeOutBounce"}, type:"column", events:{load:function() {
  }, redraw:function() {
    if(!_this.resizingMinutes && !_this.chartInitMinutes) {
      _this.resizingMinutes = true;
      var targetWidth = $(".minutesChart").width();
      this.setSize(targetWidth, 235)
    }else {
      _this.resizingMinutes = false
    }
  }}}, title:{text:"Per minute", align:"left", style:{color:"#666", fontSize:"13px"}, y:0, x:3}, xAxis:{labels:{enabled:false, style:{fontSize:"10px;", color:"#2d96ca"}}, tickLength:0}, yAxis:{showFirstLabel:false, showLastLabel:true, endOnTick:true, title:{text:null}, labels:{style:{fontFamily:"Arial", fontSize:"10px", color:"#979797", textShadow:"-1px -1px 0 #ffffff, 1px -1px 0 #ffffff, -1px 1px 0 #ffffff, 1px 1px 0 #ffffff"}, align:"left", x:5, y:15}, plotLines:[{value:0, width:1, color:"#808080"}]}, 
  tooltip:{useHTML:true, formatter:function() {
    var point = this;
    var _date = new Date(point.point.name);
    _date.setHours(_date.getHours() + 3);
    var ago = jQuery.timeago(_date);
    _date = jarvis.date.formatDate(_date, "hh:nn");
    var s = "<div><b>" + ago + "</b></div><div>" + _date + '</div><div style="margin-top:5px;">Events: ' + point.y + "</div>";
    return s
  }}, legend:{enabled:false}, credits:{enabled:false}, exporting:{enabled:false}, series:[{name:"Minute-by-minute data", data:function() {
    var data = [], i;
    for(i = -29;i <= 0;i++) {
      data.push({y:0, name:"test"})
    }
    return data
  }(), cursor:"pointer", point:{events:{click:function(event) {
    $(_this).trigger("click", {timestamp:this.name, value:this.y, selected:!this.selected ? true : false})
  }}}}], plotOptions:{column:{allowPointSelect:true}, series:{color:_this.seriescolor, pointPadding:0.1, groupPadding:0, borderWidth:0, shadow:false}}});
  $($minutesChart).append('<div class="row"><div class="span2 charttick "></div><div class="span2 charttick ">-25 min</div><div class="span2 charttick ">-20 min</div><div class="span2 charttick ">-15 min</div><div class="span2 charttick ">-10 min</div><div class="span2 charttick ">-5 min</div></div>');
  _this.secondsChart = new Highcharts.Chart({chart:{backgroundColor:$($secondsChart).css("backgroundColor"), height:235, marginTop:40, marginBottom:0, spacingTop:15, spacingLeft:0, spacingRight:0, spacingBottom:0, selectionMarkerFill:"#932D22", renderTo:$($secondsChart).get(0), animation:{duration:300, transition:"easeOutBounce"}, type:"column", events:{load:function() {
  }, redraw:function() {
    if(!_this.resizingSeconds && !_this.chartInitSeconds) {
      _this.resizingSeconds = true;
      var targetWidth = $(".secondsChart").width();
      this.setSize(targetWidth, 235)
    }else {
      _this.resizingSeconds = false
    }
  }}}, title:{text:"Per second", align:"left", style:{color:"#666", fontSize:"13px"}, y:0, x:3}, xAxis:{labels:{enabled:false, style:{fontSize:"10px;", color:"#2d96ca"}}, tickLength:0}, yAxis:{showFirstLabel:false, showLastLabel:true, endOnTick:true, title:{text:null}, labels:{style:{fontFamily:"Arial", fontSize:"10px", color:"#979797", textShadow:"-1px -1px 0 #ffffff, 1px -1px 0 #ffffff, -1px 1px 0 #ffffff, 1px 1px 0 #ffffff"}, align:"left", x:5, y:15}, plotLines:[{value:0, width:1, color:"#808080"}]}, 
  tooltip:{useHTML:true, formatter:function() {
    var point = this;
    var _date = new Date(point.point.name);
    _date.setHours(_date.getHours() + 3);
    var ago = Math.floor((new Date - _date) / 1E3) + " seconds ago";
    _date = jarvis.date.formatDate(_date, "hh:nn:ss");
    var s = "<div><b>" + ago + "</b></div><div>" + _date + '</div><div style="margin-top:5px;">Events: ' + point.y + "</div>";
    return s
  }}, legend:{enabled:false}, credits:{enabled:false}, exporting:{enabled:false}, series:[{name:"Second-by-second Base data", data:function() {
    var data = [], i;
    for(i = -59;i <= 0;i++) {
      data.push({y:0})
    }
    return data
  }()}], plotOptions:{series:{color:_this.seriescolor, pointPadding:0.2, groupPadding:0, borderWidth:0, shadow:false}}});
  $($secondsChart).append('<div class="row"><div class="span3 charttick ">-60 sec</div><div class="span3 charttick ">-45 sec</div><div class="span3 charttick ">-30 sec</div><div class="span3 charttick ">-15 sec</div></div>');
  return $html
};
jarvis.debug.log("INFO", "jarvis.visualisation.realtime.Timeline", 6, "JS source loaded");
jarvis.provide("jarvis.visualisation.realtime.MetricBox");
jarvis.require("jarvis.debug");
jarvis.require("jarvis.date");
jarvis.require("jarvis.string");
jarvis.require("jarvis.visualisation.realtime");
jarvis.visualisation.realtime.MetricBox = function(options) {
  var start = (new Date).getMilliseconds();
  this._this = this;
  this.options = options;
  this.default_caption = "Right now";
  this.default_subcaption = "Events per Second";
  this.default_useAverage = true;
  this.key = "";
  this.initialized = false;
  this.gettingBackData = false;
  this.initialCallbacks = [];
  this.initialTimestamp = null;
  this.containers = [];
  jarvis.objects.Dimensions.List();
  jarvis.objects.Metrics.List();
  var executionTime = (new Date).getMilliseconds() - start
};
jarvis.visualisation.realtime.MetricBox.prototype.init = function(options, container) {
  var _this = this;
  var start = (new Date).getMilliseconds();
  this._this = this;
  this.options = options;
  this.containers = this.containers || [];
  jarvis.visualisation.realtime.start();
  $(jarvis.realtime).bind("filterchange", function(e) {
  });
  var matchedContainers = null;
  if(container) {
    matchedContainers = $(container)
  }else {
    matchedContainers = $(".jarvis.realtime.metricbox")
  }
  if(matchedContainers.length == 0) {
    return
  }
  $(matchedContainers).each(function(index, item) {
    if(!$(this).parent().hasClass("prettyprint")) {
      jarvis.debug.log("INFO", "jarvis.visualisation.realtime.MetricBox", 6, "Applying to container ('" + this.id + "')");
      var metric = $(this).attr("data-metrics");
      if(metric == null) {
        throw"You must specify a metric for the metricbox";
      }
      $(this).html(_this.baseHTML(item));
      $(this).bind("data", function(evt, ret) {
        ret.data = $(this).data().data
      });
      $(this).bind("click", function(evt) {
        $(this).trigger("clicked", $(this).data().data)
      });
      var key = "" + "_" + metric + "_" + jarvis.visualisation.realtime.globalfilter + "_" + "Timeline" + "_" + 3 + "_" + 60 + "___0";
      key = key.replace(/ /g, "").replace(/,/g, "").replace(/\./g, "");
      _this.key = key;
      if(jarvis.visualisation.realtime.connected) {
        jarvis.debug.log("INFO", "Subscribing to comet channel (already connected) - " + key, 6, "");
        var client_id = PokeIn.GetClientId();
        var queryOptions = {ClientID:client_id, Dimensions:"", Metrics:metric, Filter:jarvis.visualisation.realtime.globalfilter, Resolution:"Timeline", Interval:3, Period:60, omitDate:true, onlyUseCached:true, callback:"jarvisResponse_Realtime_Response_MetricBox"};
        jarvis.dataaccess.fetch(this, "/engine/Realtime.svc/subscribe", queryOptions, function() {
        })
      }else {
        jarvis.debug.log("INFO", "Subscribing to comet channel (bind) - " + key, 6, "");
        $(jarvis.realtime).bind("cometstart", function(e) {
          var client_id = PokeIn.GetClientId();
          var queryOptions = {ClientID:client_id, Dimensions:"", Metrics:metric, Filter:jarvis.visualisation.realtime.globalfilter, Resolution:"Timeline", Interval:3, Period:60, omitDate:true, onlyUseCached:true, callback:"jarvisResponse_Realtime_Response_MetricBox"};
          jarvis.dataaccess.fetch(this, "/engine/Realtime.svc/subscribe", queryOptions, function() {
          })
        })
      }
      jarvis.visualisation.realtime.subscribers.push({key:key, sender:_this, container:item});
      $(_this).bind("newdata", function(e, data) {
      });
      window.jarvisResponse_Realtime_Response_MetricBox = _this.jarvisResponse_Realtime_MetricBox;
      $(jarvis.visualisation.realtime).bind("backintime", function(event, data) {
        var toDate = new Date(data);
        toDate.setSeconds(59);
        toDate.setMilliseconds(999);
        var fromDate = new Date(toDate);
        fromDate.setSeconds(fromDate.getSeconds() - 59);
        var queryOptions = {FromDate:jarvis.date.formatDate(fromDate, "yyyy-mm-dd hh:nn:ss.000"), ToDate:jarvis.date.formatDate(toDate, "yyyy-mm-dd hh:nn:ss.999"), Dimensions:"", Metrics:metric, Filter:jarvis.visualisation.realtime.globalfilter, Resolution:"Timeline", Interval:3, Period:30, omitDate:true, onlyUseCached:false};
        var processFetch = function(sender, data, error) {
          if(data.resultcode == "500") {
            return
          }
          data = $.parseJSON(data.data).Result;
          var value = parseFloat(data.Rows[0].Values[0]);
          var useAverage = _this.default_useAverage;
          if($(item).attr("data-useaverage")) {
            useAverage = eval($(item).attr("data-useaverage"))
          }
          if(useAverage) {
            value = jarvis.string.formatNumber(value / 30, 0, false)
          }else {
            value = jarvis.string.formatNumber(value, 0, true)
          }
          var $rightnow = $(item).find(".value");
          $rightnow.animate({myBlurEffect_In:100}, {duration:100});
          $rightnow.text(value);
          $rightnow.animate({myBlurEffect_Out:100}, {duration:200})
        };
        jarvis.dataaccess.fetch(_this, "/engine/Query.svc/fetch", queryOptions, processFetch)
      });
      $(jarvis.realtime).bind("backtotime", function(data) {
      });
      _this.containers.push(item)
    }
  });
  var executionTime = (new Date).getMilliseconds() - start;
  jarvis.debug.log("INFO", "jarvis.visualisation.realtime.MetricBox", 5, "...init (" + executionTime + "ms)")
};
$.fx.step.myBlurEffect_In = function(fx) {
  $(fx.elem).css({textShadow:"0 0 " + Math.floor(fx.now) + "px rgb(111,255,111)"})
};
$.fx.step.myBlurEffect_Out = function(fx) {
  $(fx.elem).css({textShadow:"0 0 " + Math.floor(fx.now) + "px rgb(255,255,255)"})
};
jarvis.visualisation.realtime.MetricBox.prototype.jarvisResponse_Realtime_MetricBox = function(message) {
  var _this = null;
  $(jarvis.visualisation.realtime.subscribers).each(function(index, item) {
    if(item.key == message[0].key) {
      _this = item.sender;
      var value = parseFloat(message[0].value);
      var useAverage = _this.default_useAverage;
      if($(item.container).attr("data-useaverage")) {
        useAverage = eval($(item.container).attr("data-useaverage"))
      }
      if(useAverage) {
        value = jarvis.string.formatNumber(value / 30, 0, false)
      }else {
        value = jarvis.string.formatNumber(value, 0, true)
      }
      var $rightnow = $(item.container).find(".value");
      $rightnow.animate({myBlurEffect_In:100}, {duration:100});
      $rightnow.text(value);
      $rightnow.animate({myBlurEffect_Out:100}, {duration:200});
      $(_this).trigger("newdata", value)
    }
  })
};
jarvis.visualisation.realtime.MetricBox.prototype.baseHTML = function(container) {
  var caption = this.default_caption;
  var subcaption = this.default_subcaption;
  if($(container).attr("data-caption")) {
    caption = $(container).attr("data-caption")
  }
  if($(container).attr("data-subcaption")) {
    subcaption = $(container).attr("data-subcaption")
  }
  var $html = $('<div class="wrapper"></div>');
  $html.append('<div class="row-fluid"><div class="span12 caption">' + caption + "</div></div>" + '<div class="row-fluid"><div class="span12 value">0</div></div>' + '<div class="row-fluid"><div class="span12 subcaption">' + subcaption + "</div></div>" + "");
  return $html
};
jarvis.debug.log("INFO", "jarvis.visualisation.realtime.MetricBox", 6, "JS source loaded");
jarvis.provide("jarvis.visualisation.realtime.Table");
jarvis.require("jarvis.debug");
jarvis.require("jarvis.date");
jarvis.require("jarvis.string");
jarvis.require("jarvis.visualisation.realtime");
jarvis.visualisation.realtime.Table = function(options) {
  var start = (new Date).getMilliseconds();
  this._this = this;
  this.options = options;
  this.default_caption = "Right now";
  this.default_subcaption = "Events per Second";
  this.default_useAverage = true;
  this.key = "";
  this.animate = true;
  this.initialized = false;
  this.gettingBackData = false;
  this.initialCallbacks = [];
  this.initialTimestamp = null;
  this.containers = [];
  jarvis.visualisation.realtime.start();
  jarvis.objects.Dimensions.List();
  jarvis.objects.Metrics.List();
  var executionTime = (new Date).getMilliseconds() - start
};
jarvis.visualisation.realtime.Table.prototype.init = function(options, container) {
  var _this = this;
  var start = (new Date).getMilliseconds();
  this._this = this;
  this.options = options;
  this.containers = this.containers || [];
  var matchedContainers = null;
  if(container) {
    matchedContainers = $(container)
  }else {
    matchedContainers = $(".jarvis.realtime.table")
  }
  if(matchedContainers.length == 0) {
    return
  }
  $(matchedContainers).each(function(index, item) {
    if(!$(this).parent().hasClass("prettyprint")) {
      jarvis.debug.log("INFO", "jarvis.visualisation.realtime.Table", 6, "Applying to container ('" + this.id + "')");
      var limit = 5;
      try {
        limit = parseInt($(this).attr("data-limit"));
        if(isNaN(limit)) {
          limit = 5
        }
      }catch(ex) {
        limit = 5
      }
      var period = 60;
      try {
        period = parseInt($(this).attr("data-period"));
        if(isNaN(period)) {
          period = 60
        }
      }catch(ex) {
        period = 60
      }
      var animate = $(this).attr("data-animate");
      if(animate) {
        _this.animate = eval(animate)
      }
      var dimensions = $(this).attr("data-dimensions");
      if(dimensions == null) {
        throw"You must specify a dimensions for the table";
      }
      var metric = $(this).attr("data-metrics");
      if(metric == null) {
        throw"You must specify a metric for the table";
      }
      $(this).html(_this.baseHTML(item));
      $(this).find(".settings").off("click");
      $(this).find(".settings").on("click", function(e) {
        jarvis.visualisation.realtime.panel.showEditWidget({_this:jarvis.visualisation.realtime.panel, container:jarvis.visualisation.realtime.panel.container, addNew:false, widgetID:$(item).attr("data-widgetid"), sender:_this, sendercontainer:item})
      });
      $(this).bind("data", function(evt, ret) {
        ret.data = $(this).data().data
      });
      $(this).bind("click", function(evt) {
        $(this).trigger("clicked", $(this).data().data)
      });
      var key = dimensions + "_" + metric + "_" + jarvis.visualisation.realtime.globalfilter + "_" + "Timeline" + "_" + 3 + "_" + period + "_" + "DESC" + "_" + metric + "_" + limit;
      key = key.replace(/ /g, "").replace(/,/g, "").replace(/\./g, "");
      _this.key = key;
      if(jarvis.visualisation.realtime.connected) {
        jarvis.debug.log("INFO", "Subscribing to comet channel (already connected) - " + key, 6, "");
        var client_id = PokeIn.GetClientId();
        var queryOptions = {ClientID:client_id, Dimensions:dimensions, Metrics:metric, Filter:jarvis.visualisation.realtime.globalfilter, Resolution:"Timeline", Interval:3, Period:period, omitDate:true, callback:"jarvisResponse_Realtime_Response_Table", Limit:limit, SortDir:"DESC", SortKey:metric};
        jarvis.dataaccess.fetch(this, "/engine/Realtime.svc/subscribe", queryOptions, function() {
        })
      }else {
        jarvis.debug.log("INFO", "Subscribing to comet channel (bind) - " + key, 6, "");
        $(jarvis.visualisation.realtime).bind("cometstart", function(e) {
          var client_id = PokeIn.GetClientId();
          var queryOptions = {ClientID:client_id, Dimensions:dimensions, Metrics:metric, Filter:jarvis.visualisation.realtime.globalfilter, Resolution:"Timeline", Interval:3, Period:period, omitDate:true, callback:"jarvisResponse_Realtime_Response_Table", Limit:limit, SortDir:"DESC", SortKey:metric};
          jarvis.dataaccess.fetch(this, "/engine/Realtime.svc/subscribe", queryOptions, function() {
          })
        })
      }
      jarvis.visualisation.realtime.subscribers.push({key:key, sender:_this, container:$(item)});
      $(_this).bind("newdata", function(e, data) {
      });
      window.jarvisResponse_Realtime_Response_Table = _this.jarvisResponse_Realtime_Table;
      $(jarvis.realtime).bind("backintime", function(event, data) {
        _this.processFetch(_this, data, item, dimensions, metric, limit)
      });
      $(jarvis.realtime).bind("backtotime", function(data) {
      });
      _this.containers.push(item)
    }
  });
  var executionTime = (new Date).getMilliseconds() - start;
  jarvis.debug.log("INFO", "jarvis.visualisation.realtime.Table", 5, "...init (" + executionTime + "ms)")
};
jarvis.visualisation.realtime.Table.prototype.processFetch = function(sender, data, item, dimensions, metric, limit) {
  var _this = sender;
  var toDate = new Date(data);
  toDate.setSeconds(59);
  toDate.setMilliseconds(999);
  var fromDate = new Date(toDate);
  fromDate.setSeconds(fromDate.getSeconds() - 59);
  var processFetchProxy = function(sender, data, error) {
    if(data.resultcode == "500") {
      return
    }
    data = $.parseJSON(data.data).Result;
    var $table = $(item).find(".table");
    if(data.Rows.length > 0) {
      $table.find("tr.empty").remove()
    }else {
      if(data.Rows.length == 0 && $table.find("tr.empty").length > 0) {
        $table.append('<tr class="empty"><td colspan="4">There is no data for this view.</td></tr>');
        return
      }
    }
    try {
      if($table.find("tr").length - 1 > data.Rows.length) {
        for(var i = $table.find("tr").length;i > data.Rows.length;i--) {
          $table.find("tr")[i].remove()
        }
      }
    }catch(ex) {
    }
    $(data.Rows).each(function(i, m) {
      if($table.find("tr").length - 1 > i) {
        var $tr = $($table.find("tr")[i + 1]);
        var currentkey = $tr.find(".dimension").text();
        if(currentkey == m.FormattedValues[0]) {
          var currentvalue = $tr.find(".metric").text();
          if(currentvalue != m.FormattedValues[1]) {
            if(i % 2 == 0) {
              try {
                if(_this.animate) {
                  $tr.children().animate({backgroundColor:"#E6E8DC"}, {duration:1E3}).animate({backgroundColor:"white"}, "slow")
                }
              }catch(e) {
              }
            }else {
              try {
                if(_this.animate) {
                  $tr.children().animate({backgroundColor:"#E6E8DC"}, {duration:1E3}).animate({backgroundColor:"#f5f5f5"}, "slow")
                }
              }catch(e) {
              }
            }
            $tr.find(".metric").text(m.FormattedValues[1])
          }
        }else {
          if(i % 2 == 0) {
            try {
              if(_this.animate) {
                $tr.children().animate({backgroundColor:"#E6E8DC"}, {duration:1E3}).animate({backgroundColor:"white"}, "slow")
              }
            }catch(e) {
            }
          }else {
            try {
              if(_this.animate) {
                $tr.children().animate({backgroundColor:"#E6E8DC"}, {duration:1E3}).animate({backgroundColor:"#f5f5f5"}, "slow")
              }
            }catch(e) {
            }
          }
          $tr.find(".dimension").text(m.FormattedValues[0]);
          $tr.find(".metric").text(m.FormattedValues[1])
        }
      }else {
        $table.append("<tr>" + '<td class="index">' + (i + 1) + "." + "</td>" + '<td class="dimension">' + m.FormattedValues[0] + "</td>" + '<td colspan="2" class="metric">' + m.FormattedValues[1] + "</td>" + "</tr>")
      }
    });
    $table.find("tr").each(function(index, name) {
      $(this).find(".index").text(index + ".")
    })
  };
  var queryOptions = {FromDate:jarvis.date.formatDate(fromDate, "yyyy-mm-dd hh:nn:ss.000"), ToDate:jarvis.date.formatDate(toDate, "yyyy-mm-dd hh:nn:ss.999"), Dimensions:dimensions, Metrics:"Bet Count", Resolution:"Timeline", omitDate:true, Filter:jarvis.visualisation.realtime.globalfilter, onlyUseCached:false, Limit:limit, SortDir:"DESC", SortKey:metric};
  jarvis.dataaccess.fetch(_this, "/engine/Query.svc/fetch", queryOptions, processFetchProxy)
};
jarvis.visualisation.realtime.Table.prototype.jarvisResponse_Realtime_Table = function(message) {
  var _this = null;
  try {
    $(jarvis.visualisation.realtime.subscribers).each(function(index, item) {
      if(item.key == message[0].key) {
        _this = item.sender;
        var $table = $($(item.container).find(".table"));
        if(message.length > 0) {
          $table.find("tr.empty").remove()
        }else {
          if(message.length == 0 && $table.find("tr.empty").length > 0) {
            $table.append('<tr class="empty"><td colspan="4">There is no data for this view.</td></tr>');
            return
          }
        }
        try {
          if($table.find("tr").length > message.length) {
            for(var i = $table.find("tr").length;i < message.length;i--) {
              $table.find("tr")[i].remove()
            }
          }
        }catch(ex) {
        }
        $(message).each(function(i, m) {
          if($table.find("tr").length - 1 > i) {
            var $tr = $($table.find("tr")[i + 1]);
            var currentkey = $tr.find(".dimension").text();
            if(currentkey == m.dimension) {
              var currentvalue = $tr.find(".metric").text();
              if(currentvalue != m.formattedValue) {
                try {
                  if(_this.animate) {
                    if(i % 2 == 0) {
                      $tr.children().animate({backgroundColor:"#E6E8DC"}, {duration:1E3}).animate({backgroundColor:"white"}, "slow")
                    }else {
                      $tr.children().animate({backgroundColor:"#E6E8DC"}, {duration:1E3}).animate({backgroundColor:"#f5f5f5"}, "slow")
                    }
                  }
                }catch(e) {
                }
                $tr.find(".metric").text(m.formattedValue)
              }
            }else {
              try {
                if(_this.animate) {
                  if(i % 2 == 0) {
                    $tr.children().animate({backgroundColor:"#E6E8DC"}, {duration:1E3}).animate({backgroundColor:"white"}, "slow")
                  }else {
                    $tr.children().animate({backgroundColor:"#E6E8DC"}, {duration:1E3}).animate({backgroundColor:"#f5f5f5"}, "slow")
                  }
                }
              }catch(e) {
              }
              $tr.find(".dimension").text(m.dimension);
              $tr.find(".metric").text(m.formattedValue)
            }
          }else {
            $table.append("<tr>" + '<td class="index">' + (i + 1) + "." + "</td>" + '<td class="dimension">' + m.dimension + "</td>" + '<td colspan="2" class="metric">' + m.formattedValue + "</td>" + "</tr>")
          }
        });
        $table.find(".dimension").each(function(index, item) {
          $(this).off("click");
          $(this).on("click", function(e) {
            var $parent = $($(this).closest(".jarvis.realtime.table"));
            var key = $parent.attr("data-dimensions");
            var value = $(this).text();
            var filter = key + "=" + value + "[AND]";
            if(jarvis.visualisation.realtime.globalfilter.indexOf(filter) == -1 && jarvis.visualisation.realtime.drillDownFilter.indexOf(filter) == -1) {
              jarvis.visualisation.realtime.drillDownFilter += filter;
              jarvis.visualisation.realtime.processFilter()
            }
          })
        });
        $table.find("tr").each(function(index, name) {
          $(this).find(".index").text(index + ".")
        })
      }
    })
  }catch(ex) {
    console.log(ex.message);
    console.log(ex.stack);
    throw ex;
  }
};
$.fx.step.myBackgroundEffect_In = function(fx) {
  $(fx.elem).css({backgroundColor:"rgb(215,222,186)"})
};
$.fx.step.myBackgroundEffect_Out = function(fx) {
  $(fx.elem).css({backgroundColor:"inherit"})
};
jarvis.visualisation.realtime.Table.prototype.baseHTML = function(container) {
  var title = "TITLE";
  var dimensions = "DIMENSION";
  var metrics = this.default_subcaption;
  if($(container).attr("data-title")) {
    title = $(container).attr("data-title")
  }
  if($(container).attr("data-dimensions")) {
    dimensions = $(container).attr("data-dimensions")
  }
  if($(container).attr("data-metrics")) {
    metrics = $(container).attr("data-metrics")
  }
  var $html = $('<div class="wrapper"></div>');
  $html.append('<div class="row-fluid">' + '<div class="header">' + '<div class="settings"></div>' + '<div class="move"></div>' + "<h3>" + title + "</h3>" + "</div>" + '<table class="table table-bordered table-striped">' + "<thead>" + "<tr>" + "<th colspan=2>" + dimensions + "</th>" + '<th class="metric" colspan=2>' + metrics + "</th>" + "</tr>" + "</thead>" + "<tbody>" + '<tr class="empty">' + '<td colspan="4">There is no data for this view.</td>' + "</tr>" + "</tbody>" + "</table></div>");
  $();
  return $html
};
jarvis.debug.log("INFO", "jarvis.visualisation.realtime.Table", 6, "JS source loaded");
jarvis.provide("jarvis.visualisation.realtime.Geo");
jarvis.require("jarvis.debug");
jarvis.require("jarvis.date");
jarvis.require("jarvis.string");
jarvis.require("jarvis.visualisation.realtime");
jarvis.visualisation.realtime.Geo = function(options) {
  var start = (new Date).getMilliseconds();
  this._this = this;
  this.options = options;
  this.default_caption = "Right now";
  this.default_subcaption = "Events per Second";
  this.default_useAverage = true;
  this.key = "";
  this.initialized = false;
  this.gettingBackData = false;
  this.initialCallbacks = [];
  this.initialTimestamp = null;
  this.containers = [];
  jarvis.visualisation.realtime.start();
  jarvis.objects.Dimensions.List();
  jarvis.objects.Metrics.List();
  var executionTime = (new Date).getMilliseconds() - start
};
jarvis.visualisation.realtime.Geo.prototype.init = function(options, container) {
  var _this = this;
  var start = (new Date).getMilliseconds();
  this._this = this;
  this.options = options;
  this.mode = "map";
  this.containers = this.containers || [];
  var matchedContainers = null;
  if(container) {
    matchedContainers = $(container)
  }else {
    matchedContainers = $(".jarvis.realtime.geo")
  }
  if(matchedContainers.length == 0) {
    return
  }
  $(matchedContainers).each(function(index, item) {
    if(!$(this).parent().hasClass("prettyprint")) {
      jarvis.debug.log("INFO", "jarvis.visualisation.realtime.Geo", 6, "Applying to container ('" + this.id + "')");
      var limit = 5;
      try {
        limit = parseInt($(this).attr("data-limit"));
        if(isNaN(limit)) {
          limit = 5
        }
      }catch(ex) {
        limit = 5
      }
      var period = 60;
      try {
        period = parseInt($(this).attr("data-period"));
        if(isNaN(period)) {
          period = 60
        }
      }catch(ex) {
        period = 60
      }
      var dimensions = $(this).attr("data-dimensions");
      if(dimensions == null) {
        throw"You must specify a dimensions for the table";
      }
      var metric = $(this).attr("data-metrics");
      if(metric == null) {
        throw"You must specify a metric for the table";
      }
      $(this).html(_this.baseHTML(item));
      var $this = $(this);
      if(_this.mode == "map") {
        google.load("visualization", "1.0", {"packages":["corechart", "geochart"]});
        google.setOnLoadCallback(function(e) {
          var dataArray = [];
          dataArray.push(["Latitude", "Longitude", "Caption", "Event Count"]);
          dataArray.push([0, 0, "Name", 0]);
          var $placeholder = $($this.find(".innercontainer")).get(0);
          _this.geoChart = new google.visualization.GeoChart($placeholder);
          var options = {displayMode:"markers", colorAxis:{colors:["#1a87d5"]}};
          _this.geoData = google.visualization.arrayToDataTable(dataArray);
          _this.geoChart.draw(_this.geoData, options)
        })
      }else {
        var _runonce = true;
        try {
          if(_runonce) {
            google.earth.createInstance($(item).find(".innercontainer").get(0), function(instance) {
              ge = instance;
              ge.getWindow().setVisibility(true);
              ge.getLayerRoot().enableLayerById(ge.LAYER_BORDERS, true);
              ge.getLayerRoot().enableLayerById(ge.LAYER_ROADS, true);
              var features = ge.getFeatures();
              while(features.getFirstChild()) {
                features.removeChild(features.getFirstChild())
              }
              try {
                var lookAt = ge.getView().copyAsLookAt(ge.ALTITUDE_RELATIVE_TO_GROUND);
                lookAt.setRange(lookAt.getRange() / 3);
                lookAt.setLatitude(0);
                lookAt.setLongitude(0);
                ge.getView().setAbstractView(lookAt)
              }catch(ex) {
              }
              google.earth.addEventListener(ge.getGlobe(), "click", function(evt) {
                if(evt.getButton() != 0) {
                  return
                }
              })
            }, function(error) {
              throw error;
            });
            _runonce = false
          }
        }catch(ex) {
          throw ex;
        }
      }
      $(this).find(".settings").off("click");
      $(this).find(".settings").on("click", function(e) {
        jarvis.visualisation.realtime.panel.showEditWidget({_this:jarvis.visualisation.realtime.panel, container:jarvis.visualisation.realtime.panel.container, addNew:false, widgetID:$(item).attr("data-widgetid"), sender:_this, sendercontainer:item})
      });
      $(this).find(".globe").off("click");
      $(this).find(".globe").on("click", function(e) {
        $(item).find(".container").empty();
        if(_this.mode == "map") {
          _this.mode = "globe"
        }else {
          _this.mode = "map"
        }
      });
      $(this).bind("data", function(evt, ret) {
        ret.data = $(this).data().data
      });
      $(this).bind("click", function(evt) {
        $(this).trigger("clicked", $(this).data().data)
      });
      var key = dimensions + "_" + metric + "_" + jarvis.visualisation.realtime.globalfilter + "_" + "Timeline" + "_" + 3 + "_" + period + "_" + "DESC" + "_" + metric + "_" + limit;
      key = key.replace(/ /g, "").replace(/,/g, "").replace(/\./g, "");
      _this.key = key;
      if(jarvis.visualisation.realtime.connected) {
        jarvis.debug.log("INFO", "Subscribing to comet channel (already connected) - " + key, 6, "JS source loaded");
        var client_id = PokeIn.GetClientId();
        var queryOptions = {ClientID:client_id, Dimensions:dimensions, Metrics:metric, Filter:jarvis.visualisation.realtime.globalfilter, Resolution:"Timeline", Interval:3, Period:period, omitDate:true, callback:"jarvisResponse_Realtime_Response_Geo", Limit:limit, SortDir:"DESC", SortKey:metric};
        jarvis.dataaccess.fetch(this, "/engine/Realtime.svc/subscribe", queryOptions, function() {
        })
      }else {
        jarvis.debug.log("INFO", "Subscribing to comet channel (bind) - " + key, 6, "JS source loaded");
        $(jarvis.realtime).bind("cometstart", function(e) {
          var client_id = PokeIn.GetClientId();
          var queryOptions = {ClientID:client_id, Dimensions:dimensions, Metrics:metric, Filter:jarvis.visualisation.realtime.globalfilter, Resolution:"Timeline", Interval:3, Period:period, omitDate:true, callback:"jarvisResponse_Realtime_Response_Geo", Limit:limit, SortDir:"DESC", SortKey:metric};
          jarvis.dataaccess.fetch(this, "/engine/Realtime.svc/subscribe", queryOptions, function() {
          })
        })
      }
      jarvis.visualisation.realtime.subscribers.push({key:key, sender:_this, container:item});
      $(_this).bind("newdata", function(e, data) {
      });
      window.jarvisResponse_Realtime_Response_Geo = _this.jarvisResponse_Realtime_Response_Geo;
      $(jarvis.realtime).bind("backintime", function(event, data) {
        _this.processFetch(_this, data, item, dimensions, metric, limit)
      });
      $(jarvis.realtime).bind("backtotime", function(data) {
      });
      _this.containers.push(item)
    }
  });
  var executionTime = (new Date).getMilliseconds() - start;
  jarvis.debug.log("INFO", "jarvis.visualisation.realtime.Geo", 5, "...init (" + executionTime + "ms)")
};
jarvis.visualisation.realtime.Geo.prototype.processFetch = function(sender, data, item, dimensions, metric, limit) {
  var _this = sender;
  var toDate = new Date(data);
  toDate.setSeconds(59);
  toDate.setMilliseconds(999);
  var fromDate = new Date(toDate);
  fromDate.setSeconds(fromDate.getSeconds() - 59);
  var processFetchProxy = function(sender, data, error) {
    if(data.resultcode == "500") {
      return
    }
    data = $.parseJSON(data.data).Result;
    var $table = $(item).find(".table");
    if(data.Rows.length > 0) {
      $table.find("tr.empty").remove()
    }else {
      if(data.Rows.length == 0 && $table.find("tr.empty").length > 0) {
        $table.append('<tr class="empty"><td colspan="4">There is no data for this view.</td></tr>');
        return
      }
    }
    try {
      if($table.find("tr").length - 1 > data.Rows.length) {
        for(var i = $table.find("tr").length;i > data.Rows.length;i--) {
          $table.find("tr")[i].remove()
        }
      }
    }catch(ex) {
    }
    $(data.Rows).each(function(i, m) {
      if($table.find("tr").length - 1 > i) {
        var $tr = $($table.find("tr")[i + 1]);
        var currentkey = $tr.find(".dimension").text();
        if(currentkey == m.FormattedValues[0]) {
          var currentvalue = $tr.find(".metric").text();
          if(currentvalue != m.FormattedValues[1]) {
            if(i % 2 == 0) {
              try {
                $tr.children().animate({backgroundColor:"#E6E8DC"}, {duration:1E3}).animate({backgroundColor:"white"}, "slow")
              }catch(e) {
              }
            }else {
              try {
                $tr.children().animate({backgroundColor:"#E6E8DC"}, {duration:1E3}).animate({backgroundColor:"#f5f5f5"}, "slow")
              }catch(e) {
              }
            }
            $tr.find(".metric").text(m.FormattedValues[1])
          }
        }else {
          if(i % 2 == 0) {
            try {
              $tr.children().animate({backgroundColor:"#E6E8DC"}, {duration:1E3}).animate({backgroundColor:"white"}, "slow")
            }catch(e) {
            }
          }else {
            try {
              $tr.children().animate({backgroundColor:"#E6E8DC"}, {duration:1E3}).animate({backgroundColor:"#f5f5f5"}, "slow")
            }catch(e) {
            }
          }
          $tr.find(".dimension").text(m.FormattedValues[0]);
          $tr.find(".metric").text(m.FormattedValues[1])
        }
      }else {
        $table.append("<tr>" + '<td class="index">' + (i + 1) + "." + "</td>" + '<td class="dimension">' + m.FormattedValues[0] + "</td>" + '<td colspan="2" class="metric">' + m.FormattedValues[1] + "</td>" + "</tr>")
      }
    });
    $table.find("tr").each(function(index, name) {
      $(this).find(".index").text(index + ".")
    })
  };
  var queryOptions = {FromDate:jarvis.date.formatDate(fromDate, "yyyy-mm-dd hh:nn:ss.000"), ToDate:jarvis.date.formatDate(toDate, "yyyy-mm-dd hh:nn:ss.999"), Dimensions:dimensions, Metrics:"Event Count", Resolution:"Timeline", omitDate:true, Filter:jarvis.visualisation.realtime.globalfilter, onlyUseCached:false, Limit:limit, SortDir:"DESC", SortKey:metric};
  jarvis.dataaccess.fetch(_this, "/engine/Query.svc/fetch", queryOptions, processFetchProxy)
};
jarvis.visualisation.realtime.Geo.prototype.jarvisResponse_Realtime_Response_Geo = function(message) {
  var _this = null;
  $(jarvis.visualisation.realtime.subscribers).each(function(index, item) {
    if(item.key == message[0].key) {
      _this = item.sender;
      var dataArray = [];
      if(_this.mode == "map") {
        dataArray.push(["Latitude", "Longitude", "Caption", "Event Count"])
      }
      $(message).each(function(i, m) {
        if(m.dimension != "(not set)") {
          var id = parseInt(m.dimension.split(",")[0]);
          var lat = parseFloat(m.dimension.split(",")[1]);
          var lon = parseFloat(m.dimension.split(",")[2]);
          var name = m.dimension.split(",")[3];
          dataArray.push([lat, lon, name, m.value])
        }
      });
      var $placeholder = $($(item.container).find(".innercontainer")).get(0);
      if(_this.mode == "map") {
        var options = {displayMode:"markers", colorAxis:{colors:["#1a87d5"]}};
        _this.geoData = google.visualization.arrayToDataTable(dataArray);
        _this.geoChart.draw(_this.geoData, options)
      }else {
        var features = ge.getFeatures();
        while(features.getFirstChild()) {
          features.removeChild(features.getFirstChild())
        }
        var lastlong = 0;
        var lastlat = 0;
        $(dataArray).each(function(index, item) {
          try {
            var placemark = ge.createPlacemark("");
            placemark.setName(item[2] + "<br/>Event Count: " + item[3]);
            var icon = ge.createIcon("");
            icon.setHref("http://maps.google.com/mapfiles/kml/paddle/red-circle.png");
            var style = ge.createStyle("");
            style.getIconStyle().setIcon(icon);
            style.getIconStyle().setScale(3);
            placemark.setStyleSelector(style);
            var point = ge.createPoint(item[2]);
            point.setLatitude(item[0]);
            point.setLongitude(item[1]);
            placemark.setGeometry(point);
            features.appendChild(placemark);
            lastlong = item[0];
            lastlat = item[1]
          }catch(ex) {
            throw ex;
          }
        });
        if(dataArray.length > 0) {
          try {
            var lookAt = ge.getView().copyAsLookAt(ge.ALTITUDE_RELATIVE_TO_GROUND);
            lookAt.setLatitude(lastlat);
            lookAt.setLongitude(lastlong);
            ge.getView().setAbstractView(lookAt)
          }catch(ex) {
          }
        }
      }
      $table.find(".dimension").each(function(index, item) {
        $(this).off("click");
        $(this).on("click", function(e) {
          var $parent = $($(this).closest(".jarvis.realtime.table"));
          var key = $parent.attr("data-dimensions");
          var value = $(this).text();
          var filter = key + "=" + value + "[AND]";
          if(jarvis.visualisation.realtime.globalfilter.indexOf(filter) == -1 && jarvis.visualisation.realtime.drillDownFilter.indexOf(filter) == -1) {
            jarvis.visualisation.realtime.drillDownFilter += filter;
            jarvis.visualisation.realtime.processFilter()
          }
        })
      });
      $table.find("tr").each(function(index, name) {
        $(this).find(".index").text(index + ".")
      });
      $(_this).trigger("newdata", value)
    }
  })
};
jarvis.visualisation.realtime.Geo.prototype.baseHTML = function(container) {
  var title = "TITLE";
  var dimensions = "DIMENSION";
  var metrics = this.default_subcaption;
  if($(container).attr("data-title")) {
    title = $(container).attr("data-title")
  }
  if($(container).attr("data-dimensions")) {
    dimensions = $(container).attr("data-dimensions")
  }
  if($(container).attr("data-metrics")) {
    metrics = $(container).attr("data-metrics")
  }
  var $html = $('<div class="wrapper"></div>');
  $html.append('<div class="row-fluid">' + '<div class="header">' + '<div class="move"></div>' + '<div class="globe"></div>' + "<h3>" + title + "</h3>" + "</div>" + '<div class="innercontainer" style="height:400px;"></div>' + "</div>");
  $();
  return $html
};
var ge;
function initCB(instance) {
  ge = instance;
  ge.getWindow().setVisibility(true)
}
function failureCB(e, b, c) {
  console.log(e);
  console.log(b);
  console.log(c)
}
jarvis.debug.log("INFO", "jarvis.visualisation.realtime.Geo", 6, "JS source loaded");
jarvis.provide("jarvis.visualisation.realtime.Panel");
jarvis.require("jarvis.debug");
jarvis.require("jarvis.date");
jarvis.require("jarvis.string");
jarvis.require("jarvis.visualisation.realtime");
jarvis.visualisation.realtime.Panel = function(options) {
  var start = (new Date).getMilliseconds();
  jarvis.setRealtimePanel(this);
  var _this = this;
  this._this = this;
  this.options = options;
  try {
    this.panelID = options.panelID
  }catch(e) {
    try {
      this.panelID = jarvis.dataaccess.realtimepanels[0].ID
    }catch(e) {
      this.panelID = -1
    }
  }
  this.containers = [];
  var matchedContainers = null;
  matchedContainers = $(".jarvis.realtime.widgets");
  if(matchedContainers.length > 0) {
    jarvis.debug.log("INFO", "jarvis.visualisation.realtime.Panel", 6, "Building Initial Panel ('" + this.id + "')");
    var $editbutton = $("body").find(".panel-edit");
    $editbutton.off("click");
    $editbutton.on("click", function(e) {
      _this.showEdit({container:matchedContainers, addNew:false, _this:_this})
    });
    var $addwidgetbutton = $("body").find(".widget-add");
    $addwidgetbutton.off("click");
    $addwidgetbutton.on("click", function(e) {
      _this.showEditWidget({container:matchedContainers, addNew:true, _this:_this})
    })
  }
  var $addwidgetbutton = $("body").find(".widget-add");
  $addwidgetbutton.show();
  $(jarvis).unbind("realtimepanelchange");
  $(jarvis).bind("realtimepanelchange", function(e, panelID) {
    _this.panelID = panelID;
    matchedContainers = $(".jarvis.realtime.widgets");
    var $editbutton = $("body").find(".panel-edit");
    $editbutton.off("click");
    $editbutton.on("click", function(e) {
      _this.showEdit({container:matchedContainers, addNew:false, _this:_this})
    });
    var $addwidgetbutton = $("body").find(".widget-add");
    $addwidgetbutton.off("click");
    $addwidgetbutton.on("click", function(e) {
      _this.showEditWidget({container:matchedContainers, addNew:true, _this:_this})
    });
    _this.setDisplay();
    _this.init(_this, matchedContainers, true, true, false);
    _this.drawWidgets(_this, $(".jarvis.realtime.widgets"), true, true);
    jarvis.state.view = "realtime";
    jarvis.state.panelID = _this.panelID;
    jarvis.saveState("Realtime Panel Click")
  });
  this.container = matchedContainers;
  jarvis.visualisation.realtime.panel = this;
  jarvis.visualisation.realtime.start();
  jarvis.objects.RealtimePanels.List();
  jarvis.objects.Dimensions.List();
  jarvis.objects.Metrics.List();
  var executionTime = (new Date).getMilliseconds() - start
};
jarvis.visualisation.realtime.Panel.prototype.init = function(options, container, drawWidgets, breakBindLoop, saveState) {
  jarvis.debug.log("INFO", "jarvis.visualisation.realtime.Panel", 6, "Building panel for ID ('" + this.panelID + "')");
  var _this = this;
  try {
    if(options.panelID > -1) {
      this.panelID = options.panelID
    }else {
      if(this.panelID == -1) {
        this.panelID = options.panelID
      }
    }
  }catch(e) {
    if(this.panelID == -1) {
      this.panelID = jarvis.objects.RealtimePanels[0].ID
    }
  }
  _this.setDisplay();
  jarvis.visualisation.realtime.start();
  if(typeof saveState == "undefined" || saveState == true) {
    jarvis.state.view = "realtime";
    jarvis.state.panelID = _this.panelID;
    jarvis.saveState("Realtime Panel Init")
  }
  try {
    if(this.panelID == -1) {
      this.panelID = options.panelID
    }
  }catch(e) {
    this.panelID = jarvis.objects.RealtimePanels[0].ID
  }
  _this.panel = _this.get(_this, _this.panelID);
  if(!this.panel) {
    return
  }
  if(!breakBindLoop) {
    jarvis.visualisation.realtime.panelFilter = _this.panel.Segment;
    jarvis.visualisation.realtime.processFilter()
  }
  var matchedContainers = null;
  if(container) {
    matchedContainers = $(container)
  }else {
    matchedContainers = $(".jarvis.realtime.widgets")
  }
  if(matchedContainers.length == 0) {
    return
  }
  $(matchedContainers).each(function(index, item) {
    if(options == null) {
      options = new Object
    }
    options.panelID = _this.panelID;
    options.container = item;
    options._this = _this;
    _this.updateDisplay(options);
    _this.drawWidgets(_this, item, true);
    $(jarvis.realtime).unbind("filterchange");
    $(jarvis.realtime).bind("filterchange", function(e) {
      jarvis.debug.log("INFO", "Realtime.Visualisation.RealtimePanel", 6, "Applying Filter");
      $(jarvis.visualisation.realtime.subscribers).each(function(index, item) {
        jarvis.debug.log("INFO", "Realtime.Visualisation.RealtimePanel", 6, "Unsubscribing '" + _this.key + "'");
        var client_id = PokeIn.GetClientId();
        var queryOptions = {ClientID:client_id, key:this.key};
        jarvis.dataaccess.fetch(this, "/engine/Realtime.svc/unsubscribe", queryOptions, function() {
        })
      });
      jarvis.visualisation.realtime.subscribers = [];
      _this.init(_this, item, true, true)
    });
    jarvis.debug.log("INFO", "jarvis.visualisation.realtime.Panel", 6, "Applying to container ('" + this.id + "')")
  })
};
jarvis.visualisation.realtime.Panel.prototype.setDisplay = function() {
};
jarvis.visualisation.realtime.Panel.prototype.drawWidgets = function(sender, container, redraw) {
  var _this = sender;
  var panel = _this.panel;
  var widgets = panel.Widgets;
  var _html = "";
  $(container).empty();
  _html = '<div class="jarvis realtime row-top row fluid-row">&nbsp;' + "</div>";
  _html += '<div class="row fluid-row">' + '<div class="jarvis realtime column-left span4 columns ">&nbsp;' + "</div>" + '<div class="jarvis realtime column-right span8 columns">&nbsp;' + "</div>" + "</div>";
  $(container).append(_html);
  $(".jarvis.realtime.column-left, .jarvis.realtime.column-right").sortable({connectWith:".columns", handle:".header .move", placeholder:{element:function(currentItem) {
    return $('<div class="droptarget">' + $(currentItem).attr("data-title") + "</div>")[0]
  }, update:function(container, p) {
    return
  }}, update:function(e, p) {
    var parent = 1;
    if($(this).attr("class").indexOf("left") > -1) {
      parent = 1
    }else {
      parent = 2
    }
    $(this).children().each(function(i) {
      var widgetID = $(this).attr("data-widgetid");
      jarvis.dataaccess.fetch(this, "/engine/RealtimePanels.svc/UpdateWidgetPosition", {ID:widgetID, Column:parent, Ordinal:i + 1}, function(sender, data, error) {
        data = $.parseJSON(data.data)
      })
    })
  }, stop:function(event, ui) {
  }}).disableSelection();
  $(widgets).each(function(index, item) {
    jarvis.debug.log("INFO", "jarvis.visualisation.realtime.Panel", 6, "Drawing widget ('" + item.Name + "')");
    switch(item.Type) {
      case "Realtime Timeline":
        _html = '<div class="span3 columns maincounter">' + '<div id="metricbox" class="jarvis realtime metricbox" data-metrics="' + item.PrimaryMetric.Name + '"></div>' + "</div>" + '<div class="span9 columns">' + '<div id="timeline" class="jarvis realtime timeline" data-metrics="' + item.PrimaryMetric.Name + '"></div>' + "</div>";
        $(container).find(".row-top").append(_html);
        break;
      case "Realtime Table":
        if(item.Column == 1) {
          _html = '<div class="jarvis realtime table" data-widgetid="' + item.ID + '" data-title="' + item.Name + '" data-dimensions="' + item.Dimension.Name + '" data-metrics="' + item.PrimaryMetric.Name + '" data-period="' + item.Period + '" data-limit="' + item.itemCount + '"></div>';
          $(container).find(".column-left").append(_html)
        }else {
          _html = '<div  class="jarvis realtime table" data-widgetid="' + item.ID + '" data-title="' + item.Name + '" data-dimensions="' + item.Dimension.Name + '" data-metrics="' + item.PrimaryMetric.Name + '" data-period="' + item.Period + '" data-limit="' + item.itemCount + '"></div>';
          $(container).find(".column-right").append(_html)
        }
        break;
      case "Realtime GeoChart":
        if(item.Column == 1) {
          _html = '<div class="jarvis realtime geo" data-widgetid="' + item.ID + '" data-title="' + item.Name + '" data-dimensions="' + item.Dimension.Name + '" data-metrics="' + item.PrimaryMetric.Name + '" data-period="' + item.Period + '" data-limit="' + item.itemCount + '"></div>';
          $(container).find(".column-left").append(_html)
        }else {
          _html = '<div  class="jarvis realtime geo" data-widgetid="' + item.ID + '" data-title="' + item.Name + '" data-dimensions="' + item.Dimension.Name + '" data-metrics="' + item.PrimaryMetric.Name + '" data-period="' + item.Period + '" data-limit="' + item.itemCount + '"></div>';
          $(container).find(".column-right").append(_html)
        }
      ;
      default:
        break
    }
  });
  if(redraw == true) {
    (new jarvis.visualisation.realtime.MetricBox).init();
    (new jarvis.visualisation.realtime.Timeline).init();
    (new jarvis.visualisation.realtime.Table).init()
  }
};
jarvis.visualisation.realtime.Panel.prototype.get = function(sender, id) {
  if(id == -1) {
    return
  }
  var data = jarvis.objects.RealtimePanels[0];
  sender.panelID = data.ID;
  return data
};
jarvis.visualisation.realtime.Panel.prototype.getDefaultPanel = function(container) {
  var data = jarvis.objects.RealtimePanels;
  data = data[0].ID;
  return data
};
jarvis.visualisation.realtime.Panel.prototype.updateDisplay = function(options) {
  var $container = $(options.container);
  var data = options._this.panel;
  $("body").find(".jarvis.caption").text(data.Name);
  $("body").find(".jarvis.description").text(data.Description);
  if($("body").attr("class")) {
    if(!$("body").attr("class").indexOf(data.Name)) {
      $("body").addClass(data.Name)
    }
  }else {
    $("body").addClass(data.Name)
  }
};
jarvis.visualisation.realtime.Panel.prototype.showEdit = function(options) {
  var _this = options._this;
  var $container = $(options.container);
  var addnew = options.addNew;
  var _html = "";
  _html += "";
  _html += '<div class="panel-modal modal" style="left:50%;">';
  _html += '<div class="modal-header">';
  _html += '<button type="button" class="close" data-dismiss="modal">\u00d7</button>';
  if(options.addNew == true) {
    _html += "<h3>Add a new Realtime Panel</h3>";
    _html += "</div>";
    _html += '<div class="modal-body" style="padding:30px;padding-bottom: 0;">';
    _html += '<form class="form-horizontal">';
    _html += "<fieldset>";
    _html += '<div class="control-group">' + '<label class="control-label" for="panel-edit-name">Name</label>' + '<div class="controls">' + '<input type="text" class="input-xlarge" id="panel-edit-name" placeholder="Enter a name for the new Realtime Panel">' + "</div>" + "</div>";
    _html += '<div class="control-group">' + '<label class="control-label" for="panel-edit-description">Description</label>' + '<div class="controls">' + '<textarea class="input-xlarge" id="panel-edit-description" rows="3" placeholder="Describe the new Realtime Panel with a few words."></textarea>' + "</div>" + "</div>";
    _html += '<div class="row-fluid">' + '<div class="span6">' + '<label class="radio"><input type="radio" name="optionsRadios" id="optionsRadios1" value="fiftyfifty" checked="true">' + "<h6>Two column layout</h6></label>" + '<div class="mini-layout fluid">' + '<div class="mini-layout-header"></div>' + '<div class="mini-layout-column-fiftyfifty"></div>' + '<div class="mini-layout-column-fiftyfifty"></div>' + "</div>" + "</div>" + '<div class="span6">' + '<label class="radio"><input type="radio" name="optionsRadios" id="optionsRadios2" value="wideleft">' + 
    "<h6>Wide left column layout</h6></label>" + '<div class="mini-layout fluid">' + '<div class="mini-layout-header"></div>' + '<div class="mini-layout-body" style="margin-right: 2.5%;margin-left:0;"></div>' + '<div class="mini-layout-sidebar"></div>' + "</div>" + "</div>" + "</div>";
    _html += "</fieldset>";
    _html += "</form>";
    _html += "</div>";
    _html += '<div class="modal-footer">';
    _html += '<a class="btn" data-dismiss="modal">Close</a>';
    _html += '<a class="btn btn-primary panel-edit-save">Save changes</a>'
  }else {
    var panel = _this.panel;
    _html += "<h3>Customize Realtime Panel</h3>";
    _html += "</div>";
    _html += '<div class="modal-body" style="padding:30px;padding-bottom: 0;">';
    _html += '<form class="form-horizontal">';
    _html += "<fieldset>";
    _html += '<div class="control-group">' + '<label class="control-label" for="panel-edit-name">Name</label>' + '<div class="controls">' + '<input type="text" class="input-xlarge" id="panel-edit-name" value="' + panel.Name + '">' + "</div>" + "</div>";
    _html += '<div class="control-group">' + '<label class="control-label" for="panel-edit-description">Description</label>' + '<div class="controls">' + '<textarea class="input-xlarge" id="panel-edit-description" rows="3">' + panel.Description + "</textarea>" + "</div>" + "</div>";
    _html += '<div class="row-fluid">' + '<div class="span6">' + '<label class="radio"><input type="radio" name="optionsRadios" id="optionsRadios1" value="fiftyfifty" checked="true">' + "<h6>Two column layout</h6></label>" + '<div class="mini-layout fluid">' + '<div class="mini-layout-header"></div>' + '<div class="mini-layout-column-fiftyfifty"></div>' + '<div class="mini-layout-column-fiftyfifty"></div>' + "</div>" + "</div>" + '<div class="span6">' + '<label class="radio"><input type="radio" name="optionsRadios" id="optionsRadios2" value="wideleft">' + 
    "<h6>Wide left column layout</h6></label>" + '<div class="mini-layout fluid">' + '<div class="mini-layout-header"></div>' + '<div class="mini-layout-body" style="margin-right: 2.5%;margin-left:0;"></div>' + '<div class="mini-layout-sidebar"></div>' + "</div>" + "</div>" + "</div>";
    _html += "</fieldset>";
    _html += "</form>";
    _html += "</div>";
    _html += '<div class="modal-footer">';
    _html += '<a class="panel-edit-delete" style="float:left;margin-top:5px;">Delete</a>';
    _html += '<a class="btn" data-dismiss="modal">Close</a>';
    _html += '<a class="btn btn-primary panel-edit-save">Save changes</a>'
  }
  _html += "</div>";
  _html += "</div>";
  var $modal = $(_html);
  $("body").append($modal);
  $modal.modal();
  $modal.find(".panel-edit-delete").off("click");
  $modal.find(".panel-edit-delete").on("click", function(e) {
    jarvis.dataaccess.fetch(this, "/engine/RealtimePanels.svc/Delete", {ID:_this.panelID}, function(sender, data, error) {
      data = $.parseJSON(data.data);
      jarvis.dataaccess.listRealtimePanels(true);
      _this.panelID = -1;
      _this.init(null, null, true);
      $modal.modal("hide")
    })
  });
  $modal.find(".panel-edit-save").off("click");
  $modal.find(".panel-edit-save").on("click", function(e) {
    var name = "";
    var description = "";
    name = $modal.find("#panel-edit-name").val();
    description = $modal.find("#panel-edit-description").val();
    var panelID = -1;
    if(!addnew) {
      panelID = _this.panelID
    }
    jarvis.dataaccess.fetch(this, "/engine/RealtimePanels.svc/Update", {ID:panelID, Name:name, Description:description}, function(sender, data, error) {
      data = $.parseJSON(data.data);
      var matchedContainers = $(".jarvis.realtime.widgets");
      options = new Object;
      _this.panelID = data;
      _this.init(null, matchedContainers, true);
      jarvis.dataaccess.listRealtimePanels(true);
      $modal.modal("hide")
    })
  });
  $modal.on("hidden", function() {
    $modal.remove()
  })
};
jarvis.visualisation.realtime.Panel.prototype.showEditWidget = function(options) {
  var _this = options._this;
  var $container = $(options.container);
  var addnew = options.addNew;
  var widgetID = -1;
  var column = -1;
  var ordinal = -1;
  var _html = "";
  _html += "";
  _html += '<div class="widget-modal modal" style="left:50%;">';
  _html += '<div class="modal-header">';
  _html += '<button type="button" class="close" data-dismiss="modal">\u00d7</button>';
  if(options.addNew == true) {
    _html += "<h3>Add a new Widget</h3>";
    _html += "</div>";
    _html += '<div class="modal-body" style="padding:30px;padding-bottom: 0;">';
    _html += '<form class="form-horizontal">';
    _html += "<fieldset>";
    _html += '<div class="control-group">' + '<label class="control-label" for="widget-edit-name">Caption</label>' + '<div class="controls">' + '<input type="text" class="input-xlarge" id="widget-edit-name" placeholder="Enter a caption for the new Widget">' + "</div>" + "</div>";
    _html += '<div class="control-group">' + '<label class="control-label" for="widget-edit-type">Type</label>' + '<div class="controls">' + '<select id="widget-edit-type">' + "<option value=1>Table</option>" + "\x3c!--<option value=2>GeoMap</option>--\x3e" + "</select>" + "</div>" + "</div>";
    _html += "<hr >";
    _html += '<div class="control-group">' + '<label class="control-label" for="widget-edit-interval">Dimension</label>' + '<div class="controls">' + '<select id="widget-edit-dimension">';
    var dimensions = jarvis.dataaccess.dimensions;
    $(dimensions).each(function(index, item) {
      _html += '<option value="' + item.Id + '">' + item.Name + "</option>"
    });
    _html += "</select>" + "</div>" + "</div>";
    _html += '<div class="control-group">' + '<label class="control-label" for="widget-edit-interval">Metric</label>' + '<div class="controls">' + '<select id="widget-edit-metric">';
    var metrics = jarvis.dataaccess.metrics;
    $(metrics).each(function(index, item) {
      _html += '<option value="' + item.Id + '">' + item.Name + "</option>"
    });
    _html += "</select>" + "</div>" + "</div>";
    _html += "<hr >";
    _html += '<div class="control-group">' + '<label class="control-label" for="widget-edit-interval">Show a Table with</label>' + '<div class="controls">' + '<select id="widget-edit-limit">' + "<option value=3>3 rows</option>" + "<option value=5>5 rows</option>" + "<option value=10>10 rows</option>" + "<option value=20>20 rows</option>" + "</select>" + "</div>" + "</div>";
    _html += '<div class="control-group">' + '<label class="control-label" for="widget-edit-interval">Interval</label>' + '<div class="controls">' + '<select id="widget-edit-interval">' + "<option value=1>1 sec</option>" + "<option value=3 selected>3 sec</option>" + "<option value=5>5 sec</option>" + "<option value=10>10 sec</option>" + "<option value=30>30 sec</option>" + "<option value=60>60 sec</option>" + "</select>" + '<p class="help-block">The number of seconds between each Refresh.</p>' + 
    "</div>" + "</div>";
    _html += '<div class="control-group">' + '<label class="control-label" for="widget-edit-period">Period</label>' + '<div class="controls">' + '<select id="widget-edit-period">' + "<option value=1>1 sec</option>" + "<option value=3 selected>3 sec</option>" + "<option value=5>5 sec</option>" + "<option value=10>10 sec</option>" + "<option value=30>30 sec</option>" + "<option value=60>60 sec</option>" + "</select>" + '<p class="help-block">The time Period to be queried every Interval.</p>' + "</div>" + 
    "</div>";
    _html += "</fieldset>";
    _html += "</form>";
    _html += "</div>";
    _html += '<div class="modal-footer">';
    _html += '<a class="btn" data-dismiss="modal">Close</a>';
    _html += '<a class="btn btn-primary widget-edit-save">Save changes</a>'
  }else {
    widgetID = options.widgetID;
    var widget = jarvis.dataaccess.getWidget(widgetID);
    try {
      column = widget.Column;
      ordinal = widget.Ordinal
    }catch(ex) {
      column = -1;
      ordinal = -1
    }
    _html += "<h3>Widget Settings</h3>";
    _html += "</div>";
    _html += '<div class="modal-body" style="padding:30px;padding-bottom: 0;">';
    _html += '<form class="form-horizontal">';
    _html += "<fieldset>";
    _html += '<div class="control-group">' + '<label class="control-label" for="widget-edit-name">Caption</label>' + '<div class="controls">' + '<input type="text" class="input-xlarge" id="widget-edit-name" placeholder="Enter a caption for the new Widget" value="' + widget.Name + '">' + "</div>" + "</div>";
    _html += '<div class="control-group">' + '<label class="control-label" for="widget-edit-type">Type</label>' + '<div class="controls">' + '<select id="widget-edit-type">' + "<option value=1>Table</option>" + "</select>" + "</div>" + "</div>";
    _html += "<hr >";
    _html += '<div class="control-group">' + '<label class="control-label" for="widget-edit-interval">Dimension</label>' + '<div class="controls">' + '<select id="widget-edit-dimension">';
    var dimensions = jarvis.dataaccess.dimensions;
    $(dimensions).each(function(index, item) {
      _html += '<option value="' + item.Id + '" ' + (item.Id == widget.Dimension.Id ? "selected" : "") + ">" + item.Name + "</option>"
    });
    _html += "</select>" + "</div>" + "</div>";
    _html += '<div class="control-group">' + '<label class="control-label" for="widget-edit-interval">Metric</label>' + '<div class="controls">' + '<select id="widget-edit-metric">';
    var metrics = jarvis.dataaccess.metrics;
    $(metrics).each(function(index, item) {
      _html += '<option value="' + item.Id + '" ' + (item.Id == widget.PrimaryMetric.Id ? "selected" : "") + ">" + item.Name + "</option>"
    });
    _html += "</select>" + "</div>" + "</div>";
    _html += "<hr >";
    _html += '<div class="control-group">' + '<label class="control-label" for="widget-edit-interval">Show a Table with</label>' + '<div class="controls">' + '<select id="widget-edit-limit">' + '<option value="3" ' + (widget.itemCount == 3 ? "selected" : "") + ">3 rows</option>" + '<option value="5" ' + (widget.itemCount == 5 ? "selected" : "") + ">5 rows</option>" + '<option value="10" ' + (widget.itemCount == 10 ? "selected" : "") + ">10 rows</option>" + '<option value="20" ' + (widget.itemCount == 
    20 ? "selected" : "") + ">20 rows</option>" + "</select>" + "</div>" + "</div>";
    _html += '<div class="control-group">' + '<label class="control-label" for="widget-edit-interval">Interval</label>' + '<div class="controls">' + '<select id="widget-edit-interval">' + '<option value="1" ' + (widget.Interval == 1 ? "selected" : "") + ">1 sec</option>" + '<option value="3" ' + (widget.Interval == 3 ? "selected" : "") + ">3 sec</option>" + '<option value="5" ' + (widget.Interval == 5 ? "selected" : "") + ">5 sec</option>" + '<option value="10" ' + (widget.Interval == 10 ? "selected" : 
    "") + ">10 sec</option>" + '<option value="30" ' + (widget.Interval == 30 ? "selected" : "") + ">30 sec</option>" + '<option value="60" ' + (widget.Interval == 60 ? "selected" : "") + ">60 sec</option>" + "</select>" + '<p class="help-block">The number of seconds between each Refresh.</p>' + "</div>" + "</div>";
    _html += '<div class="control-group">' + '<label class="control-label" for="widget-edit-period">Period</label>' + '<div class="controls">' + '<select id="widget-edit-period">' + '<option value="1" ' + (widget.Period == 1 ? "selected" : "") + ">1 sec</option>" + '<option value="3" ' + (widget.Period == 3 ? "selected" : "") + ">3 sec</option>" + '<option value="5" ' + (widget.Period == 5 ? "selected" : "") + ">5 sec</option>" + '<option value="10" ' + (widget.Period == 10 ? "selected" : "") + ">10 sec</option>" + 
    '<option value="30" ' + (widget.Period == 30 ? "selected" : "") + ">30 sec</option>" + '<option value="60" ' + (widget.Period == 60 ? "selected" : "") + ">60 sec</option>" + "</select>" + '<p class="help-block">The time Period to be queried every Interval.</p>' + "</div>" + "</div>";
    _html += "</fieldset>";
    _html += "</form>";
    _html += "</div>";
    _html += '<div class="modal-footer">';
    _html += '<a class="widget-edit-delete" style="float:left;margin-top:5px;">Delete</a>';
    _html += '<a class="btn" data-dismiss="modal">Close</a>';
    _html += '<a class="btn btn-primary widget-edit-save">Save changes</a>'
  }
  _html += "</div>";
  _html += "</div>";
  var $modal = $(_html);
  $("body").append($modal);
  $modal.modal();
  $modal.find(".widget-edit-delete").off("click");
  $modal.find(".widget-edit-delete").on("click", function(e) {
    jarvis.dataaccess.fetch(this, "/engine/RealtimePanels.svc/DeleteWidget", {ID:widgetID}, function(sender, data, error) {
      data = $.parseJSON(data.data);
      var sender = options.sender;
      var container = options.sendercontainer;
      $(container).remove();
      $modal.modal("hide")
    })
  });
  $modal.find(".widget-edit-save").off("click");
  $modal.find(".widget-edit-save").on("click", function(e) {
    var name = "";
    var type = 1;
    var dimension = "";
    var dimension_name = "";
    var metric = "";
    var metric_name = "";
    var interval = 3;
    var period = 3;
    var limit = 5;
    name = $modal.find("#widget-edit-name").val();
    type = $modal.find("#widget-edit-type").val();
    dimension = $modal.find("#widget-edit-dimension").val();
    dimension_name = $modal.find("#widget-edit-dimension option:selected").text();
    metric = $modal.find("#widget-edit-metric").val();
    metric_name = $modal.find("#widget-edit-metric option:selected").text();
    interval = $modal.find("#widget-edit-interval").val();
    period = $modal.find("#widget-edit-period").val();
    limit = $modal.find("#widget-edit-limit").val();
    jarvis.dataaccess.fetch(this, "/engine/RealtimePanels.svc/UpdateWidget", {panelID:_this.panelID, ID:widgetID, Name:name, Type:type, Dimension:dimension, Metric:metric, Interval:interval, Period:period, Limit:limit, Column:column, Ordinal:ordinal}, function(sender, data, error) {
      data = $.parseJSON(data.data);
      if(options.addNew) {
        _html = '<div class="jarvis realtime table" data-widgetid="' + data + '" data-title="' + name + '" data-dimensions="' + dimension_name + '" data-metrics="' + metric_name + '"data-period="' + period + '" data-limit="' + limit + '"></div>';
        _html = $(_html);
        $(".jarvis.realtime.panel").find(".column-left").prepend(_html);
        var t = new jarvis.visualisation.realtime.Table;
        t.init(null, _html);
        if(jarvis.visualisation.realtime.paused) {
          t.processFetch(t, jarvis.visualisation.realtime.pausedTime, _html, dimension_name, metric_name, limit)
        }
      }else {
        var sender = options.sender;
        var container = options.sendercontainer;
        $(container).attr("data-title", name);
        $(container).attr("data-dimensions", dimension_name);
        $(container).attr("data-metrics", metric_name);
        $(container).attr("data-period", period);
        $(container).attr("data-limit", limit);
        sender.init(null, container);
        if(jarvis.visualisation.realtime.paused) {
          sender.processFetch(sender, jarvis.visualisation.realtime.pausedTime, container, dimension_name, metric_name, limit)
        }
      }
      $modal.modal("hide")
    })
  });
  $modal.on("hidden", function() {
    $modal.remove()
  })
};
jarvis.debug.log("INFO", "Realtime.Visualisation.RealtimePanel", 6, "JS source loaded");
jarvis.provide("jarvis.visualisation.dashboard");
jarvis.require("jarvis.debug");
jarvis.require("jarvis.date");
jarvis.require("jarvis.string");
jarvis.visualisation.dashboard;
jarvis.visualisation.dashboard.panelFilter = "";
jarvis.visualisation.dashboard.globalfilter = "";
jarvis.visualisation.dashboard.filters = [];
jarvis.visualisation.dashboard.init = function() {
  var start = (new Date).getMilliseconds();
  var executionTime = (new Date).getMilliseconds() - start;
  jarvis.debug.log("INFO", "Dashboard", 5, "...dashboard init (" + executionTime + "ms)")
};
jarvis.visualisation.dashboard.setFilter = function(filter) {
  jarvis.visualisation.dashboard.globalfilter = "";
  var oldfilters = jarvis.visualisation.dashboard.filters;
  jarvis.visualisation.dashboard.filters = [];
  if(filter && filter != "") {
    $(filter.split("[AND]")).each(function(index, item) {
      var dimension = item.split("=")[0];
      var value = item.split("=")[1];
      if(dimension) {
        var filter = {caption:dimension, value:value};
        jarvis.visualisation.dashboard.filters.push(filter)
      }
    })
  }
  $(jarvis.visualisation.dashboard.panelFilter.split("[AND]")).each(function(index, item) {
    var dimension = item.split("=")[0];
    var value = item.split("=")[1];
    if(dimension) {
      var filter = {caption:dimension, value:value};
      jarvis.visualisation.dashboard.filters.push(filter)
    }
  });
  jarvis.visualisation.dashboard.globalfilter = jarvis.visualisation.dashboard.panelFilter + (filter ? filter : "");
  $(jarvis.visualisation.dashboard).trigger("filter");
  var $filterbox = $(".jarvis.dashboard.panel").find(".filtersWrapper");
  if($filterbox) {
    $filterbox.empty();
    if(jarvis.visualisation.dashboard.filters.length == 0) {
      $filterbox.hide()
    }else {
      $(jarvis.visualisation.dashboard.filters).each(function(index, item) {
        var _html = "";
        _html += '<div class="filterWrapper">' + '<div class="filterContainer">' + '<span class="caption">' + item.caption + ":</span>" + '<span class="value">' + item.value + "</span>" + '<button type="button" class="close">\u00d7</button>' + "</div>" + "</div>";
        var $item = $(_html);
        var $close = $($item.find(".close"));
        $close.off("click");
        $close.on("click", function(e) {
          var key = item.caption + "=" + item.value + "[AND]";
          jarvis.visualisation.dashboard.panelFilter = jarvis.visualisation.dashboard.panelFilter.replace(key, "");
          jarvis.visualisation.dashboard.setFilter()
        });
        $filterbox.append($item)
      });
      $filterbox.show()
    }
  }
};
jarvis.visualisation.dashboard.addPartial = function(partial) {
  $(jarvis.visualisation.dashboard).trigger("addpartialfilter", partial)
};
jarvis.visualisation.dashboard.removePartial = function(partial) {
  $(jarvis.visualisation.dashboard).trigger("removepartialfilter", partial)
};
jarvis.debug.log("INFO", "Jarvis.Visualisation.Dashboard", 6, "JS source loaded");
jarvis.provide("jarvis.visualisation.dashboard.Timeline");
jarvis.require("jarvis.debug");
jarvis.require("jarvis.date");
jarvis.require("jarvis.string");
jarvis.require("jarvis.visualisation.dashboard");
jarvis.visualisation.dashboard.Timeline = function(options) {
  var start = (new Date).getMilliseconds();
  this._this = this;
  this.options = options;
  this.default_caption = "Right now";
  this.default_subcaption = "Events per Second";
  this.default_useAverage = true;
  this.key = "";
  this.itemCount = 10;
  this.initialized = false;
  this.gettingBackData = false;
  this.initialCallbacks = [];
  this.initialTimestamp = null;
  this.Resolution = "Day";
  this.containers = [];
  jarvis.objects.Dimensions.List();
  jarvis.objects.Metrics.List();
  var executionTime = (new Date).getMilliseconds() - start
};
jarvis.visualisation.dashboard.Timeline.prototype.init = function(options, container) {
  var _this = this;
  var start = (new Date).getMilliseconds();
  this._this = this;
  this.options = $.extend({height:235}, options);
  this.containers = this.containers || [];
  this.dimensions = [];
  this.metrics = [];
  this.DateBox = jarvis.visualisation.picker.DateBox;
  $(jarvis.realtime).bind("filterchange", function(e) {
  });
  var matchedContainers = null;
  if(container) {
    matchedContainers = $(container)
  }else {
    matchedContainers = $(".jarvis.dashboard.timeline")
  }
  if(matchedContainers.length == 0) {
    return
  }
  $(matchedContainers).each(function(index, item) {
    if(!$(this).parent().hasClass("prettyprint")) {
      jarvis.debug.log("INFO", "jarvis.visualisation.dashboard.Timeline", 6, "Applying to container ('" + this.id + "')");
      var _height = $(item).attr("data-height");
      if(_height) {
        _this.options.height = _height
      }
      var _itemcount = $(item).attr("data-limit");
      if(_itemcount) {
        _this.itemCount = _itemcount
      }
      var _metrics = $(item).attr("data-metrics");
      if(!_metrics) {
        return
      }
      _metrics = _metrics.split(",");
      $(_metrics).each(function(index, item) {
        _metrics[index] = $.trim(_metrics[index]);
        _this.metrics.push(_metrics[index])
      });
      $(jarvis.dataaccess.metrics).each(function(index, item) {
        if(_metrics.indexOf(item.Name) > -1) {
          _this.metrics[_metrics.indexOf(item.Name)] = item
        }
      });
      $(this).bind("data", function(evt, ret) {
        ret.data = $(this).data().data
      });
      $(this).bind("click", function(evt) {
        $(this).trigger("clicked", $(this).data().data)
      });
      $(jarvis.visualisation.report).bind("filter", function(filter) {
        _this.fetch(_this)
      });
      $(item).empty();
      _this.draw(item);
      _this.fetch(_this, item);
      $(this).find(".settings").off("click");
      $(this).find(".settings").on("click", function(e) {
        jarvis.getDashboard().showEditWidget({_this:jarvis.getDashboard(), container:jarvis.getDashboard().container, addNew:false, widgetID:$(item).attr("data-widgetid"), sender:_this, sendercontainer:item})
      });
      _this.containers.push(item)
    }
  });
  $(_this.DateBox).bind("datechange", function() {
    $(_this.containers).each(function(i, container) {
      _this.fetch(_this, container)
    })
  });
  var executionTime = (new Date).getMilliseconds() - start;
  jarvis.debug.log("INFO", "Jarvis.Visualisation.Dashboard.Timeline", 5, "...init (" + executionTime + "ms)")
};
jarvis.visualisation.dashboard.Timeline.prototype.fetch = function(sender, container) {
  if(!sender) {
    sender = jarvis.dashboard.visualisation.Pie
  }
  var _this = sender;
  var startdate = jarvis.visualisation.picker.DateBox.getDate().base_fromdate;
  var enddate = jarvis.visualisation.picker.DateBox.getDate().base_todate;
  if(_this.DateBox.comparePeriod) {
    var compare_startdate = jarvis.visualisation.picker.DateBox.getDate().compare_fromdate;
    var compare_enddate = jarvis.visualisation.picker.DateBox.getDate().compare_todate
  }
  var _metrics = $(container).attr("data-metrics");
  var _metricslist = _metrics;
  if(!_metrics) {
    return""
  }
  _metrics = _metrics.split(",");
  $(_metrics).each(function(index, item) {
    var mindex = -1;
    $(jarvis.dataaccess.metrics).each(function(mi, mo) {
      if(mo.Name == $.trim(item)) {
        mindex = mi
      }
    });
    _metrics[index] = jarvis.dataaccess.metrics[mindex];
    _this.metrics.push(_metrics[index])
  });
  $(jarvis.dataaccess.metrics).each(function(index, item) {
    if(_metrics.indexOf(item.Name) > -1) {
      _this.metrics[_metrics.indexOf(item.Name)] = item
    }
  });
  if(!_metrics) {
    return""
  }
  var queryOptions = [];
  var _queryOptions = {id:"primary", FromDate:jarvis.date.formatDate(startdate, "yyyy-mm-dd hh:nn:ss.000"), ToDate:jarvis.date.formatDate(enddate, "yyyy-mm-dd hh:nn:ss.999"), Dimensions:"", Metrics:_metricslist, Resolution:_this.Resolution, omitDate:false, Filter:jarvis.visualisation.dashboard.globalfilter, sortKey:_metrics[_metrics.length - 1].Name, sortDir:"DESC"};
  queryOptions.push(_queryOptions);
  if(_this.DateBox.comparePeriod) {
    _queryOptions = {id:"compare_primary", FromDate:jarvis.date.formatDate(compare_startdate, "yyyy-mm-dd hh:nn:ss.000"), ToDate:jarvis.date.formatDate(compare_enddate, "yyyy-mm-dd hh:nn:ss.999"), Dimensions:"", Metrics:_metricslist, Resolution:_this.Resolution, omitDate:false, Filter:jarvis.visualisation.dashboard.globalfilter, sortKey:_metrics[_metrics.length - 1].Name, sortDir:"DESC"};
    queryOptions.push(_queryOptions)
  }
  jarvis.dataaccess.multifetch(_this, "/engine/Query.svc/fetch", queryOptions, function(sender, data, error) {
    var series = [];
    $(data).each(function(index, item) {
      try {
        var result = item.data.Result;
        var request = item.data.Request;
        var data = item.data.Result;
        var _data = item.data.Result.Rows;
        if(data.Columns.length == 2) {
          item.data.Result.id = item.id;
          series.push(item.data.Result)
        }else {
          var localdata = {};
          jQuery.extend(true, localdata, data);
          localdata.Columns.splice(2, 1);
          localdata.id = item.id;
          $(localdata.Rows).each(function(i, row) {
            var point = row;
            localdata.Rows[i].FormattedValues.splice(2, 1);
            localdata.Rows[i].Values.splice(2, 1)
          });
          series.push(localdata);
          localdata = {};
          jQuery.extend(true, localdata, data);
          localdata.Columns.splice(1, 1);
          localdata.id = item.id;
          $(localdata.Rows).each(function(i, row) {
            var point = row;
            localdata.Rows[i].FormattedValues.splice(1, 1);
            localdata.Rows[i].Values.splice(1, 1)
          });
          series.push(localdata)
        }
      }catch(ex) {
      }
    });
    fixdate(series);
    _this.update(sender, _metrics, series, container)
  })
};
function fixdate(series) {
  var cols = [];
  $(series).each(function(i, series) {
    $(series.Columns).each(function(index, col) {
      if(col == "Date") {
        cols.push(index)
      }
    });
    if(cols.length == 0) {
      return series
    }
    $(series.Rows).each(function(index, row) {
      var value = row.Values[cols[0]];
      value = jarvis.date.flatDate(value);
      row.Values[cols[0]] = value;
      row.FormattedValues[cols[0]] = value
    })
  })
}
jarvis.visualisation.dashboard.Timeline.prototype.update = function(sender, metrics, series, container) {
  var _this = sender;
  if(!series[0]) {
    return
  }
  var $wrapper = $(container);
  var _itemcount = $(container).attr("data-limit");
  if(_itemcount) {
    _this.itemCount = _itemcount
  }
  var $container = $($(container).find(".chart"));
  var columns = series[0].Columns;
  var data = series[0].Rows;
  var _totalsum = 0;
  $(data).each(function(index, row) {
    _totalsum += parseFloat(row.Values[row.Values.length - 1])
  });
  var chart = new Highcharts.Chart({chart:{height:_this.options.height, marginTop:0, marginLeft:-15, marginRight:-20, marginBottom:50, spacingLeft:0, spacingTop:15, spacingRight:0, spacingBottom:0, renderTo:$container.get(0), animation:false, type:"area", events:{load:function() {
  }, redraw:function() {
    $wrapper.find(".jarvis.legend").empty();
    var _series = chart.series;
    $(_series).each(function(index, series) {
      var seriesname = "";
      var _html = "";
      seriesname = series.name;
      _html = '<span style="border: 5px solid white; border-color: ' + series.color + '; border-radius: 5px;height: 0px; display: inline-block; width: 0px;margin-left:10px;"></span>&nbsp;';
      _html += '<span class="jarvis legendseries" data-id="0">' + seriesname + "</span>";
      $wrapper.find(".jarvis.legend").append(_html)
    })
  }, selection:function(event) {
  }}}, title:{text:null}, xAxis:{type:"datetime", dateTimeLabelFormats:{day:"%e %b"}, labels:{formatter:function() {
    var date = new Date(this.value);
    var sDate = "";
    if(date.getHours() + date.getTimezoneOffset() / 60 != 0) {
      sDate = jarvis.date.formatDate(date, "mmm dd hh:nn")
    }else {
      sDate = jarvis.date.formatDate(date, "mmm dd")
    }
    return sDate
  }, fontFamily:"Signika", enabled:true, style:{fontSize:"11px;", color:"#999"}, y:30}, tickLength:0, startOnTick:false, endOnTick:false, showFirstLabel:false, showLastLabel:false}, yAxis:[{gridLineColor:"#efefef", min:0, showFirstLabel:false, showLastLabel:true, endOnTick:true, title:{text:null}, labels:{formatter:function() {
    var ytype = "";
    try {
      ytype = series[0].Columns[1].Suffix
    }catch(e) {
      ytype = ""
    }
    if(ytype == "seconds") {
      var TimeInSeconds = this.value;
      var sHours = Math.round(TimeInSeconds / 60 / 60 - 0.5, 0);
      var sMinutes = Math.round(TimeInSeconds / 60 - 0.5, 0) % 60;
      var sSeconds = TimeInSeconds % 60;
      if(sHours < 10) {
        sHours = "0" + sHours
      }
      if(sMinutes < 10) {
        sMinutes = "0" + sMinutes
      }
      if(sSeconds < 10) {
        sSeconds = "0" + sSeconds
      }
      return sHours + ":" + sMinutes + ":" + sSeconds
    }else {
      return jarvis.string.formatNumber(this.value, 0, true)
    }
  }, style:{fontFamily:"Signika", fontSize:"11px", color:"#999", textShadow:"-1px -1px 0 #ffffff, 1px -1px 0 #ffffff, -1px 1px 0 #ffffff, 1px 1px 0 #ffffff"}, align:"left", x:20, y:15}, plotLines:[{value:0, width:1, color:"#ffffff"}]}, {gridLineColor:"#efefef", min:0, showFirstLabel:false, showLastLabel:true, endOnTick:true, title:{text:null}, labels:{formatter:function() {
    var ytype = "";
    try {
      ytype = series[1].Columns[1].Suffix
    }catch(e) {
      ytype = ""
    }
    if(ytype == "seconds") {
      var TimeInSeconds = this.value;
      var sHours = Math.round(TimeInSeconds / 60 / 60 - 0.5, 0);
      var sMinutes = Math.round(TimeInSeconds / 60 - 0.5, 0) % 60;
      var sSeconds = TimeInSeconds % 60;
      if(sHours < 10) {
        sHours = "0" + sHours
      }
      if(sMinutes < 10) {
        sMinutes = "0" + sMinutes
      }
      if(sSeconds < 10) {
        sSeconds = "0" + sSeconds
      }
      return sHours + ":" + sMinutes + ":" + sSeconds
    }else {
      return jarvis.string.formatNumber(this.value, 0, true)
    }
  }, style:{fontFamily:"Signika", fontSize:"11px", color:"#999", textShadow:"-1px -1px 0 #ffffff, 1px -1px 0 #ffffff, -1px 1px 0 #ffffff, 1px 1px 0 #ffffff"}, x:-25, y:15, align:"right"}, opposite:true}], tooltip:{shared:true, useHTML:true, borderColor:"#333333", formatter:function() {
    var points = this.points;
    var formattedDate = "";
    if(this.points.length == 1) {
      var nextindex = 0;
      if(_this.Resolution == "Hour" || _this.Resolution == "Minute") {
        formattedDate = Highcharts.dateFormat("%A, %B %d, %Y %H:%M", this.points[0].point.x)
      }else {
        if(_this.Resolution == "Month") {
          $(points[0].series.xData).each(function(index, item) {
            if(item == points[0].point.x) {
              nextindex = index + 1
            }
          });
          if(nextindex < points[0].series.xData.length) {
            if(nextindex == points[0].series.xData.length - 1) {
              formattedDate = jarvis.date.formatDate(jarvis.date.flatDate(points[0].point.x));
              var sDate = jarvis.date.flatDate(points[0].series.xData[nextindex]);
              sDate = jarvis.date.flatDate(new Date(sDate.getFullYear(), sDate.getMonth(), 0));
              formattedDate += " - " + jarvis.date.formatDate(sDate)
            }else {
              formattedDate = jarvis.date.formatDate(jarvis.date.flatDate(points[0].point.x));
              var sDate = jarvis.date.flatDate(points[0].series.xData[nextindex]);
              sDate.setDate(sDate.getDate() - 1);
              formattedDate += " - " + jarvis.date.formatDate(sDate)
            }
          }else {
            var sDate = jarvis.date.flatDate(points[0].point.x);
            sDate.setDate(1);
            formattedDate = jarvis.date.formatDate(sDate);
            formattedDate += " - " + jarvis.date.formatDate(points[0].point.x)
          }
        }else {
          if(_this.Resolution == "Week") {
            $(points[0].series.xData).each(function(index, item) {
              if(item == points[0].point.x) {
                nextindex = index + 1
              }
            });
            if(nextindex < points[0].series.xData.length) {
              formattedDate = jarvis.date.formatDate(jarvis.date.flatDate(points[0].point.x));
              var sDate = jarvis.date.flatDate(points[0].series.xData[nextindex]);
              sDate.setDate(sDate.getDate() - 1);
              formattedDate += " - " + jarvis.date.formatDate(sDate)
            }else {
              var sDate = jarvis.date.flatDate(points[0].point.x);
              formattedDate = jarvis.date.formatDate(sDate);
              formattedDate += " - " + jarvis.date.formatDate(_this.DateBox.base_todate)
            }
          }else {
            formattedDate = jarvis.date.formatDate(points[0].point.x)
          }
        }
      }
      return'<div style="padding-bottom:5px;"><b>' + formattedDate + '</b></div><div><div style="border: 3px solid white; border-color: #058DC7; border-radius: 3px;height: 0px; display: inline-block; width: 0px;position:relative;top:-1px;">' + '</div><div style="padding-left:3px;display:inline">' + this.points[0].point.name.replace("_x0020_", " ") + ": " + this.points[0].point.formattedy + "</div>" + "</div>"
    }else {
      if(this.points[1].point.compare) {
        if(_this.Resolution == "Month") {
          $(points[0].series.xData).each(function(index, item) {
            if(item == points[0].point.x) {
              nextindex = index + 1
            }
          });
          if(nextindex < points[0].series.xData.length) {
            if(nextindex == points[0].series.xData.length - 1) {
              formattedDate = jarvis.date.formatDate(jarvis.date.flatDate(points[0].point.x));
              var sDate = jarvis.date.flatDate(points[0].series.xData[nextindex]);
              sDate = jarvis.date.flatDate(new Date(sDate.getFullYear(), sDate.getMonth(), 0));
              formattedDate += " - " + jarvis.date.formatDate(sDate)
            }else {
              formattedDate = jarvis.date.formatDate(jarvis.date.flatDate(points[0].point.x));
              var sDate = jarvis.date.flatDate(points[0].series.xData[nextindex]);
              sDate.setDate(sDate.getDate() - 1);
              formattedDate += " - " + jarvis.date.formatDate(sDate)
            }
          }else {
            var sDate = jarvis.date.flatDate(points[0].point.x);
            sDate.setDate(1);
            formattedDate = jarvis.date.formatDate(sDate);
            formattedDate += " - " + jarvis.date.formatDate(points[0].point.x)
          }
        }else {
          if(_this.Resolution == "Week") {
            $(points[0].series.xData).each(function(index, item) {
              if(item == points[0].point.x) {
                nextindex = index + 1
              }
            });
            if(nextindex < points[0].series.xData.length) {
              formattedDate = jarvis.date.formatDate(jarvis.date.flatDate(points[0].point.x));
              var sDate = jarvis.date.flatDate(points[0].series.xData[nextindex]);
              sDate.setDate(sDate.getDate() - 1);
              formattedDate += " - " + jarvis.date.formatDate(sDate)
            }else {
              var sDate = jarvis.date.flatDate(points[0].point.x);
              formattedDate = jarvis.date.formatDate(sDate);
              formattedDate += " - " + jarvis.date.formatDate(_this.DateBox.base_todate)
            }
          }else {
            formattedDate = jarvis.date.formatDate(points[0].point.x)
          }
        }
        var _html = '<div style="padding-bottom:5px;"><b>' + formattedDate + "</b></div>";
        _html += "<div>";
        var _points = _.sortBy(this.points, function(item) {
          return item.series.options.ordinal
        });
        $.each(_points, function(i, point) {
          if(!point.point.compare) {
            _html += '<div><div style="border: 3px solid white; border-color: ' + point.series.color + '; border-radius: 3px;height: 0px; display: inline-block; width: 0px;position:relative;top:-1px;">';
            _html += '</div><div style="padding-left:3px;display:inline">' + point.series.options.name + ": " + point.point.formattedy + "</div></div>"
          }
        });
        _html += "</div>";
        var nextindex = 0;
        if(_this.Resolution == "Month") {
          $(points[1].series.points).each(function(index, item) {
            if(item.actualdate == points[1].point.actualdate) {
              nextindex = index + 1
            }
          });
          if(nextindex < points[1].series.points.length) {
            if(nextindex == points[1].series.points.length - 1) {
              formattedDate = jarvis.date.formatDate(jarvis.date.flatDate(points[1].point.actualdate));
              var sDate = jarvis.date.flatDate(points[1].series.points[nextindex].actualdate);
              sDate = jarvis.date.flatDate(new Date(sDate.getFullYear(), sDate.getMonth(), 0));
              formattedDate += " - " + jarvis.date.formatDate(sDate)
            }else {
              formattedDate = jarvis.date.formatDate(jarvis.date.flatDate(points[1].point.actualdate));
              var sDate = jarvis.date.flatDate(points[1].series.points[nextindex].actualdate);
              sDate.setDate(sDate.getDate() - 1);
              formattedDate += " - " + jarvis.date.formatDate(sDate)
            }
          }else {
            var sDate = jarvis.date.flatDate(points[1].point.actualdate);
            sDate.setDate(1);
            formattedDate = jarvis.date.formatDate(sDate);
            sDate = jarvis.date.flatDate(new Date(sDate.getFullYear(), sDate.getMonth() + 1, 0));
            formattedDate += " - " + jarvis.date.formatDate(sDate)
          }
        }else {
          if(_this.Resolution == "Week") {
            $(points[1].series.points).each(function(index, item) {
              if(item.actualdate == points[1].point.actualdate) {
                nextindex = index + 1
              }
            });
            if(nextindex < points[1].series.points.length) {
              formattedDate = jarvis.date.formatDate(jarvis.date.flatDate(points[1].point.actualdate));
              var sDate = jarvis.date.flatDate(points[1].series.points[nextindex].actualdate);
              sDate.setDate(sDate.getDate() - 1);
              formattedDate += " - " + jarvis.date.formatDate(sDate)
            }else {
              var sDate = jarvis.date.flatDate(points[1].point.actualdate);
              formattedDate = jarvis.date.formatDate(sDate);
              formattedDate += " - " + jarvis.date.formatDate(_this.DateBox.compare_todate)
            }
          }else {
            formattedDate = jarvis.date.formatDate(points[1].point.actualdate)
          }
        }
        _html += '<div style="padding-bottom:5px;margin-top:10px;"><b>' + formattedDate + "</b></div>";
        _html += "<div>";
        _points = _.sortBy(this.points, function(item) {
          return item.series.options.ordinal
        });
        $.each(_points, function(i, point) {
          if(point.point.compare) {
            _html += '<div><div style="border: 3px solid white; border-color: ' + point.series.color + '; border-radius: 3px;height: 0px; display: inline-block; width: 0px;position:relative;top:-1px;">';
            _html += '</div><div style="padding-left:3px;display:inline">' + point.series.options.name + ": " + point.point.formattedy + "</div></div>"
          }
        });
        _html += "</div>"
      }else {
        if(_this.Resolution == "Month") {
          $(points[0].series.xData).each(function(index, item) {
            if(item == points[0].point.x) {
              nextindex = index + 1
            }
          });
          if(nextindex < points[0].series.xData.length) {
            if(nextindex == points[0].series.xData.length - 1) {
              formattedDate = jarvis.date.formatDate(jarvis.date.flatDate(points[0].point.x));
              var sDate = jarvis.date.flatDate(points[0].series.xData[nextindex]);
              sDate = jarvis.date.flatDate(new Date(sDate.getFullYear(), sDate.getMonth(), 0));
              formattedDate += " - " + jarvis.date.formatDate(sDate)
            }else {
              formattedDate = jarvis.date.formatDate(jarvis.date.flatDate(points[0].point.x));
              var sDate = jarvis.date.flatDate(points[0].series.xData[nextindex]);
              sDate.setDate(sDate.getDate() - 1);
              formattedDate += " - " + jarvis.date.formatDate(sDate)
            }
          }else {
            var sDate = jarvis.date.flatDate(points[0].point.x);
            sDate.setDate(1);
            formattedDate = jarvis.date.formatDate(sDate);
            formattedDate += " - " + jarvis.date.formatDate(points[0].point.x)
          }
        }else {
          if(_this.Resolution == "Week") {
            $(points[0].series.xData).each(function(index, item) {
              if(item == points[0].point.x) {
                nextindex = index + 1
              }
            });
            if(nextindex < points[0].series.xData.length) {
              formattedDate = jarvis.date.formatDate(jarvis.date.flatDate(points[0].point.x));
              var sDate = jarvis.date.flatDate(points[0].series.xData[nextindex]);
              sDate.setDate(sDate.getDate() - 1);
              formattedDate += " - " + jarvis.date.formatDate(sDate)
            }else {
              var sDate = jarvis.date.flatDate(points[0].point.x);
              formattedDate = jarvis.date.formatDate(sDate);
              formattedDate += " - " + jarvis.date.formatDate(_this.DateBox.base_todate)
            }
          }else {
            formattedDate = jarvis.date.formatDate(points[0].point.x)
          }
        }
        _html = '<div style="padding-bottom:5px;"><b>' + formattedDate + "</b></div>";
        _html += "<div>";
        _points = _.sortBy(this.points, function(item) {
          return item.series.options.ordinal
        });
        $.each(this.points, function(i, point) {
          _html += '<div><div style="border: 3px solid white; border-color: ' + point.series.color + '; border-radius: 3px;height: 0px; display: inline-block; width: 0px;position:relative;top:-1px;">';
          _html += '</div><div style="padding-left:3px;display:inline">' + point.series.options.name + ": " + point.point.formattedy + "</div></div>"
        });
        _html += "</div>"
      }
      return _html
    }
  }}, legend:{enabled:false}, credits:{enabled:false}, exporting:{enabled:true}, plotOptions:{column:{allowPointSelect:true}, line:{shadow:true}, series:{shadow:true, connectNulls:true, fillOpacity:0.1, marker:{symbol:"circle", enabled:Math.abs(Date.dateDiff("d", _this.DateBox.getDate().base_fromdate, _this.DateBox.getDate().base_todate)) > 90 ? "false" : "true", states:{hover:{enabled:true}}}}}, series:[{name:function() {
    var name = "";
    name = columns[columns.length - 1].Name;
    return name
  }(), data:function() {
    var result = [];
    var sum = 0;
    $(data).each(function(index, item) {
      var x = new Date(item.FormattedValues[0]);
      var y = parseFloat(item.Values[item.Values.length - 1]);
      result.push({x:x, y:y, name:columns[columns.length - 1].Name, formattedy:item.FormattedValues[1], compare:false})
    });
    return result
  }(), yAxis:0}]});
  var _seriesholder = [];
  $(series).each(function(index, _series) {
    if(index > 0) {
      var result = [];
      $(_series.Rows).each(function(index, item) {
        try {
          var x = chart.options.series[0].data[index].x;
          var y = parseFloat(item.Values[item.Values.length - 1]);
          var actualdate = jarvis.date.flatDate(item.FormattedValues[0]);
          result.push({x:x, y:y, name:columns[columns.length - 1].Name, formattedy:item.FormattedValues[1], compare:_series.id.indexOf("compare") > -1 ? true : false, actualdate:actualdate})
        }catch(ex) {
          jarvis.debug.log("ERROR", "jarvis.visualisation.dashboard.Timeline", 6, "Failed to draw x point: " + ex.message)
        }
      });
      var _color;
      var _yaxis = 0;
      var _seriesindex = 1;
      if(index > 1 && series.length == 4) {
        if(index == 3) {
          _yaxis = 1
        }else {
          _yaxis = 0
        }
        _color = jarvis.offcolors[index - 2]
      }else {
        if(index == 1 && series.length == 2) {
          if(_this.DateBox.comparePeriod) {
            _yaxis = 1;
            _color = jarvis.offcolors[index - 1]
          }else {
            _yaxis = 1;
            _color = jarvis.colors[index]
          }
        }else {
          _yaxis = 1;
          _color = jarvis.colors[index]
        }
      }
      var chartSeries = {name:_series.Columns[1].Name, lineWidth:2, type:"line", yAxis:_yaxis, shadow:true, data:result, color:_color};
      _seriesholder.push(chartSeries)
    }
  });
  if(series.length == 4) {
    chart.addSeries(_seriesholder[1], false);
    chart.addSeries(_seriesholder[0], false);
    chart.addSeries(_seriesholder[2], false)
  }else {
    $(_seriesholder).each(function(index, _series) {
      chart.addSeries(_series, false)
    })
  }
  chart.redraw()
};
jarvis.visualisation.dashboard.Timeline.prototype.baseHTML = function(sender) {
  var _this = sender;
  var $html = $('<div class="wrapper"></div>');
  $html.append('<div class="row-fluid">' + '<div class="header">' + '<div class="settings"></div>' + '<div class="move"></div>' + "<h3>" + _this.title + "</h3>" + "</div>" + '<div class="content">' + '<div class="jarvis legend"></div>' + '<div class="chart"></div>' + "</div>" + "</div>");
  return $html
};
jarvis.visualisation.dashboard.Timeline.prototype.draw = function(container) {
  var _this = this;
  var title = "TITLE";
  var metrics = this.default_subcaption;
  if($(container).attr("data-title")) {
    title = $(container).attr("data-title")
  }
  if($(container).attr("data-metrics")) {
    metrics = $(container).attr("data-metrics")
  }
  _this.title = title;
  var $html = _this.baseHTML(_this);
  $(container).append($html)
};
jarvis.debug.log("INFO", "Jarvis.Visualisation.Dashboard.Timeline", 6, "JS source loaded");
jarvis.provide("jarvis.visualisation.dashboard.MetricBox");
jarvis.require("jarvis.debug");
jarvis.require("jarvis.date");
jarvis.require("jarvis.string");
jarvis.require("jarvis.visualisation.dashboard");
jarvis.visualisation.dashboard.MetricBox = function(options) {
  var start = (new Date).getMilliseconds();
  this._this = this;
  this.options = options;
  this.default_caption = "Right now";
  this.default_subcaption = "Events per Second";
  this.default_useAverage = true;
  this.key = "";
  this.initialized = false;
  this.gettingBackData = false;
  this.initialCallbacks = [];
  this.initialTimestamp = null;
  this.Resolution = "Day";
  this.containers = [];
  this.DateBox = jarvis.visualisation.picker.DateBox;
  jarvis.objects.Dimensions.List();
  jarvis.objects.Metrics.List();
  var executionTime = (new Date).getMilliseconds() - start
};
jarvis.visualisation.dashboard.MetricBox.prototype.init = function(options, container) {
  var _this = this;
  var start = (new Date).getMilliseconds();
  this._this = this;
  this.options = $.extend({minichart:{height:18, width:75}}, options);
  this.containers = this.containers || [];
  this.metrics = [];
  var matchedContainers = null;
  if(container) {
    matchedContainers = $(container)
  }else {
    matchedContainers = $(".jarvis.dashboard.metricbox")
  }
  if(matchedContainers.length == 0) {
    return
  }
  $(matchedContainers).each(function(index, item) {
    if(!$(this).parent().hasClass("prettyprint")) {
      jarvis.debug.log("INFO", "jarvis.visualisation.dashboard.MetricBox", 6, "Applying to container ('" + this.id + "')");
      var _height = $(item).attr("data-minichart-height");
      if(_height) {
        _this.options.minichart.height = _height
      }
      var _width = $(item).attr("data-minichart-width");
      if(_width) {
        _this.options.minichart.width = _width
      }
      var _metrics = $(item).attr("data-metrics");
      if(!_metrics) {
        return
      }
      _metrics = _metrics.split(",");
      $(_metrics).each(function(index, item) {
        _metrics[index] = $.trim(_metrics[index]);
        _this.metrics.push(_metrics[index])
      });
      $(jarvis.dataaccess.metrics).each(function(index, item) {
        if(_metrics.indexOf(item.Name) > -1) {
          _this.metrics[_metrics.indexOf(item.Name)] = item
        }
      });
      $(this).bind("data", function(evt, ret) {
        ret.data = $(this).data().data
      });
      $(this).bind("click", function(evt) {
        $(this).trigger("clicked", $(this).data().data)
      });
      $(jarvis.visualisation.report).bind("filter", function(filter) {
        _this.fetch(_this)
      });
      $(item).empty();
      _this.draw(item);
      _this.fetch(_this, item);
      $(this).find(".settings").off("click");
      $(this).find(".settings").on("click", function(e) {
        jarvis.getDashboard().showEditWidget({_this:jarvis.getDashboard(), container:jarvis.getDashboard().container, addNew:false, widgetID:$(item).attr("data-widgetid"), sender:_this, sendercontainer:item})
      });
      _this.containers.push(item)
    }
  });
  $(_this.DateBox).bind("datechange", function() {
    $(_this.containers).each(function(i, container) {
      _this.fetch(_this, container)
    })
  });
  var executionTime = (new Date).getMilliseconds() - start;
  jarvis.debug.log("INFO", "Jarvis.Visualisation.Dashboard.MetricBox", 5, "...init (" + executionTime + "ms)")
};
jarvis.visualisation.dashboard.MetricBox.prototype.fetch = function(sender, container) {
  if(!sender) {
    sender = jarvis.visualisation.dashboard.MetricBox
  }
  var _this = sender;
  var startdate = jarvis.visualisation.picker.DateBox.getDate().base_fromdate;
  var enddate = jarvis.visualisation.picker.DateBox.getDate().base_todate;
  if(_this.DateBox.comparePeriod) {
    var compare_startdate = jarvis.visualisation.picker.DateBox.getDate().compare_fromdate;
    var compare_enddate = jarvis.visualisation.picker.DateBox.getDate().compare_todate
  }
  var _metrics = $(container).attr("data-metrics");
  if(!_metrics) {
    return""
  }
  _metrics = _metrics.split(",");
  $(_metrics).each(function(index, item) {
    var imetric = -1;
    $(jarvis.dataaccess.metrics).each(function(i, o) {
      if(o.Name == $.trim(item)) {
        imetric = i
      }
    });
    _metrics[index] = jarvis.dataaccess.metrics[imetric]
  });
  if(typeof _metrics[0] == "undefined") {
    return""
  }
  $(_metrics).each(function(index, metric) {
    var queryOptions = [];
    var _queryOptions = {id:"primary", FromDate:jarvis.date.formatDate(startdate, "yyyy-mm-dd hh:nn:ss.000"), ToDate:jarvis.date.formatDate(enddate, "yyyy-mm-dd hh:nn:ss.999"), Dimensions:"", Metrics:metric.Name, Resolution:_this.Resolution, omitDate:false, Filter:jarvis.visualisation.dashboard.globalfilter};
    queryOptions.push(_queryOptions);
    _queryOptions = {id:"primary_total", FromDate:jarvis.date.formatDate(startdate, "yyyy-mm-dd hh:nn:ss.000"), ToDate:jarvis.date.formatDate(enddate, "yyyy-mm-dd hh:nn:ss.999"), Dimensions:"", Metrics:metric.Name, Resolution:_this.Resolution, omitDate:true, Filter:jarvis.visualisation.dashboard.globalfilter};
    queryOptions.push(_queryOptions);
    if(_this.DateBox.comparePeriod) {
      _queryOptions = {id:"compare_primary", FromDate:jarvis.date.formatDate(compare_startdate, "yyyy-mm-dd hh:nn:ss.000"), ToDate:jarvis.date.formatDate(compare_enddate, "yyyy-mm-dd hh:nn:ss.999"), Dimensions:"", Metrics:metric.Name, Resolution:_this.Resolution, omitDate:false, Filter:jarvis.visualisation.dashboard.globalfilter};
      queryOptions.push(_queryOptions);
      _queryOptions = {id:"compare_primary_total", FromDate:jarvis.date.formatDate(compare_startdate, "yyyy-mm-dd hh:nn:ss.000"), ToDate:jarvis.date.formatDate(compare_enddate, "yyyy-mm-dd hh:nn:ss.999"), Dimensions:"", Metrics:metric.Name, Resolution:_this.Resolution, omitDate:true, Filter:jarvis.visualisation.dashboard.globalfilter};
      queryOptions.push(_queryOptions)
    }
    if(jarvis.visualisation.dashboard.globalfilter && jarvis.visualisation.dashboard.globalfilter != "") {
      var _queryOptions = {id:"total", FromDate:jarvis.date.formatDate(startdate, "yyyy-mm-dd hh:nn:ss.000"), ToDate:jarvis.date.formatDate(enddate, "yyyy-mm-dd hh:nn:ss.999"), Dimensions:"", Metrics:metric.Name, Resolution:_this.Resolution, omitDate:false, Filter:""};
      queryOptions.push(_queryOptions)
    }
    if(_this.DateBox.comparePeriod && jarvis.visualisation.dashboard.globalfilter && jarvis.visualisation.dashboard.globalfilter != "") {
      _queryOptions = {id:"compare_total", FromDate:jarvis.date.formatDate(compare_startdate, "yyyy-mm-dd hh:nn:ss.000"), ToDate:jarvis.date.formatDate(compare_enddate, "yyyy-mm-dd hh:nn:ss.999"), Dimensions:"", Metrics:metric.Name, Resolution:_this.Resolution, omitDate:false, Filter:""};
      queryOptions.push(_queryOptions)
    }
    jarvis.dataaccess.multifetch(_this, "/engine/Query.svc/fetch", queryOptions, function(sender, data, error) {
      var series = [];
      $(data).each(function(index, item) {
        try {
          if(item.id == "primary" || item.id == "compare_primary") {
            var result = item.data.Result;
            var request = item.data.Request;
            var _data = item.data.Result.Rows;
            var points = {total:0, ftotal:0, data:[], id:data.id};
            $(_data).each(function(i, row) {
              var point = {value:row.Values[1], fvalue:row.FormattedValues[1]};
              points.total += parseFloat(point.value);
              points.data.push(point)
            });
            if(metric.AggregationType == "AVG") {
              points.avg = points.total / _data.length
            }
            $(data).each(function(i, o) {
              if(o.id.indexOf(item.id + "_total") == 0) {
                var _data = o.data.Result.Rows;
                $(_data[0]).each(function(i, row) {
                  points.total = parseFloat(row.Values[0])
                })
              }
            });
            series.push(points)
          }
        }catch(ex) {
        }
      });
      $(container).off("click");
      $(container).on("click", function() {
        $(jarvis).trigger("jarvis-dashboard-metricbox-click", [metric])
      });
      if(_this.DateBox.comparePeriod == false) {
        _this.update(sender, metric, series, container)
      }else {
        _this.updateCompare(sender, metric, series, container)
      }
    })
  })
};
jarvis.visualisation.dashboard.MetricBox.prototype.update = function(sender, metric, series, container) {
  var _this = sender;
  if(!series[0]) {
    return
  }
  $(series).each(function(si, so) {
    if(metric.DataType == "INT") {
      so.ftotal = jarvis.string.formatNumber(so.total, 0, true)
    }else {
      if(metric.DataType == "FLOAT") {
        so.ftotal = jarvis.string.formatNumber(so.total, 0, true)
      }else {
        so.ftotal = jarvis.string.formatNumber(so.total, 0, true)
      }
    }
    if(metric.Suffix && metric.Suffix != "") {
      so.ftotal += metric.Suffix
    }
    if(metric.Prefix && metric.Prefix != "") {
      so.ftotal = metric.Prefix + so.ftotal
    }
  });
  $(series[0]).each(function(si, so) {
    $(container).find(".compare").hide();
    var $metric = $(container).find(".base");
    var dataTable = new google.visualization.DataTable;
    dataTable.addColumn("number");
    dataTable.addRows(so.data.length);
    var totalsum = so.total;
    $(so.data).each(function(i, row) {
      dataTable.setValue(i, 0, Math.round(parseFloat(row.value)))
    });
    var datebox = jarvis.visualisation.picker.DateBox;
    var ratio;
    if(metric.AggregationType == "AVG") {
      ratio = 0;
      if(series[0].total > 0) {
        ratio = percentageChange(series.length == 1 ? series[0].total : series[1].total, series[0].total)
      }
      if(series.length == 1) {
        $metric.find(".site").html('Overall Avg: <span class="summaryvalue">' + (metric.Suffix == "seconds" ? jarvis.string.intToTime(so.total) : so.ftotal) + "</span><br> (" + jarvis.string.formatNumber(ratio, 2) + "%)")
      }else {
        $metric.find(".site").html('% of Total: <span class="summaryvalue">' + jarvis.string.formatNumber(ratio, 2) + "%</span><br> (" + series[1].ftotal + ")")
      }
    }else {
      ratio = 100;
      if(totalsum > 0) {
        ratio = series[0].total / (series.length == 1 ? series[0].total : series[1].total) * 100
      }
      if(!jarvis.visualisation.dashboard.globalfilter || jarvis.visualisation.dashboard.globalfilter == "") {
        $metric.find(".site").html(jarvis.string.formatNumber(ratio, 0) + '% of Total <span class="summaryvalue"></span><br>(' + so.ftotal + ")")
      }else {
        $metric.find(".site").html('% of Total: <span class="summaryvalue">' + jarvis.string.formatNumber(ratio, 0) + "%</span><br> (" + series[1].ftotal + ")")
      }
    }
    if(totalsum > 1E6 || totalsum < -1E6) {
      totalsum = jarvis.string.shortenNumber(totalsum)
    }else {
      if(metric.DataType == "INT") {
        if(metric.Suffix == "seconds") {
          totalsum = jarvis.string.intToTime(series[0].total)
        }else {
          totalsum = jarvis.string.formatNumber(totalsum, 0, true)
        }
      }else {
        if(metric.DataType == "FLOAT") {
          totalsum = jarvis.string.formatNumber(totalsum, 0, true)
        }else {
          totalsum = jarvis.string.formatNumber(totalsum, 0, true)
        }
      }
    }
    if(metric.Suffix && metric.Suffix != "" && metric.Suffix != "seconds") {
      totalsum += metric.Suffix
    }
    if(metric.Prefix && metric.Prefix != "") {
      totalsum = metric.Prefix + totalsum
    }
    $metric.find(".daterange").html(datebox.formatDate(datebox.getDate().base_fromdate) + " - " + datebox.formatDate(datebox.getDate().base_todate));
    if(metric.AggregationType == "AVG" && metric.Suffix != "seconds") {
      so.avg = jarvis.string.formatNumber(so.avg, 2);
      if(metric.Suffix && metric.Suffix != "") {
        so.avg += metric.Suffix
      }
      if(metric.Prefix && metric.Prefix != "") {
        so.avg = metric.Prefix + so.avg
      }
      $metric.find(".value").html(so.avg)
    }else {
      $metric.find(".value").html(totalsum)
    }
    $metric.find(".value").attr("title", totalsum);
    $metric.find(".value").removeClass("negative");
    $metric.find(".value").removeClass("positive");
    try {
      if($($metric.find(".minichart")).length > 0) {
        var vis = new google.visualization.ImageChart($($metric.find(".minichart")).get(0));
        var goptions = {cht:"ls", chs:_this.options.minichart.width + "x" + _this.options.minichart.height, chco:"0077CC", chdlp:"b", chls:"2", chm:"B,E6F2FA,0,0,0", chxt:"", chxr:""};
        vis.draw(dataTable, goptions)
      }
    }catch(ex) {
      throw"(drawSpark) " + "Exception: " + ex.message;
    }
  })
};
jarvis.visualisation.dashboard.MetricBox.prototype.updateCompare = function(sender, metric, series, container) {
  var _this = sender;
  if(!series[0]) {
    return
  }
  var value = percentageChange(series[1].total, series[0].total);
  var _class = "neutral";
  if(metric.RatioDirection == -1 && Math.round(parseFloat(value)) < 0) {
    _class = "positive"
  }
  if(metric.RatioDirection == -1 && Math.round(parseFloat(value)) > 0) {
    _class = "negative"
  }
  if(metric.RatioDirection == 1 && Math.round(parseFloat(value)) > 0) {
    _class = "positive"
  }
  if(metric.RatioDirection == 1 && Math.round(parseFloat(value)) < 0) {
    _class = "negative"
  }
  $(series).each(function(si, so) {
    if(metric.DataType == "INT") {
      so.ftotal = jarvis.string.formatNumber(so.total, 0, true)
    }else {
      if(metric.DataType == "FLOAT") {
        so.ftotal = jarvis.string.formatNumber(so.total, 0, true)
      }else {
        so.ftotal = jarvis.string.formatNumber(so.total, 0, true)
      }
    }
    if(metric.Suffix && metric.Suffix != "") {
      so.ftotal += metric.Suffix
    }
    if(metric.Prefix && metric.Prefix != "") {
      so.ftotal = metric.Prefix + so.ftotal
    }
  });
  var $metric = $(container).find(".base");
  value = jarvis.string.formatNumber(value, 0) + "%";
  $metric.find(".value").html(value);
  $metric.find(".value").removeClass("negative").removeClass("positive");
  $metric.find(".value").addClass(_class);
  $metric.find(".site").html((metric.Suffix == "seconds" ? jarvis.string.intToTime(series[0].total) : series[0].ftotal) + " vs " + (metric.Suffix == "seconds" ? jarvis.string.intToTime(series[1].total) : series[1].ftotal))
};
jarvis.visualisation.dashboard.MetricBox.prototype.baseHTML = function(sender) {
  var _this = sender;
  var $html = $('<div class="wrapper"></div>');
  $html.append('<div class="row-fluid">' + '<div class="header">' + '<div class="settings"></div>' + '<div class="move"></div>' + "<h3>" + _this.title + "</h3>" + "</div>" + '<div class="content">' + '<div class="base">' + '<div class="daterange"></div>' + '<div class="value"></div>' + '<div class="minichart"></div>' + '<div class="site"></div>' + "</div>" + '<div class="compare" style="display:none;">' + '<div class="daterange"></div>' + '<div class="value"></div>' + '<div class="minichart"></div>' + 
  '<div class="site"></div>' + "</div>" + "</div>" + "" + "</div>");
  $();
  return $html
};
jarvis.visualisation.dashboard.MetricBox.prototype.draw = function(container) {
  var _this = this;
  var title = "TITLE";
  var dimensions = "DIMENSION";
  var metrics = this.default_subcaption;
  if($(container).attr("data-title")) {
    title = $(container).attr("data-title")
  }
  if($(container).attr("data-dimensions")) {
    dimensions = $(container).attr("data-dimensions")
  }
  if($(container).attr("data-metrics")) {
    metrics = $(container).attr("data-metrics")
  }
  _this.title = title;
  var $html = _this.baseHTML(_this);
  $(container).append($html)
};
jarvis.debug.log("INFO", "Jarvis.Visualisation.Dashboard.MetricBox", 6, "JS source loaded");
jarvis.provide("jarvis.visualisation.dashboard.Table");
jarvis.require("jarvis.debug");
jarvis.require("jarvis.date");
jarvis.require("jarvis.string");
jarvis.require("jarvis.visualisation.dashboard");
jarvis.visualisation.dashboard.Table = function(options) {
  var start = (new Date).getMilliseconds();
  this._this = this;
  this.options = options;
  this.key = "";
  this.initialized = false;
  this.gettingBackData = false;
  this.initialCallbacks = [];
  this.initialTimestamp = null;
  this.Resolution = "Day";
  this.containers = [];
  jarvis.objects.Dimensions.List();
  jarvis.objects.Metrics.List();
  var executionTime = (new Date).getMilliseconds() - start
};
jarvis.visualisation.dashboard.Table.prototype.init = function(options, container) {
  var _this = this;
  var start = (new Date).getMilliseconds();
  this.options = options;
  this.containers = this.containers || [];
  this.dimensions = [];
  this.metrics = [];
  this.DateBox = jarvis.visualisation.picker.DateBox;
  $(jarvis.realtime).bind("filterchange", function(e) {
  });
  var matchedContainers = null;
  if(container) {
    matchedContainers = $(container)
  }else {
    matchedContainers = $(".jarvis.dashboard.jtable")
  }
  if(matchedContainers.length == 0) {
    return
  }
  $(matchedContainers).each(function(index, item) {
    if(!$(this).parent().hasClass("prettyprint")) {
      jarvis.debug.log("INFO", "jarvis.visualisation.dashboard.Table", 6, "Applying to container ('" + this.id + "')");
      var _metrics = $(item).attr("data-metrics");
      if(!_metrics) {
        return
      }
      _this.itemCount = $(item).attr("data-limit");
      if(!_this.itemCount) {
        _this.itemCount = 10
      }
      _metrics = _metrics.split(",");
      $(_metrics).each(function(index, item) {
        _metrics[index] = $.trim(_metrics[index]);
        _this.metrics.push(_metrics[index])
      });
      $(jarvis.dataaccess.metrics).each(function(index, item) {
        if(_metrics.indexOf(item.Name) > -1) {
          _this.metrics[_metrics.indexOf(item.Name)] = item
        }
      });
      $(this).bind("data", function(evt, ret) {
        ret.data = $(this).data().data
      });
      $(this).bind("click", function(evt) {
        $(this).trigger("clicked", $(this).data().data)
      });
      $(jarvis.visualisation.report).bind("filter", function(filter) {
        _this.fetch(_this)
      });
      $(item).empty();
      _this.draw(item);
      _this.fetch(_this, item);
      $(this).find(".settings").off("click");
      $(this).find(".settings").on("click", function(e) {
        jarvis.getDashboard().showEditWidget({_this:jarvis.getDashboard(), container:jarvis.getDashboard().container, addNew:false, widgetID:$(item).attr("data-widgetid"), sender:_this, sendercontainer:item})
      });
      _this.containers.push(item)
    }
  });
  $(_this.DateBox).bind("datechange", function() {
    $(_this.containers).each(function(i, container) {
      _this.fetch(_this, container)
    })
  });
  var executionTime = (new Date).getMilliseconds() - start;
  jarvis.debug.log("INFO", "Jarvis.Visualisation.Realtime.MetricBox", 5, "...init (" + executionTime + "ms)")
};
jarvis.visualisation.dashboard.Table.prototype.fetch = function(sender, container) {
  var _this = sender;
  var startdate = jarvis.visualisation.picker.DateBox.getDate().base_fromdate;
  var enddate = jarvis.visualisation.picker.DateBox.getDate().base_todate;
  if(_this.DateBox.comparePeriod) {
    var compare_startdate = jarvis.visualisation.picker.DateBox.getDate().compare_fromdate;
    var compare_enddate = jarvis.visualisation.picker.DateBox.getDate().compare_todate
  }
  var _dimensions = $(container).attr("data-dimensions");
  var _dimensionslist = _dimensions;
  if(!_dimensions) {
    return""
  }
  var _itemCount = $(container).attr("data-limit");
  if(!_itemCount) {
    _itemCount = 10
  }
  _dimensions = _dimensions.split(",");
  $(_dimensions).each(function(index, item) {
    var dindex = -1;
    $(jarvis.dataaccess.dimensions).each(function(mi, mo) {
      if(mo.Name == $.trim(item)) {
        dindex = mi
      }
    });
    _dimensions[index] = jarvis.dataaccess.dimensions[dindex];
    _this.dimensions.push(_dimensions[index])
  });
  $(jarvis.dataaccess.dimensions).each(function(index, item) {
    if(_dimensions.indexOf(item.Name) > -1) {
      _this.dimensions[_dimensions.indexOf(item.Name)] = item
    }
  });
  var _metrics = $(container).attr("data-metrics");
  var _metricslist = _metrics;
  if(!_metrics) {
    return""
  }
  _metrics = _metrics.split(",");
  $(_metrics).each(function(index, item) {
    var mindex = -1;
    $(jarvis.dataaccess.metrics).each(function(mi, mo) {
      if(mo.Name == $.trim(item)) {
        mindex = mi
      }
    });
    _metrics[index] = jarvis.dataaccess.metrics[mindex];
    _this.metrics.push(_metrics[index])
  });
  $(jarvis.dataaccess.metrics).each(function(index, item) {
    if(_metrics.indexOf(item.Name) > -1) {
      _this.metrics[_metrics.indexOf(item.Name)] = item
    }
  });
  if(!_metrics) {
    return""
  }
  var queryOptions = [];
  var _queryOptions = {id:"primary", FromDate:jarvis.date.formatDate(startdate, "yyyy-mm-dd hh:nn:ss.000"), ToDate:jarvis.date.formatDate(enddate, "yyyy-mm-dd hh:nn:ss.999"), Dimensions:_dimensionslist, Metrics:_metricslist, Resolution:_this.Resolution, omitDate:true, Filter:jarvis.visualisation.dashboard.globalfilter, sortKey:_metrics[_metrics.length - 1].Name, sortDir:"DESC"};
  queryOptions.push(_queryOptions);
  if(_this.DateBox.comparePeriod) {
    _queryOptions = {id:"compare_primary", FromDate:jarvis.date.formatDate(compare_startdate, "yyyy-mm-dd hh:nn:ss.000"), ToDate:jarvis.date.formatDate(compare_enddate, "yyyy-mm-dd hh:nn:ss.999"), Dimensions:_dimensionslist, Metrics:_metricslist, Resolution:_this.Resolution, omitDate:true, Filter:jarvis.visualisation.dashboard.globalfilter, sortKey:_metrics[_metrics.length - 1].Name, sortDir:"DESC"};
    queryOptions.push(_queryOptions)
  }
  jarvis.dataaccess.multifetch(_this, "/engine/Query.svc/fetch", queryOptions, function(sender, data, error) {
    var series = [];
    $(data).each(function(index, item) {
      try {
        if(item.data.Result.Rows.length > _itemCount - 1) {
          var sum1 = 0;
          var sum2 = 0;
          var lastRow = clone(item.data.Result.Rows[item.data.Result.Rows.length - 1]);
          for(var i = _itemCount;i < item.data.Result.Rows.length;i++) {
            sum1 += parseFloat(item.data.Result.Rows[i].Values[1]);
            if(lastRow.Values.length > 2) {
              sum2 += parseFloat(item.data.Result.Rows[i].Values[2])
            }
          }
          lastRow.Values[0] = "Other";
          lastRow.FormattedValues[0] = "Other";
          lastRow.Values[1] = sum1;
          sum1 = jarvis.string.formatNumber(sum1, 0, true);
          if(item.data.Result.Columns[1].Prefix != "") {
            sum1 = item.data.Result.Columns[1].Prefix + sum1
          }
          if(item.data.Result.Columns[1].Suffix != "") {
            sum1 += item.data.Result.Columns[1].Suffix
          }
          lastRow.FormattedValues[1] = sum1;
          if(lastRow.Values.length > 2) {
            lastRow.Values[2] = sum2;
            sum2 = jarvis.string.formatNumber(sum2, 0, true);
            if(item.data.Result.Columns[2].Prefix != "") {
              sum2 = item.data.Result.Columns[2].Prefix + sum1
            }
            if(item.data.Result.Columns[2].Suffix != "") {
              sum2 += item.data.Result.Columns[2].Suffix
            }
            lastRow.FormattedValues[2] = sum2
          }
          item.data.Result.Rows.splice(_itemCount - 1, item.data.Result.Rows.length);
          item.data.Result.Rows.push(lastRow)
        }
        series.push(item.data.Result)
      }catch(ex) {
      }
    });
    if(_this.DateBox.comparePeriod == false) {
      _this.update(sender, _dimensions, _metrics, series, container)
    }else {
      _this.updateCompare(sender, _dimensions, _metrics, series, container)
    }
  })
};
jarvis.visualisation.dashboard.Table.prototype.update = function(sender, dimensions, metrics, series, container) {
  var _this = sender;
  if(!series[0]) {
    return
  }
  var $table = $($(container).find(".table"));
  $table.empty();
  var $tr = $("<tr></tr>");
  $(series[0].Columns).each(function(index, col) {
    var $th = $("<th>" + col.Name + "</th>");
    if(col.AggregationType) {
      $th.addClass("metric")
    }else {
      $th.addClass("dimension")
    }
    $tr.append($th)
  });
  $table.append($tr);
  $(series[0].Rows).each(function(index, row) {
    var $tr = $("<tr></tr>");
    $(row.FormattedValues).each(function(i, v) {
      var $td = $("<td>" + v + "</td>");
      if(series[0].Columns[i].AggregationType) {
        $td.addClass("metric")
      }else {
        $td.addClass("dimension")
      }
      $tr.append($td)
    });
    $table.append($tr)
  })
};
jarvis.visualisation.dashboard.Table.prototype.updateCompare = function(sender, dimensions, metrics, series, container) {
  var _this = sender;
  if(!series[0]) {
    return
  }
  var datebox = _this.DateBox;
  var $table = $($(container).find(".table"));
  $table.empty();
  var $tr = $("<tr></tr>");
  $(series[0].Columns).each(function(index, col) {
    var $th = $("<th>" + col.Name + "</th>");
    if(col.AggregationType) {
      $th.addClass("metric")
    }else {
      $th.addClass("dimension")
    }
    $tr.append($th)
  });
  $table.append($tr);
  $(series[0].Rows).each(function(index, row) {
    var $tr = $("<tr></tr>");
    var lookupdimension = "";
    var base_value = 0;
    var compare_value = 0;
    $(row.Values).each(function(i, v) {
      if(series[0].Columns[i].AggregationType) {
        var $td;
        base_value = v;
        $(series[1].Rows).each(function(compareindex, comparerow) {
          if(comparerow.FormattedValues[0] == lookupdimension) {
            compare_value = comparerow.Values[i]
          }
        });
        if(compare_value > 0) {
          var ratio = percentageChange(compare_value, base_value);
          ratio = jarvis.string.formatNumber(ratio, 2);
          $td = $("<td>" + ratio + "%</td>");
          $td.addClass("metric strong");
          var _class = "";
          var metric = series[0].Columns[i];
          if(metric.RatioDirection == -1 && ratio < 0) {
            _class = "positive"
          }
          if(metric.RatioDirection == -1 && ratio > 0) {
            _class = "negative"
          }
          if(metric.RatioDirection == 1 && ratio > 0) {
            _class = "positive"
          }
          if(metric.RatioDirection == 1 && ratio < 0) {
            _class = "negative"
          }
          if(_class == "") {
            _class = "neutral"
          }
          $td.addClass(_class)
        }else {
          $td = $("<td>N/A</td>");
          $td.addClass("metric");
          var _class = "neutral";
          $td.addClass(_class)
        }
      }else {
        var $td = $('<td><div class="">' + v + "</div></td>");
        lookupdimension = v;
        var base_value = row.FormattedValues[1];
        var compare_value = 0;
        $(series[1].Rows).each(function(compareindex, comparerow) {
          if(comparerow.FormattedValues[0] == lookupdimension) {
            compare_value = comparerow.FormattedValues[1]
          }
        });
        $td.append('<div class="values">' + compare_value + " vs " + base_value + "</div>");
        $td.addClass("dimension")
      }
      $tr.append($td)
    });
    $table.append($tr)
  })
};
jarvis.visualisation.dashboard.Table.prototype.draw = function(container) {
  var _this = this;
  var title = "Widget Title";
  var dimensions = "DIMENSION";
  var metrics = this.default_subcaption;
  if($(container).attr("data-title")) {
    title = $(container).attr("data-title")
  }
  if($(container).attr("data-dimensions")) {
    dimensions = $(container).attr("data-dimensions")
  }
  if($(container).attr("data-metrics")) {
    metrics = $(container).attr("data-metrics")
  }
  var $html = $('<div class="wrapper"></div>');
  $html.append('<div class="row-fluid">' + '<div class="header">' + '<div class="settings"></div>' + '<div class="move"></div>' + "<h3>" + title + "</h3>" + "</div>" + '<div class="content">' + '<table class="table table-striped widgettable"></table>' + "</div>" + "</div>");
  $();
  $(container).append($html)
};
jarvis.debug.log("INFO", "Jarvis.Visualisation.Dashboard.BarTable", 6, "JS source loaded");
jarvis.provide("jarvis.visualisation.dashboard.Pie");
jarvis.require("jarvis.debug");
jarvis.require("jarvis.date");
jarvis.require("jarvis.string");
jarvis.require("jarvis.visualisation.dashboard");
jarvis.visualisation.dashboard.Pie = function(options) {
  var start = (new Date).getMilliseconds();
  this._this = this;
  this.options = options;
  this.default_caption = "Right now";
  this.default_subcaption = "Events per Second";
  this.default_useAverage = true;
  this.key = "";
  this.itemCount = 10;
  this.initialized = false;
  this.gettingBackData = false;
  this.initialCallbacks = [];
  this.initialTimestamp = null;
  this.Resolution = "Day";
  this.containers = [];
  jarvis.objects.Dimensions.List();
  jarvis.objects.Metrics.List();
  var executionTime = (new Date).getMilliseconds() - start
};
jarvis.visualisation.dashboard.Pie.prototype.init = function(options, container) {
  var _this = this;
  var start = (new Date).getMilliseconds();
  this._this = this;
  this.options = $.extend({legend:true}, options);
  this.containers = this.containers || [];
  this.dimensions = [];
  this.metrics = [];
  this.DateBox = jarvis.visualisation.picker.DateBox;
  var matchedContainers = null;
  if(container) {
    matchedContainers = $(container)
  }else {
    matchedContainers = $(".jarvis.dashboard.pie")
  }
  if(matchedContainers.length == 0) {
    return
  }
  $(matchedContainers).each(function(index, item) {
    if(!$(this).parent().hasClass("prettyprint")) {
      jarvis.debug.log("INFO", "jarvis.visualisation.dashboard.Pie", 6, "Applying to container ('" + this.id + "')");
      var _legend = $(item).attr("data-legend");
      if(_legend) {
        _this.options.legend = eval(_legend)
      }
      var _itemcount = $(item).attr("data-limit");
      if(_itemcount) {
        _this.itemCount = _itemcount
      }
      var _metrics = $(item).attr("data-metrics");
      if(!_metrics) {
        return
      }
      _metrics = _metrics.split(",");
      $(_metrics).each(function(index, item) {
        _metrics[index] = $.trim(_metrics[index]);
        _this.metrics.push(_metrics[index])
      });
      $(jarvis.dataaccess.metrics).each(function(index, item) {
        if(_metrics.indexOf(item.Name) > -1) {
          _this.metrics[_metrics.indexOf(item.Name)] = item
        }
      });
      $(this).bind("data", function(evt, ret) {
        ret.data = $(this).data().data
      });
      $(this).bind("click", function(evt) {
        $(this).trigger("clicked", $(this).data().data)
      });
      $(jarvis.visualisation.report).bind("filter", function(filter) {
        _this.fetch(_this)
      });
      $(item).empty();
      _this.draw(item);
      _this.fetch(_this, item);
      $(this).find(".settings").off("click");
      $(this).find(".settings").on("click", function(e) {
        jarvis.getDashboard().showEditWidget({_this:jarvis.getDashboard(), container:jarvis.getDashboard().container, addNew:false, widgetID:$(item).attr("data-widgetid"), sender:_this, sendercontainer:item})
      });
      _this.containers.push(item)
    }
  });
  $(_this.DateBox).bind("datechange", function() {
    $(_this.containers).each(function(i, container) {
      _this.fetch(_this, container)
    })
  });
  var executionTime = (new Date).getMilliseconds() - start;
  jarvis.debug.log("INFO", "Jarvis.Dashboard.Visualisation.Pie", 5, "...init (" + executionTime + "ms)")
};
jarvis.visualisation.dashboard.Pie.prototype.fetch = function(sender, container) {
  if(!sender) {
    sender = jarvis.visualisation.dashboard.Pie
  }
  var _this = sender;
  var startdate = jarvis.visualisation.picker.DateBox.getDate().base_fromdate;
  var enddate = jarvis.visualisation.picker.DateBox.getDate().base_todate;
  if(_this.DateBox.comparePeriod) {
    var compare_startdate = jarvis.visualisation.picker.DateBox.getDate().compare_fromdate;
    var compare_enddate = jarvis.visualisation.picker.DateBox.getDate().compare_todate
  }
  var _dimensions = $(container).attr("data-dimensions");
  var _dimensionslist = _dimensions;
  if(!_dimensions) {
    return""
  }
  _dimensions = _dimensions.split(",");
  $(_dimensions).each(function(index, item) {
    var dindex = -1;
    $(jarvis.dataaccess.dimensions).each(function(mi, mo) {
      if(mo.Name == $.trim(item)) {
        dindex = mi
      }
    });
    _dimensions[index] = jarvis.dataaccess.dimensions[dindex];
    _this.dimensions.push(_dimensions[index])
  });
  $(jarvis.dataaccess.dimensions).each(function(index, item) {
    if(_dimensions.indexOf(item.Name) > -1) {
      _this.dimensions[_dimensions.indexOf(item.Name)] = item
    }
  });
  var _metrics = $(container).attr("data-metrics");
  var _metricslist = _metrics;
  if(!_metrics) {
    return""
  }
  _metrics = _metrics.split(",");
  $(_metrics).each(function(index, item) {
    var mindex = -1;
    $(jarvis.dataaccess.metrics).each(function(mi, mo) {
      if(mo.Name == $.trim(item)) {
        mindex = mi
      }
    });
    _metrics[index] = jarvis.dataaccess.metrics[mindex];
    _this.metrics.push(_metrics[index])
  });
  $(jarvis.dataaccess.metrics).each(function(index, item) {
    if(_metrics.indexOf(item.Name) > -1) {
      _this.metrics[_metrics.indexOf(item.Name)] = item
    }
  });
  if(!_metrics) {
    return""
  }
  var queryOptions = [];
  var _queryOptions = {id:"primary", FromDate:jarvis.date.formatDate(startdate, "yyyy-mm-dd hh:nn:ss.000"), ToDate:jarvis.date.formatDate(enddate, "yyyy-mm-dd hh:nn:ss.999"), Dimensions:_dimensionslist, Metrics:_metricslist, Resolution:_this.Resolution, omitDate:true, Filter:jarvis.visualisation.dashboard.globalfilter, sortKey:_metrics[_metrics.length - 1].Name, sortDir:"DESC"};
  queryOptions.push(_queryOptions);
  if(_this.DateBox.comparePeriod) {
    _queryOptions = {id:"compare_primary", FromDate:jarvis.date.formatDate(compare_startdate, "yyyy-mm-dd hh:nn:ss.000"), ToDate:jarvis.date.formatDate(compare_enddate, "yyyy-mm-dd hh:nn:ss.999"), Dimensions:_dimensionslist, Metrics:_metricslist, Resolution:_this.Resolution, omitDate:true, Filter:jarvis.visualisation.dashboard.globalfilter, sortKey:_metrics[_metrics.length - 1].Name, sortDir:"DESC"};
    queryOptions.push(_queryOptions)
  }
  jarvis.dataaccess.multifetch(_this, "/engine/Query.svc/fetch", queryOptions, function(sender, data, error) {
    var series = [];
    $(data).each(function(index, item) {
      try {
        var result = item.data.Result;
        var request = item.data.Request;
        var _data = item.data.Result.Rows;
        series.push(item.data.Result)
      }catch(ex) {
      }
    });
    _this.update(sender, _dimensions, _metrics, series, container)
  })
};
jarvis.visualisation.dashboard.Pie.prototype.update = function(sender, dimensions, metrics, series, container) {
  var _this = sender;
  if(!series[0]) {
    return
  }
  var _itemcount = $(container).attr("data-limit");
  if(_itemcount) {
    _this.itemCount = _itemcount
  }
  var $container = $($(container).find(".piechart"));
  var columns = series[0].Columns;
  var data = series[0].Rows;
  var _totalsum = 0;
  $(data).each(function(index, row) {
    _totalsum += parseFloat(row.Values[row.Values.length - 1])
  });
  var chart = new Highcharts.Chart({chart:{animation:false, renderTo:$container.get(0), backgroundColor:null, plotBackgroundColor:null, plotBorderWidth:null, plotShadow:false, type:"pie", width:"230", height:"230", marginTop:0, marginLeft:0, marginRight:5, marginBottom:0, spacingLeft:0, spacingTop:0, spacingRight:0, spacingBottom:0}, title:{text:null}, tooltip:{formatter:function() {
    return"<b>" + this.point.name + "</b><br/>" + this.series.name + ": " + jarvis.string.formatNumber(this.percentage, 2) + " %"
  }}, legend:{enabled:false}, credits:{enabled:false}, exporting:{enabled:false}, plotOptions:{pie:{showInLegend:true, size:"100%", animation:false}}, series:[{name:function() {
    var name = "";
    name = columns[columns.length - 1].Name;
    return name
  }(), type:"pie", data:function() {
    var result = [];
    var sum = 0;
    $(data).each(function(index, item) {
      if(index < _this.itemCount) {
        var name = "";
        $(columns).each(function(ci, co) {
          if(co.AggregationType) {
          }else {
            name += columns[ci].Name + ": " + item.FormattedValues[ci]
          }
        });
        name = name.substring(0, name.length - 5);
        var y = 0;
        y = item.Values[item.Values.length - 1] / _totalsum * 100;
        sum += y;
        result.push({name:name, y:y, color:jarvis.colors[index]})
      }
    });
    if(100 - Math.floor(sum) > 0) {
      var name = "Other";
      var y = 100 - sum;
      result.push({name:name, y:y, color:jarvis.colors[11]})
    }
    return result
  }(), dataLabels:{formatter:function() {
    return this.y > 5 ? this.point.name : null
  }, color:"white", distance:-30, enabled:false}}, {name:function() {
    var name = "inner";
    name = columns[columns.length - 1].Name;
    return name
  }(), type:"pie", innerSize:"70%", data:function() {
    var result = [];
    if(series.length > 1) {
      var sum = 0;
      var _totalsum_compare = 0;
      var compare_data = series[1].Rows;
      $(compare_data).each(function(index, row) {
        _totalsum_compare += parseFloat(row.Values[row.Values.length - 1])
      });
      $(data).each(function(datai, datao) {
        if(datai < _this.itemCount) {
          var key = datao.FormattedValues[0];
          $(compare_data).each(function(index, item) {
            if(item.FormattedValues[0] == key) {
              var name = "";
              $(columns).each(function(ci, co) {
                if(co.AggregationType) {
                }else {
                  name += columns[ci].Name + ": " + item.FormattedValues[ci]
                }
              });
              var y = 0;
              y = item.Values[item.Values.length - 1] / _totalsum_compare * 100;
              sum += y;
              result.push({name:name, y:y})
            }
          })
        }
      });
      if(100 - Math.floor(sum) > 0) {
        var name = "Other";
        var y = 100 - sum;
        result.push({name:name, y:y, color:jarvis.colors[11]})
      }
    }
    return result
  }(), dataLabels:{formatter:function() {
    return this.y > 1 ? "<b>" + this.point.name + ":</b> " + this.y + "%" : null
  }, enabled:false}}]});
  var sum = 0;
  var result = [];
  var shownsum = 0;
  var totalsum = 0;
  $(data).each(function(index, item) {
    if(index < _this.itemCount) {
      var name = "";
      $(columns).each(function(ci, co) {
        if(co.AggregationType) {
        }else {
          name += item.FormattedValues[ci] + "<br/>"
        }
      });
      name = name.substring(0, name.length - 5);
      var y = 0;
      y = item.Values[item.Values.length - 1] / _totalsum * 100;
      sum += y;
      shownsum += parseFloat(item.Values[item.Values.length - 1]);
      result.push({seriesname:columns[columns.length - 1].Name, name:name, y:y, value:item.FormattedValues[item.Values.length - 1], color:jarvis.colors[index]})
    }
    totalsum += parseFloat(item.Values[item.Values.length - 1])
  });
  if(totalsum - shownsum > 0) {
    var name = "Other";
    var y = 100 - sum;
    result.push({name:name, y:y, color:jarvis.colors[11], value:jarvis.string.formatNumber(totalsum - shownsum, 0, true), seriesname:columns[columns.length - 1].Name})
  }
  var compare_shownsum = 0;
  var compare_totalsum = 0;
  if(_this.options.legend) {
    var $legend = $($(container).find(".legend"));
    $legend.empty();
    if(series.length > 1) {
      var compare_data = series[1].Rows;
      result = [];
      $(data).each(function(index, item) {
        if(index < _this.itemCount) {
          var key = item.FormattedValues[0];
          $(compare_data).each(function(cindex, citem) {
            if(citem.FormattedValues[0] == key) {
              var base_value = item.Values[1];
              var compare_value = citem.Values[1];
              var diff = percentageChange(compare_value, base_value);
              compare_shownsum += parseFloat(citem.Values[citem.Values.length - 1]);
              result.push({name:key, base:item.FormattedValues[1], compare:citem.FormattedValues[1], diff:diff})
            }
          })
        }
        compare_totalsum += parseFloat(item.Values[item.Values.length - 1])
      });
      $(result).each(function(index, item) {
        var _class = "";
        var metric = series[0].Columns[1];
        if(metric.RatioDirection == -1 && item.diff < 0) {
          _class = "positive"
        }
        if(metric.RatioDirection == -1 && item.diff > 0) {
          _class = "negative"
        }
        if(metric.RatioDirection == 1 && item.diff > 0) {
          _class = "positive"
        }
        if(metric.RatioDirection == 1 && item.diff < 0) {
          _class = "negative"
        }
        if(_class == "") {
          _class = "neutral"
        }
        var $div = $('<div class="legenditem"></div>');
        $div.append('<div class="caption"><div class="colorbox" style="background-color: ' + jarvis.colors[index] + '"></div>' + '<span class="' + _class + '">' + jarvis.string.formatNumber(item.diff, 2) + "%</span> " + item.name + "</div>" + '<div class="summary">' + item.base + " vs " + item.compare + "</div>" + "");
        $legend.append($div)
      })
    }else {
      $(result).each(function(index, item) {
        var $div = $('<div class="legenditem"></div>');
        $div.append('<div class="caption"><div class="colorbox" style="background-color: ' + item.color + '"></div>' + jarvis.string.formatNumber(item.y, 2) + "% " + item.name + "</div>" + '<div class="summary">' + item.value + " " + item.seriesname + "</div>" + "");
        $legend.append($div)
      })
    }
  }
};
jarvis.visualisation.dashboard.Pie.prototype.draw = function(container) {
  var _this = this;
  var title = "TITLE";
  var dimensions = "DIMENSION";
  var metrics = this.default_subcaption;
  if($(container).attr("data-title")) {
    title = $(container).attr("data-title")
  }
  if($(container).attr("data-dimensions")) {
    dimensions = $(container).attr("data-dimensions")
  }
  if($(container).attr("data-metrics")) {
    metrics = $(container).attr("data-metrics")
  }
  var $html = $('<div class="wrapper"></div>');
  if($($(container).parent()).attr("class").indexOf("span5") > -1) {
    $html.append('<div class="row-fluid">' + '<div class="header">' + '<div class="settings"></div>' + '<div class="move"></div>' + "<h3>" + title + "</h3>" + "</div>" + '<div class="content">' + '<table class="table" ><tr class="row row-fluid">' + '<td class="span6"><div class="piechart"></div></td>' + '<td class="span6"><div class="legend"></div></td>' + "</tr></table>" + "</div>" + "</div>")
  }else {
    $html.append('<div class="row-fluid">' + '<div class="header">' + '<div class="settings"></div>' + '<div class="move"></div>' + "<h3>" + title + "</h3>" + "</div>" + '<div class="content">' + '<table class="table" >' + '<tr class="row row-fluid"><td class="span12"><div class="piechart"></div></td></tr>' + '<tr class="row row-fluid"><td class="span12" style="padding-left:10px;"><div class="legend"></div></td></table>' + "</table>" + "</div>" + "</div>")
  }
  $(container).append($html)
};
jarvis.debug.log("INFO", "Jarvis.Dashboard.Visualisation.Pie", 6, "JS source loaded");
jarvis.provide("jarvis.visualisation.dashboard.Panel");
jarvis.require("jarvis.debug");
jarvis.require("jarvis.date");
jarvis.require("jarvis.string");
jarvis.require("jarvis.visualisation.dashboard");
jarvis.visualisation.dashboard.Panel = function(options) {
  jarvis.debug.log("INFO", "jarvis.visualisation.dashboard.Panel", 6, "Creating Dashboard Panel Object...");
  var start = (new Date).getMilliseconds();
  var _this = this;
  this._this = this;
  this.options = $.extend({widgets:{timeline:{height:235}, metricbox:{minichart:{height:18, width:75}}, pie:{legend:false}}}, options);
  jarvis.visualisation.dashboard.panelFilter = "";
  this.panelID = -1;
  try {
    this.panelID = options.panelID
  }catch(e) {
  }
  if(this.panelID == -1) {
    try {
      this.panelID = jarvis.objects.Dashboards[0].ID
    }catch(e) {
      this.panelID = -1
    }
  }
  jarvis.objects.Dashboards.List();
  jarvis.objects.Dimensions.List();
  jarvis.objects.Metrics.List();
  jarvis.setDashboard(this);
  this.containers = [];
  var $addwidgetbutton = $("body").find(".widget-add");
  $addwidgetbutton.show();
  $(jarvis.dashboard).bind("filter", function(e) {
    jarvis.debug.log("INFO", "Dashboard.Visualisation.Panel", 6, "Applying Filter");
    matchedContainers = $(".jarvis.dashboard.widgets");
    _this.setDisplay();
    _this.init(_this, matchedContainers, true, true);
    _this.drawWidgets(_this, $(".jarvis.dashboard.widgets"), true, true)
  });
  matchedContainers = $(".jarvis.dashboard.panel");
  this.container = matchedContainers;
  this.containers.push(this.container);
  jarvis.visualisation.dashboard.panel = this;
  var executionTime = (new Date).getMilliseconds() - start;
  return _this
};
jarvis.visualisation.dashboard.Panel.prototype.dispose = function() {
  jarvis.debug.log("INFO", "jarvis.visualisation.dashboard.Panel", 6, "Disposing");
  $(".jarvis.dashboard.column-left, .jarvis.dashboard.column-mid, .jarvis.dashboard.column-right").empty();
  $(".jarvis.dashboard.widgets").empty()
};
jarvis.visualisation.dashboard.Panel.prototype.init = function(options, container, drawWidgets, breakBindLoop, saveState) {
  var _this = this;
  try {
    if(options.panelID > -1) {
      _this.panelID = options.panelID
    }else {
      if(_this.panelID == -1) {
        _this.panelID = options.panelID
      }
    }
  }catch(e) {
  }
  if(_this.panelID == -1) {
    _this.panelID = jarvis.objects.Dashboards[0].ID
  }
  jarvis.debug.log("INFO", "jarvis.visualisation.dashboard.Panel", 6, "Building panel for ID ('" + _this.panelID + "')");
  _this.setDisplay();
  _this.panel = _this.get(_this, _this.panelID);
  if(!this.panel) {
    throw"failed to locate panel";return
  }
  if(typeof saveState == "undefined" || saveState == true) {
    jarvis.state.view = "dashboard";
    jarvis.state.dashboardID = _this.panelID;
    jarvis.saveState("Dashboard Panel Init")
  }
  var matchedContainers = null;
  if(container) {
    matchedContainers = $(container)
  }else {
    matchedContainers = $(".jarvis.dashboard.widgets")
  }
  if(matchedContainers.length == 0) {
    throw"failed to locate panel";return
  }
  $(matchedContainers).each(function(index, item) {
    if(options == null) {
      options = new Object
    }
    options.panelID = _this.panelID;
    options.container = item;
    options._this = _this;
    _this.updateDisplay(options);
    _this.drawWidgets(_this, item, drawWidgets);
    jarvis.debug.log("INFO", "jarvis.visualisation.dashboard.Panel", 6, "Applying to container ('" + this.id + "')")
  });
  var $editbutton = $("body").find(".panel-edit");
  $editbutton.off("click");
  $editbutton.on("click", function(e) {
    _this.showEdit({container:matchedContainers, addNew:false, _this:_this})
  });
  var $addwidgetbutton = $("body").find(".widget-add");
  $addwidgetbutton.off("click");
  $addwidgetbutton.on("click", function(e) {
    _this.showEditWidget({container:matchedContainers, addNew:true, _this:_this})
  });
  return _this
};
jarvis.visualisation.dashboard.Panel.prototype.setDisplay = function() {
  $("body").find(".jarvis.report.panel").hide()
};
jarvis.visualisation.dashboard.Panel.prototype.drawWidgets = function(sender, container, redraw) {
  var _this = sender;
  var panel = _this.panel;
  var widgets = panel.Widgets;
  var _html = _this.baseHTML();
  $(container).empty();
  $(container).append(_html);
  $(".jarvis.dashboard.column-left, .jarvis.dashboard.column-mid, .jarvis.dashboard.column-right").sortable({connectWith:".columns", handle:".header", placeholder:{element:function(currentItem) {
    return $('<div class="droptarget">' + $(currentItem).attr("data-title") + "</div>")[0]
  }, update:function(container, p) {
  }}, update:function(e, p) {
    var parent = 1;
    if($(this).attr("class").indexOf("left") > -1) {
      parent = 1
    }else {
      if($(this).attr("class").indexOf("mid") > -1) {
        parent = 2
      }else {
        parent = 3
      }
    }
    $(this).children().each(function(i) {
      var widgetID = $(this).attr("data-widgetid");
      if($(this).attr("class").indexOf("pie") > -1) {
        (new jarvis.visualisation.dashboard.Pie).init(null, $(this))
      }
      if($(this).attr("class").indexOf("timeline") > -1) {
        (new jarvis.visualisation.dashboard.Timeline).init(null, $(this))
      }
      jarvis.dataaccess.fetch(this, "/engine/Dashboards.svc/UpdateWidgetPosition", {ID:widgetID, Column:parent, Ordinal:i + 1}, function(sender, data, error) {
        data = $.parseJSON(data.data)
      })
    })
  }, stop:function(event, ui) {
  }}).disableSelection();
  $(widgets).each(function(index, item) {
    jarvis.debug.log("INFO", "Jarvis.Dashboards.Visualisation.Panel", 6, "Drawing widget ('" + item.Name + "')");
    switch(item.Type) {
      case "Timeline":
        if(item.PrimaryMetric.Name == null) {
          break
        }
        var metricslist = item.PrimaryMetric.Name;
        if(item.SecondaryMetric && item.SecondaryMetric.Name != null && item.SecondaryMetric.Name != "") {
          metricslist += ", " + item.SecondaryMetric.Name
        }
        _html = '<div class="jarvis dashboard timeline widget" data-widgetid="' + item.ID + '" data-title="' + item.Name + '" data-metrics="' + metricslist + '" data-period="' + item.Period + '" data-limit="' + item.itemCount + '" data-height="' + _this.options.widgets.timeline.height + '"></div>';
        if(item.Column == 1) {
          $(container).find(".column-left").append(_html)
        }else {
          if(item.Column == 2) {
            $(container).find(".column-mid").append(_html)
          }else {
            $(container).find(".column-right").append(_html)
          }
        }
        break;
      case "Bar":
        if(item.PrimaryMetric.Name == null) {
          break
        }
        if(item.Dimension == null || item.Dimension.Name == null) {
          break
        }
        _html = '<div class="jarvis dashboard bar widget" data-widgetid="' + item.ID + '" data-title="' + item.Name + '" data-metrics="' + item.PrimaryMetric.Name + '" data-dimensions="' + item.Dimension.Name + '" data-period="' + item.Period + '" data-limit="' + item.itemCount + '" data-height="' + _this.options.widgets.timeline.height + '"></div>';
        if(item.Column == 1) {
          $(container).find(".column-left").append(_html)
        }else {
          if(item.Column == 2) {
            $(container).find(".column-mid").append(_html)
          }else {
            $(container).find(".column-right").append(_html)
          }
        }
        break;
      case "Metric Box":
        if(item.PrimaryMetric.Name == null) {
          break
        }
        _html = '<div class="jarvis dashboard metricbox widget" data-widgetid="' + item.ID + '" data-title="' + item.Name + '" data-dimensions="' + "" + '" data-metrics="' + item.PrimaryMetric.Name + '" data-period="' + item.Period + '" data-limit="' + item.itemCount + '" data-minichart-height="' + _this.options.widgets.metricbox.minichart.height + '" data-minichart-width="' + _this.options.widgets.metricbox.minichart.width + '"></div>';
        if(item.Column == 1) {
          $(container).find(".column-left").append(_html)
        }else {
          if(item.Column == 2) {
            $(container).find(".column-mid").append(_html)
          }else {
            $(container).find(".column-right").append(_html)
          }
        }
        break;
      case "Table":
        if(item.PrimaryMetric.Name == null) {
          break
        }
        if(item.Dimension == null || item.Dimension.Name == null) {
          break
        }
        var metricslist = item.PrimaryMetric.Name;
        if(item.SecondaryMetric && item.SecondaryMetric.Name != null && item.SecondaryMetric.Name != "") {
          metricslist += ", " + item.SecondaryMetric.Name
        }
        _html = '<div class="jarvis dashboard jtable widget" data-widgetid="' + item.ID + '" data-title="' + item.Name + '" data-dimensions="' + item.Dimension.Name + '" data-metrics="' + metricslist + '" data-period="' + item.Period + '" data-limit="' + item.itemCount + '"></div>';
        if(item.Column == 1) {
          $(container).find(".column-left").append(_html)
        }else {
          if(item.Column == 2) {
            $(container).find(".column-mid").append(_html)
          }else {
            $(container).find(".column-right").append(_html)
          }
        }
        break;
      case "BarTable":
        if(item.PrimaryMetric.Name == null) {
          break
        }
        if(item.Dimension == null || item.Dimension.Name == null) {
          break
        }
        var metricslist = item.PrimaryMetric.Name;
        if(item.SecondaryMetric && item.SecondaryMetric.Name != null && item.SecondaryMetric.Name != "") {
          metricslist += ", " + item.SecondaryMetric.Name
        }
        _html = '<div class="jarvis dashboard bartable widget" data-widgetid="' + item.ID + '" data-title="' + item.Name + '" data-dimensions="' + item.Dimension.Name + '" data-metrics="' + metricslist + '" data-period="' + item.Period + '" data-limit="' + item.itemCount + '"></div>';
        if(item.Column == 1) {
          $(container).find(".column-left").append(_html)
        }else {
          if(item.Column == 2) {
            $(container).find(".column-mid").append(_html)
          }else {
            $(container).find(".column-right").append(_html)
          }
        }
        break;
      case "Pie Chart":
        if(item.PrimaryMetric.Name == null) {
          break
        }
        if(item.Dimension == null || item.Dimension.Name == null) {
          break
        }
        _html = '<div class="jarvis dashboard pie widget" data-widgetid="' + item.ID + '" data-title="' + item.Name + '" data-dimensions="' + item.Dimension.Name + '" data-metrics="' + item.PrimaryMetric.Name + '" data-period="' + item.Period + '" data-limit="' + item.itemCount + '" data-legend="' + _this.options.widgets.pie.legend + '"></div>';
        if(item.Column == 1) {
          $(container).find(".column-left").append(_html)
        }else {
          if(item.Column == 2) {
            $(container).find(".column-mid").append(_html)
          }else {
            $(container).find(".column-right").append(_html)
          }
        }
      ;
      default:
        break
    }
  });
  if(redraw == true) {
    jarvis.debug.log("INFO", "Jarvis.Dashboards.Visualisation.Panel", 6, "Redraw");
    (new jarvis.visualisation.dashboard.MetricBox).init();
    (new jarvis.visualisation.dashboard.Timeline).init();
    (new jarvis.visualisation.dashboard.Table).init();
    (new jarvis.visualisation.dashboard.Pie).init();
    (new jarvis.visualisation.dashboard.Bar).init();
    (new jarvis.visualisation.dashboard.BarTable).init();
    $(jarvis).trigger("jarvis-dashboard-draw")
  }
};
jarvis.visualisation.dashboard.Panel.prototype.baseHTML = function(sender) {
  var _this = sender;
  var _html = "";
  _html = '<div class="jarvis realtime row-top row fluid-row">' + "</div>";
  _html += '<div class="row fluid-row">' + '<div class="jarvis dashboard column-left span3 columns ">&nbsp;' + "</div>" + '<div class="jarvis dashboard column-mid span5 columns">&nbsp;' + "</div>" + '<div class="jarvis dashboard column-right span4 columns ">&nbsp;' + "</div>" + "</div>";
  return _html
};
jarvis.visualisation.dashboard.Panel.prototype.show = function(sender) {
  $(".jarvis.dashboard.panel").show()
};
jarvis.visualisation.dashboard.Panel.prototype.hide = function(sender) {
  $(".jarvis.dashboard.panel").hide()
};
jarvis.visualisation.dashboard.Panel.prototype.get = function(sender, id) {
  if(id == -1) {
    return
  }
  var data = jarvis.objects.Dashboards.Get(null, {id:id});
  sender.panelID = data.ID;
  return data
};
jarvis.visualisation.dashboard.Panel.prototype.updateDisplay = function(options) {
  var $container = $(options.container);
  var data = options._this.panel;
  $("body").find(".jarvis.caption").text(data.Name).trigger("contentchange");
  $("body").find(".jarvis.description").text(data.Description).trigger("contentchange");
  if($("body").attr("class")) {
    if(!$("body").attr("class").indexOf(data.Name)) {
      $("body").addClass(data.Name)
    }
  }else {
    $("body").addClass(data.Name)
  }
};
jarvis.visualisation.dashboard.Panel.prototype.showEdit = function(options) {
  var _this = options._this;
  var $container = $(options.container);
  var addnew = options.addNew;
  var _html = "";
  _html += "";
  _html += '<div class="panel-modal modal" style="left:50%;">';
  _html += '<div class="modal-header">';
  _html += '<a type="button" class="close" data-dismiss="modal">\u00d7</a>';
  if(options.addNew == true) {
    _html += "<h3>Add a new Dashboard Panel</h3>";
    _html += "</div>";
    _html += '<div class="modal-body" style="padding:30px;padding-bottom: 0;">';
    _html += '<form class="form-horizontal">';
    _html += "<fieldset>";
    _html += '<div class="control-group">' + '<label class="control-label" for="panel-edit-name">Name</label>' + '<div class="controls">' + '<input type="text" class="input-xlarge" id="panel-edit-name" placeholder="Enter a name for the new Dashboard">' + "</div>" + "</div>";
    _html += '<div class="control-group">' + '<label class="control-label" for="panel-edit-description">Description</label>' + '<div class="controls">' + '<textarea class="input-xlarge" id="panel-edit-description" rows="3" placeholder="Describe the new Dashboard with a few words."></textarea>' + "</div>" + "</div>";
    _html += "</fieldset>";
    _html += "</form>";
    _html += "</div>";
    _html += '<div class="modal-footer">';
    _html += '<a class="btn" data-dismiss="modal">Close</a>';
    _html += '<a class="btn btn-primary panel-edit-save">Save changes</a>'
  }else {
    var panel = _this.panel;
    _html += "<h3>Customize Dashboard Panel</h3>";
    _html += "</div>";
    _html += '<div class="modal-body" style="padding:30px;padding-bottom: 0;">';
    _html += '<form class="form-horizontal">';
    _html += "<fieldset>";
    _html += '<div class="control-group">' + '<label class="control-label" for="panel-edit-name">Name</label>' + '<div class="controls">' + '<input type="text" class="input-xlarge" id="panel-edit-name" value="' + panel.Name + '">' + "</div>" + "</div>";
    _html += '<div class="control-group">' + '<label class="control-label" for="panel-edit-description">Description</label>' + '<div class="controls">' + '<textarea class="input-xlarge" id="panel-edit-description" rows="3">' + panel.Description + "</textarea>" + "</div>" + "</div>";
    _html += "</fieldset>";
    _html += "</form>";
    _html += "</div>";
    _html += '<div class="modal-footer">';
    _html += '<a class="panel-edit-delete" style="cursor:pointer;float:left;margin-top:5px;">Delete</a>';
    _html += '<a class="btn" data-dismiss="modal">Close</a>';
    _html += '<a class="btn btn-primary panel-edit-save">Save changes</a>'
  }
  _html += "</div>";
  _html += "</div>";
  var $modal = $(_html);
  $("body").append($modal);
  $modal.modal();
  $modal.find(".panel-edit-delete").off("click");
  $modal.find(".panel-edit-delete").on("click", function(e) {
    jarvis.dataaccess.fetch(this, "/engine/Dashboards.svc/Delete", {ID:_this.panelID}, function(sender, data, error) {
      data = $.parseJSON(data.data);
      jarvis.objects.Dashboards.List(null, null, null, true);
      buildContentMenu_Dashboards();
      _this.panelID = jarvis.objects.Dashboards[0].ID;
      _this.init(null, null, true);
      $modal.modal("hide")
    })
  });
  $modal.find(".panel-edit-save").off("click");
  $modal.find(".panel-edit-save").on("click", function(e) {
    var name = "";
    var description = "";
    name = $modal.find("#panel-edit-name").val();
    description = $modal.find("#panel-edit-description").val();
    var panelID = -1;
    if(!addnew) {
      panelID = _this.panelID
    }
    jarvis.dataaccess.fetch(this, "/engine/Dashboards.svc/Update", {ID:panelID, Name:name, Description:description}, function(sender, data, error) {
      data = $.parseJSON(data.data);
      var matchedContainers = $(".jarvis.dashboard.widgets");
      options = new Object;
      _this.panelID = data;
      _this.init(null, matchedContainers, true);
      jarvis.objects.Dashboards.List(null, null, null, true);
      buildContentMenu_Dashboards();
      $modal.modal("hide")
    })
  });
  $modal.on("hidden", function() {
    $modal.remove()
  })
};
jarvis.visualisation.dashboard.Panel.prototype.generateSettings = function(type, widget) {
  var _html = "";
  var dimension = "";
  var metric = "";
  var secondaryMetric = "";
  if(widget) {
    if(widget.Dimension) {
      dimension = widget.Dimension.Name
    }
    metric = widget.PrimaryMetric.Name;
    if(widget.SecondaryMetric) {
      secondaryMetric = widget.SecondaryMetric.Name
    }
  }
  if(type == "Table" || type == "Pie Chart") {
    _html += '<div class="control-group">' + '<label class="control-label" for="widget-edit-dimension">Dimension</label>' + '<div class="controls">' + '<select id="widget-edit-dimension">';
    var dimensions = jarvis.objects.Dimensions;
    $(dimensions).each(function(index, item) {
      _html += '<option value="' + item.Id + '" ' + (dimension == item.Name ? "selected" : "") + " >" + item.Name + "</option>"
    });
    _html += "</select>" + "</div>" + "</div>"
  }
  _html += '<div class="control-group">' + '<label class="control-label" for="widget-edit-metric">Metric</label>' + '<div class="controls">' + '<select id="widget-edit-metric">';
  var metrics = jarvis.objects.Metrics;
  $(metrics).each(function(index, item) {
    _html += '<option value="' + item.Id + '" ' + (metric == item.Name ? "selected" : "") + ">" + item.Name + "</option>"
  });
  _html += "</select>" + "</div>" + "</div>";
  if(type == "Table" || type == "Timeline") {
    _html += '<div class="control-group">' + '<label class="control-label" for="widget-edit-secondarymetric">Secondary Metric</label>' + '<div class="controls">' + '<select id="widget-edit-secondarymetric">' + '<option value="-1">Please select</option>';
    var metrics = jarvis.objects.Metrics;
    $(metrics).each(function(index, item) {
      _html += '<option value="' + item.Id + '" ' + (secondaryMetric == item.Name ? "selected" : "") + ">" + item.Name + "</option>"
    });
    _html += "</select>" + "</div>" + "</div>"
  }
  if(type == "Table") {
    _html += '<div class="control-group">' + '<label class="control-label" for="widget-edit-limit">Show a Table with</label>' + '<div class="controls">' + '<select id="widget-edit-limit">' + "<option value=5>5 rows</option>" + "<option value=6>6 rows</option>" + "<option value=7>7 rows</option>" + "<option value=8>8 rows</option>" + "<option value=9>9 rows</option>" + "<option value=10 selected>10 rows</option>" + "</select>" + "</div>" + "</div>"
  }
  if(type == "Pie Chart") {
    _html += '<div class="control-group">' + '<label class="control-label" for="widget-edit-limit">Show up to</label>' + '<div class="controls">' + '<select id="widget-edit-limit">' + "<option value=3>3 slices</option>" + "<option value=4>4 slices</option>" + "<option value=5>5 slices</option>" + "<option value=6 selected>6 slices</option>" + "</select>" + "</div>" + "</div>"
  }
  return _html
};
jarvis.visualisation.dashboard.Panel.prototype.showEditWidget = function(options) {
  var _this = options._this;
  var $container = $(options.container);
  var addnew = options.addNew;
  var widgetID = -1;
  var column = -1;
  var ordinal = -1;
  var widgetType = "Table";
  var _html = "";
  _html += "";
  _html += '<div class="widget-modal modal" style="left:50%;">';
  _html += '<div class="modal-header">';
  _html += '<a type="button" class="close" data-dismiss="modal">\u00d7</a>';
  if(options.addNew == true) {
    _html += "<h3>Add a new Dashboard Widget</h3>";
    _html += "</div>";
    _html += '<div class="modal-body" style="padding:30px;padding-bottom: 0;">';
    _html += '<form class="form-horizontal">';
    _html += "<fieldset>";
    _html += '<div class="control-group">' + '<label class="control-label" for="widget-edit-name">Caption</label>' + '<div class="controls">' + '<input type="text" class="input-xlarge" id="widget-edit-name" placeholder="Enter a caption for the new Widget">' + "</div>" + "</div>";
    _html += '<div class="control-group">' + '<label class="control-label" for="widget-edit-type">Type</label>' + '<div class="controls">' + '<select id="widget-edit-type">' + '<option value="Metric Box" ' + (widgetType == "Metric Box" ? "selected" : "") + ">Metric Box</option>" + '<option value="Table" ' + (widgetType == "Table" ? "selected" : "") + ">Table</option>" + '<option value="Pie Chart" ' + (widgetType == "Pie Chart" ? "selected" : "") + ">Pie Chart</option>" + '<option value="Timeline" ' + 
    (widgetType == "Timeline" ? "selected" : "") + ">Timeline</option>" + "</select>" + "</div>" + "</div>";
    _html += "<hr>";
    _html += '<div class="specificsettings">';
    _html += _this.generateSettings(widgetType, null);
    _html += "</div>";
    _html += "</fieldset>";
    _html += "</form>";
    _html += "</div>";
    _html += '<div class="modal-footer">';
    _html += '<a class="btn" data-dismiss="modal">Close</a>';
    _html += '<a class="btn btn-primary widget-edit-save">Save changes</a>'
  }else {
    widgetID = options.widgetID;
    var widget = jarvis.dataaccess.getDashboardWidget(widgetID);
    widgetType = widget.Type;
    try {
      column = widget.Column;
      ordinal = widget.Ordinal
    }catch(ex) {
      column = -1;
      ordinal = -1
    }
    _html += "<h3>Widget Settings</h3>";
    _html += "</div>";
    _html += '<div class="modal-body" style="padding:30px;padding-bottom: 0;">';
    _html += '<form class="form-horizontal">';
    _html += "<fieldset>";
    _html += '<div class="control-group">' + '<label class="control-label" for="widget-edit-name">Caption</label>' + '<div class="controls">' + '<input type="text" class="input-xlarge" id="widget-edit-name" placeholder="Enter a caption for the new Widget" value="' + widget.Name + '">' + "</div>" + "</div>";
    _html += '<div class="control-group">' + '<label class="control-label" for="widget-edit-type">Type</label>' + '<div class="controls">' + '<select id="widget-edit-type">' + '<option value="Metric Box" ' + (widgetType == "Metric Box" ? "selected" : "") + ">Metric Box</option>" + '<option value="Table" ' + (widgetType == "Table" ? "selected" : "") + ">Table</option>" + '<option value="Pie Chart" ' + (widgetType == "Pie Chart" ? "selected" : "") + ">Pie Chart</option>" + '<option value="Timeline" ' + 
    (widgetType == "Timeline" ? "selected" : "") + ">Timeline</option>" + "</select>" + "</div>" + "</div>";
    _html += "<hr >";
    _html += '<div class="specificsettings">';
    _html += _this.generateSettings(widgetType, widget);
    _html += "</div>";
    _html += "</fieldset>";
    _html += "</form>";
    _html += "</div>";
    _html += '<div class="modal-footer">';
    _html += '<a class="widget-edit-delete" style="cursor:pointer;float:left;margin-top:5px;">Delete</a>';
    _html += '<a class="btn" data-dismiss="modal">Close</a>';
    _html += '<a class="btn btn-primary widget-edit-save">Save changes</a>'
  }
  _html += "</div>";
  _html += "</div>";
  var $modal = $(_html);
  $modal.find("#widget-edit-type").off("change");
  $modal.find("#widget-edit-type").on("change", function(e) {
    $modal.find(".specificsettings").html(_this.generateSettings($modal.find("#widget-edit-type").val(), widget))
  });
  $("body").append($modal);
  $modal.modal();
  $modal.find(".widget-edit-delete").off("click");
  $modal.find(".widget-edit-delete").on("click", function(e) {
    jarvis.dataaccess.fetch(this, "/engine/Dashboards.svc/DeleteWidget", {ID:widgetID}, function(sender, data, error) {
      jarvis.objects.Dashboards.Get(null, {id:_this.panelID}, null, true);
      data = $.parseJSON(data.data);
      var sender = options.sender;
      var container = options.sendercontainer;
      $(container).remove();
      $modal.modal("hide")
    })
  });
  $modal.find(".widget-edit-save").off("click");
  $modal.find(".widget-edit-save").on("click", function(e) {
    var name = "";
    var type = "Table";
    var dimension = "";
    var dimension_name = "";
    var metric = "";
    var metric_name = "";
    var secondary_metric = "";
    var secondary_metric_name = "";
    var limit = 5;
    name = $modal.find("#widget-edit-name").val();
    type = $modal.find("#widget-edit-type").val();
    dimension = $modal.find("#widget-edit-dimension").val();
    dimension_name = $modal.find("#widget-edit-dimension option:selected").text();
    metric = $modal.find("#widget-edit-metric").val();
    metric_name = $modal.find("#widget-edit-metric option:selected").text();
    secondary_metric = $modal.find("#widget-edit-secondarymetric").val();
    secondary_metric_name = $modal.find("#widget-edit-secondarymetric option:selected").text();
    limit = $modal.find("#widget-edit-limit").val();
    if(typeof dimension == "undefined") {
      dimension = -1;
      dimension_name = ""
    }
    if(typeof secondary_metric == "undefined") {
      secondary_metric = -1;
      secondary_metric_name = ""
    }
    jarvis.dataaccess.fetch(this, "/engine/Dashboards.svc/UpdateWidget", {PanelID:_this.panelID, ID:widgetID, Name:name, Type:type, Dimension:dimension, Metric:metric, SecondaryMetric:secondary_metric, Limit:limit, Column:column, Ordinal:ordinal}, function(sender, data, error) {
      jarvis.objects.Dashboards.Get(null, {id:_this.panelID}, null, true);
      data = $.parseJSON(data.data);
      if(options.addNew) {
        if(secondary_metric > -1) {
          metric_name += ", " + secondary_metric_name
        }
        if(type == "Table") {
          _html = '<div class="jarvis dashboard jtable widget" data-widgetid="' + data + '" data-title="' + name + '" data-dimensions="' + dimension_name + '" data-metrics="' + metric_name + '" data-limit="' + limit + '"></div>'
        }
        if(type == "Metric Box") {
          _html = '<div class="jarvis dashboard metricbox widget" data-widgetid="' + data + '" data-title="' + name + '" data-dimensions="' + dimension_name + '" data-metrics="' + metric_name + '" data-limit="' + limit + '"></div>'
        }
        if(type == "Pie Chart") {
          _html = '<div class="jarvis dashboard pie widget" data-widgetid="' + data + '" data-title="' + name + '" data-dimensions="' + dimension_name + '" data-metrics="' + metric_name + '" data-limit="' + limit + '"></div>'
        }
        if(type == "Timeline") {
          _html = '<div class="jarvis dashboard timeline widget" data-widgetid="' + data + '" data-title="' + name + '" data-dimensions="' + dimension_name + '" data-metrics="' + metric_name + '" data-limit="' + limit + '"></div>'
        }
        _html = $(_html);
        $(".jarvis.dashboard.column-left").html($(".jarvis.dashboard.column-left").html().replace("&nbsp;", ""));
        $(".jarvis.dashboard.column-left").prepend(_html);
        $(".jarvis.dashboard.column-left").prepend("&nbsp;");
        if(type == "Table") {
          (new jarvis.visualisation.dashboard.Table).init(null, _html)
        }
        if(type == "Metric Box") {
          (new jarvis.visualisation.dashboard.MetricBox).init(null, _html)
        }
        if(type == "Pie Chart") {
          (new jarvis.visualisation.dashboard.Pie).init(null, _html)
        }
        if(type == "Timeline") {
          (new jarvis.visualisation.dashboard.Timeline).init(null, _html)
        }
      }else {
        var sender = options.sender;
        var container = options.sendercontainer;
        $(container).attr("data-title", name);
        $(container).attr("data-dimensions", dimension_name);
        $(container).attr("data-metrics", metric_name);
        $(container).attr("data-limit", limit);
        $(container).removeClass("pie");
        $(container).removeClass("jtable");
        $(container).removeClass("timeline");
        $(container).removeClass("metricbox");
        if(type == "Table") {
          $(container).addClass("jtable")
        }
        if(type == "Metric Box") {
          $(container).addClass("metricbox")
        }
        if(type == "Pie Chart") {
          $(container).addClass("pie")
        }
        if(type == "Timeline") {
          $(container).addClass("timeline")
        }
        if(type == "Table") {
          (new jarvis.visualisation.dashboard.Table).init(null, container)
        }
        if(type == "Metric Box") {
          (new jarvis.visualisation.dashboard.MetricBox).init(null, container)
        }
        if(type == "Pie Chart") {
          (new jarvis.visualisation.dashboard.Pie).init(null, container)
        }
        if(type == "Timeline") {
          (new jarvis.visualisation.dashboard.Timeline).init(null, container)
        }
      }
      $modal.modal("hide")
    })
  });
  $modal.on("hidden", function() {
    $modal.remove()
  })
};
jarvis.debug.log("INFO", "Dashboard.Visualisation.Panel", 6, "JS source loaded");
jarvis.provide("jarvis.visualisation.dashboard.Bar");
jarvis.require("jarvis.debug");
jarvis.require("jarvis.date");
jarvis.require("jarvis.string");
jarvis.require("jarvis.visualisation.dashboard");
jarvis.visualisation.dashboard.Bar = function(options) {
  var start = (new Date).getMilliseconds();
  this._this = this;
  this.options = options;
  this.default_caption = "Right now";
  this.default_subcaption = "Events per Second";
  this.default_useAverage = true;
  this.key = "";
  this.itemCount = 10;
  this.initialized = false;
  this.gettingBackData = false;
  this.initialCallbacks = [];
  this.initialTimestamp = null;
  this.Resolution = "Day";
  this.containers = [];
  jarvis.objects.Dimensions.List();
  jarvis.objects.Metrics.List();
  var executionTime = (new Date).getMilliseconds() - start
};
jarvis.visualisation.dashboard.Bar.prototype.init = function(options, container) {
  var _this = this;
  var start = (new Date).getMilliseconds();
  this._this = this;
  this.options = $.extend({height:235}, options);
  this.containers = this.containers || [];
  this.dimensions = [];
  this.metrics = [];
  this.DateBox = jarvis.visualisation.picker.DateBox;
  $(jarvis.realtime).bind("filterchange", function(e) {
  });
  var matchedContainers = null;
  if(container) {
    matchedContainers = $(container)
  }else {
    matchedContainers = $(".jarvis.dashboard.bar")
  }
  if(matchedContainers.length == 0) {
    return
  }
  $(matchedContainers).each(function(index, item) {
    if(!$(this).parent().hasClass("prettyprint")) {
      jarvis.debug.log("INFO", "jarvis.visualisation.dashboard.Bar", 6, "Applying to container ('" + this.id + "')");
      var _height = $(item).attr("data-height");
      if(_height) {
        _this.options.height = _height
      }
      var _itemcount = $(item).attr("data-limit");
      if(_itemcount) {
        _this.itemCount = _itemcount
      }
      var _metrics = $(item).attr("data-metrics");
      if(!_metrics) {
        return
      }
      _metrics = _metrics.split(",");
      $(_metrics).each(function(index, item) {
        _metrics[index] = $.trim(_metrics[index]);
        _this.metrics.push(_metrics[index])
      });
      $(jarvis.dataaccess.metrics).each(function(index, item) {
        if(_metrics.indexOf(item.Name) > -1) {
          _this.metrics[_metrics.indexOf(item.Name)] = item
        }
      });
      $(this).bind("data", function(evt, ret) {
        ret.data = $(this).data().data
      });
      $(this).bind("click", function(evt) {
        $(this).trigger("clicked", $(this).data().data)
      });
      $(jarvis.visualisation.report).bind("filter", function(filter) {
        _this.fetch(_this)
      });
      $(item).empty();
      _this.draw(item);
      _this.fetch(_this, item);
      $(this).find(".settings").off("click");
      $(this).find(".settings").on("click", function(e) {
        jarvis.getDashboard().showEditWidget({_this:jarvis.getDashboard(), container:jarvis.getDashboard().container, addNew:false, widgetID:$(item).attr("data-widgetid"), sender:_this, sendercontainer:item})
      });
      _this.containers.push(item)
    }
  });
  $(_this.DateBox).bind("datechange", function() {
    $(_this.containers).each(function(i, container) {
      _this.fetch(_this, container)
    })
  });
  var executionTime = (new Date).getMilliseconds() - start;
  jarvis.debug.log("INFO", "jarvis.visualisation.dashboard.Bar", 5, "...init (" + executionTime + "ms)")
};
jarvis.visualisation.dashboard.Bar.prototype.fetch = function(sender, container) {
  if(!sender) {
    sender = jarvis.dashboard.visualisation.Pie
  }
  var _this = sender;
  var startdate = jarvis.visualisation.picker.DateBox.getDate().base_fromdate;
  var enddate = jarvis.visualisation.picker.DateBox.getDate().base_todate;
  if(_this.DateBox.comparePeriod) {
    var compare_startdate = jarvis.visualisation.picker.DateBox.getDate().compare_fromdate;
    var compare_enddate = jarvis.visualisation.picker.DateBox.getDate().compare_todate
  }
  var _metrics = $(container).attr("data-metrics");
  var _metricslist = _metrics;
  var _dimensions = $(container).attr("data-dimensions");
  var _dimensionslist = _dimensions;
  if(!_metrics) {
    return""
  }
  _metrics = _metrics.split(",");
  $(_metrics).each(function(index, item) {
    var mindex = -1;
    $(jarvis.dataaccess.metrics).each(function(mi, mo) {
      if(mo.Name == $.trim(item)) {
        mindex = mi
      }
    });
    _metrics[index] = jarvis.dataaccess.metrics[mindex];
    _this.metrics.push(_metrics[index])
  });
  $(jarvis.dataaccess.metrics).each(function(index, item) {
    if(_metrics.indexOf(item.Name) > -1) {
      _this.metrics[_metrics.indexOf(item.Name)] = item
    }
  });
  if(!_metrics) {
    return""
  }
  if(!_dimensions) {
    return""
  }
  _dimensions = _dimensions.split(",");
  $(_dimensions).each(function(index, item) {
    var mindex = -1;
    $(jarvis.objects.Dimensions).each(function(mi, mo) {
      if(mo.Name == $.trim(item)) {
        mindex = mi
      }
    });
    _dimensions[index] = jarvis.objects.Dimensions[mindex];
    _this.dimensions.push(_dimensions[index])
  });
  $(jarvis.objects.Dimensions).each(function(index, item) {
    if(_dimensions.indexOf(item.Name) > -1) {
      _this.dimensions[_dimensions.indexOf(item.Name)] = item
    }
  });
  if(!_dimensions) {
    return""
  }
  var queryOptions = [];
  var _queryOptions = {id:"primary", FromDate:jarvis.date.formatDate(startdate, "yyyy-mm-dd hh:nn:ss.000"), ToDate:jarvis.date.formatDate(enddate, "yyyy-mm-dd hh:nn:ss.999"), Dimensions:_dimensionslist, Metrics:_metricslist, Resolution:_this.Resolution, omitDate:true, Filter:jarvis.visualisation.dashboard.globalfilter, sortKey:_metrics[_metrics.length - 1].Name, sortDir:"DESC"};
  queryOptions.push(_queryOptions);
  if(_this.DateBox.comparePeriod) {
    _queryOptions = {id:"compare_primary", FromDate:jarvis.date.formatDate(compare_startdate, "yyyy-mm-dd hh:nn:ss.000"), ToDate:jarvis.date.formatDate(compare_enddate, "yyyy-mm-dd hh:nn:ss.999"), Dimensions:_dimensionslist, Metrics:_metricslist, Resolution:_this.Resolution, omitDate:true, Filter:jarvis.visualisation.dashboard.globalfilter, sortKey:_metrics[_metrics.length - 1].Name, sortDir:"DESC"};
    queryOptions.push(_queryOptions)
  }
  jarvis.dataaccess.multifetch(_this, "/engine/Query.svc/fetch", queryOptions, function(sender, data, error) {
    var series = [];
    $(data).each(function(index, item) {
      try {
        var result = item.data.Result;
        var request = item.data.Request;
        var data = item.data.Result;
        var _data = item.data.Result.Rows;
        if(data.Columns.length == 2) {
          item.data.Result.id = item.id;
          series.push(item.data.Result)
        }else {
          var localdata = {};
          jQuery.extend(true, localdata, data);
          localdata.Columns.splice(2, 1);
          localdata.id = item.id;
          $(localdata.Rows).each(function(i, row) {
            var point = row;
            localdata.Rows[i].FormattedValues.splice(2, 1);
            localdata.Rows[i].Values.splice(2, 1)
          });
          series.push(localdata);
          localdata = {};
          jQuery.extend(true, localdata, data);
          localdata.Columns.splice(1, 1);
          localdata.id = item.id;
          $(localdata.Rows).each(function(i, row) {
            var point = row;
            localdata.Rows[i].FormattedValues.splice(1, 1);
            localdata.Rows[i].Values.splice(1, 1)
          });
          series.push(localdata)
        }
      }catch(ex) {
      }
    });
    _this.update(sender, _metrics, series, container)
  })
};
jarvis.visualisation.dashboard.Bar.prototype.update = function(sender, metrics, series, container) {
  var _this = sender;
  if(!series[0]) {
    return
  }
  var $wrapper = $(container);
  var _itemcount = $(container).attr("data-limit");
  if(_itemcount) {
    _this.itemCount = _itemcount
  }
  var $container = $($(container).find(".chart"));
  var columns = series[0].Columns;
  var data = series[0].Rows;
  var _totalsum = 0;
  $(data).each(function(index, row) {
    _totalsum += parseFloat(row.Values[row.Values.length - 1])
  });
  var chart = new Highcharts.Chart({chart:{height:_this.options.height, marginTop:0, marginLeft:-15, marginRight:-20, marginBottom:50, spacingLeft:0, spacingTop:15, spacingRight:0, spacingBottom:0, renderTo:$container.get(0), animation:false, type:"column", events:{load:function() {
  }, redraw:function() {
    $wrapper.find(".jarvis.legend").empty();
    var _series = chart.series;
    $(_series).each(function(index, series) {
      var seriesname = "";
      var _html = "";
      seriesname = series.name;
      _html = '<span style="border: 5px solid white; border-color: ' + series.color + '; border-radius: 5px;height: 0px; display: inline-block; width: 0px;margin-left:10px;"></span>&nbsp;';
      _html += '<span class="jarvis legendseries" data-id="0">' + seriesname + "</span>";
      $wrapper.find(".jarvis.legend").append(_html)
    })
  }, selection:function(event) {
  }}}, title:{text:null}, xAxis:{categories:function() {
    var result = [];
    var totalsum = 0;
    var sum = 0;
    $(data).each(function(index, item) {
      var y = parseFloat(item.Values[item.Values.length - 1]);
      totalsum += y
    });
    $(data).each(function(index, item) {
      if(index < _this.itemCount) {
        var x = item.FormattedValues[0];
        var y = parseFloat(item.Values[item.Values.length - 1]);
        sum += y;
        result.push(x)
      }
    });
    if(totalsum - sum > 0) {
      result.push("Other")
    }
    return result
  }(), labels:{fontFamily:"Signika", enabled:true, style:{fontSize:"11px;", color:"#999"}, y:30}, tickLength:0, startOnTick:false, endOnTick:false}, yAxis:[{gridLineColor:"#efefef", min:0, showFirstLabel:false, showLastLabel:true, endOnTick:true, title:{text:null}, labels:{style:{fontFamily:"Signika", fontSize:"11px", color:"#999", textShadow:"-1px -1px 0 #ffffff, 1px -1px 0 #ffffff, -1px 1px 0 #ffffff, 1px 1px 0 #ffffff"}, align:"left", x:20, y:15}, plotLines:[{value:0, width:1, color:"#ffffff"}]}], 
  tooltip:{shared:true, useHTML:true, borderColor:"#333333", formatter:function() {
    var points = this.points;
    var formattedDate = "";
    if(this.points.length == 1) {
      var nextindex = 0;
      if(_this.Resolution == "Hour" || _this.Resolution == "Minute") {
        formattedDate = Highcharts.dateFormat("%A, %B %d, %Y %H:%M", this.points[0].point.x)
      }else {
        if(_this.Resolution == "Month") {
          $(points[0].series.xData).each(function(index, item) {
            if(item == points[0].point.x) {
              nextindex = index + 1
            }
          });
          if(nextindex < points[0].series.xData.length) {
            if(nextindex == points[0].series.xData.length - 1) {
              formattedDate = Highcharts.dateFormat("%b %d, %Y", jarvis.date.flatDate(points[0].point.x));
              var sDate = jarvis.date.flatDate(points[0].series.xData[nextindex]);
              sDate = jarvis.date.flatDate(new Date(sDate.getFullYear(), sDate.getMonth(), 0));
              formattedDate += " - " + Highcharts.dateFormat("%b %d, %Y", sDate)
            }else {
              formattedDate = Highcharts.dateFormat("%b %d, %Y", jarvis.date.flatDate(points[0].point.x));
              var sDate = jarvis.date.flatDate(points[0].series.xData[nextindex]);
              sDate.setDate(sDate.getDate() - 1);
              formattedDate += " - " + Highcharts.dateFormat("%b %d, %Y", sDate)
            }
          }else {
            var sDate = jarvis.date.flatDate(points[0].point.x);
            sDate.setDate(1);
            formattedDate = Highcharts.dateFormat("%b %d, %Y", sDate);
            formattedDate += " - " + Highcharts.dateFormat("%b %d, %Y", points[0].point.x)
          }
        }else {
          if(_this.Resolution == "Week") {
            $(points[0].series.xData).each(function(index, item) {
              if(item == points[0].point.x) {
                nextindex = index + 1
              }
            });
            if(nextindex < points[0].series.xData.length) {
              formattedDate = Highcharts.dateFormat("%b %d, %Y", jarvis.date.flatDate(points[0].point.x));
              var sDate = jarvis.date.flatDate(points[0].series.xData[nextindex]);
              sDate.setDate(sDate.getDate() - 1);
              formattedDate += " - " + Highcharts.dateFormat("%b %d, %Y", sDate)
            }else {
              var sDate = jarvis.date.flatDate(points[0].point.x);
              formattedDate = Highcharts.dateFormat("%b %d, %Y", sDate);
              formattedDate += " - " + Highcharts.dateFormat("%b %d, %Y", _this.DateBox.base_todate)
            }
          }else {
            formattedDate = Highcharts.dateFormat("%A, %B %d, %Y", points[0].point.x)
          }
        }
      }
      formattedDate = jarvis.date.formatDate(_this.DateBox.getDate().base_fromdate);
      formattedDate += " - ";
      formattedDate += jarvis.date.formatDate(_this.DateBox.getDate().base_todate);
      return'<div style="padding-bottom:5px;"><b>' + formattedDate + '</b></div><div><div style="border: 3px solid white; border-color: #058DC7; border-radius: 3px;height: 0px; display: inline-block; width: 0px;position:relative;top:-1px;">' + '</div><div style="padding-left:3px;display:inline">' + this.points[0].point.name.replace("_x0020_", " ") + ": " + this.points[0].point.formattedy + "</div>" + "</div>"
    }else {
      if(this.points[1].point.compare) {
        if(_this.Resolution == "Month") {
          $(points[0].series.xData).each(function(index, item) {
            if(item == points[0].point.x) {
              nextindex = index + 1
            }
          });
          if(nextindex < points[0].series.xData.length) {
            if(nextindex == points[0].series.xData.length - 1) {
              formattedDate = Highcharts.dateFormat("%b %d, %Y", jarvis.date.flatDate(points[0].point.x));
              var sDate = jarvis.date.flatDate(points[0].series.xData[nextindex]);
              sDate = jarvis.date.flatDate(new Date(sDate.getFullYear(), sDate.getMonth(), 0));
              formattedDate += " - " + Highcharts.dateFormat("%b %d, %Y", sDate)
            }else {
              formattedDate = Highcharts.dateFormat("%b %d, %Y", jarvis.date.flatDate(points[0].point.x));
              var sDate = jarvis.date.flatDate(points[0].series.xData[nextindex]);
              sDate.setDate(sDate.getDate() - 1);
              formattedDate += " - " + Highcharts.dateFormat("%b %d, %Y", sDate)
            }
          }else {
            var sDate = jarvis.date.flatDate(points[0].point.x);
            sDate.setDate(1);
            formattedDate = Highcharts.dateFormat("%b %d, %Y", sDate);
            formattedDate += " - " + Highcharts.dateFormat("%b %d, %Y", points[0].point.x)
          }
        }else {
          if(_this.Resolution == "Week") {
            $(points[0].series.xData).each(function(index, item) {
              if(item == points[0].point.x) {
                nextindex = index + 1
              }
            });
            if(nextindex < points[0].series.xData.length) {
              formattedDate = Highcharts.dateFormat("%b %d, %Y", jarvis.date.flatDate(points[0].point.x));
              var sDate = jarvis.date.flatDate(points[0].series.xData[nextindex]);
              sDate.setDate(sDate.getDate() - 1);
              formattedDate += " - " + Highcharts.dateFormat("%b %d, %Y", sDate)
            }else {
              var sDate = jarvis.date.flatDate(points[0].point.x);
              formattedDate = Highcharts.dateFormat("%b %d, %Y", sDate);
              formattedDate += " - " + Highcharts.dateFormat("%b %d, %Y", _this.DateBox.base_todate)
            }
          }else {
            formattedDate = Highcharts.dateFormat("%A, %B %d, %Y", points[0].point.x)
          }
        }
        formattedDate = jarvis.date.formatDate(_this.DateBox.getDate().base_fromdate);
        formattedDate += " - ";
        formattedDate += jarvis.date.formatDate(_this.DateBox.getDate().base_todate);
        var _html = '<div style="padding-bottom:5px;"><b>' + formattedDate + "</b></div>";
        _html += "<div>";
        var _points = _.sortBy(this.points, function(item) {
          return item.series.options.ordinal
        });
        $.each(_points, function(i, point) {
          if(!point.point.compare) {
            _html += '<div><div style="border: 3px solid white; border-color: ' + point.series.color + '; border-radius: 3px;height: 0px; display: inline-block; width: 0px;position:relative;top:-1px;">';
            _html += '</div><div style="padding-left:3px;display:inline">' + point.series.options.name + ": " + point.point.formattedy + "</div></div>"
          }
        });
        _html += "</div>";
        var nextindex = 0;
        if(_this.Resolution == "Month") {
          $(points[1].series.points).each(function(index, item) {
            if(item.actualdate == points[1].point.actualdate) {
              nextindex = index + 1
            }
          });
          if(nextindex < points[1].series.points.length) {
            if(nextindex == points[1].series.points.length - 1) {
              formattedDate = Highcharts.dateFormat("%b %d, %Y", jarvis.date.flatDate(points[1].point.actualdate));
              var sDate = jarvis.date.flatDate(points[1].series.points[nextindex].actualdate);
              sDate = jarvis.date.flatDate(new Date(sDate.getFullYear(), sDate.getMonth(), 0));
              formattedDate += " - " + Highcharts.dateFormat("%b %d, %Y", sDate)
            }else {
              formattedDate = Highcharts.dateFormat("%b %d, %Y", jarvis.date.flatDate(points[1].point.actualdate));
              var sDate = jarvis.date.flatDate(points[1].series.points[nextindex].actualdate);
              sDate.setDate(sDate.getDate() - 1);
              formattedDate += " - " + Highcharts.dateFormat("%b %d, %Y", sDate)
            }
          }else {
            var sDate = jarvis.date.flatDate(points[1].point.actualdate);
            sDate.setDate(1);
            formattedDate = Highcharts.dateFormat("%b %d, %Y", sDate);
            sDate = jarvis.date.flatDate(new Date(sDate.getFullYear(), sDate.getMonth() + 1, 0));
            formattedDate += " - " + Highcharts.dateFormat("%b %d, %Y", sDate)
          }
        }else {
          if(_this.Resolution == "Week") {
            $(points[1].series.points).each(function(index, item) {
              if(item.actualdate == points[1].point.actualdate) {
                nextindex = index + 1
              }
            });
            if(nextindex < points[1].series.points.length) {
              formattedDate = Highcharts.dateFormat("%b %d, %Y", jarvis.date.flatDate(points[1].point.actualdate));
              var sDate = jarvis.date.flatDate(points[1].series.points[nextindex].actualdate);
              sDate.setDate(sDate.getDate() - 1);
              formattedDate += " - " + Highcharts.dateFormat("%b %d, %Y", sDate)
            }else {
              var sDate = jarvis.date.flatDate(points[1].point.actualdate);
              formattedDate = Highcharts.dateFormat("%b %d, %Y", sDate);
              formattedDate += " - " + Highcharts.dateFormat("%b %d, %Y", _this.DateBox.compare_todate)
            }
          }else {
            formattedDate = Highcharts.dateFormat("%A, %B %d, %Y", points[1].point.actualdate)
          }
        }
        formattedDate = jarvis.date.formatDate(_this.DateBox.compare_fromdate);
        formattedDate += " - ";
        formattedDate += jarvis.date.formatDate(_this.DateBox.compare_todate);
        _html += '<div style="padding-bottom:5px;margin-top:10px;"><b>' + formattedDate + "</b></div>";
        _html += "<div>";
        _points = _.sortBy(this.points, function(item) {
          return item.series.options.ordinal
        });
        $.each(_points, function(i, point) {
          if(point.point.compare) {
            _html += '<div><div style="border: 3px solid white; border-color: ' + point.series.color + '; border-radius: 3px;height: 0px; display: inline-block; width: 0px;position:relative;top:-1px;">';
            _html += '</div><div style="padding-left:3px;display:inline">' + point.series.options.name + ": " + point.point.formattedy + "</div></div>"
          }
        });
        _html += "</div>"
      }else {
        if(_this.Resolution == "Month") {
          $(points[0].series.xData).each(function(index, item) {
            if(item == points[0].point.x) {
              nextindex = index + 1
            }
          });
          if(nextindex < points[0].series.xData.length) {
            if(nextindex == points[0].series.xData.length - 1) {
              formattedDate = Highcharts.dateFormat("%b %d, %Y", jarvis.date.flatDate(points[0].point.x));
              var sDate = jarvis.date.flatDate(points[0].series.xData[nextindex]);
              sDate = jarvis.date.flatDate(new Date(sDate.getFullYear(), sDate.getMonth(), 0));
              formattedDate += " - " + Highcharts.dateFormat("%b %d, %Y", sDate)
            }else {
              formattedDate = Highcharts.dateFormat("%b %d, %Y", jarvis.date.flatDate(points[0].point.x));
              var sDate = jarvis.date.flatDate(points[0].series.xData[nextindex]);
              sDate.setDate(sDate.getDate() - 1);
              formattedDate += " - " + Highcharts.dateFormat("%b %d, %Y", sDate)
            }
          }else {
            var sDate = jarvis.date.flatDate(points[0].point.x);
            sDate.setDate(1);
            formattedDate = Highcharts.dateFormat("%b %d, %Y", sDate);
            formattedDate += " - " + Highcharts.dateFormat("%b %d, %Y", points[0].point.x)
          }
        }else {
          if(_this.Resolution == "Week") {
            $(points[0].series.xData).each(function(index, item) {
              if(item == points[0].point.x) {
                nextindex = index + 1
              }
            });
            if(nextindex < points[0].series.xData.length) {
              formattedDate = Highcharts.dateFormat("%b %d, %Y", jarvis.date.flatDate(points[0].point.x));
              var sDate = jarvis.date.flatDate(points[0].series.xData[nextindex]);
              sDate.setDate(sDate.getDate() - 1);
              formattedDate += " - " + Highcharts.dateFormat("%b %d, %Y", sDate)
            }else {
              var sDate = jarvis.date.flatDate(points[0].point.x);
              formattedDate = Highcharts.dateFormat("%b %d, %Y", sDate);
              formattedDate += " - " + Highcharts.dateFormat("%b %d, %Y", _this.DateBox.base_todate)
            }
          }else {
            formattedDate = Highcharts.dateFormat("%A, %B %d, %Y", points[0].point.x)
          }
        }
        formattedDate = jarvis.date.formatDate(_this.DateBox.getDate().base_fromdate);
        formattedDate += " - ";
        formattedDate += jarvis.date.formatDate(_this.DateBox.getDate().base_todate);
        _html = '<div style="padding-bottom:5px;"><b>' + formattedDate + "</b></div>";
        _html += "<div>";
        _points = _.sortBy(this.points, function(item) {
          return item.series.options.ordinal
        });
        $.each(this.points, function(i, point) {
          _html += '<div><div style="border: 3px solid white; border-color: ' + point.series.color + '; border-radius: 3px;height: 0px; display: inline-block; width: 0px;position:relative;top:-1px;">';
          _html += '</div><div style="padding-left:3px;display:inline">' + point.series.options.name + ": " + point.point.formattedy + "</div></div>"
        });
        _html += "</div>"
      }
      return _html
    }
  }}, legend:{enabled:false}, credits:{enabled:false}, exporting:{enabled:true}, plotOptions:{column:{allowPointSelect:true, shadow:false}, line:{shadow:false}, series:{shadow:false, connectNulls:true, fillOpacity:0.1, marker:{symbol:"circle", enabled:Math.abs(Date.dateDiff("d", _this.DateBox.getDate().base_fromdate, _this.DateBox.getDate().base_todate)) > 90 ? "false" : "true", states:{hover:{enabled:true}}}}}, series:[{pointPadding:0, groupPadding:0.2, name:function() {
    var name = "";
    name = columns[columns.length - 1].Name;
    return name
  }(), data:function() {
    var result = [];
    var sum = 0;
    var totalsum = 0;
    $(data).each(function(index, item) {
      var y = parseFloat(item.Values[item.Values.length - 1]);
      totalsum += y
    });
    $(data).each(function(index, item) {
      if(index < _this.itemCount) {
        var x = item.FormattedValues[0];
        var y = parseFloat(item.Values[item.Values.length - 1]);
        sum += y;
        result.push({y:y, name:x, formattedy:item.FormattedValues[1], compare:false})
      }
    });
    if(totalsum - sum > 0) {
      var name = "Other";
      var y = totalsum - sum;
      result.push({name:name, y:y, formattedy:0, color:jarvis.colors[11]})
    }
    return result
  }(), yAxis:0}]});
  var _seriesholder = [];
  $(series).each(function(index, _series) {
    if(index > 0) {
      var result = [];
      var sum = 0;
      var totalsum = 0;
      $(_series.Rows).each(function(index, item) {
        var y = parseFloat(item.Values[item.Values.length - 1]);
        totalsum += y
      });
      var usedindex = 0;
      $(_series.Rows).each(function(index, item) {
        if(usedindex < _this.itemCount) {
          if(index < chart.options.series[0].data.length) {
            if(item.Values[0] == chart.options.series[0].data[index].name) {
              var name = item.Values[0];
              var y = parseFloat(item.Values[item.Values.length - 1]);
              var actualdate = item.FormattedValues[0];
              sum += y;
              result.push({y:y, name:name, formattedy:item.FormattedValues[1], compare:_series.id.indexOf("compare") > -1 ? true : false, actualdate:actualdate});
              usedindex += 1
            }
          }
        }
      });
      for(var i = result.length;i < chart.options.series[0].data.length - 1;i++) {
        var item = chart.options.series[0].data[i];
        var name = item.name;
        var y = 0;
        var actualdate = item.name;
        sum += y;
        result.push({y:y, name:name, formattedy:0, compare:_series.id.indexOf("compare") > -1 ? true : false, actualdate:actualdate});
        usedindex += 1
      }
      if(totalsum - sum > 0) {
        var name = "Other";
        var y = totalsum - sum;
        result.push({name:name, y:y, formattedy:y, color:jarvis.colors[11]})
      }
      var _color;
      var _yaxis = 0;
      var _seriesindex = 1;
      if(index > 1 && series.length == 4) {
        if(index == 3) {
          _yaxis = 1
        }else {
          _yaxis = 0
        }
        _color = jarvis.offcolors[index - 2]
      }else {
        if(index == 1 && series.length == 2) {
          if(_this.DateBox.comparePeriod) {
            _yaxis = 1;
            _color = jarvis.offcolors[index - 1]
          }else {
            _yaxis = 1;
            _color = jarvis.colors[index]
          }
        }else {
          _yaxis = 1;
          _color = jarvis.colors[index]
        }
      }
      var chartSeries = {name:_series.Columns[1].Name, lineWidth:2, type:"column", yAxis:0, shadow:false, data:result, color:_color, pointPadding:0, groupPadding:0.2};
      _seriesholder.push(chartSeries)
    }
  });
  if(series.length == 4) {
    chart.addSeries(_seriesholder[1], false);
    chart.addSeries(_seriesholder[0], false);
    chart.addSeries(_seriesholder[2], false)
  }else {
    $(_seriesholder).each(function(index, _series) {
      chart.addSeries(_series, false)
    })
  }
  chart.redraw()
};
jarvis.visualisation.dashboard.Bar.prototype.baseHTML = function(sender) {
  var _this = sender;
  var $html = $('<div class="wrapper"></div>');
  $html.append('<div class="row-fluid">' + '<div class="header">' + '<div class="settings"></div>' + '<div class="move"></div>' + "<h3>" + _this.title + "</h3>" + "</div>" + '<div class="content">' + '<div class="jarvis legend"></div>' + '<div class="chart"></div>' + "</div>" + "</div>");
  return $html
};
jarvis.visualisation.dashboard.Bar.prototype.draw = function(container) {
  var _this = this;
  var title = "TITLE";
  var metrics = this.default_subcaption;
  var dimensions = "";
  if($(container).attr("data-title")) {
    title = $(container).attr("data-title")
  }
  if($(container).attr("data-dimensions")) {
    dimensions = $(container).attr("data-dimensions")
  }
  if($(container).attr("data-metrics")) {
    metrics = $(container).attr("data-metrics")
  }
  _this.title = title;
  var $html = _this.baseHTML(_this);
  $(container).append($html)
};
jarvis.debug.log("INFO", "jarvis.visualisation.dashboard.Bar", 6, "JS source loaded");
jarvis.provide("jarvis.visualisation.dashboard.BarTable");
jarvis.require("jarvis.debug");
jarvis.require("jarvis.date");
jarvis.require("jarvis.string");
jarvis.require("jarvis.visualisation.dashboard");
jarvis.visualisation.dashboard.BarTable = function(options) {
  var start = (new Date).getMilliseconds();
  this._this = this;
  this.options = options;
  this.key = "";
  this.initialized = false;
  this.gettingBackData = false;
  this.initialCallbacks = [];
  this.initialTimestamp = null;
  this.Resolution = "Day";
  this.containers = [];
  jarvis.objects.Dimensions.List();
  jarvis.objects.Metrics.List();
  var executionTime = (new Date).getMilliseconds() - start
};
jarvis.visualisation.dashboard.BarTable.prototype.init = function(options, container) {
  var _this = this;
  var start = (new Date).getMilliseconds();
  this.options = options;
  this.containers = this.containers || [];
  this.dimensions = [];
  this.metrics = [];
  this.DateBox = jarvis.visualisation.picker.DateBox;
  $(jarvis.realtime).bind("filterchange", function(e) {
  });
  var matchedContainers = null;
  if(container) {
    matchedContainers = $(container)
  }else {
    matchedContainers = $(".jarvis.dashboard.bartable")
  }
  if(matchedContainers.length == 0) {
    return
  }
  $(matchedContainers).each(function(index, item) {
    if(!$(this).parent().hasClass("prettyprint")) {
      jarvis.debug.log("INFO", "jarvis.visualisation.dashboard.BarTable", 6, "Applying to container ('" + this.id + "')");
      var _metrics = $(item).attr("data-metrics");
      if(!_metrics) {
        return
      }
      _this.itemCount = $(item).attr("data-limit");
      if(!_this.itemCount) {
        _this.itemCount = 10
      }
      _metrics = _metrics.split(",");
      $(_metrics).each(function(index, item) {
        _metrics[index] = $.trim(_metrics[index]);
        _this.metrics.push(_metrics[index])
      });
      $(jarvis.dataaccess.metrics).each(function(index, item) {
        if(_metrics.indexOf(item.Name) > -1) {
          _this.metrics[_metrics.indexOf(item.Name)] = item
        }
      });
      $(this).bind("data", function(evt, ret) {
        ret.data = $(this).data().data
      });
      $(this).bind("click", function(evt) {
        $(this).trigger("clicked", $(this).data().data)
      });
      $(jarvis.visualisation.report).bind("filter", function(filter) {
        _this.fetch(_this)
      });
      $(item).empty();
      _this.draw(item);
      _this.fetch(_this, item);
      $(this).find(".settings").off("click");
      $(this).find(".settings").on("click", function(e) {
        jarvis.getDashboard().showEditWidget({_this:jarvis.getDashboard(), container:jarvis.getDashboard().container, addNew:false, widgetID:$(item).attr("data-widgetid"), sender:_this, sendercontainer:item})
      });
      _this.containers.push(item)
    }
  });
  $(_this.DateBox).bind("datechange", function() {
    $(_this.containers).each(function(i, container) {
      _this.fetch(_this, container)
    })
  });
  var executionTime = (new Date).getMilliseconds() - start;
  jarvis.debug.log("INFO", "Jarvis.Visualisation.Dashboard.BarTable", 5, "...init (" + executionTime + "ms)")
};
jarvis.visualisation.dashboard.BarTable.prototype.fetch = function(sender, container) {
  var _this = sender;
  var startdate = jarvis.visualisation.picker.DateBox.getDate().base_fromdate;
  var enddate = jarvis.visualisation.picker.DateBox.getDate().base_todate;
  if(_this.DateBox.comparePeriod) {
    var compare_startdate = jarvis.visualisation.picker.DateBox.getDate().compare_fromdate;
    var compare_enddate = jarvis.visualisation.picker.DateBox.getDate().compare_todate
  }
  var _dimensions = $(container).attr("data-dimensions");
  var _dimensionslist = _dimensions;
  if(!_dimensions) {
    return""
  }
  var _itemCount = $(container).attr("data-limit");
  if(!_itemCount) {
    _itemCount = 10
  }
  _dimensions = _dimensions.split(",");
  $(_dimensions).each(function(index, item) {
    var dindex = -1;
    $(jarvis.dataaccess.dimensions).each(function(mi, mo) {
      if(mo.Name == $.trim(item)) {
        dindex = mi
      }
    });
    _dimensions[index] = jarvis.dataaccess.dimensions[dindex];
    _this.dimensions.push(_dimensions[index])
  });
  $(jarvis.dataaccess.dimensions).each(function(index, item) {
    if(_dimensions.indexOf(item.Name) > -1) {
      _this.dimensions[_dimensions.indexOf(item.Name)] = item
    }
  });
  var _metrics = $(container).attr("data-metrics");
  var _metricslist = _metrics;
  if(!_metrics) {
    return""
  }
  _metrics = _metrics.split(",");
  $(_metrics).each(function(index, item) {
    var mindex = -1;
    $(jarvis.dataaccess.metrics).each(function(mi, mo) {
      if(mo.Name == $.trim(item)) {
        mindex = mi
      }
    });
    _metrics[index] = jarvis.dataaccess.metrics[mindex];
    _this.metrics.push(_metrics[index])
  });
  $(jarvis.dataaccess.metrics).each(function(index, item) {
    if(_metrics.indexOf(item.Name) > -1) {
      _this.metrics[_metrics.indexOf(item.Name)] = item
    }
  });
  if(!_metrics) {
    return""
  }
  var queryOptions = [];
  var _queryOptions = {id:"primary", FromDate:jarvis.date.formatDate(startdate, "yyyy-mm-dd hh:nn:ss.000"), ToDate:jarvis.date.formatDate(enddate, "yyyy-mm-dd hh:nn:ss.999"), Dimensions:_dimensionslist, Metrics:_metricslist, Resolution:_this.Resolution, omitDate:true, Filter:jarvis.visualisation.dashboard.globalfilter, sortKey:_metrics[_metrics.length - 1].Name, sortDir:"DESC"};
  queryOptions.push(_queryOptions);
  if(_this.DateBox.comparePeriod) {
    _queryOptions = {id:"compare_primary", FromDate:jarvis.date.formatDate(compare_startdate, "yyyy-mm-dd hh:nn:ss.000"), ToDate:jarvis.date.formatDate(compare_enddate, "yyyy-mm-dd hh:nn:ss.999"), Dimensions:_dimensionslist, Metrics:_metricslist, Resolution:_this.Resolution, omitDate:true, Filter:jarvis.visualisation.dashboard.globalfilter, sortKey:_metrics[_metrics.length - 1].Name, sortDir:"DESC"};
    queryOptions.push(_queryOptions)
  }
  jarvis.dataaccess.multifetch(_this, "/engine/Query.svc/fetch", queryOptions, function(sender, data, error) {
    var series = [];
    $(data).each(function(index, item) {
      try {
        if(item.data.Result.Rows.length > _itemCount - 1) {
          var sum1 = 0;
          var sum2 = 0;
          var lastRow = clone(item.data.Result.Rows[item.data.Result.Rows.length - 1]);
          for(var i = _itemCount;i < item.data.Result.Rows.length;i++) {
            sum1 += parseFloat(item.data.Result.Rows[i].Values[1]);
            if(lastRow.Values.length > 2) {
              sum2 += parseFloat(item.data.Result.Rows[i].Values[2])
            }
          }
          lastRow.Values[0] = "Other";
          lastRow.FormattedValues[0] = "Other";
          lastRow.Values[1] = sum1;
          lastRow.FormattedValues[1] = jarvis.string.formatNumber(sum1, 0, true);
          if(lastRow.Values.length > 2) {
            lastRow.Values[2] = sum2;
            lastRow.FormattedValues[2] = jarvis.string.formatNumber(sum2, 0, true)
          }
          item.data.Result.Rows.splice(_itemCount - 1, item.data.Result.Rows.length);
          item.data.Result.Rows.push(lastRow)
        }
        series.push(item.data.Result)
      }catch(ex) {
      }
    });
    if(_this.DateBox.comparePeriod == false) {
      _this.update(sender, _dimensions, _metrics, series, container)
    }else {
      _this.updateCompare(sender, _dimensions, _metrics, series, container)
    }
  })
};
jarvis.visualisation.dashboard.BarTable.prototype.update = function(sender, dimensions, metrics, series, container) {
  var _this = sender;
  if(!series[0]) {
    return
  }
  var $table = $($(container).find(".table"));
  $table.removeClass("compareperiod");
  $table.empty();
  var totalSum = 0;
  $(series[0].Rows).each(function(index, row) {
    if(series[0].Columns[1].AggregationType) {
      totalSum += parseFloat(row.Values[1])
    }
  });
  $(series[0].Rows).each(function(index, row) {
    if(series[0].Columns[1].AggregationType) {
      row.percentage = parseFloat(row.Values[1]) / totalSum
    }
  });
  $(series[0].Rows).each(function(index, row) {
    var $tr = $("<tr></tr>");
    var $td = $("<td></td>");
    var $barwrapper = $('<div class="tablebarwrapper"></div>');
    var $bar = $('<div class="tablebar" style="width:' + row.percentage * 100 + '%"></div>');
    $barwrapper.append($bar);
    if(row.FormattedValues[0] != "Other") {
      $bar.css({"background-color":jarvis.colors[0]})
    }else {
      $bar.css({"background-color":jarvis.colors[11]})
    }
    var $caption = $('<div class="barcaption"><div class="caption"></div><div class="subcaption"></div></div>');
    $caption.find(".caption").text(jarvis.string.formatNumber(row.percentage * 100, 2) + "% " + row.FormattedValues[0]);
    $caption.find(".caption").attr("title", row.FormattedValues[0]);
    $caption.find(".subcaption").text(row.FormattedValues[1] + " " + series[0].Columns[1].Name);
    $td.append($barwrapper);
    $td.append($caption);
    $tr.append($td);
    $table.append($tr);
    var maxlength = row.FormattedValues[0].length;
    while($tr.height() > 60 && maxlength > 5) {
      $caption.find(".caption").text(jarvis.string.formatNumber(row.percentage * 100, 2) + "% " + row.FormattedValues[0].substring(0, maxlength) + "...");
      maxlength -= 1
    }
  })
};
jarvis.visualisation.dashboard.BarTable.prototype.updateCompare = function(sender, dimensions, metrics, series, container) {
  var _this = sender;
  if(!series[0]) {
    return
  }
  var datebox = _this.DateBox;
  var $table = $($(container).find(".table"));
  $table.addClass("compareperiod");
  $table.empty();
  $(series[0].Rows).each(function(index, row) {
    var $tr = $("<tr></tr>");
    var lookupdimension = row.FormattedValues[0];
    var base_value = 0;
    var compare_value = 0;
    var compare_value_formatted = 0;
    var $td;
    base_value = row.Values[1];
    $(series[1].Rows).each(function(compareindex, comparerow) {
      if(comparerow.FormattedValues[0] == lookupdimension) {
        compare_value = comparerow.Values[1];
        compare_value_formatted = comparerow.FormattedValues[1]
      }
    });
    if(compare_value > 0) {
      var ratio = percentageChange(compare_value, base_value);
      ratio = jarvis.string.formatNumber(ratio, 2);
      var $td = $("<td></td>");
      var $barwrapper = $('<div class="tablebarwrapper"></div>');
      var $bar = $('<div class="tablebar" style="width:' + ratio + '%"></div>');
      $barwrapper.append($bar);
      $bar.css({"background-color":jarvis.colors[0]});
      var $caption = $('<div class="barcaption"><div class="caption"><span class="thevalue"></span><span class="thetext"></span></div><div class="subcaption"></div></div>');
      $caption.find(".caption .thevalue").text(ratio + "% ");
      $caption.find(".caption .thetext").text(row.FormattedValues[0]);
      $caption.find(".caption .thetext").attr("title", row.FormattedValues[0]);
      $caption.find(".subcaption").text(compare_value_formatted + " vs. " + row.FormattedValues[1]);
      $td.append($barwrapper);
      $td.append($caption);
      $tr.append($td);
      $table.append($tr);
      var maxlength = row.FormattedValues[0].length;
      while($tr.height() > 60 && maxlength > 5) {
        $caption.find(".caption .thetext").text(row.FormattedValues[0].substring(0, maxlength) + "...");
        maxlength -= 1
      }
      var _class = "";
      var metric = series[0].Columns[1];
      if(metric.RatioDirection == -1 && ratio < 0) {
        _class = "positive"
      }
      if(metric.RatioDirection == -1 && ratio > 0) {
        _class = "negative"
      }
      if(metric.RatioDirection == 1 && ratio > 0) {
        _class = "positive"
      }
      if(metric.RatioDirection == 1 && ratio < 0) {
        _class = "negative"
      }
      if(_class == "") {
        _class = "neutral"
      }
      $caption.find(".caption .thevalue").addClass(_class)
    }else {
      $td = $("<td>N/A</td>");
      $td.addClass("metric");
      var _class = "neutral";
      $td.addClass(_class);
      $tr.append($td);
      $table.append($tr)
    }
    $table.append($tr)
  })
};
jarvis.visualisation.dashboard.BarTable.prototype.draw = function(container) {
  var _this = this;
  var title = "Widget Title";
  var dimensions = "DIMENSION";
  var metrics = this.default_subcaption;
  if($(container).attr("data-title")) {
    title = $(container).attr("data-title")
  }
  if($(container).attr("data-dimensions")) {
    dimensions = $(container).attr("data-dimensions")
  }
  if($(container).attr("data-metrics")) {
    metrics = $(container).attr("data-metrics")
  }
  var $html = $('<div class="wrapper"></div>');
  $html.append('<div class="row-fluid">' + '<div class="header">' + '<div class="settings"></div>' + '<div class="move"></div>' + "<h3>" + title + "</h3>" + "</div>" + '<div class="content">' + '<table class="table table-striped widgettable"></table>' + "</div>" + "</div>");
  $();
  $(container).append($html)
};
jarvis.debug.log("INFO", "Jarvis.Visualisation.Dashboard.BarTable", 6, "JS source loaded");
jarvis.provide("jarvis.visualisation.report");
jarvis.require("jarvis.debug");
jarvis.require("jarvis.date");
jarvis.require("jarvis.string");
jarvis.visualisation.report;
jarvis.visualisation.report.globalfilter = "";
jarvis.visualisation.report.init = function() {
  var start = (new Date).getMilliseconds();
  var executionTime = (new Date).getMilliseconds() - start;
  jarvis.debug.log("INFO", "Report", 5, "...report init (" + executionTime + "ms)")
};
jarvis.visualisation.report.setFilter = function(filter) {
  jarvis.visualisation.report.globalfilter = filter;
  $(jarvis.visualisation.report).trigger("filter")
};
jarvis.visualisation.report.addPartial = function(partial) {
  $(jarvis.visualisation.report).trigger("addpartialfilter", partial)
};
jarvis.visualisation.report.removePartial = function(partial) {
  $(jarvis.visualisation.report).trigger("removepartialfilter", partial)
};
jarvis.debug.log("INFO", "Jarvis.Visualisation.", 6, "JS source loaded");
jarvis.provide("jarvis.visualisation.report.Timeline");
jarvis.require("jarvis.debug");
jarvis.require("jarvis.date");
jarvis.require("jarvis.string");
jarvis.require("jarvis.visualisation.report");
Highcharts.setOptions({colors:["#058DC7", "#ED7E17", "#50B432", "#AF49C5", "#EDEF00", "#8080FF", "#A0A424", "#E3071C", "#6AF9C4", "#B2DEFF", "#64E572", "#CCCCCC"], offcolors:["#AADFF3", "#F2D5BD", "#C9E7BE", "#E1C9E8", "#F6F3B1", "#DADBFB", "#E7E6B4", "#F4B3BC", "#AADFF3", "#F2D5BD", "#C9E7BE"]});
jarvis.visualisation.report.Timeline = function(options) {
  var start = (new Date).getMilliseconds();
  var _this = this;
  this.type = "timeline";
  this._this = this;
  this.ChartType = "line";
  this.Resolution = "Day";
  this.primaryMetric = null;
  this.secondaryMetric = null;
  this.Filters = [];
  this.metrics = [];
  this.height = 235;
  this.DateBox = jarvis.visualisation.picker.DateBox;
  $(this.DateBox).unbind("datechange");
  $(this.DateBox).bind("datechange", function() {
    _this.fetch(_this)
  });
  $(jarvis.visualisation.report).unbind("filter");
  $(jarvis.visualisation.report).bind("filter", function() {
    _this.fetch(_this)
  });
  $(jarvis.visualisation.report).unbind("addpartialfilter-quick");
  $(jarvis.visualisation.report).bind("addpartialfilter-quick", function(e, partial) {
    _this.Filters.push(partial)
  });
  $(jarvis.visualisation.report).unbind("addpartialfilter");
  $(jarvis.visualisation.report).bind("addpartialfilter", function(e, partial) {
    _this.Filters.push(partial);
    _this.fetch(_this)
  });
  $(jarvis.visualisation.report).unbind("removepartialfilter");
  $(jarvis.visualisation.report).bind("removepartialfilter", function(e, partial) {
    if(_this.Filters.indexOf(partial) > -1) {
      _this.Filters.splice(_this.Filters.indexOf(partial), 1);
      _this.fetch(_this)
    }
  });
  $(jarvis).unbind("report-timeline-switch-resolution");
  $(jarvis).bind("report-timeline-switch-resolution", function(e, resolution) {
    _this.switchResolution(_this, resolution, this)
  });
  $(window).resize(function() {
    _this.Chart.setSize(0, _this.Chart.height, false);
    _this.Chart.setSize($(".jarvis.report.timeline").width(), _this.Chart.height, false)
  });
  jarvis.objects.Dimensions.List();
  jarvis.objects.Metrics.List();
  _this.getState(_this);
  var executionTime = (new Date).getMilliseconds() - start
};
jarvis.visualisation.report.Timeline.prototype.init = function(options, container) {
  var _this = this;
  var start = (new Date).getMilliseconds();
  this._this = this;
  var matchedContainers = null;
  if(container) {
    matchedContainers = $(container)
  }else {
    matchedContainers = $(".jarvis.report.timeline")
  }
  if(matchedContainers.length == 0) {
    return
  }
  this.options = $.extend({height:235, excludeMetrics:[], showPrimary:true}, options);
  _this.height = this.options.height;
  _this.excludeMetrics = this.options.excludeMetrics;
  _this.showPrimary = this.options.showPrimary;
  $(matchedContainers).each(function(index, item) {
    jarvis.debug.log("INFO", "jarvis.visualisation.report.Timeline", 6, "Applying to container ('" + this.id + "')");
    if(_this.primaryMetric == null) {
      if(options != null) {
        _this.primaryMetric = options.primaryMetric;
        _this.metrics.push(options.primaryMetric);
        $(jarvis.objects.Metrics).each(function(i, o) {
          if(o.Name == _this.metrics[0]) {
            _this.primaryMetric = o
          }
        })
      }else {
        if($(item).attr("data-metrics")) {
          var _metrics = $(item).attr("data-metrics");
          _metrics = _metrics.split(",");
          $(_metrics).each(function(index, item) {
            _metrics[index] = $.trim(_metrics[index]);
            _this.metrics.push(_metrics[index])
          });
          _this.primaryMetric = _this.metrics[0];
          $(jarvis.objects.Metrics).each(function(i, o) {
            if(o.Name == _this.metrics[0]) {
              _this.primaryMetric = o
            }
          })
        }else {
          _this.primaryMetric = jarvis.objects.Metrics[0];
          _this.metrics = [];
          _this.metrics.push(_this.primaryMetric);
          $(item).attr("data-metrics", _this.primaryMetric.Name)
        }
      }
    }else {
      _this.metrics = [];
      _this.metrics.push(_this.primaryMetric);
      $(item).attr("data-metrics", _this.primaryMetric.Name)
    }
    _this.drawChart(item);
    _this.fetch(_this);
    $(this).unbind("data");
    $(this).bind("data", function(evt, ret) {
      ret.data = $(this).data().data
    });
    $(this).unbind("click");
    $(this).bind("click", function(evt) {
      $(this).trigger("clicked", $(this).data().data)
    })
  });
  var executionTime = (new Date).getMilliseconds() - start;
  jarvis.debug.log("INFO", "jarvis.visualisation.report.Timeline", 5, "...init (" + executionTime + "ms)");
  jarvis.visualisation.primarymetric = _this.primaryMetric;
  jarvis.visualisation.secondarymetric = _this.secondaryMetric;
  return this
};
jarvis.visualisation.report.Timeline.prototype.fetch = function(sender) {
  if(!sender) {
    sender = jarvis.visualisation.report.Timeline
  }
  var _this = sender;
  var startdate = jarvis.visualisation.picker.DateBox.getDate().base_fromdate;
  var enddate = jarvis.visualisation.picker.DateBox.getDate().base_todate;
  if(jarvis.visualisation.picker.DateBox.comparePeriod) {
    var compare_startdate = jarvis.visualisation.picker.DateBox.getDate().compare_fromdate;
    var compare_enddate = jarvis.visualisation.picker.DateBox.getDate().compare_todate
  }
  var queryOptions = [];
  var _queryOptions = {id:"primary", FromDate:jarvis.date.formatDate(startdate, "yyyy-mm-dd hh:nn:ss.000"), ToDate:jarvis.date.formatDate(enddate, "yyyy-mm-dd hh:nn:ss.999"), Dimensions:"", Metrics:_this.primaryMetric.Name, Resolution:_this.Resolution, omitDate:false, Filter:jarvis.visualisation.report.globalfilter};
  queryOptions.push(_queryOptions);
  if(_this.DateBox.comparePeriod) {
    _queryOptions = {id:"compare_primary", FromDate:jarvis.date.formatDate(compare_startdate, "yyyy-mm-dd hh:nn:ss.000"), ToDate:jarvis.date.formatDate(compare_enddate, "yyyy-mm-dd hh:nn:ss.999"), Dimensions:"", Metrics:_this.primaryMetric.Name, Resolution:_this.Resolution, omitDate:false, Filter:jarvis.visualisation.report.globalfilter};
    queryOptions.push(_queryOptions)
  }
  if(_this.secondaryMetric) {
    _queryOptions = {id:"secondary", FromDate:jarvis.date.formatDate(startdate, "yyyy-mm-dd hh:nn:ss.000"), ToDate:jarvis.date.formatDate(enddate, "yyyy-mm-dd hh:nn:ss.999"), Dimensions:"", Metrics:_this.secondaryMetric.Name, Resolution:_this.Resolution, omitDate:false, Filter:jarvis.visualisation.report.globalfilter};
    queryOptions.push(_queryOptions);
    if(_this.DateBox.comparePeriod) {
      _queryOptions = {id:"compare_secondary", FromDate:jarvis.date.formatDate(compare_startdate, "yyyy-mm-dd hh:nn:ss.000"), ToDate:jarvis.date.formatDate(compare_enddate, "yyyy-mm-dd hh:nn:ss.999"), Dimensions:"", Metrics:_this.secondaryMetric.Name, Resolution:_this.Resolution, omitDate:false, Filter:jarvis.visualisation.report.globalfilter};
      queryOptions.push(_queryOptions)
    }
  }
  if(_this.Filters.length > 0) {
    $(_this.Filters).each(function(i, dimension) {
      _queryOptions = {id:"filter", FromDate:jarvis.date.formatDate(startdate, "yyyy-mm-dd hh:nn:ss.000"), ToDate:jarvis.date.formatDate(enddate, "yyyy-mm-dd hh:nn:ss.999"), Dimensions:"", Metrics:_this.primaryMetric.Name, Resolution:_this.Resolution, omitDate:false, Filter:dimension};
      queryOptions.push(_queryOptions);
      if(_this.DateBox.comparePeriod) {
        _queryOptions = {id:"compare_filter", FromDate:jarvis.date.formatDate(compare_startdate, "yyyy-mm-dd hh:nn:ss.000"), ToDate:jarvis.date.formatDate(compare_enddate, "yyyy-mm-dd hh:nn:ss.999"), Dimensions:"", Metrics:_this.primaryMetric.Name, Resolution:_this.Resolution, omitDate:false, Filter:dimension};
        queryOptions.push(_queryOptions)
      }
      if(_this.secondaryMetric) {
        _queryOptions = {id:"filter_secondary", FromDate:jarvis.date.formatDate(startdate, "yyyy-mm-dd hh:nn:ss.000"), ToDate:jarvis.date.formatDate(enddate, "yyyy-mm-dd hh:nn:ss.999"), Dimensions:"", Metrics:_this.secondaryMetric.Name, Resolution:_this.Resolution, omitDate:false, Filter:dimension};
        queryOptions.push(_queryOptions);
        if(_this.DateBox.comparePeriod) {
          _queryOptions = {id:"compare_filter_secondary", FromDate:jarvis.date.formatDate(compare_startdate, "yyyy-mm-dd hh:nn:ss.000"), ToDate:jarvis.date.formatDate(compare_enddate, "yyyy-mm-dd hh:nn:ss.999"), Dimensions:"", Metrics:_this.secondaryMetric.Name, Resolution:_this.Resolution, omitDate:false, Filter:dimension};
          queryOptions.push(_queryOptions)
        }
      }
    })
  }
  var first = true;
  var baseSeries = [];
  var nextcolor = 2;
  if(!_this.options.showPrimary) {
    nextcolor = 0
  }
  jarvis.dataaccess.multifetch(_this, "/engine/Query.svc/fetch", queryOptions, function(sender, data, error) {
    var yaxismin = [];
    $(data).each(function(index, item) {
      var series = [];
      var options = {};
      var result = item.data.Result;
      var request = item.data.Request;
      var _data = item.data.Result.Rows;
      var _series = [];
      if(_this.Resolution == "Month") {
        _data[0].Values[0] = _this.DateBox.getDate().base_fromdate;
        _data[_data.length - 1].Values[0] = _this.DateBox.getDate().base_todate
      }else {
        if(_this.Resolution == "Week") {
          _data[0].Values[0] = _this.DateBox.getDate().base_fromdate
        }
      }
      $(_data).each(function(oindex, point) {
        var y = parseFloat(point.Values[1]);
        if(item.id == "primary") {
          var x = jarvis.date.flatDate(point.Values[0]);
          _series.push({x:x, y:y, name:result.Columns[1].Name, formattedy:point.FormattedValues[1], compare:false});
          baseSeries.push(x)
        }else {
          var x = baseSeries[oindex];
          var actualdate = jarvis.date.flatDate(point.FormattedValues[0]);
          if(typeof x != "undefined") {
            _series.push({x:x, y:y, name:result.Columns[1].Name, formattedy:point.FormattedValues[1], compare:item.id.indexOf("compare") > -1 ? true : false, actualdate:actualdate})
          }
        }
      });
      var _name = "";
      var _color = "";
      var _lineWidth = 3;
      var _type = "area";
      var _yAxis = 0;
      var _shadow = true;
      var _ordinal = 0;
      var _ytype = result.Columns[1].Suffix;
      if(item.id == "primary") {
        _name = result.Columns[1].Name;
        _color = jarvis.colors[0];
        yaxismin[0] = _.min(_series, function(item) {
          return item.y
        }).y
      }
      if(item.id == "secondary") {
        _name = result.Columns[1].Name;
        _color = jarvis.colors[1];
        _lineWidth = 2;
        _type = "line";
        _yAxis = 1;
        _shadow = false;
        _ordinal = 1;
        yaxismin[1] = _.min(_series, function(item) {
          return item.y
        }).y
      }
      if(item.id == "filter") {
        var filtername = request.Filter;
        filtername = filtername.replace(/\[AND\]/g, ", ");
        filtername = filtername.substring(0, filtername.length - 2);
        $(filtername.split(",")).each(function(si, s) {
          _name += s.split("=")[1] + ", "
        });
        _name = _name.substring(0, _name.length - 2);
        _name += ": " + result.Columns[1].Name;
        _lineWidth = 2;
        _type = "line";
        _yAxis = 0;
        _shadow = false;
        _color = jarvis.colors[nextcolor];
        if(!_this.DateBox.comparePeriod) {
          nextcolor++
        }
        _ordinal = 2
      }
      if(item.id == "filter_secondary") {
        var filtername = request.Filter;
        filtername = filtername.replace(/\[AND\]/g, ", ");
        filtername = filtername.substring(0, filtername.length - 2);
        $(filtername.split(",")).each(function(si, s) {
          _name += s.split("=")[1] + ", "
        });
        _name = _name.substring(0, _name.length - 2);
        _name += ": " + result.Columns[1].Name;
        _lineWidth = 2;
        _type = "line";
        _yAxis = 1;
        _shadow = false;
        _color = jarvis.colors[nextcolor];
        if(!_this.DateBox.comparePeriod) {
          nextcolor++
        }
        _ordinal = 3
      }
      if(item.id == "compare_primary") {
        _name = result.Columns[1].Name;
        _color = jarvis.offcolors[0];
        _lineWidth = 2;
        _type = "line";
        _yAxis = 0;
        _shadow = false;
        _ordinal = 4
      }
      if(item.id == "compare_secondary") {
        _name = result.Columns[1].Name;
        _color = jarvis.offcolors[1];
        _lineWidth = 2;
        _type = "line";
        _yAxis = 1;
        _shadow = false;
        _ordinal = 5
      }
      if(item.id == "compare_filter") {
        var filtername = request.Filter;
        filtername = filtername.replace(/\[AND\]/g, ", ");
        filtername = filtername.substring(0, filtername.length - 2);
        $(filtername.split(",")).each(function(si, s) {
          _name += s.split("=")[1] + ", "
        });
        _name = _name.substring(0, _name.length - 2);
        _name += ": " + result.Columns[1].Name;
        _lineWidth = 2;
        _type = "line";
        _yAxis = 0;
        _shadow = false;
        _color = jarvis.offcolors[nextcolor];
        nextcolor++;
        _ordinal = 6
      }
      if(item.id == "compare_filter_secondary") {
        var filtername = request.Filter;
        filtername = filtername.replace(/\[AND\]/g, ", ");
        filtername = filtername.substring(0, filtername.length - 2);
        $(filtername.split(",")).each(function(si, s) {
          _name += s.split("=")[1] + ", "
        });
        _name = _name.substring(0, _name.length - 2);
        _name += ": " + result.Columns[1].Name;
        _lineWidth = 2;
        _type = "line";
        _yAxis = 1;
        _shadow = false;
        _color = jarvis.offcolors[nextcolor];
        nextcolor++;
        _ordinal = 7
      }
      series.push({name:_name, color:_color, lineWidth:_lineWidth, shadow:_shadow, yaxis:_yAxis, type:_type, data:_series, ordinal:_ordinal, ytype:_ytype});
      jarvis.debug.log("INFO", "jarvis.visualisation.report.Timeline", 5, "Plotting " + _series.length + " points.");
      if(first) {
        _this.clearPlot(_this);
        first = false
      }
      _this.plot(_this, queryOptions, series)
    });
    var series = _this.Chart.series;
    var baseSuffix = series[0].options.ytype == "" ? series[0].options.name : series[0].options.ytype;
    $(series).each(function(index, s) {
      if(index > 0) {
        if((s.options.ytype == "" ? s.options.name : s.options.ytype) == baseSuffix) {
          s.update({yAxis:0}, false)
        }
      }
    });
    _this.Chart.redraw()
  });
  try {
    $(jarvis.visualisation).trigger("timeline-primarymetric", [_this, _this.primaryMetric]);
    $(jarvis.visualisation).trigger("timeline-secondarymetric", [_this, _this.secondaryMetric])
  }catch(ex) {
  }
};
jarvis.visualisation.report.Timeline.prototype.clearPlot = function(sender) {
  if(!sender) {
    sender = jarvis.visualisation.report.Timeline
  }
  $(sender.Chart.series).each(function(index, item) {
    this.remove(false)
  });
  sender.Chart.redraw()
};
jarvis.visualisation.report.Timeline.prototype.plot = function(sender, options, series) {
  var _this = sender;
  $(series).each(function(index, item) {
    var visible = true;
    if((item.ordinal == 0 || item.ordinal == 4 || item.ordinal == 1 || item.ordinal == 5) && !_this.options.showPrimary) {
      visible = false
    }
    sender.Chart.addSeries({visible:visible, turboThreshold:item.data.length, name:item.name, color:item.color, lineWidth:item.lineWidth, type:item.type, shadow:item.shadow, yAxis:item.yaxis, data:item.data, ordinal:item.ordinal, ytype:item.ytype}, false)
  })
};
jarvis.visualisation.report.Timeline.prototype.drawChart = function(Container) {
  var _this = this;
  var _html = "";
  _html += "";
  _html += '<div class="chartcontrol" >';
  _html += '<div class="metricpickers btn-group">';
  _html += '<table border="0" cellpadding="0" cellspacing="0">';
  _html += "<tbody><tr>";
  _html += "<td>";
  _html += '<div class="btn-group">';
  _html += '<div class="mainmetricwrapper"></div>\x3c!--<button class="btn mainmetricwrapper dropdown-toggle dropdown" data-toggle="dropdown">';
  _html += '<span class="jarvis metricname"></span>&nbsp;<span class="caret"></span>';
  _html += "</button>--\x3e";
  _html += '<div class="jarvis metriccontainer current">';
  _html += "</div>";
  _html += "</div>";
  _html += "</td>";
  _html += '<td class="andbox" style="padding-left: 10px; padding-right: 10px;padding-top:2px;">';
  _html += "and";
  _html += "</td>";
  _html += "<td>";
  _html += "<div>";
  _html += '<div class="jarvis comparemetricpicker btn-group" style="float: left"><div class="comparemetricwrapper"></div>\x3c!--';
  _html += '<a class="jarvis comparemetricwrapper btn dropdown-toggle dropdown" data-toggle="dropdown">';
  _html += '<span class="jarvis secondarymetricname">Select a metric...</span>&nbsp;<span class="caret"></span></a>--\x3e';
  _html += '<div class="jarvis metriccontainer alltabs">';
  _html += "</div>";
  _html += "</div>";
  _html += '<i class="jarvis removecomparemetric icon-remove" style="float: right; margin-top: 8px;margin-left: 5px; cursor: pointer; display: none;"></i>';
  _html += "</div>";
  _html += "</td>";
  _html += "</tr>";
  _html += "</tbody></table>";
  _html += "</div>";
  _html += "\x3c!--";
  _html += '<div class="btn-group charttype" data-toggle="buttons-radio" style="float: right;';
  _html += 'padding-left: 20px;">';
  _html += '<button class="btn active" data-id="area">';
  _html += '<img src="' + jarvis.hostname + '/assets//img/glyphicons_040_stats.png" height="17" width="17" />';
  _html += "</button>";
  _html += '<button class="btn" data-id="column">';
  _html += '<img src="' + jarvis.hostname + '/assets//img/glyphicons_041_charts.png" height="17" width="17" />';
  _html += "</button>";
  _html += '<button class="btn disabled" data-id="motion">';
  _html += '<img src="' + jarvis.hostname + '/assets//img/glyphicons_042_motion.png" height="21" width="21" />';
  _html += "</button>";
  _html += "</div>--\x3e";
  _html += '<div class="btn-group resolutionpicker" data-toggle="buttons-radio">';
  _html += '\x3c!--<button class="btn" data-id="Timeline">';
  _html += "Timeline</button>";
  _html += '<button class="btn" data-id="Minute">';
  _html += "Minute</button>";
  _html += '<button class="btn" data-id="Hour">';
  _html += "Hour</button>--\x3e";
  _html += '<button class="btn" data-id="Day">';
  _html += "Day</button>";
  _html += '<button class="btn " data-id="Week">';
  _html += "Week</button>";
  _html += '<button class="btn" data-id="Month">';
  _html += "Month</button>";
  _html += "</div>";
  _html += "</div>";
  _html += '<div class="chartlegend">';
  _html += '<div class="legend">';
  _html += "</div>";
  _html += "</div>";
  $(Container).empty();
  $(Container).append(_html);
  switch(_this.Resolution) {
    case "Day":
      $('.btn[data-id="Day"]').addClass("active");
      break;
    case "Week":
      $('.btn[data-id="Week"]').addClass("active");
      break;
    case "Month":
      $('.btn[data-id="Month"]').addClass("active");
      break;
    default:
      break
  }
  var $item = $('<div class="jarvis picker metrics" data-type="button"></div>');
  $(Container).find(".mainmetricwrapper").append($item);
  var _metrics = [];
  if(jarvis.visualisation.reportWrapper) {
    var reportID = jarvis.visualisation.reportWrapper.reportID;
    var report = jarvis.objects.Reports.Get(_this, {id:reportID});
    var tabID = jarvis.visualisation.reportWrapper.tabID;
    var tab = report.Tabs[tabID];
    var mgs = tab.MetricGroups;
    $(mgs).each(function(index, mg) {
      var metrics = mg.Metrics;
      $(metrics).each(function(index, metric) {
        metric.Category = mg.Name;
        _metrics.push(metric)
      })
    })
  }else {
    _metrics = jarvis.objects.Metrics
  }
  var picker_metrics = new jarvis.visualisation.picker.Metrics({container:$item, exclude:_this.options.excludeMetrics, selected:_this.primaryMetric.Name});
  _this.selectedMetric = picker_metrics.selectedMetric;
  $(picker_metrics).bind("select", function(data, metric) {
    metric = _.find(jarvis.objects.Metrics, function(item) {
      return item.Name == metric
    });
    _this.primaryMetric = metric;
    _this.fetch(_this);
    _this.setState(_this);
    picker_secondary.disableMetric(picker_secondary, metric)
  });
  $(jarvis.visualisation).unbind("metricbox-primarymetric");
  $(jarvis.visualisation).bind("metricbox-primarymetric", function(e, sender, metric) {
    if(sender.type != _this.type) {
      picker_metrics.setSelected(_this, metric.Name);
      _this.primaryMetric = metric;
      _this.fetch(_this);
      _this.setState(_this)
    }
  });
  var $item = $('<div class="jarvis picker metrics" data-type="button"></div>');
  $(Container).find(".comparemetricwrapper").append($item);
  var picker_secondary = new jarvis.visualisation.picker.Metrics({container:$item, allowremove:true, exclude:_this.options.excludeMetrics, selected:_this.secondaryMetric ? _this.secondaryMetric.Name : ""});
  picker_secondary.disableMetric(picker_secondary, _this.primaryMetric);
  $(picker_secondary).bind("select", function(data, metric) {
    metric = _.find(jarvis.objects.Metrics, function(item) {
      return item.Name == metric
    });
    _this.secondaryMetric = metric;
    _this.fetch(_this);
    _this.setState(_this);
    picker_metrics.disableMetric(picker_metrics, _this.secondaryMetric)
  });
  $(jarvis.visualisation).unbind("secondarymetric");
  $(jarvis.visualisation).bind("secondarymetric", function(e, sender, metric) {
    if(sender.type != _this.type) {
      metric = _.find(jarvis.objects.Metrics, function(item) {
        return item.Name == metric
      });
      _this.secondaryMetric = metric;
      _this.fetch(_this);
      _this.setState(_this)
    }
  });
  var $metlist = '<ul class="jarvis metriccontainer dropdown-menu">';
  $metlist += "</ul>";
  $metlist = $($metlist);
  $(jarvis.objects.Metrics).each(function(index, metric) {
    var item = $('<li class="jarvis metriclink" data-id="' + metric.Id + '"><a >' + metric.Name + "</a></li>");
    item.off("click");
    item.click(function(e) {
      var $parent = $($(this).parent());
      var _primaryMetric = !$($parent.parent()).parent().hasClass("comparemetricpicker");
      if(_primaryMetric) {
        _this.primaryMetric = metric;
        $(".jarvis.metricname").html(metric.Name)
      }else {
        _this.secondaryMetric = metric;
        $(".jarvis.secondarymetricname").html(metric.Name);
        $(".jarvis.removecomparemetric.icon-remove").show();
        $(".jarvis.comparemetricwrapper.btn.dropdown-toggle.dropdown").addClass("selected")
      }
      try {
        _this.fetch(_this);
        _this.setState(_this)
      }catch(e) {
      }
      $parent.children().each(function(a, b) {
        $(this).removeClass("active")
      });
      $(this).addClass("active")
    });
    $($metlist).append(item)
  });
  $(".jarvis.metricname").html(_this.primaryMetric.Name);
  $(Container).find(".jarvis.metriccontainer.current").append($metlist);
  $(Container).find(".jarvis.metriccontainer.alltabs").append($metlist.clone(true));
  $(Container).append('<div class="chart" style="width:100%;display:block;"></div>');
  $(".jarvis.removecomparemetric.icon-remove").off("click");
  $(".jarvis.removecomparemetric.icon-remove").on("click", function() {
    _this.secondaryMetric = null;
    try {
      _this.fetch(_this)
    }catch(e) {
    }
    $(".jarvis.secondarymetricname").html("Select a metric...");
    $(this).hide();
    $(".jarvis.comparemetricwrapper.btn.dropdown-toggle.dropdown").removeClass("selected");
    $(".jarvis.metriccontainer.alltabs li").each(function(index, item) {
      $(item).removeClass("active")
    })
  });
  _this.Chart = new Highcharts.Chart({chart:{height:_this.options.height, marginTop:0, marginLeft:-15, marginRight:-20, marginBottom:50, spacingLeft:0, spacingTop:15, spacingRight:0, spacingBottom:0, renderTo:$(Container).find(".chart").get(0), animation:false, type:"area", alignTicks:true, events:{load:function(event) {
  }, redraw:function() {
    $(Container).find(".legend").empty();
    var _series = _this.Chart.series;
    $(_series).each(function(index, series) {
      var seriesname = "";
      var _html = "";
      if(series.visible) {
        seriesname = series.name;
        _html = '<span class="legendmark" style="border-color: ' + series.color + ';"></span>&nbsp;';
        _html += '<span class="legendseries" data-id="0">' + seriesname + "</span>";
        $(Container).find(".legend").append(_html)
      }
    })
  }, selection:function(event) {
    if(event.xAxis) {
      var fromdate = new Date(event.xAxis[0].min);
      var todate = new Date(event.xAxis[0].max);
      var diff = todate - fromdate;
      var resolution = "";
      if(_this.Resolution == "Month") {
        resolution = "Day"
      }
      if(_this.Resolution == "Day" && diff <= 2592E6) {
        resolution = "Hour"
      }
      if(_this.Resolution == "Hour" && diff <= 864E5) {
        resolution = "Minute"
      }
      if(_this.Resolution == "Minute" && diff <= 36E5) {
      }
      if(_this.Resolution != resolution && resolution != "") {
        fromdate.setMinutes(0);
        fromdate.setSeconds(0);
        fromdate.setMilliseconds(0);
        todate.setMinutes(0);
        todate.setSeconds(0);
        todate.setMilliseconds(0);
        _this.DateBox.setDate(_this.DateBox, fromdate, todate);
        var $button = $(".resolutionpicker").find('.btn[data-id="' + resolution + '"]');
        _this.switchResolution(_this, resolution, $button)
      }else {
        var fromMillis = Math.floor(event.xAxis[0].min);
        var toMillis = Math.ceil(event.xAxis[0].max);
        _this.Chart.xAxis[0].setExtremes(fromMillis, toMillis, false);
        _this.Chart.redraw();
        _this.zoomButton.show()
      }
      event.preventDefault()
    }else {
    }
  }}}, title:{text:null}, xAxis:{type:this.ChartType == "column" ? "linear" : "datetime", dateTimeLabelFormats:{day:"%b %e"}, labels:{formatter:function() {
    var date = new Date(this.value);
    var sDate = "";
    var dayDiff = (_this.DateBox.getDate().base_fromdate.getTime() - _this.DateBox.getDate().base_todate.getTime()) / 1E3 / 60 / 60 / 24;
    dayDiff = Math.round(Math.abs(dayDiff));
    if(date.getHours() + date.getTimezoneOffset() / 60 != 0) {
      sDate = jarvis.date.formatDate(date, "mmm dd hh:nn")
    }else {
      sDate = jarvis.date.formatDate(date, "mmm dd")
    }
    return sDate
  }, fontFamily:"Signika", enabled:true, style:{fontSize:"11px;", color:"#999"}, y:30}, tickLength:0, endOnTick:false, showFirstLabel:false, showLastLabel:false}, yAxis:[{gridLineColor:"#efefef", showFirstLabel:false, showLastLabel:true, endOnTick:true, title:{text:null}, labels:{formatter:function() {
    var ytype = "";
    try {
      ytype = this.chart.series[0].options.ytype
    }catch(e) {
      ytype = ""
    }
    if(ytype == "seconds") {
      var TimeInSeconds = this.value;
      var sHours = Math.round(TimeInSeconds / 60 / 60 - 0.5, 0);
      var sMinutes = Math.round(TimeInSeconds / 60 - 0.5, 0) % 60;
      var sSeconds = TimeInSeconds % 60;
      if(sHours < 10) {
        sHours = "0" + sHours
      }
      if(sMinutes < 10) {
        sMinutes = "0" + sMinutes
      }
      if(sSeconds < 10) {
        sSeconds = "0" + sSeconds
      }
      return sHours + ":" + sMinutes + ":" + sSeconds
    }else {
      return jarvis.string.formatNumber(this.value, 0, true)
    }
  }, style:{fontFamily:"Signika", fontSize:"11px", color:"#999", textShadow:"-1px -1px 0 #ffffff, 1px -1px 0 #ffffff, -1px 1px 0 #ffffff, 1px 1px 0 #ffffff"}, align:"left", x:20, y:15}, plotLines:[{value:0, width:1, color:"#ffffff"}]}, {gridLineColor:"#efefef", showFirstLabel:false, showLastLabel:true, endOnTick:true, title:{text:null}, labels:{formatter:function() {
    var ytype = "";
    try {
      ytype = this.chart.series[this.chart.series.length - 1].options.ytype
    }catch(e) {
      ytype = ""
    }
    if(ytype == "seconds") {
      var TimeInSeconds = this.value;
      var sHours = Math.round(TimeInSeconds / 60 / 60 - 0.5, 0);
      var sMinutes = Math.round(TimeInSeconds / 60 - 0.5, 0) % 60;
      var sSeconds = TimeInSeconds % 60;
      if(sHours < 10) {
        sHours = "0" + sHours
      }
      if(sMinutes < 10) {
        sMinutes = "0" + sMinutes
      }
      if(sSeconds < 10) {
        sSeconds = "0" + sSeconds
      }
      return sHours + ":" + sMinutes + ":" + sSeconds
    }else {
      return jarvis.string.formatNumber(this.value, 0, true)
    }
  }, style:{fontFamily:"Signika", fontSize:"11px", color:"#999", textShadow:"-1px -1px 0 #ffffff, 1px -1px 0 #ffffff, -1px 1px 0 #ffffff, 1px 1px 0 #ffffff"}, x:-25, y:15, align:"right"}, opposite:true}], tooltip:{borderColor:"#333333", shared:true, useHTML:true, formatter:function() {
    var points = this.points;
    var formattedDate = "";
    if(this.points.length == 1) {
      var nextindex = 0;
      if(_this.Resolution == "Hour" || _this.Resolution == "Minute") {
        formattedDate = jarvis.date.formatDate(this.points[0].point.x)
      }else {
        if(_this.Resolution == "Month") {
          $(points[0].series.xData).each(function(index, item) {
            if(item == points[0].point.x) {
              nextindex = index + 1
            }
          });
          if(nextindex < points[0].series.xData.length) {
            if(nextindex == points[0].series.xData.length - 1) {
              formattedDate = jarvis.date.formatDate(jarvis.date.flatDate(points[0].point.x));
              var sDate = jarvis.date.flatDate(points[0].series.xData[nextindex]);
              sDate = jarvis.date.flatDate(new Date(sDate.getFullYear(), sDate.getMonth(), 0));
              formattedDate += " - " + jarvis.date.formatDate(sDate)
            }else {
              formattedDate = jarvis.date.formatDate(jarvis.date.flatDate(points[0].point.x));
              var sDate = jarvis.date.flatDate(points[0].series.xData[nextindex]);
              sDate.setDate(sDate.getDate() - 1);
              formattedDate += " - " + jarvis.date.formatDate(sDate)
            }
          }else {
            var sDate = jarvis.date.flatDate(points[0].point.x);
            sDate.setDate(1);
            formattedDate = jarvis.date.formatDate(sDate);
            formattedDate += " - " + jarvis.date.formatDate(points[0].point.x)
          }
        }else {
          if(_this.Resolution == "Week") {
            $(points[0].series.xData).each(function(index, item) {
              if(item == points[0].point.x) {
                nextindex = index + 1
              }
            });
            if(nextindex < points[0].series.xData.length) {
              formattedDate = jarvis.date.formatDate(jarvis.date.flatDate(points[0].point.x));
              var sDate = jarvis.date.flatDate(points[0].series.xData[nextindex]);
              sDate.setDate(sDate.getDate() - 1);
              formattedDate += " - " + jarvis.date.formatDate(sDate)
            }else {
              var sDate = jarvis.date.flatDate(points[0].point.x);
              formattedDate = jarvis.date.formatDate(sDate);
              formattedDate += " - " + jarvis.date.formatDate(_this.DateBox.base_todate)
            }
          }else {
            formattedDate = jarvis.date.formatDate(points[0].point.x)
          }
        }
      }
      return'<div style="padding-bottom:5px;"><b>' + formattedDate + '</b></div><div><div style="border: 3px solid white; border-color: ' + jarvis.colors[0] + '; border-radius: 3px;height: 0px; display: inline-block; width: 0px;position:relative;top:-1px;">' + '</div><div style="padding-left:3px;display:inline">' + this.points[0].point.name.replace("_x0020_", " ") + ": " + this.points[0].point.formattedy + "</div>" + "</div>"
    }else {
      if(this.points[1].point.compare) {
        if(_this.Resolution == "Month") {
          $(points[0].series.xData).each(function(index, item) {
            if(item == points[0].point.x) {
              nextindex = index + 1
            }
          });
          if(nextindex < points[0].series.xData.length) {
            if(nextindex == points[0].series.xData.length - 1) {
              formattedDate = jarvis.date.formatDate(jarvis.date.flatDate(points[0].point.x));
              var sDate = jarvis.date.flatDate(points[0].series.xData[nextindex]);
              sDate = jarvis.date.flatDate(new Date(sDate.getFullYear(), sDate.getMonth(), 0));
              formattedDate += " - " + jarvis.date.formatDate(sDate)
            }else {
              formattedDate = jarvis.date.formatDate(jarvis.date.flatDate(points[0].point.x));
              var sDate = jarvis.date.flatDate(points[0].series.xData[nextindex]);
              sDate.setDate(sDate.getDate() - 1);
              formattedDate += " - " + jarvis.date.formatDate(sDate)
            }
          }else {
            var sDate = jarvis.date.flatDate(points[0].point.x);
            sDate.setDate(1);
            formattedDate = jarvis.date.formatDate(sDate);
            formattedDate += " - " + jarvis.date.formatDate(points[0].point.x)
          }
        }else {
          if(_this.Resolution == "Week") {
            $(points[0].series.xData).each(function(index, item) {
              if(item == points[0].point.x) {
                nextindex = index + 1
              }
            });
            if(nextindex < points[0].series.xData.length) {
              formattedDate = jarvis.date.formatDate(jarvis.date.flatDate(points[0].point.x));
              var sDate = jarvis.date.flatDate(points[0].series.xData[nextindex]);
              sDate.setDate(sDate.getDate() - 1);
              formattedDate += " - " + jarvis.date.formatDate(sDate)
            }else {
              var sDate = jarvis.date.flatDate(points[0].point.x);
              formattedDate = jarvis.date.formatDate(sDate);
              formattedDate += " - " + jarvis.date.formatDate(_this.DateBox.base_todate)
            }
          }else {
            formattedDate = jarvis.date.formatDate(points[0].point.x)
          }
        }
        var _html = '<div style="padding-bottom:5px;"><b>' + formattedDate + "</b></div>";
        _html += "<div>";
        var _points = _.sortBy(this.points, function(item) {
          return item.series.options.ordinal
        });
        $.each(_points, function(i, point) {
          if(!point.point.compare) {
            _html += '<div><div style="border: 3px solid white; border-color: ' + point.series.color + '; border-radius: 3px;height: 0px; display: inline-block; width: 0px;position:relative;top:-1px;">';
            _html += '</div><div style="padding-left:3px;display:inline">' + point.series.options.name + ": " + point.point.formattedy + "</div></div>"
          }
        });
        _html += "</div>";
        var nextindex = 0;
        if(_this.Resolution == "Month") {
          $(points[1].series.points).each(function(index, item) {
            if(item.actualdate == points[1].point.actualdate) {
              nextindex = index + 1
            }
          });
          if(nextindex < points[1].series.points.length) {
            if(nextindex == points[1].series.points.length - 1) {
              formattedDate = jarvis.date.formatDate(jarvis.date.flatDate(points[1].point.actualdate));
              var sDate = jarvis.date.flatDate(points[1].series.points[nextindex].actualdate);
              sDate = jarvis.date.flatDate(new Date(sDate.getFullYear(), sDate.getMonth(), 0));
              formattedDate += " - " + jarvis.date.formatDate(sDate)
            }else {
              formattedDate = jarvis.date.formatDate(jarvis.date.flatDate(points[1].point.actualdate));
              var sDate = jarvis.date.flatDate(points[1].series.points[nextindex].actualdate);
              sDate.setDate(sDate.getDate() - 1);
              formattedDate += " - " + jarvis.date.formatDate(sDate)
            }
          }else {
            var sDate = jarvis.date.flatDate(points[1].point.actualdate);
            sDate.setDate(1);
            formattedDate = jarvis.date.formatDate(sDate);
            sDate = jarvis.date.flatDate(new Date(sDate.getFullYear(), sDate.getMonth() + 1, 0));
            formattedDate += " - " + jarvis.date.formatDate(sDate)
          }
        }else {
          if(_this.Resolution == "Week") {
            $(points[1].series.points).each(function(index, item) {
              if(item.actualdate == points[1].point.actualdate) {
                nextindex = index + 1
              }
            });
            if(nextindex < points[1].series.points.length) {
              formattedDate = jarvis.date.formatDate(jarvis.date.flatDate(points[1].point.actualdate));
              var sDate = jarvis.date.flatDate(points[1].series.points[nextindex].actualdate);
              sDate.setDate(sDate.getDate() - 1);
              formattedDate += " - " + jarvis.date.formatDate(sDate)
            }else {
              var sDate = jarvis.date.flatDate(points[1].point.actualdate);
              formattedDate = jarvis.date.formatDate(sDate);
              formattedDate += " - " + jarvis.date.formatDate(_this.DateBox.compare_todate)
            }
          }else {
            formattedDate = jarvis.date.formatDate(points[1].point.actualdate)
          }
        }
        _html += '<div style="padding-bottom:5px;margin-top:10px;"><b>' + formattedDate + "</b></div>";
        _html += "<div>";
        _points = _.sortBy(this.points, function(item) {
          return item.series.options.ordinal
        });
        $.each(_points, function(i, point) {
          if(point.point.compare) {
            _html += '<div><div style="border: 3px solid white; border-color: ' + point.series.color + '; border-radius: 3px;height: 0px; display: inline-block; width: 0px;position:relative;top:-1px;">';
            _html += '</div><div style="padding-left:3px;display:inline">' + point.series.options.name + ": " + point.point.formattedy + "</div></div>"
          }
        });
        _html += "</div>"
      }else {
        if(_this.Resolution == "Month") {
          $(points[0].series.xData).each(function(index, item) {
            if(item == points[0].point.x) {
              nextindex = index + 1
            }
          });
          if(nextindex < points[0].series.xData.length) {
            if(nextindex == points[0].series.xData.length - 1) {
              formattedDate = jarvis.date.formatDate(jarvis.date.flatDate(points[0].point.x));
              var sDate = jarvis.date.flatDate(points[0].series.xData[nextindex]);
              sDate = jarvis.date.flatDate(new Date(sDate.getFullYear(), sDate.getMonth(), 0));
              formattedDate += " - " + jarvis.date.formatDate(sDate)
            }else {
              formattedDate = jarvis.date.formatDate(jarvis.date.flatDate(points[0].point.x));
              var sDate = jarvis.date.flatDate(points[0].series.xData[nextindex]);
              sDate.setDate(sDate.getDate() - 1);
              formattedDate += " - " + jarvis.date.formatDate(sDate)
            }
          }else {
            var sDate = jarvis.date.flatDate(points[0].point.x);
            sDate.setDate(1);
            formattedDate = jarvis.date.formatDate(sDate);
            formattedDate += " - " + jarvis.date.formatDate(points[0].point.x)
          }
        }else {
          if(_this.Resolution == "Week") {
            $(points[0].series.xData).each(function(index, item) {
              if(item == points[0].point.x) {
                nextindex = index + 1
              }
            });
            if(nextindex < points[0].series.xData.length) {
              formattedDate = jarvis.date.formatDate(jarvis.date.flatDate(points[0].point.x));
              var sDate = jarvis.date.flatDate(points[0].series.xData[nextindex]);
              sDate.setDate(sDate.getDate() - 1);
              formattedDate += " - " + jarvis.date.formatDate(sDate)
            }else {
              var sDate = jarvis.date.flatDate(points[0].point.x);
              formattedDate = jarvis.date.formatDate(sDate);
              formattedDate += " - " + jarvis.date.formatDate(_this.DateBox.base_todate)
            }
          }else {
            formattedDate = jarvis.date.formatDate(points[0].point.x)
          }
        }
        _html = '<div style="padding-bottom:5px;"><b>' + formattedDate + "</b></div>";
        _html += "<div>";
        _points = _.sortBy(this.points, function(item) {
          return item.series.options.ordinal
        });
        $.each(this.points, function(i, point) {
          _html += '<div><div style="border: 3px solid white; border-color: ' + point.series.color + '; border-radius: 3px;height: 0px; display: inline-block; width: 0px;position:relative;top:-1px;">';
          _html += '</div><div style="padding-left:3px;display:inline">' + point.series.options.name + ": " + point.point.formattedy + "</div></div>"
        });
        _html += "</div>"
      }
      return _html
    }
  }}, legend:{enabled:false}, credits:{enabled:false}, exporting:{enabled:true}, plotOptions:{column:{allowPointSelect:true}, series:{connectNulls:true, fillOpacity:0.1, marker:{symbol:"circle", enabled:Math.abs(Date.dateDiff("d", _this.DateBox.getDate().base_fromdate, _this.DateBox.getDate().base_todate)) > 90 ? "false" : "true", states:{hover:{enabled:true}}}}}});
  _this.zoomButton = _this.Chart.renderer.button("Reset zoom", _this.Chart.chartWidth - 90, 10, function() {
    _this.Chart.xAxis[0].setExtremes(null, null, false);
    _this.Chart.redraw();
    _this.zoomButton.hide()
  });
  _this.zoomButton.hide().add();
  $(".charttype").find(".btn").each(function() {
    $(this).off("click");
    $(this).click(function() {
    })
  });
  $(".resolutionpicker").find(".btn").each(function() {
    $(this).off("click");
    $(this).click(function() {
      _this.switchResolution(_this, $(this).attr("data-id"), this)
    })
  });
  $(jarvis).trigger("report-timeline-loaded", [_this.Resolution])
};
jarvis.visualisation.report.Timeline.prototype.switchResolution = function(sender, resolution, button) {
  sender.Resolution = resolution;
  sender.fetch(sender);
  $(".resolutionpicker").find(".btn").each(function() {
    $(this).removeClass("active")
  });
  $(button).addClass("active");
  sender.setState(sender)
};
jarvis.visualisation.report.Timeline.prototype.uid = function(sender) {
  return"timeline-1234"
};
jarvis.visualisation.report.Timeline.prototype.setState = function(sender) {
  var _this = sender;
  if(!jarvis.state[_this.uid()]) {
    jarvis.state[_this.uid()] = {}
  }
  jarvis.debug.log("INFO", "jarvis.visualisation.report.Timeline", 6, 'Timeline "' + _this.uid() + '" saving state.');
  jarvis.state[_this.uid()].primaryMetric = _this.primaryMetric;
  jarvis.state[_this.uid()].secondaryMetric = _this.secondaryMetric;
  jarvis.state[_this.uid()].Resolution = _this.Resolution
};
jarvis.visualisation.report.Timeline.prototype.getState = function(sender) {
  var _this = sender;
  jarvis.debug.log("INFO", "jarvis.visualisation.report.Timeline", 6, 'Timeline "' + _this.uid() + '" loading state.');
  if(jarvis.state[_this.uid()] != null) {
    _this.primaryMetric = jarvis.state[_this.uid()].primaryMetric;
    _this.secondaryMetric = jarvis.state[_this.uid()].secondaryMetric;
    _this.Resolution = jarvis.state[_this.uid()].Resolution
  }
};
jarvis.debug.log("INFO", "jarvis.visualisation.report.Timeline", 6, "JS source loaded");
jarvis.provide("jarvis.visualisation.report.MetricBox");
jarvis.require("jarvis.debug");
jarvis.require("jarvis.date");
jarvis.require("jarvis.string");
jarvis.require("jarvis.visualisation.report");
jarvis.visualisation.report.MetricBox = function(options, container) {
  var _this = this;
  var start = (new Date).getMilliseconds();
  this._this = this;
  this.ChartType = "line";
  this.Resolution = "Day";
  this.primaryMetric = jarvis.objects.Metrics[0];
  this.secondaryMetric = null;
  this.Filters = [];
  this.metrics = [];
  this.Container = null;
  this.DateBox = jarvis.visualisation.picker.DateBox;
  jarvis.objects.Dimensions.List();
  jarvis.objects.Metrics.List();
  var executionTime = (new Date).getMilliseconds() - start;
  return this
};
jarvis.visualisation.report.MetricBox.prototype.init = function(options, container) {
  var _this = this;
  var start = (new Date).getMilliseconds();
  var matchedContainers = null;
  if(container) {
    matchedContainers = $(container)
  }else {
    matchedContainers = $(".jarvis.report.metricbox")
  }
  if(matchedContainers.length == 0) {
    return
  }
  $(matchedContainers).each(function(index, item) {
    if(!$(this).parent().hasClass("prettyprint")) {
      jarvis.debug.log("INFO", "jarvis.visualisation.report.MetricBox", 6, "Applying to container ('" + this.id + "')");
      _this.Container = item;
      var _metrics = $(item).attr("data-metrics");
      if(!_metrics) {
        _metrics = jarvis.objects.Metrics[0].Name
      }
      _metrics = _metrics.split(",");
      $(_metrics).each(function(index, item) {
        _metrics[index] = $.trim(_metrics[index]);
        _this.metrics.push(_metrics[index])
      });
      $(jarvis.objects.Metrics).each(function(index, item) {
        if(_metrics.indexOf(item.Name) > -1) {
          _this.metrics[_metrics.indexOf(item.Name)] = item
        }
      });
      $(item).empty();
      _this.draw(item);
      _this.fetch(_this, item);
      $(this).bind("data", function(evt, ret) {
        ret.data = $(this).data().data
      });
      $(this).bind("click", function(evt) {
        $(this).trigger("clicked", $(this).data().data)
      });
      $(_this.DateBox).bind("datechange", function() {
        _this.fetch(_this)
      });
      $(jarvis.visualisation.report).bind("filter", function(filter) {
        _this.fetch(_this)
      });
      $(jarvis.visualisation).bind("timeline-primarymetric", function(e, sender, metric) {
        $(".jmetricbox").removeClass("primaryactive");
        var $metric = $(_this.Container).find('.jmetricbox[data-metric="' + metric.Name + '"]');
        $metric.addClass("primaryactive");
        $metric.find(".legendmark").css({"border-color":jarvis.colors[0]});
        $(jarvis).trigger("report-metricbox-draw", [$metric, true])
      });
      $(jarvis.visualisation).bind("timeline-secondarymetric", function(e, sender, metric) {
        $(".jmetricbox").removeClass("secondaryactive");
        var $metric = $(_this.Container).find('.jmetricbox[data-metric="' + metric.Name + '"]');
        if(metric) {
          $metric.addClass("secondaryactive");
          $metric.find(".legendmark").css({"border-color":jarvis.colors[1]})
        }
        $(jarvis).trigger("report-metricbox-draw", [$metric, false])
      })
    }
  });
  var executionTime = (new Date).getMilliseconds() - start;
  jarvis.debug.log("INFO", "jarvis.visualisation.report.MetricBox", 5, "...init (" + executionTime + "ms)");
  return this
};
jarvis.visualisation.report.MetricBox.prototype.fetch = function(sender, container) {
  if(!sender) {
    sender = jarvis.visualisation.report.MetricBox
  }
  var _this = sender;
  var startdate = jarvis.visualisation.picker.DateBox.getDate().base_fromdate;
  var enddate = jarvis.visualisation.picker.DateBox.getDate().base_todate;
  if(_this.DateBox.comparePeriod) {
    var compare_startdate = jarvis.visualisation.picker.DateBox.getDate().compare_fromdate;
    var compare_enddate = jarvis.visualisation.picker.DateBox.getDate().compare_todate
  }
  $(_this.metrics).each(function(index, metric) {
    var queryOptions = [];
    var _queryOptions = {id:"primary", FromDate:jarvis.date.formatDate(startdate, "yyyy-mm-dd hh:nn:ss.000"), ToDate:jarvis.date.formatDate(enddate, "yyyy-mm-dd hh:nn:ss.999"), Dimensions:"", Metrics:metric.Name, Resolution:_this.Resolution, omitDate:true, Filter:jarvis.visualisation.report.globalfilter};
    queryOptions.push(_queryOptions);
    if(_this.DateBox.comparePeriod) {
      _queryOptions = {id:"compare_primary", FromDate:jarvis.date.formatDate(compare_startdate, "yyyy-mm-dd hh:nn:ss.000"), ToDate:jarvis.date.formatDate(compare_enddate, "yyyy-mm-dd hh:nn:ss.999"), Dimensions:"", Metrics:metric.Name, Resolution:_this.Resolution, omitDate:true, Filter:jarvis.visualisation.report.globalfilter};
      queryOptions.push(_queryOptions)
    }
    if(!_this.DateBox.comparePeriod && jarvis.visualisation.report.globalfilter && jarvis.visualisation.report.globalfilter != "") {
      var _queryOptions = {id:"total", FromDate:jarvis.date.formatDate(startdate, "yyyy-mm-dd hh:nn:ss.000"), ToDate:jarvis.date.formatDate(enddate, "yyyy-mm-dd hh:nn:ss.999"), Dimensions:"", Metrics:metric.Name, Resolution:_this.Resolution, omitDate:true, Filter:""};
      queryOptions.push(_queryOptions)
    }
    jarvis.dataaccess.multifetch(_this, "/engine/Query.svc/fetch", queryOptions, function(sender, data, error) {
      var series = [];
      $(data).each(function(index, item) {
        var result = item.data.Result;
        var request = item.data.Request;
        var _data = item.data.Result.Rows;
        var point = {value:_data[0].Values[0], fvalue:_data[0].FormattedValues[0], totalvalue:_data[0].Values[0], ftotalvalue:_data[0].FormattedValues[0]};
        series.push(point)
      });
      if(_this.DateBox.comparePeriod == false) {
        _this.update(sender, metric, series)
      }else {
        _this.updateCompare(sender, metric, series)
      }
      var primary;
      if(jarvis.visualisation.secondarymetric && jarvis.visualisation.secondarymetric.Name == metric.Name) {
        primary = false
      }else {
        primary = true
      }
      $(jarvis).trigger("report-metricbox-draw", [_this, primary])
    })
  })
};
jarvis.visualisation.report.MetricBox.prototype.update = function(sender, metric, series) {
  var _this = sender;
  var $metric = $(_this.Container).find('.jmetricbox[data-metric="' + metric.Name + '"]');
  var displayValue = series[0].value;
  if(displayValue > 1E6 || displayValue < -1E6) {
    displayValue = jarvis.string.shortenNumber(displayValue);
    if(metric.Suffix != "") {
      displayValue += metric.Suffix
    }
    if(metric.Prefix != "") {
      displayValue = metric.Prefix + displayValue
    }
  }else {
    displayValue = series[0].fvalue
  }
  $metric.find(".value").html(displayValue);
  $metric.find(".value").attr("title", series[0].fvalue);
  $metric.find(".value").removeClass("negative");
  $metric.find(".value").removeClass("positive");
  var ratio;
  if(metric.AggregationType == "SUM" || metric.AggregationType == "COUNT") {
    ratio = 100;
    if(series[0].totalvalue > 0) {
      ratio = series[0].value / (series.length == 1 ? series[0].value : series[1].value) * 100
    }
    if(series.length == 1) {
      $metric.find(".summary").html('<span class="summaryvalue">' + jarvis.string.formatNumber(ratio, 2) + "%</span> of Total<br>(" + series[0].ftotalvalue + ")")
    }else {
      $metric.find(".summary").html('<span class="summaryvalue">' + jarvis.string.formatNumber(ratio, 2) + "%</span> of Total<br>(" + series[1].ftotalvalue + ")")
    }
  }else {
    if(metric.AggregationType == "AVG") {
      ratio = 0;
      if(series[0].totalvalue > 0) {
        ratio = percentageChange(series.length == 1 ? series[0].value : series[1].value, series[0].totalvalue)
      }
      if(series.length == 1) {
        $metric.find(".summary").html('Overall Avg: <span class="summaryvalue">' + series[0].ftotalvalue + "</span><br>(" + jarvis.string.formatNumber(ratio, 2) + "%)")
      }else {
        $metric.find(".summary").html('<span class="summaryvalue">' + jarvis.string.formatNumber(ratio, 2) + "%</span> change<br>(" + series[1].ftotalvalue + ")")
      }
    }
  }
  if(jarvis.visualisation.primarymetric && jarvis.visualisation.primarymetric.Name == metric.Name) {
    $metric.addClass("primaryactive")
  }else {
    $metric.removeClass("primaryactive")
  }
  if(jarvis.visualisation.secondarymetric && jarvis.visualisation.secondarymetric.Name == metric.Name) {
    $metric.addClass("secondaryactive")
  }else {
    $metric.removeClass("secondaryactive")
  }
  $metric.off("click");
  $metric.on("click", function() {
    try {
      $(jarvis.visualisation).trigger("metricbox-primarymetric", [_this, metric])
    }catch(ex) {
    }
  })
};
jarvis.visualisation.report.MetricBox.prototype.updateCompare = function(sender, metric, series) {
  var _this = sender;
  var $metric = $(_this.Container).find('.jmetricbox[data-metric="' + metric.Name + '"]');
  var value = percentageChange(series[1].value, series[0].value);
  console.log(value);
  $metric.find(".value").removeClass("negative");
  $metric.find(".value").removeClass("positive");
  var _class = "neutral";
  if(metric.RatioDirection == -1 && Math.round(parseFloat(value)) < 0) {
    _class = "positive"
  }
  if(metric.RatioDirection == -1 && Math.round(parseFloat(value)) > 0) {
    _class = "negative"
  }
  if(metric.RatioDirection == 1 && Math.round(parseFloat(value)) > 0) {
    _class = "positive"
  }
  if(metric.RatioDirection == 1 && Math.round(parseFloat(value)) < 0) {
    _class = "negative"
  }
  value = jarvis.string.formatNumber(value, 2) + "%";
  console.log(value);
  $metric.find(".value").html(value);
  $metric.find(".value").addClass(_class);
  $metric.find(".summary").html(series[0].fvalue + " vs " + series[1].fvalue);
  if(jarvis.visualisation.primarymetric && jarvis.visualisation.primarymetric.Name == metric.Name) {
    $metric.addClass("primaryactive")
  }else {
    $metric.removeClass("primaryactive")
  }
  if(jarvis.visualisation.secondarymetric && jarvis.visualisation.secondarymetric.Name == metric.Name) {
    $metric.addClass("secondaryactive")
  }else {
    $metric.removeClass("secondaryactive")
  }
  $metric.off("click");
  $metric.on("click", function() {
    try {
      $(jarvis.visualisation).trigger("metricbox-primarymetric", [_this, metric])
    }catch(ex) {
    }
  })
};
jarvis.visualisation.report.MetricBox.prototype.baseHTML = function(item) {
  return'<div class="caption">' + item.Name + "</div>" + '<div class="valuewrapper"><span class="legendmark" style=""></span><div class="value"></div></div>' + '<div class="summary"></div>'
};
jarvis.visualisation.report.MetricBox.prototype.draw = function(Container) {
  var _this = this;
  var metrics = _this.metrics;
  $(metrics).each(function(index, item) {
    var _html = '<div class="jmetricbox" style="width:' + Math.floor(100 / metrics.length) + '%" data-metric="' + item.Name + '"></div>';
    var $html = $(_html);
    $(Container).append($html);
    _html = _this.baseHTML(item);
    $html.append(_html)
  });
  if(jarvis.visualisation.primarymetric != null) {
    var metric = jarvis.visualisation.primarymetric;
    var $metric = $(_this.Container).find('.jmetricbox[data-metric="' + metric.Name + '"]');
    $(".jmetricbox").removeClass("primaryactive");
    $metric.addClass("primaryactive");
    $metric.find(".legendmark").css({"border-color":jarvis.colors[0]});
    $(jarvis).trigger("report-metricbox-draw", [$metric, true, jarvis.colors[0]])
  }
  if(jarvis.visualisation.secondarymetric != null) {
    var metric = jarvis.visualisation.secondarymetric;
    var $metric = $(_this.Container).find('.jmetricbox[data-metric="' + metric.Name + '"]');
    $(".jmetricbox").removeClass("secondaryactive");
    $metric.addClass("secondaryactive");
    $metric.find(".legendmark").css({"border-color":jarvis.colors[1]});
    $(jarvis).trigger("report-metricbox-draw", [$metric, false, jarvis.colors[1]])
  }
};
jarvis.debug.log("INFO", "jarvis.visualisation.report.MetricBox", 6, "JS source loaded");
jarvis.provide("jarvis.visualisation.report.OverviewMetricBox");
jarvis.require("jarvis.debug");
jarvis.require("jarvis.date");
jarvis.require("jarvis.string");
jarvis.require("jarvis.visualisation.report");
jarvis.visualisation.report.OverviewMetricBox = function(options) {
  var start = (new Date).getMilliseconds();
  this._this = this;
  this.options = options;
  this.default_caption = "Right now";
  this.default_subcaption = "Events per Second";
  this.default_useAverage = true;
  this.key = "";
  this.initialized = false;
  this.gettingBackData = false;
  this.initialCallbacks = [];
  this.initialTimestamp = null;
  this.Resolution = "Day";
  this.containers = [];
  this.DateBox = jarvis.visualisation.picker.DateBox;
  jarvis.objects.Dimensions.List();
  jarvis.objects.Metrics.List();
  var executionTime = (new Date).getMilliseconds() - start
};
jarvis.visualisation.report.OverviewMetricBox.prototype.init = function(options, container) {
  var _this = this;
  var start = (new Date).getMilliseconds();
  this._this = this;
  this.options = options;
  this.containers = this.containers || [];
  this.metrics = [];
  var matchedContainers = null;
  if(container) {
    matchedContainers = $(container)
  }else {
    matchedContainers = $(".jarvis.report.overviewmetricbox")
  }
  if(matchedContainers.length == 0) {
    return
  }
  $(matchedContainers).each(function(index, item) {
    if(!$(this).parent().hasClass("prettyprint")) {
      jarvis.debug.log("INFO", "jarvis.visualisation.report.OverviewMetricBox", 6, "Applying to container ('" + this.id + "')");
      var _metrics = $(item).attr("data-metrics");
      if(!_metrics) {
        return
      }
      _metrics = _metrics.split(",");
      $(_metrics).each(function(index, item) {
        _metrics[index] = $.trim(_metrics[index]);
        _this.metrics.push(_metrics[index])
      });
      $(jarvis.dataaccess.metrics).each(function(index, item) {
        if(_metrics.indexOf(item.Name) > -1) {
          _this.metrics[_metrics.indexOf(item.Name)] = item
        }
      });
      $(this).bind("data", function(evt, ret) {
        ret.data = $(this).data().data
      });
      $(this).bind("click", function(evt) {
        $(this).trigger("clicked", $(this).data().data)
      });
      $(jarvis.visualisation.report).bind("filter", function(filter) {
        _this.fetch(_this)
      });
      $(item).empty();
      _this.draw(item);
      _this.fetch(_this, item);
      $(this).find(".settings").off("click");
      $(this).find(".settings").on("click", function(e) {
        jarvis.getDashboard().showEditWidget({_this:jarvis.getDashboard(), container:jarvis.getDashboard().container, addNew:false, widgetID:$(item).attr("data-widgetid"), sender:_this, sendercontainer:item})
      });
      _this.containers.push(item)
    }
  });
  $(_this.DateBox).bind("datechange", function() {
    $(_this.containers).each(function(i, container) {
      _this.fetch(_this, container)
    })
  });
  var executionTime = (new Date).getMilliseconds() - start;
  jarvis.debug.log("INFO", "Jarvis.Visualisation.report.OverviewMetricBox", 5, "...init (" + executionTime + "ms)")
};
jarvis.visualisation.report.OverviewMetricBox.prototype.fetch = function(sender, container) {
  if(!sender) {
    sender = jarvis.visualisation.report.OverviewMetricBox
  }
  var _this = sender;
  var startdate = jarvis.visualisation.picker.DateBox.getDate().base_fromdate;
  var enddate = jarvis.visualisation.picker.DateBox.getDate().base_todate;
  if(_this.DateBox.comparePeriod) {
    var compare_startdate = jarvis.visualisation.picker.DateBox.getDate().compare_fromdate;
    var compare_enddate = jarvis.visualisation.picker.DateBox.getDate().compare_todate
  }
  var _metrics = $(container).attr("data-metrics");
  if(!_metrics) {
    return""
  }
  _metrics = _metrics.split(",");
  $(_metrics).each(function(index, item) {
    var imetric = -1;
    $(jarvis.dataaccess.metrics).each(function(i, o) {
      if(o.Name == $.trim(item)) {
        imetric = i
      }
    });
    _metrics[index] = jarvis.dataaccess.metrics[imetric]
  });
  if(typeof _metrics[0] == "undefined") {
    return""
  }
  $(_metrics).each(function(index, metric) {
    var queryOptions = [];
    var _queryOptions = {id:"primary", FromDate:jarvis.date.formatDate(startdate, "yyyy-mm-dd hh:nn:ss.000"), ToDate:jarvis.date.formatDate(enddate, "yyyy-mm-dd hh:nn:ss.999"), Dimensions:"", Metrics:metric.Name, Resolution:_this.Resolution, omitDate:false, Filter:jarvis.visualisation.dashboard.globalfilter};
    queryOptions.push(_queryOptions);
    _queryOptions = {id:"primary_total", FromDate:jarvis.date.formatDate(startdate, "yyyy-mm-dd hh:nn:ss.000"), ToDate:jarvis.date.formatDate(enddate, "yyyy-mm-dd hh:nn:ss.999"), Dimensions:"", Metrics:metric.Name, Resolution:_this.Resolution, omitDate:true, Filter:jarvis.visualisation.dashboard.globalfilter};
    queryOptions.push(_queryOptions);
    if(_this.DateBox.comparePeriod) {
      _queryOptions = {id:"compare_primary", FromDate:jarvis.date.formatDate(compare_startdate, "yyyy-mm-dd hh:nn:ss.000"), ToDate:jarvis.date.formatDate(compare_enddate, "yyyy-mm-dd hh:nn:ss.999"), Dimensions:"", Metrics:metric.Name, Resolution:_this.Resolution, omitDate:false, Filter:jarvis.visualisation.dashboard.globalfilter};
      queryOptions.push(_queryOptions);
      _queryOptions = {id:"compare_primary_total", FromDate:jarvis.date.formatDate(compare_startdate, "yyyy-mm-dd hh:nn:ss.000"), ToDate:jarvis.date.formatDate(compare_enddate, "yyyy-mm-dd hh:nn:ss.999"), Dimensions:"", Metrics:metric.Name, Resolution:_this.Resolution, omitDate:true, Filter:jarvis.visualisation.dashboard.globalfilter};
      queryOptions.push(_queryOptions)
    }
    if(jarvis.visualisation.dashboard.globalfilter && jarvis.visualisation.dashboard.globalfilter != "") {
      var _queryOptions = {id:"total", FromDate:jarvis.date.formatDate(startdate, "yyyy-mm-dd hh:nn:ss.000"), ToDate:jarvis.date.formatDate(enddate, "yyyy-mm-dd hh:nn:ss.999"), Dimensions:"", Metrics:metric.Name, Resolution:_this.Resolution, omitDate:false, Filter:""};
      queryOptions.push(_queryOptions)
    }
    if(_this.DateBox.comparePeriod && jarvis.visualisation.dashboard.globalfilter && jarvis.visualisation.dashboard.globalfilter != "") {
      _queryOptions = {id:"compare_total", FromDate:jarvis.date.formatDate(compare_startdate, "yyyy-mm-dd hh:nn:ss.000"), ToDate:jarvis.date.formatDate(compare_enddate, "yyyy-mm-dd hh:nn:ss.999"), Dimensions:"", Metrics:metric.Name, Resolution:_this.Resolution, omitDate:false, Filter:""};
      queryOptions.push(_queryOptions)
    }
    jarvis.dataaccess.multifetch(_this, "/engine/Query.svc/fetch", queryOptions, function(sender, data, error) {
      var series = [];
      $(data).each(function(index, item) {
        try {
          if(item.id == "primary" || item.id == "compare_primary") {
            var result = item.data.Result;
            var request = item.data.Request;
            var _data = item.data.Result.Rows;
            var points = {total:0, ftotal:0, data:[], id:data.id};
            $(_data).each(function(i, row) {
              var point = {value:row.Values[1], fvalue:row.FormattedValues[1]};
              points.total += parseFloat(point.value);
              points.data.push(point)
            });
            if(metric.AggregationType == "AVG") {
              points.avg = points.total / _data.length
            }
            $(data).each(function(i, o) {
              if(o.id.indexOf(item.id + "_total") == 0) {
                var _data = o.data.Result.Rows;
                $(_data[0]).each(function(i, row) {
                  points.total = parseFloat(row.Values[0]);
                  points.ftotal = row.FormattedValues[0]
                })
              }
            });
            series.push(points)
          }
        }catch(ex) {
        }
      });
      if(_this.DateBox.comparePeriod == false) {
        _this.update(sender, metric, series, container)
      }else {
        _this.updateCompare(sender, metric, series, container)
      }
    })
  })
};
jarvis.visualisation.report.OverviewMetricBox.prototype.update = function(sender, metric, series, container) {
  var _this = sender;
  if(!series[0]) {
    return
  }
  $(series[0]).each(function(si, so) {
    $(container).find(".compare").hide();
    var $metric = $(container).find(".base");
    var dataTable = new google.visualization.DataTable;
    dataTable.addColumn("number");
    dataTable.addRows(so.data.length);
    var totalsum = so.total;
    $(so.data).each(function(i, row) {
      dataTable.setValue(i, 0, Math.round(parseFloat(row.value)))
    });
    var datebox = jarvis.visualisation.picker.DateBox;
    var ratio;
    if(metric.DataType == "INT") {
      totalsum = jarvis.string.formatNumber(totalsum, 0, true)
    }else {
      if(metric.DataType == "FLOAT") {
        totalsum = jarvis.string.formatNumber(totalsum, 2, true)
      }else {
        totalsum = jarvis.string.formatNumber(totalsum, 0, true)
      }
    }
    if(metric.Suffix && metric.Suffix != "") {
      totalsum += metric.Suffix
    }
    if(metric.Prefix && metric.Prefix != "") {
      totalsum = metric.Prefix + totalsum
    }
    $metric.find(".daterange").html(datebox.formatDate(datebox.getDate().base_fromdate) + " - " + datebox.formatDate(datebox.getDate().base_todate));
    $metric.find(".value").removeClass("positive");
    $metric.find(".value").removeClass("negative");
    $metric.find(".value").html(so.ftotal);
    $metric.find(".site").empty();
    try {
      var vis = new google.visualization.ImageChart($($metric.find(".minichart")).get(0));
      var goptions = {cht:"ls", chs:"75x18", chco:"0077CC", chdlp:"b", chls:"2", chm:"B,E6F2FA,0,0,0", chxt:"", chxr:""};
      vis.draw(dataTable, goptions)
    }catch(ex) {
      throw"(drawSpark) " + "Exception: " + ex.message;
    }
  })
};
jarvis.visualisation.report.OverviewMetricBox.prototype.updateCompare = function(sender, metric, series, container) {
  var _this = sender;
  if(!series[0]) {
    return
  }
  var si = 0;
  var so = series[0];
  var $metric = $(container);
  $metric = $(container).find(".base");
  $(container).find(".compare").hide();
  var dataTable = new google.visualization.DataTable;
  dataTable.addColumn("number");
  dataTable.addColumn("number");
  dataTable.addRows(series[0].data.length);
  var totalsum = so.total;
  var compare_totalsum = series[1].total;
  $(so.data).each(function(i, row) {
    dataTable.setValue(i, 0, Math.round(parseFloat(row.value), Math.round(parseFloat(series[1].data[i].value))));
    dataTable.setValue(i, 1, Math.round(parseFloat(series[1].data[i].value)))
  });
  var datebox = jarvis.visualisation.picker.DateBox;
  var ratio;
  ratio = percentageChange(compare_totalsum, totalsum);
  $metric.find(".value").removeClass("positive");
  $metric.find(".value").removeClass("negative");
  var _class = "";
  if(metric.RatioDirection == -1 && ratio < 0) {
    _class = "positive"
  }
  if(metric.RatioDirection == -1 && ratio > 0) {
    _class = "negative"
  }
  if(metric.RatioDirection == 1 && ratio > 0) {
    _class = "positive"
  }
  if(metric.RatioDirection == 1 && ratio < 0) {
    _class = "negative"
  }
  ratio = jarvis.string.formatNumber(ratio, 2, true) + "%";
  $metric.find(".value").html(ratio);
  $metric.find(".value").addClass(_class);
  $metric.find(".site").html('<span class="summaryvalue">' + series[0].ftotal + " vs. " + series[1].ftotal + "</span>");
  try {
    var vis = new google.visualization.ImageChart($($metric.find(".minichart")).get(0));
    var goptions = {cht:"ls", chs:"75x18", chco:"0077CC,AADFF3", chdlp:"b", chls:"2|1", chm:"B,E6F2FA,0,0,0", chxt:"", chxr:""};
    vis.draw(dataTable, goptions)
  }catch(ex) {
    throw"(drawSpark:compare) " + "Exception: " + ex.message;
  }
};
jarvis.visualisation.report.OverviewMetricBox.prototype.draw = function(container) {
  var _this = this;
  var title = "TITLE";
  var dimensions = "DIMENSION";
  var metrics = this.default_subcaption;
  if($(container).attr("data-title")) {
    title = $(container).attr("data-title")
  }
  if($(container).attr("data-dimensions")) {
    dimensions = $(container).attr("data-dimensions")
  }
  if($(container).attr("data-metrics")) {
    metrics = $(container).attr("data-metrics")
  }
  var $html = $('<div class="wrapper"></div>');
  $html.append('<div class="">' + '<div class="content">' + '<div class="base">' + '<div class="minichart"></div>' + '<div class="metricname">' + _this.metrics[0].Name + ":</div>" + '<div class="value"></div>' + '<div class="site"></div>' + "</div>" + "</div>" + "" + "</div>");
  $();
  var _metric = _this.metrics[0];
  $($html).off("click");
  $($html).on("click", function(e) {
    try {
      $(jarvis.visualisation).trigger("metricbox-primarymetric", [_this, _metric])
    }catch(ex) {
    }
  });
  $(container).append($html);
  return;
  var _html = '<div class="dashboard_metricbox"  data-metric="' + 0 + '"></div>';
  var $html = $(_html);
  $(Container).append($html);
  _html = '<div class="caption">asd' + "asd" + "</div>" + '<div class="value">asd</div>' + '<div class="summary">asd</div>' + '<div class="minichart">asd</div>';
  $html.append(_html);
  try {
    var vis = new google.visualization.ImageChart($($(Container).find(".minichart")).get(0));
    var goptions = {cht:"ls", chs:"75x18", chco:"0077CC", chdlp:"b", chls:"2", chm:"B,E6F2FA,0,0,0", chxt:"", chxr:""};
    vis.draw(dataTable, goptions)
  }catch(ex) {
    throw"(" + _this._moduleName + ".drawSpark) " + "Exception: " + ex.message;
  }
};
jarvis.debug.log("INFO", "Jarvis.Visualisation.report.OverviewMetricBox", 6, "JS source loaded");
jarvis.provide("jarvis.visualisation.report.OverviewPie");
jarvis.require("jarvis.debug");
jarvis.require("jarvis.date");
jarvis.require("jarvis.string");
jarvis.require("jarvis.visualisation.report");
jarvis.visualisation.report.OverviewPie = function(options) {
  var start = (new Date).getMilliseconds();
  this._this = this;
  this.options = options;
  this.default_caption = "Right now";
  this.default_subcaption = "Events per Second";
  this.default_useAverage = true;
  this.key = "";
  this.itemCount = 10;
  this.initialized = false;
  this.gettingBackData = false;
  this.initialCallbacks = [];
  this.initialTimestamp = null;
  this.Resolution = "Day";
  this.containers = [];
  jarvis.objects.Dimensions.List();
  jarvis.objects.Metrics.List();
  var executionTime = (new Date).getMilliseconds() - start
};
jarvis.visualisation.report.OverviewPie.prototype.init = function(options, container) {
  var _this = this;
  var start = (new Date).getMilliseconds();
  this._this = this;
  this.options = options;
  this.containers = this.containers || [];
  this.dimensions = [];
  this.metrics = [];
  this.DateBox = jarvis.visualisation.picker.DateBox;
  var matchedContainers = null;
  if(container) {
    matchedContainers = $(container)
  }else {
    matchedContainers = $(".jarvis.report.overviewpie")
  }
  if(matchedContainers.length == 0) {
    return
  }
  $(matchedContainers).each(function(index, item) {
    if(!$(this).parent().hasClass("prettyprint")) {
      jarvis.debug.log("INFO", "jarvis.visualisation.report.OverviewPie", 6, "Applying to container ('" + this.id + "')");
      var _itemcount = $(item).attr("data-limit");
      if(_itemcount) {
        _this.itemCount = _itemcount
      }
      var _metrics = $(item).attr("data-metrics");
      if(!_metrics) {
        return
      }
      _metrics = _metrics.split(",");
      $(_metrics).each(function(index, item) {
        _metrics[index] = $.trim(_metrics[index]);
        _this.metrics.push(_metrics[index])
      });
      $(jarvis.dataaccess.metrics).each(function(index, item) {
        if(_metrics.indexOf(item.Name) > -1) {
          _this.metrics[_metrics.indexOf(item.Name)] = item
        }
      });
      $(this).bind("data", function(evt, ret) {
        ret.data = $(this).data().data
      });
      $(this).bind("click", function(evt) {
        $(this).trigger("clicked", $(this).data().data)
      });
      $(jarvis.visualisation.report).bind("filter", function(filter) {
        _this.fetch(_this)
      });
      $(item).empty();
      _this.draw(item);
      _this.fetch(_this, item);
      $(this).find(".settings").off("click");
      $(this).find(".settings").on("click", function(e) {
        jarvis.getDashboard().showEditWidget({_this:jarvis.getDashboard(), container:jarvis.getDashboard().container, addNew:false, widgetID:$(item).attr("data-widgetid"), sender:_this, sendercontainer:item})
      });
      _this.containers.push(item)
    }
  });
  $(_this.DateBox).bind("datechange", function() {
    $(_this.containers).each(function(i, container) {
      _this.fetch(_this, container)
    })
  });
  $(jarvis.visualisation).bind("metricbox-primarymetric", function(e, sender, metric) {
    _this.metrics[0] = metric;
    _this.fetch(_this, _this.containers[0])
  });
  var executionTime = (new Date).getMilliseconds() - start;
  jarvis.debug.log("INFO", "Jarvis.Dashboard.Visualisation.Pie", 5, "...init (" + executionTime + "ms)")
};
jarvis.visualisation.report.OverviewPie.prototype.fetch = function(sender, container) {
  if(!sender) {
    sender = jarvis.visualisation.report.OverviewPie
  }
  var _this = sender;
  var startdate = jarvis.visualisation.picker.DateBox.getDate().base_fromdate;
  var enddate = jarvis.visualisation.picker.DateBox.getDate().base_todate;
  if(_this.DateBox.comparePeriod) {
    var compare_startdate = jarvis.visualisation.picker.DateBox.getDate().compare_fromdate;
    var compare_enddate = jarvis.visualisation.picker.DateBox.getDate().compare_todate
  }
  var _dimensions = $(container).attr("data-dimensions");
  var _dimensionslist = _dimensions;
  if(!_dimensions) {
    return""
  }
  _dimensions = _dimensions.split(",");
  $(_dimensions).each(function(index, item) {
    var dindex = -1;
    $(jarvis.dataaccess.dimensions).each(function(mi, mo) {
      if(mo.Name == $.trim(item)) {
        dindex = mi
      }
    });
    _dimensions[index] = jarvis.dataaccess.dimensions[dindex];
    _this.dimensions.push(_dimensions[index])
  });
  $(jarvis.dataaccess.dimensions).each(function(index, item) {
    if(_dimensions.indexOf(item.Name) > -1) {
      _this.dimensions[_dimensions.indexOf(item.Name)] = item
    }
  });
  var _metrics = "";
  if(_this.metrics.length > 0) {
    _metrics = _this.metrics[0].Name;
    _this.metrics.splice(0, _this.metrics.length)
  }else {
    _metrics = $(container).attr("data-metrics")
  }
  var _metricslist = _metrics;
  if(!_metrics) {
    return""
  }
  _metrics = _metrics.split(",");
  $(_metrics).each(function(index, item) {
    var mindex = -1;
    $(jarvis.dataaccess.metrics).each(function(mi, mo) {
      if(mo.Name == $.trim(item)) {
        mindex = mi
      }
    });
    _metrics[index] = jarvis.dataaccess.metrics[mindex];
    _this.metrics.push(_metrics[index])
  });
  $(jarvis.dataaccess.metrics).each(function(index, item) {
    if(_metrics.indexOf(item.Name) > -1) {
      _this.metrics[_metrics.indexOf(item.Name)] = item
    }
  });
  if(_this.metrics.length == 0) {
    return""
  }
  var queryOptions = [];
  var _queryOptions = {id:"primary", FromDate:jarvis.date.formatDate(startdate, "yyyy-mm-dd hh:nn:ss.000"), ToDate:jarvis.date.formatDate(enddate, "yyyy-mm-dd hh:nn:ss.999"), Dimensions:_dimensionslist, Metrics:_metricslist, Resolution:_this.Resolution, omitDate:true, Filter:jarvis.visualisation.dashboard.globalfilter, sortKey:_metrics[_metrics.length - 1].Name, sortDir:"DESC"};
  queryOptions.push(_queryOptions);
  if(_this.DateBox.comparePeriod) {
    _queryOptions = {id:"compare_primary", FromDate:jarvis.date.formatDate(compare_startdate, "yyyy-mm-dd hh:nn:ss.000"), ToDate:jarvis.date.formatDate(compare_enddate, "yyyy-mm-dd hh:nn:ss.999"), Dimensions:_dimensionslist, Metrics:_metricslist, Resolution:_this.Resolution, omitDate:true, Filter:jarvis.visualisation.dashboard.globalfilter, sortKey:_metrics[_metrics.length - 1].Name, sortDir:"DESC"};
    queryOptions.push(_queryOptions)
  }
  jarvis.dataaccess.multifetch(_this, "/engine/Query.svc/fetch", queryOptions, function(sender, data, error) {
    var series = [];
    $(data).each(function(index, item) {
      try {
        var result = item.data.Result;
        var request = item.data.Request;
        var _data = item.data.Result.Rows;
        series.push(item.data.Result)
      }catch(ex) {
      }
    });
    _this.update(sender, _dimensions, _metrics, series, container)
  })
};
jarvis.visualisation.report.OverviewPie.prototype.update = function(sender, dimensions, metrics, series, container) {
  var _this = sender;
  if(!series[0]) {
    return
  }
  var _itemcount = $(container).attr("data-limit");
  if(_itemcount) {
    _this.itemCount = _itemcount
  }
  var $container = $($(container).find(".piechart"));
  var columns = series[0].Columns;
  var data = series[0].Rows;
  var _totalsum = 0;
  $(data).each(function(index, row) {
    _totalsum += parseFloat(row.Values[row.Values.length - 1])
  });
  var chart = new Highcharts.Chart({chart:{animation:true, renderTo:$container.get(0), backgroundColor:null, plotBackgroundColor:null, plotBorderWidth:null, plotShadow:false, type:"pie", width:"230", height:"230", marginTop:0, marginLeft:0, marginRight:5, marginBottom:0, spacingLeft:0, spacingTop:0, spacingRight:0, spacingBottom:0}, title:{text:null}, tooltip:{formatter:function() {
    return"<b>" + this.point.name + "</b><br/>" + this.series.name + ": " + jarvis.string.formatNumber(this.percentage, 2) + " %"
  }}, legend:{enabled:false}, credits:{enabled:false}, exporting:{enabled:false}, plotOptions:{pie:{showInLegend:true, size:"100%", animation:true}}, series:[{name:function() {
    var name = "";
    name = columns[columns.length - 1].Name;
    return name
  }(), type:"pie", data:function() {
    var result = [];
    var sum = 0;
    $(data).each(function(index, item) {
      if(index < _this.itemCount) {
        var name = "";
        $(columns).each(function(ci, co) {
          if(co.AggregationType) {
          }else {
            name += columns[ci].Name + ": " + item.FormattedValues[ci]
          }
        });
        name = name.substring(0, name.length - 5);
        var y = 0;
        y = item.Values[item.Values.length - 1] / _totalsum * 100;
        sum += y;
        result.push({name:name, y:y, color:jarvis.colors[index]})
      }
    });
    if(100 - Math.floor(sum) > 0) {
      var name = "Other";
      var y = 100 - sum;
      result.push({name:name, y:y, color:jarvis.colors[11]})
    }
    return result
  }(), dataLabels:{formatter:function() {
    return this.y > 5 ? this.point.name : null
  }, color:"white", distance:-30, enabled:false}}, {name:function() {
    var name = "inner";
    name = columns[columns.length - 1].Name;
    return name
  }(), type:"pie", innerSize:"70%", data:function() {
    var result = [];
    if(series.length > 1) {
      var sum = 0;
      var _totalsum_compare = 0;
      var compare_data = series[1].Rows;
      $(compare_data).each(function(index, row) {
        _totalsum_compare += parseFloat(row.Values[row.Values.length - 1])
      });
      $(data).each(function(datai, datao) {
        if(datai < _this.itemCount) {
          var key = datao.FormattedValues[0];
          $(compare_data).each(function(index, item) {
            if(item.FormattedValues[0] == key) {
              var name = "";
              $(columns).each(function(ci, co) {
                if(co.AggregationType) {
                }else {
                  name += columns[ci].Name + ": " + item.FormattedValues[ci]
                }
              });
              var y = 0;
              y = item.Values[item.Values.length - 1] / _totalsum_compare * 100;
              sum += y;
              result.push({name:name, y:y})
            }
          })
        }
      });
      if(100 - Math.floor(sum) > 0) {
        var name = "Other";
        var y = 100 - sum;
        result.push({name:name, y:y, color:jarvis.colors[11]})
      }
    }
    return result
  }(), dataLabels:{formatter:function() {
    return this.y > 1 ? "<b>" + this.point.name + ":</b> " + this.y + "%" : null
  }, enabled:false}}]});
  var sum = 0;
  var result = [];
  var shownsum = 0;
  var totalsum = 0;
  $(data).each(function(index, item) {
    if(index < _this.itemCount) {
      var name = "";
      $(columns).each(function(ci, co) {
        if(co.AggregationType) {
        }else {
          name += item.FormattedValues[ci] + "<br/>"
        }
      });
      name = name.substring(0, name.length - 5);
      var y = 0;
      y = item.Values[item.Values.length - 1] / _totalsum * 100;
      sum += y;
      shownsum += parseFloat(item.Values[item.Values.length - 1]);
      result.push({seriesname:columns[columns.length - 1].Name, name:name, y:y, value:item.FormattedValues[item.Values.length - 1], color:jarvis.colors[index]})
    }
    totalsum += parseFloat(item.Values[item.Values.length - 1])
  });
  if(totalsum - shownsum > 0) {
    var name = "Other";
    var y = 100 - sum;
    result.push({name:name, y:y, color:jarvis.colors[11], value:jarvis.string.formatNumber(totalsum - shownsum, 0, true), seriesname:columns[columns.length - 1].Name})
  }
  var compare_shownsum = 0;
  var compare_totalsum = 0;
  var $legend = $($(container).find(".legend"));
  $legend.empty();
  if(series.length > 1) {
    var compare_data = series[1].Rows;
    result = [];
    $(data).each(function(index, item) {
      if(index < _this.itemCount) {
        var key = item.FormattedValues[0];
        $(compare_data).each(function(cindex, citem) {
          if(citem.FormattedValues[0] == key) {
            var base_value = item.Values[1];
            var compare_value = citem.Values[1];
            var diff = percentageChange(compare_value, base_value);
            compare_shownsum += parseFloat(citem.Values[citem.Values.length - 1]);
            result.push({name:key, base:item.FormattedValues[1], compare:citem.FormattedValues[1], diff:diff})
          }
        })
      }
      compare_totalsum += parseFloat(item.Values[item.Values.length - 1])
    });
    $(result).each(function(index, item) {
      var _class = "";
      var metric = series[0].Columns[1];
      if(metric.RatioDirection == -1 && item.diff < 0) {
        _class = "positive"
      }
      if(metric.RatioDirection == -1 && item.diff > 0) {
        _class = "negative"
      }
      if(metric.RatioDirection == 1 && item.diff > 0) {
        _class = "positive"
      }
      if(metric.RatioDirection == 1 && item.diff < 0) {
        _class = "negative"
      }
      if(_class == "") {
        _class = "neutral"
      }
      var $div = $('<div class="legenditem"></div>');
      $div.append('<div class="caption"><div class="colorbox" style="background-color: ' + jarvis.colors[index] + '"></div>' + '<span class="' + _class + '">' + jarvis.string.formatNumber(item.diff, 2) + "%</span> " + item.name + "</div>" + '<div class="summary">' + item.base + " vs " + item.compare + "</div>" + "");
      $legend.append($div)
    })
  }else {
    $(result).each(function(index, item) {
      var $div = $('<div class="legenditem"></div>');
      $div.append('<div class="caption"><div class="colorbox" style="background-color: ' + item.color + '"></div>' + jarvis.string.formatNumber(item.y, 2) + "% " + item.name + "</div>" + '<div class="summary">' + item.value + " " + item.seriesname + "</div>" + "");
      $legend.append($div)
    })
  }
};
jarvis.visualisation.report.OverviewPie.prototype.draw = function(container) {
  var _this = this;
  var title = "TITLE";
  var dimensions = "DIMENSION";
  var metrics = this.default_subcaption;
  if($(container).attr("data-title")) {
    title = $(container).attr("data-title")
  }
  if($(container).attr("data-dimensions")) {
    dimensions = $(container).attr("data-dimensions")
  }
  if($(container).attr("data-metrics")) {
    metrics = $(container).attr("data-metrics")
  }
  var $html = $('<div class="wrapper"></div>');
  if($($(container).parent()).attr("class").indexOf("span5") > -1) {
    $html.append('<div class="row-fluid">' + '<div class="header">' + '<div class="settings"></div>' + '<div class="move"></div>' + "<h3>" + title + "</h3>" + "</div>" + '<div class="content">' + '<table class="table" ><tr class="row row-fluid">' + '<td class="span6"><div class="piechart"></div></td>' + '<td class="span6"><div class="legend"></div></td>' + "</tr></table>" + "</div>" + "</div>")
  }else {
    if($($(container).parent()).attr("class").indexOf("span") == -1) {
      $html.append('<div class="">' + '<div class="content">' + '<table class="table" ><tr class="row row-fluid">' + '<td class="span6"><div class="piechart"></div></td>' + '<td class="span6"><div class="legend"></div></td>' + "</tr></table>" + "</div>" + "</div>")
    }else {
      $html.append('<div class="row-fluid">' + '<div class="header">' + '<div class="settings"></div>' + '<div class="move"></div>' + "<h3>" + title + "</h3>" + "</div>" + '<div class="content">' + '<table class="table" >' + '<tr class="row row-fluid"><td class="span12"><div class="piechart"></div></td></tr>' + '<tr class="row row-fluid"><td class="span12" style="padding-left:10px;"><div class="legend"></div></td></table>' + "</table>" + "</div>" + "</div>")
    }
  }
  $(container).append($html)
};
jarvis.debug.log("INFO", "Jarvis.Dashboard.Visualisation.Pie", 6, "JS source loaded");
jarvis.provide("jarvis.visualisation.report.SummaryTable");
jarvis.require("jarvis.debug");
jarvis.require("jarvis.date");
jarvis.require("jarvis.string");
jarvis.require("jarvis.visualisation.report");
jarvis.visualisation.report.SummaryTable = function(options) {
  var start = (new Date).getMilliseconds();
  this._this = this;
  this.options = options;
  this.default_caption = "Right now";
  this.default_subcaption = "Events per Second";
  this.default_useAverage = true;
  this.key = "";
  this.initialized = false;
  this.gettingBackData = false;
  this.initialCallbacks = [];
  this.initialTimestamp = null;
  this.Resolution = "Day";
  this.containers = [];
  jarvis.objects.Dimensions.List();
  jarvis.objects.Metrics.List();
  var executionTime = (new Date).getMilliseconds() - start
};
jarvis.visualisation.report.SummaryTable.prototype.init = function(options, container) {
  var _this = this;
  var start = (new Date).getMilliseconds();
  this._this = this;
  this.options = options;
  this.containers = this.containers || [];
  this.dimensions = [];
  this.metrics = [];
  this.DateBox = jarvis.visualisation.picker.DateBox;
  $(jarvis.realtime).bind("filterchange", function(e) {
  });
  var matchedContainers = null;
  if(container) {
    matchedContainers = $(container)
  }else {
    matchedContainers = $(".jarvis.report.summarytable")
  }
  if(matchedContainers.length == 0) {
    return
  }
  $(matchedContainers).each(function(index, item) {
    if(!$(this).parent().hasClass("prettyprint")) {
      jarvis.debug.log("INFO", "jarvis.visualisation.report.SummaryTable", 6, "Applying to container ('" + this.id + "')");
      var _metrics = $(item).attr("data-metrics");
      if(!_metrics) {
        return
      }
      _this.itemCount = $(item).attr("data-limit");
      if(!_this.itemCount) {
        _this.itemCount = 10
      }
      _metrics = _metrics.split(",");
      $(_metrics).each(function(index, item) {
        _metrics[index] = $.trim(_metrics[index]);
        _this.metrics.push(_metrics[index])
      });
      $(jarvis.dataaccess.metrics).each(function(index, item) {
        if(_metrics.indexOf(item.Name) > -1) {
          _this.metrics[_metrics.indexOf(item.Name)] = item
        }
      });
      $(this).bind("data", function(evt, ret) {
        ret.data = $(this).data().data
      });
      $(this).bind("click", function(evt) {
        $(this).trigger("clicked", $(this).data().data)
      });
      $(jarvis.visualisation.report).bind("filter", function(filter) {
        _this.fetch(_this)
      });
      $(item).empty();
      _this.draw(item);
      $(this).find(".settings").off("click");
      $(this).find(".settings").on("click", function(e) {
        jarvis.getDashboard().showEditWidget({_this:jarvis.getDashboard(), container:jarvis.getDashboard().container, addNew:false, widgetID:$(item).attr("data-widgetid"), sender:_this, sendercontainer:item})
      });
      _this.containers.push(item)
    }
  });
  $(_this.DateBox).bind("datechange", function() {
    $(_this.containers).each(function(i, container) {
      _this.fetch(_this, container)
    })
  });
  $(".reportlist li")[0].click();
  var executionTime = (new Date).getMilliseconds() - start;
  jarvis.debug.log("INFO", "Jarvis.Visualisation.Realtime.MetricBox", 5, "...init (" + executionTime + "ms)")
};
jarvis.visualisation.report.SummaryTable.prototype.buildReportList = function(sender, container) {
  var _this = sender;
  var report = jarvis.objects.Reports.Get(null, {id:jarvis.visualisation.reportWrapper.reportID});
  var catforlookup = report.Category.Name;
  var categories = _.groupBy(jarvis.objects.Reports, function(obj) {
    if(!obj.Category) {
      return"(not set)"
    }
    return obj.Category.Name
  });
  categories = _.sortBy(categories, function(obj) {
    if(!obj[0].Category) {
      return-1
    }
    return obj[0].Category.Ordinal
  });
  var $html = $('<div><table class="thelist"></table></div>');
  var $table = $($html.find(".thelist"));
  var firstth = true;
  var firstreport = true;
  _.each(categories, function(category, i) {
    if((category[0].Category.Name == catforlookup || catforlookup == "(not set)") && category[0].Category.Name != "(not set)") {
      $table.append("<tr><th " + (firstth ? 'style="padding-top:0;"' : "") + ">" + category[0].Category.Name + "</th></tr>");
      var $tr = $("<tr><td></td></tr>");
      $tr.find("td").append("<ul></ul>");
      _.each(category, function(lreport, i2) {
        if(lreport.ID != report.ID) {
          var $li = null;
          if(firstth && firstreport) {
            $li = $('<li class="active"><div class="name">' + lreport.Name + '</div><div class="expand"></div>&nbsp;</li>')
          }else {
            $li = $('<li class=""><div class="name">' + lreport.Name + '</div><div class="expand"></div>&nbsp;</li>')
          }
          $li.off("click");
          $li.on("click", function(e) {
            $(".thelist li.active").removeClass("active");
            $(this).addClass("active");
            var container = _this.containers[0];
            $(container).attr("data-dimensions", lreport.Tabs[0].Dimensions[0].Name);
            $(container).attr("data-metrics", lreport.Tabs[0].MetricGroups[0].Metrics[0].Name);
            _this.fetch(_this, container);
            $(".seefullreport").off("click");
            $(".seefullreport").on("click", function(e) {
              $(jarvis).trigger("reportchange", lreport.ID)
            })
          });
          $tr.find("ul").append($li);
          if(firstreport) {
            firstreport = false
          }
        }
      });
      $table.append($tr);
      if(firstth) {
        firstth = false
      }
    }
  });
  $(container).find(".reportlist").append($html)
};
jarvis.visualisation.report.SummaryTable.prototype.fetch = function(sender, container) {
  if(!sender) {
    sender = jarvis.visualisation.report.SummaryTable
  }
  var _this = sender;
  var startdate = jarvis.visualisation.picker.DateBox.getDate().base_fromdate;
  var enddate = jarvis.visualisation.picker.DateBox.getDate().base_todate;
  if(_this.DateBox.comparePeriod) {
    var compare_startdate = jarvis.visualisation.picker.DateBox.getDate().compare_fromdate;
    var compare_enddate = jarvis.visualisation.picker.DateBox.getDate().compare_todate
  }
  var _dimensions = $(container).attr("data-dimensions");
  var _dimensionslist = _dimensions;
  if(!_dimensions) {
    return""
  }
  _dimensions = _dimensions.split(",");
  $(_dimensions).each(function(index, item) {
    var dindex = -1;
    $(jarvis.dataaccess.dimensions).each(function(mi, mo) {
      if(mo.Name == $.trim(item)) {
        dindex = mi
      }
    });
    _dimensions[index] = jarvis.dataaccess.dimensions[dindex];
    _this.dimensions.push(_dimensions[index])
  });
  $(jarvis.dataaccess.dimensions).each(function(index, item) {
    if(_dimensions.indexOf(item.Name) > -1) {
      _this.dimensions[_dimensions.indexOf(item.Name)] = item
    }
  });
  var _metrics = $(container).attr("data-metrics");
  var _metricslist = _metrics;
  if(!_metrics) {
    return""
  }
  _metrics = _metrics.split(",");
  $(_metrics).each(function(index, item) {
    var mindex = -1;
    $(jarvis.dataaccess.metrics).each(function(mi, mo) {
      if(mo.Name == $.trim(item)) {
        mindex = mi
      }
    });
    _metrics[index] = jarvis.dataaccess.metrics[mindex];
    _this.metrics.push(_metrics[index])
  });
  $(jarvis.dataaccess.metrics).each(function(index, item) {
    if(_metrics.indexOf(item.Name) > -1) {
      _this.metrics[_metrics.indexOf(item.Name)] = item
    }
  });
  if(!_metrics) {
    return""
  }
  var queryOptions = [];
  var _queryOptions = {id:"primary", FromDate:jarvis.date.formatDate(startdate, "yyyy-mm-dd hh:nn:ss.000"), ToDate:jarvis.date.formatDate(enddate, "yyyy-mm-dd hh:nn:ss.999"), Dimensions:_dimensionslist, Metrics:_metricslist, Resolution:_this.Resolution, omitDate:true, Filter:jarvis.visualisation.dashboard.globalfilter, sortKey:_metrics[_metrics.length - 1].Name, sortDir:"DESC", Limit:_this.itemCount};
  queryOptions.push(_queryOptions);
  if(_this.DateBox.comparePeriod) {
    _queryOptions = {id:"compare_primary", FromDate:jarvis.date.formatDate(compare_startdate, "yyyy-mm-dd hh:nn:ss.000"), ToDate:jarvis.date.formatDate(compare_enddate, "yyyy-mm-dd hh:nn:ss.999"), Dimensions:_dimensionslist, Metrics:_metricslist, Resolution:_this.Resolution, omitDate:true, Filter:jarvis.visualisation.dashboard.globalfilter, sortKey:_metrics[_metrics.length - 1].Name, sortDir:"DESC", Limit:_this.itemCount};
    queryOptions.push(_queryOptions)
  }
  jarvis.dataaccess.multifetch(_this, "/engine/Query.svc/fetch", queryOptions, function(sender, data, error) {
    var series = [];
    $(data).each(function(index, item) {
      try {
        var result = item.data.Result;
        var request = item.data.Request;
        var _data = item.data.Result.Rows;
        series.push(item.data.Result)
      }catch(ex) {
      }
    });
    if(_this.DateBox.comparePeriod == false) {
      _this.update(sender, _dimensions, _metrics, series, container)
    }else {
      _this.updateCompare(sender, _dimensions, _metrics, series, container)
    }
  })
};
jarvis.visualisation.report.SummaryTable.prototype.update = function(sender, dimensions, metrics, series, container) {
  var _this = sender;
  if(!series[0]) {
    return
  }
  var $table = $($(container).find(".table"));
  $table.empty();
  var $tr = $("<tr></tr>");
  $(series[0].Columns).each(function(index, col) {
    var $th = $('<th class="nopaddingtop">' + col.Name + "</th>");
    if(col.AggregationType) {
      $th.addClass("metric")
    }else {
      $th.addClass("dimension")
    }
    $tr.append($th)
  });
  var $th = $('<th class="nopaddingtop">% ' + series[0].Columns[1].Name + "</th>");
  $th.addClass("dimension");
  $tr.append($th);
  $table.append($tr);
  var totalsum = 0;
  $(series[0].Rows).each(function(index, row) {
    totalsum += parseFloat(row.Values[1])
  });
  $(series[0].Rows).each(function(index, row) {
    var $tr = $("<tr></tr>");
    $(row.FormattedValues).each(function(i, v) {
      var $td = $("<td>" + v + "</td>");
      if(series[0].Columns[i].AggregationType) {
        $td.addClass("metric")
      }else {
        $td.addClass("dimension")
      }
      $tr.append($td)
    });
    var $td = $('<td class="" style="min-width: 100px;"></td>');
    $td.addClass("dimension");
    var v = row.Values[1] / totalsum * 100;
    var width = Math.ceil(v) + "%";
    var $_bar = $('<div class="barwrapper"><span class="barvalue">' + jarvis.string.formatNumber(v, 2) + '%</span><div class="percentagebar" style="width:' + width + '"></div>' + '<td class="percentagecaption"></div>');
    $td.html($_bar);
    $tr.append($td);
    $table.append($tr)
  })
};
jarvis.visualisation.report.SummaryTable.prototype.updateCompare = function(sender, dimensions, metrics, series, container) {
  var _this = sender;
  if(!series[0]) {
    return
  }
  var datebox = _this.DateBox;
  var $table = $($(container).find(".table"));
  $table.empty();
  var $tr = $("<tr></tr>");
  $(series[0].Columns).each(function(index, col) {
    var $th = $('<th class="nopaddingtop">' + col.Name + "</th>");
    if(col.AggregationType) {
      $th.addClass("metric")
    }else {
      $th.addClass("dimension")
    }
    $tr.append($th)
  });
  $table.append($tr);
  $(series[0].Rows).each(function(index, row) {
    var $tr = $("<tr></tr>");
    var lookupdimension = "";
    var base_value = 0;
    var compare_value = 0;
    $(row.FormattedValues).each(function(i, v) {
      if(series[0].Columns[i].AggregationType) {
        var $td = $("<td></td>");
        $td.addClass("metric empty")
      }else {
        var $td = $("<td>" + v + "</td>");
        $td.addClass("dimension strong");
        lookupdimension = v
      }
      $tr.append($td)
    });
    $table.append($tr);
    var $tr = $("<tr></tr>");
    $(row.FormattedValues).each(function(i, v) {
      if(series[0].Columns[i].AggregationType) {
        var $td = $("<td>" + v + "</td>");
        $td.addClass("metric empty")
      }else {
        var $td = $('<td class="daterange">' + datebox.formatDate(datebox.getDate().base_fromdate) + " - " + datebox.formatDate(datebox.getDate().base_todate) + "</td>");
        $td.addClass("dimension")
      }
      $tr.append($td)
    });
    $table.append($tr);
    var $tr = $("<tr></tr>");
    $(row.FormattedValues).each(function(i, v) {
      if(series[0].Columns[i].AggregationType) {
        var $td;
        $(series[1].Rows).each(function(compareindex, comparerow) {
          if(comparerow.FormattedValues[0] == lookupdimension) {
            $td = $("<td>" + comparerow.FormattedValues[i] + "</td>")
          }
        });
        if($td) {
          $td.addClass("metric")
        }else {
          $td = $("<td>N/A</td>");
          $td.addClass("metric")
        }
      }else {
        var $td = $('<td class="daterange">' + datebox.formatDate(datebox.compare_fromdate) + " - " + datebox.formatDate(datebox.compare_todate) + "</td>");
        $td.addClass("dimension")
      }
      $tr.append($td)
    });
    $table.append($tr);
    var $tr = $("<tr></tr>");
    base_value = 0;
    compare_value = 0;
    $(row.Values).each(function(i, v) {
      if(series[0].Columns[i].AggregationType) {
        var $td;
        base_value = v;
        $(series[1].Rows).each(function(compareindex, comparerow) {
          if(comparerow.FormattedValues[0] == lookupdimension) {
            compare_value = comparerow.Values[i]
          }
        });
        if(compare_value > 0) {
          var ratio = percentageChange(compare_value, base_value);
          ratio = jarvis.string.formatNumber(ratio, 2);
          $td = $("<td>" + ratio + "%</td>");
          $td.addClass("metric strong");
          var _class = "";
          var metric = series[0].Columns[i];
          if(metric.RatioDirection == -1 && ratio < 0) {
            _class = "positive"
          }
          if(metric.RatioDirection == -1 && ratio > 0) {
            _class = "negative"
          }
          if(metric.RatioDirection == 1 && ratio > 0) {
            _class = "positive"
          }
          if(metric.RatioDirection == 1 && ratio < 0) {
            _class = "negative"
          }
          if(_class == "") {
            _class = "neutral"
          }
          $td.addClass(_class)
        }else {
          $td = $("<td>N/A</td>");
          $td.addClass("metric strong");
          var _class = "neutral";
          $td.addClass(_class)
        }
      }else {
        var $td = $("<td>% Change</td>");
        $td.addClass("dimension strong")
      }
      $tr.append($td)
    });
    $table.append($tr)
  })
};
jarvis.visualisation.report.SummaryTable.prototype.draw = function(container) {
  var _this = this;
  var title = "Widget Title";
  var dimensions = "DIMENSION";
  var metrics = this.default_subcaption;
  if($(container).attr("data-title")) {
    title = $(container).attr("data-title")
  }
  if($(container).attr("data-dimensions")) {
    dimensions = $(container).attr("data-dimensions")
  }
  if($(container).attr("data-metrics")) {
    metrics = $(container).attr("data-metrics")
  }
  var $html = $('<div class="wrapper"><div class="reportlist"></div><div class="reporttable"></div></div>');
  $html.find(".reporttable").append('<div class="">' + "</div>" + '<div class="content">' + '<table class="table table-striped"></table>' + '<div class="seefullreport">view full report</div>' + "</div>" + "</div>");
  $();
  _this.buildReportList(_this, $html);
  $(container).append($html)
};
jarvis.debug.log("INFO", "Jarvis.Visualisation.Realtime.MetricBox", 6, "JS source loaded");
jarvis.provide("jarvis.visualisation.report.Table");
jarvis.require("jarvis.debug");
jarvis.require("jarvis.date");
jarvis.require("jarvis.string");
jarvis.require("jarvis.visualisation.report");
jarvis.visualisation.report.Table = function(options, container) {
  var _this = this;
  var start = (new Date).getMilliseconds();
  this._this = this;
  this.ChartType = "line";
  this.Resolution = "Day";
  this.primaryMetric = null;
  this.secondaryMetric = null;
  this.Filters = [];
  this.drilldownlevel = 0;
  this.isother = false;
  this.levels = [];
  this.sortColumnIndex = -1;
  this.ColumnIndex = -1;
  this.compareColumnIndex = -1;
  this.sortDir = "DESC";
  this.currentPage = 1;
  this.pageSize = 10;
  this.mode = "table";
  this.dimensions = [];
  this.metrics = [];
  this.Container = null;
  this.Filters = [];
  this.colors = jarvis.colors;
  this.DateBox = jarvis.visualisation.picker.DateBox;
  this.initialLoad = 0;
  jarvis.objects.Dimensions.List();
  jarvis.objects.Metrics.List();
  _this.getState(_this);
  var executionTime = (new Date).getMilliseconds() - start;
  jarvis.debug.log("INFO", "jarvis.visualisation.report.Table", 5, "...init (" + executionTime + "ms)");
  return this
};
jarvis.visualisation.report.Table.prototype.init = function(options, container) {
  var _this = this;
  var start = (new Date).getMilliseconds();
  var matchedContainers = null;
  if(container) {
    matchedContainers = $(container)
  }else {
    matchedContainers = $(".jarvis.report.jtable")
  }
  if(matchedContainers.length == 0) {
    return
  }
  this.options = $.extend({pageSize:10, minSelected:0, maxSelected:3, defaultSelected:0}, options);
  _this.pageSize = this.options.pageSize;
  $(matchedContainers).each(function(index, item) {
    if(!$(this).parent().hasClass("prettyprint")) {
      jarvis.debug.log("INFO", "jarvis.visualisation.report.Table", 6, "Applying to container ('" + this.id + "')");
      _this.Container = item;
      if(_this.dimensions.length == 0) {
        var _dimensions = $(item).attr("data-dimensions");
        if(!_dimensions) {
          return
        }
        try {
          _this.levels = eval(_dimensions);
          $(_this.levels).each(function(index, level) {
            $(level).each(function(index2, dimension) {
              $(jarvis.objects.Dimensions).each(function(index3, item) {
                if(dimension == item.Name) {
                  if(index == _this.drilldownlevel) {
                    _this.dimensions.push(item)
                  }
                  _this.levels[index][index2] = item
                }
              })
            })
          })
        }catch(e) {
          _this.levels = [];
          _this.levels.push([_dimensions]);
          _dimensions = _dimensions.split(",");
          $(_dimensions).each(function(index, item) {
            _dimensions[index] = $.trim(_dimensions[index]);
            _this.dimensions.push(_dimensions[index])
          });
          $(jarvis.objects.Dimensions).each(function(index, item) {
            if(_dimensions.indexOf(item.Name) > -1) {
              _this.dimensions[_dimensions.indexOf(item.Name)] = item
            }
          })
        }
      }else {
      }
      var _metrics = $(item).attr("data-metrics");
      if(!_metrics) {
        return
      }
      _metrics = _metrics.split(",");
      $(_metrics).each(function(index, item) {
        _metrics[index] = $.trim(_metrics[index]);
        _this.metrics.push(_metrics[index])
      });
      $(jarvis.objects.Metrics).each(function(index, item) {
        if(_metrics.indexOf(item.Name) > -1) {
          _this.metrics[_metrics.indexOf(item.Name)] = item
        }
      });
      $(item).empty();
      _this.draw(item);
      _this.fetch(_this, item);
      $(_this).unbind("data");
      $(_this).bind("data", function(evt, ret) {
        ret.data = $(_this).data().data
      });
      $(_this).unbind("click");
      $(_this).bind("click", function(evt) {
        $(_this).trigger("clicked", $(this).data().data)
      });
      $(_this.DateBox).bind("datechange", function() {
        _this.fetch(_this);
        if(_this.DateBox.comparePeriod) {
          $("button.btn_pie").attr("disabled", "true");
          $("button.btn_perf").attr("disabled", "true")
        }else {
          $("button.btn_pie").removeAttr("disabled");
          $("button.btn_perf").removeAttr("disabled")
        }
      });
      $(jarvis.visualisation.report).bind("filter", function(filter) {
        _this.fetch(_this)
      });
      _this.destroy = function() {
        $(_this.DateBox).unbind("datechange");
        $(_this).unbind("data");
        $(_this).unbind("click");
        $(jarvis.visualisation.report).unbind("filter");
        try {
          jarvis.state[_this.uid()].Filters = []
        }catch(e) {
        }
      }
    }
  });
  var executionTime = (new Date).getMilliseconds() - start;
  jarvis.debug.log("INFO", "jarvis.visualisation.report.Table", 5, "...init (" + executionTime + "ms)");
  return this
};
jarvis.visualisation.report.Table.prototype.fetch = function(sender, container) {
  if(!sender) {
    sender = jarvis.visualisation.report.Table
  }
  var _this = sender;
  _this.currentPage = 1;
  var startdate = jarvis.visualisation.picker.DateBox.getDate().base_fromdate;
  var enddate = jarvis.visualisation.picker.DateBox.getDate().base_todate;
  if(_this.DateBox.comparePeriod) {
    var compare_startdate = jarvis.visualisation.picker.DateBox.getDate().compare_fromdate;
    var compare_enddate = jarvis.visualisation.picker.DateBox.getDate().compare_todate
  }
  var dimensionslist = "";
  $(_this.dimensions).each(function(index, item) {
    dimensionslist += item.Name + ", "
  });
  dimensionslist = dimensionslist.substring(0, dimensionslist.length - 2);
  var metricslist = "";
  $(_this.metrics).each(function(index, item) {
    metricslist += item.Name + ", "
  });
  metricslist = metricslist.substring(0, metricslist.length - 2);
  var queryOptions = [];
  var _queryOptions = {id:"primary", FromDate:jarvis.date.formatDate(startdate, "yyyy-mm-dd hh:nn:ss.000"), ToDate:jarvis.date.formatDate(enddate, "yyyy-mm-dd hh:nn:ss.999"), Dimensions:dimensionslist, Metrics:metricslist, Resolution:_this.Resolution, omitDate:true, Filter:jarvis.visualisation.report.globalfilter, SortKey:_this.metrics[0].Name, SortDir:"DESC"};
  queryOptions.push(_queryOptions);
  if(_this.DateBox.comparePeriod) {
    _queryOptions = {id:"compare_primary", FromDate:jarvis.date.formatDate(compare_startdate, "yyyy-mm-dd hh:nn:ss.000"), ToDate:jarvis.date.formatDate(compare_enddate, "yyyy-mm-dd hh:nn:ss.999"), Dimensions:dimensionslist, Metrics:metricslist, Resolution:_this.Resolution, omitDate:true, Filter:jarvis.visualisation.report.globalfilter, SortKey:_this.metrics[0].Name, SortDir:"DESC"};
    queryOptions.push(_queryOptions)
  }
  jarvis.dataaccess.multifetch(_this, "/engine/Query.svc/fetch", queryOptions, function(sender, data, error) {
    var series = [];
    $(data).each(function(index, item) {
      var result = item.data.Result;
      var request = item.data.Request;
      var _data = item.data.Result.Rows;
      if(_this.initialLoad == 0) {
        _this.initialLoad = 1;
        if(_this.options.defaultSelected > 0) {
          for(var i = 0;i < _this.options.defaultSelected;i++) {
            var filter = dimensionslist + "=" + [_data[i].Values[0]] + "[AND]";
            $(jarvis.visualisation.report).trigger("addpartialfilter-quick", filter);
            _this.Filters.push(filter)
          }
          $(jarvis.visualisation.report).trigger("filter")
        }
      }
      series.push({dimensions:_this.dimensions, metrics:_this.metrics, data:result})
    });
    sender.datatable = series;
    _this.update(sender, dimensionslist, metricslist, series)
  })
};
jarvis.visualisation.report.Table.prototype.update = function(sender) {
  var _this = sender;
  var series = _this.datatable[0];
  var series_compare;
  var _data_compare;
  var _data_compare_toshow;
  if(_this.DateBox.comparePeriod) {
    series_compare = _this.datatable[1];
    _data_compare = series_compare.data.Rows
  }
  var _columns = series.data.Columns;
  var _allcolumns = _columns;
  var _data = series.data.Rows;
  var _totalsum_base = 0;
  var _totalsumcompare_base = 0;
  var _totalsum = 0;
  var _totalsumcompare = 0;
  var $table = $($(_this.Container).find(".table"));
  $table.find("tr").remove();
  if(_this.sortColumnIndex == -1) {
    $(_columns).each(function(index, column) {
      if(column.AggregationType) {
      }else {
        _this.sortColumnIndex = index + 1
      }
    })
  }
  if(_this.ColumnIndex == -1) {
    $(_columns).each(function(index, column) {
      if(column.AggregationType) {
      }else {
        _this.ColumnIndex = index + 1
      }
    });
    _this.compareColumnIndex = _this.ColumnIndex
  }
  _data = $(_data).sort(function(a, b) {
    var valuea = a.Values[_this.sortColumnIndex];
    var valueb = b.Values[_this.sortColumnIndex];
    if(_columns[_this.sortColumnIndex].AggregationType) {
      valuea = parseFloat(valuea);
      valueb = parseFloat(valueb)
    }
    if(_this.sortDir == "DESC") {
      return valuea < valueb ? 1 : -1
    }else {
      return valuea > valueb ? 1 : -1
    }
  });
  _data_compare = $(_data_compare).sort(function(a, b) {
    var valuea = a.Values[_this.sortColumnIndex];
    var valueb = b.Values[_this.sortColumnIndex];
    if(_columns[_this.sortColumnIndex].AggregationType) {
      valuea = parseFloat(valuea);
      valueb = parseFloat(valueb)
    }
    if(_this.sortDir == "DESC") {
      return valuea < valueb ? 1 : -1
    }else {
      return valuea > valueb ? 1 : -1
    }
  });
  var _datatoshow = _data;
  _datatoshow = _datatoshow.slice((_this.currentPage - 1) * _this.pageSize, _this.currentPage * _this.pageSize);
  _data_compare_toshow = _data_compare;
  if(_this.mode == "pie" || _this.mode == "perf" || _this.mode == "compare") {
    var _temp2 = [];
    var comparecolumnname = "";
    $(_datatoshow).each(function(pi, po) {
      var point = {FormattedValues:[], Values:[]};
      $(_columns).each(function(ci, co) {
        if(!co.AggregationType) {
          point.FormattedValues.push(po.FormattedValues[ci]);
          point.Values.push(po.Values[ci])
        }
      });
      $(_columns).each(function(ci, co) {
        if(co.AggregationType && ci == _this.ColumnIndex) {
          point.FormattedValues.push(po.FormattedValues[ci]);
          point.Values.push(po.Values[ci])
        }
      });
      $(_columns).each(function(ci, co) {
        if(co.AggregationType && ci == _this.compareColumnIndex) {
          comparecolumnname = co.Name;
          point.FormattedValues.push(po.FormattedValues[ci]);
          point.Values.push(po.Values[ci])
        }
      });
      _temp2.push(point)
    });
    _datatoshow = _temp2;
    $(_data).each(function(pi, po) {
      var point = {FormattedValues:[], Values:[]};
      $(_columns).each(function(ci, co) {
        if(co.AggregationType && ci == _this.ColumnIndex) {
          _totalsum += parseFloat(po.Values[ci])
        }
        if(co.AggregationType && ci == _this.compareColumnIndex) {
          comparecolumnname = co.Name;
          _totalsumcompare += parseFloat(po.Values[ci])
        }
      })
    });
    $(_datatoshow).each(function(pi, po) {
      _datatoshow[pi].FormattedValues[po.FormattedValues.length - 1] = po.Values[po.FormattedValues.length - 1] / _totalsumcompare * 100;
      _datatoshow[pi].Values[po.Values.length - 1] = po.Values[po.Values.length - 1] / _totalsumcompare * 100
    })
  }
  _totalsum_base = _totalsum;
  _totalsumcompare_base = _totalsumcompare;
  if((_this.mode == "pie" || _this.mode == "perf" || _this.mode == "compare") && _this.DateBox.comparePeriod) {
    var _temp = [];
    var comparecolumnname = "";
    $(_data_compare_toshow).each(function(pi, po) {
      var point = {FormattedValues:[], Values:[]};
      $(_columns).each(function(ci, co) {
        if(!co.AggregationType) {
          point.FormattedValues.push(po.FormattedValues[ci]);
          point.Values.push(po.Values[ci])
        }
      });
      $(_columns).each(function(ci, co) {
        if(co.AggregationType && ci == _this.ColumnIndex) {
          point.FormattedValues.push(po.FormattedValues[ci]);
          point.Values.push(po.Values[ci])
        }
      });
      $(_columns).each(function(ci, co) {
        if(co.AggregationType && ci == _this.compareColumnIndex) {
          comparecolumnname = co.Name;
          point.FormattedValues.push(po.FormattedValues[ci]);
          point.Values.push(po.Values[ci])
        }
      });
      _temp.push(point)
    });
    _data_compare_toshow = _temp;
    _totalsum = 0;
    _totalsumcompare = 0;
    $(_data_compare).each(function(pi, po) {
      var point = {FormattedValues:[], Values:[]};
      $(_columns).each(function(ci, co) {
        if(co.AggregationType && ci == _this.ColumnIndex) {
          _totalsum += parseFloat(po.Values[ci])
        }
        if(co.AggregationType && ci == _this.compareColumnIndex) {
          comparecolumnname = co.Name;
          _totalsumcompare += parseFloat(po.Values[ci])
        }
      })
    });
    $(_data_compare_toshow).each(function(pi, po) {
      if(_totalsumcompare == 0) {
        _data_compare_toshow[pi].FormattedValues[po.FormattedValues.length - 1] = 0;
        _data_compare_toshow[pi].Values[po.Values.length - 1] = 0
      }else {
        _data_compare_toshow[pi].FormattedValues[po.FormattedValues.length - 1] = po.Values[po.FormattedValues.length - 1] / _totalsumcompare * 100;
        _data_compare_toshow[pi].Values[po.Values.length - 1] = po.Values[po.Values.length - 1] / _totalsumcompare * 100
      }
    })
  }
  if(_this.mode == "pie" || _this.mode == "perf" || _this.mode == "compare") {
    _temp = [];
    $(_columns).each(function(ci, co) {
      if(co.AggregationType && ci == _this.ColumnIndex) {
        _temp.push(co)
      }else {
        if(!co.AggregationType) {
          _temp.push(co)
        }
      }
    });
    _columns = _temp;
    _columns.push({Name:comparecolumnname, AggregationType:"Special"})
  }
  var $tr = $("<tr></tr>");
  var $th = $('<th class="check"></th>');
  $tr.append($th);
  $th = $('<th class="id"></th>');
  $tr.append($th);
  var sortIndex = 0;
  $(_columns).each(function(index, column) {
    if(column.AggregationType) {
      var metric = column;
      if(_this.mode == "pie" || _this.mode == "perf" || _this.mode == "compare") {
        if(index == _columns.length - 2) {
          $th = $('<th class="metric" data-sortindex="' + sortIndex + '">' + '<select class="input-medium metricpicker">' + "</select></th>");
          $(_allcolumns).each(function(ai, ao) {
            if(ao.AggregationType) {
              $th.find(".metricpicker").append('<option value="' + ao.Name + '" ' + (ai == _this.ColumnIndex ? "selected" : "") + ">" + ao.Name + "</option>");
              $th.addClass("sortkey");
              $th.addClass(_this.sortDir)
            }
          });
          $th.find(".metricpicker").off("click");
          $th.find(".metricpicker").on("click", function(e) {
            e.stopPropagation()
          });
          $th.find(".metricpicker").on("change", function(e) {
            var selected = $(this).val();
            $(_allcolumns).each(function(ai, ao) {
              if(ao.Name == selected) {
                _this.ColumnIndex = ai
              }
            });
            _this.update(_this)
          })
        }else {
          $th = $('<th class="metric" data-sortindex="' + sortIndex + '">' + _columns[_columns.length - 1].Name + "</th>")
        }
      }else {
        if(_this.mode != "pie") {
          $th = $('<th class="metric" data-sortindex="' + sortIndex + '">' + metric.Name + "</th>");
          if(sortIndex == _this.sortColumnIndex) {
            $th.addClass("sortkey");
            $th.addClass(_this.sortDir)
          }
        }
      }
      if($th) {
        if(_this.mode != "pie" && _this.mode != "perf" && _this.mode != "compare" || _this.mode == "pie" && index < _columns.length - 1 || (_this.mode == "perf" || _this.mode == "compare") && index < _columns.length - 1) {
          $th.off("click");
          $th.on("click", function(e) {
            e.stopPropagation();
            if(_this.sortColumnIndex == $(this).attr("data-sortindex")) {
              _this.sortDir = _this.sortDir == "DESC" ? "ASC" : "DESC"
            }else {
              _this.sortDir = "DESC"
            }
            _this.sortColumnIndex = $(this).attr("data-sortindex");
            $tr.find("th").removeClass("sortkey");
            $tr.find("th").removeClass("ASC");
            $tr.find("th").removeClass("DESC");
            $(this).addClass("sortkey");
            $(this).addClass(_this.sortDir);
            _this.update(_this)
          })
        }else {
          $th.addClass("special")
        }
        $tr.append($th)
      }
      sortIndex++
    }else {
      var dimension = column;
      if(index == 0) {
        $th = $('<th class="dimension" data-sortindex="' + sortIndex + '">' + dimension.Name + "</th>")
      }else {
        $th = $('<th class="dimension" data-sortindex="' + sortIndex + '">' + dimension.Name + "" + '<i class="jarvis removesecondarydimension icon-remove" style=" margin-top: 2px; margin-left: 5px; cursor: pointer; "></i>' + "" + "</th>");
        $($th.find(".removesecondarydimension")).off("click");
        $($th.find(".removesecondarydimension")).on("click", function(e) {
          var dindex = -1;
          $(_this.dimensions).each(function(i, d) {
            if(d.Name == dimension.Name) {
              dindex = i
            }
          });
          if(dindex > -1) {
            _this.dimensions.splice(dindex, 1);
            _this.sortColumnIndex = parseInt(_this.sortColumnIndex) - 1;
            _this.ColumnIndex = parseInt(_this.ColumnIndex) - 1;
            _this.compareColumnIndex = parseInt(_this.compareColumnIndex) - 1;
            _this.currentPage = 1;
            _this.fetch(_this)
          }
          e.stopPropagation()
        })
      }
      if(sortIndex == _this.sortColumnIndex) {
        $th.addClass("sortkey");
        $th.addClass(_this.sortDir)
      }
      $th.off("click");
      $th.on("click", function(e) {
        e.stopPropagation();
        if(_this.sortColumnIndex == $(this).attr("data-sortindex")) {
          _this.sortDir = _this.sortDir == "DESC" ? "ASC" : "DESC"
        }else {
          _this.sortDir = "DESC"
        }
        _this.sortColumnIndex = $(this).attr("data-sortindex");
        $tr.find("th").removeClass("sortkey");
        $tr.find("th").removeClass("ASC");
        $tr.find("th").removeClass("DESC");
        $(this).addClass("sortkey");
        $(this).addClass(_this.sortDir);
        _this.update(_this)
      });
      $tr.append($th);
      sortIndex++
    }
  });
  $table.append($tr);
  if(_data.length == 0) {
    $table.append('<tr class="empty"><td style="text-align: center;" colspan="' + parseInt(_columns.length + 2) + '">There is no data for this view.</td></tr>')
  }
  if(!_this.DateBox.comparePeriod) {
    $(_datatoshow).each(function(index, row) {
      $tr = $("<tr ></tr>");
      $td = $('<td class="check" style="vertical-align: middle;"></td>');
      if(_this.mode == "pie") {
        $td.append('<div style="height:11px;width:11px;background-color: ' + (index >= 10 ? jarvis.colors[11] : jarvis.colors[index]) + ';"></div>')
      }else {
        $td.append('<input class="checkfilter" type=checkbox>')
      }
      $tr.append($td);
      $td = $('<td class="id">' + parseInt((_this.currentPage - 1) * _this.pageSize + index + 1) + ".</td>");
      $tr.append($td);
      var filter = "";
      var shortfilter = "";
      $(_columns).each(function(i, cell) {
        $td = $("<td></td>");
        if(_columns[i].AggregationType) {
          $td.addClass("metricvalue")
        }else {
          if(i == 0) {
            $td.addClass("dimensionvalue");
            shortfilter = _columns[i].Name + "=" + row.Values[i] + "[AND]"
          }
          filter += _columns[i].Name + "=" + row.Values[i] + "[AND]"
        }
        if(i == _this.sortColumnIndex) {
          $td.addClass("sortkey")
        }
        if(_this.mode != "pie") {
          $td.html('<span class="drilldownlink a">' + row.FormattedValues[i] + "</span>")
        }else {
          if(_this.mode == "pie" && i != _columns.length - 1) {
            $td.html('<span class="drilldownlink b">' + row.FormattedValues[i] + "</span>")
          }else {
            if(_this.mode == "pie" && i == _columns.length - 1) {
              $td.html('<span class="">' + jarvis.string.formatNumber(row.FormattedValues[i], 2) + "%</span>")
            }
          }
        }
        $tr.append($td)
      });
      var $checkbox = $tr.find(".checkfilter");
      $checkbox.attr("data-filter", filter);
      $checkbox.off("click");
      $checkbox.on("click", function(e) {
        if($checkbox.is(":checked")) {
          jarvis.visualisation.report.addPartial(jarvis.visualisation.report.globalfilter + filter);
          _this.Filters.push(jarvis.visualisation.report.globalfilter + filter)
        }else {
          jarvis.visualisation.report.removePartial(jarvis.visualisation.report.globalfilter + filter);
          if(_this.Filters.indexOf(jarvis.visualisation.report.globalfilter + filter) > -1) {
            _this.Filters.splice(_this.Filters.indexOf(jarvis.visualisation.report.globalfilter + filter), 1)
          }
        }
        if(_this.options.minSelected > 0) {
          var count = $(".checkfilter:checked").length;
          if(count <= _this.options.minSelected) {
            $(".checkfilter:checked").attr("disabled", "disabled")
          }else {
            $(".checkfilter:checked").removeAttr("disabled")
          }
        }
      });
      if(_this.options.minSelected > 0) {
        var count = $(".checkfilter:checked").length;
        if(count <= _this.options.minSelected) {
          $(".checkfilter:checked").attr("disabled", "disabled")
        }else {
          $(".checkfilter:checked").removeAttr("disabled")
        }
      }
      if(_this.Filters.indexOf(filter) > -1) {
        $checkbox.attr("checked", true)
      }else {
        $checkbox.attr("checked", false)
      }
      if(_this.drilldownlevel <= _this.levels.length - 1) {
        $tr.find(".drilldownlink").attr("data-filter", shortfilter);
        $tr.find(".dimensionvalue .drilldownlink").off("click");
        $tr.find(".dimensionvalue .drilldownlink").on("click", function(e) {
          $(this).off("click");
          if(_this.drilldownlevel < _this.levels.length - 1) {
            _this.drilldownlevel++
          }
          _this.dimensions.splice(0, _this.dimensions.length);
          $(_this.levels[_this.drilldownlevel]).each(function(index, dimension) {
            _this.dimensions.push(dimension)
          });
          $(_this.Filters).each(function(fi, f) {
            jarvis.visualisation.report.removePartial(f)
          });
          _this.Filters = [];
          jarvis.debug.log("INFO", "jarvis.visualisation.report.Table", 6, "Drilldown to level " + _this.drilldownlevel + ": " + shortfilter);
          jarvis.visualisation.report.setFilter(jarvis.visualisation.report.globalfilter + shortfilter)
        })
      }
      if(_this.drilldownlevel == _this.levels.length - 1 && jarvis.visualisation.report.globalfilter != "" && (_datatoshow.length == 1 || _datatoshow.length > 1 && _datatoshow[0].FormattedValues[0] == _datatoshow[1].FormattedValues[0])) {
        var $td = $tr.find(".dimensionvalue");
        var $link = $tr.find(".dimensionvalue .drilldownlink");
        $link.off("click");
        $link.removeClass("drilldownlink");
        $td.removeClass("dimensionvalue")
      }
      if(_this.mode == "pie") {
        if(index == 0) {
          var $th = $('<th class="special pie">Contribution to total: <select class="input-medium comparemetricpicker"></select></th>');
          $(_allcolumns).each(function(ai, ao) {
            if(ao.AggregationType) {
              $th.find(".comparemetricpicker").append('<option value="' + ao.Name + '" ' + (ai == _this.compareColumnIndex ? "selected" : "") + ">" + ao.Name + "</option>")
            }
          });
          $th.find(".comparemetricpicker").off("click");
          $th.find(".comparemetricpicker").on("click", function(e) {
            e.stopPropagation()
          });
          $th.find(".comparemetricpicker").on("change", function(e) {
            var selected = $(this).val();
            $(_allcolumns).each(function(ai, ao) {
              if(ao.Name == selected) {
                _this.compareColumnIndex = ai
              }
            });
            _this.update(_this)
          });
          $($table.find("tr")[0]).append($th);
          $td = $('<td class="special"></td>');
          if(!_this.DateBox.comparePeriod) {
            $td.attr("rowspan", _this.pageSize)
          }else {
            $td.attr("rowspan", _this.pageSize * 3)
          }
          $tr.append($td);
          _this.drawPieChart(_this, $td, _columns, _datatoshow, _data, _totalsum_base, _totalsumcompare_base)
        }
      }else {
        if(_this.mode == "perf") {
          if(index == 0) {
            var $th = $('<th class="special perf"><select class="input-medium comparemetricpicker"></select></th>');
            $(_allcolumns).each(function(ai, ao) {
              if(ao.AggregationType) {
                $th.find(".comparemetricpicker").append('<option value="' + ao.Name + '" ' + (ai == _this.compareColumnIndex ? "selected" : "") + ">" + ao.Name + "</option>")
              }
            });
            $th.find(".comparemetricpicker").off("click");
            $th.find(".comparemetricpicker").on("click", function(e) {
              e.stopPropagation()
            });
            $th.find(".comparemetricpicker").on("change", function(e) {
              var selected = $(this).val();
              $(_allcolumns).each(function(ai, ao) {
                if(ao.Name == selected) {
                  _this.compareColumnIndex = ai
                }
              });
              _this.update(_this)
            });
            $($table.find("tr")[0]).append($th);
            var $header = $($table.find("tr")[0]);
            $($header.find("th")[$header.find("th").length - 2]).remove()
          }
          $($tr.find("td")[$tr.find("td").length - 1]).remove();
          var valIndex = row.FormattedValues.length - 1;
          $td = $('<td class="special bar">' + row.FormattedValues[valIndex] + "</td>");
          var value = +row.Values[valIndex];
          var width = Math.floor(row.Values[valIndex]) + "%";
          var $_bar = $('<div class="barwrapper"><div class="percentagebar" style="width:' + width + '"></div>' + '<td class="percentagecaption"><span >' + jarvis.string.formatNumber(row.Values[valIndex], 2) + "%</span></div>");
          $td.html($_bar);
          $tr.append($td)
        }else {
          if(_this.mode == "compare") {
            if(index == 0) {
              var $th = $('<th class="special pie"><select class="input-medium comparemetricpicker"></select></th>');
              $(_allcolumns).each(function(ai, ao) {
                if(ao.AggregationType) {
                  $th.find(".comparemetricpicker").append('<option value="' + ao.Name + '" ' + (ai == _this.compareColumnIndex ? "selected" : "") + ">" + ao.Name + "</option>")
                }
              });
              $th.find(".comparemetricpicker").off("click");
              $th.find(".comparemetricpicker").on("click", function(e) {
                e.stopPropagation()
              });
              $th.find(".comparemetricpicker").on("change", function(e) {
                var selected = $(this).val();
                $(_allcolumns).each(function(ai, ao) {
                  if(ao.Name == selected) {
                    _this.compareColumnIndex = ai
                  }
                });
                _this.update(_this)
              });
              $($table.find("tr")[0]).append($th);
              var $header = $($table.find("tr")[0]);
              $($header.find("th")[$header.find("th").length - 2]).remove()
            }
            $($tr.find("td")[$tr.find("td").length - 1]).remove();
            var valIndex = row.FormattedValues.length - 1;
            $td = $('<td class="special bar">' + row.FormattedValues[valIndex] + "</td>");
            var value = +row.Values[valIndex];
            var width = Math.floor(row.Values[valIndex]) - 5 + "px";
            var $_bar = $('<div class="barwrapper"><div class="percentagebar" style="width:' + width + '"></div>' + '<td class="percentagecaption"><span >' + jarvis.string.formatNumber(row.Values[valIndex], 2) + "%</span></div>");
            $td.html($_bar);
            $tr.append($td)
          }else {
            $($table.find("tr")[0]).find(".special").remove()
          }
        }
      }
      $table.append($tr)
    })
  }else {
    $(_datatoshow).each(function(index, row) {
      $tr = $("<tr ></tr>");
      $td = $('<td class="check" style="vertical-align: middle;"></td>');
      if(_this.mode == "pie") {
        $td.append('<div style="height:11px;width:11px;background-color: ' + (index >= 10 ? jarvis.colors[11] : jarvis.colors[index]) + ';"></div>')
      }else {
        $td.append('<input class="checkfilter" type=checkbox>')
      }
      $tr.append($td);
      $td = $('<td class="id">' + parseInt((_this.currentPage - 1) * _this.pageSize + index + 1) + ".</td>");
      $tr.append($td);
      var filter = "";
      var shortfilter = "";
      $(_columns).each(function(i, cell) {
        $td = $("<td></td>");
        if(_columns[i].AggregationType) {
          $td.addClass("metricvalue")
        }else {
          $td.html('<span class="drilldownlink c">' + row.FormattedValues[i] + "</span>");
          if(_this.mode != "pie") {
            $td.html('<span class="drilldownlink c">' + row.FormattedValues[i] + "</span>")
          }else {
            if(_this.mode == "pie" && i != _columns.length - 1) {
              $td.html('<span class="drilldownlink c">' + row.FormattedValues[i] + "</span>")
            }else {
              if(_this.mode == "pie" && i == _columns.length - 1) {
                $td.html('<span class="">' + jarvis.string.formatNumber(row.FormattedValues[i], 2) + "%</span>")
              }
            }
          }
          if(i == 0) {
            $td.addClass("dimensionvalue");
            shortfilter = _columns[i].Name + "=" + row.Values[i] + "[AND]"
          }
          filter += _columns[i].Name + "=" + row.Values[i] + "[AND]"
        }
        if(i == _this.sortColumnIndex) {
          $td.addClass("sortkey")
        }
        $tr.append($td)
      });
      if(_this.mode == "pie") {
        if(index == 0) {
          var $th = $('<th class="special pie">Contribution to total: <select class="input-medium comparemetricpicker"></select></th>');
          $(_allcolumns).each(function(ai, ao) {
            if(ao.AggregationType) {
              $th.find(".comparemetricpicker").append('<option value="' + ao.Name + '" ' + (ai == _this.compareColumnIndex ? "selected" : "") + ">" + ao.Name + "</option>")
            }
          });
          $th.find(".comparemetricpicker").off("click");
          $th.find(".comparemetricpicker").on("click", function(e) {
            e.stopPropagation()
          });
          $th.find(".comparemetricpicker").on("change", function(e) {
            var selected = $(this).val();
            $(_allcolumns).each(function(ai, ao) {
              if(ao.Name == selected) {
                _this.compareColumnIndex = ai
              }
            });
            _this.update(_this)
          });
          $($table.find("tr")[0]).append($th);
          $td = $('<td class="special"></td>');
          if(!_this.DateBox.comparePeriod) {
            $td.attr("rowspan", _this.pageSize)
          }else {
            $td.attr("rowspan", _this.pageSize * 3)
          }
          $tr.append($td);
          _this.drawPieChart(_this, $td, _columns, _datatoshow, _data, _totalsum_base, _totalsumcompare_base)
        }
      }else {
        if(_this.mode == "perf") {
          if(index == 0) {
            var $th = $('<th class="special pie"><select class="input-medium comparemetricpicker"></select></th>');
            $(_allcolumns).each(function(ai, ao) {
              if(ao.AggregationType) {
                $th.find(".comparemetricpicker").append('<option value="' + ao.Name + '" ' + (ai == _this.compareColumnIndex ? "selected" : "") + ">" + ao.Name + "</option>")
              }
            });
            $th.find(".comparemetricpicker").off("click");
            $th.find(".comparemetricpicker").on("click", function(e) {
              e.stopPropagation()
            });
            $th.find(".comparemetricpicker").on("change", function(e) {
              var selected = $(this).val();
              $(_allcolumns).each(function(ai, ao) {
                if(ao.Name == selected) {
                  _this.compareColumnIndex = ai
                }
              });
              _this.update(_this)
            });
            $($table.find("tr")[0]).append($th);
            var $header = $($table.find("tr")[0]);
            $($header.find("th")[$header.find("th").length - 2]).remove()
          }
          $($tr.find("td")[$tr.find("td").length - 1]).remove()
        }else {
          if(_this.mode == "compare") {
            if(index == 0) {
              var $th = $('<th class="special pie"><select class="input-medium comparemetricpicker"></select></th>');
              $(_allcolumns).each(function(ai, ao) {
                if(ao.AggregationType) {
                  $th.find(".comparemetricpicker").append('<option value="' + ao.Name + '" ' + (ai == _this.compareColumnIndex ? "selected" : "") + ">" + ao.Name + "</option>")
                }
              });
              $th.find(".comparemetricpicker").off("click");
              $th.find(".comparemetricpicker").on("click", function(e) {
                e.stopPropagation()
              });
              $th.find(".comparemetricpicker").on("change", function(e) {
                var selected = $(this).val();
                $(_allcolumns).each(function(ai, ao) {
                  if(ao.Name == selected) {
                    _this.compareColumnIndex = ai
                  }
                });
                _this.update(_this)
              });
              $($table.find("tr")[0]).append($th);
              var $header = $($table.find("tr")[0]);
              $($header.find("th")[$header.find("th").length - 2]).remove()
            }
            $($tr.find("td")[$tr.find("td").length - 1]).remove()
          }
        }
      }
      var $checkbox = $tr.find(".checkfilter");
      $checkbox.attr("data-filter", filter);
      $checkbox.off("click");
      $checkbox.on("click", function(e) {
        if($checkbox.is(":checked")) {
          jarvis.visualisation.report.addPartial(jarvis.visualisation.report.globalfilter + filter);
          _this.Filters.push(jarvis.visualisation.report.globalfilter + filter)
        }else {
          jarvis.visualisation.report.removePartial(jarvis.visualisation.report.globalfilter + filter);
          if(_this.Filters.indexOf(jarvis.visualisation.report.globalfilter + filter) > -1) {
            _this.Filters.splice(_this.Filters.indexOf(jarvis.visualisation.report.globalfilter + filter), 1)
          }
        }
      });
      if(_this.Filters.indexOf(filter) > -1) {
        $checkbox.attr("checked", true)
      }else {
        $checkbox.attr("checked", false)
      }
      $tr.find(".drilldownlink").attr("data-filter", shortfilter);
      $tr.find(".dimensionvalue .drilldownlink").off("click");
      $tr.find(".dimensionvalue .drilldownlink").on("click", function(e) {
        $(this).off("click");
        if(_this.drilldownlevel < _this.levels.length - 1) {
          _this.drilldownlevel++
        }
        _this.dimensions.splice(0, _this.dimensions.length);
        $(_this.levels[_this.drilldownlevel]).each(function(index, dimension) {
          _this.dimensions.push(dimension)
        });
        $(_this.Filters).each(function(fi, f) {
          jarvis.visualisation.report.removePartial(f)
        });
        _this.Filters = [];
        jarvis.debug.log("INFO", "jarvis.visualisation.report.Table", 6, "Drilldown to level " + _this.drilldownlevel + ": " + shortfilter);
        jarvis.visualisation.report.setFilter(jarvis.visualisation.report.globalfilter + shortfilter)
      });
      $table.append($tr);
      $tr = $("<tr></tr>");
      $td = $('<td class="check"></td>');
      $tr.append($td);
      $td = $('<td class="id"></td>');
      $tr.append($td);
      $(_columns).each(function(i, cell) {
        $td = $("<td></td>");
        if(_columns[i].AggregationType) {
          $td.addClass("metricvalue");
          if(_this.mode != "pie") {
            $td.html('<span class="drilldownlink d">' + row.FormattedValues[i] + "</span>")
          }else {
            if(_this.mode == "pie" && i != _columns.length - 1) {
              $td.html('<span class="drilldownlink d">' + row.FormattedValues[i] + "</span>")
            }else {
              if(_this.mode == "pie" && i == _columns.length - 1) {
                $td.html('<span class="">' + jarvis.string.formatNumber(row.FormattedValues[i], 2) + "%</span>")
              }
            }
          }
        }else {
          $td.addClass("");
          $td.attr("colspan", _this.dimensions.length);
          if(i == 0) {
            $td.html(jarvis.date.formatDate(_this.DateBox.getDate().base_fromdate) + " - " + jarvis.date.formatDate(_this.DateBox.getDate().base_todate))
          }else {
            $td = null
          }
        }
        if(i == _this.sortColumnIndex && _columns[i].AggregationType) {
          $td.addClass("sortkey")
        }
        $tr.append($td)
      });
      if(_this.mode == "perf") {
        $($tr.find("td")[$tr.find("td").length - 1]).remove();
        var valIndex = row.FormattedValues.length - 1;
        $td = $('<td class="special bar">' + row.FormattedValues[valIndex] + "</td>");
        var value = +row.Values[valIndex];
        var width = Math.floor(row.Values[valIndex]) - 5 + "px";
        var $_bar = $('<div class="barwrapper"><div class="percentagebar" style="width:' + width + '"></div>' + '<td class="percentagecaption"><span >' + jarvis.string.formatNumber(row.Values[valIndex], 2) + "%</span></div>");
        $td.html($_bar);
        $tr.append($td)
      }else {
        if(_this.mode == "compare") {
          $($tr.find("td")[$tr.find("td").length - 1]).remove();
          var valIndex = row.FormattedValues.length - 1;
          $td = $('<td class="special bar">' + row.FormattedValues[valIndex] + "</td>");
          var value = +row.Values[valIndex];
          var width = Math.floor(row.Values[valIndex]) - 5 + "px";
          var $_bar = $('<div class="barwrapper"><div class="percentagebar" style="width:' + width + '"></div>' + '<td class="percentagecaption"><span >' + jarvis.string.formatNumber(row.Values[valIndex], 2) + "%</span></div>");
          $td.html($_bar);
          $tr.append($td)
        }
      }
      $table.append($tr);
      $tr = $("<tr></tr>");
      $td = $('<td class="check"></td>');
      $tr.append($td);
      $td = $('<td class="id"></td>');
      $tr.append($td);
      var key = "";
      $(_columns).each(function(i, cell) {
        if(_columns[i].AggregationType == null) {
          key += row.Values[i]
        }
      });
      var row_compare;
      $(_data_compare_toshow).each(function(icompare, checkrow) {
        var key_compare = "";
        $(_columns).each(function(i, cell) {
          if(_columns[i].AggregationType == null) {
            key_compare += checkrow.Values[i]
          }
        });
        if(key == key_compare) {
          row_compare = checkrow
        }
      });
      $(_columns).each(function(i, cell) {
        $td = $("<td></td>");
        if(_columns[i].AggregationType) {
          $td.addClass("metricvalue");
          try {
            if(_this.mode != "pie") {
              $td.html('<span class="drilldownlink e">' + row_compare.FormattedValues[i] + "</span>")
            }else {
              if(_this.mode == "pie" && i != _columns.length - 1) {
                $td.html('<span class="drilldownlink e">' + row_compare.FormattedValues[i] + "</span>")
              }else {
                if(_this.mode == "pie" && i == _columns.length - 1) {
                  $td.html('<span class="">' + jarvis.string.formatNumber(row_compare.FormattedValues[i], 2) + "%</span>")
                }
              }
            }
          }catch(ex) {
            if(_this.mode != "pie") {
              $td.html('<span class="drilldownlink f">N/A</span>')
            }else {
              if(_this.mode == "pie" && i != _columns.length - 1) {
                $td.html('<span class="drilldownlink f">N/A</span>')
              }else {
                if(_this.mode == "pie" && i == _columns.length - 1) {
                  $td.html('<span class="">N/A</span>')
                }
              }
            }
          }
        }else {
          $td.addClass("");
          $td.attr("colspan", _this.dimensions.length);
          if(i == 0) {
            $td.html(jarvis.date.formatDate(_this.DateBox.getDate().compare_fromdate) + " - " + jarvis.date.formatDate(_this.DateBox.getDate().compare_todate))
          }else {
            $td = null
          }
        }
        if(i == _this.sortColumnIndex && _columns[i].AggregationType) {
          $td.addClass("sortkey")
        }
        $tr.append($td)
      });
      if(_this.mode == "perf") {
        var $_bar;
        try {
          $($tr.find("td")[$tr.find("td").length - 1]).remove();
          var valIndex = row.FormattedValues.length - 1;
          $td = $('<td class="special bar">' + row_compare.FormattedValues[valIndex] + "</td>");
          var value = +row_compare.Values[valIndex];
          var width = Math.floor(row_compare.Values[valIndex]) - 5 + "px";
          $_bar = $('<div class="barwrapper"><div class="percentagebar" style="width:' + width + '"></div>' + '<td class="percentagecaption"><span >' + jarvis.string.formatNumber(row_compare.Values[valIndex], 2) + "%</span></div>")
        }catch(ex) {
          $td = $('<td class="special bar">0</td>');
          $_bar = $('<div class="barwrapper"><div class="percentagebar" style="width:' + 0 + 'px"></div>' + '<td class="percentagecaption"><span >' + jarvis.string.formatNumber(0, 2) + "%</span></div>")
        }
        $td.html($_bar);
        $tr.append($td)
      }else {
        if(_this.mode == "compare") {
          var $_bar;
          try {
            $($tr.find("td")[$tr.find("td").length - 1]).remove();
            var valIndex = row.FormattedValues.length - 1;
            $td = $('<td class="special bar">' + row_compare.FormattedValues[valIndex] + "</td>");
            var value = +row_compare.Values[valIndex];
            var width = Math.floor(row_compare.Values[valIndex]) - 5 + "px";
            $_bar = $('<div class="barwrapper"><div class="percentagebar" style="width:' + width + '"></div>' + '<td class="percentagecaption"><span >' + jarvis.string.formatNumber(row_compare.Values[valIndex], 2) + "%</span></div>")
          }catch(ex) {
            $td = $('<td class="special bar">0</td>');
            $_bar = $('<div class="barwrapper"><div class="percentagebar" style="width:' + 0 + 'px"></div>' + '<td class="percentagecaption"><span >' + jarvis.string.formatNumber(0, 2) + "%</span></div>")
          }
          $td.html($_bar);
          $tr.append($td)
        }
      }
      $table.append($tr);
      if(_this.mode == "table") {
        $tr = $("<tr></tr>");
        $td = $('<td class="check"></td>');
        $tr.append($td);
        $td = $('<td class="id"></td>');
        $tr.append($td);
        $(_columns).each(function(i, cell) {
          $td = $("<td></td>");
          if(_columns[i].AggregationType) {
            var useNA = false;
            $td.addClass("metricvalue comparison");
            try {
              var value = percentageChange(row_compare.Values[i], row.Values[i])
            }catch(ex) {
              value = 0;
              useNA = true
            }
            var _class = "";
            var metric = cell;
            if(metric.RatioDirection == -1 && value < 0) {
              _class = "positive"
            }
            if(metric.RatioDirection == -1 && value > 0) {
              _class = "negative"
            }
            if(metric.RatioDirection == 1 && value > 0) {
              _class = "positive"
            }
            if(metric.RatioDirection == 1 && value < 0) {
              _class = "negative"
            }
            if(_class == "") {
              _class = "neutral"
            }
            if(_this.mode != "pie") {
              if(useNA) {
                $td.html("N/A")
              }else {
                $td.html(jarvis.string.formatNumber(value, 2) + "%")
              }
            }else {
              if(_this.mode == "pie" && i != _columns.length - 1) {
                if(useNA) {
                  $td.html("N/A")
                }else {
                  $td.html(jarvis.string.formatNumber(value, 2) + "%")
                }
              }else {
                if(_this.mode == "pie" && i == _columns.length - 1) {
                  if(useNA) {
                    $td.html("N/A")
                  }else {
                    $td.html(jarvis.string.formatNumber(value, 2) + "%")
                  }
                }
              }
            }
            $td.addClass(_class)
          }else {
            $td.addClass("comparison");
            $td.attr("colspan", _this.dimensions.length);
            if(i == 0) {
              $td.html("% Change")
            }else {
              $td = null
            }
          }
          if(i == _this.sortColumnIndex && _columns[i].AggregationType) {
            $td.addClass("sortkey")
          }
          $tr.append($td)
        });
        $table.append($tr)
      }
    })
  }
  var first = (_this.currentPage - 1) * _this.pageSize + 1;
  var last = _this.currentPage * _this.pageSize;
  if(last > _data.length) {
    last = _data.length
  }
  if(_this.mode == "pie" && _datatoshow.length < _this.pageSize) {
    for(i = _datatoshow.length;i < _this.pageSize;i++) {
      var $tr = $('<tr class="emptyrowfiller ' + (i == _datatoshow.length ? "first" : "") + '"></tr>');
      var $td = $('<td colspan="' + parseInt(_columns.length + 2) + '">&nbsp;</td>');
      $tr.append($td);
      $table.append($tr);
      if($table.find("tr").length > 10) {
        break
      }
    }
  }
  var $footer = $($(_this.Container).find(".bottomfooter"));
  var $pager = $footer.find(".pager .pageinfoselect");
  $pager.val(_this.pageSize);
  var $pageinfo = $footer.find(".pageinfo");
  $pageinfo.html(first + " - " + last + " of " + _data.length);
  var $pagecontrol = $footer.find(".pagecontrol");
  if(_this.currentPage > 1) {
    $($pagecontrol).find(".prev").removeClass("disabled")
  }else {
    $($pagecontrol).find(".prev").addClass("disabled")
  }
  if(last < _data.length) {
    $($pagecontrol).find(".next").removeClass("disabled")
  }else {
    $($pagecontrol).find(".next").addClass("disabled")
  }
  var $charttype = $(_this.Container).find(".tabletype");
  $charttype.find("button").each(function(i, o) {
    $(this).removeClass("active")
  });
  $charttype.find(".btn_" + this.mode).addClass("active");
  var $tablecontrol = $(_this.Container).find(".tablecontrol");
  if(_this.dimensions.length > 1) {
    var _html = "Secondary dimension" + (_this.dimensions.length > 2 ? "s" : "") + ": ";
    $(_this.dimensions).each(function(i, d) {
      if(i > 0) {
        _html += d.Name + ", "
      }
    });
    _html = _html.substring(0, _html.length - 2);
    $($tablecontrol).find(".secondarybutton").html(_html);
    var o = new jarvis.visualisation.picker.Dimensions({container:$item, prefix:"Secondary dimension: ", placeholdertext:"Add secondary dimension...", selected:_this.dimensions.length == 1 ? "" : _this.dimensions[1].Name})
  }else {
    var $item = $('<div class="jarvis picker dimensions" data-type="button"></div>');
    $($tablecontrol).find(".secondary").empty();
    $($tablecontrol).find(".secondary").append($item);
    var o = new jarvis.visualisation.picker.Dimensions({container:$item, prefix:"Secondary dimension: ", placeholdertext:"Add secondary dimension...", selected:_this.dimensions.length == 1 ? "" : _this.dimensions[1].Name});
    $(o).bind("select", function(data, dimension) {
      dimension = _.find(jarvis.objects.Dimensions, function(item) {
        return item.Name == dimension
      });
      if(_this.dimensions.indexOf(dimension) == -1) {
        if(_this.dimensions.length == 1) {
          _this.sortColumnIndex = parseInt(_this.sortColumnIndex) + 1;
          _this.ColumnIndex = parseInt(_this.ColumnIndex) + 1;
          _this.compareColumnIndex = parseInt(_this.compareColumnIndex) + 1
        }else {
          _this.dimensions.splice(1, 1)
        }
        _this.dimensions.push(dimension);
        _this.fetch(_this)
      }
    })
  }
  if(!_this.isother) {
    $(".japi.primarydimension").html(_this.levels[_this.drilldownlevel][0].Name);
    $(".japi.primarydimension").addClass("on");
    $(".japi.other.picker").removeClass("on");
    $(".japi.other.picker .jbtn").html('Other <span class="caret"></span>')
  }else {
    $(".japi.primarydimension").removeClass("on");
    $(".drilldownlink").off("click");
    $(".drilldownlink").addClass("disabled");
    $(".drilldownlink").parent().addClass("disabled")
  }
  if(_this.drilldownlevel > 0 || _this.drilldownlevel == 0 && _this.levels.length == 1) {
    $(".japi.other.picker").css("visibility", "visible")
  }else {
    $(".japi.other.picker").css("visibility", "hidden")
  }
  _this.setState(_this);
  if(_this.initialLoad == 1) {
    _this.initialLoad = 2;
    if(_this.options.defaultSelected > 0) {
      for(var i = 0;i < _this.options.defaultSelected;i++) {
      }
    }
  }
  $(jarvis).trigger("tableresize")
};
jarvis.visualisation.report.Table.prototype.updateCompare = function(sender, metric, series) {
  var _this = sender
};
jarvis.visualisation.report.Table.prototype.drawPieChart = function(sender, Container, columns, data, alldata, _totalsum, _totalsumcompare) {
  var _this = sender;
  var chart = new Highcharts.Chart({chart:{renderTo:$(Container).get(0), backgroundColor:null, plotBackgroundColor:null, plotBorderWidth:null, plotShadow:false, width:300, height:300, type:"pie", marginTop:0, marginLeft:0, marginRight:0, marginBottom:0, spacingLeft:0, spacingTop:0, spacingRight:0, spacingBottom:0}, title:{text:null}, tooltip:{formatter:function() {
    return"<b>" + this.point.name + "</b><br/>" + this.series.name + ": " + jarvis.string.formatNumber(this.percentage, 2) + " %"
  }}, legend:{enabled:false}, credits:{enabled:false}, exporting:{enabled:false}, plotOptions:{pie:{showInLegend:true, size:"90%"}}, series:[{name:function() {
    var name = "test";
    name = columns[columns.length - 2].Name;
    return name
  }(), type:"pie", data:function() {
    var result = [];
    var sum = 0;
    $(data).each(function(index, item) {
      if(index < 10) {
        var name = "";
        $(columns).each(function(ci, co) {
          if(co.AggregationType) {
          }else {
            name += columns[ci].Name + ": " + item.FormattedValues[ci] + "<br/>"
          }
        });
        name = name.substring(0, name.length - 5);
        var y = 0;
        y = item.Values[item.Values.length - 2] / _totalsum * 100;
        sum += y;
        result.push({name:name, y:y, color:jarvis.colors[index]})
      }
    });
    if(100 - Math.floor(sum) > 0) {
      var name = "Other";
      var y = 100 - sum;
      result.push({name:name, y:y, color:jarvis.colors[11]})
    }
    return result
  }(), dataLabels:{formatter:function() {
    return this.y > 5 ? this.point.name : null
  }, color:"white", distance:-30, enabled:false}}, {name:function() {
    var name = "test";
    name = columns[columns.length - 1].Name;
    return name
  }(), type:"pie", innerSize:"70%", data:function() {
    var result = [];
    if(_this.ColumnIndex != _this.compareColumnIndex) {
      var sum = 0;
      $(data).each(function(index, item) {
        if(index < 10) {
          var name = "";
          $(columns).each(function(ci, co) {
            if(co.AggregationType) {
            }else {
              name += columns[ci].Name + ": " + item.FormattedValues[ci] + "<br/>"
            }
          });
          name = name.substring(0, name.length - 5);
          y = item.Values[item.Values.length - 1];
          sum += y;
          result.push({name:name, y:y})
        }
      });
      if(100 - Math.floor(sum) > 0) {
        var name = "Other";
        var y = 100 - sum;
        result.push({name:name, y:y, color:jarvis.colors[11]})
      }
    }
    return result
  }(), dataLabels:{formatter:function() {
    return this.y > 1 ? "<b>" + this.point.name + ":</b> " + this.y + "%" : null
  }, enabled:false}}]})
};
jarvis.visualisation.report.Table.prototype.draw = function(Container) {
  var _this = this;
  var _html = '<table class="table table-striped"></table>';
  var $table = $(_html);
  $(Container).append($table);
  var $header = $('<div class="topheader"></div>');
  var $headercontent = $('<div class="headercontent"></div>');
  $header.append($headercontent);
  $(Container).prepend($header);
  var $footer = $('<div class="bottomfooter"></div>');
  var $footer_content = $('<div class="footercontent"></div>');
  $footer_content.append('<div class="pagecontrol"></div><div class="pageinfo"></div><div class="pager"></div>');
  _html = 'Show rows: <select class="pageinfoselect input-mini">' + "<option value=10 " + (_this.pageSize == 10 ? "selected" : "") + " >10</option>" + "<option value=25 " + (_this.pageSize == 25 ? "selected" : "") + " >25</option>" + "<option value=50 " + (_this.pageSize == 50 ? "selected" : "") + " >50</option>" + "<option value=100 " + (_this.pageSize == 100 ? "selected" : "") + " >100</option>" + "<option value=250 " + (_this.pageSize == 250 ? "selected" : "") + " >250</option>" + "<option value=500 " + 
  (_this.pageSize == 500 ? "selected" : "") + " >500</option>" + "</select>";
  $footer_content.find(".pager").html(_html);
  $footer_content.find(".pager .pageinfoselect").off("change");
  $footer_content.find(".pager .pageinfoselect").on("change", function(e) {
    _this.pageSize = $(this).val();
    _this.update(_this)
  });
  _html = "";
  $footer_content.find(".pageinfo").html(_html);
  $footer.append($footer_content);
  _html = '<div class="btn-group"><button class="btn prev disabled"></button><button class="btn next disabled"></button></div>';
  $footer_content.find(".pagecontrol").html(_html);
  $footer_content.find(".pagecontrol .prev").off("click");
  $footer_content.find(".pagecontrol .prev").on("click", function(e) {
    if(!$(this).hasClass("disabled")) {
      _this.currentPage -= 1;
      _this.update(_this)
    }
  });
  $footer_content.find(".pagecontrol .next").off("click");
  $footer_content.find(".pagecontrol .next").on("click", function(e) {
    if(!$(this).hasClass("disabled")) {
      _this.currentPage += 1;
      _this.update(_this)
    }
  });
  $footer.append($footer_content);
  $(Container).append($footer);
  _html = '<div class="drilldownwrapper"><span class="japi dimensionpickerlabel" style="display: inline-block;font: normal 12px Arial;height: 22px;vertical-align: middle;">Primary Dimension: </span>';
  _html += '<li class="japi primarydimension" data-id="' + "Nane" + '" style="">';
  _html += "Name" + "</li>";
  _html += '<div class="japi other picker btn-group  jarvis dimensions" style="display:inline;">';
  _html += '<li class="japi other picker dropdown" data-type="button" data-toggle="dropdown" style="background-color:white;position: absolute;display: inline-block; margin-left:5px;color:#08C;cursor:pointer;" onclick="">';
  _html += "Other";
  _html += '<span class="caret" style=""></span></li>' + '<div class="japi otherlist"></div></div>' + "</div></div></div></div>";
  $header.append(_html);
  var $tablecontrol = $('<div class="tablecontrol"></div>');
  $tablecontrol.append('<div class="secondary btn-group"><button class="btn secondarywrapper dropdown-toggle dropdown" data-toggle="dropdown"><span class="secondarybutton">Add secondary dimension...</span>&nbsp;<span class="caret"></span></button><div class="secondarylist"><ul class="jarvis secondarylistcontainer dropdown-menu"></ul></div></div>');
  $tablecontrol.append('<div class="toolbar"><div class="tabletype"></div><div class="search input-prepend"><input type="text" class="quicksearch span2" placeholder="Search..."><span class="add-on"><i class="searchicon icon-search"></i></span></div><span class="advancedcaption">Advanced</span></div></div>');
  var $charttype = $('<div class="toolbaroptions btn-group" data-toggle="buttons-radio" ></div>');
  $charttype.append('<button rel="tooltip" title="Table" class="btn btn_table active">' + '<img src="' + jarvis.hostname + '/assets/img/glyphicons_114_list.png""/>' + "</i></button>");
  $charttype.append('<button rel="tooltip" title="Pie chart" class="btn btn_pie">' + '<img src="' + jarvis.hostname + '/assets/img/glyphicons_042_pie_chart.png"/>' + "</button>");
  $charttype.append('<button rel="tooltip" title="Performance" class="btn btn_perf">' + '<img src="' + jarvis.hostname + '/assets/img/glyphicons_110_align_left.png"/>' + "</button>");
  $tablecontrol.find(".add-on").off("click");
  $tablecontrol.find(".add-on").on("click", function(e) {
    var $search = $($tablecontrol.find(".quicksearch")[$tablecontrol.find(".quicksearch").length - 1]);
    $(_this.Filters).each(function(fi, f) {
      jarvis.visualisation.report.removePartial(f)
    });
    _this.Filters = [];
    if($search.val() == "") {
      jarvis.visualisation.report.setFilter("")
    }else {
      var shortfilter = _this.dimensions[0].Name + "=" + $search.val() + "[AND]";
      jarvis.visualisation.report.setFilter(shortfilter)
    }
  });
  $tablecontrol.find(".quicksearch").keypress(function(e) {
    if(e.which == 13) {
      $tablecontrol.find(".add-on").click()
    }
  });
  $charttype.find(".btn_table").off("click");
  $charttype.find(".btn_table").on("click", function(e) {
    _this.mode = "table";
    _this.update(_this)
  });
  $charttype.find(".btn_pie").off("click");
  $charttype.find(".btn_pie").on("click", function(e) {
    _this.mode = "pie";
    _this.sortColumnIndex = -1;
    _this.update(_this)
  });
  $charttype.find(".btn_perf").off("click");
  $charttype.find(".btn_perf").on("click", function(e) {
    _this.mode = "perf";
    _this.sortColumnIndex = -1;
    _this.update(_this)
  });
  $charttype.find(".btn_compare").off("click");
  $charttype.find(".btn_compare").on("click", function(e) {
    _this.mode = "compare";
    _this.sortColumnIndex = -1;
    _this.update(_this)
  });
  $tablecontrol.find(".tabletype").html($charttype);
  var $dimlist = $($tablecontrol.find(".jarvis.secondarylistcontainer"));
  $dimlist.append($('<li class="nav-header">' + _this.dimensions[0].Name + "</li>"));
  var $item = $('<div class="jarvis picker dimensions" data-type="button"></div>');
  $($tablecontrol).find(".secondary").empty();
  $($tablecontrol).find(".secondary").append($item);
  var o = new jarvis.visualisation.picker.Dimensions({container:$item, prefix:"Secondary dimension: ", placeholdertext:"Add secondary dimension...", selected:_this.dimensions.length == 1 ? "" : _this.dimensions[1].Name});
  $(o).bind("select", function(data, dimension) {
    dimension = _.find(jarvis.objects.Dimensions, function(item) {
      return item.Name == dimension
    });
    if(_this.dimensions.indexOf(dimension) == -1) {
      if(_this.dimensions.length == 1) {
        _this.sortColumnIndex = parseInt(_this.sortColumnIndex) + 1;
        _this.ColumnIndex = parseInt(_this.ColumnIndex) + 1;
        _this.compareColumnIndex = parseInt(_this.compareColumnIndex) + 1
      }else {
        _this.dimensions.splice(1, 1)
      }
      _this.dimensions.push(dimension);
      _this.fetch(_this)
    }
  });
  $item = $($header.find(".japi.other.picker.dropdown"));
  o = new jarvis.visualisation.picker.Dimensions({container:$item, prefix:"", placeholdertext:"Other", type:"none", selected:_this.isother ? _this.dimensions[0].Name : ""});
  $(o).bind("select", function(data, dimension) {
    dimension = _.find(jarvis.objects.Dimensions, function(item) {
      return item.Name == dimension
    });
    if(_this.dimensions.indexOf(dimension) == -1) {
      _this.dimensions[0] = dimension;
      _this.isother = true;
      _this.fetch(_this)
    }
  });
  $(".japi.primarydimension").off("click");
  $(".japi.primarydimension").on("click", function(e) {
    var dimension = $(".japi.primarydimension").text();
    dimension = _.find(jarvis.objects.Dimensions, function(item) {
      return item.Name == dimension
    });
    _this.dimensions[0] = dimension;
    _this.isother = false;
    _this.fetch(_this)
  });
  $header.append($tablecontrol);
  var $advancedsearch = $('<div class="advancedsearch"><div class="advancedsearch_container"></div></div>');
  var o = new jarvis.visualisation.container.Filter({container:$advancedsearch});
  $header.append($advancedsearch);
  $(".advancedcaption").off("click");
  $(".advancedcaption").on("click", function() {
    $("#modal-notimplemented").modal("show");
    return;
    if($advancedsearch.is(":visible")) {
      $advancedsearch.hide()
    }else {
      $advancedsearch.show()
    }
  });
  $(".japi.primarydimension").html(_this.levels[_this.drilldownlevel][0].Name);
  if(!_this.isother) {
    $(".japi.primarydimension").addClass("on");
    $(".japi.other.picker").removeClass("on");
    $(".japi.other.picker .jbtn").html('Other <span class="caret"></span>')
  }else {
    $(".japi.primarydimension").removeClass("on");
    $(".drilldownlink").off("click");
    $(".drilldownlink").addClass("disabled");
    $(".drilldownlink").parent().addClass("disabled")
  }
  if(_this.drilldownlevel > 0 || _this.drilldownlevel == 0 && _this.levels.length == 1) {
    $(".japi.other.picker").css("visibility", "visible")
  }else {
    $(".japi.other.picker").css("visibility", "hidden")
  }
};
jarvis.visualisation.report.Table.prototype.uid = function(sender) {
  return"table-1234"
};
jarvis.visualisation.report.Table.prototype.setState = function(sender) {
  var _this = sender;
  if(!jarvis.state[_this.uid()]) {
    jarvis.state[_this.uid()] = {}
  }
  jarvis.debug.log("INFO", "jarvis.visualisation.report.Table", 6, 'Table "' + _this.uid() + '" saving state.');
  jarvis.state[_this.uid()].ChartType = _this.ChartType;
  jarvis.state[_this.uid()].Resolution = _this.Resolution;
  jarvis.state[_this.uid()].primaryMetric = _this.primaryMetric;
  jarvis.state[_this.uid()].secondaryMetric = _this.secondaryMetric;
  jarvis.state[_this.uid()].sortColumnIndex = _this.sortColumnIndex;
  jarvis.state[_this.uid()].ColumnIndex = _this.ColumnIndex;
  jarvis.state[_this.uid()].compareColumnIndex = _this.compareColumnIndex;
  jarvis.state[_this.uid()].sortDir = _this.sortDir;
  jarvis.state[_this.uid()].currentPage = _this.currentPage;
  jarvis.state[_this.uid()].pageSize = _this.pageSize;
  jarvis.state[_this.uid()].mode = _this.mode;
  jarvis.state[_this.uid()].drilldownlevel = _this.drilldownlevel;
  jarvis.state[_this.uid()].isother = _this.isother;
  jarvis.state[_this.uid()].Filters = _this.Filters
};
jarvis.visualisation.report.Table.prototype.getState = function(sender) {
  var _this = sender;
  jarvis.debug.log("INFO", "jarvis.visualisation.report.Table", 6, 'Table "' + _this.uid() + '" loading state.');
  if(jarvis.state[_this.uid()] != null) {
    _this.ChartType = jarvis.state[_this.uid()].ChartType;
    _this.Resolution = jarvis.state[_this.uid()].Resolution;
    _this.primaryMetric = jarvis.state[_this.uid()].primaryMetric;
    _this.secondaryMetric = jarvis.state[_this.uid()].secondaryMetric;
    _this.sortColumnIndex = jarvis.state[_this.uid()].sortColumnIndex;
    _this.ColumnIndex = jarvis.state[_this.uid()].ColumnIndex;
    _this.compareColumnIndex = jarvis.state[_this.uid()].compareColumnIndex;
    _this.sortDir = jarvis.state[_this.uid()].sortDir;
    _this.currentPage = jarvis.state[_this.uid()].currentPage;
    _this.pageSize = jarvis.state[_this.uid()].pageSize;
    _this.mode = jarvis.state[_this.uid()].mode;
    _this.drilldownlevel = jarvis.state[_this.uid()].drilldownlevel;
    _this.isother = jarvis.state[_this.uid()].isother;
    _this.Filters = jarvis.state[_this.uid()].Filters
  }
};
jarvis.debug.log("INFO", "jarvis.visualisation.report.Table", 6, "JS source loaded");
jarvis.provide("jarvis.visualisation.report.TableEx");
jarvis.require("jarvis.debug");
jarvis.require("jarvis.date");
jarvis.require("jarvis.string");
jarvis.require("jarvis.visualisation.report");
jarvis.visualisation.report.TableEx = function(options, container) {
  var _this = this;
  var start = (new Date).getMilliseconds();
  this._this = this;
  this.ChartType = "line";
  this.Resolution = "Day";
  this.primaryMetric = null;
  this.secondaryMetric = null;
  this.Filters = [];
  this.drilldownlevel = 0;
  this.isother = false;
  this.levels = [];
  this.sortColumnIndex = -1;
  this.ColumnIndex = -1;
  this.compareColumnIndex = -1;
  this.sortDir = "DESC";
  this.currentPage = 1;
  this.pageSize = 50;
  this.mode = "table";
  this.dimensions = [];
  this.metrics = [];
  this.Container = null;
  this.Filters = [];
  this.colors = jarvis.colors;
  this.DateBox = jarvis.visualisation.picker.DateBox;
  jarvis.objects.Dimensions.List();
  jarvis.objects.Metrics.List();
  _this.getState(_this);
  var executionTime = (new Date).getMilliseconds() - start;
  jarvis.debug.log("INFO", "jarvis.visualisation.report.Table", 5, "...init (" + executionTime + "ms)");
  return this
};
jarvis.visualisation.report.TableEx.prototype.init = function(options, container) {
  var _this = this;
  var start = (new Date).getMilliseconds();
  this._this = this;
  var matchedContainers = null;
  if(container) {
    matchedContainers = $(container)
  }else {
    matchedContainers = $(".jarvis.report.jtable")
  }
  if(matchedContainers.length == 0) {
    return
  }
  $(matchedContainers).each(function(index, item) {
    if(!$(this).parent().hasClass("prettyprint")) {
      jarvis.debug.log("INFO", "jarvis.visualisation.report.TableEx", 6, "Applying to container ('" + this.id + "')");
      _this.Container = item;
      if(_this.dimensions.length == 0) {
        var _dimensions = $(item).attr("data-dimensions");
        if(!_dimensions) {
          return
        }
        try {
          _this.levels = eval(_dimensions);
          $(_this.levels).each(function(index, level) {
            $(level).each(function(index2, dimension) {
              $(jarvis.objects.Dimensions).each(function(index3, item) {
                if(dimension == item.Name) {
                  _this.dimensions.push(item);
                  _this.levels[index][index2] = item
                }
              })
            })
          })
        }catch(e) {
          _this.levels = [];
          _this.levels.push([_dimensions]);
          _dimensions = _dimensions.split(",");
          $(_dimensions).each(function(index, item) {
            _dimensions[index] = $.trim(_dimensions[index]);
            _this.dimensions.push(_dimensions[index])
          });
          $(jarvis.objects.Dimensions).each(function(index, item) {
            if(_dimensions.indexOf(item.Name) > -1) {
              _this.dimensions[_dimensions.indexOf(item.Name)] = item
            }
          })
        }
      }else {
      }
      var _metrics = $(item).attr("data-metrics");
      if(!_metrics) {
        return
      }
      _metrics = _metrics.split(",");
      $(_metrics).each(function(index, item) {
        _metrics[index] = $.trim(_metrics[index]);
        _this.metrics.push(_metrics[index])
      });
      $(jarvis.objects.Metrics).each(function(index, item) {
        if(_metrics.indexOf(item.Name) > -1) {
          _this.metrics[_metrics.indexOf(item.Name)] = item
        }
      });
      $(item).empty();
      _this.draw(item);
      _this.fetch(_this, item);
      $(this).unbind("data");
      $(this).bind("data", function(evt, ret) {
        ret.data = $(this).data().data
      });
      $(this).unbind("click");
      $(this).bind("click", function(evt) {
        $(this).trigger("clicked", $(this).data().data)
      });
      $(_this.DateBox).unbind("datechange");
      $(_this.DateBox).bind("datechange", function() {
        _this.fetch(_this)
      });
      $(jarvis.visualisation.report).unbind("filter");
      $(jarvis.visualisation.report).bind("filter", function(filter) {
        _this.fetch(_this)
      });
      _this.destroy = function() {
        $(_this.DateBox).unbind("datechange");
        $(_this).unbind("data");
        $(_this).unbind("click");
        $(jarvis.visualisation.report).unbind("filter")
      }
    }
  });
  var executionTime = (new Date).getMilliseconds() - start;
  jarvis.debug.log("INFO", "jarvis.visualisation.report.TableEx", 5, "...init (" + executionTime + "ms)");
  return this
};
jarvis.visualisation.report.TableEx.prototype.fetch = function(sender, container) {
  if(!sender) {
    sender = jarvis.visualisation.report.TableEx
  }
  var _this = sender;
  var startdate = jarvis.visualisation.picker.DateBox.getDate().base_fromdate;
  var enddate = jarvis.visualisation.picker.DateBox.getDate().base_todate;
  if(_this.DateBox.comparePeriod) {
    var compare_startdate = jarvis.visualisation.picker.DateBox.getDate().compare_fromdate;
    var compare_enddate = jarvis.visualisation.picker.DateBox.getDate().compare_todate
  }
  var dimensionslist = "";
  $(_this.dimensions).each(function(index, item) {
    dimensionslist += item.Name + ", "
  });
  dimensionslist = dimensionslist.substring(0, dimensionslist.length - 2);
  var metricslist = "";
  $(_this.metrics).each(function(index, item) {
    metricslist += item.Name + ", "
  });
  metricslist = metricslist.substring(0, metricslist.length - 2);
  var queryOptions = [];
  var _queryOptions = {id:"primary", FromDate:jarvis.date.formatDate(startdate, "yyyy-mm-dd hh:nn:ss.000"), ToDate:jarvis.date.formatDate(enddate, "yyyy-mm-dd hh:nn:ss.999"), Dimensions:dimensionslist, Metrics:metricslist, Resolution:_this.Resolution, omitDate:true, Filter:jarvis.visualisation.report.globalfilter, SortKey:_this.metrics[0].Name, SortDir:"DESC"};
  queryOptions.push(_queryOptions);
  if(_this.DateBox.comparePeriod) {
    _queryOptions = {id:"compare_primary", FromDate:jarvis.date.formatDate(compare_startdate, "yyyy-mm-dd hh:nn:ss.000"), ToDate:jarvis.date.formatDate(compare_enddate, "yyyy-mm-dd hh:nn:ss.999"), Dimensions:dimensionslist, Metrics:metricslist, Resolution:_this.Resolution, omitDate:true, Filter:jarvis.visualisation.report.globalfilter, SortKey:_this.metrics[0].Name, SortDir:"DESC"};
    queryOptions.push(_queryOptions)
  }
  jarvis.dataaccess.multifetch(_this, "/engine/Query.svc/fetch", queryOptions, function(sender, data, error) {
    var series = [];
    $(data).each(function(index, item) {
      var result = item.data.Result;
      var request = item.data.Request;
      var _data = item.data.Result.Rows;
      series.push({dimensions:_this.dimensions, metrics:_this.metrics, data:result})
    });
    sender.datatable = series;
    _this.update(sender, dimensionslist, metricslist, series)
  })
};
jarvis.visualisation.report.TableEx.prototype.update = function(sender) {
  var _this = sender;
  var series = _this.datatable[0];
  var series_compare;
  var _data_compare;
  var _data_compare_toshow;
  if(_this.DateBox.comparePeriod) {
    series_compare = _this.datatable[1];
    _data_compare = series_compare.data.Rows
  }
  var _columns = series.data.Columns;
  var _allcolumns = _columns;
  var _data = series.data.Rows;
  var _totalsum_base = 0;
  var _totalsumcompare_base = 0;
  var _totalsum = 0;
  var _totalsumcompare = 0;
  var $table = $($(_this.Container).find(".table"));
  $table.find("tr").remove();
  if(_this.sortColumnIndex == -1) {
    $(_columns).each(function(index, column) {
      if(column.AggregationType) {
      }else {
        _this.sortColumnIndex = index + 1
      }
    })
  }
  if(_this.ColumnIndex == -1) {
    $(_columns).each(function(index, column) {
      if(column.AggregationType) {
      }else {
        _this.ColumnIndex = index + 1
      }
    });
    _this.compareColumnIndex = _this.ColumnIndex
  }
  _data = $(_data).sort(function(a, b) {
    var valuea = a.Values[_this.sortColumnIndex];
    var valueb = b.Values[_this.sortColumnIndex];
    if(_columns[_this.sortColumnIndex].AggregationType) {
      valuea = parseFloat(valuea);
      valueb = parseFloat(valueb)
    }
    if(_this.sortDir == "DESC") {
      return valuea < valueb ? 1 : -1
    }else {
      return valuea > valueb ? 1 : -1
    }
  });
  _data_compare = $(_data_compare).sort(function(a, b) {
    var valuea = a.Values[_this.sortColumnIndex];
    var valueb = b.Values[_this.sortColumnIndex];
    if(_columns[_this.sortColumnIndex].AggregationType) {
      valuea = parseFloat(valuea);
      valueb = parseFloat(valueb)
    }
    if(_this.sortDir == "DESC") {
      return valuea < valueb ? 1 : -1
    }else {
      return valuea > valueb ? 1 : -1
    }
  });
  var _datatoshow = _data;
  _datatoshow = _datatoshow.slice((_this.currentPage - 1) * _this.pageSize, _this.currentPage * _this.pageSize);
  _data_compare_toshow = _data_compare;
  if(_this.mode == "pie" || _this.mode == "perf" || _this.mode == "compare") {
    var _temp2 = [];
    var comparecolumnname = "";
    $(_datatoshow).each(function(pi, po) {
      var point = {FormattedValues:[], Values:[]};
      $(_columns).each(function(ci, co) {
        if(!co.AggregationType) {
          point.FormattedValues.push(po.FormattedValues[ci]);
          point.Values.push(po.Values[ci])
        }
      });
      $(_columns).each(function(ci, co) {
        if(co.AggregationType && ci == _this.ColumnIndex) {
          point.FormattedValues.push(po.FormattedValues[ci]);
          point.Values.push(po.Values[ci])
        }
      });
      $(_columns).each(function(ci, co) {
        if(co.AggregationType && ci == _this.compareColumnIndex) {
          comparecolumnname = co.Name;
          point.FormattedValues.push(po.FormattedValues[ci]);
          point.Values.push(po.Values[ci])
        }
      });
      _temp2.push(point)
    });
    _datatoshow = _temp2;
    $(_data).each(function(pi, po) {
      var point = {FormattedValues:[], Values:[]};
      $(_columns).each(function(ci, co) {
        if(co.AggregationType && ci == _this.ColumnIndex) {
          _totalsum += parseFloat(po.Values[ci])
        }
        if(co.AggregationType && ci == _this.compareColumnIndex) {
          comparecolumnname = co.Name;
          _totalsumcompare += parseFloat(po.Values[ci])
        }
      })
    });
    $(_datatoshow).each(function(pi, po) {
      _datatoshow[pi].FormattedValues[po.FormattedValues.length - 1] = po.Values[po.FormattedValues.length - 1] / _totalsumcompare * 100;
      _datatoshow[pi].Values[po.Values.length - 1] = po.Values[po.Values.length - 1] / _totalsumcompare * 100
    })
  }
  _totalsum_base = _totalsum;
  _totalsumcompare_base = _totalsumcompare;
  if((_this.mode == "pie" || _this.mode == "perf" || _this.mode == "compare") && _this.DateBox.comparePeriod) {
    var _temp = [];
    var comparecolumnname = "";
    $(_data_compare_toshow).each(function(pi, po) {
      var point = {FormattedValues:[], Values:[]};
      $(_columns).each(function(ci, co) {
        if(!co.AggregationType) {
          point.FormattedValues.push(po.FormattedValues[ci]);
          point.Values.push(po.Values[ci])
        }
      });
      $(_columns).each(function(ci, co) {
        if(co.AggregationType && ci == _this.ColumnIndex) {
          point.FormattedValues.push(po.FormattedValues[ci]);
          point.Values.push(po.Values[ci])
        }
      });
      $(_columns).each(function(ci, co) {
        if(co.AggregationType && ci == _this.compareColumnIndex) {
          comparecolumnname = co.Name;
          point.FormattedValues.push(po.FormattedValues[ci]);
          point.Values.push(po.Values[ci])
        }
      });
      _temp.push(point)
    });
    _data_compare_toshow = _temp;
    _totalsum = 0;
    _totalsumcompare = 0;
    $(_data_compare).each(function(pi, po) {
      var point = {FormattedValues:[], Values:[]};
      $(_columns).each(function(ci, co) {
        if(co.AggregationType && ci == _this.ColumnIndex) {
          _totalsum += parseFloat(po.Values[ci])
        }
        if(co.AggregationType && ci == _this.compareColumnIndex) {
          comparecolumnname = co.Name;
          _totalsumcompare += parseFloat(po.Values[ci])
        }
      })
    });
    $(_data_compare_toshow).each(function(pi, po) {
      if(_totalsumcompare == 0) {
        _data_compare_toshow[pi].FormattedValues[po.FormattedValues.length - 1] = 0;
        _data_compare_toshow[pi].Values[po.Values.length - 1] = 0
      }else {
        _data_compare_toshow[pi].FormattedValues[po.FormattedValues.length - 1] = po.Values[po.FormattedValues.length - 1] / _totalsumcompare * 100;
        _data_compare_toshow[pi].Values[po.Values.length - 1] = po.Values[po.Values.length - 1] / _totalsumcompare * 100
      }
    })
  }
  if(_this.mode == "pie" || _this.mode == "perf" || _this.mode == "compare") {
    _temp = [];
    $(_columns).each(function(ci, co) {
      if(co.AggregationType && ci == _this.ColumnIndex) {
        _temp.push(co)
      }else {
        if(!co.AggregationType) {
          _temp.push(co)
        }
      }
    });
    _columns = _temp;
    _columns.push({Name:comparecolumnname, AggregationType:"Special"})
  }
  var $tr = $("<tr></tr>");
  var $th = $('<th class="check"></th>');
  $tr.append($th);
  $th = $('<th class="id"></th>');
  $tr.append($th);
  var sortIndex = 0;
  $(_columns).each(function(index, column) {
    if(column.AggregationType) {
      var metric = column;
      if(_this.mode == "pie" || _this.mode == "perf" || _this.mode == "compare") {
        if(index == _columns.length - 2) {
          $th = $('<th class="metric" data-sortindex="' + sortIndex + '">' + '<select class="input-medium metricpicker">' + "</select></th>");
          $(_allcolumns).each(function(ai, ao) {
            if(ao.AggregationType) {
              $th.find(".metricpicker").append('<option value="' + ao.Name + '" ' + (ai == _this.ColumnIndex ? "selected" : "") + ">" + ao.Name + "</option>");
              $th.addClass("sortkey");
              $th.addClass(_this.sortDir)
            }
          });
          $th.find(".metricpicker").off("click");
          $th.find(".metricpicker").on("click", function(e) {
            e.stopPropagation()
          });
          $th.find(".metricpicker").on("change", function(e) {
            var selected = $(this).val();
            $(_allcolumns).each(function(ai, ao) {
              if(ao.Name == selected) {
                _this.ColumnIndex = ai
              }
            });
            _this.update(_this)
          })
        }else {
          $th = $('<th class="metric" data-sortindex="' + sortIndex + '">' + _columns[_columns.length - 1].Name + "</th>")
        }
      }else {
        if(_this.mode != "pie") {
          $th = $('<th class="metric" data-sortindex="' + sortIndex + '">' + metric.Name + "</th>");
          if(sortIndex == _this.sortColumnIndex) {
            $th.addClass("sortkey");
            $th.addClass(_this.sortDir)
          }
        }
      }
      if($th) {
        if(_this.mode != "pie" && _this.mode != "perf" && _this.mode != "compare" || _this.mode == "pie" && index < _columns.length - 1 || (_this.mode == "perf" || _this.mode == "compare") && index < _columns.length - 1) {
          $th.off("click");
          $th.on("click", function(e) {
            e.stopPropagation();
            if(_this.sortColumnIndex == $(this).attr("data-sortindex")) {
              _this.sortDir = _this.sortDir == "DESC" ? "ASC" : "DESC"
            }else {
              _this.sortDir = "DESC"
            }
            _this.sortColumnIndex = $(this).attr("data-sortindex");
            $tr.find("th").removeClass("sortkey");
            $tr.find("th").removeClass("ASC");
            $tr.find("th").removeClass("DESC");
            $(this).addClass("sortkey");
            $(this).addClass(_this.sortDir);
            _this.update(_this)
          })
        }else {
          $th.addClass("special")
        }
        $tr.append($th)
      }
      sortIndex++
    }else {
      var dimension = column;
      if(index == 0) {
        $th = $('<th class="dimension" data-sortindex="' + sortIndex + '">' + dimension.Name + "</th>")
      }else {
        $th = $('<th class="dimension" data-sortindex="' + sortIndex + '">' + dimension.Name + "" + '<i class="jarvis removesecondarydimension icon-remove" style=" margin-top: 2px; margin-left: 5px; cursor: pointer; "></i>' + "" + "</th>");
        $($th.find(".removesecondarydimension")).off("click");
        $($th.find(".removesecondarydimension")).on("click", function(e) {
          var dindex = -1;
          $(_this.dimensions).each(function(i, d) {
            if(d.Name == dimension.Name) {
              dindex = i
            }
          });
          if(dindex > -1) {
            _this.dimensions.splice(dindex, 1);
            _this.sortColumnIndex = parseInt(_this.sortColumnIndex) - 1;
            _this.ColumnIndex = parseInt(_this.ColumnIndex) - 1;
            _this.compareColumnIndex = parseInt(_this.compareColumnIndex) - 1;
            _this.fetch(_this)
          }
          e.stopPropagation()
        })
      }
      if(sortIndex == _this.sortColumnIndex) {
        $th.addClass("sortkey");
        $th.addClass(_this.sortDir)
      }
      $th.off("click");
      $th.on("click", function(e) {
        e.stopPropagation();
        if(_this.sortColumnIndex == $(this).attr("data-sortindex")) {
          _this.sortDir = _this.sortDir == "DESC" ? "ASC" : "DESC"
        }else {
          _this.sortDir = "DESC"
        }
        _this.sortColumnIndex = $(this).attr("data-sortindex");
        $tr.find("th").removeClass("sortkey");
        $tr.find("th").removeClass("ASC");
        $tr.find("th").removeClass("DESC");
        $(this).addClass("sortkey");
        $(this).addClass(_this.sortDir);
        _this.update(_this)
      });
      $tr.append($th);
      sortIndex++
    }
  });
  $table.append($tr);
  if(_data.length == 0) {
    $table.append('<tr class="empty"><td style="text-align: center;" colspan="' + parseInt(_columns.length + 2) + '">There is no data for this view.</td></tr>')
  }
  if(!_this.DateBox.comparePeriod) {
    $(_datatoshow).each(function(index, row) {
      $tr = $("<tr ></tr>");
      $td = $('<td class="check" style="vertical-align: middle;"></td>');
      if(_this.mode == "pie") {
        $td.append('<div style="height:11px;width:11px;background-color: ' + (index >= 10 ? jarvis.colors[11] : jarvis.colors[index]) + ';"></div>')
      }else {
        $td.append('<input class="checkfilter" type=checkbox>')
      }
      $tr.append($td);
      $td = $('<td class="id">' + parseInt((_this.currentPage - 1) * _this.pageSize + index + 1) + ".</td>");
      $tr.append($td);
      var filter = "";
      var shortfilter = "";
      $(_columns).each(function(i, cell) {
        $td = $("<td></td>");
        if(_columns[i].AggregationType) {
          $td.addClass("metricvalue")
        }else {
          if(i == 0) {
            $td.addClass("dimensionvalue");
            shortfilter = _columns[i].Name + "=" + row.Values[i] + "[AND]"
          }
          filter += _columns[i].Name + "=" + row.Values[i] + "[AND]"
        }
        if(i == _this.sortColumnIndex) {
          $td.addClass("sortkey")
        }
        if(_this.mode != "pie") {
          $td.html('<span class="nodrilldownlink a">' + row.FormattedValues[i] + "</span>")
        }else {
          if(_this.mode == "pie" && i != _columns.length - 1) {
            $td.html('<span class="nodrilldownlink b">' + row.FormattedValues[i] + "</span>")
          }else {
            if(_this.mode == "pie" && i == _columns.length - 1) {
              $td.html('<span class="">' + jarvis.string.formatNumber(row.FormattedValues[i], 2) + "%</span>")
            }
          }
        }
        $tr.append($td)
      });
      var $checkbox = $tr.find(".checkfilter");
      $checkbox.attr("data-filter", filter);
      $checkbox.off("click");
      $checkbox.on("click", function(e) {
        if($checkbox.is(":checked")) {
          jarvis.visualisation.report.addPartial(jarvis.visualisation.report.globalfilter + filter);
          _this.Filters.push(jarvis.visualisation.report.globalfilter + filter)
        }else {
          jarvis.visualisation.report.removePartial(jarvis.visualisation.report.globalfilter + filter);
          if(_this.Filters.indexOf(jarvis.visualisation.report.globalfilter + filter) > -1) {
            _this.Filters.splice(_this.Filters.indexOf(jarvis.visualisation.report.globalfilter + filter), 1)
          }
        }
      });
      if(_this.Filters.indexOf(filter) > -1) {
        $checkbox.attr("checked", true)
      }else {
        $checkbox.attr("checked", false)
      }
      $tr.find(".drilldownlink").attr("data-filter", shortfilter);
      $tr.find(".dimensionvalue .drilldownlink").off("click");
      $tr.find(".dimensionvalue .drilldownlink").on("click", function(e) {
        if(_this.drilldownlevel < _this.levels.length - 1) {
          _this.drilldownlevel++
        }
        _this.dimensions.splice(0, _this.dimensions.length);
        $(_this.levels[_this.drilldownlevel]).each(function(index, dimension) {
          _this.dimensions.push(dimension)
        });
        $(_this.Filters).each(function(fi, f) {
          jarvis.visualisation.report.removePartial(f)
        });
        _this.Filters = [];
        jarvis.visualisation.report.setFilter(jarvis.visualisation.report.globalfilter + shortfilter)
      });
      if(_this.mode == "pie") {
        if(index == 0) {
          var $th = $('<th class="special pie">Contribution to total: <select class="input-medium comparemetricpicker"></select></th>');
          $(_allcolumns).each(function(ai, ao) {
            if(ao.AggregationType) {
              $th.find(".comparemetricpicker").append('<option value="' + ao.Name + '" ' + (ai == _this.compareColumnIndex ? "selected" : "") + ">" + ao.Name + "</option>")
            }
          });
          $th.find(".comparemetricpicker").off("click");
          $th.find(".comparemetricpicker").on("click", function(e) {
            e.stopPropagation()
          });
          $th.find(".comparemetricpicker").on("change", function(e) {
            var selected = $(this).val();
            $(_allcolumns).each(function(ai, ao) {
              if(ao.Name == selected) {
                _this.compareColumnIndex = ai
              }
            });
            _this.update(_this)
          });
          $($table.find("tr")[0]).append($th);
          $td = $('<td class="special"></td>');
          if(!_this.DateBox.comparePeriod) {
            $td.attr("rowspan", _this.pageSize)
          }else {
            $td.attr("rowspan", _this.pageSize * 3)
          }
          $tr.append($td);
          _this.drawPieChart(_this, $td, _columns, _datatoshow, _data, _totalsum_base, _totalsumcompare_base)
        }
      }else {
        if(_this.mode == "perf") {
          if(index == 0) {
            var $th = $('<th class="special pie"><select class="input-medium comparemetricpicker"></select></th>');
            $(_allcolumns).each(function(ai, ao) {
              if(ao.AggregationType) {
                $th.find(".comparemetricpicker").append('<option value="' + ao.Name + '" ' + (ai == _this.compareColumnIndex ? "selected" : "") + ">" + ao.Name + "</option>")
              }
            });
            $th.find(".comparemetricpicker").off("click");
            $th.find(".comparemetricpicker").on("click", function(e) {
              e.stopPropagation()
            });
            $th.find(".comparemetricpicker").on("change", function(e) {
              var selected = $(this).val();
              $(_allcolumns).each(function(ai, ao) {
                if(ao.Name == selected) {
                  _this.compareColumnIndex = ai
                }
              });
              _this.update(_this)
            });
            $($table.find("tr")[0]).append($th);
            var $header = $($table.find("tr")[0]);
            $($header.find("th")[$header.find("th").length - 2]).remove()
          }
          $($tr.find("td")[$tr.find("td").length - 1]).remove();
          var valIndex = row.FormattedValues.length - 1;
          $td = $('<td class="special bar">' + row.FormattedValues[valIndex] + "</td>");
          var value = +row.Values[valIndex];
          var width = Math.floor(row.Values[valIndex]) - 5 + "px";
          var $_bar = $('<div class="barwrapper"><div class="percentagebar" style="width:' + width + '"></div>' + '<td class="percentagecaption"><span >' + jarvis.string.formatNumber(row.Values[valIndex], 2) + "%</span></div>");
          $td.html($_bar);
          $tr.append($td)
        }else {
          if(_this.mode == "compare") {
            if(index == 0) {
              var $th = $('<th class="special pie"><select class="input-medium comparemetricpicker"></select></th>');
              $(_allcolumns).each(function(ai, ao) {
                if(ao.AggregationType) {
                  $th.find(".comparemetricpicker").append('<option value="' + ao.Name + '" ' + (ai == _this.compareColumnIndex ? "selected" : "") + ">" + ao.Name + "</option>")
                }
              });
              $th.find(".comparemetricpicker").off("click");
              $th.find(".comparemetricpicker").on("click", function(e) {
                e.stopPropagation()
              });
              $th.find(".comparemetricpicker").on("change", function(e) {
                var selected = $(this).val();
                $(_allcolumns).each(function(ai, ao) {
                  if(ao.Name == selected) {
                    _this.compareColumnIndex = ai
                  }
                });
                _this.update(_this)
              });
              $($table.find("tr")[0]).append($th);
              var $header = $($table.find("tr")[0]);
              $($header.find("th")[$header.find("th").length - 2]).remove()
            }
            $($tr.find("td")[$tr.find("td").length - 1]).remove();
            var valIndex = row.FormattedValues.length - 1;
            $td = $('<td class="special bar">' + row.FormattedValues[valIndex] + "</td>");
            var value = +row.Values[valIndex];
            var width = Math.floor(row.Values[valIndex]) - 5 + "px";
            var $_bar = $('<div class="barwrapper"><div class="percentagebar" style="width:' + width + '"></div>' + '<td class="percentagecaption"><span >' + jarvis.string.formatNumber(row.Values[valIndex], 2) + "%</span></div>");
            $td.html($_bar);
            $tr.append($td)
          }else {
            $($table.find("tr")[0]).find(".special").remove()
          }
        }
      }
      $table.append($tr)
    })
  }else {
    $(_datatoshow).each(function(index, row) {
      $tr = $("<tr ></tr>");
      $td = $('<td class="check" style="vertical-align: middle;"></td>');
      if(_this.mode == "pie") {
        $td.append('<div style="height:11px;width:11px;background-color: ' + (index >= 10 ? jarvis.colors[11] : jarvis.colors[index]) + ';"></div>')
      }else {
        $td.append('<input class="checkfilter" type=checkbox>')
      }
      $tr.append($td);
      $td = $('<td class="id">' + parseInt((_this.currentPage - 1) * _this.pageSize + index + 1) + ".</td>");
      $tr.append($td);
      var filter = "";
      var shortfilter = "";
      $(_columns).each(function(i, cell) {
        $td = $("<td></td>");
        if(_columns[i].AggregationType) {
          $td.addClass("metricvalue")
        }else {
          $td.html('<span class="nodrilldownlink c">' + row.FormattedValues[i] + "</span>");
          if(_this.mode != "pie") {
            $td.html('<span class="nodrilldownlink c">' + row.FormattedValues[i] + "</span>")
          }else {
            if(_this.mode == "pie" && i != _columns.length - 1) {
              $td.html('<span class="nodrilldownlink c">' + row.FormattedValues[i] + "</span>")
            }else {
              if(_this.mode == "pie" && i == _columns.length - 1) {
                $td.html('<span class="">' + jarvis.string.formatNumber(row.FormattedValues[i], 2) + "%</span>")
              }
            }
          }
          if(i == 0) {
            $td.addClass("dimensionvalue");
            shortfilter = _columns[i].Name + "=" + row.Values[i] + "[AND]"
          }
          filter += _columns[i].Name + "=" + row.Values[i] + "[AND]"
        }
        if(i == _this.sortColumnIndex) {
          $td.addClass("sortkey")
        }
        $tr.append($td)
      });
      if(_this.mode == "pie") {
        if(index == 0) {
          var $th = $('<th class="special pie">Contribution to total: <select class="input-medium comparemetricpicker"></select></th>');
          $(_allcolumns).each(function(ai, ao) {
            if(ao.AggregationType) {
              $th.find(".comparemetricpicker").append('<option value="' + ao.Name + '" ' + (ai == _this.compareColumnIndex ? "selected" : "") + ">" + ao.Name + "</option>")
            }
          });
          $th.find(".comparemetricpicker").off("click");
          $th.find(".comparemetricpicker").on("click", function(e) {
            e.stopPropagation()
          });
          $th.find(".comparemetricpicker").on("change", function(e) {
            var selected = $(this).val();
            $(_allcolumns).each(function(ai, ao) {
              if(ao.Name == selected) {
                _this.compareColumnIndex = ai
              }
            });
            _this.update(_this)
          });
          $($table.find("tr")[0]).append($th);
          $td = $('<td class="special"></td>');
          if(!_this.DateBox.comparePeriod) {
            $td.attr("rowspan", _this.pageSize)
          }else {
            $td.attr("rowspan", _this.pageSize * 3)
          }
          $tr.append($td);
          _this.drawPieChart(_this, $td, _columns, _datatoshow, _data, _totalsum_base, _totalsumcompare_base)
        }
      }else {
        if(_this.mode == "perf") {
          if(index == 0) {
            var $th = $('<th class="special pie"><select class="input-medium comparemetricpicker"></select></th>');
            $(_allcolumns).each(function(ai, ao) {
              if(ao.AggregationType) {
                $th.find(".comparemetricpicker").append('<option value="' + ao.Name + '" ' + (ai == _this.compareColumnIndex ? "selected" : "") + ">" + ao.Name + "</option>")
              }
            });
            $th.find(".comparemetricpicker").off("click");
            $th.find(".comparemetricpicker").on("click", function(e) {
              e.stopPropagation()
            });
            $th.find(".comparemetricpicker").on("change", function(e) {
              var selected = $(this).val();
              $(_allcolumns).each(function(ai, ao) {
                if(ao.Name == selected) {
                  _this.compareColumnIndex = ai
                }
              });
              _this.update(_this)
            });
            $($table.find("tr")[0]).append($th);
            var $header = $($table.find("tr")[0]);
            $($header.find("th")[$header.find("th").length - 2]).remove()
          }
          $($tr.find("td")[$tr.find("td").length - 1]).remove()
        }else {
          if(_this.mode == "compare") {
            if(index == 0) {
              var $th = $('<th class="special pie"><select class="input-medium comparemetricpicker"></select></th>');
              $(_allcolumns).each(function(ai, ao) {
                if(ao.AggregationType) {
                  $th.find(".comparemetricpicker").append('<option value="' + ao.Name + '" ' + (ai == _this.compareColumnIndex ? "selected" : "") + ">" + ao.Name + "</option>")
                }
              });
              $th.find(".comparemetricpicker").off("click");
              $th.find(".comparemetricpicker").on("click", function(e) {
                e.stopPropagation()
              });
              $th.find(".comparemetricpicker").on("change", function(e) {
                var selected = $(this).val();
                $(_allcolumns).each(function(ai, ao) {
                  if(ao.Name == selected) {
                    _this.compareColumnIndex = ai
                  }
                });
                _this.update(_this)
              });
              $($table.find("tr")[0]).append($th);
              var $header = $($table.find("tr")[0]);
              $($header.find("th")[$header.find("th").length - 2]).remove()
            }
            $($tr.find("td")[$tr.find("td").length - 1]).remove()
          }
        }
      }
      var $checkbox = $tr.find(".checkfilter");
      $checkbox.attr("data-filter", filter);
      $checkbox.off("click");
      $checkbox.on("click", function(e) {
        if($checkbox.is(":checked")) {
          jarvis.visualisation.report.addPartial(jarvis.visualisation.report.globalfilter + filter);
          _this.Filters.push(jarvis.visualisation.report.globalfilter + filter)
        }else {
          jarvis.visualisation.report.removePartial(jarvis.visualisation.report.globalfilter + filter);
          if(_this.Filters.indexOf(jarvis.visualisation.report.globalfilter + filter) > -1) {
            _this.Filters.splice(_this.Filters.indexOf(jarvis.visualisation.report.globalfilter + filter), 1)
          }
        }
      });
      if(_this.Filters.indexOf(filter) > -1) {
        $checkbox.attr("checked", true)
      }else {
        $checkbox.attr("checked", false)
      }
      $tr.find(".drilldownlink").attr("data-filter", shortfilter);
      $tr.find(".dimensionvalue .drilldownlink").off("click");
      $tr.find(".dimensionvalue .drilldownlink").on("click", function(e) {
        if(_this.drilldownlevel < _this.levels.length) {
          _this.drilldownlevel++
        }
        _this.dimensions.splice(0, _this.dimensions.length);
        $(_this.levels[_this.drilldownlevel]).each(function(index, dimension) {
          _this.dimensions.push(dimension)
        });
        $(_this.Filters).each(function(fi, f) {
          jarvis.visualisation.report.removePartial(f)
        });
        _this.Filters = [];
        jarvis.visualisation.report.setFilter(jarvis.visualisation.report.globalfilter + shortfilter)
      });
      $table.append($tr);
      $tr = $("<tr></tr>");
      $td = $('<td class="check"></td>');
      $tr.append($td);
      $td = $('<td class="id"></td>');
      $tr.append($td);
      $(_columns).each(function(i, cell) {
        $td = $("<td></td>");
        if(_columns[i].AggregationType) {
          $td.addClass("metricvalue");
          if(_this.mode != "pie") {
            $td.html('<span class="nodrilldownlink d">' + row.FormattedValues[i] + "</span>")
          }else {
            if(_this.mode == "pie" && i != _columns.length - 1) {
              $td.html('<span class="nodrilldownlink d">' + row.FormattedValues[i] + "</span>")
            }else {
              if(_this.mode == "pie" && i == _columns.length - 1) {
                $td.html('<span class="">' + jarvis.string.formatNumber(row.FormattedValues[i], 2) + "%</span>")
              }
            }
          }
        }else {
          $td.addClass("");
          $td.attr("colspan", _this.dimensions.length);
          if(i == 0) {
            $td.html(jarvis.date.formatDate(_this.DateBox.getDate().base_fromdate) + " - " + jarvis.date.formatDate(_this.DateBox.getDate().base_todate))
          }else {
            $td = null
          }
        }
        if(i == _this.sortColumnIndex && _columns[i].AggregationType) {
          $td.addClass("sortkey")
        }
        $tr.append($td)
      });
      if(_this.mode == "perf") {
        $($tr.find("td")[$tr.find("td").length - 1]).remove();
        var valIndex = row.FormattedValues.length - 1;
        $td = $('<td class="special bar">' + row.FormattedValues[valIndex] + "</td>");
        var value = +row.Values[valIndex];
        var width = Math.floor(row.Values[valIndex]) - 5 + "px";
        var $_bar = $('<div class="barwrapper"><div class="percentagebar" style="width:' + width + '"></div>' + '<td class="percentagecaption"><span >' + jarvis.string.formatNumber(row.Values[valIndex], 2) + "%</span></div>");
        $td.html($_bar);
        $tr.append($td)
      }else {
        if(_this.mode == "compare") {
          $($tr.find("td")[$tr.find("td").length - 1]).remove();
          var valIndex = row.FormattedValues.length - 1;
          $td = $('<td class="special bar">' + row.FormattedValues[valIndex] + "</td>");
          var value = +row.Values[valIndex];
          var width = Math.floor(row.Values[valIndex]) - 5 + "px";
          var $_bar = $('<div class="barwrapper"><div class="percentagebar" style="width:' + width + '"></div>' + '<td class="percentagecaption"><span >' + jarvis.string.formatNumber(row.Values[valIndex], 2) + "%</span></div>");
          $td.html($_bar);
          $tr.append($td)
        }
      }
      $table.append($tr);
      $tr = $("<tr></tr>");
      $td = $('<td class="check"></td>');
      $tr.append($td);
      $td = $('<td class="id"></td>');
      $tr.append($td);
      var key = "";
      $(_columns).each(function(i, cell) {
        if(_columns[i].AggregationType == null) {
          key += row.Values[i]
        }
      });
      var row_compare;
      $(_data_compare_toshow).each(function(icompare, checkrow) {
        var key_compare = "";
        $(_columns).each(function(i, cell) {
          if(_columns[i].AggregationType == null) {
            key_compare += checkrow.Values[i]
          }
        });
        if(key == key_compare) {
          row_compare = checkrow
        }
      });
      $(_columns).each(function(i, cell) {
        $td = $("<td></td>");
        if(_columns[i].AggregationType) {
          $td.addClass("metricvalue");
          try {
            if(_this.mode != "pie") {
              $td.html('<span class="nodrilldownlink e">' + row_compare.FormattedValues[i] + "</span>")
            }else {
              if(_this.mode == "pie" && i != _columns.length - 1) {
                $td.html('<span class="nodrilldownlink e">' + row_compare.FormattedValues[i] + "</span>")
              }else {
                if(_this.mode == "pie" && i == _columns.length - 1) {
                  $td.html('<span class="">' + jarvis.string.formatNumber(row_compare.FormattedValues[i], 2) + "%</span>")
                }
              }
            }
          }catch(ex) {
            if(_this.mode != "pie") {
              $td.html('<span class="nodrilldownlink f">N/A</span>')
            }else {
              if(_this.mode == "pie" && i != _columns.length - 1) {
                $td.html('<span class="nodrilldownlink f">N/A</span>')
              }else {
                if(_this.mode == "pie" && i == _columns.length - 1) {
                  $td.html('<span class="">N/A</span>')
                }
              }
            }
          }
        }else {
          $td.addClass("");
          $td.attr("colspan", _this.dimensions.length);
          if(i == 0) {
            $td.html(jarvis.date.formatDate(_this.DateBox.getDate().compare_fromdate) + " - " + jarvis.date.formatDate(_this.DateBox.getDate().compare_todate))
          }else {
            $td = null
          }
        }
        if(i == _this.sortColumnIndex && _columns[i].AggregationType) {
          $td.addClass("sortkey")
        }
        $tr.append($td)
      });
      if(_this.mode == "perf") {
        var $_bar;
        try {
          $($tr.find("td")[$tr.find("td").length - 1]).remove();
          var valIndex = row.FormattedValues.length - 1;
          $td = $('<td class="special bar">' + row_compare.FormattedValues[valIndex] + "</td>");
          var value = +row_compare.Values[valIndex];
          var width = Math.floor(row_compare.Values[valIndex]) - 5 + "px";
          $_bar = $('<div class="barwrapper"><div class="percentagebar" style="width:' + width + '"></div>' + '<td class="percentagecaption"><span >' + jarvis.string.formatNumber(row_compare.Values[valIndex], 2) + "%</span></div>")
        }catch(ex) {
          $td = $('<td class="special bar">0</td>');
          $_bar = $('<div class="barwrapper"><div class="percentagebar" style="width:' + 0 + 'px"></div>' + '<td class="percentagecaption"><span >' + jarvis.string.formatNumber(0, 2) + "%</span></div>")
        }
        $td.html($_bar);
        $tr.append($td)
      }else {
        if(_this.mode == "compare") {
          var $_bar;
          try {
            $($tr.find("td")[$tr.find("td").length - 1]).remove();
            var valIndex = row.FormattedValues.length - 1;
            $td = $('<td class="special bar">' + row_compare.FormattedValues[valIndex] + "</td>");
            var value = +row_compare.Values[valIndex];
            var width = Math.floor(row_compare.Values[valIndex]) - 5 + "px";
            $_bar = $('<div class="barwrapper"><div class="percentagebar" style="width:' + width + '"></div>' + '<td class="percentagecaption"><span >' + jarvis.string.formatNumber(row_compare.Values[valIndex], 2) + "%</span></div>")
          }catch(ex) {
            $td = $('<td class="special bar">0</td>');
            $_bar = $('<div class="barwrapper"><div class="percentagebar" style="width:' + 0 + 'px"></div>' + '<td class="percentagecaption"><span >' + jarvis.string.formatNumber(0, 2) + "%</span></div>")
          }
          $td.html($_bar);
          $tr.append($td)
        }
      }
      $table.append($tr);
      if(_this.mode == "table") {
        $tr = $("<tr></tr>");
        $td = $('<td class="check"></td>');
        $tr.append($td);
        $td = $('<td class="id"></td>');
        $tr.append($td);
        $(_columns).each(function(i, cell) {
          $td = $("<td></td>");
          if(_columns[i].AggregationType) {
            var useNA = false;
            $td.addClass("metricvalue comparison");
            try {
              var value = percentageChange(row_compare.Values[i], row.Values[i])
            }catch(ex) {
              value = 0;
              useNA = true
            }
            var _class = "";
            var metric = cell;
            if(metric.RatioDirection == -1 && value < 0) {
              _class = "positive"
            }
            if(metric.RatioDirection == -1 && value > 0) {
              _class = "negative"
            }
            if(metric.RatioDirection == 1 && value > 0) {
              _class = "positive"
            }
            if(metric.RatioDirection == 1 && value < 0) {
              _class = "negative"
            }
            if(_class == "") {
              _class = "neutral"
            }
            if(_this.mode != "pie") {
              if(useNA) {
                $td.html("N/A")
              }else {
                $td.html(jarvis.string.formatNumber(value, 2) + "%")
              }
            }else {
              if(_this.mode == "pie" && i != _columns.length - 1) {
                if(useNA) {
                  $td.html("N/A")
                }else {
                  $td.html(jarvis.string.formatNumber(value, 2) + "%")
                }
              }else {
                if(_this.mode == "pie" && i == _columns.length - 1) {
                  if(useNA) {
                    $td.html("N/A")
                  }else {
                    $td.html(jarvis.string.formatNumber(value, 2) + "%")
                  }
                }
              }
            }
            $td.addClass(_class)
          }else {
            $td.addClass("comparison");
            $td.attr("colspan", _this.dimensions.length);
            if(i == 0) {
              $td.html("% Change")
            }else {
              $td = null
            }
          }
          if(i == _this.sortColumnIndex && _columns[i].AggregationType) {
            $td.addClass("sortkey")
          }
          $tr.append($td)
        });
        $table.append($tr)
      }
    })
  }
  var first = (_this.currentPage - 1) * _this.pageSize + 1;
  var last = _this.currentPage * _this.pageSize;
  if(last > _data.length) {
    last = _data.length
  }
  if(_this.mode == "pie" && _datatoshow.length < _this.pageSize) {
    for(i = _datatoshow.length;i < _this.pageSize;i++) {
      var $tr = $('<tr class="emptyrowfiller ' + (i == _datatoshow.length ? "first" : "") + '"></tr>');
      var $td = $('<td colspan="' + parseInt(_columns.length + 2) + '">&nbsp;</td>');
      $tr.append($td);
      $table.append($tr);
      if($table.find("tr").length > 10) {
        break
      }
    }
  }
  var $footer = $($(_this.Container).find(".bottomfooter"));
  var $pager = $footer.find(".pager .pageinfoselect");
  $pager.val(_this.pageSize);
  var $pageinfo = $footer.find(".pageinfo");
  $pageinfo.html(first + " - " + last + " of " + _data.length);
  var $pagecontrol = $footer.find(".pagecontrol");
  if(_this.currentPage > 1) {
    $($pagecontrol).find(".prev").removeClass("disabled")
  }else {
    $($pagecontrol).find(".prev").addClass("disabled")
  }
  if(last < _data.length) {
    $($pagecontrol).find(".next").removeClass("disabled")
  }else {
    $($pagecontrol).find(".next").addClass("disabled")
  }
  var $charttype = $(_this.Container).find(".tabletype");
  $charttype.find("button").each(function(i, o) {
    $(this).removeClass("active")
  });
  $charttype.find(".btn_" + this.mode).addClass("active");
  var $tablecontrol = $(_this.Container).find(".tablecontrol");
  if(_this.dimensions.length > 1) {
    var _html = "Secondary dimension" + (_this.dimensions.length > 2 ? "s" : "") + ": ";
    $(_this.dimensions).each(function(i, d) {
      if(i > 0) {
        _html += d.Name + ", "
      }
    });
    _html = _html.substring(0, _html.length - 2);
    $($tablecontrol).find(".secondarybutton").html(_html);
    var o = new jarvis.visualisation.picker.Dimensions({container:$item, prefix:"Secondary dimension: ", placeholdertext:"Secondary dimension", selected:_this.dimensions.length == 1 ? "" : _this.dimensions[1].Name})
  }else {
    var $item = $('<div class="jarvis picker dimensions" data-type="button"></div>');
    $($tablecontrol).find(".secondary").empty();
    $($tablecontrol).find(".secondary").append($item);
    var o = new jarvis.visualisation.picker.Dimensions({container:$item, prefix:"Secondary dimension: ", placeholdertext:"Secondary dimension", selected:_this.dimensions.length == 1 ? "" : _this.dimensions[1].Name});
    $(o).bind("select", function(data, dimension) {
      dimension = _.find(jarvis.objects.Dimensions, function(item) {
        return item.Name == dimension
      });
      if(_this.dimensions.indexOf(dimension) == -1) {
        if(_this.dimensions.length == 1) {
          _this.sortColumnIndex = parseInt(_this.sortColumnIndex) + 1;
          _this.ColumnIndex = parseInt(_this.ColumnIndex) + 1;
          _this.compareColumnIndex = parseInt(_this.compareColumnIndex) + 1
        }else {
          _this.dimensions.splice(1, 1)
        }
        _this.dimensions.push(dimension);
        _this.fetch(_this)
      }
    })
  }
  if(!_this.isother) {
    $(".japi.primarydimension").html(_this.levels[_this.drilldownlevel][0].Name);
    $(".japi.primarydimension").addClass("on");
    $(".japi.other.picker").removeClass("on");
    $(".japi.other.picker .jbtn").html('Other <span class="caret"></span>')
  }else {
    $(".japi.primarydimension").removeClass("on");
    $(".drilldownlink").off("click");
    $(".drilldownlink").addClass("disabled");
    $(".drilldownlink").parent().addClass("disabled")
  }
  if(_this.drilldownlevel > 0 || _this.drilldownlevel == 0 && _this.levels.length == 1) {
    $(".japi.other.picker").css("visibility", "visible")
  }else {
    $(".japi.other.picker").css("visibility", "hidden")
  }
  _this.setState(_this);
  $(jarvis).trigger("tableresize")
};
jarvis.visualisation.report.TableEx.prototype.updateCompare = function(sender, metric, series) {
  var _this = sender
};
jarvis.visualisation.report.TableEx.prototype.drawPieChart = function(sender, Container, columns, data, alldata, _totalsum, _totalsumcompare) {
  var _this = sender;
  var chart = new Highcharts.Chart({chart:{renderTo:$(Container).get(0), backgroundColor:null, plotBackgroundColor:null, plotBorderWidth:null, plotShadow:false, width:300, height:300, type:"pie", marginTop:0, marginLeft:0, marginRight:0, marginBottom:0, spacingLeft:0, spacingTop:0, spacingRight:0, spacingBottom:0}, title:{text:null}, tooltip:{formatter:function() {
    return"<b>" + this.point.name + "</b><br/>" + this.series.name + ": " + jarvis.string.formatNumber(this.percentage, 2) + " %"
  }}, legend:{enabled:false}, credits:{enabled:false}, exporting:{enabled:false}, plotOptions:{pie:{showInLegend:true, size:"90%"}}, series:[{name:function() {
    var name = "test";
    name = columns[columns.length - 2].Name;
    return name
  }(), type:"pie", data:function() {
    var result = [];
    var sum = 0;
    $(data).each(function(index, item) {
      if(index < 10) {
        var name = "";
        $(columns).each(function(ci, co) {
          if(co.AggregationType) {
          }else {
            name += columns[ci].Name + ": " + item.FormattedValues[ci] + "<br/>"
          }
        });
        name = name.substring(0, name.length - 5);
        var y = 0;
        y = item.Values[item.Values.length - 2] / _totalsum * 100;
        sum += y;
        result.push({name:name, y:y, color:jarvis.colors[index]})
      }
    });
    if(100 - Math.floor(sum) > 0) {
      var name = "Other";
      var y = 100 - sum;
      result.push({name:name, y:y, color:jarvis.colors[11]})
    }
    return result
  }(), dataLabels:{formatter:function() {
    return this.y > 5 ? this.point.name : null
  }, color:"white", distance:-30, enabled:false}}, {name:function() {
    var name = "test";
    name = columns[columns.length - 1].Name;
    return name
  }(), type:"pie", innerSize:"70%", data:function() {
    var result = [];
    if(_this.ColumnIndex != _this.compareColumnIndex) {
      var sum = 0;
      $(data).each(function(index, item) {
        if(index < 10) {
          var name = "";
          $(columns).each(function(ci, co) {
            if(co.AggregationType) {
            }else {
              name += columns[ci].Name + ": " + item.FormattedValues[ci] + "<br/>"
            }
          });
          name = name.substring(0, name.length - 5);
          y = item.Values[item.Values.length - 1];
          sum += y;
          result.push({name:name, y:y})
        }
      });
      if(100 - Math.floor(sum) > 0) {
        var name = "Other";
        var y = 100 - sum;
        result.push({name:name, y:y, color:jarvis.colors[11]})
      }
    }
    return result
  }(), dataLabels:{formatter:function() {
    return this.y > 1 ? "<b>" + this.point.name + ":</b> " + this.y + "%" : null
  }, enabled:false}}]})
};
jarvis.visualisation.report.TableEx.prototype.draw = function(Container) {
  var _this = this;
  var _html = '<div class="tableexwrapper"><table class="table table-striped tableex"></table></div>';
  var $table = $(_html);
  $(Container).append($table);
  var $header = $('<div class="topheader"></div>');
  var $headercontent = $('<div class="headercontent"></div>');
  $header.append($headercontent);
  $(Container).prepend($header);
  var $footer = $('<div class="bottomfooter"></div>');
  var $footer_content = $('<div class="footercontent"></div>');
  $footer_content.append('<div class="pagecontrol"></div><div class="pageinfo"></div><div class="pager"></div>');
  _html = 'Show rows: <select class="pageinfoselect input-mini">' + "<option value=50>50</option>" + "<option value=100>100</option>" + "<option value=250>250</option>" + "<option value=500>500</option>" + "<option value=1000>1000</option>" + "<option value=2500>2500</option>" + "</select>";
  $footer_content.find(".pager").html(_html);
  $footer_content.find(".pager .pageinfoselect").off("click");
  $footer_content.find(".pager .pageinfoselect").on("click", function(e) {
    _this.pageSize = $(this).val();
    _this.update(_this)
  });
  _html = "x - y of " + "z";
  $footer_content.find(".pageinfo").html(_html);
  $footer.append($footer_content);
  _html = '<div class="btn-group"><button class="btn prev disabled"></button><button class="btn next disabled"></button></div>';
  $footer_content.find(".pagecontrol").html(_html);
  $footer_content.find(".pagecontrol .prev").off("click");
  $footer_content.find(".pagecontrol .prev").on("click", function(e) {
    if(!$(this).hasClass("disabled")) {
      _this.currentPage -= 1;
      _this.update(_this)
    }
  });
  $footer_content.find(".pagecontrol .next").off("click");
  $footer_content.find(".pagecontrol .next").on("click", function(e) {
    if(!$(this).hasClass("disabled")) {
      _this.currentPage += 1;
      _this.update(_this)
    }
  });
  $footer.append($footer_content);
  $(Container).append($footer);
  _html = '<div class="drilldownwrapper"><span class="japi dimensionpickerlabel" style="display: inline-block;font: normal 12px Arial;height: 22px;vertical-align: middle;">Primary Dimension: </span>';
  _html += '<li class="japi primarydimension" data-id="' + "Nane" + '" style="">';
  _html += "Name" + "</li>";
  _html += '<div class="japi other picker btn-group  jarvis dimensions" style="display:inline;">';
  _html += '<li class="japi other picker dropdown" data-type="button" data-toggle="dropdown" style="background-color:white;position: absolute;display: inline-block; margin-left:5px;color:#08C;cursor:pointer;" onclick="">';
  _html += "Other";
  _html += '<span class="caret" style=""></span></li>' + '<div class="japi otherlist"></div></div>' + "</div></div></div></div>";
  var $tablecontrol = $('<div class="tablecontrol"></div>');
  $tablecontrol.append('<div class="secondary btn-group"><button class="btn secondarywrapper dropdown-toggle dropdown" data-toggle="dropdown"><span class="secondarybutton">Secondary dimension...</span>&nbsp;<span class="caret"></span></button><div class="secondarylist"><ul class="jarvis secondarylistcontainer dropdown-menu"></ul></div></div>');
  $tablecontrol.append('<div class="toolbar"><div class="tabletype"></div><div class="search input-prepend"><input type="text" class="quicksearch span2"><span class="add-on"><i class="searchicon icon-search"></i></span></div></div></div>');
  var $charttype = $('<div class="toolbaroptions btn-group" data-toggle="buttons-radio" ></div>');
  $charttype.append('<button rel="tooltip" title="Table" class="btn btn_table active">' + '<img src="' + jarvis.hostname + '/assets//img/glyphicons_114_list.png""/>' + "</i></button>");
  $charttype.append('<button rel="tooltip" title="Pie chart" class="btn btn_pie">' + '<img src="' + jarvis.hostname + '/assets//img/glyphicons_042_pie_chart.png"/>' + "</button>");
  $charttype.append('<button rel="tooltip" title="Performance" class="btn btn_perf">' + '<img src="' + jarvis.hostname + '/assets//img/glyphicons_110_align_left.png"/>' + "</button>");
  $tablecontrol.find(".add-on").off("click");
  $tablecontrol.find(".add-on").on("click", function(e) {
    $(_this.Filters).each(function(fi, f) {
      jarvis.visualisation.report.removePartial(f)
    });
    _this.Filters = [];
    if($tablecontrol.find(".quicksearch").val() == "") {
      jarvis.visualisation.report.setFilter("")
    }else {
      var shortfilter = _this.dimensions[0].Name + "=" + $tablecontrol.find(".quicksearch").val() + "[AND]";
      jarvis.visualisation.report.setFilter(shortfilter)
    }
  });
  $tablecontrol.find(".quicksearch").keypress(function(e) {
    if(e.which == 13) {
      $tablecontrol.find(".add-on").click()
    }
  });
  $charttype.find(".btn_table").off("click");
  $charttype.find(".btn_table").on("click", function(e) {
    _this.mode = "table";
    _this.update(_this)
  });
  $charttype.find(".btn_pie").off("click");
  $charttype.find(".btn_pie").on("click", function(e) {
    _this.mode = "pie";
    _this.sortColumnIndex = -1;
    _this.update(_this)
  });
  $charttype.find(".btn_perf").off("click");
  $charttype.find(".btn_perf").on("click", function(e) {
    _this.mode = "perf";
    _this.sortColumnIndex = -1;
    _this.update(_this)
  });
  $charttype.find(".btn_compare").off("click");
  $charttype.find(".btn_compare").on("click", function(e) {
    _this.mode = "compare";
    _this.sortColumnIndex = -1;
    _this.update(_this)
  });
  $tablecontrol.find(".tabletype").html($charttype);
  var $dimlist = $($tablecontrol.find(".jarvis.secondarylistcontainer"));
  $dimlist.append($('<li class="nav-header">' + _this.dimensions[0].Name + "</li>"));
  var $item = $('<div class="jarvis picker dimensions" data-type="button"></div>');
  $($tablecontrol).find(".secondary").empty();
  $($tablecontrol).find(".secondary").append($item);
  var o = new jarvis.visualisation.picker.Dimensions({container:$item, prefix:"Add dimension: ", placeholdertext:"Add dimension", selected:_this.dimensions.length >= 1 ? "" : _this.dimensions[1].Name, showselected:false});
  $(o).bind("select", function(data, dimension) {
    dimension = _.find(jarvis.objects.Dimensions, function(item) {
      return item.Name == dimension
    });
    if(_this.dimensions.indexOf(dimension) == -1) {
      _this.sortColumnIndex = parseInt(_this.sortColumnIndex) + 1;
      _this.ColumnIndex = parseInt(_this.ColumnIndex) + 1;
      _this.compareColumnIndex = parseInt(_this.compareColumnIndex) + 1;
      _this.dimensions.push(dimension);
      _this.fetch(_this)
    }
  });
  $item = $($header.find(".japi.other.picker.dropdown"));
  o = new jarvis.visualisation.picker.Dimensions({container:$item, prefix:"", placeholdertext:"Other", type:"none", selected:_this.isother ? _this.dimensions[0].Name : ""});
  $(o).bind("select", function(data, dimension) {
    dimension = _.find(jarvis.objects.Dimensions, function(item) {
      return item.Name == dimension
    });
    if(_this.dimensions.indexOf(dimension) == -1) {
      _this.dimensions[0] = dimension;
      _this.isother = true;
      _this.fetch(_this)
    }
  });
  $(".japi.primarydimension").off("click");
  $(".japi.primarydimension").on("click", function(e) {
    var dimension = $(".japi.primarydimension").text();
    dimension = _.find(jarvis.objects.Dimensions, function(item) {
      return item.Name == dimension
    });
    _this.dimensions[0] = dimension;
    _this.isother = false;
    _this.fetch(_this)
  });
  $header.append($tablecontrol);
  $(".japi.primarydimension").html(_this.levels[_this.drilldownlevel][0].Name);
  if(!_this.isother) {
    $(".japi.primarydimension").addClass("on");
    $(".japi.other.picker").removeClass("on");
    $(".japi.other.picker .jbtn").html('Other <span class="caret"></span>')
  }else {
    $(".japi.primarydimension").removeClass("on");
    $(".drilldownlink").off("click");
    $(".drilldownlink").addClass("disabled");
    $(".drilldownlink").parent().addClass("disabled")
  }
  if(_this.drilldownlevel > 0 || _this.drilldownlevel == 0 && _this.levels.length == 1) {
    $(".japi.other.picker").css("visibility", "visible")
  }else {
    $(".japi.other.picker").css("visibility", "hidden")
  }
};
jarvis.visualisation.report.TableEx.prototype.uid = function(sender) {
  return"tableex-1234"
};
jarvis.visualisation.report.TableEx.prototype.setState = function(sender) {
  var _this = sender;
  if(!jarvis.state[_this.uid()]) {
    jarvis.state[_this.uid()] = {}
  }
  jarvis.debug.log("INFO", "jarvis.visualisation.report.TableEx", 6, 'Table "' + _this.uid() + '" saving state.');
  jarvis.state[_this.uid()].ChartType = _this.ChartType;
  jarvis.state[_this.uid()].Resolution = _this.Resolution;
  jarvis.state[_this.uid()].primaryMetric = _this.primaryMetric;
  jarvis.state[_this.uid()].secondaryMetric = _this.secondaryMetric;
  jarvis.state[_this.uid()].sortColumnIndex = _this.sortColumnIndex;
  jarvis.state[_this.uid()].ColumnIndex = _this.ColumnIndex;
  jarvis.state[_this.uid()].compareColumnIndex = _this.compareColumnIndex;
  jarvis.state[_this.uid()].sortDir = _this.sortDir;
  jarvis.state[_this.uid()].currentPage = _this.currentPage;
  jarvis.state[_this.uid()].pageSize = _this.pageSize;
  jarvis.state[_this.uid()].mode = _this.mode;
  jarvis.state[_this.uid()].dimensions = _this.dimensions;
  jarvis.state[_this.uid()].levels = _this.levels;
  jarvis.state[_this.uid()].drilldownlevel = _this.drilldownlevel;
  jarvis.state[_this.uid()].isother = _this.isother;
  jarvis.state[_this.uid()].globalfilter = jarvis.visualisation.report.globalfilter;
  jarvis.state[_this.uid()].Filters = _this.Filters
};
jarvis.visualisation.report.TableEx.prototype.getState = function(sender) {
  var _this = sender;
  jarvis.debug.log("INFO", "jarvis.visualisation.report.TableEx", 6, 'Table "' + _this.uid() + '" loading state.');
  if(jarvis.state[_this.uid()] != null) {
    _this.ChartType = jarvis.state[_this.uid()].ChartType;
    _this.Resolution = jarvis.state[_this.uid()].Resolution;
    _this.primaryMetric = jarvis.state[_this.uid()].primaryMetric;
    _this.secondaryMetric = jarvis.state[_this.uid()].secondaryMetric;
    _this.sortColumnIndex = jarvis.state[_this.uid()].sortColumnIndex;
    _this.ColumnIndex = jarvis.state[_this.uid()].ColumnIndex;
    _this.compareColumnIndex = jarvis.state[_this.uid()].compareColumnIndex;
    _this.sortDir = jarvis.state[_this.uid()].sortDir;
    _this.currentPage = jarvis.state[_this.uid()].currentPage;
    _this.pageSize = jarvis.state[_this.uid()].pageSize;
    _this.mode = jarvis.state[_this.uid()].mode;
    _this.dimensions = jarvis.state[_this.uid()].dimensions;
    _this.levels = jarvis.state[_this.uid()].levels;
    _this.drilldownlevel = jarvis.state[_this.uid()].drilldownlevel;
    _this.isother = jarvis.state[_this.uid()].isother;
    jarvis.visualisation.report.globalfilter = jarvis.state[_this.uid()].globalfilter;
    _this.Filters = jarvis.state[_this.uid()].Filters
  }
};
jarvis.debug.log("INFO", "jarvis.visualisation.report.TableEx", 6, "JS source loaded");
jarvis.provide("jarvis.visualisation.report.Histogram");
jarvis.require("jarvis.debug");
jarvis.require("jarvis.date");
jarvis.require("jarvis.string");
jarvis.require("jarvis.visualisation.report");
jarvis.visualisation.report.Histogram = function(options) {
  var start = (new Date).getMilliseconds();
  this._this = this;
  this.options = options;
  this.default_caption = "Right now";
  this.default_subcaption = "Events per Second";
  this.default_useAverage = true;
  this.key = "";
  this.initialized = false;
  this.gettingBackData = false;
  this.initialCallbacks = [];
  this.initialTimestamp = null;
  this.Resolution = "Day";
  this.containers = [];
  jarvis.objects.Dimensions.List();
  jarvis.objects.Metrics.List();
  this.DateBox = jarvis.visualisation.picker.DateBox;
  var _this = this;
  $(_this.DateBox).bind("datechange", function() {
    $(_this.containers).each(function(i, container) {
      _this.fetch(_this, container)
    })
  });
  $(jarvis.visualisation).bind("metricbox-primarymetric", function(e, sender, metric) {
    _this.metrics[1] = metric;
    $(_this.containers[0]).attr("data-metrics", _this.metrics[0].Name + "," + _this.metrics[1].Name);
    _this.fetch(_this, _this.containers[0])
  });
  _this.destroy = function() {
    $(_this).unbind("data");
    $(_this).unbind("click");
    $(jarvis.visualisation).unbind("metricbox-primarymetric");
    $(jarvis.visualisation.report).unbind("filter")
  };
  var executionTime = (new Date).getMilliseconds() - start;
  return this
};
jarvis.visualisation.report.Histogram.prototype.init = function(options, container) {
  var _this = this;
  var start = (new Date).getMilliseconds();
  this._this = this;
  this.options = options;
  this.containers = this.containers || [];
  this.dimensions = [];
  this.metrics = [];
  $(jarvis.realtime).bind("filterchange", function(e) {
  });
  var matchedContainers = null;
  if(container) {
    matchedContainers = $(container)
  }else {
    matchedContainers = $(".jarvis.report.histogram")
  }
  if(matchedContainers.length == 0) {
    return
  }
  $(matchedContainers).each(function(index, item) {
    if(!$(this).parent().hasClass("prettyprint")) {
      jarvis.debug.log("INFO", "jarvis.visualisation.report.Histogram", 6, "Applying to container ('" + this.id + "')");
      var _metrics = $(item).attr("data-metrics");
      if(!_metrics) {
        return
      }
      _this.itemCount = $(item).attr("data-limit");
      if(!_this.itemCount) {
        _this.itemCount = 10
      }
      _metrics = _metrics.split(",");
      $(_metrics).each(function(index, item) {
        _metrics[index] = $.trim(_metrics[index]);
        _this.metrics.push(_metrics[index])
      });
      $(jarvis.dataaccess.metrics).each(function(index, item) {
        if(_metrics.indexOf(item.Name) > -1) {
          _this.metrics[_metrics.indexOf(item.Name)] = item
        }
      });
      $(this).unbind("undata");
      $(this).bind("data", function(evt, ret) {
        ret.data = $(this).data().data
      });
      $(this).unbind("undata");
      $(this).bind("click", function(evt) {
        $(this).trigger("clicked", $(this).data().data)
      });
      $(jarvis.visualisation.report).unbind("filter");
      $(jarvis.visualisation.report).bind("filter", function(filter) {
        _this.fetch(_this)
      });
      $(item).empty();
      _this.draw(item);
      _this.fetch(_this, item);
      $(this).find(".settings").off("click");
      $(this).find(".settings").on("click", function(e) {
        jarvis.getDashboard().showEditWidget({_this:jarvis.getDashboard(), container:jarvis.getDashboard().container, addNew:false, widgetID:$(item).attr("data-widgetid"), sender:_this, sendercontainer:item})
      });
      _this.containers.push(item)
    }
  });
  var executionTime = (new Date).getMilliseconds() - start;
  jarvis.debug.log("INFO", "jarvis.visualisation.report.Histogram", 5, "...init (" + executionTime + "ms)");
  return this
};
jarvis.visualisation.report.Histogram.prototype.fetch = function(sender, container) {
  if(!sender) {
    sender = jarvis.visualisation.report.Histogram
  }
  var _this = sender;
  var startdate = jarvis.visualisation.picker.DateBox.getDate().base_fromdate;
  var enddate = jarvis.visualisation.picker.DateBox.getDate().base_todate;
  if(_this.DateBox.comparePeriod) {
    var compare_startdate = jarvis.visualisation.picker.DateBox.getDate().compare_fromdate;
    var compare_enddate = jarvis.visualisation.picker.DateBox.getDate().compare_todate
  }
  var _dimensions = $(container).attr("data-dimensions");
  var _dimensionslist = _dimensions;
  if(!_dimensions) {
    return""
  }
  _dimensions = _dimensions.split(",");
  $(_dimensions).each(function(index, item) {
    var dindex = -1;
    $(jarvis.objects.Dimensions).each(function(mi, mo) {
      if(mo.Name == $.trim(item)) {
        dindex = mi
      }
    });
    _dimensions[index] = jarvis.objects.Dimensions[dindex];
    _this.dimensions.push(_dimensions[index])
  });
  $(jarvis.objects.Dimensions).each(function(index, item) {
    if(_dimensions.indexOf(item.Name) > -1) {
      _this.dimensions[_dimensions.indexOf(item.Name)] = item
    }
  });
  var _metrics = $(container).attr("data-metrics");
  var _metricslist = _metrics;
  if(!_metrics) {
    return""
  }
  _metrics = _metrics.split(",");
  $(_metrics).each(function(index, item) {
    var mindex = -1;
    $(jarvis.dataaccess.metrics).each(function(mi, mo) {
      if(mo.Name == $.trim(item)) {
        mindex = mi
      }
    });
    _metrics[index] = jarvis.dataaccess.metrics[mindex];
    _this.metrics.push(_metrics[index])
  });
  $(jarvis.dataaccess.metrics).each(function(index, item) {
    if(_metrics.indexOf(item.Name) > -1) {
      _this.metrics[_metrics.indexOf(item.Name)] = item
    }
  });
  if(!_metrics) {
    return""
  }
  var queryOptions = [];
  var _queryOptions = {id:"primary", FromDate:jarvis.date.formatDate(startdate, "yyyy-mm-dd hh:nn:ss.000"), ToDate:jarvis.date.formatDate(enddate, "yyyy-mm-dd hh:nn:ss.999"), Dimensions:"", Metrics:_this.metrics[0].Name + "," + _this.metrics[1].Name, Resolution:_this.Resolution, omitDate:true, Filter:jarvis.visualisation.dashboard.globalfilter, Histogram:true};
  queryOptions.push(_queryOptions);
  if(_this.DateBox.comparePeriod) {
    _queryOptions = {id:"compare_primary", FromDate:jarvis.date.formatDate(compare_startdate, "yyyy-mm-dd hh:nn:ss.000"), ToDate:jarvis.date.formatDate(compare_enddate, "yyyy-mm-dd hh:nn:ss.999"), Dimensions:"", Metrics:_this.metrics[0].Name + "," + _this.metrics[1].Name, Resolution:_this.Resolution, omitDate:true, Filter:jarvis.visualisation.dashboard.globalfilter, Histogram:true};
    queryOptions.push(_queryOptions)
  }
  jarvis.dataaccess.multifetch(_this, "/engine/Query.svc/fetch", queryOptions, function(sender, data, error) {
    var series = [];
    $(data).each(function(index, item) {
      try {
        var result = item.data.Result;
        var request = item.data.Request;
        var _data = item.data.Result.Rows;
        series.push(item.data.Result)
      }catch(ex) {
      }
    });
    if(_this.DateBox.comparePeriod == false) {
      _this.update(sender, _dimensions, _metrics, series, container)
    }else {
      _this.updateCompare(sender, _dimensions, _metrics, series, container)
    }
  })
};
jarvis.visualisation.report.Histogram.prototype.update = function(sender, dimensions, metrics, series, container) {
  var _this = sender;
  if(!series[0]) {
    return
  }
  var $table = $($(container).find(".table"));
  $table.empty();
  var $tr = $("<tr></tr>");
  var $th = $('<th class="dimension">' + _this.metrics[0].Name + "</th>");
  $tr.append($th);
  var $th = $('<th class="dimension values">' + _this.metrics[1].Name + "</th>");
  $tr.append($th);
  var $th = $('<th class="dimension">Percentage of total<div class="hlegend"><span class="legendmark" style="border-color: rgb(5, 141, 199);"></span><span class="legendcaption">' + _this.metrics[1].Name + "</span></div> </th>");
  $tr.append($th);
  $table.append($tr);
  $(series[0].Rows).each(function(index, row) {
    var $tr = $("<tr></tr>");
    if(_this.metrics[0].Suffix == "seconds") {
      var level = 0;
      var from = 0;
      var to = 0;
      level = row.Values[0];
      from = row.Values[1];
      to = row.Values[2];
      var caption = "";
      if(to == -1) {
        caption = from + "+ " + _this.metrics[0].Suffix
      }else {
        if(series[0].Rows.length - 1 == index) {
          caption = from + "+ " + _this.metrics[0].Suffix
        }else {
          caption = from + "-" + to + " " + _this.metrics[0].Suffix
        }
      }
      var $td = $("<td>" + caption + "</td>");
      $tr.append($td)
    }else {
      var level = 0;
      var from = 0;
      var to = 0;
      level = row.Values[0];
      from = row.Values[1];
      to = row.Values[2];
      var caption = "";
      if(to == -1) {
        caption = from + "+ " + _this.metrics[0].Suffix
      }else {
        if(series[0].Rows.length - 1 == index) {
          caption = from + "+ " + _this.metrics[0].Suffix
        }else {
          caption = from + "-" + to + " " + _this.metrics[0].Suffix
        }
      }
      var $td = $("<td>" + caption + "</td>");
      $tr.append($td)
    }
    $(row.FormattedValues).each(function(i, v) {
      if(i == 4) {
        var $td = $('<td class="values">' + v + "</td>");
        if(series[0].Columns[i].AggregationType) {
          $td.addClass("metric")
        }else {
          $td.addClass("dimension")
        }
        $tr.append($td)
      }else {
        if(i == 5) {
          var $td = $("<td>" + v + "</td>");
          var width = Math.ceil(v) + "%";
          var $_bar = $('<div class="barwrapper"><span class="barvalue">' + jarvis.string.formatNumber(v, 2) + '%</span><div class="percentagebar" style="width:' + width + '"></div>' + '<td class="percentagecaption"></div>');
          $td.html($_bar);
          if(series[0].Columns[i].AggregationType) {
            $td.addClass("metric")
          }else {
            $td.addClass("dimension")
          }
          $tr.append($td)
        }
      }
    });
    $table.append($tr)
  })
};
jarvis.visualisation.report.Histogram.prototype.updateCompare = function(sender, dimensions, metrics, series, container) {
  var _this = sender;
  if(!series[0]) {
    return
  }
  var datebox = _this.DateBox;
  var $table = $($(container).find(".table"));
  $table.empty();
  var $tr = $("<tr></tr>");
  var $th = $('<th class="dimension">' + _this.metrics[0].Name + "</th>");
  $tr.append($th);
  var $th = $('<th class="dimension values">' + _this.metrics[1].Name + "</th>");
  $tr.append($th);
  var $th = $('<th class="dimension">Percentage of total<div class="hlegend"><span class="legendmark" style="border-color: rgb(5, 141, 199);"></span><span class="legendcaption">' + _this.metrics[1].Name + "</span></div> </th>");
  $tr.append($th);
  $table.append($tr);
  $(series[0].Rows).each(function(index, row) {
    var $tr = $("<tr></tr>");
    var lookupdimension = "";
    var base_value = 0;
    var compare_value = 0;
    if(_this.metrics[0].Suffix == "seconds") {
      var level = 0;
      var from = 0;
      var to = 0;
      level = row.Values[0];
      from = row.Values[1];
      to = row.Values[2];
      var caption = "";
      if(to == -1) {
        caption = from + "+ " + _this.metrics[0].Suffix
      }else {
        if(series[0].Rows.length - 1 == index) {
          caption = from + "+ " + _this.metrics[0].Suffix
        }else {
          caption = from + "-" + to + " " + _this.metrics[0].Suffix
        }
      }
      var $td = $("<td>" + caption + "</td>");
      $tr.append($td)
    }else {
      var level = 0;
      var from = 0;
      var to = 0;
      level = row.Values[0];
      from = row.Values[1];
      to = row.Values[2];
      var caption = "";
      if(to == -1) {
        caption = from + "+ " + _this.metrics[0].Suffix
      }else {
        if(series[0].Rows.length - 1 == index) {
          caption = from + "+ " + _this.metrics[0].Suffix
        }else {
          caption = from + "-" + to + " " + _this.metrics[0].Suffix
        }
      }
      var $td = $("<td>" + caption + "</td>");
      $tr.append($td)
    }
    $td = $("<td></td>");
    $tr.append($td);
    $td = $("<td></td>");
    $tr.append($td);
    $table.append($tr);
    var $tr = $("<tr></tr>");
    var $td = $('<td class="daterange">' + datebox.formatDate(datebox.getDate().base_fromdate) + " - " + datebox.formatDate(datebox.getDate().base_todate) + "</td>");
    $td.addClass("dimension");
    $tr.append($td);
    var v = row.FormattedValues[4];
    $td = $('<td class="values">' + v + "</td>");
    $td.addClass("dimension");
    $tr.append($td);
    $td = $('<td class="">' + v + "</td>");
    $td.addClass("dimension");
    v = row.FormattedValues[5];
    var width = Math.ceil(v) + "%";
    var $_bar = $('<div class="barwrapper"><span class="barvalue">' + jarvis.string.formatNumber(v, 2) + '%</span><div class="percentagebar" style="width:' + width + '"></div>' + '<td class="percentagecaption"></div>');
    $td.html($_bar);
    $tr.append($td);
    $table.append($tr);
    var $tr = $("<tr></tr>");
    var $tr = $("<tr></tr>");
    var $td = $('<td class="daterange">' + datebox.formatDate(datebox.compare_fromdate) + " - " + datebox.formatDate(datebox.compare_todate) + "</td>");
    $td.addClass("dimension");
    $tr.append($td);
    row = series[1].Rows[index];
    var v = row.FormattedValues[4];
    $td = $('<td class="values">' + v + "</td>");
    $td.addClass("dimension");
    $tr.append($td);
    $td = $('<td class="">' + v + "</td>");
    $td.addClass("dimension");
    v = row.FormattedValues[5];
    var width = Math.ceil(v) + "%";
    var $_bar = $('<div class="barwrapper"><span class="barvalue">' + jarvis.string.formatNumber(v, 2) + '%</span><div class="percentagebar" style="width:' + width + '"></div>' + '<td class="percentagecaption"></div>');
    $td.html($_bar);
    $tr.append($td);
    $table.append($tr)
  })
};
jarvis.visualisation.report.Histogram.prototype.draw = function(container) {
  var _this = this;
  var title = "Widget Title";
  var dimensions = "DIMENSION";
  var metrics = this.default_subcaption;
  if($(container).attr("data-title")) {
    title = $(container).attr("data-title")
  }
  if($(container).attr("data-dimensions")) {
    dimensions = $(container).attr("data-dimensions")
  }
  if($(container).attr("data-metrics")) {
    metrics = $(container).attr("data-metrics")
  }
  var $html = $('<div class="wrapper"></div>');
  $html.append('<div class="row-fluid">' + "</div>" + '<div class="content">' + '<table class="table table-striped"></table>' + "</div>" + "</div>");
  $();
  $(container).append($html)
};
jarvis.debug.log("INFO", "jarvis.visualisation.report.Histogram", 6, "JS source loaded");
jarvis.provide("jarvis.visualisation.report.Tabs");
jarvis.require("jarvis.debug");
jarvis.require("jarvis.date");
jarvis.require("jarvis.string");
jarvis.require("jarvis.visualisation.report");
jarvis.visualisation.report.Tabs = function(options, container) {
  var _this = this;
  jarvis.objects.Reports.List();
  jarvis.objects.Dimensions.List();
  jarvis.objects.Metrics.List()
};
jarvis.visualisation.report.Tabs.prototype.init = function(options, container) {
  var _this = this;
  jarvis.debug.log("INFO", "jarvis.visualisation.report.Tabs", 6, "Building Tabs for ID ('" + _this.reportID + "')");
  var matchedContainers = null;
  if(container) {
    matchedContainers = $(container)
  }else {
    matchedContainers = $(".jarvis.report.tabs")
  }
  if(matchedContainers.length == 0) {
    return
  }
  $(matchedContainers).show();
  $(matchedContainers).each(function(index, item) {
    var _reportid = $(item).attr("data-reportid");
    try {
      if(!_reportid && !options.reportid) {
        _reportid = jarvis.objects.Reports[0].ID
      }
      if(_reportid == "") {
        _reportid = jarvis.objects.Reports[0].ID
      }
    }catch(ex) {
      _reportid = jarvis.objects.Reports[0].ID
    }
    _this.reportID = _reportid;
    _this.panel = _this.get(_this, _this.reportID);
    if(!_this.panel) {
      return
    }
    if(options == null) {
      options = new Object
    }
    options.reportID = _this.reportID;
    _this.tabID = options.tabID;
    if(!_this.tabID) {
      _this.tabID = 0
    }
    options.container = item;
    options._this = _this;
    _this.updateDisplay(options);
    jarvis.debug.log("INFO", "jarvis.visualisation.report.Tabs", 6, "Applying to container ('" + this.id + "')")
  })
};
jarvis.visualisation.report.Tabs.prototype.get = function(sender, id) {
  if(id == -1) {
    return
  }
  var data = jarvis.objects.Reports.Get(sender, {id:id});
  sender.reportID = data.ID;
  return data
};
jarvis.visualisation.report.Tabs.prototype.updateDisplay = function(options) {
  var _this = options._this;
  var _html = "";
  _html += '<ul class="nav nav-tabs">';
  $(_this.panel.Tabs).each(function(i, tab) {
    _html += '<li class="' + (i == options.selected ? "active" : "") + '">';
    _html += '<a class="tablink" data-tabid="' + i + '">' + tab.Name + "</a>";
    _html += "</li>"
  });
  _html += "</ul>";
  var $html = $(_html);
  $html.find(".tablink").each(function(i, link) {
    var $link = $(link);
    $link.off("click");
    $link.on("click", function(e) {
      $(jarvis).trigger("tabchange", $link.attr("data-tabid"));
      $html.find(".tablink").each(function(i, o) {
        $(o).removeClass("active")
      });
      $(this).addClass("active")
    })
  });
  $(options.container).empty();
  $(options.container).append($html)
};
jarvis.debug.log("INFO", "Report.Visualisation.Tabs", 6, "JS source loaded");
jarvis.provide("jarvis.visualisation.report.MetricGroup");
jarvis.require("jarvis.debug");
jarvis.require("jarvis.date");
jarvis.require("jarvis.string");
jarvis.require("jarvis.visualisation.report");
jarvis.visualisation.report.MetricGroup = function(options, container) {
  var _this = this;
  jarvis.objects.Reports.List();
  jarvis.objects.Dimensions.List();
  jarvis.objects.Metrics.List()
};
jarvis.visualisation.report.MetricGroup.prototype.init = function(options, container) {
  var _this = this;
  jarvis.debug.log("INFO", "jarvis.visualisation.report.MetricGroup", 6, "Building MetricGroup for ID ('" + _this.reportID + "')");
  var matchedContainers = null;
  if(container) {
    matchedContainers = $(container)
  }else {
    matchedContainers = $(".jarvis.report.metricgroups")
  }
  if(matchedContainers.length == 0) {
    return
  }
  $(matchedContainers).show();
  $(matchedContainers).each(function(index, item) {
    var _reportid = $(item).attr("data-reportid");
    var _tabid = $(item).attr("data-tabid");
    var _mgid = $(item).attr("data-mgid");
    try {
      if(!_reportid && !options.reportid) {
        _reportid = jarvis.objects.Reports[0].ID
      }
      if(_reportid == "") {
        _reportid = jarvis.objects.Reports[0].ID
      }
    }catch(ex) {
      _reportid = jarvis.objects.Reports[0].ID
    }
    _this.reportID = _reportid;
    _this.mgid = _mgid;
    _this.tabid = _tabid;
    _this.panel = _this.get(_this, _this.reportID);
    if(!_this.panel) {
      return
    }
    if(options == null) {
      options = new Object
    }
    options.reportID = _this.reportID;
    options.container = item;
    options._this = _this;
    _this.updateDisplay(options);
    jarvis.debug.log("INFO", "jarvis.visualisation.report.MetricGroup", 6, "Applying to container ('" + this.id + "')")
  })
};
jarvis.visualisation.report.MetricGroup.prototype.get = function(sender, id) {
  if(id == -1) {
    return
  }
  var data = jarvis.objects.Reports.Get(sender, {id:id});
  sender.reportID = data.ID;
  return data
};
jarvis.visualisation.report.MetricGroup.prototype.updateDisplay = function(options) {
  var _this = options._this;
  var _html = "";
  _html += '<ul class="nav nav-pills">';
  $(_this.panel.Tabs[_this.tabid].MetricGroups).each(function(i, mg) {
    _html += '<li class="' + (i == _this.mgid ? "active" : "") + '">';
    _html += '<a class="mglink" data-mgid="' + i + '">' + mg.Name + "</a>";
    _html += "</li>"
  });
  _html += "</ul>";
  var $html = $(_html);
  $html.find(".mglink").each(function(i, link) {
    var $link = $(link);
    $link.off("click");
    $link.on("click", function(e) {
      $(jarvis).trigger("metricgroupchange", $link.attr("data-mgid"));
      $html.find(".mglink").each(function(i, o) {
        $(o).removeClass("active")
      });
      $($link).addClass("active")
    })
  });
  if(_this.panel.Tabs[_this.tabid].MetricGroups.length == 1) {
    $html.hide()
  }
  $(options.container).empty();
  $(options.container).append($html)
};
jarvis.debug.log("INFO", "Report.Visualisation.MetricGroup", 6, "JS source loaded");
jarvis.provide("jarvis.visualisation.report.panel");
jarvis.require("jarvis.debug");
jarvis.require("jarvis.date");
jarvis.require("jarvis.string");
jarvis.require("jarvis.visualisation.report");
jarvis.visualisation.report.Panel = function(options) {
  var start = (new Date).getMilliseconds();
  var _this = this;
  this.options = $.extend({widgets:{timeline:{height:235, excludeMetrics:[], showPrimary:true}, table:{pageSize:50, minSelected:0, maxSelected:3, defaultSelected:0}}}, options);
  jarvis.objects.Reports.List();
  try {
    this.reportID = options.reportID
  }catch(e) {
    this.reportID = jarvis.objects.Reports[0].ID
  }
  this.containers = [];
  var matchedContainers = null;
  matchedContainers = $(".jarvis.report.panel");
  if(matchedContainers.length > 0) {
    jarvis.debug.log("INFO", "Jarvis.Visualisation.Report.Panel", 6, "Building Initial Panel ('" + this.id + "')");
    var $editbutton = $(".jarvis.container").find(".panel-edit");
    $editbutton.off("click");
    $editbutton.on("click", function(e) {
      var o = new jarvis.visualisation.report.Editor;
      o.init(o, {container:matchedContainers, reportID:_this.reportID})
    })
  }
  this.container = matchedContainers;
  jarvis.visualisation.report.panel = this;
  jarvis.objects.Reports.List();
  jarvis.objects.Dimensions.List();
  jarvis.objects.Metrics.List();
  if(jarvis.state != null) {
    _this.reportID = jarvis.state.reportID;
    _this.tabID = jarvis.state.tabID;
    _this.metricgroupID = jarvis.state.metricgroupID;
    _this.tabType = jarvis.state.tabType
  }else {
    this.reportID = -1;
    this.tabID = 0;
    this.tabType = "explorer";
    this.metricgroupID = 0
  }
  if(_this.reportID == null || _this.reportID == "undefined") {
    _this.reportID = -1
  }
  if(_this.tabID == null || _this.tabID == "undefined") {
    _this.tabID = 0
  }
  if(_this.tabType == null || _this.tabType == "undefined") {
    _this.tabType = "explorer"
  }
  if(_this.metricgroupID == null || _this.metricgroupID == "undefined") {
    _this.metricgroupID = 0
  }
  var executionTime = (new Date).getMilliseconds() - start;
  if(!jarvis.visualisation.reportWrapper) {
    jarvis.visualisation.reportWrapper = _this
  }
  return _this
};
jarvis.visualisation.report.Panel.prototype.init = function(options, container, drawWidgets, breakBindLoop, saveState) {
  var _this = this;
  jarvis.debug.log("INFO", "Jarvis.Visualisation.Report.Panel", 6, "Building Panel for ID ('" + _this.reportID + "')");
  if(options && options.showPrimary != null) {
    _this.options.widgets.timeline.showPrimary = options.showPrimary
  }
  if(options && options.minSelected != null) {
    _this.options.widgets.table.minSelected = options.minSelected
  }
  if(options && options.maxSelected != null) {
    _this.options.widgets.table.maxSelected = options.maxSelected
  }
  if(options && options.defaultSelected != null) {
    _this.options.widgets.table.defaultSelected = options.defaultSelected
  }
  if(options && options.excludeMetrics != null) {
    _this.options.widgets.timeline.excludeMetrics = options.excludeMetrics
  }
  jarvis.visualisation.report.globalfilter = "";
  try {
    if($(".jarvis.report.panel").attr("data-id") != null) {
      _this.reportID = $(".jarvis.report.panel").attr("data-id")
    }
    if(options.reportID != null && options.reportID != "undefined") {
      _this.reportID = options.reportID
    }
    if(options.tabID != null && options.tabID != "undefined") {
      _this.tabID = options.tabID
    }
    if(options.tabType != null && options.tabType != "undefined") {
      _this.tabType = options.tabType
    }
    if(options.metricgroupID != null && options.metricgroupID != "undefined") {
      _this.metricgroupID = options.metricgroupID
    }
  }catch(e) {
    if(this.reportID == -1) {
      _this.reportID = jarvis.objects.Reports[0].ID
    }
  }
  if(_this.reportID == null || _this.reportID == "undefined") {
    _this.reportID = jarvis.objects.Reports[0].ID
  }
  if(_this.tabID == null || _this.tabID == "undefined") {
    _this.tabID = 0
  }
  if(_this.tabType == null || _this.tabType == "undefined") {
    _this.tabType = "explorer"
  }
  if(_this.metricgroupID == null || _this.metricgroupID == "undefined") {
    _this.metricgroupID = 0
  }
  if(_this.reportID == -1) {
    _this.reportID = jarvis.objects.Reports[0].ID
  }
  _this.panel = _this.get(_this, _this.reportID);
  if(!this.panel) {
    return
  }
  _this.tabType = _this.panel.Tabs[_this.tabID].Type;
  _this.setDisplay();
  if(typeof saveState == "undefined" || saveState == true) {
    jarvis.state.view = "report";
    jarvis.state.dashboardID = _this.panelID;
    jarvis.state.reportID = _this.reportID;
    jarvis.state.tabID = _this.tabID;
    jarvis.state.metricgroupID = _this.metricgroupID;
    jarvis.state.tabType = _this.tabType
  }
  var matchedContainers = null;
  if(container) {
    matchedContainers = $(container)
  }else {
    matchedContainers = $(".jarvis.report.panel")
  }
  if(matchedContainers.length == 0) {
    return
  }
  var $addwidgetbutton = $("body").find(".widget-add");
  $addwidgetbutton.hide();
  $(matchedContainers).each(function(index, item) {
    if(options == null) {
      options = new Object
    }
    options.reportID = _this.reportID;
    options.container = item;
    options._this = _this;
    _this.updateDisplay(options);
    _this.baseHTML(_this, item);
    _this.drawWidgets(_this, item, drawWidgets);
    $(jarvis).unbind("tabchange");
    $(jarvis).bind("tabchange", function(e, tabID) {
      _this.tabID = tabID;
      _this.metricgroupID = 0;
      jarvis.visualisation.report.globalfilter = "";
      _this.init(_this, item, true, true)
    });
    $(jarvis).unbind("metricgroupchange");
    $(jarvis).bind("metricgroupchange", function(e, metricgroupID) {
      _this.metricgroupID = metricgroupID;
      try {
        jarvis.state["timeline-1234"].primaryMetric = null
      }catch(ex) {
      }
      jarvis.state.metricgroupID = _this.metricgroupID;
      _this.init(_this, item, true, true)
    });
    jarvis.debug.log("INFO", "Jarvis.Visualisation.Report.Panel", 6, "Applying to container ('" + this.id + "')")
  });
  var $editbutton = $(".jarvis.container").find(".panel-edit");
  $editbutton.off("click");
  $editbutton.on("click", function(e) {
    var o = new jarvis.visualisation.report.Editor;
    o.init(o, {container:matchedContainers, reportID:_this.reportID})
  });
  return _this
};
jarvis.visualisation.report.Panel.prototype.setDisplay = function() {
};
jarvis.visualisation.report.Panel.prototype.show = function() {
  $(".jarvis.report.panel").show()
};
jarvis.visualisation.report.Panel.prototype.hide = function() {
  $(".jarvis.dashboard.panel").hide()
};
jarvis.visualisation.report.Panel.prototype.dispose = function() {
  var container = $(".jarvis.report.panel");
  var $tabs = $(container).find(".tabs");
  var $mgs = $(container).find(".metricgroups");
  var $timeline = $(container).find(".timeline");
  var $metricbox = $(container).find(".metricbox");
  var $table = $(container).find(".jtable");
  $tabs.empty();
  $mgs.empty();
  $timeline.empty();
  $metricbox.empty();
  $table.empty();
  jarvis.visualisation.report.tabs = null;
  jarvis.visualisation.report.metricgroup = null;
  jarvis.visualisation.report.timeline = null;
  jarvis.visualisation.report.metricbox = null;
  if(jarvis.visualisation.report.table) {
    jarvis.visualisation.report.table.destroy()
  }
  jarvis.visualisation.report.table = null;
  if(jarvis.visualisation.report.tableex) {
    jarvis.visualisation.report.tableex.destroy()
  }
  jarvis.visualisation.report.tableex = null;
  if(jarvis.visualisation.report.histogram) {
    jarvis.visualisation.report.histogram.destroy()
  }
  jarvis.visualisation.report.histogram = null
};
jarvis.visualisation.report.Panel.prototype.baseHTML = function(sender, container) {
  var $container = $(container)
};
jarvis.visualisation.report.Panel.prototype.drawWidgets = function(sender, container, redraw) {
  var _this = sender;
  var panel = _this.panel;
  var widgets = panel.Widgets;
  var _html = "";
  _this.dispose();
  var dimensions = sender.panel.Tabs[_this.tabID].Dimensions;
  var drilldowns = sender.panel.Tabs[_this.tabID].Drilldowns;
  var metrics = sender.panel.Tabs[_this.tabID].MetricGroups[_this.metricgroupID].Metrics;
  var dimensionslist = "";
  var metricslist = "";
  $(dimensions).each(function(i, o) {
    dimensionslist += o.Name + ", "
  });
  dimensionslist = dimensionslist.substring(0, dimensionslist.length - 2);
  $(metrics).each(function(i, o) {
    metricslist += o.Name + ", "
  });
  metricslist = metricslist.substring(0, metricslist.length - 2);
  var levels = [];
  $(drilldowns).each(function(i, l) {
    var dimensions = [];
    $(l).each(function(i2, d) {
      $(d.Dimensions).each(function(i3, dimension) {
        dimensions.push(dimension.Name)
      })
    });
    levels.push(dimensions)
  });
  var $tabs = $(container).find(".tabs");
  var $mgs = $(container).find(".metricgroups");
  var $timeline = $(container).find(".timeline");
  var $metricbox = $(container).find(".metricbox");
  var $table = $(container).find(".jtable");
  $tabs.empty();
  $mgs.empty();
  $timeline.empty();
  $metricbox.empty();
  $table.empty();
  $table.removeClass("histogram");
  $tabs.attr("data-reportid", _this.panel.ID);
  jarvis.visualisation.report.tabs = (new jarvis.visualisation.report.Tabs).init({selected:this.tabID});
  $mgs.attr("data-reportid", _this.panel.ID);
  $mgs.attr("data-tabid", _this.tabID);
  $mgs.attr("data-mgid", _this.metricgroupID);
  $timeline.attr("data-metrics", metrics[0].Name);
  $metricbox.attr("data-metrics", metricslist);
  $table.attr("data-dimensions", JSON.stringify(levels));
  $table.attr("data-metrics", metricslist);
  if(this.tabType == "explorer") {
    $(".jarvis.report.metricgroups").show();
    $(".jarvis.report.row-top").show();
    $(".jarvis.report.row-middle").show();
    jarvis.visualisation.report.metricgroup = (new jarvis.visualisation.report.MetricGroup).init();
    jarvis.visualisation.report.timeline = (new jarvis.visualisation.report.Timeline).init({primaryMetric:metrics[0].Name, height:_this.options.widgets.timeline.height, excludeMetrics:_this.options.widgets.timeline.excludeMetrics, showPrimary:_this.options.widgets.timeline.showPrimary});
    jarvis.visualisation.report.metricbox = (new jarvis.visualisation.report.MetricBox).init();
    if(!_this.options.widgets.table) {
      _this.options.widgets.table = {pageSize:10}
    }
    jarvis.visualisation.report.table = (new jarvis.visualisation.report.Table).init({pageSize:_this.options.widgets.table.pageSize, defaultSelected:_this.options.widgets.table.defaultSelected, minSelected:_this.options.widgets.table.minSelected, maxSelected:_this.options.widgets.table.maxSelected})
  }else {
    if(this.tabType == "table") {
      $mgs.empty();
      $timeline.empty();
      $metricbox.empty();
      $table.empty();
      $(".jarvis.report.metricgroups").hide();
      $(".jarvis.report.row-top").hide();
      $(".jarvis.report.row-middle").hide();
      jarvis.visualisation.report.tableex = (new jarvis.visualisation.report.TableEx).init()
    }else {
      if(this.tabType == "overview") {
        $(".jarvis.report.metricgroups").show();
        $(".jarvis.report.row-top").show();
        $(".jarvis.report.row-middle").show();
        jarvis.visualisation.report.timeline = (new jarvis.visualisation.report.Timeline).init({primaryMetric:metrics[0].Name, height:180});
        var metrics = _this.panel.Tabs[0].MetricGroups[0].Metrics;
        var dimensions = _this.panel.Tabs[0].Dimensions;
        $(dimensions).each(function(index, dimension) {
          _html = '<div class="jarvis report dashboard overviewpie pie widget" data-dimensions="' + dimension.Name + '" data-metrics="' + metrics[0].Name + '" style="float:right;" data-limit="4"></div>';
          $metricbox.append(_html)
        });
        $(metrics).each(function(index, metric) {
          _html = '<div class="jarvis report overviewmetricbox widget" data-metrics="' + metric.Name + '"></div>';
          $metricbox.append(_html)
        });
        _html = '<div class="jarvis report summarytable" data-dimensions="' + dimensions[0].Name + '" data-metrics="' + metrics[0].Name + '" data-limit="10" style="margin-top:-20px;"></div>';
        $table.append(_html);
        var mb = (new jarvis.visualisation.report.OverviewMetricBox).init();
        var pie = (new jarvis.visualisation.report.OverviewPie).init();
        var table = (new jarvis.visualisation.report.SummaryTable).init()
      }else {
        if(this.tabType == "histogram") {
          metricslist = "";
          $(metrics).each(function(i, o) {
            if(i > 0) {
              metricslist += o.Name + ", "
            }
          });
          metricslist = metricslist.substring(0, metricslist.length - 2);
          $mgs.attr("data-reportid", _this.panel.ID);
          $mgs.attr("data-tabid", _this.tabID);
          $mgs.attr("data-mgid", _this.metricgroupID);
          $timeline.attr("data-metrics", metrics[1].Name);
          $metricbox.attr("data-metrics", metricslist);
          $table.attr("data-dimensions", dimensions[0].Name);
          $table.addClass("histogram");
          $(".jarvis.report.metricgroups").show();
          $(".jarvis.report.row-top").show();
          $(".jarvis.report.row-middle").show();
          jarvis.visualisation.report.metricgroup = (new jarvis.visualisation.report.MetricGroup).init();
          jarvis.visualisation.report.timeline = (new jarvis.visualisation.report.Timeline).init({primaryMetric:metrics[1].Name});
          jarvis.visualisation.report.metricbox = (new jarvis.visualisation.report.MetricBox).init();
          jarvis.visualisation.report.histogram = (new jarvis.visualisation.report.Histogram).init()
        }
      }
    }
  }
  $(jarvis).trigger("jarvis-report-draw")
};
jarvis.visualisation.report.Panel.prototype.list = function(container) {
};
jarvis.visualisation.report.Panel.prototype.get = function(sender, id) {
  if(id == -1) {
    return
  }
  var data = jarvis.objects.Reports.Get(sender, {id:id});
  sender.reportID = data.ID;
  return data
};
jarvis.visualisation.report.Panel.prototype.updateDisplay = function(options) {
  var $container = $(options.container);
  var data = options._this.panel;
  $("body").find(".jarvis.caption").text(data.Name.replace("&amp;", "&")).trigger("contentchange");
  $("body").find(".jarvis.description").text(data.Description).trigger("contentchange");
  if($("body").attr("class")) {
    if(!$("body").attr("class").indexOf(data.Name)) {
      $("body").addClass(data.Name)
    }
  }else {
    $("body").addClass(data.Name)
  }
};
jarvis.debug.log("INFO", "Report.Visualisation.Panel", 6, "JS source loaded");
jarvis.provide("jarvis.visualisation.report.editor");
jarvis.require("jarvis.debug");
jarvis.require("jarvis.date");
jarvis.require("jarvis.string");
jarvis.require("jarvis.visualisation.report");
jarvis.visualisation.report.Editor = function(options) {
  var start = (new Date).getMilliseconds();
  var _this = this;
  this._this = this;
  this.options = options;
  this.container = null;
  this.ordinal = 1;
  this.newordinal = -1;
  this.defaultTab = {id:-1, ordinal:1, active:true, title:"Report Tab", type:"explorer", mgroups:[{id:-1, title:"New metric group", metrics:[]}], dimensions:[]};
  this.state = new Object;
  this.state.report = {id:-1, title:"", description:"", tabs:[clone(_this.defaultTab)], tabcount:1};
  jarvis.visualisation.report.editor = this;
  var executionTime = (new Date).getMilliseconds() - start
};
jarvis.visualisation.report.Editor.prototype.init = function(sender, options) {
  var _this = sender;
  jarvis.debug.log("INFO", "Jarvis.Visualisation.Report.Editor", 6, "Building Editor for ID ('" + _this.reportID + "')");
  _this.container = options.container;
  _this.reportID = options.reportID;
  this.reportID = options.reportID;
  if(this.reportID > -1) {
    this.report = jarvis.objects.Reports.Get(_this, {id:_this.reportID})
  }else {
  }
  var $container = $(".jarvis._container");
  var $head = $(".jumbotron.subhead");
  var $panel = $(".jarvis._container .jarvis.report.panel");
  $head.hide();
  $panel.hide();
  $(".report.editor").remove();
  var $editor = $('<div class="report editor"></div>');
  $container.append($editor);
  var $wrapper_buttons = $('<form class="form-horizontal wrapper_buttons" style="margin-left:50px;"></form>');
  var $buttons = $('<div class="control-group"></div>');
  $buttons.append('<label class="control-label" for=""></label><div class="controls"></div>');
  var $btn_submit = $('<a class="btn save">Save</a>');
  var $btn_cancel = $('<a class="btn cancel">Cancel</a>');
  var $btn_delete = $('<a class="btn delete">Delete</a>');
  $btn_cancel.off("click");
  $btn_cancel.on("click", function(e) {
    jarvis.debug.log("INFO", "Jarvis.Visualisation.Report.Editor", 6, "Cancelling.");
    if(_this.reportID == -1) {
      location.href = "/"
    }else {
      $editor.remove();
      $head.show();
      $panel.show();
      $(jarvis).trigger("reportchange", _this.reportID)
    }
  });
  $btn_submit.off("click");
  $btn_submit.on("click", function(e) {
    e.stopPropagation();
    _this.Save(_this, options)
  });
  $btn_delete.off("click");
  $btn_delete.on("click", function(e) {
    e.stopPropagation();
    _this.Delete(_this, options)
  });
  $buttons.find(".controls").append($btn_submit);
  $buttons.find(".controls").append($btn_cancel);
  if(_this.reportID > -1) {
    $buttons.find(".controls").append($btn_delete)
  }
  $wrapper_buttons.append($buttons);
  var $caption = $('<header class="jumbotron subhead"></header>');
  if(_this.reportID == -1) {
    $caption.append('<h1 class="jarvis caption">Custom Report</h1>')
  }else {
    $caption.append('<h1 class="jarvis caption">Edit Report</h1>')
  }
  $caption.append('<p class="jarvis description lead">Use the editor below to customize your report.</p>');
  var $general_header = $('<div class="header"><div class="sectiontitle">General Information</div></div> ');
  var $content_header = $('<div class="header"><div class="sectiontitle">Report Content</div></div> ');
  var $wrapper_general = $('<form class="form-horizontal"></form>');
  var $title = $('<div class="control-group wrapper_title"></div>');
  $title.append('<label class="control-label" for="">Title</label>');
  $title.append('<div class="controls"><input class="input_title input-xlarge" type="text" data-param="title" placeholder="Enter report name"></div>');
  var $description = $('<div class="control-group wrapper_title"></div>');
  $description.append('<label class="control-label" for="">Description</label>');
  $description.append('<div class="controls"><textarea class="input_description input-xlarge" data-param="description" placeholder="Enter report description"></textarea></div>');
  var $category = $('<div class="control-group wrapper_category"></div>');
  $category.append('<label class="control-label" for="">Category</label>');
  $category.append('<div class="controls"><select id="categories"></select></div>');
  var categories = jarvis.objects.Reports.GetCategories();
  categories = $.parseJSON(categories.data);
  $(categories).each(function(index, category) {
    var $option = $('<option value="' + category.key + '">' + category.value + "</option>");
    $category.find("select").append($option)
  });
  $wrapper_general.append($title);
  $wrapper_general.append($description);
  $wrapper_general.append($category);
  if(_this.reportID > -1) {
    _this.populateTabs(_this, options)
  }
  $editor.append($caption);
  $editor.append($general_header);
  $editor.append($wrapper_general);
  $editor.append($content_header);
  $editor.append(_this.buildTabs(_this, options));
  $editor.append($wrapper_buttons);
  if(_this.reportID > -1) {
    _this.populate(_this, options)
  }
  $(".simpleerror").css("visibility", "hidden")
};
jarvis.visualisation.report.Editor.prototype.dispose = function() {
  jarvis.debug.log("INFO", "Jarvis.Visualisation.Report.Editor", 6, "Dispose");
  $(".simpleerror").css("visibility", "visible")
};
jarvis.visualisation.report.Editor.prototype.populate = function(sender, options) {
  var _this = sender;
  jarvis.debug.log("INFO", "Jarvis.Visualisation.Report.Editor", 6, "Populating Editor for ID ('" + _this.reportID + "')");
  var $input_title = $(".input_title");
  $input_title.val(_this.report.Name);
  var $input_description = $(".input_description");
  $input_description.val(_this.report.Description);
  $("#categories").find("option").each(function(index, option) {
    var $option = $(option);
    if(_this.report.Category.Name == $option.text()) {
      $option.attr("selected", true)
    }
  })
};
jarvis.visualisation.report.Editor.prototype.populateTabs = function(sender, options) {
  var _this = sender;
  jarvis.debug.log("INFO", "Jarvis.Visualisation.Report.Editor", 6, "Populating Tabs for ID ('" + _this.reportID + "')");
  $(_this.report.Tabs).each(function(index, tab) {
    _this.state.report.tabs[index] = {id:tab.ID, ordinal:tab.Ordinal, active:false, title:tab.Name, type:tab.Type, mgroups:function() {
      var groups = [];
      $(tab.MetricGroups).each(function(index2, mg) {
        groups.push({id:mg.ID, newgroup:false, title:mg.Name, metrics:function() {
          var metrics = [];
          $(mg.Metrics).each(function(index3, metric) {
            metric.ordinal = index3;
            metrics.push(metric)
          });
          return metrics
        }()})
      });
      return groups
    }(), dimensions:function() {
      var dimensions = [];
      $(tab.Dimensions).each(function(index, dimension) {
        dimension.ordinal = index;
        dimension.deleted = false;
        dimensions.push(dimension)
      });
      return dimensions
    }()}
  });
  _this.state.report.tabs[0].active = true
};
jarvis.visualisation.report.Editor.prototype.buildTabs = function(sender, options) {
  var _this = sender;
  jarvis.debug.log("INFO", "Jarvis.Visualisation.Report.Editor", 6, "Building Tabs for ID ('" + _this.reportID + "')");
  var $wrapper_tabs = $('<div class="wrapper_tabs"></div>');
  var $tabs = $('<ul class="nav nav-tabs"></ul>');
  $(_this.state.report.tabs).each(function(index, tab) {
    if(!tab.deleted) {
      var $tab = $('<li class="tab" data-id="' + tab.ordinal + '"><button type="button" class="close">&times;</button><a class="tabname">' + tab.title + "</a></li>");
      var $close = $($tab.find(".close"));
      $close.off("click");
      $close.on("click", function(e) {
        $(_this.state.report.tabs).each(function(index, itab) {
          if(itab.ordinal == $tab.attr("data-id")) {
            itab.deleted = true
          }
        });
        var length = 0;
        $(_this.state.report.tabs).each(function(index, itab) {
          if(!itab.deleted) {
            length++
          }
        });
        if(length == 0) {
          _this.state.report.tabs.push(clone(_this.defaultTab));
          _this.state.report.tabcount = 1
        }else {
          var bActive = false;
          $(_this.state.report.tabs).each(function(index, item) {
            if(item.active == true && item.deleted == false) {
              bActive = true
            }
          });
          if(!bActive) {
            _this.state.report.tabs[0].active = true
          }
        }
        _this.state.report.tabcount--;
        _this.buildTabs(_this, options)
      });
      $tab.off("click");
      $tab.on("click", function(e) {
        $tabs.find(".tab.active").removeClass("active");
        $tab.addClass("active");
        var tab;
        $(_this.state.report.tabs).each(function(index, itab) {
          if(itab.ordinal == $tab.attr("data-id")) {
            itab.active = true;
            tab = itab
          }else {
            itab.active = false
          }
        });
        $tabspace.attr("data-id", tab.ordinal);
        _this.buildTab(_this, {tab:$tabspace, type:tab.type})
      });
      if(tab.active) {
        $tab.addClass("active")
      }
      $tabs.append($tab)
    }
  });
  var $tabs_add = $('<li class="tab"><a class="addtab">+ add report tab</a></li>');
  $tabs_add.off("click");
  $tabs_add.on("click", function(e) {
    jarvis.debug.log("INFO", "Jarvis.Visualisation.Report.Editor", 6, "Adding tab");
    $(_this.state.report.tabs).each(function(i, o) {
      o.active = false
    });
    var newTab = clone(_this.defaultTab);
    newTab.active = true;
    newTab.ordinal = _this.ordinal + 1;
    _this.state.report.tabs.push(newTab);
    _this.state.report.tabcount++;
    _this.ordinal++;
    _this.buildTabs(_this, options)
  });
  $tabs.append($tabs_add);
  var $tabspace = $('<div class="tab" data-id="1"></div>');
  $wrapper_tabs.append($tabs);
  $wrapper_tabs.append($tabspace);
  var $editor = $(".report.editor");
  if($editor.find(".wrapper_buttons").length > 0) {
    var $buttons = $editor.find(".wrapper_buttons");
    $editor.find(".wrapper_tabs").remove();
    $buttons.before($wrapper_tabs)
  }else {
    $editor.find(".wrapper_tabs").remove();
    $editor.append($wrapper_tabs)
  }
  $tabs.find(".tab.active").click()
};
jarvis.visualisation.report.Editor.prototype.buildTab = function(sender, options) {
  var _this = sender;
  jarvis.debug.log("INFO", "Jarvis.Visualisation.Report.Editor", 6, "Building Tab for ID ('" + _this.reportID + "')");
  var $editor = $(".report.editor");
  var $tab = $(options.tab);
  var tab_type = options.type;
  var oTab;
  $(_this.state.report.tabs).each(function(index, tab) {
    if(tab.ordinal == $tab.attr("data-id")) {
      oTab = tab;
      oTab.type = tab_type
    }
  });
  jarvis.debug.log("INFO", "Jarvis.Visualisation.Report.Editor", 6, 'Building tab for tab "' + oTab.ordinal + '"');
  $tab.empty();
  var $tab_general = $('<form class="form-horizontal"></form>');
  var $title = $('<div class="control-group"></div>');
  $title.append('<label class="control-label" for="">Title</label>');
  $title.append('<div class="controls"><input class="input_tab_title input-large" type="text" data-param="title" placeholder="Enter tab name" value="' + oTab.title + '"></div>');
  var $input_title = $($title.find(".input_tab_title"));
  $input_title.off("keyup");
  $input_title.on("keyup", function(e) {
    oTab.title = $input_title.val();
    var $tabmenu = $($editor.find('li.tab[data-id="' + oTab.ordinal + '"]'));
    var $tabmenu_title = $($tabmenu.find("a"));
    $tabmenu_title.html(oTab.title)
  });
  var $type = $('<div class="control-group"></div>');
  $type.append('<label class="control-label" for="">Type</label>');
  $type.append('<div class="controls"><div class="btn-group" data-toggle="buttons-radio">' + '<a class="btn btn_type_explorer">Explorer</a>' + '<a class="btn btn_type_table">Table</a>' + '<a class="btn btn_type_histogram">Histogram</a>' + '\x3c!--<a class="btn btn_type_geo">Geographical</a>--\x3e' + '<a class="btn btn_type_overview">Overview</a>' + "</div></div>");
  $type.find(".btn.btn_type_explorer").off("click");
  $type.find(".btn.btn_type_explorer").on("click", function(e) {
    _this.buildTab(_this, {tab:$tab, type:"explorer"})
  });
  $type.find(".btn.btn_type_table").off("click");
  $type.find(".btn.btn_type_table").on("click", function(e) {
    _this.buildTab(_this, {tab:$tab, type:"table"})
  });
  $type.find(".btn.btn_type_geo").off("click");
  $type.find(".btn.btn_type_geo").on("click", function(e) {
    _this.buildTab(_this, {tab:$tab, type:"geo"})
  });
  $type.find(".btn.btn_type_overview").off("click");
  $type.find(".btn.btn_type_overview").on("click", function(e) {
    _this.buildTab(_this, {tab:$tab, type:"overview"})
  });
  $type.find(".btn.btn_type_histogram").off("click");
  $type.find(".btn.btn_type_histogram").on("click", function(e) {
    _this.buildTab(_this, {tab:$tab, type:"histogram"})
  });
  $type.find(".btn.btn_type_explorer").removeClass("active");
  $type.find(".btn.btn_type_table").removeClass("active");
  $type.find(".btn.btn_type_geo").removeClass("active");
  $type.find(".btn.btn_type_overview").removeClass("active");
  $type.find(".btn.btn_type_histogram").removeClass("active");
  switch(oTab.type) {
    case "explorer":
      $type.find(".btn.btn_type_explorer").addClass("active");
      break;
    case "table":
      $type.find(".btn.btn_type_table").addClass("active");
      break;
    case "geo":
      $type.find(".btn.btn_type_geo").addClass("active");
      break;
    case "overview":
      $type.find(".btn.btn_type_overview").addClass("active");
      break;
    case "histogram":
      $type.find(".btn.btn_type_histogram").addClass("active");
      break;
    default:
      break
  }
  $tab_general.append($title);
  $tab_general.append($type);
  $tab.append($tab_general);
  if(oTab.type == "explorer") {
    var $metrics = $('<div class="control-group"></div>');
    $metrics.append('<label class="control-label" for="">Metric Groups</label>');
    $metrics.append('<div class="controls"></div>');
    $(oTab.mgroups).each(function(index, mgroup) {
      if(!mgroup.deleted) {
        var $mcontainer = $('<div class="jarvis jcontainer metrics"></div>');
        var o = new jarvis.visualisation.container.Metrics({container:$mcontainer, title:mgroup.title, metrics:mgroup.metrics, id:mgroup.id});
        $(o).bind("metric-added", function(e, name) {
          var m = _.find(jarvis.objects.Metrics, function(metric) {
            return metric.Name == name
          });
          mgroup.metrics.push(m)
        });
        $(o).bind("metric-removed", function(e, name) {
          $(mgroup.metrics).each(function(index, m) {
            if(m.Name == name) {
              m.deleted = true
            }
          })
        });
        $(o).bind("rename", function(e, name) {
          mgroup.title = name
        });
        $(o).bind("group-removed", function(e, id) {
          oTab.mgroups[index].deleted = true;
          $mcontainer.remove()
        });
        $(o).bind("metric-reorder", function(e, id) {
          $mcontainer.find(".pickerwrapper[data-id]").each(function(i, o) {
            $(mgroup.metrics).each(function(i2, o2) {
              if(o2.Name == $(o).attr("data-id")) {
                o2.ordinal = i
              }
            })
          })
        });
        $metrics.find(".controls").append($mcontainer)
      }
    });
    var $add_mgroup = $('<div class="wrapper_add_metric"></div>');
    $add_mgroup.append('<a class="btn btn_addgroup">+ Add metric group</a>');
    $add_mgroup.find(".btn").off("click");
    $add_mgroup.find(".btn").on("click", function(e) {
      var mgroup = {id:_this.newordinal - 1, newgroup:true, title:"New metric group", metrics:[]};
      oTab.mgroups.push(mgroup);
      _this.newordinal--;
      var $mcontainer = $('<div class="jarvis jcontainer metrics"></div>');
      var o = new jarvis.visualisation.container.Metrics({container:$mcontainer, title:mgroup.title, metrics:mgroup.metrics, id:mgroup.id});
      $(o).bind("metric-added", function(e, name) {
        var m = _.find(jarvis.objects.Metrics, function(metric) {
          return metric.Name == name
        });
        mgroup.metrics.push(m)
      });
      $(o).bind("metric-removed", function(e, name) {
        $(mgroup.metrics).each(function(index, m) {
          if(m.Name == name) {
            mgroup.metrics.splice(index, 1)
          }
        })
      });
      $(o).bind("rename", function(e, name) {
        mgroup.title = name
      });
      $(o).bind("group-removed", function(e, id) {
        $(oTab.mgroups).each(function(i, o) {
          if(o.id == id) {
            oTab.mgroups.splice(i, 1)
          }
        });
        $mcontainer.remove()
      });
      $add_mgroup.before($mcontainer)
    });
    $metrics.find(".controls").append($add_mgroup);
    $tab_general.append($metrics);
    var $dimensions = $('<div class="control-group"></div>');
    $dimensions.append('<label class="control-label" for="">Dimension Drilldowns</label>');
    $dimensions.append('<div class="controls"></div>');
    var $dcontainer = $('<div class="jarvis jcontainer dimensions"></div>');
    var o = new jarvis.visualisation.container.Dimensions({container:$dcontainer, limit:4, dimensions:oTab.dimensions});
    $(o).bind("dimension-added", function(e, name) {
      var d = _.find(jarvis.objects.Dimensions, function(dimension) {
        return dimension.Name == name
      });
      oTab.dimensions.push(d)
    });
    $(o).bind("dimension-removed", function(e, name) {
      $(oTab.dimensions).each(function(i, o) {
        if(o.Name == name) {
          o.deleted = true
        }
      })
    });
    $(o).bind("dimension-reorder", function(e, id) {
      $dcontainer.find(".pickerwrapper[data-id]").each(function(i, o) {
        $(oTab.dimensions).each(function(i2, o2) {
          if(o2.Name == $(o).attr("data-id")) {
            o2.ordinal = i
          }
        })
      })
    });
    $dimensions.find(".controls").append($dcontainer);
    $tab_general.append($dimensions)
  }else {
    if(oTab.type == "table" || oTab.type == "overview" || oTab.type == "histogram") {
      var $metrics = $('<div class="control-group"></div>');
      $metrics.append('<label class="control-label" for="">Metrics</label>');
      $metrics.append('<div class="controls"></div>');
      $(oTab.mgroups[0]).each(function(index, mgroup) {
        if(!mgroup.deleted) {
          var $mcontainer = $('<div class="jarvis jcontainer metrics"></div>');
          var o = new jarvis.visualisation.container.Metrics({container:$mcontainer, title:mgroup.title, metrics:mgroup.metrics, id:mgroup.id, hidetitle:true});
          $(o).bind("metric-added", function(e, name) {
            var m = _.find(jarvis.objects.Metrics, function(metric) {
              return metric.Name == name
            });
            mgroup.metrics.push(m)
          });
          $(o).bind("metric-removed", function(e, name) {
            $(mgroup.metrics).each(function(index, m) {
              if(m.Name == name) {
                m.deleted = true
              }
            })
          });
          $(o).bind("rename", function(e, name) {
            mgroup.title = name
          });
          $(o).bind("group-removed", function(e, id) {
            oTab.mgroups[index].deleted = true;
            $mcontainer.remove()
          });
          $(o).bind("metric-reorder", function(e, id) {
            $mcontainer.find(".pickerwrapper[data-id]").each(function(i, o) {
              $(mgroup.metrics).each(function(i2, o2) {
                if(o2.Name == $(o).attr("data-id")) {
                  o2.ordinal = i
                }
              })
            })
          });
          $metrics.find(".controls").append($mcontainer)
        }
      });
      $tab_general.append($metrics);
      var $dimensions = $('<div class="control-group"></div>');
      $dimensions.append('<label class="control-label" for="">Dimensions</label>');
      $dimensions.append('<div class="controls"></div>');
      var $dcontainer = $('<div class="jarvis jcontainer dimensions fortable"></div>');
      var o = new jarvis.visualisation.container.Dimensions({container:$dcontainer, limit:4, dimensions:oTab.dimensions});
      $(o).bind("dimension-added", function(e, name) {
        var d = _.find(jarvis.objects.Dimensions, function(dimension) {
          return dimension.Name == name
        });
        oTab.dimensions.push(d)
      });
      $(o).bind("dimension-removed", function(e, name) {
        $(oTab.dimensions).each(function(i, o) {
          if(o.Name == name) {
            o.deleted = true
          }
        })
      });
      $(o).bind("dimension-reorder", function(e, id) {
        $dcontainer.find(".pickerwrapper[data-id]").each(function(i, o) {
          $(oTab.dimensions).each(function(i2, o2) {
            if(o2.Name == $(o).attr("data-id")) {
              o2.ordinal = i
            }
          })
        })
      });
      $dimensions.find(".controls").append($dcontainer);
      $tab_general.append($dimensions)
    }else {
      if(oTab.type == "geo") {
      }else {
        if(oTab.type == "overview") {
        }
      }
    }
  }
};
jarvis.visualisation.report.Editor.prototype.populateTab = function(sender, options) {
  var _this = sender;
  jarvis.debug.log("INFO", "Jarvis.Visualisation.Report.Editor", 6, "Populating tab")
};
jarvis.visualisation.report.Editor.prototype.Delete = function(sender, options) {
  var _this = sender;
  jarvis.objects.Reports.Delete(_this, {id:_this.reportID});
  jarvis.objects.Reports.List(null, null, null, true);
  buildContentMenu_Reports();
  location.href = "/"
};
jarvis.visualisation.report.Editor.prototype.Save = function(sender, options, wetrun) {
  var _this = sender;
  $(".save-error").remove();
  try {
    $(_.filter(_this.state.report.tabs, function(item) {
      return!item.deletd
    })).each(function(i, oTab) {
      var participatingdimensions = _.filter(oTab.dimensions, function(item) {
        return!item.deleted
      });
      participatingdimensions = _.sortBy(participatingdimensions, function(item) {
        return item.ordinal
      });
      $(participatingdimensions).each(function(i2, o2) {
        o2.ordinal = i2
      })
    });
    if(wetrun) {
      jarvis.debug.log("INFO", "Jarvis.Visualisation.Report.Editor", 6, "Saving report")
    }else {
    }
    var name = $(".report.editor .input_title").val();
    if(name == "") {
      throw"Report name is missing.";
    }
    var description = $(".report.editor .input_description").val();
    if(description == "") {
      throw"Report description is missing.";
    }
    var category = $("#categories").val();
    if(wetrun) {
      if(_this.state.report.reportID == -1) {
        jarvis.debug.log("INFO", "Jarvis.Visualisation.Report.Editor", 6, 'Adding new report "' + _this.state.report.title + '"')
      }
      var result = jarvis.objects.Reports.Set(_this, sender.reportID, "name", name);
      result = $.parseJSON(result.data);
      sender.reportID = result.ID;
      _this.state.report.ID = result.ID;
      _this.state.report.reportID = result.ID;
      jarvis.objects.Reports.Set(_this, sender.reportID, "description", description);
      jarvis.objects.Reports.Set(_this, sender.reportID, "category", category);
      _this.state.report.Name = name;
      _this.state.report.Description = description;
      _this.state.report.Category = category
    }
    if(_.find(_this.state.report.tabs, function(item) {
      return!item.deleted
    }).length == 0) {
      throw"Reports must contain at least one tab.";
    }
    $(_this.state.report.tabs).each(function(index, tab) {
      var name = tab.title;
      var ordinal = tab.ordinal;
      var type = tab.type;
      if(name == "") {
        throw"Report tab name is missing.";
      }
      if(tab.deleted && tab.id > -1) {
        jarvis.debug.log("INFO", "Jarvis.Visualisation.Report.Editor", 6, 'Deleting tab "' + tab.title + '"');
        jarvis.objects.Reports.DeleteTab(_this, {id:tab.id})
      }else {
        if(!tab.deleted && tab.id <= -1) {
          if(wetrun) {
            jarvis.debug.log("INFO", "Jarvis.Visualisation.Report.Editor", 6, 'Adding new tab "' + tab.title + '"');
            var result = jarvis.objects.Reports.AddTab(_this, {reportID:_this.reportID, name:name, type:tab.type});
            result = $.parseJSON(result.data);
            tab.id = result.ID
          }
        }else {
          if(!tab.deleted) {
            if(wetrun) {
              jarvis.debug.log("INFO", "Jarvis.Visualisation.Report.Editor", 6, 'Updating tab "' + tab.title + '"');
              jarvis.objects.Reports.UpdateTab(_this, tab.id, "name", name);
              jarvis.objects.Reports.UpdateTab(_this, tab.id, "ordinal", ordinal);
              jarvis.objects.Reports.UpdateTab(_this, tab.id, "type", type)
            }
          }
        }
      }
      if(wetrun) {
        jarvis.debug.log("INFO", "Jarvis.Visualisation.Report.Editor", 6, 'Updating metric groups for tab "' + tab.id + '"')
      }
      if(_.find(tab.mgroups, function(item) {
        return!item.deleted
      }).length == 0) {
        throw"Report tab must contain at least one metric group.";
      }
      if(!tab.deleted) {
        $(tab.mgroups).each(function(i, mg) {
          var name = mg.title;
          if(name == "") {
            throw"Metric group name is missing.";
          }
          if(mg.deleted && mg.id > -1) {
            if(wetrun) {
              jarvis.debug.log("INFO", "Jarvis.Visualisation.Report.Editor", 6, 'Deleting metric group "' + mg.title + '"');
              jarvis.objects.Metrics.DeleteGroup(_this, {id:mg.id})
            }
          }else {
            if(!mg.deleted && mg.id <= -1) {
              if(wetrun) {
                jarvis.debug.log("INFO", "Jarvis.Visualisation.Report.Editor", 6, 'Adding new metric group "' + mg.title + '"');
                var result = jarvis.objects.Metrics.AddGroup(_this, {tabID:tab.id, "name":name});
                result = $.parseJSON(result.data);
                mg.id = result.ID
              }
            }else {
              if(!mg.deleted) {
                if(wetrun) {
                  jarvis.debug.log("INFO", "Jarvis.Visualisation.Report.Editor", 6, 'Updating metric group "' + mg.title + '"');
                  jarvis.objects.Metrics.UpdateGroup(_this, mg.id, "name", name)
                }
              }
            }
          }
          if(!mg.deleted) {
            if(wetrun) {
              jarvis.debug.log("INFO", "Jarvis.Visualisation.Report.Editor", 6, 'Updating metrics for group "' + mg.id + '"')
            }
            if(_.find(mg.metrics, function(item) {
              return!item.deleted
            }).length == 0) {
              throw"Metric group must contain at least one metric.";
            }
            $(mg.metrics).each(function(im, metric) {
              if(metric.deleted) {
                if(wetrun) {
                  try {
                    if(typeof metric.ordinal == "undefined") {
                      metric.ordinal = _.max(mg.metrics, function(item) {
                        return item.ordinal
                      }).ordinal + 1
                    }
                  }catch(ex) {
                    metric.ordinal = 0
                  }
                  jarvis.debug.log("INFO", "Jarvis.Visualisation.Report.Editor", 6, 'Deleting metric "' + metric.Name + '" for group ' + mg.id);
                  jarvis.objects.Metrics.DeleteGroupMetric(_this, mg.id, metric.Id, metric.ordinal)
                }
              }else {
                if(wetrun) {
                  try {
                    if(typeof metric.ordinal == "undefined") {
                      metric.ordinal = _.max(mg.metrics, function(item) {
                        return item.ordinal
                      }).ordinal + 1
                    }
                  }catch(ex) {
                    metric.ordinal = 0
                  }
                  jarvis.debug.log("INFO", "Jarvis.Visualisation.Report.Editor", 6, 'Updating metric "' + metric.Name + '" for group ' + mg.id + ", ordinal: " + metric.ordinal);
                  jarvis.objects.Metrics.UpdateGroupMetric(_this, mg.id, metric.Id, metric.ordinal)
                }
              }
            })
          }
        });
        if(_.find(tab.dimensions, function(item) {
          return!item.deleted
        }).length == 0) {
          throw"Report tabs must contain at least one dimension.";
        }
        $(tab.dimensions).each(function(i, dimension) {
          if(dimension.deleted) {
            if(wetrun) {
              try {
                if(typeof dimension.ordinal == "undefined") {
                  dimension.ordinal = _.max(tab.dimensions, function(item) {
                    return item.ordinal
                  }).ordinal + 1
                }
              }catch(ex) {
                dimension.ordinal = 0
              }
              jarvis.debug.log("INFO", "Jarvis.Visualisation.Report.Editor", 6, 'Deleting dimension "' + dimension.Name + '" for tab ' + tab.id);
              jarvis.objects.Reports.DeleteTabDimension(_this, tab.id, dimension.Id, dimension.ordinal)
            }
          }else {
            if(wetrun) {
              try {
                if(typeof dimension.ordinal == "undefined") {
                  dimension.ordinal = _.max(tab.dimensions, function(item) {
                    return item.ordinal
                  }).ordinal + 1
                }
              }catch(ex) {
                dimension.ordinal = 0
              }
              jarvis.debug.log("INFO", "Jarvis.Visualisation.Report.Editor", 6, 'Updating dimension "' + dimension.Name + '" for tab ' + tab.id + ", ordinal: " + dimension.ordinal);
              jarvis.objects.Reports.UpdateTabDimension(_this, tab.id, dimension.Id, dimension.ordinal)
            }
          }
        })
      }
    })
  }catch(e) {
    _this.showAlert(_this, {message:e});
    throw e;return
  }
  if(wetrun) {
    try {
      jarvis.objects.Reports.List(null, null, null, true);
      buildContentMenu_Reports();
      var $editor = $(".report.editor");
      var $head = $(".jumbotron.subhead");
      var $panel = $(".jarvis._container .jarvis.report.panel");
      $editor.remove();
      $head.show();
      $panel.show();
      $(jarvis).trigger("reportchange", _this.reportID);
      jarvis.debug.log("INFO", "Jarvis.Visualisation.Report.Editor", 6, "Saved.")
    }catch(e) {
      return
    }
  }
  if(!wetrun) {
    jarvis.debug.log("INFO", "Jarvis.Visualisation.Report.Editor", 6, "Updating layout...");
    var layout = function() {
      $(window).scrollTop(0);
      jarvis.visualisation.showLoading(true)
    };
    $(layout).promise().done(function() {
      setTimeout(function() {
        _this.Save(_this, options, true)
      }, 13)
    })
  }
};
jarvis.visualisation.report.Editor.prototype.showAlert = function(sender, options) {
  var _this = sender;
  var $alert = $('<div class="alert alert-error save-error"><button type="button" class="close" data-dismiss="alert">\u00d7</button></div>');
  var message = "<strong>Error</strong>, we have failed to save the report due to the following issue(s):<br/>";
  message += '<ul class="errors"></ul>';
  $alert.append(message);
  if(typeof options.message === "string") {
    options.message = [options.message]
  }
  $(options.message).each(function(index, item) {
    $alert.find(".errors").append("<li>" + item + "</li>")
  });
  $(".report.editor .header:first-of-type").before($alert);
  $("html, body").animate({scrollTop:0}, "slow")
};
jarvis.debug.log("INFO", "Report.Visualisation.Editor", 6, "JS source loaded");
jarvis.provide("jarvis.visualisation");
jarvis.require("jarvis.debug");
jarvis.require("jarvis.date");
jarvis.require("jarvis.string");
jarvis.visualisation;
jarvis.visualisation.loadingDrawn = false;
jarvis.visualisation.errorDrawn = false;
jarvis.visualisation.breadcrumb = [];
jarvis.visualisation.init = function() {
  if(!jarvis.bootstrap) {
    jarvis.debug.log("INFO", "Dashboard.Visualisation", 6, "Bootstrap is not needed.");
    return
  }
  var $container_metrics = $(".jarvis.jcontainer.metrics:not([data-uid])");
  if($container_metrics.length > 0) {
    jarvis.require("jarvis.visualisation.picker.metrics");
    jarvis.require("jarvis.visualisation.container.metrics");
    waitforScript("jarvis.visualisation.picker.metrics", function() {
      waitforScript("jarvis.visualisation.container.metrics", function() {
        jarvis.visualisation.init_container_metrics($container_metrics)
      })
    })
  }
  var $container_dimensions = $(".jarvis.jcontainer.dimensions:not([data-uid])");
  if($container_dimensions.length > 0) {
    jarvis.require("jarvis.visualisation.container.dimensions");
    waitforScript("jarvis.visualisation.container.dimensions", function() {
      jarvis.visualisation.init_container_dimensions($container_dimensions)
    })
  }
  var $picker_metrics = $(".jarvis.picker.metrics:not([data-uid])");
  if($picker_metrics.length > 0) {
    jarvis.require("jarvis.visualisation.picker.metrics");
    waitforScript("jarvis.visualisation.picker.metrics", function() {
      jarvis.visualisation.init_picker_metrics($picker_metrics)
    })
  }
  var $picker_dimensions = $(".jarvis.picker.dimensions:not([data-uid])");
  if($picker_dimensions.length > 0) {
    jarvis.require("jarvis.visualisation.picker.dimensions");
    waitforScript("jarvis.visualisation.picker.dimensions", function() {
      jarvis.visualisation.init_picker_dimensions($picker_dimensions)
    })
  }
  jarvis.visualisation.bootstrap();
  if($(".jarvis.panel").length == 0) {
    jarvis.debug.log("INFO", "Jarvis.Visualisation", 4, "Searching for standalone components on page.");
    if($(".jarvis.report.metricgroups").length > 0) {
      (new jarvis.visualisation.report.MetricGroup).init()
    }
    if($(".jarvis.report.tabs").length > 0) {
      (new jarvis.visualisation.report.Tabs).init()
    }
    if($(".jarvis.report.metricbox").length > 0) {
      (new jarvis.visualisation.report.MetricBox).init()
    }
    if($(".jarvis.report.timeline").length > 0) {
      (new jarvis.visualisation.report.Timeline).init()
    }
    if($(".jarvis.report.jtable").length > 0) {
      (new jarvis.visualisation.report.Table).init()
    }
    if($(".jarvis.dashboard.metricbox").length > 0) {
      (new jarvis.visualisation.dashboard.MetricBox).init()
    }
    if($(".jarvis.dashboard.pie").length > 0) {
      (new jarvis.visualisation.dashboard.Pie).init()
    }
    if($(".jarvis.dashboard.jtable").length > 0) {
      (new jarvis.visualisation.dashboard.Table).init()
    }
    if($(".jarvis.dashboard.timeline").length > 0) {
      (new jarvis.visualisation.dashboard.Timeline).init()
    }
    if($(".jarvis.realtime.geo").length > 0) {
      (new jarvis.visualisation.realtime.Geo).init()
    }
    if($(".jarvis.realtime.metricbox").length > 0) {
      (new jarvis.visualisation.realtime.MetricBox).init()
    }
    if($(".jarvis.realtime.startstop").length > 0) {
      jarvis.visualisation.realtime.StartStop.init()
    }
    if($(".jarvis.realtime.status").length > 0) {
      jarvis.visualisation.realtime.Status.init()
    }
    if($(".jarvis.realtime.table").length > 0) {
      (new jarvis.visualisation.realtime.Table).init()
    }
    if($(".jarvis.realtime.timeline").length > 0) {
      (new jarvis.visualisation.realtime.Timeline).init()
    }
  }else {
    if($(".jarvis.panel").length > 0) {
      jarvis.debug.log("INFO", "Jarvis.Visualisation", 4, "Searching for panels on page.");
      if($(".jarvis.dashboard.panel").length > 0) {
        (new jarvis.visualisation.dashboard.Panel).init(null, null, true);
        $(".jarvis.dashboard.panel").show()
      }else {
        if($(".jarvis.report.panel").length > 0) {
          jarvis.visualisation.showReport()
        }else {
          if($(".jarvis.realtime.panel").length > 0) {
            (new jarvis.visualisation.realtime.Panel).init(null, null, true)
          }
        }
      }
    }
  }
};
waitforScript = function(id, callback) {
  setTimeout(function() {
    if(jarvis.loaded.indexOf(id) == -1) {
      waitforScript(id, callback)
    }else {
      callback()
    }
  }, 100)
};
jarvis.visualisation.init_picker_metrics = function(objects) {
  objects.each(function(index, item) {
    var $item = $(item);
    var uid = guidGenerator();
    $item.attr("data-uid", uid);
    var o = new jarvis.visualisation.picker.Metrics({container:$item, placeholdertext:"Choose a metric..."})
  })
};
jarvis.visualisation.init_picker_dimensions = function(objects) {
  objects.each(function(index, item) {
    var $item = $(item);
    var uid = guidGenerator();
    $item.attr("data-uid", uid);
    var o = new jarvis.visualisation.picker.Dimensions({container:$item, placeholdertext:"Choose a dimension..."})
  })
};
jarvis.visualisation.init_container_metrics = function(objects) {
  objects.each(function(index, item) {
    var $item = $(item);
    var uid = guidGenerator();
    $item.attr("data-uid", uid);
    var o = new jarvis.visualisation.container.Metrics({container:$item})
  })
};
jarvis.visualisation.init_container_dimensions = function(objects) {
  objects.each(function(index, item) {
    var $item = $(item);
    var uid = guidGenerator();
    $item.attr("data-uid", uid);
    var o = new jarvis.visualisation.container.Dimensions({container:$item})
  })
};
jarvis.visualisation.lastIntervalLoading = 0;
jarvis.visualisation.showLoading = function(immediate) {
  $(".simpleloading").show();
  $(".container.jarvis").unbind("resize");
  $(".container.jarvis").resize(function() {
    jarvis.debug.log("INFO", "jarvis.visualisation", 6, "container resize [2]: " + ($(".content_wrapper").width() - 1).toString() + "px")
  });
  $(".container.jarvis").bind("resize", function() {
    jarvis.debug.log("INFO", "jarvis.visualisation", 6, "container resize: " + ($(".content_wrapper").width() - 1).toString() + "px");
    var $this = $(".jarvis._container");
    try {
      $(".overlay").css({opacity:0.5, width:$(".content_wrapper").width() - 1 + "px"})
    }catch(e) {
    }
  });
  try {
    $(".overlay").css({opacity:0.5, width:$(".content_wrapper").width() - 1 + "px"})
  }catch(e) {
  }
  if(immediate) {
    $(".overlay").show()
  }else {
    $(".overlay").fadeIn()
  }
  $(".launchlink").addClass("disabled")
};
jarvis.visualisation.hideLoading = function() {
  $(".simpleloading").hide();
  $(".overlay").fadeOut().hide();
  $(".launchlink").removeClass("disabled")
};
jarvis.visualisation.setupLoading = function() {
  if(!jarvis.visualisation.loadingDrawn) {
    $("body").append('<div id="" class="simpleloading" style="display: none; ">Loading ...</div>');
    $(".overlay").css({opacity:0.5, width:$(".content_wrapper").width() - 1 + "px"});
    $(document).ajaxStart(function() {
      var $this = $(".jarvis._container");
      jarvis.ajaxCounter++;
      jarvis.ajaxCounter = 2;
      if($(".overlay").css("display") == "none") {
        if(jarvis.ajaxCounter > 1) {
          jarvis.visualisation.showLoading()
        }
      }
      if(jarvis.visualisation.lastIntervalLoading <= 0) {
        jarvis.visualisation.lastIntervalLoading = setInterval(function() {
          if(jarvis.ajaxCounter > 0 && $(".overlay").css("display") == "none") {
            jarvis.visualisation.showLoading()
          }else {
            if(jarvis.ajaxCounter <= 0 && $(".overlay").css("display") == "block") {
              clearInterval(jarvis.visualisation.lastIntervalLoading);
              jarvis.visualisation.hideLoading()
            }
          }
        }, 500)
      }
    });
    $(document).ajaxStop(function(e, xhr, settings) {
      jarvis.ajaxCounter--;
      jarvis.ajaxCounter = 0;
      if(jarvis.ajaxCounter < 0) {
        jarvis.ajaxCounter = 0
      }
      if(jarvis.ajaxCounter <= 0) {
        setTimeout(function() {
          if(jarvis.ajaxCounter <= 0 && ($(".overlay").css("display") == "block" || $(".simpleloading").css("display") == "block")) {
            clearInterval(jarvis.visualisation.lastIntervalLoading);
            jarvis.visualisation.hideLoading()
          }
        }, 500);
        if(!jarvis.inSaveState) {
          jarvis.saveState("State change")
        }
      }
    });
    jarvis.visualisation.loadingDrawn = true
  }
};
jarvis.visualisation.setupError = function() {
  if(!jarvis.visualisation.errorDrawn) {
    $("body").append('<div id="" class="simpleerror" style="display: none; ">Error.</div>');
    if(!jarvis.bootstrap) {
      return
    }
    var _modal = '<div class="modal_error modal hide fade">';
    _modal += '<div class="modal-header">';
    _modal += '<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>';
    _modal += "<h3>Error details</h3>";
    _modal += "</div>";
    _modal += '<div class="modal-body">';
    _modal += '<p class="errortext" style="font-weight: bold;">Error details</p>';
    _modal += '<p class="">Apologies for your inconvenience, but the system has failed to complete your request.</p>';
    _modal += '<p class="">We have gathered the following information from your system and our server logs and with your permission would like to open a support ticket on your behalf and send the relevant information for further investigation by our engineers.</p>';
    _modal += '<div class="accordion" id="accordion2">';
    _modal += '<div class="accordion-group">';
    _modal += '<div class="accordion-heading">';
    _modal += '<a class="accordion-toggle" data-toggle="collapse" data-parent="#accordion2" href="#collapseOne">';
    _modal += "Exception details";
    _modal += "</a>";
    _modal += "</div>";
    _modal += '<div id="collapseOne" class="accordion-body collapse in">';
    _modal += '<div class="accordion-inner exceptiondetails">';
    _modal += "";
    _modal += "</div>";
    _modal += "</div>";
    _modal += "</div>";
    _modal += '<div class="accordion-group">';
    _modal += '<div class="accordion-heading">';
    _modal += '<a class="accordion-toggle" data-toggle="collapse" data-parent="#accordion2" href="#collapseTwo">';
    _modal += "Client state";
    _modal += "</a>";
    _modal += "</div>";
    _modal += '<div id="collapseTwo" class="accordion-body collapse">';
    _modal += '<div class="accordion-inner ">';
    _modal += '<textarea class="clientstate" style="width: 100%;height: 100px;"></textarea>';
    _modal += "</div>";
    _modal += "</div>";
    _modal += "</div>";
    _modal += '<div class="accordion-group">';
    _modal += '<div class="accordion-heading">';
    _modal += '<a class="accordion-toggle" data-toggle="collapse" data-parent="#accordion3" href="#collapseThree">';
    _modal += "Server log (last 50 rows)";
    _modal += "</a>";
    _modal += "</div>";
    _modal += '<div id="collapseThree" class="accordion-body collapse">';
    _modal += '<div class=" accordion-inner" >';
    _modal += '<table class="table table-striped table-condensed serverlog"><tr><th>Timestamp (server GMT)</th><th>Message</th></tr></table>';
    _modal += "</div>";
    _modal += "</div>";
    _modal += "</div>";
    _modal += "</div>";
    _modal += '<p class="">In order to complete opening a support ticket, please click the Report button to proceed.</p>';
    _modal += "</div>";
    _modal += '<div class="modal-footer">';
    _modal += '<a href="#" class="btn" data-dismiss="modal" aria-hidden="true">Close</a>';
    _modal += '<a href="#" class="btn btn-primary btnreport">Report</a>';
    _modal += "</div>";
    _modal += "</div>";
    $("body").append(_modal);
    jarvis.visualisation.errorDrawn = true
  }
};
function make_base_auth(user, password) {
  var tok = user + ":" + password;
  var hash = btoa(tok);
  return"Basic " + hash
}
jarvis.visualisation.showError = function(error) {
  $(jarvis).trigger("jarvis-error", [error]);
  jarvis.visualisation.setupError();
  $(".simpleloading").hide();
  $(".simpleerror").text("Error. Click here to review and report...");
  $(".simpleerror").off("click");
  $(".simpleerror").on("click", function() {
    var $modal_error = $(".modal_error");
    try {
      var serverlog = (new jarvis.objects.State).GetLog();
      serverlog = $.parseJSON(serverlog.data).m_serializationArray;
      var $serverlog = $(".serverlog");
      $serverlog.empty();
      var $tr = $("<tr></tr>");
      var $th = $("<th>Timetamp</th>");
      $tr.append($th);
      $th = $("<th>Message</th>");
      $tr.append($th);
      $serverlog.append($tr);
      serverlog.reverse();
      $(serverlog).each(function(index, item) {
        var pattern = /\[(.*?)\]/;
        var timestamp = $.trim(item.split(pattern)[1]).split(" ")[1];
        var message = $.trim(item.split(pattern)[2]);
        $tr = $("<tr></tr>");
        var $td = $('<td class="timestamp">' + timestamp + "</td>");
        $tr.append($td);
        $td = $('<td class="message">' + message + "</td>");
        $tr.append($td);
        $serverlog.append($tr)
      })
    }catch(ex) {
      console.log(ex)
    }
    var errormessage = "JA Error. ";
    if(typeof error == "object") {
      var _message = "";
      jQuery.each(error, function(i, o) {
        _message += "<strong>" + i + "</strong>: " + o + "<br/>"
      });
      $modal_error.find(".exceptiondetails").html(_message);
      $modal_error.find(".errortext").html(error.Message.substring(0, 50));
      errormessage += error.Message.substring(0, 50)
    }else {
      $modal_error.find(".exceptiondetails").html("Message: " + error);
      $modal_error.find(".errortext").html(error);
      errormessage += error.substring(0, 50)
    }
    $modal_error.find(".clientstate").text(JSON.stringify(jarvis.state, null, "\t"));
    $(".btnreport").off("click");
    $(".btnreport").on("click", function() {
      var endPoint = "/Engine/Tickets.aspx";
      if(jarvis.basePath) {
        endPoint = jarvis.svcPath + endPoint
      }
      endPoint = jarvis.hostname + endPoint;
      errormessage += "<br/><br/>\r\n\r\nClient State<hr/><br/>\r\n";
      errormessage += JSON.stringify(jarvis.state, null, "\t");
      errormessage += "<br/><br/>\r\n\r\nServer Log<hr/><br/>\r\n";
      $(serverlog).each(function(index, item) {
        var pattern = /\[(.*?)\]/;
        var timestamp = $.trim(item.split(pattern)[1]).split(" ")[1];
        var message = $.trim(item.split(pattern)[2]);
        errormessage += "" + timestamp + ": " + message + "<br/>\r\n"
      });
      var _xml = "";
      _xml += "<helpdesk_ticket><description>" + errormessage + "</description>";
      _xml += "<subject>Exception reported from JA.</subject>";
      _xml += "<email>" + jarvis.user.email + "</email>";
      _xml += "<priority>2</priority>";
      _xml += "<source>4</source>";
      _xml += "</helpdesk_ticket>";
      $.ajax({type:"POST", async:false, contentType:"text/xml", dataType:"text", url:endPoint, data:_xml, success:function(data) {
        xmlDoc = $.parseXML(data), $xml = $(xmlDoc), $title = $xml.find("display-id");
        $modal_error.modal("hide");
        $(".simpleerror").hide()
      }, error:function(e, e1, e2) {
      }})
    });
    $modal_error.modal("show")
  });
  $(".simpleerror").show();
  $(".jarvis._container").css("opacity", "1");
  setTimeout(function() {
    $(".simpleerror").hide()
  }, 15E3)
};
jarvis.visualisation.showNotice = function() {
};
jarvis.visualisation.setDisplay = function(show) {
  var $body = $("body");
  var $jarvis = $(".jarvis._container");
  var $report = $body.find(".jarvis.report.panel");
  var $dashboard = $body.find(".jarvis.dashboard.panel");
  var $realtime = $(".jarvis.realtime.panel");
  var $datebox = $body.find(".jarvis.picker.datebox");
  var $editbutton = $body.find(".panel-edit");
  var $addwidgetbutton = $body.find(".widget-add");
  $(".report.editor").hide();
  switch(show) {
    case "homepage":
      break;
    case "report":
      $body.find(".homepage").hide();
      $realtime.hide();
      $realtime.find(".widgets").empty();
      $dashboard.hide();
      $dashboard.find(".widgets").empty();
      $datebox.show();
      $report.show();
      $editbutton.show();
      $addwidgetbutton.hide();
      $jarvis.show();
      break;
    case "dashboard":
      $body.find(".homepage").hide();
      $report.hide();
      $report.find(".timeline").empty();
      $report.find(".metricbox").empty();
      $report.find(".jtable").empty();
      $realtime.hide();
      $realtime.find(".widgets").empty();
      $datebox.show();
      $editbutton.show();
      $addwidgetbutton.show();
      $dashboard.show();
      $jarvis.show();
      break;
    case "realtime":
      $body.find(".homepage").hide();
      $report.hide();
      $report.find(".timeline").empty();
      $report.find(".metricbox").empty();
      $report.find(".jtable").empty();
      $dashboard.hide();
      $dashboard.find(".widgets").empty();
      $datebox.hide();
      $editbutton.show();
      $addwidgetbutton.show();
      $realtime.show();
      $jarvis.show();
      break;
    default:
      break
  }
  var $head = $(".jumbotron.subhead");
  var $panel = $(".jarvis._container .jarvis.report.panel");
  $head.show();
  $panel.show()
};
jarvis.visualisation.reportInit = false;
jarvis.visualisation.reportWrapper = null;
jarvis.visualisation.dashboardInit = false;
jarvis.visualisation.dashboardWrapper = null;
jarvis.visualisation.realtimeInit = false;
jarvis.visualisation.realtimeWrapper = null;
jarvis.visualisation.dateBoxInit = false;
jarvis.visualisation.showHomepage = function(reportID, redraw) {
  jarvis.visualisation.setDisplay("homepage")
};
jarvis.visualisation.showReport = function(reportID, redraw) {
  jarvis.visualisation.setDisplay("report");
  if(jarvis.visualisation.dashboardWrapper) {
    jarvis.visualisation.dashboardWrapper.dispose()
  }
  jarvis.visualisation.report.globalfilter = "";
  jarvis.reportID = reportID;
  if(!jarvis.visualisation.reportInit) {
    jarvis.visualisation.reportWrapper = new jarvis.visualisation.report.Panel({reportID:reportID});
    jarvis.visualisation.reportInit = true
  }
  var tabID = 0;
  var metricgroupID = 0;
  if(jarvis.state) {
    tabID = jarvis.state.tabID;
    metricgroupID = jarvis.state.metricgroupID
  }
  if(tabID == null || typeof tabID == "undefined") {
    tabID = 0
  }
  if(metricgroupID == null || typeof metricgroupID == "undefined") {
    metricgroupID = 0
  }
  jarvis.visualisation.reportWrapper.init({reportID:reportID, tabID:tabID, tabType:"explorer", metricgroupID:metricgroupID}, $(".jarvis.report.panel"), true, true, true);
  $(jarvis).trigger("setreport", jarvis.visualisation.reportWrapper.reportID)
};
jarvis.visualisation.showDashboard = function(dashboardID) {
  jarvis.visualisation.setDisplay("dashboard");
  if(jarvis.visualisation.reportWrapper) {
    jarvis.visualisation.reportWrapper.dispose()
  }
  jarvis.dashboardID = dashboardID;
  if(!jarvis.visualisation.dashboardInit) {
    jarvis.visualisation.dashboardWrapper = new jarvis.visualisation.dashboard.Panel({panelID:dashboardID});
    jarvis.visualisation.dashboardInit = true
  }
  jarvis.visualisation.dashboardWrapper.init({panelID:dashboardID}, $(".jarvis.dashboard.panel"), true, true, true);
  $(jarvis).trigger("setdashboard", jarvis.visualisation.dashboardWrapper.panelID)
};
jarvis.visualisation.showRealtimePanel = function(panelID) {
  jarvis.visualisation.setDisplay("realtime");
  jarvis.panelID = panelID;
  if(!jarvis.visualisation.realtimeInit) {
    jarvis.visualisation.realtimeWrapper = new jarvis.visualisation.realtime.Panel({panelID:panelID});
    jarvis.visualisation.realtimeInit = true
  }
  jarvis.visualisation.realtimeWrapper.init({panelID:panelID}, $(".jarvis.realtime.panel"), true, true, true)
};
jarvis.visualisation.bootstrap = function() {
  jarvis.debug.log("INFO", "jarvis.visualisation", 6, "Bootstrap...");
  if(!jarvis.bootstrap) {
    jarvis.debug.log("INFO", "jarvis.visualisation", 6, "Bootstrap is not needed.");
    return
  }
  jarvis.debug.log("INFO", "jarvis.visualisation", 6, "Bootstrapping Datebox");
  jarvis.visualisation.picker.DateBox.init();
  jarvis.visualisation.dateBoxInit = true;
  jarvis.visualisation.setupLoading();
  jarvis.visualisation.setupError();
  $(jarvis).unbind("homepage");
  $(jarvis).bind("homepage", function(e) {
    jarvis.state = {};
    jarvis.visualisation.picker.DateBox.init();
    jarvis.visualisation.showHomepage()
  });
  $(jarvis).unbind("reportchange");
  $(jarvis).bind("reportchange", function(e, reportID) {
    jarvis.state["timeline-1234"] = null;
    jarvis.state["table-1234"] = null;
    if(jarvis.visualisation.reportWrapper) {
      try {
        jarvis.visualisation.reportWrapper.dispose()
      }catch(ex) {
      }
    }
    jarvis.state.dashboardID = null;
    jarvis.state.reportID = null;
    jarvis.state.tabID = null;
    jarvis.state.metricgroupID = null;
    jarvis.state.tabType = null;
    console.log("state", jarvis.state);
    jarvis.visualisation.showReport(reportID)
  });
  $(jarvis).unbind("dashboardchange");
  $(jarvis).bind("dashboardchange", function(e, dashboardID) {
    jarvis.visualisation.showDashboard(dashboardID)
  });
  $(jarvis).unbind("realtimepanelchange");
  $(jarvis).bind("realtimepanelchange", function(e, panelID) {
    jarvis.visualisation.showRealtimePanel(panelID)
  });
  $(".homepagelink").off("click");
  $(".homepagelink").on("click", function() {
    jarvis.state.view = "homepage";
    jarvis.saveState("Homepage switch");
    $(jarvis).trigger("homepage")
  })
};
jarvis.debug.log("INFO", "Jarvis.Visualisation", 6, "JS source loaded");
try {
  (new jarvis.objects.Auth).GetUser(this, {}, function(sender, user) {
    jarvis.USER = user;
    $(".loginname").prepend(jarvis.USER.displayName)
  })
}catch(ex) {
  console.log(ex)
}
$.ajaxSetup({statusCode:{401:function() {
}, 500:function(e, e1, e2) {
  if(xhr.status == 500 || xhr.readyState != 0) {
    jarvis.visualisation.showError({Message:msg, Url:url, Line:line})
  }
}}});
$(window).hashchange(function() {
  if(jarvis.managestate) {
    updateState(location.hash)
  }
});
if(location.hash == "") {
  jarvis.state.view = "dashboard"
}else {
}
$().ready(function(e) {
  jarvis.visualisation.init();
  updateState(location.hash, true);
  $(window).trigger("jarvis-loaded");
  jQuery.fn.animateAuto = function(prop, speed, callback) {
    var elem, height, width;
    return this.each(function(i, el) {
      el = jQuery(el), elem = el.clone().css({"height":"auto", "width":"auto"}).appendTo("body");
      height = elem.css("height"), width = elem.css("width"), elem.remove();
      if(prop === "height") {
        el.animate({"height":height}, speed, callback)
      }else {
        if(prop === "width") {
          el.animate({"width":width}, speed, callback)
        }else {
          if(prop === "both") {
            el.animate({"width":width, "height":height}, speed, callback)
          }
        }
      }
    })
  }
});
window.fork = function(async_calls, shared_callback) {
  var counter = async_calls.length;
  var all_results = [];
  function makeCallback(index) {
    return function() {
      counter--;
      var results = [];
      for(var i = 0;i < arguments.length;i++) {
        results.push(arguments[i])
      }
      all_results[index] = results;
      if(counter == 0) {
        shared_callback(all_results)
      }
    }
  }
  for(var i = 0;i < async_calls.length;i++) {
    try {
      async_calls[i](makeCallback(i))
    }catch(ex) {
      console.log("Forked thread failed: " + ex.message);
      console.log(ex.stack)
    }
  }
};

