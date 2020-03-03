<template>
  <div class="phoneDownLoadWrapper">
    <img class="appicon" :src="getIconUrl()" alt="">
    <p class="title">{{this.appBaseData.appName}}</p>
    <div class="info">
      <p class="desc">版本：{{this.appVersionInfo.versionStr}}</p>
      <span>大小：{{(this.appVersionInfo.size / 1024 / 1024).toFixed(1)}}M</span>
    </div>
    <div class="info">
      <p class="date">发布日期： {{ this.appVersionInfo.creatDateStr }} </p>
    </div>

    <div v-if="showPwd">
      <div>
        <el-input v-model="pwd" type="password" placeholder="请输入密码" class="pwd"></el-input>
      </div>
      <div>
        <el-button @click="clickSure" type="primary" round class="downloadBtn sureBtn">确定</el-button>
      </div>
    </div>

    <el-button v-if="showDownLoadBtn" @click="clickDownLoadBtn" class="downloadBtn" type="primary" round><i
      :class="this.platformStr === 'ios' ? 'icon-ic_ios':'icon-ic_andr'"></i> 下载安装
    </el-button>
    <div class="info">
      <p class="desc" v-show="!this.isWeixin">只支持 {{ this.platformStr === 'ios' ? '苹果' : '安卓' }} 设备 </p>
      <p class="desc" v-show="this.isWeixin">微信内无法下载应用</p>
    </div>
    <div class="wxtip" v-if="this.isWeixin && !hasTipClick" @click="clickWeixinTipBtn">
      <span class="wxtipIcon"></span>
      <p class="wxtipTxt">请点击右上角菜单<br/>选择在默认浏览器中打开并安装应用</p>
    </div>
  </div>

</template>

<script type="text/ecmascript-6">
  export default {
    props: {
      appBaseData: {
        type: Object
      },
      appVersionInfo: {
        type: Object
      },
      platformStr: {
        type: String
      }
    },
    computed: {

      showDownLoadBtn() {
//        if (this.isWeixin) {
//          return false
//        }
        if (this.isIos && this.platformStr != 'ios') {
          return false
        }
        if (this.isAndroid && this.platformStr != 'android') {
          return false
        }
        if (this.appBaseData.installWithPwd !== 1 || this.pwd === this.appBaseData.installPwd) {
          return true
        } else {
          return false
        }
        return true;
      },
      showPwd() {
        if (this.appBaseData.installWithPwd !== 1 || this.pwd === this.appBaseData.installPwd) {
          return false
        } else {
          return true
        }
      }
    },
    data() {
      return {
        pwd: '',
        isWeixin: false,
        isAndroid: false,
        isIos: false,
        hasTipClick: true
      }
    },
    created() {
    },
    mounted() {
      var ua = window.navigator.appVersion
      this.isAndroid = ua.search(/Android/g) > -1 || ua.search(/Windows/g) > -1
      this.isIos = ua.indexOf('iPhone') > -1 || ua.indexOf('iPad') > -1
      this.isWeixin = navigator.userAgent.toLowerCase().indexOf('micromessenger') !== -1
    },
    methods: {
      clickWeixinTipBtn(){
        this.hasTipClick = true;
      },
      getIconUrl() {
        return `${this.axios.defaults.baseURL}${this.appBaseData.icon}`
      },
      clickSure() {
        if (this.pwd !== this.appBaseData.installPwd) {
          this.$message.error('密码错误')
        }
      },
      clickDownLoadBtn() {
          if(this.isWeixin){
            this.hasTipClick = false;
            return;
          }

        this.$emit('clickDownLoadBtn')
      }
    }
  }
</script>

<style lang="scss">
  @import "../../common/scss/base";

  .phoneDownLoadWrapper {
  }

  .phoneDownLoadWrapper .appicon {
    width: 126px;
    height: 126px;
    border-radius: 15px;
    margin-top: 100px;
  }

  .phoneDownLoadWrapper .info {
    display: flex;
    flex-direction: row;
    justify-content: center;
    color: #242A34;
    font-size: 14px;
    line-height: 20px;
    margin-top: 12px;
    opacity: 0.5;
  }

  .phoneDownLoadWrapper .pwd {
    width: 200px;
    height: 40px;
    border: solid 1px $mainColor;
    border-radius: 6px;
    margin-top: 12px;
    background-color: transparent;
  }

  .phoneDownLoadWrapper .downloadBtn {
    background-color: #8393F5;
    width: 200px;
    height: 44px;
    color: white;
    font-size: 14px;
    margin-top: 20px;
    border-color: transparent;
  }

  .wxtip {
    background: rgba(0, 0, 0, 0.8);
    text-align: center;
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: 998;
  }

  .wxtipIcon {
    width: 52px;
    height: 67px;
    background: url("../../assets/weixin_tip.png") no-repeat;
    display: block;
    position: absolute;
    right: 20px;
    top: 20px;
  }

  .wxtipTxt {
    margin-top: 107px;
    color: #fff;
    font-size: 16px;
    line-height: 1.5;
  }
</style>
