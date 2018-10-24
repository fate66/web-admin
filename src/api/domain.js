import base from '../../base'

const adminApi = process.env.NODE_ENV === 'production' ? '' : base.proxyTableNameVersionAdmin
const webApi = process.env.NODE_ENV === 'production' ? '' : base.proxyTableNameVersionWeb
const imgApi = (process.env.NODE_ENV === 'production') ? base.proxyTableNameImgVersion ? base.proxyTableNameImgVersion : '' : base.proxyTableNameImgVersion ? base.proxyTableNameImgVersion : base.proxyTableNameImgVersion

export {
  adminApi,
  webApi,
  imgApi
}
