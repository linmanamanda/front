<template>
  <div class="reply-view">
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

      <!-- 评论人搜索条件设置栏 -->
      <el-input
        v-model="query.repliedFrom" 
        placeholder="评论人" 
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
          label="正常">
        </el-option>
        <el-option 
          :value="1"
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

      <!-- <el-button type="primary" icon="document" class="filter-item">导出</el-button> -->
    </div>
    <!-- 评论信息展示表格栏 -->
    <el-table
      :data="data"
      v-loading="loading"
      element-loading-text="正在全力加载评论信息中"
      highlight-current-row
      style="width: 100%">
      <el-table-column type="expand">
        <template scope="scope">
          <el-form label-position="left" inline class="invitation-table-expand">
            <el-form-item label="ID">
              <span>{{ scope.row.id }}</span>
            </el-form-item>
            <el-form-item label="相约信息标题">
              <span>{{ scope.row.title }}</span>
            </el-form-item>
            <el-form-item label="状态">
              <span>{{ scope.row.status | statusFilter}}</span>
            </el-form-item>
            <el-form-item label="评论人">
              <span>{{ scope.row.repliedFrom }}</span>
            </el-form-item>
            <el-form-item label="创建时间">
              <span>{{ scope.row.createdAt}}</span>
            </el-form-item>
            <el-form-item label="最新修改时间">
              <span>{{ scope.row.updatedAt}}</span>
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
        width="70px"
        sortable
        align="center">
      </el-table-column>
      <el-table-column
        label="相约信息标题"
        prop="title"
        min-width="210px"
        align="center">
      </el-table-column>
      <el-table-column
        label="评论人"
        prop="repliedFrom"
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
  </div>
</template>

<script>
  // const mocklist = [
  //   {
  //     id: 1,
  //     invitation_id: 1,
  //     content: '阿阿阿，要期末了，一起自习吧',
  //     status: 0,
  //     type: 0,
  //     fromId: 5,
  //     toId: 0,
  //     createdAt: '2017-05-10 20:00:00',
  //     updatedAt: '2017-05-10 20:00:00',
  //   },
  //   {
  //     id: 2,
  //     invitation_id: 1,
  //     content: '一起一起！我现在就在老图二楼，来约！',
  //     status: 0,
  //     type: 0,
  //     fromId: 6,
  //     toId: 0,
  //     createdAt: '2017-05-10 20:00:00',
  //     updatedAt: '2017-05-10 20:00:00',
  //   },
  //   {
  //     id: 3,
  //     invitation_id: 1,
  //     content: '好巧！',
  //     status: 0,
  //     type: 1,
  //     fromId: 7,
  //     toId: 6,
  //     createdAt: '2017-05-10 20:00:00',
  //     updatedAt: '2017-05-10 20:00:00',
  //   },
  // ]

  import api from '@/api/reply'

  export default {
    name: 'ReplyView',
    data() {
      return {
        data: [],
        deletionDialogVisiable: false,
        deletionForm: {
          id: ''
        },
        modificationDialogVisiable: false,
        modificationForm: {

        },
        query: {
          id: '',
          title: '',
          repliedFrom: '',
          status: '',
          currentPage: 1,
          pageSize: 5,
        },
        loading: false,
        total: 0,
      }
    },
    created() {
      this.getReplys()
    },
    watch: {
      '$route': 'getReplys'
    },
    methods: {
      getReplys() {
        api.getReplys(this.query)
          .then((response) => {
            let code = response.code
            if (code === 0) {
              let data = response.data
              this.data = data.replys
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
        // this.getReplys()
      },
      handlePageChange(page) {
        this.query.currentPage = page
        // this.getReplys()
      },
      handleSizeChange(size) {
        this.query.pageSize = size
        // this.getReplys()
      },
      initModification(row) {
        this.modificationDialogVisiable = true
      },
      confirmModification() {
        api.updateReply(this.modificationForm) 
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
              this.getReplys()
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

      },
      confirmDeletion() {
        // api.deleteReply(this.deletionForm)
        //   .then((response) => {
        //     let code = response.code
        //     if (code === 0) {
        //       this.deletionDialogVisiable = false
        //       this.$message({
        //         type: 'success',
        //         message: '删除相约信息成功！',
        //         showClose: true,
        //         duration: 2 * 1000
        //       })
        //       this.loading = true
        //       this.getReplys()
        //     } else {
        //       let error = response.error
        //       this.deletionDialogVisiable = false
        //       this.$message({
        //         type: 'error',
        //         message: error.message,
        //         showClose: true,
        //         duration: 2 * 1000
        //       })
        //     }
        //   })
        //   .catch((error) => {
        //     this.deletionDialogVisiable = false
        //     this.$message({
        //       type: 'error',
        //       message: error.message,
        //       showClose: true,
        //       duration: 0
        //     })
        //   })
      },
    },
    filters: {
      statusTypeFilter(status) {
        const statusTypeMap = {
          '0': 'success',
          '1': 'danger',
        }
        return statusTypeMap[status]
      },
      statusFilter(status) {
        const statusMap = {
          '0': '正常',
          '1': '封禁',
        }
        return statusMap[status]
      },
    },
  }
</script>
