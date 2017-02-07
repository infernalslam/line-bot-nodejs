var express = require('express')
var bodyParser = require('body-parser')
var request = require('request')
var app = express()
/*eslint-disable */
var env = require('dotenv').config({ path: __dirname + '/.env' })
/*eslint-enable */

app.use(bodyParser.json())

app.set('port', (process.env.PORT || 4000))
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

app.post('/webhook', (req, res) => {
  var text = req.body.events[0].message.text
  var sender = req.body.events[0].source.userId
  var replyToken = req.body.events[0].replyToken
  console.log(text, sender, replyToken)
  console.log(req.body.events[0])
  if (text === 'สวัสดี' || text === 'Hello' || text === 'hello') {
    replyMessage(sender, text)
  }
  res.sendStatus(200)
})

function replyMessage (sender, text) {
  let data = {
    to: sender,
    messages: [
      {
        type: 'text',
        text: 'สวัสดีค่ะ เราเป็นผู้ช่วยปรึกษาด้านความรัก สำหรับหมามิ้น 💞'
      },
      {
        type: 'text',
        text: text
      }
    ]
  }
  request({
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + process.env.CHANNEL_ACCESS_TOKEN
    },
    url: 'https://api.line.me/v2/bot/message/reply',
    method: 'POST',
    json: data
  }, function (err, res, body) {
    if (err) console.log(err)
    if (res) console.log(res)
  })
}

app.listen(app.get('port'), function () {
  console.log('run at port', app.get('port'))
})
