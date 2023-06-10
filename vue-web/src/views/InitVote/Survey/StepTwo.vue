<template>
  <div style="margin: 60px auto 0;">
    <a-form :model="formState" name="custom-validation" :rules="rules" :labelCol="{ lg: { span: 7 }, sm: { span: 7 } }"
      :wrapperCol="{ lg: { span: 10 }, sm: { span: 20 } }" style="margin: 40px auto 0;" autocomplete="off">
      <!--
      <a-form-item label="加密参数" :rules="[{ required: true ,message: '请选择问卷选项'}]">
        <a-button size="large" type="dashed" style="width: 80%" @click="getpara">
          <PlusOutlined />
          获取加密参数
        </a-button>
      </a-form-item>

      <a-form-item label="问卷类型" name="pattern" :rules="[{ required: true, message: '请选择问卷类型' }]">
        <a-radio-group v-model:value="formState.pattern">
          <a-radio :value="1">单选</a-radio>
          <a-radio :value="2">多选</a-radio>
          <a-radio :value="3">分数</a-radio>
        </a-radio-group>
      </a-form-item>

      <a-form-item label="加密参数" v-if="formState.encryption.length">
        <a-descriptions bordered :column="{ xxl: 1, xl: 1, lg: 1, md: 1, sm: 1, xs: 1 }">
          <a-descriptions-item label="P">{{formState.encryption[0]}}</a-descriptions-item>
          <a-descriptions-item label="G">{{formState.encryption[1]}}</a-descriptions-item>
          <a-descriptions-item label="G">{{formState.encryption[2]}}</a-descriptions-item>
        </a-descriptions>
      </a-form-item>

      -->
      <a-form-item label="添加问卷者" :rules="[{ required: true }]">
        <template v-if="formState.users.length">
          <ul>
            <template v-for="user in formState.users" :key="user.key">
              <li class="user">
                <a-avatar>
                  <template #icon>
                    <UserOutlined />
                  </template>
                </a-avatar>
                {{ user.id }}
              </li>
            </template>
          </ul>
        </template>
        <template v-else>
          <a-typography-text class="ant-form-text" type="secondary">
            (
            <SmileOutlined />
            请添加问卷参与者. )
          </a-typography-text>
        </template>
        <a-button html-type="button" style="margin: 0 8px" @click="visible = true">添加</a-button>
      </a-form-item>

      <a-modal v-model:visible="visible" title="问卷者信息" @ok="onOk">
        <a-form ref="modalFormRef" :model="modalFormState" layout="vertical" name="userForm">
          <a-form-item name="id" label="问卷者ID" :rules="[{ required: true }]">
            <a-input v-model:value="modalFormState.id" />
          </a-form-item>
        </a-form>
      </a-modal>
      <!--
      <a-form-item label="加密参数" :rules="[{ required: true ,message: '请选择问卷选项'}]">
        <a-input-number id="inputNumber" v-model:value="formState.k" :min="1" :max="formState.n" @click="number" />
      </a-form-item>

      <a-form-item label="门限参数" v-if="formState.k">
        <a-descriptions bordered :column="{ xxl: 1, xl: 1, lg: 1, md: 1, sm: 1, xs: 1 }">
          <a-descriptions-item label="问卷者人数">{{formState.n}}</a-descriptions-item>
          <a-descriptions-item label="门限人数">{{formState.k}}</a-descriptions-item>
        </a-descriptions>
      </a-form-item>
      -->

      <a-form-item :wrapperCol="{ span: 24 }" style="text-align: center">
        <a-button type="primary" @click="prevStep">上一步</a-button>
        <a-button type="primary" html-type="submit" style="margin-left: 8px" @click="nextStep">下一步</a-button>
      </a-form-item>
    </a-form>

    <a-divider />
    <div class="step-form-style-desc">
      <h3>说明</h3>
      <h4>发起匿名信息意见征询办法注意事项</h4>
      <p>请依据表单提示完成相应的问卷内容参数信息的设置（问卷内容、问卷选项、问卷截止时间）</p>
    </div>
  </div>
</template>

<script>
import emitter from '@/utils/bus';
import { message } from 'ant-design-vue';
import { defineComponent, reactive, ref, watch, toRaw } from 'vue';
export default defineComponent({
  setup() {
    const formState = reactive({
      encryption: [],
      users: [],
      n: '',
      k: '',
      pattern: ''
    });

    const formRef = ref();
    const modalFormRef = ref();
    const visible = ref(false);
    const modalFormState = ref({});
    watch(visible, () => {
      modalFormState.value = {};
    }, {
      flush: 'post',
    });

    const onOk = () => {
      modalFormRef.value.validateFields().then(() => {
        formState.users.push({
          ...modalFormState.value,
          key: Date.now(),
        });
        visible.value = false;
      });
    };

    const onFinish = () => {
      console.log('Finish:', toRaw(formState));
    };


    return {
      formState,
      formRef,
      modalFormRef,
      visible,
      modalFormState,
      onOk,
      onFinish
    };
  },

  methods: {
    number() {
      this.formState.n = this.formState.users.length
    },
    getpara() {
      var para = setup1(256)
      console.log(para.P)
      console.log(typeof (para))
      this.formState.encryption = Object.values(para)
      // console.log(Object.values(para))
    },
    prevStep() {
      this.$emit('prevStep')
    },
    nextStep() {
      var users = []
      for (let i = 0; i < this.formState.users.length; i++) {
        users[i] = this.formState.users[i].id
      }
      var res = []
      res.push(users.toString(), this.formState.users)
      emitter.emit("Res2", res)
      this.$emit('nextStep')
      /*
      if (this.formState.encryption != '' && this.formState.users != '' && this.formState.k != '') {
        emitter.emit("Res1", this.formState.encryption)
        var users = []
        for (let i = 0; i < this.formState.users.length; i++) {
          users[i] = this.formState.users[i].id
        }
        var res = []
        res.push(users.toString(), this.formState.n, this.formState.k, this.formState.pattern, this.formState.users)
        emitter.emit("Res2", res)
        this.$emit('nextStep')
      }
      else {
        message.destroy()
        message.warning("请生成定制信息")
      }
    */
    }
  }


});
</script>
<style lang="less" scoped>
.step-form-style-desc {
  padding: 0 56px;
  color: rgba(0, 0, 0, .45);

  h3 {
    margin: 0 0 12px;
    color: rgba(0, 0, 0, .45);
    font-size: 16px;
    line-height: 32px;
  }

  h4 {
    margin: 0 0 4px;
    color: rgba(0, 0, 0, .45);
    font-size: 14px;
    line-height: 22px;
  }

  p {
    margin-top: 0;
    margin-bottom: 12px;
    line-height: 22px;
  }
}

.dynamic-delete-button {
  cursor: pointer;
  position: relative;
  top: 4px;
  font-size: 24px;
  color: #999;
  transition: all 0.3s;
}

.dynamic-delete-button:hover {
  color: #777;
}

.dynamic-delete-button[disabled] {
  cursor: not-allowed;
  opacity: 0.5;
}
</style>
