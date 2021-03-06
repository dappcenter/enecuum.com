import {Line} from 'vue-chartjs';

export default {
  extends: Line,
  props: {
    chartData: Object,
    options: Object
  },
  mounted() {
    this.renderChart(this.chartData, this.options);
  }
}
