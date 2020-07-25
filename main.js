(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"],{

/***/ "./$$_lazy_route_resource lazy recursive":
/*!******************************************************!*\
  !*** ./$$_lazy_route_resource lazy namespace object ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncaught exception popping up in devtools
	return Promise.resolve().then(function() {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "./$$_lazy_route_resource lazy recursive";

/***/ }),

/***/ "./src/app/app.component.ts":
/*!**********************************!*\
  !*** ./src/app/app.component.ts ***!
  \**********************************/
/*! exports provided: AppComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppComponent", function() { return AppComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _model_Node__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../model/Node */ "./src/model/Node.ts");
/* harmony import */ var _model_Segment__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../model/Segment */ "./src/model/Segment.ts");
/* harmony import */ var _util_RenderUtil__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../util/RenderUtil */ "./src/util/RenderUtil.ts");
/* harmony import */ var _util_Library__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../util/Library */ "./src/util/Library.ts");
/* harmony import */ var _util_OldStateChecker__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../util/OldStateChecker */ "./src/util/OldStateChecker.ts");
/* harmony import */ var _model_Point__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../model/Point */ "./src/model/Point.ts");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/__ivy_ngcc__/fesm2015/platform-browser.js");









class AppComponent {
    constructor(titleService) {
        titleService.setTitle('Blue Circle');
    }
    ngOnInit() {
        const m = Math.min(window.innerWidth, window.innerHeight) - 4;
        const r = (m - 52.0) / 2.0; // radius
        const center = new _model_Point__WEBPACK_IMPORTED_MODULE_6__["Point"](m / 2, m / 2);
        const nodes = [];
        const segments = [];
        const N = 17; // how many dots to draw
        const oldState = new _util_OldStateChecker__WEBPACK_IMPORTED_MODULE_5__["OldStateChecker"]();
        let currentHover;
        for (let i = 0; i < N; i++) {
            const phi = 2 * i * Math.PI * (1.0 / N);
            const x = center.x + r * Math.cos(phi);
            const y = center.y - r * Math.sin(phi);
            nodes.push(new _model_Node__WEBPACK_IMPORTED_MODULE_1__["Node"](i + 1, x, y));
        }
        const canvas = document.getElementById('canvas');
        const renderUtil = new _util_RenderUtil__WEBPACK_IMPORTED_MODULE_3__["RenderUtil"](nodes, canvas);
        canvas.width = m;
        canvas.height = m;
        renderUtil.renderHover(undefined);
        function onMouseMove(e) {
            const hover = findHover(e, findActive());
            if (hover === currentHover) {
                return;
            }
            currentHover = hover;
            renderUtil.renderHover(currentHover);
        }
        canvas.onmousemove = onMouseMove;
        canvas.onmouseout = function () {
            currentHover = undefined;
            renderUtil.renderHover(currentHover);
        };
        function findActive() {
            for (let r of nodes) {
                if (r.active() !== 0) {
                    return r;
                }
            }
            return undefined;
        }
        function findHover(e, active) {
            // important: correct mouse position:
            const rect = canvas.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            if (active === undefined) {
                if (center.dist(x, y) < _util_Library__WEBPACK_IMPORTED_MODULE_4__["Library"].R + 6) {
                    return undefined;
                }
                return findHoverByAngle(x, y, center);
            }
            if (active.dist(x, y) < _util_Library__WEBPACK_IMPORTED_MODULE_4__["Library"].R + 6) {
                return active;
            }
            return findHoverByAngle(x, y, active.p());
        }
        function findHoverByAngle(x, y, active) {
            const angle = active.angle(x, y);
            let bestP = undefined;
            let bestD = 100;
            for (let node of nodes) {
                if (active === node.p()) {
                    continue;
                }
                const d = Math.abs(angle - active.angle(node.x(), node.y()));
                if (d < bestD) {
                    bestD = d;
                    bestP = node;
                }
            }
            return bestP;
        }
        function findSegment(a, b) {
            for (let i = 0; i < segments.length; i++) {
                let segment = segments[i];
                if ((segment.a === a && segment.b === b) || (segment.a === b && segment.b === a)) {
                    return i;
                }
            }
            return undefined;
        }
        canvas.onmouseup = function (e) {
            const active = findActive();
            const hover = findHover(e, active);
            if (!hover) {
                for (let point of nodes) {
                    point.forceDeactivate();
                }
                currentHover = undefined;
                renderUtil.renderHover(currentHover);
                return;
            }
            if (active === hover || !active) {
                hover.incActive();
                currentHover = hover;
                renderUtil.renderHover(currentHover);
                return;
            }
            const i = findSegment(active, hover);
            if (i !== undefined) {
                oldState.push(segments[i]);
                segments.splice(i, 1);
            }
            else {
                const t = new _model_Segment__WEBPACK_IMPORTED_MODULE_2__["Segment"](active, hover);
                if (oldState.isRepetition(t)) {
                    t.flip();
                    oldState.clear();
                }
                segments.push(t);
                oldState.push(t);
            }
            segments.sort((s, t) => {
                const da = s.a.i - t.a.i;
                if (da !== 0) {
                    return da;
                }
                return s.b.i - t.b.i;
            });
            active.maybeDeactivate();
            renderUtil.render(segments);
            onMouseMove(e);
        };
    }
}
AppComponent.ɵfac = function AppComponent_Factory(t) { return new (t || AppComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_platform_browser__WEBPACK_IMPORTED_MODULE_7__["Title"])); };
AppComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: AppComponent, selectors: [["app-root"]], decls: 5, vars: 0, consts: [[1, "container"], ["id", "controls"], ["id", "segments"], ["id", "canvas"]], template: function AppComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](2, "table", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "canvas", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](4, "Canvas not supported");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } }, styles: ["#controls[_ngcontent-%COMP%] {\n  margin: 20px 20px;\n  width: 200px;\n  float: left;\n}\n\n#controls[_ngcontent-%COMP%]   table[_ngcontent-%COMP%] {\n  color: #faebd7;\n}\n\n#canvas[_ngcontent-%COMP%] {\n  float: left;\n}\n\n.container[_ngcontent-%COMP%] {\n  height: 100%;\n  background-image: url('cloudy.jpg');\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvYXBwLmNvbXBvbmVudC5jc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSxpQkFBaUI7RUFDakIsWUFBWTtFQUNaLFdBQVc7QUFDYjs7QUFFQTtFQUNFLGNBQWM7QUFDaEI7O0FBRUE7RUFDRSxXQUFXO0FBQ2I7O0FBRUE7RUFDRSxZQUFZO0VBQ1osbUNBQWtEO0FBQ3BEIiwiZmlsZSI6InNyYy9hcHAvYXBwLmNvbXBvbmVudC5jc3MiLCJzb3VyY2VzQ29udGVudCI6WyIjY29udHJvbHMge1xuICBtYXJnaW46IDIwcHggMjBweDtcbiAgd2lkdGg6IDIwMHB4O1xuICBmbG9hdDogbGVmdDtcbn1cblxuI2NvbnRyb2xzIHRhYmxlIHtcbiAgY29sb3I6ICNmYWViZDc7XG59XG5cbiNjYW52YXMge1xuICBmbG9hdDogbGVmdDtcbn1cblxuLmNvbnRhaW5lciB7XG4gIGhlaWdodDogMTAwJTtcbiAgYmFja2dyb3VuZC1pbWFnZTogdXJsKHNyYy9hc3NldHMvaW1hZ2UvY2xvdWR5LmpwZyk7XG59XG4iXX0= */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](AppComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'app-root',
                templateUrl: './app.component.html',
                styleUrls: ['./app.component.css']
            }]
    }], function () { return [{ type: _angular_platform_browser__WEBPACK_IMPORTED_MODULE_7__["Title"] }]; }, null); })();


/***/ }),

/***/ "./src/app/app.module.ts":
/*!*******************************!*\
  !*** ./src/app/app.module.ts ***!
  \*******************************/
/*! exports provided: AppModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppModule", function() { return AppModule; });
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/__ivy_ngcc__/fesm2015/platform-browser.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app.component */ "./src/app/app.component.ts");




class AppModule {
}
AppModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineNgModule"]({ type: AppModule, bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_2__["AppComponent"]] });
AppModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjector"]({ factory: function AppModule_Factory(t) { return new (t || AppModule)(); }, providers: [], imports: [[
            _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"]
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵsetNgModuleScope"](AppModule, { declarations: [_app_component__WEBPACK_IMPORTED_MODULE_2__["AppComponent"]], imports: [_angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"]] }); })();
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵsetClassMetadata"](AppModule, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"],
        args: [{
                declarations: [
                    _app_component__WEBPACK_IMPORTED_MODULE_2__["AppComponent"]
                ],
                imports: [
                    _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"]
                ],
                providers: [],
                bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_2__["AppComponent"]]
            }]
    }], null, null); })();


/***/ }),

/***/ "./src/environments/environment.ts":
/*!*****************************************!*\
  !*** ./src/environments/environment.ts ***!
  \*****************************************/
/*! exports provided: environment */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "environment", function() { return environment; });
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
const environment = {
    production: false
};
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.


/***/ }),

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./environments/environment */ "./src/environments/environment.ts");
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app/app.module */ "./src/app/app.module.ts");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/__ivy_ngcc__/fesm2015/platform-browser.js");




if (_environments_environment__WEBPACK_IMPORTED_MODULE_1__["environment"].production) {
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["enableProdMode"])();
}
_angular_platform_browser__WEBPACK_IMPORTED_MODULE_3__["platformBrowser"]().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_2__["AppModule"])
    .catch(err => console.error(err));


/***/ }),

/***/ "./src/model/Node.ts":
/*!***************************!*\
  !*** ./src/model/Node.ts ***!
  \***************************/
/*! exports provided: Node */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Node", function() { return Node; });
/* harmony import */ var _Point__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Point */ "./src/model/Point.ts");
var __classPrivateFieldSet = (undefined && undefined.__classPrivateFieldSet) || function (receiver, privateMap, value) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to set private field on non-instance");
    }
    privateMap.set(receiver, value);
    return value;
};
var __classPrivateFieldGet = (undefined && undefined.__classPrivateFieldGet) || function (receiver, privateMap) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to get private field on non-instance");
    }
    return privateMap.get(receiver);
};
var _p, _active;

class Node {
    constructor(i, x, y) {
        _p.set(this, void 0);
        _active.set(this, 0);
        this.i = i;
        __classPrivateFieldSet(this, _p, new _Point__WEBPACK_IMPORTED_MODULE_0__["Point"](x, y));
    }
    active() {
        return __classPrivateFieldGet(this, _active);
    }
    incActive() {
        __classPrivateFieldSet(this, _active, __classPrivateFieldGet(this, _active) + 1);
        __classPrivateFieldSet(this, _active, __classPrivateFieldGet(this, _active) % 3);
    }
    maybeDeactivate() {
        if (__classPrivateFieldGet(this, _active) === 1) {
            __classPrivateFieldSet(this, _active, 0);
        }
    }
    forceDeactivate() {
        __classPrivateFieldSet(this, _active, 0);
    }
    dist(x, y) {
        return __classPrivateFieldGet(this, _p).dist(x, y);
    }
    angle(x, y) {
        return __classPrivateFieldGet(this, _p).angle(x, y);
        ;
    }
    x() {
        return __classPrivateFieldGet(this, _p).x;
    }
    y() {
        return __classPrivateFieldGet(this, _p).y;
    }
    p() {
        return __classPrivateFieldGet(this, _p);
    }
}
_p = new WeakMap(), _active = new WeakMap();


/***/ }),

/***/ "./src/model/Point.ts":
/*!****************************!*\
  !*** ./src/model/Point.ts ***!
  \****************************/
/*! exports provided: Point */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Point", function() { return Point; });
class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    dist(x, y) {
        return Math.sqrt((x - this.x) * (x - this.x) + (y - this.y) * (y - this.y));
    }
    angle(x, y) {
        return Math.atan2(this.y - y, this.x - x);
    }
}


/***/ }),

/***/ "./src/model/Segment.ts":
/*!******************************!*\
  !*** ./src/model/Segment.ts ***!
  \******************************/
/*! exports provided: Segment */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Segment", function() { return Segment; });
class Segment {
    constructor(a, b) {
        if (a.i > b.i) {
            this.a = b;
            this.b = a;
        }
        else {
            this.a = a;
            this.b = b;
        }
    }
    flip() {
        const active = this.a.active() === 2 ? this.a : this.b;
        if (active.active() !== 2) {
            return;
        }
        const inactive = active === this.a ? this.b : this.a;
        active.forceDeactivate();
        inactive.incActive();
        inactive.incActive();
    }
    equals(s) {
        if (!s) {
            return false;
        }
        return s.a === this.a && s.b === this.b;
    }
}


/***/ }),

/***/ "./src/util/Library.ts":
/*!*****************************!*\
  !*** ./src/util/Library.ts ***!
  \*****************************/
/*! exports provided: Library */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Library", function() { return Library; });
class Library {
}
Library.R = 20; // node radius


/***/ }),

/***/ "./src/util/OldStateChecker.ts":
/*!*************************************!*\
  !*** ./src/util/OldStateChecker.ts ***!
  \*************************************/
/*! exports provided: OldStateChecker */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "OldStateChecker", function() { return OldStateChecker; });
class OldStateChecker {
    push(t) {
        this.veryOld = this.old;
        this.old = t;
    }
    isRepetition(t) {
        return t.equals(this.old) && this.old.equals(this.veryOld);
    }
    clear() {
        this.old = undefined;
        this.veryOld = undefined;
    }
}


/***/ }),

/***/ "./src/util/RenderUtil.ts":
/*!********************************!*\
  !*** ./src/util/RenderUtil.ts ***!
  \********************************/
/*! exports provided: RenderUtil */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RenderUtil", function() { return RenderUtil; });
/* harmony import */ var _Library__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Library */ "./src/util/Library.ts");

const color_inactive = "#000000";
const color_active2 = "yellow";
const color_active = "red";
const color_hover = "blue";
const tau = 2 * Math.PI;
class RenderUtil {
    constructor(points, canvas) {
        this.points = points;
        this.canvas = canvas;
    }
    render(segments) {
        const ctx = this.canvas.getContext("2d");
        const s = document.getElementById("segments");
        ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        s.innerHTML = "";
        for (let segment of segments) {
            ctx.beginPath();
            ctx.strokeStyle = '#faebd7';
            ctx.lineWidth = 1.5;
            ctx.moveTo(segment.a.x(), segment.a.y());
            ctx.lineTo(segment.b.x(), segment.b.y());
            ctx.stroke();
            const div = document.createElement("tr");
            div.innerHTML = "<td>" + segment.a.i + "</td><td>" + segment.b.i + "</td>";
            s.appendChild(div);
        }
        this.renderHover(undefined);
    }
    renderHover(hover) {
        const ctx = this.canvas.getContext("2d");
        for (let r of this.points) {
            ctx.beginPath();
            ctx.arc(r.x(), r.y(), _Library__WEBPACK_IMPORTED_MODULE_0__["Library"].R, 0, tau);
            ctx.fillStyle = r.active() === 2 ? color_active2 : r.active() === 1 ? color_active : r === hover ? color_hover : color_inactive;
            ctx.fill();
            ctx.font = "12px Arial";
            ctx.fillStyle = r.active() === 2 ? "#000000" : "#ffffff";
            let number = r.i < 10 ? 4 : 7;
            ctx.fillText("" + r.i, r.x() - number, r.y() + 5);
        }
    }
}


/***/ }),

/***/ 0:
/*!***************************!*\
  !*** multi ./src/main.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /home/vgm/workspace/blue-circle/src/main.ts */"./src/main.ts");


/***/ })

},[[0,"runtime","vendor"]]]);
//# sourceMappingURL=main.js.map