const {Puppeteer}=require('../abstractVizSource/puppeteerBaseClass');
const puppeteer = require('puppeteer');
const {MailService}=require('../../utils/emailService/index');
const fs=require('fs');
/**
 * KibanaPuppeteer.
 *
 * @class KibanaPuppeteer
 * @extends {Puppeteer}
 */

 class KibanaPuppeteer extends Puppeteer{
  constructor()
  {
    super();
  }

  renderPDF=(url,path,sendMail,design)=>new Promise((resolve,reject)=>{
    //TODO
    let height;
    let time;
    let width;
    let smartHeight;
    let smartWidth;
    let styleHeight;
    let styleWidth;
    let  titleClassW = 'width:100%;text-align:center !important;text-overflow: ellipsis;white-space: pre;overflow: hidden;'
    let dataTimeClassW = 'width:26%';
    let title='helloSkedler'
  puppeteer.launch({headless:true,executablePath:'/usr/bin/google-chrome',
}).then((browser)=>{
    browser.newPage().then((page)=>{
      // console.log('URL starting at 0 secs');
      const beginBeforeURL=Date.now();
      page.goto(url,{waitUntil: 'networkidle0'}).then(async(result)=>{
        const beginAfterURL=Date.now();
      // console.log('URL loaded at ',(Date.now()-beginBeforeURL)/1000+'secs');
        await page.waitForSelector('.react-grid-layout').then(async(el)=>{
          switch (design.template) {
            case 'No Template':
              if(design.layout==='Dashboard Layout'){
                // console.log('evaluation started at ',(Date.now()-beginBeforeURL)/1000+'secs');
                  await page.$eval('.react-grid-layout', el => {
                    const newParent = document.getElementById('kibana-body');
                    newParent.appendChild(el);
                  });
                  await page.$eval('.content', el => el.remove());
                  let dashboardHeight=await page.$eval('.react-grid-layout', el => parseInt(el.style.height));
                  dashboardHeight=dashboardHeight+153.5;
                  let dashboardWidth=2048;
                  await page.setViewport({
                    width: dashboardWidth, 
                    height: 1024,
                  });
                  width=dashboardWidth;
                  height=dashboardHeight;
                  // console.log('evaluation completed at ',(Date.now()-beginBeforeURL)/1000+'secs');
                  time=7000;
              }
              else{//smart layout
                // console.log('evaluation started at ',(Date.now()-beginBeforeURL)/1000+'secs');
                await page.$eval('.react-grid-layout', el => {
                  const newParent = document.getElementById('kibana-body');
                  newParent.appendChild(el);
                });
                await page.$eval('.content', el => el.remove());
                await page.$eval('.visTooltip',el=>el.remove());
              //   await page.evaluate(() => {
              //     return document.body.innerHTML;
              // }).then(async (dimensions) => {
              //     fs.writeFile('debuglog.html', dimensions, function (err) {
              //         if (err) {
              //             console.log(err);
              //         }
              //         console.log('The file was saved in the path ');
              //     });
              // })
                if(design.orientation==='portrait'){
                  smartWidth=595;
                  smartHeight=842;
                  let length=await page.$('.react-grid-item', el => (el.length));
                  styleHeight='354px';
                  styleWidth='595px';
                }
                else{//landscape
                 smartWidth=842;
                 smartHeight=595;
                 styleHeight='453px';
                 styleWidth='842px';
                }
                width=smartWidth;
                height=smartHeight;
                await page.setViewport({
                  width: width, 
                  height: height,
                });
                await page.addStyleTag({content:`.react-grid-layout{position:absolute !important;width:${styleWidth} !important`});
                if(design.orientation==='portrait'){
                  await page.addStyleTag({content:`.react-grid-item{position:static !important;height:${styleHeight} !important;width:${styleWidth} !important;margin:1px !important`});
                }
                else{//landscape
                  await page.addStyleTag({content:`.react-grid-item{position:static !important;height:${styleHeight} !important;width:${styleWidth} !important;`});
                }
                // console.log('evaluation completed at ',(Date.now()-beginBeforeURL)/1000+'secs');
                time=5000;
              }
              break;
          
            default:
              break;
          }
        setTimeout(async() => {
          const endTime=new Date();
          // console.log('pdf rendering started at ',(Date.now()-beginBeforeURL)/1000+'secs');
          page.pdf({path: path,
            width: width,
            height: height,
            displayHeaderFooter: true,
            headerTemplate: 
            `

            <style>
            @font-face {
          font - family: "DefaultFont";
}
body {
font - family: "DefaultFont"!important;
}
div{ font - family: "DefaultFont"!important; }
h3,
            .h3{ font - size: 24px!important; font - family: "DefaultFont"!important; }
p{ margin: 0 0!important; line - height: 0.7!important; }
i{ font - style: italic!important; } span, div{ display: block; white - space: nowrap; overflow: hidden; text - overflow: ellipsis; }
        </style >
<div style="height:75px;width:100%;padding:0px 10px;">
<div style="position:relative;height:30px;width:100%;margin:0px !important;padding:0px">
    <div class="" style="float:left; ${titleClassW} margin-top: 5px;font-size:8px;"> ${title} </div>
    <div style="float:right; ${dataTimeClassW} ;text-align:right !important;font-weight:lighter;font-size: 8px;position: relative; bottom:10px;"> ${new Date()}</div>
</div>
<div style="position:relative;width:100%;height: 45px;">
    <hr style="height: 2px;-webkit-print-color-adjust: exact; background-color: black; border: 0px none;bottom:0px !important;font-size:8px">;
            </div>
</div>`,
            // `
            //   <div class="header" style="margin: 0px 20px;width: 100%;display: flex;align-items: center;justify-content: space-between;color: #999;height: 50px;border-bottom: 2px solid black;font-weight: lighter;font-size: 15px;">
            //   <div><span class="title"></span></div>
            //   <div><span class="date"></span></div>
            //   </div>`,
            footerTemplate: 
            `
            <style>
            @font-face {
                font - family:"DefaultFont";
        }
                    body{
                font - family:"DefaultFont" !important;
        }
                    div {
                font - family:"DefaultFont" !important;
        }
                    h3, .h3 {
                font - size:24px !important;
            font-family:"DefaultFont" !important;
        }
                    p {
                margin:0 0 !important;
            line-height: 0.7 !important;
        }
                    i {
                font - style:italic !important;
        }
                    span, div {
                display:block;
            white-space:nowrap;
            overflow:hidden;
            text-overflow:ellipsis;
        }
                    .footer {
                display: block;
        }
                </style>
        <div style="font-size: 10px;color: #999;padding:0px 10px; height:75px;width:100%; clear:both;">
            <hr style="height: 2px;position: relative; top: 35px;-webkit-print-color-adjust: exact; background-color: black; border: 1px none;bottom:0px !important;font-size:8px">
                <div style="width:100%;position: relative;top:35px;font-weight:lighter;font-size: 8px;">
                    <span style="float:right;text-align:right;padding-top:10px;font-weight:lighter;font-size: 6px;"> ${endTime} </span>
                    <div style="display:flex;padding-top:10px;margin:0px;font-weight:lighter;font-size: 6px;">
                        Page&nbsp;<span class="pageNumber"></span>&nbsp;of&nbsp;<span class="totalPages"></span>
                    </div>
                </div>
                </div>`,
            // `
            //   <div class="footer" style="margin: 0px 20px;width: 100%;display: flex;align-items: center;justify-content: space-between;color: #999;height: 75px;border-top: 2px solid black;font-weight: lighter;font-size: 15px;">
            //   <div>Page&nbsp;<span class="pageNumber"></span>&nbsp;of&nbsp;<span class="totalPages"></span></div>
            //   <div><span>Time Window: ${endTime}</span></div>
            //   </div>`,
            margin: {
              top: '75px',
              left: '10px',
              bottom: '75px',
              right: '10px'
            },
          }).then((res)=>{
            // console.log('PDF generated Successfully');
            if(sendMail===true){
              let mailObj=new MailService(path);
              mailObj.sendMail().then((result)=>{
                // console.log('Time taken for pdf generation and sending mail from before loading url',(Date.now()-beginBeforeURL)/1000+"secs");
                // console.log('Mail sent successfully:',result.response);
                resolve('PDF generated successfully + Mail sent successfully');
              }).catch((error)=>{
                // console.log('Error in sending mail:',error);
                reject('Error in sending mail\n'+error);
              })
            }
            else{
              // console.log('No mail sent:sendMail is false');
              const endTime=Date.now();
              // console.log('PDF rendering completed at ',(endTime-beginBeforeURL)/1000+'secs');
              // console.log('Time taken for pdf generation alone',(endTime-beginAfterURL)/1000+"secs");
              resolve('PDF generated Successfully without mail');
            }
            // browser.close();
            
           
          }).catch((err)=>{
            // console.log('Error in taking screenshot',err)
            reject('Error in taking screenshot\n'+err);
          })
        }, time);
         
        }).catch((error)=>{
          reject('Error in waitForSelector\n'+error);
        });
        
        
      }).catch((error)=>{
        // console.log('Error in loading URL',error);
        reject('Error in loading URL\n'+error);
      })
    }).catch((error)=>{
      // console.log('Error in generating new page',error);
      reject('Error in generating new page\n'+error);
    })
  }).catch((error)=>{
    // console.log('Error in launching browser',error);
    reject('Error in launching browser\n'+error);
  })
 })

 renderPNG=(url,path,sendMail)=>new Promise((resolve,reject)=>{
  var beginBeforeLaunch=Date.now();
  puppeteer.launch({headless:true,executablePath:'/usr/bin/google-chrome',defaultViewport: {width: 1920, height: 1080}
}).then((browser)=>{
    browser.newPage().then((page)=>{
      page.goto(url,{waitUntil: 'networkidle0'}).then(async(result)=>{
        let flag = await page.evaluate(async(selector)=>{
          return document.getElementsByClassName('mapboxgl-canvas').length>0
        })
        var beginAfterUrl=Date.now();
        if(flag===true){
            await page.evaluate(async(sel)=>{
                const newParent = document.getElementById('kibana-body');
                const oldParent = document.getElementsByClassName('react-grid-layout');
                  newParent.appendChild(oldParent[0]);
                  const example=document.getElementsByClassName('content');
                  example[0].remove();
               })
        }
        else{
          await page.evaluate(async(sel)=>{
          const newParent = document.getElementById('kibana-body');
          const oldParent = document.getElementsByClassName('react-grid-layout');
            newParent.appendChild(oldParent[0]);
            const example=document.getElementsByClassName('content');
            example[0].remove();
        })
      }
          await page.screenshot({path: path,fullPage:true}).then((res)=>{
            console.log('PNG generated Successfully');
            if(sendMail===true){
              let mailObj=new MailService(path);
              mailObj.sendMail().then((result)=>{
                console.log('Mail sent successfully:',result.response);
                var end=Date.now();
                var timeSpent=(end-beginBeforeLaunch)/1000+"secs";
                console.log('Time taken for png generation and sending mail=',timeSpent);
                resolve('PNG generated Successfully + Mail sent successfully');
                
              }).catch((error)=>{
                // console.log('Error in sending mail:',error);
                reject('Error in sending mail\n'+error);
              })
            }
            else{
              console.log('No mail sent:sendMail is false');
              var end=Date.now();
                var timeSpent=(end-beginAfterUrl)/1000+"secs";

                console.log('Time taken for png generation alone',timeSpent);

              resolve('PNG generated Successfully without mail');
            }
          
            // browser.close();
           
          }).catch((err)=>{
            // console.log('Error in taking screenshot',err)
            reject('Error in taking screenshot\n'+err);
          })
        
      }).catch((error)=>{
        // console.log('Error in loading URL',error);
        reject('Error in loading URL\n'+error);
      })
    }).catch((error)=>{
      // console.log('Error in generating new page',error);
      reject('Error in generating new page\n'+error);
    })
  }).catch((error)=>{
    // console.log('Error in launching browser',error);
    reject('Error in launching browser\n'+error);
  })
 })

 }

 module.exports={
  KibanaPuppeteer
}



