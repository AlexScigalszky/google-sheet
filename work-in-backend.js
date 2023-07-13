const { GoogleSpreadsheet } = require("google-spreadsheet");

const credentials = require("../../google-client-secret.json");

let _book;
let _commentsSheet = null;

async function getBook() {
  const doc = new GoogleSpreadsheet("1AXqhbDXU9f-Wnbpk0KhgoRFqxQkKY4b-79w-i_gOua8");

  await doc.useServiceAccountAuth({
    client_email: credentials.client_email,
    private_key: credentials.private_key,
  });
  await doc.loadInfo();
  return doc;
}

async function getSheetAt(position) {
  _book = await getBook();
  var sheet = _book.sheetsByIndex[position];
  return sheet;
}

async function getComments() {
  _commentsSheet = await getSheetAt(1);
  return await _commentsSheet.getRows();
}

async function addComment(comment, currentWord) {
  const newRecord = {
    title: comment,
    done: false,
    language: "es",
    currentWord: JSON.parse(JSON.stringify(currentWord)),
    time: new Date(),
    onesigalkey: "",
  };
  if (_commentsSheet === null) {
    await getComments();
  }
  _commentsSheet.addRow(newRecord);
}

module.exports = {
  addComment
};
