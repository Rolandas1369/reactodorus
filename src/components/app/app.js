import React, { Component } from 'react';

import AppHeader from '../app-header';
import SearchPanel from '../search-panel';
import TodoList from '../todo-list';
import ItemStatusFilter from "../item-status-filter";
import ItemAddForm from '../item-add-form';

import './app.css';



export default class App extends Component {

    maxId = 100;

    state = {
        todoData: [
            this.createTodoItem('create item'),
            this.createTodoItem('make app'),
            this.createTodoItem('make')
        ],
        term: '',
        filter: 'all'

    };

    createTodoItem (label) {
        return {
            label,
            important: false,
            done: false,
            id: this.maxId++
        }
    };

    deleteItem = (id) => {
        this.setState(({todoData}) => {
            const indx = todoData.findIndex((el) => el.id === id);
            const newArray = [
                ...todoData.slice(0, indx), 
                ...todoData.slice(indx + 1)];
            return {
                todoData: newArray
            };
        });
    };

    addItem = (text) => {

        const newItem = this.createTodoItem(text)


        this.setState(({todoData}) => {
            
            

            const newArray = [...todoData, newItem];
            return {
                todoData: newArray
            };
        });
    };

    onSearchChange = (term) => {
        this.setState({term});
    };

    onFilterChange = (filter) => {
        this.setState({filter});
    };    

    toggleProperty (arr, id, propName) {
        const indx = arr.findIndex((el) => el.id === id);
        const oldAItem = arr[indx]
            
        const newItem = {...oldAItem, [propName]: 
                !oldAItem[propName]};

        return [
            ...arr.slice(0, indx), newItem,
            ...arr.slice(indx + 1)
        ];
    
    }

    onToggleImportant = (id) => {

        this.setState(({todoData}) => {
            return {
                todoData: this.toggleProperty(todoData, id, 'important')
            }
            
        });
    }

    onToggleDone = (id) => {
        
        this.setState(({todoData}) => {
            return {
                todoData: this.toggleProperty(todoData, id, 'done')
            }
            
        });
    };

    search = (items, term) => {
        if (term.length === 0) {
            return items;
        }
        return items.filter((item) => {
            return item.label.toLowerCase().indexOf(term.toLowerCase()) > -1
        });
    }

    filter(items, filter){

        switch(filter){
            case 'all':
                return items;
            case 'active':
                return items.filter((item) => !item.done);
            case 'done':
                return items.filter((item) => item.done);
            default:
                return items;
        }
    }

    render() {

        const { todoData, term, filter } = this.state;
        const visibleItems = this.filter(this.search(todoData, term), filter)
        const countDone = todoData
            .filter((el) => el.done).length;

        const todoCount = todoData.length - countDone;

        return (
            <div className="todo-app">
                <AppHeader todo={todoCount} done={countDone} />
                <div className="top-panel d-flex">
                    <SearchPanel 
                    onSearchChange={this.onSearchChange}/>
                    <ItemStatusFilter filter={filter}
                    onFilterChange={this.onFilterChange}/>
                </div>
                <TodoList todos={ visibleItems }
                    onDeleted={ this.deleteItem }
                    onToggleDone={this.onToggleDone}
                    onToggleImportant={this.onToggleImportant}/>
                <ItemAddForm 
                onItemAdded={ this.addItem }/>
                
            </div> 
        );
    }
};
