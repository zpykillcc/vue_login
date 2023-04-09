<template>
    <div>
      <el-card class="box-card">
        <h2>更改密码</h2>
        <el-form
          :model="ruleForm"
          status-icon
          :rules="rules"
          ref="ruleForm"
          label-position="left"
          label-width="80px"
          class="demo-ruleForm"
        >
          <el-form-item label="用户名" prop="uname">
            <el-input v-model="ruleForm.uname"></el-input>
          </el-form-item>
          <el-form-item label="旧密码" prop="oldpass">
            <el-input
              type="password"
              v-model="ruleForm.oldpass"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item label="新密码" prop="pass">
            <el-input
              type="password"
              v-model="ruleForm.pass"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item label="重复密码" prop="password">
            <el-input
              type="password"
              v-model="ruleForm.password"
              autocomplete="off"
            ></el-input>
          </el-form-item>
        </el-form>
        <div class="btnGroup">
          <el-button type="primary" @click="submitForm('ruleForm')"  v-loading="loading"
            >提交</el-button
          >
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </div>
      </el-card>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      var validatePass = (rule, value, callback) => {
        if (value === "") {
          callback(new Error("请输入密码"));
        } else {
          if (this.ruleForm.checkPass !== "") {
            this.$refs.ruleForm.validateField("checkPass");
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === "") {
          callback(new Error("请再次输入密码"));
        } else if (value !== this.ruleForm.pass) {
          callback(new Error("两次输入密码不一致!"));
        } else {
          callback();
        }
      };
      return {
        ruleForm: {
          uname: "",
          oldpass: "",
          pass: "",
          password: "",
        },
        rules: {
          uname: [
            { required: true, message: "用户名不能为空！", trigger: "blur" },
          ],
          oldpass: [{ required: true, validator: validatePass, trigger: "blur" }],
          pass: [{ required: true, validator: validatePass, trigger: "blur" }],
          password: [
            { required: true, validator: validatePass2, trigger: "blur" },
          ],
        },
        loading: false
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          this.loading = true;  // 提交按钮显示加载动画
          if (valid) {
            let _this = this;
            this.axios({     // axios 向后端发起请求
              url: "/api/user/change",  // 请求地址
              method: "post",             // 请求方法
              processData:false,
              headers: {                  // 请求头
                "Content-Type": "application/json",
              },
              params: { 
                uname: _this.ruleForm.uname,
                oldpass: _this.ruleForm.oldpass,
                password: _this.ruleForm.password,
              },
            }).then((res) => { 
              if (res.data.code === '0') {  
                this.$message({
                  message: res.data.msg,
                  type: "success",
                });
              }else 
                {
                    this.$message({
                    message: res.data.msg,
                    type: "warning",
                  });
                } 
              
              _this.loading = false;
              console.log(res);
            });
          } else { 
            console.log("error submit!!");
            this.loading = false;
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
    },
  };
  </script>
  
  <style scoped>
  /* 设置登录面板居中，宽度为400px */
  .box-card {
    margin: auto auto;
    width: 400px;
  }
  /* 设置登录面板中的表单居中 */
  .login-from {
    margin: auto auto;
  }
  </style>