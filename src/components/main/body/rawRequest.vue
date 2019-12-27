<template>
    <div>
        <pre id="main-output" class="form-control raw-input" contenteditable="true"></pre>
        <a class="pretty-btn btn-floating" title="Be pretty" @click="bePretty"><i class="fa fa-laugh-beam"></i></a>
    </div>
</template>

<script>
    import library from '../../../helpers/prettyJson'

    export default {
        data: function () {
            return {};
        },
        mounted() {
        },
        methods: {
            bePretty: function () {
                let el = document.getElementById('main-output');
                el.innerHTML = library.prettyPrintToString(JSON.parse(el.text.trim()));
            }
        }
    };
</script>