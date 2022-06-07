import React from "react"
import { DatePicker, Button } from "antd"
import moment from "moment"
const DateRange = ({ dataValues, setDataValues }) => {
  const { RangePicker } = DatePicker
  return (
    <div>
      <RangePicker
        onChange={(e) => {
          if (e !== null) {
            setDataValues((preValue) => {
              return {
                ...preValue,
                dates: {
                  startDate:
                    moment(e[0]) > moment().subtract(7, "days")
                      ? moment().subtract(7, "days").format("YYYY-MM-DD")
                      : moment(e[0]).format("YYYY-MM-DD"),
                  endDate:
                    moment(e[1]) > moment()
                      ? moment().format("YYYY-MM-DD")
                      : moment(e[1]).format("YYYY-MM-DD"),
                },
              }
            })
          }
        }}
        value={[
          moment(dataValues.dates.startDate),
          moment(dataValues.dates.endDate),
        ]}
        className="w-[550px]"
      />
      <div className="flex items-center justify-around pt-[10px] pb-[10px] ">
        <Button
          type="primary"
          onClick={() => {
            setDataValues((preValue) => {
              return {
                ...preValue,
                dates: {
                  startDate: moment()
                    .subtract(1, "months")
                    .format("YYYY-MM-DD"),
                  endDate: moment().format("YYYY-MM-DD"),
                },
              }
            })
          }}
        >
          Past Month
        </Button>
        <Button
          type="primary"
          onClick={() => {
            setDataValues((preValue) => {
              return {
                ...preValue,
                dates: {
                  startDate: moment()
                    .subtract(6, "months")
                    .format("YYYY-MM-DD"),
                  endDate: moment().format("YYYY-MM-DD"),
                },
              }
            })
          }}
        >
          Past 6 Month
        </Button>
        <Button
          type="primary"
          onClick={() => {
            setDataValues((preValue) => {
              return {
                ...preValue,
                dates: {
                  startDate: moment().subtract(1, "years").format("YYYY-MM-DD"),
                  endDate: moment().format("YYYY-MM-DD"),
                },
              }
            })
          }}
        >
          Past Year
        </Button>
        <Button
          type="primary"
          onClick={() => {
            setDataValues((preValue) => {
              return {
                ...preValue,
                dates: {
                  startDate: moment().subtract(5, "years").format("YYYY-MM-DD"),
                  endDate: moment().format("YYYY-MM-DD"),
                },
              }
            })
          }}
        >
          Past 5 Years
        </Button>
      </div>
    </div>
  )
}

export default DateRange
