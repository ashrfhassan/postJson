<template>
    <b-container fluid class="margin-0 padding-0">
        <b-row>
            <b-col sm="3" md="3" class="text-center">
                <div class="switch">
                    <label>
                        GET
                        <input id="btn-request-type" @click="changRequestType" type="checkbox">
                        <span class="lever"></span>
                        POST
                    </label>
                </div>
            </b-col>
            <b-col sm="6" md="6" class="text-center">
                <input id="url" type="text">
                <label for="url">URL</label>
                <span class="helper-text" data-error="wrong" data-success="right">Enter URL</span>
            </b-col>
            <b-col sm="3" md="3" class="text-center">
                <a @click="send" class='white-btn btn'>Send</a>
                <a @click="showSaveRequest" class='white-btn btn'>Save</a>
            </b-col>
        </b-row>
        <div class="divider"></div>
    </b-container>
</template>

<script>
    import store from "./../../store";
    import constants from "../../constants";

    export default {
        data: function () {
            return {
                methodsTypes: {
                    checked: false
                }
            };
        },
        mounted() {
        },
        methods: {
            changRequestType: function () {
                let type = "Get";
                this.methodsTypes.checked = !this.methodsTypes.checked;
                if (this.methodsTypes.checked) {
                    type = "Post";
                }
                this.$emit("changRequestType", type);
            },
            showSaveRequest: function () {
                document.getElementById("save-request").modal("show");
            },
            send: function () {
                let type = constants.getType;
                if (this.methodsTypes.checked) {
                    type = constants.postType;
                }
                let url = document.getElementById("url").val();
                let dataType = constants.dataTypeJson;
                let headers = store.getters.currentHeaders;
                let data = store.getters.currentRawBody;
                if (store.getters.currentBodyType === constants.bodyForm)
                    data = store.getters.currentFormBody;
                store.dispatch("sendRequest", type, url, dataType, headers, data);
            }
        }
    };
</script>