<template>
  <div class="report-invitation-view">
    <div class="filter-container">
      <!-- ID搜索条件设置栏 -->
      <el-input
        v-model="query.id"
        placeholder="ID" 
        style="width: 100px;"
        class="filter-item">
      </el-input>

      <!-- 相约信息标题搜索条件设置栏 -->
      <el-input
        v-model="query.title"
        placeholder="举报的相约信息标题" 
        style="width: 200px;"
        class="filter-item">
      </el-input>

      <!-- 举报原因搜索条件设置栏 -->
      <el-input
        v-model="query.reason" 
        placeholder="举报原因" 
        style="width: 150px;"
        class="filter-item">
      </el-input>

      <!-- 状态搜索条件设置栏 -->
      <el-select
        v-model="query.status" 
        clearable
        placeholder="状态" 
        style="width: 120px"
        class="filter-item">
        <el-option 
          :value="0"
          label="未处理">
        </el-option>
        <el-option 
          :value="1"
          label="已处理">
        </el-option>
      </el-select>

      <el-button
        @click="search" 
        type="primary" 
        icon="search"
        class="filter-item">
        搜索
      </el-button>

      <!-- <el-button 
        type="primary" 
        icon="document"
        class="filter-item">导出</el-button> -->
    </div>

    <!-- 相约信息的举报信息展示表格栏 -->
    <el-table
      :data="data"
      v-loading="loading"
      element-loading-text="正在全力加载相约信息举报信息中"
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
        label="举报的相约信息的标题"
        prop="title"
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
            :disabled="scope.row.status === 1"
            @click="initBan(scope.row)"
            >封禁</el-button>
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

    <el-dialog
      title="注意"
      :visible.sync="banDialogVisiable"
      size="tiny"
      :show-close="false"
      :close-on-click-modal="false"
      :close-on-press-escape="false">
      <span>是否确定封禁此相约信息？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="banDialogVisiable = false">取 消</el-button>
        <el-button type="danger" @click="confirmBan">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog
      title="注意"
      :visible.sync="deletionDialogVisiable"
      size="tiny"
      :show-close="false"
      :close-on-click-modal="false"
      :close-on-press-escape="false">
      <span>是否确定删除此条举报信息？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="deletionDialogVisiable = false">取 消</el-button>
        <el-button type="danger" @click="confirmDeletion">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import { timeFilter } from '@/filters'
  import api from '@/api/report'

  export default {
    name: 'ReportInvitationView',
    data() {
      return {
        data: [],
        deletionDialogVisiable: false,
        deletionForm: {
          id: ''
        },
        banDialogVisiable: false,
        banForm: {
          invitationId: '',
        },
        query: {
          id: '',
          title: '',
          reason: '',
          status: '',
          pageSize: 5,
          currentPage: 1,
        },
        loading: false,
        total: 0
      }
    },
    created() {
      this.getInvitationReports()
    },
    watch: {
      '$route': 'getInvitationReports',
    },
    methods: {
      getInvitationReports() {
        api.getInvitationReports(this.query)
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
        this.getInvitationReports()
      },
      handlePageChange(page) {
        this.query.currentPage = page
        this.getInvitationReports()
      },
      handleSizeChange(size) {
        this.query.pageSize = size
        this.getInvitationReports()
      },
      initBan(row) {
        this.banDialogVisiable = true
        this.banForm.invitationId = row.invitationId
      },
      confirmBan() {
        api.banInvitation(this.banForm) 
          .then((response) => {
            let code = response.code
            if (code === 0) {
              this.banDialogVisiable = false
              this.$message({
                type: 'success',
                message: '封禁相约信息成功！',
                showClose: true,
                duration: 2 * 1000
              })
              this.loading = true
              this.getInvitationReports()
            } else {
              let error = response.error
              this.banDialogVisiable = false
              this.$message({
                type: 'error',
                message: error.message,
                showClose: true,
                duration: 2 * 1000
              })
            }
          })
          .catch((error) => {
            this.banDialogVisiable = false
            this.$message({
              type: 'error',
              message: error.message,
              showClose: true,
              duration: 2 * 1000
            })
          })
      },
      initDeletion(row) {
        this.deletionForm.id = row.id
        this.deletionDialogVisiable = true
      },
      confirmDeletion() {
        api.deleteInvitationReport(this.deletionForm)
          .then((response) => {
            let code = response.code
            if (code === 0) {
              this.deletionDialogVisiable = false
              this.$message({
                type: 'success',
                message: '删除举报用户信息成功！',
                showClose: true,
                duration: 2 * 1000
              })
              this.loading = true
              this.getInvitationReports()
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
      timeFilter,
    }
  }
</script>
