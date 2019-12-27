<template>
    <div class="container-fuild margin-0 padding-0">
        <div class="row">
            <div class="col-sm-3 col-md-3 text-center">
                <div class="switch">
                    <label>
                        GET
                        <input id="btn-request-type" @click="changRequestType" type="checkbox">
                        <span class="lever"></span>
                        POST
                    </label>
                </div>
            </div>
            <div class="col-sm-6 col-md-6 input-field text-center">
                <input id="url" type="text">
                <label for="url">URL</label>
                <span class="helper-text" data-error="wrong" data-success="right">Enter URL</span>
            </div>
            <div class="col-sm-3 col-md-3 text-center">
                <a @click="send" class='waves-effect waves-light white-btn btn'>Send</a>
                <a @click="showSaveRequest" class='waves-effect waves-light white-btn btn'>Save</a>
            </div>
        </div>
        <div class="divider"></div>
    </div>
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