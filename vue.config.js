module.exports = {
    // 配置本地接口代理
    devServer: {
      host: "localhost",
      port: 8888,
      https: false,
      open: true,
      disableHostCheck: true,
      // 设置代理
      proxy: {
        "/session": {
          // target: 'http://2929803sy1.qicp.vip/api/', // 花生壳
          // target: 'http://tback.ice980.com/api/',
          // target: 'http://192.168.11.127:8051/api/', // 张鹏
          // target: 'http://192.168.11.130:8051/api/', // 阿康
          // target: 'http://192.168.11.132:8051/api/', // 呆萌
          target: "http://129.204.215.114:80/", // 局域
          changeOrigin: true,
          ws: true,
        },
        "/jielong": {
            // target: 'http://2929803sy1.qicp.vip/api/', // 花生壳
            // target: 'http://tback.ice980.com/api/',
            // target: 'http://192.168.11.127:8051/api/', // 张鹏
            // target: 'http://192.168.11.130:8051/api/', // 阿康
            // target: 'http://192.168.11.132:8051/api/', // 呆萌
            target: "http://129.204.215.114:81/", // 局域
            changeOrigin: true,
            ws: true,
          },
          
      },
    },
  };