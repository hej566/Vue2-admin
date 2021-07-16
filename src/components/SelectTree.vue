<template>
  <el-select
    ref="treeSelect"
    :value="valueTitle"
    :clearable="clearable"
    @clear="clearHandle"
    @focus="focusSelect"
    placeholder="请选择团队"
    popper-class="select-tree"
  >
    <!-- <el-input
      class="selectInput"
      :placeholder="placeholder"
      v-model="filterText">
    </el-input> -->

    <el-option :value="valueTitle" :label="valueTitle" class="options">
      <el-tree
        id="tree-option"
        ref="selectTree"
        :accordion="accordion"
        :data="options"
        :props="props"
        :node-key="props.value"
        :default-expanded-keys="defaultExpandedKey"
        :filter-node-method="filterNode"
        :expand-on-click-node="expandOnClickNode"
        :default-expand-all="expandAll"
        :current-node-key="value"
        :highlight-current="true"
        @node-click="handleNodeClick"
      >
      </el-tree>
    </el-option>
  </el-select>
</template>

<script>
export default {
  name: 'ElTreeSelect',
  props: {
    /* 配置项 */
    props: {
      type: Object,
      default: () => {
        return {
          value: 'id', // ID字段名
          label: 'title', // 显示名称
          children: 'children' // 子级字段名
        };
      }
    },
    /* 选项列表数据(树形结构的对象数组) */
    options: {
      type: Array,
      default: () => {
        return [];
      }
    },
    /* 初始值 */
    value: {
      type: Number,
      default: () => {
        return null;
      }
    },
    /* 可清空选项 */
    clearable: {
      type: Boolean,
      default: () => {
        return false;
      }
    },
    /* 自动收起 */
    accordion: {
      type: Boolean,
      default: () => {
        return false;
      }
    },
    placeholder: {
      type: String,
      default: () => {
        return '检索关键字';
      }
    },
    isClose: {
      type: Boolean,
      default: () => {
        return false;
      }
    },
    expandAll: {
      type: Boolean,
      default: () => {
        return false;
      }
    },
    expandOnClickNode: {
      type: Boolean,
      default: () => {
        return false;
      }
    },
    defaltExpendKeys: {
      type: Array,
      default: () => {
        return [];
      }
    }
  },
  data() {
    return {
      filterText: '',
      valueId: this.value, // 初始值
      valueLevel: '',
      valueTitle: '',
      defaultExpandedKey: [],
      showValuetree: false
    };
  },
  watch: {
    isClose: {
      handler(val) {
        if (val) {
          this.$refs.treeSelect.blur();
        }
      }
    },
    value() {
      this.valueId = this.value;
      this.initHandle();
    },
    filterText(val) {
      this.$refs.selectTree.filter(val);
    }
  },
  mounted() {
    this.initHandle();
  },
  methods: {
    // 初始化值
    initHandle() {
      if (this.valueId) {
        this.valueTitle = this.$refs.selectTree.getNode(this.valueId).data[
          this.props.label
        ]; // 初始化显示
        this.$refs.selectTree.setCurrentKey(this.valueId); // 设置默认选中
        this.defaultExpandedKey = this.defaltExpendKeys;
        this.defaultExpandedKey.push(this.valueId); // 设置默认展开
      }
      this.initScroll();
    },
    // 初始化滚动条
    initScroll() {
      this.$nextTick(() => {
        let scrollWrap = document.querySelectorAll(
          '.el-scrollbar .el-select-dropdown__wrap'
        )[0];
        let scrollBar = document.querySelectorAll(
          '.el-scrollbar .el-scrollbar__bar'
        );
        scrollWrap.style.cssText =
          'margin: 0px; max-height: none; overflow: hidden;';
        scrollBar.forEach(ele => (ele.style.width = 0));
      });
    },
    // 切换选项
    handleNodeClick(node) {
      this.valueTitle = node[this.props.label];
      this.valueId = node[this.props.value];
      this.valueLevel = node.level;
      const value = {
        id: this.valueId,
        level: this.valueLevel
      };
      console.log(value);
      this.$emit('getValue', value);
      this.defaultExpandedKey = this.defaltExpendKeys;
    },
    // 清除选中
    clearHandle() {
      this.valueTitle = '';
      this.valueId = null;
      this.defaultExpandedKey = this.defaltExpendKeys;
      this.clearSelected();
      this.$emit('getValue', null);
    },
    /* 清空选中样式 */
    clearSelected() {
      let allNode = document.querySelectorAll('#tree-option .el-tree-node');
      allNode.forEach(element => element.classList.remove('is-current'));
    },
    filterNode(value, data) {
      if (!value) return true;
      return data.name.indexOf(value) !== -1;
    },
    focusSelect() {
      this.$emit('openList');
      this.$refs.treeSelect.focus();
    }
  }
};
</script>

<style lang="scss">
.select-tree {
  margin-left: 12px;
  width: 300px;
  .el-select-dropdown__item.hover,
  #app-body .el-select-dropdown__item:hover {
    border-right: none !important;
  }
  .el-scrollbar .el-scrollbar__view .el-select-dropdown__item {
    height: auto;
    max-height: 274px;
    padding: 0;
    overflow: hidden;
    overflow-y: auto;
  }
  .el-select-dropdown__item.selected {
    font-weight: normal;
  }
  .selectInput {
    padding: 0 5px;
    box-sizing: border-box;
  }
  ul li /deep/.el-tree .el-tree-node__content {
    height: auto;
    padding: 0 20px;
  }
  .el-scrollbar {
    height: 100%;
    width: 100%;
  }
  .el-tree {
    padding-top: 16px;
  }
  .el-select-dropdown__list {
    padding: 0;
  }
  .popper__arrow {
    border-style: none !important;
    border-width: 0 !important;
    top: 0 !important;
  }
  .el-tree--highlight-current
    .el-tree-node.is-current
    > .el-tree-node__content {
    background-color: #fff;
    color: #5ea9fe;
  }
}
#tree-option {
  color: #2f374b;

  .el-tree-node__label {
    font-weight: normal;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    width: 100%;
  }
  .el-tree /deep/.is-current .el-tree-node__label {
    color: #409eff;
    font-weight: 700;
  }
  .el-tree /deep/.is-current .el-tree-node__children .el-tree-node__label {
    color: #2f374b;
    font-weight: normal;
  }
  .el-tree-node__expand-icon.expanded {
    color: #2f374b;
  }

  .el-tree-node__content:hover {
    background-color: #f2f4f8;
    border-right: 4px solid #057aff;
  }
  .el-tree-node__expand-icon.expanded {
    transform: rotate(90deg);
  }
  .el-icon-caret-right:before {
    content: '\e6e0';
  }
}
</style>
