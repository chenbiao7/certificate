<template>
<!-- <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" /> -->
<div id="wrapper">
  <el-container>
    <el-header><router-link to="/">首页</router-link></el-header>
    <el-container style="height: 100%;">
      <el-aside width="200px" style="height: 100%;">
        <el-row class="tac">
          <el-col>
            <h5 class="mb-2"></h5>
            <el-menu default-active="2" class="el-menu-vertical-demo">
              <el-sub-menu index="1">
                <template #title>
                  <el-icon>
                    <location />
                  </el-icon>
                  <span>AWS题库大全
                  </span>
                </template>
                <el-menu-item-group title="高级">
                  <el-menu-item index="1-1">
                    <router-link to="/AWS/DAS">DAS(大数据)</router-link>
                  </el-menu-item>
                  <el-menu-item index="1-2">SAP</el-menu-item>
                </el-menu-item-group>
                <el-menu-item-group title="初级">
                  <el-menu-item index="1-3">SAA</el-menu-item>
                </el-menu-item-group>
                <!-- <el-sub-menu index="1-4">
                  <template #title>item four</template>
                  <el-menu-item index="1-4-1">item one</el-menu-item>
                </el-sub-menu> -->
              </el-sub-menu>
              <el-menu-item index="2">
                <el-icon>
                  <document />
                </el-icon>
                <span>阿里云</span>
              </el-menu-item>
              <el-menu-item index="3" disabled>
                <el-icon>
                  <setting />
                </el-icon>
                <span>系统设置</span>
              </el-menu-item>
              <!-- <el-menu-item index="4">
                <el-icon>
                  <setting />
                </el-icon>
                <span>Navigator Four</span>
              </el-menu-item> -->
            </el-menu>
          </el-col>
        </el-row>
      </el-aside>
      <el-main style="height: 100%;">
        <!-- 路由出口 -->
        <!-- 路由匹配到的组件将渲染在这里 -->
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</div>
</template>

<style>
#wrapper {
  height: 100%
}
</style>
<style>
.el-container.is-vertical {
  height: 100%
}
</style>

<script lang="ts">

const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
</script>
