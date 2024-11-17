console.log('JS is sourced!');



function addItem(event){
    event.preventDefault();
    console.log("POST in client")
    
        const newItem={
            text: document.getElementById('todoItem').value
        };
        axios({
            method: 'POST',
            url: '/todos',
            data: newItem,
        }).then((response)=>{
            console.log('response data POST client', response.data);
            itemsList();
        }).catch((response)=>{
            console.log('error in POST client', error);
            alert("Please turn back!")
        });
    }
    
    
function deleteItem( id ){
        console.log("DELETE in client", id );
        const itemToDelete = {
          id: id
        };
        axios({
          method: 'DELETE',
          url: '/todos',
          data: itemToDelete,
        }).then((response)=> {
          console.log(response.data);
          itemsList();
        }).catch(function(error) {
          console.log('delete error in client', error); 
          alert("You can't even delete something!")       
        });
      }



    function itemsList(){
        // get song data from the server
        axios({
          method: 'GET',
          url: '/todos'
        }).then((response)=> {
          console.log('Got items from GET in client', response.data);
          renderItems();
        }).catch((error)=> {
          console.log('error in song get', error);
        });
    }