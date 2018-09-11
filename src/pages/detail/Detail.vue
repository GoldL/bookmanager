<template>
  <div>detail:{{bookid}}</div>
</template>
<script>
import { bookDetailUrl } from 'api/api'
import { get } from 'utils/utils'
export default {
  name: 'Detail',
  data () {
    return {
      bookid: ''
    }
  },
  methods: {
    async getDetail () {
      const info = await get(bookDetailUrl, { id: this.bookid })
      console.log(info)
    }
  },
  mounted () {
    this.bookid = this.$root.$mp.query.id
    this.getDetail()
  }
}
</script>
