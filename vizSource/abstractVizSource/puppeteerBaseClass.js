/**
 * Abstract Class Puppeteer.
 *
 * @class Puppeteer
 */

class Puppeteer
{
  constructor()
  {
    if(this.constructor==Puppeteer){
      throw new Error('Abstract classes cannot be instantiated');
    }
    this.name='Puppeteer';
  }

  renderPDF(){
    throw new Error('Method renderPDF() must be implemented');
  }
  renderPNG(){
    throw new Error('Method renderPNG() must be implemented');
  }
  renderHTML(){
    throw new Error('Method renderHTML() must be implemented');
  }
  renderEx

}

module.exports={Puppeteer};