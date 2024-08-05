
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();

app.use(express.static("public"));
app.use(bodyParser.json());

app.post('/upload-csv', (req, res) => {
    // CSVデータをリクエストボディから取得
    const csvData = req.body.data;
    if (!csvData) {
        return res.status(400).send('データがありません');
    }

    // ファイル名の生成
    const date = new Date();
    const dateString = date.getFullYear() + ("0"+(date.getMonth()+1)).slice(-2) + ("0"+date.getDate()).slice(-2) + ("0"+date.getHours()).slice(-2) + ("0"+date.getMinutes()).slice(-2) + ("0"+date.getSeconds()).slice(-2);
    const filename = 'data_' + dateString + '.csv';

    // CSVデータをファイルとして保存
    fs.writeFile('/usr/src/data/' + filename, csvData, 'utf8', (err) => {
        if (err) {
            console.error(err);
            return res.status(500).send('ファイルの保存に失敗しました');
        }
        res.send('ファイルが正常に保存されました');
    });
});

const port = 21080;
app.listen(port, () => {
    console.log(`サーバーがポート${port}で稼働しています`);
});
