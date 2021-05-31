
function convertChkbx(jData) {
    let result = {}
    result[jData.УИД] = {
        "comp":"checkbox",
        "text": jData.Наименование
    }

    return result
}

function convertInput(jData) {
    let result = {}
    result[jData.УИД] = {
        "comp":"input",
        "label": jData.Наименование,
        "placeholder": jData.Значение
    }

    return result
}

function convertDate(jData) {
    let result = {}
    result[jData.УИД] = {
        "comp":"datePicker",
        "label": jData.Наименование
    }

    return result
}

function convertButton(jData){
    let result = {}
    result[jData.УИД] = {
        "comp":"button",
        "text":jData.Наименование
    }
    return result
}

function convertElement(jData) {
    let result = {}
    if(Object.prototype.hasOwnProperty.call(jData, 'Элементы')){
        /*if(jData.Тип == 'Группа') {*/
            result[jData.УИД] = {
                "comp": "group",
                "col": "24",
                "header": jData.Наименование,
                "schema": "{}"
            }
      /*  }else{
            result[jData.УИД] = {
                "comp": "wrap",
                "col": "24",
                "header": jData.Наименование,
                "schema": "{}"
            }
        }*/
        result[jData.УИД].schema = convertElements(jData.Элементы)
        if (Object.keys(result[jData.УИД].schema).length === 0){
            delete(result[jData.УИД])
        }
    }else if(Object.prototype.hasOwnProperty.call(jData, 'Тип')){
        if(jData.Тип == 'ЭлементЧекБокс'){
            result = convertChkbx(jData)
        }else if(jData.Тип == 'ЭлементСтрока' || jData.Тип == 'ЭлементТелефон' || jData.Тип == 'ЭлементАдрес'){
            result = convertInput(jData)
        }else if(jData.Тип == 'ЭлементДата'){
            result = convertDate(jData)
        }else if(jData.Тип.indexOf('Кнопка') > -1){
            result = convertButton(jData)
        }

    }

    return result
}

function convertElements(jData) {
    let result = {}

    if(Array.isArray(jData)) {
        result = {}

        for (let i = 0; i < jData.length; i++) {
            let jsT = convertElements(jData[i])
            let jsKeys = Object.keys(jsT)
            if (jsKeys.length > 0) {
                result[jsKeys[0]] = jsT[jsKeys[0]]
            }
        }

    }else {
        result = convertElement(jData)
    }

    return result

}

////////////////////////////////////////////////////////////////////////////////////////////////////////

function convertDataChkbx(jData) {
    let result = {}
    /*result[jData.УИД] = {
        "comp":"checkbox",
        "text": jData.Наименование
    }*/
    result[jData.УИД] = jData.Помечен
    return result
}

function convertDataInput(jData) {
    let result = {}
    /*result[jData.УИД] = {
        "comp":"checkbox",
        "label": jData.Наименование,
        "placehoder": jData.Значение
    }*/
    result[jData.УИД] = jData.Значение

    return result
}

function convertDataDate(jData) {
    let result = {}
    result[jData.УИД] = new Date (jData.Параметры.ГодПоУмолчанию,0,1)

    return result
}

function convertDataButton(jData) {
    let result = {}
    result[jData.УИД] = {}

    return result
}

function convertDataElement(jData) {
    let result = {}
    if(Object.prototype.hasOwnProperty.call(jData, 'Элементы')){
        result[jData.УИД] = {}
        result[jData.УИД] = convertDataElements(jData.Элементы)
        if (Object.keys(result[jData.УИД]).length === 0){
            delete(result[jData.УИД])
        }
    }else if(Object.prototype.hasOwnProperty.call(jData, 'Тип')){
        if(jData.Тип == 'ЭлементЧекБокс'){
            result = convertDataChkbx(jData)
        }else if(jData.Тип == 'ЭлементСтрока' || jData.Тип == 'ЭлементТелефон' || jData.Тип == 'ЭлементАдрес'){
            result = convertDataInput(jData)
        }else if(jData.Тип == 'ЭлементДата'){
            result = convertDataDate(jData)
        }else if(jData.Тип.indexOf('Кнопка') > -1){
            result = convertDataButton(jData)
        }


    }

    return result
}

function convertDataElements(jData) {
let result = {}

if(Array.isArray(jData)) {
    result = {}

    for (let i = 0; i < jData.length; i++) {
        let jsT = convertDataElements(jData[i])
        let jsKeys = Object.keys(jsT)
        if (jsKeys.length > 0) {
            result[jsKeys[0]] = jsT[jsKeys[0]]
        }
    }

}else {
    result = convertDataElement(jData)
}

return result

}
////////////////////////////////////////////////////////////////////////////////////////////////////////

/*function convertData(jData) {
   console.log('Это заглушка для ' + jData )
}*/

function defineType(type, jData) {
    let result = {}

    if(!Object.prototype.hasOwnProperty.call(jData, 'Output')){
        return {
            "button": {
                "comp": "button",
                "size": "large",
                "type": "danger",
                "text": "JSON heve wrong format",
                "enable":"false"
            }
        }
    }
    if(!Object.prototype.hasOwnProperty.call(jData.Output, 'Data')){
        return {
            "button": {
                "comp": "button",
                "size": "large",
                "type": "danger",
                "text": "JSON not contain data",
                "enable":"false"
            }
        }
    }
    jData = jData.Output.Data

    if(type == 'interface'){
        result = convertElements(jData)
    }else if(type == 'data'){
        result = convertDataElements(jData)
    }
    return result
}

export function convertF(type, jData) {

    return defineType(type,jData)

}
