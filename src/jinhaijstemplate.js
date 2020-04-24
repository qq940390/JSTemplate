class JinhaiJSTemplate {

    constructor() {
        this.template = '';
        this.datas = {};
        this.hasLoop = false;
        this.mainTemplate = '';
        this.dataName = '';
        this.keyName = '';
        this.indexName = '';
    }

    render(_tpl, _data) {
        if (typeof _data != 'object') {
            console.log('invalid data');
            return '';
        }
        let templateDom = document.getElementById(_tpl);
        if (templateDom) {
            this.template = templateDom.innerHTML;
        } else {
            this.template = _tpl;
        }
        this.datas = _data;
        this.parseTemplate();
        let dataOut = [];
        if (this.hasLoop === true && this.datas[this.dataName]) {
            //多个
            for (let i = 0; i < this.datas[this.dataName].length; i++) {
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

    parseLine(_tpl, _dataItem) {
        let matchs = false;
        let reg = new RegExp(/\{\{((\w+)\.)?(\w+)\}\}/ig);
        if (matchs = _tpl.match(reg)) {
            for (let i = 0; i < matchs.length; i++) {
                let m = false;
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

    parseTemplate() {
        if (!this.template) return false;
        let matchs = false;
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

}
