<template>
    <div>
        <pre id="main-output" class="form-control raw-input" contenteditable="true"></pre>
        <a class="pretty-btn btn-floating" title="Be pretty" @click="bePretty"><i class="fa fa-laugh-beam"></i></a>
    </div>
</template>

<script>
    export default {
        data: function () {
            return {};
        },
        mounted() {
        },
        methods: {
            bePretty: function (event) {
                let el = $('#main-output');
                try {
                    $(el).html(
                        library.json.prettyPrintToString(
                            JSON.parse(
                                $(el)
                                    .text()
                                    .trim()
                            )
                        )
                    );
                } catch (err) {
                }
            }
        }
    };
</script>