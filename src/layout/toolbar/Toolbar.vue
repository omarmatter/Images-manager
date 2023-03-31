<template>
    <!--begin::Toolbar-->
    <div class="toolbar" id="kt_toolbar">
        <!--begin::Container-->
        <div
            id="kt_toolbar_container"
            :class="{
        'container-fluid': toolbarWidthFluid,
        'container-xxl': !toolbarWidthFluid,
      }"
            class="d-flex flex-stack"
        >
            <!--begin::Page title-->
            <div
                data-kt-swapper="true"
                data-kt-swapper-mode="prepend"
                data-kt-swapper-parent="{default: '#kt_content_container', 'lg': '#kt_toolbar_container'}"
                class="page-title d-flex align-items-center flex-wrap me-3 mb-5 mb-lg-0"
            >
                <!--begin::Title-->
                <h1 class="d-flex align-items-center text-dark fw-bolder my-1 fs-3">
                    {{ title }}
                </h1>
                <!--end::Title-->

                <span
                    v-if="breadcrumbs"
                    class="h-20px border-gray-200 border-start mx-4"
                ></span>

                <!--begin::Breadcrumb-->
                <ul
                    v-if="breadcrumbs"
                    class="breadcrumb breadcrumb-separatorless fw-bold fs-7 my-1"
                >
                    <li class="breadcrumb-item pe-3">
                        <router-link to="/dashboard" class="text-muted text-hover-primary">
                            Home
                        </router-link>
                    </li>
                    <li class="breadcrumb-item">
                        <span class="bullet bg-gray-200 w-5px h-2px"></span>
                    </li>
                    <template v-for="(item, index) in breadcrumbs" :key="index">
                        <li class="breadcrumb-item text-muted">
                            {{ item }}
                        </li>
                        <li class="breadcrumb-item">
                            <span class="bullet bg-gray-200 w-5px h-2px"></span>
                        </li>
                    </template>
                    <li class="breadcrumb-item pe-3 text-dark">
                        {{ title }}
                    </li>
                </ul>
                <!--end::Breadcrumb-->
            </div>
            <!--end::Page title-->

            <!--begin::Actions-->
            <div class="d-flex align-items-center py-1">
                <!--begin::Wrapper-->
                <div class="me-4">

                    <!--end::Menu-->
                </div>
                <!--end::Wrapper-->

                <!--begin::Button-->
                <a v-if="routeCreateName"
                   href="javascript:;"
                   class="btn btn-sm btn-primary"
                   id="kt_toolbar_primary_button"
                   @click="pushRouteCreate()"
                >
                    Create
                </a>

                <a v-if="routeCreate"
                   href="javascript:;"
                   class="btn btn-sm btn-primary m-5"

                   @click="pushRouteCreateType()"
                >
                    Create from netsuite
                </a>
                <!--end::Button-->
            </div>
            <!--end::Actions-->
        </div>
        <!--end::Container-->
    </div>
    <!--end::Toolbar-->
</template>

<script lang="ts">
import {defineComponent} from "vue";
import Dropdown1 from "@/components/dropdown/Dropdown1.vue";
import {toolbarWidthFluid} from "@/core/helpers/config";
import {useRouter} from "vue-router";

export default defineComponent({
    name: "KToolbar",
    props: {
        breadcrumbs: Array,
        title: String,
        routeCreateName: String,
        routeCreate: String,
    },
    components: {
        Dropdown1,
    },
    setup(props) {

        const route = useRouter();
        const pushRouteCreate = () => {
            route.push({name: props.routeCreateName})
        }
        const pushRouteCreateType = () => {
            route.push({name: props.routeCreate})
        }
        return {
            toolbarWidthFluid,
            pushRouteCreate,
            pushRouteCreateType
        };
    },
});
</script>
