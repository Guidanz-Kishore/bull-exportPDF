const {VizSource}=require('../abstractVizSource/vizSourceBaseClass');
const {KibanaPuppeteer}=require('./kibanaPuppeteer');
const {Elasticsearch}=require('../../dataSource/elasticSearch/esClient');
/**
 * Kibana.
 *
 * @class Kibana
 * @extends {VizSource}
 */

class Kibana extends VizSource
{
  constructor()
  {
    super();
    this.name='Kibana';
  }

  vizSourceConnect=()=>new Promise((resolve,reject)=>{
    const esObj=new Elasticsearch('http://localhost:9200');
    esObj.esClientConnect().then((result)=>{
      resolve(result);
    }).catch((error)=>{
      reject(error);
    })
  })

  getHealth=()=>{
  }
  
  executePuppeteer=(url,path,downloadType,sendMail,design)=>{
    const kibanaPupeteerObj=new KibanaPuppeteer(url,path);
    switch (downloadType) {
      case 'pdf':
        return kibanaPupeteerObj.renderPDF(url,path,sendMail,design);
      case 'png':
        return kibanaPupeteerObj.renderPNG(url,path,sendMail);
      case 'HTML':
        break;
      default:
        break;
    }
  
  }
}

module.exports={Kibana};