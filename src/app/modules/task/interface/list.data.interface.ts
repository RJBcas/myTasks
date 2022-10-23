
     interface Task {
      task: string;
      isComplete: boolean;
  }



   export interface Datum {
      id: number;
      title: string;
      tasks: Task[];
      date: string;
      time: string;

  }

  export interface IListData {
      data: Datum[];
  }
