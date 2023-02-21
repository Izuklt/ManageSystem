<template>
  <div>
    <el-menu
      :default-active="active"
      class="el-menu-vertical-demo"
      background-color="#112f50"
      text-color="#fff"
      active-text-color="#ffd04b"
      :collapse="isCollapse"
    >
      <el-menu-item>
        <span slot="title">首客生鲜采购系统</span>
      </el-menu-item>
      <el-menu-item index="home" @click="toPage('home')">
        <i class="el-icon-menu"></i>
        <span slot="title">{{ $t("menu.home") }}</span>
      </el-menu-item>

      <!-- 动态菜单导航 -->
      <MenuList :dyMenuList="dyMenuList"></MenuList>
    </el-menu>
  </div>
</template>

<script>
import { mapState } from "vuex";
import MenuList from "./MenuList.vue";
export default {
  props: ["isCollapse"],
  components: { MenuList },
  data() {
    return {
      // isCollapse:false
      active: "",
    };
  },
  computed: {
    ...mapState("menu", ["dyMenuList"]),
  },

  created() {
    // console.log('menu',this.$route);
    //首次处理一下-----------------------
    if (this.$route.meta.activeMenu) {
      this.active = this.$route.meta.activeMenu;
    } else {
      this.active = this.$route.name;
    }
  },
  methods: {
    toPage(name) {
      this.$router.push({
        name,
      });
    },
  },
  watch: {
    //监听路由的变化---切换页面组件
    $route(to, from) {
      // console.log('watch---to',to);
      //判断当前的路由里面 meta:{ activeMenu:'/product/list'}
      let { meta, name } = to;
      if (meta.activeMenu) {
        this.active = meta.activeMenu;
      } else {
        this.active = name;
      }
    },
  },
};
</script>

<style lang="less" scoped>
.el-menu {
  border-right: 0;

  /deep/ .is-active {
    background: #1e78bf !important;
    color: #fff !important;
  }
}

.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
</style>