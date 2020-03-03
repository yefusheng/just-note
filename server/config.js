var fs = require("fs")
var path = require("path")


const common = {
    baseUrl: process.env.FABU_BASE_URL || "https://47.93.120.172:9898", //baseUrl应用请求的url地址, "https://127.0.0.1:9898"
    port: process.env.FABU_PORT || "9898", //server运行的端口
    apiPrefix: 'api',
    fileDir: process.env.FABU_UPLOAD_DIR || path.join(__dirname, ".."), //上传文件的存放目录
    secret: process.env.FABU_SECRET || "secretsecret", //secret
    dbUser: process.env.FABU_DBUSER || undefined, //数据库用户 (没有开启mongodb用户认证的可以不填写)
    dbPass: process.env.FABU_DBPWD || undefined, //数据库密码 (没有开启mongodb用户认证的可以不填写)
    dbName: process.env.FABU_DB_NAME || "fabu", //数据库名称
    // dbHost: process.env.FABU_DB_HOST || "0.0.0.0", //数据库地址
    // dbPort: process.env.FABU_DB_PORT || "27017", //数据库端口
    dbHost: process.env.FABU_DB_HOST || "39.105.62.145", //数据库地址
    dbPort: process.env.FABU_DB_PORT || "3001", //数据库端口

    emailService: process.env.FABU_EMAIL_SERVICE || "qq", //邮件相关配置 用于找回密码和邀请团队成员发送邮件
    emailUser: process.env.FABU_EMAIL_USER || "",
    emailPass: process.env.FABU_EMAIL_PASS || "",
    emailPort: process.env.FABU_EMAIL_PORT || "587",

    allowRegister: boolConfig(process.env.FABU_ALLOW_REGISTER || "true"), //是否允许用户注册,为否则后端注册接口不可用

    openLdap: boolConfig(process.env.FABU_ALLOW_LDAP || "false"), //是否开启ldap 默认是false 如果公司没有ldap服务可以不用理会
    ldapServer: process.env.FABU_LDAP_URL || "", //ldap server url
    ldapUserDn: process.env.FABU_LDAP_USERDN || "", //ldap管理员dn 也就是管理员用户名
    ldapBindCredentials: process.env.FABU_LDAP_CREDENTIALS || "", //ldap管理员密码
    ldapBase: process.env.FABU_LDAP_BASE || "", //ldap base
    AccessKey: "uD1c_3eaMAsCh8gb7S-MFLgvnhx8FOjW-TeQdUMK", //AccessKey
    SecretKey: "4JO1iw16tKGR7q9IY4wDz76RBUh7KZJ40WmLZaxu", //SecretKey
    ExeQrlogin: "https://t-sso.exexm.com/qrlogin.ashx",//https://sso.exexm.com/qrlogin.ashx
    CdnUrl: "https://eftcdn.exexm.com"
};

function boolConfig(str) {
    if (str == 'true') {
        return true
    } else {
        return false
    }
}


export default common;