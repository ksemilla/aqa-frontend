import { saveAs } from 'file-saver';
import moment from "moment"

const ExcelJS = require('exceljs');

export const downloadFile = quotation => {
  console.log(quotation)
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet('My Sheet');

  worksheet.pageSetup.margins = {
    top: 0.5,
    left: 0.5,
    bottom: 0.5,
    right: 0.5
  }
  worksheet.pageSetup.paperSize = 9

  // --- FORMAT WIDTHS HERE --- //

  worksheet.getColumn("A").width = 4
  worksheet.getColumn("B").width = 20
  worksheet.getColumn("C").width = 24
  worksheet.getColumn("D").width = 12
  worksheet.getColumn("E").width = 12
  worksheet.getColumn("F").width = 12
  worksheet.getColumn("G").width = 10
  worksheet.getColumn("H").width = 16
  worksheet.getColumn("I").width = 6
  worksheet.getColumn("J").width = 18

  // --- FORMAT WIDTHS HERE --- //

  worksheet.mergeCells("A1:B2")
  const cellLogo = worksheet.getCell('A1');
  cellLogo.value = "AQA"
  cellLogo.font = {
    bold: true
  }
  cellLogo.alignment = {
    vertical: "middle",
    horizontal: "center"
  }

  worksheet.mergeCells("C1:H2")
  const cellTitle = worksheet.getCell('C1');
  cellTitle.value = "QUOTATION"
  cellTitle.font = {
    bold: true
  }
  cellTitle.alignment = {
    vertical: "middle",
    horizontal: "center"
  }

  worksheet.mergeCells("I1:J2")
  const cellRef = worksheet.getCell('I1');
  cellRef.value = `#${quotation.id}`
  cellRef.font = {
    bold: true
  }
  cellRef.alignment = {
    vertical: "middle",
    horizontal: "center"
  }
  
  worksheet.getCell('A4').value = "Customer:"
  const cellCustomer = worksheet.getCell('C4')
  cellCustomer.value = `${quotation.company_name.toUpperCase()}`
  cellCustomer.font = {
    bold: true
  }

  worksheet.getCell('H4').value = "Date:"
  const cellCreatedDate = worksheet.getCell('I4')
  cellCreatedDate.value = `${moment(quotation.created_date).format("MMM DD, YYYY")}`
  cellCreatedDate.font = {
    bold: true
  }

  worksheet.getCell('A5').value = "Subject:"
  if (quotation.subject && quotation.subject !== "") {
    const cellSubject = worksheet.getCell('C5')
    cellSubject.value = `${quotation.subject}`
    cellSubject.font = {
      bold: true
    }
    const cellSubSubject = worksheet.getCell('C6')
    cellSubSubject.value = `${quotation.sub_subject}`
    cellSubSubject.font = {
      italic: true
    }
  } else {
    const cellSubject = worksheet.getCell('C5')
    cellSubject.value = `${quotation.sub_subject}`
    cellSubject.font = {
      italic: true
    }
  }

  worksheet.getCell('H5').value = "Project:"
  const cellProject = worksheet.getCell('I5')
  cellProject.value = `${quotation.project}`
  cellProject.font = {
    bold: true
  }

  worksheet.getCell('A8').value = "Dear Sir/Ma'am,"

  worksheet.getCell('A10').value = "AQA is pleased to submit this proposal of supply and delivery of airconditioning"
  worksheet.getCell('A11').value = "units for your consideration."
  
  const cellQuotationItemTitle =  worksheet.getCell('A13')
  cellQuotationItemTitle.value = "Products"
  cellQuotationItemTitle.font = {
    bold: true,
    underline: true
  }

  worksheet.getCell('A15').value = "#"
  worksheet.getCell('B15').value = "Tag"
  worksheet.getCell('C15').value = "Model"
  worksheet.mergeCells("D15:F15")
  worksheet.getCell("D15").value = "Description"
  worksheet.getCell("G15").value = "Capacity"
  worksheet.getCell("H15").value = "Price"
  worksheet.getCell("I15").value = "Qty"
  worksheet.getCell("J15").value = "Total"

  let currIdx = 16
  let currLineNumber = "A16"
  let currTag = "B16"
  let currModel = "C16"
  let currDescription = "D16"
  let currCapacity = "G16"
  let currPrice = "H16"
  let currQty = "I16"
  let currTotal = "J16"
  quotation.items.forEach(item=>{
    worksheet.getRow(currIdx).height = (15 * item.h_desc)

    worksheet.getCell(currLineNumber).value = `${item.line_number+1}`
    worksheet.getCell(currLineNumber).alignment = { vertical: "top" }
    worksheet.getCell(currTag).value = `${item.tagging}`
    worksheet.getCell(currTag).alignment = { vertical: "top" }
    worksheet.getCell(currModel).value = `${item.model_name}`
    worksheet.getCell(currModel).alignment = { vertical: "top" }

    worksheet.mergeCells(`${currDescription}:${String.fromCharCode(currDescription.charCodeAt(0) + 2)}${currDescription.substring(1, currDescription.length + 1)}`)
    worksheet.getCell(currDescription).value = `${item.description}`
    worksheet.getCell(currDescription).alignment = { wrapText: true, shrinkToFit: false, vertical: "top" }
    worksheet.getCell(currCapacity).value = `${item.capacity}`
    worksheet.getCell(currCapacity).alignment = { vertical: "top" }
    worksheet.getCell(currPrice).value = `${item.sell_price}`
    worksheet.getCell(currPrice).alignment = { vertical: "top" }
    worksheet.getCell(currQty).value = `${item.quantity}`
    worksheet.getCell(currQty).alignment = { vertical: "top" }
    worksheet.getCell(currTotal).value = `${item.quantity * item.sell_price}`
    worksheet.getCell(currTotal).alignment = { vertical: "top" }

    currLineNumber = `A${currIdx + 1}`
    currTag = `B${currIdx + 1}`
    currModel = `C${currIdx + 1}`
    currDescription = `D${currIdx + 1}`
    currCapacity = `G${currIdx + 1}`
    currPrice = `H${currIdx + 1}`
    currQty = `I${currIdx + 1}`
    currTotal = `J${currIdx + 1}`
    currIdx += 1
  })

  worksheet.getCell(`H${currIdx + 1}`).value = "TOTAL PRICE:"
  worksheet.getCell(`H${currIdx + 1}`).font = {
    bold: true
  }
  worksheet.getCell(`H${currIdx + 1}`).alignment = {
    horizontal: "right"
  }


  worksheet.getCell(`J${currIdx + 1}`).value = `${quotation.total_price}`
  worksheet.getCell(`J${currIdx + 1}`).font = {
    bold: true
  }

  worksheet.getCell(`H${currIdx + 2}`).value = "Less Discount:"
  worksheet.getCell(`H${currIdx + 2}`).font = {
    italic: true
  }
  worksheet.getCell(`H${currIdx + 2}`).alignment = {
    horizontal: "right"
  }

  worksheet.getCell(`J${currIdx + 2}`).value = `${quotation.discount_amount}`
  worksheet.getCell(`J${currIdx + 2}`).font = {
    italic: true
  }

  worksheet.getCell(`H${currIdx + 3}`).value = "NET TOTAL PRICE:"
  worksheet.getCell(`H${currIdx + 3}`).font = {
    bold: true
  }
  worksheet.getCell(`H${currIdx + 3}`).alignment = {
    horizontal: "right"
  }

  worksheet.getCell(`J${currIdx + 3}`).value = `${quotation.total_price - quotation.discount_amount}`
  worksheet.getCell(`J${currIdx + 3}`).font = {
    bold: true
  }

  let buff = workbook.xlsx.writeBuffer().then(data=>{
    let blob = new Blob([data], {type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"})
    saveAs(blob, `quotation-${quotation.id}.xlsx`);
  })
}