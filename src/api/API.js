import axios from 'axios'
import config from './config'

// axios(config);
class API {
	//获取已授权列表
	get (param) {
		config.data.strSQL = param.param;
		return axios.post(param.api,{},config);
	}
	//添加授权
	post (param) {
		config.data.strSQL = param.param;
		return axios.post(param.api,{},config);
	}
	reqSuccess(obj,msg){
			obj.$message({
          		message: msg,
          		type: 'success'
        	});
	}
	reqFail(obj,msg){
			obj.$message({
          		message: msg,
          		type: 'success'
        	});
	}
}
export default API;