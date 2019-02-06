import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Form, Button, Modal } from 'semantic-ui-react';
import { setNoteAction } from './setNoteAction'

class EditNoteVerse extends React.Component {
	constructor(props) {
    super(props);
    this.state = {
    	note: '',
    	verseId: {},
    	userId: '',
    	userDate: 0,
    	tags: []
    };

    this.handleChange = this.handleChange.bind(this);
    this.add = this.add.bind(this);
    this.tags = this.tags.bind(this)
	}

	handleChange(e) {
	  this.setState({ note: e.target.value });
	}

	tags(e) {
  	var tag_str = e.target.value.split(',')
  	this.setState({ tags: tag_str });
	}

	add(e) {
		e.preventDefault()
  	const { book, chapter, verseId } = this.props.verseAdress;
  	const adressVerse = {
  		book,
  		chapter,
  		verseId
  	}

  	if(this.state.note === '') {
    		alert('Напишите свое мнение в заметках!')
  	} else {
      	this.props.setNoteAction({ 
	        verseId: adressVerse,
	        userId: 'Vlad',
	        note: this.state.note,
	        userDate: Date.now(),
	        tags: [this.state.tags]
    	})

      this.props.handleClose()
      	//console.log(this.state)
  	}
	}

  	render() {
  	 	//console.log(this.props);

			const { name, chapter, verseId, text } = this.props.verseAdress;

	    return (
	    	<Modal open={this.props.show} size={'tiny'} onClose={this.props.handleClose} >
	      	<Modal.Header>Оставьте заметку об этом стихе: {`${name} ${chapter}:${verseId}`}</Modal.Header>
	      	<Modal.Content>
	        	<Modal.Description>
							<p>{text} {`${name} ${chapter}:${verseId}`}</p>
	          	<Form onSubmit={this.add}>
	          		<Form.TextArea label='Заметка' onChange={this.handleChange} placeholder='Добавьте заметку' />
	          		<Form.Input label='Ключевые слова' onChange={this.tags} placeholder='Добавьте теги' />
							  <Button
                  basic 
                  color='red'
                  icon='close'
                  content="Отменить"
                  onClick={this.props.handleClose} />
              	<Button
              		type='submit'
                  basic 
                  color='green'
                  icon='checkmark'
                  content="Сохранить" />
	      			</Form>
	      		</Modal.Description>
	    		</Modal.Content>
	    	</Modal>
	    )
  }
}

function mapStateToProps(state) {
    return {
        notesReducer: state.notesReducer,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        setNoteAction
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(EditNoteVerse);
//export default EditNoteVerse;