var redis=require("redis");
var client = redis.createClient();

client.on("error", function (err) {console.log("Error " + err);return;});
client.flushall();
client.quit();

console.log("REDIS HAS BEEN FLUSHED!");