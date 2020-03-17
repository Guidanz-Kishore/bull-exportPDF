const Queue=require('bull');
const receiverQueue=new Queue('apiqueue');
let path=process.cwd()+'/'+'workerProcess1';
receiverQueue.process(3,path);