const Queue=require('bull');
const receiverQueue=new Queue('pdfReport');
receiverQueue.process(3,'/home/guidanz-kishore/Documents/workspace/skedler-new_Kish-new/eventWorker/workerProcess')