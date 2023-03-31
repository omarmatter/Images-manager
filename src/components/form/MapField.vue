<template>
  <GMapMap
      :center="center"
      :zoom="zoom"
      map-type-id="terrain"
      style="height: 300px; border-radius: 15px"
      ref="gmap"
  >
    <!--<input class="input controls search-box-input"-->
    <!--type="text"-->
    <!--ref="searchBoxInput"-->
    <!--:placeholder="trans('search')"/>-->
    <el-input v-if="withName"
              class="address-name-input"
              v-model="input.name"/>
    <GMapAutocomplete
        class="input controls search-box-input el-input__inner"
        type="text"
        ref="searchBoxInput"
        @place_changed="setPlace"
    >
      <!--      :placeholder="trans('search')"-->
    </GMapAutocomplete>

    <GMapMarker
        v-if="input && isMarker"
        :position="input"
        :clickable="true"
        :draggable="true"
        @dragend="onMarkerDragend($event)"
    />

    <GMapPolygon
        v-if="input && !isMarker"
        :draggable="true"
        :editable="true"
        :options="options"
        :clickable="true"
        :paths="input"
        @paths_changed="onPolygonPathUpdate"
    />

    <!--    {{input }}-->
    <div v-if="isMarker">
      <el-button v-if="(!input || input.length === 0)" @click="setMarker">
        Add Marker
      </el-button>
      <el-button v-else @click="setMarker">
        Reset Marker
      </el-button>
    </div>
    <div v-else>
      <el-button v-if="(!input || input.length === 0)" @click="setPolygon">
        Add Polygon
      </el-button>
      <el-button v-else @click="setPolygon">
        Reset Polygon
      </el-button>
    </div>
  </GMapMap>
</template>

<script>
import {computed, ref, watch} from "vue";
import {get} from "axios";
// import {input as inputMixin} from "@/components/builder/mixins";
// import useInputField from "@/components/builder/composables/useInputField";
// import _ from "lodash";

export default {
  name: "MapField",
  emits: ["update:modelValue"],
  props: {
    isMarker: {
      type: Boolean,
      default: false
    },
    withName: Boolean,
    modelValue: {
      default: {}
    },
    coordinates: {
      required: false,
      default: {
        lat: 25.3097457,
        lng: 51.4491286,
      },
    },
    markers: {
      type: Array,
    },
    zoom: {
      required: false,
      default: 14,
    },
  },
  setup(props, context) {
    // const { input } = useInputField(props, context);

    const input = computed({
      get() {
        if (!props.isMarker) {
          if (props.modelValue && props.modelValue instanceof Array) return props.modelValue;
          return [props.coordinates, props.coordinates];
        } else return props.modelValue;
      },

      set(newVal) {
        context.emit("update:modelValue", newVal);
      }
    });

    const polygon = ref([
      props.coordinates,
      props.coordinates,
    ]);

    const center = ref(props.coordinates);

    watch(props.coordinates, (newVal) => {
      center.value = newVal;
    }, {deep: true, immediate: true})

    const sanitizeLatLng = function (point) {
      return {
        lat: !isNaN(parseFloat(point?.lat))
            ? parseFloat(point?.lat)
            : 25.3097457,
        lng: !isNaN(parseFloat(point?.lng))
            ? parseFloat(point?.lng)
            : 51.4491286,
      };
    };
    const marker = computed({
      set(newVal) {
        input.value = newVal?.position;
      },
      get() {
        return {
          position: sanitizeLatLng(input.value),
        };
      },
    });
    const getLocationName = function (position) {
      // let maps_key = JSON.parse(localStorage.getItem("user"))?.google_maps_key
      let maps_key = "AIzaSyDnC5b2ol_gcV_maHOzchHTqItqYYLV6TI";
      if (!maps_key) return;
      fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${position?.lat ?? props.coordinates.lat},${position?.lng ?? props.coordinates.lng}&key=${maps_key}`)
          .then((response) => {
            let data = response.json().then((temp) => {
              input.value.name = temp?.results?.[0]?.formatted_address;
            });
          })
    }
    const onMarkerDragend = function ({latLng}) {
      getLocationName({
        lat: parseFloat(latLng.lat()),
        lng: parseFloat(latLng.lng()),
      });
      input.value.lat = parseFloat(latLng.lat());
      input.value.lng = parseFloat(latLng.lng());
    };

    const setPlace = function (place) {

      let location = place?.geometry?.location;
      if (props.isMarker) {
        input.value = {
          lat: location.lat(),
          lng: location.lng(),
        };
      }
      center.value = {
        lat: location.lat(),
        lng: location.lng(),
      };
    };

    const onPolygonPathUpdate = function (mvcArray) {
      let path = [];
      for (let i = 0; i < mvcArray.getLength(); i++) {
        for (let j = 0; j < mvcArray.getAt(i).getLength(); j++) {
          path.push({
            lat: mvcArray.getAt(i).getAt(j).lat(),
            lng: mvcArray.getAt(i).getAt(j).lng(),
          })
        }
      }
      input.value = path;
    };


    const options = {
      strokeColor: "#FF0000",
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: "#FF0000",
      fillOpacity: 0.35,
    };

    const setPolygon = function () {
      input.value = [center.value, center.value]
    }

    const setMarker = function () {
      input.value = center.value;
    }
    return {
      setMarker,
      setPolygon,
      onPolygonPathUpdate,
      polygon,
      onMarkerDragend,
      setPlace,
      input,
      center,
      marker,
      options,
    };
  },
};
</script>

<style>
input.input.controls.search-box-input {
  position: absolute;
  top: 3%;
  width: 30%;
  right: 10%;
}

@media (max-width: 900px) {
  input.input.controls.search-box-input {
    top: 14%;
    width: 94%;
    right: 3%;
  }
}

.el-input.address-name-input {
  position: absolute;
  bottom: 45px;
  width: 50%;
}
</style>
