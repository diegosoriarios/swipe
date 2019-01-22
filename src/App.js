import React, { Component } from 'react';
import Cards, { Card } from 'react-swipe-card'
import './App.css';
import './styles.css';
import strings from './Strings';

const CustomAlertLeft = () => <span>Nop</span>
const CustomAlertRight = () => <span>Ok</span>

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      questions: [],
      index: 0,
      a: 10,
      b: 10,
      c: 10,
      d: 10
    }
  }

  action(name, item) {
    switch (name){
      case 'left':
        this.setState({
          index: this.state.index + 1,
        })
        break;
      case 'right':
        this.setState({
          index: this.state.index + 1,
          a: this.state.a + item.status[0],
          b: this.state.b + item.status[1],
          c: this.state.c + item.status[2],
          d: this.state.d + item.status[3],
        })
        break;
      case 'end':
        console.log(name);
        break;
      default:
        console.log('Ops')
        break;
    }
    console.clear()
    console.log(this.state.a)
    console.log(this.state.b)
    console.log(this.state.c)
    console.log(this.state.d)
  }

  componentDidMount = () => {
    this.getQuestions()
  }

  getQuestions = () => {
    let question;
    let test = []
    for(var i = 0; i < 20; i++){
      let org = Math.floor(Math.random() * 2)
      switch(org){
        case 0:
          question = Math.floor(Math.random() * strings.dit.length)
          test = test.concat(strings.dit[question])
          break;
        case 1:
          question = Math.floor(Math.random() * strings.riot.length)
          test = test.concat(strings.riot[question])
          break;
        default:
          console.log(strings)
          break;
      } 
    }
    this.setState({
      questions: test
    })
  }

  render() {
    if(this.state.questions.length > 0){
      return (
        <div className="b-content">
            <ul className="status">
              <li><div>D</div><div>{this.state.dit}</div></li>
              <li><div>R</div><div>{this.state.riot}</div></li>
            </ul>
            <p>{this.state.questions[this.state.index].desc}</p>
            <Cards 
              onEnd={()=>{this.action('end')}} 
              className='master-root'
              alertRight={<CustomAlertRight />} 
              alertLeft={<CustomAlertLeft />} 
            >
                {this.state.questions.map((item, i) =>
                    <Card key={i}
                        onSwipeLeft={()=>{this.action('left', item)}}
                        onSwipeRight={()=>{this.action('right', item)}}>
                        <img src={item.img} alt={item.name} style={{width: '100%', height: '100%'}}/>
                    </Card>
                )}
            </Cards>
        </div>
      )
    }else{
      return <div>Loading...</div>
    }
  }
}

export default App;
