import {onMounted, onUnmounted, ref, Ref} from "vue";

export const useClickOutside = (re: Ref<null | HTMLElement>) => {
    const isClickOutside = ref<Boolean>()

    const handleCloseClick = (e: MouseEvent) => {
        if (re.value) {
            // console.log(dropDownRef.value)
            // console.log(e.target)
            if (!re.value.contains(e.target as HTMLElement)) {
                isClickOutside.value = false
            } else {
                isClickOutside.value = true
            }
        }
    }

    onMounted(() => {
        document.addEventListener('click', handleCloseClick)
    })
    onUnmounted(() => {
        document.removeEventListener('click', handleCloseClick)
    })

    return isClickOutside

}
