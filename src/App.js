import React, { Component } from 'react';
import './App.css';
import Person from './Person/Person'

class App extends Component {

  // state is only available from Component
  // Cannot use state in functions

  state = {
    persons: [
      { id: 'asfd1', name: 'Mike', age: 25 },
      { id: 'vasf1', name: 'Jamie', age: 25 },
      { id: 'aser1', name: 'Nate', age: 6 },
      { id: 'derf1', name: 'Cody', age: 1 }
    ],
    someOtherValue: 'Some other value'
  }


  switchNameHandler = (newName) => {
    // 1. Don't do this: this.state.persons[0].name = 'Michael'
    // React will display a warning message not to use this
    // 2. Instead use this.setState() which is part of Component

    this.setState({
      persons: [
        { name: newName, age: 25 },
        { name: 'Jamie', age: 25 },
        { name: 'Nate', age: 6 },
        { name: 'Cody', age: 2 }
      ]
    });
  }

  deletePerson = (index) => {

    // const persons = this.state.persons.slice(); --> copies a section of the array
    const persons = [...this.state.persons];
    persons.splice(index, 1);
    this.setState({
      persons: persons
    })
  }

  togglePersonHandler = () => {
    const doesShow = this.state.showPersons
    this.setState({
      showPersons: !doesShow
    })
  }

  changeNameHandler = (event, id) => {
    const personIndex = this.state.persons.findIndex(p => {
      return p.id === id;
    });

    const newPerson = {
      ...this.state.persons[personIndex]
    }
    newPerson.name = event.target.value;

    const persons = [...this.state.persons]
    persons[personIndex] = newPerson;

    this.setState({ persons: persons });
  }

  render() {

    const style = {
      backgroundColor: 'green',
      color: 'white',
      font: 'inherit',
      border: '1px solid blue',
      padding: '8px',
      cursor: 'pointer',
    }

    // Show list of persons if not empty
    let persons = null;

    if (this.state.showPersons) {
      persons = (
        <div>
          {this.state.persons.map((person, index) => {
            return <Person
              name={person.name}
              age={person.age}
              click={() => this.deletePerson(index)}
              key={person.id}
              change={(event) => { this.changeNameHandler(event, person.id) }} />
          })}
        </div>

      )
      style.backgroundColor = 'red';
    }

    let classes = [];
    if (this.state.persons.length <= 2) {
      classes.push('red');
    }

    if (this.state.persons.length <= 1) {
      classes.push('bold');
    }

    // () => this.switchNameHandler('Michael!!') >>> this is not recommended because this inefficient.
    // Inefficient in a way that it causes React to render the component multiple times
    // versus using this: this.switchNameHandler.bind(this,'Mike')
    return (
      <div className="App">
        <h1>Hi, I'm a React App</h1>
        <p className={classes.join(' ')}>This is really working!</p>
        <button
          style={style}
          onClick={this.togglePersonHandler}>Toggle Persons</button>
        {persons}
      </div>
    );
  }
}

export default App;
