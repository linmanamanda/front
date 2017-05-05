<template>
  <div class="user-view">
    <div class="filter-container">
      <el-input placeholder="邮箱" style="width: 200px;"></el-input>

      <el-input placeholder="用户名" style="width: 150px;"></el-input>

      <el-select placeholder="权限" style="width: 80px">
        <el-option>普通用户</el-option>
        <el-option>管理员</el-option>
        <el-option>超级管理员</el-option>
      </el-select>

      <el-select placeholder="状态" style="width: 80px">
        <el-option>正常状态</el-option>
        <el-option>封禁状态</el-option>
      </el-select>

      <el-button type="primary" icon="search">搜索</el-button>

      <el-button type="primary" icon="document">导出</el-button>

      <el-checkbox>显示创建时间</el-checkbox>
    </div>

    <el-table 
      :data="data" 
      style="width: 100%"
      border
      highlight-current-row>
      <el-table-column 
        label="序号" 
        width="65px"
        align="center">
        <template scope="scope">
          <span>{{ scope.row.id }}</span>
        </template>
      </el-table-column>

      <el-table-column 
        label="邮箱"
        min-width="210px"
        align="center">
          <template scope="scope">{{scope.row.email}}</template>
      </el-table-column>

      <el-table-column 
        label="用户名"
        align="center">
          <template scope="scope">{{scope.row.username}}</template>
      </el-table-column>

      <el-table-column 
        label="权限"
        width="110px"
        align="center">
          <template scope="scope">
            <el-tag
              type="grey"
              v-if="scope.row.authority == 0"
            >普通用户</el-tag>
            <el-tag
              type="success"
              v-else-if="scope.row.authority == 1"
            >管理员</el-tag>
            <el-tag
              type="warning"
              v-else-if="scope.row.authority == 2"
            >超级管理员</el-tag>
          </template>
      </el-table-column>

      <el-table-column 
        label="状态"
        width="70px"
        align="center">
          <template scope="scope">
            <el-tag
              v-if="scope.row.state == 0"
              type="success"
            >正常</el-tag>
            <el-tag
              v-else-if="scope.row.state == 1"
              type="danger"
            >异常</el-tag>
          </template>
      </el-table-column>

      <el-table-column 
        label="最新修改时间"
        width="180px"
        align="center">
          <template scope="scope">{{scope.row.updateAt}}</template>
      </el-table-column>

      <el-table-column 
        label="创建时间"
        width="180px"
        align="center">
          <template scope="scope">{{scope.row.createAt}}</template>
      </el-table-column>

      <el-table-column
        label="操作"
        min-width="150px"
        align="center"
      >
        <template scope="scope">
          <el-button type="warning" size="small">修改</el-button>
          <el-button type="danger" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  const mocklist = [
  {
    id: 1,
    email: 'linmanamanda@gmail.com',
    username: 'linman',
    authority: '2',
    state: '0',
    updateAt: '2017-05-04 19:18',
    createAt: '2017-05-04 19:18',
     
  },
  {
    id: 2,
    email: 'whitehairpin@snh48.com',
    username: 'liyitong',
    authority: '0',
    state: '0',
    updateAt: '1995-12-23 00:00',
    createAt: '1995-12-23 00:00'
  },
  {
    id: 3,
    email: 'kotete@snh48.com',
    username: 'huangtingting',
    authority: '0',
    state: '0',
    updateAt: '1992-09-08 00:00',
    createAt: '1992-09-08 00:00'
  },
  {
    id: 4,
    email: 'kh@snh48.com',
    username: 'khgay',
    authority: '1',
    state: '1',
    updateAt: '2017-01-11 00:00',
    createAt: '2017-01-11 00:00'
  },
  {
    id: 5,
    email: 'jujinyi@snh48.com',
    username: 'jujinyi',
    authority: '0',
    state: '0',
    updateAt: '2017-05-06 01:00',
    createAt: '2017-05-06 01:00'
  },
  {
    id: 6,
    email: 'zengyanfen@snh48.com',
    username: 'zengyanfen',
    authority: '0',
    state: '0',
    updateAt: '2017-05-06 01:00',
    createAt: '2017-05-06 01:00'
  },
  {
    id: 7,
    email: 'fengxinduo@snh48.com',
    username: 'fengxinduo',
    authority: '0',
    state: '0',
    updateAt: '2017-05-06 01:00',
    createAt: '2017-05-06 01:00'
  },
]



  import Layout from '@/components/common/Layout'
  export default {
    name: 'UserView',
    components: {
      Layout
    },
    data() {
      return {
        data: mocklist
      }
    }
  }
</script>

<style lang="stylus" scoped>
  .filter-container
    margin-bottom 15px
</style>