<template>
  <span @click="toggle"> <i class="mode-toggle fas fa-sun" v-if="mode !='dark'"></i> <i class="mode-toggle fas fa-moon" v-else></i>  </span> 
    <span class="icon-border"></span> 
</template>

<script>
import { ModeToggle } from '@/utils/theme'
import { reactive, toRefs } from '@vue/reactivity'
export default {
    name : 'Theme',
    setup(){
        
        const toggle = new ModeToggle()
        const state = reactive({
            mode : toggle.mode
        })
        const methods = {
            toggle(){
                toggle.flipMode()
                state.mode = toggle.mode
            }
        }
        return {
            ...toRefs(state),
            ...methods
        }
    }
}
</script>

<style scoped>
.mode-toggle{
    cursor: pointer;
}
</style>