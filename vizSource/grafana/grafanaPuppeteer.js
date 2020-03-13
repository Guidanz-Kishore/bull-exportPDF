const {Puppeteer}=require('../abstractVizSource/puppeteerBaseClass');
const puppeteer = require('puppeteer');
const {MailService}=require('../../utils/emailService/index');
/**
 * GrafanaPuppeteer.
 *
 * @class GrafanaPuppeteer
 * @extends {Puppeteer}
 */

 class GrafanaPuppeteer extends Puppeteer
 {
   constructor()
   {
     super();
   }

   renderPDF=(url,path,sendMail)=> new Promise((resolve,reject)=>{
    //TODO
   puppeteer.launch({headless:true,executablePath:'/usr/bin/google-chrome'}).then((browser)=>{
     browser.newPage().then((page)=>{
       page.goto(url,{waitUntil: 'networkidle0'}).then(async(result)=>{
         await page.type("[name='user']", "admin")
         await  page.type("[name='password']", "admin")
         await  page.click('#login-view .login-form-group [type = "submit"]')
         page.waitForSelector('.btn.btn-link').then(async()=>{
           await page.click('.btn.btn-link');
           page.reload({waitUntil: 'networkidle0'}).then((element)=>{
             page.pdf({path: path,format:'A4'}).then((res)=>{
               console.log('PDF generated Successfully');
               if(sendMail===true){
                 let mailObj=new MailService(path);
                 mailObj.sendMail().then((result)=>{
                   // console.log('Mail sent successfully:',result.response);
                   console.log('Mail sent successfully\n'+result.response)
                   resolve('PDF generated Successfully + Mail sent successfully')
                 }).catch((error)=>{
                   // console.log('Error in sending mail:',error);
                   reject('Error in sending mail\n'+error)
                 })
               }
               else{
                 console.log('No mail sent:sendMail is false');
                 resolve('PDF generated Successfully without mail');
               }
             
               browser.close();
             }).catch((err)=>{
               // console.log('Error in taking screenshot',err)
               reject('Error in taking screenshot\n'+err)
             })
           }).catch((err)=>{
             // console.log('Reload Failed:',err);
             reject('Reload Failed\n'+err)
           })
           
         }).catch((error)=>{
           // console.log('Error in page.waitForSelector():',error);
           reject('Error in page.waitForSelector()\n'+error)
         })
         
       }).catch((error)=>{
         // console.log('Error in loading URL',error);
          reject('Error in loading URL\n'+error);
       })
     }).catch((error)=>{
       // console.log('Error in generating new page',error);
       reject('Error in generating new page\n'+error)
     })
   }).catch((error)=>{
     // console.log('Error in launching browser',error);
     reject('Error in launching browser\n'+error);
   })
  })

  renderPNG=(url,path,sendMail)=> new Promise((resolve,reject)=>{
    //TODO
   puppeteer.launch({headless:true,executablePath:'/usr/bin/google-chrome'}).then((browser)=>{
     browser.newPage().then((page)=>{
       page.goto(url,{waitUntil: 'networkidle0'}).then(async(result)=>{
         await page.type("[name='user']", "admin")
         await  page.type("[name='password']", "admin")
         await  page.click('#login-view .login-form-group [type = "submit"]')
         page.waitForSelector('.btn.btn-link').then(async()=>{
           await page.click('.btn.btn-link');
           page.reload({waitUntil: 'networkidle0'}).then((element)=>{
             page.screenshot({path: path}).then((res)=>{
               console.log('PNG generated Successfully');
               if(sendMail===true){
                 let mailObj=new MailService(path);
                 mailObj.sendMail().then((result)=>{
                   // console.log('Mail sent successfully:',result.response);
                   console.log('Mail sent successfully\n'+result.response)
                   resolve('PNG generated Successfully + Mail sent successfully')
                 }).catch((error)=>{
                   // console.log('Error in sending mail:',error);
                   reject('Error in sending mail\n'+error)
                 })
               }
               else{
                 console.log('No mail sent:sendMail is false');
                 resolve('PNG generated Successfully without mail');
               }
               browser.close();
               
             }).catch((err)=>{
               // console.log('Error in taking screenshot',err)
               reject('Error in taking screenshot\n'+err)
             })
           }).catch((err)=>{
             // console.log('Reload Failed:',err);
             reject('Reload Failed\n'+err)
           })
           
         }).catch((error)=>{
           // console.log('Error in page.waitForSelector():',error);
           reject('Error in page.waitForSelector()\n'+error)
         })
         
       }).catch((error)=>{
         // console.log('Error in loading URL',error);
          reject('Error in loading URL\n'+error);
       })
     }).catch((error)=>{
       // console.log('Error in generating new page',error);
       reject('Error in generating new page\n'+error)
     })
   }).catch((error)=>{
     // console.log('Error in launching browser',error);
     reject('Error in launching browser\n'+error);
   })
  })
 }

 module.exports={GrafanaPuppeteer}