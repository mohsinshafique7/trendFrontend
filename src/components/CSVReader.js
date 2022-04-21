import { Upload, message, Button } from "antd"
import { UploadOutlined } from "@ant-design/icons"

const CSVReader = ({ getCsvValues }) => {
  const csvFileToArray = (string) => {
    if (string !== undefined) {
      const csvHeader = string.slice(0, string.indexOf("\n")).split(",")
      //find index of new line
      //slice from 0 to index
      //split by , in array
      let csvRows = []
      let i = true
      let line = 0
      if (i) {
        csvRows = string.slice(string.indexOf("\n") + 1).split("\n")
      } else {
        csvRows = string.split("\n")
      }

      //find index of new line start add 1
      //make slice from index to end of text
      //convert into array each line
      //now we have each row as items in array

      const array = csvRows.map((i) => {
        const values = i.split(",")
        const obj = csvHeader.reduce((object, header, index) => {
          object[header] = values[index]
          return object
        }, {})
        return obj
      })
      // console.log("Final Data", array)
      const finalData = array.map((item, i) => {
        return Object.values(item)[line]
      })
      getCsvValues(finalData)
    } else {
      getCsvValues([])
    }

    // setArray(array)
  }
  // const headerKeys = Object.keys(Object.assign({}, ...array))

  const props = {
    name: "file",
    accept: "text/csv",
    action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
    maxCount: 1,
    beforeUpload: (file) => {
      const reader = new FileReader()
      reader.onload = (e) => {
        csvFileToArray(e.target.result)
      }
      reader.readAsText(file)
      return false
    },
    onChange(info) {
      if (info.file.status !== "uploading") {
      }
      if (info.file.status === "done") {
        message.success(`${info.file.name} file uploaded successfully`)
      } else if (info.file.status === "error") {
        message.error(`${info.file.name} file upload failed.`)
      }
    },
    onRemove: () => {
      csvFileToArray(undefined)
    },
  }

  return (
    <div>
      <Upload {...props} showUploadList={false}>
        <Button icon={<UploadOutlined />}>Click to Upload</Button>
      </Upload>
      {/* <Upload {...props}>
        <Button icon={<UploadOutlined />}>Click to Upload</Button>
      </Upload> */}
      {/* <form>
        <Button
          type="file"
          id={"csvFileInput"}
          accept={".csv"}
          onChange={handleOnChange}
          icon={<UploadOutlined />}
        >
          Upload File
        </Button>

        <Button
          onClick={(e) => {
            handleOnSubmit(e)
          }}
        >
          Upload
        </Button>
      </form> */}
      {/* <table>
        <thead>
          <tr key={"header"}>
            {headerKeys.map((key) => (
              <th>{key}</th>
            ))}
          </tr>
        </thead>

        <tbody>
          {array.map((item, id) => (
            <tr key={item.id}>
              {Object.values(item).map((val) => (
                <td>{val}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table> */}
    </div>
  )
}

export default CSVReader
