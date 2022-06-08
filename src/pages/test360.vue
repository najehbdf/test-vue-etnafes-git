
<template>
 
  <div>
    Hebergements: {{hebergements}}
    </div>
  
</template>

<script>
// import { Tour } from "vuejs-vr";
import axios from "axios";
import { apiDomain } from "../config";

export default {
  components: {
   
  },
  data() {
    return {
        hebergements:{},
    
  }
  },

  computed:{
      
     /*  hebergements () {
    const response =  axios.get(`https://etnafesapi20212018.etnafes.com/api/hebergements`);    
    const hebergements = response.hebergements.data;  
    return hebergements;
    }, */

  },

  created() {
          this.fetchHebergements();
  },

  methods: {

      async fetchHebergements() {
  const { data } = await axios.get(
    "https://etnafesapi20212018.etnafes.com/api/hebergements"
  );
  //console.log(data.hebergements);
  this.hebergements=data.hebergements
},

     

    }
};
</script>
