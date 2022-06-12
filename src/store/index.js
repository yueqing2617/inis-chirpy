import { createStore } from 'vuex'
import { system } from './module/system'
import { tags } from './module/tags'
import { search } from './module/search'
import { ContentTitle } from "@/store/module/contentTitle";

export default createStore({
  modules: {
    system,tags,search,ContentTitle
  }
})
