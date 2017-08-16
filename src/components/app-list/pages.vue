<template>
	<div class="block">
	    <el-pagination>
	      @current-change="handleCurrentChange"
	      :current-page="currentPage"
	      :page-size="5"
	      layout="prev, pager, next, jumper"
	      :page-count="pageTotal">
	    </el-pagination>
	  </div>
	</div>
</template>
<script>
export default{
	data(){
		return {
			currentPage:1
		}
	},
	props:['pageTotal'],
	methods:{
		handleCurrentChange(){
			this.$emit('pageChange',this.currentPage);
		}
	}
}
</script>