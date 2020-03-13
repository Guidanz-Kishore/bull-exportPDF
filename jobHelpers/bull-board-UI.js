const Queue = require('bull')
const { setQueues } = require('bull-board')

const someQueue = new Queue('pdfReport')

setQueues([someQueue])

const app = require('express')()
const { UI } = require('bull-board')

app.use('/admin/queues', UI)
app.listen(3056);