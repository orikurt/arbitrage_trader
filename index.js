const WebSocket = require('ws');

const exchange_urls = {
    binance: "wss://stream.binance.com:9443/ws/!ticker@arr"
}

const feed_handlers = {
    binance: function(msg){
        let tickers = JSON.parse(msg);
        for (var i in tickers){
            let t = tickers[i];
            console.log("BINANCE Symbol: ", t.s, " bid: ", parseFloat(t.b), " ask: ", parseFloat(t.a));
        }
    }
}

let sockets = {};

for (exchange in exchange_urls){
    sockets[exchange] = new WebSocket("wss://stream.binance.com:9443/ws/!ticker@arr");
    sockets[exchange].on('open', ()=>{
        console.log(exchange, "connected");
    });
    sockets[exchange].on('message', feed_handlers[exchange]);
}
