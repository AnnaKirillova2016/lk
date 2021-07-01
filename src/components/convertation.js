let sList = []

function sListNotNull(){
    let jsKeys = Object.keys(sList)
    if(jsKeys.length > 0){
        return true
    }else{
        return false
    }
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function convertUploadChk(jData){
    let result = {}
    result[jData.УИД] ={
        "comp":"array",
        "col":"24",
        "schema":{}
    }

    result[jData.УИД]['schema'][jData.УИД + 'Chk'] = {
        "comp": "checkbox",
        "text": "Обработать",
        "col":"2",
        "style": {
            "marginTop": "10px"
        }
    }

    result[jData.УИД]['schema'][jData.УИД + 'Upload'] = {
        "comp": "file",
        "action": "",
        "autoUpload": false,
        "text": "Upload Selector",
        "accept": " .jpg, .jpeg, .png, .gif",
        "tip": "Only Images",
        "col":"10",
        "schema": {
            "comp": "button",
            "type": "Primary",
            "style": {
                "display": "block",
                "marginTop":"10px"
            },
            "size": "large",
            "text": jData.Наименование,
        }
    }


    return result
}
function convertUpload(jData){
    let result = {}
    result[jData.УИД] = {
        "comp": "file",
        "action": "",
        "autoUpload": false,
        "text": "Upload Selector",
        "accept": " .jpg, .jpeg, .png, .gif",
        "tip": "Only Images",
        "schema": {
            "comp": "button",
            "type": "Primary",
            "style": {
                "display": "block",
                "marginTop":"10px"
            },
        "size": "large",
        "text": jData.Наименование,
        }
    }
    return result
}

function convertSelect(jData) {
    let result = {}
    result[jData.УИД] = {
        "comp":"select",
        "placeholder": jData.Наименование,
        "label": jData.Наименование + ': ',
        "style": {
            "marginBottom":"10px"
        },
    }
    if(sListNotNull()){
        result[jData.УИД]['options'] = sList[jData['Параметры']['listData']]
    }else{
        result[jData.УИД]['options'] ={}
    }


    return result
}

function convertRadio(jData) {
    let result = {}
    result[jData.УИД] = {
        "comp":"radioButton",
        "name": jData.Наименование,
        "style": {
            "marginBottom":"5px",
            "marginTop":"5px"
        },
    }

    let arrVal = []
    for (let i = 0; i < jData.Элементы.length; i++) {
        let el = jData.Элементы[i]
        arrVal.push({
            "name": el['Наименование'],
            "label": el['Наименование'],
            "uid": el['Значение']['uid']
            })
    }

    result[jData.УИД]['options'] = arrVal

    return result
}

function convertAlert(jData) {
    let result = {}
    result[jData.УИД] = {
        "comp":"alert",
        "title": jData.Значение,
        "closable":false,
        "style": {
            "marginBottom":"5px"
        }

    }
    if(jData.Параметры['Класс'] == 'primary'){
        result[jData.УИД]['type'] = "info"
    }else if(jData.Параметры['Класс'] == 'warning'){
        result[jData.УИД]['type'] = "warning"
    }

    return result
}

function convertChkbx(jData) {
    let result = {}
    result[jData.УИД] = {
        "comp":"checkbox",
        "text": jData.Наименование,
        "style": {
            "marginTop":"10px"
        },
    }

    return result
}

function convertInput(jData) {
    let result = {}
    result[jData.УИД] = {
        "comp":"input",
        "label": jData.Наименование,
        "placeholder": jData.Значение,
        "style": {
            "marginTop":"5px",
            "marginBottom":"15px"
        },
    }

    return result
}

function convertDate(jData) {
    let result = {}
    result[jData.УИД] = {
        "comp":"datePicker",
        "label": jData.Наименование,
        "style": {
            "marginTop":"10px"
        },
    }

    return result
}

function convertButton(jData){
    let result = {}
    result[jData.УИД] = {
        "comp":"button",
        "text":jData.Наименование,
        "style": {
            "marginTop":"10px",
            "marginBottom":"5px"
        },
    }
    return result
}

function convertElement(jData) {
    let result = {}
    if(Object.prototype.hasOwnProperty.call(jData, 'Тип')){
        if(jData.Тип == 'ЭлементЧекБокс'){
            result = convertChkbx(jData)
        }else if(jData.Тип == 'ЭлементСтрока' || jData.Тип == 'ЭлементТелефон' || jData.Тип == 'ЭлементАдрес'){
            result = convertInput(jData)
        }else if(jData.Тип == 'ЭлементДата'){
            result = convertDate(jData)
        }else if(jData.Тип.indexOf('Кнопка') > -1){
            result = convertButton(jData)
        }else if(jData.Тип.indexOf('ЭлементСообщение') > -1){
            result = convertAlert(jData)
        }else if(jData.Тип.indexOf('ЭлементРадио') > -1){
            result = convertRadio(jData)
        }else if(jData.Тип.indexOf('ЭлементСелект') > -1) {
            result =convertSelect(jData)
        }else if(jData.Тип.indexOf('ЭлементСкан') > -1) {
            result =convertUpload(jData)
        }else if(jData.Тип.indexOf('ЭлементЧекБоксСоСканом') > -1) {
            result =convertUploadChk(jData)
        }else if(Object.prototype.hasOwnProperty.call(jData, 'Элементы')){

            let key = ''
            if(jData.УИД != ''){
                key = jData.УИД
            }else{
                key = jData.Наименование
            }

            result[key] = {
                "comp": "group",
                "col": "24",
                "header": jData.Наименование,
                "schema": "{}",
                "style": {
                    "marginBottom":"10px",
                    "marginTop":"5px"
                },
            }
            result[key].schema = convertElements(jData.Элементы)
            if (Object.keys(result[key].schema).length === 0){
                delete(result[key])
            }
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
function convertDataUploadChk(jData){
    let result = {}


    result[jData.УИД] ={}

    result[jData.УИД][jData.УИД + 'Chk'] = {}

    result[jData.УИД][jData.УИД + 'Upload'] = {}

    return result
}

function convertDataUpload(jData) {
    let result = {}
    result[jData.УИД] = {}
    return result
}

function convertDataSelect(jData) {
    let result = {}
    result[jData.УИД] = {}

    return result
}

function convertDataRadio(jData) {
    let result = {}
    result[jData.УИД] = {

    }

    return result
}

function convertDataAlert(jData) {
    let result = {}
    result[jData.УИД] = {}
    return result
}

function convertDataChkbx(jData) {
    let result = {}
    result[jData.УИД] = jData.Помечен
    return result
}

function convertDataInput(jData) {
    let result = {}
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
    if(Object.prototype.hasOwnProperty.call(jData, 'Тип')){
        if(jData.Тип == 'ЭлементЧекБокс'){
            result = convertDataChkbx(jData)
        }else if(jData.Тип == 'ЭлементСтрока' || jData.Тип == 'ЭлементТелефон' || jData.Тип == 'ЭлементАдрес'){
            result = convertDataInput(jData)
        }else if(jData.Тип == 'ЭлементДата'){
            result = convertDataDate(jData)
        }else if(jData.Тип.indexOf('Кнопка') > -1){
            result = convertDataButton(jData)
        }else if(jData.Тип.indexOf('ЭлементСообщение') > -1) {
            result = convertDataAlert(jData)
        }else if(jData.Тип.indexOf('ЭлементРадио') > -1){
            result = convertDataRadio(jData)
        }else if(jData.Тип.indexOf('ЭлементСелект') > -1) {
            result = convertDataSelect(jData)
        }else if(jData.Тип.indexOf('ЭлементСкан') > -1) {
            result =convertDataUpload(jData)
        }else if(jData.Тип.indexOf('ЭлементЧекБоксСоСканом') > -1) {
            result =convertDataUploadChk(jData)
        }else if(Object.prototype.hasOwnProperty.call(jData, 'Элементы')){
            let key = ''
            if(jData.УИД != ''){
                key = jData.УИД
            }else{
                key = jData.Наименование
            }

            result[key] = {}
            result[key] = convertDataElements(jData.Элементы)
            if (Object.keys(result[key]).length === 0){
                delete(result[key])
            }
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
function isJson(str) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}

function convertSelectElement(jData) {
    let result = {}
    let jsKeys =  Object.keys(jData)
    for (let i = 0; i < jsKeys.length; i++) {
        let el = jData[jsKeys[i]]
        if (Array.isArray(el)) {
            let arrJ = []
            for (let i = 1; i < el.length; i++) {
                let tJs = el[i]['Ссылка']
                if (!isJson(tJs)) {
                    tJs = el[i]
                }
                try {
                    if(Object.prototype.hasOwnProperty.call(tJs,'Наименование')){
                        tJs['label'] = tJs['Наименование']
                        tJs['value'] = tJs['Наименование']
                    }else{
                        tJs['label'] = tJs['name']
                        tJs['value'] = tJs['name']
                    }

                }catch (e){
                    console.log(e)
                }

                arrJ.push(tJs)
            }
            result[jsKeys[i]] = arrJ
        }

    }/*else if(jsKeys.length > 1){
        for (let i = 0; i < jsKeys.length; i++) {
            result[jsKeys[i]] = convertSelectElement(jData[jsKeys[i]])
        }
    }*/
    return result
}

function convertSelectList(jData) {
    let result = {}

    if(Array.isArray(jData)) {
        for (let i = 0; i < jData.length; i++) {
            let jsKeys = Object.keys(jData)
            result[jsKeys[i]] = convertSelectElement(jData[i])
        }

    }else {
        result = convertSelectElement(jData)
    }

    return result

}

///////////////////////////////////////////////////////////////////////////////////////////////////////

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
    }else if(type == 'select'){

        result = convertSelectList(jData)
    }

    return result
}

export function convertF(type, jData, selectList = []) {
    sList = selectList
    return defineType(type,jData)

}
