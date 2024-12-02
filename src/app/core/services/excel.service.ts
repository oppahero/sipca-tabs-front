import { Injectable } from '@angular/core'
import * as XLSX from 'xlsx'

const EXCEL_TYPE =
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8'
const EXCEL_EXTENSION = '.xls'

@Injectable({
  providedIn: 'root'
})
export class ExcelService {
  // https://stackblitz.com/edit/angular6-export-xlsx?file=src%2Fapp%2Fservices%2Fexcel.service.ts
  // https://github.com/protobi/js-xlsx
  // https://stackoverflow.com/questions/59201494/exceljs-wraptext-in-table-columns
  // Separar xlsx-style de xlsx: https://stackoverflow.com/questions/39177183/how-to-export-json-to-csv-or-excel-angular-2
  // https://www.npmjs.com/package/xlsx-style
  // https://cdnjs.com/libraries/xlsx

  constructor() {}

  exportAsExcelFile(data: any[], excelFileName: string): void {
    if(data.length)
      import('xlsx').then(xlsx => {
        const worksheet = xlsx.utils.json_to_sheet(data)
        this.wrapAndCenterCell(worksheet['A1'])

        // let rowIndex = 1;
        // for (rowIndex; rowIndex <= worksheet.rowCount; rowIndex++) {
        //   worksheet.getRow(rowIndex).alignment = {
        //     vertical: 'middle',
        //     horizontal: 'center',
        //     wrapText: true
        //   };
        // }

        const workbook = { Sheets: { data: worksheet }, SheetNames: ['data'] }
        const excelBuffer: any = xlsx.write(workbook, {
          bookType: 'xls',
          type: 'array'
        })
        this.saveAsExcelFile(excelBuffer, excelFileName)
      })
  }

  wrapAndCenterCell(cell: XLSX.CellObject) {
    const wrapAndCenterCellStyle = { alignment: { wrapText: true } }
    this.setCellStyle(cell, wrapAndCenterCellStyle)
  }

  // object antes {}
  setCellStyle(cell: XLSX.CellObject, style: object) {
    cell.s = style
  }

  saveAsExcelFile(buffer: any, fileName: string): void {
    import('file-saver').then(FileSaver => {
      const data: Blob = new Blob([buffer], {
        type: EXCEL_TYPE
      })
      FileSaver.saveAs(
        data,
        fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION
      )
    })
  }
}
