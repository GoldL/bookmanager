<template>
  <div>
    <book-info :info="info"></book-info>
  </div>
</template>
<script>
import { bookDetailUrl } from 'api/api'
import { get } from 'utils/utils'
import BookInfo from 'components/BookInfo'
export default {
  name: 'Detail',
  components: {
    BookInfo
  },
  data () {
    return {
      bookid: '',
      info: {}
    }
  },
  methods: {
    async getDetail () {
      const info = await get(bookDetailUrl, { id: this.bookid })
      wx.setNavigationBarTitle({ title: info.title })
      this.info = info
    }
  },
  mounted () {
    this.bookid = this.$root.$mp.query.id
    this.getDetail()
  }
}
</script>
