<template>
	<el-card class="box-card">
		<div slot="header" class="clearfix">
		    <el-radio class="radio" v-model="radio" label="1">所有用户</el-radio>
  			<el-radio class="radio" v-model="radio" label="2">指定用户</el-radio>
		</div>
	  	<div class="text item" v-show="isAll">
	    	<el-row :gutter="20">
			  	<el-col :span="12">
					<el-row class="no-mb">
				  		<el-col :span="4">
				  			<span class="pdt10">
				  				未授权用户
				  			</span>
				  		</el-col>
					  	<el-col :span="13" :offset="7">
					  		<el-form :inline="true" :model="formAllApp" class="demo-form-inline">
							  	<el-form-item>
							    	<el-input v-model="formAllApp.keyword" class="ipt-w140" icon="search" placeholder="姓名、电话"></el-input>
							  	</el-form-item>
							  	<el-form-item>
							    	<el-button type="primary" @click="onSubmit">查询</el-button>
							  	</el-form-item>
							</el-form>
					  	</el-col>
					</el-row>
			  		<el-table :data="unAuthorizedUsers" height="360" style="width: 100%">
					    <el-table-column prop="username" label="姓名"></el-table-column>
			      		<el-table-column prop="mobile" label="电话"></el-table-column>
			      		<el-table-column  inline-template :context="_self" label="操作">
					      	<span v-show="row.mobile">
					        	<el-button @click="handleAdd($index,row)" type="text" size="small">添加</el-button>
					      	</span>
					    </el-table-column>
			    	</el-table>
			  	</el-col>
			  	<el-col :span="12">
				  	<el-row class="no-mb">
				  		<el-col :span="4">
				  			<span class="pdt10">
				  				已授权用户
				  			</span>
				  		</el-col>
					  	<el-col :span="13" :offset="7">
					  		<el-form :inline="true" :model="formAllApp" class="demo-form-inline">
							  	<el-form-item>
							    	<el-input v-model="formAllApp.keyword" class="ipt-w140" icon="search" placeholder="姓名、电话"></el-input>
							  	</el-form-item>
							  	<el-form-item>
							    	<el-button type="primary" @click="onSubmit">查询</el-button>
							  	</el-form-item>
							</el-form>
					  	</el-col>
					</el-row>
			  		<el-table :data="authorizedUsers" height="360" style="width: 100%">
			      		<el-table-column prop="username" label="姓名">
					    </el-table-column>
			      		<el-table-column prop="mobile" label="电话">
			      		</el-table-column>
			      		<el-table-column  inline-template :context="_self" label="操作">
					      	<span>
					        	<el-button @click="handleCancle($index,row)" type="text" size="small">删除</el-button>
					      	</span>
					    </el-table-column>
			    	</el-table>
			  	</el-col>
			</el-row>
	  	</div>
	</el-card>
</template>
<script>
import axios from 'axios'
import API from '../../api/API'
const api = new API();
export default{
	mounted(){
		
		this.loadUsers(this.appid);
	},
	props:['appid'],
	data() {
		return {
			radio:"1",
			isAll:false,
			authorizedUsers: [],
			unAuthorizedUsers: [],
			formAllApp:{
				keyword:""
			}
		}
	},
	watch:{
		radio(newVal,oldVal){
			if(newVal=="2"){
				this.isAll = true;
				
			}else{
				this.isAll = false;
			}
		},
		appid(newVal,oldVal){
			if(newVal!==oldVal){
				this.radio = "1";
				this.isAll = false;
				this.loadUsers(this.appid);
			}
		}
	},
	methods:{
		handleAdd(index,row){
			console.log(index,row);
			let that = this;
			let params = {
				api:"/getdbdata2",
				param:"exec xFool_p_addright '"+this.appid+"','"+row.name+"','"+row.mobile+"'"
			};
			api.post(params)
				.then(function(res){
					that.authorizedUsers.unshift(that.unAuthorizedUsers[index]);
					that.unAuthorizedUsers.splice(index,1);
					api.reqSuccess(that,'添加授权成功');
				})
				.catch(function(error){
					api.reqFail(that,"添加授权失败");
					console.log(error);
				})
		},
		handleCancle(index,row){
			console.log(index);
			
			let params = {
				api:"/getdbdata2",
				param:"exec xFool_p_deleteright '"+this.appid+"','"+row.mobile+"'"
			};
			let that = this;
			api.post(params)
				.then(function(res){
					that.unAuthorizedUsers.unshift(that.authorizedUsers[index]);
					that.authorizedUsers.splice(index,1);
					api.reqSuccess(that,'取消授权成功');
				})
				.catch(function(error){
					console.log(error);
					api.reqFail(that,"取消授权失败");
				})
		},
		onSubmit(){

		},
		loadUsers(id){
			this.loading2 = true;

			let that = this;
			//未授权用户
			let params1 = {
				api:"/getdbdata2",
				param:"select fname as username, isnull(fmobilephone,'') as mobile  from t_Emp order by username"
			};
			//已授权用户
			let params2 = {
				api:"/getdbdata2",
				param:"exec xFool_p_getright '80000001'"
			};
			this.uniqueUser();
			axios.all([api.get(params1), api.get(params2)])
			  	.then(axios.spread(function (res1, res2) {
			    	console.log(res1, res2)

			    	let data1 = JSON.parse(res1.data.data).sets[0].rows;
			    	let data2 = JSON.parse(res2.data.data).sets[0].rows;
			    	data1 = data2.concat(data1);
			    	that.unAuthorizedUsers = data1.uniqueUser();
			    	that.authorizedUsers = data2;
			    	that.loading2 = false;
			  	}))
			  	.catch(function(err){
					console.log(err);
					api.reqFail(that,"获取用户失败，请刷新后重新打开");
					that.loading2 = false;
				});
			
		},
		uniqueUser(){
			Array.prototype.uniqueUser = function() {
	            this.sort(function(a,b){
	            	return parseInt(a.mobile)-parseInt(b.mobile);
	            });
	            console.log(this)
	            var re = [this[0]];
	            for (var i = 1; i < this.length; i++) {
	                if (this[i].mobile == re[re.length - 1].mobile) {
	                    i++;
	                }else{
	                	re.push(this[i]);
	                }
	            }
	            return re;
	        };
		}
		
	}
}
</script>
<style>
.ipt-w140{
	width:140px;
}
.pdt10{
	display:inline-block;
	padding-top:10px;
}
</style>