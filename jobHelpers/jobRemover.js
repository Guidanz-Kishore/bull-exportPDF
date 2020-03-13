var Queue = require('bull');
var reportQueue = new Queue("pdfReport");
reportQueue.getRepeatableJobs().then((result)=>{
  console.log('3333',result);
  for(let i=0;i<result.length;i++){
    reportQueue.removeRepeatable({attempts:2,cron:"0/10 * * * * *",jobId:i.toString()}).then((res)=>{ 
      console.log('www',res);
    });
  }
})
