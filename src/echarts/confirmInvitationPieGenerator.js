// 相约信息完成饼状图
export default {
  draw: function(echarts, elId, { wait, confirm, expire, ban }) {
    let confirmInvitationPie = echarts.init(document.getElementById(elId))
    let options = {
      title: { 
        text: '相约信息完成率',
        x:'center' 
      },
      tooltip : {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)"
      },
      legend: {
        orient: 'vertical',
        left: 'left',
        data: ['等待相约', '相约成功', '信息已过期', '封禁']
      },
      series : [
        {
            name: '相约信息状态',
            type: 'pie',
            radius : '55%',
            center: ['50%', '60%'],
            data:[
              { value: wait, name:'等待相约' },
              { value: confirm, name:'相约成功' },
              { value: expire, name:'信息已过期' },
              { value: ban, name:'封禁' },
            ],
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
        }
      ]
    }
    confirmInvitationPie.setOption(options)
  }
}