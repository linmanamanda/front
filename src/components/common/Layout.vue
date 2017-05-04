<template>      
    <div class="layout" :class="{'layout-hide-text': spanLeft < 5}">
        <Row type="flex">
            <i-col :span="spanLeft" class="layout-menu-left">
                <Menu active-name="1" theme="dark" width="auto" @on-select="menuSelect">
                    <div class="layout-title">“来相约”系统服务端</div>
                    <Menu-item name="1">
                        <Icon type="ios-people" :size="iconSize"></Icon>
                        <span class="layout-text">用户信息管理</span>
                    </Menu-item>
                    <Menu-item name="2">
                        <Icon type="ios-keypad" :size="iconSize"></Icon>
                        <span class="layout-text">相约信息管理</span>
                    </Menu-item>
                    <Menu-item name="3">
                        <Icon type="chatbox" :size="iconSize"></Icon>
                        <span class="layout-text">评论信息管理</span>
                    </Menu-item>
                    <Submenu name="4">
                        <template slot="title">
                            <Icon type="android-warning" :size="iconSize"></Icon>
                            <span class="layout-text">举报信息管理</span>
                        </template>
                        <Menu-item name="4-1">用户信息举报</Menu-item>
                        <Menu-item name="4-2">相约信息举报</Menu-item>
                        <Menu-item name="4-3">评论信息举报 </Menu-item>
                    </Submenu>
                    <Menu-item name="5">
                        <Icon type="stats-bars" :size="iconSize"></Icon>
                        <span class="layout-text">数据报表</span>
                    </Menu-item>
                </Menu>
            </i-col>
            <i-col :span="spanRight">
                <div class="layout-header">
                    <i-button type="text" @click="toggleClick">
                        <Icon type="navicon" size="32"></Icon>
                    </i-button>
                </div>
                <div class="layout-breadcrumb">
                    <Breadcrumb>
                        <Breadcrumb-item href="#">首页</Breadcrumb-item>
                        <Breadcrumb-item href="#">应用中心</Breadcrumb-item>
                        <Breadcrumb-item>某应用</Breadcrumb-item>
                    </Breadcrumb>
                </div>
                <div class="layout-content">
                    <router-view></router-view>
                </div>
            </i-col>
        </Row>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                spanLeft: 5,
                spanRight: 19
            }
        },
        computed: {
            iconSize () {
                return this.spanLeft === 5 ? 14 : 24;
            }
        },
        methods: {
            toggleClick () {
                if (this.spanLeft === 5) {
                    this.spanLeft = 2;
                    this.spanRight = 22;
                } else {
                    this.spanLeft = 5;
                    this.spanRight = 19;
                }
            },
            menuSelect(name) {
                switch (name) {
                    case '1': 
                        this.$router.push('/administrations/users')
                        break
                    case '2': 
                        this.$router.push('/administrations/invitations')
                        break
                    case '3':
                        this.$router.push('/administrations/replys')
                        break
                }
            }
        }
    }
</script>

<style scoped>
    .layout{
        height: 100vh;
        border: 1px solid #d7dde4;
        background: #f5f7f9;
        position: relative;
        border-radius: 4px;
        overflow: hidden;
    }
    .layout-title {
        padding: 10px 15px;
        color: #fff;
        text-align: center;
    }
    .ivu-row-flex {
        height: 100%;
    }
    .layout-breadcrumb{
        padding: 10px 15px 0;
    }
    .layout-content{
        min-height: 200px;
        margin: 15px;
        overflow: hidden;
        border-radius: 4px;
    }
    .layout-content-main{
        padding: 10px;
    }
    .layout-copy{
        text-align: center;
        padding: 10px 0 20px;
        color: #9ea7b4;
    }
    .layout-menu-left{
        background: #464c5b;
    }
    .layout-header{
        height: 60px;
        background: #fff;
        box-shadow: 0 1px 1px rgba(0,0,0,.1);
    }
    .layout-logo-left{
        width: 90%;
        height: 30px;
        background: #5b6270;
        border-radius: 3px;
        margin: 15px auto;
    }
    .layout-ceiling-main a{
        color: #9ba7b5;
    }
    .layout-hide-text .layout-text{
        display: none;
    }
    .ivu-col{
        transition: width .2s ease-in-out;
    }
</style>