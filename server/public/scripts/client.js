
itemsList()


//!POST
function addItem(event){
    event.preventDefault();
    console.log("POST in client")
        const newItem={
            text: document.getElementById('toDoItem').value,
            isComplete: false,
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
    
//!DELETE  
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


//!GET
    function itemsList(){
        // get song data from the server
        axios({
          method: 'GET',
          url: '/todos'
        }).then((response)=> {
          console.log('Got items from GET in client', response.data);
          //for rendering updated items need renderItems to have response.data
         renderItems(response.data);
        }).catch((error)=> {
          console.log('error in GET client', error);
        });
    }
//!PUT
    function toggleIsComplete( id, complete){
        console.log("ready to complete PUT in client")
        const itemToComplete = {
          id: id,
          isComplete: complete,
        };
   
      if(complete){
        itemToComplete.isComplete = false
      } else {
        itemToComplete.isComplete = true
      }

        axios({
          method: 'PUT',
          url: '/todos',
          data: itemToComplete
        }).then((response) =>{
          console.log("item in PUT client", response.data);
          itemsList();
        }).catch((error)=> {
          console.log('error in PUT client', error); 
          alert('These items do not want to be updated')
        });
      }


//!RENDER
    //listOfToDos was not iterable to do lack of (response.data)in the
    //called renderItems in itemsList
function renderItems(listOfToDos){
    const toDoTableBody= document.getElementById("toDosList");
    //empty previous data
    toDoTableBody.innerHTML = "";
    //loop through list items and render to the table
    for (let item of listOfToDos ){

     //?Need to write an if statement to check isComplete boolean
     //?and populate table correctly
  let isCompleteButton = "Not Complete";
  if (item.isComplete){
    isCompleteButton = "Complete"
  }
        toDoTableBody.innerHTML +=(`
    <tr data-testid="toDoItem">
    <td> ${item.text}</td>
    <td><button data-testid="completeButton" onClick="toggleIsComplete(${item.id},${item.isComplete})">${isCompleteButton}</td>
     <td><button data-testid="deleteButton" onclick="deleteItem(${item.id})">DELETE</td>
     <tr>
     `)}}

