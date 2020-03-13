/**
 * Abstract Class VizSource.
 *
 * @class VizSource
 */

class VizSource
{
  constructor()
  {
    if(this.constructor=='VizSource'){
      throw new Error('Abstract classes cannot be instantiated');
    }
    this.name='VizSource';
  }

  getName(){
    console.log('This is',this.name);
  }
  vizSourceConnect(){
    throw new Error('Method vizSourceConnect() must be implemented');
  }
  getHealth(){
    throw new Error('Method getHealth() must be implemented');
  }

  executePuppeteer(){
    throw new Error('Method executePuppeteer() must be implemented');
  }

}

module.exports={VizSource};