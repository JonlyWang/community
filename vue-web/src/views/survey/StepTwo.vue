<template>
  <div style="margin: 3px auto 0;">
    <a-form :model="formState" name="custom-validation" :rules="rules" :labelCol="{ lg: { span: 8 }, sm: { span: 7 } }"
      :wrapperCol="{ lg: { span: 10 }, sm: { span: 12 } }" style="margin: 40px auto 0;" autocomplete="off">
      <h5 style="text-align: center;margin-top: 20px;">匿名问卷活动信息</h5>
      <!-- <a-form-item label=" " name="pattern" :wrapper-col="{ lg: {span: 10}, sm: {span: 12},  }">
        <a-card title="匿名灵活问卷项目信息" :bordered="true" class="information">
          <a-row>
            <a-col :sm="8" :xs="24">问卷项目ID：{{formState.ID}}</a-col>
          </a-row>
          <a-row>
            <a-col :sm="8" :xs="24">问卷标题：{{formState.title}}</a-col>
          </a-row>
          <a-row>
            <a-col :sm="8" :xs="24">问卷截止时间：{{formState.endTime}}</a-col>
          </a-row>
        </a-card>
      </a-form-item> -->

      <a-form-item label="问卷信息">
        <a-descriptions bordered="true" :column="{ xxl: 1, xl: 1, lg: 1, md: 1, sm: 1, xs: 1 }">
          <a-descriptions-item label="问卷地址">{{ formState.addr }}</a-descriptions-item>
          <a-descriptions-item label="问卷截止时间">{{ formState.endTime }}</a-descriptions-item>
          <!-- <a-descriptions-item label="您的问卷权重">{{formStateWe.weight}}</a-descriptions-item> -->
        </a-descriptions>

        <!-- <a-descriptions bordered="true" :column="{ xxl: 1, xl: 1, lg: 1, md: 1, sm: 1, xs: 1 }"
          style="margin-top: 20px;">
          <a-descriptions-item label="构建的加密公钥">{{ formState.PK }}</a-descriptions-item>
          <a-descriptions-item label="构建的加密公钥列表">{{ formState.PKlist }}</a-descriptions-item>
        </a-descriptions> -->
      </a-form-item>

      <!-- <a-form-item label="问卷选项" name="pattern" v-for="item in formState.questions">
        <a-descriptions-item>{{ item }}</a-descriptions-item>

        <a-radio-group size="large" v-model:value="formState.result" style="width: 100%">
          <a-radio :span="8" v-for="item in formState.choices[formState.questions.indexOf(item)].split(',')"
            :key="item.key" :value="item">{{ item }}</a-radio>
        </a-radio-group>
      </a-form-item> -->

      <a-form-item label="问卷选项" name="score" v-for="(domain, index) in formState.result" :key="domain.key">
        <!-- <a-checkbox-group size="large" v-model:value="formState.result" style="width: 100%"> -->
        <!-- <a-row> -->

        <a-descriptions-item>{{ domain.title }}
          <!-- <a-radio v-model:value="domain.value" /> -->

          <a-radio-group size="large" v-model:value="domain.value" style="width: 100%">
            <a-radio :span="8" v-for="choice in domain.item" :value="choice">{{ choice }}</a-radio>
          </a-radio-group>
        </a-descriptions-item>
      </a-form-item>



      <a-form-item label="加密选票" has-feedback>
        <a-upload :showUploadList="false" :beforeUpload="beforeUpload" accept=".txt" name="file">
          <a-button size="large" html-type="submit">
            <upload-outlined></upload-outlined>
            本地读取生成问卷签名
          </a-button>
        </a-upload>
      </a-form-item>


      <a-form-item label="选票信息">
        <a-descriptions bordered="true" :column="{ xxl: 1, xl: 1, lg: 1, md: 1, sm: 1, xs: 1 }"
          style="margin-top: 20px;">
          <!-- <a-descriptions-item label="选票加密">{{ formState.rawballot }}</a-descriptions-item> -->
          <a-descriptions-item label="问卷签名">{{ formState.signature }}</a-descriptions-item>

        </a-descriptions>
      </a-form-item>

      <!-- <a-form-item has-feedback label="选票签名" name="signature">
        <a-input size="large" v-model:value="formState.signature" placeholder="输入问卷项目签名" type="text"
          autocomplete="off" />
      </a-form-item> -->

      <a-form-item :wrapperCol="{ span: 24 }" style="text-align: center">
        <a-button type="primary" @click="prevStep">上一步</a-button>
        <a-button type="primary" html-type="submit" style="margin-left: 20px" @click="nextStep">下一步</a-button>
      </a-form-item>

      <a-divider />
      <div class="step-form-style-desc">
        <h3>说明</h3>
        <h4>加入匿名信息意见征询办法事项：请根据以上项目ID返回信息完成问卷填写。</h4>
        <p></p>
      </div>
    </a-form>
  </div>
</template>
<script>
import emitter from '@/utils/bus';
import { message } from 'ant-design-vue';
import { defineComponent, reactive, ref } from 'vue';
export default defineComponent({
  inject: ['reload'],
  setup() {
    const formState = reactive({
      addr: '',
      title: '',
      endTime: '',
      PKlist: [],
      PK: '',
      rawballot: '',
      signature: '',
      choices: [],
      type: '',
      result: [],
      score: [],
      // pattern: '',
      n: '',
      k: '',
      allrpub: [],
      m: '',
    });

    let validateSignature = async (_rule, value) => {
      if (value === '') {
        return Promise.reject('请输入正确格式账户名');
      }
      else if (value.length != value.split(" ").join("").length) {
        return Promise.reject('输入包含空格');
      }
      else {
        return Promise.resolve();
      }
    }
    const rules = {
      signature: [{
        required: true,
        validator: validateSignature,
        trigger: 'change',
      }],
    };

    return {
      formState,
      rules,
      validateSignature,
    };
  },
  created() {
    console.log("chancan", this.$route.params.info)
    this.avcinfo(this.$route.params.info)
    // this.formState.score = new Array(this.formState.choices.length)
  },


  methods: {
    avcinfo(msg) {
      msg = JSON.parse(msg)
      this.formState.addr = msg.addr,
        // this.formState.title = msg.voteinfo[0],
        this.formState.questions = msg.surveyQuestions,
        this.formState.endTime = msg.ddl,
        // this.formState.PKlist = msg.PKlist,
        // this.formState.PK = msg.PK,
        // this.formState.choices = msg.candidateList[0].split(','),
        this.formState.choices = msg.candidateList
      // this.formState.n = msg.para[3],
      // this.formState.k = msg.para[4],
      this.formState.allrpub = msg.allrpub
      var i;
      for (i in this.formState.questions) {
        this.formState.result.push({
          value: 0,
          title: this.formState.questions[i],
          item: this.formState.choices[i].split(','),
          key: Date.now(),
        })
      }
    },
    prevStep() {
      //  emitter.off('info')
      // this.$emit('prevStep')
      // this.reload()
      // this.$router.push('/voting')
      // this.formState.m = this.formState.score.map(a => a.value).toString()
      console.log(this.formState.result.map(a => a.value).toString())
    },
    str2hex(str) {
      if (str === "") {
        return "";
      }
      else {
        var arr = [];
        //arr.push("0x");
        for (var i = 0; i < str.length; i++) {
          arr.push(str.charCodeAt(i).toString(16));
        }
        return arr.join('');
      }
    },

    beforeUpload(file) {
      // console.log('上传前校验--文件类型', file)
      // this.fileList = [file]
      // console.log('选择了文件beforeUpload', this.fileList)
      this.read(file);
      return false
    },
    read(f) {
      const reader = new FileReader();
      reader.readAsText(f, 'UTF-8');
      reader.onload = fileReader => {
        const fileData = fileReader.target.result;
        var parafile = JSON.parse(fileData)
        // console.log(para, typeof (para));
        // console.log(JSON.parse(reader.result));
        // 上面的两个输出相同
        var index = this.formState.addr.indexOf(parafile.addr)
        console.log("indexshism", index)
        if (index == -1) {
          message.destroy()
          message.warning("文件上传错误，不是当前问卷活动参数")
        }
        else {
          this.formState.m = this.formState.result.map(a => a.value).toString()

          console.log("ssssss", this.formState.m)


          var i = this.formState.allrpub.indexOf(parafile.ring_pk)
          console.log("ssssss", i)
          console.log("ssssss", this.formState.allrpub)
          this.formState.signature = sign1(parafile.ring_sk, this.formState.allrpub, this.formState.m, i, this.formState.allrpub.length)
          // var ecdsa_pubs = new Object()
          // ecdsa_pubs.x = parafile.ecdsa_pk_x
          // ecdsa_pubs.y = parafile.ecdsa_pk_y
          // this.formStateWe.signature = sign(this.formStateWe.rawballot, parafile.ecdsa_sk, ecdsa_pubs)
          // this.formStateWe.spub = JSON.stringify(ecdsa_pubs)

          // signs[i] = sign(jsonC[i], man[i].ecdsa_sk, ecdsa_pubs[i])
          // this.formState.signature = sign1(man[i].ring_sk, ring_pubs, JSON.stringify(C[i]), i, n)
          console.log("选票和签名", this.formState.rawballot, this.formState.signature)
        }
      };
    },

    setPK() {
      this.$http.post('http://192.168.5.42:8888/voteravc/upload_avcPK', {
        PK: this.formState.PK,
        addr: this.formState.addr,
      }).then((response) => {
        console.log(response)
      })
    },

    nextStep() {
      console.log(this.formState.score)
      // this.$emit('nextStep')
      if (this.formState.m) {
        if (this.formState.signature == '') {
          message.destroy()
          message.warning("请点击并上传本地加密信息文件")
        }
        // console.log(JSON.parse(this.formStateWe.rawballot))
        // this.$emit('nextStep')
        this.addavcballot()
      }
    },
    addavcballot() {
      this.$http.post('http://192.168.5.42:9999/survey/add_sur_ballot', {
        name: sessionStorage.getItem('user'),
        password: sessionStorage.getItem('pass'),
        uid: sessionStorage.getItem('uid'),
        ballotstr: this.formState.m,
        // signature: JSON.stringify(this.formStateWe.signature),
        signature: this.formState.signature,
        addr: this.formState.addr,
      }).then((response) => {
        console.log(response)
        if (response.data.result == 'success') {
          emitter.emit('change1', response.data)
          this.$emit('nextStep')
        }
        if (response.data.result == 'error1') {
          message.destroy()
          message.warning('请检查登录')
        }
        if (response.data.result == 'error2') {
          message.destroy()
          message.warning('没有找到对应问卷项目')
        }
        if (response.data.result == 'error3') {
          emitter.emit('change', response.data)
          // this.$emit('nextStep')
        }
      })
    }
  }

});
</script>

<style lang="less" scoped>
.information {
  line-height: 22px;
  margin-top: 24px;
  // padding: 5px 10px;
  background-color: #fafafa;
  // max-width: 500px;
  margin: 4px auto 1px;

  .ant-row:not(:last-child) {
    margin-bottom: 24px;
  }
}
</style>