<template>
    <div class="father">
      <!-- 添加用户按钮 -->
      <el-button type="success" @click="dialogVisible = true">添加新用户</el-button>
      <el-dialog title="添加用户" :visible.sync="dialogVisible" width="40%" @close="onDialogClosed">
     
      <!-- 添加用户的表单 -->
      <el-form :model="form" label-width="80px" :rules="formRules" ref="myaddForm">
          <el-form-item label="姓名" prop="name">
          <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="年龄" prop="age">
          <el-input v-model.number ="form.age"></el-input>
          </el-form-item>
          <el-form-item label="职位" prop="position">
          <el-input v-model="form.position"></el-input>
          </el-form-item>
        
      </el-form>

  <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="onAddNewUser">确 定</el-button>
  </span>
    </el-dialog>
    <!-- 音乐按钮 -->
    <el-button type="warning" round  @click="goMusic" class="btnTomusic">音乐随身听</el-button>
      <!-- 用户列表 -->
      <el-table :data="userList" border stripe>
       <el-table-column type="index" label="#"
        width="180">
      </el-table-column>
      <el-table-column
        prop="name"
        label="姓名"
        width="180">
      </el-table-column>
      <el-table-column
        prop="age"
        label="年龄">
      </el-table-column>
       <el-table-column
        prop="position"
        label="职位">
      </el-table-column>
       <el-table-column label="日期">
        <template v-slot:default="scope">
          {{scope.row.addtime | dateFormat}}
        </template>
      </el-table-column>
      <el-table-column
        label="操作">
        <template v-slot:default="{row}">
          <router-link :to="'/users/'+row.id">详情</router-link>&nbsp;&nbsp;
          <a href="#" @click.prevent="onDelUser(row.id)">删除</a>

        </template>
      </el-table-column>
    </el-table>
      </div>  
</template>

<script>
export default {
  name: 'UserList',
  data(){
    let checkAge = (rule, value, cb)=>{
      if(!Number.isInteger(value)){
        return cb(new Error('请写整数！'))
      }
      if(value > 100 || value < 1){
        return cb(new Error('年龄必须在1到100之间'))
      }
      cb()
    }
    return {
      userList:[],
      //控制添加对话框的显示与隐藏
       dialogVisible: false,
       form:{
         name:'',
         age: '',
         position:'',
       },
       //表单验证对象
       formRules:{
         name:[
            { required: true, message: '请输入名字', trigger: 'blur' },
            { min: 1, max: 15, message: '长度在 1 到 15 个字符', trigger: 'blur' }
         ],
          age:[
            { required: true, message: '必须填年龄', trigger: 'blur' },
            { validator: checkAge, trigger: 'blur' }
            
         ],
          position:[
            { required: true, message: '请输入名字', trigger: 'blur' },
            { min: 1, max: 10, message: '长度在 1 到 10 个字符', trigger: 'blur' }
         ]
       }
       
    }
  },
  methods: {
    async getUserList(){
      const {data:res} = await this.$http.get('/api/users')
      if(res.status !==0)return console.log('请求失败')
      this.userList = res.data
      
      
      
    },
    onDialogClosed(){
      this.$refs.myaddForm.resetFields()
      
    },
    onAddNewUser(){
      this.$refs.myaddForm.validate(async valid=>{
        if(!valid) return
        //需要执行的添加操作
        const {data:res} = await this.$http.post('/api/users',this.form)
        
        if(res.status !==0) return this.$message.error('添加失败')
        this.dialogVisible = false
        this.getUserList()
        //设置ui提示信息
        this.$message.success('添加成功')
      })
    },
    async onDelUser(id){
      const confirmResult = await this.$confirm('此操作将永久删除该用户 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).catch(err => err)
        if(confirmResult != 'confirm') return this.$message.error('用户取消操作')
        const{data:res} = await this.$http.delete('/api/users/' + id)
        if(res.status !==0) return this.$message.error('删除失败')
        this.$message.success('删除成功')
        this.getUserList()      
    },
    goMusic(){
       this.$router.push('/music')
    }
   

  },
  created(){
    this.getUserList()
  }

}
</script>

<style lang="less" scoped>

.el-table{
  margin-top:30px;
}
.el-input {
  width: 80%;
}
.btnTomusic{
  // margin-top: 10px;
  float: right;
  
}

</style>
