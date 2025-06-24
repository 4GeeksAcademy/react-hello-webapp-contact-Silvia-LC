export const initialStore=()=>{
  return{
    message: null,
    todos: [
      {
        id: 1,
        title: "Make the bed",
        background: null,
      },
      {
        id: 2,
        title: "Do my homework",
        background: null,
      }
    ],
    contact:[]
  }
}

export default function storeReducer(store, action = {}) {
  switch(action.type){
    case 'add_task':

      const { id,  color } = action.payload

      return {
        ...store,
        todos: store.todos.map((todo) => (todo.id === id ? { ...todo, background: color } : todo))
      };
    
    case `contact`:
      return{
        ...store,
        contact: action.payload
      }

    case 'editcontact':
      return{
        ...store,
        contact:{
          name:Name,
          lastname:lastname,
          phonenumer: phonenumber,
          address:address,
          email:email,
        }
      }
   
      default:
      throw Error('Unknown action.');
  }
}
      

