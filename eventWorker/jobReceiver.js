const Queue=require('bull');
const receiverQueue=new Queue('pdfReport');
let path=process.cwd()+'/'+'workerProcess';
receiverQueue.process(3,path);