<template>
  <div>
    User {{$route.params.name}}
    <p>
      state count is {{ count }}
    </p>
    <p>
      {{ result }}
    </p>
  </div>
</template>

<script>
import request from "@/api";
export default {
  name: "Main",
  data() { //data가 함수인 이유는 각 컴포넌트마다 독립성을 갖도록 하기 위해서이다.
    return {
      result: {}
    }
  },
  computed: {
    count () {
      return this.$store.state.count;
    }
  },
  created() {
    request('dbTest')
    .then(response => this.result = response.data);
  }
}
</script>

<style scoped>

</style>