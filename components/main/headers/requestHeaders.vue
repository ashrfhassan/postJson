<template>
    <div>
        <div id="main-headers" class="container-fluid margin-0 padding-0 scroll-headers">
            <app-headerrow v-for="count in rowsCount" v-bind:key="count.num" @addrow="addNewRow(count.num)"
                           :count="count.num"></app-headerrow>
        </div>
    </div>
</template>

<script>
    import HeaderRow from "./headerRow.vue";

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
                if ($("#header-row-" + nextCount).length == 0) {
                    this.rowsCount.push({num: nextCount});
                }
            }
        },
        components: {
            "app-headerrow": HeaderRow
        }
    };
</script>
