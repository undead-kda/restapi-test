import Vue from 'https://cdn.jsdelivr.net/npm/vue@2.6.12/dist/vue.esm.browser.js'

new Vue({
   el: '#app',
   data() {
      return {
         form: {
            title: '',
            text: ''
         },
         content: []
      }
   },
   computed: {
      canCreate() {
         return this.form.title.trim() && this.form.text.trim()
      }
   },
   methods: {
      async createMessage() {
         const {...msg} = this.form
         const newMsg = await request('api/content', 'POST', msg)
         this.content.push(newMsg)
         this.form.title = this.form.text = ''
      },
      async removeMessage(id) {
         await request(`/api/content/${id}`, 'DELETE')
         this.content = this.content.filter(c => c.id !== id)
      }
   },
   async mounted() {
      this.content = await request('/api/content')
   }
})

async function request(url, method = 'GET', data = null) {
   try {
      const headers = {}
      let body

      if (data) {
         headers['Content-Type'] = 'application/json'
         body = JSON.stringify(data)
      }

      const response = await fetch(url, {
         method,
         headers,
         body
      })
      return await response.json()
   } catch(e) {
      console.warn('Error:', e.message)
   }
}