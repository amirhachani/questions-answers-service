import React from "react";
import axios from 'axios'

export default class AddQuestion extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
        name : '',
        email: '',
        body:'',
    };


    this.addQuestion = this.addQuestion.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  addQuestion(){
    axios.post('/qa/questions', {
        product_id: this.props.id,
        name: this.state.name,
        email: this.state.email,
        body: this.state.body
    }).then(()=>{
        console.log('data sent succesfully')
    }).catch(()=>{
        console.error('error occured')
    })
  }
  

  handleChange(e){
      this.setState({
          [e.target.id] : e.target.value
      })
  }

  render() {
    return (
      <div>
        <div>
          <div class="md:w-1/2 px-3 mb-6 md:mb-0 ">
            <label
              class="uppercase tracking-wide text-black text-xs font-bold mb-2"
              for="company"
            >
              name*
            </label>
            <input
              class="w-full bg-gray-200 text-black border border-gray-200 rounded py-3 px-4 mb-3"
              id="name"
              type="text"
              placeholder="Name"
              value={this.state.name}
              onChange={this.handleChange}
            />
            <div>
              <span class="text-red-500 text-xs italic">
                Please fill out this field.
              </span>
            </div>
          <div>
          <div>
            <label
              class="uppercase tracking-wide text-black text-xs font-bold mb-2"
              for="title"
            >
              email*
            </label>
            <input
              class="w-full bg-gray-200 text-black border border-gray-200 rounded py-3 px-4 mb-3"
              id="email"
              type="email"
              placeholder="email@email.com"
              value={this.state.email}
              onChange={this.handleChange}
            />
          </div>
          </div>
          </div>
          <div class="md:w-1/2 px-3">
            <label
              class="uppercase tracking-wide text-black text-xs font-bold mb-2"
              for="title"
            >
              Question
            </label>
            <input
              class="w-full bg-gray-200 text-black border border-gray-200 rounded py-3 px-4 mb-3"
              id="body"
              type="text"
              placeholder="Type your Question here..."
              value={this.state.body}
              onChange={this.handleChange}
            />
          </div>
        </div>
        <div class="-mx-3 md:flex mb-6">
          <button onClick={this.props.addQuestion} class="bg-transparent hover:bg-gray-300 text-gray-700 font-semibold hover:text-gray-800 py-0.5 px-0.5 border border-gray-500 hover:border-transparent rounded" onClick={this.addQuestion}>
            Submit Question
          </button>
        </div>
      </div>
    );
  }
}
