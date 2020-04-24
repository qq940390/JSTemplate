'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

window.JinhaiJSTemplate = function () {
    var createInstance = function createInstance() {
        var core = {};
        var template = '';
        var datas = {};
        var hasLoop = false;
        var mainTemplate = '';
        var dataName = '';
        var keyName = '';
        var indexName = '';

        core.render = function (_tpl, _data) {
            if ((typeof _data === 'undefined' ? 'undefined' : _typeof(_data)) != 'object') {
                console.log('invalid data');
                return '';
            }
            var templateDom = document.getElementById(_tpl);
            if (templateDom) {
                template = templateDom.innerHTML;
            } else {
                template = _tpl;
            }

            datas = _data;
            this.parseTemplate();
            var dataOut = [];
            if (hasLoop === true && datas[dataName]) {
                //多个
                for (var i = 0; i < datas[dataName].length; i++) {
                    dataOut.push(this.parseLine(mainTemplate, datas[dataName][i]));
                }
            } else if (datas) {
                //单个
                dataOut.push(this.parseLine(mainTemplate, datas));
            }
            if (hasLoop) {
                template = template.replace(/\{\{each\s(\w+)(\sas)?\s(\w+)(\s\w+)\}\}([\s\S]+)\{\{\/each\}\}/i, dataOut.join(''));
            } else {
                template = dataOut.join('');
            }
            template = this.parseLine(template, datas);
            return template;
        };

        core.parseLine = function (_tpl, _dataItem) {
            var matchs = false;
            var reg = new RegExp(/\{\{((\w+)\.)?(\w+)\}\}/ig);
            if (matchs = _tpl.match(reg)) {
                for (var i = 0; i < matchs.length; i++) {
                    var m = false;
                    if (m = matchs[i].match(/(\w+)\.(\w+)/i)) {
                        if (m[1] == keyName) _tpl = _tpl.replace('{{' + m[0] + '}}', _dataItem[m[2]]);
                    } else if (m = matchs[i].match(/(\w+)/i)) {
                        if (datas[m[0]]) {
                            _tpl = _tpl.replace('{{' + m[0] + '}}', datas[m[0]]);
                        } else {
                            _tpl = _tpl.replace('{{' + m[0] + '}}', _dataItem[m[0]]);
                        }
                    }
                }
            }
            return _tpl;
        };

        core.parseTemplate = function () {
            if (!template) return false;
            var matchs = false;
            if (matchs = template.match(/\{\{each\s(\w+)(\sas)?\s(\w+)(\s\w+)\}\}([\s\S]+)\{\{\/each\}\}/i)) {
                hasLoop = true;
                mainTemplate = matchs[5];
                dataName = matchs[1];
                keyName = matchs[3];
                indexName = matchs[4];
            } else {
                hasLoop = false;
                mainTemplate = template;
            }
        };

        return core;
    };

    return new createInstance();
};