<template>
  <div>
    User {{$route.params.name}}
    <p> state count is {{ count }} </p>
    <p> local count is {{ localCount }} </p>
    <p> sum count is {{ sumLocalAndState }} </p>
    <p> state and local sum count is {{ sumLocalCount }} </p>
    <p>
      {{ result }}
    </p>
  </div>
</template>

<script>
import {getAllMember} from "../api/request"
import {mapState} from "vuex";

export default {
  name: "Main",
  data() { //data가 함수인 이유는 각 컴포넌트마다 독립성을 갖도록 하기 위해서이다.
    return {
      dataCount: 10,
      result: {}
    }
  },
  computed: {
    ...mapState({
      count: state => state.sample.count,
      // local 상태에 접근하려면 일반 함수 사용해야 한다.
      sumLocalCount () {
        return this.count+ this.localCount;
      }
    }),
    localCount () {
      return 100;
    },
    sumLocalAndState () {
      return this.localCount + this.count;
    }
  },
  created() {
    getAllMember('dbTest')
    .then(response => this.result = response.data);
  }
}
</script>

<style scoped>

</style>