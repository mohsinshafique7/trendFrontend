import React from "react"
import { Button } from "antd"
import Highcharts from "highcharts"
import HighchartsReact from "highcharts-react-official"
import { useEffect, useState } from "react"
const IntrestOverTime = ({ optionsTimelineChartData }) => {
  const [chartData, setChartData] = useState(null)
  useEffect(() => {
    setChartData({
      chart: {
        type: "spline",
        zoomType: "x",
        height: "500px",
        display: "block",
      },
      credits: { enabled: false },
      title: { text: "Intrest By Regions" },

      xAxis: {
        type: "category",
      },

      tooltip: {
        shared: true,
      },
      series: [...optionsTimelineChartData?.data?.sortedData],
    })
  }, [optionsTimelineChartData])
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
          className="m-2"
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
          type="primary"
          className=" m-2"
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

export default IntrestOverTime
