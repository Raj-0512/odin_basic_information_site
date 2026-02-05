import http from "http";
import fs from "fs";
import path from "path";

const server = http.createServer((req, res) => {

    let filePath = "";

    if (req.url === "/" || req.url === "/index")
    {
        filePath = "index.html";
    }
    else if (req.url === "/about")
    {
        filePath = "about.html";
    }
    else if (req.url === "/contact_me")
    {
        filePath = "contact_me.html";
    }
    else if (req.url === "/style.css")
    {
        filePath = "style.css";
    }
    else
    {
        filePath = "404.html";
    }

    let contentType =
        filePath.endsWith(".css") ? "text/css" : "text/html";

    fs.readFile(path.join(process.cwd(), filePath), (err, data) => {

        if (err)
        {
            res.writeHead(500);
            res.end("Server error");
            return;
        }

        res.writeHead(
            filePath === "404.html" ? 404 : 200,
            { "Content-Type": contentType }
        );

        res.end(data);

    });

});

server.listen(8080, "localhost", () => {
    console.log("Server running at http://localhost:8080/");
});
