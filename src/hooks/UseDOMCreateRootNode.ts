import {onUnmounted} from "vue";

function useDOMCreateRootNode(nodeId: string) {
    const node = document.createElement('div')
    node.id = nodeId
    document.body.appendChild(node)
    onUnmounted(() => {
        document.body.removeChild(node)
    })

}

export default useDOMCreateRootNode
