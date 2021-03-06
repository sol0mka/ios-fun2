// Generated by CoffeeScript 1.6.2
(function() {
  var Curve, Line, Main;

  Line = (function() {
    function Line(o) {
      this.o = o != null ? o : {};
      this.el = document.getElementById(this.o.id);
      this.getPoints();
      this;
    }

    Line.prototype.getPoints = function() {
      this.points = [];
      this.points.push({
        x: parseInt(this.el.getAttribute('x1'), 10),
        y: parseInt(this.el.getAttribute('y1'), 10)
      });
      this.points.push({
        x: parseInt(this.el.getAttribute('x2'), 10),
        y: parseInt(this.el.getAttribute('y2'), 10)
      });
      this.pointsEnd = [];
      this.pointsEnd.push({
        x: parseInt(this.el.getAttribute('x1e'), 10),
        y: parseInt(this.el.getAttribute('y1e'), 10)
      });
      return this.pointsEnd.push({
        x: parseInt(this.el.getAttribute('x2e'), 10),
        y: parseInt(this.el.getAttribute('y2e'), 10)
      });
    };

    return Line;

  })();

  Curve = (function() {
    function Curve(o) {
      this.o = o != null ? o : {};
      this.el = document.getElementById(this.o.id);
      this.getPoints();
      this;
    }

    Curve.prototype.getPoints = function() {
      this.d = this.parseD('d');
      return this.d2 = this.parseD('d2');
    };

    Curve.prototype.parseD = function(d) {
      var curve, endPoint, middlePoint, point, returnValue, startPoint;

      d = this.el.getAttribute(d);
      startPoint = d.split('c')[0];
      startPoint = startPoint.split(',');
      startPoint = {
        x: parseInt(startPoint[0].replace('M', ''), 10),
        y: parseInt(startPoint[1], 10)
      };
      middlePoint = d.split('c')[1];
      middlePoint = middlePoint.split(',');
      curve = middlePoint.slice(0, 4);
      curve = (function() {
        var _i, _len, _results;

        _results = [];
        for (_i = 0, _len = curve.length; _i < _len; _i++) {
          point = curve[_i];
          _results.push(parseInt(point, 10));
        }
        return _results;
      })();
      endPoint = middlePoint.slice(4, 6);
      endPoint = {
        x: parseInt(endPoint[0], 10),
        y: parseInt(endPoint[1], 10)
      };
      return returnValue = {
        startPoint: startPoint,
        curve: curve,
        endPoint: endPoint
      };
    };

    return Curve;

  })();

  Main = (function() {
    Main.prototype.defaults = {
      transition: 500,
      delay: 4000,
      rainbowTime: 36000,
      particleDelay: 0
    };

    function Main(o) {
      this.o = o != null ? o : {};
      this.vars();
      this.animateChars();
      this.animate();
    }

    Main.prototype.vars = function() {
      this.settings = this.extend(this.defaults, this.o);
      this.percent = 6.9;
      this.currentProgress = 0;
      this.rainbow = document.getElementById('rainbow');
      this.process = document.getElementById('process');
      this.easing = TWEEN.Easing.Quadratic.Out;
      this.animate = this.bind(this.animate, this);
      this.l1 = new Line({
        id: 'l1'
      });
      this.l2 = new Line({
        id: 'l2'
      });
      this.o1 = new Curve({
        id: 'o1'
      });
      this.o2 = new Curve({
        id: 'o2'
      });
      this.a1 = new Line({
        id: 'a1'
      });
      this.a2 = new Line({
        id: 'a2'
      });
      this.a3 = new Line({
        id: 'a3'
      });
      this.d1 = new Line({
        id: 'd1'
      });
      this.d2 = new Curve({
        id: 'd2'
      });
      this.i1 = new Line({
        id: 'i1'
      });
      this.n1 = new Line({
        id: 'n1'
      });
      this.n2 = new Line({
        id: 'n2'
      });
      this.n3 = new Line({
        id: 'n3'
      });
      this.g1 = new Line({
        id: 'g1'
      });
      this.g2 = new Curve({
        id: 'g2'
      });
      this.lines = [];
      this.lines.push(this.l1, this.l2, this.a1, this.a2, this.a3, this.d1, this.i1, this.n1, this.n2, this.n3, this.g1);
      this.curves = [];
      return this.curves.push(this.o1, this.o2, this.d2, this.g2);
    };

    Main.prototype.extend = function(obj, obj2) {
      var key, value;

      for (key in obj2) {
        value = obj2[key];
        if (obj2[key] != null) {
          obj[key] = value;
        }
      }
      return obj;
    };

    Main.prototype.animateChars = function() {
      if (this.settings.delay !== 'never') {
        this.animateLines();
        this.animateCurves();
      }
      return this.animateRainbow();
    };

    Main.prototype.animateRainbow = function() {
      var it, tween;

      it = this;
      return tween = new TWEEN.Tween({
        deg: 0
      }).to({
        deg: 360
      }, this.settings.rainbowTime).onUpdate(function() {
        return it.rainbow.setAttribute('transform', 'rotate(' + this.deg + ', 0, 1000)');
      }).start().repeat(true);
    };

    Main.prototype.animateCurves = function() {
      var curve, i, it, _i, _len, _ref, _results,
        _this = this;

      it = this;
      _ref = this.curves;
      _results = [];
      for (i = _i = 0, _len = _ref.length; _i < _len; i = ++_i) {
        curve = _ref[i];
        _results.push((function(curve) {
          var end, start;

          start = {
            curve0: curve.d.curve[0],
            curve1: curve.d.curve[1],
            curve2: curve.d.curve[2],
            curve3: curve.d.curve[3],
            startX: curve.d.startPoint.x,
            startY: curve.d.startPoint.y,
            endX: curve.d.endPoint.x,
            endY: curve.d.endPoint.y
          };
          end = {
            curve0: curve.d2.curve[0],
            curve1: curve.d2.curve[1],
            curve2: curve.d2.curve[2],
            curve3: curve.d2.curve[3],
            startX: curve.d2.startPoint.x,
            startY: curve.d2.startPoint.y,
            endX: curve.d2.endPoint.x,
            endY: curve.d2.endPoint.y
          };
          return setTimeout(function() {
            var tween;

            return tween = new TWEEN.Tween(start).to(end, _this.settings.transition).easing(_this.easing).onUpdate(function() {
              return curve.el.setAttribute('d', "M" + this.startX + ", " + this.startY + " c" + this.curve0 + ", " + this.curve1 + ", " + this.curve2 + ", " + this.curve3 + ", " + this.endX + ", " + this.endY);
            }).yoyo(true).delay(_this.settings.delay).repeat(999999999999999999999).start();
          }, i * _this.settings.particleDelay);
        })(curve));
      }
      return _results;
    };

    Main.prototype.setProgress = function(n, isNoDelay) {
      var it, time, tween;

      if (isNoDelay == null) {
        isNoDelay = false;
      }
      n = this.normalizeNum(n);
      if (isNoDelay) {
        this.process.setAttribute('width', "" + n);
        return this.currentProgress = n;
      } else {
        it = this;
        time = Math.abs(Math.abs(this.currentProgress) - Math.abs(n));
        return tween = new TWEEN.Tween({
          p: this.currentProgress
        }).to({
          p: n
        }, time * 10).easing(this.easing).onUpdate(function() {
          it.process.setAttribute('width', "" + this.p);
          return it.currentProgress = this.p;
        }).start();
      }
    };

    Main.prototype.animateLines = function() {
      var i, it, line, _i, _len, _ref, _results,
        _this = this;

      it = this;
      _ref = this.lines;
      _results = [];
      for (i = _i = 0, _len = _ref.length; _i < _len; i = ++_i) {
        line = _ref[i];
        _results.push((function(line, i) {
          return setTimeout(function() {
            var tween;

            return tween = new TWEEN.Tween({
              x1: line.points[0].x,
              y1: line.points[0].y,
              x2: line.points[1].x,
              y2: line.points[1].y
            }).to({
              x1: line.pointsEnd[0].x,
              y1: line.pointsEnd[0].y,
              x2: line.pointsEnd[1].x,
              y2: line.pointsEnd[1].y
            }, _this.settings.transition).easing(_this.easing).onUpdate(function() {
              line.el.setAttribute('x1', this.x1);
              line.el.setAttribute('y1', this.y1);
              line.el.setAttribute('x2', this.x2);
              return line.el.setAttribute('y2', this.y2);
            }).yoyo(true).delay(_this.settings.delay).repeat(999999999999999999999).start();
          }, i * _this.settings.particleDelay);
        })(line, i));
      }
      return _results;
    };

    Main.prototype.normalizeNum = function(n) {
      n = n % 101;
      return this.percent * n;
    };

    Main.prototype.animate = function() {
      requestAnimationFrame(this.animate);
      return TWEEN.update();
    };

    Main.prototype.bind = function(func, context) {
      var bindArgs, wrapper;

      wrapper = function() {
        var args, unshiftArgs;

        args = Array.prototype.slice.call(arguments);
        unshiftArgs = bindArgs.concat(args);
        return func.apply(context, unshiftArgs);
      };
      bindArgs = Array.prototype.slice.call(arguments, 2);
      return wrapper;
    };

    return Main;

  })();

  window.Loading = Main;

}).call(this);
