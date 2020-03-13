const elasticsearch=require('elasticsearch')
const {Datasource}=require('../abstractDataSource/datasourceBaseClass');
// // const CryptoJS = require('node-cryptojs-aes').CryptoJS;
// // const url = require('url');

// // var logger = require('../../../../logger.js');
// // var log = logger.LOG;
// const checkConnection = (datasource, callback)=>{
//   const { Client } = require('@elastic/elasticsearch');
  
//   var uri = url.parse(datasource.url);
//   // var password = CryptoJS.enc.Utf8.stringify(CryptoJS.AES.decrypt(datasource.password, "grafana_Data_Source_Pass"))
//   if (datasource.user != '') {
//       uri.auth = datasource.user + ":" + datasource.password;
//   } else {
//       uri.auth = '';
//   }
//   var host = url.format(uri);
//   // if (uri.protocol == 'https:' && (agentOptions == '' || Object.keys(agentOptions).length === 0)) {
//   //     process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0
//   // }
//   var elasticsearchClient;
//   elasticsearchClient = new Client({
//       host:'http://kishore:kishore123@localhost:9200',
//       // ssl: agentOptions,
//       // requestTimeout: config.requestTimeout,
//       // pingTimeout: config.pingTimeout,
//   });
//   elasticsearchClient.ping({
//     requestTimeout: 30000,
// }, function(error) {
//     if (error) {
//         console.error('elasticsearch cluster is down!');
//     } else {
//         console.log('Everything is ok');
//     }
// });
//   elasticsearchClient.nodes.info({}, function (error, response) {

//       // response = response.body;
//       response = response.body;
//          if (error) {
                        
//         log.error('Error occured in getting Elasticsearch version ', error);
//           callback({
//               'status': 'error',
//               'errorMessage': 'Error occured in getting Elasticsearch version' + error
//           });
//       } else {
//           log.info('TestandSave - Valid Elasticsearch URL');
//           callback({
//             'status': 'success'
//         });
//       }
//     })
// }



/**
 * Elasticsearch.
 *
 * @class Elasticsearch
 * @extends {Datasource}
 */
class ElasticSearch extends Datasource
{
  constructor(url)
  {
    super(url);
    this.name='elasticsearch';
  }
  esClientConnect=()=>(new Promise((resolve,reject)=>{
    // const uri = url.parse(ESurl);
    // password = CryptoJS.enc.Utf8.stringify(CryptoJS.AES.decrypt(password, "grafana_Data_Source_Pass"))
    // if (username != '') {
    //     uri.auth = username + ":" + password;
    // } else {
    //     uri.auth = '';
    // }
      const elasticClient = new elasticsearch.Client({
        host: this.url
      });
      super.getName();
    elasticClient.ping({
      requestTimeout: 3000,
    }, (error) => {
     if (error) {
        var response = {};
        response.status = 'error'
        response.error = error;
        reject(error);
      } else {
        resolve(elasticClient);
      }
    });
  }))


  clientConnect=()=>new Promise((resolve,reject)=>{
    this.esClientConnect().then((result)=>{
      resolve( result);
    }).catch((error)=>{
      reject(error);
    })
  })
  
  

  getHealth = ()=>{}
}

module.exports={
  ElasticSearch
};