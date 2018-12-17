import {webApi} from './domain'

export default {
  user: {
    login: webApi + '/v1/user/login',
    regist: webApi + '/v1/user/regist',
    uuid: webApi + '/v1/user/userSignFu'
  },
  supplier: {
    editSupplier: webApi + '/v1/supplier/editSupplier',
    supplierList: webApi + '/v1/supplier/supplierList',
    supplierDetail: webApi + '/v1/supplier/supplierDetail',
    supplierDel: webApi + '/v1/supplier/supplierDel'
  },
  storeHouse: {
    storeHouseAdd: webApi + '/v1/storeHouse/storeHouseAdd',
    storeHouseList: webApi + '/v1/storeHouse/storeHouseList',
    storeHouseDetail: webApi + '/v1/storeHouse/storeHouseDetail',
    storeHouseDel: webApi + '/v1/storeHouse/storeHouseDel'
  },
  customer: {
    customerAdd: webApi + '/v1/customer/customerAdd',
    customerList: webApi + '/v1/customer/customerList',
    customerDetail: webApi + '/v1/customer/customerDetail',
    customerDel: webApi + '/v1/customer/customerDel'
  },
  features: {
    featuresUpload: webApi + '/v1/features/upload'
  }

}
