

<script>
import { loadProductsApi, deleteOneApi } from '@/api/products'
export default {
  name: 'ProductList',
  data() {
    return {
      list: [],
      pages: 1
    }
  },
  created() {
    //
    this.loadData()
  },
  methods: {
    async loadData(page = 1) {
      const data = await loadProductsApi(page)
      console.log(data)
      this.list = data.data
      this.pages = data.pages
    },
    editOne(item){
      this.$router.push({
        name:'ProductNew',
        query:{
          id:item.id
        }
      })
    },
   async delOne(item){
         await deleteOneApi(item.id)
         this.loadData()
    }
  }
}
</script>

<style>

</style>