<template>
	<div>
		<el-table :data="tableData" style="width:100%" height="670" v-loading="loading2" element-loading-text="拼命加载中">
	  		<el-table-column inline-template label="已添加轻应用" >
		      	<div>
		      		<el-row class="no-mb">
					  	<el-col :span="2" class="pdtb5">
					  		<div class="app-img">
					  			<img :src="row.icon" style="height:100px;width:100px;">
					  		</div>
					  	</el-col>
					  	<el-col :span="22" class="pdtb5">
					  		<el-row :gutter="10" class="no-mb">
							  	<el-col :span="24">
							  		<span class="appname">{{row.appname}}</span>
							 	</el-col>
							</el-row>
							<el-row :gutter="10" class="no-mb">
							  	<el-col :span="2">
							  		开发公司：
							  	</el-col>
							  	<el-col :span="22">
							  		<span>{{row.cmpname}}</span>
							  	</el-col>
							</el-row>
					  		<el-row :gutter="10" class="no-mb">
							  	<el-col :span="2">
							  		开发者信息：
							  	</el-col>
							  	<el-col :span="22">
							  		<span>{{row.devname}}/{{row.mobile}}/{{row.email}}</span>
							  	</el-col>
							</el-row>
							<el-row :gutter="10" class="no-mb">
							  	<el-col :span="2">
							  		描述信息：
							  	</el-col>
							  	<el-col :span="22">
							  		<span>{{row.desc}}</span>
							  	</el-col>
							</el-row>
					  	</el-col>						  	
					</el-row>
		      	</div>
		      	
		    </el-table-column>
	  		
	  		<el-table-column :context="_self" inline-template label="操作" fixed="right" width="180" align="center">
		      	<div>
			        <el-button size="small" type="danger" @click="handleDelete($index, row)">
			          	移除应用
			        </el-button>
			        <div class="pdtb5"></div>
			        <el-button size="small" @click="handleEdit($index, row)">
			          	权限管理
			        </el-button>
		      	</div>
		    </el-table-column>
		</el-table>
	</div>
</template>
<script>
import API from '../../api/API'
const api = new API();
export default{
	beforeMount(){
		this.loading2 = true;
		let that = this;
		let params = {
			api:"/getdbdata2",
			param:"exec xFool_p_getapp '',1"
		};
		api.get(params)
			.then(function(res){
				console.log(JSON.parse(res.data.data).sets[0].rows);
				that.tableData = JSON.parse(res.data.data).sets[0].rows;
				that.loading2 = false;
			})
			.catch(function(err){
				console.log(err);
				that.loading2 = false;
				api.reqFail(that,"获取列表失败请刷新");
			});
	},
	data() {
		return {
			tableData: [],
			DEFAULT_IMAGE:'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7',
			dialogVisible:false,
			loading2:false,
			formAllApp:{
				keyword:""
			}
		}
	},
	methods:{
		handleEdit(index,row){
			console.log(index,row);
			this.dialogVisible = true;
			this.$emit('showDialog',row);
		},
		handleDelete(index,row){
			this.tableData.splice(index,1);
		},
		onSubmit() {
        	console.log('submit!');
      	}
	}
}
</script>
<style>
.ipt-w240{
	min-width:240px;
}
input::-webkit-input-placeholder {
	font-size: 13px;
}
input:-ms-input-placeholder { // IE10+
	font-size: 13px;
}
input:-moz-placeholder { // Firefox4-18
	font-size: 13px;
}
input::-moz-placeholder { // Firefox19+
	font-size: 13px;
}
</style>