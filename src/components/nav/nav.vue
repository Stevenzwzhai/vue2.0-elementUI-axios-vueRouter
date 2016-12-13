<template>
	
        <el-menu default-active="2" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" theme="dark">
	        <el-menu-item index="2">
	        	<router-link to="/">我的轻应用</router-link>
	    	</el-menu-item>
  
</template>

<script>
export default{
	data(){
		return {

		}
	},
	methods:{
		handleOpen(){

		},
		handleClose(){

		}
	}
}
</script>
<style>
a{
	color:#fff;
	text-decoration: none;
}

</style>