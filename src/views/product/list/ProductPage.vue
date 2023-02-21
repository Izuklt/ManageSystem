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
        <div class="my-title">商品{{ title }}</div>
        <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item label="所属分类" prop="category">
            <span>{{ ruleForm.category }}</span>
          </el-form-item>
          <el-form-item label="商品名称" prop="title">
            <el-input v-model="ruleForm.title" size="small"></el-input>
          </el-form-item>
          <el-form-item label="商品价格" prop="price">
            <el-input v-model="ruleForm.price" size="small"></el-input>
          </el-form-item>
          <el-form-item label="商品数量" prop="num">
            <el-input v-model="ruleForm.num" size="small"></el-input>
          </el-form-item>
          <el-form-item label="商品卖点" prop="sellPoint">
            <el-input v-model="ruleForm.sellPoint" size="small"></el-input>
          </el-form-item>
          <el-form-item label="上传图片" prop="image">
            <UploadImg
              @sendImg="sendImg"
              ref="uploadImg"
              :fileList="fileList"
            ></UploadImg>
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
import { mapState } from "vuex";
import TreeProduct from "./TreeProduct.vue";
import UploadImg from "./UploadImg.vue";
import WangEditor from "./WangEditor.vue";
export default {
  components: {
    TreeProduct,
    UploadImg,
    WangEditor,
  },
  computed: {
    ...mapState("product", ["rowData", "title"]),
  },
  data() {
    return {
      fileList: [],
      ruleForm: {
        //表单数据
        id: "",
        title: "",
        num: "",
        price: "",
        sellPoint: "",
        image: [],
        descs: "",
        category: [],
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
    //获取tree点击的数据--------------------------、
    sendTreeData(val) {
      //存储接受的tree的数据 val={id:,cid:,name:''}
      this.ruleForm.category = val.name;
      this.ruleForm.cid = val.cid;
    },
    //接受上传的图片路径----------------------
    sendImg(val) {
      // console.log('val-----',val);
      this.ruleForm.image.push(val);
    },
    //获取富文本编译器的数据---------------------------、
    sendWangEditor(val) {
      console.log("---商品描述--", val);
      this.ruleForm.descs = val;
    },
    //提交事件-------------------------------
    submitForm(formName) {
      //this.$refs.ruleForm
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.title == "添加") {
            console.log("添加商品", this.ruleForm);
            //接口：title, image, sellPoint, price, cid, category, num, descs
            let {
              id,
              title,
              image,
              sellPoint,
              price,
              cid,
              category,
              num,
              descs,
            } = this.ruleForm;
            //image数组类型---转---字符串
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
            console.log("修改商品", this.ruleForm);
            this.updateTbItem({
              id,
              title,
              image,
              sellPoint,
              price,
              cid,
              category,
              num,
              descs,
            });
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    // 修改商品-------------------------
    async updateTbItem(params) {
      let res = await this.$api.updateTbItem(params);
      console.log("修改", res.data);
      if (res.data.status === 200) {
        this.$message({
          message: "恭喜你，修改商品成功",
          type: "success",
        });
        //跳转路由
        this.$router.push("/product/list");
      }
    },
    //添加商品---------------------------
    async insertTbItem(params) {
      let res = await this.$api.insertTbItem(params);
      console.log("添加商品--------", res.data);
      if (res.data.status === 200) {
        this.$message({
          message: "恭喜你，添加商品成功",
          type: "success",
        });
        //跳转路由
        this.$router.push("/product/list");
      }
    },
    //重置------------------------------
    resetForm(formName) {
      this.$refs[formName].resetFields();
      //图片列表
      this.$refs.uploadImg.clear();
      //wangEditor
      this.$refs.wangEditor.html = ""; //方法1
      // this.$refs.wangEditor.editor.clear();//方法2 调用自身的清空方法
    },
  },
  created() {
    // 进入页面---渲染编辑数据
    if (this.title == "编辑") {
      this.ruleForm = this.rowData; //image
      this.ruleForm.isShow = true;
      let imgs = this.rowData.image; //字符串类型
      //转数组
      let arr = JSON.parse(imgs);
      console.log("arr", arr);
      arr.forEach((ele) => {
        this.fileList.push({ name: "", url: ele });
      });
      console.log("this.fileList", this.fileList);

      // 富文本
      console.log(this.$refs.wangEditor);
      // this.$nextTick  等待DOM加载完毕后执行，延迟加载
      this.$nextTick(() => {
        this.$refs.wangEditor.html = this.rowData.descs;
      });
    }
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
  // height: 800px;
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