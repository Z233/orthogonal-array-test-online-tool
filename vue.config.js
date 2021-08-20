module.exports = {
    publicPath: "",
    chainWebpack: config => {
        config
            .plugin("html")
            .tap(args => {
                args[0].title = "正交测试用例生成工具";
                return args;
            })
    }
}