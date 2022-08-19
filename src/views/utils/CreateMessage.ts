import {createApp, h, render} from "vue";
import Message, {MessageType} from '../../components/Message.vue'

const createMessage = (msg: string, type: MessageType, timeout?: number) => {

    const vNode = h(Message, {type, msg})
    const node = document.createElement('div')
    render(vNode, node)
    document.body.appendChild(node)
    if (timeout){
        setTimeout(() => {
            destroy()
        }, timeout)

    }
    const destroy = () => {
        document.body.removeChild(node)
        render(null, node)
    }
    return { destroy }
}

export default createMessage
