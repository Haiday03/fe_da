"devServer" = {
    "historyApiFallback":  true,
    "proxy": {
      "/api": {
        "target" : "http://localhost:8081",
        "secure": false
      }
    }
  }