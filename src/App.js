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
      dit: 30,
      riot: 30,
    }
  }

  action(name) {
    this.setState({
      index: this.state.index + 1,
    })
    console.log(name);
  }

  componentDidMount = () => {
    this.getQuestions()
  }

  getQuestions = () => {
    let org = Math.floor(Math.random() * 2)
    let question;
    let test = []
    for(var i = 0; i < 20; i++){
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
                        onSwipeLeft={()=>{this.action('swipe left')}}
                        onSwipeRight={()=>{this.action('swipe right')}}>
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
