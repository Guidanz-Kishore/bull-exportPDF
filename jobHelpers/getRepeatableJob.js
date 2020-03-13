var Queue = require('bull');
var reporterQueue = new Queue("pdfReport");
reporterQueue.getRepeatableJobs().then((result)=>{
  console.log('zzz',result);
})
