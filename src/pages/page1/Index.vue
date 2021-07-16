<template>
  <div>
    <el-form
      ref="formUser"
      :model="formUser"
      :rules="rulesUser"
      inline
      class="form-edit"
    >
      <el-form-item
        label="密码"
        prop="password"
        class="with-benchmark with-eye"
      >
        <el-input
          :type="formUser.show.pwd ? 'text' : 'password'"
          v-model="formUser.password"
          @focus="setPasswordPlaceHolder"
          class="medium"
        >
          <svg-icon
            slot="suffix"
            :icon-class="formUser.show.pwd ? 'pwd-eye-open' : 'pwd-eye-close'"
            @click="formUser.show.pwd = !formUser.show.pwd"
            class="pwd-eye"
          />
        </el-input>
      </el-form-item>
      <PasswordStrength :benchmark="benchmark" />
    </el-form>
  </div>
</template>
<script>
import PasswordStrength from '@/components/PasswordStrength.vue';
import passwordBenchmark from '@/utils/password-rank';

export default {
  components: {
    PasswordStrength
  },
  data() {
    const validatePassword = (rule, value, callback) => {
      if (!value) {
        if (this.operateType === 'add') {
          callback(new Error('请输入密码'));
        } else {
          // 编辑用户 非必填
          callback();
        }
      } else if (this.benchmark < 5) {
        callback(new Error('密码强度不够，请增加密码复杂度至‘非常强’'));
      } else if (value.length < 8) {
        callback(new Error('密码长度应大于8位'));
      } else {
        callback();
      }
    };
    return {
      benchmark: 0,
      formUser: {
        password: null,
        show: {
          pwd: false
        }
      },
      rulesUser: {
        password: [
          {
            required: true,
            trigger: 'blur',
            validator: validatePassword
          }
        ]
      }
    };
  },
  watch: {
    'formUser.password': function(val) {
      this.getPasswordBenchmark(val);
    }
  },
  methods: {
    setPasswordPlaceHolder() {
      this.passwordPlaceHolderStar = '';
    },
    setPasswordAgainPlaceHolder() {
      this.passwordAgainPlaceHolderStar = '';
    },
    getPasswordBenchmark(val) {
      const score = passwordBenchmark(val);
      if (score >= 90) {
        this.benchmark = 7;
      } else if (score >= 80) {
        this.benchmark = 6;
      } else if (score >= 70) {
        this.benchmark = 5;
      } else if (score >= 60) {
        this.benchmark = 4;
      } else if (score >= 50) {
        this.benchmark = 3;
      } else if (score >= 25) {
        this.benchmark = 2;
      } else if (score >= 10) {
        this.benchmark = 1;
      } else {
        this.benchmark = 0;
      }
    }
  }
};
</script>
<style lang="scss">
.form-edit {
  .medium {
    width: 260px;
  }
  .with-benchmark {
    margin-bottom: 8px !important;
  }
  .with-eye .el-input__inner {
    padding-right: 37px;
  }
  .pwd-eye {
    margin: 6px 6.2px 0 0;
    width: 20px;
    height: 20px;
  }
  .el-form-item--small .el-form-item__error {
    padding-left: 12px;
    font-size: 12px;
    line-height: 16px;
  }
  .black-holder {
    .el-input__inner {
      &::placeholder {
        color: #2f374b;
        font-size: 12px;
      }
      &::-webkit-input-placeholder {
        /* WebKit browsers 适配谷歌 */
        font-size: 12px;
        transform: scale(0.5);
        transform-origin: 0 45%;
        color: #2f374b;
      }
      &:-moz-placeholder {
        /* Mozilla Firefox 4 to 18 适配火狐 */
        font-size: 12px;
        color: #2f374b;
      }
      &::-moz-placeholder {
        /* Mozilla Firefox 19+ 适配火狐 */
        font-size: 12px;
        color: #2f374b;
      }
      &:-ms-input-placeholder {
        /* Internet Explorer 10+  适配ie*/
        font-size: 12px;
        color: #2f374b;
      }
    }
  }
}
</style>
