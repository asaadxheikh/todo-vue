 

<template>

    <div class=" bg-grey-50 h-screen w-screen  flex justify-center  flex-col items-center">

    <div class=" h-72 flex flex-col justify-between items-center">
    
        <h2 class="text-3xl font-semibold leading-9 tracking-tight text-gray-900 ">
            Login
        </h2>
        <div class="  w-96 bg-inputbg h-12 border border-[#e8e8e8] rounded-xl "> 
             <input type="email" 
             class=" w-96 bg-inputbg h-12 border border-[#e8e8e8] rounded-xl "  
             placeholder="Email"
              v-model="email" 
             /> 
 
        </div>
           <div class="  w-96 bg-inputbg h-12 border border-[#e8e8e8] flex flex-row rounded-xl "> 
             <input  
             class=" w-96 bg-inputbg h-12 border border-[#e8e8e8] rounded-xl " 
             id="title" 
             placeholder="Password"
              type="password"
              v-model="password" 
             /> 
 
        </div>
          <button  
          @click="login"
            class="  w-96 bg-black h-12 border flex justify-center   items-center  text-white  content-center border-[#e8e8e8]  rounded-3xl "> 
           
            Login
          </button>
         

</div>

<text v-if="err!=''" class=" text-rose-500 mt-6">
{{err}}
</text>


    </div>
</template>

<script >
import { RouterLink } from 'vue-router'

 

export default { 
  data() {
    return {
      email:"",
      password:'',
      err:""
    }
  }, 
  methods:{

    login(){
      if(this.email==''||!String(this.email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    )){
      this.err='Valid email is needed'
      return
      }

      if(this.password==''){
         this.err='password is needed'
      return
      }
       this.err=''
       this.$router.push('/tasks')

    },
      
  },
  mounted() { 
         
  }
}
 
</script>

