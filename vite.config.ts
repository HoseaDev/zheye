import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
// https://vitejs.dev/config/
import {resolve} from "path"


export default defineConfig(({command, mode}) => {
    return {
        plugins: [vue()],
        resolve: {
            alias: {
                "@": resolve(__dirname, "src")
            }
        },
        server: {
            cors: true, // 默认启用并允许任何源
            proxy: {
                '/o': {  //代理/o的路径
                    target: 'http://api.vikingship.xyz/',   //需要代理的地址
                    changeOrigin: true,
                    ws: true,
                    secure: true,
                    rewrite: (path) => path.replace(/^\/o/, '')   //替换的路径
                    //原地址:http://api.vikingship.xyz/api/columns?currentPage=1&pageSize=5
                    //替换后使用方法.此处一定要不设置Base_URL.会覆盖掉这里.
                    //axios.get('/o/api/columns?currentPage=1&pageSize=5')
                    //也就是说/o就等于target
                },
            }
        }
    }


})
// export default defineConfig(({ command, mode }) => {
//     if (command === 'serve') {
//         return {
//             // dev 独有配置
//         }
//     } else {
//         // command === 'build'
//         return {
//             // build 独有配置
//         }
//     }
// })
