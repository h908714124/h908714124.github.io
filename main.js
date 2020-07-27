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
/* harmony import */ var _util_State__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../util/State */ "./src/util/State.ts");
/* harmony import */ var _model_Graph__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../model/Graph */ "./src/model/Graph.ts");










class AppComponent {
    ngOnInit() {
        const m = Math.min(window.innerWidth, window.innerHeight) - 4;
        const r = (m - 52.0) / 2.0; // radius
        const center = new _model_Point__WEBPACK_IMPORTED_MODULE_6__["Point"](m / 2, m / 2);
        const nodes = [];
        const N = 17; // how many dots to draw
        const graph = new _model_Graph__WEBPACK_IMPORTED_MODULE_8__["Graph"](N);
        const oldState = new _util_OldStateChecker__WEBPACK_IMPORTED_MODULE_5__["OldStateChecker"]();
        let currentHover;
        for (let i = 0; i < N; i++) {
            const phi = 2 * i * Math.PI * (1.0 / N);
            const x = center.x + r * Math.cos(phi);
            const y = center.y - r * Math.sin(phi);
            nodes.push(new _model_Node__WEBPACK_IMPORTED_MODULE_1__["Node"](i, x, y));
        }
        const state = new _util_State__WEBPACK_IMPORTED_MODULE_7__["State"](nodes);
        const canvas = document.getElementById('canvas');
        const actionButton = document.getElementById('action-button');
        actionButton.onclick = function () {
            state.deleteMode = !state.deleteMode;
            actionButton.textContent = state.deleteMode ? 'Now deleting edges' : 'Now creating edges';
            actionButton.setAttribute('class', state.deleteMode ? 'deleteState' : 'createState');
        };
        canvas.width = m;
        canvas.height = m;
        const ctx = canvas.getContext('2d');
        for (let r of nodes) {
            _util_Library__WEBPACK_IMPORTED_MODULE_4__["Library"].renderNode(r, 0, false, ctx);
        }
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const renderUtil = new _util_RenderUtil__WEBPACK_IMPORTED_MODULE_3__["RenderUtil"](nodes, canvas, imageData, state, graph);
        function onMouseMove(e) {
            const hover = findHover(e, state.activeNode());
            if (hover === currentHover) {
                return;
            }
            currentHover = hover;
            renderUtil.render(graph, currentHover);
        }
        canvas.onmousemove = onMouseMove;
        canvas.onmouseout = function () {
            currentHover = undefined;
            renderUtil.render(graph, currentHover);
        };
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
            return findHoverByAngle(x, y, active.point());
        }
        function findHoverByAngle(x, y, active) {
            const angle = active.angle(x, y);
            let bestP = undefined;
            let bestD = 100;
            for (let node of nodes) {
                if (active === node.point()) {
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
        canvas.onmouseup = function (e) {
            const active = state.activeNode();
            const hover = findHover(e, active);
            if (!hover) {
                state.setActiveNode(undefined);
                currentHover = undefined;
                renderUtil.render(graph, currentHover);
                return;
            }
            if (active === hover || !active) {
                state.incActive();
                state.setActiveNode(hover);
                if (state.activeLevel() !== 0) {
                    const rect = canvas.getBoundingClientRect();
                    const x = e.clientX - rect.left;
                    const y = e.clientY - rect.top;
                    currentHover = findHoverByAngle(x, y, hover.point());
                    renderUtil.render(graph, currentHover);
                }
                currentHover = undefined;
                onMouseMove(e);
                return;
            }
            const segmentExists = graph.hasSegment(active.i, hover.i);
            if (state.deleteMode) {
                if (segmentExists) {
                    oldState.push(new _model_Segment__WEBPACK_IMPORTED_MODULE_2__["Segment"](active, hover));
                    graph.removeSegment(active.i, hover.i);
                    state.maybeDeactivate();
                }
            }
            else {
                if (!segmentExists) {
                    const t = new _model_Segment__WEBPACK_IMPORTED_MODULE_2__["Segment"](active, hover);
                    if (oldState.isRepetition(t)) {
                        state.flipYellow(t);
                        oldState.clear();
                    }
                    else {
                        state.simpleFlip(t);
                        oldState.push(t);
                    }
                    graph.addSegment(active.i, hover.i);
                }
            }
            currentHover = undefined;
            onMouseMove(e);
        };
    }
}
AppComponent.ɵfac = function AppComponent_Factory(t) { return new (t || AppComponent)(); };
AppComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: AppComponent, selectors: [["app-root"]], decls: 8, vars: 0, consts: [[1, "container"], ["id", "controls"], ["id", "segments"], ["id", "canvas"], ["id", "buttons"], ["id", "action-button", "href", "#", 1, "createState"]], template: function AppComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](2, "table", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "canvas", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](4, "Canvas not supported");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](6, "a", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](7, "Now creating edges");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } }, styles: ["#controls[_ngcontent-%COMP%] {\n  margin: 20px 20px;\n  width: 200px;\n  float: left;\n}\n\n#controls[_ngcontent-%COMP%]   table[_ngcontent-%COMP%] {\n  color: #faebd7;\n}\n\n#canvas[_ngcontent-%COMP%] {\n  float: left;\n}\n\n#buttons[_ngcontent-%COMP%] {\n  float: left;\n}\n\na.deleteState[_ngcontent-%COMP%]:link {\n  color: #fa2f38;\n}\n\na.deleteState[_ngcontent-%COMP%]:visited {\n  color: #fa2f38;\n}\n\na.deleteState[_ngcontent-%COMP%]:hover {\n  color: #fc5058;\n}\n\na.deleteState[_ngcontent-%COMP%]:active {\n  color: #fa2f38;\n}\n\na.createState[_ngcontent-%COMP%]:link {\n  color: #fdfd54;\n}\n\na.createState[_ngcontent-%COMP%]:visited {\n  color: #fdfd54;\n}\n\na.createState[_ngcontent-%COMP%]:hover {\n  color: #fafaba;\n}\n\na.createState[_ngcontent-%COMP%]:active {\n  color: #fdfd54;\n}\n\n.container[_ngcontent-%COMP%] {\n  height: 100%;\n  background-image: url('cloudy.jpg');\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvYXBwLmNvbXBvbmVudC5jc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSxpQkFBaUI7RUFDakIsWUFBWTtFQUNaLFdBQVc7QUFDYjs7QUFFQTtFQUNFLGNBQWM7QUFDaEI7O0FBRUE7RUFDRSxXQUFXO0FBQ2I7O0FBRUE7RUFDRSxXQUFXO0FBQ2I7O0FBRUE7RUFDRSxjQUFjO0FBQ2hCOztBQUVBO0VBQ0UsY0FBYztBQUNoQjs7QUFFQTtFQUNFLGNBQWM7QUFDaEI7O0FBRUE7RUFDRSxjQUFjO0FBQ2hCOztBQUVBO0VBQ0UsY0FBYztBQUNoQjs7QUFFQTtFQUNFLGNBQWM7QUFDaEI7O0FBRUE7RUFDRSxjQUFjO0FBQ2hCOztBQUVBO0VBQ0UsY0FBYztBQUNoQjs7QUFFQTtFQUNFLFlBQVk7RUFDWixtQ0FBa0Q7QUFDcEQiLCJmaWxlIjoic3JjL2FwcC9hcHAuY29tcG9uZW50LmNzcyIsInNvdXJjZXNDb250ZW50IjpbIiNjb250cm9scyB7XG4gIG1hcmdpbjogMjBweCAyMHB4O1xuICB3aWR0aDogMjAwcHg7XG4gIGZsb2F0OiBsZWZ0O1xufVxuXG4jY29udHJvbHMgdGFibGUge1xuICBjb2xvcjogI2ZhZWJkNztcbn1cblxuI2NhbnZhcyB7XG4gIGZsb2F0OiBsZWZ0O1xufVxuXG4jYnV0dG9ucyB7XG4gIGZsb2F0OiBsZWZ0O1xufVxuXG5hLmRlbGV0ZVN0YXRlOmxpbmsge1xuICBjb2xvcjogI2ZhMmYzODtcbn1cblxuYS5kZWxldGVTdGF0ZTp2aXNpdGVkIHtcbiAgY29sb3I6ICNmYTJmMzg7XG59XG5cbmEuZGVsZXRlU3RhdGU6aG92ZXIge1xuICBjb2xvcjogI2ZjNTA1ODtcbn1cblxuYS5kZWxldGVTdGF0ZTphY3RpdmUge1xuICBjb2xvcjogI2ZhMmYzODtcbn1cblxuYS5jcmVhdGVTdGF0ZTpsaW5rIHtcbiAgY29sb3I6ICNmZGZkNTQ7XG59XG5cbmEuY3JlYXRlU3RhdGU6dmlzaXRlZCB7XG4gIGNvbG9yOiAjZmRmZDU0O1xufVxuXG5hLmNyZWF0ZVN0YXRlOmhvdmVyIHtcbiAgY29sb3I6ICNmYWZhYmE7XG59XG5cbmEuY3JlYXRlU3RhdGU6YWN0aXZlIHtcbiAgY29sb3I6ICNmZGZkNTQ7XG59XG5cbi5jb250YWluZXIge1xuICBoZWlnaHQ6IDEwMCU7XG4gIGJhY2tncm91bmQtaW1hZ2U6IHVybChzcmMvYXNzZXRzL2ltYWdlL2Nsb3VkeS5qcGcpO1xufVxuIl19 */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](AppComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'app-root',
                templateUrl: './app.component.html',
                styleUrls: ['./app.component.css']
            }]
    }], null, null); })();


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

/***/ "./src/model/Graph.ts":
/*!****************************!*\
  !*** ./src/model/Graph.ts ***!
  \****************************/
/*! exports provided: Graph */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Graph", function() { return Graph; });
class Graph {
    constructor(N) {
        this.segments = [];
        for (let i = 0; i < N; i++) {
            let items = [];
            for (let j = 0; j < N - 1; j++) {
                items.push(0);
            }
            this.segments.push(items);
        }
    }
    addSegment(i, j) {
        this.set(i, j, 1);
    }
    removeSegment(i, j) {
        this.set(i, j, 0);
    }
    forEach(f) {
        for (let i = 0; i < this.segments.length; i++) {
            const items = this.segments[i];
            for (let j = 0; j < items.length; j++) {
                const item = items[j];
                if (item !== 0) {
                    f.call(undefined, i, j);
                }
            }
        }
    }
    hasSegment(i, j) {
        if (i === j) {
            return false;
        }
        if (i < j) {
            return this.segments[j][i] !== 0;
        }
        return this.segments[i][j] !== 0;
    }
    set(i, j, data) {
        if (i === j) {
            return;
        }
        if (i < j) {
            this.segments[j][i] = data;
        }
        else {
            this.segments[i][j] = data;
        }
    }
}


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
var _p;

class Node {
    constructor(i, x, y) {
        _p.set(this, void 0);
        this.i = i;
        __classPrivateFieldSet(this, _p, new _Point__WEBPACK_IMPORTED_MODULE_0__["Point"](x, y));
    }
    dist(x, y) {
        return __classPrivateFieldGet(this, _p).dist(x, y);
    }
    x() {
        return __classPrivateFieldGet(this, _p).x;
    }
    y() {
        return __classPrivateFieldGet(this, _p).y;
    }
    point() {
        return __classPrivateFieldGet(this, _p);
    }
}
_p = new WeakMap();


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
    static renderNode(r, active, hover, ctx) {
        ctx.beginPath();
        ctx.arc(r.x(), r.y(), Library.R, 0, Library.tau);
        ctx.fillStyle = active === 2 ? Library.color_active2 : active === 1 ? Library.color_active : hover ? Library.color_hover : Library.color_inactive;
        ctx.fill();
        ctx.font = "12px Arial";
        ctx.fillStyle = active === 2 ? "#000000" : "#ffffff";
        let number = r.i < 10 ? 4 : 7;
        ctx.fillText("" + r.i, r.x() - number, r.y() + 5);
    }
}
Library.tau = 2 * Math.PI;
Library.color_inactive = "#000000";
Library.color_active2 = "yellow";
Library.color_active = "red";
Library.color_hover = "blue";
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

class RenderUtil {
    constructor(points, canvas, imageData, state, graph) {
        this.nodes = points;
        this.canvas = canvas;
        this.imageData = imageData;
        this.state = state;
        this.graph = graph;
    }
    render(segments, hover) {
        const ctx = this.canvas.getContext('2d');
        const s = document.getElementById('segments');
        ctx.putImageData(this.imageData, 0, 0);
        s.innerHTML = "";
        segments.forEach(((x, y) => {
            ctx.beginPath();
            ctx.strokeStyle = '#faebd7';
            ctx.lineWidth = 1.5;
            let a = this.nodes[x];
            let b = this.nodes[y];
            const x0 = a.x();
            const y0 = a.y();
            const x1 = b.x();
            const y1 = b.y();
            ctx.moveTo(x0, y0);
            ctx.lineTo(x1, y1);
            ctx.stroke();
            const div = document.createElement("tr");
            div.innerHTML = "<td>" + a.i + "</td><td>" + b.i + "</td>";
            s.appendChild(div);
        }));
        this.renderHover(hover);
    }
    renderHover(hover) {
        const ctx = this.canvas.getContext('2d');
        const active = this.state.activeNode();
        if (active !== undefined) {
            _Library__WEBPACK_IMPORTED_MODULE_0__["Library"].renderNode(active, this.state.activeLevel(), false, ctx);
        }
        _Library__WEBPACK_IMPORTED_MODULE_0__["Library"].renderNode(hover, active === hover ? this.state.activeLevel() : 0, true, ctx);
        if (active === undefined) {
            return;
        }
        if (active !== hover) {
            if (!this.state.deleteMode && !this.graph.hasSegment(active.i, hover.i) ||
                this.state.deleteMode && this.graph.hasSegment(active.i, hover.i)) {
                ctx.strokeStyle = this.state.deleteMode ? '#fa2f38' : "#fdfd54";
                ctx.lineWidth = 1.5;
                const x0 = active.x();
                const y0 = active.y();
                const x1 = hover.x();
                const y1 = hover.y();
                ctx.moveTo(x0, y0);
                ctx.lineTo(x1, y1);
                ctx.stroke();
            }
        }
    }
}


/***/ }),

/***/ "./src/util/State.ts":
/*!***************************!*\
  !*** ./src/util/State.ts ***!
  \***************************/
/*! exports provided: State */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "State", function() { return State; });
class State {
    constructor(nodes) {
        this.deleteMode = false;
        this._activeLevel = 0;
        this.nodes = nodes;
    }
    activeLevel() {
        return this._activeLevel;
    }
    setActiveNode(activeNode) {
        if (activeNode === undefined) {
            this._activeNode = undefined;
            this._activeLevel = 0;
        }
        if (this._activeLevel === 0) {
            this._activeNode = undefined;
            return;
        }
        this._activeNode = activeNode.i;
    }
    activeNode() {
        if (this._activeNode === undefined) {
            return undefined;
        }
        return this.nodes[this._activeNode];
    }
    findLevel(node) {
        if (this._activeNode !== node.i) {
            return 0;
        }
        return this._activeLevel;
    }
    flipYellow(s) {
        const active = this.findLevel(s.a) !== 0 ? s.a : s.b;
        const inactive = active === s.a ? s.b : s.a;
        let level = this.findLevel(active);
        if (level === 0) {
            return;
        }
        if (level === 2) {
            this._activeNode = inactive.i;
            return;
        }
        this._activeLevel = 2;
    }
    simpleFlip(s) {
        const active = this.findLevel(s.a) !== 0 ? s.a : s.b;
        if (this.findLevel(active) !== 1) {
            return;
        }
        const inactive = active === s.a ? s.b : s.a;
        this._activeNode = inactive.i;
    }
    incActive() {
        this._activeLevel += 1;
        this._activeLevel = this._activeLevel % 3;
        if (this._activeLevel === 0) {
            this._activeNode = undefined;
        }
    }
    maybeDeactivate() {
        if (this._activeLevel === 1) {
            this._activeLevel = 0;
            this._activeNode = undefined;
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

module.exports = __webpack_require__("./src/main.ts");


/***/ })

},[[0,"runtime","vendor"]]]);
//# sourceMappingURL=main.js.map
