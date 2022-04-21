import React, { useEffect } from "react"
import { Select, Form } from "antd"

const SelectBox = (props) => {
  const { Option } = Select

  const { action, required } = props

  useEffect(() => {
    if (action) {
      action()
    }
  }, [action])

  return (
    <div className="select-wrapper">
      <Form.Item
        label={props.lable}
        name={props.name}
        rules={[{ required: required, message: `Please select item!` }]}
      >
        <Select
          showSearch
          mode={props.mode}
          placeholder="Select a item"
          optionFilterProp="label"
        >
          {props.categorySelect && (
            <Option key={"none"} value={null}>
              No parent category
            </Option>
          )}
          {props.brandSelect && (
            <Option key={"none"} value={null}>
              No parent brand
            </Option>
          )}
          {props[props.store] &&
            props[props.store].length &&
            props[props.store]
              .sort((a, b) => {
                if (a && b) {
                  if (
                    a[props.option].toLowerCase() <
                    b[props.option].toLowerCase()
                  ) {
                    return -1
                  }
                  if (
                    a[props.option].toLowerCase() >
                    b[props.option].toLowerCase()
                  ) {
                    return 1
                  }
                }
                return 0
              })
              .map((item, index) => {
                return (
                  <React.Fragment key={index}>
                    {item?.breadcrumbs ? (
                      <Option
                        value={item[props.value]}
                        label={item[props.option]}
                      >
                        {item.breadcrumbs.length
                          ? item.breadcrumbs.map((crumb) => `${crumb} / `)
                          : null}
                        {item[props.option]}
                      </Option>
                    ) : item?.parent ? (
                      <Option
                        value={item[props.value]}
                        label={item[props.option]}
                      >
                        {`${item.parent.name} / `}
                        {item[props.option]}
                      </Option>
                    ) : item ? (
                      <Option
                        value={item[props.value]}
                        label={item[props.option]}
                      >
                        {item[props.option]}
                      </Option>
                    ) : null}
                  </React.Fragment>
                )
              })}
        </Select>
      </Form.Item>
    </div>
  )
}

export default SelectBox
