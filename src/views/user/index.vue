<template>
  <div class="user-view">
    <div class="filter-container">
      <!-- ID搜索条件设置栏 -->
      <el-input
        v-model="query.id"
        placeholder="ID" 
        style="width: 100px;"
        class="filter-item">
      </el-input>

      <!-- 邮箱搜索条件设置栏 -->
      <el-input
        v-model="query.email"
        placeholder="邮箱" 
        style="width: 200px;"
        class="filter-item">
      </el-input>

      <!-- 用户名搜索条件设置栏 -->
      <el-input
        v-model="query.username" 
        placeholder="用户名" 
        style="width: 150px;"
        class="filter-item">
      </el-input>

      <!-- 权限搜索条件设置栏 -->
      <el-select
        v-model="query.authority" 
        clearable
        placeholder="权限" 
        style="width: 120px"
        class="filter-item">
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
        style="width: 120px"
        class="filter-item">
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
        icon="search"
        class="filter-item">
        搜索
      </el-button>

      <el-button 
        type="primary" 
        icon="document"
        class="filter-item">导出</el-button>
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
        label="ID" 
        width="75px"
        sortable
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
        <template scope="scope">{{scope.row.updatedAt | timeFilter}}</template>
      </el-table-column>

      <el-table-column 
        prop="createdAt"
        label="创建时间"
        sortable
        width="180px"
        align="center">
        <template scope="scope">{{scope.row.createdAt | timeFilter}}</template>
      </el-table-column>

      <el-table-column
        label="操作"
        min-width="150px"
        align="center">
        <template scope="scope">
          <el-button 
            type="warning" 
            size="small"
            @click="initModification(scope.row)"
            >修改</el-button>
          <el-button 
            type="danger" 
            size="small"
            @click="initDeletion(scope.row)"
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
        <el-form-item label="ID">
          <el-input v-model="modificationForm.id" disabled></el-input>
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input v-model="modificationForm.email" disabled></el-input>
        </el-form-item>
        <el-form-item label="用户名">
            <el-input v-model="modificationForm.username"></el-input>
        </el-form-item>
        <el-form-item label="权限">
          <el-select v-model="modificationForm.authority">
            <el-option 
              label="普通用户" 
              :value="0">
            </el-option>
            <el-option 
              label="管理员" 
              :value="1">
            </el-option>
            <el-option 
              label="超级管理员" 
              :value="2">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="modificationForm.status">
            <el-option 
              label="正常" 
              :value="0">
            </el-option>
            <el-option 
              label="封禁" 
              :value="1">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>    
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="confirmModification">确认修改</el-button>
        <el-button @click="modificationDialogVisiable = false">取消</el-button>
      </div>
    </el-dialog>


    <el-dialog
      title="注意"
      :visible.sync="deletionDialogVisiable"
      size="tiny"
      :show-close="false"
      :close-on-click-modal="false"
      :close-on-press-escape="false">
      <span>是否确定删除此条用户信息？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="deletionDialogVisiable = false">取 消</el-button>
        <el-button type="danger" @click="confirmDeletion">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import { timeFilter } from '@/filters'
  import api from '@/api/user'

  export default {
    name: 'UserView',
    data() {
      return {
        data: [],
        deletionDialogVisiable: false,
        deletionForm: {
          email: ''
        },
        modificationDialogVisiable: false,
        modificationForm: {
          id: '',
          email: '',
          username: '',
          authority: '',
          status: '',
        },
        query: {
          id: '',
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
            let code = response.code
            if (code === 0) {
              let data = response.data
              this.data = data.users
              this.total = data.total
              this.loading = false
            } else {
              this.loading = false
              let error = response.error
              this.$message({
                type: 'error',
                message: error.message,
                showClose: true,
                duration: 2 * 1000,
              })
            }
          })
          .catch((error) => {
            this.loading = false
            this.$message({
              type: 'error',
              message: error.message,
              showClose: true,
              duration: 2 * 1000,
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
      initModification(row) {
        this.modificationDialogVisiable = true
        this.modificationForm.id = row.id
        this.modificationForm.email = row.email
        this.modificationForm.username = row.username
        this.modificationForm.status = row.status
        this.modificationForm.authority = row.authority
      },
      confirmModification() {
        api.updateUser(this.modificationForm) 
          .then((response) => {
            let code = response.code
            if (code === 0) {
              this.modificationDialogVisiable = false
              this.$message({
                type: 'success',
                message: '修改用户信息成功！',
                showClose: true,
                duration: 2 * 1000
              })
              this.loading = true
              this.getUsers()
            } else {
              let error = response.error
              this.modificationDialogVisiable = false
              this.$message({
                type: 'error',
                message: error.message,
                showClose: true,
                duration: 2 * 1000
              })
            }
          })
          .catch((error) => {
            this.modificationDialogVisiable = false
            this.$message({
              type: 'error',
              message: error.message,
              showClose: true,
              duration: 2 * 1000
            })
          })
      },
      initDeletion(row) {
        this.deletionForm.email = row.email
        this.deletionDialogVisiable = true
      },
      confirmDeletion() {
        api.deleteUser(this.deletionForm)
          .then((response) => {
            let code = response.code
            if (code === 0) {
              this.deletionDialogVisiable = false
              this.$message({
                type: 'success',
                message: '删除用户成功！',
                showClose: true,
                duration: 2 * 1000
              })
              this.loading = true
              this.getUsers()
            } else {
              let error = response.error
              this.deletionDialogVisiable = false
              this.$message({
                type: 'error',
                message: error.message,
                showClose: true,
                duration: 2 * 1000
              })
            }
          })
          .catch((error) => {
            this.deletionDialogVisiable = false
            this.$message({
              type: 'error',
              message: error.message,
              showClose: true,
              duration: 0
            })
          })
      },
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
      },
      timeFilter
    }
  }
</script>
