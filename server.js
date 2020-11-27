const http = require('http');
const EventEmitter = require('events');

class CS extends EventEmitter{
    constructor(){
        super()
        this.port = 3000
        this.host = "127.0.0.1"
    };

    getData() {
        const server = http.createServer( (req, res) => {
            if (req.method == 'POST') {
                res.writeHead(200, {'Content-Type': 'text/html'});

                let body = '';
                req.on('data', (data) => {
                    body += data;
                });

                req.on('end', () => {
                    this.handleData(body)
                    res.writeHead(200)
                });
            }else{
                res.writeHead(400)
            };
        });
        
        this.makeConnection(server)
    }

    makeConnection(server) {
        server.listen({host: this.host, port: this.port},
            () => console.log("listening"))
    }

    handleData(data) {
        const json = JSON.parse(data);
        this.emit("state", json)
    }

}

const csgo = new CS();
csgo.getData()

csgo.on("state", (a) => {
    console.log(a)
})