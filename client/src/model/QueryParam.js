
class QueryParam {
  constructor (props) {
    if (props.version !== '') this.version = props.version
    if (props.versionName !== '') this.versionName = props.versionName
    if (props.state !== '') this.state = props.state
    if (props.type !== '') this.type = props.type
    if (props.fileName !== '') this.fileName = props.fileName
    if (props.updateWay !== '') this.updateWay = props.updateWay
    if (props.downloadWay !== '') this.downloadWay = props.downloadWay
  }
}

export function createQueryParam (props) {
  return new QueryParam(props || {})
}
