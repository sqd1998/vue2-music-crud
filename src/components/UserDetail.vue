<template>
  <div>
    
    <el-card class="box-card">
    <div slot="header" class="clearfix">
    <span>用户详情</span>
    <el-button style="float: right; padding: 3px 0" type="text" @click="goBack">返回</el-button>
    </div>
    <div class="text item">
      <p>姓名：{{UserInfoList.name}}</p>
      <p>年龄：{{UserInfoList.age}}</p>
      <p>职位：{{UserInfoList.position}}</p>
  </div>
</el-card>
  </div>
</template>

<script>
export default {
  name: "UserDatail",
  props:['id'],
  created(){
    this.getUserInfo()
  },
  methods: {
    async getUserInfo(){
     const{data:res} = await this.$http.get('/api/users/'+ this.id)
     if(res.status !==0) return this.$message.error('请求数据失败')
     this.UserInfoList = res.data
    //  console.log(this.UserInfoList)     
    },
    goBack(){
      this.$router.go(-1)
    }

  },
  data(){
    return {
      UserInfoList:{}
    }
  }

}
</script>

<style lang="less" scoped> 
p {
  margin-top:20px;
}

</style>
