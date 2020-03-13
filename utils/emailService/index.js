var nodemailer = require('nodemailer');


class MailService
{
  constructor(filePath)
  {
    this.filePath=filePath;
  }

  getMailOptions=()=>{
    let mailOptions={
      from: 'kishoreh@guidanz.com',
      to: 'kishoreh@guidanz.com',
      subject: 'Sending Email using Node.js',
      text: 'Hi, Here is your scheduled Report',
      attachments:[{path:this.filePath}]
    };
    return mailOptions;
  }

  getHostDetails=()=>{
    let hostDetails={
      host: "pro.turbo-smtp.com",
      port: 25,
      secure: false, // true for 465, false for other ports
      auth: {
        user: 'skedlertest@guidanz.net', // generated ethereal user
        pass: 'Guid$786' // generated ethereal password
      }
    }
    return hostDetails;
  }



  // getHostDetails=()=>{
  //   let hostDetails={
  //     service:'gmail',
  //     auth: {
  //       user: '', // generated ethereal user
  //       pass: '' // generated ethereal password
  //     }
  //   }
  //   return hostDetails;
  // }

  sendMail=()=>new Promise((resolve,reject)=>{
    let transporter=nodemailer.createTransport(this.getHostDetails());
      transporter.sendMail(this.getMailOptions()).then((result)=>{
        resolve(result);
      }).catch((error)=>{
        reject(error);
      })
  })
}

module.exports={
  MailService
}