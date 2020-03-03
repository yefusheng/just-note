<template>
  <div class="user">

    <div class="user-right">
      <div class="user-qrlogin-panel">
        <div id="qrContainer">
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import * as LoginApi from '../../api/moudle/loginApi'
  import TokenMgr from '../../mgr/TokenMgr'
  import {saveUserInfo} from '../../mgr/userMgr'
  import { toast }  from '../../common/js/toast'
  const exeQrCode = require('../../common/js/exeqrcode')
  export default {
    data() {
      return {}
    },
    created() {
      this.init()
    },
    components: {},
    methods: {
      onShow(url) {
        let avatarContainer = document.createElement('DIV')
        avatarContainer.className = 'exe-qr-container'
        let img = new Image()
        img.src = url
        img.className = 'exe-code'
        document.querySelector('#qrContainer').innerHTML = ''
        let div = document.createElement('DIV')
//        div.innerHTML = '请使用EXE扫描二维码'+ process.env.NODE_ENV
        div.innerHTML = '请使用EXE扫描二维码(dev)'

        avatarContainer.appendChild(img)
        avatarContainer.appendChild(div)
        document.querySelector('#qrContainer').appendChild(avatarContainer)
      },
      onScan(data) {
        if (data && data.success) {
          if (window.avatarSet) {
            return
          }
          window.avatarSet = true


          // 设置用户头像
          let avatarContainer = document.createElement('DIV')
          avatarContainer.className = 'exe-qr-container'
          let img = new Image()
          img.src = data.photoUrl
          img.className = 'exe-avatar'
          document.querySelector('#qrContainer').innerHTML = ''
          let div = document.createElement('DIV')
          div.innerHTML = '请在App上确认登录'

          avatarContainer.appendChild(img)
          avatarContainer.appendChild(div)
          document.querySelector('#qrContainer').appendChild(avatarContainer)
        }
      },
      onConfirm(data,qrApplyId) {
        if (data && data.code === 200 && data.success) {
          toast('登录成功')
          document.querySelector('#qrContainer').innerHTML = ''
          // 存储token
          let exeTicket= data.ticket;
          LoginApi.createUser(qrApplyId,data.ticket).then(res => {
            if (res && res.success) {
              let data= res.data;
              console.log('onConfirm',data)
              console.log('onConfirm data.ticket',data.token)
              TokenMgr.add(this.axios.baseURL, data.token)
              let user = {
                'userName': data.name,
                'userId': data.userId,
                'avatar': data.avatar,
                'teamArr':data.teams,
                'email': '',
                'apiToken': data.token,
                'exeTicket': exeTicket
              }
              // 保存用户信息
              saveUserInfo(user)
              this.$router.push('/')
            }else {
              toast('验证失败')
            }

          }, reject => {
            toast('验证失败')
          })


        }
      },
      init() {
      let param = {
        container: 'qrContainer',
        getQrCodeUrl: process.env.EXE_QRLOGIN,
        qrCodeStateUrl: process.env.EXE_QRLOGIN,
        timeout: 5000,
        onShow: this.onShow,
        onScan: this.onScan,
        onConfirm: this.onConfirm
      }
        exeQrcode(param)
      }
    }
  }

</script>

<style lang="scss">
  @import "../../common/scss/base";

  .user {
    width: 100%;
    height: 100%;
    position: absolute;
    display: flex;
    display: -webkit-flex;
    background-image: url("../../assets/bg-samll.png");
    background-size: 100% 100%;
    font-family: PingFangSC;
    overflow: hidden;
  }

  .user-right {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    overflow: hidden;
  }

  .user-logo {
    width: 210px;
    height: 50px;
    margin-top: 17.6vh;
    background-size: 210px 40px;
    background-repeat: no-repeat;
    background-image: url("../../assets/logo_w.png");
  }

  .user-divier {
    width: 168px;
    height: 3px;
    margin-top: 16px;
    background: white;
  }

  .user-name {
    font-size: 1.5em;
    color: white;
    margin-top: 24px;
    font-family: STYuanti-SC;
  }

  .user-item {
    display: flex;
    display: -webkit-flex;
    align-items: center;
    margin-top: 24px;
  }

  .user-item :hover {
    cursor: pointer;
  }

  .user-item img {
    width: 24px;
    height: 24px;
  }

  .user-item p {
    color: white;
    font-size: 1em;
    margin-left: 24px;
    width: 60px;
  }

  .user-qrlogin-panel {
    overflow: hidden;
    height: auto;
    width: auto;
    background-color: white;
    position: relative;
    border-radius: 8px;
  }

  .user-login-title {
    height: 72px;
    width: 100%;
    font-size: 20px;
    line-height: 24px;
    padding-left: 48px;
    box-shadow: 0px 1px 0px 0px rgba(0, 0, 0, 0.1)
  }

  .user-login-title p {
    color: rgba(53, 64, 82, 1);
    height: 100%;
    line-height: 72px;
  }

  .user-login-title p span {
    color: rgba(155, 155, 155, 1);
  }

  .user-login-form, .user-register-form {
    width: 100%;
    text-align: center;
  }

  .user-login-form .user-login-form-input {
    margin-top: 48px;
  }

  .user-register-form .user-login-form-input {
    margin-top: 24px;
  }

  .user-login-form-input {
    width: 312px;
    height: 48px;
  }

  .user-login-form-input input {
    border-radius: 24px;
    height: 48px;
    border: 1px #6477F2 solid;
  }

  .user .el-input__prefix {
    padding-left: 18px;
  }

  .user .el-input__prefix i {
    line-height: 48px;
  }

  .user .el-input--prefix .el-input__inner {
    padding-left: 50px;
    line-height: 48px;
  }

  .user-register-form-btn, .user-login-form-btn, .user-login-form-btn:hover {
    width: 312px;
    height: 48px;
    border-radius: 24px;
    background: rgba(100, 119, 242, 1);
    border: rgba(100, 119, 242, 1);
    color: white;
    font-size: 14px;
    cursor: pointer;
  }

  .user-login-form-btn {
    margin-top: 48px;
  }

  .user-register-form-btn {
    margin-top: 24px;
  }

  .user-login-form-label {
    margin-top: 48px;
    cursor: pointer;
  }

  .user-login-form-bottom {
    float: right;
    margin-right: 48px;
    font-size: 14px;
    color: rgba(155, 155, 155, 1);
    margin-bottom: 24px;
    cursor: pointer;
  }

  .user-footer-label {
    display: block;
    width: 100%;
    position: fixed;
    text-align: center;
    bottom: 24px;
  }

  .user-footer-label p {
    size: 1rem;
    color: white;
    margin: 0 auto;
  }

  @media screen and (max-width: 768px) {
    .user-left {
      display: none;
      position: relative;
    }
  }

  @media screen and (max-height: 650px) {
    .user-footer-label {
      display: none;
    }

  }

</style>
