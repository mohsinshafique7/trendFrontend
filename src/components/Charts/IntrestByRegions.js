import React from "react"
import { Button } from "antd"
import Highcharts from "highcharts"
import HighchartsReact from "highcharts-react-official"
import { useEffect, useState } from "react"
const IntrestByRegions = ({ optionsRegionslChartData }) => {
  const [chartData, setChartData] = useState(null)
  useEffect(() => {
    setChartData({
      chart: {
        type: "column",
        height: "500px",
      },
      credits: { enabled: false },
      title: { text: "Intrest By Regions" },
      xAxis: {
        type: "category",
        crosshair: true,
      },
      plotOptions: {
        series: {
          borderWidth: 0,
          dataLabels: {
            enabled: true,
            format: "{point.y:.1f}%",
          },
        },
      },
      series: [...optionsRegionslChartData?.data?.groupedData],
    })
  }, [optionsRegionslChartData])
  return (
    <div className="mt-10 shadow-lg">
      <HighchartsReact
        highcharts={Highcharts}
        options={chartData}
        immutable={false}
        updateArgs={[true, true, true]}
        allowChartUpdate={true}
      />
      <div className="flex justify-end">
        <Button
          className=" m-2"
          type="primary"
          onClick={() => {
            setChartData((pre) => {
              return {
                ...pre,
                chart: {
                  ...pre.chart,
                  height: `${Number(pre.chart.height.slice(0, -2)) + 100}px`,
                },
              }
            })
          }}
        >
          Increase Height
        </Button>
        <Button
          className=" m-2"
          type="primary"
          onClick={() => {
            setChartData((pre) => {
              return {
                ...pre,
                chart: {
                  ...pre.chart,
                  height: "500px",
                },
              }
            })
          }}
        >
          Reset Height
        </Button>
      </div>
    </div>
  )
}

export default IntrestByRegions
