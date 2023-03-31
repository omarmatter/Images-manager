<template>
<el-button type="primary" title="Manage" class="mt-5" > Click </el-button>
<el-form
:rules="rules"
:model="form"
>
<!--  <AlbumUploader></AlbumUploader>-->
<!--  <ImageUpload :element-ui="false"></ImageUpload>-->

  <FormGroup  :multiLang="true"  cols="4"  label="Name" >
    <template #default="{locale}">
      <el-form-item :prop="'name.'+locale"  :rules="rules['field']">
        <el-input v-model="form.name[locale]" placeholder="Name" />
      </el-form-item>

    </template>


    <!--    <el-input v-model="form.name" placeholder="Name"></el-input>-->
  </FormGroup>

  <video-upload v-model="form.file" :preview-url="form.file"></video-upload>

</el-form>

</template>

<script>
import ImageUpload from "@/components/form/ImageUpload";
import TextImageField from "@/components/form/TextImageField";
import AlbumUploader from "@/components/form/AlbumUploader"
import FormGroup from "../../components/form/FormGroup";
import videoUpload from "../../components/form/VideoUpload";
import {ref} from "vue";
export default {
  components: {
    ImageUpload,
    TextImageField,
    AlbumUploader,
    FormGroup,
    videoUpload
  },
  name: "Create",
  setup(){
    const form =ref({
      name: {
        en: '',
        ar: ''
      },
      file:{
        url:'https://golfsaudi.com/storage/2022-10-18/Ey94PNIuDT8RKMlyNyYgmAz7BZX0RuBR1jQtNDof.mp4',
      }
    })
const rules = ref({
  field: [
    {
      required: true,
      message: "This field is required",
      trigger: "change",
    },
  ],

})
    return {
      form,
      rules
    }


  }
}

</script>

<style scoped>

</style>