<template>
  <div class="report-user-view">
    <!-- 评论信息展示表格栏 -->
    <el-table
      :data="data"
      v-loading="loading"
      element-loading-text="正在全力加载用户举报信息中"
      highlight-current-row
      style="width: 100%">
      <el-table-column
        label="ID"
        prop="id"
        width="75px"
        sortable
        align="center">
      </el-table-column>
      <el-table-column
        label="举报的用户"
        prop="user"
        min-width="210px"
        align="center">
      </el-table-column>
      <el-table-column
        label="原因"
        prop="reason"
        width="210px"
        align="center">
      </el-table-column>
      <el-table-column
        label="状态"
        prop="status"
        width="100px"
        align="center">
        <template scope="scope">
          <el-tag :type="scope.row.status | statusTypeFilter">{{ scope.row.status | statusFilter }}</el-tag>
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
            @click="initModification(scope.row)"
            >封禁</el-button>
          <el-button 
            type="danger" 
            size="small"
            @click="initDeletion(scope.row)"
            >删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  import api from '@/api/report'

  export default {
    name: 'ReportUserView',
    data() {
      return {
        data: [],
        deletionDialogVisiable: false,
        deletionForm: {
          id: ''
        },
        modificationDialogVisiable: false,
        modificationForm: {
          status: '',
          id: '',
        },
        query: {
          pageSize: 5,
          currentPage: 1,
        },
        loading: false,
        total: 0
      }
    },
    created() {
      this.getUserReports()
    },
    watch: {
      '$route': 'getUserReports',
    },
    methods: {
      getUserReports() {
        api.getUserReports(this.query)
          .then((response) => {
            let code = response.code
            if (code === 0) {
              let data = response.data
              this.data = data.reports
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
        this.getUserReports()
      },
      handlePageChange(page) {
        this.query.currentPage = page
        this.getUserReports()
      },
      handleSizeChange(size) {
        this.query.pageSize = size
        this.getUserReports()
      },
      handleDeletion() {

      },
      initModification(row) {
        this.modificationDialogVisiable = true
      },
      confirmModification() {
        api.updateUserReport(this.modificationForm) 
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
              this.getUserReports()
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
              this.getUserReports()
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
      statusTypeFilter(status) {
        const statusTypeMap = {
          '0': 'danger',
          '1': 'success',
        }
        return statusTypeMap[status]
      },
      statusFilter(status) {
        const statusMap = {
          '0': '未处理',
          '1': '已处理'
        }
        return statusMap[status]
      },
    }
  }
</script>

<style lang="stylus" scoped>
  
</style>