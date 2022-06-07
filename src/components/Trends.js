import { useState } from "react"
import {
  Space,
  Input,
  Cascader,
  Steps,
  Button,
  Row,
  Col,
  Popover,
  Form,
  Typography,
} from "antd"
import { options, Contries } from "../Categories"
import CoreForm from "../components/ModalForm/CoreForm"
import {
  CheckOutlined,
  LoadingOutlined,
  DeleteOutlined,
  EditOutlined,
} from "@ant-design/icons"
import moment from "moment"
import { useSelector } from "react-redux"
import Highcharts from "highcharts"
import {
  useGetIntrestOverTime,
  useGetIntrestByRegion,
} from "../Requests/GoogleTrendRequests"
import DateRange from "./ModalForm/DateRange"
import IntrestByRegions from "./Charts/IntrestByRegions"
import HC_exporting from "highcharts/modules/exporting"
import IntrestOverTime from "./Charts/IntrestOverTime"
const { TextArea } = Input
function Trends() {
  const { error } = useSelector((state) => {
    return {
      error: state.authSlice.error,
      errorType: state.authSlice.errorType,
    }
  })
  HC_exporting(Highcharts)
  const { Title } = Typography
  const { Step } = Steps
  const [bulk, setBulk] = useState()
  const [keyWord, setKeyWords] = useState("")
  const [dataValues, setDataValues] = useState({
    dates: {
      startDate: moment().subtract(1, "year").format("YYYY-MM-DD"),
      endDate: moment().format("YYYY-MM-DD"),
    },
    region: "",
    category: null,
    searchValues: [],
  })
  const { data: optionsTimelineChartData } = useGetIntrestOverTime(dataValues)

  const { data: optionsRegionslChartData } = useGetIntrestByRegion(dataValues)

  function filter(inputValue, path) {
    return path.some(
      (option) =>
        option.label.toLowerCase().indexOf(inputValue.toLowerCase()) > -1
    )
  }
  const textarea = [
    { label: "Bulk Data", name: "bulkData", required: "required" },
  ]
  const onSendForm = (data) => {
    const { bulkData } = data
    const arr = bulkData.trim().split("\n")
    setDataValues((pre) => {
      return { ...pre, searchValues: [...pre.searchValues, ...arr] }
    })
  }
  return (
    <div>
      <div className="w-full pt-[10px]  pb-[20px]">
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
            status={dataValues?.region?.length > 0 ? "finish" : "wait"}
            title="Region"
            icon={
              dataValues?.region?.length > 0 ? (
                <CheckOutlined />
              ) : (
                <LoadingOutlined />
              )
            }
          />

          <Step
            status={dataValues?.category !== null ? "finish" : "wait"}
            title="Category"
            icon={
              dataValues?.category === null ? (
                <LoadingOutlined />
              ) : (
                <CheckOutlined />
              )
            }
          />
          <Step
            status={dataValues?.searchValues?.length > 0 ? "finish" : "wait"}
            title="Key Words"
            icon={
              dataValues?.searchValues?.length > 0 ? (
                <CheckOutlined />
              ) : (
                <LoadingOutlined />
              )
            }
          />
        </Steps>
      </div>
      <div className="flex justify-between items-start  ">
        <div className="flex flex-col mr-[100px] w-[30%]">
          <label className="mb-[20px] ">Date</label>
          <DateRange dataValues={dataValues} setDataValues={setDataValues} />
          <label className="mb-[20px] mt-[10px]">Region</label>
          <Cascader
            className="w-[550px]"
            options={Contries}
            onChange={(value, selectedOptions) => {
              if (selectedOptions !== undefined) {
                setDataValues((preValue) => {
                  return {
                    ...preValue,
                    region: selectedOptions[selectedOptions.length - 1].value,
                  }
                })
              }
            }}
            placeholder="Please select"
            showSearch={{ filter }}
            // onSearch={(value) => console.log(value)}
            changeOnSelect={true}
          />
          <label className="mb-[20px] mt-[10px]">Category</label>
          <Cascader
            className="w-[550px]"
            options={options}
            onChange={(value, selectedOptions) => {
              if (selectedOptions !== undefined) {
                setDataValues((preValue) => {
                  return {
                    ...preValue,
                    category: selectedOptions[selectedOptions.length - 1].value,
                  }
                })
              }
            }}
            placeholder="Please select"
            showSearch={{ filter }}
            onSearch={(value) => console.log(value)}
            changeOnSelect={true}
          />

          <label className="mb-[20px] mt-[10px]">Keyword</label>
          <Input
            className="h-[35px]"
            value={keyWord}
            onChange={(e) => {
              setKeyWords(e.target.value)
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                setDataValues((pre) => {
                  return {
                    ...pre,
                    searchValues: [...pre.searchValues, e.target.value],
                  }
                })
                setKeyWords("")
              }
            }}
          />
          <div className="flex items-center justify-between mt-2 space-x-4">
            <Button
              type="primary"
              onClick={() => {
                setDataValues((pre) => {
                  return { ...pre, searchValues: [] }
                })
              }}
            >
              Reset
            </Button>
            <CoreForm
              title={"Insert Bulk"}
              areaData={textarea}
              onSendForm={onSendForm}
            />
          </div>

          <div className="w-[500px] flex justify-start flex-wrap space-x-2">
            {dataValues.searchValues.map((item, iddd) => {
              return (
                <div key={iddd} className="mt-3">
                  <Popover
                    content={
                      <div>
                        <Form
                          name="basic"
                          onFinish={(data) => {
                            let keyWordsItems = dataValues.searchValues
                            keyWordsItems[iddd] = data.keyWord

                            setDataValues((pre) => {
                              return {
                                ...pre,
                                searchValues: keyWordsItems,
                              }
                            })
                          }}
                          onFinishFailed={() => {
                            console.log("Error")
                          }}
                          autoComplete="off"
                        >
                          <Form.Item
                            className="flex flex-col"
                            label="Key Word"
                            name="keyWord"
                            initialValue={item}
                            rules={[
                              {
                                required: true,
                                message: "Please input your keyword!",
                              },
                            ]}
                          >
                            <Input />
                          </Form.Item>

                          <Form.Item>
                            <div className="flex  w-[300px] items-center justify-around ">
                              <Button
                                htmlType="submit"
                                type="primary"
                                icon={<EditOutlined />}
                              >
                                Edit
                              </Button>
                              <Button
                                onClick={() => {
                                  let keyWordsItems = dataValues.searchValues
                                  keyWordsItems.splice(iddd, 1)
                                  setDataValues((pre) => {
                                    return {
                                      ...pre,
                                      searchValues: keyWordsItems,
                                    }
                                  })
                                }}
                                type="primary"
                                icon={<DeleteOutlined />}
                                size={"middle"}
                              >
                                Delete
                              </Button>
                            </div>
                          </Form.Item>
                        </Form>
                      </div>
                    }
                    title="Key Word"
                  >
                    <Button type="primary" shape="round">
                      {item}
                    </Button>
                  </Popover>
                </div>
              )
            })}
          </div>
        </div>
        <div className="flex flex-col items-start w-[70%]">
          <Title>Know more trended insight to power your growth</Title>
          <Title level={3}>Powered by Google Search</Title>
          <Title level={3}>See Trends and deep dive search terms</Title>
          <Title level={3}>Track any search term, in any market</Title>
          <Title level={3}>All data is fully exportable</Title>
          <Title level={3}>Also see Youtube, News, Images</Title>
        </div>
      </div>

      <div>
        <div>
          {optionsTimelineChartData && (
            <IntrestByRegions
              optionsRegionslChartData={optionsRegionslChartData}
            />
          )}
        </div>
        <div>
          {optionsTimelineChartData && (
            <div>
              <IntrestOverTime
                optionsTimelineChartData={optionsTimelineChartData}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Trends
