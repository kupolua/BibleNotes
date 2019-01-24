import React, { Component } from 'react';
import { Form, TextArea, Button, Input, Modal, Image } from 'semantic-ui-react';

class EditNoteVerse extends React.Component {
  	constructor(props) {
	    super(props);
	    this.state = {
	    	note: '',
	    	verseId: '',
	    	userId: '',
	    	userDate: 0,
	    	tags: ''
	    };

	    this.handleChange = this.handleChange.bind(this);
	    this.add = this.add.bind(this);
	    this.tags = this.tags.bind(this)
  	}

	handleChange(e) {
	    this.setState({ note: e.target.value });
	}

  	tags(e) {
    	var tag_str = e.target.value.split(', ')
    	this.setState({ tags: tag_str });
  	}

  	add(e) {
    	let verseId = this.props.verseId

    	if(this.state.note == '') {
      		alert('Напишите свое мнение в заметках!')
    	} else {
	      	this.setState({ 
		        verseId,
		        userId: 'Vlad',
		        note: this.state.note,
		        userDate: Date.now(),
		        tags: [this.state.tags]
	    	})
	      	//console.log(this.state)
    	}
  	}

  	state = { open: false }
  	show = dimmer => () => this.setState({ dimmer, open: true })
  	close = () => this.setState({ open: false })

  render() {
  	 console.log(this.props);
     const { open, dimmer } = this.state

    return (
      <Modal open={this.props.show}  onClose={this.props.handleClose} >
        <Modal.Header>Оставьте заметку об этом стихе:</Modal.Header>
          <Modal.Content>
            <Modal.Description>
              <div className="ui grid main">
                <div className="ui vertically padded grid docs-example">
                  <div className="text container">
                    <Form>
                      <TextArea className='' onChange={this.handleChange} autoHeight placeholder='Добвьте заметку' style={{ minHeight: 100}} />
                    </Form>
                  <div>
                  <Input onChange={this.tags} placeholder='Добвьте теги' className="tags" />
                    <Button
                        icon='checkmark'
                        labelPosition='right'
                        content="Отменить"
                        onClick={this.close} />
                    <Button
                        icon='checkmark'
                        labelPosition='right'
                        content="Добавить"
                        onClick={this.add} />
                  </div>
                </div>
              </div>
            </div>
          </Modal.Description>
        </Modal.Content>
      </Modal>
    )
  }
}

export default EditNoteVerse;