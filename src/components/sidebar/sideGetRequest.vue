<template>
    <tr id="history-request-1" class="h-row" @mouseover="showAnchor" @mouseout="hideAnchor">
        <td><p class="pink-color"><strong>Get</strong></p></td>
        <td colspan="2">
            <p>
                <a :class="{'floating-close-btn': true, 'btn-floating': true, 'd-none': show}">
                    <i class="fa fa-times"/>
                </a>
                http://www.google.come/api/thi...
                <a @click="showDetails" :class="{'floating-eye-btn':true, 'btn-floating': true,  'd-none': show}">
                    <i class="fa fa-eye"/>
                </a>
            </p>
        </td>
    </tr>
</template>

<script>
    export default {
        data: function () {
            return {
                show: false
            };
        },
        mounted() {
        },
        methods: {
            showAnchor: function () {
                this.show = true;
            },
            hideAnchor: function () {
                this.show = false;
            },
            showDetails: function () {
                document.getElementById("request-details").modal("show");
            }
        }
    };
</script>