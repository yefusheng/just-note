/**
 * Created by darren on 2018/4/2.
 */
import { postHttp, getHttp, deleteHttp } from '../basehttp'
import {
  getUserInfo, saveUserInfo
} from '../../mgr/userMgr'
const axios = require('axios')

export function getFileKey() {
  let uploadUrl = process.env.FILE_UPLOAD_URL;
  const url = `${uploadUrl}/api/file/ticket`;
  const token=getUserInfo().exeTicket
  axios.defaults.headers.Authorization= 'Bearer' + ' ' + token
  return axios.get(url,{type: 0, file_kind: 0, count:1 })
}
