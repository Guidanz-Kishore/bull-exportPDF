const {VizSource}=require('../abstractVizSource/vizSourceBaseClass');
const {GrafanaPuppeteer}=require('./grafanaPuppeteer');
/**
 * Grafana.
 *
 * @class Grafana
 * @extends {VizSource}
 */

class Grafana extends VizSource
{
  constructor()
  {
    super();
    this.name='Grafana';
  }

  vizSourceConnect=()=>{
  }

  getHealth=()=>{

  }
  
  executePuppeteer=(url,path,downloadType,sendMail)=> {
    const grafaPupeteerObj=new GrafanaPuppeteer();
    switch (downloadType) {
      case 'pdf':
       return grafaPupeteerObj.renderPDF(url,path,sendMail);
      case 'png':
        return grafaPupeteerObj.renderPDF(url,path,sendMail);
      case 'HTML':
        break;
      default:
        break;
    }
  
  }
}

module.exports={Grafana};