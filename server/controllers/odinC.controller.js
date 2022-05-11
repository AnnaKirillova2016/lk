let request = require("request");

function b64tutf(b64){
    return Buffer.from(b64, 'base64').toString('utf8')
}

function getlogin() {
    return {"login":"web","pass":"webapp"}
}

function getHeadParam(req,param){
    let p = ""
    if(Object.prototype.hasOwnProperty.call(req.headers,param)){
        p = req.headers[param]
    }
    return p
}

exports.allUsers = async function (req, res, next) {
    let user = getlogin()
    await request({
        uri:'http://localhost:8181/rmabsp_dev/hs/lcapplication/httpjson/get_all_users/',
        auth: {
            user: user.login,
            password: user.pass
        }
    }).pipe(res)

},
exports.getAllCities = async function (req, res, next) {
    let user = getlogin()
    // let town = ""
    // if(Object.prototype.hasOwnProperty.call(req.headers,'town')){
    //     town = req.headers['town']
    // }
    await request({
        method: 'post',
        uri: 'http://localhost:8181/rmabsp_dev/hs/lcapplication/httpjson/get_all_city/',
        auth: {
            user: user.login,
            password: user.pass
        },
        json: {"Наименование":getHeadParam(req,'town')},

    }).pipe(res)
},
exports.getAllOrganization = async function (req, res, next) {
    let user = getlogin()
    // let organization = ""
    // if(Object.prototype.hasOwnProperty.call(req.headers,'organization')){
    //     organization = req.headers['organization']
    // }
    await request({
        method: 'post',
        uri: 'http://localhost:8181/rmabsp_dev/hs/lcapplication/httpjson/get_all_organization/',
        auth: {
            user: user.login,
            password: user.pass
        },
        json: {"Наименование":getHeadParam(req,'organization')},
    }).pipe(res)
},
exports.getAllUsersByRegion  = async function (req, res, next) {
    let user = getlogin()
    let regionUser = ""
    await request({
        method: 'post',
        uri: 'http://localhost:8181/rmabsp_dev/hs/lcapplication/httpjson/get_all_users_by_region/',
        auth: {
            user: user.login,
            password: user.pass
        },
        json:{}
    }).pipe(res)
},
exports.getProgrammDpoCode1c  = async function (req, res, next) {
    let user = getlogin()
    // let dpo=""
    // if(Object.prototype.hasOwnProperty.call(req.headers,'dpo')){
    //     dpo = req.headers['dpo']
    // }
        await request({
            method: 'post',
            uri: 'http://localhost:8181/rmabsp_dev/hs/lcapplication/httpjson/get_programm_dpo_code1c/',
            auth: {
                user: user.login,
                password: user.pass
            },
            json:{"Код1С": b64tutf(getHeadParam(req,'dpo'))}
        }).pipe(res)
    },
exports.getProgrammDpo   = async function (req, res, next) {
    let user = getlogin()
    await request({
        method: 'post',
        uri: 'http://localhost:8181/rmabsp_dev/hs/lcapplication/httpjson/get_programm_dpo/',
        auth: {
            user: user.login,
            password: user.pass
        },
        json:{
            'НаименованиеПрограммы':b64tutf(getHeadParam(req,'nProgDpo')),
            'НаименованиеСпециальности':b64tutf(getHeadParam(req,'nSpDpo')),
            'НаименованиеКатегории':b64tutf(getHeadParam(req,'nCatDpo')),
            'Город':b64tutf(getHeadParam(req,'city')),
            'НаименованиеОрганизации':b64tutf(getHeadParam(req,'nOrg')),
            'ТипДПО':b64tutf(getHeadParam(req,'tDpo')),
            'ИсточникФинансирования':b64tutf(getHeadParam(req,'finSource')),
            'Код1С':b64tutf(getHeadParam(req,'code1C')),
        }
    }).pipe(res)
},


exports.getAllNameProgramm   = async function (req, res, next) {
    let user = getlogin()
        await request({
            method: 'post',
            uri: 'http://localhost:8181/rmabsp_dev/hs/lcapplication/httpjson/get_all_name_programm/',
            auth: {
                user: user.login,
                password: user.pass
            },
            json:{"Наименование": getHeadParam(req,'programs')}
        }).pipe(res)
    },
exports.getAllPeriodsEducation    = async function (req, res, next) {
    let user = getlogin()
    await request({
        method: 'post',
        uri: 'http://localhost:8181/rmabsp_dev/hs/lcapplication/httpjson/get_all_periods_education/',
        auth: {
            user: user.login,
            password: user.pass
        },
        json:{"Наименование": getHeadParam(req,'edPeriod')}
    }).pipe(res)
},
exports.getAllSpecialityEducation    = async function (req, res, next) {
    let user = getlogin()
        await request({
            method: 'post',
            uri: 'http://localhost:8181/rmabsp_dev/hs/lcapplication/httpjson/get_all_speciality_education/',
            auth: {
                user: user.login,
                password: user.pass
            },
            json:{"Наименование": getHeadParam(req,'specs')}
        }).pipe(res)
    },
exports.getRangeCycleTime    = async function (req, res, next) {
    let user = getlogin()
        await request({
            method: 'post',
            uri: 'http://localhost:8181/rmabsp_dev/hs/lcapplication/httpjson/get_range_cycle_time/',
            auth: {
                user: user.login,
                password: user.pass
            },
            json:{"Наименование": getHeadParam(req,'clycleTime')}
        }).pipe(res)
    },
exports.getSourceFinance     = async function (req, res, next) {
    let user = getlogin()
        await request({
            method: 'post',
            uri: 'http://localhost:8181/rmabsp_dev/hs/lcapplication/httpjson/get_source_finance/',
            auth: {
                user: user.login,
                password: user.pass
            },
            json:{"Наименование": getHeadParam(req,'finSource')}
        }).pipe(res)
    },
exports.getSourceFinanceWithdpo  = async function (req, res, next) {
    let user = getlogin()
        await request({
            method: 'post',
            uri: 'http://localhost:8181/rmabsp_dev/hs/lcapplication/httpjson/et_source_finance_withdpo/',
            auth: {
                user: user.login,
                password: user.pass
            },
            json:{"ПрограммаДПО": getHeadParam(req,'dpoLink')}
        }).pipe(res)
    },
exports.getCategoryEdu  = async function (req, res, next) {
    let user = getlogin()
        await request({
            method: 'post',
            uri: 'http://localhost:8181/rmabsp_dev/hs/lcapplication/httpjson/get_category_edu/',
            auth: {
                user: user.login,
                password: user.pass
            },
            json:{"Наименование": getHeadParam(req,'catEtu')}
        }).pipe(res)
    },
exports.getCategoryEduWithdpo  = async function (req, res, next) {
    let user = getlogin()
        await request({
            method: 'post',
            uri: 'http://localhost:8181/rmabsp_dev/hs/lcapplication/httpjson/get_category_edu_withdpo/',
            auth: {
                user: user.login,
                password: user.pass
            },
            json:{"ПрограммаДПО": getHeadParam(req,'catDpoEdu')}
        }).pipe(res)
    },
exports.getPeriodsEducation   = async function (req, res, next) {
    let user = getlogin()
        await request({
            method: 'post',
            uri: 'http://localhost:8181/rmabsp_dev/hs/lcapplication/httpjson/get_periods_education/',
            auth: {

                user: user.login,
                password: user.pass
            },
            json:{"ПрограммаДПО": getHeadParam(req,'catDpoEdu')}
        }).pipe(res)
    },
exports.getStateStringPlan   = async function (req, res, next) {
    let user = getlogin()
        await request({
            method: 'post',
            uri: 'http://localhost:8181/rmabsp_dev/hs/lcapplication/httpjson/get_state_string_plan/',
            auth: {
                user: user.login,
                password: user.pass
            },
            json:{}
        }).pipe(res)
    },
exports.getSpecialityEducation   = async function (req, res, next) {
    let user = getlogin()
        await request({
            method: 'post',
            uri: 'http://localhost:8181/rmabsp_dev/hs/lcapplication/httpjson/get_speciality_education/',
            auth: {
                user: user.login,
                password: user.pass
            },
            json:{"ПрограммаДПО": getHeadParam(req,'specList')}
        }).pipe(res)
    },
exports.getTypeDpo   = async function (req, res, next) {
    let user = getlogin()
        await request({
            method: 'post',
            uri: 'http://localhost:8181/rmabsp_dev/hs/lcapplication/httpjson/get_type_dpo/',
            auth: {
                user: user.login,
                password: user.pass
            },
            json:{}
        }).pipe(res)
    },

exports.getInfoUser   = async function (req, res, next) {
    let user = getlogin()
    await request({
        method: 'post',
        uri: 'http://localhost:8181/rmabsp_dev/hs/lcapplication/httpjson/get_info_user/',
        auth: {
            user: user.login,
            password: user.pass
        },
        json:{"ФизическоеЛицо": getHeadParam(req,'userLink')}
    }).pipe(res)
},

exports.getInfoProgramm   = async function (req, res, next) {
    let user = getlogin()
    await request({
        method: 'post',
        uri: 'http://localhost:8181/rmabsp_dev/hs/lcapplication/httpjson/get_info_programm/',
        auth: {
            user: user.login,
            password: user.pass
        },
        json:{"ПрограммаДПО": getHeadParam(req,'programInfo')}
    }).pipe(res)
},

exports.getInfoProgrammTest   = async function (req, res, next) {
    let user = getlogin()
        await request({
            method: 'post',
            uri: 'http://localhost:8181/rmabsp_dev/hs/lcapplication/httpjson/get_info_programm_test/',
            auth: {
                user: user.login,
                password: user.pass
            }
        }).pipe(res)
},
exports.getInfoPlanLine   = async function (req, res, next) {
        let user = getlogin()
        await request({
            method: 'post',
            uri: 'http://localhost:8181/rmabsp_dev/hs/lcapplication/httpjson/get_info_plan_line/',
            auth: {
                user: user.login,
                password: user.pass
            },
            json:getHeadParam(req,'infoPlan')
        }).pipe(res)
}