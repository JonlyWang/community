<template>
  <div style="margin: 60px auto 0;">

    <!--
    <a-form :model="formState" name="custom-validation" :rules="rules" :labelCol="{lg: {span: 7}, sm: {span: 7}}"
      :wrapperCol="{lg: {span: 10}, sm: {span: 12}}" style="margin: 60px auto 70px;" autocomplete="off">
      <a-form-item has-feedback label="问题" name="questions">
        <a-input size="large" v-model:value="formState.title" placeholder="输入问题" type="text" autocomplete="off" />
      </a-form-item>  
    -->
    <a-form :model="formState" name="custom-validation" :rules="rules" :labelCol="{ lg: { span: 7 }, sm: { span: 7 } }"
      :wrapperCol="{ lg: { span: 10 }, sm: { span: 12 } }" style="margin: 60px auto 70px;" autocomplete="off">

      <!--
      <ul v-for="(value, index) in formState.questions">
      {{value}}
      </ul>  
      -->
      <a-form-item v-for="(value, index) in formState.questions" v-bind=formItemLayout :key="index"
        :label="'问题' + index" name="questions" has-feedback>

        <a-input size="large" v-model:value="formState.questions[index].name" placeholder="输入问题"
          style="width: 80%; margin-right: 8px" />
        <MinusCircleOutlined v-if="formState.questions.length > 1" class="dynamic-delete-button"
          :disabled="formState.questions.length === 1" @click="removeQuestion(value)" />

        <a-form-item v-for="(domain, index1) in formState.questions[index].choices" v-bind=formItemLayout
          :key="domain.key" :label="'选项' + index1" name="choices" has-feedback>

          <a-input size="large" v-model:value="domain.value" placeholder="输入问卷选项"
            style="width: 80%; margin-right: 8px" />

          <MinusCircleOutlined v-if="formState.questions[index].choices.length > 1" class="dynamic-delete-button"
            :disabled="formState.questions[index].choices.length === 1" @click="removeDomain(domain)" />
        </a-form-item>
      </a-form-item>



      <a-form-item label=" " :wrapper-col="{ lg: { span: 10 }, sm: { span: 12 }, offset: 0 }">
        <a-button size="large" type="dashed" style="width: 100%" @click="addQuestion">
          <PlusOutlined />
          添加问卷问题
        </a-button>
      </a-form-item>

      <a-form-item label=" " :wrapper-col="{ lg: { span: 10 }, sm: { span: 12 }, offset: 0 }">
        <a-button size="large" type="dashed" style="width: 100%" @click="addDomain">
          <PlusOutlined />
          添加问卷选项
        </a-button>
      </a-form-item>


      <a-form-item has-feedback label="选择问卷时间" name="date">
        <a-range-picker size="large" style="width: 100%;border-radius: 7px;height: 48px;" v-model:value="formState.date"
          :disabled-date="disabledDate" :show-time="{
            hideDisabledOptions: true,
          }" value-format="YYYY-MM-DD HH:mm:ss" />
      </a-form-item>

      <a-form-item :wrapperCol="{ span: 24 }" style="text-align: center">
        <a-button type="primary" html-type="submit" @click="check">下一步</a-button>
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
import { message } from 'ant-design-vue';
import dayjs from 'dayjs';
import emitter from '@/utils/bus';
import { defineComponent, reactive } from 'vue';
export default defineComponent({
  setup() {
    var i = 0
    const formState = reactive({
      questions: [], // question[i]:{name:, key:, choices:[]}
      date: undefined,
    });

    const disabledDate = current => {
      // Can not select days before today and today
      // console.log('zhehsi sha :::',current)
      return current && current < dayjs().endOf('second');
    };

    const removeDomain = item => {
      for (let i = 0; i < formState.questions.length; i++) {
        let index = formState.questions[i].choices.indexOf(item);
        if (index !== -1) {
          formState.questions[i].choices.splice(index, 1);     //删除choices数组从index往后1个
          break;
        }
      }
    };

    const removeQuestion = item => {
      let index = formState.questions.indexOf(item);
      //console.log("item:",item)
      //console.log(formState.questions)
      if (index !== -1) {
        formState.questions.splice(index, 1);
        i = i - 1
      }
    };

    const addDomain = () => {
      formState.questions[formState.questions.length - 1].choices.push({   //只给最后一个问题添加选项
        value: " ",
        key: Date.now(),
      })
    };

    const addQuestion = () => {
      var choices = []
      formState.questions[i] = {}
      formState.questions[i].name = " "
      formState.questions[i].choices = choices
      formState.questions[i].key = i
      i = i + 1
      //console.log(formState.questions[0])
    };

    const formItemLayout = {
      labelCol: {
        lg: {
          span: 7,
        },
        sm: {
          span: 7,
        },
      },
      wrapperCol: {
        lg: {
          span: 10,
        },
        sm: {
          span: 12,
          // offset: 7,
        },
      },
    };

    let validateID = async (_rule, value) => {
      if (value === '') {
        return Promise.reject('请输入正确格式问卷主题');
      }
      else if (value.length != value.split(" ").join("").length) {
        return Promise.reject('输入包含空格');
      }
      else {
        return Promise.resolve();
      }
    };

    let validateChoice = async (_rule, value) => {
      //console.log(value)
      for (var i = 0, len = value.length; i < len; i++) {
        if (value[i].value === '') {
          return Promise.reject('所有选项中存在空输入');
        }
        else if (value[i].value.length != value[i].value.split(" ").join("").length) {
          return Promise.reject('选项中存在空格输入');
        }
      }
    };


    /*const rules = {
      title: [{
        required: true,
        validator: validateID,
        trigger: 'change',
      }],
      date: [
        {
          required: true,
          message: '请选择问卷日期',
        },
      ],
      choices: [
        {
          required: true,
          validator: validateChoice,
          trigger: 'change',
        },
      ]
    };
    */
    const rules = () => { };
    return {
      dayjs,
      formState,
      validateID,
      rules,
      disabledDate,
      addDomain,
      removeDomain,
      formItemLayout,
      validateChoice,
      addQuestion,
      removeQuestion
    };
  },

  methods: {
    nextStep() {
      var choice = [], x
      var question = []
      var flag = 1; //flag = 0表示出错
      var res = []
      for (var i = 0, len = this.formState.questions.length; i < len; i++) {
        // console.log(this.formState.choices[i].value)
        // console.log(typeof(this.formState.choices[i].value))
        question.push(this.formState.questions[i])
      }

      //判断是否添加选项
      for (let i = 0; i < question.length; i++) {
        for (let j = 0; j < question[i].choices.lenght; j++) {
          choice.push(question[i].choice[j].value)
        }

        if (question[i].choices.length === 0) {
          flag = 0;
          message.destroy()
          message.warning('请添加问卷选项')
        }
      };

      for (x of choice) {
        if (x == '' || x.length !== x.split(" ").join("").length) {
          flag = 0
        }
      }

      console.log("flag:", flag)
      if (flag == 1) {
        // this.check()
        // this.$emit('nextStep')
        choice = []
        var tmp = []
        for (let i = 0; i < question.length; i++) {
          for (let j = 0; j < question[i].choices.length; j++) {
            //console.log("12312312",question[i])
            choice.push(question[i].choices[j].value)
          }
          tmp.push({ '问题': question[i].name, "选项": choice })
          choice = []
        }
        //console.log(tmp)

        res.push({ startTime: this.formState.date[0], endTime: this.formState.date[1] }, tmp)
        // console.log(res,typeof(res))
        console.log(res)
        emitter.emit("Res", res)
        // this.$emit('nextStep',res)
        // this.send(res)
        this.$emit('nextStep')
        console.log('success')
      }
    },

    check() {
      console.log('当前时间：', dayjs().hour())
      console.log('当前时间：', dayjs().minute())
      this.nextStep()
    },

  }


});
</script>
<style lang="less" >
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

.information {
  line-height: 22px;
  margin-top: 24px;
  // padding: 5px 10px;
  background-color: #fafafa;
  // max-width: 500px;
  margin: 4px auto 10px;

  .ant-row:not(:last-child) {
    margin-bottom: 24px;
  }
}
</style>