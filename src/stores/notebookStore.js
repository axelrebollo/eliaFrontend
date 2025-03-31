import { defineStore } from 'pinia';

export const useNotebookStore = defineStore('notebook', {
  state: () => ({
    tableLoaded: false,
    selectedSubject: null,
    selectedYear: null,
    selectedCourse: null,
    selectedGroup: null,
    selectedTable: null,
    classCode: null,
  }),
  actions: {
    loadTable(subject, year, course, group, table) {
      this.selectedSubject = subject,
      this.selectedYear = year,
      this.selectedCourse = course,
      this.selectedGroup = group,
      this.selectedTable = table,
      this.tableLoaded = true;
    },
    setClassCode(code){
      this.classCode = code;
    }
  },
});
