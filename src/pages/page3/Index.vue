<template>
  <div id="page3" v-if="$route.name === 'module2.page3'">
    <SelectTree
      :props="props"
      :options="treeData"
      :value="parentValueId"
      :clearable="isClearable"
      :accordion="isAccordion"
      :isClose="closeDropDownList"
      :expandAll="isExpandAll"
      :expandOnClickNode="isExpandOnClickNode"
      :defaltExpendKeys="expendKeys"
      @openList="openList"
      @getValue="getValue($event)"
    />
  </div>
  <router-view v-else />
</template>
<script>
import SelectTree from '@/components/SelectTree.vue';

export default {
  components: {
    SelectTree
  },
  data() {
    return {
      props: {
        // 配置项（必选）
        value: 'id',
        label: 'name',
        children: 'children'
        // disabled:true
      },
      treeData: [],
      parentValueId: null, // 初始ID（可选）
      isClearable: false, // 可清空（可选）
      isAccordion: true, // 可收起（可选）
      closeDropDownList: false,
      isExpandAll: true, // 初始展开
      isExpandOnClickNode: false, // 点击箭头展开/收缩
      expendKeys: [] // 默认展开的节点
    };
  },
  created() {
    this.fetchTreeData();
  },
  methods: {
    openList() {
      this.closeDropDownList = false;
    },
    getValue(value) {
      console.log('get value', value);
      this.parentValueId = value.id;
      this.closeDropDownList = true;
    },
    // format tree
    mapTree(org) {
      const haveChildren =
        Array.isArray(org.children) && org.children.length > 0;
      return {
        id: org.id,
        label: org.name,
        name: org.name,
        parentId: org.parentId,
        level: org.level,
        is_show: false,
        data: { ...org },
        children: haveChildren ? org.children.map(i => this.mapTree(i)) : []
      };
    },

    fetchTreeData() {
      // 空间树数据
      const data = {
        id: 1,
        name: '根节点',
        parentId: -1,
        level: 0,
        children: [
          {
            id: 2,
            name: '1节点',
            parentId: 1,
            level: 2,
            children: [
              {
                id: 6,
                name: '1-1节点',
                parentId: 2,
                level: 3,
                children: [
                  {
                    id: 17,
                    name: '1-1-2节点',
                    parentId: 6,
                    level: 4
                  },
                  {
                    id: 18,
                    name: '1-1-3节点',
                    parentId: 6,
                    level: 4,
                    children: []
                  },
                  {
                    id: 19,
                    name: '1-1-4节点',
                    parentId: 6,
                    level: 4
                  }
                ]
              },
              {
                id: 7,
                name: '1-2节点',
                parentId: 2,
                level: 3,
                children: [
                  {
                    id: 20,
                    name: '1-2-1节点',
                    parentId: 7,
                    level: 4,
                    children: []
                  }
                ]
              },
              { id: 8, name: '1-3节点', parentId: 2, level: 3, children: [] }
            ]
          },
          {
            id: 3,
            name: '2节点',
            parentId: 1,
            level: 2,
            children: [
              { id: 9, name: '2-1节点', parentId: 3, level: 3, children: [] },
              {
                id: 10,
                name: '2-2节点',
                parentId: 3,
                level: 3,
                children: []
              },
              { id: 11, name: '2-3节点', parentId: 3, level: 3, children: [] }
            ]
          },
          {
            id: 5,
            name: '4节点',
            parentId: 1,
            level: 1,
            children: [
              {
                id: 13,
                name: '4-1test123',
                parentId: 5,
                level: 3,
                children: [
                  {
                    id: 107,
                    name: '4-1test1222',
                    parentId: 13,
                    level: 4,
                    children: []
                  },
                  {
                    id: 108,
                    name: '4-1test2222',
                    parentId: 13,
                    level: 4,
                    children: []
                  }
                ]
              }
            ]
          }
        ]
      };
      //只有一个根节点 用push
      const treeData = [];
      treeData.push(data);
      this.treeData = treeData.map(org => this.mapTree(org));
      this.parentValueId = data.id;
    }
  }
};
</script>
<style lang="scss">
#page3 {
  .el-input__inner {
    width: 300px;
  }
}
</style>
