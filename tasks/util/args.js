// 文件目的：处理命令行参数

// 引入nmp包yargs来处理命令行参数
import yargs from 'yargs';

const args = yargs

    // 区分开发环境和线上环境
    .option('production', {
        boolean: true,
        default: false,
        describe: 'min all scripts'
    })

    // 要不要监听文件变化
    .option('watch', {
        boolean: true,
        default: false,
        describe: 'watch all files'
    })

    // 要不要输出命令行执行的详细日志
    .option('verbose', {
        boolean: true,
        default: false,
        describe: 'log'
    })

    // 强制生成映射文件
    .option('sourcemaps', {
        describe: 'force the creation of sourcemaps'
    })

    // 端口设置
    .option('port', {
        string: true,
        default: 8080,
        describe: 'server port'
    })

    // 表示对输入的命令行内容以字符串进行解析
    .argv

export default args