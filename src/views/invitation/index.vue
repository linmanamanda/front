<template>
  <div class="invitation-view">
    <div class="filter-container">
      <!-- ID搜索条件设置栏 -->
      <el-input
        v-model="query.id"
        placeholder="ID" 
        style="width: 100px;"
        class="filter-item">
      </el-input>

      <!-- 标题搜索条件设置栏 -->
      <el-input
        v-model="query.title"
        placeholder="标题" 
        style="width: 200px;"
        class="filter-item">
      </el-input>

      <!-- 相约地点搜索条件设置栏 -->
      <el-input
        v-model="query.location" 
        placeholder="相约地点" 
        style="width: 150px;"
        class="filter-item">
      </el-input>

      <!-- 相约开始时间搜索条件设置栏 -->
      <el-date-picker
        v-model="query.begintime"
        type="datetime"
        placeholder="发布开始时间"
        class="filter-item">
      </el-date-picker>

      <!-- 相约结束时间搜索条件设置栏 -->
      <el-date-picker
        v-model="query.endtime"
        type="datetime"
        placeholder="发布结束时间"
        class="filter-item">
      </el-date-picker>

      <!-- 发布人搜索条件设置栏 -->
      <el-input
        v-model="query.createdBy" 
        placeholder="发布人" 
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
          label="等待相约">
        </el-option>
        <el-option 
          :value="1"
          label="相约成功">
        </el-option>
        <el-option 
          :value="2"
          label="信息已过期">
        </el-option>
        <el-option 
          :value="3"
          label="封禁">
        </el-option>
      </el-select>

      <el-button
        @click="search" 
        type="primary" 
        icon="search"
        class="filter-item">
        搜索
      </el-button>

      <el-button type="primary" icon="document" class="filter-item">导出</el-button>
    </div>

    <!-- 相约信息展示表格栏 -->
    <el-table
      :data="data"
      v-loading="loading"
      element-loading-text="正在全力加载相约信息中"
      highlight-current-row
      style="width: 100%">
      <el-table-column type="expand">
        <template scope="scope">
          <el-form label-position="left" inline class="invitation-table-expand">
            <el-form-item label="ID">
              <span>{{ scope.row.id }}</span>
            </el-form-item>
            <el-form-item label="标题">
              <span>{{ scope.row.title }}</span>
            </el-form-item>
            <el-form-item label="相约时间">
              <span>{{ scope.row.time | timeFilter}}</span>
            </el-form-item>
            <el-form-item label="地点">
              <span>{{ scope.row.location }}</span>
            </el-form-item>
            <el-form-item label="状态">
              <span>{{ scope.row.status | statusFilter}}</span>
            </el-form-item>
            <el-form-item label="发布人">
              <span>{{ scope.row.createdBy }}</span>
            </el-form-item>
            <el-form-item label="创建时间">
              <span>{{ scope.row.createdAt | timeFilter}}</span>
            </el-form-item>
            <el-form-item label="最新修改时间">
              <span>{{ scope.row.updatedAt | timeFilter}}</span>
            </el-form-item>
            <el-form-item label="内容">
              <span>{{ scope.row.content }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column
        label="ID"
        prop="id"
        width="75px"
        sortable
        align="center">
      </el-table-column>
      <el-table-column
        label="标题"
        prop="title"
        min-width="210px"
        align="center">
      </el-table-column>
      <el-table-column
        label="相约时间"
        prop="time"
        width="210px"
        sortable
        align="center">
        <template scope="scope">{{scope.row.time | timeFilter}}</template>
      </el-table-column>
      <el-table-column
        label="相约地点"
        prop="location"
        width="150px"
        align="center">
      </el-table-column>
      <el-table-column
        label="发布人"
        prop="createdBy"
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

    <!-- 修改相约信息对话栏 -->
    <el-dialog
      title="修改用户信息"
      :visible="modificationDialogVisiable"
      :show-close="false"
      :close-on-click-modal="false"
      :close-on-press-escape="false">
      <el-form
        :model="modificationForm"
        label-width="120px">
        <el-form-item label="相约信息ID">
          <el-input v-model="modificationForm.id" disabled></el-input>
        </el-form-item>
        <el-form-item label="相约信息发布人">
          <el-input v-model="modificationForm.createdBy" disabled></el-input>
        </el-form-item>
        <el-form-item label="标题">
          <el-input v-model="modificationForm.title"></el-input>
        </el-form-item>
        <el-form-item label="相约时间">
          <el-date-picker
            v-model="modificationForm.time"
            type="datetime">
          </el-date-picker>
          <!-- <el-input v-model="modificationForm.time"></el-input> -->
        </el-form-item>
        <el-form-item label="相约地点">
            <el-input v-model="modificationForm.location"></el-input>
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="modificationForm.status">
            <el-option 
              label="等待相约" 
              :value="0">
            </el-option>
            <el-option 
              label="相约成功" 
              :value="1">
            </el-option>
            <el-option 
              label="信息已过期" 
              :value="2">
            </el-option>
            <el-option 
              label="封禁" 
              :value="3">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="相约内容">
          <el-input 
            type="textarea"
            v-model="modificationForm.content"
            :rows="5"
            resize="none">
          </el-input>
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
      <span>是否确定删除此条相约信息？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="deletionDialogVisiable = false">取 消</el-button>
        <el-button type="danger" @click="confirmDeletion">确 定</el-button>
      </span>
    </el-dialog>    
  </div>
</template>

<script>

  const mocklist = [
    {
      id: 1,
      title: '期末复习约自习小伙伴',
      content: '宿舍在二教附近，求约小伙伴一起在老图自习',
      time: '2017-05-10 08:00:00',
      location: '重邮老图书馆',
      status: 0,
      createdBy: 1,
      createdAt: '2017-05-10 20:00:00',
      updatedAt: '2017-05-10 20:00:00',
    },
    {
      id: 2,
      title: '英语口语角约对练小伙伴',
      content: '英语口语角在春华秋实广场，求约小伙伴一起对练',
      time: '2017-05-10 20:00:00',
      location: '重邮春华秋实广场',
      status: 0,
      createdBy: 2,
      createdAt: '2017-05-10 20:00:00',
      updatedAt: '2017-05-10 20:00:00',
    }
  ]

  import { timeFilter } from '@/filters'
  import api from '@/api/invitation'

  export default {
    name: 'InvitationView',
    data() {
      return {
        data: [],
        deletionDialogVisiable: false,
        deletionForm: {
          id: '',
        },
        modificationDialogVisiable: false,
        modificationForm: {
          id: '',
          createdBy: '',
          title: '',
          time: '',
          location: '',
          status: '',
          content: '',
        },
        query: {
          id: '',
          title: '',
          begintime: '',
          endtime: '',
          location: '',
          status: '',
          createdBy : '',
          currentPage: 1,
          pageSize: 5,
        },
        loading: false,
        total: 0,
      }
    },
    created() {
      this.getInvitations()
    },
    watch: {
      '$route': 'getInvitations'
    },
    methods: {
      getInvitations() {
        api.getInvitations(this.query)
          .then((response) => {
            let code = response.code
            if (code === 0) {
              let data = response.data
              this.data = data.invitations
              this.total = data.total
              this.loading = false
            } else {
              this.loading = false
              let error = response.error
              this.$message({
                type: 'error',
                message: error.message,
                showClose: true,
                duration: 2 * 1000
              })
            }
          })
          .catch((error) => {
            this.loading = false
            this.$message({
              type: 'error',
              message: error.message,
              showClose: true, 
              duration: 2 * 1000
            })
          })
      },
      search() {
        this.getInvitations()
      },
      handlePageChange(page) {
        this.query.currentPage = page
        this.getInvitations()
      },
      handleSizeChange(size) {
        this.query.pageSize = size
        this.getInvitations()
      },
      initModification(row) {
        this.modificationDialogVisiable = true
        this.modificationForm.id = row.id
        this.modificationForm.createdBy = row.createdBy
        this.modificationForm.title = row.title
        this.modificationForm.time = timeFilter(row.time)
        this.modificationForm.location = row.location
        this.modificationForm.status = row.status
        this.modificationForm.content = row.content
      },
      confirmModification() {
        api.updateInvitation(this.modificationForm) 
          .then((response) => {
            let code = response.code
            if (code === 0) {
              this.modificationDialogVisiable = false
              this.$message({
                type: 'success',
                message: '修改相约信息成功！',
                showClose: true,
                duration: 2 * 1000
              })
              this.loading = true
              this.getInvitations()
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
        this.deletionDialogVisiable = true
        this.deletionForm.id = row.id
      },
      confirmDeletion() {
        api.deleteInvitation(this.deletionForm)
          .then((response) => {
            let code = response.code
            if (code === 0) {
              this.deletionDialogVisiable = false
              this.$message({
                type: 'success',
                message: '删除相约信息成功！',
                showClose: true,
                duration: 2 * 1000
              })
              this.loading = true
              this.getInvitations()
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
          '0': 'grey',
          '1': 'success',
          '2': 'warning',
          '3': 'danger',
        }
        return statusTypeMap[status]
      },
      statusFilter(status) {
        const statusMap = {
          '0': '等待相约',
          '1': '相约成功',
          '2': '信息已过期',
          '3': '封禁',
        }
        return statusMap[status]
      },
      timeFilter,
    },
  }
</script>
