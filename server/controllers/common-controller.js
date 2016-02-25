var Expense = require('../models/expense.js');
var pdfDocs = require('pdfkit');
var fs = require('fs');
var path = require('path');
var _ = require('lodash');


module.exports.exportPdf = function (req, res) {

  Expense.all()
  .then(function (data) {

    var pdf = new pdfDocs;
    var pdfPath = path.join(__dirname, '../../download/expenses.pdf');

    writeStream = fs.createWriteStream(pdfPath);
    pdf.pipe(writeStream);

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

    writeStream.on('finish', function () {
       res.sendFile(pdfPath);
    });
  })
  .catch(function (error) {
      console.log('ERROR:', error);
  });
}