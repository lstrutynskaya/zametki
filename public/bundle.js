/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/script.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/script.js":
/*!***********************!*\
  !*** ./src/script.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("let nextId = 1;\nlet Note = function(options = {}) {\n  return Object.assign({\n    id: nextId++,\n    title: 'New Note',\n    content: ''\n  }, options);\n}\n\nlet notes = [\n  Note({ title: 'Test1', content: 'content1'}), \n  Note({ title: 'Test2', content: 'content2' }), \n  Note({ title: 'Test3', content: 'content3' })\n];\n\nlet renderNotes = function(el){\n  el.empty();\n  for (let i = 0, len = notes.length; i < len; i++) {\n    el.prepend(`<li data-id=\"${notes[i].id}\">${notes[i].title}</li>`);\n  };\n}\n\n$(document).ready(() => {\n  let deleteBtnEl = $('.note-action-delete button');\n  let noteListEl = $('#note-list');\n  let noteSelectedEl;\n  \n  renderNotes(noteListEl);\n\n  $('.note-action-create button').on('click', () => {\n    \n    let newNote = Note();\n    notes.push(newNote);\n\n    renderNotes(noteListEl);\n    \n    $('#note-list li:first').trigger('click');\n    $('.note-title').val('');\n    $('.note-details').val('');\n    document.getElementById('title').autofocus;\n  });\n\n  noteListEl.on('click', 'li', function() {\n    let el = $(this);\n    \n    noteListEl.find('li').removeClass('active');\n    el.addClass('active');\n\n    deleteBtnEl.prop('disabled', false);\n    \n    noteSelectedEl = el;\n    let note = notes.find(function(note) {\n      return note.id === el.data('id');\n    });\n\n    $('.note-title').val(note.title);\n    $('.note-details').val(note.content);\n  });\n\n  $('.note-action-delete button').on('click', () => {\n\n    let itemIndex = notes.findIndex(function(note) {\n      return note.id === noteSelectedEl.data('id');\n    });\n\n    notes.splice(itemIndex, 1);\n\n    $('.note-title').val('');\n    $('.note-details').val('');\n\n    renderNotes(noteListEl);\n    \n    deleteBtnEl.prop('disabled', true);\n    $('#note-list li:first').trigger('click');\n  });\n\n  $('#note-list li:first').trigger('click');\n\n  $('.note-title').on('input', function() {\n    let el = $(this);\n  \n    let note = notes.find(function(note) {\n      return note.id === noteSelectedEl.data('id');\n    });\n    note.title = el.val();\n    noteSelectedEl.text(el.val());\n  });\n  \n  $('.note-details').on('input', function() {\n    let el = $(this);\n\n    let note = notes.find(function(note) {\n      return note.id === noteSelectedEl.data('id');\n    });\n    note.content = el.val();\n  });\n});\n\n//# sourceURL=webpack:///./src/script.js?");

/***/ })

/******/ });