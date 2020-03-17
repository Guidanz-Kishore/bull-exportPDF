var {Kibana}=require('../vizSource/kibana/index')
var {Grafana}=require('../vizSource/grafana/index')
var proces=require('process');
const fs=require('fs');
const classesMapping={
  'grafana':Grafana,
  'kibana':Kibana
}
module.exports=processQueue=(job)=>new Promise((resolve,reject)=>{
  console.log(`${job.data.fileName} is going to sleep with pid `+process.pid);
  setTimeout(() => {
    const vizObj=new classesMapping[job.data.vizSource]();
    if (!fs.existsSync('.'+job.data.downloadPath)) {
      fs.mkdirSync('.'+job.data.downloadPath);
     }
     let path=process.cwd()+job.data.downloadPath+'/'+job.data.fileName+'.'+job.data.downloadType;
    vizObj.executePuppeteer(job.data.url,path,job.data.downloadType,job.data.sendMail,job.data.design,job.data.fileName).then((result)=>{
      console.log('Completed:',result);
      resolve('Completed:'+result);
    }).catch((error)=>{
      console.log('Failed:'+error);
      reject('Failed'+error);
    });
  }, 10000);
});

// module.exports=processQueue=(job)=>{
//   if(job.data.msg.includes('3000')){
//     return Promise.reject('Failed:');
//   }
//   else{
//     return Promise.resolve('Completed:')
//   }
// }