<script>
import { layoutComputed } from "@/state/helpers";

import Vertical from "./vertical";
import Horizontal from "./horizontal";
import TwoColumns from "./twocolumn";

export default {
    components: {
        Vertical,
        Horizontal,
        TwoColumns
    },
    data() {
        return {};
    },
    computed: {
        ...layoutComputed,
    },
    mounted() {
        // document.querySelector("html").setAttribute('dir', 'rtl');
    }
};
</script>

<template>
    <div>
        <Vertical>
            <slot />
        </Vertical>
    </div>
</template>
