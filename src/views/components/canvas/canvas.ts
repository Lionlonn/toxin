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
  responsive: false,
  rotation: 180,
  cutout: "85%",
  padding: {
    top: 100
  },
  plugins: {
    title: {
      display: true,
      text: "Впечатления от номера",
      position: "top" as const,
      align: "start" as const,
      font: {
        size: 16
      }
    },
    legend: {
      position: "right" as const,
      align: "end" as const,
      textAlign: "center",
      labels: {
        font: {
          size: 14
        },
        color: 'rgba(31, 32, 65, 0.75)',
        boxWidth: 10,
        boxHeight: 10,
        borderRadius: 2,
        usePointStyle: true,
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
  options: chartOptions,
});

