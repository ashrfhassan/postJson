<template>
    <tr id="history-request-1" class="h-row">
        <td><p class="emerald-btn"><strong>Post</strong></p></td>
        <td colspan="2"><p>http://www.google.come/api/thi...
            <a @click="showDetails" class="floating-eye-btn btn-floating d-none">
                <i class="fa fa-eye"></i></a></p></td>
    </tr>
</template>

<script>
    export default {
        data: function () {
            return {};
        },
        mounted() {
        },
        methods: {
            showDetails: function () {
                $("#request-details").modal("show");
            }
        }
    };
</script>