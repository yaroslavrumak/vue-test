<template>
  <div class="container">
    <vue-tree
      style="width: 100vw; height: 100vh"
      :dataset="items"
      :config="treeConfig"
    >
      <template v-slot:node="{ node, collapsed }">
        <span class="tree-node">{{ node.title }}</span>
        <button v-show="node._children || node.children">
          {{ collapsed ? "+" : "-" }}
        </button>
      </template>
    </vue-tree>

    <div class="preview">
      <pre>{{ items | pretty }}</pre>
      <div class="export-btn" @click="exportToJsonFile(items)">Export json</div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import VueTree from "@ssthouse/vue-tree-chart";
import Vue from "vue";
Vue.component("vue-tree", VueTree);
export default {
  name: "NodeTree",
  data() {
    return {
      treeConfig: { nodeWidth: 220, nodeHeight: 80, levelHeight: 200 },
    };
  },

  computed: {
    ...mapState(["items"]),
  },

  methods: {
    exportToJsonFile(items) {
      let dataStr = JSON.stringify(items);
      let dataUri =
        "data:application/json;charset=utf-8," + encodeURIComponent(dataStr);

      let exportFileDefaultName = "data.json";

      let linkElement = document.createElement("a");
      linkElement.setAttribute("href", dataUri);
      linkElement.setAttribute("download", exportFileDefaultName);
      linkElement.click();
    },
  },
  filters: {
    pretty: function (value) {
      return JSON.stringify(value, null, 2);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.tree-node {
  display: inline-block;
  width: fit-content;
  border-radius: 25px;
  background-color: antiquewhite;
  text-align: center;
  line-height: 28px;
  padding: 10px 20px;
  white-space: nowrap;
}
.preview {
  position: absolute;
  top: 0;
  right: 0;
  border: 1px solid;
  padding: 15px;
  transform: scale(0.75);
}
button {
  border-radius: 50%;
  background-color: antiquewhite;
}
.export-btn {
  border: 1px solid;
  padding: 10px;
  cursor: pointer;
  width: fit-content;
}
</style>
