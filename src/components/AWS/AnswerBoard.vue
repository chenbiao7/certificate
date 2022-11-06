<template>
<!-- <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" /> -->
<div id="answer-board" style="width:100%">
	总题数: {{Total}}
	<el-form :inline="true" :model="ConditionQueryForm" class="demo-form-inline">
    <el-form-item label="Approved by">
      <el-input v-model="ConditionQueryForm.Count" placeholder="Approved by" />
    </el-form-item>
    
    <el-form-item>
      <el-button type="primary" @click="onSubmit">Query</el-button>
    </el-form-item>
  </el-form>
	
  <div class="stem">{{ (StemList[CurrentCnt]|| {})['stem'] || '' }} <el-tag v-if="(StemList[CurrentCnt]|| {})['is_confirm'] || false " type="success">confirmed</el-tag></div>
  <div v-if="((StemList[CurrentCnt]|| {})['is_multiple'] || false) == false">
    <el-radio-group v-model="SingleOption">
      <div v-for="choice in (StemList[CurrentCnt]|| {})['choices'] || []" :key="choice" style="width:100%;margin:10px">
        <el-radio :label="choice['option']" size="large">{{choice['option']}}、{{choice['content']}}</el-radio>
      </div>
    </el-radio-group>
  </div>
  <div v-else>
    <el-checkbox-group v-model="MultipleOptions">
      <div v-for="choice in (StemList[CurrentCnt]|| {})['choices'] || []" :key="choice">
        <el-checkbox :label="choice['option']" size="large">{{choice['option']}}、{{choice['content']}}</el-checkbox>
      </div>
    </el-checkbox-group>
  </div>

  <div v-if="((StemList[CurrentCnt]|| {})['is_multiple'] || false) == true">
    <el-button type="primary" @click=submitMultipOptions>Primary</el-button>
  </div>
  <div v-else>
    <el-button type="primary" @click=submitSingleOption>Primary</el-button>
  </div>
  <div class="example-pagination-block">
    <el-pagination ref="page" 
		:current-page="CurrentPage" 
		layout=" prev, pager, next, jumper" 
		:total="StemList.length" 
		:page-size=1 
		@current-change="handlePageChange" />
  </div>
</div>
</template>

<style scoped>
.example-pagination-block+.example-pagination-block {
  margin-top: 10px;
}

.example-pagination-block .example-demonstration {
  margin-bottom: 16px;
}

:deep() .el-radio__label  {
  word-break: normal;
  width: auto;
  display: block;
  white-space: pre-wrap;
  word-wrap: break-word;
  overflow: hidden;
}
:deep() .el-check__label {
  word-break: normal;
  width: auto;
  display: block;
  white-space: pre-wrap;
  word-wrap: break-word;
  overflow: hidden;
}
:deep() .el-checkbox__label {
  word-break: normal;
  width: auto;
  display: block;
  white-space: pre-wrap;
  word-wrap: break-word;
  overflow: hidden;
}


</style>


<script lang="ts">
export default {
  name: 'AnswerBoard',
  data() {
    return {
			originalStemList:[],
      StemList: [],
			Total: 0 ,
      CurrentCnt: 0,
      SingleOption: "",
      MultipleOptions: [],
      CurrentPage: 1,
			RightAnswer: '',
			ConditionQueryForm:{
				Count: ''
			}
    }
  },
  mounted() {
    const name = (this.$route || {}).name
    if (name == "das_answer") {
      this.$axios("/data/das.json").then(
        res => {
					this.originalStemList = [...res.data['data']]
          this.StemList = res.data['data']
					this.Total = res.data['data'].length
					console.log(this.originalStemList)
        }
      )
    }
  },
  methods: {
    submitSingleOption() {
      if (this.SingleOption == ((this.StemList[this.CurrentCnt] || {})['answer'] || [])[0]) {
        this.$notify({
          type: 'success',
          message: '答案正确,正确答案是' +((this.StemList[this.CurrentCnt] || {})['answer'] || []).join(','),
					title:'恭喜，回答正确',
					showClose: false,
        })
      } else {
        this.$notify({
          type: 'error',
          message: '答案错误,正确答案是' +((this.StemList[this.CurrentCnt] || {})['answer'] || []).join(','),
					title:'恭喜，回答错误',
					showClose: false,
        })
      }
      // if (this.CurrentCnt == this.StemList.length - 1) {
        // this.jumpToTheFirst()
				// console.log("111")
				
      // } else {
        // this.jumpToTheNext()
				// console.log("111")
      // }

    },
    submitMultipOptions() {
      //判断和正常答案长度是否一致-标准答案
      const ans = (this.StemList[this.CurrentCnt] || {})['answer'] || []
      if (ans.length === this.MultipleOptions.length && ans.sort().toString() === this.MultipleOptions.sort().toString()) {
        this.$notify({
          type: 'success',
          message: '答案正确,正确答案是' +((this.StemList[this.CurrentCnt] || {})['answer'] || []).join(','),
					title:'恭喜，回答正确',
					showClose: false,
        })
      } else {
        this.$notify({
          type: 'error',
          message: '答案错误,正确答案是' +((this.StemList[this.CurrentCnt] || {})['answer'] || []).join(','),
					title:'很可惜，回答错误',
					showClose: false,
        })
      }
      // if (this.CurrentCnt == this.StemList.length - 1) {
      //   // this.jumpToTheFirst()
			// 	console.log("111")
      // } else {
      //   // this.jumpToTheNext()
			// 	console.log("111")
      // }

    },
    handlePageChange(currentPage) {

      this.CurrentPage = currentPage
      this.CurrentCnt = currentPage - 1
      this.SingleOption = ""
      this.MultipleOptions = []

    },
    jumpToTheNext() {
      this.CurrentCnt += 1
      this.CurrentPage = this.CurrentCnt + 1
      this.SingleOption = ""
      this.MultipleOptions = []

    },
    jumpToTheFirst() {

      this.CurrentCnt = 0
      this.CurrentPage = 1
      this.SingleOption = ""
      this.MultipleOptions = []

    },
		onSubmit(){
			const arr = [...this.originalStemList]
			arr.sort(function() {  
				return Math.random() - 0.5 
			})
			this.StemList = [...arr.splice(0,this.ConditionQueryForm.Count)]
			this.jumpToTheFirst()

		}
  },
}
</script>
