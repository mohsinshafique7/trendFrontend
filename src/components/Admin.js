// import Loader from "../Loader/Loader"
// import Search from "../Search/Search"
// import BrandsTable from "components/Tables/BrandsTable"
// import { useGetAllManufacturers } from "../../Requests/ManufacturerRequest"
// import {
//   useGetAllBrands,
//   useCreateBrand,
//   useUpdateBrand,
// } from "../../Requests/BrandRequest"
// import { brandsCreateInputs } from "../../utils/FormInputs/BrandFormInputs"
// const Admin = () => {
//   const { mutate: createBrand } = useCreateBrand()
//   const { mutate: updateBrand } = useUpdateBrand("list")
//   const { isLoading: manufacturerIsLoading, data: manufacturerData } =
//     useGetAllManufacturers()
//   const {
//     isLoading: brandsIsLoading,
//     data: brandsData,
//     status: brandsStatus,
//   } = useGetAllBrands()

//   const onSendForm = (values) => {
//     createBrand(values)
//   }

//   const searchedData = useMemo(() => {
//     // const search = new RegExp(searchValue, "gi");
//     return brandsData?.brands.filter((o) =>
//       Object.keys(o).some((k) =>
//         String(o[k]).toLowerCase().includes(searchValue.toLowerCase())
//       )
//     )
//     // return brandsData?.brands.filter(
//     //   (item) => item.name.match(search) || item?.parent?.name.match(search) || item?.manufacture?.name.match(search)
//     // );
//   }, [searchValue, brandsData])
//   const setPage = (page) => {
//     setQueryParams((queryParams) => {
//       return {
//         ...queryParams,
//         page,
//       }
//     })
//   }

//   const setPerPage = (perPage) => {
//     setQueryParams((queryParams) => {
//       return {
//         ...queryParams,
//         perPage,
//       }
//     })
//   }
//   function onFinishEdit(values) {
//     const id = values.id
//     delete values["id"]
//     updateBrand({ id, values })
//   }
//   return (
//     <>
//       <div className="item-title">Brands</div>
//       <Search />
//       {brandsStatus === "success" && !brandsIsLoading && formInputs ? (
//         <>
//           <CoreForm
//             title={"Create Brand"}
//             inputData={formInputs.inputData}
//             selectData={formInputs.selectData}
//             onSendForm={onSendForm}
//           />
//           <BrandsTable
//             manufacturerData={manufacturerData}
//             brandsData={brandsData}
//             data={searchedData}
//             page={Number(queryParams.page)}
//             perPage={Number(queryParams.perPage)}
//             setPage={setPage}
//             setPerPage={setPerPage}
//             onFinishEdit={onFinishEdit}
//           />
//         </>
//       ) : (
//         <Loader />
//       )}
//     </>
//   )
// }

// export default Admin

import { useEffect, useState, useMemo } from "react"
import { useSelector } from "react-redux"
import qs from "query-string"
import CoreForm from "./ModalForm/CoreForm"
import UsersTable from "./Tables/UsersTable"
import { useGetAllUsers } from "../Requests/UsersRequests"
const Admin = () => {
  const { data, status } = useGetAllUsers()
  console.log(data)
  const [formInputs, setFormInputs] = useState(null)

  //   useEffect(() => {
  //     if (!brandsIsLoading && !manufacturerIsLoading) {
  //       setFormInputs(
  //         brandsCreateInputs(manufacturerData.manufacturers, brandsData.brands)
  //       )
  //     }
  //   }, [brandsIsLoading, manufacturerIsLoading, brandsData, manufacturerData])

  return (
    <div>{status === "success" && <UsersTable data={data?.data?.users} />}</div>
  )
}

export default Admin
