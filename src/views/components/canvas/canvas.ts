import Chart, { ChartDataset } from 'chart.js/auto';

const canvasChart = document.getElementById('myChart') as HTMLCanvasElement;

const oliData = {
  labels: ["Великолепно", "Хорошо", "Удовлетворительно", "Разачарован"],
  datasets: [
    {
      data: [130, 70, 60, 0],
      backgroundColor: ["#FFBA9C", "#6FCF97", "#BC9CFF", "#909090"],
      borderColor: "white",
      borderWidth: 2
    }
  ],
};

const chartOptions = {
  rotation: 180,
  cutout: "85%",
  plugins: {
    title: {
      display: false,
      text: "Впечатления от номера",
    },
    legend: {
      position: "right" as const,
      align: "center" as const,
      labels: {
        font: {
          size: 14
        },
        color: 'rgba(31, 32, 65, 0.75)',
        boxWidth: 15,
        boxHeight: 15,
        borderRadius: 2,
      }
    },
    
  },
  animation: {
    animateRotate: false,
    animateScale: true
  },
 
  
};

const donutChart = new Chart(canvasChart, {
  type: "doughnut",
  data: oliData,
  options: chartOptions
});