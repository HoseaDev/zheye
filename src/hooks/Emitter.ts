import mitt from "mitt";
import {ComponentInternalInstance} from "@vue/runtime-core";


type Events = {
    // 'input-created':  () => boolean
    'input-created': ComponentInternalInstance
}

const emitter = mitt<Events>()
export default emitter
