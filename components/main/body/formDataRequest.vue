<template>
    <div id="main-form-data" class="container-fluid margin-0 padding-0 form-data-scroll">
        <form action="post" enctype="multipart/form-data">
            <app-formrow v-for="count in rowsCount" v-bind:key="count.num" @addrow="addNewRow(count.num)"
                         :count="count.num"></app-formrow>
        </form>
    </div>
</template>

<script>
    import FormRow from "./formDataRow.vue";

    export default {
        data: function () {
            return {
                rowsCount: [
                    {
                        num: 0
                    }
                ]
            };
        },
        mounted() {
        },
        methods: {
            addNewRow: function (count) {
                let nextCount = count + 1;
                if ($("#form-data-row-" + nextCount).length == 0) {
                    this.rowsCount.push({num: nextCount});
                }
            }
        },
        components: {
            "app-formrow": FormRow
        }
    };
</script>