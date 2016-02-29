var Expense = require('../models/expense.js');
var pdfDocs = require('pdfkit');
var fs = require('fs');
var path = require('path');
var _ = require('lodash');

/*
 * Expense model getter
 */
module.exports.exportPdf = function (req, res) {

  Expense.all()
  .then(function (data) {

    // init
    var pdf = new pdfDocs;
    var pdfPath = path.join(__dirname, '../../download/expenses.pdf');

    // open
    writeStream = fs.createWriteStream(pdfPath);
    pdf.pipe(writeStream);

    // fill data
    pdf.image('public/images/logo.png', 320, 5)
    pdf.moveTo(0, 65)
      .lineTo(1000, 65)
      .stroke()
    pdf.fontSize(20)
      .text('Expenses Report')
      .moveDown(1);
    _.forEach(data, function(row,i) {
      var index = i + 1;
      pdf.fontSize(12)
        .text(index + '. "' + row.name + '"')
        .text(row.amount)
        .text(row.spending_date)
        .moveDown(0.5);
    });

    pdf.end();

    // close
    writeStream.on('finish', function () {
       res.sendFile(pdfPath);
    });
  })
  .catch(function (error) {
      console.log('ERROR:', error);
  });
}