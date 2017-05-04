<template>
  <div class="user-view">
    <Table :columns="columns" :data="data" border width="940"></Table>
  </div>
</template>

<script>
  import Layout from '@/components/common/Layout'
  export default {
    name: 'UserView',
    components: {
      Layout
    },
    data () {
      return {
        columns: [
          {
            title: '序号',
            type: 'index',
            align: 'center',
            width: 70
          },     
          {
            title: '邮箱',
            key: 'email',
          },
          {
            title: '用户名',
            key: 'username'
          },
          {
            title: '权限',
            key: 'authority',
            width: 80
          },
          {
            title: '状态',
            key: 'state',
            width: 80
          },
          {
            title: '最新修改时间',
            key: 'updateAt'
          },
          {
            title: '创建时间',
            key: 'createAt'
          },
          {
            title: '操作',
            key: 'action',
            align: 'center',
            render () {
              return `<i-button type="warning" size="small">修改</i-button> <i-button type="error" size="small">删除</i-button>`;
            }
          }
        ],
        data: [
          {
            email: 'linmanamanda@gmail.com',
            username: 'linman',
            authority: '1',
            state: '0',
            updateAt: '2017-05-04 19:18',
            createAt: '2017-05-04 19:18',
             
          },
          {
            email: 'whitehairpin@snh48.com',
            username: 'liyitong',
            authority: '0',
            state: '0',
            updateAt: '1995-12-23 00:00',
            createAt: '1995-12-23 00:00'
          },
          {
            email: 'kotete@snh48.com',
            username: 'huangtingting',
            authority: '0',
            state: '0',
            updateAt: '1992-09-08 00:00',
            createAt: '1992-09-08 00:00'
          },
          {
            email: 'kh@snh48.com',
            username: 'khgay',
            authority: '0',
            state: '1',
            updateAt: '2017-01-11 00:00',
            createAt: '2017-01-11 00:00'
          }
        ]
      }
    },
    methods: {
    }
  }
</script>

<style lang="stylus" scoped>
</style>