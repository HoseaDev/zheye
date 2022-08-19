import {defineComponent, h} from "vue";
import {strict} from "assert";

export default defineComponent({
        name: "TestRender",
        props: {
            msg: {
                type: String,
                required: true
            }
        },

        setup(props) {
            return () => (
                <div>
                    <h1>{props.msg}</h1>
                </div>

            )
        }
    }
)
