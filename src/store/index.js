import { createStore } from 'vuex'
import { system } from './module/system'
import { tags } from './module/tags'
import { search } from './module/search'
import { context} from "@/store/module/context";

export default createStore({
  modules: {
    system,tags,search,context
  }
})
