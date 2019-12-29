<template>
    <div>
        <b-row>
            <b-col sm="6" md="6" class="text-center">
                <label>
                    <input id="Raw" class="with-gap" @click="toggleRawForm" name="group3" type="radio" checked/>
                    <span>Raw</span>
                </label>
            </b-col>
            <b-col sm="6" md="6" class="text-center">
                <label>
                    <input id="Form" class="with-gap" @click="toggleRawForm" name="group3" type="radio"/>
                    <span>Form Data</span>
                </label>
            </b-col>
        </b-row>
        <b-row class="justify-content-md-center justify-content-sm-center">
            <b-col sm="12" md="12">
                <keep-alive>
                    <component :is="swapper.currentView">
                    </component>
                </keep-alive>
            </b-col>
        </b-row>
    </div>
</template>

<script>
    import Raw from "./rawRequest.vue";
    import Form from "./formDataRequest.vue";
    import constants from "../../../constants";
    import {mapMutations} from "vuex";

    export default {
        data: function () {
            return {
                swapper: {
                    currentView: constants.bodyRaw
                }
            };
        },
        mounted() {
        },
        methods: {
            toggleRawForm: function (el) {
                let elementID = el.target.id;
                this.$set(this.swapper, "currentView", elementID);
                this.setCurrentBodyType(elementID);
            },
            ...mapMutations(["setCurrentBodyType"])
        },
        components: {
            Raw: Raw,
            Form: Form
        }
    };
</script>