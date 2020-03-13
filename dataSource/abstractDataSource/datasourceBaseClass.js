/**
 * Abstract Class Datasource.
 *
 * @class Datasource
 */

class Datasource
{
  constructor(url)
  {
    if(this.constructor==Datasource){
      throw new Error('Abstract classes cannot be instantiated');
    }
    this.name='Datasource';
    this.url=url;
  }
  getName(){
    console.log('This is',this.name);
  }
  clientConnect(){
    throw new Error('Method clientConnect() must be implemented');
  }
  getHealth(){
    throw new Error('Method getHealth() must be implemented');
  }

}

module.exports={Datasource};