//google spreadsheet api from npmjs
//uses google cloud platform I created from credentials
const { GoogleSpreadsheet } = require('google-spreadsheet');

module.exports = class Sheet {
    constructor() {
        this.doc = new GoogleSpreadsheet('1OE6LBQzO7DGGRFFmWWalNpywKhw3fveJdlmiP6c19L0');
    }
    async load() {
        await this.doc.useServiceAccountAuth(require('./credentials.json'));
        await this.doc.loadInfo();
    }
    async addRows(rows) {
        const sheet = this.doc.sheetsByIndex[0];
        await sheet.addRows(rows);
    }
}