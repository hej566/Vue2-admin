<template>
  <el-cascader
    :props="{
      value: 'id',
      label: 'name',
      children: 'cities',
      checkStrictly: true
    }"
    :options="cascaderData"
    v-model="selectedOptions"
    @change="changeSelect"
    @expand-change="handleItemChange"
    placeholder="请选择省市区"
  >
  </el-cascader>
</template>

<script>
const speCode = [
  '659001',
  '659002',
  '659003',
  '659004',
  '659005',
  '659006',
  '659007',
  '659008',
  '659009',
  '659010'
];
export default {
  props: {
    value: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      selectedOptions: [],
      cascaderData: []
    };
  },
  watch: {
    value: {
      immediate: true,
      handler(val) {
        if (val === '') {
          this.selectedOptions = [];
        }
      }
    }
  },
  async mounted() {
    await this.getNodes();
    if (this.value) {
      await this.initValue();
    }
  },
  methods: {
    async initValue() {
      const code = this.value;
      if (code % 10000 === 0) {
        this.selectedOptions.push(code);
        await this.getNodes(this.selectedOptions);
      } else if (code % 100 === 0) {
        const provinceCode = `${code - (code % 10000)}`;
        this.selectedOptions.push(provinceCode);
        await this.getNodes(this.selectedOptions);
        this.selectedOptions.push(code);
        await this.getNodes(this.selectedOptions);
      } else {
        if (speCode.indexOf(code) > -1) {
          const provinceCode = `${code - (code % 10000)}`;
          this.selectedOptions.push(provinceCode);
          await this.getNodes(this.selectedOptions);
          this.selectedOptions.push(code);
          await this.getNodes(this.selectedOptions);
        } else {
          const provinceCode = `${code - (code % 10000)}`;
          const cityCode = `${code - (code % 100)}`;
          this.selectedOptions.push(provinceCode);
          await this.getNodes(this.selectedOptions);
          this.selectedOptions.push(cityCode);
          await this.getNodes(this.selectedOptions);
          this.selectedOptions.push(code);
          await this.getNodes(this.selectedOptions);
        }
      }
    },
    changeSelect(value) {
      this.$emit('input', value[value.length - 1] || '');
    },
    async getNodes(val) {
      if (!val) {
        const provinceList = await this.$api().geoAdcode.getProviceList();
        this.cascaderData = provinceList.data.map(value => {
          return {
            id: value.code,
            name: value.name,
            cities: []
          };
        });
      } else if (val.length === 1) {
        const cityList = await this.$api().geoAdcode.getCityList(val[0]);
        this.cascaderData.map(value => {
          if (value.id === val[0]) {
            if (!value.cities.length) {
              value.cities = cityList.data.map(value => {
                return {
                  id: value.code,
                  name: value.name,
                  cities: []
                };
              });
            }
          }
        });
      } else if (val.length === 2) {
        const districtList = await this.$api().geoAdcode.getDistrictList(
          val[1]
        );
        this.cascaderData.map(value => {
          if (value.id === val[0]) {
            value.cities.map(value => {
              if (value.id === val[1]) {
                if (!value.cities.length) {
                  value.cities = districtList.data.map(value => {
                    return {
                      id: value.code,
                      name: value.name
                    };
                  });
                }
              }
            });
          }
        });
      }
    },
    handleItemChange(val) {
      this.getNodes(val);
    },
    resetValue() {
      this.selectedOptions = [];
      this.$emit('input', '');
    }
  }
};
</script>

<style lang="scss"></style>
