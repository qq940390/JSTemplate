window.JinhaiJSTemplate = function () {
    const createInstance = function () {
        let core = {};
        let template = '';
        let datas = {};
        let hasLoop = false;
        let mainTemplate = '';
        let dataName = '';
        let keyName = '';
        let indexName = '';

        core.render = function (_tpl, _data) {
            if (typeof _data != 'object') {
                console.log('invalid data');
                return '';
            }
            let templateDom = document.getElementById(_tpl);
            if (templateDom) {
                template = templateDom.innerHTML;
            } else {
                template = _tpl;
            }

            datas = _data;
            this.parseTemplate();
            let dataOut = [];
            if (hasLoop === true && datas[dataName]) {
                //多个
                for (let i = 0; i < datas[dataName].length; i++) {
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
        }

        core.parseLine = function (_tpl, _dataItem) {
            let matchs = false;
            let reg = new RegExp(/\{\{((\w+)\.)?(\w+)\}\}/ig);
            if (matchs = _tpl.match(reg)) {
                for (let i = 0; i < matchs.length; i++) {
                    let m = false;
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
        }

        core.parseTemplate = function () {
            if (!template) return false;
            let matchs = false;
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
        }

        return core;
    }

    return new createInstance();
}
