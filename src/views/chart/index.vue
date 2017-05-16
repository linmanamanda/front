<template>
  <div class="chart-view">
    <div class="filter-container">
      <!-- 数据报表起始时间搜索条件设置栏 -->
      <el-date-picker
        v-model="query.begintime"
        type="datetime"
        placeholder="起始时间"
        class="filter-item">
      </el-date-picker>

      <!-- 数据报表结束时间搜索条件设置栏 -->
      <el-date-picker
        v-model="query.endtime"
        type="datetime"
        placeholder="结束时间"
        class="filter-item">
      </el-date-picker>

      <el-button
        @click="search" 
        type="primary" 
        icon="search"
        class="filter-item">
        查看
      </el-button>
    </div>
    <el-card class="chart-item" id="confirmInvitationPie"></el-card>
  </div>
</template>

<script>
  import { timeFilter } from '@/filters'
  import api from '@/api/chart'

  let echarts = require('echarts/lib/echarts')
  require('echarts/lib/chart/pie')
  require('echarts/lib/component/tooltip')
  require('echarts/lib/component/title');
  require('echarts/lib/component/legend')
  import confirmInvitationPieGenerator from '@/echarts/confirmInvitationPieGenerator'


  export default {
    name: 'ChartView',
    data() {
      return {
        confirmInvitationPie: {
          wait: 120,
          confirm: 400,
          expire: 20,
          ban: 5
        },
        query: {
          begintime: '',
          endtime: '',
        }
      }
    },
    created() {
      this.getCharts()
    },
    watch: {
      'confirmInvitationPie': function() {
        confirmInvitationPieGenerator.draw(echarts, 'confirmInvitationPie', {
          wait: this.confirmInvitationPie.wait,
          confirm: this.confirmInvitationPie.confirm,
          expire: this.confirmInvitationPie.expire,
          ban: this.confirmInvitationPie.ban
        })
      },
      '$route': 'getCharts'
    },
    methods: {
      getCharts() {
        api.getCharts(this.query)
          .then((response) => {
            let code = response.code
            if (code === 0) {
              let data = response.data
              this.confirmInvitationPie = data.confirmInvitationPie
            } else {
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
            this.$message({
              type: 'error',
              message: error.message,
              showClose: true, 
              duration: 2 * 1000
            })
          })
      },
      search() {
        this.getCharts()
      }
    }
  }
</script>

<style lang="stylus" scoped>
  .chart-item
    width 100%
    height 400px
    padding 20px 30px
</style>