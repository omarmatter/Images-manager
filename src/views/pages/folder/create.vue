<template>
<div class="card card-shadow m-5">
 <el-form
  class=" row  p-5"
 >
   <FormGroup  :multiLang="true"  cols="4"  label="Name" >
     <template #default="{locale}">
       <el-form-item>
         <el-input  placeholder="Name" />
       </el-form-item>

     </template>


     <!--    <el-input v-model="form.name" placeholder="Name"></el-input>-->
   </FormGroup>

 </el-form>
</div>
</template>

<script>

import FormGroup from "@/components/form/FormGroup";
import {ref} from "vue";
export default {
  name: "create",
  components: {
    FormGroup
  },
}
</script>

<style scoped>

</style>