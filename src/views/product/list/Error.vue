<template>
  <el-row :gutter="20">
    <el-col :span="4">
      <div class="nav">
        <div class="title">产品类型列表</div>

        <div class="tree">
          <TreeProduct @sendTreeData="sendTreeData"></TreeProduct>
        </div>
      </div>
    </el-col>
    <el-col :span="20">
      <div class="wrapper">
        <div class="my-title">商品添加</div>
        <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item label="所属分类" prop="category"
            ><span>{{ ruleForm.category }}</span>
          </el-form-item>
          <el-form-item label="商品名称" prop="title">
            <el-input v-model="ruleForm.title"></el-input>
          </el-form-item>
          <el-form-item label="商品价格" prop="price">
            <el-input v-model="ruleForm.price"></el-input>
          </el-form-item>
          <el-form-item label="商品数量" prop="num">
            <el-input v-model="ruleForm.num"></el-input>
          </el-form-item>
          <el-form-item label="商品卖点" prop="sellPoint">
            <el-input v-model="ruleForm.sellPoint"></el-input>
          </el-form-item>
          <el-form-item label="上传图片" prop="image">
            <UploadImg @sendImg="sendImg"></UploadImg>
          </el-form-item>
          <el-form-item label="商品描述" prop="descs">
            <WangEditor
              @sendWangEditor="sendWangEditor"
              ref="wangEditor"
            ></WangEditor>
          </el-form-item>
          <el-form-item label="首页轮播推进" prop="isShow">
            <el-switch
              v-model="ruleForm.isShow"
              active-color="#13ce66"
              inactive-color="#ff4949"
            ></el-switch>
          </el-form-item>
          <el-form-item label="是否推荐商品" prop="isShow">
            <el-switch
              v-model="ruleForm.isShow"
              active-color="#13ce66"
              inactive-color="#ff4949"
            ></el-switch>
          </el-form-item>
          <el-form-item label="是否上架商品" prop="isShow">
            <el-switch
              v-model="ruleForm.isShow"
              active-color="#13ce66"
              inactive-color="#ff4949"
            ></el-switch>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')"
              >保存</el-button
            >
            <el-button @click="resetForm('ruleForm')">重置</el-button>
            <el-button>取消</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import TreeProduct from "./TreeProduct.vue";
import UploadImg from "./UploadImg.vue";
import WangEditor from "./WangEditor.vue";
export default {
  components: {
    TreeProduct,
    UploadImg,
    WangEditor,
  },
  data() {
    return {
      ruleForm: {
        //表单数据
        title: "",
        num: "",
        price: "",
        sellPoint: "",
        image: [],
        descs: "",
        category: "",
        cid: "",
        isShow: true,
      },
      rules: {
        //表单验证规则
        title: [
          { required: true, message: "请输入商品名称", trigger: "blur" },
          // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        num: [{ required: true, message: "请输入商品数量", trigger: "blur" }],
        price: [{ required: true, message: "请输入商品价格", trigger: "blur" }],
        category: [
          {
            required: true,
            message: "请选择商品类目",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    // 获取tree点击的数据
    sendTreeData(val) {
      this.ruleForm.category = val.name;
      this.ruleForm.cid = val.cid;
    },

    // 获取富文本编译器的数据
    sendWangEditor(val) {
      this.ruleForm.desc = val;
    },

    // 接收上传的图片路径
    sendImg(val) {
      this.ruleForm.image.push(val);
    },
    //提交事件-------------------------------
    submitForm(formName) {
      //this.$refs.ruleForm
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log("添加商品", this.ruleForm);
          let { title, image, sellPoint, price, cid, category, num, descs } =
            this.ruleForm;
          this.insertTbItem({
            title,
            image: JSON.stringify(image),
            sellPoint,
            price,
            cid,
            category,
            num,
            descs,
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    // 添加商品
    async insertTbItem(params) {
      let res = await this.$api.insertTbItem(params);
      console.log("添加商品", res.data);
      if (res.data.status === 200) {
        this.$message({
          message: "恭喜你，商品添加成功",
          type: "success",
        });
        // 跳转路由
        this.$router.push("/product/list");
      }
    },

    // 重置
    resetForm(formName) {
      this.$refs[formName].resetFields();
      console.log(this.$refs);
      // 图片列表
      // this.$refs.UploadImg.clear();
      // wang
      this.$refs.WangEditor.html = "";
    },
  },
};
</script>

<style lang="less" scoped>
.nav {
  height: 600px;
  background: #fff;

  .title {
    background: skyblue;
    padding: 20px;
    color: #fff;
  }

  .tree {
    padding: 20px;
  }
}

.wrapper {
  height: 800px;
  background: #fff;

  .my-title {
    background: #eee;
    padding: 14px;
    color: #333;
    font-weight: bold;
  }

  .demo-ruleForm {
    padding: 20px;
  }
}
</style>