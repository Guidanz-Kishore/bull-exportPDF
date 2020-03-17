const {Kibana}=require('../vizSource/kibana/index')
const {Grafana}=require('../vizSource/grafana/index')
const homeDir=require('../util');
const fs=require('fs');
const classesMapping={
  'grafana':Grafana,
  'kibana':Kibana
}
module.exports=processQueue=(job)=>new Promise((resolve,reject)=>{
  console.log(`${job.data.fileName} is going to sleep with pid `+process.pid);
    let folderPath='/reportSamples';
    const vizObj=new classesMapping[job.data.vizSource]();
    if (!fs.existsSync(homeDir.homeDir+'/.'+folderPath)) {
      fs.mkdirSync(homeDir.homeDir+'/.'+folderPath);
     }
     folderPath=homeDir.homeDir+folderPath;
    if (!fs.existsSync(folderPath+'/.'+job.data.downloadPath+'s')) {
      fs.mkdirSync(folderPath+'/.'+job.data.downloadPath+'s');
     }
     let path=`${folderPath}/${job.data.downloadPath}s/${job.data.fileName}.${job.data.downloadType}`;
    vizObj.executePuppeteer(job.data.url,path,job.data.downloadType,job.data.sendMail,job.data.design,job.data.fileName).then((result)=>{
      console.log('Completed:',result);
      resolve('Completed:'+result);
    }).catch((error)=>{
      console.log('Failed:'+error);
      reject('Failed'+error);
    });
});

// module.exports=processQueue=(job)=>{
//   if(job.data.msg.includes('3000')){
//     return Promise.reject('Failed:');
//   }
//   else{
//     return Promise.resolve('Completed:')
//   }
// }