<template>
    <div id="app">
        <el-row :gutter="20">
            <el-col :span="4" class="bg-nav-dark">
                <NavBar></NavBar>
            </el-col>
            <el-col :span="20">
                <router-view></router-view>
            </el-col>
        </el-row>
        
        
    </div>
</template>

<script>
import NavBar from './components/nav/nav.vue'
export default {
    name: 'app',
    data () {
        return {
            msg: 'Welcome to Your Vue.js App'
        }
    },
    components:{
        NavBar
    }
}
</script>

<style>
.bg-nav-dark ul{
    /*background-color: #324057;*/
    min-height:820px;
}
.el-row {
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
}
.el-col {
    border-radius: 4px;
}
.bg-header{
    background:#aaa;
    height:30px;
}
.bg-nav-dark{
    
}
.bg-purple-dark {
    background: #99a9bf;
}
.bg-purple {
    background: #d3dce6;
}
.bg-purple-light {
    background: #e5e9f2;
}
.grid-content {
    border-radius: 4px;
    min-height: 36px;
}
.row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
}
</style>
