import { useEffect, useState } from "react"
import output_onlinepngtools from "../assets/output_onlinepngtools.png"
import FileDownload from "js-file-download"
import {
  Space,
  DatePicker,
  Select,
  Input,
  Tag,
  Cascader,
  Steps,
  Button,
  Row,
  Col,
  Image,
  Typography,
} from "antd"
import { options, Contries } from "../Categories"
import {
  CheckOutlined,
  LoadingOutlined,
  CloseOutlined,
} from "@ant-design/icons"
import moment from "moment"
import Highcharts from "highcharts"
// import drilldown from "highcharts/modules/drilldown"
import HighchartsReact from "highcharts-react-official"
import axios from "axios"
import CSVReader from "../components/CSVReader"
import DateRange from "./ModalForm/DateRange"

function Trends() {
  // drilldown(Highcharts)
  const { Title } = Typography
  const { Step } = Steps
  const [keyWord, setKeyWords] = useState("")
  const [dataValues, setDataValues] = useState({
    dates: {
      startDate: moment().subtract(7, "days").format("YYYY-MM-DD"),
      endDate: moment().format("YYYY-MM-DD"),
    },
    country: "",
    category: null,
    keywords: [],
  })
  const [optionsRegionslChart, setOptionRegionslChart] = useState()
  const [optionsTimelineChart, setOptionTimelinelChart] = useState()

  function getCsvValues(values) {
    setDataValues((pre) => {
      return { ...pre, keywords: [...values.slice(0, 15)] }
    })
  }
  async function getDataByRegion() {
    const { dates, keywords, country, category } = dataValues
    const { startDate, endDate } = dates
    const data = await axios.get(
      `http://localhost:9000/byregion?startdate=${startDate}&enddate=${endDate}&keywods=${keywords}&country=${country}&category=${category}`
    )

    await setOptionRegionslChart({
      chart: {
        type: "column",
      },
      title: {
        text: "Trends In Regions",
      },
      subtitle: {
        text: "Trends",
      },
      xAxis: {
        categories: [...data.data.keywords],
        crosshair: true,
      },
      yAxis: {
        min: 0,
        title: {
          text: "Percentage",
        },
      },
      credits: {
        enabled: false,
      },
      tooltip: {
        headerFormat:
          '<div style=width: 30px;><span style="font-size:10px">{point.key}</span><table>',
        pointFormat:
          '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
          '<td style="padding:0"><b>{point.y:.1f} %</b></td></tr>',
        footerFormat: "</table></div>",

        shared: true,
        useHTML: true,
      },
      plotOptions: {
        column: {
          pointPadding: 0.2,
          borderWidth: 0,
        },
      },
      series: [...data.data.regionalData],
    })

    console.log("TimelineData", data.data.timelineData)
    await setOptionTimelinelChart(
      {
        chart: {
          type: "spline",
          zoomType: "x",
        },
        credits: {
          enabled: false,
        },
        title: {
          text: "Trend Over Time In Region",
        },
        subtitle: {
          text: "Trends",
        },
        xAxis: {
          type: "category",
          // labels: {
          //   format: "{value:%Y-%b-%e}",
          // },

          // dateTimeLabelFormats: {
          //   // don't display the dummy year
          //   month: "%e. %b",
          //   year: "%b",
          // },
          title: {
            text: "Date",
          },
        },
        yAxis: {
          title: {
            text: "Snow depth (m)",
          },
          min: 0,
        },
        tooltip: {
          headerFormat: "<b>{series.name}</b><br>",
          // pointFormat: "{point.x:%e. %b}: {point.y:.2f} m",
        },

        plotOptions: {
          series: {
            marker: {
              enabled: true,
            },
          },
        },

        // colors: ["#6CF", "#39F", "#06C", "#036", "#000"],

        // Define the data points. All series have a dummy year
        // of 1970/71 in order to be compared on the same x axis. Note
        // that in JavaScript, months start at 0 for January, 1 for February etc.
        series: [...data.data.timelineData],

        responsive: {
          rules: [
            {
              condition: {
                maxWidth: 500,
              },
              chartOptions: {
                plotOptions: {
                  series: {
                    marker: {
                      radius: 2.5,
                    },
                  },
                },
              },
            },
          ],
        },
      }
      //   {
      //   title: {
      //     text: "Trend Over Dates In Region",
      //   },

      //   subtitle: {
      //     text: "Source: Google Trends",
      //   },

      //   yAxis: {
      //     title: {
      //       text: "Percentage",
      //     },
      //   },

      //   xAxis: {
      //     type: "category",
      //   },

      //   plotOptions: {
      //     series: {
      //       label: {
      //         connectorAllowed: false,
      //       },
      //       pointStart: 2010,
      //     },
      //   },

      //   series: [...data.data.timelineData],

      //   responsive: {
      //     rules: [
      //       {
      //         condition: {
      //           maxWidth: 500,
      //         },
      //         chartOptions: {
      //           legend: {
      //             layout: "horizontal",
      //             align: "center",
      //             verticalAlign: "bottom",
      //           },
      //         },
      //       },
      //     ],
      //   },
      // }
    )
  }

  useEffect(() => {
    console.log("triggered")
    if (
      dataValues?.dates?.startDate?.length > 0 &&
      dataValues?.dates?.endDate?.length > 0 &&
      dataValues?.country?.length > 0 &&
      dataValues?.keywords?.length > 0
    ) {
      console.log("triggered sds")
      getDataByRegion()
    }
  }, [dataValues])
  function filter(inputValue, path) {
    return path.some(
      (option) =>
        option.label.toLowerCase().indexOf(inputValue.toLowerCase()) > -1
    )
  }
  const downloadFile = async () => {
    const { dates, keywords, country, category } = dataValues
    const { startDate, endDate } = dates
    axios({
      url: `http://localhost:9000/getregionaldatafile?startdate=${startDate}&enddate=${endDate}&keywods=${keywords}&country=${country}&category=${category}`,
      method: "GET",
      responseType: "blob", // Important
    }).then((response) => {
      FileDownload(response.data, "report.csv")
    })
  }

  return (
    <div>
      {/* Row For Steps */}
      <Row gutter={[16, 32]}>
        <Col span={24}>
          <Steps labelPlacement="horizontal" size="large">
            <Step
              status={
                dataValues?.dates?.startDate?.length > 0 &&
                dataValues?.dates?.endDate?.length > 0
                  ? "finish"
                  : "wait"
              }
              title="Dates"
              icon={
                dataValues?.dates?.startDate?.length > 0 &&
                dataValues?.dates?.endDate?.length > 0 ? (
                  <CheckOutlined />
                ) : (
                  <LoadingOutlined />
                )
              }
            />

            <Step
              status={dataValues?.country?.length > 0 ? "finish" : "wait"}
              title="Region"
              icon={
                dataValues?.country?.length > 0 ? (
                  <CheckOutlined />
                ) : (
                  <LoadingOutlined />
                )
              }
            />

            <Step
              status={dataValues?.keywords?.length > 0 ? "finish" : "wait"}
              title="Category"
              icon={
                dataValues?.keywords?.length > 0 ? (
                  <CheckOutlined />
                ) : (
                  <LoadingOutlined />
                )
              }
            />
          </Steps>
        </Col>
      </Row>

      <Row>
        <Col span={12}>
          <Space
            direction="vertical"
            align="baseline"
            style={{ marginLeft: "20px" }}
            size="small"
          >
            <label>Date</label>
            <DateRange dataValues={dataValues} setDataValues={setDataValues} />

            <label>Region</label>
            <Cascader
              options={Contries}
              style={{ width: 550 }}
              onChange={(value, selectedOptions) => {
                if (selectedOptions !== undefined) {
                  setDataValues((preValue) => {
                    return {
                      ...preValue,
                      country:
                        selectedOptions[selectedOptions.length - 1].value,
                    }
                  })
                }
              }}
              placeholder="Please select"
              showSearch={{ filter }}
              onSearch={(value) => console.log(value)}
              changeOnSelect={true}
            />
            <label>Category</label>
            <Cascader
              options={options}
              style={{ width: 550 }}
              onChange={(value, selectedOptions) => {
                if (selectedOptions !== undefined) {
                  console.log(selectedOptions[selectedOptions.length - 1].value)
                  setDataValues((preValue) => {
                    return {
                      ...preValue,
                      category:
                        selectedOptions[selectedOptions.length - 1].value,
                    }
                  })
                }
              }}
              placeholder="Please select"
              showSearch={{ filter }}
              onSearch={(value) => console.log(value)}
              changeOnSelect={true}
            />

            <label>Keyword</label>
            <Input
              value={keyWord}
              style={{ width: 550 }}
              onChange={(e) => {
                setKeyWords(e.target.value)
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  if (dataValues.keywords.length < 10) {
                    setDataValues((pre) => {
                      return {
                        ...pre,
                        keywords: [...pre.keywords, e.target.value],
                      }
                    })
                    setKeyWords("")
                  } else {
                    alert("Max Limit is 10")
                  }
                }
              }}
            />
            <Space>
              <Button
                type="primary"
                align="left"
                onClick={() => {
                  setDataValues((pre) => {
                    return { ...pre, keywords: [] }
                  })
                  setOptionRegionslChart(null)
                  setOptionTimelinelChart(null)
                }}
                style={{ backgroundColor: "#636ddb" }}
              >
                Reset
              </Button>

              <CSVReader getCsvValues={getCsvValues} />
            </Space>

            <Space direction="horizental" wrap={true} style={{ width: 550 }}>
              {dataValues.keywords.map((item, iddd) => {
                return (
                  <Button
                    key={iddd}
                    style={{ backgroundColor: "#636ddb" }}
                    onClick={() => {
                      let keyWordsItems = dataValues.keywords
                      keyWordsItems.splice(iddd, 1)
                      setDataValues((pre) => {
                        return { ...pre, keywords: keyWordsItems }
                      })
                    }}
                    type="primary"
                    shape="round"
                    icon={<CloseOutlined />}
                    size={"middle"}
                  >
                    {item}
                  </Button>
                )
              })}
            </Space>
          </Space>
        </Col>
        <Col md={24} lg={12} sm={24} xs={24} xl={12} xxl={12}>
          <Title>Know more trended insight to power your growth</Title>
          <Title level={3}>Powered by Google Search</Title>
          <Title level={3}>See Trends and deep dive search terms</Title>
          <Title level={3}>Track any search term, in any market</Title>
          <Title level={3}>All data is fully exportable</Title>
          <Title level={3}>Also see Youtube, News, Images</Title>
        </Col>
      </Row>

      <Row gutter={[16, 32]}>
        <Col span={24}>
          {optionsRegionslChart && (
            <div>
              <HighchartsReact
                highcharts={Highcharts}
                options={optionsRegionslChart}
                immutable={false}
                updateArgs={[true, true, true]}
                allowChartUpdate={true}
              />
              <Button
                type="primary"
                onClick={downloadFile}
                style={{ backgroundColor: "#636ddb" }}
              >
                Export Data
              </Button>
            </div>
          )}
        </Col>
      </Row>
      <Row gutter={[16, 32]}>
        <Col span={24}>
          {optionsTimelineChart && (
            <div>
              <HighchartsReact
                highcharts={Highcharts}
                options={optionsTimelineChart}
                immutable={false}
                updateArgs={[true, true, true]}
                allowChartUpdate={true}
              />
              {/* <Button
                type="primary"
                // onClick={downloadFile}
                style={{ backgroundColor: "#636ddb" }}
              >
                Export Data
              </Button> */}
            </div>
          )}
        </Col>
      </Row>
    </div>
  )
}

export default Trends
