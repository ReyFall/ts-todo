"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("../config");
var express = require('express');
var bodyParser = require('body-parser');
var fs = require('fs');
var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Access-Control-Allow-Origin, Origin, X-Requested-With, Content-Type, Accept');
    next();
});
app.get('/', (req, res) => {
    res.set({ 'Content-Type': 'text/html; charset=utf-8' });
    res.status(200).send('Hello World!');
});
app.all('/getList', (req, res) => {
    res.set({ 'Content-Type': 'text/html; charset=utf-8' });
    fs.readFile(config_1.fileName, (err, data) => {
        console.log(req.query.search);
        if (!req.query.search) {
            res.status(200).send(data.toString());
        }
        else {
            let json = JSON.parse(data.toString());
            let result = json.filter((item) => item.text.toLowerCase().includes(req.query.search.toLowerCase()));
            res.status(200).send(result);
        }
    });
});
app.post('/addItem', (req, res) => {
    res.set({ 'Content-Type': 'text/html; charset=utf-8' });
    fs.readFile(config_1.fileName, (err, data) => {
        let json = JSON.parse(data.toString());
        let maxId = 0;
        for (let i = 0; i < json.length; i++) {
            if (json[i].id > maxId)
                maxId = json[i].id;
        }
        console.log(req.query, req.body, maxId);
        json.push({
            id: maxId + 1,
            text: req.body.text,
            isDone: false,
        });
        fs.writeFile(config_1.fileName, JSON.stringify(json), (err) => {
            if (err)
                throw err;
            console.log('File updated!');
        });
        res.status(200).send(json);
    });
});
app.all('/editItem', (req, res) => {
    res.set({ 'Content-Type': 'text/html; charset=utf-8' });
    fs.readFile(config_1.fileName, (err, data) => {
        console.log(req.query, req.body);
        let json = JSON.parse(data.toString());
        for (let i = 0; i < json.length; i++) {
            if (json[i].id === Number(req.body.id))
                json[i] = {
                    id: Number(req.body.id),
                    text: req.body.text,
                    isDone: Boolean(req.body.isDone),
                };
        }
        fs.writeFile(config_1.fileName, JSON.stringify(json), (err) => {
            if (err)
                throw err;
            console.log('File updated!');
        });
        res.status(200).send(json);
    });
});
app.all('/deleteItem', (req, res) => {
    res.set({ 'Content-Type': 'text/html; charset=utf-8' });
    fs.readFile(config_1.fileName, (err, data) => {
        console.log(req.query, req.body);
        let json = JSON.parse(data.toString());
        json = json.filter((item) => item.id !== Number(req.body.id));
        fs.writeFile(config_1.fileName, JSON.stringify(json), (err) => {
            if (err)
                throw err;
            console.log('File updated!');
        });
        res.status(200).send(json);
    });
});
fs.writeFile(config_1.fileName, JSON.stringify(config_1.defaultData), (err) => {
    if (err)
        throw err;
    console.log('File created!');
});
app.listen(config_1.port, () => {
    console.log(`Listen on:\nhttp://localhost:${config_1.port}`);
});
//# sourceMappingURL=app.js.map