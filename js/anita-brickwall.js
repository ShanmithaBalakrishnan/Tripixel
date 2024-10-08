/**
 * Author: Shadow Themes
 * Author URL: https://shadow-themes.com
 */
"use strict";
class Anita_BrickWall {
  constructor(b, a = !1) {
    let c = this;
    if (b instanceof jQuery) {
      if (
        ((this.$el = b),
        (this.layoutDelay = 0),
        (this.oldWidth = 0),
        (this.elemCount = this.$el.children().length),
        (this.isActive = !1),
        (this.options = { animSpeed: "fast", type: "masonry", stagger: 0 }),
        a && "object" == typeof a)
      )
        for (let [d, e] of Object.entries(a)) c.options[d] = e;
      "grid" == this.options.type || "adjusted" == this.options.type
        ? (this.grid = { cH: 0, rH: [], rI: [] })
        : (this.grid = !1),
        "fast" !== this.options.animSpeed &&
          this.$el.addClass("animation--" + this.options.animSpeed),
        this.elemCount
          ? ((this.isActive = !0),
            this.$el.addClass("brickwall-grid"),
            this.options.stagger &&
              this.$el.children().each(function () {
                jQuery(this).css(
                  "transition-delay",
                  c.options.stagger * jQuery(this).index() + "ms"
                );
              }),
            this.layout())
          : console.warn("BrickWall: No children items found"),
        jQuery(window)
          .on("resize", function () {
            clearTimeout(c.resizeTimer),
              (c.resizeTimer = setTimeout(
                function () {
                  c.oldWidth !== c.$el.width() && c.layout();
                },
                150,
                c
              ));
          })
          .on("load", function () {
            c.layout(),
              setTimeout(
                function () {
                  c.layout();
                },
                500,
                c
              );
          })
          .on("beforeunload", function () {
            c.destroy();
          }),
        this.$el.parent().children(".anita-brickwall-filter").length &&
          ((this.$filter = this.$el
            .parent()
            .children(".anita-brickwall-filter")),
          this.$filter.on("click", "a", function (b) {
            b.preventDefault();
            let a = jQuery(this).attr("href");
            c.$filter.children(".is-active").removeClass("is-active"),
              jQuery(this).addClass("is-active"),
              c.filter(a.substring(1, a.length));
          }));
    } else console.error("BrickWall Error: Element is not a jQuery Object.");
  }
  getPaddings(a) {
    return Array(
      a.css("paddingTop"),
      a.css("paddingRight"),
      a.css("paddingBottom"),
      a.css("paddingLeft")
    );
  }
  moveItem(a) {
    a.css({
      transform:
        "scale(" +
        (a.hasClass("brickwall-item") ? 1 : 0) +
        ") translate3d(" +
        a.setX +
        "px, " +
        a.setY +
        "px, 0)",
      "transform-origin": a.oX + "px " + a.oY + "px",
      "z-index": 3,
    });
  }
  initItem(a) {
    setTimeout(
      function () {
        a.addClass("brickwall-item"),
          a.css({
            transform:
              "scale(1) translate3d(" +
              parseFloat(a.setX).toFixed(2) +
              "px, " +
              parseFloat(a.setY).toFixed(2) +
              "px, 0)",
          });
      },
      30,
      a
    );
  }
  calcItem(a, b = !1) {
    a instanceof jQuery || (a = jQuery(a));
    let h = this.getPaddings(a),
      k = this.colsX,
      d = this.colsY,
      c = 0,
      e = 0,
      i = a.width() + parseInt(h[1], 10) + parseInt(h[3], 10),
      f = a.height() + parseInt(h[0], 10) + parseInt(h[2], 10);
    if ("grid" == this.options.type || "adjusted" == this.options.type) {
      if (b) {
        let l = this.options.cols,
          g = b.id - b.cY * l;
        if (
          (0 === b.cY && (this.grid.cH = 0),
          0 === g && (this.grid.rH.fill(0), this.grid.rI.fill(0)),
          (c = i * g),
          (e = this.grid.cH),
          (this.grid.rH[g] = f),
          (a.setX = c),
          (a.setY = e),
          (a.oX = parseFloat(c + 0.5 * i).toFixed(2)),
          (a.oY = parseFloat(e + 0.5 * f).toFixed(2)),
          "adjusted" == this.options.type
            ? ((a.iH = f), (this.grid.rI[g] = a))
            : (this.moveItem(a),
              a.hasClass("brickwall-item") || this.initItem(a)),
          g == l - 1 || b.id == this.elemCount - 1)
        ) {
          let m =
            this.grid.rH[
              this.grid.rH.indexOf(Math.max.apply(Math, this.grid.rH))
            ];
          (this.grid.cH = this.grid.cH + m),
            "adjusted" == this.options.type &&
              this.grid.rI.forEach((a) => {
                if (a) {
                  if (a.iH < m) {
                    let b = 0.5 * (m - a.iH);
                    (a.setY = a.setY + b),
                      (a.oY = parseFloat(a.setY + 0.5 * a.iH).toFixed(2));
                  }
                  this.moveItem(a),
                    a.hasClass("brickwall-item") || this.initItem(a);
                }
              });
        }
      }
    } else {
      if ((b || (b = { fr: 0, id: 0 }), b.fr && b.id))
        b.id && (c = i * b.id), (d[b.id] = f), (k[b.id] = c);
      else {
        let j = d.indexOf(Math.min.apply(Math, d));
        (c = k[j]), (e = d[j]), (d[j] = d[j] + f);
      }
      (a.setX = c),
        (a.setY = e),
        (a.oX = parseFloat(c + 0.5 * i).toFixed(2)),
        (a.oY = parseFloat(e + 0.5 * f).toFixed(2)),
        this.moveItem(a),
        a.hasClass("brickwall-item") || this.initItem(a),
        (this.colsX = k),
        (this.colsY = d);
    }
  }
  layout(c = ":not(.is-hidden)", d = !1) {
    let e = this,
      h = 0,
      i = 1,
      g = this.getPaddings(this.$el.children()),
      f = Math.round(
        1 /
          ((this.$el.children().width() +
            parseInt(g[1], 10) +
            parseInt(g[3], 10)) /
            this.$el.width())
      ),
      b,
      a;
    (this.elemCount = this.$el.children(c).length),
      (this.options.cols = f),
      c && ":not(.is-hidden)" !== c
        ? ((h = this.$el.children().length - 1),
          (b = this.colsX),
          (a = this.colsY))
        : ((c = ":not(.is-hidden)"),
          (b = new Array(f)),
          (a = new Array(f)),
          b.fill(0),
          a.fill(0),
          (this.colsX = b),
          (this.colsY = a)),
      this.hasOwnProperty("colsX") || (b.fill(0), (this.colsX = b)),
      this.hasOwnProperty("colsY") || (a.fill(0), (this.colsY = a)),
      this.$el.children(c).each(function () {
        jQuery(this);
        let a = Math.floor(h / f) + 1;
        "grid" == e.options.type || "adjusted" == e.options.type
          ? e.calcItem(this, { cY: a - 1, id: h })
          : 1 == a
          ? e.calcItem(this, { fr: 1, id: h })
          : e.calcItem(this),
          (i = a),
          h++;
      }),
      "grid" == e.options.type || "adjusted" == e.options.type
        ? this.$el.height(this.grid.cH)
        : this.$el.height(Math.max.apply(Math, a)),
      (this.oldWidth = this.$el.width()),
      (this.colsY = a),
      (this.colsX = b),
      d && "function" == typeof d && d(e);
  }
  insert(a, b = !1) {
    a instanceof jQuery || (a = jQuery(a)),
      this.elemCount,
      (this.elemCount = this.elemCount + a.length),
      this.$el.append(a),
      this.layout(),
      "grid" == this.options.type || "adjusted" == this.options.type
        ? this.$el.height(this.grid.cH)
        : this.$el.height(Math.max.apply(Math, this.colsY)),
      b && "function" == typeof b && b(this);
  }
  filter(a) {
    let b = this;
    "all" == a
      ? this.$el.children(".is-hidden").removeClass("is-hidden")
      : (this.$el.children(".brickwall-filter--" + a).removeClass("is-hidden"),
        this.$el
          .children(":not(.brickwall-filter--" + a + ")")
          .addClass("is-hidden")),
      this.$el.children(".is-hidden").length &&
        this.$el.children(".is-hidden").each(function () {
          let a = jQuery(this),
            d = a.css("transform").split(","),
            e = parseFloat(d[4]),
            f = parseFloat(d[5].substring(0, d[5].length - 1)),
            c = b.getPaddings(a),
            g = a.width() + parseInt(c[1], 10) + parseInt(c[3], 10),
            h = a.height() + parseInt(c[0], 10) + parseInt(c[2], 10);
          a.css({
            transform:
              "scale(0) translate3d(" +
              parseFloat(e).toFixed(2) +
              "px, " +
              parseFloat(f).toFixed(2) +
              "px, 0)",
            "transform-origin":
              parseFloat(e + 0.5 * g).toFixed(2) +
              "px " +
              parseFloat(f + 0.5 * h).toFixed(2) +
              "px",
            "z-index": "1",
          });
        }),
      this.layout();
  }
  remove(a) {
    a instanceof jQuery || (a = jQuery(a));
    let b = this.getPaddings(a),
      f = a.width() + parseInt(b[1], 10) + parseInt(b[3], 10),
      g = a.height() + parseInt(b[0], 10) + parseInt(b[2], 10);
    a.addClass("is-hidden");
    let c = a.css("transform").split(","),
      d = parseFloat(c[4]),
      e = parseFloat(c[5].substring(0, c[5].length - 1));
    a.css({
      transform:
        "scale(0) translate3d(" +
        parseFloat(d).toFixed(2) +
        "px, " +
        parseFloat(e).toFixed(2) +
        "px, 0)",
      "transform-origin":
        parseFloat(d + 0.5 * f).toFixed(2) +
        "px " +
        parseFloat(e + 0.5 * g).toFixed(2) +
        "px",
      "z-index": "1",
    }),
      this.layout(),
      setTimeout(
        function () {
          a.remove();
        },
        "slow" == this.options.animSpeed ? 850 : 450,
        a
      );
  }
  destroy() {
    this.$el.removeClass("brickwall-grid"),
      this.$el.attr("style", null),
      this.$el.children().each(function () {
        jQuery(this)
          .attr("style", null)
          .removeClass("is-hidden", "brickwall-item");
      });
  }
}
