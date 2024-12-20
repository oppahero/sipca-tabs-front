import { Injectable } from '@angular/core'
import { DatePipe } from '@angular/common'
import * as moment from 'moment'

@Injectable({
  providedIn: 'root',
})
export class GlobalService {
  urlPhoto: string
  urlAssets: string

  MESSAGE_CODES = {
    FE: 'FE',
    WA: 'WA',
  }

  constructor(private _datePipe: DatePipe) {
    this.urlAssets = 'assets/dist/img/user.png'
    this.urlPhoto = 'http://sirappnp/FOTCONT/'
  }

  validate(param: any): any {
    return param === undefined ? '' : param
  }

  transformDate(date) {
    return this._datePipe.transform(this.formatDate(date), 'dd/MM/yyyy')
  }

  formatDate(date: any): any {
    const pattern = /(\d{4})(\d{2})(\d{2})/
    const replace = date.replace(pattern, '$1-$2-$3')
    const format = this._datePipe.transform(replace, 'dd/MM/yyyy')

    const dateString = format.toString()
    const dateMomentObject = moment(dateString, 'DD/MM/YYYY')
    const dateObject = dateMomentObject.toDate()
    return dateObject
  }

  /**
   *
   * @param array: array que queremos copiar
   * @returns Nuevo array
   */

  cloneArray(array) {
    return array.map((element) => {
      if (typeof element === 'object')
        return JSON.parse(JSON.stringify(element))
      else return element
    })
  }

  validateDate(param) {
    return param ? this.formatDate(param) : ''
  }

  removeDuplicatesFromArrayByKey(array, key) {
    return [...new Map(array.map((item) => [item[key], item])).values()]
  }

  isKeyExists(obj, key) {
    return obj[key] == undefined ? false : true
  }

  filterTableByFieldToRemoveEmptyRows(
    results,
    key: string,
    field: string
  ): any {
    return results[key].filter((x) => x[field] != '')
  }

  filter(results, table, field) {
    return this.filterTableByFieldToRemoveEmptyRows(results, table, field)
  }

  /**
   *
   * @param dni : CI de trabajador
   * @returns : Dirección para recuperar el recurso (foto del trabajador)
   */

  getUrlPhoto(dni: any): string {
    return this.urlPhoto + dni + '.jpg'
  }

  /**
   *
   * @param value : Valor numérico. Example 102
   * @param long : Longitud que debe tener value. Example 5
   * @returns : Valor numérico de la longitud recibida. Los espacios son rellenados con cero, al final de value.
   *            Example 10200
   */

  padEnd(value, long) {
    return value.padEnd(long, '0')
  }

  /**
   *
   * @param value : Valor numérico. Example 102
   * @param long : Longitud que debe tener value. Example 5
   * @returns : Valor numérico de la longitud recibida. Los espacios son rellenados con cero, al inicio de value.
   *            Example 00102
   */

  padStart(value, long) {
    return value.padStart(long, '0')
  }

  /**
   *
   * @param number
   * @param long : Longitud que debe tener el número
   * @returns : Número formateado con ceros al inicio para cumplir con la longitud recibida.
   */

  fillWithCeros(number, long) {
    if (number) return this.padStart(number, long)

    return number
  }

  /**
   *
   * @param number : Número sin formato, con ceros a la derecha y la izq. Example 00040400
   * @param longEntera : Long de la parte entera. Example 3
   * @param longDecimal : Long de la parte decimal. Example 5
   * @returns : Número formateado, Example: 000.40400
   */

  formatStringToDecimal(number, longEntera, longDecimal) {
    let entero = ''
    let decimal = ''
    let x

    entero = number.substr(0, longEntera)
    x = entero.split('.')
    decimal = number.substr(longEntera, longDecimal)
    const numDecimal = x.concat(decimal)
    x = numDecimal[0] + '.' + numDecimal[1]

    return parseFloat(x)
  }

  formatWithDecimal(number, long) {
    const aux = number.split('.')[1]

    if (aux) return this.padEnd(aux, long)

    return this.padEnd('', long)
  }

  /**
   *
   * @param number : Número sin formato, con ceros a la derecha y la izq. Example 00000025000
   * @param long1 : Long de la parte entera. Example 8
   * @param long2 : Long de la parte decimal. Example 3
   * @returns : Número formateado, con parte entera sin ceros. Example: 25.000
   */

  formatNumber(number, long1, long2) {
    let entero = Math.trunc(number).toString()

    if (parseInt(entero) > 0) {
      const x = entero.substring(0, entero.length - long2)
      const decimal = entero.substring(entero.length - long2, entero.length)
      if (long2 > 0) {
        entero = x.concat(',', decimal)
        return x.concat('.', decimal)
      } else {
        return x
      }
    } else {
      return entero
    }
  }

  formatNumberToString(number, longEntera, longDecimal) {
    let decimal = ''
    let entera = ''
    decimal = number.split('.')[1]
    decimal = decimal == undefined ? '' : decimal
    entera = number.split('.')[0]
    decimal = decimal.padEnd(longDecimal, '0')
    entera = this.fillWithCeros(entera, longEntera)
    return entera.concat(decimal)
  }

  /**
   *
   * @param results : Registros devueltos por el servicio de combo
   * @returns : Array con nuevos atributos value/label
   */

  mapDropdown(results) {
    const aux = results['tabla'].filter((x) => x.DD_COLUM_COMBO != '')

    return aux.map((p) => {
      p['label'] = p.DD_COLUM_COMBO
      p['value'] = p.CC_COLUM_COMBO
      return p
    })
  }

  formatDatey(date: any): any {
    const pattern = /(\d{2})(\d{2})(\d{2})/
    const replace = date.replace(pattern, '$1/$2/$3')

    return replace
  }

  validateDatey(param) {
    return param ? this.formatDatey(param) : ''
  }
}
