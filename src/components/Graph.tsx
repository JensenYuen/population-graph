import React from "react";
import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts";
import { graphData } from "../pages/HomePage";

interface props {
  prefInfos: graphData[]
  className?: string
}

const Graph = ({ prefInfos }: props) => {
  const series = [{
      name: 'A',
      data: [0,0,0,0,0,0,0,0,0,0,0]
    }]

  const options = {
    chart: {
      type: 'spline'
    },
    title: {
      text: ''
    },
    yAxis: {
      title: {
        text: '人口数'
      }
    },
    xAxis: {
      title: {
        text: '年度'
      },
      accessibility: {
        rangeDescription: 'Range: 2010 to 2020'
      }
    },
    legend: {
      layout: 'vertical',
      align: 'right',
      verticalAlign: 'middle'
    },
    plotOptions: {
      series: {
        label: {
          connectorAllowed: false
        },
        pointStart: 2010
      }
    },
    series,
    responsive: {
      rules: [{
        condition: {
          maxWidth: 500
        },
        chartOptions: {
          legend: {
            layout: 'horizontal',
            align: 'center',
            verticalAlign: 'bottom'
          }
        }
      }]
    }
  }

  return (
    <HighchartsReact highcharts={Highcharts} options={options} />
  )
}

export default Graph;
