'use strict';

import { request, summary, tags, body, description } from '../swagger';
import { User, userSchema } from "../model/user";
import Team from "../model/team"
import { responseWrapper } from "../helper/util";
import bcrypt from "bcrypt"
import Fawn from "fawn"
import Mail from '../helper/mail'
import config from '../config'
import Ldap from '../helper/ldap'
import crypto from 'crypto'
const https = require('https');
const request1 = require('request');
const jwt = require('jsonwebtoken');

const tag = tags(['认证']);

var loginSchema = {
    username: {
        type: 'string',
        required: true
    },
    password: {
        type: 'string',
        required: true
    }
}
var registerSchema = {
    username: {
        type: 'string',
        required: true
    },
    password: {
        type: 'string',
        required: true
    },
    email: {
        type: 'string',
        required: true
    }
}

module.exports = class AuthRouter {




    @request('post', '/api/user/apitoken')
    @summary('生成apitoken')
    @tag
    static async apiToken(ctx, next) {
        var user = ctx.state.user.data
        var user = await User.findOne({ _id: user._id })
        if (user) {
            // var key = await bcrypt.hash(user.email, 10)
            var md5 = crypto.createHash('md5')
            var salt = user.email + Date()
            var key = md5.update(user.email + salt).digest('hex')
            await User.findByIdAndUpdate(user._id, { apiToken: key })
            ctx.body = responseWrapper(key)
        } else {
            throw new Error('授权失败，请重新登录后重试')
        }
    }





    @request('post', '/api/user/password/modify')
    @summary('修改用户密码')
    @body({
        oldpwd: {
            type: 'string',
            require: true
        },
        newpwd: {
            type: 'string',
            require: true
        }
    })
    @tag
    static async modifyPassword(ctx, next) {
        var user = ctx.state.user.data;
        var body = ctx.request.body;
        var userData = await User.findById(user._id, "password")
        if (!userData) {
            throw new Error("用户不存在");
        }
        let valide = await bcrypt.compare(body.oldpwd, userData.password);
        if (!valide) {
            throw new Error("密码错误");
        }
        body.password = await bcrypt.hash(body.newpwd, 10); // 10是 hash加密的级别, 默认是10，数字越大加密级别越高
        await User.findByIdAndUpdate(user._id, { password: body.password })
        ctx.body = responseWrapper(true, "密码修改成功")
    }

    @request('post', '/api/user/modify')
    @summary('修改用户资料')
    @body({
        mobile: {
            type: 'string'
        },
        qq: {
            type: 'string'
        },
        company: {
            type: 'string'
        },
        career: {
            type: 'string'
        }
    })
    @tag
    static async changeUserInfo(ctx, next) {
        var user = ctx.state.user.data
        var body = ctx.request.body
        var userData = await User.findById(user._id, "username");
        if (!userData) {
            throw new Error("用户不存在");
        }
        await User.updateOne({
            username: user.username
        }, {
            mobile: body.mobile,
            qq: body.qq,
            company: body.company,
            career: body.career
        })
        ctx.body = responseWrapper(true, "用户资料修改成功")
    }

    @request('get', '/api/user/info')
    @summary('获取用户资料')
    @tag
    static async getUserInfo(ctx, next) {
        var user = ctx.state.user.data
        var user = await User.findById(user._id, "-teams -password");
        if (!user) {
            throw new Error("获取用户资料失败，用户不存在");
        }
        ctx.body = responseWrapper(user)
    }

    @request('get', '/api/user/teams')
    @summary('获取用户团队列表')
    @tag
    static async getuserTeams(ctx, next) {
        var user = ctx.state.user.data
        console.log('getuserTeams',user)
        var user = await User.findById(user._id, "teams");
        if (!user) {
            throw new Error("获取用户团队列表失败，用户不存在");
        }
        ctx.body = responseWrapper(user)
    }

    @request('post', '/api/user/resetPassword')
    @summary('通过邮箱重置密码')
    @tag
    @body({
        email: {
            type: 'string',
            required: true
        }
    })
    static async resetPassword(ctx, next) {
        var body = ctx.request.body

        var user = await User.findOne({
            email: body.email
        }, "-teams -password");
        if (!user) {
            throw new Error("邮箱有误,没有该用户");
        }

        var newPassword = Math
            .random()
            .toString(36)
            .substring(2, 5) + Math
            .random()
            .toString(36)
            .substring(2, 5);
        var hashPassword = await bcrypt.hash(newPassword, 10); // 10是 hash加密的级别, 默认是10，数字越大加密级别越高
        await User.findByIdAndUpdate(user._id, { password: hashPassword })
        Mail.send([body.email], "爱发布密码重置邮件", `您的密码已重置${newPassword}`)
        ctx.body = responseWrapper("密码已重置,并通过邮件发送到您的邮箱")
    }
}
