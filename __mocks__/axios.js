//import fakeResponses from './fakeResponses'

function responses(method,path,data){
  switch(method){
    case 'get','GET':
      if(!!(/places/.exec(path))){
        return {status: 200, data: fakeResponses.mockPlaces}
      }
    default:
      let r = { status: 404, statusText: 'Not found', data:{msg:'Some error description'}}
      return r
  }
}
function axios({method, url, data, headers}){
  return new Promise((resolve,reject)=>{
    try{
      let path = getUrlPath(url)
      let resp = responses(method, url, data)
      if(resp.status <= 300 && resp.status >= 200){
        resolve(resp)
      }
      else{
        reject({message: 'Just for the lols', response:resp})
      }
    }catch(e){
      console.log('err',e)
    }
  })
}
let axiosObj = {
  get: function(url){
    return axios({method:'GET', url})
  },
  //post: function(url){
  //  return axios({method:'GET', url})
  //},

}

//export default axios
export default axiosObj
