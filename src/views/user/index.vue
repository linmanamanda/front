<template>
  <div class="user-view">
    <div class="filter-container">
      <!-- 邮箱搜索条件设置栏 -->
      <el-input
        v-model="query.email"
        placeholder="邮箱" 
        style="width: 200px;">
      </el-input>

      <!-- 用户名搜索条件设置栏 -->
      <el-input
        v-model="query.username" 
        placeholder="用户名" 
        style="width: 150px;">
      </el-input>

      <!-- 权限搜索条件设置栏 -->
      <el-select
        v-model="query.authority" 
        clearable
        placeholder="权限" 
        style="width: 120px">
        <el-option 
          :value="0" 
          label="普通用户">
        </el-option>
        <el-option 
          :value="1" 
          label="管理员">
        </el-option>
        <el-option 
          :value="2" 
          label="超级管理员">
        </el-option>
      </el-select>

      <!-- 状态搜索条件设置栏 -->
      <el-select
        v-model="query.status" 
        clearable
        placeholder="状态" 
        style="width: 120px">
        <el-option 
          :value="0"
          label="正常状态">
        </el-option>
        <el-option 
          :value="1"
          label="封禁状态">
        </el-option>
      </el-select>

      <el-button
        @click="search" 
        type="primary" 
        icon="search">
        搜索
      </el-button>

      <el-button type="primary" icon="document">导出</el-button>
    </div>

    <!-- 用户信息展示表格栏 -->
    <el-table 
      :data="data" 
      v-loading="loading"
      element-loading-text="正在全力加载用户信息中"
      style="width: 100%"
      border
      highlight-current-row>

      <el-table-column 
        prop="id"
        label="序号" 
        width="65px"
        align="center">
        <template scope="scope">
          <span>{{ scope.row.id }}</span>
        </template>
      </el-table-column>

      <el-table-column
        prop="email" 
        label="邮箱"
        min-width="210px"
        align="center">
        <template scope="scope">{{scope.row.email}}</template>
      </el-table-column>

      <el-table-column 
        prop="username"
        label="用户名"
        align="center">
        <template scope="scope">{{scope.row.username}}</template>
      </el-table-column>

      <el-table-column 
        prop="authority"
        label="权限"
        width="110px"
        :filters="[{text: '普通用户', value: '0'}, {text: '管理员', value: '1'}, {text: '超级管理员', value: '2'}]"
        :filter-method="authorityFilter"
        align="center">
        <template scope="scope">
          <el-tag
            :type="scope.row.authority | authorityTypeFilter"
          >{{scope.row.authority | authorityFilter}}</el-tag>
        </template>
      </el-table-column>

      <el-table-column 
        prop="status"
        label="状态"
        width="90px"
        :filters="[{text: '正常', value: '0'}, {text: '封禁', value: '1'}]"
        :filter-method="statusFilter"
        align="center">
        <template scope="scope">
          <el-tag :type="scope.row.status | statusTypeFilter">{{scope.row.status | statusFilter}}</el-tag>
        </template>
      </el-table-column>

      <el-table-column 
        prop="updatedAt"
        label="最新修改时间"
        sortable
        width="180px"
        align="center">
        <template scope="scope">{{scope.row.updatedAt}}</template>
      </el-table-column>

      <el-table-column 
        prop="createdAt"
        label="创建时间"
        sortable
        width="180px"
        align="center">
        <template scope="scope">{{scope.row.createdAt}}</template>
      </el-table-column>

      <el-table-column
        label="操作"
        min-width="150px"
        align="center">
        <template scope="scope">
          <el-button 
            type="warning" 
            size="small"
            @click="handleModification(scope.row)"
            >修改</el-button>
          <el-button 
            type="danger" 
            size="small"
            @click="deletionDialogVisiable = true"
            >删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 页面分页栏 -->
    <el-pagination
      layout="total, sizes, prev, pager, next, jumper"
      @current-change="handlePageChange"
      @size-change="handleSizeChange"
      :current-page="query.currentPage"
      :page-size="query.pageSize"
      :page-sizes="[5, 10]"
      :total="total">
    </el-pagination>

    <!-- 修改用户信息对话栏 -->
    <el-dialog
      title="修改用户信息"
      :visible="modificationDialogVisiable"
      :show-close="false"
      :close-on-click-modal="false"
      :close-on-press-escape="false">
      <el-form
        :model="modificationForm"
        label-width="80px">
        <el-form-item label="邮箱">
          <el-input v-model="modificationForm.email"></el-input>
        </el-form-item>
        <el-form-item label="用户名">
            <el-input v-model="modificationForm.username"></el-input>
        </el-form-item>
        <el-form-item label="权限">
          <el-select v-model="modificationForm.authority">
            <el-option label="普通用户" value="0"></el-option>
            <el-option label="管理员" value="1"></el-option>
            <el-option label="超级管理员" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="modificationForm.status">
            <el-option label="正常" value="0"></el-option>
            <el-option label="封禁" value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="warning" @click="modificationDialogVisiable = false">确认修改</el-button>
          <el-button @click="modificationDialogVisiable = false">取消</el-button>
        </el-form-item>
      </el-form>    
    </el-dialog>


    <!-- <el-dialog
      title="注意"
      :visible.sync="deletionDialogVisiable"
      size="tiny"
      :show-close="false"
      :close-on-click-modal="false"
      :close-on-press-escape="false">
      <span>是否确定删除此条用户信息？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="deletionDialogVisiable = false">取 消</el-button>
        <el-button type="danger" @click="deletionDialogVisiable = false">确 定</el-button>
      </span>
    </el-dialog> -->
  </div>
</template>

<script>
  // const mocklist = [
  //   {
  //     id: 1,
  //     email: 'linmanamanda@gmail.com',
  //     username: 'linman',
  //     authority: '2',
  //     status: '0',
  //     updatedAt: '2017-05-04 19:18',
  //     createdAt: '2017-05-04 19:18',
  //   },
  // ]


  import api from '@/api/user'
  import Layout from '@/components/common/Layout'

  export default {
    name: 'UserView',
    components: {
      Layout
    },
    data() {
      return {
        data: [],
        deletionDialogVisiable: false,
        modificationDialogVisiable: false,
        modificationForm: {
          email: '',
          username: '',
          authority: '',
          status: '',
        },
        query: {
          email: '',
          username: '',
          status: '',
          authority: '',
          pageSize: 5,
          currentPage: 1,
        },
        loading: true,
        total: 0
      }
    },
    created() {
      this.getUsers()
    },
    watch: {
      '$route': 'getUsers',
    },
    methods: {
      getUsers() {

        api.getUsers(this.query)
          .then((response) => {
            const code = response.code
            const data = response.data
            if (code === 0) {
              this.data = data.users
              this.total = data.total
              this.loading = false
            } else {
              // Promise.reject(new Error('获取用户信息失败，请稍后再试！'))
            }
          })
          .catch((error) => {

            this.loading = false
            
            this.$message({
              type: 'error',
              message: error.message,
              showClose: true,
              duration: 0
            })
          })
      },
      search() {
        this.getUsers()
      },
      handlePageChange(page) {
        this.query.currentPage = page
        this.getUsers()
      },
      handleSizeChange(size) {
        this.query.pageSize = size
        this.getUsers()
      },
      authorityFilter(value, row) {
        return row.authority === value
      },
      statusFilter(value, row) {
        return row.status === value
      },
      handleDeletion() {

      },
      handleModification() {
        this.modificationDialogVisiable = true
      },
      handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
      }
    },
    filters: {
      authorityTypeFilter(authority) {
        const authorityTypeMap = {
          '0': 'grey',
          '1': 'success',
          '2': 'warning'
        }
        return authorityTypeMap[authority]
      },
      authorityFilter(authority) {
        const authorityMap = {
          '0': '普通用户',
          '1': '管理员',
          '2': '超级管理员'
        }
        return authorityMap[authority]
      },
      statusTypeFilter(status) {
        const statusTypeMap = {
          '0': 'success',
          '1': 'danger'
        }
        return statusTypeMap[status]
      },
      statusFilter(status) {
        const statusMap = {
          '0': '正常',
          '1': '封禁'
        }
        return statusMap[status]
      }
    }
  }
</script>

<style lang="stylus" scoped>
  .filter-container
    margin-bottom 15px
  .el-pagination
    padding 0
    margin-top 15px
</style>