Vue.component('line-chart', {
  extends: VueChartJs.Line,
  mounted () {
    this.gradient = this.$refs.canvas.getContext('2d').createLinearGradient(0, 0, 0, 450)
    this.gradient2 = this.$refs.canvas.getContext('2d').createLinearGradient(0, 0, 0, 450)

    this.gradient2.addColorStop(0,'rgba(83,154,168, 0.9)')
    this.gradient2.addColorStop(0.5,'rgba(83,154,168, 0.5)');
    this.gradient2.addColorStop(1,'rgba(83,154,168, 0.2)');
    
    this.gradient.addColorStop(0,'#9400D3')
    this.gradient.addColorStop(0.5,'#9867C5');
    this.gradient.addColorStop(1,'rgba(247,108,6, 0)');


    this.renderChart({
      labels: ['Januari', 'Februari', 'Maart', 'April', 'Mei', 'Juni', 'Juli'],
      datasets: [
        {
          label: 'max. Temperatuur',
          borderColor: '#9400D3',
          pointBackgroundColor: 'black',
          borderWidth: 1,
          pointBorderColor: 'white',
          backgroundColor: this.gradient,
          data: [40, 39, 10, 40, 45, 80, 40]
        },{
          label: 'min. Temperatuur',
          borderColor: '#05CBE1',
          pointBackgroundColor: 'black',
          pointBorderColor: 'white',
          borderWidth: 1,
          backgroundColor: this.gradient2,
          data: [60, 55, 32, 10, 2, 12, 53]
        }
      ]
    }, {responsive: true, maintainAspectRatio: false})

  }
  
})

var vm = new Vue({
  el: '.temperatuur',
  data: {
    message: 'Vue JS Test'
  }
})
