<template>
	<div>
		<el-card class="box-card">
		  	<div slot="header" class="clearfix">
		    	<span style="line-height: 36px;">公司名称：奇思科技</span>
		    	<el-button style="float: right;" type="success" @click="addApp">
		    		<span v-show="isAdd">
		    			<el-icon name="plus" class="pr8"></el-icon>添加应用
		    		</span>
		    		<span v-show="!isAdd">
		    			返回
		    		</span>
		    	</el-button>
		  	</div>
		  	<div class="text item">
		  		<keep-alive>
			        <component :is="currentView" @showDialog="showDialogList">
			            <!-- 非活动组件将被缓存！ -->
			        </component>
	        	</keep-alive>
			   	
		  	</div>
		  	
		</el-card>
		<el-dialog title="库存查询权限设置" v-model="dialogVisible" class="dialog-list" size="small">
			<DialogList :appid="appid"></DialogList>
		</el-dialog>
		
	</div>
</template>

<script>
import AddedList from "./added-list.vue"
import NoAddList from "./no-add-list.vue"
import DialogList from "./dialog.vue"
export default {
	data() {
		return {
			isAdd:true,
			currentView:"AddedList",
			dialogVisible:false,
			appid:""
		}
	},
	methods:{
		addApp(){
			console.log('add-app');
			this.isAdd = !this.isAdd;
			this.currentView = this.isAdd?"AddedList":"NoAddList";
		},
		showDialogList(obj){
			this.dialogVisible = true;
			this.appid = obj.appid;
		},
		closeDialog(){
			this.showDialog = false;
		}
	},
	components:{
		AddedList,
		NoAddList,
		DialogList
	}
}
</script>
<style>
.text {
    font-size: 14px;
}

.item {
    padding: 18px 0;
}

.clearfix:before,
.clearfix:after {
    display: table;
    content: "";
}
.clearfix:after {
    clear: both
}

.box-card {
    /*width: 480px;*/
}
.no-mb{
	margin-bottom:0 !important;
}
.app-img{
	max-height:100px;
	max-width:100px;
	border:1px solid #aaa;
}

.pr8{
	padding-right:8px;
}
.pdtb5{
	padding:5px 0;
}
.dialog-list .text {
    font-size: 14px;
}

.dialog-list .item {
    padding: 18px 0;
}

.dialog-list .box-card {
    
}
</style>