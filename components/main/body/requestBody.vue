<template>
    <div>
        <div class="row">
            <div class="col-md-6 col-sm-6 text-center">
                <label>
                    <input id="Raw" class="with-gap" @click="toggleRawForm" name="group3" type="radio" checked/>
                    <span>Raw</span>
                </label>
            </div>
            <div class="col-md-6 col-sm-6 text-center">
                <label>
                    <input id="Form" class="with-gap" @click="toggleRawForm" name="group3" type="radio"/>
                    <span>Form Data</span>
                </label>
            </div>
        </div>
        <div class="row justify-content-md-center justify-content-sm-center">
            <div class="col-md-12 col-sm-12">
                <keep-alive>
                    <component :is="swaper.currentView">
                    </component>
                </keep-alive>
            </div>
        </div>
    </div>
</template>

<script>
    import Raw from "./rawRequest.vue";
    import Form from "./formDataRequest.vue";

    export default {
        data: function () {
            return {
                swaper: {
                    currentView: "Raw"
                }
            };
        },
        mounted() {
        },
        methods: {
            toggleRawForm: function (el) {
                let elementID = el.target.id;
                this.$set(this.swaper, "currentView", elementID);
            }
        },
        components: {
            Raw: Raw,
            Form: Form
        }
    };
</script>