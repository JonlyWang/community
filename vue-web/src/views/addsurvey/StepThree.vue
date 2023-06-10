<template>
  <div style="margin: 40px auto 0;">
    <a-result status="success" title="您已经成功加入该问卷活动" :model="formState">
      <template #subTitle>
        请依据信息完成问卷调查内容的填写
      </template>
      <template #extra>
        <a-button key="buy" @click="voting">开始填写问卷</a-button>
      </template>
    </a-result>

  </div>
</template>
  
<script>
import emitter from '@/utils/bus';
import { defineComponent } from 'vue';
export default defineComponent({
  inject: ['reload'],

  methods: {
    voting() {
      this.$router.push('/voting')
    }
  }

});

</script>