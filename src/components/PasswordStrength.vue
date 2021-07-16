<template>
  <div class="password-strength">
    <div class="strength-benchmark">
      <el-progress
        :percentage="percentages[idx]"
        :format="format(idx)"
        :color="colors[idx]"
        v-for="(bar, idx) in totalRank"
        :key="idx"
        :class="classes[idx]"
      ></el-progress>
    </div>
  </div>
</template>

<script>
/**
 * TODO 
 * 在宽度非常小的情况下，“非常安全” 显示不开，
 * 强制完全显示会从右边超出，不能与设计稿一致右对齐
 * 加入以下css调整
 * &.too-safe {
    &[aria-valuenow="100"] {
      .el-progress__text {
        text-align: right;
        position: absolute;
        right: 0;
        left: -15px;
      }
    }
  }
*/
export default {
  props: {
    benchmark: {
      type: Number,
      default: 0
    }
  },

  data() {
    return {
      percentages: {},
      totalRank: 7,
      strength: ['非常弱', '弱', '一般', '强', '非常强', '安全', '非常安全'],
      colors: [
        '#FF0000',
        '#FF6B00',
        '#FFC800',
        '#F4FF00',
        '#7CFF00',
        '#00CF22',
        '#009919'
      ],
      classes: [
        'too-weak',
        'weak',
        'regular',
        'strong',
        'too-strong',
        'safe',
        'too-safe'
      ]
    };
  },

  watch: {
    benchmark: {
      handler(val) {
        this.initBenchmark();
        this.setBenchmark(val);
      }
    }
  },

  created() {
    this.initBenchmark();
  },

  methods: {
    setBenchmark(val) {
      // for (let i = 0; i < val; i++) {
      //   this.percentages[i] = 100;
      // }
      this.percentages[val - 1] = 100;
    },
    initBenchmark() {
      for (let i = 0; i < this.totalRank; i++) {
        console.log(i);
        this.$set(this.percentages, i, 0);
      }
    },
    format(idx) {
      return () => {
        return this.strength[idx];
      };
    }
  }
};
</script>

<style lang="scss">
.password-strength {
  max-width: 340px;
  padding-bottom: 15px;
  padding-top: 10px;
  .strength-benchmark {
    display: flex;
    justify-content: space-evenly;
    .el-progress {
      width: 100%;
      position: relative;
      .el-progress__text {
        position: absolute;
        left: 0;
        top: 100%;
        margin-left: 0;
        color: #999ea8;
        font-size: 10px !important;
        display: none;
      }
      .el-progress-bar {
        padding-right: 0px;
      }
      &[aria-valuenow='100'] {
        .el-progress__text {
          color: #2f374b;
          display: block;
          text-align: center;
          white-space: nowrap;
          width: 100%;
        }
        .el-progress-bar__outer {
          opacity: 1;
        }
      }
      &.too-weak {
        &[aria-valuenow='100'] {
          .el-progress__text {
            text-align: left;
          }
        }
      }
      &.too-safe {
        &[aria-valuenow='100'] {
          .el-progress__text {
            text-align: right;
          }
        }
      }
    }
    .too-weak {
      .el-progress-bar__outer {
        background-color: #ff0000;
        border-radius: 1.875px;
        opacity: 0.2;
      }
    }
    .weak {
      .el-progress-bar__outer {
        background-color: #ff6b00;
        border-radius: 1.875px;
        opacity: 0.2;
      }
    }
    .regular {
      .el-progress-bar__outer {
        background-color: #ffc800;
        border-radius: 1.875px;
        opacity: 0.2;
      }
    }
    .strong {
      .el-progress-bar__outer {
        background-color: #f4ff00;
        border-radius: 1.875px;
        opacity: 0.2;
      }
    }
    .too-strong {
      .el-progress-bar__outer {
        background-color: #7cff00;
        border-radius: 1.875px;
        opacity: 0.2;
      }
    }
    .safe {
      .el-progress-bar__outer {
        background-color: #00cf22;
        border-radius: 1.875px;
        opacity: 0.2;
      }
    }
    .too-safe {
      .el-progress-bar__outer {
        background-color: #009919;
        border-radius: 1.875px;
        opacity: 0.2;
      }
    }
  }
}
</style>
