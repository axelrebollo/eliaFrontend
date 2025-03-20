import { defineStore } from 'pinia';

export const useNotebookStore = defineStore('notebook', {
  state: () => ({
    tableLoaded: false,
    selectedGroup: null,
    selectedTable: null,
  }),
  actions: {
    loadTable(group, table) {
      this.selectedGroup = group,
      this.selectedTable = table,
      this.tableLoaded = true;
    },
  },
});
