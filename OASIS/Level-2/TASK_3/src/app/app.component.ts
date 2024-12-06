import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  //Inject the FormBuilder service to build Reactive form
  constructor(private fb : FormBuilder){}

  public toDos:any[] = []; 

  public alert: { type: string; message: string; show: boolean } = {
    type: '', // e.g., 'success', 'danger', etc.
    message: '',
    show: false,
  };

  // Utility method to show alerts
  public showAlert(type: string, message: string): void {
    this.alert.type = type;
    this.alert.message = message;
    this.alert.show = true;

    // Hide alert automatically after 3 seconds
    setTimeout(() => {
      this.alert.show = false;
    }, 3000);
  }

  ngOnInit(): void {
    //On init load all the contents
    this.getTasks('https://http-status-dog-api.vercel.app/getAllTasks/all');
  }

  //Create the Reactive form
  public frmTodo = this.fb.group({
    title : this.fb.control('',[Validators.required, Validators.minLength(4)]),
    desc : this.fb.control('',[Validators.required]),
    date : this.fb.control('',[Validators.required]),
    status : this.fb.control(false),
  })
  //Create accessors to get FormControls
  get title(){
    return this.frmTodo.get('title') as FormControl;
  }
  get desc(){
    return this.frmTodo.get('desc') as FormControl;
  }
  get date(){
    return this.frmTodo.get('date') as FormControl;
  }
  get status(){
    return this.frmTodo.get('status') as FormControl;
  }

  //Create a method to load or fetch the tasks based on passed URL
  public getTasks(url:string){
    fetch(url)
    .then((res)=>res.json())
    .then((data)=>{
      this.toDos = data;
    })
  }

  public handleSubmit(obj:any):void{
    //Send the form data and insert it as a task in database
    fetch('https://http-status-dog-api.vercel.app/insertTask',{
      method:"POST",
      headers: {
        'Content-Type': 'application/json', // Inform the server about the content type
      },
      body: JSON.stringify(obj)
    }).then((res)=>res.json())
    .then((data)=>{
      if(data.code == 201){
        this.showAlert('success', 'Task added to the list.');
        //After insertion refresh the todoList once
        this.getTasks('https://http-status-dog-api.vercel.app/getAllTasks/all');
      }
      else
        this.showAlert('danger', 'Failed to add the task.');
    }).catch((err)=>{
        this.showAlert('danger', 'An error occurred.');
    })
  }

  //Handle Mark As Completed
  public markAsCompleted(title:string, event:any):void{
    let flag:boolean = confirm("You are about to mark the task as completed. Are You Sure?");
    
    // Get the checkbox status (true/false) so that we can pass it in req body and update the docs
    const isChecked = event.target.checked; 
  
    //Create a JSON doc to send via req body
    let body = {'title':title, 'status':isChecked};

    if(flag){
      //Send API call to update the status field of the document by searching it by name
      /*
        let title:string = req.params.title;
        storedb> db.tasks.updateOne({'title':title}, {$set:{'status':true}})
      */ 
      fetch('https://http-status-dog-api.vercel.app/updateStatus', {
        method:"PUT",
        headers: {
          'Content-Type': 'application/json', // Inform the server about the content type
        },
        body: JSON.stringify(body)
      }).then((res)=>res.json())
      .then((data)=>{
        this.showAlert('success', `Status updated for task: ${title}`);
        //After updation refresh the todoList once
        this.getTasks('https://http-status-dog-api.vercel.app/getAllTasks/all');
      }).catch((err)=>{
        this.showAlert('danger', 'Failed to update the status.');
      })
      
    }else{
      alert('Not Marked');
      //Load all the todo list once more
    } 
  }

  //On category change load specific tasks
  public handleCategoryChange(event:any){
    //Pass the category on API call as path param and load the lists
    this.getTasks(`https://http-status-dog-api.vercel.app/getAllTasks/${event.target.value}`);
  }

  //Handle delete functionality
  public deleteClick(title:string){
    //Perform deletion operation
    fetch(`https://http-status-dog-api.vercel.app/deleteTasks/${title}`,{
      method:"DELETE",
    }).then((res)=>res.json())
    .then((data)=>{
      if(data.code == 201){
        this.showAlert('danger', `Task deleted: ${title}`);
        //After deletion refresh the todoList once
        this.getTasks('https://http-status-dog-api.vercel.app/getAllTasks/all');
      }
      else
        alert('Failure!!');
    }).catch((err)=>{
      console.error(err);
    })
  }
}
