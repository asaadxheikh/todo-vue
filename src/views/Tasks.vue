 
<template>
  <div class="bg-gray-50 flex flex-row w-screen h-screen">


<!-- SIDE BAR  -->


    <div class=" w-1/6 h-screen bg-white">

      <button @click="toTasks" v-if="route == 'task'"
        class=" w-full rounded-r-3xl mt-9 bg-black h-14 text-white flex justify-center items-center">
       <div class="flex py-1 flex-row  items-center">    <img src="/clipboard-w.png" class=" w-5 h-5 mr-2 "  />   Task</div>
      </button>

      <button @click="toTasks" v-else
        class=" w-full rounded-r-3xl mt-9 bg-white h-14 text-black flex justify-center items-center">
     <div class="flex py-1 flex-row  items-center">    <img src="/clipboard_b.png" class=" w-5 h-5 mr-2 "  />     Task</div>
      </button>




      <button @click="toLocations" v-if="route == 'location'"
        class=" w-full rounded-r-3xl mt-6  bg-black h-14 text-white flex justify-center items-center">
        <div class="flex py-1 flex-row  items-center">    <img src="/placeholder-w.png" class=" w-5 h-5 mr-2 "  />  Location </div>
      </button>


      <button v-else @click="toLocations"
        class=" w-full rounded-r-3xl mt-6 bg-white h-14 text-black flex justify-center items-center">
      <div class="flex py-1 flex-row  items-center">    <img src="/placeholder-b.png" class=" w-5 h-5 mr-2 "  />    Location </div>
      </button>

   <router-link 
            to="/"  
        class=" w-full -r-3xl mt-6 h-14 text-black flex justify-center items-center">
      <div class="flex py-1 flex-row  items-center">    <img src="/logout.png" class=" w-5 h-5 mr-2 "  />   Logout</div>

   </router-link>




    </div>


<!-- TASKS LIST  -->



    <div v-if="route == 'task'" class=" w-5/6 h-screen bg-white">

      <div class=" p-16">
        <div @click="showModel" class="">
          <text >
            Add new task
          </text>
        </div>


        <div class="py-6">
          <text>
            Incomplete
          </text>
        </div>
        <div v-for="item in incomplete">

        <div class="flex py-1 flex-row  items-center">    <img src="/square.png" class=" w-5 h-5 " @click="completeTask(item)" />   
         <div class=" flex flex-col my-2 ml-4">
            <text> {{ item.title }}
              <br />
          <div class="flex py-1 flex-row">   <img src="/alarm.png" class=" w-5 h-5 " />    <span class=" text-placeholder ml-1 font-light text-sm">{{ item.date.replace('T',' ').split('.')[0]  }}</span>
            </div>
            </text>

          </div>
          </div>


        </div>


        <div class="mt-8 py-6">
          <text>
            Complete
          </text>
        </div>
        <div v-for="item in complete">

        <div class="flex py-1 flex-row  items-center">    <img src="/select.png" class=" w-5 h-5 " />  
          <div class=" flex flex-col py-1 ml-4">
            <text class=" text-slate-600 font-semibold font-light text-base"> {{ item.title }}
            </text>

          </div>
          </div>


        </div>
      </div>




    </div>

 



    <div v-else-if="route == 'location'" class=" w-5/6 h-screen bg-white">
 <div class=" p-16">
      <div class="">
        <button @click="getCurrentLocation" >
         + Check in
        </button>
      </div>


      <div class="py-6">
        <text>
          Current location
        </text>
      </div>
 <div class=" flex flex-col">
            <text> {{ current_location.title }}
              <br />
             <div class="flex py-1 flex-row">    <img src="/pin.png" class=" w-5 h-5 " />     <span class=" text-slate-500 font-light text-sm">{{    current_location.points[0]+"° N, "+current_location.points[1]+"° E "}}</span>
           </div>

            </text>

          </div>


      <div class="mt-8 py-6">
        <text>
          Previous location
        </text>
      </div>
      <div v-for="item in previous_locations">

        <div class=" flex flex-col py-1">
          <text class=" text-slate-600 font-semibold font-light text-base"> {{ item.location_name }}
          
              <br />
        <div class="flex py-1 flex-row">    <img src="/pin.png" class=" w-5 h-5 " />      <span class=" text-slate-500 font-light text-sm">{{    item.points[0]+"° N, "+item.points[1]+"° E "}}</span>
          </div>

          </text>

        </div>

      </div>
    </div>
    </div>

    
  </div>





<!-- NEW TASK FORM -->





  <div  v-if="addNewTaskModel" class="  bg-[#22222280] justify-center items-center   flex w-screen h-screen  absolute top-0">
  <div class=" w-1/2 h-3/5 rounded-md bg-white opacity-100">
  <div class=" p-10 h-full">
  <text class=" font-semibold">
  New Task</text>


  <form class=" flex w-8/10  h-4/6 flex-col py-5 px-4  justify-between">
  <input placeholder="Summary"  v-model="title" class=" outline-0 border-0"/>
  <div class="w-full h-px bg-placeholder"/>
  <input placeholder="Detail"  v-model="detail" class=" outline-0 border-0"/>
 
  <div class="w-full h-px bg-placeholder"/> 
 
  <Datepicker v-model="date"></Datepicker>
  <div class="w-full h-px bg-placeholder"/>

  </form>
<div class="w-full h-full flex flex-col  items-center"> 
  <button @click="addTask" class="  w-2/3 h-12 bg-black  rounded-full  text-white">
  Save
  </button>
  <button @click="hideModel"  class="  w-1/3 h-12   rounded-full  text-black">
  cancel
  </button>
</div>
  </div>
 
 

  </div>
  </div>
</template>


<script>
import { Api } from "../api";
import axios from 'axios'
import moment from 'moment'
  import Datepicker from '@vuepic/vue-datepicker';
    import '@vuepic/vue-datepicker/dist/main.css'
 import { useToast } from "vue-toastification";
export default {
   components: { Datepicker },
    
  data() {
    return {
      route: 'task',
      complete: [],
      incomplete: [],
      previous_locations:[],
      current_location:{},
      addNewTaskModel:false,
      access_token:'pk.eyJ1IjoiYXNhYWRzaGVpa2giLCJhIjoiY2w1NTRneWVhMTFlbDNibjVmNXhuZXRzeiJ9.mLk4MkdGUubg4NyRCoemZw',
      title:"",
      detail:"",
      date:new Date()
    }
  },
  filters:{
 moment: function (datee) {
    return moment(datee).format('DD-MM-yy hh:mm a');
  }
  },
  methods: {
    toLocations() {
      this.route = 'location'
      console.log('response.data');

    },
     getCurrentLocation(){
     const success =async (position) => {
            const latitude  = position.coords.latitude;
            const longitude = position.coords.longitude; 

             await axios.get(
            'https://api.mapbox.com/geocoding/v5/mapbox.places/'+longitude+','+latitude+'.json?access_token='+this.access_token
        )
        .then(
          async  (res)=>{
                let reverse=res.data.features[0]?.context  
                await axios.post(Api.url+'location',
                {
                    location_name:reverse[reverse.length-3].text+', ' +reverse[reverse.length-1].text, 
                    points:[ longitude, latitude]
                })
                .then(
                    (result) => { 
                      this.fetchTasks()
                    }
                )
                .catch(
                    (error) => console.log(error)
                )
            }
        )
        };

        const error = (err) => {
            console.log(error)
        };
    navigator.geolocation.getCurrentPosition(success, error);
    },
    toTasks() {
      this.route = 'task' 

    },
    showModel(){
      this.addNewTaskModel=true
    },
   async completeTask(item){ 
  await axios.put(Api.url+'tasks/'+item._id)
    .then(
        (res) => { 
          this.fetchTasks()
             }
    )
    .catch(
        (error) => console.log(error)
    )
    },
 async addTask(){ 
      if(this.title==''){ 
            return
        }
        if(this.detail==''){ 
            return
        }
        
        await axios.post(Api.url+'tasks',
        {
            title:this.title,
            status:this.detail,
            date:this.date
        }
        )
        .then(
            (res) => {
             this.fetchTasks()
             this.hideModel()
              const toast = useToast();
  
      toast.success("New Task added Successfully", {
        timeout: 2000
      });
      // These options will override the options defined in the "app.use" plugin registration for this specific toast

      // Make it available inside methods
      return { toast }
            }
        )
        .catch(
            (error) => console.log(error)
        )
  },

    hideModel(){
      this.addNewTaskModel=false
    },
    // moment: function (date) {
    //   return moment(date). format('DD-MM-yy hh:mm a');
    // },
    async fetchTasks(){

      await axios.get(Api.url + 'tasks',)

        .then(
          (res) => {
            this.incomplete = res.data.filter(obj => obj.status == 'incomplete')
            this.complete = res.data.filter(obj => obj.status == 'complete')

          }
        )
        .catch(
          (error) => console.log(error)
        )

           await axios.get(Api.url + 'location',)

        .then(
          (res) => {
            this.previous_locations = res.data
            this.current_location={
                            title:res.data[0].location_name,
                            points:res.data[0].points
                           }
          }
        )
        .catch(
          (error) => console.log(error)
        )
    }
  },
  mounted() { 
       
 

   this.fetchTasks()
  }
}
</script>