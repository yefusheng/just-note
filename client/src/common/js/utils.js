class Utils {
  // 验证邮箱
  valideEmail(email) {
    var re = /\S+@\S+\.\S+/
    return re.test(email)
  }

  // 验证手机
  validePhone(phone) {
    var re = /^1[0-9]{10}$/
    return re.test(phone)
  }

  dateFtt(fmt, date) { //author: meizz
    var o = {
      "M+": date.getMonth() + 1,     //月份
      "d+": date.getDate(),     //日
      "h+": date.getHours(),     //小时
      "m+": date.getMinutes(),     //分
      "s+": date.getSeconds(),     //秒
      "q+": Math.floor((date.getMonth() + 3) / 3), //季度
      "S": date.getMilliseconds()    //毫秒
    };
    if (/(y+)/.test(fmt))
      fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
      if (new RegExp("(" + k + ")").test(fmt))
        fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
  }
}

const instance = new Utils()
export default instance
