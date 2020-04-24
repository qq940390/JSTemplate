"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var JinhaiJSTemplate = /*#__PURE__*/function () {
  function JinhaiJSTemplate() {
    _classCallCheck(this, JinhaiJSTemplate);

    this.template = '';
    this.datas = {};
    this.hasLoop = false;
    this.mainTemplate = '';
    this.dataName = '';
    this.keyName = '';
    this.indexName = '';
  }

  _createClass(JinhaiJSTemplate, [{
    key: "render",
    value: function render(_tpl, _data) {
      if (_typeof(_data) != 'object') {
        console.log('invalid data');
        return '';
      }

      var templateDom = document.getElementById(_tpl);

      if (templateDom) {
        this.template = templateDom.innerHTML;
      } else {
        this.template = _tpl;
      }

      this.datas = _data;
      this.parseTemplate();
      var dataOut = [];

      if (this.hasLoop === true && this.datas[this.dataName]) {
        //多个
        for (var i = 0; i < this.datas[this.dataName].length; i++) {
          dataOut.push(this.parseLine(this.mainTemplate, this.datas[this.dataName][i]));
        }
      } else if (this.datas) {
        //单个
        dataOut.push(this.parseLine(this.mainTemplate, this.datas));
      }

      if (this.hasLoop) {
        this.template = this.template.replace(/\{\{each\s(\w+)(\sas)?\s(\w+)(\s\w+)\}\}([\s\S]+)\{\{\/each\}\}/i, dataOut.join(''));
      } else {
        this.template = dataOut.join('');
      }

      this.template = this.parseLine(this.template, this.datas);
      return this.template;
    }
  }, {
    key: "parseLine",
    value: function parseLine(_tpl, _dataItem) {
      var matchs = false;
      var reg = new RegExp(/\{\{((\w+)\.)?(\w+)\}\}/ig);

      if (matchs = _tpl.match(reg)) {
        for (var i = 0; i < matchs.length; i++) {
          var m = false;

          if (m = matchs[i].match(/(\w+)\.(\w+)/i)) {
            if (m[1] == this.keyName) _tpl = _tpl.replace('{{' + m[0] + '}}', _dataItem[m[2]]);
          } else if (m = matchs[i].match(/(\w+)/i)) {
            if (this.datas[m[0]]) {
              _tpl = _tpl.replace('{{' + m[0] + '}}', this.datas[m[0]]);
            } else {
              _tpl = _tpl.replace('{{' + m[0] + '}}', _dataItem[m[0]]);
            }
          }
        }
      }

      return _tpl;
    }
  }, {
    key: "parseTemplate",
    value: function parseTemplate() {
      if (!this.template) return false;
      var matchs = false;

      if (matchs = this.template.match(/\{\{each\s(\w+)(\sas)?\s(\w+)(\s\w+)\}\}([\s\S]+)\{\{\/each\}\}/i)) {
        this.hasLoop = true;
        this.mainTemplate = matchs[5];
        this.dataName = matchs[1];
        this.keyName = matchs[3];
        this.indexName = matchs[4];
      } else {
        this.hasLoop = false;
        this.mainTemplate = this.template;
      }
    }
  }]);

  return JinhaiJSTemplate;
}();
//# sourceMappingURL=jinhaijstemplate.js.map
