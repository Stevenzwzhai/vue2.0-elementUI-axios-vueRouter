<template>
	<div>
		<el-row class="no-mb">
		  	<el-col :span="6">
		  		<el-form :inline="true" :model="formAllApp" class="demo-form-inline">
				  	<el-form-item>
				    	<el-input v-model="formAllApp.keyword" class="ipt-w240" icon="search" placeholder="轻应用名称、开发者、开发者公司"></el-input>
				  	</el-form-item>
				  	<el-form-item>
				    	<el-button type="primary" @click="onSubmit">查询</el-button>
				  	</el-form-item>
				</el-form>
		  	</el-col>
		</el-row>
		<el-table :data="tableData" style="width: 100%"  height="610" v-loading="loading2" element-loading-text="拼命加载中">
	  		<el-table-column inline-template label="轻应用自定义移动商城">
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
		      	<div @click="handleAdd($index, row)">
			        <el-button size="small" type="success" v-show="!row.isAdded">		          	
			          	<el-icon name="plus" class="pr8"></el-icon>添加
			        </el-button>
			        <el-button size="small" type="success" :disabled="true" v-show="row.isAdded">		          	
			          	添加成功
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
			api:"/getdbdata3",
			param:"exec xFool_p_getpubapp 'qjb',''"
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
			tableData: [{
				date: '2016-05-02',
				name: '王小虎1',
				address: '上海市普陀区金沙江路 1518 弄',
				isAdded:false
			}, {
				date: '2016-05-04',
				name: '王小虎2',
				address: '上海市普陀区金沙江路 1517 弄',
				isAdded:false
			}, {
				date: '2016-05-01',
				name: '王小虎3',
				address: '上海市普陀区金沙江路 1519 弄',
				isAdded:false
			}, {
				date: '2016-05-03',
				name: '王小虎4',
				address: '上海市普陀区金沙江路 1516 弄',
				isAdded:false
			}],
			DEFAULT_IMAGE:'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7',
			isAdded:false,
			loading2:false,
			formAllApp:{
				keyword:""
			}
		}
	},
	methods:{
		handleAdd(index,row){
			console.log();
			this.tableData[index].isAdded = !this.tableData[index].isAdded;
		},
		onSubmit() {
        	console.log('submit!');
      	}
	}
}
</script>
<style>
.appname{
	font-size: 18px;
    display: inline-block;
    padding: 1px 0;
}
</style>