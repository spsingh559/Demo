/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _searchComponent = __webpack_require__(1);

	var _searchComponent2 = _interopRequireDefault(_searchComponent);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var MovieListComponent = __webpack_require__(2);

	var MainComponent = React.createClass({
	  displayName: 'MainComponent',

	  getInitialState: function getInitialState() {
	    return { data: [], filterText: '' };
	  },
	  handleUserInput: function handleUserInput(filterText) {
	    $.ajax({
	      url: this.props.url + '?s=' + filterText,
	      dataType: 'json',
	      cache: false,
	      success: function (data) {
	        this.setState({ data: data, filterText: filterText });
	      }.bind(this),
	      error: function (xhr, status, err) {
	        console.error(this.props.url, status, err.toString());
	      }.bind(this)
	    });
	  },
	  render: function render() {
	    return React.createElement(
	      'div',
	      null,
	      React.createElement(_searchComponent2.default, { onUserInput: this.handleUserInput }),
	      React.createElement(MovieListComponent, { data: this.state.data })
	    );
	  }
	});

	ReactDOM.render(React.createElement(MainComponent, { url: 'http://www.omdbapi.com' }), document.getElementById("componentBody"));

/***/ },
/* 1 */
/***/ function(module, exports) {

	"use strict";

	var SearchComponent = React.createClass({
	  displayName: "SearchComponent",

	  getInitialState: function getInitialState() {
	    return { filterText: "" };
	  },
	  handleChange: function handleChange(e) {
	    this.setState({ filterText: e.target.value });
	    console.log("Text chnage" + this.state.filterText);
	  },
	  handleSubmit: function handleSubmit() {
	    this.props.onUserInput(this.state.filterText);
	  },
	  render: function render() {
	    return React.createElement(
	      "div",
	      null,
	      React.createElement("input", { type: "text",
	        placeholder: "Search your Movie here",
	        value: this.state.filterText,
	        onChange: this.handleChange
	      }),
	      React.createElement("input", { type: "submit", value: "Search", className: "btn btn-primary", onClick: this.handleSubmit })
	    );
	  }
	});

	module.exports = SearchComponent;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var MovieList = __webpack_require__(3);
	var MovieListComponent = React.createClass({
	  displayName: 'MovieListComponent',

	  render: function render() {
	    var data = this.props.data;
	    var datas = data.Search;
	    var rows = [];
	    console.log(datas);
	    if (datas != undefined) {
	      datas.forEach(function (listdata) {
	        rows.push(React.createElement(MovieList, { Title: listdata.Title,
	          Year: listdata.Year,
	          imdbID: listdata.imdbID,
	          Type: listdata.Type,
	          Poster: listdata.Poster
	        }));
	      });
	    }
	    return React.createElement(
	      'div',
	      null,
	      rows
	    );
	  }
	});
	module.exports = MovieListComponent;

/***/ },
/* 3 */
/***/ function(module, exports) {

	'use strict';

	// Movie List
	var MovieList = React.createClass({
	  displayName: 'MovieList',

	  render: function render() {
	    var style = { boxShadow: '10px 30px 10px', borderRadius: '10px', overflow: 'hidden' };
	    return React.createElement(
	      'ul',
	      { style: style },
	      React.createElement(
	        'li',
	        null,
	        React.createElement('img', { src: this.props.Poster })
	      ),
	      React.createElement(
	        'li',
	        null,
	        React.createElement(
	          'ul',
	          null,
	          React.createElement(
	            'li',
	            null,
	            'Movie Name:',
	            this.props.Title
	          ),
	          React.createElement(
	            'li',
	            null,
	            ' Year:',
	            this.props.Year
	          ),
	          React.createElement(
	            'li',
	            null,
	            ' ImdbId:',
	            this.props.imdbID
	          ),
	          React.createElement(
	            'li',
	            null,
	            ' Gener:',
	            this.props.Type
	          )
	        )
	      )
	    );
	  }
	});

	module.exports = MovieList;

/***/ }
/******/ ]);