import React from 'react'
import { Menu, Dropdown } from 'semantic-ui-react'

const options = [
    { key: 1, text: 'Войти', value: 1, onClick: () => {console.log('Войти')}},
    { key: 3, text: 'О проекте', value: 3 },
];

export default class NotesMenu extends React.Component {
    render () {
        return (
            <Menu>
                <Dropdown item simple text='Меню' direction='left' options={options} button={2}/>
                <Menu.Item>Note</Menu.Item>
                <Menu.Item>Read</Menu.Item>
            </Menu>
        )
    }
}